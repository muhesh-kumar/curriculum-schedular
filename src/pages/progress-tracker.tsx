import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
} from 'reactflow';

import GeneralPageLayout from '@layouts/GeneralPageLayout';
import withNoSSR from '@hoc/withNoSSR';

import BtnNode from '@lib/BtnNode';
import LeftBtnNode from '@lib/LeftBtnNode';
import RightBtnNode from '@lib/RightBtnNode';

import { useGraphStore } from '@utils/store';
import Edge from '@utils/Edge';

import { nodeList } from '../dummy-data/nodeList';

import 'reactflow/dist/style.css';

const nodeTypes = {
  btn: BtnNode,
  'left-btn': LeftBtnNode,
  'right-btn': RightBtnNode,
};

const ProgressTracker = () => {
  const clickedNodes = useGraphStore((state) => state.clickedNodes);
  const initialEdges = [
    new Edge('1', '2', !('1' in clickedNodes && clickedNodes['1'])),
    new Edge('1', '3', !('1' in clickedNodes && clickedNodes['1'])),
    new Edge('4', '3', !('4' in clickedNodes && clickedNodes['4'])),
    new Edge('2', '7', !('2' in clickedNodes && clickedNodes['2'])),
    new Edge('3', '7', !('3' in clickedNodes && clickedNodes['3'])),
    new Edge('5', '7', !('5' in clickedNodes && clickedNodes['5'])),
    new Edge('6', '7', !('6' in clickedNodes && clickedNodes['6'])),
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(nodeList);

  return (
    <GeneralPageLayout>
      <div className="h-[80%] flex flex-col justify-center items-center">
        <ReactFlow
          nodes={nodes}
          edges={initialEdges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </GeneralPageLayout>
  );
};

export default withNoSSR(ProgressTracker);
