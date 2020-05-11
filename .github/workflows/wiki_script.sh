#!/bin/bash

if [ -z "$ACTION_MAIL" ]; then
  echo "ACTION_MAIL ENV is missing"
  exit 1
fi

if [ -z "$ACTION_NAME" ]; then
  echo "ACTION_NAME ENV is missing"
  exit 1
fi

if [ -z "$OWNER" ]; then
  echo "OWNER ENV is missing. Cannot proceed"
  exit 1
fi

if [ -z "$REPO_NAME" ]; then
  echo "REPO_NAME ENV is missing. Cannot proceed"
  exit 1
fi

if [ -z "$MD_FOLDER" ]; then
  echo "MD_FOLDER ENV is missing, using the default one"
  MD_FOLDER='.'
fi

if [ ! -z "$SKIP_MD" ]; then
  DOC_TO_SKIP=(`echo $SKIP_MD | sed s/,/\ /g`)
else
  DOC_TO_SKIP=
fi

if [ -z "$WIKI_PUSH_MESSAGE" ]; then
  echo "WIKI_PUSH_MESSAGE ENV is missing, using the default one"
  WIKI_PUSH_MESSAGE='Auto Publish new pages'
fi

if [ -z "$TRANSLATE_UNDERSCORE_TO_SPACE" ]; then
  echo "Don't translate '_' to space in Markdown's names"
  TRANSLATE=0
else
  echo "Enable translation of '_' to spaces in Markdown's names"
  TRANSLATE=1
fi

cd $GITHUB_WORKSPACE
git init
git config user.name $ACTION_NAME
git config user.email $ACTION_MAIL
git pull https://${GH_PAT}@github.com/$OWNER/$REPO_NAME.wiki.git

for i in "$(find $MD_FOLDER -maxdepth 1 -type f -name '*.md' -execdir basename '{}' ';')"; do
    realFileName=${i}
    if [[ $TRANSLATE -ne 0 ]]; then
        realFileName=${i//_/ }
        echo "$i -> $realFileName"
    else 
        echo $realFileName
    fi
    if [[ ! " ${DOC_TO_SKIP[@]} " =~ " ${i} " ]]; then
        if [[ $i == *.md ]]; then
          sed 's/\/documentation\///g' "$MD_FOLDER$i" > "$GITHUB_WORKSPACE/${realFileName}"
        else
          cp "$MD_FOLDER/$i" "$GITHUB_WORKSPACE/${realFileName}"
        fi
        
    else
        echo "Skip $i as it matches the $SKIP_MD rule"
    fi
done

cp -r $MD_FOLDER/img $GITHUB_WORKSPACE

echo "Pushing new pages"
cd $GITHUB_WORKSPACE
git add .
git commit -m "$WIKI_PUSH_MESSAGE"
git push --set-upstream https://${GH_PAT}@github.com/$OWNER/$REPO_NAME.wiki.git master