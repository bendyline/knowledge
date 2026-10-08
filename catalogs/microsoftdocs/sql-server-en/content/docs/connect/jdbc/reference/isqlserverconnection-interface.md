---
title: "ISQLServerConnection Interface"
description: "ISQLServerConnection Interface"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# ISQLServerConnection Interface


  Represents a JDBC connection to a  Microsoft 
  SQL Server 
 database. This interface was added in  SQL Server 
 JDBC Driver 3.0.  
  
 **Package:** com.microsoft.sqlserver.jdbc  
  
 **Extends:** java.sql.Connection  
  
## Syntax  
  
```  
  
public interface ISQLServerConnection  
```  
  
## Remarks  
 This interface is implemented by [SQLServerConnection Class](sqlserverconnection-class.md).  
  
 This interface exposes the following  Microsoft JDBC Driver for SQL Server 
-specific field:  
  
| Field | For more information, see |
| --- | --- |
| public final static int TRANSACTION_SNAPSHOT | [TRANSACTION_SNAPSHOT](transaction-snapshot-field-sqlserverconnection.md) |
| public UUID getClientConnectionId() | [getClientConnectionID()](getclientconnectionid-method-sqlserverconnection.md) |
  
## Related content

- [JDBC driver API reference](jdbc-driver-api-reference.md)
