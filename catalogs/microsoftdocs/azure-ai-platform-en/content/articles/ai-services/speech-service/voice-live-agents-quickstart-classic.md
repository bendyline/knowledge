---
title: "Quickstart: Voice Live with Agent Service (classic)"
titleSuffix: Foundry Tools
description: Learn how to use Voice Live with Agent Service (classic) for real-time voice conversations.
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: quickstart
ms.date: 10/04/2026
author: PatrickFarley
reviewer: PatrickFarley
ms.author: pafarley
ms.reviewer: pafarley
zone_pivot_groups: voice-live-quickstart-agents-classic
recommendations: false
ai-usage: ai-assisted
---

# Quickstart: Voice Live with Agent Service (classic)

> **Important:**
> The Voice Live integration with Agent Service (classic) is deprecated as of August 31, 2026. Use the [Voice Live with Foundry Agent Service quickstart](voice-live-agents-quickstart.md).


> **Note:**
> This feature is currently in public preview. This preview is provided without a service-level agreement, and is not recommended for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


**Applies to: ai-foundry-portal**


Learn how to use Voice Live with [Microsoft Foundry Agent Service](https://learn.microsoft.com/azure/ai-foundry/agents/overview) and [Azure Speech in Foundry Tools](https://learn.microsoft.com/azure/ai-services/speech-service/overview) in the Microsoft Foundry portal.


Create and run applications to use Voice Live with agents for real-time voice conversations.

Agents provide several advantages:

- Use centralized configuration in the agent itself instead of session code.
- Handle complex logic and conversational behaviors for easier updates.
- Connect automatically by using your agent ID, with all settings managed internally.
- Support multiple conversational experiences without changing client code.

To use Voice Live without agents, see the [Voice Live API quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-quickstart).


## Prerequisites
<!--
#### [Foundry (new) portal](#tab/foundry-new)

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A [Microsoft Foundry resource](../../../../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](../../../voice-live.md).
- A Foundry agent created in [!INCLUDE [foundry-link](../../../../../foundry/includes/foundry-link.md)]. For more information about creating an agent, see the [Create an agent quickstart](/azure/ai-foundry/agents/quickstart).


#### [Foundry (classic) portal](#tab/foundry-classic)
-->
- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A [Microsoft Foundry resource](../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](voice-live.md).
- A Microsoft Foundry agent created in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs). For more information about creating an agent, see the [Create an agent quickstart](https://learn.microsoft.com/azure/ai-foundry/agents/quickstart).
<!--
---
-->

> **Tip:**
> To use Voice Live, you don't need to deploy an audio model with your Microsoft Foundry resource. Voice Live is fully managed, and the model is automatically deployed for you. For more information about models availability, see the [Voice Live overview documentation](voice-live.md).

## Try out Voice Live in the playground

To try out the Voice Live demo, follow these steps:

<!--
#### [Foundry (new) portal](#tab/foundry-new)

1. [!INCLUDE [foundry-sign-in](../../../../../foundry/includes/foundry-sign-in.md)]

1. Select **Build** in the upper right menu, and select **Agents** from the left pane. 

1. Select the agent you created previously to go to the **Agent playground**.

1. Switch the **Enable Voice Live for this agent** toggle **On**. Now your agent is connected Voice Live.

1. Expand the right pane, which contains the Voice Live settings. Optionally choose a voice, adjust the VAD settings, set the voice temperature and speed, and other settings to configure voice behavior. The **Proactive engagement** toggle allows the agent to speak first in the conversation.
 
1. Select **Start** to start speaking and select **End** to end the chat session.

#### [Foundry (classic) portal](#tab/foundry-classic)
-->
1. 
Sign in to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs).  Make sure the **New Foundry** toggle is off.  These steps refer to **Foundry (classic)**.


 
1. Select **Playgrounds** from the left pane.
1. In the **Speech playground** tile, select **Try the Speech playground**.
1. Select **Speech capabilities by scenario** > **Voice Live**.

   Screenshot of filtering Speech service capabilities by scenario.

1. Select an agent that you configured in the **Agents** playground.

   Screenshot of the option to bring an agent for Voice Live in the speech playground.

1. Edit other settings as needed, such as the **Voice**, **Speaking rate**, and **Voice activity detection (VAD)**. The **Proactive engagement** toggle allows the agent to speak first in the conversation.

1. Select **Start** to start speaking and select **End** to end the chat session.

<!--
---
-->



**Applies to: programming-language-python**


