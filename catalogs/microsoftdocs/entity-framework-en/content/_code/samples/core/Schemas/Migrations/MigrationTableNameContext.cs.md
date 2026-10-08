# Source code: samples/core/Schemas/Migrations/MigrationTableNameContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace Migrations;

public class MigrationTableNameContext : DbContext
{
    private readonly string _connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Sample;ConnectRetryCount=0";

    #region TableNameContext
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlServer(
            _connectionString,
            x => x.MigrationsHistoryTable("__MyMigrationsHistory", "mySchema"));
    #endregion
}

```
