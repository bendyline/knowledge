---
title: Enable Secure Settings to a Test Instance 
description: Enable secure settings in your Azure IoT Operations instance for developing a production-ready scenario.
author: dominicbetts
ms.author: dobett
ms.service: azure-iot-operations
ms.topic: how-to
ms.date: 06/15/2026

#CustomerIntent: I deployed Azure IoT Operations with test settings, and now I want to enable secure settings to use the full feature set.
---

# Enable secure settings in Azure IoT Operations

The secure settings for Azure IoT Operations include the setup of secrets management and a user-assigned managed identity for cloud connections; for example, an OPC UA server or data flow endpoints.

This article provides instructions for enabling secure settings if you didn't do so during your initial deployment.

## Prerequisites

* An Azure IoT Operations instance [deployed with test settings](../deploy-iot-ops/howto-deploy-iot-test-operations.md).


- The Azure CLI installed on your development machine. Check [Available Azure CLI extensions](https://learn.microsoft.com/cli/azure/azure-cli-extensions-list) for the minimum required version to use the **azure-iot-ops** extension. Use `az --version` to check your version and `az upgrade` to update if necessary. For more information, see [Install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).
- The Azure IoT Operations extension for the Azure CLI. Use the following command to add the extension or update it to the latest version:

  ```azurecli
  az extension add --upgrade --name azure-iot-ops
  ```


* The latest version of the **connectedk8s** extension for Azure CLI. Use the following command to add the extension or update it to the latest version:

  ```bash
  az extension add --upgrade --name connectedk8s
  ```


The Azure CLI examples in this article use environment variables so that you can set each value once and then copy and paste the commands as-is. If you're using the Azure IoT Operations Codespaces environment from the [quickstart](../get-started-end-to-end-sample/quickstart-deploy.md), these variables are already set for you and you can skip this step. Otherwise, set the following environment variables in your shell before you run the commands.

The following scripts set the most commonly used environment variables:

| Environment variable | Description |
| --- | --- |
| `SUBSCRIPTION_ID` | The ID of the subscription that contains your Azure IoT Operations instance. |
| `RESOURCE_GROUP` | The name of the resource group that contains your Azure IoT Operations instance. |
| `AIO_INSTANCE_NAME` | The name of your Azure IoT Operations instance. To list your instances, run `az iot ops list -o table`. |
| `CLUSTER_NAME` | The name of the Azure Arc-enabled Kubernetes cluster that hosts your instance. |
| `LOCATION` | The Azure region to use for new resources, for example `eastus`. |

# [Bash](#tab/bash)

```bash
SUBSCRIPTION_ID=<subscription-id>
RESOURCE_GROUP=<resource-group-name>
AIO_INSTANCE_NAME=<instance-name>
CLUSTER_NAME=<cluster-name>
LOCATION=<region>
```

# [PowerShell](#tab/powershell)

```powershell
$SUBSCRIPTION_ID = "<subscription-id>"
$RESOURCE_GROUP = "<resource-group-name>"
$AIO_INSTANCE_NAME = "<instance-name>"
$CLUSTER_NAME = "<cluster-name>"
$LOCATION = "<region>"
```

---

You only need to set the variables that this article uses. This article might use additional environment variables for resource names that you choose. The article explains how to set them where they're introduced.


## Enable the cluster for secure settings

To enable secrets synchronization for your Azure IoT Operations instance, the _OIDC issuer_ and _workload identity federation_ features must be enabled on your cluster. This configuration is required for the [Azure Key Vault Secret Store extension](https://learn.microsoft.com/azure/azure-arc/kubernetes/secret-store-extension) to sync the secrets from an Azure Key Vault and store them on the edge as Kubernetes secrets.

For Azure Kubernetes Service (AKS) clusters, you can enable the OIDC issuer and workload identity features when you create the cluster or on an existing cluster. For more information, see [Deploy and configure Microsoft Entra Workload ID on an AKS cluster](https://learn.microsoft.com/azure/aks/workload-identity-deploy-cluster). For clusters on AKS Edge Essentials, the automated script enables these features by default. For AKS clusters on Azure Local, follow the steps to [Deploy and configure workload identity on an AKS enabled by Azure Arc cluster](https://learn.microsoft.com/azure/aks/aksarc/workload-identity) to create a new cluster if you don't have one with the required features.

For k3s clusters on Kubernetes, you can update an existing cluster. To enable and configure these features, use the following steps:

1. Update the cluster to enable OIDC issuer and workload identity.

    ```azurecli
    az connectedk8s update -n $CLUSTER_NAME -g $RESOURCE_GROUP --enable-oidc-issuer --enable-workload-identity
    ```

    If you enabled the OIDC issuer and workload identity features when you created the cluster, you don't need to run the previous command again. Use the following command to check the status of the OIDC issuer and workload identity features for your cluster:

    ```azurecli
    az connectedk8s show -g $RESOURCE_GROUP -n $CLUSTER_NAME --query "{ClusterName:name, OIDCIssuerEnabled:oidcIssuerProfile.enabled, WorkloadIdentityEnabled:securityProfile.workloadIdentity.enabled}"
    ```

1. Get the cluster's issuer URL.

    ```azurecli
    az connectedk8s show -g $RESOURCE_GROUP -n $CLUSTER_NAME --query oidcIssuerProfile.issuerUrl --output tsv
    ```

    Make a note of the output from this command to use in the next steps.

1. Create the k3s config file on the machine where you deployed your Kubernetes cluster:

    ```bash
    sudo nano /etc/rancher/k3s/config.yaml
    ```

1. Add the following content to the `config.yaml` file, replacing the `<SERVICE_ACCOUNT_ISSUER>` placeholder with the cluster issuer URL you made a note of previously:

    ```yml
    kube-apiserver-arg:
    - service-account-issuer=<SERVICE_ACCOUNT_ISSUER>
    - service-account-max-token-expiration=24h
    ```

    Save the file and exit the nano editor.

1. Restart the k3s service:

    ```bash
    sudo systemctl restart k3s
    ```

## Set up secrets management

Secrets management for Azure IoT Operations uses the Secret Store extension to sync the secrets from an Azure Key Vault and store them on the edge as Kubernetes secrets. The Secret Store extension requires a user-assigned managed identity with access to the Azure Key Vault where secrets are stored. To learn more, see [What are managed identities for Azure resources?](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview)

To set up secrets management:

1. [Create an Azure Key Vault](https://learn.microsoft.com/azure/key-vault/secrets/quick-create-cli#create-a-key-vault) to store secrets, and [give your user account permissions to manage secrets](https://learn.microsoft.com/azure/key-vault/secrets/quick-create-cli#give-your-user-account-permissions-to-manage-secrets-in-key-vault) by assigning the `Key Vault Secrets Officer` role. Ensure that your key vault uses **Azure role-based access control** as its permission model. To check this setting in the Azure portal, select your key vault and then select **Settings** > **Access configuration**.
1. [Create a user-assigned managed identity](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/how-manage-user-assigned-managed-identities?pivots=identity-mi-methods-azp#create-a-user-assigned-managed-identity) for the Secret Store extension to use to access the key vault.
1. Use the [az iot ops secretsync enable](https://learn.microsoft.com/cli/azure/iot/ops/secretsync#az-iot-ops-secretsync-enable) command to set up the Azure IoT Operations instance for secret synchronization. This command:

    - Creates a federated identity credential by using the user-assigned managed identity.
    - Adds a role assignment to the user-assigned managed identity for access to the Azure Key Vault.
    - Adds a minimum secret provider class associated with the Azure IoT Operations instance.

    # [Bash](#tab/bash)

    ```azurecli
    # Variable block
    AIO_INSTANCE_NAME="<AIO_INSTANCE_NAME>"
    RESOURCE_GROUP="<RESOURCE_GROUP>"
    USER_ASSIGNED_MI_NAME="<USER_ASSIGNED_MI_NAME>"
    KEYVAULT_NAME="<KEYVAULT_NAME>"
    
    #Get the resource ID of the user-assigned managed identity
    USER_ASSIGNED_MI_RESOURCE_ID=$(az identity show --name $USER_ASSIGNED_MI_NAME --resource-group $RESOURCE_GROUP --query id --output tsv)
    
    #Get the resource ID of the key vault
    KEYVAULT_RESOURCE_ID=$(az keyvault show --name $KEYVAULT_NAME --resource-group $RESOURCE_GROUP --query id --output tsv)
    
    #Enable secret synchronization
    az iot ops secretsync enable --instance $AIO_INSTANCE_NAME \
                                 --resource-group $RESOURCE_GROUP \
                                 --mi-user-assigned $USER_ASSIGNED_MI_RESOURCE_ID \
                                 --kv-resource-id $KEYVAULT_RESOURCE_ID
    ```

    # [PowerShell](#tab/powershell)

    ```azurecli
    # Variable block
    $AIO_INSTANCE_NAME="<AIO_INSTANCE_NAME>"
    $RESOURCE_GROUP="<RESOURCE_GROUP>"
    $USER_ASSIGNED_MI_NAME="<USER_ASSIGNED_MI_NAME>"
    $KEYVAULT_NAME="<KEYVAULT_NAME>"
    
    # Get the resource ID of the user-assigned managed identity
    $USER_ASSIGNED_MI_RESOURCE_ID=$(az identity show --name $USER_ASSIGNED_MI_NAME --resource-group $RESOURCE_GROUP --query id --output tsv)
    
    # Get the resource ID of the key vault
    $KEYVAULT_RESOURCE_ID=$(az keyvault show --name $KEYVAULT_NAME --resource-group $RESOURCE_GROUP --query id --output tsv)
    
    # Enable secret synchronization
    az iot ops secretsync enable --instance $AIO_INSTANCE_NAME `
                                 --resource-group $RESOURCE_GROUP `
                                 --mi-user-assigned $USER_ASSIGNED_MI_RESOURCE_ID `
                                 --kv-resource-id $KEYVAULT_RESOURCE_ID
    ```

    ---

Now that secret synchronization setup is complete, you can refer to [Manage secrets for your Azure IoT Operations deployment](howto-manage-secrets.md) to learn how to use secrets with Azure IoT Operations.

## Set up a user-assigned managed identity for cloud connections

Some Azure IoT Operations components, like data flow endpoints, use a user-assigned managed identity for cloud connections. We recommend that you use a separate identity from the one that you used to set up secrets management.

1. [Create a user-assigned managed identity](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/how-manage-user-assigned-managed-identities?pivots=identity-mi-methods-azp#create-a-user-assigned-managed-identity) that's used for cloud connections.

   > **Note:**
   > You'll need to grant the identity permission to whichever cloud resource you'll use the managed identity for.

1. Use the [az iot ops identity assign](https://learn.microsoft.com/cli/azure/iot/ops) command to assign the identity to the Azure IoT Operations instance. This command also creates a federated identity credential by using the OIDC issuer of the indicated connected cluster and the Azure IoT Operations service account.

    > **Important:**
    > The default version of this command assigns an identity for data flows. If you plan to use data flow graphs, include the `--usage` parameter with the value `wasm-graph`.

    # [Bash](#tab/bash)

    ```azurecli
    # Variable block
    AIO_INSTANCE_NAME="<AIO_INSTANCE_NAME>"
    RESOURCE_GROUP="<RESOURCE_GROUP>"
    USER_ASSIGNED_MI_NAME="<USER_ASSIGNED_MI_NAME FOR CLOUD CONNECTIONS>"
    
    #Get the resource ID of the user-assigned managed identity
    USER_ASSIGNED_MI_RESOURCE_ID=$(az identity show --name $USER_ASSIGNED_MI_NAME --resource-group $RESOURCE_GROUP --query id --output tsv)
    
    #Assign the identity to the Azure IoT Operations instance
    az iot ops identity assign --name $AIO_INSTANCE_NAME \
                               --resource-group $RESOURCE_GROUP \
                               --mi-user-assigned $USER_ASSIGNED_MI_RESOURCE_ID
    ```

    # [PowerShell](#tab/powershell)

    ```azurecli
    # Variable block
    $AIO_INSTANCE_NAME="<AIO_INSTANCE_NAME>"
    $RESOURCE_GROUP="<RESOURCE_GROUP>"
    $USER_ASSIGNED_MI_NAME="<USER_ASSIGNED_MI_NAME FOR CLOUD CONNECTIONS>"
    
    # Get the resource ID of the user-assigned managed identity
    $USER_ASSIGNED_MI_RESOURCE_ID=$(az identity show --name $USER_ASSIGNED_MI_NAME --resource-group $RESOURCE_GROUP --query id --output tsv)
    
    
    # Assign the identity to the Azure IoT Operations instance
    az iot ops identity assign --name $AIO_INSTANCE_NAME `
                               --resource-group $RESOURCE_GROUP `
                               --mi-user-assigned $USER_ASSIGNED_MI_RESOURCE_ID
    ```

    ---


1. Restart the schema registry pods to apply the new identity. 

   ```azurecli
   kubectl rollout restart statefulset adr-schema-registry -n azure-iot-operations
   ```

Now you can use this managed identity in data flow endpoints for cloud connections.

## Block pod access to the Azure Instance Metadata Service


When you deploy Azure IoT Operations with secure settings on AKS, Microsoft recommends blocking pod access to the Azure Instance Metadata Service endpoint. To learn how to enable this feature, see [Block pod access to the Azure Instance Metadata Service (IMDS) endpoint](https://learn.microsoft.com/azure/aks/imds-restriction).
