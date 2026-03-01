---
title: Dev Tools and Moats
date: "2026-03-01"
tags: 
- product-management
- artificial-intelligence
layout: layouts/posts.njk
slug: dev-tools-and-moats
---

## Two Questions That Are Really One

Over the last week, I’ve had two different conversations with two different friends. One asked me where dev tools are headed. Another asked, almost casually, what happens to moats in an AI-first world.

I think both questions have the same answer, and that answer is largely linked to the companies building foundational models.

[Last week I wrote](/2026/02/22/something-big-is-happening-notes-from-my-world) about how AI has changed the way I approve PRs from my phone, building variants instead of single solutions, throwing most of it away without regret.

I'm not alone. Lots of people, many far more skilled than me, have been saying the same thing. AI models have gotten good enough that a lot of us aren’t writing code the way we used to — at least not for large parts of the workflow

There is an important subtext of this shift: if nobody's writing code, nobody needs an IDE.

## From IDEs to Agents

You can see this not just in how people consume tools, but in how the tools themselves are being built. The new tools you're hearing about are agents - Claude Code, Codex, OpenClaw. Look at what Cursor is doing: moving away from tab-complete and IDEs toward actually running your code in some sort of environment for you. The tool is no longer a place you write code. The tool writes the code.

That feels like the future, if so what is a moat?

## What Was a Moat?

Historically, if you look at SaaS, moats have been brand. Moats have been the UI you had, or the underlying data you had. We had phrases for them: system of record, developer experience, overall experience. Those were, [in some ways, moats driven by incentives](/2018/10/26/incentives-their-effects-on-products/) - whoever controlled the experience or the data had leverage over the buyer.

But what is the future of a tool when everybody can make the tool?

It’s a bit like asking what the future of a hammer looks like once anyone can make one cheaply and quickly. Is it a better hammer? A different tool entirely? Or does the question itself stop mattering?

Here's where it gets interesting. In 2014, I wrote a post called [Going Downhill from "Let's Build It In House."](/2014/12/06/going-downhill-from-lets-build-it-in-house/) My argument then was simple: don't build your own tools. You're probably not competent enough. It distracts from your core product. SaaS is cheaper. Just buy it.

That calculus has flipped.

When AI collapses the effort to build software, a large enterprise can afford a small tiger team to just make the tool they need. It'll integrate better with their existing stack. They'll build only what they need. They won't be using 20% of the software and paying for 80% of it, because the old model required building for the masses.

This feels like the extreme version of an old idea: if you’re building for everybody, you’re probably not building the best tool for anyone in particular.

## A Two-Person Firm Competing With Hundreds

This isn't just a dev tools story. It's playing out everywhere.

