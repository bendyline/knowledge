---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 07/16/2024
ms.author: glenga
---

The zip archive you deploy must contain all of the files needed to run your function app. You can manually create a zip archive from the contents of a Functions project folder using built-in .zip compression functionality or non-Microsoft tools.

The archive must include the [host.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-host-json.md) file at the root of the extracted folder. The selected language stack for the function app creates other requirements:

* [.NET (isolated worker model)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/dotnet-isolated-process-guide.md#deployment-payload)
* [.NET (in-process model)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-dotnet-class-library.md#functions-class-library-project)
* [Java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-reference-java.md#folder-structure)
* [JavaScript](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-reference-node.md?tabs=javascript#folder-structure)
* [TypeScript](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-reference-node.md?tabs=typescript#folder-structure)
* [PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-reference-powershell.md#folder-structure)
* [Python](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-reference-python.md#folder-structure)

> **Important:**
> For languages that generate compiled output for deployment, make sure to compress the contents of the output folder you plan to publish and not the entire project folder. When Functions extracts the contents of the zip archive, the `host.json` file must exist in the root of the package.
