---
title: Azure API Management policy reference - proxy | Microsoft Docs
description: Reference for the proxy policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Set HTTP proxy

**APPLIES TO: All API Management tiers**



The `proxy` policy allows you to route requests forwarded to backends via an HTTP proxy. Only HTTP (not HTTPS) is supported between the gateway and the proxy. Basic and NTLM authentication only. 

> **Caution:**
> Minimize risks of credential exposure when configuring this policy. Microsoft recommends that you use more secure authentication methods if supported by your backend, such as [managed identity authentication](authentication-managed-identity-policy.md) or [credential manager](credentials-overview.md). If you configure sensitive information in policy definitions, we recommend using [named values](api-management-howto-properties.md) and storing secrets in Azure Key Vault. 

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	


## Policy statement

```xml
<proxy url="http://hostname-or-ip:port" username="username" password="password" />
```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| url | Proxy URL in the form of `http://host:port`. Policy expressions are allowed. | Yes | N/A |
| username | Username to be used for authentication with the proxy. Policy expressions are allowed. | No | N/A |
| password | Password to be used for authentication with the proxy. Policy expressions are allowed. | No | N/A |

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
-  [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

### Usage notes

- We recommend using [named values](api-management-howto-properties.md) to provide credentials, with secrets protected in a key vault.


## Example

In this example, [named values](api-management-howto-properties.md) are used for the username and password to avoid storing sensitive information in the policy document.

```xml
<proxy url="http://192.168.1.1:8080" username={{username}} password={{password}} />
```


## Related policies

* [Routing](api-management-policies.md#routing)

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
