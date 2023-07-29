import React, { useState, useCallback } from 'react';

import Button from '../Button';
import TreeNode from '../TreeNode';
import RenderNode from '../RenderNode';

import {
  findAndReplace,
  getNodeCount,
  removeNodeFromSubtree,
  updateChild,
} from '../../utils';

interface ITreeNode {
  id: number;
  name: string;
  children: ITreeNode[];
}

const Tree = () => {
  const baseTree: ITreeNode = {
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

  const [selectedNode, setSelectedNode] = useState<ITreeNode | null>(null);
  const [nodeCount, setNodeCount] = useState<number>(getNodeCount(baseTree));
  const [tree, setTree] = useState<ITreeNode>(baseTree);

  const addNode = () => {
    const newNode: ITreeNode = {
      name: `New Node ${nodeCount}`,
      children: [],
      id: nodeCount + 1,
    };

    if (!selectedNode) {
      setTree((prevState) => ({
        ...prevState,
        children: [...prevState.children, newNode],
      }));
    } else {
      setTree((prevState) => ({
        ...prevState,
        children: updateChild(prevState.children, selectedNode, (child) => ({
          ...child,
          children: [...child.children, newNode],
        })),
      }));
    }
    setNodeCount((count) => count + 1);
  };

  const removeNode = () => {
    if (!selectedNode || selectedNode.id === 1) return;

    setTree((prevState) => removeNodeFromSubtree(prevState, selectedNode));
    setSelectedNode(null);
  };

  const editNode = () => {
    if (!selectedNode) return;

    const newName = prompt('Enter new node name', selectedNode.name);

    if (newName) {
      setTree((prevTree) => findAndReplace(prevTree, selectedNode, newName));
    }
  };

  const selectNode = useCallback((node: ITreeNode) => {
    setSelectedNode(node);
  }, []);

  const resetNode = () => {
    setNodeCount(5);
    setSelectedNode(null);
    setTree(baseTree);
  };

  return (
    <div>
      <ul className='node-list'>
        <RenderNode node={tree} selectNode={selectNode} />
      </ul>
      <div>
        {selectedNode && <TreeNode selectedNode={selectedNode} />}
      </div>
      <div className='buttons-group'>
        <Button onClick={addNode} text='Add' />
        <Button onClick={removeNode} text='Remove' />
        <Button onClick={editNode} text='Edit' />
        <Button onClick={resetNode} text='Reset' />
      </div>
    </div>
  );
};

export default Tree;
