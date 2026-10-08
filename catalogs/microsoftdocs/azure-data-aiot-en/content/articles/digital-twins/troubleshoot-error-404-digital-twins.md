---
title: "Troubleshoot Azure Digital Twins: Error 404 (Sub-Domain not found)"
titleSuffix: Azure Digital Twins
description: Learn how to diagnose and resolve error 404 (Sub-Domain not found) failed service requests from Azure Digital Twins.
ms.service: azure-digital-twins
author: baanders
ms.author: baanders
ms.topic: troubleshooting
ms.date: 4/21/2025
---

# Troubleshoot Azure Digital Twins failed service request: Error 404 (Sub-Domain not found)

This article describes causes and resolution steps for receiving a 404 error from service requests to Azure Digital Twins. This information is specific to the Azure Digital Twins service.

## Symptoms

This error might occur when accessing an Azure Digital Twins instance using a service principal or user account that belongs to a different [Microsoft Entra tenant](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/quickstart-create-new-tenant.md) from the instance. The correct [roles](concepts-security.md) seem to be assigned to the identity, but API requests fail with an error status of `404 Sub-Domain not found`.

## Causes

### Cause #1

Azure Digital Twins requires that all authenticating users belong to the same Microsoft Entra tenant as the Azure Digital Twins instance.


As a result, requests to the Azure Digital Twins APIs require a user or service principal that is a part of the same tenant where the Azure Digital Twins instance resides. To prevent malicious scanning of Azure Digital Twins endpoints, requests with access tokens from outside the originating tenant return a "404 Sub-Domain not found" error message. This error is returned even if the user or service principal was given an Azure Digital Twins Data Owner or Azure Digital Twins Data Reader [role](concepts-security.md) through [Microsoft Entra B2B](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/external-identities/what-is-b2b.md) collaboration. 


## Solutions

### Solution #1

You can resolve this issue by having each federated identity from another tenant request a token from the Azure Digital Twins instance's "home" tenant. 


One way to do this is with the following CLI command, where `<home-tenant-ID>` is the ID of the Microsoft Entra tenant that contains the Azure Digital Twins instance:

```azurecli-interactive
az account get-access-token --tenant <home-tenant-ID> --resource https://digitaltwins.azure.net
```

After this request, the identity receives a token issued for the `https://digitaltwins.azure.net` Microsoft Entra resource, which has a matching tenant ID claim to the Azure Digital Twins instance. Using this token in API requests or with your `Azure.Identity` code should allow the federated identity to access the Azure Digital Twins resource.


### Solution #2

If you're using the `DefaultAzureCredential` class in your code and you continue encountering this issue after getting a token, you can specify the home tenant in the `DefaultAzureCredential` options to clarify the tenant even when authentication defaults down to another type.


The following example shows how to set a sample tenant ID value for `InteractiveBrowserTenantId` in the `DefaultAzureCredential` options:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/authentication.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/troubleshoot-error-404-digital-twins.md)

There are similar options available to set a tenant for authentication with Visual Studio and Visual Studio Code. For more information on the options available, see the [DefaultAzureCredentialOptions documentation](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredentialoptions?view=azure-dotnet\&preserve-view=true).

## Next steps

Read more about security and permissions on Azure Digital Twins:
* [Secure Azure Digital Twins](concepts-security.md)
