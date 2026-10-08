---
title: Add a Synthetic GraphQL API to Azure API Management | Microsoft Docs
description: Add a synthetic GraphQL API by importing a GraphQL schema to API Management and configuring field resolvers that use HTTP-based data sources.
ms.service: azure-api-management
ms.topic: how-to
ms.date: 10/08/2025
# Customer intent: As an API admin, I want to add a synthetic GraphQL API to API Management so that I can expose it as an API. 
---

# Add a synthetic GraphQL API and set up field resolvers
 
**APPLIES TO: All API Management tiers**




In API Management, you can add a GraphQL API in one of two models: pass-through to an existing GraphQL endpoint, or import a GraphQL schema and create a synthetic GraphQL API with custom field resolvers. For more information, see the [GraphQL overview](graphql-apis-overview.md).

> **Note:**
> Currently, this feature isn't available in [workspaces](workspaces-overview.md).

In this article, you'll:
> 
> * Import a GraphQL schema to your Azure API Management instance.
> * Set up a resolver for a GraphQL query using an existing HTTP endpoint.
> * Test your GraphQL API.

If you want to expose an existing GraphQL endpoint as an API, see [Import a GraphQL API](graphql-api.md).

## Prerequisites

- An existing API Management instance. [Create one if you haven't already](get-started-create-service-instance.md).
- A valid GraphQL schema file with the `.graphql` extension. 
- A backend GraphQL endpoint is optional for this scenario.


## Go to your API Management instance

1. In the [Azure portal](https://portal.azure.com), search for and select **API Management services**:

    Screenshot that shows API Management services in the search results.

1. On the **API Management services** page, select your API Management instance:

    Screenshot that shows an API Management instance on the API Management services page.

## Add a GraphQL schema

1. In the left pane, under **APIs**, select **APIs**.
1. Under **Define a new API**, select the **GraphQL** tile.

    Screenshot of selecting the GraphQL tile.

1. In the dialog box, select **Full**, and then enter values in the required fields, as described in the following table.

    Screenshot of the Create from GraphQL schema page.

     | Value | Description |
    | --- | --- |
    | **Display name** | The name by which your GraphQL API will be displayed. |
    | **Name** | The raw name of the GraphQL API. Automatically populates as you type the display name. |
    | **GraphQL type** | Select **Synthetic GraphQL** to import from a GraphQL schema file. |
    | **Fallback GraphQL endpoint** | Optionally enter a URL with a GraphQL API endpoint name. API Management passes GraphQL queries to this endpoint when a custom resolver isn't set for a field. |
    | **Description** | Add a description of your API. |
    | **URL scheme** | Select a scheme based on your GraphQL endpoint. Select one of the options that includes a WebSocket scheme (**WS** or **WSS**) if your GraphQL API includes the subscription type. The default selection is **HTTP(S)**. |
    | **API URL suffix** | Add a URL suffix to identify the specific API in the API Management instance. Must be unique in the API Management instance. |
    | **Base URL** | Uneditable field displaying your API base URL. |
    | **Tags** | Optionally associate your GraphQL API with new or existing tags. |
    | **Products** | Associate your GraphQL API with a product to publish it. |
    | **Version this API?** | Select the checkbox to apply a versioning scheme to your GraphQL API. |

 
1. Select **Create**.

1. After the API is created, review or modify the schema on the **Schema** tab.

## Configure a resolver

Configure a resolver to map a field in the schema to an existing HTTP endpoint. High-level steps are provided here. For details, see [Configure a GraphQL resolver](configure-graphql-resolver.md).

Suppose you imported the following basic GraphQL schema and want to set up a resolver for the `users` query.

```
type Query {
    users: [User]
}

type User {
    id: String!
    name: String!
}
```

1. In the left pane, under **APIs**, select **APIs**. 
1. Select your GraphQL API.
1. On the **Schema** tab, review the schema for a field in an object type in which you want to configure a resolver. 
    1. Select a field, and then hover the pointer in the left margin. 
    1. Select **Add resolver**.

        Screenshot of adding a GraphQL resolver in the portal.

1. In the **Create resolver** pane:

    1. Update the **Name** property if you want to, optionally enter a **Description**, and confirm or update the **Type** and **Field** selections.
    1. In **Data source**, select **HTTP API**. 

1. In the **Resolver policy** editor, update the `<http-data-source>` element with child elements for your scenario. For example, the following resolver retrieves the `users` field by making a `GET` call to an existing HTTP data source.

    
    ```xml
        <http-data-source>
            <http-request>
                <set-method>GET</set-method>
                <set-url>https://myapi.contoso.com/users</set-url>
            </http-request>
        </http-data-source>
    ```

    Screenshot of configuring resolver a policy in the portal.

1. Select **Create**. 
1. To resolve data for another field in the schema, repeat the preceding steps to create another resolver. 

> **Tip:**
> As you edit a resolver policy, select **Run Test** to check the output from the data source, which you can validate against the schema. If errors occur, the response includes troubleshooting information. 


## Test your GraphQL API

1. Go to your API Management instance.
1. In the left pane, in the **APIs** section, select **APIs**.
1. Under **All APIs**, select your GraphQL API.
1. Select the **Test** tab to access the test console. 
1. Under **Headers**:
    1. Select the header from the **Name** menu.
    1. Enter the value in the **Value** box.
    1. Add more headers by selecting **Add header**.
    1. Delete headers by using the recycle bin button.
1. If you've added a product to your GraphQL API, add a product scope under **Apply product scope**.
1. In **Query editor**, do one of the following:
    1. Select at least one field or subfield from the list in the menu to the left of the editor. The fields and subfields you select appear in the query editor.
    1. Start typing in the query editor to compose a query.
    
        Screenshot of the query editor.

1. Under **Query variables**, add variables to reuse the same query or mutation and pass different values.
1. Select **Send**.
1. View the **Response**.

    Screenshot of the test query response.

1. Repeat the preceding steps to test different payloads.
1. When you're done testing, exit the test console.

## Secure your GraphQL API

Secure your GraphQL API by applying both existing [authentication and authorization policies](api-management-policies.md#authentication-and-authorization) and a [GraphQL validation policy](validate-graphql-request-policy.md) to protect against GraphQL-specific attacks.


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
