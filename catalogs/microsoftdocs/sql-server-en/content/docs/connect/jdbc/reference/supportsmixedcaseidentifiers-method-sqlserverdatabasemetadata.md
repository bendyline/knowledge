---
title: "supportsMixedCaseIdentifiers Method"
description: "supportsMixedCaseIdentifiers Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData.supportsMixedCaseIdentifiers"
apitype: "Assembly"
---
# supportsMixedCaseIdentifiers Method (SQLServerDatabaseMetaData)


  Retrieves whether this database treats mixed-case SQL identifiers that are not enclosed in quotation marks as case-sensitive and stores them in mixed case.  
  
## Syntax  
  
```  
  
public boolean supportsMixedCaseIdentifiers()  
```  
  
## Return Value  
 **true** if the identifiers are stored in mixed case. Otherwise, **false**.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This supportsMixedCaseIdentifiers method is specified by the supportsMixedCaseIdentifiers method in the java.sql.DatabaseMetaData interface.  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
