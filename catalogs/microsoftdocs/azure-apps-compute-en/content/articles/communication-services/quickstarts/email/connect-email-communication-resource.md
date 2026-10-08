---
title: Connect a verified email domain to send email
titleSuffix: An Azure Communication Services article
description: This article describes how to connect verified email domains in Azure Communication Services.
author: bashan-git
manager: sphenry
services: azure-communication-services
ms.author: bashan
ms.date: 03/31/2023
ms.topic: quickstart
ms.service: azure-communication-services
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-js-csharp-java-python-portal-rest
---

# Connect a verified email domain to send email


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to connect a verified domain in Azure Communication Services to send email.

**Applies to: azure-portal**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Create an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails. This domain must be fully verified before attempting to link it to the Communication Service resource.
- An Azure Communication Services Resource. [Create a Communication Services Resources](../create-communication-resource.md).

## Connect an email domain to a Communication Service Resource

1. In the Azure Communication Service Resource overview page, in the left navigation panel under Email, click **Domains**.

    Screenshot that shows the left navigation panel for linking Email Domains.

2. Select one of the following options:

    - From the upper navigation bar, click **Connect domain**.
    - From the splash screen, click **Connect domain**.
     
        Screenshot that shows how to connect one of your verified email domains.

3. Select one of the verified domains by filtering:

    - **Subscription**
    - **Resource Group**
    - **Email Service**
    - **Verified Domain**
    
    Screenshot that shows how to filter and select one of the verified email domains to connect.

> **Note:**
> You can only connect domains in the same geography. Make sure that the Data location for Communication Resource and Email Communication Resource you selected during resource creation are in the same geography.

4. Click **Connect**.
 
    Screenshot that shows one of the verified email domains is now connected.

> **Note:**
> We enable customers to link up to 100 custom domains to a single communication service resource. All Mail-From addresses configured under these custom domains are accessible for the communication service resource. You can only link verified custom domains.

## Disconnect an email domain from the Communication Service Resource

1. In the Azure Communication Services Resource overview page, from the left navigation panel under Email, click **Domains**.

1. Select the Connected Domains, then click **...** and select **Disconnect**.

    Screenshot that shows how to disconnect the connected domain.



**Applies to: programming-language-rest**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Create an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails. This domain must be fully verified before attempting to link it to the Communication Service resource.
- An Azure Communication Services Resource. [Create a Communication Services Resources](../create-communication-resource.md).

## Connect an email domain to a Communication Service Resource

Replace the `{subscription-id}`, `{resource-group-name}`, `{communication-services-resource-name}`, and `{linked-domain-resource-id}` in the sample request.

Format the linked domain resource ID as follows:

```
/subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Communication/emailServices/{email-service-name}/domains/{domain-name}
```

If you're using an Azure Managed Domain, the `domain-name` is `AzureManagedDomain`. The `email-service-name` must be the same email service that you used to provision the domain.

Once these values are populated, make a PATCH request using the following Request URL and body. 

```
https://management.azure.com/subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Communication/CommunicationServices/{communication-services-resource-name}?api-version=2023-03-31
```

```
{
    "properties": {
        "linkedDomains": ["{linked-domain-resource-id}"]
    }
}
```

## Disconnect an email domain from the Communication Service Resource

Replace the `{subscription-id}`, `{resource-group-name}`, and `{communication-services-resource-name}` in the sample request.

Once these values are populated, make a PATCH request using the following Request URL and body. 

```
https://management.azure.com/subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/Microsoft.Communication/CommunicationServices/{communication-services-resource-name}?api-version=2023-03-31
```

```
{
    "properties": {
        "linkedDomains": []
    }
}
```


**Applies to: programming-language-csharp**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Create an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails. This domain must be fully verified before attempting to link it to the Communication Service resource.
- An Azure Communication Services Resource. [Create a Communication Services Resources](../create-communication-resource.md).
- We're using a [service principal for authentication](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra application as the following environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`.

## Install the required packages

```console
dotnet add package Azure.ResourceManager.Communication
```

## Initialize the management client

