---
title: Import SOAP API to Azure API Management | Microsoft Docs
description: Learn how to import a SOAP API to Azure API Management as a WSDL specification using the Azure portal, Azure CLI, or Azure PowerShell. Then, test the API.
ms.service: azure-api-management
ms.custom: devx-track-azurepowershell, devx-track-azurecli
ms.topic: how-to
ms.date: 02/02/2026
#customer intent: As an API developer, I want to import the WSDL specification for an API by using the best tool for my workflow.
---
# Import SOAP API to API Management

**APPLIES TO: All API Management tiers**



This article shows how to import a WSDL specification, which is a standard XML representation of a SOAP API. The article also shows how to test the API in API Management.

In this article, you learn how to:

> 
> - Import a SOAP API
> - Test the API in the Azure portal


> **Note:**
> WSDL import to API Management is subject to certain [limitations](api-management-api-import-restrictions.md#-wsdl). WSDL files with `wsdl:import`, `xsd:import`, and `xsd:include` directives aren't supported. For an open-source tool to resolve and merge these dependencies in a WSDL file, see this [GitHub repo](https://github.com/Azure-Samples/api-management-schema-import).

## Prerequisites

- An API Management instance. If you don't already have one, complete the following quickstart: [Create an Azure API Management instance](get-started-create-service-instance.md).
- Azure CLI
    [Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/import-soap-api.md)
- Azure PowerShell
    [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-powershell-requirements-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/import-soap-api.md)
 
## <a name="create-api"> </a>Import a backend API

#### [Portal](#tab/portal)

1. In the [Azure portal](https://portal.azure.com), navigate to your API Management instance.
1. In the left menu, select **APIs** > **+ Add API**.
1. Under **Create from definition**, select **WSDL**.

   Screenshot shows the WSDL tile for importing your SOAP API.

1. In **WSDL specification**, enter the URL to your SOAP API, or choose **Select a file** to select a local WSDL file.
1. In **Import method**, **SOAP pass-through** is selected by default. 

   With this selection, the API is exposed as SOAP, and API consumers have to use SOAP rules. If you want to "restify" the API, follow the steps in [Import a SOAP API and convert it to REST](restify-soap-api.md).

   Screenshot shows the Create from WSDL page.

1. The following API settings are filled automatically based on information from the SOAP API: **Display name**, **Name**, **Description**. Operations are filled automatically with **Display name**, **URL**, and **Description**, and receive a system-generated **Name**.
1. Enter other API settings. You can set the values during creation or configure them later by going to the **Settings** tab. 

   For more information about API settings, see [Import and publish your first API](import-and-publish.md#import-and-publish-a-backend-api) tutorial.

1. Select **Create**.

#### [Azure CLI](#tab/cli)

The following example uses the [az apim api import](https://learn.microsoft.com/cli/azure/apim/api#az-apim-api-import) command to import a WSDL specification from the specified URL to an API Management instance named *apim-hello-world*. To import using a path to a specification instead of a URL, use the `--specification-path` parameter.

For this example WSDL, the service name is *OrdersAPI*, and one of the available endpoints (interfaces) is *basic*.

```azurecli-interactive
# API Management service-specific details
APIMServiceName="apim-hello-world"
ResourceGroupName="myResourceGroup"

# API-specific details
APIId="order-api"
APIPath="order"
SpecificationFormat="Wsdl"
SpecificationURL="https://fazioapisoap.azurewebsites.net/FazioService.svc?singleWsdl"
WsdlServiceName="OrdersAPI"
WsdlEndpointName="basic"

# Import API
az apim api import --path $APIPath --resource-group $ResourceGroupName \
    --service-name $APIMServiceName --api-id $APIId \
    --specification-format $SpecificationFormat --specification-url $SpecificationURL \
    --wsdl-service-name $WsdlServiceName --wsdl-endpoint-name $WsdlEndpointName
```

#### [PowerShell](#tab/powershell)

The following example uses the [Import-AzApiManagementApi](https://learn.microsoft.com/powershell/module/az.apimanagement/import-azapimanagementapi?) Azure PowerShell cmdlet to import a WSDL specification from the specified URL to an API Management instance named *apim-hello-world*. To import using a path to a specification instead of a URL, use the `-SpecificationPath` parameter.

For this example WSDL, the service name is *OrdersAPI*, and one of the available endpoints (interfaces) is *basic*.

```powershell-interactive
# API Management service-specific details
$apimServiceName = "apim-hello-world"
$resourceGroupName = "myResourceGroup"

# API-specific det
$apiId = "orders-api"
$apiPath = "orders"
$specificationFormat = "Wsdl"
$specificationUrl = "https://fazioapisoap.azurewebsites.net/FazioService.svc?singleWsdl"
$wsdlServiceName = "OrdersAPI"
$wsdlEndpointName = "basic"

# Get context of the API Management instance. 
$context = New-AzApiManagementContext -ResourceGroupName $resourceGroupName -ServiceName $apimServiceName

# Import API
Import-AzApiManagementApi -Context $context -ApiId $apiId -SpecificationFormat $specificationFormat -SpecificationUrl $specificationUrl -Path $apiPath -WsdlServiceName $wsdlServiceName -WsdlEndpointName $wsdlEndpointName
```

---

## Test the new API in the portal

You can call operations directly from the Azure portal, which provides a convenient way to view and test the operations of an API.  

1. Select the API you created in the previous step.
1. Select the **Test** tab.
1. Select an operation.

   The page displays fields for query parameters and fields for the headers.

   > **Note:**
   >
   > In the test console, API Management automatically populates an **Ocp-Apim-Subscription-Key** header, and configures the subscription key of the built-in [all-access subscription](api-management-subscriptions.md#all-access-subscription). This key enables access to every API in the API Management instance. Optionally display the **Ocp-Apim-Subscription-Key** header by selecting the "eye" icon next to the **HTTP Request**.

1. Depending on the operation, enter query parameter values, header values, or a request body. Select **Send**.

   When the test is successful, the backend responds with a successful HTTP response code and some data.

   > **Tip:**
   >
   > By default, the test console sends a request to API Management's CORS proxy, which forwards the request to the API Management instance, which then forwards it to the backend. This proxy uses public IP address 13.91.254.72 and can only reach public endpoints.
   >
   > If you want to send a request directly from the browser to the API Management service, select **Bypass CORS proxy**. Use this option when you want to use the test console and your API Management gateway is network-isolated or doesn't allow traffic from the CORS proxy.

To debug an API, see [Tutorial: Debug your APIs using request tracing](api-management-howto-api-inspector.md).

## Wildcard SOAP action

If you need to pass a SOAP request that doesn't have a dedicated action defined in the API, you can configure a wildcard SOAP action. The wildcard action matches any SOAP request that isn't defined in the API.  

To define a wildcard SOAP action:

1. In the Azure portal, select the API you created in the previous step.
1. In the **Design** tab, select **+ Add Operation**.
1. Enter a **Display name** for the operation.
1. In the URL, select `POST` and enter `/?soapAction={any}` in the resource. The template parameter inside the braces is arbitrary and doesn't affect the execution.

> **Note:**
> Don't use the **OpenAPI specification** editor in the **Design** tab to modify a SOAP API.

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
