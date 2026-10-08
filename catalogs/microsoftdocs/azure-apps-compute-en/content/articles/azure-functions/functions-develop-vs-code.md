---
title: Develop Azure Functions by using Visual Studio Code
description: Learn how to develop and test Azure Functions by using the Azure Functions extension for Visual Studio Code.
ms.topic: how-to
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, powershell, python
ms.date: 11/02/2025

zone_pivot_groups: programming-languages-set-functions-no-go
ms.custom:
  - devdivchpfy22
  - vscode-azure-extension-update-complete
  - devx-track-extended-java
  - devx-track-js
  - devx-track-python
  - ignite-2023
  - devx-track-ts
  - sfi-ropc-nochange
#Customer intent: As an Azure Functions developer, I want to understand how Visual Studio Code supports Azure Functions so that I can more efficiently create, publish, and maintain my Functions projects.
---

# Develop Azure Functions by using Visual Studio Code

The [Azure Functions extension for Visual Studio Code] lets you develop functions locally and deploy them to Azure. If this experience is your first with Azure Functions, you can learn more at [An introduction to Azure Functions](functions-overview.md).

The Azure Functions extension provides these benefits:

* Edit, build, and run functions on your local development computer.
* Publish your Azure Functions project directly to Azure.
* Write your functions in various languages while taking advantage of the benefits of Visual Studio Code.

**Applies to: programming-language-csharp**

>You're viewing the C# version of this article. Make sure to select your preferred Functions programming language at the start of the article.
 
If you're new to Functions, you might want to first complete the [Visual Studio Code quickstart article](how-to-create-function-vs-code.md?pivot=programming-language-csharp).

**Applies to: programming-language-java**

>You're viewing the Java version of this article. Make sure to select your preferred Functions programming language at the start of the article.

If you're new to Functions, you might want to first complete the [Visual Studio Code quickstart article](how-to-create-function-vs-code.md?pivot=programming-language-java).

**Applies to: programming-language-javascript**

>You're viewing the JavaScript version of this article. Make sure to select your preferred Functions programming language at the start of the article.
 
If you're new to Functions, you might want to first complete the [Visual Studio Code quickstart article](how-to-create-function-vs-code.md?pivot=programming-language-javascript).

**Applies to: programming-language-powershell**

>You're viewing the PowerShell version of this article. Make sure to select your preferred Functions programming language at the start of the article.
 
If you're new to Functions, you might want to first complete the [Visual Studio Code quickstart article](how-to-create-function-vs-code.md?pivot=programming-language-powershell).

**Applies to: programming-language-python**

>You're viewing the Python version of this article. Make sure to select your preferred Functions programming language at the start of the article.
 
If you're new to Functions, you might want to first complete the [Visual Studio Code quickstart article](how-to-create-function-vs-code.md?pivot=programming-language-python).

**Applies to: programming-language-typescript**

>You're viewing the TypeScript version of this article. Make sure to select your preferred Functions programming language at the start of the article.
 
If you're new to Functions, you might want to first complete the [Visual Studio Code quickstart article](how-to-create-function-vs-code.md?pivot=programming-language-typescript).


> **Important:**
> Don't mix local development and portal development for a single function app. When you publish from a local project to a function app, the deployment process overwrites any functions that you developed in the portal.

## Prerequisites

