import React, { FC } from 'react';

import { ITreeNode } from '../TreeNode';

interface RenderNodeProps {
  node: ITreeNode;
  selectNode: (node: ITreeNode) => void;
}

const RenderNode: FC<RenderNodeProps> = ({ node, selectNode }) => {
  console.log('render', node.name);

  return (
    <li key={node.name}>
      <span onClick={() => selectNode(node)}>{node.name}</span>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <RenderNode key={child.name} node={child} selectNode={selectNode} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default RenderNode;
