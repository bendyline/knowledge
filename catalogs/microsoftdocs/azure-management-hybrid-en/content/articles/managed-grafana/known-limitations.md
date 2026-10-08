---
title: Azure Managed Grafana service limits
titlesuffix: Azure Managed Grafana
description: Learn about current service limits, quotas, and constraints you may encounter using Azure Managed Grafana.
ms.service: azure-managed-grafana
ms.topic: troubleshooting
ms.date: 07/20/2026
ms.author: malev
ms.custom: engagement-fy23
author: maud-lv
ai-usage: ai-assisted
---

# Service limits, quotas, and constraints

Azure Managed Grafana delivers the native Grafana functionality in the highest possible fidelity. Some differences exist between what it provides and what you get by self-hosting Grafana. As a general rule, Azure Managed Grafana disables features and settings that might affect the security or reliability of the service and individual Grafana workspaces it manages.

## Service limits

Azure Managed Grafana has the following known limitations:

* All users must have accounts in Microsoft Entra ID. Third-party accounts aren't supported. As a workaround, use the default tenant of your Azure subscription with your Grafana workspace and add other users as guests.

* You can't install, uninstall, or upgrade plugins from the Grafana Catalog.

* In Grafana 12, the **Metrics** drilldown requires the `grafana-metricsdrilldown-app` plugin, which isn't installed by default. For more information about installing it, see [Add a plugin](how-to-manage-plugins.md#add-a-plugin).

* Querying Azure Data Explorer might take a long time or return 50x errors. To resolve these problems, use a table format instead of a time series, shorten the time duration, or avoid having many panels querying the same data cluster that can trigger throttling.

* You can assign users the following Grafana Organization level roles: Admin, Editor, or Viewer. The Grafana Server Admin role isn't available to customers.

* Some Data plane APIs require Grafana Server Admin permissions and can't be called by users. This requirement includes the [Admin API](https://grafana.com/docs/grafana/latest/developers/http_api/admin/), the [User API](https://grafana.com/docs/grafana/latest/developers/http_api/user/#user-api), and the [Admin Organizations API](https://grafana.com/docs/grafana/latest/developers/http_api/org/#admin-organizations-api).

* Azure Managed Grafana currently doesn't support the Grafana Role Based Access Control (RBAC) feature and the [RBAC API](https://grafana.com/docs/grafana/latest/developers/http_api/access_control/) is therefore disabled.

