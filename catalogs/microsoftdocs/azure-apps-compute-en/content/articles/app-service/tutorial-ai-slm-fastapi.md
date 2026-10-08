---
title: "Tutorial: FastAPI chatbot with SLM extension"
description: "Learn how to deploy a FastAPI application integrated with a Phi-4 sidecar extension on Azure App Service."
author: cephalin
ms.author: cephalin
ms.date: 07/27/2026
ms.topic: tutorial
ms.custom:
  - build-2025
ms.collection: ce-skilling-ai-copilot
ms.update-cycle: 180-days
ms.service: azure-app-service
---

# Tutorial: Run chatbot in App Service with a Phi-4 sidecar extension (FastAPI)

This tutorial guides you through deploying a FastAPI-based chatbot application integrated with the Phi-4 [sidecar extension](overview-sidecar.md) on Azure App Service. By following the steps, you'll learn how to set up a scalable web app, add an AI-powered sidecar for enhanced conversational capabilities, and test the chatbot's functionality.


Hosting your own small language model (SLM) offers several advantages:

- Full control over your data. Sensitive information isn't exposed to external services, which is critical for industries with strict compliance requirements.
- Self-hosted models can be fine-tuned to meet specific use cases or domain-specific requirements. 
- Minimized network latency and faster response times for a better user experience.
- Full control over resource allocation, ensuring optimal performance for your application.



## Prerequisites

