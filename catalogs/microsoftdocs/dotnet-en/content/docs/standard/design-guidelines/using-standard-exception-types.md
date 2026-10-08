---
title: "Using Standard Exception Types"
description: Read about standard exception types in .NET. Learn about SystemException, ApplicationException, ArgumentException, ComException, and more.
ms.date: "10/22/2008"
helpviewer_keywords:
  - "throwing exceptions, standard types"
  - "catching exceptions"
  - "exceptions, catching"
  - "exceptions, throwing"
ms.assetid: ab22ce03-78f9-4dca-8824-c7ed3bdccc27
---
# Using Standard Exception Types

> **Note:**
> This content is reprinted by permission of Pearson Education, Inc. from *Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition*. That edition was published in 2008, and the book has since been fully revised in the [third edition](https://www.informit.com/store/framework-design-guidelines-conventions-idioms-and-9780135896464). Some of the information on this page may be out-of-date.


This section describes the standard exceptions provided by the Framework and the details of their usage. The list is by no means exhaustive. Please refer to the .NET Framework reference documentation for usage of other Framework exception types.

## Exception and SystemException

 ❌ DO NOT throw [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) or [System.SystemException](https://learn.microsoft.com/search/?terms=System.SystemException).

 ❌ DO NOT catch `System.Exception` or `System.SystemException` in framework code, unless you intend to rethrow.

 ❌ AVOID catching `System.Exception` or `System.SystemException`, except in top-level exception handlers.

## ApplicationException

 ❌ DO NOT throw or derive from [System.ApplicationException](https://learn.microsoft.com/search/?terms=System.ApplicationException).

## InvalidOperationException

 ✔️ DO throw an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) if the object is in an inappropriate state.

## ArgumentException, ArgumentNullException, and ArgumentOutOfRangeException

 ✔️ DO throw [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) or one of its subtypes if bad arguments are passed to a member. Prefer the most derived exception type, if applicable.

 ✔️ DO set the `ParamName` property when throwing one of the subclasses of `ArgumentException`.

 This property represents the name of the parameter that caused the exception to be thrown. Note that the property can be set using one of the constructor overloads.

 ✔️ DO use `value` for the name of the implicit value parameter of property setters.

## NullReferenceException, IndexOutOfRangeException, and AccessViolationException

 ❌ DO NOT allow publicly callable APIs to explicitly or implicitly throw [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException), [System.AccessViolationException](https://learn.microsoft.com/search/?terms=System.AccessViolationException), or [System.IndexOutOfRangeException](https://learn.microsoft.com/search/?terms=System.IndexOutOfRangeException). These exceptions are reserved and thrown by the execution engine and in most cases indicate a bug.

 Do argument checking to avoid throwing these exceptions. Throwing these exceptions exposes implementation details of your method that might change over time.

## StackOverflowException

 ❌ DO NOT explicitly throw [System.StackOverflowException](https://learn.microsoft.com/search/?terms=System.StackOverflowException). The exception should be explicitly thrown only by the CLR.

 ❌ DO NOT catch `StackOverflowException`.

 It is almost impossible to write managed code that remains consistent in the presence of arbitrary stack overflows. The unmanaged parts of the CLR remain consistent by using probes to move stack overflows to well-defined places rather than by backing out from arbitrary stack overflows.

## OutOfMemoryException

 ❌ DO NOT explicitly throw [System.OutOfMemoryException](https://learn.microsoft.com/search/?terms=System.OutOfMemoryException). This exception is to be thrown only by the CLR infrastructure.

## ComException, SEHException, and ExecutionEngineException

 ❌ DO NOT explicitly throw [System.Runtime.InteropServices.COMException](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.COMException),  [System.ExecutionEngineException](https://learn.microsoft.com/search/?terms=System.ExecutionEngineException), and [System.Runtime.InteropServices.SEHException](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.SEHException). These exceptions are to be thrown only by the CLR infrastructure.

 *Portions © 2005, 2009 Microsoft Corporation. All rights reserved.*

 *Reprinted by permission of Pearson Education, Inc. from [Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition](https://www.informit.com/store/framework-design-guidelines-conventions-idioms-and-9780321545619) by Krzysztof Cwalina and Brad Abrams, published Oct 22, 2008 by Addison-Wesley Professional as part of the Microsoft Windows Development Series.*

## See also

- [Framework Design Guidelines](index.md)
- [Design Guidelines for Exceptions](exceptions.md)
