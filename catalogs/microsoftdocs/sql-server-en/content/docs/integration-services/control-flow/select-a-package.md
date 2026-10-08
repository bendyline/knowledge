---
title: "Select a Package"
description: "Select a Package"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "sql13.dts.designer.selectapackage.f1"
helpviewer_keywords:
  - "Select a Package dialog box"
---
# Select a Package


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Use the **Select a Package** dialog box to specify the package from which the Message Queue task can receive messages.  
  
## Static Options  
 **Location**  
 Specify the location of the package. This property has the options listed in the following table.  
  
| Value | Description |
| --- | --- |
| SQL Server |
| Set the location to an instance of  SQL Server |
| . Selecting this value displays the dynamic options, **Server**, **Use Windows Authentication**, **Use SQL Server Authentication**, **User name**, and **Password**. |
| DTSX file | Set the location to a DTSX file. Selecting this value displays the dynamic option, **File name**. |
  
## Location Dynamic Options  
  
### Location = SQL Server  
 **Package name**  
 Select a package that is stored on the specified server.  
  
 **Server**  
 Provide a server name or select a server from the list.  
  
 **Use Windows Authentication**  
 Click to use Windows Authentication.  
  
 **Use SQL Server Authentication**  
 Click to use  SQL Server 
 Authentication.  
  
 **User name**  
 If using  SQL Server 
 Authentication, provide a user name to use when logging on to the server.  
  
 **Password**  
 If using  SQL Server 
 Authentication, provide a password.  
  
### Location = DTSX file  
 **File name**  
 Provide the path of a package or click the browse button **(...)** and locate the package.  
  
## Related content

- [Message Queue Task](message-queue-task.md)
