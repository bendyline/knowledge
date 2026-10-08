---
title: Build a Blazor movie database app (Part 4 - Work with a database)
ai-usage: ai-assisted
author: guardrex
description: This part of the Blazor movie database app tutorial explains the database context and directly working with the database's schema and data. Seeding the database with data is also covered.
monikerRange: '>= aspnetcore-8.0'
ms.author: wpickett
ms.date: 09/15/2026
uid: blazor/tutorials/movie-database-app/part-4
zone_pivot_groups: tooling
---
# Build a Blazor movie database app (Part 4 - Work with a database)

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


This article is the fourth part of the Blazor movie database app tutorial that teaches you the basics of building an ASP.NET Core Blazor Web App with features to manage a movie database.

This part of the tutorial series focuses on the database context and directly working with the database's schema and data. Seeding the database with data is also covered.

## Secure authentication flow required for production apps

This tutorial uses a local database that doesn't require user authentication. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production Blazor Web Apps, see the following resources:

* [blazor/security/index](../../security/index.md)
* [blazor/security/index](../../security/index.md) and the following articles in the *Server* security node
* [blazor/security/blazor-web-app-oidc](../../security/blazor-web-app-with-oidc.md)
* [blazor/security/blazor-web-app-entra](../../security/blazor-web-app-with-entra.md)

For Microsoft Azure services, we recommend using *managed identities*. Managed identities securely authenticate to Azure services without storing credentials in app code. For more information, see the following resources:

