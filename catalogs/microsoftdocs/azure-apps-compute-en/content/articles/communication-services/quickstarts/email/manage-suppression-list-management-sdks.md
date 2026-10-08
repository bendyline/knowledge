---
title: Manage domain suppression lists with Management SDKs
titleSuffix: An Azure Communication Services article
description: This article describes how to manage domain suppression lists in Azure Communication Services using the management client libraries.
author: anmolbohra97
manager: koagbakp
services: azure-communication-services
ms.author: anmolbohra
ms.date: 11/21/2023
ms.topic: quickstart
ms.service: azure-communication-services
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-js-csharp-java-python
---

# Manage domain suppression lists with Management SDKs


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


This article describes how to manage domain suppression lists in Azure Communication Services using the Azure Communication Services management client libraries.

**Applies to: programming-language-csharp**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Create an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails.
- We're using a [service principal for authentication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/howto-create-service-principal-portal.md). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as the following environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`.

## Install the required packages

```console
dotnet add package Azure.ResourceManager.Communication
dotnet add package Azure.Identity
```

## Initialize the management client

Set the environment variable `AZURE_SUBSCRIPTION_ID` with the subscription ID of the subscription your Domain and Email resources are in. Run the code sample to initialize the management client.

```csharp
using Azure;
using Azure.Core;
using Azure.Identity;
using Azure.ResourceManager;
using Azure.ResourceManager.Communication;

ArmClient client = new ArmClient(new DefaultAzureCredential());
```

## Add a suppression list to a domain resource

To block your email messages from being sent to certain addresses, the first step is setting up a suppression list in your domain resource.

Update the code sample with the resource group name, the email service name, and the domain resource name for which you would like to create the suppression list. Find this information in the portal by navigating to the domain resource you created when setting up the prerequisites. The title of the resource is `<your-email-service-name>/<your-domain-name>`. Find the resource group name and subscription ID in the Essentials sections in the domain resource overview. Choose any name for your suppression list resource and update that field in the sample as well. 

For the list name, make sure it's the same as the sender username of the MailFrom address you would like to suppress emails from. These MailFrom addresses can be found in the "MailFrom addresses" section of your domain resource in the portal. For example, you may have a MailFrom address that looks like `donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net`. The sender username for this address is `donotreply` so use a list name of `donotreply`.

The code sample creates the suppression list and stores it in the `suppressionListResource` variable for future operations.

```csharp
string subscriptionId = "<your-subscription-id>"; // Found in the essentials section of the domain resource portal overview
string resourceGroupName = "<your-resource-group-name>"; // Found in the essentials section of the domain resource portal overview
string emailServiceName = "<your-email-service-name>"; // Found in the first part of the portal domain resource title
string domainResourceName = "<your-domain-name>"; // Found in the second part of the portal domain resource title
string suppressionListResourceName = "<your-suppression-list-resource-name>";

ResourceIdentifier suppressionListResourceId = SuppressionListResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName, domainResourceName, suppressionListResourceName);
SuppressionListResource suppressionListResource = client.GetSuppressionListResource(suppressionListResourceId);

SuppressionListResourceData suppressionListData = new SuppressionListResourceData()
{
    ListName = "<your-sender-username>", // Should match the sender username of the MailFrom address you would like to suppress emails from
};

suppressionListResource.Update(WaitUntil.Completed, suppressionListData);
```

If you would like to suppress emails from all the sender usernames in particular domain, you can pass in an empty string for the list name.

```csharp
SuppressionListResourceData suppressionListData = new SuppressionListResourceData()
{
    ListName = "",
};

suppressionListResource.Update(WaitUntil.Completed, suppressionListData);
```

## Add an address to a suppression list

After setting up the suppression list, you can now add specific email addresses to which you wish to prevent your email messages from being sent.

Update the code sample with the suppression list address ID. Every suppression list address ID you add needs to be unique. We recommend using a GUID. Also update the email address you want to block from receiving your messages.

To add multiple addresses to the suppression list, you need to repeat this code sample multiple times.

```csharp
string suppressionListAddressId = "<your-suppression-list-address-id>";

ResourceIdentifier suppressionListAddressResourceId = SuppressionListAddressResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName, domainResourceName, suppressionListResourceName, suppressionListAddressId);
SuppressionListAddressResource suppressionListAddressResource = client.GetSuppressionListAddressResource(suppressionListAddressResourceId);

SuppressionListAddressResourceData suppressionListAddressData = new SuppressionListAddressResourceData()
{
    Email = "<email-address-to-suppress>" // Should match the email address you would like to block from receiving your messages
};

suppressionListAddressResource.Update(WaitUntil.Completed, suppressionListAddressData);
```

You can now try sending an email to the suppressed address from the [`TryEmail` section of your Communication Service resource or by using one of the Email SDKs](send-email.md). Make sure to send the email using the MailFrom address with the sender username you suppressed. Your email doesn't send to the suppressed address.

