---
title: Create Azure Functions with the SQL Bindings Extension for Visual Studio Code Through Command Palette
description: Use the Visual Studio Code command palette to create Azure functions with SQL Bindings.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: vabhog, drskwier, maghan
ms.date: 01/19/2026
ms.service: sql
ms.subservice: vs-code-sql-extensions
ms.topic: how-to
ms.collection:
  - data-tools
ms.custom:
  - sfi-image-nochange
---

# Create Azure Functions with the SQL Bindings extension for Visual Studio Code through the Command Palette


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





## Overview

SQL Bindings for Visual Studio Code lets you develop Azure Functions with Azure SQL bindings. For more information, see [Create Azure Functions with the SQL Bindings extension for Visual Studio Code](create-azure-function.md). To install the extension, see [SQL Bindings extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-mssql.sql-bindings-vscode).

## Command Palette

Run the **MS SQL: Create Azure Function with SQL Binding** command from the command palette to create a new function with a SQL binding.

Screenshot of a Visual Studio Code command palette command \`MS SQL: Create Azure Function with SQL Binding (preview).

The extension prompts you to select the object type to insert (`Input binding`) or upsert into (`Output binding`), either a table or view.

Screenshot of a prompt to select the object type.

Then, the extension prompts you to select a connection profile to use for the Azure Function or create a connection profile.

Screenshot of a prompt for connection profile.

After you select or create a connection profile, the extension prompts you to select the database from the selected connection to use for the Azure Function.

Screenshot of a prompt for a database.

After you select a database, the extension prompts you to select a table or view to use, or to enter a table or view to query or upsert into. This prompt is based on the object type you selected earlier.

> **Note:**  
> Azure Function with SQL Binding from a view is only supported for `Input` bindings.

Prompt for Table:

Screenshot of a prompt for table.

Prompt for View:

Screenshot of a prompt for view.

The extension then prompts you to enter the function name to use for the Azure Function.

Screenshot of a prompt to enter function name.

If you already have connection strings stored in the `local.settings.json` file, the extension prompts you to select the connection string to use for the Azure Function or create a new connection string.

Screenshot of a prompt to select connection string setting.

If you select **Create new local app setting**, the extension prompts you to enter the connection string name and value.

Screenshot of a prompt to enter connection string.

If you're creating the Azure Function with SQL Binding to an existing Azure Function project, the extension prompts you whether you want to include the password for the connection string in the `local.settings.json` file.

Screenshot of a prompt to save the password to the SQL connection string.

If you select **Yes**, the password is saved to the `local.settings.json` file. If you select **No**, the extension warns you that the password isn't saved to the `local.settings.json` file (shown in this example), and you need to manually add the password to this file later.

Screenshot of a warning to add password to SQL connection string later manually.

The extension then prompts you to provide the namespace for the Azure Function.  
Screenshot of a prompt for namespace for the Azure Function.

If you're creating a brand new Azure Function project with SQL binding, the extension prompts whether you want to include the password for the connection string in the `local.settings.json` file.

A progress notification appears to indicate that the Azure Function is complete.

Screenshot of an information message indicating finished creating Azure Function Project.

After you create the Azure Function, the extension generates code for either an `Input` or `Output` binding. For more information, see [Generated code for Azure functions with SQL bindings](create-azure-function.md#generated-code-for-azure-functions-with-sql-bindings).

### Open an Azure Function

Open the C# Azure Function in an editor. Then, run the **MS SQL: Add SQL Binding** command from the command palette to add a SQL binding to an existing function.

Screenshot of adding a SQL binding to an existing Azure Function.

The extension prompts you to select an Azure function in the current file to add the SQL binding to.
Screenshot of Azure Functions found in project.

If you're creating an Azure Function with SQL binding from a table, the extension prompts you to select the binding type to use. Choose either an `Input` (retrieves data from a database) or `Output` (saves data to a database) binding.

If you already have connection strings stored in the `local.settings.json` file, the extension prompts you to select the connection string to use for the Azure Function or create a new connection string.

Screenshot of a prompt to select or create a new connection string setting.

If you select **Create new local app setting**, the extension prompts you to enter the connection string name and value.

Screenshot of a prompt to enter connection string.

The extension then prompts you to select a connection string method to select a connection profile or enter a connection string to use for the SQL binding.

Screenshot of a prompt to select connection string setting method.

If you decide to select a connection profile, the extension prompts you to select the database from the selected connection to use for the Azure Function.

Once you select a database, the extension prompts you to select a table to use, or to enter a table or view to query or upsert into.

Prompt for Table:

The extension then prompts you whether you want to include the password for the connection string in the `local.settings.json` file.

Screenshot of a prompt to save the password to the SQL connection string.

If you select **Yes**, the password is saved to the `local.settings.json` file. If you select **No**, the extension warns you that the password isn't saved to the `local.settings.json` file (shown in this example), and you need to manually add the password to this file later.

Screenshot of a warning to add password to SQL connection string later manually.

After you create the Azure Function, the extension generates code for either an `Input` or `Output` binding. For more information, see [Generated code for Azure functions with SQL bindings](create-azure-function.md#generated-code-for-azure-functions-with-sql-bindings).

## Related content

- [Create Azure Functions with the SQL Bindings extension for Visual Studio Code](create-azure-function.md)
- [Learn more about SQL Bindings for Azure Functions](https://learn.microsoft.com/azure/azure-functions/functions-bindings-azure-sql)
- [Create Azure Functions with the SQL Bindings extension for Visual Studio Code through the Object Explorer](create-azure-function-object-explorer.md)
