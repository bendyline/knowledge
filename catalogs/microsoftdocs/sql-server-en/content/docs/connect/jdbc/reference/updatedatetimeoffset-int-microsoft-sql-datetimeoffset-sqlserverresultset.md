---
title: "updateDateTimeOffset(int) (SQLServerResultSet)"
description: "updateDateTimeOffset(int, microsoft.sql.DateTimeOffset) (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# updateDateTimeOffset(int, microsoft.sql.DateTimeOffset) (SQLServerResultSet)


  This method was added in  Microsoft 
  SQL Server 
 JDBC Driver 3.0.  
  
 Updates the value of the column specified to the [DateTimeOffset Class](datetimeoffset-class.md) value, given a zero-based column ordinal.  
  
## Syntax  
  
```  
  
public void updateDateTimeOffset(int index, microsoft.sql.DateTimeOffset x)  
```  
  
#### Parameters  
 *index*  
  
 The zero-based ordinal of a column.  
  
 *x*  
  
 A [DateTimeOffset Class](datetimeoffset-class.md) object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 You can retrieve a [DateTimeOffset Class](datetimeoffset-class.md) value with [SQLServerResultSet.getDateTimeOffset](getdatetimeoffset-sqlserverresultset.md).  
  
## Related content

- [updateDateTimeOffset (SQLServerResultSet)](updatedatetimeoffset-sqlserverresultset.md)
- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
