---
title: "Upgrade Master Data Services"
description: Discover the four scenarios for upgrading Microsoft SQL Server Master Data Services. Learn about file locations and troubleshooting for upgrades.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/03/2025
ms.service: sql
ms.subservice: master-data-services
ms.topic: upgrade-and-migration-article
monikerRange: ">=sql-server-2017"
---
# Upgrade Master Data Services


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


The following are the scenarios for upgrading Microsoft  SQL Server 
 Master Data Services.

- [Upgrade without Database Engine Upgrade](upgrade-master-data-services.md#noengine)
- [Upgrade with Database Engine Upgrade](upgrade-master-data-services.md#engine)
- [Upgrade in Two-Computer Scenario](upgrade-master-data-services.md#twocomputer)
- [Upgrade with Restoring a Database from Backup](upgrade-master-data-services.md#restore)

> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


## Before you upgrade

Back up your database before performing any upgrade.

The upgrade process recreates stored procedures and upgrades tables used by  Master Data Services 
. Any customizations you make to either of these components might be lost.

Model deployment packages can be used only in the edition of  SQL Server 
 they were created in. You can't deploy model deployment packages created in  SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
, or  SQL Server 2014 (12.x)
 to  SQL Server 2016 (13.x) 
.

After you upgrade Data Quality Services (DQS) and Master Data Services (MDS) to the latest version of  SQL Server 
, any earlier version of the MDS add-in for Excel no longer works. You can download the  SQL Server 2016 (13.x) 
 MDS add-in for Excel from [Master Data Services Add-in for Microsoft Excel](../../master-data-services/microsoft-excel-add-in/master-data-services-add-in-for-microsoft-excel.md).

<a id="fileLocation"></a>

## File location

By default, the files are installed at `<drive>:\Program Files\Microsoft SQL Server\<nnn>\Master Data Services`, where `<nnn>` represents the  SQL Server 
 version. For example,  SQL Server 2017 (14.x) 
 is `140`, and  SQL Server 2019 (15.x) 
 is `150`.

<a id="noengine"></a>

## Upgrade without Database Engine upgrade

In this scenario you continue to use  SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
,  SQL Server 2014 (12.x)
, or  SQL Server 2016 (13.x) 
 to host your MDS database. However, you must upgrade the schema of the MDS database, and then create a current  SQL Server 
 web application to access the MDS database. After the upgrade, the MDS database can't be accessed by the earlier web application.

You can install the current  SQL Server 
 and an earlier version of  SQL Server 
 on the same computer. The files are installed in different locations, as shown in [File Location](#fileLocation).

1. Install  Master Data Services 
 and any other features you want.

   1. Open the  SQL Server 
 Setup wizard.

   1. In the left pane, select **Installation**.

   1. In the right pane, select **New SQL Server stand-alone installation or add features to an existing installation**.

   1. On the **Feature Selection** page, select ** Master Data Services 
** and any other features you want to install.

   1. Complete the wizard.

1. Upgrade the MDS database schema.

   1. Open the current  SQL Server 
  Master Data Services Configuration Manager 
.

      To upgrade the MDS database schema, you must be logged in as the Administrator Account that was specified when the MDS database was created. In the MDS database, in `mdm.tblUser`, this user has the `ID` value of `1`.

   1. In the left pane, select **Database Configuration**.

   1. In the right pane, select **Select Database** and specify the information for your  SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
,  SQL Server 2014 (12.x)
, or  SQL Server 2016 (13.x) 
 database instance.

   1. Select **Upgrade Database** to start the **Upgrade Database Wizard**. For more information, see [Upgrade Database Wizard (Master Data Services Configuration Manager)](../../master-data-services/upgrade-database-wizard-master-data-services-configuration-manager.md).

1. Create a web application.

   1. Open the current  SQL Server 
  Master Data Services Configuration Manager 
.

   1. In the left pane, select **Web Configuration**.

   1. In the right pane, from the **Website** list, select one of the following options:

      - **Default Web Site**, then select **Create Application**.

      - **Create new site**. A new web application is automatically created when the website is created.

      Your existing MDS web application from an earlier version of SQL Server ( SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
,  SQL Server 2014 (12.x)
, or  SQL Server 2016 (13.x) 
) is available for selection in the  SQL Server 
 version of Master Data Services Configuration Manager. You must not select the existing web application, and instead must create a  SQL Server 2016 (13.x) 
 web application for MDS. Otherwise, you receive an error when you try to associate the web application with the upgraded MDS database, stating that the requested page can't be accessed because the related configuration data for the page is invalid.

      If you want to use the same name (alias) for MDS web application as your existing ( SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
,  SQL Server 2014 (12.x)
, or  SQL Server 2016 (13.x) 
) web application, you must first delete the web application and the associated application pool from IIS, and then create a web application with the same name using  SQL Server 2016 (13.x) 
 version of Master Data Services Configuration Manager. For information about removing web application and application pools from IIS, see [Remove an Application (IIS)](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/cc771205\(v=ws.10\)) and [Remove an Application Pool (IIS)](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/cc772406\(v=ws.10\)).

1. Associate the new web application with the upgraded MDS database.

   1. In the **Associate Application with Database** section, choose **Select**.

   1. Select the MDS database.

   1. Select **Apply**.

<a id="engine"></a>

## Upgrade with Database Engine upgrade

In this scenario, you upgrade both the database engine and  Master Data Services 
 application from an earlier version to  SQL Server 2016 (13.x) 
 or a later version.

1. **For  SQL Server 2008 R2 (10.50.x) 
 only**: Open **Control Panel** > **Programs and Features** and uninstall Microsoft  SQL Server 2008 R2 (10.50.x) 
  Master Data Services 
.

1. Upgrade the database engine to  SQL Server 2016 (13.x) 
 or a later version. For more information, see [Choose a Database Engine upgrade method](choose-a-database-engine-upgrade-method.md).

1. Complete all the steps in [Upgrade without Database Engine Upgrade](#noengine).

<a id="twocomputer"></a>

## Upgrade in two-computer scenario

In this scenario, you upgrade a system in which SQL Server is installed on two computers: one with  SQL Server 2016 (13.x) 
 or  SQL Server 2017 (14.x) 
, and the other with an earlier version of  SQL Server 
.

If an earlier version of  SQL Server 
 is installed, you continue to use the earlier version to host your MDS database on one computer. However, you must upgrade the schema of the MDS database, and then use the  SQL Server 2016 (13.x) 
 or  SQL Server 2017 (14.x) 
 web application respectively to access the MDS database. The MDS database can't be accessed by the earlier version web application.

**To upgrade in two-computer scenario**

- Complete all the steps in [Upgrade without Database Engine Upgrade](#noengine).

<a id="restore"></a>

## Upgrade by restoring a database from backup

In this scenario, either  SQL Server 2016 (13.x) 
 or  SQL Server 2017 (14.x) 
 is installed along with an earlier version on the same computer or two different computers. A database was backed up on a version earlier than the  SQL Server 2016 (13.x) 
 or  SQL Server 2017 (14.x) 
 release, before upgrade, and the database has to be restored.

1. Install  Master Data Services 
 and any other features you want.

   1. Open the  SQL Server 
 Setup wizard.

   1. In the left pane, select **Installation**.

   1. In the right pane, select **New SQL Server stand-alone installation or add features to an existing installation**.

   1. On the **Feature Selection** page, select ** Master Data Services 
** and any other features you want to install.

   1. Complete the wizard.

1. Restore the database that was backed up.

1. Upgrade the MDS database schema, create a web application, and associate the new web application with the upgraded MDS database. For the instructions, see steps 2 - 4 in [Upgrade without Database Engine Upgrade](#noengine)

## Troubleshooting

**Issue:** When you open the  SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
,  SQL Server 2014 (12.x)
, or  SQL Server 2016 (13.x) 
 web application, a "client version isn't compatible with the database version" error message is displayed.

**Solution:** This issue occurs when a  SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
,  SQL Server 2014 (12.x)
, or  SQL Server 2016 (13.x) 
 Master Data Manager web application tries to access a database that has been upgraded to or  SQL Server 2017 (14.x) 
 MDS. You must use a  SQL Server 2016 (13.x) 
 or  SQL Server 2017 (14.x) 
 web application instead.

This issue might also occur if you didn't stop and restart the **MDS Application Pool** in IIS when upgrading the MDS database schema. Restart the **MDS Application Pool** to correct the issue.

## Related content

- [Installation Tasks for Master Data Services](../../master-data-services/install-windows/install-master-data-services.md)
