---
title: "Overview of the Users page in Microsoft 365 Lighthouse"
f1.keywords: NOCSH
ms.author: dansimp
author: SKjerland
manager: scotv
ms.reviewer: aakash
ms.date: 10/27/2023
audience: Admin
ms.topic: concept-article
ms.service: microsoft-365-lighthouse
ms.localizationpriority: medium
ms.collection:
- Tier1
- scotvorg
- M365-subscription-management
- Adm_O365
- essentials-manage
ms.custom:
- AdminSurgePortfolio
- M365-Lighthouse                         
search.appverid: MET150
description: "For Managed Service Providers (MSPs) using Microsoft 365 Lighthouse, learn about the Users page."
---

# Overview of the Users page in Microsoft 365 Lighthouse 

Microsoft 365 Lighthouse lets you manage users across customer tenant accounts by selecting any of the links under **Users** in the left navigation pane. From the Users page, you can search for users and assess and act on the security state of your user accounts. You can also view insights into risky users and the status of multifactor authentication and self-service password reset (SSPR).  

> **Note:**
> These pages provides insights around tenants for which data availability is limited.

## Account management page  
  
On the Account management page, you can quickly search across tenants for specific users and perform common user management tasks like updating user account information, resetting passwords, assigning licenses, and managing a user's groups, mailbox, or OneDrive. You can also view inactive accounts and take the appropriate security actions and reclaim unused licenses.

Screenshot of the Account management page.

## Risky users page

The Risky users page shows user accounts across your tenants that have been flagged for risky behavior. Select any of the users to view more information on a detected risk or to mitigate a risk by resetting a user's password or blocking sign-in. For more information about risk types and detection, see [What is risk?](https://learn.microsoft.com/azure/active-directory/identity-protection/concept-identity-protection-risks).

The Risky users page also includes the following options:

- **Export:** Select to export device compliance data to an Excel comma-separated values (.csv) file.
- **Refresh:** Select to retrieve the most current device compliance data.
- **Confirm user(s) compromised:** Select to confirm the user was compromised.
- **Dismiss user(s) risk:** Select to dismiss the user risk.  
- **Reset password:** Select to change or reset user password.
- **Block Sign-in:** Select to prevent anyone from signing in as this user.

Screenshot of the Risky users page.

## Multifactor Authentication page

The Multifactor Authentication page provides detailed information on the status of multifactor authentication (MFA) enablement across your tenants. Select any tenant in the list to see more details for that tenant, including which Conditional Access policies requiring MFA are already configured and which users haven't yet registered for MFA. To learn more about MFA in Lighthouse, see [Overview of the Multifactor authentication page](m365-lighthouse-mfa-overview.md).

Screenshot of the Multifactor Authentication page.

## Self-service password reset page

The Self-service password reset page shows detailed information on the status of SSPR enablement across your tenants. It also provides insights into users who have SSPR enabled but still need to register before they can reset their password on their own.

Screenshot of the Self-service password reset page.

## Related content

[Overview of the Multifactor authentication page](m365-lighthouse-mfa-overview.md) (article)\
[Block user sign-in](m365-lighthouse-block-user-signin.md) (article)\
[Block sign-in for shared mailbox accounts](m365-lighthouse-block-signin-shared-mailboxes.md) (article)\
[Manage inactive users](m365-lighthouse-manage-inactive-users.md) (article)\
[Manage multifactor authentication](m365-lighthouse-manage-mfa.md) (article)\
[Manage self-service password reset](m365-lighthouse-manage-sspr.md) (article)\
[Reset a user password](m365-lighthouse-reset-user-password.md) (article)\
[Search for users](m365-lighthouse-search-for-users.md) (article)\
[View and manage risky users](m365-lighthouse-view-manage-risky-users.md) (article)
