---
title: Upgrade Integration Services Packages
description: Upgrade Integration Services Packages
ms.reviewer: randolphwest
ms.date: 08/13/2026
ms.service: sql
ms.subservice: integration-services
ms.topic: upgrade-and-migration-article
ms.custom:
  - sfi-ropc-nochange
helpviewer_keywords:
  - "Integration Services, migrating"
  - "migrating packages [Integration Services]"
---
# Upgrade Integration Services packages


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory

When you upgrade older versions of  SQL Server 
 to the current release, your existing SQL Server Integration Services (SSIS) packages might not be automatically upgraded to the package format that the current release uses. In this scenario, you must select an upgrade method and manually upgrade your packages.

> **Important:**  
> When you upgrade  SQL Server 2012 (11.x) 
 to  SQL Server 2014 (12.x)
 or later versions, ensure that you remove the original  SQL Server 2012 (11.x) 
 instance after the upgrade. If you subscribe to [Extended Security Updates for SQL Server](../../sql-server/end-of-support/sql-server-extended-security-updates.md), you're billed for both instances.

For information on upgrading packages when you convert a project to the project deployment model, see [Deploy Integration Services (SSIS) Projects and Packages](../packages/deploy-integration-services-ssis-projects-and-packages.md).

## Select an upgrade method

You can use various methods to upgrade SSIS packages in older versions of  SQL Server 
. For some of these methods, the upgrade is only temporary. For others, the upgrade is permanent. The following table describes each of these methods and whether the upgrade is temporary or permanent.

> **Note:**  
> When you run a  SQL Server 2014 (12.x)
 or earlier version package by using the **`dtexec`** utility (`dtexec.exe`) that is installed with the current release of  SQL Server 
, the temporary package upgrade increases the execution time. The rate of increase in package execution time varies depending on the size of the package. To avoid an increase in the execution time, upgrade the package before running it.

For Script components that reference SSIS-related assemblies which bind with version, the upgrade process keeps these components unchanged. You must manually update the reference to the new version.

| Upgrade method | Type of upgrade |
| --- | --- |
| Use the **`dtexec`** utility (dtexec.exe) that is installed with the current release of  SQL Server |
 | to run a  SQL Server 2008 (10.0.x) |
| ,  SQL Server 2008 R2 (10.50.x) |
| ,  SQL Server 2012 (11.x) |
| , or  SQL Server 2014 (12.x) |
 | package.<br /><br />For more information, see [dtexec Utility](../packages/dtexec-utility.md). | The package upgrade is temporary.<br /><br />The changes can't be saved. |
| Open a  SQL Server 2008 (10.0.x) |
| ,  SQL Server 2008 R2 (10.50.x) |
| ,  SQL Server 2012 (11.x) |
| , or  SQL Server 2014 (12.x) |
 | package file in  SQL Server Data Tools (SSDT) |
| . | The package upgrade is permanent if you save the package; otherwise, it's temporary if you don't save the package. |
| Add a  SQL Server 2008 (10.0.x) |
| ,  SQL Server 2008 R2 (10.50.x) |
| ,  SQL Server 2012 (11.x) |
| , or  SQL Server 2014 (12.x) |
 | package to an existing project in  SQL Server Data Tools (SSDT) |
| . | The package upgrade is permanent. |
| Open a  SQL Server 2008 Integration Services (SSIS) |
 | or later project file in  Visual Studio |
| , and then use the  SSIS |
 | Package Upgrade Wizard to upgrade multiple packages in the project.<br /><br />For more information, see [Upgrade Integration Services Packages Using the SSIS Package Upgrade Wizard](upgrade-integration-services-packages-using-the-ssis-package-upgrade-wizard.md) and [SSIS Package Upgrade Wizard F1 Help](../ssis-package-upgrade-wizard-f1-help.md). | The package upgrade is permanent. |
