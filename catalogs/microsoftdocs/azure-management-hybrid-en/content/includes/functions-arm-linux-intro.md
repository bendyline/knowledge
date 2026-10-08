---
author: ggailey777
ms.service: azure-functions
ms.custom: linux-related-content
ms.topic: include
ms.date: 11/01/2023
ms.author: glenga
---

When running the function app on Linux, you must:

+ Set `kind` to `functionapp,linux`.
+ Set `reserved` to `true`. 
+ Set the `linuxFxVersion` property under `siteConfig` to the correct value for your runtime stack in the format of `<runtime>|<runtimeVersion>`. For more information, see the [linuxFxVersion site setting](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-app-settings.md#linuxfxversion) reference.
 
For a list of application settings required when running on Linux, see [Application configuration](#application-configuration).
