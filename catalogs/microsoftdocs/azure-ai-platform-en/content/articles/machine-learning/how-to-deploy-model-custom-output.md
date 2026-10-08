---
title: "Customize outputs in batch deployments"
titleSuffix: Azure Machine Learning
description: Learn how create deployments that generate custom outputs and files.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: inferencing
ms.topic: how-to
author: s-polly
ms.author: scottpolly
ms.date: 03/18/2024
ms.reviewer: jturuk
ms.custom: devplatv2, update-code4
---

# Customize outputs in batch deployments


**APPLIES TO:**



This guide explains how to create deployments that generate custom outputs and files. Sometimes you need more control over what's written as output from batch inference jobs. These cases include the following situations:

> 
> * You need to control how predictions are written in the output. For instance, you want to append the prediction to the original data if the data is tabular.
> * You need to write your predictions in a different file format than the one supported out-of-the-box by batch deployments.
> * Your model is a generative model that can't write the output in a tabular format. For instance, models that produce images as outputs.
> * Your model produces multiple tabular files instead of a single one. For example, models that perform forecasting by considering multiple scenarios.

Batch deployments allow you to take control of the output of the jobs by letting you write directly to the output of the batch deployment job. In this tutorial, you learn how to deploy a model to perform batch inference and write the outputs in *parquet* format by appending the predictions to the original input data.

## About this sample

This example shows how you can deploy a model to perform batch inference and customize how your predictions are written in the output. The model is based on the [UCI Heart Disease dataset](https://archive.ics.uci.edu/ml/datasets/Heart+Disease). The database contains 76 attributes, but this example uses a subset of 14 of them. The model tries to predict the presence of heart disease in a patient. It's integer valued from 0 (no presence) to 1 (presence).

The model was trained using an `XGBBoost` classifier and all the required preprocessing was packaged as a `scikit-learn` pipeline, making this model an end-to-end pipeline that goes from raw data to predictions.


The example in this article is based on code samples contained in the [azureml-examples](https://github.com/azure/azureml-examples) repository. To run the commands locally without having to copy or paste YAML and other files, use the following commands to clone the repository and go to the folder for your coding language:

# [Azure CLI](#tab/cli)

```azurecli
git clone https://github.com/Azure/azureml-examples --depth 1
cd azureml-examples/cli
```

# [Python](#tab/python)

```azurecli
git clone https://github.com/Azure/azureml-examples --depth 1
cd azureml-examples/sdk/python
```
---

The files for this example are in:

```azurecli
cd endpoints/batch/deploy-models/custom-outputs-parquet
```

### Follow along in a Jupyter notebook

There's a Jupyter notebook that you can use to follow this example. In the cloned repository, open the notebook called [custom-output-batch.ipynb](https://github.com/Azure/azureml-examples/blob/main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb).

## Prerequisites


- An Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An Azure Machine Learning workspace. To create a workspace, see [Manage Azure Machine Learning workspaces](how-to-manage-workspace.md).
- The following permissions in the Azure Machine Learning workspace:
  - For creating or managing batch endpoints and deployments: Use an Owner, Contributor, or custom role that has the `Microsoft.MachineLearningServices/workspaces/batchEndpoints/*` permissions.
  - For creating Azure Resource Manager deployments in the workspace resource group: Use an Owner, Contributor, or custom role that has the `Microsoft.Resources/deployments/write` permission in the resource group where the workspace is deployed.
- The Azure Machine Learning CLI or the Azure Machine Learning SDK for Python:

  # [Azure CLI](#tab/cli)

  Run the following command to install the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) and the `ml` [extension for Azure Machine Learning](how-to-configure-cli.md):

  ```azurecli
  az extension add -n ml
  ```

  Pipeline component deployments for batch endpoints require version 2.7 or later of the `ml` extension for the Azure CLI (current version: 2.37.0). Use the `az extension update --name ml` command to get the latest version.

  # [Python](#tab/python)

  Run the following command to install the [Azure Machine Learning SDK for Python](https://aka.ms/sdk-v2-install):

  ```python
  pip install azure-ai-ml
  ```

  The `ModelBatchDeployment` and `PipelineComponentBatchDeployment` classes require version 1.7.0 or later of the SDK (current version: 1.32.0). Use the `pip install -U azure-ai-ml` command to get the latest version.

  ---

### Connect to your workspace

The workspace is the top-level resource for Azure Machine Learning. It provides a centralized place to work with all artifacts you create when you use Azure Machine Learning. In this section, you connect to the workspace where you perform your deployment tasks.

# [Azure CLI](#tab/cli)

In the following command, enter your subscription ID, workspace name, resource group name, and location:

```azurecli
az account set --subscription <subscription>
az configure --defaults workspace=<workspace> group=<resource-group> location=<location>
```

# [Python](#tab/python)

1. Import the required libraries:

   ```python
   from azure.ai.ml import MLClient, Input, load_component
   from azure.ai.ml.entities import BatchEndpoint, ModelBatchDeployment, ModelBatchDeploymentSettings, PipelineComponentBatchDeployment, Model, AmlCompute, Data, BatchRetrySettings, CodeConfiguration, Environment, Data
   from azure.ai.ml.constants import AssetTypes, BatchDeploymentOutputAction
   from azure.ai.ml.dsl import pipeline
   from azure.identity import DefaultAzureCredential
   ```

1. Configure the workspace details and get a handle to the workspace:

   In the following command, enter your subscription ID, resource group name, and workspace name:

   ```python
   subscription_id = "<subscription>"
   resource_group = "<resource-group>"
   workspace = "<workspace>"
   
   ml_client = MLClient(DefaultAzureCredential(), subscription_id, resource_group, workspace)
   ```

---


## Create a batch deployment with a custom output

In this example, you create a deployment that can write directly to the output folder of the batch deployment job. The deployment uses this feature to write custom parquet files.

### Register the model

You can only deploy registered models using a batch endpoint. In this case, you already have a local copy of the model in the repository, so you only need to publish the model to the registry in the workspace. You can skip this step if the model you're trying to deploy is already registered.

# [Azure CLI](#tab/cli)

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/custom-outputs-parquet/deploy-and-run.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-model-custom-output.md)

# [Python](#tab/python)

[!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=register_model)]

