---
title: "setTypeMap Method (SQLServerConnection)"
description: "setTypeMap Method (SQLServerConnection)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerConnection.setTypeMap"
apitype: "Assembly"
---
# setTypeMap Method (SQLServerConnection)


  Installs the given TypeMap object as the type map for this [SQLServerConnection](sqlserverconnection-class.md) object.  
  
> **Note:**  
>  This method is not currently supported by the  Microsoft JDBC Driver for SQL Server 
.  
  
## Syntax  
  
```  
  
public void setTypeMap(java.util.Map map)  
```  
  
#### Parameters  
 *map*  
  
 A TypeMap object.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This setTypeMap method is specified by the setTypeMap method in the java.sql.Connection interface.  
  
## Related content

- [SQLServerConnection Members](sqlserverconnection-members.md)
- [SQLServerConnection Class](sqlserverconnection-class.md)