Zack Shapiro runs a [two-person law firm](https://x.com/zackbshapiro/status/2027389987444957625). They handle startup formation, venture capital transactions, and regulatory work. They compete against firms with hundreds - sometimes thousands - of lawyers.

He's not using specialized legal AI products. Not Harvey. Not CoCounsel. Not Spellbook. He uses Claude,a general-purpose model. with custom "skills" that encode his own judgment, his preferred formats, his analytical frameworks, his voice.

His take is that specialized tools solve a problem that barely matters (which template the AI starts with) and miss the one that does (teaching the AI how *you* think about the work). As he puts it:

> General-purpose AI advances faster than any vertical product can keep up with. When you're on the frontier model, every new capability ships to you on day one. When you're on a wrapper, you're waiting for someone else's engineering team to decide what to build next.

A generalist model, with good instructions, beats a niche tool. If this is happening in law, it is happening everywhere.

## What Happens to Niche Dev Tools?

Now bring this back to dev tools.

I'm calling names out, but I'm using them as examples, not picking on any one company. What if you're a Fly.io? A Railway? A Render? What's the intelligence at the infra layer? What's the business model? What's the margin?

Most of the large model companies are already running massive infrastructure. The code that they build for you - and run, and debug - is running somewhere. What if they flip the switch and say, hey, we'll keep it persistent so your users can access it?

Replit, Lovelable are the one I see doing this - going from a model that writes your code to also running your infrastructure. But, what happens when the foundational model company writes your code, writes your tests, raises your PRs, reviews your PRs, and deploys? On one side, once that happens, most of what sits underneath starts getting abstracted away. The surface area where you can add real, durable value shrinks. A lot of it starts to look like a commodity. And on the other side, how do you compete with the foundation model companies?

## Death of the experience moat

Today, once I've connected Vercel to GitHub, as soon as Claude raises a PR, I just approve it. The build happens. Vercel bot gives me a preview link. I preview it. I go back to Claude, give it some feedback. I don't need to keep going into the Vercel dashboard. That experience is no longer needed, unless something goes wrong.

A call out to make is, I'm building small software. Prototype software or tiny tools. What happens at production scale, I'm not sure. But what's stopping Claude Code or Codex from going and looking at your observability graphs and logs and figuring out what's wrong?

Now, this might not be true for everything. Tools that serve deep enterprise needs like SharePoint, Tailscale, Auth0 are not going anywhere anytime soon. The compliance surface, the integration depth, the regulatory needs are real. But even these tools will hit a ceiling, and that ceiling might be lower than where it is today. The addressable market shrinks when smaller companies and teams can build their own. Eugene Wei wrote about [invisible asymptotes](https://www.eugenewei.com/blog/2018/5/21/invisible-asymptotes) the hidden ceilings that cap a company's growth curve before anyone notices. For a lot of dev tools, those asymptotes are about to become visible.

## The Agent as the Primary Consumer

Here's the deeper shift. Your agent is going to build your code, see the UI, improve the UI, look at bugs, fix bugs. It's doing everything end to end.

If you look at it from that perspective, the agent becomes the primary consumer of dev tools. So what's a dev tool? Is it a tool for a developer, or a tool for an agent?

A few things follow from this.

**Agents don't need documentation.**

The abstraction layers we've built over the years, frameworks on top of frameworks, wrapper libraries, thousands of lines of glue code existed because humans needed help (and fight about tabs vs spaces). We couldn't hold the whole system in our heads, so we built layers to manage the complexity. Each layer made the next person's job easier. Each layer needed documentation so that it could be used by a human.

Agents don't have that limitation. They can hold the full architecture in context and just write the code. They don't need an intermediate framework to stay organized. They just need a spec and a foundation.

**Agents don't even need your library.**

If your value proposition was "we packaged this capability into an easy-to-use SDK," that value is collapsing. An agent can read your marketing page, understand what the product does, and write its own implementation. The packaging was the product. The packaging is now free, the problem no longer exists.

**Someone using an agent can rewrite an entire library in a week.**

Cloudflare just demonstrated this with [vinext](https://blog.cloudflare.com/vinext/). One engineer directing an AI model rebuilt the Next.js API surface on Vite in under a week. 1,700+ tests. 94% API coverage. $1,100 in tokens. Their key insight is worth sitting with: most abstractions in software exist because humans need help, and AI doesn't have the same limitation. It doesn't need a wrapper or an intermediate framework. It holds the whole system in context and writes what's needed.

If an agent can rewrite an entire framework in a week, what exactly is the moat of a dev tool?

**Agents don't need dev rel and marketing teams.**

Today, dev tools grow through developer relations, community building, conferences, blog posts, tutorials. A huge part of the moat was the community around a tool, the Stack Overflow answers (for those of us old enough to remember), the Discord channels. But if agents are the primary consumers, they don't need a community. They don't go to meetups. They don't read your blog. They don't need to be evangelized to. The whole go-to-market motion for dev tools gets called into question.

What happens to communities? What happens to dev rel teams? What happens to the entire ecosystem that existed to help humans adopt and learn tools?

## You Build What You Need

When the cost of building drops to near zero, you stop paying for software you don't use.

I've already started doing this. [CapabilityMap](https://ravivyas.com/capabilitymap/) is a browser-based tool I built for visualizing product capabilities as a single HTML, No backend required. [Daily Notes](https://ravivyas.com/dailynotes/) is a VS Code extension I built for daily notes and task tracking, inspired by todo.txt and NotePlan. Both built with AI. Both solve exactly my needs, with new solutions being built in minutes by claude.

[Years ago I wrote about how low-code tools](/2019/12/05/forget-nocode-the-next-big-wave-is-lowcode/) would change the face of computing. The progression from no-code to low-code to AI-as-the-coder is a line I've been tracing for a while now. We might be at the logical extreme of it. Excel was the "proxy app" building tool, Claude can build actual apps for the same folks.

## So what is the future of dev tools & Moats?

The long read you just went thought, is really just a long way of saying one thing: the future of dev tools is might just be tools like Claude Code & Codex, powered by foundation model companies. The will aggregate all the demand at the top of the "jobs to be done funnel". It is the dev tools version of no one needs a drill, they need a 1 inch hole. 

Agentic tools will strip away all the layers, thus the moats.

## Open Questions

I don't know what the future of dev tools or moats is, this essay is just a meditation on a possible future.

I do know the direction. It is changing  quickly for those paranoid as we push the limits at the bleeding edge, and slowly for everyone else.