---

### Create a scoring script

You need to create a scoring script that can read the input data provided by the batch deployment and return the scores of the model. You're also going to write directly to the output folder of the job. In summary, the proposed scoring script does as follows:

1. Reads the input data as CSV files.
2. Runs an MLflow model `predict` function over the input data.
3. Appends the predictions to a `pandas.DataFrame` along with the input data.
4. Writes the data in a file named as the input file, but in `parquet` format.

__code/batch_driver.py__

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/custom-outputs-parquet/code/batch_driver.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-model-custom-output.md)

__Remarks:__
* Notice how the environment variable `AZUREML_BI_OUTPUT_PATH` is used to get access to the output path of the deployment job. 
* The `init()` function populates a global variable called `output_path` that can be used later to know where to write.
* The `run` method returns a list of the processed files. It's required for the `run` function to return a `list` or a `pandas.DataFrame` object.

> **Warning:**
> Take into account that all the batch executors have write access to this path at the same time. This means that you need to account for concurrency. In this case, ensure that each executor writes its own file by using the input file name as the name of the output folder.

## Create the endpoint

You now create a batch endpoint named `heart-classifier-batch` where the model is deployed.

1. Decide on the name of the endpoint. The name of the endpoint appears in the URI associated with your endpoint, so *batch endpoint names need to be unique within an Azure region*. For example, there can be only one batch endpoint with the name `mybatchendpoint` in `westus2`.

    # [Azure CLI](#tab/cli)
    
    In this case, place the name of the endpoint in a variable so you can easily reference it later.
    
    [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/custom-outputs-parquet/deploy-and-run.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-model-custom-output.md)
    
    # [Python](#tab/python)
    
    In this case, place the name of the endpoint in a variable so you can easily reference it later.

    [!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=name_endpoint)]

1. Configure your batch endpoint.

    # [Azure CLI](#tab/cli)

    The following YAML file defines a batch endpoint:
    
    __endpoint.yml__

    [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/custom-outputs-parquet/endpoint.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-model-custom-output.md)
    
    # [Python](#tab/python)
    
    [!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=configure_endpoint)]
    
1. Create the endpoint:

   # [Azure CLI](#tab/cli)

   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/custom-outputs-parquet/deploy-and-run.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-model-custom-output.md)

   # [Python](#tab/python)

   [!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=create_endpoint)]

### Create the deployment

Follow the next steps to create a deployment using the previous scoring script:

1. First, create an environment where the scoring script can be executed:

   # [Azure CLI](#tab/cli)
   
   No extra step is required for the Azure Machine Learning CLI. The environment definition is included in the deployment file.
   
   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/custom-outputs-parquet/deployment.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-model-custom-output.md)
   
   # [Python](#tab/python)
   
   Get a reference to the environment:
   
   [!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=configure_environment)]

