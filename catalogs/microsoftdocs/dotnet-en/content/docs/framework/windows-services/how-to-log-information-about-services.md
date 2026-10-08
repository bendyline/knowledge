---
title: "How to: Log Information About Services"
description: Know how to log information about services. Set the AutoLog property if you want your Windows Service project to interact with the Application event log.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "AutoLog property"
  - "services, logging information"
  - "Windows Service applications, logging information about"
  - "event logs, service applications"
  - "application event logs, service applications"
  - "logs, service applications"
ms.assetid: c0d8140f-c055-4d8e-a2e0-37358a550116
---
# How to: Log Information About Services


> **Note:**
> This article doesn't apply to hosted services in .NET. For the latest content on Windows services using [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService) and the Worker Service template, see:
>
> - [Worker services in .NET](../../core/extensions/workers.md)
> - [Create a Windows service using `BackgroundService`](../../core/extensions/windows-service.md)


By default, all Windows Service projects have the ability to interact with the Application event log and write information and exceptions to it. You use the [System.ServiceProcess.ServiceBase.AutoLog](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.AutoLog) property to indicate whether you want this functionality in your application. By default, logging is turned on for any service you create with the Windows Service project template. You can use a static form of the [System.Diagnostics.EventLog](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog) class to write service information to a log without having to create an instance of an [System.Diagnostics.EventLog](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog) component or manually register a source.

 The installer for your service automatically registers each service in your project as a valid source of events with the Application log on the computer where the service is installed, when logging is turned on. The service logs information each time the service is started, stopped, paused, resumed, installed, or uninstalled. It also logs any failures that occur. You do not need to write any code to write entries to the log when using the default behavior; the service handles this for you automatically.

 If you want to write to an event log other than the Application log, you must set the [System.ServiceProcess.ServiceBase.AutoLog](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.AutoLog) property to `false`, create your own custom event log within your services code, and register your service as a valid source of entries for that log. You must then write code to record entries to the log whenever an action you're interested in occurs.

> **Note:**
> If you use a custom event log and configure your service application to write to it, you must not attempt to access the event log before setting the service's [System.ServiceProcess.ServiceBase.ServiceName](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.ServiceName) property in your code. The event log needs this property's value to register your service as a valid source of events.

## To enable default event logging for your service

- Set the [System.ServiceProcess.ServiceBase.AutoLog](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.AutoLog) property for your component to `true`.

    > **Note:**
    > By default, this property is set to `true`. You do not need to set this explicitly unless you are building more complex processing, such as evaluating a condition and then setting the [System.ServiceProcess.ServiceBase.AutoLog](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.AutoLog) property based on the result of that condition.

## To disable event logging for your service

- Set the [System.ServiceProcess.ServiceBase.AutoLog](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.AutoLog) property for your component to `false`.

     [VbRadconService#17 (complete source file; reference: ./snippets/MyNewService/csharp/MyNewService.cs#17)](../../../_code/docs/framework/windows-services/snippets/MyNewService/csharp/MyNewService.cs.md)
     [VbRadconService#17 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb#17)](../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb.md)

## To set up logging to a custom log

1. Set the [System.ServiceProcess.ServiceBase.AutoLog](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.AutoLog) property to `false`.

    > **Note:**
    > You must set [System.ServiceProcess.ServiceBase.AutoLog*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.AutoLog*) to false in order to use a custom log.

2. Set up an instance of an [System.Diagnostics.EventLog](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog) component in your Windows Service application.

3. Create a custom log by calling the [System.Diagnostics.EventLog.CreateEventSource*](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog.CreateEventSource*) method and specifying the source string and the name of the log file you want to create.

4. Set the [System.Diagnostics.EventLog.Source](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog.Source) property on the [System.Diagnostics.EventLog](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog) component instance to the source string you created in step 3.

5. Write your entries by accessing the [System.Diagnostics.EventLog.WriteEntry*](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog.WriteEntry*) method on the [System.Diagnostics.EventLog](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog) component instance.

     The following code shows how to set up logging to a custom log.

    > **Note:**
    > In this code example, an instance of an [System.Diagnostics.EventLog](https://learn.microsoft.com/search/?terms=System.Diagnostics.EventLog) component is named `eventLog1` (`EventLog1` in Visual Basic). If you created an instance with another name in step 2, change the code accordingly.

     [VbRadconService#14 (complete source file; reference: ./snippets/MyNewService/csharp/MyNewService.cs#14)](../../../_code/docs/framework/windows-services/snippets/MyNewService/csharp/MyNewService.cs.md)
     [VbRadconService#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb.md)
    [VbRadconService#15 (complete source file; reference: ./snippets/MyNewService/csharp/MyNewService.cs#15)](../../../_code/docs/framework/windows-services/snippets/MyNewService/csharp/MyNewService.cs.md)
    [VbRadconService#15 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb#15)](../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb.md)

## See also

- [Introduction to Windows Service Applications](introduction-to-windows-service-applications.md)
