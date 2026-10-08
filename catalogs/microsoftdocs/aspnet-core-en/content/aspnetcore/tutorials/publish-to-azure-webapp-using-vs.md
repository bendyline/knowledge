---
title: Publish an ASP.NET Core app to Azure with Visual Studio
author: wadepickett
description: Learn how to publish an ASP.NET Core app to Azure App Service using Visual Studio.
monikerRange: '>= aspnetcore-7.0'
ms.author: wpickett
ms.custom: devx-track-csharp, sfi-image-nochange
ms.date: 02/03/2023
uid: tutorials/publish-to-azure-webapp-using-vs
---
# Publish an ASP.NET Core app to Azure with Visual Studio

> **Important:**
> **ASP.NET Core preview releases with Azure App Service**
>
> ASP.NET Core preview releases aren't deployed to Azure App Service by default. To host an app that uses an ASP.NET Core preview release, see [Deploy ASP.NET Core preview release to Azure App Service](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fazure-apps%2Findex%23deploy-aspnet-core-preview-release-to-azure-app-service).
<!-- 
> [!IMPORTANT]
> **ASP.NET Core 3.0 with Azure App Service**
>
> ASP.NET Core 3.0 has not yet been deployed to Azure App Service. We hope to provide ASP.NET Core 3 on Azure App Service soon. To host an app that uses an ASP.NET Core 3.0:

