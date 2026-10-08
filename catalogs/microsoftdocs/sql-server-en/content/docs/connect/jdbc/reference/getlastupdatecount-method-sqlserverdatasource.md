---
title: "getLastUpdateCount Method (SQLServerDataSource)"
description: "getLastUpdateCount Method (SQLServerDataSource)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDataSource.getLastUpdateCount"
apitype: "Assembly"
---
# getLastUpdateCount Method (SQLServerDataSource)


  Returns a **Boolean** value that indicates if the lastUpdateCount property is enabled.  
  
## Syntax  
  
```  
  
public boolean getLastUpdateCount()  
```  
  
## Return Value  
 **true** if lastUpdateCount is enabled. Otherwise, **false**.  
  
## Remarks  
 If the lastUpdateCount property is set to **true**, the  Microsoft JDBC Driver for SQL Server 
 will return only the last update count from a SQL statement passed to the server. If the lastUpdateCount property is set to **false**, the driver will return all update counts including those returned by any triggers that may have fired. If the lastUpdateCount property is not set, the getLastUpdateCount method returns the default value of **true**.  
  
## Related content

- [SQLServerDataSource Members](sqlserverdatasource-members.md)
- [SQLServerDataSource Class](sqlserverdatasource-class.md)
