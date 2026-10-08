---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 06/10/2022
ms.author: glenga
ms.custom: devdivchpfy22
---
**Applies to: programming-language-csharp**


Except for HTTP and timer triggers, bindings are implemented as extension packages. Run the following [dotnet add package](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-package) command in the Terminal window to add the Storage extension package to your project.

# [Isolated process](#tab/isolated-process)
```bash
dotnet add package Microsoft.Azure.Functions.Worker.Extensions.Storage.Queues --prerelease
```
# [In-process](#tab/in-process) 
```bash
dotnet add package Microsoft.Azure.WebJobs.Extensions.Storage 
```
---
Now, you can add the storage output binding to your project.
