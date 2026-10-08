---
title: Part 5, work with a database in an ASP.NET Core MVC app
ai-usage: ai-assisted
author: wadepickett
description: Part 5 of tutorial series on ASP.NET Core MVC.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.custom: sfi-ropc-nochange
ms.date: 04/03/2026
uid: tutorials/first-mvc-app/working-with-sql
---

# Part 5, work with a database in an ASP.NET Core MVC app

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

## Introduction

This part of the tutorial series focuses on working with a SQL database in your ASP.NET Core MVC application.

You'll learn how to:

- Register and configure the Entity Framework Core database context for your ASP.NET Core MVC app.
- Work with database connection strings for local development.
- Use SQL Server Express LocalDB for development and examine your database and data using SQL Server Object Explorer.
- Seed your database with initial sample data.

## Prerequisite

This tutorial uses a database you set up in the previous step: [tutorials/first-mvc-app/adding-model](adding-model.md).

## Working with the database context

The `MvcMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. The database context is registered with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in the `Program.cs` file:

# [Visual Studio](#tab/visual-studio)

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Program.cs?name=snippet_FirstSQLServer\&highlight=2-3)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Program.cs.md)

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, it gets the connection string from the `appsettings.json` file:

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/appsettings.json?highlight=2\&range=9-11)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/appsettings.json.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Program.cs?name=snippet_FirstSQLite\&highlight=3-4)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Program.cs.md)

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString`. For local development, it gets the connection string from the `appsettings.json` file:

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/appsettings_SQLite.json?highlight=2\&range=9-11)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/appsettings_SQLite.json.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB:

* Is a lightweight version of the SQL Server Express Database Engine, installed by default with Visual Studio.
* Starts on demand by using a connection string.
* Is targeted for program development. It runs in user mode, so there's no complex configuration.
* By default creates *.mdf* files in the *C:/Users/{user}* directory.

### Examine the database

From the **View** menu, open **SQL Server Object Explorer** (SSOX).

Right-click on the `Movie` table (`dbo.Movie`) **> View Designer**

Right-click on the Movie table > View Designer.

Movie table open in Designer.

Note the key icon next to `ID`. By default, EF makes a property named `ID` the primary key.

Right-click on the `Movie` table **> View Data**

Right-click on the Movie table > View Data.

Movie table open showing no data.
-->

# [Visual Studio Code](#tab/visual-studio-code)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world.

There are many third party tools you can download to manage and view a SQLite database. The image below is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie db


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


---
<!-- End of VS tabs -->

## Seed the database

Create a new class named `SeedData` in the *Models* folder. Replace the generated code with the following:

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/mvcmovie10/Models/SeedData.cs?name=snippet_FirstVersion)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Models/SeedData.cs.md)

If there are any movies in the database, the seed initializer returns and no movies are added.

```csharp
if (context.Movie.Any())
{
    return;  // DB has been seeded.
}
```

<a name="si"></a>

### Add the seed initializer

# [Visual Studio](#tab/visual-studio)

Replace the contents of `Program.cs` with the following code. The new code is highlighted.

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Program.cs?name=snippet_SQLServerSeedData\&highlight=4,14-20)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Program.cs.md)

Test the app. Force the app to initialize, calling the code in the `Program.cs` file, so the seed method runs. To force initialization, close the command prompt window that Visual Studio opened, and restart by pressing Ctrl+F5.

# [Visual Studio Code](#tab/visual-studio-code)

Update `Program.cs` with the following highlighted code:

[Code example (complete source file; reference: \~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Program.cs?name=snippet_SQLiteSeedData\&highlight=4,15-20)](../../../_code/aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie10/Program.cs.md)

Test the app. Stop it and restart it so the `SeedData.Initialize` method runs and seeds the database.

---

The app shows the seeded data.

MVC Movie app open in Microsoft Edge showing movie data.

And a refresh of the `Movie` table shows the same data.

Movie table has seeded data.

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


> 
> [Previous: Adding a model](adding-model.md)
> [Next: Adding controller methods and views](controller-methods-views.md)



**Applies to: \= aspnetcore-9.0**

## Introduction

This part of the tutorial series focuses on working with a SQL database in your ASP.NET Core MVC application.

You'll learn how to:

- Register and configure the Entity Framework Core database context for your ASP.NET Core MVC app.
- Work with database connection strings for local development.
- Use SQL Server Express LocalDB for development and examine your database and data using SQL Server Object Explorer.
- Seed your database with initial sample data.

## Prerequisite

