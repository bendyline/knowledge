---
title: Quickstart - Configure vaulted backup for Azure Blob Storage using Azure CLI
description: Learn how to configure vaulted backup for Azure Blob Storage using Azure CLI, from policy creation to backup enablement.
ms.devlang: azurecli
ms.topic: quickstart
ms.date: 06/25/2026
ms.custom: mvc, devx-track-azurecli, mode-api
ms.service: azure-backup
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: As a cloud administrator, I want to configure vaulted backup for Azure Blobs using CLI, so that I can automate the backup process and ensure data protection for my cloud resources.
---

# Quickstart: Configure vaulted backup for Azure Blobs using Azure Backup via Azure CLI

This quickstart describes how to configure vaulted backup for Azure Blob Storage using Azure CLI. You can also [configure backup using REST API](backup-azure-dataprotection-use-rest-api-backup-blobs.md).


[Azure Backup](backup-overview.md) now allows you to configure both [operational](blob-backup-overview.md?tabs=operational-backup) and [vaulted](blob-backup-overview.md?tabs=vaulted-backup) backups to protect block blobs in your storage accounts.

Vaulted backup of blobs is a managed offsite backup solution that stores the backup data in a general v2 storage account, enabling you to protect your backup data against ransomware attacks or source data loss due to malicious or rogue admin. 

With vaulted backup, you can:

- Define the backup schedule to create recovery points and the retention settings that determine how long the backups will be retained in the vault.
- Configure and manage the vaulted and operational backups using a single backup policy.
- Copy and store the backup data in the Backup vault, thus providing an offsite copy of data that can be retained for a maximum of 10 years.

## Prerequisites

Before you configure blob vaulted backup, ensure that:

- You review the [support matrix](blob-backup-support-matrix.md) to learn about the Azure Blob region availability, supported scenarios, and limitations.
- Have a Backup vault to configure Azure Blob backup. If you don't have a Backup vault, [create one](backup-blobs-storage-account-cli.md#create-a-backup-vault).
- Install the Azure CLI `dataprotection` extension version 1.10.0 or later to configure auto-protection for present and future containers.

## Create a backup policy


To create a backup policy for blob vaulted backup, run the following commands:

1. To understand the inner components of a Backup policy for Azure Blobs backup, retrieve the policy template using the `az dataprotection backup-policy get-default-policy-template` command.

    This command returns a default policy template for a given datasource type. Use this policy template to create a new policy.

2. Once you have saved the policy JSON with  all the required values, proceed to create a new policy from the policy object using the `az dataprotection backup-policy create` command.

   ```azurecli-interactive
   Az dataprotection backup-policy create -g testBkpVaultRG –vault-name TestBkpVault -n BlobBackup-Policy –policy policy.json
   ```

   The following JSON is to configure a policy with *30 days retention* for *operational backup* and *30 days default retention* for *vaulted backup*. The vaulted backup is scheduled every day at *7:30 UTC*.

    ```json
    {
      "datasourceTypes": [
        "Microsoft.Storage/storageAccounts/blobServices"
      ],
      "name": "BlobPolicy1",
      "objectType": "BackupPolicy",
      "policyRules": [
        {
          "isDefault": true,
          "lifecycles": [
            {
              "deleteAfter": {
                "duration": "P30D",
                "objectType": "AbsoluteDeleteOption"
              },
              "sourceDataStore": {
                "dataStoreType": "OperationalStore",
                "objectType": "DataStoreInfoBase"
              },
              "targetDataStoreCopySettings": []
            }
          ],
          "name": "Default",
          "objectType": "AzureRetentionRule"
        },
        {
          "isDefault": true,
          "lifecycles": [
            {
              "deleteAfter": {
                "duration": "P30D",
                "objectType": "AbsoluteDeleteOption"
              },
              "sourceDataStore": {
                "dataStoreType": "VaultStore",
                "objectType": "DataStoreInfoBase"
              },
              "targetDataStoreCopySettings": []
            }
          ],
          "name": "Default",
          "objectType": "AzureRetentionRule"
        },
        {
          "backupParameters": {
            "backupType": "Discrete",
            "objectType": "AzureBackupParams"
          },
          "dataStore": {
            "dataStoreType": "VaultStore",
            "objectType": "DataStoreInfoBase"
          },
          "name": "BackupDaily",
          "objectType": "AzureBackupRule",
          "trigger": {
            "objectType": "ScheduleBasedTriggerContext",
            "schedule": {
              "repeatingTimeIntervals": [
                "R/2023-06-28T07:30:00+00:00/P1D"
              ],
              "timeZone": "UTC"
            },
            "taggingCriteria": [
              {
                "isDefault": true,
                "tagInfo": {
                  "id": "Default_",
                  "tagName": "Default"
                },
                "taggingPriority": 93
              }
            ]
          }
        }
      ]
    }

    ```

>**Important:**
>The backup schedule follows the ISO 8601 duration format. However, the repeating interval prefix `R` is not supported, as backups are configured to run indefinitely. Any value specified with `R` will be ignored.

## Configure backup


