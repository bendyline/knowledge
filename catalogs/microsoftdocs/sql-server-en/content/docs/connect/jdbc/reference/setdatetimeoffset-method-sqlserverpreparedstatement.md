---
title: "setDateTimeOffset Method (SQLServerPreparedStatement)"
description: "setDateTimeOffset Method (SQLServerPreparedStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# setDateTimeOffset Method (SQLServerPreparedStatement)


  This method was added in  Microsoft 
  SQL Server 
 JDBC Driver 3.0.  
  
 Sets the value of the column specified to the [DateTimeOffset Class](datetimeoffset-class.md) value.  
  
## Syntax  
  
```  
  
public final void setDateTimeOffset(int n, microsoft.sql.DateTimeOffset x)  
```  
  
#### Parameters  
 *n*  
  
 The zero-based ordinal of a column.  
  
 *x*  
  
 The [DateTimeOffset Class](datetimeoffset-class.md) object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Related content

- [SQLServerPreparedStatement Members](sqlserverpreparedstatement-members.md)
- [SQLServerPreparedStatement Class](sqlserverpreparedstatement-class.md)
