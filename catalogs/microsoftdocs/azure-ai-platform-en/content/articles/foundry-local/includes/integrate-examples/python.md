---
title: Include file
description: Include file
ms.service: microsoft-foundry
ms.custom: build-2025
ms.topic: include
ms.date: 08/05/2026
ms.author: lajanuar
reviewer: wayne-ch
ms.reviewer: waynechuang
author: laujan
ai-usage: ai-assisted
---

## Prerequisites

- Python 3.11 or later installed. You can download Python from the [official Python website](https://www.python.org/downloads/).


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/python/foundry-local/web-server
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


> **Tip:**
> We recommend using a virtual environment to avoid package conflicts. You can create a virtual environment using either `venv` or `conda`.

## Use OpenAI SDK with Foundry Local

Copy-and-paste the following code into a Python file named `app.py`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/python/foundry-local/web-server/src/app.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/integrate-examples/python.md)

Reference: [Foundry Local SDK reference](../../reference/reference-sdk-current.md)
Reference: [Foundry Local REST API reference](../../reference/reference-rest.md)

Run the code using the following command:

```bash
python app.py
```

You should see a streaming response printed in your terminal. On the first run, Foundry Local might download execution providers and the model, which can take a few minutes.
