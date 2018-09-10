#!/bin/bash
echo -e "\n\t CREATING WORKING DIR\n"
cd ..
mkdir working-dir
cd working-dir
echo -e "working-dir created at: " 
pwd
echo -e "\n\t\tSTEP 1 [CLONING REPO]"
git clone https://github.com/nicolasperuch/micro-hello-world.git
TARGET_REPO=$(ls)
echo -e "target repo: "
echo $TARGET_REPO
cd $TARGET_REPO
pwd