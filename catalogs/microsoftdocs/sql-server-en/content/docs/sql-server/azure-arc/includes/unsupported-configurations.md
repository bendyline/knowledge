---
author: MashaMSFT
ms.author: mathoma
ms.reviewer: randolphwest
ms.date: 04/23/2026
ms.topic: include
ms.custom:
  - ignite-2023
---

Azure Arc-enabled  SQL Server 
 doesn't currently support the following configurations:

- Windows Server versions earlier than Windows Server 2016
. These versions don't have the minimum required versions of TLS to securely authenticate to Azure.
-  SQL Server 
 running in containers.
-  SQL Server 
 editions: Business Intelligence.
- Private Link connections to the Azure Arc data processing service at the `<region>.arcdataservices.com` endpoint used for inventory and usage upload.
-  SQL Server 2008 (10.0.x) 
,  SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
, and older versions.
- Installing the Arc agent and  SQL Server 
 extension can't be done as part of sysprep image creation.
- Multiple instances of  SQL Server 
 installed on the same host operating system with the same instance name.
-  SQL Server 
 in Azure Virtual Machines.
- An Always On availability group where one or more replicas is on a failover cluster instance.
- SQL Server Reporting Services (SharePoint Mode).
- [DBCC CLONEDATABASE (Transact-SQL)](../../../t-sql/database-console-commands/dbcc-clonedatabase-transact-sql.md) throws error on the default installation of the Azure extension for SQL Server. To run the `DBCC CLONEDATABASE`, the Azure extension must be run in [least privilege mode](../configure-least-privilege.md).
- Database and availability group names with trailing whitespace (for example, `MyDb `) aren't supported on instances using binary collations (`BIN`/`BIN2`). These objects are skipped by the extension with a warning. On non-binary collations (the default), trailing whitespace is automatically trimmed, and the objects are managed normally.
- SQL Server instance names containing a `#` symbol aren't supported. For a complete list of naming rules and restrictions, review [naming rules and restrictions](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules).
