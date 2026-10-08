---
title: "Troubleshooting: Service Application Won't Install"
description: Do troubleshooting if your service application won't install. Make sure the ServiceName property for the service class is set correctly.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "troubleshooting service applications"
  - "services, troubleshooting"
  - "services, debugging"
  - "Windows services, troubleshooting"
  - "troubleshooting NT services"
  - "Windows Service applications, troubleshooting"
ms.assetid: 45c48e2e-b97d-44bc-8896-14f328e0ce33
---
# Troubleshooting: Service Application Won't Install


> **Note:**
> This article doesn't apply to hosted services in .NET. For the latest content on Windows services using [Microsoft.Extensions.Hosting.BackgroundService](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.BackgroundService) and the Worker Service template, see:
>
> - [Worker services in .NET](../../core/extensions/workers.md)
> - [Create a Windows service using `BackgroundService`](../../core/extensions/windows-service.md)


If your service application will not install correctly, check to make sure that the [System.ServiceProcess.ServiceBase.ServiceName](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.ServiceName) property for the service class is set to the same value as is shown in the installer for that service. The value must be the same in both instances in order for your service to install correctly.

> **Note:**
> You can also look at the installation logs to get feedback on the installation process.

 You should also check to determine whether you have another service with the same name already installed. Service names must be unique for installation to succeed.

## See also

- [Introduction to Windows Service Applications](introduction-to-windows-service-applications.md)
