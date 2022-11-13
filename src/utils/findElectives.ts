import Queue from '@lib/Queue';
import coursesData from '@dummy-data/courses_data.json';

type StringStringMap = {
  [key: string]: string;
};

type StringIntMap = {
  [key: string]: number;
};

type IntStringArrayMap = {
  [key: number]: string[];
};

type Graph = {
  [key: string]: string[];
};

type CoursesType = {
  [key: string]: {
    Prerequisites: string[];
    'Course Name': string;
    Duration: number;
  };
};

const courseCodeCourseName: StringStringMap = {};
const indegree: StringIntMap = {},
  outdegree: StringIntMap = {};
const adj: Graph = {},
  radj: Graph = {};
const courses: CoursesType = JSON.parse(JSON.stringify(coursesData));

const readCourses = () => {
  for (const [courseCode, course] of Object.entries(courses)) {
    courseCodeCourseName[courseCode] = course['Course Name'];
    adj[courseCode] = [];
    indegree[courseCode] = 0;
    outdegree[courseCode] = 0;
  }
};

const buildGraph = async () => {
  for (const [courseCode, course] of Object.entries(courses)) {
    for (const prerequisiteCourseCode of course['Prerequisites']) {
      adj[prerequisiteCourseCode].push(courseCode);
    }
  }
};

/* ================================================================= */
/* =======================Finding Electives===================== */
/* ================================================================= */

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
    if (outDeg == 0)
      electives.push({
        courseCode: courseCode,
        courseName: courseCodeCourseName[courseCode],
      });
  }

  return electives;
};

/* ================================================================= */
/* ================Finding Start Week of Courses ============== */
/* ================================================================= */

const buildReverseGraph = () => {
  // FIXME: find a correct solution for this issue
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [courseCode, _] of Object.entries(courseCodeCourseName))
    radj[courseCode] = [];

  for (const [prerequisiteCourseCode, courseCodes] of Object.entries(adj))
    for (const courseCode of courseCodes)
      radj[courseCode].push(prerequisiteCourseCode);
};

const topSort = (indegree: StringIntMap, adj: Graph) => {
  const dist: StringIntMap = {};
  const courseStartWeek: IntStringArrayMap = {};
  const maxCourseDuration: StringIntMap = {};

  // Initializing maxCourseDuration
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [courseCode, _] of Object.entries(indegree))
    maxCourseDuration[courseCode] = 0;

  const q = new Queue<string>();
  courseStartWeek[0] = [];
  for (const [courseCode, indeg] of Object.entries(indegree)) {
    if (indeg != 0) continue;
    q.enqueue(courseCode);
    dist[courseCode] = courses[courseCode].Duration;
    courseStartWeek[0].push(courseCode);
  }

  while (!q.isEmpty()) {
    const curr = q.dequeue() ?? '';
    console.log('curr: ', curr);

    for (const child of adj[curr]) {
      indegree[child]--;
      console.log('child:', child, 'indegree:', indegree[child]);
      maxCourseDuration[child] = Math.max(maxCourseDuration[child], dist[curr]);

      if (indegree[child] == 0) {
        q.enqueue(child);

        if (maxCourseDuration[child] in courseStartWeek)
          courseStartWeek[maxCourseDuration[child]].push(child);
        else courseStartWeek[maxCourseDuration[child]] = [child];

        dist[child] = maxCourseDuration[child] + courses[child].Duration;
      }
    }
  }
  console.log('maxcourseduration: ', maxCourseDuration);

  return courseStartWeek;
};

const getLearningTreeForElective = (electiveCourseCode: string) => {
  const visited = new Set<string>();
  const learningTree: IntStringArrayMap = {};

  const dfs = (courseCode: string, level: number) => {
    visited.add(courseCode);
    if (level in learningTree) learningTree[level].push(courseCode);
    else learningTree[level] = [courseCode];

    console.log(courseCode);
    for (const childCourseCode of radj[courseCode]) {
      if (!visited.has(childCourseCode)) {
        dfs(childCourseCode, level + 1);
      }
    }
  };
  dfs(electiveCourseCode, 0);

  const flattenedLearningTree: string[][] = [];

  // FIXME: find a correct solution for this issue
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, courseCodes] of Object.entries(learningTree))
    flattenedLearningTree.push(courseCodes);

  return flattenedLearningTree;
};

const getGraphAndIndegreeFromLearningTree = (
  learningTree: string[][],
): [StringIntMap, Graph] => {
  const relevantCourses = new Set<string>();
  for (const courseCodes of learningTree)
    for (const courseCode of courseCodes) relevantCourses.add(courseCode);
  console.log('relevant courses', relevantCourses);

  const indegree: StringIntMap = {};
  const electiveAdj: Graph = {};

  // Initializing indegrees
  for (const courseCode of relevantCourses) indegree[courseCode] = 0;

  for (const prerequisiteCourseCode of relevantCourses) {
    electiveAdj[prerequisiteCourseCode] = [];
    for (const courseCode of adj[prerequisiteCourseCode]) {
      if (relevantCourses.has(courseCode)) {
        electiveAdj[prerequisiteCourseCode].push(courseCode);
        indegree[courseCode]++;
      }
    }
  }

  console.log('indegree map: ', indegree);

  return [indegree, electiveAdj];
};

export const getEdgeListFromElective = (chosenElective: string) => {
  const edgeList: [string, string][] = [];

  const visited = new Set<string>();
  const dfs = (courseCode: string) => {
    visited.add(courseCode);
    console.log('edge list finding', courseCode);
    for (const prerequisiteCourseCode of radj[courseCode]) {
      if (!visited.has(prerequisiteCourseCode)) {
        edgeList.push([courseCode, prerequisiteCourseCode]);
        dfs(prerequisiteCourseCode);
      }
    }
  };
  dfs(chosenElective);

  return edgeList;
};

export const getRelevantCoursesGivenEdgeList = (
  edgeList: [string, string][],
) => {
  const courses = new Set<string>();

  for (const [from, to] of edgeList) {
    courses.add(from);
    courses.add(to);
  }

  return Array.from(courses);
};

export const getCourseStartWeeks = (chosenElective: string) => {
  buildReverseGraph();

  const [electiveIndegree, electiveGraph] = getGraphAndIndegreeFromLearningTree(
    getLearningTreeForElective(chosenElective ?? ''),
  );

  return topSort(electiveIndegree, electiveGraph);
};
