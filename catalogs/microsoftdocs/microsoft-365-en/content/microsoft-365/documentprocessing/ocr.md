---
title: Set up and manage optical character recognition
ms.author: chucked
author: chuckedmonson
manager: jtremper
ms.reviewer: kkameth
ms.date: 08/01/2025
audience: admin
ms.topic: install-set-up-deploy
ms.service: microsoft-syntex
ms.subservice: syntex-content-intelligence
ms.custom: admindeeplinkMAC
search.appverid: 
ms.collection: 
    - enabler-strategic
    - m365initiative-syntex
ms.localizationpriority: medium
description: Learn how to set up and manage optical character recognition in SharePoint.
---

# Set up and manage optical character recognition

Optical character recognition (OCR) is a pay-as-you-go service that is set up in the Microsoft 365 admin center.

## Prerequisites

### Licensing

Before you can use the OCR service, you must first link an Azure subscription in [pay-as-you-go](syntex-azure-billing.md). OCR is billed based on the [type and number of transactions](syntex-pay-as-you-go-services.md).

### Permissions

You must be a [SharePoint Administrator](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#sharepoint-administrator) or [Global Administrator](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#global-administrator) to be able to access the Microsoft 365 admin center and set up the OCR service.


> **Important:**
>
> Microsoft recommends that you use roles with the fewest permissions. Using roles with the fewest permissions helps improve security for your organization. Global Administrator is a highly privileged role that should be limited to emergency scenarios when you can't use an existing role. For more information, see [About administrator roles in the Microsoft 365 admin center](https://learn.microsoft.com/microsoft-365/admin/add-users/about-admin-roles).

## Set up optical character recognition

After an [Azure subscription is linked to pay-as-you-go](syntex-azure-billing.md), OCR will be automatically set up and enabled for all SharePoint sites.

### Set up data loss prevention policies using OCR

The compliance admin for your organization can also [configure the OCR settings for your tenant](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/compliance/ocr-learn-about.md?#phase-3-configure-your-ocr-settings) for [data loss prevention policies](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/compliance/dlp-learn-about-dlp.md) in the Microsoft Purview portal.

The compliance admin can specify which SharePoint sites to include for data loss prevention. If there are different sites specified for the service and data loss prevention, the maximum number of sites will be enabled for OCR. You won't be charged twice for processing.

For more information, see [Learn about optical character recognition in Microsoft Purview](https://github.com/MicrosoftDocs/microsoft-365-docs/blob/eab9d7696cdff87474698b08a1fb328091102a2f/microsoft-365/compliance/ocr-learn-about.md).

## Manage sites enabled for OCR

By default, the OCR service is turned on for libraries in all SharePoint sites. To limit which sites users can use OCR, follow these steps.

1. In the Microsoft 365 admin center, select <a href="https://go.microsoft.com/fwlink/p/?linkid=2171997" target="_blank">**Settings > Org settings**</a>.

2. On the **Org settings** page, select **Pay-as-you-go services**.

3. On the **Pay-as-you-go services** page, select the **Settings** tab.

4. Under **Document & image services**, select **Optical character recognition**.

5. On the **Optical character recognition** panel, under **Select the SharePoint libraries where you would like to enable optical character recognition**, select **Edit**.

6. On the **Enable optical character recognition in Microsoft 365** panel, change the setting from **All sites** to **Selected sites (up to 100)** or **No sites**. For selected sites, follow the instructions to select the sites or upload a CSV listing of the sites. You can then manage site access permissions for the sites you selected.

7. Select **Save**.
