---
title: Uninstall Reporting Services
description: This article describes how to uninstall Reporting Services, which doesn't remove content you created or configuration you have modified.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: maghan
ms.date: 06/26/2026
ms.service: reporting-services
ms.topic: how-to
---

# Uninstall Reporting Services


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 on Windows


Uninstalling  Reporting Services 
 doesn't remove the content you created or the configuration you modified. However, if you need the content after the uninstall, make copies of it before you begin the uninstallation process.

## Uninstall SharePoint Mode

When you uninstall  Reporting Services 
 SharePoint mode, the following components are removed:

-  Reporting Services 
 service and service proxy.

- Files used for the  Reporting Services 
 installation.

The uninstall process doesn't remove the  Reporting Services 
 service applications. If you no longer want the service applications, delete them by using Windows PowerShell or SharePoint Central Administration.

The uninstall process doesn't remove the report items and related metadata. This information is contained in the content and configuration databases related to the  Reporting Services 
 service applications. The databases aren't removed and you can manually migrate the databases to another installation of  Reporting Services 
 in SharePoint mode. If you no longer want the information, delete the databases. For more information, see [Upgrade and migrate Reporting Services](../../reporting-services/install-windows/upgrade-and-migrate-reporting-services.md).

The following are example names of the three  Reporting Services 
 databases that aren't removed:

- **Report server database:** ReportingService_7f616e2d253040e8ab5653b3c09a065e

- **Report server temp database:** ReportingService_7f616e2d253040e8ab5653b3c09a065eTempDB

- **Report server alerting database:** ReportingService_7f616e2d253040e8ab5653b3c09a065e_Alerting

### Uninstall the Add-in for SharePoint Products

When you uninstall the add-in from a computer, you can choose to only uninstall the files or to also remove the  Reporting Services 
 feature from the farm. For information on uninstalling the  Reporting Services 
 add-in for SharePoint products, see [Install or uninstall the Reporting Services add-in for SharePoint (SSRS)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/reporting-services/install-windows/install-or-uninstall-the-reporting-services-add-in-for-sharepoint.md).

## Uninstall native mode

When you uninstall  Reporting Services 
 native mode, the uninstaller leaves in place anything that you **created** or **modified** after the installation. For example, the uninstaller leaves in place database files, log files,  Reporting Services 
 configuration files, and content items such as reports and datasource files.

 Reporting Services 
 is an instance feature and therefore doesn't appear in Windows Control Panel, **Programs and Features**. To uninstall  Reporting Services 
 native mode:

1. In Windows Control Panel, select **Programs and Features**.

1. In **Programs and Features**, select **Microsoft SQL Server 2016**.

1. In the uninstall wizard, select the instance that includes the  Reporting Services 
 instance feature **RS**.

   Screenshot of rs_nativemode_uninstall_selectinstance.

1. After you select the instance, select the  Reporting Services 
 feature.

   Screenshot of rs_nativemode_uninstall_selectfeatures.

1. Complete the wizard.

## Related content

- [Uninstall an existing instance of SQL Server (Setup)](uninstall-an-existing-instance-of-sql-server-setup.md)
- [Install or Uninstall the Power Pivot for SharePoint Add-in (SharePoint 2013)](https://learn.microsoft.com/analysis-services/instances/install-windows/install-or-uninstall-the-power-pivot-for-sharepoint-add-in-sharepoint-2013)
- [Install or uninstall the Reporting Services add-in for SharePoint (SSRS)](https://learn.microsoft.com/previous-versions/sql/reporting-services/install-windows/install-or-uninstall-the-reporting-services-add-in-for-sharepoint)
