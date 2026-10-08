---
author: samuel100
ms.author: samkemp
ms.reviewer: samkemp
ms.topic: include
ms.date: 05/20/2026
---

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

[Code reference unavailable in this source snapshot: ~/foundry-local-main/samples/python/foundry-local/live-audio-transcription/src/app.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-local/includes/live-audio-transcription/python.md)

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
