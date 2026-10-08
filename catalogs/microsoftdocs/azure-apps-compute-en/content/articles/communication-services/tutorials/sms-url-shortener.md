---
title: Send short URL
titleSuffix: An Azure Communication Services article
description: This article describes how to use the Azure URL Shortener sample to send short links through SMS.
author: sundiraman
manager: shahen
services: azure-communication-services
ms.author: sundraman
ms.date: 03/8/2023
ms.topic: tutorial
ms.service: azure-communication-services
ms.subservice: sms
ms.custom: devx-track-extended-java, devx-track-js
zone_pivot_groups: acs-js-csharp
---

# Send short URL


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


SMS messages are limited to 160 characters, which can impair your ability to send URLs to customers. URLs can exceed the 160 character limit as they contain query parameters, encrypted information, and so on. You can use the Azure URL shortener to generate short URLs that are appropriate to send through SMS as they stay well below the 160 character limit. 

This document outlines the process of integrating Azure Communication Services with the Azure URL Shortener. The URL Shortener is an open source service that enables you to easily create, manage, and monitor shortened links.

**Applies to: programming-language-csharp**


## Sample code

You can find the completed code for this tutorial on Azure Samples GitHub [SMS Url Shortener for C#](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/sms-url-shortener).

## Prerequisites

-	An active Azure subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
-	An active Azure Communication Services resource. For more information, see [Create an Azure Communication Services resource](../quickstarts/create-communication-resource.md).
-	An Azure Communication Services phone number. [Get a phone number](../quickstarts/telephony/get-phone-number.md). You need to [verify your phone number](../quickstarts/sms/apply-for-toll-free-verification.md) so it can send messages with URLs. 
-	Deployed [AzUrlShortener](https://github.com/microsoft/AzUrlShortener). Click [Deploy to Azure](https://github.com/microsoft/AzUrlShortener/wiki/How-to-deploy-your-AzUrlShortener) button for quick deploy.
    -  [*Optional*] Deploy the [Azure Url Shortener](https://github.com/microsoft/AzUrlShortener/blob/main/README.md) to manage and monitor links in UI.
-	For this tutorial, SMS requests are routed to an Azure Function. You can use an existing service, different framework like express or just run the tutorial as a C# console app. To follow this tutorial with an Azure Function, see instructions to set up [Azure Function for C#](https://learn.microsoft.com/azure/azure-functions/create-first-function-vs-code-csharp).

## Architecture overview

This article describes how to set up middleware to orchestrate requests to send SMS and shorten URLs through the Azure URL Shortener service. It interacts with Azure Communication Services to complete the sending of the SMS.

Diagram for architecture overview.

## Set up the Azure Function

To get started, you need to create a new Azure Function. You can create the Azure Function by following the steps at [Azure Functions](https://learn.microsoft.com/azure/azure-functions/create-first-function-vs-code-csharp). If you aren't using an Azure Function and instead are using a different framework, skip this step and continue to the next section.

Once the Azure Function is set up, go to the `local.settings.json` file and add three more values that you need to store: the Azure Communication Services connection string, phone number, such as +15555555555, and a URL Shortener endpoint, such as `https://<Azure_Function_URL>/api/UrlCreate`. These variables are all values you generated from the prerequisites at the beginning of the article.

```json

{
    "IsEncrypted": false,
    "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "ACS_CONNECTIONSTRING": "<AZURE COMMUNICATION SERVICES CONNECTION STRING>",
    "ACS_PHONE_NUMBER": "<AZURE COMMUNICATION SERVICES PHONE NUMBER>",
    "URL_SHORTENER": "<URL SHORTENER ENDPOINT>" 
    }
}

```

## Configure query parameters

Once you created the Azure Function, you need to configure the query parameters needed to trigger it. The function expects a phone number and a URL. The phone number is the recipient of the SMS message. The URL is the link that is shortened and sent to the recipient.

```csharp

namespace Company.Function
{
    public static class SendSMSUrlShortener
    {
        [FunctionName("SendSMSUrlShortener")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string phoneNumberTo = req.Query["phoneNumber"]; // get phone number query parameter
            string urlToShorten = req.Query["url"]; // get url to shorten query parameter

            return new OkObjectResult(null);
        }
    }
}

```

## Shorten the URL

Now that you have the phone number and URL, you can use the Azure URL Shortener service to shorten the URL. Ensure you deployed the  [Azure URL Shortener](https://github.com/microsoft/AzUrlShortener/wiki/How-to-deploy-your-AzUrlShortener) service. The service contains several endpoints, but for this tutorial the focus is on the `UrlCreate` endpoint. Use the `PostAsync` method to place a `POST` request to the Azure URL Shortener service with the URL you want to shorten.

The service returns a JSON object with the shortened URL. Store the shortened URL in a variable called `shortUrl`. In the snippet, insert the endpoint of your deployed Azure URL Shortener service. For information on how to get the endpoint, see [Validate the deployment](https://github.com/microsoft/AzUrlShortener/wiki/How-to-deploy-your-AzUrlShortener#validate-the-deployment).

```csharp
...
using System.Net.Http;
using System.Text.Json;
using System.Text;

namespace Company.Function
{
    public class ShortenedUrl
    {
        public string ShortUrl { get; set; }
    }

    public static class SendSMSUrlShortener
    {
        static string urlShortener = Environment.GetEnvironmentVariable("URL_SHORTENER", EnvironmentVariableTarget.Process);

        [FunctionName("SendSMSUrlShortener")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            //Parse Query Parameters
            string phoneNumberTo = req.Query["phoneNumber"]; // get phone number query parameter
            string urlToShorten = req.Query["url"]; // get url to shorten query parameter
            
            //Get short URL from Azure URL Shortener
            using var client = new HttpClient();
            var requestData = new
            {
                Url = urlToShorten //Body request for the POST call
            };
            var requestBody = JsonSerializer.Serialize(requestData);
            var httpContent = new StringContent(requestBody, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(urlShortener, httpContent); // POST call to the Azure URL Shortener
            var content = await response.Content.ReadAsStringAsync();
            var data = System.Text.Json.JsonSerializer.Deserialize<ShortenedUrl>(content); // Parse content to ShortenedUrl object
            var url = data.ShortUrl;
            log.LogInformation("Shortened URL " + url);

            return new OkObjectResult(null);
        }
    }
}

```

## Send SMS

Now that the URL is shortened, you can use Azure Communication Services to send the SMS. Use the `send` method from the `SmsClient` class from the `Azure.Communication.Sms` package. 

```bash

dotnet add package Azure.Communication.Sms

```

This method sends the SMS to the phone number provided in the query parameters. The SMS contains the shortened URL. For more information on how to send SMS, see [Send SMS](https://learn.microsoft.com/azure/communication-services/quickstarts/sms/send?pivots=programming-language-csharp).

```csharp
...
using Azure;
using Azure.Communication;
using Azure.Communication.Sms;

namespace Company.Function
{
    // Class to deserialize URL Shortener response
    public class ShortenedUrl
    {
        public string ShortUrl { get; set; }
    }

    public static class SendSMSUrlShortener
    {
        [FunctionName("SendSMSUrlShortener")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            
            //Parse Query Parameters
            string phoneNumberTo = req.Query["phoneNumber"]; // get phone number query parameter
            string urlToShorten = req.Query["url"]; // get url to shorten query parameter
            
            //Get short URL from Azure URL Shortener
            using var client = new HttpClient();
            var requestData = new
            {
                Url = urlToShorten //Body request for the POST call
            };
            var requestBody = JsonSerializer.Serialize(requestData);
            var httpContent = new StringContent(requestBody, Encoding.UTF8, "application/json");
            string urlShortener = Environment.GetEnvironmentVariable("URL_SHORTENER", EnvironmentVariableTarget.Process); // Ex. https://<Azure Function URL>/api/UrlCreate
            var response = await client.PostAsync(urlShortener, httpContent); // POST call to the Azure URL Shortener
            var content = await response.Content.ReadAsStringAsync();
            var data = System.Text.Json.JsonSerializer.Deserialize<ShortenedUrl>(content); // Parse content to ShortenedUrl object
            var url = data.ShortUrl;
            log.LogInformation("Shortened URL " + url);
            
            //Send SMS with Azure Communication Services
            string connectionString = Environment.GetEnvironmentVariable("ACS_CONNECTIONSTRING", EnvironmentVariableTarget.Process);
            string phoneNumberFrom = Environment.GetEnvironmentVariable("ACS_PHONE_NUMBER", EnvironmentVariableTarget.Process); // Ex. +15555555555
            SmsClient smsClient = new SmsClient(connectionString);            
            SmsSendResult sendResult = smsClient.Send(
                from: phoneNumberFrom,
                to: phoneNumberTo,
                message: "Here is your shortened URL: " + url
            ); // Send SMS message with shortened URL
            
            return new OkObjectResult(sendResult);
        }
    }
}

```

## Test locally

>**Note:**
> You need to [verify your phone number](../quickstarts/sms/apply-for-toll-free-verification.md) to send SMS messages with URLs. Once your verification application is set to pending state (one to two days), the phone number to be enabled to send URLs. The full verification takes five to six weeks. For more information on toll-free number verification, see [Toll Free Verification FAQ](../concepts/sms/sms-faq.md#toll-free-verification).

Run your Azure Function locally by pressing `F5` in Visual Studio Code, or run the following command in the terminal:

```bash
func host start
```

Then use a tool like [Postman](https://www.postman.com/) to test your function by making a `POST` request to the endpoint of your Azure Function. You need to provide the phone number and URL as query parameters. For example, if your Azure Function is running locally, you can make a request to `http://localhost:7071/api/<FUNCTION NAME>?phoneNumber=%2B15555555555&url=https://www.microsoft.com`. You should receive a response with the shortened URL and a status of `Success`.

## Deploy to Azure

To deploy your Azure Function, follow [step by step instructions](https://learn.microsoft.com/azure/azure-functions/create-first-function-vs-code-csharp?pivots=programming-language-dotnet#sign-in-to-azure).

Once deployed, you can access the function through a similar method as you did when testing locally. You need to provide the phone number and URL as query parameters. For example, if your Azure Function is deployed to Azure, you can make a request to `https://<YOUR AZURE FUNCTION NAME>.azurewebsites.net/api/<FUNCTION NAME>?phoneNumber=%2B15555555555&url=https://www.microsoft.com`. You should receive a response with the shortened URL and a status of `Success`.



**Applies to: programming-language-javascript**


## Sample code

You can find the completed code for this tutorial at Azure Samples GitHub [SMS Url Shortener for JavaScript](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/sms-url-shortener).

## Prerequisites

-	An active Azure subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
-	An active Azure Communication Services resource. For more information, see [Create an Azure Communication Services resource](../quickstarts/create-communication-resource.md).
-	An Azure Communication Services phone number. [Get a phone number](../quickstarts/telephony/get-phone-number.md). You need to [verify your phone number](../quickstarts/sms/apply-for-toll-free-verification.md) so it can send messages with URLs. 
-	Deployed [AzUrlShortener](https://github.com/microsoft/AzUrlShortener). Click [Deploy to Azure](https://github.com/microsoft/AzUrlShortener/wiki/How-to-deploy-your-AzUrlShortener) button for quick deploy.
    - [*Optional*] Deploy the [Admin web app](https://github.com/microsoft/AzUrlShortener/tree/main/src/TinyBlazorAdmin) to manage and monitor links in UI.
-	For this tutorial, SMS requests are routed to an Azure Function. You can use an existing service, different framework like express or just run the tutorial as a Node.js console app. To follow this tutorial with an Azure Function, see instructions to set it up at [Azure Function for TypeScript](https://learn.microsoft.com/azure/azure-functions/create-first-function-vs-code-typescript).

## Architecture overview

This article describes how to set up a middleware that orchestrates requests to send SMS and the shortening of URLs through the Azure URL Shortener service. It interacts with Azure Communication Services to complete the sending of the SMS.

Diagram for architecture overview.

## Set up the Azure Function

To get started, you need to create a new Azure Function. You can create the Azure Function by following the steps in the [Azure Functions documentation](https://learn.microsoft.com/azure/azure-functions/create-first-function-vs-code-typescript). If you aren't using an Azure Function and instead are using a different framework, skip this step and continue to the next section.

Once the Azure Function is set up, go to the `local.settings.json` file and add three more values that you need to store: the Azure Communication Services connection string, phone number, such as +15555555555, and URL Shortener endpoint, such as `https://<Azure_Function_URL>/api/UrlCreate`. These variables are all values you generated from the prerequisites at the beginning of this article.

```json

{
    "IsEncrypted": false,
    "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "ACS_CONNECTIONSTRING": "<AZURE COMMUNICATION SERVICES CONNECTION STRING>",
    "ACS_PHONE_NUMBER": "<AZURE COMMUNICATION SERVICES PHONE NUMBER>",
    "URL_SHORTENER": "<URL SHORTENER ENDPOINT>" 
    }
}

```

## Configure query parameters

Once you created the Azure Function, you need to configure the query parameters needed to trigger it. The function expects a phone number and a URL. The phone number is used as the recipient of the SMS message. The URL is the link that is shortened and sent to the recipient.

```typescript

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    //Parse Query Parameters
    let phoneNumber = req.query.phoneNumber; // get phone number query parameter
    let url =  req.query.url; // get url to shorten query parameter

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: null
    };
};

export default httpTrigger;

```

## Shorten the URL

Now that you have the phone number and URL, you can use the Azure URL Shortener service to shorten the URL. Ensure you deployed the [Azure URL Shortener](https://github.com/microsoft/AzUrlShortener/wiki/How-to-deploy-your-AzUrlShortener) service already. The service contains several endpoints, but for this tutorial the focus is on the `UrlCreate` endpoint. Use the `fetch` method to place a `POST` request to the Azure URL Shortener service with the URL you want to shorten.

The service returns a JSON object with the shortened URL. Store the shortened URL in a variable called `shortUrl`. In the snippet, insert the endpoint of your deployed Azure URL Shortener service. For information on how to get the endpoint, see [Validate the deployment](https://github.com/microsoft/AzUrlShortener/wiki/How-to-deploy-your-AzUrlShortener#validate-the-deployment).

```typescript

const urlShortener = process.env.URL_SHORTENER

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    //Parse Query Parameters    
    let phoneNumberTo = req.query.phoneNumber; // get phone number query parameter
    let urlToShorten =  req.query.url; // get url to shorten query parameter
    
    //Get short URL from Azure URL Shortener
    const body =  JSON.stringify({ "Url": url})
    await fetch(urlShortener, {
      method: 'POST',
      body: body
    })
    .then(res => res.json())
    .then(async data => {
      const shortUrl = data["ShortUrl"]
      context.log(shortUrl)
      }
    })

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: null
    };
};

export default httpTrigger;

```

## Send SMS

Now that you have the short URL, use Azure Communication Services to send the SMS. Start with the `send` method from the `SmsClient` class from the `@azure/communication-sms` package. 

```bash

npm i @azure/communication-sms --save

```

This method sends the SMS to the phone number provided in the query parameters. The SMS contains the short URL. For more information on how to send SMS, see [Send SMS](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/telephony-sms/send.md?pivots=programming-language-javascript).

```typescript

import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { SmsClient }  from "@azure/communication-sms"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    //Parse Query Parameters
    let to = req.query.phoneNumber; // Get phone number to send SMS to
    let urlToShorten =  req.query.url; // Get URL to shorten

    //Get short URL from Azure URL Shortener
    const body =  JSON.stringify({ "Url": urlToShorten})
    const urlShortener = process.env.URL_SHORTENER
    await fetch(urlShortener, {
      method: 'POST',
      body: body
    })
    .then(res => res.json())
    .then(async data => {
      const url = data["ShortUrl"]
      const connectionString =  process.env.ACS_CONNECTIONSTRING
      const phoneNumberFrom = process.env.ACS_PHONE_NUMBER
      const smsClient = new SmsClient(connectionString);
      // Send the SMS message
      const sendResults = await smsClient.send({
        from: phoneNumberFrom,
        to: [to],
        message: "Join your scheduled appointment here: " + url
      }, {
        enableDeliveryReport: true
      });
      // Use the "successful" property to verify the status.
      for (const sendResult of sendResults) {
        if (sendResult.successful) {
          console.log("Success: ", sendResult);
        } else {
          console.error("Something went wrong when trying to send this message: ", sendResult);
        }
      }
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: url
      };
    })

};

```

## Test locally

>**Note:**
> You need to [verify your phone number](../quickstarts/sms/apply-for-toll-free-verification.md) to send SMS messages with URLs. Once your verification application is set to the pending state (one to two days), the phone number to be enabled to send URLs. The full verification takes five to six  weeks. For more information about toll-free number verification, see [Toll Free Verification FAQ](../concepts/sms/sms-faq.md#toll-free-verification).

To run your Azure Function locally, press `F5` in Visual Studio Code or run the following command in the terminal:

```bash
func host start
```

Then using a tool like [Postman](https://www.postman.com/), test your function by making a `POST` request to the endpoint of your Azure Function. You need to provide the phone number and URL as query parameters. For example, if your Azure Function is running locally, you can make a request to `http://localhost:7071/api/<FUNCTION NAME>?phoneNumber=%2B15555555555&url=https://www.microsoft.com`. You should receive a response with the shortened URL and a status of `Success`.

## Deploy to Azure

To deploy your Azure Function, see [step by step instructions](https://learn.microsoft.com/azure/azure-functions/create-first-function-vs-code-csharp?pivots=programming-language-javascript#sign-in-to-azure).

Once deployed, you can access the function through a similar method as you did when testing locally. You need to provide the phone number and URL as query parameters. For example, if your Azure Function is deployed to Azure, you can make a request to `https://<YOUR AZURE FUNCTION NAME>.azurewebsites.net/api/<FUNCTION NAME>?phoneNumber=%2B15555555555&url=https://www.microsoft.com`. You should receive a response with the shortened URL and a status of `Success`.



## Next steps

- Add a [custom domain](https://github.com/microsoft/AzUrlShortener/wiki/How-to-Add-a-Custom-Domain) for your shortened URLs.
