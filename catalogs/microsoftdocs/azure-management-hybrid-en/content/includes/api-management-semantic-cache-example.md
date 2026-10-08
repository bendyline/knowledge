---
author: PatAltimore
ms.service: azure-api-management
ms.custom:
  - build-2024
ms.topic: include
ms.date: 05/09/2024
ms.author: patricka
---
The following example shows how to use the `azure-openai-semantic-cache-lookup` policy along with the `azure-openai-semantic-cache-store` policy to retrieve semantically similar cached responses with a similarity score threshold of 0.05. Cached values are partitioned by the subscription ID of the caller. 

> **Note:**
> 

Add a [rate-limit](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/rate-limit-policy.md) policy (or [rate-limit-by-key](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/rate-limit-by-key-policy.md) policy) after the cache lookup to help limit the number of calls and prevent overload on the backend service in case the cache isn't available.


```xml
<policies>
    <inbound>
        <base />
        <azure-openai-semantic-cache-lookup
            score-threshold="0.05"
            embeddings-backend-id ="azure-openai-backend"
            embeddings-backend-auth ="system-assigned" >
            <vary-by>@(context.Subscription.Id)</vary-by>
        </azure-openai-semantic-cache-lookup>
        <rate-limit calls="10" renewal-period="60" />
    </inbound>
    <outbound>
        <azure-openai-semantic-cache-store duration="60" />
        <base />
    </outbound>
</policies>
```
