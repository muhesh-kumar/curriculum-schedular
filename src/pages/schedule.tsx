import { NextPage } from 'next';
import { useElectiveStore } from '@utils/store';

import { getCourseStartWeeks } from '@utils/findElectives';

const Schedule: NextPage = () => {
  const chosenElective = useElectiveStore((state) => state.chosenElective);
  console.log(chosenElective);
  const courseStartWeeks = getCourseStartWeeks(chosenElective);
  console.log(courseStartWeeks);

  return <div>Schedule</div>;
};

export default Schedule;
