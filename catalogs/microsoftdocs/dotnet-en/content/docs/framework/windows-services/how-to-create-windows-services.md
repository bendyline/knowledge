---
title: "How to: Create Windows Services"
description: Use the Windows Service project template to create a service. Set the ServiceName property, create installers, and override the OnStart and OnStop methods.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "Windows Service applications, creating"
  - "templates, Windows Service"
ms.assetid: 0f5e2cbb-d95d-477c-b2b5-4b990e6b86ff
---
# How to: Create Windows Services


> **Note:**
> This article doesn't apply to hosted services in .NET. For the latest content on Windows services using [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService) and the Worker Service template, see:
>
> - [Worker services in .NET](../../core/extensions/workers.md)
> - [Create a Windows service using `BackgroundService`](../../core/extensions/windows-service.md)


When you create a service, you can use a Visual Studio project template called **Windows Service**. This template automatically does much of the work for you by referencing the appropriate classes and namespaces, setting up the inheritance from the base class for services, and overriding several of the methods you're likely to want to override.

> **Warning:**
> The Windows Services project template is not available in the Express edition of Visual Studio.

 At a minimum, to create a functional service you must:

- Set the [System.ServiceProcess.ServiceBase.ServiceName](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.ServiceName) property.

- Create the necessary installers for your service application.

- Override and specify code for the [System.ServiceProcess.ServiceBase.OnStart*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStart*) and [System.ServiceProcess.ServiceBase.OnStop*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStop*) methods to customize the ways in which your service behaves.

### To create a Windows Service application

1. Create a **Windows Service** project.

    > **Note:**
    > For instructions on writing a service without using the template, see [How to: Write Services Programmatically](how-to-write-services-programmatically.md).

2. In the **Properties** window, set the [System.ServiceProcess.ServiceBase.ServiceName](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.ServiceName) property for your service.

     Set the ServiceName property.

    > **Note:**
    > The value of the [System.ServiceProcess.ServiceBase.ServiceName](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.ServiceName) property must always match the name recorded in the installer classes. If you change this property, you must update the [System.ServiceProcess.ServiceBase.ServiceName](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.ServiceName) property of installer classes as well.

3. Set any of the following properties to determine how your service will function.

    | Property | Setting |
    | --- | --- |
    | [System.ServiceProcess.ServiceBase.CanStop](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.CanStop) | `True` to indicate that the service will accept requests to stop running; `false` to prevent the service from being stopped. |
    | [System.ServiceProcess.ServiceBase.CanShutdown](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.CanShutdown) | `True` to indicate that the service wants to receive notification when the computer on which it lives shuts down, enabling it to call the [System.ServiceProcess.ServiceBase.OnShutdown*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnShutdown*) procedure. |
    | [System.ServiceProcess.ServiceBase.CanPauseAndContinue](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.CanPauseAndContinue) | `True` to indicate that the service will accept requests to pause or to resume running; `false` to prevent the service from being paused and resumed. |
    | [System.ServiceProcess.ServiceBase.CanHandlePowerEvent](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.CanHandlePowerEvent) | `True` to indicate that the service can handle notification of changes to the computer's power status; `false` to prevent the service from being notified of these changes. |
    | [System.ServiceProcess.ServiceBase.AutoLog*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.AutoLog*) | `True` to write informational entries to the Application event log when your service performs an action; `false` to disable this functionality. For more information, see [How to: Log Information About Services](how-to-log-information-about-services.md). **Note:**  By default, [System.ServiceProcess.ServiceBase.AutoLog*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.AutoLog*) is set to `true`. |

    > **Note:**
    > When [System.ServiceProcess.ServiceBase.CanStop](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.CanStop) or [System.ServiceProcess.ServiceBase.CanPauseAndContinue](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.CanPauseAndContinue) are set to `false`, the **Service Control Manager** will disable the corresponding menu options to stop, pause, or continue the service.

4. Access the Code Editor and fill in the processing you want for the [System.ServiceProcess.ServiceBase.OnStart*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStart*) and [System.ServiceProcess.ServiceBase.OnStop*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStop*) procedures.

5. Override any other methods for which you want to define functionality.

6. Add the necessary installers for your service application. For more information, see [How to: Add Installers to Your Service Application](how-to-add-installers-to-your-service-application.md).

7. Build your project by selecting **Build Solution** from the **Build** menu.

    > **Note:**
    > Do not press F5 to run your project — you cannot run a service project in this way.

8. Install the service. For more information, see [How to: Install and Uninstall Services](how-to-install-and-uninstall-services.md).

## See also

- [Introduction to Windows Service Applications](introduction-to-windows-service-applications.md)
- [How to: Write Services Programmatically](how-to-write-services-programmatically.md)
- [How to: Add Installers to Your Service Application](how-to-add-installers-to-your-service-application.md)
- [How to: Log Information About Services](how-to-log-information-about-services.md)
- [How to: Start Services](how-to-start-services.md)
- [How to: Specify the Security Context for Services](how-to-specify-the-security-context-for-services.md)
- [How to: Install and Uninstall Services](how-to-install-and-uninstall-services.md)
- [Walkthrough: Creating a Windows Service Application in the Component Designer](walkthrough-creating-a-windows-service-application-in-the-component-designer.md)
