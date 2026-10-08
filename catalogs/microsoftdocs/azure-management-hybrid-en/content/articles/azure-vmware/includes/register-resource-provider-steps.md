---
title: Register the Azure VMware Solution resource provider
description: Steps to register the Azure VMware Solution resource provider.
ms.topic: include
ms.service: azure-vmware
ms.custom: devx-track-azurecli, engagement-fy23
ms.date: 01/04/2024
author: suzizuber
ms.author: v-szuber
# Customer intent: "As a cloud administrator, I want to register the Azure VMware Solution resource provider with my subscription, so that I can enable the deployment and management of VMware resources in the Azure environment."
---

<!-- Used in deploy-azure-vmware-solution.md and tutorial-create-private-cloud.md -->

To use Azure VMware Solution, you must first register the resource provider with your subscription. For more information about resource providers, see [Azure resource providers and types](../../azure-resource-manager/management/resource-providers-and-types.md).


### [Portal](#tab/azure-portal)
 
1. Sign in to the [Azure portal](https://portal.azure.com).
 
   >**Note:**
   >If you need access to the Azure US Gov portal, go to https://portal.azure.us/

1. On the Azure portal menu, select **All services**.

1. In the **All services** box, enter **subscription**, and then select **Subscriptions**.

1. Select the subscription from the subscription list to view.

1. Select **Resource providers** and enter **Microsoft.AVS** into the search. 
 
1. If the resource provider isn't registered, select **Register**.

### [Azure CLI](#tab/azure-cli)

To begin using Azure CLI:

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/includes/register-resource-provider-steps.md)

Sign in to the Azure subscription you use for the Azure VMware Solution deployment through the Azure CLI. Register the `Microsoft.AVS` resource provider with the [az provider register](https://learn.microsoft.com/cli/azure/provider#az-provider-register) command:

```azurecli-interactive
az provider register -n Microsoft.AVS --subscription <your subscription ID>
```

You can use the [az provider list](https://learn.microsoft.com/cli/azure/provider#az-provider-list) command to see all available providers.

---
