---
title: "setHoldability Method (SQLServerConnection)"
description: "setHoldability Method (SQLServerConnection)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerConnection.setHoldability"
apitype: "Assembly"
---
# setHoldability Method (SQLServerConnection)


  Changes the holdability of [SQLServerResultSet](sqlserverresultset-class.md) objects that are created by using this [SQLServerSavepoint](sqlserversavepoint-class.md) object to the given holdability.  
  
## Syntax  
  
```  
  
public void setHoldability(int nNewHold)  
```  
  
#### Parameters  
 *nNewHold*  
  
 An **int** value that contains one of the following holdability levels:  
  
 HOLD_CURSORS_OVER_COMMIT  
  
 CLOSE_CURSORS_AT_COMMIT  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This setHoldability method is specified by the setHoldability method in the java.sql.Connection interface.  
  
## Related content

- [SQLServerConnection Members](sqlserverconnection-members.md)
- [SQLServerConnection Class](sqlserverconnection-class.md)
