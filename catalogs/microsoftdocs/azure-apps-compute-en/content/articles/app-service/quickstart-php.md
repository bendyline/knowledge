---
title: 'Quickstart: Create a PHP Web App'
description: Deploy your first PHP Hello World to Azure App Service in minutes. You deploy using Git, which is one of many ways to deploy to App Service.
ms.assetid: 6feac128-c728-4491-8b79-962da9a40788
ms.topic: quickstart
author: msangapu-msft
ms.author: msangapu
ms.date: 04/22/2025
ms.devlang: php
ms.custom: mode-other, devdivchpfy22, devx-track-azurecli, linux-related-content
zone_pivot_groups: app-service-platform-windows-linux
ms.service: azure-app-service
---

# Create a PHP web app in Azure App Service

**Applies to: platform-windows**


> **Warning:**
> PHP on Windows reached the [end of support](https://github.com/Azure/app-service-linux-docs/blob/master/Runtime_Support/php_support.md#end-of-life-for-php-74) in November 2022. PHP is supported only for App Service on Linux. This article is for reference only.


[Azure App Service](overview.md) provides a highly scalable, self-patching web hosting service.  This quickstart tutorial shows how to deploy a PHP app to Azure App Service on Windows.

You create the web app using the [Azure CLI](https://learn.microsoft.com/cli/azure/get-started-with-azure-cli) in Cloud Shell, and you use Git to deploy sample PHP code to the web app.

Sample app running in Azure

You can follow the steps here using a Mac, Windows, or Linux machine. Once the prerequisites are installed, it takes about five minutes to complete the steps.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/quickstart-php.md)

> **Note:**
> [After November 28, 2022, PHP will only be supported on App Service on Linux.](https://github.com/Azure/app-service-linux-docs/blob/master/Runtime_Support/php_support.md#end-of-life-for-php-74)

## Prerequisites

To complete this quickstart:

* <a href="https://git-scm.com/" target="_blank">Install Git</a>
* <a href="https://php.net/manual/install.php" target="_blank">Install PHP</a>

## Download the sample locally

1. In a terminal window, run the following commands. It will clone the sample application to your local machine, and navigate to the directory containing the sample code.

    ```bash
    git clone https://github.com/Azure-Samples/php-docs-hello-world
    cd php-docs-hello-world
    ```
    
1. Make sure the default branch is `main`.

    ```bash
    git branch -m main
    ```
    
    > **Tip:**
    > The branch name change isn't required by App Service. However, since many repositories are changing their default branch to `main`, this quickstart also shows you how to deploy a repository from `main`.
    
## Run the app locally

1. Run the application locally so that you see how it should look when you deploy it to Azure. Open a terminal window and use the `php` command to launch the built-in PHP web server.

    ```bash
    php -S localhost:8080
    ```
    
1. Open a web browser, and navigate to the sample app at `http://localhost:8080`.

    You see the **Hello World!** message from the sample app displayed in the page.
    
    Sample app running locally
    
1. In your terminal window, press **Ctrl+C** to exit the web server.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cloud-shell-try-it.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/quickstart-php.md)

## Configure a deployment user  


FTP and local Git can deploy to an Azure web app by using a *deployment user*. Once you configure your deployment user, you can use it for all your Azure deployments. Your account-level deployment username and password are different from your Azure subscription credentials. 

To configure the deployment user, run the [az webapp deployment user set](https://learn.microsoft.com/cli/azure/webapp/deployment/user#az-webapp-deployment-user-set) command in Azure Cloud Shell. Replace \<username> and \<password> with a deployment user username and password. 

- The username must be unique within Azure, and for local Git pushes, must not contain the ‘\@’ symbol. 
- The password must be at least eight characters long, with two of the following three elements: letters, numbers, and symbols. 

```azurecli-interactive
az webapp deployment user set --user-name <username> --password <password>
```

The JSON output shows the password as `null`. If you get a `'Conflict'. Details: 409` error, change the username. If you get a `'Bad Request'. Details: 400` error, use a stronger password. 

Record your username and password to use to deploy your web apps.


[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/app-service-web-create-resource-group.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/quickstart-php.md)

## Create an Azure App Service plan


In the Cloud Shell, create an App Service plan with the [`az appservice plan create`](https://learn.microsoft.com/cli/azure/appservice/plan) command.

<!-- [!INCLUDE [app-service-plan](app-service-plan.md)] -->

The following example creates an App Service plan named `myAppServicePlan` in the **Free** pricing tier:

```azurecli-interactive
az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku FREE --is-linux
```

When the App Service plan has been created, the Azure CLI shows information similar to the following example:

<pre>
{ 
  "freeOfferExpirationTime": null,
  "geoRegion": "West Europe",
  "hostingEnvironmentProfile": null,
  "id": "/subscriptions/0000-0000/resourceGroups/myResourceGroup/providers/Microsoft.Web/serverfarms/myAppServicePlan",
  "kind": "linux",
  "location": "West Europe",
  "maximumNumberOfWorkers": 1,
  "name": "myAppServicePlan",
  &lt; JSON data removed for brevity. &gt;
  "targetWorkerSizeId": 0,
  "type": "Microsoft.Web/serverfarms",
  "workerTierName": null
} 
</pre>



## Create a web app

1. In the Cloud Shell, create a web app in the `myAppServicePlan` App Service plan with the [`az webapp create`](https://learn.microsoft.com/cli/azure/webapp#az_webapp_create) command.

    In the following example, replace `<app-name>` with a globally unique app name (valid characters are `a-z`, `0-9`, and `-`). The runtime is set to `PHP|7.4`. To see all supported runtimes, run [`az webapp list-runtimes`](https://learn.microsoft.com/cli/azure/webapp#az_webapp_list_runtimes).

    ```azurecli-interactive
    az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name <app-name> --runtime 'PHP|8.1' --deployment-local-git
    ```
    
    When the web app has been created, the Azure CLI shows output similar to the following example:

    <pre>
    Local git is configured with url of &lt;URL>
    {
      "availabilityState": "Normal",
      "clientAffinityEnabled": true,
      "clientCertEnabled": false,
      "cloningInfo": null,
      "containerSize": 0,
      "dailyMemoryTimeQuota": 0,
      "defaultHostName": "&lt;app-name&gt;.azurewebsites.net",
      "enabled": true,
      &lt; JSON data removed for brevity. &gt;
    }
    </pre>
    
    You've created an empty new web app, with git deployment enabled.

    > **Note:**
    > The URL of the Git remote is shown in the `deploymentLocalGitUrl` property. Save this URL as you need it later.
    >

1. Browse to your newly created web app. 

    Here's what your new web app should look like:

    Empty web app page

## Push to Azure from Git


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


  <pre>
  Counting objects: 2, done.
  Delta compression using up to 4 threads.
  Compressing objects: 100% (2/2), done.
  Writing objects: 100% (2/2), 352 bytes | 0 bytes/s, done.
  Total 2 (delta 1), reused 0 (delta 0)
  remote: Updating branch 'main'.
  remote: Updating submodules.
  remote: Preparing deployment for commit id '25f18051e9'.
  remote: Generating deployment script.
  remote: Running deployment command...
  remote: Handling Basic Web Site deployment.
  remote: Kudu sync from: '/home/site/repository' to: '/home/site/wwwroot'
  remote: Copying file: '.gitignore'
  remote: Copying file: 'LICENSE'
  remote: Copying file: 'README.md'
  remote: Copying file: 'index.php'
  remote: Ignoring: .git
  remote: Finished successfully.
  remote: Running post deployment command(s)...
  remote: Deployment successful.
  To &lt;URL>
      cc39b1e..25f1805  main -> main
  </pre>

## Browse to the app

Browse to the deployed application using your web browser.

The PHP sample code is running in an Azure App Service web app.

Sample app running in Azure

**Congratulations!** You've deployed your first PHP app to App Service.

## Update locally and redeploy the code

1. Using a local text editor, open the `index.php` file within the PHP app, and make a small change to the text within the string next to `echo`:

    ```php
    echo "Hello Azure!";
    ```

1. In the local terminal window, commit your changes in Git, and then push the code changes to Azure.

    ```bash
    git commit -am "updated output"
    git push azure main
    ```

1. Once deployment has completed, return to the browser window that opened during the **Browse to the app** step, and refresh the page.

    Updated sample app running in Azure

## Manage your new Azure app

1. Go to the <a href="https://portal.azure.com" target="_blank">Azure portal</a> to manage the web app you created. Search for and select **App Services**.

    Search for App Services, Azure portal, create PHP web app

2. Select the name of your Azure app.

    Portal navigation to Azure app

    Your web app's **Overview** page will be displayed. Here, you can perform basic management tasks like **Browse**, **Stop**, **Restart**, and **Delete**.

    App Service page in Azure portal

    The web app menu provides different options for configuring your app.

## Clean up resources

In the preceding steps, you created Azure resources in a resource group. If you don't expect to need these resources in the future, delete the resource group by running the following command in the Cloud Shell:

```azurecli-interactive
az group delete --name myResourceGroup
```

This command might take a minute to run.



**Applies to: platform-linux**

[Azure App Service](overview.md) provides a highly scalable, self-patching service for web hosting. This quickstart shows how to deploy a PHP app to Azure App Service on Linux.

Screenshot of the sample app running in Azure.

You can follow the steps here using a Mac, Windows, or Linux machine. Once the prerequisites are installed, it takes about ten minutes to complete the steps.

## Prerequisites

* An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
* [Git](https://git-scm.com/)
* [PHP](https://php.net/downloads.php)
* [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) to run commands in any shell to create and configure Azure resources.

## Download the sample repository

### [Azure CLI](#tab/cli)

In the following steps, you create the web app by using the [Azure CLI](https://learn.microsoft.com/cli/azure/get-started-with-azure-cli), and then you deploy sample PHP code to the web app.

You can use the [Azure Cloud Shell](https://shell.azure.com).

1. In a terminal window, run the following commands to clone the sample application to your local machine and navigate to the project root.

    ```bash
    git clone https://github.com/Azure-Samples/php-docs-hello-world
    cd php-docs-hello-world
    ```

1. To run the application locally, use the `php` command to launch the built-in PHP web server.

    ```bash
    php -S localhost:8080
    ```

1. Browse to the sample application at `http://localhost:8080` in a web browser.

    Screenshot of the sample app running locally.

1. In your terminal window, press **Ctrl+C** to exit the web server.

### [Portal](#tab/portal)

1. In your browser, navigate to the repository containing [the sample code](https://github.com/Azure-Samples/php-docs-hello-world).

1. In the upper right corner, select **Fork**.

    Screenshot of the Azure Samples repo in GitHub, with the Fork option highlighted.

1. On the **Create a new fork** screen, confirm the **Owner** and **Repository name** fields. Select **Create fork**.

    Screenshot of the Create a new fork page in GitHub for creating a new fork of Azure Samples.

>**Note:**
> This should take you to the new fork. Your fork URL looks something like this: `https://github.com/YOUR_GITHUB_ACCOUNT_NAME/php-docs-hello-world`

---

## Deploy your application code to Azure

### [Azure CLI](#tab/cli)

Azure CLI has a command [`az webapp up`](https://learn.microsoft.com/cli/azure/webapp#az-webapp-up) that creates the necessary resources and deploys your application in a single step.

In the terminal, deploy the code in your local folder using the `az webapp up` command:

```azurecli
az webapp up --runtime "PHP:8.2" --os-type=linux
```

- If the `az` command isn't recognized, be sure you have [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) installed.
- The `--runtime "PHP:8.2"` argument creates the web app with PHP version 8.2.
- The `--os-type=linux` argument creates the web app on App Service on Linux.
- You can optionally specify a name with the argument `--name <app-name>`. If you don't provide one, then a name is automatically generated.
- You can optionally include the argument `--location <location-name>` where `<location_name>` is an available Azure region. You can retrieve a list of allowable regions for your Azure account by running the [`az account list-locations`](https://learn.microsoft.com/cli/azure/appservice#az-appservice-list-locations) command.
- If you see the error **Could not auto-detect the runtime stack of your app**, make sure you're running the command in the code directory. To learn more, see [Troubleshooting auto-detect issues with az webapp up](https://github.com/Azure/app-service-linux-docs/blob/master/AzWebAppUP/runtime_detection.md).

The command can take a few minutes to complete. While it's running, it provides messages about creating the resource group, the App Service plan, and the app resource, configuring logging, and doing ZIP deployment. It then provides the app's URL on Azure.

```
The webapp '<app-name>' doesn't exist
Creating Resource group '<group-name>' ...
Resource group creation complete
Creating AppServicePlan '<app-service-plan-name>' ...
Creating webapp '<app-name>' ...
Configuring default logging for the app, if not already enabled
Creating zip with contents of <directory-location> ...
Getting scm site credentials for zip deployment
Starting zip deployment. This operation can take a while to complete ...
Deployment endpoint responded with status code 202
You can launch the app at http://<app-name>.azurewebsites.net
{
  "URL": "http://<app-name>.azurewebsites.net",
  "appserviceplan": "<app-service-plan-name>",
  "location": "centralus",
  "name": "<app-name>",
  "os": "linux",
  "resourcegroup": "<group-name>",
  "runtime_version": "php|8.2",
  "runtime_version_detected": "0.0",
  "sku": "FREE",
  "src_path": "<directory-path>"
}
```


> **Note:**
> The `az webapp up` command does the following actions:
>
>- Create a default [resource group](https://learn.microsoft.com/cli/azure/group#az-group-create).
>
>- Create a default [App Service plan](https://learn.microsoft.com/cli/azure/appservice/plan#az-appservice-plan-create).
>
>- [Create an app](https://learn.microsoft.com/cli/azure/webapp#az-webapp-create) with the specified name.
>
>- [Zip deploy](deploy-zip.md#deploy-a-zip-package) all files from the current working directory, [with build automation enabled](deploy-zip.md#enable-build-automation-for-zip-deploy).
>
>- Cache the parameters locally in the *.azure/config* file so that you don't need to specify them again when deploying later with `az webapp up` or other `az webapp` commands from the project folder. The cached values are used automatically by default.
>

Browse to the deployed application in your web browser at the URL that's provided in the terminal.

### [Portal](#tab/portal)

1. Sign in to [the Azure portal](https://portal.azure.com).

1. At the top of the portal, type **app services** in the search box. Under **Services**, select **App Services**.

    Screenshot of the Azure portal with app services typed in the search text box.

1. In the **App Services** page, select **+ Create** and choose **Web App**.

1. In the **Basics** tab:

    - Under **Resource group**, select **Create new**. Type *myResourceGroup* for the name.
    - Under **Name**, type a globally unique name for your web app.
    - Under **Publish**, select **Code**.
    - Under **Runtime stack** select **PHP 8.2**.
    - Under **Operating System**, select **Linux**.
    - Under **Region**, select an Azure region close to you.
    - Under **App Service Plan**, create an app service plan named *myAppServicePlan*.
    - Under **Pricing plan**, select **Free F1**.

    Screenshot of new App Service app configuration for PHP in the Azure portal.

1. Select the **Deployment** tab at the top of the page.

1. Under **GitHub Actions settings**, set **Continuous deployment** to *Enable*.

1. Under **GitHub Actions details**, authenticate with your GitHub account, and select the following options:

    - For **Organization** select the organization where you forked the demo project.
    - For **Repository** select the *php-docs-hello-world* project.
    - For **Branch** select *main*.

    Screenshot of the deployment options for a PHP app.

    > **Note:**
    > By default, the creation wizard [disables basic authentication](configure-basic-auth-disable.md) and GitHub Actions deployment is created [using a user-assigned identity](deploy-continuous-deployment.md#what-does-the-user-assigned-identity-option-do-for-github-actions). If you get a permissions error during resource creation, your Azure account might not have [enough permissions](deploy-continuous-deployment.md#why-do-i-see-the-error-you-do-not-have-sufficient-permissions-on-this-app-to-assign-role-based-access-to-a-managed-identity-and-configure-federated-credentials). You can [configure GitHub Actions deployment later](deploy-continuous-deployment.md) with an identity generated for you by an Azure administrator, or you can also enable basic authentication instead.

1. Select the **Review + create** button at the bottom of the page.

1. After validation runs, select the **Create** button at the bottom of the page.

1. After deployment is completed, select **Go to resource**.
  
1. Browse to the deployed application in your web browser at the URL provided.

---

The PHP sample code is running in an Azure App Service.

Screenshot of the sample app running in Azure, showing Hello World.

**Congratulations!** You deployed your first PHP app to App Service using the Azure portal.

## Update and redeploy the app

### [Azure CLI](#tab/cli)

1. Locate the directory *php-docs-hello-world* and open the *index.php* file using a local text editor. Make a small change to the text within the string next to `echo`:

    ```php
    echo "Hello Azure!";
    ```

1. Save your changes, then redeploy the app using the [az webapp up](https://learn.microsoft.com/cli/azure/webapp#az-webapp-up) command again with these arguments:

    ```azurecli
    az webapp up --runtime "PHP:8.2" --os-type=linux
    ```

1. Once deployment is completed, return to the browser window that opened during the **Browse to the app** step, and refresh the page.

    Screenshot of the updated sample app running in Azure.

### [Portal](#tab/portal)

1. Browse to your GitHub fork of php-docs-hello-world.

1. On your repo page, press `.` to start Visual Studio Code within your browser.

    Screenshot of the forked php-docs-hello-world repo in GitHub with instructions to press the period key on this screen.

    > **Note:**
    > The URL changes from GitHub.com to GitHub.dev. This feature only works with repos that have files. This doesn't work on empty repos.

1. Edit *index.php* so that it shows *Hello Azure!* instead of *Hello World!*

    ```php
    <?php
        echo "Hello Azure!";
    ?>
    ```

1. From the **Source Control** menu, select the **Stage Changes** button to stage the change.

    Screenshot of Visual Studio Code in the browser, highlighting the Source Control navigation in the sidebar, then highlighting the Stage Changes button in the Source Control panel.

1. Enter a commit message such as *Hello Azure*. Then, select **Commit and Push**.

    Screenshot of Visual Studio Code in the browser, Source Control panel with a commit message of Hello Azure.

1. After deployment is complete, return to the browser window that opened during the **Browse to the app** step, and refresh the page.

    Screenshot of the updated sample app running in Azure, showing Hello Azure.

---

## Manage your new Azure app

1. Go to the Azure portal to manage the web app you created. Search for and select **App Services**.

    Screenshot of the Azure portal with app services typed in the search text box.

1. Select your Azure app to open it.

    Screenshot of the App Services list in Azure. The name of the demo app service is highlighted.

    Your web app's **Overview** page should be displayed. Here, you can perform basic management tasks like **Browse**, **Stop**, **Restart**, and **Delete**.

    Screenshot of the App Service overview page in Azure portal. In the action bar, the Browse, Stop, Swap, Restart, and Delete button group is highlighted.

    The web app menu provides different options for configuring your app.

## Clean up resources

When you're finished with the sample app, you can remove all of the resources for the app from Azure so you can avoid extra charges and keep your Azure subscription uncluttered. Removing the resource group also removes all resources in the resource group and is the fastest way to remove all Azure resources for your app.

### [Azure CLI](#tab/cli)

Delete the resource group by using the [az group delete](https://learn.microsoft.com/cli/azure/group#az-group-delete) command.

```azurecli-interactive
az group delete --name myResourceGroup
```

This command takes a minute to run.

### [Portal](#tab/portal)

1. From your App Service **Overview** page, select the resource group you created.

1. From the resource group page, select **Delete resource group**. Confirm the name of the resource group to finish deleting the resources.

---



## Related content

* [Deploy a PHP, MySQL, and Redis app to Azure App Service](tutorial-php-mysql-app.md)
* [Configure a PHP app for Azure App Service](configure-language-php.md)
* [Secure your app with a custom domain and a managed certificate](tutorial-secure-domain-certificate.md)
