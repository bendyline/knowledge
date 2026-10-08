---
description: "Learn more about: complex type"
title: "complex type"
ms.date: "03/30/2017"
ms.assetid: 63efbd23-11d4-4871-bc88-ad01b9837553
---
# complex type

A *complex type* is a template for defining rich, structured properties on [entity types](entity-type.md) or on other complex types. Each template contains the following:  
  
- A unique name. (Required)  
  
    > **Note:**
    > The name of a complex type cannot be the same as an entity type name within the same namespace.  
  
- Data in the form of one or more [properties](property.md). (Optional.)  
  
    > **Note:**
    > A property of a complex type can be another complex type.  
  
 A complex type is similar to an entity type in that a complex type can carry a data payload in the form of primitive type properties or other complex types. However, there are some key differences between complex types and entity types:  
  
- Complex types do not have identities and therefore cannot exist independently. Complex types can only exist as properties on entity types or other complex types.  
  
- Complex types cannot participate in [associations](association-type.md). Neither end of an association can be a complex type, and therefore [navigation properties](navigation-property.md) cannot be defined on complex types.  
  
## Example  

 The [ADO.NET Entity Framework](ef/index.md) uses a domain-specific language (DSL) called conceptual schema definition language ([CSDL](https://learn.microsoft.com/ef/ef6/modeling/designer/advanced/edmx/csdl-spec)) to define conceptual models. The following CSDL defines a complex type, Address, with the primitive type properties `StreetAddress`, `City`, `StateOrProvince`, `Country`, and `PostalCode`.  
  
 [Code reference unavailable in this source snapshot: ../../../../samples/snippets/xml/VS_Snippets_Data/edm_example_model/xml/books2.edmx#complextypeexample](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/framework/data/adonet/complex-type.md)  
  
 To define the complex type `Address` (above) as a property on an entity type, you must declare the property type in the entity type definition. The following CSDL declares the `Address` property as a complex type on an entity type (Publisher):  
  
 [Code reference unavailable in this source snapshot: ../../../../samples/snippets/xml/VS_Snippets_Data/edm_example_model/xml/books3.edmx#entitywithcomplextype](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/framework/data/adonet/complex-type.md)  
  
## See also

- [Entity Data Model Key Concepts](entity-data-model-key-concepts.md)
- [Entity Data Model](entity-data-model.md)
