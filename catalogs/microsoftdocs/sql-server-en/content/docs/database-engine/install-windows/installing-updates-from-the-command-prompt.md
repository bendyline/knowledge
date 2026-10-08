---
title: "Installing Updates from the Command Prompt"
description: This article describes command syntax for SQL Server update installation. You can test and modify installation scripts to meet the needs of your organization.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/03/2025
ms.service: sql
ms.subservice: install
ms.topic: install-set-up-deploy
ms.custom:
  - intro-installation
monikerRange: ">=sql-server-2017"
---
# Installing updates from the command line


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


Test and modify installation scripts to meet the needs of your organization.

## Sample syntax for installation

The name of the update package can vary and might include a language, edition, and processor component. Apply an update at a command prompt, replacing <package_name> with the name of your update package:

- Update a single instance of  SQL Server 
 and all shared components, like  Integration Services 
 and Management Tools: You can specify the instance either by using the InstanceName parameter or the InstanceID parameter. To update a prepared instance of  SQL Server 
, you must specify the InstanceID parameter.

   ```console
   <package_name>.exe /qs /IAcceptSQLServerLicenseTerms /Action=Patch /InstanceName=MyInstance
   ```

    or

    ```console
    <package_name>.exe /qs /IAcceptSQLServerLicenseTerms /Action=Patch /InstanceID=\<Instance ID>
    ```

   
For  SQL Server 2022 (16.x) 
 and later versions, read the Microsoft SQL Server Software License Terms at [aka.ms/useterms](https://aka.ms/useterms).


- Setup can integrate the latest product updates with the main product installation so that the main product and its applicable updates are installed at the same time. You can prepare an installation of database engine instance to include product update:

    ```console
    setup.exe /q /IAcceptSQLServerLicenseTerms /ACTION=PrepareImage /UpdateEnabled=True /UpdateSource=\<path where the update is downloaded> /INSTANCEID=\<Instance ID> /FEATURES=SQLEngine
    ```

- Update  SQL Server 
 shared components only, like  Integration Services 
 and Management Tools:

    ```console
    <package_name>.exe /qs /IAcceptSQLServerLicenseTerms /Action=Patch
    ```

- Update all instances of  SQL Server 
 on the computer and all shared components, like  Integration Services 
 and Management Tools:

    ```console
    <package_name>.exe /qs /IAcceptSQLServerLicenseTerms /Action=Patch /AllInstances
    ```

- Remove an update from a single instance of  SQL Server 
 and all shared components, like  Integration Services 
 and Management Tools:

    ```console
    <package_name>.exe /qs /Action=RemovePatch /InstanceName=MyInstance
    ```

- Remove an update from  SQL Server 
 shared components only, like  Integration Services 
 and Management Tools:

    ```console
    <package_name>.exe /qs /Action=RemovePatch
    ```

  > **Note:**  
  > The update installer ensures that the shared components are always at or above the version of the instance at the highest level.

## Supported parameters

> **Important:**  
> When possible, supply security credentials at run time. If you must store credentials in a script file, secure the file to prevent unauthorized access.

| Switch | Description |
| --- | --- |
| `/?` | Displays unattended installation command prompt help |
| `/action=Patch or /action=RemovePatch` | Specifies the installation action: `Patch` or `RemovePatch`. |
| `/allinstances` | Applies the  SQL Server |
 | update to all instances of  SQL Server |
 | and to all  SQL Server |
 | shared, instance-unaware components. |
| `/instancename=InstanceName` <sup>1</sup> | Applies the  SQL Server |
 | update to an instance of  SQL Server |
 | named `InstanceName`, and to all  SQL Server |
 | shared, instance-unaware components. |
| `/InstanceID=Inst1` | Applies the  SQL Server |
 | update to an instance of  SQL Server |
 | `Inst1`, and to all  SQL Server |
 | shared, instance-unaware components. |
| `/hideconsole` | Specifies that  SQL Server |
 | the console window is hidden or closed. |
| `/quiet` | Runs the  SQL Server |
 | update Setup in unattended mode. |
| `/qs` | Displays only the progress UI dialog. |
| `/UpdateEnabled` | Specifies whether  SQL Server |
 | setup should discover and include product updates. The valid values are `True` and `False` or `1` and `0`. By default,  SQL Server |
 | setup includes updates that it finds. |
| `/IAcceptSQLServerLicenseTerms` | Required only when the `/Q` or `/QS` parameter is specified for unattended installations. |

<sup>1</sup> You can't specify this parameter to apply an update to a prepared instance of  SQL Server 
. You must specify the /instanceID parameter instead.

## Related content

- [Install SQL Server servicing updates](install-sql-server-servicing-updates.md)
