---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 02/26/2024
ms.author: glenga
---


```json
{
    "version": "2.0",
    "extensionBundle": {
        "id": "Microsoft.Azure.Functions.ExtensionBundle",
        "version": "[4.0.0, 5.0.0)"
    }
}
```

In this example, the `version` value of `[4.0.0, 5.0.0)` instructs the Functions host to use a bundle version that is at least `4.0.0` but less than `5.0.0`, which includes all potential versions of 4.x. This notation effectively maintains your app on the latest available minor version of the v4.x extension bundle. 

The following properties are available in `extensionBundle`:

| Property | Description |
| --- | --- |
| `id` | The namespace for Azure Functions extension bundles. |
| `version` | The version range of the bundle to install. The Azure Functions runtime always chooses the maximum permissible version that the version range or interval defines. For example, a `version` value range of `[4.0.0, 5.0.0)` allows all bundle versions from 4.0.0 up to (but not including) 5.0.0. For more information, see the [interval notation for specifying version ranges](https://learn.microsoft.com/nuget/reference/package-versioning#version-ranges). |

> **Tip:**  
> You might also see the version range defined in your _host.json_ as `[4.*, 5.0.0)`, which is interpreted the same as `[4.0.0, 5.0.0)`.
