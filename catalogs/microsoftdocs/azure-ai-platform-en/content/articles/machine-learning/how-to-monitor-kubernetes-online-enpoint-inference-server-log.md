---
title: Monitor Kubernetes Online Endpoint inference server logs
titleSuffix: Azure Machine Learning
description: Learn how to monitor inference server logs of Kubernetes online endpoint
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: mlops
ms.topic: concept-article
author: s-polly
ms.author: scottpolly
ms.reviewer: jturuk
ms.custom: devplatv2
ms.date: 03/12/2025
---

# Monitor Kubernetes Online Endpoint inference server logs


**APPLIES TO:**




To diagnose online issues and monitor Azure Machine Learning model inference server metrics, you usually need to collect model inference server logs. In this article, learn how to collect inference server logs from Azure Kubernetes Service (AKS) and Azure Arc enabled Kubernetes clusters. The logs are collected in **Log Analytics** workspace, which is a part of **Azure Monitor**.

## AKS cluster

In AKS cluster, you can use the built-in ability to collect container logs. Follow the steps to collect inference server logs in AKS:

1. Go to the AKS portal and select **Logs** tab

    Diagram illustrating how to configure Azure monitor in AKS.

1. Select **Configure Monitoring** to enable Azure Monitor for your AKS. In the **Advanced Settings** section, you can specify an existing **Log Analytics** or create a new one for collecting logs.

    Diagram illustrating how to configure container insight in AKS monitor.

1. After about 1 hour for it to take effect, you can query inference server logs from **AKS** or **Log Analytics** portal.

    Example of query run in AKS monitor.

1. Query example:
    ```
        let starttime = ago(1d);
        ContainerLogV2
        | where TimeGenerated > starttime
        | where PodName has "blue-sklearn-mnist"
        | where ContainerName has "inference-server"
        | project TimeGenerated, PodNamespace, PodName, ContainerName, LogMessage
        | limit 100
    ```

## Azure Arc enabled cluster

In Arc Kubernetes cluster, you can reference the [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) document to upload logs to **Log Analytics** from your cluster by utilizing **Azure Monitor Agent**
