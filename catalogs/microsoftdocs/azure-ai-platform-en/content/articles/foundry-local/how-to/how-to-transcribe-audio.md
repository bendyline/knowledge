---
title: "Transcribe audio files with Foundry Local"
titleSuffix: Foundry Local
description: "This article provides instructions on how to transcribe audio using Foundry Local with C# and JavaScript."
ms.service: microsoft-foundry
ms.subservice: foundry-local
ms.custom: build-2025, dev-focus
ms.topic: how-to
ms.author: lajanuar
ms.reviewer: samkemp
ms.date: 05/28/2026
author: laujan
reviewer: samuel100
ai-usage: ai-assisted
zone_pivot_groups: foundry-local-sdk
---
    
# Transcribe recorded audio files with Foundry Local

Use Foundry Local's native audio transcription API and convert a local audio file into text. In this article, you create a console application that downloads a Whisper model, loads it, and streams transcription output.

**Applies to: programming-language-csharp**


## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later installed.

## Samples repository

You can find the complete sample code for this article in the [Foundry samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample, use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/csharp/foundry-local/audio-transcription-example
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


## Transcribe an audio file

Copy and paste the following code into a C# file named `Program.cs`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/audio-transcription-example/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-transcribe-audio.md)

The sample includes a `Recording.mp3` file. To transcribe a different audio file, pass the file path as an argument.

```bash
dotnet run
```

To transcribe a custom audio file:

```bash
dotnet run -- path/to/audio.mp3
```


**Applies to: programming-language-javascript**


## Prerequisites

- [Node.js](https://nodejs.org/en/download/) version 20 or later installed.

## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/javascript/foundry-local/audio-transcription-example
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


## Transcribe an audio file

Copy and paste the following code into a JavaScript file named `app.js`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/audio-transcription-example/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-transcribe-audio.md)

The sample includes a `Recording.mp3` file. To transcribe a different audio file, pass the file path as an argument.

To run the application, use the following command in your terminal:

```bash
node app.js
```

To transcribe a custom audio file:

```bash
node app.js path/to/audio.mp3
```


**Applies to: programming-language-python**


## Prerequisites

- [Python 3.11](https://www.python.org/downloads/) or later installed.

## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/python/foundry-local/audio-transcription
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


## Transcribe an audio file

Copy and paste the following code into a Python file named `app.py`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/python/foundry-local/audio-transcription/src/app.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-transcribe-audio.md)

The sample includes a `Recording.mp3` file. To transcribe a different audio file, pass the file path as an argument.

Run the code by using the following command:

```bash
python app.py
```

To transcribe a custom audio file:

```bash
python app.py path/to/audio.mp3
```


**Applies to: programming-language-rust**


## Prerequisites

- [Rust and Cargo](https://www.rust-lang.org/tools/install) installed (Rust 1.70.0 or later).

## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/rust/foundry-local/audio-transcription-example
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


## Transcribe an audio file

Replace the contents of `main.rs` with the following code:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/rust/foundry-local/audio-transcription-example/src/main.rs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-transcribe-audio.md)

The sample includes a `Recording.mp3` file. To transcribe a different audio file, pass the file path as an argument.

Run the code by using the following command:

```bash
cargo run
```

To transcribe a custom audio file:

```bash
cargo run -- path/to/audio.mp3
```



## Related content

- [Use native chat completions API with Foundry Local](how-to-use-native-chat-completions.md)
- [Use chat completions via REST server with Foundry Local](how-to-integrate-with-inference-sdks.md)
- [Use Foundry Local with LangChain](how-to-use-langchain-with-foundry-local.md)
- [Compile Hugging Face models and run on Foundry Local](how-to-compile-hugging-face-models.md)
- [Explore the Foundry Local CLI reference](../reference/reference-cli.md)
