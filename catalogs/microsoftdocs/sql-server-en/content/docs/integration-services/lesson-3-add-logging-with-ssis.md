---
title: "Lesson 3: Add Logging with SSIS"
description: "Lesson 3: Add Logging with SSIS"
ms.date: "01/04/2019"
ms.service: sql
ms.subservice: integration-services
ms.topic: tutorial
---
# Lesson 3: Add logging with SSIS


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory



 Microsoft 
  Integration Services 
 includes logging features that let you troubleshoot and monitor package execution by providing a trace of task and container events. The logging features are flexible. You can enable logging at the package level, or on individual tasks or containers within the package. You select which events you want to log, and create multiple logs against a single package.  
  
Log providers create the logs. Each log provider can write logging information to different formats and destination types.  Integration Services 
 provides the following log providers:  
  
-   Text file  
  
-    SQL Server Profiler 
  
  
-   Windows Event log  
  
-    SQL Server 
  
  
-   XML file  
  
In this lesson, you create a copy of the package that you created in [Lesson 2: Add Looping with SSIS](lesson-2-adding-looping-with-ssis.md). Working with this new package, you then add and configure logging to monitor specific events during package execution. If you haven't completed either of the previous lessons, you can also copy the completed Lesson 2 package included with the tutorial.  

> **Note:**
> If you haven't already, see the [Lesson 1 prerequisites](lesson-1-create-a-project-and-basic-package-with-ssis.md#prerequisites).

## Lesson tasks  
This lesson contains the following tasks:  
  
-   [Step 1: Copy the Lesson 2 package](lesson-3-1-copying-the-lesson-2-package.md)  
  
-   [Step 2: Add and configure logging](lesson-3-2-adding-and-configuring-logging.md)  
  
-   [Step 3: Test the Lesson 3 package](lesson-3-3-testing-the-lesson-3-tutorial-package.md)  
  
## Start the lesson  
[Step 1: Copy the Lesson 2 package](lesson-3-1-copying-the-lesson-2-package.md)
