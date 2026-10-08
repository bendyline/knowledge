---
title: Troubleshooting for Datadog
description: This article provides information about troubleshooting for Datadog on Azure.
author: pdjokar96
ms.author: piyushdash
ms.topic: troubleshooting-general
ms.date: 01/29/2026
ms.custom: sfi-image-nochange
---

# Troubleshoot Datadog on Azure

This article helps you diagnose and resolve common issues with the Datadog Azure Native Integration. Use the quick reference table below to jump to the issue you're experiencing.

## Quick diagnostic reference

| Symptom | Likely cause | Section |
| --- | --- | --- |
| Can't create a Datadog resource | Missing Owner role on subscription | [Unable to create](#unable-to-create-datadog) |
| Marketplace purchase fails | Spending limits, unsupported subscription type, or region restrictions | [Marketplace purchase errors](#marketplace-purchase-errors) |
| Logs aren't appearing in Datadog | Resource type not supported, diagnostic settings limit reached, or tag rules exclude the resource | [Logs not emitting](#logs-not-being-emitted) |
| Metrics aren't appearing in Datadog | Missing Monitoring Reader role assignment | [Metrics not emitting](#metrics-not-being-emitted) |
| SSO settings can't be saved | Conflicting Enterprise app using the same SAML identifier | [SSO errors](#single-sign-on-errors) |
| Agent installation fails | No default API key selected | [Agent installation fails](#datadog-agent-installation-fails) |
| Diagnostic settings won't turn off | Delete lock on resource or resource group | [Diagnostic settings active after disabling](#diagnostic-settings-are-active-even-after-disabling-the-datadog-resource-or-applying-necessary-tag-rules) |

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


If those options don't solve the problem, contact [Datadog support](https://www.datadoghq.com/support).

## Unable to create Datadog

To set up the Azure Datadog integration, you must have **Owner** access on the Azure subscription. Ensure you have the appropriate access before starting the setup.

To verify your role assignment:

1. Open the Azure portal and navigate to the subscription.
2. Select **Access Control (IAM)** > **View my access**.
3. Confirm you have the **Owner** role. If not, request it from your subscription administrator.

## Single sign-on errors

### Unable to save single sign-on settings

This error happens when another Enterprise app is using the Datadog SAML identifier. To find which app is using it, select **Edit** on the Basic SAML Configuration section.

To fix this issue, either:
- Disable the other app, or
- Use the other app as the Enterprise app to set up SAML SSO with Datadog. If you decide to use the other app, ensure the app has the [required settings](prerequisites.md#add-enterprise-application).

### App not showing in single sign-on setting page

First, search for the application ID. If no result is shown, check the SAML settings of the app. The grid only shows apps with correct SAML settings.

Verify these SAML values are set correctly:

| Setting | Required value |
| --- | --- |
| Identifier URL | `https://us3.datadoghq.com/account/saml/metadata.xml` |
| Reply URL | `https://us3.datadoghq.com/account/saml/assertion` |

### Guest users can't access single sign-on

Some users have two email addresses in the Azure portal. Typically, one email is the user principal name (UPN), and the other email is an alternative email.

When inviting a guest user, use the home tenant UPN. By using the UPN, you keep the email address in-sync during the single sign-on process. You can find the UPN by looking for the email address in the top-right corner of the user's Azure portal.

## Logs not being emitted

If Azure resource logs aren't appearing in Datadog, check these common causes:

| Cause | How to verify | Fix |
| --- | --- | --- |
| Resource type doesn't support log export | Check [supported resource log categories](https://learn.microsoft.com/azure/azure-monitor/essentials/resource-logs-categories) | No fix; only supported resource types can emit logs |
| Diagnostic settings limit reached | Check the resource's diagnostic settings in the Azure portal (maximum 5 per resource) | Remove an unused diagnostic setting. See [diagnostic settings](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal) |
| Tag rules exclude the resource | Check your tag rules in **Datadog organization configurations > Metrics and Logs** | Update tag rules to include the resource |
| Metrics export via diagnostic settings | N/A | Azure Monitor diagnostic settings don't support metric export for partner solutions. Use platform metrics instead |

To check whether a specific resource is emitting logs:

1. Navigate to the Azure diagnostic setting for the specific resource.
2. Check that there's a Datadog diagnostic setting present and enabled.

## Metrics not being emitted

The Datadog resource requires a **Monitoring Reader** role assignment in the appropriate Azure subscription to collect and forward metrics.

To verify the role assignment:

1. Open the Azure portal and select the subscription.
2. Select **Access Control (IAM)** in the left pane.
3. Search for the Datadog resource name.
4. Confirm the Datadog resource has the **Monitoring Reader** role assignment.

If the role assignment is missing, it may indicate an issue during resource creation. Try [deleting](manage.md#delete-a-resource) and recreating the Datadog resource.

## Datadog agent installation fails

The Azure Datadog integration uses the API key selected as **Default Key** in the API Keys screen to configure the Datadog agent. If a default key isn't selected, the agent installation fails.

To resolve:

1. Navigate to your Datadog resource in the Azure portal.
2. Select **Settings > Keys** from the service menu.
3. Ensure one API key is set as the **Default Key**.
4. If the agent was installed with an incorrect key, uninstall and reinstall it. The new default key is used automatically.

## Diagnostic settings are active even after disabling the Datadog resource or applying necessary tag rules

If logs continue to be emitted and diagnostic settings remain active on monitored resources after the Datadog resource is disabled or tag rules are modified, a **delete lock** on the resource or resource group is likely preventing cleanup.

To resolve:

1. Check for locks on the resource or resource group: go to the resource in the Azure portal and select **Locks** from the service menu.
2. Remove the delete lock.
3. If the lock was removed after the Datadog resource was deleted, you must manually clean up diagnostic settings to stop log forwarding.

## Diagnostic settings not created as expected after moving a resource

If you need to delete a resource, rename, or move a resource, or migrate it across resource groups or subscriptions, first delete its diagnostic settings. Otherwise, if you recreate this resource, the diagnostic settings for the deleted resource could be included with the new resource, depending on the resource configuration for each resource. If the diagnostics settings are included with the new resource, this resumes the collection of resource logs as defined in the diagnostic setting and sends the applicable metric and log data to the previously configured destination. Also, it's a good practice to delete the diagnostic settings for a resource you're going to delete and don't plan on using again to keep your environment clean. [Learn more.](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings)

## Manual updates to diagnostic settings created via tag rules

Diagnostic settings are created based on tag rules. Currently, changing log categories through the diagnostic settings page is not permitted. While you may be able to uncheck log categories and save them, they will revert to default settings (as per tag rules).

If destination details are modified, a new diagnostic setting with the original configuration is recreated. This is subject to the limitation of a maximum of five diagnostic settings per resource. [Learn More.](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings)


## Get support

Contact [Datadog support](https://www.datadoghq.com/support) for product-specific issues.

For Azure platform issues (deployment failures, role assignments, resource provider registration), [create an Azure support request](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/newsupportrequest).

## Next steps

- [Manage your Datadog resource](manage.md)
- [Create a Datadog resource](create.md)

  > 
  > [Azure portal](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors)
  >
  > 
  > [Azure Marketplace](https://azuremarketplace.microsoft.com/marketplace/apps/datadog1591740804488.dd_liftr_v2?tab=Overview)
