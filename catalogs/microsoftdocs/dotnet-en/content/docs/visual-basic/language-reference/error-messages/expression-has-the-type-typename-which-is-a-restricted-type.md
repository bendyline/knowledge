---
description: "Learn more about: BC31393: Expression has the type '<typename>' which is a restricted type and cannot be used to access members inherited from 'Object' or 'ValueType"
title: "Expression has the type '<typename>' which is a restricted type and cannot be used to access members inherited from 'Object' or 'ValueType'"
ms.date: 07/20/2015
f1_keywords:
  - "bc31393"
  - "vbc31393"
helpviewer_keywords:
  - "BC31393"
ms.assetid: 2963cf3f-c527-4aa7-b67c-ee80b6d23186
---
# BC31393: Expression has the type '\<typename>' which is a restricted type and cannot be used to access members inherited from 'Object' or 'ValueType'

An expression evaluates to a type that cannot be boxed by the common language runtime (CLR) but accesses a member that requires boxing.

 *Boxing* refers to the processing necessary to convert a type to `Object` or, on occasion, to [System.ValueType](https://learn.microsoft.com/search/?terms=System.ValueType). The common language runtime cannot box certain structure types, for example [System.ArgIterator](https://learn.microsoft.com/search/?terms=System.ArgIterator), [System.RuntimeArgumentHandle](https://learn.microsoft.com/search/?terms=System.RuntimeArgumentHandle), and [System.TypedReference](https://learn.microsoft.com/search/?terms=System.TypedReference).

 This expression attempts to use the restricted type to call a method inherited from [System.Object](https://learn.microsoft.com/search/?terms=System.Object) or [System.ValueType](https://learn.microsoft.com/search/?terms=System.ValueType), such as [System.Object.GetHashCode*](https://learn.microsoft.com/search/?terms=System.Object.GetHashCode*) or [System.Object.ToString*](https://learn.microsoft.com/search/?terms=System.Object.ToString*). To access this method, Visual Basic has attempted an implicit boxing conversion that causes this error.

 **Error ID:** BC31393

## To correct this error

1. Locate the expression that evaluates to the cited type.

2. Locate the part of your statement that attempts to call the method inherited from [System.Object](https://learn.microsoft.com/search/?terms=System.Object) or [System.ValueType](https://learn.microsoft.com/search/?terms=System.ValueType).

3. Rewrite the statement to avoid the method call.

## See also

- [Implicit and Explicit Conversions](../../programming-guide/language-features/data-types/implicit-and-explicit-conversions.md)
