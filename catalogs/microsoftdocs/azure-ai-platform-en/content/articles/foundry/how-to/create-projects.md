---
title: "Create a project"
description: "This article describes how to create a Microsoft Foundry project so you can work with generative AI in the cloud."
author: sdgilley
ms.author: sgilley
ms.reviewer: deeikele
ms.date: 08/27/2026
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
  - doc-kit-assisted
ai-usage: ai-assisted
# customer intent: As a developer, I want to create a Microsoft Foundry project so I can work with generative AI.
---

# Create a project for Microsoft Foundry

Use this article to create a project in [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs) and confirm that your environment is ready. Projects organize agents, evaluations, and files as you build stateful apps and explore new ideas.

If your organization requires customized Azure configurations like alternative names, security controls, or cost tags, you might need to use the [Azure portal](https://portal.azure.com) or [template options](create-resource-template.md) to comply with your organization's Azure Policy requirements.

As you set up a project, the [Microsoft Foundry Skill](develop/use-microsoft-foundry-skill.md) can help prepare your environment and complete related agent, evaluation, and file workflows.

## Prerequisites

* 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 


* If you're creating the project for yourself:
  * 
Access to a role that allows you to create a Foundry resource, such as **Foundry Account Owner** or **Foundry Owner** on the subscription or resource group. For more information about permissions, see [Role-based access control for Microsoft Foundry](../concepts/rbac-foundry.md#permissions-for-each-built-in-role).

> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.


* If you're creating the project for a team:
  * 
Access to a role that allows you to complete role assignments, such as **Owner**. For more information about permissions, see [Role-based access control for Microsoft Foundry](../concepts/rbac-foundry.md#permissions-for-each-built-in-role).
  * A list of user email addresses or Microsoft Entra security group IDs for team members who need access.

Use the following tabs to select the method you want to use to create a Foundry project:

# [Foundry portal](#tab/foundry)

- No other prerequisites necessary when using the portal.

# [Python SDK](#tab/python)


- [Set up your development environment](develop/install-cli-sdk.md?tabs=python).
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

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/python/quickstart/create_project.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/how-to/create-projects.md)

- (Optional) If you have multiple accounts, add the tenant ID of the Microsoft Entra ID you want to use into `DefaultAzureCredential`:

    ```python
    DefaultAzureCredential(interactive_browser_tenant_id="<TENANT_ID>")
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

Sign in to 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
. Make sure the **New Foundry** toggle is on. These steps refer to **Foundry (new)**.




1. The project you're working on appears in the upper-left corner.
1. To create a new project, select the project name, and then select **Create new project**.
1. Give your project a name and select **Create project**. Or see the next section for advanced options.

### Advanced options


1. You create a Foundry project on a `Foundry` resource. The portal automatically creates this resource when you create the project. Select an existing **Resource group** to use, or leave the default to create a new resource group.

    > **Tip:**
    > Especially for getting started, create a new resource group for your project. The resource group makes it easy to manage the project and all its resources together.

1. Select a **Location** or use the default. The location is the region where the project resources are hosted. 

1. Select **Create**. You see the progress of resource creation. The project is created when the process is complete.


# [Python SDK](#tab/python)


To create a Foundry project:

- Add the following code to create a Foundry project by using the variables and `client` connection from the prerequisites section.

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/python/quickstart/create_project.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/how-to/create-projects.md)

    References: [CognitiveServicesManagementClient](https://learn.microsoft.com/python/api/azure-mgmt-cognitiveservices/azure.mgmt.cognitiveservices.CognitiveServicesManagementClient).


# [Azure CLI](#tab/azurecli)


> **Note:**
> These steps require the Azure CLI version 2.80.0 or later and the **Contributor** or **Owner** role on the resource group. Run `az version` to check your version and `az upgrade` if you need a newer one. Run `az login` to sign in before you start. For supported regions, see [Region support](../reference/region-support.md).

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

## Configure agent storage

If your project runs agents, you can declare the Azure resources that store agent state, vector data, and files. Set these resources on the Foundry account to establish defaults for every project it contains, then let each project inherit the defaults or override an individual store.

Two points affect how you plan the deployment:

- **Inheritance**: A project inherits each setting it doesn't set itself. A GET on the project returns the effective configuration, which combines inherited account values with any project overrides. Changing the account defaults later doesn't update existing projects.
- **Authorization**: For capability settings requests, the caller needs **Storage Blob Data Contributor** on the referenced Azure Storage account and **Cosmos DB Operator** on the referenced Azure Cosmos DB account. Azure AI Search doesn't require a caller role. Configure runtime access for the project managed identity separately.

For settings, permissions, and Bicep examples, see [Configure agent capability settings](configure-capability-settings.md).

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
        
    1. Select **Manage** in the upper-right navigation.
    1. Select **Resource details** in the left pane.
    1. Select **Add project**.
          
    # [Python SDK](#tab/python)

    Add this code to your script to create a new project on your existing resource:

    [Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/python/quickstart/create_project.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/how-to/create-projects.md)
    
    
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

On the **Home** project page, you see the project endpoint and API key for the project. You don't need the API key if you use Microsoft Entra ID authentication.

# [Python SDK](#tab/python)


[Code reference unavailable in this source snapshot: ~/foundry-samples-main/samples-classic/python/quickstart/create_project.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry/how-to/create-projects.md)

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

## Grant access to team members

If you created the project for a team, assign the **Foundry User** role to team members so they can use the project and its resources. This role provides the minimum permissions needed to build and test AI applications. For other roles you might need to assign, see [Role-based access control for Microsoft Foundry](../concepts/rbac-foundry.md).


> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.


> **Important:**
> To complete role assignments, you need a role such as **Owner** on the project. For more information, see [Role-based access control for Microsoft Foundry](../concepts/rbac-foundry.md#permissions-for-each-built-in-role).

# [Foundry portal](#tab/foundry)


1. In the Foundry portal, select **Manage** in the upper-right navigation.
1. Select **Project details** in the left pane.
1. Select the **Users** tab.
1. Select **Add user** in the upper right.
1. Enter the email address of the team member.
1. Select **Add**.

Repeat these steps for each team member or security group.

> **Tip:**
> To add multiple users at once, use a Microsoft Entra security group instead of individual email addresses.

# [Python SDK](#tab/python)

Use the Azure CLI or Foundry portal to manage role assignments. The Python SDK doesn't support role assignment operations.

# [Azure CLI](#tab/azurecli)


1. Get the project's resource ID:

   ```azurecli
   PROJECT_ID=$(az cognitiveservices account project show \
       --name my-foundry-resource \
       --resource-group my-foundry-rg \
       --project-name my-foundry-project \
       --query id -o tsv)
   ```

1. Assign the **Foundry User** role to a team member:

   
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.


   ```azurecli
   az role assignment create \
       --role "53ca6127-db72-4b80-b1b0-d745d6d5456d" \
       --assignee "user@contoso.com" \
       --assignee-principal-type User \
       --scope $PROJECT_ID
   ```


> **Note:**
> Because the Foundry RBAC roles were recently renamed, use the role definition ID (GUID) instead of the role name in your code to avoid issues during the rename rollout:
> - **Foundry User**: `53ca6127-db72-4b80-b1b0-d745d6d5456d`
> - **Foundry Owner**: `c883944f-8b7b-4483-af10-35834be79c4a`
> - **Foundry Account Owner**: `e47c6f54-e4a2-4754-9501-8e0985b135e1`
> - **Foundry Project Manager**: `eadc314b-1a2d-4efa-be10-5d325db5065e`


   To add a security group instead of an individual user:

   ```azurecli
   az role assignment create \
       --role "53ca6127-db72-4b80-b1b0-d745d6d5456d" \
       --assignee-object-id "<security-group-object-id>" \
       --assignee-principal-type Group \
       --scope $PROJECT_ID
   ```

1. Verify the role assignment:

   ```azurecli
   az role assignment list \
       --scope $PROJECT_ID \
       --role "53ca6127-db72-4b80-b1b0-d745d6d5456d" \
       --output table
   ```

Reference: [az role assignment](https://learn.microsoft.com/cli/azure/role/assignment)

---

### Verify team member access


Ask a team member to verify their access by signing in to [Microsoft Foundry](https://ai.azure.com) and selecting the project from the project list.

If the team member can't access the project, verify that the role assignment completed successfully. Check that you used the correct email address or security group ID. Make sure the team member's Azure account is in the same Microsoft Entra tenant.


## Delete projects

> **Important:**
> Use with caution. You can't recover a project after it's deleted.

# [Foundry portal](#tab/foundry)

1. 

Sign in to 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
. Make sure the **New Foundry** toggle is on. These steps refer to **Foundry (new)**.



1. In the upper-right navigation, select **Manage**.
1. In the left pane, select **Project details**.
1. In the upper right, select the trash can icon to delete the project.

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

> 
> [Create your first connection](connections-add.md)

## Related content

- [Elevated-role tasks in Microsoft Foundry](../concepts/administrator-guide.md#create-and-configure-foundry-resources) — role requirements for creating resources and projects.
- [Microsoft Foundry Quickstart](../quickstarts/get-started-code.md)
- [What is Foundry?](../what-is-foundry.md)
- [Create resources using Bicep template](create-resource-template.md)
