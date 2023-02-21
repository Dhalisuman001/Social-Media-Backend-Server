# npm initialize

npm init -y

# installing some packages

npm i express cors dotenv express express-async-handler

# nodemon for development purpose

npm i nodemon --save-dev

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

######branch diff cmd
git diff remote/branchname..remote/branchname

NOTE: in most cases remote is origin and branchname is not the master
 -->