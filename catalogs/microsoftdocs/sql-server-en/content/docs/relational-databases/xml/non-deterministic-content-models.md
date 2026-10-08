---
title: "Non-Deterministic Content Models"
description: View an example of using an XML schema with a non-deterministic content model.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 05/05/2022
ms.service: sql
ms.subservice: xml
ms.topic: concept-article
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "non-deterministic content models"
  - "content models [XML in SQL Server]"
---
# Non-Deterministic content models


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



Non-deterministic content models are accepted in  SQL Server 
 if the occurrence constraints are 0, 1, or unbounded.

Before  SQL Server 2005 (9.x) 
 Service Pack 1 (SP1),  SQL Server 
 rejected XML schemas that had non-deterministic content models.

## Example: Non-deterministic content model rejected

The following example attempts to create an XML schema with a non-deterministic content model. The code fails because it isn't clear whether the `<root>` element should have a sequence of two `<a>` elements or if the `<root>` element should have two sequences, each with an `<a>` element.

```sql
CREATE XML SCHEMA COLLECTION MyCollection AS '
<schema xmlns="http://www.w3.org/2001/XMLSchema">
    <element name="root">
        <complexType>
            <sequence minOccurs="1" maxOccurs="2">
                <element name="a" type="string" minOccurs="1" maxOccurs="2"/>
            </sequence>
        </complexType>
    </element>
</schema>
';
GO
```

The schema can be fixed by moving the occurrence constraint to a unique location. For example, the constraint can be moved to the containing sequence particle:

```xml
<sequence minOccurs="1" maxOccurs="4">
    <element name="a" type="string" minOccurs="1" maxOccurs="1"/>
</sequence>
```

Or the constraint can be moved to the contained element:

```xml
<sequence minOccurs="1" maxOccurs="1">
     <element name="a" type="string" minOccurs="1" maxOccurs="4"/>
</sequence>
```

## Example: Non-deterministic content model accepted

The following schema would be rejected in versions of  SQL Server 
 before  SQL Server 2005 (9.x) 
 SP1.

```sql
CREATE XML SCHEMA COLLECTION MyCollection AS '
<schema xmlns="http://www.w3.org/2001/XMLSchema">
    <element name="root">
        <complexType>
            <sequence minOccurs="0" maxOccurs="unbounded">
                <element name="a" type="string" minOccurs="0" maxOccurs="1"/>
                <element name="b" type="string" minOccurs="1" maxOccurs="unbounded"/>
            </sequence>
        </complexType>
    </element>
</schema>
';
GO
```

## Related content

- [Requirements and limitations for XML schema collections on the server](requirements-and-limitations-for-xml-schema-collections-on-the-server.md)
