---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 02/26/2026
ms.author: glenga
ms.custom: devdivchpfy22
---

# [Isolated worker model](#tab/isolated-process)

Replace the existing `Run` method with the following code:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-isolated/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-storage-binding-csharp-library-code.md)

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Add code that uses the `msg` output binding object to create a queue message. Add this code before the method returns.

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-cli/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-storage-binding-csharp-library-code.md)

At this point, your function must look as follows:

[Code reference unavailable in this source snapshot: ~/functions-docs-csharp/functions-add-output-binding-storage-queue-cli/HttpExample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-storage-binding-csharp-library-code.md)

---
