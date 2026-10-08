---
title: Receive an SMS message
titleSuffix: Azure Communication Services
description: This article describes how to receive an SMS message by using Azure Communication Services.
author: sundiraman
manager: shahen
services: azure-communication-services
ms.author: sundraman
ms.date: 02/09/2023
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: sms
ms.custom: devx-track-extended-java, devx-track-js
zone_pivot_groups: acs-js-power
---

# Receive an SMS message


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Azure Communication Services SMS capabilities provide developers options to consume SMS received events. The events are posted to Azure Event Grid, which provides out of the box integrations to process those using webhooks, Azure Functions, Power Automate / Logic App connectors, and more.

Once received, SMS messages can be processed to respond to them or log them to a database for future access.

This article describes how to process SMS received events through Azure Functions using Event Grid triggers and no-code connectors for Power Automate / Logic Apps.

The `SMSReceived` event generated when an SMS is sent to an Azure Communication Services phone number is formatted in the following way:

```json
[{
  "id": "d29ebbea-3341-4466-9690-0a03af35228e",
  "topic": "/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourcegroups/acse2e/providers/microsoft.communication/communicationservices/{communication-services-resource-name}",
  "subject": "/phonenumber/15555555555",
  "data": {
    "MessageId": "d29ebbea-3341-4466-9690-0a03af35228e",
    "From": "15555555555",
    "To": "15555555555",
    "Message": "Great to connect with Azure Communication Services events",
    "ReceivedTimestamp": "2020-09-18T00:27:45.32Z"
  },
  "eventType": "Microsoft.Communication.SMSReceived",
  "dataVersion": "1.0",
  "metadataVersion": "1",
  "eventTime": "2020-09-18T00:27:47Z"
}]
```
> **Note:** 
> The format of `MessageId` returned by this API is considered an internal implementation detail and is subject to change without notice. Clients must treat message IDs as opaque identifiers and must not parse, infer structure, or build logic based on their format or content.

To start generating events, configure Azure Event Grid to use your Azure Communication Services resource.

