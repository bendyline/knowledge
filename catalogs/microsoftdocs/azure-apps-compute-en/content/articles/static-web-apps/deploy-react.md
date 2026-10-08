---
title: 'Deploy a React app on Azure Static Web Apps'
description: Learn to deploy a React app to Azure Static Web Apps with the Azure portal.
services: static-web-apps
author: cjk7989
ms.service: azure-static-web-apps
ms.topic:  how-to
ms.date: 05/23/2024
ms.author: jikunchen
zone_pivot_groups: devops-or-github
---

# Deploy a React app on Azure Static Web Apps

In this article, you learn to deploy a React application to Azure Static Web Apps using the Azure portal.

## Prerequisites


**Applies to: github**

| Resource | Notes |
| --- | --- |
| Azure subscription | If you don't have an Azure subscription, [create a free trial account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). |
| GitHub account | If you don't have a GitHub account, you can [create one for free](https://github.com). |


**Applies to: azure-devops**

| Resource | Notes |
| --- | --- |
| Azure subscription | If you don't have an Azure subscription, [create a free trial account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). |
| Azure DevOps account | If you don't have a GitHub account, you can [create one](https://azure.microsoft.com/services/devops). |


## Create a repository

**Applies to: github**


This article uses a GitHub template repository to make it easy for you to get started. The template features a starter app to deploy to Azure Static Web Apps.

1. Navigate to the following location to create a new repository:

    [https://github.com/staticwebdev/react-basic/generate](https://github.com/login?return_to=%2Fstaticwebdev%2Freact-basic%2Fgenerate)

1. Name your repository **my-first-static-web-app**.

1. Select **Create repository from template**.

    Screenshot of create repository from template button.



**Applies to: azure-devops**


This article uses an Azure DevOps repository to make it easy for you to get started. The repository features a starter app used to deploy using Azure Static Web Apps.

1. Sign in to Azure DevOps.
2. Select **New repository**.
3. In the *Create new project* window, expand the **Advanced** menu and make the following selections:

    | Setting | Value |
    | --- | --- |
    | Project | Enter **my-first-web-static-app**. |
    | Visibility | Select **Private**. |
    | Version control | Select **Git**. |
    | Work item process | Select the option that best suits your development methods. |

4. Select **Create**.
5. Select the **Repos** menu item.
6. Select the **Files** menu item.
7. Under the *Import repository* card, select **Import**.
8. Copy a repository URL for the framework of your choice, and paste it into the *Clone URL* box.
  
    [https://github.com/staticwebdev/react-basic.git](https://github.com/staticwebdev/react-basic.git)

9. Select **Import** and wait for the import process to complete.



## Create a static web app


Now that the repository is created, you can create a static web app from the Azure portal.

1. Go to the [Azure portal](https://portal.azure.com).
1. Select **Create a Resource**.
1. Search for **Static Web App**.
1. Select **Static Web App**.
1. Select **Create**.

**Applies to: github**


In the _Basics_ section, begin by configuring your new app and linking it to a GitHub repository.

Screenshot of the basics section in the Azure portal.

| Setting | Value |
| --- | --- |
| Subscription | Select your Azure subscription. |
| Resource Group | Select the **Create new** link, and enter **static-web-apps-test** in the textbox. |
| Name | Enter **my-first-static-web-app** in the textbox. |
| Plan type | Select **Free**. |
| Source | Select **GitHub** and sign in to GitHub if necessary. |

Once you are signed in with GitHub, enter the repository information.

| Setting | Value |
| --- | --- |
| Organization | Select your organization. |
| Repository | Select **my-first-web-static-app**. |
| Branch | Select **main**. |

Screenshot of repository details in the Azure portal.

> **Note:**
> If you don't see any repositories:
> - You may need to authorize Azure Static Web Apps in GitHub. Browse to your GitHub repository and go to **Settings > Applications > Authorized OAuth Apps**, select **Azure Static Web Apps**, and then select **Grant**.
> - You may need to authorize Azure Static Web Apps in your Azure DevOps organization. You must be an owner of the organization to grant the permissions. Request third-party application access via OAuth. For more information, see [Authorize access to REST APIs with OAuth 2.0](https://learn.microsoft.com/azure/devops/integrate/get-started/authentication/oauth).



**Applies to: azure-devops**


In the _Basics_ section, begin by configuring your new app and linking it to an Azure DevOps repository.

| Setting | Value |
| --- | --- |
| Subscription | Select your Azure subscription. |
| Resource Group | Select the **Create new** link, and enter **static-web-apps-test** in the textbox. |
| Name | Enter **my-first-static-web-app** in the textbox. |
| Plan type | Select **Free**. |
| Source | Select **DevOps**. |
| Organization | Select your organization. |
| Project | Select your project. |
| Repository | Select **my-first-web-static-app**. |
| Branch | Select **main**. |

> **Note:**
> Make sure the branch you are using is not protected, and that you have sufficient permissions to issue a `push` command. To verify, browse to your DevOps repository and go to **Repos** -> **Branches** and select **More options**. Next, select your branch, and then **Branch policies** to ensure required policies aren't enabled.



In the _Build Details_ section, add configuration details specific to your preferred front-end framework.

1. Select **React** from the _Build Presets_ dropdown.

1. Keep the default value in the _App location_ box.

1. Leave the _Api location_ box empty.

1. Type **build** in the _App artifact location_ box.

Select **Review + create**.

Screenshot of the create button.

**Applies to: github**


> **Note:**
> You can edit the [workflow file](build-configuration.md) to change these values after you create the app.



Select **Create**.

Screenshot of  the create button.

Select **Go to resource**.

Screenshot of the proceed to resource button.

## View the website


There are two aspects to deploying a static app. The first creates the underlying Azure resources that make up your app. The second is a workflow that builds and publishes your application.

Before you can go to your new static site, the deployment build must first finish running.

The Static Web Apps *Overview* window displays a series of links that help you interact with your web app.

**Applies to: github**


Screenshot of Azure Static Web Apps overview window.

1. Selecting _GitHub Action runs_ in the Overview takes you to the GitHub Actions running against your repository.  Verify that the deployment action is complete before continuing. 

1. Once the GitHub Actions workflow is complete, you can select the _URL_ link to open the website in new tab.



**Applies to: azure-devops**


Once the  workflow is complete, you can select the _URL_ link to open the website in new tab.



## Clean up resources


If you're not going to continue to use this application, you can delete the Azure Static Web Apps instance through the following steps:

1. Open the [Azure portal](https://portal.azure.com).
1. Search for **my-first-web-static-app** from the top search bar.
1. Select the app name.
1. Select **Delete**.
1. Select **Yes** to confirm the delete action (this action may take a few moments to complete).

## Next steps

> 
> [Add an API to your application](add-api.md?tabs=react)
