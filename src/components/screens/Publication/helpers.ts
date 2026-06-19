import { removeElement, isTag } from 'domutils';

export const removeIframeFromHTML = element => {
  if (element.tagName === 'iframe') {
    for (const child of element.children) {
      if (isTag(child)) {
        removeElement(child);
      }
    }
  }
};
