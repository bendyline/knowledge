---
title: Configure MLflow for Azure Machine Learning
titleSuffix: Azure Machine Learning
description: Find out how to connect MLflow to an Azure Machine Learning workspace to log metrics, track artifacts, and deploy models.
services: machine-learning
author: s-polly
ms.author: scottpolly
ms.reviewer: jturuk
ms.service: azure-machine-learning
ms.subservice: mlops
ms.date: 02/12/2026
ms.topic: how-to
ms.custom: mlflow, cliv2, devplatv2, dev-focus
ms.devlang: azurecli
ai-usage: ai-assisted
# customer intent: As a developer, I want to see how to configure MLflow so that I can run MLflow training routines in Azure Machine Learning.
---

# Configure MLflow for Azure Machine Learning

This article explains how to configure MLflow to connect to an Azure Machine Learning workspace for tracking, registry management, and deployment.

Azure Machine Learning workspaces are MLflow-compatible, which means they can act as MLflow servers without any extra configuration. Each workspace has an MLflow tracking URI that MLflow can use to connect to the workspace. Azure Machine Learning workspaces **are already configured to work with MLflow**, so no extra configuration is required.

However, if you work outside Azure Machine Learning, you need to configure MLflow to point to the workspace. Affected environments include your local machine, Azure Synapse Analytics, and Azure Databricks.

> **Important:**
> When you use Azure compute infrastructure, you don't need to configure the tracking URI. It's automatically configured for you. Environments that have automatic configuration include Azure Machine Learning notebooks, Jupyter notebooks that are hosted on Azure Machine Learning compute instances, and jobs that run on Azure Machine Learning compute clusters.

## Prerequisites

- Python 3.10 or later.

