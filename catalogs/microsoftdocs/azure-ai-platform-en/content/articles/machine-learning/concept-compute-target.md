---
title: Understand compute targets
titleSuffix: Azure Machine Learning
description: Learn how to designate a compute resource or environment to train or deploy your model with Azure Machine Learning.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: compute
ms.topic: concept-article
ms.author: scottpolly
author: s-polly
ms.reviewer: jturuk
ms.date: 03/31/2026
ms.custom:
  - cliv2
  - build-2023
  - ignite-2023
ai-usage: ai-assisted
monikerRange: 'azureml-api-2 || azureml-api-1'
#Customer intent: As a data scientist, I want to understand what a compute target is and why I need it.
---

# What are compute targets in Azure Machine Learning?

A *compute target* is a designated compute resource or environment where you run your training script or host your service deployment. This location might be your local machine or a cloud-based compute resource. By using compute targets, you can easily change your compute environment later without changing your code.

Azure Machine Learning supports different compute targets. In a typical model development lifecycle, you might:

1. Start by developing and experimenting on a small amount of data. At this stage, use your local environment, such as a local computer or cloud-based virtual machine (VM), as your compute target.
1. Scale up to larger data, or do [distributed training](how-to-train-distributed-gpu.md) by using one of these [training compute targets](#training-compute-targets).
1. After your model is ready, deploy it to a web hosting environment by using one of these [deployment compute targets](#compute-targets-for-inference).

Attach the compute resources you use for your compute targets to a [workspace](concept-workspace.md). Users of the workspace share compute resources other than the local machine.

## Training compute targets

As you scale up your training on larger datasets or perform [distributed training](how-to-train-distributed-gpu.md), use Azure Machine Learning compute to create a single-node or multinode cluster that autoscales each time you submit a job. You can also attach your own compute resource, although support for different scenarios might vary.

**You can reuse compute targets from one training job to the next.** For example, after you attach a remote VM to your workspace, you can reuse it for multiple jobs.
**Applies to: azureml-api-1**
For machine learning pipelines, use the appropriate [pipeline step](https://learn.microsoft.com/python/api/azureml-pipeline-steps/azureml.pipeline.steps) for each compute target.


You can use any of the following resources for a training compute target for most jobs. Not all resources can be used for automated machine learning, machine learning pipelines, or designer. Azure Databricks can be used as a training resource for local runs and machine learning pipelines, but not as a remote target for other training.

**Applies to: azureml-api-2**
| Training &nbsp;targets | [Automated machine learning](concept-automated-ml.md) | [Machine learning pipelines](concept-ml-pipelines.md) | [Azure Machine Learning designer](concept-designer.md) |
| --- | :---: | :---: | :---: |
| [Azure Machine Learning compute cluster](how-to-create-attach-compute-cluster.md) | Yes | Yes | Yes |
| [Azure Machine Learning serverless compute](how-to-use-serverless-compute.md) | Yes | Yes | Yes |
| [Azure Machine Learning compute instance](how-to-create-compute-instance.md) | Yes (through SDK) | Yes | Yes |
| [Azure Machine Learning Kubernetes](how-to-attach-kubernetes-anywhere.md) |  | Yes | Yes |
| [Remote VM](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-train-model.md#remote-virtual-machines) | Yes | Yes | &nbsp; |
| [Apache Spark pools (preview)](how-to-manage-synapse-spark-pool.md) | Yes (SDK local mode only) | Yes | &nbsp; |
| [Azure Databricks](how-to-create-attach-compute-studio.md#other-compute-targets) | Yes (SDK local mode only) | Yes | &nbsp; |
| [Azure Data Lake Analytics](how-to-create-attach-compute-studio.md#other-compute-targets) | &nbsp; | Yes | &nbsp; |
| [Azure HDInsight](how-to-create-attach-compute-studio.md#other-compute-targets) | &nbsp; | Yes | &nbsp; |
| [Azure Batch](how-to-create-attach-compute-studio.md#other-compute-targets) | &nbsp; | Yes | &nbsp; |

**Applies to: azureml-api-1**
| Training &nbsp;targets | [Automated machine learning](concept-automated-ml.md) | [Machine learning pipelines](concept-ml-pipelines.md) | [Azure Machine Learning designer](concept-designer.md) |
| --- | :---: | :---: | :---: |
| [Local computer](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-train-model.md#local-computer) | Yes | &nbsp; | &nbsp; |
| [Azure Machine Learning compute cluster](how-to-create-attach-compute-cluster.md) | Yes | Yes | Yes |
| [Azure Machine Learning compute instance](how-to-create-compute-instance.md) | Yes (through SDK) | Yes | Yes |
| [Azure Machine Learning Kubernetes](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-create-attach-kubernetes.md) |  | Yes | Yes |
| [Remote VM](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-train-model.md#remote-virtual-machines) | Yes | Yes | &nbsp; |
| [Apache Spark pools (preview)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-train-model.md#synapse) | Yes (SDK local mode only) | Yes | &nbsp; |
| [Azure Databricks](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-train-model.md#azure-databricks) | Yes (SDK local mode only) | Yes | &nbsp; |
| [Azure HDInsight](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-train-model.md#azure-hdinsight) | &nbsp; | Yes | &nbsp; |
| [Azure Batch](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-train-model.md#azbatch) | &nbsp; | Yes | &nbsp; |


> **Tip:**
> The compute instance has a 120-GB OS disk. If you run out of disk space, [use the terminal](how-to-access-terminal.md) to clear at least 1-2 GB before you [stop or restart](how-to-manage-compute-instance.md#manage) the compute instance.


## Compute targets for inference

When you perform inference, Azure Machine Learning creates a Docker container that hosts the model and associated resources needed to use it. You use this container in a compute target.

The compute target you use to host your model affects the cost and availability of your deployed endpoint. Use this table to choose an appropriate compute target.

**Applies to: azureml-api-2**
| Compute target | Used for | GPU support | Description |
| --- | --- | --- | --- |
| [Azure Machine Learning endpoints](concept-endpoints.md) | Real-time inference <br><br>Batch inference | Yes | Fully managed computes for real-time (managed online endpoints) and batch scoring (batch endpoints) on serverless compute. |
| [Azure Machine Learning Kubernetes](how-to-attach-kubernetes-anywhere.md) | Real-time inference <br><br> Batch inference | Yes | Run inference workloads on on-premises, cloud, and edge Kubernetes clusters. |

**Applies to: azureml-api-1**
| Compute target | Used for | GPU support | Description |
| --- | --- | --- | --- |
| [Local web service](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-deploy-local-container-notebook-vm.md) | Testing/debugging | &nbsp; | Use for limited testing and troubleshooting. Hardware acceleration depends on use of libraries in the local system. |
| [Azure Machine Learning Kubernetes](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-deploy-azure-kubernetes-service.md) | Real-time inference | Yes | Run inference workloads in the cloud. |
| [Azure Container Instances](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-deploy-azure-container-instance.md) | Real-time inference <br><br> Recommended for dev/test purposes only. | &nbsp; | Use for low-scale CPU-based workloads that require less than 48 GB of RAM. You don't need to manage a cluster.<br><br> Only suitable for models less than 1 GB in size.<br><br> Supported in the designer. |


> **Note:**
> When choosing a cluster SKU, first scale up and then scale out. Start with a machine that has 150% of the RAM your model requires, profile the result, and find a machine that has the performance you need. Once you learn that, increase the number of machines to fit your need for concurrent inference.

**Applies to: azureml-api-2**
[Deploy and score a machine learning model by using an online endpoint](how-to-deploy-online-endpoints.md).

**Applies to: azureml-api-1**
[Deploy machine learning models to Azure](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-deploy-and-where.md).


## Azure Machine Learning compute (managed)

Azure Machine Learning creates and manages the managed compute resources. This type of compute is optimized for machine learning workloads. Azure Machine Learning compute clusters, [serverless compute](how-to-use-serverless-compute.md), and [compute instances](concept-compute-instance.md) are the only managed computes.

You don't need to create serverless compute. You can create Azure Machine Learning compute instances or compute clusters from:

* [Azure Machine Learning studio](how-to-create-attach-compute-studio.md)
* The Python SDK and the Azure CLI:
    * [Compute instance](how-to-create-compute-instance.md)
    * [Compute cluster](how-to-create-attach-compute-cluster.md)
* An Azure Resource Manager template. For an example template, see [Create an Azure Machine Learning compute cluster](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.machinelearningservices/machine-learning-compute-create-amlcompute).


> **Note:**
> Instead of creating a compute cluster, use [serverless compute](how-to-use-serverless-compute.md) to offload compute lifecycle management to Azure Machine Learning.


When you create these compute resources, they automatically become part of your workspace, unlike other kinds of compute targets.

| Capability | Compute cluster | Compute instance |
| --- | --- | --- |
| Single-node or multinode cluster | **&check;** | Single node cluster |
| Autoscales each time you submit a job | **&check;** |  |
| Automatic cluster management and job scheduling | **&check;** | **&check;** |
| Support for both CPU and GPU resources | **&check;** | **&check;** |

> **Note:**
> To avoid charges when the compute is idle:
> * For a compute *cluster*, make sure the minimum number of nodes is set to 0, or use [serverless compute](how-to-use-serverless-compute.md).
> * For a compute *instance*, [enable idle shutdown](how-to-create-compute-instance.md#configure-idle-shutdown). While stopping the compute instance stops the billing for compute hours, you still pay for disk, public IP, and standard load balancer.

### Supported VM series and sizes


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


When you select a node size for a managed compute resource in Azure Machine Learning, you can choose from select VM sizes available in Azure. Azure offers a range of sizes for Linux and Windows for different workloads. For more information, see [VM types and sizes](https://learn.microsoft.com/azure/virtual-machines/sizes).

A few exceptions and limitations apply when you choose a VM size:

* Azure Machine Learning doesn't support some VM series.
* Some VM series, such as GPUs and other special SKUs, might not initially appear in your list of available VMs. However, you can still use them once you request a quota change. For more information about requesting quotas, see [Request quota and limit increases](how-to-manage-quotas.md#request-quota-and-limit-increases).

To learn more about supported series, see the following table.

| **Supported VM series** | **Category** | **Supported by** |
| --- | --- | --- |
| [Av2](https://learn.microsoft.com/azure/virtual-machines/av2-series) | General purpose | Compute clusters and instance |
| [DDSv4](https://learn.microsoft.com/azure/virtual-machines/ddv4-ddsv4-series#ddsv4-series) | General purpose | Compute clusters and instance |
| [Dv2](https://learn.microsoft.com/azure/virtual-machines/dv2-dsv2-series#dv2-series) | General purpose | Compute clusters and instance |
| [Dv3](https://learn.microsoft.com/azure/virtual-machines/dv3-dsv3-series#dv3-series) | General purpose | Compute clusters and instance |
| [DSv2](https://learn.microsoft.com/azure/virtual-machines/dv2-dsv2-series#dsv2-series) | General purpose | Compute clusters and instance |
| [DSv3](https://learn.microsoft.com/azure/virtual-machines/dv3-dsv3-series#dsv3-series) | General purpose | Compute clusters and instance |
| [EAv4](https://learn.microsoft.com/azure/virtual-machines/eav4-easv4-series) | Memory optimized | Compute clusters and instance |
| [Ev3](https://learn.microsoft.com/azure/virtual-machines/ev3-esv3-series) | Memory optimized | Compute clusters and instance |
| [ESv3](https://learn.microsoft.com/azure/virtual-machines/ev3-esv3-series) | Memory optimized | Compute clusters and instance |
| [FSv2](https://learn.microsoft.com/azure/virtual-machines/fsv2-series) | Compute optimized | Compute clusters and instance |
| [FX](https://learn.microsoft.com/azure/virtual-machines/fx-series) | Compute optimized | Compute clusters |
| [H](https://learn.microsoft.com/azure/virtual-machines/h-series) | High performance compute | Compute clusters and instance |
| [HB](https://learn.microsoft.com/azure/virtual-machines/hb-series) | High performance compute | Compute clusters and instance |
| [HBv2](https://learn.microsoft.com/azure/virtual-machines/hbv2-series) | High performance compute | Compute clusters and instance |
| [HBv3](https://learn.microsoft.com/azure/virtual-machines/hbv3-series) | High performance compute | Compute clusters and instance |
| [HC](https://learn.microsoft.com/azure/virtual-machines/hc-series) | High performance compute | Compute clusters and instance |
| [LSv2](https://learn.microsoft.com/azure/virtual-machines/lsv2-series) | Storage optimized | Compute clusters and instance |
| [M](https://learn.microsoft.com/azure/virtual-machines/m-series) | Memory optimized | Compute clusters and instance |
| [NC](https://learn.microsoft.com/azure/virtual-machines/nc-series) | GPU (K80) | Compute clusters and instance |
| [NC Promo](https://learn.microsoft.com/azure/virtual-machines/nc-series) | GPU (K80) | Compute clusters and instance |
| [NCv2](https://learn.microsoft.com/azure/virtual-machines/ncv2-series) | GPU (P100) | Compute clusters and instance |
| [NCv3](https://learn.microsoft.com/azure/virtual-machines/ncv3-series) | GPU (V100) | Compute clusters and instance |
| [ND](https://learn.microsoft.com/azure/virtual-machines/nd-series) | GPU (P40) | Compute clusters and instance |
| [NDv2](https://learn.microsoft.com/azure/virtual-machines/ndv2-series) | GPU (V100) | Compute clusters and instance |
| [NV](https://learn.microsoft.com/azure/virtual-machines/nv-series) | GPU (M60) | Compute clusters and instance |
| [NVv3](https://learn.microsoft.com/azure/virtual-machines/nvv3-series) | GPU (M60) | Compute clusters and instance |
| [NCasT4_v3](https://learn.microsoft.com/azure/virtual-machines/nct4-v3-series) | GPU (T4) | Compute clusters and instance |
| [NCads_A100_v4](https://learn.microsoft.com/azure/virtual-machines/sizes/gpu-accelerated/nca100v4-series) | GPU (A100) | Compute clusters and instance |
| [NDasrA100_v4](https://learn.microsoft.com/azure/virtual-machines/nda100-v4-series) | GPU (A100) | Compute clusters and instance |
| [NCads_H100_v5](https://learn.microsoft.com/azure/virtual-machines/sizes/gpu-accelerated/ncadsh100v5-series) | GPU (H100) | Compute clusters and instance |
| [ND-H100-v5](https://learn.microsoft.com/azure/virtual-machines/sizes/gpu-accelerated/ndh100v5-series) | GPU (H100) | Compute clusters and instance |
| [ND-H200-v5](https://learn.microsoft.com/azure/virtual-machines/sizes/gpu-accelerated/nd-h200-v5-series) | GPU (H200) | Compute clusters and instance |

While Azure Machine Learning supports these VM series, they might not be available in all Azure regions. To check whether VM series are available, see [Products available by region](https://azure.microsoft.com/global-infrastructure/services/?products=virtual-machines).

**Applies to: azureml-api-1**
> **Note:**
> Azure Machine Learning doesn't support all VM sizes that Azure Compute supports. To list the available VM sizes, use the following method:
> * [REST API](https://learn.microsoft.com/rest/api/azureml/virtual-machine-sizes/list)

**Applies to: azureml-api-2**
> **Note:**
> Azure Machine Learning doesn't support all VM sizes that Azure Compute supports. To list the available VM sizes supported by specific compute VM types, use one of the following methods:
> * [REST API](https://learn.microsoft.com/rest/api/azureml/virtual-machine-sizes/list)
> * The [Azure CLI extension 2.0 for machine learning](how-to-configure-cli.md) command, [az ml compute list-sizes](https://learn.microsoft.com/cli/azure/ml/compute#az-ml-compute-list-sizes).


If you use the GPU-enabled compute targets, make sure the training environment has the correct CUDA drivers installed. Use the following table to determine the correct CUDA version to use:

| **GPU Architecture** | **Azure VM series** | **Supported CUDA versions** |
| --- | --- | --- |
| Hopper | NCadsH100_v5, ND-H100-v5, ND-H200-v5 | 12.0+ |
| Ampere | NDA100_v4, NCA100_v4 | 11.0+ |
| Turing | NCT4_v3 | 10.0+ |
| Volta | NCv3, NDv2 | 9.0+ |
| Pascal | NCv2, ND | 9.0+ |
| Maxwell | NV, NVv3 | 9.0+ |
| Kepler | NC, NC Promo | 9.0+ |

In addition to ensuring the CUDA version and hardware are compatible, also ensure that the CUDA version is compatible with the version of the machine learning framework you're using:

- For PyTorch, check the compatibility by visiting [PyTorch's previous versions page](https://pytorch.org/get-started/previous-versions/).
- For TensorFlow, check the compatibility by visiting [TensorFlow's build from source page](https://www.tensorflow.org/install/source#gpu).

### Compute isolation

Azure Machine Learning compute provides VM sizes that are isolated to a specific hardware type and dedicated to a single customer. Isolated VM sizes work best for workloads that require a high degree of isolation from other customers' workloads, such as when you need to meet compliance and regulatory requirements. When you use an isolated size, your VM is the only one running on that specific server instance.

The current isolated VM offerings include:

* Standard_M128ms
* Standard_F72s_v2
* Standard_NC24s_v3
* Standard_NC24rs_v3 (RDMA capable)

For more information about isolation, see [Isolation in the Azure public cloud](https://learn.microsoft.com/azure/security/fundamentals/isolation-choices).

## Unmanaged compute

Azure Machine Learning doesn't manage an *unmanaged* compute target. You create this type of compute target outside Azure Machine Learning and then attach it to your workspace. You might need to take extra steps to maintain unmanaged compute resources or to improve performance for machine learning workloads.

Azure Machine Learning supports the following unmanaged compute types:

* Remote virtual machines
* Azure HDInsight
* Azure Databricks
* Azure Data Lake Analytics
**Applies to: azureml-api-1**
* [Azure Kubernetes Service](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-create-attach-kubernetes.md)
* [Azure Synapse Spark pool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-link-synapse-ml-workspaces.md) (deprecated)

**Applies to: azureml-api-2**
* [Kubernetes](how-to-attach-kubernetes-anywhere.md)


For more information, see [Manage compute resources](how-to-create-attach-compute-studio.md).

## Related content

**Applies to: azureml-api-2**
* [Deploy and score a machine learning model by using an online endpoint](how-to-deploy-online-endpoints.md)

**Applies to: azureml-api-1**
* [Deploy machine learning models to Azure](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/how-to-deploy-and-where.md)
