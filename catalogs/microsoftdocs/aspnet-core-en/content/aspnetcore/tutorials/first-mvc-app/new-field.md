---
title: Part 8, add a new field to an ASP.NET Core MVC app
ai-usage: ai-assisted
author: wadepickett
description: Part 8 of tutorial series on ASP.NET Core MVC.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 03/26/2026
uid: tutorials/first-mvc-app/new-field
---
# Part 8, add a new field to an ASP.NET Core MVC app

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


**Applies to: \>= aspnetcore-10.0**

In this section [Entity Framework Core migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/) is used to:

* Add a new field to the model.
* Migrate the new field to the database.

When Entity Framework (EF) is used to automatically create a database from model classes:

* A table is added to the database to track the schema of the database.
* The database is verified to be in sync with the model classes it was generated from. If they aren't in sync, EF throws an exception. This makes it easier to find inconsistent database/code issues.

## Add a Rating Property to the Movie Model

Add a `Rating` property to `Models/Movie.cs`:

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/mvcmovie10/Models/Movie.cs?name=snippet_AddRating\&highlight=19)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Models/Movie.cs.md)

Build the app

### [Visual Studio](#tab/visual-studio)

Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>

### [Visual Studio Code](#tab/visual-studio-code)

From the *View* menu, select *Terminal* and enter the following command:

```dotnetcli
dotnet build
```
---

Because you've added a new field to the `Movie` class, you need to update the property binding list so this new property will be included. In `MoviesController.cs`, update the `[Bind]` attribute for both the `Create` and `Edit` action methods to include the `Rating` property:

```csharp
[Bind("Id,Title,ReleaseDate,Genre,Price,Rating")]
```

Update the view templates in order to display, create, and edit the new `Rating` property in the browser view.

Edit the `/Views/Movies/Index.cshtml` file and add a `Rating` field:

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Views/Movies/IndexGenreRating.cshtml?highlight=16-18,38-40\&range=24-72)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Views/Movies/IndexGenreRating.cshtml.md)

Update the `/Views/Movies/Create.cshtml` with a `Rating` field.

# [Visual Studio](#tab/visual-studio)

You can copy/paste the previous "form group" and let intelliSense help you update the fields. IntelliSense works with [Tag Helpers](../../mvc/views/tag-helpers/intro.md).

The developer has typed the letter R for the attribute value of asp-for in the second label element of the view. An Intellisense contextual menu has appeared showing the available fields, including Rating, which is highlighted in the list automatically. When the developer clicks the field or presses Enter on the keyboard, the value will be set to Rating.

# [Visual Studio Code](#tab/visual-studio-code)

You can copy/paste the previous "form group" and let IntelliSense help you update the fields. IntelliSense works with [Tag Helpers](../../mvc/views/tag-helpers/intro.md). The [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) extension provides IntelliSense support in Visual Studio Code.

Updating the existing form by inserting the new field Rating.

---

Add the `Rating` property to the remaining `Create.cshtml`, `Delete.cshtml`, `Details.cshtml`, and `Edit.cshtml` view templates.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown in the following code snippet, but you'll want to make this change for each `new Movie`.

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Models/SeedDataRating.cs?name=snippet_SeedRating\&highlight=6)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Models/SeedDataRating.cs.md)

The app won't work until the DB is updated to include the new field. If it's run now, the following `SqlException` is thrown:

`SqlException: Invalid column name 'Rating'.`

