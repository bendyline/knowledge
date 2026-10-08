---
title: Get started with your Microsoft Partner Agreement billing account - Azure CSP
description: Understand your Microsoft Partner Agreement billing account (CSP)
author: jkinma39
ms.reviewer: jkinma
ms.service: cost-management-billing
ms.subservice: billing
ms.topic: concept-article
ms.date: 03/30/2026
ms.author: jkinma
# customer intent: As a Partner billing administrator, I want manage and use my Microsoft Partner Agreement to manage my customer's billing accounts.
service.tree.id: 95459a4b-434c-4f83-879b-aa5f509fc7fa
---

# Get started with your Microsoft Partner Agreement billing account

A billing account is created when you sign up to use Azure. You use your billing account to manage invoices, payments, and track costs. You can have access to multiple billing accounts. For example, if you signed up for Azure for your personal projects. You could also have access to Azure through your organization's Enterprise Agreement, Microsoft Customer Agreement, or Microsoft Partner Agreement. For each of these scenarios, you would have a separate billing account.

This article applies to billing accounts for Microsoft Partner Agreements. These accounts are created for Cloud Solution Providers (CSPs) to manage billing for their customers in the new commerce experience. The new experience is only available for partners, who have at least one customer that accepted a Microsoft Customer Agreement and has an Azure Plan. [Check if you have access to a Microsoft Partner Agreement](#check-access-to-a-microsoft-partner-agreement). An [Azure plan](https://azure.microsoft.com/pricing/purchase-options/microsoft-customer-agreement/) gives customers access to Azure services at pay-as-you-go rates under a Microsoft Customer Agreement.

## Your billing account

Your billing account for the Microsoft Partner Agreement contains a billing profile for each currency that you do business in. The billing profile lets you manage your invoices for its currency. When you establish relationships with customers, depending on their currencies, Azure subscriptions, and other purchases are billed to the respective billing profiles.

The following diagram shows the relationship between a billing account, billing profiles, customers, and resellers.

Diagram showing the Microsoft Partner Agreement billing hierarchy.

Users with the **Admin Agent** or [billing admin](https://learn.microsoft.com/partner-center/account-settings/permissions-overview#billing-admin-role) role in your organization can manage billing accounts, billing profiles and customers. To learn more, see [Partner Center - Assign users roles and permissions](https://learn.microsoft.com/partner-center/permissions-overview).

## Billing profiles

Use a billing profile to manage your invoices for a currency. A monthly invoice is generated at the beginning of the month for each billing profile in your account. The invoice contains charges in the billing profile's currency for all Azure subscriptions and other purchases from the previous month.

You can view the invoice and download the related documents like usage file and price sheet in the Azure portal. For more information, see [Download invoices for a Microsoft Partner Agreement](download-azure-invoice.md).

> **Important:**
>
> The invoices for billing profiles contain charges for customers with Azure Plans as well as SaaS, Azure marketplace, and reservation purchases for customers who haven't accepted Microsoft Customer Agreement and don't have Azure plans.

## Customers

You can view and manage customers that accepted a Microsoft Customer Agreement and have an Azure Plan in the Azure portal. You can view charges and transactions as well as create and manage Azure subscriptions for these customers.

### Enable policy to give visibility into cost

Apply policy to control whether users in a customer's organization can view and analyze cost at pay-as-you-go rates for their Azure consumption. By default, the policy is turned off and users can't view the cost. Once enabled, the users who have appropriate [Azure RBAC](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md) access on a subscription can view and analyze the cost for the subscription.

To turn on the policy:

1. Sign in to the [Azure portal](https://portal.azure.com) with your partner credentials and search for **Cost Management + Billing**.
    Screenshot showing Azure portal search for Cost Management + Billing.
1. Select the billing account that you use to manage customers.  
   Screenshot showing select billing account.
1. In the left navigation menu under Billing, select **Customers**.  
   Screenshot that shows selecting a customer.
1. In the list of Customers, select the one that you want to allow cost visibility to.  
   Screenshot that shows the customer list.
1. Select **Policies** in the left menu.  
   Screenshot that shows policies.
1. Select **Yes** and then select **Save**.

## Resellers

Indirect providers in the CSP [two-tier model](https://learn.microsoft.com/partner-center) can select a reseller while creating subscriptions for customers in the Azure portal. Post creation, they can view the list of subscriptions, filtered by a reseller and analyze cost for a customer by resellers in the Azure cost analysis.

## Check access to a Microsoft Partner Agreement
 
Check the agreement type to determine whether you have access to a billing account for a Microsoft Partner Agreement.
 
1. Sign in to the Azure portal.
 
2. Search on **Cost Management + Billing**.
 
   Screenshot that shows an Azure portal search for Cost Management + Billing.
 
3. If you have access to just one billing scope, select **Properties** from the left-hand side. You have access to a billing account for a Microsoft Partner Agreement if the billing account type is **Microsoft Partner Agreement**.
 
    Screenshot that shows microsoft partner agreement in properties page
 
4. If you have access to multiple billing scopes, check the type in the billing account column. You have access to a billing account for a Microsoft Partner Agreement if the billing account type for any of the scopes is **Microsoft Partner Agreement**.
 
    Screenshot that shows microsoft partner agreement in billing account list page
 


## Need help? Contact support

If you need help, [contact support](https://portal.azure.com/?#blade/Microsoft_Azure_Support/HelpAndSupportBlade) to get your issue resolved quickly.

## Related content

See the following articles to learn about your billing account:

- [Create an additional Azure subscription for Microsoft Partner Agreement](../manage/create-subscription.md)
- Integrate billing data with your own reporting system using the [Azure Billing APIs](https://learn.microsoft.com/rest/api/billing/)
- [Cost Management quickstart guide for partners](../costs/get-started-partners.md)
