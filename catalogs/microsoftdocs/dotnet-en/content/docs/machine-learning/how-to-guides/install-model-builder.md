---
title: How to install Model Builder
description: Learn how to install the ML.NET Model Builder tool
author: luisquintanilla
ms.author: luquinta
ms.date: 07/27/2022
ms.custom: mvc, how-to, mlnet-tooling
ms.topic: how-to
#Customer intent: As a non-developer I want know how to install Model Builder to add machine learning to my .NET application.
---

# How to install ML.NET Model Builder

Learn how to install ML.NET Model Builder to add machine learning to your .NET applications.

## Prerequisites


- The latest [.NET SDK](https://dotnet.microsoft.com/download)
- [Visual Studio Code](https://code.visualstudio.com) editor
- The [C# DevKit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)


## Limitations

- ML.NET Model Builder Extension currently only works on Visual Studio on Windows.

## Install Model Builder

ML.NET Model builder is built into Visual Studio. To enable it:

# [Visual Studio 2022](#tab/visual-studio-2022)

1. Open the Visual Studio Installer.
1. Select **Modify** to modify your current version of Visual Studio.
1. In the Visual Studio Installer, select the **Individual components** tab.
1. From the list of .NET components, **check** the **ML.NET Model Builder** checkbox.

    Enable Model Builder Visual Studio 2022

# [Visual Studio 2019](#tab/visual-studio-2019)

1. Open the Visual Studio Installer.
1. Select **Modify** to modify your current version of Visual Studio.
1. In the Visual Studio Installer, select the **Individual components** tab.
1. From the list of .NET components, **check** the **ML.NET Model Builder (Preview)** checkbox.

    Enable Model Builder Visual Studio 2019

---

## Uninstall Model Builder

ML.NET Model builder is built into Visual Studio. To disable it:

### [Visual Studio 2022](#tab/visual-studio-2022)

1. Open the Visual Studio Installer.
1. Select **Modify** to modify your current version of Visual Studio.
1. In the Visual Studio Installer, select the **Individual components** tab.
1. From the list of .NET components, **uncheck** the **ML.NET Model Builder** checkbox.

    Disable Model Builder Visual Studio 2022

### [Visual Studio 2019](#tab/visual-studio-2019)

1. Open the Visual Studio Installer.
1. Select **Modify** to modify your current version of Visual Studio.
1. In the Visual Studio Installer, select the **Individual components** tab.
1. From the list of .NET components, **uncheck** the **ML.NET Model Builder (Preview)** checkbox.

    Disable Model Builder Visual Studio 2019

---

## Upgrade Model Builder

Model Builder automatically updates when there's a new version.

However, if you'd prefer to manually install the latest version, either download it  from [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=MLNET.ModelBuilder2022) or use the Extensions Manager in Visual Studio. See [how to update a Visual Studio extension](https://learn.microsoft.com/visualstudio/extensibility/how-to-update-a-visual-studio-extension) for more information.
