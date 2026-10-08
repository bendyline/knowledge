---
title: Manage resources with Microsoft Graph
titleSuffix: Azure AD B2C
description: How to manage resources in an Azure AD B2C tenant by calling the Microsoft Graph API and using an application identity to automate the process.
author: kengaderdus
manager: CelesteDG
ms.service: entra-id
ms.topic: how-to
ms.date: 04/18/2025
ms.author: kengaderdus
ms.subservice: b2c
ms.custom: sfi-image-nochange


#Customer intent: As a developer, I want to programmatically manage resources in my Azure AD B2C directory using Microsoft Graph API, so that I can automate user management tasks, such as creating, updating, and deleting users, identity providers, user flows, custom policies, and policy keys.

---
# Manage Azure AD B2C with Microsoft Graph


> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

Microsoft Graph allows you to manage resources in your Azure AD B2C directory. The following Microsoft Graph API operations are supported for the management of Azure AD B2C resources, including users, identity providers, user flows, custom policies, and policy keys. Each link in the following sections targets the corresponding page within the Microsoft Graph API reference for that operation. 

> **Note:**
> You can also programmatically create an Azure AD B2C directory itself, along with the corresponding Azure resource linked to an Azure subscription. This functionality isn't exposed through the Microsoft Graph API, but through the Azure REST API. For more information, see [B2C Tenants - Create](https://learn.microsoft.com/rest/api/activedirectory/b2c-tenants/create).

## Prerequisites

- To use MS Graph API, and interact with resources in your Azure AD B2C tenant, you need an application registration that grants the permissions to do so. Follow the steps in the [Register a Microsoft Graph application](microsoft-graph-get-started.md) article to create an application registration that your management application can use. 

