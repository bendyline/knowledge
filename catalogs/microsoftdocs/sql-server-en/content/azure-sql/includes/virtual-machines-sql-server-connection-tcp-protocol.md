---
author: rothja
ms.author: jroth
ms.date: 10/26/2018
ms.service: azure-vm-sql-server
ms.topic: include
---
1. While connected to the virtual machine, open [SQL Server Configuration Manager](https://learn.microsoft.com/sql/tools/configuration-manager/sql-server-configuration-manager).

1. In SQL Server Configuration Manager, in the console pane, expand **SQL Server Network Configuration**.

1. In the console pane, select **Protocols for MSSQLSERVER** (the default instance name.) In the details pane, right-click **TCP** and select **Enable** if it is not already enabled.

    Enable TCP

1. In the console pane, select **SQL Server Services**. In the details pane, right-click **SQL Server (*instance name*)** (the default instance is **SQL Server (MSSQLSERVER)**), and then select  **Restart**, to stop and restart the instance of SQL Server.

    Restart Database Engine

1. Close SQL Server Configuration Manager.

For more information about enabling protocols for the SQL Server Database Engine, see [Enable or Disable a Server Network Protocol](https://learn.microsoft.com/sql/database-engine/configure-windows/enable-or-disable-a-server-network-protocol).
