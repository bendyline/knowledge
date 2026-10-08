---
title: Part 7, add a new field
author: wadepickett
description: Part 7 of tutorial series on Razor Pages.
ms.author: wpickett
ms.date: 05/11/2026
uid: tutorials/razor-pages/new-field
---
# Part 7, add a new field to a Razor Page in ASP.NET Core

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


By [Rick Anderson](https://twitter.com/RickAndMSFT)

**Applies to: \>= aspnetcore-10.0**

In this section, [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core/get-started/aspnetcore/new-db) is used to define the database schema based on the app's model class:

* Add a new field to the model.
* Migrate the new field schema change to the database.

The EF Core approach allows for a more agile development process. You work on the app's data model directly while EF Core creates and synchronizes the database schema. You don't need to switch contexts to and from a database management tool. For an overview of Entity Framework Core and its benefits, see [Entity Framework Core](https://learn.microsoft.com/ef/core).

Using EF Core to automatically create and track a database:

* Adds an [`__EFMigrationsHistory`](https://learn.microsoft.com/ef/core/managing-schemas/migrations/history-table) table to the database to track whether the schema of the database is in sync with the model classes it was generated from.
* Throws an exception if the model classes aren't in sync with the database.

Automatic verification that the schema and model are in sync makes it easier to find inconsistent database code issues.

## Add a Rating property to the Movie model
<!-- Update code in working project (which becomes clean finished sample) to compile and verify steps, then copy to snapshot sample folder. -->

1. Open the `Models/Movie.cs` file and add a `Rating` property:
   [Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/MovieDateRating.cs?highlight=13\&name=snippet)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/MovieDateRating.cs.md)
1. Edit `Pages/Movies/Index.cshtml`, and add a `Rating` field:
   [Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/IndexRating.cshtml?highlight=40-42,62-64)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Pages/Movies/IndexRating.cshtml.md)

1. Update the following pages with a `Rating` field:
   * *[Pages/Movies/Create.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie10/Pages/Movies/Create.cshtml)*.
   * *[Pages/Movies/Delete.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie10/Pages/Movies/Delete.cshtml)*.
   * *[Pages/Movies/Details.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie10/Pages/Movies/Details.cshtml)*.
   * *[Pages/Movies/Edit.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie10/Pages/Movies/Edit.cshtml)*.

The app doesn't work until you update the database to include the new field. Running the app without an update to the database throws a `SqlException`:

`SqlException: Invalid column name 'Rating'.`

The `SqlException` exception occurs because the updated Movie model class doesn't match the schema of the Movie table in the database. The database table doesn't have a `Rating` column.

You can resolve the error by using one of the following approaches:

1. Have Entity Framework automatically drop and re-create the database using the new model class schema. This approach is convenient early in the development cycle because it allows developers to quickly evolve the model and database schema together. The downside is that existing data in the database is lost. Don't use this approach on a production database! Dropping the database on schema changes and using an initializer to automatically seed the database with test data is often a productive way to develop an app.
1. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is to keep the data. Make this change either manually or by creating a database change script.
1. Use EF Core Migrations to update the database schema.

For this tutorial, use EF Core Migrations.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown in the following code, but make this change for each `new Movie` block.

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/SeedDataRating.cs?name=snippet1\&highlight=8)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/SeedDataRating.cs.md)

See the [completed SeedData.cs file](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie10/Models/SeedData.cs).

Build the app

### [Visual Studio](#tab/visual-studio)

Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>.

### [Visual Studio Code](#tab/visual-studio-code)

From the *View* menu, select *Terminal* and enter the following command:

```dotnetcli
dotnet build
```

---

# [Visual Studio](#tab/visual-studio)

## Add a migration for the rating field

1. From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
1. In the Package Manager Console (PMC), enter the following command:

   ```powershell
   Add-Migration Rating
   ```

The `Add-Migration` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

1. In the PMC, enter the following command:

   ```powershell
   Update-Database
   ```

The `Update-Database` command tells the framework to apply the schema changes to the database and to preserve existing data.

To delete all the records in the database, the initializer seeds the database and includes the `Rating` field. You can delete records by using the delete links in the browser or from [Sql Server Object Explorer](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fsql%23ssox) (SSOX).

Another option is to delete the database and use migrations to re-create the database. To delete the database in SSOX:

