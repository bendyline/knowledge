---
title: Synchronize APIs from Azure API Management instance
description: Integrate an API Management instance to Azure API Center for automatic synchronization of APIs to the inventory.

ms.service: azure-api-center
ms.topic: how-to
ms.date: 01/20/2026
 
ms.custom: devx-track-azurecli
# Customer intent: As an API program manager, I want to integrate my Azure API Management instance with my API center and synchronize API Management APIs to my inventory.
---

# Synchronize APIs from an API Management instance

This article shows how to integrate (link) an API Management instance so that the instance's APIs are continuously kept up to date in your [API center](overview.md) inventory. 

> **Tip:**
> This article explains how to integrate an API Management instance from your API center. Alternatively, quickly set up integration directly from an API Management instance. In the left menu of your instance, under **APIs**, select **API Center**, and select a target API center in your subscription to synchronize APIs to.


> **Note:**
> API Center Standard can now be used at no additional cost when you link it to an API Management instance in the Standard, Standard v2, Premium, or Premium v2 tier. For more information, see [API Center plans and features](https://learn.microsoft.com/azure/api-center/overview#api-center-plans-and-features).

## About integrating an API Management instance

Although you can use the Azure CLI to [import](import-api-management-apis.md) APIs on demand from Azure API Management to Azure API Center, integrating (linking) an API Management instance enables continuous synchronization so that the API inventory stays up to date. Azure API Center can also synchronize APIs from sources including [Amazon API Gateway](synchronize-aws-gateway-apis.md). 

When you integrate an API Management instance as an API source, the following happens:

1. All APIs, and optionally API definitions (specs), from the API Management instance are added to the API center inventory. MCP servers and A2A agent APIs in API Management are included in the APIs added to the inventory.
1. You configure an [environment](key-concepts.md#environment) of type *Azure API Management* in the API center. 
1. An associated [deployment](key-concepts.md#deployment) is created for each synchronized API definition from API Management. 

API Management APIs automatically synchronize to the API center whenever existing APIs' settings change (for example, new versions are added), new APIs are created, or APIs are deleted. This synchronization is one-way from API Management to your Azure API center, meaning API updates in the API center aren't synchronized back to the API Management instance.

> **Note:**
> * There are [limits](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md?toc=/azure/api-center/toc.json\&bc=/azure/api-center/breadcrumb/toc.json#azure-api-center-limits) for the number of integrated API Management instances (API sources).
> * You can configure an integrated API Management instance in a virtual network.
> * API updates in API Management typically synchronize to your API center within minutes, but synchronization can take up to 24 hours.
> * API definitions also synchronize to the API center if you select the option to include them during integration.

### Entities synchronized from API Management

You can add or update metadata properties and documentation to the synchronized APIs in your API center to help stakeholders discover, understand, and consume the APIs. Learn more about Azure API Center's [built-in and custom metadata properties](tutorials/add-metadata-properties.md).

The following table shows entity properties that can be modified in Azure API Center and properties that are set based on their values in the API source. 

| Entity | Properties configurable in API Center | Properties determined in integrated API source |
| --- | --- | --- |
| API | summary<br />lifecycleStage<br />termsOfService<br />license<br />externalDocumentation<br />customProperties | title<br />description<br />kind |
| API version | lifecycleStage | title<br />definitions (if synchronized) |
| Environment | title<br />description<br />kind</br>server.managementPortalUri<br />onboarding<br />customProperties | server.type |
| Deployment | title<br />description<br />server<br />state<br />customProperties | server.runtimeUri |

> **Note:**
> Resource and system IDs for entities synchronized to Azure API Center are automatically generated and can't be changed.

## Prerequisites

* An API center in your Azure subscription. If you didn't create an API center, see [Quickstart: Create your API center](set-up-api-center.md).

* An Azure API Management instance, in the same or a different subscription. The instance must be in the same directory. 

* For Azure CLI:
    [Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/synchronize-api-management-apis.md)

    
> **Note:**
> The `az apic` commands require the `apic-extension` Azure CLI extension. The extension can be installed dynamically when you run your first `az apic` command, or you can install the extension manually. For more information, see [Manage Azure CLI Extensions: Install, Update, and Remove](https://learn.microsoft.com/cli/azure/azure-cli-extensions-overview).
>
> For the latest changes and updates in the `apic-extension`, see the [release notes](https://github.com/Azure/azure-cli-extensions/blob/main/src/apic-extension/HISTORY.rst). Certain features might require a preview or specific version of the extension.


    > [!NOTE]
    > You can run Azure CLI command examples in this article in PowerShell or a bash shell. Where different variable syntax is required, the article provides separate command examples for the two shells.

## Enable a managed identity in your API center


For this scenario, your API center uses a [managed identity](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview) to access Azure resources. Depending on your needs, enable either a system-assigned or one or more user-assigned managed identities. 

The following examples show how to enable a system-assigned managed identity by using the Azure portal or the Azure CLI. At a high level, configuration steps are similar for a user-assigned managed identity. 

#### [Portal](#tab/portal)

1. In the [portal](https://azure.microsoft.com), go to your API center.
1. In the sidebar menu, under **Security**, select **Managed identities**.
1. Select **System assigned**, and set the status to **On**.
1. Select **Save**.

#### [Azure CLI](#tab/cli)

Set the system-assigned identity in your API center using the following [az apic update](https://learn.microsoft.com/cli/azure/apic#az-apic-update) command. Substitute the names of your API center and resource group:

```azurecli 
az apic update --name <api-center-name> --resource-group <resource-group-name> --identity '{"type": "SystemAssigned"}'
```
---



### Assign the managed identity the API Management Service Reader role


To allow import of APIs, assign your API center's managed identity the **API Management Service Reader** role in your API Management instance. You can use the [portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal-managed-identity) or the Azure CLI.

#### [Portal](#tab/portal)

1. In the [portal](https://azure.microsoft.com), navigate to your API Management instance.
1. In the left menu, select **Access control (IAM)**.
1. Select **+ Add role assignment**.
1. On the **Add role assignment** page, set the values as follows: 
    1. On the **Role** tab, select **API Management Service Reader**.
    1. On the **Members** tab, in **Assign access to** - Select **Managed identity** > **+ Select members**.
    1. On the **Select managed identities** page, select the system-assigned managed identity of your API center that you added in the previous section. Click **Select**.
    1. Select **Review + assign**.

#### [Azure CLI](#tab/cli)

1. Get the principal ID of the identity. For a system-assigned identity, use the [az apic show](https://learn.microsoft.com/cli/azure/apic#az-apic-show) command. 

    ```azurecli
    #! /bin/bash
    apicObjID=$(az apic show --name <api-center-name> \
        --resource-group <resource-group-name> \
        --query "identity.principalId" --output tsv)
    ```

    ```azurecli
    # Formatted for PowerShell
    $apicObjID=$(az apic show --name <api-center-name> `
        --resource-group <resource-group-name> `
        --query "identity.principalId" --output tsv)
    ```

1. Get the resource ID of your API Management instance using the [az apim show](https://learn.microsoft.com/cli/azure/apim#az-apim-show) command.
 
    ```azurecli
    #! /bin/bash
    apimID=$(az apim show --name <apim-name> --resource-group <resource-group-name> --query "id" --output tsv)
    ```

    ```azurecli
    # Formatted for PowerShell
    $apimID=$(az apim show --name <apim-name> --resource-group <resource-group-name> --query "id" --output tsv)
    ```

1. Assign the managed identity the **API Management Service Reader** role in your API Management instance using the [az role assignment create](https://learn.microsoft.com/cli/azure/role/assignment#az-role-assignment-create) command.

    ```azurecli
    #! /bin/bash
    scope="${apimID:1}"

    az role assignment create \
        --role "API Management Service Reader Role" \
        --assignee-object-id $apicObjID \
        --assignee-principal-type ServicePrincipal \
        --scope $scope 
    ```
    
    ```azurecli
    # Formatted for PowerShell
    $scope=$apimID.substring(1)

    az role assignment create `
        --role "API Management Service Reader Role" `
        --assignee-object-id $apicObjID `
        --assignee-principal-type ServicePrincipal `
        --scope $scope 
---


## Integrate an API Management instance 

You can integrate an API Management instance by using the portal or the Azure CLI.

#### [Portal](#tab/portal)

1. In the [portal](https://portal.azure.com), go to your API center.
1. Under **Platforms**, select **Integrations**.
1. Select **+ New integration** > **From Azure API Management**.
1. In **Integrate your Azure API Management Service**:
    1. Select whether to synchronize all APIs from the API Management instance or only APIs that are in an API Management [workspace](../api-management/workspaces-overview.md). 
    1. Select the **Subscription**, **Resource group**, and **Azure API Management service** that you want to integrate. If you want to synchronize only APIs from a workspace, make a selection in **Choose a workspace**.
    1. In **Integration details**, enter an identifier.
        If you haven't already configured a managed identity with access to the API Management instance, enable **Automatically configure managed identity and assign permissions**. This selection automatically assigns the API center's system-assigned managed identity the necessary permissions to synchronize APIs from the API Management instance.
    1. In **Environment details**, enter an **Environment title** (name), **Environment type**, and optional **Description**.
    1. In **API Details**:
        1. Select a **Lifecycle** for the synchronized APIs. (You can update this value for the APIs after they're added to your API center.)
        1. Optionally, select whether to include API definitions with the synchronized APIs.
1. Select **Create**.

Screenshot of integrating an Azure API Management service in the portal.

#### [Azure CLI](#tab/cli)

Run the [az apic integration create apim](https://learn.microsoft.com/cli/azure/apic/integration/create#az-apic-integration-create-apim) command to integrate an API Management instance to your API center. 

* Provide the names of the resource group, API center, and integration.  

* If the API Management instance and the API center are in the same resource group, you can provide the API Management instance name as the value of `azure-apim`. Otherwise, provide the Azure resource ID. 

```azurecli
az apic integration create apim \
    --resource-group <resource-group-name> \
    --service-name <api-center-name> \
    --integration-name <apim-integration-name> \
    --azure-apim <apim-instance-name>
``` 
---

The API Management instance is integrated as an environment in your API center. The API Management APIs are synchronized to the API center inventory.


## Delete an integration

While an API source is integrated, you can't delete synchronized APIs from your API center. If you need to, you can delete the integration. When you delete an integration:

* The synchronized APIs in your API center inventory are deleted
* The environment and deployments associated with the API source are deleted

You can delete an integration using the portal or the Azure CLI. 

#### [Portal](#tab/portal)

1. In the [portal](https://portal.azure.com), navigate to your API center.
1. Under **Assets**, select **Environments** > **Integrations**.
1. Select the integration, and then select **Delete** (trash can icon). 

#### [Azure CLI](#tab/cli)

Run the [az apic integration delete](https://learn.microsoft.com/cli/azure/apic/integration#az-apic-integration-delete) command to delete an integration. Provide the names of the resource group, API center, and integration.

```azurecli
az apic integration delete \
    --resource-group <resource-group-name> \
    --service-name <api-center-name> \
    --integration-name <integration-name> \
```
---

## Related content
 
* [Manage API inventory with Azure CLI commands](manage-apis-azure-cli.md)
* [Import APIs from API Management to your Azure API center](import-api-management-apis.md)
* [Register and discover MCP servers in your API center](register-discover-mcp-server.md)
* [Azure API Management documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/index.yml)
