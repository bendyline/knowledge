---
title: 'Tutorial: Host a RESTful API with CORS'
description: Learn how Azure App Service helps you host your RESTful APIs with CORS support. App Service can host both front-end web apps and back-end APIs.
ms.assetid: a820e400-06af-4852-8627-12b3db4a8e70
ms.devlang: csharp
ms.topic: tutorial
ms.date: 08/29/2025
ms.update-cycle: 1095-days
ms.custom: "UpdateFrequency3, devx-track-csharp, mvc, devcenter, devx-track-azurecli"
ms.author: msangapu
author: msangapu-msft
ms.service: azure-app-service
---

# Tutorial: Host a RESTful API with CORS in Azure App Service

[Azure App Service](overview.md) provides a highly scalable self-patching web hosting service. In addition, App Service has built-in support for [cross-origin resource sharing (CORS)](https://wikipedia.org/wiki/Cross-Origin_Resource_Sharing) for RESTful APIs. This tutorial shows how to deploy an ASP.NET Core API app to App Service with CORS support. You configure the app by using command-line tools and deploy the app by using Git. 

In this tutorial, you learn how to:

> 
> * Create App Service resources by the using the Azure CLI.
> * Deploy a RESTful API to Azure by using Git.
> * Enable App Service CORS support.

You can complete this tutorial on macOS, Linux, or Windows.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/app-service-web-tutorial-rest-api.md)

## Prerequisites

* <a href="https://git-scm.com/" target="_blank">Install Git.</a>
 * <a href="https://dotnet.microsoft.com/download/dotnet-core/3.1" target="_blank">Install the latest .NET Core 3.1 SDK.</a>

## Create a local ASP.NET Core app

In this step, you set up the local ASP.NET Core project. App Service supports the same workflow for APIs written in other languages.

### Clone the sample application

1. In the terminal window, use `cd` to go to a working directory.  

1. Clone the sample repository, and then go to the repository root. 

    ```bash
    git clone https://github.com/Azure-Samples/dotnet-core-api
    cd dotnet-core-api
    ```

    This repository contains an app that's based on the tutorial [ASP.NET Core web API documentation with Swagger / OpenAPI](https://learn.microsoft.com/aspnet/core/tutorials/web-api-help-pages-using-swagger?tabs=visual-studio). It uses a Swagger generator to serve the [Swagger UI](https://swagger.io/swagger-ui/) and the Swagger JSON endpoint.

1. Make sure the default branch is `main`.

    ```bash
    git branch -m main
    ```
    
    > **Tip:**
    > The branch name change isn't required by App Service. However, because many repositories are changing their default branch to `main` (see [Change deployment branch](deploy-local-git.md#change-deployment-branch)), this tutorial shows how to deploy a repository from `main`.

### Run the application

1. Run the following commands to install the required packages, run database migrations, and start the application.

    ```bash
    dotnet restore
    dotnet run
    ```

1. Go to `http://localhost:5000/swagger` in a browser to try the Swagger UI.

    Screenshot of an ASP.NET Core API running locally.

1. Go to `http://localhost:5000/api/todo` to see a list of ToDo JSON items.

1. Go to `http://localhost:5000` and experiment with the browser app. Later, you'll point the browser app to a remote API in App Service to test CORS functionality. Code for the browser app is found in the repository's _wwwroot_ directory.

1. To stop ASP.NET Core at any time, select **Ctrl+C** in the terminal.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cloud-shell-try-it.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/app-service-web-tutorial-rest-api.md)

## Deploy the app to Azure

In this step, you deploy your .NET Core application to App Service.

### Configure local Git deployment


FTP and local Git can deploy to an Azure web app by using a *deployment user*. Once you configure your deployment user, you can use it for all your Azure deployments. Your account-level deployment username and password are different from your Azure subscription credentials. 

