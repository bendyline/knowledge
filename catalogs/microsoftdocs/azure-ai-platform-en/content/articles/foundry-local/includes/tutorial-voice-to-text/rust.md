---
author: laujan
ms.author: lajanuar
ms.reviewer: samkemp
ms.topic: include
ms.date: 06/19/2026
---

## Install packages


## Samples repository

The complete sample code for this article is available in the [foundry-samples GitHub repository](https://github.com/microsoft-foundry/foundry-samples). To clone the repository and navigate to the sample use:

```bash
git clone https://github.com/microsoft-foundry/foundry-samples.git
cd foundry-samples/samples/rust/foundry-local/tutorial-voice-to-text
```


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

In this step, you load a speech-to-text model and transcribe an audio file. The Foundry Local SDK uses the `whisper` model alias to select the best Whisper variant for your hardware.

- Open `src/main.rs` and replace its contents with the following code to initialize the SDK, load the speech model, and transcribe an audio file:

    [Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/rust/foundry-local/tutorial-voice-to-text/src/main.rs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-voice-to-text/rust.md)

    The `create_audio_client` method returns a client for audio operations. The `transcribe` method accepts a file path and returns an object with a `text` field containing the transcribed content.

> **Note:**
> Replace `"meeting-notes.wav"` with the path to your audio file. Supported formats include WAV, MP3, and FLAC.

## Summarize the transcription

Now use a chat model to organize the raw transcription into structured notes. Load the `qwen2.5-0.5b` model and send the transcription as context with a system prompt that instructs the model to produce clean, summarized notes.

Add the following code after the transcription step, inside the `main` function:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/rust/foundry-local/tutorial-voice-to-text/src/main.rs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-voice-to-text/rust.md)

The system prompt shapes the model's output format. By instructing it to produce "organized, concise notes with bullet points," you get structured content rather than a raw paraphrase.

## Combine into a complete app

Replace the contents of `src/main.rs` with the following complete code that transcribes an audio file and summarizes the transcription:

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/rust/foundry-local/tutorial-voice-to-text/src/main.rs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/tutorial-voice-to-text/rust.md)

> **Note:**
> Replace `"meeting-notes.wav"` with the path to your audio file. Supported formats include WAV, MP3, and FLAC.

Run the note taker:

```bash
cargo run
```

You see output similar to:

```
Downloading speech model: 100.00%
Speech model loaded.

Transcription:
OK so let's get started with the weekly sync. First, the backend
API is nearly done. Sarah finished the authentication endpoints
yesterday. We still need to add rate limiting before we go to
staging. On the frontend, the dashboard redesign is about seventy
percent complete. Jake, can you walk us through the new layout?
Great. The charts look good. I think we should add a filter for
date range though. For testing, we have about eighty percent code
coverage on the API. We need to write integration tests for the
new auth flow before Friday. Let's plan to do a full regression
test next Tuesday before the release. Any blockers? OK, sounds
like we are in good shape. Let's wrap up.

Downloading chat model: 100.00%
Chat model loaded.

Summary:
- **Backend API**: Authentication endpoints complete. Rate limiting
  still needed before staging deployment.
- **Frontend**: Dashboard redesign 70% complete. New chart layout
  reviewed. Action item: add a date range filter.
- **Testing**: API code coverage at 80%. Integration tests for the
  auth flow due Friday. Full regression test scheduled for next
  Tuesday before release.
- **Status**: No blockers reported. Team is on track.

Done. Models unloaded.
```

The application first transcribes the audio content, then passes that text to a chat model that extracts key points and organizes them into structured notes.
