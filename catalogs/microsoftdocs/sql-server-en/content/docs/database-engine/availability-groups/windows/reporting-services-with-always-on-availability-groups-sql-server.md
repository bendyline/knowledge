---
title: "Reporting Services with availability groups"
description: Learn about configuring Reporting Services to work with Always On availability groups in SQL Server. Supported functionality differs for different scenarios.
author: MashaMSFT
ms.author: mathoma
ms.date: 09/27/2023
ms.service: sql
ms.subservice: availability-groups
ms.topic: concept-article
helpviewer_keywords:
  - "Reporting Services, AlwaysOn Availability Groups"
  - "Reporting Services, Always On Availability Groups"
  - "Availability Groups [SQL Server], interoperability"
---
# Reporting Services with Always On Availability Groups (SQL Server)


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article contains information about configuring  Reporting Services 
 to work with  Always On availability groups 
 (AG) in  SQL Server 
. The three scenarios for using  Reporting Services 
 and  Always On availability groups 
 are databases for report data sources, report server databases, and report design. The supported functionality and required configuration is different for the three scenarios.

A key benefit of using  Always On availability groups 
 with  Reporting Services 
 data sources is to use readable secondary replicas as a reporting data source while, at the same time, the secondary replicas are providing a failover for a primary database.

For general information on  Always On availability groups 
, see [Always On FAQ for SQL Server 2012 (../../../sql-server/index.yml)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/index.yml).

## <a id="bkmk_requirements"></a> Requirements for using Reporting Services and Always On Availability Groups

 SQL Server 
  Reporting Services 
 and Power BI Report Server uses the .NET framework 4.0 and supports  Always On availability groups 
 connection string properties for use with data sources.

To use  Always On availability groups 
 with   Reporting Services 
 2014, and earlier, you need to download and install a hotfix for .NET 3.5 SP1. The hotfix adds support to SQL Client for AG features and support of the connection string properties **ApplicationIntent** and **MultiSubnetFailover**. If the Hotfix isn't installed on each computer that hosts a report server, then users attempting to preview reports see an error message similar to the following, and the error message will be written to the report server trace log:

> **Error message:** "Keyword not supported 'applicationintent'"

The message occurs when you include one of the  Always On availability groups 
 properties in the  Reporting Services 
 connection string, but the server doesn't recognize the property. The noted error message is seen when you select the 'Test Connection' button in  Reporting Services 
 user interfaces and when you preview the report if remote errors are enabled on the report servers.

