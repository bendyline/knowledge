---
title: Azure API Management policy reference - ip-filter | Microsoft Docs
description: Reference for the ip-filter policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 02/23/2026
---
# Restrict caller IPs

**APPLIES TO: All API Management tiers**



The `ip-filter` policy filters (allows/denies) calls from specific IP addresses and/or address ranges.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. To help you configure this policy, the portal provides a guided, form-based editor. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<ip-filter action="allow | forbid">
    <address>address</address>
    <address-range from="address" to="address" />
</ip-filter>
```


## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| action | Specifies whether calls should be allowed (`allow`) or not (`forbid`) for the specified IP addresses and ranges. Policy expressions are allowed. | Yes | N/A |

## Elements

| Element | Description | Required |
| --- | --- | --- |
| address | Add one or more of these elements to specify a single IP address on which to filter. Policy expressions are allowed. | At least one `address` or `address-range` element is required. |
| address-range | Add one or more of these elements to specify a range of IP addresses `from` "address" `to` "address" on which to filter. | At least one `address` or `address-range` element is required. |


## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
- [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

### Usage notes

- If you configure this policy at more than one scope, IP filtering is applied in the order of [policy evaluation](set-edit-policies.md#use-base-element-to-set-policy-evaluation-order) in your policy definition. 

- If `action` is set to `allow`, requests that don't match any `address` or `address-range` are denied. If `action` is set to `forbid`, requests that don't match any `address` or `address-range` are allowed.

## Example

In the following example, the policy only allows requests coming either from the single IP address or range of IP addresses specified.

```xml
<ip-filter action="allow">
    <address>13.66.201.169</address>
    <address-range from="13.66.140.128" to="13.66.140.143" />
</ip-filter>
```

## Related policies

* [Authentication and authorization](api-management-policies.md#authentication-and-authorization)

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
