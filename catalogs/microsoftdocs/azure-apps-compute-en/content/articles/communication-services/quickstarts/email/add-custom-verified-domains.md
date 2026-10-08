---
title: Add custom verified email domains
titleSuffix: An Azure Communication Services article
description: This article describes how to add custom verified email domains in Azure Communication Services.
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

# Add custom verified email domains


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to provision a custom verified email domain in Azure Communication Services.

**Applies to: platform-azp**

## Prerequisites

- An Azure account with an active subscription. See [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Communication Services Email Resource created and ready to add the domains. See [Create and manage Email Communication Service resources](create-email-communication-resource.md).

## Provision a custom domain

To provision a custom domain, you need to:
    
* Verify the custom domain ownership by adding a TXT record in your Domain Name System (DNS).
* Configure the sender authentication by adding Sender Policy Framework (SPF) and DomainKeys Identified Mail (DKIM) records.

### Verify custom domain

In this section, you verify the custom domain ownership by adding a TXT record in your DNS.

1. Open the Overview page of the Email Communication Service resource that you created in [Create and manage Email Communication Service resources](create-email-communication-resource.md).
2. Create a custom domain using one of the following options.
    - (Option 1) Click the **Setup** button under **Setup a custom domain**. Continue to **step 3**.

      Screenshot that shows how to set up a custom domain.

    - (Option 2) Click **Provision Domains** on the left navigation panel.
    
        Screenshot that shows the navigation link to Provision Domains page.

    - Click **Add domain** on the upper navigation bar.
    - Select **Custom domain** from the dropdown.
3. Click **Add a custom Domain**.
4. Enter your domain name in the text box.
5. Reenter your domain name in the next text box.
6. Click **Confirm**.

    Screenshot that shows where to enter the custom domain value.

7. Make sure the domain name you entered is correct and both text boxes are the same. If needed, click **Edit** to correct the domain name before confirming.
8. Click **Add**.

    Screenshot that shows how to add a custom domain of your choice.

9. Azure Communication Services creates a custom domain configuration for your domain.

    Screenshot that shows the progress of custom domain Deployment.

10. To verify domain ownership, click **Verify Domain**.

    Screenshot that shows custom domain is successfully added for verification.

11. To resume the verification later, click **Close** and resume. Then to continue verification from Provision Domains, click **Configure**.

    Screenshot that shows the added domain ready for verification in the list of provisioned domains.

12. When you select either **Verify Domain** or **Configure**, it opens the **Verify Domain via TXT record** dialog box.

    Screenshot that shows the Configure link that you need to click to verify domain ownership.

13. Add the preceding TXT record to your domain's registrar or DNS hosting provider. Refer to the [TXT records](#txt-records) section for information about adding a TXT record for your DNS provider.
   
    Once you complete this step, click **Next**.
   
14. Verify that the TXT record was successfully created in your DNS, then click **Done**.
15. DNS changes require 15 to 30 minutes to take effect. Click **Close**.

    Screenshot that shows the domain verification is in progress.

16. Once you verify your domain, you can add your SPF and DKIM records to authenticate your domains. 

    Screenshot that shows the custom domain is verified.
    
### Configure sender authentication for custom domain

To configure sender authentication for your domains, you need to add more Domain Name Service (DNS) records. This section describes how Azure Communication Services offer records for you to add to your DNS. However, depending on whether the domain you're registering is a root domain or a subdomain, you need to add the records to the respective zone or make changes to the automatically generated records.

This section shows how to add SPF and DKIM records for the custom domain **sales.us.notification.azurecommtest.net**. The following examples describe four different methods for adding these records to the DNS, depending on the level of the zone where you're adding the records.

1. Zone: **sales.us.notification.azurecommtest.net**

  | Record | Type | Name | Value |
  | --- | --- | --- | --- |
  | SPF | TXT | sales.us.notification.azurecommtest.net | v=spf1 include:spf.protection.outlook.com -all |
  | DKIM | CNAME | selector1-azurecomm-prod-net._domainkey | selector1-azurecomm-prod-net._domainkey.azurecomm.net |
  | DKIM2 | CNAME | selector2-azurecomm-prod-net._domainkey | selector2-azurecomm-prod-net._domainkey.azurecomm.net |

The records generated by the portal assume that you are adding these records to the DNS in this zone **sales.us.notification.azurecommtest.net**.

2. Zone: **us.notification.azurecommtest.net**

  | Record | Type | Name | Value |
  | --- | --- | --- | --- |
  | SPF | TXT | sales | v=spf1 include:spf.protection.outlook.com -all |
  | DKIM | CNAME | selector1-azurecomm-prod-net._domainkey.**sales** | selector1-azurecomm-prod-net._domainkey.azurecomm.net |
  | DKIM2 | CNAME | selector2-azurecomm-prod-net._domainkey.**sales** | selector2-azurecomm-prod-net._domainkey.azurecomm.net |
          
3. Zone: **notification.azurecommtest.net**

  | Record | Type | Name | Value |
  | --- | --- | --- | --- |
  | SPF | TXT | sales.us | v=spf1 include:spf.protection.outlook.com -all |
  | DKIM | CNAME | selector1-azurecomm-prod-net._domainkey.**sales.us** | selector1-azurecomm-prod-net._domainkey.azurecomm.net |
  | DKIM2 | CNAME | selector2-azurecomm-prod-net._domainkey.**sales.us** | selector2-azurecomm-prod-net._domainkey.azurecomm.net |

4. Zone: **azurecommtest.net**

  | Record | Type | Name | Value |
  | --- | --- | --- | --- |
  | SPF | TXT | sales.us.notification | v=spf1 include:spf.protection.outlook.com -all |
  | DKIM | CNAME | selector1-azurecomm-prod-net._domainkey.**sales.us.notification** | selector1-azurecomm-prod-net._domainkey.azurecomm.net |
  | DKIM2 | CNAME | selector2-azurecomm-prod-net._domainkey.**sales.us.notification** | selector2-azurecomm-prod-net._domainkey.azurecomm.net |
  

### Add SPF and DKIM Records 

In this section, you configure the sender authentication by adding Sender Policy Framework (SPF) and DomainKeys Identified Mail (DKIM) records.

1. Open **Provision Domains** and confirm that  **Domain Status** is in the `Verified` state. 
2. To add SPF and DKIM information, click **Configure**.
3. Add the following TXT record and CNAME records to your domain's registrar or DNS hosting provider. For more information about adding a TXT and CNAME record for your DNS provider, see [adding DNS records in popular domain registrars table](#cname-records).
 
    Screenshot that shows the D N S records that you need to add for S P F validation for your verified domains.
    Screenshot that shows the D N S records that you need to add for D K I M.
    Screenshot that shows the D N S records that you need to add for additional D K I M records.

4. When you're done adding TXT and CNAME information, click **Next** to continue.

4. Verify that TXT and CNAME records were successfully created in your DNS. Then click **Done**.
 
    Screenshot that shows the DNS records that you need to add for S P F and D K I M.

5. DNS changes take effect in 15 to 30 minutes. Click **Close** and wait for verification to complete.

    Screenshot that shows that the sender authentication verification is in progress.
    
6. Check the verification status at the **Provision Domains** page.

    Screenshot that shows that the sender authentication verification is done.
 
7. Once you verify sender authentication configurations, your email domain is ready to send emails using the custom domain.

   Screenshot that shows that your verified custom domain is ready to send Email.



**Applies to: platform-azcli**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).
- Create an [Email Communication Service](https://learn.microsoft.com/azure/communication-services/quickstarts/email/create-email-communication-resource).

## Provision a custom domain

To provision a custom domain, you need to:
    
* Verify the custom domain ownership by adding a TXT record in your Domain Name System (DNS).
* Configure the sender authentication by adding Sender Policy Framework (SPF) and DomainKeys Identified Mail (DKIM) records.

## Create Domain resource

To create a Domain resource, [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). Sign in by running the ```az login``` command from the terminal and providing your credentials. To create the resource, run the following command:

```azurepowershell-interactive
az communication email domain create --domain-name "contoso.com" --email-service-name "<EmailServiceName>" --location "Global" --resource-group "<resourceGroup>" --domain-management CustomerManaged
```

If you want to select a specific subscription, you can also specify the ```--subscription``` flag and provide the subscription ID.

```azurepowershell-interactive
az communication email domain create --domain-name "contoso.com" --email-service-name "<EmailServiceName>" --location "Global" --resource-group "<resourceGroup>" --domain-management CustomerManaged --subscription "<subscriptionId>"
```

You can configure your Domain resource with the following options:

* The [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-cli.md)
* The name of the Email Communication Services resource.
* The geography to associate with the resource.
* The name of the Domain resource.
* The value of the Domain management property.
	* For Custom domains, the value must be `CustomerManaged`.

In the next step, you can assign tags or update user engagement tracking to the domain resource. You can use tags to organize your Domain resources. For more information about tags, see the [resource tagging documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/tag-resources.md).

## Manage your Domain resource

To add tags or update user engagement tracking to your Domain resource, run the following commands. You can also target a specific subscription.

```azurepowershell-interactive
az communication email domain update --domain-name "contoso.com" --email-service-name "<EmailServiceName>" --resource-group "<resourceGroup>" --tags newTag="newVal1" --user-engmnt-tracking Enabled

az communication email domain update --domain-name "contoso.com" --email-service-name "<EmailServiceName>" --resource-group "<resourceGroup>" --tags newTag="newVal1" --user-engmnt-tracking Disabled --subscription "<subscriptionId>"
```

To list all of your Domain Resources in a given Email Communication Service, use the following command:

```azurepowershell-interactive
az communication email domain list --email-service-name "<EmailServiceName>" --resource-group "<resourceGroup>"
```
To show all the information on a given domain resource use the following command:

```azurepowershell-interactive
az communication email domain show --domain-name "contoso.com" --email-service-name "<EmailServiceName>" --resource-group "<resourceGroup>"
```

## Verification operation for your Domain resource

To configure sender authentication for your domains, see the **Configure sender authentication for custom domain** section from the Azure portal tab.

### Initiate Verification

To Initiate domain verification, run the following command:

```azurepowershell-interactive
az communication email domain initiate-verification --domain-name "contoso.com" --email-service-name "<EmailServiceName>" --resource-group "<resourceGroup>" --verification-type Domain
```

### Cancel Verification

To Cancel domain verification, run the following command:

```azurepowershell-interactive
az communication email domain cancel-verification --domain-name "contoso.com" --email-service-name "<EmailServiceName>" --resource-group "<resourceGroup>" --verification-type Domain
```

## Clean up a Domain resource

If you want to clean up and remove a Domain resource, you can delete by running the following command.

```azurepowershell-interactive
az communication email domain delete --domain-name "contoso.com" --email-service-name "<EmailServiceName>" --resource-group "<resourceGroup>"
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

## Provision a custom domain

To provision a custom domain, you need to:

* Verify the custom domain ownership by adding a TXT record in your Domain Name System (DNS).
* Configure the sender authentication by adding Sender Policy Framework (SPF) and DomainKeys Identified Mail (DKIM) records.

## Installing the SDK

First, include the Communication Services Management SDK in your C# project:

```csharp
using Azure.ResourceManager.Communication;
```

## Subscription ID

You need to know the ID of your Azure subscription. You can get your ID from the portal:

1.  Sign in into your Azure account.
2.  Select **Subscriptions** in the left sidebar.
3.  Select whichever subscription is needed.
4.  Click **Overview**.
5.  Select your Subscription ID.

This example assumes that you stored the subscription ID in an environment variable called `AZURE_SUBSCRIPTION_ID`.

## Authentication

To communicate with Domain resource, you must first authenticate yourself to Azure.

### Authenticate the Client

The default option to create an authenticated client is to use `DefaultAzureCredential`. Since all management APIs go through the same endpoint, in order to interact with resources, You only need to create one top-level `ArmClient`.

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

When creating a Domain resource, specify the resource group name, Email Communication Service name, resource name, and DomainManagement.

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
string domainName = "contoso.com";
CommunicationDomainResourceData data = new CommunicationDomainResourceData(new AzureLocation("Global"))
{
    DomainManagement = DomainManagement.CustomerManaged,
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
string domainName = "contoso.com";
ResourceIdentifier communicationDomainResourceId = CommunicationDomainResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName, domainName);
CommunicationDomainResource communicationDomainResource = client.GetCommunicationDomainResource(communicationDomainResourceId);

// invoke the operation
CommunicationDomainResourcePatch patch = new CommunicationDomainResourcePatch()
{
    UserEngagementTracking = UserEngagementTracking.Enabled,
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
string domainName = "contoso.com";
bool result = await collection.ExistsAsync(domainName);

Console.WriteLine($"Succeeded: {result}");
```

## Verification operation for your Domain resource

To configure sender authentication for your domains, see the **Configure sender authentication for custom domain** section from the Azure portal tab.

### Initiate Verification

```csharp
// this example assumes you already have this CommunicationDomainResource created on azure
// for more information of creating CommunicationDomainResource, please refer to the document of CommunicationDomainResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
string resourceGroupName = "MyResourceGroup";
string emailServiceName = "MyEmailServiceResource";
string domainName = "contoso.com";
ResourceIdentifier communicationDomainResourceId = CommunicationDomainResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName, domainName);
CommunicationDomainResource communicationDomainResource = client.GetCommunicationDomainResource(communicationDomainResourceId);

// invoke the operation
DomainsRecordVerificationContent content = new DomainsRecordVerificationContent(DomainRecordVerificationType.Spf);
await communicationDomainResource.InitiateVerificationAsync(WaitUntil.Completed, content);

Console.WriteLine($"Succeeded");
```

### Cancel Verification

```csharp
// this example assumes you already have this CommunicationDomainResource created on azure
// for more information of creating CommunicationDomainResource, please refer to the document of CommunicationDomainResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
string resourceGroupName = "MyResourceGroup";
string emailServiceName = "MyEmailServiceResource";
string domainName = "contoso.com";
ResourceIdentifier communicationDomainResourceId = CommunicationDomainResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName, domainName);
CommunicationDomainResource communicationDomainResource = client.GetCommunicationDomainResource(communicationDomainResourceId);

// invoke the operation
DomainsRecordVerificationContent content = new DomainsRecordVerificationContent(DomainRecordVerificationType.Spf);
await communicationDomainResource.CancelVerificationAsync(WaitUntil.Completed, content);

Console.WriteLine($"Succeeded");
```


## Clean up a Domain resource

```csharp
// this example assumes you already have this CommunicationDomainResource created on azure
// for more information of creating CommunicationDomainResource, please refer to the document of CommunicationDomainResource
string subscriptionId = "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e";
string resourceGroupName = "MyResourceGroup";
string emailServiceName = "MyEmailServiceResource";
string domainName = "contoso.com";
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

## Provision a custom domain

To provision a custom domain, you need to:
    
* Verify the custom domain ownership by adding a TXT record in your Domain Name System (DNS).
* Configure the sender authentication by adding Sender Policy Framework (SPF) and DomainKeys Identified Mail (DKIM) records.

## Create a Domain resource

To create a Domain resource, sign into your Azure account using the ```Connect-AzAccount``` and the following command and provide your credentials.

```PowerShell
PS C:\> Connect-AzAccount
```

First, install the Azure Communication Services module ```Az.Communication``` using the following command.

```PowerShell
PS C:\> Install-Module Az.Communication
```

Run the following command to create the Custom managed domain resource:

```PowerShell
PS C:\> New-AzEmailServiceDomain -ResourceGroupName ContosoResourceProvider1 -EmailServiceName ContosoEmailServiceResource1 -Name contoso.com -DomainManagement CustomerManaged
```

You can configure your Domain resource with the following options:

* The [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-powershell.md)
* The name of the Email Communication Services resource.
* The name of the Domain resource.
* The value of the Domain management property.
	* For Custom domains, the value should be `CustomerManaged`.

In the next step, assign tags or update user engagement tracking to the domain resource. You can use tags to organize your Domain resources. For more information about tags, see [resource tagging documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/tag-resources.md).

## Manage your Domain resource

To add tags or update user engagement tracking to your Domain resource, run the following commands. You can also target a specific subscription.

```PowerShell
PS C:\> Update-AzEmailServiceDomain -Name contoso.com -EmailServiceName ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1 -Tag @{ExampleKey1="ExampleValue1"} -UserEngagementTracking 1

PS C:\> Update-AzEmailServiceDomain -Name contoso.com -EmailServiceName ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1 -Tag @{ExampleKey1="ExampleValue1"} -UserEngagementTracking 0 -SubscriptionId SubscriptionID
```

To list all of your Domain Resources in a given Email Communication Service, use the following command:

```PowerShell
PS C:\> Get-AzEmailServiceDomain -EmailServiceName ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1
```

To list all the information on a given domain resource, use the following command:

```PowerShell
PS C:\> Get-AzEmailServiceDomain -Name contoso.com -EmailServiceName ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1
```

## Verification operation for your Domain resource

To configure sender authentication for your domains, refer Configure sender authentication for custom domain section from the Azure portal tab.

### Initiate Verification

To Invoke domain verification, run the following command:

```PowerShell
PS C:\> Invoke-AzEmailServiceInitiateDomainVerification -DomainName contoso.com -EmailServiceName ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1 -VerificationType Domain
```

### Cancel Verification

To Stop domain verification, run the following command:

```PowerShell
PS C:\> Stop-AzEmailServiceDomainVerification -DomainName contoso.com -EmailServiceName ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1 -VerificationType Domain
```

## Clean up a Domain resource

If you want to clean up and remove a Domain resource, you can delete your Domain resource by running the following command:

```PowerShell
PS C:\> Remove-AzEmailServiceDomain -Name contoso.com -EmailServiceName ContosoEmailServiceResource1 -ResourceGroupName ContosoResourceProvider1
```

> **Note:**
> Resource deletion is **permanent** and no data, including Event Grid filters, phone numbers, or other data tied to your resource, can be recovered if you delete the resource.



## Azure Managed Domains compared to Custom Domains

Before provisioning a custom email domain, review the following table to decide which domain type best meets your needs.

|  | [Azure Managed Domains](add-azure-managed-domains.md) | [Custom Domains](add-custom-verified-domains.md) |
| --- | --- | --- |
| **Pros:** | - Setup is quick & easy<br/>- No domain verification required<br /> | - Emails are sent from your own domain |
| **Cons:** | - Sender domain isn't personalized and can't be changed<br/>- Sender usernames can't be personalized<br/>- Limited sending volume<br />- User Engagement Tracking can't be enabled<br /> | - Requires verification of domain records<br /> - Longer setup for verification |

### Service limits

Both Azure managed domains and Custom domains are subject to service limits. Service limits include failure, rate, and size limits. For more information, see [Service limits for Azure Communication Services > Email](../../concepts/service-limits.md#email).

## Change MailFrom and FROM display names for custom domains

You can optionally configure your `MailFrom` address to be something other than the default `DoNotReply` and add more than one sender username to your domain. For more information about how to configure your sender address, see [Quickstart: How to add multiple sender addresses](add-multiple-senders.md).

**Your email domain is now ready to send emails.**

## Add DNS records in popular domain registrars

### TXT records

The following links provide instructions about how to add a TXT record using popular domain registrars.

| Registrar Name | Documentation Link |
| --- | --- |
| IONOS by 1 & 1 | [Steps 1-7](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-1-1-internet?view=o365-worldwide#:~\:text=Add%20a%20TXT%20record%20for%20verification,created%20can%20update%20across%20the%20Internet.\&preserve-view=true) |
| 123-reg.co.uk | [Steps 1-6](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-123-reg-co-uk?view=o365-worldwide#:~\:text=DNS%20records.-,Add%20a%20TXT%20record%20for%20verification,that%20the%20record%20you%20just%20created%20can%20update%20across%20the%20Internet.,-Now%20that%20you%27ve\&preserve-view=true) |
| Amazon Web Services (AWS) | [Steps 1-8](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-aws?view=o365-worldwide#:~\:text=DNS%20records.-,Add%20a%20TXT%20record%20for%20verification,that%20the%20record%20you%20just%20created%20can%20update%20across%20the%20Internet.,-Now%20that%20you%27ve\&preserve-view=true) |
| Cloudflare | [Steps 1-6](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-cloudflare?view=o365-worldwide#:~\:text=Add%20a%20TXT,across%20the%20Internet.\&preserve-view=true) |
| GoDaddy | [Steps 1-6](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-godaddy?view=o365-worldwide#:~\:text=Add%20a%20TXT,across%20the%20Internet.\&preserve-view=true) |
| Namecheap | [Steps 1-9](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-namecheap?view=o365-worldwide#:~\:text=DNS%20records.-,Add%20a%20TXT%20record%20for%20verification,that%20the%20record%20you%20just%20created%20can%20update%20across%20the%20Internet.,-Now%20that%20you%27ve\&preserve-view=true) |
| Network Solutions | [Steps 1-9](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-network-solutions?view=o365-worldwide#:~\:text=DNS%20records.-,Add%20a%20TXT%20record%20for%20verification,that%20the%20record%20you%20just%20created%20can%20update%20across%20the%20Internet,-.\&preserve-view=true) |
| OVH | [Steps 1-9](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-ovh?view=o365-worldwide#:~\:text=DNS%20records.-,Add%20a%20TXT%20record%20for%20verification,that%20the%20record%20you%20just%20created%20can%20update%20across%20the%20Internet.,-Now%20that%20you%27ve\&preserve-view=true) |
| web.com | [Steps 1-8](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-web-com?view=o365-worldwide#:~\:text=with%20your%20domain.-,Add%20a%20TXT%20record%20for%20verification,that%20the%20record%20you%20just%20created%20can%20update%20across%20the%20Internet,-.\&preserve-view=true) |
| Wix | [Steps 1-5](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-wix?view=o365-worldwide#:~\:text=DNS%20records.-,Add%20a%20TXT%20record%20for%20verification,that%20the%20record%20you%20just%20created%20can%20update%20across%20the%20Internet,-.\&preserve-view=true) |
| Other (General) | [Steps 1-4](https://learn.microsoft.com/microsoft-365/admin/get-help-with-domains/create-dns-records-at-any-dns-hosting-provider?view=o365-worldwide#:~\:text=Recommended%3A%20Verify%20with,domain%20is%20verified.\&preserve-view=true) |

### CNAME records

The following links provide more information about how to add a CNAME record using popular domain registrars. Make sure to use your values from the configuration window rather than the examples in the documentation link.

| Registrar Name | Documentation Link |
| --- | --- |
| IONOS by 1 & 1 | [Steps 1-10](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-1-1-internet?view=o365-worldwide#:~\:text=Add%20the%20CNAME,Select%20Save.\&preserve-view=true) |
| 123-reg.co.uk | [Steps 1-6](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-123-reg-co-uk?view=o365-worldwide#:~\:text=for%20that%20record.-,Add%20the%20CNAME%20record%20required%20for%20Microsoft,Select%20Add.,-Add%20a%20TXT\&preserve-view=true) |
| Amazon Web Services (AWS) | [Steps 1-8](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-aws?view=o365-worldwide#:~\:text=selecting%20Delete.-,Add%20the%20CNAME%20record%20required%20for%20Microsoft%20365,Select%20Create%20records.,-Add%20a%20TXT\&preserve-view=true) |
| Cloudflare | [Steps 1-6](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-cloudflare?view=o365-worldwide#:~\:text=Add%20the%20CNAME,Select%20Save.\&preserve-view=true) |
| GoDaddy | [Steps 1-6](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-godaddy?view=o365-worldwide#:~\:text=Add%20the%20CNAME,Select%20Save.\&preserve-view=true) |
| Namecheap | [Steps 1-8](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-namecheap?view=o365-worldwide#:~\:text=in%20this%20procedure.-,Add%20the%20CNAME%20record%20required%20for%20Microsoft,Select%20the%20Save%20Changes%20\(check%20mark\)%20control.,-Add%20a%20TXT\&preserve-view=true) |
| Network Solutions | [Steps 1-9](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-network-solutions?view=o365-worldwide#:~\:text=for%20each%20record.-,Add%20the%20CNAME%20record%20required%20for%20Microsoft,View%20in%20the%20upper%20right%20to%20view%20the%20record%20you%20created.,-Add%20a%20TXT\&preserve-view=true) |
| OVH | [Steps 1-8](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-ovh?view=o365-worldwide#add-the-cname-record-required-for-microsoft:~\:text=Select%20Confirm.-,Add%20the%20CNAME%20record%20required%20for%20Microsoft,Select%20Confirm.,-Add%20a%20TXT\&preserve-view=true) |
| web.com | [Steps 1-8](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-web-com?view=o365-worldwide#add-the-cname-record-required-for-microsoft:~\:text=for%20each%20record.-,Add%20the%20CNAME%20record%20required%20for%20Microsoft,Select%20ADD.,-Add%20a%20TXT\&preserve-view=true) |
| Wix | [Steps 1-5](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-at-wix?view=o365-worldwide#add-the-cname-record-required-for-microsoft:~\:text=Select%20Save.-,Add%20the%20CNAME%20record%20required%20for%20Microsoft,that%20the%20record%20you%20just%20created%20can%20update%20across%20the%20Internet.,-Add%20a%20TXT\&preserve-view=true) |
| Other (General) | [Guide](https://learn.microsoft.com/microsoft-365/admin/dns/create-dns-records-using-windows-based-dns?view=o365-worldwide#add-cname-records:~\:text=%3E%20OK.-,Add%20CNAME%20records,Select%20OK.,-Add%20the%20SIP\&preserve-view=true) |

## Next steps

* [Get started by connecting Email Communication Service with an Azure Communication Service resource](connect-email-communication-resource.md)

* [How to send an email using Azure Communication Services](send-email.md)


## Related articles

* Familiarize yourself with the [Email client library](../../concepts/email/sdk-features.md)
* Review email failure limits, rate limits, and size limits in [Service limits for Azure Communication Services > Email](../../concepts/service-limits.md#email).
* Learn how to send emails with Azure Managed Domains in [Quickstart: How to add Azure Managed Domains to Email Communication Service](add-azure-managed-domains.md).
