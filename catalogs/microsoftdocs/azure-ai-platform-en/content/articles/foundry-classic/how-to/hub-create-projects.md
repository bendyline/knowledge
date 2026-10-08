---
title: "Create a hub project (classic)"
description: "Learn how to create a hub-based project in Microsoft Foundry. (classic)"
author: sdgilley
ms.author: sgilley
ms.reviewer: deeikele
ms.date: 12/29/2025
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.topic: how-to
ms.custom:
  - build-2025
  - hub-only
  - dev-focus
ai-usage: ai-assisted
---

# Create a hub project for Microsoft Foundry (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.



> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>
> **SDK compatibility note**: Code examples require a specific Microsoft Foundry SDK version. If you encounter compatibility issues, consider [migrating from a hub-based to a Foundry project](migrate-project.md).


> **Tip:**
> An alternate Foundry project creation article is available: [Create a project for Microsoft Foundry (Foundry projects)](create-projects.md).

This article describes how to create a hub-based project in Foundry. Use a hub project when you need prompt flow, managed compute, Azure Machine Learning compatibility, or advanced development features.

For more information on the different project types, see [Types of projects](../what-is-foundry.md#types-of-projects).

## Prerequisites

Choose a method:

# [Foundry portal](#tab/portal)

- Azure subscription.
- Required role: **Owner** or **Contributor** on the hub resource.

# [Python SDK](#tab/python)

- Azure subscription.
- Required role: **Owner** or **Contributor** on the hub resource.
- Azure Machine Learning SDK v2.
- Existing hub resource (see create hub article).
- Azure CLI installed and authenticated (`az login`).

# [Azure CLI](#tab/cli)

- Azure subscription.
- Required role: **Owner** or **Contributor** on the hub resource.
- Azure CLI and machine learning extension installed. Follow the steps in the [Install and set up the machine learning extension](https://learn.microsoft.com/azure/machine-learning/how-to-configure-cli) article to install.
- Existing hub resource.

---

## Set up your environment

# [Foundry portal](#tab/portal)

No additional setup is necessary if you're using the Foundry portal.

# [Python SDK](#tab/python)


1. Install packages.  (If in a notebook cell, use `%pip install` instead.)

    ```bash
    pip install azure-ai-ml
    pip install azure-identity
    ```

1. Provide your subscription details:

    [!notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/includes/~/azureml-examples-main/sdk/python/resources/workspace/workspace.ipynb?name=subscription_id)]

1. Get a handle to the subscription. All the Python code in this article uses `ml_client`:

    [!notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/includes/~/azureml-examples-main/sdk/python/resources/workspace/workspace.ipynb?name=ml_client)]
    
