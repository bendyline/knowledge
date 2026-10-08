---
title: Azure API Management policy reference - cache-store | Microsoft Docs
description: Reference for the cache-store policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 11/24/2025
---

# Store to cache

**APPLIES TO: All API Management tiers**



The `cache-store` policy caches responses according to the specified cache settings. This policy can be applied in cases where response content remains static over a period of time. Response caching reduces bandwidth and processing requirements imposed on the backend web server and lowers latency perceived by API consumers.

> **Note:**
> This policy must have a corresponding [Get from cache](cache-lookup-policy.md) policy.

> **Important:**
> Built-in cache is volatile and is shared by all units in the same region in the same API Management service.


> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. To help you configure this policy, the portal provides a guided, form-based editor. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<cache-store duration="seconds" cache-response="true | false" />
```


## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| duration | Time-to-live of the cached entries, specified in seconds. Policy expressions are allowed. | Yes | N/A |
| cache-response | Set to `true` to cache the current HTTP response. If the attribute is omitted, only HTTP responses with the status code `200 OK` are cached. Policy expressions are allowed. | No | `false` |

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) outbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

### Usage notes

- API Management only caches responses to HTTP GET requests.
- This policy can only be used once in a policy section.
- 

We recommend configuring a [rate-limit](rate-limit-policy.md) policy (or [rate-limit-by-key](rate-limit-by-key-policy.md) policy) immediately after any cache lookup. This helps keep your backend service from getting overloaded if the cache isn't available.



## Examples

### Example with corresponding cache-lookup policy

This example shows how to use the `cache-store` policy along with a `cache-lookup` policy to cache responses in the built-in API Management cache. 

> **Note:**
> 

Add a [rate-limit](rate-limit-policy.md) policy (or [rate-limit-by-key](rate-limit-by-key-policy.md) policy) after the cache lookup to help limit the number of calls and prevent overload on the backend service in case the cache isn't available.


```xml
<policies>
    <inbound>
        <base />
        <cache-lookup vary-by-developer="false" vary-by-developer-groups="false" downstream-caching-type="none" must-revalidate="true" caching-type="internal" >
            <vary-by-query-parameter>version</vary-by-query-parameter>
        </cache-lookup>
        <rate-limit calls="10" renewal-period="60" />
    </inbound>
    <outbound>
        <cache-store duration="seconds" />
        <base />
    </outbound>
</policies>
```



### Example using policy expressions

This example shows how to configure API Management response caching duration that matches the response caching of the backend service as specified by the backend service's `Cache-Control` directive. 

```xml
<!-- The following cache policy snippets demonstrate how to control API Management response cache duration with Cache-Control headers sent by the backend service. -->

<!-- Copy this snippet into the inbound section -->
<cache-lookup vary-by-developer="false" vary-by-developer-groups="false" downstream-caching-type="public" must-revalidate="true" >
  <vary-by-header>Accept</vary-by-header>
  <vary-by-header>Accept-Charset</vary-by-header>
</cache-lookup>
 <rate-limit calls="10" renewal-period="60" />

<!-- Copy this snippet into the outbound section. Note that cache duration is set to the max-age value provided in the Cache-Control header received from the backend service or to the default value of 5 min if none is found  -->
<cache-store duration="@{
    var header = context.Response.Headers.GetValueOrDefault("Cache-Control","");        
    var maxAge = Regex.Match(header, "@(max-age=(?<maxAge>\\d+))").Groups["maxAge"]?.Value;
    return (!string.IsNullOrEmpty(maxAge))?int.Parse(maxAge):300; }" />
```

For more information, see [Policy expressions](api-management-policy-expressions.md) and [Context variable](api-management-policy-expressions.md#ContextVariables).


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
