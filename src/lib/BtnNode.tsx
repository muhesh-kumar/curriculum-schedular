import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { clsx } from 'clsx';

import { useGraphStore } from '@utils/store';
import { BtnNodeProps } from 'types/BtnNode';

const BtnNode = ({
  id,
  data,
  hasLeftHandle = true,
  hasRightHandle = true,
}: BtnNodeProps) => {
  const addClickedNodes = useGraphStore((state) => state.addClickedNodes);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = useCallback(() => {
    setIsClicked(!isClicked);
    addClickedNodes(id);
  }, [id, isClicked, setIsClicked, addClickedNodes]);

  return (
    <>
      {hasLeftHandle && (
        <Handle type="target" position={Position.Left} id="b" />
      )}
      <div
        className={clsx(
          'border-[1.5px] px-5 py-2 text-sm border-black rounded-sm',
          !isClicked ? 'bg-white' : 'bg-green-500 text-white',
        )}
      >
        <button name="btn" onClick={handleClick}>
          {data.label}{' '}
          <p className="text-sm border-black">(Week {data.weekNumber})</p>
        </button>
      </div>
      {hasRightHandle && (
        <Handle type="source" position={Position.Right} id="a" />
      )}
    </>
  );
};

export default BtnNode;
