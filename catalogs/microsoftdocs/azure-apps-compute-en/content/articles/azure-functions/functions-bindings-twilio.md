---
title: Azure Functions Twilio binding
description: Understand how to use Twilio bindings with Azure Functions.
ms.topic: reference
ms.date: 09/15/2026
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, python
ms.custom: devx-track-csharp, H1Hack27Feb2017, devx-track-extended-java, devx-track-js, devx-track-python, devx-track-ts
zone_pivot_groups: programming-languages-set-functions
---

# Twilio binding for Azure Functions

This article explains how to send text messages by using [Twilio](https://www.twilio.com/) bindings in Azure Functions. Azure Functions supports output bindings for Twilio.


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


**Applies to: programming-language-csharp**


## Install extension

The extension NuGet package you install depends on the C# mode you're using in your function app: 

# [Isolated worker model](#tab/isolated-process)

Functions execute in an isolated C# worker process. To learn more, see [Guide for running C# Azure Functions in an isolated worker process](dotnet-isolated-process-guide.md).

There is currently no support for Twilio for an isolated worker process app.

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Functions execute in the same process as the Functions host. To learn more, see [Develop C# class library functions using Azure Functions](functions-dotnet-class-library.md).

Add the extension to your project by installing the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.Twilio), version 3.x.

---


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-java,programming-language-powershell**


 
## Install bundle

To be able to use this binding extension in your app, make sure that the *host.json* file in the root of your project contains this `extensionBundle` reference:


```json
{
    "version": "2.0",
    "extensionBundle": {
        "id": "Microsoft.Azure.Functions.ExtensionBundle",
        "version": "[4.0.0, 5.0.0)"
    }
}
```

In this example, the `version` value of `[4.0.0, 5.0.0)` instructs the Functions host to use a bundle version that is at least `4.0.0` but less than `5.0.0`, which includes all potential versions of 4.x. This notation effectively maintains your app on the latest available minor version of the v4.x extension bundle. 

When possible, you should use the latest extension bundle major version and allow the runtime to automatically maintain the latest minor version. You can view the contents of the latest bundle on the [extension bundles release page](https://github.com/Azure/azure-functions-extension-bundles/releases/latest). For more information, see [Azure Functions extension bundles](extension-bundles.md).




## Example

**Applies to: programming-language-go**

Go support isn't currently available for this binding.


**Applies to: programming-language-csharp**


You can create a C# function by using one of the following C# modes:

* [Isolated worker model](dotnet-isolated-process-guide.md): Compiled C# function that runs in a worker process that's isolated from the runtime. An isolated worker process is required to support C# functions running on long-term support (LTS) and non-LTS versions for .NET and the .NET Framework.
* [In-process model](functions-dotnet-class-library.md): Compiled C# function that runs in the same process as the Azure Functions runtime.
* [C# script](functions-reference-csharp.md): Used primarily when you create C# functions in the Azure portal.



> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

# [Isolated worker model](#tab/isolated-process)

The Twilio binding isn't currently supported for a function app running in an isolated worker process.

# [In-process model](#tab/in-process)    

The following example shows a [C# function](functions-dotnet-class-library.md) that sends a text message when triggered by a queue message.

```cs
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
namespace TwilioQueueOutput
{
    public static class QueueTwilio
    {
        [FunctionName("QueueTwilio")]
        [return: TwilioSms(AccountSidSetting = "TwilioAccountSid", AuthTokenSetting = "TwilioAuthToken", From = "+1425XXXXXXX")]
        public static CreateMessageOptions Run(
        [QueueTrigger("myqueue-items", Connection = "AzureWebJobsStorage")] JObject order,
        ILogger log)
        {
            log.LogInformation($"C# Queue trigger function processed: {order}");

            var message = new CreateMessageOptions(new PhoneNumber(order["mobileNumber"].ToString()))
            {
                Body = $"Hello {order["name"]}, thanks for your order!"
            };

            return message;
        }
    }
}
```

This example uses the `TwilioSms` attribute with the method return value. An alternative is to use the attribute with an `out CreateMessageOptions` parameter or an `ICollector<CreateMessageOptions>` or `IAsyncCollector<CreateMessageOptions>` parameter.

---


**Applies to: programming-language-javascript,programming-language-typescript**

The following example shows a Twilio output binding in a *function.json* file and a [JavaScript function](functions-reference-node.md) that uses the binding.

Here's binding data in the *function.json* file:

Example function.json:

```json
{
  "type": "twilioSms",
  "name": "message",
  "accountSidSetting": "TwilioAccountSid",
  "authTokenSetting": "TwilioAuthToken",
  "from": "+1425XXXXXXX",
  "direction": "out",
  "body": "Azure Functions Testing"
}
```

Here's the JavaScript code:

```javascript
module.exports = async function (context, myQueueItem) {
    context.log('Node.js queue trigger function processed work item', myQueueItem);

    // In this example the queue item is a JSON string representing an order that contains the name of a
    // customer and a mobile number to send text updates to.
    var msg = "Hello " + myQueueItem.name + ", thank you for your order.";

    // Even if you want to use a hard coded message in the binding, you must at least
    // initialize the message binding.
    context.bindings.message = {};

    // A dynamic message can be set instead of the body in the output binding. The "To" number 
    // must be specified in code. 
    context.bindings.message = {
        body : msg,
        to : myQueueItem.mobileNumber
    };
};
```


**Applies to: programming-language-powershell**

 
Complete PowerShell examples aren't currently available for SendGrid bindings.

**Applies to: programming-language-python**


The following example shows how to send an SMS message using the output binding as defined in the following *function.json*.

```json
    {
      "type": "twilioSms",
      "name": "twilioMessage",
      "accountSidSetting": "TwilioAccountSID",
      "authTokenSetting": "TwilioAuthToken",
      "from": "+1XXXXXXXXXX",
      "direction": "out",
      "body": "Azure Functions Testing"
    }
```

You can pass a serialized JSON object to the `func.Out` parameter to send the SMS message.

```python
import logging
import json
import azure.functions as func

def main(req: func.HttpRequest, twilioMessage: func.Out[str]) -> func.HttpResponse:

    message = req.params.get('message')
    to = req.params.get('to')

    value = {
      "body": message,
      "to": to
    }

    twilioMessage.set(json.dumps(value))

    return func.HttpResponse(f"Message sent")
```


**Applies to: programming-language-java**

The following example shows how to use the [TwilioSmsOutput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.twiliosmsoutput) annotation to send an SMS message. Values for `to`, `from`, and `body` are required in the attribute definition even if you override them programmatically.

```java
package com.function;

import java.util.*;
import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;

public class TwilioOutput {

    @FunctionName("TwilioOutput")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req", methods = { HttpMethod.GET, HttpMethod.POST },
                authLevel = AuthorizationLevel.FUNCTION) HttpRequestMessage<Optional<String>> request,
            @TwilioSmsOutput(
                name = "twilioMessage",
                accountSid = "AzureWebJobsTwilioAccountSID",
                authToken = "AzureWebJobsTwilioAuthToken",
                to = "+1XXXXXXXXXX",
                body = "From Azure Functions",
                from = "+1XXXXXXXXXX") OutputBinding<String> twilioMessage,
            final ExecutionContext context) {

        String message = request.getQueryParameters().get("message");
        String to = request.getQueryParameters().get("to");

        StringBuilder builder = new StringBuilder()
            .append("{")
            .append("\"body\": \"%s\",")
            .append("\"to\": \"%s\"")
            .append("}");

        final String body = String.format(builder.toString(), message, to);

        twilioMessage.setValue(body);

        return request.createResponseBuilder(HttpStatus.OK).body("Message sent").build();
    }
}
```


**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use attributes to define the output binding. C# script instead uses a [function.json configuration file](#configuration).  

# [Isolated worker model](#tab/isolated-process)

The Twilio binding isn't currently supported for a function app running in an isolated worker process.

# [In-process model](#tab/in-process)

In [in-process](functions-dotnet-class-library.md) function apps, use the [TwilioSmsAttribute](https://github.com/Azure/azure-webjobs-sdk-extensions/blob/master/src/WebJobs.Extensions.Twilio/TwilioSMSAttribute.cs), which supports the following parameters.

| Attribute/annotation property | Description |
| --- | --- |
| **AccountSidSetting** | This value must be set to the name of an app setting that holds your Twilio Account Sid (`TwilioAccountSid`). When not set, the default app setting name is `AzureWebJobsTwilioAccountSid`. |
| **AuthTokenSetting** | This value must be set to the name of an app setting that holds your Twilio authentication token (`TwilioAccountAuthToken`). When not set, the default app setting name is `AzureWebJobsTwilioAuthToken`. |
| **To** | This value is set to the phone number that the SMS text is sent to. |
| **From** | This value is set to the phone number that the SMS text is sent from. |
| **Body** | This value can be used to hard code the SMS text message if you don't need to set it dynamically in the code for your function. |


---


**Applies to: programming-language-java**

## Annotations

The [TwilioSmsOutput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.twiliosmsoutput) annotation allows you to declaratively configure the Twilio output binding by providing the following configuration values:

 + 

Place the [TwilioSmsOutput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.twiliosmsoutput) annotation on an [`OutputBinding<T>`](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.outputbinding) parameter, where `T` may be any native Java type such as `int`, `String`, `byte[]`, or a POJO type.


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-powershell**

## Configuration

The following table explains the binding configuration properties that you set in the *function.json* file, which differs by runtime version:

| function.json property | Description |
| --- | --- |
| **type** | must be set to `twilioSms`. |
| **direction** | must be set to `out`. |
| **name** | Variable name used in function code for the Twilio SMS text message. |
| **accountSidSetting** | This value must be set to the name of an app setting that holds your Twilio Account Sid (`TwilioAccountSid`). When not set, the default app setting name is `AzureWebJobsTwilioAccountSid`. |
| **authTokenSetting** | This value must be set to the name of an app setting that holds your Twilio authentication token (`TwilioAccountAuthToken`). When not set, the default app setting name is `AzureWebJobsTwilioAuthToken`. |
| **from** | This value is set to the phone number that the SMS text is sent from. |
| **body** | This value can be used to hard code the SMS text message if you don't need to set it dynamically in the code for your function. |

In version 2.x, you set the `to` value in your code.



When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 


## Next steps

> 
> [Learn more about Azure functions triggers and bindings](functions-triggers-bindings.md)

[extension bundle]: extension-bundles.md
[Update your extensions]: functions-bindings-register.md
