---
title: Change the Password of the Accounts Used (SQL Server Configuration Manager)
description: "Find out how to change the password of the accounts that the Database Engine and the SQL Server Agent use. Learn when it's important to change the password."
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/16/2026
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "expired password [SQL Server], SQL Server Agent"
  - "passwords [SQL Server], SQL Server Agent service"
  - "passwords [SQL Server], changing"
  - "expired password [SQL Server], Database Engine"
  - "passwords [SQL Server], SQL Server service"
  - "Database Engine [SQL Server], passwords"
  - "changing passwords used by SQL Server"
  - "modifying passwords"
---
# SQL Server Configuration Manager: Change the password of the accounts used


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

This article describes how to change the password of the accounts used by the  SQL Server Database Engine 
 and the  SQL Server 
 Agent by using SQL Server Configuration Manager.

The  SQL Server Database Engine 
 and  SQL Server 
 Agent run on a computer as a service using credentials that are initially provided during setup. If the instance of  SQL Server 
 is running under a domain account and the password for that account is changed, the password used by  SQL Server 
 must be updated to the new password. If the password isn't updated,  SQL Server 
 might lose access to some domain resources and if  SQL Server 
 stops, the service don't restart until the password is updated.

To change  SQL Server 
 Authentication passwords, see [Choose an authentication mode](../../relational-databases/security/choose-an-authentication-mode.md).

## Before you begin

SQL Server Configuration Manager is the tool designed and authorized to change the settings of the  SQL Server 
 services. Changing a  SQL Server 
 service by using the Windows Service Control Manager (**services.msc**) application doesn't always change all of the necessary settings and might prevent the service from functioning properly. However, in a clustered environment, after changing the password on the active node by using SQL Server Configuration Manager, you must change the password on the passive node by using the Service Control Manager.

It's also possible to automate password management through [group-managed service accounts](configure-windows-service-accounts-and-permissions.md#GMSA).

## Permissions

You must be an administrator of the computer to change the password used by a service.

<a id="SSMSProcedure"></a>

## Use SQL Server Configuration Manager

Open SQL Server Configuration Manager from the Windows Start menu.

Because SQL Server Configuration Manager is a snap-in for the  Microsoft 
 Management Console program and not a stand-alone program, SQL Server Configuration Manager might not appear as an application in newer versions of Windows.

From the Windows **Start** menu, type `SQLServerManager17.msc` (for  SQL Server 2025 (17.x) 
). For other versions of  SQL Server 
, replace `17` with the appropriate number. Selecting `SQLServerManager17.msc` opens SQL Server Configuration Manager.

You can pin SQL Server Configuration Manager to the Start menu or taskbar when you right-click `SQLServerManager17.msc`, and then select **Open file location**. In File Explorer, right-click `SQLServerManager17.msc`, and then select **Pin to Start** or **Pin to taskbar**.


### Change the password used by the SQL Server (Database Engine) service

1. In SQL Server Configuration Manager, select **SQL Server Services**.

1. In the details pane, right-click **SQL Server (**\<instancename>**)**, and then select **Properties**.

1. In the **SQL Server (**\<instancename>**) Properties** dialog box, on the Log On tab, for the account listed in the **Account Name** box, type the new password in the **Password** and **Confirm Password** boxes, and then select **OK**.

   The password change made in SQL Server Configuration Manager takes effect immediately, without the need to restart the  SQL Server 
 service. If you use the Windows Services app (`services.msc`) to change the account password, a service restart is required.

### Change the password used by the SQL Server Agent service

1. In SQL Server Configuration Manager, select **SQL Server Services**.

1. In the details pane, right-click **SQL Server Agent (**\<instancename>**)**, and then select **Properties**.

1. In the **SQL Server Agent (**\<instancename>**) Properties** dialog box, on the Log On tab, for the account listed in the **Account Name** box, type the new password in the **Password** and **Confirm Password** boxes, and then select **OK**.

   On a stand-alone instance of  SQL Server 
, the password takes effect immediately, without restarting  SQL Server 
. On a clustered instance,  SQL Server 
 might take the  SQL Server 
 resource offline, and require a restart.

## Related content

- [SQL Server Configuration Manager: Connect to another computer](scm-services-connect-to-another-computer.md)
