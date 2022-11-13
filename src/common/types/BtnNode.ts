export type BtnNodeProps = {
  id: string;
  data: {
    label: string;
    weekNumber: number;
  };
  hasLeftHandle?: boolean;
  hasRightHandle?: boolean;
};
