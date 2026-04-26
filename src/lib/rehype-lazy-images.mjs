function visit(node, callback) {
  callback(node);

  if (!node || !Array.isArray(node.children)) {
    return;
  }

  for (const child of node.children) {
    visit(child, callback);
  }
}

export function addLazyLoadingToImages() {
  return function transformer(tree) {
    visit(tree, (node) => {
      if (node?.type !== 'element' || node.tagName !== 'img') {
        return;
      }

      node.properties ??= {};
      if (!node.properties.loading) {
        node.properties.loading = 'lazy';
      }
    });
  };
}
