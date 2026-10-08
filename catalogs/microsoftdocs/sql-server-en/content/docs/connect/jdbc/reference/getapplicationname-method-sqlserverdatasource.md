---
title: "getApplicationName Method (SQLServerDataSource)"
description: "getApplicationName Method (SQLServerDataSource)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDataSource.getApplicationName"
apitype: "Assembly"
---
# getApplicationName Method (SQLServerDataSource)


  Returns the application name.  
  
## Syntax  
  
```  
  
public java.lang.String getApplicationName()  
```  
  
## Return Value  
 A **String** that contains the application name, or "  Microsoft JDBC Driver for SQL Server 
" if no value is set.  
  
## Remarks  
 The application name is used to identify the specific application in various  SQL Server 
 profiling and logging tools. If the application name is not set, the getApplicationName method returns the non-localized string "  Microsoft JDBC Driver for SQL Server 
".  
  
## Related content

- [SQLServerDataSource Members](sqlserverdatasource-members.md)
- [SQLServerDataSource Class](sqlserverdatasource-class.md)
