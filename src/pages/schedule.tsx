/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextPage } from 'next';

import GeneralPageLayout from '@layouts/GeneralPageLayout';

import { useElectiveStore } from '@utils/store';
import { getCourseStartWeeks } from '@utils/findElectives';

const Schedule: NextPage = () => {
  const chosenElective = useElectiveStore((state) => state.chosenElective);
  const courseStartWeeks = getCourseStartWeeks(chosenElective);
  const weeks = Object.entries(courseStartWeeks).map(
    ([weekNumber, _]) => weekNumber,
  );
  const coursesPerWeek = Object.entries(courseStartWeeks).map(
    ([_, courses]) => courses,
  );

  return (
    <GeneralPageLayout>
      <div className="flex flex-col gap-10 h-full justify-center items-center ">
        <h2 className="text-2xl">
          Generated Schedule for{' '}
          <span className="font-bold">{chosenElective}</span>
        </h2>
        <div className="flex gap-5">
          <div className="flex flex-col gap-5">
            {weeks.map((weekNumber) => {
              return (
                <div key={weekNumber} className="flex flex-col border-2">
                  <p className="text-2xl font-semibold p-2">
                    Week {weekNumber}:{' '}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-5">
            {coursesPerWeek.map((courses) => {
              return (
                <div key={courses[0]} className="flex gap-5">
                  {courses.map((course) => {
                    return (
                      <p
                        className="text-2xl bg-primaryDark text-white border-2 border-primaryDark rounded-md px-4 py-2"
                        key={course}
                      >
                        {course}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </GeneralPageLayout>
  );
};

export default Schedule;
