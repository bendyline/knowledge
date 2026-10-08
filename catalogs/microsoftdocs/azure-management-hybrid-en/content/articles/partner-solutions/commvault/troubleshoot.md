---
title: Troubleshoot Azure Native Commvault Cloud
description: This article provides information about troubleshooting common onboarding, authorization, provisioning, and resource-management issues in Azure Native Commvault Cloud.
author: agrimayadav
ms.author: agrimayadav
ms.topic: troubleshooting-general
ms.date: 08/25/2026
---

# Troubleshoot Azure Native Commvault Cloud

This article provides guidance for resolving common issues when you purchase, create, configure, or manage Azure Native Commvault Cloud resources.

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


If those options don't solve the problem, contact [Commvault support](https://support.commvault.com/).

## Commvault Cloud account validation fails

Validation can fail if administrator consent or another prerequisite isn't complete. It can also fail if the selected subscription or region isn't supported, or if there's an issue with the Marketplace subscription.

To resolve the issue:

- Confirm that a tenant administrator granted administrator consent to the Commvault single sign-on application.
- Verify that the Commvault Marketplace SaaS subscription is active.
- Confirm that you're using a supported Azure subscription and region.
- Verify the required Azure permissions and Microsoft Entra group configuration.
- Complete all prerequisites before attempting to create the account again.

## Commvault Cloud account creation returns an authorization error

This error occurs when the user creating the Commvault Cloud account doesn't have the required permissions on the Azure subscription.

To resolve the issue:

- Open the subscription in the Azure portal.
- Select **Access control (IAM)**.
- Verify that the user creating the account has the required Azure role at the subscription scope.
- After the role assignment is updated, retry the account creation.

## Resource creation returns a 403 error

A `403` authorization error can occur when you create storage, a backup plan, or a protection group.

Azure Native Commvault Cloud performs two authorization checks:

- Azure Resource Manager verifies the user's Azure role assignment.
- Commvault verifies the role mapped to the user's Microsoft Entra group.

Both authorization checks must succeed.

To resolve the issue:

- Verify that the user's Microsoft Entra group is mapped to the appropriate Commvault role in CCA.
- Verify that the **Commvault Contributor** Azure role is assigned to the mapped group through **Access control (IAM)** on the Commvault Cloud account.
- Confirm that the user has access to any Azure resources selected for protection.
- Sign out and sign back in after a group membership or role assignment is changed, and then retry the operation.

## Resource creation is still in progress

Storage, backup plan, or protection-group creation can still be in progress while provisioning or operation-status polling is running.

To review the operation:

- Open the Commvault Cloud account in the Azure portal.
- Select **Notifications** to review the deployment status.
- Open the resource group's **Activity log** to review the related operation.
- Wait for the current operation to complete before retrying it.

Don't submit another update or creation request while an operation for the same resource is still running.

## Storage can't be deleted

You can't delete a storage resource while Compliance Lock is enabled.

Compliance Lock protects backup copies from accidental or malicious modification or deletion. Azure Native Commvault Cloud enables it by default when you create storage.

To delete the storage:

- Open the storage resource.
- Request that Compliance Lock be disabled.
- Confirm that the Compliance Lock status is **Disabled**.
- Delete the storage resource.

Disabling Compliance Lock requires approval from a Commvault Backup Administrator and a Commvault SRE Administrator.

## Backup plan can't be deleted

You can't delete a backup plan in either of the following situations:

- A protection group references the plan.
- The plan uses storage that has Compliance Lock enabled.

To resolve the issue:

- Identify any protection groups that reference the plan.
- Remove or delete the dependent protection groups as appropriate.
- Check whether the plan uses compliance-locked storage.
- If applicable, complete the process to disable Compliance Lock.
- Retry deleting the plan.

## Retention can't be reduced when editing a backup plan

You can't reduce the retention period of a backup plan when the plan uses storage that has Compliance Lock enabled.

This restriction prevents protected data from being aged out before the existing retention period ends.

To change the retention period:

- Complete the approval workflow to disable Compliance Lock on the associated storage before editing the plan.

## Can't delete Commvault Cloud account

You can't delete a Commvault Cloud account while child resources still exist.

Delete the resources in the following order:

- Delete the protection groups associated with the account.
- Delete the backup plans.
- Delete the storage resources.
- Delete the Commvault Cloud account.

If you can't delete a resource because of Compliance Lock or another dependency, resolve that dependency before continuing.

## Get support

- Contact [Commvault support](https://support.commvault.com/) for Commvault product issues.
