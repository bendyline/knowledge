---
title: "What's New in SQL Server Installation"
description: This article summarizes some changes to the SQL Server installation process, including SysPrep support and upgrading from SQL Server 2005.
author: rwestMSFT
ms.author: randolphwest
ms.date: 09/07/2025
ms.service: sql
ms.subservice: install
ms.topic: whats-new
ms.custom:
  - intro-whats-new
---
# What's new in SQL Server installation


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 on Windows


Installation is supported on x64 processors only. For more information, see [Hardware and software requirements for SQL Server 2022](hardware-and-software-requirements-for-installing-sql-server-2022.md).

Installation of  SQL Server Express 
 prompts you to specify the directory to save the extracted package. If no location is entered, the server defaults to the computer's system drive (usually `C:\`). The extracted files will remain after  SQL Server Express 
 installation is complete.

**SysPrep** is supported for all installations of  SQL Server 
. **SysPrep** now supports failover cluster installations. For more information, see [Considerations for installing SQL Server using SysPrep](../../database-engine/install-windows/considerations-for-installing-sql-server-using-sysprep.md) and [Install SQL Server with SysPrep](../../database-engine/install-windows/install-sql-server-using-sysprep.md).

You can upgrade from  SQL Server 2012 (11.x) 
,  SQL Server 2014 (12.x)
,  SQL Server 2016 (13.x) 
,  SQL Server 2017 (14.x) 
, and  SQL Server 2019 (15.x) 
. For more information, see [Supported version and edition upgrades (SQL Server 2022)](../../database-engine/install-windows/supported-version-and-edition-upgrades-2022.md).

## Related content

- [What's new in SQL Server 2022](../what-s-new-in-sql-server-2022.md)
- [Maximum capacity specifications for SQL Server](../maximum-capacity-specifications-for-sql-server.md)
- [Plan a SQL Server installation](planning-a-sql-server-installation.md)
- [Hardware and software requirements for SQL Server 2022](hardware-and-software-requirements-for-installing-sql-server-2022.md)
- [Installation guidance for SQL Server on Linux](../../linux/install-upgrade/setup.md)
