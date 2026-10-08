---
title: "Breaking change: CA2247: Argument to TaskCompletionSource constructor should be TaskCreationOptions value"
description: Learn about the breaking change in .NET 5 caused by the enablement of code analysis rule CA2247.
ms.date: 09/03/2020
---
# Warning CA2247: Argument to TaskCompletionSource constructor should be TaskCreationOptions value

.NET code analyzer rule [CA2247](https://learn.microsoft.com/visualstudio/code-quality/ca2247) is enabled, by default, starting in .NET 5. It produces a build warning for calls to the [System.Threading.Tasks.TaskCompletionSource`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%601) constructor that pass an argument of type [System.Threading.Tasks.TaskContinuationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions).

## Change description

Starting in .NET 5, the .NET SDK includes [.NET source code analyzers](../../../../fundamentals/code-analysis/overview.md). Several of these rules are enabled, by default, including [CA2247](https://learn.microsoft.com/visualstudio/code-quality/ca2247). If your project contains code that violates this rule and is configured to treat warnings as errors, this change could break your build.

Rule CA2247 finds calls to the [System.Threading.Tasks.TaskCompletionSource`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%601) constructor that pass an argument of type [System.Threading.Tasks.TaskContinuationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions). The [System.Threading.Tasks.TaskCompletionSource`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%601) type has a constructor that accepts a [System.Threading.Tasks.TaskCreationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions) value, and another constructor that accepts an [System.Object](https://learn.microsoft.com/search/?terms=System.Object). If you accidentally pass a [System.Threading.Tasks.TaskContinuationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions) value instead of a [System.Threading.Tasks.TaskCreationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions) value, the constructor with the [System.Object](https://learn.microsoft.com/search/?terms=System.Object) parameter is called at runtime. Your code will compile and run but won't have the intended behavior.

## Version introduced

5.0

## Recommended action

- Replace the [System.Threading.Tasks.TaskContinuationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions) argument with the corresponding [System.Threading.Tasks.TaskCreationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions) value. Do not suppress this warning, since it almost always highlights a bug in your code. For more information, see [CA2247](https://learn.microsoft.com/visualstudio/code-quality/ca2247).

- To disable code analysis completely, set `EnableNETAnalyzers` to `false` in your project file. For more information, see [EnableNETAnalyzers](../../../project-sdk/msbuild-props.md#enablenetanalyzers).

## Affected APIs

- [System.Threading.Tasks.TaskCompletionSource`1.%23ctor(System.Object)](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%601.%2523ctor(System.Object))

<!--

### Affected APIs

- ``M:System.Threading.Tasks.TaskCompletionSource`1.#ctor(System.Object)``

### Category

Code analysis

-->
