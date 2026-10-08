---
title: Troubleshooting Azure Native Dynatrace Service
description: This article provides information about troubleshooting Dynatrace for Azure 
author: praveenrajap
ms.author: praveenrajap
ms.topic: troubleshooting-general
ms.date: 02/02/2026

---

# Troubleshoot Azure Native Dynatrace Service

This document contains information about troubleshooting your solutions that use Dynatrace.

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


If those options don't solve the problem, contact [Dynatrace support](https://support.dynatrace.com/).

## Unable to create Dynatrace resource

- To set up the Azure Native Dynatrace Service, you must have **Owner** or **Contributor** access on the Azure subscription. Ensure you have the appropriate access before starting the setup.

- Create fails because Last Name is empty. The issue happens when the user info in Microsoft Entra ID is incomplete and doesn't contain Last Name. Contact your Azure tenant's administrator to rectify the issue and try again.

## Logs not being emitted or limit reached issue

- Resource doesn't support sending logs. Only resource types with monitoring log categories can be configured to send logs. For more information, see [supported categories](https://learn.microsoft.com/azure/azure-monitor/essentials/resource-logs-categories).

- Limit of five diagnostic settings reached. This displays the message of Limit reached against the resource. Each Azure resource can have a maximum of five diagnostic settings. For more information, see [diagnostic settings](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal) You can go ahead and remove the other destinations to make sure each resource is sending data to at max five destinations.

- The partner solutions under Azure Monitor diagnostic settings don't currently support export of Metrics data.

## Single sign-on errors

- **Single sign-on configuration indicates lack of permissions**
  - Occurs when the user that's trying to configure single sign-on doesn't have Manage users permissions for the Dynatrace account. Find a description of [how to configure this permission here](https://www.dynatrace.com/support/help/shortlink/azure-native-integration#setup).
- **Unable to save single sign-on settings**
  - Error happens when there's another Enterprise app that's using the Dynatrace SAML identifier. To find which app is using it, select **Edit** on the Basic **SAML** configuration section. To fix this issue, either disable the other app or use the other app as the Enterprise app to set up SAML SSO.

- **App not showing in Single sign-on settings page**
  - First, search for application ID. If no result is shown, check the SAML settings of the app. The grid only shows apps with correct SAML settings.

## Metrics checkbox disabled

- To collect metrics, you must have owner permission on the subscription. If you're a contributor, refer to the contributor guide mentioned in [Configure metrics and logs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/partner-solutions/dynatrace/dynatrace-create.md#configure-metrics-and-logs).

## Diagnostic settings are active even after disabling the Dynatrace resource or applying necessary tag rules

If logs are being emitted and diagnostic settings remain active on monitored resources even after the Dynatrace resource is disabled or tag rules have been modified to exclude certain resources, it's likely that there's a delete lock applied to the resource(s) or the resource group containing the resource. This lock prevents the cleanup of the diagnostic settings, and hence, logs continue to be forwarded for those resources. To fix this, remove the delete lock from the resource or the resource group. If the lock is removed after the Dynatrace resource is deleted, the diagnostic settings have to be cleaned up manually to stop log forwarding.

## Diagnostic settings not created as expected after moving a resource

If you need to delete a resource, rename, or move a resource, or migrate it across resource groups or subscriptions, first delete its diagnostic settings. Otherwise, if you recreate this resource, the diagnostic settings for the deleted resource could be included with the new resource, depending on the resource configuration for each resource. If the diagnostics settings are included with the new resource, this resumes the collection of resource logs as defined in the diagnostic setting and sends the applicable metric and log data to the previously configured destination. Also, it's a good practice to delete the diagnostic settings for a resource you're going to delete and don't plan on using again to keep your environment clean. [Learn more.](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings)

## Manual updates to diagnostic settings created via tag rules

Diagnostic settings are created based on tag rules. Currently, changing log categories through the diagnostic settings page is not permitted. While you may be able to uncheck log categories and save them, they will revert to default settings (as per tag rules).

If destination details are modified, a new diagnostic setting with the original configuration is recreated. This is subject to the limitation of a maximum of five diagnostic settings per resource. [Learn More.](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings)


## Free trial errors

- **Unable to create another free trial resource on Azure**
  - During free trials, Dynatrace accounts can only have one environment. You can therefore create only one Dynatrace resource during the trial period.
- **My Dynatrace free trial resource is deleted**
  - With the free trial plan, your Dynatrace resource on Azure will get deleted after trial expiry. If you require more time, contact [sales@dynatrace.com](mailto:sales@dynatrace.com).

## Next steps

- Learn about [managing your instance](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/partner-solutions/dynatrace/dynatrace-how-to-manage.md) of Dynatrace.
- Get started with Azure Native Dynatrace Service on

    > 
    > [Azure portal](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Dynatrace.Observability%2Fmonitors)
