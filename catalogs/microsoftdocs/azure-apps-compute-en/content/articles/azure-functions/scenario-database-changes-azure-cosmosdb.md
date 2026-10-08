---
title: Respond to database changes in Azure Cosmos DB using Azure Functions
description: "Learn how to use the Azure Developer CLI (azd) to create resources and deploy a local project to a Flex Consumption plan on Azure. The project features an Azure Cosmos DB trigger function that runs in response to changes in an Azure Cosmos DB database."
ms.date: 05/19/2026
ms.topic: quickstart
zone_pivot_groups: programming-languages-set-functions-no-go
#Customer intent: As a developer, I need to know how to use the Azure Developer CLI to create and deploy an Azure Cosmos DB triggered function project securely to a new function app in the Flex Consumption plan in Azure by using azd templates and the azd up command.
---

# Quickstart: Respond to database changes in Azure Cosmos DB using Azure Functions

In this Quickstart, you use Visual Studio Code to build an app that responds to database changes in a No SQL database in Azure Cosmos DB. After testing the code locally, you deploy it to a new serverless function app you create running in a Flex Consumption plan in Azure Functions.

The project source uses the Azure Developer CLI (azd) extension with Visual Studio Code to simplify initializing and verifying your project code locally, as well as deploying your code to Azure. This deployment follows current best practices for secure and scalable Azure Functions deployments.

