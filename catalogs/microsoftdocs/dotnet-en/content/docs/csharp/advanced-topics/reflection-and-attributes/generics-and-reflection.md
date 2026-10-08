---
title: "Generics and reflection"
description: Learn to use reflection to obtain information about generic types. View lists of terms and conditions for generic reflection.
ms.date: 03/05/2023
helpviewer_keywords:
  - "generics [C#], reflection"
  - "reflection [C#], generic types"
---
# Generics and reflection

Because the Common Language Runtime (CLR) has access to generic type information at run time, you can use reflection to obtain information about generic types in the same way as for nongeneric types. For more information, see [Generics in the Runtime](../../programming-guide/generics/generics-in-the-run-time.md).

The [System.Reflection.Emit](https://learn.microsoft.com/search/?terms=System.Reflection.Emit) namespace also contains new members that support generics. See [How to: Define a Generic Type with Reflection Emit](../../../fundamentals/reflection/how-to-define-a-generic-type-with-reflection-emit.md).

For a list of the invariant conditions for terms used in generic reflection, see the [System.Type.IsGenericType](https://learn.microsoft.com/search/?terms=System.Type.IsGenericType) property remarks:

- [System.Type.IsGenericType*](https://learn.microsoft.com/search/?terms=System.Type.IsGenericType*): Returns true if a type is generic.
- [System.Type.GetGenericArguments*](https://learn.microsoft.com/search/?terms=System.Type.GetGenericArguments*): Returns an array of `Type` objects that represent the type arguments supplied for a constructed type, or the type parameters of a generic type definition.
- [System.Type.GetGenericTypeDefinition*](https://learn.microsoft.com/search/?terms=System.Type.GetGenericTypeDefinition*): Returns the underlying generic type definition for the current constructed type.
- [System.Type.GetGenericParameterConstraints*](https://learn.microsoft.com/search/?terms=System.Type.GetGenericParameterConstraints*): Returns an array of `Type` objects that represent the constraints on the current generic type parameter.
- [System.Type.ContainsGenericParameters*](https://learn.microsoft.com/search/?terms=System.Type.ContainsGenericParameters*): Returns true if the type or any of its enclosing types or methods contain type parameters for which specific types haven't been supplied.
- [System.Type.GenericParameterAttributes*](https://learn.microsoft.com/search/?terms=System.Type.GenericParameterAttributes*): Gets a combination of `GenericParameterAttributes` flags that describe the special constraints of the current generic type parameter.
- [System.Type.GenericParameterPosition*](https://learn.microsoft.com/search/?terms=System.Type.GenericParameterPosition*): For a `Type` object that represents a type parameter, gets the position of the type parameter in the type parameter list of the generic type definition or generic method definition that declared the type parameter.
- [System.Type.IsGenericParameter*](https://learn.microsoft.com/search/?terms=System.Type.IsGenericParameter*): Gets a value that indicates whether the current `Type` represents a type parameter of a generic type or method definition.
- [System.Type.IsGenericTypeDefinition*](https://learn.microsoft.com/search/?terms=System.Type.IsGenericTypeDefinition*): Gets a value that indicates whether the current [System.Type](https://learn.microsoft.com/search/?terms=System.Type) represents a generic type definition, from which other generic types can be constructed. Returns true if the type represents the definition of a generic type.
- [System.Type.DeclaringMethod*](https://learn.microsoft.com/search/?terms=System.Type.DeclaringMethod*): Returns the generic method that defined the current generic type parameter, or null if the type parameter wasn't defined by a generic method.
- [System.Type.MakeGenericType*](https://learn.microsoft.com/search/?terms=System.Type.MakeGenericType*): Substitutes the elements of an array of types for the type parameters of the current generic type definition, and returns a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object representing the resulting constructed type.

In addition, members of the [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo) class enable run-time information for generic methods. See the [System.Reflection.MethodBase.IsGenericMethod](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBase.IsGenericMethod) property remarks for a list of invariant conditions for terms used to reflect on generic methods:

- [System.Reflection.MethodBase.IsGenericMethod*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBase.IsGenericMethod*): Returns true if a method is generic.
- [System.Reflection.MethodInfo.GetGenericArguments*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo.GetGenericArguments*): Returns an array of Type objects that represent the type arguments of a constructed generic method or the type parameters of a generic method definition.
- [System.Reflection.MethodInfo.GetGenericMethodDefinition*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo.GetGenericMethodDefinition*): Returns the underlying generic method definition for the current constructed method.
- [System.Reflection.MethodBase.ContainsGenericParameters*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBase.ContainsGenericParameters*): Returns true if the method or any of its enclosing types contain any type parameters for which specific types haven't been supplied.
- [System.Reflection.MethodBase.IsGenericMethodDefinition*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodBase.IsGenericMethodDefinition*): Returns true if the current [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo) represents the definition of a generic method.
- [System.Reflection.MethodInfo.MakeGenericMethod*](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo.MakeGenericMethod*): Substitutes the elements of an array of types for the type parameters of the current generic method definition, and returns a [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo) object representing the resulting constructed method.

## See also

- [Generics](../../fundamentals/types/generics.md)
- [Reflection and Generic Types](../../../fundamentals/reflection/reflection-and-generic-types.md)
- [Generics](../../../standard/generics/index.md)
