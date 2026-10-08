---
title: Import an OData API to Azure API Management | Microsoft Docs
description: Learn how to import an OData API to an API Management instance using the Azure portal.
services: api-management

ms.service: azure-api-management
ms.custom:
  - build-2024
ms.topic: how-to
ms.date: 10/08/2025
---
# Import an OData API

**APPLIES TO: All API Management tiers**



This article shows how to import an OData-compliant service as an API in API Management. 

In this article, you learn how to:
> 
> * Import an OData metadata description using the Azure portal
> * Manage the OData schema in the portal
> * Secure the OData API

## Prerequisites

- An API Management instance. If you don't already have one, complete the following quickstart: [Create an Azure API Management instance](get-started-create-service-instance.md).

- A service exposed as OData v2 or v4.

## Go to your API Management instance

1. In the [Azure portal](https://portal.azure.com), search for and select **API Management services**:

    Screenshot that shows API Management services in the search results.

1. On the **API Management services** page, select your API Management instance:

    Screenshot that shows an API Management instance on the API Management services page.

## Import OData metadata

1. In the sidebar menu, select **APIs** > **APIs**, and then select **+ Add API**.

1. Under **Create from definition**, select the **OData** tile:

    Screenshot of the OData tile in the portal.

1. Enter API settings. You can update your settings later by going to the **Settings** tab of the API. 

    1. In **OData specification**, enter a URL for an OData metadata endpoint. This value is typically the URL to the service root, appended with `/$metadata`. Alternatively, select a local OData XML file to import.

    1. Enter additional settings to configure your API. These settings are explained in the [Import and publish your first API](import-and-publish.md#import-and-publish-a-backend-api) tutorial.
1. Select **Create**.

    The API is added to the list of APIs. The entity sets and functions that are exposed in the OData metadata description appear on the API's **Entity sets and functions** tab. 

    Screenshot that shows OData entity sets and functions.

## Update the OData schema

You can access an editor in the portal to view your API's OData schema. If the API changes, you can also update the schema in API Management from a file or an OData service endpoint.

1. In the sidebar menu, **APIs** > **APIs**, and then select your OData API.

1. On the **Entity sets and functions** tab, select the ellipsis (**...**) next to an entity set or function, and then select **Edit**.

    Screenshot that shows the location of the Edit command.

1. Review the schema. If you want to update it, select **Update from file** or **Update schema from endpoint**.

    Screenshot of the schema editor for an OData API.

## Test your OData API

1. In the sidebar menu, **APIs** > **APIs**, and then select your OData API.

1. On the **Entity sets and functions** tab, select the ellipsis (**...**) next to an entity set or function, and then select **Test**.

    Screenshot that shows the Test command.

1. In the test console, enter template parameters, query parameters, and headers for your test, and then select **Test**. For more information about testing APIs in the portal, see [Test the new API in the portal](import-api-from-oas.md#test-the-new-api-in-the-portal).

## Secure your OData API

Secure your OData API by applying existing [authentication and authorization policies](api-management-policies.md#authentication-and-authorization) and an [OData validation policy](validate-odata-request-policy.md) to protect against attacks through OData API requests.

> **Tip:**
> In the portal, configure policies for your OData API on the **API policies** tab.


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
