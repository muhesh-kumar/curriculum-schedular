import { MarkerType } from 'reactflow';

export default class Edge {
  id: string;
  source: string;
  target: string;
  markerEnd: {
    type: MarkerType;
  };
  animated: boolean;

  getId(): string {
    return 'e' + this.source + '-' + this.target;
  }

  constructor(source: string, target: string, animated = true) {
    this.source = source;
    this.target = target;
    this.id = this.getId();
    this.markerEnd = {
      type: MarkerType.Arrow,
    };
    this.animated = animated; // initially all edges are dotted only
  }
}
