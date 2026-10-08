---
title: "Report Server command prompt utilities"
description: Learn about the SQL Server Reporting Services command line utilities that are used to administer a report server.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: tools
ms.topic: concept-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "rsconfig utility"
  - "components [Reporting Services], command line utilities"
  - "rs utility"
  - "command prompt utilities [Reporting Services]"
  - "rskeymgmt utility"
---
# Report Server command prompt utilities (SSRS)
   SQL Server 
  Reporting Services 
 includes several command line utilities that you can use to administer a report server. These utilities are installed automatically when you install a report server.  
  
| Name | Command file | Supported Deployment mode | Description |
| --- | --- | --- | --- |
| RSS utility | rs.exe | Native mode and SharePoint mode. The  SQL Server 2008 R2 (10.50.x) |
 | release introduced SharePoint mode support. | The [rs utility](rs-exe-utility-ssrs.md) is a script host that you can use to perform scripted operations. Use this tool to run  Microsoft |
  | Visual Basic  scripts that copy data between report server databases, publish reports, create items in a report server database, and more. To learn more about using scripts to administer a server, see [Script deployment and administrative tasks](script-deployment-and-administrative-tasks.md). |
| PowerShell cmdlets |  | SharePoint only | For a list of the PowerShell cmdlets, see [PowerShell cmdlets for Reporting Services SharePoint mode](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/reporting-services/report-server-sharepoint/powershell-cmdlets-for-reporting-services-sharepoint-mode.md). |
| Rsconfig utility | rsconfig.exe | Native only | The [rsconfig utility](rsconfig-utility-ssrs.md) is used to configure and manage a report server connection to the report server database. You can also use it to specify a user account to use for unattended report processing. For more information, see [Reporting Services report server (Native mode)](../report-server/reporting-services-report-server-native-mode.md). To learn more about connection configuration, see [Configure a report server database connection  (Report Server Configuration Manager)](../install-windows/configure-a-report-server-database-connection-ssrs-configuration-manager.md). |
| Rskeymgmt Utility | rskeymgmt.exe | Native only | The [rskeymgmt utility](rskeymgmt-utility-ssrs.md) is an encryption key management tool. You can use it to back up, apply, recreate, and delete symmetric keys. You can also use this tool to attach a report server instance to a shared report server database. Rskeymgmt can be used in database recovery operations. You can reuse an existing database in a new installation by applying a backup copy of the symmetric key. If the keys can't be recovered, this tool provides a way to delete encrypted content that you no longer use. To learn more about key management and storage of sensitive data, see [Store encrypted report server data (Report Server Configuration Manager)](../install-windows/ssrs-encryption-keys-store-encrypted-report-server-data.md) and [Configure and manage encryption keys (Report Server Configuration Manager)](../install-windows/ssrs-encryption-keys-manage-encryption-keys.md). |
  
> **Note:**  
>  If you prefer to use a tool that has a graphical user interface, you can use the Report Server Configuration Manager instead of **rsconfig** and **rskeymgmt**.  
  
## Related content

- [What is the Report Server configuration manager (native mode)?](../install-windows/reporting-services-configuration-manager-native-mode.md)
- [SQL Server Reporting Services tools](reporting-services-tools.md)
- [Reporting Services report server (native mode)](../report-server/reporting-services-report-server-native-mode.md)
