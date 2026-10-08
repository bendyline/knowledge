---
title: Secure an Azure Machine Learning workspace with virtual networks
titleSuffix: Azure Machine Learning
description: Use an isolated Azure Virtual Network to secure your Azure Machine Learning workspace and associated resources.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: enterprise-readiness
ms.reviewer: shshubhe
ms.author: scottpolly
author: s-polly
ms.date: 02/05/2026
ms.topic: how-to
ms.custom:
  - tracking-python
  - security
  - cliv2
  - sdkv2
  - engagement-fy23
  - build-2023
  - sfi-image-nochange
---

# Secure an Azure Machine Learning workspace by using virtual networks


**APPLIES TO:**




> **Tip:**
> You can use Azure Machine Learning **managed virtual networks** instead of the steps in this article. With a managed virtual network, Azure Machine Learning handles the job of network isolation for your workspace and managed computes. You can also add private endpoints for resources needed by the workspace, such as Azure Storage Account. For more information, see [Workspace managed network isolation](how-to-managed-network.md).


In this article, you learn how to secure an Azure Machine Learning workspace and its associated resources in an Azure Virtual Network.

This article is part of a series on securing an Azure Machine Learning workflow. See the other articles in this series:

* [Virtual network overview](how-to-network-security-overview.md)
* [Secure the training environment](how-to-secure-training-vnet.md)
* [Secure the inference environment](how-to-secure-inferencing-vnet.md)
* [Enable studio functionality](how-to-enable-studio-virtual-network.md)
* [Use custom DNS](how-to-custom-dns.md)
* [Use a firewall](how-to-access-azureml-behind-firewall.md)
* [API platform network isolation](how-to-configure-network-isolation-with-v2.md)

