---
title: "Create a project (classic)"
description: "This article describes how to create a Microsoft Foundry project so you can work with generative AI in the cloud. (classic)"
author: sdgilley
ms.author: sgilley
ms.reviewer: deeikele
ms.date: 04/08/2026
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.topic: how-to
ms.custom:
  - classic-and-new
  - ignite-2023
  - build-2024
  - ignite-2024
  - build-aifnd
  - build-2025
  - dev-focus
ai-usage: ai-assisted
# customer intent: As a developer, I want to create a Microsoft Foundry project so I can work with generative AI.
ROBOTS: NOINDEX, NOFOLLOW
---

# Create a project for Microsoft Foundry (classic)

Use this article to create a Foundry project and confirm that your environment is ready before you start building agents, evaluations, and files.

**Currently viewing:**  **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../foundry/how-to/create-projects.md)

This article describes how to create a Foundry project in [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs). Projects let you organize your work—such as agents, evaluations, and files—as you build stateful apps and explore new ideas.

* 

A **Foundry project** is managed under a Microsoft Foundry resource. It's a container for access management, data upload and integration, and monitoring. This lets you keep your work separated between use cases without needing to create extra Azure resources.


* If you need access to open-source models or PromptFlow, [create a hub project type](hub-create-projects.md) instead.

