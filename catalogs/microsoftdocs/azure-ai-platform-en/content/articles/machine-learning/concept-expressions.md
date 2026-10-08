---
title: 'SDK and CLI v2 expressions'
titleSuffix: Azure Machine Learning
description: SDK and CLI v2 use expressions when a value might not be known when authoring a job or component.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: core
ms.topic: concept-article
ms.author: scottpolly
author: s-polly
ms.reviewer: sooryar
ms.date: 11/14/2025
ms.custom: cliv2, sdkv2
---

# Expressions in Azure Machine Learning SDK and CLI v2

With Azure Machine Learning SDK and CLI v2, you can use _expressions_ when a value might not be known when you're authoring a job or component. When you submit a job or call a component, the expression is evaluated and the value is substituted.

The format for an expression is `${{ <expression> }}`. Some expressions are evaluated on the _client_, when submitting the job or component. Other expressions are evaluated on the _server_ (the compute where the job or component runs).

## Client expressions

> **Note:**
> The "client" that evaluates the expression is where you submit the job or run the component. For example, your local machine or a compute instance.

| Expression | Description | Scope |
| --- | --- | --- |
| `${{inputs.<input_name>}}` | References to an input data asset or model. | Works for all jobs. |
| `${{outputs.<output_name>}}` | References to an output data asset or model. | Works for all jobs. |
| `${{search_space.<hyperparameter>}}` | References the hyperparameters to use in a sweep job. The hyperparameter values for each trial are selected based on the `search_space`. | Sweep jobs only. |
| `${{parent.inputs.<input_name>}}` | Binds the inputs of a child job (pipeline step) in a pipeline to the inputs of the top-level parent pipeline job. | Pipeline jobs only. |
| `${{parent.outputs.<output_name>}}` | Binds the outputs of a child job (pipeline step) in a pipeline to the outputs of the top-level parent pipeline job. | Pipeline jobs only. |
| `${{parent.jobs.<step-name>.inputs.<input-name>}}` | Binds to the inputs of another step in the pipeline. | Pipeline jobs only. |
| `${{parent.jobs.<step-name>.outputs.<output-name>}}` | Binds to the outputs of another step in the pipeline. | Pipeline jobs only. |

## Server expressions


> **Important:**
> The following expressions are resolved on the _server_ side, not the _client_ side. For scheduled jobs where the job _creation time_ and job _submission time_ are different, the expressions are resolved when the job is submitted. Since these expressions are resolved on the server side, they use the _current_ state of the workspace, not the state of the workspace when the scheduled job was created. For example, if you change the default datastore of the workspace after you create a scheduled job, the expression `${{default_datastore}}` is resolved to the new default datastore, not the default datastore when the scheduled job was created.

| Expression | Description | Scope |
| --- | --- | --- |
| `${{default_datastore}}` | If pipeline default datastore is configured, is resolved as pipeline default datastore name; otherwise is resolved as workspace default datastore name. <br><br> Pipeline default datastore can be controlled using `pipeline_job.settings.default_datastore`. | Works for all jobs. <br><br> Pipeline jobs have a configurable pipeline default datastore. |
| `${{name}}` | The job name. For pipelines, it's the step job name, not the pipeline job name. | Works for all jobs |
| `${{output_name}}` | The job output name | Works for all jobs |

For example, if `azureml://datastores/${{default_datastore}}/paths/${{name}}/${{output_name}}` is used as the output path, at runtime it's resolved as a path of `azureml://datastores/workspaceblobstore/paths/<job-name>/model_path`.


## Next steps

For more information on these expressions, see the following articles and examples:

* [CLI v2 core YAML syntax](reference-yaml-core-syntax.md#expression-syntax-for-configuring-azure-machine-learning-jobs-and-components)
* [Hyperparameter tuning a model](how-to-tune-hyperparameters.md)
* [Tutorial: ML pipelines with Python SDK v2](tutorial-pipeline-python-sdk.md)
* [Create and run component-based ML pipelines (CLI)](how-to-create-component-pipelines-cli.md)
* [Example: Iris batch prediction notebook](https://github.com/Azure/azureml-examples/blob/main/sdk/python/jobs/parallel/2a_iris_batch_prediction/iris_batch_prediction.ipynb)
* [Example: Pipeline YAML file](https://github.com/Azure/azureml-examples/blob/main/cli/jobs/pipelines-with-components/nyc_taxi_data_regression/pipeline.yml)
