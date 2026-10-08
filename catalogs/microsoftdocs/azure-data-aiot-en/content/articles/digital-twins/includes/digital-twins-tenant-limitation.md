---
author: baanders
description: Include file describing the cross-tenant limitation with Azure Digital Twins.
ms.service: azure-digital-twins
ms.topic: include
ms.date: 4/21/2025
ms.author: baanders
---

As a result, requests to the Azure Digital Twins APIs require a user or service principal that is a part of the same tenant where the Azure Digital Twins instance resides. To prevent malicious scanning of Azure Digital Twins endpoints, requests with access tokens from outside the originating tenant return a "404 Sub-Domain not found" error message. This error is returned even if the user or service principal was given an Azure Digital Twins Data Owner or Azure Digital Twins Data Reader [role](../concepts-security.md) through [Microsoft Entra B2B](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/external-identities/what-is-b2b.md) collaboration.
