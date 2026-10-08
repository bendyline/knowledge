---
title: Custom Migrations Operations - EF Core
description: Managing custom and raw SQL migrations for database schema management with Entity Framework Core
author: SamMonoRT
ms.date: 08/05/2026
uid: core/managing-schemas/migrations/operations
---
# Custom Migrations Operations

The MigrationBuilder API allows you to perform many different kinds of operations during a migration, but it's far from exhaustive. However, the API is also extensible allowing you to define your own operations. There are two ways to extend the API: Using the `Sql()` method, or by defining custom `MigrationOperation` objects.

## Built-in data operations

Before defining a custom operation, consider the built-in `InsertData`, `UpdateData`, and `DeleteData` operations. They generate provider-specific SQL for fixed values and rows identified by explicit keys. Use `MigrationBuilder.Sql()` for transformations that calculate values from existing database rows.

See [Data operations](https://learn.microsoft.com/search/?terms=core%2Fmanaging-schemas%2Fmigrations%2Fmanaging%23data-operations) for complete, reversible samples of inserting, updating, deleting, and transforming data in migrations.

To illustrate, let's look at implementing an operation that creates a database user using each approach. In our migrations, we want to enable writing the following code:

```csharp
migrationBuilder.CreateUser("SQLUser1", "Password");
```

## Using MigrationBuilder.Sql()

The easiest way to implement a custom operation is to define an extension method that calls `MigrationBuilder.Sql()`. Here is an example that generates the appropriate Transact-SQL.

[Code example (complete source file; reference: ../../../../samples/core/Schemas/Migrations/CustomOperationSql.cs#snippet_CustomOperationSql)](../../../../_code/samples/core/Schemas/Migrations/CustomOperationSql.cs.md)

> **Tip:**
> On SQL Server, use the `EXEC` function when a statement must be the first or only one in a SQL batch. It might also be needed to work around parser errors in idempotent migration scripts that can occur when referenced columns don't currently exist on a table.

If your migrations need to support multiple database providers, you can use the `MigrationBuilder.ActiveProvider` property. Here's an example supporting both Microsoft SQL Server and PostgreSQL.

[Code example (complete source file; reference: ../../../../samples/core/Schemas/Migrations/CustomOperationMultiSql.cs#snippet_CustomOperationMultiSql)](../../../../_code/samples/core/Schemas/Migrations/CustomOperationMultiSql.cs.md)

This approach only works if you know every provider where your custom operation will be applied.

## Using a MigrationOperation

To decouple the custom operation from the SQL, you can define your own `MigrationOperation` to represent it. The operation is then passed to the provider so it can determine the appropriate SQL to generate.

[Code example (complete source file; reference: ../../../../samples/core/Schemas/Migrations/CustomOperation.cs#snippet_CreateUserOperation)](../../../../_code/samples/core/Schemas/Migrations/CustomOperation.cs.md)

With this approach, the extension method just needs to add one of these operations to `MigrationBuilder.Operations`.

[Code example (complete source file; reference: ../../../../samples/core/Schemas/Migrations/CustomOperation.cs#snippet_MigrationBuilderExtension)](../../../../_code/samples/core/Schemas/Migrations/CustomOperation.cs.md)

This approach requires each provider to know how to generate SQL for this operation in their `IMigrationsSqlGenerator` service. Here is an example overriding the SQL Server's generator to handle the new operation.

[Code example (complete source file; reference: ../../../../samples/core/Schemas/Migrations/CustomOperation.cs#snippet_MigrationsSqlGenerator)](../../../../_code/samples/core/Schemas/Migrations/CustomOperation.cs.md)

Replace the default migrations sql generator service with the updated one.

[Code example (complete source file; reference: ../../../../samples/core/Schemas/Migrations/CustomOperation.cs#snippet_OnConfiguring)](../../../../_code/samples/core/Schemas/Migrations/CustomOperation.cs.md)
