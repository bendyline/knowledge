---
title: "Deploying the .NET Framework"
description: Learn how to deploy .NET for developers who want to install .NET with their applications, and for administrators who want to deploy .NET across a network.
ms.date: "04/26/2021"
helpviewer_keywords:
  - ".NET Framework, deploying"
  - "deployment [.NET Framework]"
ms.assetid: 19df26c5-4008-461d-a7d7-18f4506312d2
---
# Deploying the .NET Framework

> **Note:**
> This article is specific to .NET Framework. It doesn't apply to newer implementations of .NET, including .NET 6 and later versions.


This section of the .NET Framework documentation provides information for developers who want to install the .NET Framework with their applications, and administrators who want to deploy the .NET Framework across a network. It also discusses activation and restart issues associated with deployment, and how to monitor the progress of your .NET Framework installation.


> **Important:**
> .NET Framework content that was previously digitally signed using certificates that use the SHA1 algorithm must be retired in order to support evolving industry standards.
>
> The following versions of .NET Framework are no longer supported as of _April 26, 2022_: 4.5.2, 4.6, and 4.6.1. Security fixes, updates, and technical support for these versions are no longer provided.
>
> If you're using .NET Framework 4.5.2, 4.6, or 4.6.1, update your deployed runtime to a more recent version, such as **.NET Framework 4.6.2** or **.NET Framework 4.8.1**, to continue to receive updates and technical support.
>
> Updated SHA2 signed installers are available for .NET Framework 3.5 SP1, and 4.6.2 through 4.8. For more information, see the [SHA1 retirement plan](https://support.microsoft.com/topic/-net-framework-retiring-sha-1-content-9750f20d-a9ef-4d43-853f-2075f0a9d7da), the [.NET 4.5.2, 4.6, and 4.6.1 lifecycle update blog post](https://devblogs.microsoft.com/dotnet/net-framework-4-5-2-4-6-4-6-1-will-reach-end-of-support-on-april-26-2022/), and the [FAQ](https://support.microsoft.com/topic/-net-framework-4-5-2-4-6-4-6-1-end-of-support-faq-72b7d8ca-3057-4f0c-8404-67305d40cc04).


## In This Section

 [Deployment Guide for Developers](deployment-guide-for-developers.md)
 Explains how developers can install .NET Framework on their users' computers with their applications.

 [Deployment Guide for Administrators](guide-for-administrators.md)
 Explains how a system administrator can deploy the .NET Framework and its system dependencies across a network by using Microsoft Endpoint Configuration Manager.

 [Reducing System Restarts During .NET Framework 4.5 Installations](reducing-system-restarts.md)
 Describes the Restart Manager, which prevents reboots whenever possible, and explains how applications that install the .NET Framework can take advantage of it.

 [How to: Get Progress from the .NET Framework 4.5 Installer](how-to-get-progress-from-the-dotnet-installer.md)
 Describes how to silently launch and track the .NET Framework setup process while showing your own view of the setup progress.

 [.NET Framework Initialization Errors: Managing the User Experience](initialization-errors-managing-the-user-experience.md)
 Explains what happens when a .NET Framework application requires a CLR version that's invalid or not installed on the user's computer, how to resolve these errors, and how to control the error message displayed to the user.

 [How to: Debug CLR Activation Issues](how-to-debug-clr-activation-issues.md)
 Explains how you can view and debug CLR activation logs to resolve issues you may encounter in getting your application to run with the correct version of the CLR.

## See also

- [Development Guide](../development-guide.md)
