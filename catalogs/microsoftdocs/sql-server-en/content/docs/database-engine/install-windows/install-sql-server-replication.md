---
title: "Install SQL Server Replication"
description: Install replication components by using the SQL Server Installation Wizard or in a Command Prompt window.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/03/2025
ms.service: sql
ms.subservice: install
ms.topic: install-set-up-deploy
ms.custom:
  - intro-installation
helpviewer_keywords:
  - "components [SQL Server replication]"
  - "command line installations [SQL Server replication]"
  - "installing replication"
  - "replication [SQL Server], installing"
  - "command prompt [SQL Server replication]"
monikerRange: ">=sql-server-2017"
---
# Install SQL Server replication


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows


Replication components can be installed by using the  SQL Server 
 Installation Wizard or at a command prompt. Install replication when you install  SQL Server 
, or when you modify an existing instance.

After replication components are installed, you must configure the server before you can use replication. For more information, see [Configure Distribution](../../relational-databases/replication/configure-distribution.md) in  SQL Server 
 Books Online.

> **Important:**  
> If you install replication components when you modify an existing instance of  SQL Server 
, you must stop and restart  SQL Server 
 Agent after the installation is completed. This action helps ensure that  SQL Server 
 Agent recognizes the replication agent subsystems and can call replication agents from job steps.

## Install replication by using Setup

To install replication components, including Replication Management Objects (RMO), select **SQL Server Replication** on the **Feature Selection** page of the Installation Wizard.

## Install Replication from the command prompt

See [Install and configure SQL Server on Windows from the command prompt](install-sql-server-from-the-command-prompt.md).

## Related content

- [SQL Server installation guide](install-sql-server.md)
- [Install, configure, or uninstall SQL Server on Windows from the command prompt](install-sql-server-from-the-command-prompt.md)
- [Editions and supported features of SQL Server](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/editions-and-components-of-sql-server-latest.md)
