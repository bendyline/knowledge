---
title: Host a Database on a Managed Instance
description: Learn how to create and configure a Master Data Services (MDS) database and host it on an Azure SQL Managed Instance.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
  - sfi-image-nochange
  - sfi-ropc-blocked
monikerRange: ">=sql-server-ver15"
---
# Host an MDS database on a managed instance


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  This article covers how to configure a Master Data Services (MDS) database on a managed instance.
  
## Preparation

To prepare, you need to create and configure an Azure SQL Managed Instance and configure your web application machine.

### Create and configure the database

1. Create a managed instance with a virtual network. See [Quickstart: Create a SQL Managed Instance](https://learn.microsoft.com/azure/sql-database/sql-database-managed-instance-get-started) for details.

1. Configure a Point-to-Site connection. See [Configure a Point-to-Site connection to a VNet using native Azure certificate authentication: Azure portal](https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal) for instructions.

1. Configure Microsoft Entra authentication with SQL Managed Instance. See [Configure and manage Microsoft Entra authentication with SQL](https://learn.microsoft.com/azure/sql-database/sql-database-aad-authentication-configure) for details.

### Configure web application machine

1. Install a Point-to-Site connection certificate and VPN to ensure that the machine can access the managed instance. Refer to [Configure a Point-to-Site connection to a VNet using native Azure certificate authentication: Azure portal](https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal) for instructions.

1. Install the following Roles and Features:
   - Roles:
     - Internet Information Services
     - Web Management Tools
     - IIS Management Console
     - World Wide Web Services
     - Application Development
     - .NET Extensibility 3.5
     - .NET Extensibility 4.5
     - ASP.NET 3.5
     - ASP.NET 4.5
     - ISAPI Extensions
     - ISAPI Filters
     - Common HTTP Features
     - Default Document
     - Directory Browsing
     - HTTP Errors
     - Static Content
     - Health and Diagnostics
     - HTTP Logging
     - Request Monitor
     - Performance
     - Static Content Compression
     - Security
     - Request Filtering
     - Windows Authentication
       > **Note:**
       > Don't install WebDAV Publishing

   - Features:
     - .NET Framework 3.5 (includes .NET 2.0 and 3.0)
     - .NET Framework 4.5 Advanced Services
     - ASP.NET 4.5
     - WCF Services
     - HTTP Activation (required)
     - TCP Port Sharing
     - Windows Process Activation Service
     - Process Model
     - .NET Environment
     - Configuration APIs
     - Dynamic Content Compression

## Install and configure an MDS web application

Next, you install and configure  Master Data Services 
.

### Install SQL Server 2019

Use the SQL Server setup installation wizard or a command prompt to install  Master Data Services 
.

1. Open `Setup.exe`, and follow the steps in the installation wizard.

2. Select  Master Data Services 
 on the **Feature Selection** page under **Shared Features**.
This action installs:
   -  Master Data Services Configuration Manager 

   - Assemblies
   - A Windows PowerShell snap-in
   - Folders and files for web applications and services.

   Screenshot showing the Feature Selection page.  

### Set up the database and website

1. Connect the Azure Virtual Network to ensure that you can connect to the managed instance.

   Screenshot of the Test MI VPN connecting to the Azure Virtual Network.

1. Open the  Master Data Services Configuration Manager 
 and then select **Database Configuration** in the left pane.

1. Select **Create Database** to open the **Create Database Wizard**. Select **Next**.

1. On the **Database Server** page, complete the **SQL Server instance** field, and then choose the **Authentication type**. Select **Test Connection** to confirm that you can use your credentials to connect to the database via the chosen authentication type. Select **Next**.

   > **Note:**
   > - A SQL Server instance looks like `xxxxxxx.xxxxxxx.database.windows.net`.
   > - For a managed instance, choose from **"SQL Server Account"** and **"Current User – Active Directory Integrated"** authentication types.
   > - If you select **Current User – Active Directory Integrated** as the authentication type, the **User name** field is read-only and displays the currently signed-on Windows user account. If you are running SQL Server 2019  Master Data Services 
 on an Azure Virtual Machine (VM), the **User name** field displays the VM name and the user name for the local administrator account on the VM.

   Your authentication must contain the **"sysadmin"** rule for managed instances.

   Screenshot of the Database Server page of the Create Database Wizard.  

1. Type a name in the **Database name** field. Optionally, to select a Windows collation, clear the **SQL Server default collation** check box and select one or more of the available options. For example, **Case-sensitive**. Select **Next**.

   Screenshot of the Database page of the Create Database Wizard.

1. In the **User name** field, specify the Windows account of the default super user for  Master Data Services 
. A super user has access to all functional areas and can add, delete, and update all models.

   Screenshot of the Administrator Account page of the Create Database Wizard.

1. Select **Next** to view a summary of the settings for the  Master Data Services 
 database. Select  **Next** again to create the database. You'll see the **Progress and Finish** page.

1. After the database is created and configured, select **Finish**.

   For more information about the settings in the **Create Database Wizard**, see [Create Database Wizard ( Master Data Services
Configuration Manager)](create-database-wizard-master-data-services-configuration-manager.md).

1. On the **Database Configuration** page in the  Master Data Services Configuration Manager 
, choose **Select Database**.

1. Select **Connect**, choose the  Master Data Services 
 database and then select **OK**.

   Screenshot of the Connect to Database dialog box.

1. In  Master Data Services Configuration Manager 
, select **Web Configuration** in the left pane.

1. In the **Website** list box, choose **Default Web Site**, and then select **Create** to create a web application.

   Screenshot of the Master Data Services Configuration Manager dialog box.

   > **Note:**
   > If you select **Default Web Site**, you'll need to separately create a web application. If you choose **Create new website** in the list box, the application is automatically created.

1. In the **Application Pool** section, enter a different user name, enter the password, and then select **OK**.

   Screenshot of the Application Management dialog box.

   > **Note:**
   > Make sure that the user can access the database with the Active Directory Integrated authentication that you recently created. Alternatively, you can change the connection in `web.config` later.

   For more information about the **Create Web Application** dialog box, see [Create Web Application Dialog Box &#40; Master Data Services 
 Configuration Manager&#41;](master-data-services-overview-mds.md).

1. On the **Web Configuration** pane in the **Web application** window, select the application you've created, and then choose **Select** in the **Associate Application with Database** section.

1. Select **Connect** and choose the  Master Data Services 
 database that you want to associate with the web application. Select **OK**.

   You've finished setting up the website. The **Web Configuration** page now displays the website you selected, web application you created, and the  Master Data Services 
 database associated with the application.

   Screenshot of the Web Configuration section.

1. Select **Apply**. You'll see the **Configuration Complete** message. Select **OK** in the message box to launch the web application. The website address is `http://server name/web application/`.

## Configure authentication

To connect the managed instance database to the web application, you need to change the other authentication type.

Find the `web.config` file under `C:\Program Files\Microsoft SQL Server\150\Master Data Services\WebApplication`. Modify the connectionString to change the other authentication type to connect to the managed instance database.

The default authentication type is `Active Directory Integrated` as shown in the following sample connection string:

   ```xml
   <add name="MDS1" connectionString="Data Source=*****.*****.database.windows.net;Initial Catalog=MasterDataServices;Integrated Security=False;Connect Timeout=60;Authentication=&quot;Active Directory Integrated&quot;" />
   ```

MDS also supports Active Directory password authentication and SQL Server authentication, as shown in the following sample connection strings:

- Active Directory password authentication. Replace `<password>` with a valid password.

   ```xml
   <add name="MDS1" connectionString="Data Source=*****.*****.database.windows.net;Initial Catalog=MasterDataServices;Integrated Security=False;Connect Timeout=60;Authentication=&quot;Active Directory Password&quot; ; UID=bob@example.com; PWD=<password>" />
   ```

- SQL Server authentication. Replace `<password>` with a valid password.

   ```xml
   <add name="MDS1" connectionString="Data Source=*****.*****.database.windows.net;Initial Catalog=MasterDataServices;Integrated Security=False;Connect Timeout=60;User ID=UserName;Password=<password>;" />
   ```

## Upgrade  Master Data Services 
 and SQL Database version

### Upgrade  Master Data Services 


Install the **SQL Server 2019 Cumulative Update**.  Master Data Services 
 will be updated automatically.

### Upgrade SQL Server

You might get the error: `The client version is incompatible with the database version` after installing **SQL Server 2019 Cumulative Update**.

Screenshot of the Master Data Services error.

To fix this issue, you need upgrade the database version:

1. Open the  Master Data Services Configuration Manager 
, and then select  **Database Configuration** in the left pane.

1. On the **Database Configuration** page in the  Master Data Services Configuration Manager 
, choose **Select Database**.

1. Choose the  Master Data Services 
 database that you associated with the web application. Select **Connect**, and then select **OK**.

   Screenshot of the Connect to a Master Data Service Database dialog box.

1. Select **Upgrade Database...** .

   Screenshot of the Upgrade Database option.

1. In the Upgrade Database Wizard, select **Next** on the **Welcome** page and on the  **Upgrade Review** page.

   Screenshot of the Upgrade Review page of the Upgrade Database Wizard.

1. Select **Finish** after all tasks are complete.

## Related content

- [Master Data Services Database](master-data-services-database.md)
- [Master Data Manager Web Application](master-data-manager-web-application.md)
- [Database Configuration Page (Master Data Services Configuration Manager)](database-configuration-page-master-data-services-configuration-manager.md)
- [What's New in Master Data Services (MDS)](what-s-new-in-master-data-services-mds.md)
