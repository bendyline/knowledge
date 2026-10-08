---
title: "sp_pdw_log_user_data_masking (Azure Synapse Analytics)"
description: sp_pdw_log_user_data_masking configures user data masking in Azure Synapse Analytics activity logs.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.topic: "reference"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest"
---
# sp_pdw_log_user_data_mask (Azure Synapse Analytics)


**Applies to:**
 


 


Use `sp_pdw_log_user_data_masking` to enable user data masking in  Azure Synapse Analytics  activity logs. User data masking affects the statements on all databases on the appliance.

> **Important:**  
> The  Azure Synapse Analytics  activity logs affected by `sp_pdw_log_user_data_masking` are certain  Azure Synapse Analytics  activity logs. `sp_pdw_log_user_data_masking` doesn't affect database transaction logs, or  SQL Server 
 error logs.

## Syntax

Syntax for Azure Synapse Analytics.

```syntaxsql
sp_pdw_log_user_data_masking [ [ @masking_mode = ] value ]
[ ; ]
```

> **Note:**
>  This syntax is not supported by serverless SQL pool in Azure Synapse Analytics. 


## Background

In the default configuration,  Azure Synapse Analytics  activity logs contain full  Transact-SQL  statements, and can in some cases include user data contained in operations such as `INSERT`, `UPDATE`, and `SELECT` statements. If there's a problem on the appliance, this permits the analysis of the conditions that caused the problem without a need to reproduce the issue. In order to prevent the user data from being written to  Azure Synapse Analytics  activity logs, customers can choose to turn on the user data masking by using this stored procedure. The statements are still written to  Azure Synapse Analytics  activity logs, but all the literals in statements that might contain user data are masked; replaced with some predefined constant values.

When transparent data encryption is enabled on the appliance, masking of the user data in  Azure Synapse Analytics  activity logs is automatically turned on.

## Arguments

#### [ @masking_mode = ] *masking_mode*

Determines whether transparent data encryption log user data masking is enabled. *masking_mode* is **int**, and can be one of the following values:

| Value | Description |
| --- | --- |
| `0` | Disabled, user data appears in the  Azure Synapse Analytics  activity logs. |
| `1` | Enabled, user data statements appear in the  Azure Synapse Analytics  activity logs but the user data is masked. |
| `2` | Statements containing user data aren't written to the  Azure Synapse Analytics  activity logs. |

Executing `sp_pdw_log_user_data_masking` without parameters returns the current state of transparent data encryption (TDE) log user data masking on the appliance as a scalar result set.

## Remarks

User data masking in  Azure Synapse Analytics  activity logs enables replacement of literals with predefined constant values in `SELECT` and Data Manipulation Language (DML) statements, as they can contain user data. Setting *masking_mode* to 1 doesn't mask metadata, such as column names or table names. Setting *masking_mode* to 2 removes statements with metadata, such as column names or table names.

User data masking in  Azure Synapse Analytics  activity logs is implemented in the following way:

- TDE and user data masking in  Azure Synapse Analytics  activity logs are turned off by default. The statements aren't automatically masked if database encryption isn't enabled on the appliance.

- Enabling TDE on the appliance automatically turns on the user data masking in  Azure Synapse Analytics  activity logs.

- Disabling TDE doesn't affect user data masking in  Azure Synapse Analytics  activity logs.

- You can explicitly enable user data masking in  Azure Synapse Analytics  activity logs by using the `sp_pdw_log_user_data_masking` procedure.

## Permissions

Requires membership in the **sysadmin** fixed database role, or `CONTROL SERVER` permission.

## Examples

The following example enables TDE log user data masking on the appliance.

```sql
EXECUTE sp_pdw_log_user_data_masking 1;
```

## Related content

- [sp_pdw_database_encryption (Azure Synapse Analytics)](sp-pdw-database-encryption-sql-data-warehouse.md)
- [sp_pdw_database_encryption_regenerate_system_keys (Azure Synapse Analytics)](sp-pdw-database-encryption-regenerate-system-keys-sql-data-warehouse.md)
