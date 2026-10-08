---
title: "SQLServerConnection Members"
description: "SQLServerConnection Members"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# SQLServerConnection Members


  The following tables list the members that are exposed by the [SQLServerConnection](sqlserverconnection-class.md) class.  
  
## Constructors  
 None.  
  
## Fields  
  
| Name | Description |
| --- | --- |
| [TRANSACTION_SNAPSHOT](transaction-snapshot-field-sqlserverconnection.md) | Used to specify the snapshot transaction isolation level. |
  
## Inherited Fields  
  
| Class inherited from: | Description |
| --- | --- |
| java.sql.Connection | TRANSACTION_NONE, TRANSACTION_READ_COMMITTED, TRANSACTION_READ_UNCOMMITTED, TRANSACTION_REPEATABLE_READ, TRANSACTION_SERIALIZABLE |
  
## Methods  
  
| Name | Description |
| --- | --- |
| [clearWarnings](clearwarnings-method-sqlserverconnection.md) | Clears all warnings reported for this [SQLServerConnection](sqlserverconnection-class.md) object. |
| [close](close-method-sqlserverconnection.md) | Releases the database for this [SQLServerConnection](sqlserverconnection-class.md) object and JDBC resources immediately instead of waiting for them to be automatically released. |
| [closeUnreferencedPreparedStatementHandles](closeunreferencedpreparedstatementhandles-method-sqlserverconnection.md) | Forces the un-prepare requests for any outstanding discarded prepared statements to be executed. |
| [commit](commit-method-sqlserverconnection.md) | Makes all changes made since the previous commit or rollback permanent, and releases any database locks that are currently held by this [SQLServerConnection](sqlserverconnection-class.md) object. |
| [createBlob](createblob-method-sqlserverconnection.md) | Creates a **java.sql.Blob** object without any data. |
| [createClob](createclob-method-sqlserverconnection.md) | Creates a **java.sql.Clob** object without any data. |
| [createNClob](createnclob-method-sqlserverconnection.md) | Creates a **java.sql.NClob** object without any data. |
| [createStatement](createstatement-method-sqlserverconnection.md) | Creates a [SQLServerStatement](sqlserverstatement-class.md) object for sending SQL statements to the database. |
| [createSQLXML](createsqlxml-method-sqlserverconnection.md) | Creates a **java.sql.SQLXML** object without any data. |
| [getAutoCommit](getautocommit-method-sqlserverconnection.md) | Retrieves the current auto-commit mode for this [SQLServerConnection](sqlserverconnection-class.md) object. |
| [getCatalog](getcatalog-method-sqlserverconnection.md) | Retrieves the current catalog name for this [SQLServerConnection](sqlserverconnection-class.md) object. |
| [getClientConnectionID Method (SQLServerConnection)](getclientconnectionid-method-sqlserverconnection.md) | Gets the connection ID of the most recent connection attempt, regardless of whether the attempt succeeded or failed. |
| [getClientInfo](getclientinfo-method-sqlserverconnection.md) | Retrieves information regarding the client information properties supported by the JDBC driver. |
| [getDisableStatementPooling](getdisablestatementpooling-method-sqlserverconnection.md) | Returns the value of **disableStatementPooling** connection property. This setting controls whether statement pooling is enabled or not for this connection. |
| [getDiscardedServerPreparedStatementCount](getdiscardedserverpreparedstatementcount-method-sqlserverconnection.md) | Returns the number of currently outstanding prepared statement unprepare actions. |
| [getEnablePrepareOnFirstPreparedStatementCall](getenableprepareonfirstpreparedstatementcall-method-sqlserverconnection.md) | Returns the value of **enablePrepareOnFirstPreparedStatementCall** connection property. |
| [getHoldability](getholdability-method-sqlserverconnection.md) | Retrieves the current holdability of [SQLServerResultSet](sqlserverresultset-class.md) objects that are created by using this [SQLServerConnection](sqlserverconnection-class.md) object. |
| [getMetaData](getmetadata-method-sqlserverconnection.md) | Retrieves a [SQLServerDatabaseMetaData](sqlserverdatabasemetadata-class.md) object that contains metadata about the database to which this [SQLServerConnection](sqlserverconnection-class.md) object represents a connection. |
| [getServerPreparedStatementDiscardThreshold](getserverpreparedstatementdiscardthreshold-method-sqlserverconnection.md) | Returns the value of **serverPreparedStatementDiscardThreshold** connection property. |
| [getStatementHandleCacheEntryCount](getstatementhandlecacheentrycount-method-sqlserverconnection.md) | Returns the current number of pooled prepared statement handles. |
| [getStatementPoolingCacheSize](getstatementpoolingcachesize-method-sqlserverconnection.md) | Returns the size of the prepared statement cache for this connection. |
| [getTransactionIsolation](gettransactionisolation-method-sqlserverconnection.md) | Retrieves the current transaction isolation level for this [SQLServerConnection](sqlserverconnection-class.md) object. |
| [getTypeMap](gettypemap-method-sqlserverconnection.md) | Retrieves the Map object that is associated with this [SQLServerConnection](sqlserverconnection-class.md) object. |
| [getWarnings](getwarnings-method-sqlserverconnection.md) | Retrieves the first warning reported by calls on this [SQLServerConnection](sqlserverconnection-class.md) object. |
| [isClosed](isclosed-method-sqlserverconnection.md) | Indicates whether this [SQLServerConnection](sqlserverconnection-class.md) object has been closed. |
| [isReadOnly](isreadonly-method-sqlserverconnection.md) | Indicates whether this [SQLServerConnection](sqlserverconnection-class.md) object is in read-only mode. |
| [isStatementPoolingEnabled](isstatementpoolingenabled-method-sqlserverconnection.md) | Returns whether statement pooling is enabled or not for this connection. |
| [isValid](isvalid-method-sqlserverconnection.md) | Indicates whether this [SQLServerConnection](sqlserverconnection-class.md) object has not been closed and is still valid. |
| [nativeSQL](nativesql-method-sqlserverconnection.md) | Converts the given SQL statement into the native SQL grammar of the database server. |
| [prepareCall](preparecall-method-sqlserverconnection.md) | Creates a [SQLServerCallableStatement](sqlservercallablestatement-class.md) object for calling database stored procedures. |
| [prepareStatement](preparestatement-method-sqlserverconnection.md) | Creates a [SQLServerPreparedStatement](sqlserverpreparedstatement-class.md) object for sending parameterized SQL statements to the database. |
| [releaseSavepoint](releasesavepoint-method-sqlserverconnection.md) | Removes the specified [SQLServerSavepoint](sqlserversavepoint-class.md) object from the current transaction. |
| [rollback](rollback-method-sqlserverconnection.md) | Undoes all changes made in the current transaction and releases any database locks currently held by this [SQLServerConnection](sqlserverconnection-class.md) object. |
| [setAutoCommit](setautocommit-method-sqlserverconnection.md) | Sets the auto-commit mode for this [SQLServerConnection](sqlserverconnection-class.md) object to the given state. |
| [setCatalog](setcatalog-method-sqlserverconnection.md) | Sets the specified catalog name to select a subspace of this [SQLServerConnection](sqlserverconnection-class.md) object's database in which to work. |
| [setClientInfo](setclientinfo-method-sqlserverconnection.md) | Sets the value of the client information properties. |
| [setDisableStatementPooling](setdisablestatementpooling-method-sqlserverconnection.md) | Sets statement pooling to true or false. |
| [setEnablePrepareOnFirstPreparedStatementCall](setenableprepareonfirstpreparedstatementcall-method-sqlserverconnection.md) | Specifies the new value of the **enablePrepareOnFirstPreparedStatementCall** connection property. |
| [setHoldability](setholdability-method-sqlserverconnection.md) | Changes the holdability of [SQLServerResultSet](sqlserverresultset-class.md) objects that are created by using this [SQLServerSavepoint](sqlserversavepoint-class.md) object to the given holdability. |
| [setReadOnly](setreadonly-method-sqlserverconnection.md) | Puts this [SQLServerConnection](sqlserverconnection-class.md) object in read-only mode as a hint to the JDBC driver to enable database optimizations. |
| [setSavepoint](setsavepoint-method-sqlserverconnection.md) | Creates an unnamed savepoint in the current transaction and returns the new [SQLServerSavepoint](sqlserversavepoint-class.md) object that represents it. |
| [setServerPreparedStatementDiscardThreshold](setserverpreparedstatementdiscardthreshold-method-sqlserverconnection.md) | Sets the new value of the **serverPreparedStatementDiscardThreshold** connection property. |
| [setStatementPoolingCacheSize](setstatementpoolingcachesize-method-sqlserverconnection.md) | Sets the size of the prepared statement cache for this connection. |
| [setTransactionIsolation](settransactionisolation-method-sqlserverconnection.md) | Tries to change the transaction isolation level for this [SQLServerConnection](sqlserverconnection-class.md) object to the one given. |
| [setTypeMap](settypemap-method-sqlserverconnection.md) | Installs the given TypeMap object as the type map for this [SQLServerConnection](sqlserverconnection-class.md) object. |
  
## Inherited Methods  
  
| Class inherited from: | Methods |
| --- | --- |
| java.lang.Object | clone, equals, finalize, getClass, hashCode, notify, notifyAll, toString, wait |
| java.lang.Wrapper | isWrapperFor, unwrap |
  
## Related content

- [SQLServerConnection Class](sqlserverconnection-class.md)
