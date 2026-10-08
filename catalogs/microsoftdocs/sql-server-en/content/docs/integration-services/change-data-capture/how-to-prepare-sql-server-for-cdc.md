---
title: "How to Prepare SQL Server for CDC"
description: "How to Prepare SQL Server for CDC"
ms.date: 02/24/2026
ms.service: sql
ms.subservice: integration-services
ms.topic: how-to
---
# How to Prepare SQL Server for CDC


> **Important:**
> Change Data Capture for Oracle by Attunity is deprecated now. For details, refer to [the announcement](https://www.microsoft.com/sql-server/blog/2024/02/28/sql-server-integration-services-ssis-change-data-capture-attunity-feature-deprecations/).

The Oracle CDC service requires all target  SQL Server 
 instances to contain the MSXDBCDC database. You create this database using the Prepare SQL Server action in the CDC Service Configuration Console.This task is done one time only for each target  SQL Server 
 instance.

The following describes how to prepare a  SQL Server 
 database for Oracle Change Data Capture using the CDC Service Configuration Console. This process creates the MSXDBCDC database and defines the required tables, stored procedures, and other required artifacts.

Preparing the SQL Server for Oracle CDC is done by the Oracle CDC Service Administrator. For more information about the CDC Service Administrator role, see [User Roles](user-roles.md).

<a id="to-enable-sql-server-for-cdc"></a>

### Enable SQL Server for CDC

1. From the **Start** menu, select the **CDC Service Configuration for Oracle**.

1. From the left pane, select **Local CDC Services** then from the **Actions** pane, select **Prepare SQL Server**.

   You can also right-click **Local CDC Services** and select **Prepare SQL Server**.

1. Enter the required information in the Preparing SQL Server Instance for Oracle CDC dialog box. For information on how to enter the required information into this dialog box, see [Prepare SQL Server for CDC](the-oracle-cdc-service.md#prepare-sql-server-for-cdc).

   To Prepare the SQL Server instance for Oracle CDC, the login must have write permission to the MSXDBCDC database. Enter the credentials for a login that has write permission to the MSXDBCDC database, such as a member of the `sysasmin` role.

> **Note:**
> You can select **View Script** to view a read-only version of the setup script. A  SQL Server 
 system administrator can copy this script into the  SQL Server 
 Management Console to edit and execute it, if necessary.

## Related content

- [Prepare SQL Server for CDC](the-oracle-cdc-service.md#prepare-sql-server-for-cdc)
