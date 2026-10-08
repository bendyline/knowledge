---
title: "MSSQLSERVER_41977"
description: "MSSQLSERVER_41977"
author: djordje-jeremic
ms.author: djjeremi
ms.date: 12/06/2024
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "41977 (Database Engine error)"
---
# MSSQLSERVER_41977

 
**Applies to:**
 



  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
|  |
| Event ID | 41977 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Message Text | Connection with availability group '%.*ls' on the server with endpoint '%.*ls' is established, but there is no response from the target database. Possible causes could be errors with creating a database on the partner server, incorrectly specified names or configuration parameters. Please check the log file on the partner server for the exact error cause. |
  
## Explanation  

Although the connection with the availability has been established successfully, there's no response from the target database, and the link can't be created.

This could be due to the following reasons: 

- The database failed to create on the secondary replica. 
- Configuration parameters have been specified incorrectly.
  
## User Action  

Validate the names of the database, SQL Server instance, availability group, and distributed availability group are correct, and match the names visible on Azure SQL Managed Instance. Confirm scripts have been executed on the [correct replica](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-configure-how-to-scripts#create-an-availability-group-on-sql-server) using the correct parameters. 


## Related content

- [Managed Instance link overview](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-feature-overview)
- [Prepare environment for the link](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-preparation)
- [Configure link with SSMS](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-configure-how-to-ssms)
- [Configure link with scripts](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-configure-how-to-scripts)
- [Troubleshoot issues with the link](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-troubleshoot-how-to)
