---
title: "Create CLR Triggers"
description: Learn how to create a user-defined trigger object inside SQL Server that is programmed in a CLR assembly.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 12/27/2024
ms.service: sql
ms.topic: how-to
helpviewer_keywords:
  - "CRL triggers"
  - "DML triggers, CLR triggers"
  - "DDL triggers, CLR triggers"
---
# Create CLR triggers


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

You can create a database object inside  SQL Server 
 that is programmed in an assembly created in the  .NET Framework 
 common language runtime (CLR). Database objects that can use the rich programming model provided by the CLR include DML triggers, DDL triggers, stored procedures, functions, aggregate functions, and types.

Creating a CLR trigger (DML or DDL) in  SQL Server 
 involves the following steps:

- Define the trigger as a class in a .NET Framework-supported language. For more information about how to program triggers in the CLR, see [CLR Triggers](https://learn.microsoft.com/dotnet/framework/data/adonet/sql/clr-triggers). Then, compile the class to build an assembly in the  .NET Framework 
 using the appropriate language compiler.

- Register the assembly in  SQL Server 
 using the `CREATE ASSEMBLY` statement. For more information about assemblies in  SQL Server 
, see [Assemblies (Database Engine)](../clr-integration/assemblies-database-engine.md).

- Create the trigger that references the registered assembly.

> **Note:**  
> Deploying a SQL Server Project in  Visual Studio 
 registers an assembly in the database that was specified for the project. Deploying the project also creates CLR triggers in the database for all methods annotated with the `SqlTrigger` attribute. For more information, see [Deploy CLR database objects](../clr-integration/deploying-clr-database-objects.md).

Executing CLR code is off by default in  SQL Server 
. You can create, alter, and drop database objects that reference managed code modules, but these references don't execute in  SQL Server 
, unless the [clr enabled](../../database-engine/configure-windows/clr-enabled-server-configuration-option.md) server configuration option is enabled by using [sp_configure](../system-stored-procedures/sp-configure-transact-sql.md).

## Create, modify, or drop an assembly

- [CREATE ASSEMBLY](../../t-sql/statements/create-assembly-transact-sql.md)
- [ALTER ASSEMBLY](../../t-sql/statements/alter-assembly-transact-sql.md)
- [DROP ASSEMBLY](../../t-sql/statements/drop-assembly-transact-sql.md)

## Create a CLR trigger

- [CREATE TRIGGER](../../t-sql/statements/create-trigger-transact-sql.md)

## Related content

- [DML triggers](dml-triggers.md)
- [Common language runtime (CLR) integration programming concepts](../clr-integration/common-language-runtime-clr-integration-programming-concepts.md)
- [Data access from CLR database objects](../clr-integration/data-access/data-access-from-clr-database-objects.md)
