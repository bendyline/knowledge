---
title: Prerequisites include file shared by two tabs in the same file  | Microsoft Docs
description: Prerequisites for Data Box service and device before deployment. 
services: databox
author: stevenmatthew
ms.service: azure-data-box
ms.topic: include
ms.date: 03/25/2024
ms.author: shaas
zone_pivot_groups: data-box-sku
---
### For the Data Box service


Before you begin, make sure that:

* You have your Microsoft Azure storage account with access credentials, such as storage account name and access key.

* The subscription you use for Data Box service is one of the following types:
  * Microsoft Customer Agreement (MCA) for new subscriptions or Microsoft Enterprise Agreement (EA) for existing subscriptions. Read more about [MCA for new subscriptions](https://www.microsoft.com/licensing/how-to-buy/microsoft-customer-agreement) and [EA subscriptions](https://azure.microsoft.com/pricing/enterprise-agreement/).
  * Cloud Solution Provider (CSP). Learn more about [Azure CSP program](https://learn.microsoft.com/azure/cloud-solution-provider/overview/azure-csp-overview).
    > **Note:**
    > This service is supported for the Azure CSP program in India if you are on the modern billing model. If you are on the legacy billing model as per your agreement, you will not be able to create Data Box orders.
  * Microsoft Azure Sponsorship. Learn more about [Azure sponsorship program](https://azure.microsoft.com/offers/ms-azr-0036p/).
  * Microsoft Partner Network (MPN). Learn more about [Microsoft Partner Network](https://partner.microsoft.com/commercial#).

* Ensure that you have owner or contributor access to the subscription to create a device order.



### For the Data Box device

Before you begin, make sure that:

* You should have a host computer connected to the datacenter network. Data Box will copy the data from this computer. Your host computer must run a supported operating system as described in [Azure Data Box system requirements](../articles/databox/data-box-system-requirements.md).

**Applies to: dbx-ng**

* Your datacenter needs to have high-speed network. We strongly recommend that you have at least one 100-GbE connection. If a 100-GbE connection isn't available, you can use a 10-GbE or 1-GbE data link can be used, but copy speeds are impacted.
  


**Applies to: dbx**

* Your datacenter needs to have high-speed network. We strongly recommend that you have at least one 10-GbE connection. If a 10-GbE connection isn't available, 1-GbE data link can be used, but copy speeds are impacted.
