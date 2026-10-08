---
title: "Package Management (SSIS Service)"
description: "Package Management (SSIS Service)"
ms.date: "11/16/2016"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "sql13.dts.dtsserver.importpackage.f1"
  - "sql13.dts.dtsserver.exportpackage.f1"
helpviewer_keywords:
  - "SQL Server Integration Services packages, managing"
  - "packages [Integration Services], managing"
  - "Integration Services packages, managing"
  - "storing packages"
  - "Stored Packages folder"
  - "current packages"
  - "Running Packages folder"
  - "status information [Integration Services]"
  - "SSIS packages, managing"
  - "storage [Integration Services]"
  - "monitoring [Integration Services], packages"
  - "Integration Services service, package management"
  - "services [Integration Services], package management"
---
# Package Management (SSIS Service)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Package management includes monitoring, managing, importing and exporting packages.  
 
 ## Package Store  
  Integration Services 
 provides two top-level folders for accessing packages: 
 - **Running Packages** 
 - **Stored Packages**

 The **Running Packages** folder lists the packages that are currently running on the server. The **Stored Packages** folder lists the packages that are saved in the package store. These are the only packages that the  Integration Services 
 service manages. The package store can consist of either or both the msdb database and file system folders listed in the  Integration Services 
 service configuration file. The configuration file specifies the msdb and file system folders to manage. You might also have packages stored elsewhere in the file system that are not managed by the  Integration Services 
 service.  
  
 Packages you save to msdb are stored in a table named sysssispackages. When you save packages to msdb, you can group them in logical folders. Using logical folders can help you organize packages by purpose, or filter packages in the sysssispackages table. Create new logical folders in  SQL Server Management Studio 
