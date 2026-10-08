---
title: Troubleshoot Azure Native New Relic Service
description: Learn about troubleshooting Azure Native New Relic Service.
author: shijojoy
ms.author: shijoy
ms.topic: troubleshooting-general

ms.date: 02/12/2026

---

# Troubleshoot Azure Native New Relic Service

This article describes how to fix common problems when you're working with Azure Native New Relic Service resources.

## Marketplace purchase errors


| Error message | Details |
| --- | --- |
| "The Microsoft.SaaS RP isn't registered on the Azure subscription." | Before you use a resource provider, you must make sure that your Azure subscription is registered for it. For more information, see [Register a resource provider](../../azure-resource-manager/management/resource-providers-and-types.md#register-resource-provider) and [Resolve errors for resource provider registration](../../azure-resource-manager/troubleshooting/error-register-resource-provider.md). |
| "Plan can't be purchased on a free subscription, please upgrade your account." | You can't make Azure Marketplace purchases on a free Azure subscription. For more information, see [Azure free account FAQ]( https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). |
| "Purchase has failed because we couldn't find a valid payment method associated with your Azure subscription." | Use a different Azure subscription, or add or update credit card or payment method information for this subscription. For more information, see [Purchase a SaaS offer in the Azure portal](https://learn.microsoft.com/marketplace/purchase-saas-offer-in-azure-portal#common-error-messages-and-solutions). |
| "The Publisher doesn't make available Offer, Plan in your Subscription/Azure account's region." | The offer or the specific plan isn't available to the billing account market that's connected to the Azure subscription. |
| "Enrollment for Azure Marketplace is set to Free/BYOL SKUs only, purchase for Azure product isn't allowed. Please contact your enrollment administrator to change EA settings." | Enterprise administrators can disable or enable Azure Marketplace purchases for all Azure subscriptions under their enrollment. For more information, see [Enabling Azure Marketplace purchases](../../cost-management-billing/manage/ea-azure-marketplace.md#enabling-azure-marketplace-purchases) and [Introduction to listing options](https://learn.microsoft.com/partner-center/marketplace/determine-your-listing-type#overview). |
| "Marketplace isn't enabled for the Azure subscription." | Enterprise administrators can disable or enable Azure Marketplace purchases for all Azure subscriptions under their enrollment. For more information, see [Enabling Azure Marketplace purchases](../../cost-management-billing/manage/ea-azure-marketplace.md#enabling-azure-marketplace-purchases). |
| "Plan by publisher isn't available to you for purchase due to private marketplace settings made by your tenant's IT administrator." | Your company uses a private marketplace to limit the access of its organization to specific offers and plans. The specific offer or the plan wasn't set up to be available in the tenant's private marketplace. Contact your tenant's IT administrator. |
| "The EA subscription doesn't allow Marketplace purchases." | Use a different subscription or check whether your Enterprise Agreement subscription is enabled for Azure Marketplace purchases. For more information, see [Enabling Azure Marketplace purchases](../../cost-management-billing/manage/ea-azure-marketplace.md#enabling-azure-marketplace-purchases). |


## Can't create a New Relic resource

To set up Azure Native New Relic Service, you must have owner access on the Azure subscription. Ensure that you have the appropriate access before you start the setup.

To find the New Relic offering on Azure and set up the service, you must first register the `NewRelic.Observability` resource provider in your Azure subscription. To register the resource provider by using the Azure portal, follow the guidance in [Azure resource providers and types](../../azure-resource-manager/management/resource-providers-and-types.md).
To register the resource provider from a command line, enter `az provider register --namespace NewRelic.Observability --subscription <subscription-id>`.

## Logs aren't being sent to New Relic

Only resource types in [supported categories](https://learn.microsoft.com/azure/azure-monitor/essentials/resource-logs-categories) send logs to New Relic through the integration. To check whether the resource is set up to send logs to New Relic, go to the [Azure diagnostic settings](https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings) for that resource. Then, check that there's a New Relic diagnostic setting.

## Can't install or uninstall an extension on a virtual machine

Only virtual machines without the New Relic agent installed should be selected together to install the extension. Deselect any virtual machines that already have the New Relic agent installed, so that **Install Extension** is active. The **Agent Status** column shows the status **Running** or **Shutdown** for any virtual machines that already have the New Relic agent installed.

Only virtual machines that currently have the New Relic agent installed should be selected together to uninstall the extension. Deselect any virtual machines that don't already have the New Relic agent installed, so that **Uninstall Extension** is active. The **Agent Status** column shows the status **Not Installed** for any virtual machines that don't already have the New Relic agent installed.

## Resource monitoring stopped working

Resource monitoring in New Relic is enabled through the *ingest API key*, which you set up at the time of resource creation. Revoking the ingest API key from the New Relic portal disrupts monitoring of logs and metrics for all resources, including virtual machines and app services. You shouldn't revoke the ingest API key. If the API key is already revoked, contact New Relic support.

If your Azure subscription is suspended or deleted because of payment-related issues, resource monitoring in New Relic automatically stops. Use a different Azure subscription. Alternatively, add or update the credit card or payment method for the subscription. For more information, see [Add, update, or delete a payment method](../../cost-management-billing/manage/change-credit-card.md).

New Relic manages the APIs for creating and managing resources and for the storage and processing of customer telemetry data. The New Relic APIs might be on or outside Azure. If your Azure subscription and resource are working correctly but the New Relic portal shows problems with monitoring data, contact New Relic support.

## Diagnostic settings are active even after disabling the New Relic resource or applying necessary tag rules

If logs are being emitted and diagnostic settings remain active on monitored resources even after the New Relic resource is disabled or tag rules were modified to exclude certain resources, it's likely that there's a delete lock applied to the resources or the resource group containing the resource. This lock prevents the cleanup of the diagnostic settings, and hence, logs continue to be forwarded for those resources. To fix the issue, remove the delete lock from the resource or the resource group. If the lock is removed after the New Relic resource is deleted, the diagnostic settings have to be cleaned up manually to stop log forwarding.

## Diagnostic settings not created as expected after moving a resource

If you need to delete a resource, rename, or move a resource, or migrate it across resource groups or subscriptions, first delete its diagnostic settings. Otherwise, if you recreate this resource, the diagnostic settings for the deleted resource could be included with the new resource, depending on the resource configuration for each resource. If the diagnostics settings are included with the new resource, this resumes the collection of resource logs as defined in the diagnostic setting and sends the applicable metric and log data to the previously configured destination. Also, it's a good practice to delete the diagnostic settings for a resource you're going to delete and don't plan on using again to keep your environment clean. [Learn more.](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings)

## Manual updates to diagnostic settings created via tag rules

Diagnostic settings are created based on tag rules. Currently, changing log categories through the diagnostic settings page is not permitted. While you may be able to uncheck log categories and save them, they will revert to default settings (as per tag rules).

If destination details are modified, a new diagnostic setting with the original configuration is recreated. This is subject to the limitation of a maximum of five diagnostic settings per resource. [Learn More.](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings)


## Logs are being forwarded even after the Azure Native New Relic resource is deleted

If logs are being emitted even after the Azure Native New Relic resource is deleted, it could be because there's a resource lock present on one of the Azure resources being monitored. It takes 24 hours for the log forwarding to stop for the resources where the resource lock is present.

## Updates made to the tag rules within the Azure Native New Relic resource don't change the log flow immediately

It takes an hour for any modification of the tag rules to reflect in the log flow. For example, if a new resource is added in tag rules, it would take an hour for the log forwarding to start for that particular resource.
