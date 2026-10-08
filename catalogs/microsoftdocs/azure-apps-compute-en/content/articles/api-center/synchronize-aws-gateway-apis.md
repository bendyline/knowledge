---
title: Synchronize APIs from Amazon API Gateway - Azure API Center
description: Integrate an Amazon API Gateway to Azure API Center for automatic synchronization of APIs to the inventory.

ms.service: azure-api-center
ms.topic: how-to
ms.date: 01/21/2026
 
ms.custom: 
  - devx-track-azurecli
ms.collection: 
 - migration
 - aws-to-azure
# Customer intent: As an API program manager, I want to integrate my Azure API Management instance with my API center and synchronize API Management APIs to my inventory.
---

# Synchronize APIs from Amazon API Gateway to Azure API Center

This article shows how to integrate an Amazon API Gateway so that the gateway's APIs are continuously kept up to date in your [API center](overview.md) inventory.

## About integrating Amazon API Gateway

Integrating Amazon API Gateway as an API source for your API center enables continuous synchronization so that the API inventory stays up to date. Azure API Center can also synchronize APIs from sources including [Azure API Management](synchronize-api-management-apis.md). 

When you integrate an Amazon API Gateway as an API source, the following happens:

1. The API center inventory adds APIs, and optionally API definitions (specs), from the API Gateway.
1. You configure an [environment](key-concepts.md#environment) of type *Amazon API Gateway* in the API center. 
1. You create an associated [deployment](key-concepts.md#deployment) for each synchronized API definition. 

Synchronization is one-way from Amazon API Gateway to your Azure API center, meaning API updates in the API center aren't synchronized back to Amazon API Gateway.

> **Note:**
> * There are [limits](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md?toc=/azure/api-center/toc.json\&bc=/azure/api-center/breadcrumb/toc.json#azure-api-center-limits) for the number of integrated API sources.
> * APIs in Amazon API Gateway synchronize to your API center once per hour. Only REST APIs are synchronized.
> * API definitions also synchronize to the API center if you select the option to include them during integration. Only definitions from deployed APIs are synchronized.

### Entities synchronized from Amazon API Gateway

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

* An API center in your Azure subscription. If you didn't create one, see [Quickstart: Create your API center](set-up-api-center.md).

* An Azure key vault. If you need to create one, see [Quickstart: Create a key vault using the Azure portal](https://learn.microsoft.com/azure/key-vault/general/quick-create-portal). To add or manage secrets in the key vault, you need at least the **Key Vault Secrets Officer** role or equivalent permissions. 

* An [Amazon API Gateway](https://docs.aws.amazon.com/apigateway/). 

* An AWS [IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) identity with the `AmazonAPIGatewayAdministrator` policy attached.

* For Azure CLI:
    [Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/synchronize-aws-gateway-apis.md)

    
> **Note:**
> The `az apic` commands require the `apic-extension` Azure CLI extension. The extension can be installed dynamically when you run your first `az apic` command, or you can install the extension manually. For more information, see [Manage Azure CLI Extensions: Install, Update, and Remove](https://learn.microsoft.com/cli/azure/azure-cli-extensions-overview).
>
> For the latest changes and updates in the `apic-extension`, see the [release notes](https://github.com/Azure/azure-cli-extensions/blob/main/src/apic-extension/HISTORY.rst). Certain features might require a preview or specific version of the extension.


    > [!NOTE]
    > You can run Azure CLI command examples in this article in PowerShell or a bash shell. Where needed because of different variable syntax, separate command examples are provided for the two shells.

## Create IAM user access keys

To authenticate your API center to Amazon API Gateway, you need access keys for an AWS IAM user. 

To generate the required access key ID and secret key by using the AWS Management Console, see [Create an access key for yourself](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-key-self-managed.html#Using_CreateAccessKey) in the AWS documentation. 

Save your access keys in a safe location. You'll store them in Azure Key Vault in the next steps.

> **Caution:**
> Access keys are long-term credentials. Manage them as securely as you would a password. Learn more about [securing access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/securing_access-keys.html)

## Store IAM user access keys in Azure Key Vault

Manually upload and securely store the two IAM user access keys in Azure Key Vault by using the configuration recommended in the following table. For more information, see [Quickstart: Set and retrieve a secret from Azure Key Vault using the Azure portal](https://learn.microsoft.com/azure/key-vault/secrets/quick-create-portal). 


| AWS secret | Upload options | Name | Secret value |
| --- | --- | --- | --- |
| Access key | Manual | *aws-access-key* | Access key ID retrieved from AWS |
| Secret access key | Manual | *aws-secret-access-key* | Secret access key retrieved from AWS |

Screenshot of secrets list in Azure Key Vault in the portal.

Take note of the **Secret identifier** of each secret, a URI similar to `https://<key-vault-name>.vault.azure.net/secrets/<secret-name>`. You use these identifiers in the next steps.

## Configure a managed identity for your API center


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



### Assign the managed identity the Key Vault Secrets User role


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



## Integrate an Amazon API Gateway 

You can integrate an Amazon API Gateway by using the portal or the Azure CLI.

#### [Portal](#tab/portal)
1. In the [portal](https://portal.azure.com), go to your API center.
1. Under **Platforms**, select **Integrations**.
1. Select **+ New integration** > **From Amazon API Gateway**.
1. In **Integrate your Amazon API Gateway Service**:
    1. For the **AWS access key** and **AWS secret access key**, select **Select** and choose the subscription, key vault, and secret that you stored. 
    1. Select the **AWS region** where you deployed the Amazon API Gateway.
    1. In **Integration details**, enter an identifier.
    1. In **Environment details**, enter an **Environment title** (name), **Environment type**, and optional **Description**.
    1. In **API Details**:
        1. Select a **Lifecycle** for the synchronized APIs. (You can update this value for the APIs after you add them to your API center.)
        1. Optionally, select whether to include API definitions with the synchronized APIs.
1. Select **Create**.


Screenshot of integrating an Amazon API Gateway service in the portal.

#### [Azure CLI](#tab/cli)

Run the [az apic integration create aws](https://learn.microsoft.com/cli/azure/apic/integration/create#az-apic-integration-create-aws) command to integrate an Amazon API Gateway to your API center. 


* Provide the names of the resource group, API center, and integration. 

* Provide the Key Vault secret identifiers for the AWS access key and secret access key, and the AWS region where you deployed the Amazon API Gateway.

```azurecli
az apic integration create aws \
    --resource-group <resource-group-name> \
    --service-name-name <api-center-name> \
    --integration-name <aws-integration-name> \
    --aws-access-key-reference <access-key-uri> \
    --aws-secret-access-key-reference <secret-access-key-uri> 
    --aws-region-name <aws-region>
``` 
---

The environment is added to your API center. The Amazon API Gateway APIs are imported to the API center inventory.


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
* [Synchronize APIs from API Management to your Azure API center](synchronize-api-management-apis.md)
