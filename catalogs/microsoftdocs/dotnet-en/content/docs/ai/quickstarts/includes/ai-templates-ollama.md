---
ms.date: 2/21/2025
ms.topic: include
---

## Prerequisites

* [.NET 9.0 SDK](https://dotnet.microsoft.com/download)
* Ollama installed locally - [Install Ollama](https://ollama.com/) locally on your device
* One of the following IDEs (optional):
  * [Visual Studio](https://visualstudio.microsoft.com/)
  * [Visual Studio Code](https://code.visualstudio.com) with [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)

## Install the .NET AI app template

The **AI Chat Web App** template is available as a template package through NuGet. Use the [`dotnet new install`](../../../core/tools/dotnet-new-install.md) command to install the package:

```dotnetcli
dotnet new install Microsoft.Extensions.AI.Templates
```

## Create the .NET AI app

After you install the AI app templates, you can use them to create starter apps through Visual Studio UI, Visual Studio Code, or the .NET CLI.

# [Visual Studio](#tab/visual-studio)

1. Inside Visual Studio, navigate to **File > New > Project**.
1. On the **Create a new project** screen, search for **AI Chat Web App**. Select the matching result and then choose **Next**.
1. On the **Configure your new project** screen, enter the desired name and location for your project and then choose **Next**.
1. On the **Additional information** screen:
    - For the **Framework** option, select **.NET 9.0**.
    - For the **AI service provider** option, select **Ollama**.
    - For the **Vector store** option, select **Local on-disk (for prototyping)**.
1. Select **Create** to complete the process.

# [Visual Studio Code](#tab/visual-studio-code)

1. Open the command palette in Visual Studio Code.
1. Search for *New project* and select the result called **.NET: New Project**.
1. Filter the project templates list by searching for *AI*.
1. Select **AI Chat Web App** and press <kbd>Enter</kbd>.

> **Note:**
> The command palette experience currently only supports the default settings. To configure your AI platform and vector store during template creation, use the Visual Studio or .NET CLI workflows.

# [.NET CLI](#tab/dotnet-cli)

1. In a terminal window, navigate to an empty directory on your device.
1. Create a new app with the `dotnet new` command and the following parameters:

    ```dotnetcli
    dotnet new aichatweb --Framework net9.0 --provider ollama --vector-store local
    ```

    The .NET CLI creates a new .NET 9.0 app with the configurations you specified.

1. Open the new app in your editor of choice, such as Visual Studio Code.

    ```dotnetcli
    code .
    ```

---

### Explore the sample app

The sample app you created is a Blazor Interactive Server web app preconfigured with common AI and data services. The app template handles the following concerns for you:

- Includes essential `Microsoft.Extensions.AI` packages and other dependencies in the `.csproj` file to help you get started working with AI.
- Creates various AI services and registers them for dependency injection in the `Program.cs` file:
  - An `IChatClient` service to chat back and forth with the generative AI model.
  - An `IEmbeddingGenerator` service that's used to generate embeddings, which are essential for vector search functionality.
  - A `JsonVectorStore` to act as an in-memory vector store.
- Registers a SQLite database context service to handle ingesting documents. The app is preconfigured to ingest whatever documents you add to the `wwwroot/Data` folder of the project, including the provided example files.
- Provides a complete chat UI using Blazor components. The UI handles rich formatting for the AI responses and provides features such as citations for response data.


## Configure the app

The **AI Chat Web App** app is almost ready to go as soon as it's created. However, you should verify that certain configurations match your needs before you run the app.

1. In a local terminal window, make sure Ollama is running on your computer using the `ollama serve` command:

    ```bash
    ollama serve
    ```

1. By default, the app template targets the default Ollama host address at `http://localhost:11434` and assumes the use of the `llama3.2` and `all-minilm` AI models. Pull those models down onto your device using the following commands:

    ```bash
    ollama pull llama3.2
    ollama pull all-minilm
    ```

    If you prefer to use alternative models, pull those models down using the same `ollama pull` command.

1. Verify the client configuration code parameters match your preferred models:

    ```csharp
    // Update these parameter values to match your preferred OpenAI models
    IChatClient chatClient = new OllamaApiClient(
        new Uri("http://localhost:11434"),
        "llama3.2");
    IEmbeddingGenerator<string, Embedding<float>> embeddingGenerator = new OllamaApiClient(
        new Uri("http://localhost:11434"),
        "all-minilm");
    ```
