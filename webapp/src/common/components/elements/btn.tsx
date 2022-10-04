import { FC } from 'react';
import { clsx } from 'clsx';

export type BtnProps = {
  btnText: string,
  isCTOBtn?: boolean
};

const Btn: FC<BtnProps> = ({ btnText, isCTOBtn = false }) => {
  return (
    <div>
      <button className={
        clsx("bg-primaryDark px-4 py-2 rounded-md text-white",
          (isCTOBtn && 'font-bold'))
      }>
        {btnText}
      </button>
    </div>
  )
}

export default Btn
