---
ms.topic: include
ms.date: 02/12/2025
---

## Authenticate to Azure services from your app

The [Azure Identity library](https://learn.microsoft.com/dotnet/api/azure.identity?view=azure-dotnet\&preserve-view=true) provides various *credentials*&mdash;implementations of `TokenCredential` adapted to supporting different scenarios and Microsoft Entra authentication flows. The steps ahead demonstrate how to use [Azure.Identity.ClientSecretCredential](https://learn.microsoft.com/search/?terms=Azure.Identity.ClientSecretCredential) when working with service principals locally and in production.
