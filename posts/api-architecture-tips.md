---
title: API Architecture Tips
date: "2011-05-26"
slug: api-architecture-tips



tags: 
  - software-development 
layout: layouts/posts.njk

---

I am just about to complete a project where my company architected an API for a client. I learned a lot of things during this project. So here are my tips for API architecture.

1. Never have a single person design an API  
    A lot can be said about why to do this. A simple answer is when someone thinks of a solution he/she is usually biased towards that solution unless proven wrong. Now to keep the bias in check and if needed challenge an idea you need a second person. Also, more people equal to more ideas. But don’t have a huge team, it will slow down the entire process.
2. Make APIs concise: An API that is not concise is usually hard to understand and implement.
3. Plan for the future  
    Keep in mind future functionalities the API might have, also make sure that the API is built of simple blocks so that future versions need not have to rewrite the entire API
4. Explain everything: A well-explained API is a widely used API :)
5. Try to save on network calls if API is used by a Mobile device  
    Network calls increase latency, thus try to keep them to a minimum. If needed bundle a bunch of APIs into one and let the client decide which API to use.
6. Push the computation to the server  
    Not much to explain here, a bunch of servers is any day more powerful than a client machine.

Let me know if you have any feedback