While the Flex Consumption plan follows a _pay-for-what-you-use_ billing model, this code project creates additional Azure resources, including an Azure Cosmos DB instance. Make sure to [clean up resources](#clean-up-resources) when you're done to avoid ongoing charges.

**Applies to: programming-language-javascript,programming-language-typescript**

This article supports version 4 of the Node.js programming model for Azure Functions.

**Applies to: programming-language-python**

This article supports version 2 of the Python programming model for Azure Functions.



## Prerequisites

+ An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

+ [Visual Studio Code](https://code.visualstudio.com/) on one of the [supported platforms](https://code.visualstudio.com/docs/supporting/requirements#_platforms).

+ The [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) for Visual Studio Code. This extension requires [Azure Functions Core Tools](functions-run-local.md). When this tool isn't available locally, the extension tries to install it by using a package-based installer. You can also install or update the Core Tools package by running `Azure Functions: Install or Update Azure Functions Core Tools` from the command palette. If you don't have npm or Homebrew installed on your local computer, you must instead [manually install or update Core Tools](functions-run-local.md#install-the-azure-functions-core-tools).
**Applies to: programming-language-csharp**

+ [.NET 8.0 SDK](https://dotnet.microsoft.com/download)

+ [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) for Visual Studio Code.  

**Applies to: programming-language-java**

+ The [Java Development Kit](https://learn.microsoft.com/azure/developer/java/fundamentals/java-support-on-azure), version 8, 11, 17 or 21 (Linux).

+ [Apache Maven](https://maven.apache.org), version 3.0 or above.

+ The [Java extension pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)       

**Applies to: programming-language-typescript**

+ [Node.js 22.x](https://nodejs.org/en/about/previous-releases) or above. Use the `node --version` command to check your version.

**Applies to: programming-language-powershell**

+ [PowerShell 7.6](https://learn.microsoft.com/powershell/scripting/install/installing-powershell)

+ [.NET 10 runtime](https://dotnet.microsoft.com/download/dotnet/10.0)

+ The [PowerShell extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell).  

**Applies to: programming-language-python**

+ Python versions that are [supported by Azure Functions](supported-languages.md#languages-by-runtime-version). For more information, see [How to install Python](https://wiki.python.org/moin/BeginnersGuide/Download).

+ The [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) for Visual Studio Code.

**Applies to: programming-language-csharp,programming-language-python,programming-language-typescript**

+ The [Azure Developer CLI extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.azure-dev) for Visual Studio Code.


+ [Azure Databases extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb)

## Initialize the project

Use the Azure Developer CLI (`azd`) to create a local Azure Functions code project from a template.

**Applies to: programming-language-csharp**

1. From a terminal, run this `azd init` command to create a local project from the template:

    ```console
    azd init --template functions-quickstart-dotnet-azd-cosmosdb -e cosmosdbchanges-dotnet
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-cosmosdb) and initializes the project in a new folder. In `azd`, the environment is used to maintain a unique deployment context for your app, and you can define more than one. It's also part of the name of the resource group you create in Azure.

1. Change to the project directory:

    ```console
    cd functions-quickstart-dotnet-azd-cosmosdb
    ```

**Applies to: programming-language-java**

1. From a terminal, run this `azd init` command to create a local project from the template:

    ```console
    azd init --template functions-quickstart-java-azd-cosmosdb -e cosmosdbchanges-java
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/functions-quickstart-java-azd-cosmosdb) and initializes the project in a new folder. In `azd`, the environment is used to maintain a unique deployment context for your app, and you can define more than one. It's also part of the name of the resource group you create in Azure.

1. Change to the project directory:

    ```console
    cd functions-quickstart-java-azd-cosmosdb
    ```

**Applies to: programming-language-javascript**

1. From a terminal, run this `azd init` command to create a local project from the template:

    ```console
    azd init --template functions-quickstart-javascript-azd-cosmosdb -e cosmosdbchanges-js
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/functions-quickstart-javascript-azd-cosmosdb) and initializes the project in a new folder. In `azd`, the environment is used to maintain a unique deployment context for your app, and you can define more than one. It's also part of the name of the resource group you create in Azure.

1. Change to the project directory:

    ```console
    cd functions-quickstart-javascript-azd-cosmosdb
    ```

**Applies to: programming-language-powershell**

1. From a terminal, run this `azd init` command to create a local project from the template:

    ```console
    azd init --template functions-quickstart-powershell-azd-cosmosdb -e cosmosdbchanges-ps
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/functions-quickstart-powershell-azd-cosmosdb) and initializes the project in a new folder. In `azd`, the environment is used to maintain a unique deployment context for your app, and you can define more than one. It's also part of the name of the resource group you create in Azure.

1. Change to the project directory:

    ```console
    cd functions-quickstart-powershell-azd-cosmosdb
    ```

**Applies to: programming-language-typescript**

1. From a terminal, run this `azd init` command to create a local project from the template:

    ```console
    azd init --template functions-quickstart-typescript-azd-cosmosdb -e cosmosdbchanges-ts
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/functions-quickstart-typescript-azd-cosmosdb) and initializes the project in a new folder. In `azd`, the environment is used to maintain a unique deployment context for your app, and you can define more than one. It's also part of the name of the resource group you create in Azure.

1. Change to the project directory:

    ```console
    cd functions-quickstart-typescript-azd-cosmosdb
    ```

**Applies to: programming-language-python**

1. From a terminal, run this `azd init` command to create a local project from the template:

    ```console
    azd init --template functions-quickstart-python-azd-cosmosdb -e cosmosdbchanges-py
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/functions-quickstart-python-azd-cosmosdb) and initializes the project in a new folder. In `azd`, the environment is used to maintain a unique deployment context for your app, and you can define more than one. It's also part of the name of the resource group you create in Azure.

1. Change to the project directory:

    ```console
    cd functions-quickstart-python-azd-cosmosdb
    ```


3. Run this command, depending on your local operating system, to grant configuration scripts the required permissions:

    ### [Linux/macOS](#tab/linux)

    Run this command with sufficient privileges:

    ```bash
    chmod +x ./infra/scripts/*.sh
    ```

    ### [Windows](#tab/windows-cmd)

    Run this command from the Windows command prompt:

    ```cmd
    pwsh -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser"
    ```

    If prompted, select **Yes** to approve the policy change.

    ---

4. Open the project in Visual Studio Code:

    ```console
    code .
    ```

Before you can run your app locally, you must create the resources in Azure. This project doesn't use local emulation for Azure Cosmos DB.

## Create Azure resources

This project is configured to use the `azd provision` command to create a function app in a Flex Consumption plan, along with other required Azure resources that follows current best practices.

1. In Visual Studio Code, press <kbd>F1</kbd> to open the command palette, search for and run the command `Azure Developer CLI (azd): Sign In with Azure Developer CLI`, and then sign in using your Azure account.

1. Press <kbd>F1</kbd> to open the command palette, search for and run the command `Azure Developer CLI (azd): Provision Azure resources (provision)` to create the required Azure resources:

1. When prompted in the Terminal window, provide these required deployment parameters:

    | Prompt | Description |
    | --- | --- |
    | Select an Azure Subscription to use | Choose the subscription in which you want your resources to be created. |
    | _location_ deployment parameter | Azure region in which to create the resource group that contains the new Azure resources. Only regions that currently support the Flex Consumption plan are shown. |
    | _vnetEnabled_ deployment parameter | While the template supports creating resources inside a virtual network, to simplify deployment and testing, choose `False`. |

    The `azd provision` command uses your response to these prompts with the Bicep configuration files to create and configure these required Azure resources, following the latest best practices:

    + Flex Consumption plan and function app
    + Azure Cosmos DB account
    + Azure Storage (required) and Application Insights (recommended)
    + Access policies and roles for your account
    + Service-to-service connections using managed identities (instead of stored connection strings)

    Post-provision hooks also generate the _local.settings.json_ file required when running locally. This file also contains the settings required to connect to your Azure Cosmos DB database in Azure.

    > **Tip:**
    > Should any steps fail during provisioning, you can rerun the `azd provision` command again after resolving any issues.

    After the command completes successfully, you can run your project code locally and trigger on the Azure Cosmos DB database in Azure.

## Run the function locally

Visual Studio Code integrates with [Azure Functions Core tools](functions-run-local.md) to let you run this project on your local development computer before you publish to your new function app in Azure.

1. Press <kbd>F1</kbd> and in the command palette search for and run the command `Azurite: Start`.

1. To start the function locally, press <kbd>F5</kbd> or the **Run and Debug** icon in the left-hand side Activity bar. The **Terminal** panel displays the output from Core Tools. Your app starts in the **Terminal** panel, and you can see the name of the function that's running locally.

    If you have trouble running on Windows, make sure that the default terminal for Visual Studio Code isn't set to **WSL Bash**.

1. With Core Tools still running in **Terminal**, press <kbd>F1</kbd> and in the command palette search for and run the command `NoSQL: Create Item...` and select both the `document-db` database and the `documents` container.

1. Replace the contents of the _New Item.json_ file with this JSON data and select **Save**:

    ```json
    {
        "id": "doc1",
        "title": "Sample document",
        "content": "This is a sample document for testing my Azure Cosmos DB trigger in Azure Functions."
    }
    ```

    After you select **Save**, you see the execution of the function in the terminal and the local document is updated to include metadata added by the service.

1. When you're done, press Ctrl+C in the terminal window to stop the `func.exe` host process.

## Review the code (optional)

The function is triggered based on the change feed in an Azure Cosmos DB NoSQL database.
**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-powershell,programming-language-python**

These environment variables configure how the trigger monitors the change feed:

- `COSMOS_CONNECTION__accountEndpoint`: The Cosmos DB account endpoint
- `COSMOS_DATABASE_NAME`: The name of the database to monitor
- `COSMOS_CONTAINER_NAME`: The name of the container to monitor

These environment variables are created for you both in Azure (function app settings) and locally (local.settings.json) during the `azd provision` operation.

**Applies to: programming-language-typescript**

The `COSMOS_CONNECTION` environment variable configures the Cosmos DB account endpoint used by the trigger. This environment variable is created for you both in Azure (function app settings) and locally (local.settings.json) during the `azd provision` operation. The database and container names are defined in the trigger configuration.


You can review the code that defines the Azure Cosmos DB trigger:

**Applies to: programming-language-csharp**

[Code reference unavailable in this source snapshot: ~/functions-azd-cosmosdb-dotnet/CosmosTrigger.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-database-changes-azure-cosmosdb.md)

You can review the complete template project [here](https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-cosmosdb).

**Applies to: programming-language-java**

[Code reference unavailable in this source snapshot: ~/functions-azd-cosmosdb-java/src/main/java/com/function/CosmosTrigger.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-database-changes-azure-cosmosdb.md)

You can review the complete template project [here](https://github.com/Azure-Samples/functions-quickstart-java-azd-cosmosdb).

**Applies to: programming-language-javascript**

[Code reference unavailable in this source snapshot: ~/functions-azd-cosmosdb-javascript/src/functions/cosmosTrigger.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-database-changes-azure-cosmosdb.md)

You can review the complete template project [here](https://github.com/Azure-Samples/functions-quickstart-javascript-azd-cosmosdb).

**Applies to: programming-language-typescript**

[Code reference unavailable in this source snapshot: ~/functions-azd-cosmosdb-typescript/src/functions/cosmos_trigger.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-database-changes-azure-cosmosdb.md)

You can review the complete template project [here](https://github.com/Azure-Samples/functions-quickstart-typescript-azd-cosmosdb).

**Applies to: programming-language-powershell**

The trigger is defined in this _function.json_ file:

[Code reference unavailable in this source snapshot: ~/functions-azd-cosmosdb-powershell/cosmos_trigger/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-database-changes-azure-cosmosdb.md)

The following code runs when the trigger executes:

[Code reference unavailable in this source snapshot: ~/functions-azd-cosmosdb-powershell/cosmos_trigger/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-database-changes-azure-cosmosdb.md)

You can review the complete template project [here](https://github.com/Azure-Samples/functions-quickstart-powershell-azd-cosmosdb).

**Applies to: programming-language-python**

[Code reference unavailable in this source snapshot: ~/functions-azd-cosmosdb-python/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-database-changes-azure-cosmosdb.md)

You can review the complete template project [here](https://github.com/Azure-Samples/functions-quickstart-python-azd-cosmosdb).


After you review and verify your function code locally, it's time to publish the project to Azure.

## Deploy to Azure

You can run the `azd deploy` command from Visual Studio Code to deploy the project code to your already provisioned resources in Azure.

1. Press <kbd>F1</kbd> to open the command palette.

1. Search for and run the command `Azure Developer CLI (azd): Deploy to Azure (deploy)`.

    The `azd deploy` command packages and deploys your code to the deployment container. The app is then started and runs in the deployed package.

    After the command completes successfully, your app is running in Azure.

## Invoke the function on Azure

1. In Visual Studio Code, press <kbd>F1</kbd> and in the command palette search for and run the command `Azure: Open in portal`, select `Function app`, and choose your new app. Sign in with your Azure account, if necessary.

    This command opens your new function app in the Azure portal.

1. In the **Overview** tab on the main page, select your function app name and then the **Logs** tab.

1. Use the `NoSQL: Create Item` command in Visual Studio Code to again add a document to the container as before.

1. Verify again that the function gets triggered by an update in the monitored container.

 ## Redeploy your code

You can run the `azd deploy` command as many times as you need to deploy code updates to your function app.

>**Note:**
>Deployed code files are always overwritten by the latest deployment package.

Your initial responses to `azd` prompts and any environment variables generated by `azd` are stored locally in your named environment. Use the `azd env get-values` command to review all of the variables in your environment that were used when creating Azure resources.

## Clean up resources

When you're done working with your function app and related resources, you can use this command to delete the function app and its related resources from Azure and avoid incurring any further costs:

```console
azd down --no-prompt
```

>**Note:**
>The `--no-prompt` option instructs `azd` to delete your resource group without a confirmation from you.
>
>This command doesn't affect your local code project.

## Related content

+ [Azure Functions scenarios](functions-scenarios.md)
+ [Flex Consumption plan](flex-consumption-plan.md)
+ [Azure Developer CLI (azd)](https://learn.microsoft.com/azure/developer/azure-developer-cli/)
+ [azd reference](https://learn.microsoft.com/azure/developer/azure-developer-cli/reference)
+ [Azure Functions Core Tools reference](functions-core-tools-reference.md)
+ [Code and test Azure Functions locally](functions-develop-local.md)
