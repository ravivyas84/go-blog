---
title: Azure Table Storage vs GCP DataStore
date: "2019-03-19"
 
tags: 
  - journey-with-azure 
  - software-development
layout: layouts/posts.njk
slug: azure-table-storage-vs-gcp-datastore

---

_This is a part of my “_[_Journey with Azure_](/tag/journey-with-azure/)_" series_

So as a part of playing around with Azure, I decided to clone AirMeet's codebase with Azure as a backend service. Airmeet is currently running on AppEngine with Datastore as a database. The equivalents on the Azure side are AppService with TableStore as the database. Based on that experience here are some of the differences between the two NoSQL key-value stores.

## Structuring your Storage

Table Storage needs a partition key and a row key, whereas data store only needs a key. Now you may look at it as extra work, but this also allows you to plan around your data structure and also for possible performance benefits in the future.

## Web interface & Azure Storage explorer

GCP has a slightly better interface. For example, I can do a multi-select in the interface to delete multiple entities, I was not able to get the same working with Table Storage.

Azure, on the other hand, has a big win in the Storage Explorer App, which allows you to view your tables, queues and blobs via an App.

## Update entity

This is my favourite feature of TableStorage, While an update is possible in Datastore, it is more of reading the entity, modifying it on the client side and write the entire object.

## Reading partial entities

Table Storage has an SQL like query model, thus you can actually read only a part of an entity, super useful when you have large entities and want to save on cost on bandwidth.

## Cost comparison

Doing a cost comparison would be unfair, more important it would be inaccurate because of the way pricing is structured on both the products. Azure has more billing options based on how you want your data to be replicated. GCP does not provide that flexibility (or limits complexity based on how you are looking at it). Azure also treats your reads, writes, and delete equally when it comes to cost, whereas GCP has different pricing for each operation, where reads cost 1/3rd of writes. Overall operation costs are lower on Azure at $0.00036 per 10,000 transactions for a table stored in East US with Locally Redundant Replication. GCP $0.036 per 100,000 entities reads. Writes are 3X more expensive as mentioned before. In most cases, Azure will be cheaper unless you can fit your workload into GCPs free monthly tiers.

## Nitpicking

One issue I had initially when moving from DataStore to Table Storage is the fact that I had to worry about "creating tables"  
DataStore simply creates the entity group if does not exits. The same logic did not work on the TableStore side, in fact my _insertEntity_ method failed until I wrapped it around the _createTableIfNotExists_ method. If there is something in the documentation, I certainly missed it.#
