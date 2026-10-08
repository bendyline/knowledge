---
title: Build a custom remote MCP server using Azure Functions
description: "Learn how to create and deploy a custom Model Context Protocol (MCP) server using Azure Functions. This quickstart uses the Azure Developer CLI to deploy an MCP server project that enables AI clients to access custom tools hosted on the Azure Functions Flex Consumption plan."
ms.date: 04/06/2026
ms.update-cycle: 180-days
ms.topic: quickstart
ai-usage: ai-assisted
ms.collection:
  - ce-skilling-ai-copilot
ms.custom:
  - ignite-2024
zone_pivot_groups: programming-languages-set-functions-no-go
#Customer intent: As a developer, I need to know how to use the Azure Developer CLI to create and deploy my custom MCP server code securely to a new function app in the Flex Consumption plan in Azure by using azd templates and the azd up command.
---

# Quickstart: Build a custom remote MCP server using Azure Functions

In this quickstart, you create a custom remote Model Context Protocol (MCP) server from a template project by using the Azure Developer CLI (`azd`). This MCP server uses the Azure Functions MCP server extension to provide tools for AI models, agents, and assistants. You can also use the MCP server extension to [create interactive MCP Apps](scenario-mcp-apps.md).

After running the project locally and verifying your code by using GitHub Copilot, you deploy it to a new serverless function app in Azure Functions that follows current best practices for secure and scalable deployments.

Because the new app runs on the Flex Consumption plan, which follows a _pay-for-what-you-use_ billing model, completing this quickstart incurs a small cost of a few USD cents or less in your Azure account.

**Applies to: programming-language-powershell**

> **Important:**
> While [creating custom MCP servers](functions-bindings-mcp.md) is supported for all Functions languages, this quickstart scenario currently only has examples for C#, Java, JavaScript, Python, and TypeScript. To complete this quickstart, select one of these supported languages at the top of the article.

**Applies to: programming-language-javascript,programming-language-typescript**

This article supports version 4 of the Node.js programming model for Azure Functions.

**Applies to: programming-language-python**

This article supports version 2 of the Python programming model for Azure Functions.

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**

## Prerequisites

**Applies to: programming-language-csharp**

