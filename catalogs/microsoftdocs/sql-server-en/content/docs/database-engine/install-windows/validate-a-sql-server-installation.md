---
title: "Validate a SQL Server Installation"
description: The SQL Server discovery report can be used to verify the version of SQL Server and the SQL Server features installed on the computer.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/03/2025
ms.service: sql
ms.subservice: install
ms.topic: install-set-up-deploy
helpviewer_keywords:
  - "validating installations [SQL Server]"
monikerRange: ">=sql-server-2017"
---
# Validate a SQL Server installation


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


The  SQL Server 
 discovery report can be used to verify the version of  SQL Server 
 and the  SQL Server 
 features installed on the computer. The **Installed SQL Server features discovery report** displays a report of all products and features installed on the local server, for  SQL Server 2000 (8.x) 
 and later versions. The  SQL Server 
 features discovery report is available on the **Tools** page on the  SQL Server 
 Installation center.

## Run SQL Server features discovery report

Launch the  SQL Server 
 Installation center, using the **Start** menu, point to **All Programs**, point to **Microsoft SQL Server \<Version Name>**, and select **SQL Server Installation Center**. To run the  SQL Server 
 features discovery report, select **Tools** in the left-hand navigation area of **SQL Server Installation Center**, and then select **Installed SQL Server features discovery report**.

The  SQL Server 
 discovery report is saved to `%ProgramFiles%\Microsoft SQL Server\<nnn>\Setup Bootstrap\Log\<last Setup Session>`.

You can also generate the discovery report through the command line. Run `Setup.exe /Action=RunDiscovery` from a command prompt. If you add `/q` to the command line, no UI will be shown, but the report is created in `%ProgramFiles%\Microsoft SQL Server\<nnn>\Setup Bootstrap\Log\<last Setup Session>`.

## Related content

- [View and read SQL Server Setup log files](view-and-read-sql-server-setup-log-files.md)
