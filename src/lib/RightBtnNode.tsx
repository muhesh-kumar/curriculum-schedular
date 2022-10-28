import BtnNode from '@lib/BtnNode';
import { BtnNodeProps } from 'types/BtnNode';

const RightBtnNode = ({ id, data }: BtnNodeProps) => {
  return (
    <BtnNode hasLeftHandle={false} hasRightHandle={true} id={id} data={data} />
  );
};

export default RightBtnNode;
