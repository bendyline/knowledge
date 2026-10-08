---
author: PatAltimore
ms.service: azure-api-management
ms.topic: include
ms.date: 07/24/2025
ms.author: patricka
---


Add a [rate-limit](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/rate-limit-policy.md) policy (or [rate-limit-by-key](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/rate-limit-by-key-policy.md) policy) after the cache lookup to help limit the number of calls and prevent overload on the backend service in case the cache isn't available.
