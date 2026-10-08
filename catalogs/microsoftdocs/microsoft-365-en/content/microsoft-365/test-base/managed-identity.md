---
title: 'Grant Test Base managed identities to your Key Vault account'
description: How to managed identity
search.appverid: MET150
author: Tinacyt
ms.author: tinachen
manager: rshastri
audience: Software-Vendor
ms.topic: troubleshooting
ms.date: 10/19/2023
ms.service: test-base
ms.localizationpriority: medium
ms.collection: TestBase-M365
ms.custom:
ms.reviewer: Tinacyt
f1.keywords: NOCSH
---

# Grant Test Base managed identities to your Key Vault account


> **Important:**
> **Test Base for Microsoft 365 will transition to end-of-life (EOL) on May 31, 2024.** We're committed to working closely with each customer to provide support and guidance to make the transition as smooth as possible. If you have any questions, concerns, or need assistance, [submit a support request](https://aka.ms/TestBaseSupport).


This article includes step-by-step guidance to grant Test Base access to your key vault secrets so that you can authorize Test Base access to other platforms during your compatibility tests in a secure way.

**In this article,**

- [Prerequisite](#Prerequisite)
- [Grant Test Base managed identities to your Key Vault account](#GrantTestBaseAccess)

**Relevant links**

- [Importing Intune Credential in Test Base](https://aka.ms/testbase-doc-IntuneEnrollment)

### <a name="Prerequisite"></a>Prerequisite

- Resource group and Subscription are already known for your project.
- Test Base Account and Azure Key Vault Accounts are created.

*Reference*

1. [*Creating a Test Base Account | Microsoft Learn*](createaccount.md)
2. [*Creating an Azure Key Vault Account*](https://learn.microsoft.com/azure/key-vault/general/quick-create-portal)

### <a name="GrantTestBaseAccess"></a>Grant Test Base managed identities to your Key Vault account

1. Turn on **System assigned** identity in Test Base: Go to **Manage** \> **Identity** \> **System assigned** to enable managed identity in Test Base

> 
> [Screenshot of the identity page.](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/manage-identities-1.png#lightbox)

2. Click on the copy button (icon of the copy button) to copy Test Base system assigned **Object ID**
3. Assign Key Vault access to Test Base:

    Before assigning Key Vault access, please check your Key Vault configuration: Go to **Settings** \> **Access configuration**.
    > 
    > [Screenshot of the access configuration page.](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/manage-identities-2.png#lightbox)
    Depending on your permission model, please select below guidance:

    > a. [Grant Key Vault access to Test Base **when your Permission model is Azure role-based access control**.](#KeyVaultRBAC)  
    > b. [Grant Key Vault access to Test Base **when your Permission model is Vault access policy**.](#KeyVaultAccessPolicy)

    1. <a name="KeyVaultRBAC"></a>Grant Key Vault access to Test Base **when your Permission model is Azure role-based access control**.

        Reference: [Grant a user access to Azure resources using the Azure portal - Azure RBAC | Microsoft Learn](https://learn.microsoft.com/azure/role-based-access-control/quickstart-assign-role-user-portal)

        1). Open your Test Base account, select **Manage** \> **Identity** \> **Azure role assignments**.
        > 
        > [Screenshot for showing the Azure role assignments button.](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/manage-identities-3.png#lightbox)
        2). Click on **Add role assignment**.
        > 
        > [Screenshot of add role assignment.](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/manage-identities-4.png#lightbox)
        3). Set Scope as **Key Vault**. Select Subscription and Resource. Select the Role as **Key Vault Secrets User**.
        > 
        > [Screenshot of add role assignment preview.](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/manage-identities-5.png#lightbox)
        4). Repeat step b-c and select the Role as **Key Vault Reader**.

    2. <a name="KeyVaultAccessPolicy"></a>Grant Key Vault access to Test Base **when your Permission model is Vault access policy**.

        Reference: [Assign an Azure Key Vault access policy (CLI) | Microsoft Learn](https://learn.microsoft.com/azure/key-vault/general/assign-access-policy?tabs=azure-portal)

        1). Select **Access policies** , then select **Create**
        > 
        > [Screenshot of Access policies page.](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/manage-identities-6.png#lightbox)
        2). **Select all** permissions under **Secret** permissions
        > 
        > [Screenshot of create an access policy.](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/manage-identities-7.png#lightbox)
        3). Under the **Principal** selection pane, paste **Test Base Object ID**
        > 
        > [Screenshot of the principal of create an access policy.](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/manage-identities-8.png#lightbox)
        4). Click **Next** to continue.

        5). Review the access policy changes and select **Create** to save the access policy
        > 
        > [Screenshot of review and create.](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/test-base/Media/manage-identities-9.png#lightbox)
