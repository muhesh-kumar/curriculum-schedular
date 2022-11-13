import { Position } from 'reactflow';

export const nodeList = [
  {
    id: '1',
    position: { x: 100, y: 1 },
    data: { label: 'Calculus', weekNumber: 1 },
    sourcePosition: Position.Right,
    type: 'right-btn',
  },
  {
    id: '4',
    position: { x: 100, y: 50 },
    data: { label: 'High School Algebra', weekNumber: 1 },
    sourcePosition: Position.Right,
    type: 'right-btn',
  },
  {
    id: '2',
    position: { x: 300, y: 1 },
    data: { label: 'Statistics', weekNumber: 1 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: 'btn',
  },
  {
    id: '3',
    position: { x: 300, y: 100 },
    data: { label: 'ALA', weekNumber: 1 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: 'btn',
  },
  {
    id: '5',
    position: { x: 300, y: 50 },
    data: { label: 'Python', weekNumber: 1 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: 'btn',
  },
  {
    id: '6',
    position: { x: 300, y: 150 },
    data: { label: 'R', weekNumber: 1 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: 'btn',
  },
  {
    id: '7',
    position: { x: 600, y: 50 },
    data: { label: 'ML', weekNumber: 1 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: 'left-btn',
  },
];
