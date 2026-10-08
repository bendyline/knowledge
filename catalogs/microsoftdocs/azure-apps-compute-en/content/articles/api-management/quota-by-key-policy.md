---
title: Azure API Management policy reference - quota-by-key | Microsoft Docs
description: Reference for the quota-by-key policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 05/06/2025
---
# Set usage quota by key


**APPLIES TO: Developer | Basic | Standard | Premium**

The `quota-by-key` policy enforces a renewable or lifetime call volume and/or bandwidth quota, on a per key basis. The key can have an arbitrary string value and is typically provided using a policy expression. Optional increment condition can be added to specify which requests should be counted towards the quota. If multiple policies would increment the same key value, it is incremented only once per request. When the quota is exceeded, the caller receives a `403 Forbidden` response status code, and the response includes a `Retry-After` header whose value is the recommended retry interval in seconds.

To understand the difference between rate limits and quotas, [see Rate limits and quotas.](api-management-sample-flexible-throttling.md#rate-limits-and-quotas)

> **Note:**
> When underlying compute resources restart in the service platform, API Management might continue to handle requests for a short period after a quota is reached.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. To help you configure this policy, the portal provides a guided, form-based editor. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	


## Policy statement

```xml
<quota-by-key calls="number"
              bandwidth="kilobytes"
              renewal-period="seconds"
              increment-condition="condition"
              increment-count="number"
              counter-key="key value"
              first-period-start="date-time" />
```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| bandwidth | The maximum total number of kilobytes allowed during the time interval specified in the `renewal-period`. Policy expressions aren't allowed. | Either `calls`, `bandwidth`, or both together must be specified. | N/A |
| calls | The maximum total number of calls allowed during the time interval specified in the `renewal-period`. Policy expressions aren't allowed. | Either `calls`, `bandwidth`, or both together must be specified. | N/A |
| counter-key | The key to use for the `quota policy`. For each key value, a single counter is used for all scopes at which the policy is configured. Policy expressions are allowed. | Yes | N/A |
| increment-condition | The Boolean expression specifying if the request should be counted towards the quota (`true`). Policy expressions are allowed. | No | N/A |
| increment-count | The number by which the counter is increased per request. Policy expressions are allowed. | No | 1 |
| renewal-period | The length in seconds of the fixed window after which the quota resets. The start of each period is calculated relative to `first-period-start`. Minimum period: 300 seconds. When `renewal-period` is set to 0, the period is set to infinite. Policy expressions aren't allowed. | Yes | N/A |
| first-period-start | The starting date and time for quota renewal periods, in the following format: `yyyy-MM-ddTHH:mm:ssZ` as specified by the ISO 8601 standard. Policy expressions aren't allowed. | No | `0001-01-01T00:00:00Z` |


## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
- [**Gateways:**](api-management-gateways-overview.md) classic, v2, self-hosted, workspace

### Usage notes

The `counter-key` attribute value must be unique across all the APIs in the API Management instance if you don't want to share the total between the other APIs.

## Example

```xml
<policies>
    <inbound>
        <base />
        <quota-by-key calls="10000" bandwidth="40000" renewal-period="3600"
                      increment-condition="@(context.Response.StatusCode >= 200 && context.Response.StatusCode < 400)"
                      counter-key="@(context.Request.IpAddress)" />
    </inbound>
    <outbound>
        <base />
    </outbound>
</policies>
```

For more information and examples of this policy, see [Advanced request throttling with Azure API Management](api-management-sample-flexible-throttling.md).

## Related policies

* [Rate limiting and quotas](api-management-policies.md#rate-limiting-and-quotas)

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