To configure the deployment user, run the [az webapp deployment user set](https://learn.microsoft.com/cli/azure/webapp/deployment/user#az-webapp-deployment-user-set) command in Azure Cloud Shell. Replace \<username> and \<password> with a deployment user username and password. 

- The username must be unique within Azure, and for local Git pushes, must not contain the ‘\@’ symbol. 
- The password must be at least eight characters long, with two of the following three elements: letters, numbers, and symbols. 

```azurecli-interactive
az webapp deployment user set --user-name <username> --password <password>
```

The JSON output shows the password as `null`. If you get a `'Conflict'. Details: 409` error, change the username. If you get a `'Bad Request'. Details: 400` error, use a stronger password. 

Record your username and password to use to deploy your web apps.


### Create a resource group

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/app-service-web-create-resource-group-no-h.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/app-service-web-tutorial-rest-api.md)

### Create an App Service plan


In the Cloud Shell, create an App Service plan with the [`az appservice plan create`](https://learn.microsoft.com/cli/azure/appservice/plan) command.

<!-- [!INCLUDE [app-service-plan](app-service-plan.md)] -->

The following example creates an App Service plan named `myAppServicePlan` in the **Free** pricing tier:

```azurecli-interactive
az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku FREE
```

When the App Service plan has been created, the Azure CLI shows information similar to the following example:

<pre>
{ 
  "adminSiteName": null,
  "appServicePlanName": "myAppServicePlan",
  "geoRegion": "West Europe",
  "hostingEnvironmentProfile": null,
  "id": "/subscriptions/0000-0000/resourceGroups/myResourceGroup/providers/Microsoft.Web/serverfarms/myAppServicePlan",
  "kind": "app",
  "location": "West Europe",
  "maximumNumberOfWorkers": 1,
  "name": "myAppServicePlan",
  &lt; JSON data removed for brevity. &gt;
  "targetWorkerSizeId": 0,
  "type": "Microsoft.Web/serverfarms",
  "workerTierName": null
} 
</pre>


### Create a web app


Create a [web app](overview.md) in the `myAppServicePlan` App Service plan. 

In the Cloud Shell, you can use the [`az webapp create`](https://learn.microsoft.com/cli/azure/webapp#az-webapp-create) command. In the following example, replace `<app-name>` with a globally unique app name. (Valid characters are `a-z`, `0-9`, and `-`.) 

```azurecli-interactive
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name <app-name> --deployment-local-git
```

When the web app creation completes, the Azure CLI shows output similar to the following example:

<pre>
Local git is configured with url of 'https://&lt;username&gt;@&lt;app-name&gt;.scm.azurewebsites.net/&lt;app-name&gt;.git'
{
  "availabilityState": "Normal",
  "clientAffinityEnabled": true,
  "clientCertEnabled": false,
  "clientCertExclusionPaths": null,
  "cloningInfo": null,
  "containerSize": 0,
  "dailyMemoryTimeQuota": 0,
  "defaultHostName": "&lt;app-name&gt;.azurewebsites.net",
  "deploymentLocalGitUrl": "https://&lt;username&gt;@&lt;app-name&gt;.scm.azurewebsites.net/&lt;app-name&gt;.git",
  "enabled": true,
  &lt; JSON data removed for brevity. &gt;
}
</pre>

> **Note:**
> The URL of the Git remote is shown in the `deploymentLocalGitUrl` property, with the format `https://<username>@<app-name>.scm.azurewebsites.net/<app-name>.git`. Save this URL because you need it later.
>
 

### Push to Azure from Git


1. Because you're deploying the `main` branch, you need to set the default deployment branch for your App Service app to `main`. (See [Change deployment branch](deploy-local-git.md#change-deployment-branch).) In the Cloud Shell, set the `DEPLOYMENT_BRANCH` app setting by using the [`az webapp config appsettings set`](https://learn.microsoft.com/cli/azure/webapp/config/appsettings#az-webapp-config-appsettings-set) command. 

    ```azurecli-interactive
    az webapp config appsettings set --name <app-name> --resource-group myResourceGroup --settings DEPLOYMENT_BRANCH='main'
    ```

1. Back in the local terminal window, add an Azure remote to your local Git repository. Replace *\<deploymentLocalGitUrl-from-create-step>* with the URL of the Git remote that you saved from [Create a web app](#create-a-web-app).

    ```bash
    git remote add azure <deploymentLocalGitUrl-from-create-step>
    ```

1. Push to the Azure remote to deploy your app with the following command. When Git Credential Manager prompts you for credentials, make sure you enter the credentials you created in **Configure local git deployment**, not the credentials you use to sign in to the Azure portal.

    ```bash
    git push azure main
    ```

    This command might take a few minutes to run. While running, it displays information similar to the following example:


   ```
   Enumerating objects: 83, done.
   Counting objects: 100% (83/83), done.
   Delta compression using up to 8 threads
   Compressing objects: 100% (78/78), done.
   Writing objects: 100% (83/83), 22.15 KiB | 3.69 MiB/s, done.
   Total 83 (delta 26), reused 0 (delta 0)
   remote: Updating branch 'master'.
   remote: Updating submodules.
   remote: Preparing deployment for commit id '509236e13d'.
   remote: Generating deployment script.
   remote: Project file path: .\TodoApi.csproj
   remote: Generating deployment script for ASP.NET MSBuild16 App
   remote: Generated deployment script files
   remote: Running deployment command...
   remote: Handling ASP.NET Core Web Application deployment with MSBuild16.
   remote: .
   remote: .
   remote: .
   remote: Finished successfully.
   remote: Running post deployment command(s)...
   remote: Triggering recycle (preview mode disabled).
   remote: Deployment successful.
   To https://&lt;app_name&gt;.scm.azurewebsites.net/&lt;app_name&gt;.git
   * [new branch]      master -> master
   ```

### Browse to the Azure app

1. Go to `http://<app_name>.azurewebsites.net/swagger` in a browser and view the Swagger UI.

    Screenshot of an ASP.NET Core API running in Azure App Service.

1. Go to `http://<app_name>.azurewebsites.net/swagger/v1/swagger.json` to see the _swagger.json_ for your deployed API.

1. Go to `http://<app_name>.azurewebsites.net/api/todo` to see your deployed API working.

## Add CORS functionality

Next, you enable the built-in CORS support in App Service for your API.

### Test CORS in the sample app

1. In your local repository, open _wwwroot/index.html_.

1. On line 51, set the `apiEndpoint` variable to the URL of your deployed API (`http://<app_name>.azurewebsites.net`). Replace _\<appname>_ with your app name.

1. In your local terminal window, run the sample app again.

    ```bash
    dotnet run
    ```

1. Go to the browser app at `http://localhost:5000`. Open the developer tools window in your browser (**Ctrl**+**Shift**+**i** in Chrome for Windows) and inspect the **Console** tab. You should now see the error message `No 'Access-Control-Allow-Origin' header is present on the requested resource`.

    Screenshot of the CORS error in the browser client.

    The domain mismatch between the browser app (`http://localhost:5000`) and remote resource (`http://<app_name>.azurewebsites.net`) is recognized by your browser as a cross-origin resource request. Also, because the App Service app isn't sending the `Access-Control-Allow-Origin` header, the browser has prevented cross-domain content from loading.

    In production, your browser app would have a public URL instead of the localhost URL, but the process for enabling CORS to a localhost URL is the same as the process for a public URL.

### Enable CORS 

In Cloud Shell, enable CORS to your client's URL by using the [`az webapp cors add`](https://learn.microsoft.com/cli/azure/webapp/cors#az-webapp-cors-add) command. Replace the _&lt;app-name>_ placeholder.

```azurecli-interactive
az webapp cors add --resource-group myResourceGroup --name <app-name> --allowed-origins 'http://localhost:5000'
```

You can add multiple allowed origins by running the command multiple times or by adding a comma-separated list in `--allowed-origins`. To allow all origins, use `--allowed-origins '*'`.

### Test CORS again

Refresh the browser app at `http://localhost:5000`. The error message in the **Console** window is now gone, and you can see the data from the deployed API and interact with it. Your remote API now supports CORS to your browser app running locally. 

Screenshot that shows CORS support in the browser client.

Congratulations, you're running an API in Azure App Service with CORS support.

## Frequently asked questions

- [App Service CORS vs. your CORS](#app-service-cors-vs-your-cors)
- [How do I set allowed origins to a wildcard subdomain?](#how-do-i-set-allowed-origins-to-a-wildcard-subdomain)
- [How do I enable the ACCESS-CONTROL-ALLOW-CREDENTIALS header on the response?](#how-do-i-enable-the-access-control-allow-credentials-header-on-the-response)

#### App Service CORS vs. your CORS

To get more flexibility, you can use your own CORS utilities instead of App Service CORS. For example, you might want to specify different allowed origins for different routes or methods. Because App Service CORS lets you specify only one set of accepted origins for all API routes and methods, you would need to use your own CORS code. To learn how to enable CORS in ASP.NET Core, see [Enable CORS](https://learn.microsoft.com/aspnet/core/security/cors).

The built-in App Service CORS feature doesn't have options to allow only specific HTTP methods or verbs for each origin that you specify. It automatically allows all methods and headers for each origin defined. This behavior is similar to [ASP.NET Core CORS](https://learn.microsoft.com/aspnet/core/security/cors) policies when you use the options `.AllowAnyHeader()` and `.AllowAnyMethod()` in the code.

> **Note:**
> Don't try to use App Service CORS and your own CORS code together. If you try to use them together, App Service CORS takes precedence and your own CORS code has no effect.
>
>

#### How do I set allowed origins to a wildcard subdomain?

A wildcard subdomain like `*.contoso.com` is more restrictive than the wildcard origin `*`. The app's CORS management page in the Azure portal doesn't let you set a wildcard subdomain as an allowed origin. However, you can do that by using the Azure CLI:

```azurecli-interactive
az webapp cors add --resource-group <group-name> --name <app-name> --allowed-origins 'https://*.contoso.com'
```

#### How do I enable the ACCESS-CONTROL-ALLOW-CREDENTIALS header on the response?

If your app requires credentials such as cookies or authentication tokens to be sent, the browser might require the `ACCESS-CONTROL-ALLOW-CREDENTIALS` header on the response. To enable this in App Service, set `properties.cors.supportCredentials` to `true`:

```azurecli-interactive
az resource update --name web --resource-group <group-name> \
  --namespace Microsoft.Web --resource-type config \
  --parent sites/<app-name> --set properties.cors.supportCredentials=true
```

This operation isn't allowed when allowed origins include the wildcard origin `'*'`. Specifying `AllowAnyOrigin` and `AllowCredentials` isn't secure. Doing so can result in cross-site request forgery. To allow credentials, try replacing the wildcard origin with [wildcard subdomains](#how-do-i-set-allowed-origins-to-a-wildcard-subdomain). 

## Clean up resources

In the preceding steps, you created Azure resources in a resource group. If you don't expect to need these resources in the future, delete the resource group by running the following command in the Cloud Shell:

```azurecli-interactive
az group delete --name myResourceGroup
```

This command might take a minute to run.

<a name="next"></a>
## Next step

What you learned:

> 
> * Create App Service resources by using the Azure CLI.
> * Deploy a RESTful API to Azure by using Git.
> * Enable App Service CORS support.

Go to the following tutorial to learn how to authenticate and authorize users.

> 
> [Tutorial: Authenticate and authorize users end-to-end](tutorial-auth-aad.md)
