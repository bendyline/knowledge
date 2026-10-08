---
title: Azure API Management policy reference - authentication-basic | Microsoft Docs
description: Reference for the authentication-basic policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 07/23/2024
---

# Authenticate with Basic

**APPLIES TO: All API Management tiers**



Use the `authentication-basic` policy to authenticate with a backend service using Basic authentication. This policy effectively sets the HTTP Authorization header to the value corresponding to the credentials provided in the policy.

> **Caution:**
> Minimize risks of credential exposure when configuring this policy. Microsoft recommends that you use more secure authentication methods if supported by your backend, such as [managed identity authentication](authentication-managed-identity-policy.md) or [credential manager](credentials-overview.md). If you configure sensitive information in policy definitions, we recommend using [named values](api-management-howto-properties.md) and storing secrets in Azure Key Vault. 

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	


## Policy statement

```xml
<authentication-basic username="username" password="password" />
```


## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| username | Specifies the username of the Basic credential. Policy expressions are allowed. | Yes | N/A |
| password | Specifies the password of the Basic credential. Policy expressions are allowed. | Yes | N/A |


## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
- [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

### Usage notes

- This policy can only be used once in a policy section.
- We recommend using [named values](api-management-howto-properties.md) to provide credentials, with secrets protected in a key vault.

## Example

```xml
<authentication-basic username="testuser" password="testpassword" />
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
