---
title: Run scheduled tasks using Azure Functions
description: "Learn how to use the Azure Developer CLI (azd) to create resources and deploy a scheduled task project to a Flex Consumption plan on Azure."
ms.date: 05/01/2026
ms.topic: quickstart
ai-usage: ai-assisted
zone_pivot_groups: programming-languages-set-functions-no-go
#Customer intent: As a developer, I need to know how to use the Azure Developer CLI to create and deploy scheduled tasks using Timer triggers to a new function app in the Flex Consumption plan in Azure.
---

# Quickstart: Run scheduled tasks using Azure Functions

In this article, you use the Azure Developer CLI (`azd`) to create a Timer trigger function to run a scheduled task in Azure Functions. After verifying the code locally, you deploy it to a new serverless function app you create running in a Flex Consumption plan in Azure Functions.

The project source uses `azd` to create the function app and related resources and to deploy your code to Azure. This deployment follows current best practices for secure and scalable Azure Functions deployments.

By default, the Flex Consumption plan follows a _pay-for-what-you-use_ billing model, which means you can complete this article and only incur a small cost of a few USD cents or less in your Azure account.
**Applies to: programming-language-javascript,programming-language-typescript**

This article supports version 4 of the Node.js programming model for Azure Functions.

**Applies to: programming-language-python**

This article supports version 2 of the Python programming model for Azure Functions.


## Prerequisites
  
**Applies to: programming-language-csharp**

+ [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

**Applies to: programming-language-java**

+ [Java 17 Developer Kit](https://learn.microsoft.com/azure/developer/java/fundamentals/java-support-on-azure)
    + If you use another [supported version of Java](supported-languages.md?pivots=programming-language-java#languages-by-runtime-version), you must update the project configuration. 
    + Set the `JAVA_HOME` environment variable to the install location of the correct version of the Java Development Kit (JDK).
+ [Apache Maven 3.8.x](https://maven.apache.org)

**Applies to: programming-language-javascript,programming-language-typescript**

+ [Node.js 22](https://nodejs.org/) or later  

**Applies to: programming-language-powershell**

+ [PowerShell 7.6](https://learn.microsoft.com/powershell/scripting/install/installing-powershell)

**Applies to: programming-language-python**

+ [Python 3.11](https://www.python.org/) or later


+ [Azurite storage emulator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-use-azurite.md)

+ [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd)

+ [Azure Functions Core Tools](functions-run-local.md#install-the-azure-functions-core-tools)

+ [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli)

+ An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Initialize the project

Use the `azd init` command to create a local Azure Functions code project from a template.
 
**Applies to: programming-language-csharp**

1. In your local terminal or command prompt, run this `azd init` command in an empty folder:
 
    ```console
    azd init --template functions-quickstart-dotnet-azd-timer -e scheduled-dotnet
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-timer) and initializes the project in the current folder. The `-e` flag sets a name for the current environment. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. The environment name is also used in the name of the resource group you create in Azure. 

1. Run this command to navigate to the app folder:

    ```console
    cd src
    ```

1. Create a file named _local.settings.json_ in the `src` folder that contains this JSON data:

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated",
            "TIMER_SCHEDULE": "*/30 * * * * *"
        }
    }
    ```

    This file is required when running locally.

**Applies to: programming-language-typescript**

1. In your local terminal or command prompt, run this `azd init` command in an empty folder:
 
    ```console
    azd init --template functions-quickstart-typescript-azd-timer -e scheduled-ts
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/functions-quickstart-typescript-azd-timer) and initializes the project in the current folder. The `-e` flag sets a name for the current environment. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. The environment name is also used in the name of the resource group you create in Azure. 

1. Create a file named _local.settings.json_ in the `src` folder that contains this JSON data:

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "TIMER_SCHEDULE": "*/30 * * * * *"
        }
    }
    ```

    This file is required when running locally.

**Applies to: programming-language-python**

1. In your local terminal or command prompt, run this `azd init` command in an empty folder:
 
    ```console
    azd init --template functions-quickstart-python-azd-timer -e scheduled-py
    ```
        
    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/functions-quickstart-python-azd-timer) and initializes the project in the current folder. The `-e` flag sets a name for the current environment. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. The environment name is also used in the name of the resource group you create in Azure. 

1. Create a file named _local.settings.json_ in the `src` folder that contains this JSON data:

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "python",
            "TIMER_SCHEDULE": "*/30 * * * * *"
        }
    }
    ```

    This file is required when running locally.

## Create and activate a virtual environment

In the root folder, run these commands to create and activate a virtual environment named `.venv`:

### [Linux/macOS](#tab/linux)

```bash
python3 -m venv .venv
source .venv/bin/activate
```

If Python doesn't install the venv package on your Linux distribution, run the following command:

```bash
sudo apt-get install python3-venv
```

### [Windows (bash)](#tab/windows-bash)

```bash
py -m venv .venv
source .venv/scripts/activate
```

### [Windows (Cmd)](#tab/windows-cmd)

```shell
py -m venv .venv
.venv\scripts\activate
```

---


**Applies to: programming-language-java**

1. In your local terminal or command prompt, run this `azd init` command in an empty folder:
 
    ```console
    azd init --template functions-quickstart-java-azd-timer -e scheduled-java
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/functions-quickstart-java-azd-timer) and initializes the project in the current folder. The `-e` flag sets a name for the current environment. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. The environment name is also used in the name of the resource group you create in Azure. 

1. Run this command to navigate to the app folder:

    ```console
    cd src
    ```

1. Create a file named _local.settings.json_ in the `src` folder that contains this JSON data:

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "java",
            "TIMER_SCHEDULE": "*/30 * * * * *"
        }
    }
    ```

    This file is required when running locally.

**Applies to: programming-language-javascript**

1. In your local terminal or command prompt, run this `azd init` command in an empty folder:
 
    ```console
    azd init --template functions-quickstart-javascript-azd-timer -e scheduled-js
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/functions-quickstart-javascript-azd-timer) and initializes the project in the current folder. The `-e` flag sets a name for the current environment. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. The environment name is also used in the name of the resource group you create in Azure. 

1. Create a file named _local.settings.json_ in the `src` folder that contains this JSON data:

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "TIMER_SCHEDULE": "*/30 * * * * *"
        }
    }
    ```

    This file is required when running locally.

**Applies to: programming-language-powershell**

1. In your local terminal or command prompt, run this `azd init` command in an empty folder:
 
    ```console
    azd init --template functions-quickstart-powershell-azd-timer -e scheduled-ps
    ```

    This command pulls the project files from the [template repository](https://github.com/Azure-Samples/functions-quickstart-powershell-azd-timer) and initializes the project in the current folder. The `-e` flag sets a name for the current environment. In `azd`, the environment maintains a unique deployment context for your app, and you can define more than one. The environment name is also used in the name of the resource group you create in Azure. 

1. Run this command to navigate to the app folder:

    ```console
    cd src
    ```

1. Create a file named _local.settings.json_ in the `src` folder that contains this JSON data:

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "powershell",
            "TIMER_SCHEDULE": "*/30 * * * * *"
        }
    }
    ```

    This file is required when running locally.

 
