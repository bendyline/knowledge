---
title: Overview of the Schema Compare Feature
titleSuffix: MSSQL Extension for Visual Studio Code
description: Learn how the Schema Compare feature simplifies comparing databases, and gives you full control when synchronizing them, even across different database versions.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: tsiddique, roblescarlos
ms.date: 04/23/2026
ms.service: sql
ms.subservice: vs-code-sql-extensions
ms.topic: overview
ms.collection:
  - data-tools
ai-usage: ai-assisted
---

# Schema Compare

This article provides an overview of the Schema Compare feature in the [MSSQL extension for Visual Studio Code](mssql-extension-visual-studio-code.md). Schema Compare compares two database definitions, and applies the differences from the source to the target, including active database connections, `.dacpac` files, and SQL projects.

Schema Compare simplifies the process of comparing databases, and gives you full control when synchronizing them, even across different database versions. You can selectively filter specific differences, and categories of differences, before applying any changes.

## Features

Schema Compare provides the following features:

- Compare schemas between two `.dacpac` files, databases, or SQL projects.
- View results as a set of actions to match a target against the source.
- Selectively exclude actions listed in results.
- Set options that control the scope of the comparison.
- Apply changes directly to the target, or generate a script to apply changes at a later time.
- Save the comparison.

Screenshot of the main view of Schema Compare showing differences between source and target.

## Install the MSSQL extension

To use the Schema Compare features, install the MSSQL extension for Visual Studio Code:

1. In Visual Studio Code, select the **Extensions** icon to view available extensions.

   Screenshot of installing the MSSQL extension for Visual Studio Code.

1. Search for the **SQL Server (mssql)** extension and select it to view its details. Select **Install** to add the extension.

1. After installation, select **Reload** to enable the extension in Visual Studio Code (only required when installing an extension for the first time).

## Compare schemas

To compare schemas, open the Schema Compare dialog box. Follow these steps:

1. Right-click a database in **Object Explorer** and select **Schema Compare**. The database you select is set as the **Source** database in the comparison.

   Screenshot of Opening Schema Compare by right-clicking a database in Object Explorer.

1. Select one of the ellipses (**...**) to change the **Source** and **Target** of your Schema Compare and select **OK**.

   Screenshot of Changing the source and target in the Schema Compare menu.

1. Select the **Options** button in the toolbar to customize your comparison.

   Screenshot of Opening the options menu in the Schema Compare.

1. Select **Compare** to view the results of the comparison.

   Screenshot of Selecting the Compare button to view schema differences.

## Apply changes

After you review the comparison results, apply the selected changes to the target.

1. Navigate through the object list, and make sure that you select the objects you want to apply changes to.

   Screenshot of Viewing the list of schema differences in the Schema Compare.

1. Apply the changes to your target.

   Screenshot of Applying selected schema changes to the target database.

## Feedback and support

If you have ideas, feedback, or want to engage with the community, join the discussion at <https://aka.ms/vscode-mssql-discussions>. To report a bug, visit <https://aka.ms/vscode-mssql-bug>. To request a new feature, go to <https://aka.ms/vscode-mssql-feature-request>.


## Related content

- [Connect to a database with the MSSQL extension for Visual Studio Code](mssql-database-connections.md)
- [Quickstart: Run your first query with the MSSQL extension for Visual Studio Code](mssql-run-first-query.md)
- [GitHub Copilot for MSSQL extension for Visual Studio Code](../github-copilot/overview.md)
- [Schema Designer](mssql-schema-designer.md)
- [Data-tier Application (DACPAC and BACPAC) import and export](mssql-data-tier-application.md)
- [Visual Studio Code documentation](https://code.visualstudio.com/docs)
- [MSSQL extension for Visual Studio Code repository on GitHub](https://github.com/Microsoft/vscode-mssql)
