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

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs?name=snippet1)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs.md)

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

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs?name=snippet1)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs.md)

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

* The [aspnet-codegenerator scaffolding tool](../../../../fundamentals/tools/dotnet-aspnet-codegenerator.md).
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

  [Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Data/RazorPagesMovieContext.cs)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Data/RazorPagesMovieContext.cs.md)

The preceding code creates a `DbSet` property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table, and an entity corresponds to a row in the table. The code won't compile until dependencies are added in a later step.

<a name="cs"></a>

### Add a database connection string

Add a connection string to the `appsettings.json` file as shown in the following highlighted code:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/appsettings_SQLite.json?highlight=10-12)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/appsettings_SQLite.json.md)

<a name="reg"></a>

### Register the database context

Add the following `using` statements at the top of `Startup.cs`:

```csharp
using RazorPagesMovie.Data;
using Microsoft.EntityFrameworkCore;
```

Register the database context with the [dependency injection](../../../../fundamentals/dependency-injection.md) container in `Startup.ConfigureServices`.

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Startup.cs?name=snippet_UseSqlite\&highlight=5-6)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Startup.cs.md)

# [Visual Studio for Mac](#tab/visual-studio-mac)

* In the **Solution Tool Window**, control-click the **RazorPagesMovie** project, and then select **Add** > **New Folder...**. Name the folder `Models`.
* Right-click the `Models` folder, and then select **Add** > **New File...**.
* In the **New File** dialog:

  * Select **General** in the left pane.
  * Select **Empty Class** in the center pane.
  * Name the class **Movie** and select **New**.

Add the following properties to the `Movie` class:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs?name=snippet1)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs.md)

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

For more information, see [dotnet aspnet-codegenerator](../../../../fundamentals/tools/dotnet-aspnet-codegenerator.md).

### Use SQLite for development, SQL Server for production

When SQLite is selected, the template generated code is ready for development. The following code shows how to inject [Microsoft.AspNetCore.Hosting.IWebHostEnvironment](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.IWebHostEnvironment) into Startup. `IWebHostEnvironment` is injected so `ConfigureServices` can use SQLite in development and SQL Server in production.

[Code example (complete source file; reference: \~/includes/RP/code/StartupDevProd.cs?name=snippet\&highlight=5,10,14)](../../../../../_code/aspnetcore/includes/RP/code/StartupDevProd.cs.md)

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

[Code example (complete source file; reference: \~/includes/RP/code/StartupDevProd.cs?name=snippet\&highlight=5,10,14)](../../../../../_code/aspnetcore/includes/RP/code/StartupDevProd.cs.md)

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

ASP.NET Core is built with [dependency injection](../../../../fundamentals/dependency-injection.md). Services, such as the EF Core database context, are registered with dependency injection during application startup. Components that require these services, such as Razor Pages, are provided via constructor parameters. The constructor code that gets a database context instance is shown later in the tutorial.

The scaffolding tool automatically created a database context and registered it with the dependency injection container.

Examine the `Startup.ConfigureServices` method. The highlighted line was added by the scaffolder:

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Startup.cs?name=snippet_ConfigureServices\&highlight=5-6)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Startup.cs.md)

The `RazorPagesMovieContext` coordinates EF Core functionality, such as Create, Read, Update and Delete, for the `Movie` model. The data context (`RazorPagesMovieContext`) is derived from [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext). The data context specifies which entities are included in the data model.

[Code example (complete source file; reference: \~/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Data/RazorPagesMovieContext.cs)](../../../../../_code/aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Data/RazorPagesMovieContext.cs.md)

The preceding code creates a [DbSet\<Movie>](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%25601) property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed in to the context by calling a method on a [DbContextOptions](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptions) object. For local development, the [Configuration system](../../../../fundamentals/configuration/index.md) reads the connection string from the `appsettings.json` file.

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
> [Previous: Get Started](../../razor-pages-start.md)
> [Next: Scaffolded Razor Pages](../../page.md)