## Run in your local environment  

1. In a separate terminal window, start the Azurite storage emulator:

    ```console
    azurite
    ```

    The local Functions host process uses the Azurite emulator for the internal storage connection (`AzureWebJobsStorage`) required by the runtime.  
**Applies to: programming-language-csharp,programming-language-python,programming-language-powershell**

2. Run this command from your app folder in a terminal or command prompt:

    ```console
    func start
    ``` 

**Applies to: programming-language-java**

2. Run this command from your app folder in a terminal or command prompt:
 
    ```console
    mvn clean package
    mvn azure-functions:run
    ```

**Applies to: programming-language-javascript**

2. Run this command from your app folder in a terminal or command prompt:

    ```console
    npm install
    func start  
    ```

**Applies to: programming-language-typescript**

2. Run this command from your app folder in a terminal or command prompt:
 
    ```console
    npm install
    npm start  
    ```


3. When the Functions host starts in your local project folder, it writes information about your Timer triggered function to the terminal output. You should see your Timer triggered function execute based on the schedule defined in your code.

    The default schedule is `*/30 * * * * *`, which runs every 30 seconds.

4. When you're done, press Ctrl+C in the terminal window to stop the `func.exe` host process. 
**Applies to: programming-language-python**

5. Run `deactivate` to shut down the virtual environment.


## Review the code (optional)

You can review the code that defines the Timer trigger function:
     
**Applies to: programming-language-csharp**

[Code reference unavailable in this source snapshot: ~/functions-azd-timer-dotnet/src/timerFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-scheduled-tasks.md)

You can review the complete template project [here](https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-timer).

**Applies to: programming-language-java**

[Code reference unavailable in this source snapshot: ~/functions-azd-timer-java/src/src/main/java/com/function/TimerFunction.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-scheduled-tasks.md)

