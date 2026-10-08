---
title: Throw an exception when email sending tier limit is reached
titleSuffix: An Azure Communication Services article
description: This article describes how to throw an exception when sending tier limit is reached using Azure Communication Services.
author: natekimball-msft
manager: koagbakp
services: azure-communication-services
ms.author: natekimball
ms.date: 04/07/2023
ms.topic: quickstart
ms.service: azure-communication-services
ms.custom: devx-track-dotnet, devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-js-csharp-java-python
---

# Throw an exception when email sending tier limit is reached


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to throw an exception when the email sending tier limit is reached using our Email SDKs.

**Applies to: programming-language-csharp**


## Throw an exception when email sending tier limit is reached

The Email API uses throttling with limitations on the number of email messages that you can send. Email sending limits are applied per minute and per hour as described in [API Throttling and Timeouts](https://learn.microsoft.com/azure/communication-services/concepts/service-limits). When you reach these limits, subsequent email sends with `SendAsync` calls receive an error response of `429: Too Many Requests`. By default, the SDK is configured to retry these requests after waiting a certain period of time. To capture these response codes, we recommend you [set up logging with the Azure SDK](https://learn.microsoft.com/azure/developer/python/sdk/azure-sdk-logging).

Alternatively, you can manually define a custom policy:

```csharp
using Azure.Core.Pipeline;

public class Catch429Policy : HttpPipelineSynchronousPolicy
{
    public override void OnReceivedResponse(HttpMessage message)
    {
        if (message.Response.Status == 429)
        {
            throw new Exception(message.Response);
        }
        else
        {
            base.OnReceivedResponse(message);
        }
    }
}
```

Add this policy to your email client to ensure that 429 response codes throw an exception rather than being retried.

```csharp
EmailClientOptions emailClientOptions = new EmailClientOptions();
emailClientOptions.AddPolicy(new Catch429Policy(), HttpPipelinePosition.PerRetry);

EmailClient emailClient = new EmailClient(connectionString, emailClientOptions);
```



**Applies to: programming-language-javascript**


## Throw an exception when email sending tier limit is reached

The Email API uses throttling with limitations on the number of email messages that you can send. Email sending limits are applied per minute and per hour as described in [API Throttling and Timeouts](https://learn.microsoft.com/azure/communication-services/concepts/service-limits). When you reach these limits, subsequent email sends with `SendAsync` calls receive an error response of `429: Too Many Requests`. By default, the SDK is configured to retry these requests after waiting a certain period of time. To capture these response codes, we recommend you [set up logging with the Azure SDK](https://learn.microsoft.com/azure/developer/python/sdk/azure-sdk-logging).

There are per minute and per hour [limits to the amount of emails you can send using the Azure Communication Email Service](https://learn.microsoft.com/azure/communication-services/concepts/service-limits). When you reach these limits, any further `beginSend` calls receive a `429: Too Many Requests` response. By default, the SDK is configured to retry these requests after waiting a certain period of time. We recommend you [set up logging with the Azure SDK](https://learn.microsoft.com/javascript/api/overview/azure/logger-readme) to capture these response codes.

Alternatively, you can manually define a custom policy:

```javascript
const catch429Policy = {
  name: "catch429Policy",
  async sendRequest(request, next) {
    const response = await next(request);
    if (response.status === 429) {
      throw new Error(response);
    }
    return response;
  }
};
```

Add this policy to your email client to ensure that 429 response codes throw an exception rather than being retried.

```java
const clientOptions = {
  additionalPolicies: [
    {
      policy: catch429Policy,
      position: "perRetry"
    }
  ]
}

const emailClient = new EmailClient(connectionString, clientOptions);
```



**Applies to: programming-language-java**


## Throw an exception when email sending tier limit is reached

The Email API uses throttling with limitations on the number of email messages that you can send. Email sending limits are applied per minute and per hour as described in [API Throttling and Timeouts](https://learn.microsoft.com/azure/communication-services/concepts/service-limits). When you reach these limits, subsequent email sends with `SendAsync` calls receive an error response of `429: Too Many Requests`. By default, the SDK is configured to retry these requests after waiting a certain period of time. To capture these response codes, we recommend you [set up logging with the Azure SDK](https://learn.microsoft.com/azure/developer/python/sdk/azure-sdk-logging).

Alternatively, you can manually define a custom policy:

```java
import com.azure.core.http.HttpResponse;
import com.azure.core.http.policy.ExponentialBackoff;

public class CustomStrategy extends ExponentialBackoff {
    @Override
    public boolean shouldRetry(HttpResponse httpResponse) {
        int code = httpResponse.getStatusCode();

        if (code == HTTP_STATUS_TOO_MANY_REQUESTS) {
            throw new RuntimeException(httpResponse);
        }
        else {
            return super.shouldRetry(httpResponse);
        }
    }
}
```

Add this retry policy to your email client to ensure that 429 response codes throw an exception rather than being retried.

```java
import com.azure.core.http.policy.RetryPolicy;

EmailClient emailClient = new EmailClientBuilder()
    .connectionString(connectionString)
    .retryPolicy(new RetryPolicy(new CustomStrategy()))
    .buildClient();
```



**Applies to: programming-language-python**


## Throw an exception when email sending tier limit is reached

The Email API uses throttling with limitations on the number of email messages that you can send. Email sending limits are applied per minute and per hour as described in [API Throttling and Timeouts](https://learn.microsoft.com/azure/communication-services/concepts/service-limits). When you reach these limits, subsequent email sends with `SendAsync` calls receive an error response of `429: Too Many Requests`. By default, the SDK is configured to retry these requests after waiting a certain period of time. To capture these response codes, we recommend you [set up logging with the Azure SDK](https://learn.microsoft.com/azure/developer/python/sdk/azure-sdk-logging).

Alternatively, you can manually define a custom policy to ensure that 429 response codes throw an exception rather than being retried.

```python
def callback(response):
    if response.http_response.status_code == 429:
        raise Exception(response.http_response)

email_client = EmailClient.from_connection_string(<connection_string>, raw_response_hook=callback)
```



## Troubleshooting

### Email Delivery

To troubleshoot issues related to email delivery, you can [get status of the email delivery](../handle-email-events.md) to capture delivery details.

> **Important:**
> The success result returned by polling for the status of the send operation only validates that the email is sent out for delivery. For more information about the status of the delivery on the recipient end, see [how to handle email events](../handle-email-events.md).

### Email Throttling

If your application is hanging, it could be due to email sending being throttled. You can [handle email throttling by logging or by implementing a custom policy](throw-exception-when-tier-limit-reached.md).

> **Note:**
> This sandbox is intended to help developers start building the application. You can gradually request to increase the sending volume once the application is ready to go live. Submit a support request to raise your desired sending limit if you require sending a volume of messages exceeding the rate limits.

## Clean up Azure Communication Service resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../../create-communication-resource.md#clean-up-resources).

## Next steps

 - Learn how to [send email to multiple recipients](send-email-to-multiple-recipients.md)
 - Learn more about [sending email with attachments](send-email-with-attachments.md)
 - Familiarize yourself with [email client library](../../../concepts/email/sdk-features.md)
