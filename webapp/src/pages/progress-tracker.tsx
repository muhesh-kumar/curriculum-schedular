import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  // useEdgesState,
  // addEdge,
} from 'reactflow';

import GeneralPageLayout from '@layouts/GeneralPageLayout'
import withNoSSR from '@hoc/withNoSSR';

import BtnNode from '@lib/BtnNode';

import { useGraphStore } from '@utils/store';
import Edge from '@utils/Edge';

// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1', position: { x: 100, y: 1 }, data: { label: 'Calculus', id: 1 },
    sourcePosition: 'right', type: 'btn'
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


const nodeTypes = { btn: BtnNode };

const ProgressTracker = () => {
  const clickedNodes = useGraphStore((state) => state.clickedNodes);
  const initialEdges = [
    new Edge('1', '2', !('1' in clickedNodes && clickedNodes['1'])),
    new Edge('1', '3'),
    new Edge('4', '3'),
    new Edge('2', '7'),
    new Edge('3', '7'),
    new Edge('5', '7'),
    new Edge('6', '7'),
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <GeneralPageLayout>
      <div className="h-[80%] flex flex-col justify-center items-center">
        <ReactFlow
          nodes={nodes}
          edges={initialEdges}
          onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          nodeTypes={nodeTypes}
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