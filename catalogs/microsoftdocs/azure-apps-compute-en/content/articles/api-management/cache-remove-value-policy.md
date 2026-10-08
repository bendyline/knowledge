---
title: Azure API Management policy reference - cache-remove-value | Microsoft Docs
description: Reference for the cache-remove-value policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 06/02/2026
---

# Remove value from cache

**APPLIES TO: All API Management tiers**



The `cache-remove-value` deletes a cached item identified by its key. The key can have an arbitrary string value and is typically provided using a policy expression.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<cache-remove-value key="cache key value" caching-type="prefer-external | external | internal" fail-on-cache-removal-error="true | false" />
```


## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| caching-type | Choose between the following values of the attribute:<br />- `internal` to use the [built-in API Management cache](api-management-howto-cache.md),<br />- `external` to use the external cache as described in [Use an external Redis-compatible cache in Azure API Management](api-management-howto-cache-external.md),<br />- `prefer-external` to use external cache if configured or internal cache otherwise. <br/><br/>Policy expressions aren't allowed. | No | `prefer-external` |
| key | The key of the previously cached value to be removed from the cache. Policy expressions are allowed. | Yes | N/A |
| fail-on-cache-removal-error | Set to `true` to fail the request if the cache removal operation fails. Set to `false` to ignore cache removal errors. Policy expressions are allowed. | No | `false` |

## Usage


- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound, outbound, backend, on-error
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

## Example

The following example shows how to use the `cache-remove-value` policy to remove a user profile from the cache. The key for the cache REMOVAL is constructed using a policy expression that combines a string with the value of the `enduserid` context variable.

```xml
<cache-remove-value
    key="@("userprofile-" + context.Variables["enduserid"])"  />

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
