const courseCodeCourseName: { [key: string]: string } = {};
const indegree: { [key: string]: number } = {};
const outdegree: { [key: string]: number } = {};
const adj: { [key: string]: string[] } = {};

import coursesData from '@dummy-data/courses_data.json';

type CoursesType = {
  [key: string]: {
    Prerequisites: string[];
    'Course Name': string;
    Duration: number;
  };
};

const readCourses = () => {
  const courses: CoursesType = JSON.parse(JSON.stringify(coursesData));
  for (const [courseCode, course] of Object.entries(courses)) {
    courseCodeCourseName[courseCode] = course['Course Name'];
    adj[courseCode] = [];
    indegree[courseCode] = 0;
    outdegree[courseCode] = 0;
  }
};

const buildGraph = async () => {
  const courses: CoursesType = JSON.parse(JSON.stringify(coursesData));
  for (const [courseCode, course] of Object.entries(courses)) {
    for (const prerequisiteCourseCode of course['Prerequisites']) {
      adj[prerequisiteCourseCode].push(courseCode);
    }
  }
};

const findIndegreeAndOutdegree = () => {
  for (const [prerequisiteCourseCode, courseCodes] of Object.entries(adj)) {
    for (const courseCode of courseCodes) {
      outdegree[prerequisiteCourseCode]++;
      indegree[courseCode]++;
    }
  }
};

export const findElectives = () => {
  readCourses();
  buildGraph();
  findIndegreeAndOutdegree();

  const electives = [];
  for (const [courseCode, outDeg] of Object.entries(outdegree)) {
    console.log(courseCode, outDeg);
    if (outDeg == 0)
      electives.push({
        courseCode: courseCode,
        courseName: courseCodeCourseName[courseCode],
      });
  }

  return electives;
};
