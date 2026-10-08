---
title: "setEncrypt Method (SQLServerDataSource)"
description: "setEncrypt Method (SQLServerDataSource)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "setEncrypt Method (SQLServerDataSource)"
apiname: "setEncrypt Method (SQLServerDataSource)"
apitype: "Assembly"
---
# setEncrypt Method (SQLServerDataSource)


  Sets a **Boolean** value that indicates if the encrypt property is enabled.  
  
## Syntax  
  
```  
  
public void setEncrypt(boolean encrypt)  
```  
  
#### Parameters  
 *encrypt*  
  
 **true** if the Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), encryption is enabled between the client and the  SQL Server 
. Otherwise, **false**.  
  
## Remarks  
 If the encrypt property is set to **true**, the  Microsoft JDBC Driver for SQL Server 
 ensures that  SQL Server 
 uses TLS encryption for all data sent between the client and server if the server has a certificate installed. The default value is **false**.  
  
 The JDBC driver detects the Java Virtual Machine (JVM) it is running on when trying to establish a TLS handshake.  
  
 If the encrypt property is set to **true**, the  Microsoft JDBC Driver for SQL Server 
 uses the JVM's default JSSE security provider to negotiate TLS encryption with  SQL Server 
. The default security provider may not support all of the features required to negotiate TLS encryption successfully. For example, the default security provider may not support the size of the RSA public key used in the  SQL Server 
 TLS/SSL certificate. In this case, the default security provider might raise an error that will cause the JDBC driver to terminate the connection. In order to resolve this issue, do one of the following:  
  
-   Configure the  SQL Server 
 with a server certificate that has a smaller RSA public key  
  
-   Configure the JVM to use a different JSSE security provider in the "\<java-home>/lib/security/java.security" security properties file  
  
-   Use a different JVM  
  
 If the encrypt property is unspecified or set to **false**, the driver will not enforce the  SQL Server 
 to support TLS encryption. If the  SQL Server 
 instance is not configured to force the TLS encryption, a connection is established without any encryption. If the  SQL Server 
 instance is configured to force the TLS encryption, the  Microsoft JDBC Driver for SQL Server 
 will automatically enable TLS encryption when running on properly configured JVM, or else the connection is terminated and the driver will raise an error.  
  
## Related content

- [SQLServerDataSource Members](sqlserverdatasource-members.md)
- [SQLServerDataSource Class](sqlserverdatasource-class.md)