Set the environment variable `AZURE_SUBSCRIPTION_ID` with the subscription ID of the subscription your Domain and Email resources are in. Run the code sample to initialize the management client.

```csharp
using System;
using System.Threading.Tasks;
using Azure.Core;
using Azure.Identity;
using Azure.ResourceManager;
using Azure.ResourceManager.Compute;
using Azure.ResourceManager.Resources;
using Azure.ResourceManager.Communication;
using Azure.ResourceManager.Communication.Models;

ArmClient client = new ArmClient(new DefaultAzureCredential());
```

## Connect an email domain to a Communication Service Resource

Replace the `<subscription-id>`, `<resource-group-name>`, `<azure-communication-services-resource-name>`, and `<linked-domain-resource-id>` in the sample code.

Format the linked domain resource ID as follows: 

```
/subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Communication/emailServices/<email-service-name>/domains/<domain-name>
```

If you're using an Azure Managed Domain, the `domain-name` is "AzureManagedDomain." The `email-service-name` should be the same email service that you used to provision the domain.

Once these values are populated, run the sample code.

```csharp
ResourceIdentifier communicationServiceResourceId = CommunicationServiceResource.CreateResourceIdentifier("<subscription-id>", "<resource-group-name>", "<azure-communication-services-resource-name>");
CommunicationServiceResource communicationServiceResource = client.GetCommunicationServiceResource(communicationServiceResourceId);

CommunicationServiceResourcePatch patch = new CommunicationServiceResourcePatch()
{
    LinkedDomains =
    {
        "<linked-domain-resource-id>",
    },
};
CommunicationServiceResource result = await communicationServiceResource.UpdateAsync(patch);
```

## Disconnect an email domain from the Communication Service Resource

Replace the `<subscription-id>`, `<resource-group-name>`, and `<azure-communication-services-resource-name>` in the sample code. 

Once these values are populated, run the sample code.

```csharp
ResourceIdentifier communicationServiceResourceId = CommunicationServiceResource.CreateResourceIdentifier("<subscription-id>", "<resource-group-name>", "<azure-communication-services-resource-name>");
CommunicationServiceResource communicationServiceResource = client.GetCommunicationServiceResource(communicationServiceResourceId);

CommunicationServiceResourcePatch patch = new CommunicationServiceResourcePatch();
patch.LinkedDomains.Clear();
CommunicationServiceResource result = await communicationServiceResource.UpdateAsync(patch);
```



**Applies to: programming-language-javascript**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Get started creating an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails. This domain must be fully verified before attempting to link it to the Communication Service resource.
- An Azure Communication Services Resource. [Create a Communication Services Resources](../create-communication-resource.md).
- We're using a [service principal for authentication](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra application as the following environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`.

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

client = new CommunicationServiceManagementClient(credential, subscriptionId);
```

## Connect an email domain to a Communication Service Resource

Replace the `<resource-group-name>`, `<azure-communication-services-resource-name>`, and `<linked-domain-resource-id>` in the sample code.

Format the linked domain resource ID as follows: 

```
/subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Communication/emailServices/<email-service-name>/domains/<domain-name>
```

If you're using an Azure Managed Domain, the `domain-name` is "`AzureManagedDomain`. The `email-service-name` should be the same email service that you used to provision the domain.

Once these values are populated, run the sample code.

```javascript
const parameters = {
    dataLocation: "United States",
    location: "Global",
    linkedDomains: [
        "<linked-domain-resource-id>"
    ]
};

const result = await client.communicationServices.beginCreateOrUpdateAndWait(
    "<resource-group-name>",
    "<azure-communication-services-resource-name>",
    parameters
);
```

## Disconnect an email domain from the Communication Service Resource

Replace the `<resource-group-name>`, and `<azure-communication-services-resource-name>` in the sample code. 

Once these values are populated, run the sample code.

```javascript
const parameters = {
    dataLocation: "United States",
    location: "Global"
};

