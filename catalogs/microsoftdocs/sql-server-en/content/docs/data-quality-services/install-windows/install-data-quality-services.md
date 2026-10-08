---
title: "Install Data Quality Services"
description: "Install Data Quality Services"
ms.date: "09/11/2017"
ms.service: sql
ms.subservice: data-quality-services
ms.topic: install-set-up-deploy
ms.custom:
  - intro-installation
  - build-2025
---

# Install Data Quality Services


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


> **Important:**  
> Data Quality Services (DQS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support DQS in  SQL Server 2022 (16.x) 
 and earlier versions.


 SQL Server Data Quality Services 
 (DQS) contains the following two components: ** Data Quality Server 
** and ** Data Quality Client 
**.  
  
| DQS Component | Description |
| --- | --- |
| Data Quality Server |
| Data Quality Server |
 | is installed on top of the  SQL Server |
 | Database Engine, and includes three databases: DQS_MAIN, DQS_PROJECTS, and DQS_STAGING_DATA. DQS_MAIN contains DQS stored procedures, the DQS engine, and published knowledge bases. DQS_PROJECTS contains the data quality project information. DQS_STAGING_DATA is the staging area where you can copy your source data to perform DQS operations, and then export your processed data. |
| Data Quality Client |
| Data Quality Client |
 | is a standalone application that enables you to connect to  Data Quality Server |
| , and provides you with a highly-intuitive graphical user interface to perform data-quality operations, and other administrative tasks related to DQS. |
  
> **Important:**  
> Apart from the above two DQS components, you can also:  
>
> Use the DQS Cleansing Transformation in Integration Services that performs data cleansing within the Integration Services packaging process, and is automatically installed when you install Integration Services. For information about installing Integration Services, see [Install Integration Services](../../integration-services/install-windows/install-integration-services.md).  
>
> Enable DQS integration in Master Data Services to use the DQS matching functionality in the Master Data Services Add-in for Excel. For more information, see [Enable Data Quality Services Integration with Master Data Services](../../master-data-services/install-windows/enable-data-quality-services-integration-with-master-data-services.md).  
  
 DQS installation is a three-part process:  
  
- [Pre-Installation Tasks](#PreInstallationTasks): Verify system requirements before you install DQS.  
  
- [Data Quality Services Installation Tasks](#DQSInstallation): Install DQS by using SQL Server Setup.  
  
- [Post-Installation Tasks](#PostInstallationTasks): Perform these tasks after finishing with the SQL Server Setup to finish installing DQS.  
  
> **Note:**  
> This topic does not include instructions for running Setup from the command line. For information about command-line options for installing  Data Quality Server 
 and client, see [Feature Parameters](../../database-engine/install-windows/install-sql-server-from-the-command-prompt.md#Feature) in [Install SQL Server from the Command Prompt](../../database-engine/install-windows/install-sql-server-from-the-command-prompt.md).  
  
##  <a name="PreInstallationTasks"></a> Pre-Installation tasks

 Before installing DQS, make sure that your computer meets the minimum system requirements. The following table provides information about the minimum system requirements for the DQS components:  
  
| DQS Component | Minimum System Requirements |
| --- | --- |
| Data Quality Server |
| Memory (RAM): Minimum: 2 GB / Recommended: 4 GB or more<br /><br />  SQL Server |
 | Database Engine. For more information, see [Install SQL Server Database Engine](../../database-engine/install-windows/install-sql-server-database-engine.md). |
| Data Quality Client |
| .NET Framework 4.0 (installed during the  Data Quality Client |
 | installation, if not already installed)<br /><br /> Internet Explorer 6.0 SP1 or later |
  
> **Important:**  
>  Data Quality Server 
 and  Data Quality Client 
 can be installed on the same computer, or different computers. Both the components can be installed independently of each other, and in any sequence. However, to use  Data Quality Client 
, you will need a  Data Quality Server 
 installed to connect to.  
>  
> You can connect to the  SQL Server 
 version of  Data Quality Server 
 using either the current or earlier version of  Data Quality Client 
 and DQS Cleansing Transformation. For information about upgrading your existing version of DQS to  SQL Server 
, see [Upgrade Data Quality Services](../../database-engine/install-windows/upgrade-data-quality-services.md).  
>  
> Although Microsoft Excel is not a prerequisite for installing Data Quality Client, Microsoft Excel 2003 or later must be installed on the Data Quality Client computer to perform various operations in the client application such as importing domain values from an excel file or mapping to the source data in an Excel file for knowledge discovery, cleansing, or matching activities.  
  
 For detailed information about the minimum system requirements for installing  SQL Server 
, see [Hardware and software requirements for SQL Server 2016](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2016.md).  
  
##  <a name="DQSInstallation"></a> Data Quality Services installation tasks

You have to use the  SQL Server 
 Setup to install DQS components. When you run the SQL Server Setup, you have to go through a series of installation wizard pages to select appropriate options based on your requirements. The following table lists only those pages in the installation wizard where the options that you select will affect your installation of DQS:  
  
| Page | Action |
| --- | --- |
| Feature Selection | Select:<br /><br /> **Data Quality Services** under **Database Engine Services** to install the  Data Quality Server |
| . <br />If you select the **Data Quality Services** check box, SQL Server Setup will copy an installer file, DQSInstaller.exe, under the SQL Server instance directory on your computer. You must run this file after you have completed the SQL Server Setup to *complete* the  Data Quality Server |
 | installation. Also, you must perform some additional steps to configure your  Data Quality Server |
 | before you can use it. For more information, see [Post-Installation Tasks](#PostInstallationTasks).<br /><br /> **Data Quality Client** to install  Data Quality Client |
| .<br /><br /> (Recommended) **Management Tools - Complete** under **Management Tools - Basic** to install  SQL Server Management Studio |
| . It provides you a graphical user interface to manage your SQL Server instance, and will aid you in performing additional tasks post installation as listed in the next section. |
| Database Engine Configuration | Click **Add Current User** to add your user Windows account to the sysadmin fixed server role. This is required for you to be able to run the DQSInstaller.exe file later to complete the  Data Quality Server |
 | installation. |
  
##  <a name="PostInstallationTasks"></a> Post installation tasks

 After you complete the SQL Server installation wizard, you must perform additional steps mentioned in this section to complete your  Data Quality Server 
 installation, configure it, and then use it.  
  
1. To complete the  Data Quality Server 
 installation, run the DQSInstaller.exe file. On running the DQSInstaller.exe file:  
  
    - The DQS_MAIN, DQS_PROJECTS, and DQS_STAGING_DATA databases are created.  
  
    - The ##MS_dqs_db_owner_login## and ##MS_dqs_service_login## logins are created.  
  
    - The dqs_administrator, dqs_kb_editor, and dqs_kb_operator roles are created in the DQS_MAIN database.  
  
    - The DQInitDQS_MAIN stored procedure is created in the master database.  
  
    - DQS_install.log file is typically created in the C:\Program Files\Microsoft SQL Server\MSSQL13.*<instance_name>*\MSSQL\Log folder. The file contains information about the actions performed on running the DQSInstaller.exe file.  
  
    - If a Master Data Services database is present in the same SQL Server instance as  Data Quality Server 
, a user mapped to the Master Data Services login is created, and is granted the dqs_administrator role on the DQS_MAIN database.  
  
     This completes the  Data Quality Server 
 installation.  
  
     For more information see [Run DQSInstaller.exe to Complete Data Quality Server Installation](run-dqsinstaller-exe-to-complete-data-quality-server-installation.md).  
  
2. Grant DQS Roles to Users:  
  
     To log on to  Data Quality Server 
 using  Data Quality Client 
, a user must have any of the following three roles on the DQS_MAIN database:  
  
    - **dqs_administrator**  
  
    - **dqs_kb_editor**  
  
    - **dqs_kb_operator**  
  
     By default, if your user account is a member of the sysadmin fixed server role, you can log on to  Data Quality Server 
 using  Data Quality Client 
 even if none of the DQS roles are granted to your user account. For information about the three DQS roles, see [DQS Security](../dqs-security.md).  
  
     For more information see [Grant DQS Roles to Users](grant-dqs-roles-to-users.md).  
  
    > **Note:**  
    > The three DQS roles are not available for the DQS_PROJECTS and DQS_STAGING_DATA databases.  
  
3. Make your data available for DQS operations. Make sure that you can access your source data for the DQS operations, and can export the processed data to a table in a database.  
  
     For more information see [Access Data for the DQS Operations](access-data-for-the-dqs-operations.md).  

## Related content

- [Video: Install and Configure DQS](https://learn.microsoft.com/previous-versions/dn912438\(v=msdn.10\))
- [Upgrade SQLCLR assemblies after .NET framework update](upgrade-sqlclr-assemblies-after-net-framework-update.md)
- [Export and Import DQS Knowledge Bases Using DQSInstaller.exe](export-and-import-dqs-knowledge-bases-using-dqsinstaller-exe.md)
- [Upgrade Data Quality Services](../../database-engine/install-windows/upgrade-data-quality-services.md)
- [Remove Data Quality Server Objects](../../sql-server/install/remove-data-quality-server-objects.md)
- [Install SQL Server Business Intelligence Features](../../sql-server/install/install-sql-server-business-intelligence-features.md)
- [Uninstall SQL Server](../../sql-server/install/uninstall-sql-server.md)
- [Data Quality Services](../data-quality-services.md)
