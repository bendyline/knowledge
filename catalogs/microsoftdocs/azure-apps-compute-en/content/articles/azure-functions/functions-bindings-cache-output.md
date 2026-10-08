---
title: Using Redis Output bindings with Azure Functions for Azure Managed Redis
description: Learn how to use Redis output binding on an Azure Functions.
author: flang-msft
zone_pivot_groups: programming-languages-set-functions-lang-workers
ms.author: franlanglois
ms.service: azure-functions
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python, ignite-2024
ms.topic: reference
ms.date: 07/12/2024
---

# Azure Managed Redis output binding for Azure Functions

The Azure Managed Redis output bindings lets you change the keys in a cache based on a set of available trigger on the cache.

For information on setup and configuration details, see the [overview](functions-bindings-cache.md).

## Scope of availability for functions bindings

| Binding Type | Azure Managed Redis | Azure Cache for Redis |
| --- | :---: | :---: |
| Output | Yes | Yes |

> **Important:**
> When using Azure Managed Redis or the Enterprise tiers of Azure Cache for Redis, use port 10000 rather than port 6380 or 6379.
>

**Applies to: programming-language-javascript**

<!--- Replace with the following when Node.js v4 is supported:
[!INCLUDE [functions-nodejs-model-tabs-description](../../includes/functions-nodejs-model-tabs-description.md)]
-->

> **Important:**
> The Node.js v4 model for Functions isn't yet supported by the Azure Cache for Redis extension. For more details about how the v4 model works, refer to the [Azure Functions Node.js developer guide](functions-reference-node.md). To learn more about the differences between v3 and v4, refer to the [migration guide](functions-node-upgrade-v4.md). 
  

**Applies to: programming-language-python**

<!--- Replace with the following when Python v2 is supported:
[!INCLUDE [functions-python-model-tabs-description](../../includes/functions-python-model-tabs-description.md)]  
-->

> **Important:**
> The Python v2 model for Functions isn't yet supported by the Azure Cache for Redis extension. For more details about how the v2 model works, refer to the [Azure Functions Python developer guide](functions-reference-python.md?pivots=python-mode-decorators). 



## Example

**Applies to: programming-language-csharp**


A C# function can be created by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. Isolated worker process is required to support C# functions running on LTS and non-LTS versions .NET and the .NET Framework. Extensions for isolated worker process functions use `Microsoft.Azure.Functions.Worker.Extensions.*` namespaces.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Functions runtime. In a variation of this model, Functions can be run using [C# scripting](functions-reference-csharp.md), which is supported primarily for C# portal editing. Extensions for in-process functions use `Microsoft.Azure.WebJobs.Extensions.*` namespaces.


The following example shows a pub/sub trigger on the set event with an output binding to the same Redis instance. The set event triggers the cache and the output binding returns a delete command for the key that triggered the function.

> **Important:**
>
>For .NET functions, using the _isolated worker_ model is recommended over the _in-process_ model. For a comparison of the _in-process_ and _isolated worker_ models, see differences between the _isolated worker_ model and the _in-process_ model for .NET on Azure Functions.

### [Isolated process](#tab/isolated-process)

```c#

using Microsoft.Extensions.Logging;

namespace Microsoft.Azure.Functions.Worker.Extensions.Redis.Samples.RedisOutputBinding
{
    internal class SetDeleter
    {
        [Function(nameof(SetDeleter))]
        [RedisOutput(Common.connectionString, "DEL")]
        public static string Run(
            [RedisPubSubTrigger(Common.connectionString, "__keyevent@0__:set")] string key,
            ILogger logger)
        {
            logger.LogInformation($"Deleting recently SET key '{key}'");
            return key;
        }
    }
}
```

---

### [In-process](#tab/in-process)

```csharp
using Microsoft.Extensions.Logging;

namespace Microsoft.Azure.WebJobs.Extensions.Redis.Samples.RedisOutputBinding
{
    internal class SetDeleter
    {
        [FunctionName(nameof(SetDeleter))]
        public static void Run(
            [RedisPubSubTrigger(Common.connectionStringSetting, "__keyevent@0__:set")] string key,
            [Redis(Common.connectionStringSetting, "DEL")] out string[] arguments,
            ILogger logger)
        {
            logger.LogInformation($"Deleting recently SET key '{key}'");
            arguments = new string[] { key };
        }
    }
}
```

