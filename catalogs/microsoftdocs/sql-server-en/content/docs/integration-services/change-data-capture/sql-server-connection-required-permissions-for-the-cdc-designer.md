---
title: "SQL Server Connection Required Permissions for the CDC Designer"
description: "SQL Server Connection Required Permissions for the CDC Designer"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
---
# SQL Server Connection Required Permissions for the CDC Designer


> **Important:**
> Change Data Capture for Oracle by Attunity is deprecated now. For details, refer to [the announcement](https://www.microsoft.com/sql-server/blog/2024/02/28/sql-server-integration-services-ssis-change-data-capture-attunity-feature-deprecations/).

  The CDC Designer Console requires connection information to  SQL Server 
 to perform its tasks. This topic describes the information that can be provided in the **Connect to SQL Server** dialog box for setting up the connection to  SQL Server 
.  
  
 The **Connect to SQL Server** dialog box opens when necessary, such as when the  SQL Server 
 connection information is not available or when the information exists but the connection does not have the required permissions.  
  
 The following table describes the various tasks where a connection to  SQL Server 
 is required and the required permissions from the  SQL Server 
 login/user.  
  
| Task | Minimum Permissions |
| --- | --- |
| View the list of CDC Services and Instances using the associated  SQL Server |
 | instance. | `db_datareader` role on MSXDBCDC |
| Start/Stop CDC Instance(s) | `db_datareader` and `db_datawriter` roles on MSXDBCDC |
| View the CDC Instance status. | `db_owner` role on the CDC Instance database |
| Create a new Oracle CDC Instance database. | `dbcreator` fixed-server role |
| Create a new Oracle CDC Instance. | `db_datareader` role on MSXDBCDC<br /><br /> `db_owner` role on the CDC database that was created. |
| Get deployment scripts. | `db_datareader` and `db_datawriter` roles on MSXDBCDC<br /><br /> `db_owner` role on the relatedCDC database |
| Change configuration and add/remove capture instances. | `db_datareader` and `db_datawriter` roles on MSXDBCDC<br /><br /> `db_owner` role on the related CDC database |
  
## Related content

- [Access the CDC Designer Console](access-the-cdc-designer-console.md)
- [SQL Server Connection for Instance Creation](sql-server-connection-for-instance-creation.md)
