---
title: Import SAP OData Metadata as an API
titleSuffix:
description: Learn how to import OData metadata from SAP as an API to Azure API Management, either directly or by converting the metadata to an OpenAPI specification.
ms.service: azure-api-management
ms.custom:
  - build-2024
ms.topic: how-to
ms.date: 03/16/2026

#customer intent: As an API developer, I want to import an SAP API to API Management.
---

# Import SAP OData metadata as an API

**APPLIES TO: All API Management tiers**



This article describes how to import an OData (Open Data Protocol) service into Azure API Management by using OData metadata. The following example uses [SAP Gateway Foundation](https://help.sap.com/docs/SAP_GATEWAY).

In this article, you learn how to: 
> 
> * Retrieve OData metadata from your SAP service
> * Import OData metadata to Azure API Management, either directly or after converting it to an OpenAPI specification
> * Complete API configuration
> * Test the API in the Azure portal

## Prerequisites

- Create an [API Management instance](get-started-create-service-instance.md).
- An SAP system and service that's exposed as OData v2 or v4. 
- If your SAP backend uses a self-signed certificate (for testing), you might need to disable the verification of the trust chain for SSL. To do so, configure a [backend](backends.md) in your API Management instance:
    1. In the Azure portal, under **APIs**, select **Backends** > **+ Create new backend**.
    1. Add a **Custom URL** that points to the SAP backend service.
    1. Expand the **Advanced** section, then clear the **Validate certificate chain** and **Validate certificate name** checkboxes. 

    > **Note:**
    > In production scenarios, use proper certificates for end-to-end SSL verification.

    > **Tip:**
    > For the full feature scope of API Management, convert the SAP OData API to OpenAPI specification before registering.

## Retrieve OData metadata from your SAP service

Use one of the following methods to retrieve metadata XML from your SAP service. If you plan to convert the metadata XML to an OpenAPI specification, save the file locally. 

* Use the SAP Gateway Client (transaction `/IWFND/GW_CLIENT`).
* Make a direct HTTP call to retrieve the XML: `http://<OData server URL>:<port>/<path>/$metadata`.
* Use the [SAP Business Accelerator Hub](https://api.sap.com/) if applicable.

## Go to your API Management instance

1. In the [Azure portal](https://portal.azure.com), search for and select **API Management services**:

    Screenshot that shows API Management services in the search results.

1. On the **API Management services** page, select your API Management instance:

    Screenshot that shows an API Management instance on the API Management services page.

## Import an API to API Management

Choose one of the following methods to import your API to API Management: 
- Convert the metadata XML to an OpenAPI specification (**recommended**).
- Import the metadata XML as an OData API directly.

#### [OpenAPI specification (recommended)](#tab/openapi)

## Convert OData metadata to OpenAPI JSON

1. Use the [Microsoft converter](https://github.com/Azure-Samples/odata-openapi-converter/) built on-top of the OASIS open-source tool. 

   The following example converts OData v2 XML for the test service `epm_ref_apps_prod_man_srv`:

   ```console
   oasis-converter convert epm_ref_apps_prod_man_srv.xml api.json
   ```

    > **Note:**
    > For testing with a single XML file, you can use the [web-based experience](https://aka.ms/ODataOpenAPI).

1. Save the *openapi-spec.json* file locally for import to API Management.

## Import OpenAPI specification

1. In the sidebar menu, in the **APIs** section, select **APIs**.

1. Under **Create from definition**, select the **OpenAPI** tile:

    Screenshot that shows the OpenAPI tile.

1. Choose **Select a file**, and then select the *openapi-spec.json* file that you saved locally in a previous step.

1. Enter API settings. You can set these values when you import the API or configure them later by going to the **Settings** tab. 
    * For the **API URL suffix**, we recommend using the same URL path as that of the original SAP service.

    * For more information about API settings, see [Import and publish your first API](import-and-publish.md#import-and-publish-a-backend-api) tutorial.

1. Select **Create**.

You also need to configure authentication to your backend by using an appropriate method for your environment. For examples, see [Authentication and authorization](api-management-policies.md#authentication-and-authorization).

> **Note:**
> For information about API import limitations, see [API import restrictions and known issues](api-management-api-import-restrictions.md).

## Test your API

1. Navigate to your API Management instance.

1. In the sidebar menu, select **APIs** > **APIs**.

1. Under **All APIs**, select your imported API.

1. Select the **Test** tab to access the test console. 

1. Select an operation, enter any required values, and then select **Send**. 

    For example, test the `GET /$metadata` call to verify connectivity to the SAP backend.

1. View the response. To troubleshoot, [trace](api-management-howto-api-inspector.md) the call.

1. When you're done testing, exit the test console.

#### [OData metadata](#tab/odata)

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


---

## Production considerations

* Use [Defender for APIs](protect-with-defender-for-apis.md) for full lifecycle protection, detection, and response coverage for APIs.
* See an [example end-to-end scenario](https://community.powerplatform.com/blogs/post/?postid=c6a609ab-3556-ef11-a317-6045bda95bf0) for integrating API Management with an SAP gateway.
* Control access to an SAP backend by using API Management policies. For example, if the API is imported as an OData API, use the [validate OData request](validate-odata-request-policy.md) policy. There are also policy snippets for [SAP principal propagation for SAP ECC or S/4HANA](https://github.com/Azure/api-management-policy-snippets/blob/master/examples/Request%20OAuth2%20access%20token%20from%20SAP%20using%20AAD%20JWT%20token.xml) or [SAP SuccessFactors](https://github.com/Azure/api-management-policy-snippets/blob/master/examples/Request%20OAuth2%20access%20token%20from%20SuccessFactors%20using%20AAD%20JWT%20token.xml) and [fetching an X-CSRF token](https://github.com/Azure/api-management-policy-snippets/blob/master/examples/Get%20X-CSRF%20token%20from%20SAP%20gateway%20using%20send%20request.policy.xml).
* For guidance on deploying, managing, and migrating APIs at scale, see:
    * [Automated API deployments with APIOps](https://learn.microsoft.com/azure/architecture/example-scenario/devops/automated-api-deployments-apiops)
    * [Use DevOps and CI/CD to publish APIs](devops-api-development-templates.md)

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
