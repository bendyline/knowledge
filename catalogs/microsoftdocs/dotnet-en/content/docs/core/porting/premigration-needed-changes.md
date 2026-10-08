---
title: Prerequisites to port from .NET Framework
description: Before porting your code from .NET Framework to .NET, you must use the correct developer environment and update your project files as required.
author: StephenBonikowsky
ms.date: 06/10/2021
---
# Prerequisites to porting code

Make the needed changes to build and run a .NET application before beginning the work to port your code. These changes can be done while still building and running a .NET Framework application.


> **Important:**
> .NET Upgrade Assistant is officially deprecated. Use the [GitHub Copilot modernization chat agent](github-copilot-upgrade/overview.md) instead, which is included with Visual Studio 2026 and Visual Studio 2022 17.14.16 or later. This agent analyzes your projects and dependencies, produces a step-by-step migration plan with targeted recommendations and automated code fixes, and commits each change so you can validate or roll back. It automates common porting tasks—updating project files, replacing deprecated APIs, and resolving build issues—so you can modernize faster with less manual effort.


## Upgrade to required tooling

Upgrade to a version of MSBuild/Visual Studio that supports the version of .NET you want to target. For more information, see [Versioning relationship between the .NET SDK, MSBuild and VS](versioning-sdk-msbuild-vs.md).

## Update .NET Framework target version

We recommend that you target your .NET Framework app to version 4.7.2 or higher. This ensures the availability of the latest API alternatives for cases where .NET Standard doesn't support existing APIs.

For each of the projects you wish to port, do the following in Visual Studio:

01. Right-click on the project and select **Properties**.
01. In the **Target Framework** dropdown, select **.NET Framework 4.7.2**.
01. Recompile the project.

Because your projects now target .NET Framework 4.7.2, use that version of the .NET Framework as your base for porting code.

## Change to PackageReference format

Convert all references to the [PackageReference](https://learn.microsoft.com/nuget/consume-packages/package-references-in-project-files) format.

## Convert to SDK style project format

Convert your projects to the [SDK-style format](../project-sdk/overview.md).

## Update dependencies

Update dependencies to their latest version available, and to .NET Standard version where possible.

## Next steps

- [Create a porting plan](porting-approaches.md)
