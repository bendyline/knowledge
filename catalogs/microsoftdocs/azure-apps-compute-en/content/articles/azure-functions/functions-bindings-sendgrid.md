---
title: Azure Functions SendGrid bindings
description: Azure Functions SendGrid bindings reference.
ms.topic: reference
ms.devlang: csharp
# ms.devlang: csharp, java, javascript, python
ms.custom: devx-track-csharp, devx-track-extended-java, devx-track-js, devx-track-python, devx-track-ts
ms.date: 09/15/2026
zone_pivot_groups: programming-languages-set-functions
---

# Azure Functions SendGrid bindings

This article explains how to send email by using [SendGrid](https://sendgrid.com/docs/User_Guide/index.html) bindings in Azure Functions. Azure Functions supports an output binding for SendGrid.


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

Add the extension to your project by installing the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.SendGrid), version 3.x.

# [In-process model](#tab/in-process)


> **Important:**
> [Support will end for the in-process model on November 10, 2026](https://aka.ms/azure-functions-retirements/in-process-model). We highly recommend that you [migrate your apps to the isolated worker model](https://learn.microsoft.com/azure/azure-functions/migrate-dotnet-to-isolated-model?tabs=net8) for full support.

Functions execute in the same process as the Functions host. To learn more, see [Develop C# class library functions using Azure Functions](functions-dotnet-class-library.md).

Add the extension to your project by installing the [NuGet package](https://www.nuget.org/packages/Microsoft.Azure.WebJobs.Extensions.SendGrid), version 3.x.

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

We don't currently have an example for using the SendGrid binding in a function app running in an isolated worker process. 

# [In-process model](#tab/in-process)    

The following examples show a [C# function](functions-dotnet-class-library.md) that uses a Service Bus queue trigger and a SendGrid output binding.

The following example is a synchronous execution:

```cs
using SendGrid.Helpers.Mail;
using System.Text.Json;

...

[FunctionName("SendEmail")]
public static void Run(
    [ServiceBusTrigger("myqueue", Connection = "ServiceBusConnection")] Message email,
    [SendGrid(ApiKey = "CustomSendGridKeyAppSettingName")] out SendGridMessage message)
{
    var emailObject = JsonSerializer.Deserialize<OutgoingEmail>(Encoding.UTF8.GetString(email.Body));

    message = new SendGridMessage();
    message.AddTo(emailObject.To);
    message.AddContent("text/html", emailObject.Body);
    message.SetFrom(new EmailAddress(emailObject.From));
    message.SetSubject(emailObject.Subject);
}

public class OutgoingEmail
{
    public string To { get; set; }
    public string From { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
}
```

This example shows asynchronous execution:


```cs
using SendGrid.Helpers.Mail;
using System.Text.Json;

...

[FunctionName("SendEmail")]
public static async Task Run(
 [ServiceBusTrigger("myqueue", Connection = "ServiceBusConnection")] Message email,
 [SendGrid(ApiKey = "CustomSendGridKeyAppSettingName")] IAsyncCollector<SendGridMessage> messageCollector)
{
    var emailObject = JsonSerializer.Deserialize<OutgoingEmail>(Encoding.UTF8.GetString(email.Body));

    var message = new SendGridMessage();
    message.AddTo(emailObject.To);
    message.AddContent("text/html", emailObject.Body);
    message.SetFrom(new EmailAddress(emailObject.From));
    message.SetSubject(emailObject.Subject);
 
    await messageCollector.AddAsync(message);
}

public class OutgoingEmail
{
    public string To { get; set; }
    public string From { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
}
```

You can omit setting the attribute's `ApiKey` property if you have your API key in an app setting named "AzureWebJobsSendGridApiKey".

---


**Applies to: programming-language-javascript,programming-language-typescript**

The following example shows a SendGrid output binding in a *function.json* file and a [JavaScript function](functions-reference-node.md) that uses the binding.

Here's the binding data in the *function.json* file:

```json 
{
    "bindings": [
        {
            "name": "$return",
            "type": "sendGrid",
            "direction": "out",
            "apiKey" : "MySendGridKey",
            "to": "{ToEmail}",
            "from": "{FromEmail}",
            "subject": "SendGrid output bindings"
        }
    ]
}
```

The [configuration](#configuration) section explains these properties.

Here's the JavaScript code:

```javascript
module.exports = function (context, input) {
    var message = {
        "personalizations": [ { "to": [ { "email": "sample@sample.com" } ] } ],
        from: { email: "sender@contoso.com" },
        subject: "Azure news",
        content: [{
            type: 'text/plain',
            value: input
        }]
    };

    return message;
};
```


**Applies to: programming-language-powershell**

 
Complete PowerShell examples aren't currently available for SendGrid bindings.

**Applies to: programming-language-python**


The following example shows an HTTP-triggered function that sends an email using the SendGrid binding. You can provide default values in the binding configuration. For instance, the *from* email address is configured in *function.json*. 

```json
{
  "scriptFile": "__init__.py",
  "bindings": [
    {
      "type": "httpTrigger",
      "authLevel": "function",
      "direction": "in",
      "name": "req",
      "methods": ["get", "post"]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    },
    {
      "type": "sendGrid",
      "name": "sendGridMessage",
      "direction": "out",
      "apiKey": "SendGrid_API_Key",
      "from": "sender@contoso.com"
    }
  ]
}
```

The following function shows how you can provide custom values for optional properties.

```python
import logging
import json
import azure.functions as func

def main(req: func.HttpRequest, sendGridMessage: func.Out[str]) -> func.HttpResponse:

    value = "Sent from Azure Functions"

    message = {
        "personalizations": [ {
          "to": [{
            "email": "user@contoso.com"
            }]}],
        "subject": "Azure Functions email with SendGrid",
        "content": [{
            "type": "text/plain",
            "value": value }]}

    sendGridMessage.set(json.dumps(message))

    return func.HttpResponse(f"Sent")
```

**Applies to: programming-language-java**


The following example uses the `@SendGridOutput` annotation from the [Java functions runtime library](https://learn.microsoft.com/java/api/overview/azure/functions/runtime) to send an email using the SendGrid output binding.

```java
package com.function;

import java.util.*;
import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;

public class HttpTriggerSendGrid {

    @FunctionName("HttpTriggerSendGrid")
    public HttpResponseMessage run(

        @HttpTrigger(
            name = "req",
            methods = { HttpMethod.GET, HttpMethod.POST },
            authLevel = AuthorizationLevel.FUNCTION)
                HttpRequestMessage<Optional<String>> request,

        @SendGridOutput(
            name = "message",
            dataType = "String",
            apiKey = "SendGrid_API_Key",
            to = "user@contoso.com",
            from = "sender@contoso.com",
            subject = "Azure Functions email with SendGrid",
            text = "Sent from Azure Functions")
                OutputBinding<String> message,

        final ExecutionContext context) {

        final String toAddress = "user@contoso.com";
        final String value = "Sent from Azure Functions";

        StringBuilder builder = new StringBuilder()
            .append("{")
            .append("\"personalizations\": [{ \"to\": [{ \"email\": \"%s\"}]}],")
            .append("\"content\": [{\"type\": \"text/plain\", \"value\": \"%s\"}]")
            .append("}");

        final String body = String.format(builder.toString(), toAddress, value);

        message.setValue(body);

        return request.createResponseBuilder(HttpStatus.OK).body("Sent").build();
    }
}
```


**Applies to: programming-language-csharp**

## Attributes

Both [in-process](functions-dotnet-class-library.md) and [isolated worker process](dotnet-isolated-process-guide.md) C# libraries use attributes to define the output binding. C# script instead uses a function.json configuration file.  

# [Isolated worker model](#tab/isolated-process)

In [isolated worker process](dotnet-isolated-process-guide.md) function apps, the `SendGridOutputAttribute` supports the following parameters:

| Attribute/annotation property | Description |
| --- | --- |
| **ApiKey** | The name of an app setting that contains your API key. If not set, the default app setting name is `AzureWebJobsSendGridApiKey`. |
| **To** | (Optional) The recipient's email address. |
| **From** | (Optional) The sender's email address. |
| **Subject** | (Optional) The subject of the email. |
| **Text** | (Optional) The email content. |

# [In-process model](#tab/in-process)

In [in-process](functions-dotnet-class-library.md) function apps, use the [SendGridAttribute](https://github.com/Azure/azure-webjobs-sdk-extensions/blob/master/src/WebJobs.Extensions.SendGrid/SendGridAttribute.cs), which supports the following parameters.

| Attribute/annotation property | Description |
| --- | --- |
| **ApiKey** | The name of an app setting that contains your API key. If not set, the default app setting name is `AzureWebJobsSendGridApiKey`. |
| **To** | (Optional) The recipient's email address. |
| **From** | (Optional) The sender's email address. |
| **Subject** | (Optional) The subject of the email. |
| **Text** | (Optional) The email content. |

---


**Applies to: programming-language-java**

## Annotations

The [SendGridOutput](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.sendgridoutput) annotation allows you to declaratively configure the SendGrid binding by providing the following configuration values. 

+ [apiKey](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.sendgridoutput.apikey)
+ [dataType](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.sendgridoutput.datatype)
+ [name](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.sendgridoutput.name)
+ [to](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.sendgridoutput.to)
+ [from](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.sendgridoutput.from)
+ [subject](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.sendgridoutput.subject)
+ [text](https://learn.microsoft.com/java/api/com.microsoft.azure.functions.annotation.sendgridoutput.text)


**Applies to: programming-language-javascript,programming-language-typescript,programming-language-python,programming-language-powershell**


## Configuration

The following table lists the binding configuration properties available in the  *function.json* file and the `SendGrid` attribute/annotation.

| *function.json* property | Description |
| --- | --- |
| **type** | Must be set to `sendGrid`. |
| **direction** | Must be set to `out`. |
| **name** | The variable name used in function code for the request or request body. This value is `$return` when there's only one return value. |
| **apiKey** | The name of an app setting that contains your API key. If not set, the default app setting name is *AzureWebJobsSendGridApiKey*. |
| **to** | (Optional) The recipient's email address. |
| **from** | (Optional) The sender's email address. |
| **subject** | (Optional) The subject of the email. |
| **text** | (Optional) The email content. |

Optional properties may have default values defined in the binding and either added or overridden programmatically.



When you're developing locally, add your application settings in the [local.settings.json file](functions-develop-local.md#local-settings-file) in the `Values` collection. 


<a name="host-json"></a>  

## host.json settings


This section describes the configuration settings available for this binding in version 2.x and later. Settings in the host.json file apply to all functions in a function app instance. For more information about function app configuration settings, see [host.json reference for Azure Functions](functions-host-json.md).

```json
{
    "version": "2.0",
    "extensions": {
        "sendGrid": {
            "from": "Azure Functions <samples@functions.com>"
        }
    }
}
```  

| Property | Default | Description |
| --- | --- | --- |
| **from** | n/a | The sender's email address across all functions. |


## Next steps

> 
> [Learn more about Azure functions triggers and bindings](functions-triggers-bindings.md)

[extension bundle]: extension-bundles.md
[Update your extensions]: functions-bindings-register.md
