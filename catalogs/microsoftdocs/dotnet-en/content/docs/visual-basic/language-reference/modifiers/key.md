---
description: "Learn more about: Key (Visual Basic)"
title: "Key"
ms.date: 07/20/2015
f1_keywords:
  - "vb.AnonymousKey"
helpviewer_keywords:
  - "anonymous types [Visual Basic], key"
  - "Key [Visual Basic]"
  - "Key keyword [Visual Basic]"
ms.assetid: 7697a928-7d14-4430-a72a-c9e96e8d6c11
---
# Key (Visual Basic)

The `Key` keyword enables you to specify behavior for properties of anonymous types. Only properties you designate as key properties participate in tests of equality between anonymous type instances, or calculation of hash code values. The values of key properties cannot be changed.

 You designate a property of an anonymous type as a key property by placing the keyword `Key` in front of its declaration in the initialization list. In the following example, `Airline` and `FlightNo` are key properties, but `Gate` is not.

 [VbVbalrAnonymousTypes#26 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrAnonymousTypes/VB/Class2.vb#26)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrAnonymousTypes/VB/Class2.vb.md)

 When a new anonymous type is created, it inherits directly from [System.Object](https://learn.microsoft.com/search/?terms=System.Object). The compiler overrides three inherited members: [System.Object.Equals*](https://learn.microsoft.com/search/?terms=System.Object.Equals*), [System.Object.GetHashCode*](https://learn.microsoft.com/search/?terms=System.Object.GetHashCode*), and [System.Object.ToString*](https://learn.microsoft.com/search/?terms=System.Object.ToString*). The override code that is produced for [System.Object.Equals*](https://learn.microsoft.com/search/?terms=System.Object.Equals*) and [System.Object.GetHashCode*](https://learn.microsoft.com/search/?terms=System.Object.GetHashCode*) is based on key properties. If there are no key properties in the type, [System.Object.GetHashCode*](https://learn.microsoft.com/search/?terms=System.Object.GetHashCode*) and [System.Object.Equals*](https://learn.microsoft.com/search/?terms=System.Object.Equals*) are not overridden.

## Equality

 Two anonymous type instances are equal if they are instances of the same type and if the values of their key properties are equal. In the following examples, `flight2` is equal to `flight1` from the previous example because they are instances of the same anonymous type and they have matching values for their key properties. However, `flight3` is not equal to `flight1` because it has a different value for a key property, `FlightNo`. Instance `flight4` is not the same type as `flight1` because they designate different properties as key properties.

 [VbVbalrAnonymousTypes#27 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrAnonymousTypes/VB/Class2.vb#27)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrAnonymousTypes/VB/Class2.vb.md)

 If two instances are declared with only non-key properties, identical in name, type, order, and value, the two instances are not equal. An instance without key properties is equal only to itself.

 For more information about the conditions under which two anonymous type instances are instances of the same anonymous type, see [Anonymous Types](../../programming-guide/language-features/objects-and-classes/anonymous-types.md).

## Hash Code Calculation

 Like [System.Object.Equals*](https://learn.microsoft.com/search/?terms=System.Object.Equals*), the hash function that is defined in [System.Object.GetHashCode*](https://learn.microsoft.com/search/?terms=System.Object.GetHashCode*) for an anonymous type is based on the key properties of the type. The following examples show the interaction between key properties and hash code values.

 Instances of an anonymous type that have the same values for all key properties have the same hash code value, even if non-key properties do not have matching values. The following statement returns `True`.

 [VbVbalrAnonymousTypes#37 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrAnonymousTypes/VB/Class2.vb#37)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrAnonymousTypes/VB/Class2.vb.md)

 Instances of an anonymous type that have different values for one or more key properties have different hash code values. The following statement returns `False`.

 [VbVbalrAnonymousTypes#38 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrAnonymousTypes/VB/Class2.vb#38)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrAnonymousTypes/VB/Class2.vb.md)

 Instances of anonymous types that designate different properties as key properties are not instances of the same type. They have different hash code values even when the names and values of all properties are the same. The following statement returns `False`.

 [VbVbalrAnonymousTypes#39 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrAnonymousTypes/VB/Class2.vb#39)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrAnonymousTypes/VB/Class2.vb.md)

## Read-Only Values

 The values of key properties cannot be changed. For example, in `flight1` in the earlier examples, the `Airline` and `FlightNo` fields are read-only, but `Gate` can be changed.

 [VbVbalrAnonymousTypes#28 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrAnonymousTypes/VB/Class2.vb#28)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrAnonymousTypes/VB/Class2.vb.md)

## See also

- [Anonymous Type Definition](../../programming-guide/language-features/objects-and-classes/anonymous-type-definition.md)
- [How to: Infer Property Names and Types in Anonymous Type Declarations](../../programming-guide/language-features/objects-and-classes/how-to-infer-property-names-and-types-in-anonymous-type-declarations.md)
- [Anonymous Types](../../programming-guide/language-features/objects-and-classes/anonymous-types.md)
