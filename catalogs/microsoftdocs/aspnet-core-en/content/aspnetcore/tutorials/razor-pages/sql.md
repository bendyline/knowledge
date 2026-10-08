---
title: Part 4, work with a database
author: wadepickett
description: Part 4 of tutorial series on Razor Pages.
ms.author: wpickett
ms.date: 01/09/2026
uid: tutorials/razor-pages/sql
---

# Part 4 of tutorial series on Razor Pages

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


By [Joe Audette](https://twitter.com/joeaudette)

**Applies to: \>= aspnetcore-10.0**

The `RazorPagesMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. Register the database context with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in `Program.cs`:

# [Visual Studio](#tab/visual-studio)

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program.cs?name=snippet_di\&highlight=8-9)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program.cs?name=snippet_di_sl\&highlight=7-8)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program.cs.md)

---

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, the configuration gets the connection string from the `appsettings.json` file.

# [Visual Studio](#tab/visual-studio)

The generated connection string is similar to the following JSON:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/appsettings.json?highlight=9-11)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/appsettings.json.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/appsettings_SQLite.json?highlight=9-11)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/appsettings_SQLite.json.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB is a lightweight version of the SQL Server Express database engine that's designed for program development. LocalDB starts on demand and runs in user mode, so there's no complex configuration. By default, LocalDB creates `*.mdf` database files in the `C:\Users\<user>\` directory.

1. From the **View** menu, open **SQL Server Object Explorer** (SSOX).

   View menu showing SQL Server Object Explorer option.

1. Right-click on the `Movie` table and select **View Designer**:

   Contextual menus open on Movie table.

   Movie tables open in Designer.

   Note the key icon next to `ID`. By default, EF creates a property named `ID` for the primary key.

1. Right-click on the `Movie` table and select **View Data**:

   Movie table open showing table data.

# [Visual Studio Code](#tab/visual-studio-code)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL Database engine. SQLite is the most used database engine in the world.

You can download many third-party tools to manage and view a SQLite database. The following image is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie database.

> **Note:**
> For this tutorial, use the Entity Framework Core *migrations* feature where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only make changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column isn't supported. If you create a migration to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, the database is dropped and re-created.
>
>The workaround for the SQLite limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:
>
>* Creating a new table.
>* Copying data from the old table to the new table.
>* Dropping the old table.
>* Renaming the new table.
>
>For more information, see the following resources:
> * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
> * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
> * [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
> * [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

---

## Seed the database

<!-- Next version put it in the Data folder -->
Create a new class named `SeedData` in the *Models* folder with the following code:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/SeedData.cs?name=snippet_1)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/SeedData.cs.md)

If the database contains any movies, the seed initializer returns and doesn't add any movies.

```csharp
if (context.Movie.Any())
{
    return;
}
```

<a name="si"></a>

### Add the seed initializer

Update `Program.cs` with the following highlighted code:

# [Visual Studio](#tab/visual-studio)

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/ProgramSeed.cs?name=snippet_all\&highlight=3,13-18)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/ProgramSeed.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/ProgramSeed.cs?name=snippet_all_sl\&highlight=3,13-18)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/ProgramSeed.cs.md)

---

In the preceding code, you modify `Program.cs` to do the following steps:

* Get a database context instance from the dependency injection (DI) container.
* Call the `seedData.Initialize` method, passing the database context instance.
* Dispose the context when the seed method completes. The [using statement](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/using-statement) ensures the context is disposed.

The following exception occurs when you don't run `Update-Database`:

> `SqlException: Cannot open database "RazorPagesMovieContext-" requested by the login. The login failed.`
> `Login failed for user 'user name'.`

### Test the app

Delete all the records in the database so the seed method runs. Stop and start the app to seed the database. If the database isn't seeded, put a breakpoint on `if (context.Movie.Any())` and step through the code.

The app shows the seeded data:

Movie application open in browser showing movie data.

## Next steps

> 
> [Previous: Scaffolded Razor Pages](page.md)
> [Next: Update the pages](da1.md)



**Applies to: \= aspnetcore-9.0**

The `RazorPagesMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. The database context is registered with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in `Program.cs`:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Program.cs?name=snippet_di\\&highlight=8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Program.cs?name=snippet_di_sl\\&highlight=7-8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, configuration gets the connection string from the `appsettings.json` file.

# [Visual Studio](#tab/visual-studio)

The generated connection string is similar to the following JSON:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/appsettings.json?highlight=9-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/appsettings_SQLite.json?highlight=9-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB is a lightweight version of the SQL Server Express database engine that's targeted for program development. LocalDB starts on demand and runs in user mode, so there's no complex configuration. By default, LocalDB database creates `*.mdf` files in the `C:\Users\<user>\` directory.

<a name="ssox"></a>
1. From the **View** menu, open **SQL Server Object Explorer** (SSOX).

   View menu

1. Right-click on the `Movie` table and select **View Designer**:

   Contextual menus open on Movie table

   Movie tables open in Designer

   Note the key icon next to `ID`. By default, EF creates a property named `ID` for the primary key.

1. Right-click on the `Movie` table and select **View Data**:

   Movie table open showing table data

# [Visual Studio Code](#tab/visual-studio-code)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world.

There are many third-party tools you can download to manage and view a SQLite database. The image below is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie database

> **Note:**
> For this tutorial, the Entity Framework Core *migrations* feature is used where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, the database is dropped and re-created.
>
>The workaround for the SQLite limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:
>
>* Creating a new table.
>* Copying data from the old table to the new table.
>* Dropping the old table.
>* Renaming the new table.
>
>For more information, see the following resources:
> * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
> * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
> * [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
> * [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

---

## Seed the database

<!-- Next version put it in the Data folder -->
Create a new class named `SeedData` in the *Models* folder with the following code:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Models/SeedData.cs?name=snippet_1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

If there are any movies in the database, the seed initializer returns and no movies are added.

```csharp
if (context.Movie.Any())
{
    return;
}
```

<a name="si"></a>

### Add the seed initializer

Update the `Program.cs` with the following highlighted code:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/ProgramSeed.cs?name=snippet_all\\&highlight=3,13-18](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/ProgramSeed.cs?name=snippet_all_sl\\&highlight=3,13-18](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

In the previous code, `Program.cs` has been modified to do the following:

* Get a database context instance from the dependency injection (DI) container.
* Call the `seedData.Initialize` method, passing to it the database context instance.
* Dispose the context when the seed method completes. The [using statement](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/using-statement) ensures the context is disposed.

The following exception occurs when `Update-Database` has not been run:

> `SqlException: Cannot open database "RazorPagesMovieContext-" requested by the login. The login failed.`
> `Login failed for user 'user name'.`

### Test the app

Delete all the records in the database so the seed method will run. Stop and start the app to seed the database. If the database isn't seeded, put a breakpoint on `if (context.Movie.Any())` and step through the code.

The app shows the seeded data:

Movie application open in browser showing movie data

## Next steps

> 
> [Previous: Scaffolded Razor Pages](page.md)
> [Next: Update the pages](da1.md)





**Applies to: \= aspnetcore-8.0**

The `RazorPagesMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. The database context is registered with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in `Program.cs`:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs?name=snippet_di\\&highlight=8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs?name=snippet_di_sl\\&highlight=7-8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, configuration gets the connection string from the `appsettings.json` file.

# [Visual Studio](#tab/visual-studio)

The generated connection string is similar to the following JSON:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/appsettings.json?highlight=10-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/appsettings_SQLite.json?highlight=9-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB is a lightweight version of the SQL Server Express database engine that's targeted for program development. LocalDB starts on demand and runs in user mode, so there's no complex configuration. By default, LocalDB database creates `*.mdf` files in the `C:\Users\<user>\` directory.

<a name="ssox"></a>
1. From the **View** menu, open **SQL Server Object Explorer** (SSOX).

   View menu

1. Right-click on the `Movie` table and select **View Designer**:

   Contextual menus open on Movie table

   Movie tables open in Designer

   Note the key icon next to `ID`. By default, EF creates a property named `ID` for the primary key.

1. Right-click on the `Movie` table and select **View Data**:

   Movie table open showing table data

# [Visual Studio Code](#tab/visual-studio-code)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world.

There are many third-party tools you can download to manage and view a SQLite database. The image below is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie database

> **Note:**
> For this tutorial, the Entity Framework Core *migrations* feature is used where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, the database is dropped and re-created.
>
>The workaround for the SQLite limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:
>
>* Creating a new table.
>* Copying data from the old table to the new table.
>* Dropping the old table.
>* Renaming the new table.
>
>For more information, see the following resources:
> * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
> * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
> * [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
> * [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

---

## Seed the database

<!-- Next version put it in the Data folder -->
Create a new class named `SeedData` in the *Models* folder with the following code:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/SeedData.cs?name=snippet_1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

If there are any movies in the database, the seed initializer returns and no movies are added.

```csharp
if (context.Movie.Any())
{
    return;
}
```

<a name="si"></a>

### Add the seed initializer

Update the `Program.cs` with the following highlighted code:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/ProgramSeed.cs?name=snippet_all\\&highlight=3,13-18](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/ProgramSeed.cs?name=snippet_all_sl\\&highlight=3,13-18](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

In the previous code, `Program.cs` has been modified to do the following:

* Get a database context instance from the dependency injection (DI) container.
* Call the `seedData.Initialize` method, passing to it the database context instance.
* Dispose the context when the seed method completes. The [using statement](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/using-statement) ensures the context is disposed.

The following exception occurs when `Update-Database` has not been run:

> `SqlException: Cannot open database "RazorPagesMovieContext-" requested by the login. The login failed.`
> `Login failed for user 'user name'.`

### Test the app

Delete all the records in the database so the seed method will run. Stop and start the app to seed the database. If the database isn't seeded, put a breakpoint on `if (context.Movie.Any())` and step through the code.

The app shows the seeded data:

Movie application open in browser showing movie data

## Next steps

> 
> [Previous: Scaffolded Razor Pages](page.md)
> [Next: Update the pages](da1.md)




**Applies to: \= aspnetcore-7.0**

The `RazorPagesMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. The database context is registered with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in `Program.cs`:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Program.cs?name=snippet_di\\&highlight=8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Program.cs?name=snippet_di_sl\\&highlight=7-8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, configuration gets the connection string from the `appsettings.json` file.

# [Visual Studio](#tab/visual-studio)

The generated connection string is similar to the following JSON:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/appsettings.json?highlight=10-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/appsettings_SQLite.json?highlight=9-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB is a lightweight version of the SQL Server Express database engine that's targeted for program development. LocalDB starts on demand and runs in user mode, so there's no complex configuration. By default, LocalDB database creates `*.mdf` files in the `C:\Users\<user>\` directory.

<a name="ssox"></a>
1. From the **View** menu, open **SQL Server Object Explorer** (SSOX).

   View menu

1. Right-click on the `Movie` table and select **View Designer**:

   Contextual menus open on Movie table

   Movie tables open in Designer

   Note the key icon next to `ID`. By default, EF creates a property named `ID` for the primary key.

1. Right-click on the `Movie` table and select **View Data**:

   Movie table open showing table data

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world.

There are many third-party tools you can download to manage and view a SQLite database. The image below is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie database

> **Note:**
> For this tutorial, the Entity Framework Core *migrations* feature is used where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, the database is dropped and re-created.
>
>The workaround for the SQLite limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:
>
>* Creating a new table.
>* Copying data from the old table to the new table.
>* Dropping the old table.
>* Renaming the new table.
>
>For more information, see the following resources:
> * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
> * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
> * [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
> * [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

---

## Seed the database

<!-- Next version put it in the Data folder -->
Create a new class named `SeedData` in the *Models* folder with the following code:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Models/SeedData.cs?name=snippet_1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

If there are any movies in the database, the seed initializer returns and no movies are added.

```csharp
if (context.Movie.Any())
{
    return;
}
```

<a name="si"></a>

### Add the seed initializer

Update the `Program.cs` with the following highlighted code:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/ProgramSeed.cs?name=snippet_all\\&highlight=3,13-18](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/ProgramSeed.cs?name=snippet_all_sl\\&highlight=3,13-18](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

In the previous code, `Program.cs` has been modified to do the following:

* Get a database context instance from the dependency injection (DI) container.
* Call the `seedData.Initialize` method, passing to it the database context instance.
* Dispose the context when the seed method completes. The [using statement](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/using-statement) ensures the context is disposed.

The following exception occurs when `Update-Database` has not been run:

> `SqlException: Cannot open database "RazorPagesMovieContext-" requested by the login. The login failed.`
> `Login failed for user 'user name'.`

### Test the app

Delete all the records in the database so the seed method will run. Stop and start the app to seed the database. If the database isn't seeded, put a breakpoint on `if (context.Movie.Any())` and step through the code.

The app shows the seeded data:

Movie application open in browser showing movie data

## Next steps

> 
> [Previous: Scaffolded Razor Pages](page.md)
> [Next: Update the pages](da1.md)




**Applies to: \= aspnetcore-6.0**

The `RazorPagesMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. The database context is registered with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in `Program.cs`:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Program.cs?name=snippet_di\\&highlight=8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Program.cs?name=snippet_di_sl\\&highlight=5-6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, configuration gets the connection string from the `appsettings.json` file.

# [Visual Studio](#tab/visual-studio)

The generated connection string is similar to the following JSON:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/appsettings.json?highlight=10-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/appsettings_SQLite.json?highlight=10-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB is a lightweight version of the SQL Server Express database engine that's targeted for program development. LocalDB starts on demand and runs in user mode, so there's no complex configuration. By default, LocalDB database creates `*.mdf` files in the `C:\Users\<user>\` directory.

<a name="ssox"></a>
1. From the **View** menu, open **SQL Server Object Explorer** (SSOX).

   View menu

1. Right-click on the `Movie` table and select **View Designer**:

   Contextual menus open on Movie table

   Movie tables open in Designer

   Note the key icon next to `ID`. By default, EF creates a property named `ID` for the primary key.

1. Right-click on the `Movie` table and select **View Data**:

   Movie table open showing table data

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world.

There are many third-party tools you can download to manage and view a SQLite database. The image below is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie database

> **Note:**
> For this tutorial, the Entity Framework Core *migrations* feature is used where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, the database is dropped and re-created.
>
>The workaround for the SQLite limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:
>
>* Creating a new table.
>* Copying data from the old table to the new table.
>* Dropping the old table.
>* Renaming the new table.
>
>For more information, see the following resources:
> * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
> * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
> * [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
> * [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

---

## Seed the database

<!-- Next version put it in the Data folder -->
Create a new class named `SeedData` in the *Models* folder with the following code:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/SeedData.cs?name=snippet_1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

If there are any movies in the database, the seed initializer returns and no movies are added.

```csharp
if (context.Movie.Any())
{
    return;
}
```

<a name="si"></a>

### Add the seed initializer

Update the `Program.cs` with the following highlighted code:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/ProgramSeed.cs?name=snippet_all\\&highlight=3,12-17](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/ProgramSeed.cs?name=snippet_all_sl\\&highlight=3,14-19](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

In the previous code, `Program.cs` has been modified to do the following:

* Get a database context instance from the dependency injection (DI) container.
* Call the `seedData.Initialize` method, passing to it the database context instance.
* Dispose the context when the seed method completes. The [using statement](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/using-statement) ensures the context is disposed.

The following exception occurs when `Update-Database` has not been run:

> `SqlException: Cannot open database "RazorPagesMovieContext-" requested by the login. The login failed.`
> `Login failed for user 'user name'.`

### Test the app

Delete all the records in the database so the seed method will run. Stop and start the app to seed the database. If the database isn't seeded, put a breakpoint on `if (context.Movie.Any())` and step through the code.

The app shows the seeded data:

Movie application open in browser showing movie data

## Next steps

> 
> [Previous: Scaffolded Razor Pages](page.md)
> [Next: Update the pages](da1.md)




**Applies to: \= aspnetcore-5.0**

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

The `RazorPagesMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. The database context is registered with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in the `ConfigureServices` method in `Startup.cs`:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Startup.cs?name=snippet_ConfigureServices\\&highlight=5-6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Startup.cs?name=snippet_UseSqlite\\&highlight=5-6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, configuration gets the connection string from the `appsettings.json` file.

# [Visual Studio](#tab/visual-studio)

The generated connection string is similar to the following JSON:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/appsettings.json?highlight=10-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/appsettings_SQLite.json?highlight=10-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB is a lightweight version of the SQL Server Express database engine that's targeted for program development. LocalDB starts on demand and runs in user mode, so there's no complex configuration. By default, LocalDB database creates `*.mdf` files in the `C:\Users\<user>\` directory.

<a name="ssox"></a>
1. From the **View** menu, open **SQL Server Object Explorer** (SSOX).

   View menu

1. Right-click on the `Movie` table and select **View Designer**:

   Contextual menus open on Movie table

   Movie tables open in Designer

   Note the key icon next to `ID`. By default, EF creates a property named `ID` for the primary key.

1. Right-click on the `Movie` table and select **View Data**:

   Movie table open showing table data

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world.

There are many third-party tools you can download to manage and view a SQLite database. The image below is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie database

> **Note:**
> For this tutorial, the Entity Framework Core *migrations* feature is used where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, the database is dropped and re-created.
>
>The workaround for the SQLite limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:
>
>* Creating a new table.
>* Copying data from the old table to the new table.
>* Dropping the old table.
>* Renaming the new table.
>
>For more information, see the following resources:
> * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
> * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
> * [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
> * [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

---

## Seed the database

Create a new class named `SeedData` in the *Models* folder with the following code:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Models/SeedData.cs?name=snippet_1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

If there are any movies in the database, the seed initializer returns and no movies are added.

```csharp
if (context.Movie.Any())
{
    return;
}
```

<a name="si"></a>

### Add the seed initializer

Replace the contents of the `Program.cs` with the following code:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

In the previous code, the `Main` method has been modified to do the following:

* Get a database context instance from the dependency injection container.
* Call the `seedData.Initialize` method, passing to it the database context instance.
* Dispose the context when the seed method completes. The [using statement](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/using-statement) ensures the context is disposed.

The following exception occurs when `Update-Database` has not been run:

> `SqlException: Cannot open database "RazorPagesMovieContext-" requested by the login. The login failed.`
> `Login failed for user 'user name'.`

### Test the app

# [Visual Studio](#tab/visual-studio)

1. Delete all the records in the database. Use the delete links in the browser or from [SSOX](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fnew-field%23ssox)

1. Force the app to initialize by calling the methods in the `Startup` class, so the seed method runs. To force initialization, IIS Express must be stopped and restarted. Stop and restart IIS with any of the following approaches:

   1. Right-click the IIS Express system tray icon in the notification area and select **Exit** or **Stop Site**:

      IIS Express system tray icon

      Contextual menu

   1. If the app is running in non-debug mode, press <kbd>F5</kbd> to run in debug mode.
   1. If the app in debug mode, stop the debugger and press <kbd>F5</kbd>.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

Delete all the records in the database, so the seed method will run. Stop and start the app to seed the database.

---

The app shows the seeded data:

Movie application open in browser showing movie data

## Next steps

> 
> [Previous: Scaffolded Razor Pages](page.md)
> [Next: Update the pages](da1.md)




**Applies to: < aspnetcore-5.0**

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

The `RazorPagesMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. The database context is registered with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in the `ConfigureServices` method in `Startup.cs`:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Startup.cs?name=snippet_ConfigureServices\\&highlight=5-6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Startup.cs?name=snippet_UseSqlite\\&highlight=5-6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, configuration gets the connection string from the `appsettings.json` file.

# [Visual Studio](#tab/visual-studio)

The generated connection string will be similar to the following:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/appsettings.json?highlight=10-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/appsettings_SQLite.json?highlight=10-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB is a lightweight version of the SQL Server Express database engine that's targeted for program development. LocalDB starts on demand and runs in user mode, so there's no complex configuration. By default, LocalDB database creates `*.mdf` files in the `C:\Users\<user>\` directory.

<a name="ssox"></a>
* From the **View** menu, open **SQL Server Object Explorer** (SSOX).

  View menu

* Right-click on the `Movie` table and select **View Designer**:

  Contextual menus open on Movie table

  Movie tables open in Designer

Note the key icon next to `ID`. By default, EF creates a property named `ID` for the primary key.

* Right-click on the `Movie` table and select **View Data**:

  Movie table open showing table data

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world.

There are many third-party tools you can download to manage and view a SQLite database. The image below is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie database

> **Note:**
> For this tutorial, the Entity Framework Core *migrations* feature is used where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only do the kinds of changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column is not supported. If a migration is created to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, the database is dropped and re-created.
>
>The workaround for the SQLite limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:
>
>* Creating a new table.
>* Copying data from the old table to the new table.
>* Dropping the old table.
>* Renaming the new table.
>
>For more information, see the following resources:
> * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
> * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
> * [Data seeding](https://learn.microsoft.com/ef/core/modeling/data-seeding)
> * [SQLite ALTER TABLE statement](https://sqlite.org/lang_altertable.html)

---

## Seed the database

Create a new class named `SeedData` in the *Models* folder with the following code:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Models/SeedData.cs?name=snippet_1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

If there are any movies in the database, the seed initializer returns and no movies are added.

```csharp
if (context.Movie.Any())
{
    return;
}
```

<a name="si"></a>

### Add the seed initializer

Replace the contents of the `Program.cs` with the following code:

[Code reference unavailable in this source snapshot: sql/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/sql.md)

In the previous code, the `Main` method has been modified to do the following:

* Get a database context instance from the dependency injection container.
* Call the `seedData.Initialize` method, passing to it the database context instance.
* Dispose the context when the seed method completes. The [using statement](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/using-statement) ensures the context is disposed.

The following exception occurs when `Update-Database` has not been run:

> `SqlException: Cannot open database "RazorPagesMovieContext-" requested by the login. The login failed.`
> `Login failed for user 'user name'.`

### Test the app

# [Visual Studio](#tab/visual-studio)

* Delete all the records in the database. Use the delete links in the browser or from [SSOX](https://learn.microsoft.com/search/?terms=tutorials%2Frazor-pages%2Fnew-field%23ssox).
* Force the app to initialize by calling the methods in the `Startup` class, so the seed method runs. To force initialization, IIS Express must be stopped and restarted. Stop and restart IIS with any of the following approaches:

  * Right-click the IIS Express system tray icon in the notification area and tap **Exit** or **Stop Site**:

    IIS Express system tray icon

    Contextual menu

    * If the app is running in non-debug mode, press <kbd>F5</kbd> to run in debug mode.
    * If the app in debug mode, stop the debugger and press <kbd>F5</kbd>.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

Delete all the records in the database, so the seed method will run. Stop and start the app to seed the database.

---

The app shows the seeded data:

Movie application open in Chrome showing movie data

## Next steps

> 
> [Previous: Scaffolded Razor Pages](page.md)
> [Next: Update the pages](da1.md)
