---
title: "Example demonstrating use of Azure Key Vault provider with Always Encrypted enabled with secure enclaves"
description: "Example demonstrating use of Azure Key Vault provider with Always Encrypted enabled with secure enclaves"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, paulmedynski, cmalhotra
ms.date: 02/15/2023
ms.service: sql
ms.subservice: connectivity
ms.topic: tutorial
---

# Example demonstrating use of Azure Key Vault provider with Always Encrypted enabled with secure enclaves


**Applies to:**
 



 and later versions on Windows 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)




This example shows you how you can use the Azure Key Vault provider with Always Encrypted with secure enclaves. The script will create a column master key in the database based on the Azure Key Vault URL.
Secondly, a column encryption key is created. Once the keys are created, a table with encrypted columns will be created, a few records will be inserted and read again from the table.

## AzureKeyVaultProvider v2.0+

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/AzureKeyVaultProviderWithEnclaveProviderExample_2_0.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/sql/azure-key-vault-enclave-example.md)

## AzureKeyVaultProvider v1.x

[Code reference unavailable in this source snapshot: ~/../sqlclient/doc/samples/AzureKeyVaultProviderWithEnclaveProviderExample.cs#1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/connect/ado-net/sql/azure-key-vault-enclave-example.md)

> **Note:**
>
> - To use Always Encrypted with secure enclaves for .NET Standard application, **Microsoft.Data.SqlClient** version 2.1.0 or higher is required. The supported .NET Standard version is 2.1 or higher.
>
> - To use Always Encrypted with secure enclaves on Linux and macOS, **Microsoft.Data.SqlClient** version 2.1.0 or higher is required.
>
> - To use Always Encrypted with VBS enclaves without attestation, **Microsoft.Data.SqlClient** version 4.1.0 or higher is required.

## Related content

- [Example demonstrating use of Azure Key Vault provider with Always Encrypted](azure-key-vault-example.md)
- [Tutorial: Develop a .NET application using Always Encrypted with secure enclaves](tutorial-always-encrypted-enclaves-develop-net-apps.md)
- [Using Always Encrypted with the Microsoft .NET Data Provider for SQL Server](sqlclient-support-always-encrypted.md)
