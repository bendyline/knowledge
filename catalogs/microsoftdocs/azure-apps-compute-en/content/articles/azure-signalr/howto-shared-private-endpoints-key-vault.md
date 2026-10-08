---
title: Access Key Vault in a private network through shared private endpoints
titleSuffix: Azure SignalR Service
description: Learn how Azure SignalR Service can use shared private endpoints to avoid exposing your key vault on a public network.
services: signalr
author: ArchangelSDY
ms.service: azure-signalr-service
ms.custom: devx-track-azurecli
ms.topic: how-to
ms.date: 09/23/2022
ms.author: dayshen
---

# Access Key Vault in a private network through shared private endpoints

Azure SignalR Service can access your Key Vault in a private network through Shared Private Endpoints. This way, your Key Vault isn't exposed on a public network.

Diagram that shows the architecture of a shared private endpoint.

You can create private endpoints through Azure SignalR Service APIs for shared access to a resource integrated with [Azure Private Link service](https://azure.microsoft.com/services/private-link/).   These endpoints, called *shared private link resources*, are created inside the SignalR execution environment and aren't accessible outside this environment.

In this article, you'll learn how to create a shared private endpoint to Key Vault.

## Prerequisites

You'll need the following resources to complete this article:

- An Azure resource group. 
- An Azure SignalR Service instance.
- An Azure Key Vault instance.


The examples in this article use the following naming convention, although you can use your own names instead.

- The resource ID of this Azure SignalR Service is _/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/signalr/contoso-signalr_.
- The resource ID of Azure Key Vault is _/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.KeyVault/vaults/contoso-kv_.
- The rest of the examples show how the *contoso-signalr* service can be configured so that its outbound calls to Key Vault go through a private endpoint rather than public network.


## Create a shared private link resource to the Key Vault

### [Azure portal](#tab/azure-portal)

1. In the Azure portal, go to your Azure SignalR Service resource.
1. Select **Networking**. 
1. Select the **Private access** tab.
1. Select **Add shared private endpoint** in the **Shared private endpoints** section.

   Screenshot of the button for adding a shared private endpoint.

    Enter the following information:
   
    | Field | Description |
    | --- | --- |
    | **Name** | The name of the shared private endpoint. |
    | **Type** | Select *Microsoft.KeyVault/vaults* |
    | **Subscription** | The subscription containing your Key Vault. |
    | **Resource** | Enter the name of your Key Vault resource. |
    | **Request Message** | Enter "please approve" |
   
1. Select **Add**.

   Screenshot of adding a shared private endpoint.

When you've successfully added the private endpoint, the provisioning state will be **Succeeded**.  The connection state will be **Pending** until you approve the endpoint on the Key Vault side.

   Screenshot of an added shared private endpoint.

### [Azure CLI](#tab/azure-cli)

Make the following API call with the [Azure CLI](https://learn.microsoft.com/cli/azure/) to create a shared private link resource:

```azurecli
az rest --method put --uri https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/signalr/contoso-signalr/sharedPrivateLinkResources/kv-pe?api-version=2021-06-01-preview --body @create-pe.json
```

The contents of the *create-pe.json* file, which represent the request body to the API, are as follows:

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

The process of creating an outbound private endpoint is a long-running (asynchronous) operation. As in all asynchronous Azure operations, the `PUT` call returns an `Azure-AsyncOperation` header value that looks like the following text:

```plaintext
"Azure-AsyncOperation": "https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/signalr/contoso-signalr/operationStatuses/c0786383-8d5f-4554-8d17-f16fcf482fb2?api-version=2021-06-01-preview"
```

You can poll this URI periodically to obtain the status of the operation.

You can poll for the status by manually querying the `Azure-AsyncOperationHeader` value:

```azurecli
az rest --method get --uri https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/signalr/contoso-signalr/operationStatuses/c0786383-8d5f-4554-8d17-f16fcf482fb2?api-version=2021-06-01-preview
```

Wait until the status changes to **Succeeded** before you proceed to the next steps.

---

## Approve the private endpoint connection for the Key Vault

### [Azure portal](#tab/azure-portal)

1. Go to your Key Vault resource
1. Select the **Networking**.
1. Select the **Private endpoint connections** tab. 
    After the asynchronous operation has succeeded, there should be a request for a private endpoint connection with the request message from the previous API call.

1. Select the private endpoint that SignalR Service created, then select **Approve**.
Screenshot of Approve connection dialog for private endpoint in Azure Key Vault.
1. Select **Yes** to approve the connection. 

   Screenshot of the Azure portal that shows an Approved status on the pane for private endpoint connections.

### [Azure CLI](#tab/azure-cli)

1. List private endpoint connections.

    ```azurecli
    az network private-endpoint-connection list -n <key-vault-resource-name>  -g <key-vault-resource-group-name> --type 'Microsoft.KeyVault/vaults'
    ```

    There should be a pending private endpoint connection. Note its ID.

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

1. Approve the private endpoint connection:

    ```azurecli
    az network private-endpoint-connection approve --id <private-endpoint-connection-id>
    ```

---

## Verify the shared private endpoint is functional 

After a few minutes, the approval propagates to the SignalR Service, and the connection state is set to *Approved*.  You can check the state using either Azure portal or Azure CLI.

### [Azure portal](#tab/azure-portal)

   Screenshot of an approved shared private endpoint.

### [Azure CLI](#tab/azure-cli)

```azurecli
az rest --method get --uri https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso/providers/Microsoft.SignalRService/signalr/contoso-signalr/sharedPrivateLinkResources/func-pe?api-version=2021-06-01-preview
```

The command will return a JSON object, where the connection state is shown as "status" in the "properties" section.


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

When the "Provisioning State" (`properties.provisioningState`) of the resource is `Succeeded` and "Connection State" (`properties.status`) is `Approved`, the shared private link resource is functional, and the SignalR Service can communicate over the private endpoint.

---

When the private endpoint between the SignalR Service and Azure Key Vault is functional,  the value of the provisioning state is **Succeeded**, and the connection state is **Approved**.

## Cleanup

If you don't plan to use the resources you've created in this article, you can delete the Resource Group.

>**Caution:**
> Deleting the resource group deletes all resources contained within it. If resources outside the scope of this article exist in the specified resource group, they will also be deleted.

## Next steps

+ [What are private endpoints?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-endpoint-overview.md)
+ [Configure a custom domain](howto-custom-domain.md)
