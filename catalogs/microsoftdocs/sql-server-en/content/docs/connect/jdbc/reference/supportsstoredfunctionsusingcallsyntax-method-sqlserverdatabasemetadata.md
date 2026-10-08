---
title: "supportsStoredFunctionsUsingCallSyntax Method"
description: "supportsStoredFunctionsUsingCallSyntax Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# supportsStoredFunctionsUsingCallSyntax Method (SQLServerDatabaseMetaData)


  Indicates whether the current database supports invoking user- or vendor-defined functions by using the stored procedure escape syntax.  
  
## Syntax  
  
```  
  
public boolean supportsStoredFunctionsUsingCallSyntax()  
```  
  
## Return Value  
 **true** if supported. Otherwise, **false**.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This supportsStoredFunctionsUsingCallSyntax method is specified by the supportsStoredFunctionsUsingCallSyntax method in the java.sql.DatabaseMetaData interface.  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
