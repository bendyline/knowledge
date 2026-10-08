---
title: "sys.dm_os_server_diagnostics_log_configurations"
description: sys.dm_os_server_diagnostics_log_configurations
author: rwestMSFT
ms.author: randolphwest
ms.date: "02/27/2023"
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
ms.custom:
  - ignite-2025
f1_keywords:
  - "sys.dm_os_server_diagnostics_log_configurations"
  - "sys.dm_os_server_diagnostics_log_configurations_TSQL"
  - "dm_os_server_diagnostics_log_configurations"
  - "dm_os_server_diagnostics_log_configurations_TSQL"
helpviewer_keywords:
  - "dm_os_server_diagnostics_log_configurations"
  - "sys.dm_os_server_diagnostics_log_configurations"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# sys.dm_os_server_diagnostics_log_configurations

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Returns one row with the current configuration for the  SQL Server 
 failover cluster diagnostic log. These property settings determine whether the diagnostic logging is on or off, and the location, number, and size of the log files.  
  
| Column Name | Data Type | Description |
| --- | --- | --- |
| is_enabled | **bit** | Indicates if the logging is turned on or off.<br /><br /> 1 = Diagnostics logging is turned on<br /><br /> 0 = Diagnostics logging is turned off |
| max_size | **int** | Maximum size in megabytes to which each of the diagnostic logs can grow. The default is 100 MB. |
| max_files | **int** | Maximum number of diagnostic log files that can be stored on the computer before they are recycled for new diagnostic logs. |
| path | **nvarchar(260)** | Path indicating the location of the diagnostic logs. The default location is \<\MSSQL\Log> within the installation folder of the  SQL Server |
 | failover cluster instance. |
  
## Permissions  
 Requires VIEW SERVER STATE permissions on the SQL Server failover cluster instance.  
  
### Permissions for SQL Server 2022 and later

Requires VIEW SERVER PERFORMANCE STATE permission on the server.

## Examples  
 The following example uses sys.dm_os_server_diagnostics_log_configurations to return the property settings for the  SQL Server 
 failover diagnostic logs.  
  
```  
SELECT <list of columns>  
FROM sys.dm_os_server_diagnostics_log_configurations;  
```  
  
  Here's the result set. 
  
  
| IS_ENABLED | PATH | MAX_SIZE | MAX_FILES |
| --- | --- | --- | --- |
| 1 | \<C:\Program Files\Microsoft SQL Server\MSSQL13\MSSQL\Log> | 10 | 10 |
  
## Related content

- [View and Read Failover Cluster Instance Diagnostics Log](../../sql-server/failover-clusters/windows/view-and-read-failover-cluster-instance-diagnostics-log.md)
