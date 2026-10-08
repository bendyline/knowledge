---
title: Monitoring data reference for Azure Backup
description: This article contains important reference material you need when you monitor Azure Backup by using Azure Monitor.
ms.date: 03/05/2025
ms.custom: horz-monitor
ms.topic: reference
author: FuzziWumpus
ms.author: mkluck
ms.service: azure-backup
# Customer intent: "As a cloud operations engineer, I want to access detailed monitoring data for Azure Backup, so that I can effectively track performance and ensure reliable data protection for our applications."
---

# Azure Backup monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/monitor-backup-reference.md)

See [Monitor Azure Backup](monitor-backup.md) for details on the data you can collect for Azure Backup and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/monitor-backup-reference.md)

### Supported metrics for Microsoft.DataProtection/BackupVaults

The following table lists the metrics available for the Microsoft.DataProtection/BackupVaults resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/monitor-backup-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-dataprotection-backupvaults-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/monitor-backup-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/monitor-backup-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/monitor-backup-reference.md)

- [Supported metrics](metrics-overview.md#supported-metrics)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/monitor-backup-reference.md)

### Supported resource logs for Microsoft.DataProtection/BackupVaults

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-dataprotection-backupvaults-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/monitor-backup-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/monitor-backup-reference.md)

### Azure Backup Microsoft.RecoveryServices/Vaults

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity#columns)
- [ASRJobs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/asrjobs#columns)
- [ASRReplicatedItems](https://learn.microsoft.com/azure/azure-monitor/reference/tables/asrreplicateditems#columns)
- [AzureBackupOperations](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azurebackupoperations#columns)
- [AzureDiagnostics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azurediagnostics#columns)
- [CoreAzureBackup](https://learn.microsoft.com/azure/azure-monitor/reference/tables/coreazurebackup#columns)
- [AddonAzureBackupJobs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/addonazurebackupjobs#columns)
- [AddonAzureBackupAlerts](https://learn.microsoft.com/azure/azure-monitor/reference/tables/addonazurebackupalerts#columns)
- [AddonAzureBackupPolicy](https://learn.microsoft.com/azure/azure-monitor/reference/tables/addonazurebackuppolicy#columns)
- [AddonAzureBackupStorage](https://learn.microsoft.com/azure/azure-monitor/reference/tables/addonazurebackupstorage#columns)
- [AddonAzureBackupProtectedInstance](https://learn.microsoft.com/azure/azure-monitor/reference/tables/addonazurebackupprotectedinstance#columns)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/monitor-backup-reference.md)

- [Management and governance resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#management-and-governance)

## Related content

- See [Monitor Azure Backup](monitor-backup.md) for a description of monitoring Azure Backup.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
