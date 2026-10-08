---
title: "setPacketSize Method (SQLServerDataSource)"
description: "setPacketSize Method (SQLServerDataSource)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerDataSource.setPacketSize"
apitype: "Assembly"
---
# setPacketSize Method (SQLServerDataSource)


  Sets the current network packet size used to communicate with  SQL Server 
, specified in bytes.  
  
## Syntax  
  
```  
  
public void setPacketSize(int packetSize)  
```  
  
#### Parameters  
 *packetSize*  
  
 An **int** value containing the network packet size.  
  
## Remarks  
 The acceptable range of values of this property is [-1 | 0 | 512..32767]. If this property is set to a value outside the acceptable range, an exception will occur.  
  
 The application might want to set the packetSize property while connecting with Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), encryption. The  Microsoft JDBC Driver for SQL Server 
 negotiates the packet size with the server. If the encrypt property is set to "**true**" and the negotiated packet size is larger than the Java Virtual Machine (JVM)'s default security provider's TLS record size, the driver will raise an error and terminate the connection.  
  
 In addition, the application might want to set the packetSize property without requesting the TLS encryption. In this case, if the server requires the client to support TLS encryption, the driver checks the JVM's default security provider's TLS record size. If the packetSize property is larger than the JVM's default security provider's TLS record size, the driver will raise an error and terminate the connection.  
  
 For more information about using TLS, see [Using encryption](../using-ssl-encryption.md).  
  
## Related content

- [SQLServerDataSource Members](sqlserverdatasource-members.md)
- [SQLServerDataSource Class](sqlserverdatasource-class.md)
