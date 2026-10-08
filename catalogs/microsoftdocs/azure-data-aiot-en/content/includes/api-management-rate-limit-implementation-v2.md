---
author: PatAltimore
ms.service: azure-api-management
ms.topic: include
ms.date: 05/01/2026
ms.author: patricka
---

The v2 tiers use a *token bucket algorithm* for rate limiting, which differs from the *sliding window algorithm* in classic tiers. Because of this implementation difference, when you configure token limits in the v2 tiers at multiple scopes by using the same `counter-key`, make sure that the `tokens-per-minute` value is consistent across all policy instances. Inconsistent values can cause unpredictable behavior. For more information, see [Advanced request throttling with Azure API Management](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/api-management-sample-flexible-throttling.md#rate-limits)
