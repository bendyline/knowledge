---
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 04/18/2023
ms.author: pafarley
---

Speech containers provide websocket-based query endpoint APIs that are accessed through the Speech SDK and Speech CLI. By default, the Speech SDK and Speech CLI use the public Speech service. To use the container, you need to change the initialization method.

> **Important:**
> When you use the Speech service with containers, be sure to use [host authentication](../speech-container-howto.md#host-urls). If you configure the key and region, requests will go to the public Speech service. Results from the Speech service might not be what you expect. Requests from disconnected containers will fail.

**Applies to: programming-language-csharp**

Instead of using this Azure-cloud initialization config:

```csharp
var config = SpeechConfig.FromSubscription(...);
```

Use this config with the container [host](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech.speechconfig.fromhost):

```csharp
var config = SpeechConfig.FromHost(
    new Uri("ws://localhost:5000"));
```


**Applies to: programming-language-cpp**

Instead of using this Azure-cloud initialization config:

```cpp
auto speechConfig = SpeechConfig::FromSubscription(...);
```

Use this config with the container [host](https://learn.microsoft.com/cpp/cognitive-services/speech/speechconfig#fromhost):

```cpp
auto speechConfig = SpeechConfig::FromHost("ws://localhost:5000");
```


**Applies to: programming-language-go**

Instead of using this Azure-cloud initialization config:

```go
speechConfig, err := speech.NewSpeechConfigFromSubscription(...)
```

Use this config with the container host:

```go
speechConfig, err := speech.NewSpeechConfigFromHost("ws://localhost:5000")
```


**Applies to: programming-language-java**

Instead of using this Azure-cloud initialization config:

```java
SpeechConfig speechConfig = SpeechConfig.fromSubscription(...);
```

Use this config with the container [host](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech.speechconfig#com-microsoft-cognitiveservices-speech-speechconfig-fromhost\(java-net-uri\)):

```java
SpeechConfig speechConfig = SpeechConfig.fromHost("ws://localhost:5000");
```


**Applies to: programming-language-javascript**

Instead of using this Azure-cloud initialization config:

```javascript
const speechConfig = sdk.SpeechConfig.fromSubscription(...);
```

Use this config with the container [host](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/speechconfig#microsoft-cognitiveservices-speech-sdk-speechconfig-fromhost):

```javascript
const speechConfig = sdk.SpeechConfig.fromHost("ws://localhost:5000");
```


**Applies to: programming-language-objectivec**

Instead of using this Azure-cloud initialization config:

```objectivec
SPXSpeechConfiguration *speechConfig = [[SPXSpeechConfiguration alloc] initWithSubscription:...];
```

Use this config with the container [host](https://learn.microsoft.com/objectivec/cognitive-services/speech/spxspeechconfiguration#initwithhost):

```objectivec
SPXSpeechConfiguration *speechConfig = [[SPXSpeechConfiguration alloc] initWithHost:"ws://localhost:5000"];
```


**Applies to: programming-language-swift**

Instead of using this Azure-cloud initialization config:

```swift
let speechConfig = SPXSpeechConfiguration(subscription: "", region: "");
```

Use this config with the container [host](https://learn.microsoft.com/objectivec/cognitive-services/speech/spxspeechconfiguration#initwithhost):

```swift
let speechConfig = SPXSpeechConfiguration(host: "ws://localhost:5000");
```


**Applies to: programming-language-python**

Instead of using this Azure-cloud initialization config:

```python
speech_config = speechsdk.SpeechConfig(
    subscription=speech_key, region=service_region)
```

Use this config with the container [endpoint](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/azure.cognitiveservices.speech.speechconfig):

```python
speech_config = speechsdk.SpeechConfig(
    host="ws://localhost:5000")
```


**Applies to: programming-language-cli**

When you use the Speech CLI in a container, include the `--host ws://localhost:5000/` option. You must also specify `--key none` to ensure that the CLI doesn't try to use a Speech key for authentication. For information about how to configure the Speech CLI, see [Get started with the Azure Speech in Foundry Tools CLI](../spx-basics.md?tabs=dockerinstall#download-and-install).
