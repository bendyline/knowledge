---
title: "Change Data Capture Service for Oracle by Attunity System Architecture"
description: "Change Data Capture Service for Oracle by Attunity System Architecture"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
---
# Change Data Capture Service for Oracle by Attunity System Architecture


> **Important:**
> Change Data Capture for Oracle by Attunity is deprecated now. For details, refer to [the announcement](https://www.microsoft.com/sql-server/blog/2024/02/28/sql-server-integration-services-ssis-change-data-capture-attunity-feature-deprecations/).

  The CDC Service for Oracle captures changes made to selected tables in one or more source Oracle databases into  SQL Server 
 CDC databases located on a  SQL Server 
 instance. The following diagram shows the components that make up the CDC Service for Oracle.  
  
 Service Architecture  
  
 This figure illustrates four platforms that are used. In many cases, these platforms can overlap, however this diagram represents a standard use case. For example, it makes sense that the Oracle and  SQL Server 
 databases each run on a separate computer and are not shared with the Oracle CDC Service platform or the platform from which the CDC Service is designed. The platforms illustrated in this figure are:  
  
-   The Oracle CDC Service: This can be any supported Windows computer where the Oracle CDC Service is installed and run. This platform may also represent a cluster node in a Microsoft failover cluster (high availability configurations are discussed later in this document).  
  
-   The Oracle Database: This can be any computer where a supported version of the Oracle database runs. This includes any computer running Windows, Linux, or any other operating system supported by the version of the Oracle database installed. Note that the diagram shows this platform in plural because a single Oracle CDC Service can capture changes from multiple source Oracle databases.  
  
-   The  SQL Server 
: This can be any computer where the target  SQL Server 
 database (a supported SKU of  SQL Server 
) runs. An Oracle CDC Service supports one  SQL Server 
 target where it stores change tables and service configuration. The  SQL Server 
 Platform may also represent a clustered instance of  SQL Server 
 or a mirrored instance of  SQL Server 
 using the **Always On** feature.  
  
-   The Oracle CDC Designer: This can be any supported Windows computer that can access the source Oracle database and the target  SQL Server 
 database.  
  
 The following table describes the components that run on the four platforms described above.  
  
| Component/Description | Component consists of: |
| --- | --- |
| Oracle CDC Service: This is a Windows service where the change data capture activity takes place. | Oracle CDC Instance: A sub-process of the Oracle CDC Service that handles change data capture activity for a single source Oracle database (there is one Oracle CDC instance per source Oracle database). |
|  | Oracle Log Reader: Reads Oracle transaction logs using the Oracle Client. |
|  | Oracle Client: The Oracle Instant Client used for communication with Oracle. This is a prerequisite that should be obtained from Oracle and installed before installing the Oracle CDC Service. |
|  | SQL Server |
 | Change Writer: This writes committed changes made to the captured Oracle table to  SQL Server |
 | change tables. This component also maintains that capture state within the target  SQL Server |
 | database. |
|  | SQL Server |
 | ODBC Client: The Microsoft Native Client for  SQL Server |
| . This is a prerequisite component that should be obtained from Microsoft and installed before installing the Oracle CDC Service. |
| Oracle CDC Service Configuration: This is a Microsoft Management Console snap-in that creates the Windows service and sets up its configuration. | SQL Server |
 | Client: The SQL ADO.NET client that ships with version 4 of the .NET framework. |
| Oracle Database: A source Oracle database from which changes to select tables are captured. | Log Miner: An Oracle component through which the Oracle transaction logs are read. |
|  | Transaction Logs: The online and archived Oracle Redo Logs that are used by Oracle to ensure that the database can roll back transactions and recover from failures (in this case, the Oracle database must operate in archive-log mode). |
| SQL Server |
 | Instance: A  SQL Server |
 | instance where the CDC databases are hosted. This may be a clustered  SQL Server |
 | Instance (failover cluster) or a mirrored database (Always On). | The MSXDBCDC Database: A database where information about the CDC Services working with this  SQL Server |
 | Instance is kept. It also keeps information on the Oracle CDC Instances handled by each CDC Service. This database is created as part of the CDC Service creation process. |
|  | The CDC Databases:  SQL Server |
 | databases that store changes made to one of the source Oracle databases. The CDC Databases are enabled for  SQL Server |
 | CDC so they have the  SQL Server |
 | CDC tables and functions, making it easy to consume changes originating from Oracle. |
| Oracle CDC Designer: A Microsoft Management Console snap-in that helps create Oracle CDC Instances. Use this to select the tables and columns to be captured, provide Oracle connection information and manage the life cycle of CDC Instances. | SQL Server |
 | Client: The SQL ADO.NET client that ships with version 4 of the .NET framework. |
|  | Oracle Client: The Oracle Instant Client used for communication with Oracle. This is a prerequisite component that should be obtained from Oracle and installed before installing the Oracle CDC Service. |
  
 The Oracle CDC Service and its child Oracle CDC Instances can communicate only with the source Oracle database(s) and the target  SQL Server 
 instance as clients. They do not actively listen on any network and other protocols. The Oracle CDC Service monitors the CDC databases for configuration changes and updates its operation based on the updated configuration.