const result = await client.communicationServices.beginCreateOrUpdateAndWait(
    "<resource-group-name>",
    "<azure-communication-services-resource-name>",
    parameters
);
```



**Applies to: programming-language-java**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Get started creating an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails. This domain must be fully verified before attempting to link it to the Communication Service resource.
- An Azure Communication Services Resource. [Create a Communication Services Resources](../create-communication-resource.md).
- We're using a [service principal for authentication](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra application as the following environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`.

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

## Connect an email domain to a Communication Service Resource

Replace the `<resource-group-name>`, `<azure-communication-services-resource-name>`, and `<linked-domain-resource-id>` in the sample code.

The linked domain resource ID must be in the following format. 

```
/subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Communication/emailServices/<email-service-name>/domains/<domain-name>
```

If you're using an Azure Managed Domain, the `domain-name` is `AzureManagedDomain`. The `email-service-name` must be the same email service that you used to provision the domain.

Once these values are populated, run the sample code.

```java
List<String> linkedDomains = new ArrayList<>();
linkedDomains.add("<linked-domain-resource-id>") 

manager
    .communicationServices()
    .define("<azure-communication-services-resource-name>")
    .withRegion("Global")
    .withExistingResourceGroup("<resource-group-name>")
    .withDataLocation("United States")
    .withLinkedDomains(linkedDomains)
    .create();
```

## Disconnect an email domain from the Communication Service Resource

Replace the `<resource-group-name>`, and `<azure-communication-services-resource-name>` in the sample code. 

Once these values are populated, run the sample code.

```java
manager
    .communicationServices()
    .define("<azure-communication-services-resource-name>")
    .withRegion("Global")
    .withExistingResourceGroup("<resource-group-name>")
    .withDataLocation("United States")
    .create();
```



**Applies to: programming-language-python**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Email Communication Services Resource ready to provision domains. [Create an Email Communication Resource](create-email-communication-resource.md).
- An [Azure Managed Domain](add-azure-managed-domains.md) or [Custom Domain](add-custom-verified-domains.md) provisioned and ready to send emails. This domain must be fully verified before attempting to link it to the Communication Service resource.
- An Azure Communication Services Resource. [Create a Communication Services Resources](../create-communication-resource.md).
- We're using a [service principal for authentication](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal). Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra application as the following environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET`.

## Install the required packages

```console
pip install azure-mgmt-communication
pip install azure-identity
```

## Initialize the management client

Replace the field in the sample code with the subscription ID of the subscription your Domain and Email resources are in. Run the code sample to initialize the management client.

```python
from azure.mgmt.communication import CommunicationServiceManagementClient
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
subscription_id = "<your-subscription-id>"

client = CommunicationServiceManagementClient(credential, subscription_id)
```

## Connect an email domain to a Communication Service Resource

Replace the `<resource-group-name>`, `<azure-communication-services-resource-name>`, and `<linked-domain-resource-id>` in the sample code.

The linked domain resource ID must be in the following format. 

```
/subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Communication/emailServices/<email-service-name>/domains/<domain-name>
```

If you're using an Azure Managed Domain, the `domain-name` is `AzureManagedDomain`. The `email-service-name` must be the same email service that you used to provision the domain.

Once these values are populated, run the sample code.

```python

response = client.communication_services.begin_create_or_update(
    resource_group_name="<resource-group-name>",
    communication_service_name="<azure-communication-services-resource-name>",
    parameters={
        "location": "Global",
        "properties": {
            "dataLocation": "United States",
            "linkedDomains": [
                "<linked-domain-resource-id>"
            ],
        }
    },
).result()
```

## Disconnect an email domain from the Communication Service Resource

Replace the `<resource-group-name>` and `<azure-communication-services-resource-name>` in the sample code. 

Once these values are populated, run the sample code.

```python

response = client.communication_services.begin_create_or_update(
    resource_group_name="<resource-group-name>",
    communication_service_name="<azure-communication-services-resource-name>",
    parameters={
        "location": "Global",
        "properties": {
            "dataLocation": "United States"
        }
    },
).result()
```




## Next steps

* [How to send an Email](send-email.md)

* [What is Email Communication Resource for Azure Communication Services](../../concepts/email/prepare-email-communication-resource.md)


## Related articles

- [Email client library](../../concepts/email/sdk-features.md)
