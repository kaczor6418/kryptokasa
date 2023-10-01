function createSectionListItem(label, value) {
  const item = document.createElement('li');
  const itemTitle = document.createElement('p');
  const itemValue = document.createElement('p');
  itemTitle.textContent =  `1. ${label}:`;
  itemValue.textContent = value;
  item.appendChild(itemTitle);
  item.appendChild(itemValue);
  return item;
}

export function createSectionList(elems) {
  const section = document.createElement('ol');
  for (const [label, value] of elems) {
    section.appendChild(createSectionListItem(label, value))
  }
  return section;
}