* Treat ASP.NET Core 3.0 like a preview release for Azure App Service deployment.
* See [Deploy ASP.NET Core preview release to Azure App Service](xref:host-and-deploy/azure-apps/index#deploy-aspnet-core-preview-release-to-azure-app-service).
-->


To troubleshoot an App Service deployment issue, see [test/troubleshoot-azure-iis](../test/troubleshoot-azure-iis.md).

## Set up

Open a [free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) if you don't have one.

## Create a web app

Start Visual Studio 2022 and select **Create a new project**.

Create a new project from the start window

In the **Create a new project** dialog, select **ASP.NET Core Web App**, and then select **Next**.

Create an ASP.NET Core Web App

In the **Configure your new project** dialog, name your project, and then select **Next**.

In the **Additional information** dialog:

* In the **Framework** input, select **.NET 7.0 (Standard Term Support)**.
* In the **Authentication type** input, select **Individual Accounts**, and then select **Create**.

Additional information

Visual Studio creates the solution.

## Run the app

* Press F5 to run the project.

Web application open in Microsoft Edge on localhost

### Register a user

* Select **Register** and register a new user. You can use a fictitious email address. When you submit, the page displays the following error:

    *"A database operation failed while processing the request. Applying existing migrations may resolve this issue"*
* Select **Apply Migrations** and, once the page updates, refresh the page.

A database operation failed while processing the request

* A **Register confirmation** page is displayed. Select **Click here to confirm your account**.
* A **Confirm email** page is displayed.
* Log in as the new user.

The app displays the email used to register the new user and a **Logout** link.

Web application open in Microsoft Edge. The Register link is replaced by the text Hello user\@example.com!

* Stop the application by closing the browser, or in Visual Studio select **Debug** > **Stop Debugging**.
* In Visual Studio select **Build** > **Clean Solution** to  clean project items  and avoid file contention.

## Deploy the app to Azure

Right-click on the project in Solution Explorer and select **Publish**.

Contextual menu open with Publish link highlighted

In the **Publish** dialog:

* Select **Azure**.
* Select **Next**.

Publish dialog

In the **Publish** dialog:

* Select **Azure App Service (Windows)**.
* Select **Next**.

Publish Dialog: select Azure Service

In the **Publish** dialog, in the **App Service** tab, select **Create new**.

Publish dialog: select Azure Service instance

The **Create App Service** dialog appears:

* The **Name**, **Resource Group**, and **Hosting Plan** entry fields are populated. You can keep these names or change them.
* Select **Create**.

Create App Service dialog

After creation is completed the dialog is automatically closed and the **Publish** dialog gets focus again:

* The new instance that was just created is automatically selected.
* Select **Finish**.

Publish dialog: select App Service instance

The **Publish profile creation progress** dialog confirms the publish profile was created. Select **Close**.

Next you see the **Publish Profile summary** page. Visual Studio has detected that this application requires a SQL Server database which it has listed in the Service Dependencies pane. Select the ellipsis (**...**) and then **Connect**.

Publish Profile summary page: configure SQL Server dependency

The **Connect to dependency** dialog appears:

* Select **Azure SQL Database**.
* Select **Next**.

Configure SQL Server Dependency dialog

In the **Connect to Azure SQL database** dialog, select **Create new**.

Select Create a SQL DB

The **Create Azure SQL Database** appears:

* The **Database name**, **Resource Group**, **Database server** and **App Service Plan** entry fields are populated. You can keep these values or change them.
* Enter the **Database administrator username** and **Database administrator password** for the selected **Database server** (note the account you use must have the necessary permissions to create the new Azure SQL database)
* Select **Create**.

New Azure SQL Database dialog

After creation is completed the dialog is automatically closed and the **Connect to Azure SQL Database** dialog gets focus again:

* The new instance that was just created is automatically selected.
* Select **Next**.

Select Next

In the next step of the **Connect to Azure SQL Database** dialog:

* Enter the **Database connection user name** and **Database connection password** fields. These are the details your application will use to connect to the database at runtime. Best practice is to avoid using the same details as the admin username and password used in the previous step.
* Select **Finish**.

Configure Azure SQL Database dialog, connection string details

The **Dependency configuration progress** dialog confirms the Azure SQL Database is configured. Select **Close**.

In the **Publish Profile summary** page select **More actions** > **Edit**:

Publish profile summary page: edit settings

On the **Settings** tab of the **Publish** dialog:

* Expand **Databases** and check **Use this connection string at runtime**.
* Expand **Entity Framework Migrations** and select **Apply this migration on publish**.

* Select **Save**. Visual Studio returns to the **Publish** dialog.

Publish dialog: Settings panel

Click **Publish**. Visual Studio publishes your app to Azure. When the deployment completes.

Last step

The app is opened in a browser. Register a new user and log in as the new user to validate the database deployment and run-time connection.

### Update the app

* Edit the `Pages/Index.cshtml` Razor page and change its contents, then save the changes. For example, you can modify the paragraph to say "Hello ASP.NET Core!":

    [Index (complete source file; reference: publish-to-azure-webapp-using-vs/sample/index.cshtml?highlight=10\&range=1-12)](../../_code/aspnetcore/tutorials/publish-to-azure-webapp-using-vs/sample/Index.cshtml.md)

* Select **Publish** from the **Publish Profile summary** page again.

Publish profile summary page

* After the app is published, refresh the page and verify that the changes you made are available on Azure.

Verify task is complete

### Clean up

When you have finished testing the app, go to the [Azure portal](https://portal.azure.com/) and delete the app.

* Select **Resource groups**, then select the resource group you created.

Azure portal: Resource Groups in sidebar menu

* In the **Resource group** page, select **Delete resource group**.

Azure portal: Resource Groups page

* Enter the name of the resource group and select **Delete**. Your app and all other resources created in this tutorial are now deleted from Azure.

## Additional resources

* [Azure App Service](https://learn.microsoft.com/azure/app-service/app-service-web-overview)
* [Azure resource groups](https://learn.microsoft.com/azure/azure-resource-manager/resource-group-overview#resource-groups)
* [Azure SQL Database](https://learn.microsoft.com/azure/sql-database/)
* [host-and-deploy/visual-studio-publish-profiles](../host-and-deploy/visual-studio-publish-profiles.md)
* [test/troubleshoot-azure-iis](../test/troubleshoot-azure-iis.md)
