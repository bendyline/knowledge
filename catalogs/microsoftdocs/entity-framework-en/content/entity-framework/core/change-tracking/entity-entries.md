---
title: Accessing Tracked Entities - EF Core
description: Using EntityEntry, DbContext.Entries, and DbSet.Local to access tracked entities
author: SamMonoRT
ms.date: 12/30/2020
uid: core/change-tracking/entity-entries
---

# Accessing Tracked Entities

There are four main APIs for accessing entities tracked by a [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext):

- [Microsoft.EntityFrameworkCore.DbContext.Entry*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.Entry*) returns an [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry%601) instance for a given entity instance.
- [Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries*) returns [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry%601) instances for all tracked entities, or for all tracked entities of a given type.
- [Microsoft.EntityFrameworkCore.DbContext.Find*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.Find*), [Microsoft.EntityFrameworkCore.DbContext.FindAsync*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.FindAsync*), [Microsoft.EntityFrameworkCore.DbSet`1.Find*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%601.Find*), and [Microsoft.EntityFrameworkCore.DbSet`1.FindAsync*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%601.FindAsync*) find a single entity by primary key, first looking in tracked entities, and then querying the database if needed.
- [Microsoft.EntityFrameworkCore.DbSet`1.Local](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%601.Local) returns actual entities (not EntityEntry instances) for entities of the entity type represented by the DbSet.

Each of these is described in more detail in the sections below.

> **Tip:**
> This document assumes that entity states and the basics of EF Core change tracking are understood. See [Change Tracking in EF Core](index.md) for more information on these topics.

> **Tip:**
> You can run and debug into all the code in this document by [downloading the sample code from GitHub](https://github.com/dotnet/EntityFramework.Docs/tree/main/samples/core/ChangeTracking/AccessingTrackedEntities).

## Using DbContext.Entry and EntityEntry instances

For each tracked entity, Entity Framework Core (EF Core) keeps track of:

- The overall state of the entity. This is one of `Unchanged`, `Modified`, `Added`, or `Deleted`; see [Change Tracking in EF Core](index.md) for more information.
- The relationships between tracked entities. For example, the blog to which a post belongs.
- The "current values" of properties.
- The "original values" of properties, when this information is available. Original values are the property values that existed when entity was queried from the database.
- Which property values have been modified since they were queried.
- Other information about property values, such as whether or not the value is [temporary](https://learn.microsoft.com/search/?terms=core%2Fchange-tracking%2Fmiscellaneous%23temporary-values).

Passing an entity instance to [System.Data.Entity.DbContext.Entry*](https://learn.microsoft.com/search/?terms=System.Data.Entity.DbContext.Entry*) results in an [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry%601) providing access to this information for the given entity. For example:

<!--
        using var context = new BlogsContext();

        var blog = context.Blogs.Single(e => e.Id == 1);
        var entityEntry = context.Entry(blog);

-->
[Using_DbContext_Entry_and_EntityEntry_instances_1 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Using_DbContext_Entry_and_EntityEntry_instances_1)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

The following sections show how to use an EntityEntry to access and manipulate entity state, as well as the state of the entity's properties and navigations.

### Working with the entity

The most common use of [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry%601) is to access the current [Microsoft.EntityFrameworkCore.EntityState](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.EntityState) of an entity. For example:

<!--
        var currentState = context.Entry(blog).State;
        if (currentState == EntityState.Unchanged)
        {
            context.Entry(blog).State = EntityState.Modified;
        }
-->
[Work_with_the_entity_1 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_the_entity_1)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

The Entry method can also be used on entities that are not yet tracked. This _does not start tracking the entity_; the state of the entity is still `Detached`. However, the returned EntityEntry can then be used to change the entity state, at which point the entity will become tracked in the given state. For example, the following code will start tracking a Blog instance as `Added`:

<!--
        var newBlog = new Blog();
        Debug.Assert(context.Entry(newBlog).State == EntityState.Detached);

        context.Entry(newBlog).State = EntityState.Added;
        Debug.Assert(context.Entry(newBlog).State == EntityState.Added);
-->
[Work_with_the_entity_2 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_the_entity_2)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

> **Tip:**
> Unlike in EF6, setting the state of an individual entity will not cause all connected entities to be tracked. This makes setting the state this way a lower-level operation than calling `Add`, `Attach`, or `Update`, which operate on an entire graph of entities.

The following table summarizes ways to use an EntityEntry to work with an entire entity:

| EntityEntry member | Description |
| :--- | --- |
| [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.State](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.State) | Gets and sets the [Microsoft.EntityFrameworkCore.EntityState](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.EntityState) of the entity. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Entity](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Entity) | Gets the entity instance. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Context](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Context) | The [Microsoft.EntityFrameworkCore.DbContext](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext) that is tracking this entity. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Metadata](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Metadata) | [Microsoft.EntityFrameworkCore.Metadata.IEntityType](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Metadata.IEntityType) metadata for the type of entity. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.IsKeySet](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.IsKeySet) | Whether or not the entity has had its key value set. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Reload](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Reload) | Overwrites property values with values read from the database. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.DetectChanges](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.DetectChanges) | Forces detection of changes for this entity only; see [Change Detection and Notifications](change-detection.md). |

### Working with a single property

Several overloads of [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1.Property*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry%601.Property*) allow access to information about an individual property of an entity. For example, using a strongly-typed, fluent-like API:

<!--
            PropertyEntry<Blog, string> propertyEntry = context.Entry(blog).Property(e => e.Name);
-->
[Work_with_a_single_property_1a (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_a_single_property_1a)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

The property name can instead be passed as a string. For example:

<!--
            PropertyEntry<Blog, string> propertyEntry = context.Entry(blog).Property<string>("Name");
-->
[Work_with_a_single_property_1b (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_a_single_property_1b)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

The returned [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry`2](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry%602) can then be used to access information about the property. For example, it can be used to get and set the current value of the property on this entity:

