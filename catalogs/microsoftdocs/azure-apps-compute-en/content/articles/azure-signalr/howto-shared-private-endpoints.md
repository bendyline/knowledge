---
title: Secure Azure SignalR outbound traffic through shared private endpoints
titleSuffix: Azure SignalR Service
description: How to secure outbound traffic through shared private endpoints to avoid traffic go to public network
services: signalr
author: vicancy
ms.service: azure-signalr-service
ms.custom: devx-track-azurecli
ms.topic: how-to
ms.date: 12/09/2022
ms.author: lianwei
---

# Secure Azure SignalR outbound traffic through shared private endpoints

When you're using [serverless mode](concept-service-mode.md#serverless-mode) in Azure SignalR Service,  you can create outbound [private endpoint connections](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-endpoint-overview.md) to an upstream service. 

Upstream services, such as Azure Web App and Azure Functions, can be configured to accept connections from a list of virtual networks and refuse outside connections that originate from a public network. To reach these endpoints, you can create an outbound private endpoint connection.

   Diagram showing architecture of shared private endpoint.

This outbound method is subject to the following requirements:

+ The upstream service must be Azure Web App or Azure Function.
+ The Azure SignalR service not must be on the free tier.
+ The Azure Web App or Azure Function must be on certain SKUs. See [Use Private Endpoints for Azure Web App](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/networking/private-endpoint.md).

In this article, you'll learn how to create a shared private endpoint with an outbound private endpoint connection to secure outbound traffic to an upstream Azure Function instance.

## Shared Private Link Resources Management

