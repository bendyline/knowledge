---
title: "Determine Whether the Database Engine Is Installed and Started"
description: Learn how to determine whether the Database Engine is installed and started. See how to use SQL Server Configuration Manager to check for installed components.
author: rwestMSFT
ms.author: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: configuration
ms.topic: how-to
helpviewer_keywords:
  - "SQL Server, determining if installed"
  - "verifying Database Engine installation"
  - "viewing Database Engine installation"
  - "installed Database Engine verification [SQL Server]"
---
# Determine whether the Database Engine is installed and started


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

A successful installation of the  SQL Server Database Engine 
 installs files to the file system, creates entries in the registry, and installs several tools. This article describes how to determine whether the  Database Engine 
 is installed and started in  SQL Server 
 by using  SQL Server 
 Configuration Manager.

<a id="SSMSProcedure"></a>

## Use SQL Server Configuration Manager

1. Select **Start**, point to **All Programs**, point to **Microsoft SQL Server**, point to **Configuration Tools**, and then select **SQL Server Configuration Manager**.

   If you don't have these entries on the **Start** menu,  SQL Server 
 isn't correctly installed. Run Setup to install the  SQL Server Database Engine 
.

1. In **SQL Server Configuration Manager**, on the left pane, select **SQL Server Services**. The right pane lists several services that are related to  SQL Server 
. If the  Database Engine 
 is installed, the  Database Engine 
 service is listed as **SQL Server (MSSQLSERVER)** if it's the default instance; or **SQL Server (**\<*instance_name*>**)**, if the  Database Engine 
 is installed as a named instance. Unless the instance name is changed,  SQL Server Express 
 installs as a named instance with the name **SQLEXPRESS**. A green triangle icon indicates that the  Database Engine 
 is running. A red square icon indicates that the  Database Engine 
 is stopped.

1. To start the  Database Engine 
, in the right pane, right-click the  Database Engine 
, and then select **Start**.

> **Note:**  
> During setup, the user can select a location in which to install the program files and the database files. If the user accepts the default location, the files are installed to \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\
 and `C:\Program Files\Microsoft SQL Server\MSSQL.<x>`, where `<x>` is a number.
