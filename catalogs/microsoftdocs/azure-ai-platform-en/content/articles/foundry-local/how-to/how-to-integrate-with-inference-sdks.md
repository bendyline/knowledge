---
title: "Integrate with inference SDKs"
titleSuffix: Foundry Local
description: "This article provides instructions on how to integrate Foundry Local with common Inferencing SDKs."
ms.service: microsoft-foundry
ms.subservice: foundry-local
ms.custom: build-2025, dev-focus
ms.topic: how-to
ms.author: lajanuar
ms.reviewer: samkemp
ms.date: 05/11/2026
zone_pivot_groups: foundry-local-sdk
author: laujan
reviewer: samuel100
ai-usage: ai-assisted
---

# Integrate inference SDKs with Foundry Local

Foundry Local integrates with OpenAI-compatible SDKs and HTTP clients through a local REST server. This article shows you how to connect your app to local AI models by using popular SDKs.

**Applies to: programming-language-python**


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

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/python/foundry-local/web-server/src/app.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-integrate-with-inference-sdks.md)

Reference: [Foundry Local SDK reference](../reference/reference-sdk-current.md)
Reference: [Foundry Local REST API reference](../reference/reference-rest.md)

Run the code using the following command:

```bash
python app.py
```

You should see a streaming response printed in your terminal. On the first run, Foundry Local might download execution providers and the model, which can take a few minutes.


**Applies to: programming-language-csharp**


## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later installed.


## Samples repository

You can find the complete sample code for this article in the [Foundry samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample, use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/csharp/foundry-local/foundry-local-web-server
```

## Install packages


If you're developing or shipping on Windows, select the **Windows** tab. The Windows package integrates with the [Windows ML](https://learn.microsoft.com/windows/ai/new-windows-ml/overview) runtime — it provides the same API surface area with a wider breadth of hardware acceleration.

### [Windows](#tab/windows)

```bash
dotnet add package Microsoft.AI.Foundry.Local.WinML
dotnet add package OpenAI
```

### [Cross-Platform](#tab/xplatform)

```bash
dotnet add package Microsoft.AI.Foundry.Local
dotnet add package OpenAI
```

---

The C# samples in the GitHub repository are preconfigured projects. If you're building from scratch, you should read the [Foundry Local SDK reference](../reference/reference-sdk-current.md) for more details on how to set up your C# project with Foundry Local. 


## Use OpenAI SDK with Foundry Local

Copy-and-paste the following code into a C# file named `Program.cs`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/foundry-local-web-server/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-integrate-with-inference-sdks.md)

Reference: [Foundry Local SDK reference](../reference/reference-sdk-current.md)
Reference: [Foundry Local REST API reference](../reference/reference-rest.md)

```bash
dotnet run
```


**Applies to: programming-language-javascript**


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

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/web-server-example/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-integrate-with-inference-sdks.md)

Reference: [Foundry Local SDK reference](../reference/reference-sdk-current.md)
Reference: [Foundry Local REST API reference](../reference/reference-rest.md)

Run the code using the following command:

```bash
node app.js
```

You should see a text response printed in your terminal. On the first run, Foundry Local might download execution providers and the model, which can take a few minutes.

> **Tip:**
> For a complete working sample that combines chat and audio transcription, see the [Chat + Audio sample](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/javascript/foundry-local/chat-and-audio-foundry-local) on GitHub.


**Applies to: programming-language-rust**


## Prerequisites

- [Rust and Cargo](https://www.rust-lang.org/tools/install) installed.


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/rust/foundry-local/foundry-local-webserver
```

## Install packages


If you're developing or shipping on Windows, select the **Windows** tab. The Windows package integrates with the [Windows ML](https://learn.microsoft.com/windows/ai/new-windows-ml/overview) runtime — it provides the same API surface area with a wider breadth of hardware acceleration.

### [Windows](#tab/windows)

```bash
cargo add foundry-local-sdk --features winml
cargo add tokio --features full
cargo add tokio-stream anyhow
```

### [Cross-Platform](#tab/xplatform)

```bash
cargo add foundry-local-sdk
cargo add tokio --features full
cargo add tokio-stream anyhow
```

---


## Update the `main.rs` file

Copy-and-paste the following code into the Rust file named `main.rs`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/rust/foundry-local/foundry-local-webserver/src/main.rs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-integrate-with-inference-sdks.md)

Reference: [Foundry Local SDK reference](../reference/reference-sdk-current.md)
Reference: [Foundry Local REST API reference](../reference/reference-rest.md)

Run the code using the following command:

```bash
cargo run
```

You should see a streaming response printed in your terminal. On the first run, Foundry Local might download execution providers and the model, which can take a few minutes.




## Related content

- [Compile Hugging Face models to run on Foundry Local](how-to-compile-hugging-face-models.md)
- [Explore the Foundry Local CLI reference](../reference/reference-cli.md)
