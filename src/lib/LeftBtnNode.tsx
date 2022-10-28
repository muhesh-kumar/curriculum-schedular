import BtnNode from '@lib/BtnNode';

const LeftBtnNode = ({ id, data }: any) => {
  return <BtnNode hasLeftHandle={true} hasRightHandle={false} id={id} data={data} />
}

export default LeftBtnNode
