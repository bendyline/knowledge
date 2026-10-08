---
title: "Configure and use Always Encrypted with secure enclaves| Microsoft Docs"
description: Learn how to configure and use Always Encrypted with secure enclaves in SQL Server and Azure SQL Database, which enables richer functionality on sensitive data.
author: Pietervanhove
ms.author: pivanho
ms.reviewer: "vanto"
ms.date: 09/02/2026
ms.service: sql
ms.subservice: security
ms.custom: ignite-2023
ms.topic: concept-article
---
# Configure and use Always Encrypted with secure enclaves


**Applies to:**
 



 and later versions on Windows 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)




[Always Encrypted with secure enclaves](always-encrypted-enclaves.md) extends the existing [Always Encrypted](always-encrypted-database-engine.md) feature to enable richer functionality on sensitive data while keeping the data confidential. This article lists common tasks for configuring and using the feature.

For tutorials that show you how to quickly get started with Always Encrypted with secure enclaves, see:

- [Getting started using Always Encrypted with secure enclaves](https://learn.microsoft.com/azure/azure-sql/database/always-encrypted-enclaves-getting-started)

## Set up the secure enclave and attestation

Before you can use Always Encrypted with secure enclaves, you need to configure your environment to ensure the secure enclave is available for the database. You might also need to set up [enclave attestation](always-encrypted-enclaves.md#secure-enclave-attestation), if applicable.

The process for setting up your environment depends on whether you're using  SQL Server 2019 (15.x) 
 and later or  Azure SQL Database 
.

### Set up the secure enclave and attestation in  SQL Server 


To set up Always Encrypted with secure enclaves without attestation, see:

- [Plan for Always Encrypted with secure enclaves in SQL Server without attestation](always-encrypted-enclaves-no-attestation-plan.md)
- [Configure the secure enclave in SQL Server](always-encrypted-enclaves-configure-enclave-type.md)

To set up Always Encrypted with secure enclaves and attestation, see:

- [Plan for Host Guardian Service attestation](always-encrypted-enclaves-host-guardian-service-plan.md)
- [Deploy the Host Guardian Service for  SQL Server
](always-encrypted-enclaves-host-guardian-service-deploy.md)
- [Register  computer with the Host Guardian Service](always-encrypted-enclaves-host-guardian-service-register.md)
- [Configure the secure enclave in SQL Server](always-encrypted-enclaves-configure-enclave-type.md)

### Set up the secure enclave and attestation in  Azure SQL Database 


> **Important:**
> Always Encrypted with Intel Software Guard Extensions (Intel SGX) enclaves reaches the end of support on October 31, 2027. Migrate affected databases before this date. After October 31, 2027, Azure automatically moves any database that remains on the DC-series compute tier to a supported standard-series (non-DC) compute tier and enables virtualization-based security (VBS) enclaves. For migration options, see [Always Encrypted with Intel SGX enclaves migration guide](always-encrypted-enclaves-migration.md).

For details, see the following articles:

- [Plan for secure enclaves in  Azure SQL Database
](https://learn.microsoft.com/azure/azure-sql/database/always-encrypted-enclaves-plan)
- [Enable Always Encrypted with secure enclaves for your  Azure SQL Database
](https://learn.microsoft.com/azure/azure-sql/database/always-encrypted-enclaves-enable)
- [Configure Azure Attestation for your Azure SQL Database logical server](https://learn.microsoft.com/azure/azure-sql/database/always-encrypted-enclaves-configure-attestation)

> **Important:**
> VBS enclaves in Azure SQL Database do not support attestation. Configuring Azure Attestation only applies to Intel SGX enclaves.

## Manage keys for Always Encrypted with secure enclaves

- [Manage keys for Always Encrypted with secure enclaves - overview](always-encrypted-enclaves-manage-keys.md)
- [Provision enclave-enabled keys](always-encrypted-enclaves-provision-keys.md)
- [Rotate enclave-enabled keys](always-encrypted-enclaves-rotate-keys.md)

## Configure columns with Always Encrypted with secure enclaves

- [Configure column encryption in-place using Always Encrypted with secure enclaves - overview](always-encrypted-enclaves-configure-encryption.md)
- [Configure column encryption in-place with Transact-SQL](always-encrypted-enclaves-configure-encryption-tsql.md)
- [Configure column encryption in-place with PowerShell](always-encrypted-enclaves-configure-encryption-powershell.md)
- [Configure column encryption in-place with DAC Package](always-encrypted-enclaves-configure-encryption-dacpac.md)
- [Enable Always Encrypted with secure enclaves for existing encrypted columns](always-encrypted-enclaves-enable-for-encrypted-columns.md)

## Run Transact-SQL statements using secure enclaves

- [Run Transact-SQL statements using secure enclaves](always-encrypted-enclaves-query-columns.md)
- [Troubleshoot common issues for Always Encrypted with secure enclaves](always-encrypted-enclaves-troubleshooting.md)

## Create and use indexes on enclave-enabled columns

- [Create and use indexes on columns using Always Encrypted with secure enclaves](always-encrypted-enclaves-create-use-indexes.md)
  
## Develop applications using Always Encrypted with secure enclaves

- [Develop applications using Always Encrypted with secure enclaves](always-encrypted-enclaves-client-development.md)

## Related content

- [Getting started using Always Encrypted with secure enclaves](https://learn.microsoft.com/azure/azure-sql/database/always-encrypted-enclaves-getting-started)
