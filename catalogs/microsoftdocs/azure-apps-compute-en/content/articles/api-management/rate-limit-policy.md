---
title: Azure API Management policy reference - rate-limit | Microsoft Docs
description: Reference for the rate-limit policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 08/18/2026
---

# Limit call rate by subscription

**APPLIES TO: All API Management tiers**



The `rate-limit` policy prevents API usage spikes on a per subscription basis by limiting the call rate to a specified number per a specified time period. When the call rate is exceeded, the caller receives a `429 Too Many Requests` response status code.

To understand the difference between rate limits and quotas, [see Rate limits and quotas.](api-management-sample-flexible-throttling.md#rate-limits-and-quotas)


> **Caution:**
> Because of the distributed nature of throttling architecture, rate limiting is never completely accurate. The difference between the configured number of allowed requests and the actual number varies depending on request volume and rate, backend latency, and other factors.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<rate-limit calls="number" renewal-period="seconds"  retry-after-header-name="custom header name, replaces default 'Retry-After'" 
        retry-after-variable-name="policy expression variable name"
        remaining-calls-header-name="header name"  
        remaining-calls-variable-name="policy expression variable name"
        total-calls-header-name="header name">
    <api name="API name" id="API id" calls="number" renewal-period="seconds" >
        <operation name="operation name" id="operation id" calls="number" renewal-period="seconds" />
    </api>
</rate-limit>
```
## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| calls | The maximum total number of calls allowed during the time interval specified in `renewal-period`. Policy expressions aren't allowed. | Yes | N/A |
| renewal-period | The length in seconds of the sliding window during which the number of allowed requests should not exceed the value specified in `calls`. Maximum allowed value: 300 seconds. Policy expressions aren't allowed. | Yes | N/A |
| retry-after-header-name | The name of a custom response header whose value is the recommended retry interval in seconds after the specified call rate is exceeded. Policy expressions aren't allowed. | No | `Retry-After` |
| retry-after-variable-name | The name of a variable that stores the recommended retry interval in seconds after the specified call rate is exceeded. Policy expressions aren't allowed. | No | N/A |
| remaining-calls-header-name | The name of a response header whose value after each policy execution is the number of remaining calls allowed for the time interval specified in the `renewal-period`. Policy expressions aren't allowed. | No | N/A |
| remaining-calls-variable-name | The name of a variable that after each policy execution stores the number of remaining calls allowed for the time interval specified in the `renewal-period`. Policy expressions aren't allowed. | No | N/A |
| total-calls-header-name | The name of a response header whose value is the value specified in `calls`. Policy expressions aren't allowed. | No | N/A |


## Elements

| Element | Description | Required |
| --- | --- | --- |
| api | Add one or more of these elements to impose a call rate limit on APIs within the product. Product and API call rate limits are applied independently. API can be referenced either via `name` or `id`. If both attributes are provided, `id` will be used and `name` will be ignored. | No |
| operation | Add one or more of these elements to impose a call rate limit on operations within an API. Product, API, and operation call rate limits are applied independently. Operation can be referenced either via `name` or `id`. If both attributes are provided, `id` will be used and `name` will be ignored. | No |


### Api attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| name | The name of the API for which to apply the rate limit. | Either `name` or `id` must be specified. | N/A |
| id | The ID of the API for which to apply the rate limit. | Either `name` or `id` must be specified. | N/A |
| calls | The maximum total number of calls allowed during the time interval specified in `renewal-period`. Policy expressions aren't allowed. | Yes | N/A |
| renewal-period | The length in seconds of the sliding window during which the number of allowed requests should not exceed the value specified in `calls`. Maximum allowed value: 300 seconds. Policy expressions aren't allowed. | Yes | N/A |


### Operation attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| name | The name of the operation for which to apply the rate limit. | Either `name` or `id` must be specified. | N/A |
| id | The ID of the operation for which to apply the rate limit. | Either `name` or `id` must be specified. | N/A |
| calls | The maximum total number of calls allowed during the time interval specified in `renewal-period`. Policy expressions aren't allowed. | Yes | N/A |
| renewal-period | The length in seconds of the sliding window during which the number of allowed requests should not exceed the value specified in `calls`. Maximum allowed value: 300 seconds. Policy expressions aren't allowed. | Yes | N/A |

> **Important:**
> Linked access isn't checked when an API or operation is referenced by using the `name` or `id` attribute. A user who has permission to write a policy can reference any available API or operation and cause API Management to count and throttle subscription traffic for it according to the configured rate limit, even if the user doesn't have read access to that resource. This doesn't grant access to view or modify the API or operation definition.

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

### Usage notes

* This policy can be used only once per policy definition.
* This policy is only applied when an API is accessed using a subscription key.
* 
The v2 tiers use a *token bucket algorithm* for rate limiting, which differs from the *sliding window algorithm* in classic tiers. Because of this implementation difference, when you configure token limits in the v2 tiers at multiple scopes by using the same `counter-key`, make sure that the `tokens-per-minute` value is consistent across all policy instances. Inconsistent values can cause unpredictable behavior. For more information, see [Advanced request throttling with Azure API Management](api-management-sample-flexible-throttling.md#rate-limits)
* Rate limit counts in a self-hosted gateway can be configured to synchronize locally (among gateway instances across cluster nodes), for example, through Helm chart deployment for Kubernetes or using the Azure portal [deployment templates](how-to-deploy-self-hosted-gateway-kubernetes.md). However, rate limit counts don't synchronize with other gateway resources configured in the API Management instance, including the managed gateway in the cloud.  [Learn more](how-to-self-hosted-gateway-on-kubernetes-in-production.md#request-throttling)
* 
This policy tracks calls independently at each gateway where it is applied, including [workspace gateways](workspaces-overview.md#workspace-gateway) and regional gateways in a [multi-region deployment](api-management-howto-deploy-multi-region.md). It doesn't aggregate call data across the entire instance. 




## Example

In the following example, the per subscription rate limit is 20 calls per 90 seconds. After each policy execution, the remaining calls allowed in the time period are stored in the variable `remainingCallsPerSubscription`.

```xml
<policies>
    <inbound>
        <base />
        <rate-limit calls="20" renewal-period="90" remaining-calls-variable-name="remainingCallsPerSubscription"/>
    </inbound>
    <outbound>
        <base />
    </outbound>
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
