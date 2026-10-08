---
title: Install, Configure, or Uninstall SQL Server on Windows from the Command Prompt
description: This article describes command prompt parameters for SQL Server installation on Windows. You can specify features to install, configure, or uninstall.
author: rwestMSFT
ms.author: randolphwest
ms.date: 11/18/2025
ms.service: sql
ms.subservice: install
ms.topic: install-set-up-deploy
ms.custom:
  - intro-installation
  - sfi-ropc-blocked
  - ignite-2025
helpviewer_keywords:
  - "installing SQL Server, command prompt"
  - "installing SQL Server, command line"
  - "installation scripts [SQL Server]"
  - "maintenance scripts [SQL Server]"
  - "REMOVENODE property"
  - "components [SQL Server], removing"
  - "command prompt [SQL Server], SQL Server installations"
  - "ASACCOUNT parameter"
  - "failover clustering [SQL Server], installing"
  - "master database [SQL Server], rebuilding"
  - "SQLCOLLATION parameter"
  - "clusters [SQL Server], installing"
  - "unattended installations [SQL Server]"
  - "modifying collations"
  - "AGTPASSWORD parameter"
  - "USESYSDB parameter"
  - "RSPASSWORD parameter"
  - "AUTOSTART parameter"
  - "ASPASSWORD parameter"
  - "stand-alone installations [SQL Server]"
  - "SAMPLEDATABASESERVER parameter"
  - "adding components"
  - "SAPWD parameter"
  - "scripts [SQL Server], uninstallations"
  - "remote installations [SQL Server]"
  - "components [SQL Server], installing"
  - "TARGETCOMPUTER parameter"
  - "REMOVENODE parameter"
  - "REINSTALLMODE parameter"
  - "scripts [SQL Server], maintenance"
  - "rebuilding registry"
  - "SQLPASSWORD parameter"
  - "rebuilding databases"
  - "IP property"
  - "PIDKEY parameter"
  - "RSCONFIGURATION parameter"
  - "ADDLOCAL parameter"
  - "Setup [SQL Server], command prompt"
  - "REBUILDDATABASE parameter"
  - "SECURITYMODE parameter"
  - "REMOVE property"
  - "DISABLENETWORKPROTOCOLS parameter"
  - "INSTALLDATADIR parameter"
  - "REMOVE parameter"
  - "removing components"
  - "SQLACCOUNT parameter"
  - "parameters [SQL Server], SQL Server installations"
  - "UPGRADE parameter"
  - "shortcuts [SQL Server]"
  - "updating components"
  - "removing SQL Server"
  - "clustered instance of SQL Server"
  - "INSTALLSQLDATADIR parameter"
  - "RSACCOUNT parameter"
  - "ADMINPASSWORD parameter"
  - "GROUP property"
  - "ERRORREPORTING property"
  - "uninstallation scripts [SQL Server]"
  - "AGTACCOUNT parameter"
  - "SAVESYSDB parameter"
  - "INSTALLVS parameter"
  - "INSTANCENAME parameter"
  - "scripts [SQL Server], installations"
  - "rebuilding database, master"
  - "uninstalling SQL Server"
  - "ASCOLLATION parameter"
  - ".ini files"
  - "ADDNODE parameter"
  - "command line installations [SQL Server]"
  - "command prompt installations [SQL Server]"
  - "VS parameter"
  - "INSTALLASDATADIR parameter"
  - "INSTALLSQLDIR parameter"
  - "nodes [Faillover Clustering], command prompt"
  - "INSTALLSQLSHAREDDIR parameter"
monikerRange: ">=sql-server-2017"
---

# Install, configure, or uninstall SQL Server on Windows from the command prompt

<a id="install-sql-server-from-the-command-prompt"></a>


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


Before you run  SQL Server 
 Setup, review [Plan a SQL Server installation](../../sql-server/install/planning-a-sql-server-installation.md).

Installing a new instance of  SQL Server 
 from the command prompt enables you to specify the features to install and how they should be configured. You can also specify silent, basic, or full interaction with the Setup user interface.

