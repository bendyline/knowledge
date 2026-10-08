---
title: Quickstart - Generate images from text using AI
description: Learn how to use Microsoft.Extensions.AI to generate images from text prompts using AI models in a .NET application.
ms.date: 03/04/2026
ms.topic: quickstart
ai-usage: ai-assisted
---

# Generate images from text using AI

In this quickstart, you use the [Microsoft.Extensions.AI](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI) (MEAI) library to generate images from text prompts using an AI model. The MEAI text-to-image capabilities let you generate images from natural language prompts or existing images using a consistent and extensible API surface.

The [Microsoft.Extensions.AI.IImageGenerator](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.IImageGenerator) interface provides a unified, extensible API for working with various image generation services, making it easy to integrate text-to-image capabilities into your .NET apps. The interface supports:

- Text-to-image generation.
- Pipeline composition with middleware (logging, telemetry, caching).
- Flexible configuration options.
- Support for multiple AI providers.

> **Note:**
> The `IImageGenerator` interface is currently marked as experimental with the `MEAI001` diagnostic ID. You might need to suppress this warning in your project file or code.

<!--Prereqs-->

## Prerequisites

- .NET 8.0 SDK or higher - [Install the .NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0).
- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Developer CLI (optional) - [Install or update the Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd).


## Configure the AI service

To provision an Azure OpenAI service and model using the Azure portal, complete the steps in the [Create and deploy an Azure OpenAI Service resource](https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource?pivots=web-portal) article. In the "Deploy a model" step, select the `gpt-image-1` model.

> **Note:**
> `gpt-image-1` is a newer model that offers several improvements over DALL-E 3. It's available from OpenAI on a limited basis; apply for access with [this form](https://aka.ms/oai/gptimage1access).

## Create the application

Complete the following steps to create a .NET console application that generates images from text prompts.

1. Create a new console application:

    ```dotnetcli
    dotnet new console -o TextToImageAI
    ```

1. Navigate to the `TextToImageAI` directory, and add the necessary packages to your app:

    ```dotnetcli
    dotnet add package Azure.AI.OpenAI
    dotnet add package Microsoft.Extensions.AI.OpenAI
    dotnet add package Microsoft.Extensions.Configuration
    dotnet add package Microsoft.Extensions.Configuration.UserSecrets
    ```

