import BtnNode from '@lib/BtnNode';
import { BtnNodeProps } from 'types/BtnNode';

const LeftBtnNode = ({ id, data }: BtnNodeProps) => {
  return (
    <BtnNode hasLeftHandle={true} hasRightHandle={false} id={id} data={data} />
  );
};

export default LeftBtnNode;
