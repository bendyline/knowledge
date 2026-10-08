---
description: "Learn more about: Working with Dynamic Objects (Visual Basic)"
title: "Working with Dynamic Objects"
ms.date: 07/20/2015
helpviewer_keywords: 
  - "dynamic objects [Visual Basic]"
ms.assetid: bdee2a00-07ff-46f9-86dd-fdac9b99cc97
---
# Working with Dynamic Objects (Visual Basic)

Dynamic objects provide another way, other than the `Object` type, to late bind to an object at run time. A dynamic object exposes members such as properties and methods at run time by using dynamic interfaces that are defined in the [System.Dynamic](https://learn.microsoft.com/search/?terms=System.Dynamic) namespace. You can use the classes in the [System.Dynamic](https://learn.microsoft.com/search/?terms=System.Dynamic) namespace to create objects that work with data structures that do not match a static type or format. You can also use the dynamic objects that are defined in dynamic languages such as IronPython and IronRuby. For examples that show how to create dynamic objects or use a dynamic object defined in a dynamic language, see [Walkthrough: Creating and Using Dynamic Objects](walkthrough-creating-and-using-dynamic-objects.md), [System.Dynamic.DynamicObject](https://learn.microsoft.com/search/?terms=System.Dynamic.DynamicObject), or [System.Dynamic.ExpandoObject](https://learn.microsoft.com/search/?terms=System.Dynamic.ExpandoObject).  
  
 Visual Basic binds to objects from the dynamic language runtime and dynamic languages such as IronPython and IronRuby by using the [System.Dynamic.IDynamicMetaObjectProvider](https://learn.microsoft.com/search/?terms=System.Dynamic.IDynamicMetaObjectProvider) interface. Examples of classes that implement the `IDynamicMetaObjectProvider` interface are the [System.Dynamic.DynamicObject](https://learn.microsoft.com/search/?terms=System.Dynamic.DynamicObject) and [System.Dynamic.ExpandoObject](https://learn.microsoft.com/search/?terms=System.Dynamic.ExpandoObject) classes.  
  
 If a late-bound call is made to an object that implements the `IDynamicMetaObjectProvider` interface, Visual Basic binds to the dynamic object by using that interface. If a late-bound call is made to an object that does not implement the `IDynamicMetaObjectProvider` interface, or if the call to the `IDynamicMetaObjectProvider` interface fails, Visual Basic binds to the object by using the late-binding capabilities of the Visual Basic runtime.  
  
## See also

- [System.Dynamic.DynamicObject](https://learn.microsoft.com/search/?terms=System.Dynamic.DynamicObject)
- [System.Dynamic.ExpandoObject](https://learn.microsoft.com/search/?terms=System.Dynamic.ExpandoObject)
- [Walkthrough: Creating and Using Dynamic Objects](walkthrough-creating-and-using-dynamic-objects.md)
- [Early and Late Binding](index.md)
