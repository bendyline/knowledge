---
title: "Install Client Tools: Failover Cluster"
description: Learn how to install client tools, such as SQL Server Management Studio, on a SQL Server failover instance.
author: MashaMSFT
ms.author: mathoma
ms.date: "12/13/2019"
ms.service: sql
ms.subservice: failover-cluster-instance
ms.topic: how-to
ms.custom: intro-installation
---
# Install Client Tools on a SQL Server Failover Cluster

**Applies to:**
 

](../../sql-docs-navigation-guide.md#applies-to)
 
  Client tools such as  SQL Server Management Studio 
 are shared features common across all instances on the same machine. They are backward compatible, with supported  SQL Server 
 versions that can be installed side by side. Only one version of the client tool exists on a node at a time.  
  
 If the  SQL Server 
 client tools are installed during setup on first node of the  SQL Server 
 cluster, they are automatically added to any nodes that may be added later to the instance of  SQL Server 
 using Add Node.  
  
> **Important:**  
>   SQL Server 
 Books Online is not automatically added to the additional nodes added to the  SQL Server 
 cluster using Add Node.  SQL Server 
 Books Online can be installed manually on the nodes that you wish to have a local copy of  SQL Server 
 Books Online.  
  
 If you do not install the  SQL Server 
 client tools during the initial installation of the  SQL Server 
 cluster, you can install it later as described in the procedures below.  
  
## Installation procedures  
  
#### Installing  SQL Server 
 Client Tools Using the Setup User Interface  
  
1.  Insert the  SQL Server 
 installation media. From the root installation folder, double-click Setup.exe. To install from the network share, locate the root folder on the share, and then double-click Setup.exe.  
  
2.  On the **Installation** page, click **New  SQL Server 
 stand-alone installation or add Features to an existing installation**. Do not click **New  SQL Server 
 failover cluster installation**.  
  
3.  The system configuration checker verifies the system state of your computer before Setup will continue.  
  
4.  On the **Installation Type** page, click **Perform a new installation of  SQL Server 
**.  
  
5.  On the **Feature Selection** page, select the tools that you want to install and follow through the rest of the steps of the Setup process.  
  
#### Installing  SQL Server 
 client tools at the command prompt  
  
1.  To install  SQL Server 
 client tools and  SQL Server 
 Books Online, run the following command: Setup.exe/q/Action=Install /Features=Tools  
  
2.  To install only the basic  SQL Server 
 Management tools run the following command: Setup.exe/q/Action=Install Features=SSMS. This will install  Management Studio
 support for  SQL Server Database Engine 
,  SQL Server Express 
, sqlcmd utility, and the  SQL Server 
 PowerShell provider.  
  
3.  To install the complete  SQL Server 
 Management tools, run the following command: Setup.exe/q/Action=Install /Features=ADV_SSMS. For more information about parameter values for the features, see [Install SQL Server 2016 from the Command Prompt](../../../database-engine/install-windows/install-sql-server-from-the-command-prompt.md).  
  
### Uninstalling  SQL Server 
 Client Tools  
 They appear in Add or Remove programs in Control Panel as ** Microsoft 
  SQL Server 
**, and can be removed from there. When you use Remove Node to uninstall an instance of  SQL Server 
 from the failover cluster, the client components are not uninstalled at the same time.  
  
## Related content

- [View and read SQL Server Setup log files](../../../database-engine/install-windows/view-and-read-sql-server-setup-log-files.md)