* For more information about the different project types, see [Types of projects](../what-is-foundry.md#types-of-projects).

If your organization requires customized Azure configurations like alternative names, security controls, or cost tags, you might need to use the [Azure portal](https://portal.azure.com) or [template options](create-resource-template.md) to comply with your organization's Azure Policy requirements.

## Prerequisites

* 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 


* 
Access to a role that allows you to create a Foundry resource, such as **Foundry Account Owner** or **Foundry Owner** on the subscription or resource group. For more information about permissions, see [Role-based access control for Microsoft Foundry](../../foundry/concepts/rbac-foundry.md#permissions-for-each-built-in-role).

> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.



    If you lack this role, request your subscription administrator to [create a Foundry resource](../../ai-services/multi-service-resource.md) and then skip to [Create multiple projects on the same resource](#create-multiple-projects-on-the-same-resource).

Use the following tabs to select the method you want to use to create a Foundry project:

# [Foundry portal](#tab/foundry)

- No other prerequisites necessary when using the portal.

# [Python SDK](#tab/python)


- [Set up your development environment](../../foundry/how-to/develop/install-cli-sdk.md?tabs=python).
- Run `az login` or `az login --use-device-code` in your environment before running code.
- Install packages: `pip install azure-identity "azure-mgmt-cognitiveservices>=13.7.0"`. If you're in a notebook cell, use `%pip install` instead.
- Use `pip show azure-mgmt-cognitiveservices` to check that your version is 13.7 or greater.
- **Quick validation**: Before creating a project, verify your SDK and authentication by testing the client:

    ```python
    from azure.identity import DefaultAzureCredential
    from azure.mgmt.cognitiveservices import CognitiveServicesManagementClient
    
    # Test authentication by instantiating the client
    credential = DefaultAzureCredential()
    subscription_id = "<your-subscription-id>"  # Replace with your subscription ID
    client = CognitiveServicesManagementClient(credential, subscription_id)
    print("✓ Authentication successful! Ready to create a project.")
    ```


- Start your script with the following code to create the `client` connection and variables used throughout this article. This example creates the project in East US:

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/python/quickstart/create_project.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-projects.md)

- (Optional) If you have multiple accounts, add the tenant ID of the Microsoft Entra ID you want to use into `DefaultAzureCredential`:

    ```python
    DefaultAzureCredential(interactive_browser_tenant_id="<TENANT_ID>")
    ```
    

- (Optional) If you're working in the [Azure Government - US](https://learn.microsoft.com/azure/azure-government/documentation-government-welcome) or [Azure operated by 21Vianet](https://azure.microsoft.com/global-infrastructure/services/?regions=china-east-2%2cchina-non-regional&products=all) regions, specify the region you want to authenticate to. This example authenticates to the Azure Government - US region:
    
    ```python
    from azure.identity import AzureAuthorityHosts
    DefaultAzureCredential(authority=AzureAuthorityHosts.AZURE_GOVERNMENT)
    ```

# [Azure CLI](#tab/azurecli)


- Install the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).
- Set the default value for `subscription`.

```azurecli
# Set your default subscription
az account set --subscription "{subscription-name}"
```


---

## Create a Foundry project

Use one of the following methods.


# [Foundry portal](#tab/foundry)

These steps provide a way to create a new Azure resource with basic default settings. 

To create a Foundry project, follow these steps:

1. 

Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.





1. 
What you do next depends on where you are:
* **If you're not in a project, or you don't have any projects yet**: Select **Create new** in the top right to create a new 
Foundry project

    Screenshot shows how to create a new project in Foundry.

* **If you're in a project**: Select the project breadcrumb, then select **Create new resource**.

    Screenshot shows creating a new project from a breadcrumb.



1. Select **Foundry resource**, and then select **Next**.
1. Provide a name for your project and select **Create**. Or see the next section for advanced options.

### Advanced options


1. You create a Foundry project on a `Foundry` resource. The portal automatically creates this resource when you create the project. Select an existing **Resource group** to use, or leave the default to create a new resource group.

    > **Tip:**
    > Especially for getting started, create a new resource group for your project. The resource group makes it easy to manage the project and all its resources together.

1. Select a **Location** or use the default. The location is the region where the project resources are hosted. 

1. Select **Create**. You see the progress of resource creation. The project is created when the process is complete.


# [Python SDK](#tab/python)


To create a Foundry project:

- Add the following code to create a Foundry project by using the variables and `client` connection from the prerequisites section.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/python/quickstart/create_project.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-projects.md)

    References: [CognitiveServicesManagementClient](https://learn.microsoft.com/python/api/azure-mgmt-cognitiveservices/azure.mgmt.cognitiveservices.CognitiveServicesManagementClient).


# [Azure CLI](#tab/azurecli)


> **Note:**
> These steps require the Azure CLI version 2.80.0 or later and the **Contributor** or **Owner** role on the resource group. Run `az version` to check your version and `az upgrade` if you need a newer one. Run `az login` to sign in before you start. For supported regions, see [Region support](../../foundry/reference/region-support.md).

1. Create a resource group or use an existing one. For example, create `my-foundry-rg` in `eastus`:

   ```azurecli
   az group create --name my-foundry-rg --location eastus
   ```

   Verify that the resource group exists:

   ```azurecli
   az group show --name my-foundry-rg --query properties.provisioningState --output tsv
   ```

   The output shows `Succeeded`.

1. Create the Foundry resource with project management enabled. For example, create `my-foundry-resource` in the `my-foundry-rg` resource group:

   ```azurecli
   az cognitiveservices account create \
       --name my-foundry-resource \
       --resource-group my-foundry-rg \
       --kind AIServices \
       --sku S0 \
       --location eastus \
       --custom-domain my-foundry-resource \
       --assign-identity \
       --allow-project-management true
   ```

   Use these values:

   | Parameter | Purpose |
   | --- | --- |
   | `--assign-identity` | Creates the managed identity that project management requires. Without it, project creation fails with an error that a managed identity must be enabled on the resource. |
   | `--allow-project-management` | Enables project management. You can't change this setting after you create the resource. |
   | `--custom-domain` | Must be globally unique. If `my-foundry-resource` is taken, the command fails with `CustomDomainInUse`. Choose a different name and run the command again. |

1. Create a project. For example, create `my-foundry-project` in the `my-foundry-resource`:

   ```azurecli
   az cognitiveservices account project create \
       --name my-foundry-resource \
       --resource-group my-foundry-rg \
       --project-name my-foundry-project \
       --location eastus
   ```

1. Verify that the resource is provisioned:

   ```azurecli
   az cognitiveservices account show \
       --name my-foundry-resource \
       --resource-group my-foundry-rg \
       --query properties.provisioningState --output tsv
   ```

   The output should show `Succeeded`. If the output shows a different state, check your permissions, region availability, and resource quotas. For more help, see [Create a multi-service resource](../../ai-services/multi-service-resource.md).

1. Verify the project was created:

   ```azurecli
   az cognitiveservices account project show \
       --name my-foundry-resource \
       --resource-group my-foundry-rg \
       --project-name my-foundry-project \
       --query properties.provisioningState --output tsv
   ```

   The output should show `Succeeded`. If the command fails with a message that a managed identity must be enabled, confirm that you created the resource with `--assign-identity`.

Reference: [az cognitiveservices account project](https://learn.microsoft.com/cli/azure/cognitiveservices/account/project)


---

## Create multiple projects on the same resource


Create multiple 
Foundry projects on an existing `Foundry` resource to enable team collaboration and shared resource access including security, deployments, and connected tools. This setup is ideal in restricted Azure subscriptions where developers need self-serve exploration ability within the setup of a preconfigured environment.

Diagram shows how a team could share resource access with multiple projects on a Foundry resource.


Foundry projects as Azure child resources may get assigned their own access controls, but share common settings such as network security, deployments, and Azure tool integration from their parent resource.

While not all Foundry capabilities support organizing work in projects yet, your resource's first "default" project is more powerful. You can identify it by the tag "default" in UX experiences and the resource property "is_default" when using code options.

| Feature | Default project | Other projects |
| --- | --- | --- |
| Model inference | ✅ | ✅ |
| Playgrounds | ✅ | ✅ |
| Agents | ✅ | ✅ |
| Evaluations | ✅ | ✅ |
| Tracing | ✅ | ✅ |
| Datasets | ✅ | ✅ |
| Indexes | ✅ | ✅ |
| Foundry SDK and API | ✅ | ✅ |
| Content understanding | ✅ | ✅ |
| OpenAI SDK and API | ✅ | Responses, Files, Conversations |
| OpenAI Batch, Fine-tuning, Stored completions | ✅ | - |
| Language fine-tuning | ✅ | ✅ |
| Speech fine-tuning | ✅ | - |
| Connections | ✅ | ✅ |

* To add a project to a Foundry resource:
    
    # [Foundry portal](#tab/foundry)
    
    
> **Tip:**
> Because you can [customize the left pane](../what-is-foundry.md#customize-the-left-pane) in the Microsoft Foundry portal, you might see different items than shown in these steps. If you don't see what you're looking for, select **... More** at the bottom of the left pane.
    
    1. 

Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.



 
    1. Select either the 
Foundry project or its associated resource.
    1. In the left pane, select **Management center**.
    1. In the resource section, select  **Overview**.
    1. Select **New project** and provide a name.
    
        :::image type="content" source="../media/how-to/projects/second-project.png" alt-text="Screenshot shows how to create a second project on an existing resource.":::
      
    
    # [Python SDK](#tab/python)

    
    Add this code to your script to create a new project on your existing resource:

    :::code language="python" source="~/foundry-samples-main/samples-classic/python/quickstart/create_project.py" id="create_additional":::
    
    
    # [Azure CLI](#tab/azurecli)

    To add a new project to `my-foundry-resource`:
    
    ```azurecli
     az cognitiveservices account project create \
     --name my-foundry-resource \
     --resource-group my-foundry-rg \
     --project-name {new_project_name} \
     --location eastus
    ```

    ---

* If you delete your Foundry resource's default project, the next project created will become the default project. 

## View project settings

# [Foundry portal](#tab/foundry)

On the **Home** project page, you find information about the project.

- **Name**: The name of the project appears in the upper left corner. 
- **Subscription**: The subscription that hosts the resource that hosts the project.
- **Resource group**: The resource group that hosts the resource that hosts the project.

# [Python SDK](#tab/python)


[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/python/quickstart/create_project.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/how-to/create-projects.md)

References: [CognitiveServicesManagementClient](https://learn.microsoft.com/python/api/azure-mgmt-cognitiveservices/azure.mgmt.cognitiveservices.CognitiveServicesManagementClient).


# [Azure CLI](#tab/azurecli)


To view settings for the project, use the `az cognitiveservices account project show` command. For example:

```azurecli
az cognitiveservices account project show \
--name my-foundry-resource \
--resource-group my-foundry-rg \
--project-name my-foundry-project
```


---

## Delete projects

# [Foundry portal](#tab/foundry)

1. 

Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.




1. Open your project.
1. Select **Management center**.
1. Under **Resource**, select **Overview**.
1. Select any projects you no longer want to keep.
1. Select **Delete project**.

To delete the Foundry resource and all its projects:

1. In the Management center, select the resource name from the Overview section to go to the Azure portal.
1. In the Azure portal, select **Delete** to delete the resource and all its associated projects.

# [Python SDK](#tab/python)


This code uses the variables and `client` connection from the prerequisites. To delete a single project:

```python
client.projects.begin_delete(
    resource_group_name, foundry_resource_name, foundry_project_name
)
```

References: [CognitiveServicesManagementClient](https://learn.microsoft.com/python/api/azure-mgmt-cognitiveservices/azure.mgmt.cognitiveservices.CognitiveServicesManagementClient).

Delete a Foundry resource and all of its projects:

```python
# Delete projects
projects = client.projects.list(resource_group_name, foundry_resource_name)

for project in projects: 
    print("Deleting project:", project.name)
    client.projects.begin_delete(resource_group_name, foundry_resource_name,
        project_name=project.name.split('/')[-1]
    ).wait()

# Delete resource
print("Deleting resource:", foundry_resource_name)
client.accounts.begin_delete(resource_group_name, foundry_resource_name).wait()
```

References: [CognitiveServicesManagementClient](https://learn.microsoft.com/python/api/azure-mgmt-cognitiveservices/azure.mgmt.cognitiveservices.CognitiveServicesManagementClient).


# [Azure CLI](#tab/azurecli)


Run the following command:

```azurecli
az cognitiveservices account project delete \
--name my-foundry-resource \
--resource-group my-foundry-rg \
--project-name my-foundry-project
```

To verify deletion, run `az cognitiveservices account project show` with the same resource and project names. The command returns a resource-not-found error.

References: [az cognitiveservices account project delete](https://learn.microsoft.com/cli/azure/cognitiveservices/account/project#az-cognitiveservices-account-project-delete).


---

> **Important:**
> Use with caution. You can't recover a project after it's deleted.

> 
> [Create your first connection](connections-add.md)

## Related content

- [Microsoft Foundry Quickstart](../quickstarts/get-started-code.md)
- [What is Foundry?](../what-is-foundry.md)
- [Create resources using Bicep template](create-resource-template.md)