2. Create the deployment. Notice that `output_action` is now set to `SUMMARY_ONLY`.

   > **Note:**
   > This example assumes you have a compute cluster with name `batch-cluster`. Change that name accordingly.

   # [Azure CLI](#tab/cli)
   
   To create a new deployment under the created endpoint, create a YAML configuration like the following. You can check the [full batch endpoint YAML schema](reference-yaml-endpoint-batch.md) for extra properties.
   
   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/custom-outputs-parquet/deployment.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-model-custom-output.md)
   
   Then, create the deployment with the following command:
   
   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/custom-outputs-parquet/deploy-and-run.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-model-custom-output.md)
   
   # [Python](#tab/python)
   
   To create a new deployment under the created endpoint, use the following script:
   
   [!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=configure_deployment)]
   
   Then, create the deployment with the following command:
   
   [!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=create_deployment)]
   
3. At this point, our batch endpoint is ready to be used. 

## Test the deployment

To test your endpoint, use a sample of unlabeled data located in this repository, which can be used with the model. Batch endpoints can only process data that's located in the cloud and is accessible from the Azure Machine Learning workspace. In this example, you upload it to an Azure Machine Learning data store. You're going to create a data asset that can be used to invoke the endpoint for scoring. However, notice that batch endpoints accept data that can be placed in multiple type of locations.

1. Invoke the endpoint with data from a storage account:

   # [Azure CLI](#tab/cli)
   
   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/custom-outputs-parquet/deploy-and-run.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-model-custom-output.md)
   
   > **Note:**
   > The utility `jq` might not be installed on every installation. You can [get instructions](https://jqlang.github.io/jq/download) on GitHub.
   
   # [Python](#tab/python)

   > **Tip:**
   > 
__What's the difference between the `inputs` and `input` parameter when you invoke an endpoint?__

In general, you can use a dictionary `inputs = {}` parameter with the `invoke` method to provide an arbitrary number of required inputs to a batch endpoint that contains a _model deployment_ or a _pipeline deployment_.

For a _model deployment_, you can use the `input` parameter as a shorter way to specify the input data location for the deployment. This approach works because a model deployment always takes only one [data input](how-to-access-data-batch-endpoints-jobs.md#explore-data-inputs).


   Configure the inputs:

   [!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=configure_inputs)]

   Create a job:
   
   [!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=start_batch_scoring_job)]
   
1. A batch job is started as soon as the command returns. You can monitor the status of the job until it finishes:

   # [Azure CLI](#tab/cli)
   
   [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/custom-outputs-parquet/deploy-and-run.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-model-custom-output.md)
   
   # [Python](#tab/python)
   
   [!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=get_job)]
   
## Analyze the outputs

The job generates a named output called `score` where all the generated files are placed. Since you wrote into the directory directly, one file per each input file, then you can expect to have the same number of files. In this particular example, name the output files the same as the inputs, but they have a parquet extension.

> **Note:**
> Notice that a file *predictions.csv* is also included in the output folder. This file contains the summary of the processed files.

You can download the results of the job by using the job name:

# [Azure CLI](#tab/cli)

To download the predictions, use the following command:

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/custom-outputs-parquet/deploy-and-run.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-model-custom-output.md)

# [Python](#tab/python)

[!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=download_outputs)]

---

Once the file is downloaded, you can open it using your favorite tool. The following example loads the predictions using `Pandas` dataframe.

[!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=read_outputs)]

The output looks as follows:

| age | sex | ... | thal | prediction |
| --- | --- | --- | --- | --- |
| 63 | 1 | ... | fixed | 0 |
| 67 | 1 | ... | normal | 1 |
| 67 | 1 | ... | reversible | 0 |
| 37 | 1 | ... | normal | 0 |

## Clean up resources

# [Azure CLI](#tab/cli)

Run the following code to delete the batch endpoint and all the underlying deployments. Batch scoring jobs aren't deleted.

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/custom-outputs-parquet/deploy-and-run.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-model-custom-output.md)

# [Python](#tab/python)

Run the following code to delete the batch endpoint and all the underlying deployments. Batch scoring jobs aren't deleted.

[!notebook-python[] (~/azureml-examples-main/sdk/python/endpoints/batch/deploy-models/custom-outputs-parquet/custom-output-batch.ipynb?name=delete_endpoint)]

---

## Related content

* [Image processing with batch model deployments](how-to-image-processing-batch.md)
* [Deploy language models in batch endpoints](how-to-nlp-processing-batch.md)
