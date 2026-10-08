---
title: 'Azure HDInsight: Java samples'
description: Find Java examples on GitHub for common tasks using the HDInsight SDK for Java.
ms.custom: devx-track-java, devx-track-extended-java
ms.service: azure-hdinsight
ms.topic: sample
author: yeturis
ms.author: sairamyeturi
ms.reviewer: hgowrisankar
ms.date: 06/13/2024
---

# Azure HDInsight: Java samples

> 
> * [Java Examples](hdinsight-sdk-java-samples.md)
> * [.NET Examples](hdinsight-sdk-dotnet-samples.md)
> * [Python Examples](hdinsight-sdk-python-samples.md)
<!-- * [Go Examples](hdinsight-sdk-dotnet-samples.md)-->

This article provides:

* Links to samples for cluster creation tasks.
* Links to reference content for other management tasks.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hdinsight/hdinsight-sdk-java-samples.md)

## Prerequisites

[Azure HDInsight SDK for Java](https://learn.microsoft.com/java/api/overview/azure/hdinsight#sdk-installation)

## Cluster management - creation

* [Create a Kafka cluster](https://github.com/Azure-Samples/hdinsight-java-sdk-samples/blob/master/management/src/main/java/com/microsoft/azure/hdinsight/samples/CreateKafkaClusterSample.java)
* [Create a Spark cluster](https://github.com/Azure-Samples/hdinsight-java-sdk-samples/blob/master/management/src/main/java/com/microsoft/azure/hdinsight/samples/CreateSparkClusterSample.java)
* [Create a Spark cluster with Azure Data Lake Storage Gen2](https://github.com/Azure-Samples/hdinsight-java-sdk-samples/blob/master/management/src/main/java/com/microsoft/azure/hdinsight/samples/CreateHadoopClusterWithAdlsGen2Sample.java)
* [Create a Spark cluster with Enterprise Security Package (ESP)](https://github.com/Azure-Samples/hdinsight-java-sdk-samples/blob/master/management/src/main/java/com/microsoft/azure/hdinsight/samples/CreateEspClusterSample.java)

You can get these samples for Java by cloning the [hdinsight-java-sdk-samples](https://github.com/Azure-Samples/hdinsight-java-sdk-samples) GitHub repository.

## Additional SDK functionality

* List clusters
* Delete clusters
* Resize clusters
* Monitoring
* Script Actions


Code snippets for this additional SDK functionality can be found in the [HDInsight SDK for Java reference documentation](https://learn.microsoft.com/java/api/overview/azure/hdinsight).
