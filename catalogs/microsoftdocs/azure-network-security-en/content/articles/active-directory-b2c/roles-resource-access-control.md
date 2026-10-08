---
title: Roles and resource access control
titleSuffix: Azure AD B2C
description: Learn how to use roles to control resource access.

author: garrodonnell
manager: CelesteDG

ms.service: entra-id

ms.topic: concept-article
ms.date: 02/24/2023
ms.author: godonnell
ms.subservice: b2c
ms.custom: sfi-ga-blocked

#Customer Intent: As an Azure AD B2C administrator, I want to assign users the least privileged role required to access resources, so that I can ensure proper access control and security within my tenant.

---
# Roles and resource access control

> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

When planning your access control strategy, it's best to assign users the least privileged role required to access resources. The following table describes the primary resources in your Azure AD B2C tenant and the most suitable administrative roles for the users who manage them.

| Resource | Description | Role |
| --- | --- | --- |
| [Application registrations](tutorial-register-applications.md) | Create and manage all aspects of your web, mobile, and native application registrations within Azure AD B2C. | [Application Administrator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/permissions-reference.md#application-administrator) |
| Tenant Creator | Create new Microsoft Entra ID or Azure AD B2C tenants. | [Tenant Creator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/permissions-reference.md#tenant-creator) |
| [Identity providers](add-identity-provider.md) | Configure the [local identity provider](identity-provider-local.md) and external social or enterprise identity providers. | [External Identity Provider Administrator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/permissions-reference.md#external-identity-provider-administrator) |
| [API connectors](add-api-connector.md) | Integrate your user flows with web APIs to customize the user experience and integrate with external systems. | [External ID User Flow Administrator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/permissions-reference.md#external-id-user-flow-administrator) |
| [Company branding](customize-ui.md#configure-company-branding) | Customize your user flow pages. | [Global Administrator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/permissions-reference.md#global-administrator) |
| [User attributes](user-flow-custom-attributes.md) | Add or delete custom attributes available to all user flows. | [External ID User Flow Attribute Administrator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/permissions-reference.md#external-id-user-flow-attribute-administrator) |
| Manage users | Manage [consumer accounts](manage-users-portal.md) and administrative accounts as described in this article. | [User Administrator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/permissions-reference.md#user-administrator) |
| Roles and administrators | Manage role assignments in Azure AD B2C directory. Create and manage groups that can be assigned to Azure AD B2C roles. Note that the Azure AD custom roles feature is currently not available for Azure AD B2C directories. | [Privileged Role Administrator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/permissions-reference.md#privileged-role-administrator) |
| [User flows](user-flow-overview.md) | For quick configuration and enablement of common identity tasks, like sign-up, sign-in, and profile editing. | [External ID User Flow Administrator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/permissions-reference.md#external-id-user-flow-administrator) |
| [Custom policies](user-flow-overview.md) | Create, read, update, and delete all custom policies in Azure AD B2C. | [B2C IEF Policy Administrator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/permissions-reference.md#b2c-ief-policy-administrator) |
| [Policy keys](policy-keys-overview.md) | Add and manage encryption keys for signing and validating tokens, client secrets, certificates, and passwords used in custom policies. | [B2C IEF Keyset Administrator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/permissions-reference.md#b2c-ief-keyset-administrator) |
