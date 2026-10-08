---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 06/20/2022
ms.author: glenga
ms.custom: devdivchpfy22
---

## <a name="publish-the-project-to-azure"></a>Create the function app in Azure


In this section, you create a function app in the Flex Consumption plan along with related resources in your Azure subscription. Many of the resource creation decisions are made for you based on default behaviors. For more control over the created resources, you must instead [create your function app with advanced options](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs-code.md?tabs=advanced-options#publish-to-azure).

1. In Visual Studio Code, select F1 to open the command palette. At the prompt (`>`), enter and then select **Azure Functions: Create Function App in Azure**.

1. At the prompts, provide the following information:

    | Prompt | Action |
    | --- | --- |
    | **Select subscription** | Select the Azure subscription to use. The prompt doesn't appear when you have only one subscription visible under **Resources**. |
    | **Enter a new function app name** | Enter a globally unique name that's valid in a URL path. The name you enter is validated to make sure that it's unique in Azure Functions. |
    | **Select a location for new resources** | Select an Azure region. For better performance, select a [region](https://azure.microsoft.com/explore/global-infrastructure/geographies/) near you. Only regions supported by Flex Consumption plans are displayed. |
    | **Select a runtime stack** | Select the language version you currently run locally. |
    | **Select resource authentication type** | Select **Managed identity**, which is the most secure option for connecting to the [default host storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/storage-considerations.md#storage-account-guidance). |

    In the **Azure: Activity Log** panel, the Azure extension shows the status of individual resources as they're created in Azure.

    Screenshot that shows the log of Azure resource creation.

1. When the function app is created, the following related resources are created in your Azure subscription. The resources are named based on the name you entered for your function app.

    
+ A [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md), which is a logical container for related resources.
+ A function app, which provides the environment for executing your function code. A function app lets you group functions as a logical unit for easier management, deployment, and sharing of resources within the same hosting plan.
+ An Azure App Service plan, which defines the underlying host for your function app.
+ A standard [Azure Storage account](../articles/storage/common/storage-account-create.md), which is used by the Functions host to maintain state and other information about your function app.
+ An Application Insights instance that's connected to the function app, and which tracks the use of your functions in the app.
+ A user-assigned managed identity that's added to the [Storage Blob Data Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/storage#storage-blob-data-contributor) role in the new default host storage account.



    A notification is displayed after your function app is created and the deployment package is applied.

        
> **Tip:**
> By default, the Azure resources required by your function app are created based on the name you enter for your function app. By default, the resources are created with the function app in the same, new resource group. If you want to customize the names of the associated resources or reuse existing resources, [publish the project with advanced create options](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-develop-vs-code.md?tabs=advanced-options#publish-to-azure).
    


## Deploy the project to Azure


> **Important:**
> Deploying to an existing function app always overwrites the contents of that app in Azure.

1. In the command palette, enter and then select **Azure Functions: Deploy to Function App**.  

1. Select the function app you just created. When prompted about overwriting previous deployments, select **Deploy** to deploy your function code to the new function app resource.

1. When deployment is completed, select **View Output** to view the creation and deployment results, including the Azure resources that you created. If you miss the notification, select the bell icon in the lower-right corner to see it again.

    Screenshot of the View Output window.