This tutorial uses a database you set up in the previous step: [tutorials/first-mvc-app/adding-model](adding-model.md).

## Working with the database context

The `MvcMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. The database context is registered with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in the `Program.cs` file:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie90/Program.cs?name=snippet_FirstSQLServer\\&highlight=2-3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, it gets the connection string from the `appsettings.json` file:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie90/appsettings.json?highlight=2\\&range=9-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie90/Program.cs?name=snippet_FirstSQLite\\&highlight=3-4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString`. For local development, it gets the connection string from the `appsettings.json` file:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie90/appsettings_SQLite.json?highlight=2\\&range=9-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB:

* Is a lightweight version of the SQL Server Express Database Engine, installed by default with Visual Studio.
* Starts on demand by using a connection string.
* Is targeted for program development. It runs in user mode, so there's no complex configuration.
* By default creates *.mdf* files in the *C:/Users/{user}* directory.

### Examine the database

From the **View** menu, open **SQL Server Object Explorer** (SSOX).

Right-click on the `Movie` table (`dbo.Movie`) **> View Designer**

Right-click on the Movie table > View Designer.

Movie table open in Designer

Note the key icon next to `ID`. By default, EF makes a property named `ID` the primary key.

Right-click on the `Movie` table **> View Data**

Right-click on the Movie table > View Data.

Movie table open showing table data
-->

# [Visual Studio Code](#tab/visual-studio-code)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world.

There are many third party tools you can download to manage and view a SQLite database. The image below is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie db


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


---
<!-- End of VS tabs -->

## Seed the database

