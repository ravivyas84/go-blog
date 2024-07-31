---
title: When Surprises are perceived as broken products
date: "2024-07-31"
 
slug: when-surprises-are-perceived-as-broken-products

tags: 
- product-management

layout: layouts/posts.njk

--- 

A critical job a product needs to do is to allow the user to build a mental model[^1] of how the product works. As the model gets built, the effort required to use the model becomes easier. It also allows power users, to guess with high probability, what went wrong when the product is not working. 

To help your user build a mental model the feedback the product provides needs to be consistent. Let me share a recent story on how my EV breaks my mental model. 

My family owns an EV, which has paddle shifts. Coming from the internal combustion engine (ICE) world, I expect it to change gears, that is the mental model of paddle shifts I have. This car ignores that, what it does instead is change the aggressiveness of the regenerative braking system across 4 levels, with 0 being off and 3 being the highest. Now my brain needs to adjust based on the car I am driving. Post adjustment I change my driving style to use the regenerative braking to slow down, and the regular brakes to stop. 

One day, on the rare occasions the car battery was at 100%, the paddle sift does not slow the car down. I panic, did something break? But after a little while they start working. My guess is, because as battery is at 100%, the car decided not to slow down as it does not need to regen, but the team designing this forgot about the braking part. Worse it does not give me any alerts that braking won’t work at full charge.

This is a not so simple way to showcase different behaviours of the system on the same input. Imagine a digital product where pressing the same button would do different things, or a door closing with different speeds even though the same amount of effort was put in. Such things surprise a user, and at most times the user perception will be that the product broke.

[^1]: Further reading - [Mental Model](https://lawsofux.com/mental-model/)