- An [Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) with an active subscription.
- A [GitHub account](https://github.com/).

## Deploy the sample application

1. In the browser, navigate to the [sample application repository](https://github.com/Azure-Samples/ai-slm-in-app-service-sidecar).
1. Start a new Codespace from the repository.
1. Log in with your Azure account:

    ```azurecli
    az login
    ```

1. Open the terminal in the Codespace and run the following commands:

    ```azurecli
    cd use_sidecar_extension/fastapiapp
    az webapp up --sku P3MV3
    ```

1. If you're using **Python 3.13 or earlier**, configure the startup command:

    ```azurecli
    az webapp config set --startup-file "gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app"
    ```

    If you're using **Python 3.14 or later**, no startup command is required.

For more information, see [Quickstart: Deploy a Python (Django, Flask, or FastAPI) web app to Azure App Service](quickstart-python.md).


## Add the Phi-4 sidecar extension

In this section, you add the Phi-4 sidecar extension to your ASP.NET Core application hosted on Azure App Service.

1. Navigate to the Azure portal and go to your app's management page.
1. In the left-hand menu, select **Deployment** > **Deployment Center**.
1. On the **Containers** tab, select **Add** > **Sidecar extension**.
1. In the sidecar extension options, select **AI: phi-4-q4-gguf (Experimental)**.
1. Provide a name for the sidecar extension.
1. Select **Save** to apply the changes.
1. Wait a few minutes for the sidecar extension to deploy. Keep selecting **Refresh** until the **Status** column shows **Running**.

This Phi-4 sidecar extension uses a [chat completion API like OpenAI](https://platform.openai.com/docs/api-reference/chat/create) that can respond to chat completion response at `http://localhost:11434/v1/chat/completions`. For more information on how to interact with the API, see:

- [OpenAI documentation: Create chat completion](https://platform.openai.com/docs/api-reference/chat/create)
- [OpenAI documentation: Streaming](https://platform.openai.com/docs/api-reference/chat-streaming)

## Test the chatbot

1. In your app's management page, in the left-hand menu, select **Overview**.
1. Under **Default domain**, select the URL to open your web app in a browser.
1. Verify that the chatbot application is running and responding to user inputs.

    Screenshot showing the fashion assistant app running in the browser.



## How the sample application works

The sample application demonstrates how to integrate a FastAPI-based service with the SLM sidecar extension. The `SLMService` class encapsulates the logic for sending requests to the SLM API and processing the streamed responses. This integration enables the application to generate conversational responses dynamically.

Looking in [use_sidecar_extension/fastapiapp/app/services/slm_service.py](https://github.com/Azure-Samples/ai-slm-in-app-service-sidecar/blob/main/use_sidecar_extension/fastapiapp/app/services/slm_service.py), you see that:

- The service sends a POST request to the SLM endpoint `http://localhost:11434/v1/chat/completions`.

    ```python
    self.api_url = 'http://localhost:11434/v1/chat/completions'
    ```
- The POST payload includes the system message and the prompt that's built from the selected product and the user query.

    ```python
    request_payload = {
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        "stream": True,
        "cache_prompt": False,
        "n_predict": 2048  # Increased token limit to allow longer responses
    }
    ```

- The POST request [streams the response](https://www.python-httpx.org/async/#streaming-responses) line by line. Each line is parsed to extract the generated content (or token).

    ```python
    async with httpx.AsyncClient() as client:
        async with client.stream(
            "POST", 
            self.api_url,
            json=request_payload,
            headers={"Content-Type": "application/json"},
            timeout=30.0
        ) as response:
            async for line in response.aiter_lines():
                if not line or line == "[DONE]":
                    continue
                
                if line.startswith("data: "):
                    line = line.replace("data: ", "").strip()
                    
    
                try:
                    json_obj = json.loads(line)
                    if "choices" in json_obj and len(json_obj["choices"]) > 0:
                        delta = json_obj["choices"][0].get("delta", {})
                        content = delta.get("content")
                        if content:
                            yield content
    ```


## Frequently asked questions

- [How does pricing tier affect the performance of the SLM sidecar?](#how-does-pricing-tier-affect-the-performance-of-the-slm-sidecar)
- [How to use my own SLM sidecar?](#how-to-use-my-own-slm-sidecar)

---

### How does pricing tier affect the performance of the SLM sidecar?

Since AI models consume considerable resources, choose the pricing tier that gives you sufficient vCPUs and memory to run your specific model. For this reason, the built-in AI sidecar extensions only appear when the app is in a suitable pricing tier. If you build your own SLM sidecar container, you should also use a CPU-optimized model, since the App Service pricing tiers are CPU-only tiers.

For example, the [Phi-3 mini model with a 4K context length from Hugging Face](https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-onnx) is designed to run with limited resources and provides strong math and logical reasoning for many common scenarios. It also comes with a CPU-optimized version. In App Service, we tested the model on all premium tiers and found it to perform well in the [P2mv3](https://azure.microsoft.com/pricing/details/app-service/linux/) tier or higher. If your requirements allow, you can run it on a lower tier.

---

### How to use my own SLM sidecar?

The sample repository contains a sample SLM container that you can use as a sidecar. It runs a FastAPI application that listens on port 8000, as specified in its [Dockerfile](https://github.com/Azure-Samples/ai-slm-in-app-service-sidecar/blob/main/bring_your_own_slm/src/phi-3-sidecar/Dockerfile). The application uses [ONNX Runtime](https://onnxruntime.ai/docs/) to load the Phi-3 model, then forwards the HTTP POST data to the model and streams the response from the model back to the client. For more information, see [model_api.py](https://github.com/Azure-Samples/ai-slm-in-app-service-sidecar/blob/main/bring_your_own_slm/src/phi-3-sidecar/model_api.py).

To build the sidecar image yourself, you need to install Docker Desktop locally on your machine.

1. Clone the repository locally.

    ```bash
    git clone https://github.com/Azure-Samples/ai-slm-in-app-service-sidecar
    cd ai-slm-in-app-service-sidecar
    ```

1. Change into the Phi-3 image's source directory and download the model locally using the [Huggingface CLI](https://huggingface.co/docs/huggingface_hub/guides/cli).

    ```bash
    cd bring_your_own_slm/src/phi-3-sidecar
    huggingface-cli download microsoft/Phi-3-mini-4k-instruct-onnx --local-dir ./Phi-3-mini-4k-instruct-onnx
    ```
    
    The [Dockerfile](https://github.com/Azure-Samples/ai-slm-in-app-service-sidecar/blob/main/bring_your_own_slm/src/phi-3-sidecar/Dockerfile) is configured to copy the model from *./Phi-3-mini-4k-instruct-onnx*.
    
1. Build the Docker image. For example:

    ```bash
    docker build --tag phi-3 .
    ```

1. Upload the built image to Azure Container Registry with [Push your first image to your Azure container registry using the Docker CLI](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-docker-cli).

1. In the **Deployment Center** > **Containers (new)** tab, select **Add** > **Custom container** and configure the new container as follows:
    - **Name**: *phi-3*
    - **Image source**: **Azure Container Registry**
    - **Registry**: your registry
    - **Image**: the uploaded image
    - **Tag**: the image tag you want
    - **Port**: *8000*
1. Select **Apply**.

See [bring_your_own_slm/src/webapp](https://github.com/Azure-Samples/ai-slm-in-app-service-sidecar/blob/main/bring_your_own_slm/src/webapp) for a sample application that interacts with this custom sidecar container.

## Next steps

[Tutorial: Configure a sidecar container for a Linux app in Azure App Service](tutorial-sidecar.md)
