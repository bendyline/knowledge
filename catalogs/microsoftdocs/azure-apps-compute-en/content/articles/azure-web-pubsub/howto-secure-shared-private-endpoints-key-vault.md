---
title: Access a key vault in a private network via shared private endpoints
titleSuffix: Azure Web PubSub
description: Learn how to access a key vault in a private network through shared private endpoints.
author: ArchangelSDY
ms.service: azure-web-pubsub
ms.custom: devx-track-azurecli
ms.topic: how-to
ms.date: 08/16/2024
ms.author: dayshen
---

# Access a key vault in a private network through shared private endpoints

Azure Web PubSub can access a key vault in a private network through shared private endpoint connections. This article shows you how to configure your Web PubSub resource to route outbound calls to a key vault through a shared private endpoint instead of through a public network.

Diagram showing architecture of shared private endpoint.

Private endpoints of secured resources created through Azure Web PubSub APIs are called *shared private link resources*. You "share" access to a resource, such as an instance of Azure Key Vault, that is integrated with [Azure Private Link](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-link-overview.md). These private endpoints are created inside the Web PubSub execution environment and aren't directly visible to you.

> **Note:**
> The examples in this article use the following resource IDs:
>
> * The resource ID of this Azure Web PubSub instance is `_/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/webpubsub/contoso-webpubsub`.
> * The resource ID of the Azure Key Vault instance is `/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.KeyVault/vaults/contoso-kv`.
>
> To use the steps in the following examples, replace these values with your own subscription ID, the name of your Web PubSub resource, and the name of your Azure Key Vault resource.

## Prerequisites

* An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) 2.25.0 or later (if you use the Azure CLI).
* An Azure Web PubSub instance in a minimum Standard pricing tier.
* An Azure Key Vault resource.

### Create a shared private endpoint resource to the key vault

#### [Azure portal](#tab/azure-portal)

1. In the Azure portal, go to your Azure Web PubSub resource.
1. On the left menu, select **Networking**.
1. Select the **Private access** tab.
1. Select **Add shared private endpoint**.

   Screenshot of shared private endpoints management.

1. For **Name**, enter a name to use for the shared private endpoint.
1. To select your key vault resource, complete one of the following steps:

   * Choose **Select from your resources** and select your resource from the lists.
   * Select **Specify resource ID** and enter your key vault resource ID.
1. For **Request message**, enter **Please approve**.
1. Select **Add**.

   Screenshot of adding a shared private endpoint.

The shared private endpoint resource provisioning state is **Succeeded**. The connection state is **Pending** and waiting for approval for the target resource.

Screenshot of an added shared private endpoint.

#### [Azure CLI](#tab/azure-cli)

You can make the following API call with the [Azure CLI](https://learn.microsoft.com/cli/azure/) to create a shared private link resource. Replace the value `uri` with the URI in your scenario.

```azurecli
az rest --method put --uri https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/webpubsub/contoso-webpubsub/sharedPrivateLinkResources/kv-pe?api-version=2022-08-01-preview --body @create-pe.json
```

The contents of the *create-pe.json* file represent the request body to the API:

```json
{
      "name": "contoso-kv",
      "properties": {
        "privateLinkResourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.KeyVault/vaults/contoso-kv",
        "groupId": "vault",
        "requestMessage": "please approve"
      }
}
```

The process of creating an outbound private endpoint is a long-running (asynchronous) operation. As in all asynchronous Azure operations, the PUT call returns an `Azure-AsyncOperation` header value that looks like the following example:

```output
"Azure-AsyncOperation": "https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/webpubsub/contoso-webpubsub/operationStatuses/c0786383-8d5f-4554-8d17-f16fcf482fb2?api-version=2022-08-01-preview"
```

You can poll this URI periodically to get the status of the operation. Wait for the status to change to "Succeeded" before you proceed to the next section.

To poll for the status, manually query the `Azure-AsyncOperationHeader` value:

```azurecli
az rest --method get --uri https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/webpubsub/contoso-webpubsub/operationStatuses/c0786383-8d5f-4554-8d17-f16fcf482fb2?api-version=2022-08-01-preview
```

---

### Approve the private endpoint connection for the key vault

After the private endpoint connection is created, the connection request from Web PubSub must be approved in your Key Vault resource.

#### [Azure portal](#tab/azure-portal)

1. In the Azure portal, go to your Key Vault resource.
1. On the left menu, select **Networking**.
1. Select **Private endpoint connections**.

   Screenshot of the Azure portal, showing the Private endpoint connections pane.

1. Select the private endpoint that Web PubSub created.
1. Select **Approve**, and then select **Yes** to confirm.

    It might take a few minutes for the private endpoint connection status to change to **Approved**.

   Screenshot of the Azure portal, showing an Approved status on the Private endpoint connections pane.

#### [Azure CLI](#tab/azure-cli)

1. List private endpoint connections:

    ```azurecli
    az network private-endpoint-connection list --name <key-vault-resource-name>  --resource-group <key-vault-resource-group-name> --type 'Microsoft.KeyVault/vaults'
    ```

    Check for a pending private endpoint connection. Note the connection ID.

    ```json
    [
        {
            "id": "<ID>",
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

1. Approve the private endpoint connection:

    ```azurecli
    az network private-endpoint-connection approve --id <private-endpoint-connection-ID>
    ```

---

### Query the status of the shared private link resource

It takes a few minutes for the approval to be propagated to Azure Web PubSub Service. You can check the state using either Azure portal or Azure CLI. The shared private endpoint between Azure Web PubSub Service and Azure Key Vault is active when the container state is approved.

#### [Azure portal](#tab/azure-portal)

1. In the Azure portal, go to your Azure Web PubSub resource.
1. On the left menu, select **Networking**.
1. Select **Shared private link resources**.

   Screenshot of an approved shared private endpoint.

#### [Azure CLI](#tab/azure-cli)

```azurecli
az rest --method get --uri https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/webpubsub/contoso-webpubsub/sharedPrivateLinkResources/func-pe?api-version=2022-08-01-preview
```

This command returns JSON. The connection state is indicated in `status` under `properties`.

```json
{
      "name": "contoso-kv",
      "properties": {
        "privateLinkResourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.KeyVault/vaults/contoso-kv",
        "groupId": "vaults",
        "requestMessage": "please approve",
        "status": "Approved",
        "provisioningState": "Succeeded"
      }
}

```

When `properties.provisioningState` is `Succeeded` and `properties.status` (connection state) is `Approved`, the shared private link resource is functional, and Web PubSub can communicate over the private endpoint.

---

Now you can configure features like a custom domain as you typically would. You don't have to use a special domain for your key vault. Web PubSub automatically handles Domain Name System (DNS) resolution.

## Related content

* [What is a private endpoint?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-endpoint-overview.md)
* [Configure a custom domain](howto-custom-domain.md)
