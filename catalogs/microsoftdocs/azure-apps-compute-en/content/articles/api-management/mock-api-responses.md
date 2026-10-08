---
title: "Tutorial: Mock API Responses in API Management"
description: Use Azure API Management to set a policy on an API to return a mock response even if the backend isn't available to send real responses.

ms.service: azure-api-management
ms.topic: tutorial
ms.date: 03/12/2026
ms.custom:
  - mvc
  - devx-track-azurecli
  - devdivchpfy22
  - sfi-image-nochange


#customer intent: As a developer, I want to set a policy on an API so that a mock response is returned.
---

# Tutorial: Mock API responses

**APPLIES TO: All API Management tiers**



Backend APIs can be imported into an Azure API Management API or created and managed manually. The steps in this tutorial describe how to:

+ Use API Management to create a blank HTTP API.
+ Manually manage an HTTP API.
+ Set a policy on an API so that it returns a mock response.

This method allows developers to continue with the implementation and testing of the API Management instance even if the backend isn't available to send real responses.

> **Tip:**
> API teams can use this feature in [workspaces](workspaces-overview.md). Workspaces provide isolated administrative access to APIs and their own API runtime environments.

The ability to create mock responses is useful in many scenarios:

+ When the API gateway is designed first and the backend implementation occurs later, or when the backend is being developed in parallel.
+ When the backend is temporarily not operational or isn't able to scale.

In this tutorial, you learn how to:

> 
> * Create a test API
> * Add an operation to the test API
> * Enable response mocking
> * Test the mocked API

Screenshot that shows the APIs page in the Azure portal.

## Prerequisites

+ Learn [API Management terminology](api-management-terminology.md).
+ Understand the [concept of policies in API Management](api-management-howto-policies.md).
+ Complete the quickstart [Create an Azure API Management instance](get-started-create-service-instance.md).

## Create a test API

The steps in this section show how to create an HTTP API with no backend.

1. Sign in to the [Azure portal](https://portal.azure.com/), and then navigate to your API Management instance.

1. In the sidebar menu, select **APIs** > **APIs**, and then select **+ Add API**. Choose the **HTTP** tile:

   Screenshot that shows the first steps for defining an API.

1. In the **Create an HTTP API** window, select **Full**.

1. In **Display name**, enter *Test API*. The **Name** field fills automatically.

1. In **Products**, select *Unlimited*, if that value is available. This value is available only in some tiers. You can leave the value blank for this tutorial, but you need to associate the API with a product to publish it. For more information, see [Import and publish your first API](import-and-publish.md#import-and-publish-a-backend-api). 

1. In **Gateways**, select **Managed** if this option is available. (This option is available only in certain service tiers.)

1. Select **Create**.

    Screenshot that shows the Create an HTTP API window.

## Add an operation to the test API

An API exposes one or more operations. In this section, you add an operation to the HTTP API you created. Calling the operation after completing the steps in this section triggers an error. After you complete the steps in the [Enable response mocking](#enable-response-mocking) section, you won't get an error.

### [Portal](#tab/azure-portal)

1. Select the API that you created in the previous step.

1. Select **+ Add Operation**.

1. In the **Frontend** window, enter the following values:

    | Setting | Value | Description |
    | --- | --- | --- |
    | **Display name** | *Test call* | The name displayed in the [developer portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/api-management-howto-developer-portal.md). |
    | **Name** | *test-call* | This field fills automatically. |
    | **URL** (first box) | GET | Select one of the predefined HTTP verbs. |
    | **URL**  (second box) | */test* | A URL path for the API. |
    | **Description** |  | An optional description of the operation. It provides documentation in the developer portal to the developers who use the API. |

    Screenshot that shows the Frontend window.

1. Select the **Responses** tab, which  is located under the **URL**, **Display name**, and **Description** boxes. Enter values on this tab to define response status codes, content types, examples, and schemas.

1. Select **+ Add response**, and then select **200 OK** from the list.

    Screenshot that shows the Responses tab.

1. In the **Representations** section, select **+ Add representation**.

1. Enter *application/json* into the search box and then select the **application/json** content type.

1. In the **Sample** box, enter  `{ "sampleField" : "test" }`.

1. Select **Save**.

    Screenshot that shows the Representations section.

Although it's not required for this example, you can configure more settings for an API operation on other tabs, as described in the following table:

| Tab | Description |
| --- | --- |
| **Query** | Add query parameters. Besides providing a name and description, you can also provide values that are assigned to a query parameter. You can mark one of the values as default (optional). |
| **Request** | Define request content types, examples, and schemas. |

### [Azure CLI](#tab/azure-cli)

To begin using Azure CLI:

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/mock-api-responses.md)

To add an operation to your test API, run the [az apim api operation create](https://learn.microsoft.com/cli/azure/apim/api/operation#az-apim-api-operation-create) command:

```azurecli
az apim api operation create --resource-group <resource-group> \
    --display-name "Test call" --api-id test-api --method GET \
    --url-template /test --service-name <API-management-service-name> 
```

Run the [az apim api operation list](https://learn.microsoft.com/cli/azure/apim/api/operation#az-apim-api-operation-list) command to see all your operations for an API:

```azurecli
az apim api operation list --resource-group <resource-group-name> \
    --api-id test-api --service-name <API-management-service-name> --output table
```

Keep this operation for use in the rest of this article. If you want to remove an operation, you can use the [az apim api operation delete](https://learn.microsoft.com/cli/azure/apim/api/operation#az-apim-api-operation-delete) command. Get the operation ID from the previous command.

```azurecli
az apim api operation delete --resource-group <resource-group-name> \
    --api-id test-api --operation-id <ID> \
    --service-name <API-management-service-name>
```

---

## Enable response mocking

1. Select the API you created in [Create a test API](#create-a-test-api).

1. Ensure that the **Design** tab is selected.

1. Select the **Test call** operation that you added.

1. In the **Inbound processing** section, select **+ Add policy**.

    Screenshot that shows the first steps for enabling response mocking.

1. Select the **Mock responses** tile from the gallery:

    Screenshot that shows the Mock responses tile.

1. Ensure that **200 OK, application/json** appears in the **API Management response** box. This selection indicates that your API should return the response sample that you defined in the previous section.

    Screenshot that shows the API Management response selection.

1. Select **Save**.

    > **Tip:**
    > A yellow bar displaying the text **Mocking is enabled** appears. This message indicates that the responses returned from API Management are issued by the [mocking policy](mock-response-policy.md) and aren't produced by the backend.

## Test the mocked API

1. Select the API you created in [Create a test API](#create-a-test-api).

1. On the **Test** tab, ensure that the **Test call** API is selected, and then select **Send** to make a test call:

   Screenshot that shows the steps for testing the mocked API.

1. The **HTTP response** displays the JSON provided as a sample in the first section of the tutorial:

    Screenshot that shows the mock HTTP response.

## Next step

> 
> [Transform and protect a published API](transform-api.md)
