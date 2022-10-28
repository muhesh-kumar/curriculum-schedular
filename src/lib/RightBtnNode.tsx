import BtnNode from '@lib/BtnNode';

const RightBtnNode = ({ id, data }: any) => {
  return <BtnNode hasLeftHandle={false} hasRightHandle={true} id={id} data={data} />
}

export default RightBtnNode
