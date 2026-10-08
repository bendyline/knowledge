---
title: "releaseSavepoint Method (SQLServerConnection)"
description: "releaseSavepoint Method (SQLServerConnection)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerConnection.releaseSavepoint"
apitype: "Assembly"
---
# releaseSavepoint Method (SQLServerConnection)


  Removes the given [SQLServerSavepoint](sqlserversavepoint-class.md) object from the current transaction.  
  
> **Note:**  
>  This method is not currently supported by the  Microsoft JDBC Driver for SQL Server 
.  
  
## Syntax  
  
```  
  
public void releaseSavepoint(java.sql.Savepoint savepoint)  
```  
  
#### Parameters  
 *savepoint*  
  
 The SavePoint object to remove.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This releaseSavepoint method is specified by the releaseSavepoint method in the java.sql.Connection interface.  
  
## Related content

- [SQLServerConnection Members](sqlserverconnection-members.md)
- [SQLServerConnection Class](sqlserverconnection-class.md)
