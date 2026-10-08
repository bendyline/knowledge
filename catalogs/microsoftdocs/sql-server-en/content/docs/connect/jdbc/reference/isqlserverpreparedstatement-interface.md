---
title: "ISQLServerPreparedStatement Interface"
description: "ISQLServerPreparedStatement Interface"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# ISQLServerPreparedStatement Interface


  Represents the basic implementation of JDBC prepared statement functionality. This interface was added in  SQL Server 
 JDBC Driver 3.0.  
  
 **Package:** com.microsoft.sqlserver.jdbc  
  
 **Extends:** java.sql.PreparedStatement, [ISQLServerStatement](isqlserverstatement-interface.md)  
  
## Syntax  
  
```  
  
public interface ISQLServerPreparedStatement  
```  
  
## Remarks  
 This interface is implemented by [SQLServerPreparedStatement Class](sqlserverpreparedstatement-class.md).  
  
 This interface exposes the following  Microsoft JDBC Driver for SQL Server 
-specific methods:  
  
| Method | For more information, see |
| --- | --- |
| public void setDateTimeOffset(int, microsoft.sql.DateTimeOffset) | [setDateTimeOffset](setdatetimeoffset-method-sqlserverpreparedstatement.md) |
  
## Related content

- [JDBC driver API reference](jdbc-driver-api-reference.md)
