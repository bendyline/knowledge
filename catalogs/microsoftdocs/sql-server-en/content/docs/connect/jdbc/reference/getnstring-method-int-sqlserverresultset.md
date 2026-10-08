---
title: "getNString Method (int) (SQLServerResultSet)"
description: "getNString Method (int) (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# getNString Method (int) (SQLServerResultSet)


  Retrieves the value of the designated column in the current row of the [SQLServerResultSet](sqlserverresultset-class.md) object as a String object.  
  
## Syntax  
  
```  
  
public java.lang.String getNString(int columnIndex)  
```  
  
#### Parameters  
 *columnIndex*  
  
 An **int** that indicates the column index.  
  
## Return Value  
 A String object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getNString method is specified by the getNString method in the java.sql.SQLServerResultSet interface.  
  
 This method can be used to retrieve the value of an **nvarchar**, **nchar**, **nvarchar(max)**, **ntext**, or **xml** column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object. If you try to use this method to retrieve values of other data types, an exception will be thrown.  
  
## Related content

- [getNString Method (SQLServerResultSet)](getnstring-method-sqlserverresultset.md)
- [SQLServerResultSet Members](sqlserverresultset-members.md)
