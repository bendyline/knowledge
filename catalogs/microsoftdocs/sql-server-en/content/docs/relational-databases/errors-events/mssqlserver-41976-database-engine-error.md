---
title: "MSSQLSERVER_41976"
description: "MSSQLSERVER_41976"
author: djordje-jeremic
ms.author: djjeremi
ms.date: 12/06/2024
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "41976 (Database Engine error)"
---
# MSSQLSERVER_41976

 
**Applies to:**
 



  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
|  |
| Event ID | 41976 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Message Text | Connection with availability group '%.*ls' on the server with endpoint '%.*ls' cannot be established as it is not responding. Possible causes could be nonexistence of availability group or distributed availability group on the partner server, incorrectly specified names or configuration parameters. Please check the log file on the partner server for the exact error cause. |
  
## Explanation  

The connection with the availability group on SQL Server can't be established because the availability group isn't responding. 

This could be due to the following reasons: 

- The availability group doesn't exist on the primary replica. 
- The distributed availability group doesn't exist on the secondary replica. 
- Configuration parameters, such as instance names, have been specified incorrectly.

## User action  

Validate the names of the SQL Server instance, availability group, and distributed availability group are correct, and match the names visible on Azure SQL Managed Instance. Confirm scripts have been executed on the [correct replica](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-configure-how-to-scripts#create-an-availability-group-on-sql-server) using the correct parameters.


## Related content

- [Managed Instance link overview](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-feature-overview)
- [Prepare environment for the link](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-preparation)
- [Configure link with SSMS](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-configure-how-to-ssms)
- [Configure link with scripts](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-configure-how-to-scripts)
- [Troubleshoot issues with the link](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-troubleshoot-how-to)
