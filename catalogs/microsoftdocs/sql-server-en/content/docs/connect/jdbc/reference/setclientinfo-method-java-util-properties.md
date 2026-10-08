---
title: "setClientInfo Method (java.util.Properties)"
description: "setClientInfo Method (java.util.Properties)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# setClientInfo Method (java.util.Properties)


  Sets the value of the connection's client information properties.  
  
## Syntax  
  
```  
  
public void setClientInfo (java.util.Properties properties)  
```  
  
#### Parameters  
 *properties*  
  
 A Properties object that contains the list of client information properties to set.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This setClientInfo method is specified by the setClientInfo method in the java.sql.Connection interface.  
  
 The  Microsoft JDBC Driver for SQL Server 
 does not support any client information properties. This method generates warnings if the *properties* input parameter does not refer to an empty property set. In other words, this method generates warnings for the properties that the application wants to set. Applications should use [getWarnings](getwarnings-method-sqlserverconnection.md) method of the [SQLServerConnection](sqlserverconnection-class.md) class to retrieve each warning.  
  
## Related content

- [setClientInfo Method (SQLServerConnection)](setclientinfo-method-sqlserverconnection.md)
- [SQLServerConnection Members](sqlserverconnection-members.md)
- [SQLServerConnection Class](sqlserverconnection-class.md)
