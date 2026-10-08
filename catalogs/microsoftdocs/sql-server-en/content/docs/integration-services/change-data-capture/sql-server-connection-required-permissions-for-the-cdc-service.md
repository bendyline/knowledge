---
title: "SQL Server Connection Required Permissions for the CDC Service"
description: "SQL Server Connection Required Permissions for the CDC Service"
ms.date: 02/24/2026
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
---
# SQL Server Connection Required Permissions for the CDC Service


> **Important:**
> Change Data Capture for Oracle by Attunity is deprecated now. For details, refer to [the announcement](https://www.microsoft.com/sql-server/blog/2024/02/28/sql-server-integration-services-ssis-change-data-capture-attunity-feature-deprecations/).

The CDC Service Configuration Console requires connection information to  SQL Server 
 to perform their tasks. This topic describes the information that can be provided in the Connect to SQL Server dialog box for setting up the connection to  SQL Server 
.

The Connect to SQL Server dialog box opens when necessary, such as when the  SQL Server 
 connection information isn't available or when the information exists but the connection doesn't have the required permissions.

The following table describes the various tasks where a connection to  SQL Server 
 is required and the required permissions from the  SQL Server 
 login/user.

| Task | Minimum Permissions |
| --- | --- |
| Prepare  SQL Server |
 | Instance. | `dbcreator` fixed-server role |
| Create an Oracle CDC Service-SQL Server login for use by the Oracle CDC service. | `public` fixed-server role |
| Create an Oracle CDC Service-login to use for registering the new service in MSXDBCDC. | `db_datareader` and `db_datawriter` roles on MSXDBCDC |
| Edit an Oracle CDC Service-login to use for updating the registration of the service in MSXDBCDC. | `db_datareader` and `db_datawriter` roles on MSXDBCDC |
| Delete an Oracle CDC Service-login to use for updating the registration of the service in MSXDBCDC. | `db_datareader` and `db_datawriter` roles on MSXDBCDC |

## Related content

- [Connection to SQL Server](the-oracle-cdc-service.md#connection-to-sql-server)
- [Connection to SQL Server for Delete](the-oracle-cdc-service.md#connection-to-sql-server-for-delete)
