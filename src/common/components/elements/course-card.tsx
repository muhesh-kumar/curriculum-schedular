import { FC } from 'react';
import { clsx } from 'clsx';

type CourseCardProps = {
  courseName: string;
  weeksToGo: number;
  hoursToGo: number;
  percentageCompleted: number;
};

const getRandomColor = () => {
  // const colors = [
  //   'red-500',
  //   'blue-500',
  //   'green-500',
  //   'yellow-500',
  //   'cyan-500',
  //   'orange-500',
  // ];

  // const color = 'from-' + colors[Math.floor(Math.random() * colors.length)];
  // console.log(color);
  // return color;

  // FIXME: make it work!!
  // const color = "from-[#000000]";
  // let color = "from-[#f28e57]";
  // console.log("1: ", color);
  // color = "from-[#" + Math.floor(Math.random() * 16777215).toString(16) + "]";
  // console.log("2: ", color);
  // return color;
  return 'from-primaryDark';
};

// TODO: give proper type
const CourseCard: FC<CourseCardProps> = ({
  courseName,
  weeksToGo,
  hoursToGo,
  percentageCompleted,
}) => {
  // console.log(getRandomColor());
  return (
    <div className="flex gap-2 justify-start">
      <div className=" text-white rounded-lg">
        {/* Upper Card */}
        <div
          className={clsx(
            'rounded-t-xl bg-gradient-to-b',
            getRandomColor(),
            'to-slate-300 border-b-[1px] border-b-gray-50 p-5 pb-20',
          )}
        >
          <h2 className="text-2xl">{courseName}</h2>
        </div>

        {/* Lower Card */}
        <div className="rounded-b-2xl bg-white text-black flex gap-2 justify-between p-5">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-medium">{weeksToGo}</h2>
            <p className="text-sm">Weeks</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-medium">{hoursToGo}</h2>
            <p className="text-sm">Hours</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-medium">{percentageCompleted}%</h2>
            <p className="text-sm">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