---


**Applies to: programming-language-java**

The following example shows a pub/sub trigger on the set event with an output binding to the same Redis instance. The set event triggers the cache and the output binding returns a delete command for the key that triggered the function.
<!---Note: it might be confusing that the binding `name` and the parameter name are the same in these examples. --->
```java
package com.function.RedisOutputBinding;

import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.redis.annotation.*;

public class SetDeleter {
    @FunctionName("SetDeleter")
    @RedisOutput(
                name = "value",
                connection = "redisConnectionString",
                command = "DEL")
    public String run(
            @RedisPubSubTrigger(
                name = "key",
                connection = "redisConnectionString",
                channel = "__keyevent@0__:set")
                String key,
            final ExecutionContext context) {
        context.getLogger().info("Deleting recently SET key '" + key + "'");
        return key;
    }
}

```


**Applies to: programming-language-javascript**

This example shows a pub/sub trigger on the set event with an output binding to the same Redis instance. The set event triggers the cache and the output binding returns a delete command for the key that triggered the function.

### [Model v3](#tab/nodejs-v3)

The bindings are defined in the `function.json`` file:

```json
{
    "bindings": [
        {
            "type": "redisPubSubTrigger",
            "connection": "redisConnectionString",
            "channel": "__keyevent@0__:set",
            "name": "key",
            "direction": "in"
        },
        {
            "type": "redis",
            "connection": "redisConnectionString",
            "command": "DEL",
            "name": "$return",
            "direction": "out"
        }
    ],
    "scriptFile": "index.js"
}
```

This code from the `index.js` file takes the key from the trigger and returns it to the output binding to delete the cached item.

```javascript
module.exports = async function (context, key) {
    context.log("Deleting recently SET key '" + key + "'");
    return key;
}

```

### [Model v4](#tab/nodejs-v4)

<!--- Replace with the following when Node.js v4 is supported:
[!INCLUDE [functions-nodejs-model-tabs-description](../../includes/functions-nodejs-model-tabs-description.md)]
-->

> **Important:**
> The Node.js v4 model for Functions isn't yet supported by the Azure Cache for Redis extension. For more details about how the v4 model works, refer to the [Azure Functions Node.js developer guide](functions-reference-node.md). To learn more about the differences between v3 and v4, refer to the [migration guide](functions-node-upgrade-v4.md). 
  

---

**Applies to: programming-language-powershell**

This example shows a pub/sub trigger on the set event with an output binding to the same Redis instance. The set event triggers the cache and the output binding returns a delete command for the key that triggered the function.

The bindings are defined in this `function.json` file:

```json
{
    "bindings": [
        {
            "type": "redisPubSubTrigger",
            "connection": "redisLocalhost",
            "channel": "__keyevent@0__:set",
            "name": "key",
            "direction": "in"
        },
        {
            "type": "redis",
            "connection": "redisLocalhost",
            "command": "DEL",
            "name": "retVal",
            "direction": "out"
        }
    ],
    "scriptFile": "run.ps1"
}

```

This code from the `run.ps1` file takes the key from the trigger and passes it to the output binding to delete the cached item.

```powershell
param($key, $TriggerMetadata)
Write-Host "Deleting recently SET key '$key'"
Push-OutputBinding -Name retVal -Value $key
```


**Applies to: programming-language-python**

This example shows a pub/sub trigger on the set event with an output binding to the same Redis instance. The set event triggers the cache and the output binding returns a delete command for the key that triggered the function.

### [v1](#tab/python-v1)

The bindings are defined in this `function.json` file:

```json
{
    "bindings": [
        {
            "type": "redisPubSubTrigger",
            "connection": "redisLocalhost",
            "channel": "__keyevent@0__:set",
            "name": "key",
            "direction": "in"
        },
        {
            "type": "redis",
            "connection": "redisLocalhost",
            "command": "DEL",
            "name": "$return",
            "direction": "out"
        }
    ],
    "scriptFile": "__init__.py"
}
```

This code from the `__init__.py` file takes the key from the trigger and passes it to the output binding to delete the cached item.

```python
import logging

