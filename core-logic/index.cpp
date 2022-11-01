#include <bits/stdc++.h>
using namespace std;

using Graph = unordered_map<string, vector<string>>;

/* ===========Constants============= */
const int NUM_COURSES = 53;
const int NUM_WEEKS = 100;

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
unordered_map<string, int> course_code_course_duration;
vector<string> electives;
unordered_map<string, int> dist;

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
        // cout << prerequisitie_course_code <<  " -------> " << course_code << endl;
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
 * Topologically sort the graph and find the start week for each course for the initial graph
*/
map<int, vector<string>> top_sort(unordered_map<string, int> &indegree, Graph &adj) {
  unordered_map<string, int> dist;
  map<int, vector<string>> course_start_week;

  // max(course duration of parent) for all parents for a given child node
  unordered_map<string, int> mx_course_duration; 

  queue<string> q;
  for (auto &[course_code, indeg]: indegree) {
    if (indeg == 0) {
      q.push(course_code);
      cout << course_code << " ";
      dist[course_code] = course_code_course_duration[course_code];
      course_start_week[0].push_back(course_code);
      electives.push_back(course_code);
    }
  }

  while (!q.empty()) {
    auto curr = q.front(); q.pop();
    // topological_ordering.push_back(curr);
    
    for (auto &child: adj[curr]) {
      indegree[child]--;
      mx_course_duration[child] = max(mx_course_duration[child], dist[curr]);
      if (indegree[child] == 0) {
        q.push(child);
        course_start_week[mx_course_duration[child]].push_back(child);
        dist[child] = mx_course_duration[child] + course_code_course_duration[child];
      }
    }
  }
  
  return course_start_week;
}

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

pair<unordered_map<string, int>, Graph> get_graph_and_indegree_from_learning_tree(
  vector<vector<string>> learning_tree
) {
  unordered_set<string> relevant_courses;
  for (auto &course_codes: learning_tree) {
    for (auto &course_code: course_codes) {
      relevant_courses.insert(course_code);
    }
  }
  
  unordered_map<string, int> indegree;
  Graph elective_adj;
  for (auto &prerequisite_course_code: relevant_courses) {
    for (auto &course_code: adj[prerequisite_course_code]) {
      if (relevant_courses.count(course_code)) {
        elective_adj[prerequisite_course_code].push_back(course_code);
        indegree[course_code]++;
      }
    }
  }
  for (auto &course_code: relevant_courses) {
    if (!indegree.count(course_code)) {
      indegree[course_code] = 0;
    }
  }
  // for (auto &[pre, courses]: elective_adj) {
  //   cout << pre << " : ";
  //   for (auto &c: courses) cout << c << " ";
  //   cout << endl;
  // }
  // for (auto &[course_code, indeg]: indegree) cout << course_code << " " << indeg << endl;
  
  return make_pair(indegree, elective_adj);
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

void read_course_durations() {
  for (int i = 0; i < NUM_COURSES; i++) {
    string course_code;
    int course_duration;
    cin >> course_code >> course_duration;
    course_code_course_duration[course_code] = course_duration;
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
  
  // int idx = 0;
  // for (auto &elective_course_code: electives) {
  //   auto learning_tree = get_learning_tree_for_elective(elective_course_code);
  //   cout << idx << " : Learning Tree for " << elective_course_code << endl;
  //   for (int level = 0; level < (int) learning_tree.size(); level++) {
  //     cout << level << " : \n";
  //     for (auto &course_code: learning_tree[level]) {
  //       cout << course_code << " " << course_code_course_name[course_code] << endl;
  //     }
  //     cout << "\n";
  //   }
  //   idx++;
  // }

  /* 
   * Build Reverse Graph and find the electives 
  */

  read_course_durations();
  // auto lt = get_learning_tree_for_elective(electives[1]);
  // for (int i = 0; i < lt.size(); i++) {
  //   cout << i << " : ";
  //   for (auto &ai: lt[i]) cout << ai << " ";
  //   cout << endl;
  // }

  auto [elective_indegree, elective_graph] = get_graph_and_indegree_from_learning_tree(
    get_learning_tree_for_elective(electives[9])
  );
  // for (auto &[pre, course_codes]: elective_graph) {
  //   cout << pre << " : ";
  //   for (auto &course_code : course_codes) {
  //     cout << course_code << " ";
  //   }
  //   cout << endl;
  // }

  auto course_start_week = top_sort(elective_indegree, elective_graph);

  cout << "--------------------------------" << '\n';
  for (auto &[start_week, course_codes]: course_start_week) {
    cout << start_week << ": ";
    for (auto &course_code : course_codes) {
      cout << course_code << " ";
    }
    cout << "\n";
  }
  
  return 0;
}