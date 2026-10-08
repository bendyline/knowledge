---
author: PatAltimore
ms.service: azure-api-management
ms.custom:
  - build-2024
ms.topic: include
ms.date: 08/18/2026
ms.author: patricka
---

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| score-threshold | Score threshold defines how closely an incoming prompt must match a cached prompt to return its stored response. The value ranges from 0.0 to 1.0. Lower values require higher semantic similarity for a match. [Learn more](https://learn.microsoft.com/azure/redis/tutorial-semantic-cache#change-the-similarity-threshold). | Yes | N/A |
| embeddings-backend-id | [Backend](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/backends.md) ID for embeddings API call. | Yes | N/A |
| embeddings-backend-auth | Authentication used for embeddings API backend. | Yes. Must be set to `system-assigned`. | N/A |
| ignore-system-messages | Boolean. When set to `true` (recommended), removes system messages from a chat completion prompt before assessing cache similarity. | No | false |
| max-message-count | If specified, number of remaining dialog messages after which caching is skipped. | No | N/A |

> **Important:**
> Linked access isn't checked when a backend is referenced by using `embeddings-backend-id`. A user who has permission to write a policy can reference any available backend and send embeddings API calls through it using the API Management instance's system-assigned managed identity, even if the user doesn't have read access to the backend resource.

## Elements

| Name | Description | Required |
| --- | --- | --- |
| vary-by | A custom expression determined at runtime whose value partitions caching. If multiple `vary-by` elements are added, values are concatenated to create a unique combination. | No |

## Usage


- [**Policy sections:**](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management//api-management-howto-policies.md#understanding-policy-configuration) inbound
- [**Policy scopes:**](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management//api-management-howto-policies.md#scopes) global, product, API, operation
-  [**Gateways:**](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/api-management-gateways-overview.md) classic, v2, consumption, self-hosted

### Usage notes

- This policy can only be used once in a policy section.
- Fine-tune the value of `score-threshold` based on your application to ensure that the right sensitivity is used to determine when to return cached responses for queries. Start with a low value such as 0.05 and adjust to optimize the ratio of cache hits to misses.
- Score threshold above 0.2 may lead to cache mismatch. Consider using lower value for sensitive use cases.
- Control cross-user access to cache entries by specifying `vary-by` with specific user or user-group identifiers.
- The embeddings model should have enough capacity and sufficient context size to accommodate the prompt volume and prompts.
- Consider adding [llm-content-safety](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management//llm-content-safety-policy.md) policy with prompt shield to protect from prompt attacks.
- 

We recommend configuring a [rate-limit](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/rate-limit-policy.md) policy (or [rate-limit-by-key](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/rate-limit-by-key-policy.md) policy) immediately after any cache lookup. This helps keep your backend service from getting overloaded if the cache isn't available.
