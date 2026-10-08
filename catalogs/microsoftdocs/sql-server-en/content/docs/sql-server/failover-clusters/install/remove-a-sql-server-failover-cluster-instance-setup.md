---
title: "Remove Failover Cluster Instance"
description: Use this procedure to uninstall an Always On failover cluster instance. This article includes important considerations before you proceed.
author: MashaMSFT
ms.author: mathoma
ms.date: "12/13/2019"
ms.service: sql
ms.subservice: failover-cluster-instance
ms.topic: how-to
helpviewer_keywords:
  - "clusters [SQL Server], removing failover cluster instance"
  - "failover clustering [SQL Server], removing failover cluster instance"
  - "uninstalling failover cluster instances"
  - "removing failover cluster instances"
---

# Remove a failover cluster instance (Setup)


**Applies to:**
 

](../../sql-docs-navigation-guide.md#applies-to)
 

Use this procedure to uninstall an Always On  SQL Server 
 failover cluster instance.  
  
> **Important:**  
>  To update or remove a  SQL Server 
 failover cluster, you must be a local administrator with permission to login as a service on all nodes of the Windows Server failover cluster.  
  
 **Before you begin**  
  
 Consider the following important points before you uninstall a  SQL Server 
 failover cluster instance:  
  
-   If  SQL Server 
 Native Client is uninstalled by accident,  SQL Server 
 resources will fail to start. To reinstall  SQL Server 
 Native Client, run the  SQL Server 
 Setup program to install  SQL Server 
 prerequisites.  
  
-   If you uninstall a failover cluster that has more than one SQL IP cluster resource, you must remove the additional SQL IP resources using Failover Cluster Manager or PowerShell.  
  
 For information about command prompt syntax, see [Install SQL Server 2016 from the Command Prompt](../../../database-engine/install-windows/install-sql-server-from-the-command-prompt.md).  
  
### To uninstall a  SQL Server 
 failover cluster instance
  
1.  To uninstall a  SQL Server 
 failover cluster, use the Remove Node functionality provided by  SQL Server 
 Setup to remove each node individually. For more information, see [Add or Remove Nodes in an Always On Failover Cluster (Setup)](add-or-remove-nodes-in-a-sql-server-failover-cluster-setup.md).  
  
## Related content

- [View and read SQL Server Setup log files](../../../database-engine/install-windows/view-and-read-sql-server-setup-log-files.md)
