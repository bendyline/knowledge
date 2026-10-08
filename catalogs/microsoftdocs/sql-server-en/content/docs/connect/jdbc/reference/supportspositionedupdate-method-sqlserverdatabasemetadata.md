---
title: "supportsPositionedUpdate Method (SQLServerDatabaseMetaData)"
description: "supportsPositionedUpdate Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData.supportsPositionedUpdate"
apitype: "Assembly"
---
# supportsPositionedUpdate Method (SQLServerDatabaseMetaData)


  Retrieves whether this database supports positioned UPDATE statements.  
  
## Syntax  
  
```  
  
public boolean supportsPositionedUpdate()  
```  
  
## Return Value  
 **true** if supported. Otherwise, **false**.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This supportsPositionedUpdate method is specified by the supportsPositionedUpdate method in the java.sql.DatabaseMetaData interface.  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
