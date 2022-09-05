#include <bits/stdc++.h>
using namespace std;

/* ===========Course============= */
class Course {
  public:
    string course_name;
    string course_url;
    int course_duration;
    vector<Course *> course_prerequisites;
    string course_category;
    string course_topic;
  
    Course();
    Course(
      const string &, const string &, 
      int, 
      const vector<Course *> &,
      const string &,
      const string &
    );
};

Course::Course() {}

Course::Course(
  const string &_course_name, 
  const string &_course_url, 
  int _course_duration, 
  const vector<Course *> &_course_prerequisites,
  const string &_course_category,
  const string &_course_topic
) {
  course_name = _course_name;
  course_url = _course_url;
  course_duration = _course_duration;
  course_prerequisites = _course_prerequisites;
  course_category = _course_category;
  course_topic = _course_topic;
}

/* ===========Curriculum============= */
class Curriculum {
  public:
    vector<Course *> curriculum_courses;
    
    Curriculum();
    Curriculum(const vector<Course *>&);
    
};

Curriculum::Curriculum() {}

Curriculum::Curriculum(const vector<Course *> &_curriculum_courses) {
  curriculum_courses = _curriculum_courses;
}

int32_t main() {

  Course * c = new Course();
  cout << "testing main" << "\n";
  Curriculum cc;

  return 0;
}
