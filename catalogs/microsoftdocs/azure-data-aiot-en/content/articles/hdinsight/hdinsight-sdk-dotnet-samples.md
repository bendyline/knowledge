---
title: 'Azure HDInsight: .NET samples'
description: Find C# .NET examples on GitHub for common tasks using the HDInsight SDK for .NET.
ms.service: azure-hdinsight
ms.custom: devx-track-dotnet
ms.topic: sample
author: yeturis
ms.author: sairamyeturi
ms.reviewer: hgowrisankar
ms.date: 10/17/2024
---

# Azure HDInsight: .NET samples

> 
> * [.NET Examples](hdinsight-sdk-dotnet-samples.md)
> * [Python Examples](hdinsight-sdk-python-samples.md)
> * [Java Examples](hdinsight-sdk-java-samples.md)
<!-- * [Go Examples](hdinsight-sdk-go-samples.md)-->

This article provides:

* Links to samples for cluster creation tasks.
* Links to reference content for other management tasks.

You can [activate Visual Studio subscriber benefits](https://azure.microsoft.com/pricing/member-offers/msdn-benefits-details/?ref=microsoft.com&utm_source=microsoft.com&utm_medium=docs&utm_campaign=visualstudio): Your Visual Studio subscription gives you credits every month that you can use for paid Azure services.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hdinsight/hdinsight-sdk-dotnet-samples.md)

## Prerequisite

[Azure HDInsight SDK for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/hdinsight#sdk-installation)

## Cluster management - creation

* [Create a Kafka cluster](https://github.com/Azure-Samples/hdinsight-dotnet-sdk-samples/blob/master/Management/Microsoft.Azure.Management.HDInsight.Samples/Microsoft.Azure.Management.HDInsight.Samples/CreateKafkaClusterSample.cs)
* [Create a Spark cluster](https://github.com/Azure-Samples/hdinsight-dotnet-sdk-samples/blob/master/Management/Microsoft.Azure.Management.HDInsight.Samples/Microsoft.Azure.Management.HDInsight.Samples/CreateSparkClusterSample.cs)
* [Create a Spark cluster with Azure Data Lake Storage Gen2](https://github.com/Azure-Samples/hdinsight-dotnet-sdk-samples/blob/master/Management/Microsoft.Azure.Management.HDInsight.Samples/Microsoft.Azure.Management.HDInsight.Samples/CreateHadoopClusterWithAdlsGen2Sample.cs)
* [Create a Spark cluster with Enterprise Security Package (ESP)](https://github.com/Azure-Samples/hdinsight-dotnet-sdk-samples/blob/master/Management/Microsoft.Azure.Management.HDInsight.Samples/Microsoft.Azure.Management.HDInsight.Samples/CreateEspClusterSample.cs)

You can get these samples for .NET by cloning the [hdinsight-dotnet-sdk-samples](https://github.com/Azure-Samples/hdinsight-dotnet-sdk-samples) GitHub repository.

## Additional SDK functionality

* List clusters
* Delete clusters
* Resize clusters
* Monitoring
* Script Actions


Code snippets for this additional SDK functionality can be found in the [HDInsight SDK for .NET reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/hdinsight).
