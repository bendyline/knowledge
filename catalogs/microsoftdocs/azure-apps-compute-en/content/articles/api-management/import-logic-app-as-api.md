---
title: Import a Logic App as an API by Using the Azure Portal
description: Learn how to use Azure API Management to import a logic app (Consumption) resource as an API.
services: api-management
ms.service: azure-api-management
ms.topic: how-to
ms.date: 03/12/2026
ms.custom: sfi-image-nochange

#customer intent: As a developer, I want to import a logic app as an API.
---

# Import a logic app as an API

**APPLIES TO: All API Management tiers**



This article shows how to import a logic app as an API and test the imported API.

> **Note:**
> Currently, this feature isn't available in [workspaces](workspaces-overview.md).

In this article, you learn how to:

> 
> - Import a logic app as an API
> - Test the API in the Azure portal

> **Note:**
> Azure API Management supports automated import of a Logic App (Consumption) resource, which runs in the multitenant Logic Apps environment. For more information, see [Differences between Standard single-tenant logic apps and Consumption multitenant logic apps](../logic-apps/single-tenant-overview-compare.md).

## Prerequisites

- Create an [Azure API Management instance](get-started-create-service-instance.md).
- Make sure there's a Consumption plan-based Logic App resource in your subscription that exposes an HTTP endpoint. For more information, see [Trigger workflows with HTTP endpoints](../logic-apps/logic-apps-http-endpoint.md).

## Import and publish a backend API

1. Navigate to your API Management service in the [Azure portal](https://portal.azure.com).

1. In the sidebar menu, in the **APIs** section, select **APIs**, and then select **+ Add API**.

1. Under **Create from Azure resource**, select the **Logic App** tile:

    Screenshot that shows the Logic App tile.

1. Select **Browse** to see the list of logic apps that have HTTP trigger in your subscription. (Logic apps without an HTTP trigger don't appear in the list.)

    Screenshot that shows the Browse button.

1. Select the logic app:

    Screenshot that shows the Select Logic App to import window.

    API Management finds the Swagger document that's associated with the selected app, fetches it, and imports it.

1. Add an API URL suffix. The suffix uniquely identifies the API in the API Management instance.

    Screenshot that shows values entered in the Create from Logic App window.

1. If you want the API to be published and available to developers, switch to the **Full** view and associate the API with a **Product**. This example uses the **Unlimited** product. You can add your API to a product when you create it or later via the **Settings** tab.

    >**Note:**
    > Products are associations of one or more APIs offered to developers via the developer portal. First, developers must subscribe to a product to get access to the API. After they subscribe, they get a subscription key for any API in the product. As creator of the API Management instance, you're an administrator and are subscribed to every product by default.
    >
    > In certain tiers, each API Management instance comes with two default sample products:
    > - **Starter**
    > - **Unlimited**

1. Enter other API settings. You can set these values when you create the API or later by going to the **Settings** tab. The settings are explained in the [Import and publish your first API](import-and-publish.md#import-and-publish-a-backend-api) tutorial.

1. Select **Create**.

## Test the API in the Azure portal

You can call operations directly from the Azure portal. This method provides a convenient way to view and test the operations of an API.

Screenshot that shows the steps for testing an API.

1. Select the API that you created in the previous step.

1. On the **Test** tab, select the operation that you want to test.

    * The page displays fields for query parameters and headers. 
    * One of the headers is `Ocp-Apim-Subscription-Key`. This header is for the product subscription key that's associated with the API. 
    * As creator of the API Management instance, you're an administrator, so the key is filled in automatically.

1. Select **Send**. When the test succeeds, the backend responds with **200 OK** and data.

## Append other APIs

You can compose an API out of APIs that are exposed by different services, including:

- An OpenAPI specification
- A SOAP API
- A GraphQL API
- A Web App that's hosted in Azure App Service
- Azure Functions
- Azure Logic Apps
- Azure Service Fabric

> **Note:**
> 
> When you import an API, the operations are appended to your current API.

To append an API to an existing API: 

1. Go to your Azure API Management instance in the Azure portal:

   Screenshot that shows the API Management services page.

1. Select **APIs** on the **Overview** page, or select **APIs** > **APIs** in the sidebar menu.

   Screenshot that shows the APIs selection on the Overview page.

1. Select the ellipsis (**...**) next to the API that you want to append another API to.

1. Select **Import** from the context menu:

    Screenshot that shows the Import command.

1. Select a service from which to import an API.


>**Note:**
>Every Logic App has a `manual-invoke` operation. If you want to combine multiple logic apps in an API, you need to rename the function. To rename the function/API, change the title value in the OpenAPI Specification editor.

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
