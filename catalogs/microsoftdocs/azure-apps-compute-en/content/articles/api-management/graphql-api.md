---
title: Add a GraphQL API to Azure API Management | Microsoft Docs
description: Learn how to add an existing GraphQL service as an API in Azure API Management. Manage the API and enable queries to pass through to the GraphQL endpoint.
ms.service: azure-api-management
ms.topic: how-to
ms.date: 10/07/2025
ms.custom:
  - devx-track-azurepowershell
  - devx-track-azurecli
  - sfi-image-nochange

# Customer intent: As an API admin, I want to add a GraphQL API to Azure API Management by passing through to an existing GraphQL endpoint.
---

# Import a GraphQL API

**APPLIES TO: All API Management tiers**




In API Management, you can add a GraphQL API in one of two models: pass-through to an existing GraphQL endpoint, or import a GraphQL schema and create a synthetic GraphQL API with custom field resolvers. For more information, see the [GraphQL overview](graphql-apis-overview.md).

In this article, you'll:
> 
> * Add a pass-through GraphQL API to your API Management instance.
> * Test your GraphQL API.

If you want to import a GraphQL schema and set up field resolvers that use REST or SOAP API endpoints, see [Import a GraphQL schema and set up field resolvers](graphql-schema-resolve-api.md).

## Prerequisites

- An Azure API Management instance. [Create one if you haven't already](get-started-create-service-instance.md).
- Azure CLI, if you want to use it to import the API.
    [Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/graphql-api.md)


- Azure PowerShell, if you want to use it to import the API.
    [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-powershell-requirements-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/graphql-api.md)

## Add a GraphQL API

#### [Portal](#tab/portal)

1. In the [Azure portal](https://portal.azure.com), go to your API Management instance.
1. In the left pane, select **APIs** > **APIs**.
1. Select **Add API**.
1. Under **Define a new API**, select the **GraphQL** tile.

    Screenshot of selecting the GraphQL tile.

1. In the resulting dialog box, select **Full**, and then enter values in the required fields, as described in the following table.

    Screenshot of the Create from GraphQL schema page.

    | Value | Description |
    | --- | --- |
    | **Display name** | The name by which your GraphQL API will be displayed. |
    | **Name** | The raw name of the GraphQL API. Automatically populates as you type the display name. |
    | **GraphQL type** | Select **Pass-through GraphQL** to import from an existing GraphQL API endpoint. |
    | **GraphQL API endpoint** | The base URL with your GraphQL API endpoint name. <br /> For example: *`https://example.com/your-GraphQL-name`*. You can also use a common SWAPI GraphQL endpoint like `https://swapi-graphql.azure-api.net/graphql` for the purpose of demonstration. |
    | **Upload schema** | Optionally select to upload your schema file to replace the schema that's retrieved from the GraphQL endpoint (if you have one). |
    | **Description** | Add a description of your API. |
    | **URL scheme** | Select a scheme based on your GraphQL endpoint. Select one of the options that includes a WebSocket scheme (**WS** or **WSS**) if your GraphQL API includes the subscription type. The default selection is **HTTP(S)**. |
    | **API URL suffix** | Add a URL suffix to identify the specific API in the API Management instance. It has to be unique in the API Management instance. |
    | **Base URL** | Uneditable field displaying your API base URL. |
    | **Tags** | Optionally associate your GraphQL API with new or existing tags. |
    | **Products** | Associate your GraphQL API with a product to publish it. |
    | **Version this API?** | Select the checkbox to apply a versioning scheme to your GraphQL API. |

1. Select **Create**.
1. After the API is created, review or modify the schema on the **Schema** tab.
       Screenshot of the GraphQL schema in the portal.

#### [Azure CLI](#tab/cli)

The following example uses the [az apim api import](https://learn.microsoft.com/cli/azure/apim/api#az-apim-api-import) command to import a GraphQL passthrough API from the specified URL to an API Management instance named *apim-hello-world*. 

```azurecli
# Details specific to API Management instance.
APIMServiceName="apim-hello-world"
ResourceGroupName="myResourceGroup"

# API-specific details.
APIId="my-graphql-api"
APIPath="myapi"
DisplayName="MyGraphQLAPI"
SpecificationFormat="GraphQL"
SpecificationURL="<GraphQL backend endpoint>"

# Import API.
az apim api import \
    --path $APIPath \
    --resource-group $ResourceGroupName \
    --service-name $APIMServiceName --api-id $APIId \
    --display-name $DisplayName --specification-format $SpecificationFormat \
    --specification-url $SpecificationURL
```

After importing the API, you can update the settings by using the [az apim api update](https://learn.microsoft.com/cli/azure/apim/api#az-apim-api-update) command, if you need to.


#### [PowerShell](#tab/powershell)

The following example uses the [Import-AzApiManagementApi](https://learn.microsoft.com/powershell/module/az.apimanagement/import-azapimanagementapi?) Azure PowerShell cmdlet to import a GraphQL passthrough API from the specified URL to an API Management instance named *apim-hello-world*. 

```azurepowershell
# Details specific to API Management instance.
$apimServiceName = "apim-hello-world"
$resourceGroupName = "myResourceGroup"

# API-specific details.
$apiId = "my-graphql-api"
$apiPath = "myapi"
$specificationFormat = "GraphQL"
$specificationUrl = "<GraphQL backend endpoint>"

# Get context of the API Management instance. 
$context = New-AzApiManagementContext -ResourceGroupName $resourceGroupName -ServiceName $apimServiceName

# Import API.
Import-AzApiManagementApi -Context $context -ApiId $apiId -SpecificationFormat $specificationFormat -SpecificationUrl $specificationUrl -Path $apiPath
```

After importing the API, you can update the settings by using the [Set-AzApiManagementApi](https://learn.microsoft.com/powershell/module/az.apimanagement/set-azapimanagementapi) cmdlet, if you need to.

---


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

### Test a subscription

If your GraphQL API supports a subscription, you can test it in the test console.

1. Ensure that your API allows a WebSocket URL scheme (**WS** or **WSS**) that's appropriate for your API. You can enable this setting on the **Settings** tab.
1. Set up a subscription query in the query editor, and then select **Connect** to establish a WebSocket connection to the backend service. 

    Screenshot of a subscription query in the query editor.

1. Review connection details in the **Subscription** pane. 

    Screenshot of WebSocket connection in the portal.
    
1. Subscribed events appear in the **Subscription** pane. The WebSocket connection is maintained until you disconnect it or connect to a new WebSocket subscription.  

    Screenshot of GraphQL subscription events in the portal.

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
