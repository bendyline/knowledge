---
title: "Create a report server database, Configuration Manager"
description: "SQL Server Reporting Services native mode uses two SQL Server relational databases to store report server metadata and objects. One database is used for primary storage, and the second one stores temporary data."
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---

# Create a report server database, Report Server Configuration Manager  

  **Applies to:**
 
 Reporting Services and later versions
 


For content related to previous versions of SQL Server Reporting Services (SSRS), see [What is SQL Server Reporting Services?](../create-deploy-and-manage-mobile-and-paginated-reports.md)


SQL Server  Reporting Services 
 native mode uses two  SQL Server 
 relational databases to store report server metadata and objects. One database is used for primary storage, and the second one stores temporary data. 

The databases are created together and bound by name. With a default  SQL Server 
 instance, the databases are named **reportserver** and **reportservertempdb**. Collectively, the two databases are called the **report server database** or **report server catalog**.

> **Important:**  
> Don't write applications that run queries against the report server database. The report server database isn't a public schema. The table structure might change from one release to the next. If you write an application that requires access to the report server database, always use the SQL Server  Reporting Services 
 APIs to access the report server database.  
>
> Execution log views are exceptions to this rule. For more information, see [Report Server ExecutionLog and the ExecutionLog3 View](../report-server/report-server-executionlog-and-the-executionlog3-view.md).  
  
## Ways to create the report server database

 ### Native mode
 You can create the native mode report server database in the following ways:  
  
- **Automatic**. Use the SQL Server setup wizard if you choose the default configuration option for installation. In the SQL Server Installation Wizard, this option is **Install and configure** on the **Report Server Installation Options** page. If you choose the **Install only** option, you must use SQL Server Report Server Configuration Manager to create the database. (Applies only to SQL Server Reporting Services 2016 and earlier)
  
- **Manual**. Use SQL Server  Reporting Services 
 Configuration Manager. Create the report server database manually if you use a remote  SQL Server Database Engine 
 to host the database. For more information, see [Create a Native Mode Report Server Database](ssrs-report-server-create-a-native-mode-report-server-database.md).  

## Database server version requirements

  SQL Server 
 is used to host the report server databases. The  SQL Server Database Engine 
 instance can be local or remote. The following supported versions of  SQL Server Database Engine 
 can host the report server databases:  

**Applies to: \>=sql-server-ver15**

- Azure SQL Managed Instance

- SQL Server 2025

- SQL Server 2022

- SQL Server 2019



**Applies to: \>=sql-server-2017**

- SQL Server 2017  


-  SQL Server 2016 (13.x) 
  
  
-  SQL Server 2014 (12.x)
  
  
-  SQL Server 2012 (11.x) 
  

> **Note:** 
> SQL on Linux isn't a supported environment to host a SQL Server Reporting Services database.

If you create the report server database on a remote computer, configure the connection to use a domain user account or a service account that has network access. If you use a remote  SQL Server 
 instance, consider which credentials the report server should use to connect to the instance. For more information, see [Configure a Report Server Database Connection (Report Server Configuration Manager)](configure-a-report-server-database-connection-ssrs-configuration-manager.md).  
  
> **Important:**  
> The report server and the  SQL Server 
 instance hosting the report server database can be in different domains. For internet deployment, it's common practice to use a server that's behind a firewall. 
>
> If you configure a report server for internet access, use  SQL Server 
 credentials to connect to the instance of  SQL Server 
 that's behind the firewall. Secure the connection by using IPSEC.  
  
## Edition requirements for a database server 

 When you create a report server database, not all editions of  SQL Server 
 can be used to host the database. For more information, see [Edition requirements for the report server database](../reporting-services-features-supported-by-the-editions-of-sql-server.md#edition-requirements-for-the-report-server-database) in [SQL Server Reporting Services features supported by its editions](../reporting-services-features-supported-by-the-editions-of-sql-server.md).  

## Related content

- [What is the Report Server configuration manager (native mode)?](reporting-services-configuration-manager-native-mode.md)
- [Reporting Services forum](https://learn.microsoft.com/answers/search.html?c=\&f=\&includeChildren=\&q=ssrs+OR+reporting+services\&redirect=search%2fsearch\&sort=relevance\&type=question+OR+idea+OR+kbentry+OR+answer+OR+topic+OR+user)
