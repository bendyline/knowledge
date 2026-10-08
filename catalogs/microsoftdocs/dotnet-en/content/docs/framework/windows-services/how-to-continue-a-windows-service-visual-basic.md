---
title: "How to: Continue a Windows Service (Visual Basic)"
description: Read how to use the ServiceController component to continue a Windows service (such as the IIS Admin service) on a local computer with Visual Basic.
ms.date: "03/30/2017"
dev_langs:
  - "vb"
f1_keywords:
  - "ServiceController.Continue"
helpviewer_keywords:
  - "Windows Service applications, pausing"
  - "pausing Windows Service applications"
ms.assetid: e5d13760-4c83-4b0d-abef-39852677cd7a
---
# How to: Continue a Windows Service (Visual Basic)


> **Note:**
> This article doesn't apply to hosted services in .NET. For the latest content on Windows services using [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService) and the Worker Service template, see:
>
> - [Worker services in .NET](../../core/extensions/workers.md)
> - [Create a Windows service using `BackgroundService`](../../core/extensions/windows-service.md)


This example uses the [System.ServiceProcess.ServiceController](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceController) component to continue the IIS Admin service on the local computer.

## Example

 [VbRadconService#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb.md)
[VbRadconService#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb.md)

 This code example is also available as an IntelliSense code snippet. In the code snippet picker, it is located in **Windows Operating System > Windows Services**. For more information, see [Code Snippets](https://learn.microsoft.com/visualstudio/ide/code-snippets).

## Compiling the Code

 This example requires:

- A project reference to System.serviceprocess.dll.

- Access to the members of the [System.ServiceProcess](https://learn.microsoft.com/search/?terms=System.ServiceProcess) namespace. Add an `Imports` statement if you are not fully qualifying member names in your code. For more information, see [Imports Statement (.NET Namespace and Type)](../../visual-basic/language-reference/statements/imports-statement-net-namespace-and-type.md).

## Robust Programming

 The [System.ServiceProcess.ServiceController.MachineName](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceController.MachineName) property of the [System.ServiceProcess.ServiceController](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceController) class is the local computer by default. To reference Windows services on another computer, change the [System.ServiceProcess.ServiceController.MachineName](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceController.MachineName) property to the name of that computer.

 You cannot call the [System.ServiceProcess.ServiceController.Continue*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceController.Continue*) method on a service until the service controller status is [System.ServiceProcess.ServiceControllerStatus.Paused](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceControllerStatus.Paused).

 The following conditions may cause an exception:

- The service cannot be resumed. ([System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException))

- An error occurred when accessing a system API. ([System.ComponentModel.Win32Exception](https://learn.microsoft.com/search/?terms=System.ComponentModel.Win32Exception))

## .NET Framework Security

 Control of services on the computer may be restricted by using the [System.ServiceProcess.ServiceControllerPermissionAccess](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceControllerPermissionAccess) enumeration to set permissions in the [System.ServiceProcess.ServiceControllerPermission](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceControllerPermission) class.

 Access to service information may be restricted by using the [System.Security.Permissions.PermissionState](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PermissionState) enumeration to set permissions in the [System.Security.Permissions.SecurityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermission) class.

## See also

- [System.ServiceProcess.ServiceController](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceController)
- [System.ServiceProcess.ServiceControllerStatus](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceControllerStatus)
- [How to: Pause a Windows Service (Visual Basic)](how-to-pause-a-windows-service-visual-basic.md)
