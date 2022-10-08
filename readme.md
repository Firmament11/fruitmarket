前台：http://localhost:8080/beforePage/toIndex

后台：http://localhost:8080/page/toLogin
<img src="http://localhost:8080/uploadfiles/notice/c0ec50a5-ee55-4c54-8d1d-213847d253ab.jpg" alt="c0ec50a5-ee55-4c54-8d1d-213847d253ab.jpg">

Git入门？查看 帮助 , Visual Studio / TortoiseGit / Eclipse / Xcode 下如何连接本站, 如何导入仓库

简易的命令行入门教程:
Git 全局设置:

git config --global user.name "uuu"
git config --global user.email "8892978+im-daddy@user.noreply.gitee.com"
创建 git 仓库:

mkdir mall_2019
cd mall_2019
git init 
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/im-daddy/mall_2019.git
git push -u origin "master"
已有仓库?

cd existing_git_repo
git remote add origin https://gitee.com/im-daddy/mall_2019.git
git push -u origin "master"

mvn install:install-file -Dfile=F:\WorkSpaces\IdeaProjects\mall\SSM\Mall_2019\lib\ueditor-1.1.2.jar -DgroupId=com.baidu -DartifactId=ueditor -Dversion=1.1.2 -Dpackaging=jar