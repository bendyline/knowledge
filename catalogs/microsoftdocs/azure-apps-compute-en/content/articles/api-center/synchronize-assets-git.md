---
title: Synchronize API Assets from a Git Repository
description: Learn how to integrate a Git repository with Azure API Center to automatically synchronize API assets into your API inventory.
ms.service: azure-api-center
ms.topic: how-to
ms.date: 06/01/2026
ai-usage: ai-assisted

ms.collection: ce-skilling-ai-copilot
ms.update-cycle: 180-days
# Customer intent: As an API program manager, I want to synchronize API assets from a Git repository into my API Center inventory so that my inventory stays up to date automatically.
ms.custom:
---

# Synchronize API assets from a Git repo to Azure API Center

This article describes how to integrate a Git repository with Azure API Center to automatically synchronize API assets such as [skills](register-discover-skills.md), [agents](register-manage-agents.md), and [MCP servers](register-discover-mcp-server.md) into your API inventory. By connecting a Git repository, you can keep your API center inventory up to date without manually registering or updating each asset.

When you integrate a Git repository:

* Your API center creates an [environment](key-concepts.md#environment) that represents the repository as a source of assets.
* API Center regularly synchronizes asset information from the repository to your API center inventory.

## Prerequisites

- An API center. If you don't have an API center yet, see the quickstart to [Create an API center](set-up-api-center.md).
- A Git repository containing the assets you want to synchronize.
- For non-public repositories, a personal access token (PAT) to access the repository. The PAT must have appropriate permissions to read the repository content. To create a PAT for GitHub, see [Create a fine-grained personal access token](https://docs.github.com/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token).
- An Azure key vault to store the PAT, if one is used for access. If you need to create a key vault, see [Quickstart: Create a key vault using the Azure portal](https://learn.microsoft.com/azure/key-vault/general/quick-create-portal). To add or manage secrets in the key vault, you need at least the **Key Vault Secrets Officer** role or equivalent permissions.
- For Azure CLI:
    [Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/synchronize-assets-git.md)

    > **Note:**
    > You can run Azure CLI command examples in this article in PowerShell or a bash shell. Where needed because of different variable syntax, separate command examples are provided for the two shells.

## Store PAT in Azure Key Vault

If your Git repository is private, manually upload and securely store a PAT to Azure Key Vault that grants access to the repository. When you integrate the Git repository with your API center, configure the integration to use this secret.

For more information, see [Quickstart: Set and retrieve a secret from Azure Key Vault using the Azure portal](https://learn.microsoft.com/azure/key-vault/secrets/quick-create-portal).

If you don't need to configure a PAT, proceed to [Integrate a Git repository](#integrate-a-git-repository).

## Configure a managed identity for your API center

Your API center uses a managed identity to authenticate to Azure Key Vault and retrieve the PAT needed to access the Git repository. The following procedures describe how to manually configure a managed identity for your API center and assign it the necessary permissions to access the Key Vault.

If you don't configure the managed identity, API Center can configure it for you automatically when you integrate the Git repository.


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



## Assign the managed identity the Key Vault Secrets User role


To allow import of the assets, assign your API center's managed identity the **Key Vault Secrets User** role in your Azure key vault. You can use the [portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal-managed-identity) or the Azure CLI.

#### [Portal](#tab/portal)

1. In the [portal](https://azure.microsoft.com), go to your key vault.
1. In the sidebar menu, select **Access control (IAM)**.
1. Select **+ Add role assignment**.
1. On the **Add role assignment** page, set the values as follows: 
    1. On the **Role** tab, select **Key Vault Secrets User**.
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

1. Get the resource ID of your key vault using the [az keyvault show](https://learn.microsoft.com/cli/azure/keyvault#az-keyvault-show) command.
 
    ```azurecli
    #! /bin/bash
    kvID=$(az keyvault show --name <kv-name> --resource-group <resource-group-name> --query "id" --output tsv)
    ```

    ```azurecli
    # Formatted for PowerShell
    $kvID=$(az keyvault show --name <kv-name> --resource-group <resource-group-name> --query "id" --output tsv)
    ```

1. Assign the managed identity the **Key Vault Secrets User** role in your key vault the [az role assignment create](https://learn.microsoft.com/cli/azure/role/assignment#az-role-assignment-create) command.

    ```azurecli
    #! /bin/bash
    scope="${kvID:1}"

    az role assignment create \
        --role "Key Vault Secrets User" \
        --assignee-object-id $apicObjID \
        --assignee-principal-type ServicePrincipal \
        --scope $scope 
    ```
    
    ```azurecli
    # Formatted for PowerShell
    $scope=$apimID.substring(1)

    az role assignment create `
        --role "Key Vault Secrets User" `
        --assignee-object-id $apicObjID `
        --assignee-principal-type ServicePrincipal `
        --scope $scope 
    ```
---


## Integrate a Git repository

To integrate a Git repository:

1. In the [Azure portal](https://portal.azure.com), go to your API center.
1. In the sidebar menu, select **Platforms** > **Integrations**.
1. Select **+ New integration** and choose **From Git repository**.
1. On **Integrate your Git repository**, enter the following information:

    | Field | Description |
    | --- | --- |
    | **Configure Git repository source** |  |
    | **Repository URL** | Enter the URL to the Git repository containing asset files. Optionally, specify the branch and subfolder (for example, `https://github.com/<org>/<repo>/tree/main/skills`). |
    | **Git provider** | Select the provider (for example, **GitHub**). |
    | **Asset type configuration** | API Center configures a default **skill** asset type with file pattern `**/skill.md`. <br/><br/>Select **+ Add asset type** to add one or more asset types to sync. |
        | **Personal access token (PAT)** | If you have a PAT stored in Azure Key Vault, click **Select** to browse to the Key Vault secret.<br/><br/>Optionally, select **Automatically configure managed identity and assign permissions** if you didn't manually configure a managed identity to access the key vault secret. |
    | **Integration details** | Accept the generated link identifier or provide a custom ID for the integration link. |
    | **Environment details** | |
    | **Environment title** | Enter a friendly name for the repository environment (for example, *Git repository*). |
    | **Identification** | Enter an environment resource name (for example, *git-repository*). |
    | **Environment type** | Select the environment type (for example, **Production**). |
    | **Description** | Optionally add a description for the environment. |
    | **Asset details** | |
    | **Lifecycle** | Select the lifecycle stage for assets synced from the repository (for example, **Design**). |

    Screenshot of integrating a Git repo in an API center in the portal.
1. Select **Create**.

The portal adds the environment to your API center. The portal adds the assets from the repository to the API center inventory on the **Inventory** > **Assets** page. You can identify linked assets by the link icon in the list.

Screenshot of linked assets in API center in the portal.

## Related content

* [Register and discover skills in your API inventory](register-discover-skills.md)
* [Key concepts in Azure API Center](key-concepts.md)
