---
description: "Learn more about: How to: Map Database Relationships"
title: "How to: Map Database Relationships"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 538def39-8399-46fb-b02d-60ede4e050af
---
# How to: Map database relationships

You can encode as property references in your entity class any data relationships that will always be the same. In the Northwind sample database, for example, because customers typically place orders, there is always a relationship in the model between customers and their orders.

LINQ to SQL
 defines an [System.Data.Linq.Mapping.AssociationAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.AssociationAttribute) attribute to help represent such relationships. This attribute is used together with the [System.Data.Linq.EntitySet`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntitySet%601) and [System.Data.Linq.EntityRef`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntityRef%601) types to represent what would be a foreign key relationship in a database. For more information, see the Association Attribute section of [Attribute-Based Mapping](attribute-based-mapping.md).

> **Note:**
> AssociationAttribute and ColumnAttribute Storage property values are case sensitive. For example, ensure that values used in the attribute for the AssociationAttribute.Storage property match the case for the corresponding property names used elsewhere in the code. This applies to all .NET programming languages, even those which are not typically case sensitive, including Visual Basic. For more information about the Storage property, see [System.Data.Linq.Mapping.DataAttribute.Storage*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.DataAttribute.Storage*).

Most relationships are one-to-many, as in the example later in this topic. You can also represent one-to-one and many-to-many relationships as follows:

- One-to-one: Represent this kind of relationship by including [System.Data.Linq.EntitySet`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntitySet%601) on both sides.

  For example, consider a `Customer`-`SecurityCode` relationship, created so that the customer's security code will not be found in the `Customer` table and can be accessed only by authorized persons.

- Many-to-many: In many-to-many relationships, the primary key of the link table (also named the *junction* table) is often formed by a composite of the foreign keys from the other two tables.

  For example, consider an `Employee`-`Project` many-to-many relationship formed by using link table `EmployeeProject`. LINQ to SQL
 requires that such a relationship be modeled by using three classes: `Employee`, `Project`, and `EmployeeProject`. In this case, changing the relationship between an `Employee` and a `Project` can appear to require an update of the primary key `EmployeeProject`. However, this situation is best modeled as deleting an existing `EmployeeProject` and the creating a new `EmployeeProject`.

  > **Note:**
  > Relationships in relational databases are typically modeled as foreign key values that refer to primary keys in other tables. To navigate between them you explicitly associate the two tables by using a relational *join* operation.
  >
  > Objects in LINQ to SQL
, on the other hand, refer to each other by using property references or collections of references that you navigate by using *dot* notation.

## Example 1

In the following one-to-many example, the `Customer` class has a property that declares the relationship between customers and their orders.  The `Orders` property is of type [System.Data.Linq.EntitySet`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntitySet%601). This type signifies that this relationship is one-to-many (one customer to many orders). The [System.Data.Linq.Mapping.AssociationAttribute.OtherKey](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.AssociationAttribute.OtherKey) property is used to describe how this association is accomplished, namely, by specifying the name of the property in the related class to be compared with this one. In this example, the `CustomerID` property is compared, just as a database *join* would compare that column value.

> **Note:**
> If you are using Visual Studio, you can use the Object Relational Designer to create an association between classes.

[DlinqCustomize#3 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCustomize/cs/Program.cs#3)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCustomize/cs/Program.cs.md)
[DlinqCustomize#3 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCustomize/vb/Module1.vb#3)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCustomize/vb/Module1.vb.md)

## Example 2

You can also reverse the situation. Instead of using the `Customer` class to describe the association between customers and orders, you can use the `Order` class. The `Order` class uses the [System.Data.Linq.EntityRef`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntityRef%601) type to describe the relationship back to the customer, as in the following code example.

> **Note:**
> The [System.Data.Linq.EntityRef`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.EntityRef%601) class supports *deferred loading*. For more information, *see* [Deferred versus Immediate Loading](deferred-versus-immediate-loading.md).

[DLinqCustomize#5 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCustomize/cs/Program.cs#5)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCustomize/cs/Program.cs.md)
[DLinqCustomize#5 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCustomize/vb/Module1.vb#5)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCustomize/vb/Module1.vb.md)

## See also

- [How to: Customize Entity Classes by Using the Code Editor](how-to-customize-entity-classes-by-using-the-code-editor.md)
- [The LINQ to SQL Object Model](the-linq-to-sql-object-model.md)
