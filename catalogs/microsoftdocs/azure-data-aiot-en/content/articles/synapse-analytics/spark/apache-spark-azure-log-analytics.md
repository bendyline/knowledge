---
title: Monitor Apache Spark applications with Azure Log Analytics
description: Learn how to enable the Synapse Studio connector for collecting and sending the Apache Spark application metrics and logs to your Log Analytics workspace.
author: jejiang
ms.author: jejiang
 
ms.service: azure-synapse-analytics
ms.topic: how-to
ms.subservice: spark
ms.date: 12/13/2024
ms.custom:
  - references_regions
  - sfi-image-nochange
---

# Legacy HTTP Data Collector API path for Azure Log Analytics

> **Warning:**
> Instead of following this article, go to [Collect logs and metrics with Azure Log Analytics](data-collector-api-to-log-ingestion-api.md) for new setups and migrations. This article is for the legacy HTTP Data Collector API path and is kept for reference only.

In this tutorial, you learn how to enable the Synapse Studio connector that's built in to Log Analytics. You can then collect and send Apache Spark application metrics and logs to your [Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/quick-create-workspace). Finally, you can use an Azure Monitor workbook to visualize the metrics and logs.

## Configure workspace information

Follow these steps to configure the necessary information in Synapse Studio.

### Step 1: Create a Log Analytics workspace

Consult one of the following resources to create this workspace:

- [Create a workspace in the Azure portal.](https://learn.microsoft.com/azure/azure-monitor/logs/quick-create-workspace)
- [Create a workspace with Azure CLI.](https://learn.microsoft.com/azure/azure-monitor/logs/resource-manager-workspace)
- [Create and configure a workspace in Azure Monitor by using PowerShell.](https://learn.microsoft.com/azure/azure-monitor/logs/powershell-workspace-configuration)

### Step 2: Gather configuration information

Use any of the following options to prepare the configuration.

#### Option 1: Configure with Log Analytics workspace ID and key

Gather the following values for the spark configuration:

   - `<LOG_ANALYTICS_WORKSPACE_ID>`: Log Analytics workspace ID.
   - `<LOG_ANALYTICS_WORKSPACE_KEY>`: Log Analytics key. To find this, in the Azure portal, go to **Azure Log Analytics workspace** > **Agents** > **Primary key**.

```properties
spark.synapse.logAnalytics.enabled true
spark.synapse.logAnalytics.workspaceId <LOG_ANALYTICS_WORKSPACE_ID>
spark.synapse.logAnalytics.secret <LOG_ANALYTICS_WORKSPACE_KEY>
```

Alternatively, use the following properties:

```properties
spark.synapse.diagnostic.emitters: LA
spark.synapse.diagnostic.emitter.LA.type: "AzureLogAnalytics"
spark.synapse.diagnostic.emitter.LA.categories: "Log,EventLog,Metrics"
spark.synapse.diagnostic.emitter.LA.workspaceId: <LOG_ANALYTICS_WORKSPACE_ID>
spark.synapse.diagnostic.emitter.LA.secret: <LOG_ANALYTICS_WORKSPACE_KEY>
```

#### Option 2: Configure with Azure Key Vault

> **Note:**
> You need to grant read secret permission to the users who submit Apache Spark applications. For more information, see [Provide access to Key Vault keys, certificates, and secrets with an Azure role-based access control](https://learn.microsoft.com/azure/key-vault/general/rbac-guide). When you enable this feature in a Synapse pipeline, you need to use **Option 3**. This is necessary to obtain the secret from Azure Key Vault with workspace managed identity.

To configure Azure Key Vault to store the workspace key, follow these steps:

1. Create and go to your key vault in the Azure portal.
1. Grant the right permission to the users or workspace managed identities.
1. On the settings page for the key vault, select **Secrets**.
1. Select **Generate/Import**.
1. On the **Create a secret** screen, choose the following values:
   - **Name**: Enter a name for the secret. For the default, enter `SparkLogAnalyticsSecret`.
   - **Value**: Enter the `<LOG_ANALYTICS_WORKSPACE_KEY>` for the secret.
   - Leave the other values to their defaults. Then select **Create**.
1. Gather the following values for the spark configuration:

   - `<LOG_ANALYTICS_WORKSPACE_ID>`: The Log Analytics workspace ID.
   - `<AZURE_KEY_VAULT_NAME>`: The key vault name that you configured.
   - `<AZURE_KEY_VAULT_SECRET_KEY_NAME>` (optional): The secret name in the key vault for the workspace key. The default is `SparkLogAnalyticsSecret`.

```properties
spark.synapse.logAnalytics.enabled true
spark.synapse.logAnalytics.workspaceId <LOG_ANALYTICS_WORKSPACE_ID>
spark.synapse.logAnalytics.keyVault.name <AZURE_KEY_VAULT_NAME>
spark.synapse.logAnalytics.keyVault.key.secret <AZURE_KEY_VAULT_SECRET_KEY_NAME>
```

Alternatively, use the following properties:

```properties
spark.synapse.diagnostic.emitters LA
spark.synapse.diagnostic.emitter.LA.type: "AzureLogAnalytics"
spark.synapse.diagnostic.emitter.LA.categories: "Log,EventLog,Metrics"
spark.synapse.diagnostic.emitter.LA.workspaceId: <LOG_ANALYTICS_WORKSPACE_ID>
spark.synapse.diagnostic.emitter.LA.secret.keyVault: <AZURE_KEY_VAULT_NAME>
spark.synapse.diagnostic.emitter.LA.secret.keyVault.secretName: <AZURE_KEY_VAULT_SECRET_KEY_NAME>
```

> **Note:**
> You can also store the workspace ID in Key Vault. Refer to the preceding steps, and store the workspace ID with the secret name `SparkLogAnalyticsWorkspaceId`. Alternatively, you can use the configuration `spark.synapse.logAnalytics.keyVault.key.workspaceId` to specify the workspace ID secret name in Key Vault.

#### Option 3. Configure with a linked service

> **Note:**
> In this option, you need to grant read secret permission to workspace managed identity. For more information, see [Provide access to Key Vault keys, certificates, and secrets with an Azure role-based access control](https://learn.microsoft.com/azure/key-vault/general/rbac-guide).

To configure a Key Vault linked service in Synapse Studio to store the workspace key, follow these steps:

1. Follow all the steps in the preceding section, "Option 2."
1. Create a Key Vault linked service in Synapse Studio:

    a. Go to **Synapse Studio** > **Manage** > **Linked services**, and then select **New**.

    b. In the search box, search for **Azure Key Vault**.

    c. Enter a name for the linked service.

    d. Choose your key vault, and select **Create**.

1. Add a `spark.synapse.logAnalytics.keyVault.linkedServiceName` item to the Apache Spark configuration.

```properties
spark.synapse.logAnalytics.enabled true
spark.synapse.logAnalytics.workspaceId <LOG_ANALYTICS_WORKSPACE_ID>
spark.synapse.logAnalytics.keyVault.name <AZURE_KEY_VAULT_NAME>
spark.synapse.logAnalytics.keyVault.key.secret <AZURE_KEY_VAULT_SECRET_KEY_NAME>
spark.synapse.logAnalytics.keyVault.linkedServiceName <LINKED_SERVICE_NAME>
```

Alternatively, use the following properties:

```properties
spark.synapse.diagnostic.emitters LA
spark.synapse.diagnostic.emitter.LA.type: "AzureLogAnalytics"
spark.synapse.diagnostic.emitter.LA.categories: "Log,EventLog,Metrics"
spark.synapse.diagnostic.emitter.LA.workspaceId: <LOG_ANALYTICS_WORKSPACE_ID>
spark.synapse.diagnostic.emitter.LA.secret.keyVault: <AZURE_KEY_VAULT_NAME>
spark.synapse.diagnostic.emitter.LA.secret.keyVault.secretName: <AZURE_KEY_VAULT_SECRET_KEY_NAME>
spark.synapse.diagnostic.emitter.LA.secret.keyVault.linkedService: <AZURE_KEY_VAULT_LINKED_SERVICE>
```

For a list of Apache Spark configurations, see [Available Apache Spark configurations](../monitor-synapse-analytics-reference.md#available-apache-spark-configurations)

### Step 3: Create an Apache Spark Configuration

You can create an Apache Spark Configuration to your workspace, and when you create Notebook or Apache spark job definition you can select the Apache Spark configuration that you want to use with your Apache Spark pool. When you select it, the details of the configuration are displayed.

   1. Select **Manage** > **Apache Spark configurations**.
   1. Select **New** button to create a new Apache Spark configuration.
   1. **New Apache Spark configuration** page will be opened after you select **New** button.

      Screenshot that creates Spark configuration.

   1. For **Name**, you can enter your preferred and valid name.
   1. For **Description**, you can input some description in it.
   1. For **Annotations**, you can add annotations by clicking the **New** button, and also you can delete existing annotations by selecting and clicking **Delete** button.
   1. For **Configuration properties**, add all the properties from the configuration option you chose by selecting the **Add** button. For **Property** add the property name as listed, and for **Value** use the value you gathered during step 2. If you don't add a property, Azure Synapse will use the default value when applicable.

      Screenshot with an example for updating configuration properties.

## Submit an Apache Spark application and view the logs and metrics

Here's how:

1. Submit an Apache Spark application to the Apache Spark pool configured in the previous step. You can use any of the following ways to do so:
    - Run a notebook in Synapse Studio. 
    - In Synapse Studio, submit an Apache Spark batch job through an Apache Spark job definition.
    - Run a pipeline that contains Apache Spark activity.

1. Go to the specified Log Analytics workspace, and then view the application metrics and logs when the Apache Spark application starts to run.

## Write custom application logs

You can use the Apache Log4j library to write custom logs.

Example for Scala:

```scala
%%spark
val logger = org.apache.log4j.LogManager.getLogger("com.contoso.LoggerExample")
logger.info("info message")
logger.warn("warn message")
logger.error("error message")
//log exception
try {
      1/0
 } catch {
      case e:Exception =>logger.warn("Exception", e)
}
// run job for task level metrics
val data = sc.parallelize(Seq(1,2,3,4)).toDF().count()
```

Example for PySpark:

```python
%%pyspark
logger = sc._jvm.org.apache.log4j.LogManager.getLogger("com.contoso.PythonLoggerExample")
logger.info("info message")
logger.warn("warn message")
logger.error("error message")
```

## Use the sample workbook to visualize the metrics and logs

1. [Download the workbook](https://aka.ms/SynapseSparkLogAnalyticsWorkbook).
2. Open and copy the workbook file content.
3. In the [Azure portal](https://portal.azure.com/), select **Log Analytics workspace** > **Workbooks**. 
4. Open the **Empty** workbook. Use the **Advanced Editor** mode by selecting the **</>** icon.
5. Paste over any JSON code that exists.
6. Select **Apply**, and then select **Done Editing**.

    > 
    > Screenshot that shows a new workbook.

    > 
    > Screenshot that shows how to import a workbook.

Then, submit your Apache Spark application to the configured Apache Spark pool. After the application goes to a running state, choose the running application in the workbook dropdown list.

> 
> Screenshot that shows a workbook.

You can customize the workbook. For example, you can use Kusto queries and configure alerts.

> 
> Screenshot that shows customizing a workbook with a query and alerts.

## Query data with Kusto

The following is an example of querying Apache Spark events:

```kusto
SparkListenerEvent_CL
| where workspaceName_s == "{SynapseWorkspace}" and clusterName_s == "{SparkPool}" and livyId_s == "{LivyId}"
| order by TimeGenerated desc
| limit 100 
```

Here's an example of querying the Apache Spark application driver and executors logs:

```kusto
SparkLoggingEvent_CL
| where workspaceName_s == "{SynapseWorkspace}" and clusterName_s == "{SparkPool}" and livyId_s == "{LivyId}"
| order by TimeGenerated desc
| limit 100
```

And here's an example of querying Apache Spark metrics:

```kusto
SparkMetrics_CL
| where workspaceName_s == "{SynapseWorkspace}" and clusterName_s == "{SparkPool}" and livyId_s == "{LivyId}"
| where name_s endswith "jvm.total.used"
| summarize max(value_d) by bin(TimeGenerated, 30s), executorId_s
| order by TimeGenerated asc
```

## Create and manage alerts

Users can query to evaluate metrics and logs at a set frequency, and fire an alert based on the results. For more information, see [Create, view, and manage log alerts by using Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-log).

## Synapse workspace with data exfiltration protection enabled

After the Synapse workspace is created with [data exfiltration protection](../security/workspace-data-exfiltration-protection.md) enabled.

When you want to enable this feature, you need to create managed private endpoint connection requests to [Azure Monitor private link scopes (AMPLS)](https://learn.microsoft.com/azure/azure-monitor/logs/private-link-security) in the workspace’s approved Microsoft Entra tenants.

You can follow below steps to create a managed private endpoint connection to Azure Monitor private link scopes (AMPLS):

1. If there's no existing AMPLS, you can follow [Azure Monitor Private Link connection setup](https://learn.microsoft.com/azure/azure-monitor/logs/private-link-security) to create one.
1. Navigate to your AMPLS in Azure portal, on the **Azure Monitor Resources** page, select **Add** to add connection to your Azure Log Analytics workspace.
1. Navigate to **Synapse Studio > Manage > Managed private endpoints**, select **New** button, select **Azure Monitor Private Link Scopes**, and **continue**.
   > 
   > Screenshot of create AMPLS managed private endpoint 1.
1. Choose your Azure Monitor Private Link Scope you created, and select **Create** button.
   > 
   > Screenshot of create AMPLS managed private endpoint 2.
1. Wait a few minutes for private endpoint provisioning.
1. Navigate to your AMPLS in Azure portal again, on the **Private Endpoint connections** page, select the connection provisioned and **Approve**.

> **Note:**
>  - The AMPLS object has many limits you should consider when planning your Private Link setup. See [AMPLS limits](https://learn.microsoft.com/azure/azure-monitor/logs/private-link-security) for a deeper review of these limits. 
>  - Check if you have [right permission](../security/synapse-workspace-access-control-overview.md) to create managed private endpoint.

## Available configurations

| Configuration | Description |
| --- | --- |
| `spark.synapse.diagnostic.emitters` | Required. The comma-separated destination names of diagnostic emitters. For example, `MyDest1,MyDest2` |
| `spark.synapse.diagnostic.emitter.<destination>.type` | Required. Built-in destination type. To enable Azure Log Analytics destination, AzureLogAnalytics needs to be included in this field. |
| `spark.synapse.diagnostic.emitter.<destination>.categories` | Optional. The comma-separated selected log categories. Available values include `DriverLog`, `ExecutorLog`, `EventLog`, `Metrics`. If not set, the default value is **all** categories. |
| `spark.synapse.diagnostic.emitter.<destination>.workspaceId` | Required. To enable Azure Log Analytics destination, workspaceId needs to be included in this field. |
| `spark.synapse.diagnostic.emitter.<destination>.secret` | Optional. The secret (Log Analytics key) content.  To find this, in the Azure portal, go to Azure Log Analytics workspace > Agents > Primary key. |
| `spark.synapse.diagnostic.emitter.<destination>.secret.keyVault` | Required if `.secret` is not specified. The [Azure Key vault](https://learn.microsoft.com/azure/key-vault/general/overview) name where the secret (AccessKey or SAS) is stored. |
| `spark.synapse.diagnostic.emitter.<destination>.secret.keyVault.secretName` | Required if `.secret.keyVault` is specified. The Azure Key vault secret name where the secret is stored. |
| `spark.synapse.diagnostic.emitter.<destination>.secret.keyVault.linkedService` | Optional. The Azure Key vault linked service name. When enabled in Synapse pipeline, this is necessary to obtain the secret from Azure Key vault. (Make sure the MSI has read access to the Azure Key vault). |
| `spark.synapse.diagnostic.emitter.<destination>.filter.eventName.match` | Optional. The comma-separated Log4j logger names, you can specify which logs to collect. For example `SparkListenerApplicationStart,SparkListenerApplicationEnd` |
| `spark.synapse.diagnostic.emitter.<destination>.filter.loggerName.match` | Optional. The comma-separated log4j logger names, you can specify which logs to collect. For example: `org.apache.spark.SparkContext,org.example.Logger` |
| `spark.synapse.diagnostic.emitter.<destination>.filter.metricName.match` | Optional. The comma-separated spark metric name suffixes, you can specify which metrics to collect. For example:`jvm.heap.used` |

## Related content

 - [Run a Spark application in notebook](apache-spark-development-using-notebooks.md).
 - [Collect Apache Spark applications logs and metrics with Azure Storage account](azure-synapse-diagnostic-emitters-azure-storage.md).
 - [Collect Apache Spark applications logs and metrics with Azure Event Hubs](azure-synapse-diagnostic-emitters-azure-eventhub.md).
