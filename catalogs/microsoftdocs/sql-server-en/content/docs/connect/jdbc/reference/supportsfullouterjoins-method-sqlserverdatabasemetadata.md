---
title: "supportsFullOuterJoins Method (SQLServerDatabaseMetaData)"
description: "supportsFullOuterJoins Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData.supportsFullOuterJoins"
apitype: "Assembly"
---
# supportsFullOuterJoins Method (SQLServerDatabaseMetaData)


  Retrieves whether this database supports full nested outer joins.  
  
## Syntax  
  
```  
  
public boolean supportsFullOuterJoins()  
```  
  
## Return Value  
 **true** if supported. Otherwise, **false**.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This supportsFullOuterJoins method is specified by the supportsFullOuterJoins method in the java.sql.DatabaseMetaData interface.  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
