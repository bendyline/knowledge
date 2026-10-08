---
title: Azure API Management policy reference - redirect-content-urls | Microsoft Docs
description: Reference for the redirect-content-urls policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Mask URLs in content

**APPLIES TO: All API Management tiers**



The `redirect-content-urls` policy rewrites (masks) links in the response body. Use in the outbound section to rewrite response body links to the backend service to make them point to the gateway instead. For example, you might do this to hide URLs of the original backend service when they appear in the response. Use in the inbound section for an opposite effect.

> **Note:**
>  This policy does not change any header values such as `Location` headers. To change header values, use the [set-header](set-header-policy.md) policy.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<redirect-content-urls />
```

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound, outbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

### Usage notes

- This policy can only be used once in a policy section.


## Example

```xml
<redirect-content-urls />
```

For example, consider the following image, which shows an API response body that includes the original backend service URLs.

Screenshot showing original outbound response in test console in the portal.

After the `redirect-content-urls` policy is configured in the outbound section, the response body is rewritten to point to the gateway, in this case, `https://apim-hello-world.azure-api.net`.

Screenshot showing replaced URLs in test console in the portal.

## Related policies

* [Transformation](api-management-policies.md#transformation)

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
