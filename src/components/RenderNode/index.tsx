import React, { FC } from 'react';

import { ITreeNode } from '../TreeNode';

interface RenderNodeProps {
  node: ITreeNode;
  selectNode: (node: ITreeNode) => void;
}

const RenderNode: FC<RenderNodeProps> = ({ node, selectNode }) => {
  console.log('render', node.name);

  const handleNodeClick = () => {
    selectNode(node);
  };

  return (
    <li key={node.name}>
      <span role='button' onClick={handleNodeClick}>{node.name}</span>
      {node.children?.length > 0 && (
        <ul>
          {node.children?.map((child) => (
            <RenderNode key={child.name} node={child} selectNode={selectNode} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default RenderNode;
