---
author: AbhishekMallick-MS
ms.service: azure-backup
ms.topic: include
ms.date: 05/30/2024
ms.author: v-abhmallick
---

[Azure Backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-overview.md) now allows you to configure both [operational](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/blob-backup-overview.md?tabs=operational-backup) and [vaulted](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/blob-backup-overview.md?tabs=vaulted-backup) backups to protect block blobs in your storage accounts.

Vaulted backup of blobs is a managed offsite backup solution that stores the backup data in a general v2 storage account, enabling you to protect your backup data against ransomware attacks or source data loss due to malicious or rogue admin. 

With vaulted backup, you can:

- Define the backup schedule to create recovery points and the retention settings that determine how long the backups will be retained in the vault.
- Configure and manage the vaulted and operational backups using a single backup policy.
- Copy and store the backup data in the Backup vault, thus providing an offsite copy of data that can be retained for a maximum of 10 years.
