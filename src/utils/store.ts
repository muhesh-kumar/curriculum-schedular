import create from 'zustand';
import Edge from '@utils/Edge';

type GraphStore = {
  clickedNodes: any;
  addClickedNodes: (clickedNode: string) => void;
};

export const useGraphStore = create<GraphStore>((set) => ({
  clickedNodes: {}, // an object which holds the ids of nodes that are clicked

  addClickedNodes: (clickedNode: string) =>
    set((state) => ({
      clickedNodes: {
        ...state.clickedNodes,
        [clickedNode]: !state.clickedNodes[clickedNode],
      },
    })),
}));
