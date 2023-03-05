# npm initialize

npm init -y

# installing some packages

npm i mongoose express cors dotenv express-async-handler bcrypt crypto cloudinary multer @sendgrid/mail sharp jsonwebtoken

# nodemon for development purpose

npm i nodemon --save-dev

# Task

-> Hashtag model
-> Reply comment
-> Story Stuff --> Story delition after 24 hrs
-> Tagging
-> Sharing
-> Video
-> User block
-> Location
-> Comment like
-> Notifications

# Email

socialmediahelp.11919@gmail.com

<!--
#git branches imp cmds

##list branches

git branch (gives only local git branches)

git branch -a (gives both local and remote branches)

###to travel through branches

git checkout 'branchname' if branch already exists in local or remote

git checkout -b 'branchname' if branch doesn't exist, this creates new one

####branch pull and push

git pull 'remote' 'branchname'

git push 'remote' 'branchname'

#####delete branches
git branch -d 'branchname' deletes the local branch
git branch -dr 'remote'/'branchname' deletes the tracking branch
git push 'remote' -d 'branchname' deletes the remote branch

###### branch diff cmd
git diff remote/branchname..remote/branchname

####### branch merge
git merge 'branchname'

## STEPS:
1. Check present working local branch
2. Pull origin master
3. Experiment
4. Push origin personal branch
5. Go to github and create a new pull request
6. if approved by owner, keep a copy in local master branch by pulling remote master again

NOTE: in most cases remote is origin and branchname is not the master
 -->
