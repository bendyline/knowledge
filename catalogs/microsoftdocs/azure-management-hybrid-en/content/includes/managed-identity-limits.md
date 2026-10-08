---
 title: include file
 description: include file 
 author: barclayn
 ms.service: entra-id
 ms.subservice: managed-identities
 ms.topic: include
 ms.date: 07/13/2021
 ms.author: barclayn
 ms.custom: include file
---

- Each managed identity counts towards the object quota limit in a Microsoft Entra tenant as described in [Microsoft Entra service limits and restrictions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/enterprise-users/directory-service-limits-restrictions.md).
-	The rate at which managed identities can be created have the following limits:

    1. Per Microsoft Entra tenant per Azure region: 400 create operations per 20 seconds.
    2. Per Azure Subscription per Azure region : 80 create operations per 20 seconds.

-	The rate at which a user-assigned managed identity can be assigned with an Azure resource :

    1. Per Microsoft Entra tenant per Azure region: 400 assignment operations per 20 seconds.
    2. Per Azure Subscription per Azure region : 300 assignment operations per 20 seconds.
