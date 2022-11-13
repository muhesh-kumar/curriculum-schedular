# Curriculum Schedular

## Setting up the Development Environment

1. Clone the project
1. Install dependencies `yarn`
1. Setup precommit hooks `yarn husky install`
1. Create a .husky/pre-commit file and fill it with the following contents
1. ```
   #!/usr/bin/env sh
   . "$(dirname -- "$0")/_/husky.sh"

   # yarn tsc --noEmit && yarn eslint . && yarn prettier --write .
   yarn lint-staged
   ```

1. Make .husky/pre-commit executable `chmod +x .husky/pre-commit`
1. Start the development server `yarn dev`

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## References

### For graph implementation on the Client Side:

- https://reactflow.dev/

- https://reactjsexample.com/a-react-library-for-building-node-based-graphs/

- https://webkid.io/blog/react-flow-node-based-graph-library/

- https://dev.to/vaibhavkhulbe/make-interactive-node-based-graphs-with-react-flow-102d

### Google Auth Tutorial

- https://www.youtube.com/watch?v=A5ZN--P9vXM

### Next Authentication Boilerplate

- Tutorial: https://www.youtube.com/watch?v=CL-rlA5g9Zg

- Boilerplate repo: https://github.com/akashyap2013/Authentication_App_with_Google_and_Github

### File Upload

- Design Inspiration: https://dribbble.com/shots/7193229-File-Upload-DailyUI-day031

- React Library for drag and drop functionality: https://react-dropzone.js.org/