If you try sending an email from a sender username that isn't suppressed the email still successfully sends.

## Remove an address from a suppression list

To remove an address from the suppression list, create the `SuppressionListAddressResource` as shown in the previous code samples and call the `Delete` method.

```csharp
suppressionListAddressResource.Delete(WaitUntil.Completed);
```

You can now try sending an email to the suppressed address from the [`TryEmail` section of your Communication Service resource or by using one of the Email SDKs](send-email.md). Make sure to send the email using the MailFrom address with the sender username you choose to suppress. Your email successfully sends to the previously suppressed address.

## Remove a suppression list from a domain resource

To remove a suppression list from the domain resource, create the `SuppressionListResource` as shown in the previous code samples and call the `Delete` method.

```csharp
suppressionListResource.Delete(WaitUntil.Completed);
```



**Applies to: programming-language-javascript**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Create an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails.
- We're using a [service principal for authentication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/howto-create-service-principal-portal.md). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as the following environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`.

## Install the required packages

```console
npm install @azure/arm-communication
npm install @azure/identity
```


## Initialize the management client

Replace the field in the sample code with the subscription ID of the subscription your Domain and Email resources are in. Run the code sample to initialize the management client.

```javascript
const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

const credential = new DefaultAzureCredential();
const subscriptionId = "<your-subscription-id>";

const client = new CommunicationServiceManagementClient(credential, subscriptionId);
```

## Add a suppression list to a domain resource

To block your email messages from being sent to certain addresses, the first step is setting up a suppression list in your domain resource.

Update the code sample with the resource group name, the email service name, and the domain resource name for which you would like to create the suppression list. Find this information in the portal by navigating to the domain resource you created when setting up the prerequisites. The title of the resource is `<your-email-service-name>/<your-domain-name>`. Find the resource group name and subscription ID in the Essentials sections in the domain resource overview. Choose any name for your suppression list resource and update that field in the sample as well. 

For the list name, make sure it's the same as the sender username of the MailFrom address you would like to suppress emails from. These MailFrom addresses can be found in the "MailFrom addresses" section of your domain resource in the portal. For example, you may have a MailFrom address that looks like `donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net`. The sender username for this address is `donotreply` so use a list name of `donotreply`.

```javascript
const resourceGroupName = "<your-resource-group-name>"; // Found in the essentials section of the domain resource portal overview
const emailServiceName = "<your-email-service-name>"; // Found in the first part of the portal domain resource title
const domainResourceName = "<your-domain-name>"; // Found in the second part of the portal domain resource title
const suppressionListResourceName = "<your-suppression-list-resource-name>";

parameters = { 
    "listName": "<your-sender-username>", // Should match the sender username of the MailFrom address you would like to suppress emails from
}

await client.suppressionLists.createOrUpdate(
    resourceGroupName,
    emailServiceName,
    domainResourceName,
    suppressionListResourceName,
    parameters
);
```

If you would like to suppress emails from all the sender usernames in particular domain, you can pass in an empty string for the list name.

```javascript
parameters = { 
    "listName": "",
}

await client.suppressionLists.createOrUpdate(
    resourceGroupName,
    emailServiceName,
    domainResourceName,
    suppressionListResourceName,
    parameters
);
```

## Add an address to a suppression list

After setting up the suppression list, you can now add specific email addresses to which you wish to prevent your email messages from being sent.

Update the code sample with the suppression list address ID. Every suppression list address ID you add needs to be unique. We recommend using a GUID. Also update the email address you want to block from receiving your messages.

To add multiple addresses to the suppression list, you need to repeat this code sample multiple times.

```javascript
const suppressionListAddressId = "<your-suppression-list-address-id>";

parameters = { 
    "email": "<email-address-to-suppress>" // Should match the email address you would like to block from receiving your messages
}

await client.suppressionListAddresses.createOrUpdate(
    resourceGroupName,
    emailServiceName,
    domainResourceName,
    suppressionListResourceName,
    suppressionListAddressId,
    parameters
);

```

You can now try sending an email to the suppressed address from the [`TryEmail` section of your Communication Service resource or by using one of the Email SDKs](send-email.md). Make sure to send the email using the MailFrom address with the sender username you suppressed. Your email doesn't send to the suppressed address.

If you try sending an email from a sender username that isn't suppressed the email still successfully sends.

## Remove an address from a suppression list

Call the `delete` method on `suppressionListAddresses` to remove an address from the suppression list.

```javascript
await client.suppressionListAddresses.delete(
    resourceGroupName,
    emailServiceName,
    domainResourceName,
    suppressionListResourceName,
    suppressionListAddressId
);
```

