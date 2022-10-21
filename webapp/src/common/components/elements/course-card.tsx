import React from 'react'

// TODO: give proper type
const CourseCard = ({ courseName, weeksToGo, hoursToGo, percentageCompleted }: any) => {
  return (
    <div className='flex gap-2 justify-start'>
      <div className=" text-white rounded-lg">
        <div className="rounded-t-xl bg-gradient-to-b from-primaryDark to-slate-300 border-b-[1px] border-b-gray-50 p-5 pb-20">
          <h2 className='text-2xl'>
            {courseName}
          </h2>
        </div>
        <div className='rounded-b-2xl bg-white text-black flex gap-2 justify-between p-5'>
          <div className='flex flex-col items-center'>
            <h2 className="text-xl font-medium">{weeksToGo}</h2>
            <p className='text-sm'>Weeks</p>
          </div>
          <div className='flex flex-col items-center'>
            <h2 className="text-xl font-medium">{hoursToGo}</h2>
            <p className='text-sm'>Hours</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-medium">{percentageCompleted}%</h2>
            <p className='text-sm'>Completed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
