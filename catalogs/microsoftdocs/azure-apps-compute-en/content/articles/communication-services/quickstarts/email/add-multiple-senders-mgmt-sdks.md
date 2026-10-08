---
title: Add multiple sender addresses with Management SDKs in Azure Communication Services using the Azure Communication Services Management Client Libraries
titleSuffix: An Azure Communication Services article
description: This article describes how to add and remove sender addresses in Azure Communication Services using the Azure Communication Services Management Client Libraries.
author: anmolbohra97
manager: koagbakp
services: azure-communication-services
ms.author: anmolbohra
ms.date: 04/19/2023
ms.topic: quickstart
ms.service: azure-communication-services
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-js-csharp-java-python
---

# Add multiple sender addresses with Management SDKs in Azure Communication Services using the Azure Communication Services Management Client Libraries


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to add and remove sender addresses in Azure Communication Services using the Azure Communication Services Management Client Libraries.

**Applies to: programming-language-csharp**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Get started creating an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails.
- We're using a [service principal for authentication](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as the following environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`.

## Install the required packages

```console
dotnet add package Azure.ResourceManager.Communication
```

## Initialize the management client

Set the environment variable `AZURE_SUBSCRIPTION_ID` with the subscription ID of the subscription your Domain and Email resources are in. Run the code sample to initialize the management client.

```csharp
using Azure.Core;
using Azure.Identity;
using Azure.ResourceManager;
using Azure.ResourceManager.Communication;
using Azure;

ArmClient client = new ArmClient(new DefaultAzureCredential());
```

## Add sender usernames

When an Azure Managed Domain resource is provisioned, the MailFrom address defaults to `donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net`. If you configured a custom domain such as `notification.azurecommtest.net` the MailFrom address defaults to `donotreply@notification.azurecommtest.net`. 

The username is the user alias that is used in the MailFrom address. For example, the username in the MailFrom address `contosoNewsAlerts@notification.azurecommtest.net` would be `contosoNewsAlerts`. You can add extra sender usernames, which can also be configured with a more user friendly display name. In our example, the display name is `Contoso News Alerts`.

Update the code sample with the resource group name, the email service name, and the domain name that you would like to add this username to. This information can be found in portal by navigating to the domains resource you created when setting up the prerequisites. The title of the resource is `<your-email-service-name>/<your-domain-name>`. The resource group name and subscription ID can be found in the Essentials sections in the domain resource overview.

To add multiple sender usernames, you need to repeat this code sample multiple times.

```csharp
string subscriptionId = "<your-subscription-id>";
string resourceGroupName = "<your-resource-group-name>";
string emailServiceName = "<your-email-service-name>";
string domainName = "<your-domain-name>";

ResourceIdentifier senderUsernameResourceId = SenderUsernameResource.CreateResourceIdentifier(subscriptionId, resourceGroupName, emailServiceName, domainName, "contosoNewsAlerts");
SenderUsernameResource senderUsernameResource = client.GetSenderUsernameResource(senderUsernameResourceId);

SenderUsernameResourceData data = new SenderUsernameResourceData()
{
    Username = "contosoNewsAlerts",
    DisplayName = "Contoso News Alerts",
};

await senderUsernameResource.UpdateAsync(WaitUntil.Completed, data);
```

## Remove sender usernames

To delete the sender username, call the `DeleteAsync` function on the `senderUsernameResource`.

```python
await senderUsernameResource.DeleteAsync(WaitUntil.Completed);
```

## Next steps

* [Get started with create and manage Email Communication Service in Azure Communication Service](create-email-communication-resource.md)

* [Get started by connecting Email Communication Service with a Azure Communication Service resource](connect-email-communication-resource.md)

## Related articles

- [Email client library](../../concepts/email/sdk-features.md)
- [Add custom domains](add-custom-verified-domains.md)



**Applies to: programming-language-javascript**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Get started creating an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails.
- We're using a [service principal for authentication](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as the following environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`.

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

mgmtClient = new CommunicationServiceManagementClient(credential, subscriptionId);
```

## Add sender usernames

When an Azure Managed Domain resource is provisioned, the MailFrom address defaults to `donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net`. If you configured a custom domain such as `notification.azurecommtest.net` the MailFrom address defaults to `donotreply@notification.azurecommtest.net`. 

The username is the user alias that is used in the MailFrom address. For example, the username in the MailFrom address `contosoNewsAlerts@notification.azurecommtest.net` would be `contosoNewsAlerts`. You can add extra sender usernames, which can also be configured with a more user friendly display name. In our example, the display name is `Contoso News Alerts`.

Update the code sample with the resource group name, the email service name, and the domain name that you would like to add this username to. This information can be found in portal by navigating to the domains resource you created when setting up the prerequisites. The title of the resource is `<your-email-service-name>/<your-domain-name>`. The resource group name can be found in the Essentials sections in the domain resource overview.

To add multiple sender usernames, you need to repeat this code sample multiple times.

```javascript
const resourceGroupName = "<your-resource-group-name>";
const emailServiceName = "<your-email-service-name>";
const domainName = "<your-domain-name>";

const parameters = {
    displayName: "Contoso News Alerts",
    username: "contosoNewsAlerts",
};

await mgmtClient.senderUsernames.createOrUpdate(
    resourceGroupName,
    emailServiceName,
    domainName,
    "contosoNewsAlerts",
    parameters
);
```

## Remove sender usernames

To delete the sender username, call the delete function on the client.

```javascript
await mgmtClient.senderUsernames.delete(
    resourceGroupName,
    emailServiceName,
    domainName,
    "contosoNewsAlerts"
);
```

## Next steps

* [Get started with create and manage Email Communication Service in Azure Communication Service](create-email-communication-resource.md)

* [Get started by connecting Email Communication Service with a Azure Communication Service resource](connect-email-communication-resource.md)

## Related articles

- [Email client library](../../concepts/email/sdk-features.md)
- [Add custom domains](add-custom-verified-domains.md)



**Applies to: programming-language-java**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Get started creating an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails.
- We're using a [service principal for authentication](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as the following environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`.

