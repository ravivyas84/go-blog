---
title: Eclipse Install error- eclipse JVM terminated. Exit code=13
date: "2011-07-03"
slug: eclipse-install-error-eclipse-jvm-terminated-exit-code13



tags: 
  - software-development 
layout: layouts/posts.njk

---

I have this bad habit of giving up on ubuntu and removing it after it breaks, but then I miss the command line and install it again, due to which I have it set up my tool over and over again. One of the most important tools is Eclipse which I need for Android development. Usually, I follow the right steps and get eclipse up and running without any issue, but twice I have come across this error

_eclipse JVM terminated. Exit code=13_

This occurs when something is wrong with your java setup. Here are 4 possible problems and their solutions:

1\. Java is not installed: Hey we are human, we may have forgotten the first rule of running eclipse which states you need java. This issue won’t probably show up on ubuntu as it comes with OpenJDK installed. To solve this problem we need to install Java here is how :

Open your Terminal and run the following commands

_$ sudo add-apt-repository "deb http://archive.canonical.com/ lucid partner"_

_$ sudo apt-get update_

_$ sudo apt-get install sun-java6-jdk_

You may want to install Jre too , here is the command for that

_$ sudo apt-get install sun-java6-jre_

On windows just download the java setup from this link: [http://goo.gl/iIxCL](https://web.archive.org/web/20120508001455/http://www.oracle.com/technetwork/java/javase/downloads/index.html)

Now if all goes well and your stars are aligned, Eclipse will start up and you can get back to work, else you need to try the next step

2\. So you installed java but did we set up the PATH variables so that our OS knows where java is? Now before that we need to check if already is set up correctly, for that we just need to run the command _java_ in a terminal , if set up correctly you will see a bunch of help commands related to java , else you will see a command not found error, in which case you need to set the variables for eclipse to work, here are some links to help you with it : Windows : http://goo.gl/Z61Cj , Linux : http://goo.gl/dJpjR . Try running eclipse now.

3\. So you installed java, we know java is running using step 2, and you are still getting the same error? (This step is only for Linux users) . Now let’s do some diagnostics, let’s check if you have multiple version of java installed, this can occur if you forgot to uninstall OpenJDK while installing Sun-Java. To check if you have multiple versions installed, run this command :

_update-alternatives –config java_

If you do have multiple versions, you can use the command above to set Sun-Java as your default java or if you are like me, outright remove OpenJDK using the following command:

_sudo apt-get remove openjdk-6-jdk_

Try running eclipse now.

4\. Now for the last check-in my checklist, make sure you are running the correct and similar version of java and Eclipse, don’t try to run the 32bit version of Java with 64bit version of eclipse or vice versa.  TO check the version of java installed use this command :

java -d64 -version

If you are running a 64bit version of java you get some java info, else you get an error.

Now if your eclipse is still not running you need to contact an expert. Hope this long and at times confusing post help you
