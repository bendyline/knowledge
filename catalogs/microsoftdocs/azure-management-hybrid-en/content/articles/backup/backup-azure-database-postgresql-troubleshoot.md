---
title: Troubleshoot Azure Database for PostgreSQL backup
description: Troubleshooting information for backing up Azure Database for PostgreSQL.
ms.topic: troubleshooting
ms.date: 02/06/2026
ms.service: azure-backup
author: AbhishekMallick-MS
ms.author: v-mallicka
ms.custom: sfi-image-nochange
# Customer intent: As a database administrator, I want to troubleshoot Azure Database for PostgreSQL backup issues, so that I can ensure successful backups and restore operations without encountering permission or authentication errors.
---

# Troubleshoot PostgreSQL database backup using Azure Backup

This article provides troubleshooting information for backing up Azure PostgreSQL databases with Azure Backup.

## UserErrorMSIMissingPermissions

Give Backup Vault MSI **Read** access on the PG server you want to back up or restore.

To establish secure connection to the PostgreSQL database, Azure Backup uses the [Managed Service Identity (MSI)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) authentication model. This means that the backup vault will have access to only those resources that have been explicitly granted permission by the user.

A system MSI is automatically assigned to the vault at the time of creation. You need to give this vault MSI the access to the PostgreSQL servers you intend to back up databases from.

Steps:

1. In the Postgres server, go to the **Access Control (IAM)** pane.

    Access Control pane

1. Select **Add role assignments**.

    Screenshot to add role assignment.

1. In the right context pane that opens, enter the following:<br>

   - **Role:** Choose the **Reader** role in the drop-down list.<br>
   - **Assign access to:** Choose the **User, group, or service principal** option in the drop-down list.<br>
   - **Select:** Enter the Backup vault name to which you want to back up this server and its databases.<br>

    Screenshot showing how to select role.

## UserErrorBackupUserAuthFailed

Create a database backup user that can authenticate with Microsoft Entra ID:

This error may come from an absence of a Microsoft Entra admin for the PostgreSQL server, or in absence of a backup user that can authenticate using Microsoft Entra ID.

Steps:

Add an Active Directory Admin to the OSS server:

This step is required to connect to the database through a user that can authenticate with Microsoft Entra ID instead of a password. The Microsoft Entra Admin user in Azure Database for PostgreSQL will have the role **azure_ad_admin**. Only an **azure_ad_admin** role can create new database users that can authenticate with Microsoft Entra ID.

1. Go to the Active Directory Admin tab in the left navigation pane of the server view, and add yourself (or someone else) as the Active Directory admin.

    Screenshot showing how to set Active Directory admin.

1. Make sure to **Save** the AD admin user setting.

    Screenshot showing how to save Active Directory admin user setting.

Refer to [this document](https://download.microsoft.com/download/7/4/d/74d689aa-909d-4d3e-9b18-f8e465a7ebf5/OSSbkpprep_automated.docx) for the list of steps you need to perform to complete the permission granting steps.

### UserErrorMissingNetworkSecurityPermissions

Establish network line of sight by enabling the **Allow access to Azure services** flag in the server view. In the server view, under the **Connection security** pane, set the **Allow access to Azure services** flag to **Yes**.

>**Note:**
>Before you enable this flag, ensure that you set the **Deny public network access** flag to **No**.

Screenshot showing how to allow access to Azure services.

## UserErrorContainerNotAccessible

### Permission to restore to a storage account container when restoring as files

1. Give the Backup vault MSI the permission to access the storage account containers using the Azure portal.
    1. Go to **Storage Account** -> **Access Control** -> **Add role assignment**.
    1. Assign **Storage Blob Data Contributor** role to the Backup vault MSI.

    Screenshot showing the process to assign Storage Blob Data Contributor role.

1. Alternatively, give granular permissions to the specific container you're restoring to by using the Azure CLI [az role assignment create](https://learn.microsoft.com/cli/azure/role/assignment) command.

    ```azurecli
    az role assignment create --assignee $VaultMSI_AppId  --role "Storage Blob Data Contributor"   --scope $id
    ```

    1. Replace the assignee parameter with the **Application ID** of the vault's MSI and the scope parameter to refer to your specific container.
    1. To get the **Application ID** of the vault MSI, select **All applications** under **Application type**:

        Screenshot showing how to select All Applications.

    1. Search for the vault name and copy the Application ID:

        Screenshot showing how to search for vault name.

## UserErrorDBUserAuthFailed

The Azure Backup service uses the credentials mentioned in the key-vault to access the database as a database user. The relevant key vault and the secret are [provided during configuration of backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-azure-database-postgresql.md#configure-backup-on-azure-postgresql-databases). Ensure that the credentials stored as part of the secret value in the key vault are valid. Ensure that the specified database user has login access.

## UserErrorInvalidSecret

The Azure Backup service uses the credentials mentioned in the key-vault to access the database as a database user. The relevant key vault and the secret are [provided during configuration of backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-azure-database-postgresql.md#configure-backup-on-azure-postgresql-databases). Ensure that the specified secret name is present in the key vault.

## UserErrorMissingDBPermissions


The Azure Backup service uses the credentials mentioned in the key-vault to access the database as a database user. The relevant key vault and the secret are [provided during configuration of backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-azure-database-postgresql.md#configure-backup-on-azure-postgresql-databases). The key-vault associated with this backup instance can be found by accessing the backup instance and selecting the JSON view. You'll see the key-vault name and secret details listed under the **datasourceAuthCredentials** section as shown in the below screenshot.

Screenshot showing how to search for key vault by using secret name.

## UserErrorSecretValueInUnsupportedFormat

The Azure Backup service uses the credentials mentioned in the key-vault to access the database as a database user. The relevant key vault and the secret are [provided during configuration of backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-azure-database-postgresql.md#configure-backup-on-azure-postgresql-databases). However the secret value is not in a format supported by Azure Backup. Check the supported format as documented [here](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-azure-database-postgresql.md#create-secrets-in-the-key-vault).

## UserErrorInvalidSecretStore

The Azure Backup service uses the credentials mentioned in the key-vault to access the database as a database user. The relevant key vault and the secret are [provided during configuration of backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-azure-database-postgresql.md#configure-backup-on-azure-postgresql-databases). Ensure that the given key vault exists and the backup service is given access as documented [here](backup-azure-database-postgresql-overview.md#set-of-permissions-needed-for-azure-postgresql-database-backup).

## UserErrorMissingPermissionsOnSecretStore

The Azure Backup service uses the credentials mentioned in the key-vault to access the database as a database user. The relevant key vault and the secret are [provided during configuration of backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-azure-database-postgresql.md#configure-backup-on-azure-postgresql-databases). Ensure that backup vault's MSI is given access to key vault as documented [here](backup-azure-database-postgresql-overview.md#set-of-permissions-needed-for-azure-postgresql-database-backup).

## UserErrorDBNotFound

Ensure that the database and the relevant server exist.

## UserErrorDatabaseNameAlreadyInUse

The name given for the restored database already exists and hence the restore operation failed. Retry the restore operation with a different name.

## UserErrorServerConnectionClosed

The operation failed because the server closed the connection unexpectedly. Retry the operation and if the error still persists, please contact Microsoft Support.


## Next steps

[About Azure Database for PostgreSQL backup](backup-azure-database-postgresql-overview.md)