1. Run the following commands to add [app secrets](https://learn.microsoft.com/aspnet/core/security/app-secrets) for your Azure OpenAI endpoint and API key:

    ```bash
    dotnet user-secrets init
    dotnet user-secrets set AZURE_OPENAI_ENDPOINT <your-Azure-OpenAI-endpoint>
    dotnet user-secrets set AZURE_OPENAI_API_KEY <your-azure-openai-api-key>
    ```

1. Open the new app in your editor of choice (for example, Visual Studio).

## Implement basic image generation

1. Update the `Program.cs` file with the following code to get the configuration data and create the [Azure.AI.OpenAI.AzureOpenAIClient](https://learn.microsoft.com/search/?terms=Azure.AI.OpenAI.AzureOpenAIClient):

   [language="csharp" source="snippets/text-to-image/azure-openai/Program.cs" id="ConfigClient"::: (complete source file; reference: snippets/text-to-image/azure-openai/Program.cs)](../../../_code/docs/ai/quickstarts/snippets/text-to-image/azure-openai/Program.cs.md)

   The preceding code:

   - Loads configuration from user secrets.
   - Creates an `ImageClient` from the OpenAI SDK.
   - Converts the `ImageClient` to an `IImageGenerator` using the [Microsoft.Extensions.AI.OpenAIClientExtensions.AsIImageGenerator(OpenAI.Images.ImageClient)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.OpenAIClientExtensions.AsIImageGenerator(OpenAI.Images.ImageClient)) extension method.

1. Add the following code to implement basic text-to-image generation:

   [language="csharp" source="snippets/text-to-image/azure-openai/Program.cs" id="GenerateImage"::: (complete source file; reference: snippets/text-to-image/azure-openai/Program.cs)](../../../_code/docs/ai/quickstarts/snippets/text-to-image/azure-openai/Program.cs.md)

   The preceding code:

   - Sets the requested image file type by setting [Microsoft.Extensions.AI.ImageGenerationOptions.MediaType](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationOptions.MediaType).
   - Generates an image using the [Microsoft.Extensions.AI.ImageGeneratorExtensions.GenerateImagesAsync(Microsoft.Extensions.AI.IImageGenerator,System.String,Microsoft.Extensions.AI.ImageGenerationOptions,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGeneratorExtensions.GenerateImagesAsync(Microsoft.Extensions.AI.IImageGenerator%2CSystem.String%2CMicrosoft.Extensions.AI.ImageGenerationOptions%2CSystem.Threading.CancellationToken)) method with a text prompt.
   - Saves the generated image to a file in the local user directory.

1. Run the application, either through the IDE or using `dotnet run`.

   The application generates an image and outputs the file path to the image. Open the file to view the generated image. The following image shows one example of a generated image.

   AI-generated image of a tennis court in a jungle.

## Configure image generation options

You can customize image generation by providing other options such as size, response format, and number of images to generate. The [Microsoft.Extensions.AI.ImageGenerationOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationOptions) class allows you to specify:

- [Microsoft.Extensions.AI.ImageGenerationOptions.AdditionalProperties](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationOptions.AdditionalProperties): Provider-specific options.
- [Microsoft.Extensions.AI.ImageGenerationOptions.Count](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationOptions.Count): The number of images to generate.
- [Microsoft.Extensions.AI.ImageGenerationOptions.ImageSize](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationOptions.ImageSize): The dimensions of the generated image as a [System.Drawing.Size](https://learn.microsoft.com/search/?terms=System.Drawing.Size). For supported sizes, see the [OpenAI API reference](https://platform.openai.com/docs/api-reference/images/create).
- [Microsoft.Extensions.AI.ImageGenerationOptions.MediaType](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationOptions.MediaType): The media type (MIME type) of the generated image.
- [Microsoft.Extensions.AI.ImageGenerationOptions.ModelId](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationOptions.ModelId): The model ID.
- [Microsoft.Extensions.AI.ImageGenerationOptions.RawRepresentationFactory](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationOptions.RawRepresentationFactory): The callback that creates the raw representation of the image generation options from an underlying implementation.
- [Microsoft.Extensions.AI.ImageGenerationOptions.ResponseFormat](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationOptions.ResponseFormat): Options are [Microsoft.Extensions.AI.ImageGenerationResponseFormat.Uri](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationResponseFormat.Uri), [Microsoft.Extensions.AI.ImageGenerationResponseFormat.Data](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationResponseFormat.Data), and [Microsoft.Extensions.AI.ImageGenerationResponseFormat.Hosted](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationResponseFormat.Hosted).

## Use hosting integration

When you build web apps or hosted services, you can integrate image generation using dependency injection and hosting patterns. This approach provides better lifecycle management, configuration integration, and testability.

### Configure hosting services

The `Aspire.Azure.AI.OpenAI` package provides extension methods to register Azure OpenAI services with your application's dependency injection container:

1. Add the necessary packages to your web application:

   ```dotnetcli
   dotnet add package Aspire.Azure.AI.OpenAI --prerelease
   dotnet add package Azure.AI.OpenAI
   dotnet add package Microsoft.Extensions.AI.OpenAI --prerelease
   ```

1. Configure the Azure OpenAI client and image generator in your `Program.cs` file:

   [language="csharp" source="snippets/text-to-image/hosting/Program.cs" id="SnippetSetup"::: (complete source file; reference: snippets/text-to-image/hosting/Program.cs)](../../../_code/docs/ai/quickstarts/snippets/text-to-image/hosting/Program.cs.md)

   The [AddAzureOpenAIClient](https://aspire.dev/reference/api/csharp/aspire.azure.ai.openai/aspireazureopenaiextensions/methods/#addazureopenaiclient) method registers the Azure OpenAI client with dependency injection. The connection string (named `"openai"`) is retrieved from configuration, typically from `appsettings.json` or environment variables:

   ```json
   {
     "ConnectionStrings": {
       "openai": "Endpoint=https://your-resource-name.openai.azure.com/;Key=your-api-key"
     }
   }
   ```

1. Register the [Microsoft.Extensions.AI.IImageGenerator](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.IImageGenerator) service with dependency injection:

   [language="csharp" source="snippets/text-to-image/hosting/Program.cs" id="SnippetAddImageGenerator"::: (complete source file; reference: snippets/text-to-image/hosting/Program.cs)](../../../_code/docs/ai/quickstarts/snippets/text-to-image/hosting/Program.cs.md)

   The [Microsoft.Extensions.DependencyInjection.ImageGeneratorBuilderServiceCollectionExtensions.AddImageGenerator*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.ImageGeneratorBuilderServiceCollectionExtensions.AddImageGenerator*) method registers the image generator as a singleton service that can be injected into controllers, services, or minimal API endpoints.

1. Add options and logging::

   [language="csharp" source="snippets/text-to-image/hosting/Program.cs" id="SnippetConfigureOptions"::: (complete source file; reference: snippets/text-to-image/hosting/Program.cs)](../../../_code/docs/ai/quickstarts/snippets/text-to-image/hosting/Program.cs.md)

   The preceding code:

   - Configures options by calling the [Microsoft.Extensions.AI.ConfigureOptionsImageGeneratorBuilderExtensions.ConfigureOptions(Microsoft.Extensions.AI.ImageGeneratorBuilder,System.Action{Microsoft.Extensions.AI.ImageGenerationOptions})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ConfigureOptionsImageGeneratorBuilderExtensions.ConfigureOptions(Microsoft.Extensions.AI.ImageGeneratorBuilder%2CSystem.Action%7BMicrosoft.Extensions.AI.ImageGenerationOptions%7D)) extension method on the [Microsoft.Extensions.AI.ImageGeneratorBuilder](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGeneratorBuilder). This method configures the [Microsoft.Extensions.AI.ImageGenerationOptions](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.ImageGenerationOptions) to be passed to the next generator in the pipeline.
   - Adds logging to the image generator pipeline by calling the [Microsoft.Extensions.AI.LoggingImageGeneratorBuilderExtensions.UseLogging(Microsoft.Extensions.AI.ImageGeneratorBuilder,Microsoft.Extensions.Logging.ILoggerFactory,System.Action{Microsoft.Extensions.AI.LoggingImageGenerator})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.LoggingImageGeneratorBuilderExtensions.UseLogging(Microsoft.Extensions.AI.ImageGeneratorBuilder%2CMicrosoft.Extensions.Logging.ILoggerFactory%2CSystem.Action%7BMicrosoft.Extensions.AI.LoggingImageGenerator%7D)) extension method.

### Use the image generator in endpoints

Once registered, you can inject `IImageGenerator` into your endpoints or services:

[language="csharp" source="snippets/text-to-image/hosting/Program.cs" id="SnippetUseImageGenerator"::: (complete source file; reference: snippets/text-to-image/hosting/Program.cs)](../../../_code/docs/ai/quickstarts/snippets/text-to-image/hosting/Program.cs.md)

This hosting approach provides several benefits:

- **Configuration management**: Connection strings and settings are managed through the .NET configuration system.
- **Dependency injection**: The image generator is available throughout your application via DI.
- **Lifecycle management**: Services are properly initialized and disposed of by the hosting infrastructure.
- **Testability**: Mock implementations can be easily substituted for testing.
- **Integration with Aspire**: When using Aspire, the `AddAzureOpenAIClient` method integrates with service discovery and telemetry.

## Best practices

When implementing text-to-image generation in your applications, consider these best practices:

- **Prompt engineering**: Write clear, detailed prompts that describe the desired image. Include specific details about style, composition, colors, and elements.
- **Cost management**: Image generation can be expensive. Cache results when possible and implement rate limiting to control costs.
- **Content safety**: Always review generated images for appropriate content, especially in production applications. Consider implementing content filtering and moderation.
- **User experience**: Image generation can take several seconds. Provide progress indicators and handle timeouts gracefully.
- **Legal considerations**: Be aware of licensing and usage rights for generated images. Review the terms of service for your AI provider.

## Clean up resources

When you no longer need the Azure OpenAI resource, delete it to avoid incurring charges:

1. In the [Azure portal](https://portal.azure.com), navigate to your Azure OpenAI resource.
1. Select the resource and then select **Delete**.

## Next steps

You've successfully generated some different images using the [Microsoft.Extensions.AI.IImageGenerator](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI.IImageGenerator) interface in [Microsoft.Extensions.AI](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.AI). Next, you can explore some of the additional functionality, including:

- Refining the generated image iteratively.
- Editing an existing image.
- Personalizing an image, diagram, or theme.

## See also

- [Explore text-to-image capabilities in .NET (blog post)](https://devblogs.microsoft.com/dotnet/explore-text-to-image-dotnet/)
- [Microsoft.Extensions.AI library overview](../microsoft-extensions-ai.md)
- [Quickstart: Build an AI chat app with .NET](build-chat-app.md)
