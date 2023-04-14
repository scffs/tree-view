import React, { useState } from 'react';

import './App.css';
import Button from "./components/Button/Button.jsx";
import Footer from "./components/Footer/Footer.jsx";

const App = () => {
    // TODO: move logic of Tree to another component
    const [selectedNode, setSelectedNode] = useState(null);
    const [nodeCount, setNodeCount] = useState(0);

    const baseTree = {
        id: 1,
        name: 'Node 1',
        children: [
            {
                id: 2,
                name: 'Node 2',
                children: [
                    {id: 3, name: 'Node 3', children: []},
                    {id: 4, name: 'Node 4', children: []},
                ],
            },
            {id: 5, name: 'Node 5', children: []},
        ]
    }

    const [tree, setTree] = useState(baseTree);

    const addNode = () => {
        const newNode = { name: `New Node ${nodeCount}`, children: [] };
        if (!selectedNode) {
            // If no node is selected, add the new node as a child of the root
            setTree((prevState) => ({
                ...prevState,
                children: [...prevState.children, newNode],
            }));
        } else {
            // If a node is selected, add the new node as its child
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
        if (!selectedNode) {
            return null;
        }
        setTree((prevState) => {
            if (selectedNode.id === prevState.id) setTree(baseTree);
            else {
                // If the selected node is not the root, remove it from its parent's children array
                return {
                    ...prevState,
                    children: prevState.children.map((child) =>
                        child.id === selectedNode.id
                            ? null
                            : {
                                ...child,
                                children: child.children.filter((grandChild) => grandChild.id !== selectedNode.id),
                            }
                    ).filter((child) => child !== null),
                };
            }
        });
        setSelectedNode(null);
    };

    const editNode = () => {
        if (!selectedNode) {
            return null;
        }

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

    const selectNode = (node) => {
        setSelectedNode(node);
    };

    const renderNode = (node) => (
        <li key={node.name}>
            <span onClick={() => selectNode(node)}>{node.name}</span>
            {node.children.length > 0 && <ul>{node.children.map(renderNode)}</ul>}
        </li>
    );

    const resetNode = () => {
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
                        {renderNode(tree)}
                    </ul>
                    <div className='buttons-group'>
                        <Button onClick={addNode} text='Add node'/>
                        <Button onClick={removeNode} text='Remove Node' />
                        <Button onClick={editNode} text='Edit Node' />
                        <Button onClick={resetNode} text='Reset' />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
