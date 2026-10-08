---
title: Azure API Management policy reference - jsonp | Microsoft Docs
description: Reference for the jsonp policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# JSONP

**APPLIES TO: All API Management tiers**



The `jsonp` policy adds JSON with padding (JSONP) support to an operation or an API to allow cross-domain calls from JavaScript browser-based clients. JSONP is a method used in JavaScript programs to request data from a server in a different domain. JSONP bypasses the limitation enforced by most web browsers where access to web pages must be in the same domain.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<jsonp callback-parameter-name="callback function name" />
```

## Attributes

| Name | Description | Required | Default |
| --- | --- | --- | --- |
| callback-parameter-name | The cross-domain JavaScript function call prefixed with the fully qualified domain name where the function resides. Policy expressions are allowed. | Yes | N/A |

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) outbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

### Usage notes

- This policy can only be used once in a policy section.

## Example

```xml
<jsonp callback-parameter-name="cb" />
```

If you call the method without the callback parameter `?cb=XXX`, it will return plain JSON (without a function call wrapper).

If you add the callback parameter `?cb=XXX`, it will return a JSONP result, wrapping the original JSON results around the callback function like `XYZ('<json result goes here>');`

## Related policies

* [Cross-domain](api-management-policies.md#cross-domain)

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
