---
title: "SQLServerXADataSource Members"
description: "SQLServerXADataSource Members"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# SQLServerXADataSource Members


  The following tables list the members that are exposed by the [SQLServerXADataSource](sqlserverxadatasource-class.md) class.  
  
## Constructors  
  
| Name | Description |
| --- | --- |
| [SQLServerXADataSource ()](sqlserverxadatasource-constructor.md) | Initializes a new instance of the [SQLServerXADataSource](sqlserverxadatasource-class.md) class. |
  
## Fields  
 None.  
  
## Inherited Fields  
 None.  
  
## Methods  
  
| Name | Description |
| --- | --- |
| [getApplicationIntent](getapplicationintent-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns the value of the **applicationIntent** connection property. |
| [getApplicationName](getapplicationname-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns the application name. |
| [getConnection](getconnection-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Tries to establish a connection with the data source that this DataSource object represents. |
| [getDatabaseName](getdatabasename-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns the database name. |
| [getFailoverPartner](getfailoverpartner-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns the name of the failover server that is used in a database mirroring configuration. |
| [getInstanceName](getinstancename-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns the  SQL Server |
 | instance name. |
| [getLastUpdateCount](getlastupdatecount-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns a **Boolean** value that indicates if the lastUpdateCount property is enabled. |
| [getLockTimeout](getlocktimeout-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns an **int** value that indicates the number of milliseconds that the database will wait before reporting a lock time out. |
| [getLoginTimeout](getlogintimeout-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns the number of seconds that this DataSource object will wait while trying to make a connection. |
| [getLogWriter](getlogwriter-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns a character output stream to be used for all logging and tracing messages. |
| [getMultiSubnetFailover](getmultisubnetfailover-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Retrieves the value of the **multiSubnetFailover** connection property. |
| [getPooledConnection](getpooledconnection-method-sqlserverconnectionpooldatasource.md) | (Inherited from [SQLServerConnectionPoolDataSource](sqlserverconnectionpooldatasource-class.md)) Tries to establish a physical database connection that can be used as a pooled connection. |
| [getPortNumber](getportnumber-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns the current port number that is used to communicate with  SQL Server |
| . |
| [getReference](getreference-method-sqlserverxadatasource.md) | Returns a reference to this [SQLServerXADataSource](sqlserverxadatasource-class.md) object. |
| [getSelectMethod](getselectmethod-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns the default cursor type that is used for all result sets that are created by using this DataSource object. |
| [getSendStringParametersAsUnicode](getsendstringparametersasunicode-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns a **Boolean** value that indicates if sending **String** parameters to the server in UNICODE format is enabled. |
| [getServerName](getservername-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns the name of the computer that is running  SQL Server |
| . |
| [getURL](geturl-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns the URL that is used to connect to the data source. |
| [getUser](getuser-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns the user name that is used to connect the data source. |
| [getWorkstationID](getworkstationid-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns the name of the client computer name that is used to connect to the data source. |
| [getXAConnection](getxaconnection-method-sqlserverxadatasource.md) | Tries to establish a physical database connection that can be used in a distributed transaction. |
| [getXopenStates](getxopenstates-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Returns a **Boolean** value that indicates if converting SQL states to XOPEN compliant states is enabled. |
| [isWrapperFor](iswrapperfor-method-sqlserverxadatasource.md) | Indicates whether this object is a wrapper for the specified interface. |
| [setApplicationIntent](setapplicationintent-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the value of the **applicationIntent** connection property. |
| [setApplicationName](setapplicationname-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the application name. |
| [setAuthenticationScheme](setauthenticationscheme-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Indicates the kind of integrated security you want your application to use. |
| [setDatabaseName](setdatabasename-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the database name to connect to. |
| [setDescription](setdescription-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the description of the data source. |
| [setFailoverPartner](setfailoverpartner-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the name of the failover server that is used in a database mirroring configuration. |
| [setInstanceName](setinstancename-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the  SQL Server |
 | instance name. |
| [setIntegratedSecurity](setintegratedsecurity-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets a **boolean** value that indicates if the integratedSecurity property is enabled. |
| [setLastUpdateCount](setlastupdatecount-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets a **Boolean** value that indicates if the lastUpdateCount property is enabled. |
| [setLockTimeout](setlocktimeout-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets an **int** value that indicates the number of milliseconds to wait before the database reports a lock time out. |
| [setLoginTimeout](setlogintimeout-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the number of seconds that this DataSource object will wait while trying to make a connection. |
| [setLogWriter](setlogwriter-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets a character output stream to be used for all logging and tracing messages. |
| [setMultiSubnetFailover](setmultisubnetfailover-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the value of the **multiSubnetFailover** connection property. |
| [setPassword](setpassword-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the password that will be used to connect to  SQL Server |
| . |
| [setPortNumber](setportnumber-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the port number to be used to communicate with  SQL Server |
| . |
| [setSelectMethod](setselectmethod-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the default cursor type that is used for all result sets that are created by using this DataSource object. |
| [setSendStringParametersAsUnicode](setsendstringparametersasunicode-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets a **Boolean** value that indicates if sending **String** parameters to the server in UNICODE format is enabled. |
| [setServerName](setservername-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the name of the computer that is running  SQL Server |
| . |
| [setURL](seturl-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the URL that is used to connect to the data source. |
| [setUser](setuser-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the user name that is used to connect the data source. |
| [setWorkstationID](setworkstationid-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets the client computer name that is used to connect to the data source. |
| [setXopenStates](setxopenstates-method-sqlserverdatasource.md) | (Inherited from [SQLServerDataSource](sqlserverdatasource-class.md)) Sets a **boolean** value that indicates if converting SQL states to XOPEN compliant states is enabled. |
| [unwrap](unwrap-method-sqlserverxadatasource.md) | Returns an object that implements the specified interface to allow access to the  Microsoft JDBC Driver for SQL Server |
| -specific methods. |
  
## Inherited Methods  
  
| Class inherited from: | Methods |
| --- | --- |
| com.microsoft.sqlserver.jdbc.SQLServerConnectionPoolDataSource | getPooledConnection |
| com.microsoft.sqlserver.jdbc.SQLServerDataSource | getApplicationName, getConnection, getDatabaseName, getDescription, getFailoverPartner, getInstanceName, getLastUpdateCount, getLockTimeout, getLoginTimeout, getLogWriter, getPortNumber, getSelectMethod, getSendStringParametersAsUnicode, getServerName, getURL, getUser, getWorkstationID, getXopenStates, setApplicationName, setDatabaseName, setDescription, setFailoverPartner, setInstanceName, setIntegratedSecurity, setLastUpdateCount, setLockTimeout, setLoginTimeout, setLogWriter, setPassword, setPortNumber, setSelectMethod, setSendStringParametersAsUnicode, setServerName, setURL, setUser, setWorkstationID, setXopenStates |
| java.lang.Object | clone, equals, finalize, getClass, hashCode, notify, notifyAll, toString, wait |
| java.sql.Wrapper | isWrapperFor, unwrap |
| javax.sql.XADataSource | getLoginTimeout, getLogWriter, setLoginTimeout, setLogWriter |
| javax.sql.ConnectionPoolDataSource | getLoginTimeout, getLogWriter, setLoginTimeout, setLogWriter |
  
## Related content

- [SQLServerXADataSource Class](sqlserverxadatasource-class.md)
