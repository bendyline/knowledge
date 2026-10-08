---
title: Overview of CLR Integration
description: SQL Server hosting CLR is called CLR integration. Authoring in managed code can improve performance. SQL Server uses CAS to help secure managed code.
author: rwestMSFT
ms.author: randolphwest
ms.date: 12/27/2024
ms.service: sql
ms.subservice: clr
ms.topic: "reference"
helpviewer_keywords:
  - "common language runtime [SQL Server], about CLR integration"
  - "extended stored procedures [SQL Server], vs. managed code"
  - "objects [CLR integration]"
  - "Transact-SQL vs. managed code"
  - "managed code [SQL Server], vs. Transact-SQL"
  - "managed code [SQL Server], vs. extended stored procedures"
  - "execution at client vs. execution at server [CLR integration]"
---
# CLR integration overview


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





The common language runtime (CLR) is the heart of the  .NET Framework 
 and provides the execution environment for all  .NET Framework 
 code. Code that runs within the CLR is referred to as *managed code*. The CLR provides various functions and services required for program execution, including just-in-time (JIT) compilation, allocating and managing memory, enforcing type safety, exception handling, thread management, and security. For more information, see [.NET Framework development guide](https://learn.microsoft.com/dotnet/framework/development-guide).

> **Note:**  
> For more information about using the new .NET with  SQL Server 
 Language Extensions, see [How to call the .NET runtime in SQL Server Language Extensions](../../language-extensions/how-to/call-c-sharp-from-sql.md).

With the CLR hosted in  SQL Server 
 (called CLR integration), you can author stored procedures, triggers, user-defined functions, user-defined types, and user-defined aggregates in managed code. Because managed code compiles to native code before execution, you can achieve significant performance increases in some scenarios.

## Code access security

In  SQL Server 2016 (13.x) 
 and earlier versions, Code Access Security (CAS) prevented assemblies from performing certain operations.

CLR uses Code Access Security (CAS) in the .NET Framework, which is no longer supported as a security boundary. A CLR assembly created with `PERMISSION_SET = SAFE` might be able to access external system resources, call unmanaged code, and acquire sysadmin privileges. In  SQL Server 2017 (14.x) 
 and later versions, the `sp_configure` option, [clr strict security](../../database-engine/configure-windows/clr-strict-security.md), enhances the security of CLR assemblies. `clr strict security` is enabled by default, and treats `SAFE` and `EXTERNAL_ACCESS` assemblies as if they were marked `UNSAFE`. The `clr strict security` option can be disabled for backward compatibility, but isn't recommended.

We recommend that you sign all assemblies by a certificate or asymmetric key, with a corresponding login that has been granted `UNSAFE ASSEMBLY` permission in the `master` database.  SQL Server 
 administrators can also add assemblies to a list of assemblies, which the Database Engine should trust. For more information, see [sys.sp_add_trusted_assembly](../system-stored-procedures/sys-sp-add-trusted-assembly-transact-sql.md).


## Advantages of CLR integration

 Transact-SQL  is designed for direct data access and manipulation in the database. While  Transact-SQL  excels at data access and management, it's not a full-fledged programming language. For example,  Transact-SQL  doesn't support arrays, collections, for-each loops, bit shifting, or classes. While some of these constructs can be simulated in  Transact-SQL , managed code has integrated support for these constructs. Depending on the scenario, these features can provide a compelling reason to implement certain database functionality in managed code.

 Visual Basic  and  C# 
 offer object-oriented capabilities such as encapsulation, inheritance, and polymorphism. Related code can now be easily organized into classes and namespaces. When you're working with large amounts of server code, these capabilities allow you to more easily organize and maintain your code.

Managed code is better suited than  Transact-SQL  for calculations and complicated execution logic, and features extensive support for many complex tasks, including string handling and regular expressions. With the functionality found in the  .NET Framework 
, you have access to thousands of prebuilt classes and routines. These classes can be easily accessed from any stored procedure, trigger, or user defined function. The base class library (BCL) includes classes that provide functionality for string manipulation, advanced math operations, file access, cryptography, and more.

> **Note:**  
> While many of these classes are available for use from within CLR code in  SQL Server 
, those that aren't appropriate for server-side use (for example, windowing classes), aren't available. For more information, see [Supported .NET Framework libraries](database-objects/supported-net-framework-libraries.md).

One of the benefits of managed code is type safety, or the assurance that code accesses types only in well-defined, permissible ways. Before managed code is executed, the CLR verifies that the code is safe. For example, the code is checked to ensure that no memory is read that wasn't previously written. The CLR can also help ensure that code doesn't manipulate unmanaged memory.

CLR integration offers the potential for improved performance. For information, see [Performance of CLR integration architecture](clr-integration-architecture-performance.md).

## Choose between Transact-SQL and managed code

When you write stored procedures, triggers, and user-defined functions, you must decide whether to use traditional  Transact-SQL , or a  .NET Framework 
 language such as  Visual Basic  or  C# 
. Use  Transact-SQL  when the code mostly performs data access with little or no procedural logic. Use managed code for CPU-intensive functions and procedures that feature complex logic, or when you want to make use of the BCL of the  .NET Framework 
.

### Choose between execution in the server and execution in the client

Another factor in your decision about whether to use  Transact-SQL  or managed code is where you would like your code to reside, the server computer or the client computer. Both  Transact-SQL  and managed code can be run on the server. This places code and data close together, and allows you to take advantage of the processing power of the server. On the other hand, you might wish to avoid placing processor intensive tasks on your database server. Most client computers today are powerful, and you might wish to take advantage of this processing power by placing as much code as possible on the client. Managed code can run on a client computer, while  Transact-SQL  can't.

## Choose between extended stored procedures and managed code

Extended stored procedures can be built to perform functionality not possible with  Transact-SQL  stored procedures. Extended stored procedures can, however, compromise the integrity of the  SQL Server 
 process, while managed code that is verified to be type-safe can't. Further, memory management, scheduling of threads and fibers, and synchronization services are more deeply integrated between the managed code of the CLR and  SQL Server 
. With CLR integration, you have a more secure way than extended stored procedures to write the stored procedures you need to perform tasks not possible in  Transact-SQL . For more information about CLR integration and extended stored procedures, see [Performance of CLR integration architecture](clr-integration-architecture-performance.md).

## Related content

- [.NET Framework installation guide](https://learn.microsoft.com/dotnet/framework/install/)
- [CLR integration architecture - CLR hosted environment](clr-integration-architecture-clr-hosted-environment.md)
- [Data access from CLR database objects](data-access/data-access-from-clr-database-objects.md)
- [Get started with CLR integration](database-objects/getting-started-with-clr-integration.md)
- [How to call the .NET runtime in SQL Server Language Extensions](../../language-extensions/how-to/call-c-sharp-from-sql.md)