- The MLflow SDK `mlflow` package and the Azure Machine Learning `azureml-mlflow` plugin for MLflow. You can use the following command to install this software:

  ```bash
  pip install mlflow azureml-mlflow
  ```

  > **Tip:**
  > Instead of `mlflow`, consider using [`mlflow-skinny`](https://github.com/mlflow/mlflow/blob/master/libs/skinny/README_SKINNY.md). This package is a lightweight MLflow package without SQL storage, server, UI, or data science dependencies. It's recommended for users who primarily need MLflow tracking and logging capabilities but don't want to import the full suite of features, including deployments.

- An Azure Machine Learning workspace. To create a workspace, see [Create resources you need to get started](quickstart-create-resources.md).

- Access permissions for performing MLflow operations in your workspace. For a list of operations and required permissions, see [MLflow operations](how-to-assign-roles.md#mlflow-operations).

## Configure the MLflow tracking URI

To do remote tracking, or track experiments running outside Azure Machine Learning, configure MLflow to point to the tracking URI of your Azure Machine Learning workspace.

To connect MLflow to an Azure Machine Learning workspace, you need the tracking URI of the workspace. Each workspace has its own tracking URI that starts with the protocol `azureml://`.


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


## Configure authentication

After you set up tracking, you also need to configure the authentication method for the associated workspace.

By default, the Azure Machine Learning plugin for MLflow performs interactive authentication by opening the default browser to prompt for credentials. But the plugin also supports several other authentication mechanisms. The `azure-identity` package provides this support. This package is installed as a dependency of the `azureml-mlflow` plugin.

The authentication process tries the following methods, one after another, until one succeeds:

1. **Environment**: The process reads account information from environment variables and uses it for authentication.
1. **Managed identity**: If the application is deployed to an Azure host with a managed identity enabled, the process uses the managed identity for authentication.
1. **Azure CLI**: If you use the Azure CLI `az login` command to sign in, the process uses your credentials for authentication.
1. **Azure PowerShell**: If you use the Azure PowerShell `Connect-AzAccount` command to sign in, the process uses your credentials for authentication.
1. **Interactive browser**: The user is interactively authenticated through the default browser.


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


If you want to use a certificate instead of a secret, you can configure the following environment variables:

- Set `AZURE_CLIENT_CERTIFICATE_PATH` to the path of a file that contains the certificate and private key pair in Privacy-Enhanced Mail (PEM) or Public-Key Cryptography Standards 12 (PKCS #12) format.
- Set `AZURE_CLIENT_CERTIFICATE_PASSWORD` to the password of the certificate file, if it uses a password.

### Configure authorization and permission levels

Some [default roles](how-to-assign-roles.md#default-roles) like AzureML Data Scientist and Contributor are already configured to perform MLflow operations in an Azure Machine Learning workspace. If you use a custom role, you need the following permissions:

- **To use MLflow tracking:**
  - `Microsoft.MachineLearningServices/workspaces/experiments/*`
  - `Microsoft.MachineLearningServices/workspaces/jobs/*`

- **To use the MLflow model registry:**
  - `Microsoft.MachineLearningServices/workspaces/models/*/*`

To see how to grant access to your workspace to a service principal that you create or to your user account, see [Grant access](https://learn.microsoft.com/azure/role-based-access-control/quickstart-assign-role-user-portal#grant-access).

### Troubleshoot authentication problems

MLflow tries to authenticate to Azure Machine Learning on the first operation that interacts with the service, like `mlflow.set_experiment()` or `mlflow.start_run()`. If you experience problems or unexpected authentication prompts during the process, you can increase the logging level to get more details about the error:

```python
import logging

logging.getLogger("azure").setLevel(logging.DEBUG)
```

## Set experiment name (optional)

All MLflow runs log to the active experiment. By default, runs log to an experiment named `Default` that's automatically created. You can configure the experiment that's used for tracking.

> **Tip:**
>
> When you use the Azure Machine Learning CLI v2 to submit jobs, you can set the experiment name by using the `experiment_name` property in the YAML definition of the job. You don't have to configure it in your training script. For more information, see [YAML: display name, experiment name, description, and tags](reference-yaml-job-command.md#yaml-display-name-experiment-name-description-and-tags).


# [MLflow SDK](#tab/mlflow)

Use the MLflow [`mlflow.set_experiment()`](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.set_experiment) command to configure your experiment.
    
```python
experiment_name = "experiment_with_mlflow"
mlflow.set_experiment(experiment_name)
```

# [Environment variables](#tab/environ)

Use the MLflow `MLFLOW_EXPERIMENT_NAME` or `MLFLOW_EXPERIMENT_ID` environment variable to configure your experiment. For more information, see [Command-Line Interface](https://mlflow.org/docs/latest/cli.html) or [mlflow.start_run](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.start_run).

```bash
export MLFLOW_EXPERIMENT_NAME="experiment_with_mlflow"
```

---

## Configure support for a nonpublic Azure cloud

The Azure Machine Learning plugin for MLflow is configured by default to work with the global Azure cloud. However, you can configure the Azure cloud you're using by setting the `AZUREML_CURRENT_CLOUD` environment variable:

# [MLflow SDK](#tab/mlflow)

```python
import os

os.environ["AZUREML_CURRENT_CLOUD"] = "AzureChinaCloud"
```

# [Environment variables](#tab/environ)

```bash
export AZUREML_CURRENT_CLOUD="AzureChinaCloud"
```

---

You can identify the cloud you're using with the following Azure CLI command:

```bash
az cloud list
```

The current cloud has the value `IsActive` set to `True`.

## Related content

After you connect your environment to your workspace in Azure Machine Learning, you can start working with it.

- [Track experiments and models with MLflow](how-to-use-mlflow-cli-runs.md)
- [Manage models registry in Azure Machine Learning with MLflow](how-to-manage-models-mlflow.md)
- [Train with MLflow Projects in Azure Machine Learning (preview)](how-to-train-mlflow-projects.md)
- [Guidelines for deploying MLflow models](how-to-deploy-mlflow-models.md)