Once the vault and policy are created, there are two critical points that you need to consider to protect all the Azure Blobs within a storage account.

- Key entities
- Permissions

### Key entities

- **Storage account containing the blobs to be protected**: Fetch the Azure Resource Manager ID of the storage account that contains the blobs to be protected. This will serve as the identifier of the storage account. We'll use an example of a storage account named *CLITestSA*, under the resource group *blobrg*, in a different subscription present in the Southeast Asia region.

    ```azurecli-interactive
    "/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx/resourcegroups/blobrg/providers/Microsoft.Storage/storageAccounts/CLITestSA"
    ```

- **Backup vault**: The Backup vault requires permissions on the storage account to enable backups on blobs present within the storage account. The system-assigned managed identity of the vault is used for assigning such permissions.

### Assign permissions

You need to assign a few permissions via Azure RBAC to the created vault (represented by vault MSI) and the relevant storage account. These can be performed via Portal or PowerShell. Learn more about all the [related permissions](https://learn.microsoft.com/azure/backup/blob-backup-configure-manage#grant-permissions-to-the-backup-vault-on-storage-accounts).


## Prepare the request to configure blob backup


After you set the relevant permissions, configure the blob backup by running the following commands:

1. Initialize the backup configuration with auto-protection enabled. Use `--exclusion-prefixes` to exclude containers whose names start with the specified prefixes.

    ```azurecli-interactive
    az dataprotection backup-instance initialize-backupconfig `
      --datasource-type AzureBlob `
      --auto-protection true `
      --exclusion-prefixes "logs-" "temp-" `
      --output json |
      Set-Content blob-autoprotection.json -Encoding utf8
    ```

1. Prepare the relevant request by using the relevant vault, policy, storage account, and backup configuration with the [`az dataprotection backup-instance initialize`](https://learn.microsoft.com/cli/azure/dataprotection/backup-instance#az-dataprotection-backup-instance-initialize) command.


    ```azurecli-interactive
    az dataprotection backup-instance initialize `
      --datasource-type AzureBlob `
      --datasource-location "southeastasia" `
      --policy-id "/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/testBkpVaultRG/providers/Microsoft.DataProtection/backupVaults/TestBkpVault/backupPolicies/BlobBackup-Policy" `
      --datasource-id "/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourcegroups/blobrg/providers/Microsoft.Storage/storageAccounts/CLITestSA" `
      --backup-config blob-autoprotection.json `
      --output json |
      Set-Content backup_instance.json -Encoding utf8
    ```

2. Submit the request using the [`az dataprotection backup-instance create`](https://learn.microsoft.com/cli/azure/dataprotection/backup-instance#az-dataprotection-backup-instance-create) command.
 
    ```azurecli-interactive
    az dataprotection backup-instance create `
      --subscription "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e" `
      --resource-group "testBkpVaultRG" `
      --vault-name "TestBkpVault" `
      --backup-instance backup_instance.json
    ```

   The following JSON configures a blob backup for a specified storage account with a specified policy and explicit container list. Use an explicit container list when you want to protect only selected containers instead of auto-protecting all containers.

    ```JSON
    {

      "backup_instance_name": "sample-backup-instance",

      "properties": {

        "data_source_info": {

          "datasource_type": "Microsoft.Storage/storageAccounts/blobServices",

          "object_type": "BlobBackupDatasourceParameters",

          "resource_id": "/subscriptions/XXXX/resourceGroups/BCDR-RG/providers/Microsoft.Storage/storageAccounts/dptestoct23",

          "resource_location": "eastus",

          "resource_name": "dptestoct23",

          "resource_type": "Microsoft.Storage/storageAccounts",

          "resource_uri": "/subscriptions/XXXX/resourceGroups/BCDR-RG/providers/Microsoft.Storage/storageAccounts/dptestoct23"

        },

        "data_source_set_info": null,

        "datasource_auth_credentials": null,

        "friendly_name": "dptest23",

        "object_type": "BackupInstance",

              "policyInfo": {

                "policyId": "/subscriptions/XXXX/resourceGroups/BCDR-RG/providers/Microsoft.DataProtection/backupVaults/DPBCDR-BV-EastUS/backupPolicies/blobbackup-1",

                "policyVersion": "",

                "policyParameters": {

                    "backupDatasourceParametersList": [

                        {

                            "objectType": "BlobBackupDatasourceParameters",

                            "containersList": [

                            "cont1",

                            "cont2"

                            ]

                        }

                    ]

                }

            }

      }

    }

    
    ```

> **Important:**
> Once a storage account is configured for blobs backup, a few capabilities, such as change feed and delete lock are affected. [Learn more](blob-backup-configure-manage.md?tabs=vaulted-backup#effects-on-backed-up-storage-accounts).


## Next steps

Restore Azure Blobs by Azure Backup using [Azure portal](blob-restore.md), [Azure PowerShell](restore-blobs-storage-account-ps.md), [Azure CLI](restore-blobs-storage-account-cli.md), [REST API](backup-azure-dataprotection-use-rest-api-restore-blobs.md).