For more information on the required hotfix, see [KB 2654347A hotfix introduces support for the Always On features from SQL Server 2012 to the .NET Framework 3.5 SP1](https://go.microsoft.com/fwlink/?LinkId=242896).

For information on other  Always On availability groups 
 requirements, see [Prerequisites, Restrictions, and Recommendations for Always On Availability Groups (SQL Server)](prereqs-restrictions-recommendations-always-on-availability.md).

> **Note:**  
>  Reporting Services 
 configuration files such as **RSreportserver.config** are not supported as part of  Always On availability groups 
 functionality. If you manually make changes to a configuration file on one of the report servers, you will need to manually update the replicas.

## <a id="bkmk_reportdatasources"></a> Report Data Sources and Availability Groups

The behavior of  Reporting Services 
 data sources based on  Always On availability groups 
 can vary depending on how your administrator has configured the AG environment.

To utilize  Always On availability groups 
 for report data sources you need to configure the report data source connection string is to use the availability group *Listener DNS name*. Supported data sources are the following:

- ODBC data source using SQL Native Client.

- SQL Client, with the .NET hotfix applied to the report server.

The connection string can also contain new Always On connection properties that configure the report query requests to use secondary replica for read-only reporting. Use of secondary replica for reporting requests reduces the load on a read-write primary replica. The following illustration is an example of a three replica AG configuration where the  Reporting Services 
 data source connection strings have been configured with ApplicationIntent=ReadOnly. In this example, the report query requests are sent to a secondary replica and not the primary replica.

The following is an example connection string, where the [AvailabilityGroupListenerName] is the **Listener DNS Name** that was configured when replicas were created:

`Data Source=[AvailabilityGroupListenerName];Initial Catalog = AdventureWorks2022; ApplicationIntent=ReadOnly`

The **Test Connection** button in  Reporting Services 
 user interfaces validates if a connection can be established but it will not validate AG configuration. For example if you include ApplicationIntent in a connection string to a server that isn't part of AG, the extra parameter is ignored and the **Test Connection** button will only validate a connection can be established to the specified server.

Depending on how your reports are created and published will determine where you edit the connection string:

- **Native mode:** Use the  web portal 
 for shared data sources and reports that are already published to a native mode report server.

- **SharePoint Mode:** Use SharePoint configuration pages within the document libraries for reports that are already published to a SharePoint server.

- **Report Design:** Report Builder
 or  SQL Server Data Tools (SSDT) 
 when you're creating new reports. See the 'Report Design' section in this article or more information.

**Additional Resources:**

- [Manage Report Data Sources](../../../reporting-services/report-data/manage-report-data-sources.md)

- For more information on the available connection string properties, see [Using Connection String Keywords with SQL Server Native Client](../../../relational-databases/native-client/applications/using-connection-string-keywords-with-sql-server-native-client.md).

- For more information on availability group listeners, see [Create or Configure an Availability Group Listener (SQL Server)](create-or-configure-an-availability-group-listener-sql-server.md).

**Considerations:** Secondary replicas will typically experience a delay in receiving data changes from the primary replica. The following factors can affect the update latency between the primary and secondary replicas:

- The number of secondary replicas. The delay increases with each secondary replica added to the configuration.

- Geographic location and distance between the primary and secondary replicas. For example the delay is typically larger if the secondary replicas are in a different data center than if they were in the same building as the primary replica.

- Configuration of the availability mode for each replica. The availability mode determines whether the primary replica waits to commit transactions on a database until a secondary replica has written the transaction to disk. For more information, see the 'Availability Modes' section of [Overview of Always On Availability Groups (SQL Server)](overview-of-always-on-availability-groups-sql-server.md).

When using a read-only secondary as a  Reporting Services 
 data source, it's important to ensure that data update latency meets the needs of the report users.

## <a id="bkmk_reportdesign"></a> Report Design and Availability Groups

When designing reports in Report Builder
 or a report project in  SQL Server Data Tools (SSDT) 
, a user can configure a report data source connection string to contain new connection properties provided by  Always On availability groups 
. Support for the new connection properties depends on where a user previews the report.

- **Local preview:** Report Builder
 and  SQL Server Data Tools (SSDT) 
 use the .NET framework 4.0 and support  Always On availability groups 
 connection string properties.

- **Remote or server mode preview:** If after publishing reports to the report server or using preview in Report Builder
, you see an error similar to the following, it's an indication you're previewing reports against the report server and the .NET Framework 3.5 SP1 Hotfix for  Always On availability groups 
 hasn't been installed on the report server.

> **Error message:** "Keyword not supported 'applicationintent'"

## <a id="bkmk_reportserverdatabases"></a> Report Server Databases and Availability Groups

Reporting Services and Power BI Report Server offers limited support for using  Always On availability groups 
 with report server databases. The report server databases can be configured in AG to be part of a replica; however  Reporting Services 
 won't automatically use a different replica for the report server databases when a failover occurs. The use of MultiSubnetFailover, with the report server databases, isn't supported.

Manual actions or custom automation scripts need to be used to complete the failover and recovery. Until these actions are completed, some features of the report server may not work correctly after the  Always On availability groups 
 failover.

> **Note:**  
> When planning failover and disaster recovery for the report server databases, it is advised you always backup a copy of the report server encryption key.

### <a id="bkmk_differences_in_server_mode"></a> Differences between SharePoint Native Mode

This section summarizes the differences between how SharePoint mode and Native mode report servers interact with  Always On availability groups 
.

A SharePoint report server creates **3** databases for each  Reporting Services 
 service application you create. The connection to the report server databases in SharePoint mode is configured in SharePoint Central Administration when you create the service application. The default names of the databases include a GUID that is associated with the service application. The following are example database names, for a SharePoint mode report server:

- ReportingService_85c08ac3c8e64d3cb400ad06ed5da5d6

- ReportingService_85c08ac3c8e64d3cb400ad06ed5da5d6TempDB

- ReportingService_85c08ac3c8e64d3cb400ad06ed5da5d6_Alerting

Native mode report servers use **2** databases. The following are example database names, for a native mode report server:

- ReportServer

- ReportServerTempDB

> **Note:**  
> When you configure Reporting Services to work with an availability group (AG), the recovery model for the `ReportServerTemp` database changes to Full. As a result, there are scenarios where the `ReportServerTemp` database keeps growing in size. It is a best practice to remove the `ReportServerTemp` database from your AG configuration, and have the recovery model set to Simple. The `ReportServerTemp` database only stores temporary data. Removing it from the AG doesn't affect Reporting Services.

Native mode doesn't support or use the Alerting databases and related features. You configure native mode report servers in the  Reporting Services 
 Configuration Manager. For SharePoint mode, you configure the service application database name to be the name of the "client access point" you created as part of the SharePoint configuration. For more information on configuring SharePoint with  Always On availability groups 
, see [Configure and manage SQL Server availability groups for SharePoint Server (/previous-versions/office/sharepoint-server-2010/hh913923(v=office.14))](https://learn.microsoft.com/previous-versions/office/sharepoint-server-2010/hh913923\(v=office.14\)).

> **Note:**  
> SharePoint mode report servers use a synchronization process between the  Reporting Services 
 service application databases and the SharePoint content databases. It is important to maintain the report server databases and content databases together. You should consider configuring them in the same availability groups so they failover and recover as a set. Consider the following scenario:  
>  
> -   You restore or failover to a copy of the content database that has not received the same recent updates that the report server database has received.  
> -   The  Reporting Services 
 synchronization process will detect differences between the list of items in the content database and the report server databases.  
> -   The synchronization process will delete or update items in the content database.

### <a id="bkmk_prepare_databases"></a> Prepare Report Server Databases for Availability Groups

The following are the basic steps of preparing and adding the report server databases to an  Always On availability groups 
:

- Create your Availability Group and configure a *Listener DNS name*.

- **Primary Replica:** Configure the report server databases to be part of a single availability group and create a primary replica that includes all of the report server databases.

- **Secondary Replicas:** Create one or more secondary replicas. The common approach to copying the databases from the primary replica to the secondary replica(s) is to restore the databases to each secondary replica using 'RESTORE WITH NORECOVERY'. For more information on creating secondary replicas and verifying data synchronization is working, see [Start Data Movement on an Always On Secondary Database (SQL Server)](start-data-movement-on-an-always-on-secondary-database-sql-server.md).

- **Report Server Credentials:** You need to create the appropriate report server credentials on the secondary replicas that you created on the primary. The exact steps depend on what type of authentication you're using in your  Reporting Services 
 environment; Window  Reporting Services 
 service account, Windows user account, or SQL Server authentication. For more information, see [Configure a Report Server Database Connection  (SSRS Configuration Manager)](../../../reporting-services/install-windows/configure-a-report-server-database-connection-ssrs-configuration-manager.md)

- Update the database connection to use the Listener DNS Name. for native mode report servers, change the **Report Server Database Name** in  Reporting Services 
 configuration manager. For SharePoint mode, change the **Database server name** for the  Reporting Services 
 service application(s).

### <a id="bkmk_steps_to_complete_failover"></a> Steps to complete disaster recovery of Report Server Databases

The following steps need to be completed after a  Always On availability groups 
 failover to a secondary replica:

1. Stop the instance of the SQL Agent service that was being used by the primary database engine hosting the  Reporting Services 
 databases.

1. Start SQL Agent service on the computer that is the new primary replica.

1. Stop the Report Server service.

     If the report server is in native mode, stop the report server Windows server using  Reporting Services 
 configuration manager.

     If the report server is configured for SharePoint mode, stop the  Reporting Services 
 shared service in SharePoint Central Administration.

1. Start the report server service or  Reporting Services 
 SharePoint service.

1. Verify that reports can run against the new primary replica.

### <a id="bkmk_failover_behavior"></a> Report Server Behavior When a Failover Occurs

When report server databases failover and you have updated the report server environment to use the new primary replica, there are some operational issues that result from the failover and recovery process. The impact of these issues varies depending on the  Reporting Services 
 load at the time of failover as well as the length of time it takes for  Always On availability groups 
 to fail over to a secondary replica and for the report server administrator to update the reporting environment to use the new primary replica.

- The execution of background processing may occur more than once due to retry logic and the inability of the report server to mark scheduled work as completed during the failover period.

- The execution of background processing that would have normally been triggered to run during the period of the failover won't occur because SQL Server Agent won't be able to write data into the report server database and this data won't be synchronized to the new primary replica.

- After the database failover completes and after the report server service is restarted, SQL Server Agent jobs will be re-created automatically. Until the SQL agent jobs are recreated, any background executions associated with SQL Server Agent jobs won't be processed. This includes  Reporting Services 
 subscriptions, schedules, and snapshots.

## Related content

- [SQL Server Native Client Support for High Availability, Disaster Recovery](../../../relational-databases/native-client/features/sql-server-native-client-support-for-high-availability-disaster-recovery.md)
- [What is an Always On availability group?](overview-of-always-on-availability-groups-sql-server.md)
- [Getting Started with Always On Availability Groups](getting-started-with-always-on-availability-groups-sql-server.md)
- [Using Connection String Keywords with SQL Server Native Client](../../../relational-databases/native-client/applications/using-connection-string-keywords-with-sql-server-native-client.md)
- [Types of client connections to replicas within an Always On availability group](about-client-connection-access-to-availability-replicas-sql-server.md)
