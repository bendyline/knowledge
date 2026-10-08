---
description: "Learn more about: Attribute-Based Mapping"
title: "Attribute-Based Mapping"
ms.date: "03/30/2017"
ms.assetid: 6dd89999-f415-4d61-b8c8-237d23d7924e
---
# Attribute-Based Mapping

LINQ to SQL
 maps a SQL Server database to a LINQ to SQL
 object model by either applying attributes or by using an external mapping file. This topic outlines the attribute-based approach.

 In its most elementary form, LINQ to SQL
 maps a database to a [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext), a table to a class, and columns and relationships to properties on those classes. You can also use attributes to map an inheritance hierarchy in your object model. For more information, see [How to: Generate the Object Model in Visual Basic or C#](how-to-generate-the-object-model-in-visual-basic-or-csharp.md).

 Developers using Visual Studio typically perform attribute-based mapping by using the Object Relational Designer. You can also use the SQLMetal command-line tool, or you can hand-code the attributes yourself. For more information, see [How to: Generate the Object Model in Visual Basic or C#](how-to-generate-the-object-model-in-visual-basic-or-csharp.md).

> **Note:**
> You can also map by using an external XML file. For more information, see [External Mapping](external-mapping.md).

 The following sections describe attribute-based mapping in more detail. For more information, see the [System.Data.Linq.Mapping](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping) namespace.

## DatabaseAttribute Attribute

 Use this attribute to specify the default name of the database when a name is not supplied by the connection. This attribute is optional, but if you use it, you must apply the [System.Data.Linq.Mapping.DatabaseAttribute.Name](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.DatabaseAttribute.Name) property, as described in the following table.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| [System.Data.Linq.Mapping.DatabaseAttribute.Name*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.DatabaseAttribute.Name*) | String | See [System.Data.Linq.Mapping.DatabaseAttribute.Name*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.DatabaseAttribute.Name*) | Used with its [System.Data.Linq.Mapping.DatabaseAttribute.Name](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.DatabaseAttribute.Name) property, specifies the name of the database. |

 For more information, see [System.Data.Linq.Mapping.DatabaseAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.DatabaseAttribute).

## TableAttribute Attribute

 Use this attribute to designate a class as an entity class that is associated with a database table or view. LINQ to SQL
 treats classes that have this attribute as persistent classes. The following table describes the [System.Data.Linq.Mapping.TableAttribute.Name](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.TableAttribute.Name) property.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| [System.Data.Linq.Mapping.TableAttribute.Name*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.TableAttribute.Name*) | String | Same string as class name | Designates a class as an entity class associated with a database table. |

 For more information, see [System.Data.Linq.Mapping.TableAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.TableAttribute).

## ColumnAttribute Attribute

 Use this attribute to designate a member of an entity class to represent a column in a database table. You can apply this attribute to any field or property.

 Only those members you identify as columns are retrieved and persisted when LINQ to SQL
 saves changes to the database. Members without this attribute are assumed to be non-persistent and are not submitted for inserts or updates.

 The following table describes properties of this attribute.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| [System.Data.Linq.Mapping.ColumnAttribute.AutoSync*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.AutoSync*) | AutoSync | Never | Instructs the common language runtime (CLR) to retrieve the value after an insert or update operation.<br /><br /> Options: Always, Never, OnUpdate, OnInsert. |
| [System.Data.Linq.Mapping.ColumnAttribute.CanBeNull](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.CanBeNull) | Boolean | `true` | Indicates that a column can contain null values. |
| [System.Data.Linq.Mapping.ColumnAttribute.DbType*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.DbType*) | String | Inferred database column type | Uses database types and modifiers to specify the type of the database column. |
| [System.Data.Linq.Mapping.ColumnAttribute.Expression*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.Expression*) | String | Empty | Defines a computed column in a database. |
| [System.Data.Linq.Mapping.ColumnAttribute.IsDbGenerated](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.IsDbGenerated) | Boolean | `false` | Indicates that a column contains values that the database auto-generates. |
| [System.Data.Linq.Mapping.ColumnAttribute.IsDiscriminator](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.IsDiscriminator) | Boolean | `false` | Indicates that the column contains a discriminator value for a LINQ to SQL |
 | inheritance hierarchy. |
| [System.Data.Linq.Mapping.ColumnAttribute.IsPrimaryKey](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.IsPrimaryKey) | Boolean | `false` | Specifies that this class member represents a column that is or is part of the primary keys of the table. |
| [System.Data.Linq.Mapping.ColumnAttribute.IsVersion](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.IsVersion) | Boolean | `false` | Identifies the column type of the member as a database timestamp or version number. |
| [System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.UpdateCheck) | UpdateCheck | `Always`, unless [System.Data.Linq.Mapping.ColumnAttribute.IsVersion](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.IsVersion) is `true` for a member | Specifies how LINQ to SQL |
 | approaches the detection of optimistic concurrency conflicts. |

 For more information, see [System.Data.Linq.Mapping.ColumnAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute).

> **Note:**
> AssociationAttribute and ColumnAttribute Storage property values are case sensitive. For example, ensure that values used in the attribute for the AssociationAttribute.Storage property match the case for the corresponding property names used elsewhere in the code. This applies to all .NET programming languages, even those which are not typically case sensitive, including Visual Basic. For more information about the Storage property, see [System.Data.Linq.Mapping.DataAttribute.Storage*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.DataAttribute.Storage*).

## AssociationAttribute Attribute

 Use this attribute to designate a property to represent an association in the database, such as a foreign key to primary key relationship. For more information about relationships, see [How to: Map Database Relationships](how-to-map-database-relationships.md).

 The following table describes properties of this attribute.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| [System.Data.Linq.Mapping.AssociationAttribute.DeleteOnNull](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.AssociationAttribute.DeleteOnNull) | Boolean | `false` | When placed on an association whose foreign key members are all non-nullable, deletes the object when the association is set to null. |
| [System.Data.Linq.Mapping.AssociationAttribute.DeleteRule](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.AssociationAttribute.DeleteRule) | String | None | Adds delete behavior to an association. |
| [System.Data.Linq.Mapping.AssociationAttribute.IsForeignKey](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.AssociationAttribute.IsForeignKey) | Boolean | `false` | If true, designates the member as the foreign key in an association representing a database relationship. |
| [System.Data.Linq.Mapping.AssociationAttribute.IsUnique](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.AssociationAttribute.IsUnique) | Boolean | `false` | If true, indicates a uniqueness constraint on the foreign key. |
| [System.Data.Linq.Mapping.AssociationAttribute.OtherKey*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.AssociationAttribute.OtherKey*) | String | ID of the related class | Designates one or more members of the target entity class as key values on the other side of the association. |
| [System.Data.Linq.Mapping.AssociationAttribute.ThisKey*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.AssociationAttribute.ThisKey*) | String | ID of the containing class | Designates members of this entity class to represent the key values on this side of the association. |

 For more information, see [System.Data.Linq.Mapping.AssociationAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.AssociationAttribute).

> **Note:**
> AssociationAttribute and ColumnAttribute Storage property values are case sensitive. For example, ensure that values used in the attribute for the AssociationAttribute.Storage property match the case for the corresponding property names used elsewhere in the code. This applies to all .NET programming languages, even those which are not typically case sensitive, including Visual Basic. For more information about the Storage property, see [System.Data.Linq.Mapping.DataAttribute.Storage*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.DataAttribute.Storage*).

## InheritanceMappingAttribute Attribute

 Use this attribute to map an inheritance hierarchy.

 The following table describes properties of this attribute.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| [System.Data.Linq.Mapping.InheritanceMappingAttribute.Code*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute.Code*) | String | None. Value must be supplied. | Specifies the code value of the discriminator. |
| [System.Data.Linq.Mapping.InheritanceMappingAttribute.IsDefault](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute.IsDefault) | Boolean | `false` | If true, instantiates an object of this type when no discriminator value in the store matches any one of the specified values. |
| [System.Data.Linq.Mapping.InheritanceMappingAttribute.Type*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute.Type*) | Type | None. Value must be supplied. | Specifies the type of the class in the hierarchy. |

 For more information, see [System.Data.Linq.Mapping.InheritanceMappingAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute).

## FunctionAttribute Attribute

 Use this attribute to designate a method as representing a stored procedure or user-defined function in the database.

 The following table describes the properties of this attribute.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| [System.Data.Linq.Mapping.FunctionAttribute.IsComposable](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.FunctionAttribute.IsComposable) | Boolean | `false` | If false, indicates mapping to a stored procedure. If true, indicates mapping to a user-defined function. |
| [System.Data.Linq.Mapping.FunctionAttribute.Name*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.FunctionAttribute.Name*) | String | Same string as name in the database | Specifies the name of the stored procedure or user-defined function. |

 For more information, see [System.Data.Linq.Mapping.FunctionAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.FunctionAttribute).

## ParameterAttribute Attribute

 Use this attribute to map input parameters on stored procedure methods.

 The following table describes properties of this attribute.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| [System.Data.Linq.Mapping.ParameterAttribute.DbType*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ParameterAttribute.DbType*) | String | None | Specifies database type. |
| [System.Data.Linq.Mapping.ParameterAttribute.Name*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ParameterAttribute.Name*) | String | Same string as parameter name in database | Specifies a name for the parameter. |

 For more information, see [System.Data.Linq.Mapping.ParameterAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ParameterAttribute).

## ResultTypeAttribute Attribute

 Use this attribute to specify a result type.

 The following table describes properties of this attribute.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| [System.Data.Linq.Mapping.ResultTypeAttribute.Type*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ResultTypeAttribute.Type*) | Type | (None) | Used on methods mapped to stored procedures that return [System.Data.Linq.IMultipleResults](https://learn.microsoft.com/search/?terms=System.Data.Linq.IMultipleResults). Declares the valid or expected type mappings for the stored procedure. |

 For more information, see [System.Data.Linq.Mapping.ResultTypeAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ResultTypeAttribute).

## DataAttribute Attribute

 Use this attribute to specify names and private storage fields.

 The following table describes properties of this attribute.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| [System.Data.Linq.Mapping.DataAttribute.Name*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.DataAttribute.Name*) | String | Same as name in database | Specifies the name of the table, column, and so on. |
| [System.Data.Linq.Mapping.DataAttribute.Storage*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.DataAttribute.Storage*) | String | Public accessors | Specifies the name of the underlying storage field. |

 For more information, see [System.Data.Linq.Mapping.DataAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.DataAttribute).

## See also

- [Reference](reference.md)