1. Select the database in SSOX.
1. Right-click on the database, and select **Delete**.
1. Check **Close existing connections**.
1. Select **OK**.
1. In the [PMC](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fnew-field%23pmc), update the database:

   ```powershell
   Update-Database
   ```

# [Visual Studio Code](#tab/visual-studio-code)

## Add a migration for rating

Use the following commands to add a migration for the rating field:

```dotnetcli
dotnet ef migrations add rating
dotnet ef database update
```

The `dotnet ef migrations add rating` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name `rating` is arbitrary and is used to name the migration file. Use a meaningful name for the migration file.

The `dotnet ef database update` command applies the schema changes to the database and preserves existing data.

If you delete all the records in the database, the initializer seeds the database and includes the `Rating` field.

### Optional: Drop and re-create the database for other providers

Skip this section if you successfully migrated the database.

In this tutorial, use Entity Framework Core *migrations* features when possible. Migrations update the database schema to match changes in the data model. However, migrations can only make changes that the EF Core provider supports, and some providers have limited capabilities. For example, adding a column might be supported, but removing or changing a column might not be. If you create a migration to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, you can drop and re-create the database.

To work around these limitations, manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:

* Creating a new table.
* Copying data from the old table to the new table.
* Dropping the old table.
* Renaming the new table.

For more information, see the following resources:

* [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
* [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
* [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
* [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

1. Delete the migration folder.  

1. Use the following commands to recreate the database.

   ```dotnetcli
   dotnet ef database drop
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

---

Run the app and verify you can create, edit, and display movies with a `Rating` field. If the database isn't seeded, set a break point in the `SeedData.Initialize` method.

## Next steps

> 
> [Previous: Add Search](search.md)
> [Next: Add Validation](validation.md)



**Applies to: \= aspnetcore-9.0**

In this section [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core/get-started/aspnetcore/new-db) is used to define the database schema based on the app's model class:

* Add a new field to the model.
* Migrate the new field schema change to the database.

The EF Core approach allows for a more agile development process. The developer works on the app's data model directly while the database schema is created and then syncronized, all without the developer having to switch contexts to and from a database management tool. For an overview of Entity Framework Core and its benefits, see [Entity Framework Core](https://learn.microsoft.com/ef/core).

Using EF Code to automatically create and track a database:

* Adds an [`__EFMigrationsHistory`](https://learn.microsoft.com/ef/core/managing-schemas/migrations/history-table) table to the database to track whether the schema of the database is in sync with the model classes it was generated from.
* Throws an exception if the model classes aren't in sync with the database.

Automatic verification that the schema and model are in sync makes it easier to find inconsistent database code issues.

## Add a `Rating` property to the `Movie` model
<!-- Update code in working project (which becomes clean finished sample) to compile and verify steps, then copy to snapshot sample folder. -->

1. Open the `Models/Movie.cs` file and add a `Rating` property:
   [Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Models/MovieDateRating.cs?highlight=13\\&name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)
1. Edit `Pages/Movies/Index.cshtml`, and add a `Rating` field:
   <a name="addrat7"></a>
   [Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Pages/Movies/IndexRating.cshtml?highlight=40-42,62-64](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

1. Update the following pages with a `Rating` field:
   * *[Pages/Movies/Create.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie90/Pages/Movies/Create.cshtml)*.
   * *[Pages/Movies/Delete.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie90/Pages/Movies/Delete.cshtml)*.
   * *[Pages/Movies/Details.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie90/Pages/Movies/Details.cshtml)*.
   * *[Pages/Movies/Edit.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie90/Pages/Movies/Edit.cshtml)*.

The app won't work until the database is updated to include the new field. Running the app without an update to the database throws a `SqlException`:

`SqlException: Invalid column name 'Rating'.`

The `SqlException` exception is caused by the updated Movie model class being different than the schema of the Movie table of the database. There's no `Rating` column in the database table.

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database using the new model class schema. This approach is convenient early in the development cycle, it allows developers to quickly evolve the model and database schema together. The downside is that existing data in the database is lost. Don't use this approach on a production database! Dropping the database on schema changes and using an initializer to automatically seed the database with test data is often a productive way to develop an app.
2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is to keep the data. Make this change either manually or by creating a database change script.
3. Use EF Core Migrations to update the database schema.

For this tutorial, use EF Core Migrations.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown below, but make this change for each `new Movie` block.

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Models/SeedDataRating.cs?name=snippet1\\&highlight=8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

See the [completed SeedData.cs file](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie90/Models/SeedData.cs).

Build the app

### [Visual Studio](#tab/visual-studio)

Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>

### [Visual Studio Code](#tab/visual-studio-code)

From the *View* menu, select *Terminal* and enter the following command:

```dotnetcli
dotnet build
```
---

# [Visual Studio](#tab/visual-studio)

<a name="pmc"></a>

### Add a migration for the rating field

1. From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
2. In the Package Manager Console (PMC), enter the following command:

   ```powershell
   Add-Migration Rating
   ```

The `Add-Migration` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

2. In the PMC, enter the following command:

   ```powershell
   Update-Database
   ```

The `Update-Database` command tells the framework to apply the schema changes to the database and to preserve existing data.

<a name="ssox"></a>

Delete all the records in the database, the initializer will seed the database and include the `Rating` field. Deleting can be done with the delete links in the browser or from [Sql Server Object Explorer](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fsql%23ssox) (SSOX).

Another option is to delete the database and use migrations to re-create the database. To delete the database in SSOX:

1. Select the database in SSOX.
1. Right-click on the database, and select **Delete**.
1. Check **Close existing connections**.
1. Select **OK**.
1. In the [PMC](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fnew-field%23pmc), update the database:

   ```powershell
   Update-Database
   ```

# [Visual Studio Code](#tab/visual-studio-code)

### Add a migration for rating
Use the following commands to add a migration for the rating field:

```dotnetcli
dotnet ef migrations add rating
dotnet ef database update
```

The `dotnet ef migrations add rating` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name `rating` is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

The `dotnet ef database update` command tells the framework to apply the schema changes to the database and to preserve existing data.

Delete all the records in the database, the initializer will seed the database and include the `Rating` field. 

### Optional: Drop and re-create the database for other providers

Skip this section if you successfully migrated the database.

In this tutorial, Entity Framework Core *migrations* features are used when possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and some provider's capabilities are limited. For example, adding a column may be supported, but removing or changing a column is not. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, you can drop and re-create the database.

The workaround for the limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:

* Creating a new table.
* Copying data from the old table to the new table.
* Dropping the old table.
* Renaming the new table.

For more information, see the following resources:

* [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
* [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
* [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
* [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

1. Delete the migration folder.  

1. Use the following commands to recreate the database.

   ```dotnetcli
   dotnet ef database drop
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

---

Run the app and verify you can create, edit, and display movies with a `Rating` field. If the database isn't seeded, set a break point in the `SeedData.Initialize` method.

## Next steps

> 
> [Previous: Add Search](search.md)
> [Next: Add Validation](validation.md)





**Applies to: \= aspnetcore-8.0**

In this section [Entity Framework](https://learn.microsoft.com/ef/core/get-started/aspnetcore/new-db) Code First Migrations is used to:

* Add a new field to the model.
* Migrate the new field schema change to the database.

When using EF Code First to automatically create and track a database, Code First:

* Adds an [`__EFMigrationsHistory`](https://learn.microsoft.com/ef/core/managing-schemas/migrations/history-table) table to the database to track whether the schema of the database is in sync with the model classes it was generated from.
* Throws an exception if the model classes aren't in sync with the database.

Automatic verification that the schema and model are in sync makes it easier to find inconsistent database code issues.

## Add a `Rating` property to the `Movie` model
<!-- Update code in working project (which becomes clean finished sample) to compile and verify steps, then copy to snapshot sample folder. -->

1. Open the `Models/Movie.cs` file and add a `Rating` property:
   [Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/MovieDateRating.cs?highlight=13\\&name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)
1. Edit `Pages/Movies/Index.cshtml`, and add a `Rating` field:
   <a name="addrat7"></a>
   [Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample8/Pages/Movies/IndexRating.cshtml?highlight=40-42,62-64](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

1. Update the following pages with a `Rating` field:
   * *[Pages/Movies/Create.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Pages/Movies/Create.cshtml)*.
   * *[Pages/Movies/Delete.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Pages/Movies/Delete.cshtml)*.
   * *[Pages/Movies/Details.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Pages/Movies/Details.cshtml)*.
   * *[Pages/Movies/Edit.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Pages/Movies/Edit.cshtml)*.

The app won't work until the database is updated to include the new field. Running the app without an update to the database throws a `SqlException`:

`SqlException: Invalid column name 'Rating'.`

The `SqlException` exception is caused by the updated Movie model class being different than the schema of the Movie table of the database. There's no `Rating` column in the database table.

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database using the new model class schema. This approach is convenient early in the development cycle, it allows developers to quickly evolve the model and database schema together. The downside is that existing data in the database is lost. Don't use this approach on a production database! Dropping the database on schema changes and using an initializer to automatically seed the database with test data is often a productive way to develop an app.
2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is to keep the data. Make this change either manually or by creating a database change script.
3. Use Code First Migrations to update the database schema.

For this tutorial, use Code First Migrations.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown below, but make this change for each `new Movie` block.

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/SeedDataRating.cs?name=snippet1\\&highlight=8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

See the [completed SeedData.cs file](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/SeedDataRating.cs).

Build the app

### [Visual Studio](#tab/visual-studio)

Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>

### [Visual Studio Code](#tab/visual-studio-code)

From the *View* menu, select *Terminal* and enter the following command:

```dotnetcli
dotnet build
```

---

# [Visual Studio](#tab/visual-studio)

<a name="pmc"></a>

### Add a migration for the rating field

1. From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
2. In the PMC, enter the following commands:

   ```powershell
   Add-Migration Rating
   Update-Database
   ```

The `Add-Migration` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

The `Update-Database` command tells the framework to apply the schema changes to the database and to preserve existing data.

<a name="ssox"></a>

Delete all the records in the database, the initializer will seed the database and include the `Rating` field. Deleting can be done with the delete links in the browser or from [Sql Server Object Explorer](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fsql%23ssox) (SSOX).

Another option is to delete the database and use migrations to re-create the database. To delete the database in SSOX:

1. Select the database in SSOX.
1. Right-click on the database, and select **Delete**.
1. Check **Close existing connections**.
1. Select **OK**.
1. In the [PMC](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fnew-field%23pmc), update the database:

   ```powershell
   Update-Database
   ```

# [Visual Studio Code](#tab/visual-studio-code)

### Add a migration for rating
Use the following commands to add a migration for the rating field:

```dotnetcli
dotnet ef migrations add rating
dotnet ef database update
```

The `dotnet ef migrations add rating` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name `rating` is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

The `dotnet ef database update` command tells the framework to apply the schema changes to the database and to preserve existing data.

Delete all the records in the database, the initializer will seed the database and include the `Rating` field. 

### Optional: Drop and re-create the database for other providers

Skip this section if you successfully migrated the database.

In this tutorial, Entity Framework Core *migrations* features are used when possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and some provider's capabilities are limited. For example, adding a column may be supported, but removing or changing a column is not. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, you can drop and re-create the database.

The workaround for the limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:

* Creating a new table.
* Copying data from the old table to the new table.
* Dropping the old table.
* Renaming the new table.

For more information, see the following resources:

 * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
 * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
 * [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
 * [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

1. Delete the migration folder.  

1. Use the following commands to recreate the database.

   ```dotnetcli
   dotnet ef database drop
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

---

Run the app and verify you can create, edit, and display movies with a `Rating` field. If the database isn't seeded, set a break point in the `SeedData.Initialize` method.

## Next steps

> 
> [Previous: Add Search](search.md)
> [Next: Add Validation](validation.md)




**Applies to: \= aspnetcore-7.0**

In this section [Entity Framework](https://learn.microsoft.com/ef/core/get-started/aspnetcore/new-db) Code First Migrations is used to:

* Add a new field to the model.
* Migrate the new field schema change to the database.

When using EF Code First to automatically create and track a database, Code First:

* Adds an [`__EFMigrationsHistory`](https://learn.microsoft.com/ef/core/managing-schemas/migrations/history-table) table to the database to track whether the schema of the database is in sync with the model classes it was generated from.
* Throws an exception if the model classes aren't in sync with the database.

Automatic verification that the schema and model are in sync makes it easier to find inconsistent database code issues.

## Add a `Rating` property to the `Movie` model
<!-- Update code in working project (which becomes clean finished sample) to compile and verify steps, then copy to snapshot sample folder. -->

1. Open the `Models/Movie.cs` file and add a `Rating` property:
   [Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Models/MovieDateRating.cs?highlight=13\\&name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)
1. Edit `Pages/Movies/Index.cshtml`, and add a `Rating` field:
   <a name="addrat7"></a>
   [Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample7/Pages/Movies/IndexRating.cshtml?highlight=40-42,62-64](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

1. Update the following pages with a `Rating` field:
   * *[Pages/Movies/Create.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Pages/Movies/Create.cshtml)*.
   * *[Pages/Movies/Delete.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Pages/Movies/Delete.cshtml)*.
   * *[Pages/Movies/Details.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Pages/Movies/Details.cshtml)*.
   * *[Pages/Movies/Edit.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Pages/Movies/Edit.cshtml)*.

The app won't work until the database is updated to include the new field. Running the app without an update to the database throws a `SqlException`:

`SqlException: Invalid column name 'Rating'.`

The `SqlException` exception is caused by the updated Movie model class being different than the schema of the Movie table of the database. There's no `Rating` column in the database table.

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database using the new model class schema. This approach is convenient early in the development cycle, it allows developers to quickly evolve the model and database schema together. The downside is that existing data in the database is lost. Don't use this approach on a production database! Dropping the database on schema changes and using an initializer to automatically seed the database with test data is often a productive way to develop an app.
2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is to keep the data. Make this change either manually or by creating a database change script.
3. Use Code First Migrations to update the database schema.

For this tutorial, use Code First Migrations.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown below, but make this change for each `new Movie` block.

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/SeedDataRating.cs?name=snippet1\\&highlight=8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

See the [completed SeedData.cs file](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Models/SeedDataRating.cs).

Build the app

### [Visual Studio](#tab/visual-studio)

Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>

### [Visual Studio Code](#tab/visual-studio-code)

From the *View* menu, select *Terminal* and enter the following command:

```dotnetcli
dotnet build
```

### [Visual Studio for Mac](#tab/visual-studio-mac)

Press <kbd>⌘</kbd>+<kbd>B</kbd>

---

# [Visual Studio](#tab/visual-studio)

<a name="pmc"></a>

### Add a migration for the rating field

1. From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
2. In the PMC, enter the following commands:

   ```powershell
   Add-Migration Rating
   Update-Database
   ```

The `Add-Migration` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

The `Update-Database` command tells the framework to apply the schema changes to the database and to preserve existing data.

<a name="ssox"></a>

Delete all the records in the database, the initializer will seed the database and include the `Rating` field. Deleting can be done with the delete links in the browser or from [Sql Server Object Explorer](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fsql%23ssox) (SSOX).

Another option is to delete the database and use migrations to re-create the database. To delete the database in SSOX:

1. Select the database in SSOX.
1. Right-click on the database, and select **Delete**.
1. Check **Close existing connections**.
1. Select **OK**.
1. In the [PMC](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fnew-field%23pmc), update the database:

   ```powershell
   Update-Database
   ```

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

### Add a migration for rating
Use the following commands to add a migration for the rating field:

```dotnetcli
dotnet ef migrations add rating
dotnet ef database update
```

The `dotnet ef migrations add rating` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name `rating` is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

The `dotnet ef database update` command tells the framework to apply the schema changes to the database and to preserve existing data.

Delete all the records in the database, the initializer will seed the database and include the `Rating` field. 

### Optional: Drop and re-create the database for other providers

Skip this section if you successfully migrated the database.

In this tutorial, Entity Framework Core *migrations* features are used when possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and some provider's capabilities are limited. For example, adding a column may be supported, but removing or changing a column is not. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, you can drop and re-create the database.

The workaround for the limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:

* Creating a new table.
* Copying data from the old table to the new table.
* Dropping the old table.
* Renaming the new table.

For more information, see the following resources:

 * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
 * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
 * [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
 * [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

1. Delete the migration folder.  

1. Use the following commands to recreate the database.

   ```dotnetcli
   dotnet ef database drop
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

---

Run the app and verify you can create, edit, and display movies with a `Rating` field. If the database isn't seeded, set a break point in the `SeedData.Initialize` method.

## Next steps

> 
> [Previous: Add Search](search.md)
> [Next: Add Validation](validation.md)




**Applies to: \= aspnetcore-6.0**

In this section [Entity Framework](https://learn.microsoft.com/ef/core/get-started/aspnetcore/new-db) Code First Migrations is used to:

* Add a new field to the model.
* Migrate the new field schema change to the database.

When using EF Code First to automatically create and track a database, Code First:

* Adds an [`__EFMigrationsHistory`](https://learn.microsoft.com/ef/core/managing-schemas/migrations/history-table) table to the database to track whether the schema of the database is in sync with the model classes it was generated from.
* Throws an exception if the model classes aren't in sync with the database.

Automatic verification that the schema and model are in sync makes it easier to find inconsistent database code issues.

## Add a `Rating` property to the `Movie` model

1. Open the `Models/Movie.cs` file and add a `Rating` property:
   [Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/MovieDateRating.cs?highlight=13\\&name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)
1. Edit `Pages/Movies/Index.cshtml`, and add a `Rating` field:
   <a name="addrat6"></a>
   [Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample6/Pages/Movies/IndexRating.cshtml?highlight=40-42,62-64](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

1. Update the following pages with a `Rating` field:
   * *[Pages/Movies/Create.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Pages/Movies/Create.cshtml)*.
   * *[Pages/Movies/Delete.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Pages/Movies/Delete.cshtml)*.
   * *[Pages/Movies/Details.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Pages/Movies/Details.cshtml)*.
   * *[Pages/Movies/Edit.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Pages/Movies/Edit.cshtml)*.

The app won't work until the database is updated to include the new field. Running the app without an update to the database throws a `SqlException`:

`SqlException: Invalid column name 'Rating'.`

The `SqlException` exception is caused by the updated Movie model class being different than the schema of the Movie table of the database. There's no `Rating` column in the database table.

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database using the new model class schema. This approach is convenient early in the development cycle, it allows developers to quickly evolve the model and database schema together. The downside is that existing data in the database is lost. Don't use this approach on a production database! Dropping the database on schema changes and using an initializer to automatically seed the database with test data is often a productive way to develop an app.
2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is to keep the data. Make this change either manually or by creating a database change script.
3. Use Code First Migrations to update the database schema.

For this tutorial, use Code First Migrations.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown below, but make this change for each `new Movie` block.

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/SeedDataRating.cs?name=snippet1\\&highlight=8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

See the [completed SeedData.cs file](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/SeedDataRating.cs).

Build the solution.

# [Visual Studio](#tab/visual-studio)

<a name="pmc"></a>

### Add a migration for the rating field

1. From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
2. In the PMC, enter the following commands:

   ```powershell
   Add-Migration Rating
   Update-Database
   ```

The `Add-Migration` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

The `Update-Database` command tells the framework to apply the schema changes to the database and to preserve existing data.

<a name="ssox"></a>

Delete all the records in the database, the initializer will seed the database and include the `Rating` field. Deleting can be done with the delete links in the browser or from [Sql Server Object Explorer](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fsql%23ssox) (SSOX).

Another option is to delete the database and use migrations to re-create the database. To delete the database in SSOX:

1. Select the database in SSOX.
1. Right-click on the database, and select **Delete**.
1. Check **Close existing connections**.
1. Select **OK**.
1. In the [PMC](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fnew-field%23pmc), update the database:

   ```powershell
   Update-Database
   ```

# [Visual Studio Code](#tab/visual-studio-code)

### Add a migration for rating
Use the following commands to add a migration for the rating field:

```dotnetcli
dotnet ef migrations add rating
dotnet ef database update
```

The `dotnet ef migrations add rating` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name `rating` is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

The `dotnet ef database update` command tells the framework to apply the schema changes to the database and to preserve existing data.

Delete all the records in the database, the initializer will seed the database and include the `Rating` field. 

### Optional: Drop and re-create the database for other providers

Skip this section if you successfully migrated the database.

In this tutorial, Entity Framework Core *migrations* features are used when possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and some provider's capabilities are limited. For example, adding a column may be supported, but removing or changing a column is not. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, you can drop and re-create the database.

The workaround for the limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:

* Creating a new table.
* Copying data from the old table to the new table.
* Dropping the old table.
* Renaming the new table.

For more information, see the following resources:

 * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
 * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
 * [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
 * [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

1. Delete the migration folder.  

1. Use the following commands to recreate the database.

   ```dotnetcli
   dotnet ef database drop
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

---

Run the app and verify you can create, edit, and display movies with a `Rating` field. If the database isn't seeded, set a break point in the `SeedData.Initialize` method.

## Next steps

> 
> [Previous: Add Search](search.md)
> [Next: Add Validation](validation.md)




**Applies to: \= aspnetcore-5.0**

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

In this section [Entity Framework](https://learn.microsoft.com/ef/core/get-started/aspnetcore/new-db) Code First Migrations is used to:

* Add a new field to the model.
* Migrate the new field schema change to the database.

When using EF Code First to automatically create a database, Code First:

* Adds an [`__EFMigrationsHistory`](https://learn.microsoft.com/ef/core/managing-schemas/migrations/history-table) table to the database to track whether the schema of the database is in sync with the model classes it was generated from.
* If the model classes aren't in sync with the database, EF throws an exception.

Automatic verification that the schema and model are in sync makes it easier to find inconsistent database code issues.

## Add a `Rating` property to the `Movie` model

1. Open the `Models/Movie.cs` file and add a `Rating` property:

   [Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Models/MovieDateRating.cs?highlight=13\\&name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

1. Build the app.

1. Edit `Pages/Movies/Index.cshtml`, and add a `Rating` field:

   <a name="addrat"></a>

   [Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/SnapShots/IndexRating.cshtml?highlight=40-42,62-64](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

1. Update the following pages with a `Rating` field:
   * *[Pages/Movies/Create.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Pages/Movies/Create.cshtml)*.
   * *[Pages/Movies/Delete.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Pages/Movies/Delete.cshtml)*.
   * *[Pages/Movies/Details.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Pages/Movies/Details.cshtml)*.
   * *[Pages/Movies/Edit.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Pages/Movies/Edit.cshtml)*.

The app won't work until the database is updated to include the new field. Running the app without an update to the database throws a `SqlException`:

`SqlException: Invalid column name 'Rating'.`

The `SqlException` exception is caused by the updated Movie model class being different than the schema of the Movie table of the database. There's no `Rating` column in the database table.

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database using the new model class schema. This approach is convenient early in the development cycle, it allows you to quickly evolve the model and database schema together. The downside is that you lose existing data in the database. Don't use this approach on a production database! Dropping the database on schema changes and using an initializer to automatically seed the database with test data is often a productive way to develop an app.

2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is to keep the data. Make this change either manually or by creating a database change script.

3. Use Code First Migrations to update the database schema.

For this tutorial, use Code First Migrations.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown below, but make this change for each `new Movie` block.

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Models/SeedDataRating.cs?name=snippet1\\&highlight=8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

See the [completed SeedData.cs file](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Models/SeedDataRating.cs).

Build the solution.

# [Visual Studio](#tab/visual-studio)

<a name="pmc"></a>

### Add a migration for the rating field

1. From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
2. In the PMC, enter the following commands:

   ```powershell
   Add-Migration Rating
   Update-Database
   ```

The `Add-Migration` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

The `Update-Database` command tells the framework to apply the schema changes to the database and to preserve existing data.

<a name="ssox"></a>

Delete all the records in the database, the initializer will seed the database and include the `Rating` field. Deleting can be done with the delete links in the browser or from [Sql Server Object Explorer](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fsql%23ssox) (SSOX).

Another option is to delete the database and use migrations to re-create the database. To delete the database in SSOX:

1. Select the database in SSOX.
1. Right-click on the database, and select **Delete**.
1. Check **Close existing connections**.
1. Select **OK**.
1. In the [PMC](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fnew-field%23pmc), update the database:

   ```powershell
   Update-Database
   ```

# [Visual Studio Code](#tab/visual-studio-code)

### Add a migration for rating
Use the following commands to add a migration for the rating field:

```dotnetcli
dotnet ef migrations add rating
dotnet ef database update
```

The `dotnet-ef migrations add rating` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name `rating` is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

The `dotnet ef database update` command tells the framework to apply the schema changes to the database and to preserve existing data.

Delete all the records in the database, the initializer will seed the database and include the `Rating` field. 

### Optional: Drop and re-create the database for other providers

Skip this section if you successfully migrated the database.

In this tutorial, Entity Framework Core *migrations* features are used when possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and some provider's capabilities are limited. For example, adding a column may be supported, but removing or changing a column is not. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, you can drop and re-create the database.

The workaround for the limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:

* Creating a new table.
* Copying data from the old table to the new table.
* Dropping the old table.
* Renaming the new table.

For more information, see the following resources:

 * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
 * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
 * [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
 * [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

1. Delete the migration folder.  

1. Use the following commands to recreate the database.

   ```dotnetcli
   dotnet ef database drop
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

---

Run the app and verify you can create/edit/display movies with a `Rating` field. If the database isn't seeded, set a break point in the `SeedData.Initialize` method.

## Next steps

> 
> [Previous: Add Search](search.md)
> [Next: Add Validation](validation.md)




**Applies to: < aspnetcore-5.0**

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

In this section [Entity Framework](https://learn.microsoft.com/ef/core/get-started/aspnetcore/new-db) Code First Migrations is used to:

* Add a new field to the model.
* Migrate the new field schema change to the database.

When using EF Code First to automatically create a database, Code First:

* Adds an [`__EFMigrationsHistory`](https://learn.microsoft.com/ef/core/managing-schemas/migrations/history-table) table to the database to track whether the schema of the database is in sync with the model classes it was generated from.
* If the model classes aren't in sync with the database, EF throws an exception.

Automatic verification that the schema and model are in sync makes it easier to find inconsistent database code issues.

## Add a `Rating` property to the `Movie` model

1. Open the `Models/Movie.cs` file and add a `Rating` property:

   [Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Models/MovieDateRating.cs?highlight=13\\&name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

1. Build the app.

1. Edit `Pages/Movies/Index.cshtml`, and add a `Rating` field:

   <a name="addrat"></a>

   [Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/SnapShots/IndexRating.cshtml?highlight=40-42,62-64](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

1. Update the following pages with a `Rating` field:
   * *[Pages/Movies/Create.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Create.cshtml)*.
   * *[Pages/Movies/Delete.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Delete.cshtml)*.
   * *[Pages/Movies/Details.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Details.cshtml)*.
   * *[Pages/Movies/Edit.cshtml](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Pages/Movies/Edit.cshtml)*.

The app won't work until the database is updated to include the new field. Running the app without an update to the database throws a `SqlException`:

`SqlException: Invalid column name 'Rating'.`

The `SqlException` exception is caused by the updated Movie model class being different than the schema of the Movie table of the database. There's no `Rating` column in the database table.

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database using the new model class schema. This approach is convenient early in the development cycle, it allows you to quickly evolve the model and database schema together. The downside is that you lose existing data in the database. Don't use this approach on a production database! Dropping the database on schema changes and using an initializer to automatically seed the database with test data is often a productive way to develop an app.

2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is to keep the data. Make this change either manually or by creating a database change script.

3. Use Code First Migrations to update the database schema.

For this tutorial, use Code First Migrations.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown below, but make this change for each `new Movie` block.

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Models/SeedDataRating.cs?name=snippet1\\&highlight=8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/new-field.md)

See the [completed SeedData.cs file](https://github.com/dotnet/AspNetCore.Docs/blob/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Models/SeedDataRating.cs).

Build the solution.

# [Visual Studio](#tab/visual-studio)

<a name="pmc"></a>

### Add a migration for the rating field

1. From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
2. In the PMC, enter the following commands:

   ```powershell
   Add-Migration Rating
   Update-Database
   ```

The `Add-Migration` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

The `Update-Database` command tells the framework to apply the schema changes to the database and to preserve existing data.

<a name="ssox"></a>

If you delete all the records in the database, the initializer will seed the database and include the `Rating` field. You can do this with the delete links in the browser or from [Sql Server Object Explorer](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fsql%23ssox) (SSOX).

Another option is to delete the database and use migrations to re-create the database. To delete the database in SSOX:

* Select the database in SSOX.
* Right-click on the database, and select **Delete**.
* Check **Close existing connections**.
* Select **OK**.
* In the [PMC](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fnew-field%23pmc), update the database:

  ```powershell
  Update-Database
  ```

# [Visual Studio Code](#tab/visual-studio-code)

### Drop and re-create the database

> **Note:**
> For this tutorial you, use the Entity Framework Core *migrations* feature where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, you drop and re-create the database.
>
>The workaround for the SQLite limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:
>
>* Creating a new table.
>* Copying data from the old table to the new table.
>* Dropping the old table.
>* Renaming the new table.
>
>For more information, see the following resources:
>
> * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
> * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
> * [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
> * [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

1. Delete the migration folder.  

1. Use the following commands to recreate the database.

   ```dotnetcli
   dotnet ef database drop
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

---

Run the app and verify you can create/edit/display movies with a `Rating` field. If the database isn't seeded, set a break point in the `SeedData.Initialize` method.

## Next steps

> 
> [Previous: Add Search](search.md)
> [Next: Add Validation](validation.md)
