---
title: Secure managed online endpoints
titleSuffix: Azure Machine Learning
description: See how to use private endpoints to provide network isolation for Azure Machine Learning managed online endpoints.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: enterprise-readiness
ms.topic: how-to
ms.reviewer: shshubhe
author: s-polly
ms.author: scottpolly
ms.date: 03/11/2026
ms.custom: devx-track-azurecli, moe-wsvnet, update-code6, dev-focus
ai-usage: ai-assisted
# customer intent: As a developer, I want to see how to use private endpoints to provide network isolation so that I can improve the security of my Azure Machine Learning managed online endpoints.
---

# Secure managed online endpoints by using network isolation


**APPLIES TO:**



This article shows you how to use network isolation to improve the security of an Azure Machine Learning managed online endpoint. Network isolation helps secure the inbound and outbound communication to and from your endpoint.

To help secure inbound communication, you can create a managed online endpoint that uses the private endpoint of an Azure Machine Learning workspace. To allow only approved outbound communication for deployments, you can configure the workspace with a managed virtual network. This article shows you how to take these steps to improve endpoint security. It also shows you how to create a deployment that uses the private endpoints of the workspace's managed virtual network for outbound communication.

To use the legacy method for network isolation, see the following deployment file examples in the [azureml-examples](https://github.com/Azure/azureml-examples) GitHub repository:

- For a deployment that uses a generic model: [deploy-moe-vnet-legacy.sh](https://github.com/Azure/azureml-examples/blob/main/cli/deploy-moe-vnet-legacy.sh)
- For a deployment that uses an MLflow model: [deploy-moe-vnet-mlflow-legacy.sh](https://github.com/Azure/azureml-examples/blob/main/cli/deploy-moe-vnet-mlflow-legacy.sh)

## Prerequisites

* An Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

* The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) and the Azure CLI `ml` extension, installed and configured. For more information, see [Install and set up the CLI (v2)](how-to-configure-cli.md).

  > **Tip:**
  > Make sure you have the latest version of the `ml` extension installed. To update, run `az extension update -n ml`.

* A Bash shell or a compatible shell, such as a shell on a Linux system or [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/about). The Azure CLI examples in this article assume that you use this type of shell.

* An Azure resource group in which you or the service principal that you use have Contributor access. For instructions for creating a resource group, see [Set up](how-to-configure-cli.md?#set-up).

* A [user-assigned managed identity](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/how-manage-user-assigned-managed-identities?pivots=identity-mi-methods-azp) with appropriate permissions, if you want to use a managed identity to create and manage online endpoints and online deployments. For detailed information about required permissions, see [Set up authentication between Azure Machine Learning and other services](how-to-identity-based-service-authentication.md#workspace). For example, you need to grant your managed identity specific Azure role-based access control (Azure RBAC) permissions for Azure Key Vault.

### Migrate from the legacy network isolation method to a workspace managed virtual network

If you use the [legacy method](concept-secure-online-endpoint.md#secure-outbound-access-with-legacy-network-isolation-method) for network isolation of managed online endpoints and you want to migrate to a managed virtual network to secure your endpoints, follow these steps:

1. Create a new workspace and enable a managed virtual network. For more information about how to configure a managed network for your workspace, see [Workspace managed virtual network isolation](how-to-managed-network.md).
1. (Optional) If your deployments access private resources other than Azure Storage, Key Vault, and Azure Container Registry, add outbound rules to the network settings of your workspace. Specifically, the network is configured with rules for Azure Storage, Key Vault, and Container Registry by default. Add rules with private endpoints for any other private resources that you use. 
1. (Optional) If you intend to use an Azure Machine Learning registry, configure private endpoints for outbound communication to your registry, its storage account, and its instance of Container Registry.
1. Create online endpoints and deployments in the new workspace. If you use Azure Machine Learning registries, you can directly deploy components from them. For more information, see [Deploy model from registry to online endpoint in workspace](how-to-share-models-pipelines-across-workspaces-with-registries.md#deploy-model-from-registry-to-online-endpoint-in-workspace).
1. Update applications that invoke endpoints so that the applications use the scoring URIs of the new online endpoints.
1. After you validate your new endpoints, delete the online endpoints in your old workspace.

If you don't need to avoid downtime during migration, you can take a more straightforward approach. If you don't need to maintain compute instances, online endpoints, and deployments in your old workspace, you can delete the compute instances and then update the workspace to enable a managed virtual network.

## Limitations


- The `v1_legacy_mode` flag must be set to `false` to turn off v1 legacy mode on your Azure Machine Learning workspace. If this setting is turned on, you can't create a managed online endpoint. For more information, see [Network isolation change with our new API platform on Azure Resource Manager](how-to-configure-network-isolation-with-v2.md).

- If your Azure Machine Learning workspace has a private endpoint that was created before May 24, 2022, you must re-create that private endpoint before you configure your online endpoints to use private endpoints. For more information about creating a private endpoint for your workspace, see [Configure a private endpoint for an Azure Machine Learning workspace](how-to-configure-private-link.md).

  > **Tip:**
  > To see the creation date of a workspace, you can check the workspace properties.
  >
  > 1. In Azure Machine Learning studio, go to the upper-right corner and select the name of your workspace.
  > 1. In the Directory + Subscription + Workspace window, select **View all properties in Azure portal**.
  > 1. In the Azure portal Overview page, go to the upper-right corner and select **JSON View**.
  > 1. In the Resource JSON window, under **API Versions**, select the latest API version.
  > 1. In the `properties` section of the JSON code, check the `creationTime` value.
  >
  > Alternatively, use one of the following methods:
  >
  > - [Python SDK](https://learn.microsoft.com/python/api/azureml-core/azureml.core.workspace.workspace): `Workspace.get(name=<workspace-name>, subscription_id=<subscription-ID>, resource_group=<resource-group-name>).get_details()`
  > - [REST API](how-to-manage-rest.md#drill-down-into-workspaces-and-their-resources): `curl https://management.azure.com/subscriptions/<subscription-ID>/resourceGroups/<resource-group-name>/providers/Microsoft.MachineLearningServices/workspaces/?api-version=2023-10-01 -H "Authorization:Bearer <access-token>"`
  > - [PowerShell](https://learn.microsoft.com/powershell/module/az.machinelearningservices/get-azmlworkspace): `Get-AzMLWorkspace -Name <workspace-name> -ResourceGroupName <resource-group-name>`

- When you use network isolation to help secure online endpoints, you can use workspace-associated resources from a different resource group than your workspace resource group. However, these resources must belong to the same subscription and tenant as your workspace. Resources that are associated with a workspace include Azure Container Registry, Azure Storage, Azure Key Vault, and Application Insights.

> **Note:**
> This article describes network isolation that applies to data plane operations. These operations result from scoring requests, or model serving. Control plane operations, such as requests to create, update, delete, or retrieve authentication keys, are sent to Azure Resource Manager over the public network.


## Prepare your system

1. Create environment variables by running the following commands. Replace `<resource-group-name>` with the resource group for your workspace. Replace `<workspace-name>` with the name of your workspace.

   ```azurecli
   export RESOURCEGROUP_NAME="<resource-group-name>"
   export WORKSPACE_NAME="<workspace-name>"
   ```

1. Create your workspace. The `-m allow_only_approved_outbound` parameter configures a managed virtual network for the workspace and blocks outbound traffic except to approved destinations.

   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/deploy-managed-online-endpoint-workspacevnet.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-secure-online-endpoint.md)

   Alternatively, if you'd like to allow the deployment to send outbound traffic to the internet, uncomment the following code and run it instead.

   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/deploy-managed-online-endpoint-workspacevnet.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-secure-online-endpoint.md)

   For more information about how to create a new workspace or upgrade your existing workspace to use a managed virtual network, see [Configure a managed virtual network to allow internet outbound](how-to-managed-network.md#configure-a-managed-virtual-network-to-allow-internet-outbound).

1. Provision the managed virtual network. For instructions and more information, see [Manually provision a managed VNet](how-to-managed-network.md#manually-provision-a-managed-vnet).

   > **Tip:**
   > You can combine workspace creation and network provisioning into a single step by adding `--provision-network-now` to the `az ml workspace create` command.

   > **Important:**
   > When you set up a managed virtual network for a workspace for the first time, the network isn't provisioned. You can't create online deployments until you provision the managed network.

1. Configure the container registry that's associated with the workspace to use a premium pricing plan. This setting is needed to provide access to the registry through a private endpoint. For more information, see [Azure Container Registry service tiers](https://learn.microsoft.com/azure/container-registry/container-registry-skus).

1. Configure your workspace to use a compute cluster or compute instance to build images. Use the `image_build_compute` property for this purpose. For more information and instructions, see [Configure image builds](how-to-managed-network.md#configure-image-builds).

1. Configure default values for the Azure CLI so that you don't need to pass in the values for your workspace and resource group multiple times.

   ```azurecli
   az configure --defaults workspace=$WORKSPACE_NAME group=$RESOURCEGROUP_NAME
   ```

1. Clone the examples repository to get the example files for the endpoint and deployment, and then go to the repository's `cli` directory.

   ```azurecli
   git clone --depth 1 https://github.com/Azure/azureml-examples
   cd azureml-examples/cli
   ```

The commands in this article are in the `deploy-managed-online-endpoint-workspacevnet.sh` file in the `cli` directory. The YAML configuration files are in the `endpoints/online/managed/sample/` subdirectory.

## Create a secured managed online endpoint

To create a secured managed online endpoint, create the endpoint in your workspace. Then set the endpoint's `public_network_access` value to `disabled` to control inbound communication.

This setting forces the online endpoint to use the workspace's private endpoint for inbound communication. The only way to invoke the online endpoint is by using a private endpoint that can access the workspace in your virtual network. For more information, see [Secure inbound scoring requests](concept-secure-online-endpoint.md#secure-inbound-scoring-requests) and [Configure a private endpoint for an Azure Machine Learning workspace](how-to-configure-private-link.md).

Because the workspace is configured to have a managed virtual network, any endpoint deployments use the private endpoints of the managed virtual network for outbound communication.

1. Set the endpoint's name:

   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/deploy-managed-online-endpoint-workspacevnet.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-secure-online-endpoint.md)

1. Create an endpoint with `public_network_access` set to `disabled` to block inbound traffic:

   > **Note:**
   > The referenced script uses YAML configuration files from the cloned repository. Ensure you're in the correct directory (`cli`) after cloning the repository, or provide the full path to your YAML files. In Azure Cloud Shell, verify the files are accessible in your cloud storage before running the commands.

   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/deploy-managed-online-endpoint-workspacevnet.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-secure-online-endpoint.md)

   To allow the endpoint to receive scoring requests from the internet, uncomment the following code and run it instead:

   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/deploy-managed-online-endpoint-workspacevnet.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-secure-online-endpoint.md)

## Test the endpoint

1. Create a deployment in the managed virtual network of the workspace:

   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/deploy-managed-online-endpoint-workspacevnet.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-secure-online-endpoint.md)

   If you get an error about an authorization failure, check the networking configuration for the workspace storage account. You might have to adjust the public network access settings to give the workspace access to the storage account.

1. Get the status of the deployment:

   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/deploy-managed-online-endpoint-workspacevnet.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-secure-online-endpoint.md)

1. Test the endpoint by issuing a scoring request:

   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/deploy-managed-online-endpoint-workspacevnet.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-secure-online-endpoint.md)

1. Get the deployment logs:

   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/deploy-managed-online-endpoint-workspacevnet.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-secure-online-endpoint.md)

## Clean up resources

1. If you no longer need the endpoint, run the following command to delete it.

   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/deploy-managed-online-endpoint-workspacevnet.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-secure-online-endpoint.md)

1. If you no longer need the workspace, its associated resources, and the other resources in your resource group, delete them. Replace `<resource-group-name>` with the name of the resource group that contains your workspace.

   ```azurecli
   az group delete --resource-group <resource-group-name>
   ```

## Troubleshooting


### Online endpoint creation fails with a message about v1 legacy mode

Managed online endpoints are a feature of the Azure Machine Learning v2 API platform. If your Azure Machine Learning workspace is configured for v1 legacy mode, the managed online endpoints don't work. Specifically, if the `v1_legacy_mode` workspace setting is set to `true`, v1 legacy mode is turned on, and there's no support for v2 APIs.

To see how to turn off v1 legacy mode, see [Network isolation change with our new API platform on Azure Resource Manager](how-to-configure-network-isolation-with-v2.md).

> **Important:**
> Check with your network security team before you set `v1_legacy_mode` to `false`, because v1 legacy mode might be turned on for a reason.

### Online endpoint creation with key-based authentication fails

Use the following command to list the network rules of the Azure key vault for your workspace. Replace `<key-vault-name>` with the name of your key vault.

```azurecli
az keyvault network-rule list -n <key-vault-name>
```

The response for this command is similar to the following JSON code:

```json
{
    "bypass": "AzureServices",
    "defaultAction": "Deny",
    "ipRules": [],
    "virtualNetworkRules": []
}
```

If the value of `bypass` isn't `AzureServices`, use the guidance in [Configure Azure Key Vault networking settings](https://learn.microsoft.com/azure/key-vault/general/how-to-azure-key-vault-network-security?tabs=azure-cli) to set it to `AzureServices`.

### Online deployments fail with an image download error

> **Note:**
> This issue applies when you use the [legacy network isolation method for managed online endpoints](concept-secure-online-endpoint.md#secure-outbound-access-with-legacy-network-isolation-method). In this method, Azure Machine Learning creates a managed virtual network for each deployment under an endpoint.

1. Check whether the `egress-public-network-access` flag has a value of `disabled` for the deployment. If this flag is enabled, and the visibility of the container registry is private, this failure is expected.
1. Use the following command to check the status of the private endpoint connection. Replace `<registry-name>` with the name of the Azure Container Registry for your workspace:

   ```azurecli
   az acr private-endpoint-connection list -r <registry-name> --query "[?privateLinkServiceConnectionState.description=='Egress for Microsoft.MachineLearningServices/workspaces/onlineEndpoints'].{ID:id, status:privateLinkServiceConnectionState.status}"
   ```

   In the response code, verify that the `status` field is set to `Approved`. If the value isn't `Approved`, use the following command to approve the connection. Replace `<private-endpoint-connection-ID>` with the ID that the preceding command returns.

   ```azurecli
   az network private-endpoint-connection approve --id <private-endpoint-connection-ID> --description "Approved"
   ```

### Scoring endpoint can't be resolved

1. Verify that the client issuing the scoring request is a virtual network that can access the Azure Machine Learning workspace.

1. Use the `nslookup` command on the endpoint host name to retrieve the IP address information:

   ```bash
   nslookup <endpoint-name>.<endpoint-region>.inference.ml.azure.com
   ```

   For example, your command might look similar to the following one:

   ```bash
   nslookup endpointname.westcentralus.inference.ml.azure.com
   ```

   The response contains an address that should be in the range provided by the virtual network.
   
   > **Note:**
   > - For Kubernetes online endpoint, the endpoint host name should be the **CName** (domain name) that's specified in your Kubernetes cluster. 
   > - If the endpoint uses HTTP, the IP address is contained in the endpoint URI, which you can get from the studio UI.
   > - For more ways to get the IP address of the endpoint, see [Update your DNS with an FQDN](how-to-secure-kubernetes-online-endpoint.md#update-your-dns-with-an-fqdn).

1. If the `nslookup` command doesn't resolve the host name, take the actions in one of the following sections.

#### Managed online endpoints

1. Use the following command to check whether an A record exists in the private Domain Name System (DNS) zone for the virtual network.

   ```azurecli
   az network private-dns record-set list -z privatelink.api.azureml.ms -o tsv --query [].name
   ```

   The results should contain an entry similar to `*.<GUID>.inference.<region>`.

1. If no inference value is returned, delete the private endpoint for the workspace and then re-create it. For more information, see [How to configure a private endpoint](https://learn.microsoft.com/azure/container-registry/container-registry-private-link).

1. If the workspace with a private endpoint [uses a custom DNS server](how-to-custom-dns.md), run the following command to verify that the resolution from the custom DNS server works correctly:

   ```bash
   dig <endpoint-name>.<endpoint-region>.inference.ml.azure.com
   ```

#### Kubernetes online endpoints

1. Check the DNS configuration in the Kubernetes cluster.

1. Check whether the [Azure Machine Learning inference router, `azureml-fe`](how-to-kubernetes-inference-routing-azureml-fe.md), works as expected. To perform this check, take the following steps:

   1. Run the following command in the `azureml-fe` pod:

      ```bash
      kubectl exec -it deploy/azureml-fe -- /bin/bash
      ```

   1. Run one of the following commands:
   
      ```bash
      curl -vi -k https://localhost:<port>/api/v1/endpoint/<endpoint-name>/swagger.json
      "Swagger not found"
      ```

      For HTTP, use the following command:

      ```bash
      curl https://localhost:<port>/api/v1/endpoint/<endpoint-name>/swagger.json
      "Swagger not found"
      ```

1. If the curl HTTPS command fails or times out but the HTTP command works, check whether the certificate is valid.

1. If the preceding process fails to resolve to the A record, use the following command to verify whether the resolution works from the Azure DNS virtual public IP address, 168.63.129.16:

   ```bash
   dig @168.63.129.16 <endpoint-name>.<endpoint-region>.inference.ml.azure.com
   ```

1. If the preceding command succeeds, troubleshoot the conditional forwarder for Azure Private Link on a custom DNS.

### Online deployments can't be scored

1. Run the following command to see the status of a deployment that can't be scored:

   ```azurecli
   az ml online-deployment show -e <endpoint-name> -n <deployment-name> --query '{name:name,state:provisioning_state}' 
   ```

   A value of `Succeeded` for the `state` field indicates a successful deployment.

1. For a successful deployment, use the following command to check that traffic is assigned to the deployment:

   ```azurecli
   az ml online-endpoint show -n <endpoint-name>  --query traffic
   ```

   The response from this command should list the percentage of traffic that's assigned to each deployment.

   > **Tip:**
   > This step isn't necessary if you use the `azureml-model-deployment` header in your request to target this deployment.

1. If the traffic assignments or deployment header are set correctly, use the following command to get the logs for the endpoint:

   ```azurecli
   az ml online-deployment get-logs  -e <endpoint-name> -n <deployment-name> 
   ```

1. Review the logs to see whether there's a problem running the scoring code when you submit a request to the deployment.


## Related content

- [Network isolation with managed online endpoints](concept-secure-online-endpoint.md)
- [Workspace managed network isolation](how-to-managed-network.md)
- [Troubleshoot online endpoint deployment and scoring](how-to-troubleshoot-online-endpoints.md)
