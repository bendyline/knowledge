---
author: DavidCBerry13
ms.author: daberry
ms.topic: include
ms.date: 01/29/2022
ms.service: azure-app-service
ms.custom:
  - sfi-image-nochange
  - sfi-ropc-nochange
---
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
