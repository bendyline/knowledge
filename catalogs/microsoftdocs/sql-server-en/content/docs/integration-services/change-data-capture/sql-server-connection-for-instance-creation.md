---
title: "SQL Server Connection for Instance Creation"
description: "SQL Server Connection for Instance Creation"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: how-to
---
# SQL Server Connection for Instance Creation


> **Important:**
> Change Data Capture for Oracle by Attunity is deprecated now. For details, refer to [the announcement](https://www.microsoft.com/sql-server/blog/2024/02/28/sql-server-integration-services-ssis-change-data-capture-attunity-feature-deprecations/).

  One of the first steps when creating an Oracle CDC Instance is the creation of a CDC database on the target  SQL Server 
 instance. This CDC database is enabled for SQL Server CDC and this enablement requires a login that is a member of the `sysadmin` fixed-server role.  
  
 When a user that starts the **Create an Oracle CDC Instance** wizard is not a member of the `sysadmin` fixed-server role, the **Connect to SQL Server** dialog box opens and requests the credentials for a member of the `sysadmin` role to carry out the Enable the database for SQL Server CDC task. When the CDC database is created, the `sysadmin` login is discarded and work resumes with the original  SQL Server 
 login used when the Oracle Designer Console was entered.  
  
## Task List  
 Enter the following information in the **Connect to SQL Server** dialog box.  
  
 **Server Name**  
 Type the name of the server where the  SQL Server 
 is located.  
  
 **Authentication**  
 Select one of the following:  
  
-   **Windows Authentication**  
  
-   **SQL Server Authentication**: If you select this option, you must type the **Login** and **Password** for the user in the  SQL Server 
 you are connecting to.  
  
 The login must have a database role that allows access to the MSXCDCDB database. It is recommended that the login also have access to any additional databases being used or the user will not be able to view the data in those databases.  
  
 **Options**  
 Click the arrow to view available options to be configured. You can choose to leave these options with their default value. The available options are:  
  
-   **Connection Timeout**: Type the time (in seconds) that the CDC Service for Oracle waits for a connection to the  SQL Server 
 before timing out. The default value is **15**.  
  
-   **Execution Timeout**: Type the time (in seconds) that the Oracle CDC Windows Service waits for a command to execute before timing out. The default value is **30**.  
  
-   **Encrypt Connection**: Select **Encrypt Connection** for communication between the Oracle CDC Service and the target  SQL Server 
 instance using an encrypted connection.  
  
-   **Advanced**: Click **Advanced** and type any additional connection properties into the Advanced Connection Properties dialog box, if necessary.  
  
     For information about the Advanced Connection Properties dialog box, see [Advanced Connection Properties](advanced-connection-properties.md).  
  
## Related content

- [Create the SQL Server Change Database](create-the-sql-server-change-database.md)
- [SQL Server Connection Required Permissions for the CDC Designer](sql-server-connection-required-permissions-for-the-cdc-designer.md)
