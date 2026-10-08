---
title: "supportsCorrelatedSubqueries Method (SQLServerDatabaseMetaData)"
description: "supportsCorrelatedSubqueries Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData.supportsCorrelatedSubqueries"
apitype: "Assembly"
---
# supportsCorrelatedSubqueries Method (SQLServerDatabaseMetaData)


  Retrieves whether this database supports correlated subqueries.  
  
## Syntax  
  
```  
  
public boolean supportsCorrelatedSubqueries()  
```  
  
## Return Value  
 **true** if supported. Otherwise, **false**.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This supportsCorrelatedSubqueries method is specified by the supportsCorrelatedSubqueries method in the java.sql.DatabaseMetaData interface.
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
