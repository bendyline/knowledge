---
title: "Quickstart: Using cURL to call the Entity Linking REST API"
titleSuffix: Foundry Tools
description: This quickstart shows how to quickly get started using the Entity linking REST API in Foundry Tools.
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: include
ms.date: 06/30/2026
ms.author: lajanuar
---
[Reference documentation](https://go.microsoft.com/fwlink/?linkid=2239169)

Use this quickstart to send entity linking requests using the REST API. In the following example, you will use cURL to identify and disambiguate entities found in text.

## Prerequisites

* Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)

## Setting up

### Create an Azure resource

To use the code sample below, you need to deploy an Azure resource. This resource will contain a key and endpoint you use to authenticate the API calls you send to Azure Language.

1. Use the following link to <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics" target="_blank">create a language resource</a> using the Azure portal. You need to sign in using your Azure subscription.
1. On the **Select additional features** screen that appears, select **Continue to create your resource**.

    A screenshot showing additional feature options in the Azure portal.

1. In the **Create language** screen, provide the following information:

    | Detail | Description |
    | --- | --- |
    | Subscription | The subscription account that your resource will be associated with. Select your Azure subscription from the drop-down menu. |
    | Resource group | A resource group is a container that stores the resources you create. Select **Create new** to create a new resource group. |
    | Region | The location of your Language resource. Different regions may introduce latency depending on your physical location, but have no impact on the runtime availability of your resource. For this quickstart, either select an available region near you, or choose **East US**. |
    | Name | The name for your Language resource. This name will also be used to create an endpoint URL that your applications will use to send API requests. |
    | Pricing tier | The [pricing tier](https://azure.microsoft.com/pricing/details/cognitive-services/language-service/) for your Language resource. You can use the **Free F0** tier to try the service and upgrade later to a paid tier for production. |
     
    A screenshot showing resource creation details in the Azure portal.

1. Make sure the **Responsible AI Notice** checkbox is checked.
1. Select **Review + Create** at the bottom of the page.

1. In the screen that appears, make sure the validation has passed, and that you entered your information correctly. Then select **Create**. 




### Get your key and endpoint

Next you will need the key and endpoint from the resource to connect your application to the API. You'll paste your key and endpoint into the code later in the quickstart.

1. After Azure Language resource deploys successfully, click the **Go to Resource** button under **Next Steps**.

    A screenshot showing the next steps after a resource has deployed.

1. On the screen for your resource, select **Keys and endpoint** on the left pane. You will use one of your keys and your endpoint in the steps below. 

    A screenshot showing the keys and endpoint section for a resource.




### Create environment variables 

Your application must be authenticated to send API requests. For production, use a secure way of storing and accessing your credentials. In this example, you will write your credentials to environment variables on the local machine running the application.

To set the environment variable for your Language resource key, open a console window, and follow the instructions for your operating system and development environment. 

- To set the `LANGUAGE_KEY` environment variable, replace `your-key` with one of the keys for your resource.
- To set the `LANGUAGE_ENDPOINT` environment variable, replace `your-endpoint` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/language-service/entity-linking/includes/quickstarts/rest-api.md)

#### [Windows](#tab/windows)

```console
setx LANGUAGE_KEY your-key
```

```console
setx LANGUAGE_ENDPOINT your-endpoint
```

> **Note:**
> If you only need to access the environment variables in the current running console, you can set the environment variable with `set` instead of `setx`.

After you add the environment variables, you might need to restart any running programs that will need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before running the example.

#### [Linux](#tab/linux)

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

```bash
export LANGUAGE_KEY=your-key
```

```bash
export LANGUAGE_ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**
1. Select **Arguments** on the **Run** (Debug Run) page
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable. 
1. Enter `LANGUAGE_KEY` for the **Name** and enter your Language resource key for the **Value**.
1. Perform these steps for your resource endpoint. Name the new environment variable `LANGUAGE_ENDPOINT`.

For more configuration options, see the [Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---



## Create a JSON file with the example request body

In a code editor, create a new file named `test_entitylinking_payload.json` and copy the following JSON example. This example request will be sent to the API in the next step.

```json
{
    "kind": "EntityLinking",
    "parameters": {
        "modelVersion": "latest"
    },
    "analysisInput":{
        "documents":[
            {
                "id":"1",
                "language":"en",
                "text": "Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975."
            }
        ]
    }
}
```

Save `test_entitylinking_payload.json` somewhere on your computer. For example, your desktop.

<a name='send-a-entity-linking-api-request'></a>

## Send an entity linking API request

Use the following commands to send the API request using the program you're using. Copy the command into your terminal, and run it.

| parameter | Description |
| --- | --- |
| `-X POST <endpoint>` | Specifies your endpoint for accessing the API. |
| `-H Content-Type: application/json` | The content type for sending JSON data. |
| `-H "Ocp-Apim-Subscription-Key:<key>` | Specifies the key for accessing the API. |
| `-d <documents>` | The JSON containing the documents you want to send. |

