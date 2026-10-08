---
title: Connect Azure Functions to Azure Cosmos DB using Visual Studio Code
description: Learn how to connect Azure Functions to an Azure Cosmos DB account by adding an output binding to your Visual Studio Code project.
ms.date: 02/26/2026
ms.topic: quickstart
zone_pivot_groups: programming-languages-set-functions-temp
ms.devlang: csharp
ms.custom:
  - mode-ui
  - vscode-azure-extension-update-completed
  - devx-track-extended-java
  - devx-track-js
  - devx-track-python
  - sfi-image-nochange
# ms.devlang: csharp, javascript, python
---

# Connect Azure Functions to Azure Cosmos DB using Visual Studio Code


Azure Functions lets you connect Azure services and other resources to functions without having to write your own integration code. These *bindings*, which represent both input and output, are declared within the function definition. Data from bindings is provided to the function as parameters. A *trigger* is a special type of input binding. Although a function has only one trigger, it can have multiple input and output bindings. To learn more, see [Azure Functions triggers and bindings concepts](functions-triggers-bindings.md).

This article shows you how to use Visual Studio Code to connect [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/introduction) to the function you created in the previous quickstart article. The output binding that you add to this function writes data from the HTTP request to a JSON document stored in an Azure Cosmos DB container. 

**Applies to: programming-language-csharp**

