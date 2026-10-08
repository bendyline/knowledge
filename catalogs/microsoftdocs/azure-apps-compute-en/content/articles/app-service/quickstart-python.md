---
title: 'Quickstart: Deploy a Python (Django, Flask, or FastAPI) web app to Azure'
description: Get started with Azure App Service by deploying your first Python app to Azure App Service.
ms.topic: quickstart
ms.date: 07/27/2026
ms.author: msangapu
author: msangapu-msft
ms.devlang: python
ms.service: azure-app-service
ms.custom:
  - devx-azure-cli
  - devx-azure-portal
  - devx-vscode-azure-extension
  - devdivchpfy22
  - vscode-azure-extension-update-completed
  - devx-track-azurecli
  - devx-track-python
  - sfi-image-nochange
---

# Quickstart: Deploy a Python (Django, Flask, or FastAPI) web app to Azure App Service

In this quickstart, you deploy a Python web app (Django, Flask, or FastAPI) to [Azure App Service](overview.md). Azure App Service is a fully managed web hosting service that supports Python apps hosted in a Linux server environment.

To complete this quickstart, you need:

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- <a href="https://www.python.org/downloads/" target="_blank">Python 3.14 or higher</a> installed locally.

> **Note:**
> This article contains current instructions on deploying a Python web app using Azure App Service. Python on Windows is no longer supported.

## Skip to the end