<!--
            string currentValue = context.Entry(blog).Property(e => e.Name).CurrentValue;
            context.Entry(blog).Property(e => e.Name).CurrentValue = "1unicorn2";
-->
[Work_with_a_single_property_1d (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_a_single_property_1d)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

Both of the Property methods used above return a strongly-typed generic [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry`2](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry%602) instance. Using this generic type is preferred because it allows access to property values without [boxing value types](https://learn.microsoft.com/dotnet/csharp/programming-guide/types/boxing-and-unboxing). However, if the type of entity or property is not known at compile-time, then a non-generic [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry) can be obtained instead:

<!--
            var propertyEntry = context.Entry(blog).Property("Name");
-->
[Work_with_a_single_property_1c (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_a_single_property_1c)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

This allows access to property information for any property regardless of its type, at the expense of boxing value types. For example:

<!--
            object blog = context.Blogs.Single(e => e.Id == 1);

            object currentValue = context.Entry(blog).Property("Name").CurrentValue;
            context.Entry(blog).Property("Name").CurrentValue = "1unicorn2";
-->
[Work_with_a_single_property_1e (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_a_single_property_1e)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

The following table summarizes property information exposed by PropertyEntry:

| PropertyEntry member | Description |
| :--- | --- |
| [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry`2.CurrentValue](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry%602.CurrentValue) | Gets and sets the current value of the property. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry`2.OriginalValue](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry%602.OriginalValue) | Gets and sets the original value of the property, if available. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry`2.EntityEntry](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry%602.EntityEntry) | A back reference to the [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry%601) for the entity. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.Metadata](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.Metadata) | [Microsoft.EntityFrameworkCore.Metadata.IProperty](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Metadata.IProperty) metadata for the property. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsModified](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsModified) | Indicates whether this property is marked as modified, and allows this state to be changed. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsTemporary](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsTemporary) | Indicates whether this property is marked as [temporary](https://learn.microsoft.com/search/?terms=core%2Fchange-tracking%2Fmiscellaneous%23temporary-values%23temporary-values), and allows this state to be changed. |

Notes:

- The original value of a property is the value that the property had when the entity was queried from the database. However, original values are not available if the entity was disconnected and then explicitly attached to another DbContext, for example with `Attach` or `Update`. In this case, the original value returned will be the same as the current value.
- [Microsoft.EntityFrameworkCore.DbContext.SaveChanges*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.SaveChanges*) will only update properties marked as modified. Set [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsModified](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsModified) to true to force EF Core to update a given property value, or set it to false to prevent EF Core from updating the property value.
- [Temporary values](miscellaneous.md) are typically generated by EF Core [value generators](../modeling/generated-properties.md). Setting the current value of a property will replace the temporary value with the given value and mark the property as not temporary. Set [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsTemporary](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry.IsTemporary) to true to force a value to be temporary even after it has been explicitly set.

### Working with a single navigation

Several overloads of [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1.Reference*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry%601.Reference*), [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1.Collection*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry%601.Collection*), and [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Navigation*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Navigation*) allow access to information about an individual navigation.

Reference navigations to a single related entity are accessed through the [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1.Reference*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry%601.Reference*) methods. Reference navigations point to the "one" sides of one-to-many relationships, and both sides of one-to-one relationships. For example:

<!--
        ReferenceEntry<Post, Blog> referenceEntry1 = context.Entry(post).Reference(e => e.Blog);
        ReferenceEntry<Post, Blog> referenceEntry2 = context.Entry(post).Reference<Blog>("Blog");
        ReferenceEntry referenceEntry3 = context.Entry(post).Reference("Blog");
-->
[Work_with_a_single_navigation_1 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_a_single_navigation_1)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

Navigations can also be collections of related entities when used for the "many" sides of one-to-many and many-to-many relationships. The [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1.Collection*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry%601.Collection*) methods are used to access collection navigations. For example:

<!--
        CollectionEntry<Blog, Post> collectionEntry1 = context.Entry(blog).Collection(e => e.Posts);
        CollectionEntry<Blog, Post> collectionEntry2 = context.Entry(blog).Collection<Post>("Posts");
        CollectionEntry collectionEntry3 = context.Entry(blog).Collection("Posts");
-->
[Work_with_a_single_navigation_2a (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_a_single_navigation_2a)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

Some operations are common for all navigations. These can be accessed for both reference and collection navigations using the [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Navigation*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Navigation*) method. Note that only non-generic access is available when accessing all navigations together. For example:

<!--
        NavigationEntry navigationEntry = context.Entry(blog).Navigation("Posts");
-->
[Work_with_a_single_navigation_2b (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_a_single_navigation_2b)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

The following table summarizes ways to use [Microsoft.EntityFrameworkCore.ChangeTracking.ReferenceEntry`2](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.ReferenceEntry%602), [Microsoft.EntityFrameworkCore.ChangeTracking.CollectionEntry`2](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.CollectionEntry%602), and [Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry):

| NavigationEntry member | Description |
| :--- | --- |
| [Microsoft.EntityFrameworkCore.ChangeTracking.MemberEntry.CurrentValue](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.MemberEntry.CurrentValue) | Gets and sets the current value of the navigation. This is the entire collection for collection navigations. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry.Metadata](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry.Metadata) | [Microsoft.EntityFrameworkCore.Metadata.INavigationBase](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.Metadata.INavigationBase) metadata for the navigation. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry.IsLoaded](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry.IsLoaded) | Gets or sets a value indicating whether the related entity or collection has been fully loaded from the database. |
| [Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry.Load](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry.Load) | Loads the related entity or collection from the database; see [Explicit Loading of Related Data](../querying/related-data/explicit.md). |
| [Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry.Query](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry.Query) | The query EF Core would use to load this navigation as an `IQueryable` that can be further composed; see [Explicit Loading of Related Data](../querying/related-data/explicit.md). |

### Working with all properties of an entity

[Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Properties](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Properties) returns an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) of [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyEntry) for every property of the entity. This can be used to perform an action for every property of the entity. For example, to set any DateTime property to `DateTime.Now`:

