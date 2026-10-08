---
title: Quickstart - Create Your Azure API Center - Azure CLI
description: Learn how to use the Azure CLI to set up an API center for API discovery, reuse, and governance. 

ms.service: azure-api-center
ms.custom: devx-track-azurecli
ms.topic: quickstart
ms.date: 10/15/2025
 
---

# Quickstart: Create your API center - Azure CLI


Create your [API center](overview.md) to start an inventory of your organization's APIs. Azure API Center enables tracking APIs in a centralized location for discovery, reuse, and governance.

After creating your API center, follow the steps in the tutorials to add custom metadata, APIs, versions, definitions, and other information.


## Prerequisites

* If you don't have an Azure subscription, create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

* At least a Contributor role assignment or equivalent permissions in the Azure subscription. 

* For Azure CLI:
    [Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/set-up-api-center-azure-cli.md)

    
> **Note:**
> The `az apic` commands require the `apic-extension` Azure CLI extension. The extension can be installed dynamically when you run your first `az apic` command, or you can install the extension manually. For more information, see [Manage Azure CLI Extensions: Install, Update, and Remove](https://learn.microsoft.com/cli/azure/azure-cli-extensions-overview).
>
> For the latest changes and updates in the `apic-extension`, see the [release notes](https://github.com/Azure/azure-cli-extensions/blob/main/src/apic-extension/HISTORY.rst). Certain features might require a preview or specific version of the extension.


## Register the Microsoft.ApiCenter provider

If you haven't already, register the **Microsoft.ApiCenter** resource provider in your subscription. You only register the resource provider once.

To register the resource provider in your subscription by using the Azure CLI, run the following [`az provider register`](https://learn.microsoft.com/cli/azure/provider#az-provider-register) command:

```azurecli-interactive
az provider register --namespace Microsoft.ApiCenter
```

You can check the registration status by running the following [`az provider show`](https://learn.microsoft.com/cli/azure/provider#az-provider-show) command:

```azurecli-interactive
az provider show --namespace Microsoft.ApiCenter
```

## Create a resource group

Azure API Center instances, like all Azure resources, must be deployed into a resource group. Resource groups let you organize and manage related Azure resources.

Create a resource group by using the [`az group create`](https://learn.microsoft.com/cli/azure/group#az-group-create) command. The following example creates a group called *MyGroup* in the *East US* location:

```azurecli-interactive
az group create --name MyGroup --location eastus
```

## Create an API center

Create an API center by using the [`az apic create`](https://learn.microsoft.com/cli/azure/apic/#az-apic-create) command.

The following example creates an API center called *MyApiCenter* in the *MyGroup* resource group. In this example, the API center is deployed in the *West Europe* location. Substitute an API center name of your choice and enter one of the [available locations](overview.md#available-regions) for your API center.

```azurecli-interactive
az apic create --name MyApiCenter --resource-group MyGroup --location westeurope
```

Output from the command looks similar to the following. By default, the API center is created in the Free plan.

```json
{
  "dataApiHostname": "myapicenter.data.westeurope.azure-apicenter.ms",
  "id": "/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/resourceGroups/mygroup/providers/Microsoft.ApiCenter/services/myapicenter",
  "location": "westeurope",
  "name": "myapicenter",
  "resourceGroup": "mygroup",
  "sku": {
    "name": "Free"
  },
  "systemData": {
    "createdAt": "2024-06-22T21:40:35.2541624Z",
    "lastModifiedAt": "2024-06-22T21:40:35.2541624Z"
  },
  "tags": {},
  "type": "Microsoft.ApiCenter/services"
}
```

After deployment, your API center is ready to use!


## Next step

Now you can start adding information to the inventory in your API center. To help you organize your APIs and other information, begin by defining custom metadata in your API center.

> 
> [Define custom metadata](tutorials/add-metadata-properties.md)
