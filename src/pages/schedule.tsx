import { NextPage } from 'next';

import GeneralPageLayout from '@layouts/GeneralPageLayout';

import { useElectiveStore } from '@utils/store';
import { getCourseStartWeeks } from '@utils/findElectives';

const Schedule: NextPage = () => {
  const chosenElective = useElectiveStore((state) => state.chosenElective);
  console.log(chosenElective);
  const courseStartWeeks = getCourseStartWeeks(chosenElective);
  console.log(courseStartWeeks);

  return (
    <GeneralPageLayout>
      <div className="flex flex-col gap-5 items-center">
        {Object.entries(courseStartWeeks).map(
          ([weekNumber, scheduledCourses]) => {
            return (
              <div key={weekNumber} className="flex gap-5">
                <p className="text-xl font-semibold">Week {weekNumber}</p>
                <div className="flex gap-5">
                  {scheduledCourses.map((scheduledCourse) => {
                    return (
                      <p className="text-xl " key={scheduledCourse}>
                        {scheduledCourse}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          },
        )}
      </div>
    </GeneralPageLayout>
  );
};

export default Schedule;
