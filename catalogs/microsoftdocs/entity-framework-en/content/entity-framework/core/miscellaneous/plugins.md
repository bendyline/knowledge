---
title: Plug-in APIs - EF Core
description: APIs extensions can use to plug into certain Entity Framework Core components
author: SamMonoRT
ms.date: 8/31/2023
uid: core/miscellaneous/plugins
---
# Plug-in APIs

EF Core extensions often require adding logic to core EF and provider components. This usually requires creating a derived component and replacing the original one in the internal service provider. This gets complicated when multiple extensions want to change the same component. In these cases, we provide plug-in APIs to allow multiple extensions to provide additional logic.

## List of services

The following is a list of plug-in APIs.

| Service | Description |
| --- | --- |
| [Microsoft.EntityFrameworkCore.Storage.ITypeMappingSourcePlugin](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Storage.ITypeMappingSourcePlugin) | Adds mappings between .NET types and primitive store types. |
| [Microsoft.EntityFrameworkCore.Storage.IRelationalTypeMappingSourcePlugin](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Storage.IRelationalTypeMappingSourcePlugin) | Adds mappings between .NET types and primitive relational database types. |
| [Microsoft.EntityFrameworkCore.Metadata.Conventions.Infrastructure.IConventionSetPlugin](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Metadata.Conventions.Infrastructure.IConventionSetPlugin) | Adds model building conventions. |
| [Microsoft.EntityFrameworkCore.Query.IMemberTranslatorPlugin](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Query.IMemberTranslatorPlugin) | Adds SQL translations for .NET properties. |
| [Microsoft.EntityFrameworkCore.Query.IMethodCallTranslatorPlugin](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Query.IMethodCallTranslatorPlugin) | Adds SQL translations for .NET methods. |
| [Microsoft.EntityFrameworkCore.Query.IAggregateMethodCallTranslatorPlugin](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Query.IAggregateMethodCallTranslatorPlugin) | Adds SQL translations for .NET enumerable methods. |
| [Microsoft.EntityFrameworkCore.Query.IEvaluatableExpressionFilterPlugin](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Query.IEvaluatableExpressionFilterPlugin) | Forces server-eval of certain expressions. |
| [Microsoft.EntityFrameworkCore.Scaffolding.IProviderCodeGeneratorPlugin](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Scaffolding.IProviderCodeGeneratorPlugin) | Scaffolds provider and DbContext options. |

## Examples

Here are some extensions making use of these APIs:

| Extension | Description |
| --- | --- |
| [Microsoft.EntityFrameworkCore.Sqlite.NetTopologySuite](https://github.com/dotnet/efcore/tree/main/src/EFCore.Sqlite.NTS) | Adds type mappings and SQL translations for SpatiaLite's types. |
| [Microsoft.EntityFrameworkCore.SqlServer.HierarchyId](https://github.com/dotnet/efcore/tree/main/src/EFCore.SqlServer.HierarchyId) | Adds type mappings and SQL translations for SQL Server's hierarchyid type. |
| [Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite](https://github.com/dotnet/efcore/tree/main/src/EFCore.SqlServer.NTS) | Adds type mappings and SQL translations for SQL Server's geography and geometry types. |
| [EFCore.CheckConstraints](https://github.com/efcore/EFCore.CheckConstraints) | Adds model building conventions for relational database check constraints. |
| [EFCore.NamingConventions](https://github.com/efcore/EFCore.NamingConventions) | Adds model building conventions for alternative relational database table, column, and constraint names. |
