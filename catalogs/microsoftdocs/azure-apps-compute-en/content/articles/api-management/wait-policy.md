---
title: Azure API Management policy reference - wait | Microsoft Docs
description: Reference for the wait policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Wait

**APPLIES TO: All API Management tiers**



The `wait` policy executes its immediate child policies in parallel, and waits for either all or one of its immediate child policies to complete before it completes. The `wait` policy can have as its immediate child policies one or more of the following: [`send-request`](send-request-policy.md), [`cache-lookup-value`](cache-lookup-value-policy.md), and [`choose`](choose-policy.md) policies.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	


## Policy statement

```xml
<wait for="all | any">
  <!--Wait policy can contain send-request, cache-lookup-value,
        and choose policies as child elements -->
</wait>

```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| for | Determines whether the `wait` policy waits for all immediate child policies to be completed or just one. Allowed values are:<br /><br /> - `all` - wait for all immediate child policies to complete<br />- `any` - wait for any immediate child policy to complete. Once the first immediate child policy has completed, the `wait` policy completes and execution of any other immediate child policies is terminated.<br/><br/>Policy expressions are allowed. | No | `all` |


## Elements

May contain as child elements only `send-request`, `cache-lookup-value`, and `choose` policies.

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound, outbound, backend
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

## Example

In the following example, there are two `choose` policies as immediate child policies of the `wait` policy. Each of these `choose` policies executes in parallel. Each `choose` policy attempts to retrieve a cached value. If there is a cache miss, a backend service is called to provide the value. In this example the `wait` policy does not complete until all of its immediate child policies complete, because the `for` attribute is set to `all`. In this example the context variables (`execute-branch-one`, `value-one`, `execute-branch-two`, and `value-two`) are declared outside of the scope of this example policy.

> **Note:**
> 

Add a [rate-limit](rate-limit-policy.md) policy (or [rate-limit-by-key](rate-limit-by-key-policy.md) policy) after the cache lookup to help limit the number of calls and prevent overload on the backend service in case the cache isn't available.


```xml
<wait for="all">
  <choose>
    <when condition="@((bool)context.Variables["execute-branch-one="])">
      <cache-lookup-value key="key-one" variable-name="value-one" />
      <rate-limit calls="10" renewal-period="60" />
      <choose>
        <when condition="@(!context.Variables.ContainsKey("value-one="))">
          <send-request mode="new" response-variable-name="value-one">
            <set-url>https://backend-one</set-url>
            <set-method>GET</set-method>
          </send-request>
        </when>
      </choose>
    </when>
  </choose>
  <choose>
    <when condition="@((bool)context.Variables["execute-branch-two="])">
      <cache-lookup-value key="key-two" variable-name="value-two" />
      <rate-limit calls="10" renewal-period="60" />
      <choose>
        <when condition="@(!context.Variables.ContainsKey("value-two="))">
          <send-request mode="new" response-variable-name="value-two">
            <set-url>https://backend-two</set-url>
            <set-method>GET</set-method>
          </send-request>
        </when>
      </choose>
    </when>
  </choose>
</wait>
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
