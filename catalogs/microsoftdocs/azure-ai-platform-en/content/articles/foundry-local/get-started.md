---
title: "Get started with Foundry Local"
titleSuffix: Foundry Local
description: "Build your first on-device AI application with the Foundry Local SDK."
ms.date: 06/04/2026
ms.service: microsoft-foundry
ms.subservice: foundry-local
ms.topic: quickstart
ms.reviewer: samkemp
ms.author: lajanuar
author: laujan
reviewer: samuel100
ms.custom:
  - build-2025
  - build-aifnd
  - peer-review-program
  - dev-focus
keywords:
  - Foundry Local
  - on-device AI
  - local inference
zone_pivot_groups: foundry-local-sdk
ai-usage: ai-assisted
# customer intent: As a developer, I want to get started with Foundry Local so that I can run AI models locally.
---

# Get started with Foundry Local

In this quickstart, you create a console application that downloads a local AI model, generates a streaming chat response, and unloads the model. Everything runs on your device with no cloud dependency or Azure subscription.


**Applies to: programming-language-csharp**


## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later installed.


## Samples repository

You can find the complete sample code for this article in the [Foundry samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample, use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/csharp/foundry-local/native-chat-completions
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

The C# samples in the GitHub repository are preconfigured projects. If you're building from scratch, you should read the [Foundry Local SDK reference](reference/reference-sdk-current.md) for more details on how to set up your C# project with Foundry Local. 


## Use native chat completions API    

Copy and paste the following code into a C# file named `Program.cs`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/native-chat-completions/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/get-started.md)

Run the code by using the following command:

```bash
dotnet run
```


> **Note:**
> If you're targeting Windows, use the Windows-specific instructions under the Windows tab for the best performance and experience.

## Troubleshooting

- **Build errors referencing `net8.0`**: Install the [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0), then rebuild the app.
- **`Model not found`**: Run the optional model listing snippet to find an alias available on your device, then update the alias passed to `GetModelAsync`.
- **Slow first run**: Model downloads can take time the first time you run the app.


**Applies to: programming-language-javascript**


## Prerequisites
- [Node.js 20](https://nodejs.org/en/download/) or later installed.


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/javascript/foundry-local/native-chat-completions
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


## Use native chat completions API

Copy and paste the following code into a JavaScript file named `app.js`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/native-chat-completions/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/get-started.md)

Run the code by using the following command:

```bash
node app.js
```


**Applies to: programming-language-python**


## Prerequisites

- [Python 3.11](https://www.python.org/downloads/) or later installed.


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/python/foundry-local/native-chat-completions
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


## Use native chat completions API    

Copy and paste the following code into a Python file named `app.py`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/python/foundry-local/native-chat-completions/src/app.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/get-started.md)

Run the code by using the following command:

```bash
python app.py
```

## Troubleshooting

- **`ModuleNotFoundError: No module named 'foundry_local_sdk'`**: Install the SDK by running `pip install foundry-local-sdk`.
- **`Model not found`**: Run the optional model listing snippet to find an alias available on your device, then update the alias passed to `get_model`.
- **Slow first run**: Model downloads can take time the first time you run the app.


**Applies to: programming-language-rust**


## Prerequisites

- [Rust and Cargo](https://www.rust-lang.org/tools/install) installed (Rust 1.70.0 or later).


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/rust/foundry-local/native-chat-completions
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


## Use native chat completions API    

Replace the contents of `main.rs` with the following code:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/rust/foundry-local/native-chat-completions/src/main.rs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/get-started.md)

Run the code by using the following command:

```bash
cargo run
```

## Troubleshooting

- **Build errors**: Ensure you have Rust 1.70.0 or later installed. Run `rustup update` to get the latest version.
- **`Model not found`**: Verify the model alias is correct. Use `manager.catalog().get_models().await?` to list available models.
- **Slow first run**: Model downloads can take time the first time you run the app.



## Related content

- [What is Foundry Local?](what-is-foundry-local.md)
- [Use chat completions via REST server](how-to/how-to-integrate-with-inference-sdks.md)
- [Foundry Local CLI reference](reference/reference-cli.md)
