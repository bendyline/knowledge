---
title: Configure Credential Providers - Azure API Management | Microsoft Docs
description: Learn how to configure common credential providers in the Azure API Management credential manager. Providers include Microsoft Entra and generic OAuth.  
services: api-management
ms.service: azure-api-management
ms.topic: how-to
ms.date: 04/09/2026
ms.custom: sfi-image-nochange
# Customer intent: As an Azure service administrator, I want to learn how to configure common credential providers in the API Management credential manager.
---

# Configure common credential providers in credential manager

**APPLIES TO: All API Management tiers**



In this article, you learn about configuring identity providers for managed [connections](credentials-overview.md) in your Azure API Management instance. Settings for the following common providers are shown:

* Microsoft Entra 
* Generic OAuth 2

You configure a credential provider in the credential manager in your API Management instance. For a step-by-step example of configuring a Microsoft Entra provider and connection, see [Configure credential manager - Microsoft Graph API](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/authorizations-how-to-azure-ad.md).

## Prerequisites

To configure any of the supported providers in API Management, first configure an OAuth 2.0 app in the identity provider that will be used to authorize API access. For configuration details, see the provider's developer documentation.

* If you're creating a credential provider that uses the authorization code grant type, configure a redirect URL (sometimes called an Authorization Callback URL or a similar name) in the app. For the value, enter `https://authorization-manager.consent.azure-apim.net/redirect/apim/<API-management-instance-name>`.

* Depending on your scenario, configure app settings like scopes (API permissions).
    
* Minimally, retrieve the following app credentials that will be configured in API Management: the app's **client ID** and **client secret** (client secret not required for federated identity credentials).

* Depending on the provider and your scenario, you might need to retrieve other settings, like authorization endpoint URLs or scopes.

* The provider's authorization endpoints must be reachable over the internet from your API Management instance. If your API Management instance is secured in a virtual network, configure network or firewall rules to allow access to the provider's endpoints. 

    Additionally, requests for tokens need to go out of the customer's network to the credential manager endpoint, which remains in a Microsoft network. To reach the credential manager endpoint, allow outbound access from the virtual network to the **AzureConnections** service tag on port 443.

## Microsoft Entra provider

API Management credential manager supports the Microsoft Entra identity provider, which is the identity service in Azure that provides identity management and access control capabilities. It enables users to securely sign in via industry-standard protocols.

**Supported grant types**: authorization code, client credentials, authorization code with federated identity credentials

> **Note:**
>  Currently, the Microsoft Entra credential provider supports only Azure Active Directory v1.0 endpoints.
 

### Microsoft Entra provider settings
    
| Property | Description | Required | Default |
| --- | --- | --- | --- |
| **Credential provider name** | The name of the credential provider resource in API Management. | Yes | N/A |
| **Identity provider** | Select **Azure Active Directory v1**. | Yes | N/A |
| **Grant type** | The OAuth 2.0 authorization grant type to use.<br/><br/>Depending on your scenario, select either **Authorization code**, **Client credentials**, or **Authorization code with federated identity credentials**. | Yes | **Authorization code** |
| **Authorization URL** | The authorization URL. | No | `https://login.microsoftonline.com` |
| **Client ID** | The application (client) ID used to identify the Microsoft Entra app. | Yes | N/A |
| **Client secret** | The client secret used for the Microsoft Entra app. | Yes for authorization code and client credentials grant types, no for federated identity credentials | N/A |
| **Resource URL** | The URL of the resource that requires authorization.<br/><br/> Example: `https://graph.microsoft.com` | Yes | N/A |
| **Tenant ID** | The tenant ID of your Microsoft Entra app. | No | **common** |
| **Scopes** | One or more API permissions for your Microsoft Entra app, separated by spaces. <br/><br/>Example: `ChannelMessage.Read.All User.Read` | No | API permissions set in the Microsoft Entra app |


Additional settings for authorization code with federated identity credentials grant type:

| Property | Description | Required | Default |
| --- | --- | --- | --- |
| **Issuer** | The issuer URL of the federated identity provider. | Yes | `https://login.microsoftonline.com/<tenant-id>/v2.0` |
| **Subject identifier** | The subject identifier generated by API Management for the credential manager. | Yes | N/A |
| **Audience** | The audience claim for tokens from the federated identity provider. | Yes | `api://AzureADTokenExchange` |

## Generic OAuth providers

You can use three generic providers for configuring connections:

* Generic OAuth 2.0
* Generic OAuth 2.0 with PKCE 
* Generic OAuth 2.1 with PKCE with dynamic client registration (DCR)

A generic provider enables you to use your own OAuth identity provider, based on your specific needs. 

> **Note:**
> We recommend using a PKCE provider for improved security if your identity provider supports it. For more information, see [Proof Key for Code Exchange](https://oauth.net/2/pkce/).

**Supported grant types**: authorization code, client credentials (depends on provider)

### Generic credential provider settings

| Property | Description | Required | Default |
| --- | --- | --- | --- |
| **Credential provider name** | The name of credential provider resource in API Management. | Yes | N/A |
| **Identity provider** | Select **OAuth 2.0**, **OAuth 2.0 with PKCE**, or **OAuth 2.1 with PKCE with DCR**. | Yes | N/A |
| **Grant type** | The OAuth 2.0 authorization grant type to use. <br/><br/>Depending on your scenario and your identity provider, select either **Authorization code** or **Client credentials**. | Yes | **Authorization code** |
| **Authorization URL** | The authorization endpoint URL. | Yes, for PKCE | UNUSED for OAuth 2.0 |
| **Client ID** | The ID used to identify an app to the identity provider's authorization server. | Yes | N/A |
| **Client secret** | The secret used by the app to authenticate with the identity provider's authorization server. | Yes | N/A |
| **Refresh URL** | The URL that your app makes a request to in order to exchange a refresh token for a renewed access token. | Yes, for PKCE | UNUSED for OAuth 2.0 |
| **Server URL** | The base server URL. | Yes, for OAuth 2.1 with PKCE with DCR | N/A |
| **Token URL** | The URL on the identity provider's authorization server that's used to programmatically request tokens. | Yes | N/A |
| **Scopes** | One or more specific actions the app is allowed to do or information that it can request on a user's behalf from an API, separated by spaces.<br/><br/> Example: `user web api openid` | No | N/A |

## Other identity providers

API Management supports several providers for popular SaaS offerings, including GitHub, LinkedIn, and others. You can select from a list of these providers in the Azure portal when you create a credential provider.

Screenshot of identity providers listed in the portal.

**Supported grant types**: authorization code 

Required settings for these providers differ, depending on the provider, but are similar to those for the [generic OAuth providers](#generic-oauth-providers). Consult the developer documentation for each provider.

> **Note:**
> Currently, the Salesforce provider doesn't include an expiry claim in its tokens. As a result, Credential Manager can't detect when these tokens expire and doesn't expose a mechanism to force refresh. With the Salesforce provider, you need custom refresh logic to manually reauthorize the connection to get a new token when the current token expires.


## Related content

* Learn more about managing [connections](credentials-overview.md) in API Management.
* Create a connection for [Microsoft Graph API](credentials-how-to-azure-ad.md) or [GitHub API](credentials-how-to-github.md).
