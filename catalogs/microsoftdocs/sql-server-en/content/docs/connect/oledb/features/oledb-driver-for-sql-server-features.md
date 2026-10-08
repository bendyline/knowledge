---
title: "OLE DB Driver for SQL Server Features"
description: "Learn about features supported by the OLE DB Driver for SQL Server like database mirroring, asynchronous operation, Microsoft Entra ID, and others."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: "02/18/2022"
ms.service: sql
ms.subservice: connectivity
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "MDAC [SQL Server]"
  - "MSOLEDBSQL, about OLE DB Driver for SQL Server"
  - "data access [OLE DB Driver for SQL Server], features"
---
# OLE DB Driver for SQL Server Features

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






For a list of popular features that are supported and not supported in different OLE DB versions, see the [Driver feature matrix](../../driver-feature-matrix.md#table2).

  In addition to exposing features of the Windows (formerly Microsoft) Data Access Components (WDAC), OLE DB Driver for SQL Server also implements many other features to expose  SQL Server 
 functionality.  
  
## In This Section    
 [Using Database Mirroring](using-database-mirroring.md)  
 Discusses how OLE DB Driver for SQL Server supports the use of mirrored databases, which is the ability to keep a copy, or mirror, of a  SQL Server 
 database on a standby server.  
  
 [Performing Asynchronous Operations](performing-asynchronous-operations.md)  
 Discusses how OLE DB Driver for SQL Server supports asynchronous operations, which is the ability to return immediately without blocking on the calling thread.  

[Using Microsoft Entra ID (formerly Azure Active Directory)](using-azure-active-directory.md)  

Discusses new authentication methods introduced in OLE DB driver 18.2.1 that have more secure default settings and allow connecting to an instance of Azure SQL Database using a federated identity.

 [Using Multiple Active Result Sets (MARS)](using-multiple-active-result-sets-mars.md)  
 Discusses how OLE DB Driver for SQL Server supports multiple active result sets (MARS). MARS enables you to execute and receive multiple result sets using a single database connection  
  
 [Using XML Data Types](using-xml-data-types.md)  
 Discusses how OLE DB Driver for SQL Server supports the XML data type, which is a XML-based data type that can be used as a column type, variable type, parameter type, or function return type.  
  
 [Using User-Defined Types](using-user-defined-types.md)  
 Discusses how OLE DB Driver for SQL Server supports User-Defined Types (UDT), which extends the SQL type system by allowing you to store objects and custom data structures in a  SQL Server 
 database.  
  
 [Using Large Value Types](using-large-value-types.md)  
 Discusses how OLE DB Driver for SQL Server supports large value data types, which are large object data types (LOB).  
  
 [Changing Passwords Programmatically](changing-passwords-programmatically.md)  
 Discusses how OLE DB Driver for SQL Server supports the handling of expired passwords so that passwords can now be changed on the client without administrator involvement.  
  
 [Working with Snapshot Isolation](working-with-snapshot-isolation.md)  
 Discusses how OLE DB Driver for SQL Server supports the enhancement to row versioning that improves database performance by avoiding reader-writer blocking scenarios.  
  
 [Working with Query Notifications](working-with-query-notifications.md)  
 Discusses how OLE DB Driver for SQL Server supports consumer notification on rowset modification.  
  
 [Performing Bulk Copy Operations](performing-bulk-copy-operations.md)  
 Discusses how OLE DB Driver for SQL Server supports bulk copy operations that allow the transfer of large amounts of data into or out of a  SQL Server 
 table or view.  
  
 [Encryption and certificate validation](encryption-and-certificate-validation.md)  
 Discusses how to use OLE DB Driver for SQL Server to encrypt data sent to the server with or without validating the certificate.  
  
 [Table-Valued Parameters (OLE DB Driver for SQL Server)](table-valued-parameters-oledb-driver-for-sql-server.md)  
 Discusses OLE DB Driver for SQL Server support for the table-valued parameters.  
  
 [Large CLR User-Defined Types](large-clr-user-defined-types.md)  
 Discusses support for large common language runtime (CLR) user-defined types (UDTs).  
  
 [FILESTREAM Support](filestream-support.md)  
 Discusses OLE DB Driver for SQL Server support for the enhanced FILESTREAM feature.  
  
 [Service Principal Name (SPN) Support in Client Connections](service-principal-name-spn-support-in-client-connections.md)  
 Discusses how support for service principal names (SPNs) has been extended to enable mutual authentication across all protocols.  
  
 [Sparse Columns Support in OLE DB Driver for SQL Server](sparse-columns-support-in-oledb-driver-for-sql-server.md)  
 Discusses OLE DB Driver for SQL Server support for sparse columns.  
  
 [Date and Time Improvements](date-and-time-improvements.md)  
 Discusses support added to OLE DB Driver for SQL Server for the date and time data types.  
  
 [Metadata Discovery](metadata-discovery.md)  
 Discusses metadata discovery improvements that were made in  SQL Server 2012 (11.x) 
.  
  
 [UTF-16 Support in OLE DB Driver for SQL Server](utf-16-support-in-oledb-driver-for-sql-server.md)  
 Discusses a behavior change introduced in  SQL Server 2012 (11.x) 
. If you supply a fixed-length buffer when binding a column result or output parameter and if the **wchar** character written into the buffer before the terminating character is a high surrogate code point of a surrogate pair, and if the next **wchar** character is a low surrogate code point, OLE DB Driver for SQL Server will not add the high surrogate code point to the buffer.  
 
 [UTF-8 Support in OLE DB Driver for SQL Server](utf-8-support-in-oledb-driver-for-sql-server.md)  
 Discusses support for UTF-8 server encoding and configuration precautions users should take when working with UTF-8 encoded data.
  
 [OLE DB Driver for SQL Server Support for High Availability, Disaster Recovery](oledb-driver-for-sql-server-support-for-high-availability-disaster-recovery.md)  
 Discusses how your application can be configured to take advantage of the high-availability, disaster recovery features added in  SQL Server 2012 (11.x) 
.  
  
 [Accessing Diagnostic Information in the Extended Events Log](accessing-diagnostic-information-in-the-extended-events-log.md)  
 Discusses enhancements to OLE DB Driver for SQL Server and data tracing that gives you access to diagnostic information in the ring buffer and XEvents log.  
  
 [OLE DB Driver for SQL Server Support for LocalDB](oledb-driver-for-sql-server-support-for-localdb.md)  
 Discusses OLE DB Driver for SQL Server support for the LocalDB feature.  
  
 [Using Transparent Network IP Resolution](using-transparent-network-ip-resolution.md)  
 Discusses how OLE DB Driver for SQL Server supports transparent network IP resolution in a failover cluster.  
  
 [Idle Connection Resiliency](idle-connection-resiliency.md)  
 Discusses how OLE DB Driver for SQL Server supports idle connection resiliency.  
  
## Related content

- [Microsoft OLE DB Driver for SQL Server](../oledb-driver-for-sql-server.md)
- [OLE DB How-to articles](../ole-db-how-to/ole-db-how-to-topics.md)
- [Installing OLE DB Driver for SQL Server](../applications/installing-oledb-driver-for-sql-server.md)
