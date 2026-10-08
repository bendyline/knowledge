---
title: "getMaxRows Method (SQLServerStatement)"
description: "getMaxRows Method (SQLServerStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerStatement.getMaxRows"
apitype: "Assembly"
---
# getMaxRows Method (SQLServerStatement)


  Retrieves the maximum number of rows that a [SQLServerResultSet](sqlserverresultset-class.md) object that is produced by this [SQLServerStatement](sqlserverstatement-class.md) object can contain.  
  
## Syntax  
  
```  
  
public final int getMaxRows()  
```  
  
## Return Value  
 An **int** that indicates the maximum number of rows, or 0 if there is no limit.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getMaxRows method is specified by the getMaxRows method in the java.sql.Statement interface.  
  
 This getMaxRows method always returns 0 for dynamic scrollable cursors.  
  
## Related content

- [SQLServerStatement Members](sqlserverstatement-members.md)
- [SQLServerStatement Class](sqlserverstatement-class.md)
