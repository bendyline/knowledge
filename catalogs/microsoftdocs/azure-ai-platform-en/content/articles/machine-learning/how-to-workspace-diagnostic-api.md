---
title: How to use workspace diagnostics
titleSuffix: Azure Machine Learning
description: Learn how to use Azure Machine Learning workspace diagnostics in the Azure portal or with the Python SDK.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: enterprise-readiness
ms.author: scottpolly
author: s-polly
ms.reviewer: shshubhe
ms.date: 06/05/2026
ms.topic: how-to
ms.custom: sdkv2, devx-track-python, dev-focus
ai-usage: ai-assisted
monikerRange: 'azureml-api-2 || azureml-api-1'
---

# How to use workspace diagnostics

**Applies to: azureml-api-2**

**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

**Applies to: azureml-api-1**

**APPLIES TO:**  [Azure Machine Learning SDK v1 for Python](https://learn.microsoft.com/python/api/overview/azure/ml/?view=azure-ml-py\&preserve-view=true)



> **Important:**
> This article provides information on using the Azure Machine Learning SDK v1. SDK v1 is deprecated as of March 31, 2025. Support for it will end on June 30, 2026. You can install and use SDK v1 until that date. Your existing workflows using SDK v1 will continue to operate after the end-of-support date. However, they could be exposed to security risks or breaking changes in the event of architectural changes in the product.
>
> We recommend that you transition to the SDK v2 before June 30, 2026. For more information on SDK v2, see [What is Azure Machine Learning CLI and Python SDK v2?](https://learn.microsoft.com/azure/machine-learning/concept-v2) and the [SDK v2 reference](https://learn.microsoft.com/python/api/overview/azure/ai-ml-readme).


Azure Machine Learning provides a diagnostic API that can be used to identify problems with your workspace. Errors returned in the diagnostics report include information on how to resolve the problem.

You can use the workspace diagnostics from the Azure Machine Learning studio or Python SDK.

## Prerequisites

**Applies to: azureml-api-2**

* An Azure Machine Learning workspace. For steps for creating a workspace, see [Create the workspace](quickstart-create-resources.md#create-the-workspace).

* The Azure Machine Learning SDK for Python v2. To install the SDK, use the following command:

    ```bash
    pip install azure-ai-ml azure-identity
    ```

    To update an existing installation of the SDK to the latest version, use the following command:

    ```bash
    pip install --upgrade azure-ai-ml azure-identity
    ```

    For more information, see [Azure Machine Learning Package client library for Python](https://learn.microsoft.com/python/api/overview/azure/ai-ml-readme).

**Applies to: azureml-api-1**
* An Azure Machine Learning workspace. If you don't have one, see [Create a workspace](quickstart-create-resources.md).
* The [Azure Machine Learning SDK v1 for Python](https://learn.microsoft.com/python/api/overview/azure/ml).


## Diagnostics from studio

From the [Azure Machine Learning studio](https://ml.azure.com), you can run diagnostics on your workspace to check your setup. To run diagnostics, select the '__?__' icon in the upper right corner of the page. Then select __Run workspace diagnostics__.

Screenshot of the workspace diagnostics button.

After diagnostics run, a list of any detected problems is returned. This list includes links to possible solutions.

## Diagnostics from Python

The following snippet demonstrates how to use workspace diagnostics from Python.

**Applies to: azureml-api-2**

**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

```python
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential

subscription_id = '<your-subscription-id>'
resource_group = '<your-resource-group-name>'
workspace = '<your-workspace-name>'

ml_client = MLClient(DefaultAzureCredential(), subscription_id, resource_group, workspace)
resp = ml_client.workspaces.begin_diagnose(workspace).result()
# Inspect the attributes of the response you are interested in
for result in resp.application_insights_results:
    print(f"Diagnostic result: {result.code}, {result.level}, {result.message}")

```

The response is a [DiagnoseResponseResultValue](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.entities.diagnoseresponseresultvalue) object that contains information on any problems detected with the workspace.

**Applies to: azureml-api-1**

**APPLIES TO:**  [Azure Machine Learning SDK v1 for Python](https://learn.microsoft.com/python/api/overview/azure/ml/?view=azure-ml-py\&preserve-view=true)


```python
from azureml.core import Workspace

ws = Workspace.from_config()

diag_param = {
      "value": {
      }
    }

resp = ws.diagnose_workspace(diag_param)
print(resp)
```

The response is a JSON document that contains information on any problems detected with the workspace. The following JSON is an example response:

```json
{
    "value": {
        "user_defined_route_results": [],
        "network_security_rule_results": [],
        "resource_lock_results": [],
        "dns_resolution_results": [{
            "code": "CustomDnsInUse",
            "level": "Warning",
            "message": "It is detected VNet '/subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.Network/virtualNetworks/<virtual-network-name>' of private endpoint '/subscriptions/<subscription-id>/resourceGroups/<myresourcegroup>/providers/Microsoft.Network/privateEndpoints/<workspace-private-endpoint>' is not using Azure default DNS. You need to configure your DNS server and check https://learn.microsoft.com/azure/machine-learning/how-to-custom-dns to make sure the custom DNS is set up correctly."
        }],
        "storage_account_results": [],
        "key_vault_results": [],
        "container_registry_results": [],
        "application_insights_results": [],
        "other_results": []
    }
}
```

If no problems are detected, an empty JSON document is returned.


**Applies to: azureml-api-2**
For more information, see the [Workspace](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.entities.workspace) reference.

**Applies to: azureml-api-1**
For more information, see the [Workspace.diagnose_workspace()](https://learn.microsoft.com/python/api/azureml-core/azureml.core.workspace\(class\)#azureml-core-workspace-diagnose-workspace) reference.


## Next step

> 
> [Manage Azure Machine Learning workspaces in the portal or with the Python SDK (v2)](how-to-manage-workspace.md)
