---
description: "Learn more about: How to: Determine Whether Two Objects Are Related (Visual Basic)"
title: "How to: Determine Whether Two Objects Are Related"
ms.date: 07/20/2015
helpviewer_keywords:
  - "inheritance [Visual Basic], Visual Basic objects"
  - "objects [Visual Basic], inheritance"
  - "object variables [Visual Basic], determining relation"
ms.assetid: da002e3f-6616-4bad-a229-f842d06652bb
---
# How to: Determine Whether Two Objects Are Related (Visual Basic)

You can compare two objects to determine the relationship, if any, between the classes from which they are created. The [System.Type.IsInstanceOfType*](https://learn.microsoft.com/search/?terms=System.Type.IsInstanceOfType*) method of the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) class returns `True` if the specified class inherits from the current class, or if the current type is an interface supported by the specified class.

### To determine if one object inherits from another object's class or interface

1. On the object you think might be of the base type, invoke the [System.Object.GetType*](https://learn.microsoft.com/search/?terms=System.Object.GetType*) method.

2. On the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object returned by [System.Object.GetType*](https://learn.microsoft.com/search/?terms=System.Object.GetType*), invoke the [System.Type.IsInstanceOfType*](https://learn.microsoft.com/search/?terms=System.Type.IsInstanceOfType*) method.

3. In the argument list for [System.Type.IsInstanceOfType*](https://learn.microsoft.com/search/?terms=System.Type.IsInstanceOfType*), specify the object you think might be of the derived type.

    [System.Type.IsInstanceOfType*](https://learn.microsoft.com/search/?terms=System.Type.IsInstanceOfType*) returns `True` if its argument type inherits from the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object type.

## Example

 The following example determines whether one object represents a class derived from another object's class.

```vb
Public Class baseClass
End Class
Public Class derivedClass : Inherits baseClass
End Class
Public Class testTheseClasses
    Public Sub seeIfRelated()
        Dim baseObj As Object = New baseClass()
        Dim derivedObj As Object = New derivedClass()
        Dim related As Boolean
        related = baseObj.GetType().IsInstanceOfType(derivedObj)
        MsgBox(CStr(related))
    End Sub
End Class
```

Note the unexpected placement of the two object variables in the call to [System.Type.IsInstanceOfType*](https://learn.microsoft.com/search/?terms=System.Type.IsInstanceOfType*). The supposed base type is used to generate the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) class, and the supposed derived type is passed as an argument to the [System.Type.IsInstanceOfType*](https://learn.microsoft.com/search/?terms=System.Type.IsInstanceOfType*) method.

## See also

- [System.Object.GetType*](https://learn.microsoft.com/search/?terms=System.Object.GetType*)
- [System.Type](https://learn.microsoft.com/search/?terms=System.Type)
- [System.Type.IsInstanceOfType*](https://learn.microsoft.com/search/?terms=System.Type.IsInstanceOfType*)
- [Object Data Type](../../../language-reference/data-types/object-data-type.md)
- [Object Variables](object-variables.md)
- [Object Variable Values](object-variable-values.md)
- [How to: Determine Whether Two Objects Are Identical](how-to-determine-whether-two-objects-are-identical.md)
