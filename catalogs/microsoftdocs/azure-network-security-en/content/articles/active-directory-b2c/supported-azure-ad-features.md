---
title: Supported Microsoft Entra ID features
description: Learn about Microsoft Entra ID features, which are still supported in Azure AD B2C.

author: kengaderdus
manager: mwongerapk

ms.service: entra-id

ms.topic: overview
ms.date: 05/20/2025
ms.author: kengaderdus
ms.subservice: b2c


#Customer intent: As an Azure AD B2C tenant administrator, I want to understand the differences between Microsoft Entra ID and Azure AD B2C features, so that I can effectively manage user accounts and configure the appropriate features for my tenant.

---

# Supported Microsoft Entra ID features


> **Important:**
> **Azure AD External Identities P2 has been retired in Azure AD B2C tenants.** ID Protection as part of P2 remains available in workforce tenants. For details on billing and alternatives, see the [P2 retirement FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-external-identities-p2-retirement).



> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).


An Azure Active Directory B2C (Azure AD B2C) tenant is different than a Microsoft Entra tenant, which you may already have, but it relies on it. The following Microsoft Entra ID features can be used in your Azure AD B2C tenant.

| Feature | Microsoft Entra ID | Azure AD B2C |
| --- | --- | --- |
| [Groups](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/how-to-manage-groups.md) | Groups can be used to manage administrative and user accounts. | Groups can be used to manage administrative accounts. You can't perform [group-based assignment of enterprise applications](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/manage-apps/assign-user-or-group-access-portal.md). |
| [Inviting External Identities guests](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory//external-identities/add-users-administrator.md) | You can invite guest users and configure External Identities features such as federation and sign-in with Facebook and Google accounts. | You can invite only a Microsoft account or a Microsoft Entra user as a guest to your Microsoft Entra tenant for accessing applications or managing tenants. For [consumer accounts](user-overview.md#consumer-user), you use Azure AD B2C user flows and custom policies to manage users and sign-up or sign-in with external identity providers, such as Google or Facebook. |
| [Roles and administrators](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/how-subscriptions-associated-directory.md) | Fully supported for administrative and user accounts. | Roles are not supported with [consumer accounts](user-overview.md#consumer-user). Consumer accounts don't have access to any Azure resources. |
| [Custom domain names](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/add-custom-domain.md) | You can use Microsoft Entra custom domains for administrative accounts only. | [Consumer accounts](user-overview.md#consumer-user) can sign in with a username, phone number, or any email address. You can use [custom domains](custom-domain.md) in your redirect URLs. |
| [Conditional Access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/conditional-access/overview.md) | Fully supported for administrative and user accounts. | A subset of Microsoft Entra Conditional Access features is supported with [consumer accounts](user-overview.md#consumer-user) Learn how to configure Azure AD B2C [conditional access](conditional-access-user-flow.md). |
| [Premium P1](https://azure.microsoft.com/pricing/details/active-directory) | Fully supported for Microsoft Entra ID P1 features. For example, [Password Protection](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/authentication/concept-password-ban-bad.md), [Hybrid Identities](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/hybrid/whatis-hybrid-identity.md),  [Conditional Access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/roles/permissions-reference.md#), [Dynamic groups](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/enterprise-users/groups-create-rule.md), and more. | Azure AD B2C uses [Azure AD B2C Premium P1 license](https://azure.microsoft.com/pricing/details/active-directory/external-identities/), which is different from Microsoft Entra ID P1. A subset of Microsoft Entra Conditional Access features is supported with [consumer accounts](user-overview.md#consumer-user). Learn how to configure Azure AD B2C [Conditional Access](conditional-access-user-flow.md). |
| [Premium P2](https://azure.microsoft.com/pricing/details/active-directory/) | Fully supported for Microsoft Entra ID P2 features. For example, [Identity Protection](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/identity-protection/overview-identity-protection.md), and [Identity Governance](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/governance/identity-governance-overview.md). | Azure AD B2C uses [Azure AD B2C Premium P2 license](https://azure.microsoft.com/pricing/details/active-directory/external-identities/), which is different from Microsoft Entra ID P2. A subset of Microsoft Entra ID Protection features is supported with [consumer accounts](user-overview.md#consumer-user). Learn how to [Investigate risk with Identity Protection](identity-protection-investigate-risk.md) and configure Azure AD B2C [Conditional Access](conditional-access-user-flow.md). |
| [Data retention policy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/reports-monitoring/reference-reports-data-retention.md#how-long-does-azure-ad-store-the-data) | Data retention period for both audit and sign in logs depend on your subscription. Learn more about [How long Microsoft Entra ID store reporting data](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/reports-monitoring/reference-reports-data-retention.md#how-long-does-azure-ad-store-the-data). | Sign in and  audit logs are only retained for **seven (7) days**. If you require a longer retention period, use the [Azure monitor](azure-monitor.md). |
| [Go-Local add-on](data-residency.md#go-local-add-on) | Microsoft Entra Go-Local add-on enables you to store data in the country/region you choose when your Microsoft Entra tenant. | Just like Microsoft Entra ID, Azure AD B2C supports [Go-Local add-on](data-residency.md#go-local-add-on). |

> **Note:**
> **Other Azure resources in your tenant:** <br>In an Azure AD B2C tenant, you can't provision other Azure resources such as virtual machines, Azure web apps, or Azure functions. You must create these resources in your Microsoft Entra tenant.
