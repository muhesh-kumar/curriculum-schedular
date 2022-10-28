// {
//   id: 'e1-2', source: '1', target: '2', markerEnd: {
//     type: MarkerType.Arrow, // for directed edges
//   },
//   animated: true, // for dotted lines as edges
// },

import { MarkerType } from 'reactflow';

export default class Edge {
  id: string;
  source: string;
  target: string;
  markerEnd: any;
  animated: boolean;

  getId(): string {
    return 'e' + this.source + '-' + this.target;
  }

  constructor(source: string, target: string, animated: boolean = true) {
    this.source = source;
    this.target = target;
    this.id = this.getId();
    this.markerEnd = {
      type: MarkerType.Arrow,
    };
    this.animated = animated; // initially all edges are dotted only
  }
}
