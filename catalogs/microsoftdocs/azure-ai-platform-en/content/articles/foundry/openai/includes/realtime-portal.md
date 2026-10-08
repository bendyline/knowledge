---
manager: mcleans
author: PatrickFarley
ms.author: pafarley
ms.service: microsoft-foundry
ms.subservice: foundry-openai
ms.topic: include
ms.date: 3/20/2025
---

## Deploy a model for real-time audio


To deploy the `gpt-realtime` model in the Microsoft Foundry portal:
1. Go to the [Foundry portal](https://ai.azure.com/?cid=learnDocs) and create or select your project. 
1. Select your model deployments:
    1. For Azure OpenAI resource, select **Deployments** from **Shared resources** section in the left pane.
    1. For Foundry resource, select **Models + endpoints** from under **My assets** in the left pane.
1. Select **+ Deploy model** > **Deploy base model** to open the deployment window. 
1. Search for and select the `gpt-realtime` model and then select **Confirm**.
1. Review the deployment details and select **Deploy**.
1. Follow the wizard to finish deploying the model.

Now that you have a deployment of the `gpt-realtime` model, you can interact with it in the Foundry portal **Audio** playground or Realtime API.


## Use the GPT real-time audio

To chat with your deployed `gpt-realtime` model in the [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs) **Real-time audio** playground, follow these steps:

1. Go to the [Foundry portal](https://ai.azure.com/?cid=learnDocs) and select your project that has your deployed `gpt-realtime` model.
1. Select **Playgrounds** from the left pane.
1. Select **Audio playground** > **Try the Audio playground**. 

    > **Note:**
    > The **Chat playground** doesn't support the `gpt-realtime` model. Use the **Audio playground** as described in this section.

1. Select your deployed `gpt-realtime` model from the **Deployment** dropdown.

    <!--:::image type="content" source="../media/how-to/real-time/real-time-playground.png" alt-text="Screenshot of the audio playground with the deployed model selected." lightbox="../media/how-to/real-time/real-time-playground.png":::-->

1. Optionally, you can edit contents in the **Give the model instructions and context** text box. Give the model instructions about how it should behave and any context it should reference when generating a response. You can describe the assistant's personality, tell it what it should and shouldn't answer, and tell it how to format responses.
1. Optionally, change settings such as threshold, prefix padding, and silence duration.
1. Select **Start listening** to start the session. You can speak into the microphone to start a chat.
1. You can interrupt the chat at any time by speaking. You can end the chat by selecting the **Stop listening** button.
