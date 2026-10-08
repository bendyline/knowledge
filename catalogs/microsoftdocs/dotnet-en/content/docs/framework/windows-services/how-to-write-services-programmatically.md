---
title: "How to: Write Services Programmatically"
description: See how to write services programmatically by setting up the inheritance and other infrastructure elements yourself.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "services, creating"
  - "Windows Service applications, creating"
ms.assetid: 3abbb2ec-78d2-41e6-b9f9-6662d4e2cdc7
---
# How to: Write Services Programmatically


> **Note:**
> This article doesn't apply to hosted services in .NET. For the latest content on Windows services using [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService) and the Worker Service template, see:
>
> - [Worker services in .NET](../../core/extensions/workers.md)
> - [Create a Windows service using `BackgroundService`](../../core/extensions/windows-service.md)


If you choose not to use the Windows Service project template, you can write your own services by setting up the inheritance and other infrastructure elements yourself. When you create a service programmatically, you must perform several steps that the template would otherwise handle for you:

- You must set up your service class to inherit from the [System.ServiceProcess.ServiceBase](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase) class.

- You must create a `Main` method for your service project that defines the services to run and calls the [System.ServiceProcess.ServiceBase.Run*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.Run*) method on them.

- You must override the [System.ServiceProcess.ServiceBase.OnStart*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStart*) and [System.ServiceProcess.ServiceBase.OnStop*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStop*) procedures and fill in any code you want them to run.

### To write a service programmatically

1. Create an empty project and create a reference to the necessary namespaces by following these steps:

    1. In **Solution Explorer**, right-click the **References** node and click **Add Reference**.

    2. On the **.NET Framework** tab, scroll to **System.dll** and click **Select**.

    3. Scroll to **System.ServiceProcess.dll** and click **Select**.

    4. Click **OK**.

2. Add a class and configure it to inherit from [System.ServiceProcess.ServiceBase](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase):

     [VbRadconService#7 (complete source file; reference: ./snippets/MyNewService/csharp/MyNewService.cs#7)](../../../_code/docs/framework/windows-services/snippets/MyNewService/csharp/MyNewService.cs.md)
     [VbRadconService#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb.md)

3. Add the following code to configure your service class:

     [VbRadconService#8 (complete source file; reference: ./snippets/MyNewService/csharp/MyNewService.cs#8)](../../../_code/docs/framework/windows-services/snippets/MyNewService/csharp/MyNewService.cs.md)
     [VbRadconService#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb.md)

4. Create a `Main` method for your class, and use it to define the service your class will contain; `userService1` is the name of the class:

     [VbRadconService#9 (complete source file; reference: ./snippets/MyNewService/csharp/MyNewService.cs#9)](../../../_code/docs/framework/windows-services/snippets/MyNewService/csharp/MyNewService.cs.md)
     [VbRadconService#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb.md)

5. Override the [System.ServiceProcess.ServiceBase.OnStart*](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.OnStart*) method, and define any processing you want to occur when your service is started.

     [VbRadconService#10 (complete source file; reference: ./snippets/MyNewService/csharp/MyNewService.cs#10)](../../../_code/docs/framework/windows-services/snippets/MyNewService/csharp/MyNewService.cs.md)
     [VbRadconService#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.vb.md)

6. Override any other methods you want to define custom processing for, and write code to determine the actions the service should take in each case.

7. Add the necessary installers for your service application. For more information, see [How to: Add Installers to Your Service Application](how-to-add-installers-to-your-service-application.md).

8. Build your project by selecting **Build Solution** from the **Build** menu.

    > **Note:**
    > Do not press F5 to run your project — you cannot run a service project in this way.

9. Create a setup project and the custom actions to install your service. For an example, see [Walkthrough: Creating a Windows Service Application in the Component Designer](walkthrough-creating-a-windows-service-application-in-the-component-designer.md).

10. Install the service. For more information, see [How to: Install and Uninstall Services](how-to-install-and-uninstall-services.md).

## See also

- [Introduction to Windows Service Applications](introduction-to-windows-service-applications.md)
- [How to: Create Windows Services](how-to-create-windows-services.md)
- [How to: Add Installers to Your Service Application](how-to-add-installers-to-your-service-application.md)
- [How to: Log Information About Services](how-to-log-information-about-services.md)
- [Walkthrough: Creating a Windows Service Application in the Component Designer](walkthrough-creating-a-windows-service-application-in-the-component-designer.md)
