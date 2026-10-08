---
title: "Connecting to the Server"
description: "Learn about the different methods to connect to the database using the Microsoft Drivers for PHP for SQL Server."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sumitsar, jathakkar
ms.date: "03/26/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
---
# Connecting to the Server



The topics in this section describe the options and procedures for connecting to  SQL Server 
 with the Microsoft Drivers for PHP for SQL Server
.  

The Microsoft Drivers for PHP for SQL Server
 can connect to  SQL Server 
 by using Windows Authentication or by using SQL Server Authentication. By default, the Microsoft Drivers for PHP for SQL Server
 try to connect to the server by using Windows Authentication.  

## In This Section  

| Topic | Description |
| --- | --- |
| [How to: Connect Using Windows Authentication](how-to-connect-using-windows-authentication.md) | Describes how to establish a connection by using Windows Authentication. |
| [How to: Connect Using SQL Server Authentication](how-to-connect-using-sql-server-authentication.md) | Describes how to establish a connection by using SQL Server Authentication. |
| [How to: Connect Using Microsoft Entra authentication](azure-active-directory.md) | Describes how to set the authentication mode and connect using identities in Microsoft Entra ID ([formerly Azure Active Directory](https://learn.microsoft.com/entra/fundamentals/new-name)). |
| [How to: Connect on a Specified Port](how-to-connect-on-a-specified-port.md) | Describes how to connect to the server on a specific port. |
| [Connection Pooling](connection-pooling-microsoft-drivers-for-php-for-sql-server.md) | Provides information about connection pooling in the driver. |
| [How to: Disable Multiple Active Resultsets (MARS)](how-to-disable-multiple-active-resultsets-mars.md) | Describes how to disable the MARS feature when making a connection. |
| [Connection Options](connection-options.md) | Lists the options that are permitted in the associative array that contains connection attributes. |
| [Support for LocalDB](php-driver-for-sql-server-support-for-localdb.md) | Describes Microsoft Drivers for PHP for SQL Server |
 | support for the LocalDB feature, which was added in  SQL Server 2012 (11.x) |
| . |
| [Support for High Availability, Disaster Recovery](php-driver-for-sql-server-support-for-high-availability-disaster-recovery.md) | Discusses how your application can be configured to take advantage of the high-availability, disaster recovery features added in  SQL Server 2012 (11.x) |
| . |
| [Connecting to Microsoft Azure SQL Database](connecting-to-microsoft-azure-sql-database.md) | Discusses how to connect to an Azure SQL Database. |
| [Connection Resiliency](connection-resiliency.md) | Discusses the connection resiliency feature that reestablishes broken connections. |

## Related content

- [Programming Guide for the Microsoft Drivers for PHP for SQL Server](programming-guide-for-php-sql-driver.md)
- [Example Application (SQLSRV Driver)](example-application-sqlsrv-driver.md)
