---
title: "setAutoCommit Method (SQLServerConnection)"
description: "Learn the public API details for the setAutoCommit method in the SQLServerConnection class of the JDBC Driver for SQL Server."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerConnection.setAutoCommit"
apitype: "Assembly"
---
# setAutoCommit Method (SQLServerConnection)


  Sets the autocommit mode for this [SQLServerConnection](sqlserverconnection-class.md) object to the given state.  
  
## Syntax  
  
```  
  
public void setAutoCommit(boolean value)  
```  
  
#### Parameters  
 *value*  
  
 **true** to enable autocommit mode for the connection, **false** to disable it.  
  
## Exceptions  
 [SQLServerException](sqlserverexception-class.md)  
  
## Remarks  
 This setAutoCommit method is specified by the setAutoCommit method in the java.sql.Connection interface.  
  
 If a connection is in autocommit mode, then all its SQL statements are run and committed as individual transactions. Otherwise, its SQL statements are grouped into transactions that are ended by a call to either the [commit](commit-method-sqlserverconnection.md) method or the [rollback](rollback-method-sqlserverconnection.md) method. By default, new connections are in autocommit mode.  
  
 The commit occurs when the statement completes or the next run occurs, whichever comes first. When statements return a [SQLServerResultSet](sqlserverresultset-class.md) object, the statement completes when the last row of the result set has been retrieved, or when the result set has been closed. In advanced cases, a single statement might return multiple results in addition to output parameter values. In these cases, the commit occurs when all results and output parameter values have been retrieved.  
  
 When the autocommit mode is **false**, the JDBC driver will implicitly start a new transaction after each commit.  
  
> **Note:**  
> If this method is called during a transaction, the transaction is committed.  
  
## Related content

- [SQLServerConnection Members](sqlserverconnection-members.md)
- [SQLServerConnection Class](sqlserverconnection-class.md)
