---
title: Monitoring data reference for Azure Logic Apps
description: Learn about important reference information for monitoring Azure Logic Apps.
services: logic-apps
ms.service: azure-logic-apps
ms.topic: reference
ms.date: 02/28/2025
ms.custom: horz-monitor
---

# Azure Logic Apps monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)

For details about the data you can collect for Azure Logic Apps and how to use that data, see [Monitor Azure Logic Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)

### Supported metrics for Microsoft.Logic/IntegrationServiceEnvironments

The following table lists the metrics available for the **Microsoft.Logic/IntegrationServiceEnvironments** resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-logic-integrationserviceenvironments-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)  

### Supported metrics for Microsoft.Logic/Workflows

The following table lists the metrics available for the **Microsoft.Logic/Workflows** resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-logic-workflows-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)  

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-no-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)

### Supported resource logs for Microsoft.Logic/IntegrationAccounts

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-logic-integrationaccounts-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)

### Supported resource logs for Microsoft.Logic/Workflows

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-logic-workflows-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)

### Azure Logic Apps

Microsoft.Logic/workflows

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/AzureActivity#columns)
- [AzureMetrics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/AzureMetrics#columns)
- [AzureDiagnostics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/AzureDiagnostics#columns). Logs are collected in the **AzureDiagnostics** table under the resource provider name of `MICROSOFT.LOGIC`.
- [LogicAppWorkflowRuntime](https://learn.microsoft.com/azure/azure-monitor/reference/tables/LogicAppWorkflowRuntime#columns)

### Integration account

Microsoft.Logic/integrationAccounts

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/AzureActivity#columns)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps-reference.md)

- [Microsoft.Logic resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/permissions/integration#microsoftlogic)

## Related content

- For an overview about monitoring Azure Logic Apps, see [Monitor Azure Logic Apps](monitor-logic-apps-overview.md).
- For a description about monitoring workflow status and history and creating alerts, see [Monitor workflows](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/monitor-logic-apps.md).
- For details about monitoring Azure resources, see [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource).
