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

/* ===========Globals============= */
vector<Course *> courses;
unordered_map<string, string> course_code_course_name;

/* ===========Course Graph============= */
unordered_map<string, vector<string>> adj;

vector<string> get_words(const string &s, const char delim = ' ') {
  vector<string> words;
  
  string word;
  for (auto &ch: s) {
    if (ch == delim) {
      words.push_back(word);
      word = "";
    } else {
      word.push_back(ch);
    }
  }
  if (!word.empty())
    words.push_back(word);

  return words;
}

/*
 * Read courses which are given in the following format:
 * (Course Name, Course Code)
*/
void read_courses(int num_courses) {
  while (num_courses--) {
    string line;
    getline(cin, line);
    vector<string> words = get_words(line);
    
    string course_code = words.back();
    string course_name;
    for (auto &ai: words) {
      if (ai == course_code) continue;
      course_name += ai;
    }

    course_code_course_name[course_code] = course_name;
  }
}

/*
 * Read and build the graph which is given in the following format:
 * (Course Code, [Prerequisite Course Code#1, ....Prerequisite Course Code #2])
*/
void build_graph(int num_nodes) {
  while (num_nodes--) {
    string line;
    getline(cin, line);

    vector<string> course_codes = get_words(line, ' ');
    string course_code = course_codes.front();
    
    if (course_codes.size() > 1) {
      vector<string> prerequisitie_course_codes = get_words(course_codes[1], ';');
      adj[course_code] = prerequisitie_course_codes;
    } else {
      adj[course_code] = {};
    }
  }
}

/*
 * Topologically sort the graph and identify the electives (i.e., nodes with 0 outdegree)
*/

int32_t main() {
  freopen("input.txt", "r", stdin); 

  Course * c = new Course();
  cout << "testing main" << "\n";
  Curriculum cc;
  
  /* Build the course_code - course_name map */
  read_courses(51);
  for (auto &course: course_code_course_name) {
    cout << course.first << " " << course.second << "\n";
  }
  
  /* Build the graph */
  build_graph(53);
  for (auto &node: adj) {
    cout << node.first << " : ";
    for (auto &child: node.second) {
      cout << child << " ";
    }
    cout << "\n";
  }

  return 0;
}