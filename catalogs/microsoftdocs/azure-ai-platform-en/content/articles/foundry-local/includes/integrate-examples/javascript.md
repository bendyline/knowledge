---
title: Include file
description: Include file
ms.service: microsoft-foundry
ms.custom: build-2025
ms.topic: include
ms.date: 08/05/2026
ms.author: lajanuar
reviewer: wayne-ch
author: laujan
ms.reviewer: waynechuang
ai-usage: ai-assisted
---

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) version 20 or later installed.


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/javascript/foundry-local/web-server-example
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


## Use OpenAI SDK with Foundry Local

Copy-and-paste the following code into a JavaScript file named `app.js`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/web-server-example/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/integrate-examples/javascript.md)

Reference: [Foundry Local SDK reference](../../reference/reference-sdk-current.md)
Reference: [Foundry Local REST API reference](../../reference/reference-rest.md)

Run the code using the following command:

```bash
node app.js
```

You should see a text response printed in your terminal. On the first run, Foundry Local might download execution providers and the model, which can take a few minutes.

> **Tip:**
> For a complete working sample that combines chat and audio transcription, see the [Chat + Audio sample](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/javascript/foundry-local/chat-and-audio-foundry-local) on GitHub.
