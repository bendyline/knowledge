---
title: Azure API Management policy reference - check-header | Microsoft Docs
description: Reference for the check-header policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Check HTTP header

**APPLIES TO: All API Management tiers**



Use the `check-header` policy  to enforce that a request has a specified HTTP header. You can optionally check to see if the header has a specific value or one of a range of allowed values. If the check fails, the policy terminates request processing and returns the HTTP status code and error message specified by the policy.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<check-header name="header name" failed-check-httpcode="code" failed-check-error-message="message" ignore-case="true | false">
    <value>Value1</value>
    <value>Value2</value>
</check-header>
```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| name | The name of the HTTP header to check. Policy expressions are allowed. | Yes | N/A |
| failed-check-httpcode | HTTP status code to return if the header doesn't exist or has an invalid value. Policy expressions are allowed. | Yes | N/A |
| failed-check-error-message | Error message to return in the HTTP response body if the header doesn't exist or has an invalid value. This message must have any special characters properly escaped. Policy expressions are allowed. | Yes | N/A |
| ignore-case | Boolean. If set to `true`, case is ignored when the header value is compared against the set of acceptable values. Policy expressions are allowed. | Yes | N/A |

## Elements

| Element | Description | Required |
| --- | --- | --- |
| value | Add one or more of these elements to specify allowed HTTP header values. When multiple `value` elements are specified, the check is considered a success if any one of the values is a match. | No |





## Usage

- **[Policy sections:](api-management-howto-policies.md#understanding-policy-configuration)** inbound
- **[Policy scopes:](api-management-howto-policies.md#scopes)** global, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

## Example

```xml
<check-header name="Authorization" failed-check-httpcode="401" failed-check-error-message="Not authorized" ignore-case="false">
    <value>f6dc69a089844cf6b2019bae6d36fac8</value>
</check-header>
```

## Related policies

* [Authentication and authorization](api-management-policies.md#authentication-and-authorization)

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