To install or configure your  SQL Server 
 instance from the command prompt, open an administrative command prompt and navigate to where `setup.exe` is located within the [SQL Server Setup media](https://www.microsoft.com/sql-server/sql-server-downloads). Run the `setup.exe` command, along with the required and optional parameters that accomplish what you're trying to do:

`C:\SQLMedia\SQLServer2025> setup.exe /[Option] /[Option] = {value}`

The following example installs the  SQL Server Database Engine 
,  SQL Server 
 Analysis Services,  SQL Server 
, and Integration Services in quiet mode:

```console
C:\SQLMedia\SQLServer2025> setup.exe /Q /IACCEPTSQLSERVERLICENSETERMS /ACTION="install"
/PID="AAAAA-BBBBB-CCCCC-DDDDD-EEEEE" /FEATURES=SQL,AS,IS
/INSTANCENAME=MSSQLSERVER /SQLSVCACCOUNT="MyDomain\MyAccount"
/SQLSVCPASSWORD="************" /SQLSYSADMINACCOUNTS="MyDomain\MyAccount "
/AGTSVCACCOUNT="MyDomain\MyAccount" /AGTSVCPASSWORD="************"
/ASSVCACCOUNT="MyDomain\MyAccount" /ASSVCPASSWORD="************"
/ISSVCACCOUNT="MyDomain\MyAccount" /ISSVCPASSWORD="************"
/ASSYSADMINACCOUNTS="MyDomain\MyAccount"
```

To view a list of all possible commands within the console, run the executable with the `/help` flag:

```console
C:\SQLMedia\SQLServer2025> setup.exe /help
```

> **Important:**  
> The `/PRODUCTCOVEREDBYSA` installation parameter was introduced in  SQL Server 2022 (16.x) 
. This parameter indicates whether the provided product key (`/PID=`) license is covered under a Software Assurance or SQL Server Subscription contract, or just a SQL Server license.

The rest of the article provides a detailed description of the available parameters.

> **Note:**  
> When installing through the command line,  SQL Server 
 supports full *quiet mode* with the `/Q` parameter, or *quiet simple* mode with the `/QS` parameter. The `/QS` switch only shows progress, doesn't accept any input, and displays no error messages if encountered. The `/QS` parameter is only supported when `/ACTION=INSTALL` is specified.

Regardless of the installation method, you're required to confirm acceptance of the software license terms as an individual or on behalf of an entity, unless your use of the software is governed by a separate agreement such as a Microsoft volume licensing agreement or a third-party agreement with an ISV or OEM.

The license terms are displayed for review and acceptance in the Setup user interface. Unattended installations (using the `/Q` or `/QS` parameters) must include the `/IACCEPTSQLSERVERLICENSETERMS` parameter. You can review the license terms separately at [Microsoft Software License Terms](https://go.microsoft.com/fwlink/?LinkId=148209).


For  SQL Server 2022 (16.x) 
 and later versions, read the Microsoft SQL Server Software License Terms at [aka.ms/useterms](https://aka.ms/useterms).


Depending on how you received the software (for example, through Microsoft volume licensing), your use of the software can be subject to additional terms and conditions.

Command line installation is supported in the following scenarios:

- Installing, upgrading, or removing an instance and shared components of  SQL Server 
 on a local computer by using syntax and parameters specified from the command prompt.
- Installing, upgrading, or removing a failover cluster instance.
- Upgrading from one  SQL Server 
 edition to another edition of  SQL Server 
.
- Installing an instance of  SQL Server 
 on a local computer by using syntax and parameters specified in a configuration file. You can use this method to copy an installation configuration to multiple computers, or to install multiple nodes of a failover cluster installation.

> **Note:**  
> For local installations, you must run Setup as an administrator. If you install  SQL Server 
 from a remote share, you must use a domain account that has read and execute permissions on the remote share. For failover cluster installations, you must be a local administrator with permissions to login as a service, and to act as part of the operating system on all failover cluster nodes.

<a id="ProperUse"></a>

## Proper use of setup parameters

Use the following guidelines to develop installation commands that have correct syntax:

| Parameter | Example |
| --- | --- |
| /PARAMETER | `/INDICATEPROGRESS` |
| /PARAMETER=true/false | `/SQLSVCINSTANTFILEINIT=True` |
| /PARAMETER=1/0 for Boolean types | `/TCPENABLED=1` |
| /PARAMETER="value" for all single-value parameters.<br /><br />For a parameter that requires a path: `/INSTANCEDIR=C:\Path` or `/INSTANCEDIR="C:\Path"` is supported. | `/PID="PID" /SQLSVCSTARTUPTYPE="Automatic"` |
| /PARAMETER="value1" "value2" "value3" for all multiple-value parameters.<br /><br />**Exception**: `/FEATURES`, which is a multivalued parameter, but its format is `/FEATURES=AS,RS,IS` without a space, comma-delimited. | `/SQLSYSADMINACCOUNTS="Contoso\John" "Contoso\Mary"` |

> **Important:**  
> When installing  SQL Server 
, if you specify the same directory path for `INSTANCEDIR` and `SQLUSERDBDIR`,  SQL Server 
 Agent and Full Text Search don't start due to missing permissions.

> **Note:**  
> The relational server values support the additional terminating backslash formats: backslash (`\`) or two backslash characters (`\\`) for the path.

## Parameter options

The following sections provide parameters to develop command-line installation scripts for install, update, and repair scenarios. Parameters can take different values depending on the chosen scenario.

Parameters that are listed for a  SQL Server Database Engine 
 component are specific to that component.  SQL Server 
 Agent and  SQL Server 
 Browser parameters are applicable when you install the  SQL Server Database Engine 
.

- [Installation parameters](#Install)
- [SysPrep parameters](#SysPrep)
- [Upgrade parameters](#Upgrade)
- [Repair parameters](#Repair)
- [Rebuild system database parameters](#Rebuild)
- [Uninstall parameters](#Uninstall)
- [Failover cluster parameters](#ClusterInstall)
- [Service account parameters](#Accounts)
- [Feature parameters](#Feature)
- [Role parameters](#RoleParameters)
- [Control failover behavior using the /FAILOVERCLUSTERROLLOWNERSHIP parameter](#RollOwnership)
- [Instance ID or InstanceID configuration](#InstanceID)

<a id="Install"></a>

## Installation parameters

Use the parameters in the following table to develop command-line scripts for installing a new instance of  SQL Server 
.

|  SQL Server Database Engine 
 | component | Parameter | Description |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate the installation workflow.<br /><br />Supported values: `Install`. |
| Database Engine |
 | Setup Control | `/SUPPRESSPRIVACYSTATEMENTNOTICE`<br /><br />**Required**, when the `/Q` or `/QS` parameter is specified for unattended installations | Suppresses the privacy notice statement. By using this flag, you're agreeing with the [privacy notice](../../sql-server/sql-server-privacy.md). |
| Database Engine |
 | Setup Control | `/IACCEPTSQLSERVERLICENSETERMS`<br /><br />**Required**, when the `/Q` or `/QS` parameter is specified for unattended installations | Required to acknowledge acceptance of the license terms.<br /><br />Beginning with  SQL Server 2022 (16.x) |
| , read the Microsoft  SQL Server |
 | Software License Terms at [aka.ms/useterms](https://aka.ms/useterms). |
| SQL Server |
 | Python Setup Control | `/IACCEPTPYTHONLICENSETERMS`<br /><br />**Required**, when the `/Q` or `/QS` parameter is specified for unattended installations that include the Anaconda Python package. | Required to acknowledge acceptance of the license terms. |
| SQL Server |
 | R Setup Control | `/IACCEPTROPENLICENSETERMS`<br /><br />**Required**, when the `/Q` or `/QS` parameter is specified for unattended installations that include the Microsoft R Open package. | Required to acknowledge acceptance of the license terms. |
| Database Engine |
 | Setup Control | `/ENU`<br /><br />**Optional** | Use this parameter to install the English version of  SQL Server |
 | on a localized operating system when the installation media includes language packs for both English and the language corresponding to the operating system. |
| Database Engine |
 | Setup Control | `/UpdateEnabled`<br /><br />**Optional** | Specify whether  SQL Server |
 | Setup should discover and include product updates. The valid values are `True` and `False` or `1` and `0`. By default,  SQL Server |
 | Setup includes updates that are found. |
| Database Engine |
 | Setup Control | `/UpdateSource`<br /><br />**Optional** | Specify the location where  SQL Server |
 | Setup obtains product updates. The valid values are `"MU"` to search  Microsoft |
 | Update, a valid folder path, a relative path such as `.\MyUpdates`, or a UNC share. By default,  SQL Server |
 | Setup searches  Microsoft |
 | Update or a Windows Update Service through the Windows Server Update Services. |
| Database Engine |
 | Setup Control | `/CONFIGURATIONFILE`<br /><br />**Optional** | Specifies the [configuration file](install-sql-server-using-a-configuration-file.md) to use. |
| Database Engine |
 | Setup Control | `/ERRORREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions, this value specifies the error reporting for  SQL Server |
| .<br /><br />For more information, see [SQL Server privacy supplement](../../sql-server/sql-server-privacy.md).<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/FEATURES` or `/ROLE`<br /><br />**Required** | Specifies the components to install.<br /><br />Choose `/FEATURES` to specify individual  SQL Server |
 | components to install. For more information, see [Feature Parameters](#Feature) later in this article.<br /><br />Choose `/ROLE` to specify a setup role. Setup roles install  SQL Server |
 | in a predetermined configuration. |
| Database Engine |
 | Setup Control | `/HELP` or `?`<br /><br />**Optional** | Displays usage options for the parameters. |
| Database Engine |
 | Setup Control | `/INDICATEPROGRESS`<br /><br />**Optional** | Specifies that the verbose Setup log file is piped to the console. |
| Database Engine |
 | Setup Control | `/INSTALLSHAREDDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for 64-bit shared components.<br /><br />Default is `%Program Files%\Microsoft SQL Server`<br /><br />Can't be set to `%Program Files(x86)%\Microsoft SQL Server` |
| Database Engine |
 | Setup Control | `/INSTALLSHAREDWOWDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for 32-bit shared components. Supported only on a 64-bit system.<br /><br />Default is `%Program Files(x86)%\Microsoft SQL Server`<br /><br />Can't be set to `%Program Files%\Microsoft SQL Server` |
| Database Engine |
 | Setup Control | `/INSTANCEDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for instance-specific components. |
| Database Engine |
 | Setup Control | `/INSTANCEID`<br /><br />**Optional** | Specifies a nondefault value for an [InstanceID](#InstanceID). |
| Database Engine |
 | Setup Control | `/INSTANCENAME`<br /><br />**Required** | Specifies a  SQL Server Database Engine |
 | instance name.<br /><br />For more information, see [Installation Wizard help](../../sql-server/install/instance-configuration.md). |
| Database Engine |
 | Setup Control | `/PRODUCTCOVEREDBYSA`<br /><br />**Applies to:**  SQL Server 2022 (16.x) |
 | and later versions<br /><br />**Required**, when installing the Azure Extension feature from the command prompt with `AZUREEXTENSION`. | Specifies the license coverage for  SQL Server |
| .<br /><br />`/PRODUCTCOVEREDBYSA=True`, or just `/PRODUCTCOVEREDBYSA`, indicates it's covered under Software Assurance or  SQL Server |
 | subscription.<br /><br />`/PRODUCTCOVEREDBYSA=False`, or omitting the parameter, indicates it's covered under a SQL Server license. |
| Database Engine |
 | Setup Control | `/PID`<br /><br />**Optional** | Specifies the product key for the edition of  SQL Server |
| . If this parameter isn't specified, Evaluation is used.<br /><br />**Note:** If you're installing  SQL Server Express |
| ,  SQL Server Express |
 | with Advanced Services,  SQL Server Express |
 | with tools, |
 | SQL Server Developer , or |
 | SQL Server Evaluation , the PID is predefined. |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| Database Engine |
 | Setup Control | `/QS` or `/QUIETSIMPLE`<br /><br />**Optional** | Specifies that Setup runs and shows progress through the UI, but doesn't accept any input or show any error messages. |
| Database Engine |
 | Setup Control | `/UIMODE`<br /><br />**Optional** | Specifies whether to present only the minimum number of dialog boxes during setup.<br /><br />`/UIMODE` can only be used with the `/ACTION=INSTALL` and `UPGRADE` parameters.<br /><br />Supported values:<br /><br />- `/UIMODE=Normal` is the default for non-Express editions and presents all setup dialog boxes for the selected features.<br /><br />- `/UIMODE=AutoAdvance` is the default for Express editions and skips nonessential dialog boxes.<br /><br />When combined with other parameters, `UIMODE` is overridden. For example, when `/UIMODE=AutoAdvance` and `/ADDCURRENTUSERASSQLADMIN=FALSE` are both provided, the provisioning dialog box isn't auto populated with the current user.<br /><br />The `UIMODE` setting can't be used with the `/Q` or `/QS` parameters. |
| Database Engine |
 | Setup Control | `/SQMREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies feature usage reporting for  SQL Server |
| .<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/HIDECONSOLE`<br /><br />**Optional** | Specifies that the console window is hidden or closed. |
| SQL Server |
 | Agent | `/AGTSVCACCOUNT`<br /><br />**Required** | Specifies the account for the  SQL Server |
 | Agent service. |
| SQL Server |
 | Agent | `/AGTSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for  SQL Server |
 | Agent service account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| SQL Server |
 | Agent | `/AGTSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for the  SQL Server |
 | Agent service.<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |
| PolyBase Engine | `/PBENGSVCACCOUNT`<br /><br />**Optional** | Specifies the account for the engine service.<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE`. |
| PolyBase Engine | `/PBENGSVCPASSWORD`<br /><br />**Optional** | Specifies the password for the engine service account. |
| PolyBase Engine | `/PBENGSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the startup mode for the PolyBase Engine service.<br /><br />Supported values:<br /><br />- `Automatic` (default)<br />- `Disabled`<br />- `Manual` |
| PolyBase Data Movement | `/PBDMSSVCACCOUNT`<br /><br />**Optional** | Specifies the account for the data movement service.<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE`. |
| PolyBase Data Movement | `/PBDMSSVCPASSWORD`<br /><br />**Optional** | Specifies the password for the data movement account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| PolyBase Data Movement | `/PBDMSSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the startup mode for the data movement service.<br /><br />Supported values:<br /><br />- `Automatic` (default)<br />- `Disabled`<br />- `Manual` |
| PolyBase | `/PBPORTRANGE`<br /><br />**Optional** | Specifies a port range with at least six ports for PolyBase services. Example:<br /><br />`/PBPORTRANGE=16450-16460` |
| PolyBase | `/PBSCALEOUT`<br /><br />**Optional** | Specifies if the  SQL Server Database Engine |
 | instance is used as a part of PolyBase Scale-out computational group. Use this option if you're configuring a PolyBase Scale-out computational group including the head node.<br /><br />Supported values: `True`, `False` |
| Analysis Services |
 | `/ASBACKUPDIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | backup files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Backup`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Backup` |
| Analysis Services |
 | `/ASCOLLATION`<br /><br />**Optional** | Specifies the collation setting for  Analysis Services |
| .<br /><br />Default value: `Latin1_General_CI_AS`<br /><br />**Note:** Only Windows collation is supported. Using SQL collation can result in unexpected behavior. |
| Analysis Services |
 | `/ASCONFIGDIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | configuration files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Config`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Config` |
| Analysis Services |
 | `/ASDATADIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | data files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Data`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Data` |
| Analysis Services |
 | `/ASLOGDIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | log files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Log`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Log` |
| Analysis Services |
 | `/ASSERVERMODE`<br /><br />**Optional** | Specifies the server mode of the  Analysis Services |
 | instance. Valid values in a cluster scenario are `MULTIDIMENSIONAL` or `TABULAR`. `ASSERVERMODE` is case-sensitive. All values must be expressed in uppercase. For more information about valid values, see [Install Analysis Services in Tabular Mode](https://learn.microsoft.com/analysis-services/instances/install-windows/install-analysis-services). |
| Analysis Services |
 | `/ASSVCACCOUNT`<br /><br />**Required** | Specifies the account for the  Analysis Services |
 | service. |
| Analysis Services |
 | `/ASSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for the  Analysis Services |
 | service. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Analysis Services |
 | `/ASSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for the  Analysis Services |
 | service.<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |
| Analysis Services |
 | `/ASSYSADMINACCOUNTS`<br /><br />**Required** | Specifies the administrator credentials for  Analysis Services |
| . |
| Analysis Services |
 | `/ASTEMPDIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | temporary files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Temp`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Temp` |
| Analysis Services |
 | `/ASPROVIDERMSOLAP`<br /><br />**Optional** | Specifies whether the MSOLAP provider can run in-process.<br /><br />Default value: - `1` = enabled |
| Analysis Services |
 | `/FARMACCOUNT`<br /><br />**Required**, for `SPI_AS_NewFarm` | Specifies a domain user account for running SharePoint Central Administration services and other essential services in a farm.<br /><br />This parameter is used only for  Analysis Services |
 | instances that are installed through `/ROLE = SPI_AS_NEWFARM`. |
| Analysis Services |
 | `/FARMPASSWORD`<br /><br />**Required**, for `SPI_AS_NewFarm` | Specifies a password for the farm account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Analysis Services |
 | `/PASSPHRASE`<br /><br />**Required**, for `SPI_AS_NewFarm` | Specifies a passphrase that is used to add additional application servers or Web front-end servers to a SharePoint farm.<br /><br />This parameter is used only for  Analysis Services |
 | instances that are installed through `/ROLE = SPI_AS_NEWFARM`. |
| Analysis Services |
 | `/FARMADMINIPORT`<br /><br />**Required**, for `SPI_AS_NewFarm` | Specifies a port used to connect to the SharePoint Central Administration web application.<br /><br />This parameter is used only for  Analysis Services |
 | instances that are installed through `/ROLE = SPI_AS_NEWFARM`. |
| SQL Server |
 | Browser | `/BROWSERSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for  SQL Server |
 | Browser service.<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |
| SQL Server Database Engine |
 | `/ENABLERANU`<br /><br />**Optional** | Enables run-as credentials for  SQL Server Express |
 | installations. |
| SQL Server Database Engine |
 | `/INSTALLSQLDATADIR`<br /><br />**Optional** | Specifies the data directory for  SQL Server |
 | data files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\` |
| SQL Server Database Engine |
 | `/SAPWD`<br /><br />**Required**, when `/SECURITYMODE=SQL` | Specifies the password for the  SQL Server |
 | **SA** account. |
| SQL Server Database Engine |
 | `/SECURITYMODE`<br /><br />**Optional** | Specifies the security mode for  SQL Server |
| .<br /><br />If this parameter isn't supplied, then Windows-only authentication mode is supported.<br /><br />Supported value: `SQL` |
| SQL Server Database Engine |
 | `/SQLBACKUPDIR`<br /><br />**Optional** | Specifies the directory for backup files.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Backup` |
| SQL Server Database Engine |
 | `/SQLCOLLATION`<br /><br />**Optional** | Specifies the collation settings for  SQL Server |
| .<br /><br />The default installation setting is determined by the operating system (OS) locale. The server-level collation can either be changed during setup, or by changing the OS locale before installation. The default collation is set to the oldest available version that is associated with each specific locale. This is due to backward compatibility reasons. Therefore, this isn't always the recommended collation. To take full advantage of  SQL Server |
 | features, change the default installation settings to use Windows collations. For example, for the OS locale `English (United States)` (code page 1252), the default collation during setup is `SQL_Latin1_General_CP1_CI_AS` and can be changed to its closest Windows collation counterpart `Latin1_General_100_CI_AS_SC`.<br /><br />For more information, see [Collation and Unicode support](../../relational-databases/collations/collation-and-unicode-support.md). |
| SQL Server Database Engine |
 | `/ADDCURRENTUSERASSQLADMIN`<br /><br />**Optional** | Adds the current user to the  SQL Server |
 | **sysadmin** fixed server role. The /ADDCURRENTUSERASSQLADMIN parameter can be used when installing Express editions or when `/ROLE=AllFeatures_WithDefaults` is used. For more information, see `/ROLE` later in this article.<br /><br />Use of `/ADDCURRENTUSERASSQLADMIN` is optional, but either `/ADDCURRENTUSERASSQLADMIN` or `/SQLSYSADMINACCOUNTS` is required.<br /><br />Default values:<br /><br />`True` for editions of  SQL Server Express |
| <br /><br />`False` for all other editions |
| SQL Server Database Engine |
 | `/SQLSVCACCOUNT`<br /><br />**Required** | Specifies the startup account for the  SQL Server |
 | service. |
| SQL Server Database Engine |
 | `/SQLSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for `SQLSVCACCOUNT`. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| SQL Server Database Engine |
 | `/SQLSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for the  SQL Server |
 | service.<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |
| SQL Server Database Engine |
 | `/SQLSYSADMINACCOUNTS`<br /><br />**Required** | Use this parameter to provision logins to be members of the **sysadmin** role.<br /><br />For  SQL Server |
 | editions other than  SQL Server Express |
| , `/SQLSYSADMINACCOUNTS` is required. For editions of  SQL Server Express |
| , use of `/SQLSYSADMINACCOUNTS` is optional, but either `/SQLSYSADMINACCOUNTS` or `/ADDCURRENTUSERASSQLADMIN` is required. |
| SQL Server Database Engine |
 | `/SQLTEMPDBDIR`<br /><br />**Optional** | Specifies the directories for `tempdb` data files. When specifying more than one directory, separate the directories with a blank space. If multiple directories are specified, the `tempdb` data files are spread across the directories in a round-robin fashion.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` (System Data Directory)<br /><br />**Note:** This parameter is added to RebuildDatabase scenario as well. |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGDIR`<br /><br />**Optional** | Specifies the directory for `tempdb` log file.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` (System Data Directory)<br /><br />**Note:** This parameter is added to RebuildDatabase scenario as well. |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILECOUNT`<br /><br />**Optional** | Specifies the number of `tempdb` data files to be added by setup. This value can be increased up to the number of cores.<br /><br />Default value:<br /><br />1 for  SQL Server Express |
| <br /><br />8 or the number of cores, whichever is lower for all other editions<br /><br />**Important:** The primary database file for `tempdb` is still `tempdb.mdf`. The additional `tempdb` files are named as `tempdb_mssql_#.ndf` where # represents a unique number for each additional `tempdb` database file created during setup. The purpose of this naming convention is to make them unique. Uninstalling an instance of  SQL Server |
 | deletes the files with naming convention `tempdb_mssql_#.ndf`. Don't use `tempdb_mssql_\*.ndf` naming convention for user database files.<br /><br />**Warning:**  SQL Server Express |
 | isn't supported for configuring this parameter. Setup installs only 1 `tempdb` data file. |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILESIZE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the initial size of each `tempdb` data file.<br /><br />Default = 4 MB for  SQL Server Express |
| , 8 MB for all other editions<br /><br />Min = 4 MB or 8 MB<br /><br />Max = 1024 MB |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILEGROWTH`<br /><br />**Optional** | Specifies the file growth increment of each `tempdb` data file in MB. A value of 0 indicates that automatic growth is off and no additional space is allowed. Setup allows the size up to 1024.<br /><br />Default value: 64. Allowed range: Min = 0, Max = 1024 |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGFILESIZE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the initial size of the `tempdb` log file in MB. Setup allows the size up to 1024.<br /><br />Default value:<br /><br />4 for  SQL Server Express |
| <br /><br />8 for all other editions<br /><br />Allowed range: Min = default value (4 or 8), Max = 1024 |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGFILEGROWTH`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the file growth increment of the `tempdb` log file in MB. A value of 0 indicates that automatic growth is off and no additional space is allowed. Setup allows the size up to 1024.<br /><br />Default value: 64. Allowed range: Min = 0, Max = 1024 |
| SQL Server Database Engine |
 | `/SQLUSERDBDIR`<br /><br />**Optional** | Specifies the directory for the data files for user databases.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` |
| SQL Server Database Engine |
 | `/SQLSVCINSTANTFILEINIT`<br /><br />**Optional** | Enables instant file initialization for  SQL Server |
 | service account. For security and performance considerations, see [Database instant file initialization](../../relational-databases/databases/database-instant-file-initialization.md).<br /><br />Supported values:<br /><br />- `False` (default)<br />- `True` |
| SQL Server Database Engine |
 | `/SQLUSERDBLOGDIR`<br /><br />**Optional** | Specifies the directory for the log files for user databases.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` |
| SQL Server Database Engine |
 | `/SQLMAXDOP=parameter`<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | and later versions<br /><br />**Optional**. If omitted on unattended (silent) installs, MAXDOP aligns with the [max degree of parallelism guidelines](../configure-windows/configure-the-max-degree-of-parallelism-server-configuration-option.md#recommendations). | Specifies the max degree of parallelism, which determines how many processors a single statement can utilize during the execution of a single statement.<br /><br />Default value aligns with the [max degree of parallelism guidelines](../configure-windows/configure-the-max-degree-of-parallelism-server-configuration-option.md#recommendations) |
| SQL Server Database Engine |
 | `/USESQLRECOMMENDEDMEMORYLIMITS`<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | and later versions<br /><br />**Optional**. If `/USESQLRECOMMENDEDMEMORYLIMITS`, `/SQLMINMEMORY`, and `/SQLMAXMEMORY` are omitted on unattended (silent) installs, the  SQL Server Database Engine |
 | uses the default  SQL Server |
 | memory configuration. | Specifies that the  SQL Server Database Engine |
 | uses calculated recommended values that align with the [server memory configuration guidelines](../configure-windows/server-memory-server-configuration-options.md#manually) for a standalone  SQL Server |
 | instance.<br /><br />**Note:** This parameter can't be used with `/SQLMINMEMORY` and `/SQLMAXMEMORY`. |
| SQL Server Database Engine |
 | `/SQLMINMEMORY`<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | and later versions<br /><br />**Optional**. If `/USESQLRECOMMENDEDMEMORYLIMITS`, `/SQLMINMEMORY`, and `/SQLMAXMEMORY` are omitted on unattended (silent) installs, the  SQL Server Database Engine |
 | uses the default  SQL Server |
 | memory configuration. | Specifies the Min Server Memory configuration in MB.<br /><br />Default value: 0.<br /><br />**Note:** This parameter can't be used with `/USESQLRECOMMENDEDMEMORYLIMITS`. |
| SQL Server Database Engine |
 | `/SQLMAXMEMORY`<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | and later versions<br /><br />**Optional**. If `/USESQLRECOMMENDEDMEMORYLIMITS`, `/SQLMINMEMORY`, and `/SQLMAXMEMORY` are omitted on unattended (silent) installs, the  SQL Server Database Engine |
 | uses the default  SQL Server |
 | memory configuration. | Specifies the Max Server Memory configuration in MB.<br /><br />Default value: calculated recommended value that aligns with the [server memory configuration guidelines](../configure-windows/server-memory-server-configuration-options.md#manually) for a standalone  SQL Server |
 | instance.<br /><br />**Note:** This parameter can't be used with `/USESQLRECOMMENDEDMEMORYLIMITS`. |
| FILESTREAM | `/FILESTREAMLEVEL`<br /><br />**Optional** | Specifies the access level for the FILESTREAM feature.<br /><br />Supported values:<br /><br />- `0` = disable FILESTREAM support for this instance. (Default value)<br /><br />- `1` = enable FILESTREAM for  Transact-SQL  access.<br /><br />- `2` = enable FILESTREAM for  Transact-SQL  and file I/O streaming access. (Not valid for Cluster scenarios)<br /><br />- `3` = allow remote clients to have streaming access to FILESTREAM data. |
| FILESTREAM | `/FILESTREAMSHARENAME`<br /><br />**Optional**<br /><br />Required when `FILESTREAMLEVEL` is greater than 1. | Specifies the name of the Windows share in which the FILESTREAM data will be stored. |
| SQL Server |
 | Full Text | `/FTSVCACCOUNT`<br /><br />**Optional** | Specifies the account for Full-Text filter launcher service.<br /><br />This parameter is ignored in  Windows Server 2008 |
 | or higher. ServiceSID is used to help secure the communication between  SQL Server |
 | and Full-text Filter Daemon. If the values aren't provided, the Full-text Filter Launcher Service is disabled. You have to use  SQL Server |
 | Control Manager to change the service account and enable full-text functionality.<br /><br />Default value: `Local Service Account` |
| SQL Server |
 | Full Text | `/FTSVCPASSWORD`<br /><br />**Optional** | Specifies the password for the Full-Text filter launcher service.<br /><br />This parameter is ignored in  Windows Server 2008 |
 | or higher. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Integration Services |
 | `/ISSVCACCOUNT`<br /><br />**Required** | Specifies the account for  Integration Services |
| .<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE` |
| Integration Services |
 | `/ISSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the  Integration Services |
 | password. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Integration Services |
 | `/ISSVCStartupType`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for the  Integration Services |
 | service. |
| SQL Server |
 | Network Configuration | `/NPENABLED`<br /><br />**Optional** | Specifies the state of the Named Pipes protocol for the  SQL Server |
 | service.<br /><br />Supported values:<br /><br />- `0` = disable the Named Pipes protocol<br /><br />- `1` = enable the Named Pipes protocol |
| SQL Server |
 | Network Configuration | `/TCPENABLED`<br /><br />**Optional** | Specifies the state of the TCP protocol for the  SQL Server |
 | service.<br /><br />Supported values:<br /><br />- `0` = disable the TCP protocol<br /><br />- `1` = enable the TCP protocol |
| Reporting Services |
 | `/RSINSTALLMODE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Optional**<br /><br />Available only on `FilesOnlyMode` | Specifies the Install mode for  Reporting Services |
| .<br /><br />Supported values:<br /><br />- `SharePointFilesOnlyMode`<br />- `DefaultNativeMode`<br />- `FilesOnlyMode`<br /><br />**Note:** If the installation includes the  SQL Server |
  | Database Engine |
| , the default `RSINSTALLMODE` is `DefaultNativeMode`.<br /><br />If the installation doesn't include the  SQL Server |
  | Database Engine |
| , the default `RSINSTALLMODE` is `FilesOnlyMode`.<br /><br />If you choose `DefaultNativeMode` but the installation doesn't include the  SQL Server |
  | Database Engine |
| , the installation automatically changes the `RSINSTALLMODE` to `FilesOnlyMode`. |
| Reporting Services |
 | `/RSSVCACCOUNT`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Required** | Specifies the startup account for the  Reporting Services |
| . |
| Reporting Services |
 | `/RSSVCPASSWORD`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**[Required](#Accounts)** | Specifies the password for the startup account for the  Reporting Services |
 | service. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Reporting Services |
 | `/RSSVCStartupType`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for  Reporting Services |
| .<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |
| Python/Machine Learning Services (In-Database) | `/MPYCACHEDIRECTORY`<br /><br />**Optional** | Reserved for future use. Use `%TEMP%` to store Python .CAB files for installation on a computer that doesn't have an internet connection. |
| R/Machine Learning Services (In-Database) | `/MRCACHEDIRECTORY`<br /><br />**Optional** | Use this parameter to specify the Cache directory for Microsoft R Open,  SQL Server 2016 (13.x) |
 | R Services,  SQL Server 2016 (13.x) |
 | R Server (Standalone), or R feature support in  SQL Server |
 | Machine Learning Services or Machine Learning Server (Standalone). This setting is typically used when installing R components from the [command prompt on a computer without Internet access](../../machine-learning/install/sql-ml-component-install-without-internet-access.md). |
| Java/Language Extensions | `/SQL_INST_JAVA`,<br />`/SQLJAVADIR = "path"`<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | only<br /><br />**Optional** | Specifies installing Java with Language Extensions. If `/SQL_INST_JAVA` is provided without the `/SQLJAVADIR` parameter, it's assumed you want to install the Zulu Open JRE that is provided by the installation media.<br /><br />Providing a path for `/SQLJAVADIR` indicates you would like to use an already-installed JRE or JDK. |
| Azure extension for SQL Server | `/FEATURES=AZUREEXTENSION`<br /><br />**Applies to:**  SQL Server 2022 (16.x) |
 | and later versions<br /><br />**Optional** | For  SQL Server 2022 (16.x) |
 | and later versions, connect the instance to Azure Arc.<br /><br />For  SQL Server 2025 (17.x) |
| , connect the instance to Azure Arc or  SQL Server |
 | on Azure VM. |
| Azure extension for SQL Server | `/AZURESUBSCRIPTIONID`<br /><br />**Applies to:**  SQL Server 2022 (16.x) |
 | and later versions<br /><br />**Optional** | Azure subscription where the  SQL Server |
 | instance resource will be created. |
| Azure extension for SQL Server | `/AZURERESOURCEGROUP`<br /><br />**Applies to:**  SQL Server 2022 (16.x) |
 | and later versions<br /><br />**Optional** | Azure resource group where the  SQL Server |
 | instance resource will be created. |
| Azure extension for SQL Server | `/AZUREREGION`<br /><br />**Applies to:**  SQL Server 2022 (16.x) |
 | and later versions<br /><br />**Optional** | Azure region where the  SQL Server |
 | instance resource will be created. |
| Azure extension for SQL Server | `/AZURETENANTID`<br /><br />**Applies to:**  SQL Server 2022 (16.x) |
 | and later versions<br /><br />**Optional** | Azure tenant ID in which the service principal exists. |
| Azure extension for SQL Server | `/AZURESERVICEPRINCIPAL`<br /><br />**Applies to:**  SQL Server 2022 (16.x) |
 | and later versions<br /><br />**Optional** | Service principal to authenticate against given tenant ID, subscription, and resource group. |
| Azure extension for SQL Server | `/AZURESERVICEPRINCIPALSECRET`<br /><br />**Applies to:**  SQL Server 2022 (16.x) |
 | and later versions<br /><br />**Optional** | Service principal secret. |
| Azure extension for SQL Server | `/AZUREARCPROXY`<br /><br />**Applies to:**  SQL Server 2022 (16.x) |
 | and later versions<br /><br />**Optional** | Name of the proxy server used to connect to Azure Arc. |

### Sample syntax

To install a new, stand-alone instance with the  SQL Server Database Engine 
, Replication, and Full-Text Search components and enable instant file initialization for  SQL Server Database Engine 
.

```console
setup.exe /q /ACTION=Install /FEATURES=SQL /INSTANCENAME=MSSQLSERVER /SQLSVCACCOUNT="<DomainName\UserName>" /SQLSVCPASSWORD="<password>" /SQLSYSADMINACCOUNTS="<DomainName\UserName>" /AGTSVCACCOUNT="NT AUTHORITY\NETWORK SERVICE" /SQLSVCINSTANTFILEINIT="True" /IACCEPTSQLSERVERLICENSETERMS
```

### Install and connect to Azure

Beginning with  SQL Server 2022 (16.x) 
, you can install the Azure Arc agent with the Azure extension for SQL Server using SQL Server setup. When you install the Azure Arc agent and SQL Server extension, you automatically Arc-enable all the instances on the host, which registers the SQL Server instances as resources in Azure and make them eligible to have additional Azure management services attached.

Beginning with  SQL Server 2025 (17.x) 
, you can install the Azure extension for SQL Server using SQL Server setup on Azure virtual machines. When you install the Azure SQL Server extension, you automatically register with SQL Server on Azure VM service and enable the additional management capabilities that the service provides.

The following example installs a SQL Server instance, the Azure Arc agent (if not on an Azure VM), and the Azure extension for SQL Server so that the SQL Server instance is connected to Azure after installation. Before you run the example, replace the information in angle brackets ( `< ... >` ) with your information.

```console
setup.exe /qs /ACTION=Install /FEATURES=SQLEngine,AZUREEXTENSION /INSTANCENAME=<instance name> /SQLSYSADMINACCOUNTS="<sysadmin account>" /IACCEPTSQLSERVERLICENSETERMS /AZURESUBSCRIPTIONID="<Azure subscription>" /AZURETENANTID="<Azure tenant ID>" /AZURERESOURCEGROUP="<resource group name>" /AZURESERVICEPRINCIPAL="<service principal>" /AZURESERVICEPRINCIPALSECRET="<secret>" /AZUREREGION=<Azure region>
```

The following example installs the Azure Arc agent and Azure extension for SQL Server to manage all the existing  SQL Server 
 instances that are installed.

```console
setup.exe /qs /ACTION=Install /FEATURES=AZUREEXTENSION /IACCEPTSQLSERVERLICENSETERMS /AZURESUBSCRIPTIONID="<Azure subscription>" /AZURETENANTID="<Azure tenant ID>" /AZURERESOURCEGROUP="<resource group name>" /AZURESERVICEPRINCIPAL="<service principal>" /AZURESERVICEPRINCIPALSECRET="<secret>" /AZUREREGION=<Azure region>
```

The following example shows how to remove the Azure extension for SQL Server using SQL Server setup:

> **Note:**  
> This command doesn't physically uninstall the Azure extension for SQL Server. Instead, the command marks this feature as not selected in the setup. To remove the Azure resource for this instance, go to [Azure portal](https://ms.portal.azure.com/#blade/Microsoft_Azure_HybridCompute/AzureArcCenterBlade/sqlServers) and delete.

```console
setup.exe /qs /ACTION=Uninstall /FEATURES=AZUREEXTENSION /IACCEPTSQLSERVERLICENSETERMS
```

For more information about connecting to Azure Arc or  SQL Server 
 on Azure VM, see:

- [SQL Server enabled by Azure Arc](../../sql-server/azure-arc/overview.md)
- [Connect your SQL Server to Azure Arc](../../sql-server/azure-arc/connect.md)
- [What is SQL Server on Azure Windows Virtual Machines?](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview)
- [Register Windows SQL Server VM with SQL IaaS Agent extension](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/sql-agent-extension-manually-register-single-vm)

<a id="SysPrep"></a>

## SysPrep parameters

For more information about  SQL Server 
 SysPrep, see [Install SQL Server with SysPrep](install-sql-server-using-sysprep.md).

### Prepare image parameters

Use the parameters in the following table to develop command-line scripts for preparing an instance of  SQL Server 
 without configuring it.

|  SQL Server Database Engine 
 | component | Parameter | Description |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate the installation workflow.<br /><br />Supported values: `PrepareImage` |
| Database Engine |
 | Setup Control | `/IACCEPTSQLSERVERLICENSETERMS`<br /><br />**Required**, when the `/Q` or `/QS` parameter is specified for unattended installations | Required to acknowledge acceptance of the license terms.<br /><br />Beginning with  SQL Server 2022 (16.x) |
| , read the Microsoft  SQL Server |
 | Software License Terms at [aka.ms/useterms](https://aka.ms/useterms). |
| Database Engine |
 | Setup Control | `/ENU`<br /><br />**Optional** | Use this parameter to install the English version of  SQL Server |
 | on a localized operating system when the installation media includes language packs for both English and the language corresponding to the operating system. |
| Database Engine |
 | Setup Control | `/UpdateEnabled`<br /><br />**Optional** | Specify whether  SQL Server |
 | Setup should discover and include product updates. The valid values are `True` and `False` or `1` and `0`. By default,  SQL Server |
 | Setup includes updates that are found. |
| Database Engine |
 | Setup Control | `/UpdateSource`<br /><br />**Optional** | Specify the location where  SQL Server |
 | Setup obtains product updates. The valid values are `"MU"` to search  Microsoft |
 | Update, a valid folder path, a relative path such as `.\MyUpdates`, or a UNC share. By default,  SQL Server |
 | Setup searches  Microsoft |
 | Update or a Windows Update Service through the Windows Server Update Services. |
| Database Engine |
 | Setup Control | `/CONFIGURATIONFILE`<br /><br />**Optional** | Specifies the [configuration file](install-sql-server-using-a-configuration-file.md) to use. |
| Database Engine |
 | Setup Control | `/FEATURES`<br /><br />**Required** | Specifies [components](#Feature) to install.<br /><br />Supported values are `SQLEngine`, `Replication`, `FullText`, `DQ`, `AS`, `AS_SPI`, `RS`, `RS_SHP`, `RS_SHPWFE`, `DQC`, `Conn`, `IS`, `BC`, `SDK`, `DREPLAY_CTLR`, `DREPLAY_CLT`, `SNAC_SDK`, `SQLODBC`, `SQLODBC_SDK`, `LocalDB`, `MDS`, `POLYBASE` <sup>1</sup> |
| Database Engine |
 | Setup Control | `/HELP` or `?`<br /><br />**Optional** | Displays usage options for the parameters. |
| Database Engine |
 | Setup Control | `/HIDECONSOLE`<br /><br />**Optional** | Specifies that the console window is hidden or closed. |
| Database Engine |
 | Setup Control | `/INDICATEPROGRESS`<br /><br />**Optional** | Specifies that the verbose Setup log file is piped to the console. |
| Database Engine |
 | Setup Control | `/INSTALLSHAREDDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for 64-bit shared components.<br /><br />Default is `%Program Files%\Microsoft SQL Server`<br /><br />Can't be set to `%Program Files(x86)%\Microsoft SQL Server` |
| Database Engine |
 | Setup Control | `/INSTANCEDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for instance-specific components. |
| Database Engine |
 | Setup Control | `/INSTANCEID`<br /><br />**Required** for instance features. | Specifies an InstanceID for the instance that's being prepared. |
| PolyBase Engine | `/PBENGSVCACCOUNT`<br /><br />**Optional** | Specifies the account for the engine service.<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE`. |
| PolyBase Data Movement | `/PBDMSSVCPASSWORD`<br /><br />**Optional** | Specifies the password for the data movement account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| PolyBase Engine | `/PBENGSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the startup mode for the PolyBase Engine service.<br /><br />Supported values:<br /><br />- `Automatic` (default)<br />- `Disabled`<br />- `Manual` |
| PolyBase | `/PBPORTRANGE`<br /><br />**Optional** | Specifies a port range with at least six ports for PolyBase services. Example:<br /><br />`/PBPORTRANGE=16450-16460` |
| PolyBase | `/PBSCALEOUT`<br /><br />**Optional** | Specifies if the  SQL Server Database Engine |
 | instance is used as a part of PolyBase Scale-out computational group. Use this option if you're configuring a PolyBase Scale-out computational group including the head node.<br /><br />Supported values: `True`, `False` |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| Database Engine |
 | Setup Control | `/QS` or `/QUIETSIMPLE`<br /><br />**Optional** | Specifies that Setup runs and shows progress through the UI, but doesn't accept any input or show any error messages. |

<sup>1</sup> Distributed Replay, SDK, and SNAC aren't available in  SQL Server 2022 (16.x) 
 and later versions.

#### Sample syntax

To prepare a new, stand-alone instance with the  SQL Server Database Engine 
, Replication, and Full-Text Search components, and  Reporting Services 
.

```console
setup.exe /q /ACTION=PrepareImage /FEATURES=SQL,RS /InstanceID =<MYINST> /IACCEPTSQLSERVERLICENSETERMS
```

### Complete image parameters

Use the parameters in the following table to develop command-line scripts for completing and configuring a prepared instance of  SQL Server 
.

|  SQL Server 
 | component | Parameter | Description |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate the installation workflow.<br /><br />Supported values: `CompleteImage` |
| Database Engine |
 | Setup Control | `/IACCEPTSQLSERVERLICENSETERMS`<br /><br />**Required**, when the `/Q` or `/QS` parameter is specified for unattended installations | Required to acknowledge acceptance of the license terms.<br /><br />Beginning with  SQL Server 2022 (16.x) |
| , read the Microsoft  SQL Server |
 | Software License Terms at [aka.ms/useterms](https://aka.ms/useterms). |
| Database Engine |
 | Setup Control | `/ENU`<br /><br />**Optional** | Use this parameter to install the English version of  SQL Server |
 | on a localized operating system when the installation media includes language packs for both English and the language corresponding to the operating system. |
| Database Engine |
 | Setup Control | `/CONFIGURATIONFILE`<br /><br />**Optional** | Specifies the [configuration file](install-sql-server-using-a-configuration-file.md) to use. |
| Database Engine |
 | Setup Control | `/ERRORREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies the error reporting for  SQL Server |
| .<br /><br />For more information, see [SQL Server privacy supplement](../../sql-server/sql-server-privacy.md).<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/HELP` or `?`<br /><br />**Optional** | Displays usage options for the parameters. |
| Database Engine |
 | Setup Control | `/INDICATEPROGRESS`<br /><br />**Optional** | Specifies that the verbose Setup log file is piped to the console. |
| Database Engine |
 | Setup Control | `/INSTANCEID`<br /><br />**Optional** | Use the Instance ID specified during the prepare image step.<br /><br />Supported values: `InstanceID` of a prepared instance. |
| Database Engine |
 | Setup Control | `/INSTANCENAME`<br /><br />**Optional** | Specifies a  SQL Server |
 | instance name for the instance that's being completed.<br /><br />For more information, see [Installation Wizard help](../../sql-server/install/instance-configuration.md). |
| Database Engine |
 | Setup Control | `/PRODUCTCOVEREDBYSA`<br /><br />**Applies to:**  SQL Server 2022 (16.x) |
 | and later versions<br /><br />**Required**, when installing the Azure Extension feature from the command prompt with `AZUREEXTENSION`. | Specifies the license coverage for  SQL Server |
| .<br /><br />`/PRODUCTCOVEREDBYSA=True`, or just `/PRODUCTCOVEREDBYSA`, indicates it's covered under Software Assurance or  SQL Server |
 | subscription.<br /><br />`/PRODUCTCOVEREDBYSA=False`, or omitting the parameter, indicates it's covered under a SQL Server license. |
| Database Engine |
 | Setup Control | `/PID`<br /><br />**Optional** | Specifies the product key for the edition of  SQL Server |
| . If this parameter isn't specified, Evaluation is used.<br /><br />**Note:** If you're installing  SQL Server Express |
| ,  SQL Server Express |
 | with Advanced Services,  SQL Server Express |
 | with tools, |
 | SQL Server Developer , or |
 | SQL Server Evaluation , the PID is predefined. |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| Database Engine |
 | Setup Control | `/QS` or `/QUIETSIMPLE`<br /><br />**Optional** | Specifies that Setup runs and shows progress through the UI, but doesn't accept any input or show any error messages. |
| Database Engine |
 | Setup Control | `/SQMREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies feature usage reporting for  SQL Server |
| .<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/HIDECONSOLE`<br /><br />**Optional** | Specifies that the console window is hidden or closed. |
| SQL Server |
 | Agent | `/AGTSVCACCOUNT`<br /><br />**Required** | Specifies the account for the  SQL Server |
 | Agent service. |
| SQL Server |
 | Agent | `/AGTSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for  SQL Server |
 | Agent service account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| SQL Server |
 | Agent | `/AGTSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for the  SQL Server |
 | Agent service.<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |
| PolyBase Engine | `/PBENGSVCACCOUNT`<br /><br />**Optional** | Specifies the account for the engine service.<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE`. |
| PolyBase Data Movement | `/PBDMSSVCPASSWORD`<br /><br />**Optional** | Specifies the password for the data movement account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| PolyBase Engine | `/PBENGSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the startup mode for the PolyBase Engine service.<br /><br />Supported values:<br /><br />- `Automatic` (default)<br />- `Disabled`<br />- `Manual` |
| PolyBase | `/PBPORTRANGE`<br /><br />**Optional** | Specifies a port range with at least six ports for PolyBase services. Example:<br /><br />`/PBPORTRANGE=16450-16460` |
| PolyBase | `/PBSCALEOUT`<br /><br />**Optional** | Specifies if the  SQL Server Database Engine |
 | instance is used as a part of PolyBase Scale-out computational group. Use this option if you're configuring a PolyBase Scale-out computational group including the head node.<br /><br />Supported values: `True`, `False` |
| SQL Server |
 | Browser | `/BROWSERSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for  SQL Server |
 | Browser service.<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |
| SQL Server Database Engine |
 | `/ENABLERANU`<br /><br />**Optional** | Enables run-as credentials for  SQL Server Express |
 | installations. |
| SQL Server Database Engine |
 | `/INSTALLSQLDATADIR`<br /><br />**Optional** | Specifies the data directory for  SQL Server |
 | data files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\` |
| SQL Server Database Engine |
 | `/SAPWD`<br /><br />**Required**, when `/SECURITYMODE=SQL` | Specifies the password for the  SQL Server |
 | **SA** account. |
| SQL Server Database Engine |
 | `/SECURITYMODE`<br /><br />**Optional** | Specifies the security mode for  SQL Server |
| .<br /><br />If this parameter isn't supplied, then Windows-only authentication mode is supported.<br /><br />Supported value: `SQL` |
| SQL Server Database Engine |
 | `/SQLBACKUPDIR`<br /><br />**Optional** | Specifies the directory for backup files.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Backup` |
| SQL Server Database Engine |
 | `/SQLCOLLATION`<br /><br />**Optional** | Specifies the collation settings for  SQL Server |
| .<br /><br />The default value is based on the locale of your Windows operating system. For more information, see [Collation and Unicode support](../../relational-databases/collations/collation-and-unicode-support.md). |
| SQL Server Database Engine |
 | `/SQLSVCACCOUNT`<br /><br />**Required** | Specifies the startup account for the  SQL Server |
 | service. |
| SQL Server Database Engine |
 | `/SQLSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for `SQLSVCACCOUNT`. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| SQL Server Database Engine |
 | `/SQLSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for the  SQL Server |
 | service.<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |
| SQL Server Database Engine |
 | `/SQLSYSADMINACCOUNTS`<br /><br />**Required** | Use this parameter to provision logins to be members of the **sysadmin** role.<br /><br />For  SQL Server |
 | editions other than  SQL Server Express |
| , `/SQLSYSADMINACCOUNTS` is required. For editions of  SQL Server Express |
| , use of `/SQLSYSADMINACCOUNTS` is optional, but either `/SQLSYSADMINACCOUNTS` or `/ADDCURRENTUSERASSQLADMIN` is required. |
| SQL Server Database Engine |
 | `/SQLTEMPDBDIR`<br /><br />**Optional** | Specifies the directories for `tempdb` data files. When specifying more than one directory, separate the directories with a blank space. If multiple directories are specified, the `tempdb` data files are spread across the directories in a round-robin fashion.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` (System Data Directory)<br /><br />**Note:** This parameter is added to RebuildDatabase scenario as well. |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGDIR`<br /><br />**Optional** | Specifies the directory for `tempdb` log file.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` (System Data Directory)<br /><br />**Note:** This parameter is added to RebuildDatabase scenario as well. |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILESIZE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the initial size of each `tempdb` data file.<br /><br />Default = 4 MB for  SQL Server Express |
| , 8 MB for all other editions<br /><br />Min = 4 MB or 8 MB<br /><br />Max = 1024 MB |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILEGROWTH`<br /><br />**Optional** | Specifies the file growth increment of each `tempdb` data file in MB. A value of 0 indicates that automatic growth is off and no additional space is allowed. Setup allows the size up to 1024.<br /><br />Default value: 64. Allowed range: Min = 0, Max = 1024 |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGFILESIZE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the initial size of the `tempdb` log file in MB. Setup allows the size up to 1024.<br /><br />Default value:<br /><br />4 for  SQL Server Express |
| <br /><br />8 for all other editions<br /><br />Allowed range: Min = default value (4 or 8), Max = 1024 |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGFILEGROWTH`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the file growth increment of the `tempdb` log file in MB. A value of 0 indicates that automatic growth is off and no additional space is allowed. Setup allows the size up to 1024.<br /><br />Default value: 64. Allowed range: Min = 0, Max = 1024 |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILECOUNT`<br /><br />**Optional** | Specifies the number of `tempdb` data files to be added by setup. This value can be increased up to the number of cores.<br /><br />Default value:<br /><br />1 for  SQL Server Express |
| <br /><br />8 or the number of cores, whichever is lower for all other editions<br /><br />**Important:** The primary database file for `tempdb` is still `tempdb.mdf`. The additional `tempdb` files are named as `tempdb_mssql_#.ndf` where # represents a unique number for each additional `tempdb` database file created during setup. The purpose of this naming convention is to make them unique. Uninstalling an instance of  SQL Server |
 | deletes the files with naming convention `tempdb_mssql_#.ndf`. Don't use `tempdb_mssql_\*.ndf` naming convention for user database files.<br /><br />**Warning:**  SQL Server Express |
 | isn't supported for configuring this parameter. Setup installs only 1 `tempdb` data file. |
| SQL Server Database Engine |
 | `/SQLUSERDBDIR`<br /><br />**Optional** | Specifies the directory for the data files for user databases.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` |
| SQL Server Database Engine |
 | `/SQLUSERDBLOGDIR`<br /><br />**Optional** | Specifies the directory for the log files for user databases.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` |
| FILESTREAM | `/FILESTREAMLEVEL`<br /><br />**Optional** | Specifies the access level for the FILESTREAM feature.<br /><br />Supported values:<br /><br />- `0` = disable FILESTREAM support for this instance. (Default value)<br /><br />- `1` = enable FILESTREAM for  Transact-SQL  access.<br /><br />- `2` = enable FILESTREAM for  Transact-SQL  and file I/O streaming access. (Not valid for Cluster scenarios)<br /><br />- `3` = allow remote clients to have streaming access to FILESTREAM data. |
| FILESTREAM | `/FILESTREAMSHARENAME`<br /><br />**Optional**<br /><br />Required when `FILESTREAMLEVEL` is greater than 1. | Specifies the name of the Windows share in which the FILESTREAM data will be stored. |
| SQL Server |
 | Full Text | `/FTSVCACCOUNT`<br /><br />**Optional** | Specifies the account for Full-Text filter launcher service.<br /><br />This parameter is ignored in  Windows Server 2008 |
 | or higher. ServiceSID is used to help secure the communication between  SQL Server |
 | and Full-text Filter Daemon. If the values aren't provided, the Full-text Filter Launcher Service is disabled. You have to use  SQL Server |
 | Control Manager to change the service account and enable full-text functionality.<br /><br />Default value: `Local Service Account` |
| SQL Server |
 | Full Text | `/FTSVCPASSWORD`<br /><br />**Optional** | Specifies the password for the Full-Text filter launcher service.<br /><br />This parameter is ignored in  Windows Server 2008 |
 | or higher. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| SQL Server |
 | Network Configuration | `/NPENABLED`<br /><br />**Optional** | Specifies the state of the Named Pipes protocol for the  SQL Server |
 | service.<br /><br />Supported values:<br /><br />- `0` = disable the Named Pipes protocol<br /><br />- `1` = enable the Named Pipes protocol |
| SQL Server |
 | Network Configuration | `/TCPENABLED`<br /><br />**Optional** | Specifies the state of the TCP protocol for the  SQL Server |
 | service.<br /><br />Supported values:<br /><br />- `0` = disable the TCP protocol<br /><br />- `1` = enable the TCP protocol |
| Reporting Services |
 | `/RSINSTALLMODE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Optional**<br /><br />Available only on `FilesOnlyMode` | Specifies the Install mode for  Reporting Services |
| .<br /><br />Supported values:<br /><br />- `SharePointFilesOnlyMode`<br />- `DefaultNativeMode`<br />- `FilesOnlyMode`<br /><br />**Note:** If the installation includes the  SQL Server |
  | Database Engine |
| , the default `RSINSTALLMODE` is `DefaultNativeMode`.<br /><br />If the installation doesn't include the  SQL Server |
  | Database Engine |
| , the default `RSINSTALLMODE` is `FilesOnlyMode`.<br /><br />If you choose `DefaultNativeMode` but the installation doesn't include the  SQL Server |
  | Database Engine |
| , the installation automatically changes the `RSINSTALLMODE` to `FilesOnlyMode`. |
| Reporting Services |
 | `/RSSVCACCOUNT`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Required** | Specifies the startup account for the  Reporting Services |
| . |
| Reporting Services |
 | `/RSSVCPASSWORD`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**[Required](#Accounts)** | Specifies the password for the startup account for the  Reporting Services |
 | service. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Reporting Services |
 | `/RSSVCStartupType`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for  Reporting Services |
| .<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |

#### Sample syntax

To complete a prepared, stand-alone instance that includes  SQL Server Database Engine 
, Replication, and Full-Text Search components.

```console
setup.exe /q /ACTION=CompleteImage /INSTANCENAME=MYNEWINST /INSTANCEID=<MYINST> /SQLSVCACCOUNT="<DomainName\UserName>" /SQLSVCPASSWORD="<password>" /SQLSYSADMINACCOUNTS="<DomainName\UserName>" /AGTSVCACCOUNT="NT AUTHORITY\NETWORK SERVICE" /IACCEPTSQLSERVERLICENSETERMS
```

<a id="Upgrade"></a>

## Upgrade parameters

Use the parameters in the following table to develop command-line scripts for upgrade.

|  SQL Server Database Engine 
 | component | Parameter | Description |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate the installation workflow.<br /><br />Supported values:<br /><br />- `Upgrade`<br />- `EditionUpgrade`<br /><br />The value `EditionUpgrade` is used to upgrade an existing edition of  SQL Server |
 | to a different edition. For more information about the supported version and edition upgrades, see [Supported version and edition upgrades (SQL Server 2025)](supported-version-and-edition-upgrades-2025.md). |
| Database Engine |
 | Setup Control | `/IACCEPTSQLSERVERLICENSETERMS`<br /><br />**Required**, when the `/Q` or `/QS` parameter is specified for unattended installations | Required to acknowledge acceptance of the license terms.<br /><br />Beginning with  SQL Server 2022 (16.x) |
| , read the Microsoft  SQL Server |
 | Software License Terms at [aka.ms/useterms](https://aka.ms/useterms). |
| Database Engine |
 | Setup Control | `/ENU`<br /><br />**Optional** | Use this parameter to install the English version of  SQL Server |
 | on a localized operating system when the installation media includes language packs for both English and the language corresponding to the operating system. |
| Database Engine |
 | Setup Control | `/UpdateEnabled`<br /><br />**Optional** | Specify whether  SQL Server |
 | Setup should discover and include product updates. The valid values are `True` and `False` or `1` and `0`. By default,  SQL Server |
 | Setup includes updates that are found. |
| Database Engine |
 | Setup Control | `/UpdateSource`<br /><br />**Optional** | Specify the location where  SQL Server |
 | Setup obtains product updates. The valid values are `"MU"` to search  Microsoft |
 | Update, a valid folder path, a relative path such as `.\MyUpdates`, or a UNC share. By default,  SQL Server |
 | Setup searches  Microsoft |
 | Update or a Windows Update Service through the Windows Server Update Services. |
| Database Engine |
 | Setup Control | `/CONFIGURATIONFILE`<br /><br />**Optional** | Specifies the [configuration file](install-sql-server-using-a-configuration-file.md) to use. |
| Database Engine |
 | Setup Control | `/ERRORREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies the error reporting for  SQL Server |
| .<br /><br />For more information, see [SQL Server privacy supplement](../../sql-server/sql-server-privacy.md).<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/HELP` or `?`<br /><br />**Optional** | Displays usage options for the parameters. |
| Database Engine |
 | Setup Control | `/INDICATEPROGRESS`<br /><br />**Optional** | Specifies that the verbose Setup log file is piped to the console. |
| Database Engine |
 | Setup Control | `/ INSTANCEDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for shared components. |
| Database Engine |
 | Setup Control | `/INSTANCEID`<br /><br />**Required**, when you upgrade from  SQL Server 2008 (10.0.x) |
 | or later versions.<br /><br />**Optional**, when you upgrade from  SQL Server 2005 (9.x) |
| . | Specifies a nondefault value for an [InstanceID](#InstanceID). |
| Database Engine |
 | Setup Control | `/INSTANCENAME`<br /><br />**Required** | Specifies a  SQL Server Database Engine |
 | instance name.<br /><br />For more information, see [Installation Wizard help](../../sql-server/install/instance-configuration.md). |
| Database Engine |
 | Setup Control | `/PID`<br /><br />**Optional** | Specifies the product key for the edition of  SQL Server |
| . If this parameter isn't specified, Evaluation is used.<br /><br />**Note:** If you're installing  SQL Server Express |
| ,  SQL Server Express |
 | with Advanced Services,  SQL Server Express |
 | with tools, |
 | SQL Server Developer , or |
 | SQL Server Evaluation , the PID is predefined. |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| Database Engine |
 | Setup Control | `/UIMODE`<br /><br />**Optional** | Specifies whether to present only the minimum number of dialog boxes during setup.<br /><br />`/UIMODE` can only be used with the `/ACTION=INSTALL` and `UPGRADE` parameters.<br /><br />Supported values:<br /><br />- `/UIMODE=Normal` is the default for non-Express editions and presents all setup dialog boxes for the selected features.<br /><br />- `/UIMODE=AutoAdvance` is the default for Express editions and skips nonessential dialog boxes.<br /><br />When combined with other parameters, `UIMODE` is overridden. For example, when `/UIMODE=AutoAdvance` and `/ADDCURRENTUSERASSQLADMIN=FALSE` are both provided, the provisioning dialog box isn't auto populated with the current user.<br /><br />The `UIMODE` setting can't be used with the `/Q` or `/QS` parameters. |
| Database Engine |
 | Setup Control | `/SQMREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies feature usage reporting for  SQL Server |
| .<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/HIDECONSOLE`<br /><br />**Optional** | Specifies that the console window is hidden or closed. |
| SQL Server |
 | Browser | `/BROWSERSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for  SQL Server |
 | Browser service.<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |
| SQL Server |
 | Full-Text | `/FTUPGRADEOPTION`<br /><br />**Optional** | Specifies the Full-Text catalog upgrade option.<br /><br />Supported values:<br /><br />- `REBUILD`<br />- `RESET`<br />- `IMPORT` |
| SQL Server |
 | Data Quality Services | `/IACCEPTDQUNINSTALL`<br /><br />**Optional** | Removes Data Quality Services during upgrade to  SQL Server 2025 (17.x) |
 | and later versions. For more information, see [Upgrade fails if Data Quality Services is installed](../../sql-server/sql-server-2025-known-issues.md#upgrade-fails-if-data-quality-services-is-installed).<br /><br />**Applies to:**  SQL Server 2025 (17.x) |
 | and later versions. |
| Integration Services |
 | `/ISSVCACCOUNT`<br /><br />**Required** | Specifies the account for  Integration Services |
| .<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE` |
| Integration Services |
 | `/ISSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the  Integration Services |
 | password. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Integration Services |
 | `/ISSVCStartupType`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for the  Integration Services |
 | service. |
| Reporting Services |
 | `/RSUPGRADEDATABASEACCOUNT`<br /><br />**Optional** | The property is only used when upgrading a SharePoint mode Report Server that is version 2008 R2 or earlier. Additional upgrade operations are performed for report servers that use the older SharePoint mode architecture, which was changed in  SQL Server 2012 (11.x) |
  | Reporting Services |
| . If this option isn't included with the command-line installation, the default service account for the old report server instance is used. If this property is used, supply the password for the account using the `/RSUPGRADEPASSWORD` property. |
| Reporting Services |
 | `/RSUPGRADEPASSWORD`<br /><br />**Optional** | Password of the existing Report Server service account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Reporting Services |
 | `/ALLOWUPGRADEFORSSRSSHAREPOINTMODE` | The switch is required when upgrading a SharePoint Mode installation that is based on the SharePoint shared service architecture. The switch isn't needed for upgrading non-shared service versions of  Reporting Services |
| . |

### Sample syntax

To upgrade an existing instance or failover cluster node from a previous  SQL Server Database Engine 
 version,

```console
setup.exe /q /ACTION=upgrade /INSTANCEID = <INSTANCEID>/INSTANCENAME=MSSQLSERVER /RSUPGRADEDATABASEACCOUNT="<Provide a SQL Server logon account that can connect to the report server during upgrade>" /RSUPGRADEPASSWORD="<Provide a password for the report server upgrade account>" /ISSVCAccount="NT AUTHORITY\NETWORK SERVICE" /IACCEPTSQLSERVERLICENSETERMS
```

<a id="Repair"></a>

## Repair parameters

Use the parameters in the following table to develop command-line scripts for repair.

|  SQL Server Database Engine 
 | component | Parameter | Description |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate the repair workflow.<br /><br />Supported values: `Repair` |
| Database Engine |
 | Setup Control | `/ENU`<br /><br />**Optional** | Use this parameter to install the English version of  SQL Server |
 | on a localized operating system when the installation media includes language packs for both English and the language corresponding to the operating system. |
| Database Engine |
 | Setup Control | `/FEATURES`<br /><br />**Required** | Specifies [components](#Feature) to repair. |
| Database Engine |
 | Setup Control | `/INSTANCENAME`<br /><br />**Required** | Specifies a  SQL Server Database Engine |
 | instance name.<br /><br />For more information, see [Installation Wizard help](../../sql-server/install/instance-configuration.md). |
| PolyBase Engine | `/PBENGSVCACCOUNT`<br /><br />**Optional** | Specifies the account for the engine service.<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE`. |
| PolyBase Data Movement | `/PBDMSSVCPASSWORD`<br /><br />**Optional** | Specifies the password for the data movement account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| PolyBase Engine | `/PBENGSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the startup mode for the PolyBase Engine service.<br /><br />Supported values:<br /><br />- `Automatic` (default)<br />- `Disabled`<br />- `Manual` |
| PolyBase | `/PBPORTRANGE`<br /><br />**Optional** | Specifies a port range with at least six ports for PolyBase services. Example:<br /><br />`/PBPORTRANGE=16450-16460` |
| PolyBase | `/PBSCALEOUT`<br /><br />**Optional** | Specifies if the  SQL Server Database Engine |
 | instance is used as a part of PolyBase Scale-out computational group. Use this option if you're configuring a PolyBase Scale-out computational group including the head node.<br /><br />Supported values: `True`, `False` |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| Database Engine |
 | Setup Control | `/HIDECONSOLE`<br /><br />**Optional** | Specifies that the console window is hidden or closed. |

### Sample syntax

Repair an instance and shared components.

```console
setup.exe /q /ACTION=Repair /INSTANCENAME=<instancename>
```

<a id="Rebuild"></a>

## Rebuild system database parameters

Use the parameters in the following table to develop command-line scripts for rebuilding the `master`, `model`, `msdb`, and `tempdb` system databases. For more information, see [Rebuild system databases](../../relational-databases/databases/rebuild-system-databases.md).

|  SQL Server Database Engine 
 | component | Parameter | Description |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate the rebuild database workflow.<br /><br />Supported values: `RebuildDatabase` |
| Database Engine |
 | Setup Control | `/INSTANCENAME`<br /><br />**Required** | Specifies a  SQL Server Database Engine |
 | instance name.<br /><br />For more information, see [Installation Wizard help](../../sql-server/install/instance-configuration.md). |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| SQL Server Database Engine |
 | `/SQLCOLLATION`<br /><br />**Optional** | Specifies a new server-level collation.<br /><br />The default value is based on the locale of your Windows operating system. For more information, see [Collation and Unicode support](../../relational-databases/collations/collation-and-unicode-support.md). |
| SQL Server Database Engine |
 | `/SAPWD`<br /><br />**Required**, when `/SECURITYMODE=SQL` was specified during installation of the instance. | Specifies the password for  SQL Server |
 | **SA** account. |
| SQL Server Database Engine |
 | `/SQLSYSADMINACCOUNTS`<br /><br />**Required** | Use this parameter to provision logins to be members of the **sysadmin** role.<br /><br />For  SQL Server |
 | editions other than  SQL Server Express |
| , `/SQLSYSADMINACCOUNTS` is required. For editions of  SQL Server Express |
| , use of `/SQLSYSADMINACCOUNTS` is optional, but either `/SQLSYSADMINACCOUNTS` or `/ADDCURRENTUSERASSQLADMIN` is required. |
| SQL Server Database Engine |
 | `/SQLTEMPDBDIR`<br /><br />**Optional** | Specifies the directories for `tempdb` data files. When specifying more than one directory, separate the directories with a blank space. If multiple directories are specified, the `tempdb` data files are spread across the directories in a round-robin fashion.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` (System Data Directory)<br /><br />**Note:** This parameter is added to RebuildDatabase scenario as well. |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGDIR`<br /><br />**Optional** | Specifies the directory for `tempdb` log file.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` (System Data Directory)<br /><br />**Note:** This parameter is added to RebuildDatabase scenario as well. |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILECOUNT`<br /><br />**Optional** | Specifies the number of `tempdb` data files to be added by setup. This value can be increased up to the number of cores.<br /><br />Default value:<br /><br />1 for  SQL Server Express |
| <br /><br />8 or the number of cores, whichever is lower for all other editions<br /><br />**Important:** The primary database file for `tempdb` is still `tempdb.mdf`. The additional `tempdb` files are named as `tempdb_mssql_#.ndf` where # represents a unique number for each additional `tempdb` database file created during setup. The purpose of this naming convention is to make them unique. Uninstalling an instance of  SQL Server |
 | deletes the files with naming convention `tempdb_mssql_#.ndf`. Don't use `tempdb_mssql_\*.ndf` naming convention for user database files.<br /><br />**Warning:**  SQL Server Express |
 | isn't supported for configuring this parameter. Setup installs only 1 `tempdb` data file. |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILESIZE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the initial size of each `tempdb` data file.<br /><br />Default = 4 MB for  SQL Server Express |
| , 8 MB for all other editions<br /><br />Min = 4 MB or 8 MB<br /><br />Max = 1024 MB |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILEGROWTH`<br /><br />**Optional** | Specifies the file growth increment of each `tempdb` data file in MB. A value of 0 indicates that automatic growth is off and no additional space is allowed. Setup allows the size up to 1024.<br /><br />Default value: 64. Allowed range: Min = 0, Max = 1024 |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGFILESIZE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the initial size of the `tempdb` log file in MB. Setup allows the size up to 1024.<br /><br />Default value:<br /><br />4 for  SQL Server Express |
| <br /><br />8 for all other editions<br /><br />Allowed range: Min = default value (4 or 8), Max = 1024 |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGFILEGROWTH`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the file growth increment of the `tempdb` log file in MB. A value of 0 indicates that automatic growth is off and no additional space is allowed. Setup allows the size up to 1024.<br /><br />Default value: 64. Allowed range: Min = 0, Max = 1024 |

<a id="Uninstall"></a>

## Uninstall parameters

Use the parameters in the following table to develop command-line scripts for uninstallation.

|  SQL Server Database Engine 
 | component | Parameter | Description |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate the uninstall work flow.<br /><br />Supported values: `Uninstall` |
| Database Engine |
 | Setup Control | `/CONFIGURATIONFILE`<br /><br />**Optional** | Specifies the [configuration file](install-sql-server-using-a-configuration-file.md) to use. |
| Database Engine |
 | Setup Control | `/FEATURES`<br /><br />**Required** | Specifies [components](#Feature) to uninstall. |
| Database Engine |
 | Setup Control | `/HELP` or `?`<br /><br />**Optional** | Displays usage options for the parameters. |
| Database Engine |
 | Setup Control | `/INDICATEPROGRESS`<br /><br />**Optional** | Specifies that the verbose Setup log file is piped to the console. |
| Database Engine |
 | Setup Control | `/INSTANCENAME`<br /><br />**Required** | Specifies a  SQL Server Database Engine |
 | instance name.<br /><br />For more information, see [Installation Wizard help](../../sql-server/install/instance-configuration.md). |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| Database Engine |
 | Setup Control | `/HIDECONSOLE`<br /><br />**Optional** | Specifies that the console window is hidden or closed. |

### Sample syntax

Use the following command to uninstall an existing instance of  SQL Server 
 from the command prompt.

```console
setup.exe /Action=Uninstall /FEATURES=SQL,AS,RS,IS,Tools /INSTANCENAME=MSSQLSERVER
```

To remove a named instance, specify the name of the instance instead of `MSSQLSERVER` in the previous example.

To uninstall an existing  SQL Server 
 update from the command prompt, you can find the complete uninstall command for a specific component in the Windows registry, using the following registry path. Look for the `"UninstallString"` key.

> **Warning:**  
>  Incorrectly editing the registry can severely damage your system. Before making changes to the registry, we recommend that you back up any valued data on the computer. 


The following example shows the path for a specific KB update.

```output
Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\KB5014356
```

You can get the uninstall command from `"UninstallString"` in this registry key. For example:

```console
C:\Program Files\Microsoft SQL Server\150\Setup Bootstrap\Update Cache\KB5014356\GDR\setup.exe" /Action=RemovePatch /AllInstances
```

<a id="ClusterInstall"></a>

## Failover cluster parameters

Before you install a  SQL Server Database Engine 
 failover cluster instance, review the following articles:

- [Hardware and software requirements for SQL Server 2025](../../sql-server/install/hardware-and-software-requirements-for-installing-sql-server-2025.md)

- [Security considerations for a SQL Server installation](../../sql-server/install/security-considerations-for-a-sql-server-installation.md)

- [Before Installing Failover Clustering](../../sql-server/failover-clusters/install/before-installing-failover-clustering.md)

- [Always On failover cluster instances (SQL Server)](../../sql-server/failover-clusters/windows/always-on-failover-cluster-instances-sql-server.md)

  > **Important:**  
  > All failover cluster installation commands require an underlying Windows cluster. All the nodes that are part of a  SQL Server Database Engine 
 failover cluster must be part of the same Windows cluster.

Test and modify the following failover cluster installation scripts to meet the needs of your organization.

### Integrated install failover cluster parameters

Use the parameters in the following table to develop command-line scripts for failover cluster installation.

For more information about Integrated Installation, see [Always On failover cluster instances (SQL Server)](../../sql-server/failover-clusters/windows/always-on-failover-cluster-instances-sql-server.md).

> **Note:**  
> To add more nodes after the installation, use [Add Node](#AddNode) action.

|  SQL Server Database Engine 
 | component | Parameter | Details |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate the failover cluster installation work flow.<br /><br />Supported value: `InstallFailoverCluster` |
| Database Engine |
 | Setup Control | `/IACCEPTSQLSERVERLICENSETERMS`<br /><br />**Required**, when the `/Q` or `/QS` parameter is specified for unattended installations | Required to acknowledge acceptance of the license terms.<br /><br />Beginning with  SQL Server 2022 (16.x) |
| , read the Microsoft  SQL Server |
 | Software License Terms at [aka.ms/useterms](https://aka.ms/useterms). |
| Database Engine |
 | Setup Control | `/ENU`<br /><br />**Optional** | Use this parameter to install the English version of  SQL Server |
 | on a localized operating system when the installation media includes language packs for both English and the language corresponding to the operating system. |
| Database Engine |
 | Setup Control | `/FAILOVERCLUSTERGROUP`<br /><br />**Optional** | Specifies the name of the resource group to be used for the  SQL Server Database Engine |
 | failover cluster. It can be the name of an existing cluster group or the name of a new resource group.<br /><br />Default value: `SQL Server (<InstanceName>)` |
| PolyBase Engine | `/PBENGSVCACCOUNT`<br /><br />**Optional** | Specifies the account for the engine service.<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE`. |
| PolyBase Data Movement | `/PBDMSSVCPASSWORD`<br /><br />**Optional** | Specifies the password for the data movement account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| PolyBase Engine | `/PBENGSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the startup mode for the PolyBase Engine service.<br /><br />Supported values:<br /><br />- `Automatic` (default)<br />- `Disabled`<br />- `Manual` |
| PolyBase | `/PBPORTRANGE`<br /><br />**Optional** | Specifies a port range with at least six ports for PolyBase services. Example:<br /><br />`/PBPORTRANGE=16450-16460` |
| PolyBase | `/PBSCALEOUT`<br /><br />**Optional** | Specifies if the  SQL Server Database Engine |
 | instance is used as a part of PolyBase Scale-out computational group. Use this option if you're configuring a PolyBase Scale-out computational group including the head node.<br /><br />Supported values: `True`, `False` |
| Database Engine |
 | Setup Control | `/UpdateEnabled`<br /><br />**Optional** | Specify whether  SQL Server |
 | Setup should discover and include product updates. The valid values are `True` and `False` or `1` and `0`. By default,  SQL Server |
 | Setup includes updates that are found. |
| Database Engine |
 | Setup Control | `/UpdateSource`<br /><br />**Optional** | Specify the location where  SQL Server |
 | Setup obtains product updates. The valid values are `"MU"` to search  Microsoft |
 | Update, a valid folder path, a relative path such as `.\MyUpdates`, or a UNC share. By default,  SQL Server |
 | Setup searches  Microsoft |
 | Update or a Windows Update Service through the Windows Server Update Services. |
| Database Engine |
 | Setup Control | `/CONFIGURATIONFILE`<br /><br />**Optional** | Specifies the [configuration file](install-sql-server-using-a-configuration-file.md) to use. |
| Database Engine |
 | Setup Control | `/ERRORREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies the error reporting for  SQL Server |
| .<br /><br />For more information, see [SQL Server privacy supplement](../../sql-server/sql-server-privacy.md).<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/FEATURES`<br /><br />**Required** | Specifies [components](#Feature) to install. |
| Database Engine |
 | Setup Control | `/HELP` or `?`<br /><br />**Optional** | Displays usage options for the parameters. |
| Database Engine |
 | Setup Control | `/INDICATEPROGRESS`<br /><br />**Optional** | Specifies that the verbose Setup log file is piped to the console. |
| Database Engine |
 | Setup Control | `/INSTALLSHAREDDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for 64-bit shared components.<br /><br />Default is `%Program Files%\Microsoft SQL Server`<br /><br />Can't be set to `%Program Files(x86)%\Microsoft SQL Server` |
| Database Engine |
 | Setup Control | `/INSTALLSHAREDWOWDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for 32-bit shared components. Supported only on a 64-bit system.<br /><br />Default is `%Program Files(x86)%\Microsoft SQL Server`<br /><br />Can't be set to `%Program Files%\Microsoft SQL Server` |
| Database Engine |
 | Setup Control | `/INSTANCEDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for instance-specific components. |
| Database Engine |
 | Setup Control | `/INSTANCEID`<br /><br />**Optional** | Specifies a nondefault value for an [InstanceID](#InstanceID). |
| Database Engine |
 | Setup Control | `/INSTANCENAME`<br /><br />**Required** | Specifies a  SQL Server Database Engine |
 | instance name.<br /><br />For more information, see [Installation Wizard help](../../sql-server/install/instance-configuration.md). |
| Database Engine |
 | Setup Control | `/PRODUCTCOVEREDBYSA`<br /><br />**Applies to:**  SQL Server 2022 (16.x) |
 | and later versions<br /><br />**Required**, when installing the Azure Extension feature from the command prompt with `AZUREEXTENSION`. | Specifies the license coverage for  SQL Server |
| .<br /><br />`/PRODUCTCOVEREDBYSA=True`, or just `/PRODUCTCOVEREDBYSA`, indicates it's covered under Software Assurance or  SQL Server |
 | subscription.<br /><br />`/PRODUCTCOVEREDBYSA=False`, or omitting the parameter, indicates it's covered under a SQL Server license. |
| Database Engine |
 | Setup Control | `/PID`<br /><br />**Optional** | Specifies the product key for the edition of  SQL Server |
| . If this parameter isn't specified, Evaluation is used.<br /><br />**Note:** If you're installing  SQL Server Express |
| ,  SQL Server Express |
 | with Advanced Services,  SQL Server Express |
 | with tools, |
 | SQL Server Developer , or |
 | SQL Server Evaluation , the PID is predefined. |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| Database Engine |
 | Setup Control | `/QS` or `/QUIETSIMPLE`<br /><br />**Optional** | Specifies that Setup runs and shows progress through the UI, but doesn't accept any input or show any error messages. |
| Database Engine |
 | Setup Control | `/SQMREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies feature usage reporting for  SQL Server |
| .<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/HIDECONSOLE`<br /><br />**Optional** | Specifies that the console window is hidden or closed. |
| Database Engine |
 | Setup Control | `/FAILOVERCLUSTERDISKS`<br /><br />**Optional** | Specifies the list of shared disks to be included in the  SQL Server Database Engine |
 | failover cluster resource group.<br /><br />Default value: The first drive is used as the default drive for all databases. |
| Database Engine |
 | Setup Control | `/FAILOVERCLUSTERIPADDRESSES`<br /><br />**Required** | Specifies an encoded IP address. The encodings are semicolon-delimited (;) and follow the format *\<IP Type>;\<address>;\<network name>;\<subnet mask>*. Supported IP types include DHCP, IPv4, and IPv6.<br /><br />You can specify multiple failover cluster IP addresses with a space in between. See the following examples:<br /><br />`FAILOVERCLUSTERIPADDRESSES=DEFAULT`<br /><br />`FAILOVERCLUSTERIPADDRESSES=IPv4;DHCP;ClusterNetwork1`<br /><br />`FAILOVERCLUSTERIPADDRESSES=IPv6;DHCP;ClusterNetwork1`<br /><br />`FAILOVERCLUSTERIPADDRESSES=IPv6;2041:0:1a0f::8a5b:131c` |
| Database Engine |
 | Setup Control | `/FAILOVERCLUSTERNETWORKNAME`<br /><br />**Required** | Specifies the network name for the new  SQL Server Database Engine |
 | failover cluster. This name is used to identify the new  SQL Server Database Engine |
 | failover cluster instance on the network. |
| SQL Server |
 | Agent | `/AGTSVCACCOUNT`<br /><br />**Required** | Specifies the account for the  SQL Server |
 | Agent service. |
| SQL Server |
 | Agent | `/AGTSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for  SQL Server |
 | Agent service account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Analysis Services |
 | `/ASBACKUPDIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | backup files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Backup`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Backup` |
| Analysis Services |
 | `/ASCOLLATION`<br /><br />**Optional** | Specifies the collation setting for  Analysis Services |
| .<br /><br />Default value: `Latin1_General_CI_AS`<br /><br />**Note:** Only Windows collation is supported. Using SQL collation can result in unexpected behavior. |
| Analysis Services |
 | `/ASCONFIGDIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | configuration files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Config`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Config` |
| Analysis Services |
 | `/ASDATADIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | data files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Data`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Data` |
| Analysis Services |
 | `/ASLOGDIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | log files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Log`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Log` |
| Analysis Services |
 | `/ASSYSADMINACCOUNTS`<br /><br />**Required** | Specifies the administrator credentials for  Analysis Services |
| . |
| Analysis Services |
 | `/ASTEMPDIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | temporary files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Temp`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Temp` |
| Analysis Services |
 | `/ASPROVIDERMSOLAP`<br /><br />**Optional** | Specifies whether the MSOLAP provider can run in-process.<br /><br />Default value: - `1` = enabled |
| Analysis Services |
 | `/ASSERVERMODE`<br /><br />**Optional** | Specifies the server mode of the  Analysis Services |
 | instance. Valid values in a cluster scenario are `MULTIDIMENSIONAL` or `TABULAR`. `ASSERVERMODE` is case-sensitive. All values must be expressed in uppercase. For more information about valid values, see [Install Analysis Services in Tabular Mode](https://learn.microsoft.com/analysis-services/instances/install-windows/install-analysis-services). |
| SQL Server Database Engine |
 | `/INSTALLSQLDATADIR`<br /><br />**Required** | Specifies the data directory for  SQL Server |
 | data files.<br /><br />The data directory must be specified and on a shared cluster disk. |
| SQL Server Database Engine |
 | `/SAPWD`<br /><br />**Required**, when `/SECURITYMODE=SQL` | Specifies the password for the  SQL Server |
 | **SA** account. |
| SQL Server Database Engine |
 | `/SECURITYMODE`<br /><br />**Optional** | Specifies the security mode for  SQL Server |
| .<br /><br />If this parameter isn't supplied, then Windows-only authentication mode is supported.<br /><br />Supported value: `SQL` |
| SQL Server Database Engine |
 | `/SQLBACKUPDIR`<br /><br />**Optional** | Specifies the directory for backup files.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Backup` |
| SQL Server Database Engine |
 | `/SQLCOLLATION`<br /><br />**Optional** | Specifies the collation settings for  SQL Server |
| .<br /><br />The default value is based on the locale of your Windows operating system. For more information, see [Collation and Unicode support](../../relational-databases/collations/collation-and-unicode-support.md). |
| SQL Server Database Engine |
 | `/SQLSVCACCOUNT`<br /><br />**Required** | Specifies the startup account for the  SQL Server |
 | service. |
| SQL Server Database Engine |
 | `/SQLSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for `SQLSVCACCOUNT`. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| SQL Server Database Engine |
 | `/SQLSYSADMINACCOUNTS`<br /><br />**Required** | Use this parameter to provision logins to be members of the **sysadmin** role.<br /><br />For  SQL Server |
 | editions other than  SQL Server Express |
| , `/SQLSYSADMINACCOUNTS` is required. For editions of  SQL Server Express |
| , use of `/SQLSYSADMINACCOUNTS` is optional, but either `/SQLSYSADMINACCOUNTS` or `/ADDCURRENTUSERASSQLADMIN` is required. |
| SQL Server Database Engine |
 | `/SQLUSERDBDIR`<br /><br />**Optional** | Specifies the directory for the data files for user databases.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` |
| SQL Server Database Engine |
 | `/SQLTEMPDBDIR`<br /><br />**Optional** | Specifies the directories for `tempdb` data files. When specifying more than one directory, separate the directories with a blank space. If multiple directories are specified, the `tempdb` data files are spread across the directories in a round-robin fashion.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` (System Data Directory)<br /><br />**Note:** This parameter is added to RebuildDatabase scenario as well. |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGDIR`<br /><br />**Optional** | Specifies the directory for `tempdb` log file.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` (System Data Directory)<br /><br />**Note:** This parameter is added to RebuildDatabase scenario as well. |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILECOUNT`<br /><br />**Optional** | Specifies the number of `tempdb` data files to be added by setup. This value can be increased up to the number of cores.<br /><br />Default value:<br /><br />1 for  SQL Server Express |
| <br /><br />8 or the number of cores, whichever is lower for all other editions<br /><br />**Important:** The primary database file for `tempdb` is still `tempdb.mdf`. The additional `tempdb` files are named as `tempdb_mssql_#.ndf` where # represents a unique number for each additional `tempdb` database file created during setup. The purpose of this naming convention is to make them unique. Uninstalling an instance of  SQL Server |
 | deletes the files with naming convention `tempdb_mssql_#.ndf`. Don't use `tempdb_mssql_\*.ndf` naming convention for user database files.<br /><br />**Warning:**  SQL Server Express |
 | isn't supported for configuring this parameter. Setup installs only 1 `tempdb` data file. |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILESIZE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the initial size of each `tempdb` data file.<br /><br />Default = 4 MB for  SQL Server Express |
| , 8 MB for all other editions<br /><br />Min = 4 MB or 8 MB<br /><br />Max = 1024 MB |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILEGROWTH`<br /><br />**Optional** | Specifies the file growth increment of each `tempdb` data file in MB. A value of 0 indicates that automatic growth is off and no additional space is allowed. Setup allows the size up to 1024.<br /><br />Default value: 64. Allowed range: Min = 0, Max = 1024 |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGFILESIZE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the initial size of the `tempdb` log file in MB. Setup allows the size up to 1024.<br /><br />Default value:<br /><br />4 for  SQL Server Express |
| <br /><br />8 for all other editions<br /><br />Allowed range: Min = default value (4 or 8), Max = 1024 |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGFILEGROWTH`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the file growth increment of the `tempdb` log file in MB. A value of 0 indicates that automatic growth is off and no additional space is allowed. Setup allows the size up to 1024.<br /><br />Default value: 64. Allowed range: Min = 0, Max = 1024 |
| SQL Server Database Engine |
 | `/SQLUSERDBLOGDIR`<br /><br />**Optional** | Specifies the directory for the log files for user databases.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` |
| FILESTREAM | `/FILESTREAMLEVEL`<br /><br />**Optional** | Specifies the access level for the FILESTREAM feature.<br /><br />Supported values:<br /><br />- `0` = disable FILESTREAM support for this instance. (Default value)<br /><br />- `1` = enable FILESTREAM for  Transact-SQL  access.<br /><br />- `2` = enable FILESTREAM for  Transact-SQL  and file I/O streaming access. (Not valid for Cluster scenarios)<br /><br />- `3` = allow remote clients to have streaming access to FILESTREAM data. |
| FILESTREAM | `/FILESTREAMSHARENAME`<br /><br />**Optional**<br /><br />Required when `FILESTREAMLEVEL` is greater than 1. | Specifies the name of the Windows share in which the FILESTREAM data will be stored. |
| SQL Server |
 | Full Text | `/FTSVCACCOUNT`<br /><br />**Optional** | Specifies the account for Full-Text filter launcher service.<br /><br />This parameter is ignored in  Windows Server 2008 |
 | or higher. ServiceSID is used to help secure the communication between  SQL Server |
 | and Full-text Filter Daemon. If the values aren't provided, the Full-text Filter Launcher Service is disabled. You have to use  SQL Server |
 | Control Manager to change the service account and enable full-text functionality.<br /><br />Default value: `Local Service Account` |
| SQL Server |
 | Full Text | `/FTSVCPASSWORD`<br /><br />**Optional** | Specifies the password for the Full-Text filter launcher service.<br /><br />This parameter is ignored in  Windows Server 2008 |
 | or higher. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Integration Services |
 | `/ISSVCACCOUNT`<br /><br />**Required** | Specifies the account for  Integration Services |
| .<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE` |
| Integration Services |
 | `/ISSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the  Integration Services |
 | password. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Integration Services |
 | `/ISSVCStartupType`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for the  Integration Services |
 | service. |
| Reporting Services |
 | `/RSINSTALLMODE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Optional**<br /><br />Available only on `FilesOnlyMode` | Specifies the Install mode for  Reporting Services |
| .<br /><br />Supported values:<br /><br />- `SharePointFilesOnlyMode`<br />- `DefaultNativeMode`<br />- `FilesOnlyMode`<br /><br />**Note:** If the installation includes the  SQL Server |
  | Database Engine |
| , the default `RSINSTALLMODE` is `DefaultNativeMode`.<br /><br />If the installation doesn't include the  SQL Server |
  | Database Engine |
| , the default `RSINSTALLMODE` is `FilesOnlyMode`.<br /><br />If you choose `DefaultNativeMode` but the installation doesn't include the  SQL Server |
  | Database Engine |
| , the installation automatically changes the `RSINSTALLMODE` to `FilesOnlyMode`. |
| Reporting Services |
 | `/RSSVCACCOUNT`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Required** | Specifies the startup account for the  Reporting Services |
| . |
| Reporting Services |
 | `/RSSVCPASSWORD`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**[Required](#Accounts)** | Specifies the password for the startup account for the  Reporting Services |
 | service. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Reporting Services |
 | `/RSSVCStartupType`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for  Reporting Services |
| .<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |

We recommend that you use Service SID instead of domain groups.

#### Additional notes

The  Database Engine 
 and  Analysis Services 
 are the only components that are cluster-aware. Other features aren't cluster-aware and don't have high availability through failover.

#### Sample syntax

To install a single-node  SQL Server Database Engine 
 failover cluster instance with the  Database Engine 
 and  Analysis Services 
, default instance.

```console
setup.exe /q /ACTION=InstallFailoverCluster /InstanceName=MSSQLSERVER /INDICATEPROGRESS /ASSYSADMINACCOUNTS="<DomainName\UserName>" /ASDATADIR=<Drive>:\OLAP\Data /ASLOGDIR=<Drive>:\OLAP\Log /ASBACKUPDIR=<Drive>:\OLAP\Backup /ASCONFIGDIR=<Drive>:\OLAP\Config /ASTEMPDIR=<Drive>:\OLAP\Temp /FAILOVERCLUSTERDISKS="<Cluster Disk Resource Name - for example, 'Disk S:'" /FAILOVERCLUSTERNETWORKNAME="<Insert Network Name>" /FAILOVERCLUSTERIPADDRESSES="IPv4;xx.xxx.xx.xx;Cluster Network;xxx.xxx.xxx.x" /FAILOVERCLUSTERGROUP="MSSQLSERVER" /Features=AS,SQL /ASSVCACCOUNT="<DomainName\UserName>" /ASSVCPASSWORD="xxxxxxxxxxx" /AGTSVCACCOUNT="<DomainName\UserName>" /AGTSVCPASSWORD="xxxxxxxxxxx" /INSTALLSQLDATADIR="<Drive>:\<Path>\MSSQLSERVER" /SQLCOLLATION="SQL_Latin1_General_CP1_CS_AS" /SQLSVCACCOUNT="<DomainName\UserName>" /SQLSVCPASSWORD="xxxxxxxxxxx" /SQLSYSADMINACCOUNTS="<DomainName\UserName> /IACCEPTSQLSERVERLICENSETERMS
```

### Prepare failover cluster parameters

Use the parameters in the following table to develop command-line scripts for failover cluster prepare. This is the first step in advanced cluster installation, where you have to prepare the failover cluster instances on all the nodes of the failover cluster. For more information, see [Always On failover cluster instances (SQL Server)](../../sql-server/failover-clusters/windows/always-on-failover-cluster-instances-sql-server.md).

|  SQL Server Database Engine 
 | component | Parameter | Description |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate the failover cluster prepare work flow.<br /><br />Supported value: `PrepareFailoverCluster` |
| Database Engine |
 | Setup Control | `/IACCEPTSQLSERVERLICENSETERMS`<br /><br />**Required**, when the `/Q` or `/QS` parameter is specified for unattended installations | Required to acknowledge acceptance of the license terms.<br /><br />Beginning with  SQL Server 2022 (16.x) |
| , read the Microsoft  SQL Server |
 | Software License Terms at [aka.ms/useterms](https://aka.ms/useterms). |
| Database Engine |
 | Setup Control | `/ENU`<br /><br />**Optional** | Use this parameter to install the English version of  SQL Server |
 | on a localized operating system when the installation media includes language packs for both English and the language corresponding to the operating system. |
| Database Engine |
 | Setup Control | `/UpdateEnabled`<br /><br />**Optional** | Specify whether  SQL Server |
 | Setup should discover and include product updates. The valid values are `True` and `False` or `1` and `0`. By default,  SQL Server |
 | Setup includes updates that are found. |
| Database Engine |
 | Setup Control | `/UpdateSource`<br /><br />**Optional** | Specify the location where  SQL Server |
 | Setup obtains product updates. The valid values are `"MU"` to search  Microsoft |
 | Update, a valid folder path, a relative path such as `.\MyUpdates`, or a UNC share. By default,  SQL Server |
 | Setup searches  Microsoft |
 | Update or a Windows Update Service through the Windows Server Update Services. |
| Database Engine |
 | Setup Control | `/CONFIGURATIONFILE`<br /><br />**Optional** | Specifies the [configuration file](install-sql-server-using-a-configuration-file.md) to use. |
| Database Engine |
 | Setup Control | `/ERRORREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies the error reporting for  SQL Server |
| .<br /><br />For more information, see [SQL Server privacy supplement](../../sql-server/sql-server-privacy.md).<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/FEATURES`<br /><br />**Required** | Specifies [components](#Feature) to install. |
| Database Engine |
 | Setup Control | `/HELP` or `?`<br /><br />**Optional** | Displays usage options for the parameters. |
| Database Engine |
 | Setup Control | `/INDICATEPROGRESS`<br /><br />**Optional** | Specifies that the verbose Setup log file is piped to the console. |
| Database Engine |
 | Setup Control | `/INSTALLSHAREDDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for 64-bit shared components.<br /><br />Default is `%Program Files%\Microsoft SQL Server`<br /><br />Can't be set to `%Program Files(x86)%\Microsoft SQL Server` |
| Database Engine |
 | Setup Control | `/INSTALLSHAREDWOWDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for 32-bit shared components. Supported only on a 64-bit system.<br /><br />Default is `%Program Files(x86)%\Microsoft SQL Server`<br /><br />Can't be set to `%Program Files%\Microsoft SQL Server` |
| Database Engine |
 | Setup Control | `/INSTANCEDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for instance-specific components. |
| Database Engine |
 | Setup Control | `/INSTANCEID`<br /><br />**Optional** | Specifies a nondefault value for an [InstanceID](#InstanceID). |
| Database Engine |
 | Setup Control | `/INSTANCENAME`<br /><br />**Required** | Specifies a  SQL Server Database Engine |
 | instance name.<br /><br />For more information, see [Installation Wizard help](../../sql-server/install/instance-configuration.md). |
| Database Engine |
 | Setup Control | `/PID`<br /><br />**Optional** | Specifies the product key for the edition of  SQL Server |
| . If this parameter isn't specified, Evaluation is used.<br /><br />**Note:** If you're installing  SQL Server Express |
| ,  SQL Server Express |
 | with Advanced Services,  SQL Server Express |
 | with tools, |
 | SQL Server Developer , or |
 | SQL Server Evaluation , the PID is predefined. |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| Database Engine |
 | Setup Control | `/QS` or `/QUIETSIMPLE`<br /><br />**Optional** | Specifies that Setup runs and shows progress through the UI, but doesn't accept any input or show any error messages. |
| Database Engine |
 | Setup Control | `/SQMREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies feature usage reporting for  SQL Server |
| .<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/HIDECONSOLE`<br /><br />**Optional** | Specifies that the console window is hidden or closed. |
| SQL Server |
 | Agent | `/AGTSVCACCOUNT`<br /><br />**Required** | Specifies the account for the  SQL Server |
 | Agent service. |
| SQL Server |
 | Agent | `/AGTSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for  SQL Server |
 | Agent service account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| PolyBase Engine | `/PBENGSVCACCOUNT`<br /><br />**Optional** | Specifies the account for the engine service.<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE`. |
| PolyBase Data Movement | `/PBDMSSVCPASSWORD`<br /><br />**Optional** | Specifies the password for the data movement account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| PolyBase Engine | `/PBENGSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the startup mode for the PolyBase Engine service.<br /><br />Supported values:<br /><br />- `Automatic` (default)<br />- `Disabled`<br />- `Manual` |
| PolyBase | `/PBPORTRANGE`<br /><br />**Optional** | Specifies a port range with at least six ports for PolyBase services. Example:<br /><br />`/PBPORTRANGE=16450-16460` |
| PolyBase | `/PBSCALEOUT`<br /><br />**Optional** | Specifies if the  SQL Server Database Engine |
 | instance is used as a part of PolyBase Scale-out computational group. Use this option if you're configuring a PolyBase Scale-out computational group including the head node.<br /><br />Supported values: `True`, `False` |
| Analysis Services |
 | `/ASSVCACCOUNT`<br /><br />**Required** | Specifies the account for the  Analysis Services |
 | service. |
| Analysis Services |
 | `/ASSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for the  Analysis Services |
 | service. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| SQL Server Database Engine |
 | `/SQLSVCACCOUNT`<br /><br />**Required** | Specifies the startup account for the  SQL Server |
 | service. |
| SQL Server Database Engine |
 | `/SQLSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for `SQLSVCACCOUNT`. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| FILESTREAM | `/FILESTREAMLEVEL`<br /><br />**Optional** | Specifies the access level for the FILESTREAM feature.<br /><br />Supported values:<br /><br />- `0` = disable FILESTREAM support for this instance. (Default value)<br /><br />- `1` = enable FILESTREAM for  Transact-SQL  access.<br /><br />- `2` = enable FILESTREAM for  Transact-SQL  and file I/O streaming access. (Not valid for Cluster scenarios)<br /><br />- `3` = allow remote clients to have streaming access to FILESTREAM data. |
| FILESTREAM | `/FILESTREAMSHARENAME`<br /><br />**Optional**<br /><br />Required when `FILESTREAMLEVEL` is greater than 1. | Specifies the name of the Windows share in which the FILESTREAM data will be stored. |
| SQL Server |
 | Full Text | `/FTSVCACCOUNT`<br /><br />**Optional** | Specifies the account for Full-Text filter launcher service.<br /><br />This parameter is ignored in  Windows Server 2008 |
 | or higher. ServiceSID is used to help secure the communication between  SQL Server |
 | and Full-text Filter Daemon. If the values aren't provided, the Full-text Filter Launcher Service is disabled. You have to use  SQL Server |
 | Control Manager to change the service account and enable full-text functionality.<br /><br />Default value: `Local Service Account` |
| SQL Server |
 | Full Text | `/FTSVCPASSWORD`<br /><br />**Optional** | Specifies the password for the Full-Text filter launcher service.<br /><br />This parameter is ignored in  Windows Server 2008 |
 | or higher. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Integration Services |
 | `/ISSVCACCOUNT`<br /><br />**Required** | Specifies the account for  Integration Services |
| .<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE` |
| Integration Services |
 | `/ISSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the  Integration Services |
 | password. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Integration Services |
 | `/ISSVCStartupType`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for the  Integration Services |
 | service. |
| Reporting Services |
 | `/RSINSTALLMODE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Optional**<br /><br />Available only on `FilesOnlyMode` | Specifies the Install mode for  Reporting Services |
| .<br /><br />Supported values:<br /><br />- `SharePointFilesOnlyMode`<br />- `DefaultNativeMode`<br />- `FilesOnlyMode`<br /><br />**Note:** If the installation includes the  SQL Server |
  | Database Engine |
| , the default `RSINSTALLMODE` is `DefaultNativeMode`.<br /><br />If the installation doesn't include the  SQL Server |
  | Database Engine |
| , the default `RSINSTALLMODE` is `FilesOnlyMode`.<br /><br />If you choose `DefaultNativeMode` but the installation doesn't include the  SQL Server |
  | Database Engine |
| , the installation automatically changes the `RSINSTALLMODE` to `FilesOnlyMode`. |
| Reporting Services |
 | `/RSSVCACCOUNT`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Required** | Specifies the startup account for the  Reporting Services |
| . |
| Reporting Services |
 | `/RSSVCPASSWORD`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**[Required](#Accounts)** | Specifies the password for the startup account for the  Reporting Services |
 | service. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Reporting Services |
 | `/RSSVCStartupType`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for  Reporting Services |
| .<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |

We recommend that you use Service SID instead of domain groups.

#### Sample syntax

To perform the "Preparation" step of a failover cluster advanced installation scenario for the  Database Engine 
 and  Analysis Services 
.

Run the following command from the command prompt to prepare a default instance:

```console
setup.exe /q /ACTION=PrepareFailoverCluster /InstanceName=MSSQLSERVER /Features=AS,SQL /INDICATEPROGRESS /ASSVCACCOUNT="<DomainName\UserName>" /ASSVCPASSWORD="xxxxxxxxxxx" /SQLSVCACCOUNT="<DomainName\UserName>" /SQLSVCPASSWORD="xxxxxxxxxxx" /AGTSVCACCOUNT="<DomainName\UserName>" /AGTSVCPASSWORD="xxxxxxxxxxx" /IACCEPTSQLSERVERLICENSETERMS
```

Run the following command from the command prompt to prepare a named instance:

```console
setup.exe /q /ACTION=PrepareFailoverCluster /InstanceName="<Insert Instance name>" /Features=AS,SQL /INDICATEPROGRESS /ASSVCACCOUNT="<DomainName\UserName>" /ASSVCPASSWORD="xxxxxxxxxxx" /SQLSVCACCOUNT="<DomainName\UserName>" /SQLSVCPASSWORD="xxxxxxxxxxx" /AGTSVCACCOUNT="<DomainName\UserName>" /AGTSVCPASSWORD="xxxxxxxxxxx" /IACCEPTSQLSERVERLICENSETERMS
```


For  SQL Server 2022 (16.x) 
 and later versions, read the Microsoft SQL Server Software License Terms at [aka.ms/useterms](https://aka.ms/useterms).


### Complete failover cluster parameters

Use the parameters in the following table to develop command-line scripts for failover cluster complete. This is the second step in the advanced failover cluster install option. After you have run prepare on all the failover cluster nodes, you run this command on the node that owns the shared disks. For more information, see [Always On failover cluster instances (SQL Server)](../../sql-server/failover-clusters/windows/always-on-failover-cluster-instances-sql-server.md).

|  SQL Server Database Engine 
 | component | Parameter | Description |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate the failover cluster complete work flow.<br /><br />Supported value: `CompleteFailoverCluster` |
| Database Engine |
 | Setup Control | `/ENU`<br /><br />**Optional** | Use this parameter to install the English version of  SQL Server |
 | on a localized operating system when the installation media includes language packs for both English and the language corresponding to the operating system. |
| Database Engine |
 | Setup Control | `/FAILOVERCLUSTERGROUP`<br /><br />**Optional** | Specifies the name of the resource group to be used for the  SQL Server Database Engine |
 | failover cluster. It can be the name of an existing cluster group or the name of a new resource group.<br /><br />Default value: `SQL Server (<InstanceName>)` |
| Database Engine |
 | Setup Control | `/CONFIGURATIONFILE`<br /><br />**Optional** | Specifies the [configuration file](install-sql-server-using-a-configuration-file.md) to use. |
| Database Engine |
 | Setup Control | `/ERRORREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies the error reporting for  SQL Server |
| .<br /><br />For more information, see [SQL Server privacy supplement](../../sql-server/sql-server-privacy.md).<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/HELP` or `?`<br /><br />**Optional** | Displays usage options for the parameters. |
| Database Engine |
 | Setup Control | `/INDICATEPROGRESS`<br /><br />**Optional** | Specifies that the verbose Setup log file is piped to the console. |
| Database Engine |
 | Setup Control | `/INSTANCENAME`<br /><br />**Required** | Specifies a  SQL Server Database Engine |
 | instance name.<br /><br />For more information, see [Installation Wizard help](../../sql-server/install/instance-configuration.md). |
| Database Engine |
 | Setup Control | `/PID`<br /><br />**Optional** | Specifies the product key for the edition of  SQL Server |
| . If this parameter isn't specified, Evaluation is used.<br /><br />**Note:** If you're installing  SQL Server Express |
| ,  SQL Server Express |
 | with Advanced Services,  SQL Server Express |
 | with tools, |
 | SQL Server Developer , or |
 | SQL Server Evaluation , the PID is predefined. |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| Database Engine |
 | Setup Control | `/QS` or `/QUIETSIMPLE`<br /><br />**Optional** | Specifies that Setup runs and shows progress through the UI, but doesn't accept any input or show any error messages. |
| Database Engine |
 | Setup Control | `/SQMREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies feature usage reporting for  SQL Server |
| .<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/HIDECONSOLE`<br /><br />**Optional** | Specifies that the console window is hidden or closed. |
| Database Engine |
 | Setup Control | `/FAILOVERCLUSTERDISKS`<br /><br />**Optional** | Specifies the list of shared disks to be included in the  SQL Server Database Engine |
 | failover cluster resource group.<br /><br />Default value: The first drive is used as the default drive for all databases. |
| Database Engine |
 | Setup Control | `/FAILOVERCLUSTERIPADDRESSES`<br /><br />**Required** | Specifies an encoded IP address. The encodings are semicolon-delimited (;) and follow the format *\<IP Type>;\<address>;\<network name>;\<subnet mask>*. Supported IP types include DHCP, IPv4, and IPv6.<br /><br />You can specify multiple failover cluster IP addresses with a space in between. See the following examples:<br /><br />`FAILOVERCLUSTERIPADDRESSES=DEFAULT`<br /><br />`FAILOVERCLUSTERIPADDRESSES=IPv4;DHCP;ClusterNetwork1`<br /><br />`FAILOVERCLUSTERIPADDRESSES=IPv6;DHCP;ClusterNetwork1`<br /><br />`FAILOVERCLUSTERIPADDRESSES=IPv6;2041:0:1a0f::8a5b:131c` |
| Database Engine |
 | Setup Control | `/FAILOVERCLUSTERNETWORKNAME`<br /><br />**Required** | Specifies the network name for the new  SQL Server Database Engine |
 | failover cluster. This name is used to identify the new  SQL Server Database Engine |
 | failover cluster instance on the network. |
| Database Engine |
 | Setup Control | `/CONFIRMIPDEPENDENCYCHANGE`<br /><br />**Required** | Indicates the consent to set the IP address resource dependency from OR to AND for multi-subnet failover clusters. For more information, see [Add or remove nodes in a failover cluster instance (Setup)](../../sql-server/failover-clusters/install/add-or-remove-nodes-in-a-sql-server-failover-cluster-setup.md).<br /><br />Supported values:<br /><br />- `0` = False (default)<br />- `1` = True |
| Analysis Services |
 | `/ASBACKUPDIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | backup files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Backup`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Backup` |
| Analysis Services |
 | `/ASCOLLATION`<br /><br />**Optional** | Specifies the collation setting for  Analysis Services |
| .<br /><br />Default value: `Latin1_General_CI_AS`<br /><br />**Note:** Only Windows collation is supported. Using SQL collation can result in unexpected behavior. |
| Analysis Services |
 | `/ASCONFIGDIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | configuration files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Config`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Config` |
| Analysis Services |
 | `/ASDATADIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | data files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Data`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Data` |
| Analysis Services |
 | `/ASLOGDIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | log files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Log`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Log` |
| Analysis Services |
 | `/ASSERVERMODE`<br /><br />**Optional** | Specifies the server mode of the  Analysis Services |
 | instance. Valid values in a cluster scenario are `MULTIDIMENSIONAL` or `TABULAR`. `ASSERVERMODE` is case-sensitive. All values must be expressed in uppercase. For more information about valid values, see [Install Analysis Services in Tabular Mode](https://learn.microsoft.com/analysis-services/instances/install-windows/install-analysis-services). |
| Analysis Services |
 | `/ASSYSADMINACCOUNTS`<br /><br />**Required** | Specifies the administrator credentials for  Analysis Services |
| . |
| Analysis Services |
 | `/ASTEMPDIR`<br /><br />**Optional** | Specifies the directory for  Analysis Services |
 | temporary files.<br /><br />Default values:<br /><br />For WOW mode on 64-bit: `%Program Files(x86)%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Temp`<br /><br />For all other installations: `%Program Files%\Microsoft SQL Server\<INSTANCEDIR>\<ASInstanceID>\OLAP\Temp` |
| Analysis Services |
 | `/ASPROVIDERMSOLAP`<br /><br />**Optional** | Specifies whether the MSOLAP provider can run in-process.<br /><br />Default value: - `1` = enabled |
| SQL Server Database Engine |
 | `/INSTALLSQLDATADIR`<br /><br />**Required** | Specifies the data directory for  SQL Server |
 | data files.<br /><br />The data directory must be specified and on a shared cluster disk. |
| SQL Server Database Engine |
 | `/SAPWD`<br /><br />**Required**, when `/SECURITYMODE=SQL` | Specifies the password for the  SQL Server |
 | **SA** account. |
| SQL Server Database Engine |
 | `/SECURITYMODE`<br /><br />**Optional** | Specifies the security mode for  SQL Server |
| .<br /><br />If this parameter isn't supplied, then Windows-only authentication mode is supported.<br /><br />Supported value: `SQL` |
| SQL Server Database Engine |
 | `/SQLBACKUPDIR`<br /><br />**Optional** | Specifies the directory for backup files.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Backup` |
| SQL Server Database Engine |
 | `/SQLCOLLATION`<br /><br />**Optional** | Specifies the collation settings for  SQL Server |
| .<br /><br />The default value is based on the locale of your Windows operating system. For more information, see [Collation and Unicode support](../../relational-databases/collations/collation-and-unicode-support.md). |
| SQL Server Database Engine |
 | `/SQLSYSADMINACCOUNTS`<br /><br />**Required** | Use this parameter to provision logins to be members of the **sysadmin** role.<br /><br />For  SQL Server |
 | editions other than  SQL Server Express |
| , `/SQLSYSADMINACCOUNTS` is required. For editions of  SQL Server Express |
| , use of `/SQLSYSADMINACCOUNTS` is optional, but either `/SQLSYSADMINACCOUNTS` or `/ADDCURRENTUSERASSQLADMIN` is required. |
| SQL Server Database Engine |
 | `/SQLUSERDBDIR`<br /><br />**Optional** | Specifies the directory for the data files for user databases.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` |
| SQL Server Database Engine |
 | `/SQLUSERDBLOGDIR`<br /><br />**Optional** | Specifies the directory for the log files for user databases.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` |
| Reporting Services |
 | `/RSINSTALLMODE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Optional**<br /><br />Available only on `FilesOnlyMode` | Specifies the Install mode for  Reporting Services |
| .<br /><br />Supported values:<br /><br />- `SharePointFilesOnlyMode`<br />- `DefaultNativeMode`<br />- `FilesOnlyMode`<br /><br />**Note:** If the installation includes the  SQL Server |
  | Database Engine |
| , the default `RSINSTALLMODE` is `DefaultNativeMode`.<br /><br />If the installation doesn't include the  SQL Server |
  | Database Engine |
| , the default `RSINSTALLMODE` is `FilesOnlyMode`.<br /><br />If you choose `DefaultNativeMode` but the installation doesn't include the  SQL Server |
  | Database Engine |
| , the installation automatically changes the `RSINSTALLMODE` to `FilesOnlyMode`. |
| SQL Server Database Engine |
 | `/SQLTEMPDBDIR`<br /><br />**Optional** | Specifies the directories for `tempdb` data files. When specifying more than one directory, separate the directories with a blank space. If multiple directories are specified, the `tempdb` data files are spread across the directories in a round-robin fashion.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` (System Data Directory)<br /><br />**Note:** This parameter is added to RebuildDatabase scenario as well. |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGDIR`<br /><br />**Optional** | Specifies the directory for `tempdb` log file.<br /><br />Default value: `<InstallSQLDataDir>\<SQLInstanceID>\MSSQL\Data` (System Data Directory)<br /><br />**Note:** This parameter is added to RebuildDatabase scenario as well. |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILECOUNT`<br /><br />**Optional** | Specifies the number of `tempdb` data files to be added by setup. This value can be increased up to the number of cores.<br /><br />Default value:<br /><br />1 for  SQL Server Express |
| <br /><br />8 or the number of cores, whichever is lower for all other editions<br /><br />**Important:** The primary database file for `tempdb` is still `tempdb.mdf`. The additional `tempdb` files are named as `tempdb_mssql_#.ndf` where # represents a unique number for each additional `tempdb` database file created during setup. The purpose of this naming convention is to make them unique. Uninstalling an instance of  SQL Server |
 | deletes the files with naming convention `tempdb_mssql_#.ndf`. Don't use `tempdb_mssql_\*.ndf` naming convention for user database files.<br /><br />**Warning:**  SQL Server Express |
 | isn't supported for configuring this parameter. Setup installs only 1 `tempdb` data file. |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILESIZE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the initial size of each `tempdb` data file.<br /><br />Default = 4 MB for  SQL Server Express |
| , 8 MB for all other editions<br /><br />Min = 4 MB or 8 MB<br /><br />Max = 1024 MB |
| SQL Server Database Engine |
 | `/SQLTEMPDBFILEGROWTH`<br /><br />**Optional** | Specifies the file growth increment of each `tempdb` data file in MB. A value of 0 indicates that automatic growth is off and no additional space is allowed. Setup allows the size up to 1024.<br /><br />Default value: 64. Allowed range: Min = 0, Max = 1024 |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGFILESIZE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the initial size of the `tempdb` log file in MB. Setup allows the size up to 1024.<br /><br />Default value: 4 for  SQL Server Express |
| <br /><br />8 for all other editions<br /><br />Allowed range: Min = default value (4 or 8), Max = 1024 |
| SQL Server Database Engine |
 | `/SQLTEMPDBLOGFILEGROWTH`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and later versions<br /><br />**Optional** | Specifies the file growth increment of the `tempdb` log file in MB. A value of 0 indicates that automatic growth is off and no additional space is allowed. Setup allows the size up to 1024.<br /><br />Default value: 64. Allowed range: Min = 0, Max = 1024 |

#### Sample syntax

To perform the "Completion" step of a failover cluster advanced installation scenario for the  Database Engine 
 and  Analysis Services 
. Run the following command on the computer that is the active node in the failover cluster to make it usable. You must run the "CompleteFailoverCluster" action on the node that owns the shared disk in the  Analysis Services 
 failover cluster.

Run the following command from the command prompt to complete failover cluster installation for a default instance:

```console
setup.exe /q /ACTION=CompleteFailoverCluster /InstanceName=MSSQLSERVER /INDICATEPROGRESS /ASSYSADMINACCOUNTS="<DomainName\Username>" /ASDATADIR=<Drive>:\OLAP\Data /ASLOGDIR=<Drive>:\OLAP\Log /ASBACKUPDIR=<Drive>:\OLAP\Backup /ASCONFIGDIR=<Drive>:\OLAP\Config /ASTEMPDIR=<Drive>:\OLAP\Temp /FAILOVERCLUSTERDISKS="<Cluster Disk Resource Name - for example, 'Disk S:'>:" /FAILOVERCLUSTERNETWORKNAME="<Insert FOI Network Name>" /FAILOVERCLUSTERIPADDRESSES="IPv4;xx.xxx.xx.xx;Cluster Network;xxx.xxx.xxx.x" /FAILOVERCLUSTERGROUP="MSSQLSERVER" /INSTALLSQLDATADIR="<Drive>:\<Path>\MSSQLSERVER" /SQLCOLLATION="SQL_Latin1_General_CP1_CS_AS" /SQLSYSADMINACCOUNTS="<DomainName\UserName>"
```

Run the following command from the command prompt to complete failover cluster installation for a named instance:

```console
setup.exe /q /ACTION=CompleteFailoverCluster /InstanceName="<Insert Instance Name>" /INDICATEPROGRESS /ASSYSADMINACCOUNTS="<DomainName\UserName>" /ASDATADIR=<Drive>:\INSTANCE\Data /ASLOGDIR=<drive>:\INSTANCE\Log /ASBACKUPDIR=<Drive>:\INSTANCE\Backup /ASCONFIGDIR=<Drive>:\INSTANCE\Config /ASTEMPDIR=<Drive>:\INSTANCE\Temp /FAILOVERCLUSTERDISKS="<Cluster Disk Resource Name - for example, 'Disk S:'>" /FAILOVERCLUSTERNETWORKNAME="CompNamedFOI" /FAILOVERCLUSTERIPADDRESSES="IPv4;xx.xxx.xx.xx;ClusterNetwork1;xxx.xxx.xxx.x" /FAILOVERCLUSTERGROUP="<Insert New Group Name>" /INSTALLSQLDATADIR="<Drive>:\<Path>\MSSQLSERVER_INSTANCE" /SQLCOLLATION="SQL_Latin1_General_CP1_CS_AS" /SQLSYSADMINACCOUNTS="<DomainName\Username>"
```

### Upgrade failover cluster parameters

Use the parameters in the following table to develop command-line scripts for failover cluster upgrade. For more information, see [Upgrade a  SQL Server Database Engine
failover Cluster Instance (Setup)](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/failover-clusters/windows/upgrade-a-sql-server-failover-cluster-instance-setup.md) and [Always On failover cluster instances (SQL Server)](../../sql-server/failover-clusters/windows/always-on-failover-cluster-instances-sql-server.md).

|  SQL Server Database Engine 
 | component | Parameter | Description |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate the installation workflow.<br /><br />Supported value: `Upgrade` |
| Database Engine |
 | Setup Control | `/IACCEPTSQLSERVERLICENSETERMS`<br /><br />**Required**, when the `/Q` or `/QS` parameter is specified for unattended installations | Required to acknowledge acceptance of the license terms.<br /><br />Beginning with  SQL Server 2022 (16.x) |
| , read the Microsoft  SQL Server |
 | Software License Terms at [aka.ms/useterms](https://aka.ms/useterms). |
| Database Engine |
 | Setup Control | `/ENU`<br /><br />**Optional** | Use this parameter to install the English version of  SQL Server |
 | on a localized operating system when the installation media includes language packs for both English and the language corresponding to the operating system. |
| Database Engine |
 | Setup Control | `/UpdateEnabled`<br /><br />**Optional** | Specify whether  SQL Server |
 | Setup should discover and include product updates. The valid values are `True` and `False` or `1` and `0`. By default,  SQL Server |
 | Setup includes updates that are found. |
| Database Engine |
 | Setup Control | `/UpdateSource`<br /><br />**Optional** | Specify the location where  SQL Server |
 | Setup obtains product updates. The valid values are `"MU"` to search  Microsoft |
 | Update, a valid folder path, a relative path such as `.\MyUpdates`, or a UNC share. By default,  SQL Server |
 | Setup searches  Microsoft |
 | Update or a Windows Update Service through the Windows Server Update Services. |
| Database Engine |
 | Setup Control | `/CONFIGURATIONFILE`<br /><br />**Optional** | Specifies the [configuration file](install-sql-server-using-a-configuration-file.md) to use. |
| Database Engine |
 | Setup Control | `/ERRORREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies the error reporting for  SQL Server |
| .<br /><br />For more information, see [SQL Server privacy supplement](../../sql-server/sql-server-privacy.md).<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/HELP` or `?`<br /><br />**Optional** | Displays usage options for the parameters. |
| Database Engine |
 | Setup Control | `/INDICATEPROGRESS`<br /><br />**Optional** | Specifies that the verbose Setup log file is piped to the console. |
| Database Engine |
 | Setup Control | `/ INSTANCEDIR`<br /><br />**Optional** | Specifies a nondefault installation directory for shared components. |
| Database Engine |
 | Setup Control | `/INSTANCEID`<br /><br />**Required**, when you upgrade from  SQL Server 2008 (10.0.x) |
 | or later versions.<br /><br />**Optional**, when you upgrade from  SQL Server 2005 (9.x) |
| . | Specifies a nondefault value for an [InstanceID](#InstanceID). |
| Database Engine |
 | Setup Control | `/INSTANCENAME`<br /><br />**Required** | Specifies a  SQL Server Database Engine |
 | instance name.<br /><br />For more information, see [Installation Wizard help](../../sql-server/install/instance-configuration.md). |
| Database Engine |
 | Setup Control | `/PID`<br /><br />**Optional** | Specifies the product key for the edition of  SQL Server |
| . If this parameter isn't specified, Evaluation is used.<br /><br />**Note:** If you're installing  SQL Server Express |
| ,  SQL Server Express |
 | with Advanced Services,  SQL Server Express |
 | with tools, |
 | SQL Server Developer , or |
 | SQL Server Evaluation , the PID is predefined. |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| Database Engine |
 | Setup Control | `/SQMREPORTING`<br /><br />**Applies to:**  SQL Server 2014 (12.x) |
 | and earlier versions<br /><br />**Optional** | To manage how error feedback is sent to Microsoft, see [Configure usage and diagnostic data collection for SQL Server (CEIP)](../../sql-server/usage-and-diagnostic-data-configuration-for-sql-server.md).<br /><br />In older versions this specifies feature usage reporting for  SQL Server |
| .<br /><br />Supported values:<br /><br />- `1` = enabled<br />- `0` = disabled |
| Database Engine |
 | Setup Control | `/HIDECONSOLE`<br /><br />**Optional** | Specifies that the console window is hidden or closed. |
| Database Engine |
 | Setup Control | `/FAILOVERCLUSTERROLLOWNERSHIP`<br /><br />**Required** | Specifies the [failover behavior](#RollOwnership) during upgrade. |
| SQL Server |
 | Browser | `/BROWSERSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for  SQL Server |
 | Browser service.<br /><br />Supported values:<br /><br />- `Automatic`<br />- `Disabled`<br />- `Manual` |
| SQL Server |
 | Full-Text | `/FTUPGRADEOPTION`<br /><br />**Optional** | Specifies the Full-Text catalog upgrade option.<br /><br />Supported values:<br /><br />- `REBUILD`<br />- `RESET`<br />- `IMPORT` |
| Integration Services |
 | `/ISSVCACCOUNT`<br /><br />**Required** | Specifies the account for  Integration Services |
| .<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE` |
| Integration Services |
 | `/ISSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the  Integration Services |
 | password. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Integration Services |
 | `/ISSVCStartupType`<br /><br />**Optional** | Specifies the [startup](#Accounts) mode for the  Integration Services |
 | service. |
| Reporting Services |
 | `/RSUPGRADEDATABASEACCOUNT`<br /><br />**Optional** | The property is only used when upgrading a SharePoint mode Report Server that is version 2008 R2 or earlier. Additional upgrade operations are performed for report servers that use the older SharePoint mode architecture, which was changed in  SQL Server 2012 (11.x) |
  | Reporting Services |
| . If this option isn't included with the command-line installation, the default service account for the old report server instance is used. If this property is used, supply the password for the account using the `/RSUPGRADEPASSWORD` property. |
| Reporting Services |
 | `/RSUPGRADEPASSWORD`<br /><br />**Optional** | Password of the existing Report Server service account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |

<a id="AddNode"></a>

### Add node parameters

Use the parameters in the following table to develop command-line scripts for AddNode.

|  SQL Server Database Engine 
 | component | Parameter | Description |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate AddNode work flow.<br /><br />Supported value: `AddNode` |
| Database Engine |
 | Setup Control | `/IACCEPTSQLSERVERLICENSETERMS`<br /><br />**Required**, when the `/Q` or `/QS` parameter is specified for unattended installations | Required to acknowledge acceptance of the license terms.<br /><br />Beginning with  SQL Server 2022 (16.x) |
| , read the Microsoft  SQL Server |
 | Software License Terms at [aka.ms/useterms](https://aka.ms/useterms). |
| Database Engine |
 | Setup Control | `/ENU`<br /><br />**Optional** | Use this parameter to install the English version of  SQL Server |
 | on a localized operating system when the installation media includes language packs for both English and the language corresponding to the operating system. |
| Database Engine |
 | Setup Control | `/UpdateEnabled`<br /><br />**Optional** | Specify whether  SQL Server |
 | Setup should discover and include product updates. The valid values are `True` and `False` or `1` and `0`. By default,  SQL Server |
 | Setup includes updates that are found. |
| Database Engine |
 | Setup Control | `/UpdateSource`<br /><br />**Optional** | Specify the location where  SQL Server |
 | Setup obtains product updates. The valid values are `"MU"` to search  Microsoft |
 | Update, a valid folder path, a relative path such as `.\MyUpdates`, or a UNC share. By default,  SQL Server |
 | Setup searches  Microsoft |
 | Update or a Windows Update Service through the Windows Server Update Services. |
| Database Engine |
 | Setup Control | `/CONFIGURATIONFILE`<br /><br />**Optional** | Specifies the [configuration file](install-sql-server-using-a-configuration-file.md) to use. |
| Database Engine |
 | Setup Control | `/HELP` or `?`<br /><br />**Optional** | Displays usage options for the parameters. |
| Database Engine |
 | Setup Control | `/INDICATEPROGRESS`<br /><br />**Optional** | Specifies that the verbose Setup log file is piped to the console. |
| Database Engine |
 | Setup Control | `/INSTANCENAME`<br /><br />**Required** | Specifies a  SQL Server Database Engine |
 | instance name.<br /><br />For more information, see [Installation Wizard help](../../sql-server/install/instance-configuration.md). |
| Database Engine |
 | Setup Control | `/PID`<br /><br />**Optional** | Specifies the product key for the edition of  SQL Server |
| . If this parameter isn't specified, Evaluation is used.<br /><br />**Note:** If you're installing  SQL Server Express |
| ,  SQL Server Express |
 | with Advanced Services,  SQL Server Express |
 | with tools, |
 | SQL Server Developer , or |
 | SQL Server Evaluation , the PID is predefined. |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| Database Engine |
 | Setup Control | `/QS` or `/QUIETSIMPLE`<br /><br />**Optional** | Specifies that Setup runs and shows progress through the UI, but doesn't accept any input or show any error messages. |
| Database Engine |
 | Setup Control | `/HIDECONSOLE`<br /><br />**Optional** | Specifies that the console window is hidden or closed. |
| Database Engine |
 | Setup Control | `/FAILOVERCLUSTERIPADDRESSES`<br /><br />**Required** | Specifies an encoded IP address. The encodings are semicolon-delimited (;) and follow the format *\<IP Type>;\<address>;\<network name>;\<subnet mask>*. Supported IP types include DHCP, IPv4, and IPv6.<br /><br />You can specify multiple failover cluster IP addresses with a space in between. See the following examples:<br /><br />`FAILOVERCLUSTERIPADDRESSES=DEFAULT`<br /><br />`FAILOVERCLUSTERIPADDRESSES=IPv4;DHCP;ClusterNetwork1`<br /><br />`FAILOVERCLUSTERIPADDRESSES=IPv6;DHCP;ClusterNetwork1`<br /><br />`FAILOVERCLUSTERIPADDRESSES=IPv6;2041:0:1a0f::8a5b:131c`<br /><br />For more information, see [Add or remove nodes in a failover cluster instance (Setup)](../../sql-server/failover-clusters/install/add-or-remove-nodes-in-a-sql-server-failover-cluster-setup.md). |
| Database Engine |
 | Setup Control | `/CONFIRMIPDEPENDENCYCHANGE`<br /><br />**Required** | Indicates the consent to set the IP address resource dependency from OR to AND for multi-subnet failover clusters. For more information, see [Add or remove nodes in a failover cluster instance (Setup)](../../sql-server/failover-clusters/install/add-or-remove-nodes-in-a-sql-server-failover-cluster-setup.md).<br /><br />Supported values:<br /><br />- `0` = False (default)<br />- `1` = True |
| SQL Server |
 | Agent | `/AGTSVCACCOUNT`<br /><br />**Required** | Specifies the account for the  SQL Server |
 | Agent service. |
| SQL Server |
 | Agent | `/AGTSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for  SQL Server |
 | Agent service account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| PolyBase Engine | `/PBENGSVCACCOUNT`<br /><br />**Optional** | Specifies the account for the engine service.<br /><br />Default value: `NT AUTHORITY\NETWORK SERVICE`. |
| PolyBase Data Movement | `/PBDMSSVCPASSWORD`<br /><br />**Optional** | Specifies the password for the data movement account. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| PolyBase Engine | `/PBENGSVCSTARTUPTYPE`<br /><br />**Optional** | Specifies the startup mode for the PolyBase Engine service.<br /><br />Supported values:<br /><br />- `Automatic` (default)<br />- `Disabled`<br />- `Manual` |
| PolyBase | `/PBPORTRANGE`<br /><br />**Optional** | Specifies a port range with at least six ports for PolyBase services. Example:<br /><br />`/PBPORTRANGE=16450-16460` |
| PolyBase | `/PBSCALEOUT`<br /><br />**Optional** | Specifies if the  SQL Server Database Engine |
 | instance is used as a part of PolyBase Scale-out computational group. Use this option if you're configuring a PolyBase Scale-out computational group including the head node.<br /><br />Supported values: `True`, `False` |
| Analysis Services |
 | `/ASSVCACCOUNT`<br /><br />**Required** | Specifies the account for the  Analysis Services |
 | service. |
| Analysis Services |
 | `/ASSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for the  Analysis Services |
 | service. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| SQL Server Database Engine |
 | `/SQLSVCACCOUNT`<br /><br />**Required** | Specifies the startup account for the  SQL Server |
 | service. |
| SQL Server Database Engine |
 | `/SQLSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the password for `SQLSVCACCOUNT`. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Integration Services |
 | `/ISSVCPASSWORD`<br /><br />**[Required](#Accounts)** | Specifies the  Integration Services |
 | password. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |
| Reporting Services |
 | `/RSINSTALLMODE`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**Optional**<br /><br />Available only on `FilesOnlyMode` | Specifies the Install mode for  Reporting Services |
| .<br /><br />Supported values:<br /><br />- `SharePointFilesOnlyMode`<br />- `DefaultNativeMode`<br />- `FilesOnlyMode`<br /><br />**Note:** If the installation includes the  SQL Server |
  | Database Engine |
| , the default `RSINSTALLMODE` is `DefaultNativeMode`.<br /><br />If the installation doesn't include the  SQL Server |
  | Database Engine |
| , the default `RSINSTALLMODE` is `FilesOnlyMode`.<br /><br />If you choose `DefaultNativeMode` but the installation doesn't include the  SQL Server |
  | Database Engine |
| , the installation automatically changes the `RSINSTALLMODE` to `FilesOnlyMode`. |
| Reporting Services |
 | `/RSSVCPASSWORD`<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions<br /><br />**[Required](#Accounts)** | Specifies the password for the startup account for the  Reporting Services |
 | service. This parameter can be omitted when using a managed service account, virtual account, or built-in account. |

#### Additional notes

The  Database Engine 
 and  Analysis Services 
 are the only components that are cluster-aware. Other features aren't cluster-aware and don't have high availability through failover.

#### Sample syntax

To add a node to an existing failover cluster instance with the  Database Engine 
 and  Analysis Services 
.

```console
setup.exe /q /ACTION=AddNode /INSTANCENAME="<Insert Instance Name>" /SQLSVCACCOUNT="<SQL account that is used on other nodes>" /SQLSVCPASSWORD="<password for SQL account>" /AGTSVCACCOUNT="<SQL Server Agent account that is used on other nodes>", /AGTSVCPASSWORD="<SQL Server Agent account password>" /ASSVCACCOUNT="<AS account that is used on other nodes>" /ASSVCPASSWORD="<password for AS account>" /INDICATEPROGRESS /IACCEPTSQLSERVERLICENSETERMS /FAILOVERCLUSTERIPADDRESSES="IPv4;xx.xxx.xx.xx;ClusterNetwork1;xxx.xxx.xxx.x" /CONFIRMIPDEPENDENCYCHANGE=0
```

### Remove node parameters

Use the parameters in the following table to develop command-line scripts for RemoveNode. To uninstall a failover cluster, you must run RemoveNode on each failover cluster node. For more information, see [Always On failover cluster instances (SQL Server)](../../sql-server/failover-clusters/windows/always-on-failover-cluster-instances-sql-server.md).

|  SQL Server Database Engine 
 | component | Parameter | Description |
| --- | --- | --- |
| Database Engine |
 | Setup Control | `/ACTION`<br /><br />**Required** | Required to indicate RemoveNode work flow.<br /><br />Supported value: `RemoveNode` |
| Database Engine |
 | Setup Control | `/CONFIGURATIONFILE`<br /><br />**Optional** | Specifies the [configuration file](install-sql-server-using-a-configuration-file.md) to use. |
| Database Engine |
 | Setup Control | `/HELP` or `?`<br /><br />**Optional** | Displays usage options for the parameters. |
| Database Engine |
 | Setup Control | `/INDICATEPROGRESS`<br /><br />**Optional** | Specifies that the verbose Setup log file is piped to the console. |
| Database Engine |
 | Setup Control | `/INSTANCENAME`<br /><br />**Required** | Specifies a  SQL Server Database Engine |
 | instance name.<br /><br />For more information, see [Installation Wizard help](../../sql-server/install/instance-configuration.md). |
| Database Engine |
 | Setup Control | `/Q` or `/QUIET`<br /><br />**Optional** | Specifies that Setup runs in a quiet mode without any user interface. This is used for unattended installations. The `/Q` parameter overrides the input of the `/QS` parameter. |
| Database Engine |
 | Setup Control | `/QS` or `/QUIETSIMPLE`<br /><br />**Optional** | Specifies that Setup runs and shows progress through the UI, but doesn't accept any input or show any error messages. |
| Database Engine |
 | Setup Control | `/HIDECONSOLE`<br /><br />**Optional** | Specifies that the console window is hidden or closed. |
| Database Engine |
 | Setup Control | `/CONFIRMIPDEPENDENCYCHANGE`<br /><br />**Required** | Indicates the consent to set the IP address resource dependency from OR to AND for multi-subnet failover clusters. For more information, see [Add or remove nodes in a failover cluster instance (Setup)](../../sql-server/failover-clusters/install/add-or-remove-nodes-in-a-sql-server-failover-cluster-setup.md).<br /><br />Supported values:<br /><br />- `0` = False (default)<br />- `1` = True |

#### Sample syntax

To remove a node from an existing failover cluster instance with the  Database Engine 
 and  Analysis Services 
.

```console
setup.exe /q /ACTION=RemoveNode /INSTANCENAME="<Insert Instance Name>" [/INDICATEPROGRESS] /CONFIRMIPDEPENDENCYCHANGE=0
```

<a id="Accounts"></a>

## Service account parameters

You can configure the  SQL Server 
 services by using a built-in account, local account, or domain account.

> **Note:**  
> When you use a managed service account, virtual account, or a built-in account, you shouldn't specify the corresponding password parameters. For more information about these service accounts, see [Managed service accounts, group-managed service accounts, and virtual accounts](../configure-windows/configure-windows-service-accounts-and-permissions.md#New_Accounts).

For more information about service account configuration, see [Configure Windows service accounts and permissions](../configure-windows/configure-windows-service-accounts-and-permissions.md).

|  SQL Server Database Engine 
 | component | Account parameter | Password parameter | Startup type |
| --- | --- | --- | --- |
| SQL Server |
 | Agent | `/AGTSVCACCOUNT` | `/AGTSVCPASSWORD` | `/AGTSVCSTARTUPTYPE` |
| Analysis Services |
 | `/ASSVCACCOUNT` | `/ASSVCPASSWORD` | `/ASSVCSTARTUPTYPE` |
| SQL Server Database Engine |
 | `/SQLSVCACCOUNT` | `/SQLSVCPASSWORD` | `/SQLSVCSTARTUPTYPE` |
| Integration Services |
 | `/ISSVCACCOUNT` | `/ISSVCPASSWORD` | `/ISSVCSTARTUPTYPE` |
| Reporting Services |
 | `/RSSVCACCOUNT` | `/RSSVCPASSWORD` | `/RSSVCSTARTUPTYPE` |

  > **Note:**  
  >  Reporting Services 
 features were removed from  SQL Server 2017 (14.x) 
. The account parameters for  SQL Server 
  Reporting Services 
 are only applicable to versions prior to  SQL Server 2017 (14.x) 
.

<a id="Feature"></a>

## Feature parameters

To install specific features, use the `/FEATURES` parameter and specify the parent feature or feature values in the following table.

For a list of features supported by the editions of  SQL Server 
 on Windows, see:

- [Editions and supported features of SQL Server 2025](../../sql-server/editions-and-components-of-sql-server-2025.md)
- [Editions and supported features of SQL Server 2022](../../sql-server/editions-and-components-of-sql-server-2022.md)
- [Editions and supported features of SQL Server 2019](../../sql-server/editions-and-components-of-sql-server-2019.md)
- [Editions and supported features of SQL Server 2017](../../sql-server/editions-and-components-of-sql-server-2017.md)


| Parent feature parameter | Feature parameter | Description |
| --- | --- | --- |
| SQL |  | Installs the  SQL Server Database Engine |
| , Replication, Fulltext, and  Data Quality Server |
| . |
|  | SQLEngine | Installs just the  SQL Server Database Engine |
| . |
|  | Replication | Installs the Replication component along with  SQL Server Database Engine |
| . |
|  | FullText | Installs the FullText component along with  SQL Server Database Engine |
| . |
|  | DQ | Copies the files required for completing the  Data Quality Server |
 | installation. After completing  SQL Server |
 | installation, you must run the DQSInstaller.exe file to complete the  Data Quality Server |
 | installation. For more information, see [Run DQSInstaller.exe to Complete Data Quality Server Installation](../../data-quality-services/install-windows/run-dqsinstaller-exe-to-complete-data-quality-server-installation.md). This also installs  SQL Server Database Engine |
| . |
|  | PolyBase | Installs PolyBase components. |
|  | PolyBaseCore | Pair with `PolyBase` to install PolyBase technology that enables truly integrated querying across Oracle, Teradata,  SQL Server |
 | and other relational and non-relational data using standard T-SQL statements.<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | and later versions |
|  | PolyBaseJava | In  SQL Server 2019 (15.x) |
 | only, pair with `PolyBase` to install PolyBase Java Connector that enables truly integrated querying across HDFS data using standard T-SQL statements. |
|  | AdvancedAnalytics | Installs [SQL Server Machine Learning Services](../../machine-learning/install/sql-machine-learning-services-windows-install.md) or [SQL Server 2016 R Services](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/machine-learning/install/sql-r-services-windows-install.md). |
|  | SQL_INST_MR | Pair with `AdvancedAnalytics` to install R Open and proprietary R packages.<br /><br />**Applies to:** [SQL Server Machine Learning Services](../../machine-learning/install/sql-machine-learning-services-windows-install.md) (2017 and 2019) and [SQL Server 2016 R Services](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/machine-learning/install/sql-r-services-windows-install.md) |
|  | SQL_INST_MPY | Pair with `AdvancedAnalytics` to install Anaconda and proprietary Python packages.<br /><br />**Applies to:** [SQL Server Machine Learning Services](../../machine-learning/install/sql-machine-learning-services-windows-install.md) (2017 and 2019) |
|  | SQL_INST_JAVA | Pair with `AdvancedAnalytics` to install extensions that enable integration with Java using standard T-SQL statements.<br /><br />**Applies to:** [SQL Server Java Language Extension](../../language-extensions/install/windows-java.md) (2019 only) |
| AS |  | Installs all  Analysis Services |
 | components. |
| RS |  | Installs all  Reporting Services |
 | components.<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions |
| RS_SHP |  | Installs  Reporting Services |
 | components for SharePoint.<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions |
| RS_SHPWFE |  | Installs  Reporting Services |
 | Add-In for SharePoint products.<br /><br />**Applies to:**  SQL Server 2016 (13.x) |
 | and earlier versions |
| DQC |  | Installs  Data Quality Client |
| . |
| IS |  | Installs all  Integration Services |
 | components. |
|  | IS_Master | Includes Scale Out Master for Integration Services Scale Out. |
|  | IS_Worker | Includes Scale Out Worker for Integration Services Scale Out. |
| MDS |  | Installs  Master Data Services |
| . |
| SQL_SHARED_MPY |  | Installs Python packages for [Machine Learning Server (Standalone) or R Server (Standalone)](../../machine-learning/install/sql-machine-learning-standalone-windows-install.md) |
| SQL_SHARED_MR |  | Installs R packages for [Machine Learning Server (Standalone) or R Server (Standalone)](../../machine-learning/install/sql-machine-learning-standalone-windows-install.md) or [Machine Learning Server (Standalone) or R Server (Standalone)](../../machine-learning/install/sql-machine-learning-standalone-windows-install.md) |
| Tools <sup>1</sup> |  | Installs client tools and  SQL Server |
 | Books Online components.<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | and earlier versions |
|  | BC | Installs backward compatibility components.<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | and earlier versions |
|  | Conn | Installs connectivity components.<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | and earlier versions |
|  | DREPLAY_CTLR | Installs Distributed Replay controller.<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | and earlier versions |
|  | DREPLAY_CLT | Installs Distributed Replay client.<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | and earlier versions |
|  | SNAC_SDK | Installs SDK for  SQL Server |
 | Native Client.<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | and earlier versions |
|  | SDK | Installs the software development kit.<br /><br />**Applies to:**  SQL Server 2019 (15.x) |
 | and earlier versions |
|  | LocalDB** | Installs LocalDB, an execution mode of  SQL Server Express |
 | targeted to program developers. |

<sup>1</sup>  SQL Server Management Studio 
 (SSMS) is now in a standalone installer that is separate from the  SQL Server 
 installer. For details, see [Install SQL Server Management Studio](https://learn.microsoft.com/ssms/install/install).

### Feature parameter examples

| Parameter and values | Description |
| --- | --- |
| `/FEATURES=SQLEngine` | Installs the  Database Engine |
 | without replication and full-text. |
| `/FEATURES=SQLEngine,FullText` | Installs the  Database Engine |
 | and full-text. |
| `/FEATURES=SQL` | Installs the  Database Engine |
| , replication, and full-text. |
| `/FEATURES=SQLEngine,PolyBase` | Installs the  Database Engine |
 | and the PolyBase engine. |

<a id="RoleParameters"></a>

## Role parameters

The setup role or `/ROLE` parameter is used to install a preconfigured selection of features. The SSAS roles install an SSAS instance in either an existing SharePoint farm, or a new unconfigured farm. Two setup roles are provided to support each scenario. You can only choose one setup role to install at a time. If you choose a setup role, Setup installs the features and components that belong to the role. You can't vary the features and components that are designated for that role. For more information about how to use the feature role parameter, see [Install Power Pivot from the Command Prompt](https://learn.microsoft.com/analysis-services/instances/install-windows/install-analysis-services-in-power-pivot-mode).

The `AllFeatures_WithDefaults` role is the default behavior for editions of  SQL Server Express 
 and reduces the number of dialog boxes presented to the user. It can be specified from the command prompt when installing a  SQL Server 
 edition that isn't  SQL Server Express 
.

| Role | Description | Installs... |
| --- | --- | --- |
| `SPI_AS_ExistingFarm` | Installs  Analysis Services |
 | as a  Power Pivot |
 | named instance on an existing  SharePoint Server 2010 |
 | farm or standalone server. | Analysis Services |
 | calculation engine, preconfigured for in-memory data storage and processing.<br /><br /> Power Pivot |
 | solution packages<br /><br />Installer program for the  Power Pivot for Excel |
| <br /><br /> SQL Server |
 | Books Online |
| `SPI_AS_NewFarm` | Installs  Analysis Services |
 | and  Database Engine |
 | as a  Power Pivot |
 | named instance on a new, unconfigured Office  SharePoint Server 2010 |
 | farm or standalone server.  SQL Server |
 | Setup configures the farm during feature role installation. | Analysis Services |
 | calculation engine, preconfigured for in-memory data storage and processing.<br /><br /> Power Pivot |
 | solution packages<br /><br /> SQL Server |
 | Books Online<br /><br /> Database Engine |
| <br /><br />Configuration Tools<br /><br /> SQL Server Management Studio |
 |  |
| `AllFeatures_WithDefaults` | Installs all features that are available with the current edition.<br /><br />Adds the current user to the  SQL Server |
 | **sysadmin** fixed server role.<br /><br />On  Windows Server 2008 |
 | or higher and when the operating system isn't a domain controller, the  Database Engine |
| , and  Reporting Services |
 | are defaulted to use the `NT AUTHORITY\NETWORK SERVICE` account, and  Integration Services |
 | is defaulted to use the `NT AUTHORITY\NETWORK SERVICE` account.<br /><br />This role is enabled by default in editions of  SQL Server Express |
| . For all other editions, this role isn't enabled but can be specified through the UI or with command-line parameters. | For editions of  SQL Server Express |
| , installs only those features available in the edition. For other editions, installs all  SQL Server |
 | features.<br /><br />The `AllFeatures_WithDefaults` parameter can be combined with other parameters that override the `AllFeatures_WithDefaults` parameter settings. For example, using the `AllFeatures_WithDefaults` parameter and the `/Features=RS` parameter overrides the command to install all features and only installs  Reporting Services |
| , but honors the `AllFeatures_WithDefaults` parameter to use the default service account for  Reporting Services |
| .<br /><br />When using the `AllFeatures_WithDefaults` parameter along with the `/ADDCURRENTUSERASSQLADMIN=FALSE` the provisioning dialog isn't auto populated with the current user. Add `/AGTSVCACCOUNT` and `/AGTSVCPASSWORD` to specify a service account and password for the  SQL Server |
 | Agent. |

<a id="RollOwnership"></a>

## Control failover behavior using the /FAILOVERCLUSTERROLLOWNERSHIP parameter

To upgrade a  SQL Server Database Engine 
 failover cluster, you must run the Setup on one failover cluster node at a time, starting with the passive nodes. Setup determines when to fail over to the upgraded node, depending on the total number of nodes in the failover cluster instance, and the number of nodes that have already been upgraded. When half of the nodes or more have already been upgraded, Setup by default causes a failover to an upgraded node.

To control the failover behavior of cluster nodes during the upgrade process, run the upgrade operation from the command prompt and use the `/FAILOVERCLUSTERROLLOWNERSHIP` parameter to control the failover behavior before the upgrade operation takes the node offline. Use of this parameter is as follows:

- `/FAILOVERCLUSTERROLLOWNERSHIP=0` doesn't roll cluster ownership (move group) to upgraded nodes, and doesn't add this node to the list of possible owners of the  SQL Server 
 cluster at the end of upgrade.

- `/FAILOVERCLUSTERROLLOWNERSHIP=1` rolls cluster ownership (move group) to upgraded nodes, and adds this node to the list of possible owners of the  SQL Server 
 cluster at the end of upgrade.

- `/FAILOVERCLUSTERROLLOWNERSHIP=2` is the default setting. It's used if this parameter isn't specified. This setting indicates that  SQL Server 
 Setup manages cluster ownership (move group) as needed.

<a id="InstanceID"></a>

## Instance ID or InstanceID configuration

The Instance ID or `/InstanceID` parameter is used for specifying where you can install the instance components and the registry path of the instance. The value of INSTANCEID is a string and should be unique.

- SQL Instance ID: `MSSQLxx.<INSTANCEID>`
- AS Instance ID: `MSASxx.<INSTANCEID>`
- RS Instance ID: `MSRSxx.<INSTANCEID>`

The instance-aware components are installed to the following locations:

- `%Program Files%\Microsoft SQL Server\<SQLInstanceID>`
- `%Program Files%\Microsoft SQL Server\<ASInstanceID>`
- `%Program Files%\Microsoft SQL Server\<RSInstanceID>`

> **Note:**  
> If `INSTANCEID` isn't specified on the command line, then by default Setup substitutes `<INSTANCEID>` with the `<INSTANCENAME>`.

## Related content

- [Slipstream installation for SQL Server](install-sql-server-using-slipstream.md)
- [Install SQL Server from the Installation Wizard (Setup)](install-sql-server-from-the-installation-wizard-setup.md)
- [Install a SQL Server failover cluster](../../sql-server/failover-clusters/install/sql-server-failover-cluster-installation.md)
- [Install SQL Server Business Intelligence Features](../../sql-server/install/install-sql-server-business-intelligence-features.md)
