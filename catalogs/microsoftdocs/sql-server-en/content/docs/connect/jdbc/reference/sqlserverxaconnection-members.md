---
title: "SQLServerXAConnection Members"
description: "SQLServerXAConnection Members"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# SQLServerXAConnection Members


  The following tables list the members that are exposed by the [SQLServerXAConnection](sqlserverxaconnection-class.md) class.  
  
## Constructors  
 None.  
  
## Fields  
 None.  
  
## Inherited Fields  
 None.  
  
## Methods  
  
| Name | Description |
| --- | --- |
| [addConnectionEventListener](addconnectioneventlistener-method-sqlserverpooledconnection.md) | (Inherited from [SQLServerPooledConnection](sqlserverpooledconnection-class.md)) Registers the given event listener so that it will be notified when an event occurs on this Connection object. |
| [close](close-method-sqlserverpooledconnection.md) | (Inherited from [SQLServerPooledConnection](sqlserverpooledconnection-class.md)) Closes the physical connection that this Connection object represents. |
| [getConnection](getconnection-method-sqlserverpooledconnection.md) | (Inherited from [SQLServerPooledConnection](sqlserverpooledconnection-class.md)) Creates an object handle for the physical connection that this Connection object represents. |
| [getXAResource](getxaresource-method-sqlserverxaconnection.md) | Retrieves a [SQLServerXAResource](sqlserverxaresource-class.md) object that the transaction manager will use to manage the participation of this [SQLServerXAConnection](sqlserverxaconnection-class.md) object in a distributed transaction. |
| [removeConnectionEventListener](removeconnectioneventlistener-method-sqlserverpooledconnection.md) | (Inherited from [SQLServerPooledConnection](sqlserverpooledconnection-class.md)) Removes the given event listener. |
  
## Inherited Methods  
  
| Class inherited from: | Methods |
| --- | --- |
| com.microsoft.sqlserver.jdbc.SQLServerPooledConnection | addConnectionEventListener, close, getConnection, removeConnectionEventListener |
| java.lang.Object | clone, equals, finalize, getClass, hashCode, notify, notifyAll, toString, wait |
| javax.sql.PooledConnection | addConnectionEventListener, close, getConnection, removeConnectionEventListener |
  
## Related content

- [SQLServerXAConnection Class](sqlserverxaconnection-class.md)
