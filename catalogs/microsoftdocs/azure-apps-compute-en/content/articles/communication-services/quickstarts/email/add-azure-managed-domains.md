---
title: Add Azure Managed Domains to Email Communication Service
titleSuffix: An Azure Communication Services quick start guide
description: This article describes how to add free Azure Managed domains for Email Communication Services.
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

# Add Azure Managed Domains to Email Communication Service


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to provision Azure Managed Domains for Email Communication Service in Azure Communication Services. There's no charge for provisioning email domains.

**Applies to: platform-azp**

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Communication Services Email Resource created and ready to add the domains. See [Get started with Creating Email Communication Resource](create-email-communication-resource.md).

## Provision Azure Managed Domain

1. Open the Overview page of the Email Communications Service resource that you created in [Get started with Creating Email Communication Resource](create-email-communication-resource.md).
2. Create an Azure Managed Domain using one of the following options.
    - (Option 1) Click the **1-click add** button under **Add a free Azure subdomain**. Continue to **step 3**.
    
    Screenshot that highlights the adding a free Azure Managed Domain.

    - (Option 2) Click **Provision Domains** on the left navigation panel.
    
    Screenshot that shows the Provision Domains navigation page.

    - Click **Add domain** on the upper navigation bar.
    - Select **Azure domain** from the dropdown.
    
3. Wait for the deployment to complete.
 
    Screenshot that shows the Deployment Progress.

4. Once the domain is created, you see a list view with the new domain.

    Screenshot that shows the list of provisioned email domains.

5. Click the name of the provisioned domain to open the overview page for the domain resource type.

    Screenshot that shows Azure Managed Domain overview page.



