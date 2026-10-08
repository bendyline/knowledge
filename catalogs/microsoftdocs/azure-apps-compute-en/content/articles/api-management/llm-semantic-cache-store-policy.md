---
title: Azure API Management policy reference - llm-semantic-cache-store
description: Reference for the llm-semantic-cache-store policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.collection: ce-skilling-ai-copilot
ms.custom:
ms.topic: reference
ms.date: 06/02/2026
ms.update-cycle: 180-days
---

# Cache responses to large language model API requests

**APPLIES TO: All API Management tiers**



The `llm-semantic-cache-store` policy caches responses to chat completion API requests to a configured external cache. Response caching reduces bandwidth and processing requirements imposed on the backend language model API and lowers latency perceived by API consumers.

> **Note:**
> * This policy must have a corresponding [Get cached responses to large language model API requests](llm-semantic-cache-lookup-policy.md) policy. 
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
<llm-semantic-cache-store duration="seconds" cache-response="true | false" />
```


## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| duration | Time-to-live of the cached entries, specified in seconds. Policy expressions are allowed. | Yes | N/A |
| cache-response | Set to `true` to cache the current HTTP response. If the attribute is omitted, only HTTP responses with the status code `200 OK` are cached. Policy expressions are allowed. | No | `false` |

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) outbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted

### Usage notes

- This policy can only be used once in a policy section.
- If the cache lookup fails, the API call that uses the cache-related operation doesn't raise an error, and the cache operation completes successfully. 
- 

We recommend configuring a [rate-limit](rate-limit-policy.md) policy (or [rate-limit-by-key](rate-limit-by-key-policy.md) policy) immediately after any cache lookup. This helps keep your backend service from getting overloaded if the cache isn't available.


## Examples

### Example with corresponding llm-semantic-cache-lookup policy


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
* [llm-semantic-cache-lookup](llm-semantic-cache-lookup-policy.md)

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
