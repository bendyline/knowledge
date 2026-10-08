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
* Registering a pool in [Dependency injection](../../../fundamentals/dependency-injection.md) (DI) as an instance.
* Registering the `ObjectPoolProvider<>` in DI and using it as a factory.

## How to use ObjectPool

Call [Microsoft.Extensions.ObjectPool.ObjectPool`1.Get*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601.Get*) to get an object and [Microsoft.Extensions.ObjectPool.ObjectPool`1.Return*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601.Return*) to return the object.  There's no requirement that you return every object. If you don't return an object, it will be garbage collected.

## ObjectPool sample

The following code:

* Adds `ObjectPoolProvider` to the [Dependency injection](../../../fundamentals/dependency-injection.md) (DI) container.
* Adds and configures `ObjectPool<StringBuilder>` to the DI container.
* Adds the `BirthdayMiddleware`.

[Code example (complete source file; reference: \~/performance/ObjectPool/ObjectPoolSample6/Program.cs)](../../../../_code/aspnetcore/performance/ObjectPool/ObjectPoolSample6/Program.cs.md)

The following code implements `BirthdayMiddleware`

[Code example (complete source file; reference: \~/performance/ObjectPool/ObjectPoolSample6/BirthdayMiddleware.cs)](../../../../_code/aspnetcore/performance/ObjectPool/ObjectPoolSample6/BirthdayMiddleware.cs.md)
