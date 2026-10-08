---
title: Connect Azure Functions to Azure SQL Database using Visual Studio Code
description: Learn how to connect Azure Functions to Azure SQL Database by adding an output binding to your Visual Studio Code project.
ms.date: 02/26/2026
ms.topic: quickstart
author: dzsquared
ms.author: drskwier
ms.reviewer: glenga
zone_pivot_groups: programming-languages-set-functions-temp
ms.devlang: csharp
ms.custom:
  - devx-track-extended-java
  - devx-track-js
  - devx-track-python
  - sfi-image-nochange
# ms.devlang: csharp, javascript
---

# Connect Azure Functions to Azure SQL Database using Visual Studio Code


Azure Functions lets you connect Azure services and other resources to functions without having to write your own integration code. These *bindings*, which represent both input and output, are declared within the function definition. Data from bindings is provided to the function as parameters. A *trigger* is a special type of input binding. Although a function has only one trigger, it can have multiple input and output bindings. To learn more, see [Azure Functions triggers and bindings concepts](functions-triggers-bindings.md).

This article shows you how to use Visual Studio Code to connect [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/sql-database-paas-overview) to the function you created in the previous quickstart article. The output binding that you add to this function writes data from the HTTP request to a table in Azure SQL Database. 

**Applies to: programming-language-csharp**

