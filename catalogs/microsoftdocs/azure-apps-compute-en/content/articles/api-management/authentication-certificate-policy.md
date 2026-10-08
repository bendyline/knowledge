---
title: Azure API Management policy reference - authentication-certificate | Microsoft Docs
description: Reference for the authentication-certificate policy available for use in Azure API Management. Provides policy usage, settings, and examples.
services: api-management

ms.service: azure-api-management
ms.topic: reference
ms.date: 08/18/2026
---

# Authenticate with client certificate

**APPLIES TO: All API Management tiers**



 Use the `authentication-certificate` policy to authenticate with a backend service using a client certificate. When the certificate is [installed into API Management](api-management-howto-mutual-certificates.md) first, identify it first by its thumbprint or certificate ID (resourcename). 

> **Caution:**
> Minimize risks of credential exposure when configuring this policy. Microsoft recommends that you use more secure authentication methods if supported by your backend, such as [managed identity authentication](authentication-managed-identity-policy.md) or [credential manager](credentials-overview.md). If you configure sensitive information in policy definitions, we recommend using [named values](api-management-howto-properties.md) and storing secrets in Azure Key Vault. 

> **Caution:**
> If the certificate references a certificate stored in Azure Key Vault, identify it using the certificate ID. When a key vault certificate is rotated, its thumbprint in API Management will change, and the policy will not resolve the new certificate if it is identified by thumbprint.

> **Note:**
> Set the policy's elements and child elements in the order provided in the policy statement. Learn more about [how to set or edit API Management policies](set-edit-policies.md).	


## Policy statement

```xml
<authentication-certificate thumbprint="thumbprint" certificate-id="resource name" body="certificate byte array" password="optional password"/>
```

## Attributes

| Attribute | Description | Required | Default |
| --- | --- | --- | --- |
| thumbprint | The thumbprint for the client certificate. Policy expressions are allowed. | Either `thumbprint` or `certificate-id` can be present. | N/A |
| certificate-id | The certificate resource name. Policy expressions are allowed. | Either `thumbprint` or `certificate-id` can be present. | N/A |
| body | Client certificate as a byte array. Use if the certificate isn't retrieved from the built-in certificate store. Policy expressions are allowed. | No | N/A |
| password | Password for the client certificate. Policy expressions are allowed. | Use if certificate specified in `body` is password protected. | N/A |

> **Important:**
> Linked access isn't checked when a certificate is referenced by using `certificate-id`. A user who has permission to write a policy can reference any available certificate and use it to authenticate requests to backend services, even if the user doesn't have read access to the certificate resource. This doesn't grant access to retrieve the certificate or its private key.

## Usage

- [**Policy sections:**](api-management-howto-policies.md#understanding-policy-configuration) inbound
- [**Policy scopes:**](api-management-howto-policies.md#scopes) global, workspace, product, API, operation
- [**Gateways:**](api-management-gateways-overview.md) classic, v2, consumption, self-hosted, workspace

### Usage notes

- We recommend configuring [key vault certificates](api-management-howto-mutual-certificates.md) to manage certificates used to secure access to backend services.
- If you configure a certificate password in this policy, we recommend using a [named value](api-management-howto-properties.md).


## Examples

### Client certificate identified by the certificate ID

```xml  
<authentication-certificate certificate-id="544fe9ddf3b8f30fb490d90f" />  
``` 

### Client certificate identified by thumbprint

```xml
<authentication-certificate thumbprint="CA06F56B258B7A0D4F2B05470939478651151984" />
```

### Client certificate set in the policy rather than retrieved from the built-in certificate store

```xml
<authentication-certificate body="@(context.Variables.GetValueOrDefault<byte[]>("byteCertificate"))" password="optional-certificate-password" />
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
