---
title: "Default SQL Server Network Protocol Configuration"
description: View factors that affect whether network protocols are turned on or off during SQL Server installation. See how to configure protocols after installation.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: concept-article
helpviewer_keywords:
  - "protocols [SQL Server], default settings"
  - "default protocols, after install"
---
# Default SQL Server network protocol configuration


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

To enhance security,  SQL Server 
 disables network connectivity for some new installations. Network connectivity using TCP/IP isn't disabled if you're using the Enterprise, Standard, Evaluation, or Workgroup edition, or if a previous installation of  SQL Server 
 is present. For all installations, shared memory protocol is enabled to allow local connections to the server. The  SQL Server 
 Browser service might be stopped, depending on installation conditions and installation options.

Use the  SQL Server 
 Network Configuration node of  SQL Server 
 Configuration Manager to configure the network protocols after installation. Use the  SQL Server 
 Services node of  SQL Server 
 Configuration Manager to configure the  SQL Server 
 Browser service to start automatically. For more information, see [Enable or disable a server network protocol](enable-or-disable-a-server-network-protocol.md).

## Default configuration

The following table describes the configuration after installation.

| Edition | New installation vs. previous installation is present | Shared memory | TCP/IP | Named pipes |
| --- | --- | --- | --- | --- |
| Enterprise | New installation | Enabled | Enabled | Disabled for network connections. |
| Standard | New installation | Enabled | Enabled | Disabled for network connections. |
| Web | New installation | Enabled | Enabled | Disabled for network connections. |
| Developer | New installation | Enabled | Disabled | Disabled for network connections. |
| Evaluation | New installation | Enabled | Enabled | Disabled for network connections. |
| SQL Server Express | New installation | Enabled | Disabled | Disabled for network connections. |
| All editions | Previous installation is present but isn't being upgraded. | Same as new installation | Same as new installation | Same as new installation. |
| All editions | Upgrade | Enabled | Settings from the previous installation are preserved. | Settings from the previous installation are preserved. |

If the instance is running on a  SQL Server 
 failover cluster, it listens on those ports on each IP address selected for  SQL Server 
 during  SQL Server 
 setup.

> **Note:**  
> When you install  SQL Server 
 with command-prompt arguments, you can specify the protocols to enable by using the `TCPENABLED` and `NPENABLED` parameters. For more information, see [Install and configure SQL Server on Windows from the command prompt](../install-windows/install-sql-server-from-the-command-prompt.md).

## Create a connection string

See the following articles for samples of connection strings:

- [Creating a Valid Connection String Using Shared Memory Protocol](../../tools/configuration-manager/aliases-sql-server-configuration-manager.md)
- [Creating a Valid Connection String Using TCP IP](../../tools/configuration-manager/aliases-sql-server-configuration-manager.md)

## SQL Server Browser settings

The  SQL Server 
 Browser service can be configured to start automatically during setup. The default is to start automatically under the following conditions:

- When upgrading an installation.
- When installing side by side with another instance of  SQL Server 
.
- When installing on a cluster.
- When installing a named instance of the Database Engine including all instances of  SQL Server Express 
 edition.
- When installing a named instance of Analysis Services.

## Related content

- [Hardware and software requirements for SQL Server 2022](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2022.md)
- [Surface area configuration](../../relational-databases/security/surface-area-configuration.md)