You can quickly deploy the sample app in this tutorial using Azure Developer CLI and see it running in Azure. Just run the following commands in the [Azure Cloud Shell](https://shell.azure.com)want, and follow the prompt:

### [Flask](#tab/flask)

```bash
mkdir flask-quickstart
cd flask-quickstart
azd init --template https://github.com/Azure-Samples/msdocs-python-flask-webapp-quickstart
azd up
```

### [Django](#tab/django)

```bash
mkdir django-quickstart
cd django-quickstart
azd init --template https://github.com/Azure-Samples/msdocs-python-django-webapp-quickstart
azd up
```

### [FastAPI](#tab/fastapi)

```bash
mkdir fastapi-quickstart
cd fastapi-quickstart
azd init --template https://github.com/Azure-Samples/msdocs-python-fastapi-webapp-quickstart
azd up
```

---

And, to delete the resources:

```bash
azd down
```

## Sample application

This quickstart can be completed using either Flask, Django, or FastAPI. A sample application in each framework is provided to help you follow along with this quickstart. Download or clone the sample application to your local workstation.

### [Flask](#tab/flask)

```Console
git clone https://github.com/Azure-Samples/msdocs-python-flask-webapp-quickstart
```

### [Django](#tab/django)

```Console
git clone https://github.com/Azure-Samples/msdocs-python-django-webapp-quickstart
```

### [FastAPI](#tab/fastapi)

```Console
git clone https://github.com/Azure-Samples/msdocs-python-fastapi-webapp-quickstart.git
```

---

To run the application locally:

### [Flask](#tab/flask)

1. Go to the application folder:

    ```Console
    cd msdocs-python-flask-webapp-quickstart
    ```

1. Create a virtual environment for the app:

    #### [Windows](#tab/windows)

```cmd
py -m venv .venv
.venv\scripts\activate
```

#### [macOS/Linux](#tab/mac-linux)

```bash
python3 -m venv .venv
source .venv/bin/activate
```

---


1. Install the dependencies:

    ```Console
    pip install -r requirements.txt
    ```

1. Run the app:

    ```Console
    flask run
    ```

1. Browse to the sample application at `http://localhost:5000` in a web browser.

    Screenshot of the Flask app running locally in a browser

Having issues? [Let us know](https://aka.ms/PythonAppServiceQuickstartFeedback).

### [Django](#tab/django)

1. Go to the application folder:

    ```Console
    cd msdocs-python-django-webapp-quickstart
    ```

1. Create a virtual environment for the app:

    #### [Windows](#tab/windows)

```cmd
py -m venv .venv
.venv\scripts\activate
```

#### [macOS/Linux](#tab/mac-linux)

```bash
python3 -m venv .venv
source .venv/bin/activate
```

---


1. Install the dependencies:

    ```Console
    pip install -r requirements.txt
    ```

1. Run the app:

    ```Console
    python manage.py runserver
    ```

1. Browse to the sample application at `http://localhost:8000` in a web browser.

    Screenshot of the Django app running locally in a browser

Having issues? [Let us know](https://aka.ms/PythonAppServiceQuickstartFeedback).

### [FastAPI](#tab/fastapi)

1. Go to the application folder:

    ```Console
    cd msdocs-python-fastapi-webapp-quickstart
    ```

1. Create a virtual environment for the app:

    #### [Windows](#tab/windows)

```cmd
py -m venv .venv
.venv\scripts\activate
```

#### [macOS/Linux](#tab/mac-linux)

```bash
python3 -m venv .venv
source .venv/bin/activate
```

---


1. Install the dependencies:

    ```Console
    pip install -r requirements.txt
    ```

1. Run the app:

    ```Console
    uvicorn main:app --reload
    ```

1. Browse to the sample application at `http://localhost:8000` in a web browser.

    Screenshot of the FastAPI app running locally in a browser.

Having issues? [Let us know](https://aka.ms/PythonAppServiceQuickstartFeedback).

---

## Create a web app in Azure

To host your application in Azure, you need to create an Azure App Service web app in Azure. You can create a web app using the Azure CLI, [VS Code](https://code.visualstudio.com/), [Azure Tools extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack), or the [Azure portal](https://portal.azure.com/).

### [Azure CLI](#tab/azure-cli)

Azure CLI commands can be run on a computer with the [Azure CLI installed](https://learn.microsoft.com/cli/azure/install-azure-cli).

Azure CLI has a command `az webapp up` that will create the necessary resources and deploy your application in a single step.

If necessary, log in to Azure using [az login](https://learn.microsoft.com/cli/azure/authenticate-azure-cli).

```azurecli
az login
```

Create the webapp and other resources, then deploy your code to Azure using [az webapp up](https://learn.microsoft.com/cli/azure/webapp#az-webapp-up).

```azurecli
az webapp up --runtime PYTHON:3.14 --sku B1 --logs
```

* The `--runtime` parameter specifies what version of Python your app is running. This example uses Python 3.13. To list all available runtimes, use the command `az webapp list-runtimes --os linux --output table`.
* The `--sku` parameter defines the size (CPU, memory) and cost of the app service plan. This example uses the B1 (Basic) service plan, which will incur a small cost in your Azure subscription. For a full list of App Service plans, view the [App Service pricing](https://azure.microsoft.com/pricing/details/app-service/linux/) page.
* The `--logs` flag configures default logging required to enable viewing the log stream immediately after launching the webapp.
* You can optionally specify a name with the argument `--name <app-name>`. If you don't provide one, then a name will be automatically generated.
* You can optionally include the argument `--location <location-name>` where `<location_name>` is an available Azure region. You can retrieve a list of allowable regions for your Azure account by running the [`az appservice list-locations`](https://learn.microsoft.com/cli/azure/appservice#az-appservice-list-locations) command.

The command may take a few minutes to complete. While the command is running, it provides messages about creating the resource group, the App Service plan, and the app resource, configuring logging, and doing ZIP deployment. It then returns a message that includes the app's URL, which is the app's URL on Azure.

<pre>
The webapp '&lt;app-name>' doesn't exist
Creating Resource group '&lt;group-name>' ...
Resource group creation complete
Creating AppServicePlan '&lt;app-service-plan-name>' ...
Creating webapp '&lt;app-name>' ...
Configuring default logging for the app, if not already enabled
Creating zip with contents of dir /home/cephas/myExpressApp ...
Getting scm site credentials for zip deployment
Starting zip deployment. This operation can take a while to complete ...
Deployment endpoint responded with status code 202
You can launch the app at &lt;URL>
{
  "URL": "&lt;URL>",
  "appserviceplan": "&lt;app-service-plan-name>",
  "location": "centralus",
  "name": "&lt;app-name>",
  "os": "&lt;os-type>",
  "resourcegroup": "&lt;group-name>",
  "runtime_version": "python|3.14",
  "runtime_version_detected": "0.0",
  "sku": "FREE",
  "src_path": "&lt;your-folder-location>"
}
</pre>


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


### [VS Code](#tab/vscode-aztools)

To create Azure resources in VS Code, you must have the [Azure Tools extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) installed and be signed into Azure from VS Code.

> 
> [Download Azure Tools extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)

In the application folder, open VS Code:

```Console
code .
```

| Instructions | Screenshot |
| :--- | ---: |
| Locate the Azure icon in the left-hand toolbar. Select it to bring up the Azure Tools for VS Code extension.<br> |
<br>
If you do not see the Azure Tools icon, make sure you have the Azure Tools extension for VS Code installed. | A Screenshot of the Azure Tools icon in the left toolbar of VS Code. |
| In the Azure Tools extension for VS Code:

1. Find the **RESOURCES** section and select your subscription.
1. Select **+** (**Create Resource...**)
 | A screenshot of the App Service section of Azure Tools extension and the context menu used to create a new web app. |
| Choose the **Create App Service Web App...** option. | A screenshot of the dialog box in VS Code used to select Create a new Web App. |
| Enter the name *msdocs-python-webapp-quickstart-XYZ* for this web app, where *XYZ* is any three unique characters.<br>
<br>
When deployed, this name is used as your app name.
 | A screenshot of the dialog box in VS Code used to enter the globally unique name for the new web app. |
| Select the runtime stack for the application. In this example, select **Python 3.14**. | A screenshot of the dialog box in VS Code used to select the runtime stack for the new web app. |
| Select the App Service plan (pricing tier) for this web app. The App Service plan controls how many resources (CPU/memory) are available to your app and how much you pay.<br>
<br>
For this example, select the **Basic (B1)** pricing tier. This plan will incur a small charge against your Azure subscription but is recommended for better performance over the Free (F1) tier. | A screenshot of the dialog box in VS Code used to select a pricing tier for the new web app. |
| 
Select the **Deploy** button in the "Created new web app" notification.
 | A screenshot of the dialog box in VS Code used to deploy a new web app. |
| 
Select the quickstart folder you are working in as the one to deploy.
 | A screenshot of the dialog box in VS Code used to select the folder to deploy as the new web app. |
| Answer **Yes** to update your build configuration and improve deployment performance. | A screenshot of a dialog box in VS Code asking if you want to update your workspace to run build commands. |
| When the deployment is complete, a notification will appear in the lower right corner of VS Code. You can use this notification to browse to your web app. | A screenshot showing the confirmation dialog when the app code has been deployed to Azure. |

### [Azure portal](#tab/azure-portal)

Sign in to the [Azure portal](https://portal.azure.com/) and follow these steps to create your Azure App Service resources.

| Instructions | Screenshot |
| :--- | ---: |
| In the Azure portal: |

   1. Enter *app services* in the search bar at the top of the Azure portal.
   1. Select the item labeled **App Services** under the **Services** heading on the menu that appears below the search bar. | A screenshot of how to use the search box in the top tool bar to find App Services in Azure. |
| On the **App Services** page, select **+ Create**, then select **+ Web App** from the drop-down menu. | A screenshot of the location of the Create button on the App Services page in the Azure portal. |
| On the **Create Web App** page, fill out the form as follows.

1. **Resource Group** &rarr; Select **Create new** and use a name of *msdocs-python-webapp-quickstart*.
1. **Name** &rarr; *msdocs-python-webapp-quickstart-XYZ* where XYZ is any three random characters. This name must be unique across Azure.
1. **Runtime stack** &rarr; **Python 3.14**.
1. **Region** &rarr; Any Azure region near you.
1. **App Service Plan** &rarr; Under **Pricing plan**, select **Explore pricing plans** to select a different App Service plan. | A screenshot of how to fill out the form to create a new App Service in the Azure portal. |
| The App Service plan controls the amount of resources (CPU/memory) that are available to your app and the cost of those resources.<br>
<br>
For this example, under **Dev/Test**, select the **Basic B1** plan. The Basic B1 plan will incur a small charge against your Azure account but is recommended for better performance over the Free F1 plan.<br>
<br>
When finished, select **Select** to apply your changes. | A screenshot of how to select the basic app service plan in the Azure portal. |
| On the main **Create Web App** page, select the **Review + create** at the bottom of the screen.<br>
<br>
This will take you to the Review page. Select **Create** to create your App Service. | A screenshot of the location of the Review plus Create button in the Azure portal. |

---

Having issues? [Let us know](https://aka.ms/PythonAppServiceQuickstartFeedback).

## Deploy your application code to Azure

Azure App Service supports multiple methods to deploy your application code to Azure, including GitHub Actions and all major CI/CD tools. This article focuses on how to deploy your code from your local workstation to Azure.

### [Deploy using Azure CLI](#tab/azure-cli-deploy)

Since the `az webapp up` command created the necessary resources and deployed your application in a single step, you can move on to the next step.

---


### [Deploy using VS Code](#tab/vscode-deploy)

Since the previous step created the necessary resources and deployed your application in a single step, you can move on to the next step.

---


### [Deploy using a ZIP file](#tab/zip-deploy)

Applications can be deployed to Azure by creating and uploading a ZIP file of the application code to Azure. ZIP files can be uploaded to Azure using the Azure CLI or an HTTP client like [cURL](https://curl.se/).

### Enable build automation

When deploying a ZIP file of your Python code, you need to set a flag to enable Azure build automation. The build automation will install any necessary requirements and package the application to run on Azure.

Build automation in Azure is enabled by setting the `SCM_DO_BUILD_DURING_DEPLOYMENT` app setting in either the Azure portal or Azure CLI.

##### [Azure portal](#tab/deploy-instructions-azportal)

| Instructions | Screenshot |
| :--- | ---: |
| On the page for the web app in the Azure portal: |

1. Select **Configuration** under the **Settings** header in the left toolbar to bring up the Application settings.
1. Under **Application settings**, select **New application setting**. | A screenshot showing the app settings for a web app and how to add a new setting in the Azure portal. |
| Using the dialog, enter a new setting with:<br>
<br>
**Name** &rarr; *SCM_DO_BUILD_DURING_DEPLOYMENT*<br>
**Value** &rarr; *true*<br> | A screenshot showing the dialog box used to add an app setting in the Azure portal. |
| Select the **Save** to save your settings.<br>
 | A screenshot showing the location of the save button. |

##### [Azure CLI](#tab/deploy-instructions-azcli)

Use the [az webapp config appsettings set](https://learn.microsoft.com/cli/azure/webapp/config/appsettings#az-webapp-config-appsettings-set) command to set the `SCM_DO_BUILD_DURING_DEPLOYMENT` setting to a value of `true`.

##### [bash](#tab/terminal-bash)

```azurecli
# Change these values to the ones used to create the App Service.
RESOURCE_GROUP_NAME='msdocs-python-webapp-quickstart'
APP_SERVICE_NAME='msdocs-python-webapp-quickstart-123'

az webapp config appsettings set \
    --resource-group $RESOURCE_GROUP_NAME \
    --name $APP_SERVICE_NAME \
    --settings SCM_DO_BUILD_DURING_DEPLOYMENT=true
```

##### [PowerShell terminal](#tab/terminal-powershell)

```azurecli
# Change these values to the ones used to create the App Service.
$resourceGroupName='msdocs-python-webapp-quickstart'
$appServiceName='msdocs-python-webapp-quickstart-123'

az webapp config appsettings set `
    --resource-group $resourceGroupName `
    --name $appServiceName `
    --settings SCM_DO_BUILD_DURING_DEPLOYMENT=true
```

---


---

### Create a ZIP file of your application

Next, create a ZIP file of your application. You only need to include components of the application itself. You do not need to include any files or directories that start with a dot (`.`) such as `.venv`, `.gitignore`, `.github`, or `.vscode`.

#### [Windows](#tab/windows)

On Windows, use a program like 7-Zip to create a ZIP file needed to deploy the application.

A screenshot showing files being zipped into a ZIP file using 7-Zip.

#### [macOS/Linux](#tab/mac-linux)

On macOS or Linux, you can use the built-in `zip` utility to create a ZIP file.

```bash
zip -r <file-name>.zip . -x '.??*'
```

---

### Upload the ZIP file to Azure

Once you have a ZIP file, the file can be uploaded to Azure using either Azure CLI or an HTTP client like cURL.

#### [Azure CLI](#tab/deploy-instructions-zip-azcli)

The [az webapp deploy](https://learn.microsoft.com/cli/azure/webapp#az-webapp-deploy) command can be used to upload and deploy a zip file to Azure.

##### [bash](#tab/terminal-bash)

```azurecli
# Change these values to the ones used to create the App Service.
RESOURCE_GROUP_NAME='msdocs-python-webapp-quickstart'
APP_SERVICE_NAME='msdocs-python-webapp-quickstart-123'

az webapp deploy \
    --name $APP_SERVICE_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --src-path <zip-file-path>
```

##### [PowerShell terminal](#tab/terminal-powershell)

```azurecli
# Change these values to the ones used to create the App Service.
$resourceGroupName='msdocs-python-webapp-quickstart'
$appServiceName='msdocs-python-webapp-quickstart-123'

az webapp deploy `
    --name $appServiceName `
    --resource-group $resourceGroupName `
    --src-path <zip-file-path>
```

---


#### [cURL](#tab/deploy-instructions-zip-curl)

To use cURL to upload your ZIP file to Azure, you will need the deployment username and password for your App Service. These credentials can be obtained from the Azure portal.

1. On the page for the web app, select **Deployment center** from the menu on the left side of the page.
1. Select the **FTPS credentials** tab.
1. The **Username** and **Password** are shown under the **Application scope** heading.  For zip file deployments, only use the part of the username after the `\` character that starts with a `$`, for example `$msdocs-python-webapp-quickstart-123`. These credentials will be needed in the cURL command.

A screenshot showing the location of the deployment credentials in the Azure portal.

Run the following `curl` command to upload your zip file to Azure and deploy your application.  The username is the deployment username obtained in step 3.  When this command is run, you will be prompted for the deployment password.

Get the \<URL> from your Kudu Environment: 

1. Open your app in the Azure portal and select **Development Tools** > **Advanced Tools**, then select **Go**.
1. Copy the value from the address bar and append */api/zipdeploy*.

##### [bash](#tab/terminal-bash)

```bash
curl -X POST \
    -H 'Content-Type: application/zip' \
    -u '<deployment-user>' \
    -T <zip-file-name> \
    <URL>
```

##### [PowerShell terminal](#tab/terminal-powershell)

For PowerShell, make sure to enclose the username in single quotes so PowerShell does not try to interpret the username as a PowerShell variable.

```powershell
curl -X POST `
    -H 'Content-Type: application/zip' `
    -u '<deployment-user>' `
    -T <zip-file-name> `
    <URL>
```

---


Depending on your network bandwidth, files usually take between 10 and 30 seconds to upload to Azure.

---


---

Having issues? Refer first to the [Troubleshooting guide](configure-language-python.md#troubleshooting). If that doesn't help, [let us know](https://aka.ms/PythonAppServiceQuickstartFeedback).

## Configure startup script

Based on the presence of certain files in a deployment, App Service automatically detects whether an app is a Django or Flask app and performs default steps to run your app. For apps based on other web frameworks like FastAPI, you might need to configure a startup script for App Service to run your app. Otherwise, App Service runs a default read-only app located in the *opt/defaultsite* folder.

- **Python 3.14 and later**: App Service automatically detects and runs FastAPI apps. No startup command is required.
- **Python 3.13 and earlier**: You must configure a custom startup command.

To learn more about how App Service runs Python apps and how you can configure and customize its behavior with your app, see [Configure a Linux Python app for Azure App Service](configure-language-python.md).

### [Azure CLI](#tab/azure-cli/flask)

App Service automatically detects the presence of a Flask app. No additional configuration is needed for this quickstart.

### [Azure CLI](#tab/azure-cli/django)

App Service automatically detects the presence of a Django app. No additional configuration is needed for this quickstart.

### [Azure CLI](#tab/azure-cli/fastapi)

If you're using **Python 3.14 or later**, App Service automatically detects and runs your FastAPI app. No extra configuration is needed for this quickstart.

If you're using **Python 3.13 or earlier**, you must configure a custom startup command for App Service to run your app. The following command starts Gunicorn with two Uvicorn worker processes: `gunicorn -w 2 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000 main:app`.

First, configure the startup command using the [az webapp config set](https://learn.microsoft.com/cli/azure/webapp/config#az-webapp-config-set) command.

```azurecli
az webapp config set \
    --startup-file "gunicorn -w 2 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000 main:app" \
    --name $APP_SERVICE_NAME \
    --resource-group $RESOURCE_GROUP_NAME
```

Next, restart the web app using the [az webapp restart](https://learn.microsoft.com/cli/azure/webapp#az-webapp-restart) command.

```azurecli
az webapp restart \
    --name $APP_SERVICE_NAME \
    --resource-group $RESOURCE_GROUP_NAME
```

### [VS Code](#tab/vscode-aztools/flask)

App Service automatically detects the presence of a Flask app. No additional configuration is needed for this quickstart.

### [VS Code](#tab/vscode-aztools/django)

App Service automatically detects the presence of a Django app. No additional configuration is needed for this quickstart.

### [VS Code](#tab/vscode-aztools/fastapi)

If you're using **Python 3.13 or earlier**, use Azure CLI or the Azure portal to configure the startup command.

### [Azure portal](#tab/azure-portal/flask)

App Service automatically detects the presence of a Flask app. No additional configuration is needed for this quickstart.

### [Azure portal](#tab/azure-portal/django)

App Service automatically detects the presence of a Django app. No additional configuration is needed for this quickstart.

### [Azure portal](#tab/azure-portal/fastapi)

If you're using **Python 3.14 or later**, App Service automatically detects and runs your FastAPI app. You don't need any extra configuration for this quickstart.

If you're using **Python 3.13 or earlier**, you must configure a custom startup command for App Service to run your app. The following command starts Gunicorn with two Uvicorn worker processes: `gunicorn -w 2 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000 main:app`.

| Instructions | Screenshot |
| :--- | ---: |
| If you're using **Python 3.13 or earlier**, configure the startup command in Azure App Service. Go to the App Service instance in the Azure portal.<br> |
<br>
1. Select **Configuration** under the **Settings** heading in the menu on the left side of the page.
1. Make sure the **General settings** tab is selected.
1. In the **Startup Command** field, enter *gunicorn -w 2 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000 main:app*.
1. Select **Save** to save your changes.
1. Wait for the notification that the settings are updated before proceeding.

If you're using **Python 3.14 or later**, no startup command is required.
 | A screenshot of the location in the Azure portal where to configure the startup command. |
| Next, restart the web app.<br>
<br>
1. Select **Overview** in the menu on the left side of the page.
1. On the top menu, select **Restart**.
 | A screenshot of how to reset the web app in the Azure portal. |

---

## Browse to the app

Browse to the deployed application in your web browser. You can follow a link from the Azure portal. Go to the **Overview** page and select **Default Domain**. If you see a default app page, wait a minute and refresh the browser.

The Python sample code is running a Linux container in App Service using a built-in image.

Screenshot of the app running in Azure

**Congratulations!** You've deployed your Python app to App Service.

Having issues? Refer first to the [Troubleshooting guide](configure-language-python.md#troubleshooting). If that doesn't help, [let us know](https://aka.ms/PythonAppServiceQuickstartFeedback).

## Stream logs

Azure App Service captures all message output to the console to assist you in diagnosing issues with your application. The sample apps include `print()` statements to demonstrate this capability.

### [Flask](#tab/flask)

[Code reference unavailable in this source snapshot: ~/msdocs-python-flask-webapp-quickstart/app.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/quickstart-python.md)

### [Django](#tab/django)

[Code reference unavailable in this source snapshot: ~/msdocs-python-django-webapp-quickstart/hello_azure/views.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/quickstart-python.md)

### [FastAPI](#tab/fastapi)

[Code reference unavailable in this source snapshot: ~/msdocs-python-fastapi-webapp-quickstart/main.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/quickstart-python.md)

---

You can review the contents of the App Service diagnostic logs by using the Azure CLI, VS Code, or the Azure portal.

### [Azure CLI](#tab/azure-cli)

First, you need to configure Azure App Service to output logs to the App Service filesystem by using the [az webapp log config](https://learn.microsoft.com/cli/azure/webapp/log#az-webapp-log-config) command.

#### [bash](#tab/terminal-bash)

```azurecli
az webapp log config \
    --web-server-logging filesystem \
    --name $APP_SERVICE_NAME \
    --resource-group $RESOURCE_GROUP_NAME
```

#### [PowerShell terminal](#tab/terminal-powershell)

```azurecli
az webapp log config `
    --web-server-logging 'filesystem' `
    --name $APP_SERVICE_NAME `
    --resource-group $RESOURCE_GROUP_NAME
```

---


To stream logs, use the [az webapp log tail](https://learn.microsoft.com/cli/azure/webapp/log#az-webapp-log-tail) command.

#### [bash](#tab/terminal-bash)

```azurecli
az webapp log tail \
    --name $APP_SERVICE_NAME \
    --resource-group $RESOURCE_GROUP_NAME
```
#### [PowerShell terminal](#tab/terminal-powershell)

```azurecli
az webapp log tail `
    --name $APP_SERVICE_NAME `
    --resource-group $RESOURCE_GROUP_NAME
```

---


Refresh the home page in the app or attempt other requests to generate some log messages. The output should look similar to the following.

```Output
Starting Live Log Stream ---

2021-12-23T02:15:52.740703322Z Request for index page received
2021-12-23T02:15:52.740740222Z 169.254.130.1 - - [23/Dec/2021:02:15:52 +0000] "GET / HTTP/1.1" 200 1360 "https://msdocs-python-webapp-quickstart-123.azurewebsites.net/hello" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0"
2021-12-23T02:15:52.841043070Z 169.254.130.1 - - [23/Dec/2021:02:15:52 +0000] "GET /static/bootstrap/css/bootstrap.min.css HTTP/1.1" 200 0 "https://msdocs-python-webapp-quickstart-123.azurewebsites.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0"
2021-12-23T02:15:52.884541951Z 169.254.130.1 - - [23/Dec/2021:02:15:52 +0000] "GET /static/images/azure-icon.svg HTTP/1.1" 200 0 "https://msdocs-python-webapp-quickstart-123.azurewebsites.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0"
2021-12-23T02:15:53.043211176Z 169.254.130.1 - - [23/Dec/2021:02:15:53 +0000] "GET /favicon.ico HTTP/1.1" 404 232 "https://msdocs-python-webapp-quickstart-123.azurewebsites.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0"

2021-12-23T02:16:01.304306845Z Request for hello page received with name=David
2021-12-23T02:16:01.304335945Z 169.254.130.1 - - [23/Dec/2021:02:16:01 +0000] "POST /hello HTTP/1.1" 200 695 "https://msdocs-python-webapp-quickstart-123.azurewebsites.net/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0"
2021-12-23T02:16:01.398399251Z 169.254.130.1 - - [23/Dec/2021:02:16:01 +0000] "GET /static/bootstrap/css/bootstrap.min.css HTTP/1.1" 304 0 "https://msdocs-python-webapp-quickstart-123.azurewebsites.net/hello" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0"
2021-12-23T02:16:01.430740060Z 169.254.130.1 - - [23/Dec/2021:02:16:01 +0000] "GET /static/images/azure-icon.svg HTTP/1.1" 304 0 "https://msdocs-python-webapp-quickstart-123.azurewebsites.net/hello" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0"
```

### [VS Code](#tab/vscode-aztools)

| Instructions | Screenshot |
| :--- | ---: |
| First, you need to enable streaming logs in Azure App Service.<br> |
<br>
In the **App Service** section of the Azure Tools for VS Code extension, right-click on your App Service instance and select **Start Streaming Logs** from the menu. | A screenshot of how to start streaming logs with the VS Code extension. |
| The console logs appear in the VS Code Output window. Refresh the home page in the app or attempt other requests to generate some log messages.<br>
<br>
You'll see any log messages generated by your app as well as other messages generated by the service in the output. | A screenshot of an example of streaming logs in the VS Code Output window. |

### [Azure portal](#tab/azure-portal)

| Instructions | Screenshot |
| :--- | ---: |
| First, you need to enable streaming logs in Azure App Service. Navigate to the page for the App Service instance in the Azure portal.<br> |
<br>
1. Select **App Service logs** under the **Monitoring** heading in the menu on the left side of the page.
1. Change the **Application Logging** property from **Off** to **File System**.
1. Enter a retention period of 30 days for the logs.
1. Select **Save** to save your changes. | A screenshot of the location in the Azure portal where you enable streaming logs. |
| Select **Log stream** from the **Monitoring** section in the navigation pane on the left. Refresh the home page in the app or attempt other requests to generate some log messages.<br>
<br>
You'll see any log messages generated by your app and messages generated by the service in the output. | A screenshot of how to view logs in the Azure portal. |

---

Having issues? Refer first to the [Troubleshooting guide](configure-language-python.md#troubleshooting). If that doesn't help, [let us know](https://aka.ms/PythonAppServiceQuickstartFeedback).

## Clean up resources

When you're finished with the sample app, you can remove all of the resources for the app from Azure. Removing the resource group ensures that you don't incur extra charges and helps keep your Azure subscription uncluttered. Removing the resource group also removes all resources in the resource group and is the fastest way to remove all Azure resources for your app.

### [Azure CLI](#tab/azure-cli)

Delete the resource group by using the [az group delete](https://learn.microsoft.com/cli/azure/group#az-group-delete) command.

```azurecli
az group delete \
    --name msdocs-python-webapp-quickstart \
    --no-wait
```

The `--no-wait` argument allows the command to return before the operation is complete.

### [VS Code](#tab/vscode-aztools) 

| Instructions | Screenshot |
| :--- | ---: |
| In the Azure Tools extension for VS Code: |

1. Find the **RESOURCES** section.
1. Select the **Group By** icon and select **Group by Resource Group**. | A screenshot of how to delete a resource group in VS Code using the Azure Tools extension. |
| 
In the list of resources, find the resource group to delete, right-click it, and select **Delete Resource Group...**. You'll be prompted to confirm the deletion by entering the name of the resource group in the dialog box. | A screenshot of the confirmation dialog for deleting a resource group from VS Code. |

### [Azure portal](#tab/azure-portal)

Follow these steps while signed-in to the Azure portal to delete a resource group.

| Instructions | Screenshot |
| :--- | ---: |
| Navigate to the resource group in the Azure portal. |

1. Enter the name of the resource group in the search bar at the top of the page.
1. Under the **Resource Groups** heading, select the name of the resource group to navigate to it. | A screenshot of how to search for and navigate to a resource group in the Azure portal. |
| Select the **Delete resource group** button at the top of the page. | A screenshot of the location of the Delete Resource Group button in the Azure portal. |
| In the confirmation dialog, enter the name of the resource group to confirm deletion.  Select **Delete** to delete the resource group. | A screenshot of the confirmation dialog for deleting a resource group in the Azure portal. |

---

Having issues? [Let us know](https://aka.ms/PythonAppServiceQuickstartFeedback).

## Next steps

> 
> [Tutorial: Python (Flask) web app with PostgreSQL](tutorial-python-postgresql-app-flask.md)

> 
> [Tutorial: Python (Django) web app with PostgreSQL](tutorial-python-postgresql-app-django.md)

> 
> [Configure a Python app](configure-language-python.md)

> 
> [Add user sign-in to a Python web app](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/quickstart-v2-python-webapp.md)

> 
> [Tutorial: Run a Python app in a custom container](tutorial-custom-container.md)

> 
> [Secure an app with a custom domain and certificate](tutorial-secure-domain-certificate.md)
