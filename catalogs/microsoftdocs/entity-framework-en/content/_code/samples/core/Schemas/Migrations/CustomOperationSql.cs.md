# Source code: samples/core/Schemas/Migrations/CustomOperationSql.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.EntityFrameworkCore.Migrations.Operations.Builders;

internal static class SqlMigrationBuilderExtensions
{
    #region snippet_CustomOperationSql
    public static OperationBuilder<SqlOperation> CreateUser(
        this MigrationBuilder migrationBuilder,
        string name,
        string password)
        => migrationBuilder.Sql($"CREATE USER {name} WITH PASSWORD '{password}';");
    #endregion
}

```
