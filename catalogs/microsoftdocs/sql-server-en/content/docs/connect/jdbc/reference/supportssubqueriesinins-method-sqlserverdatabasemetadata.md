---
title: "supportsSubqueriesInIns Method (SQLServerDatabaseMetaData)"
description: "supportsSubqueriesInIns Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData.supportsSubqueriesInIns"
apitype: "Assembly"
---
# supportsSubqueriesInIns Method (SQLServerDatabaseMetaData)


  Retrieves whether this database supports subqueries in IN statements.  
  
## Syntax  
  
```  
  
public boolean supportsSubqueriesInIns()  
```  
  
## Return Value  
 **true** if supported. Otherwise, **false**.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This supportsSubqueriesInIns method is specified by the supportsSubqueriesInIns method in the java.sql.DatabaseMetaData interface.  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
