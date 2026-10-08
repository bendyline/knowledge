---
title: 'Azure HDInsight: Python samples'
description: Find Python examples on GitHub for common tasks using the HDInsight SDK for Python.
ms.service: azure-hdinsight
ms.topic: sample
ms.date: 06/13/2024
author: yeturis
ms.author: sairamyeturi
ms.reviewer: hgowrisankar
ms.custom: devx-track-python
---

# Azure HDInsight: Python samples

> 
> * [Python Examples](hdinsight-sdk-python-samples.md)
> * [.NET Examples](hdinsight-sdk-dotnet-samples.md)
> * [Java Examples](hdinsight-sdk-java-samples.md)
<!-- * [Go Examples](hdinsight-sdk-go-samples.md)-->

> **Important:**
> Python 2.7 will be deprecated on January 1st 2020. If you are still using Python 2.7, upgrade to 3.7 in order to use the HDInsight Python SDK.  

This article provides:

* Links to samples for cluster creation tasks.
* Links to reference content for other management tasks.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hdinsight/hdinsight-sdk-python-samples.md)

## Prerequisites

[Azure HDInsight SDK for Python](https://learn.microsoft.com/python/api/overview/azure/hdinsight#sdk-installation)

## Cluster management - creation

* [Create an Apache Kafka cluster](https://github.com/Azure-Samples/hdinsight-python-sdk-samples/blob/master/samples/create_kafka_cluster_sample.py)
* [Create an Apache Spark cluster](https://github.com/Azure-Samples/hdinsight-python-sdk-samples/blob/master/samples/create_spark_cluster_sample.py)
* [Create an Apache Spark cluster with Azure Data Lake Storage Gen2](https://github.com/Azure-Samples/hdinsight-python-sdk-samples/blob/master/samples/create_hadoop_cluster_with_adls_gen2_sample.py)
* [Create an Apache Spark cluster with Enterprise Security Package (ESP)](https://github.com/Azure-Samples/hdinsight-python-sdk-samples/blob/master/samples/create_esp_cluster_sample.py)

You can get these samples for Python by cloning the [hdinsight-python-sdk-samples](https://github.com/Azure-Samples/hdinsight-python-sdk-samples) GitHub repository.

## Additional SDK functionality

* List clusters
* Delete clusters
* Resize clusters
* Monitoring
* Script Actions


Code snippets for this additional SDK functionality can be found in the [HDInsight SDK for Python reference documentation](https://learn.microsoft.com/python/api/overview/azure/hdinsight).
