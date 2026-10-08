---
title: Modeling - Azure Cosmos DB Provider - EF Core
description: Configuring the model with the Azure Cosmos DB EF Core Provider
author: SamMonoRT
ms.date: 06/09/2026
uid: core/providers/cosmos/modeling
---
# Configuring the model with the EF Core Azure Cosmos DB Provider

## Containers and entity types

In Azure Cosmos DB, JSON documents are stored in containers. Unlike tables in relational databases, Azure Cosmos DB containers can contain documents with different shapes - a container does not impose a uniform schema on its documents. However, various configuration options are defined at the container level, and therefore affect all documents contained within it. See the [Azure Cosmos DB documentation on containers](https://learn.microsoft.com/azure/cosmos-db/resource-model) for more information.

By default, EF maps all entity types to the same container; this is usually a good default in terms of performance and pricing. The default container is named after the .NET context type (`OrderContext` in this case). To change the default container name, use [Microsoft.EntityFrameworkCore.CosmosModelBuilderExtensions.HasDefaultContainer*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.CosmosModelBuilderExtensions.HasDefaultContainer*):

```csharp
modelBuilder.HasDefaultContainer("Store");
```

To map an entity type to a different container use [Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.ToContainer*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.ToContainer*):

```csharp
modelBuilder.Entity<Order>().ToContainer("Orders");
```

Before mapping entity types to different containers, make sure you understand the potential performance and pricing implications (e.g. with regards to dedicated and shared throughput); [see the Azure Cosmos DB documentation to learn more](https://learn.microsoft.com/azure/cosmos-db/resource-model).

## IDs and keys

Azure Cosmos DB requires all documents to have an `id` JSON property which uniquely identifies them. Like other EF providers, the EF Azure Cosmos DB provider will attempt to find a property named `Id` or `<type name>Id`, and configure that property as the key of your entity type, mapping it to the `id` JSON property. You can configure any property to be the key property by using [Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder`1.HasKey*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder%601.HasKey*); see [the general EF documentation on keys](../../modeling/keys.md) for more information.

Starting with EF 9.0, the entity's key property is directly mapped to the JSON `id` property — they are one and the same property in the document. This means the key value is not stored twice. For example, a `Blog` entity with `Id = 8` produces a document where the `id` property contains the string value `"8"`:

```json
{
    "id": "8",
    "$type": "Blog",
    ...
}
```

Developers coming to Azure Cosmos DB from other databases sometimes expect the key (`Id`) property to be generated automatically. For example, on SQL Server, EF configures numeric key properties to be IDENTITY columns, where auto-incrementing values are generated in the database. In contrast, Azure Cosmos DB does not support automatic generation of properties, and so key properties must be explicitly set. Inserting an entity type with an unset key property will simply insert the CLR default value for that property (e.g. 0 for `int`), and a second insert will fail; EF issues a warning if you attempt to do this.

If you'd like to have a GUID as your key property, you can configure EF to generate unique, random values at the client:

```csharp
modelBuilder.Entity<Session>().Property(b => b.Id).HasValueGenerator<GuidValueGenerator>();
```

### Shadow id

In some cases where a direct mapping to `id` is not possible, EF creates a shadow property that maps to the JSON `id`. This shadow property contains a synthesized value (combining the key and potentially other properties, separated by `|`) that uniquely identifies the document. EF manages this shadow property automatically, but its presence means the key property is stored separately in the document under its own name in addition to the `id` property.

You can also explicitly configure EF to use a shadow `id` property by calling [Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasShadowId*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasShadowId*):

```csharp
modelBuilder.Entity<Session>().HasShadowId();
```

Or configure all entity types at once:

```csharp
modelBuilder.HasShadowIds();
```

This was the default behavior prior to EF 9.0. If you are upgrading from EF 8, see the [breaking change documentation](https://learn.microsoft.com/search/?terms=core%2Fwhat-is-new%2Fef-core-9.0%2Fbreaking-changes%23cosmos-key-changes) for more information.

## Partition keys

Azure Cosmos DB uses partitioning to achieve horizontal scaling; proper modeling and careful selection of the partition key is vital for achieving good performance and keeping costs down. It's highly recommended to read [the Azure Cosmos DB documentation on partitioning](https://learn.microsoft.com/azure/cosmos-db/partition-data) and to plan your partitioning strategy in advance.

To configure the partition key with EF, call [HasPartitionKey](https://learn.microsoft.com/dotnet/api/Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasPartitionKey), passing it a regular property on your entity type:

```csharp
modelBuilder.Entity<Order>().HasPartitionKey(o => o.PartitionKey);
```

Any property can be made into a partition key as long as it is [converted to string](../../modeling/value-conversions.md). Once configured, the partition key property should always have a non-null value; trying to insert a new entity type with an unset partition key property will result in an error.

Note that Azure Cosmos DB allows two documents with the same `id` property to exist in a container, as long as they're in different partitions; this means that in order to uniquely identify a document within a container, both the `id` and the partition key properties must all be provided. Because of this, EF's internal notion of the entity primary key contains both of these elements by convention, unlike e.g. relational databases where there is no partition key concept. This means e.g. that [`FindAsync`](https://learn.microsoft.com/search/?terms=core%2Fchange-tracking%2Fentity-entries%23find-and-findasync) requires both key and partition key properties ([see further docs](https://learn.microsoft.com/search/?terms=core%2Fproviders%2Fcosmos%2Fquerying%23findasync)), and a query must specify these in its `Where` clause to benefit from efficient and cost-effective [`point reads`](https://learn.microsoft.com/search/?terms=core%2Fproviders%2Fcosmos%2Fquerying%23point-reads).

Note that the partition key is defined at the container level. This notably means that it's not possible for multiple entity types in the same container to have different partition key properties. If you need to define different partition keys, map the relevant entity types to different containers.

### Hierarchical partition keys

Azure Cosmos DB also supports _hierarchical_ partition keys to optimize data distribution even further; [see the documentation for more details](https://learn.microsoft.com/azure/cosmos-db/hierarchical-partition-keys). EF 9.0 added support for hierarchical partition keys; to configure these, simply pass up to 3 properties to [HasPartitionKey](https://learn.microsoft.com/dotnet/api/Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasPartitionKey):

```csharp
modelBuilder.Entity<Order>().HasPartitionKey(o => new { e.TenantId, e.UserId, e.SessionId });
```

With such a hierarchical partition key, queries can be easily sent only to the a relevant subset of sub-partitions. For example, if you query for the Orders of a specific tenant, those queries will only be executed against the sub-partitions for that tenant.

If you don't configure a partition key with EF, a warning will be logged at startup; EF Core will create containers with the partition key set to `__partitionKey`, and won't supply any value for it when inserting items. When no partition key is set, your container will be limited to 20 GB of data, which is the maximum storage for a single [logical partition](https://learn.microsoft.com/azure/cosmos-db/partitioning-overview). While this can work for small dev/ test applications, it is highly discouraged to deploy a production application without a well-configured partition key strategy.

Once your partition key properties are properly configured, you can provide values for them in queries; see [Querying with partition keys](https://learn.microsoft.com/search/?terms=core%2Fproviders%2Fcosmos%2Fquerying%23partition-keys) for more information.

## Indexing policy

Starting with EF Core 11.0, the Azure Cosmos DB provider emits more of the EF model's index configuration into the container [indexing policy](https://learn.microsoft.com/azure/cosmos-db/index-policy).

By default, Azure Cosmos DB automatically indexes all properties. You can configure this automatic indexing policy and exclude individual paths:

```csharp
modelBuilder.Entity<Order>()
    .HasAutomaticIndexing()
    .Except("/InternalNotes/?");
```

To index only explicitly configured paths, configure indexes with `HasIndex`. Automatic indexing is disabled automatically as soon as any single-property index is defined, so there is no need to call `HasAutomaticIndexing(false)` explicitly:

```csharp
modelBuilder.Entity<Order>(b =>
{
    b.HasIndex(o => o.OrderNumber);
    b.HasIndex(o => new { o.CustomerId, o.OrderDate });
});
```

When automatic indexing is enabled, single-property indexes are already covered by the default `/*` included path and aren't emitted separately. Composite, vector, and full-text indexes are always emitted.

Indexes can also traverse complex type properties and complex collections. In a string path, `[]` represents all elements of a collection:

```csharp
modelBuilder.Entity<Order>(b =>
{
    b.ComplexCollection(o => o.Items);
    b.HasIndex("Items[].Sku");
});
```

The same index can be configured with a lambda expression:

```csharp
modelBuilder.Entity<Order>()
    .HasIndex(o => o.Items.Select(i => i.Sku));
```

## Discriminators

Since multiple entity types may be mapped to the same container, EF Core always adds a `$type` discriminator property to all JSON documents you save (this property was called `Discriminator` before EF 9.0); this allows EF to recognize documents being loaded from the database, and materialize the right .NET type. Developers coming from relational databases may be familiar with discriminators in the context of [table-per-hierarchy inheritance (TPH)](https://learn.microsoft.com/search/?terms=core%2Fmodeling%2Finheritance%23table-per-hierarchy-and-discriminator-configuration); in Azure Cosmos DB, discriminators are used not just in inheritance mapping scenarios, but also because the same container can contain completely different document types.

The discriminator property name and values can be configured with the standard EF APIs, [see these docs for more information](../../modeling/inheritance.md). If you're mapping a single entity type to a container, are confident that you'll never be mapping another one, and would like to get rid of the discriminator property, call [HasNoDiscriminator](https://learn.microsoft.com/dotnet/api/Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder.HasNoDiscriminator):

```csharp
modelBuilder.Entity<Order>().HasNoDiscriminator();
```

Since the same container can contain different entity types, and the JSON `id` property must be unique within a container partition, you cannot have the same `id` value for entities of different types in the same container partition. Compare this to relational databases, where each entity type is mapped to a different table, and therefore has its own, separate key space. It is therefore your responsibility to ensure the `id` uniqueness of documents you insert into a container. If you need to have different entity types with the same primary key values, you can instruct EF to automatically insert the discriminator into the `id` property as follows:

```csharp
modelBuilder.Entity<Session>().HasDiscriminatorInJsonId();
```

While this may make it easier to work with `id` values, it may make it harder to interoperate with external applications working with your documents, as they now must be aware of EF's concatenated `id` format, as well as the discriminator values, which are by default derived from your .NET types. Note that this was the default behavior prior to EF 9.0.

An additional option is to instruct EF to insert only the _root discriminator_, which is the discriminator of the root entity type of the hierarchy, into the `id` property:

```csharp
modelBuilder.Entity<Session>().HasRootDiscriminatorInJsonId();
```

This is similar, but allows EF to use efficient [point reads](https://learn.microsoft.com/search/?terms=core%2Fproviders%2Fcosmos%2Fquerying%23point-reads) in more scenarios. If you need to insert a discriminator into the `id` property, consider inserting the root discriminator for better performance.

## Provisioned throughput

If you use EF Core to create the Azure Cosmos DB database or containers you can configure [provisioned throughput](https://learn.microsoft.com/azure/cosmos-db/set-throughput) for the database by calling [Microsoft.EntityFrameworkCore.CosmosModelBuilderExtensions.HasAutoscaleThroughput*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.CosmosModelBuilderExtensions.HasAutoscaleThroughput*) or [Microsoft.EntityFrameworkCore.CosmosModelBuilderExtensions.HasManualThroughput*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.CosmosModelBuilderExtensions.HasManualThroughput*). For example:

<!--
modelBuilder.HasManualThroughput(2000);
modelBuilder.HasAutoscaleThroughput(4000);
-->
[ModelThroughput (complete source file; reference: ../../../../samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosModelConfigurationSample.cs?name=ModelThroughput)](../../../../_code/samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosModelConfigurationSample.cs.md)

To configure provisioned throughput for a container call [Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasAutoscaleThroughput*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasAutoscaleThroughput*) or [Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasManualThroughput*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.HasManualThroughput*). For example:

<!--
modelBuilder.Entity<Family>(
    entityTypeBuilder =>
    {
        entityTypeBuilder.HasManualThroughput(5000);
        entityTypeBuilder.HasAutoscaleThroughput(3000);
    });
-->
[EntityTypeThroughput (complete source file; reference: ../../../../samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosModelConfigurationSample.cs?name=EntityTypeThroughput)](../../../../_code/samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosModelConfigurationSample.cs.md)

## Time-to-live

Entity types in the Azure Cosmos DB model can be configured with a default time-to-live. For example:

```csharp
modelBuilder.Entity<Hamlet>().HasDefaultTimeToLive(3600);
```

Or, for the analytical store:

```csharp
modelBuilder.Entity<Hamlet>().HasAnalyticalStoreTimeToLive(3600);
```

Time-to-live for individual entities can be set using a property mapped to "ttl" in the JSON document. For example:

<!--
            modelBuilder.Entity<Village>()
                .HasDefaultTimeToLive(3600)
                .Property(e => e.TimeToLive)
                .ToJsonProperty("ttl");
-->
[TimeToLiveProperty (complete source file; reference: ../../../../samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosModelConfigurationSample.cs?name=TimeToLiveProperty)](../../../../_code/samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosModelConfigurationSample.cs.md)

> **Note:**
> A default time-to-live must configured on the entity type for the "ttl" to have any effect. See [*Time to Live (TTL) in Azure Cosmos DB*](https://learn.microsoft.com/azure/cosmos-db/time-to-live) for more information.

The time-to-live property is then set before the entity is saved. For example:

<!--
        var village = new Village { Id = "DN41", Name = "Healing", TimeToLive = 60 };
        context.Add(village);
        await context.SaveChangesAsync();
-->
[SetTtl (complete source file; reference: ../../../../samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosModelConfigurationSample.cs?name=SetTtl)](../../../../_code/samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosModelConfigurationSample.cs.md)

The time-to-live property can be a [shadow property](../../modeling/shadow-properties.md) to avoid polluting the domain entity with database concerns. For example:

<!--
            modelBuilder.Entity<Hamlet>()
                .HasDefaultTimeToLive(3600)
                .Property<int>("TimeToLive")
                .ToJsonProperty("ttl");
-->
[TimeToLiveShadowProperty (complete source file; reference: ../../../../samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosModelConfigurationSample.cs?name=TimeToLiveShadowProperty)](../../../../_code/samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosModelConfigurationSample.cs.md)

The shadow time-to-live property is then set by [accessing the tracked entity](../../change-tracking/entity-entries.md). For example:

<!--
        var hamlet = new Hamlet { Id = "DN37", Name = "Irby" };
        context.Add(hamlet);
        context.Entry(hamlet).Property("TimeToLive").CurrentValue = 60;
        await context.SaveChangesAsync();
-->
[SetTtlShadow (complete source file; reference: ../../../../samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosModelConfigurationSample.cs?name=SetTtlShadow)](../../../../_code/samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosModelConfigurationSample.cs.md)

## Embedded entities

> **Note:**
> Related entity types are configured as owned by default. To prevent this for a specific entity type call [Microsoft.EntityFrameworkCore.ModelBuilder.Entity*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ModelBuilder.Entity*).

For Azure Cosmos DB, owned entities are embedded in the same item as the owner. To change a property name use [ToJsonProperty](https://learn.microsoft.com/dotnet/api/Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.ToJsonProperty):

[PropertyNames (complete source file; reference: ../../../../samples/core/Cosmos/ModelBuilding/OrderContext.cs?name=PropertyNames)](../../../../_code/samples/core/Cosmos/ModelBuilding/OrderContext.cs.md)

With this configuration the order from the example above is stored like this:

```json
{
    "Id": 1,
    "PartitionKey": "1",
    "TrackingNumber": null,
    "id": "1",
    "Address": {
        "ShipsToCity": "London",
        "ShipsToStreet": "221 B Baker St"
    },
    "_rid": "6QEKAM+BOOABAAAAAAAAAA==",
    "_self": "dbs/6QEKAA==/colls/6QEKAM+BOOA=/docs/6QEKAM+BOOABAAAAAAAAAA==/",
    "_etag": "\"00000000-0000-0000-683c-692e763901d5\"",
    "_attachments": "attachments/",
    "_ts": 1568163674
}
```

Collections of owned entities are embedded as well. For the next example we'll use the `Distributor` class with a collection of `StreetAddress`:

[Distributor (complete source file; reference: ../../../../samples/core/Cosmos/ModelBuilding/Distributor.cs?name=Distributor)](../../../../_code/samples/core/Cosmos/ModelBuilding/Distributor.cs.md)

The owned entities don't need to provide explicit key values to be stored:

[OwnedCollection (complete source file; reference: ../../../../samples/core/Cosmos/ModelBuilding/Sample.cs?name=OwnedCollection)](../../../../_code/samples/core/Cosmos/ModelBuilding/Sample.cs.md)

They will be persisted in this way:

```json
{
    "Id": 1,
    "Discriminator": "Distributor",
    "id": "Distributor|1",
    "ShippingCenters": [
        {
            "City": "Phoenix",
            "Street": "500 S 48th Street"
        },
        {
            "City": "Anaheim",
            "Street": "5650 Dolly Ave"
        }
    ],
    "_rid": "6QEKANzISj0BAAAAAAAAAA==",
    "_self": "dbs/6QEKAA==/colls/6QEKANzISj0=/docs/6QEKANzISj0BAAAAAAAAAA==/",
    "_etag": "\"00000000-0000-0000-683c-7b2b439701d5\"",
    "_attachments": "attachments/",
    "_ts": 1568163705
}
```

Internally EF Core always needs to have unique key values for all tracked entities. The primary key created by default for collections of owned types consists of the foreign key properties pointing to the owner and an `int` property corresponding to the index in the JSON array. To retrieve these values entry API could be used:

[ImpliedProperties (complete source file; reference: ../../../../samples/core/Cosmos/ModelBuilding/Sample.cs?name=ImpliedProperties)](../../../../_code/samples/core/Cosmos/ModelBuilding/Sample.cs.md)

> **Tip:**
> When necessary the default primary key for the owned entity types can be changed, but then key values should be provided explicitly.

### Collections of primitive types

Collections of supported primitive types, such as `string` and `int`, are discovered and mapped automatically. Supported collections are all types that implement [System.Collections.Generic.IReadOnlyList`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IReadOnlyList%601) or [System.Collections.Generic.IReadOnlyDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IReadOnlyDictionary%602). For example, consider this entity type:

<!--
public class Book
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public IList<string> Quotes { get; set; }
    public IDictionary<string, string> Notes { get; set; }
}
-->
[BookEntity (complete source file; reference: ../../../../samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosPrimitiveTypesSample.cs?name=BookEntity)](../../../../_code/samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosPrimitiveTypesSample.cs.md)

The `IList` and the `IDictionary` can be populated and persisted to the database:

<!--
using var context = new BooksContext();

var book = new Book
{
    Title = "How It Works: Incredible History",
    Quotes = new List<string>
    {
        "Thomas (Tommy) Flowers was the British engineer behind the design of the Colossus computer.",
        "Invented originally for Guinness, plastic widgets are nitrogen-filled spheres.",
        "For 20 years after its introduction in 1979, the Walkman dominated the personal stereo market."
    },
    Notes = new Dictionary<string, string>
    {
        { "121", "Fridges" },
        { "144", "Peter Higgs" },
        { "48", "Saint Mark's Basilica" },
        { "36", "The Terracotta Army" }
    }
};

context.Add(book);
context.SaveChanges();
-->
[Insert (complete source file; reference: ../../../../samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosPrimitiveTypesSample.cs?name=Insert)](../../../../_code/samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosPrimitiveTypesSample.cs.md)

This results in the following JSON document:

```json
{
    "Id": "0b32283e-22a8-4103-bb4f-6052604868bd",
    "Discriminator": "Book",
    "Notes": {
        "36": "The Terracotta Army",
        "48": "Saint Mark's Basilica",
        "121": "Fridges",
        "144": "Peter Higgs"
    },
    "Quotes": [
        "Thomas (Tommy) Flowers was the British engineer behind the design of the Colossus computer.",
        "Invented originally for Guinness, plastic widgets are nitrogen-filled spheres.",
        "For 20 years after its introduction in 1979, the Walkman dominated the personal stereo market."
    ],
    "Title": "How It Works: Incredible History",
    "id": "Book|0b32283e-22a8-4103-bb4f-6052604868bd",
    "_rid": "t-E3AIxaencBAAAAAAAAAA==",
    "_self": "dbs/t-E3AA==/colls/t-E3AIxaenc=/docs/t-E3AIxaencBAAAAAAAAAA==/",
    "_etag": "\"00000000-0000-0000-9b50-fc769dc901d7\"",
    "_attachments": "attachments/",
    "_ts": 1630075016
}
```

These collections can then be updated, again in the normal way:

<!--
book.Quotes.Add("Pressing the emergency button lowered the rods again.");
book.Notes["48"] = "Chiesa d'Oro";

context.SaveChanges();
-->
[Updates (complete source file; reference: ../../../../samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosPrimitiveTypesSample.cs?name=Updates)](../../../../_code/samples/core/Miscellaneous/NewInEFCore6.Cosmos/CosmosPrimitiveTypesSample.cs.md)

Limitations:

* Only dictionaries with string keys are supported.
* Support for querying into primitive collections was added in EF Core 9.0.

## Optimistic concurrency with eTags

To configure an entity type to use [optimistic concurrency](../../saving/concurrency.md) call [Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.UseETagConcurrency*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.CosmosEntityTypeBuilderExtensions.UseETagConcurrency*). This call will create an `_etag` property in [shadow state](../../modeling/shadow-properties.md) and set it as the concurrency token.

[Main (complete source file; reference: ../../../../samples/core/Cosmos/ModelBuilding/OrderContext.cs?name=ETag)](../../../../_code/samples/core/Cosmos/ModelBuilding/OrderContext.cs.md)

To make it easier to resolve concurrency errors you can map the eTag to a CLR property using [Microsoft.EntityFrameworkCore.CosmosPropertyBuilderExtensions.IsETagConcurrency*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.CosmosPropertyBuilderExtensions.IsETagConcurrency*).

[Main (complete source file; reference: ../../../../samples/core/Cosmos/ModelBuilding/OrderContext.cs?name=ETagProperty)](../../../../_code/samples/core/Cosmos/ModelBuilding/OrderContext.cs.md)

## Database triggers

> **Note:**
> Database trigger execution support was introduced in EF Core 10.0.

Azure Cosmos DB supports pre- and post-triggers that run before or after database operations. EF Core can be configured to execute these triggers when performing save operations.

> **Important:**
> Triggers are executed server-side by Azure Cosmos DB when EF Core performs operations, but they are not enforced - operations can be performed without running triggers if accessing the database directly. This means triggers should not be used for security-related functionality such as authentication or auditing, as they can be bypassed by applications that access the database directly without using EF Core.

To configure triggers on an entity type, use the `HasTrigger` method:

[TriggerConfiguration (complete source file; reference: ../../../../samples/core/Cosmos/ModelBuilding/TriggerSample.cs?name=TriggerConfiguration)](../../../../_code/samples/core/Cosmos/ModelBuilding/TriggerSample.cs.md)

The `HasTrigger` method requires:

* **modelName**: The name of the trigger in Azure Cosmos DB
* **triggerType**: Either `TriggerType.Pre` (executed before the operation) or `TriggerType.Post` (executed after the operation)
* **triggerOperation**: The operation that should execute the trigger - `Create`, `Replace`, `Delete`, or `All`

Before triggers can be executed, they must be created in Azure Cosmos DB using the Cosmos SDK or Azure portal. The trigger name configured in EF Core must match the trigger name in Azure Cosmos DB.
