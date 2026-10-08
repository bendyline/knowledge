---
title: Manually Add an API in Azure API Management
description: Learn how to use Azure API Management in the Azure portal to manually add an API, then add and test operations. Create a blank API for mock responses.
services: api-management

ms.service: azure-api-management
ms.topic: how-to
ms.date: 09/11/2026
ms.custom: fasttrack-edit, devdivchpfy22


#customer intent: As an API developer, I want to use API Management to manually add an API. 
---

# Manually add an API

**APPLIES TO: All API Management tiers**



This article shows how to manually add an API to Azure API Management. When you want to create mock responses from the API, create a blank API. For information about creating mock API responses, see [Mock API responses](mock-api-responses.md).

If you want to import an existing API, see the [Related content](#related-content) section of this article.

In this article, you learn how to create a blank API. You specify [httpbin.org](https://httpbin.org) (a public testing service) as a backend API.

## Prerequisites

- Complete the [Create an Azure API Management instance](get-started-create-service-instance.md) quickstart.

## Go to your API Management instance

1. In the [Azure portal](https://portal.azure.com), search for and select **API Management services**:

    Screenshot that shows API Management services in the search results.

1. On the **API Management services** page, select your API Management instance:

    Screenshot that shows an API Management instance on the API Management services page.

## Create an API

1. Under **APIs** in the left menu, select **APIs**.
1. Select **+ Add API**.
1. Select the **HTTP** tile:

    Screenshot that shows the HTTP tile in the Azure portal.
      
1. Enter the backend **Web service URL** (for example, `https://httpbin.org`) and other settings for the API. The [Import and publish your first API](import-and-publish.md#import-and-publish-a-backend-api) tutorial explains the settings.
1. Select **Create**.

At this point, you have no operations in API Management that map to the operations in your backend API. If you call an operation that's exposed through the backend but not through API Management, you get a 404 error.

> **Note:**
> By default, when you add an API, even if it's connected to a backend service, API Management doesn't expose any operations until you allow them. To allow an operation of your backend service, create an API Management operation that maps to the backend operation.

## Add and test an operation

This section shows how to add a `/get` operation to map it to the backend `http://httpbin.org/get` operation.

### Add an operation

1. Select the API you created in the previous step.
1. Select **+ Add operation**.
1. In **URL**, select **GET** and enter **/get** in the text box.
1. In **Display name**, enter **FetchData**.
1. Select **Save**.

### Test the operation

Test the operation in the Azure portal. (You can also test it in the developer portal.)

1. Select the **Test** tab.
1. Select **FetchData**.
1. Select **Send**.

The response that the `http://httpbin.org/get` operation generates appears in the **HTTP response** section. To transform your operations, see [Transform and protect your API](transform-api.md).

## Add and test a parameterized operation

This section shows how to add an operation that takes a parameter. In this example, you map the operation to `http://httpbin.org/status/200`.

### Add an operation

1. Select the API that you created earlier.
1. On the **Design** tab, select **+ Add operation**.
1. In **URL**, select **GET** and enter **/status/{code}** in the text box. 
1. In **Display name**, enter **GetStatus**.
1. Select **Save**.

### Test the operation

Test the operation in the Azure portal. (You can also test it in the developer portal.)

1. Select the **Test** tab.
1. Select **GetStatus**. In **code**, enter **200**. 
1. Select **Send**.

    The response that the `http://httpbin.org/status/200` operation generates appears in the **HTTP response** section. To transform your operations, see [Transform and protect your API](transform-api.md).

## Add and test a wildcard operation

This section shows how to add a wildcard operation. With a wildcard operation, you can pass an arbitrary value with an API request. Instead of creating separate GET operations as shown in the previous sections, you could create a wildcard GET operation.

> **Caution:**
> Be cautious when you configure a wildcard operation. This configuration might make an API more vulnerable to certain [API security threats](mitigate-owasp-api-threats.md#improper-inventory-management).

### Add an operation

1. Select the API you created earlier.
1. On the **Design** tab, select **+ Add operation**.
1. In **URL**, select **GET** and enter **/*** in the text box.
1. In **Display name**, enter **WildcardGet**.
1. Select **Save**.

### Test the operation

Test the operation in the Azure portal. (You can also test it in the developer portal.)

1. Select the **Test** tab.
1. Select **WildcardGet**. Try the GET operations that you tested in previous sections, or try a different supported GET operation.

    For example, in **Template parameters**, change the value next to the wildcard (*) name to **headers**. The operation returns the incoming request's HTTP headers.
1. Select **Send**.

    The response that the `http://httpbin.org/headers` operation generates appears in the **HTTP response** section. If you want to transform your operations, see [Transform and protect your API](transform-api.md).
  
> **Note:**
> It can be important to understand how the host for the backend API you're integrating with handles trailing slashes on an operation URL. For more information, see this [API Management FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/api-management-faq.yml#how-does-api-management-handle-trailing-slashes-when-calling-backend-services-).

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
