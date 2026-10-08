---
title: Estimating consumption-based costs in Azure Functions
description: Learn how to better estimate the costs that you might incur when running your function app in either the Consumption plan or the Flex Consumption plan in Azure Functions.
ms.date: 02/10/2025
ms.topic: how-to
ms.custom:
  - build-2024
  - ignite-2024
  - build-2025
# Customer intent: As a cloud developer, I want to understand the overall costs of running my code in a dynamic plan in Azure Functions so that I can make better architectural and business decisions.
---

# Estimating consumption-based costs

This article shows you how to estimate plan costs for both the [Flex Consumption plan](flex-consumption-plan.md) and the legacy [Consumption plan](consumption-plan.md). 

Choose the hosting option that best supports the feature, performance, and cost requirements for your function executions. For more information, see [Azure Functions scale and hosting](functions-scale.md).

This article focuses on the two consumption plans because billing in these plans depends on active periods of executions inside each instance. 


### [Flex Consumption plan](#tab/flex-consumption-plan)

Provides fast horizontal scaling, with flexible compute options, virtual network integration, and full support for connections using Microsoft Entra ID authentication. In this plan, instances dynamically scale out based on configured per-instance concurrency, incoming events, and per-function workloads for optimal efficiency. Flex Consumption is the recommended plan for serverless hosting. For more information, see [Azure Functions Flex Consumption plan hosting](flex-consumption-plan.md).

### [Consumption plan](#tab/consumption-plan)

Provides dynamic scale and serverless hosting when your app must run on Windows, on the full .NET Framework, or with full support for PowerShell. Use the Flex Consumption plan for hosting new apps, unless your app requires these specialized hosting conditions. For more information, see [Azure Functions Consumption plan hosting](consumption-plan.md).

---

Durable Functions can also run in both of these plans. For more information about the cost considerations when using Durable Functions, see [Durable Functions billing](../durable-task/durable-functions/durable-functions-billing.md).

## Consumption-based costs

