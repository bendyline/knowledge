---
title: Miscellaneous - Microsoft SQL Server Database Provider - EF Core
description: Miscellaneous for the Microsoft SQL Server database provider
author: SamMonoRT
ms.date: 09/20/2022
uid: core/providers/sql-server/misc
---
# Miscellaneous notes for SQL Server

## Azure SQL database options

> **Note:**
> You should [use `UseAzureSql` method](https://learn.microsoft.com/search/?terms=core%2Fproviders%2Fsql-server%2Findex%23usage) instead of `UseSqlServer` when connecting to Azure SQL.

Azure SQL Database provides [a variety of pricing options](https://azure.microsoft.com/pricing/details/sql-database/single/) that are usually configured through the Azure Portal. However, if you are managing the schema using [EF Core migrations](../../managing-schemas/migrations/index.md), you can configure the desired options with EF, and they will get applied when EF creates the database.

You can specify the service tier of the database (EDITION) using [HasServiceTier](https://learn.microsoft.com/dotnet/api/Microsoft.EntityFrameworkCore.SqlServerModelBuilderExtensions.HasServiceTier):

[HasServiceTier (complete source file; reference: ../../../../samples/core/SqlServer/AzureDatabase/AzureSqlContext.cs?name=HasServiceTier)](../../../../_code/samples/core/SqlServer/AzureDatabase/AzureSqlContext.cs.md)

You can specify the maximum size of the database using [HasDatabaseMaxSize](https://learn.microsoft.com/dotnet/api/Microsoft.EntityFrameworkCore.SqlServerModelBuilderExtensions.HasDatabaseMaxSize):

[HasDatabaseMaxSize (complete source file; reference: ../../../../samples/core/SqlServer/AzureDatabase/AzureSqlContext.cs?name=HasDatabaseMaxSize)](../../../../_code/samples/core/SqlServer/AzureDatabase/AzureSqlContext.cs.md)

You can specify the performance level of the database (SERVICE_OBJECTIVE) using [HasPerformanceLevel](https://learn.microsoft.com/dotnet/api/Microsoft.EntityFrameworkCore.SqlServerModelBuilderExtensions.HasPerformanceLevel):

[HasPerformanceLevel (complete source file; reference: ../../../../samples/core/SqlServer/AzureDatabase/AzureSqlContext.cs?name=HasPerformanceLevel)](../../../../_code/samples/core/SqlServer/AzureDatabase/AzureSqlContext.cs.md)

Use [HasPerformanceLevelSql](https://learn.microsoft.com/dotnet/api/Microsoft.EntityFrameworkCore.SqlServerModelBuilderExtensions.HasPerformanceLevelSql) to configure the elastic pool, since the value is not a string literal:

[HasPerformanceLevel (complete source file; reference: ../../../../samples/core/SqlServer/AzureDatabase/AzureSqlContext.cs?name=HasPerformanceLevelSql)](../../../../_code/samples/core/SqlServer/AzureDatabase/AzureSqlContext.cs.md)

> **Tip:**
> You can find all the supported values in the [ALTER DATABASE documentation](https://learn.microsoft.com/sql/t-sql/statements/alter-database-transact-sql?view=azuresqldb-current\&preserve-view=true).

## SaveChanges, triggers and the OUTPUT clause

When EF Core saves changes to the database, it does so with an optimized technique using the T-SQL [OUTPUT clause](https://learn.microsoft.com/sql/t-sql/queries/output-clause-transact-sql#remarks). Unfortunately, the OUTPUT clause has some limitations; it notably cannot be used with tables that have triggers, for example.

If you run into a limitation related to the use of the OUTPUT clause, you can disable it on a specific table via [Microsoft.EntityFrameworkCore.SqlServerEntityTypeExtensions.UseSqlOutputClause*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.SqlServerEntityTypeExtensions.UseSqlOutputClause*):

```c#
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .ToTable(tb => tb.UseSqlOutputClause(false));
}
```

Doing this will make EF switch to an older, less efficient technique for updating the table.

If most or all of your tables have triggers, you can configure this for all your model's tables by using the following [model building convention](https://learn.microsoft.com/search/?terms=core%2Fmodeling%2Fbulk-configuration%23conventions):

```c#
public class NoOutputClauseConvention : IModelFinalizingConvention
{
    public virtual void ProcessModelFinalizing(
        IConventionModelBuilder modelBuilder,
        IConventionContext<IConventionModelBuilder> context)
    {
        foreach (var entityType in modelBuilder.Metadata.GetEntityTypes())
        {
            var table = StoreObjectIdentifier.Create(entityType, StoreObjectType.Table);
            if (table is not null)
            {
                entityType.Builder.UseSqlOutputClause(false);
            }

            foreach (var fragment in entityType.GetMappingFragments(StoreObjectType.Table))
            {
                entityType.Builder.UseSqlOutputClause(false, fragment.StoreObject);
            }
        }
    }
}
```

This effectively calls [Microsoft.EntityFrameworkCore.SqlServerEntityTypeExtensions.UseSqlOutputClause*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.SqlServerEntityTypeExtensions.UseSqlOutputClause*) on all your model's tables, instead of you having to do it manually for each and every table.
