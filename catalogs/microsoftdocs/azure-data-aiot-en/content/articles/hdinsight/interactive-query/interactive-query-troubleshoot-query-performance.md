---
title: Poor performance in Apache Hive LLAP queries in Azure HDInsight
description: Queries in Apache Hive LLAP are executing slower than expected in Azure HDInsight.
ms.service: azure-hdinsight
ms.topic: troubleshooting
author: abhishjain002
ms.author: abhishjain
ms.reviewer: nijelsf
ms.date: 05/22/2024
---

# Scenario: Poor performance in Apache Hive LLAP queries in Azure HDInsight

This article describes troubleshooting steps and possible resolutions for issues when using Interactive Query components in Azure HDInsight clusters.

## Issue

The default cluster configurations are not sufficiently tuned for your workload. Queries in Hive LLAP are executing slower than expected.

## Cause

This can happen due to a variety of reasons.

## Resolution

LLAP is optimized for queries that involve joins and aggregates. Queries like the following don’t perform well in an Interactive Hive cluster:

```
select * from table where column = "columnvalue"
```

To improve point query performance in Hive LLAP, set the following configurations:

```
hive.llap.io.enabled=false; (disable LLAP IO)
hive.optimize.index.filter=false; (disable ORC row index)
hive.exec.orc.split.strategy=BI; (to avoid recombining splits)
```

You can also increase usage the LLAP cache to improve performance with the following configuration change:

```
hive.fetch.task.conversion=none
```

## Next steps


If you didn't see your problem or are unable to solve your issue, visit one of the following channels for more support:

* Get answers from Azure experts through [Azure Community Support](https://azure.microsoft.com/support/community/).

* Connect with [@AzureSupport](https://x.com/azuresupport) - the official Microsoft Azure account for improving customer experience. Connecting the Azure community to the right resources: answers, support, and experts.

* If you need more help, you can submit a support request from the [Azure portal](https://portal.azure.com/?#blade/Microsoft_Azure_Support/HelpAndSupportBlade/). Select **Support** from the menu bar or open the **Help + support** hub. For more detailed information, review [How to create an Azure support request](https://learn.microsoft.com/azure/azure-portal/supportability/how-to-create-azure-support-request). Access to Subscription Management and billing support is included with your Microsoft Azure subscription, and Technical Support is provided through one of the [Azure Support Plans](https://azure.microsoft.com/support/plans/).
