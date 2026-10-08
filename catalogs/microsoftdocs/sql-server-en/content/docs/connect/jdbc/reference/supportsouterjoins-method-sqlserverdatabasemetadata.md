---
title: "supportsOuterJoins Method (SQLServerDatabaseMetaData)"
description: "supportsOuterJoins Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData.supportsOuterJoins"
apitype: "Assembly"
---
# supportsOuterJoins Method (SQLServerDatabaseMetaData)


  Retrieves whether this database supports some form of outer join.  
  
## Syntax  
  
```  
  
public boolean supportsOuterJoins()  
```  
  
## Return Value  
 **true** if supported. Otherwise, **false**.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This supportsOuterJoins method is specified by the supportsOuterJoins method in the java.sql.DatabaseMetaData interface.  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
