---
title: "Create pre-computed Task objects"
description: "In this article, you'll learn how to create pre-computed tasks."
ms.date: 05/04/2021
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "tasks, creating pre-computed"
ms.assetid: a73eafa2-1f49-4106-a19e-997186029b58
---

# Create pre-computed tasks

In this article, you'll learn how to use the [System.Threading.Tasks.Task.FromResult*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.FromResult*) method to retrieve the results of asynchronous download operations that are held in a cache. The [System.Threading.Tasks.Task.FromResult*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.FromResult*) method returns a finished [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object that holds the provided value as its [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property. This method is useful when you perform an asynchronous operation that returns a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object, and the result of that [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object is already computed.

## Example

The following example downloads strings from the web. It defines the `DownloadStringAsync` method. This method downloads strings from the web asynchronously. This example also uses a [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602) object to cache the results of previous operations. If the input address is held in this cache, `DownloadStringAsync` uses the [System.Threading.Tasks.Task.FromResult*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.FromResult*) method to produce a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object that holds the content at that address. Otherwise, `DownloadStringAsync` downloads the file from the web and adds the result to the cache.

[language="csharp" source="snippets/cs/DownloadCache.cs"::: (complete source file; reference: snippets/cs/DownloadCache.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/DownloadCache.cs.md)
[language="vb" source="snippets/vb/DownloadCache.vb"::: (complete source file; reference: snippets/vb/DownloadCache.vb)](../../../_code/docs/standard/parallel-programming/snippets/vb/DownloadCache.vb.md)

In the preceding example, the first time each url is downloaded, its value is stored in the cache. The [System.Threading.Tasks.Task.FromResult*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.FromResult*) method enables the `DownloadStringAsync` method to create [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) objects that hold these pre-computed results. Subsequent calls to download the string return the cached values, and is much faster.

## See also

- [Task-based asynchronous programming](task-based-asynchronous-programming.md)
