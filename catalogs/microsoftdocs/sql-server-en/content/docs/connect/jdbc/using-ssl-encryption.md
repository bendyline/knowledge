---
title: Using encryption
description: Learn how to establish secure communication channels using TLS encryption with your SQL database connections.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, davidengel, machavan, sunilbs
ms.date: 03/31/2021
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
---
# Using encryption



Transport Layer Security (TLS) encryption enables transmitting encrypted data across the network between an instance of  SQL Server 
 and a client application.  
  
Transport Layer Security (TLS) is a protocol for establishing a secure communication channel to prevent the interception of critical or sensitive information across the network and other Internet communications. TLS allows the client and the server to authenticate the identity of each other. After the participants are authenticated, TLS provides encrypted connections between them for secure message transmission.  
  
The  Microsoft JDBC Driver for SQL Server 
 provides an infrastructure to enable and disable the encryption on a particular connection based on the user specified connection properties and the server and client settings. The user can specify the certificate store location and password, a host name to be used to validate the certificate, and when to encrypt the communication channel.  
  
Enabling TLS encryption increases the security of data transmitted across networks between instances of  SQL Server 
 and applications. However, enabling encryption does slow performance.  
  
The articles in this section describe how the  Microsoft JDBC Driver for SQL Server 
 version supports TLS encryption, including new connection properties, and how you can configure the trust store at the client-side.  
  
> **Note:**  
> The **hostNameInCertificate** connection property is recommended to validate an TLS certificate.  

## In this section  

| Article | Description |
| --- | --- |
| [Understanding encryption support](understanding-ssl-support.md) | Describes how the  Microsoft JDBC Driver for SQL Server |
 | supports TLS encryption. |
| [Connecting with encryption](connecting-with-ssl-encryption.md) | Describes how to connect to a  SQL Server |
 | database by using the new TLS-specific connection properties. |
| [Configuring the client for encryption](configuring-the-client-for-ssl-encryption.md) | Describes how to configure the default trust store at the client-side and how to import a private certificate to the client computer's trust store. |

## Related content

- [Securing JDBC driver applications](securing-jdbc-driver-applications.md)
