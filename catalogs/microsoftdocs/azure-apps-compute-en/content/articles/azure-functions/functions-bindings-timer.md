---
title: Timer trigger for Azure Functions
description: Understand how to use timer triggers in Azure Functions.
ms.assetid: d2f013d1-f458-42ae-baf8-1810138118ac
ms.topic: reference
ms.date: 06/21/2026
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, powershell, python
ms.custom: devx-track-csharp, devx-track-python, devx-track-extended-java, devx-track-js, devx-track-ts
zone_pivot_groups: programming-languages-set-functions
---

# Timer trigger for Azure Functions

This article explains how to work with timer triggers in Azure Functions. A timer trigger lets you run a function on a schedule.


This is reference information for Azure Functions developers. If you're new to Azure Functions, start with the following resources:

* [Azure Functions developer reference](functions-reference.md)
**Applies to: programming-language-csharp**

* [Create your first function](how-to-create-function-vs-code.md?pivot=programming-language-csharp)

* C# developer references:
    * [In-process class library](functions-dotnet-class-library.md)
    * [Isolated worker process class library](dotnet-isolated-process-guide.md)
    * [C# script](functions-reference-csharp.md)

**Applies to: programming-language-javascript**

* [Create your first function](how-to-create-function-vs-code.md?pivot=programming-language-javascript)

* [JavaScript developer reference](functions-reference-node.md?tabs=javascript)

**Applies to: programming-language-typescript**

* [Create your first function](how-to-create-function-vs-code.md?pivot=programming-language-typescript)

* [TypeScript developer reference](functions-reference-node.md?tabs=typescript)

**Applies to: programming-language-java**

* [Create your first function](how-to-create-function-azure-cli.md?pivots=programming-language-java)

* [Java developer reference](functions-reference-java.md)

**Applies to: programming-language-python**

* [Create your first function](how-to-create-function-vs-code.md?pivot=programming-language-python)

* [Python developer reference](functions-reference-python.md)

**Applies to: programming-language-powershell**

* [Create your first function](how-to-create-function-vs-code.md?pivot=programming-language-powershell)

* [PowerShell developer reference](functions-reference-powershell.md)

* [Azure Functions triggers and bindings concepts](functions-triggers-bindings.md)

* [Code and test Azure Functions locally](functions-develop-local.md)


For information on how to manually run a timer-triggered function, see [Manually run a non HTTP-triggered function](functions-manually-run-non-http.md).


Support for this binding is automatically provided in all development environments. You don't have to manually install the package or register the extension.

Source code for the timer extension package is in the [azure-webjobs-sdk-extensions](https://github.com/Azure/azure-webjobs-sdk-extensions/blob/master/src/WebJobs.Extensions/Extensions/Timers/) GitHub repository.

**Applies to: programming-language-javascript,programming-language-typescript**


> **Important:**
> This article uses tabs to support multiple versions of the Node.js programming model. The v4 model is generally available and is designed to have a more flexible and intuitive experience for JavaScript and TypeScript developers. For more details about how the v4 model works, refer to the [Azure Functions Node.js developer guide](functions-reference-node.md). To learn more about the differences between v3 and v4, refer to the [migration guide](functions-node-upgrade-v4.md). 


**Applies to: programming-language-python**

Azure Functions supports two programming models for Python. The way that you define your bindings depends on your chosen programming model.

# [v2](#tab/python-v2)
The Python v2 programming model lets you define bindings using decorators directly in your Python function code. For more information, see the [Python developer guide](functions-reference-python.md?pivots=python-mode-decorators#programming-model).

# [v1](#tab/python-v1)
The Python v1 programming model requires you to define bindings in a separate *function.json* file in the function folder. For more information, see the [Python developer guide](functions-reference-python.md?pivots=python-mode-configuration#programming-model).

---

This article supports both programming models.



For a complete end-to-end example of using the timer trigger, see [Run scheduled tasks using Azure Functions](scenario-scheduled-tasks.md).

## Example

**Applies to: programming-language-csharp**


This example shows a C# function that executes each time the minutes have a value divisible by five. For example, when the function starts at 18:55:00, the next execution is at 19:00:00. A `TimerInfo` object is passed to the function.


A C# function can be created by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. Isolated worker process is required to support C# functions running on LTS and non-LTS versions .NET and the .NET Framework. Extensions for isolated worker process functions use `Microsoft.Azure.Functions.Worker.Extensions.*` namespaces.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Functions runtime. In a variation of this model, Functions can be run using [C# scripting](functions-reference-csharp.md), which is supported primarily for C# portal editing. Extensions for in-process functions use `Microsoft.Azure.WebJobs.Extensions.*` namespaces.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

# [Isolated worker model](#tab/isolated-process)

[Code reference unavailable in this source snapshot: ~/azure-functions-dotnet-worker/samples/Extensions/Timer/TimerFunction.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-timer.md)

# [In-process model](#tab/in-process)

```csharp
[FunctionName("TimerTriggerCSharp")]
public static void Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer, ILogger log)
{
    if (myTimer.IsPastDue)
    {
        log.LogInformation("Timer is running late!");
    }
    log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
}
```

---



**Applies to: programming-language-java**


The following example function triggers and executes every five minutes. The `@TimerTrigger` annotation on the function defines the schedule using the same string format as [cron expressions](https://en.wikipedia.org/wiki/Cron#CRON_expression).

```java
@FunctionName("keepAlive")
public void keepAlive(
  @TimerTrigger(name = "keepAliveTrigger", schedule = "0 */5 * * * *") String timerInfo,
      ExecutionContext context
 ) {
     // timeInfo is a JSON string, you can deserialize it to an object using your favorite JSON library
     context.getLogger().info("Timer is triggered: " + timerInfo);
}
```



**Applies to: programming-language-python**


The following example shows a timer trigger binding and function code that uses the binding, where an instance representing the timer is passed to the function. The function writes a log indicating whether this function invocation is due to a missed schedule occurrence. The example depends on whether you use the [v1 or v2 Python programming model](functions-reference-python.md).

# [v2](#tab/python-v2)

```python
import datetime
import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="mytimer")
@app.timer_trigger(schedule="0 */5 * * * *", 
              arg_name="mytimer",
              run_on_startup=False) 
def test_function(mytimer: func.TimerRequest) -> None:
    utc_timestamp = datetime.datetime.utcnow().replace(
        tzinfo=datetime.timezone.utc).isoformat()
    if mytimer.past_due:
        logging.info('The timer is past due!')
    logging.info('Python timer trigger function ran at %s', utc_timestamp)
```

# [v1](#tab/python-v1)

Here's the binding data in the *function.json* file:

```json
{
    "schedule": "0 */5 * * * *",
    "name": "myTimer",
    "type": "timerTrigger",
    "direction": "in"
}
```

Here's the Python code, where the object passed into the function is of type [azure.functions.TimerRequest object](https://learn.microsoft.com/python/api/azure-functions/azure.functions.timerrequest).

```python
import datetime
import logging

import azure.functions as func


def main(mytimer: func.TimerRequest) -> None:
    utc_timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()

    if mytimer.past_due:
        logging.info('The timer is past due!')

    logging.info('Python timer trigger function ran at %s', utc_timestamp)
```

---



**Applies to: programming-language-typescript**


The following example shows a timer trigger [TypeScript function](functions-reference-node.md?tabs=typescript).

# [Model v4](#tab/nodejs-v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/ts/src/functions/timerTrigger1.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-timer.md)

# [Model v3](#tab/nodejs-v3)

TypeScript samples are not documented for model v3.

---



**Applies to: programming-language-javascript**


The following example shows a timer trigger [JavaScript function](functions-reference-node.md).

# [Model v4](#tab/nodejs-v4)

[Code reference unavailable in this source snapshot: ~/azure-functions-nodejs-v4/js/src/functions/timerTrigger1.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-timer.md)

# [Model v3](#tab/nodejs-v3)

Here's the binding data in the *function.json* file:

```json
{
    "schedule": "0 */5 * * * *",
    "name": "myTimer",
    "type": "timerTrigger",
    "direction": "in"
}
```

Here's the JavaScript code:

```JavaScript
module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();

    if (myTimer.isPastDue)
    {
        context.log('Node is running late!');
    }
    context.log('Node timer trigger function ran!', timeStamp);   
};
```

---



**Applies to: programming-language-powershell**


Here's the binding data in the *function.json* file:

```json
{
    "schedule": "0 */5 * * * *",
    "name": "myTimer",
    "type": "timerTrigger",
    "direction": "in"
}
```

The following is the timer function code in the run.ps1 file:

```powershell
# Input bindings are passed in via param block.
param($myTimer)

# Get the current universal time in the default string format.
$currentUTCtime = (Get-Date).ToUniversalTime()

# The 'IsPastDue' property is 'true' when the current function invocation is later than scheduled.
if ($myTimer.IsPastDue) {
    Write-Host "PowerShell timer is running late!"
}

# Write an information log with the current time.
Write-Host "PowerShell timer trigger function ran! TIME: $currentUTCtime"
```


**Applies to: programming-language-go**


The following example shows a timer trigger function that runs every five minutes:

```go
package main

import (
	"context"
	"log"

	"github.com/azure/azure-functions-golang-worker/sdk"
	"github.com/azure/azure-functions-golang-worker/sdk/bindings"
	"github.com/azure/azure-functions-golang-worker/worker"
)

func main() {
	app := sdk.FunctionApp()
	app.Timer("timerTrigger", timerHandler,
		sdk.WithSchedule("0 */5 * * * *"),
	)
	worker.Start(app)
}

func timerHandler(ctx context.Context, timer bindings.TimerInfo) error {
	log.Printf("Timer trigger function ran at: %s", timer.ScheduleStatus.Next)
	if timer.IsPastDue {
		log.Println("Timer is running late!")
	}
	return nil
}
```



**Applies to: programming-language-csharp**

## Attributes

[In-process](functions-dotnet-class-library.md) C# library uses [TimerTriggerAttribute](https://github.com/Azure/azure-webjobs-sdk-extensions/blob/master/src/WebJobs.Extensions/Extensions/Timers/TimerTriggerAttribute.cs) from [Microsoft.Azure.WebJobs.Extensions](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions) whereas [isolated worker process](dotnet-isolated-process-guide.md) C# library uses [TimerTriggerAttribute](https://github.com/Azure/azure-functions-dotnet-worker/blob/main/extensions/Worker.Extensions.Timer/src/TimerTriggerAttribute.cs) from [Microsoft.Azure.Functions.Worker.Extensions.Timer](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Timer) to define the function. C# script instead uses a [function.json configuration file](#configuration).

# [Isolated worker model](#tab/isolated-process)

| Attribute property | Description |
| --- | --- |
| **Schedule** | A [cron expression](#ncrontab-expressions) or a [TimeSpan](#timespan) value. A `TimeSpan` can be used only for a function app that runs on an App Service Plan. You can put the schedule expression in an app setting and set this property to the app setting name wrapped in **%** signs, as `%ScheduleAppSetting%`. For more information, see [Work with application settings](functions-how-to-use-azure-function-app-settings.md#settings). |
| **RunOnStartup** | If `true`, the function is invoked when the runtime starts. For example, the runtime starts when the function app wakes up after going idle due to inactivity, when the function app restarts due to function changes, and when the function app scales out. *Use with caution.* **RunOnStartup** should rarely if ever be set to `true`, especially in production. |
| **UseMonitor** | Set to `true` or `false` to indicate whether the schedule should be monitored. Schedule monitoring persists schedule occurrences to aid in ensuring the schedule is maintained correctly even when function app instances restart. If not set explicitly, the default is `true` for schedules that have a recurrence interval greater than or equal to 1 minute. For schedules that trigger more than once per minute, the default is `false`. |

# [In-process model](#tab/in-process)

| Attribute property | Description |
| --- | --- |
| **Schedule** | A [NCRONTAB expression](#ncrontab-expressions) or a [TimeSpan](#timespan) value. A `TimeSpan` can be used only for a function app that runs on an App Service Plan. You can put the schedule expression in an app setting and set this property to the app setting name wrapped in **%** signs, as `%ScheduleAppSetting%`. For more information, see [Work with application settings](functions-how-to-use-azure-function-app-settings.md#settings). |
| **RunOnStartup** | If `true`, the function is invoked when the runtime starts. For example, the runtime starts when the function app wakes up after going idle due to inactivity, when the function app restarts due to function changes, and when the function app scales out. *Use with caution.* **RunOnStartup** should rarely if ever be set to `true`, especially in production. |
| **UseMonitor** | Set to `true` or `false` to indicate whether the schedule should be monitored. Schedule monitoring persists schedule occurrences to aid in ensuring the schedule is maintained correctly even when function app instances restart. If not set explicitly, the default is `true` for schedules that have a recurrence interval greater than or equal to 1 minute. For schedules that trigger more than once per minute, the default is `false`. |

---



**Applies to: programming-language-python**

## Decorators

_Applies only to the Python v2 programming model._

For Python v2 functions defined using a decorator, the following properties on the `schedule`:

| Property | Description |
| --- | --- |
| `arg_name` | The name of the variable that represents the timer object in function code. |
| `schedule` | A [NCRONTAB expression](#ncrontab-expressions) or a [TimeSpan](#timespan) value. A `TimeSpan` can be used only for a function app that runs on an App Service Plan. You can put the schedule expression in an app setting and set this property to the app setting name wrapped in **%** signs, as in this example: "%ScheduleAppSetting%". For more information, see [Work with application settings](functions-how-to-use-azure-function-app-settings.md#settings). |
| `run_on_startup` | If `true`, the function is invoked when the runtime starts. For example, the runtime starts when the function app wakes up after going idle due to inactivity, when the function app restarts due to function changes, and when the function app scales out. *Use with caution.* **runOnStartup** should rarely if ever be set to `true`, especially in production. |
| `use_monitor` | Set to `true` or `false` to indicate whether the schedule should be monitored. Schedule monitoring persists schedule occurrences to aid in ensuring the schedule is maintained correctly even when function app instances restart. If not set explicitly, the default is `true` for schedules that have a recurrence interval greater than or equal to 1 minute. For schedules that trigger more than once per minute, the default is `false`. |

For Python functions defined by using *function.json*, see the [Configuration](#configuration) section.



**Applies to: programming-language-java**

## Annotations

The `@TimerTrigger` annotation on the function defines the `schedule` using the same string format as [cron expressions](https://en.wikipedia.org/wiki/Cron#CRON_expression). The annotation supports the following settings:

+ [dataType](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.timertrigger.datatype)
+ [name](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.timertrigger.name)
+ [schedule](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.timertrigger.schedule)

> **Note:**
> The `runOnStartup` and `useMonitor=true` settings aren't applicable to Java functions. These settings aren't supported by the Java `@TimerTrigger` annotation.



**Applies to: programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**

 
## Configuration


**Applies to: programming-language-python**

_Applies only to the Python v1 programming model._


**Applies to: programming-language-javascript,programming-language-typescript**


# [Model v4](#tab/nodejs-v4)

The following table explains the properties that you can set on the `options` object passed to the `app.timer()` method.

| Property | Description |
| --- | --- |
| **schedule** | A [NCRONTAB expression](#ncrontab-expressions) or a [TimeSpan](#timespan) value. A `TimeSpan` can be used only for a function app that runs on an App Service Plan. You can put the schedule expression in an app setting and set this property to the app setting name wrapped in **%** signs, as in this example: "%ScheduleAppSetting%". For more information, see [Work with application settings](functions-how-to-use-azure-function-app-settings.md#settings). |
| **runOnStartup** | If `true`, the function is invoked when the runtime starts. For example, the runtime starts when the function app wakes up after going idle due to inactivity, when the function app restarts due to function changes, and when the function app scales out. *Use with caution.* **runOnStartup** should rarely if ever be set to `true`, especially in production. |
| **useMonitor** | Set to `true` or `false` to indicate whether the schedule should be monitored. Schedule monitoring persists schedule occurrences to aid in ensuring the schedule is maintained correctly even when function app instances restart. If not set explicitly, the default is `true` for schedules that have a recurrence interval greater than or equal to 1 minute. For schedules that trigger more than once per minute, the default is `false`. |

# [Model v3](#tab/nodejs-v3)

The following table explains the binding configuration properties that you set in the *function.json* file.

| Property | Description |
| --- | --- |
| **type** | Must be set to "timerTrigger". This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | Must be set to "in". This property is set automatically when you create the trigger in the Azure portal. |
| **name** | The name of the variable that represents the timer object in function code. |
| **schedule** | A [NCRONTAB expression](#ncrontab-expressions) or a [TimeSpan](#timespan) value. A `TimeSpan` can be used only for a function app that runs on an App Service Plan. You can put the schedule expression in an app setting and set this property to the app setting name wrapped in **%** signs, as in this example: "%ScheduleAppSetting%". For more information, see [Work with application settings](functions-how-to-use-azure-function-app-settings.md#settings). |
| **runOnStartup** | If `true`, the function is invoked when the runtime starts. For example, the runtime starts when the function app wakes up after going idle due to inactivity, when the function app restarts due to function changes, and when the function app scales out. *Use with caution.* **runOnStartup** should rarely if ever be set to `true`, especially in production. |
| **useMonitor** | Set to `true` or `false` to indicate whether the schedule should be monitored. Schedule monitoring persists schedule occurrences to aid in ensuring the schedule is maintained correctly even when function app instances restart. If not set explicitly, the default is `true` for schedules that have a recurrence interval greater than or equal to 1 minute. For schedules that trigger more than once per minute, the default is `false`. |

---



**Applies to: programming-language-powershell,programming-language-python**



The following table explains the binding configuration properties that you set in the *function.json* file.

| function.json property | Description |
| --- | --- |
| **type** | Must be set to "timerTrigger". This property is set automatically when you create the trigger in the Azure portal. |
| **direction** | Must be set to "in". This property is set automatically when you create the trigger in the Azure portal. |
| **name** | The name of the variable that represents the timer object in function code. |
| **schedule** | A [NCRONTAB expression](#ncrontab-expressions) or a [TimeSpan](#timespan) value. A `TimeSpan` can be used only for a function app that runs on an App Service Plan. You can put the schedule expression in an app setting and set this property to the app setting name wrapped in **%** signs, as in this example: "%ScheduleAppSetting%". For more information, see [Work with application settings](functions-how-to-use-azure-function-app-settings.md#settings). |
| **runOnStartup** | If `true`, the function is invoked when the runtime starts. For example, the runtime starts when the function app wakes up after going idle due to inactivity, when the function app restarts due to function changes, and when the function app scales out. *Use with caution.* **runOnStartup** should rarely if ever be set to `true`, especially in production. |
| **useMonitor** | Set to `true` or `false` to indicate whether the schedule should be monitored. Schedule monitoring persists schedule occurrences to aid in ensuring the schedule is maintained correctly even when function app instances restart. If not set explicitly, the default is `true` for schedules that have a recurrence interval greater than or equal to 1 minute. For schedules that trigger more than once per minute, the default is `false`. |

<!--The following Include and Caution are from the original file and I wasn't sure if these need to be here-->



When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 



**Applies to: programming-language-csharp,programming-language-javascript,programming-language-typescript,programming-language-powershell,programming-language-python**


> **Caution:**
> Don't set `runOnStartup` to `true` in production. Using this setting makes code execute at highly unpredictable times. In certain production settings, these extra executions can result in significantly higher costs for apps hosted in a Consumption plan. For example, with `runOnStartup` enabled, the trigger is invoked whenever your function app is scaled. If you must enable `runOnStartup` in production, make sure you fully understand how your app behaves with `runOnStartup` enabled.



See the [Example section](#example) for complete examples.

## Usage

When a timer trigger function is invoked, a timer object is passed into the function. The following JSON is an example representation of the timer object.

**Applies to: programming-language-csharp,programming-language-java,programming-language-powershell,programming-language-python**


```json
{
    "Schedule":{
        "AdjustForDST": true
    },
    "ScheduleStatus": {
        "Last":"2016-10-04T10:15:00+00:00",
        "LastUpdated":"2016-10-04T10:16:00+00:00",
        "Next":"2016-10-04T10:20:00+00:00"
    },
    "IsPastDue":false
}
```


**Applies to: programming-language-javascript,programming-language-typescript**

```json
{
    "schedule":{
        "adjustForDST": true
    },
    "scheduleStatus": {
        "last":"2016-10-04T10:15:00+00:00",
        "lastUpdated":"2016-10-04T10:16:00+00:00",
        "next":"2016-10-04T10:20:00+00:00"
    },
    "isPastDue":false
}
```


The `isPastDue` property is `true` when the current function invocation is later than scheduled. For example, a function app restart might cause an invocation to be missed.

### NCRONTAB expressions

Azure Functions uses the [NCronTab](https://github.com/atifaziz/NCrontab) library to interpret NCRONTAB expressions. An NCRONTAB expression is similar to a CRON expression except that it includes an additional sixth field at the beginning to use for time precision in seconds:

`{second} {minute} {hour} {day} {month} {day-of-week}`

Each field can have one of the following types of values:

| Type | Example | When triggered |
| --- | --- | --- |
| A specific value | <nobr>`0 5 * * * *`</nobr> | Once every hour of the day at minute 5 of each hour |
| All values (`*`) | <nobr>`0 * 5 * * *`</nobr> | At every minute in the hour, during hour 5 |
| A range (`-` operator) | <nobr>`5-7 * * * * *`</nobr> | Three times a minute - at seconds 5 through 7 during every minute of every hour of each day |
| A set of values (`,` operator) | <nobr>`5,8,10 * * * * *`</nobr> | Three times a minute - at seconds 5, 8, and 10 during every minute of every hour of each day |
| An interval value (`/` operator) | <nobr>`0 */5 * * * *`</nobr> | 12 times an hour - at second 0 of every 5th minute of every hour of each day |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/functions/functions-cron-expressions-months-days.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-bindings-timer.md)

#### NCRONTAB examples

Here are some examples of NCRONTAB expressions you can use for the timer trigger in Azure Functions.

| Example | When triggered |
| --- | --- |
| `0 */5 * * * *` | once every five minutes |
| `0 0 * * * *` | once at the top of every hour |
| `0 0 */2 * * *` | once every two hours |
| `0 0 9-17 * * *` | once every hour from 9 AM to 5 PM |
| `0 30 9 * * *` | at 9:30 AM every day |
| `0 30 9 * * 1-5` | at 9:30 AM every weekday |
| `0 30 9 * Jan Mon` | at 9:30 AM every Monday in January |

> **Note:**
> NCRONTAB expression supports both **five field** and **six field** format. The sixth field position is a value for seconds which is placed at the beginning of the expression.
> If the CRON expression is invalid the Azure portal Function Test will display a 404 error, if Application Insights is connected more details are logged there.

#### NCRONTAB time zones

The numbers in an NCRONTAB expression refer to a time and date, not a time span. For example, a 5 in the `hour` field refers to 5:00 AM, not every 5 hours.


The default time zone used with the CRON expressions is Coordinated Universal Time (UTC). To have your CRON expression based on another time zone, create an app setting for your function app named `WEBSITE_TIME_ZONE`. 

The value of this setting depends on the operating system and plan on which your function app runs.

| Operating system | Plan | Value |
| --- | --- | --- |
| **Windows** | All | Set the value to the name of the desired time zone as given by the second line from each pair given by the Windows command `tzutil.exe /L` |
| **Linux** | Premium<br/>Dedicated | Set the value to the name of the desired time zone as shown in the [tz database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) |

> **Note:**
> `WEBSITE_TIME_ZONE` and `TZ` aren't currently supported when running on Linux in a [Flex Consumption](flex-consumption-plan.md) or [Consumption](consumption-plan.md) plan. In this case, the setting `WEBSITE_TIME_ZONE` or `TZ` can create SSL-related issues and cause metrics to stop working for your app.

For example, Eastern Time in the US (represented by `Eastern Standard Time` (Windows) or `America/New_York` (Linux)) currently uses UTC-05:00 during standard time and UTC-04:00 during daylight time. To have a timer trigger fire at 10:00 AM Eastern Time every day, create an app setting for your function app named `WEBSITE_TIME_ZONE`, set the value to `Eastern Standard Time` (Windows) or `America/New_York` (Linux), and then use the following NCRONTAB expression: 

```
"0 0 10 * * *"
```	

When you use `WEBSITE_TIME_ZONE`, the time is adjusted for time changes in the specific timezone, including daylight saving time and changes in standard time.


### TimeSpan

 A `TimeSpan` can be used only for a function app that runs on an App Service Plan.

Unlike an NCRONTAB expression, a `TimeSpan` value specifies the time interval between each function invocation. When a function completes after running longer than the specified interval, the timer immediately invokes the function again.

Expressed as a string, the `TimeSpan` format is `hh:mm:ss` when `hh` is less than 24. When the first two digits are 24 or greater, the format is `dd:hh:mm`. Here are some examples:

| Example | When triggered |
| --- | --- |
| "01:00:00" | every hour |
| "00:01:00" | every minute |
| "25:00:00:00" | every 25 days |
| "1.00:00:00" | every day |

### Scale-out

If a function app scales out to multiple instances, only a single instance of a timer-triggered function is run across all instances. It will not trigger again if there is an outstanding invocation still running.

### Function apps sharing Storage

If you are sharing storage accounts across function apps that are not deployed to app service, you might need to explicitly assign host ID to each app.

| Functions version | Setting |
| --- | --- |
| 2.x (and higher) | `AzureFunctionsWebHost__hostid` environment variable |
| 1.x | `id` in *host.json* |

You can omit the identifying value or manually set each function app's identifying configuration to a different value.

The timer trigger uses a storage lock to ensure that there is only one timer instance when a function app scales out to multiple instances. If two function apps share the same identifying configuration and each uses a timer trigger, only one timer runs.

### Retry behavior

Unlike the queue trigger, the timer trigger doesn't retry after a function fails. When a function fails, it isn't called again until the next time on the schedule.

### Manually invoke a timer trigger

The timer trigger for Azure Functions provides an HTTP webhook that can be invoked to manually trigger the function. This can be extremely useful in the following scenarios.

* Integration testing
* Slot swaps as part of a smoke test or warmup activity
* Initial deployment of a function to immediately populate a cache or lookup table in a database

Please refer to [manually run a non HTTP-triggered function](functions-manually-run-non-http.md) for details on how to manually invoke a timer triggered function.

### Troubleshooting

For information about what to do when the timer trigger doesn't work as expected, see [Investigating and reporting issues with timer triggered functions not firing](https://github.com/Azure/azure-functions-host/wiki/Investigating-and-reporting-issues-with-timer-triggered-functions-not-firing).

## Connections

Timer triggers have an implicit dependency on blob storage, except when run locally through the Azure Functions Core Tools. The system uses blob storage to coordinate across multiple instances [when the app scales out](#scale-out). It accesses blob storage using the host storage (`AzureWebJobsStorage`) connection. If you configure the host storage to use an [identity-based connection](manage-connections.md?tabs=host%2Cidentity#define-connections), the identity should have the [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) role, which is the default requirement for host storage.

## Next steps

> 
> [Go to a quickstart that uses a timer trigger](functions-create-scheduled-function.md)

> 
> [Learn more about Azure functions triggers and bindings](functions-triggers-bindings.md)
