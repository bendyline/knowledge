---
title: "Install SQL Server Using SysPrep"
description: This article describes how to prepare and complete images by using SysPrep in SQL Server installation.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/03/2025
ms.service: sql
ms.subservice: install
ms.topic: install-set-up-deploy
monikerRange: ">=sql-server-2017"
ms.custom:
  - intro-installation
  - sfi-ropc-blocked
---
# Install SQL Server with SysPrep


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


 SQL Server 
 SysPrep related setup actions can be accessed through the Installation Center. The **Advanced** Page of the **Installation Center** has two options - **Image preparation of a stand-alone instance of  SQL Server 
** and **Image completion of a prepared stand-alone instance of  SQL Server 
**. The [Prepare](#prepare) and [Complete](#complete) sections describe the installation process in detail. For more information, see [Considerations for installing SQL Server using SysPrep](considerations-for-installing-sql-server-using-sysprep.md).

You can also prepare and complete an instance of  SQL Server 
 using the command prompt or a configuration file. For more information, see:

- [Install and configure SQL Server on Windows from the command prompt](install-sql-server-from-the-command-prompt.md)
- [Install SQL Server using a configuration file](install-sql-server-using-a-configuration-file.md)

## Prerequisites

Before you install  SQL Server 
, review the articles in [Plan a SQL Server installation](../../sql-server/install/planning-a-sql-server-installation.md).

For more information about  SQL Server 
 editions and the hardware and software requirements, see:

For a list of features supported by the editions of  SQL Server 
 on Windows, see:

- [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md)
- [Editions and supported features of SQL Server 2022](../../sql-server/editions-and-components-of-sql-server-2022.md)
- [Editions and supported features of SQL Server 2019](../../sql-server/editions-and-components-of-sql-server-2019.md)
- [Editions and supported features of SQL Server 2017](../../sql-server/editions-and-components-of-sql-server-2017.md)


<a id="sysprep"></a>

## SQL Server SysPrep cluster support

Beginning in  SQL Server 2014 (12.x)
, SysPrep supports clustered  SQL Server 
 instances in command line installations. For more information, see [What is Sysprep?](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-vista/cc721940\(v=ws.10\))

### Prepare a SQL Server failover cluster (unattended)

1. Prepare the image (as discussed in [Considerations for installing SQL Server using SysPrep](considerations-for-installing-sql-server-using-sysprep.md)) and capture the Windows image through SysPrep Generalization. The following sample prepares the image:

   ```console
   Setup.exe /q /ACTION=PrepareImage l /FEATURES=SQLEngine /InstanceID =<MYINST> /IACCEPTSQLSERVERLICENSETERMS
   ```

   Then run Windows SysPrep Generalization.

1. Deploy the image by running Windows SysPrep Specialize.

1. Create the Windows Server failover cluster.

1. Run setup.exe with **/ACTION=PrepareFailoverCluster** all nodes. For example:

   ```console
   setup.exe /q /ACTION=PrepareFailoverCluster /InstanceName=<InstanceName> /Features=SQLEngine /SQLSVCACCOUNT="<DomainName\UserName>" /SQLSVCPASSWORD="xxxxxxxxxxx" /IACCEPTSQLSERVERLICENSETERMS
   ```

### Complete a SQL Server failover cluster (Unattended)

Run setup.exe with **/ACTION=CompleteFailoverCluster** on the node that owns the available storage group:

```console
setup.exe /q /ACTION=CompleteFailoverCluster /InstanceName=<InstanceName> /FAILOVERCLUSTERDISKS="<Cluster Disk Resource Name - for example, 'Disk S:'>:" /FAILOVERCLUSTERNETWORKNAME="<Insert FOI Network Name>" /FAILOVERCLUSTERIPADDRESSES="IPv4;xx.xxx.xx.xx;Cluster Network;xxx.xxx.xxx.x" /FAILOVERCLUSTERGROUP="MSSQLSERVER" /INSTALLSQLDATADIR="<Drive>:\<Path>\MSSQLSERVER" /SQLCOLLATION="SQL_Latin1_General_CP1_CS_AS" /SQLSYSADMINACCOUNTS="<DomainName\UserName>"
```

### Add a node to an existing SQL Server failover cluster (unattended)

1. Deploy the image by running Windows SysPrep Specialize.

1. Join the Windows Server failover cluster.

1. Run setup.exe with **/ACTION=AddNode** on all nodes:

   ```console
   setup.exe /q /ACTION=AddNode /InstanceName=<InstanceName> /Features=SQLEngine /SQLSVCACCOUNT="<DomainName\UserName>" /SQLSVCPASSWORD="xxxxxxxxxxx" /IACCEPTSQLSERVERLICENSETERMS
   ```

<a id="prepare"></a>

## Prepare a stand-alone instance of SQL Server

1. Insert the  SQL Server 
 installation media. From the root folder, double-click Setup.exe. To install from a network share, locate the root folder on the share, and then double-click Setup.exe.

1. The Installation Wizard runs the  SQL Server 
 Installation Center. To prepare an instance of  SQL Server 
, select **Image preparation of a stand-alone instance of  SQL Server 
** on the **Advanced** page.

1. The System Configuration Checker runs a discovery operation on your computer. To continue, select **OK**. You can view the details on the screen by selecting **Show Details**, or as an HTML report by selecting **View detailed report**.

1. On the Product Updates page, the latest available  SQL Server 
 product updates are displayed. If you don't want to include the updates, clear the **Include  SQL Server 
 product updates** check box. If no product updates are discovered,  SQL Server 
 Setup doesn't display this page and auto advances to the **Install Setup Files** page.

1. On the Install Setup files page, Setup provides the progress of downloading, extracting, and installing the Setup files. If an update for  SQL Server 
 Setup is found, and is specified to be included, that update is also installed.

1. The System Configuration Checker verifies the system state of your computer before Setup continues. You can view the details on the screen by selecting **Show Details**, or as an HTML report by selecting **View detailed report**.

1. On the **Prepare Image Type** page, select **Prepare a new instance of  SQL Server 
**.

   The **Prepare Image Type** page is displayed only when you have an existing unconfigured prepared instance of  SQL Server 
 on the machine. You can choose to prepare a new instance of  SQL Server 
 or add sys prep supported features to an existing prepared instance of  SQL Server 
 on the machine. For more information on how to add features to a prepared instance of  SQL Server 
, see [Add Features to a prepared instance](#AddFeatures).

1. On the **License Terms** page, read the license agreement, and then select the check box to accept the license terms and conditions. To help improve  SQL Server 
, you can also enable the feature usage option and send reports to  Microsoft 
.

   
For  SQL Server 2022 (16.x) 
 and later versions, read the Microsoft SQL Server Software License Terms at [aka.ms/useterms](https://aka.ms/useterms).


1. On the **Feature Selection** page, select the components for your installation:

   | Installation | Components |
   | --- | --- |
   | SQL Server |
 SysPrep |  Database Engine 
<br /> SQL Server 
 Replication<br />Full-Text Features<br />Data Quality Services<br /> Reporting Services 
 in Native mode<br /> Analysis Services 
<br />Redistributable Features<br />Shared Features |

   A description for each component group appears in the right pane when you highlight the feature name. You can select any combination of check boxes. For a list of features supported by the editions in  SQL Server 
, see [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md).

   The prerequisites for the selected features are displayed on the right-hand pane.  SQL Server 
 Setup installs the prerequisites that aren't already installed during the installation step described later in this procedure.

1. On the **Prepare Image Rules** page, the System Configuration Checker verifies the system state of your computer before Setup continues. You can view the details on the screen by selecting **Show Details**, or as an HTML report by selecting **View detailed report**.

1. On the Instance Configuration page, specify the Instance ID for the Instance. Select **Next** to continue.

   **Instance ID** - The Instance ID is used to identify installation directories and registry keys for your instance of  SQL Server 
. This is the case for default instances and named instances. If the prepared instance is completed as a default Instance during the Complete step, the instance name is overwritten as MSSQLSERVER. The Instance ID remains the same as specified.

   **Instance root directory** - By default, the instance root directory is \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\
. To specify a non-default root directory, use the field provided, or select **Browse** to locate an installation folder. The directory specified in the prepare step is used during configuration in the Complete step.

   All  SQL Server 
 service packs and upgrades apply to every component of an instance of  SQL Server 
.

   **Installed Instances** - The grid shows instances of  SQL Server 
 that are on the computer where Setup is running.

1. The **Disk Space Requirements** page calculates the required disk space for the features that you specify. Then it compares the required space to the available disk space.

1. The System Configuration Checker runs prepare image rules to validate your computer configuration with the  SQL Server 
 features that you have specified. You can view the details on the screen by selecting **Show Details**, or as an HTML report by selecting **View detailed report**.

1. The **Ready to Prepare Image** page shows a tree view of installation options that were specified during Setup. On this page, Setup indicates whether the Product Update feature is enabled or disabled and the final update version. To continue, select **Prepare**.  SQL Server 
 Setup first installs the required prerequisites for the selected features followed by the feature installation.

1. During installation, the **Prepare Image Progress** page provides status so that you can monitor installation progress as Setup continues.

1. After installation, the **Complete** page provides a link to the summary log file for the installation and other important notes. To complete the  SQL Server 
 installation process, select **Close**.

1. If you're instructed to restart the computer, do so now. It's important to read the message from the Installation Wizard when you finish with Setup. For more information, see [View and read SQL Server Setup log files](view-and-read-sql-server-setup-log-files.md).

1. This completes the prepare step. You might complete the image or deploy the prepared image as described in [Considerations for installing SQL Server using SysPrep](considerations-for-installing-sql-server-using-sysprep.md).

<a id="complete"></a>

## Complete a prepared instance of SQL Server

1. If you have a prepared instance of  SQL Server 
 included in the image of your machine, you see a shortcut in the Start Menu. You can also launch the Installation Center and select **Image completion of a prepared stand-alone instance** on the **Advanced** page.

1. The System Configuration Checker runs a discovery operation on your computer. To continue, select **OK**. You can view the details on the screen by selecting **Show Details**, or as an HTML report by selecting **View detailed report**.

1. On the **Setup Support Files** page, select **Install** to install the Setup support files.

1. The System Configuration Checker verifies the system state of your computer before Setup continues. After the check is complete, select **Next** to continue. You can view the details on the screen by selecting **Show Details**, or as an HTML report by selecting **View detailed report**.

1. On the **Product Key** page, select an option button to indicate whether you're installing a free edition of  SQL Server 
, or a production version of the product that has a PID key. If you're installing Evaluation edition the 180-day trial period starts when you complete this step. For a list of features supported by the editions in  SQL Server 
, see [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md).

1. On the **License Terms** page, read the license agreement, and then select the check box to accept the license terms and conditions. To help improve  SQL Server 
, you can also enable the feature usage option and send reports to  Microsoft 
.

1. On the **Select a Prepared Instance** page select the prepared instance you want to complete from the dropdown list. Select the Unconfigured instance from the **Instance ID** list.

   **Installed instances:** This grid displays all the instances including any prepared instance on this machine.

1. On the **Feature Review** page, you see the selected features and components included in the install during the prepare step. If you wish to add more features to your  SQL Server 
 Instance not included in the prepared instance, you must first complete this step to complete the  SQL Server 
 Instance, then add the features from the **Add Features** on the **Installation Center**.

   You can add features that are available for the product version that you're installing. For a list of features supported by the editions in  SQL Server 
, see [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md).

1. On the Instance Configuration page, specify the Instance name for the prepared Instance. This is the name of the instance once you have completed the configuration of  SQL Server 
. Select **Next** to continue.

   **Instance ID** - The Instance ID is used to identify installation directories and registry keys for your instance of  SQL Server 
. This is the case for default instances and named instances. If the prepared instance is completed as a default Instance during the Complete step, the instance name is overwritten as MSSQLSERVER. The Instance ID remains the same as specified during the Prepare step.

   **Instance root directory** - The directory specified in the prepare step is used, and can't be modified in this step.

   All  SQL Server 
 service packs and upgrades apply to every component of an instance of  SQL Server 
.

   **Installed instances** - The grid shows instances of  SQL Server 
 that are on the computer where Setup is running.

1. Work flow for the rest of this article depends on the features that were selected during the prepare step. You might not see all the pages, depending on the selections.

1. On the **Server Configuration** - Service Accounts page, specify login accounts for  SQL Server 
 services. The actual services that are configured on this page depend on the features that you selected to install.

   You can assign the same login account to all  SQL Server 
 services, or you can configure each service account individually. You can also specify whether services start automatically, are started manually, or are disabled.  Microsoft 
 recommends that you configure service accounts individually to provide least privileges for each service, where  SQL Server 
 services are granted the minimum permissions they need to complete their tasks. For more information, see [SQL Server installation guide](install-sql-server.md) and [Configure Windows service accounts and permissions](../configure-windows/configure-windows-service-accounts-and-permissions.md).

   To specify the same account for all service accounts in this instance of  SQL Server 
, provide credentials in the fields at the bottom of the page.

   **Security Note**  Do not use a blank password. Use a strong password. 


   When you're finished specifying login information for  SQL Server 
 services, select **Next**.

1. Use the **Server Configuration - Collation** tab to specify non-default collations for the  Database Engine 
 and  Analysis Services 
. For more information, see [SQL Server installation guide](install-sql-server.md).

1. Use the  Database Engine 
 Configuration - Account Provisioning page to specify:

   - Security Mode - Select Windows Authentication or Mixed Mode Authentication for your instance of  SQL Server 
. If you select Mixed Mode Authentication, you must provide a strong password for the built-in  SQL Server 
 system administrator account.

     After a device establishes a successful connection to  SQL Server 
, the security mechanism is the same for both Windows Authentication and Mixed Mode. For more information, see [SQL Server installation guide](install-sql-server.md).

   -  SQL Server 
 Administrators - You must specify at least one system administrator for the instance of  SQL Server 
. To add the account under which  SQL Server 
 Setup is running, select **Add Current User**. To add or remove accounts from the list of system administrators, select **Add** or **Remove**, and then edit the list of users, groups, or computers that have administrator privileges for the instance of  SQL Server 
. For more information, see [SQL Server installation guide](install-sql-server.md).

   When you're finished editing the list, select **OK**. Verify the list of administrators in the configuration dialog box. When the list is complete, select **Next**.

1. Use the  Database Engine 
 Configuration - Data Directories page to specify nondefault installation directories. To install to default directories, select **Next**.

   If you specify non-default installation directories, ensure that the installation folders are unique to this instance of  SQL Server 
. None of the directories in this dialog box should be shared with directories from other instances of  SQL Server 
.

   For more information, see [SQL Server installation guide](install-sql-server.md).

1. Use the  Database Engine 
 Configuration - FILESTREAM page to enable FILESTREAM for your instance of  SQL Server 
. For more information, see [SQL Server installation guide](install-sql-server.md).

1. Use the  Reporting Services 
 Configuration page to specify the kind of  Reporting Services 
 installation to create. For more information about  Reporting Services 
 configuration modes, see [SQL Server installation guide](install-sql-server.md).

1. On the **Error Reporting** page, specify the information that you want to send to  Microsoft 
 that will help improve  SQL Server 
. By default, the option for error reporting is enabled.

1. On the **Complete Image Rules** page, the System Configuration Checker runs the complete image rules to validate your computer configuration with the  SQL Server 
 configurations that you have specified. You can view the details on the screen by selecting **Show Details**, or as an HTML report by selecting **View detailed report**.

1. The **Ready to Complete Image** page shows a tree view of installation options that were specified during Setup. To continue, select **Install**.

1. During installation, the **Complete Image Progress** page provides status so that you can monitor installation progress as Setup continues.

1. After installation, the **Complete** page provides a link to the summary log file for the installation and other important notes. To complete the  SQL Server 
 installation process, select **Close**.

1. If you're instructed to restart the computer, do so now. It's important to read the message from the Installation Wizard when you finish with Setup. For more information, see [View and read SQL Server Setup log files](view-and-read-sql-server-setup-log-files.md).

1. This step completes the configuration of the prepared instance of  SQL Server 
 and you have completed the installation of  SQL Server 
.

<a id="AddFeatures"></a>

## Add features to a prepared instance of SQL Server

1. Insert the  SQL Server 
 installation media. From the root folder, double-click Setup.exe. To install from a network share, locate the root folder on the share, and then double-click Setup.exe.

1. The Installation Wizard runs the  SQL Server 
 Installation Center. To add features to a prepared instance of  SQL Server 
, select **Image preparation of a stand-alone instance of  SQL Server 
** on the **Advanced** page.

1. The System Configuration Checker runs a discovery operation on your computer. To continue, select **OK**. You can view the details on the screen by selecting **Show Details**, or as an HTML report by selecting **View detailed report**.

1. On the Setup Support Files page, select **Install** to install the Setup support files.

1. On the **Prepare Image Type** page, select **Add features to an existing prepared instance of  SQL Server 
** option. Select the specific prepared instance you want to add features to from the dropdown list of available prepared instances.

1. On the **Feature Selection** page, specify the features you want to add to the specified prepared instance.

   The prerequisites for the selected features are displayed on the right-hand pane.  SQL Server 
 Setup installs the prerequisites that aren't already installed during the installation step described later in this procedure.

1. On the **Prepare Image Rules** page, the System Configuration Checker verifies the system state of your computer before Setup continues. You can view the details on the screen by selecting **Show Details**, or as an HTML report by selecting **View detailed report**.

1. The Disk Space Requirements page calculates the required disk space for the features that you specify. Then it compares the required space to the available disk space.

1. On the **Prepare Image Rules** page, the System Configuration Checker runs prepare image rules to validate your computer configuration with the  SQL Server 
 features that you have specified. You can view the details on the screen by selecting **Show Details**, or as an HTML report by selecting **View detailed report**.

1. The **Ready to Prepare Image** page shows a tree view of installation options that were specified during Setup. To continue, select **Install**.  SQL Server 
 Setup first installs the required prerequisites for the selected features followed by the feature installation.

1. During installation, the **Prepare Image Progress** page provides status so that you can monitor installation progress as Setup continues.

1. After installation, the **Complete** page provides a link to the summary log file for the installation and other important notes. To complete the  SQL Server 
 installation process, select **Close**.

1. If you're instructed to restart the computer, do so now. It's important to read the message from the Installation Wizard when you finish with Setup. For more information, see [View and read SQL Server Setup log files](view-and-read-sql-server-setup-log-files.md).

<a id="RemoveFeatures"></a>

## Remove features from a prepared instance of SQL Server

1. To begin the uninstall process, from the **Start** menu select **Control Panel** and double-click **Program and Features**.

1. Double-click the  SQL Server 
 component to uninstall and select **Remove**.

1. Setup support rules run to verify your computer configuration. Select **OK** to continue.

1. On the **Select Instance** page, select the prepared instance you want to modify. The name of the prepared instance is displayed as "Unconfigured PreparedInstanceID" where PreparedInstanceID is the instance you select.

1. On the **Select Features** page, specify the features to remove from the  SQL Server 
 instance you specified. Select **Next** to continue.

1. Removal rules run to verify that the operation can complete successfully.

1. On the **Ready to Remove** page, review the list of components and features that will be uninstalled.

1. The **Remove Progress** page displays the status of the operation.

1. On the Complete page, you can review the completion status of the operation. Select **Close** to exit the installation wizard.

<a id="Uninstall"></a>

## Uninstall a prepared instance of SQL Server

1. To begin the uninstall process, from the **Start** menu select **Control Panel** and double-click **Program and Features**.

1. Double-click the  SQL Server 
 component to uninstall and select **Remove**.

1. Setup support rules run to verify your computer configuration. Select **OK** to continue.

1. On the **Select Instance** page, select the prepared instance you want to modify. The name of the prepared instance is displayed as "Unconfigured PreparedInstanceID" where PreparedInstanceID is the instance you select.

1. On the **Select Features** page, specify the features to remove from the  SQL Server 
 instance you specified. Select **Next** to continue.

1. On the **Removal Rules** page, Setup runs rules to verify that the operation can complete successfully.

1. On the **Ready to Remove** page, review the list of components and features that will be uninstalled.

1. The **Remove Progress** page displays the status of the operation.

1. On the Complete page, you can review the completion status of the operation. Select **Close** to exit the installation wizard.

1. Repeat steps 1 to 9 until all components of  SQL Server 
 have been removed.

<a id="bk_Modifying_Uninstalling"></a>

## Modify or uninstall a completed instance of SQL Server

The process to add or remove features or to uninstall a completed instance of  SQL Server 
 is similar to the process to an installed instance of  SQL Server 
. For more information, see the following articles:

- [Add Features to an Instance of SQL Server (Setup)](add-features-to-an-instance-of-sql-server-setup.md)
- [Uninstall an existing instance of SQL Server (Setup)](../../sql-server/install/uninstall-an-existing-instance-of-sql-server-setup.md)

## Related content

- [What is Windows SysPrep](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-vista/cc721940\(v=ws.10\))
- [How does Windows SysPrepWork](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-vista/cc766514\(v=ws.10\))
