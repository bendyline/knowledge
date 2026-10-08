---
title: Create a Communication Services resource in Azure Communication Services
titleSuffix: An Azure Communication Services article
description: This article describes how to create and manage your first Azure Communication Services resource.
author: sundiraman
manager: chpalm
services: azure-communication-services
ms.author: sundraman
ms.date: 06/30/2021
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: arm
zone_pivot_groups: acs-plat-azp-azcli-net-ps
ms.devlang: azurecli 
ms.custom:
  - mode-other
  - devx-track-azurecli
  - devx-track-azurepowershell
  - sfi-ropc-nochange
---

# Create an Communication Services resource


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Get started with Azure Communication Services by provisioning your first Communication Services resource. You can provision Communication Services resources through the [Azure portal](https://portal.azure.com) or using the .NET management SDK. The management SDK and the Azure portal enable you to create, configure, update, and delete your resources and interface using the deployment and management service: [Azure Resource Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md). All functions available in the SDKs are available in the Azure portal.

>[!VIDEO https://www.youtube.com/embed/3In3o5DhOHU]

> **Warning:**
> You can't create a resource group at the same time as a resource for Azure Communication Services. Before creating a resource, you need to first create a resource group.

**Applies to: platform-azp**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

If you're planning to use phone numbers, you can't use the free trial account. Check that your subscription meets all the [requirements](../concepts/telephony/plan-solution.md) if you plan to purchase phone numbers before creating your resource. 

## Create an Azure Communication Services resource using Azure portal

To create an Azure Communication Services resource, first sign in to the [Azure portal](https://portal.azure.com). In the upper-left corner of the page, select **+ Create a resource**. 

Screenshot highlighting the Create a resource button in the Azure portal.

Enter **Communication** into either the **Search the Marketplace** input or the search bar at the top of the portal.

Screenshot showing a search for communication services in the search bar.

Select **Communication Services** in the results, and then select **Create**.

Screenshot showing the Communication Services panel, highlighting the Create button.

You can now configure your Communication Services resource. On the first page of the create process, you need to specify:

* The subscription.
* The [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-portal.md) (you can create a new one or choose an existing resource group).
* The name of the Communication Services resource.
* The geography associated with the resource.

In the next step, you can assign tags to the resource. You can use tags to organize your Azure resources. For more information about tags, see [Use tags to organize your Azure resources and management hierarchy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/tag-resources.md).

Finally, review your configuration and click **Create** to deploy the resource. Deployment takes a few minutes to complete.

## Manage your Communication Services resource

To manage your Communication Services resource, sign in to the [Azure portal](https://portal.azure.com), and search for and select **Azure Communication Services**.

On the **Communication Services** page, select the name of your resource.

The **Overview** page for your resource contains options for basic management like browse, stop, start, restart, and delete. For more configuration options, see the left menu of your resource page.



**Applies to: platform-azcli**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).

If you're planning on using phone numbers, you can't use the free trial account. Check that your subscription meets all the [requirements](../concepts/telephony/plan-solution.md) if you plan to purchase phone numbers before creating your resource. 

## Create an Azure Communication Services resource using Azure CLI

To create an Azure Communication Services resource, [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). You can sign in running the ```az login``` command from the terminal and provide your credentials.

To create the resource, run the following command:

```azurepowershell-interactive
az communication create --name "<acsResourceName>" --location "Global" --data-location "United States" --resource-group "<resourceGroup>"
```

If you would like to select a specific subscription, you can also specify the ```--subscription``` flag and provide the subscription ID.
```azurepowershell-interactive
az communication create --name "<acsResourceName>" --location "Global" --data-location "United States" --resource-group "<resourceGroup>" --subscription "<subscriptionId>"
```

You can configure your Communication Services resource with the following options:

* The [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-cli.md)
* The name of the Communication Services resource
* The geography associated with the resource

In the next step, you can assign tags to the resource. You can use tags to organize your Azure resources. For more information about tags, see [Use tags to organize your Azure resources and management hierarchy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/tag-resources.md).

## Manage your Communication Services resource

To add tags to your Communication Services resource, run the following commands. You can target a specific subscription as well.

```azurepowershell-interactive
az communication update --name "<communicationName>" --tags newTag="newVal1" --resource-group "<resourceGroup>"

az communication update --name "<communicationName>" --tags newTag="newVal2" --resource-group "<resourceGroup>" --subscription "<subscriptionId>"

az communication show --name "<communicationName>" --resource-group "<resourceGroup>"

az communication show --name "<communicationName>" --resource-group "<resourceGroup>" --subscription "<subscriptionId>"
```

For information on other commands, see [Azure Communication CLI](https://learn.microsoft.com/cli/azure/communication).



**Applies to: platform-net**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest version [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.
- Get the latest version of the [.NET Identity SDK](https://learn.microsoft.com/dotnet/api/azure.identity).
- Get the latest version of the [.NET Management SDK](../concepts/sdk-options.md).

If you plan to use phone numbers, you can't use the free trial account. Check that your subscription meets all the [requirements](../concepts/telephony/plan-solution.md) if you plan to purchase phone numbers before creating your resource. 

## Install the SDK

First, include the Communication Services Management SDK in your C# project:

```csharp
using Azure.ResourceManager.Communication;
```

## Subscription ID

You need to know the ID of your Azure subscription. Get your subscription ID from the portal:

1.  Sign in into your account on the [Azure portal](https://portal.azure.com).
2.  From the left sidebar, select **Subscriptions**.
3.  Select the subscription you want to use.
4.  Click **Overview**.
5.  Select your Subscription ID.

For the examples to work, you need to store your subscription ID in an environment variable called `AZURE_SUBSCRIPTION_ID`.

## Authentication

To communicate with Azure Communication Services, you must first authenticate yourself to Azure. You can authenticate this using a service principal identity.

### Option 1: Managed Identity

If your code is running as a service in Azure, the easiest way to authenticate is to acquire a managed identity from Azure. For more information, see:

- [Managed identities overview](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview).

- [Azure services that support Managed Identities](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/managed-identities-status).

- [How to use managed identities for App Service and Azure Functions](../../app-service/overview-managed-identity.md?tabs=dotnet).

#### [System-assigned Managed Identity](../../app-service/overview-managed-identity.md?tabs=dotnet#add-a-system-assigned-identity)

```csharp
using Azure.Identity;
using Azure.ResourceManager.Communication;
using Azure.ResourceManager.Communication.Models;
using System;
...
var subscriptionId = "AZURE_SUBSCRIPTION_ID";
var acsClient = new CommunicationManagementClient(subscriptionId, new ManagedIdentityCredential());
```

#### [User-assigned Managed Identity](../../app-service/overview-managed-identity.md?tabs=dotnet#add-a-user-assigned-identity)

ClientId of the managed identity that you created must be passed to the `ManagedIdentityCredential` explicitly.

```csharp
using Azure.Identity;
using Azure.ResourceManager.Communication;
using Azure.ResourceManager.Communication.Models;
using System;
...
var subscriptionId = "AZURE_SUBSCRIPTION_ID";
var managedIdentityCredential = new ManagedIdentityCredential("AZURE_CLIENT_ID");
var acsClient = new CommunicationManagementClient(subscriptionId, managedIdentityCredential);
```

### Option 2: Service Principal

Instead of using a managed identity, you can authenticate to Azure using a service principal that you manage. For more information, see [creating and managing a service principal in Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal).

After you create your service principal, you need to collect the following information about it from the Azure portal:

- **Client ID**
- **Client Secret**
- **Tenant ID**

Store these values as environment variables named `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, and `AZURE_TENANT_ID`, respectively. You can then create a Communication Services management client like this:

```csharp
using Azure.Identity;
using Azure.ResourceManager.Communication;
using Azure.ResourceManager.Communication.Models;
using System;
...
var subscriptionId = Environment.GetEnvironmentVariable("AZURE_SUBSCRIPTION_ID");
var acsClient = new CommunicationManagementClient(subscriptionId, new EnvironmentCredential());
```

### Option 3: User Identity

If you want to call Azure on behalf of an interactive user, rather than using a service identity, you can use the following code to create an Azure Communication Services Management client. This opens a browser window to prompt the user for their MSA or Microsoft Entra credentials.

```csharp
using Azure.Identity;
using Azure.ResourceManager.Communication;
using Azure.ResourceManager.Communication.Models;
using System;
...
var subscriptionId = Environment.GetEnvironmentVariable("AZURE_SUBSCRIPTION_ID");
var communicationServiceClient = new CommunicationManagementClient(subscriptionId, new InteractiveBrowserCredential());
```

## Manage Communication Services resources

### Interact with Azure resources

Once you authenticate, you can use your management client to make API calls.

For each of the following examples, we assign our Communication Services resources to an existing resource group.

If you need to create a resource group, you can use the [Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-portal.md) or the [Azure Resource Manager SDK](https://github.com/Azure/azure-sdk-for-net/blob/master/doc/mgmt_preview_quickstart.md).

### Create and manage a Communication Services resource

You can use the instance of the Communication Services Management SDK client (``Azure.ResourceManager.Communication.CommunicationManagementClient``) to perform operations on Communication Services resources.

#### Create a Communication Services resource

When creating a Communication Services resource, specify the resource group name and resource name. The `Location` property is always `global`, and during public preview the `DataLocation` value must be `UnitedStates`.

```csharp
var resourceGroupName = "myResourceGroupName";
var resourceName = "myResource";
var resource = new CommunicationServiceResource { Location = "Global", DataLocation = "UnitedStates"  };
var operation = await acsClient.CommunicationService.StartCreateOrUpdateAsync(resourceGroupName, resourceName, resource);
await operation.WaitForCompletionAsync();
```

#### Update a Communication Services resource

```csharp
...
var resourceGroupName = "myResourceGroupName";
var resourceName = "myResource";
var resource = new CommunicationServiceResource { Location = "Global", DataLocation = "UnitedStates" };
resource.Tags.Add("environment","test");
resource.Tags.Add("department","tech");
// Use existing resource name and new resource object
var operation = await acsClient.CommunicationService.StartCreateOrUpdateAsync(resourceGroupName, resourceName, resource);
await operation.WaitForCompletionAsync();
```

#### List all Communication Services resources

```csharp
var resources = acsClient.CommunicationService.ListBySubscription();
foreach (var resource in resources)
{
    Console.WriteLine(resource.Name);
}
```

#### Delete a Communication Services resource

```csharp
var resourceGroupName = "myResourceGroupName";
var resourceName = "myResource";
await acsClient.CommunicationService.StartDeleteAsync(resourceGroupName, resourceName);
```

## Managing keys and connection strings

Every Communication Services resource has a pair of access keys and corresponding connection strings. You can access these keys using the Management SDK and then make them available to other Communication Services SDKs to authenticate themselves to Azure Communication Services.

#### Get access keys for a Communication Services resource

```csharp
var resourceGroupName = "myResourceGroupName";
var resourceName = "myResource";
var keys = await acsClient.CommunicationService.ListKeysAsync(resourceGroupName, resourceName);

Console.WriteLine(keys.Value.PrimaryConnectionString);
Console.WriteLine(keys.Value.SecondaryConnectionString);
```

#### Regenerate an access key for a Communication Services resource

```csharp
var resourceGroupName = "myResourceGroupName";
var resourceName = "myResource";
var keyParams = new RegenerateKeyParameters { KeyType = KeyType.Primary };
var keys = await acsClient.CommunicationService.RegenerateKeyAsync(resourceGroupName, resourceName, keyParams);

Console.WriteLine(keys.Value.PrimaryKey);
```



**Applies to: platform-powershell**

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install the [Azure Az PowerShell Module](https://learn.microsoft.com/powershell/azure/).

If you're planning on using phone numbers, you can't use the free trial account. Check that your subscription meets all the [requirements](../concepts/telephony/plan-solution.md) if you plan to purchase phone numbers before creating your resource. 

## Create an Azure Communication Services resource using PowerShell

To create an Azure Communication Services resource, [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). You can create a resource through the terminal using the ```Connect-AzAccount``` command and providing your credentials.

First, install the Azure Communication Services module ```Az.Communication``` using the following command.

```PowerShell
PS C:\> Install-Module Az.Communication
```

To create the resource, run the following command:

```PowerShell
PS C:\> New-AzCommunicationService -ResourceGroupName ContosoResourceProvider1 -Name ContosoAcsResource1 -DataLocation UnitedStates -Location Global
```

If you would like to select a specific subscription you can also specify the ```--subscription``` flag and provide the subscription ID.
```PowerShell
PS C:\> New-AzCommunicationService -ResourceGroupName ContosoResourceProvider1 -Name ContosoAcsResource1 -DataLocation UnitedStates -Location Global -SubscriptionId SubscriptionID
```

You can configure your Communication Services resource with the following options:

* The [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-powershell.md)
* The name of the Communication Services resource
* The geography to associate with the resource

In the next step, you can assign tags to the resource. You can use tags to organize your Azure resources. For more information, see [Use tags to organize your Azure resources and management hierarchy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/tag-resources.md).

## Manage your Communication Services resource

To add tags to your Communication Services resource, run the following commands. You can also target a specific subscription.

```PowerShell
PS C:\> Update-AzCommunicationService -Name ContosoAcsResource1 -ResourceGroupName ContosoResourceProvider1 -Tag @{ExampleKey1="ExampleValue1"}

PS C:\> Update-AzCommunicationService -Name ContosoAcsResource1 -ResourceGroupName ContosoResourceProvider1 -Tag @{ExampleKey1="ExampleValue1"} -SubscriptionId SubscriptionID
```

To list all your Azure Communication Services Resources for a given subscription, use the following command:

```PowerShell
PS C:\> Get-AzCommunicationService -SubscriptionId SubscriptionID
```

To list all the information on a given resource use the following command:

```PowerShell
PS C:\> Get-AzCommunicationService -Name ContosoAcsResource1 -ResourceGroupName ContosoResourceProvider1
```



## Access your connection strings and service endpoints

Connection strings enable the Communication Services SDKs to connect and authenticate to Azure. You can access your Communication Services connection strings and service endpoints from the Azure portal or programmatically with Azure Resource Manager APIs.

After navigating to your Communication Services resource, select **Keys** from the navigation menu and copy the **Connection string** or **Endpoint** values for usage by the Communication Services SDKs. You have access to primary and secondary keys. These keys are useful when you want to provide temporary access to your Communication Services resources to a third-party or staging environment.

Screenshot of Communication Services Key page.

### Access your connection strings and service endpoints using Azure CLI

You can also access key information using Azure CLI, like your resource group or the keys for a specific resource.

Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli) and use the following command to sign in. You need to provide your credentials to connect with your Azure account.

```azurepowershell-interactive
az login
```

Now you can access important information about your resources.

```azurepowershell-interactive
az communication list --resource-group "<resourceGroup>"

az communication list-key --name "<acsResourceName>" --resource-group "<resourceGroup>"
```

If you would like to select a specific subscription, you can also specify the ```--subscription``` flag and provide the subscription ID.

```azurepowershell-interactive
az communication list --resource-group  "<resourceGroup>"  --subscription "<subscriptionId>"

az communication list-key --name "<acsResourceName>" --resource-group "<resourceGroup>" --subscription "<subscriptionId>"
```

## Store your connection string

Communication Services SDKs use connection strings to authorize requests made to Communication Services. You have several options for storing your connection string:

* An application running on the desktop or on a device can store the connection string in an **app.config** or **web.config** file. Add the connection string to the **AppSettings** section in these files.
* An application running in an Azure App Service can store the connection string in the [App Service application settings](../../app-service/configure-common.md). Add the connection string to the **Connection Strings** section of the Application Settings tab within the portal.
* You can store your connection string in [Azure Key Vault](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/store-credentials-in-key-vault.md). You can further securely [manage your connection string](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md).
* If you're running your application locally, you may want to store your connection string in an environment variable.

### Store your connection string in an environment variable

To configure an environment variable, open a console window and select your operating system from the following tabs. Replace `<yourconnectionstring>` with your actual connection string.

#### [Windows](#tab/windows)

Open a console window and enter the following command:

```console
setx COMMUNICATION_SERVICES_CONNECTION_STRING "<yourConnectionString>"
```

After you add the environment variable, you may need to restart any running programs that read the environment variable, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [macOS](#tab/unix)

Edit your **`.zshrc`** file, and add the environment variable:

```bash
export COMMUNICATION_SERVICES_CONNECTION_STRING="<yourConnectionString>"
```

After you add the environment variable, run `source ~/.zshrc` from your console window to make the changes effective. If you created the environment variable with your IDE open, you may need to close and reopen the editor, IDE, or shell to access the variable.

#### [Linux](#tab/linux)

Edit your **`.bash_profile`** file, and add the environment variable:

```bash
export COMMUNICATION_SERVICES_CONNECTION_STRING="<yourConnectionString>"
```

After you add the environment variable, run `source ~/.bash_profile` from your console window to make the changes effective. If you created the environment variable with your IDE open, you may need to close and reopen the editor, IDE, or shell to access the variable.

---

## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. To delete your communication resource, run the following command.

```azurecli-interactive
az communication delete --name "acsResourceName" --resource-group "resourceGroup"
```

[Deleting the resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-portal.md#delete-resource-groups) also deletes any other resources associated with it.

If you have any phone numbers assigned to your resource upon resource deletion, the phone numbers are automatically released from your resource at the same time.

> **Note:**
> Resource deletion is **permanent**. If you delete the resource, no deleted data can be recovered, including Event Grid filters, phone numbers, or other data tied to your resource.

## Next steps

This article described how to:

> 
>
> * Create a Communication Services resource
> * Configure resource geography and tags
> * Access the keys for that resource
> * Delete the resource

> 
> [Create your first user access tokens](identity/access-tokens.md)