# [Windows](#tab/windows)

 Replace `C:\Users\<myaccount>\Desktop\test_entitylinking_payload.json` with the location of the example JSON request file you created in the previous step.

### Command prompt

```terminal
curl -X POST "%LANGUAGE_ENDPOINT%/language/:analyze-text?api-version=2022-05-01" ^
-H "Content-Type: application/json" ^
-H "Ocp-Apim-Subscription-Key: %LANGUAGE_KEY%" ^
-d "@C:\Users\<myaccount>\Desktop\test_entitylinking_payload.json"
```

### PowerShell

```terminal
curl.exe -X POST $env:LANGUAGE_ENDPOINT/language/:analyze-text?api-version=2022-05-01 `
-H "Content-Type: application/json" `
-H "Ocp-Apim-Subscription-Key: $env:LANGUAGE_KEY" `
-d "@C:\Users\<myaccount>\Desktop\test_entitylinking_payload.json"
```

#### [Linux](#tab/linux)

Use the following commands to send the API request using the program you're using. Replace `/home/mydir/test_entitylinking_payload.json` with the location of the example JSON request file you created in the previous step.

```terminal
curl -X POST $LANGUAGE_ENDPOINT/language/:analyze-text?api-version=2022-05-01 \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" \
-d "@/home/mydir/test_entitylinking_payload.json"
```

#### [macOS](#tab/macos)

Use the following commands to send the API request using the program you're using. Replace `/home/mydir/test_sentiment_payload.json` with the location of the example JSON request file you created in the previous step.

```terminal
curl -X POST $LANGUAGE_ENDPOINT/language/:analyze-text?api-version=2022-05-01 \
-H "Content-Type: application/json" \
-H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" \
-d "@/home/mydir/test_entitylinking_payload.json"
```

---

### JSON response

```json
{
    "kind": "EntityLinkingResults",
    "results": {
        "documents": [{
            "id": "1",
            "entities": [{
                "bingId": "a093e9b9-90f5-a3d5-c4b8-5855e1b01f85",
                "name": "Microsoft",
                "matches": [{
                    "text": "Microsoft",
                    "offset": 0,
                    "length": 9,
                    "confidenceScore": 0.48
                }],
                "language": "en",
                "id": "Microsoft",
                "url": "https://en.wikipedia.org/wiki/Microsoft",
                "dataSource": "Wikipedia"
            }, {
                "bingId": "0d47c987-0042-5576-15e8-97af601614fa",
                "name": "Bill Gates",
                "matches": [{
                    "text": "Bill Gates",
                    "offset": 25,
                    "length": 10,
                    "confidenceScore": 0.52
                }],
                "language": "en",
                "id": "Bill Gates",
                "url": "https://en.wikipedia.org/wiki/Bill_Gates",
                "dataSource": "Wikipedia"
            }, {
                "bingId": "df2c4376-9923-6a54-893f-2ee5a5badbc7",
                "name": "Paul Allen",
                "matches": [{
                    "text": "Paul Allen",
                    "offset": 40,
                    "length": 10,
                    "confidenceScore": 0.54
                }],
                "language": "en",
                "id": "Paul Allen",
                "url": "https://en.wikipedia.org/wiki/Paul_Allen",
                "dataSource": "Wikipedia"
            }, {
                "bingId": "52535f87-235e-b513-54fe-c03e4233ac6e",
                "name": "April 4",
                "matches": [{
                    "text": "April 4",
                    "offset": 54,
                    "length": 7,
                    "confidenceScore": 0.38
                }],
                "language": "en",
                "id": "April 4",
                "url": "https://en.wikipedia.org/wiki/April_4",
                "dataSource": "Wikipedia"
            }],
            "warnings": []
        }],
        "errors": [],
        "modelVersion": "2021-06-01"
    }
}
```

## Clean up resources

To clean up and remove an Azure AI resource, you can delete either the individual resource or the entire resource group. If you delete the resource group, all resources contained within are also deleted.

* [Azure portal](../../../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../../../multi-service-resource.md?pivots=azcli#clean-up-resources)



## Next steps

* [Entity linking language support](../../language-support.md)
* [How to call the entity linking API](../../how-to/call-api.md)  
* [Reference documentation](https://go.microsoft.com/fwlink/?linkid=2239169)
