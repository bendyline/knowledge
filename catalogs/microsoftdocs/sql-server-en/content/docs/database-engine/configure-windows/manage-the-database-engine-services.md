---
title: Manage the Database Engine Services
description: Get acquainted with services that are available in SQL Server. See how to start SQL Server Configuration Manager, which you can use to manage various services.
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/16/2026
ms.service: sql
ms.subservice: configuration
ms.topic: concept-article
helpviewer_keywords:
  - "SQL Server Configuration Manager, accessing"
  - "Database Engine [SQL Server], services"
  - "managing services [SQL Server], about service management"
  - "services [SQL Server]"
  - "SQL Server Agent service, managing"
  - "SQL Server services, about SQL Server service"
  - "MSSQLServer"
  - "server configuration [SQL Server]"
  - "managing services [SQL Server]"
  - "SQL Server Agent service"
  - "services [SQL Server], managing"
  - "administering SQL Server, services"
  - "SQL Server services"
---
# Manage the Database Engine services


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

 SQL Server 
 runs on the operating systems as a service. A service is a type of application that runs in the system background. Services usually provides core operating system features, such as Web serving, event logging, or file serving. Services can run without showing a user interface on the computer desktop. The  SQL Server Database Engine 
,  SQL Server 
 Agent, and several other  SQL Server 
 components run as services. These services typically are started when the operating system starts. This depends on what is specified during setup; some services aren't started by default. This section describes the management of the various  SQL Server 
 services. Before you log in to an instance of  SQL Server 
, you need to know how to start, stop, pause, resume, and restart an instance of  SQL Server 
. After you're logged in, you can perform tasks such as administering the server or querying a database.

## Use the SQL Server service

When you start an instance of  SQL Server Database Engine 
, you're starting the  SQL Server 
 service. After you start the  SQL Server 
 service, users can establish new connections to the server. The  SQL Server 
 service can be started and stopped as a service, either locally or remotely. The  SQL Server 
 service is referred to as  SQL Server 
 (MSSQLSERVER) if it's the default instance, or MSSQL$*\<instancename\>* if it's a named instance.

## Use SQL Server Configuration Manager

 SQL Server 
 Configuration Manager allows you to stop, start, or pause various  SQL Server 
 services.

> **Note:**  
>  SQL Server 
 Configuration Manager can't manage  SQL Server 2000 (8.x) 
 services.

You can also use  SQL Server 
 Configuration Manager to view the properties of the selected service.  SQL Server 
 Configuration Manager is a  Microsoft 
 Management Console (MMC) snap-in. For more information about MMC and how a snap-in works, see Windows Help.

Because SQL Server Configuration Manager is a snap-in for the  Microsoft 
 Management Console program and not a stand-alone program, SQL Server Configuration Manager might not appear as an application in newer versions of Windows.

From the Windows **Start** menu, type `SQLServerManager17.msc` (for  SQL Server 2025 (17.x) 
). For other versions of  SQL Server 
, replace `17` with the appropriate number. Selecting `SQLServerManager17.msc` opens SQL Server Configuration Manager.

You can pin SQL Server Configuration Manager to the Start menu or taskbar when you right-click `SQLServerManager17.msc`, and then select **Open file location**. In File Explorer, right-click `SQLServerManager17.msc`, and then select **Pin to Start** or **Pin to taskbar**.


## Manage services

- [Broadcast a shutdown message from the command prompt](broadcast-a-shutdown-message-command-prompt.md)
- [Change server authentication mode](change-server-authentication-mode.md)
- [Configure file system permissions for Database Engine access](configure-file-system-permissions-for-database-engine-access.md)
- [Configure Windows service accounts and permissions](configure-windows-service-accounts-and-permissions.md)
- [Database Engine Service startup options](database-engine-service-startup-options.md)
- [Sign in to an instance of SQL Server (Command Prompt)](log-in-to-an-instance-of-sql-server-command-prompt.md)
- [Run SQL Server with or without a network](run-sql-server-with-or-without-a-network.md)
- [Security requirements for managing services](security-requirements-for-managing-services.md)
- [Single-user mode for SQL Server](start-sql-server-in-single-user-mode.md)
- [SQL Server Browser service (Database Engine and SSAS)](sql-server-browser-service-database-engine-and-ssas.md)
- [SQL Server Configuration Manager: Change the password of the accounts used](scm-services-change-the-password-of-the-accounts-used.md)
- [SQL Server Configuration Manager: Change the service startup account](scm-services-change-the-service-startup-account.md)
- [SQL Server Configuration Manager: Configure server startup options](scm-services-configure-server-startup-options.md)
- [SQL Server Configuration Manager: Configure SQL Server error logs](scm-services-configure-sql-server-error-logs.md)
- [SQL Server Configuration Manager: Connect to another computer](scm-services-connect-to-another-computer.md)
- [SQL Server Configuration Manager: Prevent automatic startup of an instance](scm-services-prevent-automatic-startup-of-an-instance.md)
- [SQL Server Configuration Manager: Set an instance to start automatically](scm-services-set-an-instance-to-start-automatically.md)
- [SQL Writer service](sql-writer-service.md)
- [Start SQL Server with minimal configuration](start-sql-server-with-minimal-configuration.md)
- [Start, stop, pause, resume, and restart SQL Server services](start-stop-pause-resume-restart-sql-server-services.md)

## Related content

- [Configure SQL Server Agent](https://learn.microsoft.com/ssms/agent/configure-sql-server-agent)
- [Sign in to SQL Server](logging-in-to-sql-server.md)
