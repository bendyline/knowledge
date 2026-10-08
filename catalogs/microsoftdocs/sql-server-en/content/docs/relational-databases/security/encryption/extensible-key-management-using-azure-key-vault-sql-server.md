---
title: Extensible Key Management Using Azure Key Vault
description: Use the SQL Server Connector for Extensible Key Management with Azure Key Vault for SQL Server.
author: jaszymas
ms.author: jaszymas
ms.reviewer: vanto, randolphwest
ms.date: 10/06/2025
ms.service: sql
ms.subservice: security
ms.topic: concept-article
ms.custom:
  - sfi-image-nochange
helpviewer_keywords:
  - "Extensible Key Management with key vault"
  - "Transparent Data Encryption, using EKM and key vault"
  - "EKM, with key vault"
  - "TDE, EKM and key vault"
  - "Key Management with key vault"
  - "SQL Server Connector, about"
---
# Extensible Key Management using Azure Key Vault (SQL Server)


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

The  SQL Server 
 Connector for Azure Key Vault enables  SQL Server 
 encryption to use the Azure Key Vault service as an [Extensible Key Management (EKM)](extensible-key-management-ekm.md) provider to protect  SQL Server 
 encryption keys.

This article describes the  SQL Server 
 connector. More information is available in:

- [Set up SQL Server TDE Extensible Key Management by using Azure Key Vault](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/security/encryption/setup-steps-for-extensible-key-management-using-the-azure-key-vault.md)
- [Use SQL Server Connector with SQL Encryption Features](use-sql-server-connector-with-sql-encryption-features.md)
- [SQL Server Connector Maintenance & Troubleshooting](sql-server-connector-maintenance-troubleshooting.md)

<a id="Uses"></a>

## What is Extensible Key Management (EKM) and why use it?

 SQL Server 
 provides several types of encryption that help protect sensitive data, including [Transparent data encryption (TDE)](transparent-data-encryption.md), [Encrypt a Column of Data](encrypt-a-column-of-data.md) (CLE), and [Backup encryption](../../backup-restore/backup-encryption.md). In all of these cases, in this traditional key hierarchy, the data is encrypted using a symmetric data encryption key (DEK). The symmetric data encryption key is further protected by encrypting it with a hierarchy of keys stored in  SQL Server 
.

Instead of this model, the alternative is the EKM Provider Model. Using the EKM provider architecture enables  SQL Server 
 to protect the data encryption keys by using an asymmetric key stored outside of  SQL Server 
 in an external cryptographic provider. This model adds an additional layer of security and separates the management of keys and data.

The following image compares the traditional service-manage key hierarchy with the Azure Key Vault system.

Diagram that compares the traditional service-manage key hierarchy with the Azure Key Vault system.

The  SQL Server 
 Connector serves as a bridge between  SQL Server 
 and Azure Key Vault, so  SQL Server 
 can use the scalability, high performance, and high availability of the Azure Key Vault service. The following image represents how the key hierarchy works in the EKM provider architecture with Azure Key Vault and  SQL Server 
 Connector.

Azure Key Vault can be used with  SQL Server 
 installations on Azure Virtual Machines and for on-premises servers. The key vault service also provides the option to use tightly controlled and monitored Hardware Security Modules (HSMs) for a higher level of protection for asymmetric encryption keys. For more information about the key vault, see [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts).

> **Note:**  
> Only Azure Key Vault and Azure Key Vault Managed HSM are supported. Azure Cloud HSM isn't supported.

The following image summarizes the process flow of EKM using the key vault. (The process step numbers in the image aren't meant to match the setup step numbers that follow the image.)

Screenshot of SQL Server EKM using the Azure Key Vault.

> **Note:**  
> Versions 1.0.0.440 and older are no longer supported in production environments. Upgrade to version 1.0.1.0 or a later version by visiting the [Microsoft Download Center](https://www.microsoft.com/download/details.aspx?id=45344) and using the instructions on the [SQL Server Connector Maintenance & Troubleshooting](sql-server-connector-maintenance-troubleshooting.md) page under "Upgrade of SQL Server Connector."

For the next step, see [Set up SQL Server TDE Extensible Key Management by using Azure Key Vault](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/security/encryption/setup-steps-for-extensible-key-management-using-the-azure-key-vault.md).

For use scenarios, see [Use SQL Server Connector with SQL Encryption Features](use-sql-server-connector-with-sql-encryption-features.md).

## Related content

- [SQL Server Connector maintenance and troubleshooting](sql-server-connector-maintenance-troubleshooting.md)
