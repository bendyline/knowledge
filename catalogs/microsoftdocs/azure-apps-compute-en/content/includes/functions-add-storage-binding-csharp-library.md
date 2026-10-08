---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 06/15/2022
ms.author: glenga
ms.custom: devdivchpfy22
---

In a C# project, the bindings are defined as binding attributes on the function method. Specific definitions depend on whether your app runs in-process (C# class library) or in an isolated worker process.

# [Isolated worker model](#tab/isolated-process)

Open the *HttpExample.cs* project file and add the following `MultiResponse` class:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-isolated/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-storage-binding-csharp-library.md)

The `MultiResponse` class allows you to write to a storage queue named `outqueue` and an HTTP success message. Multiple messages could be sent to the queue because the `QueueOutput` attribute is applied to a string array.

The `Connection` property sets the connection string for the storage account. In this case, you could omit `Connection` because you're already using the default storage account.

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Open the *HttpExample.cs* project file and add the following parameter to the `Run` method definition:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-cli/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-storage-binding-csharp-library.md)

The `msg` parameter is an `ICollector<T>` type, representing a collection of messages written to an output binding when the function completes. In this case, the output is a storage queue named `outqueue`. The `StorageAccountAttribute` sets the connection string for the storage account. This attribute indicates the setting that contains the storage account connection string and can be applied at the class, method, or parameter level. In this case, you could omit `StorageAccountAttribute` because you're already using the default storage account.

The Run method definition must now look like the following code:  

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-cli/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-storage-binding-csharp-library.md)

---
