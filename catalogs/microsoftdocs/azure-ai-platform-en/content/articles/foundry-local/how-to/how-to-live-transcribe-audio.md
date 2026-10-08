---
title: "Live transcribe audio from a microphone"
titleSuffix: Foundry Local
description: "Use the Foundry Local live audio transcription API to transcribe microphone audio in real time."
ms.service: microsoft-foundry
ms.subservice: foundry-local
ms.custom: build-2025, dev-focus
ms.topic: how-to
ms.author: samkemp
ms.reviewer: samkemp
ms.date: 04/02/2026
author: samuel100
reviewer: samuel100
zone_pivot_groups: foundry-local-sdk
ai-usage: ai-assisted
---

# Live transcribe audio from a microphone with Foundry Local

Use Foundry Local's live audio transcription API to stream microphone audio and receive transcription results in real time. In this article, you create a console application that captures audio from your microphone, streams it to a local speech model, and prints transcription output as you speak.

**Applies to: programming-language-csharp**


## Prerequisites

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0) or later installed.
- A working microphone connected to your computer.

## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/csharp/foundry-local/live-audio-transcription-example
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


Install the [NAudio](https://www.nuget.org/packages/NAudio) package for microphone capture:

```bash
dotnet add package NAudio
```

## Live transcribe from microphone

The following code initializes the Foundry Local SDK, loads a streaming speech model, captures audio from your microphone using NAudio, and streams it to the live transcription API. Partial results appear as you speak, and final results are printed on a new line.

Copy and paste the following code into `Program.cs`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/csharp/foundry-local/live-audio-transcription/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-live-transcribe-audio.md)

The `CreateLiveTranscriptionSession` method returns a session that accepts raw Pulse-code modulation (PCM) audio and yields transcription results as an async stream. NAudio's `WaveInEvent` captures microphone audio at 16-kHz mono—the format the session expects.

Run the application:

```bash
dotnet run
```

Speak into your microphone. You see real-time transcription output:

```
Listening... (press Ctrl+C to stop)
Hello, this is a test of the live transcription feature.
It transcribes audio from the microphone in real time.
```

Press **Ctrl+C** to stop recording. The model finishes processing any remaining audio and the application exits.


**Applies to: programming-language-javascript**


## Prerequisites

- [Node.js](https://nodejs.org/en/download/) version 20 or later installed.
- A working microphone connected to your computer.

## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/javascript/foundry-local/live-audio-transcription-example
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


Install the [naudiodon2](https://www.npmjs.com/package/naudiodon2) package for microphone capture:

```bash
npm install naudiodon2
```

## Live transcribe from microphone

The following code initializes the Foundry Local SDK, loads a streaming speech model, captures audio from your microphone using naudiodon2, and streams it to the live transcription API. Partial results appear as you speak, and final results are printed on a new line.

Copy and paste the following code into `app.js`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/javascript/foundry-local/live-audio-transcription/app.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-live-transcribe-audio.md)

The `createLiveTranscriptionSession` method returns a session that accepts raw PCM audio and yields transcription results as an async generator. The naudiodon2 `AudioIO` captures microphone audio at 16 kHz mono 16-bit — the format the session expects.

Run the application:

```bash
node app.js
```

Speak into your microphone. You see real-time transcription output:

```
Listening... (press Ctrl+C to stop)
Hello, this is a test of the live transcription feature.
It transcribes audio from the microphone in real time.
```

Press **Ctrl+C** to stop recording. The model finishes processing any remaining audio and the application exits.


**Applies to: programming-language-python**


## Prerequisites

- [Python 3.11](https://www.python.org/downloads/) or later installed.
- A working microphone connected to your computer.

## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/python/foundry-local/live-audio-transcription
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


Install [PyAudio](https://pypi.org/project/PyAudio/) for microphone capture:

```bash
pip install pyaudio
```

## Live transcribe from microphone

The following code initializes the Foundry Local SDK, loads a streaming speech model, captures audio from your microphone using PyAudio, and streams it to the live transcription API. Partial results appear as you speak, and final results are printed on a new line.

Copy and paste the following code into `app.py`:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/python/foundry-local/live-audio-transcription/src/app.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-live-transcribe-audio.md)

The `create_live_transcription_session` method returns a session that accepts raw PCM audio and yields transcription results as you stream chunks. PyAudio captures microphone audio at 16 kHz mono 16-bit — the format the session expects.

Run the application:

```bash
python src/app.py
```

Speak into your microphone. You see real-time transcription output:

```
Listening... (press Ctrl+C to stop)
Hello, this is a test of the live transcription feature.
It transcribes audio from the microphone in real time.
```

Press **Ctrl+C** to stop recording. The model finishes processing any remaining audio and the application exits.


**Applies to: programming-language-rust**


## Prerequisites

- [Rust and Cargo](https://www.rust-lang.org/tools/install) installed (Rust 1.70.0 or later).
- A working microphone connected to your computer.

## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/rust/foundry-local/live-audio-transcription-example
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


The sample uses the [cpal](https://crates.io/crates/cpal) crate for cross-platform microphone capture. The dependency is already listed in `Cargo.toml`.

## Live transcribe from microphone

The following code initializes the Foundry Local SDK, loads a streaming speech model, captures audio from your microphone using cpal, and streams it to the live transcription API. Partial results appear as you speak, and final results are printed on a new line.

Replace the contents of `src/main.rs` with the following code:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/rust/foundry-local/live-audio-transcription/src/main.rs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/how-to/how-to-live-transcribe-audio.md)

The `create_live_transcription_session` method returns a session that accepts raw Pulse-code modulation (PCM) audio and yields transcription results as an async stream. The cpal input stream captures microphone audio at 16-kHz mono, which is the format the session expects.

Run the application:

```bash
cargo run
```

Speak into your microphone. You see real-time transcription output:

```
Listening... (press Ctrl+C to stop)
Hello, this is a test of the live transcription feature.
It transcribes audio from the microphone in real time.
```

Press **Ctrl+C** to stop recording. The model finishes processing any remaining audio and the application exits.



## Related content

- [Transcribe recorded audio files](how-to-transcribe-audio.md)
- [Use native chat completions API with Foundry Local](how-to-use-native-chat-completions.md)
- [Explore the Foundry Local SDK reference](../reference/reference-sdk-current.md)
