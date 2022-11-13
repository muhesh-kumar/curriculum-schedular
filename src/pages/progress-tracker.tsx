import { useSession } from 'next-auth/react';
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
import { useElectiveStore } from '@utils/store';
import Edge from '@utils/Edge';
import Node from '@utils/Node';
import {
  getEdgeListFromElective,
  getRelevantCoursesGivenEdgeList,
  getCourseStartWeeks,
} from '@utils/findElectives';

// import { nodeList } from '../dummy-data/nodeList';

import { Position } from 'reactflow';
import 'reactflow/dist/style.css';

const nodeTypes = {
  btn: BtnNode,
  'left-btn': LeftBtnNode,
  'right-btn': RightBtnNode,
};

const ProgressTracker = () => {
  const { status } = useSession();

  const clickedNodes = useGraphStore((state) => state.clickedNodes);
  const chosenElective = useElectiveStore((state) => state.chosenElective);
  const courseStartWeeks = getCourseStartWeeks(chosenElective);
  const courseCodeCourseStartWeekMap: { [key: string]: number } = {};
  for (const [weekNumber, courses] of Object.entries(courseStartWeeks)) {
    for (const course of courses) {
      courseCodeCourseStartWeekMap[course] = Number(weekNumber);
    }
  }

  const edgeList = getEdgeListFromElective(chosenElective);
  const relevantCourses = getRelevantCoursesGivenEdgeList(edgeList);

  const courseCodeNodeID: { [key: string]: string } = {};
  for (let i = 0; i < relevantCourses.length; i++)
    courseCodeNodeID[relevantCourses[i]] = String(i + 1);

  const nodeList = relevantCourses.map(
    (course) =>
      new Node(
        courseCodeNodeID[course],
        {
          y:
            courseCodeCourseStartWeekMap[chosenElective] -
            courseCodeCourseStartWeekMap[course],
          x: courseCodeCourseStartWeekMap[course] * 14,
        },
        { label: course, weekNumber: courseCodeCourseStartWeekMap[course] },
        Position.Right,
        Position.Left,
        'btn',
      ),
  );
  console.log(nodeList);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(nodeList);

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'unauthenticated')
    return <p>Access Denied! Please Sign in to view this page</p>;

  const initialEdges = edgeList.map(
    ([to, from]) =>
      new Edge(
        courseCodeNodeID[from],
        courseCodeNodeID[to],
        !(
          courseCodeNodeID[from] in clickedNodes &&
          clickedNodes[courseCodeNodeID[from]]
        ),
      ),
  );
  console.log(initialEdges);

  // const initialEdges = [
  //   new Edge('1', '2', !('1' in clickedNodes && clickedNodes['1'])),
  //   new Edge('1', '3', !('1' in clickedNodes && clickedNodes['1'])),
  //   new Edge('4', '3', !('4' in clickedNodes && clickedNodes['4'])),
  //   new Edge('2', '7', !('2' in clickedNodes && clickedNodes['2'])),
  //   new Edge('3', '7', !('3' in clickedNodes && clickedNodes['3'])),
  //   new Edge('5', '7', !('5' in clickedNodes && clickedNodes['5'])),
  //   new Edge('6', '7', !('6' in clickedNodes && clickedNodes['6'])),
  // ];

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
