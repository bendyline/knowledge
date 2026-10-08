---
title: "ISQLServerStatement Interface"
description: "ISQLServerStatement Interface"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# ISQLServerStatement Interface


  Represents the basic implementation of JDBC statement functionality. This interface was added in  SQL Server 
 JDBC Driver 3.0.  
  
 **Package:** com.microsoft.sqlserver.jdbc  
  
 **Extends:** java.sql.Statement  
  
## Syntax  
  
```  
  
public interface ISQLServerStatement  
```  
  
## Remarks  
 This interface is implemented by [SQLServerStatement Class](sqlserverstatement-class.md).  
  
 This interface exposes the following  Microsoft JDBC Driver for SQL Server 
-specific methods:  
  
| Method | For more information, see |
| --- | --- |
| public String getResponseBuffering | [getResponseBuffering](getresponsebuffering-method-sqlserverstatement.md) |
| public void setResponseBuffering | [setResponseBuffering](setresponsebuffering-method-sqlserverstatement.md) |
  
## Related content

- [JDBC driver API reference](jdbc-driver-api-reference.md)
