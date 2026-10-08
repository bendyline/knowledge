---
title: Object reuse with ObjectPool in ASP.NET Core
author: tdykstra
description: Tips for increasing performance in ASP.NET Core apps using ObjectPool.
monikerRange: '>= aspnetcore-1.1'
ms.author: tdykstra
ms.date: 4/21/2023
uid: performance/ObjectPool
---
# Object reuse with ObjectPool in ASP.NET Core

By [Günther Foidl](https://github.com/gfoidl), [Steve Gordon](https://twitter.com/stevejgordon), and [Samson Amaugo](https://github.com/sammychinedu2ky)

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


**Applies to: \>= aspnetcore-8.0**

[Microsoft.Extensions.ObjectPool](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool) is part of the ASP.NET Core infrastructure that supports keeping a group of objects in memory for reuse rather than allowing the objects to be garbage collected. All the static and instance methods in `Microsoft.Extensions.ObjectPool` are thread-safe.

Apps might want to use the object pool if the objects that are being managed are:

* Expensive to allocate/initialize.
* Represent a limited resource.
* Used predictably and frequently.

For example, the ASP.NET Core framework uses the object pool in some places to reuse [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) instances. `StringBuilder` allocates and manages its own buffers to hold character data. ASP.NET Core regularly uses `StringBuilder` to implement features, and reusing them provides a performance benefit.

Object pooling doesn't always improve performance:

* Unless the initialization cost of an object is high, it's usually slower to get the object from the pool.
* Objects managed by the pool aren't de-allocated until the pool is de-allocated.

Use object pooling only after collecting performance data using realistic scenarios for your app or library.

**NOTE: The ObjectPool doesn't place a limit on the number of objects that it allocates, it places a limit on the number of objects it retains.**

## ObjectPool concepts

When [Microsoft.Extensions.ObjectPool.DefaultObjectPoolProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.DefaultObjectPoolProvider) is used and `T` implements `IDisposable`:

* Items that are ***not*** returned to the pool will be disposed.
* When the pool gets disposed by DI, all items in the pool are disposed.

NOTE: After the pool is disposed:

* Calling `Get` throws an `ObjectDisposedException`.
* Calling `Return` disposes the given item.

Important `ObjectPool` types and interfaces:

* [Microsoft.Extensions.ObjectPool.ObjectPool`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601) : The basic object pool abstraction. Used to get and return objects.
* [Microsoft.Extensions.ObjectPool.PooledObjectPolicy%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.PooledObjectPolicy%25601) : Implement this to customize how an object is created and how it's reset when returned to the pool. This can be passed into an object pool that's constructed directly.
* [Microsoft.Extensions.ObjectPool.IResettable](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.IResettable) : Automatically resets the object when returned to an object pool.

The ObjectPool can be used in an app in multiple ways:

* Instantiating a pool.
* Registering a pool in [Dependency injection](../fundamentals/dependency-injection.md) (DI) as an instance.
* Registering the `ObjectPoolProvider<>` in DI and using it as a factory.

## How to use ObjectPool

Call [Microsoft.Extensions.ObjectPool.ObjectPool`1.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601.Get*) to get an object and [Microsoft.Extensions.ObjectPool.ObjectPool`1.Return*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601.Return*) to return the object.  There's no requirement to return every object. If an object isn't returned, it will be garbage collected.

## ObjectPool sample

The following code:

* Adds `ObjectPoolProvider` to the [Dependency injection](../fundamentals/dependency-injection.md) (DI) container.
* Implements the `IResettable` interface to automatically clear the contents of the buffer when returned to the object pool.

[Code example (complete source file; reference: \~/performance/ObjectPool/ObjectPoolSample8/Program.cs)](../../_code/aspnetcore/performance/ObjectPool/ObjectPoolSample8/Program.cs.md)

**NOTE:** When the pooled type `T` doesn't implement `IResettable`, then a custom `PooledObjectPolicy<T>` can be used to reset the state of the objects before they are returned to the pool.



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

[Microsoft.Extensions.ObjectPool](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool) is part of the ASP.NET Core infrastructure that supports keeping a group of objects in memory for reuse rather than allowing the objects to be garbage collected. All the static and instance methods in `Microsoft.Extensions.ObjectPool` are thread-safe.

Apps might want to use the object pool if the objects that are being managed are:

* Expensive to allocate/initialize.
* Represent a limited resource.
* Used predictably and frequently.

For example, the ASP.NET Core framework uses the object pool in some places to reuse [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) instances. `StringBuilder` allocates and manages its own buffers to hold character data. ASP.NET Core regularly uses `StringBuilder` to implement features, and reusing them provides a performance benefit.

Object pooling doesn't always improve performance:

* Unless the initialization cost of an object is high, it's usually slower to get the object from the pool.
* Objects managed by the pool aren't de-allocated until the pool is de-allocated.

Use object pooling only after collecting performance data using realistic scenarios for your app or library.

**NOTE: The ObjectPool doesn't place a limit on the number of objects that it allocates, it places a limit on the number of objects it retains.**

## Concepts

When [Microsoft.Extensions.ObjectPool.DefaultObjectPoolProvider](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.DefaultObjectPoolProvider) is used and `T` implements `IDisposable`:

* Items that are ***not*** returned to the pool will be disposed.
* When the pool gets disposed by DI, all items in the pool are disposed.

NOTE: After the pool is disposed:

* Calling `Get` throws an `ObjectDisposedException`.
* Calling `Return` disposes the given item.

Important `ObjectPool` types and interfaces:

* [Microsoft.Extensions.ObjectPool.ObjectPool`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601) : The basic object pool abstraction. Used to get and return objects.
* [Microsoft.Extensions.ObjectPool.PooledObjectPolicy%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.PooledObjectPolicy%25601) : Implement this to customize how an object is created and how it is reset when returned to the pool. This can be passed into an object pool that is construct directly, or
* [Microsoft.Extensions.ObjectPool.ObjectPoolProvider.Create*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPoolProvider.Create*) : Acts as a factory for creating object pools.
* [Microsoft.Extensions.ObjectPool.IResettable](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.IResettable): Automatically resets the object when returned to an object pool.

The ObjectPool can be used in an app in multiple ways:

* Instantiating a pool.
* Registering a pool in [Dependency injection](../fundamentals/dependency-injection.md) (DI) as an instance.
* Registering the `ObjectPoolProvider<>` in DI and using it as a factory.

## How to use ObjectPool

Call [Microsoft.Extensions.ObjectPool.ObjectPool`1.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601.Get*) to get an object and [Microsoft.Extensions.ObjectPool.ObjectPool`1.Return*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601.Return*) to return the object.  There's no requirement that you return every object. If you don't return an object, it will be garbage collected.

## ObjectPool sample

The following code:

* Adds `ObjectPoolProvider` to the [Dependency injection](../fundamentals/dependency-injection.md) (DI) container.
* Adds and configures `ObjectPool<StringBuilder>` to the DI container.
* Adds the `BirthdayMiddleware`.

[Code reference unavailable in this source snapshot: ObjectPool/includes/~/performance/ObjectPool/ObjectPoolSample6/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/ObjectPool.md)

The following code implements `BirthdayMiddleware`

[Code reference unavailable in this source snapshot: ObjectPool/includes/~/performance/ObjectPool/ObjectPoolSample6/BirthdayMiddleware.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/ObjectPool.md)




**Applies to: < aspnetcore-6.0**

[Microsoft.Extensions.ObjectPool](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool) is part of the ASP.NET Core infrastructure that supports keeping a group of objects in memory for reuse rather than allowing the objects to be garbage collected.

You might want to use the object pool if the objects that are being managed are:

* Expensive to allocate/initialize.
* Represent some limited resource.
* Used predictably and frequently.

For example, the ASP.NET Core framework uses the object pool in some places to reuse [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) instances. `StringBuilder` allocates and manages its own buffers to hold character data. ASP.NET Core regularly uses `StringBuilder` to implement features, and reusing them provides a performance benefit.

Object pooling doesn't always improve performance:

* Unless the initialization cost of an object is high, it's usually slower to get the object from the pool.
* Objects managed by the pool aren't de-allocated until the pool is de-allocated.

Use object pooling only after collecting performance data using realistic scenarios for your app or library.


**Applies to: < aspnetcore-3.0**
**WARNING: The `ObjectPool` doesn't implement `IDisposable`. We don't recommend using it with types that need disposal.** `ObjectPool` in ASP.NET Core 3.0 or later supports `IDisposable`.

**Applies to: < aspnetcore-6.0**

**NOTE: The ObjectPool doesn't place a limit on the number of objects that it will allocate, it places a limit on the number of objects it will retain.**

## Concepts

[Microsoft.Extensions.ObjectPool.ObjectPool`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601) - the basic object pool abstraction. Used to get and return objects.

[Microsoft.Extensions.ObjectPool.PooledObjectPolicy%601](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.PooledObjectPolicy%25601) - implement this to customize how an object is created and how it is *reset* when returned to the pool. This can be passed into an object pool that you construct directly.... OR

[Microsoft.Extensions.ObjectPool.ObjectPoolProvider.Create*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPoolProvider.Create*) acts as a factory for creating object pools.
<!-- REview, there is no ObjectPoolProvider<T> -->

The ObjectPool can be used in an app in multiple ways:

* Instantiating a pool.
* Registering a pool in [Dependency injection](../fundamentals/dependency-injection.md) (DI) as an instance.
* Registering the `ObjectPoolProvider<>` in DI and using it as a factory.

## How to use ObjectPool

Call [Microsoft.Extensions.ObjectPool.ObjectPool`1.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601.Get*) to get an object and [Microsoft.Extensions.ObjectPool.ObjectPool`1.Return*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601.Return*) to return the object.  There's no requirement that you return every object. If you don't return an object, it will be garbage collected.



**Applies to: < aspnetcore-6.0**

## ObjectPool sample

The following code:

* Adds `ObjectPoolProvider` to the [Dependency injection](../fundamentals/dependency-injection.md) (DI) container.
* Adds and configures `ObjectPool<StringBuilder>` to the DI container.
* Adds the `BirthdayMiddleware`.

[Code reference unavailable in this source snapshot: ObjectPool/includes/~/performance/ObjectPool/ObjectPoolSample/Startup.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/ObjectPool.md)

The following code implements `BirthdayMiddleware`

[Code reference unavailable in this source snapshot: ObjectPool/includes/~/performance/ObjectPool/ObjectPoolSample/BirthdayMiddleware.cs?name=snippet](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/performance/ObjectPool.md)
