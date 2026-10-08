---
title: "Upgrade Integration Services Packages Using the SSIS Package Upgrade Wizard"
description: "Upgrade Integration Services Packages Using the SSIS Package Upgrade Wizard"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: upgrade-and-migration-article
helpviewer_keywords:
  - "Integration Services packages, upgrading"
  - "upgrading Integration Services packages"
---
# Upgrade Integration Services Packages Using the SSIS Package Upgrade Wizard


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  You can upgrade packages that were created in earlier versions of  Integration Services 
 to the  Integration Services 
 format that  SQL Server 2019 (15.x) 
 uses.  SQL Server 
 provides the  SSIS 
 Package Upgrade Wizard to help in this process. Because you can configure the wizard to backup up your original packages, you can continue to use the original packages if you experience upgrade difficulties.  
  
 The  SSIS 
 Package Upgrade Wizard is installed when  Integration Services 
 is installed.  
  
> **Note:**  
>  The  SSIS 
 Package Upgrade Wizard is available in the Standard, Enterprise, and Developer Editions of  SQL Server 
.  
  
 For more information about how to upgrade  Integration Services 
 packages, see [Upgrade Integration Services Packages](upgrade-integration-services-packages.md).  
  
 The remainder of this topic describes how to run the wizard and back up the original packages.  
  
## Running the SSIS Package Upgrade Wizard  
 You can run the  SSIS 
 Package Upgrade Wizard from  SQL Server Data Tools (SSDT) 
, from  SQL Server Management Studio 
, or at the command prompt.  
  
#### To run the wizard from SQL Server Data Tools  
  
1.  In  SQL Server Data Tools (SSDT) 
, create or open an  Integration Services 
 project.  
  
2.  In Solution Explorer, right-click the **SSIS Packages** node, and then click **Upgrade All Packages** to upgrade all the packages under this node.  
  
    > **Note:**  
    >  When you open an  Integration Services 
 project that contains  SQL Server 2008 Integration Services (SSIS) 
 or later packages,  Integration Services 
 automatically opens the  SSIS 
 Package Upgrade Wizard.  
  
#### To run the wizard from SQL Server Management Studio  
  
-   In  SQL Server Management Studio 
, connect to  Integration Services 
, expand the **Stored Packages** node, and right-click the **File System** or **MSDB** node, and then click **Upgrade Packages**.  
  
#### To run the wizard at the command prompt  
  
-   At the command prompt, run the SSISUpgrade.exe file from the **C:\Program Files\Microsoft SQL Server\130\DTS\Binn** folder.  
  
## Backing Up the Original Packages  
 To back up the original packages, both the original packages and the upgraded packages must be stored in the same folder in the file system. Depending on how you run the wizard, this storage location might be automatically selected.  
  
-   When you run the  SSIS 
 Package Upgrade Wizard from  SQL Server Data Tools (SSDT) 
, the wizard automatically stores both the original packages and upgraded packages in the same folder in the file system.  
  
-   When you run the  SSIS 
 Package Upgrade Wizard from  SQL Server Management Studio 
 or at the command prompt, you can specify different storage locations for the original and upgraded packages. To back up the original packages, make sure to specify that both the original and upgraded packages are stored in the same folder in the file system. If you specify any other storage options, the wizard will not be able to back up the original packages.  
  
 When the wizard backs up the original packages, the wizard stores a copy of the original packages in an **SSISBackupFolder** folder. The wizard creates this **SSISBackupFolder** folder as a subfolder to the folder that contains the original packages and the upgraded packages.  
  
#### To back up the original packages in SQL Server Management Studio or at the command prompt  
  
1.  Save the original packages to a location on the file system.  
  
    > **Note:**  
    >  The backup option in the wizard only works with packages that have been stored to the file system.  
  
2.  In  SQL Server Management Studio 
 or at the command prompt, run the  SSIS 
 Package Upgrade Wizard.  
  
3.  On the **Select Source Location** page of the wizard, set the **Package source** property to **File System**.  
  
4.  On the **Select Destination Location** page of the wizard, select **Save to source location** to save the upgraded packages to the same location as the original packages.  
  
    > **Note:**  
    >  The backup option in the wizard is available only when the upgraded packages are stored in the same folder as the original packages.  
  
5.  On the **Select Package Management Options** page of the wizard, select the **Backup original packages** option.  
  
#### To back up the original packages in SQL Server Data Tools  
  
1.  Save the original packages to a location on the file system.  
  
2.  On the **Select Package Management Options** page of the wizard, select the **Backup original packages** option.  
  
    > **Warning:**  
    >  The **Backup original packages** option is not displayed when you open a  SQL Server 2008 Integration Services (SSIS) 
 or later project in  SQL Server Data Tools (SSDT) 
, which automatically launches the wizard.  
  
3.  In  SQL Server Data Tools (SSDT) 
, run the  SSIS 
 Package Upgrade Wizard.
