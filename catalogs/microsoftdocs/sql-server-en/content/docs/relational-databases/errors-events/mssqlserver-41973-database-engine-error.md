---
title: "MSSQLSERVER_41973"
description: "MSSQLSERVER_41973"
author: djordje-jeremic
ms.author: djjeremi
ms.date: 12/06/2024
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "41973 (Database Engine error)"
---
# MSSQLSERVER_41973

 
**Applies to:**
 



  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
|  |
| Event ID | 41973 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Message Text | The link cannot be established because the endpoint certificate from SQL Server has not been imported to Azure SQL Managed Instance. Please import the endpoint certificate from SQL Server to Managed Instance, and retry the link creation again. Please see online documentation for Managed Instance link for more information. |
  
## Explanation  

The endpoint certificate from SQL Server hasn't been imported to Azure SQL Managed Instance, so the link can't be established. 
  
## User action  

[Import the SQL Server certificate into Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-configure-how-to-scripts#create-a-certificate-on-sql-server-and-import-its-public-key-to-sql-managed-instance) and then try creating the link again.

## Related content

- [Managed Instance link overview](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-feature-overview)
- [Prepare environment for the link](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-preparation)
- [Configure link with SSMS](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-configure-how-to-ssms)
- [Configure link with scripts](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-configure-how-to-scripts)
- [Troubleshoot issues with the link](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-troubleshoot-how-to)
