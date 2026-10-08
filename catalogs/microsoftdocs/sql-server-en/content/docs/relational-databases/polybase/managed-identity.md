---
title: Configure PolyBase Support for Managed Identity
description: Learn to configure PolyBase to query Azure resources by using managed identity.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 02/03/2026
ms.service: sql
ms.topic: concept-article
ms.custom:
  - ignite-2025
---

# Connect to Azure Storage with managed identity from PolyBase


**Applies to:**
 
 and later versions


Starting with  SQL Server 2025 (17.x) 
, you can use [managed identity](../../sql-server/azure-arc/managed-identity.md) to access the following Azure resources:

- Azure Blob Storage
- Azure Data Lake

## Prerequisites

-  SQL Server 2025 (17.x) 


- [SQL Server enabled by Azure Arc](../../sql-server/azure-arc/managed-identity.md) **or** [Enable Microsoft Entra authentication for SQL Server on Azure VMs](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/configure-azure-ad-authentication-for-sql-vm)

- Enable the `allow server scoped db credentials` server configuration option.

- Give the managed identity access to the Azure Blob Storage resource.

## For SQL Server on Azure VMs

After you complete the [required steps](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/configure-azure-ad-authentication-for-sql-vm), add two new registry entries. You need these registry entries only for SQL Server on Azure Virtual Machines. For SQL Server instances enabled by Azure Arc, these entries are created automatically.

In the registry, update the `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.MSSQLSERVER\MSSQLServer\FederatedAuthentication` subkey.

> **Caution:**  
>  Incorrectly editing the registry can severely damage your system. Before making changes to the registry, we recommend that you back up any valued data on the computer. 


Create the following entries:

| Entry | Value |
| --- | --- |
| `AADAzureStorageEndPoint` | `storage.azure.com` |
| `AADDataLakeEndPoint` | `datalake.azure.net` |

## Create database scoped credentials

Add a database scoped credential for managed identity.

1. Allow server scoped database credentials. Run the following Transact-SQL query:

   ```sql
   EXECUTE sp_configure 'allow server scoped db credentials', 1;
   GO
   RECONFIGURE;
   ```

1. Create a database scoped credential. This example uses the name `managed_id`:

   ```sql
   CREATE DATABASE SCOPED CREDENTIAL [managed_id]
   WITH IDENTITY = 'Managed Identity';
   ```

## Create external data source

Create the external data source with the following settings.

### [Azure Storage account (V2)](#tab/asav2)

- **Connector location prefix**
  - `abs`

- **Location path**
  - `abs://<container_name>@<storage_account_name>.blob.core.windows.net/`, or
  - `abs://<storage_account_name>.blob.core.windows.net/<container_name>`

- **Supported locations by product or service**
  -  SQL Server 2025 (17.x) 
 enabled by Azure Arc
  -  SQL Server 2022 (16.x) 
: Hierarchical namespace supported

- **Authentication**
  - Shared access signature (SAS), or
  - Managed identity

### [Azure Data Lake Storage](#tab/adls)

- **Connector location prefix**
  - `adls`

- **Location path**
  - `adls://<container_name>@<storage_account_name>.dfs.core.windows.net/`, or
  - `adls://<storage_account_name>.dfs.core.windows.net/<container_name>`

- **Supported locations by product or service**

  -  SQL Server 2025 (17.x) 
 enabled by Azure Arc
  -  SQL Server 2025 (17.x) 
 on Azure VMs
  -  SQL Server 2022 (16.x) 


- **Authentication**
  - Shared access signature (SAS), or
  - Managed identity

---

## Query a Parquet file in Azure Blob Storage

 SQL Server 2025 (17.x) 
 supports managed identity through Azure Arc. For instructions, see [Managed identity for SQL Server enabled by Azure Arc](../../sql-server/azure-arc/managed-identity.md).

The following example queries a Parquet file in Azure Blob Storage:

```sql
EXECUTE sp_configure 'allow server scoped db credentials', 1;
RECONFIGURE;
GO

CREATE DATABASE SCOPED CREDENTIAL [managed_id]
WITH IDENTITY = 'Managed Identity';

CREATE EXTERNAL DATA SOURCE [my_external_data_source]
WITH (
    LOCATION = 'abs://<container>@<storage_account_name>.blob.core.windows.net/',
    CREDENTIAL = managed_id
);
```

## Errors and solutions

### External table isn't accessible (Error 16562)

You might encounter error 16562 when trying to access Azure Blob Storage or Azure Data Lake if you're missing prerequisites:

```output
Msg 16562, Level 16, State 1, Line 79
External table <name> is not accessible because location does not exist or it is used by another process.
```

Check the following items:

- The SQL Server instance is properly configured for Azure Arc. For more information, see [Managed identity for SQL Server enabled by Azure Arc](../../sql-server/azure-arc/managed-identity.md).

- The required registry entries exist.

- The `allow server scoped db credentials` server configuration option is enabled.

### File can't be opened (Error 13822)

You might encounter error 13822 when you access Azure Blob Storage or Azure Data Lake, if the managed identity lacks permissions on the storage account, or network access to storage is blocked:

```output
Msg 13822, Level 16, State 1, Line 9
File <file> cannot be opened because it does not exist or it is used by another process.
```

Check the following items:

- Does the managed identity have permissions to the storage container?
- Can the managed identity access the storage container outside SQL Server?
- Is the file locked exclusively?

## Related content

- [Managed identity for SQL Server enabled by Azure Arc](../../sql-server/azure-arc/managed-identity.md)
- [Enable Microsoft Entra authentication for SQL Server on Azure VMs](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/configure-azure-ad-authentication-for-sql-vm)
- [Configure managed identities on Azure virtual machines (VMs)](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities)
