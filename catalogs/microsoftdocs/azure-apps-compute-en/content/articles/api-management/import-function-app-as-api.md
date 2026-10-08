---
title: Import an Azure Function App as an API
titleSuffix: Azure API Management
description: Learn how to import an Azure function app into Azure API Management as an API.
services: api-management
ms.service: azure-api-management
ms.topic: how-to
ms.date: 03/12/2026
ms.custom: sfi-image-nochange

#customer intent: As an API developer, I want to import an Azure function app as an API in API Management. 
---

# Import an Azure function app as an API

**APPLIES TO: All API Management tiers**



Azure API Management supports importing Azure function apps as new APIs or appending them to existing APIs. The process automatically generates a host key in the Azure function app, which is then assigned to a named value in API Management.

This article describes how to import an Azure function app as an API to Azure API Management and test the API.

> **Note:**
> Currently, this feature isn't available in [workspaces](workspaces-overview.md).

In this article, you learn how to:

> 
> * Import an Azure function app as an API
> * Append an Azure function app to an API
> * View the new function app host key and API Management named value
> * Test the API in the Azure portal

## Prerequisites

* Create an [Azure API Management instance](get-started-create-service-instance.md).
* Make sure you have an Azure function app in your subscription. For more information, see [Getting started with Azure Functions](../azure-functions/functions-get-started.md). The function must have an HTTP trigger. The authorization level must be set to *Anonymous* or *Function*.

> **Note:**
> You can also use the API Management Extension for Visual Studio Code to import and manage your APIs. To get started, complete the [API Management Extension tutorial](visual-studio-code-tutorial.md).

## Import an Azure function app as a new API

To create a new API from an Azure function app:

1. Navigate to your API Management service in the Azure portal.

1. In the sidebar menu, select **APIs** > **APIs**, and then select **+ Add API**.

1. Under **Create from Azure resource**, select the **Function App** tile:

    Screenshot that shows the Function App tile in the Azure portal.

1. Select the **Browse** button:

    Screenshot that highlights the Browse button.

1. Click the **Select** button under **Configure required settings** to choose from the list of available function apps:

    Screenshot that shows the Select button.

1. Find the function app that you want to import functions from, select it, and then click **Select**:

    Screenshot that shows a function app and the Select button.

1. Select the functions that you want to import and click **Select**. You can only import functions that have an HTTP trigger and an *Anonymous* or *Function* authorization level.

    Screenshot that shows a function and the Select button.

1. Switch to the **Full** view and assign a **Product** to your new API.

   >**Note:**
    > *Products* are associations of one or more APIs that are offered to developers via the developer portal. First, developers must subscribe to a product to get access to the API. When they subscribe, they get a subscription key for any API in the product. If you created the API Management instance, you're an administrator and are subscribed to every product by default.
    >
    > In some pricing tiers, API Management instances come with two default sample products:
    > - **Starter**
    > - **Unlimited**

1. As needed, specify other settings. You can also specify settings later via the **Settings** tab. These settings are explained in the [Import and publish your first API](import-and-publish.md#import-and-publish-a-backend-api) tutorial.

1. Select **Create**.

## Append a function app to an existing API

To append a function app to an existing API:

1. In your **Azure API Management** service instance, select **APIs** > **APIs** in the sidebar menu.

1. Choose an API that you want to import a function app to. Select the ellipsis (**...**) next to the API, and then select **Import**:

    Screenshot that shows the Import menu option.

1. Select the **Function App** tile:

    Screenshot that shows the Function App tile.

1. In the **Import from Function App window**, select **Browse**:

    Screenshot that shows the Browse button.

1. Click the **Select** button under **Configure required settings** to choose from the list of available function apps:

    Screenshot that shows the Function App section.

1. Find the function app you want to import functions from, select it, and then click **Select**:

    Screenshot that shows the function app and the Select button.

1. Select the functions that you want to import, and then click **Select**:

    Screenshot that shows the list of functions.

1. Select **Import**:

    Screenshot that shows the Import button.

## Authorization

When you import an Azure function app, these items are automatically generated:

* A host key in the function app. The key is named `apim-<your API Management service instance name>`.
* A named value in the API Management instance that has the name `<your Azure function app instance name>-key`. This value contains the host key.

For APIs created after April 4, 2019, the host key is passed in HTTP requests from API Management to the function app in a header. Older APIs pass the host key as [a query parameter](../azure-functions/functions-bindings-http-webhook-trigger.md#api-key-authorization). You can change this behavior by using the `PATCH Backend` [REST API call](https://learn.microsoft.com/rest/api/apimanagement/current-ga/backend/update#backendcredentialscontract) on the `Backend` entity that's associated with the function app.

> **Warning:**
> Removing or changing either the Azure function app host key value or the API Management named value disables communication between the services. The values don't automatically sync.
>
> If you need to rotate the host key, be sure to also change the named value in API Management.

### Access a function app host key

1. Navigate to your Azure function app instance:

    Screenshot that shows a list of function app instances.

1. In the **Functions** section of the sidebar menu, select **App keys**. Find the keys in the **Host keys** section:

    Screenshot that shows App keys in the menu.

### Access the named value in API Management

Navigate to your API Management instance and select **APIs** > **Named values** in the sidebar menu. The Azure function app key is stored there.

Screenshot that shows the location of the function app key.

## Test the new API in the Azure portal

You can call operations directly from the Azure portal. Using the Azure portal is a convenient way to view and test the operations of an API.  

Screenshot that shows the steps for testing an API.

1. Select the API that you created in the preceding section.

1. Select the **Test** tab.

1. Select the operation that you want to test.

    * The page displays fields for query parameters and headers. 
    * One of the headers is `Ocp-Apim-Subscription-Key`. This header is for the product subscription key that's associated with the API. 
    * If you created the API Management instance, you're an administrator, so the key is filled in automatically. 

1. Select **Send**.

    When the test succeeds, the backend responds with **200 OK** and some data.

## Related content

* [API import limitations](api-management-api-import-restrictions.md)
* [Import an OpenAPI specification](import-api-from-oas.md)
* [Import a SOAP API](import-soap-api.md)
* [Import a SOAP API and convert it to REST](restify-soap-api.md)
* [Import an App Service API](import-app-service-as-api.md)
* [Import a container app API](import-container-app-with-oas.md)
* [Import a WebSocket API](websocket-api.md)
* [Import a GraphQL API](graphql-api.md)
* [Import a GraphQL schema and set up field resolvers](graphql-schema-resolve-api.md)
* [Import a function app API](import-function-app-as-api.md)
* [Import a logic app API](import-logic-app-as-api.md)
* [Import a Service Fabric service](https://learn.microsoft.com/azure/service-fabric/service-fabric-tutorial-deploy-api-management)
* [Import a Microsoft Foundry API](azure-ai-foundry-api.md)
* [Import an Azure OpenAI API](azure-openai-api-from-specification.md)
* [Import an LLM API](openai-compatible-llm-api.md)
* [Import an OData API](import-api-from-odata.md)
* [Export a REST API as an MCP server](export-rest-mcp-server.md)
* [Expose an existing MCP server](expose-existing-mcp-server.md)
* [Import an A2A agent API](agent-to-agent-api.md)
* [Import SAP OData metadata](sap-api.md)
* [Import a gRPC API](grpc-api.md)
* [Edit an API](edit-api.md)
