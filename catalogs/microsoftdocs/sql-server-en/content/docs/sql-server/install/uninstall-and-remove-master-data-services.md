---
title: "Uninstall and Remove Master Data Services"
description: This uninstall process removes Master Data Services folders and files, and uninstalls Master Data Services Configuration Manager from the local computer.
author: rwestMSFT
ms.author: randolphwest
ms.date: 09/07/2025
ms.service: sql
ms.subservice: install
ms.topic: how-to
---
# Uninstall and remove Master Data Services


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 on Windows


To uninstall the  Master Data Services 
 feature from an instance of  SQL Server 
, follow the steps in [Uninstall an existing instance of SQL Server (Setup)](uninstall-an-existing-instance-of-sql-server-setup.md) and specify  Master Data Services 
 as a feature to remove on the **Select Features** page.

## Uninstall MDS

The uninstall process removes  Master Data Services 
 (MDS) folders and files, and uninstalls  Master Data Services Configuration Manager 
 from the local computer.

To prevent data loss and avoid affecting other computers in the system, some items aren't removed or changed by the uninstall process. Review the following table to determine whether to leave or remove items.

| Item | Description |
| --- | --- |
| Folders and files | The uninstall process removes most folders and files from the installation path.<br /><br />The uninstall process doesn't remove the Master Data Services and MDSTempDir folders from the installation location. After the uninstall process is complete, you can manually delete these folders from the file system. For more information, see [Folder and File Permissions (Master Data Services)](../../master-data-services/folder-and-file-permissions-master-data-services.md). |
| Master Data Services |
 | assemblies | The uninstall process removes  Master Data Services |
 | assemblies from the Global Assembly Cache (GAC). |
| Database | The uninstall process doesn't affect the  Master Data Services |
 | database. The database remains intact in the instance of  Database Engine |
 | so that you don't lose any data, including master data, model objects, user and group permissions, business rules, and so on.<br /><br />If you don't need the database, and don't anticipate connecting it to another  Master Data Services |
 | web site or application in the future, you might want to delete the database from the instance of  Database Engine |
 | that hosts it. For more information, see [Delete a Database](../../relational-databases/databases/delete-a-database.md). |
| Master Data Manager |
 | and Web.config | The uninstall process removes the WebApplication folder from the file system. The WebApplication folder contains the web application files and Web.config file for  Master Data Manager |
| .<br /><br />**Important**: Before you uninstall, you might want to copy the Web.config file to another location to preserve any custom settings or other information in the file. After the uninstall process completes, the Web.config file isn't recoverable. |
| Internet Information Services (IIS) items | The uninstall process doesn't affect any application pools, web sites, or web applications in IIS on the local computer. Because the uninstall process removes the WebApplication folder and Web.config file for  Master Data Manager |
| , any  Master Data Manager |
 | web applications that require those files will no longer serve content. If users try to access the web application, they receive HTTP Error 500.19-Internal Server Error: "The requested page cannot be accessed because the related configuration data for the page is invalid."<br /><br />If you no longer require the web site or application, and the application pool serving your site or application, you can use an IIS tool to delete them. For more information, see [IIS 7 Operations Guide](https://learn.microsoft.com/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/cc732976\(v=ws.10\)) on  Microsoft |
 | TechNet. |
| **MDS_ServiceAccounts** group | After the uninstall process is complete, the **MDS_ServiceAccounts** Windows group and any service accounts added to the group remain. If you no longer need the group and accounts, you can remove them. |
| Registry | The uninstall process removes all  Master Data Services |
 | registry keys from the Windows registry. |

## Related content

- [Installation Tasks for Master Data Services](../../master-data-services/install-windows/install-master-data-services.md)
