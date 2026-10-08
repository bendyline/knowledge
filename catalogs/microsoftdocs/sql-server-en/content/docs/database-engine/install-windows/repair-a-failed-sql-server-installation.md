---
title: Repair a Failed SQL Server Installation
description: Follow these steps to repair an installation of SQL Server.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/17/2025
ms.service: sql
ms.subservice: install
ms.topic: install-set-up-deploy
monikerRange: ">=sql-server-2017"
---
# Repair a failed SQL Server installation


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


Use the repair operation in the following scenarios:

- Repair an instance of  SQL Server 
 that becomes corrupted after a successful installation.

- Repair an instance of  SQL Server 
 if the upgrade operation is canceled or fails after the instance name is mapped to the newly upgraded instance.

  - If you see the following message in the summary log, you can repair the failed upgrade instance:

    >  SQL Server 
 upgrade failed. To continue, investigate the reason for the failure, correct the problem, and then repair your installation.

  - If you see the following message in the summary log, you need to uninstall and reinstall  SQL Server 
. You can't repair the  SQL Server 
 instance.

    >  SQL Server 
 upgrade failed. To continue, investigate the reason for the failure, correct the problem.

> **Note:**  
> To repair  SQL Server Express 
 edition, you need the offline installer. Run the  SQL Server Express 
 edition installation and select the **Download Media** option. Use the downloaded executable to run  SQL Server 
 Setup in place of `setup.exe`.

## Repair a SQL Server instance

When you repair an instance of  SQL Server 
:

- All missing or corrupt files are replaced.
- All missing or corrupt registry keys are replaced.
- All missing or invalid configuration values are set to default values.

Before you continue, for  SQL Server 
 failover clusters, review the following important information:

- Repair must be run on individual cluster nodes.

- To repair a failover cluster node after a failed Prepare operation, use **Remove node** and then perform the Prepare step again. For more information, see [Add or remove nodes in a failover cluster instance (Setup)](../../sql-server/failover-clusters/install/add-or-remove-nodes-in-a-sql-server-failover-cluster-setup.md).

### Repair a failed installation of SQL Server from the Installation Center

1. Launch the  SQL Server 
 Setup program (`setup.exe`) from  SQL Server 
 installation media.

1. After prerequisites and system verification, the Setup program displays the  SQL Server 
 Installation Center page.

1. Select **Maintenance** in the left-hand navigation area, and then select **Repair** to start the repair operation.

   > **Tip:**  
   > If you use the **Start** menu to launch the Installation Center, you need to provide the location of the installation media at this time.

1. Setup support rule and file routines run to ensure that your system has prerequisites installed and that the computer passes Setup validation rules. Select **OK** or **Install** to continue.

1. On the Select Instance page, select the instance to repair, and then select **Next** to continue.

1. The repair rules run to validate the operation. To continue, select **Next**.

1. The Ready to Repair page indicates that the operation is ready to proceed. To continue, select **Repair**.

1. The Repair Progress page shows the status of the repair operation. The Complete page indicates that the operation is finished.

## Repair a failed installation of SQL Server using the command prompt

Run the following command at a command prompt. Replace `<instancename>` with the name of the instance you want to repair.

```console
setup.exe /q /ACTION=Repair /INSTANCENAME=<instancename>
```

## Related content

- [View and read SQL Server Setup log files](view-and-read-sql-server-setup-log-files.md)
- [Installation How-to articles](https://learn.microsoft.com/previous-versions/sql/)
