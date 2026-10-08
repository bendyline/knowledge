---
title: Develop and Deploy WebJobs Using Visual Studio
description: Learn how to develop Azure WebJobs in Visual Studio and deploy them to Azure App Service, including creating a scheduled task.
author: ggailey777
ms.assetid: a3a9d320-1201-4ac8-9398-b4c9535ba755
ms.topic: how-to
ms.devlang: csharp
ms.custom: devx-track-csharp, vs-azure, devx-track-dotnet
ms.date: 02/10/2026
ms.author: glenga
ms.reviewer: david.ebbo;suwatch;pbatum;naren.soni
ms.service: azure-app-service
---

# Develop and deploy WebJobs using Visual Studio

This article explains how to use Visual Studio to deploy a console app project to a web app in [Azure App Service](overview.md) as an [Azure WebJob](webjobs-create.md). For information about how to deploy WebJobs by using the [Azure portal](https://portal.azure.com), see [Run background tasks with WebJobs in Azure App Service](webjobs-create.md).

You can choose to develop a WebJob that runs as either a [.NET Core app](#webjobs-as-net-core-console-apps) or a [.NET Framework app](#webjobs-as-net-framework-console-apps). Version 3.x of the [Azure WebJobs SDK](webjobs-sdk-how-to.md) lets you develop WebJobs that run as either .NET Core apps or .NET Framework apps, while version 2.x supports only the .NET Framework. The way that you deploy a WebJobs project is different for .NET Core projects than for .NET Framework projects.

You can publish multiple WebJobs to a single web app, if each WebJob in the web app has a unique name.

## WebJobs as .NET Core console apps

With version 3.x of the Azure WebJobs SDK, you can create and publish WebJobs as .NET Core console apps. For step-by-step instructions to create and publish a .NET Core console app to Azure as a WebJob, see [Get started with the Azure WebJobs SDK for event-driven background processing](webjobs-sdk-get-started.md).

> **Note:**
> .NET Core Web Apps and/or .NET Core WebJobs can't be linked with web projects. If you need to deploy your WebJob with a web app, [create your WebJobs as a .NET Framework console app](#webjobs-as-net-framework-console-apps).  

### Deploy to Azure App Service

Publishing a .NET Core WebJob to Azure App Service from Visual Studio uses the same tooling as publishing an ASP.NET Core app.

1. In **Solution Explorer**, right-click the project and select **Publish**.

1. In the **Publish** dialog box, select **Azure** for **Target**, and then select **Next**. 

1. Select **Azure WebJobs** for **Specific target**, and then select **Next**.

1. Above **App Service instances** select the plus (**+**) button to **Create a new Azure WebJob**.

1. In the **App Service (Windows)** dialog box, use the hosting settings in the following table.

    | Setting | Suggested value | Description |
    | --- | --- | --- |
    | **Name** | Globally unique name | Name that uniquely identifies your new function app. |
    | **Subscription** | Choose your subscription | The Azure subscription to use. |
    | **[Resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md)** | myResourceGroup | Name of the resource group in which to create your function app. Choose **New** to create a new resource group. |
    | **[Hosting Plan](overview-hosting-plans.md)** | App Service plan | An [App Service plan](overview-hosting-plans.md) specifies the location, size, and features of the web server farm that hosts your app. You can save money when hosting multiple apps by configuring the web apps to share a single App Service plan. App Service plans define the region, instance size, scale count, and SKU (Free, Shared, Basic, Standard, or Premium). Choose **New** to create a new App Service plan. Free and Basic tiers don't support the Always On option to keep your site running continuously. |

    Create App Service dialog box

1. Select **Create** to create a WebJob and related resources in Azure with these settings and deploy your project code.

1. Select **Finish** to return to the **Publish** page.   

## WebJobs as .NET Framework console apps  

If you use Visual Studio to deploy a WebJobs-enabled .NET Framework console app project, it copies runtime files to the appropriate folder in the web app (*App_Data/jobs/continuous* for continuous WebJobs and *App_Data/jobs/triggered* for scheduled or on-demand WebJobs).

Visual Studio adds the following items to a WebJobs-enabled project:

- The [Microsoft.Web.WebJobs.Publish](https://www.nuget.org/packages/Microsoft.Web.WebJobs.Publish/) NuGet package.
- A [webjob-publish-settings.json](#webjob-publish-settingsjson-file) file that contains deployment and scheduler settings. 

Diagram showing the NuGet package and WebJob publish settings file being added to a console app to enable deployment as a WebJob.

You can add these items to an existing console app project or use a template to create a new WebJobs-enabled console app project. 

Deploy a project as a WebJob by itself, or link it to a web project so that it automatically deploys whenever you deploy the web project. To link projects, Visual Studio includes the name of the WebJobs-enabled project in a [webjobs-list.json](#webjobs-listjson-file) file in the web project.

Diagram showing that a WebJobs project is linked to a web project when its name is included in the webjobs-list.json file.

### Prerequisites

Install Visual Studio 2022 with the [Azure development workload](https://learn.microsoft.com/visualstudio/install/install-visual-studio#step-4---choose-workloads).

### Enable WebJobs deployment for an existing console app project

You have two options:

- [Enable automatic deployment with a web project](#enable-automatic-webjobs-deployment-with-a-web-project).

  Configure an existing console app project so that it automatically deploys as a WebJob when you deploy a web project. Use this option when you want to run your WebJob in the same web app in which you run the related web application.

- [Enable deployment without a web project](#enable-webjobs-deployment-without-a-web-project).

  Configure an existing console app project to deploy as a WebJob by itself, without a link to a web project. Use this option when you want to run a WebJob in a web app by itself, with no web application running in the web app. You might want to do so to scale your WebJob resources independently of your web application resources.

#### Enable automatic WebJobs deployment with a web project

1. Right-click the web project in **Solution Explorer**, and then select **Add** > **Existing Project as Azure WebJob**.
   
    Screenshot showing how to add an existing project as an Azure WebJob.
   
    The [Add Azure WebJob](#add-azure-webjob-dialog-box) dialog box appears.

1. In the **Project name** drop-down list, select the console app project to add as a WebJob.
   
    Screenshot showing how to select a project in the Add Azure WebJob dialog box.

1. Complete the [Add Azure WebJob](#add-azure-webjob-dialog-box) dialog box, and then select **OK**. 

#### Enable WebJobs deployment without a web project

1. Right-click the console app project in **Solution Explorer**, and then select **Publish as Azure WebJob**. 
   
    Screenshot showing how to select Publish as Azure WebJob in the Solution Explorer.
   
    The **Add Azure WebJob** dialog box appears, with the project selected in the **Project name** box.

1. Complete the [Add Azure WebJob](#add-azure-webjob-dialog-box) dialog box, and then select **OK**.
   
   The **Publish Web** wizard appears. If you don't want to publish immediately, close the wizard. The settings that you enter are saved for when you do want to [deploy the project](#deploy-a-webjobs-project).

### Create a new WebJobs-enabled project

To create a new WebJobs-enabled project, use the console app project template and enable WebJobs deployment as explained in [the previous section](#enable-webjobs-deployment-for-an-existing-console-app-project). As an alternative, you can use the WebJobs new-project template:

- [Use the WebJobs new-project template for an independent WebJob](#use-the-webjobs-new-project-template-for-an-independent-webjob)
  
    Create a project and configure it to deploy by itself as a WebJob, with no link to a web project. Use this option when you want to run a WebJob in a web app by itself, with no web application running in the web app. You might want to do so to scale your WebJob resources independently of your web application resources.

- [Use the WebJobs new-project template for a WebJob linked to a web project](#use-the-webjobs-new-project-template-for-a-webjob-linked-to-a-web-project)
  
    Create a project that is configured to deploy automatically as a WebJob when you deploy a web project in the same solution. Use this option when you want to run your WebJob in the same web app in which you run the related web application.

> **Note:**
> The WebJobs new-project template automatically installs NuGet packages and includes code in *Program.cs* for the [WebJobs SDK](webjobs-sdk-get-started.md). If you don't want to use the WebJobs SDK, remove or change the `host.RunAndBlock` statement in *Program.cs*.

#### Use the WebJobs new-project template for an independent WebJob

1. Select **File** > **New** > **Project**. In the **Create a new project** dialog box, search for and select **Azure WebJob (.NET Framework)** for C#.
   
1. Follow the previous directions to [make the console app project an independent WebJobs project](#enable-webjobs-deployment-without-a-web-project).

#### Use the WebJobs new-project template for a WebJob linked to a web project

1. Right-click the web project in **Solution Explorer**, and then select **Add** > **New Azure WebJob Project**.
   
    Screenshot showing how to add a new Azure WebJob project.
   
    The **Add Azure WebJob** dialog box appears.

1. Complete the [Add Azure WebJob](#add-azure-webjob-dialog-box) dialog box, and then select **OK**.


### webjob-publish-settings.json file

When you configure a console app for WebJobs deployment, Visual Studio installs the [Microsoft.Web.WebJobs.Publish](https://www.nuget.org/packages/Microsoft.Web.WebJobs.Publish/) NuGet package and stores scheduling information in a *webjob-publish-settings.json* file in the project *Properties* folder of the WebJobs project. Here's an example of that file:

```json
{
  "$schema": "http://schemastore.org/schemas/json/webjob-publish-settings.json",
  "webJobName": "WebJob1",
  "startTime": "null",
  "endTime": "null",
  "jobRecurrenceFrequency": "null",
  "interval": null,
  "runMode": "Continuous"
}
```

You can edit this file directly, and Visual Studio provides IntelliSense. The file schema is stored at [https://schemastore.org](http://schemastore.org/schemas/json/webjob-publish-settings.json) and can be viewed there.  

### webjobs-list.json file

When you link a WebJobs-enabled project to a web project, Visual Studio stores the name of the WebJobs project in a *webjobs-list.json* file in the web project's *Properties* folder. The list might contain multiple WebJobs projects, as shown in the following example:

```json
{
  "$schema": "http://schemastore.org/schemas/json/webjobs-list.json",
  "WebJobs": [
    {
      "filePath": "../ConsoleApplication1/ConsoleApplication1.csproj"
    },
    {
      "filePath": "../WebJob1/WebJob1.csproj"
    }
  ]
}
```

You can edit this file directly in Visual Studio, with IntelliSense. The file schema is stored at [https://schemastore.org](http://schemastore.org/schemas/json/webjobs-list.json).

### Deploy a WebJobs project

A WebJobs project that you link to a web project deploys automatically with the web project. For information about web project deployment, see **How-to guides** > **Deploy the app** in the left navigation.

To deploy a WebJobs project by itself, right-click the project in **Solution Explorer** and select **Publish as Azure WebJob**. 

Screenshot showing how to select Publish as Azure WebJob in the Solution Explorer.

For an independent WebJob, the same **Publish Web** wizard that is used for web projects appears, but with fewer settings available to change.

### Add Azure WebJob dialog box

The **Add Azure WebJob** dialog box lets you enter the WebJob name and the run mode setting for your WebJob. 

Screenshot of the Add Azure WebJob dialog box.

Some of the fields in this dialog box correspond to fields on the **Add WebJob** dialog box of the Azure portal. For more information, see [Run background tasks with WebJobs in Azure App Service](webjobs-create.md).

WebJob deployment information:

- For information about command-line deployment, see [Enabling Command-line or Continuous Delivery of Azure WebJobs](https://azure.microsoft.com/blog/enabling-command-line-or-continuous-delivery-of-azure-webjobs/).

- If you deploy a WebJob, and then decide you want to change the type of WebJob and redeploy, delete the *webjobs-publish-settings.json* file. Doing so causes Visual Studio to redisplay the publishing options, so you can change the type of WebJob.

- If you deploy a WebJob, and later change the run mode between *continuous* and *triggered*, Visual Studio creates a new WebJob in Azure when you redeploy. If you change other scheduling settings, but leave run mode the same or switch between Scheduled and On Demand, Visual Studio updates the existing job instead of creating a new one.

## WebJob types

The type of a WebJob can be either *triggered* or *continuous*:

- Triggered (default): A triggered WebJob starts based on a binding event, on a [schedule](#scheduling-a-triggered-webjob), or when you trigger it manually (on demand). It runs on a single instance that the web app runs on.

- Continuous: A [continuous](#continuous-execution) WebJob starts immediately when the WebJob is created. It runs on all web app scaled instances by default but can be configured to run as a single instance via *settings.job*.


> **Note:**
> A web app can time out after 20 minutes of inactivity, and only requests to the actual web app can reset the timer. Viewing the app's configuration in the Azure portal or making requests to the advanced tools site doesn't reset the timer. If you set the web app that hosts your job to run continuously, run on a schedule, or use event-driven triggers, enable the **Always on** setting on your web app's Azure **Configuration** pane. The **Always on** setting helps make sure that these kinds of WebJobs run reliably. This feature is available only in the Basic, Standard, and Premium [pricing tiers](https://azure.microsoft.com/pricing/details/app-service/?ref=microsoft.com&utm_source=microsoft.com&utm_medium=docs&utm_campaign=visualstudio).


### Scheduling a triggered WebJob

When you publish a console app to Azure, Visual Studio sets the type of WebJob to **Triggered** by default, and adds a new *settings.job* file to the project. For triggered WebJob types, you can use this file to set an execution schedule for your WebJob.

Use the *settings.job* file to set an execution schedule for your WebJob. The following example runs every hour from 9 AM to 5 PM:

```json
{
    "schedule": "0 0 9-17 * * *"
}
```

This file is located at the root of the WebJobs folder with your WebJob's script, such as `wwwroot\app_data\jobs\triggered\{job name}` or `wwwroot\app_data\jobs\continuous\{job name}`. When you deploy a WebJob from Visual Studio, mark your *settings.job* file properties in Visual Studio as **Copy if newer**.

If you [create a WebJob from the Azure portal](webjobs-create.md), the *settings.job* file is created for you.

#### CRON expressions

WebJobs uses the same CRON expressions for scheduling as the timer trigger in Azure Functions. To learn more about CRON support, see [Timer trigger for Azure Functions](../azure-functions/functions-bindings-timer.md#ncrontab-expressions).


> **Note:**  
> The default time zone used to run CRON expressions is Coordinated Universal Time (UTC). To have your CRON expression run based on another time zone, create an app setting for your function app named WEBSITE_TIME_ZONE. To learn more, see [NCRONTAB time zones](../azure-functions/functions-bindings-timer.md#ncrontab-time-zones).


#### settings.job reference

WebJobs supports the following settings in the **settings.job** file:

| **Setting** | **Type** | **Description** |
| --- | --- | --- |
| `is_in_place` | All | Allows the WebJob to run in place without first being copied to a temporary folder. For more information, see [WebJob working directory](https://github.com/projectkudu/kudu/wiki/WebJobs#webjob-working-directory). |
| `is_singleton` | Continuous | Only run the WebJob on a single instance when scaled out. For more information, see [Set a continuous job as singleton](https://github.com/projectkudu/kudu/wiki/WebJobs-API#set-a-continuous-job-as-singleton). |
| `schedule` | Triggered | Run the WebJob on a CRON-based schedule. For more information, see [NCRONTAB expressions](../azure-functions/functions-bindings-timer.md#ncrontab-expressions). |
| `stopping_wait_time` | All | Allows control of the shutdown behavior. For more information, see [Graceful shutdown](https://github.com/projectkudu/kudu/wiki/WebJobs#graceful-shutdown). |

### Continuous execution

If you enable **Always on** in Azure, you can use Visual Studio to change the WebJob to run continuously:

1. If the project isn't published already, then [publish the project to Azure](#deploy-to-azure-app-service).

1. In **Solution Explorer**, right-click the project and select **Publish**.

1. In the **Settings** section, choose **Show all settings**. 

1. In the **Profile settings** dialog box, choose **Continuous** for **WebJob Type**, and then choose **Save**.

   Screenshot showing the Publish Settings dialog box for a WebJob.

1. Select **Publish** in the **Publish** tab to republish the WebJob with the updated settings.

## Next steps

> 
> [Learn more about the WebJobs SDK](webjobs-sdk-how-to.md)
