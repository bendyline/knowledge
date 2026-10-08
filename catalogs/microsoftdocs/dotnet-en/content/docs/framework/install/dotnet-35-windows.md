---
title: Install .NET Framework 3.5 on Windows 10
description: Learn how to install .NET Framework 3.5 on Windows 10 and Windows Server. .NET Framework 3.5 can run apps that target .NET Framework 1.0 through 3.5.
ms.date: 02/02/2026
ai-usage: ai-assisted
---
# Install .NET Framework 3.5 on Windows 10 and Windows Server


> **Important:**
> .NET Framework 3.5 was released in 2008. Before installing .NET Framework 3.5, try to find an updated version of your software that uses a new version of .NET Framework or .NET.


.NET Framework is software that allows programs to run on your computer. Think of it as an engine that apps need to function—just like a car needs an engine to run, some apps need .NET Framework to work. This article helps you install version 3.5, which is an older version that some apps still require. You might need .NET Framework 3.5 to run an app on Windows or Windows Server. Windows and Windows Server come with .NET Framework 4, which doesn't support apps built with .NET Framework 1.1 through 3.5. To run these apps, install .NET Framework 3.5.

If you're a developer that requires .NET Framework 3.5, see the section [Developers and .NET Framework 3.5](#developers-and-net-framework-35).

