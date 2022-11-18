import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';

import GeneralPageLayout from '@layouts/GeneralPageLayout';
import CourseCard from '@elements/course-card';

import { useElectiveStore } from '@utils/store';
import {
  getRelevantCoursesGivenEdgeList,
  getEdgeListFromElective,
} from '@utils/findElectives';

const getUserNameFromName = (name: string): string => name.split(' ').join('');

const ProfilePage = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  const chosenElective = useElectiveStore((state) => state.chosenElective);
  const edgeList = getEdgeListFromElective(chosenElective);
  const courses = getRelevantCoursesGivenEdgeList(edgeList);
  console.log('courses in profile: ', courses);

  if (status !== 'authenticated') {
    return (
      <div>
        <p>
          you are not signed in.
          <button onClick={() => signIn()}>Sign In</button>
        </p>
      </div>
    );
  }

  return (
    <GeneralPageLayout>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3 items-center justify-center">
          <Image
            src={session?.user?.image ?? ''}
            alt=""
            style={{ borderRadius: '100%' }}
            height={150}
            width={150}
          />
          <h2 className="text-2xl">
            Welcome <span className="font-bold">{session?.user?.name}</span>
          </h2>
          <div className="text-lg flex gap-2">
            <div className="flex flex-col gap-2 font-semibold">
              <p>Name: </p>
              <p>User Name: </p>
              <p>Email: </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p>{session?.user?.name}</p>
              <p>{getUserNameFromName(session?.user?.name ?? '')}</p>
              <p>{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* TODO: Separate it out as a component later */}
        {/* Electives Taken */}
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-3xl">Courses Taken</h2>
          <div className="flex gap-5 flex-wrap justify-center">
            {courses.map((course: string) => {
              return (
                <CourseCard
                  key={course}
                  courseName={course}
                  weeksToGo={(Math.ceil(Math.random() * 34) % 34) + 1}
                  hoursToGo={(Math.ceil(Math.random() * 200) % 200) + 1}
                  percentageCompleted={Math.ceil(Math.random() * 101) % 101}
                />
              );
            })}
          </div>
        </div>
      </div>
    </GeneralPageLayout>
  );
};

export default ProfilePage;