## User management
> **Note:**
> Azure AD B2C currently doesn't support advanced query capabilities on directory objects. This means that there's no support for `$count`, `$search` query parameters and Not (`not`), Not equals (`ne`), and Ends with (`endsWith`) operators in `$filter` query parameter. For more information, see [query parameters in Microsoft Graph](https://learn.microsoft.com/graph/query-parameters) and [advanced query capabilities in Microsoft Graph](https://learn.microsoft.com/graph/aad-advanced-queries).


- [List users](https://learn.microsoft.com/graph/api/user-list)
- [Create a consumer user](https://learn.microsoft.com/graph/api/user-post-users)
- [Get a user](https://learn.microsoft.com/graph/api/user-get)
- [Update a user](https://learn.microsoft.com/graph/api/user-update)
- [Delete a user](https://learn.microsoft.com/graph/api/user-delete)

### User migration

Watch this video to learn how user migration to Azure AD B2C can be managed using Microsoft Graph API.

>[!Video https://www.youtube.com/embed/9BRXBtkBzL4]

## User phone number management

A phone number that can be used by a user to sign-in using [SMS or voice calls](sign-in-options.md#phone-sign-in), or [multifactor authentication](multi-factor-authentication.md). For more information, see [Microsoft Entra authentication methods API](https://learn.microsoft.com/graph/api/resources/phoneauthenticationmethod).

- [Add](https://learn.microsoft.com/graph/api/authentication-post-phonemethods)
- [List](https://learn.microsoft.com/graph/api/authentication-list-phonemethods)
- [Get](https://learn.microsoft.com/graph/api/phoneauthenticationmethod-get)
- [Update](https://learn.microsoft.com/graph/api/phoneauthenticationmethod-update)
- [Delete](https://learn.microsoft.com/graph/api/phoneauthenticationmethod-delete)

Note, the [list](https://learn.microsoft.com/graph/api/authentication-list-phonemethods) operation returns  only enabled phone numbers. The following phone number should be enabled to use with the list operations. 

> **Note:**
> A correctly represented phone number is stored with a space between the country code and the phone number. The Azure AD B2C service doesn't currently add this space by default.

Screenshot of the Authentication methods page for a sample user from the Azure portal. The text box for phone number is highlighted.

## Self-service password reset email address

An email address that can be used by a [username sign-in account](sign-in-options.md#username-sign-in) to reset the password. For more information, see [Microsoft Entra authentication methods API](https://learn.microsoft.com/graph/api/resources/emailauthenticationmethod).

- [Add](https://learn.microsoft.com/graph/api/authentication-post-emailmethods)
- [List](https://learn.microsoft.com/graph/api/authentication-list-emailmethods)
- [Get](https://learn.microsoft.com/graph/api/emailauthenticationmethod-get)
- [Update](https://learn.microsoft.com/graph/api/emailauthenticationmethod-update)
- [Delete](https://learn.microsoft.com/graph/api/emailauthenticationmethod-delete)

## Software OATH token authentication method

 A software OATH token is a software-based number generator that uses the OATH time-based one-time password (TOTP) standard for multifactor authentication via an authenticator app. Use the Microsoft Graph API to manage a software OATH token registered to a user:

- [List](https://learn.microsoft.com/graph/api/authentication-list-softwareoathmethods)
- [Get](https://learn.microsoft.com/graph/api/softwareoathauthenticationmethod-get)
- [Delete](https://learn.microsoft.com/graph/api/softwareoathauthenticationmethod-delete)

## Identity providers

Manage the [identity providers](add-identity-provider.md) available to your user flows in your Azure AD B2C tenant.

- [List identity providers available in the Azure AD B2C tenant](https://learn.microsoft.com/graph/api/identityproviderbase-availableprovidertypes)
- [List identity providers configured in the Azure AD B2C tenant](https://learn.microsoft.com/graph/api/identitycontainer-list-identityproviders)
- [Create an identity provider](https://learn.microsoft.com/graph/api/identitycontainer-post-identityproviders)
- [Get an identity provider](https://learn.microsoft.com/graph/api/identityproviderbase-get)
- [Update identity provider](https://learn.microsoft.com/graph/api/identityproviderbase-update)
- [Delete an identity provider](https://learn.microsoft.com/graph/api/identityproviderbase-delete)

## User flow (beta)

Configure prebuilt policies for sign-up, sign-in, combined sign-up and sign-in, password reset, and profile update.

- [List user flows](https://learn.microsoft.com/graph/api/identitycontainer-list-b2cuserflows)
- [Create a user flow](https://learn.microsoft.com/graph/api/identitycontainer-post-b2cuserflows)
- [Get a user flow](https://learn.microsoft.com/graph/api/b2cidentityuserflow-get)
- [Delete a user flow](https://learn.microsoft.com/graph/api/b2cidentityuserflow-delete)

## User flow authentication methods (beta)

Choose a mechanism for letting users register via local accounts. A Local account is one where Azure AD B2C completes the identity assertion. For more information, see [b2cAuthenticationMethodsPolicy resource type](https://learn.microsoft.com/graph/api/resources/b2cauthenticationmethodspolicy).

- [Get](https://learn.microsoft.com/graph/api/b2cauthenticationmethodspolicy-get)
- [Update](https://learn.microsoft.com/graph/api/b2cauthenticationmethodspolicy-update)

## Custom policies (beta)

The following operations allow you to manage your Azure AD B2C Trust Framework policies, known as [custom policies](custom-policy-overview.md).

- [List all trust framework policies configured in a tenant](https://learn.microsoft.com/graph/api/trustframework-list-trustframeworkpolicies)
- [Create trust framework policy](https://learn.microsoft.com/graph/api/trustframework-post-trustframeworkpolicy)
- [Read properties of an existing trust framework policy](https://learn.microsoft.com/graph/api/trustframeworkpolicy-get)
- [Update or create trust framework policy.](https://learn.microsoft.com/graph/api/trustframework-put-trustframeworkpolicy)
- [Delete an existing trust framework policy](https://learn.microsoft.com/graph/api/trustframeworkpolicy-delete)

## Policy keys (beta)

The Identity Experience Framework stores the secrets referenced in a custom policy to establish trust between components. These secrets can be symmetric or asymmetric keys/values. In the Azure portal, these entities are shown as **Policy keys**.

The top-level resource for policy keys in the Microsoft Graph API is the [Trusted Framework Keyset](https://learn.microsoft.com/graph/api/resources/trustframeworkkeyset). Each **Keyset** contains at least one **Key**. To create a key, first create an empty keyset, and then generate a key in the keyset. You can create a manual secret, upload a certificate, or a PKCS12 key. The key can be a generated secret, a string (such as the Facebook application secret), or a certificate you upload. If a keyset has multiple keys, only one of the keys is active.

### Trust Framework policy keyset

- [List the trust framework keysets](https://learn.microsoft.com/graph/api/trustframework-list-keysets)
- [Create a trust framework keysets](https://learn.microsoft.com/graph/api/trustframework-post-keysets)
- [Get a keyset](https://learn.microsoft.com/graph/api/trustframeworkkeyset-get)
- [Update a trust framework keysets](https://learn.microsoft.com/graph/api/trustframeworkkeyset-update)
- [Delete a trust framework keysets](https://learn.microsoft.com/graph/api/trustframeworkkeyset-delete)

### Trust Framework policy key

- [Get currently active key in the keyset](https://learn.microsoft.com/graph/api/trustframeworkkeyset-getactivekey)
- [Generate a key in keyset](https://learn.microsoft.com/graph/api/trustframeworkkeyset-generatekey)
- [Upload a string based secret](https://learn.microsoft.com/graph/api/trustframeworkkeyset-uploadsecret)
- [Upload a X.509 certificate](https://learn.microsoft.com/graph/api/trustframeworkkeyset-uploadcertificate)
- [Upload a PKCS12 format certificate](https://learn.microsoft.com/graph/api/trustframeworkkeyset-uploadpkcs12)

## Applications

- [List applications](https://learn.microsoft.com/graph/api/application-list)
- [Create an application](https://learn.microsoft.com/graph/api/application-post-applications)
- [Update application](https://learn.microsoft.com/graph/api/application-update)
- [Create servicePrincipal](https://learn.microsoft.com/graph/api/serviceprincipal-post-serviceprincipals)
- [Create oauth2Permission Grant](https://learn.microsoft.com/graph/api/resources/oauth2permissiongrant)
- [Delete application](https://learn.microsoft.com/graph/api/application-delete)

## Application extension (directory extension) properties

Application extension properties are also known as directory or Microsoft Entra extensions. To manage them in Azure AD B2C, use the [identityUserFlowAttribute resource type](https://learn.microsoft.com/graph/api/resources/identityuserflowattribute) and its associated methods.

- [Create user flow attribute](https://learn.microsoft.com/graph/api/identityuserflowattribute-post)
- [List user flow attributes](https://learn.microsoft.com/graph/api/identityuserflowattribute-list)
- [Get a user flow attribute](https://learn.microsoft.com/graph/api/identityuserflowattribute-get)
- [Update a user flow attribute](https://learn.microsoft.com/graph/api/identityuserflowattribute-update)
- [Delete a user flow attribute](https://learn.microsoft.com/graph/api/identityuserflowattribute-delete)

You can store up to 100 directory extension values per user. To manage the directory extension properties for a user, use the following [User APIs](https://learn.microsoft.com/graph/api/resources/user) in Microsoft Graph.

- [Update user](https://learn.microsoft.com/graph/api/user-update): To write or remove the value of the directory extension property from the user object.
- [Get a user](https://learn.microsoft.com/graph/api/user-get): To retrieve the value of the directory extension for the user. The property is returned by default through the `beta` endpoint, but only on `$select` through the `v1.0` endpoint.

For user flows, these extension properties are [managed by using the Azure portal](user-flow-custom-attributes.md). For custom policies, Azure AD B2C creates the property for you, the first time the policy writes a value to the extension property.

> **Note:**
> In Microsoft Entra ID, directory extensions are managed through the [extensionProperty resource type](https://learn.microsoft.com/graph/api/resources/extensionproperty) and its associated methods. However, because they're used in B2C through the `b2c-extensions-app` app which shouldn't be updated, they're managed in Azure AD B2C using the [identityUserFlowAttribute resource type](https://learn.microsoft.com/graph/api/resources/identityuserflowattribute) and its associated methods.

## Tenant usage 

Use the [Get organization details](https://learn.microsoft.com/graph/api/organization-get) API to get your directory size quota. You need to add the `$select` query parameter as shown in the following HTTP request:

```http
GET https://graph.microsoft.com/v1.0/organization/organization-id?$select=directorySizeQuota
``` 
Replace `organization-id` with your organization or tenant ID. 

The response to the above request looks similar to the following JSON snippet:

```json
{
    "directorySizeQuota": {
        "used": 156,
        "total": 1250000
    }
}
``` 
## Audit logs

- [List audit logs](https://learn.microsoft.com/graph/api/directoryaudit-list)

For more information about accessing Azure AD B2C audit logs, see [Accessing Azure AD B2C audit logs](view-audit-logs.md).

## Conditional Access

- [List the built-in templates for Conditional Access policy scenarios](https://learn.microsoft.com/graph/api/conditionalaccessroot-list-templates)
- [List all of the Conditional Access policies](https://learn.microsoft.com/graph/api/conditionalaccessroot-list-policies)
- [Read properties and relationships of a Conditional Access policy](https://learn.microsoft.com/graph/api/conditionalaccesspolicy-get)
- [Create a new Conditional Access policy](https://learn.microsoft.com/graph/api/conditionalaccessroot-post-policies)
- [Update a Conditional Access policy](https://learn.microsoft.com/graph/api/conditionalaccesspolicy-update)
- [Delete a Conditional Access policy](https://learn.microsoft.com/graph/api/conditionalaccesspolicy-delete)

## Retrieve or restore deleted users and applications

Deleted users and apps can only be restored if they were deleted within the last 30 days.

- [List deleted items](https://learn.microsoft.com/graph/api/directory-deleteditems-list)
- [Get a deleted item](https://learn.microsoft.com/graph/api/directory-deleteditems-get)
- [Restore a deleted item](https://learn.microsoft.com/graph/api/directory-deleteditems-restore)
- [Permanently delete a deleted item](https://learn.microsoft.com/graph/api/directory-deleteditems-delete)

## How to programmatically manage Microsoft Graph

You can manage Microsoft Graph in two ways:

* **Delegated permissions** either the user or an administrator consents to the permissions that the app requests. The app is delegated with the permission to act as a signed-in user when it makes calls to the target resource. 
* **Application permissions** are used by apps that don't require a signed in user present. Because of this, only administrators can consent to application permissions. 

> **Note:**
> Delegated permissions for users signing in through user flows or custom policies can't be used against delegated permissions for Microsoft Graph API.

## Related content
- Explore [Microsoft Graph API](https://learn.microsoft.com/graph/overview)
- Explore [Graph Explorer](https://aka.ms/ge) that lets you try Microsoft Graph APIs and learn about them.

<!-- LINK -->

[graph-objectIdentity]: https://learn.microsoft.com/graph/api/resources/objectidentity
[graph-user]: https://learn.microsoft.com/graph/api/resources/user
