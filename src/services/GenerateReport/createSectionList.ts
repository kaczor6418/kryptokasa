function createSectionListItem(label: string, value: string, idx: number) {
  const item = document.createElement('li');
  const itemTitle = document.createElement('p');
  const itemValue = document.createElement('p');
  itemTitle.textContent =  `${idx}. ${label}:`;
  itemValue.textContent = value;
  item.appendChild(itemTitle);
  item.appendChild(itemValue);
  return item;
}

export function createSectionList(elems) {
  const section = document.createElement('ol');
  let idx = 0;
  for (const [label, value] of elems) {
    section.appendChild(createSectionListItem(label, value, idx))
    idx += 1;
  }
  return section;
}
