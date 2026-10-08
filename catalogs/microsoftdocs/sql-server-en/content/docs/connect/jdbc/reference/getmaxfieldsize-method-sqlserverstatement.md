---
title: "getMaxFieldSize Method (SQLServerStatement)"
description: "getMaxFieldSize Method (SQLServerStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerStatement.getMaxFieldSize"
apitype: "Assembly"
---
# getMaxFieldSize Method (SQLServerStatement)


  Retrieves the maximum number of bytes that can be returned for character and binary column values in a [SQLServerResultSet](sqlserverresultset-class.md) object that is produced by this [SQLServerStatement](sqlserverstatement-class.md) object.  
  
## Syntax  
  
```  
  
public final int getMaxFieldSize()  
```  
  
## Return Value  
 An **int** that indicates the maximum number of bytes that a column can contain, or 0 if there is no limit.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getMaxFieldSize method is specified by the getMaxFieldSize method in the java.sql.Statement interface.  
  
## Related content

- [SQLServerStatement Methods](sqlserverstatement-methods.md)
- [SQLServerStatement Class](sqlserverstatement-class.md)
