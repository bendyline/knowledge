---
title: Azure API Management policy reference - set-backend-service (Dapr) | Microsoft Docs
description: Reference for the set-backend-service policy available for use in Dapr integration with Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 08/18/2026
---

# Send request to a service

**APPLIES TO: Developer | Premium**



The `set-backend-service` policy sets the target URL for the current request to `http://localhost:3500/v1.0/invoke/{app-id}[.{ns-name}]/method/{method-name}`, replacing template parameters with values specified in the policy statement.

The policy assumes that Dapr runs in a sidecar container in the same pod as the gateway. Upon receiving the request, Dapr runtime performs service discovery and actual invocation, including possible protocol translation between HTTP and gRPC, retries, distributed tracing, and error handling. Learn more about [Dapr integration with API Management](self-hosted-gateway-enable-dapr.md).

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<set-backend-service backend-id="dapr" dapr-app-id="app-id" dapr-method="method-name" dapr-namespace="ns-name" />
```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| backend-id | Must be set to "dapr". | Yes | N/A |
| dapr-app-id | Name of the target microservice. Used to form the [appId](https://github.com/dapr/docs/blob/master/daprdocs/content/en/reference/api/service_invocation_api.md) parameter in Dapr. Policy expressions are allowed. | Yes | N/A |
| dapr-method | Name of the method or a URL to invoke on the target microservice. Maps to the [method-name](https://github.com/dapr/docs/blob/master/daprdocs/content/en/reference/api/service_invocation_api.md) parameter in Dapr. Policy expressions are allowed. | Yes | N/A |
| dapr-namespace | Name of the namespace the target microservice is residing in. Used to form the [appId](https://github.com/dapr/docs/blob/master/daprdocs/content/en/reference/api/service_invocation_api.md) parameter in Dapr. Policy expressions are allowed. | No | N/A |

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) self-hosted

### Usage notes

Dapr support must be [enabled](self-hosted-gateway-enable-dapr.md) in the self-hosted gateway.

## Example

The following example demonstrates invoking the method named "back" on the microservice called "echo". The `set-backend-service` policy sets the destination URL to `http://localhost:3500/v1.0/invoke/echo.echo-app/method/back`. The [`forward-request`](forward-request-policy.md) policy dispatches the request to the Dapr runtime, which delivers it to the microservice.

The `forward-request` policy is shown here for clarity. The policy is typically "inherited" from the global scope via the `base` keyword.

```xml
<policies>
    <inbound>
        <base />
        <set-backend-service backend-id="dapr" dapr-app-id="echo" dapr-method="back" dapr-namespace="echo-app" />
    </inbound>
    <backend>
        <forward-request />
    </backend>
    <outbound>
        <base />
    </outbound>
    <on-error>
        <base />
    </on-error>
</policies>
```

## Related policies

* [Integration and external communication](api-management-policies.md#integration-and-external-communication)

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
