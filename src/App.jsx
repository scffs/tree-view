import React, { memo, useState,useCallback } from 'react';

import './App.css';

import Button from './components/Button/Button.jsx';
import Footer from './components/Footer/Footer.jsx';

const App = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [nodeCount, setNodeCount] = useState(5);

    const baseTree = {
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
        ]
    };

    const [tree, setTree] = useState(baseTree);

    const addNode = () => {
        const newNode = { name: `New Node ${nodeCount}`, children: [], id: nodeCount + 1 };

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

    const updateChild = (children, selectedNode, updateFn) => {
        return children.map((child) =>
            child === selectedNode ? updateFn(child) : { ...child, children: updateChild(child.children, selectedNode, updateFn) }
        );
    };

    const removeNode = () => {
        if (!selectedNode || selectedNode.id === 1) return;

        const removeNodeFromSubtree = (subtree) => {
            if (subtree.id === selectedNode.id) {
                return null; // remove node
            }

            return {
                ...subtree,
                children: subtree.children
                    .map((child) => removeNodeFromSubtree(child))
                    .filter((child) => child !== null),
            };
        };

        setTree((prevState) => removeNodeFromSubtree(prevState));
        setSelectedNode(null);
    };

    const editNode = () => {
        if (!selectedNode) return null;

        const newName = prompt('Enter new node name', selectedNode.name);

        if (newName) {
            const newTree = { ...tree };

            const findAndReplace = (node) => {
                if (node === selectedNode) {
                    node.name = newName;
                } else {
                    for (let i = 0; i < node.children.length; i++) {
                        findAndReplace(node.children[i]);
                    }
                }
            };

            findAndReplace(newTree);
            setTree(newTree);
        }
    };

    const selectNode = useCallback((node) => {
        setSelectedNode(node);
    },[]);


    const resetNode = () => {
        setNodeCount(5);
        setSelectedNode(null);
        return setTree(baseTree)
    }

    return (
        <div className='wrapper'>
            <div className='box'>
                <div className='box-top'>
                    <h1 className='title'>Tree</h1>
                </div>
                <div className='box-bottom'>
                    <ul className='node-list'>
                        <RenderNode node={tree} selectNode={selectNode} />
                    </ul>
                    <div>
                        {selectedNode && (
                            <div>
                                <h2>Selected Node</h2>
                                <p>Name: {selectedNode.name}</p>
                                <p>Children: {selectedNode.children.length}</p>
                                <p>ID: {selectedNode.id}</p>
                            </div>
                        )}
                    </div>
                    <div className='buttons-group'>
                        <Button onClick={addNode} text='Add'/>
                        <Button onClick={removeNode} text='Remove' />
                        <Button onClick={editNode} text='Edit' />
                        <Button onClick={resetNode} text='Reset' />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

    // Сейчас если добавить console.log в функцию renderNode,
    // то будет видно, что при изменении названия одной ноды, эта функция вызывается для всех нод.
    const RenderNode = memo(({ node, selectNode }) => {
        console.log('render', node.name);
        return (
        <li key={node.name}>
            <span onClick={() => selectNode(node)}>{node.name}</span>
            {node.children.length > 0 && <ul>{node.children.map(child => <RenderNode key={child.name} node={child} selectNode={selectNode} />)}</ul>}
        </li>
    )});

export default App;