For a tutorial on creating a secure workspace, see [Tutorial: Create a secure workspace](tutorial-create-secure-workspace.md), [Bicep template](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/machine-learning-end-to-end-secure/), or [Terraform template](https://github.com/Azure/terraform/tree/master/quickstart/201-machine-learning-moderately-secure).

In this article, you learn how to enable the following workspace resources in a virtual network:
> 
> - Azure Machine Learning workspace
> - Azure Storage accounts
> - Azure Key Vault
> - Azure Container Registry

## Prerequisites

+ Read the [Network security overview](how-to-network-security-overview.md) article to understand common virtual network scenarios and overall virtual network architecture.

+ Read the [Azure Machine Learning best practices for enterprise security](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/azure-best-practices/ai-machine-learning-enterprise-security) article to learn about best practices.

+ An existing virtual network and subnet to use with your compute resources.

    > **Warning:**
    > Don't use the 172.17.0.0/16 IP address range for your VNet. This range is the default subnet range used by the Docker bridge network. Using it for your VNet results in errors. Other ranges might also conflict depending on what you want to connect to the virtual network. For example, if you plan to connect your on-premises network to the VNet, and your on-premises network also uses the 172.16.0.0/16 range. Ultimately, you plan your network infrastructure.


+ To deploy resources into a virtual network or subnet, your user account must have permissions to the following actions in Azure role-based access control (Azure RBAC):

    - "Microsoft.Network/*/read" on the virtual network resource. This permission isn't needed for Azure Resource Manager (ARM) template deployments.
    - "Microsoft.Network/virtualNetworks/join/action" on the virtual network resource.
    - "Microsoft.Network/virtualNetworks/subnets/join/action" on the subnet resource.
    
    For more information on Azure RBAC with networking, see the [Networking built-in roles](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#networking)

### Azure Container Registry

* Your Azure Container Registry must be Premium version. For more information on upgrading, see [Changing SKUs](https://learn.microsoft.com/azure/container-registry/container-registry-skus#changing-tiers).

* If your Azure Container Registry uses a __private endpoint__, put it in the same _virtual network_ as the storage account and compute targets used for training or inference. However, it can also be in a [peered](https://learn.microsoft.com/azure/virtual-network/virtual-network-peering-overview) virtual network.

   If it uses a __service endpoint__, it must be in the same _virtual network_ and _subnet_ as the storage account and compute targets.

* Your Azure Machine Learning workspace must contain an [Azure Machine Learning compute cluster](how-to-create-attach-compute-cluster.md).

## Limitations

### Azure storage account

* If you plan to use Azure Machine Learning studio and the storage account is also in the virtual network, there are extra validation requirements:

    * If the storage account uses a __service endpoint__, the workspace private endpoint and storage service endpoint must be in the same subnet of the virtual network.
    * If the storage account uses a __private endpoint__, the workspace private endpoint and storage private endpoint must be in the same virtual network. In this case, they can be in different subnets.

### Azure Container Instances

When your Azure Machine Learning workspace is configured with a private endpoint, deploying to Azure Container Instances in a virtual network isn't supported. Instead, consider using a [Managed online endpoint with network isolation](how-to-secure-online-endpoint.md).

### Azure Container Registry

When you configure your Azure Machine Learning workspace or any resource with a private endpoint, you might need to set up a user managed compute cluster for Azure Machine Learning Environment image builds. The default scenario leverages [serverless compute](how-to-use-serverless-compute.md) and is currently intended for scenarios with no network restrictions on resources associated with Azure Machine Learning Workspace.

> **Important:**
> The compute cluster used to build Docker images needs to access the package repositories that are used to train and deploy your models. You might need to add network security rules that allow access to public repos, [use private Python packages](concept-vulnerability-management.md#using-a-private-package-repository), or use [custom Docker images (SDK v1)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-train-with-custom-image.md?view=azureml-api-1\&preserve-view=true) that already include the packages.

Using a private Azure Container Registry through a workspace connection to pull images isn't supported in a bring-your-own virtual network (BYO VNet) configuration. To use a private ACR, configure it as the default attached ACR for the workspace and follow the guidelines in the [Enable Azure Container Registry (ACR)](#enable-azure-container-registry-acr) section.

### Azure Monitor

> **Warning:**
> Azure Monitor supports using Azure Private Link to connect to a VNet. However, you must use the open Private Link mode in Azure Monitor. For more information, see [Private Link access modes: Private only vs. Open](https://learn.microsoft.com/azure/azure-monitor/logs/private-link-security#private-link-access-modes-private-only-vs-open).

## Required public internet access


Azure Machine Learning requires both inbound and outbound access to the public internet. The following tables provide an overview of the required access and what purpose it serves. For service tags that end in `.region`, replace `region` with the Azure region that contains your workspace. For example, `Storage.westus`:

> **Tip:**
> The required tab lists the required inbound and outbound configuration. The situational tab lists optional inbound and outbound configurations required by specific configurations you might want to enable.

# [Required](#tab/required)

| Direction | Protocol &<br>ports | Service tag | Purpose |
| --- | --- | --- | --- |
| Outbound | TCP: 80, 443 | `AzureActiveDirectory` | Authentication using Microsoft Entra ID. |
| Outbound | TCP: 443, 18881<br>UDP: 5831 | `AzureMachineLearning` | Using Azure Machine Learning services.<br>Python intellisense in notebooks uses port 18881.<br>Creating, updating, and deleting an Azure Machine Learning compute instance uses port 5831. |
| Outbound | ANY: 443 | `BatchNodeManagement.region` | Communication with Azure Batch back-end for Azure Machine Learning compute instances/clusters. |
| Outbound | TCP: 443 | `AzureResourceManager` | Creation of Azure resources with Azure Machine Learning, Azure CLI, and Azure Machine Learning SDK. |
| Outbound | TCP: 443 | `Storage.region` | Access data stored in the Azure Storage Account for compute cluster and compute instance. For information on preventing data exfiltration over this outbound, see [Data exfiltration protection](how-to-prevent-data-loss-exfiltration.md). |
| Outbound | TCP: 443 | `AzureFrontDoor.FrontEnd`</br>* Not needed in Microsoft Azure operated by 21Vianet. | Global entry point for [Azure Machine Learning studio](https://ml.azure.com). Store images and environments for AutoML. For information on preventing data exfiltration over this outbound, see [Data exfiltration protection](how-to-prevent-data-loss-exfiltration.md). |
| Outbound | TCP: 443 | `MicrosoftContainerRegistry.region`</br>**Note** that this  tag has a dependency on the `AzureFrontDoor.FirstParty` tag | Access docker images provided by Microsoft. Setup of the Azure Machine Learning router for Azure Kubernetes Service. |

# [Situational](#tab/situational)

| Direction | Protocol & <br>ports | Service tag | Purpose |
| --- | --- | --- | --- |
| Inbound | TCP: 44224 | `AzureMachineLearning` | Create, update, and delete of Azure Machine Learning compute instance/cluster. **Required if instance/cluster configured with a Public IP option.** |
| Outbound | TCP: 8787 | `AzureMachineLearning` | Using Azure Machine Learning services.<br> **Port 8787 is required if you use RStudio.** |
| Outbound | TCP: 445 | `Storage.region` | Access data stored in the Azure Storage Account for compute cluster and compute instance. For information on preventing data exfiltration over this outbound, see [Data exfiltration protection](how-to-prevent-data-loss-exfiltration.md).<br>**445 is only required if you have a firewall between your virtual network for Azure ML and a private endpoint for your storage accounts.** |
| Outbound | TCP: 443 | `AzureMonitor` | Used to log monitoring and metrics to App Insights and Azure Monitor. Only needed if you haven't [secured Azure Monitor](how-to-secure-workspace-vnet.md#secure-azure-monitor-and-application-insights) for the workspace. </br>* This outbound is also used to log information for support incidents. |
| Outbound | TCP: 443 | `Keyvault.region` | Access the key vault for the Azure Batch service. Only needed if you enabled the [hbi_workspace](https://learn.microsoft.com/python/api/azureml-core/azureml.core.workspace%28class%29#create-name--auth-none--subscription-id-none--resource-group-none--location-none--create-resource-group-true--sku--basic---friendly-name-none--storage-account-none--key-vault-none--app-insights-none--container-registry-none--cmk-keyvault-none--resource-cmk-uri-none--hbi-workspace-false--default-cpu-compute-target-none--default-gpu-compute-target-none--exist-ok-false--show-output-true-) flag when creating the workspace. |

---

> **Tip:**
> If you need the IP addresses instead of service tags, use one of the following options:
> * Download a list from [Azure IP Ranges and Service Tags](https://www.microsoft.com/download/details.aspx?id=56519).
> * Use the Azure CLI [az network list-service-tags](https://learn.microsoft.com/cli/azure/network#az-network-list-service-tags) command.
> * Use the Azure PowerShell [Get-AzNetworkServiceTag](https://learn.microsoft.com/powershell/module/az.network/get-aznetworkservicetag) command.
> 
> The IP addresses may change periodically.

You may also need to allow __outbound__ traffic to Visual Studio Code and non-Microsoft sites for the installation of packages required by your machine learning project. The following table lists commonly used repositories for machine learning:

| Host name | Purpose |
| --- | --- |
| `anaconda.com`</br>`*.anaconda.com` | Used to install default packages. |
| `*.anaconda.org` | Used to get repo data. |
| `pypi.org` | Used to list dependencies from the default index, if any, and the index isn't overwritten by user settings. If the index is overwritten, you must also allow `*.pythonhosted.org`. |
| `cloud.r-project.org` | Used when installing CRAN packages for R development. |
| `*.pytorch.org` | Used by some examples based on PyTorch. |
| `*.tensorflow.org` | Used by some examples based on TensorFlow. |
| `code.visualstudio.com` | Required to download and install Visual Studio Code desktop. This isn't required for Visual Studio Code Web. |
| `update.code.visualstudio.com`</br>`*.vo.msecnd.net` | Used to retrieve Visual Studio Code server bits that are installed on the compute instance through a setup script. |
| `marketplace.visualstudio.com`</br>`vscode.blob.core.windows.net`</br>`*.gallerycdn.vsassets.io` | Required to download and install Visual Studio Code extensions. These hosts enable the remote connection to Compute Instances provided by the Azure ML extension for Visual Studio Code. For more information, see [Connect to an Azure Machine Learning compute instance in Visual Studio Code](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-set-up-vs-code-remote.md). |
| `raw.githubusercontent.com/microsoft/vscode-tools-for-ai/master/azureml_remote_websocket_server/*` | Used to retrieve websocket server bits, which are installed on the compute instance. The websocket server is used to transmit requests from Visual Studio Code client (desktop application) to Visual Studio Code server running on the compute instance. |

> **Note:**
> When using the [Azure Machine Learning VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.vscode-ai) the remote compute instance will require an access to public repositories to install the packages required by the extension. If the compute instance requires a proxy to access these public repositories or the Internet, you will need to set and export the `HTTP_PROXY` and `HTTPS_PROXY` environment variables in the `~/.bashrc` file of the compute instance. This process can be automated at provisioning time by using a [custom script](how-to-customize-compute-instance.md).

When using Azure Kubernetes Service (AKS) with Azure Machine Learning, allow the following traffic to the AKS VNet:

* General inbound/outbound requirements for AKS as described in the [Restrict egress traffic in Azure Kubernetes Service](https://learn.microsoft.com/azure/aks/limit-egress-traffic) article.
* **Outbound** to mcr.microsoft.com.
* When deploying a model to an AKS cluster, use the guidance in the [Deploy ML models to Azure Kubernetes Service](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-deploy-azure-kubernetes-service.md#connectivity) article.


For information on using a firewall solution, see [Configure required input and output communication](how-to-access-azureml-behind-firewall.md).

## Secure the workspace with private endpoint

Azure Private Link lets you connect to your workspace by using a private endpoint. The private endpoint is a set of private IP addresses within your virtual network. You can then limit access to your workspace to only occur over the private IP addresses. A private endpoint helps reduce the risk of data exfiltration.

For more information on configuring a private endpoint for your workspace, see [How to configure a private endpoint](how-to-configure-private-link.md).

> **Warning:**
> Securing a workspace by using private endpoints doesn't ensure end-to-end security by itself. You must follow the steps in the rest of this article, and the VNet series, to secure individual components of your solution. For example, if you use a private endpoint for the workspace, but your Azure Storage Account isn't behind the VNet, traffic between the workspace and storage doesn't use the VNet for security.

## Secure Azure storage accounts

Azure Machine Learning supports storage accounts configured to use either a private endpoint or service endpoint. 

# [Private endpoint](#tab/pe)

1. In the Azure portal, select the Azure Storage Account.
1. Use the information in [Use private endpoints for Azure Storage](https://learn.microsoft.com/azure/storage/common/storage-private-endpoints#creating-a-private-endpoint) to add private endpoints for the following storage resources:

    * **Blob**
    * **File**
    * **Queue** - Only needed if you plan to use [Batch endpoints](concept-endpoints-batch.md) or the [ParallelRunStep](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/tutorial-pipeline-batch-scoring-classification.md) in an Azure Machine Learning pipeline.
    * **Table** - Only needed if you plan to use [Batch endpoints](concept-endpoints-batch.md) or the [ParallelRunStep](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/tutorial-pipeline-batch-scoring-classification.md) in an Azure Machine Learning pipeline.

    Screenshot showing private endpoint configuration page with blob and file options

    > **Tip:**
    > When configuring a storage account that isn't the default storage, select the **Target subresource** type that corresponds to the storage account you want to add.

1. After creating the private endpoints for the storage resources, select the __Firewalls and virtual networks__ tab under __Networking__ for the storage account.
1. Select __Selected networks__, and then under __Resource instances__, select `Microsoft.MachineLearningServices/Workspace` as the __Resource type__. Select your workspace using __Instance name__. For more information, see [Trusted access based on system-assigned managed identity](https://learn.microsoft.com/azure/storage/common/storage-network-security#trusted-access-based-on-system-assigned-identity).

    > **Tip:**
    > Alternatively, you can select __Allow Azure services on the trusted services list to access this storage account__ to more broadly allow access from trusted services. For more information, see [Configure Azure Storage firewalls and virtual networks](https://learn.microsoft.com/azure/storage/common/storage-network-security#trusted-microsoft-services).

    The networking area on the Azure Storage page in the Azure portal when using private endpoint

1. Select __Save__ to save the configuration.

> **Tip:**
> When using a private endpoint, you can also disable anonymous access. For more information, see [disallow anonymous access](https://learn.microsoft.com/azure/storage/blobs/anonymous-read-access-configure#allow-or-disallow-anonymous-read-access-for-a-storage-account).

# [Service endpoint](#tab/se)

1. In the Azure portal, select the Azure Storage Account.

1. From the __Security + networking__ section on the left of the page, select __Networking__ and then select the __Firewalls and virtual networks__ tab.

1. Select __Selected networks__. Under __Virtual networks__, select the __Add existing virtual network__ link and select the virtual network that your workspace uses.

    > **Important:**
    > The storage account must be in the same virtual network and subnet as the compute instances or clusters you use for training or inference.

1. Under __Resource instances__, select `Microsoft.MachineLearningServices/Workspace` as the __Resource type__ and select your workspace using __Instance name__. For more information, see [Trusted access based on system-assigned managed identity](https://learn.microsoft.com/azure/storage/common/storage-network-security#trusted-access-based-on-system-assigned-managed-identity).

    > **Tip:**
    > Alternatively, you can select __Allow Azure services on the trusted services list to access this storage account__ to more broadly allow access from trusted services. For more information, see [Configure Azure Storage firewalls and virtual networks](https://learn.microsoft.com/azure/storage/common/storage-network-security#trusted-microsoft-services).

    The networking area on the Azure Storage page in the Azure portal

1. Select __Save__ to save the configuration.

> **Tip:**
> When using a service endpoint, you can also disable anonymous access. For more information, see [disallow anonymous access](https://learn.microsoft.com/azure/storage/blobs/anonymous-read-access-configure#allow-or-disallow-anonymous-read-access-for-a-storage-account).

---

## Secure Azure Key Vault

Azure Machine Learning uses an associated Key Vault instance to store the following credentials:
* The associated storage account connection string
* Passwords to Azure Container Registry instances
* Connection strings to data stores

You can configure Azure key vault to use either a private endpoint or service endpoint. To use Azure Machine Learning experimentation capabilities with Azure Key Vault behind a virtual network, use the following steps:

> **Tip:**
> The key vault should be in the same virtual network as the workspace, but it can be in a [peered](https://learn.microsoft.com/azure/virtual-network/virtual-network-peering-overview) virtual network.

# [Private endpoint](#tab/pe)

For information on using a private endpoint with Azure Key Vault, see [Integrate Key Vault with Azure Private Link](https://learn.microsoft.com/azure/key-vault/general/private-link-service#establish-a-private-link-connection-to-key-vault-using-the-azure-portal).


# [Service endpoint](#tab/se)

1. Go to the Key Vault that's associated with the workspace.

1. On the __Key Vault__ page, in the left pane, select __Networking__.

1. On the __Firewalls and virtual networks__ tab, complete the following steps:
    1. Under __Allow access from__, select __Allow public access from specific virtual networks and IP addresses__.
    1. Under __Virtual networks__, select __Add a virtual network__ or __Add existing virtual networks__. Add the virtual network and subnet where your experimentation compute resides.
    1. Verify that __Allow trusted Microsoft services to bypass this firewall__ is checked, and then select __Apply__.

    The Firewalls and virtual networks section in the Key Vault pane

For more information, see [Configure Azure Key Vault network settings](https://learn.microsoft.com/azure/key-vault/general/how-to-azure-key-vault-network-security).

---

## Enable Azure Container Registry (ACR)

> **Tip:**
> If you didn't use an existing Azure Container Registry when creating the workspace, one might not exist. By default, the workspace doesn't create an ACR instance until it needs one. To force the creation of one, train or deploy a model by using your workspace before using the steps in this section.

You can configure Azure Container Registry to use a private endpoint. Use the following steps to configure your workspace to use ACR when it is in the virtual network:

1. Find the name of the Azure Container Registry for your workspace by using one of the following methods:

    # [Azure CLI](#tab/cli)

    
**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


    If you [installed the Machine Learning extension v2 for Azure CLI](how-to-configure-cli.md), use the `az ml workspace show` command to display the workspace information. The v1 extension doesn't return this information.

    ```azurecli-interactive
    az ml workspace show -n yourworkspacename -g resourcegroupname --query 'container_registry'
    ```

    This command returns a value similar to `"/subscriptions/{GUID}/resourceGroups/{resourcegroupname}/providers/Microsoft.ContainerRegistry/registries/{ACRname}"`. The last part of the string is the name of the Azure Container Registry for the workspace.

    # [Python SDK](#tab/python)

    
**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

    The following code snippet demonstrates how to get the container registry information by using the [Azure Machine Learning SDK](/python/api/overview/azure/ai-ml-readme):

   ```python
    # import required libraries
    from azure.ai.ml import MLClient
    from azure.identity import DefaultAzureCredential

    subscription_id = "<your subscription ID>"
    resource_group = "<your resource group name>"
    workspace = "<your workspace name>"

    ml_client = MLClient(
        DefaultAzureCredential(), subscription_id, resource_group, workspace
    )
    
    # Get workspace info
    ws=ml_client.workspaces.get(name=workspace)
    print(ws.container_registry)
    ```

    This code returns a value similar to `"/subscriptions/{GUID}/resourceGroups/{resourcegroupname}/providers/Microsoft.ContainerRegistry/registries/{ACRname}"`. The last part of the string is the name of the Azure Container Registry for the workspace.

    # [Portal](#tab/portal)

    From the overview section of your workspace, the __Registry__ value links to the Azure Container Registry.

    :::image type="content" source="./media/how-to-enable-virtual-network/azure-machine-learning-container-registry.png" alt-text="Azure Container Registry for the workspace" border="true":::

    ---

1. Limit access to your virtual network by using the steps in [Connect privately to an Azure Container Registry](/azure/container-registry/container-registry-private-link). When adding the virtual network, select the virtual network and subnet for your Azure Machine Learning resources.

1. Configure the ACR for the workspace to [Allow access by trusted services](/azure/container-registry/allow-access-trusted-services).

1. By default, Azure Machine Learning tries to use a [serverless compute](how-to-use-serverless-compute.md) to build the image. This approach works only when the workspace-dependent resources such as Storage Account or Container Registry aren't under any network restriction (private endpoints). If you restrict network access to your workspace-dependent resources, use an image-build-compute instead.

1. To set up an image-build compute, create an Azure Machine Learning CPU SKU [compute cluster](how-to-create-attach-compute-cluster.md) in the same VNet as your workspace-dependent resources. You can set this cluster as the default image-build compute. It builds every image in your workspace from that point onwards. Use one of the following methods to configure the workspace to build Docker images by using the compute cluster.

    > [!IMPORTANT]
    > The following limitations apply when you use a compute cluster for image builds:
    > * Only a CPU SKU is supported.
    > * If you use a compute cluster configured for no public IP address, you must provide some way for the cluster to access the public internet. Internet access is required when accessing images stored on the Microsoft Container Registry, packages installed on Pypi, Conda, and similar repositories. You need to configure User Defined Routing (UDR) to reach to a public IP to access the internet. For example, you can use the public IP of your firewall, or you can use [Virtual Network NAT](/azure/virtual-network/nat-gateway/nat-overview) with a public IP. For more information, see [How to securely train in a VNet](how-to-secure-training-vnet.md).

    # [Azure CLI](#tab/cli)

    Use the `az ml workspace update` command to set a build compute. The command is the same for both the v1 and v2 Azure CLI extensions for machine learning. In the following command, replace `myworkspace` with your workspace name, `myresourcegroup` with the resource group that contains the workspace, and `mycomputecluster` with the compute cluster name:

    ```azurecli
    az ml workspace update --name myworkspace --resource-group myresourcegroup --image-build-compute mycomputecluster
    ```

    You can switch back to serverless compute by running the same command and referencing the compute as an empty space: `--image-build-compute ''`.

    # [Python SDK](#tab/python)

    The following code snippet demonstrates how to update the workspace to set a build compute using the [Azure Machine Learning SDK](/python/api/overview/azure/ai-ml-readme). Replace `mycomputecluster` with the name of the cluster to use:

    
**APPLIES TO**: :::image type="icon" source="../media/yes.png" border="false"::: [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

    ```python
    # import required libraries
    from azure.ai.ml import MLClient
    from azure.identity import DefaultAzureCredential

    subscription_id = "<your subscription ID>"
    resource_group = "<your resource group name>"
    workspace = "<your workspace name>"

    ml_client = MLClient(
        DefaultAzureCredential(), subscription_id, resource_group, workspace
    )
    
    # Get workspace info
    ws=ml_client.workspaces.get(name=workspace)
    # Update to use cpu-cluster for image builds
    ws.image_build_compute="cpu-cluster"
    ml_client.workspaces.begin_update(ws)
    
    # To switch back to serverless compute:
    # ws.image_build_compute = ''
    # ml_client.workspaces.begin_update(ws)
    ```

    
    For more information, see the [begin_update](/python/api/azure-ai-ml/azure.ai.ml.operations.workspaceoperations#azure-ai-ml-operations-workspaceoperations-begin-update) method reference.

    # [Portal](#tab/portal)

    Currently, there's no way to set the image build compute from the Azure portal.

    ---

> [!TIP]
> When ACR is behind a virtual network, you can also [disable public access](/azure/container-registry/container-registry-access-selected-networks#disable-public-network-access) to it.

## Secure Azure Monitor and Application Insights

To enable network isolation for Azure Monitor and the Application Insights instance for the workspace, use the following steps:

1. Open your Application Insights resource in the Azure portal. The __Overview__ tab might have a Workspace property. If it _doesn't_ have the property, perform step 2. If it _does_, then you can proceed directly to step 3.

    > [!TIP]
    > New workspaces create a workspace-based Application Insights resource by default. If you recently created your workspace, you don't need to perform step 2.
   
1. Upgrade the Application Insights instance for your workspace. For steps on how to upgrade, see [Migrate to workspace-based Application Insights resources](/azure/azure-monitor/app/convert-classic-resource).

1. Create an Azure Monitor Private Link Scope and add the Application Insights instance from step 1 to the scope. For more information, see [Configure your Azure Monitor private link](/azure/azure-monitor/logs/private-link-configure).

## Securely connect to your workspace


To connect to a workspace that's secured behind a VNet, use one of the following methods:

* [Azure VPN gateway](/azure/vpn-gateway/vpn-gateway-about-vpngateways) - Connects on-premises networks to the VNet over a private connection. Connection is made over the public internet. There are two types of VPN gateways that you might use:

    * [Point-to-site](/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal): Each client computer uses a VPN client to connect to the VNet.
    * [Site-to-site](/azure/vpn-gateway/tutorial-site-to-site-portal): A VPN device connects the VNet to your on-premises network.

* [ExpressRoute](https://azure.microsoft.com/services/expressroute/) - Connects on-premises networks into the cloud over a private connection. Connection is made using a connectivity provider.
* [Azure Bastion](/azure/bastion/bastion-overview) - In this scenario, you create an Azure Virtual Machine (sometimes called a jump box) inside the VNet. You then connect to the VM using Azure Bastion. Bastion allows you to connect to the VM using either an RDP or SSH session from your local web browser. You then use the jump box as your development environment. Since it is inside the VNet, it can directly access the workspace. For an example of using a jump box, see [Tutorial: Create a secure workspace](tutorial-create-secure-workspace.md).

> [!IMPORTANT]
> When using a __VPN gateway__ or __ExpressRoute__, you will need to plan how name resolution works between your on-premises resources and those in the VNet. For more information, see [Use a custom DNS server](how-to-custom-dns.md).

If you have problems connecting to the workspace, see [Troubleshoot secure workspace connectivity](how-to-troubleshoot-secure-connection-workspace.md).

## Workspace diagnostics


You can run diagnostics on your workspace from Azure Machine Learning studio or the Python SDK. After diagnostics run, a list of any detected problems is returned. This list includes links to possible solutions. For more information, see [How to use workspace diagnostics](how-to-workspace-diagnostic-api.md).

## Public access to workspace

> [!IMPORTANT]
> Although Azure Machine Learning supports this configuration, Microsoft doesn't recommend it. Verify this configuration with your security team before using it in production.

In some cases, you might need to allow access to the workspace from the public network (without connecting through the virtual network using the methods detailed the [Securely connect to your workspace](#securely-connect-to-your-workspace) section). Access over the public internet is secured by using TLS.

To enable public network access to the workspace, use the following steps:

1. [Enable public access](how-to-configure-private-link.md#enable-public-access) to the workspace after configuring the workspace's private endpoint.
1. [Configure the Azure Storage firewall](/azure/storage/common/storage-network-security?toc=%2fazure%2fstorage%2fblobs%2ftoc.json#grant-access-from-an-internet-ip-range) to allow communication with the IP address of clients that connect over the public internet. You might need to change the allowed IP address if the clients don't have a static IP. For example, if one of your Data Scientists is working from home and can't establish a VPN connection to the virtual network.

## Next steps

This article is part of a series on securing an Azure Machine Learning workflow. See the other articles in this series:

* [Virtual network overview](how-to-network-security-overview.md)
* [Secure the training environment](how-to-secure-training-vnet.md)
* [Secure the inference environment](how-to-secure-inferencing-vnet.md)
* [Enable studio functionality](how-to-enable-studio-virtual-network.md)
* [Use custom DNS](how-to-custom-dns.md)
* [Use a firewall](how-to-access-azureml-behind-firewall.md)
* [Tutorial: Create a secure workspace](tutorial-create-secure-workspace.md)
* [Bicep template](/samples/azure/azure-quickstart-templates/machine-learning-end-to-end-secure/)
* [Terraform template](https://github.com/Azure/terraform/tree/master/quickstart/201-machine-learning-moderately-secure).
* [API platform network isolation](how-to-configure-network-isolation-with-v2.md)
