---
title: Deploy and run MLflow models in Spark jobs
titleSuffix: Azure Machine Learning
description: Learn to deploy your MLflow model in Spark jobs to perform inference.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: core
author: s-polly
ms.author: scottpolly
ms.reviewer: fasantia
ms.date: 03/30/2026
ai-usage: ai-assisted
ms.topic: how-to
ms.custom: deploy, mlflow, devplatv2, no-code-deployment, devx-track-azurecli, cliv2
---

# Deploy and run MLflow models in Spark jobs

In this article, you learn how to deploy and run your [MLflow](https://www.mlflow.org) model in Spark jobs to perform inference over large amounts of data or as part of data wrangling jobs.


## About this example

This example shows how to deploy an MLflow model registered in Azure Machine Learning to Spark jobs running in [Azure Machine Learning serverless Spark compute](how-to-submit-spark-jobs.md), Azure Databricks, or Azure Synapse Analytics, to perform inference over large amounts of data. 

The model is based on the [UCI Heart Disease Data Set](https://archive.ics.uci.edu/ml/datasets/Heart+Disease). The database contains 76 attributes, but this example uses a subset of 14 of them. The model tries to predict the presence of heart disease in a patient. It's integer valued from 0 (no presence) to 1 (presence). The model is trained by using an `XGBBoost` classifier, and all the required preprocessing is packaged as a `scikit-learn` pipeline, making this model an end-to-end pipeline that goes from raw data to predictions.

The information in this article is based on code samples contained in the [azureml-examples](https://github.com/azure/azureml-examples) repository. To run the commands locally without having to copy and paste files, clone the repo, and then change directories to `sdk/using-mlflow/deploy`.

```azurecli
git clone https://github.com/Azure/azureml-examples --depth 1
cd sdk/python/using-mlflow/deploy
```

## Prerequisites

Before following the steps in this article, make sure you have the following prerequisites:

- Install and configure the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) and the `ml` extension to the Azure CLI. For more information, see [Install and set up the CLI (v2)](how-to-configure-cli.md).


- Install the MLflow SDK `mlflow` package and the Azure Machine Learning `azureml-mlflow` plugin for MLflow:

  ```bash
  pip install mlflow azureml-mlflow
  ```

  > **Tip:**
  > You can use the [`mlflow-skinny`](https://github.com/mlflow/mlflow/blob/master/libs/skinny/README_SKINNY.md) package, which is a lightweight MLflow package without SQL storage, server, UI, or data science dependencies. We recommend this package for users who primarily need the MLflow tracking and logging capabilities but not the full suite of features, including deployments.

- Create an Azure Machine Learning workspace. To create a workspace, see [Create resources you need to get started](quickstart-create-resources.md). Review the [access permissions](how-to-assign-roles.md#mlflow-operations) you need to perform MLflow operations in your workspace.

- To do remote tracking, or track experiments running outside Azure Machine Learning, configure MLflow to point to the tracking URI of your Azure Machine Learning workspace. For more information on how to connect MLflow to your workspace, see [Configure MLflow for Azure Machine Learning](how-to-use-mlflow-configure-tracking.md).


- You must have an MLflow model registered in your workspace. Particularly, this example registers a model trained for the [Diabetes dataset](https://www4.stat.ncsu.edu/~boos/var.select/diabetes.html).


### Connect to your workspace

First, connect to the Azure Machine Learning workspace where your model is registered.

# [Azure Machine Learning compute](#tab/aml)

Tracking is already configured for you. Your default credentials are also used when you work with MLflow.

# [Remote compute](#tab/remote)

**Configure tracking URI**


1. Get the tracking URI for your workspace:

    # [Azure CLI](#tab/cli)
    
    
**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 

    
    1. Sign in and configure your workspace:
    
        ```bash
        az account set --subscription <subscription-ID>
        az configure --defaults workspace=<workspace-name> group=<resource-group-name> location=<location> 
        ```
    
    1. Get the tracking URI by using the `az ml workspace` command:
    
        ```bash
        az ml workspace show --query mlflow_tracking_uri
        ```
        
    # [Python SDK](#tab/python)
    
    
**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)
    
    You can use the [Azure Machine Learning SDK v2 for Python](../concept-v2.md) to get the Azure Machine Learning MLflow tracking URI. Ensure that the `azure-ai-ml` library is installed in your compute instance. Then use the following code to get the unique MLFLow tracking URI that's associated with your workspace.
    
    1. Use an instance of `MLClient` to sign in to your workspace. There are two options for signing in:
    
        - The easiest way is to use the workspace configuration file:
    
          ```python
          from azure.ai.ml import MLClient
          from azure.identity import DefaultAzureCredential
    
          ml_client = MLClient.from_config(credential=DefaultAzureCredential())
          ```
    
          > [!TIP]
          >
          > You can download the workspace configuration file by taking the following steps:
          >
          > 1. In the Azure portal, go to your workspace.
          > 1. On the workspace page, select **Download config.json**.
          > 1. Move the config.json file to the directory that you're working in.
    
       - Alternatively, you can use your subscription ID, resource group name, and workspace name to sign in:
    
          ```python
          from azure.ai.ml import MLClient
          from azure.identity import DefaultAzureCredential
    
          # Enter information about your Azure Machine Learning workspace.
          subscription_id = "<subscription-ID>"
          resource_group = "<resource-group-name>"
          workspace_name = "<workspace-name>"
    
          ml_client = MLClient(credential=DefaultAzureCredential(),
                                  subscription_id=subscription_id, 
                                  resource_group_name=resource_group,
                                  workspace_name=workspace_name)
          ```
    
          > [!IMPORTANT]
          > The `DefaultAzureCredential` method tries to pull credentials from the available context. But you might want to specify credentials in a different way, for instance by using the web browser in an interactive way. In these cases, you can use `InteractiveBrowserCredential` or any other method available in the [`azure.identity`](https://pypi.org/project/azure-identity/) package.
    
    1. Get the Azure Machine Learning tracking URI:
    
        ```python
        mlflow_tracking_uri = ml_client.workspaces.get(ml_client.workspace_name).mlflow_tracking_uri
        ```
    
    # [Azure portal](#tab/studio)
    
    Use the Azure portal to get the tracking URI:
    
    1. In the Azure portal, go to the workspace.

    1. In the upper right corner, select the name of your workspace.

    1. Under __Essentials__, copy the __MLflow tracking URI__ value.    
    
    # [Manually](#tab/manual)
    
    You can construct the Azure Machine Learning tracking URI manually. You need your subscription ID, the region your workspace is deployed in, your resource group name, and your workspace name. To get the URI, enter those values into the following code:
    
    > [!WARNING]
    > If you use a private link-enabled workspace, the MLflow endpoint also uses a private link to communicate with Azure Machine Learning. As a result, the tracking URI uses a format that's different from the one in this article. In this case, you need to use the Azure Machine Learning SDK for Python or the Azure Machine Learning CLI v2 to get the tracking URI.
    
    ```python
    region = "<region>"
    subscription_id = "<subscription-ID>"
    resource_group = "<resource-group-name>"
    workspace_name = "<workspace-name>"
    
    mlflow_tracking_uri = f"azureml://{region}.api.azureml.ms/mlflow/v1.0/subscriptions/{subscription_id}/resourceGroups/{resource_group}/providers/Microsoft.MachineLearningServices/workspaces/{workspace_name}"
    ```

    ---

1. Configure the tracking URI:

    # [MLflow SDK](#tab/mlflow)
    
    Use the [`set_tracking_uri()`](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.set_tracking_uri) method to set the MLflow tracking URI to the tracking URI of your workspace.
    
    ```python
    import mlflow
    
    mlflow.set_tracking_uri(mlflow_tracking_uri)
    ```
    
    # [Environment variables](#tab/environ)
    
    In your compute instance, use the following code to set the `MLFLOW_TRACKING_URI` MLflow environment variable to the tracking URI of your workspace. This assignment makes all interactions with MLflow in that compute instance point to Azure Machine Learning by default. For more information, see [Logging functions](https://mlflow.org/docs/latest/tracking/tracking-api.html#logging-functions).
    
    ```bash
    MLFLOW_TRACKING_URI=$(az ml workspace show --query mlflow_tracking_uri | sed 's/"//g') 
    ```

    ---

    > **Tip:**
    >
    > Some scenarios involve working in a shared environment like an Azure Databricks cluster or an Azure Synapse Analytics cluster. In these cases, it's useful to set the `MLFLOW_TRACKING_URI` environment variable at the cluster level rather than for each session. Setting the variable at the cluster level automatically configures the MLflow tracking URI to point to Azure Machine Learning for all sessions in the cluster.


**Configure authentication**

After you configure tracking, configure how authentication happens to the associated workspace. By default, the Azure Machine Learning plugin for MLflow performs interactive authentication by opening the default browser to prompt for credentials. For more ways to configure authentication for MLflow in Azure Machine Learning workspaces, see [Configure MLflow for Azure Machine Learning: Configure authentication](how-to-use-mlflow-configure-tracking.md#configure-authentication).


For interactive jobs where there's a user connected to the session, you can rely on interactive authentication. No further action is required.

> **Warning:**
> *Interactive browser* authentication blocks code execution when it prompts for credentials. This approach isn't suitable for authentication in unattended environments like training jobs. We recommend that you configure a different authentication mode in those environments.

For scenarios that require unattended execution, you need to configure a service principal to communicate with Azure Machine Learning. For information about creating a service principal, see [Configure a service principal](how-to-setup-authentication.md#configure-a-service-principal).

Use the tenant ID, client ID, and client secret of your service principal in the following code:

# [MLflow SDK](#tab/mlflow)

```python
import os

os.environ["AZURE_TENANT_ID"] = "<Azure-tenant-ID>"
os.environ["AZURE_CLIENT_ID"] = "<Azure-client-ID>"
os.environ["AZURE_CLIENT_SECRET"] = "<Azure-client-secret>"
```

# [Environment variables](#tab/environ)

```bash
export AZURE_TENANT_ID="<Azure-tenant-ID>"
export AZURE_CLIENT_ID="<Azure-client-ID>"
export AZURE_CLIENT_SECRET="<Azure-client-secret>"
```

---

> **Tip:**
> When you work in shared environments, we recommend that you configure these environment variables at the compute level. As a best practice, manage them as secrets in an instance of Azure Key Vault.
>
> For instance, in an Azure Databricks cluster configuration, you can use secrets in environment variables in the following way: `AZURE_CLIENT_SECRET={{secrets/<scope-name>/<secret-name>}}`. For more information about implementing this approach in Azure Databricks, see [Reference a secret in an environment variable](https://learn.microsoft.com/azure/databricks/security/secrets/secrets-spark-conf-env-var), or refer to documentation for your platform.


---

### Register the model

To perform inference, you need a model registered in the Azure Machine Learning registry. In this case, you already have a local copy of the model in the repository, so you only need to publish the model to the registry in the workspace. If the model you want to deploy is already registered, you can skip this step.
   
```python
model_name = 'heart-classifier'
model_local_path = "model"

registered_model = mlflow_client.create_model_version(
    name=model_name, source=f"file://{model_local_path}"
)
version = registered_model.version
```

Alternatively, if you logged your model inside a run, you can register it directly.

> **Tip:**
> To register the model, you need to know the location where the model is stored. If you're using the `autolog` feature of MLflow, the path depends on the type and framework of the model you're using. Check the job's output to identify the name of this folder. Look for the folder that contains a file named `MLModel`. If you're logging your models manually by using `log_model`, the path is the argument you pass to this method. For example, if you log the model by using `mlflow.sklearn.log_model(my_model, "classifier")`, the path where the model is stored is `classifier`.

```python
model_name = 'heart-classifier'

registered_model = mlflow_client.create_model_version(
    name=model_name, source=f"runs:/{RUN_ID}/{MODEL_PATH}"
)
version = registered_model.version
```

> **Note:**
> The path `MODEL_PATH` is the location where the model is stored in the run.

---

### Get input data to score

You need some input data to run your jobs on. In this example, you download sample data from the internet and place it in a shared storage used by the Spark cluster.

```python
import urllib

urllib.request.urlretrieve("https://azuremlexampledata.blob.core.windows.net/data/heart-disease-uci/data/heart.csv", "/tmp/data")
```

Move the data to a mounted storage account available to the entire cluster.

```python
dbutils.fs.mv("file:/tmp/data", "dbfs:/")
```

> **Important:**
> The previous code uses `dbutils`, which is a tool available in Azure Databricks cluster. Use the appropriate tool depending on the platform you're using.

The input data is then placed in the following folder:

```python
input_data_path = "dbfs:/data"
```

## Run the model in Spark clusters

The following section explains how to run MLflow models registered in Azure Machine Learning in Spark jobs.

1. Ensure the cluster has the following libraries installed:

    [Code reference unavailable in this source snapshot: ~/azureml-examples-main/sdk/python/using-mlflow/deploy/model/conda.yaml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-deploy-mlflow-model-spark-jobs.md)

1. Use a notebook to demonstrate how to create a scoring routine with an MLflow model registered in Azure Machine Learning. Create a notebook and use PySpark as the default language.

1. Import the required namespaces:

    ```python
    import mlflow
    import pyspark.sql.functions as f
    ```  

1. Configure the model URI. The following URI brings a model named `heart-classifier` at version 1. You can also reference a model by alias, for example `models:/heart-classifier@champion`.

    ```python
    model_uri = "models:/heart-classifier/1"
    ```

1. Load the model as a UDF function. A user-defined function (UDF) is a function you define, which allows you to reuse custom logic in your environment.

    ```python
    predict_function = mlflow.pyfunc.spark_udf(spark, model_uri, result_type='double') 
    ```

    > **Tip:**
    > Use the argument `result_type` to control the type returned by the `predict()` function.

1. Read the data you want to score:

    ```python
    df = spark.read.option("header", "true").option("inferSchema", "true").csv(input_data_path).drop("target")
    ```

    In this case, the input data is in `CSV` format and placed in the folder `dbfs:/data/`. You're also dropping the column `target` as this dataset contains the target variable to predict. In production scenarios, your data doesn't have this column.

1. Run the function `predict_function` and place the predictions in a new column. In this case, you're placing the predictions in the column `predictions`.

    ```python
    scored_data = df.withColumn("predictions", predict_function(*df.columns))
    ```

    > **Tip:**
    > The `predict_function` receives as arguments the columns required. In this case, the model expects all the columns of the data frame, so use `df.columns`. If your model requires a subset of the columns, introduce them manually. If your model has a signature, types need to be compatible between inputs and expected types.

1. You can write your predictions back to storage:

    ```python
    scored_data_path = "dbfs:/scored-data"
    scored_data.write.csv(scored_data_path)
    ```

## Run the model in a standalone Spark job in Azure Machine Learning

 Azure Machine Learning supports creation of a standalone Spark job, and creation of a reusable Spark component that you can use in [Azure Machine Learning pipelines](concept-ml-pipelines.md). In this example, you deploy a scoring job that runs in Azure Machine Learning standalone Spark job and runs an MLflow model to perform inference.

> **Note:**
> To learn more about Spark jobs in Azure Machine Learning, see [Submit Spark jobs in Azure Machine Learning](how-to-submit-spark-jobs.md).

1. A Spark job requires a Python script that takes arguments. Create a scoring script:

    __score.py__

    ```python
    import argparse
    import mlflow
    from pyspark.sql import SparkSession
    
    spark = SparkSession.builder.getOrCreate()
    
    parser = argparse.ArgumentParser()
    parser.add_argument("--model")
    parser.add_argument("--input_data")
    parser.add_argument("--scored_data")
    
    args = parser.parse_args()
    print(args.model)
    print(args.input_data)
    
    # Load the model as an UDF function
    predict_function = mlflow.pyfunc.spark_udf(spark, args.model, env_manager="conda")
    
    # Read the data you want to score
    df = spark.read.option("header", "true").option("inferSchema", "true").csv(args.input_data).drop("target")
    
    # Run the function `predict_function` and place the predictions on a new column
    scored_data = df.withColumn("predictions", predict_function(*df.columns))
    
    # Save the predictions
    scored_data.write.csv(args.scored_data)
    ```
    
    The preceding script takes three arguments: `--model`, `--input_data`, and `--scored_data`. The first two arguments are inputs and represent the model you want to run and the input data. The last argument is an output and it's the output folder where predictions are placed.

    > **Tip:**
    > **Installation of Python packages:** The previous scoring script loads the MLflow model into a UDF function, but it indicates the parameter `env_manager="conda"`. When you set this parameter, MLflow restores the required packages as specified in the model definition in an isolated environment where only the UDF function runs. For more information, see [`mlflow.pyfunc.spark_udf`](https://mlflow.org/docs/latest/python_api/mlflow.pyfunc.html?highlight=env_manager#mlflow.pyfunc.spark_udf) documentation.

1. Create a job definition:

    __mlflow-score-spark-job.yml__

    ```yml
    $schema: http://azureml/sdk-2-0/SparkJob.json
    type: spark
    
    code: ./src
    entry:
      file: score.py
    
    conf:
      spark.driver.cores: 1
      spark.driver.memory: 2g
      spark.executor.cores: 2
      spark.executor.memory: 2g
      spark.executor.instances: 2
    
    inputs:
      model:
        type: mlflow_model
        path: azureml:heart-classifier@latest
      input_data:
        type: uri_file
        path: https://azuremlexampledata.blob.core.windows.net/data/heart-disease-uci/data/heart.csv
        mode: direct
    
    outputs:
      scored_data:
        type: uri_folder
    
    args: >-
      --model ${{inputs.model}}
      --input_data ${{inputs.input_data}}
      --scored_data ${{outputs.scored_data}}
    
    identity:
      type: user_identity
    
    resources:
      instance_type: standard_e4s_v3
      runtime_version: "3.4"
    ```

    > **Tip:**
    > To use an attached Synapse Spark pool, define the `compute` property in the sample YAML specification file shown earlier instead of the `resources` property.

1. Use the `az ml job create` command with the `--file` parameter to create a standalone Spark job. The following command shows an example:

    ```azurecli
    az ml job create -f mlflow-score-spark-job.yml
    ```

## Next steps

- [Deploy MLflow models to batch endpoints](how-to-mlflow-batch.md)
- [Deploy MLflow models to online endpoint](how-to-deploy-mlflow-models-online-endpoints.md)
- [Using MLflow models for no-code deployment](how-to-log-mlflow-models.md)
