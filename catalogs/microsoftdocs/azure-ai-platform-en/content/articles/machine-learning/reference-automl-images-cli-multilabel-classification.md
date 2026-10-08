---
title: 'CLI (v2) Automated ML Image Multi-Label Classification job YAML schema'
titleSuffix: Azure Machine Learning
description: Reference documentation for the CLI (v2) Automated ML Image Multi-Label Classification job YAML schema.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: core
ms.topic: reference
ms.custom: cliv2

ms.author: scottpolly
author: s-polly
ms.date: 10/11/2022
ms.reviewer: rasavage
---

# CLI (v2) Automated ML image multi-Label classification job YAML schema


**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


The source JSON schema can be found at https://azuremlschemasprod.azureedge.net/latest/autoMLImageClassificationMultilabelJob.schema.json.




> **Note:**
> The YAML syntax detailed in this document is based on the JSON schema for the latest version of the ML CLI v2 extension. This syntax is guaranteed only to work with the latest version of the ML CLI v2 extension.
> You can find the schemas for older extension versions at [https://azuremlschemasprod.azureedge.net/](https://azuremlschemasprod.azureedge.net/).


## YAML syntax

For information on all the keys in YAML syntax, see [YAML syntax](reference-automl-images-cli-classification.md#yaml-syntax) of image classification task. Here we only describe the keys that have different values as compared to what's specified for image classification task.

| Key | Type | Description | Allowed values | Default value |
| --- | --- | --- | --- | --- |
| `task` | const | **Required.** The type of AutoML task. | `image_classification_multilabel` | `image_classification_multilabel` |
| `primary_metric` | string | The metric that AutoML will optimize for model selection. | `iou` | `iou` |

## Remarks

The `az ml job` command can be used for managing Azure Machine Learning jobs.

## Examples

Examples are available in the [examples GitHub repository](https://github.com/Azure/azureml-examples/tree/main/cli/jobs). Examples relevant to image multi-label classification job are shown below.

## YAML: AutoML image multi-label classification job

[Code reference unavailable in this source snapshot: ~/azureml-examples-temp-fix/cli/jobs/automl-standalone-jobs/cli-automl-image-classification-multilabel-task-fridge-items/cli-automl-image-classification-multilabel-task-fridge-items.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-automl-images-cli-multilabel-classification.md)

## YAML: AutoML image multi-label classification pipeline job

[Code reference unavailable in this source snapshot: ~/azureml-examples-temp-fix/cli/jobs/pipelines/automl/image-multilabel-classification-fridge-items-pipeline/pipeline.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-automl-images-cli-multilabel-classification.md)

## Next steps

- [Install and use the CLI (v2)](how-to-configure-cli.md)
