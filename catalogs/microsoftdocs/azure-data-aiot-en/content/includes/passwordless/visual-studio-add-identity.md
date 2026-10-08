---
title: "include file"
description: "include file"
services: storage
author: alexwolfmsft
ms.service: azure-storage
ms.topic: include
ms.date: 10/21/2022
ms.author: alexwolf
ms.custom: include file
---

To use `DefaultAzureCredential`, add the **Azure.Identity** package to your application.

# [Visual Studio](#tab/identity-visual-studio)

1. In **Solution Explorer**, right-click the **Dependencies** node of your project. Select **Manage NuGet Packages**.

1. In the resulting window, search for *Azure.Identity*. Select the appropriate result, and select **Install**.

    A screenshot showing how to add the identity package.

# [.NET CLI](#tab/identity-netcore-cli)

```dotnetcli
dotnet add package Azure.Identity
```

---
