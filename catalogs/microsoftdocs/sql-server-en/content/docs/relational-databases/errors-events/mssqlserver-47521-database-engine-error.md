---
title: "MSSQLSERVER_47521"
description: "MSSQLSERVER_47521"
author: djordje-jeremic
ms.author: djjeremi
ms.date: 12/06/2024
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "47521 (Database Engine error)"
---
# MSSQLSERVER_47521

 
**Applies to:**
 



  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
|  |
| Event ID | 42109 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Message Text | Secondary replica could not be built as the replica request was not received from the primary, or not processed correctly. Check the state of the primary server and ensure that Availability Group on this server is not empty, and that it contains healthy databases. |
  
## Explanation  

The link couldn't be established because the replica request wasn't received from the primary, or it wasn't processed correctly. 

This could be due to the following reasons:
- Connection to the primary replica failed.
- The availability group is empty. 
- The database in the availability group isn't healthy.
  
## User Action  

Check the state of the primary server and ensure the availability group isn't empty, and that it contains healthy databases. Check [network connectivity](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-preparation#configure-network-connectivity). Retry the operation after the primary server has been verified successfully.

## Related content

- [Managed Instance link overview](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-feature-overview)
- [Prepare environment for the link](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-preparation)
- [Configure link with SSMS](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-configure-how-to-ssms)
- [Configure link with scripts](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-configure-how-to-scripts)
- [Troubleshoot issues with the link](https://learn.microsoft.com/azure/azure-sql/managed-instance/managed-instance-link-troubleshoot-how-to)
