---
title: "getClientInfo Method ()"
description: "getClientInfo Method ()"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# getClientInfo Method ()


  Retrieves a list that contains the name and current value of each client information property supported by the JDBC driver.  
  
## Syntax  
  
```  
  
public java.util.Properties getClientInfo()  
```  
  
## Return Value  
 A Properties object that contains the name and current value of each of the client information properties supported by the driver.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This getClientInfo method is specified by the getClientInfo method in the java.sql.Connection interface.  
  
 The  Microsoft JDBC Driver for SQL Server 
 does not support any client information properties. As a result, this method returns an empty Properties object.  
  
 Similarly, applications can use the [getClientInfoProperties](getclientinfoproperties-method-sqlserverdatabasemetadata.md) method of the [SQLServerDatabaseMetaData](sqlserverdatabasemetadata-class.md) class to retrieve a list of the client information properties that the driver supports. The [getClientInfoProperties](getclientinfoproperties-method-sqlserverdatabasemetadata.md) method returns an empty result set.  
  
## Related content

- [getClientInfo Method (SQLServerConnection)](getclientinfo-method-sqlserverconnection.md)
- [SQLServerConnection Members](sqlserverconnection-members.md)
- [SQLServerConnection Class](sqlserverconnection-class.md)
