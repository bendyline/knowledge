---
title: Grain identity
description: Learn about grain identities in .NET Orleans.
ms.date: 03/31/2025
ms.topic: concept-article
---

# Grain identity

Grains in Orleans each have a single, unique, user-defined identifier consisting of two parts:

1. The grain _type_ name, uniquely identifying the grain class.
1. The grain _key_, uniquely identifying a logical instance of that grain class.

Orleans represents both grain type and key as human-readable strings. By convention, write the grain identity with the grain type and key separated by a `/` character. For example, `shoppingcart/bob65` represents the grain type named `shoppingcart` with the key `bob65`.

Constructing grain identities directly is uncommon. Instead, creating [grain references](grain-references.md) using [Orleans.IGrainFactory](https://learn.microsoft.com/search/?terms=Orleans.IGrainFactory) is more common.

The following sections discuss grain type names and grain keys in more detail.

## Grain type names

Orleans creates a grain type name based on the grain implementation class. It removes the suffix "Grain" from the class name, if present, and converts the resulting string to its lowercase representation. For example, a class named `ShoppingCartGrain` receives the grain type name `shoppingcart`. It's recommended that grain type names and keys consist only of printable characters, such as alphanumeric characters (`a`-`z`, `A`-`Z`, and `0`-`9`) and symbols like `-`, `_`, `@`, and `=`. Other characters might not be supported and often require special treatment when printed in logs or appearing as identifiers in other systems, such as databases.

Alternatively, use the [Orleans.GrainTypeAttribute](https://learn.microsoft.com/search/?terms=Orleans.GrainTypeAttribute) attribute to customize the grain type name for the grain class it's attached to, as shown in the following example:

```csharp
[GrainType("cart")]
public class ShoppingCartGrain : IShoppingCartGrain
{
    // Add your grain implementation here
}
```

In the preceding example, the grain class `ShoppingCartGrain` has the grain type name `cart`. Each grain can only have one grain type name.

For generic grains, include the generic arity in the grain type name. For example, consider the following `DictionaryGrain<K, V>` class:

```csharp
[GrainType("dict`2")]
public class DictionaryGrain<K, V> : IDictionaryGrain<K, V>
{
    // Add your grain implementation here
}
```

The grain class has two generic parameters, so a backtick `` ` `` followed by the generic arity, 2, is added to the end of the grain type name `dict` to create the grain type name ``dict`2``. This is specified in the attribute on the grain class: ``[GrainType("dict`2")]``.

## Grain keys

For convenience, Orleans exposes methods allowing construction of grain keys from a [System.Guid](https://learn.microsoft.com/search/?terms=System.Guid) or [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64), in addition to a [System.String](https://learn.microsoft.com/search/?terms=System.String). The primary key is scoped to the grain type. Therefore, the complete identity of a grain forms from its type and key.

The caller of the grain decides which scheme to use. The options are:

- [System.Guid](https://learn.microsoft.com/search/?terms=System.Guid)
- [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64)
- [System.String](https://learn.microsoft.com/search/?terms=System.String)
- [System.Guid](https://learn.microsoft.com/search/?terms=System.Guid) and [System.String](https://learn.microsoft.com/search/?terms=System.String)
- [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) and [System.String](https://learn.microsoft.com/search/?terms=System.String)

Because the underlying data is the same, the schemes can be used interchangeably: they are all encoded as strings.

Situations requiring a singleton grain instance can use a well-known, fixed value such as `"default"`. This is merely a convention, but adhering to it clarifies at the caller site that a singleton grain is in use.

### Using globally unique identifiers (GUIDs) as keys

[System.Guid](https://learn.microsoft.com/search/?terms=System.Guid) make useful keys when randomness and global uniqueness are desired, such as when creating a new job in a job processing system. Coordinating key allocation isn't needed, which could introduce a single point of failure or a system-side lock on a resource, potentially creating a bottleneck. The chance of GUID collisions is very low, making them a common choice when architecting systems needing random identifier allocation.

Referencing a grain by GUID in client code:

```csharp
var grain = grainFactory.GetGrain<IExample>(Guid.NewGuid());
```

Retrieving the primary key from grain code:

```csharp
public override Task OnActivateAsync()
{
    Guid primaryKey = this.GetPrimaryKey();
    return base.OnActivateAsync();
}
```

### Using integers as keys

A long integer is also available. This makes sense if the grain persists to a relational database, where numerical indexes are often preferred over GUIDs.

Referencing a grain by a long integer in client code:

```csharp
var grain = grainFactory.GetGrain<IExample>(1);
```

Retrieving the primary key from grain code:

```csharp
public override Task OnActivateAsync()
{
    long primaryKey = this.GetPrimaryKeyLong();
    return base.OnActivateAsync();
}
```

### Using strings as keys

A string key is also available.

Referencing a grain by String in client code:

```csharp
var grain = grainFactory.GetGrain<IExample>("myGrainKey");
```

Retrieving the primary key from grain code:

```csharp
public override Task OnActivateAsync()
{
    string primaryKey = this.GetPrimaryKeyString();
    return base.OnActivateAsync();
}
```

### Using compound keys

If the system doesn't fit well with either GUIDs or longs, opt for a compound primary key. This allows using a combination of a GUID or long and a string to reference a grain.

Inherit the interface from [Orleans.IGrainWithGuidCompoundKey](https://learn.microsoft.com/search/?terms=Orleans.IGrainWithGuidCompoundKey) or [Orleans.IGrainWithIntegerCompoundKey](https://learn.microsoft.com/search/?terms=Orleans.IGrainWithIntegerCompoundKey) like this:

```csharp
public interface IExampleGrain : Orleans.IGrainWithIntegerCompoundKey
{
    Task Hello();
}
```

In client code, this adds a second argument to the [Orleans.IGrainFactory.GetGrain*](https://learn.microsoft.com/search/?terms=Orleans.IGrainFactory.GetGrain*) method on the grain factory:

```csharp
var grain = grainFactory.GetGrain<IExample>(0, "a string!", null);
```

To access the compound key in the grain, call an overload of the [Orleans.GrainExtensions.GetPrimaryKey*](https://learn.microsoft.com/search/?terms=Orleans.GrainExtensions.GetPrimaryKey*) method (such as [Orleans.GrainExtensions.GetPrimaryKeyLong*](https://learn.microsoft.com/search/?terms=Orleans.GrainExtensions.GetPrimaryKeyLong*)):

```csharp
public class ExampleGrain : Orleans.Grain, IExampleGrain
{
    public Task Hello()
    {
        long primaryKey = this.GetPrimaryKeyLong(out string keyExtension);
        Console.WriteLine($"Hello from {keyExtension}");

        return Task.CompletedTask;
    }
}
```

## Why grains use logical identifiers

In object-oriented environments like .NET, an object's identity is hard to distinguish from a reference to it. When an object is created using the `new` keyword, the returned reference represents all aspects of its identity except those mapping the object to some external entity it represents. Orleans is designed for distributed systems. In distributed systems, object references cannot represent instance identity because they are limited to a single process's address space. Orleans uses logical identifiers to avoid this limitation. Grains use logical identifiers so grain references remain valid across process lifetimes and are portable from one process to another. This allows them to be stored and later retrieved, or sent across a network to another process in the application, all while still referring to the same entity: the grain for which the reference was created.
