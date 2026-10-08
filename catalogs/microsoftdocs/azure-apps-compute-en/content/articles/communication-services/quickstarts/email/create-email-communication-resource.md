---
title: Create and manage Email Communication Service resource in Azure Communication Services
titleSuffix: An Azure Communication Services article
description: This article describes how to create and manage your first Azure Email Communication Service resource.
author: bashan-git
manager: sphenry
services: azure-communication-services
ms.author: bashan
ms.date: 03/31/2023
ms.topic: quickstart
ms.service: azure-communication-services
zone_pivot_groups: acs-plat-azp-azcli-net-ps
ms.custom: mode-other, devx-track-azurecli, devx-track-azurepowershell
ms.devlang: azurecli 
---

# Create and manage Email Communication Service resources


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Get started with Email by provisioning your first Email Communication Service resource. Provision Email Communication Service resources through the [Azure portal](https://portal.azure.com/) or using the .NET management client library. The management client library and the Azure portal enable you to create, configure, update, and delete your resources and interface using Azure's deployment and management service: [Azure Resource Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md). All functions available in the client libraries are available in the Azure portal.

> **Warning:**
> You can't create a resource group at the same time as a resource for Azure Communication Services. You must first create a resource group, then use it when provisioning your email resource.

**Applies to: platform-azp**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Create the Email Communications Service resource using portal

1. Open the [Azure portal](https://portal.azure.com/) to create a new resource.
2. Search for **Email Communication Services**.

   Screenshot that shows how to search Email Communication Service in market place.

3. Select **Email Communication Services** and click **Create**.
 
   Screenshot that shows Create link to create Email Communication Service.

4. Enter the required information in the **Basics** tab:
    - Select an existing Azure subscription.
    - Select an existing resource group, or to create a new one click the **Create new** link.
    - Provide a valid name for the resource. 
    - Select the region where the resource needs to be available.
    - Select **United States** as the data location.
    - To add tags, click  **Next: Tags** 
    - Add any name/value pairs. 
    
      Screenshot that shows how to the summary for review and create Email Communication Service.
      
5. Click **Next: Review + create**.
6. Wait for the validation to complete, then click **Create**.
7. Wait for the Deployment to complete, then click **Go to Resource** to open the Email Communication Service overview.

   Screenshot that shows the overview of Email Communication Service resource.



**Applies to: platform-azcli**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).

## Create Email Communication Services resource

To create an Email Communication Services resource, [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). You can sign in running the ```az login``` command from the terminal and providing your credentials. To create the resource, run the following command: 

```azurepowershell-interactive
az communication email create --name "<EmailServiceName>" --location "Global" --data-location "United States" --resource-group "<resourceGroup>"
```

If you want to select a specific subscription, you can also specify the ```--subscription``` flag and provide the subscription ID.

```azurepowershell-interactive
az communication email create --name "<EmailServiceName>" --location "Global" --data-location "United States" --resource-group "<resourceGroup>" --subscription "<subscriptionId>"
```

You can configure your Email Communication Services resource with the following options:

* The [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-cli.md).
* The name of the Email Communication Services resource.
* The geography to associate with the resource.

In the next step, you can assign tags to the resource. Then you can use tags to organize your Azure Email resources. For more information about tags, see the [resource tagging documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/tag-resources.md).

## Manage your Email Communication Services resource

To add tags to your Email Communication Services resource, run the following commands. You can also target a specific subscription.

```azurepowershell-interactive
az communication email update --name "<EmailServiceName>" --tags newTag="newVal1" --resource-group "<resourceGroup>"

az communication email update --name "<EmailServiceName>" --tags newTag="newVal2" --resource-group "<resourceGroup>" --subscription "<subscriptionId>"
```

To list all of your Email Communication Service Resources in a given Resource group, use the following command:

```azurepowershell-interactive
az communication email list --resource-group "<resourceGroup>"
```

To show all the information on a given Email Communication Service resource use the following command. You can also target a specific subscription.

```azurepowershell-interactive
az communication email show --name "<EmailServiceName>" --resource-group "<resourceGroup>"

az communication email show --name "<EmailServiceName>" --resource-group "<resourceGroup>" --subscription "<subscriptionId>"
```

## Clean up resource

If you want to clean up and remove an Email Communication Services subscription, you can delete the resource or resource group. You can delete your email communication resource by running the following command.

```azurecli-interactive
az communication email delete --name "<EmailServiceName>" --resource-group "<resourceGroup>"
```

[Deleting the resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-portal.md#delete-resource-groups) also deletes any other resources associated with it.

> **Note:**
> Resource deletion is **permanent** and no data, including Event Grid filters, phone numbers, or other data tied to your resource, can be recovered if you delete the resource.

For information on other commands, see [Email Communication CLI](https://learn.microsoft.com/cli/azure/communication/email).



**Applies to: platform-net**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest version [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.
- Get the latest version of the [.NET Identity SDK](https://learn.microsoft.com/dotnet/api/azure.identity).
- Get the latest version of the [.NET Management SDK](../../concepts/sdk-options.md).

## Install the SDK

First, include the Communication Services Management SDK in your C# project:

```csharp
using Azure.ResourceManager.Communication;
```

## Subscription ID

You need to know the ID of your Azure subscription. You can acquire the ID from the portal:

1.  Sign in into your Azure account.
2.  Select Subscriptions in the left sidebar.
3.  Select whichever subscription is needed.
4.  Click Overview.
5.  Select your Subscription ID.

In this quickstart, we assume that you stored the subscription ID in an environment variable called `AZURE_SUBSCRIPTION_ID`.

## Authentication

To communicate with Azure Communication Services, you must first authenticate yourself to Azure.

### Authenticate the Client

The default option to create an authenticated client is to use `DefaultAzureCredential`. Since all management APIs go through the same endpoint, in order to interact with resources, you only need to create one top-level `ArmClient`.

To authenticate to Azure and create an `ArmClient`, do the following code:

```csharp
using System;
using System.Threading.Tasks;
using Azure;
using Azure.Core;
using Azure.Identity;
using Azure.ResourceManager;
using Azure.ResourceManager.Communication;
using Azure.ResourceManager.Communication.Models;
using Azure.ResourceManager.Resources;
...
// get your azure access token, for more details of how Azure SDK get your access token, please refer to https://learn.microsoft.com/dotnet/azure/sdk/authentication?tabs=command-line
TokenCredential cred = new DefaultAzureCredential();
// authenticate your client
ArmClient client = new ArmClient(cred);
```

## Interact with Azure resources

Now that you're authenticated.

For each of the following examples, we assign our Email Services resources to an existing resource group.

If you need to create a resource group, you can do so by using the [Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-portal.md) or the [Azure Resource Manager SDK](https://github.com/Azure/azure-sdk-for-net/blob/master/doc/mgmt_preview_quickstart.md).

## Create an Email Services resource

When creating an Email Services resource, specify the resource group name and resource name.

>**Note:**
>The `Location` property is always `global`, and during public preview the `DataLocation` value must be `UnitedStates`.

```csharp
// this example assumes you already have this ResourceGroupResource created on azure
// for more information of creating ResourceGroupResource, please refer to the document of ResourceGroupResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
string resourceGroupName = "MyResourceGroup";
ResourceIdentifier resourceGroupResourceId = ResourceGroupResource.CreateResourceIdentifier(subscriptionId, resourceGroupName);
ResourceGroupResource resourceGroupResource = client.GetResourceGroupResource(resourceGroupResourceId);

// get the collection of this EmailServiceResource
EmailServiceResourceCollection collection = resourceGroupResource.GetEmailServiceResources();

// invoke the operation
string emailServiceName = "MyEmailServiceResource";
EmailServiceResourceData data = new EmailServiceResourceData(new AzureLocation("Global"))
{
    DataLocation = "United States",
};
ArmOperation<EmailServiceResource> lro = await collection.CreateOrUpdateAsync(WaitUntil.Completed, emailServiceName, data);
EmailServiceResource result = lro.Value;

// the variable result is a resource, you could call other operations on this instance as well
// but just for demo, we get its data from this resource instance
EmailServiceResourceData resourceData = result.Data;
// for demo we just print out the id
Console.WriteLine($"Succeeded on id: {resourceData.Id}");
```

## Manage your Email Communication Services resource

### Update an Email Communication Services resource

```csharp
...
// this example assumes you already have this EmailServiceResource created on azure
// for more information of creating EmailServiceResource, please refer to the document of EmailServiceResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
string resourceGroupName = "MyResourceGroup";
string emailServiceName = "MyEmailServiceResource";
ResourceIdentifier emailServiceResourceId = EmailServiceResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName);
EmailServiceResource emailServiceResource = client.GetEmailServiceResource(emailServiceResourceId);

// invoke the operation
EmailServiceResourcePatch patch = new EmailServiceResourcePatch()
{
    Tags =
    {
    ["newTag"] = "newVal",
    },
};
ArmOperation<EmailServiceResource> lro = await emailServiceResource.UpdateAsync(WaitUntil.Completed, patch);
EmailServiceResource result = lro.Value;

// the variable result is a resource, you could call other operations on this instance as well
// but just for demo, we get its data from this resource instance
EmailServiceResourceData resourceData = result.Data;
// for demo we just print out the id
Console.WriteLine($"Succeeded on id: {resourceData.Id}");
```

### List all Email Communication Service resources by resource group

```csharp
// this example assumes you already have this ResourceGroupResource created on azure
// for more information of creating ResourceGroupResource, please refer to the document of ResourceGroupResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
string resourceGroupName = "MyResourceGroup";
ResourceIdentifier resourceGroupResourceId = ResourceGroupResource.CreateResourceIdentifier(subscriptionId, resourceGroupName);
ResourceGroupResource resourceGroupResource = client.GetResourceGroupResource(resourceGroupResourceId);

// get the collection of this EmailServiceResource
EmailServiceResourceCollection collection = resourceGroupResource.GetEmailServiceResources();

// invoke the operation and iterate over the result
await foreach (EmailServiceResource item in collection.GetAllAsync())
{
    // the variable item is a resource, you could call other operations on this instance as well
    // but just for demo, we get its data from this resource instance
    EmailServiceResourceData resourceData = item.Data;
    // for demo we just print out the id
    Console.WriteLine($"Succeeded on id: {resourceData.Id}");
}

Console.WriteLine($"Succeeded");
```

### List all Email Communication Service resources by subscription

```csharp
// this example assumes you already have this SubscriptionResource created on azure
// for more information of creating SubscriptionResource, please refer to the document of SubscriptionResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
ResourceIdentifier subscriptionResourceId = SubscriptionResource.CreateResourceIdentifier(subscriptionId);
SubscriptionResource subscriptionResource = client.GetSubscriptionResource(subscriptionResourceId);

// invoke the operation and iterate over the result
await foreach (EmailServiceResource item in subscriptionResource.GetEmailServiceResourcesAsync())
{
    // the variable item is a resource, you could call other operations on this instance as well
    // but just for demo, we get its data from this resource instance
    EmailServiceResourceData resourceData = item.Data;
    // for demo we just print out the id
    Console.WriteLine($"Succeeded on id: {resourceData.Id}");
}

Console.WriteLine($"Succeeded");
```

## Clean up resource

```csharp
// this example assumes you already have this EmailServiceResource created on azure
// for more information of creating EmailServiceResource, please refer to the document of EmailServiceResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
string resourceGroupName = "MyResourceGroup";
string emailServiceName = "MyEmailServiceResource";
ResourceIdentifier emailServiceResourceId = EmailServiceResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName);
EmailServiceResource emailServiceResource = client.GetEmailServiceResource(emailServiceResourceId);

// invoke the operation
await emailServiceResource.DeleteAsync(WaitUntil.Completed);

Console.WriteLine($"Succeeded");
```
> **Note:**
> Resource deletion is **permanent** and no data, including Event Grid filters, phone numbers, or other data tied to your resource, can be recovered if you delete the resource.



**Applies to: platform-powershell**

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install [Azure Az PowerShell](https://learn.microsoft.com/powershell/azure/).

## Create Email Communication Service resource

To create an Email Communication Service resource, sign into your Azure account using the ```Connect-AzAccount``` using the following command and provide your credentials.

```PowerShell
PS C:\> Connect-AzAccount
```

First, install the Azure Communication Services module ```Az.Communication``` using the following command.

```PowerShell
PS C:\> Install-Module Az.Communication
```

To create a resource, run the following command:

```PowerShell
PS C:\> New-AzEmailService -ResourceGroupName ContosoResourceProvider1 -Name ContosoEmailServiceResource1 -DataLocation UnitedStates
```

If you want to select a specific subscription, you can also specify the ```--subscription``` flag and provide the subscription ID.

```PowerShell
PS C:\> New-AzEmailService -ResourceGroupName ContosoResourceProvider1 -Name ContosoEmailServiceResource1 -DataLocation UnitedStates -SubscriptionId SubscriptionID
```

You can configure your Communication Services resource with the following options:

* The [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-powershell.md).
* The name of the Email Communication Services resource.
* The geography to be associated with the resource.

In the next step, you can assign tags to the resource. Use tags to organize your Azure Email resources. For more information about tags, see the [resource tagging](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/tag-resources.md).

## Manage your Email Communication Services resource

To add tags to your Email Communication Services resource, run the following commands. You can also target a specific subscription.

```PowerShell
PS C:\> Update-AzEmailService -Name ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1 -Tag @{ExampleKey1="ExampleValue1"}

PS C:\> Update-AzEmailService -Name ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1 -Tag @{ExampleKey1="ExampleValue1"} -SubscriptionId SubscriptionID
```

To list all of your Email Communication Service resources in a given subscription, use the following command:

```PowerShell
PS C:\> Get-AzEmailService -SubscriptionId SubscriptionID
```

To list all the information on a given resource, use the following command:

```PowerShell
PS C:\> Get-AzEmailService -Name ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1
```

## Clean up resource

If you want to clean up and remove an Email Communication Services resource, You can delete your Email communication resource by running the following command:

```PowerShell
PS C:\> Remove-AzEmailService -Name ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1
```

> **Note:**
> Resource deletion is **permanent** and no data, including Event Grid filters, phone numbers, or other data tied to your resource, can be recovered if you delete the resource.



## Next steps

* [Email domains and sender authentication for Azure Communication Services](../../concepts/email/email-domain-and-sender-authentication.md)

* [Quickstart: How to connect a verified email domain](connect-email-communication-resource.md)

## Related articles

- Familiarize yourself with the [Email client library](../../concepts/email/sdk-features.md)
- Learn how to send emails with custom verified domains in [Quickstart: How to add custom verified email domains](add-custom-verified-domains.md)
- Learn how to send emails with Azure Managed Domains in [Quickstart: How to add Azure Managed Domains to email](add-azure-managed-domains.md)
