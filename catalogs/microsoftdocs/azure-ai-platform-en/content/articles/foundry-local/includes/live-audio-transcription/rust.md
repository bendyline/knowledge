---
author: samuel100
ms.author: samkemp
ms.reviewer: samkemp
ms.topic: include
ms.date: 05/30/2026
---

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

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/rust/foundry-local/live-audio-transcription/src/main.rs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/live-audio-transcription/rust.md)

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
