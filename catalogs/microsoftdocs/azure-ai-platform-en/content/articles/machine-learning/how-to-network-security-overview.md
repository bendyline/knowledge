---
title: Secure workspace resources using virtual networks (VNets)
titleSuffix: Azure Machine Learning
description: Secure Azure Machine Learning workspace resources and compute environments using an isolated Azure Virtual Network (VNet).
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: enterprise-readiness
ms.reviewer: shshubhe
ms.author: scottpolly
author: s-polly
ms.date: 10/28/2025
ms.topic: how-to
ms.custom: references_regions, security, build-2023, FY25Q1-Linter
monikerRange: 'azureml-api-2 || azureml-api-1'
# Customer Intent: As an admin, I wante to understand how to secure my Azure Machine Learning workspace and associated resources.
---

# Secure Azure Machine Learning workspace resources by using virtual networks (VNets)

**Applies to: azureml-api-2**

**APPLIES TO:**



**Applies to: azureml-api-1**

**APPLIES TO:**





> **Important:**
> This article provides information on using the Azure Machine Learning SDK v1. SDK v1 is deprecated as of March 31, 2025. Support for it will end on June 30, 2026. You can install and use SDK v1 until that date. Your existing workflows using SDK v1 will continue to operate after the end-of-support date. However, they could be exposed to security risks or breaking changes in the event of architectural changes in the product.
>
> We recommend that you transition to the SDK v2 before June 30, 2026. For more information on SDK v2, see [What is Azure Machine Learning CLI and Python SDK v2?](https://learn.microsoft.com/azure/machine-learning/concept-v2) and the [SDK v2 reference](https://learn.microsoft.com/python/api/overview/azure/ai-ml-readme).


> **Important:**
> Some of the Azure CLI commands in this article use the `azure-cli-ml`, or v1, extension for Azure Machine Learning. Support for CLI v1 ended on September 30, 2025. Microsoft will no longer provide technical support or updates for this service. Your existing workflows using CLI v1 will continue to operate after the end-of-support date. However, they could be exposed to security risks or breaking changes in the event of architectural changes in the product.
>
> We recommend that you transition to the `ml`, or v2, extension as soon as possible. For more information on the v2 extension, see [Azure Machine Learning CLI extension and Python SDK v2](concept-v2.md).



> **Tip:**
> You can use Azure Machine Learning **managed virtual networks** instead of the steps in this article. With a managed virtual network, Azure Machine Learning handles the job of network isolation for your workspace and managed computes. You can also add private endpoints for resources needed by the workspace, such as Azure Storage Account. For more information, see [Workspace managed network isolation](how-to-managed-network.md).


Learn how to secure Azure Machine Learning workspace resources and compute environments by using Azure Virtual Networks (VNets). This article uses an example scenario to show you how to configure a complete virtual network.

This article is part of a series on securing an Azure Machine Learning workflow. See the other articles in this series:

**Applies to: azureml-api-2**
* [Use managed networks](how-to-managed-network.md)
* [Secure the workspace resources](how-to-secure-workspace-vnet.md)
* [Secure machine learning registries](how-to-registry-network-isolation.md)
* [Secure the training environment](how-to-secure-training-vnet.md)
* [Secure the inference environment](how-to-secure-inferencing-vnet.md)
* [Enable studio functionality](how-to-enable-studio-virtual-network.md)
* [Use custom DNS](how-to-custom-dns.md)
* [Use a firewall](how-to-access-azureml-behind-firewall.md)
* [API platform network isolation](how-to-configure-network-isolation-with-v2.md)

**Applies to: azureml-api-1**
* [Secure the workspace resources](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-workspace-vnet.md)
* [Secure the training environment](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-training-vnet.md)
* [Secure the inference environment](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-inferencing-vnet.md)
* [Enable studio functionality](how-to-enable-studio-virtual-network.md)
* [Use custom DNS](how-to-custom-dns.md)
* [Use a firewall](how-to-access-azureml-behind-firewall.md)


For a tutorial on creating a secure workspace, see the [Tutorial: Create a secure workspace](tutorial-create-secure-workspace.md), [Bicep template](https://learn.microsoft.com/samples/azure/azure-quickstart-templates/machine-learning-end-to-end-secure/), or [Terraform template](https://github.com/Azure/terraform/tree/master/quickstart/201-machine-learning-moderately-secure).

## Prerequisites

This article assumes that you're familiar with the following articles:
+ [Azure Virtual Networks](https://learn.microsoft.com/azure/virtual-network/virtual-networks-overview)
+ [IP networking](https://learn.microsoft.com/azure/virtual-network/ip-services/public-ip-addresses)
+ [Azure Machine Learning workspace with private endpoint](how-to-configure-private-link.md)
+ [Network Security Groups (NSG)](https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview)
+ [Network firewalls](https://learn.microsoft.com/azure/firewall/overview)

## Example scenario

In this section, you learn how to set up a common network scenario to secure Azure Machine Learning communication with private IP addresses.

The following table compares how services access different parts of an Azure Machine Learning network with and without a virtual network (VNet):

| Scenario | Workspace | Associated resources | Training compute environment | Inferencing compute environment |
|-|-|-|-|-|-|
|__No virtual network__| Public IP | Public IP | Public IP | Public IP |
|__Public workspace, all other resources in a virtual network__ | Public IP | Public IP (service endpoint) <br> __- or -__ <br> Private IP (private endpoint) | Public IP | Private IP  |
|__Secure resources in a virtual network__| Private IP (private endpoint) | Public IP (service endpoint) <br> __- or -__ <br> Private IP (private endpoint) | Private IP | Private IP  | 

* __Workspace__ - Create a private endpoint for your workspace. The private endpoint connects the workspace to the VNet through several private IP addresses.
    * __Public access__ - You can optionally enable public access for a secured workspace.
* __Associated resource__ - Use service endpoints or private endpoints to connect to workspace resources like Azure storage and Azure Key Vault. For Azure Container Services, use a private endpoint.
    * __Service endpoints__ provide the identity of your virtual network to the Azure service. Once you enable service endpoints in your virtual network, you can add a virtual network rule to secure the Azure service resources to your virtual network. Service endpoints use public IP addresses.
    * __Private endpoints__ are network interfaces that securely connect you to a service powered by Azure Private Link. Private endpoint uses a private IP address from your VNet, effectively bringing the service into your VNet.
* __Training compute access__ - Access training compute targets like Azure Machine Learning Compute Instance and Azure Machine Learning Compute Clusters with public or private IP addresses.
* __Inference compute access__ - Access Azure Kubernetes Services (AKS) compute clusters with private IP addresses.


The next sections show you how to secure the network scenario described previously. To secure your network, you must:

1. Secure the [__workspace and associated resources__](#secure-the-workspace-and-associated-resources).
1. Secure the [__training environment__](#secure-the-training-environment).
1. Secure the [__inferencing environment__](#secure-the-inferencing-environment).
1. Optionally: [__enable studio functionality__](#optional-enable-studio-functionality).
1. Configure [__firewall settings__](#configure-firewall-settings).
1. Configure [__DNS name resolution__](#custom-dns).

## Public workspace and secured resources

> **Important:**
> While Azure Machine Learning supports this configuration, Microsoft doesn't recommend it. The data in the Azure Storage Account behind the virtual network can be exposed on the public workspace. Verify this configuration with your security team before using it in production.

To access the workspace over the public internet while keeping all the associated resources secured in a virtual network, use the following steps:

1. Create an [Azure Virtual Network](https://learn.microsoft.com/azure/virtual-network/virtual-networks-overview). This network secures the resources used by the workspace.
1. Use __one__ of the following options to create a publicly accessible workspace:

    **Applies to: azureml-api-2**
    * Create an Azure Machine Learning workspace that __does not__ use the virtual network. For more information, see [Manage Azure Machine Learning workspaces](how-to-manage-workspace.md).

    OR

    * Create a [Private Link-enabled workspace](how-to-secure-workspace-vnet.md#secure-the-workspace-with-private-endpoint) to enable communication between your VNet and workspace. Then [enable public access to the workspace](#optional-enable-public-access).

    **Applies to: azureml-api-1**
    * Create an Azure Machine Learning workspace that __does not__ use the virtual network. For more information, see [Manage Azure Machine Learning workspaces](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-manage-workspace.md).
    * Create a [Private Link-enabled workspace](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-workspace-vnet.md#secure-the-workspace-with-private-endpoint) to enable communication between your VNet and workspace. Then [enable public access to the workspace](#optional-enable-public-access).


1. Add the following services to the virtual network by using _either_ a __service endpoint__ or a __private endpoint__. Also allow trusted Microsoft services to access these services:

    **Applies to: azureml-api-2**
    | Service | Endpoint information | Allow trusted information |
    | --- | --- | --- |
    | __Azure Key Vault__ | [Service endpoint](https://learn.microsoft.com/azure/key-vault/general/overview-vnet-service-endpoints)</br>[Private endpoint](https://learn.microsoft.com/azure/key-vault/general/private-link-service) | [Allow trusted Microsoft services to bypass this firewall](how-to-secure-workspace-vnet.md#secure-azure-key-vault) |
    | __Azure Storage Account__ | [Service and private endpoint](how-to-secure-workspace-vnet.md?tabs=se#secure-azure-storage-accounts)</br>[Private endpoint](how-to-secure-workspace-vnet.md?tabs=pe#secure-azure-storage-accounts) | [Grant access to trusted Azure services](https://learn.microsoft.com/azure/storage/common/storage-network-security#grant-access-to-trusted-azure-services) |
    | __Azure Container Registry__ | [Private endpoint](https://learn.microsoft.com/azure/container-registry/container-registry-private-link) | [Allow trusted services](https://learn.microsoft.com/azure/container-registry/allow-access-trusted-services) |

    **Applies to: azureml-api-1**
    | Service | Endpoint information | Allow trusted information |
    | --- | --- | --- |
    | __Azure Key Vault__ | [Service endpoint](https://learn.microsoft.com/azure/key-vault/general/overview-vnet-service-endpoints)</br>[Private endpoint](https://learn.microsoft.com/azure/key-vault/general/private-link-service) | [Allow trusted Microsoft services to bypass this firewall](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-workspace-vnet.md#secure-azure-key-vault) |
    | __Azure Storage Account__ | [Service and private endpoint](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-workspace-vnet.md?tabs=se#secure-azure-storage-accounts)</br>[Private endpoint](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-workspace-vnet.md?tabs=pe#secure-azure-storage-accounts) | [Grant access to trusted Azure services](https://learn.microsoft.com/azure/storage/common/storage-network-security#grant-access-to-trusted-azure-services) |
    | __Azure Container Registry__ | [Private endpoint](https://learn.microsoft.com/azure/container-registry/container-registry-private-link) | [Allow trusted services](https://learn.microsoft.com/azure/container-registry/allow-access-trusted-services) |


1. In properties for the Azure Storage Account for your workspace, add your client IP address to the allowed list in firewall settings. For more information, see [Configure firewalls and virtual networks](https://learn.microsoft.com/azure/storage/common/storage-network-security#configuring-access-from-on-premises-networks).

## Secure the workspace and associated resources

Use the following steps to secure your workspace and associated resources. These steps allow your services to communicate in the virtual network.

**Applies to: azureml-api-2**
1. Create an [Azure Virtual Networks](https://learn.microsoft.com/azure/virtual-network/virtual-networks-overview). This network secures the workspace and other resources. Then create a [Private Link-enabled workspace](how-to-secure-workspace-vnet.md#secure-the-workspace-with-private-endpoint) to enable communication between your VNet and workspace.
1. Add the following services to the virtual network by using _either_ a __service endpoint__ or a __private endpoint__. Also allow trusted Microsoft services to access these services:

    | Service | Endpoint information | Allow trusted information |
    | --- | --- | --- |
    | __Azure Key Vault__ | [Service endpoint](https://learn.microsoft.com/azure/key-vault/general/overview-vnet-service-endpoints)</br>[Private endpoint](https://learn.microsoft.com/azure/key-vault/general/private-link-service) | [Allow trusted Microsoft services to bypass this firewall](how-to-secure-workspace-vnet.md#secure-azure-key-vault) |
    | __Azure Storage Account__ | [Service and private endpoint](how-to-secure-workspace-vnet.md?tabs=se#secure-azure-storage-accounts)</br>[Private endpoint](how-to-secure-workspace-vnet.md?tabs=pe#secure-azure-storage-accounts) | [Grant access from Azure resource instances](https://learn.microsoft.com/azure/storage/common/storage-network-security#grant-access-from-azure-resource-instances)</br>__or__</br>[Grant access to trusted Azure services](https://learn.microsoft.com/azure/storage/common/storage-network-security#grant-access-to-trusted-azure-services) |
    | __Azure Container Registry__ | [Private endpoint](https://learn.microsoft.com/azure/container-registry/container-registry-private-link) | [Allow trusted services](https://learn.microsoft.com/azure/container-registry/allow-access-trusted-services) |

**Applies to: azureml-api-1**
1. Create an [Azure Virtual Networks](https://learn.microsoft.com/azure/virtual-network/virtual-networks-overview). This virtual network secures the workspace and other resources. Then create a [Private Link-enabled workspace](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-workspace-vnet.md#secure-the-workspace-with-private-endpoint) to enable communication between your VNet and workspace.
1. Add the following services to the virtual network by using _either_ a __service endpoint__ or a __private endpoint__. Also allow trusted Microsoft services to access these services:

    | Service | Endpoint information | Allow trusted information |
    | --- | --- | --- |
    | __Azure Key Vault__ | [Service endpoint](https://learn.microsoft.com/azure/key-vault/general/overview-vnet-service-endpoints)</br>[Private endpoint](https://learn.microsoft.com/azure/key-vault/general/private-link-service) | [Allow trusted Microsoft services to bypass this firewall](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-workspace-vnet.md#secure-azure-key-vault) |
    | __Azure Storage Account__ | [Service and private endpoint](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-workspace-vnet.md?tabs=se#secure-azure-storage-accounts)</br>[Private endpoint](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-workspace-vnet.md?tabs=pe#secure-azure-storage-accounts) | [Grant access from Azure resource instances](https://learn.microsoft.com/azure/storage/common/storage-network-security#grant-access-from-azure-resource-instances)</br>__or__</br>[Grant access to trusted Azure services](https://learn.microsoft.com/azure/storage/common/storage-network-security#grant-access-to-trusted-azure-services) |
    | __Azure Container Registry__ | [Private endpoint](https://learn.microsoft.com/azure/container-registry/container-registry-private-link) | [Allow trusted services](https://learn.microsoft.com/azure/container-registry/allow-access-trusted-services) |


Diagram showing how the workspace and associated resources communicate inside a VNet.

**Applies to: azureml-api-2**
For detailed instructions on how to complete these steps, see [Secure an Azure Machine Learning workspace](how-to-secure-workspace-vnet.md).

**Applies to: azureml-api-1**
For detailed instructions on how to complete these steps, see [Secure an Azure Machine Learning workspace](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-workspace-vnet.md).


### Limitations

Securing your workspace and associated resources within a virtual network has the following limitations:

- The workspace and default storage account must be in the same virtual network. However, they can be in different subnets within the same virtual network. For example, the workspace can be in one subnet and the storage account in another.

    We _recommend_ that the Azure Key Vault and Azure Container Registry for the workspace are also in the same virtual network. However, both of these resources can also be in a [peered](https://learn.microsoft.com/azure/virtual-network/virtual-network-peering-overview) virtual network.

## Secure the training environment

In this section, you learn how to secure the training environment in Azure Machine Learning. You also learn how Azure Machine Learning completes a training job to understand how the network configurations work together.

To secure the training environment, use the following steps:

**Applies to: azureml-api-2**
1. Create an Azure Machine Learning [compute instance and computer cluster in the virtual network](how-to-secure-training-vnet.md). Training jobs run on these computes.
1. If your compute cluster or compute instance uses a public IP address, you must [Allow inbound communication](how-to-secure-training-vnet.md) so that management services can submit jobs to your compute resources. 

    > **Tip:**
    > You can create a compute cluster and compute instance with or without a public IP address. If you create them with a public IP address, you get a load balancer with a public IP to accept the inbound access from Azure batch service and Azure Machine Learning service. You need to configure User Defined Routing (UDR) if you use a firewall. If you create them without a public IP, you get a private link service to accept the inbound access from Azure batch service and Azure Machine Learning service without a public IP.

**Applies to: azureml-api-1**
1. Create an Azure Machine Learning [compute instance and computer cluster in the virtual network](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-training-vnet.md). Train jobs run on these computes.
1. If your compute cluster or compute instance uses a public IP address, you must [Allow inbound communication](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-training-vnet.md) so that management services can submit jobs to your compute resources. 

    > **Tip:**
    > You can create a compute cluster and compute instance with or without a public IP address. If you create them with a public IP address, you get a load balancer with a public IP to accept the inbound access from Azure batch service and Azure Machine Learning service. You need to configure User Defined Routing (UDR) if you use a firewall. If you create them without a public IP, you get a private link service to accept the inbound access from Azure batch service and Azure Machine Learning service without a public IP.


Diagram showing how to secure managed compute clusters and instances.

**Applies to: azureml-api-2**
For detailed instructions on how to complete these steps, see [Secure a training environment](how-to-secure-training-vnet.md). 

**Applies to: azureml-api-1**
For detailed instructions on how to complete these steps, see [Secure a training environment](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-training-vnet.md). 


### Example training job submission 

In this section, you learn how Azure Machine Learning securely communicates between services to submit a training job. This example shows you how all your configurations work together to secure communication.

1. The client uploads training scripts and training data to storage accounts that are secured with a service or private endpoint.

1. The client submits a training job to the Azure Machine Learning workspace through the private endpoint.

1. Azure Batch service receives the job from the workspace. It then submits the training job to the compute environment through the public load balancer for the compute resource. 

1. The compute resource receives the job and begins training. The compute resource uses information stored in key vault to access storage accounts to download training files and upload output.

Diagram showing the secure training job submission workflow.
### Limitations

- Azure Compute Instance and Azure Compute Clusters must be in the same virtual network, region, and subscription as the workspace. If the associated resources are in a different region than the workspace, you might experience additional latency. 

## Secure the inferencing environment

**Applies to: azureml-api-2**
You can enable network isolation for managed online endpoints to secure the following network traffic:

* Inbound scoring requests.
* Outbound communication with the workspace, Azure Container Registry, and Azure Blob Storage.

For more information, see [Enable network isolation for managed online endpoints](how-to-secure-online-endpoint.md).

**Applies to: azureml-api-1**
In this section, you learn about the options available for securing an inferencing environment when using the Azure CLI extension for ML v1 or the Azure Machine Learning Python SDK v1. When you do a v1 deployment, use Azure Kubernetes Services (AKS) clusters for high-scale, production deployments.

You have two options for AKS clusters in a virtual network:

- Deploy or attach a default AKS cluster to your VNet.
- Attach a private AKS cluster to your VNet.

__Default AKS clusters__ have a control plane with public IP addresses. You can add a default AKS cluster to your VNet during the deployment or attach a cluster after creation.

__Private AKS clusters__ have a control plane, which you can only access through private IPs. You must attach private AKS clusters after you create the cluster. 

For detailed instructions on how to add default and private clusters, see [Secure an inferencing environment](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-inferencing-vnet.md). 

Regardless of whether you use a default AKS cluster or a private AKS cluster, if your AKS cluster is behind a VNET, your workspace and its associate resources (storage, key vault, and ACR) must have private endpoints or service endpoints in the same VNET as the AKS cluster.

The following network diagram shows a secured Azure Machine Learning workspace with a private AKS cluster attached to the virtual network.

Diagram showing an attached private AKS cluster.


## Optional: Enable public access

You can secure the workspace behind a virtual network using a private endpoint and still allow access over the public internet. The initial configuration is the same as [securing the workspace and associated resources](#secure-the-workspace-and-associated-resources). 

After securing the workspace with a private endpoint, use the following steps to enable clients to develop remotely by using either the SDK or Azure Machine Learning studio:

**Applies to: azureml-api-2**
1. [Enable public access](how-to-configure-private-link.md#enable-public-access) to the workspace.
1. [Configure the Azure Storage firewall](https://learn.microsoft.com/azure/storage/common/storage-network-security?toc=%2fazure%2fstorage%2fblobs%2ftoc.json#grant-access-from-an-internet-ip-range) to allow communication with the IP address of clients that connect over the public internet.

**Applies to: azureml-api-1**
1. [Enable public access](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-configure-private-link.md#enable-public-access) to the workspace.
1. [Configure the Azure Storage firewall](https://learn.microsoft.com/azure/storage/common/storage-network-security?toc=%2fazure%2fstorage%2fblobs%2ftoc.json#grant-access-from-an-internet-ip-range) to allow communication with the IP address of clients that connect over the public internet.



## Optional: enable studio functionality

If your storage is in a virtual network, you must use extra configuration steps to enable full functionality in studio. By default, the following features are disabled:

* Preview data in the studio.
* Visualize data in the designer.
* Deploy a model in the designer.
* Submit an AutoML experiment.
* Start a labeling project.

To enable full studio functionality, see [Use Azure Machine Learning studio in a virtual network](how-to-enable-studio-virtual-network.md).

### Limitations

[ML-assisted data labeling](how-to-create-image-labeling-projects.md#use-ml-assisted-data-labeling) doesn't support a default storage account behind a virtual network. Instead, use a storage account other than the default for ML assisted data labeling. 

> **Tip:**
> As long as it's not the default storage account, you can secure the account used by data labeling behind the virtual network. 

## Configure firewall settings

Configure your firewall to control traffic between your Azure Machine Learning workspace resources and the public internet. While we recommend Azure Firewall, you can use other firewall products. 

For more information on firewall settings, see [Use workspace behind a Firewall](how-to-access-azureml-behind-firewall.md).

## Custom DNS

If you need to use a custom DNS solution for your virtual network, you must add host records for your workspace.

For more information on the required domain names and IP addresses, see [how to use a workspace with a custom DNS server](how-to-custom-dns.md).

## Microsoft Sentinel

Microsoft Sentinel is a security solution that can integrate with Azure Machine Learning. For example, it can integrate with Jupyter notebooks provided through Azure Machine Learning. For more information, see [Use Jupyter notebooks to hunt for security threats](https://learn.microsoft.com/azure/sentinel/notebooks).

### Public access

Microsoft Sentinel can automatically create a workspace for you if you're OK with a public endpoint. In this configuration, the security operations center (SOC) analysts and system administrators connect to notebooks in your workspace through Sentinel.

For information on this process, see [Create an Azure Machine Learning workspace from Microsoft Sentinel](https://learn.microsoft.com/azure/sentinel/notebooks-hunt?tabs=public-endpoint#create-an-azure-ml-workspace-from-microsoft-sentinel).

Diagram showing Microsoft Sentinel public connection.

### Private endpoint

If you want to secure your workspace and associated resources in a virtual network, you must create the Azure Machine Learning workspace first. You must also create a virtual machine jump box in the same virtual network as your workspace, and enable Azure Bastion connectivity to it. Similar to the public configuration, SOC analysts and administrators can connect using Microsoft Sentinel, but some operations must be performed by using Azure Bastion to connect to the VM.

For more information on this configuration, see [Create an Azure Machine Learning workspace from Microsoft Sentinel](https://learn.microsoft.com/azure/sentinel/notebooks-hunt?tabs=private-endpoint#create-an-azure-ml-workspace-from-microsoft-sentinel).

Daigram showing Microsoft Sentinel connection through a VNet.

## Related content

This article is part of a series on securing an Azure Machine Learning workflow. See the other articles in this series:

**Applies to: azureml-api-2**
* [Secure the workspace resources](how-to-secure-workspace-vnet.md)
* [Secure machine learning registries](how-to-registry-network-isolation.md)
* [Secure the training environment](how-to-secure-training-vnet.md)
* [Secure the inference environment](how-to-secure-inferencing-vnet.md)
* [Enable studio functionality](how-to-enable-studio-virtual-network.md)
* [Use custom DNS](how-to-custom-dns.md)
* [Use a firewall](how-to-access-azureml-behind-firewall.md)
* [API platform network isolation](how-to-configure-network-isolation-with-v2.md)

**Applies to: azureml-api-1**
* [Secure the workspace resources](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-workspace-vnet.md)
* [Secure the training environment](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-training-vnet.md)
* [Secure the inference environment](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-secure-inferencing-vnet.md)
* [Enable studio functionality](how-to-enable-studio-virtual-network.md)
* [Use custom DNS](how-to-custom-dns.md)
* [Use a firewall](how-to-access-azureml-behind-firewall.md)
