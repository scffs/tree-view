import React from 'react';

export interface ITreeNode {
  id: number;
  name: string;
  children: ITreeNode[];
}

interface TreeNodeProps {
  selectedNode: ITreeNode | null;
}

const TreeNode: React.FC<TreeNodeProps> = ({ selectedNode }) => {
  if (!selectedNode) return null;

  return (
    <div>
      <h2>Selected Node</h2>
      <p>
        Name:
        {selectedNode.name}
      </p>
      <p>
        Children:
        {selectedNode.children.length}
      </p>
      <p>
        ID:
        {selectedNode.id}
      </p>
    </div>
  );
};

export default TreeNode;
