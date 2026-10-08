---
title: Azure API Management policy reference - include-fragment | Microsoft Docs
description: Reference for the include-fragment policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 08/18/2026
---

# Include fragment

**APPLIES TO: All API Management tiers**



The `include-fragment` policy inserts the contents of a previously created [policy fragment](policy-fragments.md) in the policy definition. A policy fragment is a centrally managed, reusable XML policy snippet that can be included in policy definitions in your API Management instance.

The policy inserts the policy fragment as-is at the location you select in the policy definition.  

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<include-fragment fragment-id="fragment" />
```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| fragment-id | A string. Specifies the identifier (name) of a policy fragment created in the API Management instance. Policy expressions aren't allowed. | Yes | N/A |

> **Important:**
> Linked access isn't checked when a policy fragment is referenced by using `fragment-id`. A user who has permission to write a policy can reference any available policy fragment and cause API Management to execute its policy statements, even if the user doesn't have read access to the policy fragment resource. This doesn't grant access to view or modify the policy fragment definition.

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound, outbound, backend, on-error
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

## Example

In the following example, the policy fragment named *myFragment* is added in the inbound section of a policy definition.

```xml
<inbound>
    <include-fragment fragment-id="myFragment" />
    <base />
</inbound>
[...]
```

## Related policies

* [Policy control and flow](api-management-policies.md#policy-control-and-flow)

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