. By default, any logical folders that you add to msdb are automatically included in the package store.  
  
 The logical folders you create are represented as rows in the sysssispackagefolders table in msdb. The folderid and parentfolderid columns in sysssispackagefolders define the folder hierarchy. The root logical folders in msdb are the rows in sysssispackagefolders with null values in the parentfolderid column. For more information, see [sysssispackages &#40;Transact-SQL&#41;](../../relational-databases/system-tables/sysssispackages-transact-sql.md) and [sysssispackagefolders (Transact-SQL&)](../../relational-databases/system-tables/sysssispackagefolders-transact-sql.md).  
  
 When you open  SQL Server Management Studio 
 and connect to  Integration Services 
, you will see the msdb folders that  Integration Services 
 service manages listed within the Stored Packages folder. If the configuration file specifies root file system folders, the Stored Packages folder also lists packages saved to the file system in those folders and in all subfolders.  
  
 You can store packages in any file system folder, but they will not be listed in subfolders of the **Stored Packages** folder unless you add the folder to the list of folders in the configuration file for the package store. For more information about the configuration file, see [Integration Services Service (SSIS Service)](integration-services-service-ssis-service.md).  
  
 The **Running Packages** folder contains no subfolders and it is not extensible.  
  
 By default, the **Stored Packages** folder contains two folders: **File System** and **MSDB**. The **File System** folder lists the packages that are saved to the file system. The location of these files is specified in the configuration file for the  Integration Services 
 service. The default folder is the Packages folder, located in %Program Files%\Microsoft SQL Server\100\DTS. The **MSDB** folder lists the  Integration Services 
 packages that have been saved to the  SQL Server 
 msdb database on the server. The sysssispackages table contains the packages saved to msdb.  
  
 To view the list of packages in the package store, you must open  SQL Server Management Studio 
 and connect to  Integration Services 
.  
  
## Monitor running packages  
 The **Running Packages** folder lists packages currently running. To view information about current packages on the **Summary** page of  SQL Server Management Studio 
, click the **Running Packages** folder. Information such as the execution duration of running packages is listed on the **Summary** page. Optionally, refresh the folder to display the most current information.  
  
 To view information about a single running package on the **Summary** page, click the package. The **Summary** page displays information such as the version and description of the package.  
  
Stop a running package from the **Running Packages** folder by right-clicking the package and then clicking **Stop**.  
  
## View packages in SSMS
    
 This procedure describes how to connect to  Integration Services 
 in  SQL Server Management Studio 
 and view a list of the packages that the  Integration Services 
 service manages.  
  
### To connect to Integration Services  
  
1.  Click **Start**, point to **All Programs**, point to **Microsoft SQL Server**, and then click **SQL Server Management Studio**.  
  
2.  In the **Connect to Server** dialog box, select **Integration Services** in the **Server type** list, provide a server name in the **Server name** box, and then click **Connect**.  
  
    > **Important:**  
    >  If you cannot connect to  Integration Services 
, the  Integration Services 
 service is likely not running. To learn the status of the service, click **Start**, point to **All Programs**, point to **Microsoft SQL Server**, point to **Configuration Tools**, and then click **SQL Server Configuration Manager**. In the left pane, click **SQL Server Services**. In the right pane, find the  Integration Services 
 service. Start the service if it is not already running.  
  
      SQL Server Management Studio 
 opens. By default the Object Explorer window is open and positioned in the lower-left corner of the studio. If Object Explorer is not open, click **Object Explorer** on the **View** menu.  
  
### To view the packages that Integration Services service manages  
  
1.  In Object Explorer, expand the Stored Packages folder.  
  
2.  Expand the Stored Packages subfolders to show packages.  

## Import and export packages
 
 Packages can be saved either in the sysssispackages table in the  SQL Server 
 msdb database or in the file system.  
  
 The package store, which is the logical storage that  Integration Services 
 service monitors and manages, can include both the msdb database and the file system folders specified in the configuration file for the  Integration Services 
 service.  
  
 You can import and export packages between the following storage types:  
  
-   File system folders anywhere in the file system.  
  
-   Folders in the SSIS Package Store. The two default folders are named File System and MSDB.  
  
-   The  SQL Server 
 msdb database.  
  
  Integration Services 
 gives you the ability to import and export packages, and by doing this change the storage format and location of packages. Using the import and export features, you can add packages to the file system, package store, or msdb database, and copy packages from one storage format to another. For example, packages saved in msdb can be copied to the file system and vice versa.  
  
 You can also copy a package to a different format using the **dtutil** command prompt utility (dtutil.exe). For more information, see [dtutil Utility](../dtutil-utility.md).  
  
 You can import or export an  Integration Services 
 package from or to the following locations:  
  
-   You can import a package that is stored in an instance of  Microsoft 
  SQL Server 
, in the file system, or in the  SSIS 
 package store. The imported package is saved to  SQL Server 
 or to a folder in the  SSIS 
 package store.  
  
-   You can export a package that is stored in an instance of  SQL Server 
, the file system, or the  SSIS 
 Package Store to a different storage format and location.  
  
 However, there are some restrictions on importing and exporting a package between different versions of  SQL Server 
:  
  
-   On an instance of  SQL Server 2008 (10.0.x) 
, you can import packages from an instance of  SQL Server 2005 (9.x) 
, but you cannot export packages to an instance of  SQL Server 2005 (9.x) 
.  
  
-   On an instance of  SQL Server 2005 (9.x) 
, you cannot import packages from, or export packages to, an instance of  SQL Server 2008 (10.0.x) 
.  
  
 The following procedures describe how to use  SQL Server Management Studio 
 to import or export a package.  
  
### To import a package by Using SQL Server Management Studio  
  
1.  Click **Start**, point to **Microsoft**  SQL Server 
, and then click **SQL Server Management Studio**.  
  
2.  In the **Connect to Server** dialog box set the following options:  
  
    -   In the **Server type** box, select **Integration Services**.  
  
    -   In the **Server name** box, provide a server name or click **\<Browse for more...>** and locate the server to use.  
  
3.  If Object Explorer is not open, on the **View** menu, click **Object Explorer**.  
  
4.  In Object Explorer, expand the **Stored Packages** folder.  
  
5.  Expand the subfolders to locate the folder into which you want to import a package.  
  
6.  Right-click the folder, click **Import Package**, and then do one of the following:  
  
    -   To import from an instance of  SQL Server 
, select the **SQL Server** option, and then specify the server and select the authentication mode. If you select  SQL Server 
 Authentication, provide a user name and a password.  
  
         Click the browse button **(...)**, select the package to import, and then click **OK.**  
  
    -   To import from the file system, select the **File system** option.  
  
         Click the browse button **(...)**, select the package to import, and then click **Open.**  
  
    -   To import from the  SSIS 
 Package Store, select the **SSIS Package Store** option and specify the server.  
  
         Click the browse button **(...)**, select the package to import, and then click **OK.**  
  
7.  Optionally, update the package name.  
  
8.  To update the protection level of the package, click the browse button **(...)** and choose a different protection level by using the **Package Protection Level** dialog box. If the **Encrypt sensitive data with password** or the **Encrypt all data with password** option is selected, type and confirm a password.  
  
9. Click **OK** to complete the import.  
  
### To export a package by Using SQL Server Management Studio  
  
1.  Click **Start**, point to **Microsoft**  SQL Server 
, and then click **SQL Server Management Studio**.  
  
2.  In the **Connect to Server** dialog box, set the following options:  
  
    -   In the **Server type** box, select **Integration Services**.  
  
    -   In the **Server name** box, provide a server name or click **\<Browse for more...>** and locate the server to use.  
  
3.  If Object Explorer is not open, on the **View** menu, click **Object Explorer**.  
  
4.  In Object Explorer, expand the **Stored Packages** folder.  
  
5.  Expand the subfolders to locate the package you want to export.  
  
6.  Right-click the package, click **Export**, and then do one of the following:  
  
    -   To export to an instance of  SQL Server 
, select the **SQL Server** option, and then specify the server and select the authentication mode. If you select  SQL Server 
 Authentication, provide a user name and a password.  
  
         Click the browse button **(...)**, and expand the **SSIS Packages** folder to locate the folder to which you want to save the package. Optionally, update the default name of the package, and then click **OK**.  
  
    -   To export to the file system, select the **File System** option.  
  
         Click the browse button **(...)** to locate the folder to which you want to export the package, type the name of the package file, and then click **Save.**  
  
    -   To export to the  SSIS 
 package store, select the **SSIS Package Store** option, and specify the server.  
  
         Click the browse button **(...)**, expand the **SSIS Packages** folder, and select the folder to which you want to save the package. Optionally, enter a new name for the package in the **Package Name** text box. Select **OK**.
  
7.  To update the protection level of the package, click the browse button **(...)** and choose a different protection level by using the **Package Protection Level** dialog box. If the **Encrypt sensitive data with password** or the **Encrypt all data with password** option is selected, type and confirm a password.  
  
8.  Click **OK** to complete the export.  

## Import Package Dialog Box UI Reference
  Use the **Import Package** dialog box, available in  SQL Server Management Studio 
, to import a  Integration Services 
 package and to set or modify the protection level of the package.  
  
### Options  
 **Package location**  
 Select the type of storage location to import the package to. The following options are available:  
  
 **SQL Server**  
  
 **File System**  
  
 **SSIS Package Store**  
  
 **Server**  
 Type a server name or select a server from the list.  
  
 **Authentication**  
 Select Windows Authentication or  SQL Server 
 Authentication. This option is available only if the storage location is  SQL Server 
.  
  
> **Important:**  
>  Whenever possible, use Windows Authentication.  
  
 **Authentication type**  
 Select an authentication type.  
  
 **User name**  
 If using  SQL Server 
 Authentication, provide a user name.  
  
 **Password**  
 If using  SQL Server 
 Authentication, provide a password.  
  
 **Package path**  
 Type the package path, or click the browse button **(...)** and locate the package.  
  
 **Package name**  
 Optionally, rename the package. The default name is the name of the package to import.  
  
 **Protection level**  
 Click the browse button **(...)** and, in the **Package Protection Level** dialog box, update the protection level. For more information, see [Package and Project Protection Level Dialog Box](../security/access-control-for-sensitive-data-in-packages.md#protection_dialog).  

## Export Package Dialog Box UI Reference
  Use the **Export Package** dialog box, available in  SQL Server Management Studio 
, to export a  Integration Services 
 package to a different location and optionally, modify the protection level of the package.  
  
### Options  
 **Package location**  
 Select the type of storage to export the package to. The following options are available:  
  
 **SQL Server**  
  
 **File System**  
  
 **SSIS Package Storage**  
  
 **Server**  
 Type a server name or select a server from the list.  
  
 **Authentication**  
 Select Windows Authentication or  SQL Server 
 Authentication. This option is available only if the storage location is  SQL Server 
.  
  
> **Important:**  
>  Whenever possible, use Windows Authentication.  
  
 **Authentication type**  
 Select an authentication type.  
  
 **User name**  
 If using  SQL Server 
 Authentication, provide a user name.  
  
 **Password**  
 If using  SQL Server 
 Authentication, provide a password.  
  
 **Package path**  
 Type the package path, or click the browse button **(...)** and locate the folder in which to store the package.  
  
 **Protection level**  
 Click the browse button **(...)** and update the protection level in the **Package Protection Level** dialog box. For more information, see [Package and Project Protection Level Dialog Box](../security/access-control-for-sensitive-data-in-packages.md#protection_dialog).  

## Back up and restore packages
  
  SQL Server 
  Integration Services 
 packages can be saved to the file system or msdb, a  SQL Server 
 system database. Packages saved to msdb can be backed up and restored using  SQL Server 
 backup and restore features.  
  
 For more information about backing up and restoring the msdb database, click one of the following topics:  
  
-   [Back Up and Restore of SQL Server Databases](../../relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases.md)  
  
-   [Back Up and Restore of System Databases &#40;SQL Server&#41;](../../relational-databases/backup-restore/back-up-and-restore-of-system-databases-sql-server.md)  
  
  Integration Services 
 includes the **dtutil** command-prompt utility (dtutil.exec), which you can use to manage packages. For more information, see [dtutil Utility](../dtutil-utility.md).  
  
### Configuration Files  
 Any configuration files that the packages include are stored in the file system. These files are not backed up when you back up the msdb database; therefore, you should make sure that the configuration files are backed up regularly as part of your plan for securing packages saved to msdb. To include configurations in the backup of the msdb database, you should consider using the  SQL Server 
 configuration type instead of file-based configurations.  
  
### Packages Stored in the File System  
 The backup of packages that are saved to the file system should be included in the plan for backing up the file system of the server. The  Integration Services 
 service configuration file, which has the default name MsDtsSrvr.ini.xml, lists the folders on the server that the service monitors. You should make sure these folders are backed up. Additionally, packages may be stored in other folders on the server and you should make sure to include these folders in the backup.  

## Related content

- [Integration Services Service (SSIS Service)](integration-services-service-ssis-service.md)
