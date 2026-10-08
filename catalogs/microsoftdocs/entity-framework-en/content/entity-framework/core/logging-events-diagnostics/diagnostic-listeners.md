---
title: Using diagnostic listeners - EF Core
description: Using DiagnosticListener for global consumption of EF Core diagnostics
author: SamMonoRT
ms.date: 10/16/2020
uid: core/logging-events-diagnostics/diagnostic-listeners
ms.custom: sfi-ropc-nochange
---

# Using Diagnostic Listeners in EF Core

> **Tip:**
> You can [download this article's sample](https://github.com/dotnet/EntityFramework.Docs/tree/main/samples/core/Miscellaneous/DiagnosticListeners) from GitHub.

Diagnostic listeners allow listening for any EF Core event that occurs in the current .NET process. The [System.Diagnostics.DiagnosticListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.DiagnosticListener) class is a part of a [common mechanism across .NET](https://github.com/dotnet/runtime/blob/main/src/libraries/System.Diagnostics.DiagnosticSource/src/DiagnosticSourceUsersGuide.md) for obtaining diagnostic information from running applications.

Diagnostic listeners are not suitable for getting events from a single DbContext instance. EF Core [interceptors](interceptors.md) provide access to the same events with per-context registration.

Diagnostic listeners are not designed for logging. Consider using [simple logging](simple-logging.md) or [Microsoft.Extensions.Logging](extensions-logging.md) for logging.

## Example: Observing diagnostic events

Resolving EF Core events is a two-step process. First, an [observer](https://learn.microsoft.com/dotnet/standard/events/observer-design-pattern) for `DiagnosticListener` itself must be created:

<!--
public class DiagnosticObserver : IObserver<DiagnosticListener>
{
    public void OnCompleted()
        => throw new NotImplementedException();

    public void OnError(Exception error)
        => throw new NotImplementedException();

    public void OnNext(DiagnosticListener value)
    {
        if (value.Name == DbLoggerCategory.Name) // "Microsoft.EntityFrameworkCore"
        {
            value.Subscribe(new KeyValueObserver());
        }
    }
}
-->
[DiagnosticObserver (complete source file; reference: ../../../samples/core/Miscellaneous/DiagnosticListeners/Program.cs?name=DiagnosticObserver)](../../../_code/samples/core/Miscellaneous/DiagnosticListeners/Program.cs.md)

The `OnNext` method looks for the DiagnosticListener that comes from EF Core. This listener has the name "Microsoft.EntityFrameworkCore", which can be obtained from the [Microsoft.EntityFrameworkCore.DbLoggerCategory](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbLoggerCategory) class as shown.

This observer must then be registered globally, for example in the application's `Main` method:

<!--
        DiagnosticListener.AllListeners.Subscribe(new DiagnosticObserver());
-->
[RegisterDiagnosticListener (complete source file; reference: ../../../samples/core/Miscellaneous/DiagnosticListeners/Program.cs?name=RegisterDiagnosticListener)](../../../_code/samples/core/Miscellaneous/DiagnosticListeners/Program.cs.md)

Second, once the EF Core DiagnosticListener is found, a new key-value observer is created to subscribe to the actual EF Core events. For example:

<!--
public class KeyValueObserver : IObserver<KeyValuePair<string, object>>
{
    public void OnCompleted()
        => throw new NotImplementedException();

    public void OnError(Exception error)
        => throw new NotImplementedException();

    public void OnNext(KeyValuePair<string, object> value)
    {
        if (value.Key == CoreEventId.ContextInitialized.Name)
        {
            var payload = (ContextInitializedEventData)value.Value;
            Console.WriteLine($"EF is initializing {payload.Context.GetType().Name} ");
        }

        if (value.Key == RelationalEventId.ConnectionOpening.Name)
        {
            var payload = (ConnectionEventData)value.Value;
            Console.WriteLine($"EF is opening a connection to {payload.Connection.ConnectionString} ");
        }
    }
}
-->
[KeyValueObserver (complete source file; reference: ../../../samples/core/Miscellaneous/DiagnosticListeners/Program.cs?name=KeyValueObserver)](../../../_code/samples/core/Miscellaneous/DiagnosticListeners/Program.cs.md)

The `OnNext` method is this time called with a key/value pair for each EF Core event. The key is the name of the event, which can be obtained from one of:

* [Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId) for events common to all EF Core database providers
* [Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId) for events common to all relational database providers
* A similar class for events specific to the current database provider. For example, [Microsoft.EntityFrameworkCore.Diagnostics.SqlServerEventId](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Diagnostics.SqlServerEventId) for the SQL Server provider.

The value of the key/value pair is a payload type specific to the event. The type of payload to expect is documented on each event defined in these event classes.

For example, the code above handles the [Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId.ContextInitialized](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Diagnostics.CoreEventId.ContextInitialized) and the [Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.ConnectionOpening](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.ConnectionOpening) events. For the first of these, the payload is [Microsoft.EntityFrameworkCore.Diagnostics.ContextInitializedEventData](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Diagnostics.ContextInitializedEventData). For the second, it is [Microsoft.EntityFrameworkCore.Diagnostics.ConnectionEventData](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Diagnostics.ConnectionEventData).

> **Tip:**
> ToString is overridden in every EF Core event data class to generate the equivalent log message for the event. For example, calling `ContextInitializedEventData.ToString` generates "Entity Framework Core 5.0.0 initialized 'BlogsContext' using provider 'Microsoft.EntityFrameworkCore.Sqlite' with options: None".

The [sample](https://github.com/dotnet/EntityFramework.Docs/tree/main/samples/core/Miscellaneous/DiagnosticListeners) contains a simple console application that makes changes to the blogging database and prints out the diagnostic events encountered.

<!--
    public static void Main()
    {
        #region RegisterDiagnosticListener
        DiagnosticListener.AllListeners.Subscribe(new DiagnosticObserver());
        #endregion

        using (var context = new BlogsContext())
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            context.Add(
                new Blog
                {
                    Name = "EF Blog",
                    Posts =
                    {
                        new Post { Title = "EF Core 3.1!" },
                        new Post { Title = "EF Core 5.0!" }
                    }
                });

            context.SaveChanges();
        }

        using (var context = new BlogsContext())
        {
            var blog = context.Blogs.Include(e => e.Posts).Single();

            blog.Name = "EF Core Blog";
            context.Remove(blog.Posts.First());
            blog.Posts.Add(new Post { Title = "EF Core 6.0!" });

            context.SaveChanges();
        }
        #endregion
    }
-->
[Program (complete source file; reference: ../../../samples/core/Miscellaneous/DiagnosticListeners/Program.cs?name=Program)](../../../_code/samples/core/Miscellaneous/DiagnosticListeners/Program.cs.md)

The output from this code shows the events detected:

```output
EF is initializing BlogsContext
EF is opening a connection to Data Source=blogs.db;Mode=ReadOnly
EF is opening a connection to DataSource=blogs.db
EF is opening a connection to Data Source=blogs.db;Mode=ReadOnly
EF is opening a connection to DataSource=blogs.db
EF is opening a connection to DataSource=blogs.db
EF is opening a connection to DataSource=blogs.db
EF is initializing BlogsContext
EF is opening a connection to DataSource=blogs.db
EF is opening a connection to DataSource=blogs.db
```
