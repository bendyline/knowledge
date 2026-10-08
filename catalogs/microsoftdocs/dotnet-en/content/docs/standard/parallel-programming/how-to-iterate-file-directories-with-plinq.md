---
description: "Learn more about: How to: Iterate File Directories with PLINQ"
title: "How to: Iterate File Directories with PLINQ"
ms.date: "03/30/2017"
helpviewer_keywords:
  - "PLINQ queries, how to iterate directories"
ms.assetid: 354e8ce3-35c4-431c-99ca-7661d1f3901b
---
# How to: Iterate File Directories with PLINQ

This article shows two ways to parallelize operations on file directories. The first query uses the [System.IO.Directory.GetFiles*](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetFiles*) method to populate an array of file names in a directory and all subdirectories. This method can introduce latency at the beginning of the operation, because it doesn't return until the entire array is populated. However, after the array is populated, PLINQ can process it in parallel quickly.

The second query uses the static [System.IO.Directory.EnumerateDirectories*](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateDirectories*) and [System.IO.DirectoryInfo.EnumerateFiles*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.EnumerateFiles*) methods, which begin returning results immediately. This approach can be faster when you're iterating over large directory trees, but the processing time compared to the first example depends on many factors.

> **Note:**
> These examples are intended to demonstrate usage and might not run faster than the equivalent sequential LINQ to Objects query. For more information about speedup, see [Understanding Speedup in PLINQ](understanding-speedup-in-plinq.md).

## GetFiles example

 This example shows how to iterate over file directories in simple scenarios when you have access to all directories in the tree, the file sizes aren't large, and the access times are not significant. This approach involves a period of latency at the beginning while the array of file names is being constructed.

 [PLINQ#33 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqfileiteration.cs#33)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqfileiteration.cs.md)

## EnumerateFiles example

 This example shows how to iterate over file directories in simple scenarios when you have access to all directories in the tree, the file sizes aren't large, and the access times are not significant. This approach begins producing results faster than the previous example.

 [PLINQ#34 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqfileiteration.cs#34)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqfileiteration.cs.md)

 When using [System.IO.Directory.GetFiles*](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetFiles*), be sure that you have sufficient permissions on all directories in the tree. Otherwise, an exception will be thrown and no results will be returned. When using the [System.IO.Directory.EnumerateDirectories*](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateDirectories*) in a PLINQ query, it is problematic to handle I/O exceptions in a graceful way that enables you to continue iterating. If your code must handle I/O or unauthorized access exceptions, then you should consider the approach described in [How to: Iterate File Directories with the Parallel Class](how-to-iterate-file-directories-with-the-parallel-class.md).

 If I/O latency is an issue, for example with file I/O over a network, consider using one of the asynchronous I/O techniques described in [TPL and Traditional .NET Asynchronous Programming](tpl-and-traditional-async-programming.md) and in this [blog post](https://devblogs.microsoft.com/pfxteam/parallel-extensions-and-io/).

## See also

- [Parallel LINQ (PLINQ)](introduction-to-plinq.md)