You can now try sending an email to the suppressed address from the [`TryEmail` section of your Communication Service resource or by using one of the Email SDKs](send-email.md). Make sure to send the email using the MailFrom address with the sender username you suppressed. Your email successfully sends to the previously suppressed address.

## Remove a suppression list from a domain resource

Call the `delete` method on `suppressionList` to remove a suppression list from the domain resource.

```javascript
await client.suppressionLists.delete(
    resourceGroupName,
    emailServiceName,
    domainResourceName,
    suppressionListResourceName
);
```



**Applies to: programming-language-java**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Create an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails.
- We're using a [service principal for authentication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/howto-create-service-principal-portal.md). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as the following environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`.

## Install the required packages

Add the following dependencies to your `pom.xml`.

```
<dependency>
    <groupId>com.azure.resourcemanager</groupId>
    <artifactId>azure-resourcemanager-communication</artifactId>
    <version>2.2.0</version>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.11.1</version>
</dependency>
```


## Initialize the management client

Set the environment variable `AZURE_SUBSCRIPTION_ID` with the subscription ID of the subscription your Domain and Email resources are in. 

Add the following imports at the top of your file.

```java
import com.azure.core.credential.TokenCredential;
import com.azure.core.management.AzureEnvironment;
import com.azure.core.management.profile.AzureProfile;
import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.resourcemanager.communication.CommunicationManager;
```

Run the code sample to initialize the management client.

```java
AzureProfile profile = new AzureProfile(AzureEnvironment.AZURE);
TokenCredential credential = new DefaultAzureCredentialBuilder()
        .authorityHost(profile.getEnvironment().getActiveDirectoryEndpoint())
        .build();

CommunicationManager manager = CommunicationManager
        .authenticate(credential, profile);
```

## Add a suppression list to a domain resource

To block your email messages from being sent to certain addresses, the first step is setting up a suppression list in your domain resource.

Update the code sample with the resource group name, the email service name, and the domain resource name for which you would like to create the suppression list. Find this information in the portal by navigating to the domain resource you created when setting up the prerequisites. The title of the resource is `<your-email-service-name>/<your-domain-name>`. Find the resource group name and subscription ID in the Essentials sections in the domain resource overview. Choose any name for your suppression list resource and update that field in the sample as well. 

For the list name, make sure it's the same as the sender username of the MailFrom address you would like to suppress emails from. These MailFrom addresses can be found in the "MailFrom addresses" section of your domain resource in the portal. For example, you may have a MailFrom address that looks like `donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net`. The sender username for this address is `donotreply` so use a list name of `donotreply`.

```java
String resourceGroupName = "<your-resource-group-name>"; // Found in the essentials section of the domain resource portal overview
String emailServiceName = "<your-email-service-name>"; // Found in the first part of the portal domain resource title
String domainResourceName = "<your-domain-name>"; // Found in the second part of the portal domain resource title
String suppressionListResourceName = "<your-suppression-list-resource-name>";

manager.suppressionLists().define(suppressionListResourceName)
    .withExistingDomain(resourceGroupName, emailServiceName, domainResourceName)
    .withListName("<your-sender-username>") // Should match the sender username of the MailFrom address you would like to suppress emails from
    .create();
```

If you want to suppress emails from all the sender usernames in particular domain, you can pass in an empty string for the list name.

```java
manager.suppressionLists().define(suppressionListResourceName)
    .withExistingDomain(resourceGroupName, emailServiceName, domainResourceName)
    .withListName("")
    .create();
```

## Add an address to a suppression list

After setting up the suppression list, you can now add specific email addresses to which you wish to prevent your email messages from being sent.

Update the code sample with the suppression list address ID. Every suppression list address ID you add needs to be unique. We recommend using a GUID. Also update the email address you want to block from receiving your messages.

To add multiple addresses to the suppression list, you need to repeat this code sample multiple times.

```java
String suppressionListAddressId = "<your-suppression-list-address-id>";

manager.suppressionListAddresses().define(suppressionListAddressId)
    .withExistingSuppressionList(resourceGroupName, emailServiceName, domainResourceName, suppressionListResourceName)
    .withEmail("<email-address-to-suppress>") // Should match the email address you would like to block from receiving your messages
    .create();
```

You can now try sending an email to the suppressed address from the [`TryEmail` section of your Communication Service resource or by using one of the Email SDKs](send-email.md). Make sure to send the email using the MailFrom address with the sender username you suppressed. Your email doesn't send to the suppressed address.

If you try sending an email from a sender username that isn't suppressed the email still successfully sends.

## Remove an address from a suppression list

Call the `delete` method on `suppressionListAddresses` to remove an address from the suppression list.

```java
manager.suppressionListAddresses()
    .delete(resourceGroupName, emailServiceName, domainResourceName, suppressionListResourceName, suppressionListAddressId);
```

