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

   [Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs?name=snippet1)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs.md)

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* `[DataType(DataType.Date)]`: The [\[DataType\]](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.DataTypeAttribute) attribute specifies the type of the data (`Date`). With this attribute:

  * The user isn't required to enter time information in the date field.
  * Only the date is displayed, not time information.

# [Visual Studio Code](#tab/visual-studio-code)

1. Add a folder named `Models`.
1. Add a class to the `Models` folder named `Movie.cs`.

Add the following properties to the `Movie` class:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs?name=snippet1)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs.md)

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
* The [aspnet-codegenerator scaffolding tool](../../../../fundamentals/tools/dotnet-aspnet-codegenerator.md).
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

   [Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs?name=snippet1)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs.md)

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

For more information, see [dotnet aspnet-codegenerator](../../../../fundamentals/tools/dotnet-aspnet-codegenerator.md).

<a name="sqlite-dev"></a>
### Use SQLite for development, SQL Server for production

When SQLite is selected, the template generated code is ready for development. The following code shows how to inject [Microsoft.AspNetCore.Hosting.IWebHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment) into `Startup`. `IWebHostEnvironment` is injected so `ConfigureServices` can use SQLite in development and SQL Server in production.

[Code reference unavailable in this source snapshot: ../../../../includes/RP/~/includes/RP/code/StartupDevProdV5.cs?name=snippet\\&highlight=5,10,14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model/includes/model5.md)


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

[Code reference unavailable in this source snapshot: ../../../../includes/RP/~/includes/RP/code/StartupDevProdV5.cs?name=snippet\\&highlight=5,10,14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model/includes/model5.md)


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

ASP.NET Core is built with [dependency injection](../../../../fundamentals/dependency-injection.md). Services, such as the EF Core database context, are registered with dependency injection during application startup. Components that require these services (such as Razor Pages) are provided via constructor parameters. The constructor code that gets a database context instance is shown later in the tutorial.

The scaffolding tool automatically created a database context and registered it with the dependency injection container.

Examine the `Startup.ConfigureServices` method. The highlighted line was added by the scaffolder:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Startup.cs?name=snippet_ConfigureServices\&highlight=5-6)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Startup.cs.md)

The `RazorPagesMovieContext` coordinates EF Core functionality, such as Create, Read, Update and Delete, for the `Movie` model. The data context (`RazorPagesMovieContext`) is derived from [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext). The data context specifies which entities are included in the data model.

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Data/RazorPagesMovieContext.cs)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie50/Data/RazorPagesMovieContext.cs.md)

The preceding code creates a [DbSet\<Movie>](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%25601) property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed in to the context by calling a method on a [DbContextOptions](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptions) object. For local development, the [Configuration system](../../../../fundamentals/configuration/index.md) reads the connection string from the `appsettings.json` file.

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

[Code reference unavailable in this source snapshot: ../../../../includes/~/includes/sql-log/appsettings.json?highlight=10](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/tutorials/razor-pages/model/includes/model5.md)

With the preceding JSON, SQL statements are displayed on the command line and in the Visual Studio output window.

For more information, see the following resources:

* [fundamentals/logging/index#configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Flogging%2Findex%23configuration)
* [ASP.NET template disables EF Core SQL logging by default (`dotnet/aspnetcore` #32977)](https://github.com/dotnet/aspnetcore/issues/32977)


The next tutorial explains the files created by scaffolding.

## Next steps

> 
> [Previous: Get Started](../../razor-pages-start.md)
> [Next: Scaffolded Razor Pages](../../page.md)
