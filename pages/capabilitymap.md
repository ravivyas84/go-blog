---
title: CapabilityMap
slug: capabilitymap
description: A browser-based capability mapping tool for visualizing what a business or product does — no install, no backend, just open and start mapping.
---

CapabilityMap is a browser-based tool for visualizing what a business or product does. Organize capabilities into columns, add feature cards with tags and dependencies, and lay them out in swim lanes — all stored locally in your browser.

No install. No backend. No account. Open the app and start mapping.

---

## What is a Capability Map?

A capability map is a visual representation of the abilities an organization or product needs to deliver value. It breaks down high-level business functions into individual features, tracks dependencies between them, and categorizes them with tags.

It's a planning and communication tool — useful for product teams, business analysts, and anyone who needs to make a system's structure visible.

---

## How It Works

Capabilities are columns. Each column holds feature cards organized into horizontal swim lanes. Cards can carry tags, a description, an optional link, and dependencies on other cards.

Everything is stored in your browser's `localStorage` — no data leaves your machine unless you export it. Exporting to YAML gives you a portable backup you can re-import anytime.

---

## Features

### Capabilities as Columns

Add, edit, rename, and delete capability columns to represent the top-level functions of your business or product.

### Feature Cards

Each card has a heading, description, optional link, tags, and a list of dependencies. Cards live inside a specific capability column and swim lane.

### Swim Lanes

Horizontal lanes run across all capability columns, giving you a second grouping dimension. Sticky lane headers keep your orientation as you scroll.

### Dependency Tracking

Link cards to the other cards they depend on. Click the **deps** badge on any card to highlight related cards — green for the card itself, red for its dependencies.

### Tag-Based Filtering

Filter the map by tags or by capability using the filter bar. Select multiple chips to narrow the view to exactly what you need.

### Column Width Settings

Choose small, medium, or large column widths from the sidebar to match the density of your map.

### YAML Import / Export

Export your entire map as a YAML file and import it back later. Useful for sharing, version-controlling, or backing up your work.

### Sample Data

Load a pre-built banking capability map demo from the sidebar to see how a real map is structured before building your own.

### Auto-Save

All changes are automatically persisted to `localStorage` as you work — no save button needed.

---

## Getting Started

1. Open the app — no build step or server required.
2. Click **Add Capability** to create your first column.
3. Click **Add Card** inside a lane cell to add feature cards.
4. Use **Load Sample Data** in the sidebar to explore a pre-built example.
5. Export to YAML when you want a portable backup.

---

## Built With

All dependencies load via CDN — nothing to install:

- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [js-yaml](https://github.com/nodeca/js-yaml) — YAML parsing for import/export

<div class="dn-cta-bar">
  <span class="dn-cta-label">CapabilityMap &mdash; browser-based, no install</span>
  <a class="dn-cta-button" href="https://capabilitymap.vercel.app" target="_blank" rel="noopener noreferrer">Open CapabilityMap &rarr;</a>
</div>
