if [ -d "/home/coder/project/workspace/reactapp/src/tests/" ]
    then
        rm -r /home/coder/project/workspace/reactapp/src/tests;
fi
cp -r /home/coder/project/workspace/react/tests /home/coder/project/workspace/reactapp/src/;
cd /home/coder/project/workspace/reactapp/;
nvm use 14
export CI=true;
npx react-scripts test --verbose --testPathPattern=src/tests 2>&1;
