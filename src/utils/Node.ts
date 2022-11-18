import { Position } from 'reactflow';

type PositionType = {
  x: number;
  y: number;
};

type DataType = {
  label: string;
  weekNumber: number;
};

export default class Node {
  id: string;
  position: PositionType;
  data: DataType;
  sourcePosition: Position;
  targetPosition: Position;
  type: string;

  constructor(
    id: string,
    position: PositionType,
    data: DataType,
    sourcePosition: Position,
    targetPosition: Position,
    type: string,
  ) {
    this.id = id;
    this.position = position;
    this.data = data;
    this.sourcePosition = sourcePosition;
    this.targetPosition = targetPosition;
    this.type = type;
  }
}