1. (Optional) If you have multiple accounts, add the tenant ID of the Microsoft Entra ID you wish to use into the `DefaultAzureCredential`. Find your tenant ID from the [Azure portal](https://portal.azure.com) under **Microsoft Entra ID, External Identities**.
        
    ```python
    DefaultAzureCredential(interactive_browser_tenant_id="<TENANT_ID>")
    ```
        
1. (Optional) If you're working on in the [Azure Government - US](https://learn.microsoft.com/azure/azure-government/documentation-government-welcome) or [Azure China 21Vianet](https://azure.microsoft.com/global-infrastructure/services/?regions=china-east-2%2cchina-non-regional&products=all) regions, specify the region into which you want to authenticate. You can specify the region with `DefaultAzureCredential`. The following example authenticates to the Azure Government - US region:
        
    ```python
    from azure.identity import AzureAuthorityHosts
    DefaultAzureCredential(authority=AzureAuthorityHosts.AZURE_GOVERNMENT)
    ```
1. Verify the connection.
    
    ```python
    for hub in ml_client.workspaces.list():
        print(f"  - {hub.name}")
    ```

If you receive an authentication error, ensure your Azure credentials are configured (run `az login` or set up your credentials via the Azure Identity SDK). If you receive a permission error, check that you have the Contributor role on the subscription or resource group.

**References**: [`MLClient`](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.mlclient), [`DefaultAzureCredential`](https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential)


Verify your authentication by listing existing hubs:

```python
hubs = ml_client.workspaces.list()
for hub in hubs:
    print(f"Hub: {hub.name}")
```

If you receive an authentication error, ensure your Azure credentials are configured (run `az login` or set up your credentials via the Azure Identity SDK). If you receive a permission error, check that you have the Contributor role on the subscription or resource group.

# [Azure CLI](#tab/cli)

1. To authenticate to your Azure subscription from the Azure CLI, use the following command:

    ```azurecli
    az login
    ```

    For more information on authenticating, see [Authentication methods](https://learn.microsoft.com/cli/azure/authenticate-azure-cli).

1. Verify your authentication by listing existing hubs:

    ```azurecli
    az ml workspace list --resource-group <your-resource-group-name>
    ```

    If the command succeeds and displays any existing hubs, your authentication is correct.

---

## Create a hub project

# [Foundry portal](#tab/portal)



 To create a 
hub-based project in [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs), follow these steps:
 
1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.




1. 
What you do next depends on where you are:
* **If you're not in a project, or you don't have any projects yet**: Select **Create new** in the top right to create a new 
Foundry project

    Screenshot shows how to create a new project in Foundry.

* **If you're in a project**: Select the project breadcrumb, then select **Create new resource**.

    Screenshot shows creating a new project from a breadcrumb.



1. Select **AI hub resource**, then select **Next**.
1. Enter a name for the project.
1. If you have a hub, you'll see the one you most recently used selected.  
   * If you have access to more than one hub, you can select a different hub from the dropdown.
   * If you want to create a new one, select **Create a new hub** from the dropdown.  

      Screenshot of the project details page within the create project dialog.

1. If you don't have a hub, a default one is created for you. 
1. Select **Create**. 

Or, if you want to customize a new hub, follow the steps in the next section before you select **Create**.

### Customize the hub

A 
hub-based project exists inside a hub. A hub allows you to share configurations like data connections with all projects, and to centrally manage security settings and spend. If you're part of a team, hubs are shared across other team members in your subscription. For more information about the relationship between hubs and projects, see the [hubs and projects overview](../concepts/ai-resources.md) documentation.

When you create a new hub, you must have **Owner** or **Contributor** permissions on the selected resource group. If you're part of a team and don't have these permissions, your administrator should create a hub for you.

> **Tip:**
> While you can create a hub as part of the project creation, you have more control and can set more advanced settings for the hub if you create it separately. For example, you can customize network security or the underlying Azure Storage account. For more information, see [How to create and manage a Microsoft Foundry hub](create-azure-ai-resource.md).

When you create a new hub as part of the project creation, default settings are provided. If you want to customize these settings, do so before you create the project:

1. In the **Create a project** form, select the arrow on the right side.

    Screenshot of the customize button within the create project dialog.

1. Select an existing **Resource group** you want to use, or leave the default to create a new resource group.

    > **Tip:**
    > Especially for getting started we recommend you create a new resource group for your project. The resource group allows you to easily manage the project and all of its resources together. When you create a project, several resources are created in the resource group, including a hub, a container registry, and a storage account.

1. Select a **Location** or use the default. The location is the region where the hub is hosted. The location of the hub is also the location of the project. Foundry Tools availability differs per region. For example, certain models might not be available in certain regions.

1. Select **Create a project**. You see progress of the resource creation. The project is created when the process is complete.

# [Python SDK](#tab/python)

```python
from azure.ai.ml.entities import Project

my_project_name = "myexampleproject"  # Project names must be lowercase, 3–64 chars, alphanumeric with hyphens
my_display_name = "My Example Project"
hub_name = "myhubname"  # Hub resource name
hub_id = f"/subscriptions/{subscription_id}/resourceGroups/{resource_group}/providers/Microsoft.MachineLearningServices/workspaces/{hub_name}"

my_project = Project(
    name=my_project_name,
    display_name=my_display_name,
    hub_id=hub_id
)

created_project = ml_client.workspaces.begin_create(workspace=my_project).result()
print(f"Project '{created_project.name}' created successfully.")
```

**What this snippet does:** Defines project properties and creates the project on the existing hub. The `.result()` method waits for the creation to complete. Expected output: A confirmation message displaying the created project name.

**References:**
- [Project entity](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.entities.project)
- [MLClient.workspaces](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.mlclient#workspaces)
- [Azure Identity DefaultAzureCredential](https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential)

# [Azure CLI](#tab/cli)

```azurecli
az ml workspace create --kind project --hub-id <my-hub-id> --resource-group <my-resource-group> --name <my-project-name>
```

Replace the placeholders as follows:
- `<my-hub-id>`: Full resource ID of the hub in format `/subscriptions/{subscription_id}/resourceGroups/{resource_group}/providers/Microsoft.MachineLearningServices/workspaces/{hub_name}`
- `<my-resource-group>`: Name of the resource group containing your hub
- `<my-project-name>`: Name for the new project (lowercase, 3–64 characters, alphanumeric with hyphens)

**What this command does:** Creates a new hub-based project associated with the specified hub.

**References:**
- [az ml workspace create](https://learn.microsoft.com/cli/azure/ml/workspace#az-ml-workspace-create)

---

## View project settings

# [Foundry portal](#tab/portal)

Open project **Overview** to see the name, subscription, and resource group. Use **Management center** for shared assets or **Manage in Azure portal** for the underlying resource.

# [Python SDK](#tab/python)

```python
ml_client = MLClient(workspace_name=my_project_name, resource_group_name=resource_group, subscription_id=subscription_id, credential=DefaultAzureCredential())
```

# [Azure CLI](#tab/cli)

```azurecli
az ml workspace show --name {my_project_name} --resource-group {my_resource_group}
```
---

## Project resources

Shared from hub: connections, compute, network configuration.

Project-scoped resources:
- Components (datasets, flows, indexes, deployments)
- Project connections
- Storage containers and file share:
  - workspaceblobstore – default data uploads
  - workspaceartifactstore – components and metadata
  - workspacefilestore – files from compute and prompt flow

> **Note:**
> If you disable storage public access, storage connections might delay creation until the first private network access.

## Delete projects

1. Open the hub in the portal.
1. Go to Management center > Overview.
1. Select the projects to remove.
1. Select **Delete project**.

To delete a hub and all its projects, select **Delete hub** in **Hub properties** to open Azure portal hub deletion.

## Related content

- [Create a Foundry project](create-projects.md).
- [Learn more about Foundry](../what-is-foundry.md).
