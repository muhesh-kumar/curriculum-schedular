import Image from 'next/image';
import { objectives } from './objectives';

const ObjectivesSection = () => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="text-3xl font-bold">Objectives</h1>
      <h2 className="text-xl font-semibold">What we try to achieve using our product</h2>
      <div className='flex gap-20 justify-center'>
        <div>
          <ul>
            {
              objectives.slice(0, Math.floor(objectives.length / 2)).map((objective, index) => {
                return <li key={index}>
                  <div className='flex items-center text-xl'>
                    <Image
                      src="/icons/list-bullet.svg"
                      alt="Picture of a student studying"
                      width={80}
                      height={80}
                    ></Image>
                    {objective}
                  </div>
                </li>
              })
            }
          </ul>
        </div>
        <div>
          <ul>
            {
              objectives.slice(Math.floor(objectives.length / 2)).map((objective, index) => {
                return <li key={index + Math.floor(objectives.length / 2)}>
                  <div className='flex items-center text-xl'>
                    <Image
                      src="/icons/list-bullet.svg"
                      alt="Picture of a student studying"
                      width={80}
                      height={80}
                    ></Image>
                    {objective}
                  </div>
                </li>
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ObjectivesSection;
