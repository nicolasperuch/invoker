#!/bin/bash
echo -e "\n\t CREATING WORKING DIR\n"
cd ..
GIT_REPOSITORY=$1
BASE_PATH=$(pwd)
mkdir working-dir
cd working-dir
echo -e "working-dir created at: " $BASE_PATH
echo -e "\n\tSTEP 1 [CLONING REPO]\n\n"
git clone $GIT_REPOSITORY
TARGET_REPO_NAME=$(ls)
echo -e "\ntarget repo: " $TARGET_REPO_NAME
cd $TARGET_REPO_NAME
TARGET_REPO_FULL_PATH=$(pwd)
echo -e "\nfull path repo: " $TARGET_REPO_FULL_PATH 
mv $BASE_PATH/new-model.txt $TARGET_REPO_FULL_PATH/Jenkinsfile
cd $TARGET_REPO_FULL_PATH
echo -e "\n\tSTEP 2 [GIT]\n\n"
git add .
git commit -m "[INVOKER] Adding Jenkinsfile :)"
git push 
echo -e "\n\tSTEP 3 [RM TEMP FILES]\n\n"
cd $BASE_PATH
rm -rf working-dir
echo -e "Done!"