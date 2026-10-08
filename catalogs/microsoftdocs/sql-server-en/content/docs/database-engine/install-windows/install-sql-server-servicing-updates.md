---
title: Install SQL Server Servicing Updates
description: This article provides information about installing updates for SQL Server during a new installation or after SQL Server has been installed.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/03/2025
ms.service: sql
ms.subservice: install
ms.topic: install-set-up-deploy
ms.custom:
  - intro-installation
monikerRange: ">=sql-server-2017"
---
# Install SQL Server servicing updates


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


This article provides information about installing updates for  SQL Server 
. This section provides the following information:

- Installing updates for  SQL Server 
 during a new installation
- Installing updates for  SQL Server 
 after it's installed.

Install the latest  SQL Server 
 updates in a timely manner to make sure that systems are up-to-date with the most recent security updates.

## Install updates for SQL Server during a new installation

 SQL Server 
 setup integrates the latest product updates with the main product installation so that the main product and its applicable updates are installed at the same time. Product Update can search for the applicable updates from:

-  Microsoft 
 Update
- Windows Server Update Services (WSUS)
- A local folder
- A network share

After Setup finds the latest versions of the applicable updates, it downloads and integrates them with the current  SQL Server 
 setup process. Product Update can include a cumulative update, service pack, or service pack plus cumulative update.

## Install Updates for SQL Server after it's installed

On an installed instance of  SQL Server 
, we recommend that you apply the latest security updates and critical updates including general distribution releases (GDRs), service packs (SPs), and cumulative updates (CUs). For more information, see the [March 2016 announcement on the SQL Server Incremental Servicing Model (ISM)](https://learn.microsoft.com/archive/blogs/sqlreleaseservices/announcing-updates-to-the-sql-server-incremental-servicing-model-ism).

Starting with  SQL Server 2017 (14.x) 
, we adopted a simplified, predictable mainstream servicing lifecycle, and service packs (SPs) are no longer available.

Only cumulative updates (CUs), and general distribution releases (GDRs) when needed.

For more information, see the [September 2017 announcement on the Modern Servicing Model for SQL Server (MSM)](https://learn.microsoft.com/archive/blogs/sqlreleaseservices/announcing-the-modern-servicing-model-for-sql-server).

The  SQL Server 
 updates are available through  Microsoft 
 Update (MU), Windows Server Update Services (WSUS), and the Microsoft Download Center. Security and Critical updates for  SQL Server 
 are available through  Microsoft 
 Update, and you must opt in to MU to be able to see these updates using the Windows Update applet.

When you receive an update through  Microsoft 
 Update, it updates all  SQL Server 
 features to the latest version in an unattended mode. If you need more flexibility or don't have internet or WSUS access, you must obtain the updates from the  Microsoft 
 Download Center.

## Related content

- [Install SQL Server from the Installation Wizard (Setup)](install-sql-server-from-the-installation-wizard-setup.md)
- [Add Features to an Instance of SQL Server (Setup)](add-features-to-an-instance-of-sql-server-setup.md)
- [Repair a failed SQL Server installation](repair-a-failed-sql-server-installation.md)
