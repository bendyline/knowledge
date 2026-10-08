---
title: Include file
description: Include file
ms.service: microsoft-foundry
ms.custom: build-2025
ms.topic: include
ms.date: 08/05/2026
ms.author: lajanuar
ms.reviewer: waynechuang
reviewer: wayne-ch
author: laujan
ai-usage: ai-assisted
---

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

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/langchain-integration-example/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/use-langchain/javascript.md)

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
