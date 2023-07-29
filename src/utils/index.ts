import { ITreeNode } from '../components/TreeNode';

export const getNodeCount = (tree: ITreeNode): number => {
  if (!tree.children || tree.children.length === 0) {
    return 1;
  }

  return tree.children.reduce((count, child) => count + getNodeCount(child), 1);
};

type UpdateFunction = (node: ITreeNode) => ITreeNode;

export const updateChild = (
  children: ITreeNode[],
  selectedNode: ITreeNode,
  updateFn: UpdateFunction,
): ITreeNode[] => children?.map((child) => (child === selectedNode
  ? updateFn(child)
  : { ...child, children: updateChild(child.children, selectedNode, updateFn) }));

export const removeNodeFromSubtree = (
  subtree: ITreeNode,
  selectedNode: ITreeNode,
): ITreeNode => {
  if (subtree.id === selectedNode.id) {
    return {} as ITreeNode;
  }

  return {
    ...subtree,
    children: subtree.children
      ?.map((child) => removeNodeFromSubtree(child, selectedNode))
      .filter((child) => child !== null),
  };
};

export const findAndReplace = (
  node: ITreeNode,
  selectedNode: ITreeNode,
  newName: string,
): ITreeNode => {
  if (node === selectedNode) {
    return { ...node, name: newName };
  }
  return {
    ...node,
    children: node.children?.map((child) => findAndReplace(child, selectedNode, newName)),
  };
};