* Unified alerting is enabled by default for all workspaces created after December 2022. For workspaces created before this date, unified alerting must be enabled manually by the Azure Managed Grafana team. For activation, [open a support ticket](find-help-open-support-ticket.md#open-a-support-ticket).

* Only Azure subscriptions billed directly through Microsoft are eligible for the purchase of Grafana Enterprise. CSP subscriptions, i.e., Azure subscriptions billed through Cloud Solution Providers (CSP), aren't eligible.

* An Azure Managed Grafana workspace can use only one managed identity: user-assigned or system-assigned.

* [Git Sync](how-to-create-dashboard.md#manage-dashboards-as-code-with-git-sync) requires Grafana version 13 or later and supports GitHub repositories only, with up to 10 repositories and 1,000 resources per repository.
### Annotation retention

Azure Managed Grafana automatically removes annotations that exceed the following age and count limits.

| Configuration section | Setting | Limit |
| --- | --- | --- |
| `[unified_alerting.state_history.annotations]` | [max_age](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#max_age) | 90 days |
| `[unified_alerting.state_history.annotations]` | [max_annotations_to_keep](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#max_annotations_to_keep) | 10,000 |
| `[annotations.dashboard]` | [max_age](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#max_age-1) | 90 days |
| `[annotations.dashboard]` | [max_annotations_to_keep](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#max_annotations_to_keep-1) | 10,000 |
| `[annotations.api]` | [max_age](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#max_age-2) | 90 days |
| `[annotations.api]` | [max_annotations_to_keep](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#max_annotations_to_keep-2) | 10,000 |

### Current User authentication

The *Current User* authentication option triggers the following limitation. Grafana offers some automated features such as alerts and reporting, that are expected to run in the background periodically. The Current User authentication method relies on a user being signed in, in an interactive session, to connect a data source to a database. Therefore, when this authentication method is used and no user is signed in, automated tasks can't run in the background. To leverage automated tasks, set up another data source with another authentication method or [configure alerts in Azure Monitor](how-to-use-azure-monitor-alerts.md).

## Feature availability in sovereign clouds

Some Azure Managed Grafana features aren't available in Azure Government and Microsoft Azure operated by 21Vianet due to limitations in these specific environments. The following table lists these differences.

| Feature | Azure Government | Microsoft Azure operated by 21Vianet (Preview) |
| --- | :---: | :---: |
| Private link | Supported | Supported |
| Managed private endpoint | Supported | Supported |
| Team sync with Microsoft Entra ID | Preview | Preview |
| Enterprise plugins | Not supported | Not supported |
| Essential tier (deprecated) | Not supported | Not supported |
| MemoryUsagePercentage metric | Not supported | Not supported |

## Throttling limits and quotas

The following quotas apply.

> **Note:**
> Grafana Enterprise is an option within the Standard plan, not a separate plan within Azure. The information listed below for the Standard plan also applies to Standard workspaces with Grafana Enterprise enabled.


> **Note:**
> The Essential tier is deprecated. Existing Essential instances continue to run during the transition period, but you can't create new Essential instances. The Essential tier is scheduled to retire on March 31, 2027.

| Limit | Description | Essential (deprecated; existing instances only) | Standard X1 | Standard X2 |
| --- | --- | --- | --- | --- |
| Alert rules | Maximum number of alert rules that you can create. | Not supported | 500 per instance | 1000 per instance |
| Memory for Grafana instance | Amount of memory for Grafana in your dedicated instance. | Basic | Standard | Expanded |
| Dashboards | Maximum number of dashboards that you can create. | 20 per instance | Unlimited | Unlimited |
| Data sources | Maximum number of data sources that you can create. | 5 per instance | Unlimited | Unlimited |
| Git Sync repositories | Maximum number of GitHub repositories that you can connect with Git Sync. | 10 per instance | 10 per instance | 10 per instance |
| Git Sync resources per repository | Maximum number of resources per repository that you can synchronize with Git Sync. | 1,000 per repository | 1,000 per repository | 1,000 per repository |
| API keys | Maximum number of API keys that you can create. | 2 per instance | 100 per instance | 100 per instance |
| Data query timeout | Maximum wait duration for the reception of data query response headers, before Grafana times out. | 200 seconds | 200 seconds | 200 seconds |
| Data source query size | Maximum number of bytes that are read or accepted from responses of outgoing HTTP requests. | 80 MB | 80 MB | 80 MB |
| Render image or PDF report wait time | Maximum duration for an image or report PDF rendering request to complete before Grafana times out. | Not supported | 220 seconds | 220 seconds |
| Instance count | Maximum number of instances in a single subscription per Azure region. | 1 | 50 | 50 |
| Requests per IP | Maximum number of requests per IP per second. | 90 requests per second | 90 requests per second | 90 requests per second |
| Requests per HTTP host | Maximum number of requests per HTTP host per second. The HTTP host stands for the Host header in incoming HTTP requests, which can describe each unique host client. | 45 requests per second | 45 requests per second | 45 requests per second |


Each data source also has its own limits that can be reflected in Azure Managed Grafana dashboards, alerts, and reports. Research these limits in the documentation of each data source provider. For example:

* Refer to [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/service-limits) to learn about Azure Monitor service limits, including alerts, Prometheus metrics, data collection, logs, and more.
* Refer to [Azure Data Explorer](https://learn.microsoft.com/azure/data-explorer/kusto/concepts/querylimits) to learn about Azure Data Explorer service limits.

## Related links

> 
> [Troubleshooting](troubleshoot-managed-grafana.md)
> [Support](find-help-open-support-ticket.md)
