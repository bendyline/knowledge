---
title: Azure API Management policy reference - rate-limit-by-key | Microsoft Docs
description: Reference for the rate-limit-by-key policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 11/14/2025
---

# Limit call rate by key


**APPLIES TO: Developer | Basic | Basic v2 | Standard | Standard v2 | Premium | Premium v2**

The `rate-limit-by-key` policy prevents API usage spikes on a per key basis by limiting the call rate to a specified number per a specified time period. The key can have an arbitrary string value and is typically provided using a policy expression. Optional increment condition can be added to specify which requests should be counted towards the limit. When this call rate is exceeded, the caller receives a `429 Too Many Requests` response status code.

To understand the difference between rate limits and quotas, [see Rate limits and quotas.](api-management-sample-flexible-throttling.md#rate-limits-and-quotas)

> **Caution:**
> Because of the distributed nature of throttling architecture, rate limiting is never completely accurate. The difference between the configured number of allowed requests and the actual number varies depending on request volume and rate, backend latency, and other factors.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. To help you configure this policy, the portal provides a guided, form-based editor. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<rate-limit-by-key calls="number"
                   renewal-period="seconds"
                   increment-condition="condition"
                   increment-count="number"
                   counter-key="key value" 
                   retry-after-header-name="custom header name, replaces default 'Retry-After'" 
                   retry-after-variable-name="policy expression variable name"
                   remaining-calls-header-name="header name"  
                   remaining-calls-variable-name="policy expression variable name"
                   total-calls-header-name="header name"/> 

```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| calls | The maximum total number of calls allowed for the key value during the time interval specified in the `renewal-period`. Policy expressions are allowed. | Yes | N/A |
| counter-key | The key to use for the rate limit policy. For each key value, a single counter is used for all scopes at which the policy is configured. Policy expressions are allowed. | Yes | N/A |
| increment-condition | The Boolean expression specifying if the request should be counted towards the rate (`true`). Policy expressions are allowed but will postpone evaluation and counter increment actions to end of outbound pipeline. | No | N/A |
| increment-count | The number by which the counter is increased per request. Policy expressions are allowed but will postpone evaluation and counter increment to end of outbound pipeline. | No | 1 |
| renewal-period | The length in seconds of the sliding window during which the number of allowed requests should not exceed the value specified in `calls`. Maximum allowed value: 300 seconds. Policy expressions are allowed. | Yes | N/A |
| retry-after-header-name | The name of a custom response header whose value is the recommended retry interval in seconds after the specified call rate is exceeded for the key value. Policy expressions aren't allowed. | No | `Retry-After` |
| retry-after-variable-name | The name of a policy expression variable that stores the recommended retry interval in seconds after the specified call rate is exceeded for the key value. Policy expressions aren't allowed. | No | N/A |
| remaining-calls-header-name | The name of a response header whose value after each policy execution is the number of remaining calls allowed for the key value in the time interval specified in the `renewal-period`. Policy expressions aren't allowed. | No | N/A |
| remaining-calls-variable-name | The name of a policy expression variable that after each policy execution stores the number of remaining calls allowed for the key value in the time interval specified in the `renewal-period`. Policy expressions aren't allowed. | No | N/A |
| total-calls-header-name | The name of a response header whose value is the value specified in `calls`. Policy expressions aren't allowed. | No | N/A |

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
- [**Gateways:**](api-management-gateways-overview.md) classic, v2, self-hosted, workspace

### Usage notes

* API Management uses a single counter for each `counter-key` value that you specify in the policy. The counter is updated at all scopes at which the policy is configured with that key value. If you want to configure separate counters at different scopes (for example, a specific API or product), specify different key values at the different scopes. For example, append a string that identifies the scope to the value of an expression.
* 
The v2 tiers use a *token bucket algorithm* for rate limiting, which differs from the *sliding window algorithm* in classic tiers. Because of this implementation difference, when you configure token limits in the v2 tiers at multiple scopes by using the same `counter-key`, make sure that the `tokens-per-minute` value is consistent across all policy instances. Inconsistent values can cause unpredictable behavior. For more information, see [Advanced request throttling with Azure API Management](api-management-sample-flexible-throttling.md#rate-limits)
* Rate limit counts in a self-hosted gateway can be configured to synchronize locally (among gateway instances across cluster nodes), for example, through Helm chart deployment for Kubernetes or using the Azure portal [deployment templates](how-to-deploy-self-hosted-gateway-kubernetes.md). However, rate limit counts don't synchronize with other gateway resources configured in the API Management instance, including the managed gateway in the cloud.  [Learn more](how-to-self-hosted-gateway-on-kubernetes-in-production.md#request-throttling)
* 
This policy tracks calls independently at each gateway where it is applied, including [workspace gateways](workspaces-overview.md#workspace-gateway) and regional gateways in a [multi-region deployment](api-management-howto-deploy-multi-region.md). It doesn't aggregate call data across the entire instance. 

* When `increment-condition` or `increment-count` are defined using expressions, evaluation and increment of the rate limit counter are postponed to the end of outbound pipeline to allow for policy expressions based on the response. Limit exceeded condition is not evaluated at the same time in this case and will be evaluated on next incoming call. This leads to cases where `429 Too Many Requests` status code is returned 1 call later than usual.

## Example

In the following example, the rate limit of 10 calls per 60 seconds is keyed by the caller IP address. After each policy execution, the remaining calls allowed for that caller IP address in the time period are stored in the variable `remainingCallsPerIP`.

```xml
<policies>
    <inbound>
        <base />
        <rate-limit-by-key calls="10"
              renewal-period="60"
              increment-condition="@(context.Response.StatusCode == 200)"
              counter-key="@(context.Request.IpAddress)"
              remaining-calls-variable-name="remainingCallsPerIP"/>
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
