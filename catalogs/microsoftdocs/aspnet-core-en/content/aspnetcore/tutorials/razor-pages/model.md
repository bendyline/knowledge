---
title: Part 2, add a model
author: wadepickett
description: Part 2 of tutorial series on Razor Pages. In this section, model classes are added.
ms.author: wpickett
ms.date: 01/07/2026
monikerRange: '>= aspnetcore-3.1'
uid: tutorials/razor-pages/model
---
# Part 2, add a model to a Razor Pages app in ASP.NET Core

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

In this tutorial, you add classes for managing movies in a database. The app's model classes use [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core) to work with the database. EF Core is an object-relational mapper (O/RM) that simplifies data access. You write the model classes first, and EF Core creates the database.

The model classes are known as POCO classes (from "**P**lain-**O**ld **C**LR **O**bjects") because they don't have a dependency on EF Core. They define the properties of the data that are stored in the database.

## Add a data model

# [Visual Studio](#tab/visual-studio)

1. In **Solution Explorer**, right-click the *RazorPagesMovie* project. Select **Add** > **New Folder**. Name the folder `Models`.
1. Right-click the `Models` folder. Select **Add** > **Class**. Name the class *Movie*.
1. Add the following properties to the `Movie` class:

   [Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/Movie.cs?name=snippet1)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/Movie.cs.md)

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* A [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute that specifies the type of data in the `ReleaseDate` property. By using this attribute:

  * The user isn't required to enter time information in the date field.
  * Only the date is displayed, without any time information.
* A question mark after `string` indicates that the property is nullable. For more information, see [Nullable reference types](https://learn.microsoft.com/dotnet/csharp/nullable-references).

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

Build the project to verify there are no compilation errors.

# [Visual Studio Code](#tab/visual-studio-code)

1. Add a folder named `Models`.
1. Add a class to the `Models` folder named `Movie.cs`.

Add the following properties to the `Movie` class:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/Movie.cs?name=snippet1)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/Movie.cs.md)

The `Movie` class contains:

* An `ID` field that acts as the primary key for the database.
* A [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute that specifies the type of data in the `ReleaseDate` field. By using this attribute:

  * The user doesn't need to enter time information in the date field.
  * Only the date is displayed, without any time information.
* A question mark after `string` indicates that the property is nullable. For more information, see [Nullable reference types](https://learn.microsoft.com/dotnet/csharp/nullable-references).

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

### Add NuGet packages and EF tools

Run the following .NET CLI commands:

```dotnetcli
dotnet tool uninstall --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool uninstall --global dotnet-ef
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

The preceding commands add:
* The [command-line interface (CLI) tools for EF Core](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet)
* The [aspnet-codegenerator scaffolding tool](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).
* Design time tools for EF Core
* The EF Core SQLite provider, which installs the EF Core package as a dependency.
* Packages needed for scaffolding: `Microsoft.VisualStudio.Web.CodeGeneration.Design` and `Microsoft.EntityFrameworkCore.SqlServer`.

For guidance on multiple environment configuration that permits an app to configure its database contexts by environment, see [fundamentals/environments#environment-based-startup-class-and-methods](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23environment-based-startup-class-and-methods).

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.



In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

In the *Panel* below the editor region, select the *PROBLEMS* tab, or from the *View* menu, select *Problems* if it's not currently in view. Verify there are no compilation errors.

---

## Scaffold the movie model

In this section, you scaffold the movie model. The scaffolding tool generates pages for Create, Read, Update, and Delete (CRUD) operations for the movie model.

# [Visual Studio](#tab/visual-studio)

1. Create the *Pages/Movies* folder:
   1. Right-click on the *Pages* folder > **Add** > **New Folder**.
   1. Name the folder *Movies*.

1. Right-click on the *Pages/Movies* folder > **Add** > **New Scaffolded Item**.

  New Scaffolded Item.

1. In the **Add New Scaffold** dialog, select **Razor Pages using Entity Framework (CRUD)** > **Add**.

  Add Scaffold.

1. Complete the **Add Razor Pages using Entity Framework (CRUD)** dialog:
   1. In the **Model class** drop down, select **Movie (RazorPagesMovie.Models)**.
   1. In the **Data context class** row, select the **+** (plus) sign.
      1. In the **Add Data Context** dialog, the class name `RazorPagesMovie.Data.RazorPagesMovieContext` is generated.
      1. In the **Database provider** drop down, select **SQL Server**.
   1. Select **Add**.

   Add Razor Pages.

The `appsettings.json` file is updated with the connection string used to connect to a local database.

# [Visual Studio Code](#tab/visual-studio-code)

* Open a command shell to the project directory, which contains the `Program.cs` and `.csproj` files. Run the following command:

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Movie -dc RazorPagesMovie.Data.RazorPagesMovieContext -udl -outDir Pages/Movies --referenceScriptLibraries --databaseProvider sqlite
  ```

The following table details the ASP.NET Core code generator options.

| Option | Description |
| --- | --- |
| `-m` | The name of the model. |
| `-dc` | The `DbContext` class to use including namespace. |
| `-udl` | Use the default layout. |
| `-outDir` | The relative output folder path to create the views. |
| `--referenceScriptLibraries` | Adds `_ValidationScriptsPartial` to Edit and Create pages |

Use the `-h` option to get help on the `dotnet aspnet-codegenerator razorpage` command:

```dotnetcli
dotnet aspnet-codegenerator razorpage -h
```

For more information, see [dotnet aspnet-codegenerator](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).

<h3 id="sqlite-ss-6">Use SQLite for development, SQL Server for production</h3>

When SQLite is selected, the template generated code is ready for development. The following code shows how to select the SQLite connection string in development and SQL Server in production.

[Code reference unavailable in this source snapshot: ../../includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/ProgramProd.cs?name=snippet\\&highlight=7-16](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code doesn't call `UseDeveloperExceptionPage` in development because `WebApplication` calls `UseDeveloperExceptionPage` in development mode.

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


### Files created and updated

The scaffold process creates the following files:

* *Pages/Movies*: Create, Delete, Details, Edit, and Index.
* `Data/RazorPagesMovieContext.cs`

The next tutorial explains the created files.

The scaffold process adds the following highlighted code to the `Program.cs` file:

# [Visual Studio](#tab/visual-studio)
[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program.cs?name=snippet_all\&highlight=1-3,8-9)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)
[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program.cs?name=snippet_all_sl\&highlight=1-3,8-9)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program.cs.md)

---

Later in this tutorial, you learn about the `Program.cs` changes.


## Create the initial database schema by using EF's migration feature

The migrations feature in Entity Framework Core provides a way to:

* Create the initial database schema.
* Incrementally update the database schema to keep it in sync with the app's data model.  This approach preserves existing data in the database.

# [Visual Studio](#tab/visual-studio)

In this section, use the **Package Manager Console** (PMC) window to:

* Add an initial migration.
* Update the database with the initial migration.

* From the **Tools** menu, select **NuGet Package Manager** > **Package Manager Console**.

  PMC menu.

* In the PMC, enter the following command:

  ```powershell
  Add-Migration InitialCreate
  ```

* The `Add-Migration` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument names the migration. You can use any name, but by convention choose a name that describes the migration.

The following warning is displayed, which you address in a later step:

> No store type was specified for the decimal column 'Price' on entity type 'Movie'. This condition causes values to be silently truncated if they don't fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values in 'OnModelCreating' by using 'HasColumnType', specify precision and scale using 'HasPrecision', or configure a value converter using 'HasConversion'.

* In the PMC, enter the following command:

  ```powershell
  Update-Database
  ```
  The `Update-Database` command runs the `Up` method in migrations that aren't applied. In this case, the command runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

# [Visual Studio Code](#tab/visual-studio-code)

* Right-click the *RazorPagesMovie.csproj* project, and then select **Open in Integrated Terminal**.

  The **Terminal** window opens with the command prompt at the project directory, which contains the Program.cs and .csproj files.

* Run the following .NET CLI command:

  ```dotnetcli
  dotnet ef migrations add InitialCreate
  ```

  The `migrations` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument is used to name the migrations. You can use any name, but by convention, choose a name that describes the migration.

* Run the following .NET CLI command:

  ```dotnetcli
  dotnet ef database update
  ```
  The `update` command runs the `Up` method in migrations that aren't applied. In this case, `update` runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

> **Note:**
> For SQLite, the column type for the `Price` field is set to `TEXT`. This issue is resolved in a later step.

---

The data context `RazorPagesMovieContext`:

* Derives from [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext).
* Specifies which entities are included in the data model.
* Coordinates EF Core functionality, such as Create, Read, Update, and Delete, for the `Movie` model.

The `RazorPagesMovieContext` class in the generated file `Data/RazorPagesMovieContext.cs`:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Data/RazorPagesMovieContext.cs)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Data/RazorPagesMovieContext.cs.md)

The preceding code creates a [DbSet\<Movie>](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%25601) property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed to the context by calling a method on a [DbContextOptions](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptions) object. For local development, the [Configuration system](../../fundamentals/configuration/index.md) reads the connection string from the `appsettings.json` file.

## Test the app

1. Run the app and append `/Movies` to the URL in the browser (`http://localhost:port/movies`).

   If you receive the following error:

   ```console
   SqlException: Cannot open database "RazorPagesMovieContext-GUID" requested by the login. The login failed.
   Login failed for user 'User-name'.
   ```

   You missed the [migrations step](#create-the-initial-database-schema-by-using-efs-migration-feature).

1. Test the **Create New** link.

  Create page.

   > **Note:**
   > You might not be able to enter decimal commas in the `Price` field. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point and for non US-English date formats, the app must be globalized. For globalization instructions, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-326590420).

1. Test the **Edit**, **Details**, and **Delete** links.

The next tutorial explains the files created by scaffolding.

### Examine the context registered with dependency injection

ASP.NET Core is built with [dependency injection](../../fundamentals/dependency-injection.md). Register services, such as the EF Core database context, with dependency injection during application startup. Provide components that require these services (such as Razor Pages) via constructor parameters. The constructor code that gets a database context instance is shown later in the tutorial.

The scaffolding tool automatically creates a database context and registers it with the dependency injection container. The following highlighted code is added to the `Program.cs` file by the scaffolder:

