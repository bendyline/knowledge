---
title: "SQLServerDataSource Members"
description: "SQLServerDataSource Members"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# SQLServerDataSource Members


  The following tables list the members exposed by the [SQLServerDataSource](sqlserverdatasource-class.md) class.  
  
## Constructors  
  
| Name | Description |
| --- | --- |
| [SQLServerDataSource ()](sqlserverdatasource-constructor.md) | Initializes a new instance of the [SQLServerDataSource](sqlserverdatasource-class.md) class. |
  
## Fields  
 None.  
  
## Inherited Fields  
 None.  
  
## Methods  
  
| Name | Description |
| --- | --- |
| [getApplicationIntent](getapplicationintent-method-sqlserverdatasource.md) | Returns the value of the **applicationIntent** connection property. |
| [getApplicationName](getapplicationname-method-sqlserverdatasource.md) | Returns the application name. |
| [getConnection](getconnection-method-sqlserverdatasource.md) | Tries to establish a connection with the data source that this [SQLServerDataSource](sqlserverdatasource-class.md) object represents. |
| [getDatabaseName](getdatabasename-method-sqlserverdatasource.md) | Returns the database name. |
| [getDisableStatementPooling](getdisablestatementpooling-method-sqlserverdatasource.md) | Returns the value of **disableStatementPooling** connection property. This setting controls whether statement pooling is enabled or not for this connection. |
| [getEnablePrepareOnFirstPreparedStatementCall](getenableprepareonfirstpreparedstatementcall-method-sqlserverdatasource.md) | Returns the value of **enablePrepareOnFirstPreparedStatementCall** connection property. |
| [getEncrypt](getencrypt-method-sqlserverdatasource.md) | Returns a **Boolean** value indicating whether the encrypt property is enabled. |
| [getDescription](getdescription-method-sqlserverdatasource.md) | Returns a description of the data source. |
| [getFailoverPartner](getfailoverpartner-method-sqlserverdatasource.md) | Returns the name of the failover server used in a database mirroring configuration. |
| [getHostNameInCertificate](gethostnameincertificate-method-sqlserverdatasource.md) | Returns the host name used in validating the SQL Server Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), certificate. |
| [getInstanceName](getinstancename-method-sqlserverdatasource.md) | Returns the  SQL Server |
 | instance name. |
