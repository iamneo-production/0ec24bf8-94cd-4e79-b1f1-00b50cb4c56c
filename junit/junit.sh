#!/bin/bash
if [ -d "/home/coder/project/workspace/springapp/" ]
then
    echo "project folder present"
    # checking for src folder
    if [ -d "/home/coder/project/workspace/springapp/src/" ]
    then
        cp -r /home/coder/project/workspace/junit/test /home/coder/project/workspace/springapp/src/;
		cd /home/coder/project/workspace/springapp/;
		mvn clean test;
    else
        echo "BEadd_user FAILED";
        echo "BEadd_profile FAILED";
        echo "BEget_profile FAILED";
        echo "BEupdate_profile FAILED";
    fi
else
	echo "BEadd_user FAILED";
    echo "BEprofile FAILED";
    echo "BEget_profile FAILED";
    echo "BEupdate_profile FAILED";
fi
