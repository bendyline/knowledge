---
manager: mcleans
author: PatrickFarley
ms.author: pafarley
reviewer: patrickfarley
ms.reviewer: pafarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 2/20/2026
ai-usage: ai-assisted
---

Learn how to use Voice Live with [Microsoft Foundry Agent Service](https://learn.microsoft.com/azure/ai-foundry/agents/overview) using the VoiceLive SDK for JavaScript.


[Reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-voicelive-readme) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-voicelive) | [Additional samples on GitHub](https://aka.ms/voicelive/github-javascript)
 


You can create and run an application to use Voice Live with agents for real-time voice agents.

- Using agents allows leveraging a built-in prompt and configuration managed within the agent itself, rather than specifying instructions in the session code. 

- Agents encapsulate more complex logic and behaviors, making it easier to manage and update conversational flows without changing the client code. 

- The agent approach streamlines integration. The agent ID is used to connect and all necessary settings are handled internally, reducing the need for manual configuration in the code. 

- This separation also supports better maintainability and scalability for scenarios where multiple conversational experiences or business logic variations are needed.

To use the Voice Live API without Foundry agents, see the [Voice Live API quickstart](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-quickstart).

> **Tip:**
> To use Voice Live, you don't need to deploy an **audio** model with your Microsoft Foundry resource. Voice Live is fully managed, and the model is automatically deployed for you. For more information about models availability, see the [Voice Live overview documentation](../../../voice-live.md).


Follow the quickstart below or get a fully working web app with browser-based voice UI:

> 
> [Voice Live universal assistant sample](https://github.com/microsoft-foundry/voicelive-samples/tree/main/voice-live-universal-assistant)

> **Note:**
> The JavaScript Voice Live SDK is designed for browser-based applications with built-in WebSocket and Web Audio support. This quickstart uses Node.js with `node-record-lpcm16` and `speaker` for a console experience.

## Prerequisites

> **Note:**
> This document refers to the [Microsoft Foundry (new)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/what-is-foundry.md#microsoft-foundry-portals) portal and the latest Foundry Agent Service version.

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Node.js](https://nodejs.org/) version 18 or later.
- [SoX](https://sox.sourceforge.io/) installed on your system (required by `node-record-lpcm16` for microphone capture).
- The required language runtimes, global tools, and Visual Studio Code extensions as described in [Prepare your development environment](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/how-to/develop/install-cli-sdk.md).
- A [Microsoft Foundry resource](../../../../multi-service-resource.md) created in one of the supported regions. For more information about region availability, see the [Voice Live overview documentation](../../../voice-live.md).
- A model deployed in Microsoft Foundry. If you don't have a model, first complete [Quickstart: Set up Microsoft Foundry resources](../../../../../foundry/tutorials/quickstart-create-foundry-resources.md).
<!-- - A Microsoft Foundry agent created in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs). For more information about creating an agent, see the [Create an agent quickstart](../../../../../ai-foundry/quickstarts/get-started-code.md). -->
- Assign the `Foundry User` role to your user account. You can assign roles in the Azure portal under **Access control (IAM)** > **Add role assignment**.

  
> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.


## Prepare the environment

1. Create a new folder `voice-live-quickstart` and go to the quickstart folder with the following command:

    ```shell
    mkdir voice-live-quickstart && cd voice-live-quickstart
    ```

1. Create a **package.json** file with the following content:

    [Code reference unavailable in this source snapshot: ~/voice-live-samples-code/javascript/voice-live-quickstarts/AgentsNewQuickstart/package.json](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/voice-live-agents/javascript.md)

1. Install the dependencies:

    ```shell
    npm install
    ```

## Retrieve resource information


> **Note:**
> The agent integration requires Entra ID authentication. Key-based authentication isn't supported in Agent mode.

Create a new file named `.env` in the folder where you want to run the code. 

In the `.env` file, add the following environment variables for authentication:

```plaintext
# Settings for Foundry Agent
PROJECT_ENDPOINT=<endpoint copied from welcome screen>
AGENT_NAME="MyVoiceAgent"
MODEL_DEPLOYMENT_NAME="gpt-4.1-mini"
# Settings for Voice Live
AGENT_NAME=<name-used-to-create-agent> # See above
AGENT_VERSION=<version-of-the-agent>
CONVERSATION_ID=<specific conversation id to reconnect to>
PROJECT_NAME=<your_project_name>
VOICELIVE_ENDPOINT=<your_endpoint>
VOICELIVE_API_VERSION=2026-04-10
```

Replace the default values with your actual project name, agent name, and endpoint values.

| Variable name | Value |
| --- | --- |
| `PROJECT_ENDPOINT` | The Foundry project endpoint copied from the project welcome screen. |
| `AGENT_NAME` | The name of the agent to use. |
| `AGENT_VERSION` | Optional: The version of the agent to use. |
| `CONVERSATION_ID` | Optional: A specific conversation ID to reconnect to. |
| `PROJECT_NAME` | The name of your Microsoft Foundry project. Project name is the last element of the project endpoint value. |
| `VOICELIVE_ENDPOINT` | This value can be found in the **Keys and Endpoint** section when examining your resource from the Azure portal. |
| `FOUNDRY_RESOURCE_OVERRIDE` | Optional: The Foundry resource name hosting the agent project (for example, `my-resource-name`). |
| `AGENT_AUTHENTICATION_IDENTITY_CLIENT_ID` | Optional: The managed identity client ID of the Voice Live resource. |

Learn more about [keyless authentication](https://learn.microsoft.com/azure/ai-services/authentication) and [setting environment variables](https://learn.microsoft.com/azure/ai-services/cognitive-services-environment-variables).


## Create an agent with Voice Live settings

1. Create a file **create-agent-with-voicelive.js** with the following code:

    [Code reference unavailable in this source snapshot: ~/voice-live-samples-code/javascript/voice-live-quickstarts/AgentsNewQuickstart/create-agent-with-voicelive.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/voice-live-agents/javascript.md)

1. Sign in to Azure with the following command:

    ```shell
    az login
    ```

1. Run the agent creation script:

    ```shell
    node create-agent-with-voicelive.js
    ```

## Talk with a voice agent

The sample code in this quickstart uses Microsoft Entra ID for authentication as the current integration only supports this authentication method.

The sample connects to Foundry Agent Service by passing an `agent` config object to `client.createSession(...)` using these fields:

- `agentName`: The agent name to invoke.
- `projectName`: The Foundry project containing the agent.
- `agentVersion`: Optional pinned version for controlled rollouts. If omitted, the latest version is used.
- `conversationId`: Optional conversation ID to continue prior conversation context.
- `foundryResourceOverride`: Optional resource name when the agent is hosted on a different Foundry resource.
- `authenticationIdentityClientId`: Optional managed identity client ID used with cross-resource agent connections.

> **Note:**
> Agent mode in Voice Live doesn't support key-based authentication for agent invocation. Use Microsoft Entra ID (for example, `DefaultAzureCredential`) for agent access. Voice Live resource configuration might still include API keys for non-agent scenarios.

1. Create the **voice-live-with-agent.js** file with the following code:

    [Code reference unavailable in this source snapshot: ~/voice-live-samples-code/javascript/voice-live-quickstarts/AgentsNewQuickstart/voice-live-with-agent-v2.js](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/voice-live-agents/javascript.md)

1. Sign in to Azure with the following command:

    ```shell
    az login
    ```

1. Run the voice assistant:

    ```shell
    node voice-live-with-agent.js
    ```

1. You can start speaking with the agent and hear responses. You can interrupt the model by speaking. Enter "Ctrl+C" to quit the conversation.

## Output

The output of the script is printed to the console. You see messages indicating the status of the connection, audio stream, and playback. The audio is played back through your speakers or headphones.

```text
🎙️  Basic Foundry Voice Agent with Azure VoiceLive SDK (Agent Mode)
=================================================================

=================================================================
🎤 VOICE ASSISTANT READY
Start speaking to begin conversation
Press Ctrl+C to exit
=================================================================

🎤 Listening...
🤔 Processing...
👤 You said:	Hello.
🎤 Ready for next input...
🤖 Agent responded with audio transcript:	Hello! I'm Tobi the agent. How can I assist you today?
🎤 Listening...
🤔 Processing...
👤 You said:	What are the opening hours of the Eiffel Tower?
🎤 Ready for next input...
🤖 Agent responded with audio transcript:	The Eiffel Tower's opening hours can vary depending on the season and any special events or maintenance. Generally, the Eiffel Tower is open every day of the year, with the following typical hours:

- Mid-June to early September: 9:00 AM to 12:45 AM (last elevator ride up at 12:00 AM)
- Rest of the year: 9:30 AM to 11:45 PM (last elevator ride up at 11:00 PM)

These times can sometimes change, so it's always best to check the official Eiffel Tower website or contact them directly for the most up-to-date information before your visit.

Would you like me to help you find the official website or any other details about visiting the Eiffel Tower?

👋 Voice assistant shut down. Goodbye!
```

A conversation log file is created in the `logs` folder with the name `conversation_YYYYMMDD_HHmmss.log`. This file contains session metadata and the conversation transcript, including user inputs and agent responses.

```text
SessionID: sess_1m1zrSLJSPjJpzbEOyQpTL
Agent Name: VoiceAgentQuickstartTest
Agent Description:
Agent ID:
Voice Name: en-US-Ava:DragonHDLatestNeural
Voice Type: azure-standard

User Input:	Hello.
Agent Audio Response:	Hello! I'm Tobi the agent. How can I assist you today?
User Input:	What are the opening hours of the Eiffel Tower?
Agent Audio Response:	The Eiffel Tower's opening hours can vary depending on the season...
```

Here are the key differences between the [technical log](#technical-log) and the [conversation log](#conversation-log):

| Aspect | Conversation Log | Technical Log |
| --- | --- | --- |
| **Audience** | Business users, content reviewers | Developers, IT operations |
| **Content** | What was said in conversations | How the system is working |
| **Level** | Application/conversation level | System/infrastructure level |
| **Troubleshooting** | "What did the agent say?" | "Why did the connection fail?" |

**Example**: If your agent wasn't responding, you'd check:
- **Console log** → "WebSocket connection failed" or "Audio stream error"
- **conversation log** → "Did the user actually say anything?"

Both logs are complementary - conversation logs for conversation analysis and testing, technical logs for system diagnostics!

### Technical log
**Purpose**: Technical debugging and system monitoring

**Contents**:
- WebSocket connection events
- Audio stream status
- Error messages and stack traces
- System-level events (session.created, response.done, etc.)
- Network connectivity issues
- Audio processing diagnostics

**Format**: Console output with bracketed prefixes (for example, `[session]`, `[audio]`, `[init]`)

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
