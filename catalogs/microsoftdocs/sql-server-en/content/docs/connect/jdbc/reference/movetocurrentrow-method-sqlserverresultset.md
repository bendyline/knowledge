---
title: "moveToCurrentRow Method (SQLServerResultSet)"
description: "moveToCurrentRow Method (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.moveToCurrentRow"
apitype: "Assembly"
---
# moveToCurrentRow Method (SQLServerResultSet)


  Moves the cursor to the remembered cursor position, which is usually the current row.  
  
## Syntax  
  
```  
  
public void moveToCurrentRow()  
```  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This moveToCurrentRow method is specified by the moveToCurrentRow method in the java.sql.ResultSet interface.  
  
 This method has no effect if the cursor is not on the insert row.  
  
## Related content

- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
