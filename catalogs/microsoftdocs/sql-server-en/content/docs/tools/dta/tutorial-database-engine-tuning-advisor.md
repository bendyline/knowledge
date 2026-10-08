---
title: "Tutorial: Database Engine Tuning Advisor"
description: Database Engine Tuning Advisor examines how queries are processed and recommends how to improve query processing performance by modifying database structures.
author: rwestMSFT
ms.author: randolphwest
ms.date: 05/11/2021
ms.service: sql
ms.subservice: tools-other
ms.topic: reference
ms.collection:
  - data-tools
helpviewer_keywords:
  - "Database Engine Tuning Advisor [SQL Server], tutorials"
  - "tutorials [Database Engine Tuning Advisor]"
---

# Tutorial: Database Engine Tuning Advisor

 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Welcome to the Database Engine Tuning Advisor tutorial. Database Engine Tuning Advisor examines how queries are processed in the databases you specify, and then recommends how you can improve query processing performance by modifying database structures such as indexes, indexed views, and partitioning.  
  
Database Engine Tuning Advisor provides two user interfaces: a graphical user interface (GUI) and the **dta** command prompt utility. The GUI makes it easy to quickly view the results of tuning sessions, and the **dta** utility makes it easy to incorporate Database Engine Tuning Advisor functionality into scripts for automated tuning. In addition, Database Engine Tuning Advisor can take XML input, which offers more control over the tuning process.  
  
> **Note:**
> The Database Engine Tuning Advisor is not supported for  Azure SQL Database 
 or Azure SQL Managed Instance. Instead, consider the strategies recommended in [Monitoring and performance tuning in Azure SQL Database and Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/database/monitor-tune-overview). For  Azure SQL Database 
, see also the [Database Advisor performance recommendations for Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/database-advisor-implement-performance-recommendations).
  
## What you will learn  
This tutorial will teach you how to navigate the Database Engine Tuning Advisor GUI, and how to perform some basic tasks with both the GUI and the **dta** utility. It contains the following lessons:  
  
[Lesson 1: Basic Navigation in Database Engine Tuning Advisor](lesson-1-basic-navigation-in-database-engine-tuning-advisor.md)  
In this lesson, you will familiarize yourself with the new Database Engine Tuning Advisor GUI and learn how to set display options and layout.  
  
[Lesson 2: Using Database Engine Tuning Advisor](lesson-2-using-database-engine-tuning-advisor.md)  
In this lesson, you will learn how to perform basic tuning tasks with the Database Engine Tuning Advisor GUI.  
  
[Lesson 3: Using the dta Command Prompt Utility](lesson-3-using-the-dta-command-prompt-utility.md)  
In this lesson, you learn how to start the **dta** command prompt utility and how to run some simple tuning commands.  
  
## Requirements  
This tutorial is intended for database administrators who are not familiar with the Database Engine Tuning Advisor GUI or the **dta** command prompt utility, but who are experienced with database concepts and structures, such as indexes and indexed views.  
  
You must install  SQL Server 
 with the  `AdventureWorks2025`  sample database. To enhance security, the sample databases are not installed by default. To install the sample databases, see [Installing SQL Server Samples and Sample Databases](https://github.com/microsoft/sql-server-samples/tree/master/samples).  
  
## After you finish this tutorial  
After you finish the lessons in this tutorial, refer to the following articles for more information about Database Engine Tuning Advisor:  
  
-   [Database Engine Tuning Advisor](../../relational-databases/performance/database-engine-tuning-advisor.md) for descriptions of how to perform tasks with this tool.  
  
-   [dta utility](dta-utility.md) for reference material on the command prompt utility and the optional XML file you can use to control the operation of the utility.  
  
## Next lesson  
[Lesson 1: Basic Navigation in Database Engine Tuning Advisor](lesson-1-basic-navigation-in-database-engine-tuning-advisor.md)
