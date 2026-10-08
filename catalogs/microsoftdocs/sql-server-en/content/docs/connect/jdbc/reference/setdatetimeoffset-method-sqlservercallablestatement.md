---
title: "setDateTimeOffset Method (SQLServerCallableStatement)"
description: "setDateTimeOffset Method (SQLServerCallableStatement)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# setDateTimeOffset Method (SQLServerCallableStatement)


  This method was added in  Microsoft 
  SQL Server 
 JDBC Driver 3.0.  
  
 Sets the value of the column specified to the [DateTimeOffset Class](datetimeoffset-class.md) value.  
  
## Syntax  
  
```  
  
public void setDateTimeOffset(String sCol, microsoft.sql.DateTimeOffset t)  
```  
  
#### Parameters  
 *sCol*  
  
 The name of a column.  
  
 *t*  
  
 The [DateTimeOffset Class](datetimeoffset-class.md) object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 You can retrieve a [DateTimeOffset Class](datetimeoffset-class.md) value with [SQLServerCallableStatement.getDateTimeOffset](getdatetimeoffset-method-sqlservercallablestatement.md).  
  
 [setDateTimeOffset](setdatetimeoffset-method-sqlserverpreparedstatement.md) takes the ordinal of the column.  
  
## Related content

- [SQLServerCallableStatement Members](sqlservercallablestatement-members.md)
- [SQLServerCallableStatement Class](sqlservercallablestatement-class.md)