Before you begin, you must complete the [quickstart: Create a C# function in Azure using Visual Studio Code](how-to-create-function-vs-code.md?pivot=programming-language-csharp). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.

**Applies to: programming-language-javascript**

Before you begin, you must complete the [quickstart: Create a JavaScript function in Azure using Visual Studio Code](how-to-create-function-vs-code.md?pivot=programming-language-javascript). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.  

>**Note:**
>This article supports [Node.js v4 for Functions](functions-reference-node.md?pivots=nodejs-model-v4).  

**Applies to: programming-language-python**

Before you begin, you must complete the [quickstart: Create a Python function in Azure using Visual Studio Code](how-to-create-function-vs-code.md?pivot=programming-language-python). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.  


## Configure your environment

Before you get started, make sure to install the [Azure Databases extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) for Visual Studio Code.

## Create your Azure Cosmos DB account

Now, you create an Azure Cosmos DB account as a [serverless account type](https://learn.microsoft.com/azure/cosmos-db/serverless). This consumption-based mode makes Azure Cosmos DB a strong option for serverless workloads. 

1. In Visual Studio Code, select **View** > **Command Palette...** then in the command palette search for `Azure Databases: Create Server...`

1. Provide the following information at the prompts:

    | Prompt | Selection |
    | --- | --- |
    | **Select an Azure Database Server** | Choose **Core (NoSQL)** to create a document database that you can query by using a SQL syntax or a Query Copilot ([Preview](https://learn.microsoft.com/azure/cosmos-db/nosql/query/how-to-enable-use-copilot)) converting natural language prompts to queries. [Learn more about the Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/introduction). |
    | **Account name** | Enter a unique name to identify your Azure Cosmos DB account. The account name can use only lowercase letters, numbers, and hyphens (-), and must be between 3 and 31 characters long. |
    | **Select a capacity model** | Select **Serverless** to create an account in [serverless](https://learn.microsoft.com/azure/cosmos-db/serverless) mode. |
    | **Select a resource group for new resources** | Choose the resource group where you created your function app in the [previous article](how-to-create-function-vs-code.md?pivot=programming-language-csharp). |
    | **Select a location for new resources** | Select a geographic location to host your Azure Cosmos DB account. Use the location that's closest to you or your users to get the fastest access to your data. |

    After your new account is provisioned, a message is displayed in notification area. 

## Create an Azure Cosmos DB database and container

1. Select the Azure icon in the Activity bar, expand **Resources** > **Azure Cosmos DB**, right-click (Ctrl+select on macOS) your account, and select **Create database...**.

1. Provide the following information at the prompts:

    | Prompt | Selection |
    | --- | --- |
    | **Database name** | Type `my-database`. |
    | **Enter and ID for your collection** | Type `my-container`. |
    | **Enter the partition key for the collection** | Type `/id` as the [partition key](https://learn.microsoft.com/azure/cosmos-db/partitioning-overview). |

1. Select **OK** to create the container and database. 

## Update your function app settings

In the [previous quickstart article](how-to-create-function-vs-code.md?pivot=programming-language-csharp), you created a function app in Azure. In this article, you update your app to write JSON documents to the Azure Cosmos DB container you've created. To connect to your Azure Cosmos DB account, you must add its connection string to your app settings. You then download the new setting to your local.settings.json file so you can connect to your Azure Cosmos DB account when running locally.

1. In Visual Studio Code, right-click (Ctrl+select on macOS) on your new Azure Cosmos DB account, and select **Copy Connection String**.

    Copying the Azure Cosmos DB connection string

1. Press <kbd>F1</kbd> to open the command palette, then search for and run the command `Azure Functions: Add New Setting...`.

1. Choose the function app you created in the previous article. Provide the following information at the prompts:

    | Prompt | Selection |
    | --- | --- |
    | **Enter new app setting name** | Type `CosmosDbConnectionString`. |
    | **Enter value for "CosmosDbConnectionString"** | Paste the connection string of your Azure Cosmos DB account you copied. You can also configure [Microsoft Entra identity](functions-bindings-cosmosdb-v2-trigger.md#connections) as an alternative. |

    This creates an application setting named connection `CosmosDbConnectionString` in your function app in Azure. Now, you can download this setting to your local.settings.json file.

1. Press <kbd>F1</kbd> again to open the command palette, then search for and run the command `Azure Functions: Download Remote Settings...`. 

1. Choose the function app you created in the previous article. Select **Yes to all** to overwrite the existing local settings. 

This downloads all of the setting from Azure to your local project, including the new connection string setting. Most of the downloaded settings aren't used when running locally. 

## Register binding extensions

Because you're using an Azure Cosmos DB output binding, you must have the corresponding bindings extension installed before you run the project. 

**Applies to: programming-language-csharp**


Except for HTTP and timer triggers, bindings are implemented as extension packages. Run the following [dotnet add package](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-package) command in the Terminal window to add the Azure Cosmos DB extension package to your project.

```command
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.CosmosDB
```



**Applies to: programming-language-javascript,programming-language-python**



Your project is configured to use [extension bundles](extension-bundles.md), which automatically install a predefined set of extension packages.  

You enable extension bundles in the *host.json* file at the root of the project. This file should contain the following `extensionBundle` element:

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model/host.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-cosmos-db-vs-code.md)



Now, you can add the Azure Cosmos DB output binding to your project.

## Add an output binding
**Applies to: programming-language-csharp**

In a C# class library project, the bindings are defined as binding attributes on the function method. 

Open the *HttpExample.cs* project file and add the following classes:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-cosmos-db-isolated/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-cosmos-db-vs-code.md)

The `MyDocument` class defines an object that gets written to the database. The connection string for the Storage account is set by the `Connection` property. In this case, you could omit `Connection` because you're already using the default storage account.

The `MultiResponse` class allows you to both write to the specified collection in the Azure Cosmos DB and return an HTTP success message. Because you need to return a `MultiResponse` object, you need to also update the method signature.

Specific attributes specify the name of the container and the name of its parent database. The connection string for your Azure Cosmos DB account is set by the `CosmosDbConnectionString`.  

**Applies to: programming-language-javascript**

Binding attributes are defined directly in your function code. The [Azure Cosmos DB output configuration](functions-bindings-cosmosdb-v2-output.md#configuration) describes the fields required for an Azure Cosmos DB output binding.  

For this `MultiResponse` scenario, you need to add an `extraOutputs` output binding to the function.

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-cosmosdb-cli-v4-programming-model/src/functions/httpTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-cosmos-db-vs-code.md)

Add the following properties to the binding configuration:

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-cosmosdb-cli-v4-programming-model/src/functions/httpTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-cosmos-db-vs-code.md)


**Applies to: programming-language-python**

Binding attributes are defined directly in the *function_app.py* file. You use the `cosmos_db_output` decorator to add an [Azure Cosmos DB output binding](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-triggers-python.md#azure-cosmos-db-output-binding):

```python
@app.cosmos_db_output(arg_name="outputDocument", database_name="my-database", 
    container_name="my-container", connection="CosmosDbConnectionString")
```

In this code, `arg_name` identifies the binding parameter referenced in your code, `database_name` and `container_name` are the database and collection names that the binding writes to, and `connection` is the name of an application setting that contains the connection string for the Azure Cosmos DB account, which is in the `CosmosDbConnectionString` setting in the *local.settings.json* file.  


## Add code that uses the output binding

**Applies to: programming-language-csharp**

Replace the existing `Run` method with the following code:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-cosmos-db-isolated/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-cosmos-db-vs-code.md)


**Applies to: programming-language-javascript**

Add code that uses the `extraInputs` output binding object on `context` to send a JSON document to the named output binding function, `sendToCosmosDb`. Add this code before the `return` statement.

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-cosmosdb-cli-v4-programming-model/src/functions/httpTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-cosmos-db-vs-code.md)

At this point, your function should look as follows:

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/src/functions/httpSendToCosmosDb.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-cosmos-db-vs-code.md)

This code now returns a `MultiResponse` object that contains both a document and an HTTP response.


**Applies to: programming-language-python**

Update *function_app.py* to match the following code. Add the `outputDocument` parameter to the function definition and `outputDocument.set()` under the `if name:` statement:

```python
import azure.functions as func
import logging

app = func.FunctionApp()

@app.function_name(name="HttpTrigger1")
@app.route(route="hello", auth_level=func.AuthLevel.FUNCTION)
@app.queue_output(arg_name="msg", queue_name="outqueue", connection="AzureWebJobsStorage")
@app.cosmos_db_output(arg_name="outputDocument", database_name="my-database", container_name="my-container", connection="CosmosDbConnectionString")
def test_function(req: func.HttpRequest, msg: func.Out[func.QueueMessage],
    outputDocument: func.Out[func.Document]) -> func.HttpResponse:
     logging.info('Python HTTP trigger function processed a request.')
     logging.info('Python Cosmos DB trigger function processed a request.')
     name = req.params.get('name')
     if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

     if name:
        outputDocument.set(func.Document.from_dict({"id": name}))
        msg.set(name)
        return func.HttpResponse(f"Hello {name}!")
     else:
        return func.HttpResponse(
                    "Please pass a name on the query string or in the request body",
                    status_code=400
                )
```

The document `{"id": "name"}` is created in the database collection specified in the binding.  

**Applies to: programming-language-csharp**


## Run the function locally

Visual Studio Code integrates with [Azure Functions Core tools](functions-run-local.md) to let you run this project on your local development computer before you publish to Azure. If you don't already have Core Tools installed locally, you are prompted to install it the first time you run your project. 

1. To call your function, press <kbd>F5</kbd> to start the function app project. The **Terminal** panel displays the output from Core Tools. Your app starts in the **Terminal** panel. You can see the URL endpoint of your HTTP-triggered function running locally.

    Screenshot of the Local function Visual Studio Code output.

    If you don't already have Core Tools installed, select **Install** to install Core Tools when prompted to do so.  
    If you have trouble running on Windows, make sure that the default terminal for Visual Studio Code isn't set to **WSL Bash**.

1. With the Core Tools running, go to the **Azure: Functions** area. Under **Functions**, expand **Local Project** > **Functions**. Right-click (Windows) or <kbd>Ctrl -</kbd> click (macOS) the `HttpExample` function and choose **Execute Function Now...**.

    Screenshot of execute function now from Visual Studio Code.

1. In the **Enter request body**, press <kbd>Enter</kbd> to send a request message to your function.

1. When the function executes locally and returns a response, a notification is raised in Visual Studio Code. Information about the function execution is shown in the **Terminal** panel.

1. Press <kbd>Ctrl + C</kbd> to stop Core Tools and disconnect the debugger.


**Applies to: programming-language-javascript,programming-language-python**

## Run the function locally

1. As in the previous article, press <kbd>F5</kbd> to start the function app project and Core Tools. 

1. With Core Tools running, go to the **Azure: Functions** area. Under **Functions**, expand **Local Project** > **Functions**. Right-click (Ctrl-click on Mac) the `HttpExample` function and choose **Execute Function Now...**.

    Execute function now from Visual Studio Code

1. In **Enter request body** you see the request message body value of `{ "name": "Azure" }`. Press Enter to send this request message to your function.  
 
1. After a response is returned, press <kbd>Ctrl + C</kbd> to stop Core Tools.


### Verify that a JSON document has been created

1. On the Azure portal, go back to your Azure Cosmos DB account and select **Data Explorer**.

1. Expand your database and container, and select **Items** to list the documents created in your container.

1. Verify that a new JSON document has been created by the output binding.

    Verifying that a new document has been created in the Azure Cosmos DB container

## Redeploy and verify the updated app

1. In Visual Studio Code, press F1 to open the command palette. In the command palette, search for and select `Azure Functions: Deploy to function app...`.

1. Choose the function app that you created in the first article. Because you're redeploying your project to the same app, select **Deploy** to dismiss the warning about overwriting files.

1. After deployment completes, you can again use the **Execute Function Now...** feature to trigger the function in Azure. This command automatically retrieves the function access key and uses it when calling the HTTP trigger endpoint.

1. Again [check the documents created in your Azure Cosmos DB container](#verify-that-a-json-document-has-been-created) to verify that the output binding again generates a new JSON document.

## Clean up resources

In Azure, *resources* refer to function apps, functions, storage accounts, and so forth. They're grouped into *resource groups*, and you can delete everything in a group by deleting the group.

You created resources to complete these quickstarts. You might be billed for these resources, depending on your [account status](https://azure.microsoft.com/account/) and [service pricing](https://azure.microsoft.com/pricing/). If you don't need the resources anymore, here's how to delete them:


1. In Visual Studio Code, press <kbd>F1</kbd> to open the command palette. In the command palette, search for and select `Azure: Open in portal`.

1. Choose your function app and press <kbd>Enter</kbd>. The function app page opens in the Azure portal.

3. In the **Overview** tab, select the named link next to **Resource group**.

   Screenshot of select the resource group to delete from the function app page.

1. On the **Resource group** page, review the list of included resources, and verify that they're the ones you want to delete.

5. Select **Delete resource group**, and follow the instructions.

   Deletion may take a couple of minutes. When it's done, a notification appears for a few seconds. You can also select the bell icon at the top of the page to view the notification.


## Next steps

You've updated your HTTP triggered function to write JSON documents to an Azure Cosmos DB container. Now you can learn more about developing Functions using Visual Studio Code:

+ [Develop Azure Functions using Visual Studio Code](functions-develop-vs-code.md)

+ [Azure Functions triggers and bindings](functions-triggers-bindings.md).
**Applies to: programming-language-csharp**

+ [Examples of complete Function projects in C#](https://learn.microsoft.com/samples/browse/?products=azure-functions\&languages=csharp).

+ [Azure Functions C# developer reference](functions-dotnet-class-library.md)  

**Applies to: programming-language-javascript**

+ [Examples of complete Function projects in JavaScript](https://learn.microsoft.com/samples/browse/?products=azure-functions\&languages=javascript).

+ [Azure Functions JavaScript developer guide](functions-reference-node.md?tabs=javascript)  

**Applies to: programming-language-python**

+ [Examples of complete Function projects in Python](https://learn.microsoft.com/samples/browse/?products=azure-functions\&languages=python).

+ [Azure Functions Python developer guide](functions-reference-python.md)
