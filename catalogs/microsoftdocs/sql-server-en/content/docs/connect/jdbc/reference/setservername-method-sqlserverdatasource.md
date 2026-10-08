---
title: "setServerName Method (SQLServerDataSource)"
description: "setServerName Method (SQLServerDataSource)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDataSource.setServerName"
apitype: "Assembly"
---
# setServerName Method (SQLServerDataSource)


  Sets the name of the computer that is running  SQL Server 
.  
  
## Syntax  
  
```  
  
public void setServerName(java.lang.String serverName)  
```  
  
#### Parameters  
 *serverName*  
  
 A **String** that contains the server name.  
  
## Remarks  
 The server name is the host name of the target computer that is running  SQL Server 
. If the serverName property is not set, [getServerName](getservername-method-sqlserverdatasource.md) returns the default value of null.  
  
## Related content

- [SQLServerDataSource Members](sqlserverdatasource-members.md)
- [SQLServerDataSource Class](sqlserverdatasource-class.md)