| [getLastUpdateCount](getlastupdatecount-method-sqlserverdatasource.md) | Returns a **boolean** value indicating whether the lastUpdateCount property is enabled. |
| [getLockTimeout](getlocktimeout-method-sqlserverdatasource.md) | Returns an **int** value indicating the number of milliseconds the database waits before reporting a lock time out. |
| [getLoginTimeout](getlogintimeout-method-sqlserverdatasource.md) | Returns the number of seconds this [SQLServerDataSource](sqlserverdatasource-class.md) object waits while trying to make a connection. |
| [getLogWriter](getlogwriter-method-sqlserverdatasource.md) | Returns a character output stream to be used for all logging and tracing messages. |
| [getMultiSubnetFailover](getmultisubnetfailover-method-sqlserverdatasource.md) | Returns the value of the **multiSubnetFailover** connection property. |
| [getPacketSize](getpacketsize-method-sqlserverdatasource.md) | Returns the current network packet size used to communicate with  SQL Server |
| , specified in bytes. |
| [getPortNumber](getportnumber-method-sqlserverdatasource.md) | Returns the current port number used to communicate with  SQL Server |
| . |
| [getReference](getreference-method-sqlserverdatasource.md) | Returns a reference to this [SQLServerDataSource](sqlserverdatasource-class.md) object. |
| [getResponseBuffering](getresponsebuffering-method-sqlserverdatasource.md) | Returns the response buffering mode for this [SQLServerDataSource](sqlserverdatasource-class.md) object. |
| [getSelectMethod](getselectmethod-method-sqlserverdatasource.md) | Returns the default cursor type used for all result sets created by using this [SQLServerDataSource](sqlserverdatasource-class.md) object. |
| [getSendStringParametersAsUnicode](getsendstringparametersasunicode-method-sqlserverdatasource.md) | Returns a **Boolean** value indicating whether sending string parameters to the server in UNICODE format is enabled. |
| [getSendTimeAsDatetime](getsendtimeasdatetime-method-sqlserverdatasource.md) | Returns the setting of the **SendTimeAsDatetime** connection property. |
| [getServerName](getservername-method-sqlserverdatasource.md) | Returns the name of the computer running  SQL Server |
| . |
| [getServerPreparedStatementDiscardThreshold](getserverpreparedstatementdiscardthreshold-method-sqlserverdatasource.md) | Returns the value of **serverPreparedStatementDiscardThreshold** connection property. |
| [getStatementPoolingCacheSize](getstatementpoolingcachesize-method-sqlserverdatasource.md) | Returns the size of the prepared statement cache for this connection. |
| [getTrustManagerClass](gettrustmanagerclass-method-sqlserverdatasource.md) | Returns the string value of the TrustManagerClass connection property. |
| [getTrustManagerConstructorArg](gettrustmanagerconstructorarg-method-sqlserverdatasource.md) | Returns the string value of the TrustManagerConstructorArg connection property. |
| [getTrustServerCertificate](gettrustservercertificate-method-sqlserverdatasource.md) | Returns a **Boolean** value indicating whether the trustServerCertificate property is enabled. |
| [getTrustStore](gettruststore-method-sqlserverdatasource.md) | Returns the path (including file name) to the certificate trustStore file. |
| [getURL](geturl-method-sqlserverdatasource.md) | Returns the URL used to connect to the data source. |
| [getUser](getuser-method-sqlserverdatasource.md) | Returns the user name used to connect the data source. |
| [getUseSQLServerBaseDate](getsendtimeasdatetime-method-sqlserverdatasource.md) | Returns the setting of the useSQLServerBaseDate connection property. |
| [getWorkstationID](getworkstationid-method-sqlserverdatasource.md) | Returns the name of the client computer name used to connect to the data source. |
| [getXopenStates](getxopenstates-method-sqlserverdatasource.md) | Returns a **Boolean** value indicating whether converting SQL states to XOPEN compliant states is enabled. |
| [isWrapperFor](iswrapperfor-method-sqlserverdatasource.md) | Indicates whether this data source object is a wrapper for the specified interface. |
| [setApplicationIntent](setapplicationintent-method-sqlserverdatasource.md) | Sets the value of the **applicationIntent** connection property. |
| [setApplicationName](setapplicationname-method-sqlserverdatasource.md) | Sets the application name. |
| [setAuthenticationScheme](setauthenticationscheme-sqlserverdatasource.md) | Indicates the kind of integrated security you want your application to use. |
| [setDatabaseName](setdatabasename-method-sqlserverdatasource.md) | Sets the database name to connect to. |
| [setDescription](setdescription-method-sqlserverdatasource.md) | Sets the description of the data source. |
| [setDisableStatementPooling](setdisablestatementpooling-method-sqlserverdatasource.md) | Sets statement pooling to true or false. |
| [setEnablePrepareOnFirstPreparedStatementCall](setenableprepareonfirstpreparedstatementcall-method-sqlserverdatasource.md) | Specifies the new value of the **enablePrepareOnFirstPreparedStatementCall** connection property. |
| [setEncrypt](setencrypt-method-sqlserverdatasource.md) | Sets a **Boolean** value indicating whether the encrypt property is enabled. |
| [setFailoverPartner](setfailoverpartner-method-sqlserverdatasource.md) | Sets the name of the failover server used in a database mirroring configuration. |
| [setHostNameInCertificate](sethostnameincertificate-method-sqlserverdatasource.md) | Sets the host name to be used in validating the SQL Server Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), certificate. |
| [setInstanceName](setinstancename-method-sqlserverdatasource.md) | Sets the  SQL Server |
 | instance name. |
