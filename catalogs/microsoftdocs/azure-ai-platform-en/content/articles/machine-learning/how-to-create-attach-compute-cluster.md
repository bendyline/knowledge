---
title: Create compute clusters
titleSuffix: Azure Machine Learning
description: Learn how to create compute clusters in your Azure Machine Learning workspace. Use the compute cluster as a compute target for training or inference.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: compute
ms.topic: how-to
ms.custom: devx-track-azurecli, cliv2, sdkv2, build-2023
ms.author: scottpolly
author: s-polly
ms.reviewer: jturuk
ms.date: 09/11/2025
---

# Create an Azure Machine Learning compute cluster


**APPLIES TO:**



This article explains how to create and manage a [compute cluster](concept-compute-target.md#azure-machine-learning-compute-managed) in your Azure Machine Learning workspace.

You can use Azure Machine Learning compute cluster to distribute a training or batch inference process across a cluster of CPU or GPU compute nodes in the cloud. For more information on the VM sizes that include GPUs, see [GPU-optimized virtual machine sizes](https://learn.microsoft.com/azure/virtual-machines/sizes-gpu).

Learn how to:

* Create a compute cluster.
* Lower your compute cluster cost with low priority VMs.
* Set up a [managed identity](https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview) for the cluster.


> **Note:**
> Instead of creating a compute cluster, use [serverless compute](how-to-use-serverless-compute.md) to offload compute lifecycle management to Azure Machine Learning.


## Prerequisites

* An Azure Machine Learning workspace. For more information, see [Manage Azure Machine Learning workspaces](how-to-manage-workspace.md).

Select the appropriate tab for the rest of the prerequisites based on your preferred method of creating the compute cluster.

# [Python SDK](#tab/python)

* If you're not running your code on a compute instance, install the [Azure Machine Learning Python SDK](https://learn.microsoft.com/python/api/overview/azure/ai-ml-readme). This SDK is already installed for you on a compute instance.

* Attach to the workspace in your Python script:

    
Run this code to connect to your Azure Machine Learning workspace. 

Replace your Subscription ID, Resource Group name, and Workspace name in the following code. To find these values:

1. Sign in to [Azure Machine Learning studio](https://ml.azure.com).
1. Open the workspace you wish to use.
1. Select your workspace name in the upper right Azure Machine Learning studio toolbar.
1. Copy the value for workspace, resource group, and subscription ID into the code.  


**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

[!notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/includes/~/azureml-examples-main/sdk/python/resources/compute/compute.ipynb?name=subscription_id)]

[!notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/includes/~/azureml-examples-main/sdk/python/resources/compute/compute.ipynb?name=ml_client)]

`ml_client` is a handler to the workspace that you use to manage other resources and jobs.

# [Azure CLI](#tab/azure-cli)

* If you're not running these commands on a compute instance, install the [Azure CLI extension for Machine Learning service (v2)](how-to-configure-cli.md). This extension is already installed for you on a compute instance.

* Authenticate and set the default workspace and resource group. Leave the terminal open to run the rest of the commands in this article.

    
* If you're on a compute instance:

    ```azurecli
    az login --identity
    # next line needed only if you have multiple subscriptions:
    az account set --subscription "<SUBSCRIPTION-NAME>" # replace with your subscription name
    az configure --defaults group=$CI_RESOURCE_GROUP workspace=$CI_WORKSPACE
     ```

* If you're running the commands locally, omit `--identity` and follow instructions for authentication. Also replace `$CI_RESOURCE_GROUP` and `$CI_WORKSPACE` with your values.


# [Studio](#tab/azure-studio)

Start at [Azure Machine Learning studio](https://ml.azure.com).

---

> **Note:**
> When configuring a Virtual Network (VNet) located in a different resource group from your Azure Machine Learning workspace, be aware that resources such as Network Security Groups (NSGs), Public IPs, and Load Balancers will be created in the same resource group as the VNet. This behavior ensures proper network management and isolation.

## What is a compute cluster?

Azure Machine Learning compute cluster is a managed-compute infrastructure that allows you to easily create a single or multi-node compute. The compute cluster is a resource that can be shared with other users in your workspace. The compute scales up automatically when a job is submitted, and can be put in an Azure Virtual Network. Compute cluster supports **no public IP** deployment as well in virtual network. The compute executes in a containerized environment and packages your model dependencies in a [Docker container](https://www.docker.com/why-docker).

Compute clusters can run jobs securely in either a [managed virtual network](how-to-managed-network.md) or an [Azure virtual network](how-to-secure-training-vnet.md), without requiring enterprises to open up SSH ports. The job executes in a containerized environment and packages your model dependencies in a Docker container.

## Limitations

* Compute clusters can be created in a different region than your workspace. This functionality is only available for **compute clusters**, not compute instances.

    > **Warning:**
    > When using a compute cluster in a different region than your workspace or datastores, you might see increased network latency and data transfer costs. The latency and costs can occur when creating the cluster, and when running jobs on it.

* Azure Machine Learning Compute has default limits, such as the number of cores that can be allocated. For more information, see [Manage and request quotas for Azure resources](how-to-manage-quotas.md).

* Azure allows you to place *locks* on resources, so that they can't be deleted or are read only. **Do not apply resource locks to the resource group that contains your workspace**. Applying a lock to the resource group that contains your workspace prevents scaling operations for Azure Machine Learning compute clusters. For more information on locking resources, see [Lock resources to prevent unexpected changes](https://learn.microsoft.com/azure/azure-resource-manager/management/lock-resources).

> **Caution:**
> Applying resource locks, such as "Delete" or "Read-only", to the resource group that contains your Machine Learning workspace or to a separate resource group where you've configured a virtual network can prevent operations like creation, scaling, or deletion of these clusters. Ensure that resource locks are configured appropriately to avoid unintended disruptions. 

## Create

**Time estimate**: Approximately five minutes.

> **Note:**
> If you use serverless compute, you don't need to create a compute cluster.

Azure Machine Learning Compute can be reused across runs. The compute can be shared with other users in the workspace and is retained between runs, automatically scaling nodes up or down based on the number of runs submitted, and the `max_nodes` set on your cluster. The `min_nodes` setting controls the minimum nodes available.

The dedicated cores per region per VM family quota and total regional quota, which applies to compute cluster creation, is unified and shared with Azure Machine Learning training compute instance quota.


> **Important:**
> To avoid charges when no jobs are running, **set the minimum nodes to 0**. This setting allows Azure Machine Learning to de-allocate the nodes when they aren't in use. Any value larger than 0 will keep that number of nodes running, even if they are not in use.

The compute autoscales down to zero nodes when it isn't used. Dedicated VMs are created to run your jobs as needed.

Use the following examples to create a compute cluster:

# [Python SDK](#tab/python)

To create a persistent Azure Machine Learning Compute resource in Python, specify the `size` and `max_instances` properties. Azure Machine Learning then uses smart defaults for the other properties.

* **size**: The VM family of the nodes created by Azure Machine Learning Compute.
* **max_instances**: The maximum number of nodes to autoscale up to when you run a job on Azure Machine Learning Compute.


**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

[!notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/azureml-examples-main/sdk/python/resources/compute/compute.ipynb?name=cluster_basic)]

You can also configure several advanced properties when you create Azure Machine Learning Compute. The properties allow you to create a persistent cluster of fixed size, or within an existing Azure Virtual Network in your subscription. See the [AmlCompute class](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.entities.amlcompute) for details.

> **Warning:**
> When setting the `location` parameter, if it's a different region than your workspace or datastores, you might see increased network latency and data transfer costs. The latency and costs can occur when creating the cluster, and when running jobs on it.

# [Azure CLI](#tab/azure-cli)


**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


```azurecli
az ml compute create -f create-cluster.yml
```

Where the file *create-cluster.yml* is:

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/compute/cluster-location.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-create-attach-compute-cluster.md)

> **Warning:**
> When you use a compute cluster in a different region than your workspace or datastores, you might see increased network latency and data transfer costs. The latency and costs can occur when creating the cluster, and when running jobs on it.

# [Studio](#tab/azure-studio)

Create a single- or multi- node compute cluster for your training, batch inference or reinforcement learning workloads.

1. Navigate to [Azure Machine Learning studio](https://ml.azure.com).

1. Under **Manage**, select **Compute**.

1. If you have no compute resources, select **New** in the middle of the page.
  
    Screenshot that shows the New button to create a compute target.

1. If you see a list of compute resources, select **+New** above the list.

    Screenshot that shows the New button to create the resource.

1. In the tabs at the top, select **Compute cluster**.

1. Fill out the form as follows:

    | Field | Description |
    | --- | --- |
    | Location | The Azure region where the compute cluster is created. By default, this is the same location as the workspace. If you don't have sufficient quota in the default region, switch to a different region for more options. <br>When using a different region than your workspace or datastores, you might see increased network latency and data transfer costs. The latency and costs can occur when creating the cluster, and when running jobs on it. |
    | Virtual machine type | Choose CPU or GPU. This type can't be changed after creation. |
    | Virtual machine priority | Choose **Dedicated** or **Low priority**. Low priority virtual machines are cheaper but don't guarantee the compute nodes. Your job might be preempted. |
    | Virtual machine size | Supported virtual machine sizes might be restricted in your region. Check the [availability list](https://azure.microsoft.com/global-infrastructure/services/?products=virtual-machines) |

1. Select **Next** to proceed to **Advanced Settings** and fill out the form as follows:

    | Field | Description |
    | --- | --- |
    | Compute name | * Name is required and must be between 3 to 24 characters long.<br><br> * Valid characters are upper and lower case letters, digits, and the  **-** character.<br><br> * Name must start with a letter. <br><br> * Name needs to be unique across all existing computes within an Azure region. You see an alert if the name you choose isn't unique. <br><br> * If **-**  character is used, then it needs to be followed by at least one letter later in the name. |
    | Minimum number of nodes | Minimum number of nodes that you want to provision. If you want a dedicated number of nodes, set that count here. Save money by setting the minimum to 0, so you don't pay for any nodes when the cluster is idle. |
    | Maximum number of nodes | Maximum number of nodes that you want to provision. The compute automatically scales to a maximum of this node count when a job is submitted. |
    | Idle seconds before scale down | Idle time before scaling the cluster down to the minimum node count. |
    | Enable SSH access | Use the same instructions as [Enable SSH access](#enable-ssh-access) for a compute instance. |
    | Advanced settings | Optional. Configure network settings.<br><br> * If an *Azure Virtual Network*, Specify the **Resource group**, **Virtual network**, and **Subnet** to create the compute instance inside the network. For more information, see [network requirements](how-to-secure-training-vnet.md).<br><br> * If an *Azure Machine Learning managed network*, the compute cluster is automatically in the managed network. For more information, see [managed computes with a managed network](how-to-managed-network-compute.md).<br><br> * No public IP configures whether the compute cluster has a public IP address when in a network.<br><br> * Assign a [managed identity](#set-up-managed-identity) to grant access to resources. |

1. Select **Create**.

### Enable SSH access

SSH access is disabled by default. SSH access can't be changed after creation. Make sure to enable access if you plan to debug interactively with [VS Code Remote](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-set-up-vs-code-remote.md). 


After you have selected **Next: Advanced Settings**:

1. Turn on **Enable SSH access**.
1. In the **SSH public key source**, select one of the options from the dropdown:
    * If you **Generate new key pair**:
        1. Enter a name for the key in **Key pair name**.
        1. Select **Create**.
        1. Select **Download private key and create compute**.  The key is usually downloaded into the **Downloads** folder.  
    * If you select **Use existing public key stored in Azure**, search for and select the key in **Stored key**.
    * If you select **Use existing public key**, provide an RSA public key in the single-line format (starting with "ssh-rsa") or the multi-line PEM format. You can generate SSH keys using ssh-keygen on Linux and OS X, or PuTTYGen on Windows.

### Connect with SSH access


After you create a compute with SSH access enabled, use these steps for access.

1. Find the compute in your workspace resources:
    1. On the left, select **Compute**.
    1. Use the tabs at the top to select **Compute instance** or **Compute cluster** to find your machine.
1. Select the compute name in the list of resources.
1. Find the connection string:

    * For a **compute instance**, select **Connect** at the top of the **Details** section.

        Screenshot that shows connect tool at the top of the Details page.

    * For a **compute cluster**, select **Nodes** at the top, then select the **Connection string** in the table for your node.
        Screenshot that shows connection string for a node in a compute cluster.

1. Copy the connection string.
1. For Windows, open PowerShell or a command prompt:
   1. Go into the directory or folder where your key is stored
   1. Add the -i flag to the connection string to locate the private key and point to where it is stored:
    
      `ssh -i <keyname.pem> azureuser@... (rest of connection string)`

1. For Linux users, follow the steps from [Create and use an SSH key pair for Linux VMs in Azure](https://learn.microsoft.com/azure/virtual-machines/linux/mac-create-ssh-keys)
1. For SCP use: 

   `scp -i key.pem -P {port} {fileToCopyFromLocal }  azureuser@yourComputeInstancePublicIP:~/{destination}`


---

### Lower your compute cluster cost with low priority VMs

You can also choose to use [low-priority VMs](how-to-manage-optimize-cost.md#low-pri-vm) to run some or all of your workloads. These VMs don't have guaranteed availability and might be preempted while in use. You have to restart a preempted job.

Using Azure Low Priority Virtual Machines allows you to take advantage of Azure's unused capacity at a significant cost savings. At any point in time when Azure needs the capacity back, the Azure infrastructure evicts Azure Low Priority Virtual Machines. Therefore, Azure Low Priority Virtual Machine is great for workloads that can handle interruptions. The amount of available capacity can vary based on size, region, time of day, and more. When deploying Azure Low Priority Virtual Machines, Azure allocates the VMs if there's capacity available, but there's no SLA for these VMs. An Azure Low Priority Virtual Machine offers no high availability guarantees. At any point in time when Azure needs the capacity back, the Azure infrastructure evicts Azure Low Priority Virtual Machines.

Use any of these ways to specify a low-priority VM:

# [Python SDK](#tab/python)


**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

[!notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/azureml-examples-main/sdk/python/resources/compute/compute.ipynb?name=cluster_low_pri)]

# [Azure CLI](#tab/azure-cli)


**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


Set the `vm-priority`:

```azurecli
az ml compute create -f create-cluster.yml
```

Where the file *create-cluster.yml* is:

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/compute/cluster-low-priority.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-create-attach-compute-cluster.md)

> **Note:**
> If you use [serverless compute](how-to-use-serverless-compute.md), you don't need to create a compute cluster. To specify a low-priority serverless compute, set the `job_tier` to `Spot` in the [queue settings](how-to-use-serverless-compute.md#configure-properties-for-command-jobs).

# [Studio](#tab/azure-studio)

In the studio, choose **Low Priority** when you create a VM.

---

## Delete

While your compute cluster scales down to zero nodes when not in use, unprovisioned nodes contribute to your quota usage. Deleting the compute cluster removes the compute target from your workspace, and releases the quota.

# [Python SDK](#tab/python)


**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

This deletes the basic compute cluster, created from the `create_basic` object earlier in this article.

[!notebook-python[](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/azureml-examples-main/sdk/python/resources/compute/compute.ipynb?name=delete_cluster)]

# [Azure CLI](#tab/azure-cli)


**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


This deletes a compute cluster named `basic-example`.

```azurecli
az ml compute delete --name basic-example 
```

# [Studio](#tab/azure-studio)

1. Navigate to [Azure Machine Learning studio](https://ml.azure.com).
1. In the left menu, under **Manage**, select **Compute**.
1. At the top of the Compute page, select **Compute cluster**.
1. Select the cluster you want to delete. 
1. At the top of the page, select **Delete**.

---

## Set up managed identity

For information on how to configure a managed identity with your compute cluster, see [Set up authentication between Azure Machine Learning and other services](how-to-identity-based-service-authentication.md#compute-cluster).

## Troubleshooting

There's a chance that some users who created their Azure Machine Learning workspace from the Azure portal before the GA release might not be able to create compute in that workspace. You can either raise a support request against the service or create a new workspace through the portal or the SDK to unblock yourself immediately.


> **Important:**
> If your compute instance or compute clusters are based on any of these series, recreate with another VM size.
> 
> These series retired on August 31, 2023:
> * [Azure NC-series](https://learn.microsoft.com/azure/virtual-machines/nc-series-retirement)
> * [Azure NCv2-series](https://learn.microsoft.com/azure/virtual-machines/ncv2-series-retirement)
> * [Azure ND-series](https://learn.microsoft.com/azure/virtual-machines/nd-series-retirement)
> * [Azure NV- and NV_Promo series](https://learn.microsoft.com/azure/virtual-machines/nv-series-retirement)
>
> These series retired on August 31, 2024:
> * [Azure Av1-series](https://learn.microsoft.com/azure/virtual-machines/av1-series-retirement)
> * [Azure HB-series](https://learn.microsoft.com/azure/virtual-machines/sizes/overview)
>
> These series retired on September 30, 2025:
> * [Azure NCv3-series](https://learn.microsoft.com/azure/virtual-machines/ncv3-retirement)


### Stuck at resizing

If your Azure Machine Learning compute cluster appears stuck at resizing (0 -> 0) for the node state, Azure resource locks might be the cause.


Azure allows you to place _locks_ on resources, so that they cannot be deleted or are read only. __Locking a resource can lead to unexpected results.__ Some operations that don't seem to modify the resource actually require actions that are blocked by the lock. 

With Azure Machine Learning, applying a delete lock to the resource group for your workspace will prevent scaling operations for Azure ML compute clusters. To work around this problem we recommend __removing__ the lock from resource group and instead applying it to individual items in the group.

> **Important:**
> __Do not__ apply the lock to the following resources:
>
> | Resource name | Resource type |
> | --- | --- |
> | `<GUID>-azurebatch-cloudservicenetworksecurityggroup` | Network security group |
> | `<GUID>-azurebatch-cloudservicepublicip` | Public IP address |
> | `<GUID>-azurebatch-cloudserviceloadbalancer` | Load balancer |

These resources are used to communicate with, and perform operations such as scaling on, the compute cluster. Removing the resource lock from these resources should allow autoscaling for your compute clusters.

For more information on resource locking, see [Lock resources to prevent unexpected changes](https://learn.microsoft.com/azure/azure-resource-manager/management/lock-resources).

## Next step

Use your compute cluster to:

* [Submit a training run](how-to-train-model.md)
* [Run batch inference](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/tutorial-pipeline-batch-scoring-classification.md)
