import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';


import GeneralPageLayout from '@layouts/GeneralPageLayout'
import withNoSSR from '@hoc/withNoSSR';

// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1', position: { x: 100, y: 1 }, data: { label: 'Calculus' },
    sourcePosition: 'right', type: 'input',
  },
  {
    id: '4', position: { x: 100, y: 50 }, data: { label: 'High School Algebra' },
    sourcePosition: 'right', type: 'input',
  },
  {
    id: '2', position: { x: 300, y: 1 }, data: { label: 'Statistics' },
    sourcePosition: 'right', targetPosition: 'left'
  },
  {
    id: '3', position: { x: 300, y: 100 }, data: { label: 'ALA' },
    sourcePosition: 'right', targetPosition: 'left'
  },
  {
    id: '5', position: { x: 300, y: 50 }, data: { label: 'Python' },
    sourcePosition: 'right', targetPosition: 'left'
  },
  {
    id: '6', position: { x: 300, y: 150 }, data: { label: 'R' },
    sourcePosition: 'right', targetPosition: 'left'
  },
  {
    id: '7', position: { x: 600, y: 50 }, data: { label: 'ML' },
    sourcePosition: 'right', targetPosition: 'left'
  },
];

const initialEdges = [{
  id: 'e1-2', source: '1', target: '2', markerEnd: {
    type: MarkerType.Arrow, // for directed edges
  },
  animated: true, // for dotted lines as edges
},
{
  id: 'e1-3', source: '1', target: '3', markerEnd: {
    type: MarkerType.Arrow,
  },
  animated: true, // for dotted lines as edges
},
{
  id: 'e4-3', source: '4', target: '3', markerEnd: {
    type: MarkerType.Arrow,
  }, animated: true, // for dotted lines as edges
},
{
  id: 'e2-7', source: '2', target: '7', markerEnd: {
    type: MarkerType.Arrow,
  },
  animated: true, // for dotted lines as edges
},
{
  id: 'e3-7', source: '3', target: '7', markerEnd: {
    type: MarkerType.Arrow,
  },
  animated: true, // for dotted lines as edges
},
{
  id: 'e4-7', source: '5', target: '7', markerEnd: {
    type: MarkerType.Arrow,
  },
  animated: true, // for dotted lines as edges
},
{
  id: 'e5-7', source: '6', target: '7', markerEnd: {
    type: MarkerType.Arrow,
  },
  animated: true, // for dotted lines as edges
},
];

const ProgressTracker = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <GeneralPageLayout>
      <div className="h-[80%] flex flex-col justify-center items-center">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </GeneralPageLayout>
  )
}

export default withNoSSR(ProgressTracker)