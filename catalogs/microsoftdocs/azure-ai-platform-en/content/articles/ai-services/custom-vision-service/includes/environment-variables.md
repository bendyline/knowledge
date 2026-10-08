---
author: PatrickFarley
ms.service: azure-ai-custom-vision
ms.topic: include
ms.date: 05/22/2023
ms.author: pafarley
---

## Create environment variables 

In this example, you'll write your credentials to environment variables on the local machine running the application.


Go to the Azure portal. If the Custom Vision resources you created in the **Prerequisites** section deployed successfully, select the **Go to Resource** button under **Next steps**. You can find your keys and endpoints in the resources' **Keys and Endpoint** pages, under **Resource Management**. You'll need to get the keys for both your training resource and prediction resource, along with the API endpoints.

You can find the prediction resource ID on the prediction resource's **Properties** tab in the Azure portal, listed as **Resource ID**.

> **Tip:**
> You also use https://www.customvision.ai to get these values. After you sign in, select the **Settings** icon at the top right. On the **Setting** pages, you can view all the keys, resource ID, and endpoints.


To set the environment variables, open a console window and follow the instructions for your operating system and development environment. 

- To set the `VISION_TRAINING KEY` environment variable, replace `<your-training-key>` with one of the keys for your training resource.
- To set the `VISION_TRAINING_ENDPOINT` environment variable, replace `<your-training-endpoint>` with the endpoint for your training resource.
- To set the `VISION_PREDICTION_KEY` environment variable, replace `<your-prediction-key>` with one of the keys for your prediction resource.
- To set the `VISION_PREDICTION_ENDPOINT` environment variable, replace `<your-prediction-endpoint>` with the endpoint for your prediction resource.
- To set the `VISION_PREDICTION_RESOURCE_ID` environment variable, replace `<your-resource-id>` with the resource ID for your prediction resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/includes/environment-variables.md)

#### [Windows](#tab/windows)

```console
setx VISION_TRAINING_KEY <your-training-key>
```

```console
setx VISION_TRAINING_ENDPOINT <your-training-endpoint>
```

```console
setx VISION_PREDICTION_KEY <your-prediction-key>
```

```console
setx VISION_PREDICTION_ENDPOINT <your-prediction-endpoint>
```

```console
setx VISION_PREDICTION_RESOURCE_ID <your-resource-id>
```

After you add the environment variables, you might need to restart any running programs that read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export VISION_TRAINING_KEY=<your-training-key>
```

```bash
export VISION_TRAINING_ENDPOINT=<your-training-endpoint>
```

```bash
export VISION_PREDICTION_KEY=<your-prediction-key>
```

```bash
export VISION_PREDICTION_ENDPOINT=<your-prediction-endpoint>
```

```bash
export VISION_PREDICTION_RESOURCE_ID=<your-resource-id>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---
