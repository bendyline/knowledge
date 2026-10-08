---
title: Edit an API in the Azure portal  | Microsoft Docs
description: Learn how to use API Management to edit an API or its swagger.
services: api-management
ms.service: azure-api-management
ms.topic: how-to
ms.date: 10/07/2025
ms.custom: sfi-image-nochange
# Customer intent: As an API developer, I want to use API Management to edit an API or its swagger. 
---
# Edit an API

**APPLIES TO: All API Management tiers**



This article describes how to use Azure API Management to edit an API.

+ You can add, rename, or delete operations in the Azure portal.
+ You can edit your API's swagger.

## Prerequisites

+ [Create an Azure API Management instance](get-started-create-service-instance.md)
+ [Import and publish an API](import-and-publish.md)

## Go to your API Management instance

1. In the [Azure portal](https://portal.azure.com), search for and select **API Management services**:

    Screenshot that shows API Management services in the search results.

1. On the **API Management services** page, select your API Management instance:

    Screenshot that shows an API Management instance on the API Management services page.

## Edit an operation

1. Under **APIs**, select **APIs**.
1. Select an API that you have imported.
1. Select the **Design** tab.
1. Select the operation that you want to edit.
1. To rename the operation, select the pencil button in the **Frontend** pane.

Screenshot that shows the process for editing an API in API Management.

## Update the swagger

You can update your API's swagger from the Azure portal by completing these steps:

1. On the **APIs** page, select **All operations**.
1. Select the pencil button in the **Frontend** pane.

    Screenshot that shows the pencil button in the Frontend pane.

    Your API's swagger appears.

    Screenshot that shows an API's swagger.

1. Update the swagger.
1. Select **Save**.

> **Caution:**
> If you're editing a non-current revision of an API, you can't change the following properties:
>
> * Name
> * Type
> * Description
> * Subscription required
> * API version
> * API version description
> * Path
> * Protocols
>
> If your edits change any of these properties in a non-current revision, you'll see the error message 
> `Can't change property for non-current revision`.

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
