---
title: "Include file"
description: "Include file"
services: machine-learning
author: s-polly
ms.service: azure-machine-learning
ms.author: scottpolly
ms.custom: "include file"
ms.topic: "include"
ms.date: 06/10/2024
---

1. Open a terminal window and sign in to Azure. If you're using an [Azure Machine Learning compute instance](../quickstart-create-resources.md#create-a-compute-instance), use:

    ```azurecli
    az login --identity
    ```

    If you're not on the compute instance, omit `--identity` and follow the prompt to open a browser window to authenticate.

1. Make sure you have the most recent versions of the CLI and the `ml` extension:

    ```azurecli
    az upgrade
    ```

1. If you have multiple Azure subscriptions, set the active subscription to the one you're using for your workspace. (You can skip this step if you only have access to a single subscription.)  Replace `<YOUR_SUBSCRIPTION_NAME_OR_ID>` with either your subscription name or subscription ID. Also remove the brackets `<>`.

    [Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/misc.sh](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/includes/set-up-cli.md)


1. Set the default workspace. If you're using a compute instance, you can keep the following command as is. If you're on any other computer, substitute your resource group and workspace name instead. (You can find these values in [Azure Machine Learning studio](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/how-to-r-train-model.md#submit-the-job).)

    ```azurecli
    az configure --defaults group=$CI_RESOURCE_GROUP workspace=$CI_WORKSPACE
    ```