# [Visual Studio](#tab/visual-studio)
[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program.cs?name=snippet_all\&highlight=8-9)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)
[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program.cs?name=snippet_all_sl\&highlight=8-9)](../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Program.cs.md)

---

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie10) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

> 
> [Previous: Get Started](razor-pages-start.md)
> [Next: Scaffolded Razor Pages](page.md)



**Applies to: \= aspnetcore-9.0**

In this tutorial, classes are added for managing movies in a database. The app's model classes use [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core) to work with the database. EF Core is an object-relational mapper (O/RM) that simplifies data access. You write the model classes first, and EF Core creates the database.

The model classes are known as POCO classes (from "**P**lain-**O**ld **C**LR **O**bjects") because they don't have a dependency on EF Core. They define the properties of the data that are stored in the database.

## Add a data model

# [Visual Studio](#tab/visual-studio)

1. In **Solution Explorer**, right-click the *RazorPagesMovie* project > **Add** > **New Folder**. Name the folder `Models`.
1. Right-click the `Models` folder. Select **Add** > **Class**. Name the class *Movie*.
1. Add the following properties to the `Movie` class:

   [Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* A [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute that specifies the type of data in the `ReleaseDate` property. With this attribute:

  * The user isn't required to enter time information in the date field.
  * Only the date is displayed, not time information.
* The question mark after `string` indicates that the property is nullable. For more information, see [Nullable reference types](https://learn.microsoft.com/dotnet/csharp/nullable-references).

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

Build the project to verify there are no compilation errors.

# [Visual Studio Code](#tab/visual-studio-code)

1. Add a folder named `Models`.
1. Add a class to the `Models` folder named `Movie.cs`.

Add the following properties to the `Movie` class:

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* An `ID` field to provide a primary key for the database.
* A [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute to specify the type of data in the `ReleaseDate` field. With this attribute:

  * The user is not required to enter time information in the date field.
  * Only the date is displayed, not time information.
* The question mark after `string` indicates that the property is nullable. For more information, see [Nullable reference types](https://learn.microsoft.com/dotnet/csharp/nullable-references).

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

<a name="dc7"></a>

### Add NuGet packages and EF tools

Run the following .NET CLI commands:

```dotnetcli
dotnet tool uninstall --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool uninstall --global dotnet-ef
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

The preceding commands add:
* The [command-line interface (CLI) tools for EF Core](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet)
* The [aspnet-codegenerator scaffolding tool](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).
* Design time tools for EF Core
* The EF Core SQLite provider, which installs the EF Core package as a dependency.
* Packages needed for scaffolding: `Microsoft.VisualStudio.Web.CodeGeneration.Design` and `Microsoft.EntityFrameworkCore.SqlServer`.

For guidance on multiple environment configuration that permits an app to configure its database contexts by environment, see [fundamentals/environments#environment-based-startup-class-and-methods](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23environment-based-startup-class-and-methods).

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.



In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

In the *Panel* below the editor region, select the *PROBLEMS* tab, or from the *View* menu, select *Problems* if it is not currently in view. Verify there are no compilation errors.

---

## Scaffold the movie model

In this section, the movie model is scaffolded. That is, the scaffolding tool produces pages for Create, Read, Update, and Delete (CRUD) operations for the movie model.

# [Visual Studio](#tab/visual-studio)

1. Create the *Pages/Movies* folder:
   1. Right-click on the *Pages* folder > **Add** > **New Folder**.
   1. Name the folder *Movies*.

1. Right-click on the *Pages/Movies* folder > **Add** > **New Scaffolded Item**.

   New Scaffolded Item

1. In the **Add New Scaffold** dialog, select **Razor Pages using Entity Framework (CRUD)** > **Add**.

   Add Scaffold

1. Complete the **Add Razor Pages using Entity Framework (CRUD)** dialog:
   1. In the **Model class** drop down, select **Movie (RazorPagesMovie.Models)**.
   1. In the **Data context class** row, select the **+** (plus) sign.
      1. In the **Add Data Context** dialog, the class name `RazorPagesMovie.Data.RazorPagesMovieContext` is generated.
      1. In the **Database provider** drop down, select **SQL Server**.
   1. Select **Add**.

   Add Razor Pages

The `appsettings.json` file is updated with the connection string used to connect to a local database.

# [Visual Studio Code](#tab/visual-studio-code)

* Open a command shell to the project directory, which contains the `Program.cs` and `.csproj` files. Run the following command:

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Movie -dc RazorPagesMovie.Data.RazorPagesMovieContext -udl -outDir Pages/Movies --referenceScriptLibraries --databaseProvider sqlite
  ```

<a name="codegenerator"></a>
The following table details the ASP.NET Core code generator options.

| Option | Description |
| --- | --- |
| `-m` | The name of the model. |
| `-dc` | The `DbContext` class to use including namespace. |
| `-udl` | Use the default layout. |
| `-outDir` | The relative output folder path to create the views. |
| `--referenceScriptLibraries` | Adds `_ValidationScriptsPartial` to Edit and Create pages |

Use the `-h` option to get help on the `dotnet aspnet-codegenerator razorpage` command:

```dotnetcli
dotnet aspnet-codegenerator razorpage -h
```

For more information, see [dotnet aspnet-codegenerator](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).

<h3 id="sqlite-ss-6">Use SQLite for development, SQL Server for production</h3>

When SQLite is selected, the template generated code is ready for development. The following code shows how to select the SQLite connection string in development and SQL Server in production.

[Code reference unavailable in this source snapshot: ../../includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/ProgramProd.cs?name=snippet\\&highlight=7-16](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code doesn't call `UseDeveloperExceptionPage` in development because `WebApplication` calls `UseDeveloperExceptionPage` in development mode.

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


### Files created and updated

The scaffold process creates the following files:

* *Pages/Movies*: Create, Delete, Details, Edit, and Index.
* `Data/RazorPagesMovieContext.cs`

The created files are explained in the next tutorial.

The scaffold process adds the following highlighted code to the `Program.cs` file:

# [Visual Studio](#tab/visual-studio)
[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Program.cs?name=snippet_all\\&highlight=1-3,8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

# [Visual Studio Code](#tab/visual-studio-code)
[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Program.cs?name=snippet_all_sl\\&highlight=1-3,8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

---

The `Program.cs` changes are explained later in this tutorial.


<a name="pmc7"></a>

## Create the initial database schema using EF's migration feature

The migrations feature in Entity Framework Core provides a way to:

* Create the initial database schema.
* Incrementally update the database schema to keep it in sync with the app's data model.  Existing data in the database is preserved.

# [Visual Studio](#tab/visual-studio)

In this section, the **Package Manager Console** (PMC) window is used to:

* Add an initial migration.
* Update the database with the initial migration.

* From the **Tools** menu, select **NuGet Package Manager** > **Package Manager Console**.

  PMC menu

* In the PMC, enter the following command:

  ```powershell
  Add-Migration InitialCreate
  ```

* The `Add-Migration` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument is used to name the migration. Any name can be used, but by convention a name is selected that describes the migration.

The following warning is displayed, which is addressed in a later step:

> No type was specified for the decimal column 'Price' on entity type 'Movie'. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values using 'HasColumnType()'.

* In the PMC, enter the following command:

  ```powershell
  Update-Database
  ```
  The `Update-Database` command runs the `Up` method in migrations that have not been applied. In this case, the command runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

# [Visual Studio Code](#tab/visual-studio-code)

* Right-click the *RazorPagesMovie.csproj* project, and then select **Open in Integrated Terminal**.

  The **Terminal** window opens with the command prompt at the project directory, which contains the Program.cs and .csproj files.

* Run the following .NET CLI command:

  ```dotnetcli
  dotnet ef migrations add InitialCreate
  ```

  The `migrations` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument is used to name the migrations. Any name can be used, but by convention a name is selected that describes the migration.

* Run the following .NET CLI command:

  ```dotnetcli
  dotnet ef database update
  ```
  The `update` command runs the `Up` method in migrations that have not been applied. In this case, `update` runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

> **Note:**
> For SQLite, column type for the `Price` field is set to `TEXT`. This is resolved in a later step.

---

The data context `RazorPagesMovieContext`:

* Derives from [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext).
* Specifies which entities are included in the data model.
* Coordinates EF Core functionality, such as Create, Read, Update and Delete, for the `Movie` model.

The `RazorPagesMovieContext` class in the generated file `Data/RazorPagesMovieContext.cs`:

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Data/RazorPagesMovieContext.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code creates a [DbSet\<Movie>](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%25601) property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed in to the context by calling a method on a [DbContextOptions](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptions) object. For local development, the [Configuration system](../../fundamentals/configuration/index.md) reads the connection string from the `appsettings.json` file.

<a name="test7"></a>

## Test the app

1. Run the app and append `/Movies` to the URL in the browser (`http://localhost:port/movies`).

   If you receive the following error:

   ```console
   SqlException: Cannot open database "RazorPagesMovieContext-GUID" requested by the login. The login failed.
   Login failed for user 'User-name'.
   ```

   You missed the [migrations step](#pmc6).

1. Test the **Create New** link.

   Create page

   > **Note:**
   > You may not be able to enter decimal commas in the `Price` field. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point and for non US-English date formats, the app must be globalized. For globalization instructions, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-326590420).

1. Test the **Edit**, **Details**, and **Delete** links.

The next tutorial explains the files created by scaffolding.

### Examine the context registered with dependency injection

ASP.NET Core is built with [dependency injection](../../fundamentals/dependency-injection.md). Services, such as the EF Core database context, are registered with dependency injection during application startup. Components that require these services (such as Razor Pages) are provided via constructor parameters. The constructor code that gets a database context instance is shown later in the tutorial.

The scaffolding tool automatically created a database context and registered it with the dependency injection container. The following highlighted code is added to the `Program.cs` file by the scaffolder:

# [Visual Studio](#tab/visual-studio)
[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Program.cs?name=snippet_all\\&highlight=8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

# [Visual Studio Code](#tab/visual-studio-code)
[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/snapshot_sample9/Program.cs?name=snippet_all_sl\\&highlight=8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

---

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie90) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

> 
> [Previous: Get Started](razor-pages-start.md)
> [Next: Scaffolded Razor Pages](page.md)




**Applies to: \= aspnetcore-8.0**

In this tutorial, classes are added for managing movies in a database. The app's model classes use [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core) to work with the database. EF Core is an object-relational mapper (O/RM) that simplifies data access. You write the model classes first, and EF Core creates the database.

The model classes are known as POCO classes (from "**P**lain-**O**ld **C**LR **O**bjects") because they don't have a dependency on EF Core. They define the properties of the data that are stored in the database.

## Add a data model

# [Visual Studio](#tab/visual-studio)

1. In **Solution Explorer**, right-click the *RazorPagesMovie* project > **Add** > **New Folder**. Name the folder `Models`.
1. Right-click the `Models` folder. Select **Add** > **Class**. Name the class *Movie*.
1. Add the following properties to the `Movie` class:

   [Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* A [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute that specifies the type of data in the `ReleaseDate` property. With this attribute:

  * The user isn't required to enter time information in the date field.
  * Only the date is displayed, not time information.
* The question mark after `string` indicates that the property is nullable. For more information, see [Nullable reference types](https://learn.microsoft.com/dotnet/csharp/nullable-references).

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

Build the project to verify there are no compilation errors.

# [Visual Studio Code](#tab/visual-studio-code)

1. Add a folder named `Models`.
1. Add a class to the `Models` folder named `Movie.cs`.

Add the following properties to the `Movie` class:

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* An `ID` field to provide a primary key for the database.
* A [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute to specify the type of data in the `ReleaseDate` field. With this attribute:

  * The user is not required to enter time information in the date field.
  * Only the date is displayed, not time information.
* The question mark after `string` indicates that the property is nullable. For more information, see [Nullable reference types](https://learn.microsoft.com/dotnet/csharp/nullable-references).

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

<a name="dc7"></a>

### Add NuGet packages and EF tools

Run the following .NET CLI commands:

```dotnetcli
dotnet tool uninstall --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool uninstall --global dotnet-ef
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

The preceding commands add:
* The [command-line interface (CLI) tools for EF Core](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet)
* The [aspnet-codegenerator scaffolding tool](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).
* Design time tools for EF Core
* The EF Core SQLite provider, which installs the EF Core package as a dependency.
* Packages needed for scaffolding: `Microsoft.VisualStudio.Web.CodeGeneration.Design` and `Microsoft.EntityFrameworkCore.SqlServer`.

For guidance on multiple environment configuration that permits an app to configure its database contexts by environment, see [fundamentals/environments#environment-based-startup-class-and-methods](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23environment-based-startup-class-and-methods).

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.



In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

In the *Panel* below the editor region, select the *PROBLEMS* tab, or from the *View* menu, select *Problems* if it is not currently in view. Verify there are no compilation errors.

---

## Scaffold the movie model

In this section, the movie model is scaffolded. That is, the scaffolding tool produces pages for Create, Read, Update, and Delete (CRUD) operations for the movie model.

# [Visual Studio](#tab/visual-studio)

1. Create the *Pages/Movies* folder:
   1. Right-click on the *Pages* folder > **Add** > **New Folder**.
   1. Name the folder *Movies*.

1. Right-click on the *Pages/Movies* folder > **Add** > **New Scaffolded Item**.

   New Scaffolded Item

1. In the **Add New Scaffold** dialog, select **Razor Pages using Entity Framework (CRUD)** > **Add**.

   Add Scaffold

1. Complete the **Add Razor Pages using Entity Framework (CRUD)** dialog:
   1. In the **Model class** drop down, select **Movie (RazorPagesMovie.Models)**.
   1. In the **Data context class** row, select the **+** (plus) sign.
      1. In the **Add Data Context** dialog, the class name `RazorPagesMovie.Data.RazorPagesMovieContext` is generated.
      1. In the **Database provider** drop down, select **SQL Server**.
   1. Select **Add**.

   Add Razor Pages

The `appsettings.json` file is updated with the connection string used to connect to a local database.

# [Visual Studio Code](#tab/visual-studio-code)

* Open a command shell to the project directory, which contains the `Program.cs` and `.csproj` files. Run the following command:

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Movie -dc RazorPagesMovie.Data.RazorPagesMovieContext -udl -outDir Pages/Movies --referenceScriptLibraries --databaseProvider sqlite
  ```

<a name="codegenerator"></a>
The following table details the ASP.NET Core code generator options.

| Option | Description |
| --- | --- |
| `-m` | The name of the model. |
| `-dc` | The `DbContext` class to use including namespace. |
| `-udl` | Use the default layout. |
| `-outDir` | The relative output folder path to create the views. |
| `--referenceScriptLibraries` | Adds `_ValidationScriptsPartial` to Edit and Create pages |

Use the `-h` option to get help on the `dotnet aspnet-codegenerator razorpage` command:

```dotnetcli
dotnet aspnet-codegenerator razorpage -h
```

For more information, see [dotnet aspnet-codegenerator](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).

<h3 id="sqlite-ss-6">Use SQLite for development, SQL Server for production</h3>

When SQLite is selected, the template generated code is ready for development. The following code shows how to select the SQLite connection string in development and SQL Server in production.

[Code reference unavailable in this source snapshot: ../../includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/ProgramProd.cs?name=snippet\\&highlight=7-16](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code doesn't call `UseDeveloperExceptionPage` in development because `WebApplication` calls `UseDeveloperExceptionPage` in development mode.

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


### Files created and updated

The scaffold process creates the following files:

* *Pages/Movies*: Create, Delete, Details, Edit, and Index.
* `Data/RazorPagesMovieContext.cs`

The created files are explained in the next tutorial.

The scaffold process adds the following highlighted code to the `Program.cs` file:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs?name=snippet_all\\&highlight=1-3,8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs?name=snippet_all_sl\\&highlight=1-2,8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

---

The `Program.cs` changes are explained later in this tutorial.

<a name="pmc7"></a>

## Create the initial database schema using EF's migration feature

The migrations feature in Entity Framework Core provides a way to:

* Create the initial database schema.
* Incrementally update the database schema to keep it in sync with the app's data model.  Existing data in the database is preserved.

# [Visual Studio](#tab/visual-studio)

In this section, the **Package Manager Console** (PMC) window is used to:

* Add an initial migration.
* Update the database with the initial migration.

* From the **Tools** menu, select **NuGet Package Manager** > **Package Manager Console**.

  PMC menu

* In the PMC, enter the following command:

  ```powershell
  Add-Migration InitialCreate
  ```

* The `Add-Migration` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument is used to name the migration. Any name can be used, but by convention a name is selected that describes the migration.

The following warning is displayed, which is addressed in a later step:

> No type was specified for the decimal column 'Price' on entity type 'Movie'. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values using 'HasColumnType()'.

* In the PMC, enter the following command:

  ```powershell
  Update-Database
  ```
  The `Update-Database` command runs the `Up` method in migrations that have not been applied. In this case, the command runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

# [Visual Studio Code](#tab/visual-studio-code)

* Right-click the *RazorPagesMovie.csproj* project, and then select **Open in Integrated Terminal**.

  The **Terminal** window opens with the command prompt at the project directory, which contains the Program.cs and .csproj files.

* Run the following .NET CLI command:

  ```dotnetcli
  dotnet ef migrations add InitialCreate
  ```

  The `migrations` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument is used to name the migrations. Any name can be used, but by convention a name is selected that describes the migration.

* Run the following .NET CLI command:

  ```dotnetcli
  dotnet ef database update
  ```
 
 The `update` command runs the `Up` method in migrations that have not been applied. In this case, `update` runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

> **Note:**
> For SQLite, column type for the `Price` field is set to `TEXT`. This is resolved in a later step.

---

The data context `RazorPagesMovieContext`:

* Derives from [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext).
* Specifies which entities are included in the data model.
* Coordinates EF Core functionality, such as Create, Read, Update and Delete, for the `Movie` model.

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Data/RazorPagesMovieContext.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code creates a [DbSet\<Movie>](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%25601) property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed in to the context by calling a method on a [DbContextOptions](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptions) object. For local development, the [Configuration system](../../fundamentals/configuration/index.md) reads the connection string from the `appsettings.json` file.

<a name="test7"></a>

## Test the app

1. Run the app and append `/Movies` to the URL in the browser (`http://localhost:port/movies`).

   If you receive the following error:

   ```console
   SqlException: Cannot open database "RazorPagesMovieContext-GUID" requested by the login. The login failed.
   Login failed for user 'User-name'.
   ```

   You missed the [migrations step](#pmc6).

1. Test the **Create New** link.

   Create page

   > **Note:**
   > You may not be able to enter decimal commas in the `Price` field. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point and for non US-English date formats, the app must be globalized. For globalization instructions, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-326590420).

1. Test the **Edit**, **Details**, and **Delete** links.

The next tutorial explains the files created by scaffolding.

### Examine the context registered with dependency injection

ASP.NET Core is built with [dependency injection](../../fundamentals/dependency-injection.md). Services, such as the EF Core database context, are registered with dependency injection during application startup. Components that require these services (such as Razor Pages) are provided via constructor parameters. The constructor code that gets a database context instance is shown later in the tutorial.

The scaffolding tool automatically created a database context and registered it with the dependency injection container. The following highlighted code is added to the `Program.cs` file by the scaffolder:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs?name=snippet_all\\&highlight=9-10](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

# [Visual Studio Code](#tab/visual-studio-code)
[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs?name=snippet_all_sl\\&highlight=7-8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

---

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

> 
> [Previous: Get Started](razor-pages-start.md)
> [Next: Scaffolded Razor Pages](page.md)




**Applies to: \= aspnetcore-7.0**

In this tutorial, classes are added for managing movies in a database. The app's model classes use [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core) to work with the database. EF Core is an object-relational mapper (O/RM) that simplifies data access. You write the model classes first, and EF Core creates the database.

The model classes are known as POCO classes (from "**P**lain-**O**ld **C**LR **O**bjects") because they don't have a dependency on EF Core. They define the properties of the data that are stored in the database.

## Add a data model

# [Visual Studio](#tab/visual-studio)

1. In **Solution Explorer**, right-click the *RazorPagesMovie* project > **Add** > **New Folder**. Name the folder `Models`.
1. Right-click the `Models` folder. Select **Add** > **Class**. Name the class *Movie*.
1. Add the following properties to the `Movie` class:

   [Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* A [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute that specifies the type of data in the `ReleaseDate` property. With this attribute:

  * The user isn't required to enter time information in the date field.
  * Only the date is displayed, not time information.
* The question mark after `string` indicates that the property is nullable. For more information, see [Nullable reference types](https://learn.microsoft.com/dotnet/csharp/nullable-references).

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

Build the project to verify there are no compilation errors.

# [Visual Studio Code](#tab/visual-studio-code)

1. Add a folder named `Models`.
1. Add a class to the `Models` folder named `Movie.cs`.

Add the following properties to the `Movie` class:

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* An `ID` field to provide a primary key for the database.
* A [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute to specify the type of data in the `ReleaseDate` field. With this attribute:

  * The user is not required to enter time information in the date field.
  * Only the date is displayed, not time information.
* The question mark after `string` indicates that the property is nullable. For more information, see [Nullable reference types](https://learn.microsoft.com/dotnet/csharp/nullable-references).

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

<a name="dc7"></a>

### Add NuGet packages and EF tools

Run the following .NET CLI commands:

```dotnetcli
dotnet tool uninstall --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool uninstall --global dotnet-ef
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

The preceding commands add:
* The [command-line interface (CLI) tools for EF Core](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet)
* The [aspnet-codegenerator scaffolding tool](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).
* Design time tools for EF Core
* The EF Core SQLite provider, which installs the EF Core package as a dependency.
* Packages needed for scaffolding: `Microsoft.VisualStudio.Web.CodeGeneration.Design` and `Microsoft.EntityFrameworkCore.SqlServer`.

For guidance on multiple environment configuration that permits an app to configure its database contexts by environment, see [fundamentals/environments#environment-based-startup-class-and-methods](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23environment-based-startup-class-and-methods).

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.



In Visual Studio Code, press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the app without debugging.

In the *Panel* below the editor region, select the *PROBLEMS* tab, or from the *View* menu, select *Problems* if it is not currently in view. Verify there are no compilation errors.

# [Visual Studio for Mac](#tab/visual-studio-mac)

1. In the **Solution Tool Window**, control-click the *RazorPagesMovie* project, and then select **Add** > **New Folder...**. Name the folder `Models`.
1. Control-click the `Models` folder, and then select **Add** > **New Class...**.
1. In the **New File** dialog:
   1. Select **General** in the left pane.
   1. Select **Empty Class** in the center pane.
   1. Name the class **Movie** and select **Create**.

1. Add the following properties to the `Movie` class:

   [Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* An `ID` field to provide a primary key for the database.
* A [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute to specify the type of data in the `ReleaseDate` field. With this attribute:

  * The user isn't required to enter time information in the date field.
  * Only the date is displayed, not time information.

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

Build the project to verify there are no compilation errors.

---

## Scaffold the movie model

In this section, the movie model is scaffolded. That is, the scaffolding tool produces pages for Create, Read, Update, and Delete (CRUD) operations for the movie model.

# [Visual Studio](#tab/visual-studio)

1. Create the *Pages/Movies* folder:
   1. Right-click on the *Pages* folder > **Add** > **New Folder**.
   1. Name the folder *Movies*.

1. Right-click on the *Pages/Movies* folder > **Add** > **New Scaffolded Item**.

   New Scaffolded Item

1. In the **Add New Scaffold** dialog, select **Razor Pages using Entity Framework (CRUD)** > **Add**.

   Add Scaffold

1. Complete the **Add Razor Pages using Entity Framework (CRUD)** dialog:
   1. In the **Model class** drop down, select **Movie (RazorPagesMovie.Models)**.
   1. In the **Data context class** row, select the **+** (plus) sign.
      1. In the **Add Data Context** dialog, the class name `RazorPagesMovie.Data.RazorPagesMovieContext` is generated.
      1. In the **Database provider** drop down, select **SQL Server**.
   1. Select **Add**.

   Add Razor Pages

The `appsettings.json` file is updated with the connection string used to connect to a local database.

# [Visual Studio Code](#tab/visual-studio-code)

* Open a command shell to the project directory, which contains the `Program.cs` and `.csproj` files. Run the following command:

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Movie -dc RazorPagesMovie.Data.RazorPagesMovieContext -udl -outDir Pages/Movies --referenceScriptLibraries --databaseProvider sqlite
  ```

<a name="codegenerator"></a>
The following table details the ASP.NET Core code generator options.

| Option | Description |
| --- | --- |
| `-m` | The name of the model. |
| `-dc` | The `DbContext` class to use including namespace. |
| `-udl` | Use the default layout. |
| `-outDir` | The relative output folder path to create the views. |
| `--referenceScriptLibraries` | Adds `_ValidationScriptsPartial` to Edit and Create pages |

Use the `-h` option to get help on the `dotnet aspnet-codegenerator razorpage` command:

```dotnetcli
dotnet aspnet-codegenerator razorpage -h
```

For more information, see [dotnet aspnet-codegenerator](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).

<h3 id="sqlite-ss-6">Use SQLite for development, SQL Server for production</h3>

When SQLite is selected, the template generated code is ready for development. The following code shows how to select the SQLite connection string in development and SQL Server in production.

[Code reference unavailable in this source snapshot: ../../includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/ProgramProd.cs?name=snippet\\&highlight=7-16](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code doesn't call `UseDeveloperExceptionPage` in development because `WebApplication` calls `UseDeveloperExceptionPage` in development mode.

# [Visual Studio for Mac](#tab/visual-studio-mac)
<!--
Author note 5-30-23: As of VS 2022 and the 7.05 packages, EF scaffolding on the Mac loads all packages needed including SQLite 7.0.5, but then can't find SQLite and will not scaffold the files. Workaround is add Microsoft.EntityFrameworkCore.Sqlite as a step before scaffolding.  Remove once this issue is fixed.
-->
1. Add the NuGet package `Microsoft.EntityFrameworkCore.Sqlite`, which is required for the scaffolding tool.
   1. In the **Solution Tool Window**, control-click the *RazorPagesMovie* project, and then select **Open in Terminal**.

     The Terminal window opens with the command prompt at the project directory, which contains the Program.cs and .csproj files.

   1. Run the following .NET CLI command:

     ```dotnetcli
       dotnet add package Microsoft.EntityFrameworkCore.SQLite
     ```

1. Create a *Pages/Movies* folder:
   1. Control-click on the *Pages* folder > **Add** > **New Folder**.
   1. Name the folder *Movies*.

1. Control-click on the *Pages/Movies* folder > **Add** > **New Scaffolding...**.

   New Scaffolding on Mac

1. In the **New Scaffolding** dialog, select **Razor Pages using Entity Framework (CRUD)** > **Next**.

   Add Scaffolding on Mac

1. Complete the **Add Razor Pages using Entity Framework (CRUD)** dialog:
   1. In the **Model class to use:** row, enter `Movie`.
   1. In the **DbContext Class to use:** row, name the class `RazorPagesMovie.Data.RazorPagesMovieContext`.
   1. Select **Finish**.

   Add Razor Pages on Mac

The scaffolding process may take some time to complete as required packages are automatically downloaded and added to the project.

The `appsettings.json` file is updated with the connection string used to connect to a local database.

<h3 id="sqlite-ss-6">Use SQLite for development, SQL Server for production</h3>

When SQLite is selected, the template generated code is ready for development. The following code shows how to select the SQLite connection string in development and SQL Server in production.

[Code reference unavailable in this source snapshot: ../../includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/ProgramProd.cs?name=snippet\\&highlight=7-16](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code doesn't call `UseDeveloperExceptionPage` in development because `WebApplication` calls `UseDeveloperExceptionPage` in development mode.

---

<!--
### Fix nullable warnings

Build the app. The `Create.cshtml.cs`, `Delete.cshtml.cs`, `Details.cshtml.cs`, `Index.cshtml.cs`, and `Edit.cshtml.cs` files all report a nullable warning when the app is compiled similar to the following:

`warning CS8618: Non-nullable property 'Movie' must contain a non-null` value when exiting constructor. Consider declaring the property as nullable.

In each of the files, append `= default!;` to the `Movie` declaration. For example:

```diff
- public IList<Movie> Movie { get;set; }
+ public IList<Movie> Movie { get;set; }  = default!;
- public Movie Movie { get; set; }
+ public Movie Movie { get; set; } = default!;
```
Fixed in GA per https://github.com/dotnet/Scaffolding/issues/1594#issuecomment-1292422389
-->

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


### Files created and updated

The scaffold process creates the following files:

* *Pages/Movies*: Create, Delete, Details, Edit, and Index.
* `Data/RazorPagesMovieContext.cs`

The created files are explained in the next tutorial.

The scaffold process adds the following highlighted code to the `Program.cs` file:

# [Visual Studio](#tab/visual-studio)
[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Program.cs?name=snippet_all\\&highlight=1-3,8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)
# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)
[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Program.cs?name=snippet_all_sl\\&highlight=1-2,8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

---

The `Program.cs` changes are explained later in this tutorial.

<a name="pmc7"></a>

## Create the initial database schema using EF's migration feature

The migrations feature in Entity Framework Core provides a way to:

* Create the initial database schema.
* Incrementally update the database schema to keep it in sync with the app's data model.  Existing data in the database is preserved.

# [Visual Studio](#tab/visual-studio)

In this section, the **Package Manager Console** (PMC) window is used to:

* Add an initial migration.
* Update the database with the initial migration.

1. From the **Tools** menu, select **NuGet Package Manager** > **Package Manager Console**.

   PMC menu

1. In the PMC, enter the following commands:

   ```powershell
   Add-Migration InitialCreate
   Update-Database
   ```

* The `Add-Migration` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument is used to name the migration. Any name can be used, but by convention a name is selected that describes the migration.

* The `Update-Database` command runs the `Up` method in migrations that have not been applied. In this case, the command runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

# [Visual Studio Code](#tab/visual-studio-code)

* Right-click the *RazorPagesMovie.csproj* project, and then select **Open in Integrated Terminal**.

  The **Terminal** window opens with the command prompt at the project directory, which contains the Program.cs and .csproj files.

* Run the following .NET CLI commands:

  ```dotnetcli
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  ```

* The `migrations` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument is used to name the migrations. Any name can be used, but by convention a name is selected that describes the migration.

* The `update` command runs the `Up` method in migrations that have not been applied. In this case, `update` runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

> **Note:**
> For SQLite, column type for the `Price` field is set to `TEXT`. This is resolved in a later step.

# [Visual Studio for Mac](#tab/visual-studio-mac)

* Control-click the *RazorPagesMovie* project, and then select **Open in Terminal**.

  The **Terminal** window opens with the command prompt at the project directory, which contains the Program.cs and .csproj files.

* Run the following .NET CLI commands:

  ```dotnetcli
  dotnet tool uninstall --global dotnet-ef
  dotnet tool install --global dotnet-ef
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  ```

* The `tool` commands install the latest [Entity Framework Core tools](https://learn.microsoft.com/ef/core/get-started/overview/install#get-the-entity-framework-core-tools) after uninstalling any previous version, if one exists.

  > **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


* The `migrations` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument is used to name the migrations. Any name can be used, but by convention a name is selected that describes the migration.

* The `update` command runs the `Up` method in migrations that have not been applied. In this case, `update` runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

> **Note:**
> For SQLite, column type for the `Price` field is set to `TEXT`. This is resolved in a later step.

---

The following warning is displayed, which is addressed in a later step:

> No type was specified for the decimal column 'Price' on entity type 'Movie'. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values using 'HasColumnType()'.

The data context `RazorPagesMovieContext`:

* Derives from [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext).
* Specifies which entities are included in the data model.
* Coordinates EF Core functionality, such as Create, Read, Update and Delete, for the `Movie` model.

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Data/RazorPagesMovieContext.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code creates a [DbSet\<Movie>](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%25601) property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed in to the context by calling a method on a [DbContextOptions](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptions) object. For local development, the [Configuration system](../../fundamentals/configuration/index.md) reads the connection string from the `appsettings.json` file.

<a name="test7"></a>

## Test the app

1. Run the app and append `/Movies` to the URL in the browser (`http://localhost:port/movies`).

   If you receive the following error:

   ```console
   SqlException: Cannot open database "RazorPagesMovieContext-GUID" requested by the login. The login failed.
   Login failed for user 'User-name'.
   ```

   You missed the [migrations step](#pmc6).

1. Test the **Create New** link.

   Create page

   > **Note:**
   > You may not be able to enter decimal commas in the `Price` field. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point and for non US-English date formats, the app must be globalized. For globalization instructions, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-326590420).

1. Test the **Edit**, **Details**, and **Delete** links.

The next tutorial explains the files created by scaffolding.

### Examine the context registered with dependency injection

ASP.NET Core is built with [dependency injection](../../fundamentals/dependency-injection.md). Services, such as the EF Core database context, are registered with dependency injection during application startup. Components that require these services (such as Razor Pages) are provided via constructor parameters. The constructor code that gets a database context instance is shown later in the tutorial.

The scaffolding tool automatically created a database context and registered it with the dependency injection container. The following highlighted code is added to the `Program.cs` file by the scaffolder:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Program.cs?name=snippet_all\\&highlight=9-10](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)
[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Program.cs?name=snippet_all_sl\\&highlight=7-8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

---

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

> 
> [Previous: Get Started](razor-pages-start.md)
> [Next: Scaffolded Razor Pages](page.md)




**Applies to: \= aspnetcore-6.0**

<!-- In the next update on the CLI version, let the scaffolder do the same work the VS driven scaffolder does. That is, create the DB context, etc -->

In this tutorial, classes are added for managing movies in a database. The app's model classes use [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core) to work with the database. EF Core is an object-relational mapper (O/RM) that simplifies data access. You write the model classes first, and EF Core creates the database.

The model classes are known as POCO classes (from "**P**lain-**O**ld **C**LR **O**bjects") because they don't have a dependency on EF Core. They define the properties of the data that are stored in the database.

## Add a data model

# [Visual Studio](#tab/visual-studio)

1. In **Solution Explorer**, right-click the *RazorPagesMovie* project > **Add** > **New Folder**. Name the folder `Models`.
1. Right-click the `Models` folder. Select **Add** > **Class**. Name the class *Movie*.
1. Add the following properties to the `Movie` class:

   [Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* A [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute that specifies the type of data in the `ReleaseDate` property. With this attribute:

  * The user isn't required to enter time information in the date field.
  * Only the date is displayed, not time information.

# [Visual Studio Code](#tab/visual-studio-code)

1. Add a folder named `Models`.
1. Add a class to the `Models` folder named `Movie.cs`.

Add the following properties to the `Movie` class:

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* An `ID` field to provide a primary key for the database.
* A [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute to specify the type of data in the `ReleaseDate` field. With this attribute:

  * The user is not required to enter time information in the date field.
  * Only the date is displayed, not time information.

<a name="dc6"></a>

### Add NuGet packages and EF tools

Run the following .NET CLI commands:

```dotnetcli
dotnet tool uninstall --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool uninstall --global dotnet-ef
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

The preceding commands add:
* The [command-line interface (CLI) tools for EF Core](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet)
* The [aspnet-codegenerator scaffolding tool](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).
* Design time tools for EF Core
* The EF Core SQLite provider, which installs the EF Core package as a dependency.
* Packages needed for scaffolding: `Microsoft.VisualStudio.Web.CodeGeneration.Design` and `Microsoft.EntityFrameworkCore.SqlServer`.

For guidance on multiple environment configuration that permits an app to configure its database contexts by environment, see [fundamentals/environments#environment-based-startup-class-and-methods](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23environment-based-startup-class-and-methods).

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.



# [Visual Studio for Mac](#tab/visual-studio-mac)

1. In the **Solution Tool Window**, right-click the *RazorPagesMovie* project, and then select **Add** > **New Folder...**. Name the folder `Models`.
1. Right-click the `Models` folder, and then select **Add** > **New File...**.
1. In the **New File** dialog:
   1. Select **General** in the left pane.
   1. Select **Empty Class** in the center pane.
   1. Name the class **Movie** and select **Create**.

1. Add the following properties to the `Movie` class:

   [Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* An `ID` field to provide a primary key for the database.
* A [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute to specify the type of data in the `ReleaseDate` field. With this attribute:

  * The user isn't required to enter time information in the date field.
  * Only the date is displayed, not time information.

---

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

Build the project to verify there are no compilation errors.

## Scaffold the movie model

In this section, the movie model is scaffolded. That is, the scaffolding tool produces pages for Create, Read, Update, and Delete (CRUD) operations for the movie model.

# [Visual Studio](#tab/visual-studio)

1. Add the NuGet package `Microsoft.EntityFrameworkCore.Design`, which is required for the scaffolding tool.
   1. From the **Tools** menu, select **NuGet Package Manager** > **Manage NuGet Packages for Solution**
      NuGet Package Manager - manage
   1. Select the **Browse** tab.
   1. Enter `Microsoft.EntityFrameworkCore.Design` and select it from the list.
   1. Check **Project** and then Select **Install**
   1. Select **I Accept** in the **License Acceptance** dialog.
      NuGet Package Manager - add package

1. Create the *Pages/Movies* folder:
   1. Right-click on the *Pages* folder > **Add** > **New Folder**.
   1. Name the folder *Movies*.

1. Right-click on the *Pages/Movies* folder > **Add** > **New Scaffolded Item**.

   New Scaffolded Item

1. In the **Add New Scaffold** dialog, select **Razor Pages using Entity Framework (CRUD)** > **Add**.

   Add Scaffold

1. Complete the **Add Razor Pages using Entity Framework (CRUD)** dialog:
   1. In the **Model class** drop down, select **Movie (RazorPagesMovie.Models)**.
   1. In the **Data context class** row, select the **+** (plus) sign.
      1. In the **Add Data Context** dialog, the class name `RazorPagesMovie.Data.RazorPagesMovieContext` is generated.
   1. Select **Add**.

   Add Razor Pages

   If you get an error message that says you need to install the `Microsoft.EntityFrameworkCore.SqlServer` package, repeat the steps starting with **Add** > **New Scaffolded Item**.

The `appsettings.json` file is updated with the connection string used to connect to a local database.

# [Visual Studio Code](#tab/visual-studio-code)

* Open a command shell to the project directory, which contains the `Program.cs` and `.csproj` files. Run the following command:

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Movie -dc RazorPagesMovieContext -udl -outDir Pages/Movies --referenceScriptLibraries -sqlite
  ```

<a name="codegenerator"></a>
The following table details the ASP.NET Core code generator options.

| Option | Description |
| --- | --- |
| `-m` | The name of the model. |
| `-dc` | The `DbContext` class to use. |
| `-udl` | Use the default layout. |
| `-outDir` | The relative output folder path to create the views. |
| `--referenceScriptLibraries` | Adds `_ValidationScriptsPartial` to Edit and Create pages |

Use the `-h` option to get help on the `dotnet aspnet-codegenerator razorpage` command:

```dotnetcli
dotnet aspnet-codegenerator razorpage -h
```

For more information, see [dotnet aspnet-codegenerator](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).

<h3 id="sqlite-ss-6">Use SQLite for development, SQL Server for production</h3>

When SQLite is selected, the template generated code is ready for development. The following code shows how to select the SQLite connection string in development and SQL Server in production.

[Code reference unavailable in this source snapshot: ../../includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/ProgramProd.cs?name=snippet\\&highlight=7-16](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code doesn't call `UseDeveloperExceptionPage` in development because `WebApplication` calls `UseDeveloperExceptionPage` in development mode.

# [Visual Studio for Mac](#tab/visual-studio-mac)

1. Create a *Pages/Movies* folder:
   1. Right-click on the *Pages* folder > **Add** > **New Folder**.
   1. Name the folder *Movies*.

1. Right-click on the *Pages/Movies* folder > **Add** > **New Scaffolding...**.

   New Scaffolding on Mac

1. In the **New Scaffolding** dialog, select **Razor Pages using Entity Framework (CRUD)** > **Next**.

   Add Scaffolding on Mac

1. Complete the **Add Razor Pages using Entity Framework (CRUD)** dialog:
   1. In the **Model class to use:** row, enter `Movie`.
   1. In the **DbContext Class to use:** row, name the class `RazorPagesMovie.Data.RazorPagesMovieContext`.
   1. Select **Finish**.

   Add Razor Pages on Mac

The `appsettings.json` file is updated with the connection string used to connect to a local database.

<h3 id="sqlite-ss-6">Use SQLite for development, SQL Server for production</h3>

When SQLite is selected, the template generated code is ready for development. The following code shows how to select the SQLite connection string in development and SQL Server in production.

[Code reference unavailable in this source snapshot: ../../includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/ProgramProd.cs?name=snippet\\&highlight=7-16](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code doesn't call `UseDeveloperExceptionPage` in development because `WebApplication` calls `UseDeveloperExceptionPage` in development mode.

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


### Files created and updated

The scaffold process creates the following files:

* *Pages/Movies*: Create, Delete, Details, Edit, and Index.
* `Data/RazorPagesMovieContext.cs`

The created files are explained in the next tutorial.

The scaffold process adds the following highlighted code to the `Program.cs` file:

# [Visual Studio](#tab/visual-studio)
[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Program.cs?name=snippet_all\\&highlight=1-3,8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)
# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)
[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Program.cs?name=snippet_all_sl\\&highlight=1-2,8-9](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

---

The `Program.cs` changes are explained later in this tutorial.

<a name="pmc6"></a>

## Create the initial database schema using EF's migration feature

The migrations feature in Entity Framework Core provides a way to:

* Create the initial database schema.
* Incrementally update the database schema to keep it in sync with the app's data model.  Existing data in the database is preserved.

# [Visual Studio](#tab/visual-studio)

In this section, the **Package Manager Console** (PMC) window is used to:

* Add an initial migration.
* Update the database with the initial migration.

1. From the **Tools** menu, select **NuGet Package Manager** > **Package Manager Console**.

   PMC menu

1. In the PMC, enter the following commands:

   ```powershell
   Add-Migration InitialCreate
   Update-Database

   ```

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)
* In the **Solution Tool Window**, right-click the *RazorPagesMovie* project, and then select **Open in Terminal**. 

  The **Terminal** window opens with the command prompt at the project directory, which contains the Program.cs and .csproj files.

* Run the following .NET CLI commands:

  ```dotnetcli
  dotnet tool install --global dotnet-ef
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  ```

  > **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


> **Note:**
> For SQLite, column type for the `Price` field is set to `TEXT`. This is resolved in a later step.

---

The preceding commands install [the Entity Framework Core tools](https://learn.microsoft.com/ef/core/get-started/overview/install#get-the-entity-framework-core-tools) and run the `migrations` command to generate code that creates the initial database schema.

The following warning is displayed, which is addressed in a later step:

> No type was specified for the decimal column 'Price' on entity type 'Movie'. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values using 'HasColumnType()'.

The `migrations` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument is used to name the migrations. Any name can be used, but by convention a name is selected that describes the migration.

The `update` command runs the `Up` method in migrations that have not been applied. In this case, `update` runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

### Examine the context registered with dependency injection

ASP.NET Core is built with [dependency injection](../../fundamentals/dependency-injection.md). Services, such as the EF Core database context, are registered with dependency injection during application startup. Components that require these services (such as Razor Pages) are provided via constructor parameters. The constructor code that gets a database context instance is shown later in the tutorial.

The scaffolding tool automatically created a database context and registered it with the dependency injection container. The following highlighted code is added to the `Program.cs` file by the scaffolder:

# [Visual Studio](#tab/visual-studio)

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Program.cs?name=snippet_all\\&highlight=9-10](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)
[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Program.cs?name=snippet_all_sl\\&highlight=9-10](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

---

The data context `RazorPagesMovieContext`:

* Derives from [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext).
* Specifies which entities are included in the data model.
* Coordinates EF Core functionality, such as Create, Read, Update and Delete, for the `Movie` model.

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Data/RazorPagesMovieContext.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code creates a [DbSet\<Movie>](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%25601) property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed in to the context by calling a method on a [DbContextOptions](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptions) object. For local development, the [Configuration system](../../fundamentals/configuration/index.md) reads the connection string from the `appsettings.json` file.

<a name="test"></a>

## Test the app

1. Run the app and append `/Movies` to the URL in the browser (`http://localhost:port/movies`).

   If you receive the following error:

   ```console
   SqlException: Cannot open database "RazorPagesMovieContext-GUID" requested by the login. The login failed.
   Login failed for user 'User-name'.
   ```

   You missed the [migrations step](#pmc6).

1. Test the **Create New** link.

   Create page

   > **Note:**
   > You may not be able to enter decimal commas in the `Price` field. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point and for non US-English date formats, the app must be globalized. For globalization instructions, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-326590420).

1. Test the **Edit**, **Details**, and **Delete** links.

The next tutorial explains the files created by scaffolding.

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

> 
> [Previous: Get Started](razor-pages-start.md)
> [Next: Scaffolded Razor Pages](page.md)




**Applies to: \= aspnetcore-5.0**

<!-- In the next update on the CLI version, let the scaffolder do the same work the VS driven scaffolder does. That is, create the DB context, etc -->

In this section, classes are added for managing movies in a database. The app's model classes use [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core) to work with the database. EF Core is an object-relational mapper (O/RM) that simplifies data access. You write the model classes first, and EF Core creates the database.

The model classes are known as POCO classes (from "**P**lain-**O**ld **C**LR **O**bjects") because they don't have a dependency on EF Core. They define the properties of the data that are stored in the database.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Add a data model

# [Visual Studio](#tab/visual-studio)

1. In **Solution Explorer**, right-click the *RazorPagesMovie* project > **Add** > **New Folder**. Name the folder `Models`.
1. Right-click the `Models` folder. Select **Add** > **Class**. Name the class *Movie*.
1. Add the following properties to the `Movie` class:

   [Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* `[DataType(DataType.Date)]`: The [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute specifies the type of the data (`Date`). With this attribute:

  * The user isn't required to enter time information in the date field.
  * Only the date is displayed, not time information.

# [Visual Studio Code](#tab/visual-studio-code)

1. Add a folder named `Models`.
1. Add a class to the `Models` folder named `Movie.cs`.

Add the following properties to the `Movie` class:

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* `[DataType(DataType.Date)]`: The [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute specifies the type of the data (`Date`). With this attribute:

  * The user is not required to enter time information in the date field.
  * Only the date is displayed, not time information.

<a name="dc"></a>

### Add NuGet packages and EF tools

Run the following .NET CLI commands:

```dotnetcli
dotnet tool install --global dotnet-ef
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

The preceding commands add:
* The [command-line interface (CLI) tools for EF Core](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet)
* The [aspnet-codegenerator scaffolding tool](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).
* Design time tools for EF Core
* The EF Core SQLite provider, which installs the EF Core package as a dependency.
* Packages needed for scaffolding: `Microsoft.VisualStudio.Web.CodeGeneration.Design` and `Microsoft.EntityFrameworkCore.SqlServer`.

For guidance on multiple environment configuration that permits an app to configure its database contexts by environment, see [fundamentals/environments#environment-based-startup-class-and-methods](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23environment-based-startup-class-and-methods).

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


If you get a scaffolding error, verify the Target Framework Moniker (TFM) matches the NuGet package version in the project file. For example, the following project file uses version 5.0 for .NET and the listed NuGet packages:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore" Version="5.0.0-*" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="5.0.0-*" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.UI" Version="5.0.0-*" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="5.0.0-*" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="5.0.0-*" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="5.0.0-*" />
    <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="5.0.0-*" />
  </ItemGroup>

</Project>
```



# [Visual Studio for Mac](#tab/visual-studio-mac)

1. In the **Solution Tool Window**, control-click the *RazorPagesMovie* project, and then select **Add** > **New Folder...**. Name the folder `Models`.
1. Control-click the `Models` folder, and then select **Add** > **New File...**.
1. In the **New File** dialog:
   1. Select **General** in the left pane.
   1. Select **Empty Class** in the center pane.
   1. Name the class **Movie** and select **New**.

1. Add the following properties to the `Movie` class:

   [Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* `[DataType(DataType.Date)]`: The [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute specifies the type of the data (`Date`). With this attribute:

  * The user is not required to enter time information in the date field.
  * Only the date is displayed, not time information.

---

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

Build the project to verify there are no compilation errors.

## Scaffold the movie model

In this section, the movie model is scaffolded. That is, the scaffolding tool produces pages for Create, Read, Update, and Delete (CRUD) operations for the movie model.

# [Visual Studio](#tab/visual-studio)

1. Create a *Pages/Movies* folder:
   1. Right-click on the *Pages* folder > **Add** > **New Folder**.
   1. Name the folder *Movies*.

1. Right-click on the *Pages/Movies* folder > **Add** > **New Scaffolded Item**.

   New Scaffolded Item

1. In the **Add Scaffold** dialog, select **Razor Pages using Entity Framework (CRUD)** > **Add**.

   Add Scaffold

1. Complete the **Add Razor Pages using Entity Framework (CRUD)** dialog:
   1. In the **Model class** drop down, select **Movie (RazorPagesMovie.Models)**.
   1. In the **Data context class** row, select the **+** (plus) sign.
      1. In the **Add Data Context** dialog, the class name `RazorPagesMovie.Data.RazorPagesMovieContext` is generated.
   1. Select **Add**.

   Add Razor Pages

The `appsettings.json` file is updated with the connection string used to connect to a local database.

# [Visual Studio Code](#tab/visual-studio-code)

* Open a command shell to the project directory, which contains the `Program.cs`, `Startup.cs`, and `.csproj` files. Run the following command:

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Movie -dc RazorPagesMovieContext -udl -outDir Pages/Movies --referenceScriptLibraries -sqlite
  ```

<a name="codegenerator"></a>
The following table details the ASP.NET Core code generator options.

| Option | Description |
| --- | --- |
| `-m` | The name of the model. |
| `-dc` | The `DbContext` class to use. |
| `-udl` | Use the default layout. |
| `-outDir` | The relative output folder path to create the views. |
| `--referenceScriptLibraries` | Adds `_ValidationScriptsPartial` to Edit and Create pages |

Use the `-h` option to get help on the `dotnet aspnet-codegenerator razorpage` command:

```dotnetcli
dotnet aspnet-codegenerator razorpage -h
```

For more information, see [dotnet aspnet-codegenerator](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).

<a name="sqlite-dev"></a>
### Use SQLite for development, SQL Server for production

When SQLite is selected, the template generated code is ready for development. The following code shows how to inject [Microsoft.AspNetCore.Hosting.IWebHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment) into `Startup`. `IWebHostEnvironment` is injected so `ConfigureServices` can use SQLite in development and SQL Server in production.

[Code reference unavailable in this source snapshot: ../../includes/RP/~/includes/RP/code/StartupDevProdV5.cs?name=snippet\\&highlight=5,10,14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)


# [Visual Studio for Mac](#tab/visual-studio-mac)

1. Create a *Pages/Movies* folder:
   1. Control-click on the *Pages* folder > **Add** > **New Folder**.
   1. Name the folder *Movies*.

1. Control-click on the *Pages/Movies* folder > **Add** > **New Scaffolding...**.

   New Scaffolding on Mac

1. In the **New Scaffolding** dialog, select **Razor Pages using Entity Framework (CRUD)** > **Next**.

   Add Scaffolding on Mac

1. Complete the **Add Razor Pages using Entity Framework (CRUD)** dialog:
   1. In the **DbContext Class to use:** row, name the class `RazorPagesMovie.Data.RazorPagesMovieContext`.
   1. Select **Finish**.

   Add Razor Pages on Mac

The `appsettings.json` file is updated with the connection string used to connect to a local database.

<a name="sqlite-dev"></a>
### Use SQLite for development, SQL Server for production

When SQLite is selected, the template generated code is ready for development. The following code shows how to inject [Microsoft.AspNetCore.Hosting.IWebHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment) into `Startup`. `IWebHostEnvironment` is injected so `ConfigureServices` can use SQLite in development and SQL Server in production.

[Code reference unavailable in this source snapshot: ../../includes/RP/~/includes/RP/code/StartupDevProdV5.cs?name=snippet\\&highlight=5,10,14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)


---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


### Files created and updated

The scaffold process creates the following files:

* *Pages/Movies*: Create, Delete, Details, Edit, and Index.
* `Data/RazorPagesMovieContext.cs`

#### Updated files

* `Startup.cs`

The created and updated files are explained in the next section.

<a name="pmc"></a>

## Create the initial database schema using EF's migration feature

The migrations feature in Entity Framework Core provides a way to:

* Create the initial database schema.
* Incrementally update the database schema to keep it in sync with the application's data model.  Existing data in the database is preserved.

# [Visual Studio](#tab/visual-studio)

In this section, the **Package Manager Console** (PMC) window is used to:

* Add an initial migration.
* Update the database with the initial migration.

1. From the **Tools** menu, select **NuGet Package Manager** > **Package Manager Console**.

   PMC menu

1. In the PMC, enter the following commands:

   ```powershell
   Add-Migration InitialCreate
   Update-Database
   ```

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

* Run the following .NET CLI commands:

  ```dotnetcli
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  ```

> **Note:**
> For SQLite, column type for the `Price` field is set to `TEXT`. This is resolved in a later step.

---

For SQL Server, the preceding commands generate the following warning: "No type was specified for the decimal column 'Price' on entity type 'Movie'. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values using 'HasColumnType()'."

Ignore the warning, as it will be addressed in a later step.

The `migrations` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument is used to name the migrations. Any name can be used, but by convention a name is selected that describes the migration.

The `update` command runs the `Up` method in migrations that have not been applied. In this case, `update` runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

# [Visual Studio](#tab/visual-studio)

### Examine the context registered with dependency injection

ASP.NET Core is built with [dependency injection](../../fundamentals/dependency-injection.md). Services, such as the EF Core database context, are registered with dependency injection during application startup. Components that require these services (such as Razor Pages) are provided via constructor parameters. The constructor code that gets a database context instance is shown later in the tutorial.

The scaffolding tool automatically created a database context and registered it with the dependency injection container.

Examine the `Startup.ConfigureServices` method. The highlighted line was added by the scaffolder:

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Startup.cs?name=snippet_ConfigureServices\\&highlight=5-6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `RazorPagesMovieContext` coordinates EF Core functionality, such as Create, Read, Update and Delete, for the `Movie` model. The data context (`RazorPagesMovieContext`) is derived from [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext). The data context specifies which entities are included in the data model.

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Data/RazorPagesMovieContext.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code creates a [DbSet\<Movie>](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%25601) property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed in to the context by calling a method on a [DbContextOptions](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptions) object. For local development, the [Configuration system](../../fundamentals/configuration/index.md) reads the connection string from the `appsettings.json` file.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

Examine the `Up` method.

---

<a name="test"></a>

## Test the app

1. Run the app and append `/Movies` to the URL in the browser (`http://localhost:port/movies`).

   If you receive the following error:

   ```console
   SqlException: Cannot open database "RazorPagesMovieContext-GUID" requested by the login. The login failed.
   Login failed for user 'User-name'.
   ```

   You missed the [migrations step](#pmc).

1. Test the **Create** link.

   Create page

   > **Note:**
   > You may not be able to enter decimal commas in the `Price` field. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point and for non US-English date formats, the app must be globalized. For globalization instructions, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-326590420).

1. Test the **Edit**, **Details**, and **Delete** links.


## SQL Logging of Entity Framework Core

Logging configuration is commonly provided by the `Logging` section of `appsettings.{Environment}.json` files. To log SQL statements, add `"Microsoft.EntityFrameworkCore.Database.Command": "Information"` to the `appsettings.Development.json` file:

[Code reference unavailable in this source snapshot: ../../includes/~/includes/sql-log/appsettings.json?highlight=10](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

With the preceding JSON, SQL statements are displayed on the command line and in the Visual Studio output window.

For more information, see the following resources:

* [fundamentals/logging/index#configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Flogging%2Findex%23configuration)
* [ASP.NET template disables EF Core SQL logging by default (`dotnet/aspnetcore` #32977)](https://github.com/dotnet/aspnetcore/issues/32977)


The next tutorial explains the files created by scaffolding.

## Next steps

> 
> [Previous: Get Started](razor-pages-start.md)
> [Next: Scaffolded Razor Pages](page.md)




**Applies to: < aspnetcore-5.0**

<!-- In the next update on the CLI version, let the scaffolder do the same work the VS driven scaffolder does. That is, create the DB context, etc -->

In this section, classes are added for managing movies. The app's model classes use [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core) to work with the database. EF Core is an object-relational mapper (O/RM) that simplifies data access.

The model classes are known as POCO classes (from "plain-old CLR objects") because they don't have any dependency on EF Core. They define the properties of the data that are stored in the database.

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


## Add a data model

# [Visual Studio](#tab/visual-studio)

Right-click the **RazorPagesMovie** project > **Add** > **New Folder**. Name the folder `Models`.

Right-click the `Models` folder. Select **Add** > **Class**. Name the class **Movie**.

Add the following properties to the `Movie` class:

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* `[DataType(DataType.Date)]`: The [DataType](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute specifies the type of the data (`Date`). With this attribute:

  * The user is not required to enter time information in the date field.
  * Only the date is displayed, not time information.

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

# [Visual Studio Code](#tab/visual-studio-code)

* Add a folder named `Models`.
* Add a class to the `Models` folder named `Movie.cs`.

Add the following properties to the `Movie` class:

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* `[DataType(DataType.Date)]`: The [DataType](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute specifies the type of the data (`Date`). With this attribute:

  * The user is not required to enter time information in the date field.
  * Only the date is displayed, not time information.

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

<a name="dc"></a>

### Add NuGet packages and EF tools

Run the following .NET CLI commands:

```dotnetcli
dotnet tool install --global dotnet-ef --version 3.1.9
dotnet tool install --global dotnet-aspnet-codegenerator --version 3.1.4
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 3.1.9
dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore --version 3.1.9
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design --version 3.1.4
dotnet add package Microsoft.EntityFrameworkCore.Design --version 3.1.9
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 3.1.9
dotnet add package Microsoft.Extensions.Logging.Debug --version 3.1.9
```

The preceding commands add:

* The [aspnet-codegenerator scaffolding tool](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).
* The Entity Framework Core Tools for the .NET CLI.
* The EF Core SQLite provider, which installs the EF Core package as a dependency.
* Packages needed for scaffolding: `Microsoft.VisualStudio.Web.CodeGeneration.Design` and `Microsoft.EntityFrameworkCore.SqlServer`.

For guidance on multiple environment configuration that permits an app to configure its database contexts by environment, see [fundamentals/environments#environment-based-startup-class-and-methods](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23environment-based-startup-class-and-methods).

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


If you get a scaffolding error, verify the Target Framework Moniker (TFM) matches the NuGet package version in the project file. For example, the following project file contains the version 3.1 for .NET Core and the listed NuGet packages:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore" Version="3.1.0" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="3.1.0" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.UI" Version="3.1.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="3.1.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="3.1.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="3.1.0" />
    <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="3.1.0" />
  </ItemGroup>

</Project>
```


### Add a database context class

* In the *RazorPagesMovie* project, create a new folder named *Data*.
* Add the following `RazorPagesMovieContext` class to the *Data* folder:

  [Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Data/RazorPagesMovieContext.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code creates a `DbSet` property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table, and an entity corresponds to a row in the table. The code won't compile until dependencies are added in a later step.

<a name="cs"></a>

### Add a database connection string

Add a connection string to the `appsettings.json` file as shown in the following highlighted code:

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/appsettings_SQLite.json?highlight=10-12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

<a name="reg"></a>

### Register the database context

Add the following `using` statements at the top of `Startup.cs`:

```csharp
using RazorPagesMovie.Data;
using Microsoft.EntityFrameworkCore;
```

Register the database context with the [dependency injection](../../fundamentals/dependency-injection.md) container in `Startup.ConfigureServices`.

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Startup.cs?name=snippet_UseSqlite\\&highlight=5-6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

# [Visual Studio for Mac](#tab/visual-studio-mac)

* In the **Solution Tool Window**, control-click the **RazorPagesMovie** project, and then select **Add** > **New Folder...**. Name the folder `Models`.
* Right-click the `Models` folder, and then select **Add** > **New File...**.
* In the **New File** dialog:

  * Select **General** in the left pane.
  * Select **Empty Class** in the center pane.
  * Name the class **Movie** and select **New**.

Add the following properties to the `Movie` class:

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs?name=snippet1](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* `[DataType(DataType.Date)]`: The [DataType](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute specifies the type of the data (`Date`). With this attribute:

  * The user is not required to enter time information in the date field.
  * Only the date is displayed, not time information.

---

[DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations) are covered in a later tutorial.

Build the project to verify there are no compilation errors.

## Scaffold the movie model

In this section, the movie model is scaffolded. That is, the scaffolding tool produces pages for Create, Read, Update, and Delete (CRUD) operations for the movie model.

# [Visual Studio](#tab/visual-studio)

Create a *Pages/Movies* folder:

* Right-click on the *Pages* folder > **Add** > **New Folder**.
* Name the folder *Movies*.

Right-click on the *Pages/Movies* folder > **Add** > **New Scaffolded Item**.

New Scaffolded Item on VScode

In the **Add Scaffold** dialog, select **Razor Pages using Entity Framework (CRUD)** > **Add**.

Add Scaffold on VScode

Complete the **Add Razor Pages using Entity Framework (CRUD)** dialog:

* In the **Model class** drop down, select **Movie (RazorPagesMovie.Models)**.
* In the **Data context class** row, select the **+** (plus) sign and change the generated name from RazorPagesMovie.*`Models`*.RazorPagesMovieContext to RazorPagesMovie.**Data**.RazorPagesMovieContext. [This change](https://developercommunity.visualstudio.com/content/problem/652166/aspnet-core-ef-scaffolder-uses-incorrect-namespace.html) is not required. It creates the database context class with the correct namespace.
* Select **Add**.

Add Razor Pages on VScode

The `appsettings.json` file is updated with the connection string used to connect to a local database.

# [Visual Studio Code](#tab/visual-studio-code)

<!--  Until https://github.com/aspnet/Scaffolding/issues/582 is fixed windows needs backslash or the namespace is namespace RazorPagesMovie.Pages_Movies rather than namespace RazorPagesMovie.Pages.Movies
-->

* Open a command window in the project directory, which contains the `Program.cs`, `Startup.cs`, and `.csproj` files.

* **For Windows**: Run the following command:

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Movie -dc RazorPagesMovieContext -udl -outDir Pages\Movies --referenceScriptLibraries
  ```

* **For macOS and Linux**: Run the following command:

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Movie -dc RazorPagesMovieContext -udl -outDir Pages/Movies --referenceScriptLibraries
  ```

<a name="codegenerator"></a>
The following table details the ASP.NET Core code generator options:

| Option | Description |
| --- | --- |
| `-m` | The name of the model. |
| `-dc` | The `DbContext` class to use. |
| `-udl` | Use the default layout. |
| `-outDir` | The relative output folder path to create the views. |
| `--referenceScriptLibraries` | Adds `_ValidationScriptsPartial` to Edit and Create pages |

Use the `-h` option to get help on the `dotnet aspnet-codegenerator razorpage` command:

```dotnetcli
dotnet aspnet-codegenerator razorpage -h
```

For more information, see [dotnet aspnet-codegenerator](../../fundamentals/tools/dotnet-aspnet-codegenerator.md).

### Use SQLite for development, SQL Server for production

When SQLite is selected, the template generated code is ready for development. The following code shows how to inject [Microsoft.AspNetCore.Hosting.IWebHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment) into Startup. `IWebHostEnvironment` is injected so `ConfigureServices` can use SQLite in development and SQL Server in production.

[Code reference unavailable in this source snapshot: model/includes/~/includes/RP/code/StartupDevProd.cs?name=snippet\\&highlight=5,10,14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

# [Visual Studio for Mac](#tab/visual-studio-mac)

Create a *Pages/Movies* folder:

* Right-click on the *Pages* folder > **Add** > **New Folder**.
* Name the folder *Movies*.

Right-click on the *Pages/Movies* folder > **Add** > **New Scaffolding...**.

New Scaffolding on Visual Studio for Mac

In the **New Scaffolding** dialog, select **Razor Pages using Entity Framework (CRUD)** > **Next**.

Add Scaffolding on Visual Studio for Mac

Complete the **Add Razor Pages using Entity Framework (CRUD)** dialog:

* In the **Model class** drop down, select, or type, **Movie (RazorPagesMovie.Models)**.
* In the **Data context class** row, type the name for the new class, RazorPagesMovie.**Data**.RazorPagesMovieContext. [This change](https://developercommunity.visualstudio.com/content/problem/652166/aspnet-core-ef-scaffolder-uses-incorrect-namespace.html) is not required. It creates the database context class with the correct namespace.
* Select **Add**.

Add Razor Page on Visual Studio for Mac

The `appsettings.json` file is updated with the connection string used to connect to a local database.

### Add EF tools

Run the following .NET CLI command:

```dotnetcli
dotnet tool install --global dotnet-ef
```

The preceding command adds the Entity Framework Core Tools for the .NET CLI. For more information, see [Entity Framework Core tools reference - .NET CLI](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet).

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.


### Use SQLite for development, SQL Server for production

When SQLite is selected, the template generated code is ready for development. The following code shows how to inject [Microsoft.AspNetCore.Hosting.IWebHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment) into Startup. `IWebHostEnvironment` is injected so `ConfigureServices` can use SQLite in development and SQL Server in production.

[Code reference unavailable in this source snapshot: model/includes/~/includes/RP/code/StartupDevProd.cs?name=snippet\\&highlight=5,10,14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

---

### Files created

# [Visual Studio](#tab/visual-studio)

The scaffold process creates and updates the following files:

* *Pages/Movies*: Create, Delete, Details, Edit, and Index.
* `Data/RazorPagesMovieContext.cs`

### Updated

* `Startup.cs`

The created and updated files are explained in the next section.

# [Visual Studio for Mac](#tab/visual-studio-mac)

The scaffold process creates and updates the following files:

* *Pages/Movies*: Create, Delete, Details, Edit, and Index.
* `Data/RazorPagesMovieContext.cs`

### Updated

* `Startup.cs`

The created and updated files are explained in the next section.

# [Visual Studio Code](#tab/visual-studio-code)

The scaffold process creates the following files:

* *Pages/Movies*: Create, Delete, Details, Edit, and Index.

The created files are explained in the next section.

---

<a name="pmc"></a>

## Initial migration

# [Visual Studio](#tab/visual-studio)

In this section, the Package Manager Console (PMC) is used to:

* Add an initial migration.
* Update the database with the initial migration.

From the **Tools** menu, select **NuGet Package Manager** > **Package Manager Console**.

  PMC menu

In the PMC, enter the following commands:

```powershell
Add-Migration InitialCreate
Update-Database
```

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

If `dotnet ef` has not been installed, install it as a global tool:

```dotnetcli
  dotnet tool install --global dotnet-ef
```

For more information on the CLI for EF Core, see [EF Core tools reference for the .NET CLI](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet).

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.



Run the following .NET CLI commands:

```dotnetcli
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

The preceding commands generate the following warning: "No type was specified for the decimal column 'Price' on entity type 'Movie'. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values using 'HasColumnType()'."

Ignore the warning, as it will be addressed in a later step.

The migrations command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument is used to name the migrations. Any name can be used, but by convention a name is selected that describes the migration.

The `update` command runs the `Up` method in migrations that have not been applied. In this case, `update` runs the `Up` method in  `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

# [Visual Studio](#tab/visual-studio)

### Examine the context registered with dependency injection

ASP.NET Core is built with [dependency injection](../../fundamentals/dependency-injection.md). Services, such as the EF Core database context, are registered with dependency injection during application startup. Components that require these services, such as Razor Pages, are provided via constructor parameters. The constructor code that gets a database context instance is shown later in the tutorial.

The scaffolding tool automatically created a database context and registered it with the dependency injection container.

Examine the `Startup.ConfigureServices` method. The highlighted line was added by the scaffolder:

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Startup.cs?name=snippet_ConfigureServices\\&highlight=5-6](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The `RazorPagesMovieContext` coordinates EF Core functionality, such as Create, Read, Update and Delete, for the `Movie` model. The data context (`RazorPagesMovieContext`) is derived from [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext). The data context specifies which entities are included in the data model.

[Code reference unavailable in this source snapshot: model/includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Data/RazorPagesMovieContext.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model.md)

The preceding code creates a [DbSet\<Movie>](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%25601) property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed in to the context by calling a method on a [DbContextOptions](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptions) object. For local development, the [Configuration system](../../fundamentals/configuration/index.md) reads the connection string from the `appsettings.json` file.

# [Visual Studio Code / Visual Studio for Mac](#tab/visual-studio-code+visual-studio-mac)

Examine the `Up` method.

---

<a name="test"></a>

### Test the app

* Run the app and append `/Movies` to the URL in the browser (`http://localhost:port/movies`).

If you get the error:

```console
SqlException: Cannot open database "RazorPagesMovieContext-GUID" requested by the login. The login failed.
Login failed for user 'User-name'.
```

You missed the [migrations step](#pmc).

* Test the **Create** link.

  Create page

  > **Note:**
  > You may not be able to enter decimal commas in the `Price` field. To support [jQuery validation](https://jqueryvalidation.org/) for non-English locales that use a comma (",") for a decimal point and for non US-English date formats, the app must be globalized. For globalization instructions, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/4076#issuecomment-326590420).

* Test the **Edit**, **Details**, and **Delete** links.

The next tutorial explains the files created by scaffolding.

## Next steps

> 
> [Previous: Get Started](razor-pages-start.md)
> [Next: Scaffolded Razor Pages](page.md)
