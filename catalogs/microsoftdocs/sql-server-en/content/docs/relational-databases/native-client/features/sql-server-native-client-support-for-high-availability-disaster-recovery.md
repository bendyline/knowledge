---
title: "High Availability, Recovery"
description: Learn about SQL Server Native Client support for Always On availability groups, which was added in SQL Server 2012.
author: markingmyname
ms.author: maghan
ms.date: "04/04/2018"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
---
# SQL Server Native Client Support for High Availability, Disaster Recovery

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:** 
> [SQL Server Native Client](../sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](../applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


  This topic discusses  SQL Server 
 Native Client support (added in  SQL Server 2012 (11.x) 
) for  Always On availability groups 
. For more information about  Always On availability groups 
, see [Availability Group Listeners, Client Connectivity, and Application Failover &#40;SQL Server&#41;](../../../database-engine/availability-groups/windows/listeners-client-connectivity-application-failover.md), [Creation and Configuration of Availability Groups &#40;SQL Server&#41;](../../../database-engine/availability-groups/windows/creation-and-configuration-of-availability-groups-sql-server.md), [Failover Clustering and Always On Availability Groups (SQL Server)](../../../database-engine/availability-groups/windows/failover-clustering-and-always-on-availability-groups-sql-server.md), and [Active Secondaries: Readable Secondary Replicas (Always On Availability Groups)](../../../database-engine/availability-groups/windows/active-secondaries-readable-secondary-replicas-always-on-availability-groups.md).  
  
 You can specify the availability group listener of a given availability group in the connection string. If a  SQL Server 
 Native Client application is connected to a database in an availability group that fails over, the original connection is broken, and the application must open a new connection to continue work after the failover.  
  
 If you are not connecting to an availability group listener, and if multiple IP addresses are associated with a hostname,  SQL Server 
 Native Client will iterate sequentially through all IP addresses associated with DNS entry. This can be time consuming if the first IP address returned by DNS server is not bound to any network interface card (NIC). When connecting to an availability group listener,  SQL Server 
 Native Client attempts to establish connections to all IP addresses in parallel and if a connection attempt succeeds, the driver will discard any pending connection attempts.  
  
> **Note:**  
>  Increasing connection timeout and implementing connection retry logic will increase the probability that an application will connect to an availability group. Also, because a connection can fail because of an availability group failover, you should implement connection retry logic, retrying a failed connection until it reconnects.  
  
## Connecting With MultiSubnetFailover  
 Always specify **MultiSubnetFailover=Yes** when connecting to a SQL Server 2012 availability group listener or SQL Server 2012 Failover Cluster Instance. **MultiSubnetFailover** enables faster failover for all Availability Groups and failover cluster instance in SQL Server 2012 and will significantly reduce failover time for single and multi-subnet Always On topologies. During a multi-subnet failover, the client will attempt connections in parallel. During a subnet failover,  SQL Server 
 Native Client will aggressively retry the TCP connection.  
  
 The **MultiSubnetFailover** connection property indicates that the application is being deployed in an availability group or Failover Cluster Instance, and that  SQL Server 
 Native Client will try to connect to the database on the primary  SQL Server 
 instance by trying to connect to all the IP addresses. When **MultiSubnetFailover=Yes** is specified for a connection, the client retries TCP connection attempts faster than the operating system's default TCP retransmit intervals. This enables faster reconnection after failover of either an Always On Availability Group or an Always On Failover Cluster Instance, and is applicable to both single- and multi-subnet Availability Groups and Failover Cluster Instances.  
  
 For more information about connection string keywords, see [Using Connection String Keywords with SQL Server Native Client](../applications/using-connection-string-keywords-with-sql-server-native-client.md).  
  
 Specifying **MultiSubnetFailover=Yes** when connecting to something other than an availability group listener or Failover Cluster Instance may result in a negative performance impact, and is not supported.  
  
 Use the following guidelines to connect to a server in an availability group or Failover Cluster Instance:  
  
-   Use the **MultiSubnetFailover** connection property when connecting to a single subnet or multi-subnet; it will improve performance for both.  
  
-   To connect to an availability group, specify the availability group listener of the availability group as the server in your connection string.  
  
-   Connecting to a  SQL Server 
 instance configured with more than 64 IP addresses will cause a connection failure.  
  
-   Behavior of an application that uses the **MultiSubnetFailover** connection property is not affected based on the type of authentication:  SQL Server 
 Authentication, Kerberos Authentication, or Windows Authentication.  
  
-   You can increase the value of **loginTimeout** to accommodate for failover time and reduce application connection retry attempts.  
  
-   Distributed transactions are not supported.  
  
 If read-only routing is not in effect, connecting to a secondary replica location in an availability group will fail in the following situations:  
  
1.  If the secondary replica location is not configured to accept connections.  
  
2.  If an application uses **ApplicationIntent=ReadWrite** (discussed below) and the secondary replica location is configured for read-only access.  
  
 A connection will fail if a primary replica is configured to reject read-only workloads and the connection string contains **ApplicationIntent=ReadOnly**.  
  
## Upgrading to Use Multi-Subnet Clusters from Database Mirroring  
 A connection error will occur if the **MultiSubnetFailover** and **Failover_Partner** connection keywords are present in the connection string. An error will also occur if **MultiSubnetFailover** is used and the  SQL Server 
 returns a failover partner response indicating it is part of a database mirroring pair.  
  
 If you upgrade a  SQL Server 
 Native Client application that currently uses database mirroring to a multi-subnet scenario, you should remove the **Failover_Partner** connection property and replace it with **MultiSubnetFailover** set to **Yes** and replace the server name in the connection string with an availability group listener. If a connection string uses **Failover_Partner** and **MultiSubnetFailover=Yes**, the driver will generate an error. However, if a connection string uses **Failover_Partner** and **MultiSubnetFailover=No** (or **ApplicationIntent=ReadWrite**), the application will use database mirroring.  
  
 The driver will return an error if database mirroring is used on the primary database in the availability group, and if **MultiSubnetFailover=Yes** is used in the connection string that connects to a primary database instead of to an availability group listener.  


## Specify application intent

You can specify the keyword `ApplicationIntent` in your connection string. The assignable values are `ReadWrite` (the default) or `ReadOnly`.

When you set `ApplicationIntent=ReadOnly`, the client requests a read workload when connecting. The server enforces the intent at connection time, and during a `USE` database statement.

The `ApplicationIntent` keyword doesn't work with legacy read-only databases.  

### Targets of ReadOnly

When a connection chooses `ReadOnly`, the connection is assigned to any of the following special configurations that might exist for the database:

- [Always On](../../../database-engine/availability-groups/windows/overview-of-always-on-availability-groups-sql-server.md). A database can allow or disallow read workloads on the targeted availability group database. This choice is controlled by using the `ALLOW_CONNECTIONS` clause of the `PRIMARY_ROLE` and `SECONDARY_ROLE` Transact-SQL statements.

- [Geo-replication](https://learn.microsoft.com/azure/sql-database/sql-database-geo-replication-overview)

- [Read scale-out](https://learn.microsoft.com/azure/sql-database/sql-database-read-scale-out)

If none of those special targets are available, the regular database is read from.

The `ApplicationIntent` keyword enables *read-only routing*.

## Read-only routing

Read-only routing is a feature that can ensure the availability of a read-only replica of a database. To enable read-only routing, all of the following apply:

- You must connect to an Always On availability group listener.

- The `ApplicationIntent` connection string keyword must be set to `ReadOnly`.

- The database administrator must configure the availability group to enable read-only routing.

Multiple connections that each use read-only routing might not all connect to the same read-only replica. Changes in database synchronization or changes in the server's routing configuration can result in client connections to different read-only replicas.

You can ensure that all read-only requests connect to the same read-only replica by *not* passing an availability group listener to the `Server` connection string keyword. Instead, specify the name of the read-only instance.

Read-only routing might take longer than connecting to the primary. This is because read-only routing first connects to the primary, and then looks for the best available readable secondary. Due to these multiple steps, you should increase your `login` timeout to at least 30 seconds.



## ODBC  
 Two ODBC connection string keywords were added to support  Always On availability groups 
 in  SQL Server 
 Native Client:  
  
-   **ApplicationIntent**  
  
-   **MultiSubnetFailover**  
  
 For more information about ODBC connection string keywords in  SQL Server 
 Native Client, see [Using Connection String Keywords with SQL Server Native Client](../applications/using-connection-string-keywords-with-sql-server-native-client.md).  
  
 The equivalent connection properties are:  
  
-   **SQL_COPT_SS_APPLICATION_INTENT**  
  
-   **SQL_COPT_SS_MULTISUBNET_FAILOVER**  
  
 For more information about ODBC connection properties in  SQL Server 
 Native Client, see [SQLSetConnectAttr](../../native-client-odbc-api/sqlsetconnectattr.md).  
  
 The functionality of the **ApplicationIntent** and **MultiSubnetFailover** keywords will be exposed in the ODBC Data Source Administrator for DSNs that use the  SQL Server 
 Native Client driver, beginning in  SQL Server 2012 (11.x) 
.  
  
 A  SQL Server 
 Native Client ODBC application can use one of three functions to make the connection:  
  
| Function | Description |
| --- | --- |
| [SQLBrowseConnect](../../native-client-odbc-api/sqlbrowseconnect.md) | The list of servers returned by **SQLBrowseConnect** will not include VNNs. You will only see a list of servers without any indication if the server is a standalone server, or a primary or secondary server in a Windows Server Failover Clustering (WSFC) cluster that contains two or more  SQL Server |
 | instances that have been enabled for  Always On availability groups |
| . If you connect to a server and get a failure, it may be because you have connected to a server, and the **ApplicationIntent** setting is not compatible with the server configuration.<br /><br /> Because **SQLBrowseConnect** does not recognize servers in a Windows Server Failover Clustering (WSFC) cluster that contains two or more  SQL Server |
 | instances that have been enabled for  Always On availability groups |
| , **SQLBrowseConnect** ignores the **MultiSubnetFailover** connection string keyword. |
| [SQLConnect](../../native-client-odbc-api/sqlconnect.md) | **SQLConnect** supports both **ApplicationIntent** and **MultiSubnetFailover** via a data source name (DSN) or connection properties. |
| [SQLDriverConnect](../../native-client-odbc-api/sqldriverconnect.md) | **SQLDriverConnect** supports **ApplicationIntent** and **MultiSubnetFailover** via connection string keywords, connection properties, or DSN. |
  
## OLE DB  
 OLE DB in the  SQL Server 
 Native Client does not support the **MultiSubnetFailover** keyword.  
  
 OLE DB in the  SQL Server 
 Native Client will support application intent. Application intent will behave the same for OLE DB applications as ODBC applications (see above).  
  
 One OLE DB connection string keyword added to support  Always On availability groups 
 in  SQL Server 
 Native Client:  
  
-   **Application Intent**  
  
 For more information about connection string keywords in  SQL Server 
 Native Client, see [Using Connection String Keywords with SQL Server Native Client](../applications/using-connection-string-keywords-with-sql-server-native-client.md).  
  
 The equivalent connection properties are:  
  
-   **SSPROP_INIT_APPLICATIONINTENT**  
  
-   **DBPROP_INIT_PROVIDERSTRING**  
  
 A  SQL Server 
 Native Client OLE DB application can use one of the methods to specify application intent:  
  
 **IDBInitialize::Initialize**  
 **IDBInitialize::Initialize** uses the previously configured set of properties to initialize the data source and create the data source object. Specify application intent as a provider property or as part of the extended properties string.  
  
 **IDataInitialize::GetDataSource**  
 **IDataInitialize::GetDataSource** takes an input connection string that can contain the **Application Intent** keyword.  
  
 **IDBProperties::GetProperties**  
 **IDBProperties::GetProperties** retrieves the value of the property that is currently set on the data source.  You can retrieve the **Application Intent** value through the DBPROP_INIT_PROVIDERSTRING property and SSPROP_INIT_APPLICATIONINTENT property.  
  
 **IDBProperties::SetProperties**  
 To set the **ApplicationIntent** property value, call **IDBProperties::SetProperties** passing in the **SSPROP_INIT_APPLICATIONINTENT** property with value "**ReadWrite**" or "**ReadOnly**" or **DBPROP_INIT_PROVIDERSTRING** property with value containing "**ApplicationIntent=ReadOnly**" or "**ApplicationIntent=ReadWrite**".  
  
 You can specify application intent in the Application Intent Properties field of the All tab in the **Data Link Properties** dialog box.  
  
 When implicit connections are established, the implicit connection will use the application intent setting of the parent connection. Similarly, multiple sessions created from the same data source will inherit the data source's application intent setting.  
  
## Related content

- [SQL Server Native Client Features](sql-server-native-client-features.md)
- [Using Connection String Keywords with SQL Server Native Client](../applications/using-connection-string-keywords-with-sql-server-native-client.md)
