---
title: Register apps in Azure Active Directory B2C
titleSuffix: Azure AD B2C
description: Learn how to register different apps types such as web app, web API, single-page apps, mobile and desktop apps, daemon apps, Microsoft Graph apps and SAML app in Azure Active Directory B2C 

author: kengaderdus
manager: CelesteDG

ms.service: entra-id

ms.topic: how-to
ms.date: 01/11/2024
ms.author: kengaderdus
ms.subservice: b2c


#Customer intent: As a developer, I want to register my applications in Azure Active Directory B2C, so that I can enable authentication for various modern application architectures and specify the type of app that I want to register.

---

# Register apps in Azure Active Directory B2C

> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

Before your [applications](application-types.md) can interact with Azure Active Directory B2C (Azure AD B2C), you must register them in a tenant that you manage.

Azure AD B2C supports authentication for various modern application architectures. The interaction of every application type with Azure AD B2C is different. Hence, you need to specify the type of app that you want to register. 


## Prerequisites

- If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

- If you haven't already created your own [Azure AD B2C Tenant](tutorial-create-tenant.md), create one now. You can use an existing Azure AD B2C tenant.


## Select an app type to register

You can register different app types in your Azure AD B2C Tenant. The how-to guides below show you how to register and configure the various app types:


- [Single-page application (SPA)](tutorial-register-spa.md)
- [Web application](tutorial-register-applications.md)
- [Native client (for mobile and desktop)](add-native-application.md)
- [Web API](add-web-api-application.md) 
- [Daemon apps](client-credentials-grant-flow.md)
- [Microsoft Graph application](microsoft-graph-get-started.md)
- [SAML application](saml-service-provider.md?tabs=windows&pivots=b2c-custom-policy)
- [Publish app in Microsoft Entra app gallery](publish-app-to-azure-ad-app-gallery.md)
