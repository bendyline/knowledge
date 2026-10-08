---
title: Create an Azure Web PubSub resource
titleSuffix: Azure Web PubSub
description: Quickstart showing how to create a Web PubSub resource from Azure portal, using Azure CLI and a Bicep file
author: kevinguo-ed
ms.author: kevinguo
ms.service: azure-web-pubsub
ms.topic: quickstart
ms.date: 03/13/2023
ms.custom:
  - mode-ui
  - devx-track-azurecli
  - devx-track-bicep
  - build-2025
zone_pivot_groups: azure-web-pubsub-create-resource-methods
---

# Create a Web PubSub resource

## Prerequisites

> 
>
> - An Azure account with an active subscription. [Create a free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn), if don't have one already.

> **Tip:**
> Web PubSub includes a generous **free tier** that can be used for testing and production purposes.

**Applies to: method-azure-portal**


## Create a resource from Azure portal

1. Select the New button found on the upper left-hand corner of the Azure portal. In the New screen, type **Web PubSub** in the search box and then press Enter.

   Screenshot of searching the Azure Web PubSub in portal.

2. Select **Web PubSub** from the search results, then select **Create**.

3. Enter the following settings.

   | Setting | Suggested value | Description |
   | --- | --- | --- |
   | **Resource name** | Globally unique name | The globally unique Name that identifies your new Web PubSub service instance. Valid characters are `a-z`, `A-Z`, `0-9`, and `-`. |
   | **Subscription** | Your subscription | The Azure subscription under which this new Web PubSub service instance is created. |
   | **[Resource Group]** | myResourceGroup | Name for the new resource group in which to create your Web PubSub service instance. |
   | **Location** | West US | Choose a [region](https://azure.microsoft.com/regions/) near you. |
   | **Pricing tier** | Free | You can first try Azure Web PubSub service for free. Learn more details about [Azure Web PubSub service pricing tiers](https://azure.microsoft.com/pricing/details/web-pubsub/) |
   | **Unit count** | - | Unit count specifies how many connections your Web PubSub service instance can accept. Each unit supports 1,000 concurrent connections at most. It is only configurable in the Standard tier. |

   Screenshot of creating the Azure Web PubSub instance in portal.

4. Select **Create** to provision your Web PubSub resource.


**Applies to: method-azure-cli**


## Create a resource using Azure CLI

The [Azure CLI](https://learn.microsoft.com/cli/azure) is a set of commands used to create and manage Azure resources. The Azure CLI is available across Azure services and is designed to get you working quickly with Azure, with an emphasis on automation.

> **Important:**
> This quickstart requires Azure CLI of version 2.22.0 or higher.

## Create a resource group


A resource group is a logical container into which Azure resources are deployed and managed. Use the [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) command to create a resource group named `myResourceGroup` in the `eastus` location.

```azurecli
az group create --name myResourceGroup --location EastUS
```


## Create a resource


Run [az extension add](https://learn.microsoft.com/cli/azure/extension#az-extension-add) to install or upgrade the *webpubsub* extension to the current version.

```azurecli-interactive
az extension add --upgrade --name webpubsub
```

Use the Azure CLI [az webpubsub create](https://learn.microsoft.com/cli/azure/webpubsub#az-webpubsub-create) command to create a Web PubSub in the resource group you've created. The following command creates a _Free_ Web PubSub resource under resource group _myResourceGroup_ in _EastUS_:

  > **Important:**
  > Each Web PubSub resource must have a unique name. Replace &lt;your-unique-resource-name&gt; with the name of your Web PubSub in the following examples.

```azurecli
az webpubsub create --name "<your-unique-resource-name>" --resource-group "myResourceGroup" --location "EastUS" --sku Free_F1
```

The output of this command shows properties of the newly created resource. Take note of the two properties listed below:

- **Resource Name**: The name you provided to the `--name` parameter above.
- **hostName**: In the example, the host name is `<your-unique-resource-name>.webpubsub.azure.com/`.

At this point, your Azure account is the only one authorized to perform any operations on this new resource.



**Applies to: method-bicep**


## Create a resource using Bicep file

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/howto-develop-create-instance.md)

## Review the Bicep file

The template used in this quickstart is from [Azure Quickstart Templates](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/azure-web-pubsub/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.web/azure-web-pubsub/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/howto-develop-create-instance.md)

## Deploy the Bicep file

1. Save the Bicep file as **main.bicep** to your local computer.
1. Deploy the Bicep file using either Azure CLI or Azure PowerShell.

   # [CLI](#tab/CLI)

   ```azurecli
   az group create --name exampleRG --location eastus
   az deployment group create --resource-group exampleRG --template-file main.bicep
   ```

   # [PowerShell](#tab/PowerShell)

   ```azurepowershell
   New-AzResourceGroup -Name exampleRG -Location eastus
   New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep
   ```

   ***

   When the deployment finishes, you should see a message indicating the deployment succeeded.

## Review deployed resources

Use the Azure portal, Azure CLI, or Azure PowerShell to list the deployed resources in the resource group.

# [CLI](#tab/CLI)

```azurecli-interactive
az resource list --resource-group exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Get-AzResource -ResourceGroupName exampleRG
```

---

## Clean up resources

When no longer needed, use the Azure portal, Azure CLI, or Azure PowerShell to delete the resource group and its resources.

# [CLI](#tab/CLI)

```azurecli-interactive
az group delete --name exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Remove-AzResourceGroup -Name exampleRG
```



## Next step

Now that you have created a resource, you are ready to put it to use.
Next, you will learn how to subscribe and publish messages among your clients.

>  
> [PubSub among clients](quickstarts-pubsub-among-clients.md)
