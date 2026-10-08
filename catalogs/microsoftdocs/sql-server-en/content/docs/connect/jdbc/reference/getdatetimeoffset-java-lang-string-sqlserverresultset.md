---
title: "getDateTimeOffset(java.lang.string) (SQLServerResultSet)"
description: "getDateTimeOffset(java.lang.string) (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# getDateTimeOffset(java.lang.string) (SQLServerResultSet)


  This method was added in  Microsoft 
  SQL Server 
 JDBC Driver 3.0.  
  
 Retrieves the value of the designated column as a [DateTimeOffset Class](datetimeoffset-class.md) object in the Java programming language given the parameter index.  
  
## Syntax  
  
```  
  
public microsoft.sql.DateTimeOffset getDateTimeOffset(String columnName)  
```  
  
#### Parameters  
 *columnName*  
  
 The name of the column.  
  
## Return Value  
 A [DateTimeOffset Class](datetimeoffset-class.md) object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 You can update a [DateTimeOffset Class](datetimeoffset-class.md) value with [SQLServerResultSet.updateDateTimeOffset](updatedatetimeoffset-sqlserverresultset.md).  
  
## Related content

- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
