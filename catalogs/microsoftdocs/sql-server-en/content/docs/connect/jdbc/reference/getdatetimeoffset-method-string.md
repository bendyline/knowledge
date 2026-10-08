---
title: "getDateTimeOffset Method (String)"
description: "getDateTimeOffset Method (String)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# getDateTimeOffset Method (String)


  This method was added in  Microsoft 
  SQL Server 
 JDBC Driver 3.0.  
  
 Retrieves the value of the designated parameter as a [DateTimeOffset Class](datetimeoffset-class.md) object in the Java programming language given the parameter index.  
  
## Syntax  
  
```  
  
public microsoft.sql.DateTimeOffset getDateTimeOffset(String sCol)  
```  
  
#### Parameters  
 *sCol*  
  
 The name of a parameter.  
  
## Return Value  
 A [DateTimeOffset Class](datetimeoffset-class.md) object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 You can set a [DateTimeOffset Class](datetimeoffset-class.md) parameter value with [SQLServerCallableStatement.setDateTimeOffset](setdatetimeoffset-method-sqlservercallablestatement.md).  
  
## Related content

- [getDateTimeOffset Method (SQLServerCallableStatement)](getdatetimeoffset-method-sqlservercallablestatement.md)
- [SQLServerCallableStatement Members](sqlservercallablestatement-members.md)
- [SQLServerCallableStatement Class](sqlservercallablestatement-class.md)