| Use the [Microsoft.SqlServer.Dts.Runtime.Application.Upgrade%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.Upgrade%252A) method to upgrade one or more  Integration Services |
 | packages. | The package upgrade is permanent. |

## Custom applications and custom components

 SQL Server 2005 Integration Services (SSIS) 
 custom components don't work with the current release of SSIS.

However, you can use the current release of SSIS tools to run and manage packages for custom components from  SQL Server 2008 (10.0.x) 
 through  SQL Server 2014 (12.x)
. To help redirect the runtime assemblies from version 10.0.0.0 ( SQL Server 2008 R2 (10.50.x) 
), version 11.0.0.0 ( SQL Server 2012 (11.x) 
), or version 12.0.0.0 ( SQL Server 2014 (12.x)
) to version 15.0.0.0 ( SQL Server 2019 (15.x) 
), four binding redirection rules are added to the following files:

- DTExec.exe.config
- dtshost.exe.config
- DTSWizard.exe.config
- DTUtil.exe.config
- DTExecUI.exe.config

To use  SQL Server Data Tools 
 to design packages that include custom components for  SQL Server 2014 (12.x)
 and earlier versions, modify the `devenv.exe.config` file located at `<drive>:\Program Files\Microsoft Visual Studio 10.0\Common7\IDE`.

To use these packages with custom applications built with the runtime for  SQL Server 2019 (15.x) 
, include redirection rules in the configuration section of the `*.exe.config` file for the executable. The rules redirect the runtime assemblies to version 15.0.0.0 ( SQL Server 2019 (15.x) 
). For more information about assembly version redirection, see [\<assemblyBinding> Element for \<runtime>](https://learn.microsoft.com/dotnet/framework/configure-apps/file-schema/runtime/assemblybinding-element-for-runtime).

### Locate the assemblies

In  SQL Server 2019 (15.x) 
, the  Integration Services 
 assemblies were upgraded to .NET 4.0. There's a separate global assembly cache for .NET 4, located in `<drive>:\Windows\Microsoft.NET\assembly`. You can find all of the  Integration Services 
 assemblies under this path, usually in the `GAC_MSIL` folder.

As in previous versions of  SQL Server 
, the core  Integration Services 
 extensibility `.dll` files are also located at `<drive>:\Program Files\Microsoft SQL Server\130\SDK\Assemblies`.

## Understand SQL Server package upgrade results

During the package upgrade process, most components and features in packages from  SQL Server 2014 (12.x)
 and earlier versions, convert seamlessly to their counterparts in the current release of  SQL Server 
. However, there are several components and features that either aren't upgraded, or have upgrade results of which you should be aware.

To identify which packages have the issues listed in this section, run Upgrade Advisor.

### Connection strings

For packages in  SQL Server 2014 (12.x)
 and earlier versions, the names of certain providers have changed and require different values in the connection strings. To update the connection strings, use one of the following procedures:

- Use the  SSIS 
 Package Upgrade Wizard to upgrade the package, and select the **Update connection strings to use new provider names** option.
- In  SQL Server Data Tools (SSDT) 
, on the General page of the Options dialog box, select the **Update connection strings to use new provider names** option. For more information about this option, see General Page.
- In  SQL Server Data Tools (SSDT) 
, open the package and manually change the text of the ConnectionString property.

You can't use these procedures to update a connection string when the connection string is stored in either a configuration file or a data source file, or when an expression sets the **ConnectionString** property. To update the connection string in these cases, you must manually update the file or the expression. For more information about data sources, see [Data Sources for  Integration Services 
 packages](../connection-manager/data-sources.md).

### Scripts that depend on `ADODB.DLL`

Script Task and Script Component scripts that explicitly reference `ADODB.DLL` might not upgrade or run on machines without  SQL Server Management Studio 
 or  SQL Server Data Tools (SSDT) 
 installed. To upgrade these Script Task or Script Component scripts, remove the dependency on `ADODB.DLL`. Use ADO.NET as the alternative for managed code such as VB and C# scripts.