**Applies to: platform-azcli**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).
- Create an [Email Communication Service](https://learn.microsoft.com/azure/communication-services/quickstarts/email/create-email-communication-resource).

## Create Domain resource

To create a Domain resource, [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). You can sign in running the ```az login``` command from the terminal and providing your credentials. To create the resource, run the following command:

```azurepowershell-interactive
az communication email domain create --domain-name AzureManagedDomain --email-service-name "<EmailServiceName>" --location "Global" --resource-group "<resourceGroup>" --domain-management AzureManaged
```

If you want to select a specific subscription, you can also specify the ```--subscription``` flag and provide the subscription ID.

```azurepowershell-interactive
az communication email domain create --domain-name AzureManagedDomain --email-service-name "<EmailServiceName>" --location "Global" --resource-group "<resourceGroup>" --domain-management AzureManaged --subscription "<subscriptionId>"
```

You can configure your Domain resource with the following options:

* The [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-cli.md)
* The name of the Email Communication Services resource.
* The geography to associate with the resource.
* The name of the Domain resource:
	* For Azure domains, the value must be `AzureManagedDomain`.
* The value of the Domain management property.
	* For Azure domains, the value must be `AzureManaged`.	

In the next step, you can assign tags to the domain resource. Tags can be used to organize your Domain resources. For more information about tags, see the [resource tagging documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/tag-resources.md).

## Manage your Domain resource

To add tags to your Domain resource, run the following commands. You can also target a specific subscription.

```azurepowershell-interactive
az communication email domain update --domain-name AzureManagedDomain --email-service-name "<EmailServiceName>" --resource-group "<resourceGroup>" --tags newTag="newVal1"

az communication email domain update --domain-name AzureManagedDomain --email-service-name "<EmailServiceName>" --resource-group "<resourceGroup>" --tags newTag="newVal1" --subscription "<subscriptionId>"
```

To list all of your Domain Resources in a given Email Communication Service, use the following command:

```azurepowershell-interactive
az communication email domain list --email-service-name "<EmailServiceName>" --resource-group "<resourceGroup>"
```
To show all the information on a given domain resource use the following command:

```azurepowershell-interactive
az communication email domain show --domain-name AzureManagedDomain --email-service-name "<EmailServiceName>" --resource-group "<resourceGroup>"
```

## Clean up Domain resource

If you want to clean up and remove a Domain resource, you can delete it using the following command.

```azurepowershell-interactive
az communication email domain delete --domain-name AzureManagedDomain --email-service-name "<EmailServiceName>" --resource-group "<resourceGroup>"
```

> **Note:**
> Resource deletion is **permanent** and no data, including Event Grid filters, phone numbers, or other data tied to your resource, can be recovered if you delete the resource.

For information on other commands, see [Domain CLI](https://learn.microsoft.com/cli/azure/communication/email/domain).



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

You need to know the ID of your Azure subscription. Acquire your ID from the portal:

1.  Sign in into your Azure account.
2.  Select **Subscriptions** in the left sidebar.
3.  Select whichever subscription is needed.
4.  Click on **Overview**.
5.  Select your Subscription ID.

In this example, we assume that you stored the subscription ID in an environment variable called `AZURE_SUBSCRIPTION_ID`.

## Authentication

To communicate with Domain resource, you must first authenticate yourself to Azure.

### Authenticate the Client

The default option to create an authenticated client is to use `DefaultAzureCredential`. Since all management APIs go through the same endpoint, in order to interact with resources, you only need to create one top-level `ArmClient`.

To authenticate to Azure and create an `ArmClient`, run the following code:


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

## Interacting with Azure resources

For each of the following examples, we assign our Domain resources to an existing Email communication service.

If you need to create an Email Communication Service, use the [Azure portal](create-email-communication-resource.md).

## Create a Domain resource

When creating a Domain resource, you need to specify the resource group name, Email Communication Service name, resource name, and DomainManagement. 

> **Note:**
> The `Location` property is always `global`.

```csharp
// this example assumes you already have this EmailServiceResource created on azure
// for more information of creating EmailServiceResource, please refer to the document of EmailServiceResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
string resourceGroupName = "MyResourceGroup";
string emailServiceName = "MyEmailServiceResource";
ResourceIdentifier emailServiceResourceId = EmailServiceResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName);
EmailServiceResource emailServiceResource = client.GetEmailServiceResource(emailServiceResourceId);

// get the collection of this CommunicationDomainResource
CommunicationDomainResourceCollection collection = emailServiceResource.GetCommunicationDomainResources();

// invoke the operation
string domainName = "AzureManagedDomain";
CommunicationDomainResourceData data = new CommunicationDomainResourceData(new AzureLocation("Global"))
{
    DomainManagement = DomainManagement.AzureManaged,
};
ArmOperation<CommunicationDomainResource> lro = await collection.CreateOrUpdateAsync(WaitUntil.Completed, domainName, data);            
CommunicationDomainResource result = lro.Value;

// the variable result is a resource, you could call other operations on this instance as well
// but just for demo, we get its data from this resource instance
CommunicationDomainResourceData resourceData = result.Data;
// for demo we just print out the id
Console.WriteLine($"Succeeded on id: {resourceData.Id}");
```

## Manage your Domain Resources

### Update a Domain resource

```csharp
...
// this example assumes you already have this CommunicationDomainResource created on azure
// for more information of creating CommunicationDomainResource, please refer to the document of CommunicationDomainResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
string resourceGroupName = "MyResourceGroup";
string emailServiceName = "MyEmailServiceResource";
string domainName = "AzureManagedDomain";
ResourceIdentifier communicationDomainResourceId = CommunicationDomainResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName, domainName);
CommunicationDomainResource communicationDomainResource = client.GetCommunicationDomainResource(communicationDomainResourceId);

// invoke the operation
CommunicationDomainResourcePatch patch = new CommunicationDomainResourcePatch()
{
    Tags =
    {
    ["newTag"] = "newVal",
    },
};
ArmOperation<CommunicationDomainResource> lro = await communicationDomainResource.UpdateAsync(WaitUntil.Completed, patch);
CommunicationDomainResource result = lro.Value;

// the variable result is a resource, you could call other operations on this instance as well
// but just for demo, we get its data from this resource instance
CommunicationDomainResourceData resourceData = result.Data;
// for demo we just print out the id
Console.WriteLine($"Succeeded on id: {resourceData.Id}");
```

### List by Email Service

```csharp
// this example assumes you already have this EmailServiceResource created on azure
// for more information of creating EmailServiceResource, please refer to the document of EmailServiceResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
string resourceGroupName = "MyResourceGroup";
string emailServiceName = "MyEmailServiceResource";
ResourceIdentifier emailServiceResourceId = EmailServiceResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName);
EmailServiceResource emailServiceResource = client.GetEmailServiceResource(emailServiceResourceId);

// get the collection of this CommunicationDomainResource
CommunicationDomainResourceCollection collection = emailServiceResource.GetCommunicationDomainResources();

// invoke the operation and iterate over the result
await foreach (CommunicationDomainResource item in collection.GetAllAsync())
{
    // the variable item is a resource, you could call other operations on this instance as well
    // but just for demo, we get its data from this resource instance
    CommunicationDomainResourceData resourceData = item.Data;
    // for demo we just print out the id
    Console.WriteLine($"Succeeded on id: {resourceData.Id}");
}

Console.WriteLine($"Succeeded");
```

### Get Domain resource

```csharp
// this example assumes you already have this EmailServiceResource created on azure
// for more information of creating EmailServiceResource, please refer to the document of EmailServiceResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
string resourceGroupName = "MyResourceGroup";
string emailServiceName = "MyEmailServiceResource";
ResourceIdentifier emailServiceResourceId = EmailServiceResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName);
EmailServiceResource emailServiceResource = client.GetEmailServiceResource(emailServiceResourceId);

// get the collection of this CommunicationDomainResource
CommunicationDomainResourceCollection collection = emailServiceResource.GetCommunicationDomainResources();

// invoke the operation
string domainName = "AzureManagedDomain";
bool result = await collection.ExistsAsync(domainName);

Console.WriteLine($"Succeeded: {result}");
```

## Clean up a Domain resource

```csharp
// this example assumes you already have this CommunicationDomainResource created on azure
// for more information of creating CommunicationDomainResource, please refer to the document of CommunicationDomainResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
string resourceGroupName = "MyResourceGroup";
string emailServiceName = "MyEmailServiceResource";
string domainName = "AzureManagedDomain";
ResourceIdentifier communicationDomainResourceId = CommunicationDomainResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName, domainName);
CommunicationDomainResource communicationDomainResource = client.GetCommunicationDomainResource(communicationDomainResourceId);

// invoke the operation
await communicationDomainResource.DeleteAsync(WaitUntil.Completed);

Console.WriteLine($"Succeeded");
```

> **Note:**
> Resource deletion is **permanent** and no data, including Event Grid filters, phone numbers, or other data tied to your resource, can be recovered if you delete the resource.



**Applies to: platform-powershell**

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install the [Azure Az PowerShell Module](https://learn.microsoft.com/powershell/azure/).
- Create an [Email Communication Service](https://learn.microsoft.com/azure/communication-services/quickstarts/email/create-email-communication-resource).

## Create a Domain resource

To create a Domain resource, sign into your Azure account using ```Connect-AzAccount``` with the following command and provide your credentials.

```PowerShell
PS C:\> Connect-AzAccount
```

First, install the Azure Communication Services module ```Az.Communication``` using the following command.

```PowerShell
PS C:\> Install-Module Az.Communication
```

Run the following command to create the Azure managed domain resource:

```PowerShell
PS C:\> New-AzEmailServiceDomain -ResourceGroupName ContosoResourceProvider1 -EmailServiceName ContosoEmailServiceResource1 -Name AzureManagedDomain -DomainManagement AzureManaged
```

You can configure your Domain resource with the following options:

* The [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-powershell.md)
* The name of the Email Communication Services resource.
* The name of the Domain resource:
	* For Azure domains, the name must be `AzureManagedDomain`.
* The value of the Domain management property.
	* For Azure domains, the value must be `AzureManaged`.

In the next step, you can assign tags to the domain resource. Tags can be used to organize your Domain resources. For more information about tags, see the [resource tagging documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/tag-resources.md).

## Manage your Domain resource

To add tags to your Domain resource, run the following commands. You can also target a specific subscription.

```PowerShell
PS C:\> Update-AzEmailServiceDomain -Name AzureManagedDomain -EmailServiceName ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1 -Tag @{ExampleKey1="ExampleValue1"}

PS C:\> Update-AzEmailServiceDomain -Name AzureManagedDomain -EmailServiceName ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1 -Tag @{ExampleKey1="ExampleValue1"} -SubscriptionId SubscriptionID
```

To list all of your Domain Resources in a given Email Communication Service, use the following command:

```PowerShell
PS C:\> Get-AzEmailServiceDomain -EmailServiceName ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1
```

To list all the information on a given domain resource, use the following command:

```PowerShell
PS C:\> Get-AzEmailServiceDomain -Name AzureManagedDomain -EmailServiceName ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1
```

## Clean up a Domain resource

If you want to clean up and remove a Domain resource, you can delete your Domain resource by running the following command:

```PowerShell
PS C:\> Remove-AzEmailServiceDomain -Name AzureManagedDomain -EmailServiceName ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1
```

> **Note:**
> Resource deletion is **permanent** and no data, including Event Grid filters, phone numbers, or other data tied to your resource, can be recovered if you delete the resource.



## Azure Managed Domains compared to Custom Domains

Before provisioning an Azure Managed Domain, review the following table to decide which domain type best meets your needs.

|  | [Azure Managed Domains](add-azure-managed-domains.md) | [Custom Domains](add-custom-verified-domains.md) |
| --- | --- | --- |
| **Pros:** | - Setup is quick & easy<br/>- No domain verification required<br /> | - Emails are sent from your own domain |
| **Cons:** | - Sender domain isn't personalized and can't be changed<br/>- Sender usernames can't be personalized<br/>- Very limited sending volume<br />- User Engagement Tracking can't be enabled <br /> | - Requires verification of domain records <br /> - Longer setup for verification |

### Service limits

Both Azure managed domains and Custom domains are subject to service limits. Service limits include failure, rate, and size limits. For more information, see [Service limits for Azure Communication Services > Email](../../concepts/service-limits.md#email).

## Sender authentication for Azure Managed Domain

Azure Communication Services automatically configures the required email authentication protocols for the email as described in [Email Authentication best practices](../../concepts/email/email-authentication-best-practice.md). 

**Your email domain is now ready to send emails.**

## Next steps

* [Quickstart: How to connect a verified email domain](connect-email-communication-resource.md)

* [How to send an email using Azure Communication Service](send-email.md)

## Related articles

* Familiarize yourself with the [Email client library](../../concepts/email/sdk-features.md).
* Review email failure limits, rate limits, and size limits in [Service limits for Azure Communication Services > Email](../../concepts/service-limits.md#email).
* Learn how to send emails with custom verified domains in [Quickstart: How to add custom verified email domains](add-custom-verified-domains.md).
