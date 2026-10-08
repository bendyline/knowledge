---
title: Import a SOAP API into API Management and Convert it to REST
description: Learn how to import a SOAP API into Azure API Management as a WSDL specification and convert it to a REST API.
services: api-management
ms.custom: devdivchpfy22
ms.service: azure-api-management
ms.topic: how-to
ms.date: 03/13/2026

#customer intent: As a developer, I want to import a SOAP API into API Management and convert it to REST.

---
# Import a SOAP API into Azure API Management and convert it to REST

**APPLIES TO: All API Management tiers**



This article shows how to import a SOAP API as a WSDL specification and then convert it to a REST API. It also shows how to test the API in Azure API Management.

In this article, you learn how to:

> 
> * Import a SOAP API and convert it to REST
> * Test the API in the Azure portal


> **Note:**
> WSDL import to API Management is subject to certain [limitations](api-management-api-import-restrictions.md#-wsdl). WSDL files with `wsdl:import`, `xsd:import`, and `xsd:include` directives aren't supported. For an open-source tool to resolve and merge these dependencies in a WSDL file, see this [GitHub repo](https://github.com/Azure-Samples/api-management-schema-import).

## Prerequisites

- Create an [Azure API Management instance](get-started-create-service-instance.md).

## Go to your API Management instance

1. In the [Azure portal](https://portal.azure.com), search for and select **API Management services**:

    Screenshot that shows API Management services in the search results.

1. On the **API Management services** page, select your API Management instance:

    Screenshot that shows an API Management instance on the API Management services page.

## <a name="create-api"> </a>Import and publish a backend API

1. In the sidebar menu, in the **APIs** section, select **APIs**.

1. On the APIs page, select **+ Add API**.

1. Under **Create from definition**, select the **WSDL** tile:

    Screenshot that shows the WSDL tile in the Azure portal.

1. In **WSDL specification**, enter the URL to your SOAP API, or choose **Select a file** to select a local WSDL file.

1. Under **Import method**, select **SOAP to REST**.

    When this option is selected, API Management attempts to make an automatic transformation between XML and JSON. In this case, consumers should call the API as a RESTful API, which returns JSON. API Management converts each request to a SOAP call.

    Screenshot that shows the SOAP to REST option.

1. The **Display name** and **Name** boxes are filled automatically with information from the SOAP API. 

1. Enter other API settings, and then select **Create**. You can also configure these values later by going to the **Settings** tab. 

    For more information about API settings, see [Import and publish a backend API](import-and-publish.md#import-and-publish-a-backend-api).

## Test the new API in the Azure portal

You can call operations directly from the Azure portal. This method provides a convenient way to view and test the operations of an API.  

1. Select the API you created in the previous step.

1. Select the **Test** tab.

1. Select an operation.

    The page shows fields for query parameters and fields for the headers. One of the headers is **Ocp-Apim-Subscription-Key**. This header is for the subscription key of the product that's associated with this API. If you created the API Management instance, you're an admin already, so the key is filled in automatically. 

1. Select **Send**.

    When the test is successful, the backend responds with **200 OK** and some data.

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
