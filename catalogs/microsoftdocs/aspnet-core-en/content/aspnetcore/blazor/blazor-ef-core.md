---
title: ASP.NET Core Blazor with Entity Framework Core (EF Core)
author: guardrex
description: Learn how to use Entity Framework Core (EF Core) in Blazor apps.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/blazor-ef-core
---
# ASP.NET Core Blazor with Entity Framework Core (EF Core)

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


This article explains how to use [Entity Framework Core (EF Core)](https://learn.microsoft.com/ef/core/) in server-side Blazor apps.

Server-side Blazor is a stateful app framework. The app maintains an ongoing connection to the server, and the user's state is held in the server's memory in a *circuit*. One example of user state is data held in [dependency injection (DI)](../fundamentals/dependency-injection.md) service instances that are scoped to the circuit. The unique application model that Blazor provides requires a special approach to use Entity Framework Core.

> **Note:**
> This article addresses EF Core in server-side Blazor apps. Blazor WebAssembly apps run in a WebAssembly sandbox that prevents most direct database connections. Running EF Core in Blazor WebAssembly is beyond the scope of this article.

**Applies to: \>= aspnetcore-8.0**

This guidance applies to components that adopt interactive server-side rendering (interactive SSR) in a Blazor Web App.



**Applies to: < aspnetcore-8.0**

This guidance applies to the **`Server`** project of a hosted Blazor WebAssembly solution or a Blazor Server app.



## Secure authentication flow required for production apps

This article pertains to the use of a local database that doesn't require user authentication. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production Blazor apps, see the articles in the [Blazor *Security and Identity* node](security/index.md).

For Microsoft Azure services, we recommend using *managed identities*. Managed identities securely authenticate to Azure services without storing credentials in app code. For more information, see the following resources:

* [What are managed identities for Azure resources? (Microsoft Entra documentation)](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview)
* Azure services documentation
  * [Managed identities in Microsoft Entra for Azure SQL](https://learn.microsoft.com/azure/azure-sql/database/authentication-azure-ad-user-assigned-managed-identity)
  * [How to use managed identities for App Service and Azure Functions](https://learn.microsoft.com/azure/app-service/overview-managed-identity)

**Applies to: \>= aspnetcore-8.0**

## Build a Blazor movie database app tutorial

For a tutorial experience building an app that uses EF Core for database operations, see [blazor/tutorials/movie-database-app/index](tutorials/movie-database-app/index.md). The tutorial shows you how to create a Blazor Web App that can display and manage movies in a movie database.



## Database access

EF Core relies on a [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) as the means to [configure database access](https://learn.microsoft.com/ef/core/miscellaneous/configuring-dbcontext) and act as a [*unit of work*](https://martinfowler.com/eaaCatalog/unitOfWork.html). EF Core provides the [Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext%252A) extension for ASP.NET Core apps that registers the context as a *scoped* service. In server-side Blazor apps, scoped service registrations can be problematic because the instance is shared across components within the user's circuit. [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) isn't thread safe and isn't designed for concurrent use. The existing lifetimes are inappropriate for these reasons:

* **Singleton** shares state across all users of the app and leads to inappropriate concurrent use.
* **Scoped** (the default) poses a similar issue between components for the same user.
* **Transient** results in a new instance per request; but as components can be long-lived, this results in a longer-lived context than may be intended.

The following recommendations are designed to provide a consistent approach to using EF Core in server-side Blazor apps.

* Consider using one context per operation. The context is designed for fast, low overhead instantiation:

  ```csharp
  using var context = new ProductsDatabaseContext();

  return await context.Products.ToListAsync();
  ```

* Use a flag to prevent multiple concurrent operations:

  ```csharp
  if (Loading)
  {
      return;
  }

  try
  {
      Loading = true;

      ...
  }
  finally
  {
      Loading = false;
  }
  ```

  Place database operations after the `Loading = true;` line in the `try` block.
  
  Thread safety isn't a concern, so loading logic doesn't require locking database records. The loading logic is used to disable UI controls so that users don't inadvertently select buttons or update fields while data is fetched.
  
* If there's any chance that multiple threads may access the same code block, [inject a factory](#scope-a-database-context-to-the-lifetime-of-the-component) and make a new instance per operation. Otherwise, injecting and using the context is usually sufficient.

* For longer-lived operations that take advantage of EF Core's [change tracking](https://learn.microsoft.com/ef/core/querying/tracking) or [concurrency control](https://learn.microsoft.com/ef/core/saving/concurrency), [scope the context to the lifetime of the component](#scope-a-database-context-to-the-lifetime-of-the-component).

## New `DbContext` instances

The fastest way to create a new [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) instance is by using `new` to create a new instance. However, there are scenarios that require resolving additional dependencies:

* Using [`DbContextOptions`](https://learn.microsoft.com/ef/core/miscellaneous/configuring-dbcontext#configuring-dbcontextoptions) to configure the context.
* Using a connection string per [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext), such as when you use [ASP.NET Core's Identity model](../security/authentication/customize-identity-model.md). For more information, see [Multi-tenancy (EF Core documentation)](https://learn.microsoft.com/ef/core/miscellaneous/multitenancy).

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the [Secret Manager tool](../security/app-secrets.md) is recommended for securing sensitive data. For more information, see [Securely maintain sensitive data and credentials](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23securely-maintain-sensitive-data-and-credentials).


The recommended approach to create a new [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) with dependencies is to use a factory. EF Core in .NET 5 or later provides a built-in factory for creating new contexts.

**Applies to: < aspnetcore-5.0**

In versions of .NET prior to .NET 5, use the following `DbContextFactory`:

```csharp
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BlazorServerDbContextExample.Data
{
    public class DbContextFactory<TContext> 
        : IDbContextFactory<TContext> where TContext : DbContext
    {
        private readonly IServiceProvider provider;

        public DbContextFactory(IServiceProvider provider)
        {
            this.provider = provider ?? throw new ArgumentNullException(
                $"{nameof(provider)}: You must configure an instance of " +
                "IServiceProvider");
        }

        public TContext CreateDbContext() => 
            ActivatorUtilities.CreateInstance<TContext>(provider);
    }
}
```

In the preceding factory:

* [Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance%252A) satisfies any dependencies via the service provider.
* [Microsoft.EntityFrameworkCore.IDbContextFactory%601](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.IDbContextFactory%25601) is available in EF Core in .NET 5 or later, so the preceding interface is only required for ASP.NET Core 3.x.



The following example configures [SQLite](https://www.sqlite.org/index.html) and enables data logging in an app that manages contacts. The code uses an extension method ([Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContextFactory%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContextFactory%252A)) to configure the database factory for DI and provide default options:

**Applies to: \>= aspnetcore-6.0**

```csharp
builder.Services.AddDbContextFactory<ContactContext>(opt =>
    opt.UseSqlite($"Data Source={nameof(ContactContext.ContactsDb)}.db"));
```



**Applies to: < aspnetcore-6.0**

```csharp
services.AddDbContextFactory<ContactContext>(opt =>
    opt.UseSqlite($"Data Source={nameof(ContactContext.ContactsDb)}.db"));
```



The factory is injected into components to create new [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) instances.

## Scope a database context to a component method

The factory is injected into the component:

```razor
@inject IDbContextFactory<ContactContext> DbFactory
```

Create a [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) for a method using the factory (`DbFactory`):

```csharp
private async Task DeleteContactAsync()
{
    using var context = DbFactory.CreateDbContext();

    if (context.Contacts is not null)
    {
        var contact = await context.Contacts.FirstAsync(...);

        if (contact is not null)
        {
            context.Contacts?.Remove(contact);
            await context.SaveChangesAsync();
        }
    }
}
```

## Scope a database context to the lifetime of the component

You may wish to create a [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) that exists for the lifetime of a component. This allows you to use it as a [unit of work](https://martinfowler.com/eaaCatalog/unitOfWork.html) and take advantage of built-in features, such as change tracking and concurrency resolution.

Implement [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable) and inject the factory into the component:

```razor
@implements IDisposable
@inject IDbContextFactory<ContactContext> DbFactory
```

Establish a property for the [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext):

```csharp
private ContactContext? Context { get; set; }
```

[`OnInitializedAsync`](components/lifecycle.md) is overridden to create the [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext):

```csharp
protected override async Task OnInitializedAsync()
{
    Context = DbFactory.CreateDbContext();
}
```

The [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) is disposed when the component is disposed:

```csharp
public void Dispose() => Context?.Dispose();
```

## Enable sensitive data logging

[Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging%252A) includes application data in exception messages and framework logging. The logged data can include the values assigned to properties of entity instances and parameter values for commands sent to the database. Logging data with [Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging%252A) is a **security risk**, as it may expose passwords and other [Personally Identifiable Information (PII)](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23personally-identifiable-information-pii) when it logs SQL statements executed against the database.

We recommend only enabling [Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging%252A) for local development and testing:

```csharp
if (builder.Environment.IsDevelopment())
{
    services.AddDbContextFactory<ContactContext>(opt =>
        opt.UseSqlite($"Data Source={nameof(ContactContext.ContactsDb)}.db")
        .EnableSensitiveDataLogging());
}
else
{
    services.AddDbContextFactory<ContactContext>(opt =>
        opt.UseSqlite($"Data Source={nameof(ContactContext.ContactsDb)}.db"));
}
```

## Additional resources

* [EF Core documentation](https://learn.microsoft.com/ef/)
* [Blazor samples GitHub repository (`dotnet/blazor-samples`)](https://github.com/dotnet/blazor-samples)
* [Blazor *Security and Identity* node articles](security/index.md)
