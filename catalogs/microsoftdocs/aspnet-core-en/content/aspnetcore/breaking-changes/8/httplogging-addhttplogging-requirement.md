---
title: "Breaking change: HTTP logging middleware requires AddHttpLogging()"
description: Learn about the breaking change in ASP.NET Core 8.0 where HTTP logging middleware now requires AddHttpLogging() to be called.
ms.date: 09/29/2025
---
# HTTP logging middleware requires AddHttpLogging()

ASP.NET Core HTTP logging middleware has been updated with extra functionality. The middleware now requires services registered with [Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%252A).

## Version introduced

ASP.NET Core 8.0

## Previous behavior

Previously, you could call just `app.UseHttpLogging();` to activate HTTP logging.

## New behavior

Starting in .NET 8, if you don't also call [Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging%252A), an error is raised:

> System.InvalidOperationException: Unable to resolve service for type 'Microsoft.Extensions.ObjectPool.ObjectPool`1[Microsoft.AspNetCore.HttpLogging.HttpLoggingInterceptorContext]' while attempting to activate 'Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware'.

## Type of breaking change

This change is a [behavioral change](https://learn.microsoft.com/dotnet/core/compatibility/categories#behavioral-change).

## Reason for change

Additional features were added to the HttpLogging middleware that are registered (and configurable) via the [Microsoft.AspNetCore.Telemetry.HttpLoggingServiceExtensions.AddHttpLogging*](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Telemetry.HttpLoggingServiceExtensions.AddHttpLogging*) method.

## Recommended action

Call `services.AddHttpLogging()` during host construction.

## Affected APIs

None.
