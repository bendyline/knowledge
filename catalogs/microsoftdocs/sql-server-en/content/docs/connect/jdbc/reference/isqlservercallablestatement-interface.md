---
title: "ISQLServerCallableStatement Interface"
description: "ISQLServerCallableStatement Interface"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# ISQLServerCallableStatement Interface


  Represents JDBC callable statements. This interface was added in  SQL Server 
 JDBC Driver 3.0.  
  
 **Package:** com.microsoft.sqlserver.jdbc  
  
 **Extends:** java.sql.CallableStatement, [ISQLServerPreparedStatement](isqlserverpreparedstatement-interface.md)  
  
## Syntax  
  
```  
  
public interface ISQLServerCallableStatement  
```  
  
## Remarks  
 This interface is implemented by [SQLServerCallableStatement Class](sqlservercallablestatement-class.md).  
  
 This interface exposes the following  Microsoft JDBC Driver for SQL Server 
-specific methods:  
  
| Method | For more information, see |
| --- | --- |
| microsoft.sql.DateTimeOffset getDateTimeOffset(int) | [getDateTimeOffset(int)](getdatetimeoffset-method-int.md) |
| microsoft.sql.DateTimeOffset getDateTimeOffset(String) | [getDateTimeOffset(String)](getdatetimeoffset-method-string.md) |
| void setDateTimeOffset(String, microsoft.sql.DateTimeOffset) | [setDateTimeOffset](setdatetimeoffset-method-sqlservercallablestatement.md) |
  
## Related content

- [JDBC driver API reference](jdbc-driver-api-reference.md)