* [Visual Studio Code](https://code.visualstudio.com/) installed on one of the [supported platforms](https://code.visualstudio.com/docs/supporting/requirements#_platforms).

* [Azure Functions extension][Azure Functions extension for Visual Studio Code]. You can also install the [Azure Tools extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack), which is recommended for working with Azure resources. 

* An active [Azure subscription](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/guides/developer/azure-developer-guide.md#understanding-accounts-subscriptions-and-billing). If you don't yet have an account, you can create one from the extension in Visual Studio Code. 

You also need these prerequisites to [run and debug your functions locally](#run-functions-locally). They're not required to just create or publish projects to Azure Functions.

+ The [Azure Functions Core Tools](functions-run-local.md), which enables an integrated local debugging experience. When you have the Azure Functions extension installed, the easiest way to install or update Core Tools is by running the `Azure Functions: Install or Update Azure Functions Core Tools` command from the command palette.
**Applies to: programming-language-csharp**

+ The [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) for Visual Studio Code.

+ [.NET (CLI)](https://learn.microsoft.com/dotnet/core/tools/), which is included in the .NET SDK.

**Applies to: programming-language-java**

+ [Debugger for Java extension](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug).

+ [Java](https://learn.microsoft.com/azure/developer/java/fundamentals/java-support-on-azure), one of the [supported versions](functions-reference-java.md#java-versions).

+ [Maven 3 or later](https://maven.apache.org/).

**Applies to: programming-language-javascript,programming-language-typescript**

+ [Node.js](https://nodejs.org/), one of the [supported versions](functions-reference-node.md#node-version). Use the `node --version` command to check your version.

**Applies to: programming-language-powershell**

+ [PowerShell 7.6](https://learn.microsoft.com/powershell/scripting/install/installing-powershell) recommended. For version information, see [PowerShell versions](functions-reference-powershell.md#powershell-versions).

+ [.NET 10 runtime](https://dotnet.microsoft.com/download/dotnet/10.0).

+ The [PowerShell extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell). 

**Applies to: programming-language-python**

+ [Python](https://www.python.org/downloads/), one of the [supported versions](functions-reference-python.md#supported-python-versions).

+ [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) for Visual Studio Code.



## Create an Azure Functions project

The Functions extension lets you create the required function app project at the same time you create your first function. Use these steps to create an HTTP-triggered function in a new project. An [HTTP trigger](functions-bindings-http-webhook.md) is the simplest function trigger template to demonstrate.

1. In Visual Studio Code, press <kbd>F1</kbd> to open the command palette. Search for and run the command `Azure Functions: Create New Project...`. Select the directory location for your project workspace, then choose **Select**. 

   You can either create a new folder or choose an empty folder for the project workspace, but don't choose a project folder that's already part of a workspace.   

   You can instead run the command `Azure Functions: Create New Containerized Project...` to also get a Dockerfile generated for the project.

1. When prompted, **Select a language** for your project. If necessary, choose a specific language version.

1. Select the **HTTP trigger** function template, or select **Skip for now** to create a project without a function. You can always [add a function to your project](#add-a-function-to-your-project) later.

   > **Tip:**
   > To view additional templates, select the **Change template filter** option and set the value to **Core** or **All**.

1. For the function name, enter **HttpExample**, select Enter, then select **Function** authorization.

   This authorization level requires that you provide a [function key](function-keys-how-to.md) when you call the function endpoint.

1. From the dropdown list, select **Add to workspace**.

1. In the **Do you trust the authors of the files in this folder?** window, select **Yes**.

Visual Studio Code creates a function in your chosen language and in the template for an HTTP-triggered function.

### Generated project files

The project template creates a project in your chosen language and installs the required dependencies. For any language, the new project has these files:

* **host.json**: Lets you configure the Functions host. These settings apply when you're running functions locally and when you're running them in Azure. For more information, see [host.json reference](functions-host-json.md).

* **local.settings.json**: Maintains settings used when you're locally running functions. These settings are used only when you're running functions locally. For more information, see [Local settings file](#local-settings).

  > **Important:**
  > Because the **local.settings.json** file can contain secrets, make sure to exclude the file from your project source control.

* **Dockerfile** (optional): Lets you create a containerized function app from your project by using an approved base image for your project. You only get this file when you run the command `Azure Functions: Create New Containerized Project...`. You can add a Dockerfile to an existing project by using the `func init --docker-only` command in [Core Tools](functions-core-tools-reference.md#func-init).  

**Applies to: programming-language-csharp**

An HttpExample.cs class library file, the contents of which vary depending on whether your project runs in an [isolated worker process](dotnet-isolated-process-guide.md#project-structure) or [in-process](functions-dotnet-class-library.md#functions-class-library-project) with the Functions host.

**Applies to: programming-language-java**


These files are created:
 
+ A pom.xml file in the root folder that defines the project and deployment parameters, including project dependencies and the [Java version](functions-reference-java.md#java-versions). The pom.xml also contains information about the Azure resources that are created during a deployment.

+ A [Functions.java file](functions-reference-java.md#triggers-and-annotations) in your src path that implements the function.

**Applies to: programming-language-javascript,programming-language-typescript**

Files generated depend on the chosen Node.js programming model for Functions:

### [v4](#tab/node-v4)

+ A package.json file in the root folder.

+ A named .js file in the _src\functions_ folder, which contains both the function definition and your function code.

### [v3](#tab/node-v3)
+ A package.json file in the root folder.

+  An HttpExample folder that contains: 

    + The [function.json definition file](functions-reference-node.md#folder-structure)
    + An [index.js file](functions-reference-node.md?pivots=nodejs-model-v3#programming-model), which contains the function code.

---


**Applies to: programming-language-powershell**


An HttpExample folder is created that contains:

+ The [function.json definition file](functions-reference-powershell.md#folder-structure)
+ A run.ps1 file, which contains the function code.


**Applies to: programming-language-python**

Files generated depend on the chosen Python programming model for Functions:
 
### [v2](#tab/python-v2)

+ A project-level requirements.txt file that lists packages required by Functions.

+ A function_app.py file that contains both the function definition and code.

### [v1](#tab/python-v1)

+ A project-level requirements.txt file that lists packages required by Functions.

+ An HttpExample folder that contains:
    + The [function.json definition file](functions-reference-python.md#folder-structure)
    + An \_\_init\_\_.py file, which contains the function code.

---



At this point, you can [run your HTTP trigger function locally](#run-functions-locally).

## Add a function to your project

You can add a new function to an existing project by using one of the predefined Functions trigger templates. To add a new function trigger, select F1 to open the command palette, then find and run the command **Azure Functions: Create Function**. Follow the prompts to choose your trigger type and define the required attributes of the trigger. If your trigger requires an access key or connection string to connect to a service, get that item ready before you create the function trigger.

**Applies to: programming-language-csharp**

This action adds a new C# class library (.cs) file to your project.

**Applies to: programming-language-java**

This action adds a new Java (.java) file to your project.

**Applies to: programming-language-javascript,programming-language-typescript**

This action's results depend on the Node.js model version.

### [v4](#tab/node-v4)

+ A package.json file in the root folder.

+ A named .js file in the _src\functions_ folder, which contains both the function definition and your function code.

### [v3](#tab/node-v3)

Visual Studio Code creates a new folder in the project. The folder contains a new **function.json** file and the new JavaScript code file.

---

**Applies to: programming-language-powershell**

This action creates a new folder in the project. The folder contains a new **function.json** file and the new PowerShell code file.

**Applies to: programming-language-python**

This action's results depend on the Python model version.

### [v2](#tab/python-v2)

Visual Studio Code adds new function code either to the **function_app.py** file (default behavior) or to another Python file that you selected.

### [v1](#tab/python-v1)

Visual Studio Code creates a new folder in the project. The folder contains a new **function.json** file and the new Python code file.

---


## <a name="add-input-and-output-bindings"></a>Connect to services

You can connect your function to other Azure services by adding input and output bindings. Bindings connect your function to other services without you having to write the connection code. 

**Applies to: programming-language-csharp**

For example, the way that you define an output binding that writes data to a storage queue depends on your process model:

### [Isolated process](#tab/isolated-process)

1. If necessary, [add a reference to the package that supports your binding extension](#install-binding-extensions).

1. Update the function method to add an attribute that defines the binding parameter, like `QueueOutput` for a queue output binding. You can use a `MultiResponse` object to return multiple messages or multiple output streams. 

### [In-process](#tab/in-process)

1. If necessary, [add a reference to the package that supports your binding extension](#install-binding-extensions).

1. Update the function method to add an attribute that defines the binding parameter, such as `Queue` for a Queue binding. You can use an `ICollector<T>` type to represent a collection of messages.

---


**Applies to: programming-language-java**

For example, to add an output binding that writes data to a storage queue, update the function method to add a binding parameter defined by using the [`QueueOutput`](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.queueoutput) annotation. The [`OutputBinding<T>`](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.outputbinding) object represents the messages that are written to an output binding when the function completes.

**Applies to: programming-language-javascript**

For example, the way that you define the output binding that writes data to a storage queue depends on your Node.js model version:

### [v4](#tab/node-v4)

Using the Node.js v4 model, you must manually add a `return:` option in the function definition by using the `storageQueue` function on the `output` object. This function defines the storage queue to write the `return` output. The output is written when the function completes. 

### [v3](#tab/node-v3)


Visual Studio Code lets you add bindings to your function.json file by following a convenient set of prompts. 

To add a binding, open the command pallet (F1) and type **Azure Functions: add binding...**, choose the function for the new binding, and then follow the prompts, which vary depending on the type of binding being added to the function. 

The following are example prompts to define a new storage output binding:

| Prompt | Value | Description |
| --- | --- | --- |
| **Select binding direction** | `out` | The binding is an output binding. |
| **Select binding with direction** | `Azure Queue Storage` | The binding is an Azure Storage queue binding. |
| **The name used to identify this binding in your code** | `msg` | Name that identifies the binding parameter referenced in your code. |
| **The queue to which the message will be sent** | `outqueue` | The name of the queue that the binding writes to. When the *queueName* doesn't exist, the binding creates it on first use. |
| **Select setting from "local.settings.json"** | `MyStorageConnection` | The name of an application setting that contains the connection string for the storage account. The `AzureWebJobsStorage` setting contains the connection string for the storage account you created with the function app. |

You can also right-click (Ctrl+click on macOS) directly on the **function.json** file in your function folder, select **Add binding**, and follow the same prompts.

In this example, the following binding is added to the `bindings` array in your function.json file:

```json
{
    "type": "queue",
    "direction": "out",
    "name": "msg",
    "queueName": "outqueue",
    "connection": "MyStorageConnection"
}
```

---


**Applies to: programming-language-powershell**


Visual Studio Code lets you add bindings to your function.json file by following a convenient set of prompts. 

To add a binding, open the command pallet (F1) and type **Azure Functions: add binding...**, choose the function for the new binding, and then follow the prompts, which vary depending on the type of binding being added to the function. 

The following are example prompts to define a new storage output binding:

| Prompt | Value | Description |
| --- | --- | --- |
| **Select binding direction** | `out` | The binding is an output binding. |
| **Select binding with direction** | `Azure Queue Storage` | The binding is an Azure Storage queue binding. |
| **The name used to identify this binding in your code** | `msg` | Name that identifies the binding parameter referenced in your code. |
| **The queue to which the message will be sent** | `outqueue` | The name of the queue that the binding writes to. When the *queueName* doesn't exist, the binding creates it on first use. |
| **Select setting from "local.settings.json"** | `MyStorageConnection` | The name of an application setting that contains the connection string for the storage account. The `AzureWebJobsStorage` setting contains the connection string for the storage account you created with the function app. |

You can also right-click (Ctrl+click on macOS) directly on the **function.json** file in your function folder, select **Add binding**, and follow the same prompts.

In this example, the following binding is added to the `bindings` array in your function.json file:

```json
{
    "type": "queue",
    "direction": "out",
    "name": "msg",
    "queueName": "outqueue",
    "connection": "MyStorageConnection"
}
```


**Applies to: programming-language-python**

For example, the way you define the output binding that writes data to a storage queue depends on your Python model version:

### [v2](#tab/python-v2)

Use the `@queue_output` decorator on the function to define a named binding parameter for the output to the storage queue. The `func.Out` parameter defines what output is written. 

### [v1](#tab/python-v1)


Visual Studio Code lets you add bindings to your function.json file by following a convenient set of prompts. 

To add a binding, open the command pallet (F1) and type **Azure Functions: add binding...**, choose the function for the new binding, and then follow the prompts, which vary depending on the type of binding being added to the function. 

The following are example prompts to define a new storage output binding:

| Prompt | Value | Description |
| --- | --- | --- |
| **Select binding direction** | `out` | The binding is an output binding. |
| **Select binding with direction** | `Azure Queue Storage` | The binding is an Azure Storage queue binding. |
| **The name used to identify this binding in your code** | `msg` | Name that identifies the binding parameter referenced in your code. |
| **The queue to which the message will be sent** | `outqueue` | The name of the queue that the binding writes to. When the *queueName* doesn't exist, the binding creates it on first use. |
| **Select setting from "local.settings.json"** | `MyStorageConnection` | The name of an application setting that contains the connection string for the storage account. The `AzureWebJobsStorage` setting contains the connection string for the storage account you created with the function app. |

You can also right-click (Ctrl+click on macOS) directly on the **function.json** file in your function folder, select **Add binding**, and follow the same prompts.

In this example, the following binding is added to the `bindings` array in your function.json file:

```json
{
    "type": "queue",
    "direction": "out",
    "name": "msg",
    "queueName": "outqueue",
    "connection": "MyStorageConnection"
}
```

---




The following example shows the function definition after adding a [Queue Storage output binding](functions-bindings-storage-queue-output.md) to an [HTTP triggered function](functions-bindings-http-webhook-trigger.md):  
**Applies to: programming-language-csharp**

### [Isolated process](#tab/isolated-process)
Because an HTTP triggered function also returns an HTTP response, the function returns a `MultiResponse` object, which represents both the HTTP and queue output.

```csharp
[Function("HttpExample")]
public MultiResponse Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
```

This example is the definition of the `MultiResponse` object that includes the output binding:

```csharp
public class MultiResponse
{
    [QueueOutput("outqueue",Connection = "AzureWebJobsStorage")]
    public string[] Messages { get; set; }
    public IActionResult HttpResponse { get; set; }
}
```

This example uses [ASP.NET Core integration](dotnet-isolated-process-guide.md#aspnet-core-integration). If you aren't using ASP.NET Core integration, you need to change `HttpRequest` to `HttpRequestData` and `IActionResult` to `HttpResponseData`.

### [In-process](#tab/in-process)
[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-cli/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs-code.md)

---
Messages are sent to the queue when the function completes. The way you define the output binding depends on your process model. For more information, including links to example binding code that you can refer to, see [Add bindings to a function](add-bindings-existing-function.md?tabs=csharp#manually-add-bindings-based-on-examples).  

**Applies to: programming-language-java**


[Code reference unavailable in this source snapshot: ~/functions-quickstart-java/functions-add-output-binding-storage-queue/src/main/java/com/function/Function.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs-code.md)
  
For more information, including links to example binding code that you can refer to, see [Add bindings to a function](add-bindings-existing-function.md?tabs=java#manually-add-bindings-based-on-examples).  

**Applies to: programming-language-javascript**

### [v4](#tab/node-v4)

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model/src/functions/httpTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs-code.md)

### [v3](#tab/node-v3)
[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli/HttpExample/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs-code.md)

---

The way you define the output binding depends on the version of your Node.js model. For more information, including links to example binding code that you can refer to, see [Add bindings to a function](add-bindings-existing-function.md?tabs=javascript#manually-add-bindings-based-on-examples).   

**Applies to: programming-language-powershell**

[Code reference unavailable in this source snapshot: ~/functions-docs-powershell/functions-add-output-binding-storage-queue-cli/HttpExample/run.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs-code.md)

For more information, including links to example binding code that you can refer to, see [Add bindings to a function](add-bindings-existing-function.md?tabs=powershell#manually-add-bindings-based-on-examples).   

**Applies to: programming-language-python**

### [v2](#tab/python-v2)

[Code reference unavailable in this source snapshot: ~/functions-docs-python-v2/function_app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs-code.md)

### [v1](#tab/python-v1)

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli/HttpExample/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs-code.md)

---

The way you define the output binding depends on the version of your Python model. For more information, including links to example binding code that you can refer to, see [Add bindings to a function](add-bindings-existing-function.md?tabs=python#manually-add-bindings-based-on-examples).   

**Applies to: programming-language-typescript**

### [v4](#tab/node-v4)

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model-ts/src/functions/httpTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs-code.md)

### [v3](#tab/node-v3)

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli/HttpExample/function.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs-code.md)

---

The way you define the output binding depends on the version of your Node.js model. For more information, including links to example binding code that you can refer to, see [Add bindings to a function](add-bindings-existing-function.md?tabs=typescript#manually-add-bindings-based-on-examples).




## Sign in to Azure

Before you can create Azure resources or publish your app, you must sign in to Azure.

1. If you aren't already signed in, in the **Activity bar**, select the Azure icon. Then under **Resources**, select **Sign in to Azure**.

    Screenshot of the sign in to Azure window in Visual Studio Code.

    If you're already signed in and can see your existing subscriptions, go to the next section. If you don't yet have an Azure account, select **Create an Azure Account**. Students can select **Create an Azure for Students Account**.

1. When you are prompted in the browser, select your Azure account and sign in by using your Azure account credentials. If you create a new account, you can sign in after your account is created.

1. After you successfully sign in, you can close the new browser window. The subscriptions that belong to your Azure account are displayed in the side bar.


## <a name="publish-to-azure"></a>Create Azure resources

Before you can publish your Functions project to Azure, you must have a function app and related resources in your Azure subscription to run your code. The function app provides an execution context for your functions. When you publish from Visual Studio Code to a function app in Azure, the project is packaged and deployed to the selected function app in your Azure subscription.

When you create a function app in Azure, you can choose either a quick function app create path using defaults or a path that gives you advanced options, such as using existing Azure resources. This way, you have more control over creating the remote resources.

#### [Quick create](#tab/quick-create)


In this section, you create a function app in the Flex Consumption plan along with related resources in your Azure subscription. Many of the resource creation decisions are made for you based on default behaviors. For more control over the created resources, you must instead [create your function app with advanced options](functions-develop-vs-code.md?tabs=advanced-options#publish-to-azure).

1. In Visual Studio Code, select F1 to open the command palette. At the prompt (`>`), enter and then select **Azure Functions: Create Function App in Azure**.

1. At the prompts, provide the following information:

    | Prompt | Action |
    | --- | --- |
    | **Select subscription** | Select the Azure subscription to use. The prompt doesn't appear when you have only one subscription visible under **Resources**. |
    | **Enter a new function app name** | Enter a globally unique name that's valid in a URL path. The name you enter is validated to make sure that it's unique in Azure Functions. |
    | **Select a location for new resources** | Select an Azure region. For better performance, select a [region](https://azure.microsoft.com/explore/global-infrastructure/geographies/) near you. Only regions supported by Flex Consumption plans are displayed. |
    | **Select a runtime stack** | Select the language version you currently run locally. |
    | **Select resource authentication type** | Select **Managed identity**, which is the most secure option for connecting to the [default host storage account](storage-considerations.md#storage-account-guidance). |

    In the **Azure: Activity Log** panel, the Azure extension shows the status of individual resources as they're created in Azure.

    Screenshot that shows the log of Azure resource creation.

1. When the function app is created, the following related resources are created in your Azure subscription. The resources are named based on the name you entered for your function app.

    
+ A [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md), which is a logical container for related resources.
+ A function app, which provides the environment for executing your function code. A function app lets you group functions as a logical unit for easier management, deployment, and sharing of resources within the same hosting plan.
+ An Azure App Service plan, which defines the underlying host for your function app.
+ A standard [Azure Storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md), which is used by the Functions host to maintain state and other information about your function app.
+ An Application Insights instance that's connected to the function app, and which tracks the use of your functions in the app.
+ A user-assigned managed identity that's added to the [Storage Blob Data Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/storage#storage-blob-data-contributor) role in the new default host storage account.



    A notification is displayed after your function app is created and the deployment package is applied.

        
> **Tip:**
> By default, the Azure resources required by your function app are created based on the name you enter for your function app. By default, the resources are created with the function app in the same, new resource group. If you want to customize the names of the associated resources or reuse existing resources, [publish the project with advanced create options](functions-develop-vs-code.md?tabs=advanced-options#publish-to-azure).
    


#### [Advanced options](#tab/advanced-options)

You can't use the [quick create](functions-develop-vs-code.md?tabs=quick-create#publish-to-azure) if you want more control over the function app that gets created, such as using an existing resource group, storage account, or Application Insights instance. These steps create a function app with the ability to use existing Azure resources:

1. In the command palette, enter **Azure Functions: Create function app in Azure...(Advanced)**.

1. If you're not signed in, you're prompted to **Sign in to Azure**. You can also **Create a free Azure account**. After signing in from the browser, go back to Visual Studio Code.

1. Follow the prompts and provide this information:

   | Prompt | Selection |
   | --- | --- |
   | **Enter a globally unique name for the new function app** | Type a globally unique name that identifies your new function app and then select Enter. Valid characters for a function app name are `a-z`, `0-9`, and `-`. |
   | **Select a hosting plan** | Choose **Flex Consumption**, which is the recommended [hosting plan](functions-scale.md) for serverless hosting. |
   | **Select a location for new resources** | Select a location in a [region](https://azure.microsoft.com/regions/) near you or near other services that your functions access. If you chose an existing resource group, that location is used and you don't see this prompt. |
   | **Select a runtime stack** | Select the language version you currently run locally. |
   | **Select an instance size** | Select **512** or a larger size. You can always [change the instance size](flex-consumption-how-to.md#configure-instance-memory) at a later time. |
   | **Enter the maximum instance count** | Select the default value of **100**, which limits the total scale-out of your app. You can also choose a different value between 1 and 1,000. |
   | **Select a resource group** | Select **Create new resource group** and accept the default or enter another name for the new group that's unique in your subscription. |
   | **Select resource authentication type** | Select **Managed identity** so that your app connects to remote resources by using Microsoft Entra ID authentication instead of using shared secrets (connection strings and keys), which are less secure. |
   | **Select a user assigned identity** | Select **Create new user-assigned identity**. |
   | **Select a storage account** | Choose **Create new storage account**, and at the prompt, enter a globally unique name for the new storage account used by your function app. Storage account names must be between 3 and 24 characters long and can contain only numbers and lowercase letters. You can also select an existing account. |
   | **Select an Application Insights resource for your app** | Choose **Create new Application Insights resource**, and at the prompt, enter a name for the instance used to store runtime data from your functions. |

   A notification appears after your function app is created, and the deployment package is applied. To view the creation and deployment results, including the Azure resources that you created, select **View Output** in this notification.

---

## Create an Azure Container Apps deployment

> **Important:**
> You can host Azure Functions directly in Azure Container Apps by using the `Microsoft.App` resource provider. By using this integration, you can use all the features and capabilities of Azure Container Apps and benefit from the Functions programming model and event-driven autoscaling.
>
> Use this approach for most containerized workloads. For more information, see [Azure Functions on Azure Container Apps](../container-apps/functions-overview.md).


Use Visual Studio Code to create Azure resources for a containerized code project. When the extension detects the presence of a Dockerfile during resource creation, it asks if you want to deploy the container image instead of just the code. Visual Studio Code creates an Azure Container Apps environment for your containerized code project that's integrated with Azure Functions. For more information, see [Azure Container Apps hosting of Azure Functions](functions-container-apps-hosting.md).

>**Note:**  
>Container deployment requires the [Azure Container Apps extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurecontainerapps). This extension is currently in preview.

The create process depends on whether you choose a quick create or you need to use advanced options:

#### [Quick create](#tab/quick-create)

1. In Visual Studio Code, press <kbd>F1</kbd> to open the command palette. Search for and run the command `Azure Functions: Create Function App in Azure...`. 
 
1. When prompted, choose **Container image**.

1. Provide the following information at the prompts:

    | Prompt | Selection |
    | --- | --- |
    | **Select subscription** (optional) | Choose the subscription to use. You won't see this prompt when you have only one subscription visible under **Resources**. |
    | **Enter a name for the new function app** | Type a name that's valid in a URL path. The name you type is validated to make sure that it's globally unique in Functions. |
    | **Select resource authentication type** | Select **Managed identity** so that your app connects to remote resources by using Microsoft Entra ID authentication instead of using shared secrets (connection strings and keys), which are less secure. |
    | **Select a location for new resources** | For better performance, choose a [region](https://azure.microsoft.com/regions/) near you. |

1. When prompted, **Enter a name for the container app environment**.

    The extension shows the status of individual resources as they're being created in Azure in the **Azure: Activity Log** panel.

#### [Advanced options](#tab/advanced-options)

1. In Visual Studio Code, press <kbd>F1</kbd> to open the command palette. Search for and run the command `Azure Functions: Create Function App in Azure...(Advanced)`. 
 
1. When prompted, choose **Container image**.

1. If you're not signed in, you're prompted to **Sign in to Azure**. You can also **Create a free Azure account**. After signing in from the browser, go back to Visual Studio Code.

1. Follow the steps to provide this information:

    | Step | Selection |
    | --- | --- |
    | **Select subscription** (optional) | Choose the subscription to use. You won't see this prompt when you have only one subscription visible under **Resources**. |
    | **Enter a name for the new function app** | Type a globally unique name that identifies your new function app and then select Enter. Valid characters for a function app name are `a-z`, `0-9`, and `-`. |
    | **Select resource authentication type** | Select **Managed identity** so that your app connects to remote resources by using Microsoft Entra ID authentication instead of using shared secrets (connection strings and keys), which are less secure. |
    | **Select a user assigned identity** | Select **Create new user-assigned identity**. |
    | **Select a resource group** | Select **Create new resource group** and accept the default or enter another name for the new group that's unique in your subscription. |
    | **Select a location for new resources** | Select a location in a [region](https://azure.microsoft.com/regions/) near you or near other services that your functions access. If you chose an existing resource group, that location is used and you don't see this prompt. |
    | **Select a storage account** | Choose **Create new storage account**, and at the prompt, enter a globally unique name for the new storage account used by your function app. Storage account names must be between 3 and 24 characters long and can contain only numbers and lowercase letters. You can also select an existing account. |
    | **Select an Application Insights resource for your app** | Choose **Create new Application Insights resource**, and at the prompt, enter a name for the instance used to store runtime data from your functions. |
 
   A notification appears after your function app is created, and the deployment package is applied. To view the creation and deployment results, including the Azure resources that you created, select **View Output** in this notification.

---

For more information about the resources required to run your containerized functions in Container Apps, see [Required resources](functions-infrastructure-as-code.md?pivots=container-apps#required-resources).

>**Note:**  
>You can't currently use Visual Studio Code to deploy a containerized function app to an Azure Functions-integrated Container Apps environment. You must instead publish your container image to a container registry and then set that registry image as the deployment source for your Container Apps-hosted function app. For more information, see [Create your function app in a container](functions-how-to-custom-container.md#create-your-function-app-in-a-container) and [Update an image in the registry](functions-how-to-custom-container.md#update-an-image-in-the-registry).

## <a name="republish-project-files"></a>Deploy project files

Set up [continuous deployment](functions-continuous-deployment.md) so that your function app in Azure updates when you update source files in the connected source location. You can also deploy your project files from Visual Studio Code. When you publish from Visual Studio Code, you can use [ZIP deployment](functions-deployment-technologies.md#zip-deployment).


> **Important:**
> Deploying to an existing function app always overwrites the contents of that app in Azure.

1. In the command palette, enter and then select **Azure Functions: Deploy to Function App**.  

1. Select the function app you just created. When prompted about overwriting previous deployments, select **Deploy** to deploy your function code to the new function app resource.

1. When deployment is completed, select **View Output** to view the creation and deployment results, including the Azure resources that you created. If you miss the notification, select the bell icon in the lower-right corner to see it again.

    Screenshot of the View Output window.


## <a name="get-the-url-of-the-deployed-function"></a>Get the URL of an HTTP triggered function in Azure

To call an HTTP-triggered function from a client, you need the function's URL, which is available after deployment to your function app. This URL includes any required function keys. You can use the extension to get these URLs for your deployed functions. If you just want to run the remote function in Azure, [use the Execute function now](#run-functions-in-azure) functionality of the extension.

1. Select F1 to open the command palette, and then find and run the command **Azure Functions: Copy Function URL**.

1. Follow the prompts to select your function app in Azure and then the specific HTTP trigger that you want to invoke.

The function URL is copied to the clipboard, along with any required keys passed by the `code` query parameter. Use an HTTP tool to submit POST requests, or a browser to submit GET requests to the remote function.  

When the extension gets the URL of a function in Azure, it uses your Azure account to automatically retrieve the keys needed to start the function. [Learn more about function access keys](security-concepts.md#function-access-keys). Starting non-HTTP triggered functions requires using the admin key.

## Run functions

The Azure Functions extension lets you run individual functions. You can run functions either in your project on your local development computer or in your Azure subscription.

For HTTP trigger functions, the extension calls the HTTP endpoint. For other kinds of triggers, the extension calls administrator APIs to start the function. The message body of the request sent to the function depends on the trigger type. When a trigger requires test data, you're prompted to enter data in a specific JSON format.

### Run functions in Azure

To execute a function in Azure from Visual Studio Code, follow these steps:

1. In the command palette, enter **Azure Functions: Execute function now**, and select your Azure subscription.

1. From the list, choose your function app in Azure. If you don't see your function app, make sure you're signed in to the correct subscription.

1. From the list, choose the function that you want to run. In **Enter request body**, type the message body of the request, and press Enter to send this request message to your function.

   The default text in **Enter request body** indicates the body's format. If your function app has no functions, a notification error is shown with this error.

   When the function executes in Azure and returns a response, Visual Studio Code shows a notification.

You can also run your function from the **Azure: Functions** area by opening the shortcut menu for the function that you want to run from your function app in your Azure subscription, and then selecting **Execute Function Now...**.

When you run your functions in Azure from Visual Studio Code, the extension uses your Azure account to automatically retrieve the keys needed to start the function. [Learn more about function access keys](security-concepts.md#function-access-keys). Starting non-HTTP triggered functions requires using the admin key.

### Run functions locally

The local runtime is the same runtime that hosts your function app in Azure. The runtime reads local settings from the [local.settings.json file](#local-settings). To run your Functions project locally, you must meet [more requirements](#prerequisites).

#### Configure the project to run locally

The Functions runtime uses an Azure Storage account internally for all trigger types except HTTP and webhooks. Set the **Values.AzureWebJobsStorage** key to a valid Azure Storage account connection string.

This section uses the [Azure Storage extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestorage) with [Azure Storage Explorer](https://storageexplorer.com/) to connect to and retrieve the storage connection string.

To set the storage account connection string:

1. In Visual Studio, open **Cloud Explorer**, expand **Storage Account** > **Your Storage Account**, then select **Properties** and copy the **Primary Connection String** value.

1. In your project, open the local.settings.json file and set the value of the **AzureWebJobsStorage** key to the connection string you copied.

1. Repeat the previous step to add unique keys to the **Values** array for any other connections required by your functions.

For more information, see [Local settings file](#local-settings).

#### <a name="debugging-functions-locally"></a>Debug functions locally  

To debug your functions, select F5. If [Core Tools][Azure Functions Core Tools] isn't available, you're prompted to install it. When Core Tools is installed and running, output is shown in the Terminal. This step is the same as running the `func start` Core Tools command from the Terminal, but with extra build tasks and an attached debugger.  

When the project is running, you can use the **Execute Function Now...** feature of the extension to trigger your functions as you would when the project is deployed to Azure. With the project running in debug mode, breakpoints are hit in Visual Studio Code as you would expect.

1. In the command palette, enter **Azure Functions: Execute function now** and choose **Local project**.

1. Choose the function you want to run in your project and type the message body of the request in **Enter request body**. Press Enter to send this request message to your function. The default text in **Enter request body** should indicate the format of the body. If your function app has no functions, a notification error is shown with this error.

1. When the function runs locally and after the response is received, a notification is raised in Visual Studio Code. Information about the function execution is shown in **Terminal** panel.

Keys aren't required when running locally. This rule applies to both function keys and admin-level keys.


## <a name="local-settings"></a>Work with app settings locally

When your function app runs in Azure, settings required by your functions are [stored encrypted in app settings](functions-how-to-use-azure-function-app-settings.md#settings). During local development, these settings are instead added to the `Values` collection in the *local.settings.json* file. The *local.settings.json* file also stores settings used by local development tools. 

Items in the `Values` collection in your project's *local.settings.json* file are intended to mirror items in your function app's [application settings](functions-how-to-use-azure-function-app-settings.md#settings) in Azure.

By default, these settings aren't migrated automatically when you publish the project to Azure. After publishing finishes, you can choose to publish settings from local.settings.json to your function app in Azure. To learn more, see  [Publish application settings](#publish-application-settings).

Values in **ConnectionStrings** are never published.

**Applies to: programming-language-csharp**

### [Isolated process](#tab/isolated-process)
Your code can read the function application settings values as environment variables. For more information, see [Environment variables](functions-dotnet-class-library.md#environment-variables).

### [In-process](#tab/in-process)
Your code can read the function application settings values as environment variables, just like with any ASP.NET Core app. 

---


**Applies to: programming-language-java**

+ Your code can read the function app settings values as environment variables. For more information, see [Environment variables](functions-reference-java.md#environment-variables).

**Applies to: programming-language-javascript,programming-language-typescript**

+ Your code can read the function app settings values as environment variables. For more information, see [Environment variables](functions-reference-node.md#environment-variables).

**Applies to: programming-language-powershell**

+ Your code can read the function app settings values as environment variables. For more information, see [Environment variables](functions-reference-powershell.md#environment-variables).

**Applies to: programming-language-python**

+ Your code can read the function app settings values as environment variables. For more information, see [Environment variables](functions-reference-python.md#environment-variables).


## Application settings in Azure

The settings in the local.settings.json file in your project should match the application settings in the function app in Azure. You must add any new settings to both local.settings.json and the function app in Azure. These settings aren't uploaded automatically when you publish the project. Likewise, you must download any settings that you create in your function app [in the portal](functions-how-to-use-azure-function-app-settings.md#settings) to your local project.

### Publish application settings

The easiest way to publish the required settings to your function app in Azure is to use the **Upload settings** link that appears after you publish your project:

Screenshot to upload application settings.

You can also publish settings by using the **Azure Functions: Upload Local Setting** command in the command palette. You can add individual settings to application settings in Azure by using the **Azure Functions: Add New Setting** command.

> **Tip:**
> Be sure to save your local.settings.json file before you publish it.

If the local file is encrypted, the process decrypts it, publishes it, and encrypts it again. If conflicting values exist in the two locations, you're prompted to choose how to proceed.

View existing app settings in the **Azure: Functions** area by expanding your subscription, your function app, and **Application Settings**.

&#x20;Screenshot for viewing function app settings in Visual Studio Code.

### Download settings from Azure

If you create application settings in Azure, you can download them into your local.settings.json file by using the **Azure Functions: Download Remote Settings** command.

As with uploading, if the local file is encrypted, the process decrypts it, updates it, and encrypts it again. If conflicting values exist in the two locations, you're prompted to choose how to proceed.

## Install binding extensions

Except for HTTP and timer triggers, bindings are implemented in extension packages. 

**Applies to: programming-language-csharp**

You must explicitly install the extension packages for the triggers and bindings that need them. The specific package you install depends on your project's process model.

### [Isolated process](#tab/isolated-process)

Run the [dotnet add package](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-package) command in the Terminal window to install the extension packages that you need in your project. This template demonstrates how you add a binding for an [isolated-process class library](dotnet-isolated-process-guide.md):

```terminal
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.<BINDING_TYPE_NAME> --version <TARGET_VERSION>
```

### [In-process](#tab/in-process)

Run the [dotnet add package](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-package) command in the Terminal window to install the extension packages that you need in your project. This template demonstrates how you add a binding for an [in-process class library](functions-dotnet-class-library.md):

```terminal
dotnet add package Microsoft.Azure.WebJobs.Extensions.<BINDING_TYPE_NAME> --version <TARGET_VERSION>
```

---

Replace `<BINDING_TYPE_NAME>` with the name of the package that contains the binding you need. You can find the desired binding reference article in the [list of supported bindings](functions-triggers-bindings.md#supported-bindings).

Replace `<TARGET_VERSION>` in the example with a specific version of the package, such as `3.0.0-beta5`. Valid versions are listed on the individual package pages at [NuGet.org](https://nuget.org). The major versions that correspond to the current  Functions runtime are specified in the reference article for the binding.

>**Tip:**  
>You can also use the **NuGet** commands in [the C# Dev Kit](https://code.visualstudio.com/docs/csharp/package-management#_add-a-package) to install binding extension packages.

C# script uses [extension bundles](extension-bundles.md).


**Applies to: programming-language-java,programming-language-javascript,programming-language-powershell,programming-language-python,programming-language-typescript**


The easiest way to install binding extensions is to enable [extension bundles](extension-bundles.md). When you enable bundles, a predefined set of extension packages is automatically installed.

To enable extension bundles, open the host.json file and update its contents to match the following code:

```json
{
    "version": "2.0",
    "extensionBundle": {
        "id": "Microsoft.Azure.Functions.ExtensionBundle",
        "version": "[3.*, 4.0.0)"
    }
}
```

If for some reason you can't use an extension bundle to install binding extensions for your project, see [Explicitly install extensions](functions-bindings-register.md#explicitly-install-extensions).


## Monitoring functions

When you [run functions locally](#run-functions-locally), Core Tools streams log data to the Terminal console. You can also get log data when your Functions project runs in a function app in Azure. You can connect to streaming logs in Azure to see near-real-time log data. You should enable Application Insights for a more complete understanding of how your function app behaves.

**Applies to: programming-language-java,programming-language-javascript,programming-language-powershell,programming-language-csharp,programming-language-typescript**

### Streaming logs

When you're developing an application, it's often useful to see logging information in near-real time. You can view a stream of log files generated by your functions. Turn on logs from the command palette with the `Azure Functions: Start streaming logs` command. This output is an example of streaming logs for a request to an HTTP-triggered function:

Screenshot for streaming logs output for H T T P trigger.

To learn more, see [Streaming logs](functions-monitoring.md?tabs=vs-code#streaming-logs).


### Application Insights

You should monitor the execution of your functions by integrating your function app with Application Insights. When you create a function app in the Azure portal, this integration occurs by default. When you create your function app during Visual Studio publishing, you need to integrate Application Insights yourself. To learn how, see [Enable Application Insights integration](configure-monitoring.md#enable-application-insights-integration).

To learn more about monitoring using Application Insights, see [Monitor Azure Functions](functions-monitoring.md).

**Applies to: programming-language-csharp**

## C# script projects

By default, all C# projects are created as [C# compiled class library projects](functions-dotnet-class-library.md). If you prefer to work with C# script projects instead, you must select C# script as the default language in the Azure Functions extension settings:

1. Select **File** > **Preferences** > **Settings**.

1. Go to **User Settings** > **Extensions** > **Azure Functions**.

1. Select **C#Script** from **Azure Function: Project Language**.

After you complete these steps, calls made to the underlying Core Tools include the `--csx` option, which generates and publishes C# script (.csx) project files. When you specify this default language, all projects that you create default to C# script projects. You're not prompted to choose a project language when a default is set. To create projects in other languages, you must change this setting or remove it from the user settings.json file. After you remove this setting, you're again prompted to choose your language when you create a project.



## Command palette reference

The Azure Functions extension provides a useful graphical interface for interacting with your function apps in Azure. The same functionality is also available as commands in the command palette (F1). These Azure Functions commands are available:

| Azure Functions command | Description |
| --- | --- |
| **Add New Settings** | Creates a new application setting in Azure. To learn more, see [Publish application settings](#publish-application-settings). You might also need to [download this setting to your local settings](#download-settings-from-azure). |
| **Configure Deployment Source** | Connects your function app in Azure to a local Git repository. To learn more, see [Continuous deployment for Azure Functions](functions-continuous-deployment.md). |
| **Connect to GitHub Repository** | Connects your function app to a GitHub repository. |
| **Copy Function URL** | Gets the remote URL of an HTTP-triggered function that's running in Azure. To learn more, see [Get the URL of the deployed function](#get-the-url-of-the-deployed-function). |
| **Create function app in Azure** | Creates a new function app in your subscription in Azure. To learn more, see the section on how to [publish to a new function app in Azure](#publish-to-azure). |
| **Decrypt Settings** | Decrypts [local settings](#local-settings) that the **Azure Functions: Encrypt Settings** command encrypted. |
| **Delete Function App** | Removes a function app from your subscription in Azure. When there are no other apps in the App Service plan, you're given the option to delete that plan too. Other resources, like storage accounts and resource groups, aren't deleted. To remove all resources, you should instead [delete the resource group](functions-add-output-binding-storage-queue-vs-code.md#clean-up-resources). Your local project isn't affected. |
| **Delete Function** | Removes an existing function from a function app in Azure. Because this deletion doesn't affect your local project, instead consider removing the function locally and then [republishing your project](#republish-project-files). |
| **Delete Proxy** | Removes an Azure Functions proxy from your function app in Azure. To learn more about proxies, see [Work with Azure Functions Proxies](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-proxies.md). |
| **Delete Setting** | Deletes a function app setting in Azure. This deletion doesn't affect settings in your local.settings.json file. |
| **Disconnect from Repo** | Removes the [continuous deployment](functions-continuous-deployment.md) connection between a function app in Azure and a source control repository. |
| **Download Remote Settings** | Downloads settings from the chosen function app in Azure into your local.settings.json file. If the local file is encrypted, it's decrypted, updated, and encrypted again. If there are settings that have conflicting values in the two locations, you're prompted to choose how to proceed. Be sure to save changes to your local.settings.json file before you run this command. |
| **Edit settings** | Changes the value of an existing function app setting in Azure. This command doesn't affect settings in your local.settings.json file. |
| **Encrypt settings** | Encrypts individual items in the `Values` array in the [local settings](#local-settings). In this file, `IsEncrypted` is also set to `true`, which specifies that the local runtime decrypt settings before using them. Encrypt local settings to reduce the risk of leaking valuable information. In Azure, application settings are always stored encrypted. |
| **Execute Function Now** | Manually starts a function by using admin APIs. Use this command for testing, both locally during debugging and against functions running in Azure. When a function in Azure starts, the extension first automatically obtains an admin key, which it uses to call the remote admin APIs that start functions in Azure. The body of the message sent to the API depends on the type of trigger. Timer triggers don't require you to pass any data. |
| **Initialize Project for Use with VS Code** | Adds the required Visual Studio Code project files to an existing Functions project. Use this command to work with a project that you created by using Core Tools. |
| **Install or Update Azure Functions Core Tools** | Installs or updates [Azure Functions Core Tools], which is used to run functions locally. |
| **Redeploy** | Lets you redeploy project files from a connected Git repository to a specific deployment in Azure. To republish local updates from Visual Studio Code, [republish your project](#republish-project-files). |
| **Rename Settings** | Changes the key name of an existing function app setting in Azure. This command doesn't affect settings in your local.settings.json file. After you rename settings in Azure, you should [download those changes to the local project](#download-settings-from-azure). |
| **Restart** | Restarts the function app in Azure. Deploying updates also restarts the function app. |
| **Set AzureWebJobsStorage** | Sets the value of the `AzureWebJobsStorage` application setting. This setting is required by Azure Functions. It's set when a function app is created in Azure. |
| **Start** | Starts a stopped function app in Azure. |
| **Start Streaming Logs** | Starts the streaming logs for the function app in Azure. Use streaming logs during remote troubleshooting in Azure if you need to see logging information in near-real time. To learn more, see [Streaming logs](#streaming-logs). |
| **Stop** | Stops a function app that's running in Azure. |
| **Stop Streaming Logs** | Stops the streaming logs for the function app in Azure. |
| **Toggle as Slot Setting** | When enabled, ensures that an application setting persists for a given deployment slot. |
| **Uninstall Azure Functions Core Tools** | Removes Azure Functions Core Tools, which is required by the extension. |
| **Upload Local Settings** | Uploads settings from your local.settings.json file to the chosen function app in Azure. If the local file is encrypted, it's decrypted, uploaded, and encrypted again. If there are settings that have conflicting values in the two locations, you're prompted to choose how to proceed. Be sure to save changes to your local.settings.json file before you run this command. |
| **View Commit in GitHub** | Shows you the latest commit in a specific deployment when your function app is connected to a repository. |
| **View Deployment Logs** | Shows you the logs for a specific deployment to the function app in Azure. |

## Next steps

To learn more about Azure Functions Core Tools, see [Work with Azure Functions Core Tools](functions-run-local.md).

To learn more about developing functions as .NET class libraries, see [Azure Functions C# developer reference](functions-dotnet-class-library.md). This article also provides links to examples of how to use attributes to declare the various types of bindings supported by Azure Functions.

[Azure Functions extension for Visual Studio Code]: https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions
[Azure Functions Core Tools]: functions-run-local.md
