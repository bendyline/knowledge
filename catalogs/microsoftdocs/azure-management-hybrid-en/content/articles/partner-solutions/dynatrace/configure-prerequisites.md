---
title: Configure Pre-Deployment for Azure Native Dynatrace Service
description: Learn how to complete the prerequisites for Dynatrace in the Azure portal.
author: praveenrajap
ms.author: praveenrajap
ms.topic: concept-article
ms.date: 09/15/2025

---

# Configure pre-deployment

This article describes the prerequisites that you must complete in your Azure subscription or in Microsoft Entra ID before you create your first Dynatrace resource in Azure.

## Access control

To set up Dynatrace for Azure, you must have **Owner** or **Contributor** access on the Azure subscription. [Confirm that you have the appropriate access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/check-access.md) before you start setup.

## Add an enterprise application

To use the SAML-based single sign-on (SSO) feature in the Dynatrace resource, you must set up an enterprise application. To add an enterprise application, you need either a Cloud Application Administrator or Application Administrator role.

1. Go to the Azure portal. Search for **Entra ID** and then select **Microsoft Entra ID**. In Entra ID, in the left pane, select  **Enterprise App** under **Manage**. Select **New Application**.

1. Under **Browse Microsoft Entra Gallery**, enter **Dynatrace** in the search box. Select **Dynatrace** in the search results, and then select **Create**.

    Screenshot of the Dynatrace service in the Microsoft Entra gallery.

1. After the app is created, select **Properties** under **Manage** in the left pane, set **Assignment required?** to **No**, and then select **Save**.

    Screenshot of the Dynatrace service properties page.

1. In the left pane, under **Manage**, select **Single sign-on**. Then select **SAML**.

    Screenshot of the Dynatrace single sign-on settings.

1. Select **Yes** when prompted to **Save single sign-on setting**.

   Screenshot of the confirmation prompt.

## Next step

> 
> [Quickstart: Create a new Dynatrace resource](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/partner-solutions/dynatrace/dynatrace-create.md)