+ [.NET 8.0 SDK](https://dotnet.microsoft.com/download)

**Applies to: programming-language-java**

+ [Java 17 Developer Kit](https://learn.microsoft.com/azure/developer/java/fundamentals/java-support-on-azure)
    + If you use another [supported version of Java](supported-languages.md?pivots=programming-language-java#languages-by-runtime-version), update the project's `pom.xml` file.
    + Set the `JAVA_HOME` environment variable to the install location of the correct version of the Java Development Kit (JDK).
+ [Apache Maven 3.8.x](https://maven.apache.org)

**Applies to: programming-language-javascript,programming-language-typescript**

+ [Node.js 22](https://nodejs.org/)

<!--- remove when supported
::: zone pivot="programming-language-powershell"
+ [PowerShell 7.6](/powershell/scripting/install/installing-powershell)

+ [.NET 10 runtime](https://dotnet.microsoft.com/download/dotnet/10.0)
::: zone-end
-->
**Applies to: programming-language-python**

+ [Python 3.11](https://www.python.org/)

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**

+ [Visual Studio Code](https://code.visualstudio.com/) with these extensions:

    + [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions). This extension requires [Azure Functions Core Tools](functions-run-local.md) and attempts to install it when not available.

    + [Azure Developer CLI extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.azure-dev).

+ [Azurite storage emulator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-install-azurite.md#install-azurite)

+ [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli). You can also run Azure CLI commands in [Azure Cloud Shell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/overview.md).

+ An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Initialize the project

Use the `azd init` command to create a local Azure Functions code project from a template.

1. In Visual Studio Code, open a folder or workspace where you want to create your project.


**Applies to: programming-language-csharp**

2. In the Terminal, run this `azd init` command:

    ```console
    azd init --template remote-mcp-functions-dotnet -e mcpserver-dotnet
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) and initializes the project in the current folder. The `-e` flag sets a name for the current environment. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. It's also part of the name of the resource group you create in Azure.

**Applies to: programming-language-java**

2. In your local terminal or command prompt, run this `azd init` command:

    ```console
    azd init --template remote-mcp-functions-java -e mcpserver-java
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/remote-mcp-functions-java) and initializes the project in the current folder. The `-e` flag sets a name for the current environment. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. It's also part of the names of the resources you create in Azure.

**Applies to: programming-language-javascript**

2. In your local terminal or command prompt, run this `azd init` command:

    ```console
    azd init --template remote-mcp-functions-javascript -e mcpserver-js
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/remote-mcp-functions-javascript) and initializes the project in the current folder. The `-e` flag sets a name for the current environment. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. It's also part of the names of the resources you create in Azure.

**Applies to: programming-language-typescript**

2. In your local terminal or command prompt, run this `azd init` command:

    ```console
    azd init --template remote-mcp-functions-typescript -e mcpserver-ts
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/remote-mcp-functions-typescript) and initializes the project in the current folder. The `-e` flag sets a name for the current environment. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. It's also part of the names of the resources you create in Azure.

**Applies to: programming-language-python**

2. In your local terminal or command prompt, run this `azd init` command:

    ```console
    azd init --template remote-mcp-functions-python -e mcpserver-python
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/remote-mcp-functions-python) and initializes the project in the current folder. The `-e` flag sets a name for the current environment. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. It's also part of the names of the resources you create in Azure.

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**

## Start the storage emulator


Use the Azurite emulator to simulate an Azure Storage account connection when running your code project locally.

1. If you haven't already, [install Azurite](https://learn.microsoft.com/azure/storage/common/storage-use-azurite#install-azurite).

1. Press <kbd>F1</kbd>. In the command palette, search for and run the command `Azurite: Start` to start the local storage emulator.


## Run your MCP server locally

**Applies to: programming-language-csharp**

In a terminal window, go to the `FunctionsMcpTool` project folder:

```console
cd src/FunctionsMcpTool
```

**Applies to: programming-language-java**

In a terminal window, go to the `FunctionsMcpTool` project folder:

```console
cd samples/FunctionsMcpTool
```

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**



Visual Studio Code integrates with [Azure Functions Core tools](functions-run-local.md) to let you run this project on your local development computer. To start your Functions app locally, press <kbd>F5</kbd> or select the **Run and Debug** icon in the left-hand side Activity bar.

The **Terminal** panel displays the output from Core Tools. Your app starts in the **Terminal** panel, and you can see the names of the functions running locally.


## Verify by using GitHub Copilot

The project template includes a `.vscode/mcp.json` file that already defines a `local-mcp-function` server pointing to your local MCP endpoint. Use this configuration to verify your code by using GitHub Copilot in Visual Studio Code:

1. Open the `.vscode/mcp.json` file and select the **Start** button above the `local-mcp-function` configuration.

1. In the Copilot **Chat** window, make sure that the **Agent** mode is selected, select the **Configure tools** icon, and verify that `MCP Server:local-mcp-function` is enabled in the chat.

1. Run this prompt:

    ```copilot-prompt
    Say Hello
    ```

    When prompted to run the tool, select **Allow in this Workspace** so you don't have to keep granting permission. The prompt runs and returns a `Hello World` response and function execution information is written to the logs.

1. Now, select some code in one of your project files and run this prompt:

    ```copilot-prompt
    Save this snippet as snippet1
    ```

    Copilot stores the snippet and responds to your request with information about how to retrieve the snippet by using the `getSnippets` tool. Again, you can review the function execution in the logs and verify that the `saveSnippets` function ran.

1. In Copilot chat, run this prompt:

    ```copilot-prompt
    Retrieve snippet1 and apply to NewFile
    ```

    Copilot retrieves the snippets, adds it to a file called `NewFile`, and does whatever else it thinks is needed to make the code snippet work in your project. The Functions logs show that the `getSnippets` endpoint was called.

1. When you're done testing, press Ctrl+C to stop the Functions host.

## Review the code (optional)

You can review the code that defines the MCP server tools:

**Applies to: programming-language-javascript**

The function code for the MCP server tools is defined in the `src/functions` folder. The MCP function registration exposes these functions as MCP Server tools:

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-javascript/src/functions/helloMcpTool.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-custom-remote-mcp-server.md)

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-javascript/src/functions/snippetsMcpTool.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-custom-remote-mcp-server.md)

You can view the complete project template in the [Azure Functions JavaScript MCP Server](https://github.com/Azure-Samples/remote-mcp-functions-javascript) GitHub repository.

**Applies to: programming-language-csharp**

The function code for the MCP server tools is defined in the `src` folder. The `McpToolTrigger` attribute exposes the functions as MCP Server tools:

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-dotnet/src/FunctionsMcpTool/HelloTool.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-custom-remote-mcp-server.md)

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-dotnet/src/FunctionsMcpTool/SnippetsTool.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-custom-remote-mcp-server.md)

You can view the complete project template in the [Azure Functions .NET MCP Server](https://github.com/Azure-Samples/remote-mcp-functions-dotnet/tree/main/src/FunctionsMcpTool) GitHub repository.

**Applies to: programming-language-java**

The function code for the MCP server tools is defined in the `samples/FunctionsMcpTool/src/main/java/com/function/` folder. The `@McpToolTrigger` annotation exposes the functions as MCP Server tools:

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-java/samples/FunctionsMcpTool/src/main/java/com/function/HelloWorld.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-custom-remote-mcp-server.md)

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-java/samples/FunctionsMcpTool/src/main/java/com/function/Snippets.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-custom-remote-mcp-server.md)

You can view the complete project template in the [Azure Functions Java MCP Server](https://github.com/Azure-Samples/remote-mcp-functions-java/tree/main/samples/FunctionsMcpTool) GitHub repository.

**Applies to: programming-language-python**

The function code for the MCP server tools is defined in the `src/function_app.py` file. The MCP function annotations expose these functions as MCP Server tools:

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-python/src/FunctionsMcpTool/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-custom-remote-mcp-server.md)

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-python/src/FunctionsMcpTool/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-custom-remote-mcp-server.md)

You can view the complete project template in the [Azure Functions Python MCP Server](https://github.com/Azure-Samples/remote-mcp-functions-python/tree/main/src/FunctionsMcpTool) GitHub repository.

**Applies to: programming-language-typescript**

The function code for the MCP server tools is defined in the `mcp-tools/src` folder. The MCP function registration exposes these functions as MCP Server tools:

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-typescript/mcp-tools/src/functions/helloMcpTool.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-custom-remote-mcp-server.md)

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-typescript/mcp-tools/src/functions/snippetsMcpTool.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-custom-remote-mcp-server.md)

You can view the complete project template in the [Azure Functions TypeScript MCP Server](https://github.com/Azure-Samples/remote-mcp-functions-typescript/tree/main/mcp-tools) GitHub repository.

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**

After verifying the MCP server tools locally, you can publish the project to Azure.

## Deploy to Azure


This project is configured to use `azd` to deploy this project to a new function app in a Flex Consumption plan in Azure. The project includes a set of Bicep files that `azd` uses to create a secure deployment to a Flex Consumption plan that follows best practices.

1. In Visual Studio Code, press <kbd>F1</kbd> to open the command palette. Search for and run the command `Azure Developer CLI (azd): Package, Provision and Deploy (up)`. Then, sign in by using your Azure account.

1. When prompted, select these required deployment parameters:

   | Parameter | Description |
   | --- | --- |
   | _Azure subscription_ | Subscription in which your resources are created. |
   | _Azure location_ | Azure region in which to create the resource group that contains the new Azure resources. Only regions that currently support the Flex Consumption plan are shown. |
   | _vnetEnabled_ | `False` to skip creating virtual network resources, which simplifies the deployment. |

   After the command completes successfully, you see links to the resources you created.


## Connect to your remote MCP server


Your MCP server is now running in Azure. The project template includes a `remote-mcp-function` entry in `.vscode/mcp.json` that's already configured to connect to your remote server. Because built-in MCP authorization is enabled by default, Visual Studio Code handles the OAuth sign-in flow automatically when you connect.

1. Get the function app name from your deployment by running this command in the terminal:

    ```console
    azd env get-value AZURE_FUNCTION_NAME
    ```

1. In `.vscode/mcp.json`, select **Start** above the `remote-mcp-function` configuration.

1. When prompted, enter the function app name from the previous step.

1. Visual Studio Code prompts you to sign in with Microsoft Entra. Follow the authentication prompts to authorize access to your remote MCP server.


## Verify your deployment

You can now have GitHub Copilot use your remote MCP tools just as you did locally, but now the code runs securely in Azure. Replay the same commands you used earlier to ensure everything works correctly.

## Clean up resources


When you're done working with your MCP server and related resources, use this command to delete the function app and its related resources from Azure to avoid incurring further costs:

```console
azd down 
```


## Next steps

> 
> [Configure built-in MCP server authorization](../app-service/configure-authentication-mcp.md)
