---
title: Build a Blazor movie database app (Part 2 - Add and scaffold a model)
ai-usage: ai-assisted
author: guardrex
description: This part of the Blazor movie database app tutorial explains how to add a movie class to the app and scaffold the database and UI from the movie class.
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 09/15/2026
uid: blazor/tutorials/movie-database-app/part-2
zone_pivot_groups: tooling
---
# Build a Blazor movie database app (Part 2 - Add and scaffold a model)

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here)moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here)moniker-end
-->

<!--
Include either this file or 'not-latest-version.md' at the top of articles.

'not-latest-version.md': Includes not-supported content.
'not-latest-version-without-not-supported-content.md' (this file): Doesn't include not-supported content.

Use this file in articles that target >=8.0 until 10.0 reaches EOL, and then update those
articles to use 'not-latest-version.md'. For articles that target >=7.0, 'not-latest-version.md'
can be used without creating a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current version
moniker range section until the new moniker is created.

Markdown to include this file:
[!INCLUDE[](~/includes/not-latest-version-without-not-supported-content.md)]
-->


This article is the second part of the Blazor movie database app tutorial that teaches you the basics of building an ASP.NET Core Blazor Web App with features to manage a movie database.

In this part of the tutorial series:

* A class is added to the app representing a movie in a database.
* [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core) services and tooling create a database context and database. EF Core is an object-relational mapper (O/RM) that simplifies data access. You write model classes first, and EF Core creates the database from the model classes, which is called *scaffolding*.
* Additional tooling scaffolds a Razor component-based UI for interacting with the movie records in the database via the database context.

## Add a data model

**Applies to: vs**


In **Solution Explorer**, right-click the `BlazorWebAppMovies` project and select **Add** > **New Folder**. Name the folder `Models`.

Right-click the `Models` folder. Select **Add** > **Class**. Name the file `Movie.cs`. Use the following contents for the file.



**Applies to: vsc**


Add a folder to the project named `Models`.

Add a class file to the `Models` folder named `Movie.cs`. Use the following contents for the file.



**Applies to: cli**


Add a folder to the project named `Models`.

Add a class file to the `Models` folder named `Movie.cs`. Use the following contents for the file.



`Models/Movie.cs`:

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlazorWebAppMovies.Models;

