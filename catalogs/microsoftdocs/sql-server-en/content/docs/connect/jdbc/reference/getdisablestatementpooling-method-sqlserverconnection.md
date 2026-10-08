---
title: "getDisableStatementPooling Method (SQLServerConnection)"
description: "getDisableStatementPooling Method (SQLServerConnection)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerConnection.getDisableStatementPooling"
apitype: "Assembly"
---
# getDisableStatementPooling Method (SQLServerConnection)


 Returns the value of **disableStatementPooling** connection property. This setting controls whether statement pooling is enabled or not for this connection.

## Syntax  
  
```  
  
public boolean getDisableStatementPooling()  
```  

## Return Value
 A **boolean** that contains the value of **disableStatementPooling** connection property.

## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
 
## Remarks  
 This method is available from JDBC driver version 6.4 and onward.
 
## Related content

- [SQLServerConnection Members](sqlserverconnection-members.md)
- [SQLServerConnection Class](sqlserverconnection-class.md)