You can now try sending an email to the suppressed address from the [`TryEmail` section of your Communication Service resource or by using one of the Email SDKs](send-email.md). Make sure to send the email using the MailFrom address with the sender username you choose to suppress. Your email successfully sends to the previously suppressed address.

## Remove a suppression list from a domain resource

Call the `delete` method on `suppressionLists` to remove a suppression list from the domain resource.

```java
manager.suppressionLists()
    .delete(resourceGroupName, emailServiceName, domainResourceName, suppressionListResourceName);
```



**Applies to: programming-language-python**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Create an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails.
- We're using a [service principal for authentication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/howto-create-service-principal-portal.md). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as the following environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`.

## Install the required packages

```console
pip install azure-mgmt-communication
pip install azure-identity
```

## Initialize the management client

Set the environment variable `AZURE_SUBSCRIPTION_ID` with the subscription ID of the subscription your Domain and Email resources are in. Run the code sample to initialize the management client.

```python
from azure.mgmt.communication import CommunicationServiceManagementClient
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
subscription_id = "<your-subscription-id>"

mgmt_client = CommunicationServiceManagementClient(credential, subscription_id)
```

## Add a suppression list to a domain resource

To block your email messages from being sent to certain addresses, the first step is setting up a suppression list in your domain resource.

Update the code sample with the resource group name, the email service name, and the domain resource name for which you would like to create the suppression list. Find this information in the portal by navigating to the domain resource you created when setting up the prerequisites. The title of the resource is `<your-email-service-name>/<your-domain-name>`. Find the resource group name and subscription ID in the Essentials sections in the domain resource overview. Choose any name for your suppression list resource and update that field in the sample as well.  

For the list name, make sure it's the same as the sender username of the MailFrom address you would like to suppress emails from. These MailFrom addresses can be found in the "MailFrom addresses" section of your domain resource in the portal. For example, you may have a MailFrom address that looks like `donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net`. The sender username for this address is `donotreply` so use a list name of `donotreply`.

```python
resource_group_name = "<your-resource-group-name>"; # Found in the essentials section of the domain resource portal overview
email_service_name = "<your-email-service-name>"; # Found in the first part of the portal domain resource title
domain_resource_name = "<your-domain-name>"; # Found in the second part of the portal domain resource title
suppression_list_resource_name = "<your-suppression-list-resource-name>";

mgmt_client.suppression_lists.create_or_update(
    resource_group_name,
    email_service_name,
    domain_resource_name,
    suppression_list_resource_name,
    parameters={
        "properties": {
            "listName": "<your-sender-username>" # Should match the sender username of the MailFrom address you would like to suppress emails from
        }
    },
)
```

If you want to suppress emails from all the sender usernames in particular domain, you can pass in an empty string for the list name.

```python
mgmt_client.suppression_lists.create_or_update(
    resource_group_name,
    email_service_name,
    domain_resource_name,
    suppression_list_resource_name,
    parameters={
        "properties": {
            "listName": ""
        }
    },
)
```

## Add an address to a suppression list

After setting up the suppression list, you can now add specific email addresses to which you wish to prevent your email messages from being sent.

Update the code sample with the suppression list address ID. Every suppression list address ID you add needs to be unique. We recommend using a GUID. Also update the email address you want to block from receiving your messages.

To add multiple addresses to the suppression list, you need to repeat this code sample multiple times.

```python
suppression_list_address_id = "<your-suppression-list-address-id>";

mgmt_client.suppression_list_addresses.create_or_update(
    resource_group_name,
    email_service_name,
    domain_resource_name,
    suppression_list_resource_name,
    suppression_list_address_id,
    parameters={
        "properties": {
            "email": "<email-address-to-suppress>" # Should match the email address you would like to block from receiving your messages
        }
    },
)
```

You can now try sending an email to the suppressed address from the [`TryEmail` section of your Communication Service resource or by using one of the Email SDKs](send-email.md). Make sure to send the email using the MailFrom address with the sender username you suppressed. Your email doesn't send to the suppressed address.

If you try sending an email from a sender username that isn't suppressed the email still successfully sends.

## Remove an address from a suppression list

Call the `delete` method on `suppression_list_addresses` to remove an address from the suppression list.

```python
mgmt_client.suppression_list_addresses.delete(
    resource_group_name,
    email_service_name,
    domain_resource_name,
    suppression_list_resource_name,
    suppression_list_address_id
)
```

You can now try sending an email to the suppressed address from the [`TryEmail` section of your Communication Service resource or by using one of the Email SDKs](send-email.md). Make sure to send the email using the MailFrom address with the sender username you suppressed. Your email successfully sends to the previously suppressed address.

## Remove a suppression list from a domain resource

Call the `delete` method on `suppression_lists` to remove a suppression list from the domain resource.

```python
mgmt_client.suppression_lists.delete(
    resource_group_name,
    email_service_name,
    domain_resource_name,
    suppression_list_resource_name
)
```
