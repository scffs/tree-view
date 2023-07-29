import React, { FC, memo, useCallback } from 'react';

import { ITreeNode } from '../TreeNode';

interface RenderNodeProps {
  node: ITreeNode;
  selectNode: (node: ITreeNode) => void;
}

const areNodesEqual = (prevProps: RenderNodeProps, nextProps: RenderNodeProps) => prevProps.node === nextProps.node && prevProps.selectNode === nextProps.selectNode;

const RenderNode: FC<RenderNodeProps> = ({ node, selectNode }) => {
  console.log('render', node.name);

  const handleNodeClick = useCallback(() => {
    selectNode(node);
  }, [node, selectNode]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLSpanElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        selectNode(node);
      }
    },
    [node, selectNode],
  );

  return (
    <li key={node.id}>
      <span
        role='button'
        tabIndex={0}
        onClick={handleNodeClick}
        onKeyDown={handleKeyDown}
      >
        {node.name}
      </span>
      {node.children?.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <RenderNode key={child.id} node={child} selectNode={selectNode} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default memo(RenderNode, areNodesEqual);
