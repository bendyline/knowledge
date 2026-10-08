---
title: "Service Application Programming Architecture"
description: Understand service application programming architecture. Windows Service applications are based on a class that inherits from System.ServiceProcess.ServiceBase.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "ServiceController components, programming architecture"
  - "ServiceBase class, service states"
  - "Windows Service applications, code model"
  - "services, programming architecture"
  - "ServiceController class"
  - "services, states"
  - "ServiceProcessInstaller class, service application code model"
  - "Windows Service applications, states"
ms.assetid: 83230026-d068-4174-97ff-e264c896eb2f
---
# Service Application Programming Architecture


> **Note:**
> This article doesn't apply to hosted services in .NET. For the latest content on Windows services using [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService) and the Worker Service template, see:
>
> - [Worker services in .NET](../../core/extensions/workers.md)
> - [Create a Windows service using `BackgroundService`](../../core/extensions/windows-service.md)


Windows Service applications are based on a class that inherits from the [System.ServiceProcess.ServiceBase](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase) class. You override methods from this class and define functionality for them to determine how your service behaves.

 The main classes involved in service creation are:

- [System.ServiceProcess.ServiceBase](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase) — You override methods from the [System.ServiceProcess.ServiceBase](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase) class when creating a service and define the code to determine how your service functions in this inherited class.

- [System.ServiceProcess.ServiceProcessInstaller](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceProcessInstaller) and [System.ServiceProcess.ServiceInstaller](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceInstaller) —You use these classes to install and uninstall your service.

 In addition, a class named [System.ServiceProcess.ServiceController](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceController) can be used to manipulate the service itself. This class is not involved in the creation of a service, but can be used to start and stop the service, pass commands to it, and return a series of enumerations.

## Defining Your Service's Behavior

 In your service class, you override base class functions that determine what happens when the state of your service is changed in the Services Control Manager. The [System.ServiceProcess.ServiceBase](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase) class exposes the following methods, which you can override to add custom behavior.

| Method | Override to |
| --- | --- |
| [System.ServiceProcess.ServiceBase.OnStart*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStart*) | Indicate what actions should be taken when your service starts running. You must write code in this procedure for your service to perform useful work. |
| [System.ServiceProcess.ServiceBase.OnPause*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnPause*) | Indicate what should happen when your service is paused. |
| [System.ServiceProcess.ServiceBase.OnStop*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStop*) | Indicate what should happen when your service stops running. |
| [System.ServiceProcess.ServiceBase.OnContinue*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnContinue*) | Indicate what should happen when your service resumes normal functioning after being paused. |
| [System.ServiceProcess.ServiceBase.OnShutdown*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnShutdown*) | Indicate what should happen just prior to your system shutting down, if your service is running at that time. |
| [System.ServiceProcess.ServiceBase.OnCustomCommand*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnCustomCommand*) | Indicate what should happen when your service receives a custom command. For more information on custom commands, see MSDN online. |
| [System.ServiceProcess.ServiceBase.OnPowerEvent*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnPowerEvent*) | Indicate how the service should respond when a power management event is received, such as a low battery or suspended operation. |

> **Note:**
> These methods represent states that the service moves through in its lifetime; the service transitions from one state to the next. For example, you will never get the service to respond to an [System.ServiceProcess.ServiceBase.OnContinue*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnContinue*) command before [System.ServiceProcess.ServiceBase.OnStart*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStart*) has been called.

 There are several other properties and methods that are of interest. These include:

- The [System.ServiceProcess.ServiceBase.Run*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.Run*) method on the [System.ServiceProcess.ServiceBase](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase) class. This is the main entry point for the service. When you create a service using the Windows Service template, code is inserted in your application's `Main` method to run the service. This code looks like this:

     [VbRadconService#6 (complete source file; reference: ./snippets/MyNewService/csharp/MyNewService.cs#6)](../../../_code/docs/framework/windows-services/snippets/MyNewService/csharp/MyNewService.cs.md)
     [VbRadconService#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb.md)

    > **Note:**
    > These examples use an array of type [System.ServiceProcess.ServiceBase](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase), into which each service your application contains can be added, and then all of the services can be run together. If you are only creating a single service, however, you might choose not to use the array and simply declare a new object inheriting from [System.ServiceProcess.ServiceBase](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase) and then run it. For an example, see [How to: Write Services Programmatically](how-to-write-services-programmatically.md).

- A series of properties on the [System.ServiceProcess.ServiceBase](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase) class. These determine what methods can be called on your service. For example, when the [System.ServiceProcess.ServiceBase.CanStop](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.CanStop) property is set to `true`, the [System.ServiceProcess.ServiceBase.OnStop*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStop*) method on your service can be called. When the [System.ServiceProcess.ServiceBase.CanPauseAndContinue](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.CanPauseAndContinue) property is set to `true`, the [System.ServiceProcess.ServiceBase.OnPause*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnPause*) and [System.ServiceProcess.ServiceBase.OnContinue*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnContinue*) methods can be called. When you set one of these properties to `true`, you should then override and define processing for the associated methods.

    > **Note:**
    > Your service must override at least [System.ServiceProcess.ServiceBase.OnStart*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStart*) and [System.ServiceProcess.ServiceBase.OnStop*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStop*) to be useful.

 You can also use a component called the [System.ServiceProcess.ServiceController](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceController) to communicate with and control the behavior of an existing service.

## See also

- [Introduction to Windows Service Applications](introduction-to-windows-service-applications.md)
- [How to: Create Windows Services](how-to-create-windows-services.md)
