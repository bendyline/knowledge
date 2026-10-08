---
title: Overview of the Data-Tier Application Experience
titleSuffix: MSSQL Extension for Visual Studio Code
description: Learn how to use the Data-tier Application experience in the MSSQL extension for Visual Studio Code to work with DACPAC and BACPAC files.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: tsiddique, roblescarlos
ms.date: 05/25/2026
ms.service: sql
ms.subservice: vs-code-sql-extensions
ms.topic: overview
ms.collection:
  - data-tools
ai-usage: ai-assisted
---

# Data-tier Application (DACPAC and BACPAC) import and export

The Data-tier Application experience provides an easy-to-use experience to deploy and extract `.dacpac` files and import and export `.bacpac` files.

This experience makes it easier to manage `.dacpac` and `.bacpac` files. It simplifies the development and deployment of data-tier elements that support your application. For more information, see [Data-tier applications (DAC) overview](../../sql-database-projects/concepts/data-tier-applications/overview.md).

## Features

- Deploy a `.dacpac` file to a new or existing SQL database (Publish DACPAC)
- Extract the schema from a SQL database to a `.dacpac` file (Extract DACPAC)
- Import a `.bacpac` file to a new or empty database (Import BACPAC)
- Export the schema and data from a SQL database to a `.bacpac` file (Export BACPAC)

## Install the MSSQL extension

To use the Data-tier Application features, install the MSSQL extension for Visual Studio Code.

1. In Visual Studio Code, select the **Extensions** icon to view available extensions.

   Screenshot of installing the MSSQL extension for Visual Studio Code.

1. Search for the **SQL Server (mssql)** extension and select it to view its details. Select **Install** to add the extension.

1. Once installed, **Reload** to enable the extension in Visual Studio Code (only required when installing an extension for the first time).

> **Tip:**  
> For a comprehensive overview of the MSSQL extension's features and capabilities, see the [MSSQL extension for Visual Studio Code](mssql-extension-visual-studio-code.md).

## Launch the Data-tier Application experience

To launch the experience in the MSSQL extension for Visual Studio Code, right-click the Databases node, or right-click a specific database in the Object Explorer. Then, select **Data-tier Application**.

Screenshot of launching the Data-tier Application experience in the MSSQL extension for Visual Studio Code.

## Feedback and support

If you have ideas, feedback, or want to engage with the community, join the discussion at <https://aka.ms/vscode-mssql-discussions>. To report a bug, visit <https://aka.ms/vscode-mssql-bug>. To request a new feature, go to <https://aka.ms/vscode-mssql-feature-request>.


## Related content

- [Data-tier applications (DAC) overview](../../sql-database-projects/concepts/data-tier-applications/overview.md)
- [Connect to a database with the MSSQL extension for Visual Studio Code](mssql-database-connections.md)
- [Quickstart: Run your first query with the MSSQL extension for Visual Studio Code](mssql-run-first-query.md)
- [GitHub Copilot for MSSQL extension for Visual Studio Code](../github-copilot/overview.md)
- [Database operations](mssql-database-operations.md)
- [Schema Compare](mssql-schema-compare.md)
- [Schema Designer](mssql-schema-designer.md)
- [Visual Studio Code documentation](https://code.visualstudio.com/docs)
- [MSSQL extension for Visual Studio Code repository on GitHub](https://github.com/Microsoft/vscode-mssql)
