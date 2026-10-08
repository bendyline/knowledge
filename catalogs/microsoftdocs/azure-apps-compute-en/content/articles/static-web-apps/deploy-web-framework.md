---
title: Deploy your web app to Azure Static Web Apps.
description: Learn to deploy your web app to Azure Static Web Apps.
services: static-web-apps
author: cjk7989
ms.service: azure-static-web-apps
ms.topic: article
ms.date: 09/18/2024
ms.author: jikunchen
zone_pivot_groups: swa-web-framework
---

# Deploy your web app to Azure Static Web Apps

In this article, you create a new web app with the framework of your choice, run it locally, then deploy to Azure Static Web Apps.

## Prerequisites

To complete this tutorial, you need:

| Resource | Description |
| --- | --- |
| [Azure subscription][1] | If you don't have one, you can [create an account for free][1]. |
| [Node.js][2] | Install version 20.0 or later. |
| [Azure CLI][3] | Install version 2.6x or later. |

You also need a text editor. For work with Azure, [Visual Studio Code][4] is recommended.

You can run the app you create in this article on the platform of your choice including: Linux, macOS, Windows, or Windows Subsystem for Linux.

## Create your web app

1. Open a terminal window.

**Applies to: vanilla-js**


2. Select an appropriate directory for your code, then run the following commands.

    ```bash
    npm create vite@latest swa-vanilla-demo -- --template=vanilla
    cd swa-vanilla-demo
    npm install
    npm run dev
    ```

    As you run these commands, the development server prints the URL of your website. Select the link to open it in your default browser.

    Screen shot of the generated vanilla web application.



**Applies to: angular**


2. Select an appropriate directory for your code, then run the following commands.

    ```bash
    npx --package @angular/cli@latest ng new swa-angular-demo --ssr=false --defaults
    cd swa-angular-demo
    npm start
    ```

    As you run these commands, the development server prints the URL of your website. Select the link to open it in your default browser.

    Screen shot of the generated angular web application.



**Applies to: react**


2. Select an appropriate directory for your code, then run the following commands.

    ```bash
    npm create vite@latest swa-react-demo -- --template react
    cd swa-react-demo
    npm install
    npm run dev
    ```

    As you run these commands, the development server prints the URL of your website. Select the link to open it in your default browser.

    Screen shot of the generated react web application.



**Applies to: vue**


2. Select an appropriate directory for your code, then run the following commands.

    ```bash
    npm create vite@latest swa-vue-demo -- --template vue
    cd swa-vue-demo
    npm install
    npm run dev
    ```

    As you run these commands, the development server prints the URL of your website. Select the link to open it in your default browser.

    Screen shot of the generated Vue web application.



3. Select <kbd>Cmd/Ctrl</kbd>+<kbd>C</kbd> to stop the development server.


## Create a static web app on Azure

You can create a static web app using the Azure portal, [Azure CLI][az2], [Azure PowerShell][az4], or Visual Studio Code (with the [Azure Static Web Apps extension][az3]). This tutorial uses the Azure CLI.

1. Sign into the Azure CLI:

    ```bash
    az login
    ```

    By default, this command opens a browser to complete the process. The Azure CLI supports [various methods for signing in][az5] if this method doesn't work in your environment.

1. If you have multiple subscriptions, you might need to [select a subscription][az6]. You can view your current subscription using the following command:

    ```bash
    az account show
    ```

    To select a subscription, you can run the `az account set` command.

    ```bash
    az account set --subscription "<SUBSCRIPTION_NAME_OR_ID>"
    ```

1. Create a resource group.

    Resource groups are used to group Azure resources together.

    ```bash
    az group create -n swa-tutorial -l centralus --query "properties.provisioningState"
    ```

    The `-n` parameter refers to the site name, and the `-l` parameter is the  Azure location name. The command concludes with `--query "properties.provisioningState"` so the command only returns a success or error message.

1. Create a static web app in your newly created resource group.

    ```bash
    az staticwebapp create -n swa-demo-site -g swa-tutorial --query "defaultHostname"
    ```

    The `-n` parameter refers to the site name, and the `-g` parameter refers to the name of the Azure resource group. Make sure you specify the same resource group name as in the previous step. Your static web app is globally distributed, so the location isn't important to how you deploy your app.

    The command is configured to return the URL of your web app. You can copy the value from your terminal window to your browser to view your deployed web app.

