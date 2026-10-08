---
author: baanders
description: include file describing how to configure an Azure function to work with Azure Digital Twins - CLI instructions
ms.service: azure-digital-twins
ms.topic: include
ms.date: 03/13/2025
ms.author: baanders
---

Run the following commands in [Azure Cloud Shell](https://shell.azure.com) or a [local Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).


>**Note:**
> An Azure user who has permissions to manage user access to Azure resources, including granting and delegating permissions, must complete this section. Common roles that meet this requirement are **Owner**, **Account admin**, or the combination of **User Access Administrator** and **Contributor**. For more information about permission requirements for Azure Digital Twins roles, see [Set up an instance and authentication](../how-to-set-up-instance-portal.md#prerequisites-permission-requirements).


#### Assign an access role

The Azure function requires a bearer token to be passed to it. To make sure the bearer token is passed, grant the function app the **Azure Digital Twins Data Owner** role for your Azure Digital Twins instance, which gives the function app permission to perform data plane activities on the instance.

1. Use the following command to create a [system-managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) for your function (if the function already has one, this command prints its details). Take note of the `principalId` field in the output. You'll use this ID to refer to the function so that you can grant it permissions in the next step.

    ```azurecli-interactive	
    az functionapp identity assign --resource-group <your-resource-group> --name <your-function-app-name>	
    ```

1. Use the `principalId` value in the following command to give the function the **Azure Digital Twins Data Owner** role for your Azure Digital Twins instance.

    ```azurecli-interactive	
    az dt role-assignment create --dt-name <your-Azure-Digital-Twins-instance> --assignee "<principal-ID>" --role "Azure Digital Twins Data Owner"
    ```

#### Configure application settings

Next, make the URL of your Azure Digital Twins instance accessible to your function by setting an [environment variable](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-how-to-use-azure-function-app-settings.md?tabs=portal#use-application-settings) for it.

> **Tip:**
> The Azure Digital Twins instance's URL is made by adding *https://* to the beginning of your instance's host name. To see the host name, along with all the properties of your instance, run `az dt show --dt-name <your-Azure-Digital-Twins-instance>`.

The following command sets an environment variable for your instance's URL that your function uses whenever it needs to access the instance.

```azurecli-interactive	
az functionapp config appsettings set --resource-group <your-resource-group> --name <your-function-app-name> --settings "ADT_SERVICE_URL=https://<your-Azure-Digital-Twins-instance-host-name>"
```
