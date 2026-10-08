---
title: Azure API Management policy reference - cache-lookup-value | Microsoft Docs
description: Reference for the cache-lookup-value policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Get value from cache

**APPLIES TO: All API Management tiers**



Use the `cache-lookup-value` policy to perform cache lookup by key and return a cached value. The key can have an arbitrary string value and is typically provided using a policy expression.

> **Note:**
> This policy must have a corresponding [Store value in cache](cache-store-value-policy.md) policy.

> **Important:**
> Built-in cache is volatile and is shared by all units in the same region in the same API Management service.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<cache-lookup-value key="cache key value"
    default-value="value to use if cache lookup resulted in a miss"
    variable-name="name of a variable looked up value is assigned to"
    caching-type="prefer-external | external | internal" />
```


## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| caching-type | Choose between the following values of the attribute:<br />- `internal` to use the [built-in API Management cache](api-management-howto-cache.md),<br />- `external` to use the external cache as described in [Use an external Redis-compatible cache in Azure API Management](api-management-howto-cache-external.md),<br />- `prefer-external` to use external cache if configured or internal cache otherwise.<br/><br/>Policy expressions aren't allowed. | No | `prefer-external` |
| default-value | A value that will be assigned to the variable if the cache key lookup resulted in a miss. If this attribute is not specified, `null` is assigned. Policy expressions are allowed. | No | `null` |
| key | Cache key value to use in the lookup. Policy expressions are allowed. | Yes | N/A |
| variable-name | Name of the [context variable](api-management-policy-expressions.md#ContextVariables) the looked up value will be assigned to, if lookup is successful. If lookup results in a miss, the variable will not be set. Policy expressions aren't allowed. | Yes | N/A |


## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound, outbound, backend, on-error
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace


### Usage notes

- API Management only caches responses to HTTP GET requests.
- This policy can only be used once in a policy section.
- This policy is not supported inside a policy fragment.
- 

We recommend configuring a [rate-limit](rate-limit-policy.md) policy (or [rate-limit-by-key](rate-limit-by-key-policy.md) policy) immediately after any cache lookup. This helps keep your backend service from getting overloaded if the cache isn't available.


## Example

This example shows how to use the `cache-lookup-value` policy to retrieve a user profile from the cache. The key for the cache lookup is constructed using a policy expression that combines a string with the value of the `enduserid` context variable.

> **Note:**
> 

Add a [rate-limit](rate-limit-policy.md) policy (or [rate-limit-by-key](rate-limit-by-key-policy.md) policy) after the cache lookup to help limit the number of calls and prevent overload on the backend service in case the cache isn't available.


See a [cache-store-value](cache-store-value-policy.md#example) example to store the user profile in the cache.


```xml
<cache-lookup-value
    key="@("userprofile-" + context.Variables["enduserid"])"
    variable-name="userprofile" />
<rate-limit calls="10" renewal-period="60" />
```

For more information and examples of this policy, see [Custom caching in Azure API Management](api-management-sample-cache-by-key.md).



## Related policies

* [Caching](api-management-policies.md#caching)

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
