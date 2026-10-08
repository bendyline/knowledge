---
title: "supportsCatalogsInDataManipulation Method"
description: "supportsCatalogsInDataManipulation Method (SQLServerDatabaseMetaData)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDatabaseMetaData.supportsCatalogsInDataManipulation"
apitype: "Assembly"
---
# supportsCatalogsInDataManipulation Method (SQLServerDatabaseMetaData)


  Retrieves whether a catalog name can be used in a data manipulation statement.  
  
## Syntax  
  
```  
  
public boolean supportsCatalogsInDataManipulation()  
```  
  
## Return Value  
 **true** if supported. Otherwise, **false**.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This supportsCatalogInDataManipulation method is specified by the supportsCatalogInDataManipulation method in the java.sql.DatabaseMetaData interface.  
  
## Related content

- [SQLServerDatabaseMetaData Methods](sqlserverdatabasemetadata-methods.md)
- [SQLServerDatabaseMetaData Members](sqlserverdatabasemetadata-members.md)
- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
