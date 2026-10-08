---
title: Get started with Entity Framework 6 - EF6
description: Get started with Entity Framework 6
author: SamMonoRT
ms.date: 10/23/2016
uid: ef6/get-started
---
# Get started with Entity Framework 6

This guide contains a collection of links to selected documentation articles, walkthroughs and videos that can help you get started quickly.

## Fundamentals

* [Get Entity Framework](fundamentals/install.md)

  Here you will learn how to add Entity Framework to your applications and, if you want to use the EF Designer, make sure you get it installed in Visual Studio.

* [Creating a Model: Code First, the EF Designer, and the EF Workflows](modeling/index.md)

  Do you prefer to specify your EF model writing code or drawing boxes and lines?
Are you going to use EF to map your objects to an existing database or would you like EF to create a database tailored for your objects?
Here you learn about two different approaches to use EF6: EF Designer and Code First.
Make sure you follow the discussion and watch the video about the difference.

* [Working with DbContext](fundamentals/working-with-dbcontext.md)

  DbContext is the first and most important EF type that you need to learn how to use. It serves as the launchpad for database queries and keeps track of changes you make to objects so that they can be persisted back to the database.

* [Ask a Question](resources/get-help.md)

  Find out how to get help from the experts and contribute your own answers to the community.

* [Contribute](https://github.com/aspnet/EntityFramework6/)

  Entity Framework 6 uses an open development model. Find out how you can help make EF even better by visiting our GitHub repository.

## Code First resources

  - [Code First to an Existing Database Workflow](modeling/code-first/workflows/existing-database.md)
  - [Code First to a New Database Workflow](modeling/code-first/workflows/new-database.md)
  - [Mapping Enums Using Code First](modeling/code-first/data-types/enums.md)
  - [Mapping Spatial Types Using Code First](modeling/code-first/data-types/spatial.md)
  - [Writing Custom Code First Conventions](modeling/code-first/conventions/custom.md)
  - [Using Code First Fluent Configuration with Visual Basic](modeling/code-first/fluent/vb.md)
  - [Code First Migrations](modeling/code-first/migrations/index.md)
  - [Code First Migrations in Team Environments](modeling/code-first/migrations/teams.md)
  - [Automatic Code First Migrations](modeling/code-first/migrations/automatic.md) (This is no longer recommended)

## EF Designer resources
  - [Database First Workflow](modeling/designer/workflows/database-first.md)
  - [Model First Workflow](modeling/designer/workflows/model-first.md)
  - [Mapping Enums](modeling/designer/data-types/enums.md)
  - [Mapping Spatial Types](modeling/designer/data-types/spatial.md)
  - [Table-Per Hierarchy Inheritance Mapping](modeling/designer/inheritance/tph.md)
  - [Table-Per Type Inheritance Mapping](modeling/designer/inheritance/tpt.md)
  - [Stored Procedure Mapping for Updates](modeling/designer/stored-procedures/cud.md)
  - [Stored Procedure Mapping for Query](modeling/designer/stored-procedures/query.md)
  - [Entity Splitting](modeling/designer/entity-splitting.md)
  - [Table Splitting](modeling/designer/table-splitting.md)
  - [Defining Query](modeling/designer/advanced/defining-query.md) (Advanced)
  - [Table-Valued Functions](modeling/designer/advanced/tvfs.md) (Advanced)

## Other resources
  - [Async Query and Save](fundamentals/async.md)
  - [Databinding with WinForms](fundamentals/databinding/winforms.md)
  - [Databinding with WPF](fundamentals/databinding/wpf.md)
  - [Disconnected scenarios with Self-Tracking Entities](fundamentals/disconnected-entities/self-tracking-entities/walkthrough.md) (This is no longer recommended)
