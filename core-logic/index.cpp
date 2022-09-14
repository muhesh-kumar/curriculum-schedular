#include <bits/stdc++.h>
using namespace std;

using Graph = unordered_map<string, vector<string>>;

/* ===========Constants============= */
const int NUM_COURSES = 53;

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
vector<Course *> courses(NUM_COURSES);
unordered_map<string, string> course_code_course_name;
unordered_map<string, int> indegree, outdegree;
vector<string> electives;

/* ===========Course Graph============= */
Graph adj, radj;

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
void read_courses(int num_courses = NUM_COURSES) {
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
void build_graph(int num_nodes = NUM_COURSES) {
  while (num_nodes--) {
    string line;
    getline(cin, line);

    vector<string> course_codes = get_words(line, ' ');
    string course_code = course_codes.front();
    
    adj[course_code];
    if (course_codes.size() > 1) { // if current course has any prerequisite
      vector<string> prerequisitie_course_codes = get_words(course_codes[1], ';');
      for (auto &prerequisitie_course_code: prerequisitie_course_codes) {
        // build an edge "prereq -------> course"
        adj[prerequisitie_course_code].push_back(course_code);
        cout << prerequisitie_course_code <<  " -------> " << course_code << endl;
      }
    }
  }
}

/*
 * Assumes the original graph is already built
*/
void build_reverse_graph() {
  for (auto &[prerequisitie_course_code, course_codes]: adj) {
    // initializing it if it's not available
    radj[prerequisitie_course_code];

    for (auto &course_code: course_codes) {
      radj[course_code].push_back(prerequisitie_course_code);
    }
  }
}

/*
 * Find indegree and outdegree of each node in the original graph
 * to find the top level prerequisites and bottom level electives respectively
*/

void find_indegree_and_outdegree() {
  for (auto &[prerequisitie_course_code, course_codes]: adj) {
    indegree[prerequisitie_course_code];
    outdegree[prerequisitie_course_code];

    for (auto &course_code: course_codes) {
      outdegree[prerequisitie_course_code]++;    
      indegree[course_code]++;
    }
  }
}

/* assumes find_indegree_and_outdegree() has been called already */
void find_electives() {
  for (auto &[course_code, outdeg]: outdegree)
    if (outdeg == 0)
      electives.push_back(course_code);
}

/*
 * Topologically sort the graph and identify the electives (i.e., nodes with 0 outdegree)
*/
// vector<string> topological_ordering;
// void top_sort() {
//   queue<string> q;
//   for (auto &[course_code, indeg]: indegree) {
//     if (indeg == 0) {
//       q.push(course_code);
//       electives.push_back(course_code);
//     }
//   }
//   while (!q.empty()) {
//     auto curr = q.front(); q.pop();
//     topological_ordering.push_back(curr);
//     for (auto &child: adj[curr]) {
//       indegree[child]--;
//       if (indegree[child] == 0) q.push(child);
//     }
//   }

//   // Ensuring that the graph is not disconnected
//   assert(topological_ordering.size() == NUM_COURSES);
// }

/*
 * Given an elective find the list of courses we need to take before taking 
 * the elective in incresing order of their levels in the graph with respect to the elective. 
 * Here, level is the distance between the node and the given electie
*/
vector<vector<string>> get_learning_tree_for_elective(
  const string &elective_course_code) {
  unordered_set<string> visited;
  unordered_map<int, vector<string>> learning_tree;

  function<void(const string &, int)> dfs = [&] (
    const string &course_code, 
    int level) {

    visited.insert(course_code);
    learning_tree[level].push_back(course_code);

    for (auto &child_course_code: radj[course_code]) {
      if (!visited.count(child_course_code)) {
        dfs(child_course_code, level + 1);
      }
    }
  };
  dfs(elective_course_code, 0);
  
  vector<vector<string>> learning_tree_flattened;
  for (auto &[level, course_codes]: learning_tree) {
    learning_tree_flattened.push_back(course_codes);
  }
  
  return learning_tree_flattened;
}

void print_graph(Graph &graph) {
  for (auto &node: graph) {
    cout << node.first << " : ";
    for (auto &child: node.second) {
      cout << child << " ";
    }
    cout << "\n";
  }
}

int32_t main() {
  freopen("input.txt", "r", stdin); 

  Course * c = new Course();
  cout << "Testing main" << "\n";
  Curriculum cc;
  
  /* 
   * Build the course_code - course_name map 
  */
  read_courses(NUM_COURSES);
  // for (auto &course: course_code_course_name) {
  //   cout << course.first << " " << course.second << "\n";
  // }
  
  /* Build the graph */
  build_graph(NUM_COURSES);
  // cout << "Initial Graph: " << "\n";
  // print_graph(adj);  
  
  /* Find Indegree and Outdegree for each node in the graph */
  find_indegree_and_outdegree();
  // cout << "Outdegree in the original graph to see what are electives: " << "\n";
  // for (auto &[course_code, outdeg]: outdegree) {
  //   cout << course_code << " " << outdeg << "\n";
  // }
  
  find_electives();
  // for (auto &elective: electives)
  //   cout << elective << " ";
  // cout << endl;

  // for (auto [course_code, v] : course_code_course_name) {
  //   cout << course_code << " " << indegree[course_code] << " " << outdegree[course_code] << endl;
  // }

  /* 
   * Build Reverse Graph and find the electives 
  */
  build_reverse_graph();
  // cout << "Reverse Graph: " << "\n";
  // print_graph(radj);
    
  // cout << "Electives:\n";
  // for (auto &elective: electives) {
  //   cout << elective << " " << course_code_course_name[elective] << endl;
  // }
  // cout << electives.size() << endl;
  
  for (auto &elective_course_code: electives) {
    auto learning_tree = get_learning_tree_for_elective(elective_course_code);
    cout << "Learning Tree for " << elective_course_code << endl;
    for (int level = 0; level < (int) learning_tree.size(); level++) {
      cout << level << " : \n";
      for (auto &course_code: learning_tree[level]) {
        cout << course_code << " " << course_code_course_name[course_code] << endl;
      }
      cout << "\n";
    }
  }
  
  return 0;
}