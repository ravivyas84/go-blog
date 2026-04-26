---
title: "The Two Things That Make My AI Development Actually Work"
date: "2026-04-26"
slug: "specs-iterations-ai-development"
tags:
  - artificial-intelligence
  - product-management
  - software-development
description: "One-shotting looks impressive in demos. It falls apart in practice. Here is the workflow that actually works: a spec upfront, and small, iterable components."
author: "Ravi Vyas"
layout: layouts/posts.njk
---

![](/assets/spec-hero.png)

You are reading this on a blog designed by AI. Built with AI. Written with AI as an assistant.

But probably not the way you're imagining.

## The parlor trick

One-shotting is everywhere right now. Write a single prompt, maybe drop in a screenshot, and watch a full app materialize while you keep your fingers crossed. It's a great demo. It's a terrible workflow.

The problem isn't that AI can't generate a lot. It can. The problem is that a massive all-in-one output gives you no seams to work with. If something is wrong, which is less likely with frontier models but never impossible, you're either redoing the whole thing or accepting the mess. There's no middle ground.

One-shotting also doesn't scale with complexity. A simple landing page, sure. A real product with multiple pages, components, navigation, visual consistency? The output starts degrading fast. You end up with something that looks right in a screenshot and breaks in production.

This gets worse in a team. If everyone is one-shotting independently, there's no shared reference point. Components drift. Decisions contradict each other. A spec gives the team a common language. It also gives the AI a common language across multiple sessions. It's the difference between everyone improvising and everyone playing from the same sheet.

I've been through this, and I think I've figured it out.

I tried it for the design of this blog. The one-shot version didn't look as good. The version where I made it ask me questions, produce a spec, and then design? That's what you're looking at.

## The two things that actually work

I've landed on two practices that changed how I use AI for development.

**First: start with a spec.**

Before AI touches a single pixel or writes a single line, I get it to ask me questions. For the redesign of this blog, I gave ChatGPT my old homepage and a simple prompt: *ask me 10–15 questions to help redesign this page, then give me a rough idea of the redesign.*

It asked 15 questions. Not generic ones. It asked what the primary goal of the homepage was. Who the main audience was. What someone should understand in the first 5 seconds. Which identity should be strongest: PM, builder, writer, technologist? Whether the long About section should stay or move. What visual personality I wanted. Which sites I liked the feel of.

This is a design brief. The AI was doing requirements gathering before touching anything. Moving from "build this" to "help me think this through" is where professional use diverges from magic show use.

After my answers, ChatGPT produced a visual wireframe spec.

![Wireframe spec from ChatGPT](/assets/concept.png)

Hero, layout split, sections, project cards, topic navigation. All laid out before a component was built. The spec became the shared reference point.

**Second: build and validate at component level.**

A spec tells you what to build. Small iterations tell you whether you got it right.

I moved this blog twice before ([Next.js](/2022/12/17/moving-to-nextjs-vercel/), [Go](/2024/06/16/powered-by-go-chatgpt-actions/)). Pre-AI, it was to learn new frameworks. Post-AI, it is to learn and use AI. This time the move was to Astro, specifically so I could use Storybook. If you haven't used it: Storybook lets you build and test UI components in isolation, outside the full application. You build a button, a card, a nav item. You review and fix it before it ever touches the rest of the site.

This is the part that makes AI-assisted UI actually reliable. When AI generates a component, you validate it in isolation. If it's wrong, you fix that component. You're not debugging the whole page. You're not starting over. You're iterating on the one piece that needs work.

To be precise about how this played out for this blog: AI did generate full pages. But because I had a spec and we were in conversation, I could be specific. "This section should behave like this. That card needs to work differently." The discussion was focused, not open-ended.

In other projects I've gone further. Building and validating components in isolation before any page-level spec existed, then assembling them. Either way, the principle holds: the smaller the unit you're working on, the more useful the conversation with AI becomes.

One-shotting the entire homepage in a single pass means any mistake is tangled up with everything else. Building component by component means every mistake is contained.

## What the spec actually unlocks

The shipped blog is not 100% to the wireframe spec. It has more in some places, less in others.

The spec had a single quote element. I built a dedicated quotes page and randomized quotes on the homepage. The spec didn't ask for that. It just made me think and gave me an opening. Because the quote was its own component, expanding it was straightforward. I reviewed it in Storybook, it worked, and I used it in two places.

That's what the component approach enables. You can add and expand without fear, because each piece is legible and testable on its own.

There's also a cost argument here that I haven't seen people talk about enough. Once a spec exists, you don't need frontier models for execution. The expensive reasoning happens at spec-time. After that, N-1 models, typically half the price, are sufficient to generate and iterate on individual components. The spec constrains the problem enough that you don't need the most powerful model to solve it.

Use the frontier model for speccing, planning, and thinking. That's the work that requires judgment, context synthesis, and asking the right questions. Once that's done, the generation work is constrained enough that a cheaper model handles it well. Frontier model for thinking. Cheaper model for building. That's a real workflow optimization.

## What I'm doing now

This isn't just about the blog.

I'm applying the same pattern anywhere I'm building with AI. Define the problem and the constraints before touching generation. Use questions to gather context. Get a plan, a spec, a brief. Something that creates shared understanding. Then execute in small, validatable pieces.

Even for writing blog posts: I brainstorm, structure, and debate with a frontier model before I let it write a draft I'll review. Same shape. Spec, then small iterations.

The instinct to one-shot is real. It feels efficient. But it's efficiency on the wrong axis. Fast to generate, slow to fix.

The approach that actually works is slower at the start and faster at everything after. It also fits with the broader shift I [wrote about earlier this year](/2026/02/22/something-big-is-happening-notes-from-my-world), where building gets cheap and judgment becomes the real work.

## The human layer

I want to be clear about what AI did and didn't do here.

AI asked the questions, produced the spec, generated the design, and wrote the components. But I decided what the spec should prioritize. I approved or rejected each component iteration.

The spec-driven workflow doesn't remove judgment. It creates better conditions for judgment. When the brief is clear and the pieces are small, I'm not drowning in output. I'm reviewing, deciding, and directing.

That's a better use of my time than debugging a one-shot mess.

---

The blog you're reading is the artifact. The design is AI-generated. The code is AI-written.

None of that would have worked without a spec and a component-level workflow.

One-shotting is a parlor trick. The spec is the product.
