---
title: "SupportsDataDefinitionAndDataManipulationTransactions Method"
description: "supportsDataDefinitionAndDataManipulationTransactions Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData.supportsDataDefinitionAndDataManipulationTransactions"
apitype: "Assembly"
---
# supportsDataDefinitionAndDataManipulationTransactions Method (SQLServerDatabaseMetaData)


  Retrieves whether this database supports both data definition and data manipulation statements within a transaction.  
  
## Syntax  
  
```  
  
public boolean supportsDataDefinitionAndDataManipulationTransactions()  
```  
  
## Return Value  
 **true** if supported. Otherwise, **false**.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This supportsDataDefinitionAndDataManipulationTransactions method is specified by the supportsDataDefinitionAndDataManipulationTransactions method in the java.sql.DatabaseMetaData interface.  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
