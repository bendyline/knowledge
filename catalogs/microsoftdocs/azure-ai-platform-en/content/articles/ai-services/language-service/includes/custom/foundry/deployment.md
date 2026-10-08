---
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: include
ms.date: 05/06/2026
ms.author: lajanuar
---
To deploy your model from within Microsoft Foundry:

1. Select **Deploying a model** from the left side menu.

2. Select **Add deployment** to start a new deployment job.

    A screenshot showing the deployment button

3. Select **Create new deployment** to create a new deployment and assign a trained model from the dropdown below. You can also Overwrite an existing deployment by selecting this option and select the trained model you want to assign to it from the dropdown below.

    > **Note:**
    > Overwriting an existing deployment doesn't require changes to your [prediction API](https://aka.ms/ct-runtime-swagger) call but the results you get will be based on the newly assigned model.

    A screenshot showing the deployment screen

4. Select **Deploy** to start the deployment job.

5. After deployment is successful, an expiration date will appear next to it. [Deployment expiration](../../../concepts/model-lifecycle.md) is when your deployed model will be unavailable to be used for prediction, which typically happens twelve months after a training configuration expires.