[portal]: https://portal.azure.com/#browse/Microsoft.Web%2FStaticSites
[az2]: https://learn.microsoft.com/cli/azure/staticwebapp
[az3]: https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps
[az4]: https://learn.microsoft.com/powershell/module/az.websites
[az5]: https://learn.microsoft.com/cli/azure/authenticate-azure-cli
[az6]: https://learn.microsoft.com/cli/azure/manage-azure-subscriptions-azure-cli#get-subscription-information



## Configure for deployment

1. Add a `staticwebapp.config.json` file to your application code with the following contents:

    ```json
    {
        "navigationFallback": {
            "rewrite": "/index.html"
        }
    }
    ```

    Defining a fallback route allows your site to server the `index.html` file for any requests made against the domain.

    Check this file into your source code control system (such as git) if you're using one.

1. Install the [Azure Static Web Apps (SWA) CLI][swacli] in your project.

    ```bash
    npm install -D @azure/static-web-apps-cli
    ```

    The SWA CLI helps you develop and test your site locally before you deploy it to the cloud.

1. Create a new file for your project and name it `swa-cli.config.json`.

    The `swa-cli.config.json` file describes how to build and deploy your site.

    Once this file is created, you can generate its contents using the `npx swa init` command.

    ```bash
    npx swa init --yes
    ```

1. Build your application for distribution.

    ```bash
    npx swa build
    ```

1. Use the SWA CLI to sign into Azure.

    ```bash
    npx swa login --resource-group swa-tutorial --app-name swa-demo-site
    ```

    Use the same resource group name and static web app name that you created in the previous section. As you attempt to log in, a browser opens to complete the process if necessary.

<!-- Links -->
[swacli]: https://azure.github.io/static-web-apps-cli/

**Applies to: angular**


> **Warning:**
> Angular v17 and later place the distributable files in a subdirectory of the output path that you can choose. The SWA CLI doesn't know the specific location of the directory. The following steps show you how to set this path correctly.

Locate the generated *index.html* file in your project in the *dist/swa-angular-demo/browser* folder.

1. Set the `SWA_CLI_OUTPUT_LOCATION` environment variable to the directory containing the *index.html* file:

    # [bash](#tab/bash)

    ```bash
    export SWA_CLI_OUTPUT_LOCATION="dist/swa-angular-demo/browser"
    ```

    # [csh](#tab/csh)

    ```bash
    setenv SWA_CLI_OUTPUT_LOCATION "dist/swa-angular-demo/browser"
    ```

    # [PowerShell](#tab/pwsh)

    ```powershell
    $env:SWA_CLI_OUTPUT_LOCATION="dist/swa-angular-demo/browser"
    ```

    # [CMD](#tab/cmd)

    ```bash
    set SWA_CLI_OUTPUT_LOCATION="dist/swa-angular-demo/browser"
    ```

    ---



## Deploy your site to Azure

Deploy your code to your static web app:

```bash
npx swa deploy --env production
```

It might take a few minutes to deploy the application. Once complete, the URL of your site is displayed.

Screen shot of the deploy command.

On most systems, you can select the URL of the site to open it in your default browser.


## Clean up resources (optional)

If you're not continuing with other tutorials, remove the Azure resource group and resources:

```bash
az group delete -n swa-tutorial
```

When you remove a resource group, you delete all the resources that it contains. You can't undo this action.


## Next steps

> 
> [Add authentication](add-authentication.md)

## Related content

* [Authentication and authorization](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/authentication-authorization.yml)
* [Database connections](database-overview.md)
* [Custom Domains](custom-domain.md)
* [Video series: Deploy websites to the cloud with Azure Static Web Apps](https://aka.ms/azure/beginnervideos/learn/swa)

<!-- Links -->
[1]: https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn
[2]: https://nodejs.org/
[3]: https://learn.microsoft.com/cli/azure/install-azure-cli
[4]: https://code.visualstudio.com

<!-- Images -->
[img-deploy]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/media/deploy-screenshot.png
[img-vanilla-js]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/media/deploy-web-framework/vanilla-js-screenshot.png
[img-angular]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/media/deploy-web-framework/angular-screenshot.png
[img-react]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/media/deploy-web-framework/react-screenshot.png
[img-vue]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/media/deploy-web-framework/vue-screenshot.png
