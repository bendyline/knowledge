---
title: "Quickstart: Image Analysis 4.0 client SDK for Node.js"
description: Get started with the Image Analysis 4.0 client SDK for Node.js with this quickstart
author: PatrickFarley
manager: mcleans
ms.service: azure-vision-foundry-tools
ms.topic: include
ms.date: 01/15/2024
ms.author: pafarley
---

<a name="HOLTop"></a>

Use the Image Analysis client SDK for JavaScript to read text in an image and generate an image caption. This quickstart analyzes a remote image and prints the results to the console.

[Reference documentation](https://aka.ms/azsdk/image-analysis/ref-docs/js) | [Package (npm)](https://aka.ms/azsdk/image-analysis/package/npm) | [Samples](https://aka.ms/azsdk/image-analysis/samples/js)

> **Tip:**
> The Analysis 4.0 API can do many different operations. See the [Analyze Image how-to guide](../../how-to/call-analyze-image-40.md) for examples that showcase all of the available features.

## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* The current version of [Node.js](https://nodejs.org/)
* The current version of Edge, Chrome, Firefox, or Safari internet browser.
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision"  title="create a Computer Vision resource"  target="_blank">create a Computer Vision resource</a> in the Azure portal to get your key and endpoint. In order to use the captioning feature in this quickstart, you must create your resource in one of the supported Azure regions (see [Image captions](https://learn.microsoft.com/azure/ai-services/computer-vision/concept-describe-images-40) for the list of regions). After it deploys, select **Go to resource**.
    * You need the key and endpoint from the resource you create to connect your application to Azure Vision in Foundry Tools.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.



## Create environment variables 

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `VISION_KEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `VISION_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/includes/quickstarts-sdk/image-analysis-node-sdk-40.md)

#### [Windows](#tab/windows)

```console
setx VISION_KEY <your_key>
```

```console
setx VISION_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export VISION_KEY=<your_key>
```

```bash
export VISION_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---



## Analyze image

1. Create a new Node.js application

    In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it.

    ```console
    mkdir myapp && cd myapp
    ```

    Run the `npm init` command to create a node application with a `package.json` file.

    ```console
    npm init
    ```

1. Install the client library

    Install `@azure-rest/ai-vision-image-analysis` npm package:

    ```console
    npm install @azure-rest/ai-vision-image-analysis
    ```

    Also install the dotenv package:

    ```console
    npm install dotenv
    ```

    Your app's `package.json` file will be updated with the dependencies.

1. Create a new file, *index.js*. Open it in a text editor and paste in the following code.

   [Code reference unavailable in this source snapshot: ~/cognitive-services-quickstart-code/javascript/ComputerVision/4-0/quickstart.js?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/includes/quickstarts-sdk/image-analysis-node-sdk-40.md)

1. Run the application with the `node` command on your quickstart file.

   ```console
   node index.js
   ```

<!-- tbd output-->


## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to install the Image Analysis client library and make basic image analysis calls. Next, learn more about the Analyze API features.

> 
>[Call the Analyze API](../../how-to/call-analyze-image.md)

* [Image Analysis overview](../../overview-image-analysis.md)
* The source code for this sample can be found on [GitHub](https://aka.ms/azsdk/image-analysis/samples/js).
