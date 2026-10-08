---
title: "Server Configuration: external scripts enabled"
description: Learn about the external scripts enabled option in SQL Server. After turning it on, you can execute external scripts in supported languages such as R or Python.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 08/26/2025
ms.service: sql
ms.subservice: machine-learning-services
ms.topic: how-to
f1_keywords:
  - "external scripts enabled"
  - "external_scripts_enabled_TSQL"
helpviewer_keywords:
  - "external scripts enabled option"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-ver15 || =azuresqldb-mi-current"
---
# Server configuration: external scripts enabled


**Applies to:**
 

 and later versions 


 

Use the `external scripts enabled` option to enable the execution of scripts with certain remote language extensions. This property is `OFF` by default. When **Machine Learning Services** is installed, setup can optionally set this property to true.

## Remarks

You must enable the external script enabled option before you can execute an external script using the [sp_execute_external_script](../../relational-databases/system-stored-procedures/sp-execute-external-script-transact-sql.md) procedure. Use `sp_execute_external_script` to execute scripts written in a supported language such as R or Python.

- For  SQL Server 2016 (13.x) 


   R Services (In-Database) 
 includes support for the R language in  SQL Server 2016 (13.x) 
, and a set of R workstation tools and connectivity libraries.

  Install the **R Services** feature during  SQL Server 
 setup to enable the execution of R scripts.

- For  SQL Server 2017 (14.x) 
 and later

  Machine Learning Services 
 has support for both the R and Python languages.

  Install the **Machine Learning Services** feature during  SQL Server 
 setup to enable the execution of external scripts. Be sure to select at least one language during initial setup: either R or Python, or both.

- For  SQL Server 2019 (15.x) 
 and later Machine Learning Services 
 has support for all R, Python, Java and other third party languages.

Install the Machine Learning Services and Language Extensions feature during  SQL Server 
 setup to enable the execution of external scripts for any supported language.

## Additional requirements

After setup, to enable external scripts, execute the following script:

```sql
EXECUTE sp_configure 'external scripts enabled', 1;
RECONFIGURE WITH OVERRIDE;
```

For more information, see [Install SQL Server Machine Learning Services (Python and R) on Windows](../../machine-learning/install/sql-machine-learning-services-windows-install.md) or [Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup-machine-learning-docker.md?toc=/sql/machine-learning/toc.json).

## Related content

- [sys.sp_configure (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-configure-transact-sql.md)
- [RECONFIGURE (Transact-SQL)](../../t-sql/language-elements/reconfigure-transact-sql.md)
- [sp_execute_external_script (Transact-SQL)](../../relational-databases/system-stored-procedures/sp-execute-external-script-transact-sql.md)
- [SQL machine learning documentation](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/machine-learning/index.yml)
