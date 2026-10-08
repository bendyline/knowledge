---
title: "How to: Create User-Defined Exceptions"
description: Learn how to create user-defined exceptions, which are an alternative to the hierarchy of exception classes derived from the Exception base class in .NET.
ms.date: "08/10/2022"
ms.custom: devdivchpfy22
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "user-defined exceptions"
  - "exceptions, examples"
  - "exceptions, user-defined"
---
# How to create user-defined exceptions

.NET provides a hierarchy of exception classes ultimately derived from the [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) base class. However, if none of the predefined exceptions meet your needs, you can create your own exception class by deriving from the [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) class.

When creating your own exceptions, end the class name of the user-defined exception with the word "Exception", and implement the three common constructors, as shown in the following example. The example defines a new exception class named `EmployeeListNotFoundException`. The class is derived from the [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) base class and includes three constructors.
[dg_exceptionDesign#14 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/dg_exceptionDesign/cs/example2.cs#14)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/dg_exceptionDesign/cs/example2.cs.md)
[dg_exceptionDesign#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/dg_exceptionDesign/vb/example2.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/dg_exceptionDesign/vb/example2.vb.md)

> **Note:**
> In situations where you're using remoting, you must ensure that the metadata for any user-defined exceptions is available at the server (callee) and to the client (the proxy object or caller). For more information, see [Best practices for exceptions](best-practices-for-exceptions.md).

## See also

- [Exceptions](index.md)