<!--
        foreach (var propertyEntry in context.Entry(blog).Properties)
        {
            if (propertyEntry.Metadata.ClrType == typeof(DateTime))
            {
                propertyEntry.CurrentValue = DateTime.Now;
            }
        }
-->
[Work_with_all_properties_of_an_entity_1 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_all_properties_of_an_entity_1)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

In addition, EntityEntry contains several methods to get and set all property values at the same time. These methods use the [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues) class, which represents a collection of properties and their values. PropertyValues can be obtained for current or original values, or for the values as currently stored in the database. For example:

<!--
        var currentValues = context.Entry(blog).CurrentValues;
        var originalValues = context.Entry(blog).OriginalValues;
        var databaseValues = context.Entry(blog).GetDatabaseValues();
-->
[Work_with_all_properties_of_an_entity_2a (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_all_properties_of_an_entity_2a)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

These PropertyValues objects are not very useful on their own. However, they can be combined to perform common operations needed when manipulating entities. This is useful when working with data transfer objects and when resolving [optimistic concurrency conflicts](../saving/concurrency.md). The following sections show some examples.

#### Setting current or original values from an entity or DTO

The current or original values of an entity can be updated by copying values from another object. For example, consider a `BlogDto` data transfer object (DTO) with the same properties as the entity type:

<!--
public class BlogDto
{
    public int Id { get; set; }
    public string Name { get; set; }
}
-->
[BlogDto (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=BlogDto)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

This can be used to set the current values of a tracked entity using [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues.SetValues*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues.SetValues*):

<!--
        var blogDto = new BlogDto { Id = 1, Name = "1unicorn2" };

        context.Entry(blog).CurrentValues.SetValues(blogDto);
-->
[Work_with_all_properties_of_an_entity_2b (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_all_properties_of_an_entity_2b)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

This technique is sometimes used when updating an entity with values obtained from a service call or a client in an n-tier application. Note that the object used does not have to be of the same type as the entity so long as it has properties whose names match those of the entity. In the example above, an instance of the DTO `BlogDto` is used to set the current values of a tracked `Blog` entity.

Note that properties will only be marked as modified if the value set differs from the current value.

#### Setting current or original values from a dictionary

The previous example set values from an entity or DTO instance. The same behavior is available when property values are stored as name/value pairs in a dictionary. For example:

<!--
        var blogDictionary = new Dictionary<string, object>
        {
            ["Id"] = 1,
            ["Name"] = "1unicorn2"
        };

        context.Entry(blog).CurrentValues.SetValues(blogDictionary);
-->
[Work_with_all_properties_of_an_entity_2d (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_all_properties_of_an_entity_2d)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

#### Setting current or original values from the database

The current or original values of an entity can be updated with the latest values from the database by calling [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.GetDatabaseValues](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.GetDatabaseValues) or [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.GetDatabaseValuesAsync*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.GetDatabaseValuesAsync*) and using the returned object to set current or original values, or both. For example:

<!--
        var databaseValues = context.Entry(blog).GetDatabaseValues();
        context.Entry(blog).CurrentValues.SetValues(databaseValues);
        context.Entry(blog).OriginalValues.SetValues(databaseValues);
-->
[Work_with_all_properties_of_an_entity_2c (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_all_properties_of_an_entity_2c)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

#### Creating a cloned object containing current, original, or database values

The PropertyValues object returned from CurrentValues, OriginalValues, or GetDatabaseValues can be used to create a clone of the entity using [Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues.ToObject](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.PropertyValues.ToObject). For example:

<!--
var clonedBlog = context.Entry(blog).GetDatabaseValues().ToObject();
-->
[Work_with_all_properties_of_an_entity_2e (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_all_properties_of_an_entity_2e)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

Note that `ToObject` returns a new instance that is not tracked by the DbContext. The returned object also does not have any relationships set to other entities.

The cloned object can be useful for resolving issues related to concurrent updates to the database, especially when data binding to objects of a certain type. See [optimistic concurrency](../saving/concurrency.md) for more information.

### Working with all navigations of an entity

[Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Navigations](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Navigations) returns an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) of [Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.NavigationEntry) for every navigation of the entity. [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.References](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.References) and [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Collections](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Collections) do the same thing, but restricted to reference or collection navigations respectively. This can be used to perform an action for every navigation of the entity. For example, to force loading of all related entities:

<!--
        foreach (var navigationEntry in context.Entry(blog).Navigations)
        {
            navigationEntry.Load();
        }
-->
[Work_with_all_navigations_of_an_entity_1 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_all_navigations_of_an_entity_1)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

### Working with all members of an entity

Regular properties and navigation properties have different state and behavior. It is therefore common to process navigations and non-navigations separately, as shown in the sections above. However, sometimes it can be useful to do something with any member of the entity, regardless of whether it is a regular property or navigation. [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Member*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Member*) and [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Members](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.Members) are provided for this purpose. For example:

<!--
        foreach (var memberEntry in context.Entry(blog).Members)
        {
            Console.WriteLine(
                $"Member {memberEntry.Metadata.Name} is of type {memberEntry.Metadata.ClrType.ShortDisplayName()} and has value {memberEntry.CurrentValue}");
        }
-->
[Work_with_all_members_of_an_entity_1 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Work_with_all_members_of_an_entity_1)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

Running this code on a blog from the sample generates the following output:

```output
Member Id is of type int and has value 1
Member Name is of type string and has value .NET Blog
Member Posts is of type IList<Post> and has value System.Collections.Generic.List`1[Post]
```

> **Tip:**
> The [change tracker debug view](debug-views.md) shows information like this. The debug view for the entire change tracker is generated from the individual [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.DebugView](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry.DebugView) of each tracked entity.

## Find and FindAsync

[Microsoft.EntityFrameworkCore.DbContext.Find*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.Find*), [Microsoft.EntityFrameworkCore.DbContext.FindAsync*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.FindAsync*), [Microsoft.EntityFrameworkCore.DbSet`1.Find*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%601.Find*), and [Microsoft.EntityFrameworkCore.DbSet`1.FindAsync*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%601.FindAsync*) are designed for efficient lookup of a single entity when its primary key is known. Find first checks if the entity is already tracked, and if so returns the entity immediately. A database query is only made if the entity is not tracked locally. For example, consider this code that calls Find twice for the same entity:

<!--
        using var context = new BlogsContext();

        Console.WriteLine("First call to Find...");
        var blog1 = context.Blogs.Find(1);

        Console.WriteLine($"...found blog {blog1.Name}");

        Console.WriteLine();
        Console.WriteLine("Second call to Find...");
        var blog2 = context.Blogs.Find(1);
        Debug.Assert(blog1 == blog2);

        Console.WriteLine("...returned the same instance without executing a query.");
-->
[Find_and_FindAsync_1 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Find_and_FindAsync_1)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

The output from this code (including EF Core logging) when using SQLite is:

```output
First call to Find...
info: 12/29/2020 07:45:53.682 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (1ms) [Parameters=[@__p_0='1' (DbType = String)], CommandType='Text', CommandTimeout='30']
      SELECT "b"."Id", "b"."Name"
      FROM "Blogs" AS "b"
      WHERE "b"."Id" = @__p_0
      LIMIT 1
...found blog .NET Blog

Second call to Find...
...returned the same instance without executing a query.
```

Notice that the first call does not find the entity locally and so executes a database query. Conversely, the second call returns the same instance without querying the database because it is already being tracked.

Find returns null if an entity with the given key is not tracked locally and does not exist in the database.

### Composite keys

Find can also be used with composite keys. For example, consider an `OrderLine` entity with a composite key consisting of the order ID and the product ID:

<!--
public class OrderLine
{
    public int OrderId { get; set; }
    public int ProductId { get; set; }

    //...
}
-->
[OrderLine (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=OrderLine)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

The composite key must be configured in [Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*) to define the key parts _and their order_. For example:

<!--
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<OrderLine>()
            .HasKey(e => new { e.OrderId, e.ProductId });
    }
-->
[OnModelCreating (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=OnModelCreating)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

Notice that `OrderId` is the first part of the key and `ProductId` is the second part of the key. This order must be used when passing key values to Find. For example:

<!--
        var orderline = context.OrderLines.Find(orderId, productId);
-->
[Find_and_FindAsync_2 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Find_and_FindAsync_2)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

## Using ChangeTracker.Entries to access all tracked entities

So far we have accessed only a single [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry) at a time. [Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries) returns an EntityEntry for every entity currently tracked by the DbContext. For example:

<!--
        using var context = new BlogsContext();
        var blogs = context.Blogs.Include(e => e.Posts).ToList();

        foreach (var entityEntry in context.ChangeTracker.Entries())
        {
            Console.WriteLine($"Found {entityEntry.Metadata.Name} entity with ID {entityEntry.Property("Id").CurrentValue}");
        }
-->
[Using_ChangeTracker_Entries_to_access_all_tracked_entities_1a (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Using_ChangeTracker_Entries_to_access_all_tracked_entities_1a)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

This code generates the following output:

```output
Found Blog entity with ID 1
Found Post entity with ID 1
Found Post entity with ID 2
```

Notice that entries for both blogs and posts are returned. The results can instead be filtered to a specific entity type using the [Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries%60`1](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries%2560%601) generic overload:

<!--
        foreach (var entityEntry in context.ChangeTracker.Entries<Post>())
        {
            Console.WriteLine(
                $"Found {entityEntry.Metadata.Name} entity with ID {entityEntry.Property(e => e.Id).CurrentValue}");
        }
-->
[Using_ChangeTracker_Entries_to_access_all_tracked_entities_1b (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Using_ChangeTracker_Entries_to_access_all_tracked_entities_1b)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

The output from this code shows that only posts are returned:

```output
Found Post entity with ID 1
Found Post entity with ID 2
```

Also, using the generic overload returns generic [Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry`1](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry%601) instances. This is what allows that fluent-like access to the `Id` property in this example.

The generic type used for filtering does not have to be a mapped entity type; an unmapped base type or interface can be used instead. For example, if all the entity types in the model implement an interface defining their key property:

<!--
public interface IEntityWithKey
{
    int Id { get; set; }
}
-->
[IEntityWithKey (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=IEntityWithKey)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

Then this interface can be used to work with the key of any tracked entity in a strongly-typed manner. For example:

<!--
        foreach (var entityEntry in context.ChangeTracker.Entries<IEntityWithKey>())
        {
            Console.WriteLine(
                $"Found {entityEntry.Metadata.Name} entity with ID {entityEntry.Property(e => e.Id).CurrentValue}");
        }
-->
[Using_ChangeTracker_Entries_to_access_all_tracked_entities_1c (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Using_ChangeTracker_Entries_to_access_all_tracked_entities_1c)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

## Using DbSet.Local to query tracked entities

EF Core queries are always executed on the database, and only return entities that have been saved to the database. [Microsoft.EntityFrameworkCore.DbSet`1.Local](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%601.Local) provides a mechanism to query the DbContext for local, tracked entities.

Since `DbSet.Local` is used to query tracked entities, it is typical to load entities into the DbContext and then work with those loaded entities. This is especially true for data binding, but can also be useful in other situations. For example, in the following code the database is first queried for all blogs and posts. The [Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.Load*](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.Load*) extension method is used to execute this query with the results tracked by the context without being returned directly to the application. (Using `ToList` or similar has the same effect but with the overhead of creating the returned list, which is not needed here.) The example then uses `DbSet.Local` to access the locally tracked entities:

<!--
        using var context = new BlogsContext();

        context.Blogs.Include(e => e.Posts).Load();

        foreach (var blog in context.Blogs.Local)
        {
            Console.WriteLine($"Blog: {blog.Name}");
        }

        foreach (var post in context.Posts.Local)
        {
            Console.WriteLine($"Post: {post.Title}");
        }
-->
[Using_DbSet_Local_to_query_tracked_entities_1 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Using_DbSet_Local_to_query_tracked_entities_1)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

Notice that, unlike [Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.Entries), `DbSet.Local` returns entity instances directly. An EntityEntry can, of course, always be obtained for the returned entity by calling [System.Data.Entity.DbContext.Entry*](https://learn.microsoft.com/search/?terms=System.Data.Entity.DbContext.Entry*).

### The local view

[Microsoft.EntityFrameworkCore.DbSet`1.Local](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%601.Local) returns a view of locally tracked entities that reflects the current [Microsoft.EntityFrameworkCore.EntityState](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.EntityState) of those entities. Specifically, this means that:

- `Added` entities are included. Note that this is not the case for normal EF Core queries, since `Added` entities do not yet exist in the database and so are therefore never returned by a database query.
- `Deleted` entities are excluded. Note that this is again not the case for normal EF Core queries, since `Deleted` entities still exist in the database and so _are_ returned by database queries.

All of this means that `DbSet.Local` is a view over the data that reflects the current conceptual state of the entity graph, with `Added` entities included and `Deleted` entities excluded. This matches what database state is expected to be after SaveChanges is called.

This is typically the ideal view for data binding, since it presents to the user the data as they understand it based on the changes made by the application.

The following code demonstrates this by marking one post as `Deleted` and then adding a new post, marking it as `Added`:

<!--
        using var context = new BlogsContext();

        var posts = context.Posts.Include(e => e.Blog).ToList();

        Console.WriteLine("Local view after loading posts:");

        foreach (var post in context.Posts.Local)
        {
            Console.WriteLine($"  Post: {post.Title}");
        }

        context.Remove(posts[1]);

        context.Add(new Post
        {
            Title = "What’s next for System.Text.Json?",
            Content = ".NET 5.0 was released recently and has come with many...",
            Blog = posts[0].Blog
        });

        Console.WriteLine("Local view after adding and deleting posts:");

        foreach (var post in context.Posts.Local)
        {
            Console.WriteLine($"  Post: {post.Title}");
        }
-->
[Using_DbSet_Local_to_query_tracked_entities_2 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Using_DbSet_Local_to_query_tracked_entities_2)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

The output from this code is:

```output
Local view after loading posts:
  Post: Announcing the Release of EF Core 5.0
  Post: Announcing F# 5
  Post: Announcing .NET 5.0
Local view after adding and deleting posts:
  Post: What’s next for System.Text.Json?
  Post: Announcing the Release of EF Core 5.0
  Post: Announcing .NET 5.0
```

Notice that the deleted post is removed from the local view, and the added post is included.

### Using Local to add and remove entities

[Microsoft.EntityFrameworkCore.DbSet`1.Local](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%601.Local) returns an instance of [Microsoft.EntityFrameworkCore.ChangeTracking.LocalView`1](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.LocalView%601). This is an implementation of [System.Collections.Generic.ICollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.ICollection%601) that generates and responds to notifications when entities are added and removed from the collection. (This is the same concept as [System.Collections.ObjectModel.ObservableCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ObservableCollection%601), but implemented as a projection over existing EF Core change tracking entries, rather than as an independent collection.)

The local view's notifications are hooked into DbContext change tracking such that the local view stays in sync with the DbContext. Specifically:

- Adding a new entity to `DbSet.Local` causes it to be tracked by the DbContext, typically in the `Added` state. (If the entity already has a generated key value, then it is tracked as `Unchanged` instead.)
- Removing an entity from `DbSet.Local` causes it to be marked as `Deleted`.
- An entity that becomes tracked by the DbContext will automatically appear in the `DbSet.Local` collection. For example, executing a query to bring in more entities automatically causes the local view to be updated.
- An entity that is marked as `Deleted` will be removed from the local collection automatically.

This means the local view can be used to manipulate tracked entities simply by adding and removing from the collection. For example, let's modify the previous example code to add and remove posts from the local collection:

<!--
        using var context = new BlogsContext();

        var posts = context.Posts.Include(e => e.Blog).ToList();

        Console.WriteLine("Local view after loading posts:");

        foreach (var post in context.Posts.Local)
        {
            Console.WriteLine($"  Post: {post.Title}");
        }

        context.Posts.Local.Remove(posts[1]);

        context.Posts.Local.Add(new Post
        {
            Title = "What’s next for System.Text.Json?",
            Content = ".NET 5.0 was released recently and has come with many...",
            Blog = posts[0].Blog
        });

        Console.WriteLine("Local view after adding and deleting posts:");

        foreach (var post in context.Posts.Local)
        {
            Console.WriteLine($"  Post: {post.Title}");
        }
-->
[Using_DbSet_Local_to_query_tracked_entities_3 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Using_DbSet_Local_to_query_tracked_entities_3)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

The output remains unchanged from the previous example because changes made to the local view are synced with the DbContext.

### Using the local view for Windows Forms or WPF data binding

[Microsoft.EntityFrameworkCore.DbSet`1.Local](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.DbSet%601.Local) forms the basis for data binding to EF Core entities. However, both Windows Forms and WPF work best when used with the specific type of notifying collection that they expect. The local view supports creating these specific collection types:

- [Microsoft.EntityFrameworkCore.ChangeTracking.LocalView`1.ToObservableCollection](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.LocalView%601.ToObservableCollection) returns an [System.Collections.ObjectModel.ObservableCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.ObservableCollection%601) for WPF data binding.
- [Microsoft.EntityFrameworkCore.ChangeTracking.LocalView`1.ToBindingList](https://learn.microsoft.com/search/?terms=Microsoft.EntityFrameworkCore.ChangeTracking.LocalView%601.ToBindingList) returns a [System.ComponentModel.BindingList`1](https://learn.microsoft.com/search/?terms=System.ComponentModel.BindingList%601) for Windows Forms data binding.

For example:

<!--
        ObservableCollection<Post> observableCollection = context.Posts.Local.ToObservableCollection();
        BindingList<Post> bindingList = context.Posts.Local.ToBindingList();
-->
[Using_DbSet_Local_to_query_tracked_entities_4 (complete source file; reference: ../../../samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs?name=Using_DbSet_Local_to_query_tracked_entities_4)](../../../_code/samples/core/ChangeTracking/AccessingTrackedEntities/Samples.cs.md)

See [Get Started with WPF](../get-started/wpf.md) for more information on WPF data binding with EF Core, and [Get Started with Windows Forms](../get-started/winforms.md) for more information on Windows Forms data binding with EF Core.

> **Tip:**
> The local view for a given DbSet instance is created lazily when first accessed and then cached. LocalView creation itself is fast and it does not use significant memory. However, it does call [DetectChanges](change-detection.md), which can be slow for large numbers of entities. The collections created by `ToObservableCollection` and `ToBindingList` are also created lazily and then cached. Both of these methods create new collections, which can be slow and use a lot of memory when thousands of entities are involved.