Learn how to use Voice Live with [Microsoft Foundry Agent Service](https://learn.microsoft.com/azure/ai-foundry/agents/overview) using the VoiceLive SDK for Python.


[Reference documentation](https://learn.microsoft.com/python/api/overview/azure/ai-voicelive-readme) | [Package (PyPi)](https://pypi.org/project/azure-ai-voicelive/) | [Additional samples on GitHub](https://aka.ms/voicelive/github-python)
 


Create and run applications to use Voice Live with agents for real-time voice conversations.

Agents provide several advantages:

- Use centralized configuration in the agent itself instead of session code.
- Handle complex logic and conversational behaviors for easier updates.
- Connect automatically by using your agent ID, with all settings managed internally.
- Support multiple conversational experiences without changing client code.

To use Voice Live without agents, see the [Voice Live API quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-quickstart).


## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- <a href="https://www.python.org/" target="_blank">Python 3.10 or later version</a>. If you don't have a suitable version of Python installed, you can follow the instructions in the [VS Code Python Tutorial](https://code.visualstudio.com/docs/python/python-tutorial#_install-a-python-interpreter) for the easiest way of installing Python on your operating system.
- A [Microsoft Foundry resource](../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](voice-live.md).
- A Microsoft Foundry agent created in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs). For more information about creating an agent, see the [Create an agent quickstart](https://learn.microsoft.com/azure/ai-foundry/agents/quickstart).

> **Tip:**
> To use Voice Live, you don't need to deploy an audio model with your Microsoft Foundry resource. Voice Live is fully managed, and the model is automatically deployed for you. For more information about models availability, see the [Voice Live overview documentation](voice-live.md).

## Microsoft Entra ID prerequisites

For the recommended keyless authentication with Microsoft Entra ID, you need to:
- Install the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) used for keyless authentication with Microsoft Entra ID.
- Assign the `Cognitive Services User` role to your user account. You can assign roles in the Azure portal under **Access control (IAM)** > **Add role assignment**.

## Set up

1. Create a new folder `voice-live-quickstart` and go to the quickstart folder with the following command:

    ```shell
    mkdir voice-live-quickstart && cd voice-live-quickstart
    ```

1. Create a virtual environment. If you already have Python 3.10 or higher installed, you can create a virtual environment using the following commands:

    # [Windows](#tab/windows)

    ```bash
    py -3 -m venv .venv
    .venv\scripts\activate
    ```

    # [Linux](#tab/linux)

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

    # [macOS](#tab/macos)

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

    ---

    Activating the Python environment means that when you run ```python``` or ```pip``` from the command line, you then use the Python interpreter contained in the ```.venv``` folder of your application. You can use the ```deactivate``` command to exit the python virtual environment, and can later reactivate it when needed.

    > **Tip:**
    > We recommend that you create and activate a new Python environment to use to install the packages you need for this tutorial. Don't install packages into your global Python installation. You should always use a virtual or conda environment when installing Python packages, otherwise you can break your global installation of Python.

1. Create a file named **requirements.txt**. Add the following packages to the file:

    ```txt
    azure-ai-voicelive[aiohttp]
    pyaudio
    python-dotenv
    azure-identity
    ```

1. Install the packages:

    ```bash
    pip install -r requirements.txt
    ```

## Retrieve resource information


#### [Microsoft Entra ID](#tab/keyless)

Create a new file named `.env` in the folder where you want to run the code. 

In the `.env` file, add the following environment variables for authentication:

```plaintext
AZURE_VOICELIVE_ENDPOINT=<your_endpoint>
AZURE_VOICELIVE_PROJECT_NAME=<your_project_name>
AZURE_VOICELIVE_AGENT_ID=<your_agent_ID>
AZURE_VOICELIVE_API_VERSION=2025-10-01
```

Replace the placeholder values with your actual endpoint, project name, agent ID, and API version.

| Variable name | Value |
| --- | --- |
| `AZURE_VOICELIVE_ENDPOINT` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. |
| `AZURE_VOICELIVE_PROJECT_NAME` | The name of your Microsoft Foundry project. |
| `AZURE_VOICELIVE_AGENT_ID` | The ID of your Microsoft Foundry agent. |
| `AZURE_VOICELIVE_API_VERSION` | The API version you want to use. For example, `2025-10-01`. |

For more information, see [Keyless authentication](https://learn.microsoft.com/azure/ai-services/authentication) and [setting environment variables](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables).

#### [API key](#tab/api-key)

Create a new file named `.env` in the folder where you want to run the code. 

In the `.env` file, add the following environment variables for authentication:

```plaintext
AZURE_VOICELIVE_ENDPOINT=<your_endpoint>
AZURE_VOICELIVE_PROJECT_NAME=<your_project_name>
AZURE_VOICELIVE_AGENT_ID=<your_agent_ID>
AZURE_VOICELIVE_API_VERSION=2025-10-01
AZURE_VOICELIVE_API_KEY=<your_api_key> # Only required if using API key authentication
```

Replace the placeholder values with your actual endpoint, project name, agent ID, API version, and API key.

| Variable name | Value |
| --- | --- |
| `AZURE_VOICELIVE_ENDPOINT` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. |
| `AZURE_VOICELIVE_PROJECT_NAME` | The name of your Microsoft Foundry project. |
| `AZURE_VOICELIVE_AGENT_ID` | The ID of your Microsoft Foundry agent. |
| `AZURE_VOICELIVE_API_VERSION` | The API version you want to use. For example, `2025-10-01`. |
| `AZURE_VOICELIVE_API_KEY` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. You can use either `KEY1` or `KEY2`. |

For more information, see [Finding API keys](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables) and [setting environment variables](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/voice-live-agents-quickstart-classic.md)

---


## Start a conversation

The sample code in this quickstart uses Microsoft Entra ID for authentication, as the current integration only supports this authentication method.

1. Create the `voice-live-agents-quickstart.py` file with the following code:

    ```python
    # -------------------------------------------------------------------------
    # Copyright (c) Microsoft Corporation. All rights reserved.
    # Licensed under the MIT License.
    # -------------------------------------------------------------------------
    from __future__ import annotations
    import os
    import sys
    import argparse
    import asyncio
    import base64
    from datetime import datetime
    import logging
    import queue
    import signal
    from typing import Union, Optional, TYPE_CHECKING, cast
    
    from azure.core.credentials import AzureKeyCredential
    from azure.core.credentials_async import AsyncTokenCredential
    from azure.identity.aio import AzureCliCredential, DefaultAzureCredential
    
    from azure.ai.voicelive.aio import connect
    from azure.ai.voicelive.models import (
        AudioEchoCancellation,
        AudioNoiseReduction,
        AzureStandardVoice,
        InputAudioFormat,
        Modality,
        OutputAudioFormat,
        RequestSession,
        ServerEventType,
        ServerVad
    )
    from dotenv import load_dotenv
    import pyaudio
    
    if TYPE_CHECKING:
        # Only needed for type checking; avoids runtime import issues
        from azure.ai.voicelive.aio import VoiceLiveConnection
    
    ## Change to the directory where this script is located
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Environment variable loading
    load_dotenv('./.env', override=True)
    
    # Set up logging
    ## Add folder for logging
    if not os.path.exists('logs'):
        os.makedirs('logs')
    
    ## Add timestamp for logfiles
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    
    ## Create conversation log filename
    logfilename = f"{timestamp}_conversation.log"
    
    ## Set up logging
    logging.basicConfig(
        filename=f'logs/{timestamp}_voicelive.log',
        filemode="w",
        format='%(asctime)s:%(name)s:%(levelname)s:%(message)s',
        level=logging.INFO
    )
    logger = logging.getLogger(__name__)
    
    class AudioProcessor:
        """
        Handles real-time audio capture and playback for the voice assistant.
    
        Threading Architecture:
        - Main thread: Event loop and UI
        - Capture thread: PyAudio input stream reading
        - Send thread: Async audio data transmission to VoiceLive
        - Playback thread: PyAudio output stream writing
        """
        
        loop: asyncio.AbstractEventLoop
        
        class AudioPlaybackPacket:
            """Represents a packet that can be sent to the audio playback queue."""
            def __init__(self, seq_num: int, data: Optional[bytes]):
                self.seq_num = seq_num
                self.data = data
    
        def __init__(self, connection):
            self.connection = connection
            self.audio = pyaudio.PyAudio()
    
            # Audio configuration - PCM16, 24kHz, mono as specified
            self.format = pyaudio.paInt16
            self.channels = 1
            self.rate = 24000
            self.chunk_size = 1200 # 50ms
    
            # Capture and playback state
            self.input_stream = None
    
            self.playback_queue: queue.Queue[AudioProcessor.AudioPlaybackPacket] = queue.Queue()
            self.playback_base = 0
            self.next_seq_num = 0
            self.output_stream: Optional[pyaudio.Stream] = None
    
            logger.info("AudioProcessor initialized with 24kHz PCM16 mono audio")
    
        def start_capture(self):
            """Start capturing audio from microphone."""
            def _capture_callback(
                in_data,      # data
                _frame_count,  # number of frames
                _time_info,    # dictionary
                _status_flags):
                """Audio capture thread - runs in background."""
                audio_base64 = base64.b64encode(in_data).decode("utf-8")
                asyncio.run_coroutine_threadsafe(
                    self.connection.input_audio_buffer.append(audio=audio_base64), self.loop
                )
                return (None, pyaudio.paContinue)
    
            if self.input_stream:
                return
    
            # Store the current event loop for use in threads
            self.loop = asyncio.get_event_loop()
    
            try:
                self.input_stream = self.audio.open(
                    format=self.format,
                    channels=self.channels,
                    rate=self.rate,
                    input=True,
                    frames_per_buffer=self.chunk_size,
                    stream_callback=_capture_callback,
                )
                logger.info("Started audio capture")
    
            except Exception:
                logger.exception("Failed to start audio capture")
                raise
    
        def start_playback(self):
            """Initialize audio playback system."""
            if self.output_stream:
                return
    
            remaining = bytes()
            def _playback_callback(
                _in_data,
                frame_count,  # number of frames
                _time_info,
                _status_flags):
    
                nonlocal remaining
                frame_count *= pyaudio.get_sample_size(pyaudio.paInt16)
    
                out = remaining[:frame_count]
                remaining = remaining[frame_count:]
    
                while len(out) < frame_count:
                    try:
                        packet = self.playback_queue.get_nowait()
                    except queue.Empty:
                        out = out + bytes(frame_count - len(out))
                        continue
                    except Exception:
                        logger.exception("Error in audio playback")
                        raise
    
                    if not packet or not packet.data:
                        # None packet indicates end of stream
                        logger.info("End of playback queue.")
                        break
    
                    if packet.seq_num < self.playback_base:
                        # skip requested
                        # ignore skipped packet and clear remaining
                        if len(remaining) > 0:
                            remaining = bytes()
                        continue
    
                    num_to_take = frame_count - len(out)
                    out = out + packet.data[:num_to_take]
                    remaining = packet.data[num_to_take:]
    
                if len(out) >= frame_count:
                    return (out, pyaudio.paContinue)
                else:
                    return (out, pyaudio.paComplete)
    
            try:
                self.output_stream = self.audio.open(
                    format=self.format,
                    channels=self.channels,
                    rate=self.rate,
                    output=True,
                    frames_per_buffer=self.chunk_size,
                    stream_callback=_playback_callback
                )
                logger.info("Audio playback system ready")
            except Exception:
                logger.exception("Failed to initialize audio playback")
                raise
    
        def _get_and_increase_seq_num(self):
            seq = self.next_seq_num
            self.next_seq_num += 1
            return seq
    
        def queue_audio(self, audio_data: Optional[bytes]) -> None:
            """Queue audio data for playback."""
            self.playback_queue.put(
                AudioProcessor.AudioPlaybackPacket(
                    seq_num=self._get_and_increase_seq_num(),
                    data=audio_data))
    
        def skip_pending_audio(self):
            """Skip current audio in playback queue."""
            self.playback_base = self._get_and_increase_seq_num()
    
        def shutdown(self):
            """Clean up audio resources."""
            if self.input_stream:
                self.input_stream.stop_stream()
                self.input_stream.close()
                self.input_stream = None
    
            logger.info("Stopped audio capture")
    
            # Inform thread to complete
            if self.output_stream:
                self.skip_pending_audio()
                self.queue_audio(None)
                self.output_stream.stop_stream()
                self.output_stream.close()
                self.output_stream = None
    
            logger.info("Stopped audio playback")
    
            if self.audio:
                self.audio.terminate()
    
            logger.info("Audio processor cleaned up")
    
    class BasicVoiceAssistant:
        """
            Basic voice assistant implementing the VoiceLive SDK patterns with Foundry Agent.
            This sample also demonstrates how to collect a conversation log of user and agent interactions.
        """
    
    
        def __init__(
            self,
            endpoint: str,
            credential: Union[AzureKeyCredential, AsyncTokenCredential],
            agent_id: str,
            foundry_project_name: str,
            voice: str,
        ):
    
            self.endpoint = endpoint
            self.credential = credential
            self.agent_id = agent_id
            self.foundry_project_name = foundry_project_name
            self.voice = voice
            self.connection: Optional["VoiceLiveConnection"] = None
            self.audio_processor: Optional[AudioProcessor] = None
            self.session_ready = False
            self.conversation_started = False
    
        async def start(self):
            """Start the voice assistant session."""
            try:
                logger.info("Connecting to VoiceLive API with Foundry agent connection %s for project %s", self.agent_id, self.foundry_project_name)
    
                # Get agent access token
                agent_access_token = (await DefaultAzureCredential().get_token("https://ai.azure.com/.default")).token
                logger.info("Obtained agent access token")
    
                # Connect to VoiceLive WebSocket API
                async with connect(
                    endpoint=self.endpoint,
                    credential=self.credential,
                    query={
                        "agent-id": self.agent_id,
                        "agent-project-name": self.foundry_project_name,
                        "agent-access-token": agent_access_token
                    },
                ) as connection:
                    conn = connection
                    self.connection = conn
    
                    # Initialize audio processor
                    ap = AudioProcessor(conn)
                    self.audio_processor = ap
    
                    # Configure session for voice conversation
                    await self._setup_session()
    
                    # Start audio systems
                    ap.start_playback()
    
                    logger.info("Voice assistant ready! Start speaking...")
                    print("\n" + "=" * 60)
                    print("≡ƒÄñ VOICE ASSISTANT READY")
                    print("Start speaking to begin conversation")
                    print("Press Ctrl+C to exit")
                    print("=" * 60 + "\n")
    
                    # Process events
                    await self._process_events()
            finally:
                if self.audio_processor:
                    self.audio_processor.shutdown()
    
        async def _setup_session(self):
            """Configure the VoiceLive session for audio conversation."""
            logger.info("Setting up voice conversation session...")
    
            # Create voice configuration
            voice_config: Union[AzureStandardVoice, str]
            if self.voice.startswith("en-US-") or self.voice.startswith("en-CA-") or "-" in self.voice:
                # Azure voice
                voice_config = AzureStandardVoice(name=self.voice)
            else:
                # OpenAI voice (alloy, echo, fable, onyx, nova, shimmer)
                voice_config = self.voice
    
            # Create turn detection configuration
            turn_detection_config = ServerVad(
                threshold=0.5,
                prefix_padding_ms=400,
                silence_duration_ms=500)
    
            # Create session configuration
            session_config = RequestSession(
                modalities=[Modality.TEXT, Modality.AUDIO],
                voice=voice_config,
                input_audio_format=InputAudioFormat.PCM16,
                output_audio_format=OutputAudioFormat.PCM16,
                turn_detection=turn_detection_config,
                input_audio_echo_cancellation=AudioEchoCancellation(),
                input_audio_noise_reduction=AudioNoiseReduction(type="azure_deep_noise_suppression"),
            )
    
            conn = self.connection
            assert conn is not None, "Connection must be established before setting up session"
            await conn.session.update(session=session_config)
    
            logger.info("Session configuration sent")
    
        async def _process_events(self):
            """Process events from the VoiceLive connection."""
            try:
                conn = self.connection
                assert conn is not None, "Connection must be established before processing events"
                async for event in conn:
                    await self._handle_event(event)
            except Exception:
                logger.exception("Error processing events")
                raise
    
        async def _handle_event(self, event):
            """Handle different types of events from VoiceLive."""
            logger.debug("Received event: %s", event.type)
            ap = self.audio_processor
            conn = self.connection
            assert ap is not None, "AudioProcessor must be initialized"
            assert conn is not None, "Connection must be established"
    
            if event.type == ServerEventType.SESSION_UPDATED:
                logger.info("Session ready: %s", event.session.id)
                await write_conversation_log(f"SessionID: {event.session.id}")
                await write_conversation_log(f"Model: {event.session.model}")
                await write_conversation_log(f"Voice: {event.session.voice}")
                await write_conversation_log(f"Instructions: {event.session.instructions}")
                await write_conversation_log(f"")
                self.session_ready = True
    
                # Invoke Proactive greeting
                if not self.conversation_started:
                    self.conversation_started = True
                    logger.info("Sending proactive greeting request")
                    try:
                        await conn.response.create()
    
                    except Exception:
                        logger.exception("Failed to send proactive greeting request")
    
                # Start audio capture once session is ready
                ap.start_capture()
    
            elif event.type == ServerEventType.CONVERSATION_ITEM_INPUT_AUDIO_TRANSCRIPTION_COMPLETED:
                print(f'≡ƒæñ You said:\t{event.get("transcript", "")}')
                await write_conversation_log(f'User Input:\t{event.get("transcript", "")}')
    
            elif event.type == ServerEventType.RESPONSE_TEXT_DONE:
                print(f'≡ƒñû Agent responded with text:\t{event.get("text", "")}')
                await write_conversation_log(f'Agent Text Response:\t{event.get("text", "")}')
    
            elif event.type == ServerEventType.RESPONSE_AUDIO_TRANSCRIPT_DONE:
                print(f'≡ƒñû Agent responded with audio transcript:\t{event.get("transcript", "")}')
                await write_conversation_log(f'Agent Audio Response:\t{event.get("transcript", "")}')
    
            elif event.type == ServerEventType.INPUT_AUDIO_BUFFER_SPEECH_STARTED:
                logger.info("User started speaking - stopping playback")
                print("≡ƒÄñ Listening...")
    
                ap.skip_pending_audio()
    
            elif event.type == ServerEventType.INPUT_AUDIO_BUFFER_SPEECH_STOPPED:
                logger.info("≡ƒÄñ User stopped speaking")
                print("≡ƒñö Processing...")
    
            elif event.type == ServerEventType.RESPONSE_CREATED:
                logger.info("≡ƒñû Assistant response created")
    
            elif event.type == ServerEventType.RESPONSE_AUDIO_DELTA:
                logger.debug("Received audio delta")
                ap.queue_audio(event.delta)
    
            elif event.type == ServerEventType.RESPONSE_AUDIO_DONE:
                logger.info("≡ƒñû Assistant finished speaking")
                print("≡ƒÄñ Ready for next input...")
    
            elif event.type == ServerEventType.RESPONSE_DONE:
                logger.info("Γ£à Response complete")
    
            elif event.type == ServerEventType.ERROR:
                msg = event.error.message
                logger.error("Γ¥î VoiceLive error: %s", msg)
                print(f"Error: {msg}")
    
            elif event.type == ServerEventType.CONVERSATION_ITEM_CREATED:
                logger.debug("Conversation item created: %s", event.item.id)
    
            else:
                logger.debug("Unhandled event type: %s", event.type)
    
    async def write_conversation_log(message: str) -> None:
        """Write a message to the conversation log."""
        def _write_to_file():
            with open(f'logs/{logfilename}', 'a', encoding='utf-8') as conversation_log:
                conversation_log.write(message + "\n")
        
        await asyncio.to_thread(_write_to_file)
    
    def parse_arguments():
        """Parse command line arguments."""
        parser = argparse.ArgumentParser(
            description="Basic Voice Assistant using Azure VoiceLive SDK",
            formatter_class=argparse.ArgumentDefaultsHelpFormatter,
        )
    
        parser.add_argument(
            "--api-key",
            help="Azure VoiceLive API key. If not provided, will use AZURE_VOICELIVE_API_KEY environment variable.",
            type=str,
            default=os.environ.get("AZURE_VOICELIVE_API_KEY"),
        )
    
        parser.add_argument(
            "--endpoint",
            help="Azure VoiceLive endpoint",
            type=str,
            default=os.environ.get("AZURE_VOICELIVE_ENDPOINT", "https://your-resource-name.services.ai.azure.com/"),
        )
    
        parser.add_argument(
            "--agent_id",
            help="Foundry agent ID to use",
            type=str,
            default=os.environ.get("AZURE_VOICELIVE_AGENT_ID", ""),
        )
    
        parser.add_argument(
            "--foundry_project_name",
            help="Foundry project name to use",
            type=str,
            default=os.environ.get("AZURE_VOICELIVE_PROJECT_NAME", ""),
        )
    
        parser.add_argument(
            "--voice",
            help="Voice to use for the assistant. E.g. alloy, echo, fable, en-US-AvaNeural, en-US-GuyNeural",
            type=str,
            default=os.environ.get("AZURE_VOICELIVE_VOICE", "en-US-Ava:DragonHDLatestNeural"),
        )
    
        parser.add_argument(
            "--use-token-credential", help="Use Azure token credential instead of API key", action="store_true", default=True
        )
    
        parser.add_argument("--verbose", help="Enable verbose logging", action="store_true")
    
        return parser.parse_args()
    
    
    def main():
        """Main function."""
        args = parse_arguments()
    
        # Set logging level
        if args.verbose:
            logging.getLogger().setLevel(logging.DEBUG)
    
        # Validate credentials
        if not args.api_key and not args.use_token_credential:
            print("Γ¥î Error: No authentication provided")
            print("Please provide an API key using --api-key or set AZURE_VOICELIVE_API_KEY environment variable,")
            print("or use --use-token-credential for Azure authentication.")
            sys.exit(1)
    
        # Create client with appropriate credential
        credential: Union[AzureKeyCredential, AsyncTokenCredential]
        if args.use_token_credential:
            credential = AzureCliCredential()  # or DefaultAzureCredential() if needed
            logger.info("Using Azure token credential")
        else:
            credential = AzureKeyCredential(args.api_key)
            logger.info("Using API key credential")
    
        # Create and start voice assistant
        assistant = BasicVoiceAssistant(
            endpoint=args.endpoint,
            credential=credential,
            agent_id=args.agent_id,
            foundry_project_name=args.foundry_project_name,
            voice=args.voice,
        )
    
        # Setup signal handlers for graceful shutdown
        def signal_handler(_sig, _frame):
            logger.info("Received shutdown signal")
            raise KeyboardInterrupt()
    
        signal.signal(signal.SIGINT, signal_handler)
        signal.signal(signal.SIGTERM, signal_handler)
    
        # Start the assistant
        try:
            asyncio.run(assistant.start())
        except KeyboardInterrupt:
            print("\n≡ƒæï Voice assistant shut down. Goodbye!")
        except Exception as e:
            print("Fatal Error: ", e)
    
    if __name__ == "__main__":
        # Check audio system
        try:
            p = pyaudio.PyAudio()
            # Check for input devices
            input_devices = [
                i
                for i in range(p.get_device_count())
                if cast(Union[int, float], p.get_device_info_by_index(i).get("maxInputChannels", 0) or 0) > 0
            ]
            # Check for output devices
            output_devices = [
                i
                for i in range(p.get_device_count())
                if cast(Union[int, float], p.get_device_info_by_index(i).get("maxOutputChannels", 0) or 0) > 0
            ]
            p.terminate()
    
            if not input_devices:
                print("Γ¥î No audio input devices found. Please check your microphone.")
                sys.exit(1)
            if not output_devices:
                print("Γ¥î No audio output devices found. Please check your speakers.")
                sys.exit(1)
    
        except Exception as e:
            print(f"Γ¥î Audio system check failed: {e}")
            sys.exit(1)
    
        print("≡ƒÄÖ∩╕Å  Basic Voice Assistant with Azure VoiceLive SDK")
        print("=" * 50)
    
        # Run the assistant
        main()
    ```

1. Sign in to Azure with the following command:

    ```shell
    az login
    ```

1. Run the Python file.

    ```shell
    python voice-live-agents-quickstart.py
    ```

1. Start speaking with the agent and hear responses. To interrupt the agent, speak while it's talking. Enter **Ctrl+C** to quit the conversation.

## Output

The application prints output to the console showing connection status, audio stream events, and playback activity. Audio plays back through your speakers or headphones.

```text
≡ƒÄÖ∩╕Å  Basic Voice Assistant with Azure VoiceLive SDK
==================================================

============================================================
≡ƒÄñ VOICE ASSISTANT READY
Start speaking to begin conversation
Press Ctrl+C to exit
============================================================

≡ƒÄñ Listening...
≡ƒñö Processing...
≡ƒæñ You said:  User Input:       Hello.
≡ƒÄñ Ready for next input...
≡ƒñû Agent responded with audio transcript:  Agent Audio Response:        Hello! I'm Tobi the agent. How can I assist you today?
≡ƒÄñ Listening...
≡ƒñö Processing...
≡ƒæñ You said:  User Input:       What are the opening hours of the Eiffel Tower?
≡ƒÄñ Ready for next input...
≡ƒñû Agent responded with audio transcript:  Agent Audio Response:        The Eiffel Tower's opening hours can vary depending on the season and any special events or maintenance. Generally, the Eiffel Tower is open every day of the year, with the following typical hours:

- Mid-June to early September: 9:00 AM to 12:45 AM (last elevator ride up at 12:00 AM)
- Rest of the year: 9:30 AM to 11:45 PM (last elevator ride up at 11:00 PM)

These times can sometimes change, so it's always best to check the official Eiffel Tower website or contact them directly for the most up-to-date information before your visit.

Would you like me to help you find the official website or any other details about visiting the Eiffel Tower?

≡ƒæï Voice assistant shut down. Goodbye!
```

The script creates a log file named `<timestamp>_voicelive.log` in the `logs` folder.

```python
logging.basicConfig(
    filename=f'logs/{timestamp}_voicelive.log',
    filemode="w",
    format='%(asctime)s:%(name)s:%(levelname)s:%(message)s',
    level=logging.INFO
)
```

The `voicelive.log` file contains information about the connection to the Voice Live API, including the request and response data.

```text
2025-10-28 10:26:12,768:__main__:INFO:Using Azure token credential
2025-10-28 10:26:12,769:__main__:INFO:Connecting to VoiceLive API with Foundry agent connection asst_JVSR1R9XpUBxZP1c4YUWy2GA for project myservice-voicelive-eus2
2025-10-28 10:26:12,770:azure.identity.aio._credentials.environment:INFO:No environment configuration found.
2025-10-28 10:26:12,779:azure.identity.aio._credentials.managed_identity:INFO:ManagedIdentityCredential will use IMDS
2025-10-28 10:26:12,780:azure.core.pipeline.policies.http_logging_policy:INFO:Request URL: 'http://169.254.169.254/metadata/identity/oauth2/token?api-version=REDACTED&resource=REDACTED'
Request method: 'GET'
Request headers:
    'User-Agent': 'azsdk-python-identity/1.25.1 Python/3.11.9 (Windows-10-10.0.26200-SP0)'
No body was attached to the request
2025-10-28 10:26:14,527:azure.identity.aio._credentials.chained:INFO:DefaultAzureCredential acquired a token from AzureCliCredential
2025-10-28 10:26:14,527:__main__:INFO:Obtained agent access token
2025-10-28 10:26:16,036:azure.identity.aio._internal.decorators:INFO:AzureCliCredential.get_token succeeded
2025-10-28 10:26:16,575:__main__:INFO:AudioProcessor initialized with 24kHz PCM16 mono audio
2025-10-28 10:26:16,575:__main__:INFO:Setting up voice conversation session...
2025-10-28 10:26:16,576:__main__:INFO:Session configuration sent
2025-10-28 10:26:16,833:__main__:INFO:Audio playback system ready
2025-10-28 10:26:16,833:__main__:INFO:Voice assistant ready! Start speaking...
2025-10-28 10:26:17,691:__main__:INFO:Session ready: sess_Oics8h0KxxxxPne71S1k
2025-10-28 10:26:17,713:__main__:INFO:Started audio capture
2025-10-28 10:26:18,413:__main__:INFO:User started speaking - stopping playback
2025-10-28 10:26:19,007:__main__:INFO:\U0001f3a4 User stopped speaking
2025-10-28 10:26:24,009:__main__:INFO:User started speaking - stopping playback
2025-10-28 10:26:24,771:__main__:INFO:\U0001f3a4 User stopped speaking
2025-10-28 10:26:24,887:__main__:INFO:\U0001f916 Assistant response created
2025-10-28 10:26:30,273:__main__:INFO:\U0001f916 Assistant finished speaking
2025-10-28 10:26:30,275:__main__:INFO:\u2705 Response complete
2025-10-28 10:26:38,461:__main__:INFO:User started speaking - stopping playback
2025-10-28 10:26:39,909:__main__:INFO:\U0001f3a4 User stopped speaking
2025-10-28 10:26:40,090:__main__:INFO:\U0001f916 Assistant response created
2025-10-28 10:26:44,631:__main__:INFO:\U0001f916 Assistant finished speaking
2025-10-28 10:26:44,634:__main__:INFO:\u2705 Response complete
2025-10-28 10:26:47,190:__main__:INFO:User started speaking - stopping playback
2025-10-28 10:26:48,959:__main__:INFO:\U0001f3a4 User stopped speaking
2025-10-28 10:26:49,246:__main__:INFO:\U0001f916 Assistant response created
2025-10-28 10:27:01,306:__main__:INFO:\U0001f916 Assistant finished speaking
2025-10-28 10:27:01,315:__main__:INFO:\u2705 Response complete
2025-10-28 10:27:09,586:__main__:INFO:Received shutdown signal
2025-10-28 10:27:09,634:__main__:INFO:Stopped audio capture
2025-10-28 10:27:09,758:__main__:INFO:Stopped audio playback
2025-10-28 10:27:09,759:__main__:INFO:Audio processor cleaned up
```

A session log file is also created in the `logs` folder with the name `<timestamp>_conversation.log`. This file contains detailed information about the session, including the request and response data.

```text
SessionID: sess_Oics8h0KxxxxPne71S1k
Model: gpt-4.1-mini
Voice: {'name': 'en-US-Ava:DragonHDLatestNeural', 'type': 'azure-standard'}
Instructions: You are a helpful agent named 'Tobi the agent'.

User Input:	Hello.
Agent Audio Response:	Hello! I'm Tobi the agent. How can I assist you today?
User Input:	What are the opening hours of the Eiffel Tower?
Agent Audio Response:	The Eiffel Tower's opening hours can vary depending on the season and any special events or maintenance. Generally, the Eiffel Tower is open every day of the year, with the following typical hours:

- Mid-June to early September: 9:00 AM to 12:45 AM (last elevator ride up at 12:00 AM)
- Rest of the year: 9:30 AM to 11:45 PM (last elevator ride up at 11:00 PM)

These times can sometimes change, so it's always best to check the official Eiffel Tower website or contact them directly for the most up-to-date information before your visit.

Would you like me to help you find the official website or any other details about visiting the Eiffel Tower?
```

The following table describes the key differences between the [technical log](#technical-log) and the [conversation log](#conversation-log):

| Aspect | Conversation Log | Technical Log |
| --- | --- | --- |
| **Audience** | Business users, content reviewers | Developers, IT operations |
| **Content** | What was said in conversations | How the system is working |
| **Level** | Application/conversation level | System/infrastructure level |
| **Troubleshooting** | "What did the agent say?" | "Why did the connection fail?" |

**Example**: If your agent wasn't responding, you'd check:
- **voicelive.log** ΓåÆ "WebSocket connection failed" or "Audio stream error"
- **conversation.log** ΓåÆ "Did the user actually say anything?"

Both logs are complementary: conversation logs for conversation analysis and testing, technical logs for system diagnostics.

### Technical log
**Purpose**: Technical debugging and system monitoring

**Contents**:
- WebSocket connection events
- Audio stream status
- Error messages and stack traces
- System-level events (session.created, response.done, etc.)
- Network connectivity issues
- Audio processing diagnostics

**Format**: Structured logging with timestamps, log levels, and technical details

**Use Cases**:
- Debugging connection problems
- Monitoring system performance
- Troubleshooting audio issues
- Developer/operations analysis

### Conversation log
**Purpose**: Conversation transcript and user experience tracking

**Contents**:
- Agent and project identification
- Session configuration details
- **User transcripts**: "Tell me a story", "Stop"
- **Agent responses**: Full story text and follow-up responses
- Conversation flow and interactions

**Format**: Plain text, human-readable conversation format

**Use Cases**:
- Analyzing conversation quality
- Reviewing what was actually said
- Understanding user interactions and agent responses
- Business/content analysis

## Hub-based projects

The quickstart uses Foundry projects instead of hub-based projects. If you have a hub-based project, you can still use the quickstart with some modifications.

To use the quickstart with a hub-based project, you need to retrieve the connection string for your agent and use it instead of the ```foundry_project_name```. You can find the connection string in the Azure portal under your Foundry project.

### Overview

For hub-based projects, use the connection string instead of the project name to connect your agent.

You must also obtain a separate authentication token from scope `https://ml.azure.com/.default`.

Make the following changes to the quickstart code:

1. Replace the all instances of `foundry_project_name` with `agent-connection-string` following lines in the code to change the authentication:

1. Replace the authentication token scope in line `307`:
    ```python
    # Get agent access token
    agent_access_token = (await DefaultAzureCredential().get_token("https://ml.azure.com/.default")).token
    logger.info("Obtained agent access token")
    ```

1. Replace the query parameter in line `316`:
    ```python
    # Connect to VoiceLive WebSocket API
    async with connect(
        endpoint=self.endpoint,
        credential=self.credential,
        query={
            "agent-id": self.agent_id,
            "agent-connection-string": self.agent-connection-string,
            "agent-access-token": agent_access_token
        },
    ) as connection:
        conn = connection
        self.connection = conn
    ```
    



**Applies to: programming-language-csharp**


Learn how to use Voice Live with [Microsoft Foundry Agent Service](https://learn.microsoft.com/azure/ai-foundry/agents/overview) using the VoiceLive SDK for C#.


[Reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/ai.voicelive-readme) | [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.VoiceLive) | [Additional samples on GitHub](https://aka.ms/voicelive/github-csharp)



Create and run applications to use Voice Live with agents for real-time voice conversations.

Agents provide several advantages:

- Use centralized configuration in the agent itself instead of session code.
- Handle complex logic and conversational behaviors for easier updates.
- Connect automatically by using your agent ID, with all settings managed internally.
- Support multiple conversational experiences without changing client code.

To use Voice Live without agents, see the [Voice Live API quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-quickstart).


## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A [Microsoft Foundry resource](../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](voice-live.md).
- A Foundry agent created in the [Foundry portal](https://ai.azure.com/?cid=learnDocs). For more information about creating an agent, see the [Create an agent quickstart](https://learn.microsoft.com/azure/ai-foundry/agents/quickstart).
- [.NET SDK](https://dotnet.microsoft.com/download) version 6.0 or later installed.

<!--
## Microsoft Entra ID prerequisites

For the recommended keyless authentication with Microsoft Entra ID, you need to:
- Install the [Azure CLI](/cli/azure/install-azure-cli) used for keyless authentication with Microsoft Entra ID.
- Assign the `Cognitive Services User` role to your user account. You can assign roles in the Azure portal under **Access control (IAM)** > **Add role assignment**.
-->


## Start a voice conversation

Follow these steps to create a console application and install the Voice Live SDK.

1. Open a command prompt window in the folder where you want the new project. Run this command to create a console application with the .NET CLI.

    ```dotnetcli
    dotnet new console
    ```

   This command creates the *Program.cs* file in your project directory.

1. Install the required packages in your new project with the .NET CLI.

    ```dotnetcli
    dotnet add package Azure.AI.VoiceLive
    dotnet add package Azure.Identity
    dotnet add package NAudio
    dotnet add package System.CommandLine --version 2.0.0-beta4.22272.1
    dotnet add package Microsoft.Extensions.Configuration.Json
    dotnet add package Microsoft.Extensions.Configuration.EnvironmentVariables
    dotnet add package Microsoft.Extensions.Logging.Console
    ```

1. Create a new file named `appsettings.json` in the folder where you want to run the code. In that file, add the following JSON content:
    
    ```json
    {
      "VoiceLive": {
        "Endpoint": "https://your-resource-name.services.ai.azure.com/",
        "Voice": "en-US-Ava:DragonHDLatestNeural"
      },
      "Agent": {
        "Id": "your-agent-id",
        "ProjectName": "your-agent-project-name"
      },  
      "Logging": {
        "LogLevel": {
          "Default": "Information",
          "Azure.AI.VoiceLive": "Debug"
        }
      }
    }
    ```
    
    The sample code in this quickstart uses Microsoft Entra ID for authentication, as the current integration only supports this authentication method.
  
    For more information, see [Keyless authentication](https://learn.microsoft.com/azure/ai-services/authentication) and [setting environment variables](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables).

1. In the file `csharp.csproj` add the following information to connect the appsettings.json:
   ```text
   <ItemGroup>
   <None Update="appsettings.json">
       <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
   </None>
   </ItemGroup>
   ``` 

1. Replace the contents of `Program.cs` with the following code. This code creates a basic voice agent using one of the built-in models.

    ```csharp
    // Copyright (c) Microsoft Corporation. All rights reserved.
    // Licensed under the MIT License.
    
    using System;
    using System.CommandLine;
    using System.CommandLine.Invocation;
    using System.Threading;
    using System.Web;
    using System.Threading.Tasks;
    using System.Threading.Channels;
    using System.Collections.Generic;
    using Azure.AI.VoiceLive;
    using Azure.Core;
    using Azure.Core.Pipeline;
    using Azure.Identity;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;
    using NAudio.Wave;
    
    namespace Azure.AI.VoiceLive.Samples
    {
        /// <summary>
        /// FILE: Program.cs (Agent Quickstart - Consolidated)
        /// </summary>
        /// <remarks>
        /// DESCRIPTION:
        ///     This consolidated sample demonstrates connecting to a Foundry agent via the VoiceLive SDK,
        ///     creating a voice assistant that can engage in natural conversation with proper interruption
        ///     handling. Instead of using a direct model, this connects to a deployed agent in Foundry.
        ///     
        ///     All necessary code has been consolidated into this single file for easy distribution and execution.
        ///
        /// USAGE:
        ///     dotnet run --agent-id <agent-id> --agent-project-name <project-name>
        ///
        ///     Set the environment variables with your own values before running the sample:
        ///     1) AZURE_AGENT_ID - The Foundry agent ID
        ///     2) AZURE_AGENT_PROJECT_NAME - The Foundry agent project name  
        ///     3) AZURE_VOICELIVE_API_KEY - The Azure VoiceLive API key (still needed for VoiceLive service)
        ///     4) AZURE_VOICELIVE_ENDPOINT - The Azure VoiceLive endpoint
        ///
        ///     Note: Agent access token is generated automatically using DefaultAzureCredential.
        ///     Ensure you are authenticated with Azure CLI or have appropriate credentials configured.
        ///
        ///     Or update appsettings.json with your values.
        ///
        /// REQUIREMENTS:
        ///     - Azure.AI.VoiceLive
        ///     - Azure.Identity
        ///     - NAudio (for audio capture and playback)
        ///     - Microsoft.Extensions.Configuration
        ///     - System.CommandLine
        ///     - System.Threading.Channels
        /// </remarks>
        public class Program
        {
            /// <summary>
            /// Main entry point for the Voice Assistant sample.
            /// </summary>
            /// <param name="args"></param>
            /// <returns></returns>
            public static async Task<int> Main(string[] args)
            {
                // Create command line interface
                var rootCommand = CreateRootCommand();
                return await rootCommand.InvokeAsync(args).ConfigureAwait(false);
            }
    
            private static RootCommand CreateRootCommand()
            {
                var rootCommand = new RootCommand("Voice Assistant connecting to Foundry Agent via VoiceLive SDK");
    
                var apiKeyOption = new Option<string?>(
                    "--api-key",
                    "Azure VoiceLive API key. If not provided, will use AZURE_VOICELIVE_API_KEY environment variable.");
    
                var endpointOption = new Option<string>(
                    "--endpoint",
                    () => "wss://api.voicelive.com/v1",
                    "Azure VoiceLive endpoint");
    
                var agentIdOption = new Option<string>(
                    "--agent-id",
                    "Foundry agent ID");
    
                var agentProjectNameOption = new Option<string>(
                    "--agent-project-name", 
                    "Foundry agent project name");
    
                var voiceOption = new Option<string>(
                    "--voice",
                    () => "en-US-AvaNeural",
                    "Voice to use for the assistant");
    
                // Currently Foundry Agent Integration only supports token authentication
                var useTokenCredentialOption = new Option<bool>(
                    "--use-token-credential",
                    () => true,
                    "Use Azure token credential instead of API key");
    
                var verboseOption = new Option<bool>(
                    "--verbose",
                    "Enable verbose logging");
    
                rootCommand.AddOption(apiKeyOption);
                rootCommand.AddOption(endpointOption);
                rootCommand.AddOption(agentIdOption);
                rootCommand.AddOption(agentProjectNameOption);
                rootCommand.AddOption(voiceOption);
                rootCommand.AddOption(useTokenCredentialOption);
                rootCommand.AddOption(verboseOption);
    
                rootCommand.SetHandler(async (
                    string? apiKey,
                    string endpoint,
                    string? agentId,
                    string? agentProjectName,
                    string voice,
                    bool useTokenCredential,
                    bool verbose) =>
                {
                    await RunVoiceAssistantAsync(apiKey, endpoint, agentId, agentProjectName, voice, useTokenCredential, verbose).ConfigureAwait(false);
                },
                apiKeyOption,
                endpointOption,
                agentIdOption,
                agentProjectNameOption,
                voiceOption,
                useTokenCredentialOption,
                verboseOption);
    
                return rootCommand;
            }
    
            private static async Task RunVoiceAssistantAsync(
                string? apiKey,
                string endpoint,
                string? agentId,
                string? agentProjectName,
                string voice,
                bool useTokenCredential,
                bool verbose)
            {
                // Setup configuration
                var configuration = new ConfigurationBuilder()
                    .AddJsonFile("appsettings.json", optional: true)
                    .AddEnvironmentVariables()
                    .Build();
    
                // Override with command line values if provided
                apiKey ??= configuration["VoiceLive:ApiKey"] ?? Environment.GetEnvironmentVariable("AZURE_VOICELIVE_API_KEY");
                endpoint = configuration["VoiceLive:Endpoint"] ?? endpoint;
                agentId ??= configuration["Agent:Id"] ?? Environment.GetEnvironmentVariable("AZURE_AGENT_ID");
                agentProjectName ??= configuration["Agent:ProjectName"] ?? Environment.GetEnvironmentVariable("AZURE_AGENT_PROJECT_NAME");
                voice = configuration["VoiceLive:Voice"] ?? voice;
    
                // Setup logging
                using var loggerFactory = LoggerFactory.Create(builder =>
                {
                    builder.AddConsole();
                    if (verbose)
                    {
                        builder.SetMinimumLevel(LogLevel.Debug);
                    }
                    else
                    {
                        builder.SetMinimumLevel(LogLevel.Information);
                    }
                });
    
                var logger = loggerFactory.CreateLogger<Program>();
    
                // Validate agent credentials
                if (string.IsNullOrEmpty(agentId) || string.IsNullOrEmpty(agentProjectName))
                {
                    Console.WriteLine("Γ¥î Error: Agent parameters missing");
                    Console.WriteLine("Please provide agent parameters:");
                    Console.WriteLine("  --agent-id (or AZURE_AGENT_ID environment variable)");
                    Console.WriteLine("  --agent-project-name (or AZURE_AGENT_PROJECT_NAME environment variable)");
                    Console.WriteLine("Note: Agent access token will be generated automatically using Azure credentials");
                    return;
                }
    
                // Validate VoiceLive credentials (still needed for the VoiceLive service)
                if (string.IsNullOrEmpty(apiKey) && !useTokenCredential)
                {
                    Console.WriteLine("Γ¥î Error: No VoiceLive authentication provided");
                    Console.WriteLine("Please provide an API key using --api-key or set AZURE_VOICELIVE_API_KEY environment variable,");
                    Console.WriteLine("or use --use-token-credential for Azure authentication.");
                    return;
                }
    
                // Generate agent access token using Azure credentials
                string agentAccessToken;
                try
                {
                    logger.LogInformation("Generating agent access token using DefaultAzureCredential...");
                    var credential = new DefaultAzureCredential();
                    var tokenRequestContext = new TokenRequestContext(new[] { "https://ai.azure.com/.default" });
                    var accessToken = await credential.GetTokenAsync(tokenRequestContext, default).ConfigureAwait(false);
                    agentAccessToken = accessToken.Token;
                    logger.LogInformation("Obtained agent access token successfully");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Γ¥î Error generating agent access token: {ex.Message}");
                    Console.WriteLine("Please ensure you are authenticated with Azure CLI or have appropriate Azure credentials configured.");
                    return;
                }
    
                // Check audio system before starting
                if (!CheckAudioSystem(logger))
                {
                    return;
                }
    
                try
                {
                    // Append agent parameters to the endpoint URL
                    var uriBuilder = new UriBuilder(endpoint);
                    var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                    query["agent-id"] = agentId!;
                    query["agent-project-name"] = agentProjectName!;
                    query["agent-access-token"] = agentAccessToken;
                    uriBuilder.Query = query.ToString();
                    endpoint = uriBuilder.ToString();
                    logger.LogInformation("Agent parameters added as query parameters: agent-id={AgentId}, agent-project-name={ProjectName}", agentId, agentProjectName);
    
                    VoiceLiveClient client;
                    var endpointUri = new Uri(endpoint);
                    if (useTokenCredential)
                    {
                        var tokenCredential = new DefaultAzureCredential();
                        client = new VoiceLiveClient(endpointUri, tokenCredential, new VoiceLiveClientOptions());
                        logger.LogInformation("Using Azure token credential with agent headers");
                    }
                    else
                    {
                        var keyCredential = new Azure.AzureKeyCredential(apiKey!);
                        client = new VoiceLiveClient(endpointUri, keyCredential, new VoiceLiveClientOptions());
                        logger.LogInformation("Using API key credential with agent headers");
                    }
    
                    // Create and start voice assistant
                    using var assistant = new BasicVoiceAssistant(
                        client,
                        agentId!,
                        agentProjectName!,
                        agentAccessToken,
                        voice,
                        loggerFactory);
    
                    // Setup cancellation token for graceful shutdown
                    using var cancellationTokenSource = new CancellationTokenSource();
                    Console.CancelKeyPress += (sender, e) =>
                    {
                        e.Cancel = true;
                        logger.LogInformation("Received shutdown signal");
                        cancellationTokenSource.Cancel();
                    };
    
                    // Start the assistant
                    await assistant.StartAsync(cancellationTokenSource.Token).ConfigureAwait(false);
                }
                catch (OperationCanceledException)
                {
                    Console.WriteLine("\n≡ƒæï Voice assistant shut down. Goodbye!");
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Fatal error");
                    Console.WriteLine($"Γ¥î Error: {ex.Message}");
                }
            }
    
            private static bool CheckAudioSystem(ILogger logger)
            {
                try
                {
                    // Try input (default device)
                    using (var waveIn = new WaveInEvent
                    {
                        WaveFormat = new WaveFormat(24000, 16, 1),
                        BufferMilliseconds = 50
                    })
                    {
                        // Start/Stop to force initialization and surface any device errors
                        waveIn.DataAvailable += (_, __) => { };
                        waveIn.StartRecording();
                        waveIn.StopRecording();
                    }
    
                    // Try output (default device)
                    var buffer = new BufferedWaveProvider(new WaveFormat(24000, 16, 1))
                    {
                        BufferDuration = TimeSpan.FromMilliseconds(200)
                    };
    
                    using (var waveOut = new WaveOutEvent { DesiredLatency = 100 })
                    {
                        waveOut.Init(buffer);
                        // Playing isn't strictly required to validate a device, but it's safe
                        waveOut.Play();
                        waveOut.Stop();
                    }
    
                    logger.LogInformation("Audio system check passed (default input/output initialized).");
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Γ¥î Audio system check failed: {ex.Message}");
                    return false;
                }
            }
        }
    
        /// <summary>
        /// Basic voice assistant implementing the VoiceLive SDK patterns.
        ///</summary>
        /// <remarks>
        /// This sample now demonstrates some of the new convenience methods added to the VoiceLive SDK:
        /// - ConfigureSessionAsync() - Configures session options (existing method)
        ///
        /// Additional convenience methods available but not shown in this sample:
        /// - StartAudioTurnAsync() / EndAudioTurnAsync() / CancelAudioTurnAsync() - Audio turn management
        /// - AppendAudioToTurnAsync() - Append audio data to an ongoing turn
        /// - ConnectAvatarAsync() - Connect avatar with SDP for media negotiation
        ///
        /// These methods provide a more developer-friendly API similar to the OpenAI SDK,
        /// eliminating the need to manually construct and populate ClientEvent classes.
        /// </remarks>
        public class BasicVoiceAssistant : IDisposable
        {
            private readonly VoiceLiveClient _client;
            private readonly string _agentId;
            private readonly string _agentProjectName;
            private readonly string _agentAccessToken;
            private readonly string _voice;
            private readonly ILogger<BasicVoiceAssistant> _logger;
            private readonly ILoggerFactory _loggerFactory;
    
            private VoiceLiveSession? _session;
            private AudioProcessor? _audioProcessor;
            private bool _disposed;
            // Tracks whether we've already sent the initial proactive greeting to start the conversation
            private bool _conversationStarted;
    
            /// <summary>
            /// Initializes a new instance of the BasicVoiceAssistant class.
            /// </summary>
            /// <param name="client">The VoiceLive client.</param>
            /// <param name="agentId">The Foundry agent ID.</param>
            /// <param name="agentProjectName">The Foundry agent project name.</param>
            /// <param name="agentAccessToken">The Foundry agent access token.</param>
            /// <param name="voice">The voice to use.</param>
            /// <param name="loggerFactory">Logger factory for creating loggers.</param>
            public BasicVoiceAssistant(
                VoiceLiveClient client,
                string agentId,
                string agentProjectName,
                string agentAccessToken,
                string voice,
                ILoggerFactory loggerFactory)
            {
                _client = client ?? throw new ArgumentNullException(nameof(client));
                _agentId = agentId ?? throw new ArgumentNullException(nameof(agentId));
                _agentProjectName = agentProjectName ?? throw new ArgumentNullException(nameof(agentProjectName));
                _agentAccessToken = agentAccessToken ?? throw new ArgumentNullException(nameof(agentAccessToken));
                _voice = voice ?? throw new ArgumentNullException(nameof(voice));
                _loggerFactory = loggerFactory ?? throw new ArgumentNullException(nameof(loggerFactory));
                _logger = loggerFactory.CreateLogger<BasicVoiceAssistant>();
            }
    
            /// <summary>
            /// Start the voice assistant session.
            /// </summary>
            /// <param name="cancellationToken">Cancellation token for stopping the session.</param>
            public async Task StartAsync(CancellationToken cancellationToken = default)
            {
                try
                {
                    _logger.LogInformation("Connecting to VoiceLive API with agent {AgentId} from project {ProjectName}", _agentId, _agentProjectName);
    
                    // Create session options for agent connection (no model or instructions specified)
                    var sessionOptions = await CreateSessionOptionsAsync(cancellationToken).ConfigureAwait(false);
    
                    // Start VoiceLive session with agent parameters passed via headers in client
                    _session = await _client.StartSessionAsync(sessionOptions, cancellationToken).ConfigureAwait(false);
    
                    // Initialize audio processor
                    _audioProcessor = new AudioProcessor(_session, _loggerFactory.CreateLogger<AudioProcessor>());
    
                    // Start audio systems
                    await _audioProcessor.StartPlaybackAsync().ConfigureAwait(false);
                    await _audioProcessor.StartCaptureAsync().ConfigureAwait(false);
    
                    _logger.LogInformation("Voice assistant ready! Start speaking...");
                    Console.WriteLine();
                    Console.WriteLine("=" + new string('=', 59));
                    Console.WriteLine("≡ƒÄñ VOICE ASSISTANT READY");
                    Console.WriteLine("Start speaking to begin conversation");
                    Console.WriteLine("Press Ctrl+C to exit");
                    Console.WriteLine("=" + new string('=', 59));
                    Console.WriteLine();
    
                    // Process events
                    await ProcessEventsAsync(cancellationToken).ConfigureAwait(false);
                }
                catch (OperationCanceledException)
                {
                    _logger.LogInformation("Received cancellation signal, shutting down...");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Connection error");
                    throw;
                }
                finally
                {
                    // Cleanup
                    if (_audioProcessor != null)
                    {
                        await _audioProcessor.CleanupAsync().ConfigureAwait(false);
                    }
                }
            }
    
            /// <summary>
            /// Create session options for agent-based voice conversation.
            /// </summary>
            private Task<VoiceLiveSessionOptions> CreateSessionOptionsAsync(CancellationToken cancellationToken)
            {
                _logger.LogInformation("Creating voice conversation session options for agent...");
    
                // Azure voice
                var azureVoice = new AzureStandardVoice(_voice);
    
                // Create strongly typed turn detection configuration
                var turnDetectionConfig = new ServerVadTurnDetection
                {
                    Threshold = 0.5f,
                    PrefixPadding = TimeSpan.FromMilliseconds(400),
                    SilenceDuration = TimeSpan.FromMilliseconds(500)
                };
    
                // Create conversation session options for agent - no Model or Instructions specified
                // Agent parameters are passed via URI query parameters during WebSocket connection:
                // - agent-id: Agent identifier
                // - agent-project-name: Project containing the agent  
                // - agent-access-token: Generated access token for agent authentication
                var sessionOptions = new VoiceLiveSessionOptions
                {
                    InputAudioEchoCancellation = new AudioEchoCancellation(),
                    Voice = azureVoice,
                    InputAudioFormat = InputAudioFormat.Pcm16,
                    OutputAudioFormat = OutputAudioFormat.Pcm16,
                    TurnDetection = turnDetectionConfig
                };
    
                // Ensure modalities include audio
                sessionOptions.Modalities.Clear();
                sessionOptions.Modalities.Add(InteractionModality.Text);
                sessionOptions.Modalities.Add(InteractionModality.Audio);
    
                _logger.LogInformation("Session options created for agent connection");
                return Task.FromResult(sessionOptions);
            }
    
            /// <summary>
            /// Process events from the VoiceLive session.
            /// </summary>
            private async Task ProcessEventsAsync(CancellationToken cancellationToken)
            {
                try
                {
                    await foreach (SessionUpdate serverEvent in _session!.GetUpdatesAsync(cancellationToken).ConfigureAwait(false))
                    {
                        await HandleSessionUpdateAsync(serverEvent, cancellationToken).ConfigureAwait(false);
                    }
                }
                catch (OperationCanceledException)
                {
                    _logger.LogInformation("Event processing cancelled");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error processing events");
                    throw;
                }
            }
    
            /// <summary>
            /// Handle different types of server events from VoiceLive.
            /// </summary>
            private async Task HandleSessionUpdateAsync(SessionUpdate serverEvent, CancellationToken cancellationToken)
            {
                _logger.LogDebug("Received event: {EventType}", serverEvent.GetType().Name);
    
                switch (serverEvent)
                {
                    case SessionUpdateSessionCreated sessionCreated:
                        await HandleSessionCreatedAsync(sessionCreated, cancellationToken).ConfigureAwait(false);
                        break;
    
                    case SessionUpdateSessionUpdated sessionUpdated:
                        _logger.LogInformation("Session updated successfully");
    
                        // Start audio capture once session is ready
                        if (_audioProcessor != null)
                        {
                            // Proactive greeting
                            if (!_conversationStarted)
                            {
                                _conversationStarted = true;
                                _logger.LogInformation("Sending proactive greeting request");
                                try
                                {
                                    await _session!.StartResponseAsync().ConfigureAwait(false);
                                }
                                catch (Exception ex)
                                {
                                    _logger.LogError(ex, "Failed to send proactive greeting request");
                                }
                            }
                            await _audioProcessor!.StartCaptureAsync().ConfigureAwait(false);
                        }
                        break;
    
                    case SessionUpdateInputAudioBufferSpeechStarted speechStarted:
                        _logger.LogInformation("≡ƒÄñ User started speaking - stopping playback");
                        Console.WriteLine("≡ƒÄñ Listening...");
    
                        // Stop current assistant audio playback (interruption handling)
                        if (_audioProcessor != null)
                        {
                            await _audioProcessor.StopPlaybackAsync().ConfigureAwait(false);
                        }
                        break;
    
                    case SessionUpdateInputAudioBufferSpeechStopped speechStopped:
                        _logger.LogInformation("≡ƒÄñ User stopped speaking");
                        Console.WriteLine("≡ƒñö Processing...");
    
                        // Restart playback system for response
                        if (_audioProcessor != null)
                        {
                            await _audioProcessor.StartPlaybackAsync().ConfigureAwait(false);
                        }
                        break;
    
                    case SessionUpdateResponseCreated responseCreated:
                        _logger.LogInformation("≡ƒñû Assistant response created");
                        break;
    
                    case SessionUpdateResponseAudioDelta audioDelta:
                        // Stream audio response to speakers
                        _logger.LogDebug("Received audio delta");
    
                        if (audioDelta.Delta != null && _audioProcessor != null)
                        {
                            byte[] audioData = audioDelta.Delta.ToArray();
                            await _audioProcessor.QueueAudioAsync(audioData).ConfigureAwait(false);
                        }
                        break;
    
                    case SessionUpdateResponseAudioDone audioDone:
                        _logger.LogInformation("≡ƒñû Assistant finished speaking");
                        Console.WriteLine("≡ƒÄñ Ready for next input...");
                        break;
    
                    case SessionUpdateResponseDone responseDone:
                        _logger.LogInformation("Γ£à Response complete");
                        break;
    
                    case SessionUpdateError errorEvent:
                        _logger.LogError("Γ¥î VoiceLive error: {ErrorMessage}", errorEvent.Error?.Message);
                        Console.WriteLine($"Error: {errorEvent.Error?.Message}");
                        break;
    
                    default:
                        _logger.LogDebug("Unhandled event type: {EventType}", serverEvent.GetType().Name);
                        break;
                }
            }
    
            /// <summary>
            /// Handle session created event.
            /// </summary>
            private async Task HandleSessionCreatedAsync(SessionUpdateSessionCreated sessionCreated, CancellationToken cancellationToken)
            {
                _logger.LogInformation("Session ready: {SessionId}", sessionCreated.Session?.Id);
    
                // Start audio capture once session is ready
                if (_audioProcessor != null)
                {
                    await _audioProcessor.StartCaptureAsync().ConfigureAwait(false);
                }
            }
    
            /// <summary>
            /// Dispose of resources.
            /// </summary>
            public void Dispose()
            {
                if (_disposed)
                    return;
    
                _audioProcessor?.Dispose();
                _session?.Dispose();
                _disposed = true;
            }
        }
    
        /// <summary>
        /// Handles real-time audio capture and playback for the voice assistant.
        ///
        /// This processor demonstrates some of the new VoiceLive SDK convenience methods:
        /// - Uses existing SendInputAudioAsync() method for audio streaming
        /// - Shows how convenience methods simplify audio operations
        ///
        /// Additional convenience methods available in the SDK:
        /// - StartAudioTurnAsync() / AppendAudioToTurnAsync() / EndAudioTurnAsync() - Audio turn management
        /// - ClearStreamingAudioAsync() - Clear all streaming audio
        /// - ConnectAvatarAsync() - Avatar connection with SDP
        ///
        /// Threading Architecture:
        /// - Main thread: Event loop and UI
        /// - Capture thread: NAudio input stream reading
        /// - Send thread: Async audio data transmission to VoiceLive
        /// - Playback thread: NAudio output stream writing
        /// </summary>
        public class AudioProcessor : IDisposable
        {
            private readonly VoiceLiveSession _session;
            private readonly ILogger<AudioProcessor> _logger;
    
            // Audio configuration - PCM16, 24kHz, mono as specified
            private const int SampleRate = 24000;
            private const int Channels = 1;
            private const int BitsPerSample = 16;
    
            // NAudio components
            private WaveInEvent? _waveIn;
            private WaveOutEvent? _waveOut;
            private BufferedWaveProvider? _playbackBuffer;
    
            // Audio capture and playback state
            private bool _isCapturing;
            private bool _isPlaying;
    
            // Audio streaming channels
            private readonly Channel<byte[]> _audioSendChannel;
            private readonly Channel<byte[]> _audioPlaybackChannel;
            private readonly ChannelWriter<byte[]> _audioSendWriter;
            private readonly ChannelReader<byte[]> _audioSendReader;
            private readonly ChannelWriter<byte[]> _audioPlaybackWriter;
            private readonly ChannelReader<byte[]> _audioPlaybackReader;
    
            // Background tasks
            private Task? _audioSendTask;
            private Task? _audioPlaybackTask;
            private readonly CancellationTokenSource _cancellationTokenSource;
            private CancellationTokenSource _playbackCancellationTokenSource;
    
            /// <summary>
            /// Initializes a new instance of the AudioProcessor class.
            /// </summary>
            /// <param name="session">The VoiceLive session for audio communication.</param>
            /// <param name="logger">Logger for diagnostic information.</param>
            public AudioProcessor(VoiceLiveSession session, ILogger<AudioProcessor> logger)
            {
                _session = session ?? throw new ArgumentNullException(nameof(session));
                _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    
                // Create unbounded channels for audio data
                _audioSendChannel = Channel.CreateUnbounded<byte[]>();
                _audioSendWriter = _audioSendChannel.Writer;
                _audioSendReader = _audioSendChannel.Reader;
    
                _audioPlaybackChannel = Channel.CreateUnbounded<byte[]>();
                _audioPlaybackWriter = _audioPlaybackChannel.Writer;
                _audioPlaybackReader = _audioPlaybackChannel.Reader;
    
                _cancellationTokenSource = new CancellationTokenSource();
                _playbackCancellationTokenSource = new CancellationTokenSource();
    
                _logger.LogInformation("AudioProcessor initialized with {SampleRate}Hz PCM16 mono audio", SampleRate);
            }
    
            /// <summary>
            /// Start capturing audio from microphone.
            /// </summary>
            public Task StartCaptureAsync()
            {
                if (_isCapturing)
                    return Task.CompletedTask;
    
                _isCapturing = true;
    
                try
                {
                    _waveIn = new WaveInEvent
                    {
                        WaveFormat = new WaveFormat(SampleRate, BitsPerSample, Channels),
                        BufferMilliseconds = 50 // 50ms buffer for low latency
                    };
    
                    _waveIn.DataAvailable += OnAudioDataAvailable;
                    _waveIn.RecordingStopped += OnRecordingStopped;
    
                    _waveIn.DeviceNumber = 0;
    
                    _waveIn.StartRecording();
    
                    // Start audio send task
                    _audioSendTask = ProcessAudioSendAsync(_cancellationTokenSource.Token);
    
                    _logger.LogInformation("Started audio capture");
                    return Task.CompletedTask;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to start audio capture");
                    _isCapturing = false;
                    throw;
                }
            }
    
            /// <summary>
            /// Stop capturing audio.
            /// </summary>
            public async Task StopCaptureAsync()
            {
                if (!_isCapturing)
                    return;
    
                _isCapturing = false;
    
                if (_waveIn != null)
                {
                    _waveIn.StopRecording();
                    _waveIn.DataAvailable -= OnAudioDataAvailable;
                    _waveIn.RecordingStopped -= OnRecordingStopped;
                    _waveIn.Dispose();
                    _waveIn = null;
                }
    
                // Complete the send channel and wait for the send task
                _audioSendWriter.TryComplete();
                if (_audioSendTask != null)
                {
                    await _audioSendTask.ConfigureAwait(false);
                    _audioSendTask = null;
                }
    
                _logger.LogInformation("Stopped audio capture");
            }
    
            /// <summary>
            /// Initialize audio playback system.
            /// </summary>
            public Task StartPlaybackAsync()
            {
                if (_isPlaying)
                    return Task.CompletedTask;
    
                _isPlaying = true;
    
                try
                {
                    _waveOut = new WaveOutEvent
                    {
                        DesiredLatency = 100 // 100ms latency
                    };
    
                    _playbackBuffer = new BufferedWaveProvider(new WaveFormat(SampleRate, BitsPerSample, Channels))
                    {
                        BufferDuration = TimeSpan.FromSeconds(10), // 10 second buffer
                        DiscardOnBufferOverflow = true
                    };
    
                    _waveOut.Init(_playbackBuffer);
                    _waveOut.Play();
    
                    _playbackCancellationTokenSource = new CancellationTokenSource();
    
                    // Start audio playback task
                    _audioPlaybackTask = ProcessAudioPlaybackAsync();
    
                    _logger.LogInformation("Audio playback system ready");
                    return Task.CompletedTask;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to initialize audio playback");
                    _isPlaying = false;
                    throw;
                }
            }
    
            /// <summary>
            /// Stop audio playback and clear buffer.
            /// </summary>
            public async Task StopPlaybackAsync()
            {
                if (!_isPlaying)
                    return;
    
                _isPlaying = false;
    
                // Clear the playback channel
                while (_audioPlaybackReader.TryRead(out _))
                { }
    
                if (_playbackBuffer != null)
                {
                    _playbackBuffer.ClearBuffer();
                }
    
                if (_waveOut != null)
                {
                    _waveOut.Stop();
                    _waveOut.Dispose();
                    _waveOut = null;
                }
    
                _playbackBuffer = null;
    
                // Complete the playback channel and wait for the playback task
                _playbackCancellationTokenSource.Cancel();
    
                if (_audioPlaybackTask != null)
                {
                    await _audioPlaybackTask.ConfigureAwait(false);
                    _audioPlaybackTask = null;
                }
    
                _logger.LogInformation("Stopped audio playback");
            }
    
            /// <summary>
            /// Queue audio data for playback.
            /// </summary>
            /// <param name="audioData">The audio data to queue.</param>
            public async Task QueueAudioAsync(byte[] audioData)
            {
                if (_isPlaying && audioData.Length > 0)
                {
                    await _audioPlaybackWriter.WriteAsync(audioData).ConfigureAwait(false);
                }
            }
    
            /// <summary>
            /// Event handler for audio data available from microphone.
            /// </summary>
            private void OnAudioDataAvailable(object? sender, WaveInEventArgs e)
            {
                if (_isCapturing && e.BytesRecorded > 0)
                {
                    byte[] audioData = new byte[e.BytesRecorded];
                    Array.Copy(e.Buffer, 0, audioData, 0, e.BytesRecorded);
    
                    // Queue audio data for sending (non-blocking)
                    if (!_audioSendWriter.TryWrite(audioData))
                    {
                        _logger.LogWarning("Failed to queue audio data for sending - channel may be full");
                    }
                }
            }
    
            /// <summary>
            /// Event handler for recording stopped.
            /// </summary>
            private void OnRecordingStopped(object? sender, StoppedEventArgs e)
            {
                if (e.Exception != null)
                {
                    _logger.LogError(e.Exception, "Audio recording stopped due to error");
                }
            }
    
            /// <summary>
            /// Background task to process audio data and send to VoiceLive service.
            /// </summary>
            private async Task ProcessAudioSendAsync(CancellationToken cancellationToken)
            {
                try
                {
                    await foreach (byte[] audioData in _audioSendReader.ReadAllAsync(cancellationToken).ConfigureAwait(false))
                    {
                        if (cancellationToken.IsCancellationRequested)
                            break;
    
                        try
                        {
                            // Send audio data directly to the session using the convenience method
                            // This demonstrates the existing SendInputAudioAsync convenience method
                            // Other available methods: StartAudioTurnAsync, AppendAudioToTurnAsync, EndAudioTurnAsync
                            await _session.SendInputAudioAsync(audioData, cancellationToken).ConfigureAwait(false);
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Error sending audio data to VoiceLive");
                            // Continue processing other audio data
                        }
                    }
                }
                catch (OperationCanceledException)
                {
                    // Expected when cancellation is requested
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in audio send processing");
                }
            }
    
            /// <summary>
            /// Background task to process audio playback.
            /// </summary>
            private async Task ProcessAudioPlaybackAsync()
            {
                try
                {
                    CancellationTokenSource combinedTokenSource = CancellationTokenSource.CreateLinkedTokenSource(_playbackCancellationTokenSource.Token, _cancellationTokenSource.Token);
                    var cancellationToken = combinedTokenSource.Token;
    
                    await foreach (byte[] audioData in _audioPlaybackReader.ReadAllAsync(cancellationToken).ConfigureAwait(false))
                    {
                        if (cancellationToken.IsCancellationRequested)
                            break;
    
                        try
                        {
                            if (_playbackBuffer != null && _isPlaying)
                            {
                                _playbackBuffer.AddSamples(audioData, 0, audioData.Length);
                            }
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Error in audio playback");
                            // Continue processing other audio data
                        }
                    }
                }
                catch (OperationCanceledException)
                {
                    // Expected when cancellation is requested
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in audio playback processing");
                }
            }
    
            /// <summary>
            /// Clean up audio resources.
            /// </summary>
            public async Task CleanupAsync()
            {
                await StopCaptureAsync().ConfigureAwait(false);
                await StopPlaybackAsync().ConfigureAwait(false);
    
                _cancellationTokenSource.Cancel();
    
                // Wait for background tasks to complete
                var tasks = new List<Task>();
                if (_audioSendTask != null)
                    tasks.Add(_audioSendTask);
                if (_audioPlaybackTask != null)
                    tasks.Add(_audioPlaybackTask);
    
                if (tasks.Count > 0)
                {
                    await Task.WhenAll(tasks).ConfigureAwait(false);
                }
    
                _logger.LogInformation("Audio processor cleaned up");
            }
    
            /// <summary>
            /// Dispose of resources.
            /// </summary>
            public void Dispose()
            {
                CleanupAsync().Wait();
                _cancellationTokenSource.Dispose();
            }
        }
    }
    ```

1. Run your console application to start the live conversation:

   ```dotnetcli
   dotnet run
   ```

## Output

The application prints output to the console showing connection status, audio stream events, and playback activity. Audio plays back through your speakers or headphones.

```console
info: Azure.AI.VoiceLive.Samples.Program[0]
      Generating agent access token using DefaultAzureCredential...
info: Azure.AI.VoiceLive.Samples.Program[0]
      Obtained agent access token successfully
info: Azure.AI.VoiceLive.Samples.Program[0]
      Audio system check passed (default input/output initialized).
info: Azure.AI.VoiceLive.Samples.Program[0]
      Agent parameters added as query parameters: agent-id=asst_my-agent, agent-project-name=my-ai-project
info: Azure.AI.VoiceLive.Samples.Program[0]
      Using Azure token credential with agent headers
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      Connecting to VoiceLive API with agent asst_my-agent from project my-ai-project
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      Creating voice conversation session options for agent...
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      Session options created for agent connection
info: Azure.AI.VoiceLive.Samples.AudioProcessor[0]
      AudioProcessor initialized with 24000Hz PCM16 mono audio
info: Azure.AI.VoiceLive.Samples.AudioProcessor[0]
      Audio playback system ready
info: Azure.AI.VoiceLive.Samples.AudioProcessor[0]
      Started audio capture
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      Voice assistant ready! Start speaking...

============================================================
≡ƒÄñ VOICE ASSISTANT READY
Start speaking to begin conversation
Press Ctrl+C to exit
============================================================

info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      Session ready: sess_QNwzS5xxxxQjftd
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      Session updated successfully
≡ƒÄñ Listening...
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      ≡ƒÄñ User started speaking - stopping playback
info: Azure.AI.VoiceLive.Samples.AudioProcessor[0]
      Stopped audio playback
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      Γ£¿ Used ClearStreamingAudioAsync convenience method
≡ƒÄñ Ready for next input...
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      ≡ƒñû Assistant finished speaking
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      Γ£à Response complete
≡ƒñö Processing...
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      ≡ƒÄñ User stopped speaking
info: Azure.AI.VoiceLive.Samples.AudioProcessor[0]
      Audio playback system ready
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      ≡ƒñû Assistant response created
≡ƒÄñ Ready for next input...
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      ≡ƒñû Assistant finished speaking
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      Γ£à Response complete
info: Azure.AI.VoiceLive.Samples.Program[0]
      Received shutdown signal
info: Azure.AI.VoiceLive.Samples.BasicVoiceAssistant[0]
      Event processing cancelled
info: Azure.AI.VoiceLive.Samples.AudioProcessor[0]
      Stopped audio capture
info: Azure.AI.VoiceLive.Samples.AudioProcessor[0]
      Stopped audio playback
info: Azure.AI.VoiceLive.Samples.AudioProcessor[0]
      Audio processor cleaned up
info: Azure.AI.VoiceLive.Samples.AudioProcessor[0]
      Audio processor cleaned up
```



## Related content

- Upgrade to [Voice Live with Foundry Agent Service](voice-live-agents-quickstart.md)
- Learn more about [How to use the Voice Live API](voice-live-how-to.md)
- See the [Voice Live API reference](voice-live-api-reference-2025-10-01.md)
