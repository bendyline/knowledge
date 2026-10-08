---
title: Azure API Management policy reference - trace | Microsoft Docs
description: Reference for the trace policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management
ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Trace

**APPLIES TO: All API Management tiers**



The `trace` policy adds a custom trace into the request tracing output in the test console, Application Insights telemetries, and/or resource logs.

-   The policy adds a custom trace to the [request tracing](api-management-howto-api-inspector.md) output in the test console when tracing is triggered.
-   The policy creates a [Trace](https://learn.microsoft.com/azure/azure-monitor/app/data-model-complete#trace) telemetry in Application Insights, when [Application Insights integration](api-management-howto-app-insights.md) is enabled and the `severity` specified in the policy is equal to or greater than the `verbosity` specified in the [diagnostic setting](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/diagnostic-logs-reference.md).
-   The policy adds a property in the log entry when [resource logs](api-management-howto-use-azure-monitor.md#resource-logs) are enabled and the severity level specified in the policy is at or higher than the verbosity level specified in the [diagnostic setting](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/diagnostic-logs-reference.md).
-   The policy is not affected by Application Insights sampling. All invocations of the policy will be logged.

> **Important:**
> - API Management no longer supports subscriptions for tracing or the **Ocp-Apim-Trace** header.
> - To improve API security, tracing can now be enabled at the level of an individual API. Obtain a time-limited token using the API Management REST API, and pass the token in a request to the gateway. For details, see [Enable tracing of an API](api-management-howto-api-inspector.md#enable-tracing-for-an-api).
> - Take care when enabling tracing. It can expose sensitive information in the trace data. Ensure that you have appropriate security measures in place to protect the trace data.


> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<trace source="arbitrary string literal" severity="verbose | information | error">
    <message>String literal or expressions</message>
    <metadata name="string literal or expressions" value="string literal or expressions"/>
</trace>
```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| source | String literal meaningful to the trace viewer and specifying the source of the message. Policy expressions aren't allowed. | Yes | N/A |
| severity | Specifies the severity level of the trace. Allowed values are `verbose`, `information`, `error` (from lowest to highest). Policy expressions aren't allowed. | No | `verbose` |

## Elements

| Name | Description | Required |
| --- | --- | --- |
| message | A string or expression to be logged. Policy expressions are allowed. | Yes |
| metadata | Adds a custom property to the Application Insights [Trace](https://learn.microsoft.com/azure/azure-monitor/app/data-model-complete#trace) telemetry. | No |

### metadata attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| name | Name of the property. | Yes | N/A |
| value | Value of the property. | Yes | N/A |

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound, outbound, backend
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

## Example

```xml
<trace source="PetStore API" severity="verbose">
    <message>@((string)context.Variables["clientConnectionID"])</message>
    <metadata name="Operation Name" value="New-Order"/>
</trace>
```

## Related policies

* [Logging](api-management-policies.md#logging)

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
