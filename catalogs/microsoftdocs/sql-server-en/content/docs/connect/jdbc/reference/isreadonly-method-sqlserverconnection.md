---
title: "isReadOnly Method (SQLServerConnection)"
description: "isReadOnly Method (SQLServerConnection)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerConnection.isReadOnly"
apitype: "Assembly"
---
# isReadOnly Method (SQLServerConnection)


  Indicates whether this [SQLServerConnection](sqlserverconnection-class.md) object is in read-only mode.  
  
> **Note:**  
>  This method is not currently supported by the  Microsoft JDBC Driver for SQL Server 
.  
  
## Syntax  
  
```  
  
public boolean isReadOnly()  
```  
  
## Return Value  
 **true** if the connection is in read-only mode, **false** if it is not.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This isReadOnly method is specified by the isReadOnly method in the java.sql.Connection interface.  
  
## Related content

- [SQLServerConnection Members](sqlserverconnection-members.md)
- [SQLServerConnection Class](sqlserverconnection-class.md)