def main(key: str) -> str:
    logging.info("Deleting recently SET key '" + key + "'")
    return key
```

### [v2](#tab/python-v2)

<!--- Replace with the following when Node.js v4 is supported:
[!INCLUDE [functions-nodejs-model-tabs-description](../../includes/functions-nodejs-model-tabs-description.md)]
-->

> **Important:**
> The Node.js v4 model for Functions isn't yet supported by the Azure Cache for Redis extension. For more details about how the v4 model works, refer to the [Azure Functions Node.js developer guide](functions-reference-node.md). To learn more about the differences between v3 and v4, refer to the [migration guide](functions-node-upgrade-v4.md). 
  

---

**Applies to: programming-language-csharp**


## Attributes

> **Note:**
> All commands are supported for this binding.

The way in which you define an output binding parameter depends on whether your C# functions runs [in-process](functions-dotnet-class-library.md) or in an [isolated worker process](dotnet-isolated-process-guide.md).

The output binding is defined this way:

| Definition | Example | Description |
| --- | --- | --- |
| On an `out` parameter | `[Redis(<Connection>, <Command>)] out string <Return_Variable>` | The string variable returned by the method is a key value that the binding uses to execute the command against the specific cache. |

In this case, the type returned by the method is a key value that the binding uses to execute the command against the specific cache.

When your function has multiple output bindings, you can instead apply the binding attribute to the property of a type that is a key value, which the binding uses to execute the command against the specific cache. For more information, see [Multiple output bindings](dotnet-isolated-process-guide.md#multiple-output-bindings).

---

Regardless of the C# process mode, the same properties are supported by the output binding attribute:

| Attribute property | Description |
| --- | --- |
| `Connection` | The name of the [application setting](functions-how-to-use-azure-function-app-settings.md#settings) that contains the cache connection string, such as: `<cacheName>.redis.cache.windows.net:6380,password...` |
| `Command` | The redis-cli command to be executed on the cache, such as:  `DEL`. |


**Applies to: programming-language-java**


## Annotations

The `RedisOutput` annotation supports these properties:

| Property | Description |
| --- | --- |
| `name` | The name of the specific input binding. |
| `connection` | The name of the [application setting](functions-how-to-use-azure-function-app-settings.md#settings) that contains the cache connection string, such as: `<cacheName>.redis.cache.windows.net:6380,password...` |
| `command` | The redis-cli command to be executed on the cache, such as:  `DEL`. |


**Applies to: programming-language-javascript,programming-language-powershell,programming-language-python**


## Configuration

The following table explains the binding configuration properties that you set in the _function.json_ file.

| Property | Description |
| --- | --- |
| `name` | The name of the specific input binding. |
| `connection` | The name of the [application setting](functions-how-to-use-azure-function-app-settings.md#settings) that contains the cache connection string, such as: `<cacheName>.redis.cache.windows.net:6380,password...` |
| `command` | The redis-cli command to be executed on the cache, such as:  `DEL`. |



See the [Example section](#example) for complete examples.

## Usage

The output returns a string, which is the key of the cache entry on which apply the specific command.

There are three types of connections that are allowed from an Azure Functions instance to a Redis Cache in your deployments. For local development, you can also use service principal secrets. Use the `appsettings` to configure each of the following types of client authentication, assuming the `Connection` was set to `Redis` in the function.


> **Important:**
> For optimal security, your function app should use Microsoft Entra ID with managed identities to authorize requests against your cache, if possible. Authorization by using Microsoft Entra ID and managed identities provides superior security and ease of use over shared access key authorization. For more information about using managed identities with your cache, see [Use Microsoft Entra ID for cache authentication](https://learn.microsoft.com/azure/azure-cache-for-redis/cache-azure-active-directory-for-authentication).

## Related content

- [Introduction to Azure Functions](functions-overview.md)
- [Overview of Azure functions for Azure Redis](https://learn.microsoft.com/azure/azure-functions/functions-bindings-cache)
- [Redis connection string](functions-bindings-cache.md#redis-connection-string)
- [Multiple output bindings](dotnet-isolated-process-guide.md#multiple-output-bindings)
