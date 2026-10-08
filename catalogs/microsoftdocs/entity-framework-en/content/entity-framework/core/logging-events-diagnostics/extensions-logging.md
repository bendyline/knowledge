---
title: Using Microsoft.Extensions.Logging - EF Core
description: Logging from EF Core using Microsoft.Extensions.Logging in ASP.NET Core and other application types
author: SamMonoRT
ms.date: 10/15/2020
uid: core/logging-events-diagnostics/extensions-logging
---

# Using Microsoft.Extensions.Logging in EF Core

[Microsoft.Extensions.Logging](https://learn.microsoft.com/dotnet/core/extensions/logging) is an extensible logging mechanism with plug-in providers for many common logging systems. Both Microsoft-supplied plug-ins (e.g [Microsoft.Extensions.Logging.Console](https://www.nuget.org/packages/Microsoft.Extensions.Logging.Console/)) and third-party plug-ins (e.g. [Serilog.Extensions.Logging](https://www.nuget.org/packages/Serilog.Extensions.Logging/)) are available as NuGet packages.

Entity Framework Core (EF Core) fully integrates with `Microsoft.Extensions.Logging`. However, consider using [simple logging](simple-logging.md) for a simpler way to log, especially for applications that don't use dependency injection.

## ASP.NET Core applications

`Microsoft.Extensions.Logging` is [used by default in ASP.NET Core applications](https://learn.microsoft.com/aspnet/core/fundamentals/logging). Calling [Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext*) or [Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContextPool*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContextPool*) makes EF Core automatically use the logging setup configured via the regular ASP.NET mechanism.

## Other application types

Other application types can use the [GenericHost](https://learn.microsoft.com/dotnet/core/extensions/generic-host) to get the same dependency injection patterns as are used in ASP.NET Core. [Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext*) or [Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContextPool*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContextPool*) can then be used just like in ASP.NET Core applications.

`Microsoft.Extensions.Logging` can also be used for applications that don't use dependency injection, although [simple logging](simple-logging.md) can be easier to set up.

`Microsoft.Extensions.Logging` requires creation of a [Microsoft.Extensions.Logging.LoggerFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging.LoggerFactory). This factory should be stored as a static/global instance somewhere and used each time a DbContext is created. For example, it is common to store the logger factory as a static property on the DbContext.

<!--
        public static readonly ILoggerFactory MyLoggerFactory
            = LoggerFactory.Create(builder => { builder.AddConsole(); });
-->
[Main (complete source file; reference: ../../../samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs#DefineLoggerFactory)](../../../_code/samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs.md)

This singleton/global instance should then be registered with EF Core on the [Microsoft.EntityFrameworkCore.DbContextOptionsBuilder](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptionsBuilder). For example:

<!--
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .UseLoggerFactory(MyLoggerFactory)
                .UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=EFLogging;ConnectRetryCount=0");
-->
[Main (complete source file; reference: ../../../samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs#RegisterLoggerFactory)](../../../_code/samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs.md)

## Getting detailed messages

> **Tip:**
> OnConfiguring is still called when AddDbContext is used or a DbContextOptions instance is passed to the DbContext constructor. This makes it the ideal place to apply context configuration regardless of how the DbContext is constructed.

### Sensitive data

By default, EF Core will not include the values of any data in exception messages. This is because such data may be confidential, and could be revealed in production use if an exception is not handled.

However, knowing data values, especially for keys, can be very helpful when debugging. This can be enabled in EF Core by calling [Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging). For example:

<!--
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.EnableSensitiveDataLogging();
-->
[EnableSensitiveDataLogging (complete source file; reference: ../../../samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs?name=EnableSensitiveDataLogging)](../../../_code/samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs.md)

### Detailed query exceptions

For performance reasons, EF Core does not wrap each call to read a value from the database provider in a try-catch block. However, this sometimes results in exceptions that are hard to diagnose, especially when the database returns a NULL when not allowed by the model.

Turning on [Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableDetailedErrors*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableDetailedErrors*) will cause EF to introduce these try-catch blocks and thereby provide more detailed errors. For example:

<!--
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.EnableDetailedErrors();
-->
[EnableDetailedErrors (complete source file; reference: ../../../samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs?name=EnableDetailedErrors)](../../../_code/samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs.md)

## Configuration for specific messages

The EF Core [Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.ConfigureWarnings*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.ConfigureWarnings*) API allows applications to change what happens when a specific event is encountered. This can be used to:

* Change the log level at which the event is logged
* Skip logging the event altogether
* Throw an exception when the event occurs

### Changing the log level for an event

Sometimes it can be useful to change the pre-defined log level for an event. For example, this can be used to promote two additional events from `LogLevel.Debug` to `LogLevel.Information`:

<!--
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .ConfigureWarnings(b => b.Log(
                    (RelationalEventId.ConnectionOpened, LogLevel.Information),
                    (RelationalEventId.ConnectionClosed, LogLevel.Information)));
-->
[ChangeLogLevel (complete source file; reference: ../../../samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs?name=ChangeLogLevel)](../../../_code/samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs.md)

### Suppress logging an event

In a similar way, an individual event can be suppressed from logging. This is particularly useful for ignoring a warning that has been reviewed and understood. For example:

<!--
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .ConfigureWarnings(b => b.Ignore(CoreEventId.DetachedLazyLoadingWarning));
-->
[SuppressMessage (complete source file; reference: ../../../samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs?name=SuppressMessage)](../../../_code/samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs.md)

### Throw for an event

Finally, EF Core can be configured to throw for a given event. This is particularly useful for changing a warning into an error. (Indeed, this was the original purpose of `ConfigureWarnings` method, hence the name.) For example:

<!--
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .ConfigureWarnings(b => b.Throw(RelationalEventId.QueryPossibleUnintendedUseOfEqualsWarning));
-->
[ThrowForEvent (complete source file; reference: ../../../samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs?name=ThrowForEvent)](../../../_code/samples/core/Miscellaneous/Logging/Logging/BloggingContext.cs.md)

## Filtering and other configuration

See [Logging in .NET](https://learn.microsoft.com/dotnet/core/extensions/logging) for guidance on log filtering and other configuration.

EF Core logging events are defined in one of:

* [Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId) for events common to all EF Core database providers
* [Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId) for events common to all relational database providers
* A similar class for events specific to the current database provider. For example, [Microsoft.EntityFrameworkCore.Diagnostics.SqlServerEventId](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Diagnostics.SqlServerEventId) for the SQL Server provider.

These definitions contain the event IDs, log level, and category for each event, as used by `Microsoft.Extensions.Logging`.
