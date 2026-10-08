---
title: Azure API Management policy reference - mock-response | Microsoft Docs
description: Reference for the mock-response policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Mock response

**APPLIES TO: All API Management tiers**



The `mock-response` policy, as the name implies, is used to mock APIs and operations. It cancels normal pipeline execution and returns a mocked response to the caller. The policy always tries to return responses of highest fidelity. It prefers response content examples, when available. It generates sample responses from schemas, when schemas are provided and examples aren't. If neither examples or schemas are found, responses with no content are returned.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	


## Policy statement

```xml
<mock-response status-code="code" content-type="media type"/>
```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| status-code | Specifies response status code and is used to select corresponding example or schema. Policy expressions aren't allowed. | No | 200 |
| content-type | Specifies `Content-Type` response header value and is used to select corresponding example or schema. Policy expressions aren't allowed. | No | None |

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound, outbound, on-error
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

### Usage notes

-  [Policy expressions](api-management-policy-expressions.md) can't be used in attribute values for this policy.

## Examples

```xml
<!-- Returns 200 OK status code. Content is based on an example or schema, if provided for this status code. First found content type is used. If no example or schema is found, the content is empty. -->
<mock-response/>

<!-- Returns 200 OK status code. Content is based on an example or schema, if provided for this status code and media type. If no example or schema found, the content is empty. -->
<mock-response status-code='200' content-type='application/json'/>
```

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