## Install the required packages

Add the following dependency to your `pom.xml`.

```
<dependency>
    <groupId>com.azure.resourcemanager</groupId>
    <artifactId>azure-resourcemanager-communication</artifactId>
    <version>2.0.0</version>
</dependency>
```

## Initialize the management client

Set the environment variable `AZURE_SUBSCRIPTION_ID` with the subscription ID of the subscription your Domain and Email resources are in. Run the code sample to initialize the management client.

```java
AzureProfile profile = new AzureProfile(AzureEnvironment.AZURE);
TokenCredential credential = new DefaultAzureCredentialBuilder()
    .authorityHost(profile.getEnvironment().getActiveDirectoryEndpoint())
    .build();
CommunicationManager manager = CommunicationManager
    .authenticate(credential, profile);
```

## Add sender usernames

When an Azure Managed Domain resource is provisioned, the MailFrom address defaults to `donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net`. If you configured a custom domain such as `notification.azurecommtest.net` the MailFrom address defaults to `donotreply@notification.azurecommtest.net`.

The username is the user alias that is used in the MailFrom address. For example, the username in the MailFrom address `contosoNewsAlerts@notification.azurecommtest.net` would be `contosoNewsAlerts`. You can add extra sender usernames, which can also be configured with a more user friendly display name. In our example, the display name is `Contoso News Alerts`.

Update the code sample with the resource group name, the email service name, and the domain name that you would like to add this username to. This information can be found in portal by navigating to the domains resource you created when setting up the prerequisites. The title of the resource is `<your-email-service-name>/<your-domain-name>`. The resource group name can be found in the Essentials sections in the domain resource overview.

To add multiple sender usernames, you need to repeat this code sample multiple times.

```java
String resourceGroupName = "<your-resource-group-name>";
String emailServiceName = "<your-email-service-name>";
String domainName = "<your-domain-name>";

manager
    .senderUsernames()
    .define("contosoNewsAlerts")
    .withExistingDomain(resourceGroupName, emailServiceName, domainName)
    .withUsername("contosoNewsAlerts")
    .withDisplayName("Contoso News Alerts")
    .create();
```

## Remove sender usernames

To delete the sender username, call the `deleteWithResponse` function on the client.

```java
manager
    .senderUsernames()
    .deleteWithResponse(
        resourceGroupName,
        emailServiceName,
        domainName,
        "contosoNewsAlerts",
        com.azure.core.util.Context.NONE);
```

## Next steps

* [Get started with create and manage Email Communication Service in Azure Communication Service](create-email-communication-resource.md)

* [Get started by connecting Email Communication Service with a Azure Communication Service resource](connect-email-communication-resource.md)

## Related articles

- [Email client library](../../concepts/email/sdk-features.md)
- [Add custom domains](add-custom-verified-domains.md)



**Applies to: programming-language-python**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Get started creating an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails.
- We're using a [service principal for authentication](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as the following environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`.

## Install the required packages

```console
pip install azure-mgmt-communication
pip install azure-identity
```

## Initialize the management client

Replace the field in the sample code with the subscription ID of the subscription your Domain and Email resources are in. Run the code sample to initialize the management client.

```python
from azure.mgmt.communication import CommunicationServiceManagementClient
from azure.identity import AzureCliCredential

credential = DefaultAzureCredential()
subscription_id = "<your-subscription-id>"

mgmt_client = CommunicationServiceManagementClient(credential, subscription_id)
```

## Add sender usernames

When you provision an Azure Managed Domain resource, the MailFrom address defaults to `donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net`. If you configured a custom domain such as `notification.azurecommtest.net` the MailFrom address defaults to `donotreply@notification.azurecommtest.net`. 

The username is the user alias that is used in the MailFrom address. For example, the username in the MailFrom address `contosoNewsAlerts@notification.azurecommtest.net` would be `contosoNewsAlerts`. You can add extra sender usernames, which can also be configured with a more user friendly display name. In our example, the display name is `Contoso News Alerts`.

Update the code sample with the resource group name, the email service name, and the domain name that you would like to add this username to. You can find this information in the portal by navigating to the domains resource you created when setting up the prerequisites. The title of the resource is `<your-email-service-name>/<your-domain-name>`. You can find the resource group name in the **Essentials** sections in the domain resource overview.

To add multiple sender usernames, you need to repeat this code sample multiple times.

```python
resource_group_name = "<your-resource-group-name>"
email_service_name = "<your-email-service-name>"
domain_name = "<your-domain-name>"

parameters = {
    "username": "contosoNewsAlerts",
    "displayName": "Contoso News Alerts",
}

mgmt_client.sender_usernames.create_or_update(
    resource_group_name,
    email_service_name,
    domain_name,
    "contosoNewsAlerts",
    parameters
)
```

## Remove sender usernames

To delete the sender username, call the delete function on the client.

```python
mgmt_client.sender_usernames.delete(
    resource_group_name,
    email_service_name,
    domain_name,
    "contosoNewsAlerts"
)
```

## Next steps

* [Get started with create and manage Email Communication Service in Azure Communication Service](create-email-communication-resource.md)

* [Get started by connecting Email Communication Service with a Azure Communication Service resource](connect-email-communication-resource.md)

## Related articles

- [Email client library](../../concepts/email/sdk-features.md)
- [Add custom domains](add-custom-verified-domains.md)
