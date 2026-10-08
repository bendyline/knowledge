---
title: "getShort Method (int) (SQLServerResultSet)"
description: "getShort Method (int) (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.getShort (int)"
apitype: "Assembly"
---
# getShort Method (int) (SQLServerResultSet)


  Retrieves the value of the designated column index in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a **short** in the Java programming language.  
  
## Syntax  
  
```  
  
public short getShort(int columnIndex)  
```  
  
#### Parameters  
 *columnIndex*  
  
 An **int** that indicates the column index.  
  
## Return Value  
 A **short** value.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getShort method is specified by the getShort method in the java.sql.ResultSet interface.  
  
 This method is only supported on  SQL Server 
 data types that can safely return an integer value such as smallint, tinyint, and bit. Using this method on any other data types will cause an exception to be thrown.  
  
## Related content

- [getShort Method (SQLServerResultSet)](getshort-method-sqlserverresultset.md)
- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
