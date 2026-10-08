---
title: "setIntegratedSecurity Method (SQLServerDataSource)"
description: "setIntegratedSecurity Method (SQLServerDataSource)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDataSource.setIntegratedSecurity"
apitype: "Assembly"
---
# setIntegratedSecurity Method (SQLServerDataSource)


  Sets a **Boolean** value that indicates if the integratedSecurity property is enabled.  
  
## Syntax  
  
```  
  
public void setIntegratedSecurity(boolean enable)  
```  
  
#### Parameters  
 *enable*  
  
 **true** if integratedSecurity is enabled. Otherwise, **false**.  
  
## Remarks  
 Set to "**true**" to indicate that Windows credentials will be used by  SQL Server 
 to authenticate the user of the application. If "**true**", the  Microsoft JDBC Driver for SQL Server 
 will search the local computer credential cache for credentials that have already been provided at the computer or network logon. If "**false**", the username and password must be supplied.  
  
> **Note:**  
>  This property is only supported on  Microsoft 
 Windows operating systems.  
  
 For more information about using integrated authentication, see [Building the Connection URL](../building-the-connection-url.md).  
  
## Related content

- [SQLServerDataSource Members](sqlserverdatasource-members.md)
- [SQLServerDataSource Class](sqlserverdatasource-class.md)