> **Note:** 
> Using Azure Event Grid incurs more costs. For more information, see [Azure Event Grid pricing](https://azure.microsoft.com/pricing/details/event-grid/).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).
- An SMS-enabled telephone number. [Get a phone number](../telephony/get-phone-number.md).
- Enable Event Grid resource provide on your subscription. See [instructions](handle-sms-events.md#register-an-event-grid-resource-provider).

**Applies to: programming-language-javascript**



Event Grid provides out of the box support for Azure Functions, making it easy to set up an event listener without the need to deal with the complexity of parsing headers or debugging webhooks. Using  the out of the box trigger, we can set up an Azure Function that runs each time an event is detected that matches the trigger. In this document, we focus on SMS received triggers.

## Setting up our local environment

1. Using [Visual Studio Code](https://code.visualstudio.com/), install the [Azure Functions Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions).
2. With the extension, create an Azure Function following these [instructions](../../../azure-functions/how-to-create-function-vs-code.md?pivot=programming-language-javascript).

   Configure the function with the following instructions:
   - Language: TypeScript
   - Template: Azure Event Grid Trigger
   - Function Name: User defined

    Once created, you see a function created in your directory like this:

    ```javascript
    
    import { AzureFunction, Context } from "@azure/functions"

    const eventGridTrigger: AzureFunction = async function (context: Context, eventGridEvent: any): Promise<void> {
        context.log(eventGridEvent);

    };
    
    export default eventGridTrigger;

    ```

## Configure Azure Function to receive SMS event

1. Configure Azure Function to parse values from the event like who sent it, to what number and what the message was.

     ```javascript
    
    import { AzureFunction, Context } from "@azure/functions"

    const eventGridTrigger: AzureFunction = async function (context: Context, eventGridEvent: any): Promise<void> {
        context.log(eventGridEvent);
        const to = eventGridEvent['data']['to'];
        const from = eventGridEvent['data']['from'];
        const message = eventGridEvent['data']['message'];

    };
    
    export default eventGridTrigger;

    ```

At this point, you successfully handled receiving an SMS through events. Now the possibilities of what to do with that event range from just logging it to responding to it. In the next section, we focus on responding to that SMS we received. If you don't want to do respond to the SMS, skip to the next section on running the function locally.

## Responding to the SMS

1. To respond to the incoming SMS, we use the Azure Communication Service SMS capabilities for sending SMS. We start by invoking the `SmsClient` and initializing it with the `connection string` for our resource. You can either paste the connection string directly in the code or place it inside your local.settings.json file in your Azure Function directory under values. 

``` json

{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "ACS_CONNECTION_STRING": "<<CONNECTION STRING>>"
  }
}

```

2. Then we compose an SMS to send based on the `to` and `from` values from the event we got.

    ```javascript
    import { AzureFunction, Context } from "@azure/functions"
    import { SmsClient } from "@azure/communication-sms";
    
    const connectionString = process.env.ACS_CONNECTION_STRING; //Replace with your connection string
    
    const eventGridTrigger: AzureFunction = async function (context: Context, eventGridEvent: any): Promise<void> {
        context.log(eventGridEvent);
        const to = eventGridEvent['data']['to'];
        const from = eventGridEvent['data']['from'];
        const message = eventGridEvent['data']['message'];
    
        const smsClient = new SmsClient(connectionString);
    
        const sendResults = await smsClient.send({
            from: to,
            to: [from],
            message: "Message received successfully. Will respond shortly."
        });
    
    };
    
    export default eventGridTrigger;
    ```

From here, the possibilities are endless. You can respond to a message with a prewritten answer, add a bot, or store responses by adapting the code in the last step.

## Run locally

To run the function locally, press `F5` in Visual Studio Code. We use [ngrok](https://ngrok.com/) to hook our locally running Azure Function with Azure Event Grid.

1. Once the function is running, configure `ngrok`. You need to [download ngrok](https://ngrok.com/download) for your environment.

    ```bash
    ngrok http 7071
    ```

    Copy the `ngrok` link provided where your function is running.

2. Configure SMS events through Event Grid within your Azure Communication Services resource. We do this using the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli). You need the resource ID for your Azure Communication Services resource found in the Azure portal. The resource ID looks something like: /subscriptions/`<<AZURE SUBSCRIPTION ID>>`/resourceGroups/`<<RESOURCE GROUP NAME>>`/providers/Microsoft.Communication/CommunicationServices/`<<RESOURCE NAME>>`

    ```bash
    az eventgrid event-subscription create --name "<<EVENT_SUBSCRIPTION_NAME>>" --endpoint-type webhook --endpoint "<<NGROK URL>> " --source-resource-id "<<RESOURCE_ID>>"  --included-event-types Microsoft.Communication.SMSReceived 
    ```

3. Now that everything is hooked up, test the flow by sending an SMS to the phone number on your Azure Communication Services resource. You should see the console logs on your terminal where the function is running. If you added the code to respond to the SMS, you should see that text message delivered back to you.

## Deploy to Azure

To deploy the Azure Function to Azure, you need to follow these [instructions](../../../azure-functions/how-to-create-function-vs-code.md?pivot=programming-language-javascript#deploy-the-project-to-azure). Once deployed, we configure Event Grid for the Azure Communication Services resource. With the URL for the Azure Function that was deployed (URL found in the Azure portal under the function), we run the following command:

```bash
az eventgrid event-subscription update --name "<<EVENT_SUBSCRIPTION_NAME>>" --endpoint-type azurefunction --endpoint "<<AZ FUNCTION URL>> " --source-resource-id "<<RESOURCE_ID>>"
```

Since we're updating the event subscription we created for local testing, make sure to use the same event subscription name you previously used.

You can test by sending an SMS to the phone number you set up in your Azure Communication Services resource.



**Applies to: platform-power**


Logic Apps and Power Automate provide out of the box connectors to help handle events generated by Azure Communication Services through Event Grid. Both Logic Apps and Power Automate provide the same set of connectors. It's up to you to decide what you prefer, read about the [differences between the services](https://learn.microsoft.com/microsoft-365/community/power-automate-vs-logic-apps) to inform your decision.

## Handling events with the Event Grid connector

1. Start by creating a new flow in your preferred environment. Select the `When a resource event occurs` trigger to get started.

   Screenshot of trigger selection for Power Automate.

2. Now, you can configure the connector. You need to provide a subscription you want to use. (Should be the same subscription where your Azure Communication Services resource is). Specify the type of resource. In this case, choose `Microsoft.Communication.CommunicationServices`. Then you need to provide a resource name for the Azure Communication Services resource you want it to connect to. Finally, we need to select the event types we want to receive, in this case: `Microsoft.Communication.SMSReceived`.

   Screenshot of Event Grid connector.

    The connector automatically sets up the event subscription on your behalf and configures the events it wants to receive.

3. To make our lives easier later on, add a `Parse JSON connector` to process response coming from the Event Grid connector. Configure the connector to take the `Body` object from the Event Grid connector and match it to our expected schema for the event:

    <details>
    <summary><b>Sample schema (open to see)</b></summary>

    ```json

        {
            "properties": {
                "data": {
                    "properties": {
                        "From": {
                            "type": "string"
                        },
                        "Message": {
                            "type": "string"
                        },
                        "MessageId": {
                            "type": "string"
                        },
                        "ReceivedTimestamp": {
                            "type": "string"
                        },
                        "To": {
                            "type": "string"
                        }
                    },
                    "type": "object"
                },
                "dataVersion": {
                    "type": "string"
                },
                "eventTime": {
                    "type": "string"
                },
                "eventType": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "metadataVersion": {
                    "type": "string"
                },
                "subject": {
                    "type": "string"
                },
                "topic": {
                    "type": "string"
                }
            },
            "type": "object"
        }

    ```

    </details>

   Screenshot of Parse JSON connector.

At this point, you successfully handled the SMS event. You have multiple options of what to do with it ranging from logging the event to responding to the SMS. In the context of this document, we respond to the received SMS message.

## Responding to the SMS

1. Start by adding the SMS connector into our flow and configuring it with the information for our Azure Communication Services resource. It allows the connector to access the resource and send the SMS on our behalf. You need the `connection string` for your resource.

   Screenshot of setup page for the SMS connector.

2. Next, we configure the connector with the information for the sender and recipient. We use the information from the event we received to populate them. Fip the `to` and `from` numbers to send an SMS back to the original sender. Finally, add a message.

   Screenshot of the SMS connector configuration.

Now, you can save the flow and test it by sending an SMS to the phone number associated with your Azure Communication Services resource. You should receive back a text message.

From here, the possibilities are endless. You can respond to a message with a prewritten answer, add a bot, store the response, or add workflow automation.



## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../create-communication-resource.md#clean-up-resources).

## Toll-free verification

If you have a new toll-free number and want to send a [high volume of SMS messages](../../concepts/sms/sms-faq.md#what-happens-if-i-dont-verify-my-toll-free-numbers) or send SMS messages to Canadian phone numbers, see [SMS FAQ > Submit toll free verification](../../concepts/sms/sms-faq.md#how-do-i-submit-an-application-for-a-toll-free-verification) to learn how to verify your toll-free number.

## Next steps

> 
> [Send SMS](send.md)

> 
> [Phone number types](../../concepts/telephony/plan-solution.md)

> 
> [Learn more about SMS](../../concepts/sms/concepts.md)
