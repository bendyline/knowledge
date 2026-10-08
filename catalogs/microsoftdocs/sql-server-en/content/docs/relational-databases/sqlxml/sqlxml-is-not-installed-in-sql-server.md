---
title: "SQLXML Is Not Installed in SQL Server"
description: SQLXML Is Not Installed in SQL Server
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.topic: "reference"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# SQLXML Is Not Installed in SQL Server

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 




  Before  SQL Server 2008 (10.0.x) 
, SQLXML 4.0 was released with  SQL Server 
 and was part of the default installation of all  SQL Server 
 versions except for  SQL Server Express 
. Starting with  SQL Server 2008 (10.0.x) 
, the latest version of SQLXML (SQLXML 4.0 SP1) is no longer included in  SQL Server 
. To install SQLXML 4.0 SP1, download it from [Install Location for SQLXML 4.0 SP1](https://www.microsoft.com/download/details.aspx?id=30403).  
  
 If an application runs on  SQL Server 
 and requires SQLXML 4.0, you have to download and install SQLXML 4.0 SP1.  
  
## SQLXML 4.0 SP1 Behavior with New Data Types Using SQLOLEDB and SQL Server Native Client OLE DB Provider  
  SQL Server 2008 (10.0.x) 
 introduced the following data types, which developers using SQLXML might want to use:  
  
-   **Date**  
  
-   **Time**  
  
-   **DateTime2**  
  
-   **DateTimeOffset**  
  
 When using SQLXML 4.0 SP1 with either SQLOLEDB or  SQL Server 
 Native Client OLE DB from  SQL Server 2005 (9.x) 
, these types appear as strings to a developer. SQLXML 4.0 SP1 will enable these four new data types as built-in scalar types when used with  SQL Server 
 Native Client OLE DB Provider 11.0 or later. Until you download SQLXML 4.0 SP1, mapping these types to non-string types might cause truncation of some data. For example, mapping **DateTime2** to **xsd:date** will cause data to be truncated to the  SQL Server 2005 (9.x) 
 **DateTime** precision of 3.33 milliseconds.  
  
## Related content

- [SQLXML 4.0 Programming Concepts](sqlxml-4-0-programming-concepts.md)
