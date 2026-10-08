---
title: Manage access to Azure billing
description: Learn how to give access to your Azure billing information to members of your team.
author: jkinma39
ms.reviewer: jkinma
ms.service: cost-management-billing
ms.subservice: billing
ms.topic: how-to
ms.date: 06/25/2026
ms.author: jkinma
ms.custom: sfi-image-nochange
service.tree.id: 95459a4b-434c-4f83-879b-aa5f509fc7fa
---

# Manage access to billing information for Azure

You can provide others access to the billing information for your account in the Azure portal. The type of billing roles and the instructions to provide access to the billing information vary by the type of your billing account. To determine the type of your billing account, see [Check the type of your billing account](#check-the-type-of-your-billing-account).

The article applies to customers with Microsoft Online Service Program (MOSP) accounts. If you're an Azure customer with an Enterprise Agreement (EA) and are the Enterprise Administrator, you can give permissions to the Department Administrators and Account Owners in the Azure portal. For more information, see [Understand Azure Enterprise Agreement administrative roles in Azure](understand-ea-roles.md). If you're a Microsoft Customer Agreement customer, see, [Understand Microsoft Customer Agreement administrative roles in Azure](understand-mca-roles.md).

## Account administrators for Microsoft Online Service program accounts

By default, the Account Administrator is the only owner for an MOSP billing account. When a user creates an MOSP subscription, they get the Account Administrator role for the subscription. They also get the Azure Role-based access control (RBAC) Owner role for it. The role is assigned to a person who signed up for Azure. Account Administrators are authorized to perform various billing tasks like create subscriptions, view invoices or change the billing for a subscription.

## Give others access to view billing information

Account administrator can grant others access to Azure billing information by assigning one of the following roles on a subscription in their account.

- Owner
- Contributor
- Reader
- Billing Reader

These roles have access to billing information in the [Azure portal](https://portal.azure.com/). People that are assigned these roles can also use the [Cost Management APIs](../automate/automation-overview.md) to programmatically get invoices and usage details.

To assign roles, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

> **note:**
> If you're an EA customer, an Account Owner can assign the above role to other users of their team. But for these users to view billing information, the Enterprise Administrator must enable AO view charges in the Azure portal.


### <a name="opt-in"></a> Allow users to download invoices

After an Account administrator assigns the appropriate roles to other users, they must turn on access to download invoices in the Azure portal. Invoices older than December 2016 are available only to the Account Administrator.

1. Sign in to the [Azure portal](https://portal.azure.com/), as an Account Administrator,
1. Search on **Cost Management + Billing**.  
    Screenshot that highlights Cost Management + Billing under the Services section.
1. In the left navigation menu, select **Subscriptions**. Depending on your access, you might need to select a billing scope and then select **Subscriptions**.  
    Screenshot that shows selecting subscriptions.
1. In the left navigation menu, select **Invoices**.  
1. At the top of the page, select **Edit invoice details**, then select **Allow others to download invoice**.  
    Screenshot shows navigation to Allow others to download invoice option.
1. On the **Allow others to download invoice** page, select a subscription that you want to give access to.
1. Select **Users/groups with subscription-level access can download invoices** to allow users with subscription-level access to download invoices.  
    Screenshot shows Allow others to download invoice page.
    For more information about allowing users with subscription-level access to download invoices, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal?tabs=delegate-condition).
1. Select **Save**.

The Account Administrator can also configure to have invoices sent via email. To learn more, see [Get your invoice in email](download-azure-invoice-daily-usage-date.md).

## Give read-only access to billing

Assign the Billing Reader role to someone that needs read-only access to the subscription billing information but not the ability to manage or create Azure services. This role is appropriate for users in an organization who are responsible for the financial and cost management for Azure subscriptions.

The Billing Reader feature is in preview, and doesn't yet support nonglobal clouds.

- Assign the Billing Reader role to a user at the subscription scope.  
     For detailed steps, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

> **Note:**
> If you're an EA customer, an Account Owner or Department Administrator can assign the Billing Reader role to team members. But for that Billing Reader to view billing information for the department or account, the Enterprise Administrator must enable  **AO view charges** or **DA view charges** policies in the Azure portal.

## Check the type of your billing account

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Search for and select **Cost Management + Billing**.  

    Screenshot that shows an Azure portal search for Cost Management and Billing.
1. If you have access to just one billing scope, select **Properties** from the left menu.

    The **Type** value on the **Properties** pane determines the type of your account. It can be Microsoft Online Subscription Program, Enterprise Agreement, Microsoft Customer Agreement, or Microsoft Partner Agreement. To learn more about the types of billing accounts, see [View your billing accounts in the Azure portal](view-all-accounts.md).

    Screenshot that shows Microsoft Customer Agreement on the Properties pane.

    If you have access to multiple billing scopes, select **Billing scopes** from the left menu, and then check the type in the **Billing account type** column.

    Screenshot that shows billing account types for multiple billing scopes.


## Need help? Contact us.

If you have questions or need help,  [create a support request](https://go.microsoft.com/fwlink/?linkid=2083458).

## Next steps

- Users in other roles, such as Owner or Contributor, can access not just billing information, but Azure services as well. To manage these roles, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).
- For more information about roles, see [Azure built-in roles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md).
