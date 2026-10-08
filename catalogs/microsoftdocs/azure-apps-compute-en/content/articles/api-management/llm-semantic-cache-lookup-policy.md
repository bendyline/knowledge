---
title: Azure API Management policy reference - llm-semantic-cache-lookup | Microsoft Docs
description: Reference for the llm-semantic-cache-lookup policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.collection: ce-skilling-ai-copilot
ms.custom:
  - build-2024
ms.topic: reference
ms.date: 08/18/2026
ms.update-cycle: 180-days
---

# Get cached responses of large language model API requests

**APPLIES TO: All API Management tiers**



Use the `llm-semantic-cache-lookup` policy to perform cache lookup of responses to large language model (LLM) API requests from a configured external cache, based on vector proximity of the prompt to previous requests and a specified score threshold. Response caching reduces bandwidth and processing requirements imposed on the backend LLM API and lowers latency perceived by API consumers.

> **Note:**
> * This policy must have a corresponding [Cache responses to large language model API requests](llm-semantic-cache-store-policy.md) policy. 
> * For prerequisites and steps to enable semantic caching, see [Enable semantic caching for LLM APIs in Azure API Management](azure-openai-enable-semantic-caching.md).
> * Because semantic caching returns responses based on similarity (not exact match), it can surface responses that are incorrect, outdated, or unsafe for the current request. Evaluate this feature carefully for your workload and include safeguards.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	


## Supported model APIs

This policy works with LLM APIs added to API Management that conform to one of the following API schemas:

* OpenAI Chat Completions or Responses API
* Anthropic Messages API (currently supported in API Management v2 tiers)
* Google Vertex AI API

## Policy statement

```xml
<llm-semantic-cache-lookup
    score-threshold="score threshold to return cached response"
    embeddings-backend-id ="backend entity ID for embeddings API"
    embeddings-backend-auth ="system-assigned"             
    ignore-system-messages="true | false"      
    max-message-count="count" >
    <vary-by>"expression to partition caching"</vary-by>
</llm-semantic-cache-lookup>
```


## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| score-threshold | Score threshold defines how closely an incoming prompt must match a cached prompt to return its stored response. The value ranges from 0.0 to 1.0. Lower values require higher semantic similarity for a match. [Learn more](https://learn.microsoft.com/azure/redis/tutorial-semantic-cache#change-the-similarity-threshold). | Yes | N/A |
| embeddings-backend-id | [Backend](backends.md) ID for embeddings API call. | Yes | N/A |
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


- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted

### Usage notes

- This policy can only be used once in a policy section.
- Fine-tune the value of `score-threshold` based on your application to ensure that the right sensitivity is used to determine when to return cached responses for queries. Start with a low value such as 0.05 and adjust to optimize the ratio of cache hits to misses.
- Score threshold above 0.2 may lead to cache mismatch. Consider using lower value for sensitive use cases.
- Control cross-user access to cache entries by specifying `vary-by` with specific user or user-group identifiers.
- The embeddings model should have enough capacity and sufficient context size to accommodate the prompt volume and prompts.
- Consider adding [llm-content-safety](llm-content-safety-policy.md) policy with prompt shield to protect from prompt attacks.
- 

We recommend configuring a [rate-limit](rate-limit-policy.md) policy (or [rate-limit-by-key](rate-limit-by-key-policy.md) policy) immediately after any cache lookup. This helps keep your backend service from getting overloaded if the cache isn't available.


> **Important:**
> Linked access isn't checked when a backend is referenced by using `embeddings-backend-id`. A user who has permission to write a policy can reference any available backend and send embedding requests through it, even if the user doesn't have read access to the backend resource.

## Examples

### Example with corresponding llm-semantic-cache-store policy


The following example shows how to use the `llm-semantic-cache-lookup` policy along with the `llm-semantic-cache-store` policy to retrieve semantically similar cached responses with a similarity score threshold of 0.05. Cached values are partitioned by the subscription ID of the caller. 

> **Note:**
> 

Add a [rate-limit](rate-limit-policy.md) policy (or [rate-limit-by-key](rate-limit-by-key-policy.md) policy) after the cache lookup to help limit the number of calls and prevent overload on the backend service in case the cache isn't available.


```xml
<policies>
    <inbound>
        <base />
        <llm-semantic-cache-lookup
            score-threshold="0.05"
            embeddings-backend-id ="llm-backend"
            embeddings-backend-auth ="system-assigned" >
            <vary-by>@(context.Subscription.Id)</vary-by>
        </llm-semantic-cache-lookup>
        <rate-limit calls="10" renewal-period="60" />
    </inbound>
    <outbound>
        <llm-semantic-cache-store duration="60" />
        <base />
    </outbound>
</policies>
```


## Related policies

* [Caching](api-management-policies.md#caching)
* [llm-semantic-cache-store](llm-semantic-cache-store-policy.md)

## Related content

For more information about working with policies, see:

- [Tutorial: Transform and protect your API](transform-api.md)
- [Policy reference](api-management-policies.md) for a full list of policy statements and their settings
- [Policy expressions](api-management-policy-expressions.md)
- [Set or edit policies](set-edit-policies.md)
- [Reuse policy configurations](policy-fragments.md)
- [Policy snippets repo](https://github.com/Azure/api-management-policy-snippets)
- [Policy samples repo](https://github.com/Azure-Samples/Apim-Samples)
- [Azure API Management policy toolkit](https://github.com/Azure/azure-api-management-policy-toolkit/)
- [Get Copilot assistance to create, explain, and troubleshoot policies](https://learn.microsoft.com/azure/copilot/author-api-management-policies?toc=%2Fazure%2Fapi-management%2Ftoc.json\&bc=/azure/api-management/breadcrumb/toc.json)