You can review the complete template project [here](https://github.com/Azure-Samples/functions-quickstart-java-azd-timer).

**Applies to: programming-language-javascript**

[Code reference unavailable in this source snapshot: ~/functions-azd-timer-javascript/src/src/functions/timerFunction.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-scheduled-tasks.md)

You can review the complete template project [here](https://github.com/Azure-Samples/functions-quickstart-javascript-azd-timer).

**Applies to: programming-language-typescript**

[Code reference unavailable in this source snapshot: ~/functions-azd-timer-typescript/src/src/functions/timerFunction.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-scheduled-tasks.md)

You can review the complete template project [here](https://github.com/Azure-Samples/functions-quickstart-typescript-azd-timer).

**Applies to: programming-language-powershell**

[Code reference unavailable in this source snapshot: ~/functions-azd-timer-powershell/src/timerFunction/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-scheduled-tasks.md)

The timer trigger is defined in the corresponding [function.json](https://github.com/Azure-Samples/functions-quickstart-powershell-azd-timer/blob/main/src/timerFunction/function.json).

You can review the complete template project [here](https://github.com/Azure-Samples/functions-quickstart-powershell-azd-timer).

**Applies to: programming-language-python**

[Code reference unavailable in this source snapshot: ~/functions-azd-timer-python/src/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/scenario-scheduled-tasks.md)

You can review the complete template project [here](https://github.com/Azure-Samples/functions-quickstart-python-azd-timer).


**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

> **Tip:**
> The `runOnStartup` option is useful during development and testing because the function runs immediately when the host starts. In production, you should set this to `false` to avoid unexpected executions during deployments or restarts.



After you verify your function locally, it's time to publish it to Azure. 

## Deploy to Azure
 
This project uses Bicep files and the `azd up` command to create a secure deployment to a new function app in a Flex Consumption plan that follows best practices.

1. Run this command to have `azd` create the required Azure resources in Azure and deploy your code project to the new function app:

    ```console
    azd up
    ```

    The root folder contains the `azure.yaml` definition file required by `azd`. 

    If you're not already signed in, you're asked to authenticate with your Azure account.

1. When prompted, provide these required deployment parameters:

    | Parameter | Description |
    | --- | --- |
    | _Azure subscription_ | Subscription in which your resources are created. |
    | _Azure location_ | Azure region in which to create the resource group that contains the new Azure resources. Only regions that currently support the Flex Consumption plan are shown. |
    
    The `azd up` command uses your response to these prompts with the Bicep configuration files to complete these deployment tasks:

    + Create and configure these required Azure resources (equivalent to `azd provision`):

        + Flex Consumption plan and function app
        + Azure Storage (required) and Application Insights (recommended)
        + Access policies and roles for your account
        + Service-to-service connections using managed identities (instead of stored connection strings)
        + Virtual network to securely run both the function app and the other Azure resources

    + Package and deploy your code to the deployment container (equivalent to `azd deploy`). The app is then started and runs in the deployed package. 

    After the command completes successfully, you see links to the resources you created. 

## Verify deployment

After deployment completes, your Timer trigger function automatically starts running in Azure based on its schedule.

1. In the [Azure portal](https://portal.azure.com), go to your new function app.

1. Select **Log stream** from the left menu to monitor your function executions in real-time.

1. You should see log entries that show your Timer trigger function executing according to its schedule.


## Redeploy your code

Run the `azd up` command as many times as you need to both provision your Azure resources and deploy code updates to your function app. 

>**Note:**
>Deployed code files are always overwritten by the latest deployment package.

Your initial responses to `azd` prompts and any environment variables generated by `azd` are stored locally in your named environment. Use the `azd env get-values` command to review all of the variables in your environment that were used when creating Azure resources. 

## Clean up resources

When you're done working with your function app and related resources, use this command to delete the function app and its related resources from Azure and avoid incurring any further costs:

```console
azd down --no-prompt
```

>**Note:**  
>The `--no-prompt` option instructs `azd` to delete your resource group without a confirmation from you. 
>
>This command doesn't affect your local code project. 


## Related articles

+ [Timer trigger for Azure Functions](functions-bindings-timer.md)
+ [Azure Functions scenarios](functions-scenarios.md)
+ [Flex Consumption plan](flex-consumption-plan.md)
+ [Azure Developer CLI (azd)](https://learn.microsoft.com/azure/developer/azure-developer-cli/)
+ [azd reference](https://learn.microsoft.com/azure/developer/azure-developer-cli/reference)
+ [Azure Functions Core Tools reference](functions-core-tools-reference.md)
+ [Code and test Azure Functions locally](functions-develop-local.md)
