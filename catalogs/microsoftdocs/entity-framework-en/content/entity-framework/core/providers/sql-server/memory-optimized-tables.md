---
title: Microsoft SQL Server Database Provider - Memory-Optimized Tables - EF Core
description: How to use Memory-Optimized Tables with the SQL Server Entity Framework Core Database Provider
author: AndriySvyryd
ms.date: 11/05/2019
uid: core/providers/sql-server/memory-optimized-tables
---
# Memory-Optimized Tables support in SQL Server EF Core Database Provider

[Memory-Optimized Tables](https://learn.microsoft.com/sql/relational-databases/in-memory-oltp/memory-optimized-tables) are a feature of SQL Server where the entire table resides in memory. A second copy of the table data is maintained on disk, but only for durability purposes. Data in memory-optimized tables is only read from disk during database recovery. For example, after a server restart.

## Configuring a memory-optimized table

You can specify that the table an entity is mapped to is memory-optimized. When using EF Core to create and maintain a database based on your model (either with [migrations](../../managing-schemas/migrations/index.md) or [EnsureCreated](https://learn.microsoft.com/dotnet/api/Microsoft.EntityFrameworkCore.Storage.IDatabaseCreator.EnsureCreated)), a memory-optimized table will be created for these entities.

[IsMemoryOptimized (complete source file; reference: ../../../../samples/core/SqlServer/InMemory/InMemoryContext.cs?name=IsMemoryOptimized)](../../../../_code/samples/core/SqlServer/InMemory/InMemoryContext.cs.md)
