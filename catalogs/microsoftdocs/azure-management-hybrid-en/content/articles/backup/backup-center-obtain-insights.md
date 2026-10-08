---
title: Obtain insights using Backup center
description: Learn how to analyze historical trends and gain deeper insights on your backups with Backup center. 
ms.topic: how-to
ms.date: 08/22/2025
ms.update-cycle: 1825-days
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: As a backup administrator, I want to analyze historical trends and gain insights from my backup data using the Backup Center, so that I can optimize storage costs and improve backup performance.
---

# Obtain Insights using Backup center

[Include unavailable in this source snapshot: ../../includes/backup-center-deprecation.md ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-center-obtain-insights.md)

To analyze historical trends and gaining deeper insights on your backups, Backup Center provides an interface to [Backup Reports](configure-reports.md), which uses [Azure Monitor Logs](https://learn.microsoft.com/azure/azure-monitor/logs/data-platform-logs) and [Azure Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview). Backup Reports offers the following capabilities:

- Allocating and forecasting of cloud storage consumed.

- Auditing of backups and restores.

- Identifying key trends at different levels of granularity.

- Gaining visibility and insights into cost optimization opportunities for your backups.

## Supported scenarios

- Backup Reports is currently not supported for workloads that are backed up using Backup vaults.

- Refer to the [support matrix](backup-center-support-matrix.md) for a detailed list of supported and unsupported scenarios.


## Get started with Backup center

To get started with using Backup center, follow these steps:

1. In the [Azure portal](https://portal.azure.com/), search for **Resiliency**, and then go to the **Resiliency** dashboard.

    Screenshot shows how to search for Resiliency.

1. To launch Backup center, Select **Help** in the top menu > **Go to Backup Center**.

    Screenshot shows how to launch Backup center from the Help menu.

1. On the **Navigate to Backup Center** pane, select a reason for transitioning to Backup center, type a reason in the text box, and then select **Submit**.




### Configure your vaults to send data to a Log Analytics workspace

[Learn how to configure diagnostics settings at scale for your vaults](configure-reports.md#get-started)

### View Backup Reports in the Backup center portal

Selecting the **Backup Reports** menu item in Backup center opens up the reports. Choose one or more Log Analytics workspaces to view and analyze key information on your backups.

Backup reports in Backup Center

Following are the views available:

1. **Summary** - Use this tab to get a high-level overview of your backup estate. [Learn more](view-reports.md#summary)

2. **Backup Items** - Use this tab to see information and trends on cloud storage consumed at a Backup-item level. [Learn more](view-reports.md#backup-items)

3. **Usage** - Use this tab to view key billing parameters for your backups. [Learn more](view-reports.md#usage)

4. **Jobs** - Use this tab to view long-running trends on jobs, such as the number of failed jobs per day and the top causes of job failure. [Learn more](view-reports.md#jobs)

5. **Policies** - Use this tab to view information on all of your active policies, such as the number of associated items and the total cloud storage consumed by items backed up under a given policy. [Learn more](view-reports.md#policies)

6. **Optimize** - Use this tab to gain visibility into potential cost-optimization opportunities for your backups. [Learn more](view-reports.md#optimize)

7. **Policy adherence** - Use this tab to gain visibility into whether every backup instance has had at least one successful backup per day. [Learn more](view-reports.md#policies)

You can also configure emails for these reports using the [Email Report](backup-reports-email.md) feature.

## Next steps

- [Monitor and Operate backups](backup-center-monitor-operate.md)
- [Govern your backup estate](backup-center-govern-environment.md)
- [Perform actions by using Backup center](backup-center-actions.md)
