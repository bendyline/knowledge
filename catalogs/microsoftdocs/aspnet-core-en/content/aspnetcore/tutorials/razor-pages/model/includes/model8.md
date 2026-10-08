
**Applies to: \= aspnetcore-8.0**

In this tutorial, classes are added for managing movies in a database. The app's model classes use [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core) to work with the database. EF Core is an object-relational mapper (O/RM) that simplifies data access. You write the model classes first, and EF Core creates the database.

The model classes are known as POCO classes (from "**P**lain-**O**ld **C**LR **O**bjects") because they don't have a dependency on EF Core. They define the properties of the data that are stored in the database.

## Add a data model

# [Visual Studio](#tab/visual-studio)

1. In **Solution Explorer**, right-click the *RazorPagesMovie* project > **Add** > **New Folder**. Name the folder `Models`.
1. Right-click the `Models` folder. Select **Add** > **Class**. Name the class *Movie*.
1. Add the following properties to the `Movie` class:

   [Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/Movie.cs?name=snippet1)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/Movie.cs.md)

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

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/Movie.cs?name=snippet1)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Models/Movie.cs.md)

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
* The [aspnet-codegenerator scaffolding tool](../../../../fundamentals/tools/dotnet-aspnet-codegenerator.md).
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

For more information, see [dotnet aspnet-codegenerator](../../../../fundamentals/tools/dotnet-aspnet-codegenerator.md).

<h3 id="sqlite-ss-6">Use SQLite for development, SQL Server for production</h3>

When SQLite is selected, the template generated code is ready for development. The following code shows how to select the SQLite connection string in development and SQL Server in production.

[Code reference unavailable in this source snapshot: ../../../../includes/~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/ProgramProd.cs?name=snippet\\&highlight=7-16](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model/includes/model8.md)

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

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs?name=snippet_all\&highlight=1-3,8-9)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs?name=snippet_all_sl\&highlight=1-2,8-9)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs.md)

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

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Data/RazorPagesMovieContext.cs)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Data/RazorPagesMovieContext.cs.md)

The preceding code creates a [DbSet\<Movie>](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%25601) property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed in to the context by calling a method on a [DbContextOptions](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptions) object. For local development, the [Configuration system](../../../../fundamentals/configuration/index.md) reads the connection string from the `appsettings.json` file.

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

ASP.NET Core is built with [dependency injection](../../../../fundamentals/dependency-injection.md). Services, such as the EF Core database context, are registered with dependency injection during application startup. Components that require these services (such as Razor Pages) are provided via constructor parameters. The constructor code that gets a database context instance is shown later in the tutorial.

The scaffolding tool automatically created a database context and registered it with the dependency injection container. The following highlighted code is added to the `Program.cs` file by the scaffolder:

# [Visual Studio](#tab/visual-studio)

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs?name=snippet_all\&highlight=9-10)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs.md)

# [Visual Studio Code](#tab/visual-studio-code)
[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs?name=snippet_all_sl\&highlight=7-8)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80/Program.cs.md)

---

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. [View or download completed project](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie80) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

## Next steps

> 
> [Previous: Get Started](../../razor-pages-start.md)
> [Next: Scaffolded Razor Pages](../../page.md)
