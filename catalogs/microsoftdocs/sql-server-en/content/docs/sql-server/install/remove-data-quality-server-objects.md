---
title: "Remove Data Quality Server Objects"
description: If you uninstall Data Quality Server from an instance of SQL Server, some Data Quality Server objects, including the DQS databases, must be deleted manually.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: install
ms.topic: upgrade-and-migration-article
---
# Remove Data Quality Server Objects

**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 on Windows


  Uninstalling  Data Quality Server 
 from an instance of  SQL Server 
, or completely removing an instance of  SQL Server 
 that has  Data Quality Server 
 does not delete some  Data Quality Server 
 objects, including the DQS databases. This implies that you do not lose your DQS data if you uninstall  Data Quality Server 
 using the SQL Server setup. You must manually delete these  Data Quality Server 
 objects after the uninstall process is complete.  
  
> **Note:**
>  -   Before uninstalling  Data Quality Server 
, consider backing up all your existing knowledge bases by exporting it to a .dqsb file, and use the file later to import all the knowledge bases back to a new  Data Quality Server 
 installation. Exporting and importing of all DQS knowledge bases can only be done by running DQSInstaller.exe with appropriate command line parameters from the command prompt. For more information, see [Export and Import DQS Knowledge Bases Using DQSInstaller.exe](../../data-quality-services/install-windows/export-and-import-dqs-knowledge-bases-using-dqsinstaller-exe.md).  
> -   Before deleting the DQS databases, consider backing up the databases if you want to preserve it, and use it later for restoring the data. For information about doing so, see [Manage DQS Databases](../../data-quality-services/manage-dqs-databases.md).  
  
## Uninstall Data Quality Server from a SQL Server Instance  
 If you are just uninstalling  Data Quality Server 
 from an instance of  SQL Server 
, you must manually delete the following  Data Quality Server 
 objects from the  SQL Server 
 instance after the  Data Quality Server 
 uninstall process is complete:  
  
-   DQS_MAIN, DQS_PROJECTS, and DQS_STAGING_DATA databases.  
  
-   \##MS_dqs_db_owner_login## and ##MS_dqs_service_login## logins.  
  
-   DQInitDQS_MAIN stored procedure from the master database.  
  
 You can delete these objects in SQL Server Management Studio by right-clicking the object, and clicking **Delete** in the shortcut menu.  
  
> **Important:**  
>  If you just uninstall  Data Quality Server 
 from a SQL Server instance using the `-uninstall` command line parameter from the command prompt, all the DQS objects are deleted as part of the uninstall process. You do not have to delete them manually after uninstalling  Data Quality Server 
. To uninstall  Data Quality Server 
 from command prompt, type the following command at the command prompt, and press ENTER:   
> `dqsinstaller.exe -uninstall`  
  
## Uninstall SQL Server Instance Containing Data Quality Server  
 If you are completely uninstalling the  SQL Server 
 instance that has  Data Quality Server 
, you must manually delete the DQS_MAIN, DQS_PROJECTS, and DQS_STAGING_DATA databases from your computer after the uninstall process is complete. For a default  SQL Server 
 installation, the DQS_MAIN, DQS_PROJECTS, and DQS_STAGING_DATA databases files are available at C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA.  
  
## Related content

- [Uninstall an existing instance of SQL Server (Setup)](uninstall-an-existing-instance-of-sql-server-setup.md)
- [Uninstall SQL Server](uninstall-sql-server.md)
