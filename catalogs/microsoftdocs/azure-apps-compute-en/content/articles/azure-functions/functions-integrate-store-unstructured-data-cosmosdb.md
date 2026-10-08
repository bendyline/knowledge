---
title: Store unstructured data using Azure Cosmos DB and Functions
description: Store unstructured data using Azure Functions and Azure Cosmos DB
ms.topic: quickstart
ms.date: 10/01/2020
ms.devlang: csharp
# ms.devlang: csharp, javascript
ms.custom: devx-track-csharp, mvc, mode-other
---
# Store unstructured data using Azure Functions and Azure Cosmos DB

[Azure Cosmos DB](https://azure.microsoft.com/services/cosmos-db/) is a great way to store unstructured and JSON data. Combined with Azure Functions, Azure Cosmos DB makes storing data quick and easy with much less code than required for storing data in a relational database.

> **Note:**
> At this time, the Azure Cosmos DB trigger, input bindings, and output bindings work with SQL API and Graph API accounts only.

In Azure Functions, input and output bindings provide a declarative way to connect to external service data from your function. In this article, learn how to update an existing function to add an output binding that stores unstructured data in an Azure Cosmos DB document.

## Prerequisites

To complete this tutorial:

This article uses as its starting point the resources created in [Create your first function in the Azure portal](functions-create-function-app-portal.md). If you haven't already done so, complete these steps now to create your function app.


## Create an Azure Cosmos DB account

You must have an Azure Cosmos DB account that uses the SQL API before you create the output binding.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cosmos-db/includes/cosmos-db-create-dbaccount.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-integrate-store-unstructured-data-cosmosdb.md)

## Add an output binding

1. In the Azure portal, navigate to and select the function app you created previously.

1. Select **Functions**, and then select the HttpTrigger function.

    Select your Http function in the Azure portal.

1. Select **Integration** and **+ Add output**.

     Add an Azure Cosmos DB output binding.

1. Use the **Create Output** settings as specified in the table:

     Configure Azure Cosmos DB output binding.

    | Setting | Suggested value | Description |
    | --- | --- | --- |
    | **Binding Type** | Azure Cosmos DB | Name of the binding type to select to create the output binding to Azure Cosmos DB. |
    | **Document parameter name** | taskDocument | Name that refers to the Azure Cosmos DB object in code. |
    | **Database name** | taskDatabase | Name of database to save documents. |
    | **Collection name** | taskCollection | Name of the database collection. |
    | **If true, creates the Azure Cosmos DB database and collection** | Yes | The collection doesn't already exist, so create it. |
    | **Azure Cosmos DB account connection** | New setting | Select **New**, then choose **Azure Cosmos DB Account** and the **Database account** you created earlier, and then select **OK**. Creates an application setting for your account connection. This setting is used by the binding to connection to the database. |

1. Select **OK** to create the binding.

## Update the function code

Replace the existing function code with the following code, in your chosen language:

# [C#](#tab/csharp)

Replace the existing C# function with the following code:

```csharp
#r "Newtonsoft.Json"

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

public static IActionResult Run(HttpRequest req, out object taskDocument, ILogger log)
{
    string name = req.Query["name"];
    string task = req.Query["task"];
    string duedate = req.Query["duedate"];

    // We need both name and task parameters.
    if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(task))
    {
        taskDocument = new
        {
            name,
            duedate,
            task
        };

        return (ActionResult)new OkResult();
    }
    else
    {
        taskDocument = null;
        return (ActionResult)new BadRequestResult();
    }
}
```

# [JavaScript](#tab/javascript)

Replace the existing JavaScript function with the following code:

```js
module.exports = async function (context, req) {

    // We need both name and task parameters.
    if (req.query.name && req.query.task) {

        // Set the output binding data from the query object.
        context.bindings.taskDocument = req.query;

        // Success.
        context.res = {
            status: 200
        };
    }
    else {
        context.res = {
            status: 400,
            body: "The query options 'name' and 'task' are required."
        };
    }
};
```
---

This code sample reads the HTTP Request query strings and assigns them to fields in the `taskDocument` object. The `taskDocument` binding sends the object data from this binding parameter to be stored in the bound document database. The database is created the first time the function runs.

## Test the function and database

1. Select **Test/Run**. Under **Query**, select **+ Add parameter** and add the following parameters to the query string:

    + `name`
    + `task`
    + `duedate`

    Test the function.


1. Select **Run** and verify that a 200 status is returned.

    Screenshot shows the HTTP response code 200 status highlighted after selecting Run.


1. In the Azure portal, search for and select **Azure Cosmos DB**.

    Search for the Azure Cosmos DB service.

1. Choose your Azure Cosmos DB account, then select  **Data Explorer**.

1. Expand the **TaskCollection** nodes, select the new document, and confirm that the document contains your query string values, along with some additional metadata.

    Verify the string values in your document.

You've successfully added a binding to your HTTP trigger to store unstructured data in an Azure Cosmos DB instance.

## Clean up resources


In the preceding steps, you created Azure resources in a resource group. If you don't expect to need these resources in the future, you can delete them by deleting the resource group:

1. From the Azure portal menu or home page, select **Resource groups** > **myResourceGroup**.

1. On the **myResourceGroup** pane, make sure that the listed resources are the ones you want to delete.

1. Select **Delete resource group**. Type **myResourceGroup** in the text box to confirm, and then select **Delete**.



## Next steps

For more information about binding to an Azure Cosmos DB instance, see [Azure Functions Azure Cosmos DB bindings](functions-bindings-cosmosdb.md).

* [Azure Functions triggers and bindings concepts](functions-triggers-bindings.md)  
  Learn how Functions integrates with other services.  
* [Azure Functions developer reference](functions-reference.md)  
  Provides more technical information about the Functions runtime and a reference for coding functions and defining triggers and bindings.
* [Code and test Azure Functions locally](functions-develop-local.md)  
  Describes the options for developing your functions locally.
