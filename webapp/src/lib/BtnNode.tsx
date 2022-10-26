import { useCallback, useState } from 'react';
import { Handle, Position, useEdgesState } from 'reactflow';
import { clsx } from 'clsx';

import { useGraphStore } from '@utils/store';

const BtnNode = ({ data }: any) => {
  const addClickedNodes = useGraphStore((state) => state.addClickedNodes);

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = useCallback((evt: any) => {
    setIsClicked(!isClicked);
    addClickedNodes('1');
  }, [isClicked, setIsClicked, addClickedNodes]);

  return (
    <>
      <div className={clsx(
        "border-[1.5px] px-5 py-2 text-sm border-black rounded-sm", (!isClicked ? "bg-white" : "bg-green-500 text-white")
      )}>
        <button name="btn" onClick={handleClick}>{data.label} ID: {data.id}</button>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}

export default BtnNode;