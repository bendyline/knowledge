---
title: Build an MCP Apps server using Azure Functions
description: "Learn how to create and deploy an MCP App that returns interactive UI using Azure Functions. This quickstart uses the Azure Developer CLI to deploy an MCP App project that enables AI clients to access tools with rich interactive interfaces hosted on Azure's Flex Consumption plan."
ms.date: 04/06/2026
ms.update-cycle: 180-days
ms.topic: quickstart
ai-usage: ai-assisted
ms.collection:
  - ce-skilling-ai-copilot
zone_pivot_groups: programming-languages-set-functions-no-go
#Customer intent: As a developer, I want to create an MCP Apps server that returns interactive UI from my MCP tools, so AI clients can render rich visual experiences using Azure Functions.
---

# Quickstart: Build MCP Apps using Azure Functions

In this quickstart, you create a [Model Context Protocol (MCP) App](https://modelcontextprotocol.io/extensions/apps/overview) from a template project built using the Azure Functions MCP extension. MCP Apps are MCP servers with tools that return results in rich, interactive user interfaces instead of text. You deploy the app using the Azure Developer CLI (`azd`). You can also use the Azure Functions MCP extension to create MCP servers that have [text-based tools](scenario-custom-remote-mcp-server.md).

After running the project locally and verifying your code by using GitHub Copilot, you deploy it to a new serverless function app in Azure Functions that follows current best practices for secure and scalable deployments.

Screenshot of a weather app UI for Seattle showing drizzle, temperature, humidity, wind, and report timestamp.

Because the new app runs on the Flex Consumption plan, which follows a _pay-for-what-you-use_ billing model, completing this quickstart incurs a small cost of a few USD cents or less in your Azure account.

**Applies to: programming-language-powershell**

>**Important:**  
>The MCP extension doesn't currently support PowerShell apps.  



**Applies to: programming-language-javascript,programming-language-typescript**

This article supports version 4 of the Node.js programming model for Azure Functions.

**Applies to: programming-language-python**

This article supports version 2 of the Python programming model for Azure Functions.

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**

## Prerequisites

**Applies to: programming-language-csharp**

+ [.NET 10 SDK](https://dotnet.microsoft.com/download)

**Applies to: programming-language-java**

+ [Java 17 Developer Kit](https://learn.microsoft.com/azure/developer/java/fundamentals/java-support-on-azure)
    + If you use another [supported version of Java](supported-languages.md?pivots=programming-language-java#languages-by-runtime-version), update the project's `pom.xml` file.
    + Set the `JAVA_HOME` environment variable to the install location of the correct version of the Java Development Kit (JDK).
+ [Apache Maven 3.8.x](https://maven.apache.org)

**Applies to: programming-language-javascript,programming-language-typescript**

+ [Node.js 22](https://nodejs.org/)

**Applies to: programming-language-python**

+ [Python 3.11](https://www.python.org/)

**Applies to: programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**

+ [Node.js](https://nodejs.org/) (required to build the MCP Apps UI)

+ [Visual Studio Code](https://code.visualstudio.com/) with these extensions:

    + [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions). This extension requires [Azure Functions Core Tools](functions-run-local.md) and attempts to install it when not available.

    + [Azure Developer CLI extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.azure-dev).

+ [Azurite storage emulator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-install-azurite.md#install-azurite)

+ [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli). You can also run Azure CLI commands in [Azure Cloud Shell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/overview.md).

+ An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**

## Initialize the project

Use the Azure Developer CLI to create an Azure Functions code project from a template.

**Applies to: programming-language-csharp**

1. From a terminal, run this `azd init` command to create a local project from the template:

    ```console
    azd init --template remote-mcp-functions-dotnet -e mcpweather-dotnet
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) and initializes the project in a new folder. The `-e` flag sets a name for the current environment. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. It's also used in names of the resources you create in Azure.

1. Change to the project directory:

    ```console
    cd remote-mcp-functions-dotnet
    ```

**Applies to: programming-language-typescript**

1. From a terminal, run this `azd init` command to create a local project from the template:

    ```console
    azd init --template remote-mcp-functions-typescript -e mcpweather-ts
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/remote-mcp-functions-typescript) and initializes the project in a new folder. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. It's also used in the names of the resources you create in Azure.

1. Change to the project directory:

    ```console
    cd remote-mcp-functions-typescript
    ```

**Applies to: programming-language-javascript**

1. From a terminal, run this `azd init` command to create a local project from the template:

    ```console
    azd init --template remote-mcp-functions-javascript -e mcpweather-js
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/remote-mcp-functions-javascript) and initializes the project in a new folder. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. It's also used in names of the resources you create in Azure.

1. Change to the project directory:

    ```console
    cd remote-mcp-functions-javascript
    ```

**Applies to: programming-language-python**

1. From a terminal, run this `azd init` command to create a local project from the template:

    ```console
    azd init --template remote-mcp-functions-python -e mcpweather-python
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/remote-mcp-functions-python) and initializes the project in a new folder. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. It's also used in the names of the resources you create in Azure.

1. Change to the project directory:

    ```console
    cd remote-mcp-functions-python
    ```

**Applies to: programming-language-java**

1. From a terminal, run this `azd init` command to create a local project from the template:

    ```console
    azd init --template remote-mcp-functions-java -e mcpweather-java
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/remote-mcp-functions-java) and initializes the project in a new folder. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. It's also used in names of the resources you create in Azure.

1. Change to the project directory:

    ```console
    cd remote-mcp-functions-java
    ```

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**

3. Open the project in Visual Studio Code:

    ```console
    code .
    ```

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**

## Start the storage emulator


Use the Azurite emulator to simulate an Azure Storage account connection when running your code project locally.

1. If you haven't already, [install Azurite](https://learn.microsoft.com/azure/storage/common/storage-use-azurite#install-azurite).

1. Press <kbd>F1</kbd>. In the command palette, search for and run the command `Azurite: Start` to start the local storage emulator.


## Build the MCP Apps UI

The MCP Apps weather tool includes a frontend application that you must build before running the project.

**Applies to: programming-language-csharp**


1. In the terminal, go to the UI app folder and build the application:

    ```console
    cd src/McpWeatherApp/app
    npm install
    npm run build
    cd ../
    ```


**Applies to: programming-language-java**


1. In the terminal, go to the UI app folder and build the application:

    ```console
    cd samples/McpWeatherApp/app
    npm install
    npm run build
    cd ..
    ```


**Applies to: programming-language-python**


1. In the terminal, go to the UI app folder and build the application:

    ```console
    cd src/McpWeatherApp/app
    npm install
    npm run build
    cd ../../..
    ```


**Applies to: programming-language-javascript**


1. In the terminal, go to the UI app folder and build the application:

    ```console
    cd src/app
    npm install
    npm run build
    cd ../..
    ```


**Applies to: programming-language-typescript**


1. In the terminal, go to the UI app folder and build the application:

    ```console
    cd mcp-weather-app/src/app
    npm install
    npm run build
    cd ../../..
    ```


**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**

## Run your MCP server locally

**Applies to: programming-language-csharp**

When prompted, select **src/McpWeatherApp**. You see this prompt because there are two projects in the solution, and the other project isn't used by this article.

**Applies to: programming-language-java**

In a terminal window, make sure you're in the `samples/McpWeatherApp` project folder.

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**


Visual Studio Code integrates with [Azure Functions Core tools](functions-run-local.md) to let you run this project on your local development computer. To start your Functions app locally, press <kbd>F5</kbd> or select the **Run and Debug** icon in the left-hand side Activity bar.

The **Terminal** panel displays the output from Core Tools. Your app starts in the **Terminal** panel, and you can see the names of the functions running locally.


## Verify by using GitHub Copilot

The project template includes a `.vscode/mcp.json` file that defines a `local-mcp-function` server pointing to your local MCP endpoint. Use this configuration to verify your code by using GitHub Copilot in Visual Studio Code:

1. With your function running locally, open the `.vscode/mcp.json` file and select the **Start** button above the `local-mcp-function` configuration.

1. In the Copilot **Chat** window, make sure that the **Agent** mode is selected, select the **Configure tools** icon, and verify that `MCP Server:local-mcp-function` is enabled in the chat.

1. Run this prompt:

    ```copilot-prompt
    What's the weather in Seattle?
    ```

    When prompted to run the tool, select **Allow in this Workspace** so you don't have to keep granting permission. The prompt runs the `GetWeather` tool, which returns weather data. Because this tool declares UI metadata, the MCP host also fetches the UI resource and renders an interactive weather widget in a sandboxed iframe within the chat.

1. When you're done testing, press Ctrl+C to stop the Functions host.

## Review the code (optional)

You can review the code that defines the MCP Apps tools. An MCP Apps tool requires two components:

+ A **tool with UI metadata** that declares a `ui.resourceUri` pointing to a UI resource.
+ A **resource** that serves the bundled HTML/JavaScript at the matching `ui://` URI.

**Applies to: programming-language-javascript**

The function code for the MCP Apps weather tool is defined in the `src/functions/weatherMcpApp.js` file. In this function, the `metadata` property on `app.mcpTool()` adds UI metadata to the `getWeather` tool when it's registered.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-javascript/src/functions/weatherMcpApp.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `getWeather` handler fetches weather data for a location and returns it as JSON.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-javascript/src/functions/weatherMcpApp.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `app.mcpResource()` function registers the `getWeatherWidget` handler, which serves the HTML widget.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-javascript/src/functions/weatherMcpApp.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `getWeatherWidget` handler reads and returns the bundled HTML file.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-javascript/src/functions/weatherMcpApp.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `TOOL_METADATA` constant declares a `ui.resourceUri` that tells the MCP host to fetch the interactive UI from `ui://weather/index.html` after the tool runs.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-javascript/src/functions/weatherMcpApp.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

You can view the complete project template in the [Azure Functions JavaScript MCP Server](https://github.com/Azure-Samples/remote-mcp-functions-javascript) GitHub repository.

**Applies to: programming-language-csharp**

The function code for the MCP Apps weather tool is defined in the `src/McpWeatherApp` folder. In this function, the `[McpMetadata]` attribute adds UI metadata to the `GetWeather` tool.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-dotnet/src/McpWeatherApp/WeatherFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `[McpResourceTrigger]` attribute is applied to the `GetWeatherWidget` function, which serves the HTML widget.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-dotnet/src/McpWeatherApp/WeatherFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `ToolMetadata` constant declares a `ui.resourceUri` that tells the MCP host to fetch the interactive UI from `ui://weather/index.html` after the tool runs.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-dotnet/src/McpWeatherApp/WeatherFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `GetWeatherWidget` function serves the bundled HTML file at that URI using `[McpResourceTrigger]`.

You can view the complete project template in the [Azure Functions .NET MCP Server](https://github.com/Azure-Samples/remote-mcp-functions-dotnet/tree/main/src/McpWeatherApp) GitHub repository.

**Applies to: programming-language-python**

The function code for the MCP Apps weather tool is defined in the `src/McpWeatherApp/function_app.py` file. In this function, the `metadata` parameter on `@app.mcp_tool()` adds UI metadata to the `get_weather` tool.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-python/src/McpWeatherApp/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `@app.mcp_resource_trigger()` decorator is applied to the `get_weather_widget` function, which serves the HTML widget.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-python/src/McpWeatherApp/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `TOOL_METADATA` constant declares a `ui.resourceUri` that tells the MCP host to fetch the interactive UI from `ui://weather/index.html` after the tool runs.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-python/src/McpWeatherApp/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `get_weather_widget` function serves the bundled HTML file at that URI using `@app.mcp_resource_trigger()`.

You can view the complete project template in the [Azure Functions Python MCP Server](https://github.com/Azure-Samples/remote-mcp-functions-python/tree/main/src/McpWeatherApp) GitHub repository.

**Applies to: programming-language-typescript**

The function code for the MCP Apps weather tool is defined in the `mcp-weather-app/src/functions/weatherMcpApp.ts` file. In this function, the `metadata` property on `app.mcpTool()` adds UI metadata to the `getWeather` tool when it's registered.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-typescript/mcp-weather-app/src/functions/weatherMcpApp.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `getWeather` handler fetches weather data for a location and returns it as JSON.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-typescript/mcp-weather-app/src/functions/weatherMcpApp.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `app.mcpResource()` function registers the `getWeatherWidget` handler, which serves the HTML widget.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-typescript/mcp-weather-app/src/functions/weatherMcpApp.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `getWeatherWidget` handler reads and returns the bundled HTML file.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-typescript/mcp-weather-app/src/functions/weatherMcpApp.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `TOOL_METADATA` constant declares a `ui.resourceUri` that tells the MCP host to fetch the interactive UI from `ui://weather/index.html` after the tool runs.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-typescript/mcp-weather-app/src/functions/weatherMcpApp.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

You can view the complete project template in the [Azure Functions TypeScript MCP Server](https://github.com/Azure-Samples/remote-mcp-functions-typescript/tree/main/mcp-weather-app) GitHub repository.

**Applies to: programming-language-java**

The function code for the MCP Apps weather tool is defined in the `samples/McpWeatherApp` folder. In this function, the `@McpMetadata` annotation adds UI metadata to the `GetWeather` tool.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-java/samples/McpWeatherApp/src/main/java/com/function/weather/WeatherFunction.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `@McpResourceTrigger` annotation is applied to the `GetWeatherWidget` function, which serves the HTML widget.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-java/samples/McpWeatherApp/src/main/java/com/function/weather/WeatherFunction.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `TOOL_METADATA` constant declares a `ui.resourceUri` that tells the MCP host to fetch the interactive UI from `ui://weather/index.html` after the tool runs.

[Code reference unavailable in this source snapshot: ~/functions-scenarios-custom-mcp-java/samples/McpWeatherApp/src/main/java/com/function/weather/WeatherFunction.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-mcp-apps.md)

The `GetWeatherWidget` function serves the bundled HTML file at that URI using `@McpResourceTrigger`.

You can view the complete project template in the [Azure Functions Java MCP Server](https://github.com/Azure-Samples/remote-mcp-functions-java/tree/main/samples/McpWeatherApp) GitHub repository.

**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**

After verifying the MCP Apps tools locally, you can publish the project to Azure.

## Deploy to Azure

**Applies to: programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**


This project is configured to use `azd` to deploy this project to a new function app in a Flex Consumption plan in Azure. The project includes a set of Bicep files that `azd` uses to create a secure deployment to a Flex Consumption plan that follows best practices.

1. In Visual Studio Code, press <kbd>F1</kbd> to open the command palette. Search for and run the command `Azure Developer CLI (azd): Package, Provision and Deploy (up)`. Then, sign in by using your Azure account.

1. When prompted, select these required deployment parameters:

   | Parameter | Description |
   | --- | --- |
   | _Azure subscription_ | Subscription in which your resources are created. |
   | _Azure location_ | Azure region in which to create the resource group that contains the new Azure resources. Only regions that currently support the Flex Consumption plan are shown. |
   | _vnetEnabled_ | `False` to skip creating virtual network resources, which simplifies the deployment. |

   After the command completes successfully, you see links to the resources you created.



**Applies to: programming-language-csharp**

This project is configured to use `azd` to deploy this project to a new function app in a Flex Consumption plan in Azure. The project includes a set of Bicep files that `azd` uses to create a secure deployment to a Flex Consumption plan that follows best practices.

1. In the Terminal, run this `azd env set` command:

    ```console
    azd env set DEPLOY_SERVICE weather
    ```

    This command sets the `DEPLOY_SERVICE` variable to provision `weather` app related resources


1. Run the `azd provision` command and supply the required parameters to provision resources:

    ```console
    azd provision
    ```

   | Parameter | Description |
   | --- | --- |
   | _Azure subscription_ | Subscription in which your resources are created. |
   | _Azure location_ | Azure region in which to create the resource group that contains the new Azure resources. Only regions that currently support the Flex Consumption plan are shown. |
   | _vnetEnabled_ | `False` to skip creating virtual network resources, which simplifies the deployment. |

   When prompted, pick your subscription, an Azure region for the resources, and choose `false` to skip creating virtual network resources to simplify the deployment.

1. Run the `azd deploy` command to deploy the `weather` app to Azure:

    ```console
    azd deploy --service weather
    ```


**Applies to: programming-language-csharp,programming-language-java,programming-language-javascript,programming-language-python,programming-language-typescript**

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
