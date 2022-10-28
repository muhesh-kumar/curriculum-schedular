#!/bin/bash

# script to run vercel build previews only on main branch
if [[ $VERCEL__GIT_COMMIT_REF =~ "main" ]] ; then
  echo ">> Proceeding with deploy."
  exit 1; 
else
  echo ">> Skipping deploy!"
  exit 0;
fi