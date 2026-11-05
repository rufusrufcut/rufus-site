// Turns standard Markdown footnotes into sidenotes for the writing pages.
// A Sätteri HTML ("hast") plugin, registered in astro.config.mjs. Sätteri is Astro 7's Markdown engine.
//
// Write a note the normal Markdown way:
//   ...invested in.[^numbers]
//   [^numbers]: **The numbers** In 2023 Scotland's creative industries...
//
// Astro's Markdown (GitHub-flavoured) turns that into a numbered link plus a list of footnotes at the
// end of the page. This plugin runs after that and rearranges the HTML:
//   - the reference becomes a small red number: <sup class="note-ref">1</sup>
//   - the footnote moves to straight after the paragraph (or list, quote) that refers to it,
//     as <aside class="note">, so it reads inline on mobile; on wide screens a script on the page
//     (src/pages/writing/[slug].astro) moves it into the margin. Both carry data-note="1" to pair them up.
//   - an optional bold phrase at the start of the note becomes its label ("1 The numbers")
//   - the footnotes list at the end is removed
// Notes are plain Markdown, so a feed reader or a page without this plugin still shows ordinary footnotes.

const isEl = (node, tag) => node && node.type === 'element' && (!tag || node.tagName === tag);
const text = (node) => node.type === 'text' ? node.value : (node.children || []).map(text).join('');

// Walk every node, calling visit(node, parent, index).
function walk(node, visit, parent = null, index = null) {
  visit(node, parent, index);
  (node.children || []).forEach((child, i) => walk(child, visit, node, i));
}

// Sätteri hands the plugin a read-only tree. "after" runs once the page's HTML tree is built:
// copy it into plain objects, rearrange it, then swap the whole tree for the new one.
export default {
  name: 'sidenotes',
  after(root, ctx) {
    const tree = JSON.parse(JSON.stringify(root), (key, value) => (key.startsWith('_') ? undefined : value));
    if (sidenotes(tree)) ctx.replaceNode(root, tree);
  },
};

function sidenotes(tree) {
  // 1. Find the footnotes section and index each note by its id.
  const sectionIndex = tree.children.findIndex((n) => isEl(n, 'section') && n.properties && n.properties.dataFootnotes);
  if (sectionIndex === -1) return false;
  const section = tree.children[sectionIndex];
  const notes = new Map();
  walk(section, (n) => { if (isEl(n, 'li') && n.properties.id) notes.set(String(n.properties.id), n); });
  tree.children.splice(sectionIndex, 1);

  // 2. For each top-level block, swap its references for red numbers and queue the notes it refers to.
  const out = [];
  for (const block of tree.children) {
    const asides = [];
    walk(block, (n, parent, i) => {
      if (!isEl(n, 'sup') || !parent) return;
      const link = (n.children || []).find((c) => isEl(c, 'a') && c.properties.dataFootnoteRef);
      if (!link) return;
      const num = text(link).trim();
      const li = notes.get(String(link.properties.href || '').replace(/^#/, ''));
      parent.children[i] = { type: 'element', tagName: 'sup', properties: { className: ['note-ref'], ariaHidden: 'true', 'data-note': num }, children: [{ type: 'text', value: num }] };
      if (li) asides.push({ type: 'text', value: '\n' }, buildAside(li, num));
    });
    out.push(block, ...asides);
  }
  tree.children = out;
  return true;
}

function buildAside(li, num) {
  // Copy the note's content, dropping the "back to text" arrow links and stray whitespace.
  const content = (li.children || []).filter((c) => isEl(c));
  walk({ children: content }, (n) => {
    if (n.children) n.children = n.children.filter((c) => !(isEl(c, 'a') && c.properties.dataFootnoteBackref !== undefined && c.properties.dataFootnoteBackref !== false));
  });

  // Removing the arrow leaves a trailing space at the end of the last paragraph: trim it.
  const last = content[content.length - 1];
  if (isEl(last) && last.children) {
    const tail = last.children[last.children.length - 1];
    if (tail && tail.type === 'text') tail.value = tail.value.replace(/\s+$/, '');
  }

  // A bold phrase at the very start of the note becomes the label.
  let label = '';
  const first = content[0];
  if (isEl(first, 'p')) {
    const lead = first.children.findIndex((c) => !(c.type === 'text' && !c.value.trim()));
    if (isEl(first.children[lead], 'strong')) {
      label = text(first.children[lead]).trim();
      first.children.splice(0, lead + 1);
      if (first.children[0] && first.children[0].type === 'text') first.children[0].value = first.children[0].value.replace(/^\s+/, '');
      if (!first.children.length) content.shift();
    }
  }

  const numSpan = { type: 'element', tagName: 'span', properties: { className: ['note-num'], ariaHidden: 'true' }, children: [{ type: 'text', value: num }] };
  const labelP = { type: 'element', tagName: 'p', properties: { className: ['note-label'] }, children: [numSpan, { type: 'text', value: label ? ' ' + label : '' }] };
  if (!label && isEl(content[0], 'p')) {
    // No label: the number starts the first line instead of sitting on its own.
    content[0].children.unshift(numSpan, { type: 'text', value: ' ' });
  } else {
    content.unshift(labelP);
  }

  return {
    type: 'element',
    tagName: 'aside',
    properties: { className: ['note'], 'data-note': num, ariaLabel: label ? `Note ${num}: ${label}` : `Note ${num}` },
    children: content,
  };
}
