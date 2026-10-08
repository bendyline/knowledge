---
title: Azure API Management policy reference - set-variable | Microsoft Docs
description: Reference for the set-variable policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Set variable

**APPLIES TO: All API Management tiers**



The `set-variable` policy declares a [context](api-management-policy-expressions.md#ContextVariables) variable and assigns it a value specified via an [expression](api-management-policy-expressions.md) or a string literal. If the expression contains a literal it will be converted to a string and the type of the value will be `System.String`.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	

## Policy statement

```xml
<set-variable name="variable name" value="Expression | String literal" />
```

## Attributes

| Attribute | Description | Required |
| --- | --- | --- |
| name | The name of the variable.  Policy expressions aren't allowed. | Yes |
| value | The value of the variable. This can be an expression or a literal value. Policy expressions are allowed. | Yes |

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound, outbound, backend, on-error
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

## Allowed types

Expressions used in the `set-variable` policy must return one of the following types.

-   Newtonsoft.Json.Linq.JArray
-   Newtonsoft.Json.Linq.JConstructor
-   Newtonsoft.Json.Linq.JContainer
-   Newtonsoft.Json.Linq.JProperty
-   Newtonsoft.Json.Linq.JObject
-   Newtonsoft.Json.Linq.JRaw
-   Newtonsoft.Json.Linq.JToken
-   Newtonsoft.Json.Linq.JValue
-   System.Boolean
-   System.SByte
-   System.SByte[]
-   System.Byte
-   System.Byte[]
-   System.UInt16
-   System.UInt32
-   System.UInt64
-   System.Int16
-   System.Int32
-   System.Int64
-   System.Decimal
-   System.Single
-   System.Double
-   System.Guid
-   System.String
-   System.Char
-   System.DateTime
-   System.TimeSpan
-   System.Byte?
-   System.UInt16?
-   System.UInt32?
-   System.UInt64?
-   System.Int16?
-   System.Int32?
-   System.Int64?
-   System.Decimal?
-   System.Single?
-   System.Double?
-   System.Guid?
-   System.String?
-   System.Char?
-   System.DateTime?

## Example

The following example demonstrates a `set-variable` policy in the inbound section. This set variable policy creates an `isMobile` Boolean [context](api-management-policy-expressions.md#ContextVariables) variable that is set to true if the `User-Agent` request header contains the text `iPad` or `iPhone`.

```xml
<set-variable name="IsMobile" value="@(context.Request.Headers.GetValueOrDefault("User-Agent","").Contains("iPad") || context.Request.Headers.GetValueOrDefault("User-Agent","").Contains("iPhone"))" />
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
