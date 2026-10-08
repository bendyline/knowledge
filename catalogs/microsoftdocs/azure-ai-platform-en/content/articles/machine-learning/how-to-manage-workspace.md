---
title: Manage workspaces in portal or Python SDK (v2)
titleSuffix: Azure Machine Learning
description: Learn how to manage Azure Machine Learning workspaces in the Azure portal or with the SDK for Python (v2).
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: core
ms.author: scottpolly
author: s-polly
ms.date: 01/28/2026
ms.topic: how-to
ms.custom:
  - fasttrack-edit
  - FY21Q4-aml-seo-hack
  - contperf-fy21q4
  - sdkv2
  - event-tier1-build-2022
  - ignite-2022
  - devx-track-python
  - sfi-image-nochange
---

# Manage Azure Machine Learning workspaces in the portal or with the Python SDK (v2)


**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

In this article, you create, view, and delete [**Azure Machine Learning workspaces**](concept-workspace.md) for [Azure Machine Learning](overview-what-is-azure-machine-learning.md) by using the [Azure portal](https://portal.azure.com) or the [SDK for Python](https://aka.ms/sdk-v2-install).

As your needs change or your automation requirements increase, you can manage workspaces [by using the CLI](how-to-manage-workspace-cli.md), [Azure PowerShell](how-to-manage-workspace-powershell.md), or [via the Visual Studio Code extension](how-to-setup-vs-code.md).

## Prerequisites

* An Azure subscription. If you don't have an Azure subscription, create a free account before you begin. Try the [free or paid version of Azure Machine Learning](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) today.
* By using the Python SDK:
   1. Python 3.10 or later.
   1. [Install the SDK v2](https://aka.ms/sdk-v2-install).
   1. Install `azure-identity`: `pip install azure-identity`. If in a notebook cell, use `%pip install azure-identity`.
   1. Provide your subscription details:

      
**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

      [!notebook-python[](~/azureml-examples-main/sdk/python/resources/workspace/workspace.ipynb?name=subscription_id)]

   1. Get a handle to the subscription. The Python code in this article uses `ml_client`:

      [!notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/azureml-examples-main/sdk/python/resources/workspace/workspace.ipynb?name=ml_client)]
      
        * (Optional) If you have multiple accounts, add the tenant ID of the Microsoft Entra ID you wish to use into the `DefaultAzureCredential`. Find your tenant ID from the [Azure portal](https://portal.azure.com) under **Microsoft Entra ID, External Identities**.
                
            ```python
            DefaultAzureCredential(interactive_browser_tenant_id="<TENANT_ID>")
            ```
                
        * (Optional) If you're working in the [Azure Government - US](https://azure.microsoft.com/explore/global-infrastructure/government/) or [Azure China 21Vianet](https://learn.microsoft.com/azure/china/overview-operations) regions, you need to specify the cloud into which you want to authenticate. You can specify these regions in `DefaultAzureCredential`.
                
            ```python
            from azure.identity import AzureAuthorityHosts
            DefaultAzureCredential(authority=AzureAuthorityHosts.AZURE_GOVERNMENT))
            ```

## Limitations


- When you create a new workspace, you can either automatically create services needed by the workspace or use existing services. If you want to use existing services from a **different Azure subscription** than the workspace, you must register the Azure Machine Learning namespace in the subscription that contains those services. For example, if you create a workspace in subscription A that uses a storage account in subscription B, the Azure Machine Learning namespace must be registered in subscription B before the workspace can use the storage account.

  The resource provider for Azure Machine Learning is **Microsoft.MachineLearningServices**. For information on seeing whether it's registered or registering it, see [Azure resource providers and types](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-providers-and-types).

  > **Important:**
  > This information applies only to resources provided during workspace creation: Azure Storage Accounts, Azure Container Registry, Azure Key Vault, and Application Insights.


* For network isolation with online endpoints, you can use workspace-associated resources (Azure Container Registry (ACR), Storage account, Key Vault, and Application Insights) from a resource group different from your workspace. However, these resources must belong to the same subscription and tenant as your workspace. For information about the limitations that apply to securing managed online endpoints, using a workspace's managed virtual network, see [Network isolation with managed online endpoints](concept-secure-online-endpoint.md#limitations).

* Workspace creation also creates an Azure Container Registry (ACR) by default. Since ACR doesn't currently support Unicode characters in resource group names, use a resource group that avoids these characters.

* Azure Machine Learning doesn't support hierarchical namespace (Azure Data Lake Storage Gen2 feature) for the default storage account of the workspace.


> **Tip:**
> An Azure Application Insights instance is created when you create the workspace. You can delete the Application Insights instance after cluster creation if you want. Deleting it limits the information gathered from the workspace, and might make it more difficult to troubleshoot problems. **If you delete the Application Insights instance created by the workspace, the only way to recreate it is to delete and recreate the workspace**.
>
> For more information on using the Application Insights instance, see [Monitor and collect data from Machine Learning web service endpoints](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-enable-app-insights.md).

## Create a workspace

You can create a workspace [directly in Azure Machine Learning studio](quickstart-create-resources.md#create-the-workspace), with limited options available. You can also use one of these methods for more control of options:

# [Python SDK](#tab/python)


**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

* **Basic configuration for getting started**. If you don't specify, the process automatically creates [associated resources](concept-workspace.md#associated-resources) and the Azure resource group. This code creates a workspace named `myworkspace`, dependent Azure resources (Storage account, Key Vault, Container Registry, Application Insights), and a resource group named `myresourcegroup` in `eastus2`.

   [!notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/azureml-examples-main/sdk/python/resources/workspace/workspace.ipynb?name=basic_workspace_name)]

* **Use existing Azure resources**. To bring existing Azure resources, reference them by using the Azure resource ID format. Find the specific Azure resource IDs in the Azure portal, or with the SDK. This example assumes that the resource group, Storage account, Key Vault, Application Insights, and Container Registry already exist.

   [!notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/azureml-examples-main/sdk/python/resources/workspace/workspace.ipynb?name=basic_ex_workspace_name)]

* **Use existing hub workspace**. Instead of creating a default workspace with its own security settings and [associated resources](concept-workspace.md#associated-resources), you can reuse a [hub workspace](concept-hub-workspace.md)'s shared environment. Your new 'project' workspace obtains security settings and shared configurations from the hub including compute and connections. This example assumes that the hub workspace already exists.

   ```python
   from azure.ai.ml.entities import Project

   my_project_name = "myexampleproject"
   my_location = "East US"
   my_display_name = "My Example Project"
   
   my_hub = Project(name=my_hub_name, 
                   location=my_location,
                   display_name=my_display_name,
                   hub_id=created_hub.id)
   
   created_project_workspace = ml_client.workspaces.begin_create(workspace=my_hub).result()
   ```

For more information, see [Workspace SDK reference](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.entities.workspace).

If you have problems accessing your subscription, see [Set up authentication for Azure Machine Learning resources and workflows](how-to-setup-authentication.md), and the [Authentication in Azure Machine Learning](https://aka.ms/aml-notebook-auth) notebook.

# [Portal](#tab/azure-portal)

1. Sign in to the [Azure portal](https://portal.azure.com/) by using the credentials for your Azure subscription.

1. In the upper-left corner of Azure portal, select **+ Create a resource**.

    Screenshot show how to create a workspace in Azure portal.

1. Use the search bar to find **Machine Learning**.

1. Select **Machine Learning**.

1. In the **Machine Learning** pane, select **Create** to begin.

1. Provide the following information to configure your new workspace:

   | Field | Description |
   | --- | --- |
   | Workspace name | Enter a unique name that identifies your workspace. This example uses **docs-ws**. Names must be unique across the resource group. Use a name that's easy to recall and that differentiates from workspaces created by others. The workspace name is case-insensitive. |
   | Subscription | Select the Azure subscription that you want to use. |
   | Resource group | Use an existing resource group in your subscription. To create a new resource group, enter a name. A resource group holds related resources for an Azure solution. You need *contributor* or *owner* role to use an existing resource group. For more information about access, see [Manage access to an Azure Machine Learning workspace](how-to-assign-roles.md). |
   | Region | Select the Azure region closest both to your users and the data resources. |
   | Storage account | The default storage account for the workspace. By default, a new one is created. |
   | Key Vault | The Azure Key Vault used by the workspace. By default, a new one is created. |
   | Application Insights | The application insights instance for the workspace. By default, a new one is created. |
   | Container Registry | The Azure Container Registry for the workspace. By default, a new one isn't initially created for the workspace. Instead, creation of a Docker image during training or deployment additionally creates that Azure Container Registry for the workspace once you need it. |

   Screenshot of configuring your workspace.

1. When you finish the workspace configuration, select **Review + Create**. Optionally, use the [Networking](#networking), [Encryption](#encryption), [Identity](#identity), and  [Tags](#tags) sections to configure more workspace settings.

1. Review the settings and make any other changes or corrections. When you're satisfied with the settings, select **Create**.

   > **Warning:**
   > It can take several minutes to create your workspace in the cloud.

   When the process completes, a deployment success message appears.

1. To view the new workspace, select **Go to resource**.

1. To start using the workspace, select the **Studio web URL** link on the top right. You can also select the workspace from the [Azure Machine Learning studio](https://ml.azure.com) home page.

# [Studio](#tab/studio)

1. Enter a name for the Azure Machine Learning workspace resource.

1. Enter a friendly name to display your workspace in Studio.

1. Optionally, select a [hub workspace](concept-hub-workspace.md) to host your workspace in a shared environment for your team. The hub workspace provides preconfigured security, access to company resources, and shared compute. 

   Screenshot of creating a workspace using hub in Azure Machine Learning studio.

---

### Networking

> **Important:**
> For more information about using a private endpoint and virtual network with your workspace, see [Network isolation and privacy](how-to-network-security-overview.md).

# [Python SDK](#tab/python)


**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

[!Notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/azureml-examples-main/sdk/python/resources/workspace/workspace.ipynb?name=basic_private_link_workspace_name)]

This class requires an existing virtual network.

# [Portal](#tab/azure-portal)

1. The default network configuration uses a **Public endpoint**, which is accessible on the public internet. However, you can select **Private with Internet Outbound** or **Private with Approved Outbound** to limit access to your workspace to an Azure Virtual Network you created. Then, scroll down to configure the settings.

   Screenshot of the private endpoint selection.

1. Under **Workspace Inbound access**, select **Add** to open the **Create private endpoint** form.
1. On the **Create private endpoint** form, set the location, name, and virtual network to use. To use the endpoint with a Private DNS Zone, select **Integrate with private DNS zone** and select the zone using the **Private DNS Zone** field. Select **OK** to create the endpoint.

   Screenshot of the private endpoint creation.

1. If you selected **Private with Internet Outbound**, use the **Workspace Outbound access** section to configure the network and outbound rules.

1. If you selected **Private with Approved Outbound**, use the **Workspace Outbound access** section to add more rules to the required set.

1. When you finish the network configuration, you can select **Review + Create**, or advance to the optional **Encryption** configuration.

# [Studio](#tab/studio)

1. To create a workspace with disabled internet connectivity via Studio, specify a hub workspace that has public network access disabled. Workspaces created without a hub in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs) have public internet access enabled. A private hub has a 'lock' icon.

   Screenshot of the private hub with the 'lock' icon.
 
1. If you don't select a hub workspace at time of creation, the default network configuration uses a **Public endpoint**, which is accessible on the public internet. 

---

### Encryption

By default, an Azure Cosmos DB instance stores the workspace metadata. Microsoft maintains this Cosmos DB instance. Microsoft-managed keys encrypt this data.

#### Use your own data encryption key

You can provide your own key for data encryption. When you provide your own key, you create the Azure Cosmos DB instance that stores metadata in your Azure subscription. For more information, see [Customer-managed keys](concept-customer-managed-keys.md).

Use these steps to provide your own key:

> **Important:**
> Before you follow these steps, first perform these actions:
>
> Follow the steps in [Configure customer-managed keys](how-to-setup-customer-managed-keys.md) to:
>
> * Register the Azure Cosmos DB provider
> * Create and configure an Azure Key Vault
> * Generate a key

# [Python SDK](#tab/python)


**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

```python

from azure.ai.ml.entities import Workspace, CustomerManagedKey

# specify the workspace details
ws = Workspace(
    name="my_workspace",
    location="eastus",
    display_name="My workspace",
    description="This example shows how to create a workspace",
    customer_managed_key=CustomerManagedKey(
        key_vault="/subscriptions/<SUBSCRIPTION_ID>/resourcegroups/<RESOURCE_GROUP>/providers/microsoft.keyvault/vaults/<VAULT_NAME>",
        key_uri="<KEY-IDENTIFIER>"
    ),
    tags=dict(purpose="demo")
)

ml_client.workspaces.begin_create(ws)
```

# [Portal](#tab/azure-portal)

1. Select **Encrypt data using a customer-managed key**, and then select **Click to select key**. This configuration creates Azure resources used to encrypt data in your Azure subscription. Alternatively, select **Use service-side encryption** to use service-side resources for encryption. For more information, see [Customer-managed keys](concept-customer-managed-keys.md).

    Screenshot of the customer-managed keys.

1. On the **Select key from Azure Key Vault** form, select an existing Azure Key Vault, a key that it contains, and the key version. This key encrypts the data stored in Azure Cosmos DB. Finally, use the **Select** button to use this key.

   Screenshot of selecting a key from the key vault.

# [Studio](#tab/studio)

1. To create a workspace with customer-managed key encryption via Studio, specify a hub workspace that has customer-managed key encryption enabled. To verify the hub workspace configuration, view it in the Azure portal. 
 
1. If you don't select a hub workspace at time of creation, your workspace uses Microsoft-managed keys by default.
   
---

### Identity

In the portal, use the **Identity** page to configure managed identity, storage account access, and data impact. For the Python SDK, see the links in the following sections.

#### Managed identity

You can assign either a system assigned identity or a user assigned identity to a workspace. Use this identity to access resources in your subscription. For more information, see [Set up authentication between Azure Machine Learning and other services](how-to-identity-based-service-authentication.md).

#### Storage account access

Choose between **Credential-based access** or **Identity-based access** when connecting to the default storage account. For identity-based authentication, you must grant the Storage Blob Data Contributor role to the workspace managed identity on the storage account.

#### Data impact

To limit the data that Microsoft collects on your workspace, select **High business impact workspace** in the portal, or set `hbi_workspace=true ` in Python. For more information on this setting, see [Encryption at rest](concept-data-encryption.md#encryption-at-rest).

> **Important:**
> You can select high business impact only when creating a workspace. You can't change this setting after workspace creation.

### Tags

Tags are name/value pairs that you use to categorize resources and view consolidated billing by applying the same tag to multiple resources and resource groups.

Assign tags for the workspace by entering the name/value pairs. For more information, see [Use tags to organize your Azure resources](https://learn.microsoft.com/azure/azure-resource-manager/management/tag-resources).

Also use tags to [enforce policies](#enforce-policies).



### Download a configuration file

If you run your code on a [compute instance](quickstart-create-resources.md), skip this step. The compute instance creates and stores a copy of this file for you.

To use code on your local environment that references this workspace, download the file:

1. Select your workspace in [Azure studio](https://ml.azure.com)
1. At the top right, select the workspace name, then select  **Download config.json**

   Screenshot of the 'download config.json' option.

Place the file in the directory structure that holds your Python scripts or Jupyter Notebooks. The same directory, a subdirectory named *.azureml*, or a parent directory can hold this file. When you create a compute instance, you add this file to the correct directory on the VM.

## Enforce policies

Turn on or off these features for a workspace:

* Feedback opportunities in the workspace. Opportunities include occasional in-product surveys and the smile-frown feedback tool in the banner of the workspace.
* Ability to [try out preview features](how-to-enable-preview-features.md) in the workspace.

These features are on by default. To turn them off:

* When creating the workspace, turn off features from the [Tags](#tags) section:

   1. Turn off feedback by adding the pair `ADMIN_HIDE_SURVEY: TRUE`
   1. Turn off previews by adding the pair `AZML_DISABLE_PREVIEW_FEATURE: TRUE`

* For an existing workspace, turn off features from the **Tags** section:

   1. Go to workspace resource in the [Azure portal](https://portal.azure.com).
   1. Open **Tags** from the left panel.
   1. Turn off feedback by adding the pair `ADMIN_HIDE_SURVEY: TRUE`
   1. Turn off previews by adding the pair `AZML_DISABLE_PREVIEW_FEATURE: TRUE`.
   1. Select **Apply**.  

Screenshot shows setting tags to prevent feedback in the workspace.

You can turn off previews at a subscription level, ensuring that it's off for all workspaces in the subscription. In this case, users in the subscription also can't access the preview tool before selecting a workspace. This setting is useful for administrators who want to ensure that preview features aren't used in their organization. 

If the preview setting is disabled at the subscription level, setting it on individual workspaces is ignored.

To disable preview features at the subscription level:

1. Go to subscription resource in the [Azure portal](https://portal.azure.com).
1. Open **Tags** from the left panel.
1. Turn off previews for all workspaces in the subscription by adding the pair `AZML_DISABLE_PREVIEW_FEATURE: TRUE`.
1. Select **Apply**.  

## Connect to a workspace

When you run machine learning tasks by using the SDK, you need an `MLClient` object that specifies the connection to your workspace. You can create an `MLClient` object from parameters or by using a configuration file.


**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

* **By using a configuration file:** This code reads the contents of the configuration file to find your workspace. It opens a prompt to sign in if you didn't already authenticate.

    ```python
    from azure.ai.ml import MLClient
    
    # read the config from the current directory
    ws_from_config = MLClient.from_config(credential=DefaultAzureCredential())
    ```
* **From parameters:** You don't need a config.json file if you use this approach.
    
    [!notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/azureml-examples-main/sdk/python/resources/workspace/workspace.ipynb?name=ws)]

If you have problems accessing your subscription, see [Set up authentication for Azure Machine Learning resources and workflows](how-to-setup-authentication.md), and the [Authentication in Azure Machine Learning](https://aka.ms/aml-notebook-auth) notebook.

## Find a workspace

See a list of all the workspaces you have available. You can also search for a workspace inside Studio. See [Search for Azure Machine Learning assets (preview)](how-to-search-assets.md).

# [Python SDK](#tab/python)


**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

[!Notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/azureml-examples-main/sdk/python/resources/workspace/workspace.ipynb?name=my_ml_client)]
[!Notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/azureml-examples-main/sdk/python/resources/workspace/workspace.ipynb?name=ws_name)]

To get specific workspace details:

[!Notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/azureml-examples-main/sdk/python/resources/workspace/workspace.ipynb?name=ws_location)]

# [Portal](#tab/azure-portal)

1. Sign in to the [Azure portal](https://portal.azure.com/).

1. In the top search field, type **Machine Learning**.

1. Select **Machine Learning**.

   Screenshot of searching for an Azure Machine Learning workspace.

1. Look through the list of the workspaces. You can filter based on subscription, resource groups, and locations.

1. To display properties, select a workspace.

# [Studio](#tab/studio)

1. In [Azure Machine Learning studio](https://ml.azure.com), select **All workspaces** from the left side navigation. A list of recently used workspaces appears.
1. To view all workspaces that you have access to, select **Workspaces** from the left side navigation.

---

## Delete a workspace

When you no longer need a workspace, delete it.


> **Warning:**
> If soft-delete is enabled for the workspace, it can be recovered after deletion. If soft-delete isn't enabled, or you select the option to permanently delete the workspace, it can't be recovered. For more information, see [Recover a deleted workspace](concept-soft-delete.md).

> **Tip:**
> The default behavior for Azure Machine Learning is to _soft delete_ the workspace. This behavior means that the workspace isn't immediately deleted, but instead is marked for deletion. For more information, see [Soft delete](concept-soft-delete.md).

# [Python SDK](#tab/python)


**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

```python
ml_client.workspaces.begin_delete(name=ws_basic.name, delete_dependent_resources=True)
```

The default action doesn't automatically delete resources associated with the workspace. Set `delete_dependent_resources` to True to delete these resources as well.

- container registry
- storage account
- key vault
- application insights


# [Portal](#tab/azure-portal)

In the [Azure portal](https://portal.azure.com/), select **Delete**  at the top of the workspace you want to delete.

Screenshot of deleting a workspace.

# [Studio](#tab/studio)

You can't delete a workspace from studio. Instead, use the Azure portal or the Python SDK.

---

## Clean up resources


>**Important:**
>The resources that you created can be used as prerequisites to other Azure Machine Learning tutorials and how-to articles.

If you don't plan to use any of the resources that you created, delete them so you don't incur any charges:

1. In the Azure portal, in the search box, enter *Resource groups* and select it from the results.

1. From the list, select the resource group that you created.

1. In the **Overview** page, select **Delete resource group**.

   Screenshot of the selections to delete a resource group in the Azure portal.

1. Enter the resource group name. Then select **Delete**.


## Troubleshooting

* **Supported browsers in Azure Machine Learning studio**: Use the most up-to-date browser that's compatible with your operating system. These browsers are supported:
  * Microsoft Edge (The new Microsoft Edge, latest version. Note: Microsoft Edge legacy isn't supported)
  * Safari (latest version, Mac only)
  * Chrome (latest version)
  * Firefox (latest version)

* **Azure portal**:
  * If you go directly to your workspace from a share link from the SDK or the Azure portal, you can't view the standard **Overview** page that has subscription information in the extension. Additionally, in this scenario, you can't switch to another workspace. To view another workspace, go directly to [Azure Machine Learning studio](https://ml.azure.com) and search for the workspace name.
  * You can only access all assets (Data, Experiments, Computes, and so on) in [Azure Machine Learning studio](https://ml.azure.com). The Azure portal doesn't offer them.
  * Attempting to export a template for a workspace from the Azure portal might return an error similar to this text: `Could not get resource of the type <type>. Resources of this type will not be exported.` As a workaround, use one of the templates provided at [https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.machinelearningservices](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.machinelearningservices) as the basis for your template.

### Workspace diagnostics


You can run diagnostics on your workspace from Azure Machine Learning studio or the Python SDK. After diagnostics run, a list of any detected problems is returned. This list includes links to possible solutions. For more information, see [How to use workspace diagnostics](how-to-workspace-diagnostic-api.md).

### Resource provider errors


When creating an Azure Machine Learning workspace, or a resource used by the workspace, you might get an error that's similar to one of these:

* `No registered resource provider found for location {location}`
* `The subscription is not registered to use namespace {resource-provider-namespace}`

Most resource providers are automatically registered, but not all of them. If you see this message, you need to register a provider.

The following table contains a list of resource providers required by Azure Machine Learning:

| Resource provider | Why it's needed |
| --- | --- |
| __Microsoft.MachineLearningServices__ | Creating the Azure Machine Learning workspace. |
| __Microsoft.Storage__ | An Azure Storage account is used as the default storage for the workspace. |
| __Microsoft.ContainerRegistry__ | Azure Container Registry is used by the workspace to build Docker images. |
| __Microsoft.KeyVault__ | Azure Key Vault is used by the workspace to store secrets. |
| __Microsoft.Notebooks__ | An Azure Machine Learning compute instance uses integrated notebooks. |
| __Microsoft.ContainerService__ | You want to deploy trained models to Azure Kubernetes Services. |

If you want to use a customer-managed key with Azure Machine Learning, you must register the following service providers:

| Resource provider | Why it's needed |
| --- | --- |
| __Microsoft.DocumentDB__ | An Azure Cosmos DB instance logs metadata for the workspace. |
| __Microsoft.Search__ | Azure Search provides indexing capabilities for the workspace. |

If you want to use a managed virtual network with Azure Machine Learning, you must register the __Microsoft.Network__ resource provider. This resource provider is used by the workspace when private endpoints for the managed virtual network are created.

For information on registering resource providers, see [Resolve errors for resource provider registration](https://learn.microsoft.com/azure/azure-resource-manager/templates/error-register-resource-provider).


### Deleting the Azure Container Registry

The Azure Machine Learning workspace uses the Azure Container Registry (ACR) for some operations. It automatically creates an ACR instance when it first needs one.


> **Warning:**
> After an Azure Container Registry is created for a workspace, don't delete it. Doing so makes your Azure Machine Learning workspace inoperative.

## Examples

Examples in this article come from [workspace.ipynb](https://github.com/Azure/azureml-examples/blob/main/sdk/python/resources/workspace/workspace.ipynb).

## Next steps

After creating a workspace, learn how to [Train and deploy a model](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/tutorial-train-deploy-notebook.md).

To learn more about planning a workspace for your organization's requirements, visit [Organize and set up Azure Machine Learning](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/azure-best-practices/ai-machine-learning-resource-organization).

* If you need to move a workspace to another Azure subscription, visit [How to move a workspace](how-to-move-workspace.md).

For information on how to keep your Azure Machine Learning up to date with the latest security updates, visit [Vulnerability management](concept-vulnerability-management.md).
