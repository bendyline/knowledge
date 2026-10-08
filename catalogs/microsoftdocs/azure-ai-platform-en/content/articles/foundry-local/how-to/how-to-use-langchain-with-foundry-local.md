---
title: "Build a translation app with LangChain"
titleSuffix: Foundry Local
description: "Learn how to build a LangChain application using Foundry Local"
keywords: Foundry Tools, cognitive, AI models, local inference
ms.service: microsoft-foundry
ms.subservice: foundry-local
ms.topic: how-to
ms.date: 05/10/2026
ms.reviewer: eneros
ms.author: lajanuar
author: laujan
reviewer: eneros
ms.custom:
  - build-2025
  - dev-focus
zone_pivot_groups: foundry-local-langchain
ai-usage: ai-assisted
#customer intent: As a developer, I want to get started with Foundry Local so that I can run AI models locally.
---

# Build a translation app with LangChain

This article shows you how to build a translation app by using the Foundry Local SDK and [LangChain](https://www.langchain.com/langchain). Use a local model to translate text between languages.

<!-- markdownlint-disable MD044 -->
**Applies to: programming-language-python**


## Prerequisites

Before starting this tutorial, you need:

- **Python 3.11 or later** installed on your computer. You can download Python from the [official website](https://www.python.org/downloads/).


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/python/foundry-local/langchain-integration
```

## Install packages


If you're developing or shipping on Windows, select the **Windows** tab. The Windows package integrates with the [Windows ML](https://learn.microsoft.com/windows/ai/new-windows-ml/overview) runtime — it provides the same API surface area with a wider breadth of hardware acceleration.

### [Windows](#tab/windows)

```bash
pip install foundry-local-sdk-winml openai
```

### [Cross-Platform](#tab/xplatform)

```bash
pip install foundry-local-sdk openai
```

---


You also need to install the following LangChain package:

```bash
pip install langchain[openai]
```

## Create a translation application

Create a new Python file named `translation_app.py` in your favorite IDE and add the following code:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/python/foundry-local/langchain-integration/src/app.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-use-langchain-with-foundry-local.md)

#### References

- Reference: [Foundry Local SDK reference](../reference/reference-sdk-current.md)
- Reference: [Get started with Foundry Local](../get-started.md)

> **Note:**
> One of key benefits of Foundry Local is that it **automatically** selects the most suitable model **variant** for the user's hardware. For example, if the user has a GPU, it downloads the GPU version of the model. If the user has an NPU (Neural Processing Unit), it downloads the NPU version. If the user doesn't have either a GPU or NPU, it downloads the CPU version of the model.

To run the application, open a terminal and navigate to the directory where you saved the `translation_app.py` file. Then, run the following command:

```bash
python translation_app.py
```

You're done when you see a `Response:` line with the translated text.

You should see output similar to:

```text
Translating 'I love to code.' to French...
Response: <translated text>
```


**Applies to: programming-language-javascript**


## Prerequisites

Before starting this tutorial, you need:

- **Node.js 20 or later** installed on your computer. You can download Node.js from the [official website](https://nodejs.org/).


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/javascript/foundry-local/langchain-integration-example
```

## Install packages


If you're developing or shipping on Windows, select the **Windows** tab. The Windows package integrates with the [Windows ML](https://learn.microsoft.com/windows/ai/new-windows-ml/overview) runtime — it provides the same API surface area with a wider breadth of hardware acceleration.

### [Windows](#tab/windows)

```bash
npm install foundry-local-sdk-winml openai
```

### [Cross-Platform](#tab/xplatform)

```bash
npm install foundry-local-sdk openai
```

---


### Install LangChain packages

You also need to install the following Node.js packages:

```bash
npm install @langchain/openai @langchain/core
```

## Create a translation application

Create a new JavaScript file named `translation_app.js` in your favorite IDE and add the following code:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/langchain-integration-example/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-use-langchain-with-foundry-local.md)

#To run the application, open a terminal and navigate to the directory where you saved the `translation_app.js` file. Then, run the following command:

```bash
node translation_app.js
```

You're done when you see a `Response:` line with the translated text.

You should see output similar to:

```text
Translating 'I love to code.' to French...
Response: J'aime le coder
```


<!-- markdownlint-enable MD044 -->

## Troubleshooting

- If you see a service connection error, restart the Foundry Local service and try again.
- The first run can take longer because Foundry Local might download the model.
- If Node.js fails with an import or top-level await error, confirm your project is configured for ES modules.

## Related content

- Explore the [LangChain documentation](https://python.langchain.com/docs/introduction) for advanced features.
- [Compile Hugging Face models to run on Foundry Local](how-to-compile-hugging-face-models.md)
