---
title: Azure HDInsight troubleshooting guides
description: Troubleshoot Azure HDInsight. Step-by-step documentation shows you how to use HDInsight to solve common problems with Apache Hive, Apache Spark, Apache YARN, Apache HBase, and HDFS.
ms.service: azure-hdinsight
ms.topic: troubleshooting
ms.date: 09/06/2024
---

# Troubleshoot Azure HDInsight

| Apache workload | Top questions |
| --- | --- |
| hdinsight apache HBase icon icon.<br>[Troubleshoot Apache HBase]() | <br>[Unassigned regions](hbase/hbase-troubleshoot-unassigned-regions.md#scenario-unassigned-regions)<br><br>[Timeouts with 'hbase hbck' command in Azure HDInsight](hbase/hbase-troubleshoot-timeouts-hbase-hbck.md)<br><br>[Apache Phoenix connectivity issues in Azure HDInsight](hbase/hbase-troubleshoot-phoenix-connectivity.md)<br><br>[What causes a primary server to fail to start?](hbase/hbase-troubleshoot-start-fails.md)<br><br>[BindException - Address already in use](hbase/hbase-troubleshoot-bindexception-address-use.md) |
| hdinsight apache hdfs icon icon.<br>[Troubleshoot Apache Hadoop HDFS](hdinsight-troubleshoot-hdfs.md) | <br>[How do I access a local HDFS from inside a cluster?](hdinsight-troubleshoot-hdfs.md#how-do-i-access-local-hdfs-from-inside-a-cluster)<br><br>[Local HDFS stuck in safe mode on Azure HDInsight cluster](hadoop/hdinsight-hdfs-troubleshoot-safe-mode.md) |
| hdinsight apache Hive icon icon.<br>[Troubleshoot Apache Hive](hdinsight-troubleshoot-hive.md) | <br>[How do I export a Hive metastore and import it on another cluster?](hdinsight-troubleshoot-hive.md#how-do-i-export-a-hive-metastore-and-import-it-on-another-cluster)<br><br>[How do I locate Apache Hive logs on a cluster?](hdinsight-troubleshoot-hive.md#how-do-i-locate-hive-logs-on-a-cluster)<br><br>[How do I launch the Apache Hive shell with specific configurations on a cluster?](hdinsight-troubleshoot-hive.md#how-do-i-launch-the-hive-shell-with-specific-configurations-on-a-cluster)<br><br>[How do I analyze Apache Tez DAG data on a cluster-critical path?](hdinsight-troubleshoot-hive.md#how-do-i-analyze-tez-dag-data-on-a-cluster-critical-path)<br><br>[How do I download Apache Tez DAG data from a cluster?](hdinsight-troubleshoot-hive.md#how-do-i-download-tez-dag-data-from-a-cluster) |
| hdinsight apache Spark icon icon.<br>[Troubleshoot Apache Spark](spark/apache-troubleshoot-spark.md) | <br>[How do I configure an Apache Spark application by using Apache Ambari on clusters?](spark/apache-troubleshoot-spark.md#how-do-i-configure-an-apache-spark-application-by-using-apache-ambari-on-clusters)<br><br>[How do I configure an Apache Spark application by using a Jupyter Notebook on clusters?](spark/apache-troubleshoot-spark.md#how-do-i-configure-an-apache-spark-application-by-using-a-jupyter-notebook-on-clusters)<br><br>[How do I configure an Apache Spark application by using Apache Livy on clusters?](spark/apache-troubleshoot-spark.md#how-do-i-configure-an-apache-spark-application-by-using-apache-livy-on-clusters)<br><br>[How do I configure an Apache Spark application by using spark-submit on clusters?](spark/apache-troubleshoot-spark.md#how-do-i-configure-an-apache-spark-application-by-using-spark-submit-on-clusters)<br><br>[How do I configure an Apache Spark application by using IntelliJ?](spark/apache-spark-intellij-tool-plugin.md)<br><br>[How do I configure an Apache Spark application by using Eclipse?](spark/apache-spark-eclipse-tool-plugin.md)<br><br>[How do I configure an Apache Spark application by using VS Code?](hdinsight-for-vscode.md)<br><br>[OutOfMemoryError exception for Apache Spark](spark/apache-spark-troubleshoot-outofmemory.md#scenario-outofmemoryerror-exception-for-apache-spark) |
| hdinsight apache YARN icon icon.<br>[Troubleshoot Apache Hadoop YARN](hdinsight-troubleshoot-yarn.md) | <br>[How do I create a new Apache Hadoop YARN queue on a cluster?](hdinsight-troubleshoot-yarn.md#how-do-i-create-a-new-yarn-queue-on-a-cluster)<br><br>[How do I download Apache Hadoop YARN logs from a cluster?](hdinsight-troubleshoot-yarn.md#how-do-i-download-yarn-logs-from-a-cluster) |

## HDInsight troubleshooting resources

| For information about | See these articles |
| --- | --- |
| HDInsight on Linux and optimization | - [Information about using HDInsight on Linux](hdinsight-hadoop-linux-information.md)<br>- [Apache Hadoop memory and performance troubleshooting](hdinsight-hadoop-stack-trace-error-messages.md) |
| Logs and dumps | - [Access Apache Hadoop YARN application logs on Linux](hdinsight-hadoop-access-yarn-app-logs-linux.md)<br>- [Enable heap dumps for Apache Hadoop services on Linux](hdinsight-hadoop-collect-debug-heap-dump-linux.md) |
| Errors | - [Understand and resolve WebHCat errors](hdinsight-hadoop-templeton-webhcat-debug-errors.md)<br>- [Apache Hive settings to fix OutofMemory error](hdinsight-hadoop-hive-out-of-memory-error-oom.md) |
| Tools | - [Optimize Apache Hive queries](hdinsight-hadoop-optimize-hive-query.md)<br>- [HDInsight IntelliJ tool](spark/apache-spark-intellij-tool-plugin.md)<br>- [HDInsight Eclipse tool](spark/apache-spark-eclipse-tool-plugin.md)<br>- [HDInsight VS Code tool](hdinsight-for-vscode.md)<br>- [HDInsight Visual Studio tool](hadoop/apache-hadoop-visual-studio-tools-get-started.md) |

## Next steps


If you didn't see your problem or are unable to solve your issue, visit one of the following channels for more support:

* Get answers from Azure experts through [Azure Community Support](https://azure.microsoft.com/support/community/).

* Connect with [@AzureSupport](https://x.com/azuresupport) - the official Microsoft Azure account for improving customer experience. Connecting the Azure community to the right resources: answers, support, and experts.

* If you need more help, you can submit a support request from the [Azure portal](https://portal.azure.com/?#blade/Microsoft_Azure_Support/HelpAndSupportBlade/). Select **Support** from the menu bar or open the **Help + support** hub. For more detailed information, review [How to create an Azure support request](https://learn.microsoft.com/azure/azure-portal/supportability/how-to-create-azure-support-request). Access to Subscription Management and billing support is included with your Microsoft Azure subscription, and Technical Support is provided through one of the [Azure Support Plans](https://azure.microsoft.com/support/plans/).
