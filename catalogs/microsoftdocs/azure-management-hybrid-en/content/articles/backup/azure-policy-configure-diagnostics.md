---
title: Configure Vault Diagnostics settings at scale
description: Configure Log Analytics Diagnostics settings for all vaults in a given scope using Azure Policy
ms.topic: how-to
ms.date: 03/18/2026
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: As a cloud administrator, I want to apply diagnostics settings to all Recovery Services vaults at once using policy enforcement, so that I can streamline monitoring and reporting without manually configuring each vault.
---
# Configure Vault Diagnostics settings at scale

This article describes how Azure Backup integrates with Log Analytics for reporting. Each vault requires a [diagnostics setting](backup-azure-diagnostic-events.md) to send data to Log Analytics. To avoid manual setup for every vault, Azure Backup offers a built-in [Azure Policy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/index.yml) that automatically applies Log Analytics diagnostics settings across subscriptions or resource groups.

The following sections explain how to use this policy.

## Supported and unsupported Scenarios to configure diagnostics settings

Before you begin, ensure that you understand the following supported and unsupported scenarios for using the built-in policy to configure diagnostics settings for Recovery Services vaults:

* The policy can be applied at one time to all Recovery Services vaults in a particular subscription (or to a resource group within the subscription). The user assigning the policy needs to have **Owner** access to the subscription to which the policy is assigned.

* The LA Workspace as specified by the user (to which diagnostics data will be sent) can be in a different subscription from the vaults to which the policy is assigned. The user needs to have **Reader**, **Contributor**, or **Owner** access to the subscription in which the specified LA Workspace exists.

* Management Group scope is currently unsupported.


> **Note:**
> The functionality that the following sections describe can also be accessed via [Backup center](backup-center-overview.md). Backup center is a single unified management experience in Azure. It enables enterprises to govern, monitor, operate, and analyze backups at scale. With this solution, you can perform most of the key operations for backup management without being limited to the scope of an individual vault.


## Assign the built-in policy to a scope

To assign the policy for vaults in the required scope, follow the steps below:

1. Sign in to the [Azure portal](https://portal.azure.com/), and go to the **Resiliency** dashboard.
2. On the left menu, select **Azure Policies for protection** to get a list of all built-in policies across Azure Resources.
3. On the **Azure Policies for protection** pane, locate the policy named **Deploy Diagnostic Settings for Recovery Services Vault to Log Analytics workspace for resource-specific categories**.

    Screenshot that shows the Policy Definition pane.

4. Select the name of the policy. You'll be redirected to the detailed definition for this policy.

    Screenshot that shows the detailed Policy Definition.

5. Select the **Assign** button at the top of the pane. This redirects you to the **Assign Policy** pane.

6. Under **Basics**, select the three dots next to the **Scope** field. This opens up a right context pane where you can select the subscription for the policy to be applied on. You can also optionally select a resource group, so that the policy is applied only for vaults in a particular resource group.

    Policy Assignment Basics

7. Under **Parameters**, enter the following information:

    * **Profile Name** - The name that will be assigned to the diagnostics settings created by the policy.
    * **Log Analytics Workspace** - The Log Analytics Workspace to which the diagnostics setting should be associated. Diagnostics data of all vaults in the scope of the Policy assignment will be pushed to the specified LA Workspace.

    * **Exclusion Tag Name (optional) and Exclusion Tag Value (optional)** - You can choose to exclude vaults containing a certain tag name and value from the policy assignment. For example, if you do **not** want a diagnostics setting to be added to those vaults that have a tag 'isTest' set to the value 'yes', you must enter 'isTest' in the **Exclusion Tag Name** field and 'yes' in the **Exclusion Tag Value** field. If any (or both) of these two fields are left empty, the policy will be applied to all relevant vaults no matter what the tags they contain.

    Policy Assignment Parameters

8. **Create a remediation task** - Once the policy is assigned to a scope, any new vaults created in that scope automatically get LA diagnostics settings configured (within 30 minutes from the time of creation of the vault). To add a diagnostics setting to existing vaults in the scope, you can trigger a remediation task at policy assignment time. To trigger a remediation task, select the checkbox **Create a Remediation task**.

    Policy Assignment Remediation

9. Navigate to the **Review+Create** tab and select **Create**.

## Conditions to apply the remediation task to a vault

The remediation task is applied to vaults that are non-compliant according to the definition of the policy. A vault is non-compliant if it satisfies either of the following conditions:

* No diagnostics setting is present for the vault.
* Diagnostic settings are present for the vault but neither of the settings has **all of** the Resource-specific events enabled with LA as destination, and **Resource specific** selected in the toggle.

So even if a user has a vault with the AzureBackupReport event enabled in AzureDiagnostics mode (which is supported by Backup Reports), the remediation task will still apply to this vault, since the Resource-specific mode is the recommended way of creating diagnostics settings, [going forward](backup-azure-diagnostic-events.md#legacy-event).

Further, if a user has a vault with only a subset of the six Resource-specific events enabled, the remediation task will apply for this vault, since Backup Reports will work as expected only if all of the six Resource-specific events are enabled.

> **Note:**
>
> If a vault has an existing diagnostics setting with a **subset of Resource specific** categories enabled, configured to send data to a particular LA Workspace, say 'Workspace X', then the remediation task will fail (for that vault alone) if the destination LA Workspace provided in the Policy assignment is the **same** 'Workspace X'.
>
>This is because, if the events enabled by two different diagnostics settings on the same resource **overlap** in some form, then the settings can't have the same LA Workspace as the destination. You'll have to manually resolve this failure, by navigating to the relevant vault and configuring a diagnostics setting with a different LA Workspace as the destination.
>
> Note that the remediation task will **not** fail if the existing diagnostics setting as only AzureBackupReport enabled with Workspace X as the destination, since in this case, there will be no overlap between the events enabled by the existing setting and the events enabled by the setting created by the remediation task.

## Next Steps

* [Learn how to use Backup Reports](configure-reports.md)
* [Learn more about Azure Policy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/index.yml)
* [Use Azure Policy to auto-enable backup for all VMs in a give scope](backup-azure-auto-enable-backup.md)
