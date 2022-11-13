import create from 'zustand';

type GraphStore = {
  clickedNodes: {
    [key: string]: boolean;
  };
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

type ElectiveStore = {
  chosenElective: string;
  setChosenElective: (elective: string) => void;
};

export const useElectiveStore = create<ElectiveStore>((set) => ({
  chosenElective: 'IC002',

  setChosenElective: (elective: string) => {
    set(() => ({
      chosenElective: elective,
    }));
  },
}));
