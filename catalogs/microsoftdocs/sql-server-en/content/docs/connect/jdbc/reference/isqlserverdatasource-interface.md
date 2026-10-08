---
title: "ISQLServerDataSource Interface"
description: "ISQLServerDataSource Interface"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# ISQLServerDataSource Interface


  A factory to create connections to the data source represented by this object. This interface was added in  SQL Server 
 JDBC Driver 3.0.  
  
 **Package:** com.microsoft.sqlserver.jdbc  
  
 **Extends:** java.sql.CommonDataSource  
  
## Syntax  
  
```  
  
public interface ISQLServerDataSource  
```  
  
## Remarks  
 This interface is implemented by [SQLServerDataSource Class](sqlserverdatasource-class.md).  
  
 This interface exposes the following  Microsoft JDBC Driver for SQL Server 
-specific methods:  
  
| Method | For more information, see |
| --- | --- |
| public String getApplicationName() | [getApplicationName](getapplicationname-method-sqlserverdatasource.md) |
| public String getDatabaseName() | [getDatabaseName](getdatabasename-method-sqlserverdatasource.md) |
| public String getDescription() | [getDescription](getdescription-method-sqlserverdatasource.md) |
| public boolean getEncrypt() | [getEncrypt](getencrypt-method-sqlserverdatasource.md) |
| public String getFailoverPartner() | [getFailoverPartner](getfailoverpartner-method-sqlserverdatasource.md) |
| public String getHostNameInCertificate() | [getHostNameInCertificate](gethostnameincertificate-method-sqlserverdatasource.md) |
| public String getInstanceName() | [getInstanceName](getinstancename-method-sqlserverdatasource.md) |
| public boolean getLastUpdateCount() | [getLastUpdateCount](getlastupdatecount-method-sqlserverdatasource.md) |
| public int getLockTimeout() | [getLockTimeout](getlocktimeout-method-sqlserverdatasource.md) |
| public boolean getMultiSubnetFailover() | [getMultiSubnetFailover](getmultisubnetfailover-method-sqlserverdatasource.md) |
| public int getPacketSize() | [getPacketSize](getpacketsize-method-sqlserverdatasource.md) |
| public int getPortNumber() | [getPortNumber](getportnumber-method-sqlserverdatasource.md) |
| public String getResponseBuffering() | [getResponseBuffering](getresponsebuffering-method-sqlserverdatasource.md) |
| public String getSelectMethod() | [getSelectMethod](getselectmethod-method-sqlserverdatasource.md) |
| public boolean getSendStringParametersAsUnicode() | [getSendStringParametersAsUnicode](getsendstringparametersasunicode-method-sqlserverdatasource.md) |
| public boolean getSendTimeAsDatetime() | [getSendTimeAsDatetime](getsendtimeasdatetime-method-sqlserverdatasource.md) |
| public String getServerName() | [getServerName](getservername-method-sqlserverdatasource.md) |
| public boolean getTrustServerCertificate() | [getTrustServerCertificate](gettrustservercertificate-method-sqlserverdatasource.md) |
| public String getTrustStore() | [getTrustStore](gettruststore-method-sqlserverdatasource.md) |
| public String getURL() | [getURL](geturl-method-sqlserverdatasource.md) |
| public String getUser() | [getUser](getuser-method-sqlserverdatasource.md) |
| public String getWorkstationID() | [getWorkstationID](getworkstationid-method-sqlserverdatasource.md) |
| public boolean getXopenStates() | [getXopenStates](getxopenstates-method-sqlserverdatasource.md) |
| public void setApplicationName(String) | [setApplicationName](setapplicationname-method-sqlserverdatasource.md) |
| public void setAuthenticationScheme(String) | [setAuthenticationScheme](setauthenticationscheme-sqlserverdatasource.md) |
| public void setDatabaseName(String) | [setDatabaseName](setdatabasename-method-sqlserverdatasource.md) |
| public void setDescription(String) | [setDescription](setdescription-method-sqlserverdatasource.md) |
| public void setEncrypt(boolean) | [setEncrypt](setencrypt-method-sqlserverdatasource.md) |
| public void setFailoverPartner(String) | [setFailoverPartner](setfailoverpartner-method-sqlserverdatasource.md) |
| public void setHostNameInCertificate(String) | [setHostNameInCertificate](sethostnameincertificate-method-sqlserverdatasource.md) |
| public void setInstanceName(String) | [setInstanceName](setinstancename-method-sqlserverdatasource.md) |
| public void setIntegratedSecurity(boolean) | [setIntegratedSecurity](setintegratedsecurity-method-sqlserverdatasource.md) |
| public void setLastUpdateCount(boolean) | [setLastUpdateCount](setlastupdatecount-method-sqlserverdatasource.md) |
| public void setLockTimeout(int) | [setLockTimeout](setlocktimeout-method-sqlserverdatasource.md) |
| public void setMultiSubnetFailover(boolean multiSubnetFailover) | [setMultiSubnetFailover](setmultisubnetfailover-method-sqlserverdatasource.md) |
| public void setPacketSize(int) | [setPacketSize](setpacketsize-method-sqlserverdatasource.md) |
| public void setPassword(String) | [setPassword](setpassword-method-sqlserverdatasource.md) |
| public void setPortNumber(int) | [setPortNumber](setportnumber-method-sqlserverdatasource.md) |
| public void setResponseBuffering(String) | [setResponseBuffering](setresponsebuffering-method-sqlserverdatasource.md) |
| public void setSelectMethod(String) | [setSelectMethod](setselectmethod-method-sqlserverdatasource.md) |
| public void setSendStringParametersAsUnicode(boolean) | [setSendStringParametersAsUnicode](setsendstringparametersasunicode-method-sqlserverdatasource.md) |
| public void setSendTimeAsDatetime(boolean) | [setSendTimeAsDatetime](setsendtimeasdatetime-method-sqlserverdatasource.md) |
| public void setServerName(String) | [setServerName](setservername-method-sqlserverdatasource.md) |
| public void setTrustServerCertificate(boolean) | [setTrustServerCertificate](settrustservercertificate-method-sqlserverdatasource.md) |
| public void setTrustStore(String) | [setTrustStore](settruststore-method-sqlserverdatasource.md) |
| public void setTrustStorePassword(String) | [setTrustStorePassword](settruststorepassword-method-sqlserverdatasource.md) |
| public void setURL(String url) | [setURL](seturl-method-sqlserverdatasource.md) |
| public void setUser(String) | [setUser](setuser-method-sqlserverdatasource.md) |
| public void setWorkstationID(String) | [setWorkstationID](setworkstationid-method-sqlserverdatasource.md) |
| public void setXopenStates(boolean) | [setXopenStates](setxopenstates-method-sqlserverdatasource.md) |
  
## Related content

- [JDBC driver API reference](jdbc-driver-api-reference.md)