You create private endpoints of secured resources through the SignalR Service APIs. These endpoints, called *shared private link resources*, allow you to share access to a resource, such as an Azure Function integrated with the [Azure Private Link service](https://azure.microsoft.com/services/private-link/). These private endpoints are created inside the SignalR Service execution environment and aren't accessible outside this environment.

## Prerequisites

You'll need the following resources to complete the steps in this article:

- An Azure Resource Group
- An Azure SignalR Service instance (must not be in free tier)
- An Azure Function instance

- > [!NOTE]
> The examples in this article are based on the following assumptions:
> * The resource ID of the SignalR Service is _/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/signalr/contoso-signalr_.
> * The resource ID of upstream Azure Function is _/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.Web/sites/contoso-func_.
> The rest of the examples show how the *contoso-signalr* service can be configured so that its upstream calls to the function go through a private endpoint rather than public network.
>  You may use your own resource IDs in the examples. 

## Create a shared private link resource to the function

### [Azure portal](#tab/azure-portal)

1. In the Azure portal, go to your SignalR Service resource.
1. Select **Networking** with the left menu.
1. Select the **Private access** tab.
1. Select **Add shared private endpoint** in the **Shared private endpoints** section.

   Screenshot of shared private endpoints management.

    Enter the following information:
    | Field | Description |
    | --- | --- |
    | **Name** | The name of the shared private endpoint. |
    | **Type** | Select *Microsoft.Web/sites* |
    | **Subscription** | The subscription containing your Function app. |
    | **Resource** | Enter the name of your Function app. |
    | **Request Message** | Enter "please approve" |

1. Select **Add**.

   Screenshot of adding a shared private endpoint.

The shared private endpoint resource will be in **Succeeded** provisioning state. The connection state is **Pending** approval at target resource side.

   Screenshot of an added shared private endpoint.

### [Azure CLI](#tab/azure-cli)

You can make the following API call to create a shared private link resource:

```azurecli
az rest --method put --uri https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/signalr/contoso-signalr/sharedPrivateLinkResources/func-pe?api-version=2021-06-01-preview --body @create-pe.json
```

The contents of the *create-pe.json* file, which represent the request body to the API, are as follows:

```json
{
      "name": "func-pe",
      "properties": {
        "privateLinkResourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.Web/sites/contoso-func",
        "groupId": "sites",
        "requestMessage": "please approve"
      }
}
```

The process of creating an outbound private endpoint is a long-running (asynchronous) operation. As in all asynchronous Azure operations, the `PUT` call returns an `Azure-AsyncOperation` header value that looks like the following example:

```plaintext
"Azure-AsyncOperation": "https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/signalr/contoso-signalr/operationStatuses/c0786383-8d5f-4554-8d17-f16fcf482fb2?api-version=2021-06-01-preview"
```

Poll this URI periodically to obtain the status of the operation by manually querying the `Azure-AsyncOperationHeader` value,

```azurecli
az rest --method get --uri https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/signalr/contoso-signalr/operationStatuses/c0786383-8d5f-4554-8d17-f16fcf482fb2?api-version=2021-06-01-preview
```

Wait until the status changes to "Succeeded" before proceeding to the next steps.

---

## Approve the private endpoint connection for the function

> **Important:**
> After you approve the private endpoint connection, the Function is no longer accessible from a public network. You may need to create other private endpoints in your virtual network to access the Function endpoint.

### [Azure portal](#tab/azure-portal)

1. In the Azure portal, go to your Function app.
1. Select **Networking** from the left side menu.
1. Select **Private endpoint connections**. 
1. Select **Private endpoints** in **Inbound Traffic**. 
1. Select the **Connection name** of the private endpoint connection.
1. Select **Approve**.

   Screenshot of the Azure portal, showing the Private endpoint connections pane.

   Make sure that the private endpoint connection appears as shown in the following screenshot. It could take a few minutes for the status to be updated.

   Screenshot of the Azure portal, showing an Approved status on the Private endpoint connections pane.

### [Azure CLI](#tab/azure-cli)

1. List private endpoint connections.

    ```azurecli
    az network private-endpoint-connection list -n <function-resource-name>  -g <function-resource-group-name> --type 'Microsoft.Web/sites'
    ```

    There should be a pending private endpoint connection. Note down its ID.

    ```json
    [
        {
            "id": "<id>",
            "location": "",
            "name": "",
            "properties": {
                "privateLinkServiceConnectionState": {
                    "actionRequired": "None",
                    "description": "Please approve",
                    "status": "Pending"
               }
            }
        }
    ]
    ```

1. Approve the private endpoint connection.

    ```azurecli
    az network private-endpoint-connection approve --id <private-endpoint-connection-id>
    ```

---

## Query the status of the shared private link resource

The approval takes a few minutes to propagate to the SignalR Service. You can check the state using either the Azure portal or Azure CLI.

### [Azure portal](#tab/azure-portal)

   Screenshot of an approved shared private endpoint.

### [Azure CLI](#tab/azure-cli)

```azurecli
az rest --method get --uri https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/signalr/contoso-signalr/sharedPrivateLinkResources/func-pe?api-version=2021-06-01-preview
```

The command will return a JSON structure, where the connection state is shown as "status" in the "properties" section.

```json
{
      "name": "func-pe",
      "properties": {
        "privateLinkResourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.Web/sites/contoso-func",
        "groupId": "sites",
        "requestMessage": "please approve",
        "status": "Approved",
        "provisioningState": "Succeeded"
      }
}

```

When the "Provisioning State" (`properties.provisioningState`) of the resource is `Succeeded` and "Connection State" (`properties.status`) is `Approved`, the shared private link resource is functional, and the SignalR Service can communicate over the private endpoint.

---

At this point, the private endpoint between the SignalR Service and Azure Function is established.

## Verify upstream calls are from a private IP

Once the private endpoint is set up, you can verify incoming calls from a private IP by checking the `X-Forwarded-For` header upstream side.

Screenshot of the Azure portal, showing incoming requests are from a private IP.

## Cleanup

If you don't plan to use the resources you've created in this article, you can delete the Resource Group.

>**Caution:**
> Deleting the resource group deletes all resources contained within it. If resources outside the scope of this article exist in the specified resource group, they will also be deleted.

## Next steps

Learn more about private endpoints:

+ [What are private endpoints?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-endpoint-overview.md)