This error occurs because the updated Movie model class is different than the schema of the Movie table of the existing database. (There's no `Rating` column in the database table.)

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database based on the new model class schema. This approach is very convenient early in the development cycle when you're doing active development on a test database; it allows you to quickly evolve the model and database schema together. The downside, though, is that you lose existing data in the database — so you don't want to use this approach on a production database! Using an initializer to automatically seed a database with test data is often a productive way to develop an application. This is a good approach for early development and when using SQLite.

2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is that you keep your data. You can make this change either manually or by creating a database change script.

3. Use Entity Framework Migrations to update the database schema.

For this tutorial, Entity Framework Migrations is used.

# [Visual Studio](#tab/visual-studio)

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.

PMC menu.

In the Package Manager Console, enter the following command:

```powershell
Add-Migration Rating
```

The `Add-Migration` command tells the migration framework to examine the current `Movie` model with the current `Movie` DB schema and create the necessary code to migrate the DB to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

If all the records in the DB are deleted, the initialize method will seed the DB and include the `Rating` field.

In the Package Manager Console, enter the following command:

```powershell
Update-Database
```

The Update-Database command runs the Up method in migrations that have not been applied.

# [Visual Studio Code](#tab/visual-studio-code)


> **Note:**
> For this tutorial you use the Entity Framework Core *migrations* feature where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, you drop and re-create the database.
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


Delete the Migrations folder and the database file, and then run the following .NET CLI commands:

```dotnetcli
dotnet ef migrations add InitialCreate
```

```dotnetcli
dotnet ef database update
```

For more information, see [Resetting all migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/managing?tabs=dotnet-core-cli#resetting-all-migrations).

---
<!-- End of VS tabs -->

Run the app and verify you can create, edit, and display movies with a `Rating` field.

> 
> [Previous](search.md)
> [Next](validation.md)



**Applies to: \= aspnetcore-9.0**

In this section [Entity Framework](https://learn.microsoft.com/ef/core/get-started/aspnetcore/new-db) Migrations is used to:

* Add a new field to the model.
* Migrate the new field to the database.

When Entity Framework (EF) is used to automatically create a database from model classes:

* A table is added to the database to track the schema of the database.
* The database is verified to be in sync with the model classes it was generated from. If they aren't in sync, EF throws an exception. This makes it easier to find inconsistent database/code issues.

## Add a Rating Property to the Movie Model

Add a `Rating` property to `Models/Movie.cs`:

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/mvcmovie90/Models/Movie.cs?name=snippet_AddRating\\&highlight=19](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

Build the app

### [Visual Studio](#tab/visual-studio)

Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>

### [Visual Studio Code](#tab/visual-studio-code)

From the *View* menu, select *Terminal* and enter the following command:

```dotnetcli
dotnet build
```
---

Because you've added a new field to the `Movie` class, you need to update the property binding list so this new property will be included. In `MoviesController.cs`, update the `[Bind]` attribute for both the `Create` and `Edit` action methods to include the `Rating` property:

```csharp
[Bind("Id,Title,ReleaseDate,Genre,Price,Rating")]
```

Update the view templates in order to display, create, and edit the new `Rating` property in the browser view.

Edit the `/Views/Movies/Index.cshtml` file and add a `Rating` field:

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie90/Views/Movies/IndexGenreRating.cshtml?highlight=16-18,38-40\\&range=24-72](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

Update the `/Views/Movies/Create.cshtml` with a `Rating` field.

# [Visual Studio](#tab/visual-studio)

You can copy/paste the previous "form group" and let IntelliSense help you update the fields. IntelliSense works with [Tag Helpers](../../mvc/views/tag-helpers/intro.md).

The developer has typed the letter R for the attribute value of asp-for in the second label element of the view. An Intellisense contextual menu has appeared showing the available fields, including Rating, which is highlighted in the list automatically. When the developer clicks the field or presses Enter on the keyboard, the value will be set to Rating.

# [Visual Studio Code](#tab/visual-studio-code)

You can copy/paste the previous "form group" and let IntelliSense help you update the fields. IntelliSense works with [Tag Helpers](../../mvc/views/tag-helpers/intro.md). The [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) extension provides IntelliSense support in Visual Studio Code.

Updating the existing form by inserting the new field "Rating".

---

Add the `Rating` property to the remaining `Create.cshtml`, `Delete.cshtml`, `Details.cshtml`, and `Edit.cshtml` view templates.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown below, but you'll want to make this change for each `new Movie`.

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie90/Models/SeedDataRating.cs?name=snippet_SeedRating\\&highlight=6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

The app won't work until the DB is updated to include the new field. If it's run now, the following `SqlException` is thrown:

`SqlException: Invalid column name 'Rating'.`

This error occurs because the updated Movie model class is different than the schema of the Movie table of the existing database. (There's no `Rating` column in the database table.)

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database based on the new model class schema. This approach is very convenient early in the development cycle when you're doing active development on a test database; it allows you to quickly evolve the model and database schema together. The downside, though, is that you lose existing data in the database — so you don't want to use this approach on a production database! Using an initializer to automatically seed a database with test data is often a productive way to develop an application. This is a good approach for early development and when using SQLite.

2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is that you keep your data. You can make this change either manually or by creating a database change script.

3. Use Entity Framework Migrations to update the database schema.

For this tutorial, Entity Framework Migrations is used.

# [Visual Studio](#tab/visual-studio)

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.

  PMC menu

In the Package Manager Console, enter the following command:

```powershell
Add-Migration Rating
```

The `Add-Migration` command tells the migration framework to examine the current `Movie` model with the current `Movie` DB schema and create the necessary code to migrate the DB to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

If all the records in the DB are deleted, the initialize method will seed the DB and include the `Rating` field.

In the Package Manager Console, enter the following command:

```powershell
Update-Database
```

The Update-Database command runs the Up method in migrations that have not been applied.

# [Visual Studio Code](#tab/visual-studio-code)


> **Note:**
> For this tutorial you use the Entity Framework Core *migrations* feature where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, you drop and re-create the database.
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


Delete the Migrations folder and the database file, and then run the following .NET CLI commands:

```dotnetcli
dotnet ef migrations add InitialCreate
```

```dotnetcli
dotnet ef database update
```

For more information, see [Resetting all migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/managing?tabs=dotnet-core-cli#resetting-all-migrations).

---
<!-- End of VS tabs -->

Run the app and verify you can create, edit, and display movies with a `Rating` field.

> 
> [Previous](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field/includes/~/tutorials/first-mvc-app/search.md)
> [Next](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field/includes/~/tutorials/first-mvc-app/validation.md)




**Applies to: \= aspnetcore-8.0**

In this section [Entity Framework Core migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/) is used to:

* Add a new field to the model.
* Migrate the new field to the database.

When EF Code First is used to automatically create a database, Code First:

* Adds a table to the database to  track the schema of the database.
* Verifies the database is in sync with the model classes it was generated from. If they aren't in sync, EF throws an exception. This makes it easier to find inconsistent database/code issues.

## Add a Rating Property to the Movie Model

Add a `Rating` property to `Models/Movie.cs`:

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/mvcmovie80/Models/Movie.cs?name=snippet_AddRating\\&highlight=19](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

Build the app

### [Visual Studio](#tab/visual-studio)

Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>

### [Visual Studio Code](#tab/visual-studio-code)

From the *View* menu, select *Terminal* and enter the following command:

```dotnetcli
dotnet build
```

---

Because you've added a new field to the `Movie` class, you need to update the property binding list so this new property will be included. In `MoviesController.cs`, update the `[Bind]` attribute for both the `Create` and `Edit` action methods to include the `Rating` property:

```csharp
[Bind("Id,Title,ReleaseDate,Genre,Price,Rating")]
```

Update the view templates in order to display, create, and edit the new `Rating` property in the browser view.

Edit the `/Views/Movies/Index.cshtml` file and add a `Rating` field:

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie80/Views/Movies/IndexGenreRating.cshtml?highlight=16-18,38-40\\&range=24-72](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

Update the `/Views/Movies/Create.cshtml` with a `Rating` field.

# [Visual Studio](#tab/visual-studio)

You can copy/paste the previous "form group" and let intelliSense help you update the fields. IntelliSense works with [Tag Helpers](../../mvc/views/tag-helpers/intro.md).

The developer has typed the letter R for the attribute value of asp-for in the second label element of the view. An Intellisense contextual menu has appeared showing the available fields, including Rating, which is highlighted in the list automatically. When the developer clicks the field or presses Enter on the keyboard, the value will be set to Rating.

# [Visual Studio Code](#tab/visual-studio-code)

You can copy/paste the previous "form group" and let IntelliSense help you update the fields. IntelliSense works with [Tag Helpers](../../mvc/views/tag-helpers/intro.md). The [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) extension provides IntelliSense support in Visual Studio Code.

Updating the existing form by inserting the new field "Rating".

---

Update the remaining templates.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown below, but you'll want to make this change for each `new Movie`.

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie80/Models/SeedDataRating.cs?name=snippet_SeedRating\\&highlight=6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

The app won't work until the DB is updated to include the new field. If it's run now, the following `SqlException` is thrown:

`SqlException: Invalid column name 'Rating'.`

This error occurs because the updated Movie model class is different than the schema of the Movie table of the existing database. (There's no `Rating` column in the database table.)

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database based on the new model class schema. This approach is very convenient early in the development cycle when you're doing active development on a test database; it allows you to quickly evolve the model and database schema together. The downside, though, is that you lose existing data in the database — so you don't want to use this approach on a production database! Using an initializer to automatically seed a database with test data is often a productive way to develop an application. This is a good approach for early development and when using SQLite.

2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is that you keep your data. You can make this change either manually or by creating a database change script.

3. Use Code First Migrations to update the database schema.

For this tutorial, Code First Migrations is used.

# [Visual Studio](#tab/visual-studio)

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.

  PMC menu

In the PMC, enter the following commands:

```powershell
Add-Migration Rating
Update-Database
```

The `Add-Migration` command tells the migration framework to examine the current `Movie` model with the current `Movie` DB schema and create the necessary code to migrate the DB to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

If all the records in the DB are deleted, the initialize method will seed the DB and include the `Rating` field.

# [Visual Studio Code](#tab/visual-studio-code)


> **Note:**
> For this tutorial you use the Entity Framework Core *migrations* feature where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, you drop and re-create the database.
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


Delete the Migrations folder and the database file, and then run the following .NET CLI commands:

```dotnetcli
dotnet ef migrations add InitialCreate
```

```dotnetcli
dotnet ef database update
```

For more information, see [Resetting all migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/managing?tabs=dotnet-core-cli#resetting-all-migrations).

---
<!-- End of VS tabs -->

Run the app and verify you can create, edit, and display movies with a `Rating` field.

> 
> [Previous](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field/includes/~/tutorials/first-mvc-app/search.md)
> [Next](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field/includes/~/tutorials/first-mvc-app/validation.md)



**Applies to: \= aspnetcore-7.0**

In this section [Entity Framework Core migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/) is used to:

* Add a new field to the model.
* Migrate the new field to the database.

When EF Code First is used to automatically create a database, Code First:

* Adds a table to the database to  track the schema of the database.
* Verifies the database is in sync with the model classes it was generated from. If they aren't in sync, EF throws an exception. This makes it easier to find inconsistent database/code issues.

## Add a Rating Property to the Movie Model

Add a `Rating` property to `Models/Movie.cs`:

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Models/Movie.cs?name=snippet_AddRating\\&highlight=19](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

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

Because you've added a new field to the `Movie` class, you need to update the property binding list so this new property will be included. In `MoviesController.cs`, update the `[Bind]` attribute for both the `Create` and `Edit` action methods to include the `Rating` property:

```csharp
[Bind("Id,Title,ReleaseDate,Genre,Price,Rating")]
```

Update the view templates in order to display, create, and edit the new `Rating` property in the browser view.

Edit the `/Views/Movies/Index.cshtml` file and add a `Rating` field:

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Views/Movies/IndexGenreRating.cshtml?highlight=16-18,38-40\\&range=24-72](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

Update the `/Views/Movies/Create.cshtml` with a `Rating` field.

# [Visual Studio / Visual Studio for Mac](#tab/visual-studio+visual-studio-mac)

You can copy/paste the previous "form group" and let intelliSense help you update the fields. IntelliSense works with [Tag Helpers](../../mvc/views/tag-helpers/intro.md).

The developer has typed the letter R for the attribute value of asp-for in the second label element of the view. An Intellisense contextual menu has appeared showing the available fields, including Rating, which is highlighted in the list automatically. When the developer clicks the field or presses Enter on the keyboard, the value will be set to Rating.

# [Visual Studio Code](#tab/visual-studio-code)

<!-- This tab intentionally left blank. -->

---

Update the remaining templates.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown below, but you'll want to make this change for each `new Movie`.

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Models/SeedDataRating.cs?name=snippet_SeedRating\\&highlight=6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

The app won't work until the DB is updated to include the new field. If it's run now, the following `SqlException` is thrown:

`SqlException: Invalid column name 'Rating'.`

This error occurs because the updated Movie model class is different than the schema of the Movie table of the existing database. (There's no `Rating` column in the database table.)

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database based on the new model class schema. This approach is very convenient early in the development cycle when you're doing active development on a test database; it allows you to quickly evolve the model and database schema together. The downside, though, is that you lose existing data in the database — so you don't want to use this approach on a production database! Using an initializer to automatically seed a database with test data is often a productive way to develop an application. This is a good approach for early development and when using SQLite.

2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is that you keep your data. You can make this change either manually or by creating a database change script.

3. Use Code First Migrations to update the database schema.

For this tutorial, Code First Migrations is used.

# [Visual Studio](#tab/visual-studio)

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.

  PMC menu

In the PMC, enter the following commands:

```powershell
Add-Migration Rating
Update-Database
```

The `Add-Migration` command tells the migration framework to examine the current `Movie` model with the current `Movie` DB schema and create the necessary code to migrate the DB to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

If all the records in the DB are deleted, the initialize method will seed the DB and include the `Rating` field.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)


> **Note:**
> For this tutorial you use the Entity Framework Core *migrations* feature where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, you drop and re-create the database.
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


Delete the Migrations folder and the database file, and then run the following .NET CLI commands:

```dotnetcli
dotnet ef migrations add InitialCreate
```

```dotnetcli
dotnet ef database update
```

For more information, see [Resetting all migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/managing?tabs=dotnet-core-cli#resetting-all-migrations).

---
<!-- End of VS tabs -->

Run the app and verify you can create, edit, and display movies with a `Rating` field.

> 
> [Previous](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field/includes/~/tutorials/first-mvc-app/search.md)
> [Next](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field/includes/~/tutorials/first-mvc-app/validation.md)




**Applies to: \= aspnetcore-6.0**

In this section [Entity Framework Core migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/) is used to:

* Add a new field to the model.
* Migrate the new field to the database.

When EF Code First is used to automatically create a database, Code First:

* Adds a table to the database to  track the schema of the database.
* Verifies the database is in sync with the model classes it was generated from. If they aren't in sync, EF throws an exception. This makes it easier to find inconsistent database/code issues.

## Add a Rating Property to the Movie Model

Add a `Rating` property to `Models/Movie.cs`:

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Models/Movie.cs?name=AddRating\\&highlight=19](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

Build the app

### [Visual Studio](#tab/visual-studio)

 Ctrl+Shift+B

### [Visual Studio Code](#tab/visual-studio-code)

```dotnetcli
dotnet build
```

### [Visual Studio for Mac](#tab/visual-studio-mac)

Command ⌘ + B

---

Because you've added a new field to the `Movie` class, you need to update the property binding list so this new property will be included. In `MoviesController.cs`, update the `[Bind]` attribute for both the `Create` and `Edit` action methods to include the `Rating` property:

```csharp
[Bind("Id,Title,ReleaseDate,Genre,Price,Rating")]
```

Update the view templates in order to display, create, and edit the new `Rating` property in the browser view.

Edit the `/Views/Movies/Index.cshtml` file and add a `Rating` field:

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Views/Movies/IndexGenreRating.cshtml?highlight=16-18,38-40\\&range=24-72](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

Update the `/Views/Movies/Create.cshtml` with a `Rating` field.

# [Visual Studio / Visual Studio for Mac](#tab/visual-studio+visual-studio-mac)

You can copy/paste the previous "form group" and let intelliSense help you update the fields. IntelliSense works with [Tag Helpers](../../mvc/views/tag-helpers/intro.md).

The developer has typed the letter R for the attribute value of asp-for in the second label element of the view. An Intellisense contextual menu has appeared showing the available fields, including Rating, which is highlighted in the list automatically. When the developer clicks the field or presses Enter on the keyboard, the value will be set to Rating.

# [Visual Studio Code](#tab/visual-studio-code)

<!-- This tab intentionally left blank. -->

---

Update the remaining templates.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown below, but you'll want to make this change for each `new Movie`.

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie/Models/SeedDataRating.cs?name=snippet1\\&highlight=6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

The app won't work until the DB is updated to include the new field. If it's run now, the following `SqlException` is thrown:

`SqlException: Invalid column name 'Rating'.`

This error occurs because the updated Movie model class is different than the schema of the Movie table of the existing database. (There's no `Rating` column in the database table.)

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database based on the new model class schema. This approach is very convenient early in the development cycle when you're doing active development on a test database; it allows you to quickly evolve the model and database schema together. The downside, though, is that you lose existing data in the database — so you don't want to use this approach on a production database! Using an initializer to automatically seed a database with test data is often a productive way to develop an application. This is a good approach for early development and when using SQLite.

2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is that you keep your data. You can make this change either manually or by creating a database change script.

3. Use Code First Migrations to update the database schema.

For this tutorial, Code First Migrations is used.

# [Visual Studio](#tab/visual-studio)

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.

  PMC menu

In the PMC, enter the following commands:

```powershell
Add-Migration Rating
Update-Database
```

The `Add-Migration` command tells the migration framework to examine the current `Movie` model with the current `Movie` DB schema and create the necessary code to migrate the DB to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

If all the records in the DB are deleted, the initialize method will seed the DB and include the `Rating` field.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)


> **Note:**
> For this tutorial you use the Entity Framework Core *migrations* feature where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, you drop and re-create the database.
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


See [Resetting all migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/managing?tabs=dotnet-core-cli#resetting-all-migrations) to remove all migrations and start over. 

---
<!-- End of VS tabs -->

Run the app and verify you can create, edit, and display movies with a `Rating` field.

> 
> [Previous](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field/includes/~/tutorials/first-mvc-app/search.md)
> [Next](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field/includes/~/tutorials/first-mvc-app/validation.md)




**Applies to: \= aspnetcore-5.0**

In this section [Entity Framework](https://learn.microsoft.com/ef/core/get-started/aspnetcore/new-db) Code First Migrations is used to:

* Add a new field to the model.
* Migrate the new field to the database.

When EF Code First is used to automatically create a database, Code First:

* Adds a table to the database to  track the schema of the database.
* Verifies the database is in sync with the model classes it was generated from. If they aren't in sync, EF throws an exception. This makes it easier to find inconsistent database/code issues.

## Add a Rating Property to the Movie Model

Add a `Rating` property to `Models/Movie.cs`:

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie22/Models/MovieDateRating.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

Build the app

### [Visual Studio](#tab/visual-studio)

 Ctrl+Shift+B

### [Visual Studio Code](#tab/visual-studio-code)

```dotnetcli
dotnet build
```

### [Visual Studio for Mac](#tab/visual-studio-mac)

Command ⌘ + B

---

Because you've added a new field to the `Movie` class, you need to update the property binding list so this new property will be included. In `MoviesController.cs`, update the `[Bind]` attribute for both the `Create` and `Edit` action methods to include the `Rating` property:

```csharp
[Bind("Id,Title,ReleaseDate,Genre,Price,Rating")]
   ```

Update the view templates in order to display, create, and edit the new `Rating` property in the browser view.

Edit the `/Views/Movies/Index.cshtml` file and add a `Rating` field:

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie5/Views/Movies/IndexGenreRating.cshtml?highlight=16,38\\&range=24-63](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

Update the `/Views/Movies/Create.cshtml` with a `Rating` field.

# [Visual Studio / Visual Studio for Mac](#tab/visual-studio+visual-studio-mac)

You can copy/paste the previous "form group" and let intelliSense help you update the fields. IntelliSense works with [Tag Helpers](../../mvc/views/tag-helpers/intro.md).

The developer has typed the letter R for the attribute value of asp-for in the second label element of the view. An Intellisense contextual menu has appeared showing the available fields, including Rating, which is highlighted in the list automatically. When the developer clicks the field or presses Enter on the keyboard, the value will be set to Rating.

# [Visual Studio Code](#tab/visual-studio-code)

<!-- This tab intentionally left blank. -->

---

Update the remaining templates.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown below, but you'll want to make this change for each `new Movie`.

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie/Models/SeedDataRating.cs?name=snippet1\\&highlight=6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

The app won't work until the DB is updated to include the new field. If it's run now, the following `SqlException` is thrown:

`SqlException: Invalid column name 'Rating'.`

This error occurs because the updated Movie model class is different than the schema of the Movie table of the existing database. (There's no `Rating` column in the database table.)

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database based on the new model class schema. This approach is very convenient early in the development cycle when you're doing active development on a test database; it allows you to quickly evolve the model and database schema together. The downside, though, is that you lose existing data in the database — so you don't want to use this approach on a production database! Using an initializer to automatically seed a database with test data is often a productive way to develop an application. This is a good approach for early development and when using SQLite.

2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is that you keep your data. You can make this change either manually or by creating a database change script.

3. Use Code First Migrations to update the database schema.

For this tutorial, Code First Migrations is used.

# [Visual Studio](#tab/visual-studio)

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.

  PMC menu

In the PMC, enter the following commands:

```powershell
Add-Migration Rating
Update-Database
```

The `Add-Migration` command tells the migration framework to examine the current `Movie` model with the current `Movie` DB schema and create the necessary code to migrate the DB to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

If all the records in the DB are deleted, the initialize method will seed the DB and include the `Rating` field.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)


> **Note:**
> For this tutorial you use the Entity Framework Core *migrations* feature where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, you drop and re-create the database.
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


See [Resetting all migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/managing?tabs=dotnet-core-cli#resetting-all-migrations) to remove all migrations and start over. 

---
<!-- End of VS tabs -->

Run the app and verify you can create, edit, and display movies with a `Rating` field.

> 
> [Previous](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field/includes/~/tutorials/first-mvc-app/search.md)
> [Next](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field/includes/~/tutorials/first-mvc-app/validation.md)




**Applies to: \>= aspnetcore-3.1 < aspnetcore-5.0**

In this section [Entity Framework](https://learn.microsoft.com/ef/core/get-started/aspnetcore/new-db) Code First Migrations is used to:

* Add a new field to the model.
* Migrate the new field to the database.

When EF Code First is used to automatically create a database, Code First:

* Adds a table to the database to  track the schema of the database.
* Verifies the database is in sync with the model classes it was generated from. If they aren't in sync, EF throws an exception. This makes it easier to find inconsistent database/code issues.

## Add a Rating Property to the Movie Model

Add a `Rating` property to `Models/Movie.cs`:

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie22/Models/MovieDateRating.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

Build the app

### [Visual Studio](#tab/visual-studio)

 Ctrl+Shift+B

### [Visual Studio Code](#tab/visual-studio-code)

```dotnetcli
dotnet build
```

### [Visual Studio for Mac](#tab/visual-studio-mac)

Command ⌘ + B

---

Because you've added a new field to the `Movie` class, you need to update the property binding list so this new property will be included. In `MoviesController.cs`, update the `[Bind]` attribute for both the `Create` and `Edit` action methods to include the `Rating` property:

```csharp
[Bind("Id,Title,ReleaseDate,Genre,Price,Rating")]
   ```

Update the view templates in order to display, create, and edit the new `Rating` property in the browser view.

Edit the `/Views/Movies/Index.cshtml` file and add a `Rating` field:

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie3/Views/Movies/IndexGenreRating.cshtml?highlight=16,38\\&range=24-63](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

Update the `/Views/Movies/Create.cshtml` with a `Rating` field.

# [Visual Studio / Visual Studio for Mac](#tab/visual-studio+visual-studio-mac)

You can copy/paste the previous "form group" and let intelliSense help you update the fields. IntelliSense works with [Tag Helpers](../../mvc/views/tag-helpers/intro.md).

The developer has typed the letter R for the attribute value of asp-for in the second label element of the view. An Intellisense contextual menu has appeared showing the available fields, including Rating, which is highlighted in the list automatically. When the developer clicks the field or presses Enter on the keyboard, the value will be set to Rating.

# [Visual Studio Code](#tab/visual-studio-code)

<!-- This tab intentionally left blank. -->

---

Update the remaining templates.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown below, but you'll want to make this change for each `new Movie`.

[Code reference unavailable in this source snapshot: new-field/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie/Models/SeedDataRating.cs?name=snippet1\\&highlight=6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field.md)

The app won't work until the DB is updated to include the new field. If it's run now, the following `SqlException` is thrown:

`SqlException: Invalid column name 'Rating'.`

This error occurs because the updated Movie model class is different than the schema of the Movie table of the existing database. (There's no `Rating` column in the database table.)

There are a few approaches to resolving the error:

1. Have the Entity Framework automatically drop and re-create the database based on the new model class schema. This approach is very convenient early in the development cycle when you're doing active development on a test database; it allows you to quickly evolve the model and database schema together. The downside, though, is that you lose existing data in the database — so you don't want to use this approach on a production database! Using an initializer to automatically seed a database with test data is often a productive way to develop an application. This is a good approach for early development and when using SQLite.

2. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is that you keep your data. You can make this change either manually or by creating a database change script.

3. Use Code First Migrations to update the database schema.

For this tutorial, Code First Migrations is used.

# [Visual Studio](#tab/visual-studio)

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.

  PMC menu

In the PMC, enter the following commands:

```powershell
Add-Migration Rating
Update-Database
```

The `Add-Migration` command tells the migration framework to examine the current `Movie` model with the current `Movie` DB schema and create the necessary code to migrate the DB to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

If all the records in the DB are deleted, the initialize method will seed the DB and include the `Rating` field.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)


> **Note:**
> For this tutorial you use the Entity Framework Core *migrations* feature where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, you drop and re-create the database.
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


See [Resetting all migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/managing?tabs=dotnet-core-cli#resetting-all-migrations) to remove all migrations and start over. 

---
<!-- End of VS tabs -->

Run the app and verify you can create, edit, and display movies with a `Rating` field.

> 
> [Previous](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field/includes/~/tutorials/first-mvc-app/search.md)
> [Next](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/new-field/includes/~/tutorials/first-mvc-app/validation.md)
