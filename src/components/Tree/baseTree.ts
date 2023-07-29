import { ITreeNode } from '../TreeNode';

export const baseTree: ITreeNode = {
  id: 1,
  name: 'Node 1',
  children: [
    {
      id: 2,
      name: 'Node 2',
      children: [
        { id: 3, name: 'Node 3', children: [] },
        { id: 4, name: 'Node 4', children: [] },
      ],
    },
    { id: 5, name: 'Node 5', children: [] },
  ],
};