The way that consumption-based costs are calculated, including free grants, depends on the specific plan. For the most current cost and grant information, see the [Azure Functions pricing page](https://azure.microsoft.com/pricing/details/functions/).

### [Flex Consumption plan](#tab/flex-consumption-plan)

There are two modes by which your costs are determined when running your apps in the Flex Consumption plan. Each mode is determined on a per-instance basis.

| Billing mode | Description |
| --- | --- |
| **On Demand** | When running in _on demand_ mode, you are billed only for the amount of time your function code is executing on your available instances. In on demand mode, no minimum instance count is required. You're billed for:<br/><br/>• The total amount of memory provisioned while each on demand instance is _actively_ executing functions (in GB-seconds), minus a free grant of GB-s per month.<br/>• The total number of executions, minus a free grant (number) of executions per month. |
| **Always ready** | You can configure one or more instances, assigned to specific trigger types (HTTP/Durable/Blob) and individual functions, that are always available to handle requests. When you have any always ready instances enabled, you're billed for:<br/><br/>• The total amount of memory provisioned across all of your always ready instances, known as the _baseline_ (in GB-seconds).<br/>• The total amount of memory provisioned during the time each always ready instance is _actively_ executing functions (in GB-seconds).<br/>• The total number of executions.<br/><br/>In always ready billing, there are no free grants. |

For the most up-to-date information on execution pricing, always ready baseline costs, and free grants for on demand executions, see the [Azure Functions pricing page](https://azure.microsoft.com/pricing/details/functions/#pricing).


This diagram shows how on-demand costs are determined in this plan: 

Graph of Flex Consumption plan on-demand costs based on both load (instance count) and time.

In addition to execution time, when you use one or more always ready instances, you pay a lower, baseline rate for the number of always ready instances you maintain. Execution time for always ready instances might be cheaper than execution time on instances with on demand execution.   

> **Important:**
> This article uses on-demand pricing to help you understand example calculations. Always check the current costs on the [Azure Functions pricing page](https://azure.microsoft.com/pricing/details/functions/) when estimating costs you might incur while running your functions in the Flex Consumption plan. 

Consider a function app that has only HTTP triggers with these basic facts:

+ HTTP triggers handle 40 constant requests per second.
+ HTTP triggers handle 10 concurrent requests.
+ The instance memory size is 2,048 MB. 
+ You configure _no always ready instances_, which means the app can scale to zero.

In a situation like this, pricing depends more on the kind of work done during code execution. Let's look at two workload scenarios:

+ **CPU-bound workload:** In a CPU-bound workload, there's no advantage to processing multiple requests in parallel in the same instance. This limitation means that you're better off distributing each request to its own instance so requests complete as quickly as possible without contention. In this scenario, set a low [HTTP trigger concurrency](functions-concurrency.md#http-trigger-concurrency) of `1`. With 10 concurrent requests, the app scales to a steady state of roughly 10 instances, and each instance is continuously active processing one request at a time. 

    Because the size of each instance is ~2 GB, the consumption for a single continuously active instance is `2 GB * 3600 s = 7200 GB-s`. Assuming an on-demand execution rate of $0.000026 GB-s (without any free grants applied), the cost becomes `$0.1872 USD` per hour per instance. Because the CPU-bound app scales to 10 instances, the total hourly rate for execution time is `$1.872 USD`.

    Similarly, the on-demand per-execution charge (without any free grants) of 40 requests per second is equal to `40 * 3600 = 144,000` or `0.144 million` executions per hour. Assuming an on-demand rate of `$0.40` per million executions, the total (grant-free) hourly cost of executions is `0.144 * $0.40`, which is `$0.0576` per hour.
    
    In this scenario, the total hourly cost of running on-demand on 10 instances is `$1.872 + $0.0576s = $1.9296 USD`.

+ **IO bound workload:** In an IO-bound workload, most of the application time is spent waiting on incoming request, which might be limited by network throughput or other upstream factors. Because of the limited inputs, the code can process multiple operations concurrently without negative impacts. In this scenario, assume you can process all 10 concurrent requests on the same instance. 

    Because consumption charges are based only on the memory of each active instance, the consumption charge calculation is simply `2 GB * 3600 s = 7200 GB-s`, which at the assumed on-demand execution rate (without any free grants applied) is `$0.1872 USD` per hour for the single instance.

    As in the CPU-bound scenario, the on-demand per-execution charge (without any free grants) of 40 requests per second is equal to `40 * 3600 = 144,000` or 0.144 million executions per hour. In this case, the total (grant-free) hourly cost of executions `0.144 * $0.40`, which is `$0.0576` per hour.

    In this scenario, the total hourly cost of running on-demand a single instance is `$0.1872 + $0.0576 = $0.245 USD`. 

### [Consumption plan](#tab/consumption-plan)

The execution _cost_ of a single function execution is measured in _GB-seconds_. Execution cost is calculated by combining memory usage with execution time. A function that runs longer costs more, as does a function that consumes more memory. 

Consider a case where the amount of memory used by the function stays constant. In this case, calculating the cost is simple multiplication. For example, if your function consumes 0.5 GB for 3 seconds, the execution cost is `0.5GB * 3s = 1.5 GB-seconds`. 

Because memory usage changes over time, the calculation is essentially the integral of memory usage over time. The system performs this calculation by sampling the memory usage of the process (along with child processes) at regular intervals. As mentioned on the [pricing page], memory usage is rounded up to the nearest 128-MB bucket. When your process uses 160 MB, you pay for 256 MB. The calculation takes into account concurrency, which is multiple concurrent function executions in the same process.

> **Note:**
> While CPU usage isn't directly considered in execution cost, it can affect the cost when it influences the execution time of the function.

For an HTTP-triggered function, when an error occurs before your function code begins to execute, you aren't charged for an execution. This means that 401 responses from the platform due to API key validation or the App Service Authentication / Authorization feature don't count against your execution cost. Similarly, 5xx status code responses aren't counted when they occur in the platform before your function processes the request. A 5xx response generated by the platform after your function code starts to execute is still counted as an execution, even when the error isn't raised from your function code.

---

## Behaviors affecting execution time

The following behaviors of your functions can affect the execution time:

+ **Triggers and bindings**: The time taken to read input from and write output to your [function bindings](functions-triggers-bindings.md) counts as execution time. For example, when your function uses an output binding to write a message to an Azure storage queue, your execution time includes the time taken to write the message to the queue, which is included in the calculation of the function cost. 

+ **Asynchronous execution**: The time that your function waits for the results of an async request (`await` in C#) counts as execution time. The GB-second calculation is based on the start and end time of the function and the memory usage over that period. What happens over that time in terms of CPU activity isn't factored into the calculation. You might be able to reduce costs during asynchronous operations by using [Durable Functions](../durable-task/common/what-is-durable-task.md). You're not billed for time spent at awaits in orchestrator functions.

## Viewing and estimating costs from metrics

In [your invoice](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cost-management-billing/understand/download-azure-invoice.md), you can view the cost-related data along with the actual billed costs. However, this invoice data is a monthly aggregate for a past invoice period.  

This section shows you how to use metrics, both app-level and function executions, to estimate costs for running your function apps. 

### Function app-level metrics


The app-level metrics available to your app depend on the type of consumption plan you use.

#### [Flex Consumption plan](#tab/flex-consumption-plan)

These Azure Monitor metrics are related to Flex Consumption plan billing:


| Metric | Description | Meter calculation |
| --- | --- | --- |
| **On Demand Function Execution Count** | Total number of function executions in on demand instances. | `OnDemandFunctionExecutionCount` relates to the **On Demand Total Executions** meter. |
| **Always Ready Function Execution Count** | Total number of function executions in always ready instances. | `AlwaysReadyFunctionExecutionCount` relates to the **Always Ready Total Executions** meter. |
| **On Demand Function Execution Units** | Total MB-milliseconds from on demand instances while actively executing functions. | `OnDemandFunctionExecutionUnits / 1,024,000` is the On Demand Execution Time meter, in GB-seconds. |
| **Always Ready Function Execution Units** | Total MB-milliseconds from always ready instances while actively executing functions. | `AlwaysReadyFunctionExecutionUnits / 1,024,000` is the Always Ready Execution Time meter, in GB-seconds. |
| **Always Ready Units** | The total MB-milliseconds of always ready instances assigned to the app, whether or not functions are actively executing. | `AlwaysReadyUnits / 1,024,000` is the Always Ready Baseline meter, in GB-seconds. |

#### [Consumption plan](#tab/consumption-plan)

These Azure Monitor metrics are related to Consumption plan billing:


| Metric | Description |
| --- | --- |
| **FunctionExecutionCount** | Function execution count indicates the number of times your function app executed. This value correlates to the number of times a function runs in your app. This metric isn't currently supported for Premium and Dedicated (App Service) plans running on Linux. |
| **FunctionExecutionUnits** | Function execution units are a combination of execution time and your memory usage. Memory data isn't a metric currently available through Azure Monitor. However, if you want to optimize the memory usage of your app, can use the performance counter data collected by Application Insights. This metric isn't currently supported for Premium and Dedicated (App Service) plans running on Linux. |

---

For more information, see [Azure Functions monitoring data reference](monitor-functions-reference.md).

To better understand the costs of your functions, use Azure Monitor to view cost-related metrics that your function apps generate. You can view Monitor metrics by using one of these tools:

#### [Portal](#tab/portal/flex-consumption-plan)

Use [Azure Monitor metrics explorer](https://learn.microsoft.com/azure/azure-monitor/essentials/metrics-getting-started) to view cost-related data for your Flex Consumption plan function apps in a graphical format. 

1. In the [Azure portal], go to your function app.

1. In the left panel, scroll down to **Monitoring** and select **Metrics**.

1. From **Metric**, select **On Demand Function Execution Count** and **Sum** for **Aggregation**. This selection adds the sum of the execution counts during the chosen period to the chart.

1. Select **Add metric** and add **On Demand Function Execution Units**, **Always Ready Function Execution Count**, **Always Ready Function Execution Units**, and **Always Ready Units**  to the chart. 

The resulting chart contains the totals for all the Flex Consumption execution metrics in the chosen time range, which in this example is a custom time range.

Graph of On Demand Function Execution Counts and On Demand Function Execution Units.

Because the number of On Demand Function Execution Units is greater than On Demand Function Execution Count, and there were no [always ready instances](flex-consumption-plan.md#always-ready-instances) on the app, the chart just shows On Demand Function Execution Units.

This chart shows a total of 3.54 billion `On Demand Function Execution Units` consumed in a 16-minute period, measured in MB-milliseconds. To convert to GB-seconds, divide by 1,024,000. In this example, the function app consumed `3,540,000,000 / 1,024,000 = 3,457.03` GB-seconds. You can take this value and multiply it by the current price of On Demand Execution Time on the [Functions pricing page](https://azure.microsoft.com/pricing/details/functions/), which gives you the cost of these 16 minutes, assuming you already used any free grants of execution time. You can use this same calculation with the The Always Ready Function Execution Units metric and the Always Ready Execution Time billing meter cost, as well as with the Always Ready Units metric and the Always Ready Baseline billing meter cost, to find out the GB-seconds costs for always ready instances.

To calculate the On Demand Total Executions cost, take the On Demand Function Execution Count sum for the same time period, convert to millions, and then multiply by the On Demand Total Executions price on the [Functions pricing page](https://azure.microsoft.com/pricing/details/functions/). For example, 2,100 executions in the example above converts to `0.0021` million executions. You can use this same calculation with the Always Ready Function Execution Count metric and the Always Ready Total Executions billing meter to find out the cost for executions handled by always ready instance.

#### [Azure CLI](#tab/azure-cli/flex-consumption-plan)

The [Azure CLI](https://learn.microsoft.com/cli/azure/) has commands for retrieving metrics. You can execute CLI commands locally or in the portal using [Azure Cloud Shell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/overview.md). For example, the following [az monitor metrics list](https://learn.microsoft.com/cli/azure/monitor/metrics#az-monitor-metrics-list) command returns hourly data over the same time period used before.

Make sure to replace `<AZURE_SUBSCRIPTION_ID>` with your Azure subscription ID running the command, `<RESOURCE_GROUP_NAME>` with the resource group name, and `<FUNCTION_APP_NAME>` with the function app name.

```azurecli-interactive
az monitor metrics list --resource /subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP_NAME>/providers/Microsoft.Web/sites/<FUNCTION_APP_NAME> --metric OnDemandFunctionExecutionUnits,OnDemandFunctionExecutionCount,AlwaysReadyFunctionExecutionUnits,AlwaysReadyUnits,AlwaysReadyFunctionExecutionCount --aggregation Total --interval PT1H --start-time 2025-10-24T16:24:00Z --end-time 2025-10-24T16:33:00Z
```

This command returns a JSON payload that looks like the following example:

```json
{
  "cost": 40,
  "interval": "PT1H",
  "namespace": "Microsoft.Web/sites",
  "resourceregion": "westus2",
  "timespan": "2025-10-24T16:24:00Z/2025-10-24T16:33:00Z",
  "value": [
    {
      "displayDescription": "On Demand Function Execution Units. For Flex Consumption FunctionApps only.",
      "errorCode": "Success",
      "id": "/subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/rg-eventhubs-demo/providers/Microsoft.Web/sites/func-wht2hopc4l7vi/providers/Microsoft.Insights/metrics/OnDemandFunctionExecutionUnits",
      "name": {
        "localizedValue": "On Demand Function Execution Units",
        "value": "OnDemandFunctionExecutionUnits"
      },
      "resourceGroup": "rg-eventhubs-demo",
      "timeseries": [
        {
          "data": [
            {
              "timeStamp": "2025-10-24T16:24:00Z",
              "total": 3540992000.0
            }
          ],
          "metadatavalues": []
        }
      ],
      "type": "Microsoft.Insights/metrics",
      "unit": "Count"
    },
    {
      "displayDescription": "On Demand Function Execution Count. For Flex Consumption FunctionApps only.",
      "errorCode": "Success",
      "id": "/subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/rg-eventhubs-demo/providers/Microsoft.Web/sites/func-wht2hopc4l7vi/providers/Microsoft.Insights/metrics/OnDemandFunctionExecutionCount",
      "name": {
        "localizedValue": "On Demand Function Execution Count",
        "value": "OnDemandFunctionExecutionCount"
      },
      "resourceGroup": "rg-eventhubs-demo",
      "timeseries": [
        {
          "data": [
            {
              "timeStamp": "2025-10-24T16:24:00Z",
              "total": 2102.0
            }
          ],
          "metadatavalues": []
        }
      ],
      "type": "Microsoft.Insights/metrics",
      "unit": "Count"
    },
    {
      "displayDescription": "Always Ready Function Execution Units. For Flex Consumption FunctionApps only.",
      "errorCode": "Success",
      "id": "/subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/rg-eventhubs-demo/providers/Microsoft.Web/sites/func-wht2hopc4l7vi/providers/Microsoft.Insights/metrics/AlwaysReadyFunctionExecutionUnits",
      "name": {
        "localizedValue": "Always Ready Function Execution Units",
        "value": "AlwaysReadyFunctionExecutionUnits"
      },
      "resourceGroup": "rg-eventhubs-demo",
      "timeseries": [
        {
          "data": [
            {
              "timeStamp": "2025-10-24T16:24:00Z",
              "total": 0.0
            }
          ],
          "metadatavalues": []
        }
      ],
      "type": "Microsoft.Insights/metrics",
      "unit": "Count"
    },
    {
      "displayDescription": "Always Ready Units. For Flex Consumption FunctionApps only.",
      "errorCode": "Success",
      "id": "/subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/rg-eventhubs-demo/providers/Microsoft.Web/sites/func-wht2hopc4l7vi/providers/Microsoft.Insights/metrics/AlwaysReadyUnits",
      "name": {
        "localizedValue": "Always Ready Units",
        "value": "AlwaysReadyUnits"
      },
      "resourceGroup": "rg-eventhubs-demo",
      "timeseries": [
        {
          "data": [
            {
              "timeStamp": "2025-10-24T16:24:00Z",
              "total": 0.0
            }
          ],
          "metadatavalues": []
        }
      ],
      "type": "Microsoft.Insights/metrics",
      "unit": "Count"
    },
    {
      "displayDescription": "Always Ready Function Execution Count. For Flex Consumption FunctionApps only.",
      "errorCode": "Success",
      "id": "/subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/rg-eventhubs-demo/providers/Microsoft.Web/sites/func-wht2hopc4l7vi/providers/Microsoft.Insights/metrics/AlwaysReadyFunctionExecutionCount",
      "name": {
        "localizedValue": "Always Ready Function Execution Count",
        "value": "AlwaysReadyFunctionExecutionCount"
      },
      "resourceGroup": "rg-eventhubs-demo",
      "timeseries": [
        {
          "data": [
            {
              "timeStamp": "2025-10-24T16:24:00Z",
              "total": 0.0
            }
          ],
          "metadatavalues": []
        }
      ],
      "type": "Microsoft.Insights/metrics",
      "unit": "Count"
    }
  ]
}

```
This particular response shows that from `2025-10-24T16:24:00Z` to `2025-10-24T16:33:00Z`, the app consumed 3,540,992,000 MB-milliseconds (3458.00 GB-seconds) of On Demand Function Execution Units, and 2,102 executions (0.0021 million executions) of On Demand Function Execution Counts.

#### [Azure PowerShell](#tab/azure-powershell/flex-consumption-plan) 

The [Azure PowerShell](https://learn.microsoft.com/powershell/azure/) has commands for retrieving metrics. You can use Azure PowerShell from a local command environment or directly from the portal using [Azure Cloud Shell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/overview.md). For example, the following [Get-AzMetric](https://learn.microsoft.com/powershell/module/az.monitor/get-azmetric) command returns hourly data over the same time period used before.

Make sure to replace `<AZURE_SUBSCRIPTION_ID>` with your Azure subscription ID running the command, `<RESOURCE_GROUP_NAME>` with the resource group name, and `<FUNCTION_APP_NAME>` with the function app name.

```azurepowershell-interactive
Get-AzMetric -ResourceId /subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP_NAME>/providers/Microsoft.Web/sites/<FUNCTION_APP_NAME> -MetricName OnDemandFunctionExecutionUnits,OnDemandFunctionExecutionCount,AlwaysReadyFunctionExecutionUnits,AlwaysReadyUnits,AlwaysReadyFunctionExecutionCount -AggregationType Total -TimeGrain 01:00:00 -StartTime 2025-10-24T16:24:00Z -EndTime 2025-10-24T16:33:00Z
```

This command returns an output that looks like the following example:

```Output
Id         : /subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/rg-eventhubs-demo/providers/Microsoft.Web/sites/func-wht2hopc4l7vi/providers/Microsoft.Insights/metrics/OnDemandFunctionExecutionUnits
Name       : 
                LocalizedValue : On Demand Function Execution Units
                Value          : OnDemandFunctionExecutionUnits
             
Type       : Microsoft.Insights/metrics
Unit       : Count
Data       : {Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue…}
Timeseries : {Microsoft.Azure.Management.Monitor.Models.TimeSeriesElement}

Id         : /subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/rg-eventhubs-demo/providers/Microsoft.Web/sites/func-wht2hopc4l7vi/providers/Microsoft.Insights/metrics/OnDemandFunctionExecutionCount
Name       : 
                LocalizedValue : On Demand Function Execution Count
                Value          : OnDemandFunctionExecutionCount
             
Type       : Microsoft.Insights/metrics
Unit       : Count
Data       : {Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue…}
Timeseries : {Microsoft.Azure.Management.Monitor.Models.TimeSeriesElement}

Id         : /subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/rg-eventhubs-demo/providers/Microsoft.Web/sites/func-wht2hopc4l7vi/providers/Microsoft.Insights/metrics/AlwaysReadyFunctionExecutionUnits
Name       : 
                LocalizedValue : Always Ready Function Execution Units
                Value          : AlwaysReadyFunctionExecutionUnits
             
Type       : Microsoft.Insights/metrics
Unit       : Count
Data       : {Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue…}
Timeseries : {Microsoft.Azure.Management.Monitor.Models.TimeSeriesElement}

Id         : /subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/rg-eventhubs-demo/providers/Microsoft.Web/sites/func-wht2hopc4l7vi/providers/Microsoft.Insights/metrics/AlwaysReadyUnits
Name       : 
                LocalizedValue : Always Ready Units
                Value          : AlwaysReadyUnits
             
Type       : Microsoft.Insights/metrics
Unit       : Count
Data       : {Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue…}
Timeseries : {Microsoft.Azure.Management.Monitor.Models.TimeSeriesElement}

Id         : /subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/rg-eventhubs-demo/providers/Microsoft.Web/sites/func-wht2hopc4l7vi/providers/Microsoft.Insights/metrics/AlwaysReadyFunctionExecutionCount
Name       : 
                LocalizedValue : Always Ready Function Execution Count
                Value          : AlwaysReadyFunctionExecutionCount
             
Type       : Microsoft.Insights/metrics
Unit       : Count
Data       : {Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue…}
Timeseries : {Microsoft.Azure.Management.Monitor.Models.TimeSeriesElement}
```

The `Data` property contains the actual metric values.

#### [Portal](#tab/portal/consumption-plan)

Use [Azure Monitor metrics explorer](https://learn.microsoft.com/azure/azure-monitor/essentials/metrics-getting-started) to view cost-related data for your Consumption plan function apps in a graphical format. 

1. In the [Azure portal], go to your function app.

1. In the left panel, scroll down to **Monitoring** and select **Metrics**.  

1. From **Metric**, select **Function Execution Count** and **Sum** for **Aggregation**. This selection adds the sum of the execution counts during the chosen period to the chart.

    Define a functions app metric to add to the chart

1. Select **Add metric** and repeat steps 2-4 to add **Function Execution Units** to the chart. 

The resulting chart contains the totals for both execution metrics in the chosen time range, which in this case is two hours.

Graph of function execution counts and execution units

Because the number of execution units is much greater than the execution count, the chart shows only execution units.

This chart shows a total of 1.11 billion `Function Execution Units` consumed in a two-hour period, measured in MB-milliseconds. To convert to GB-seconds, divide by 1,024,000. In this example, the function app consumed `1,110,000,000 / 1,024,000 = 1,083.98` GB-seconds. Multiply this value by the current price of execution time on the [Functions pricing page](https://azure.microsoft.com/pricing/details/functions/), which gives you the cost of these two hours, assuming you already used any free grants of execution time. 

#### [Azure CLI](#tab/azure-cli/consumption-plan)

The [Azure CLI](https://learn.microsoft.com/cli/azure/) has commands for retrieving metrics. You can execute CLI commands locally or in the portal using [Azure Cloud Shell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/overview.md). For example, the following [az monitor metrics list](https://learn.microsoft.com/cli/azure/monitor/metrics#az-monitor-metrics-list) command returns hourly data over the same time period used before.

Make sure to replace `<AZURE_SUBSCRIPTION_ID>` with your Azure subscription ID running the command.

```azurecli-interactive
az monitor metrics list --resource /subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/metrics-testing-consumption/providers/Microsoft.Web/sites/metrics-testing-consumption --metric FunctionExecutionUnits,FunctionExecutionCount --aggregation Total --interval PT1H --start-time 2019-09-11T21:46:00Z --end-time 2019-09-11T23:18:00Z
```

This command returns a JSON payload that looks like the following example:

```json
{
  "cost": 0.0,
  "interval": "1:00:00",
  "namespace": "Microsoft.Web/sites",
  "resourceregion": "centralus",
  "timespan": "2019-09-11T21:46:00Z/2019-09-11T23:18:00Z",
  "value": [
    {
      "id": "/subscriptions/XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXX/resourceGroups/metrics-testing-consumption/providers/Microsoft.Web/sites/metrics-testing-consumption/providers/Microsoft.Insights/metrics/FunctionExecutionUnits",
      "name": {
        "localizedValue": "Function Execution Units",
        "value": "FunctionExecutionUnits"
      },
      "resourceGroup": "metrics-testing-consumption",
      "timeseries": [
        {
          "data": [
            {
              "average": null,
              "count": null,
              "maximum": null,
              "minimum": null,
              "timeStamp": "2019-09-11T21:46:00+00:00",
              "total": 793294592.0
            },
            {
              "average": null,
              "count": null,
              "maximum": null,
              "minimum": null,
              "timeStamp": "2019-09-11T22:46:00+00:00",
              "total": 316576256.0
            }
          ],
          "metadatavalues": []
        }
      ],
      "type": "Microsoft.Insights/metrics",
      "unit": "Count"
    },
    {
      "id": "/subscriptions/XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXX/resourceGroups/metrics-testing-consumption/providers/Microsoft.Web/sites/metrics-testing-consumption/providers/Microsoft.Insights/metrics/FunctionExecutionCount",
      "name": {
        "localizedValue": "Function Execution Count",
        "value": "FunctionExecutionCount"
      },
      "resourceGroup": "metrics-testing-consumption",
      "timeseries": [
        {
          "data": [
            {
              "average": null,
              "count": null,
              "maximum": null,
              "minimum": null,
              "timeStamp": "2019-09-11T21:46:00+00:00",
              "total": 33538.0
            },
            {
              "average": null,
              "count": null,
              "maximum": null,
              "minimum": null,
              "timeStamp": "2019-09-11T22:46:00+00:00",
              "total": 13040.0
            }
          ],
          "metadatavalues": []
        }
      ],
      "type": "Microsoft.Insights/metrics",
      "unit": "Count"
    }
  ]
}
```
This particular response shows that from `2019-09-11T21:46` to `2019-09-11T23:18`, the app consumed 1,110,000,000 MB-milliseconds (1,083.98 GB-seconds).

#### [Azure PowerShell](#tab/azure-powershell/consumption-plan) 

The [Azure PowerShell](https://learn.microsoft.com/powershell/azure/) has commands for retrieving metrics. You can use Azure PowerShell from a local command environment or directly from the portal using [Azure Cloud Shell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/overview.md). For example, the following [Get-AzMetric](https://learn.microsoft.com/powershell/module/az.monitor/get-azmetric) command returns hourly data over the same time period used before.

Make sure to replace `<AZURE_SUBSCRIPTION_ID>` with your Azure subscription ID running the command.

```azurepowershell-interactive
Get-AzMetric -ResourceId /subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/metrics-testing-consumption/providers/Microsoft.Web/sites/metrics-testing-consumption -MetricName  FunctionExecutionUnits,FunctionExecutionCount -AggregationType Total -TimeGrain 01:00:00 -StartTime 2019-09-11T21:46:00Z -EndTime 2019-09-11T23:18:00Z
```

This command returns an output that looks like the following example:

```Output
Id         : /subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/metrics-testing-consumption/providers/Microsoft.Web/sites/metrics-testing-consumption/providers/Microsoft.Insights/metrics/FunctionExecutionUnits
Name       : 
                LocalizedValue : Function Execution Units
                Value          : FunctionExecutionUnits
             
Type       : Microsoft.Insights/metrics
Unit       : Count
Data       : {Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue…}
Timeseries : {Microsoft.Azure.Management.Monitor.Models.TimeSeriesElement}

Id         : /subscriptions/<AZURE_SUBSCRIPTION_ID>/resourceGroups/metrics-testing-consumption/providers/Microsoft.Web/sites/metrics-testing-consumption/providers/Microsoft.Insights/metrics/FunctionExecutionCount
Name       : 
                LocalizedValue : Function Execution Count
                Value          : FunctionExecutionCount
             
Type       : Microsoft.Insights/metrics
Unit       : Count
Data       : {Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue, 
             Microsoft.Azure.Commands.Insights.OutputClasses.PSMetricValue…}
Timeseries : {Microsoft.Azure.Management.Monitor.Models.TimeSeriesElement}
```

The `Data` property contains the actual metric values.

---

[Azure portal]: https://portal.azure.com


### Function-level metrics

Memory usage is important when estimating costs of your function executions. However, the way memory usage impacts your costs depends on the specific plan type:

### [Flex Consumption plan](#tab/flex-consumption-plan)

In the Flex Consumption plan, you pay for the time the instance runs based on your chosen [instance size](flex-consumption-plan.md#instance-sizes), which has a set memory limit. For more information, see [Billing](flex-consumption-plan.md#billing).

### [Consumption plan](#tab/consumption-plan)

In the Consumption plan, billing is based on function execution units that combine execution time and memory usage. For more information, see [Billing](consumption-plan.md#billing). 

Memory data isn't a metric currently available through Azure Monitor. However, if you want to model or optimize the memory usage of your app, you can use the performance counter data collected by Application Insights.  

---

If you haven't already done so, [enable Application Insights in your function app](configure-monitoring.md#enable-application-insights-integration). With this integration enabled, you can [query this telemetry data in the portal](analyze-telemetry-data.md#query-telemetry-data). 

You can use either [Azure Monitor metrics explorer](https://learn.microsoft.com/azure/azure-monitor/essentials/metrics-getting-started) in the [Azure portal] or REST APIs to get Monitor Metrics data.

#### Determine memory usage 

Under **Monitoring**, select **Logs (Analytics)**, then copy the following telemetry query and paste it into the query window and select **Run**. This query returns the total memory usage at each sampled time.

```
performanceCounters
| where name == "Private Bytes"
| project timestamp, name, value
```

The results look like the following example:

| timestamp \[UTC\] | name | value |
| --- | --- | --- |
| 9/12/2019, 1:05:14\.947 AM | Private Bytes | 209,932,288 |
| 9/12/2019, 1:06:14\.994 AM | Private Bytes | 212,189,184 |
| 9/12/2019, 1:06:30\.010 AM | Private Bytes | 231,714,816 |
| 9/12/2019, 1:07:15\.040 AM | Private Bytes | 210,591,744 |
| 9/12/2019, 1:12:16\.285 AM | Private Bytes | 216,285,184 |
| 9/12/2019, 1:12:31\.376 AM | Private Bytes | 235,806,720 |

#### Determine duration 

Azure Monitor tracks metrics at the resource level, which for Functions is the function app. Application Insights integration emits metrics on a per-function basis. Here's an example analytics query to get the average duration of a function:

```
customMetrics
| where name contains "Duration"
| extend averageDuration = valueSum / valueCount
| summarize averageDurationMilliseconds=avg(averageDuration) by name
```

| name | averageDurationMilliseconds |
| --- | --- |
| QueueTrigger AvgDurationMs | 16\.087 |
| QueueTrigger MaxDurationMs | 90\.249 |
| QueueTrigger MinDurationMs | 8\.522 |


## Other related costs

When estimating the overall cost of running your functions in any plan, remember that the Functions runtime uses several other Azure services, which are each billed separately. When you estimate pricing for function apps, any triggers and bindings you have that integrate with other Azure services require you to create and pay for those other services. 

For functions running in a Consumption plan, the total cost is the execution cost of your functions, plus the cost of bandwidth and other services. 

When estimating the overall costs of your function app and related services, use the [Azure pricing calculator](https://azure.microsoft.com/pricing/calculator/?service=functions). 

| Related cost | Description |
| --- | --- |
| **Storage account** | Each function app requires that you have an associated General Purpose [Azure Storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-introduction.md#types-of-storage-accounts), which is [billed separately](https://azure.microsoft.com/pricing/details/storage/). This account is used internally by the Functions runtime, but you can also use it for Storage triggers and bindings. If you don't have a storage account, one is created for you when the function app is created. To learn more, see [Storage account requirements](storage-considerations.md#storage-account-requirements). |
| **Application Insights** | Functions relies on [Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview) to provide a high-performance monitoring experience for your function apps. While not required, you should [enable Application Insights integration](configure-monitoring.md#enable-application-insights-integration). A free grant of telemetry data is included every month. To learn more, see [the Azure Monitor pricing page](https://azure.microsoft.com/pricing/details/monitor/). |
| **Network bandwidth** | You can incur costs for data transfer depending on the direction and scenario of the data movement. To learn more, see [Bandwidth pricing details](https://azure.microsoft.com/pricing/details/bandwidth/). |

## Next steps

> 
> [Learn more about Monitoring function apps](functions-monitoring.md)

[pricing page]:https://azure.microsoft.com/pricing/details/functions/
[Azure portal]: https://portal.azure.com
