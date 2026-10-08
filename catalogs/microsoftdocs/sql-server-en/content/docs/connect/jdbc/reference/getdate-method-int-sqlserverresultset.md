---
title: "getDate Method (int) (SQLServerResultSet)"
description: "getDate Method (int) (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.getDate (int)"
apitype: "Assembly"
---
# getDate Method (int) (SQLServerResultSet)


  Retrieves the value of the designated column index in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a java.sql.Date object in the Java programming language.  
  
## Syntax  
  
```  
  
public java.sql.Date getDate(int columnIndex)  
```  
  
#### Parameters  
 *columnIndex*  
  
 An **int** that indicates the column index.  
  
## Return Value  
 A Date object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getDate method is specified by the getDate method in the java.sql.ResultSet interface.  
  
 This method returns a valid date part of a  SQL Server 
 datetime or smalldatetime data type, with the time part set to the Java time baseline of 00:00 (midnight).  
  
## Related content

- [getDate Method (SQLServerResultSet)](getdate-method-sqlserverresultset.md)
- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
