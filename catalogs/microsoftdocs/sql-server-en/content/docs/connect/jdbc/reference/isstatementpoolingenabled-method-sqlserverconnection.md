---
title: "isStatementPoolingEnabled Method (SQLServerConnection)"
description: "isStatementPoolingEnabled Method (SQLServerConnection)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerConnection.isStatementPoolingEnabled"
apitype: "Assembly"
---
# isStatementPoolingEnabled Method (SQLServerConnection)


 Returns whether statement pooling is enabled or not for this connection.

## Syntax  
  
```  
  
public boolean isStatementPoolingEnabled()  
```  

## Return Value
 A **boolean** that contains the flag indicating whether statement pooling is enabled or not.

## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
 
## Remarks  
 This method is available from JDBC driver version 6.4 and onward.
 
## Related content

- [SQLServerConnection Members](sqlserverconnection-members.md)
- [SQLServerConnection Class](sqlserverconnection-class.md)
