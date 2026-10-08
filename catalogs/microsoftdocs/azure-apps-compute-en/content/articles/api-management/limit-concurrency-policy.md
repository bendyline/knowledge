---
title: Azure API Management policy reference - limit-concurrency | Microsoft Docs
description: Reference for the limit-concurrency policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Limit concurrency

**APPLIES TO: All API Management tiers**



The `limit-concurrency` policy prevents enclosed policies from executing by more than the specified number of requests at any time. When that number is exceeded, new requests will fail immediately with the `429` Too Many Requests status code.

> **Caution:**
> Because of the distributed nature of throttling architecture, rate limiting is never completely accurate. The difference between the configured number of allowed requests and the actual number varies depending on request volume and rate, backend latency, and other factors.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<limit-concurrency key="expression" max-count="number">
        <!— nested policy statements -->
</limit-concurrency>
```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| key | A string. Specifies the concurrency scope. Can be shared by multiple policies. Policy expressions are allowed. | Yes | N/A |
| max-count | An integer. Specifies a maximum number of requests that are allowed to enter the policy. Policy expressions aren't allowed. | Yes | N/A |


## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound, outbound, backend, on-error
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

### Usage notes

* The maximum number of requests enforced by API Management is lower when multiple capacity units are deployed in a region.

## Example

The following example demonstrates how to limit number of requests forwarded to a backend based on the value of a context variable.

```xml
<policies>
  <inbound>…</inbound>
  <backend>
    <limit-concurrency key="@((string)context.Variables["connectionId"])" max-count="3">
      <forward-request timeout="120"/>
    </limit-concurrency>
  </backend>
  <outbound>…</outbound>
</policies>
```

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
