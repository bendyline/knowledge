---
title: "sys.dm_server_services (Transact-SQL)"
description: sys.dm_server_services returns information about the services in the current SQL Server instance.
author: rwestMSFT
ms.author: randolphwest
ms.date: 09/12/2024
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
f1_keywords:
  - "dm_server_services"
  - "sys.dm_server_services"
  - "sys.dm_server_services_TSQL"
  - "dm_server_services_TSQL"
helpviewer_keywords:
  - "sys.dm_server_services dynamic management view"
dev_langs:
  - "TSQL"
---
# sys.dm_server_services (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Returns information about the  SQL Server 
, Full-Text, SQL Server Launchpad service ( SQL Server 2017 (14.x) 
 and later versions), and SQL Server Agent services in the current instance of  SQL Server 
. Use this dynamic management view to report status information about these services.

| Column name | Data type | Description |
| --- | --- | --- |
| `servicename` | **nvarchar(256)** | Name of the  SQL Server Database Engine |
| , Full-text, or SQL Server Agent service.<br /><br />Not nullable. |
| `startup_type` | **int** | Indicates the start mode of the service. The following are the possible values and their corresponding descriptions.<br /><br />0: Other<br />1: Other<br />2: Automatic<br />3: Manual<br />4: Disabled<br /><br />Nullable. |
| `startup_type_desc` | **nvarchar(256)** | Describes the start mode of the service. The following are the possible values and their corresponding descriptions.<br /><br />Other: Other (boot start)<br />Other: Other (system start)<br />Automatic: Auto start<br />Manual: Demand start<br />Disabled: Disabled<br /><br />Not nullable. |
| `status` | **int** | Indicates the current status of the service. The following are the possible values and their corresponding descriptions.<br /><br />1: Stopped<br />2: Other (start pending)<br />3: Other (stop pending)<br />4: Running<br />5: Other (continue pending)<br />6: Other (pause pending)<br />7: Paused<br /><br />Nullable. |
| `status_desc` | **nvarchar(256)** | Describes the current status of the service. The following are the possible values and their corresponding descriptions.<br /><br />Stopped: The service is stopped.<br />Other (start operation pending): The service is in the process of starting.<br />Other (stop operation pending): The service is in the process of stopping.<br />Running: The service is running.<br />Other (continue operations pending): The service is in a pending state.<br />Other (pause pending): The service is in the process of pausing.<br />Paused: The service is paused.<br /><br />Not nullable. |
| `process_id` | **int** | The process ID of the service.<br /><br />Nullable. |
| `last_startup_time` | **datetimeoffset(7)** | The date and time the service was last started. Nullable. |
| `service_account` | **nvarchar(256)** | The account authorized to control the service. This account can start or stop the service, or modify service properties.<br /><br />Not nullable. |
| `filename` | **nvarchar(256)** | The path and filename of the service executable.<br /><br />Not nullable. |
| `is_clustered` | **nvarchar(1)** | Indicates whether the service is installed as a resource of a clustered server.<br /><br />Not nullable. |
| `cluster_nodename` | **nvarchar(256)** | The name of the cluster node on which the service is installed. Nullable. |
| `instant_file_initialization_enabled` | **nvarchar(1)** | Specifies whether instant file initialization is enabled for the  SQL Server Database Engine |
 | service.<br /><br />Y = instant file initialization is enabled for the service.<br />N = instant file initialization is disabled for the service.<br /><br />Nullable.<br /><br />**Note:** This option doesn't apply to other services such as the SQL Server Agent.<br /><br />**Applies to:**  SQL Server 2012 (11.x) |
 | SP 4,  SQL Server 2014 (12.x) |
 | SP 3, and  SQL Server 2016 (13.x) |
 | SP 1 and later versions. |

## Permissions

For  SQL Server 2019 (15.x) 
 and earlier versions, you require `VIEW SERVER STATE` permission on the server.

For  SQL Server 2022 (16.x) 
 and later versions, you require `VIEW SERVER SECURITY STATE` permission on the server.

## Related content

- [sys.dm_server_registry (Transact-SQL)](sys-dm-server-registry-transact-sql.md)
