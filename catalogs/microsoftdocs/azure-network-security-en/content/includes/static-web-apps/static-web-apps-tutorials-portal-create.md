---
ms.service: azure-static-web-apps
ms.topic:  include
ms.date: 08/02/2023
author: cjk7989
ms.author: jikunchen
---

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
