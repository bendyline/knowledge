---
title: MLflow Tracking for Azure Synapse Analytics experiments
titleSuffix: Azure Machine Learning
description:  Set up MLflow with Azure Machine Learning to log metrics and artifacts from Azure Synapse Analytics workspace.
services: machine-learning
author: s-polly
ms.author: scottpolly
ms.service: azure-machine-learning
ms.subservice: core
ms.reviewer: fasantia
ms.date: 03/26/2026
ms.topic: how-to
ms.custom: sdkv2, dev-focus
ai-usage: ai-assisted
---

# Track Azure Synapse Analytics ML experiments with MLflow and Azure Machine Learning

In this article, you learn how to enable MLflow to connect to Azure Machine Learning while working in an Azure Synapse Analytics workspace. Use this configuration for tracking, model management, and model deployment.

[MLflow](https://www.mlflow.org) is an open-source library for managing the life cycle of your machine learning experiments. MLflow Tracking is a component of MLflow that logs and tracks your training run metrics and model artifacts. For more information, see [MLflow](concept-mlflow.md).

> **Warning:**
> Support for MLflow Projects in Azure Machine Learning is retiring in September 2026. For code-based training jobs, use [Azure Machine Learning Jobs](how-to-use-mlflow-cli-runs.md) with MLflow tracking instead.

## Prerequisites

* Python 3.10 or later installed in your Azure Synapse Analytics environment.
* An [Azure Synapse Analytics workspace and cluster](https://learn.microsoft.com/azure/synapse-analytics/quickstart-create-workspace).
* An [Azure Machine Learning Workspace](quickstart-create-resources.md).

## Install libraries

To install libraries on your dedicated cluster in Azure Synapse Analytics, follow these steps:

1. Create a `requirements.txt` file with the packages your experiments require, including the following packages:

    __requirements.txt__

    ```pip
    mlflow
    azureml-mlflow
    azure-ai-ml
    ```

    > **Tip:**
    > Use [`mlflow-skinny`](https://github.com/mlflow/mlflow/blob/master/libs/skinny/README_SKINNY.md) instead of `mlflow`. It's a lightweight package without SQL storage, the server UI, or full data science dependencies. If you primarily need tracking and logging, use `mlflow-skinny`.

1. Go to the Azure Synapse Analytics workspace portal.

1. Go to the **Manage** tab and select **Apache Spark Pools**.

1. Select the **...** (ellipsis) next to the cluster name, and then select **Packages**.

    install mlflow packages in Azure Synapse Analytics

1. In the **Requirements files** section, select **Upload**.

1. Upload the `requirements.txt` file.

1. Wait for your cluster to restart.

## Track experiments with MLflow

You can configure Azure Synapse Analytics to track experiments by using MLflow to Azure Machine Learning workspace. Azure Machine Learning provides a centralized repository to manage the entire lifecycle of experiments, models, and deployments. It also has the advantage of enabling easier path to deployment by using Azure Machine Learning deployment options.

### Configuring your notebooks to use MLflow connected to Azure Machine Learning

To use Azure Machine Learning as your centralized repository for experiments, you can use MLflow. On each notebook you're working on, configure the tracking URI to point to the workspace you're using. The following example shows how it can be done:

__Configure tracking URI__


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


__Configure authentication__

Once the tracking is configured, you'll also need to configure how the authentication needs to happen to the associated workspace. By default, the Azure Machine Learning plugin for MLflow will perform interactive authentication by opening the default browser to prompt for credentials. Refer to [Configure MLflow for Azure Machine Learning: Configure authentication](how-to-use-mlflow-configure-tracking.md#configure-authentication) to additional ways to configure authentication for MLflow in Azure Machine Learning workspaces.


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


### Experiment's names in Azure Machine Learning

By default, Azure Machine Learning tracks runs in a default experiment called `Default`. It is usually a good idea to set the experiment you will be going to work on. Use the following syntax to set the experiment's name:

```python
mlflow.set_experiment(experiment_name="experiment-name")
```

### Tracking parameters, metrics and artifacts

You can use then MLflow in Azure Synapse Analytics in the same way as you're used to. For details see [Log & view metrics and log files](how-to-log-view-metrics.md).

## Registering models in the registry with MLflow

Models can be registered in Azure Machine Learning workspace, which offers a centralized repository to manage their lifecycle. The following example logs a model trained with Spark MLLib and also registers it in the registry.

```python
mlflow.spark.log_model(model, 
                       artifact_path = "model", 
                       registered_model_name = "model_name")  
```

* **If a registered model with the name doesn't exist**, the method registers a new model, creates version 1, and returns a ModelVersion MLflow object. 

* **If a registered model with the name already exists**, the method creates a new model version and returns the version object. 

You can manage models registered in Azure Machine Learning using MLflow. View [Manage models registries in Azure Machine Learning with MLflow](how-to-manage-models-mlflow.md) for more details.

## Deploying and consuming models registered in Azure Machine Learning

Models registered in Azure Machine Learning Service using MLflow can be consumed as:

* An Azure Machine Learning online endpoint (real-time) or batch endpoint: This deployment uses Azure Machine Learning managed inferencing. See [Deploy MLflow models to online endpoints](how-to-deploy-mlflow-models-online-endpoints.md) for details.

* MLflow model objects or Pandas UDFs, which can be used in Azure Synapse Analytics notebooks in streaming or batch pipelines.

### Deploy models to Azure Machine Learning endpoints

You can use the `azureml-mlflow` plugin to deploy a model to your Azure Machine Learning workspace. See [How to deploy MLflow models](how-to-deploy-mlflow-models.md) for complete details about deploying models to different targets.

> **Important:**
> Models need to be registered in Azure Machine Learning registry in order to deploy them. Deployment of unregistered models is not supported in Azure Machine Learning.

### Deploy models for batch scoring using UDFs

You can choose Azure Synapse Analytics clusters for batch scoring. The MLflow model is loaded and used as a Spark Pandas UDF to score new data.

```python
from pyspark.sql.types import ArrayType, FloatType

# Replace model_path with the relative path to your model artifact (for example, "model")
model_uri = f"runs:/{last_run_id}/{model_path}"

# Create a Spark UDF for the MLflow model
pyfunc_udf = mlflow.pyfunc.spark_udf(spark, model_uri)

# Load scoring data into Spark DataFrame
# Replace table_name and required_conditions with your values
scoreDf = spark.table(table_name).where(required_conditions)

# Make prediction
preds = (scoreDf
           .withColumn('target_column_name', pyfunc_udf('Input_column1', 'Input_column2', 'Input_column3'))
        )

display(preds)
```

## Clean up resources

If you wish to keep your Azure Synapse Analytics workspace, but no longer need the Azure Machine Learning workspace, you can delete the Azure Machine Learning workspace. If you don't plan to use the logged metrics and artifacts in your workspace, the ability to delete them individually is unavailable at this time. Instead, delete the resource group that contains the storage account and workspace, so you don't incur any charges:

1. In the Azure portal, select **Resource groups** on the far left.

   Delete in the Azure portal

1. From the list, select the resource group you created.

1. Select **Delete resource group**.

1. Enter the resource group name. Then select **Delete**.


## Next steps
* [Track experiment runs with MLflow and Azure Machine Learning](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-use-mlflow.md). 
* [Deploy MLflow models in Azure Machine Learning](how-to-deploy-mlflow-models.md). 
* [Manage your models with MLflow](how-to-manage-models-mlflow.md).
