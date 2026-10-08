---
title: "Setting Up Database Mirroring (SQL Server)"
description: Learn about prerequisites, recommendations, and steps for setting up database mirroring in SQL Server, including an overview of a database mirroring session.
author: MashaMSFT
ms.author: mathoma
ms.date: "05/17/2016"
ms.service: sql
ms.subservice: database-mirroring
ms.topic: how-to
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "database mirroring [SQL Server], deployment"
---
# Setting Up Database Mirroring (SQL Server)
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

> **Caution:**
> This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  For high availability, use  Always On availability groups 
 instead.  

> **Important:**
> Database Mirroring in SQL Server is a distinct technology from [Microsoft Fabric Database Mirroring](https://learn.microsoft.com/fabric/database/mirrored-database/overview). Mirroring to Fabric provides better analytical performance, the ability to unify your data estate with OneLake in Fabric, and open access to your data in Delta Parquet format.
>
> With Mirroring to Microsoft Fabric, you can continuously replicate your existing data estate directly into OneLake in Fabric, including data from SQL Server 2016+, Azure SQL Database, Azure SQL Managed Instance, Cosmos DB, Oracle, Snowflake, and more.
  
 This topic describes the prerequisites and recommendations for setting up database mirroring. For an introduction to database mirroring, see [Database Mirroring (SQL Server)](database-mirroring-sql-server.md).

> **Important:**  
> We recommend that you configure database mirroring during off-peak hours because configuration can affect performance.  
  
  
##  <a name="PrepareInstances"></a> Preparing a Server Instance to Host a Mirror Server  
 For each database mirroring session:  
  
1.  The principal server, mirror server, and witness, if any, must be hosted by separate server instances, which should be on separate host systems. Each of the server instances requires a database mirroring endpoint. If you need to create a database mirroring endpoint, ensure that it is accessible to the other server instances.  
  
     The form of authentication used for database mirroring by a server instance is a property of its database mirroring endpoint. Two types of transport security are available for database mirroring: Windows Authentication or certificate-based authentication. For more information, see [Transport Security for Database Mirroring and Always On Availability Groups (SQL Server)](transport-security-database-mirroring-always-on-availability.md).  
  
     The requirements for network access are specific to the form of authentication, as follows:  
  
    -   **If using Windows Authentication**  
  
         If server instances are running under different domain user accounts, each requires a login in the **master** database of the others. If the login does not exist, you must create it. For more information, see [Allow Network Access to a Database Mirroring Endpoint Using Windows Authentication (SQL Server)](database-mirroring-allow-network-access-windows-authentication.md).  
  
    -   **If using certificates**  
  
         To enable certificate authentication for database mirroring on a given server instance, the system administrator must configure each server instance to use certificates on both outbound and inbound connections. Outbound connections must be configured first. For more information, see [Use Certificates for a Database Mirroring Endpoint (Transact-SQL)](use-certificates-for-a-database-mirroring-endpoint-transact-sql.md).  
  
2.  Make sure that logins exist on the mirror server for all the database users. For more information, see [Set Up Login Accounts for Database Mirroring or Always On Availability Groups (SQL Server)](set-up-login-accounts-database-mirroring-always-on-availability.md).  
  
3.  On the server instance that will host the mirror database, set up the rest of the environment that is required for the mirrored database. For more information, see [Manage Metadata When Making a Database Available on Another Server Instance &#40;SQL Server&#41;](../../relational-databases/databases/manage-metadata-when-making-a-database-available-on-another-server.md).  
  
##  <a name="EstablishUsingWinAuthentication"></a> Overview: Establishing a Database Mirroring Session  
 The basic steps for establishing a mirroring session are as follows:  
  
1.  Create the mirror database by restoring the following backups, using RESTORE WITH NORECOVERY on every restore operation:  
  
    1.  Restore a recent full database backup of the principal database, after making sure that the principal database was already using the full recovery model when the backup was taken. The mirror database must have the same name as the principal database.  
  
    2.  If you have taken any differential backups of the database since the restored full backup, restore your most recent differential backup.  
  
    3.  Restore all the log backups done since the full or differential database backup.  
  
     For more information, see [Prepare a Mirror Database for Mirroring (SQL Server)](prepare-a-mirror-database-for-mirroring-sql-server.md).  
  
    > **Important:**  
    >  Complete the remaining setup steps as soon as you can after taking the backup of the principal database. Before you can start mirroring on the partners, you should create a current log backup on the original database and restore it to the future mirror database.  
  
2.  You can set up mirroring by using either  Transact-SQL  or the Database Mirroring Wizard. For more information, see one of the following:  
  
    -   [Establish a Database Mirroring Session Using Windows Authentication (Transact-SQL)](database-mirroring-establish-session-windows-authentication.md)  
  
    -   [Establish a Database Mirroring Session Using Windows Authentication (SQL Server Management Studio)](establish-database-mirroring-session-windows-authentication.md)  
  
3.  By default a session is set to full transaction safety (SAFETY is set to FULL), which starts the session in synchronous, high-safety mode without automatic failover. You can reconfigure the session to run in high-safety mode with automatic failover or in asynchronous, high-performance mode, as follows:  
  
    -   **High-safety mode with automatic failover**  
  
         If you want a high-safety mode session to support automatic failover, add a witness server instance.  
  
         **To add a witness**  
  
        -   [Add a Database Mirroring Witness Using Windows Authentication (Transact-SQL)](add-a-database-mirroring-witness-using-windows-authentication-transact-sql.md)  
  
        -   [Establish a Database Mirroring Session Using Windows Authentication (SQL Server Management Studio)](establish-database-mirroring-session-windows-authentication.md)  
  
        > **Note:**  
        >  The database owner can turn off the witness for a database at any time. Turning off the witness is equivalent to having no witness, and automatic failover cannot occur.  
  
    -   **High-performance mode**  
  
         Alternatively, if you do not want automatic failover and you prefer to emphasize performance over availability, turn off transaction safety. For more information, see [Change Transaction Safety in a Database Mirroring Session (Transact-SQL)](change-transaction-safety-in-a-database-mirroring-session-transact-sql.md).  
  
        > **Note:**  
        >  In high-performance mode, WITNESS needs to be set to OFF. For more information, see [Quorum: How a Witness Affects Database Availability (Database Mirroring)](quorum-how-a-witness-affects-database-availability-database-mirroring.md).  
  
> **Note:**  
>  For an example of using  Transact-SQL  to set up database mirroring using Microsoft Windows Authentication, see [Example: Setting Up Database Mirroring Using Windows Authentication (Transact-SQL)](example-setting-up-database-mirroring-using-windows-authentication-transact-sql.md).  
>   
>  For an example of using  Transact-SQL  to set up database mirroring using certificate-based security, see [Example: Setting Up Database Mirroring Using Certificates (Transact-SQL)](example-setting-up-database-mirroring-using-certificates-transact-sql.md).  
  
  
##  <a name="InThisSection"></a> In This Section  
 [Prepare a Mirror Database for Mirroring (SQL Server)](prepare-a-mirror-database-for-mirroring-sql-server.md)  
 Summarizes the steps for creating a mirror database or preparing a mirror database before resuming a suspended session. Also provides links to how-to topics.  
  
 [Specify a Server Network Address (Database Mirroring)](specify-a-server-network-address-database-mirroring.md)  
 Describes the syntax of a server network address, how the address identifies the database mirroring endpoint of the server instance, and how to find the fully-qualified domain name of a system.  
  
 [Establish a Database Mirroring Session Using Windows Authentication (SQL Server Management Studio)](establish-database-mirroring-session-windows-authentication.md)  
 Describes how to use the Configure Database Mirroring Security Wizard to start database mirroring on a database.  
  
 [Establish a Database Mirroring Session Using Windows Authentication (Transact-SQL)](database-mirroring-establish-session-windows-authentication.md)  
 Describes the  Transact-SQL  steps for setting up database mirroring.  
  
 [Example: Setting Up Database Mirroring Using Windows Authentication (Transact-SQL)](example-setting-up-database-mirroring-using-windows-authentication-transact-sql.md)  
 Contains an example of all the stages required to create a database mirroring session with a witness, using Windows Authentication.  
  
 [Example: Setting Up Database Mirroring Using Certificates (Transact-SQL)](example-setting-up-database-mirroring-using-certificates-transact-sql.md)  
 Contains an example of all the stages required to create a database mirroring session with a witness, using certificate-based authentication.  
  
 [Set Up Login Accounts for Database Mirroring or Always On Availability Groups (SQL Server)](set-up-login-accounts-database-mirroring-always-on-availability.md)  
 Describes creating a login for a remote server instance that is using a different account than the local server instance.  
  
##  <a name="RelatedTasks"></a> Related Tasks  
 **SQL Server Management Studio**  
  
-   [Start the Configuring Database Mirroring Security Wizard (SQL Server Management Studio)](start-the-configuring-database-mirroring-security-wizard.md)  
  
-   [Establish a Database Mirroring Session Using Windows Authentication (SQL Server Management Studio)](establish-database-mirroring-session-windows-authentication.md)  
  
 **Transact-SQL**  
  
-   [Allow Network Access to a Database Mirroring Endpoint Using Windows Authentication (SQL Server)](database-mirroring-allow-network-access-windows-authentication.md)  
  
-   [Allow a Database Mirroring Endpoint to Use Certificates for Outbound Connections (Transact-SQL)](database-mirroring-use-certificates-for-outbound-connections.md)  
  
-   [Allow a Database Mirroring Endpoint to Use Certificates for Inbound Connections (Transact-SQL)](database-mirroring-use-certificates-for-inbound-connections.md)  
  
-   [Create a Database Mirroring Endpoint for Windows Authentication (Transact-SQL)](create-a-database-mirroring-endpoint-for-windows-authentication-transact-sql.md)  
  
-   [Establish a Database Mirroring Session Using Windows Authentication (Transact-SQL)](database-mirroring-establish-session-windows-authentication.md)  
  
-   [Add a Database Mirroring Witness Using Windows Authentication (Transact-SQL)](add-a-database-mirroring-witness-using-windows-authentication-transact-sql.md)  
  
-   [Set Up a Mirror Database to Use the Trustworthy Property (Transact-SQL)](set-up-a-mirror-database-to-use-the-trustworthy-property-transact-sql.md)  
  
 **Transact-SQL/SQL Server Management Studio**  
  
-   [Upgrading Mirrored Instances](upgrading-mirrored-instances.md)  
  
-   [Prepare a Mirror Database for Mirroring (SQL Server)](prepare-a-mirror-database-for-mirroring-sql-server.md)  
  
-   [Troubleshoot Database Mirroring Configuration (SQL Server)](troubleshoot-database-mirroring-configuration-sql-server.md)  
  
  
## Related content

- [Database Mirroring (SQL Server)](database-mirroring-sql-server.md)
- [Database Mirroring: Interoperability and Coexistence (SQL Server)](database-mirroring-interoperability-and-coexistence-sql-server.md)
- [Transport security in availability groups and database mirroring](transport-security-database-mirroring-always-on-availability.md)
- [Specify a Server Network Address (Database Mirroring)](specify-a-server-network-address-database-mirroring.md)