public class Movie
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public DateOnly ReleaseDate { get; set; }

    public string? Genre { get; set; }

    [DataType(DataType.Currency)]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }
}
```

The `Movie` class contains:

* A record identifier property (`Id`), which is required by EF Core and the database to track records. In the database, the `Id` property is the database record's primary key.
* Other properties that describe aspects of a movie:
  * Title (`Title`)
  * Release date (`ReleaseDate`)
  * Genre (`Genre`)
  * Price (`Price`)

The question mark on a `string` type indicates that the property is nullable (it can hold a `null` value).

The EF Core database provider selects data types based on the .NET types of the model's properties. The provider also takes into account other metadata provided by [System.ComponentModel.DataAnnotations](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations), which are a set of attribute classes placed above a model's property with the following format, where the `{ANNOTATION}` placeholder is the annotation name. You can place multiple annotations on the same line separated by commas inside the brackets, or you can place multiple annotations on separate lines, which is the approach adopted by this tutorial series. 

```csharp
[{ANNOTATION}]
```

The `Price` property in the `Movie` class file has two data annotations:

```csharp
[DataType(DataType.Currency)]
[Column(TypeName = "decimal(18, 2)")]
public decimal Price { get; set; }
```

These annotations specify:

* That the property holds a currency data type.
* The database column is a decimal of 18 digits with two decimal places.

More information on data annotations, including adding data annotations for validation, is covered in a later part of the tutorial series.

**Applies to: vs**


Select **Build** > **Build Solution** from the menu bar or press <kbd>F6</kbd> on the keyboard. Confirm in the **Output** panel that the build succeeded.



**Applies to: vsc**


## Add Nuget packages and tools

**Applies to: \>= aspnetcore-9.0**

To add the `dotnet scaffold` tool, execute the following .NET CLI command in the **Terminal** (**Terminal** menu > **New Terminal**) opened to the project's root folder:

```dotnetcli
dotnet tool install --global Microsoft.dotnet-scaffold
```



**Applies to: < aspnetcore-9.0**

To add the required NuGet packages and tools, execute the following .NET CLI commands in the **Terminal** (**Terminal** menu > **New Terminal**) opened to the project's root folder.

Paste all of the following commands at the prompt (`>`) of the **Terminal**. When you paste multiple commands, a warning may appear stating that multiple commands will execute. Dismiss the warning and proceed with the paste operation.

When you paste multiple commands, all of the commands execute except the last one. The last command doesn't execute until you press <kbd>Enter</kbd> on the keyboard.

```dotnetcli
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Components.QuickGrid
dotnet add package Microsoft.AspNetCore.Components.QuickGrid.EntityFrameworkAdapter
dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore
```

> **Important:**
> After the first eight commands execute, make sure that you press <kbd>Enter</kbd> on the keyboard to execute the last command.

> **Note:**
> The preceding commands are .NET CLI commands, and .NET CLI commands are executed when entered at a [PowerShell](https://learn.microsoft.com/powershell/) prompt, which is the default command shell of the VS Code **Terminal**.

The preceding commands add:

* [Command-line interface (CLI) tools for EF Core](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet).
* [`aspnet-codegenerator` scaffolding tool](../../../fundamentals/tools/dotnet-aspnet-codegenerator.md).
* Design time tools for EF Core.
* The SQLite and SQL Server providers with the EF Core package as a dependency.
* [`Microsoft.VisualStudio.Web.CodeGeneration.Design`](https://www.nuget.org/packages/Microsoft.VisualStudio.Web.CodeGeneration.Design) for scaffolding.
* [`Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore`](https://www.nuget.org/packages/Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore) to use the [Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter%252A) extension method in the `Program` file, which captures database-related exceptions.



Save any open files.

In the **Command Palette** (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), use the `.NET: Build` command to build the app.

Confirm that the app built successfully.



**Applies to: cli**


## Add Nuget packages and tools

**Applies to: \>= aspnetcore-9.0**

To add the `dotnet scaffold` tool, execute the following .NET CLI command in a command shell opened to the project's root folder:

```dotnetcli
dotnet tool install --global Microsoft.dotnet-scaffold
```



**Applies to: < aspnetcore-9.0**

To add the required NuGet packages and tools, execute the following .NET CLI commands in a command shell opened to the project's root folder.

Paste all of the following commands at the prompt (`>`) of the command shell. When you paste multiple commands, a warning may appear stating that multiple commands will execute. Dismiss the warning and proceed with the paste operation.

When you paste multiple commands, all of the commands execute except the last one. The last command doesn't execute until you press <kbd>Enter</kbd> on the keyboard.

```dotnetcli
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Components.QuickGrid
dotnet add package Microsoft.AspNetCore.Components.QuickGrid.EntityFrameworkAdapter
dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore
```

The preceding commands add:

* [Command-line interface (CLI) tools for EF Core](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet).
* [`aspnet-codegenerator` scaffolding tool](../../../fundamentals/tools/dotnet-aspnet-codegenerator.md).
* Design time tools for EF Core.
* The SQLite and SQL Server providers with the EF Core package as a dependency.
* [`Microsoft.VisualStudio.Web.CodeGeneration.Design`](https://www.nuget.org/packages/Microsoft.VisualStudio.Web.CodeGeneration.Design) for scaffolding.
* [`Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore`](https://www.nuget.org/packages/Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore) to use the [Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter%252A) extension method in the `Program` file, which captures database-related exceptions. 



Save any open files.

In a command shell opened to the project's root folder, execute the [`dotnet build`](https://learn.microsoft.com/dotnet/core/tools/dotnet-build) command:

```dotnetcli
dotnet build
```

Confirm that the app built successfully.



## Scaffold the model

In this section, the `Movie` model is used to *scaffold* a database context and a UI for managing movies in the database. .NET scaffolding is a code generation framework for .NET applications. You use scaffolding to quickly add database and UI code that interacts with data models.

**Applies to: vs**


Right-click on the `Components/Pages` folder and select **Add** > **New Scaffolded Item**:

New Scaffolded Item

With the **Add New Scaffold Item** dialog open to **Installed** > **Common** > **Blazor** > **Razor Component**, select **Razor Components using Entity Framework (CRUD)**. Select the **Add** button.

*CRUD* is an acronym for Create, Read, Update, and Delete. The scaffolder produces create, edit, delete, details, and index components for the app.

Scaffold item

Complete the **Add Razor Components using Entity Framework (CRUD)** dialog:

* The **Template** dropdown list includes other templates for specifically creating create, edit, delete, details, and list components. This dropdown list comes in handy when you only need to create a specific type of component scaffolded to a model class. Leave the **Template** dropdown list set to **CRUD** to scaffold a full set of components.
* In the **Model class** dropdown list, select **Movie (BlazorWebAppMovies.Models)**.
* For **DbContext class**, select the **+** (plus sign) button.
* In the **Add Data Context** modal dialog, the class name `BlazorWebAppMovies.Data.BlazorWebAppMoviesContext` is generated. Use the default generated value. Select the **Add** button.
* After the model dialog closes, the **Database provider** dropdown list defaults to **SQL Server**. When you're building apps in the future, you can select the appropriate provider for the database that you're using. The options include SQLite, PostgreSQL, and Azure Cosmos DB. Leave the **Database provider** dropdown list set to **SQL Server**.
* Select **Add**.

Add Razor components using EF CRUD dialog



**Applies to: vsc**


In the **Terminal** (**Terminal** menu > **New Terminal**) opened to the project's root directory, execute the following command. SQLite is used as the database for users adopting VS Code tooling for this tutorial series.

**Applies to: \>= aspnetcore-9.0**

```dotnetcli
dotnet scaffold
```

When the initializing prompt appears, press <kbd>Enter</kbd> on the keyboard.

For the **Scaffolding Category**, use the arrow keys to select **Blazor**. Press <kbd>Enter</kbd>.

For the **Command Name**, use the arrow keys to select **Razor Components with EntityFrameworkCore (CRUD)**. Press <kbd>Enter</kbd>.

*CRUD* is an acronym for Create, Read, Update, and Delete. The scaffolder produces create, edit, delete, details, and index components for the app.

For the **.NET project file**, press <kbd>Enter</kbd> to accept the app's project file (`BlazorWebAppMovies.csproj`).

For the **Model Name**, confirm that **Movie** (`Movie` class) is selected. Press <kbd>Enter</kbd>.

For the **Data Context Class**, type `BlazorWebAppMoviesContext`. Press <kbd>Enter</kbd>.

For the **Database Provider**, use the arrow keys to select **sqlite-efcore**. Press <kbd>Enter</kbd>.

For **Page**, confirm that **CRUD** is selected. Press <kbd>Enter</kbd>.

When prompted to include prerelease packages, use the arrow keys to select **No**. Press <kbd>Enter</kbd>.

Executing the `dotnet scaffold` command adds the following tools and packages to the app:

* [Command-line interface (CLI) tools for EF Core](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet).
* [`dotnet scaffold` tooling](https://devblogs.microsoft.com/dotnet/introducing-dotnet-scaffold/).
* Design time tools for EF Core.
* The SQLite provider with the EF Core package as a dependency.
* [`Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore`](https://www.nuget.org/packages/Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore) to use the [Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter%252A) extension method in the `Program` file, which captures database-related exceptions. 



**Applies to: < aspnetcore-9.0**

```dotnetcli
dotnet aspnet-codegenerator blazor CRUD -dbProvider sqlite -dc BlazorWebAppMovies.Data.BlazorWebAppMoviesContext -m Movie -outDir Components/Pages
```

*CRUD* is an acronym for Create, Read, Update, and Delete. The `blazor` generator with the `CRUD` template produces create, edit, delete, details, and index components for the app.

The following details the ASP.NET Core code generator options used in the preceding command:

* `-dbProvider`: Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`.
* `-dc`: The [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class to use, including the namespace (`BlazorWebAppMovies.Data`).
* `-m`: The name of the model.
* `-outDir`: The output directory for the generated components. A folder is created from the model name in the output directory to hold the components (for example, `MoviePages` in this case).





**Applies to: cli**


In a command shell opened to the project's root folder, execute the following command. SQLite is used as the database for users adopting .NET CLI tooling for this tutorial series.

**Applies to: \>= aspnetcore-9.0**

```dotnetcli
dotnet scaffold
```

When the initializing prompt appears, press <kbd>Enter</kbd> on the keyboard.

For the **Scaffolding Category**, use the arrow keys to select **Blazor**. Press <kbd>Enter</kbd>.

For the **Command Name**, use the arrow keys to select **Razor Components with EntityFrameworkCore (CRUD)**. Press <kbd>Enter</kbd>.

*CRUD* is an acronym for Create, Read, Update, and Delete. The scaffolder produces create, edit, delete, details, and index components for the app.

For the **.NET project file**, press <kbd>Enter</kbd> to accept the app's project file (`BlazorWebAppMovies.csproj`).

For the **Model Name**, confirm that **Movie** (`Movie` class) is selected. Press <kbd>Enter</kbd>.

For the **Data Context Class**, type `BlazorWebAppMoviesContext`. Press <kbd>Enter</kbd>.

For the **Database Provider**, use the arrow keys to select **sqlite-efcore**. Press <kbd>Enter</kbd>.

For **Page**, confirm that **CRUD** is selected. Press <kbd>Enter</kbd>.

When prompted to include prerelease packages, use the arrow keys to select **No**. Press <kbd>Enter</kbd>.

Executing the `dotnet scaffold` command adds the following tools and packages to the app:

* [Command-line interface (CLI) tools for EF Core](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet).
* [`dotnet scaffold` tooling](https://devblogs.microsoft.com/dotnet/introducing-dotnet-scaffold/).
* Design time tools for EF Core.
* The SQLite provider with the EF Core package as a dependency.
* [`Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore`](https://www.nuget.org/packages/Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore) to use the [Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter%252A) extension method in the `Program` file, which captures database-related exceptions. 



**Applies to: < aspnetcore-9.0**

```dotnetcli
dotnet aspnet-codegenerator blazor CRUD -dbProvider sqlite -dc BlazorWebAppMovies.Data.BlazorWebAppMoviesContext -m Movie -outDir Components/Pages
```

*CRUD* is an acronym for Create, Read, Update, and Delete. The `blazor` generator with the `CRUD` template produces create, edit, delete, details, and index components for the app.

The following details the ASP.NET Core code generator options used in the preceding command:

* `-dbProvider`: Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`.
* `-dc`: The [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) class to use, including the namespace (`BlazorWebAppMovies.Data`).
* `-m`: The name of the model.
* `-outDir`: The output directory for the generated components. A folder is created from the model name in the output directory to hold the components (for example, `MoviePages` in this case).





The `appsettings.json` file is updated with the connection string used to connect to a local database. In the following example, the `{CONNECTION STRING}` is the connection string automatically generated by the scaffolder:

```json
"ConnectionStrings": {
  "BlazorWebAppMoviesContext": "{CONNECTION STRING}"
}
```

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the [Secret Manager tool](../../../security/app-secrets.md) is recommended for securing sensitive data. For more information, see [Securely maintain sensitive data and credentials](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23securely-maintain-sensitive-data-and-credentials).


## Files created and updated by scaffolding

The scaffolding process creates the following component files and movie database context class file:

* `Components/Pages/MoviePages`
  * `Create.razor`: Creates new movie entities.
  * `Delete.razor`: Deletes a movie entity.
  * `Details.razor`: Shows movie entity details.
  * `Edit.razor`: Updates a movie entity.
  * `Index.razor`: Lists movie entities (records) in the database.
* `Data/BlazorWebAppMoviesContext.cs`: Database context file ([Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext)).

The component files in the `MoviePages` folder are described in greater detail in the next part of this tutorial. The database context is described later in this article.

**Applies to: vs**


If the `MoviePages` folder and assets aren't present after scaffolding, return to the [Scaffold the model](#scaffold-the-model) section and rescaffold the `Movie` model, making sure that you select the **Razor Components using Entity Framework (CRUD)** scaffolder under **Installed** > **Common** > **Blazor** > **Razor Component** in the **Add New Scaffold Item** dialog.



ASP.NET Core is built with dependency injection (DI), which is a software design pattern for achieving [Inversion of Control (IoC)](https://learn.microsoft.com/dotnet/standard/modern-web-apps-azure-architecture/architectural-principles#dependency-inversion) between classes and their dependencies. Services, such as the EF Core database context, are registered with DI during application startup. These services are injected into Razor components for use by the components.

The [`QuickGrid` component](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.QuickGrid) is a Razor component for efficiently displaying data in tabular form. The scaffolder places a `QuickGrid` component in the `Index` component (`Components/Pages/Index.razor`) to display movie entities. Calling [Microsoft.Extensions.DependencyInjection.EntityFrameworkAdapterServiceCollectionExtensions.AddQuickGridEntityFrameworkAdapter%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.EntityFrameworkAdapterServiceCollectionExtensions.AddQuickGridEntityFrameworkAdapter%252A) on the service collection adds an EF Core adapter for QuickGrid to recognize EF Core-supplied [System.Linq.IQueryable%601](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable%25601) instances and to resolve database queries asynchronously for efficiency.

In combination with [Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage%252A), [Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter%252A) captures database-related exceptions that can be resolved by using Entity Framework migrations. When these exceptions occur, an HTML response is generated with details about possible actions to resolve the issue.

**Applies to: vs**


The following code is added to the `Program` file by the scaffolder if the database provider is SQL Server. The first statement of the following code registers a database context factory in the DI container to create database context instances on demand. A database context is used to perform database operations, such as reading and updating database records.

```csharp
builder.Services.AddDbContextFactory<BlazorWebAppMoviesContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("BlazorWebAppMoviesContext") ?? 
        throw new InvalidOperationException(
            "Connection string 'BlazorWebAppMoviesContext' not found.")));

builder.Services.AddQuickGridEntityFrameworkAdapter();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
```



**Applies to: vsc**


The first statement reads and validates the connection string, and the second registers a database context factory in the DI container. A database context is used to perform database operations, such as reading and updating database records.

```csharp
var connectionString = 
    builder.Configuration.GetConnectionString("BlazorWebAppMoviesContext") ?? 
    throw new InvalidOperationException(
        "Connection string 'BlazorWebAppMoviesContext' not found.");

builder.Services.AddDbContextFactory<BlazorWebAppMoviesContext>(options => options.UseSqlite(connectionString));

builder.Services.AddQuickGridEntityFrameworkAdapter();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
```



**Applies to: cli**


The following code is added to the `Program` file by the scaffolder if the database provider is SQLite. The first statement reads and validates the connection string, and the second statement registers a database context factory in the DI container to create database context instances on demand. A database context is used to perform database operations, such as reading and updating database records.

```csharp
var connectionString = 
    builder.Configuration.GetConnectionString("BlazorWebAppMoviesContext") ?? 
    throw new InvalidOperationException(
        "Connection string 'BlazorWebAppMoviesContext' not found.");

builder.Services.AddDbContextFactory<BlazorWebAppMoviesContext>(options => options.UseSqlite(connectionString));

builder.Services.AddQuickGridEntityFrameworkAdapter();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
```



## Create the initial database schema using EF Core's migration feature

The migrations feature in EF Core:

* Creates the initial database schema.
* Incrementally updates the database schema to keep it synchronized with the app's data model. Existing data in the database is preserved.

EF Core adopts the *code-first* approach for database design and maintenance:

* Entity classes are created and updated first in the app.
* The database is created and updated from the app's entity classes.

This is the reverse procedure of *database-first* approaches, where the database is designed, built, and updated first. Adopting EF Core's code-first approach aims to speed up the process of app development because most of the difficult and time-consuming database creation and management procedures are handled transparently by the EF Core tooling, so you can focus on app development.

**Applies to: vs**


In this section, [Visual Studio Connected Services](https://learn.microsoft.com/visualstudio/azure/overview-connected-services) are used to issue EF Core commands that:

* Add an initial migration.
* Update the database using the initial migration.

In **Solution Explorer**, double-click **Connected Services**. In the **SQL Server Express LocalDB** area of **Service Dependencies**, select the ellipsis (`...`) followed by **Add migration**:

UI showing the 'Add migration' option in the contextual menu opened from selecting the ellipsis next to 'SQL Server Express LocalDB'

Give the migration a **Migration name** of `InitialCreate`, which is a name that describes the migration. Wait for the database context to load in the **DbContext class names** field, which may take a few seconds. Select **Finish** to create the migration:

Add a new EF migration dialog showing the migration name and database context

Select the **Close** button after the operation finishes.

Adding a migration generates code to create the initial database schema. The schema is based on the model specified in [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext).

Select the ellipsis (`...`) again followed by the **Update database** command:

UI showing the 'Update database' option in the contextual menu opened from selecting the ellipsis next to 'SQL Server Express LocalDB'

The **Update database with the latest migration** dialog opens. Wait for the **DbContext class names** field to update and for prior migrations to load, which may take a few seconds. Select the **Finish** button:

Update database with the latest migration dialog showing the database context

The update database command executes the `Up` method migrations that haven't been applied in a migration code file created by the scaffolder. In this case, the command executes the `Up` method in the `Migrations/{TIME STAMP}_InitialCreate.cs` file, which creates the database. The `{TIME STAMP}` placeholder is a time stamp.

Select the **Close** button after the operation finishes.



**Applies to: vsc**


Right-click the `BlazorWebAppMovies` project file (`BlazorWebAppMovies.csproj`) and select **Open in Integrated Terminal**.

The **Terminal** window opens with a command prompt at the project directory, which contains the `Program` file and the app's project file (`.csproj`).

Execute the following .NET CLI command to add an initial migration. The `migrations` command generates code to create the initial database schema. The schema is based on the model specified in [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext). The `InitialCreate` argument is used to name the migration. Any name can be used, but the convention is to use a name that describes the migration.

```dotnetcli
dotnet ef migrations add InitialCreate
```

After the preceding command completes, update the database with the `update` command. The `update` command executes the `Up` method on migrations that haven't been applied in a migration code file created by the scaffolder. In this case, the command executes the `Up` method migrations in the `Migrations/{TIME STAMP}_InitialCreate.cs` file, which creates the database. The `{TIME STAMP}` placeholder is a time stamp.

```dotnetcli
dotnet ef database update
```



**Applies to: cli**


From the project's root folder, execute the following .NET CLI command to add an initial migration. The `migrations` command generates code to create the initial database schema. The schema is based on the model specified in [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext). The `InitialCreate` argument is used to name the migration. Any name can be used, but the convention is to use a name that describes the migration.

```dotnetcli
dotnet ef migrations add InitialCreate
```

After the preceding command completes, update the database with the `update` command. The `update` command executes the `Up` method on migrations that haven't been applied in a migration code file created by the scaffolder. In this case, the command executes the `Up` method migrations in the `Migrations/{TIME STAMP}_InitialCreate.cs` file, which creates the database. The `{TIME STAMP}` placeholder is a time stamp.

```dotnetcli
dotnet ef database update
```



The database context `BlazorWebAppMoviesContext` (`Data/BlazorWebAppMoviesContext.cs`):

* Derives from [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext).
* Specifies which entities are included in the data model.
* Coordinates EF Core functionality, such as CRUD operations, for the `Movie` model.
* Contains a [Microsoft.EntityFrameworkCore.DbSet%601](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%25601) property for the `Movie` entity set. In EF terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed in to the context by calling a method on a [Microsoft.EntityFrameworkCore.DbContextOptions](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptions) object. For local development, the connection string is read from the `appsettings.json` file.

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the [Secret Manager tool](../../../security/app-secrets.md) is recommended for securing sensitive data. For more information, see [Securely maintain sensitive data and credentials](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23securely-maintain-sensitive-data-and-credentials).


## Test the app

Run the app.

Add `/movies` to the URL in the browser's address bar to navigate to the movies `Index` page.

After the `Index` page loads, select the **Create New** link.

Add a movie to the database. In the following example, the classic sci-fi movie [*The Matrix*](https://www.warnerbros.com/movies/matrix) (&copy;1999 [Warner Bros. Entertainment Inc.](https://www.warnerbros.com/)) is added as the first movie entry. Selecting the **Create** button adds the movie to the database:

Adding The Matrix movie to the database with the 'Create' component

When you select the **Create** button, the movie data is posted to the server and saved in the database. 

**Applies to: \>= aspnetcore-9.0 < aspnetcore-10.0**

**Applies to: vs**


In .NET 9, the Visual Studio debugger may break with a [Microsoft.AspNetCore.Components.NavigationException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationException) on the line that navigates back to the `Index` page:

Debugger regression: A navigation exception is thrown on the NavigateTo call.

To resolve this problem:

1. Deselect the checkbox for **Break when this exception type is user-handled**.
2. Select the **Continue** button in the menu bar to continue execution.

The exception isn't thrown when a [Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%252A) method is executed throughout the rest of the tutorial series.

In .NET 10 or later:

* Updates to the way that [Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%252A) manages navigation never result in a [Microsoft.AspNetCore.Components.NavigationException](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationException).
* The Visual Studio debugger doesn't break when processing [Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NavigateTo%252A) calls with a valid endpoint.





When the app returns to the `Index` page, the added entity appears:

The Matrix movie shown in the movies 'Index' page

Open the `Edit` page. Edit the movie's record and save the changes.

Examine the `Delete` page, but don't delete *The Matrix* movie from the database. The presence of this movie record is valuable in the next step of the tutorial where rendered HTML is studied and some enhancements are made to the data displayed. If you already deleted the movie, add the movie to the database again using the `Create` page before proceeding to the next part of the tutorial series.

## Stop the app

**Applies to: vs**


Stop the app using either of the following approaches:

* Close the browser window.
* In Visual Studio, either:
  * Use the Stop button in Visual Studio's menu bar:

    Stop button in Visual Studio's menu bar

  * Press <kbd>Shift</kbd>+<kbd>F5</kbd> on the keyboard.



**Applies to: vsc**


Stop the app using the following approach:

1. Close the browser window.
1. In VS Code, either:
   * From the **Run** menu, select **Stop Debugging**.
   * Press <kbd>Shift</kbd>+<kbd>F5</kbd> on the keyboard.



**Applies to: cli**


Stop the app using the following approach:

1. Close the browser window.
2. From the command shell, press <kbd>Ctrl</kbd>+<kbd>C</kbd>.



## Troubleshoot with the completed sample

If you run into a problem while following the tutorial that you can't resolve from the text, compare your code to the completed project in the Blazor samples repository:

[Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples)

Select the latest version folder. The sample folder for this tutorial's project is named `BlazorWebAppMovies`.


## Additional resources

EF Core documentation:

* [Entity Framework Core](https://learn.microsoft.com/ef/core/)
* [Entity Framework Core tools reference - .NET CLI](https://learn.microsoft.com/ef/core/cli/dotnet)
* [Data Types](https://learn.microsoft.com/ef/core/modeling/relational/data-types)
* [Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync%252A): The API document includes basic information on how entities are saved and change detection.
* [Environment-based `Startup` class and methods](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23environment-based-startup-class-and-methods)
* [`dotnet aspnet-codegenerator`](../../../fundamentals/tools/dotnet-aspnet-codegenerator.md)
* [fundamentals/dependency-injection](../../../fundamentals/dependency-injection.md)
* [blazor/components/quickgrid](../../components/quickgrid.md)

## Legal

[*The Matrix*](https://www.warnerbros.com/movies/matrix) is a copyright of [Warner Bros. Entertainment Inc.](https://www.warnerbros.com/).

## Next steps

> 
> [Previous: Create a Blazor Web App](part-1.md)
> [Next: Learn about Razor components](part-3.md)
