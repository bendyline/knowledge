---
title: View tax documents for your Azure invoice
description: Learn how to view and download tax receipts for your billing profile.
author: jkinma39
ms.reviewer: jkinma
ms.service: cost-management-billing
ms.topic: concept-article
ms.date: 04/29/2026
ms.subservice: billing
ms.author: jkinma
service.tree.id: 95459a4b-434c-4f83-879b-aa5f509fc7fa
---

# View and download tax documents for your Azure invoice

You can download tax documents for your Azure invoice if you have access to invoices in the Azure portal. Only certain roles have access to invoices, such as the Account Administrator. If you have a Microsoft Customer Agreement, you must be a Billing profile Owner, Contributor, Reader, or Invoice manager to download invoices and tax documents. If you have Microsoft Partner Agreement, you must have the Admin Agent or [billing admin](https://learn.microsoft.com/partner-center/account-settings/permissions-overview#billing-admin-role) role in the partner organization. [Check your billing account type](#check-billing-account-type) to see what permissions you need to download tax documents.

## View and download tax documents

1. Sign-in to the [Azure portal](https://portal.azure.com).
1. Search for *Cost Management + Billing*.
1. Depending on your access, you might need to select a Billing account or Billing profile.
1. In the left menu, select **Invoices** under **Billing**.
1. In the invoice grid, find the row of the invoice corresponding to the tax document you want to download.
1. Select the download icon or the ellipsis (`...`) at the end of the row.
7. Select **Tax document** in the download menu. Depending on the country/region of your billing profile, you might see more than one tax document per invoice.

## Check billing account type

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Search for and select **Cost Management + Billing**.  

    Screenshot that shows an Azure portal search for Cost Management and Billing.
1. If you have access to just one billing scope, select **Properties** from the left menu.

    The **Type** value on the **Properties** pane determines the type of your account. It can be Microsoft Online Subscription Program, Enterprise Agreement, Microsoft Customer Agreement, or Microsoft Partner Agreement. To learn more about the types of billing accounts, see [View your billing accounts in the Azure portal](../manage/view-all-accounts.md).

    Screenshot that shows Microsoft Customer Agreement on the Properties pane.

    If you have access to multiple billing scopes, select **Billing scopes** from the left menu, and then check the type in the **Billing account type** column.

    Screenshot that shows billing account types for multiple billing scopes.


## Related content

- [View and download your Microsoft Azure invoice](download-azure-invoice.md)
- [View and download your Microsoft Azure usage and charges](download-azure-daily-usage.md)