> **Tip:**
> You might be able to use a config file to force the app to run on .NET Framework 4. For more information, see [Migration: Retarget or recompile](../migration-guide/migrating-from-the-net-framework-1-1.md#retarget-or-recompile).

## Install .NET Framework 3.5 on demand

You might see the following configuration dialog if you try to run an app that requires an older version of .NET Framework. Depending on your version of Windows, the dialog might be slightly different. Choose **Download and install this feature** to enable .NET Framework 3.5. This option requires an internet connection.


> **Important:**
> .NET Framework 3.5 was released in 2008. Before installing .NET Framework 3.5, try to find an updated version of your software that uses a new version of .NET Framework or .NET.


Screenshot of the .NET Framework installation dialog.

### Why am I getting this pop-up?

.NET Framework is created by Microsoft and provides an environment for running apps. There are different versions available. Many companies develop their apps to run using the .NET Framework, and these apps target a specific version. If you see this pop-up, you're trying to run an app that requires a .NET Framework version that isn't installed on your system.

## Enable .NET Framework 3.5 on Windows Server

Enable .NET Framework 3.5 through the **Add Roles and Features Wizard**.


> **Important:**
> .NET Framework 3.5 was released in 2008. Before installing .NET Framework 3.5, try to find an updated version of your software that uses a new version of .NET Framework or .NET.


1. Press the Start  button on the taskbar.
1. Search for **Add Roles and Features Wizard** and open it.
1. Search for **Windows Features** and open it. The **Turn Windows features on or off** dialog box appears.
1. Navigate through the wizard until you reach **Features**.
1. Select **.NET Framework 3.5 Features** in the list.
1. Select **Install** to start installing .NET Framework 3.5.

The Add Roles and Features Wizard dialog box from Windows Server. .NET Framework 3.5 is selected.

## Enable .NET Framework 3.5 on Windows


> **Caution:**
> If you're using Windows 11 26H1 (build 28000) or later, see [Install .NET Framework 3.5 on Windows 11](dotnet-35-windows-11.md).


1. Press the Start  button on the taskbar.
1. Search for **Windows Features** and open it. The **Turn Windows features on or off** dialog box appears.
1. Select the **.NET Framework 3.5 (includes .NET 2.0 and 3.0)** check box, select **OK**, and reboot your computer if prompted.

Screenshot of the Windows Features dialog box. .NET Framework 3.5 is selected.

You don't need to select the child items for **Windows Communication Foundation (WCF) HTTP Activation** and **Windows Communication Foundation (WCF) Non-HTTP Activation** unless you're a developer or server administrator who requires this functionality.

## Download the offline installer


> **Caution:**
> If you're using Windows 11 26H1 (build 28000) or later, see [Install .NET Framework 3.5 on Windows 11](dotnet-35-windows-11.md).


The .NET Framework 3.5 SP1 offline installer is available for Windows versions **prior to Windows 10 and Windows Server 2016**, such as **Windows 8**. For more information, see [.NET Framework 3.5 SP1 download page](https://dotnet.microsoft.com/download/dotnet-framework/net35-sp1?wt.mc_id=install-docs).


> **Important:**
> .NET Framework 3.5 was released in 2008. Before installing .NET Framework 3.5, try to find an updated version of your software that uses a new version of .NET Framework or .NET.


### Windows 10

Starting with Windows 10 and Windows Server 2016 operating systems, the only supported way of installing .NET Framework 3.5 in an offline mode is by using the original installation media's _cab_ files. For more information, see [Microsoft .NET Framework 3.5 deployment considerations](https://learn.microsoft.com/windows-hardware/manufacture/desktop/microsoft-net-framework-35-deployment-considerations).

## Troubleshoot the installation

During installation, you might encounter error **0x800f0906**, **0x800f0907**, **0x800f081f**, or **0x800F0922**, in which case refer to [.NET Framework 3.5 installation error](https://support.microsoft.com/help/2734782/net-framework-3-5-installation-error-0x800f0906--0x800f081f--0x800f09) to see how to resolve these issues.

If you still can't resolve your installation issue or you don't have an internet connection, you can try installing it using your Windows installation media. For more information, see [Deploy .NET Framework 3.5 by using Deployment Image Servicing and Management (DISM)](https://learn.microsoft.com/windows-hardware/manufacture/desktop/deploy-net-framework-35-by-using-deployment-image-servicing-and-management--dism). If you don't have the installation media, follow the instructions on [Create installation media for Windows](https://support.microsoft.com/help/15088/windows-create-installation-media). For more information about Windows 11 and Windows 10 Features on Demand, see [Features on Demand](https://learn.microsoft.com/windows-hardware/manufacture/desktop/features-on-demand-v2--capabilities).

> **Warning:**
> If you're not relying on Windows Update as the source for installing .NET Framework 3.5, you must ensure to strictly use sources from the same corresponding Windows operating system version. Using sources from a different Windows operating system version will either install a mismatched version of .NET Framework 3.5 or cause the installation to fail, leaving the system in an unsupported and unserviceable state.

## Developers and .NET Framework 3.5


Starting with Windows 11 26H1 (build 28000), .NET Framework 3.5 is only available as a standalone installer. You can't install .NET Framework 3.5 as a Windows component.

- [Download .NET Framework 3.5 for Windows 11 26H1.](https://go.microsoft.com/fwlink/?LinkID=2337635)
- [Download .NET Framework 3.5 Language Pack for Windows 11 26H1.](https://go.microsoft.com/fwlink/?linkid=2347312)

> **Important:**
> These installers **only** work with the version of Windows specified.


For more information about this change to .NET Framework 3.5, see [.NET Framework 3.5 on Windows 11 FAQ](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/framework/install/dotnet-35-windows-11-faq.yml).

Additionally, the optional components that rely on .NET Framework 3.5 have also been removed:

- ASP.NET 3.5
- .NET Extensibility 3.5
- WCF HTTP Activation
- WCF non-HTTP Activation

> **Important:**
> Microsoft strongly recommends you upgrade your application from .NET Framework to modern .NET, such as .NET 10. If you can't move to .NET, upgrade your application to .NET Framework 4.8 or 4.8.1. For more information about upgrading from .NET Framework 3.5, see [.NET Framework 4 migration issues](../migration-guide/net-framework-4-migration-issues.md) and [Overview of porting from .NET Framework to .NET](../../core/porting/framework-overview.md).

If you're a developer that maintains existing software and you need to use .NET Framework 3.5, enable it with the following steps:

1. Install .NET Framework 3.5 on your system using the instructions in this article.
1. Enable **.NET Framework 3.5 Development Tools** in Visual Studio. It's listed in the **Individual Components** page.

## See also

- [Install .NET Framework on Windows and Windows Server](on-windows-and-server.md)
- [Install .NET Framework for developers](guide-for-developers.md)
- [How to: Determine which .NET Framework versions are installed](how-to-determine-which-versions-are-installed.md)
- [Versions and dependencies](versions-and-dependencies.md)