| [setIntegratedSecurity](setintegratedsecurity-method-sqlserverdatasource.md) | Sets a **Boolean** value indicating whether the integratedSecurity property is enabled. |
| [setLastUpdateCount](setlastupdatecount-method-sqlserverdatasource.md) | Sets a **Boolean** value indicating whether the lastUpdateCount property is enabled. |
| [setLockTimeout](setlocktimeout-method-sqlserverdatasource.md) | Sets an **int** value indicating the number of milliseconds to wait before the database reports a lock time out. |
| [setLoginTimeout](setlogintimeout-method-sqlserverdatasource.md) | Sets the number of seconds that this [SQLServerDataSource](sqlserverdatasource-class.md) object waits while trying to make a connection. |
| [setLogWriter](setlogwriter-method-sqlserverdatasource.md) | Sets a character output stream to be used for all logging and tracing messages. |
| [setMultiSubnetFailover](setmultisubnetfailover-method-sqlserverdatasource.md) | Sets the value of the **multiSubnetFailover** connection property. |
| [setPacketSize](setpacketsize-method-sqlserverdatasource.md) | Sets the current network packet size used to communicate with  SQL Server |
| , specified in bytes. |
| [setPassword](setpassword-method-sqlserverdatasource.md) | Sets the password used to connect to  SQL Server |
| . |
| [setPortNumber](setportnumber-method-sqlserverdatasource.md) | Sets the port number used to communicate with  SQL Server |
| . |
| [setResponseBuffering](setresponsebuffering-method-sqlserverdatasource.md) | Sets the response buffering mode for connections created by using this [SQLServerDataSource](sqlserverdatasource-class.md) object. |
| [setSelectMethod](setselectmethod-method-sqlserverdatasource.md) | Sets the default cursor type used for all result sets created by using this [SQLServerDataSource](sqlserverdatasource-class.md) object. |
| [setSendStringParametersAsUnicode](setsendstringparametersasunicode-method-sqlserverdatasource.md) | Sets a **Boolean** value indicating whether sending string parameters to the server in UNICODE format is enabled. |
| [setSendTimeAsDatetime](setsendtimeasdatetime-method-sqlserverdatasource.md) | Specifies how to send java.sql.Time values to the server. |
| [setServerName](setservername-method-sqlserverdatasource.md) | Sets the name of the computer running  SQL Server |
| . |
| [setServerPreparedStatementDiscardThreshold](setserverpreparedstatementdiscardthreshold-method-sqlserverdatasource.md) | Sets the new value of the **serverPreparedStatementDiscardThreshold** connection property. |
| [setStatementPoolingCacheSize](setstatementpoolingcachesize-method-sqlserverdatasource.md) | Sets the size of the prepared statement cache for this connection. |
| [setTrustManagerClass](settrustmanagerclass-method-sqlserverdatasource.md) | Sets the string value of the TrustManagerClass connection property. |
| [setTrustManagerConstructorArg](settrustmanagerconstructorarg-method-sqlserverdatasource.md) | Sets the string value of the TrustManagerConstructorArg connection property. |
| [setTrustServerCertificate](settrustservercertificate-method-sqlserverdatasource.md) | Sets a **Boolean** value indicating whether the trustServerCertificate property is enabled. |
| [setTrustStore](settruststore-method-sqlserverdatasource.md) | Sets the path (including file name) to the certificate trustStore file. |
| [setTrustStorePassword](settruststorepassword-method-sqlserverdatasource.md) | Sets the password that is used to check the integrity of the trustStore data. |
| [setURL](seturl-method-sqlserverdatasource.md) | Sets the URL used to connect to the data source. |
| [setUser](setuser-method-sqlserverdatasource.md) | Sets the user name used to connect the data source. |
| [setWorkstationID](setworkstationid-method-sqlserverdatasource.md) | Sets the name of the client computer used to connect to the data source. |
| [setXopenStates](setxopenstates-method-sqlserverdatasource.md) | Sets a **Boolean** value indicating whether converting SQL states to XOPEN compliant states is enabled. |
| [unwrap](unwrap-method-sqlserverdatasource.md) | Returns an object that implements the specified interface to allow access to the  Microsoft JDBC Driver for SQL Server |
| -specific methods. |
  
## Inherited Methods  
  
| Class inherited from: | Methods |
| --- | --- |
| java.lang.Object | clone, equals, finalize, getClass, hashCode, notify, notifyAll, toString, wait |
| java.sql.Wrapper | isWrapperFor, unwrap |
  
## Related content

- [SQLServerDataSource Class](sqlserverdatasource-class.md)
