---
description: "Learn more about: How to: Map Inheritance Hierarchies"
title: "How to: Map Inheritance Hierarchies"
ms.date: "03/30/2017"
ms.assetid: b27c779b-9355-4dc7-b95f-7dfd504b6e48
dev_langs:
  - "csharp"
  - "vb"
---
# How to: Map Inheritance Hierarchies

To implement inheritance mapping in LINQ, you must specify the attributes and attribute properties on the root class of the inheritance hierarchy as described in the following steps. Developers using Visual Studio can use the Object Relational Designer to map inheritance hierarchies. See [How to: Configure inheritance by using the O/R Designer](https://learn.microsoft.com/visualstudio/data-tools/how-to-configure-inheritance-by-using-the-o-r-designer).

> **Note:**
> No special attributes or properties are required on the subclasses. Note especially that subclasses do not have the [System.Data.Linq.Mapping.TableAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.TableAttribute) attribute.

### To map an inheritance hierarchy

1. Add the [System.Data.Linq.Mapping.TableAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.TableAttribute) attribute to the root class.

2. Also to the root class, add an [System.Data.Linq.Mapping.InheritanceMappingAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute) attribute for each class in the hierarchy structure.

3. For each [System.Data.Linq.Mapping.InheritanceMappingAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute) attribute, define a [System.Data.Linq.Mapping.InheritanceMappingAttribute.Code](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute.Code) property.

     This property holds a value that appears in the database table in the [System.Data.Linq.Mapping.ColumnAttribute.IsDiscriminator](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.IsDiscriminator) column to indicate which class or subclass this row of data belongs to.

4. For each [System.Data.Linq.Mapping.InheritanceMappingAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute) attribute, also add a [System.Data.Linq.Mapping.InheritanceMappingAttribute.Type](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute.Type) property.

     This property holds a value that specifies which class or subclass the key value signifies.

5. On only one of the [System.Data.Linq.Mapping.InheritanceMappingAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute) attributes, add an [System.Data.Linq.Mapping.InheritanceMappingAttribute.IsDefault](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute.IsDefault) property.

     This property serves to designate a *fallback* mapping when the discriminator value from the database table does not match any [System.Data.Linq.Mapping.InheritanceMappingAttribute.Code*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute.Code*) value in the inheritance mappings.

6. Add an [System.Data.Linq.Mapping.ColumnAttribute.IsDiscriminator](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute.IsDiscriminator) property for a [System.Data.Linq.Mapping.ColumnAttribute](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.ColumnAttribute) attribute.

     This property signifies that this is the column that holds the [System.Data.Linq.Mapping.InheritanceMappingAttribute.Code*](https://learn.microsoft.com/search/?terms=System.Data.Linq.Mapping.InheritanceMappingAttribute.Code*) value.

## Example

> **Note:**
> If you are using Visual Studio, you can use the Object Relational Designer to configure inheritance. See [How to: Configure inheritance by using the O/R Designer](https://learn.microsoft.com/visualstudio/data-tools/how-to-configure-inheritance-by-using-the-o-r-designer)

 In the following code example, `Vehicle` is defined as the root class, and the previous steps have been implemented to describe the hierarchy for LINQ.

 [DLinqCustomize#4 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqCustomize/cs/Program.cs#4)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqCustomize/cs/Program.cs.md)
 [DLinqCustomize#4 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqCustomize/vb/Module1.vb#4)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqCustomize/vb/Module1.vb.md)

## See also

- [Inheritance Support](inheritance-support.md)
- [How to: Customize Entity Classes by Using the Code Editor](how-to-customize-entity-classes-by-using-the-code-editor.md)
