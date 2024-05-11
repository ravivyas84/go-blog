---
title: "Using Spreadsheets to Generate Text for various uses"
date: "2023-01-12"
slug: using-spreadsheets-to-generate-text-for-various-uses
tags: 
  - spreadsheets
  - hacks
layout: layouts/posts.njk
description : Spreadsheets are often faster and more accessible than coding in any language. They can be used to generate large amounts of text, such as commands for a CLI or JSON.
---

Here is another reason I love spreadsheets, it is great at generating large volumes of text which have a series of numbers in them. Here are a few quick examples 

## Generate multiple commands to run in a CLI

I actually have 2 examples here, the first one is where I generated 26 curl commands to download the 26 annual letters. I could do this because the only thing that changed in the link was the year. Here is the link for the 2017 letter

[`https:/berkshirehathaway.com/letters/2017ltr.pdf`](https:/berkshirehathaway.com/letters/2017ltr.pdf)

here is how I generated 26 curl commands  

![](/assets/SCR-20230112-tmw.png)

I used Excel's concatenate formula with the number series. Note the semicolon at the end which allowed me to paste all of them in the terminal at once 

Another place I used this was when I had to delete multiple partitions from BigQuery without deleting the entire table.  I have used this enough times that I started to maintain a folder for the scripts

![Screenshot 2023-01-12 at 9.17.59 PM.png](/assets/Screenshot_2023-01-12_at_9.17.59_PM.png)

Here is one of the scripts. In this case, I added an echo statement to track the progress

![SCR-20230112-tmw.png](/assets/SCR-20230112-tmw.png)

## Generating JSON

We are heavy users of Firebase remote config at Jambox Games. In case you don’t know what Remote Config is, here is a definition from their docs

> Firebase Remote Config is **a cloud service that lets you change the behavior and appearance of your app without requiring users to download an app update**
. When using Remote Config, you create in-app default values that control the behavior and appearance of your app.
> 

For one of our games which used the [Jambox Game’s Arena system](https:/jambox.games) ( Async Multiplayer for Games) we were required to put in puzzles for each event, which was provided to the event as a JSON parameter like the following 

```json
{"level": 0, "word_list": [	{"context": "Tiny insect - red or black ", "correct": "ANT","alphabets":"L,H,O"},		
	{"context": "Meow... meow!", "correct": "CAT","alphabets":"I,X,L"},		
	{"context": "Milk", "correct": "COW","alphabets":"M,A,J"},		
	{"context": "Hen", "correct": "EGG","alphabets":"S,B,V"},		
	{"context": "Man's best friend", "correct": "DOG","alphabets":"M,B,A"}	], "global_step_time": 60}
```

It is basically a list of works, with a hint attached to it. 

We started using an spread sheet to build our content bank, but I did not want to go back to the tech team for every small change…

![Screenshot 2023-01-12 at 9.29.03 PM.png](/assets/Screenshot_2023-01-12_at_9.29.03_PM.png)

…. thus I built the JSON builder into the sheet itself. 

![SCR-20230112-twr.png](/assets/SCR-20230112-twr.png)

There is a lot going on here: Here is what i am doing, I am concatenation the word and hint in column G and H for every row, and concatenating some other JSON data once for every 5 words in column X and Z.

By copying all the cells together, I get the JSON i needed above 

```json
{"level": 0, "word_list": [	{"context": "Tiny insect - red or black ", "correct": "ANT","alphabets":"L,H,O"},	
	{"context": "Meow... meow!", "correct": "CAT","alphabets":"I,X,L"},	
	{"context": "Milk", "correct": "COW","alphabets":"M,A,J"},	
	{"context": "Hen", "correct": "EGG","alphabets":"S,B,V"},	
	{"context": "Man's best friend", "correct": "DOG","alphabets":"M,B,A"}	], "global_step_time": 60}
```

The goal for such builders is simple, concatenate what is static with what is changing. To simplify the formulas, I also split the output to 3 columns. There is a lot more going on in this sheet, from Level number management (Col X) to generating incorrect letters, which are not a part of the word, to even checking for Duplicates (the big red box, which is basically doing `=if(COUNTUNIQUE(G4:G1147)=G2,"No Dupes","Duplicates!!!!")`

## End note

A lot of technical folks have a strong dislike for spreadsheets, or simply think they can code a few lines in their favourite language and get work done faster, but excel is almost always faster, and more importantly, it is used by everyone.