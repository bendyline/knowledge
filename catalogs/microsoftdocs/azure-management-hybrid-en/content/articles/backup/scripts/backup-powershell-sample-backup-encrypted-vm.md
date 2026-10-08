---
title: PowerShell Script Sample - Back up an Azure VM
description: In this article, learn how to use an Azure PowerShell Script sample to back up an Azure virtual machine.
ms.topic: sample
ms.date: 04/30/2025
ms.update-cycle: 1095-days
ms.custom: mvc, devx-track-azurepowershell
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: "As a cloud administrator, I want to use a PowerShell script to back up an encrypted Azure virtual machine, so that I can ensure data protection and facilitate recovery in case of data loss."
---

# Back up an encrypted Azure virtual machine with PowerShell

This script creates a Recovery Services vault with geo-redundant storage (GRS) for an encrypted Azure VM. It applies the default protection policy, enabling daily backups retained for 365 days. Also, it triggers an initial recovery point, stored for 30 days.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/sample-powershell-install-no-ssh.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/scripts/backup-powershell-sample-backup-encrypted-vm.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/scripts/backup-powershell-sample-backup-encrypted-vm.md)

## Sample script

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/updated-for-az.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/scripts/backup-powershell-sample-backup-encrypted-vm.md)

[Code reference unavailable in this source snapshot: ~/powershell_scripts/backup/backup-encrypted-vm/backup-encrypted-vm.ps1](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/scripts/backup-powershell-sample-backup-encrypted-vm.md)

## Clean up deployment

Run the following command to remove the resource group, VM, and all related resources.

```powershell
Remove-AzResourceGroup -Name myResourceGroup
```

## Script explanation

This script uses the following commands to create the deployment. Each item in the table links to command specific documentation.

| Command | Notes |
| --- | --- |
| [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) | Creates a resource group in which all resources are stored. |
| [New-AzRecoveryServicesVault](https://learn.microsoft.com/powershell/module/az.recoveryservices/new-azrecoveryservicesvault) | Creates a Recovery Services vault to store backups. |
| [Set-AzRecoveryServicesBackupProperty](https://learn.microsoft.com/powershell/module/az.recoveryservices/set-azrecoveryservicesbackupproperty) | Sets backup storage properties on Recovery Services vault. |
| [New-AzRecoveryServicesBackupProtectionPolicy](https://learn.microsoft.com/powershell/module/az.recoveryservices/set-azrecoveryservicesbackupprotectionpolicy) | Creates protection policy using schedule policy and retention policy in Recovery Services vault. |
| [Set-AzKeyVaultAccessPolicy](https://learn.microsoft.com/powershell/module/az.keyvault/set-azkeyvaultaccesspolicy) | Sets permissions on the Key Vault to grant the service principal access to encryption keys. |
| [Enable-AzRecoveryServicesBackupProtection](https://learn.microsoft.com/powershell/module/az.recoveryservices/enable-azrecoveryservicesbackupprotection) | Enables backup for an item with a specified Backup protection policy. |
| [Set-AzRecoveryServicesBackupProtectionPolicy](https://learn.microsoft.com/powershell/module/az.recoveryservices/set-azrecoveryservicesbackupprotectionpolicy) | Modifies an existing Backup protection policy. |
| [Backup-AzRecoveryServicesBackupItem](https://learn.microsoft.com/powershell/module/az.recoveryservices/backup-azrecoveryservicesbackupitem) | Starts a backup for a protected Azure Backup item that isn't tied to the backup schedule. |
| [Wait-AzRecoveryServicesBackupJob](https://learn.microsoft.com/powershell/module/az.recoveryservices/wait-azrecoveryservicesbackupjob) | Waits for an Azure Backup job to finish. |
| [Remove-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/remove-azresourcegroup) | Removes a resource group and all resources contained within. |

## Next steps

Learn more about [the Azure PowerShell module](https://learn.microsoft.com/powershell/azure/new-azureps-module-az).
