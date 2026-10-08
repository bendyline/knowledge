---
title: "Understanding the Differences between Local and Remote Execution"
description: "Understanding the Differences between Local and Remote Execution"
ms.date: "03/17/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "Integration Services packages, running"
  - "packages [Integration Services], running"
  - "packages [Integration Services], troubleshooting"
---
# Understanding the Differences between Local and Remote Execution


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Package developers and administrators should be aware that there are restrictions related to where an  Integration Services 
 package runs.  
  
-   **A package runs on the same computer as the program that launches it**. Even when a program loads a package that is stored remotely on another server, the package runs on the local computer.  
  
-   **You can only run a package outside the development environment on a computer that has Integration Services installed**. You cannot run packages outside of  SQL Server Data Tools (SSDT) 
 on a client computer that does not have  Integration Services 
 installed, and the terms of your  SQL Server 
 licensing may not permit you to install  Integration Services 
 on additional computers.  SQL Server 
  Integration Services 
 is a server component and is not redistributable to client computers. To run packages from a client computer, you need to launch them in a manner that ensures that the packages run on the server.  
  
 For more information about loading and running a saved package, see:  
  
-   [Loading and Running a Local Package Programmatically](loading-and-running-a-local-package-programmatically.md)  
  
-   [Loading and Running a Remote Package Programmatically](loading-and-running-a-remote-package-programmatically.md)  
  
 For more information about running a package and loading its output into a custom program, see:  
  
-   [Loading the Output of a Local Package](loading-the-output-of-a-local-package.md)  
  
## Related content

- [Loading and Running a Local Package Programmatically](loading-and-running-a-local-package-programmatically.md)
- [Loading and Running a Remote Package Programmatically](loading-and-running-a-remote-package-programmatically.md)
- [Loading the Output of a Local Package](loading-the-output-of-a-local-package.md)
