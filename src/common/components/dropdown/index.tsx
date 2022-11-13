import { FC } from 'react';
import { useElectiveStore } from '@utils/store';

type DropdownType = {
  dropDownContents: {
    courseCode: string;
    courseName: string;
  }[];
};

const Dropdown: FC<DropdownType> = ({ dropDownContents }) => {
  const setChosenElective = useElectiveStore(
    (state) => state.setChosenElective,
  );
  return (
    <select
      className="bg-primaryDark rounded-lg text-white px-5 py-2"
      onChange={(e) => setChosenElective(e.target.value)}
    >
      <option value="default">Electives</option>
      {dropDownContents.map((dropDownContent) => {
        return (
          <option
            key={dropDownContent.courseCode}
            value={dropDownContent.courseCode}
          >
            {dropDownContent.courseCode + ' ' + dropDownContent.courseName}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
