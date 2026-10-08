---
title: Create project
description: Describes how to create project
author: ankitsurkar06
ms.author: v-gajeronika
ms.service: azure-migrate
ms.topic: how-to
ms.date: 04/11/2025
# Customer intent: As a cloud migration specialist, I want to create a new project in Azure Migrate, so that I can store and manage discovery, assessment, and migration metadata for efficient cloud transition.
---

# Create project

**Applies to: migrate**

This article shows you how to create a project. A project is used to store discovery, business case, assessment, and migration metadata collected from the environment you're assessing or migrating. Within a project, you can track discovered assets, create business cases, conduct assessments, and orchestrate migrations to Azure.


**Applies to: migrate-classic**

A project is used to store discovery, assessment, and migration metadata collected from the environment you're assessing or migrating. In a project, you can track discovered assets, create assessments, and orchestrate migrations to Azure.  


## Verify permissions

Ensure you have the correct permissions to create a project using the following steps:

1. In the Azure portal, open the relevant subscription, and select **Access control (IAM)**.
2. In **Check access**, find the relevant account, and select it and view permissions. You should have *Azure Migrate Owner* or a role with higher permissions. [Learn more](prepare-azure-accounts.md). 

 > **Note:**
 > - Starting November 2025, only users assigned the **Azure Migrate Owner** or a higher privileged role will be able to create Azure Migrate projects. Users without these role assignments will no longer have the required permissions to create new projects.
> - For the required Azure Migrate built‑in roles and permission details to create a project and run discovery, assessments, and migrations, see [Prepare Azure accounts for Azure Migrate](prepare-azure-accounts.md).

**Applies to: migrate**

Set up a new project in an Azure subscription.

1. In the Azure portal, search for *Azure Migrate*.
1. In **Services**, select **Azure Migrate**.
1. In **Get started**, select **Discover, assess and migrate**.

    Screenshot shows how to create project.

1. In Servers, databases and web apps, select **Create project**.
   Screenshot of button to start creating a project.
1. In **Create project**, select the Azure subscription and resource group. Create a resource group if you don't have one.
1. In **Project Details**, specify the project name and the geography in which you want to create the project.
    - The region is only used to store the metadata gathered from on-premises servers. You can assess or migrate servers for any target region regardless of the selected region.
    - Review supported regions for [public](supported-geographies.md#public-cloud) and [government clouds](supported-geographies.md#azure-government). 

    > **Note:**
    > Use the **Advanced** configuration section to create an Azure Migrate project with private endpoint connectivity. [Learn more](discover-and-assess-using-private-endpoints.md#create-a-project-with-private-endpoint-connectivity). 

6. Select **Create**.

    Image of Azure Migrate page to create project.

Wait for a few minutes for the project to deploy.


**Applies to: migrate-classic**

Set up a new project in an Azure subscription.

1. In the Azure portal, search for *Azure Migrate*.
2. In **Services**, select **Azure Migrate**.
3. In **Get started**, select **Discover, assess and migrate**.

    Screenshot displays the options in Overview.

4. In **Servers, databases and web apps**, select **Create project**.

    Screenshot of button to start creating a project.

5. In **Create project**, select the Azure subscription and resource group. Create a resource group if you don't have one.
6. In **Project Details**, specify the project name and the geography in which you want to create the project.
    - The geography is only used to store the metadata gathered from on-premises servers. You can assess or migrate servers for any target region regardless of the selected geography.
    - Review supported geographies for [public](migrate-support-matrix.md#public-cloud) and [government clouds](migrate-support-matrix.md#azure-government).

    > **Note:**
    > Use the **Advanced** configuration section to create an Azure Migrate project with private endpoint connectivity. [Learn more](discover-and-assess-using-private-endpoints.md#create-a-project-with-private-endpoint-connectivity).

7. Select **Create**.

     Image of Azure Migrate page to input project settings.

Wait for a few minutes for the project to deploy.


## Create a project in a specific region

In the portal, you can select the geography in which you want to create the project. If you want to create the project within a specific Azure region, use the following API command to create the  project.

```rest
PUT /subscriptions/<subid>/resourceGroups/<rg>/providers/Microsoft.Migrate/MigrateProjects/<mymigrateprojectname>?api-version=2018-09-01-preview "{location: 'centralus', properties: {}}"
```

**Applies to: migrate**

After you have created the project, perform the following steps to try out the new agentless dependency analysis enhancements:

Ensure that you have installed Az CLI to execute the required commands by following the steps provided in the documentation [here](https://learn.microsoft.com/cli/azure/install-azure-cli).

After you install the Az CLI (in PowerShell), open PowerShell on your system as an Administrator and execute the following commands:

1. Log in to the Azure tenant and set the Subscription.
    - az login --tenant <TENANT_ID>
    - az account set --subscription <SUBSCRIPTION_ID>
1. Register the Dependency Map private preview feature on the Subscription.
    - az feature registration create --name PrivatePreview --namespace Microsoft.DependencyMap
1. Ensure that the feature is in registered state. 
-    az feature registration show --name PrivatePreview     --provider-namespace Microsoft.DependencyMap
    - Output contains - "state": "Registered"
1. Register the new Dependency Map resource provider. 
    - az provider register --namespace Microsoft.DependencyMap
1. Ensure that the provider is in registered state.
    - az provider show -n Microsoft.DependencyMap
    - Output contains - "registrationState": "Registered"


## Create additional projects

If you already have a project and you want to create an additional project, do the following:  

**Applies to: migrate-classic**
1. In the [Azure public portal](https://portal.azure.com) or [Azure Government](https://portal.azure.us), search for **Azure Migrate**.
1. On the Azure Migrate dashboard, select **All Projects** on the upper left.
1. Select a **Create Project**. 

   Screenshot shows how to create a project by selecting the create project button.


**Applies to: migrate**
1. In the [Azure public portal](https://portal.azure.com) or [Azure Government](https://portal.azure.us), search for **Azure Migrate**.
1. On the Azure Migrate dashboard, select **Servers, databases and web apps** > **Create project** on the upper left
   Screenshot that contains information on how to create a project.
1. To create a new project, select **Click here**.


## Next steps

Add [assessment](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/migrate/how-to-assess.md) or [migration](how-to-migrate.md) tools to projects.
