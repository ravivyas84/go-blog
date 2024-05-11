---
title: Moving (back) to a Static website, and retaking rank 1 for my name
date: "2020-08-29"
slug: moving-to-static-website-retaking-rank-1
tags: 
  - seo
layout: layouts/posts.njk

---

{{TOC}}

## The Sad state of the Internet of Text

I have a strong disdain for slow websites. The web has gotten to a point where to read 800 words; you need to transfer multiple megabytes of data and, in many cases, make 100+ Network calls.

Here are some examples of ignorance and abuse 

1000 Words, a news media site

![](/assets/requests_example_1.png)

500 words, a new media site 

![](/assets/requests_example_2.png)

500 words, a blogging platform

![](/assets/requests_example_3.png)

600 words, a FAANG company's blog (8 MB is a gif from another post in the "Related" stories section 🤦‍♂️)

![](/assets/requests_example_4.png)

## My Blog was at fault too.

I was unhappy with my own Wordpress hosted blog.

![](/assets/requests_example_5.png)

Part of the ballooning of requests was due to me embedding tweets. Which I could fix easily, but I was largly unhappy with the performance. 

It is not that I dislike WordPress, products like WordPress and Webflow are enablers for non-developers to build powerful websites and express themselves. I have been a [Webflow proponent](https://twitter.com/search?q=webflow%20(from%3Aravivyas84)&src=typed_query) since 2015 and am a user myself for [StitchIQ](https://www.stitchiq.com/).


## \[Action Required\]

I decided to move back to hosting my blog on a static site, something [I had done in the past](https://twitter.com/ravivyas84/status/1019269612855148544) by [rolling my own static site builder](https://github.com/ravivyas84/NodeStaticSiteGenerator) and using Hugo before that. But this time, after a lot of searching, I decided to join the Eleventy bandwagon and move to Netlify as a hosting service. I will detail out why in future posts. 

## Hope for creativity by constraints

With this move, I also decided to constrain myself with some rules, in the hope I would get creative and make the site more performant and give the reader a better experience. 

### Constraints

**No JS or CSS from a 3rd party domain, or from a request I did not make**

I do use a 3rd party analytics service, Plausibe.io; they are a privacy-aware lightweight Analytics tool, which allows me to serve the JS via my own domain. This is the only JS I am serving unless I am embedding some content.

I am not using any 3rd party CSS framework either; the web has come a long way from the days bootstrap was needed for a responsive website. Flexbox and Grid give you all the necessary capabilities out of the box. As a result, I have a hand-coded 3KB CSS file.
  
**Static Website**

A blog does not have any dynamic content; its only job is to display text. I don't need a WYSIWYG editor, which then creates the need to have a database and an authentication layer. Having both adds security anxiety. 

A blog with an average of 500 words a page does not need either.

**Keep Assets sizes low**

Using large images on a blog is disrespecting users. Why your blog needs to have an 8MB gif is beyond me
![](/assets/madness.png)

I even ranted about it on Twitter, where I mentioned some tips on optimizing images


<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We all know that when it comes to ranking higher in search, page speed is an essential factor. No one likes a slow page. <br><br>The simplest &quot;hack&quot; to speed up your website is to optimize images. Most landing pages &amp; blogs don&#39;t need images larger than 1920px in width. <br><br>Thread 👇</p>&mdash; Ravi Vyas (@ravivyas84) <a href="https://twitter.com/ravivyas84/status/1285946760863465474?ref_src=twsrc%5Etfw">July 22, 2020</a></blockquote> 

The tips are simple
1. Keep width under 1920 Pixels 
2. Use an image optimization tool like imageoptim.

Jusing ImageOptim for this post resulted in a saving of 70%

![](/assets/image_performance.png)

## Results 

### Network Performance 
By moving to a static website, I went from 68 Requests and 3.2 MB of resources to 6 requests and 446 KB of resources, of which 424 KB is a single image, making the site faster.

![](/assets/requests_example_static_site.png)

### Page Speed insights
This increase in speed improved the performance of the site. Below are page speed insights scores for a post with 6 images (1.4 MB)

![Non Static Site](/assets/page_speed_insights.png)

![Static Site](/assets/page_speed_insights_static.png)

### Ranking

Improving the speed also helped me rank higher for my name. I went from ranking 4 or 5 to rank 1 on Google. My average rank is now two or lower. 

![Ranking Change](/assets/ranking.png)

I did change the content of my home page, it moved from being a list of blogs to an about page, but I was never at rank 1 for the same setup when I was on WordPress. 

*Why the about page? If someone searches for "ravi vyas", they want to know more about me, not what I have recently posts.*