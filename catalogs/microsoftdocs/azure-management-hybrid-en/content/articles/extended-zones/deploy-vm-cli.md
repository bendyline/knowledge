---
title: "Deploy a virtual machine in an Extended Zone using Azure CLI"
description: Learn how to deploy a virtual machine in an Azure Extended Zone using Azure CLI.
author: svaldesgzz
ms.author: svaldes
ms.reviewer: halkazwini
ms.service: azure-extended-zones
ms.topic: quickstart
ms.date: 09/25/2025
ms.custom: sfi-image-nochange

# Customer intent: As a cloud administrator, I want a quick method to deploy a virtual machine in an Azure Extended Zone.
---
  
# Quickstart: Deploy a virtual machine in an Extended Zone using Azure CLI 
 
In this quickstart, you learn how to deploy a virtual machine (VM) in an Extended Zone using Azure CLI.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/extended-zones/deploy-vm-cli.md)

You can also complete this quickstart using the [Azure portal](deploy-vm-portal.md).

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Prerequisites

- An Azure account with an active subscription.

- Access to an Extended Zone. For more information, see [Request access to an Azure Extended Zone](request-access.md).

- Azure Cloud Shell or Azure CLI.

    The steps in this article run the Azure CLI commands interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the commands in the Cloud Shell, select **Open Cloud Shell** at the upper-right corner of a code block. Select **Copy** to copy the code, and paste it into Cloud Shell to run it. You can also run the Cloud Shell from within the Azure portal.

    You can also [install Azure CLI locally](https://learn.microsoft.com/cli/azure/install-azure-cli) to run the commands. This article requires the Azure CLI version 2.26 or higher. Run [az --version](https://learn.microsoft.com/cli/azure/reference-index#az-version) command to find the installed version. If you run Azure CLI locally, sign in to Azure using the [az login](https://learn.microsoft.com/cli/azure/reference-index#az-login) command.

## Review the structure

The structure for deploying a VM image in an Extended Zones using Azure CLI is similar to that of deploying a VM image in an Azure region. The main difference is that you need to specify the Extended Zone variable *edge-zone* and its corresponding parent region in the *location* variable.

1. Create a resource group using the [az group create](https://learn.microsoft.com/cli/azure/group#az_group_create) command.

    ```azurecli-interactive
    az group create --name 'myResourceGroup' --location '<location>' 
    ```

    > **Note:**
    > Each Azure Extended Zone site is associated with an Azure region. Based on the Azure Extended Zone location where the resource needs to be deployed, select the appropriate region value for the `location` parameter.

2. Deploy the desired vm image. For this example, we're using the **Windows Server 2022 Datacenter** image, to be deployed in the Perth Extended Zone.
    ```azurecli-interactive
    az vm create --resource-group myResourceGroup --name myVMName --image Win2022Datacenter --size Standard_DS4_v2 --edge-zone perth --location australiaeast
    ```

## Clean up resources

When no longer needed, delete **myResourceGroup** resource group and all of the resources it contains using the [az group delete](https://learn.microsoft.com/cli/azure/group#az-group-delete) command.

```azurecli-interactive
az group delete --name myResourceGroup
```

## Related content

- [Deploy an AKS cluster in an Extended Zone](deploy-aks-cluster.md)
- [Deploy a storage account in an Extended Zone](create-storage-account.md)
- [Frequently asked questions](faq.md)
