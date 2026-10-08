---
title: "SQL Server Native Client Configuration Properties (Flags Tab)"
description: Find out about the options on the Flags tab of the SQL Server Native Client Configuration Properties dialog box.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/15/2025
ms.service: sql
ms.subservice: tools-other
ms.topic: ui-reference
ms.collection:
  - data-tools
monikerRange: ">=sql-server-2017"
---
# SQL Server Native Client Configuration Properties (Flags tab)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


 SQL Server 
 clients on this machine, communicate with  SQL Server 
 servers using the protocols provided in the  SQL Server 
 Native Client library file. This page configures the client computer to request an encrypted connection using Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL). If an encrypted connection can't be established, the connection fails.

The sign-in process is always encrypted. The options in this article apply only to encrypting data.

For more information about how  SQL Server 
 encrypts communication and for instructions on how to configure the client to trust the root authority of the server certificate, see:

- [Transport Layer Security and digital certificates](../../database-engine/configure-windows/certificate-overview.md)
- [SQL Server and client encryption summary](../../database-engine/configure-windows/sql-server-and-client-encryption-summary.md)

> **Important:**  
> [SQL Server Native Client](../../relational-databases/native-client/sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](../../relational-databases/native-client/applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


## Options

#### Force protocol encryption

Request a connection using TLS.

#### Trust Server Certificate

When set to **No**, the client process attempts to validate the server certificate. The client and server must each have a certificate issued from a public certification authority. If the certificate isn't present on the client computer, or if the validation of the certificate fails, the connection is terminated.

When set to **Yes**, the client doesn't validate the server certificate, enabling the use of a self-signed certificate.

**Trust Server Certificate** is only available if **Force protocol encryption** is set to **Yes**.
