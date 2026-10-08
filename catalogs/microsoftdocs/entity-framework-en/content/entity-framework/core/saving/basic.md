---
title: Basic SaveChanges - EF Core
description: Basic information on adding, updating and removing data using SaveChanges with Entity Framework Core
author: SamMonoRT
ms.date: 4/30/2023
uid: core/saving/basic
---
# Basic SaveChanges

[Microsoft.EntityFrameworkCore.DbContext.SaveChanges](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.SaveChanges) is one of two techniques for saving changes to the database with EF. With this method, you perform one or more *tracked changes* (add, update, delete), and then apply those changes by calling the `SaveChanges` method. As an alternative, [Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdate*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdate*) and [Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteDelete*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteDelete*) can be used without involving the change tracker. For an introductory comparison of these two techniques, see the [Overview page](index.md) on saving data.

> **Tip:**
> You can view this article's [sample](https://github.com/dotnet/EntityFramework.Docs/tree/main/samples/core/Saving/Basics/) on GitHub.

## Adding Data

Use the [Microsoft.EntityFrameworkCore.DbSet`1.Add*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%601.Add*) method to add new instances of your entity classes. The data will be inserted into the database when you call [Microsoft.EntityFrameworkCore.DbContext.SaveChanges](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.SaveChanges):

[Main (complete source file; reference: ../../../samples/core/Saving/Basics/Sample.cs#Add)](../../../_code/samples/core/Saving/Basics/Sample.cs.md)

> **Tip:**
> The `Add`, `Attach`, and `Update` methods all work on the full graph of entities passed to them, as described in the [Related Data](related-data.md) section. Alternately, the EntityEntry.State property can be used to set the state of just a single entity. For example, `context.Entry(blog).State = EntityState.Modified`.

## Updating Data

EF automatically detects changes made to an existing entity that is tracked by the context. This includes entities that you load/query from the database, and entities that were previously added and saved to the database.

Simply modify the values assigned to properties and then call `SaveChanges`:

[Main (complete source file; reference: ../../../samples/core/Saving/Basics/Sample.cs#Update)](../../../_code/samples/core/Saving/Basics/Sample.cs.md)

## Deleting Data

Use the [Microsoft.EntityFrameworkCore.DbSet`1.Remove*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%601.Remove*) method to delete instances of your entity classes:

[Main (complete source file; reference: ../../../samples/core/Saving/Basics/Sample.cs#Remove)](../../../_code/samples/core/Saving/Basics/Sample.cs.md)

If the entity already exists in the database, it will be deleted during `SaveChanges`. If the entity has not yet been saved to the database (that is, it is tracked as added) then it will be removed from the context and will no longer be inserted when `SaveChanges` is called.

## Multiple operations in a single SaveChanges

You can combine multiple Add/Update/Remove operations into a single call to `SaveChanges`:

[Main (complete source file; reference: ../../../samples/core/Saving/Basics/Sample.cs#MultipleOperations)](../../../_code/samples/core/Saving/Basics/Sample.cs.md)

> **Note:**
> For most database providers, `SaveChanges` is transactional. This means all the operations either succeed or fail and the operations are never be left partially applied.
