---
title: Overview of logging and interception - EF Core
description: Overview of logging, events, interceptors, and diagnostics for EF Core
author: SamMonoRT
ms.date: 11/15/2021
uid: core/logging-events-diagnostics/index
---

# Overview of Logging and Interception

Entity Framework Core (EF Core) contains several mechanisms for generating logs, responding to events, and obtaining diagnostics. Each of these is tailored to different situations, and it is important to select the best mechanism for the task in hand, even when multiple mechanisms could work. For example, a database interceptor could be used to log SQL, but this is better handled by one of the mechanisms tailored to logging. This page presents an overview of each of these mechanisms and describes when each should be used.

## Quick reference

The table below provides a quick reference for the differences between the mechanisms described here.

| Mechanism | Async | Scope | Registered | Intended use |
| :--- | --- | --- | --- | --- |
| Simple Logging | No | Per context | Context configuration | Development-time logging |
| Microsoft.Extensions.Logging | No | Per context* | D.I. or context configuration | Production logging |
| Events | No | Per context | Any time | Reacting to EF events |
| Interceptors | Yes | Per context | Context configuration | Manipulating EF operations |
| Diagnostics listeners | No | Process | Globally | Application diagnostics |

*Typically `Microsoft.Extensions.Logging` is configured per-application via dependency injection. However, at the EF level, each context _can_ be configured with a different logger if needed.

## Simple logging

EF Core logs can be accessed from any type of application through the use of [Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.LogTo*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.LogTo*) when [configuring a DbContext instance](../dbcontext-configuration/index.md). This configuration is commonly done in an override of [Microsoft.EntityFrameworkCore.DbContext.OnConfiguring*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.OnConfiguring*). For example:

<!--
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.LogTo(Console.WriteLine);
-->
[LogToConsole (complete source file; reference: ../../../samples/core/Miscellaneous/Logging/SimpleLogging/Program.cs?name=LogToConsole)](../../../_code/samples/core/Miscellaneous/Logging/SimpleLogging/Program.cs.md)

This concept is similar to [System.Data.Entity.Database.Log](https://learn.microsoft.com/search/?terms=System.Data.Entity.Database.Log) in EF6.

See [Simple Logging](simple-logging.md) for more information.

## Microsoft.Extensions.Logging

[Microsoft.Extensions.Logging](https://learn.microsoft.com/dotnet/core/extensions/logging) is an extensible logging mechanism with plug-in providers for many common logging systems. EF Core fully integrates with `Microsoft.Extensions.Logging` and this form of logging is used by default for ASP.NET Core applications.

See [Using Microsoft.Extensions.Logging in EF Core](extensions-logging.md) for more information.

## Events

EF Core exposes [.NET events](https://learn.microsoft.com/dotnet/standard/events/) to act as callbacks when certain things happen in the EF Core code. Events are simpler than interceptors and allow more flexible registration. However, they are sync only and so cannot perform non-blocking async I/O.

Events are registered per DbContext instance and this registration can be done at any time. Use a [diagnostic listener](diagnostic-listeners.md) to get the same information but for all DbContext instances in the process.

See [.NET Events in EF Core](events.md) for more information.

## Interception

EF Core interceptors enable interception, modification, and/or suppression of EF Core operations. This includes low-level database operations such as executing a command, as well as higher-level operations, such as calls to SaveChanges.

Interceptors are different from logging and diagnostics in that they allow modification or suppression of the operation being intercepted. [Simple logging](simple-logging.md) or [Microsoft.Extensions.Logging](extensions-logging.md) are better choices for logging.

Interceptors are registered per DbContext instance when the context is configured. Use a [diagnostic listener](diagnostic-listeners.md) to get the same information but for all DbContext instances in the process.

See [Interception](interceptors.md) for more information.

## Diagnostic listeners

Diagnostic listeners allow listening for any EF Core event that occurs in the current .NET process.

Diagnostic listeners are not suitable for getting events from a single DbContext instance. EF Core interceptors provide access to the same events with per-context registration.

Diagnostic listeners are not designed for logging. [Simple logging](simple-logging.md) or [Microsoft.Extensions.Logging](extensions-logging.md) are better choices for logging.

See [Using diagnostic listeners in EF Core](diagnostic-listeners.md) for more information.
