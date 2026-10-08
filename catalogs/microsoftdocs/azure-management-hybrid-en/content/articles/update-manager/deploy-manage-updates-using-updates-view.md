---
title: Deploy and manage updates using Updates view
description: This article describes how to view the updates pending for your environment and then deploy and manage them using the Updates option in Azure Update Manager
ms.service: azure-update-manager
author: Jeronika-MS
ms.author: v-gajeronika
ms.date: 06/21/2024
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.update-cycle: 1095-days
# Customer intent: "As an IT administrator, I want to view and manage pending updates for my environment, so that I can ensure all machines are up-to-date and secure from vulnerabilities."
---

# Deploy and manage updates using the Update view


**Applies to:** :heavy_check_mark: Windows VMs :heavy_check_mark: Linux VMs :heavy_check_mark: On-premises environment :heavy_check_mark: Azure Arc-enabled servers.

This article describes how you can manage machines from an updates standpoint. 

The Updates blade allows you to manage machines from an updates viewpoint. It implies that you can see how many Linux and Windows updates are pending and the update applies to which machines. It also enables you to act on each of the pending updates. To view the latest pending updates on each of the machines, we recommend that you enable periodic assessment on all your machines. For more information, see [enable periodic assessment at scale using Policy](periodic-assessment-at-scale.md) or [enable using update settings](manage-update-settings.md).

  Screenshot that shows number of updates and the type of updates pending on your Windows and Linux machines.


## Classic use case

This option is helpful when you discover a vulnerability and want to fix it by applying a specific update on all machines on which it was pending. For example, a vulnerability is discovered in software, which can potentially expose the customer's environment to risk like remote code execution. The Central IT team discovers this threat and want to secure their enterprise's environment by applying an update *abc* that would mitigate vulnerability. Using the Updates view, they can apply the update *abc* on all the impacted machines.

 ## Summarized view

In the **Overview** blade of Azure Update Manager, the Updates view provides a summary of pending updates. Select the individual updates to see a detailed view of each of the pending category of updates. Following is a screenshot that gives a summarized view of the pending updates on Windows and Linux machines.

  Screenshot that shows number of updates and the type of updates pending on your Windows and Linux machines.

## Updates list view

You can use either the **Overview** blade or select the **Updates** blade that provides a list view of the updates pending in your environment. You can perform the following actions on this page:

- Filter Windows and Linux updates by selecting the cards for each.
- Filter updates by using the filter options at the top like **Resource group**, **Location**,  **Resource type**, **Workloads**, **Update Classifications**
- Edit columns, export data to csv or see the query powering this view using the options at the top.
- Displays a ribbon at the top that shows the number of machines that don't have periodic assessment enabled on them and suggestion to enable periodic assessment on them.

  > **Note:**
  > We recommend you to enable periodic assessment to see the latest pending updates on the machines.

   Screenshot that shows the pending updates and various filter options from Updates.

- Select any row of the Machine(s) applicable column for a list view of all machines on which the update is applicable. Using this option, you can view all the machines on which the update is applicable and pending. You can trigger **One-time update** to install the update on demand or use the **Schedule updates** option to schedule update installation on a later date.

  Screenshot that shows the machines for which updates are applicable and pending.

- Multi-select updates from the **Updates** list view and perform **One-time updates**  or **Schedule updates**.

  Screenshot that shows multi selection from list view.

 - **One-time update**  - Allows you to install update(s) on the applicable machines on demand and can take instant action about the pending update(s). For more information on how to use One-time update, see [how to deploy on demand updates](deploy-updates.md#).

    Screenshot that shows how to install one-time updates.


- **Schedule updates** - Allows you to install updates later, you have to select a future date on when you would like to install the update(s) and specify an end date when the schedule should end. For more information on scheduled updates, see [how to schedule updates](scheduled-patching.md).

    Screenshot that shows how to schedule updates.


## Next steps

* [View updates for single machine](view-updates.md)
* [Deploy updates now (on-demand) for single machine](deploy-updates.md)
* [Schedule recurring updates](scheduled-patching.md)
* [Manage update settings via Portal](manage-update-settings.md)
* [Manage multiple machines using update Manager](manage-multiple-machines.md)