Before you begin, you must complete the [quickstart: Create a C# function in Azure using Visual Studio Code](how-to-create-function-vs-code.md?pivot=programming-language-csharp). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.

**Applies to: programming-language-javascript**

Before you begin, you must complete the [quickstart: Create a JavaScript function in Azure using Visual Studio Code](how-to-create-function-vs-code.md?pivot=programming-language-javascript). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.  

**Applies to: programming-language-python**

Before you begin, you must complete the [quickstart: Create a Python function in Azure using Visual Studio Code](how-to-create-function-vs-code.md?pivot=programming-language-python). If you already cleaned up resources at the end of that article, go through the steps again to recreate the function app and related resources in Azure.  


More details on the settings for [Azure SQL bindings and trigger for Azure Functions](functions-bindings-azure-sql.md) are available in the Azure Functions documentation.

## Create your Azure SQL Database

1. Follow the [Azure SQL Database create quickstart](https://learn.microsoft.com/azure/azure-sql/database/single-database-create-quickstart) to create a serverless Azure SQL Database.  The database can be empty or created from the sample dataset AdventureWorksLT.

1. Provide the following information at the prompts:

    | Prompt | Selection |
    | --- | --- |
    | **Resource group** | Choose the resource group where you created your function app in the [previous article](how-to-create-function-vs-code.md?pivot=programming-language-csharp). |
    | **Database name** | Enter `mySampleDatabase`. |
    | **Server name** | Enter a unique name for your server. We can't provide an exact server name to use because server names must be globally unique for all servers in Azure, not just unique within a subscription. |
    | **Authentication method** | Select **SQL Server authentication**. |
    | **Server admin login** | Enter `azureuser`. |
    | **Password** | Enter a password that meets the complexity requirements. |
    | **Allow Azure services and resources to access this server** | Select **Yes**. |

    >**Important:**
    >This article currently shows how to connect to Azure SQL Database by using SQL Server authentication. For the best security, you should instead use managed identities for the Azure SQL Database connection. For more information, see the [Create an Azure SQL Database server with a user-assigned managed identity](https://learn.microsoft.com/azure/azure-sql/database/authentication-azure-ad-user-assigned-managed-identity-create-server).

1. Once the creation has completed, navigate to the database blade in the Azure portal, and, under **Settings**, select **Connection strings**. Copy the **ADO.NET** connection string for **SQL authentication**. Paste the connection string into a temporary document for later use.

    Screenshot of copying the Azure SQL Database connection string in the Azure portal.

1. Create a table to store the data from the HTTP request. In the Azure portal, navigate to the database blade and select **Query editor**. Enter the following query to create a table named `dbo.ToDo`:

    [Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/sql/create.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-azure-sql-vs-code.md)

1. Verify that your Azure Function will be able to access the Azure SQL Database by checking the [server's firewall settings](https://learn.microsoft.com/azure/azure-sql/database/network-access-controls-overview#allow-azure-services). Navigate to the **server blade** on the Azure portal, and under **Security**, select **Networking**.  The exception for **Allow Azure services and resources to access this server** should be checked.

    Screenshot of checking the Azure SQL Database firewall settings in the Azure portal.

## Update your function app settings

In the [previous quickstart article](how-to-create-function-vs-code.md?pivot=programming-language-csharp), you created a function app in Azure. In this article, you update your app to write data to the Azure SQL Database you've just created. To connect to your Azure SQL Database, you must add its connection string to your app settings. You then download the new setting to your local.settings.json file so you can connect to your Azure SQL Database when running locally.

1. Edit the connection string in the temporary document you created earlier. Replace the value of `Password` with the password you used when creating the Azure SQL Database. Copy the updated connection string.

1. Press <kbd>Ctrl/Cmd+shift+P</kbd> to open the command palette, then search for and run the command `Azure Functions: Add New Setting...`.

1. Choose the function app you created in the previous article. Provide the following information at the prompts:

    | Prompt | Selection |
    | --- | --- |
    | **Enter new app setting name** | Type `SqlConnectionString`. |
    | **Enter value for "SqlConnectionString"** | Paste the connection string of your Azure SQL Database you just copied. |

    This creates an application setting named connection `SqlConnectionString` in your function app in Azure. Now, you can download this setting to your local.settings.json file.

1. Press <kbd>Ctrl/Cmd+shift+P</kbd> again to open the command palette, then search for and run the command `Azure Functions: Download Remote Settings...`. 

1. Choose the function app you created in the previous article. Select **Yes to all** to overwrite the existing local settings. 

This downloads all of the setting from Azure to your local project, including the new connection string setting. Most of the downloaded settings aren't used when running locally. 

## Register binding extensions

Because you're using an Azure SQL output binding, you must have the corresponding bindings extension installed before you run the project. 

**Applies to: programming-language-csharp**


With the exception of HTTP and timer triggers, bindings are implemented as extension packages. Run the following [dotnet add package](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-package) command in the Terminal window to add the Azure SQL extension package to your project.

```bash
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Sql
```


**Applies to: programming-language-javascript,programming-language-python**



Your project is configured to use [extension bundles](extension-bundles.md), which automatically install a predefined set of extension packages.  

You enable extension bundles in the *host.json* file at the root of the project. This file should contain the following `extensionBundle` element:

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-storage-queue-cli-v4-programming-model/host.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-azure-sql-vs-code.md)




Now, you can add the Azure SQL output binding to your project.

## Add an output binding

**Applies to: programming-language-csharp**


Open the *HttpExample.cs* project file and add the following `ToDoItem` class, which defines the object that is written to the database:

[Code reference unavailable in this source snapshot: ~/functions-sql-todo-sample/ToDoModel.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-azure-sql-vs-code.md)

In a C# class library project, you define the bindings as binding attributes on the function method.

Open the *HttpExample.cs* project file and add the following output type class, which defines the combined objects that will be output from our function for both the HTTP response and the SQL output:

```cs
public static class OutputType
{
    [SqlOutput("dbo.ToDo", connectionStringSetting: "SqlConnectionString")]
    public ToDoItem ToDoItem { get; set; }
    public HttpResponseData HttpResponse { get; set; }
}
```

Add a using statement to the `Microsoft.Azure.Functions.Worker.Extensions.Sql` library to the top of the file:

```cs
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
```  

**Applies to: programming-language-javascript**

Binding attributes are defined directly in your code. The [Azure SQL output configuration](functions-bindings-azure-sql-output.md#configuration) describes the fields required for an Azure SQL output binding.

For this `MultiResponse` scenario, you need to add an `extraOutputs` output binding to the function.

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-sql-cli-v4-programming-model/src/functions/httpTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-azure-sql-vs-code.md)

Add the following properties to the binding configuration:

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-sql-cli-v4-programming-model/src/functions/httpTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-azure-sql-vs-code.md)



**Applies to: programming-language-python**

Binding attributes are defined directly in the *function_app.py* file. You use the `generic_output_binding` decorator to add an [Azure SQL output binding](functions-bindings-azure-sql-output.md?programming-language=python):

```python
@app.generic_output_binding(arg_name="toDoItems", type="sql", CommandText="dbo.ToDo", ConnectionStringSetting="SqlConnectionString"
    data_type=DataType.STRING)
```

In this code, `arg_name` identifies the binding parameter referenced in your code, `type` denotes the output binding is a SQL output binding, `CommandText` is the table that the binding writes to, and `ConnectionStringSetting` is the name of an application setting that contains the Azure SQL connection string. The connection string is in the SqlConnectionString setting in the *local.settings.json* file.




## Add code that uses the output binding

**Applies to: programming-language-csharp**

Replace the existing Run method with the following code:

```cs
[Function("HttpExample")]
public static OutputType Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req,
    FunctionContext executionContext)
{
    var logger = executionContext.GetLogger("HttpExample");
    logger.LogInformation("C# HTTP trigger function processed a request.");

    var message = "Welcome to Azure Functions!";

    var response = req.CreateResponse(HttpStatusCode.OK);
    response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
    response.WriteString(message);

    // Return a response to both HTTP trigger and Azure SQL output binding.
    return new OutputType()
    {
         ToDoItem = new ToDoItem
        {
            id = System.Guid.NewGuid().ToString(),
            title = message,
            completed = false,
            url = ""
        },
        HttpResponse = response
    };
}
```


**Applies to: programming-language-javascript**

Add code that uses the `extraInputs` output binding object on `context` to send a JSON document to the named output binding function, `sendToSql`. Add this code before the `return` statement.

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-sql-cli-v4-programming-model/src/functions/httpTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-azure-sql-vs-code.md)

To utilize the `crypto` module, add the following line to the top of the file:

```javascript
const crypto = require("crypto");
```

At this point, your function should look as follows:

[Code reference unavailable in this source snapshot: ~/functions-docs-javascript/functions-add-output-binding-sql-cli-v4-programming-model/src/functions/httpTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-azure-sql-vs-code.md)




**Applies to: programming-language-python**

Update *function_app.py* to match the following code. Add the `toDoItems` parameter to the function definition and `toDoItems.set()` under the `if name:` statement:

```python
import azure.functions as func
import logging
from azure.functions.decorators.core import DataType
import uuid

app = func.FunctionApp()

@app.function_name(name="HttpTrigger1")
@app.route(route="hello", auth_level=func.AuthLevel.FUNCTION)
@app.generic_output_binding(arg_name="toDoItems", type="sql", CommandText="dbo.ToDo", ConnectionStringSetting="SqlConnectionString",data_type=DataType.STRING)
def test_function(req: func.HttpRequest, toDoItems: func.Out[func.SqlRow]) -> func.HttpResponse:
     logging.info('Python HTTP trigger function processed a request.')
     name = req.get_json().get('name')
     if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

     if name:
        toDoItems.set(func.SqlRow({"Id": str(uuid.uuid4()), "title": name, "completed": False, "url": ""}))
        return func.HttpResponse(f"Hello {name}!")
     else:
        return func.HttpResponse(
                    "Please pass a name on the query string or in the request body",
                    status_code=400
                )
```  

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

    Screenshot of execute function now menu item from Visual Studio Code.

1. In **Enter request body** you see the request message body value of `{ "name": "Azure" }`. Press Enter to send this request message to your function.

1. After a response is returned, press <kbd>Ctrl + C</kbd> to stop Core Tools.


### Verify that information has been written to the database

1. On the Azure portal, go back to your Azure SQL Database and select **Query editor**.

    Screenshot of logging in to query editor on the Azure portal.

1. Connect to your database and expand the **Tables** node in object explorer on the left. Right-click on the `dbo.ToDo` table and select **Select Top 1000 Rows**.

1. Verify that the new information has been written to the database by the output binding.


## Redeploy and verify the updated app

1. In Visual Studio Code, press F1 to open the command palette. In the command palette, search for and select `Azure Functions: Deploy to function app...`.

1. Choose the function app that you created in the first article. Because you're redeploying your project to the same app, select **Deploy** to dismiss the warning about overwriting files.

1. After deployment completes, you can again use the **Execute Function Now...** feature to trigger the function in Azure. This command automatically retrieves the function access key and uses it when calling the HTTP trigger endpoint.

1. Again [check the data written to your Azure SQL Database](#verify-that-information-has-been-written-to-the-database) to verify that the output binding again generates a new JSON document.

## Clean up resources

In Azure, *resources* refer to function apps, functions, storage accounts, and so forth. They're grouped into *resource groups*, and you can delete everything in a group by deleting the group.

You created resources to complete these quickstarts. You may be billed for these resources, depending on your [account status](https://azure.microsoft.com/account/) and [service pricing](https://azure.microsoft.com/pricing/). If you don't need the resources anymore, here's how to delete them:


1. In Visual Studio Code, press <kbd>F1</kbd> to open the command palette. In the command palette, search for and select `Azure: Open in portal`.

1. Choose your function app and press <kbd>Enter</kbd>. The function app page opens in the Azure portal.

3. In the **Overview** tab, select the named link next to **Resource group**.

   Screenshot of select the resource group to delete from the function app page.

1. On the **Resource group** page, review the list of included resources, and verify that they're the ones you want to delete.

5. Select **Delete resource group**, and follow the instructions.

   Deletion may take a couple of minutes. When it's done, a notification appears for a few seconds. You can also select the bell icon at the top of the page to view the notification.


## Next steps

You've updated your HTTP triggered function to write data to Azure SQL Database. Now you can learn more about developing Functions using Visual Studio Code:

+ [Develop Azure Functions using Visual Studio Code](functions-develop-vs-code.md)

+ [Azure SQL bindings and trigger for Azure Functions](functions-bindings-azure-sql.md)

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
