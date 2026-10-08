---
title: Complex Types - EF Core
description: How to configure and use complex types to model value objects in Entity Framework Core
author: AndriySvyryd
ms.date: 07/27/2026
uid: core/modeling/complex-types
---
# Complex Types

Objects saved to the database can be split into three broad categories:

- Objects that are unstructured and hold a single value. For example, `int`, `Guid`, `string`, `IPAddress`. These are (somewhat loosely) called _primitive types_.
- Objects that are structured to hold multiple values, and where the identity of the object is defined by a key value. For example, `Blog`, `Post`, `Customer`. These are called _entity types_.
- Objects that are structured to hold multiple values, but the object has no key defining its identity. For example, `Address`, `Coordinate`, `Money`. These are called _value objects_, and EF Core maps them as _complex types_.

A _complex type_ groups several properties into a single .NET type that is contained within an entity type; it doesn't have an identity of its own and cannot be tracked or queried independently. This makes complex types the natural way to model [value objects](https://martinfowler.com/bliki/ValueObject.html).

> **Tip:**
> You can run and debug into the [full sample project](https://github.com/dotnet/EntityFramework.Docs/tree/main/samples/core/Modeling/ComplexTypes) for this article on GitHub.

> **Note:**
> Complex types were introduced in EF Core 8, and have been extended substantially in later releases. Features are annotated below with the version that introduced them.

## Complex types vs. owned entity types

Before complex types existed, [owned entity types](owned-entities.md) were the recommended way to model objects without key properties. However, owned types are still _entity types_ behind the scenes: they have a hidden key and identity, and therefore operate with reference semantics. This causes a number of friction points that complex types are designed to solve.

The key differences are:

| Aspect | Owned entity types | Complex types |
| --- | --- | --- |
| Identity | Have a hidden key and identity | No identity; compared by value |
| Instance sharing | The same instance can't be referenced twice | The same instance can be assigned to multiple properties |
| Assignment semantics | Reference semantics | Value semantics (properties are copied) |
| .NET type | Reference types only | Reference _or_ value types |
| Table mapping | Own table, table splitting, or JSON | Container's table (table splitting) or JSON |
| Navigations | Can contain navigations to other entities | Cannot contain navigations |
| Bulk update (`ExecuteUpdate`) | Not supported | Supported |

For example, assigning a customer's billing address to be the same as their shipping address fails with owned entity types, because the same entity instance can't be referenced more than once:

```csharp
var customer = await context.Customers.SingleAsync(c => c.Id == someId);
customer.BillingAddress = customer.ShippingAddress;
await context.SaveChangesAsync(); // Throws with owned entity types
```

Because complex types have value semantics, the same assignment simply copies the properties over, and works as expected. Similarly, comparing two complex values in a LINQ query compares their contents, whereas comparing two owned entities compares their identities.

For these reasons, complex types are generally the better choice for modeling value objects with table splitting or JSON mapping. Users currently using owned entity types for these scenarios are encouraged to consider switching to complex types.

## A simple example

Consider an `Address` type that holds several related values but has no identity of its own:

[Address (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/Model.cs?name=Address)](../../../_code/samples/core/Modeling/ComplexTypes/Model.cs.md)

`Address` can then be used in several places across a customer/orders model:

[CustomerOrders (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/Model.cs?name=CustomerOrders)](../../../_code/samples/core/Modeling/ComplexTypes/Model.cs.md)

Creating and saving a customer works as usual:

[SaveCustomer (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/Program.cs?name=SaveCustomer)](../../../_code/samples/core/Modeling/ComplexTypes/Program.cs.md)

On a relational database, the complex type does not get its own table. Instead, its properties are saved inline as additional columns on the containing entity's table (this is known as _table splitting_):

```sql
INSERT INTO [Customers] ([Name], [Address_City], [Address_Country], [Address_Line1], [Address_Line2], [Address_PostCode])
OUTPUT INSERTED.[Id]
VALUES (@p0, @p1, @p2, @p3, @p4, @p5);
```

Because complex types have value semantics, the same `Address` instance can be shared across multiple properties without any issues:

[SharedInstance (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/Program.cs?name=SharedInstance)](../../../_code/samples/core/Modeling/ComplexTypes/Program.cs.md)

## Configuring complex types

Unlike most entity types, complex types are **not discovered by convention**. You must configure them explicitly, either by annotating the type with [System.ComponentModel.DataAnnotations.Schema.ComplexTypeAttribute](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.Schema.ComplexTypeAttribute), or by calling the `ComplexProperty` Fluent API in `OnModelCreating` for each property that should be mapped as a complex type:

### [Data Annotations](#tab/data-annotations)

[AddressAttribute (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/DataAnnotations.cs?name=AddressAttribute)](../../../_code/samples/core/Modeling/ComplexTypes/DataAnnotations.cs.md)

### [Fluent API](#tab/fluent-api)

[ComplexPropertyConfig (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs?name=ComplexPropertyConfig)](../../../_code/samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs.md)

***

### Configuring facets of complex type properties

The nested `Property` builder can be used to configure the scalar properties of a complex type, just like properties of an entity type - for example, to set the column name or maximum length:

[ComplexPropertyFacets (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs?name=ComplexPropertyFacets)](../../../_code/samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs.md)

Starting with EF Core 11, you can configure a property nested inside a complex type directly by chaining member access in the lambda, without first obtaining the complex-type builder:

[PropertyChaining (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs?name=PropertyChaining)](../../../_code/samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs.md)

## Reference and value types

A complex type can be a .NET [reference type](https://learn.microsoft.com/dotnet/csharp/language-reference/keywords/reference-types) (a `class` or `record`) or a [value type](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/value-types) (a `struct` or `record struct`, introduced in EF Core 10).

### Mutability

Because a reference-type instance can be shared by multiple properties, mutating one of its properties changes the value everywhere it is used. This is usually not what you want. A good way to avoid it - and a natural fit for value objects - is to make the complex type **immutable**, so that changing a value requires creating a new instance. The `Address` type used throughout this article is an immutable `record`; changing an address is therefore done with a `with` expression:

[ChangeImmutableRecord (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/Program.cs?name=ChangeImmutableRecord)](../../../_code/samples/core/Modeling/ComplexTypes/Program.cs.md)

Even though a whole new `Address` instance is assigned, EF still tracks changes at the individual property level, so only the columns whose values actually changed are updated:

```sql
UPDATE [Customers] SET [Address_Line1] = @p0
OUTPUT 1
WHERE [Id] = @p1;
```

Immutability can be expressed with an immutable `class` (init-only or read-only properties), a `record`, a `readonly struct`, or a `readonly record struct`. Value types (`struct`) have copy semantics, so assigning them always copies the values and avoids the accidental-sharing problem, even when mutable - but [mutable structs are generally discouraged in C#](https://learn.microsoft.com/archive/blogs/ericlippert/mutating-readonly-structs), so an immutable form is still recommended.

> **Tip:**
> If several entities really should observe the same address and update together when it changes, then model the address as an _entity type_ with its own identity and reference it via a navigation, rather than using a complex type.

## Nested complex types

A complex type can contain properties of other complex types, allowing you to build up structured objects to any depth. For example, a `Contact` complex type might contain both an `Address` and one or more `PhoneNumber` complex types:

```csharp
public record Address(string Line1, string? Line2, string City, string Country, string PostCode);

public record PhoneNumber(int CountryCode, long Number);

public record Contact
{
    public required Address Address { get; init; }
    public required PhoneNumber HomePhone { get; init; }
    public required PhoneNumber WorkPhone { get; init; }
}
```

When mapped via table splitting, the columns of a nested complex type are prefixed with the full path to the property (for example, `Contact_HomePhone_Number`).

## Optional complex types

By default, a complex property is **required**: the CLR property must always have a value, and it maps to non-nullable columns. Starting with EF Core 10, a complex property can be made optional by declaring it as nullable:

[CustomerOrders (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/Model.cs?name=CustomerOrders)](../../../_code/samples/core/Modeling/ComplexTypes/Model.cs.md)

An optional complex property that is `null` results in `NULL` values in all of its columns.

> **Note:**
> An optional complex type currently requires at least one **required** property to be defined on the complex type. This is because EF needs at least one non-nullable column to distinguish a `null` complex value from a complex value whose properties all happen to be `null`.

If the complex type has no required property of its own, you can instead configure a discriminator property. While EF Core does not yet support inheritance for complex types, the discriminator is created as a **required shadow property** by default, which satisfies the requirement above:

[OptionalWithDiscriminator (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs?name=OptionalWithDiscriminator)](../../../_code/samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs.md)

## Collections of complex types

Starting with EF Core 10, a property can hold a _collection_ of complex types. On relational databases, complex collections must be mapped to a single JSON column using `ToJson` - they cannot be mapped to a different table:

[Distributor (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/Model.cs?name=Distributor)](../../../_code/samples/core/Modeling/ComplexTypes/Model.cs.md)

[ComplexCollectionJson (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs?name=ComplexCollectionJson)](../../../_code/samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs.md)

Each element of the collection is stored as a JSON object inside the array, and the entire collection maps to one column:

```sql
CREATE TABLE [Distributors] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [ShippingCenters] json NOT NULL,
    CONSTRAINT [PK_Distributors] PRIMARY KEY ([Id])
);
```

> **Note:**
> Collections of value types (`struct`) are not currently supported; use a reference type (`class` or `record`) for complex collection elements.

## Mapping complex types to JSON

In addition to table splitting, EF Core 10 allows mapping a (non-collection) complex property to a single JSON column with `ToJson`:

```csharp
modelBuilder.Entity<Customer>(b =>
{
    b.ComplexProperty(c => c.Address, c => c.ToJson());
    b.ComplexProperty(c => c.SecondaryAddress, c => c.ToJson());
});
```

Each complex value is then serialized into a single JSON column rather than spread across multiple columns:

```sql
CREATE TABLE [Customers] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [Address] json NOT NULL,
    [SecondaryAddress] json NULL,
    CONSTRAINT [PK_Customers] PRIMARY KEY ([Id])
);
```

On SQL Server 2025 and Azure SQL, EF uses the native [`json` data type](https://learn.microsoft.com/sql/t-sql/data-types/json-data-type) by default; on other databases and older SQL Server versions, JSON is stored in a text column. You can override the column type with `HasColumnType` if needed.

Unlike table splitting, JSON mapping allows collections _within_ the mapped type, and lets you query and update individual properties inside the document just like any other property. Values inside JSON columns can also be efficiently updated in bulk with [Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdateAsync*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.ExecuteUpdateAsync*).

## Keys and indexes on complex type properties

Starting with EF Core 11, keys and indexes can target scalar properties nested inside non-collection complex types. This can be done with a lambda:

[IndexOnComplexProperty (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs?name=IndexOnComplexProperty)](../../../_code/samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs.md)

The same paths can be configured by name, using `.` to navigate into a complex property:

```csharp
modelBuilder.Entity<Customer>()
    .HasIndex("Address.PostCode");
```

For relational providers, indexes can also target paths inside complex types mapped to JSON columns. Complex collection paths use `[]` to refer to all elements, or a numeric indexer for a specific element:

[IndexOnComplexCollection (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs?name=IndexOnComplexCollection)](../../../_code/samples/core/Modeling/ComplexTypes/ComplexTypesContext.cs.md)

> **Note:**
> Indexing into a JSON-mapped complex collection requires a database that supports JSON indexes, such as SQL Server 2025.

For more information, see [Keys](keys.md) and [Indexes and constraints](indexes.md).

## Complex types with entity inheritance

Starting with EF Core 11, complex types and JSON columns can be used on entity types that use [TPT (table-per-type) or TPC (table-per-concrete-type)](inheritance.md). This lets you combine the flexibility of these inheritance strategies with the modeling power of complex types.

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Animal>()
        .UseTptMappingStrategy()
        .ComplexProperty(a => a.Details);
}
```

## Change tracking

EF Core tracks changes to the individual properties of a complex type, so only the affected columns are updated when you call `SaveChanges`. You can inspect and manipulate this tracking state through the change tracker.

Use `EntityEntry.ComplexProperty` to reach a complex property, and then drill into its scalar properties:

[ChangeTracking (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/Program.cs?name=ChangeTracking)](../../../_code/samples/core/Modeling/ComplexTypes/Program.cs.md)

The [Microsoft.EntityFrameworkCore.ChangeTracking.ComplexPropertyEntry](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.ComplexPropertyEntry) API mirrors the entity `EntityEntry` API: you can read and set `CurrentValue`, check and set `IsModified`, and navigate into further nested complex properties or complex collections. Complex properties are also exposed through the entity's [property values](../change-tracking/entity-entries.md) APIs (`CurrentValues`/`OriginalValues`).

## Querying complex types

Complex type members can be used in LINQ queries just like properties of the entity itself - you can filter on them, project them, and order by them:

[QueryComplexMember (complete source file; reference: ../../../samples/core/Modeling/ComplexTypes/Program.cs?name=QueryComplexMember)](../../../_code/samples/core/Modeling/ComplexTypes/Program.cs.md)

Because complex types have value semantics, you can also compare an entire complex value in a query, and EF will compare all of its properties:

```csharp
var ordersToHomeAddress = await context.Orders
    .Where(o => o.ShippingAddress == o.BillingAddress)
    .ToListAsync();
```

For complex types mapped to JSON, EF Core 11 adds `EF.Functions.JsonPathExists`, which checks whether a given JSON path exists in the document:

```csharp
var withPostCode = await context.Customers
    .Where(c => EF.Functions.JsonPathExists(c.Address, "$.PostCode"))
    .ToListAsync();
```

## Limitations

Complex types are designed for modeling value objects, and intentionally do not support every capability of entity types. The main limitations are:

- **No identity or tracking of their own.** A complex type can only exist as part of an entity; you cannot have a `DbSet<T>` of a complex type, nor track or query it independently.
- **No navigations.** A complex type cannot contain navigation properties to entity types.
- **No separate table.** On relational databases, a complex type is always stored in its container's table (via table splitting) or in a JSON column - never in its own table.
- **Collections require JSON.** On relational providers, complex collections must be mapped to JSON with `ToJson`; they cannot be mapped via table splitting.
- **Collections of value types are not supported.** Complex collection elements must be reference types.
- **Optional complex types require a required property.** An optional (nullable) complex type must define at least one required property.

Complex type support continues to be broadened across releases; see the [what's new](https://learn.microsoft.com/search/?terms=core%2Fwhat-is-new%2Fef-core-11.0%2Fwhatsnew%23complex-types) pages for the latest additions.