* [What are managed identities for Azure resources? (Microsoft Entra documentation)](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview)
* Azure services documentation
  * [Managed identities in Microsoft Entra for Azure SQL](https://learn.microsoft.com/azure/azure-sql/database/authentication-azure-ad-user-assigned-managed-identity)
  * [How to use managed identities for App Service and Azure Functions](https://learn.microsoft.com/azure/app-service/overview-managed-identity)

## Database context

The database context, `BlazorWebAppMoviesContext`, connects to the database and maps model objects to database records. The database context was created in the second part of this series. The scaffolded database context code appears in the `Program` file:

**Applies to: vs**


```csharp
builder.Services.AddDbContextFactory<BlazorWebAppMoviesContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("BlazorWebAppMoviesContext") ?? 
        throw new InvalidOperationException(
            "Connection string 'BlazorWebAppMoviesContext' not found.")));
```



**Applies to: vsc**


```csharp
builder.Services.AddDbContextFactory<BlazorWebAppMoviesContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("BlazorWebAppMoviesContext") ?? 
        throw new InvalidOperationException(
            "Connection string 'BlazorWebAppMoviesContext' not found.")));
```



**Applies to: cli**


```csharp
builder.Services.AddDbContextFactory<BlazorWebAppMoviesContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("BlazorWebAppMoviesContext") ?? 
        throw new InvalidOperationException(
            "Connection string 'BlazorWebAppMoviesContext' not found.")));
```



[Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContextFactory%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContextFactory%252A) registers a factory for the given context as a service in the app's service collection.

[Microsoft.EntityFrameworkCore.SqlServerDbContextOptionsExtensions.UseSqlServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.SqlServerDbContextOptionsExtensions.UseSqlServer%252A) or [Microsoft.EntityFrameworkCore.SqliteDbContextOptionsBuilderExtensions.UseSqlite%2A](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.SqliteDbContextOptionsBuilderExtensions.UseSqlite%252A) configures the context to connect to either a Microsoft SQL Server or SQLite database. Other providers are available to connect to additional types of databases.

[Microsoft.Extensions.Configuration.ConfigurationExtensions.GetConnectionString%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.ConfigurationExtensions.GetConnectionString%252A) uses the ASP.NET Core Configuration system to read the `ConnectionStrings` key for the connection string name provided, which in the preceding example is `BlazorWebAppMoviesContext`.

For local development, configuration obtains the database connection string from the app settings file (`appsettings.json`). The `{CONNECTION STRING}` placeholder in the following example is the connection string:

```json
"ConnectionStrings": {
  "BlazorWebAppMoviesContext": "{CONNECTION STRING}"
}
```

The following is an example connection string:

> Server=(localdb)\\\mssqllocaldb;Database=BlazorWebAppMoviesContext-00001111-aaaa-2222-bbbb-3333cccc4444;Trusted_Connection=True;MultipleActiveResultSets=true

When the app is deployed to a test/staging or production server, securely store the connection string outside of the project's configuration files.

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the [Secret Manager tool](../../../security/app-secrets.md) is recommended for securing sensitive data. For more information, see [Securely maintain sensitive data and credentials](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23securely-maintain-sensitive-data-and-credentials).


## Database technology

**Applies to: vs**


The Visual Studio version of this tutorial uses SQL Server.

SQL Server Express LocalDB is a lightweight version of the SQL Server Express database engine that's targeted for program development. LocalDB starts on demand and runs in user mode, so there's no complex configuration. Master database files (`*.mdf`) are placed in the `C:/Users/{USER}` directory, where the `{USER}` placeholder is the system's user ID.

From the **View** menu, open **SQL Server Object Explorer** (SSOX).

View menu

Right-click on the `Movie` table and select **View Designer**:

Contextual menus to open the Movie table in Solution Explorer (SSOX)

The **View Designer** opens:

Movie table open in the table designer

Note the key icon next to `ID`. EF creates a property named `ID` for the primary key.

Right-click on the `Movie` table and select **View Data**:

Contextual menus to open the Movie table data in Solution Explorer (SSOX)

The table's data opens in a new tab in Visual Studio:

Movie table open showing movie table data



**Applies to: vsc**


The VS Code version of this tutorial uses [SQLite](https://www.sqlite.org/), which is a public, self-contained, full-featured SQL database engine.

There are many third-party tools you can use to manage and view SQLite databases. The following image shows [DB Browser for SQLite](https://sqlitebrowser.org/):

DB Browser for SQLite showing movie database

In this tutorial, EF Core migrations are used. A migration updates the database schema to match changes in the data model. However, migrations can only make changes to the database that the EF Core provider supports. Resources are listed at the end of this article for further reading.



**Applies to: cli**


The VS Code version of this tutorial uses [SQLite](https://www.sqlite.org/), which is a public, self-contained, full-featured SQL database engine.

There are many third-party tools you can use to manage and view SQLite databases. The following image shows [DB Browser for SQLite](https://sqlitebrowser.org/):

DB Browser for SQLite showing movie database

In this tutorial, EF Core migrations are used. A migration updates the database schema to match changes in the data model. However, migrations can only make changes to the database that the EF Core provider supports. Resources are listed at the end of this article for further reading.



## Seed the database

Seeding code can create a set of records for development testing or even be used to create the initial data for a new production database.

In the `Data` folder, create a new class named `SeedData` with the following code.

`Data/SeedData.cs`:

```csharp
using Microsoft.EntityFrameworkCore;
using BlazorWebAppMovies.Models;

namespace BlazorWebAppMovies.Data;

public class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var context = new BlazorWebAppMoviesContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<BlazorWebAppMoviesContext>>());

        if (context == null || context.Movie == null)
        {
            throw new NullReferenceException(
                "Null BlazorWebAppMoviesContext or Movie DbSet");
        }

        if (context.Movie.Any())
        {
            return;
        }

        context.Movie.AddRange(
            new Movie
            {
                Title = "Mad Max",
                ReleaseDate = new DateOnly(1979, 4, 12),
                Genre = "Sci-fi (Cyberpunk)",
                Price = 2.51M,
            },
            new Movie
            {
                Title = "The Road Warrior",
                ReleaseDate = new DateOnly(1981, 12, 24),
                Genre = "Sci-fi (Cyberpunk)",
                Price = 2.78M,
            },
            new Movie
            {
                Title = "Mad Max: Beyond Thunderdome",
                ReleaseDate = new DateOnly(1985, 7, 10),
                Genre = "Sci-fi (Cyberpunk)",
                Price = 3.55M,
            },
            new Movie
            {
                Title = "Mad Max: Fury Road",
                ReleaseDate = new DateOnly(2015, 5, 15),
                Genre = "Sci-fi (Cyberpunk)",
                Price = 8.43M,
            },
            new Movie
            {
                Title = "Furiosa: A Mad Max Saga",
                ReleaseDate = new DateOnly(2024, 5, 24),
                Genre = "Sci-fi (Cyberpunk)",
                Price = 13.49M,
            });

        context.SaveChanges();
    }
}
```

A database context instance is obtained from the dependency injection (DI) container. If movies are present, `return` is called to avoid seeding the database. When the database is empty, the [*Mad Max* franchise](https://warnerbros.fandom.com/wiki/Mad_Max_(franchise)) (&copy;[Warner Bros. Entertainment](https://www.warnerbros.com/)) movies are seeded.

To execute the seed initializer, add the following code to the `Program` file immediately after the line that builds the app (`var app = builder.Build();`). The [`using` statement](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/using-statement) ensures that the database context is disposed after the seeding operation completes.

```csharp
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    SeedData.Initialize(services);
}
```

**Applies to: vs**


If the database contains records from earlier testing, run the app and delete the entities that you created in the database. Stop the app by closing the browser's window.



**Applies to: vsc**


If the database contains records from earlier testing, run the app and delete the entities that you created in the database. Stop the app by closing the browser's window and pressing <kbd>Shift</kbd>+<kbd>F5</kbd> on the keyboard in VS Code.



**Applies to: cli**


If the database contains records from earlier testing, run the app and delete the entities that you created in the database. Stop the app by closing the browser's window and pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> (Windows) in the command shell.



When the database is empty, run the app.

Navigate to the movies `Index` page to see the seeded movies:

Movies Index page showing Mad Max movie list after seeding the database

## Bind a form to a model

Review the `Edit` component (`Components/Pages/MoviePages/Edit.razor`).

When an HTTP GET request is made for the `Edit` component page (for example at the relative URL: `/movies/edit?id=6`):

* The [Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync%252A) method fetches the movie with an `Id` of `6` from the database and assigns it to the `Movie` property.
* The [Microsoft.AspNetCore.Components.Forms.EditForm.Model](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Forms.EditForm.Model) parameter specifies the top-level model object for the form. An edit context is constructed for the form using the assigned model.
* The form is displayed with the values from the movie.

When the `Edit` page is posted to the server, the form values on the page are bound to the `Movie` property because the [`[SupplyParameterFromForm]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.SupplyParameterFromFormAttribute) is annotated on the `Movie` property:

```csharp
[SupplyParameterFromForm]
private Movie? Movie { get; set; }
```

If the model state has errors when the form is posted, for example if `ReleaseDate` can't be converted into a date, the form is redisplayed with the submitted values. If no model errors exist, the movie is saved using the form's posted values.

## Concurrency exception handling

Examine the `UpdateMovie` method of the `Edit` component (`Components/Pages/MoviePages/Edit.razor`):

**Applies to: \>= aspnetcore-10.0**

```csharp
private async Task UpdateMovie()
{
    using var context = DbFactory.CreateDbContext();
    context.Attach(Movie!).State = EntityState.Modified;

    try
    {
        await context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!MovieExists(Movie!.Id))
        {
            NavigationManager.NotFound();
        }
        else
        {
            throw;
        }
    }

    NavigationManager.NavigateTo("/movies");
}
```

<!-- UPDATE 11.0 - Delete the following IMPORTANT note and add the 
                   return statement to the example code above after
                   scaffolder updates go public per 
                   https://github.com/dotnet/Scaffolding/issues/3828.
-->

> **Important:**
> Due to a bug in the Blazor CRUD template, a `return` statement is missing from the `UpdateMovie` method after [Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A) is called. The purpose of calling `return` is to ensure the handler (the `UpdateMovie` method) selects only the Not Found outcome, independently of a given database provider synchronously or asynchronously executing [Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync%252A). We're in the process of updating the `Edit` component template, and this article will be updated when the scaffolder generates the correct code.
>
> After the line that calls [Microsoft.AspNetCore.Components.NavigationManager.NotFound%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.NavigationManager.NotFound%252A), add a `return` statement:
>
> ```csharp
> return;
> ```
>
> The `catch` block should look like the following example after the `return` statement is added:
>
> ```csharp
> catch (DbUpdateConcurrencyException)
> {
>     if (!MovieExists(Movie!.Id))
>     {
>         NavigationManager.NotFound();
> 
>         return;
>     }
>     else
>     {
>         throw;
>     }
> }
> ```

Concurrency exceptions are detected when one client deletes the movie and a different client posts changes to the movie.

To test how concurrency is handled by the preceding code:

1. Select **Edit** for a movie, make changes, but don't select **Save**.
1. In a different browser window, open the app to the movie `Index` page and select the **Delete** link for the same movie to delete the movie.
1. In the previous browser window, post changes to the movie by selecting the **Save** button.
1. The browser is navigated to the Not Found page with a 404 (Not Found) status code.



**Applies to: < aspnetcore-10.0**

```csharp
private async Task UpdateMovie()
{
    using var context = DbFactory.CreateDbContext();
    context.Attach(Movie!).State = EntityState.Modified;

    try
    {
        await context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!MovieExists(Movie!.Id))
        {
            NavigationManager.NavigateTo("notfound");
        }
        else
        {
            throw;
        }
    }

    NavigationManager.NavigateTo("/movies");
}
```

Concurrency exceptions are detected when one client deletes the movie and a different client posts changes to the movie.

To test how concurrency is handled by the preceding code:

1. Select **Edit** for a movie, make changes, but don't select **Save**.
1. In a different browser window, open the app to the movie `Index` page and select the **Delete** link for the same movie to delete the movie.
1. In the previous browser window, post changes to the movie by selecting the **Save** button.
1. The browser is navigated to the `notfound` endpoint, which doesn't exist and yields a 404 (Not Found) result.



Additional guidance on handling concurrency with EF Core in Blazor apps is available in the Blazor documentation.

## Stop the app

**Applies to: vs**


If the app is running, shut the app down by closing the browser's window.



**Applies to: vsc**


If the app is running, shut the app down by closing the browser's window and pressing <kbd>Shift</kbd>+<kbd>F5</kbd> on the keyboard in VS Code.



**Applies to: cli**


If the app is running, shut the app down by closing the browser's window and pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> in the command shell.



## Troubleshoot with the completed sample

If you run into a problem while following the tutorial that you can't resolve from the text, compare your code to the completed project in the Blazor samples repository:

[Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples)

Select the latest version folder. The sample folder for this tutorial's project is named `BlazorWebAppMovies`.


## Additional resources

* Configuration articles:
  * [fundamentals/configuration/index](../../../fundamentals/configuration/index.md) (ASP.NET Core Configuration system)
  * [blazor/fundamentals/configuration](../../fundamentals/configuration.md) (Blazor documentation)
  * [Data seeding (EF Core documentation)](https://learn.microsoft.com/ef/core/modeling/data-seeding)
* [Concurrency with EF Core in Blazor apps](../../blazor-ef-core.md)
* Database provider resources:
  * EF Core documentation
    * [SQLite EF Core Database Provider Limitations](https://learn.microsoft.com/ef/core/providers/sqlite/limitations)
    * [Customize migration code](https://learn.microsoft.com/ef/core/managing-schemas/migrations/#customize-migration-code)
  * [SQLite ALTER TABLE statement (SQLite documentation)](https://sqlite.org/lang_altertable.html)
* Blazor Web App security
  * [blazor/security/index](../../security/index.md)
  * [blazor/security/index](../../security/index.md) and the following articles in the *Server* security node
  * [blazor/security/blazor-web-app-oidc](../../security/blazor-web-app-with-oidc.md)
  * [blazor/security/blazor-web-app-entra](../../security/blazor-web-app-with-entra.md)

## Legal

[*Mad Max*, *The Road Warrior*, *Mad Max: Beyond Thunderdome*, *Mad Max: Fury Road*, and *Furiosa: A Mad Max Saga*](https://warnerbros.fandom.com/wiki/Mad_Max_(franchise)) are trademarks and copyrights of [Warner Bros. Entertainment](https://www.warnerbros.com/).

## Next steps

> 
> [Previous: Learn about Razor components](part-3.md)
> [Next: Add Validation](part-5.md)