Create a new class named `SeedData` in the *Models* folder. Replace the generated code with the following:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/mvcmovie90/Models/SeedData.cs?name=snippet_FirstVersion](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

If there are any movies in the database, the seed initializer returns and no movies are added.

```csharp
if (context.Movie.Any())
{
    return;  // DB has been seeded.
}
```

<a name="si"></a>

### Add the seed initializer

# [Visual Studio](#tab/visual-studio)

Replace the contents of `Program.cs` with the following code. The new code is highlighted.

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie90/Program.cs?name=snippet_SQLServerSeedData\\&highlight=4,14-20](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

Delete all the records in the database. You can do this with the delete links in the browser or from SSOX.

Test the app. Force the app to initialize, calling the code in the `Program.cs` file, so the seed method runs. To force initialization, close the command prompt window that Visual Studio opened, and restart by pressing Ctrl+F5.

# [Visual Studio Code](#tab/visual-studio-code)

Update `Program.cs` with the following highlighted code:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie90/Program.cs?name=snippet_SQLiteSeedData\\&highlight=4,15-20](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

Delete all the records in the database.

Test the app. Stop it and restart it so the `SeedData.Initialize` method runs and seeds the database.

---

The app shows the seeded data.

MVC Movie app open in Microsoft Edge showing movie data

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


> 
> [Previous: Adding a model](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql/includes/~/tutorials/first-mvc-app/adding-model.md)
> [Next: Adding controller methods and views](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql/includes/~/tutorials/first-mvc-app/controller-methods-views.md)




**Applies to: \= aspnetcore-8.0**

## Introduction

This part of the tutorial series focuses on working with a SQL database in your ASP.NET Core MVC application.

You'll learn how to:

- Register and configure the Entity Framework Core database context for your ASP.NET Core MVC app.
- Work with database connection strings for local development.
- Use SQL Server Express LocalDB for development and examine your database and data using SQL Server Object Explorer.
- Seed your database with initial sample data.

## Prerequisite

This tutorial uses a database you set up in the previous step: [tutorials/first-mvc-app/adding-model](adding-model.md).

## Working with the database context

The `MvcMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. The database context is registered with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in the `Program.cs` file:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie80/Program.cs?name=snippet_FirstSQLServer\\&highlight=3-4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, it gets the connection string from the `appsettings.json` file:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie80/appsettings.json?highlight=2\\&range=9-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie80/Program.cs?name=snippet_FirstSQLite\\&highlight=3-4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString`. For local development, it gets the connection string from the `appsettings.json` file:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie80/appsettings_SQLite.json?highlight=2\\&range=9-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB:

* Is a lightweight version of the SQL Server Express Database Engine, installed by default with Visual Studio.
* Starts on demand by using a connection string.
* Is targeted for program development. It runs in user mode, so there's no complex configuration.
* By default creates *.mdf* files in the *C:/Users/{user}* directory.

### Examine the database

From the **View** menu, open **SQL Server Object Explorer** (SSOX).

Right-click on the `Movie` table (`dbo.Movie`) **> View Designer**

Right-click on the Movie table > View Designer.

Movie table open in Designer

Note the key icon next to `ID`. By default, EF makes a property named `ID` the primary key.

Right-click on the `Movie` table **> View Data**

Right-click on the Movie table > View Data.

Movie table open showing table data
-->

# [Visual Studio Code](#tab/visual-studio-code)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world.

There are many third party tools you can download to manage and view a SQLite database. The image below is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie db


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


---
<!-- End of VS tabs -->

## Seed the database

Create a new class named `SeedData` in the *Models* folder. Replace the generated code with the following:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/mvcmovie80/Models/SeedData.cs?name=snippet_FirstVersion](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

If there are any movies in the database, the seed initializer returns and no movies are added.

```csharp
if (context.Movie.Any())
{
    return;  // DB has been seeded.
}
```

<a name="si"></a>

### Add the seed initializer

# [Visual Studio](#tab/visual-studio)

Replace the contents of `Program.cs` with the following code. The new code is highlighted.

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie80/Program.cs?name=snippet_SQLServerSeedData\\&highlight=4,16-21](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

Delete all the records in the database. You can do this with the delete links in the browser or from SSOX.

Test the app. Force the app to initialize, calling the code in the `Program.cs` file, so the seed method runs. To force initialization, close the command prompt window that Visual Studio opened, and restart by pressing Ctrl+F5.

# [Visual Studio Code](#tab/visual-studio-code)

Update `Program.cs` with the following highlighted code:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie80/Program.cs?name=snippet_SQLiteSeedData\\&highlight=4,16-21](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

Delete all the records in the database.

Test the app. Stop it and restart it so the `SeedData.Initialize` method runs and seeds the database.

---

The app shows the seeded data.

MVC Movie app open in Microsoft Edge showing movie data

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


> 
> [Previous: Adding a model](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql/includes/~/tutorials/first-mvc-app/adding-model.md)
> [Next: Adding controller methods and views](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql/includes/~/tutorials/first-mvc-app/controller-methods-views.md)




**Applies to: \= aspnetcore-7.0**

## Introduction

This part of the tutorial series focuses on working with a SQL database in your ASP.NET Core MVC application.

You'll learn how to:

- Register and configure the Entity Framework Core database context for your ASP.NET Core MVC app.
- Work with database connection strings for local development.
- Use SQL Server Express LocalDB for development and examine your database and data using SQL Server Object Explorer.
- Seed your database with initial sample data.

## Prerequisite

This tutorial uses a database you set up in the previous step: [tutorials/first-mvc-app/adding-model](adding-model.md).

## Working with the database context

The `MvcMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. The database context is registered with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in the `Program.cs` file:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Program.cs?name=snippet_FirstSQLServer\\&highlight=3-4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, it gets the connection string from the `appsettings.json` file:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/appsettings.json?highlight=2\\&range=9-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Program.cs?name=snippet_FirstSQLite\\&highlight=3-4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString`. For local development, it gets the connection string from the `appsettings.json` file:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/appsettings_SQLite.json?highlight=2\\&range=9-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB:

* Is a lightweight version of the SQL Server Express Database Engine, installed by default with Visual Studio.
* Starts on demand by using a connection string.
* Is targeted for program development. It runs in user mode, so there's no complex configuration.
* By default creates *.mdf* files in the *C:/Users/{user}* directory.

### Examine the database

From the **View** menu, open **SQL Server Object Explorer** (SSOX).

Right-click on the `Movie` table (`dbo.Movie`) **> View Designer**

Right-click on the Movie table > View Designer.

Movie table open in Designer

Note the key icon next to `ID`. By default, EF makes a property named `ID` the primary key.

Right-click on the `Movie` table **> View Data**

Right-click on the Movie table > View Data.

Movie table open showing table data
-->

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world.

There are many third party tools you can download to manage and view a SQLite database. The image below is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie db


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


---
<!-- End of VS tabs -->

## Seed the database

Create a new class named `SeedData` in the *Models* folder. Replace the generated code with the following:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Models/SeedData.cs?name=snippet_FirstVersion](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

If there are any movies in the database, the seed initializer returns and no movies are added.

```csharp
if (context.Movie.Any())
{
    return;  // DB has been seeded.
}
```

<a name=snippet_"si"></a>

### Add the seed initializer

# [Visual Studio](#tab/visual-studio)

Replace the contents of `Program.cs` with the following code. The new code is highlighted.

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Program.cs?name=snippet_SQLServerSeedData\\&highlight=4,16-21](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

Delete all the records in the database. You can do this with the delete links in the browser or from SSOX.

Test the app. Force the app to initialize, calling the code in the `Program.cs` file, so the seed method runs. To force initialization, close the command prompt window that Visual Studio opened, and restart by pressing Ctrl+F5.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

Update `Program.cs` with the following highlighted code:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie70/Program.cs?name=snippet_SQLiteSeedData\\&highlight=4,16-21](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

Delete all the records in the database.

Test the app. Stop it and restart it so the `SeedData.Initialize` method runs and seeds the database.

---

The app shows the seeded data.

MVC Movie app open in Microsoft Edge showing movie data

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


> 
> [Previous: Adding a model](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql/includes/~/tutorials/first-mvc-app/adding-model.md)
> [Next: Adding controller methods and views](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql/includes/~/tutorials/first-mvc-app/controller-methods-views.md)




**Applies to: \= aspnetcore-6.0**

## Introduction

This part of the tutorial series focuses on working with a SQL database in your ASP.NET Core MVC application.

You'll learn how to:

- Register and configure the Entity Framework Core database context for your ASP.NET Core MVC app.
- Work with database connection strings for local development.
- Use SQL Server Express LocalDB for development and examine your database and data using SQL Server Object Explorer.
- Seed your database with initial sample data.

## Prerequisite

This tutorial uses a database you set up in the previous step: [tutorials/first-mvc-app/adding-model](adding-model.md).

## Working with the database context

The `MvcMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. The database context is registered with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in the `Program.cs` file:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Program.cs?name=FirstSQLServer\\&highlight=3-4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, it gets the connection string from the `appsettings.json` file:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/appsettings.json?highlight=2\\&range=9-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Program.cs?name=FirstSQLite\\&highlight=3-4](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString`. For local development, it gets the connection string from the `appsettings.json` file:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/appsettings_SQLite.json?highlight=2\\&range=9-11](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB:

* Is a lightweight version of the SQL Server Express Database Engine, installed by default with Visual Studio.
* Starts on demand by using a connection string.
* Is targeted for program development. It runs in user mode, so there's no complex configuration.
* By default creates *.mdf* files in the *C:/Users/{user}* directory.

<!--
Temporarily commented out because SSOX isn't available in VS 2022 Preview
### Examine the database

From the **View** menu, open **SQL Server Object Explorer** (SSOX).

![View menu](~/tutorials/first-mvc-app/working-with-sql/_static/ssox5.png)

Right-click on the `Movie` table **> View Designer**

![Right-click on the Movie table > View Designer.](~/tutorials/first-mvc-app/working-with-sql/_static/design.png)

![Movie table open in Designer](~/tutorials/first-mvc-app/working-with-sql/_static/dv.png)

Note the key icon next to `ID`. By default, EF makes a property named `ID` the primary key.

Right-click on the `Movie` table **> View Data**

![Right-click on the Movie table > View Data.](~/tutorials/first-mvc-app/working-with-sql/_static/ssox2.png)

![Movie table open showing table data](~/tutorials/first-mvc-app/working-with-sql/_static/vd22.png)
-->

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world.

There are many third party tools you can download to manage and view a SQLite database. The image below is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie db


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


---
<!-- End of VS tabs -->

## Seed the database

Create a new class named `SeedData` in the *Models* folder. Replace the generated code with the following:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Models/SeedData.cs?name=FirstVersion](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

If there are any movies in the database, the seed initializer returns and no movies are added.

```csharp
if (context.Movie.Any())
{
    return;  // DB has been seeded.
}
```

<a name="si"></a>

### Add the seed initializer

# [Visual Studio](#tab/visual-studio)

Replace the contents of `Program.cs` with the following code. The new code is highlighted.

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Program.cs?name=SQLServerSeedData\\&highlight=4,16-21](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

Delete all the records in the database. You can do this with the delete links in the browser or from SSOX.

Test the app. Force the app to initialize, calling the code in the `Program.cs` file, so the seed method runs. To force initialization, close the command prompt window that Visual Studio opened, and restart by pressing Ctrl+F5.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

Update `Program.cs` with the following highlighted code:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Program.cs?name=SQLiteSeedData\\&highlight=4,16-21](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

Delete all the records in the database.

Test the app. Stop it and restart it so the `SeedData.Initialize` method runs and seeds the database.

---

The app shows the seeded data.

MVC Movie app open in Microsoft Edge showing movie data

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


> 
> [Previous: Adding a model](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql/includes/~/tutorials/first-mvc-app/adding-model.md)
> [Next: Adding controller methods and views](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql/includes/~/tutorials/first-mvc-app/controller-methods-views.md)



**Applies to: \>= aspnetcore-3.1 < aspnetcore-6.0**

## Introduction

This part of the tutorial series focuses on working with a SQL database in your ASP.NET Core MVC application.

You'll learn how to:

- Register and configure the Entity Framework Core database context for your ASP.NET Core MVC app.
- Work with database connection strings for local development.
- Use SQL Server Express LocalDB for development and examine your database and data using SQL Server Object Explorer.
- Seed your database with initial sample data.

## Prerequisite

This tutorial uses a database you set up in the previous step: [tutorials/first-mvc-app/adding-model](adding-model.md).

## Working with the database context

The `MvcMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. The database context is registered with the [Dependency Injection](../../fundamentals/dependency-injection.md) container in the `ConfigureServices` method in the `Startup.cs` file:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie3/Startup.cs?name=snippet_ConfigureServices\\&highlight=5-6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString` key. For local development, it gets the connection string from the `appsettings.json` file:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie/appsettings.json?highlight=2\\&range=8-10](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie3/Startup.cs?name=snippet_UseSqlite\\&highlight=5-6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

The ASP.NET Core [Configuration](../../fundamentals/configuration/index.md) system reads the `ConnectionString`. For local development, it gets the connection string from the `appsettings.json` file:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie22/appsettingsSQLite.json?highlight=2\\&range=8-10](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


# [Visual Studio](#tab/visual-studio)

## SQL Server Express LocalDB

LocalDB:

* Is a lightweight version of the SQL Server Express Database Engine, installed by default with Visual Studio.
* Starts on demand by using a connection string.
* Is targeted for program development. It runs in user mode, so there's no complex configuration.
* By default creates *.mdf* files in the *C:/Users/{user}* directory.

### Examine the database

From the **View** menu, open **SQL Server Object Explorer** (SSOX).

View menu

Right-click on the `Movie` table **> View Designer**

Right-click on the Movie table > View Designer

Movie table open in Designer

Note the key icon next to `ID`. By default, EF makes a property named `ID` the primary key.

Right-click on the `Movie` table **> View Data**

Right-click on the Movie table > View Data

Movie table open showing table data

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

## SQLite

The [SQLite](https://www.sqlite.org/) website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. SQLite is the most used database engine in the world.

There are many third party tools you can download to manage and view a SQLite database. The image below is from [DB Browser for SQLite](https://sqlitebrowser.org/). If you have a favorite SQLite tool, leave a comment on what you like about it.

DB Browser for SQLite showing movie db


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


---
<!-- End of VS tabs -->

## Seed the database

Create a new class named `SeedData` in the *Models* folder. Replace the generated code with the following:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie3/Models/SeedData.cs?name=snippet_1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

If there are any movies in the database, the seed initializer returns and no movies are added.

```csharp
if (context.Movie.Any())
{
    return;  // DB has been seeded.
}
```

<a name="si"></a>

### Add the seed initializer

Replace the contents of `Program.cs` with the following code:

[Code reference unavailable in this source snapshot: working-with-sql/includes/~/tutorials/first-mvc-app/start-mvc/sample/MvcMovie3/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql.md)

Test the app.

# [Visual Studio](#tab/visual-studio)

Delete all the records in the database. You can do this with the delete links in the browser or from SSOX.

Force the app to initialize, calling the methods in the `Startup` class, so the seed method runs. To force initialization, IIS Express must be stopped and restarted. You can do this with any of the following approaches:

* Right-click the IIS Express system tray icon in the notification area and tap **Exit** or **Stop Site**:

  IIS Express system tray icon

  Contextual menu

    * If you were running VS in non-debug mode, press F5 to run in debug mode
    * If you were running VS in debug mode, stop the debugger and press F5

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

Delete all the records in the database. Stop and start the app  so the `SeedData.Initialize` method runs and seeds the database.

---

The app shows the seeded data.

MVC Movie app open in Microsoft Edge showing movie data

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. [See this GitHub comment 4076](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-1153254062) for instructions on adding decimal comma.


> 
> [Previous: Adding a model](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql/includes/~/tutorials/first-mvc-app/adding-model.md)
> [Next: Adding controller methods and views](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/first-mvc-app/working-with-sql/includes/~/tutorials/first-mvc-app/controller-methods-views.md)
