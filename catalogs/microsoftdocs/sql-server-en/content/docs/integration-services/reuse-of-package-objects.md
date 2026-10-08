---
title: "Reuse of Package Objects"
description: "Reuse of Package Objects"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
helpviewer_keywords:
  - "GUID regenerating [Integration Services]"
  - "reusing packages"
  - "templates [Integration Services]"
  - "copying packages"
  - "regenerating package GUID"
---
# Reuse of Package Objects


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Frequently packages functionality that you want to reuse. For example, if you created a set of tasks, you might want to reuse the items together as a group, or you might want to reuse a single item such as a connection manager that you created in a different  Integration Services 
 project.  
  
## Copy and Paste  
  SQL Server Data Tools (SSDT) 
 and  SSIS 
 Designer support copying and pasting package objects, which can include control flow items, data flow items, and connection managers. You can copy and paste between projects and between packages. If the solution contains multiple projects you can copy between projects, and the projects can be of different types.  
  
 If a solution contains multiple packages, you can copy and paste between them. The packages can be in the same or different  Integration Services 
 projects. However, package objects may have dependencies on other objects, without which they are not valid. For example, an Execute SQL task uses a connection manager, which you must copy as well to make the task work. Also, some package objects require that the package already contain a certain object, and without this object you cannot successfully paste the copied objects into a package. For example, you cannot paste a data flow into a package that does not have at least one Data Flow task.  
  
 You may find that you copy the same packages repeatedly. To avoid the copy process, you can designate these packages as templates and use them when you create new packages.  
  
 When you copy a package object,  Integration Services 
 automatically assigns a new GUID to the **ID** property of the new object and updates the **Name** property.  
  
 You cannot copy variables. If an object such as a task uses variables, then you must re-create the variables in the destination package. In contrast, if you copy the entire package, then the variables in the package are also copied.  
  
## Related Tasks  
  
-   [Copy Package Objects](copy-package-objects.md)  
  
-   [Copy Project Items](integration-services-ssis-projects-and-solutions.md)  
  
-   [Save a Package as a Package Template](save-packages.md)
