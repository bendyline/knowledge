---
title: "Use Document Intelligence client library or REST API "
titleSuffix: Foundry Tools
description: Learn how to use Document Intelligence client libraries or REST API and create apps to extract key data from documents.
author: laujan
manager: mcleans
ms.service: azure-document-intelligence-foundry-tools
ms.custom: devx-track-dotnet, devx-track-extended-java, devx-track-js, devx-track-python, linux-related-content
ms.topic: how-to
ms.date: 04/01/2026
ms.author: lajanuar
zone_pivot_groups: programming-languages-set-formre
---

<!-- markdownlint-disable MD051 -->

# Use Document Intelligence models

**Applies to: doc-intel-4.0.0**

**This content applies to:** 🟩 **v4.0 (GA)** | **Previous versions:** 🟦 [**v3.1 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.1.0\&preserve-view=tru) 🟥 [**v3.0 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.0.0\&preserve-view=tru) 🟥 [**v2.1 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-2.1.0\&preserve-view=tru)



**Applies to: doc-intel-3.1.0**

**This content applies to:** 🟩 **v3.1 (GA)** | **Latest version:** 🟪 [**v4.0 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-4.0.0\&preserve-view=true) | **Previous versions:** 🟦 [**v3.0**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.0.0\&preserve-view=true) 🟦 [**v2.1**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-2.1.0\&preserve-view=true)



**Applies to: doc-intel-3.0.0**

**This content applies to:** 🟥 **v3.0 (retiring)** | **Latest versions:** 🟪 [**v4.0 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-4.0.0\&preserve-view=true) 🟪 [**v3.1 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.1.0\&preserve-view=true) | **Previous version:** 🟥 [**v2.1 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-2.1.0\&preserve-view=true)



**Applies to: doc-intel-2.1.0**

**This content applies to:** 🟥 **v2.1** | **Latest version:** 🟪 [**v4.0 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-4.0.0\&preserve-view=tru)



**Applies to: \>=doc-intel-3.0.0**

In this guide, learn how to add Document Intelligence models to your applications and workflows. Use a programming language SDK of your choice or the REST API.

Azure Document Intelligence in Foundry Tools is a cloud-based Foundry Tools service that uses machine learning to extract key text and structure elements from documents. We recommend that you use the free service while you learn the technology. Remember that the number of free pages is limited to 500 per month.

Choose from the following Document Intelligence models and analyze and extract data and values from forms and documents:

> 
>
> - The [prebuilt-read](../prebuilt/read.md) model is at the core of all Document Intelligence models and can detect lines, words, locations, and languages. Layout, general document, prebuilt, and custom models all use the `read` model as a foundation for extracting texts from documents.
>
> - The [prebuilt-layout](../prebuilt/layout.md) model extracts text and text locations, tables, selection marks, and structure information from documents and images. You can extract key/value pairs using the layout model with the optional query string parameter **`features=keyValuePairs`** enabled.
>
> - The [prebuilt-contract](../prebuilt/contract.md) model extracts key information from contractual agreements.
>
> - The [prebuilt-healthInsuranceCard.us](../prebuilt/health-insurance-card.md) model extracts key information from US health insurance cards.
>
> - The [prebuilt tax document models](../prebuilt/tax-document.md) model extracts information reported on US tax forms.
>
> - The [prebuilt-invoice](../prebuilt/invoice.md) model extracts key fields and line items from sales invoices in various formats and quality. Fields include phone-captured images, scanned documents, and digital PDFs.
>
> - The [prebuilt-receipt](../prebuilt/receipt.md) model extracts key information from printed and handwritten sales receipts.
>
> - The [prebuilt-idDocument](../prebuilt/id-document.md) model extracts key information from US drivers licenses, international passport biographical pages, US state IDs, social security cards, and permanent resident cards.


**Applies to: doc-intel-3.1.0 || doc-intel-3.0.0**

> 
>
> - The [prebuilt-businessCard](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/concept-business-card.md) model extracts key information and contact details from business card images.


**Applies to: programming-language-csharp**


**Applies to: doc-intel-4.0.0**

<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD034 -->

[Client library](https://learn.microsoft.com/dotnet/api/overview/azure/ai.documentintelligence-readme?view=azure-dotnet\&preserve-view=true) |[REST API reference](https://learn.microsoft.com/rest/api/aiservices/operation-groups?view=rest-aiservices-v4.0%20\(2024-11-30\)\&preserve-view=true) | [Package](https://www.nuget.org/packages/Azure.AI.DocumentIntelligence/1.0.0)| [Samples]( https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/documentintelligence/Azure.AI.DocumentIntelligence/samples/README.md)|[Supported REST API version](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v4-0.md)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/).
- A Foundry Tools or Document Intelligence resource. Create a <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource." target="_blank">single-service</a> or <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a multiple Document Intelligence resource." target="_blank">multi-service</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

- A document file at a URL location. For this project, you can use the sample forms provided in the following table for each feature:

  | Feature | modelID | document-url |
  | --- | --- | --- |
  | **Read model** | prebuilt-read | [Sample brochure](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png) |
  | **Layout model** | prebuilt-layout | [Sample booking confirmation](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png) |
  | **W-2 form model** | prebuilt-tax.us.w2 | [Sample W-2 form](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png) |
  | **Invoice model** | prebuilt-invoice | [Sample invoice](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf) |
  | **Receipt model** | prebuilt-receipt | [Sample receipt](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png) |
  | **ID document model** | prebuilt-idDocument | [Sample ID document](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png) |


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

## Set your environment variables

To interact with the Document Intelligence service, you need to create an instance of the `DocumentAnalysisClient` class. To do so, instantiate the client with your `key` and `endpoint` from the Azure portal. For this project, use environment variables to store and access credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

To set the environment variable for your Document Intelligence resource key, open a console window, and follow the instructions for your operating system and development environment. Replace *\<yourKey>* and *\<yourEndpoint>* with the values from your resource in the Azure portal.

#### [Windows](#tab/windows)

Environment variables in Windows aren't case-sensitive. They're typically declared in uppercase, with words joined by an underscore. At a command prompt, run the following commands:

1. Set your key variable:

   ```console
   setx DI_KEY <yourKey>
   ```

1. Set your endpoint variable

   ```console
   setx DI_ENDPOINT <yourEndpoint>
   ```

1. Close the Command Prompt window after you set your environment variables. The values remain until you change them again.

1. Restart any running programs that read the environment variable. For example, if you're using Visual Studio or Visual Studio Code as your editor, restart before running the sample code.

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `setx VARIABLE_NAME=` | Delete the environment variable by setting the value to an empty string. | `setx DI_KEY=` |
| `setx VARIABLE_NAME=value` | Set or change the value of an environment variable. | `setx DI_KEY=<yourKey>` |
| `set VARIABLE_NAME` | Display the value of a specific environment variable. | `set  DI_KEY` |
| `set` | Display all environment variables. | `set` |

#### [macOS](#tab/macOS)

Environment variables in macOS are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session. Open your terminal and enter the following commands:

1. Set your key variable:

   ```bash
   export key=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export endpoint=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash  `~/.bash_profile` startup script:

  1. Use a text editor to open the *~/.bash_profile* file and add the following command to create a permanent environment variable:

     ```bash
     export DI_KEY=<yourKey> DI_ENDPOINT=<yourEndpoint>
     ```

     Example: `export DI_KEY="<yourKey>"`

  1. Save your changes to the *bash_profile* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bash-profile
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY=<yourKey>` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of a specific environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

#### [Linux](#tab/linux)

Environment variables in Linux are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session:

1. Set your key variable:

   ```bash
   export DI_KEY=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export DI_ENDPOINT=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash `~/.bashrc` startup script:

  1. Use a text editor to open the *~/.bashrc* file and add the following command to create a permanent environment variable:

     ```bash
     export <VARIABLE>=<value>
     ```

     Example: `export DI_KEY=<yourKey>`

  1. Save your changes to the *.bashrc* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bashrc
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY=` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY={yourKey}` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of an environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

---


## Set up your programming environment

1. Start Visual Studio.

1. On the start page, choose **Create a new project**.

   Screenshot of Visual Studio start window.

1. On the **Create a new project** page, enter *console* in the search box. Select the **Console Application** template, then choose **Next**.

   Screenshot of Visual Studio's create new project page.

1. In the **Configure your new project** page, under **Project name** enter **docIntelligence_app**. Then select **Next**.

   Screenshot of Visual Studio's configure new project page.

1. In the **Additional information** page, select **.NET 8.0 (Long-term support)**, and then select **Create**.

    Screenshot of Visual Studio's additional information page.

### Install the client library with NuGet

 1. Right-click on your **docIntelligence_app** project and select **Manage NuGet Packages...** .

    Screenshot of select NuGet package window in Visual Studio.

 1. Select the **Browse** tab and type *Azure.AI.DocumentIntelligence*.

 1. Choose a version from the dropdown menu and install the package in your project.

## Build your application

> **Note:**
>
> Starting with .NET 6, new projects using the `console` template generate a new program style that differs from previous versions. The new output uses recent C# features that simplify the code you need to write.
>
> When you use the newer version, you only need to write the body of the `Main` method. You don't need to include top-level statements, global using directives, or implicit using directives. For more information, see [C# console app template generates top-level statements](https://learn.microsoft.com/dotnet/core/tutorials/top-level-templates).

1. Open the *Program.cs* file.

1. Delete the existing code, including the line `Console.Writeline("Hello World!")`.

1. Select one of the following code samples and copy/paste into your application's *Program.cs* file:

   - [prebuilt-read](#use-the-read-model)
   - [prebuilt-layout](#use-the-layout-model)
   - [prebuilt-tax.us.w2](#use-the-w-2-tax-model)
   - [prebuilt-invoice](#use-the-invoice-model)
   - [prebuilt-receipt](#use-the-receipt-model)
   - [prebuilt-idDocument](#use-the-id-document-model)

1. After you add a code sample to your application, choose the green **Start** button next to the project name to build and run your program, or press **F5**.

    Screenshot of run your Visual Studio program.

## Use the Read model

```csharp
using Azure;
using Azure.AI.DocumentIntelligence;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentIntelligenceClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentIntelligenceClient client = new DocumentIntelligenceClient(new Uri(endpoint), credential);

//sample document
Uri fileUri = new Uri("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png");

Operation<AnalyzeResult> operation = await client.AnalyzeDocumentAsync(WaitUntil.Completed, "prebuilt-read", fileUri);
AnalyzeResult result = operation.Value;

foreach (DocumentPage page in result.Pages)
{
    Console.WriteLine($"Document Page {page.PageNumber} has {page.Lines.Count} line(s), {page.Words.Count} word(s),");
    Console.WriteLine($"and {page.SelectionMarks.Count} selection mark(s).");

    for (int i = 0; i < page.Lines.Count; i++)
    {
        DocumentLine line = page.Lines[i];
        Console.WriteLine($"  Line {i} has content: '{line.Content}'.");

        Console.WriteLine($"    Its bounding polygon (points ordered clockwise):");

        for (int j = 0; j < line.Polygon.Count; j++)
        {
            Console.WriteLine($"      Point {j} => X: {line.Polygon[j].X}, Y: {line.Polygon[j].Y}");
        }
    }
}

foreach (DocumentStyle style in result.Styles)
{
    // Check the style and style confidence to see if text is handwritten.
    // Note that value '0.8' is used as an example.

    bool isHandwritten = style.IsHandwritten.HasValue && style.IsHandwritten == true;

    if (isHandwritten && style.Confidence > 0.8)
    {
        Console.WriteLine($"Handwritten content found:");

        foreach (DocumentSpan span in style.Spans)
        {
            Console.WriteLine($"  Content: {result.Content.Substring(span.Index, span.Length)}");
        }
    }
}

Console.WriteLine("Detected languages:");

foreach (DocumentLanguage language in result.Languages)
{
    Console.WriteLine($"  Found language with locale'{language.Locale}' with confidence {language.Confidence}.");
}

```

Visit the Azure samples repository on GitHub and view the [`read` model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/read-model-output.md).

## Use the Layout model

```csharp
using Azure;
using Azure.AI.DocumentIntelligence;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentIntelligenceClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentIntelligenceClient client = new DocumentIntelligenceClient(new Uri(endpoint), credential);

// sample document document
Uri fileUri = new Uri ("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png");

Operation<AnalyzeResult> operation = await client.AnalyzeDocumentAsync(WaitUntil.Completed, "prebuilt-layout", fileUri);

AnalyzeResult result = operation.Value;

foreach (DocumentPage page in result.Pages)
{
    Console.WriteLine($"Document Page {page.PageNumber} has {page.Lines.Count} line(s), {page.Words.Count} word(s),");
    Console.WriteLine($"and {page.SelectionMarks.Count} selection mark(s).");

    for (int i = 0; i < page.Lines.Count; i++)
    {
        DocumentLine line = page.Lines[i];
        Console.WriteLine($"  Line {i} has content: '{line.Content}'.");

        Console.WriteLine($"    Its bounding polygon (points ordered clockwise):");

        for (int j = 0; j < line.Polygon.Count; j++)
        {
            Console.WriteLine($"      Point {j} => X: {line.Polygon[j].X}, Y: {line.Polygon[j].Y}");
        }
    }

    for (int i = 0; i < page.SelectionMarks.Count; i++)
    {
        DocumentSelectionMark selectionMark = page.SelectionMarks[i];

        Console.WriteLine($"  Selection Mark {i} is {selectionMark.State}.");
        Console.WriteLine($"    Its bounding polygon (points ordered clockwise):");

        for (int j = 0; j < selectionMark.Polygon.Count; j++)
        {
            Console.WriteLine($"      Point {j} => X: {selectionMark.Polygon[j].X}, Y: {selectionMark.Polygon[j].Y}");
        }
    }
}

Console.WriteLine("Paragraphs:");

foreach (DocumentParagraph paragraph in result.Paragraphs)
{
    Console.WriteLine($"  Paragraph content: {paragraph.Content}");

    if (paragraph.Role != null)
    {
        Console.WriteLine($"    Role: {paragraph.Role}");
    }
}

foreach (DocumentStyle style in result.Styles)
{
    // Check the style and style confidence to see if text is handwritten.
    // Note that value '0.8' is used as an example.

    bool isHandwritten = style.IsHandwritten.HasValue && style.IsHandwritten == true;

    if (isHandwritten && style.Confidence > 0.8)
    {
        Console.WriteLine($"Handwritten content found:");

        foreach (DocumentSpan span in style.Spans)
        {
            Console.WriteLine($"  Content: {result.Content.Substring(span.Index, span.Length)}");
        }
    }
}

Console.WriteLine("The following tables were extracted:");

for (int i = 0; i < result.Tables.Count; i++)
{
    DocumentTable table = result.Tables[i];
    Console.WriteLine($"  Table {i} has {table.RowCount} rows and {table.ColumnCount} columns.");

    foreach (DocumentTableCell cell in table.Cells)
    {
        Console.WriteLine($"    Cell ({cell.RowIndex}, {cell.ColumnIndex}) has kind '{cell.Kind}' and content: '{cell.Content}'.");
    }
}

```

Visit the Azure samples repository on GitHub and view the [layout model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/layout-model-output.md).

## Use the General document model

```csharp
using Azure;
using Azure.AI.DocumentIntelligence;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentIntelligenceClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentIntelligenceClient client = new DocumentIntelligenceClient(new Uri(endpoint), credential);

// sample document document
Uri fileUri = new Uri("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf");

Operation<AnalyzeResult> operation = await client.AnalyzeDocumentAsync(WaitUntil.Completed, "prebuilt-document", fileUri);

AnalyzeResult result = operation.Value;

Console.WriteLine("Detected key-value pairs:");

foreach (DocumentKeyValuePair kvp in result.KeyValuePairs)
{
    if (kvp.Value == null)
    {
        Console.WriteLine($"  Found key with no value: '{kvp.Key.Content}'");
    }
    else
    {
        Console.WriteLine($"  Found key-value pair: '{kvp.Key.Content}' and '{kvp.Value.Content}'");
    }
}

foreach (DocumentPage page in result.Pages)
{
    Console.WriteLine($"Document Page {page.PageNumber} has {page.Lines.Count} line(s), {page.Words.Count} word(s),");
    Console.WriteLine($"and {page.SelectionMarks.Count} selection mark(s).");

    for (int i = 0; i < page.Lines.Count; i++)
    {
        DocumentLine line = page.Lines[i];
        Console.WriteLine($"  Line {i} has content: '{line.Content}'.");

        Console.WriteLine($"    Its bounding polygon (points ordered clockwise):");

        for (int j = 0; j < line.Polygon.Count; j++)
        {
            Console.WriteLine($"      Point {j} => X: {line.Polygon[j].X}, Y: {line.Polygon[j].Y}");
        }
    }

    for (int i = 0; i < page.SelectionMarks.Count; i++)
    {
        DocumentSelectionMark selectionMark = page.SelectionMarks[i];

        Console.WriteLine($"  Selection Mark {i} is {selectionMark.State}.");
        Console.WriteLine($"    Its bounding polygon (points ordered clockwise):");

        for (int j = 0; j < selectionMark.Polygon.Count; j++)
        {
            Console.WriteLine($"      Point {j} => X: {selectionMark.Polygon[j].X}, Y: {selectionMark.Polygon[j].Y}");
        }
    }
}

foreach (DocumentStyle style in result.Styles)
{
    // Check the style and style confidence to see if text is handwritten.
    // Note that value '0.8' is used as an example.

    bool isHandwritten = style.IsHandwritten.HasValue && style.IsHandwritten == true;

    if (isHandwritten && style.Confidence > 0.8)
    {
        Console.WriteLine($"Handwritten content found:");

        foreach (DocumentSpan span in style.Spans)
        {
            Console.WriteLine($"  Content: {result.Content.Substring(span.Index, span.Length)}");
        }
    }
}

Console.WriteLine("The following tables were extracted:");

for (int i = 0; i < result.Tables.Count; i++)
{
    DocumentTable table = result.Tables[i];
    Console.WriteLine($"  Table {i} has {table.RowCount} rows and {table.ColumnCount} columns.");

    foreach (DocumentTableCell cell in table.Cells)
    {
        Console.WriteLine($"    Cell ({cell.RowIndex}, {cell.ColumnIndex}) has kind '{cell.Kind}' and content: '{cell.Content}'.");
    }
}

```

Visit the Azure samples repository on GitHub and view the [general document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/general-document-model-output.md).

## Use the W-2 tax model

```csharp

using Azure;
using Azure.AI.DocumentIntelligence;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentIntelligenceClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentIntelligenceClient client = new DocumentIntelligenceClient(new Uri(endpoint), credential);

// sample document document
Uri w2Uri = new Uri("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png");

Operation<AnalyzeResult> operation = await client.AnalyzeDocumentAsync(WaitUntil.Completed, "prebuilt-tax.us.w2", w2Uri);

AnalyzeResult result = operation.Value;

for (int i = 0; i < result.Documents.Count; i++)
{
    Console.WriteLine($"Document {i}:");

    AnalyzedDocument document = result.Documents[i];

    if (document.Fields.TryGetValue("AdditionalInfo", out DocumentField? additionalInfoField))
    {
        if (additionalInfoField.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField infoField in additionalInfoField.Value.AsList())
            {
                Console.WriteLine("AdditionalInfo:");

                if (infoField.FieldType == DocumentFieldType.Dictionary)
                {
                    IReadOnlyDictionary<string, DocumentField> infoFields = infoField.Value.AsDictionary();

                    if (infoFields.TryGetValue("Amount", out DocumentField? amountField))
                    {
                        if (amountField.FieldType == DocumentFieldType.Double)
                        {
                            double amount = amountField.Value.AsDouble();

                            Console.WriteLine($"  Amount: '{amount}', with confidence {amountField.Confidence}");
                        }
                    }

                    if (infoFields.TryGetValue("LetterCode", out DocumentField? letterCodeField))
                    {
                        if (letterCodeField.FieldType == DocumentFieldType.String)
                        {
                            string letterCode = letterCodeField.Value.AsString();

                            Console.WriteLine($"  LetterCode: '{letterCode}', with confidence {letterCodeField.Confidence}");
                        }
                    }
                }
            }
        }
    }


    if (document.Fields.TryGetValue("AllocatedTips", out DocumentField? allocatedTipsField))
    {
        if (allocatedTipsField.FieldType == DocumentFieldType.Double)
        {
            double allocatedTips = allocatedTipsField.Value.AsDouble();
            Console.WriteLine($"Allocated Tips: '{allocatedTips}', with confidence {allocatedTipsField.Confidence}");
        }
    }

    if (document.Fields.TryGetValue("Employer", out DocumentField? employerField))
    {
        if (employerField.FieldType == DocumentFieldType.Dictionary)
        {
            IReadOnlyDictionary<string, DocumentField> employerFields = employerField.Value.AsDictionary();

            if (employerFields.TryGetValue("Name", out DocumentField? employerNameField))
            {
                if (employerNameField.FieldType == DocumentFieldType.String)
                {
                    string name = employerNameField.Value.AsString();

                    Console.WriteLine($"Employer Name: '{name}', with confidence {employerNameField.Confidence}");
                }
            }

            if (employerFields.TryGetValue("IdNumber", out DocumentField? idNumberField))
            {
                if (idNumberField.FieldType == DocumentFieldType.String)
                {
                    string id = idNumberField.Value.AsString();

                    Console.WriteLine($"Employer ID Number: '{id}', with confidence {idNumberField.Confidence}");
                }
            }

            if (employerFields.TryGetValue("Address", out DocumentField? addressField))
            {
                if (addressField.FieldType == DocumentFieldType.Address)
                {
                    Console.WriteLine($"Employer Address: '{addressField.Content}', with confidence {addressField.Confidence}");
                }
            }
        }
    }
}
```

Visit the Azure samples repository on GitHub and view the [W-2 tax model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/w2-tax-model-output.md).

## Use the Invoice model

```csharp
using Azure;
using Azure.AI.DocumentIntelligence;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentIntelligenceClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentIntelligenceClient client = new DocumentIntelligenceClient(new Uri(endpoint), credential);

// sample document document
Uri invoiceUri = new Uri("https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf");

Operation<AnalyzeResult> operation = await client.AnalyzeDocumentAsync(WaitUntil.Completed, "prebuilt-invoice", invoiceUri);

AnalyzeResult result = operation.Value;

for (int i = 0; i < result.Documents.Count; i++)
{
    Console.WriteLine($"Document {i}:");

    AnalyzedDocument document = result.Documents[i];

    if (document.Fields.TryGetValue("VendorName", out DocumentField vendorNameField))
    {
        if (vendorNameField.FieldType == DocumentFieldType.String)
        {
            string vendorName = vendorNameField.Value.AsString();
            Console.WriteLine($"Vendor Name: '{vendorName}', with confidence {vendorNameField.Confidence}");
        }
    }

    if (document.Fields.TryGetValue("CustomerName", out DocumentField customerNameField))
    {
        if (customerNameField.FieldType == DocumentFieldType.String)
        {
            string customerName = customerNameField.Value.AsString();
            Console.WriteLine($"Customer Name: '{customerName}', with confidence {customerNameField.Confidence}");
        }
    }

    if (document.Fields.TryGetValue("Items", out DocumentField itemsField))
    {
        if (itemsField.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField itemField in itemsField.Value.AsList())
            {
                Console.WriteLine("Item:");

                if (itemField.FieldType == DocumentFieldType.Dictionary)
                {
                    IReadOnlyDictionary<string, DocumentField> itemFields = itemField.Value.AsDictionary();

                    if (itemFields.TryGetValue("Description", out DocumentField itemDescriptionField))
                    {
                        if (itemDescriptionField.FieldType == DocumentFieldType.String)
                        {
                            string itemDescription = itemDescriptionField.Value.AsString();

                            Console.WriteLine($"  Description: '{itemDescription}', with confidence {itemDescriptionField.Confidence}");
                        }
                    }

                    if (itemFields.TryGetValue("Amount", out DocumentField itemAmountField))
                    {
                        if (itemAmountField.FieldType == DocumentFieldType.Currency)
                        {
                            CurrencyValue itemAmount = itemAmountField.Value.AsCurrency();

                            Console.WriteLine($"  Amount: '{itemAmount.Symbol}{itemAmount.Amount}', with confidence {itemAmountField.Confidence}");
                        }
                    }
                }
            }
        }
    }

    if (document.Fields.TryGetValue("SubTotal", out DocumentField subTotalField))
    {
        if (subTotalField.FieldType == DocumentFieldType.Currency)
        {
            CurrencyValue subTotal = subTotalField.Value.AsCurrency();
            Console.WriteLine($"Sub Total: '{subTotal.Symbol}{subTotal.Amount}', with confidence {subTotalField.Confidence}");
        }
    }

    if (document.Fields.TryGetValue("TotalTax", out DocumentField totalTaxField))
    {
        if (totalTaxField.FieldType == DocumentFieldType.Currency)
        {
            CurrencyValue totalTax = totalTaxField.Value.AsCurrency();
            Console.WriteLine($"Total Tax: '{totalTax.Symbol}{totalTax.Amount}', with confidence {totalTaxField.Confidence}");
        }
    }

    if (document.Fields.TryGetValue("InvoiceTotal", out DocumentField invoiceTotalField))
    {
        if (invoiceTotalField.FieldType == DocumentFieldType.Currency)
        {
            CurrencyValue invoiceTotal = invoiceTotalField.Value.AsCurrency();
            Console.WriteLine($"Invoice Total: '{invoiceTotal.Symbol}{invoiceTotal.Amount}', with confidence {invoiceTotalField.Confidence}");
        }
    }
}
```

Visit the Azure samples repository on GitHub and view the [invoice model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/general-document-model-output.md).

## Use the Receipt model

```csharp

using Azure;
using Azure.AI.DocumentIntelligence;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentIntelligenceClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentIntelligenceClient client = new DocumentIntelligenceClient(new Uri(endpoint), credential);

// sample document document
Uri receiptUri = new Uri("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png");

Operation<AnalyzeResult> operation = await client.AnalyzeDocumentAsync(WaitUntil.Completed, "prebuilt-receipt", receiptUri);

AnalyzeResult receipts = operation.Value;

foreach (AnalyzedDocument receipt in receipts.Documents)
{
    if (receipt.Fields.TryGetValue("MerchantName", out DocumentField merchantNameField))
    {
        if (merchantNameField.FieldType == DocumentFieldType.String)
        {
            string merchantName = merchantNameField.Value.AsString();

            Console.WriteLine($"Merchant Name: '{merchantName}', with confidence {merchantNameField.Confidence}");
        }
    }

    if (receipt.Fields.TryGetValue("TransactionDate", out DocumentField transactionDateField))
    {
        if (transactionDateField.FieldType == DocumentFieldType.Date)
        {
            DateTimeOffset transactionDate = transactionDateField.Value.AsDate();

            Console.WriteLine($"Transaction Date: '{transactionDate}', with confidence {transactionDateField.Confidence}");
        }
    }

    if (receipt.Fields.TryGetValue("Items", out DocumentField itemsField))
    {
        if (itemsField.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField itemField in itemsField.Value.AsList())
            {
                Console.WriteLine("Item:");

                if (itemField.FieldType == DocumentFieldType.Dictionary)
                {
                    IReadOnlyDictionary<string, DocumentField> itemFields = itemField.Value.AsDictionary();

                    if (itemFields.TryGetValue("Description", out DocumentField itemDescriptionField))
                    {
                        if (itemDescriptionField.FieldType == DocumentFieldType.String)
                        {
                            string itemDescription = itemDescriptionField.Value.AsString();

                            Console.WriteLine($"  Description: '{itemDescription}', with confidence {itemDescriptionField.Confidence}");
                        }
                    }

                    if (itemFields.TryGetValue("TotalPrice", out DocumentField itemTotalPriceField))
                    {
                        if (itemTotalPriceField.FieldType == DocumentFieldType.Double)
                        {
                            double itemTotalPrice = itemTotalPriceField.Value.AsDouble();

                            Console.WriteLine($"  Total Price: '{itemTotalPrice}', with confidence {itemTotalPriceField.Confidence}");
                        }
                    }
                }
            }
        }
    }

    if (receipt.Fields.TryGetValue("Total", out DocumentField totalField))
    {
        if (totalField.FieldType == DocumentFieldType.Double)
        {
            double total = totalField.Value.AsDouble();

            Console.WriteLine($"Total: '{total}', with confidence '{totalField.Confidence}'");
        }
    }
}

```

Visit the Azure samples repository on GitHub and view the [receipt model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/receipt-model-output.md).

## Use the ID document model

```csharp

using Azure;
using Azure.AI.DocumentIntelligence;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentIntelligenceClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentIntelligenceClient client = new DocumentIntelligenceClient(new Uri(endpoint), credential);

// sample document document

Uri idDocumentUri = new Uri("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png");

Operation<AnalyzeResult> operation = await client.AnalyzeDocumentAsync(WaitUntil.Completed, "prebuilt-idDocument", idDocumentUri);

AnalyzeResult identityDocuments = operation.Value;

AnalyzedDocument identityDocument = identityDocuments.Documents.Single();

if (identityDocument.Fields.TryGetValue("Address", out DocumentField addressField))
{
    if (addressField.FieldType == DocumentFieldType.String)
    {
        string address = addressField.Value. AsString();
        Console.WriteLine($"Address: '{address}', with confidence {addressField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("CountryRegion", out DocumentField countryRegionField))
{
    if (countryRegionField.FieldType == DocumentFieldType.CountryRegion)
    {
        string countryRegion = countryRegionField.Value.AsCountryRegion();
        Console.WriteLine($"CountryRegion: '{countryRegion}', with confidence {countryRegionField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("DateOfBirth", out DocumentField dateOfBirthField))
{
    if (dateOfBirthField.FieldType == DocumentFieldType.Date)
    {
        DateTimeOffset dateOfBirth = dateOfBirthField.Value.AsDate();
        Console.WriteLine($"Date Of Birth: '{dateOfBirth}', with confidence {dateOfBirthField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("DateOfExpiration", out DocumentField dateOfExpirationField))
{
    if (dateOfExpirationField.FieldType == DocumentFieldType.Date)
    {
        DateTimeOffset dateOfExpiration = dateOfExpirationField.Value.AsDate();
        Console.WriteLine($"Date Of Expiration: '{dateOfExpiration}', with confidence {dateOfExpirationField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("DocumentNumber", out DocumentField documentNumberField))
{
    if (documentNumberField.FieldType == DocumentFieldType.String)
    {
        string documentNumber = documentNumberField.Value.AsString();
        Console.WriteLine($"Document Number: '{documentNumber}', with confidence {documentNumberField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("FirstName", out DocumentField firstNameField))
{
    if (firstNameField.FieldType == DocumentFieldType.String)
    {
        string firstName = firstNameField.Value.AsString();
        Console.WriteLine($"First Name: '{firstName}', with confidence {firstNameField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("LastName", out DocumentField lastNameField))
{
    if (lastNameField.FieldType == DocumentFieldType.String)
    {
        string lastName = lastNameField.Value.AsString();
        Console.WriteLine($"Last Name: '{lastName}', with confidence {lastNameField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("Region", out DocumentField regionfield))
{
    if (regionfield.FieldType == DocumentFieldType.String)
    {
        string region = regionfield.Value.AsString();
        Console.WriteLine($"Region: '{region}', with confidence {regionfield.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("Sex", out DocumentField sexfield))
{
    if (sexfield.FieldType == DocumentFieldType.String)
    {
        string sex = sexfield.Value.AsString();
        Console.WriteLine($"Sex: '{sex}', with confidence {sexfield.Confidence}");
    }
}

```

Visit the Azure samples repository on GitHub and view the [ID document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/id-document-model-output.md).



**Applies to: doc-intel-3.1.0 || doc-intel-3.0.0**


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD034 -->

**Applies to: doc-intel-3.1.0**
[Client library](https://learn.microsoft.com/dotnet/api/overview/azure/ai.formrecognizer-readme?view=azure-dotnet\&preserve-view=true) |[API reference](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP) | [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.FormRecognizer/4.1.0) | [Samples](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/formrecognizer/Azure.AI.FormRecognizer/samples/README.md) | [Supported REST API versions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v3-1.md)



**Applies to: doc-intel-3.0.0**
[Client library](https://learn.microsoft.com/dotnet/api/overview/azure/ai.formrecognizer-readme?view=azure-dotnet\&preserve-view=true) | [REST API reference](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-v3.0%20\(2022-08-31\)\&preserve-view=true\&tabs=HTTP) | [Package](https://www.nuget.org/packages/Azure.AI.FormRecognizer/4.0.0) | [Samples](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/formrecognizer/Azure.AI.FormRecognizer/samples) |[Supported REST API versions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v3-0.md)


## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/).
- A Foundry Tools or Document Intelligence resource. Create a <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource." target="_blank">single-service</a> or <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a multiple Document Intelligence resource." target="_blank">multi-service</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

- A document file at a URL location. For this project, you can use the sample forms provided in the following table for each feature:

  | Feature | modelID | document-url |
  | --- | --- | --- |
  | **Read model** | prebuilt-read | [Sample brochure](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png) |
  | **Layout model** | prebuilt-layout | [Sample booking confirmation](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png) |
  | **W-2 form model** | prebuilt-tax.us.w2 | [Sample W-2 form](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png) |
  | **Invoice model** | prebuilt-invoice | [Sample invoice](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf) |
  | **Receipt model** | prebuilt-receipt | [Sample receipt](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png) |
  | **ID document model** | prebuilt-idDocument | [Sample ID document](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png) |
  | **Business card model** | prebuilt-businessCard | [Sample business card](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/business-card-english.jpg) |


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

## Set your environment variables

To interact with the Document Intelligence service, you need to create an instance of the `DocumentAnalysisClient` class. To do so, instantiate the client with your `key` and `endpoint` from the Azure portal. For this project, use environment variables to store and access credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

To set the environment variable for your Document Intelligence resource key, open a console window, and follow the instructions for your operating system and development environment. Replace *\<yourKey>* and *\<yourEndpoint>* with the values from your resource in the Azure portal.

#### [Windows](#tab/windows)

Environment variables in Windows aren't case-sensitive. They're typically declared in uppercase, with words joined by an underscore. At a command prompt, run the following commands:

1. Set your key variable:

   ```console
   setx DI_KEY <yourKey>
   ```

1. Set your endpoint variable

   ```console
   setx DI_ENDPOINT <yourEndpoint>
   ```

1. Close the Command Prompt window after you set your environment variables. The values remain until you change them again.

1. Restart any running programs that read the environment variable. For example, if you're using Visual Studio or Visual Studio Code as your editor, restart before running the sample code.

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `setx VARIABLE_NAME=` | Delete the environment variable by setting the value to an empty string. | `setx DI_KEY=` |
| `setx VARIABLE_NAME=value` | Set or change the value of an environment variable. | `setx DI_KEY=<yourKey>` |
| `set VARIABLE_NAME` | Display the value of a specific environment variable. | `set  DI_KEY` |
| `set` | Display all environment variables. | `set` |

#### [macOS](#tab/macOS)

Environment variables in macOS are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session. Open your terminal and enter the following commands:

1. Set your key variable:

   ```bash
   export key=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export endpoint=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash  `~/.bash_profile` startup script:

  1. Use a text editor to open the *~/.bash_profile* file and add the following command to create a permanent environment variable:

     ```bash
     export DI_KEY=<yourKey> DI_ENDPOINT=<yourEndpoint>
     ```

     Example: `export DI_KEY="<yourKey>"`

  1. Save your changes to the *bash_profile* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bash-profile
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY=<yourKey>` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of a specific environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

#### [Linux](#tab/linux)

Environment variables in Linux are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session:

1. Set your key variable:

   ```bash
   export DI_KEY=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export DI_ENDPOINT=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash `~/.bashrc` startup script:

  1. Use a text editor to open the *~/.bashrc* file and add the following command to create a permanent environment variable:

     ```bash
     export <VARIABLE>=<value>
     ```

     Example: `export DI_KEY=<yourKey>`

  1. Save your changes to the *.bashrc* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bashrc
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY=` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY={yourKey}` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of an environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

---


## Set up your programming environment

1. Start Visual Studio.

1. On the start page, choose **Create a new project**.

   Screenshot of Visual Studio start window.

1. On the **Create a new project** page, enter *console* in the search box. Select the **Console Application** template, then choose **Next**.

   Screenshot of Visual Studio's create new project page.

1. In the **Configure your new project** page, under **Project name** enter **docIntelligence_app**. Then select **Next**.

   Screenshot of Visual Studio's configure new project page.

1. In the **Additional information** page, select **.NET 8.0 (Long-term support)**, and then select **Create**.

    Screenshot of Visual Studio's additional information page.

### Install the client library with NuGet

 1. Right-click on your **docIntelligence_app** project and select **Manage NuGet Packages...** .

    Screenshot of select NuGet package window in Visual Studio.

 1. Select the **Browse** tab and type *Azure.AI.FormRecognizer*.

    Screenshot of select prerelease NuGet package in Visual Studio.

 1. Select a version from the dropdown menu and install the package in your project.
<!-- --- -->

## Build your application

> **Note:**
>
> Starting with .NET 6, new projects using the `console` template generate a new program style that differs from previous versions. The new output uses recent C# features that simplify the code you need to write.
>
> When you use the newer version, you only need to write the body of the `Main` method. You don't need to include top-level statements, global using directives, or implicit using directives. For more information, see [C# console app template generates top-level statements](https://learn.microsoft.com/dotnet/core/tutorials/top-level-templates).

1. Open the *Program.cs* file.

1. Delete the existing code, including the line `Console.Writeline("Hello World!")`.

1. Select one of the following code samples and copy/paste into your application's *Program.cs* file:

   - [prebuilt-read](#use-the-read-model)
   - [prebuilt-layout](#use-the-layout-model)
   - [prebuilt-tax.us.w2](#use-the-w-2-tax-model)
   - [prebuilt-invoice](#use-the-invoice-model)
   - [prebuilt-receipt](#use-the-receipt-model)
   - [prebuilt-idDocument](#use-the-id-document-model)

1. After you add a code sample to your application, choose the green **Start** button next to the project name to build and run your program, or press **F5**.

    Screenshot of run your Visual Studio program.

## Use the Read model

```csharp
using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentAnalysisClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentAnalysisClient client = new DocumentAnalysisClient(new Uri(endpoint), credential);

//sample document
Uri fileUri = new Uri("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png");

AnalyzeDocumentOperation operation = await client.AnalyzeDocumentFromUriAsync(WaitUntil.Completed, "prebuilt-read", fileUri);
AnalyzeResult result = operation.Value;

foreach (DocumentPage page in result.Pages)
{
    Console.WriteLine($"Document Page {page.PageNumber} has {page.Lines.Count} line(s), {page.Words.Count} word(s),");
    Console.WriteLine($"and {page.SelectionMarks.Count} selection mark(s).");

    for (int i = 0; i < page.Lines.Count; i++)
    {
        DocumentLine line = page.Lines[i];
        Console.WriteLine($"  Line {i} has content: '{line.Content}'.");

        Console.WriteLine($"    Its bounding polygon (points ordered clockwise):");

        for (int j = 0; j < line.BoundingPolygon.Count; j++)
        {
            Console.WriteLine($"      Point {j} => X: {line.BoundingPolygon[j].X}, Y: {line.BoundingPolygon[j].Y}");
        }
    }
}

foreach (DocumentStyle style in result.Styles)
{
    // Check the style and style confidence to see if text is handwritten.
    // Note that value '0.8' is used as an example.

    bool isHandwritten = style.IsHandwritten.HasValue && style.IsHandwritten == true;

    if (isHandwritten && style.Confidence > 0.8)
    {
        Console.WriteLine($"Handwritten content found:");

        foreach (DocumentSpan span in style.Spans)
        {
            Console.WriteLine($"  Content: {result.Content.Substring(span.Index, span.Length)}");
        }
    }
}

Console.WriteLine("Detected languages:");

foreach (DocumentLanguage language in result.Languages)
{
    Console.WriteLine($"  Found language with locale'{language.Locale}' with confidence {language.Confidence}.");
}

```

> 
<!-- > [I &#8203;ran into an issue when running the application.](https://microsoft.qualtrics.com/jfe/form/SV_0Cl5zkG3CnDjq6O?PLanguage=csharp&Product=FormRecognizer&Page=how-to&Section=run-read) -->

Visit the Azure samples repository on GitHub and view the [`read` model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/read-model-output.md).

## Use the Layout model

```csharp
using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentAnalysisClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentAnalysisClient client = new DocumentAnalysisClient(new Uri(endpoint), credential);

// sample document document
Uri fileUri = new Uri ("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png");

AnalyzeDocumentOperation operation = await client.AnalyzeDocumentFromUriAsync(WaitUntil.Completed, "prebuilt-layout", fileUri);

AnalyzeResult result = operation.Value;

foreach (DocumentPage page in result.Pages)
{
    Console.WriteLine($"Document Page {page.PageNumber} has {page.Lines.Count} line(s), {page.Words.Count} word(s),");
    Console.WriteLine($"and {page.SelectionMarks.Count} selection mark(s).");

    for (int i = 0; i < page.Lines.Count; i++)
    {
        DocumentLine line = page.Lines[i];
        Console.WriteLine($"  Line {i} has content: '{line.Content}'.");

        Console.WriteLine($"    Its bounding polygon (points ordered clockwise):");

        for (int j = 0; j < line.BoundingPolygon.Count; j++)
        {
            Console.WriteLine($"      Point {j} => X: {line.BoundingPolygon[j].X}, Y: {line.BoundingPolygon[j].Y}");
        }
    }

    for (int i = 0; i < page.SelectionMarks.Count; i++)
    {
        DocumentSelectionMark selectionMark = page.SelectionMarks[i];

        Console.WriteLine($"  Selection Mark {i} is {selectionMark.State}.");
        Console.WriteLine($"    Its bounding polygon (points ordered clockwise):");

        for (int j = 0; j < selectionMark.BoundingPolygon.Count; j++)
        {
            Console.WriteLine($"      Point {j} => X: {selectionMark.BoundingPolygon[j].X}, Y: {selectionMark.BoundingPolygon[j].Y}");
        }
    }
}

Console.WriteLine("Paragraphs:");

foreach (DocumentParagraph paragraph in result.Paragraphs)
{
    Console.WriteLine($"  Paragraph content: {paragraph.Content}");

    if (paragraph.Role != null)
    {
        Console.WriteLine($"    Role: {paragraph.Role}");
    }
}

foreach (DocumentStyle style in result.Styles)
{
    // Check the style and style confidence to see if text is handwritten.
    // Note that value '0.8' is used as an example.

    bool isHandwritten = style.IsHandwritten.HasValue && style.IsHandwritten == true;

    if (isHandwritten && style.Confidence > 0.8)
    {
        Console.WriteLine($"Handwritten content found:");

        foreach (DocumentSpan span in style.Spans)
        {
            Console.WriteLine($"  Content: {result.Content.Substring(span.Index, span.Length)}");
        }
    }
}

Console.WriteLine("The following tables were extracted:");

for (int i = 0; i < result.Tables.Count; i++)
{
    DocumentTable table = result.Tables[i];
    Console.WriteLine($"  Table {i} has {table.RowCount} rows and {table.ColumnCount} columns.");

    foreach (DocumentTableCell cell in table.Cells)
    {
        Console.WriteLine($"    Cell ({cell.RowIndex}, {cell.ColumnIndex}) has kind '{cell.Kind}' and content: '{cell.Content}'.");
    }
}

```

Visit the Azure samples repository on GitHub and view the [layout model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/layout-model-output.md).

## Use the General document model

```csharp
using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentAnalysisClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentAnalysisClient client = new DocumentAnalysisClient(new Uri(endpoint), credential);

// sample document document
Uri fileUri = new Uri("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf");

AnalyzeDocumentOperation operation = await client.AnalyzeDocumentFromUriAsync(WaitUntil.Completed, "prebuilt-document", fileUri);

AnalyzeResult result = operation.Value;

Console.WriteLine("Detected key-value pairs:");

foreach (DocumentKeyValuePair kvp in result.KeyValuePairs)
{
    if (kvp.Value == null)
    {
        Console.WriteLine($"  Found key with no value: '{kvp.Key.Content}'");
    }
    else
    {
        Console.WriteLine($"  Found key-value pair: '{kvp.Key.Content}' and '{kvp.Value.Content}'");
    }
}

foreach (DocumentPage page in result.Pages)
{
    Console.WriteLine($"Document Page {page.PageNumber} has {page.Lines.Count} line(s), {page.Words.Count} word(s),");
    Console.WriteLine($"and {page.SelectionMarks.Count} selection mark(s).");

    for (int i = 0; i < page.Lines.Count; i++)
    {
        DocumentLine line = page.Lines[i];
        Console.WriteLine($"  Line {i} has content: '{line.Content}'.");

        Console.WriteLine($"    Its bounding polygon (points ordered clockwise):");

        for (int j = 0; j < line.BoundingPolygon.Count; j++)
        {
            Console.WriteLine($"      Point {j} => X: {line.BoundingPolygon[j].X}, Y: {line.BoundingPolygon[j].Y}");
        }
    }

    for (int i = 0; i < page.SelectionMarks.Count; i++)
    {
        DocumentSelectionMark selectionMark = page.SelectionMarks[i];

        Console.WriteLine($"  Selection Mark {i} is {selectionMark.State}.");
        Console.WriteLine($"    Its bounding polygon (points ordered clockwise):");

        for (int j = 0; j < selectionMark.BoundingPolygon.Count; j++)
        {
            Console.WriteLine($"      Point {j} => X: {selectionMark.BoundingPolygon[j].X}, Y: {selectionMark.BoundingPolygon[j].Y}");
        }
    }
}

foreach (DocumentStyle style in result.Styles)
{
    // Check the style and style confidence to see if text is handwritten.
    // Note that value '0.8' is used as an example.

    bool isHandwritten = style.IsHandwritten.HasValue && style.IsHandwritten == true;

    if (isHandwritten && style.Confidence > 0.8)
    {
        Console.WriteLine($"Handwritten content found:");

        foreach (DocumentSpan span in style.Spans)
        {
            Console.WriteLine($"  Content: {result.Content.Substring(span.Index, span.Length)}");
        }
    }
}

Console.WriteLine("The following tables were extracted:");

for (int i = 0; i < result.Tables.Count; i++)
{
    DocumentTable table = result.Tables[i];
    Console.WriteLine($"  Table {i} has {table.RowCount} rows and {table.ColumnCount} columns.");

    foreach (DocumentTableCell cell in table.Cells)
    {
        Console.WriteLine($"    Cell ({cell.RowIndex}, {cell.ColumnIndex}) has kind '{cell.Kind}' and content: '{cell.Content}'.");
    }
}

```

Visit the Azure samples repository on GitHub and view the [general document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/general-document-model-output.md).

## Use the W-2 tax model

```csharp

using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentAnalysisClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentAnalysisClient client = new DocumentAnalysisClient(new Uri(endpoint), credential);

// sample document document
Uri w2Uri = new Uri("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png");

AnalyzeDocumentOperation operation = await client.AnalyzeDocumentFromUriAsync(WaitUntil.Completed, "prebuilt-tax.us.w2", w2Uri);

AnalyzeResult result = operation.Value;

for (int i = 0; i < result.Documents.Count; i++)
{
    Console.WriteLine($"Document {i}:");

    AnalyzedDocument document = result.Documents[i];

    if (document.Fields.TryGetValue("AdditionalInfo", out DocumentField? additionalInfoField))
    {
        if (additionalInfoField.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField infoField in additionalInfoField.Value.AsList())
            {
                Console.WriteLine("AdditionalInfo:");

                if (infoField.FieldType == DocumentFieldType.Dictionary)
                {
                    IReadOnlyDictionary<string, DocumentField> infoFields = infoField.Value.AsDictionary();

                    if (infoFields.TryGetValue("Amount", out DocumentField? amountField))
                    {
                        if (amountField.FieldType == DocumentFieldType.Double)
                        {
                            double amount = amountField.Value.AsDouble();

                            Console.WriteLine($"  Amount: '{amount}', with confidence {amountField.Confidence}");
                        }
                    }

                    if (infoFields.TryGetValue("LetterCode", out DocumentField? letterCodeField))
                    {
                        if (letterCodeField.FieldType == DocumentFieldType.String)
                        {
                            string letterCode = letterCodeField.Value.AsString();

                            Console.WriteLine($"  LetterCode: '{letterCode}', with confidence {letterCodeField.Confidence}");
                        }
                    }
                }
            }
        }
    }


    if (document.Fields.TryGetValue("AllocatedTips", out DocumentField? allocatedTipsField))
    {
        if (allocatedTipsField.FieldType == DocumentFieldType.Double)
        {
            double allocatedTips = allocatedTipsField.Value.AsDouble();
            Console.WriteLine($"Allocated Tips: '{allocatedTips}', with confidence {allocatedTipsField.Confidence}");
        }
    }

    if (document.Fields.TryGetValue("Employer", out DocumentField? employerField))
    {
        if (employerField.FieldType == DocumentFieldType.Dictionary)
        {
            IReadOnlyDictionary<string, DocumentField> employerFields = employerField.Value.AsDictionary();

            if (employerFields.TryGetValue("Name", out DocumentField? employerNameField))
            {
                if (employerNameField.FieldType == DocumentFieldType.String)
                {
                    string name = employerNameField.Value.AsString();

                    Console.WriteLine($"Employer Name: '{name}', with confidence {employerNameField.Confidence}");
                }
            }

            if (employerFields.TryGetValue("IdNumber", out DocumentField? idNumberField))
            {
                if (idNumberField.FieldType == DocumentFieldType.String)
                {
                    string id = idNumberField.Value.AsString();

                    Console.WriteLine($"Employer ID Number: '{id}', with confidence {idNumberField.Confidence}");
                }
            }

            if (employerFields.TryGetValue("Address", out DocumentField? addressField))
            {
                if (addressField.FieldType == DocumentFieldType.Address)
                {
                    Console.WriteLine($"Employer Address: '{addressField.Content}', with confidence {addressField.Confidence}");
                }
            }
        }
    }
}
```

Visit the Azure samples repository on GitHub and view the [W-2 tax model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/w2-tax-model-output.md).

## Use the Invoice model

```csharp
using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentAnalysisClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentAnalysisClient client = new DocumentAnalysisClient(new Uri(endpoint), credential);

// sample document document
Uri invoiceUri = new Uri("https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf");

AnalyzeDocumentOperation operation = await client.AnalyzeDocumentFromUriAsync(WaitUntil.Completed, "prebuilt-invoice", invoiceUri);

AnalyzeResult result = operation.Value;

for (int i = 0; i < result.Documents.Count; i++)
{
    Console.WriteLine($"Document {i}:");

    AnalyzedDocument document = result.Documents[i];

    if (document.Fields.TryGetValue("VendorName", out DocumentField vendorNameField))
    {
        if (vendorNameField.FieldType == DocumentFieldType.String)
        {
            string vendorName = vendorNameField.Value.AsString();
            Console.WriteLine($"Vendor Name: '{vendorName}', with confidence {vendorNameField.Confidence}");
        }
    }

    if (document.Fields.TryGetValue("CustomerName", out DocumentField customerNameField))
    {
        if (customerNameField.FieldType == DocumentFieldType.String)
        {
            string customerName = customerNameField.Value.AsString();
            Console.WriteLine($"Customer Name: '{customerName}', with confidence {customerNameField.Confidence}");
        }
    }

    if (document.Fields.TryGetValue("Items", out DocumentField itemsField))
    {
        if (itemsField.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField itemField in itemsField.Value.AsList())
            {
                Console.WriteLine("Item:");

                if (itemField.FieldType == DocumentFieldType.Dictionary)
                {
                    IReadOnlyDictionary<string, DocumentField> itemFields = itemField.Value.AsDictionary();

                    if (itemFields.TryGetValue("Description", out DocumentField itemDescriptionField))
                    {
                        if (itemDescriptionField.FieldType == DocumentFieldType.String)
                        {
                            string itemDescription = itemDescriptionField.Value.AsString();

                            Console.WriteLine($"  Description: '{itemDescription}', with confidence {itemDescriptionField.Confidence}");
                        }
                    }

                    if (itemFields.TryGetValue("Amount", out DocumentField itemAmountField))
                    {
                        if (itemAmountField.FieldType == DocumentFieldType.Currency)
                        {
                            CurrencyValue itemAmount = itemAmountField.Value.AsCurrency();

                            Console.WriteLine($"  Amount: '{itemAmount.Symbol}{itemAmount.Amount}', with confidence {itemAmountField.Confidence}");
                        }
                    }
                }
            }
        }
    }

    if (document.Fields.TryGetValue("SubTotal", out DocumentField subTotalField))
    {
        if (subTotalField.FieldType == DocumentFieldType.Currency)
        {
            CurrencyValue subTotal = subTotalField.Value.AsCurrency();
            Console.WriteLine($"Sub Total: '{subTotal.Symbol}{subTotal.Amount}', with confidence {subTotalField.Confidence}");
        }
    }

    if (document.Fields.TryGetValue("TotalTax", out DocumentField totalTaxField))
    {
        if (totalTaxField.FieldType == DocumentFieldType.Currency)
        {
            CurrencyValue totalTax = totalTaxField.Value.AsCurrency();
            Console.WriteLine($"Total Tax: '{totalTax.Symbol}{totalTax.Amount}', with confidence {totalTaxField.Confidence}");
        }
    }

    if (document.Fields.TryGetValue("InvoiceTotal", out DocumentField invoiceTotalField))
    {
        if (invoiceTotalField.FieldType == DocumentFieldType.Currency)
        {
            CurrencyValue invoiceTotal = invoiceTotalField.Value.AsCurrency();
            Console.WriteLine($"Invoice Total: '{invoiceTotal.Symbol}{invoiceTotal.Amount}', with confidence {invoiceTotalField.Confidence}");
        }
    }
}
```

Visit the Azure samples repository on GitHub and view the [invoice model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/general-document-model-output.md).

## Use the Receipt model

```csharp

using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentAnalysisClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentAnalysisClient client = new DocumentAnalysisClient(new Uri(endpoint), credential);

// sample document document
Uri receiptUri = new Uri("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png");

AnalyzeDocumentOperation operation = await client.AnalyzeDocumentFromUriAsync(WaitUntil.Completed, "prebuilt-receipt", receiptUri);

AnalyzeResult receipts = operation.Value;

foreach (AnalyzedDocument receipt in receipts.Documents)
{
    if (receipt.Fields.TryGetValue("MerchantName", out DocumentField merchantNameField))
    {
        if (merchantNameField.FieldType == DocumentFieldType.String)
        {
            string merchantName = merchantNameField.Value.AsString();

            Console.WriteLine($"Merchant Name: '{merchantName}', with confidence {merchantNameField.Confidence}");
        }
    }

    if (receipt.Fields.TryGetValue("TransactionDate", out DocumentField transactionDateField))
    {
        if (transactionDateField.FieldType == DocumentFieldType.Date)
        {
            DateTimeOffset transactionDate = transactionDateField.Value.AsDate();

            Console.WriteLine($"Transaction Date: '{transactionDate}', with confidence {transactionDateField.Confidence}");
        }
    }

    if (receipt.Fields.TryGetValue("Items", out DocumentField itemsField))
    {
        if (itemsField.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField itemField in itemsField.Value.AsList())
            {
                Console.WriteLine("Item:");

                if (itemField.FieldType == DocumentFieldType.Dictionary)
                {
                    IReadOnlyDictionary<string, DocumentField> itemFields = itemField.Value.AsDictionary();

                    if (itemFields.TryGetValue("Description", out DocumentField itemDescriptionField))
                    {
                        if (itemDescriptionField.FieldType == DocumentFieldType.String)
                        {
                            string itemDescription = itemDescriptionField.Value.AsString();

                            Console.WriteLine($"  Description: '{itemDescription}', with confidence {itemDescriptionField.Confidence}");
                        }
                    }

                    if (itemFields.TryGetValue("TotalPrice", out DocumentField itemTotalPriceField))
                    {
                        if (itemTotalPriceField.FieldType == DocumentFieldType.Double)
                        {
                            double itemTotalPrice = itemTotalPriceField.Value.AsDouble();

                            Console.WriteLine($"  Total Price: '{itemTotalPrice}', with confidence {itemTotalPriceField.Confidence}");
                        }
                    }
                }
            }
        }
    }

    if (receipt.Fields.TryGetValue("Total", out DocumentField totalField))
    {
        if (totalField.FieldType == DocumentFieldType.Double)
        {
            double total = totalField.Value.AsDouble();

            Console.WriteLine($"Total: '{total}', with confidence '{totalField.Confidence}'");
        }
    }
}

```

Visit the Azure samples repository on GitHub and view the [receipt model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/receipt-model-output.md).

## ID document model

```csharp

using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentAnalysisClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentAnalysisClient client = new DocumentAnalysisClient(new Uri(endpoint), credential);

// sample document document

Uri idDocumentUri = new Uri("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png");

AnalyzeDocumentOperation operation = await client.AnalyzeDocumentFromUriAsync(WaitUntil.Completed, "prebuilt-idDocument", idDocumentUri);

AnalyzeResult identityDocuments = operation.Value;

AnalyzedDocument identityDocument = identityDocuments.Documents.Single();

if (identityDocument.Fields.TryGetValue("Address", out DocumentField addressField))
{
    if (addressField.FieldType == DocumentFieldType.String)
    {
        string address = addressField.Value. AsString();
        Console.WriteLine($"Address: '{address}', with confidence {addressField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("CountryRegion", out DocumentField countryRegionField))
{
    if (countryRegionField.FieldType == DocumentFieldType.CountryRegion)
    {
        string countryRegion = countryRegionField.Value.AsCountryRegion();
        Console.WriteLine($"CountryRegion: '{countryRegion}', with confidence {countryRegionField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("DateOfBirth", out DocumentField dateOfBirthField))
{
    if (dateOfBirthField.FieldType == DocumentFieldType.Date)
    {
        DateTimeOffset dateOfBirth = dateOfBirthField.Value.AsDate();
        Console.WriteLine($"Date Of Birth: '{dateOfBirth}', with confidence {dateOfBirthField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("DateOfExpiration", out DocumentField dateOfExpirationField))
{
    if (dateOfExpirationField.FieldType == DocumentFieldType.Date)
    {
        DateTimeOffset dateOfExpiration = dateOfExpirationField.Value.AsDate();
        Console.WriteLine($"Date Of Expiration: '{dateOfExpiration}', with confidence {dateOfExpirationField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("DocumentNumber", out DocumentField documentNumberField))
{
    if (documentNumberField.FieldType == DocumentFieldType.String)
    {
        string documentNumber = documentNumberField.Value.AsString();
        Console.WriteLine($"Document Number: '{documentNumber}', with confidence {documentNumberField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("FirstName", out DocumentField firstNameField))
{
    if (firstNameField.FieldType == DocumentFieldType.String)
    {
        string firstName = firstNameField.Value.AsString();
        Console.WriteLine($"First Name: '{firstName}', with confidence {firstNameField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("LastName", out DocumentField lastNameField))
{
    if (lastNameField.FieldType == DocumentFieldType.String)
    {
        string lastName = lastNameField.Value.AsString();
        Console.WriteLine($"Last Name: '{lastName}', with confidence {lastNameField.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("Region", out DocumentField regionfield))
{
    if (regionfield.FieldType == DocumentFieldType.String)
    {
        string region = regionfield.Value.AsString();
        Console.WriteLine($"Region: '{region}', with confidence {regionfield.Confidence}");
    }
}

if (identityDocument.Fields.TryGetValue("Sex", out DocumentField sexfield))
{
    if (sexfield.FieldType == DocumentFieldType.String)
    {
        string sex = sexfield.Value.AsString();
        Console.WriteLine($"Sex: '{sex}', with confidence {sexfield.Confidence}");
    }
}

```

Visit the Azure samples repository on GitHub and view the [ID-document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/id-document-model-output.md).

## Use the Business card model

```csharp
using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;

//use your `key` and `endpoint` environment variables to create your `AzureKeyCredential` and `DocumentAnalysisClient` instances
string key = Environment.GetEnvironmentVariable("DI_KEY");
string endpoint = Environment.GetEnvironmentVariable("DI_ENDPOINT");
AzureKeyCredential credential = new AzureKeyCredential(key);
DocumentAnalysisClient client = new DocumentAnalysisClient(new Uri(endpoint), credential);

// sample document document
Uri businessCardUri = new Uri("https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/business-card-english.jpg");

AnalyzeDocumentOperation operation = await client.AnalyzeDocumentFromUriAsync(WaitUntil.Completed, "prebuilt-businessCard", businessCardUri);

AnalyzeResult businessCards = operation.Value;

foreach (AnalyzedDocument businessCard in businessCards.Documents)
{
    if (businessCard.Fields.TryGetValue("ContactNames", out DocumentField ContactNamesField))
    {
        if (ContactNamesField.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField contactNameField in ContactNamesField.Value.AsList())
            {
                Console.WriteLine("Contact Name: ");

                if (contactNameField.FieldType == DocumentFieldType.Dictionary)
                {
                    IReadOnlyDictionary<string, DocumentField> contactNameFields = contactNameField.Value.AsDictionary();

                    if (contactNameFields.TryGetValue("FirstName", out DocumentField firstNameField))
                    {
                        if (firstNameField.FieldType == DocumentFieldType.String)
                        {
                            string firstName = firstNameField.Value.AsString();

                            Console.WriteLine($"  First Name: '{firstName}', with confidence {firstNameField.Confidence}");
                        }
                    }

                    if (contactNameFields.TryGetValue("LastName", out DocumentField lastNameField))
                    {
                        if (lastNameField.FieldType == DocumentFieldType.String)
                        {
                            string lastName = lastNameField.Value.AsString();

                            Console.WriteLine($"  Last Name: '{lastName}', with confidence {lastNameField.Confidence}");
                        }
                    }
                }
            }
        }
    }

    if (businessCard.Fields.TryGetValue("JobTitles", out DocumentField jobTitlesFields))
    {
        if (jobTitlesFields.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField jobTitleField in jobTitlesFields.Value.AsList())
            {
                if (jobTitleField.FieldType == DocumentFieldType.String)
                {
                    string jobTitle = jobTitleField.Value.AsString();

                    Console.WriteLine($"Job Title: '{jobTitle}', with confidence {jobTitleField.Confidence}");
                }
            }
        }
    }

    if (businessCard.Fields.TryGetValue("Departments", out DocumentField departmentFields))
    {
        if (departmentFields.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField departmentField in departmentFields.Value.AsList())
            {
                if (departmentField.FieldType == DocumentFieldType.String)
                {
                    string department = departmentField.Value.AsString();

                    Console.WriteLine($"Department: '{department}', with confidence {departmentField.Confidence}");
                }
            }
        }
    }

    if (businessCard.Fields.TryGetValue("Emails", out DocumentField emailFields))
    {
        if (emailFields.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField emailField in emailFields.Value.AsList())
            {
                if (emailField.FieldType == DocumentFieldType.String)
                {
                    string email = emailField.Value.AsString();

                    Console.WriteLine($"Email: '{email}', with confidence {emailField.Confidence}");
                }
            }
        }
    }

    if (businessCard.Fields.TryGetValue("Websites", out DocumentField websiteFields))
    {
        if (websiteFields.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField websiteField in websiteFields.Value.AsList())
            {
                if (websiteField.FieldType == DocumentFieldType.String)
                {
                    string website = websiteField.Value.AsString();

                    Console.WriteLine($"Website: '{website}', with confidence {websiteField.Confidence}");
                }
            }
        }
    }

    if (businessCard.Fields.TryGetValue("MobilePhones", out DocumentField mobilePhonesFields))
    {
        if (mobilePhonesFields.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField mobilePhoneField in mobilePhonesFields.Value.AsList())
            {
                if (mobilePhoneField.FieldType == DocumentFieldType.PhoneNumber)
                {
                    string mobilePhone = mobilePhoneField.Value.AsPhoneNumber();

                    Console.WriteLine($"Mobile phone number: '{mobilePhone}', with confidence {mobilePhoneField.Confidence}");
                }
            }
        }
    }

    if (businessCard.Fields.TryGetValue("WorkPhones", out DocumentField workPhonesFields))
    {
        if (workPhonesFields.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField workPhoneField in workPhonesFields.Value.AsList())
            {
                if (workPhoneField.FieldType == DocumentFieldType.PhoneNumber)
                {
                    string workPhone = workPhoneField.Value.AsPhoneNumber();

                    Console.WriteLine($"Work phone number: '{workPhone}', with confidence {workPhoneField.Confidence}");
                }
            }
        }
    }

    if (businessCard.Fields.TryGetValue("Faxes", out DocumentField faxesFields))
    {
        if (faxesFields.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField faxField in faxesFields.Value.AsList())
            {
                if (faxField.FieldType == DocumentFieldType.PhoneNumber)
                {
                    string fax = faxField.Value.AsPhoneNumber();

                    Console.WriteLine($"Fax phone number: '{fax}', with confidence {faxField.Confidence}");
                }
            }
        }
    }

    if (businessCard.Fields.TryGetValue("Addresses", out DocumentField addressesFields))
    {
        if (addressesFields.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField addressField in addressesFields.Value.AsList())
            {
                if (addressField.FieldType == DocumentFieldType.String)
                {
                    string address = addressField.Value.AsString();

                    Console.WriteLine($"Address: '{address}', with confidence {addressField.Confidence}");
                }
            }
        }
    }

    if (businessCard.Fields.TryGetValue("CompanyNames", out DocumentField companyNamesFields))
    {
        if (companyNamesFields.FieldType == DocumentFieldType.List)
        {
            foreach (DocumentField companyNameField in companyNamesFields.Value.AsList())
            {
                if (companyNameField.FieldType == DocumentFieldType.String)
                {
                    string companyName = companyNameField.Value.AsString();

                    Console.WriteLine($"Company name: '{companyName}', with confidence {companyNameField.Confidence}");
                }
            }
        }
    }
}

```

Visit the Azure samples repository on GitHub and view the [business card model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/how-to-guide/business-card-model-output.md).





**Applies to: programming-language-java**


**Applies to: doc-intel-4.0.0**

<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD034 -->

[Client library](https://learn.microsoft.com/java/api/com.azure.ai.documentintelligence?view=azure-java-stable\&preserve-view=true) | [REST API reference](https://learn.microsoft.com/rest/api/aiservices/operation-groups?view=rest-aiservices-v4.0%20\(2024-11-30\)\&preserve-view=true) | [Package (Maven)](https://central.sonatype.com/artifact/com.azure/azure-ai-documentintelligence/1.0.0) | [Samples](https://github.com/Azure/azure-sdk-for-java/blob/azure-ai-documentintelligence_1.0.0/sdk/documentintelligence/azure-ai-documentintelligence/src/samples/README.md) |[Supported REST API version](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v4-0.md)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest version of [Visual Studio Code](https://code.visualstudio.com/) or your preferred IDE. See [Java in Visual Studio Code](https://code.visualstudio.com/docs/languages/java).

  - Visual Studio Code offers a *Coding Pack for Java* for Windows and macOS. The coding pack is a bundle of `VS` Code, the Java Development Kit (JDK), and a collection of suggested extensions by Microsoft. The Coding Pack can also be used to fix an existing development environment.
  - If you're using `VS` Code and the Coding Pack For Java, install the [**Gradle for Java**](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle) extension.

  If you aren't using Visual Studio Code, make sure you have the following installed in your development environment:

  - A [**Java Development Kit (JDK)**](https://learn.microsoft.com/java/openjdk/download#openjdk-17) version 8 or later. For more information, see [Microsoft Build of OpenJDK](https://www.microsoft.com/openjdk).
  - [**Gradle**](https://docs.gradle.org/current/userguide/installation.html), version 6.8 or later.

- A Foundry Tools or Document Intelligence resource. Create a <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource." target="_blank">single-service</a> or <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a multiple Document Intelligence resource." target="_blank">multi-service</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.

  > **Tip:**
  > Create a Foundry resource if you plan to access multiple Foundry Tools by using a single endpoint and key. For Document Intelligence access only, create a Document Intelligence resource. You need a single-service resource if you intend to use [Microsoft Entra authentication](https://learn.microsoft.com/azure/active-directory/authentication/overview-authentication).

- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

- A document file at a URL. For this project, you can use the sample forms provided in the following table for each feature:

  | Feature | modelID | document-url |
  | --- | --- | --- |
  | **Read model** | prebuilt-read | [Sample brochure](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png) |
  | **Layout model** | prebuilt-layout | [Sample booking confirmation](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png) |
  | **W-2 form model** | prebuilt-tax.us.w2 | [Sample W-2 form](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png) |
  | **Invoice model** | prebuilt-invoice | [Sample invoice](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf) |
  | **Receipt model** | prebuilt-receipt | [Sample receipt](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png) |
  | **ID document model** | prebuilt-idDocument | [Sample ID document](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png) |


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

## Set your environment variables

To interact with the Document Intelligence service, you need to create an instance of the `DocumentAnalysisClient` class. To do so, instantiate the client with your `key` and `endpoint` from the Azure portal. For this project, use environment variables to store and access credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

To set the environment variable for your Document Intelligence resource key, open a console window, and follow the instructions for your operating system and development environment. Replace *\<yourKey>* and *\<yourEndpoint>* with the values from your resource in the Azure portal.

#### [Windows](#tab/windows)

Environment variables in Windows aren't case-sensitive. They're typically declared in uppercase, with words joined by an underscore. At a command prompt, run the following commands:

1. Set your key variable:

   ```console
   setx DI_KEY <yourKey>
   ```

1. Set your endpoint variable

   ```console
   setx DI_ENDPOINT <yourEndpoint>
   ```

1. Close the Command Prompt window after you set your environment variables. The values remain until you change them again.

1. Restart any running programs that read the environment variable. For example, if you're using Visual Studio or Visual Studio Code as your editor, restart before running the sample code.

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `setx VARIABLE_NAME=` | Delete the environment variable by setting the value to an empty string. | `setx DI_KEY=` |
| `setx VARIABLE_NAME=value` | Set or change the value of an environment variable. | `setx DI_KEY=<yourKey>` |
| `set VARIABLE_NAME` | Display the value of a specific environment variable. | `set  DI_KEY` |
| `set` | Display all environment variables. | `set` |

#### [macOS](#tab/macOS)

Environment variables in macOS are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session. Open your terminal and enter the following commands:

1. Set your key variable:

   ```bash
   export key=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export endpoint=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash  `~/.bash_profile` startup script:

  1. Use a text editor to open the *~/.bash_profile* file and add the following command to create a permanent environment variable:

     ```bash
     export DI_KEY=<yourKey> DI_ENDPOINT=<yourEndpoint>
     ```

     Example: `export DI_KEY="<yourKey>"`

  1. Save your changes to the *bash_profile* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bash-profile
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY=<yourKey>` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of a specific environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

#### [Linux](#tab/linux)

Environment variables in Linux are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session:

1. Set your key variable:

   ```bash
   export DI_KEY=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export DI_ENDPOINT=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash `~/.bashrc` startup script:

  1. Use a text editor to open the *~/.bashrc* file and add the following command to create a permanent environment variable:

     ```bash
     export <VARIABLE>=<value>
     ```

     Example: `export DI_KEY=<yourKey>`

  1. Save your changes to the *.bashrc* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bashrc
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY=` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY={yourKey}` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of an environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

---


## Set up your programming environment

To set up your programming environment, create a Gradle project and install the client library.

### Create a Gradle project

1. In a console window, create a directory for your app called *doc-intelligence-app* and navigate to it.

   ```console
   mkdir doc-intelligence-app
   cd doc-intelligence-app
   ```

1. Run the `gradle init` command from your working directory. This command creates essential build files for Gradle, including *build.gradle.kts*, which is used at runtime to create and configure your application.

    ```console
    gradle init --type basic
    ```

1. When prompted to choose a **DSL**, select *Kotlin*.

1. Select **Enter** to accept the default project name, *doc-intelligence-app*.

### Install the client library

This article uses the Gradle dependency manager. You can find the client library and information for other dependency managers on the [Maven Central Repository](https://central.sonatype.com/artifact/com.azure/azure-ai-documentintelligence).

1. Open the project's *build.gradle.kts* file in your IDE. Copy and paste the following code to include the client library as an `implementation` statement, along with the required plugins and settings.

   ```kotlin
   plugins {
      java
      application
   }
   application {
       mainClass.set("DocIntelligence")
   }
   repositories {
       mavenCentral()
   }
   dependencies {
       implementation group: 'com.azure', name: 'azure-ai-documentintelligence', version: '1.0.0'
   }
   ```

## Create a Java application

To interact with the Document Intelligence service, create an instance of the `DocumentIntelligenceClient` class. To do so, you create an `AzureKeyCredential` with your `key` from the Azure portal and a `DocumentIntelligenceClient` instance with the `AzureKeyCredential` and your Document Intelligence `endpoint`.

1. From the *doc-intelligence-app* directory, run the following command:

   ```console
   mkdir -p src/main/java
   ```

 That command creates the following directory structure:

   Screenshot of Java directory structure

1. Navigate to the `java` directory and create a file named *DocIntelligence.java*.

   > **Tip:**
   >
   > You can create a new file by using PowerShell. Open a PowerShell window in your project directory by holding down the **Shift** key and right-clicking the folder, then type the following command: *New-Item DocIntelligence.java*.

1. Open the *DocIntelligence.java* file and select one of the following code samples AND copy/paste into your application:

   - The [prebuilt-read](#use-the-read-model) model is at the core of all Document Intelligence models and can detect lines, words, locations, and languages. The layout, general document, prebuilt, and custom models all use the `read` model as a foundation for extracting texts from documents.
   - The [prebuilt-layout](#use-the-layout-model) model extracts text and text locations, tables, selection marks, and structure information from documents and images.
   - The [prebuilt-tax.us.w2](#use-the-w-2-tax-model) model extracts information reported on US Internal Revenue Service (IRS) tax forms.
   - The [prebuilt-invoice](#use-the-invoice-model) model extracts key fields and line items from sales invoices in various formats.
   - The [prebuilt-receipt](#use-the-receipt-model) model extracts key information from printed and handwritten sales receipts.
   - The [prebuilt-idDocument](#use-the-id-document-model) model extracts key information from US Drivers Licenses; international passport biographical pages; US state IDs; social security cards; and permanent resident cards.

1. Type the following commands:

   ```console
   gradle build
   gradle run
   ```

## Use the Read model

```java
import com.azure.ai.documentintelligence;

import com.azure.ai.documentintelligence.models.AnalyzeDocumentRequest;
import com.azure.ai.documentintelligence.models.AnalyzeResult;
import com.azure.ai.documentintelligence.models.AnalyzeResultOperation;
import com.azure.ai.documentintelligence.models.Document;
import com.azure.ai.documentintelligence.models.DocumentField;
import com.azure.ai.documentintelligence.models.DocumentFieldType;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;


public class DocIntelligence {

  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentIntelligenceClient` instance and `AzureKeyCredential` variable
      DocumentIntelligenceClient client = new DocumentIntelligenceClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

//sample document
String documentUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png";

String modelId = "prebuilt-read";

SyncPoller < OperationResult, AnalyzeResult > analyzeLayoutResultPoller =
  client.beginAnalyzeDocument(modelId, invoiceUrl);

AnalyzeResult analyzeLayoutResult = analyzeLayoutResultPoller.getFinalResult().getAnalyzeResult();

// pages
analyzeLayoutResult.getPages().forEach(documentPage -> {
  System.out.printf("Page has width: %.2f and height: %.2f, measured with unit: %s%n",
    documentPage.getWidth(),
    documentPage.getHeight(),
    documentPage.getUnit());

  // lines
  documentPage.getLines().forEach(documentLine ->
    System.out.printf("Line %s is within a bounding polygon %s.%n",
      documentLine.getContent(),
      documentLine.getPolygon().toString()));

  // words
  documentPage.getWords().forEach(documentWord ->
    System.out.printf("Word '%s' has a confidence score of %.2f.%n",
      documentWord.getContent(),
      documentWord.getConfidence()));
});
}
}
```

Visit the Azure samples repository on GitHub and view the [`read` model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/read-model-output.md).

## Use the Layout model

```java
import com.azure.ai.documentintelligence;

import com.azure.ai.documentintelligence.models.AnalyzeDocumentRequest;
import com.azure.ai.documentintelligence.models.AnalyzeResult;
import com.azure.ai.documentintelligence.models.AnalyzeResultOperation;
import com.azure.ai.documentintelligence.models.Document;
import com.azure.ai.documentintelligence.models.DocumentField;
import com.azure.ai.documentintelligence.models.DocumentFieldType;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class DocIntelligence {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentIntelligenceClient` instance and `AzureKeyCredential` variable
      DocumentIntelligenceClient client = new DocumentIntelligenceClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

//sample document
String layoutDocumentUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png";
String modelId = "prebuilt-layout";

SyncPoller < OperationResult, AnalyzeResult > analyzeLayoutResultPoller =
  client.beginAnalyzeDocument(modelId, layoutDocumentUrl);

AnalyzeResult analyzeLayoutResult = analyzeLayoutResultPoller.getFinalResult().getAnalyzeResult();

// pages
analyzeLayoutResult.getPages().forEach(documentPage -> {
  System.out.printf("Page has width: %.2f and height: %.2f, measured with unit: %s%n",
    documentPage.getWidth(),
    documentPage.getHeight(),
    documentPage.getUnit());

  // lines
  documentPage.getLines().forEach(documentLine ->
    System.out.printf("Line %s is within a bounding polygon %s.%n",
      documentLine.getContent(),
      documentLine.getPolygon().toString()));

  // words
  documentPage.getWords().forEach(documentWord ->
    System.out.printf("Word '%s' has a confidence score of %.2f%n",
      documentWord.getContent(),
      documentWord.getConfidence()));

  // selection marks
  documentPage.getSelectionMarks().forEach(documentSelectionMark ->
    System.out.printf("Selection mark is '%s' and is within a bounding polygon %s with confidence %.2f.%n",
      documentSelectionMark.getSelectionMarkState().toString(),
      getBoundingCoordinates(documentSelectionMark.getPolygon()),
      documentSelectionMark.getConfidence()));
});

// tables
List < DocumentTable > tables = analyzeLayoutResult.getTables();
for (int i = 0; i < tables.size(); i++) {
  DocumentTable documentTables = tables.get(i);
  System.out.printf("Table %d has %d rows and %d columns.%n", i, documentTables.getRowCount(),
    documentTables.getColumnCount());
  documentTables.getCells().forEach(documentTableCell -> {
    System.out.printf("Cell '%s', has row index %d and column index %d.%n", documentTableCell.getContent(),
      documentTableCell.getRowIndex(), documentTableCell.getColumnIndex());
  });
  System.out.println();
}

}

// Utility function to get the bounding polygon coordinates.
private static String getBoundingCoordinates(List < Point > Polygon) {
  return Polygon.stream().map(point -> String.format("[%.2f, %.2f]", point.getX(),
    point.getY())).collect(Collectors.joining(", "));
}

}
```

Visit the Azure samples repository on GitHub and view the [layout model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/layout-model-output.md).

## Use the General document model

```java
import com.azure.ai.documentintelligence;

import com.azure.ai.documentintelligence.models.AnalyzeDocumentRequest;
import com.azure.ai.documentintelligence.models.AnalyzeResult;
import com.azure.ai.documentintelligence.models.AnalyzeResultOperation;
import com.azure.ai.documentintelligence.models.Document;
import com.azure.ai.documentintelligence.models.DocumentField;
import com.azure.ai.documentintelligence.models.DocumentFieldType;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class DocIntelligence {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentIntelligenceClient` instance and `AzureKeyCredential` variable
      DocumentIntelligenceClient client = new DocumentIntelligenceClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

//sample document
String generalDocumentUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf";
String modelId = "prebuilt-document";
SyncPoller < OperationResult, AnalyzeResult > analyzeDocumentPoller =
  client.beginAnalyzeDocument(modelId, generalDocumentUrl);

AnalyzeResult analyzeResult = analyzeDocumentPoller.getFinalResult().getAnalyzeResult();

// pages
analyzeResult.getPages().forEach(documentPage -> {
  System.out.printf("Page has width: %.2f and height: %.2f, measured with unit: %s%n",
    documentPage.getWidth(),
    documentPage.getHeight(),
    documentPage.getUnit());

  // lines
  documentPage.getLines().forEach(documentLine ->
    System.out.printf("Line %s is within a bounding polygon %s.%n",
      documentLine.getContent(),
      documentLine.getPolygon().toString()));

  // words
  documentPage.getWords().forEach(documentWord ->
    System.out.printf("Word %s has a confidence score of %.2f%n.",
      documentWord.getContent(),
      documentWord.getConfidence()));
});

// tables
List < DocumentTable > tab_les = analyzeResult.getTables();
for (int i = 0; i < tab_les.size(); i++) {
  DocumentTable documentTable = tab_les.get(i);
  System.out.printf("Table %d has %d rows and %d columns.%n", i, documentTable.getRowCount(),
    documentTable.getColumnCount());
  documentTable.getCells().forEach(documentTableCell -> {
    System.out.printf("Cell '%s', has row index %d and column index %d.%n",
      documentTableCell.getContent(),
      documentTableCell.getRowIndex(), documentTableCell.getColumnIndex());
  });
  System.out.println();
}

// Key-value pairs
analyzeResult.getKeyValuePairs().forEach(documentKeyValuePair -> {
  System.out.printf("Key content: %s%n", documentKeyValuePair.getKey().getContent());
  System.out.printf("Key content bounding region: %s%n",
    documentKeyValuePair.getKey().getBoundingRegions().toString());

  if (documentKeyValuePair.getValue() != null) {
    System.out.printf("Value content: %s%n", documentKeyValuePair.getValue().getContent());
    System.out.printf("Value content bounding region: %s%n", documentKeyValuePair.getValue().getBoundingRegions().toString());
  }
});

}

}
```

Visit the Azure samples repository on GitHub and view the [general document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/general-document-model-output.md).

## Use the W-2 tax model

```java
import com.azure.ai.documentintelligence;

import com.azure.ai.documentintelligence.models.AnalyzeDocumentRequest;
import com.azure.ai.documentintelligence.models.AnalyzeResult;
import com.azure.ai.documentintelligence.models.AnalyzeResultOperation;
import com.azure.ai.documentintelligence.models.Document;
import com.azure.ai.documentintelligence.models.DocumentField;
import com.azure.ai.documentintelligence.models.DocumentFieldType;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class DocIntelligence {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentIntelligenceClient` instance and `AzureKeyCredential` variable
      DocumentIntelligenceClient client = new DocumentIntelligenceClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

// sample document
String w2Url = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png";
String modelId = "prebuilt-tax.us.w2";

SyncPoller < OperationResult, AnalyzeResult > analyzeW2Poller =
  client.beginAnalyzeDocument(modelId, w2Url);

AnalyzeResult analyzeTaxResult = analyzeW2Poller.getFinalResult().getAnalyzeResult();

for (int i = 0; i < analyzeTaxResult.getDocuments().size(); i++) {
  AnalyzedDocument analyzedTaxDocument = analyzeTaxResult.getDocuments().get(i);
  Map < String, DocumentField > taxFields = analyzedTaxDocument.getFields();
  System.out.printf("----------- Analyzing Document  %d -----------%n", i);
  DocumentField w2FormVariantField = taxFields.get("W2FormVariant");
  if (w2FormVariantField != null) {
    if (DocumentFieldType.STRING == w2FormVariantField.getType()) {
      String merchantName = w2FormVariantField.getValueAsString();
      System.out.printf("Form variant: %s, confidence: %.2f%n",
        merchantName, w2FormVariantField.getConfidence());
    }
  }

  DocumentField employeeField = taxFields.get("Employee");
  if (employeeField != null) {
    System.out.println("Employee Data: ");
    if (DocumentFieldType.MAP == employeeField.getType()) {
      Map < String, DocumentField > employeeDataFieldMap = employeeField.getValueAsMap();
      DocumentField employeeName = employeeDataFieldMap.get("Name");
      if (employeeName != null) {
        if (DocumentFieldType.STRING == employeeName.getType()) {
          String employeesName = employeeName.getValueAsString();
          System.out.printf("Employee Name: %s, confidence: %.2f%n",
            employeesName, employeeName.getConfidence());
        }
      }
      DocumentField employeeAddrField = employeeDataFieldMap.get("Address");
      if (employeeAddrField != null) {
        if (DocumentFieldType.STRING == employeeAddrField.getType()) {
          String employeeAddress = employeeAddrField.getValueAsString();
          System.out.printf("Employee Address: %s, confidence: %.2f%n",
            employeeAddress, employeeAddrField.getConfidence());
        }
      }
    }
  }

  DocumentField employerField = taxFields.get("Employer");
  if (employerField != null) {
    System.out.println("Employer Data: ");
    if (DocumentFieldType.MAP == employerField.getType()) {
      Map < String, DocumentField > employerDataFieldMap = employerField.getValueAsMap();
      DocumentField employerNameField = employerDataFieldMap.get("Name");
      if (employerNameField != null) {
        if (DocumentFieldType.STRING == employerNameField.getType()) {
          String employerName = employerNameField.getValueAsString();
          System.out.printf("Employer Name: %s, confidence: %.2f%n",
            employerName, employerNameField.getConfidence());
        }
      }

      DocumentField employerIDNumberField = employerDataFieldMap.get("IdNumber");
      if (employerIDNumberField != null) {
        if (DocumentFieldType.STRING == employerIDNumberField.getType()) {
          String employerIdNumber = employerIDNumberField.getValueAsString();
          System.out.printf("Employee ID Number: %s, confidence: %.2f%n",
            employerIdNumber, employerIDNumberField.getConfidence());
        }
      }
    }
  }

  DocumentField taxYearField = taxFields.get("TaxYear");
  if (taxYearField != null) {
    if (DocumentFieldType.STRING == taxYearField.getType()) {
      String taxYear = taxYearField.getValueAsString();
      System.out.printf("Tax year: %s, confidence: %.2f%n",
        taxYear, taxYearField.getConfidence());
    }
  }

  DocumentField taxDateField = taxFields.get("TaxDate");
  if (taxDateField != null) {
    if (DocumentFieldType.DATE == taxDateField.getType()) {
      LocalDate taxDate = taxDateField.getValueAsDate();
      System.out.printf("Tax Date: %s, confidence: %.2f%n",
        taxDate, taxDateField.getConfidence());
    }
  }

  DocumentField socialSecurityTaxField = taxFields.get("SocialSecurityTaxWithheld");
  if (socialSecurityTaxField != null) {
    if (DocumentFieldType.DOUBLE == socialSecurityTaxField.getType()) {
      Double socialSecurityTax = socialSecurityTaxField.getValueAsDouble();
      System.out.printf("Social Security Tax withheld: %.2f, confidence: %.2f%n",
        socialSecurityTax, socialSecurityTaxField.getConfidence());
    }
  }
}
}
}
```

Visit the Azure samples repository on GitHub and view the [W-2 tax model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/w2-tax-model-output.md).

## Use the Invoice model

```java
import com.azure.ai.documentintelligence;

import com.azure.ai.documentintelligence.models.AnalyzeDocumentRequest;
import com.azure.ai.documentintelligence.models.AnalyzeResult;
import com.azure.ai.documentintelligence.models.AnalyzeResultOperation;
import com.azure.ai.documentintelligence.models.Document;
import com.azure.ai.documentintelligence.models.DocumentField;
import com.azure.ai.documentintelligence.models.DocumentFieldType;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class DocIntelligence {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentIntelligenceClient` instance and `AzureKeyCredential` variable
      DocumentIntelligenceClient client = new DocumentIntelligenceClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

// sample document
String invoiceUrl = "https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf";
String modelId = "prebuilt-invoice";

SyncPoller < OperationResult, AnalyzeResult > analyzeInvoicesPoller =
  client.beginAnalyzeDocument(modelId, invoiceUrl);

AnalyzeResult analyzeInvoiceResult = analyzeInvoicesPoller.getFinalResult().getAnalyzeResult();

for (int i = 0; i < analyzeInvoiceResult.getDocuments().size(); i++) {
  AnalyzedDocument analyzedInvoice = analyzeInvoiceResult.getDocuments().get(i);
  Map < String, DocumentField > invoiceFields = analyzedInvoice.getFields();
  System.out.printf("----------- Analyzing invoice  %d -----------%n", i);
  DocumentField vendorNameField = invoiceFields.get("VendorName");
  if (vendorNameField != null) {
    if (DocumentFieldType.STRING == vendorNameField.getType()) {
      String merchantName = vendorNameField.getValueAsString();
      System.out.printf("Vendor Name: %s, confidence: %.2f%n",
        merchantName, vendorNameField.getConfidence());
    }
  }

  DocumentField vendorAddressField = invoiceFields.get("VendorAddress");
  if (vendorAddressField != null) {
    if (DocumentFieldType.STRING == vendorAddressField.getType()) {
      String merchantAddress = vendorAddressField.getValueAsString();
      System.out.printf("Vendor address: %s, confidence: %.2f%n",
        merchantAddress, vendorAddressField.getConfidence());
    }
  }

  DocumentField customerNameField = invoiceFields.get("CustomerName");
  if (customerNameField != null) {
    if (DocumentFieldType.STRING == customerNameField.getType()) {
      String merchantAddress = customerNameField.getValueAsString();
      System.out.printf("Customer Name: %s, confidence: %.2f%n",
        merchantAddress, customerNameField.getConfidence());
    }
  }

  DocumentField customerAddressRecipientField = invoiceFields.get("CustomerAddressRecipient");
  if (customerAddressRecipientField != null) {
    if (DocumentFieldType.STRING == customerAddressRecipientField.getType()) {
      String customerAddr = customerAddressRecipientField.getValueAsString();
      System.out.printf("Customer Address Recipient: %s, confidence: %.2f%n",
        customerAddr, customerAddressRecipientField.getConfidence());
    }
  }

  DocumentField invoiceIdField = invoiceFields.get("InvoiceId");
  if (invoiceIdField != null) {
    if (DocumentFieldType.STRING == invoiceIdField.getType()) {
      String invoiceId = invoiceIdField.getValueAsString();
      System.out.printf("Invoice ID: %s, confidence: %.2f%n",
        invoiceId, invoiceIdField.getConfidence());
    }
  }

  DocumentField invoiceDateField = invoiceFields.get("InvoiceDate");
  if (customerNameField != null) {
    if (DocumentFieldType.DATE == invoiceDateField.getType()) {
      LocalDate invoiceDate = invoiceDateField.getValueAsDate();
      System.out.printf("Invoice Date: %s, confidence: %.2f%n",
        invoiceDate, invoiceDateField.getConfidence());
    }
  }

  DocumentField invoiceTotalField = invoiceFields.get("InvoiceTotal");
  if (customerAddressRecipientField != null) {
    if (DocumentFieldType.DOUBLE == invoiceTotalField.getType()) {
      Double invoiceTotal = invoiceTotalField.getValueAsDouble();
      System.out.printf("Invoice Total: %.2f, confidence: %.2f%n",
        invoiceTotal, invoiceTotalField.getConfidence());
    }
  }

  DocumentField invoiceItemsField = invoiceFields.get("Items");
  if (invoiceItemsField != null) {
    System.out.printf("Invoice Items: %n");
    if (DocumentFieldType.LIST == invoiceItemsField.getType()) {
      List < DocumentField > invoiceItems = invoiceItemsField.getValueAsList();
      invoiceItems.stream()
        .filter(invoiceItem -> DocumentFieldType.MAP == invoiceItem.getType())
        .map(documentField -> documentField.getValueAsMap())
        .forEach(documentFieldMap -> documentFieldMap.forEach((key, documentField) -> {
          if ("Description".equals(key)) {
            if (DocumentFieldType.STRING == documentField.getType()) {
              String name = documentField.getValueAsString();
              System.out.printf("Description: %s, confidence: %.2fs%n",
                name, documentField.getConfidence());
            }
          }
          if ("Quantity".equals(key)) {
            if (DocumentFieldType.DOUBLE == documentField.getType()) {
              Double quantity = documentField.getValueAsDouble();
              System.out.printf("Quantity: %f, confidence: %.2f%n",
                quantity, documentField.getConfidence());
            }
          }
          if ("UnitPrice".equals(key)) {
            if (DocumentFieldType.DOUBLE == documentField.getType()) {
              Double unitPrice = documentField.getValueAsDouble();
              System.out.printf("Unit Price: %f, confidence: %.2f%n",
                unitPrice, documentField.getConfidence());
            }
          }
          if ("ProductCode".equals(key)) {
            if (DocumentFieldType.DOUBLE == documentField.getType()) {
              Double productCode = documentField.getValueAsDouble();
              System.out.printf("Product Code: %f, confidence: %.2f%n",
                productCode, documentField.getConfidence());
            }
          }
        }));
    }
  }
}
}
}
```

Visit the Azure samples repository on GitHub and view the [invoice model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/invoice-model-output.md).

## Use the Receipt-model

```java
import com.azure.ai.documentintelligence;

import com.azure.ai.documentintelligence.models.AnalyzeDocumentRequest;
import com.azure.ai.documentintelligence.models.AnalyzeResult;
import com.azure.ai.documentintelligence.models.AnalyzeResultOperation;
import com.azure.ai.documentintelligence.models.Document;
import com.azure.ai.documentintelligence.models.DocumentField;
import com.azure.ai.documentintelligence.models.DocumentFieldType;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class DocIntelligence {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentIntelligenceClient` instance and `AzureKeyCredential` variable
      DocumentIntelligenceClient client = new DocumentIntelligenceClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

String receiptUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png";
String modelId = "prebuilt-receipt";

SyncPoller < OperationResult, AnalyzeResult > analyzeReceiptPoller =
  client.beginAnalyzeDocument(modelId, receiptUrl);

AnalyzeResult receiptResults = analyzeReceiptPoller.getFinalResult().getAnalyzeResult();

for (int i = 0; i < receiptResults.getDocuments().size(); i++) {
  AnalyzedDocument analyzedReceipt = receiptResults.getDocuments().get(i);
  Map < String, DocumentField > receiptFields = analyzedReceipt.getFields();
  System.out.printf("----------- Analyzing receipt info %d -----------%n", i);
  DocumentField merchantNameField = receiptFields.get("MerchantName");
  if (merchantNameField != null) {
    if (DocumentFieldType.STRING == merchantNameField.getType()) {
      String merchantName = merchantNameField.getValueAsString();
      System.out.printf("Merchant Name: %s, confidence: %.2f%n",
        merchantName, merchantNameField.getConfidence());
    }
  }

  DocumentField merchantPhoneNumberField = receiptFields.get("MerchantPhoneNumber");
  if (merchantPhoneNumberField != null) {
    if (DocumentFieldType.PHONE_NUMBER == merchantPhoneNumberField.getType()) {
      String merchantAddress = merchantPhoneNumberField.getValueAsPhoneNumber();
      System.out.printf("Merchant Phone number: %s, confidence: %.2f%n",
        merchantAddress, merchantPhoneNumberField.getConfidence());
    }
  }

  DocumentField merchantAddressField = receiptFields.get("MerchantAddress");
  if (merchantAddressField != null) {
    if (DocumentFieldType.STRING == merchantAddressField.getType()) {
      String merchantAddress = merchantAddressField.getValueAsString();
      System.out.printf("Merchant Address: %s, confidence: %.2f%n",
        merchantAddress, merchantAddressField.getConfidence());
    }
  }

  DocumentField transactionDateField = receiptFields.get("TransactionDate");
  if (transactionDateField != null) {
    if (DocumentFieldType.DATE == transactionDateField.getType()) {
      LocalDate transactionDate = transactionDateField.getValueAsDate();
      System.out.printf("Transaction Date: %s, confidence: %.2f%n",
        transactionDate, transactionDateField.getConfidence());
    }
  }

  DocumentField receiptItemsField = receiptFields.get("Items");
  if (receiptItemsField != null) {
    System.out.printf("Receipt Items: %n");
    if (DocumentFieldType.LIST == receiptItemsField.getType()) {
      List < DocumentField > receiptItems = receiptItemsField.getValueAsList();
      receiptItems.stream()
        .filter(receiptItem -> DocumentFieldType.MAP == receiptItem.getType())
        .map(documentField -> documentField.getValueAsMap())
        .forEach(documentFieldMap -> documentFieldMap.forEach((key, documentField) -> {
          if ("Name".equals(key)) {
            if (DocumentFieldType.STRING == documentField.getType()) {
              String name = documentField.getValueAsString();
              System.out.printf("Name: %s, confidence: %.2fs%n",
                name, documentField.getConfidence());
            }
          }
          if ("Quantity".equals(key)) {
            if (DocumentFieldType.DOUBLE == documentField.getType()) {
              Double quantity = documentField.getValueAsDouble();
              System.out.printf("Quantity: %f, confidence: %.2f%n",
                quantity, documentField.getConfidence());
            }
          }
          if ("Price".equals(key)) {
            if (DocumentFieldType.DOUBLE == documentField.getType()) {
              Double price = documentField.getValueAsDouble();
              System.out.printf("Price: %f, confidence: %.2f%n",
                price, documentField.getConfidence());
            }
          }
          if ("TotalPrice".equals(key)) {
            if (DocumentFieldType.DOUBLE == documentField.getType()) {
              Double totalPrice = documentField.getValueAsDouble();
              System.out.printf("Total Price: %f, confidence: %.2f%n",
                totalPrice, documentField.getConfidence());
            }
          }
        }));
    }
  }
}
}
}
```

Visit the Azure samples repository on GitHub and view the [receipt model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/receipt-model-output.md).

## Use the ID document model

```java
import com.azure.ai.documentintelligence;

import com.azure.ai.documentintelligence.models.AnalyzeDocumentRequest;
import com.azure.ai.documentintelligence.models.AnalyzeResult;
import com.azure.ai.documentintelligence.models.AnalyzeResultOperation;
import com.azure.ai.documentintelligence.models.Document;
import com.azure.ai.documentintelligence.models.DocumentField;
import com.azure.ai.documentintelligence.models.DocumentFieldType;
import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class DocIntelligence {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentIntelligenceClient` instance and `AzureKeyCredential` variable
      DocumentIntelligenceClient client = new DocumentIntelligenceClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

//sample document
String licenseUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png";
String modelId = "prebuilt-idDocument";

SyncPoller < OperationResult, AnalyzeResult > analyzeIdentityDocumentPoller = client.beginAnalyzeDocument(modelId, licenseUrl);

AnalyzeResult identityDocumentResults = analyzeIdentityDocumentPoller.getFinalResult().getAnalyzeResult();

for (int i = 0; i < identityDocumentResults.getDocuments().size(); i++) {
  AnalyzedDocument analyzedIDDocument = identityDocumentResults.getDocuments().get(i);
  Map < String, DocumentField > licenseFields = analyzedIDDocument.getFields();
  System.out.printf("----------- Analyzed license info for page %d -----------%n", i);
  DocumentField addressField = licenseFields.get("Address");
  if (addressField != null) {
    if (DocumentFieldType.STRING == addressField.getType()) {
      String address = addressField.getValueAsString();
      System.out.printf("Address: %s, confidence: %.2f%n",
        address, addressField.getConfidence());
    }
  }

  DocumentField countryRegionDocumentField = licenseFields.get("CountryRegion");
  if (countryRegionDocumentField != null) {
    if (DocumentFieldType.STRING == countryRegionDocumentField.getType()) {
      String countryRegion = countryRegionDocumentField.getValueAsCountry();
      System.out.printf("Country or region: %s, confidence: %.2f%n",
        countryRegion, countryRegionDocumentField.getConfidence());
    }
  }

  DocumentField dateOfBirthField = licenseFields.get("DateOfBirth");
  if (dateOfBirthField != null) {
    if (DocumentFieldType.DATE == dateOfBirthField.getType()) {
      LocalDate dateOfBirth = dateOfBirthField.getValueAsDate();
      System.out.printf("Date of Birth: %s, confidence: %.2f%n",
        dateOfBirth, dateOfBirthField.getConfidence());
    }
  }

  DocumentField dateOfExpirationField = licenseFields.get("DateOfExpiration");
  if (dateOfExpirationField != null) {
    if (DocumentFieldType.DATE == dateOfExpirationField.getType()) {
      LocalDate expirationDate = dateOfExpirationField.getValueAsDate();
      System.out.printf("Document date of expiration: %s, confidence: %.2f%n",
        expirationDate, dateOfExpirationField.getConfidence());
    }
  }

  DocumentField documentNumberField = licenseFields.get("DocumentNumber");
  if (documentNumberField != null) {
    if (DocumentFieldType.STRING == documentNumberField.getType()) {
      String documentNumber = documentNumberField.getValueAsString();
      System.out.printf("Document number: %s, confidence: %.2f%n",
        documentNumber, documentNumberField.getConfidence());
    }
  }

  DocumentField firstNameField = licenseFields.get("FirstName");
  if (firstNameField != null) {
    if (DocumentFieldType.STRING == firstNameField.getType()) {
      String firstName = firstNameField.getValueAsString();
      System.out.printf("First Name: %s, confidence: %.2f%n",
        firstName, documentNumberField.getConfidence());
    }
  }

  DocumentField lastNameField = licenseFields.get("LastName");
  if (lastNameField != null) {
    if (DocumentFieldType.STRING == lastNameField.getType()) {
      String lastName = lastNameField.getValueAsString();
      System.out.printf("Last name: %s, confidence: %.2f%n",
        lastName, lastNameField.getConfidence());
    }
  }

  DocumentField regionField = licenseFields.get("Region");
  if (regionField != null) {
    if (DocumentFieldType.STRING == regionField.getType()) {
      String region = regionField.getValueAsString();
      System.out.printf("Region: %s, confidence: %.2f%n",
        region, regionField.getConfidence());
    }
  }
}
}
}
```

Visit the Azure samples repository on GitHub and view the [ID document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/id-document-output.md).



**Applies to: doc-intel-3.1.0 || doc-intel-3.0.0**

<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD034 -->

**Applies to: doc-intel-3.1.0**
[Client library](https://learn.microsoft.com/java/api/overview/azure/ai-formrecognizer-readme?view=azure-java-stable\&preserve-view=true) |[REST API reference](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP) | [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-ai-formrecognizer/4.1.0) | [Samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/formrecognizer/azure-ai-formrecognizer/src/samples#readme)| [Supported REST API versions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v3-1.md)


**Applies to: doc-intel-3.0.0**
[Client library](https://learn.microsoft.com/java/api/overview/azure/ai-formrecognizer-readme?view=azure-java-stable\&preserve-view=true) |[REST API reference](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-v3.0%20\(2022-08-31\)\&preserve-view=true\&tabs=HTTP) | [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-ai-formrecognizer/4.0.0) | [Samples](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/formrecognizer/azure-ai-formrecognizer/src/samples)|[Supported REST API versions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v3-0.md)


## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest version of [Visual Studio Code](https://code.visualstudio.com/) or your preferred IDE. See [Java in Visual Studio Code](https://code.visualstudio.com/docs/languages/java).

  - Visual Studio Code offers a *Coding Pack for Java* for Windows and macOS. The coding pack is a bundle of `VS Code`, the Java Development Kit (JDK), and a collection of suggested extensions by Microsoft. The Coding Pack can also be used to fix an existing development environment.
  - If you're using `VS Code` and the Coding Pack For Java, install the [**Gradle for Java**](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle) extension.

  If you aren't using Visual Studio Code, make sure you have the following installed in your development environment:

  - A [**Java Development Kit (JDK)**](https://learn.microsoft.com/java/openjdk/download#openjdk-17) version 8 or later. For more information, see [Microsoft Build of OpenJDK](https://www.microsoft.com/openjdk).
  - [**Gradle**](https://docs.gradle.org/current/userguide/installation.html), version 6.8 or later.

- A Foundry Tools or Document Intelligence resource. Create a <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource." target="_blank">single-service</a> or <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a multiple Document Intelligence resource." target="_blank">multi-service</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.

  > **Tip:**
  > Create a Foundry resource if you plan to access multiple Foundry Tools by using a single endpoint and key. For Document Intelligence access only, create a Document Intelligence resource. You need a single-service resource if you intend to use [Microsoft Entra authentication](https://learn.microsoft.com/azure/active-directory/authentication/overview-authentication).

- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

- A document file at a URL. For this project, you can use the sample forms provided in the following table for each feature:

  | Feature | modelID | document-url |
  | --- | --- | --- |
  | **Read model** | prebuilt-read | [Sample brochure](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png) |
  | **Layout model** | prebuilt-layout | [Sample booking confirmation](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png) |
  | **W-2 form model** | prebuilt-tax.us.w2 | [Sample W-2 form](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png) |
  | **Invoice model** | prebuilt-invoice | [Sample invoice](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf) |
  | **Receipt model** | prebuilt-receipt | [Sample receipt](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png) |
  | **ID document model** | prebuilt-idDocument | [Sample ID document](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png) |
  | **Business card model** | prebuilt-businessCard | [Sample business card](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/business-card-english.jpg) |


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

## Set your environment variables

To interact with the Document Intelligence service, you need to create an instance of the `DocumentAnalysisClient` class. To do so, instantiate the client with your `key` and `endpoint` from the Azure portal. For this project, use environment variables to store and access credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

To set the environment variable for your Document Intelligence resource key, open a console window, and follow the instructions for your operating system and development environment. Replace *\<yourKey>* and *\<yourEndpoint>* with the values from your resource in the Azure portal.

#### [Windows](#tab/windows)

Environment variables in Windows aren't case-sensitive. They're typically declared in uppercase, with words joined by an underscore. At a command prompt, run the following commands:

1. Set your key variable:

   ```console
   setx DI_KEY <yourKey>
   ```

1. Set your endpoint variable

   ```console
   setx DI_ENDPOINT <yourEndpoint>
   ```

1. Close the Command Prompt window after you set your environment variables. The values remain until you change them again.

1. Restart any running programs that read the environment variable. For example, if you're using Visual Studio or Visual Studio Code as your editor, restart before running the sample code.

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `setx VARIABLE_NAME=` | Delete the environment variable by setting the value to an empty string. | `setx DI_KEY=` |
| `setx VARIABLE_NAME=value` | Set or change the value of an environment variable. | `setx DI_KEY=<yourKey>` |
| `set VARIABLE_NAME` | Display the value of a specific environment variable. | `set  DI_KEY` |
| `set` | Display all environment variables. | `set` |

#### [macOS](#tab/macOS)

Environment variables in macOS are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session. Open your terminal and enter the following commands:

1. Set your key variable:

   ```bash
   export key=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export endpoint=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash  `~/.bash_profile` startup script:

  1. Use a text editor to open the *~/.bash_profile* file and add the following command to create a permanent environment variable:

     ```bash
     export DI_KEY=<yourKey> DI_ENDPOINT=<yourEndpoint>
     ```

     Example: `export DI_KEY="<yourKey>"`

  1. Save your changes to the *bash_profile* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bash-profile
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY=<yourKey>` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of a specific environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

#### [Linux](#tab/linux)

Environment variables in Linux are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session:

1. Set your key variable:

   ```bash
   export DI_KEY=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export DI_ENDPOINT=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash `~/.bashrc` startup script:

  1. Use a text editor to open the *~/.bashrc* file and add the following command to create a permanent environment variable:

     ```bash
     export <VARIABLE>=<value>
     ```

     Example: `export DI_KEY=<yourKey>`

  1. Save your changes to the *.bashrc* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bashrc
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY=` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY={yourKey}` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of an environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

---


## Set up your programming environment

To set up your programming environment, create a Gradle project and install the client library.

### Create a Gradle project

1. In a console window, create a directory for your app called *form-recognizer-app* and navigate to it.

   ```console
   mkdir form-recognizer-app
   cd form-recognizer-app
   ```

1. Run the `gradle init` command from your working directory. This command creates essential build files for Gradle, including *build.gradle.kts*, which is used at runtime to create and configure your application.

    ```console
    gradle init --type basic
    ```

1. When prompted to choose a **DSL**, select *Kotlin*.

1. Select **Enter** to accept the default project name, *form-recognizer-app*.

### Install the client library

This article uses the Gradle dependency manager. You can find the client library and information for other dependency managers on the [Maven Central Repository](https://mvnrepository.com/artifact/com.azure/azure-ai-formrecognizer).

1. Open the project's *build.gradle.kts* file in your IDE. Copy and paste the following code to include the client library as an `implementation` statement, along with the required plugins and settings.

    ```kotlin
    plugins {
        java
        application
    }
    application {
        mainClass.set("FormRecognizer")
    }
    repositories {
        mavenCentral()
    }
    dependencies {
        implementation(group = "com.azure", name = "azure-ai-formrecognizer", version = "4.0.0")
    }
    ```

## Create a Java application

To interact with the Document Intelligence service, create an instance of the `DocumentAnalysisClient` class. To do so, you create an `AzureKeyCredential` with your `key` from the Azure portal and a `DocumentAnalysisClient` instance with the `AzureKeyCredential` and your Document Intelligence `endpoint`.

1. From the *form-recognizer-app* directory, run the following command:

   ```console
   mkdir -p src/main/java
   ```

   You create the following directory structure:

   Screenshot of Java directory structure

1. Navigate to the `java` directory and create a file named *FormRecognizer.java*.

   > **Tip:**
   >
   > You can create a new file by using PowerShell. Open a PowerShell window in your project directory by holding down the **Shift** key and right-clicking the folder, then type the following command: *New-Item FormRecognizer.java*.

1. Open the *FormRecognizer.java* file and select one of the following code samples and copy/paste into your application:

   - The [prebuilt-read](#use-the-read-model) model is at the core of all Document Intelligence models and can detect lines, words, locations, and languages. The layout, general document, prebuilt, and custom models all use the `read` model as a foundation for extracting texts from documents.
   - The [prebuilt-layout](#use-the-layout-model) model extracts text and text locations, tables, selection marks, and structure information from documents and images.
   - The [prebuilt-tax.us.w2](#use-the-w-2-tax-model) model extracts information reported on US Internal Revenue Service (IRS) tax forms.
   - The [prebuilt-invoice](#use-the-invoice-model) model extracts key fields and line items from sales invoices in various formats.
   - The [prebuilt-receipt](#use-the-receipt-model) model extracts key information from printed and handwritten sales receipts.
   - The [prebuilt-idDocument](#use-the-id-document-model) model extracts key information from US Drivers Licenses; international passport biographical pages; US state IDs; social security cards; and permanent resident cards.

1. Type the following commands:

   ```console
   gradle build
   gradle -PmainClass=FormRecognizer run
   ```

## Use the Read model

```java
import com.azure.ai.formrecognizer.*;

import com.azure.ai.formrecognizer.documentanalysis.models.*;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClient;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClientBuilder;

import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.util.List;
import java.util.Arrays;
import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Collectors;

public class FormRecognizer {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
      DocumentAnalysisClient client = new DocumentAnalysisClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

//sample document
String documentUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png";

String modelId = "prebuilt-read";

SyncPoller < OperationResult, AnalyzeResult > analyzeLayoutResultPoller =
  client.beginAnalyzeDocumentFromUrl(modelId, documentUrl);

AnalyzeResult analyzeLayoutResult = analyzeLayoutResultPoller.getFinalResult();

// pages
analyzeLayoutResult.getPages().forEach(documentPage -> {
  System.out.printf("Page has width: %.2f and height: %.2f, measured with unit: %s%n",
    documentPage.getWidth(),
    documentPage.getHeight(),
    documentPage.getUnit());

  // lines
  documentPage.getLines().forEach(documentLine ->
    System.out.printf("Line %s is within a bounding polygon %s.%n",
      documentLine.getContent(),
      documentLine.getBoundingPolygon().toString()));

  // words
  documentPage.getWords().forEach(documentWord ->
    System.out.printf("Word '%s' has a confidence score of %.2f.%n",
      documentWord.getContent(),
      documentWord.getConfidence()));
});
}
}
```

Visit the Azure samples repository on GitHub and view the [`read` model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/read-model-output.md).

## Use the Layout model

```java
import com.azure.ai.formrecognizer.*;

import com.azure.ai.formrecognizer.documentanalysis.models.*;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClient;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClientBuilder;

import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.util.List;
import java.util.Arrays;
import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Collectors;

public class FormRecognizer {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
      DocumentAnalysisClient client = new DocumentAnalysisClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

//sample document
String layoutDocumentUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png";
String modelId = "prebuilt-layout";

SyncPoller < OperationResult, AnalyzeResult > analyzeLayoutResultPoller =
  client.beginAnalyzeDocumentFromUrl(modelId, layoutDocumentUrl);

AnalyzeResult analyzeLayoutResult = analyzeLayoutResultPoller.getFinalResult();

// pages
analyzeLayoutResult.getPages().forEach(documentPage -> {
  System.out.printf("Page has width: %.2f and height: %.2f, measured with unit: %s%n",
    documentPage.getWidth(),
    documentPage.getHeight(),
    documentPage.getUnit());

  // lines
  documentPage.getLines().forEach(documentLine ->
    System.out.printf("Line %s is within a bounding polygon %s.%n",
      documentLine.getContent(),
      documentLine.getBoundingPolygon().toString()));

  // words
  documentPage.getWords().forEach(documentWord ->
    System.out.printf("Word '%s' has a confidence score of %.2f%n",
      documentWord.getContent(),
      documentWord.getConfidence()));

  // selection marks
  documentPage.getSelectionMarks().forEach(documentSelectionMark ->
    System.out.printf("Selection mark is '%s' and is within a bounding polygon %s with confidence %.2f.%n",
      documentSelectionMark.getSelectionMarkState().toString(),
      getBoundingCoordinates(documentSelectionMark.getBoundingPolygon()),
      documentSelectionMark.getConfidence()));
});

// tables
List < DocumentTable > tables = analyzeLayoutResult.getTables();
for (int i = 0; i < tables.size(); i++) {
  DocumentTable documentTables = tables.get(i);
  System.out.printf("Table %d has %d rows and %d columns.%n", i, documentTables.getRowCount(),
    documentTables.getColumnCount());
  documentTables.getCells().forEach(documentTableCell -> {
    System.out.printf("Cell '%s', has row index %d and column index %d.%n", documentTableCell.getContent(),
      documentTableCell.getRowIndex(), documentTableCell.getColumnIndex());
  });
  System.out.println();
}

}

// Utility function to get the bounding polygon coordinates.
private static String getBoundingCoordinates(List < Point > boundingPolygon) {
  return boundingPolygon.stream().map(point -> String.format("[%.2f, %.2f]", point.getX(),
    point.getY())).collect(Collectors.joining(", "));
}

}
```

Visit the Azure samples repository on GitHub and view the [layout model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/layout-model-output.md).

## Use the General document model

```java
import com.azure.ai.formrecognizer.*;

import com.azure.ai.formrecognizer.documentanalysis.models.*;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClient;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClientBuilder;

import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.util.List;
import java.util.Arrays;
import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Collectors;

public class FormRecognizer {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
      DocumentAnalysisClient client = new DocumentAnalysisClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

//sample document
String generalDocumentUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf";
String modelId = "prebuilt-document";
SyncPoller < OperationResult, AnalyzeResult > analyzeDocumentPoller =
  client.beginAnalyzeDocumentFromUrl(modelId, generalDocumentUrl);

AnalyzeResult analyzeResult = analyzeDocumentPoller.getFinalResult();

// pages
analyzeResult.getPages().forEach(documentPage -> {
  System.out.printf("Page has width: %.2f and height: %.2f, measured with unit: %s%n",
    documentPage.getWidth(),
    documentPage.getHeight(),
    documentPage.getUnit());

  // lines
  documentPage.getLines().forEach(documentLine ->
    System.out.printf("Line %s is within a bounding polygon %s.%n",
      documentLine.getContent(),
      documentLine.getBoundingPolygon().toString()));

  // words
  documentPage.getWords().forEach(documentWord ->
    System.out.printf("Word %s has a confidence score of %.2f%n.",
      documentWord.getContent(),
      documentWord.getConfidence()));
});

// tables
List < DocumentTable > tab_les = analyzeResult.getTables();
for (int i = 0; i < tab_les.size(); i++) {
  DocumentTable documentTable = tab_les.get(i);
  System.out.printf("Table %d has %d rows and %d columns.%n", i, documentTable.getRowCount(),
    documentTable.getColumnCount());
  documentTable.getCells().forEach(documentTableCell -> {
    System.out.printf("Cell '%s', has row index %d and column index %d.%n",
      documentTableCell.getContent(),
      documentTableCell.getRowIndex(), documentTableCell.getColumnIndex());
  });
  System.out.println();
}

// Key-value pairs
analyzeResult.getKeyValuePairs().forEach(documentKeyValuePair -> {
  System.out.printf("Key content: %s%n", documentKeyValuePair.getKey().getContent());
  System.out.printf("Key content bounding region: %s%n",
    documentKeyValuePair.getKey().getBoundingRegions().toString());

  if (documentKeyValuePair.getValue() != null) {
    System.out.printf("Value content: %s%n", documentKeyValuePair.getValue().getContent());
    System.out.printf("Value content bounding region: %s%n", documentKeyValuePair.getValue().getBoundingRegions().toString());
  }
});

}

}
```

Visit the Azure samples repository on GitHub and view the [general document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/general-document-model-output.md).

## Use the W-2 tax model

```java
import com.azure.ai.formrecognizer.*;

import com.azure.ai.formrecognizer.documentanalysis.models.*;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClient;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClientBuilder;

import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.util.List;
import java.util.Arrays;
import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Collectors;

public class FormRecognizer {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
      DocumentAnalysisClient client = new DocumentAnalysisClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

// sample document
String w2Url = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png";
String modelId = "prebuilt-tax.us.w2";

SyncPoller < OperationResult, AnalyzeResult > analyzeW2Poller =
  client.beginAnalyzeDocumentFromUrl(modelId, w2Url);

AnalyzeResult analyzeTaxResult = analyzeW2Poller.getFinalResult();

for (int i = 0; i < analyzeTaxResult.getDocuments().size(); i++) {
  AnalyzedDocument analyzedTaxDocument = analyzeTaxResult.getDocuments().get(i);
  Map < String, DocumentField > taxFields = analyzedTaxDocument.getFields();
  System.out.printf("----------- Analyzing Document  %d -----------%n", i);
  DocumentField w2FormVariantField = taxFields.get("W2FormVariant");
  if (w2FormVariantField != null) {
    if (DocumentFieldType.STRING == w2FormVariantField.getType()) {
      String merchantName = w2FormVariantField.getValueAsString();
      System.out.printf("Form variant: %s, confidence: %.2f%n",
        merchantName, w2FormVariantField.getConfidence());
    }
  }

  DocumentField employeeField = taxFields.get("Employee");
  if (employeeField != null) {
    System.out.println("Employee Data: ");
    if (DocumentFieldType.MAP == employeeField.getType()) {
      Map < String, DocumentField > employeeDataFieldMap = employeeField.getValueAsMap();
      DocumentField employeeName = employeeDataFieldMap.get("Name");
      if (employeeName != null) {
        if (DocumentFieldType.STRING == employeeName.getType()) {
          String employeesName = employeeName.getValueAsString();
          System.out.printf("Employee Name: %s, confidence: %.2f%n",
            employeesName, employeeName.getConfidence());
        }
      }
      DocumentField employeeAddrField = employeeDataFieldMap.get("Address");
      if (employeeAddrField != null) {
        if (DocumentFieldType.STRING == employeeAddrField.getType()) {
          String employeeAddress = employeeAddrField.getValueAsString();
          System.out.printf("Employee Address: %s, confidence: %.2f%n",
            employeeAddress, employeeAddrField.getConfidence());
        }
      }
    }
  }

  DocumentField employerField = taxFields.get("Employer");
  if (employerField != null) {
    System.out.println("Employer Data: ");
    if (DocumentFieldType.MAP == employerField.getType()) {
      Map < String, DocumentField > employerDataFieldMap = employerField.getValueAsMap();
      DocumentField employerNameField = employerDataFieldMap.get("Name");
      if (employerNameField != null) {
        if (DocumentFieldType.STRING == employerNameField.getType()) {
          String employerName = employerNameField.getValueAsString();
          System.out.printf("Employer Name: %s, confidence: %.2f%n",
            employerName, employerNameField.getConfidence());
        }
      }

      DocumentField employerIDNumberField = employerDataFieldMap.get("IdNumber");
      if (employerIDNumberField != null) {
        if (DocumentFieldType.STRING == employerIDNumberField.getType()) {
          String employerIdNumber = employerIDNumberField.getValueAsString();
          System.out.printf("Employee ID Number: %s, confidence: %.2f%n",
            employerIdNumber, employerIDNumberField.getConfidence());
        }
      }
    }
  }

  DocumentField taxYearField = taxFields.get("TaxYear");
  if (taxYearField != null) {
    if (DocumentFieldType.STRING == taxYearField.getType()) {
      String taxYear = taxYearField.getValueAsString();
      System.out.printf("Tax year: %s, confidence: %.2f%n",
        taxYear, taxYearField.getConfidence());
    }
  }

  DocumentField taxDateField = taxFields.get("TaxDate");
  if (taxDateField != null) {
    if (DocumentFieldType.DATE == taxDateField.getType()) {
      LocalDate taxDate = taxDateField.getValueAsDate();
      System.out.printf("Tax Date: %s, confidence: %.2f%n",
        taxDate, taxDateField.getConfidence());
    }
  }

  DocumentField socialSecurityTaxField = taxFields.get("SocialSecurityTaxWithheld");
  if (socialSecurityTaxField != null) {
    if (DocumentFieldType.DOUBLE == socialSecurityTaxField.getType()) {
      Double socialSecurityTax = socialSecurityTaxField.getValueAsDouble();
      System.out.printf("Social Security Tax withheld: %.2f, confidence: %.2f%n",
        socialSecurityTax, socialSecurityTaxField.getConfidence());
    }
  }
}
}
}
```

Visit the Azure samples repository on GitHub and view the [W-2 tax model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/w2-tax-model-output.md).

## Use the Invoice model

```java
import com.azure.ai.formrecognizer.*;

import com.azure.ai.formrecognizer.documentanalysis.models.*;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClient;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClientBuilder;

import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.util.List;
import java.util.Arrays;
import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Collectors;

public class FormRecognizer {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
      DocumentAnalysisClient client = new DocumentAnalysisClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

// sample document
String invoiceUrl = "https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf";
String modelId = "prebuilt-invoice";

SyncPoller < OperationResult, AnalyzeResult > analyzeInvoicesPoller =
  client.beginAnalyzeDocumentFromUrl(modelId, invoiceUrl);

AnalyzeResult analyzeInvoiceResult = analyzeInvoicesPoller.getFinalResult();

for (int i = 0; i < analyzeInvoiceResult.getDocuments().size(); i++) {
  AnalyzedDocument analyzedInvoice = analyzeInvoiceResult.getDocuments().get(i);
  Map < String, DocumentField > invoiceFields = analyzedInvoice.getFields();
  System.out.printf("----------- Analyzing invoice  %d -----------%n", i);
  DocumentField vendorNameField = invoiceFields.get("VendorName");
  if (vendorNameField != null) {
    if (DocumentFieldType.STRING == vendorNameField.getType()) {
      String merchantName = vendorNameField.getValueAsString();
      System.out.printf("Vendor Name: %s, confidence: %.2f%n",
        merchantName, vendorNameField.getConfidence());
    }
  }

  DocumentField vendorAddressField = invoiceFields.get("VendorAddress");
  if (vendorAddressField != null) {
    if (DocumentFieldType.STRING == vendorAddressField.getType()) {
      String merchantAddress = vendorAddressField.getValueAsString();
      System.out.printf("Vendor address: %s, confidence: %.2f%n",
        merchantAddress, vendorAddressField.getConfidence());
    }
  }

  DocumentField customerNameField = invoiceFields.get("CustomerName");
  if (customerNameField != null) {
    if (DocumentFieldType.STRING == customerNameField.getType()) {
      String merchantAddress = customerNameField.getValueAsString();
      System.out.printf("Customer Name: %s, confidence: %.2f%n",
        merchantAddress, customerNameField.getConfidence());
    }
  }

  DocumentField customerAddressRecipientField = invoiceFields.get("CustomerAddressRecipient");
  if (customerAddressRecipientField != null) {
    if (DocumentFieldType.STRING == customerAddressRecipientField.getType()) {
      String customerAddr = customerAddressRecipientField.getValueAsString();
      System.out.printf("Customer Address Recipient: %s, confidence: %.2f%n",
        customerAddr, customerAddressRecipientField.getConfidence());
    }
  }

  DocumentField invoiceIdField = invoiceFields.get("InvoiceId");
  if (invoiceIdField != null) {
    if (DocumentFieldType.STRING == invoiceIdField.getType()) {
      String invoiceId = invoiceIdField.getValueAsString();
      System.out.printf("Invoice ID: %s, confidence: %.2f%n",
        invoiceId, invoiceIdField.getConfidence());
    }
  }

  DocumentField invoiceDateField = invoiceFields.get("InvoiceDate");
  if (customerNameField != null) {
    if (DocumentFieldType.DATE == invoiceDateField.getType()) {
      LocalDate invoiceDate = invoiceDateField.getValueAsDate();
      System.out.printf("Invoice Date: %s, confidence: %.2f%n",
        invoiceDate, invoiceDateField.getConfidence());
    }
  }

  DocumentField invoiceTotalField = invoiceFields.get("InvoiceTotal");
  if (customerAddressRecipientField != null) {
    if (DocumentFieldType.DOUBLE == invoiceTotalField.getType()) {
      Double invoiceTotal = invoiceTotalField.getValueAsDouble();
      System.out.printf("Invoice Total: %.2f, confidence: %.2f%n",
        invoiceTotal, invoiceTotalField.getConfidence());
    }
  }

  DocumentField invoiceItemsField = invoiceFields.get("Items");
  if (invoiceItemsField != null) {
    System.out.printf("Invoice Items: %n");
    if (DocumentFieldType.LIST == invoiceItemsField.getType()) {
      List < DocumentField > invoiceItems = invoiceItemsField.getValueAsList();
      invoiceItems.stream()
        .filter(invoiceItem -> DocumentFieldType.MAP == invoiceItem.getType())
        .map(documentField -> documentField.getValueAsMap())
        .forEach(documentFieldMap -> documentFieldMap.forEach((key, documentField) -> {
          if ("Description".equals(key)) {
            if (DocumentFieldType.STRING == documentField.getType()) {
              String name = documentField.getValueAsString();
              System.out.printf("Description: %s, confidence: %.2fs%n",
                name, documentField.getConfidence());
            }
          }
          if ("Quantity".equals(key)) {
            if (DocumentFieldType.DOUBLE == documentField.getType()) {
              Double quantity = documentField.getValueAsDouble();
              System.out.printf("Quantity: %f, confidence: %.2f%n",
                quantity, documentField.getConfidence());
            }
          }
          if ("UnitPrice".equals(key)) {
            if (DocumentFieldType.DOUBLE == documentField.getType()) {
              Double unitPrice = documentField.getValueAsDouble();
              System.out.printf("Unit Price: %f, confidence: %.2f%n",
                unitPrice, documentField.getConfidence());
            }
          }
          if ("ProductCode".equals(key)) {
            if (DocumentFieldType.DOUBLE == documentField.getType()) {
              Double productCode = documentField.getValueAsDouble();
              System.out.printf("Product Code: %f, confidence: %.2f%n",
                productCode, documentField.getConfidence());
            }
          }
        }));
    }
  }
}
}
}
```

Visit the Azure samples repository on GitHub and view the [invoice model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/invoice-model-output.md).

## Use the Receipt-model

```java
import com.azure.ai.formrecognizer.*;

import com.azure.ai.formrecognizer.documentanalysis.models.*;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClient;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClientBuilder;

import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.util.List;
import java.util.Arrays;
import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Collectors;

public class FormRecognizer {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
      DocumentAnalysisClient client = new DocumentAnalysisClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

String receiptUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png";
String modelId = "prebuilt-receipt";

SyncPoller < OperationResult, AnalyzeResult > analyzeReceiptPoller =
  client.beginAnalyzeDocumentFromUrl(modelId, receiptUrl);

AnalyzeResult receiptResults = analyzeReceiptPoller.getFinalResult();

for (int i = 0; i < receiptResults.getDocuments().size(); i++) {
  AnalyzedDocument analyzedReceipt = receiptResults.getDocuments().get(i);
  Map < String, DocumentField > receiptFields = analyzedReceipt.getFields();
  System.out.printf("----------- Analyzing receipt info %d -----------%n", i);
  DocumentField merchantNameField = receiptFields.get("MerchantName");
  if (merchantNameField != null) {
    if (DocumentFieldType.STRING == merchantNameField.getType()) {
      String merchantName = merchantNameField.getValueAsString();
      System.out.printf("Merchant Name: %s, confidence: %.2f%n",
        merchantName, merchantNameField.getConfidence());
    }
  }

  DocumentField merchantPhoneNumberField = receiptFields.get("MerchantPhoneNumber");
  if (merchantPhoneNumberField != null) {
    if (DocumentFieldType.PHONE_NUMBER == merchantPhoneNumberField.getType()) {
      String merchantAddress = merchantPhoneNumberField.getValueAsPhoneNumber();
      System.out.printf("Merchant Phone number: %s, confidence: %.2f%n",
        merchantAddress, merchantPhoneNumberField.getConfidence());
    }
  }

  DocumentField merchantAddressField = receiptFields.get("MerchantAddress");
  if (merchantAddressField != null) {
    if (DocumentFieldType.STRING == merchantAddressField.getType()) {
      String merchantAddress = merchantAddressField.getValueAsString();
      System.out.printf("Merchant Address: %s, confidence: %.2f%n",
        merchantAddress, merchantAddressField.getConfidence());
    }
  }

  DocumentField transactionDateField = receiptFields.get("TransactionDate");
  if (transactionDateField != null) {
    if (DocumentFieldType.DATE == transactionDateField.getType()) {
      LocalDate transactionDate = transactionDateField.getValueAsDate();
      System.out.printf("Transaction Date: %s, confidence: %.2f%n",
        transactionDate, transactionDateField.getConfidence());
    }
  }

  DocumentField receiptItemsField = receiptFields.get("Items");
  if (receiptItemsField != null) {
    System.out.printf("Receipt Items: %n");
    if (DocumentFieldType.LIST == receiptItemsField.getType()) {
      List < DocumentField > receiptItems = receiptItemsField.getValueAsList();
      receiptItems.stream()
        .filter(receiptItem -> DocumentFieldType.MAP == receiptItem.getType())
        .map(documentField -> documentField.getValueAsMap())
        .forEach(documentFieldMap -> documentFieldMap.forEach((key, documentField) -> {
          if ("Name".equals(key)) {
            if (DocumentFieldType.STRING == documentField.getType()) {
              String name = documentField.getValueAsString();
              System.out.printf("Name: %s, confidence: %.2fs%n",
                name, documentField.getConfidence());
            }
          }
          if ("Quantity".equals(key)) {
            if (DocumentFieldType.DOUBLE == documentField.getType()) {
              Double quantity = documentField.getValueAsDouble();
              System.out.printf("Quantity: %f, confidence: %.2f%n",
                quantity, documentField.getConfidence());
            }
          }
          if ("Price".equals(key)) {
            if (DocumentFieldType.DOUBLE == documentField.getType()) {
              Double price = documentField.getValueAsDouble();
              System.out.printf("Price: %f, confidence: %.2f%n",
                price, documentField.getConfidence());
            }
          }
          if ("TotalPrice".equals(key)) {
            if (DocumentFieldType.DOUBLE == documentField.getType()) {
              Double totalPrice = documentField.getValueAsDouble();
              System.out.printf("Total Price: %f, confidence: %.2f%n",
                totalPrice, documentField.getConfidence());
            }
          }
        }));
    }
  }
}
}
}
```

Visit the Azure samples repository on GitHub and view the [receipt model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/receipt-model-output.md).

## Use the ID document model

```java
import com.azure.ai.formrecognizer.*;

import com.azure.ai.formrecognizer.documentanalysis.models.*;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClient;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClientBuilder;

import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.util.List;
import java.util.Arrays;
import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Collectors;

public class FormRecognizer {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
      DocumentAnalysisClient client = new DocumentAnalysisClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

//sample document
String licenseUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png";
String modelId = "prebuilt-idDocument";

SyncPoller < OperationResult, AnalyzeResult > analyzeIdentityDocumentPoller = client.beginAnalyzeDocumentFromUrl(modelId, licenseUrl);

AnalyzeResult identityDocumentResults = analyzeIdentityDocumentPoller.getFinalResult();

for (int i = 0; i < identityDocumentResults.getDocuments().size(); i++) {
  AnalyzedDocument analyzedIDDocument = identityDocumentResults.getDocuments().get(i);
  Map < String, DocumentField > licenseFields = analyzedIDDocument.getFields();
  System.out.printf("----------- Analyzed license info for page %d -----------%n", i);
  DocumentField addressField = licenseFields.get("Address");
  if (addressField != null) {
    if (DocumentFieldType.STRING == addressField.getType()) {
      String address = addressField.getValueAsString();
      System.out.printf("Address: %s, confidence: %.2f%n",
        address, addressField.getConfidence());
    }
  }

  DocumentField countryRegionDocumentField = licenseFields.get("CountryRegion");
  if (countryRegionDocumentField != null) {
    if (DocumentFieldType.STRING == countryRegionDocumentField.getType()) {
      String countryRegion = countryRegionDocumentField.getValueAsCountry();
      System.out.printf("Country or region: %s, confidence: %.2f%n",
        countryRegion, countryRegionDocumentField.getConfidence());
    }
  }

  DocumentField dateOfBirthField = licenseFields.get("DateOfBirth");
  if (dateOfBirthField != null) {
    if (DocumentFieldType.DATE == dateOfBirthField.getType()) {
      LocalDate dateOfBirth = dateOfBirthField.getValueAsDate();
      System.out.printf("Date of Birth: %s, confidence: %.2f%n",
        dateOfBirth, dateOfBirthField.getConfidence());
    }
  }

  DocumentField dateOfExpirationField = licenseFields.get("DateOfExpiration");
  if (dateOfExpirationField != null) {
    if (DocumentFieldType.DATE == dateOfExpirationField.getType()) {
      LocalDate expirationDate = dateOfExpirationField.getValueAsDate();
      System.out.printf("Document date of expiration: %s, confidence: %.2f%n",
        expirationDate, dateOfExpirationField.getConfidence());
    }
  }

  DocumentField documentNumberField = licenseFields.get("DocumentNumber");
  if (documentNumberField != null) {
    if (DocumentFieldType.STRING == documentNumberField.getType()) {
      String documentNumber = documentNumberField.getValueAsString();
      System.out.printf("Document number: %s, confidence: %.2f%n",
        documentNumber, documentNumberField.getConfidence());
    }
  }

  DocumentField firstNameField = licenseFields.get("FirstName");
  if (firstNameField != null) {
    if (DocumentFieldType.STRING == firstNameField.getType()) {
      String firstName = firstNameField.getValueAsString();
      System.out.printf("First Name: %s, confidence: %.2f%n",
        firstName, documentNumberField.getConfidence());
    }
  }

  DocumentField lastNameField = licenseFields.get("LastName");
  if (lastNameField != null) {
    if (DocumentFieldType.STRING == lastNameField.getType()) {
      String lastName = lastNameField.getValueAsString();
      System.out.printf("Last name: %s, confidence: %.2f%n",
        lastName, lastNameField.getConfidence());
    }
  }

  DocumentField regionField = licenseFields.get("Region");
  if (regionField != null) {
    if (DocumentFieldType.STRING == regionField.getType()) {
      String region = regionField.getValueAsString();
      System.out.printf("Region: %s, confidence: %.2f%n",
        region, regionField.getConfidence());
    }
  }
}
}
}
```

Visit the Azure samples repository on GitHub and view the [ID document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/id-document-output.md).

## Use the Business card model

```java
import com.azure.ai.formrecognizer.*;

import com.azure.ai.formrecognizer.documentanalysis.models.*;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClient;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClientBuilder;

import com.azure.core.credential.AzureKeyCredential;
import com.azure.core.util.polling.SyncPoller;

import java.io.IOException;
import java.util.List;
import java.util.Arrays;
import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Collectors;

public class FormRecognizer {
  //use your `key` and `endpoint` environment variables
  private static final String key = System.getenv("FR_KEY");
  private static final String endpoint = System.getenv("FR_ENDPOINT");

  public static void main(final String[] args) {

      // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
      DocumentAnalysisClient client = new DocumentAnalysisClientBuilder()
        .credential(new AzureKeyCredential(key))
        .endpoint(endpoint)
        .buildClient();

//sample document
String businessCardUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/de5e0d8982ab754823c54de47a47e8e499351523/curl/form-recognizer/rest-api/business_card.jpg";
String modelId = "prebuilt-businessCard";

SyncPoller < OperationResult, AnalyzeResult > analyzeBusinessCardPoller = client.beginAnalyzeDocumentFromUrl(modelId, businessCardUrl);

AnalyzeResult businessCardPageResults = analyzeBusinessCardPoller.getFinalResult();

for (int i = 0; i < businessCardPageResults.getDocuments().size(); i++) {
  System.out.printf("--------Analyzing business card %d -----------%n", i);
  AnalyzedDocument analyzedBusinessCard = businessCardPageResults.getDocuments().get(i);
  Map < String, DocumentField > businessCardFields = analyzedBusinessCard.getFields();
  DocumentField contactNamesDocumentField = businessCardFields.get("ContactNames");
  if (contactNamesDocumentField != null) {
    if (DocumentFieldType.LIST == contactNamesDocumentField.getType()) {
      List < DocumentField > contactNamesList = contactNamesDocumentField.getValueAsList();
      contactNamesList.stream()
        .filter(contactName -> DocumentFieldType.MAP == contactName.getType())
        .map(contactName -> {
          System.out.printf("Contact name: %s%n", contactName.getContent());
          return contactName.getValueAsMap();
        })
        .forEach(contactNamesMap -> contactNamesMap.forEach((key, contactName) -> {
          if ("FirstName".equals(key)) {
            if (DocumentFieldType.STRING == contactName.getType()) {
              String firstName = contactName.getValueAsString();
              System.out.printf("\tFirst Name: %s, confidence: %.2f%n",
                firstName, contactName.getConfidence());
            }
          }
          if ("LastName".equals(key)) {
            if (DocumentFieldType.STRING == contactName.getType()) {
              String lastName = contactName.getValueAsString();
              System.out.printf("\tLast Name: %s, confidence: %.2f%n",
                lastName, contactName.getConfidence());
            }
          }
        }));
    }
  }

  DocumentField jobTitles = businessCardFields.get("JobTitles");
  if (jobTitles != null) {
    if (DocumentFieldType.LIST == jobTitles.getType()) {
      List < DocumentField > jobTitlesItems = jobTitles.getValueAsList();
      jobTitlesItems.forEach(jobTitlesItem -> {
        if (DocumentFieldType.STRING == jobTitlesItem.getType()) {
          String jobTitle = jobTitlesItem.getValueAsString();
          System.out.printf("Job Title: %s, confidence: %.2f%n",
            jobTitle, jobTitlesItem.getConfidence());
        }
      });
    }
  }

  DocumentField departments = businessCardFields.get("Departments");
  if (departments != null) {
    if (DocumentFieldType.LIST == departments.getType()) {
      List < DocumentField > departmentsItems = departments.getValueAsList();
      departmentsItems.forEach(departmentsItem -> {
        if (DocumentFieldType.STRING == departmentsItem.getType()) {
          String department = departmentsItem.getValueAsString();
          System.out.printf("Department: %s, confidence: %.2f%n",
            department, departmentsItem.getConfidence());
        }
      });
    }
  }

  DocumentField emails = businessCardFields.get("Emails");
  if (emails != null) {
    if (DocumentFieldType.LIST == emails.getType()) {
      List < DocumentField > emailsItems = emails.getValueAsList();
      emailsItems.forEach(emailsItem -> {
        if (DocumentFieldType.STRING == emailsItem.getType()) {
          String email = emailsItem.getValueAsString();
          System.out.printf("Email: %s, confidence: %.2f%n", email, emailsItem.getConfidence());
        }
      });
    }
  }

  DocumentField websites = businessCardFields.get("Websites");
  if (websites != null) {
    if (DocumentFieldType.LIST == websites.getType()) {
      List < DocumentField > websitesItems = websites.getValueAsList();
      websitesItems.forEach(websitesItem -> {
        if (DocumentFieldType.STRING == websitesItem.getType()) {
          String website = websitesItem.getValueAsString();
          System.out.printf("Web site: %s, confidence: %.2f%n",
            website, websitesItem.getConfidence());
        }
      });
    }
  }

  DocumentField mobilePhones = businessCardFields.get("MobilePhones");
  if (mobilePhones != null) {
    if (DocumentFieldType.LIST == mobilePhones.getType()) {
      List < DocumentField > mobilePhonesItems = mobilePhones.getValueAsList();
      mobilePhonesItems.forEach(mobilePhonesItem -> {
        if (DocumentFieldType.PHONE_NUMBER == mobilePhonesItem.getType()) {
          String mobilePhoneNumber = mobilePhonesItem.getValueAsPhoneNumber();
          System.out.printf("Mobile phone number: %s, confidence: %.2f%n",
            mobilePhoneNumber, mobilePhonesItem.getConfidence());
        }
      });
    }
  }

  DocumentField otherPhones = businessCardFields.get("OtherPhones");
  if (otherPhones != null) {
    if (DocumentFieldType.LIST == otherPhones.getType()) {
      List < DocumentField > otherPhonesItems = otherPhones.getValueAsList();
      otherPhonesItems.forEach(otherPhonesItem -> {
        if (DocumentFieldType.PHONE_NUMBER == otherPhonesItem.getType()) {
          String otherPhoneNumber = otherPhonesItem.getValueAsPhoneNumber();
          System.out.printf("Other phone number: %s, confidence: %.2f%n",
            otherPhoneNumber, otherPhonesItem.getConfidence());
        }
      });
    }
  }

  DocumentField faxes = businessCardFields.get("Faxes");
  if (faxes != null) {
    if (DocumentFieldType.LIST == faxes.getType()) {
      List < DocumentField > faxesItems = faxes.getValueAsList();
      faxesItems.forEach(faxesItem -> {
        if (DocumentFieldType.PHONE_NUMBER == faxesItem.getType()) {
          String faxPhoneNumber = faxesItem.getValueAsPhoneNumber();
          System.out.printf("Fax phone number: %s, confidence: %.2f%n",
            faxPhoneNumber, faxesItem.getConfidence());
        }
      });
    }
  }

  DocumentField addresses = businessCardFields.get("Addresses");
  if (addresses != null) {
    if (DocumentFieldType.LIST == addresses.getType()) {
      List < DocumentField > addressesItems = addresses.getValueAsList();
      addressesItems.forEach(addressesItem -> {
        if (DocumentFieldType.STRING == addressesItem.getType()) {
          String address = addressesItem.getValueAsString();
          System.out
            .printf("Address: %s, confidence: %.2f%n", address, addressesItem.getConfidence());
        }
      });
    }
  }

  DocumentField companyName = businessCardFields.get("CompanyNames");
  if (companyName != null) {
    if (DocumentFieldType.LIST == companyName.getType()) {
      List < DocumentField > companyNameItems = companyName.getValueAsList();
      companyNameItems.forEach(companyNameItem -> {
        if (DocumentFieldType.STRING == companyNameItem.getType()) {
          String companyNameValue = companyNameItem.getValueAsString();
          System.out.printf("Company name: %s, confidence: %.2f%n", companyNameValue,
            companyNameItem.getConfidence());
        }
      });
    }
  }
}
}
}
```

Visit the Azure samples repository on GitHub and view the [business card model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/java/FormRecognizer/how-to-guide/business-card-model-output.md).





**Applies to: programming-language-javascript**


**Applies to: doc-intel-4.0.0**

<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD034 -->

[Client library](https://learn.microsoft.com/javascript/api/%40azure-rest/ai-document-intelligence/?view=azure-node-latest\&preserve-view=true) | [REST API reference](https://learn.microsoft.com/rest/api/aiservices/operation-groups?view=rest-aiservices-v4.0%20\(2024-11-30\)\&preserve-view=true) | [Package (npm)](https://www.npmjs.com/package/@azure-rest/ai-document-intelligence/v/1.0.0) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/documentintelligence/ai-document-intelligence-rest/samples/v1/javascript) |[Supported REST API version](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v4-0.md)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest version of [Visual Studio Code](https://code.visualstudio.com/) or your preferred IDE. For more information, see [Node.js in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial).
- The latest `LTS` version of [Node.js](https://nodejs.org/).

- A Foundry Tools or Document Intelligence resource. Create a <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource." target="_blank">single-service</a> or <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a multiple Document Intelligence resource." target="_blank">multi-service</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.

  > **Tip:**
  > Create a Foundry resource if you plan to access multiple Foundry Tools by using a single endpoint and key. For Document Intelligence access only, create a Document Intelligence resource. You need a single-service resource if you intend to use [Microsoft Entra authentication](https://learn.microsoft.com/azure/active-directory/authentication/overview-authentication).

- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

- A document file at a URL. For this project, you can use the sample forms provided in the following table for each feature:

  | Feature | modelID | document-url |
  | --- | --- | --- |
  | **Read model** | prebuilt-read | [Sample brochure](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png) |
  | **Layout model** | prebuilt-layout | [Sample booking confirmation](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png) |
  | **W-2 form model** | prebuilt-tax.us.w2 | [Sample W-2 form](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png) |
  | **Invoice model** | prebuilt-invoice | [Sample invoice](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf) |
  | **Receipt model** | prebuilt-receipt | [Sample receipt](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png) |
  | **ID document model** | prebuilt-idDocument | [Sample ID document](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png) |


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

## Set your environment variables

To interact with the Document Intelligence service, you need to create an instance of the `DocumentAnalysisClient` class. To do so, instantiate the client with your `key` and `endpoint` from the Azure portal. For this project, use environment variables to store and access credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

To set the environment variable for your Document Intelligence resource key, open a console window, and follow the instructions for your operating system and development environment. Replace *\<yourKey>* and *\<yourEndpoint>* with the values from your resource in the Azure portal.

#### [Windows](#tab/windows)

Environment variables in Windows aren't case-sensitive. They're typically declared in uppercase, with words joined by an underscore. At a command prompt, run the following commands:

1. Set your key variable:

   ```console
   setx DI_KEY <yourKey>
   ```

1. Set your endpoint variable

   ```console
   setx DI_ENDPOINT <yourEndpoint>
   ```

1. Close the Command Prompt window after you set your environment variables. The values remain until you change them again.

1. Restart any running programs that read the environment variable. For example, if you're using Visual Studio or Visual Studio Code as your editor, restart before running the sample code.

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `setx VARIABLE_NAME=` | Delete the environment variable by setting the value to an empty string. | `setx DI_KEY=` |
| `setx VARIABLE_NAME=value` | Set or change the value of an environment variable. | `setx DI_KEY=<yourKey>` |
| `set VARIABLE_NAME` | Display the value of a specific environment variable. | `set  DI_KEY` |
| `set` | Display all environment variables. | `set` |

#### [macOS](#tab/macOS)

Environment variables in macOS are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session. Open your terminal and enter the following commands:

1. Set your key variable:

   ```bash
   export key=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export endpoint=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash  `~/.bash_profile` startup script:

  1. Use a text editor to open the *~/.bash_profile* file and add the following command to create a permanent environment variable:

     ```bash
     export DI_KEY=<yourKey> DI_ENDPOINT=<yourEndpoint>
     ```

     Example: `export DI_KEY="<yourKey>"`

  1. Save your changes to the *bash_profile* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bash-profile
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY=<yourKey>` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of a specific environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

#### [Linux](#tab/linux)

Environment variables in Linux are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session:

1. Set your key variable:

   ```bash
   export DI_KEY=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export DI_ENDPOINT=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash `~/.bashrc` startup script:

  1. Use a text editor to open the *~/.bashrc* file and add the following command to create a permanent environment variable:

     ```bash
     export <VARIABLE>=<value>
     ```

     Example: `export DI_KEY=<yourKey>`

  1. Save your changes to the *.bashrc* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bashrc
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY=` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY={yourKey}` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of an environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

---


## Set up your programming environment

Create a Node.js Express application.

1. In a console window, create and navigate to a new directory for your app named `doc-intel-app`.

    ```console
    mkdir doc-intel-app
    cd doc-intel-app
    ```

1. Run the `npm init` command to initialize the application and scaffold your project.

    ```console
    npm init
    ```

1. Specify your project's attributes using the prompts presented in the terminal.

   - The most important attributes are name, version number, and entry point.
   - We recommend that you keep `index.js` for the entry point name. The description, test command, GitHub repository, keywords, author, and license information are optional attributes. You can skip them for this project.
   - Select **Enter** to accept the suggestions in parentheses.

   After you complete the prompts, the command creates a `package.json` file in your *doc-intel-app* directory.

1. Install the `ai-document-intelligence` client library and `azure/identity` npm packages:

    ```console
    npm i @azure-rest/ai-document-intelligence@1.0.0 @azure/identity
    ```

  Your app's *package.json* file is updated with the dependencies.

1. Create a file named *index.js* in the application directory.

   > **Tip:**
   >
   > You can create a new file by using PowerShell. Open a PowerShell window in your project directory by holding down the **Shift** key and right-clicking the folder, then type the following command: *New-Item index.js*.

## Build your application

To interact with the Document Intelligence service, you need to create an instance of the `DocumentIntelligenceClient` class. To do so, you create an `AzureKeyCredential` with your key from the Azure portal and a `DocumentIntelligenceClient` instance with the `AzureKeyCredential` and your Document Intelligence endpoint.

Open the `index.js` file in Visual Studio Code or your favorite IDE and select one of the following code samples and copy/paste into your application:

- The [prebuilt-read](#use-the-read-model) model is at the core of all Document Intelligence models and can detect lines, words, locations, and languages. The layout, general document, prebuilt, and custom models all use the `read` model as a foundation for extracting texts from documents.
- The [prebuilt-layout](#use-the-layout-model) model extracts text and text locations, tables, selection marks, and structure information from documents and images.
- The [prebuilt-tax.us.w2](#use-the-w-2-tax-model) model extracts information reported on US Internal Revenue Service (IRS) tax forms.
- The [prebuilt-invoice](#use-the-invoice-model) model extracts information reported on US Internal Revenue Service tax forms.
- The [prebuilt-receipt](#use-the-receipt-model) model extracts key information from printed and handwritten sales receipts.
- The [prebuilt-idDocument](#use-the-id-document-model) model extracts key information from US Drivers Licenses; international passport biographical pages; US state IDs; social security cards; and permanent resident cards.

## Use the Read model

```javascript
const { DocumentIntelligenceClient } = require("@azure-rest/ai-document-intelligence");
const  { AzureKeyCredential } = require("@azure/core-auth");

//use your `key` and `endpoint` environment variables
const key = process.env['DI_KEY'];
const endpoint = process.env['DI_ENDPOINT'];

// sample document
const documentUrlRead = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png"

// helper function
function* getTextOfSpans(content, spans) {
    for (const span of spans) {
        yield content.slice(span.offset, span.offset + span.length);
    }
}

async function main() {
    // create your `DocumentIntelligenceClient` instance and `AzureKeyCredential` variable
    const client = DocumentIntelligence(endpoint, new AzureKeyCredential(key));
    const poller = await client.beginAnalyzeDocument("prebuilt-read", documentUrlRead);

    const {
        content,
        pages,
        languages,
        styles
    } = await poller.pollUntilDone();

    if (pages.length <= 0) {
        console.log("No pages were extracted from the document.");
    } else {
        console.log("Pages:");
        for (const page of pages) {
            console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
            console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
            console.log(`  ${page.lines.length} lines, ${page.words.length} words`);

            if (page.lines.length > 0) {
                console.log("  Lines:");

                for (const line of page.lines) {
                    console.log(`  - "${line.content}"`);

                    // The words of the line can also be iterated independently. The words are computed based on their
                    // corresponding spans.
                    for (const word of line.words()) {
                        console.log(`    - "${word.content}"`);
                    }
                }
            }
        }
    }

    if (languages.length <= 0) {
        console.log("No language spans were extracted from the document.");
    } else {
        console.log("Languages:");
        for (const languageEntry of languages) {
            console.log(
                `- Found language: ${languageEntry.languageCode} (confidence: ${languageEntry.confidence})`
            );
            for (const text of getTextOfSpans(content, languageEntry.spans)) {
                const escapedText = text.replace(/\r?\n/g, "\\n").replace(/"/g, '\\"');
                console.log(`  - "${escapedText}"`);
            }
        }
    }

    if (styles.length <= 0) {
        console.log("No text styles were extracted from the document.");
    } else {
        console.log("Styles:");
        for (const style of styles) {
            console.log(
                `- Handwritten: ${style.isHandwritten ? "yes" : "no"} (confidence=${style.confidence})`
            );

            for (const word of getTextOfSpans(content, style.spans)) {
                console.log(`  - "${word}"`);
            }
        }
    }
}

main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});

```

Visit the Azure samples repository on GitHub and view the [`read` model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/read-model-output.md).

## Use the Layout model

```javascript
const { DocumentIntelligenceClient } = require("@azure-rest/ai-document-intelligence");
const  { AzureKeyCredential } = require("@azure/core-auth");

//use your `key` and `endpoint` environment variables
const key = process.env['DI_KEY'];
const endpoint = process.env['DI_ENDPOINT'];

// sample document
const layoutUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png"

async function main() {
    const client = DocumentIntelligence(endpoint, new AzureKeyCredential(key));

    const poller = await client.beginAnalyzeDocument(
      "prebuilt-layout", layoutUrl);

    // Layout extraction produces basic elements such as pages, words, lines, etc. as well as information about the
    // appearance (styles) of textual elements.
    const { pages, tables } = await poller.pollUntilDone();

    if (!pages || pages.length <= 0) {
      console.log("No pages were extracted from the document.");
    } else {
      console.log("Pages:");
      for (const page of pages) {
        console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
        console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
        console.log(
          `  ${page.lines && page.lines.length} lines, ${page.words && page.words.length} words`
        );

        if (page.lines && page.lines.length > 0) {
          console.log("  Lines:");

          for (const line of page.lines) {
            console.log(`  - "${line.content}"`);

            // The words of the line can also be iterated independently. The words are computed based on their
            // corresponding spans.
            for (const word of line.words()) {
              console.log(`    - "${word.content}"`);
            }
          }
        }
      }
    }

    if (!tables || tables.length <= 0) {
      console.log("No tables were extracted from the document.");
    } else {
      console.log("Tables:");
      for (const table of tables) {
        console.log(
          `- Extracted table: ${table.columnCount} columns, ${table.rowCount} rows (${table.cells.length} cells)`
        );
      }
    }
  }

  main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
  });

```

Visit the Azure samples repository on GitHub and view the [layout model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/layout-model-output.md).

## Use the General document model

```javascript
const { DocumentIntelligenceClient } = require("@azure-rest/ai-document-intelligence");
const  { AzureKeyCredential } = require("@azure/core-auth");

//use your `key` and `endpoint` environment variables
const key = process.env['DI_KEY'];
const endpoint = process.env['DI_ENDPOINT'];

// sample document
const documentUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf"

async function main() {
    const client = DocumentIntelligence(endpoint, new AzureKeyCredential(key));

    const poller = await client.beginAnalyzeDocument("prebuilt-document", documentUrl);

    const {
        keyValuePairs
    } = await poller.pollUntilDone();

    if (!keyValuePairs || keyValuePairs.length <= 0) {
        console.log("No key-value pairs were extracted from the document.");
    } else {
        console.log("Key-Value Pairs:");
        for (const {
                key,
                value,
                confidence
            } of keyValuePairs) {
            console.log("- Key  :", `"${key.content}"`);
            console.log("  Value:", `"${(value && value.content) || "<undefined>"}" (${confidence})`);
        }
    }

}

main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});

```

Visit the Azure samples repository on GitHub and view the [general document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/general-document-model-output.md).

## Use the W-2 tax model

```javascript
const { DocumentIntelligenceClient } = require("@azure-rest/ai-document-intelligence");
const  { AzureKeyCredential } = require("@azure/core-auth");

//use your `key` and `endpoint` environment variables
const key = process.env['DI_KEY'];
const endpoint = process.env['DI_ENDPOINT'];

const w2DocumentURL = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png"

async function main() {
 const client = DocumentIntelligence(endpoint, new AzureKeyCredential(key));

 const poller = await client.beginAnalyzeDocument("prebuilt-tax.us.w2", w2DocumentURL);

 const {
   documents: [result]
 } = await poller.pollUntilDone();

  if (result) {
    const { Employee, Employer, ControlNumber, TaxYear, AdditionalInfo } = result.fields;

    if (Employee) {
      const { Name, Address, SocialSecurityNumber } = Employee.properties;
      console.log("Employee:");
      console.log("  Name:", Name && Name.content);
      console.log("  SSN/TIN:", SocialSecurityNumber && SocialSecurityNumber.content);
      if (Address && Address.value) {
        const { streetAddress, postalCode } = Address.value;
        console.log("  Address:");
        console.log("    Street Address:", streetAddress);
        console.log("    Postal Code:", postalCode);
      }
    } else {
      console.log("No employee information extracted.");
    }

    if (Employer) {
      const { Name, Address, IdNumber } = Employer.properties;
      console.log("Employer:");
      console.log("  Name:", Name && Name.content);
      console.log("  ID (EIN):", IdNumber && IdNumber.content);

      if (Address && Address.value) {
        const { streetAddress, postalCode } = Address.value;
        console.log("  Address:");
        console.log("    Street Address:", streetAddress);
        console.log("    Postal Code:", postalCode);
      }
    } else {
      console.log("No employer information extracted.");
    }

    console.log("Control Number:", ControlNumber && ControlNumber.content);
    console.log("Tax Year:", TaxYear && TaxYear.content);

    if (AdditionalInfo) {
      console.log("Additional Info:");

      for (const info of AdditionalInfo.values) {
        const { LetterCode, Amount } = info.properties;
        console.log(`- ${LetterCode && LetterCode.content}: ${Amount && Amount.content}`);
      }
    }
  } else {
    throw new Error("Expected at least one document in the result.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

```

Visit the Azure samples repository on GitHub and view the [W-2 tax model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/w2-tax-model-output.md).

## Use the Invoice model

```javascript
const { DocumentIntelligenceClient } = require("@azure-rest/ai-document-intelligence");
const  { AzureKeyCredential } = require("@azure/core-auth");

//use your `key` and `endpoint` environment variables
const key = process.env['DI_KEY'];
const endpoint = process.env['DI_ENDPOINT'];

// sample url
const invoiceUrl = "https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf";

async function main() {

  const client = DocumentIntelligence(endpoint, new AzureKeyCredential(key));

  const poller = await client.beginAnalyzeDocument("prebuilt-invoice", invoiceUrl);

  const {
      documents: [result]
  } = await poller.pollUntilDone();

  if (result) {
      const invoice = result.fields;

      console.log("Vendor Name:", invoice.VendorName?.content);
      console.log("Customer Name:", invoice.CustomerName?.content);
      console.log("Invoice Date:", invoice.InvoiceDate?.content);
      console.log("Due Date:", invoice.DueDate?.content);

      console.log("Items:");
      for (const {
              properties: item
          } of invoice.Items?.values ?? []) {
          console.log("-", item.ProductCode?.content ?? "<no product code>");
          console.log("  Description:", item.Description?.content);
          console.log("  Quantity:", item.Quantity?.content);
          console.log("  Date:", item.Date?.content);
          console.log("  Unit:", item.Unit?.content);
          console.log("  Unit Price:", item.UnitPrice?.content);
          console.log("  Tax:", item.Tax?.content);
          console.log("  Amount:", item.Amount?.content);
      }

      console.log("Subtotal:", invoice.SubTotal?.content);
      console.log("Previous Unpaid Balance:", invoice.PreviousUnpaidBalance?.content);
      console.log("Tax:", invoice.TotalTax?.content);
      console.log("Amount Due:", invoice.AmountDue?.content);
  } else {
      throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

```

Visit the Azure samples repository on GitHub and view the [invoice model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/invoice-model-output.md).

## Use the Receipt model

```javascript
const { DocumentIntelligenceClient } = require("@azure-rest/ai-document-intelligence");
const  { AzureKeyCredential } = require("@azure/core-auth");

//use your `key` and `endpoint` environment variables
const key = process.env['DI_KEY'];
const endpoint = process.env['DI_ENDPOINT'];

// sample url
const receiptUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png";

async function main() {

    const client = DocumentIntelligence(endpoint, new AzureKeyCredential(key));

    const poller = await client.beginAnalyzeDocument("prebuilt-receipt", receiptUrl);

    const {
        documents: [result]
    } = await poller.pollUntilDone();

    if (result) {
        const {
            MerchantName,
            Items,
            Total
        } = result.fields;

        console.log("=== Receipt Information ===");
        console.log("Type:", result.docType);
        console.log("Merchant:", MerchantName && MerchantName.content);

        console.log("Items:");
        for (const item of (Items && Items.values) || []) {
            const {
                Description,
                TotalPrice
            } = item.properties;

            console.log("- Description:", Description && Description.content);
            console.log("  Total Price:", TotalPrice && TotalPrice.content);
        }

        console.log("Total:", Total && Total.content);
    } else {
        throw new Error("Expected at least one receipt in the result.");
    }

}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});

```

Visit the Azure samples repository on GitHub and view the [receipt model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/receipt-model-output.md).

## Use the ID document model

```javascript
const { DocumentIntelligenceClient } = require("@azure-rest/ai-document-intelligence");
const  { AzureKeyCredential } = require("@azure/core-auth");

//use your `key` and `endpoint` environment variables
const key = process.env['DI_KEY'];
const endpoint = process.env['DI_ENDPOINT'];

// sample document
const idDocumentURL = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png"

async function main() {
 const client = DocumentIntelligence(endpoint, new AzureKeyCredential(key));

 const poller = await client.beginAnalyzeDocument("prebuilt-idDocument", idDocumentURL);

 const {
   documents: [result]
 } = await poller.pollUntilDone();

  if (result) {
// The identity document model has multiple document types, so we need to know which document type was actually
    extracted.
    if (result.docType === "idDocument.driverLicense") {
      const { FirstName, LastName, DocumentNumber, DateOfBirth, DateOfExpiration, Height, Weight, EyeColor, Endorsements, Restrictions, VehicleClassifications} = result.fields;

// For the sake of the example, we'll only show a few of the fields that are produced.
      console.log("Extracted a Driver License:");
      console.log("  Name:", FirstName && FirstName.content, LastName && LastName.content);
      console.log("  License No.:", DocumentNumber && DocumentNumber.content);
      console.log("  Date of Birth:", DateOfBirth && DateOfBirth.content);
      console.log("  Expiration:", DateOfExpiration && DateOfExpiration.content);
      console.log("  Height:", Height && Height.content);
      console.log("  Weight:", Weight && Weight.content);
      console.log("  Eye color:", EyeColor && EyeColor.content);
      console.log("  Restrictions:", Restrictions && Restrictions.content);
      console.log("  Endorsements:", Endorsements && Endorsements.content);
      console.log("  Class:", VehicleClassifications && VehicleClassifications.content);
    } else if (result.docType === "idDocument.passport") {
// The passport document type extracts and parses the Passport's machine-readable zone
      if (!result.fields.machineReadableZone) {
        throw new Error("No Machine Readable Zone extracted from passport.");
      }

      const {
        FirstName,
        LastName,
        DateOfBirth,
        Nationality,
        DocumentNumber,
        CountryRegion,
        DateOfExpiration,
      } = result.fields.machineReadableZone.properties;

      console.log("Extracted a Passport:");
      console.log("  Name:", FirstName && FirstName.content, LastName && LastName.content);
      console.log("  Date of Birth:", DateOfBirth && DateOfBirth.content);
      console.log("  Nationality:", Nationality && Nationality.content);
      console.log("  Passport No.:", DocumentNumber && DocumentNumber.content);
      console.log("  Issuer:", CountryRegion && CountryRegion.content);
      console.log("  Expiration Date:", DateOfExpiration && DateOfExpiration.content);
    } else {
// The only reason this would happen is if the client library's schema for the prebuilt identity document model is
      out of date, and a new document type has been introduced.
      console.error("Unknown document type in result:", result);
    }
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

```

Visit the Azure samples repository on GitHub and view the [ID document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/id-document-output.md).



**Applies to: doc-intel-3.1.0 || doc-intel-3.0.0**


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD034 -->

**Applies to: doc-intel-3.1.0**
[Client library](https://learn.microsoft.com/javascript/api/overview/azure/ai-form-recognizer-readme?view=azure-node-latest\&preserve-view=true) | [REST API reference](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-form-recognizer/v/5.0.0) | [Samples](https://github.com/witemple-msft/azure-sdk-for-js/tree/ai-form-recognizer/5.0.0-release/sdk/formrecognizer/ai-form-recognizer/samples/v5) |[Supported REST API versions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v3-1.md)


**Applies to: doc-intel-3.0.0**

[Client library](https://learn.microsoft.com/javascript/api/%40azure/ai-form-recognizer/) | [REST API reference](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-v3.0%20\(2022-08-31\)\&preserve-view=true\&tabs=HTTP) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-form-recognizer/v/5.0.0) | [Samples](https://github.com/witemple-msft/azure-sdk-for-js/tree/26e85928088c6ee46ff9b357b2af8158b9da8b49/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/javascript) |[Supported REST API versions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v3-0.md)


## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest version of [Visual Studio Code](https://code.visualstudio.com/) or your preferred IDE. For more information, see [Node.js in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial).
- The latest `LTS` version of [Node.js](https://nodejs.org/).

- A Foundry Tools or Document Intelligence resource. Create a <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource." target="_blank">single-service</a> or <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a multiple Document Intelligence resource." target="_blank">multi-service</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.

  > **Tip:**
  > Create a Foundry resource if you plan to access multiple Foundry Tools by using a single endpoint and key. For Document Intelligence access only, create a Document Intelligence resource. You need a single-service resource if you intend to use [Microsoft Entra authentication](https://learn.microsoft.com/azure/active-directory/authentication/overview-authentication).

- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

- A document file at a URL. For this project, you can use the sample forms provided in the following table for each feature:

  | Feature | modelID | document-url |
  | --- | --- | --- |
  | **Read model** | prebuilt-read | [Sample brochure](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png) |
  | **Layout model** | prebuilt-layout | [Sample booking confirmation](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png) |
  | **W-2 form model** | prebuilt-tax.us.w2 | [Sample W-2 form](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png) |
  | **Invoice model** | prebuilt-invoice | [Sample invoice](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf) |
  | **Receipt model** | prebuilt-receipt | [Sample receipt](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png) |
  | **ID document model** | prebuilt-idDocument | [Sample ID document](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png) |
  | **Business card model** | prebuilt-businessCard | [Sample business card](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/business-card-english.jpg) |

<!-- > [!div class="nextstepaction"]
> [I &#8203;ran into an issue with the prerequisites.](https://microsoft.qualtrics.com/jfe/form/SV_0Cl5zkG3CnDjq6O?PLanguage=javascript&Product=FormRecognizer&Page=how-to&Section=prerequisites) -->


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

## Set your environment variables

To interact with the Document Intelligence service, you need to create an instance of the `DocumentAnalysisClient` class. To do so, instantiate the client with your `key` and `endpoint` from the Azure portal. For this project, use environment variables to store and access credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

To set the environment variable for your Document Intelligence resource key, open a console window, and follow the instructions for your operating system and development environment. Replace *\<yourKey>* and *\<yourEndpoint>* with the values from your resource in the Azure portal.

#### [Windows](#tab/windows)

Environment variables in Windows aren't case-sensitive. They're typically declared in uppercase, with words joined by an underscore. At a command prompt, run the following commands:

1. Set your key variable:

   ```console
   setx DI_KEY <yourKey>
   ```

1. Set your endpoint variable

   ```console
   setx DI_ENDPOINT <yourEndpoint>
   ```

1. Close the Command Prompt window after you set your environment variables. The values remain until you change them again.

1. Restart any running programs that read the environment variable. For example, if you're using Visual Studio or Visual Studio Code as your editor, restart before running the sample code.

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `setx VARIABLE_NAME=` | Delete the environment variable by setting the value to an empty string. | `setx DI_KEY=` |
| `setx VARIABLE_NAME=value` | Set or change the value of an environment variable. | `setx DI_KEY=<yourKey>` |
| `set VARIABLE_NAME` | Display the value of a specific environment variable. | `set  DI_KEY` |
| `set` | Display all environment variables. | `set` |

#### [macOS](#tab/macOS)

Environment variables in macOS are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session. Open your terminal and enter the following commands:

1. Set your key variable:

   ```bash
   export key=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export endpoint=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash  `~/.bash_profile` startup script:

  1. Use a text editor to open the *~/.bash_profile* file and add the following command to create a permanent environment variable:

     ```bash
     export DI_KEY=<yourKey> DI_ENDPOINT=<yourEndpoint>
     ```

     Example: `export DI_KEY="<yourKey>"`

  1. Save your changes to the *bash_profile* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bash-profile
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY=<yourKey>` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of a specific environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

#### [Linux](#tab/linux)

Environment variables in Linux are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session:

1. Set your key variable:

   ```bash
   export DI_KEY=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export DI_ENDPOINT=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash `~/.bashrc` startup script:

  1. Use a text editor to open the *~/.bashrc* file and add the following command to create a permanent environment variable:

     ```bash
     export <VARIABLE>=<value>
     ```

     Example: `export DI_KEY=<yourKey>`

  1. Save your changes to the *.bashrc* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bashrc
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY=` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY={yourKey}` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of an environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

---


## Set up your programming environment

Create a Node.js Express application.

1. In a console window, create and navigate to a new directory for your app named `form-recognizer-app`.

    ```console
    mkdir form-recognizer-app
    cd form-recognizer-app
    ```

1. Run the `npm init` command to initialize the application and scaffold your project.

    ```console
    npm init
    ```

1. Specify your project's attributes using the prompts presented in the terminal.

   - The most important attributes are name, version number, and entry point.
   - We recommend that you keep `index.js` for the entry point name. The description, test command, GitHub repository, keywords, author, and license information are optional attributes. You can skip them for this project.
   - Select **Enter** to accept the suggestions in parentheses.

   After you complete the prompts, the command creates a `package.json` file in your *form-recognizer-app* directory.

1. Install the `ai-form-recognizer` client library and `azure/identity` npm packages:

    ```console
    npm i @azure/ai-form-recognizer @azure/identity
    ```

  Your app's *package.json* file is updated with the dependencies.

1. Create a file named *index.js* in the application directory.

   > **Tip:**
   >
   > You can create a new file by using PowerShell. Open a PowerShell window in your project directory by holding down the **Shift** key and right-clicking the folder, then type the following command: *New-Item index.js*.

<!-- > [!div class="nextstepaction"]
> [I &#8203;ran into an issue with the setup.](https://microsoft.qualtrics.com/jfe/form/SV_0Cl5zkG3CnDjq6O?PLanguage=javascript&Product=FormRecognizer&Page=how-to&Section=setup) -->

## Build your application

To interact with the Document Intelligence service, you need to create an instance of the `DocumentAnalysisClient` class. To do so, you create an `AzureKeyCredential` with your key from the Azure portal and a `DocumentAnalysisClient` instance with the `AzureKeyCredential` and your Document Intelligence endpoint.

Open the `index.js` file in Visual Studio Code or your favorite IDE and select one of the following code samples and copy/paste into your application:

- The [prebuilt-read](#use-the-read-model) model is at the core of all Document Intelligence models and can detect lines, words, locations, and languages. The layout, general document, prebuilt, and custom models all use the `read` model as a foundation for extracting texts from documents.
- The [prebuilt-layout](#use-the-layout-model) model extracts text and text locations, tables, selection marks, and structure information from documents and images.
- The [prebuilt-tax.us.w2](#use-the-w-2-tax-model) model extracts information reported on US Internal Revenue Service (IRS) tax forms.
- The [prebuilt-invoice](#use-the-invoice-model) model extracts information reported on US Internal Revenue Service tax forms.
- The [prebuilt-receipt](#use-the-receipt-model) model extracts key information from printed and handwritten sales receipts.
- The [prebuilt-idDocument](#use-the-id-document-model) model extracts key information from US Drivers Licenses; international passport biographical pages; US state IDs; social security cards; and permanent resident cards.
-
<!-- > [!div class="nextstepaction"]
> [I &#8203;ran into an issue building the application.](https://microsoft.qualtrics.com/jfe/form/SV_0Cl5zkG3CnDjq6O?PLanguage=javascript&Product=FormRecognizer&Page=how-to&Section=build-application) -->

## Use the Read model

```javascript
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

//use your `key` and `endpoint` environment variables
const key = process.env['FR_KEY'];
const endpoint = process.env['FR_ENDPOINT'];

// sample document
const documentUrlRead = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png"

// helper function
function* getTextOfSpans(content, spans) {
    for (const span of spans) {
        yield content.slice(span.offset, span.offset + span.length);
    }
}

async function main() {
    // create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
    const poller = await client.beginAnalyzeDocument("prebuilt-read", documentUrlRead);

    const {
        content,
        pages,
        languages,
        styles
    } = await poller.pollUntilDone();

    if (pages.length <= 0) {
        console.log("No pages were extracted from the document.");
    } else {
        console.log("Pages:");
        for (const page of pages) {
            console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
            console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
            console.log(`  ${page.lines.length} lines, ${page.words.length} words`);

            if (page.lines.length > 0) {
                console.log("  Lines:");

                for (const line of page.lines) {
                    console.log(`  - "${line.content}"`);

                    // The words of the line can also be iterated independently. The words are computed based on their
                    // corresponding spans.
                    for (const word of line.words()) {
                        console.log(`    - "${word.content}"`);
                    }
                }
            }
        }
    }

    if (languages.length <= 0) {
        console.log("No language spans were extracted from the document.");
    } else {
        console.log("Languages:");
        for (const languageEntry of languages) {
            console.log(
                `- Found language: ${languageEntry.languageCode} (confidence: ${languageEntry.confidence})`
            );
            for (const text of getTextOfSpans(content, languageEntry.spans)) {
                const escapedText = text.replace(/\r?\n/g, "\\n").replace(/"/g, '\\"');
                console.log(`  - "${escapedText}"`);
            }
        }
    }

    if (styles.length <= 0) {
        console.log("No text styles were extracted from the document.");
    } else {
        console.log("Styles:");
        for (const style of styles) {
            console.log(
                `- Handwritten: ${style.isHandwritten ? "yes" : "no"} (confidence=${style.confidence})`
            );

            for (const word of getTextOfSpans(content, style.spans)) {
                console.log(`  - "${word}"`);
            }
        }
    }
}

main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});

```

Visit the Azure samples repository on GitHub and view the [`read` model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/read-model-output.md).

## Use the Layout model

```javascript
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

//use your `key` and `endpoint` environment variables
const key = process.env['FR_KEY'];
const endpoint = process.env['FR_ENDPOINT'];

// sample document
const layoutUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png"

async function main() {
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

    const poller = await client.beginAnalyzeDocumentFromUrl(
      "prebuilt-layout", layoutUrl);

    // Layout extraction produces basic elements such as pages, words, lines, etc. as well as information about the
    // appearance (styles) of textual elements.
    const { pages, tables } = await poller.pollUntilDone();

    if (!pages || pages.length <= 0) {
      console.log("No pages were extracted from the document.");
    } else {
      console.log("Pages:");
      for (const page of pages) {
        console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
        console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
        console.log(
          `  ${page.lines && page.lines.length} lines, ${page.words && page.words.length} words`
        );

        if (page.lines && page.lines.length > 0) {
          console.log("  Lines:");

          for (const line of page.lines) {
            console.log(`  - "${line.content}"`);

            // The words of the line can also be iterated independently. The words are computed based on their
            // corresponding spans.
            for (const word of line.words()) {
              console.log(`    - "${word.content}"`);
            }
          }
        }
      }
    }

    if (!tables || tables.length <= 0) {
      console.log("No tables were extracted from the document.");
    } else {
      console.log("Tables:");
      for (const table of tables) {
        console.log(
          `- Extracted table: ${table.columnCount} columns, ${table.rowCount} rows (${table.cells.length} cells)`
        );
      }
    }
  }

  main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
  });

```

Visit the Azure samples repository on GitHub and view the [layout model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/layout-model-output.md).

## Use the General document model

```javascript
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

//use your `key` and `endpoint` environment variables
const key = process.env['FR_KEY'];
const endpoint = process.env['FR_ENDPOINT'];

// sample document
const documentUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf"

async function main() {
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

    const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-document", documentUrl);

    const {
        keyValuePairs
    } = await poller.pollUntilDone();

    if (!keyValuePairs || keyValuePairs.length <= 0) {
        console.log("No key-value pairs were extracted from the document.");
    } else {
        console.log("Key-Value Pairs:");
        for (const {
                key,
                value,
                confidence
            } of keyValuePairs) {
            console.log("- Key  :", `"${key.content}"`);
            console.log("  Value:", `"${(value && value.content) || "<undefined>"}" (${confidence})`);
        }
    }

}

main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});

```

Visit the Azure samples repository on GitHub and view the [general document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/general-document-model-output.md).

## Use the W-2 tax model

```javascript
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

//use your `key` and `endpoint` environment variables
const key = process.env['FR_KEY'];
const endpoint = process.env['FR_ENDPOINT'];

const w2DocumentURL = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png"

async function main() {
 const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

 const poller = await client.beginAnalyzeDocument("prebuilt-tax.us.w2", w2DocumentURL);

 const {
   documents: [result]
 } = await poller.pollUntilDone();

  if (result) {
    const { Employee, Employer, ControlNumber, TaxYear, AdditionalInfo } = result.fields;

    if (Employee) {
      const { Name, Address, SocialSecurityNumber } = Employee.properties;
      console.log("Employee:");
      console.log("  Name:", Name && Name.content);
      console.log("  SSN/TIN:", SocialSecurityNumber && SocialSecurityNumber.content);
      if (Address && Address.value) {
        const { streetAddress, postalCode } = Address.value;
        console.log("  Address:");
        console.log("    Street Address:", streetAddress);
        console.log("    Postal Code:", postalCode);
      }
    } else {
      console.log("No employee information extracted.");
    }

    if (Employer) {
      const { Name, Address, IdNumber } = Employer.properties;
      console.log("Employer:");
      console.log("  Name:", Name && Name.content);
      console.log("  ID (EIN):", IdNumber && IdNumber.content);

      if (Address && Address.value) {
        const { streetAddress, postalCode } = Address.value;
        console.log("  Address:");
        console.log("    Street Address:", streetAddress);
        console.log("    Postal Code:", postalCode);
      }
    } else {
      console.log("No employer information extracted.");
    }

    console.log("Control Number:", ControlNumber && ControlNumber.content);
    console.log("Tax Year:", TaxYear && TaxYear.content);

    if (AdditionalInfo) {
      console.log("Additional Info:");

      for (const info of AdditionalInfo.values) {
        const { LetterCode, Amount } = info.properties;
        console.log(`- ${LetterCode && LetterCode.content}: ${Amount && Amount.content}`);
      }
    }
  } else {
    throw new Error("Expected at least one document in the result.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

```

Visit the Azure samples repository on GitHub and view the [W-2 tax model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/w2-tax-model-output.md).

## Use the Invoice model

```javascript
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

//use your `key` and `endpoint` environment variables
const key = process.env['FR_KEY'];
const endpoint = process.env['FR_ENDPOINT'];

// sample url
const invoiceUrl = "https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf";

async function main() {

  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

  const poller = await client.beginAnalyzeDocument("prebuilt-invoice", invoiceUrl);

  const {
      documents: [result]
  } = await poller.pollUntilDone();

  if (result) {
      const invoice = result.fields;

      console.log("Vendor Name:", invoice.VendorName?.content);
      console.log("Customer Name:", invoice.CustomerName?.content);
      console.log("Invoice Date:", invoice.InvoiceDate?.content);
      console.log("Due Date:", invoice.DueDate?.content);

      console.log("Items:");
      for (const {
              properties: item
          } of invoice.Items?.values ?? []) {
          console.log("-", item.ProductCode?.content ?? "<no product code>");
          console.log("  Description:", item.Description?.content);
          console.log("  Quantity:", item.Quantity?.content);
          console.log("  Date:", item.Date?.content);
          console.log("  Unit:", item.Unit?.content);
          console.log("  Unit Price:", item.UnitPrice?.content);
          console.log("  Tax:", item.Tax?.content);
          console.log("  Amount:", item.Amount?.content);
      }

      console.log("Subtotal:", invoice.SubTotal?.content);
      console.log("Previous Unpaid Balance:", invoice.PreviousUnpaidBalance?.content);
      console.log("Tax:", invoice.TotalTax?.content);
      console.log("Amount Due:", invoice.AmountDue?.content);
  } else {
      throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

```

Visit the Azure samples repository on GitHub and view the [invoice model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/invoice-model-output.md).

## Use the Receipt model

```javascript
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

//use your `key` and `endpoint` environment variables
const key = process.env['FR_KEY'];
const endpoint = process.env['FR_ENDPOINT'];

// sample url
const receiptUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png";

async function main() {

    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

    const poller = await client.beginAnalyzeDocument("prebuilt-receipt", receiptUrl);

    const {
        documents: [result]
    } = await poller.pollUntilDone();

    if (result) {
        const {
            MerchantName,
            Items,
            Total
        } = result.fields;

        console.log("=== Receipt Information ===");
        console.log("Type:", result.docType);
        console.log("Merchant:", MerchantName && MerchantName.content);

        console.log("Items:");
        for (const item of (Items && Items.values) || []) {
            const {
                Description,
                TotalPrice
            } = item.properties;

            console.log("- Description:", Description && Description.content);
            console.log("  Total Price:", TotalPrice && TotalPrice.content);
        }

        console.log("Total:", Total && Total.content);
    } else {
        throw new Error("Expected at least one receipt in the result.");
    }

}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});

```

Visit the Azure samples repository on GitHub and view the [receipt model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/receipt-model-output.md).

## Use the ID document model

```javascript
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

//use your `key` and `endpoint` environment variables
const key = process.env['FR_KEY'];
const endpoint = process.env['FR_ENDPOINT'];

// sample document
const idDocumentURL = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png"

async function main() {
 const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

 const poller = await client.beginAnalyzeDocument("prebuilt-idDocument", idDocumentURL);

 const {
   documents: [result]
 } = await poller.pollUntilDone();

  if (result) {
// The identity document model has multiple document types, so we need to know which document type was actually
    extracted.
    if (result.docType === "idDocument.driverLicense") {
      const { FirstName, LastName, DocumentNumber, DateOfBirth, DateOfExpiration, Height, Weight, EyeColor, Endorsements, Restrictions, VehicleClassifications} = result.fields;

// For the sake of the example, we'll only show a few of the fields that are produced.
      console.log("Extracted a Driver License:");
      console.log("  Name:", FirstName && FirstName.content, LastName && LastName.content);
      console.log("  License No.:", DocumentNumber && DocumentNumber.content);
      console.log("  Date of Birth:", DateOfBirth && DateOfBirth.content);
      console.log("  Expiration:", DateOfExpiration && DateOfExpiration.content);
      console.log("  Height:", Height && Height.content);
      console.log("  Weight:", Weight && Weight.content);
      console.log("  Eye color:", EyeColor && EyeColor.content);
      console.log("  Restrictions:", Restrictions && Restrictions.content);
      console.log("  Endorsements:", Endorsements && Endorsements.content);
      console.log("  Class:", VehicleClassifications && VehicleClassifications.content);
    } else if (result.docType === "idDocument.passport") {
// The passport document type extracts and parses the Passport's machine-readable zone
      if (!result.fields.machineReadableZone) {
        throw new Error("No Machine Readable Zone extracted from passport.");
      }

      const {
        FirstName,
        LastName,
        DateOfBirth,
        Nationality,
        DocumentNumber,
        CountryRegion,
        DateOfExpiration,
      } = result.fields.machineReadableZone.properties;

      console.log("Extracted a Passport:");
      console.log("  Name:", FirstName && FirstName.content, LastName && LastName.content);
      console.log("  Date of Birth:", DateOfBirth && DateOfBirth.content);
      console.log("  Nationality:", Nationality && natiNationalityonality.content);
      console.log("  Passport No.:", DocumentNumber && DocumentNumber.content);
      console.log("  Issuer:", CountryRegion && CountryRegion.content);
      console.log("  Expiration Date:", DateOfExpiration && DateOfExpiration.content);
    } else {
// The only reason this would happen is if the client library's schema for the prebuilt identity document model is
      out of date, and a new document type has been introduced.
      console.error("Unknown document type in result:", result);
    }
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

```

Visit the Azure samples repository on GitHub and view the [ID document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/id-document-output.md).

## Use the Business card model

```javascript
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

//use your `key` and `endpoint` environment variables
const key = process.env['FR_KEY'];
const endpoint = process.env['FR_ENDPOINT'];

// sample document
const businessCardURL = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/de5e0d8982ab754823c54de47a47e8e499351523/curl/form-recognizer/rest-api/business_card.jpg"

async function main() {
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

    const poller = await client.beginAnalyzeDocument("prebuilt-businessCard", businessCardURL);

    const {
        documents: [result]
    } = await poller.pollUntilDone();

    if (result) {
        const businessCard = result.fields;
        console.log("=== Business Card Information ===");

        // There are more fields than just these few, and the model allows for multiple contact & company names as well as
        // phone numbers, though we'll only show the first extracted values here.
        const name = businessCard.ContactNames && businessCard.ContactNames.values[0];
        if (name) {
            const {
                FirstName,
                LastName
            } = name.properties;
            console.log("Name:", FirstName && FirstName.content, LastName && LastName.content);
        }

        const company = businessCard.CompanyNames && businessCard.CompanyNames.values[0];
        if (company) {
            console.log("Company:", company.content);
        }

        const address = businessCard.Addresses && businessCard.Addresses.values[0];
        if (address) {
            console.log("Address:", address.content);
        }
        const jobTitle = businessCard.JobTitles && businessCard.JobTitles.values[0];
        if (jobTitle) {
            console.log("Job title:", jobTitle.content);
        }
        const department = businessCard.Departments && businessCard.Departments.values[0];
        if (department) {
            console.log("Department:", department.content);
        }
        const email = businessCard.Emails && businessCard.Emails.values[0];
        if (email) {
            console.log("Email:", email.content);
        }
        const workPhone = businessCard.WorkPhones && businessCard.WorkPhones.values[0];
        if (workPhone) {
            console.log("Work phone:", workPhone.content);
        }
        const website = businessCard.Websites && businessCard.Websites.values[0];
        if (website) {
            console.log("Website:", website.content);
        }
    } else {
        throw new Error("Expected at least one business card in the result.");
    }
}

main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});

```

Visit the Azure samples repository on GitHub and view the [business card model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/how-to-guide/business-card-model-output.md).





**Applies to: programming-language-python**


**Applies to: doc-intel-4.0.0**

<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD034 -->

[Client library](https://learn.microsoft.com/python/api/overview/azure/ai-documentintelligence-readme?view=azure-python-preview\&preserve-view=true) | [REST API reference](https://learn.microsoft.com/rest/api/aiservices/operation-groups?view=rest-aiservices-v4.0%20\(2024-11-30\)\&preserve-view=true) | [Package (PyPi)](https://pypi.org/project/azure-ai-documentintelligence/1.0.0b4/) | [Samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/documentintelligence/azure-ai-documentintelligence/samples) | [Supported REST API version](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v4-0.md#supported-programming-languages)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Python 3.7 or later](https://www.python.org/). Your Python installation should include [pip](https://pip.pypa.io/en/stable/). You can check whether you have pip installed by running `pip --version` on the command line. Get pip by installing the latest version of Python.
- The latest version of [Visual Studio Code](https://code.visualstudio.com/) or your preferred IDE. See [Getting Started with Python in Visual Studio Code](https://code.visualstudio.com/docs/python/python-tutorial).
- A Foundry Tools or Document Intelligence resource. Create a <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource." target="_blank">single-service</a> or <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a multiple Document Intelligence resource." target="_blank">multi-service</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

- A document file at a URL. For this project, you can use the sample forms provided in the following table for each feature:

  | Feature | modelID | document-url |
  | --- | --- | --- |
  | **Read model** | prebuilt-read | [Sample brochure](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png) |
  | **Layout model** | prebuilt-layout | [Sample booking confirmation](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png) |
  | **W-2 form model** | prebuilt-tax.us.w2 | [Sample W-2 form](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png) |
  | **Invoice model** | prebuilt-invoice | [Sample invoice](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf) |
  | **Receipt model** | prebuilt-receipt | [Sample receipt](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png) |
  | **ID document model** | prebuilt-idDocument | [Sample ID document](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png) |


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

## Set your environment variables

To interact with the Document Intelligence service, you need to create an instance of the `DocumentAnalysisClient` class. To do so, instantiate the client with your `key` and `endpoint` from the Azure portal. For this project, use environment variables to store and access credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

To set the environment variable for your Document Intelligence resource key, open a console window, and follow the instructions for your operating system and development environment. Replace *\<yourKey>* and *\<yourEndpoint>* with the values from your resource in the Azure portal.

#### [Windows](#tab/windows)

Environment variables in Windows aren't case-sensitive. They're typically declared in uppercase, with words joined by an underscore. At a command prompt, run the following commands:

1. Set your key variable:

   ```console
   setx DI_KEY <yourKey>
   ```

1. Set your endpoint variable

   ```console
   setx DI_ENDPOINT <yourEndpoint>
   ```

1. Close the Command Prompt window after you set your environment variables. The values remain until you change them again.

1. Restart any running programs that read the environment variable. For example, if you're using Visual Studio or Visual Studio Code as your editor, restart before running the sample code.

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `setx VARIABLE_NAME=` | Delete the environment variable by setting the value to an empty string. | `setx DI_KEY=` |
| `setx VARIABLE_NAME=value` | Set or change the value of an environment variable. | `setx DI_KEY=<yourKey>` |
| `set VARIABLE_NAME` | Display the value of a specific environment variable. | `set  DI_KEY` |
| `set` | Display all environment variables. | `set` |

#### [macOS](#tab/macOS)

Environment variables in macOS are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session. Open your terminal and enter the following commands:

1. Set your key variable:

   ```bash
   export key=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export endpoint=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash  `~/.bash_profile` startup script:

  1. Use a text editor to open the *~/.bash_profile* file and add the following command to create a permanent environment variable:

     ```bash
     export DI_KEY=<yourKey> DI_ENDPOINT=<yourEndpoint>
     ```

     Example: `export DI_KEY="<yourKey>"`

  1. Save your changes to the *bash_profile* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bash-profile
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY=<yourKey>` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of a specific environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

#### [Linux](#tab/linux)

Environment variables in Linux are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session:

1. Set your key variable:

   ```bash
   export DI_KEY=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export DI_ENDPOINT=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash `~/.bashrc` startup script:

  1. Use a text editor to open the *~/.bashrc* file and add the following command to create a permanent environment variable:

     ```bash
     export <VARIABLE>=<value>
     ```

     Example: `export DI_KEY=<yourKey>`

  1. Save your changes to the *.bashrc* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bashrc
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY=` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY={yourKey}` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of an environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

---


## Set up your programming environment

Open a console window in your local environment and install the Azure Document Intelligence in Foundry Tools client library for Python with pip:

```console
pip install azure-ai-documentintelligence==1.0.0b4
```

## Create your Python application

To interact with the Document Intelligence service, you need to create an instance of the `DocumentIntelligenceClient` class. To do so, you create an `AzureKeyCredential` with your key from the Azure portal and a `DocumentIntelligenceClient` instance with the `AzureKeyCredential` and your Document Intelligence endpoint.

1. Create a new Python file called *form_recognizer_quickstart.py* in an editor or IDE.

1. Open the *form_recognizer_quickstart.py* file and select one of the following code samples and copy/paste into your application:

   - The [prebuilt-read](#use-the-read-model) model is at the core of all Document Intelligence models and can detect lines, words, locations, and languages. The layout, general document, prebuilt, and custom models all use the `read` model as a foundation for extracting texts from documents.
   - The [prebuilt-layout](#use-the-layout-model) model extracts text and text locations, tables, selection marks, and structure information from documents and images.
   - The [prebuilt-tax.us.w2](#use-the-w-2-tax-model) model extracts information reported on US Internal Revenue Service (IRS) tax forms.
   - The [prebuilt-invoice](#use-the-invoice-model) model extracts key fields and line items from sales invoices in various formats.
   - The [prebuilt-receipt](#use-the-receipt-model) model extracts key information from printed and handwritten sales receipts.
   - The [prebuilt-idDocument](#use-the-id-document-model) model extracts key information from US Drivers Licenses; international passport biographical pages; US state IDs; social security cards; and permanent resident cards.

1. Run the Python code from the command prompt.

   ```python
   python form_recognizer_quickstart.py
   ```

## Use the Read model

```python
import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeResult
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest

# use your `key` and `endpoint` environment variables
key = os.environ.get('DI_KEY')
endpoint = os.environ.get('DI_ENDPOINT')

# helper functions
def get_words(page, line):
    result = []
    for word in page.words:
        if _in_span(word, line.spans):
            result.append(word)
    return result


def _in_span(word, spans):
    for span in spans:
        if word.span.offset >= span.offset and (word.span.offset + word.span.length) <= (span.offset + span.length):
            return True
    return False


def analyze_read():
    # sample document
    formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png"

    client = DocumentIntelligenceClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

    poller = client.begin_analyze_document(
        "prebuilt-read", AnalyzeDocumentRequest(url_source=formUrl
    ))
    result: AnalyzeResult = poller.result()

    print("----Languages detected in the document----")
    if result.languages is not None:
        for language in result.languages:
            print(f"Language code: '{language.locale}' with confidence {language.confidence}")

    print("----Styles detected in the document----")
    if result.styles:
        for style in result.styles:
            if style.is_handwritten:
                print("Found the following handwritten content: ")
                print(",".join([result.content[span.offset : span.offset + span.length] for span in style.spans]))
            if style.font_style:
                print(f"The document contains '{style.font_style}' font style, applied to the following text: ")
                print(",".join([result.content[span.offset : span.offset + span.length] for span in style.spans]))

    for page in result.pages:
        print(f"----Analyzing document from page #{page.page_number}----")
        print(f"Page has width: {page.width} and height: {page.height}, measured with unit: {page.unit}")

        if page.lines:
            for line_idx, line in enumerate(page.lines):
                words = get_words(page, line)
                print(
                    f"...Line # {line_idx} has {len(words)} words and text '{line.content}' within bounding polygon '{line.polygon}'"
                )

                for word in words:
                    print(f"......Word '{word.content}' has a confidence of {word.confidence}")

        if page.selection_marks:
            for selection_mark in page.selection_marks:
                print(
                    f"...Selection mark is '{selection_mark.state}' within bounding polygon "
                    f"'{selection_mark.polygon}' and has a confidence of {selection_mark.confidence}"
                )

    if result.paragraphs:
        print(f"----Detected #{len(result.paragraphs)} paragraphs in the document----")
        for paragraph in result.paragraphs:
            print(f"Found paragraph with role: '{paragraph.role}' within {paragraph.bounding_regions} bounding region")
            print(f"...with content: '{paragraph.content}'")

        result.paragraphs.sort(key=lambda p: (p.spans.sort(key=lambda s: s.offset), p.spans[0].offset))
        print("-----Print sorted paragraphs-----")
        for idx, paragraph in enumerate(result.paragraphs):
            print(
                f"...paragraph:{idx} with offset: {paragraph.spans[0].offset} and length: {paragraph.spans[0].length}"
            )

    print("----------------------------------------")


if __name__ == "__main__":
    analyze_read()

```

> 
> [View complete code on GitHub.](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/Python(v4.0)/Read_model/sample_analyze_read.py)  [More samples](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/Python(v4.0)/Read_model)

Visit the Azure samples repository on GitHub and view the [`read` model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/read-model-output.md).

## Use the Layout model

```python
import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeResult
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest


# use your `key` and `endpoint` environment variables
key = os.environ.get('DI_KEY')
endpoint = os.environ.get('DI_ENDPOINT')


def analyze_layout():
    # sample document
    formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png"

    client = DocumentIntelligenceClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

    poller = client.begin_analyze_document(
        "prebuilt-layout", AnalyzeDocumentRequest(url_source=formUrl
    ))
    result: AnalyzeResult = poller.result()

    if result.styles and any([style.is_handwritten for style in result.styles]):
        print("Document contains handwritten content")
    else:
        print("Document does not contain handwritten content")

    for page in result.pages:
        print(f"----Analyzing layout from page #{page.page_number}----")
        print(f"Page has width: {page.width} and height: {page.height}, measured with unit: {page.unit}")

        if page.lines:
            for line_idx, line in enumerate(page.lines):
                words = get_words(page, line)
                print(
                    f"...Line # {line_idx} has word count {len(words)} and text '{line.content}' "
                    f"within bounding polygon '{line.polygon}'"
                )

                for word in words:
                    print(f"......Word '{word.content}' has a confidence of {word.confidence}")

        if page.selection_marks:
            for selection_mark in page.selection_marks:
                print(
                    f"Selection mark is '{selection_mark.state}' within bounding polygon "
                    f"'{selection_mark.polygon}' and has a confidence of {selection_mark.confidence}"
                )

    if result.tables:
        for table_idx, table in enumerate(result.tables):
            print(f"Table # {table_idx} has {table.row_count} rows and " f"{table.column_count} columns")
            if table.bounding_regions:
                for region in table.bounding_regions:
                    print(f"Table # {table_idx} location on page: {region.page_number} is {region.polygon}")
            for cell in table.cells:
                print(f"...Cell[{cell.row_index}][{cell.column_index}] has text '{cell.content}'")
                if cell.bounding_regions:
                    for region in cell.bounding_regions:
                        print(f"...content on page {region.page_number} is within bounding polygon '{region.polygon}'")

    print("----------------------------------------")



if __name__ == "__main__":
    analyze_layout()

```

> 
> [View complete code on GitHub.](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/Python(v4.0)/Layout_model/sample_analyze_layout.py) [More samples](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/Python(v4.0)/Layout_model)

Visit the Azure samples repository on GitHub and view the [layout model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/layout-model-output.md).

## Use the W-2 tax model

```python
import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeResult
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest

# use your `key` and `endpoint` environment variables
key = os.environ.get('DI_KEY')
endpoint = os.environ.get('DI_ENDPOINT')

# formatting function
def format_address_value(address_value):
    return f"\n......House/building number: {address_value.house_number}\n......Road: {address_value.road}\n......City: {address_value.city}\n......State: {address_value.state}\n......Postal code: {address_value.postal_code}"


def analyze_tax_us_w2():
    # sample document
    formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png"

    client = DocumentIntelligenceClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

    poller = client.begin_analyze_document(
        "prebuilt-tax.us.w2",  AnalyzeDocumentRequest(url_source=formUrl
    ))

    w2s: AnalyzeResult =  poller.result()

        if w2s.documents:
        for idx, w2 in enumerate(w2s.documents):
            print(f"--------Analyzing US Tax W-2 Form #{idx + 1}--------")
            if w2.fields:
                form_variant = w2.fields.get("W2FormVariant")
                if form_variant:
                    print(
                        f"Form variant: {form_variant.get('valueString')} has confidence: " f"{form_variant.confidence}"
                    )
                tax_year = w2.fields.get("TaxYear")
                if tax_year:
                    print(f"Tax year: {tax_year.get('valueString')} has confidence: {tax_year.confidence}")
                w2_copy = w2.fields.get("W2Copy")
                if w2_copy:
                    print(f"W-2 Copy: {w2_copy.get('valueString')} has confidence: {w2_copy.confidence}")
                employee = w2.fields.get("Employee")
                if employee:
                    print("Employee data:")
                    employee_name = employee.get("valueObject").get("Name")
                    if employee_name:
                        f"confidence: {fed_income_tax_withheld.confidence}"
                    )
                social_security_wages = w2.fields.get("SocialSecurityWages")
                if social_security_wages:
                    print(
                        f"Social Security wages: {social_security_wages.get('valueNumber')} has confidence: "
                        f"{social_security_wages.confidence}"
                    )
                social_security_tax_withheld = w2.fields.get("SocialSecurityTaxWithheld")
                if social_security_tax_withheld:
                    print(
                        f"Social Security tax withheld: {social_security_tax_withheld.get('valueNumber')} "
                        f"has confidence: {social_security_tax_withheld.confidence}"
                    )
                medicare_wages_tips = w2.fields.get("MedicareWagesAndTips")
                if medicare_wages_tips:
                    print(
                        f"Medicare wages and tips: {medicare_wages_tips.get('valueNumber')} has confidence: "
                        f"{medicare_wages_tips.confidence}"
                    )
                medicare_tax_withheld = w2.fields.get("MedicareTaxWithheld")
                if medicare_tax_withheld:
                    print(
                        f"Medicare tax withheld: {medicare_tax_withheld.get('valueNumber')} has confidence: "
                        f"{medicare_tax_withheld.confidence}"
                    )
                social_security_tips = w2.fields.get("SocialSecurityTips")
                if social_security_tips:
                    print(
                        f"Social Security tips: {social_security_tips.get('valueNumber')} has confidence: "
                        f"{social_security_tips.confidence}"
                    )
                allocated_tips = w2.fields.get("AllocatedTips")
                if allocated_tips:
                    print(
                        f"Allocated tips: {allocated_tips.get('valueNumber')} has confidence: {allocated_tips.confidence}"
                    )
                verification_code = w2.fields.get("VerificationCode")
                if verification_code:
                    print(
                        f"Verification code: {verification_code.get('valueNumber')} has confidence: {verification_code.confidence}"
                    )
                dependent_care_benefits = w2.fields.get("DependentCareBenefits")
                if dependent_care_benefits:
                    print(
                        f"Dependent care benefits: {dependent_care_benefits.get('valueNumber')} has confidence: {dependent_care_benefits.confidence}"
                    )
                non_qualified_plans = w2.fields.get("NonQualifiedPlans")
                if non_qualified_plans:
                    print(
                        f"Non-qualified plans: {non_qualified_plans.get('valueNumber')} has confidence: {non_qualified_plans.confidence}"
                    )
                additional_info = w2.fields.get("AdditionalInfo")
                if additional_info:
                    print("Additional information:")
                    for item in additional_info.get("valueArray"):
                        letter_code = item.get("valueObject").get("LetterCode")
                        if letter_code:
                            print(
                                f"...Letter code: {letter_code.get('valueString')} has confidence: {letter_code.confidence}"
                            )
                        amount = item.get("valueObject").get("Amount")
                        if amount:
                            print(f"...Amount: {amount.get('valueNumber')} has confidence: {amount.confidence}")
                is_statutory_employee = w2.fields.get("IsStatutoryEmployee")
                if is_statutory_employee:
                    print(
                        f"Is statutory employee: {is_statutory_employee.get('valueString')} has confidence: {is_statutory_employee.confidence}"
                    )
                is_retirement_plan = w2.fields.get("IsRetirementPlan")
                if is_retirement_plan:
                    print(
                        f"Is retirement plan: {is_retirement_plan.get('valueString')} has confidence: {is_retirement_plan.confidence}"
                    )
                third_party_sick_pay = w2.fields.get("IsThirdPartySickPay")
                if third_party_sick_pay:
                    print(
                        f"Is third party sick pay: {third_party_sick_pay.get('valueString')} has confidence: {third_party_sick_pay.confidence}"
                    )
                other_info = w2.fields.get("Other")
                if other_info:
                    print(f"Other information: {other_info.get('valueString')} has confidence: {other_info.confidence}")
                state_tax_info = w2.fields.get("StateTaxInfos")
                if state_tax_info:
                    print("State Tax info:")
                    for tax in state_tax_info.get("valueArray"):
                        state = tax.get("valueObject").get("State")
                        if state:
                            print(f"...State: {state.get('valueString')} has confidence: {state.confidence}")
                        employer_state_id_number = tax.get("valueObject").get("EmployerStateIdNumber")
                        if employer_state_id_number:
                            print(
                                f"...Employer state ID number: {employer_state_id_number.get('valueString')} has "
                                f"confidence: {employer_state_id_number.confidence}"
                            )
                        state_wages_tips = tax.get("valueObject").get("StateWagesTipsEtc")
                        if state_wages_tips:
                            print(
                                f"...State wages, tips, etc: {state_wages_tips.get('valueNumber')} has confidence: "
                                f"{state_wages_tips.confidence}"
                            )
                        state_income_tax = tax.get("valueObject").get("StateIncomeTax")
                        if state_income_tax:
                            print(
                                f"...State income tax: {state_income_tax.get('valueNumber')} has confidence: "
                                f"{state_income_tax.confidence}"
                            )
                local_tax_info = w2.fields.get("LocalTaxInfos")
                if local_tax_info:
                    print("Local Tax info:")
                    for tax in local_tax_info.get("valueArray"):
                        local_wages_tips = tax.get("valueObject").get("LocalWagesTipsEtc")
                        if local_wages_tips:
                            print(
                                f"...Local wages, tips, etc: {local_wages_tips.get('valueNumber')} has confidence: "
                                f"{local_wages_tips.confidence}"
                            )
                        local_income_tax = tax.get("valueObject").get("LocalIncomeTax")
                        if local_income_tax:
                            print(
                                f"...Local income tax: {local_income_tax.get('valueNumber')} has confidence: "
                                f"{local_income_tax.confidence}"
                            )
                        locality_name = tax.get("valueObject").get("LocalityName")
                        if locality_name:
                            print(
                                f"...Locality name: {locality_name.get('valueString')} has confidence: "
                                f"{locality_name.confidence}"
                            )


                print("----------------------------------------")


if __name__ == "__main__":
    analyze_tax_us_w2()

```

> 
> [View complete code on GitHub.](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/Python(v4.0)/Prebuilt_model/sample_analyze_tax_us_w2.py) [More samples](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/Python(v4.0)/Prebuilt_model)

Visit the Azure samples repository on GitHub and view the [W-2 tax model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/w2-tax-model-output.md).

## Use the Invoice model

```python
import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeResult
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest

# use your `key` and `endpoint` environment variables
key = os.environ.get('DI_KEY')
endpoint = os.environ.get('DI_ENDPOINT')

def analyze_invoice():

    invoiceUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-invoice.pdf"

    client = DocumentIntelligenceClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

    poller = client.begin_analyze_document(
        "prebuilt-invoice", AnalyzeDocumentRequest(url_source=formUrl), locale="en-US")

    result: AnalyzeResult = poller.result()

    if invoices.documents:
        for idx, invoice in enumerate(invoices.documents):
            print(f"--------Analyzing invoice #{idx + 1}--------")
            if invoice.fields:
                vendor_name = invoice.fields.get("VendorName")
                if vendor_name:
                    print(f"Vendor Name: {vendor_name.get('content')} has confidence: {vendor_name.get('confidence')}")
                vendor_address = invoice.fields.get("VendorAddress")
                if vendor_address:
                    print(
                        f"Vendor Address: {vendor_address.get('content')} has confidence: {vendor_address.get('confidence')}"
                    )
                vendor_address_recipient = invoice.fields.get("VendorAddressRecipient")
                if vendor_address_recipient:
                    print(
                        f"Vendor Address Recipient: {vendor_address_recipient.get('content')} has confidence: {vendor_address_recipient.get('confidence')}"
                    )
                customer_name = invoice.fields.get("CustomerName")
                if customer_name:
                    print(
                        f"Customer Name: {customer_name.get('content')} has confidence: {customer_name.get('confidence')}"
                    )
                customer_id = invoice.fields.get("CustomerId")
                if invoice_id:
                    print(f"Invoice Id: {invoice_id.get('content')} has confidence: {invoice_id.get('confidence')}")
                invoice_date = invoice.fields.get("InvoiceDate")
                if invoice_date:
                    print(
                        f"Invoice Date: {invoice_date.get('content')} has confidence: {invoice_date.get('confidence')}"
                    )
                invoice_total = invoice.fields.get("InvoiceTotal")
                if invoice_total:
                    print(
                        f"Invoice Total: {invoice_total.get('content')} has confidence: {invoice_total.get('confidence')}"
                    )
                due_date = invoice.fields.get("DueDate")
                if due_date:
                    print(f"Due Date: {due_date.get('content')} has confidence: {due_date.get('confidence')}")
                purchase_order = invoice.fields.get("PurchaseOrder")
                if purchase_order:
                    print(
                        f"Purchase Order: {purchase_order.get('content')} has confidence: {purchase_order.get('confidence')}"
                    )
                billing_address = invoice.fields.get("BillingAddress")
                if billing_address:
                    print(
                        f"Billing Address: {billing_address.get('content')} has confidence: {billing_address.get('confidence')}"
                    )
                billing_address_recipient = invoice.fields.get("BillingAddressRecipient")
                if billing_address_recipient:
                    print(
                        f"Billing Address Recipient: {billing_address_recipient.get('content')} has confidence: {billing_address_recipient.get('confidence')}"
                    )
                shipping_address = invoice.fields.get("ShippingAddress")
                if shipping_address:
                    print(
                        f"Shipping Address: {shipping_address.get('content')} has confidence: {shipping_address.get('confidence')}"
                    )
                shipping_address_recipient = invoice.fields.get("ShippingAddressRecipient")
                if shipping_address_recipient:
                    print(
                        f"Shipping Address Recipient: {shipping_address_recipient.get('content')} has confidence: {shipping_address_recipient.get('confidence')}"
                    )
                print("Invoice items:")
                items = invoice.fields.get("Items")
                if items:
                    for idx, item in enumerate(items.get("valueArray")):
                        print(f"...Item #{idx + 1}")
                        item_description = item.get("valueObject").get("Description")
                        if item_description:
                            print(
                                f"......Description: {item_description.get('content')} has confidence: {item_description.get('confidence')}"
                            )
                        item_quantity = item.get("valueObject").get("Quantity")
                        if item_quantity:
                            print(
                                f"......Quantity: {item_quantity.get('content')} has confidence: {item_quantity.get('confidence')}"
                            )
                        unit = item.get("valueObject").get("Unit")
                        if unit:
                            print(f"......Unit: {unit.get('content')} has confidence: {unit.get('confidence')}")
                        unit_price = item.get("valueObject").get("UnitPrice")
                        if unit_price:
                            unit_price_code = (
                                unit_price.get("valueCurrency").get("currencyCode")
                                if unit_price.get("valueCurrency").get("currencyCode")
                                else ""
                            )
                            print(
                                f"......Unit Price: {unit_price.get('content')}{unit_price_code} has confidence: {unit_price.get('confidence')}"
                            )
                        product_code = item.get("valueObject").get("ProductCode")
                        if product_code:
                            print(
                                f"......Product Code: {product_code.get('content')} has confidence: {product_code.get('confidence')}"
                            )
                        item_date = item.get("valueObject").get("Date")
                        if item_date:
                            print(
                                f"......Date: {item_date.get('content')} has confidence: {item_date.get('confidence')}"
                            )
                        tax = item.get("valueObject").get("Tax")
                        if tax:
                            print(f"......Tax: {tax.get('content')} has confidence: {tax.get('confidence')}")
                        amount = item.get("valueObject").get("Amount")
                        if amount:
                            print(f"......Amount: {amount.get('content')} has confidence: {amount.get('confidence')}")
                subtotal = invoice.fields.get("SubTotal")
                if subtotal:
                    print(f"Subtotal: {subtotal.get('content')} has confidence: {subtotal.get('confidence')}")
                total_tax = invoice.fields.get("TotalTax")
                if total_tax:
                    print(f"Total Tax: {total_tax.get('content')} has confidence: {total_tax.get('confidence')}")
                previous_unpaid_balance = invoice.fields.get("PreviousUnpaidBalance")
                if previous_unpaid_balance:
                    print(
                        f"Previous Unpaid Balance: {previous_unpaid_balance.get('content')} has confidence: {previous_unpaid_balance.get('confidence')}"
                    )
                amount_due = invoice.fields.get("AmountDue")
                if amount_due:
                    print(f"Amount Due: {amount_due.get('content')} has confidence: {amount_due.get('confidence')}")
                service_start_date = invoice.fields.get("ServiceStartDate")
                if service_start_date:
                    print(
                        f"Service Start Date: {service_start_date.get('content')} has confidence: {service_start_date.get('confidence')}"
                    )
                service_end_date = invoice.fields.get("ServiceEndDate")
                if service_end_date:
                    print(
                        f"Service End Date: {service_end_date.get('content')} has confidence: {service_end_date.get('confidence')}"
                    )
                service_address = invoice.fields.get("ServiceAddress")
                if service_address:
                    print(
                        f"Service Address: {service_address.get('content')} has confidence: {service_address.get('confidence')}"
                    )
                service_address_recipient = invoice.fields.get("ServiceAddressRecipient")
                if service_address_recipient:
                    print(
                        f"Service Address Recipient: {service_address_recipient.get('content')} has confidence: {service_address_recipient.get('confidence')}"
                    )
                remittance_address = invoice.fields.get("RemittanceAddress")
                if remittance_address:
                    print(
                        f"Remittance Address: {remittance_address.get('content')} has confidence: {remittance_address.get('confidence')}"
                    )
                remittance_address_recipient = invoice.fields.get("RemittanceAddressRecipient")
                if remittance_address_recipient:
                    print(
                        f"Remittance Address Recipient: {remittance_address_recipient.get('content')} has confidence: {remittance_address_recipient.get('confidence')}"
                    )


        print("----------------------------------------")

if __name__ == "__main__":
    analyze_invoice()

```

> 
> [View complete code on GitHub.](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/Python(v4.0)/Prebuilt_model/sample_analyze_invoices.py) [More samples](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/Python(v4.0)/Prebuilt_model)

Visit the Azure samples repository on GitHub and view the [invoice model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/invoice-model-output.md).

## Use the Receipt model

```python
import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeResult
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest

# use your `key` and `endpoint` environment variables
key = os.environ.get('DI_KEY')
endpoint = os.environ.get('DI_ENDPOINT')

def analyze_receipts():
    # sample document
    receiptUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png"

   client = DocumentIntelligenceClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )
    poller = client.begin_analyze_document(
        "prebuilt-receipt", AnalyzeDocumentRequest(url_source=receiptUrl), locale="en-US"
    )
    receipts: AnalyzeResult = poller.result()

    if receipts.documents:
        for idx, receipt in enumerate(receipts.documents):
            print(f"--------Analysis of receipt #{idx + 1}--------")
            print(f"Receipt type: {receipt.doc_type if receipt.doc_type else 'N/A'}")
            if receipt.fields:
                merchant_name = receipt.fields.get("MerchantName")
                if merchant_name:
                    print(
                        f"Merchant Name: {merchant_name.get('valueString')} has confidence: "
                        f"{merchant_name.confidence}"
                    )
                transaction_date = receipt.fields.get("TransactionDate")
                if transaction_date:
                    print(
                        f"Transaction Date: {transaction_date.get('valueDate')} has confidence: "
                        f"{transaction_date.confidence}"
                    )
                items = receipt.fields.get("Items")
                if items:
                    print("Receipt items:")
                    for idx, item in enumerate(items.get("valueArray")):
                        print(f"...Item #{idx + 1}")
                        item_description = item.get("valueObject").get("Description")
                        if item_description:
                            print(
                                f"......Item Description: {item_description.get('valueString')} has confidence: "
                                f"{item_description.confidence}"
                            )
                        item_quantity = item.get("valueObject").get("Quantity")
                        if item_quantity:
                            print(
                                f"......Item Quantity: {item_quantity.get('valueString')} has confidence: "
                                f"{item_quantity.confidence}"
                            )
                        item_total_price = item.get("valueObject").get("TotalPrice")
                        if item_total_price:
                            print(
                                f"......Total Item Price: {format_price(item_total_price.get('valueCurrency'))} has confidence: "
                                f"{item_total_price.confidence}"
                            )
                subtotal = receipt.fields.get("Subtotal")
                if subtotal:
                    print(
                        f"Subtotal: {format_price(subtotal.get('valueCurrency'))} has confidence: {subtotal.confidence}"
                    )
                tax = receipt.fields.get("TotalTax")
                if tax:
                    print(f"Total tax: {format_price(tax.get('valueCurrency'))} has confidence: {tax.confidence}")
                tip = receipt.fields.get("Tip")
                if tip:
                    print(f"Tip: {format_price(tip.get('valueCurrency'))} has confidence: {tip.confidence}")
                total = receipt.fields.get("Total")
                if total:
                    print(f"Total: {format_price(total.get('valueCurrency'))} has confidence: {total.confidence}")
            print("--------------------------------------")



if __name__ == "__main__":
    analyze_receipts()

```

> 
> [View complete code on GitHub.](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/Python(v4.0)/Prebuilt_model/sample_analyze_receipts.py) [More samples](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/Python(v4.0)/Prebuilt_model)

Visit the Azure samples repository on GitHub and view the [receipt model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/receipt-model-output.md).

## Use the ID document model

```python
import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeResult
from azure.ai.documentintelligence.models import AnalyzeDocumentRequest

# use your `key` and `endpoint` environment variables
key = os.environ.get('DI_KEY')
endpoint = os.environ.get('DI_ENDPOINT')

def analyze_identity_documents():
# sample document
    identityUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png"

   client = DocumentIntelligenceClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

    poller =client.begin_analyze_document(
            "prebuilt-idDocument", AnalyzeDocumentRequest(url_source=identityUrl)
        )
     id_documents: AnalyzeResult = poller.result()

    if id_documents.documents:
        for idx, id_document in enumerate(id_documents.documents):
            print(f"--------Analyzing ID document #{idx + 1}--------")
            if id_document.fields:
                first_name = id_document.fields.get("FirstName")
                if first_name:
                    print(f"First Name: {first_name.get('valueString')} has confidence: {first_name.confidence}")
                last_name = id_document.fields.get("LastName")
                if last_name:
                    print(f"Last Name: {last_name.get('valueString')} has confidence: {last_name.confidence}")
                document_number = id_document.fields.get("DocumentNumber")
                if document_number:
                    print(
                        f"Document Number: {document_number.get('valueString')} has confidence: {document_number.confidence}"
                    )
                dob = id_document.fields.get("DateOfBirth")
                if dob:
                    print(f"Date of Birth: {dob.get('valueDate')} has confidence: {dob.confidence}")
                doe = id_document.fields.get("DateOfExpiration")
                if doe:
                    print(f"Date of Expiration: {doe.get('valueDate')} has confidence: {doe.confidence}")
                sex = id_document.fields.get("Sex")
                if sex:
                    print(f"Sex: {sex.get('valueString')} has confidence: {sex.confidence}")
                address = id_document.fields.get("Address")
                if address:
                    print(f"Address: {address.get('valueString')} has confidence: {address.confidence}")
                country_region = id_document.fields.get("CountryRegion")
                if country_region:
                    print(
                        f"Country/Region: {country_region.get('valueCountryRegion')} has confidence: {country_region.confidence}"
                    )
                region = id_document.fields.get("Region")
                if region:
                    print(f"Region: {region.get('valueString')} has confidence: {region.confidence}")


        print("--------------------------------------")

if __name__ == "__main__":
    analyze_identity_documents()

```

> 
> [View complete code on GitHub.](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/Python(v4.0)/Prebuilt_model/sample_analyze_identity_documents.py) [More samples](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/main/Python(v4.0)/Prebuilt_model)

Visit the Azure samples repository on GitHub and view the [ID document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/id-document-output.md).



**Applies to: doc-intel-3.1.0 || doc-intel-3.0.0**


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD034 -->

**Applies to: doc-intel-3.1.0**
[Client library](https://learn.microsoft.com/python/api/overview/azure/ai-formrecognizer-readme?view=azure-python\&preserve-view=true) |[REST API reference](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP) | [Package (PyPi)](https://pypi.org/project/azure-ai-formrecognizer/3.3.0/) | [Samples](https://github.com/Azure/azure-sdk-for-python/tree/azure-ai-formrecognizer_3.3.0/sdk/formrecognizer/azure-ai-formrecognizer/samples) | [Supported REST API versions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v3-1.md#supported-programming-languages)


**Applies to: doc-intel-3.0.0**
[Client library](https://learn.microsoft.com/python/api/overview/azure/ai-formrecognizer-readme?view=azure-python-previous\&preserve-view=true) |[REST API reference](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-v3.0%20\(2022-08-31\)\&preserve-view=true\&tabs=HTTP) | [Package (PyPi)](https://pypi.org/project/azure-ai-formrecognizer/3.2.0b6/) | [Samples](https://github.com/Azure/azure-sdk-for-python/tree/azure-ai-formrecognizer_3.2.0b6/sdk/formrecognizer/azure-ai-formrecognizer/samples) | [Supported REST API versions](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v3-0.md#supported-programming-languages)


## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Python 3.7 or later](https://www.python.org/). Your Python installation should include [pip](https://pip.pypa.io/en/stable/). You can check whether you have pip installed by running `pip --version` on the command line. Get pip by installing the latest version of Python.
- The latest version of [Visual Studio Code](https://code.visualstudio.com/) or your preferred IDE. See [Getting Started with Python in Visual Studio Code](https://code.visualstudio.com/docs/python/python-tutorial).
- A Foundry Tools or Document Intelligence resource. Create a <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource." target="_blank">single-service</a> or <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a multiple Document Intelligence resource." target="_blank">multi-service</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

- A document file at a URL. For this project, you can use the sample forms provided in the following table for each feature:

  | Feature | modelID | document-url |
  | --- | --- | --- |
  | **Read model** | prebuilt-read | [Sample brochure](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png) |
  | **Layout model** | prebuilt-layout | [Sample booking confirmation](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png) |
  | **W-2 form model** | prebuilt-tax.us.w2 | [Sample W-2 form](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png) |
  | **Invoice model** | prebuilt-invoice | [Sample invoice](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf) |
  | **Receipt model** | prebuilt-receipt | [Sample receipt](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png) |
  | **ID document model** | prebuilt-idDocument | [Sample ID document](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png) |
  | **Business card model** | prebuilt-businessCard | [Sample business card](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/business-card-english.jpg) |


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

## Set your environment variables

To interact with the Document Intelligence service, you need to create an instance of the `DocumentAnalysisClient` class. To do so, instantiate the client with your `key` and `endpoint` from the Azure portal. For this project, use environment variables to store and access credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

To set the environment variable for your Document Intelligence resource key, open a console window, and follow the instructions for your operating system and development environment. Replace *\<yourKey>* and *\<yourEndpoint>* with the values from your resource in the Azure portal.

#### [Windows](#tab/windows)

Environment variables in Windows aren't case-sensitive. They're typically declared in uppercase, with words joined by an underscore. At a command prompt, run the following commands:

1. Set your key variable:

   ```console
   setx DI_KEY <yourKey>
   ```

1. Set your endpoint variable

   ```console
   setx DI_ENDPOINT <yourEndpoint>
   ```

1. Close the Command Prompt window after you set your environment variables. The values remain until you change them again.

1. Restart any running programs that read the environment variable. For example, if you're using Visual Studio or Visual Studio Code as your editor, restart before running the sample code.

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `setx VARIABLE_NAME=` | Delete the environment variable by setting the value to an empty string. | `setx DI_KEY=` |
| `setx VARIABLE_NAME=value` | Set or change the value of an environment variable. | `setx DI_KEY=<yourKey>` |
| `set VARIABLE_NAME` | Display the value of a specific environment variable. | `set  DI_KEY` |
| `set` | Display all environment variables. | `set` |

#### [macOS](#tab/macOS)

Environment variables in macOS are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session. Open your terminal and enter the following commands:

1. Set your key variable:

   ```bash
   export key=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export endpoint=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash  `~/.bash_profile` startup script:

  1. Use a text editor to open the *~/.bash_profile* file and add the following command to create a permanent environment variable:

     ```bash
     export DI_KEY=<yourKey> DI_ENDPOINT=<yourEndpoint>
     ```

     Example: `export DI_KEY="<yourKey>"`

  1. Save your changes to the *bash_profile* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bash-profile
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY=<yourKey>` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of a specific environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

#### [Linux](#tab/linux)

Environment variables in Linux are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session:

1. Set your key variable:

   ```bash
   export DI_KEY=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export DI_ENDPOINT=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash `~/.bashrc` startup script:

  1. Use a text editor to open the *~/.bashrc* file and add the following command to create a permanent environment variable:

     ```bash
     export <VARIABLE>=<value>
     ```

     Example: `export DI_KEY=<yourKey>`

  1. Save your changes to the *.bashrc* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bashrc
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY=` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY={yourKey}` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of an environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

---


## Set up your programming environment

Open a console window in your local environment and install the Azure Document Intelligence in Foundry Tools client library for Python with pip:

```console
pip install azure-ai-formrecognizer==3.2.0
```

## Create your Python application

To interact with the Document Intelligence service, you need to create an instance of the `DocumentAnalysisClient` class. To do so, you create an `AzureKeyCredential` with your key from the Azure portal and a `DocumentAnalysisClient` instance with the `AzureKeyCredential` and your Document Intelligence endpoint.

1. Create a new Python file called *form_recognizer_quickstart.py* in an editor or IDE.

1. Open the *form_recognizer_quickstart.py* file and select one of the following code samples and copy/paste into your application:

   - The [prebuilt-read](#use-the-read-model) model is at the core of all Document Intelligence models and can detect lines, words, locations, and languages. The layout, general document, prebuilt, and custom models all use the `read` model as a foundation for extracting texts from documents.
   - The [prebuilt-layout](#use-the-layout-model) model extracts text and text locations, tables, selection marks, and structure information from documents and images.
   - The [prebuilt-tax.us.w2](#use-the-w-2-tax-model) model extracts information reported on US Internal Revenue Service (IRS) tax forms.
   - The [prebuilt-invoice](#use-the-invoice-model) model extracts key fields and line items from sales invoices in various formats.
   - The [prebuilt-receipt](#use-the-receipt-model) model extracts key information from printed and handwritten sales receipts.
   - The [prebuilt-idDocument](#use-the-id-document-model) model extracts key information from US Drivers Licenses; international passport biographical pages; US state IDs; social security cards; and permanent resident cards.
1. Run the Python code from the command prompt.

   ```python
   python form_recognizer_quickstart.py
   ```

## Use the Read model

```python
import os
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential

# use your `key` and `endpoint` environment variables
key = os.environ.get('FR_KEY')
endpoint = os.environ.get('FR_ENDPOINT')

# formatting function
def format_polygon(polygon):
    if not polygon:
        return "N/A"
    return ", ".join(["[{}, {}]".format(p.x, p.y) for p in polygon])


def analyze_read():
    # sample document
    formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png"

    document_analysis_client = DocumentAnalysisClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

    poller = document_analysis_client.begin_analyze_document_from_url(
        "prebuilt-read", formUrl
    )
    result = poller.result()

    print("Document contains content: ", result.content)

    for idx, style in enumerate(result.styles):
        print(
            "Document contains {} content".format(
                "handwritten" if style.is_handwritten else "no handwritten"
            )
        )

    for page in result.pages:
        print("----Analyzing Read from page #{}----".format(page.page_number))
        print(
            "Page has width: {} and height: {}, measured with unit: {}".format(
                page.width, page.height, page.unit
            )
        )

        for line_idx, line in enumerate(page.lines):
            print(
                "...Line # {} has text content '{}' within bounding box '{}'".format(
                    line_idx,
                    line.content,
                    format_polygon(line.polygon),
                )
            )

        for word in page.words:
            print(
                "...Word '{}' has a confidence of {}".format(
                    word.content, word.confidence
                )
            )

    print("----------------------------------------")


if __name__ == "__main__":
    analyze_read()

```

> 
> [View complete code on GitHub.](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/v3.1(2023-07-31-GA)/Python(v3.1)/Read_model/sample_analyze_read.py) [More samples](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/v3.1(2023-07-31-GA)/Python(v3.1)/Read_model)

Visit the Azure samples repository on GitHub and view the [`read` model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/read-model-output.md).

## Use the Layout model

```python
import os
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential

# use your `key` and `endpoint` environment variables
key = os.environ.get('FR_KEY')
endpoint = os.environ.get('FR_ENDPOINT')

# formatting function
def format_polygon(polygon):
    if not polygon:
        return "N/A"
    return ", ".join(["[{}, {}]".format(p.x, p.y) for p in polygon])


def analyze_layout():
    # sample document
    formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png"

    document_analysis_client = DocumentAnalysisClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

    poller = document_analysis_client.begin_analyze_document_from_url(
        "prebuilt-layout", formUrl
    )
    result = poller.result()

    for idx, style in enumerate(result.styles):
        print(
            "Document contains {} content".format(
                "handwritten" if style.is_handwritten else "no handwritten"
            )
        )

    for page in result.pages:
        print("----Analyzing layout from page #{}----".format(page.page_number))
        print(
            "Page has width: {} and height: {}, measured with unit: {}".format(
                page.width, page.height, page.unit
            )
        )

        for line_idx, line in enumerate(page.lines):
            words = line.get_words()
            print(
                "...Line # {} has word count {} and text '{}' within bounding box '{}'".format(
                    line_idx,
                    len(words),
                    line.content,
                    format_polygon(line.polygon),
                )
            )

            for word in words:
                print(
                    "......Word '{}' has a confidence of {}".format(
                        word.content, word.confidence
                    )
                )

        for selection_mark in page.selection_marks:
            print(
                "...Selection mark is '{}' within bounding box '{}' and has a confidence of {}".format(
                    selection_mark.state,
                    format_polygon(selection_mark.polygon),
                    selection_mark.confidence,
                )
            )

    for table_idx, table in enumerate(result.tables):
        print(
            "Table # {} has {} rows and {} columns".format(
                table_idx, table.row_count, table.column_count
            )
        )
        for region in table.bounding_regions:
            print(
                "Table # {} location on page: {} is {}".format(
                    table_idx,
                    region.page_number,
                    format_polygon(region.polygon),
                )
            )
        for cell in table.cells:
            print(
                "...Cell[{}][{}] has content '{}'".format(
                    cell.row_index,
                    cell.column_index,
                    cell.content,
                )
            )
            for region in cell.bounding_regions:
                print(
                    "...content on page {} is within bounding box '{}'".format(
                        region.page_number,
                        format_polygon(region.polygon),
                    )
                )

    print("----------------------------------------")


if __name__ == "__main__":
    analyze_layout()

```

> 
> [View complete code on GitHub.](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/v3.1(2023-07-31-GA)/Python(v3.1)/Layout_model/sample_analyze_layout.py) [More samples](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/v3.1(2023-07-31-GA)/Python(v3.1)/Layout_model)

Visit the Azure samples repository on GitHub and view the [layout model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/layout-model-output.md).

## Use the General document model

```python
import os
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential

# use your `key` and `endpoint` environment variables
key = os.environ.get('FR_KEY')
endpoint = os.environ.get('FR_ENDPOINT')

# formatting function
def format_bounding_region(bounding_regions):
    if not bounding_regions:
        return "N/A"
    return ", ".join("Page #{}: {}".format(region.page_number, format_polygon(region.polygon)) for region in bounding_regions)

# formatting function
def format_polygon(polygon):
    if not polygon:
        return "N/A"
    return ", ".join(["[{}, {}]".format(p.x, p.y) for p in polygon])


def analyze_general_documents():
    # sample document
    docUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf"

    # create your `DocumentAnalysisClient` instance and `AzureKeyCredential` variable
    document_analysis_client = DocumentAnalysisClient(endpoint=endpoint, credential=AzureKeyCredential(key))

    poller = document_analysis_client.begin_analyze_document_from_url(
            "prebuilt-document", docUrl)
    result = poller.result()

    for style in result.styles:
        if style.is_handwritten:
            print("Document contains handwritten content: ")
            print(",".join([result.content[span.offset:span.offset + span.length] for span in style.spans]))

    print("----Key-value pairs found in document----")
    for kv_pair in result.key_value_pairs:
        if kv_pair.key:
            print(
                    "Key '{}' found within '{}' bounding regions".format(
                        kv_pair.key.content,
                        format_bounding_region(kv_pair.key.bounding_regions),
                    )
                )
        if kv_pair.value:
            print(
                    "Value '{}' found within '{}' bounding regions\n".format(
                        kv_pair.value.content,
                        format_bounding_region(kv_pair.value.bounding_regions),
                    )
                )

    for page in result.pages:
        print("----Analyzing document from page #{}----".format(page.page_number))
        print(
            "Page has width: {} and height: {}, measured with unit: {}".format(
                page.width, page.height, page.unit
            )
        )

        for line_idx, line in enumerate(page.lines):
            print(
                "...Line # {} has text content '{}' within bounding box '{}'".format(
                    line_idx,
                    line.content,
                    format_polygon(line.polygon),
                )
            )

        for word in page.words:
            print(
                "...Word '{}' has a confidence of {}".format(
                    word.content, word.confidence
                )
            )

        for selection_mark in page.selection_marks:
            print(
                "...Selection mark is '{}' within bounding box '{}' and has a confidence of {}".format(
                    selection_mark.state,
                    format_polygon(selection_mark.polygon),
                    selection_mark.confidence,
                )
            )

    for table_idx, table in enumerate(result.tables):
        print(
            "Table # {} has {} rows and {} columns".format(
                table_idx, table.row_count, table.column_count
            )
        )
        for region in table.bounding_regions:
            print(
                "Table # {} location on page: {} is {}".format(
                    table_idx,
                    region.page_number,
                    format_polygon(region.polygon),
                )
            )
        for cell in table.cells:
            print(
                "...Cell[{}][{}] has content '{}'".format(
                    cell.row_index,
                    cell.column_index,
                    cell.content,
                )
            )
            for region in cell.bounding_regions:
                print(
                    "...content on page {} is within bounding box '{}'\n".format(
                        region.page_number,
                        format_polygon(region.polygon),
                    )
                )
    print("----------------------------------------")


if __name__ == "__main__":
    analyze_general_documents()

```

Visit the Azure samples repository on GitHub and view the [general document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/general-document-model-output.md).

## Use the W-2 tax model

```python
import os
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential

# use your `key` and `endpoint` environment variables
key = os.environ.get('FR_KEY')
endpoint = os.environ.get('FR_ENDPOINT')

# formatting function
def format_address_value(address_value):
    return f"\n......House/building number: {address_value.house_number}\n......Road: {address_value.road}\n......City: {address_value.city}\n......State: {address_value.state}\n......Postal code: {address_value.postal_code}"


def analyze_tax_us_w2():
    # sample document
    formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png"

    document_analysis_client = DocumentAnalysisClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

    poller = document_analysis_client.begin_analyze_document_from_url(
        "prebuilt-tax.us.w2", formUrl
    )
    w2s = poller.result()

    for idx, w2 in enumerate(w2s.documents):
         print("--------Analyzing US Tax W-2 Form #{}--------".format(idx   1))
        form_variant = w2.fields.get("W2FormVariant")
        if form_variant:
            print(
                "Form variant: {} has confidence: {}".format(
                    form_variant.value, form_variant.confidence
                )
            )
        tax_year = w2.fields.get("TaxYear")
        if tax_year:
            print(
                "Tax year: {} has confidence: {}".format(
                    tax_year.value, tax_year.confidence
                )
            )
        w2_copy = w2.fields.get("W2Copy")
        if w2_copy:
            print(
                "W-2 Copy: {} has confidence: {}".format(
                    w2_copy.value,
                    w2_copy.confidence,
                )
            )
        employee = w2.fields.get("Employee")
        if employee:
            print("Employee data:")
            employee_name = employee.value.get("Name")
            if employee_name:
                print(
                    "...Name: {} has confidence: {}".format(
                        employee_name.value, employee_name.confidence
                    )
                )
            employee_ssn = employee.value.get("SocialSecurityNumber")
            if employee_ssn:
                print(
                    "...SSN: {} has confidence: {}".format(
                        employee_ssn.value, employee_ssn.confidence
                    )
                )
            employee_address = employee.value.get("Address")
            if employee_address:
                print(
                    "...Address: {}\n......has confidence: {}".format(
                        format_address_value(employee_address.value),
                        employee_address.confidence,
                    )
                )
            employee_zipcode = employee.value.get("ZipCode")
            if employee_zipcode:
                print(
                    "...Zipcode: {} has confidence: {}".format(
                        employee_zipcode.value, employee_zipcode.confidence
                    )
                )
        control_number = w2.fields.get("ControlNumber")
        if control_number:
            print(
                "Control Number: {} has confidence: {}".format(
                    control_number.value, control_number.confidence
                )
            )
        employer = w2.fields.get("Employer")
        if employer:
            print("Employer data:")
            employer_name = employer.value.get("Name")
            if employer_name:
                print(
                    "...Name: {} has confidence: {}".format(
                        employer_name.value, employer_name.confidence
                    )
                )
            employer_id = employer.value.get("IdNumber")
            if employer_id:
                print(
                    "...ID Number: {} has confidence: {}".format(
                        employer_id.value, employer_id.confidence
                    )
                )
            employer_address = employer.value.get("Address")
            if employer_address:
                print(
                    "...Address: {}\n......has confidence: {}".format(
                        format_address_value(employer_address.value),
                        employer_address.confidence,
                    )
                )
            employer_zipcode = employer.value.get("ZipCode")
            if employer_zipcode:
                print(
                    "...Zipcode: {} has confidence: {}".format(
                        employer_zipcode.value, employer_zipcode.confidence
                    )
                )
        wages_tips = w2.fields.get("WagesTipsAndOtherCompensation")
        if wages_tips:
            print(
                "Wages, tips, and other compensation: {} has confidence: {}".format(
                    wages_tips.value,
                    wages_tips.confidence,
                )
            )
        fed_income_tax_withheld = w2.fields.get("FederalIncomeTaxWithheld")
        if fed_income_tax_withheld:
            print(
                "Federal income tax withheld: {} has confidence: {}".format(
                    fed_income_tax_withheld.value, fed_income_tax_withheld.confidence
                )
            )
        social_security_wages = w2.fields.get("SocialSecurityWages")
        if social_security_wages:
            print(
                "Social Security wages: {} has confidence: {}".format(
                    social_security_wages.value, social_security_wages.confidence
                )
            )
        social_security_tax_withheld = w2.fields.get("SocialSecurityTaxWithheld")
        if social_security_tax_withheld:
            print(
                "Social Security tax withheld: {} has confidence: {}".format(
                    social_security_tax_withheld.value,
                    social_security_tax_withheld.confidence,
                )
            )
        medicare_wages_tips = w2.fields.get("MedicareWagesAndTips")
        if medicare_wages_tips:
            print(
                "Medicare wages and tips: {} has confidence: {}".format(
                    medicare_wages_tips.value, medicare_wages_tips.confidence
                )
            )
        medicare_tax_withheld = w2.fields.get("MedicareTaxWithheld")
        if medicare_tax_withheld:
            print(
                "Medicare tax withheld: {} has confidence: {}".format(
                    medicare_tax_withheld.value, medicare_tax_withheld.confidence
                )
            )
        social_security_tips = w2.fields.get("SocialSecurityTips")
        if social_security_tips:
            print(
                "Social Security tips: {} has confidence: {}".format(
                    social_security_tips.value, social_security_tips.confidence
                )
            )
        allocated_tips = w2.fields.get("AllocatedTips")
        if allocated_tips:
            print(
                "Allocated tips: {} has confidence: {}".format(
                    allocated_tips.value,
                    allocated_tips.confidence,
                )
            )
        verification_code = w2.fields.get("VerificationCode")
        if verification_code:
            print(
                "Verification code: {} has confidence: {}".format(
                    verification_code.value, verification_code.confidence
                )
            )
        dependent_care_benefits = w2.fields.get("DependentCareBenefits")
        if dependent_care_benefits:
            print(
                "Dependent care benefits: {} has confidence: {}".format(
                    dependent_care_benefits.value,
                    dependent_care_benefits.confidence,
                )
            )
        non_qualified_plans = w2.fields.get("NonQualifiedPlans")
        if non_qualified_plans:
            print(
                "Non-qualified plans: {} has confidence: {}".format(
                    non_qualified_plans.value,
                    non_qualified_plans.confidence,
                )
            )
        additional_info = w2.fields.get("AdditionalInfo")
        if additional_info:
            print("Additional information:")
            for item in additional_info.value:
                letter_code = item.value.get("LetterCode")
                if letter_code:
                    print(
                        "...Letter code: {} has confidence: {}".format(
                            letter_code.value, letter_code.confidence
                        )
                    )
                amount = item.value.get("Amount")
                if amount:
                    print(
                        "...Amount: {} has confidence: {}".format(
                            amount.value, amount.confidence
                        )
                    )
        is_statutory_employee = w2.fields.get("IsStatutoryEmployee")
        if is_statutory_employee:
            print(
                "Is statutory employee: {} has confidence: {}".format(
                    is_statutory_employee.value, is_statutory_employee.confidence
                )
            )
        is_retirement_plan = w2.fields.get("IsRetirementPlan")
        if is_retirement_plan:
            print(
                "Is retirement plan: {} has confidence: {}".format(
                    is_retirement_plan.value, is_retirement_plan.confidence
                )
            )
        third_party_sick_pay = w2.fields.get("IsThirdPartySickPay")
        if third_party_sick_pay:
            print(
                "Is third party sick pay: {} has confidence: {}".format(
                    third_party_sick_pay.value, third_party_sick_pay.confidence
                )
            )
        other_info = w2.fields.get("Other")
        if other_info:
            print(
                "Other information: {} has confidence: {}".format(
                    other_info.value,
                    other_info.confidence,
                )
            )
        state_tax_info = w2.fields.get("StateTaxInfos")
        if state_tax_info:
            print("State Tax info:")
            for tax in state_tax_info.value:
                state = tax.value.get("State")
                if state:
                    print(
                        "...State: {} has confidence: {}".format(
                            state.value, state.confidence
                        )
                    )
                employer_state_id_number = tax.value.get("EmployerStateIdNumber")
                if employer_state_id_number:
                    print(
                        "...Employer state ID number: {} has confidence: {}".format(
                            employer_state_id_number.value,
                            employer_state_id_number.confidence,
                        )
                    )
                state_wages_tips = tax.value.get("StateWagesTipsEtc")
                if state_wages_tips:
                    print(
                        "...State wages, tips, etc: {} has confidence: {}".format(
                            state_wages_tips.value, state_wages_tips.confidence
                        )
                    )
                state_income_tax = tax.value.get("StateIncomeTax")
                if state_income_tax:
                    print(
                        "...State income tax: {} has confidence: {}".format(
                            state_income_tax.value, state_income_tax.confidence
                        )
                    )
        local_tax_info = w2.fields.get("LocalTaxInfos")
        if local_tax_info:
            print("Local Tax info:")
            for tax in local_tax_info.value:
                local_wages_tips = tax.value.get("LocalWagesTipsEtc")
                if local_wages_tips:
                    print(
                        "...Local wages, tips, etc: {} has confidence: {}".format(
                            local_wages_tips.value, local_wages_tips.confidence
                        )
                    )
                local_income_tax = tax.value.get("LocalIncomeTax")
                if local_income_tax:
                    print(
                        "...Local income tax: {} has confidence: {}".format(
                            local_income_tax.value, local_income_tax.confidence
                        )
                    )
                locality_name = tax.value.get("LocalityName")
                if locality_name:
                    print(
                        "...Locality name: {} has confidence: {}".format(
                            locality_name.value, locality_name.confidence
                        )
                    )

                print("----------------------------------------")


if __name__ == "__main__":
    analyze_tax_us_w2()

```

> 
> [View complete code on GitHub.](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/v3.1(2023-07-31-GA)/Python(v3.1)/Prebuilt_model/sample_analyze_tax_us_w2.py) [More samples](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/v3.1(2023-07-31-GA)/Python(v3.1)/Prebuilt_model)

Visit the Azure samples repository on GitHub and view the [W-2 tax model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/w2-tax-model-output.md).

## Use the Invoice model

```python
import os
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential

# use your `key` and `endpoint` environment variables
key = os.environ.get('FR_KEY')
endpoint = os.environ.get('FR_ENDPOINT')

# formatting function
def format_bounding_region(bounding_regions):
    if not bounding_regions:
        return "N/A"
    return ", ".join("Page #{}: {}".format(region.page_number, format_polygon(region.polygon)) for region in bounding_regions)

# formatting function
def format_polygon(polygon):
    if not polygon:
        return "N/A"
    return ", ".join(["[{}, {}]".format(p.x, p.y) for p in polygon])


def analyze_invoice():

    invoiceUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-invoice.pdf"

    document_analysis_client = DocumentAnalysisClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

    poller = document_analysis_client.begin_analyze_document_from_url(
            "prebuilt-invoice", invoiceUrl)
    invoices = poller.result()

    for idx, invoice in enumerate(invoices.documents):
        print("--------Recognizing invoice #{}--------".format(idx + 1))
        vendor_name = invoice.fields.get("VendorName")
        if vendor_name:
            print(
                "Vendor Name: {} has confidence: {}".format(
                    vendor_name.value, vendor_name.confidence
                )
            )
        vendor_address = invoice.fields.get("VendorAddress")
        if vendor_address:
            print(
                "Vendor Address: {} has confidence: {}".format(
                    vendor_address.value, vendor_address.confidence
                )
            )
        vendor_address_recipient = invoice.fields.get("VendorAddressRecipient")
        if vendor_address_recipient:
            print(
                "Vendor Address Recipient: {} has confidence: {}".format(
                    vendor_address_recipient.value, vendor_address_recipient.confidence
                )
            )
        customer_name = invoice.fields.get("CustomerName")
        if customer_name:
            print(
                "Customer Name: {} has confidence: {}".format(
                    customer_name.value, customer_name.confidence
                )
            )
        customer_id = invoice.fields.get("CustomerId")
        if customer_id:
            print(
                "Customer Id: {} has confidence: {}".format(
                    customer_id.value, customer_id.confidence
                )
            )
        customer_address = invoice.fields.get("CustomerAddress")
        if customer_address:
            print(
                "Customer Address: {} has confidence: {}".format(
                    customer_address.value, customer_address.confidence
                )
            )
        customer_address_recipient = invoice.fields.get("CustomerAddressRecipient")
        if customer_address_recipient:
            print(
                "Customer Address Recipient: {} has confidence: {}".format(
                    customer_address_recipient.value,
                    customer_address_recipient.confidence,
                )
            )
        invoice_id = invoice.fields.get("InvoiceId")
        if invoice_id:
            print(
                "Invoice Id: {} has confidence: {}".format(
                    invoice_id.value, invoice_id.confidence
                )
            )
        invoice_date = invoice.fields.get("InvoiceDate")
        if invoice_date:
            print(
                "Invoice Date: {} has confidence: {}".format(
                    invoice_date.value, invoice_date.confidence
                )
            )
        invoice_total = invoice.fields.get("InvoiceTotal")
        if invoice_total:
            print(
                "Invoice Total: {} has confidence: {}".format(
                    invoice_total.value, invoice_total.confidence
                )
            )
        due_date = invoice.fields.get("DueDate")
        if due_date:
            print(
                "Due Date: {} has confidence: {}".format(
                    due_date.value, due_date.confidence
                )
            )
        purchase_order = invoice.fields.get("PurchaseOrder")
        if purchase_order:
            print(
                "Purchase Order: {} has confidence: {}".format(
                    purchase_order.value, purchase_order.confidence
                )
            )
        billing_address = invoice.fields.get("BillingAddress")
        if billing_address:
            print(
                "Billing Address: {} has confidence: {}".format(
                    billing_address.value, billing_address.confidence
                )
            )
        billing_address_recipient = invoice.fields.get("BillingAddressRecipient")
        if billing_address_recipient:
            print(
                "Billing Address Recipient: {} has confidence: {}".format(
                    billing_address_recipient.value,
                    billing_address_recipient.confidence,
                )
            )
        shipping_address = invoice.fields.get("ShippingAddress")
        if shipping_address:
            print(
                "Shipping Address: {} has confidence: {}".format(
                    shipping_address.value, shipping_address.confidence
                )
            )
        shipping_address_recipient = invoice.fields.get("ShippingAddressRecipient")
        if shipping_address_recipient:
            print(
                "Shipping Address Recipient: {} has confidence: {}".format(
                    shipping_address_recipient.value,
                    shipping_address_recipient.confidence,
                )
            )
        print("Invoice items:")
        for idx, item in enumerate(invoice.fields.get("Items").value):
            print("...Item #{}".format(idx + 1))
            item_description = item.value.get("Description")
            if item_description:
                print(
                    "......Description: {} has confidence: {}".format(
                        item_description.value, item_description.confidence
                    )
                )
            item_quantity = item.value.get("Quantity")
            if item_quantity:
                print(
                    "......Quantity: {} has confidence: {}".format(
                        item_quantity.value, item_quantity.confidence
                    )
                )
            unit = item.value.get("Unit")
            if unit:
                print(
                    "......Unit: {} has confidence: {}".format(
                        unit.value, unit.confidence
                    )
                )
            unit_price = item.value.get("UnitPrice")
            if unit_price:
                print(
                    "......Unit Price: {} has confidence: {}".format(
                        unit_price.value, unit_price.confidence
                    )
                )
            product_code = item.value.get("ProductCode")
            if product_code:
                print(
                    "......Product Code: {} has confidence: {}".format(
                        product_code.value, product_code.confidence
                    )
                )
            item_date = item.value.get("Date")
            if item_date:
                print(
                    "......Date: {} has confidence: {}".format(
                        item_date.value, item_date.confidence
                    )
                )
            tax = item.value.get("Tax")
            if tax:
                print(
                    "......Tax: {} has confidence: {}".format(tax.value, tax.confidence)
                )
            amount = item.value.get("Amount")
            if amount:
                print(
                    "......Amount: {} has confidence: {}".format(
                        amount.value, amount.confidence
                    )
                )
        subtotal = invoice.fields.get("SubTotal")
        if subtotal:
            print(
                "Subtotal: {} has confidence: {}".format(
                    subtotal.value, subtotal.confidence
                )
            )
        total_tax = invoice.fields.get("TotalTax")
        if total_tax:
            print(
                "Total Tax: {} has confidence: {}".format(
                    total_tax.value, total_tax.confidence
                )
            )
        previous_unpaid_balance = invoice.fields.get("PreviousUnpaidBalance")
        if previous_unpaid_balance:
            print(
                "Previous Unpaid Balance: {} has confidence: {}".format(
                    previous_unpaid_balance.value, previous_unpaid_balance.confidence
                )
            )
        amount_due = invoice.fields.get("AmountDue")
        if amount_due:
            print(
                "Amount Due: {} has confidence: {}".format(
                    amount_due.value, amount_due.confidence
                )
            )
        service_start_date = invoice.fields.get("ServiceStartDate")
        if service_start_date:
            print(
                "Service Start Date: {} has confidence: {}".format(
                    service_start_date.value, service_start_date.confidence
                )
            )
        service_end_date = invoice.fields.get("ServiceEndDate")
        if service_end_date:
            print(
                "Service End Date: {} has confidence: {}".format(
                    service_end_date.value, service_end_date.confidence
                )
            )
        service_address = invoice.fields.get("ServiceAddress")
        if service_address:
            print(
                "Service Address: {} has confidence: {}".format(
                    service_address.value, service_address.confidence
                )
            )
        service_address_recipient = invoice.fields.get("ServiceAddressRecipient")
        if service_address_recipient:
            print(
                "Service Address Recipient: {} has confidence: {}".format(
                    service_address_recipient.value,
                    service_address_recipient.confidence,
                )
            )
        remittance_address = invoice.fields.get("RemittanceAddress")
        if remittance_address:
            print(
                "Remittance Address: {} has confidence: {}".format(
                    remittance_address.value, remittance_address.confidence
                )
            )
        remittance_address_recipient = invoice.fields.get("RemittanceAddressRecipient")
        if remittance_address_recipient:
            print(
                "Remittance Address Recipient: {} has confidence: {}".format(
                    remittance_address_recipient.value,
                    remittance_address_recipient.confidence,
                )
            )

        print("----------------------------------------")

if __name__ == "__main__":
    analyze_invoice()

```

> 
> [View complete code on GitHub.](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/v3.1(2023-07-31-GA)/Python(v3.1)/Prebuilt_model/sample_analyze_invoices.py) [More samples](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/v3.1(2023-07-31-GA)/Python(v3.1)/Prebuilt_model)

Visit the Azure samples repository on GitHub and view the [invoice model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/invoice-model-output.md).

## Use the Receipt model

```python
import os
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential

# use your `key` and `endpoint` environment variables
key = os.environ.get('FR_KEY')
endpoint = os.environ.get('FR_ENDPOINT')

def analyze_receipts():
    # sample document
    receiptUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png"

    document_analysis_client = DocumentAnalysisClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )
    poller = document_analysis_client.begin_analyze_document_from_url(
        "prebuilt-receipt", receiptUrl, locale="en-US"
    )
    receipts = poller.result()
    for idx, receipt in enumerate(receipts.documents):
         print("--------Analysis of receipt #{}--------".format(idx   1))
        print("Receipt type: {}".format(receipt.doc_type or "N/A"))
        merchant_name = receipt.fields.get("MerchantName")
        if merchant_name:
            print(
                "Merchant Name: {} has confidence: {}".format(
                    merchant_name.value, merchant_name.confidence
                )
            )
        transaction_date = receipt.fields.get("TransactionDate")
        if transaction_date:
            print(
                "Transaction Date: {} has confidence: {}".format(
                    transaction_date.value, transaction_date.confidence
                )
            )
        if receipt.fields.get("Items"):
            print("Receipt items:")
            for idx, item in enumerate(receipt.fields.get("Items").value):
                 print("...Item #{}".format(idx   1))
                item_description = item.value.get("Description")
                if item_description:
                    print(
                        "......Item Description: {} has confidence: {}".format(
                            item_description.value, item_description.confidence
                        )
                    )
                item_quantity = item.value.get("Quantity")
                if item_quantity:
                    print(
                        "......Item Quantity: {} has confidence: {}".format(
                            item_quantity.value, item_quantity.confidence
                        )
                    )
                item_price = item.value.get("Price")
                if item_price:
                    print(
                        "......Individual Item Price: {} has confidence: {}".format(
                            item_price.value, item_price.confidence
                        )
                    )
                item_total_price = item.value.get("TotalPrice")
                if item_total_price:
                    print(
                        "......Total Item Price: {} has confidence: {}".format(
                            item_total_price.value, item_total_price.confidence
                        )
                    )
        subtotal = receipt.fields.get("Subtotal")
        if subtotal:
            print(
                "Subtotal: {} has confidence: {}".format(
                    subtotal.value, subtotal.confidence
                )
            )
        tax = receipt.fields.get("TotalTax")
        if tax:
            print("Total tax: {} has confidence: {}".format(tax.value, tax.confidence))
        tip = receipt.fields.get("Tip")
        if tip:
            print("Tip: {} has confidence: {}".format(tip.value, tip.confidence))
        total = receipt.fields.get("Total")
        if total:
            print("Total: {} has confidence: {}".format(total.value, total.confidence))
        print("--------------------------------------")


if __name__ == "__main__":
    analyze_receipts()

```

> 
> [View complete code on GitHub.](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/v3.1(2023-07-31-GA)/Python(v3.1)/Prebuilt_model/sample_analyze_receipts.py) [More samples](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/v3.1(2023-07-31-GA)/Python(v3.1)/Prebuilt_model)

Visit the Azure samples repository on GitHub and view the [receipt model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/receipt-model-output.md).

## Use the ID document model

```python
import os
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential

# use your `key` and `endpoint` environment variables
key = os.environ.get('FR_KEY')
endpoint = os.environ.get('FR_ENDPOINT')

def analyze_identity_documents():
# sample document
    identityUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png"

    document_analysis_client = DocumentAnalysisClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

    poller = document_analysis_client.begin_analyze_document_from_url(
            "prebuilt-idDocument", identityUrl
        )
    id_documents = poller.result()

    for idx, id_document in enumerate(id_documents.documents):
        print("--------Analyzing ID document #{}--------".format(idx + 1))
        first_name = id_document.fields.get("FirstName")
        if first_name:
            print(
                "First Name: {} has confidence: {}".format(
                    first_name.value, first_name.confidence
                )
            )
        last_name = id_document.fields.get("LastName")
        if last_name:
            print(
                "Last Name: {} has confidence: {}".format(
                    last_name.value, last_name.confidence
                )
            )
        document_number = id_document.fields.get("DocumentNumber")
        if document_number:
            print(
                "Document Number: {} has confidence: {}".format(
                    document_number.value, document_number.confidence
                )
            )
        dob = id_document.fields.get("DateOfBirth")
        if dob:
            print(
                "Date of Birth: {} has confidence: {}".format(dob.value, dob.confidence)
            )
        doe = id_document.fields.get("DateOfExpiration")
        if doe:
            print(
                "Date of Expiration: {} has confidence: {}".format(
                    doe.value, doe.confidence
                )
            )
        sex = id_document.fields.get("Sex")
        if sex:
            print("Sex: {} has confidence: {}".format(sex.value, sex.confidence))
        address = id_document.fields.get("Address")
        if address:
            print(
                "Address: {} has confidence: {}".format(
                    address.value, address.confidence
                )
            )
        country_region = id_document.fields.get("CountryRegion")
        if country_region:
            print(
                "Country/Region: {} has confidence: {}".format(
                    country_region.value, country_region.confidence
                )
            )
        region = id_document.fields.get("Region")
        if region:
            print(
                "Region: {} has confidence: {}".format(region.value, region.confidence)
            )

        print("--------------------------------------")

if __name__ == "__main__":
    analyze_identity_documents()

```

> 
> [View complete code on GitHub.](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/v3.1(2023-07-31-GA)/Python(v3.1)/Prebuilt_model/sample_analyze_identity_documents.py) [More samples](https://github.com/Azure-Samples/document-intelligence-code-samples/blob/v3.1(2023-07-31-GA)/Python(v3.1)/Prebuilt_model)

Visit the Azure samples repository on GitHub and view the [ID document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/id-document-output.md).

## Use the Business card model

```python
import os
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential

# use your `key` and `endpoint` environment variables
key = os.environ.get('FR_KEY')
endpoint = os.environ.get('FR_ENDPOINT')

def analyze_business_card():
      # sample document
    businessCardUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/de5e0d8982ab754823c54de47a47e8e499351523/curl/form-recognizer/rest-api/business_card.jpg"

    document_analysis_client = DocumentAnalysisClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )

    poller = document_analysis_client.begin_analyze_document_from_url(
            "prebuilt-businessCard", businessCardUrl, locale="en-US"
        )
    business_cards = poller.result()

    for idx, business_card in enumerate(business_cards.documents):
        print("--------Analyzing business card #{}--------".format(idx + 1))
        contact_names = business_card.fields.get("ContactNames")
        if contact_names:
            for contact_name in contact_names.value:
                print(
                    "Contact First Name: {} has confidence: {}".format(
                        contact_name.value["FirstName"].value,
                        contact_name.value[
                            "FirstName"
                        ].confidence,
                    )
                )
                print(
                    "Contact Last Name: {} has confidence: {}".format(
                        contact_name.value["LastName"].value,
                        contact_name.value[
                            "LastName"
                        ].confidence,
                    )
                )
        company_names = business_card.fields.get("CompanyNames")
        if company_names:
            for company_name in company_names.value:
                print(
                    "Company Name: {} has confidence: {}".format(
                        company_name.value, company_name.confidence
                    )
                )
        departments = business_card.fields.get("Departments")
        if departments:
            for department in departments.value:
                print(
                    "Department: {} has confidence: {}".format(
                        department.value, department.confidence
                    )
                )
        job_titles = business_card.fields.get("JobTitles")
        if job_titles:
            for job_title in job_titles.value:
                print(
                    "Job Title: {} has confidence: {}".format(
                        job_title.value, job_title.confidence
                    )
                )
        emails = business_card.fields.get("Emails")
        if emails:
            for email in emails.value:
                print(
                    "Email: {} has confidence: {}".format(email.value, email.confidence)
                )
        websites = business_card.fields.get("Websites")
        if websites:
            for website in websites.value:
                print(
                    "Website: {} has confidence: {}".format(
                        website.value, website.confidence
                    )
                )
        addresses = business_card.fields.get("Addresses")
        if addresses:
            for address in addresses.value:
                print(
                    "Address: {} has confidence: {}".format(
                        address.value, address.confidence
                    )
                )
        mobile_phones = business_card.fields.get("MobilePhones")
        if mobile_phones:
            for phone in mobile_phones.value:
                print(
                    "Mobile phone number: {} has confidence: {}".format(
                        phone.content, phone.confidence
                    )
                )
        faxes = business_card.fields.get("Faxes")
        if faxes:
            for fax in faxes.value:
                print(
                    "Fax number: {} has confidence: {}".format(
                        fax.content, fax.confidence
                    )
                )
        work_phones = business_card.fields.get("WorkPhones")
        if work_phones:
            for work_phone in work_phones.value:
                print(
                    "Work phone number: {} has confidence: {}".format(
                        work_phone.content, work_phone.confidence
                    )
                )
        other_phones = business_card.fields.get("OtherPhones")
        if other_phones:
            for other_phone in other_phones.value:
                print(
                    "Other phone number: {} has confidence: {}".format(
                        other_phone.value, other_phone.confidence
                    )
                )

        print("--------------------------------------")

if __name__ == "__main__":
    analyze_business_card()

```

Visit the Azure samples repository on GitHub and view the [business card model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/how-to-guide/business-card-model-output.md).





**Applies to: programming-language-rest-api**


**Applies to: doc-intel-4.0.0**
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD051 -->

> **Note:**
>
> This project uses cURL command-line tool to execute REST API calls.

| [Document Intelligence REST API](https://learn.microsoft.com/rest/api/aiservices/operation-groups?view=rest-aiservices-v4.0%20\(2024-11-30\)\&preserve-view=true) | [Supported Azure `SDK`s](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v4-0.md)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The cURL command line tool installed. Windows 10 and Windows 11 ship with a copy of cURL. At a command prompt, type the following cURL command. If the help options display, cURL is installed in your Windows environment.

  ```bash
  curl -help
  ```

  If cURL isn't installed, you can get it here:

  - [Windows](https://curl.haxx.se/windows/)
  - [Mac or Linux](https://curl.se/)

- A Foundry Tools or Document Intelligence resource. Create a <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource." target="_blank">single-service</a> or <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a multiple Document Intelligence resource." target="_blank">multi-service</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

## Set your environment variables

To interact with the Document Intelligence service, you need to create an instance of the `DocumentAnalysisClient` class. To do so, instantiate the client with your `key` and `endpoint` from the Azure portal. For this project, use environment variables to store and access credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

To set the environment variable for your Document Intelligence resource key, open a console window, and follow the instructions for your operating system and development environment. Replace *\<yourKey>* and *\<yourEndpoint>* with the values from your resource in the Azure portal.

#### [Windows](#tab/windows)

Environment variables in Windows aren't case-sensitive. They're typically declared in uppercase, with words joined by an underscore. At a command prompt, run the following commands:

1. Set your key variable:

   ```console
   setx DI_KEY <yourKey>
   ```

1. Set your endpoint variable

   ```console
   setx DI_ENDPOINT <yourEndpoint>
   ```

1. Close the Command Prompt window after you set your environment variables. The values remain until you change them again.

1. Restart any running programs that read the environment variable. For example, if you're using Visual Studio or Visual Studio Code as your editor, restart before running the sample code.

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `setx VARIABLE_NAME=` | Delete the environment variable by setting the value to an empty string. | `setx DI_KEY=` |
| `setx VARIABLE_NAME=value` | Set or change the value of an environment variable. | `setx DI_KEY=<yourKey>` |
| `set VARIABLE_NAME` | Display the value of a specific environment variable. | `set  DI_KEY` |
| `set` | Display all environment variables. | `set` |

#### [macOS](#tab/macOS)

Environment variables in macOS are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session. Open your terminal and enter the following commands:

1. Set your key variable:

   ```bash
   export key=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export endpoint=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash  `~/.bash_profile` startup script:

  1. Use a text editor to open the *~/.bash_profile* file and add the following command to create a permanent environment variable:

     ```bash
     export DI_KEY=<yourKey> DI_ENDPOINT=<yourEndpoint>
     ```

     Example: `export DI_KEY="<yourKey>"`

  1. Save your changes to the *bash_profile* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bash-profile
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY=<yourKey>` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of a specific environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

#### [Linux](#tab/linux)

Environment variables in Linux are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session:

1. Set your key variable:

   ```bash
   export DI_KEY=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export DI_ENDPOINT=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash `~/.bashrc` startup script:

  1. Use a text editor to open the *~/.bashrc* file and add the following command to create a permanent environment variable:

     ```bash
     export <VARIABLE>=<value>
     ```

     Example: `export DI_KEY=<yourKey>`

  1. Save your changes to the *.bashrc* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bashrc
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY=` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY={yourKey}` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of an environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

---


## Analyze documents and get results

A POST request is used to analyze documents with a prebuilt or custom model. A GET request is used to retrieve the result of a document analysis call. The `modelId` is used with POST and `resultId` with GET operations.

Use the following table as a reference. Replace *\<modelId>* and *\<document-url>* with your desired values:

| Model | modelId | description | document-url |
| --- | --- | --- | --- |
| **Read model** | prebuilt-read | Sample brochure | `https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png` |
| **Layout model** | prebuilt-layout | Sample booking confirmation | `https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png` |
| **W-2 form model** | prebuilt-tax.us.w2 | Sample W-2 form | `https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png` |
| **Invoice model** | prebuilt-invoice | Sample invoice | `https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf` |
| **Receipt model** | prebuilt-receipt | Sample receipt | `https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png` |
| **ID document model** | prebuilt-idDocument | Sample ID document | `https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png` |

## POST request

Open a bash window and run the following cURL command. The commands include the endpoint and key environment variables previously created in the set environment variables section. Replace those variables if your variable names differ. Remember to replace the *\<modelId>* and *\<document-url>* parameters.

```bash
curl -i -X POST "{endpoint}/documentintelligence/documentModels/{modelId}:analyze?api-version=2024-11-30" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: {DI_KEY}" --data-ascii "{'urlSource': '<document-url>'}"
```

To enable add-on capabilities, use the `features` query parameter in the POST request. There are four add-on capabilities available with the `2023-07-31` (GA) and later releases: *ocr.highResolution*, *ocr.formula*, *ocr.font*, and *queryFields.premium*. To learn more about each of the capabilities, see [Custom models](../concept/accuracy-confidence.md).

You can only call the *highResolution*, *formula*, and *font* capabilities for the Read and Layout model, and the *queryFields* capability for the General Documents model. The following example shows how to call the *highResolution*, *formula*, and *font* capabilities for the Layout model.

```bash
curl -i -X POST "{endpoint}/documentintelligence/documentModels/prebuilt-layout:analyze?features=ocr.highResolution,ocr.formula,ocr.font?api-version=2024-11-30" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: {DI_KEY}" --data-ascii "{'urlSource': '<document-url>'}"
```

### POST response

You receive a `202 (Success)` response that includes an `Operation-location` header. Use the value of this header to retrieve the response results.

Screenshot shows a POST response with the operation location highlighted.

### Get analyze result (GET Request)

After you call the [`Analyze document`](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-batch-documents?view=rest-aiservices-v4.0%20\(2024-11-30\)\&preserve-view=true\&tabs=HTTP) API, call the [`Get analyze` result](https://learn.microsoft.com/rest/api/aiservices/document-models/get-analyze-result?view=rest-aiservices-v4.0%20\(2024-11-30\)\&preserve-view=true\&tabs=HTTP) API to get the status of the operation and the extracted data.

<!-- markdownlint-disable MD024 -->

The cURL command line tool doesn't format API responses that contain JSON content, which can make the content difficult to read. To format the JSON response, include the pipe character followed by a JSON formatting tool with your GET request.

#### [Windows](#tab/windows)

Use the Node.js *json tool* as a JSON formatter for cURL. If you don't have [Node.js](https://nodejs.org/) installed, download and install the latest version.

1. Open a bash window and install the json tool by using the following command:

   ```bash
   npm install -g jsontool
   ```

1. Pretty print the JSON output by including the pipe character `| json` with your GET requests.

   ```bash
   curl -i -X GET "<endpoint>documentintelligence/documentModels/prebuilt-read/analyzeResults/0e49604a-2d8e-4b15-b6b8-bb456e5d3e0a?api-version=2024-11-30"-H "Ocp-Apim-Subscription-Key: <subscription key>" | json
   ```

#### [macOS](#tab/macOS)

The *json_pp* command tool ships with macOS and can be used as a JSON formatter for cURL.

- Pretty print the JSON output by including `| json_pp` with your GET requests.

  ```bash
  curl -i -X GET "{endpoint}/documentintelligence/documentModels/{modelId}/analyzeResults/{resultId}?api-version=2024-11-30"-H "Ocp-Apim-Subscription-Key: <subscription key>" | json_pp
  ```

#### [Linux](#tab/linux)

The *json_pp* command line tool is preinstalled in most Linux distributions. If it isn't included, you can use your distribution's package manager to install it.

- Pretty print the JSON output by including `| json_pp` with your `GET` requests.

  ```bash
  curl -i -X GET "{endpoint}/documentintelligence/documentModels/{modelId}/analyzeResults/{resultId}?api-version=2024-11-30"-H "Ocp-Apim-Subscription-Key: <subscription key>" | json_pp
  ```

---

## GET request

Before you run the following command, make these changes:

- Replace *\<POST response>* with the `Operation-location` header from the [POST response](#post-response).
- Replace *\<DI_KEY* with the variable for your environment variable if it differs from the name in the code.
- Replace *\<json-tool> with your JSON formatting tool.

```bash
curl -i -X GET "<POST response>" -H "Ocp-Apim-Subscription-Key: {DI_KEY}" | `<json-tool>`
```

### Examine the response

You receive a `200 (Success)` response with JSON output. The first field, `status`, indicates the status of the operation. If the operation isn't complete, the value of `status` is `running` or `notStarted`. Call the API again, either manually or through a script. We recommend an interval of one second or more between calls.

Visit the Azure samples repository on GitHub to view the `GET` response for each of the Document Intelligence models:

| Model | Output URL |
| --- | --- |
| **Read model** | [Read model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/rest/FormRecognizer/how-to-guide/read-model-output.json) |
| **Layout model** | [Layout model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/rest/FormRecognizer/how-to-guide/layout-model-output.json) |
| **W-2 tax model** | [W-2 tax model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/rest/FormRecognizer/how-to-guide/w2-tax-model-output.json) |
| **Invoice model** | [Invoice model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/rest/FormRecognizer/how-to-guide/invoice-model-output.json) |
| **Receipt model** | [Receipt model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/rest/FormRecognizer/how-to-guide/receipt-model-output.json) |
| **ID document model** | [ID document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/rest/FormRecognizer/how-to-guide/id-document-model-output.json) |



**Applies to: doc-intel-3.1.0 || doc-intel-3.0.0**


<!-- markdownlint-disable MD033 -->

**Applies to: doc-intel-3.1.0**
| [Document Intelligence REST API](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP) | [Supported Azure SDKS](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v3-1.md) |


**Applies to: doc-intel-3.0.0**
| [Document Intelligence REST API](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-v3.0%20\(2022-08-31\)\&preserve-view=true\&tabs=HTTP) | [Supported Azure SDKS](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/sdk-overview-v3-0.md) |


> **Note:**
>
> This project uses the  `cURL` command-line tool to execute REST API calls.

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The cURL command line tool installed. Windows 10 and Windows 11 ship with a copy of cURL. At a command prompt, type the following cURL command. If the help options display, cURL is installed in your Windows environment.

  ```console
  curl -help
  ```

  If cURL isn't installed, you can get it here:

  - [Windows](https://curl.haxx.se/windows/)
  - [Mac or Linux](https://curl.se/)

- A Foundry Tools or Document Intelligence resource. Create a <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource." target="_blank">single-service</a> or <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a multiple Document Intelligence resource." target="_blank">multi-service</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.


<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

## Set your environment variables

To interact with the Document Intelligence service, you need to create an instance of the `DocumentAnalysisClient` class. To do so, instantiate the client with your `key` and `endpoint` from the Azure portal. For this project, use environment variables to store and access credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/azure-key-vault.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

To set the environment variable for your Document Intelligence resource key, open a console window, and follow the instructions for your operating system and development environment. Replace *\<yourKey>* and *\<yourEndpoint>* with the values from your resource in the Azure portal.

#### [Windows](#tab/windows)

Environment variables in Windows aren't case-sensitive. They're typically declared in uppercase, with words joined by an underscore. At a command prompt, run the following commands:

1. Set your key variable:

   ```console
   setx DI_KEY <yourKey>
   ```

1. Set your endpoint variable

   ```console
   setx DI_ENDPOINT <yourEndpoint>
   ```

1. Close the Command Prompt window after you set your environment variables. The values remain until you change them again.

1. Restart any running programs that read the environment variable. For example, if you're using Visual Studio or Visual Studio Code as your editor, restart before running the sample code.

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `setx VARIABLE_NAME=` | Delete the environment variable by setting the value to an empty string. | `setx DI_KEY=` |
| `setx VARIABLE_NAME=value` | Set or change the value of an environment variable. | `setx DI_KEY=<yourKey>` |
| `set VARIABLE_NAME` | Display the value of a specific environment variable. | `set  DI_KEY` |
| `set` | Display all environment variables. | `set` |

#### [macOS](#tab/macOS)

Environment variables in macOS are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session. Open your terminal and enter the following commands:

1. Set your key variable:

   ```bash
   export key=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export endpoint=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash  `~/.bash_profile` startup script:

  1. Use a text editor to open the *~/.bash_profile* file and add the following command to create a permanent environment variable:

     ```bash
     export DI_KEY=<yourKey> DI_ENDPOINT=<yourEndpoint>
     ```

     Example: `export DI_KEY="<yourKey>"`

  1. Save your changes to the *bash_profile* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bash-profile
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY=<yourKey>` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of a specific environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

#### [Linux](#tab/linux)

Environment variables in Linux are case-sensitive. Conventionally, the variable name is declared in uppercase letters.

The `export` command sets the variable and exports it to the global environment, which is available to other processes. However, the value is temporary and lasts only until you close the terminal session:

1. Set your key variable:

   ```bash
   export DI_KEY=<yourKey>
   ```

1. Set your endpoint variable:

   ```bash
   export DI_ENDPOINT=<yourEndpoint>
   ```

To set an environment variable permanently, place an export command in your Bash `~/.bashrc` startup script:

  1. Use a text editor to open the *~/.bashrc* file and add the following command to create a permanent environment variable:

     ```bash
     export <VARIABLE>=<value>
     ```

     Example: `export DI_KEY=<yourKey>`

  1. Save your changes to the *.bashrc* file.

  1. To make the changes effective, run the following command from your terminal window:

     ```bash
     source ~/.bashrc
     ```

Here are a few more helpful commands to use with environment variables:

| Command | Action | Example |
| --- | --- | --- |
| `unset VARIABLE_NAME` | Delete an environment variable. | `unset DI_KEY=` |
| `export VARIABLE_NAME=value` | Set or change the value of a temporary environment variable. | `export DI_KEY={yourKey}` |
| `printenv VARIABLE_NAME`</br>`echo $VARIABLE_NAME` | Display the value of an environment variable. With the `echo` command, precede the variable with `$`. | `printenv DI_KEY` </br>`echo $DI_KEY` |
| `printenv` | Display all environment variables. | `printenv` |

---


## Analyze documents and get results

A POST request is used to analyze documents with a prebuilt or custom model. A GET request is used to retrieve the result of a document analysis call. The `modelId` is used with POST and `resultId` with GET operations.

Use the following table as a reference. Replace *\<modelId>* and *\<document-url>* with your desired values:

| Model | modelId | description | document-url |
| --- | --- | --- | --- |
| **Read model** | prebuilt-read | Sample brochure | `https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png` |
| **Layout model** | prebuilt-layout | Sample booking confirmation | `https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/layout.png` |
| **W-2 form model** | prebuilt-tax.us.w2 | Sample W-2 form | `https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/w2.png` |
| **Invoice model** | prebuilt-invoice | Sample invoice | `https://github.com/Azure-Samples/cognitive-services-REST-api-samples/raw/master/curl/form-recognizer/rest-api/invoice.pdf` |
| **Receipt model** | prebuilt-receipt | Sample receipt | `https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/receipt.png` |
| **ID document model** | prebuilt-idDocument | Sample ID document | `https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/identity_documents.png` |

## POST request

Open a console window and run the following cURL command. The commands include the endpoint and key environment variables previously created in the set environment variables section. Replace those variables if your variable names differ. Remember to replace the *\<modelId>* and *\<document-url>* parameters.

```console
curl -i -X POST "%FR_ENDPOINT%formrecognizer/documentModels/<modelId>:analyze?api-version=2023-07-31" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: %FR_KEY%" --data-ascii "{'urlSource': '<document-url>'}"
```

To enable add-on capabilities, use the `features` query parameter in the POST request. There are four add-on capabilities available with the `2023-07-31` (GA) release: *ocr.highResolution*, *ocr.formula*, *ocr.font*, and *queryFields.premium*. To learn more about each of the capabilities, see [Custom models](../concept/accuracy-confidence.md).

You can only call the *highResolution*, *formula*, and *font* capabilities for the Read and Layout model, and the *queryFields* capability for the General Documents model. The following example shows how to call the *highResolution*, *formula*, and *font* capabilities for the Layout model.

```bash
curl -i -X POST "%FR_ENDPOINT%formrecognizer/documentModels/prebuilt-layout:analyze?features=ocr.highResolution,ocr.formula,ocr.font?api-version=2023-07-31" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: %FR_KEY%" --data-ascii "{'urlSource': '<document-url>'}"
```

### POST response

You receive a `202 (Success)` response that includes an `Operation-location` header. Use the value of this header to retrieve the response results.

Screenshot shows a POST response with the operation location highlighted.

### Get analyze result (GET Request)

After you call the [`Analyze document`](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP) API, call the [`Get analyze` result}(/rest/api/aiservices/document-models/get-analyze-result?view=rest-aiservices-2023-07-31&preserve-view=true&tabs=HTTP) API to get the status of the operation and the extracted data.

<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD051 -->

The cURL command line tool doesn't format API responses that contain JSON content, which can make the content difficult to read. To format the JSON response, include the pipe character followed by a JSON formatting tool with your GET request.

#### [Windows](#tab/windows)

Use the Node.js *json tool* as a JSON formatter for cURL. If you don't have [Node.js](https://nodejs.org/) installed, download and install the latest version.

1. Open a console window and install the json tool by using the following command:

   ```console
   npm install -g jsontool
   ```

1. Pretty print the JSON output by including the pipe character `| json` with your GET requests.

   ```console
   curl -i -X GET "<endpoint>formrecognizer/documentModels/prebuilt-read/analyzeResults/0e49604a-2d8e-4b15-b6b8-bb456e5d3e0a?api-version=2023-07-31"-H "Ocp-Apim-Subscription-Key: <subscription key>" | json
   ```

#### [macOS](#tab/macOS)

The *json_pp* command tool ships with macOS and can be used as a JSON formatter for cURL.

- Pretty print the JSON output by including `| json_pp` with your GET requests.

  ```console
  curl -i -X GET "{endpoint}formrecognizer/documentModels/prebuilt-read/analyzeResults/0e49604a-2d8e-4b15-b6b8-bb456e5d3e0a?api-version=2023-07-31"-H "Ocp-Apim-Subscription-Key: <subscription key>" | json_pp
  ```

#### [Linux](#tab/linux)

The *json_pp* command line tool is preinstalled in most Linux distributions. If it isn't included, you can use your distribution's package manager to install it.

- Pretty print the JSON output by including `| json_pp` with your `GET` requests.

  ```console
  curl -i -X GET "<endpoint>formrecognizer/documentModels/prebuilt-read/analyzeResults/0e49604a-2d8e-4b15-b6b8-bb456e5d3e0a?api-version=2023-07-31"-H "Ocp-Apim-Subscription-Key: <subscription key>" | json_pp
  ```

---

## GET request

Before you run the following command, make these changes:

- Replace *\<POST response>* with the `Operation-location` header from the [POST response](#post-response).
- Replace *\<FR_KEY* with the variable for your environment variable if it differs from the name in the code.
- Replace *\<json-tool> with your JSON formatting tool.

```console
curl -i -X GET "<POST response>" -H "Ocp-Apim-Subscription-Key: %FR_KEY%" | `<json-tool>`
```

### Examine the response

You receive a `200 (Success)` response with JSON output. The first field, `status`, indicates the status of the operation. If the operation isn't complete, the value of `status` is `running` or `notStarted`. Call the API again, either manually or through a script. We recommend an interval of one second or more between calls.

Visit the Azure samples repository on GitHub to view the `GET` response for each of the Document Intelligence models:

| Model | Output URL |
| --- | --- |
| **Read model** | [Read model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/rest/FormRecognizer/how-to-guide/read-model-output.json) |
| **Layout model** | [Layout model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/rest/FormRecognizer/how-to-guide/layout-model-output.json) |
| **W-2 tax model** | [W-2 tax model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/rest/FormRecognizer/how-to-guide/w2-tax-model-output.json) |
| **Invoice model** | [Invoice model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/rest/FormRecognizer/how-to-guide/invoice-model-output.json) |
| **Receipt model** | [Receipt model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/rest/FormRecognizer/how-to-guide/receipt-model-output.json) |
| **ID document model** | [ID document model output](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/rest/FormRecognizer/how-to-guide/id-document-model-output.json) |





**Applies to: \>=doc-intel-3.0.0**

## Next steps

Congratulations! You learned to use Document Intelligence models to analyze various documents in different ways. Next, explore the Document Intelligence Studio and reference documentation.

>
> [Try the Document Intelligence Studio](https://formrecognizer.appliedai.azure.com/studio) [Explore the Document Intelligence REST API](https://learn.microsoft.com/rest/api/aiservices/document-models/analyze-document?view=rest-aiservices-2023-07-31\&preserve-view=true\&tabs=HTTP)



**Applies to: doc-intel-2.1.0**
In this how-to guide, you learn how to add Document Intelligence to your applications and workflows. Use a programming language of your choice or the REST API. Azure Document Intelligence is a cloud-based Foundry Tools service that uses machine learning to extract key-value pairs, text, and tables from your documents. We recommend that you use the free service while you learn the technology. Remember that the number of free pages is limited to 500 per month.

You use the following APIs to extract structured data from forms and documents:

- [Authenticate the client](#authenticate-the-client)
- [Analyze Layout](#analyze-layout)
- [Analyze receipts](#analyze-receipts)
- [Analyze business cards](#analyze-business-cards)
- [Analyze invoices](#analyze-invoices)
- [Analyze ID documents](#analyze-id-documents)
- [Train a custom model](#train-a-custom-model)
- [Analyze forms with a custom model](#analyze-forms-with-a-custom-model)
- [Manage custom models](#manage-custom-models)


**Applies to: programming-language-csharp**


**Applies to: doc-intel-2.1.0**

<!-- markdownlint-disable MD024 -->

<!-- markdownlint-disable MD033 -->
> **Important:**
>
> This project targets Document Intelligence REST API v2.1.
>
> The code in this article uses synchronous methods and un-secured credentials storage.

[Reference documentation](https://learn.microsoft.com/dotnet/api/overview/azure/ai.formrecognizer-readme) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/formrecognizer/Azure.AI.FormRecognizer/src) | [Package (NuGet)](https://www.nuget.org/packages/Azure.AI.FormRecognizer) | [Samples](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/formrecognizer/Azure.AI.FormRecognizer/samples/README.md)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/) or current version of [.NET Core](https://dotnet.microsoft.com/download/dotnet-core).
- An Azure Storage blob that contains a set of training data. See [Build and train a custom model](build-a-custom-model.md?view=doc-intel-2.1.0\&preserve-view=true) for tips and options for putting together your training data set. For this project, you can use the files under the *Train* folder of the [sample data set](https://go.microsoft.com/fwlink/?linkid=2090451). Download and extract *sample_data.zip*.
- <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource."  target="_blank">An Intelligence resource</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

## Set up your programming environment

In a console window, use the `dotnet new` command to create a new console app with the name `formrecognizer-project`. This command creates a simple "Hello World" C# project with a single source file: *program.cs*.

```console
dotnet new console -n formrecognizer-project
```

Change your directory to the newly created app folder. You can build the application with the following command:

```console
dotnet build
```

The build output should contain no warnings or errors.

```output
...
Build succeeded.
 0 Warning(s)
 0 Error(s)
...
```

### Install the client library

Within the application directory, install the Document Intelligence client library for .NET with the following command:

```console
dotnet add package Azure.AI.FormRecognizer --version 3.1.1
```

From the project directory, open the *Program.cs* file in an editor or IDE. Add the following `using` directives:

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_using](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

In the application's `Program` class, create variables for your resource's key and endpoint.

> **Important:**
> Go to the Azure portal. If the Document Intelligence resource you created in the Prerequisites section deployed successfully, select the **Go to Resource** button under **Next Steps**. In the left pane, under **Resource Management**, select **Keys and Endpoint**.
>
> Remember to remove the key from your code when you're done. Never post it publicly. For production, use secure methods to store and access your credentials. For more information, see [Foundry Tools security](../../security-features.md).

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_creds](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

In the application's `Main` method, add a call to the asynchronous tasks used in this project:

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart-preview.cs?name=snippet_main](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Use the Object model

With Document Intelligence, you can create two different client types. The first, `FormRecognizerClient`, queries the service to recognize form fields and content. The second, `FormTrainingClient`, creates and manages custom models to improve recognition.

`FormRecognizerClient` provides the following operations:

- Recognize form fields and content by using custom models trained to analyze your custom forms. These values are returned in a collection of `RecognizedForm` objects. See [Analyze forms with a custom model](#analyze-forms-with-a-custom-model).
- Recognize form content, including tables, lines, and words, without the need to train a model. Form content is returned in a collection of `FormPage` objects. See [Analyze layout](#analyze-layout).
- Recognize common fields from US receipts, business cards, invoices, and ID documents using a pretrained model on the Document Intelligence service.

`FormTrainingClient` provides operations to:

- Train custom models to analyze all fields and values found in your custom forms. A `CustomFormModel` is returned that indicates the form types the model analyzes and the fields it extracts for each form type.
- Train custom models to analyze specific fields and values you specify by labeling your custom forms. A `CustomFormModel` is returned that indicates the fields that the model extracts and the estimated accuracy for each field.
- Manage models created in your account.
- Copy a custom model from one Document Intelligence resource to another.

For examples, see [Train a Model](#train-a-custom-model) and [Manage Custom Models](#manage-custom-models).

> **Note:**
> Models can also be trained using a graphical user interface such as the [Sample Labeling Tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md).

## Authenticate the client

Under `Main`, create a method named `AuthenticateClient`. Use this method in other tasks to authenticate your requests to the Document Intelligence service. This method uses the `AzureKeyCredential` object, so that if needed, you can update the key without creating new client objects.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_auth](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

Repeat the steps for a new method that authenticates a training client.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_auth_training](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Get assets for testing

You also need to add references to the URLs for your training and testing data. Add these references to the root of your `Program` class.

1. To retrieve the SAS URL for your custom model training data, go to your storage resource in the Azure portal and select **Data storage** > **Containers**.
1. Navigate to your container, right-click, and select **Generate SAS**.

   Get the SAS for your container, not for the storage account itself.

1. Make sure the **Read**, **Write**, **Delete**, and **List** permissions are selected, and select **Generate SAS token and URL**.
1. Copy the value in the **URL** section to a temporary location. It should have the form: `https://<storage account>.blob.core.windows.net/<container name>?<SAS value>`.

Repeat the previous steps to get the SAS URL of an individual document in the blob storage container. Save that SAS URL to a temporary location as well.

Save the URL of the included sample image. That image is also available on [GitHub](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/formrecognizer/azure-ai-formrecognizer/samples/sample_forms)).

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart-preview.cs?name=snippet_urls](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Analyze layout

You can use Document Intelligence to analyze tables, lines, and words in documents, without needing to train a model. The returned value is a collection of **FormPage** objects. There's one object for each page in the submitted document. For more information about layout extraction, see [Document Intelligence layout model](../prebuilt/layout.md).

To analyze the content of a file at a given URL, use the `StartRecognizeContentFromUri` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_getcontent_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also get content from a local file. See the [FormRecognizerClient](https://learn.microsoft.com/dotnet/api/azure.ai.formrecognizer.formrecognizerclient) methods, such as `StartRecognizeContent`. Or, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/formrecognizer/Azure.AI.FormRecognizer/samples/README.md) for scenarios that involve local images.

The rest of this task prints the content information to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_getcontent_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

```output
Form Page 1 has 18 lines.
    Line 0 has 1 word, and text: 'Contoso'.
    Line 1 has 1 word, and text: 'Address:'.
    Line 2 has 3 words, and text: 'Invoice For: Microsoft'.
    Line 3 has 4 words, and text: '1 Redmond way Suite'.
    Line 4 has 3 words, and text: '1020 Enterprise Way'.
    Line 5 has 3 words, and text: '6000 Redmond, WA'.
    Line 6 has 3 words, and text: 'Sunnayvale, CA 87659'.
    Line 7 has 1 word, and text: '99243'.
    Line 8 has 2 words, and text: 'Invoice Number'.
    Line 9 has 2 words, and text: 'Invoice Date'.
    Line 10 has 3 words, and text: 'Invoice Due Date'.
    Line 11 has 1 word, and text: 'Charges'.
    Line 12 has 2 words, and text: 'VAT ID'.
    Line 13 has 1 word, and text: '34278587'.
    Line 14 has 1 word, and text: '6/18/2017'.
    Line 15 has 1 word, and text: '6/24/2017'.
    Line 16 has 1 word, and text: '$56,651.49'.
    Line 17 has 1 word, and text: 'PT'.
Table 0 has 2 rows and 6 columns.
    Cell (0, 0) contains text: 'Invoice Number'.
    Cell (0, 1) contains text: 'Invoice Date'.
    Cell (0, 2) contains text: 'Invoice Due Date'.
    Cell (0, 3) contains text: 'Charges'.
    Cell (0, 5) contains text: 'VAT ID'.
    Cell (1, 0) contains text: '34278587'.
    Cell (1, 1) contains text: '6/18/2017'.
    Cell (1, 2) contains text: '6/24/2017'.
    Cell (1, 3) contains text: '$56,651.49'.
    Cell (1, 5) contains text: 'PT'.
```

## Analyze receipts

This section demonstrates how to analyze and extract common fields from US receipts by using a pretrained receipt model. For more information about receipt analysis, see the [Document Intelligence receipt model](../prebuilt/receipt.md).

To analyze receipts from a URL, use the `StartRecognizeReceiptsFromUri` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_receipt_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local receipt images. See the [FormRecognizerClient](https://learn.microsoft.com/dotnet/api/azure.ai.formrecognizer.formrecognizerclient) methods, such as `StartRecognizeReceipts`. Or, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/formrecognizer/Azure.AI.FormRecognizer/samples/README.md) for scenarios that involve local images.

The returned value is a collection of `RecognizedForm` objects. There's one object for each page in the submitted document. The following code processes the receipt at the given URI and prints the major fields and values to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_receipt_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

```output
Form Page 1 has 18 lines.
    Line 0 has 1 word, and text: 'Contoso'.
    Line 1 has 1 word, and text: 'Address:'.
    Line 2 has 3 words, and text: 'Invoice For: Microsoft'.
    Line 3 has 4 words, and text: '1 Redmond way Suite'.
    Line 4 has 3 words, and text: '1020 Enterprise Way'.
    Line 5 has 3 words, and text: '6000 Redmond, WA'.
    Line 6 has 3 words, and text: 'Sunnayvale, CA 87659'.
    Line 7 has 1 word, and text: '99243'.
    Line 8 has 2 words, and text: 'Invoice Number'.
    Line 9 has 2 words, and text: 'Invoice Date'.
    Line 10 has 3 words, and text: 'Invoice Due Date'.
    Line 11 has 1 word, and text: 'Charges'.
    Line 12 has 2 words, and text: 'VAT ID'.
    Line 13 has 1 word, and text: '34278587'.
    Line 14 has 1 word, and text: '6/18/2017'.
    Line 15 has 1 word, and text: '6/24/2017'.
    Line 16 has 1 word, and text: '$56,651.49'.
    Line 17 has 1 word, and text: 'PT'.
Table 0 has 2 rows and 6 columns.
    Cell (0, 0) contains text: 'Invoice Number'.
    Cell (0, 1) contains text: 'Invoice Date'.
    Cell (0, 2) contains text: 'Invoice Due Date'.
    Cell (0, 3) contains text: 'Charges'.
    Cell (0, 5) contains text: 'VAT ID'.
    Cell (1, 0) contains text: '34278587'.
    Cell (1, 1) contains text: '6/18/2017'.
    Cell (1, 2) contains text: '6/24/2017'.
    Cell (1, 3) contains text: '$56,651.49'.
    Cell (1, 5) contains text: 'PT'.
Merchant Name: 'Contoso Contoso', with confidence 0.516
Transaction Date: '6/10/2019 12:00:00 AM', with confidence 0.985
Item:
    Name: '8GB RAM (Black)', with confidence 0.916
    Total Price: '999', with confidence 0.559
Item:
    Name: 'SurfacePen', with confidence 0.858
    Total Price: '99.99', with confidence 0.386
Total: '1203.39', with confidence '0.774'
```

## Analyze business cards

This section demonstrates how to analyze and extract common fields from English business cards by using a pretrained model. For more information about business card analysis, see the [Document Intelligence business card model](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/concept-business-card.md).

To analyze business cards from a URL, use the `StartRecognizeBusinessCardsFromUriAsync` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart-preview.cs?name=snippet_bc_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local business card images. See the [FormRecognizerClient](https://learn.microsoft.com/dotnet/api/azure.ai.formrecognizer.formrecognizerclient) methods, such as `StartRecognizeBusinessCards`. Or, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/formrecognizer/Azure.AI.FormRecognizer/samples/README.md) for scenarios that involve local images.

The following code processes the business card at the given URI and prints the major fields and values to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart-preview.cs?name=snippet_bc_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Analyze invoices

This section demonstrates how to analyze and extract common fields from sales invoices by using a pretrained model. For more information about invoice analysis, see the [Document Intelligence invoice model](../prebuilt/invoice.md).

To analyze invoices from a URL, use the `StartRecognizeInvoicesFromUriAsync` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart-preview.cs?name=snippet_invoice_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local invoice images. See the [FormRecognizerClient](https://learn.microsoft.com/dotnet/api/azure.ai.formrecognizer.formrecognizerclient) methods, such as `StartRecognizeInvoices`. Or, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/formrecognizer/Azure.AI.FormRecognizer/samples/README.md) for scenarios that involve local images.

The following code processes the invoice at the given URI and prints the major fields and values to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart-preview.cs?name=snippet_invoice_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Analyze ID documents

This section demonstrates how to analyze and extract key information from government-issued identification documents—worldwide passports and U.S. driver's licenses by using the Document Intelligence prebuilt ID model. For more information about ID document analysis, see the [Document Intelligence ID document model](../prebuilt/id-document.md).

To analyze ID documents from a URI, use the `StartRecognizeIdentityDocumentsFromUriAsync` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart-preview.cs?name=snippet_id_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local ID document images. See the [FormRecognizerClient](https://learn.microsoft.com/dotnet/api/azure.ai.formrecognizer.formrecognizerclient) methods, such as `StartRecognizeIdentityDocumentsAsync`. Also, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/formrecognizer/Azure.AI.FormRecognizer/samples/README.md) for scenarios that involve local images.

The following code processes the ID document at the given URI and prints the major fields and values to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart-preview.cs?name=snippet_id_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Train a custom model

This section demonstrates how to train a model with your own data. A trained model can output structured data that includes the key/value relationships in the original document. After you train the model, you can test, retrain, and eventually use it to reliably extract data from more forms according to your needs.

> **Note:**
> You can also train models with a graphical user interface such as the [Document Intelligence Sample Labeling tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md).

### Train a model without labels

Train custom models to analyze all the fields and values found in your custom forms without manually labeling the training documents. The following method trains a model on a given set of documents and prints the model's status to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_train](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The returned `CustomFormModel` object contains information on the form types the model can analyze and the fields it can extract from each form type. The following code block prints this information to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_train_response](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

Finally, return the trained model ID for use in later steps.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_train_return](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

This output is truncated for readability.

```output
Merchant Name: 'Contoso Contoso', with confidence 0.516
Transaction Date: '6/10/2019 12:00:00 AM', with confidence 0.985
Item:
    Name: '8GB RAM (Black)', with confidence 0.916
    Total Price: '999', with confidence 0.559
Item:
    Name: 'SurfacePen', with confidence 0.858
    Total Price: '99.99', with confidence 0.386
Total: '1203.39', with confidence '0.774'
Form Page 1 has 18 lines.
    Line 0 has 1 word, and text: 'Contoso'.
    Line 1 has 1 word, and text: 'Address:'.
    Line 2 has 3 words, and text: 'Invoice For: Microsoft'.
    Line 3 has 4 words, and text: '1 Redmond way Suite'.
    Line 4 has 3 words, and text: '1020 Enterprise Way'.
    ...
Table 0 has 2 rows and 6 columns.
    Cell (0, 0) contains text: 'Invoice Number'.
    Cell (0, 1) contains text: 'Invoice Date'.
    Cell (0, 2) contains text: 'Invoice Due Date'.
    Cell (0, 3) contains text: 'Charges'.
    ...
Custom Model Info:
    Model Id: 95035721-f19d-40eb-8820-0c806b42798b
    Model Status: Ready
    Training model started on: 8/24/2020 6:36:44 PM +00:00
    Training model completed on: 8/24/2020 6:36:50 PM +00:00
Submodel Form Type: form-95035721-f19d-40eb-8820-0c806b42798b
    FieldName: CompanyAddress
    FieldName: CompanyName
    FieldName: CompanyPhoneNumber
    ...
Custom Model Info:
    Model Id: e7a1181b-1fb7-40be-bfbe-1ee154183633
    Model Status: Ready
    Training model started on: 8/24/2020 6:36:44 PM +00:00
    Training model completed on: 8/24/2020 6:36:52 PM +00:00
Submodel Form Type: form-0
    FieldName: field-0, FieldLabel: Additional Notes:
    FieldName: field-1, FieldLabel: Address:
    FieldName: field-2, FieldLabel: Company Name:
    FieldName: field-3, FieldLabel: Company Phone:
    FieldName: field-4, FieldLabel: Dated As:
    FieldName: field-5, FieldLabel: Details
    FieldName: field-6, FieldLabel: Email:
    FieldName: field-7, FieldLabel: Hero Limited
    FieldName: field-8, FieldLabel: Name:
    FieldName: field-9, FieldLabel: Phone:
    ...
```

### Train a model with labels

You can also train custom models by manually labeling the training documents. Training with labels leads to better performance in some scenarios. To train with labels, you need to have special label information files (*\<filename>.pdf.labels.json*) in your blob storage container alongside the training documents. The [Document Intelligence Sample Labeling tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md) provides a user interface to help you create these label files. After you get them, you can call the `StartTrainingAsync` method with the `uselabels` parameter set to `true`.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_trainlabels](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The returned `CustomFormModel` indicates the fields that the model can extract, along with its estimated accuracy in each field. The following code block prints this information to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_trainlabels_response](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

This output is truncated for readability.

```output
Form Page 1 has 18 lines.
    Line 0 has 1 word, and text: 'Contoso'.
    Line 1 has 1 word, and text: 'Address:'.
    Line 2 has 3 words, and text: 'Invoice For: Microsoft'.
    Line 3 has 4 words, and text: '1 Redmond way Suite'.
    Line 4 has 3 words, and text: '1020 Enterprise Way'.
    Line 5 has 3 words, and text: '6000 Redmond, WA'.
    ...
Table 0 has 2 rows and 6 columns.
    Cell (0, 0) contains text: 'Invoice Number'.
    Cell (0, 1) contains text: 'Invoice Date'.
    Cell (0, 2) contains text: 'Invoice Due Date'.
    ...
Merchant Name: 'Contoso Contoso', with confidence 0.516
Transaction Date: '6/10/2019 12:00:00 AM', with confidence 0.985
Item:
    Name: '8GB RAM (Black)', with confidence 0.916
    Total Price: '999', with confidence 0.559
Item:
    Name: 'SurfacePen', with confidence 0.858
    Total Price: '99.99', with confidence 0.386
Total: '1203.39', with confidence '0.774'
Custom Model Info:
    Model Id: 63c013e3-1cab-43eb-84b0-f4b20cb9214c
    Model Status: Ready
    Training model started on: 8/24/2020 6:42:54 PM +00:00
    Training model completed on: 8/24/2020 6:43:01 PM +00:00
Submodel Form Type: form-63c013e3-1cab-43eb-84b0-f4b20cb9214c
    FieldName: CompanyAddress
    FieldName: CompanyName
    FieldName: CompanyPhoneNumber
    FieldName: DatedAs
    FieldName: Email
    FieldName: Merchant
    ...
```

## Analyze forms with a custom model

This section demonstrates how to extract key/value information and other content from your custom template types by using models you trained with your own forms.

> **Important:**
> In order to implement this scenario, you must have already trained a model so you can pass its ID into the following method.

Use the `StartRecognizeCustomFormsFromUri` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_analyze](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze a local file. See the [FormRecognizerClient](https://learn.microsoft.com/dotnet/api/azure.ai.formrecognizer.formrecognizerclient) methods, such as `StartRecognizeCustomForms`. Or, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/formrecognizer/Azure.AI.FormRecognizer/samples/README.md) for scenarios that involve local images.

The returned value is a collection of `RecognizedForm` objects. There's one object for each page in the submitted document. The following code prints the analysis results to the console. It prints each recognized field and corresponding value, along with a confidence score.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_analyze_response](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

This output response is truncated for readability.

```output
Custom Model Info:
    Model Id: 9b0108ee-65c8-450e-b527-bb309d054fc4
    Model Status: Ready
    Training model started on: 8/24/2020 7:00:31 PM +00:00
    Training model completed on: 8/24/2020 7:00:32 PM +00:00
Submodel Form Type: form-9b0108ee-65c8-450e-b527-bb309d054fc4
    FieldName: CompanyAddress
    FieldName: CompanyName
    FieldName: CompanyPhoneNumber
    ...
Form Page 1 has 18 lines.
    Line 0 has 1 word, and text: 'Contoso'.
    Line 1 has 1 word, and text: 'Address:'.
    Line 2 has 3 words, and text: 'Invoice For: Microsoft'.
    Line 3 has 4 words, and text: '1 Redmond way Suite'.
    ...

Table 0 has 2 rows and 6 columns.
    Cell (0, 0) contains text: 'Invoice Number'.
    Cell (0, 1) contains text: 'Invoice Date'.
    Cell (0, 2) contains text: 'Invoice Due Date'.
    ...
Merchant Name: 'Contoso Contoso', with confidence 0.516
Transaction Date: '6/10/2019 12:00:00 AM', with confidence 0.985
Item:
    Name: '8GB RAM (Black)', with confidence 0.916
    Total Price: '999', with confidence 0.559
Item:
    Name: 'SurfacePen', with confidence 0.858
    Total Price: '99.99', with confidence 0.386
Total: '1203.39', with confidence '0.774'
Custom Model Info:
    Model Id: dc115156-ce0e-4202-bbe4-7426e7bee756
    Model Status: Ready
    Training model started on: 8/24/2020 7:00:31 PM +00:00
    Training model completed on: 8/24/2020 7:00:41 PM +00:00
Submodel Form Type: form-0
    FieldName: field-0, FieldLabel: Additional Notes:
    FieldName: field-1, FieldLabel: Address:
    FieldName: field-2, FieldLabel: Company Name:
    FieldName: field-3, FieldLabel: Company Phone:
    FieldName: field-4, FieldLabel: Dated As:
    ...
Form of type: custom:form
Field 'Azure.AI.FormRecognizer.Models.FieldValue:
    Value: '$56,651.49
    Confidence: '0.249
Field 'Azure.AI.FormRecognizer.Models.FieldValue:
    Value: 'PT
    Confidence: '0.245
Field 'Azure.AI.FormRecognizer.Models.FieldValue:
    Value: '99243
    Confidence: '0.114
   ...
```

## Manage custom models

This section demonstrates how to manage the custom models stored in your account. You complete multiple operations within the following method:

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_manage](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

### Check the number of models in the FormRecognizer resource account

The following code block checks how many models you saved in your Document Intelligence account and compares it to the account limit.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_manage_model_count](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

### Output

```output
Account has 20 models.
It can have at most 5000 models.
```

### List the models currently stored in the resource account

The following code blocklists the current models in your account and prints their details to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_manage_model_list](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

This output is truncated for readability.

```output
Custom Model Info:
    Model Id: 05932d5a-a2f8-4030-a2ef-4e5ed7112515
    Model Status: Creating
    Training model started on: 8/24/2020 7:35:02 PM +00:00
    Training model completed on: 8/24/2020 7:35:02 PM +00:00
Custom Model Info:
    Model Id: 150828c4-2eb2-487e-a728-60d5d504bd16
    Model Status: Ready
    Training model started on: 8/24/2020 7:33:25 PM +00:00
    Training model completed on: 8/24/2020 7:33:27 PM +00:00
Custom Model Info:
    Model Id: 3303e9de-6cec-4dfb-9e68-36510a6ecbb2
    Model Status: Ready
    Training model started on: 8/24/2020 7:29:27 PM +00:00
    Training model completed on: 8/24/2020 7:29:36 PM +00:00
```

### Get a specific model using the model's ID

The following code block trains a new model, just like in [Train a model without labels](#train-a-model-without-labels) and then retrieves a second reference to it using its ID.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_manage_model_get](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

This output is truncated for readability.

```output
Custom Model Info:
    Model Id: 150828c4-2eb2-487e-a728-60d5d504bd16
    Model Status: Ready
    Training model started on: 8/24/2020 7:33:25 PM +00:00
    Training model completed on: 8/24/2020 7:33:27 PM +00:00
Submodel Form Type: form-150828c4-2eb2-487e-a728-60d5d504bd16
    FieldName: CompanyAddress
    FieldName: CompanyName
    FieldName: CompanyPhoneNumber
    FieldName: DatedAs
    FieldName: Email
    FieldName: Merchant
    FieldName: PhoneNumber
    FieldName: PurchaseOrderNumber
    FieldName: Quantity
    FieldName: Signature
    FieldName: Subtotal
    FieldName: Tax
    FieldName: Total
    FieldName: VendorName
    FieldName: Website
...
```

### Delete a model from the resource account

You can also delete a model from your account by referencing its ID. This step also closes out the method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/dotnet/FormRecognizer/FormRecognizerQuickstart.cs?name=snippet_manage_model_delete](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Run the application

Run the application from your application directory with the `dotnet run` command.

```dotnetcli
dotnet run
```

## Clean up resources

If you want to clean up and remove an AI Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

- [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
- [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Troubleshooting

When you interact with the Azure Document Intelligence in Foundry Tools client library using the .NET SDK, errors returned by the service result in a `RequestFailedException`. They include the same HTTP status code that a REST API request would return.

For example, if you submit a receipt image with an invalid URI, a `400` error is returned, indicating *Bad Request*.

```csharp
try
{
    RecognizedReceiptCollection receipts = await client.StartRecognizeReceiptsFromUri(new Uri(receiptUri)).WaitForCompletionAsync();
}
catch (RequestFailedException e)
{
    Console.WriteLine(e.ToString());
}
```

You notice that additional information, like the client request ID of the operation, is logged.

```output

Message:
    Azure.RequestFailedException: Service request failed.
    Status: 400 (Bad Request)

Content:
    {"error":{"code":"FailedToDownloadImage","innerError":
    {"requestId":"8ca04feb-86db-4552-857c-fde903251518"},
    "message":"Failed to download image from input URL."}}

Headers:
    Transfer-Encoding: chunked
    x-envoy-upstream-service-time: REDACTED
    apim-request-id: REDACTED
    Strict-Transport-Security: REDACTED
    X-Content-Type-Options: REDACTED
    Date: Mon, 20 Apr 2020 22:48:35 GMT
    Content-Type: application/json; charset=utf-8
```

## Next steps

For this project, you used the Document Intelligence .NET client library to train models and analyze forms in different ways. Next, learn tips to create a better training data set and produce more accurate models.

> 
> [Build and train a custom model](build-a-custom-model.md?view=doc-intel-2.1.0\&preserve-view=true)

- [What is Document Intelligence?](../overview.md)

- The sample code for this project is available on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/dotnet/FormRecognizer/csharp-sdk-quickstart.cs).





**Applies to: programming-language-java**


**Applies to: doc-intel-2.1.0**
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD034 -->

> **Important:**
>
> This project targets Document Intelligence REST API version 2.1.

[Reference documentation](https://learn.microsoft.com/java/api/overview/azure/ai-formrecognizer-readme) | [Library source code](https://github.com/Azure/azure-sdk-for-java/blob/master/sdk/formrecognizer/azure-ai-formrecognizer/src) | [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-ai-formrecognizer) | [Samples](https://github.com/Azure/azure-sdk-for-java/blob/master/sdk/formrecognizer/azure-ai-formrecognizer/src/samples/README.md)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The current version of the [Java Development Kit (JDK)](https://www.oracle.com/technetwork/java/javase/downloads/index.html).
- The [Gradle build tool](https://gradle.org/install/), or another dependency manager.
- <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource." target="_blank">A Document Intelligence resource</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

- An Azure Storage blob that contains a set of training data. See [Build and train a custom model](build-a-custom-model.md?view=doc-intel-2.1.0\&preserve-view=true) for tips and options for putting together your training data set. For this project, you can use the files in the *Train* folder of the [sample data set](https://go.microsoft.com/fwlink/?linkid=2090451). Download and extract *sample_data.zip*.

## Set up your programming environment

To set up your programming environment, create a Gradle project and install the client library.

### Create a new Gradle project

In a console window, create a directory for your app and navigate to it.

```console
mkdir myapp
cd myapp
```

Run the `gradle init` command from your working directory. This command creates essential build files for Gradle, including *build.gradle.kts*, which is used at runtime to create and configure your application.

```console
gradle init --type basic
```

When prompted to choose a **DSL**, select Kotlin.

### Install the client library

This project uses the Gradle dependency manager. You can find the client library and information for other dependency managers on the [Maven Central Repository](https://mvnrepository.com/artifact/com.azure/azure-ai-formrecognizer).

In your project's *build.gradle.kts* file, include the client library as an `implementation` statement, along with the required plugins and settings.

```kotlin
plugins {
    java
    application
}
application {
    mainClass.set("FormRecognizer")
}
repositories {
    mavenCentral()
}
dependencies {
    implementation(group = "com.azure", name = "azure-ai-formrecognizer", version = "3.1.1")
}
```

### Create a Java file

From your working directory, run the following command:

```console
mkdir -p src/main/java
```

Navigate to the new folder and create a file called *FormRecognizer.java*. Open it in an editor or IDE and add the following `import` statements:

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_imports](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

In the application's **FormRecognizer** class, create variables for your resource's key and endpoint.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_creds](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Important:**
> Go to the Azure portal. If the Document Intelligence resource you created in the Prerequisites section deployed successfully, under **Next Steps** select **Go to Resource**. You can find your key and endpoint in **Resource management** under **Keys and Endpoint**.
>
> Remember to remove the key from your code when you're done. Never post it publicly. For production, use secure methods to store and access your credentials. For more information, see Foundry Tools [security](../../security-features.md).

In the application's `main` method, add calls for the methods used in this project. You define these calls later. You also need to add references to the URLs for your training and testing data.

1. To retrieve the SAS URL for your custom model training data, go to your storage resource in the Azure portal and select **Data storage** > **Containers**.
1. Navigate to your container, right-click, and select **Generate SAS**.

   Get the SAS for your container, not for the storage account itself.

1. Make sure the **Read**, **Write**, **Delete**, and **List** permissions are selected, and select **Generate SAS token and URL**.
1. Copy the value in the **URL** section to a temporary location. It should have the form: `https://<storage account>.blob.core.windows.net/<container name>?<SAS value>`.

To get a URL of a form to test, you can use the preceding steps to get the SAS URL of an individual document in blob storage. Or, take the URL of a document located elsewhere.

Use the preceding method to get the URL of a receipt image as well.
<!-- markdownlint-disable MD024 -->

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer-preview.java?name=snippet_mainvars](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer-preview.java?name=snippet_maincalls](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Use the Object model

With Document Intelligence, you can create two different client types. The first, `FormRecognizerClient`, queries the service to recognized form fields and content. The second, `FormTrainingClient`, creates and manages custom models to improve recognition.

`FormRecognizerClient` provides operations for the following tasks:

- Recognize form fields and content by using custom models trained to analyze your custom forms. These values are returned in a collection of `RecognizedForm` objects. See [Analyze custom forms](#analyze-forms-with-a-custom-model).
- Recognize form content, including tables, lines, and words, without the need to train a model. Form content is returned in a collection of `FormPage` objects. See [Analyze layout](#analyze-layout).
- Recognize common fields from US receipts, business cards, invoices, and ID documents using a pretrained model on the Document Intelligence service.

`FormTrainingClient` provides operations to:

- Train custom models to analyze all fields and values found in your custom forms. A `CustomFormModel` is returned that indicate the form types the model analyzes and the fields it extracts for each form type.
- Train custom models to analyze specific fields and values you specify by labeling your custom forms. A `CustomFormModel` is returned that indicates the fields the model extracts and the estimated accuracy for each field.
- Manage models created in your account.
- Copy a custom model from one Document Intelligence resource to another.

> **Note:**
> Models can also be trained using a graphical user interface such as the [Sample Labeling Tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md).

## Authenticate the client

At the top of your `main` method, add the following code. You authenticate two client objects using the subscription variables you defined previously. You use an `AzureKeyCredential` object, so that if needed, you can update the key without creating new client objects.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_auth](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Analyze layout

You can use Document Intelligence to analyze tables, lines, and words in documents, without needing to train a model. For more information about layout extraction, see the [Document Intelligence layout model](../prebuilt/layout.md).

To analyze the content of a file at a given URL, use the `beginRecognizeContentFromUrl` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_getcontent_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also get content from a local file. See the [FormRecognizerClient](https://learn.microsoft.com/java/api/com.azure.ai.formrecognizer.formrecognizerclient) methods, such as `beginRecognizeContent`. Or, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-java/blob/master/sdk/formrecognizer/azure-ai-formrecognizer/src/samples/README.md) for scenarios that involve local images.

The returned value is a collection of `FormPage` objects. There's one object for each page in the submitted document. The following code iterates through these objects and prints the extracted key/value pairs and table data.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_getcontent_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

```output
Get form content...
----Recognizing content ----
Has width: 8.500000 and height: 11.000000, measured with unit: inch.
Table has 2 rows and 6 columns.
Cell has text Invoice Number.
Cell has text Invoice Date.
Cell has text Invoice Due Date.
Cell has text Charges.
Cell has text VAT ID.
Cell has text 458176.
Cell has text 3/28/2018.
Cell has text 4/16/2018.
Cell has text $89,024.34.
Cell has text ET.
```

## Analyze receipts

This section demonstrates how to analyze and extract common fields from US receipts by using a pretrained receipt model. For more information about receipt analysis, see the [Document Intelligence receipt model](../prebuilt/receipt.md).

To analyze receipts from a URI, use the `beginRecognizeReceiptsFromUrl` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_receipts_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local receipt images. See the [FormRecognizerClient](https://learn.microsoft.com/java/api/com.azure.ai.formrecognizer.formrecognizerclient) methods, such as `beginRecognizeReceipts`. Or, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-java/blob/master/sdk/formrecognizer/azure-ai-formrecognizer/src/samples/README.md) for scenarios that involve local images.

The returned value is a collection of `RecognizedReceipt` objects. There's one object for each page in the submitted document. The next block of code iterates through the receipts and prints their details to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_receipts_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The next block of code iterates through the individual items detected on the receipt and prints their details to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_receipts_print_items](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

```console
Analyze receipt...
----------- Recognized Receipt page 0 -----------
Merchant Name: Contoso Contoso, confidence: 0.62
Merchant Address: 123 Main Street Redmond, WA 98052, confidence: 0.99
Transaction Date: 2020-06-10, confidence: 0.90
Receipt Items:
Name: Cappuccino, confidence: 0.96s
Quantity: null, confidence: 0.957s]
Total Price: 2.200000, confidence: 0.95
Name: BACON & EGGS, confidence: 0.94s
Quantity: null, confidence: 0.927s]
Total Price: null, confidence: 0.93
```

## Analyze business cards

This section demonstrates how to analyze and extract common fields from English business cards by using a pretrained model. For more information about business card analysis, see the [Document Intelligence business card model](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/concept-business-card.md).

To analyze business cards from a URL, use the `beginRecognizeBusinessCardsFromUrl` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer-preview.java?name=snippet_bc_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local business card images. See the [FormRecognizerClient](https://learn.microsoft.com/java/api/com.azure.ai.formrecognizer.formrecognizerclient) methods, such as `beginRecognizeBusinessCards`. Or, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-java/blob/master/sdk/formrecognizer/azure-ai-formrecognizer/src/samples/README.md) for scenarios that involve local images.

The returned value is a collection of `RecognizedForm` objects. There's one object for each card in the document. The following code processes the business card at the given URI and prints the major fields and values to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer-preview.java?name=snippet_bc_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Analyze invoices

This section demonstrates how to analyze and extract common fields from sales invoices by using a pretrained model. For more information about invoice analysis, see the [Document Intelligence invoice model](../prebuilt/invoice.md).

To analyze invoices from a URL, use the `beginRecognizeInvoicesFromUrl` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer-preview.java?name=snippet_invoice_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local invoices. See the [FormRecognizerClient](https://learn.microsoft.com/java/api/com.azure.ai.formrecognizer.formrecognizerclient) methods, such as `beginRecognizeInvoices`. Or, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-java/blob/master/sdk/formrecognizer/azure-ai-formrecognizer/src/samples/README.md) for scenarios that involve local images.

The returned value is a collection of `RecognizedForm` objects. There's one object for each invoice in the document. The following code processes the invoice at the given URI and prints the major fields and values to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer-preview.java?name=snippet_invoice_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Analyze ID documents

This section demonstrates how to analyze and extract key information from government-issued identification documents—worldwide passports and U.S. driver's licenses by using the Document Intelligence prebuilt ID model. For more information about ID document analysis, see the [Document Intelligence ID document model](../prebuilt/id-document.md).

To analyze ID documents from a URI, use the `beginRecognizeIdentityDocumentsFromUrl` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer-preview.java?name=snippet_id_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local ID document images. See the [FormRecognizerClient](https://learn.microsoft.com/dotnet/api/azure.ai.formrecognizer.formrecognizerclient) methods, such as `beginRecognizeIdentityDocuments`. Also, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/formrecognizer/Azure.AI.FormRecognizer/samples/README.md) for scenarios that involve local images.

The following code processes the ID document at the given URI and prints the major fields and values to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer-preview.java?name=snippet_id_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Train a custom model

This section demonstrates how to train a model with your own data. A trained model can output structured data that includes the key/value relationships in the original document. After you train the model, you can test, retrain, and eventually use it to reliably extract data from more forms according to your needs.

> **Note:**
> You can also train models with a graphical user interface such as the [Document Intelligence Sample Labeling tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md).

### Train a model without labels

Train custom models to analyze all fields and values found in your custom forms without manually labeling the training documents.

The following method trains a model on a given set of documents and prints the model's status to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_train_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The returned `CustomFormModel` object contains information on the form types the model can analyze and the fields it can extract from each form type. The following code block prints this information to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_train_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

Finally, this method returns the unique ID of the model.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_train_return](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

```console
Train Model with training data...
Model Id: 20c3544d-97b4-49d9-b39b-dc32d85f1358
Model Status: ready
Training started on: 2020-08-31T16:52:09Z
Training completed on: 2020-08-31T16:52:23Z

Recognized Fields:
The subModel has form type form-0
The model found field 'field-0' with label: Address:
The model found field 'field-1' with label: Charges
The model found field 'field-2' with label: Invoice Date
The model found field 'field-3' with label: Invoice Due Date
The model found field 'field-4' with label: Invoice For:
The model found field 'field-5' with label: Invoice Number
The model found field 'field-6' with label: VAT ID
```

### Train a model with labels

You can also train custom models by manually labeling the training documents. Training with labels leads to better performance in some scenarios. To train with labels, you need to have special label information files (*\<filename>.pdf.labels.json*) in your blob storage container alongside the training documents. The [Document Intelligence Sample Labeling tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md) provides a user interface to help you create these label files. After you get them, you can call the `beginTraining` method with the `useTrainingLabels` parameter set to `true`.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_trainlabels_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The returned `CustomFormModel` indicates the fields the model can extract, along with its estimated accuracy in each field. The following code block prints this information to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_trainlabels_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

```console
Train Model with training data...
Model Id: 20c3544d-97b4-49d9-b39b-dc32d85f1358
Model Status: ready
Training started on: 2020-08-31T16:52:09Z
Training completed on: 2020-08-31T16:52:23Z

Recognized Fields:
The subModel has form type form-0
The model found field 'field-0' with label: Address:
The model found field 'field-1' with label: Charges
The model found field 'field-2' with label: Invoice Date
The model found field 'field-3' with label: Invoice Due Date
The model found field 'field-4' with label: Invoice For:
The model found field 'field-5' with label: Invoice Number
The model found field 'field-6' with label: VAT ID
```

## Analyze forms with a custom model

This section demonstrates how to extract key/value information and other content from your custom template types, using models you trained with your own forms.

> **Important:**
> In order to implement this scenario, you must have already trained a model so you can pass its ID into the method operation. See [Train a model with labels](#train-a-model-without-labels).

Use the `beginRecognizeCustomFormsFromUrl` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_analyze_call](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze a local file. See the [FormRecognizerClient](https://learn.microsoft.com/java/api/com.azure.ai.formrecognizer.formrecognizerclient) methods, such as `beginRecognizeCustomForms`. Or, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-java/blob/master/sdk/formrecognizer/azure-ai-formrecognizer/src/samples/README.md) for scenarios that involve local images.

The returned value is a collection of `RecognizedForm` objects. There's one object for each page in the submitted document. The following code prints the analysis results to the console. It prints each recognized field and corresponding value, along with a confidence score.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_analyze_print](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

```console
Analyze PDF form...
----------- Recognized custom template info for page 0 -----------
Form type: form-0
Field 'field-0' has label 'Address:' with a confidence score of 0.91.
Field 'field-1' has label 'Invoice For:' with a confidence score of 1.00.
Field 'field-2' has label 'Invoice Number' with a confidence score of 1.00.
Field 'field-3' has label 'Invoice Date' with a confidence score of 1.00.
Field 'field-4' has label 'Invoice Due Date' with a confidence score of 1.00.
Field 'field-5' has label 'Charges' with a confidence score of 1.00.
Field 'field-6' has label 'VAT ID' with a confidence score of 1.00.
```

## Manage custom models

This section demonstrates how to manage the custom models stored in your account. The following code does all of the model management tasks in a single method, as an example. Start by copying the following method signature:

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_manage](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

### Check the number of models in the FormRecognizer resource account

The following code block checks how many models you saved in your Document Intelligence account and compares it to the account limit.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_manage_count](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

```console
The account has 12 custom models, and we can have at most 250 custom models
```

### List the models currently stored in the resource account

The following code blocklists the current models in your account and prints their details to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_manage_list](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

This response was truncated for readability.

```console
We have following models in the account:
Model Id: 0b048b60-86cc-47ec-9782-ad0ffaf7a5ce
Model Id: 0b048b60-86cc-47ec-9782-ad0ffaf7a5ce
Model Status: ready
Training started on: 2020-06-04T18:33:08Z
Training completed on: 2020-06-04T18:33:10Z
Custom Model Form type: form-0b048b60-86cc-47ec-9782-ad0ffaf7a5ce
Custom Model Accuracy: 1.00
Field Text: invoice date
Field Accuracy: 1.00
Field Text: invoice number
Field Accuracy: 1.00
...
```

### Delete a model from the resource account

You can also delete a model from your account by referencing its ID.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/java/FormRecognizer/FormRecognizer.java?name=snippet_manage_delete](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Run the application

Navigate back to your main project directory. Then, build the app with the following command:

```console
gradle build
```

Run the application with the `run` goal:

```console
gradle run
```

## Clean up resources

If you want to clean up and remove an AI Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

- [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
- [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Troubleshooting

Document Intelligence clients raise `ErrorResponseException` exceptions. For example, if you try to provide an invalid file source URL, an `ErrorResponseException` would be raised with an error that indicates the failure cause. In the following code snippet, the error is handled gracefully by catching the exception and displaying the additional information about the error.

```java Snippet:FormRecognizerBadRequest
try {
    formRecognizerClient.beginRecognizeContentFromUrl("invalidSourceUrl");
} catch (ErrorResponseException e) {
    System.out.println(e.getMessage());
}
```

### Enable client logging

Azure SDKs for Java offer a consistent logging story to help aid in troubleshooting application errors and speeding up their resolution. The logs produced capture the flow of an application before reaching the terminal state to help locate the root issue. For more information about enabling logging, see the [logging wiki](https://github.com/Azure/azure-sdk-for-java/wiki/Logging-with-Azure-SDK).

## Next steps

For this project, you used the Document Intelligence Java client library to train models and analyze forms in different ways. Next, learn tips to create a better training data set and produce more accurate models.

> 
> [Build and train a custom model](build-a-custom-model.md?view=doc-intel-2.1.0\&preserve-view=true)

- [What is Document Intelligence?](../overview.md)

- The sample code for this project can be found on [GitHub](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/formrecognizer/azure-ai-formrecognizer/src/samples).





**Applies to: programming-language-javascript**


**Applies to: doc-intel-2.1.0**
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD034 -->

> **Important:**
>
> This project targets Document Intelligence REST API version 2.1.

[Reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-form-recognizer-readme?view=azure-node-latest\&preserve-view=true) | [Library source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/formrecognizer/ai-form-recognizer/) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-form-recognizer) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The latest version of [Visual Studio Code](https://code.visualstudio.com/).
- The latest LTS version of [Node.js](https://nodejs.org/).
- An Azure Storage blob that contains a set of training data. See [Build and train a custom model](build-a-custom-model.md?view=doc-intel-2.1.0\&preserve-view=true) for tips and options for putting together your training data set. For this project, you can use the files under the *Train* folder of the [sample data set](https://go.microsoft.com/fwlink/?linkid=2090451). Download and extract *sample_data.zip*.
- A Foundry Tools or Document Intelligence resource. <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer"  title="Create a Document Intelligence resource" target="_blank">Create a Document Intelligence resource.</a> You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

## Set up your programming environment

Create an application and install the client library.

### Create a new Node.js application

1. In a console window, create a directory for your app, and navigate to it.

   ```console
   mkdir myapp
   cd myapp
   ```

1. Run the `npm init` command to create a node application with a *package.json* file.

   ```console
   npm init
   ```

### Install the client library

1. Install the `ai-form-recognizer` npm package:

   ```console
   npm install @azure/ai-form-recognizer
   ```

   Your app's *package.json* file is updated with the dependencies.

1. Create a file named *index.js*, open it, and import the following libraries:

   [Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_imports](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

1. Create variables for your resource's Azure endpoint and key.

   [Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_creds](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Important:**
> Go to the Azure portal. If the Document Intelligence resource you created in the Prerequisites section deployed successfully, under **Next Steps** select **Go to Resource**. You can find your key and endpoint in **Resource management** under **Keys and Endpoint**.
>
> Remember to remove the key from your code when you're done. Never post it publicly. For production, use secure methods to store and access your credentials. For more information, see [Foundry Tools security](../../security-features.md).

## Use the Object model

With Document Intelligence, you can create two different client types. The first, `FormRecognizerClient`, queries the service to recognized form fields and content. The second, `FormTrainingClient`, creates and manages custom models to improve recognition.

`FormRecognizerClient` provides the following operations:

- Recognize form fields and content by using custom models trained to analyze your custom forms. These values are returned in a collection of `RecognizedForm` objects.
- Recognize form content, including tables, lines and words, without the need to train a model. Form content is returned in a collection of `FormPage` objects.
- Recognize common fields from US receipts, business cards, invoices, and ID documents by using a pretrained model on the Document Intelligence service.

`FormTrainingClient` provides operations to:

- Train custom models to analyze all fields and values found in your custom forms. A `CustomFormModel` is returned that indicates the form types the model analyzes and the fields that it extracts for each form type. For more information, see the [service's documentation on unlabeled model training](#train-a-model-without-labels).
- Train custom models to analyze specific fields and values you specify by labeling your custom forms. A `CustomFormModel` is returned that indicates the fields the model extracts and the estimated accuracy for each field. For more information, see [Train a model with labels](#train-a-model-with-labels) in this article.
- Manage models created in your account.
- Copy a custom model from one Document Intelligence resource to another.

> **Note:**
> Models can also be trained by using a graphical user interface such as the [Sample Labeling Tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md).

## Authenticate the client

Authenticate a client object by using the subscription variables you defined. Use an `AzureKeyCredential` object, so that if needed, you can update the key without creating new client objects. You also create a training client object.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_auth](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Get assets for testing

You also need to add references to the URLs for your training and testing data.

1. To retrieve the SAS URL for your custom model training data, go to your storage resource in the Azure portal and select **Data storage** > **Containers**.
1. Navigate to your container, right-click, and select **Generate SAS**.

   Get the SAS for your container, not for the storage account itself.

1. Make sure the **Read**, **Write**, **Delete**, and **List** permissions are selected, and select **Generate SAS token and URL**.
1. Copy the value in the **URL** section to a temporary location. It should have the form: `https://<storage account>.blob.core.windows.net/<container name>?<SAS value>`.

Use the sample from and receipt images included in the samples. These images are also available on [GitHub](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/assets). You can use the preceding steps to get the SAS URL of an individual document in blob storage.

## Analyze layout

You can use Document Intelligence to analyze tables, lines, and words in documents, without needing to train a model. For more information about layout extraction, see the [Document Intelligence layout model](../prebuilt/layout.md). To analyze the content of a file at a given URI, use the `beginRecognizeContentFromUrl` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_getcontent](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also get content from a local file with [FormRecognizerClient](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-formrecognizer/formrecognizerclient) methods, such as `beginRecognizeContent`.

```output
Page 1: width 8.5 and height 11 with unit inch
cell [0,0] has text Invoice Number
cell [0,1] has text Invoice Date
cell [0,2] has text Invoice Due Date
cell [0,3] has text Charges
cell [0,5] has text VAT ID
cell [1,0] has text 34278587
cell [1,1] has text 6/18/2017
cell [1,2] has text 6/24/2017
cell [1,3] has text $56,651.49
cell [1,5] has text PT
```

## Analyze receipts

This section demonstrates how to analyze and extract common fields from US receipts, using a pretrained receipt model. For more information about receipt analysis, see the [Document Intelligence receipt model](../prebuilt/receipt.md).

To analyze receipts from a URI, use the `beginRecognizeReceiptsFromUrl` method. The following code processes a receipt at the given URI and prints the major fields and values to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_receipts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local receipt images with [FormRecognizerClient](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-formrecognizer/formrecognizerclient) methods, such as `beginRecognizeReceipts`.

```output
status: notStarted
status: running
status: succeeded
First receipt:
  Receipt Type: 'Itemized', with confidence of 0.659
  Merchant Name: 'Contoso Contoso', with confidence of 0.516
  Transaction Date: 'Sun Jun 09 2019 17:00:00 GMT-0700 (Pacific Daylight Time)', with confidence of 0.985
    Item Name: '8GB RAM (Black)', with confidence of 0.916
    Item Name: 'SurfacePen', with confidence of 0.858
  Total: '1203.39', with confidence of 0.774
```

## Analyze business cards

This section demonstrates how to analyze and extract common fields from English-language business cards, using a pretrained model. For more information about business card analysis, see the [Document Intelligence business card model](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/concept-business-card.md).

To analyze business cards from a URL, use the `beginRecognizeBusinessCardsFromURL` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_bc](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local business card images with [FormRecognizerClient](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-formrecognizer/formrecognizerclient) methods, such as `beginRecognizeBusinessCards`.

## Analyze invoices

This section demonstrates how to analyze and extract common fields from sales invoices, using a pretrained model. For more information about invoice analysis, see the [Document Intelligence invoice model](../prebuilt/invoice.md).

To analyze invoices from a URL, use the `beginRecognizeInvoicesFromUrl` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_invoice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local receipt images with [FormRecognizerClient](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-formrecognizer/formrecognizerclient) methods, such as `beginRecognizeInvoices`.

## Analyze ID documents

This section demonstrates how to analyze and extract key information from government-issued identification documents, including worldwide passports and U.S. driver's licenses, by using the Document Intelligence prebuilt ID model. For more information about ID document analysis, see the [Document Intelligence ID document model](../prebuilt/id-document.md).

To analyze ID documents from a URL, use the `beginRecognizeIdDocumentsFromUrl` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_id](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Train a custom model

This section demonstrates how to train a model with your own data. A trained model can output structured data that includes the key/value relationships in the original document. After you train the model, you can test, retrain, and eventually use it to reliably extract data from more forms according to your needs.

> **Note:**
> You can also train models with a graphical user interface (GUI) such as the [Document Intelligence Sample Labeling tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md).

### Train a model without labels

Train custom models to analyze all the fields and values found in your custom forms without manually labeling the training documents.

The following function trains a model on a given set of documents and prints the model's status to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_train](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

Here's the output for a model trained with the training data available from the [JavaScript SDK](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer). This sample result has been truncated for readability.

```output
training status: creating
training status: ready
Model ID: 9d893595-1690-4cf2-a4b1-fbac0fb11909
Status: ready
Training started on: Thu Aug 20 2020 20:27:26 GMT-0700 (Pacific Daylight Time)
Training completed on: Thu Aug 20 2020 20:27:37 GMT-0700 (Pacific Daylight Time)
We have recognized the following fields
The model found field 'field-0'
The model found field 'field-1'
The model found field 'field-2'
The model found field 'field-3'
The model found field 'field-4'
The model found field 'field-5'
The model found field 'field-6'
The model found field 'field-7'
...
Document name: Form_1.jpg
Document status: succeeded
Document page count: 1
Document errors:
Document name: Form_2.jpg
Document status: succeeded
Document page count: 1
Document errors:
Document name: Form_3.jpg
Document status: succeeded
Document page count: 1
Document errors:
...
```

### Train a model with labels

You can also train custom models by manually labeling the training documents. Training with labels leads to better performance in some scenarios. To train with labels, you need to have special label information files (*\<filename>.pdf.labels.json*) in your blob storage container alongside the training documents. The [Document Intelligence Sample Labeling tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md) provides a UI to help you create these label files. After you get them, you can call the `beginTraining` method with the `uselabels` parameter set to `true`.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_trainlabels](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

Here's the output for a model trained with the training data available from the [JavaScript SDK](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/formrecognizer/ai-form-recognizer/samples). This sample result has been truncated for readability.

```console
training status: creating
training status: ready
Model ID: 789b1b37-4cc3-4e36-8665-9dde68618072
Status: ready
Training started on: Thu Aug 20 2020 20:30:37 GMT-0700 (Pacific Daylight Time)
Training completed on: Thu Aug 20 2020 20:30:43 GMT-0700 (Pacific Daylight Time)
We have recognized the following fields
The model found field 'CompanyAddress'
The model found field 'CompanyName'
The model found field 'CompanyPhoneNumber'
The model found field 'DatedAs'
...
Document name: Form_1.jpg
Document status: succeeded
Document page count: 1
Document errors: undefined
Document name: Form_2.jpg
Document status: succeeded
Document page count: 1
Document errors: undefined
Document name: Form_3.jpg
Document status: succeeded
Document page count: 1
Document errors: undefined
...
```

## Analyze forms with a custom model

This section demonstrates how to extract key/value information and other content from your custom template types, using models you trained with your own forms.

> **Important:**
> In order to implement this scenario, you must have already trained a model so you can pass its ID into the method operation. See the [Train a model](#train-a-model-without-labels) section.

You use the `beginRecognizeCustomFormsFromUrl` method. The returned value is a collection of `RecognizedForm` objects. There's one object for each page in the submitted document.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_analyze](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local files with [FormRecognizerClient](https://learn.microsoft.com/javascript/api/@azure/cognitiveservices-formrecognizer/formrecognizerclient) methods, such as `beginRecognizeCustomForms`.

```console
status: notStarted
status: succeeded
Forms:
custom:form, page range: [object Object]
Pages:
Page number: 1
Tables
cell (0,0) Invoice Number
cell (0,1) Invoice Date
cell (0,2) Invoice Due Date
cell (0,3) Charges
cell (0,5) VAT ID
cell (1,0) 34278587
cell (1,1) 6/18/2017
cell (1,2) 6/24/2017
cell (1,3) $56,651.49
cell (1,5) PT
Fields:
Field Merchant has value 'Invoice For:' with a confidence score of 0.116
Field CompanyPhoneNumber has value '$56,651.49' with a confidence score of 0.249
Field VendorName has value 'Charges' with a confidence score of 0.145
Field CompanyAddress has value '1 Redmond way Suite 6000 Redmond, WA' with a confidence score of 0.258
Field CompanyName has value 'PT' with a confidence score of 0.245
Field Website has value '99243' with a confidence score of 0.114
Field DatedAs has value 'undefined' with a confidence score of undefined
Field Email has value 'undefined' with a confidence score of undefined
Field PhoneNumber has value 'undefined' with a confidence score of undefined
Field PurchaseOrderNumber has value 'undefined' with a confidence score of undefined
Field Quantity has value 'undefined' with a confidence score of undefined
Field Signature has value 'undefined' with a confidence score of undefined
Field Subtotal has value 'undefined' with a confidence score of undefined
Field Tax has value 'undefined' with a confidence score of undefined
Field Total has value 'undefined' with a confidence score of undefined
```

## Manage custom models

This section demonstrates how to manage the custom models stored in your account. The following code does all of the model management tasks in a single function, as an example.

### Get number of models

The following code block gets the number of models currently in your account.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_manage_count](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

### Get list of models in account

The following code block provides a full list of available models in your account including information about when the model was created and its current status.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_manage_list](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

```output
model 0:
{
  modelId: '453cc2e6-e3eb-4e9f-aab6-e1ac7b87e09e',
  status: 'invalid',
  trainingStartedOn: 2020-08-20T22:28:52.000Z,
  trainingCompletedOn: 2020-08-20T22:28:53.000Z
}
model 1:
{
  modelId: '628739de-779c-473d-8214-d35c72d3d4f7',
  status: 'ready',
  trainingStartedOn: 2020-08-20T23:16:51.000Z,
  trainingCompletedOn: 2020-08-20T23:16:59.000Z
}
model 2:
{
  modelId: '789b1b37-4cc3-4e36-8665-9dde68618072',
  status: 'ready',
  trainingStartedOn: 2020-08-21T03:30:37.000Z,
  trainingCompletedOn: 2020-08-21T03:30:43.000Z
}
model 3:
{
  modelId: '9d893595-1690-4cf2-a4b1-fbac0fb11909',
  status: 'ready',
  trainingStartedOn: 2020-08-21T03:27:26.000Z,
  trainingCompletedOn: 2020-08-21T03:27:37.000Z
}
```

### Get list of model IDs by page

This code block provides a paginated list of models and model IDs.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_manage_listpages](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

```output
model 1: 453cc2e6-e3eb-4e9f-aab6-e1ac7b87e09e
model 2: 628739de-779c-473d-8214-d35c72d3d4f7
model 3: 789b1b37-4cc3-4e36-8665-9dde68618072
```

### Get model by ID

The following function takes a model ID and gets the matching model object. This function isn't called by default.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_manage_getmodel](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

### Delete a model from the resource account

You can also delete a model from your account by referencing its ID. This function deletes the model with the given ID. This function isn't called by default.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/javascript/FormRecognizer/FormRecognizerQuickstart.js?name=snippet_manage_delete](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

```output
Model with id 789b1b37-4cc3-4e36-8665-9dde68618072 has been deleted
```

## Run the application

Run the application with the `node` command on your project file.

```console
node index.js
```

## Clean up resources

If you want to clean up and remove an AI Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

- [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
- [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Troubleshooting

You can set the following environment variable to see debug logs when using this library.

```console
export DEBUG=azure*
```

For more detailed instructions on how to enable logs, see the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

For this project, you used the Document Intelligence JavaScript client library to train models and analyze forms in different ways. Next, learn tips to create a better training data set and produce more accurate models.

> 
> [Build and train a custom model](build-a-custom-model.md?view=doc-intel-2.1.0\&preserve-view=true)

- [What is Document Intelligence?](../overview.md)

- The sample code from this project can be found on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/FormRecognizer/FormRecognizerQuickstart.js).





**Applies to: programming-language-python**


**Applies to: doc-intel-2.1.0**
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD034 -->

> **Important:**
>
> This project targets Document Intelligence REST API version 2.1.

[Reference documentation](https://learn.microsoft.com/python/api/azure-ai-formrecognizer) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/formrecognizer/azure-ai-formrecognizer/azure/ai/formrecognizer) | [Package (PyPi)](https://pypi.org/project/azure-ai-formrecognizer/) | [Samples](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/formrecognizer/azure-ai-formrecognizer/samples)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Python 3.x](https://www.python.org/). Your Python installation should include [pip](https://pip.pypa.io/en/stable/). You can check whether you have pip installed by running `pip --version` on the command line. Get pip by installing the latest version of Python.
- An Azure Storage blob that contains a set of training data. See [Build and train a custom model](build-a-custom-model.md?view=doc-intel-2.1.0\&preserve-view=true) for tips and options for putting together your training data set. For this project, you can use the files under the *Train* folder of the [sample data set](https://go.microsoft.com/fwlink/?linkid=2090451). Download and extract *sample_data.zip*.
- A Document Intelligence resource. <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer"  title="Create a Document Intelligence resource."  target="_blank">Create a Document Intelligence resource </a> in the Azure portal. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

## Set up your programming environment

Install the client library and create a Python application.

### Install the client library

- After installing Python, run the following command to install the latest version of the Document Intelligence client library.

  ```console
  pip install azure-ai-formrecognizer 
  ```

### Create a Python application

1. Create a Python application named *form-recognizer.py* in an editor or IDE.
1. Import the following libraries.

   [Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart.py?name=snippet_imports](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

1. Create variables for your resource's Azure endpoint and key.

   [Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart.py?name=snippet_creds](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Use the Object model

With Document Intelligence, you can create two different client types. The first—`form_recognizer_client`—queries the service to recognize form fields and content. The second—`form_training_client`—creates and manages custom models to improve recognition.

`form_recognizer_client` provides the following operations:

- Recognize form fields and content by using custom models trained to analyze your custom forms.
- Recognize form content, including tables, lines, and words, without the need to train a model.
- Recognize common fields from receipts by using a pretrained receipt model on the Document Intelligence service.

`form_training_client` provides operations to:

- Train custom models to analyze all fields and values found in your custom forms. See [Train a model without labels](#train-a-model-without-labels) in this article.
- Train custom models to analyze specific fields and values that you specify by labeling your custom forms. See [Train a model with labels](#train-a-model-with-labels) in this article.
- Manage models created in your account.
- Copy a custom model from one Document Intelligence resource to another.

> **Note:**
> Models can also be trained using a graphical user interface such as the [Document Intelligence Labeling Tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md).

## Authenticate the client

Authenticate two client objects using the subscription variables you defined previously. Use an `AzureKeyCredential` object, so that if needed, you can update the key without creating new client objects.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart.py?name=snippet_auth](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Get assets for testing

You need to add references to the URLs for your training and testing data.

1. To retrieve the SAS URL for your custom model training data, go to your storage resource in the Azure portal and select **Data storage** > **Containers**.
1. Navigate to your container, right-click, and select **Generate SAS**.

   Get the SAS for your container, not for the storage account itself.

1. Make sure the **Read**, **Write**, **Delete**, and **List** permissions are selected, and select **Generate SAS token and URL**.
1. Copy the value in the **URL** section to a temporary location. It should have the form: `https://<storage account>.blob.core.windows.net/<container name>?<SAS value>`.

Use the sample form and receipt images included in the samples, which is also available on [GitHub](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/formrecognizer/azure-ai-formrecognizer/samples/sample_forms). Alternatively, or you can use the above steps to get the SAS URL of an individual document in blob storage.

> **Note:**
> The code snippets in this project use remote forms accessed by URLs. If you want to process local documents instead, see the related methods in the [reference documentation](https://learn.microsoft.com/python/api/azure-ai-formrecognizer) and [samples](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/formrecognizer/azure-ai-formrecognizer/samples).

## Analyze layout

You can use Document Intelligence to analyze tables, lines, and words in documents, without needing to train a model. For more information about layout extraction, see the [Document Intelligence layout model](../prebuilt/layout.md).

To analyze the content of a file at a given URL, use the `begin_recognize_content_from_url` method. The returned value is a collection of `FormPage` objects. There's one object for each page in the submitted document. The following code iterates through these objects and prints the extracted key/value pairs and table data.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart.py?name=snippet_getcontent](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also get content from local images with the [FormRecognizerClient](https://learn.microsoft.com/python/api/azure-ai-formrecognizer/azure.ai.formrecognizer.formrecognizerclient) methods, such as `begin_recognize_content`.

```output
Table found on page 1:
Cell text: Invoice Number
Location: [Point(x=0.5075, y=2.8088), Point(x=1.9061, y=2.8088), Point(x=1.9061, y=3.3219), Point(x=0.5075, y=3.3219)]
Confidence score: 1.0

Cell text: Invoice Date
Location: [Point(x=1.9061, y=2.8088), Point(x=3.3074, y=2.8088), Point(x=3.3074, y=3.3219), Point(x=1.9061, y=3.3219)]
Confidence score: 1.0

Cell text: Invoice Due Date
Location: [Point(x=3.3074, y=2.8088), Point(x=4.7074, y=2.8088), Point(x=4.7074, y=3.3219), Point(x=3.3074, y=3.3219)]
Confidence score: 1.0

Cell text: Charges
Location: [Point(x=4.7074, y=2.8088), Point(x=5.386, y=2.8088), Point(x=5.386, y=3.3219), Point(x=4.7074, y=3.3219)]
Confidence score: 1.0
...

```

## Analyze receipts

This section demonstrates how to analyze and extract common fields from US receipts by using a pretrained receipt model. For more information about receipt analysis, see the [Document Intelligence receipt model](../prebuilt/receipt.md). To analyze receipts from a URL, use the `begin_recognize_receipts_from_url` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart.py?name=snippet_receipts](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local receipt images with the [FormRecognizerClient](https://learn.microsoft.com/python/api/azure-ai-formrecognizer/azure.ai.formrecognizer.formrecognizerclient) methods, such as `begin_recognize_receipts`.

```output
ReceiptType: Itemized has confidence 0.659
MerchantName: Contoso Contoso has confidence 0.516
MerchantAddress: 123 Main Street Redmond, WA 98052 has confidence 0.986
MerchantPhoneNumber: None has confidence 0.99
TransactionDate: 2019-06-10 has confidence 0.985
TransactionTime: 13:59:00 has confidence 0.968
Receipt Items:
...Item #1
......Name: 8GB RAM (Black) has confidence 0.916
......TotalPrice: 999.0 has confidence 0.559
...Item #2
......Quantity: None has confidence 0.858
......Name: SurfacePen has confidence 0.858
......TotalPrice: 99.99 has confidence 0.386
Subtotal: 1098.99 has confidence 0.964
Tax: 104.4 has confidence 0.713
Total: 1203.39 has confidence 0.774
```

## Analyze business cards

This section demonstrates how to analyze and extract common fields from English business cards, using a pretrained model. For more information about business card analysis, see the [Document Intelligence business card model](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/concept-business-card.md).

To analyze business cards from a URL, use the `begin_recognize_business_cards_from_url` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart-preview.py?name=snippet_bc](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
 > You can also analyze local business card images with the [FormRecognizerClient](https://learn.microsoft.com/python/api/azure-ai-formrecognizer/azure.ai.formrecognizer.formrecognizerclient) methods, such as `begin_recognize_business_cards`.

## Analyze invoices

This section demonstrates how to analyze and extract common fields from sales invoices by using a pretrained model. For more information about invoice analysis, see the [Document Intelligence invoice model](../prebuilt/invoice.md).

To analyze invoices from a URL, use the `begin_recognize_invoices_from_url` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart-preview.py?name=snippet_invoice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local invoice images with the [FormRecognizerClient](https://learn.microsoft.com/python/api/azure-ai-formrecognizer/azure.ai.formrecognizer.formrecognizerclient) methods, such as `begin_recognize_invoices`.

## Analyze ID documents

This section demonstrates how to analyze and extract key information from government-issued identification documents such as worldwide passports and U.S. driver's licenses using the prebuilt ID model. For more information about ID document analysis, see the [Document Intelligence ID document model](../prebuilt/id-document.md).

To analyze ID documents from a URL, use the `begin_recognize_id_documents_from_url` method.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart-preview.py?name=snippet_id](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze ID document images with the [FormRecognizerClient](https://learn.microsoft.com/python/api/azure-ai-formrecognizer/azure.ai.formrecognizer.formrecognizerclient?view=azure-python\&preserve-view=true#methods) methods, such as `begin_recognize_identity_documents`.

## Train a custom model

This section demonstrates how to train a model with your own data. A trained model can output structured data that includes the key/value relationships in the original document. After you train the model, you can test, retrain, and eventually use it to reliably extract data from more forms according to your needs.

> **Note:**
> You can also train models with a graphical user interface such as the [Document Intelligence Sample Labeling tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md).

### Train a model without labels

Train custom models to analyze all fields and values found in your custom forms without manually labeling the training documents.

The following code uses the training client with the `begin_training` function to train a model on a given set of documents. The returned `CustomFormModel` object contains information on the form types the model can analyze and the fields it can extract from each form type. The following code block prints this information to the console.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart.py?name=snippet_train](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

Here's the output for a model trained with the training data available from the [Python SDK](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/formrecognizer/azure-ai-formrecognizer/samples/sample_forms/training).

```output
Model ID: 628739de-779c-473d-8214-d35c72d3d4f7
Status: ready
Training started on: 2020-08-20 23:16:51+00:00
Training completed on: 2020-08-20 23:16:59+00:00

Recognized fields:
The submodel with form type 'form-0' has recognized the following fields: Additional Notes:, Address:, Company Name:, Company Phone:, Dated As:, Details, Email:, Hero Limited, Name:, Phone:, Purchase Order, Purchase Order #:, Quantity, SUBTOTAL, Seattle, WA 93849 Phone:, Shipped From, Shipped To, TAX, TOTAL, Total, Unit Price, Vendor Name:, Website:
Document name: Form_1.jpg
Document status: succeeded
Document page count: 1
Document errors: []
Document name: Form_2.jpg
Document status: succeeded
Document page count: 1
Document errors: []
Document name: Form_3.jpg
Document status: succeeded
Document page count: 1
Document errors: []
Document name: Form_4.jpg
Document status: succeeded
Document page count: 1
Document errors: []
Document name: Form_5.jpg
Document status: succeeded
Document page count: 1
Document errors: []
```

### Train a model with labels

You can also train custom models by manually labeling the training documents. Training with labels leads to better performance in some scenarios. The returned `CustomFormModel` indicates the fields the model can extract, along with its estimated accuracy in each field. The following code block prints this information to the console.

> **Important:**
> To train with labels, you need to have special label information files (*\<filename>.pdf.labels.json*) in your blob storage container alongside the training documents. The [Document Intelligence Sample Labeling tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md) provides a UI to help you create these label files. After you get them, you can call the `begin_training` function with the `use_training_labels` parameter set to `true`.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart.py?name=snippet_trainlabels](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

Here's the output for a model trained with the training data available from the [Python SDK](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/formrecognizer/azure-ai-formrecognizer/samples/sample_forms/training).

```output
Model ID: ae636292-0b14-4e26-81a7-a0bfcbaf7c91

Status: ready
Training started on: 2020-08-20 23:20:56+00:00
Training completed on: 2020-08-20 23:20:57+00:00

Recognized fields:
The submodel with form type 'form-ae636292-0b14-4e26-81a7-a0bfcbaf7c91' has recognized the following fields: CompanyAddress, CompanyName, CompanyPhoneNumber, DatedAs, Email, Merchant, PhoneNumber, PurchaseOrderNumber, Quantity, Signature, Subtotal, Tax, Total, VendorName, Website
Document name: Form_1.jpg
Document status: succeeded
Document page count: 1
Document errors: []
Document name: Form_2.jpg
Document status: succeeded
Document page count: 1
Document errors: []
Document name: Form_3.jpg
Document status: succeeded
Document page count: 1
Document errors: []
Document name: Form_4.jpg
Document status: succeeded
Document page count: 1
Document errors: []
Document name: Form_5.jpg
Document status: succeeded
Document page count: 1
Document errors: []
```

## Analyze forms with a custom model

This section demonstrates how to extract key/value information and other content from your custom template types, using models you trained with your own forms.

> **Important:**
> In order to implement this scenario, you must have a trained a model so you can pass its ID into the method operation. See the [Train a model](#train-a-model-without-labels) section.

You use the `begin_recognize_custom_forms_from_url` method. The returned value is a collection of `RecognizedForm` objects. There's one object for each page in the submitted document. The following code prints the analysis results to the console. It prints each recognized field and corresponding value, along with a confidence score.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart.py?name=snippet_analyze](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

> **Tip:**
> You can also analyze local images. See the [FormRecognizerClient](https://learn.microsoft.com/python/api/azure-ai-formrecognizer/azure.ai.formrecognizer.formrecognizerclient) methods, such as `begin_recognize_custom_forms`. Or, see the sample code on [GitHub](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/formrecognizer/azure-ai-formrecognizer/samples) for scenarios involving local images.

The model from the previous example renders the following output:

```output
Form type: form-ae636292-0b14-4e26-81a7-a0bfcbaf7c91
Field 'Merchant' has label 'Merchant' with value 'Invoice For:' and a confidence score of 0.116
Field 'CompanyAddress' has label 'CompanyAddress' with value '1 Redmond way Suite 6000 Redmond, WA' and a confidence score of 0.258
Field 'Website' has label 'Website' with value '99243' and a confidence score of 0.114
Field 'VendorName' has label 'VendorName' with value 'Charges' and a confidence score of 0.145
Field 'CompanyPhoneNumber' has label 'CompanyPhoneNumber' with value '$56,651.49' and a confidence score of 0.249
Field 'CompanyName' has label 'CompanyName' with value 'PT' and a confidence score of 0.245
Field 'DatedAs' has label 'DatedAs' with value 'None' and a confidence score of None
Field 'Email' has label 'Email' with value 'None' and a confidence score of None
Field 'PhoneNumber' has label 'PhoneNumber' with value 'None' and a confidence score of None
Field 'PurchaseOrderNumber' has label 'PurchaseOrderNumber' with value 'None' and a confidence score of None
Field 'Quantity' has label 'Quantity' with value 'None' and a confidence score of None
Field 'Signature' has label 'Signature' with value 'None' and a confidence score of None
Field 'Subtotal' has label 'Subtotal' with value 'None' and a confidence score of None
Field 'Tax' has label 'Tax' with value 'None' and a confidence score of None
Field 'Total' has label 'Total' with value 'None' and a confidence score of None
```

## Manage custom models

This section demonstrates how to manage the custom models stored in your account.

### Check the number of models in the FormRecognizer resource account

The following code block checks how many models you saved in your Document Intelligence account and compares it to the account limit.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart.py?name=snippet_manage_count](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

```console
Our account has 5 custom models, and we can have at most 5000 custom models
```

### List the models currently stored in the resource account

The following code blocklists the current models in your account and prints their details to the console. It also saves a reference to the first model.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart.py?name=snippet_manage_list](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

The result looks like the following output.

Here's a sample output for the test account.

```output
We have models with the following ids:
453cc2e6-e3eb-4e9f-aab6-e1ac7b87e09e
628739de-779c-473d-8214-d35c72d3d4f7
ae636292-0b14-4e26-81a7-a0bfcbaf7c91
b4b5df77-8538-4ffb-a996-f67158ecd305
c6309148-6b64-4fef-aea0-d39521452699
```

### Get a specific model using the model's ID

The following code block uses the model ID saved from the previous section and uses it to retrieve details about the model.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart.py?name=snippet_manage_getmodel](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

Here's the sample output for the custom model created in the previous example.

```output
Model ID: ae636292-0b14-4e26-81a7-a0bfcbaf7c91
Status: ready
Training started on: 2020-08-20 23:20:56+00:00
Training completed on: 2020-08-20 23:20:57+00:00
```

### Delete a model from the resource account

You can also delete a model from your account by referencing its ID. This code deletes the model used in the previous section.

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerQuickstart.py?name=snippet_manage_delete](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## Run the application

Run the application with the `python` command:

```console
python form-recognizer.py
```

## Clean up resources

If you want to clean up and remove an AI Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

- [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
- [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Troubleshooting

These issues might be helpful in troubleshooting.

### Logging

This library uses the [standard logging library](https://docs.python.org/3/library/logging.html) for logging. Basic information about HTTP sessions, such as URLs and headers, is logged at the INFO level.

Detailed DEBUG level logging, including request/response bodies and unredacted headers, can be enabled on a client with the `logging_enable` keyword argument:

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerLogging.py?name=snippet_logging](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

Similarly, `logging_enable` can enable detailed logging for a single operation, even when it isn't enabled for the client:

[Code reference unavailable in this source snapshot: includes/v2-1/~/cognitive-services-quickstart-code/python/FormRecognizer/FormRecognizerLogging.py?name=snippet_example](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/how-to-guides/use-sdk-rest-api.md)

## REST samples on GitHub

- Extract text, selection marks, and table structure from documents: [Extract layout data - Python](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/rest/python-layout.md)
- Train a custom model and extract custom form data:

  - [Train without labels - Python](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/rest/python-train-extract.md)
  - [Train with labels - Python](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/rest/python-labeled-data.md)
  
- Extract data from invoices: [Extract invoice data - Python](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/rest/python-invoices.md)
- Extract data from sales receipts: [Extract receipt data - Python](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/rest/python-receipts.md)
- Extract data from business cards: [Extract business card data - Python](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/rest/python-business-cards.md)

## Next steps

For this project, you used the Document Intelligence Python client library to train models and analyze forms in different ways. Next, learn tips to create a better training data set and produce more accurate models.

> 
> [Build and train a custom model](build-a-custom-model.md?view=doc-intel-2.1.0\&preserve-view=true)

- [What is Document Intelligence?](../overview.md)

- The sample code for this project can be found on [GitHub](https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/python/FormRecognizer/FormRecognizerQuickstart.py).





**Applies to: programming-language-rest-api**


**Applies to: doc-intel-2.1.0**
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD034 -->

> **Note:**
>
> This project targets Azure Document Intelligence in Foundry Tools API version 2.1 using cURL to execute REST API calls.

[Document Intelligence REST API](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) | [Azure REST API reference](https://learn.microsoft.com/rest/api/azure/)

## Prerequisites

- An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The cURL command line tool installed. Windows 10 and Windows 11 ship with a copy of cURL. At a command prompt, type the following cURL command. If the help options display, cURL is installed in your Windows environment.

  ```console
  curl -help
  ```

  If cURL isn't installed, you can get it here:

  - [Windows](https://curl.haxx.se/windows/)
  - [Mac or Linux](https://curl.se/)

- [PowerShell version 6.0+](https://learn.microsoft.com/powershell/scripting/install/installing-powershell-core-on-windows), or a similar command-line application.
- An Azure Storage blob that contains a set of training data. See [Build and train a custom model](build-a-custom-model.md?view=doc-intel-2.1.0\&preserve-view=true) for tips and options for putting together your training data set. You can use the files under the **Train** folder of the [sample data set](https://go.microsoft.com/fwlink/?linkid=2090451). Download and extract *sample_data.zip*.
- A Foundry Tools or Document Intelligence resource. Create a <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer" title="Create a Document Intelligence resource." target="_blank">single-service</a> or <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry" title="Create a multiple Document Intelligence resource." target="_blank">multi-service</a>. You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
- The key and endpoint from the resource you create to connect your application to the Azure Document Intelligence.

  1. After your resource deploys, select **Go to resource**.
  1. In the left pane, select **Keys and Endpoint**.
  1. Copy one of the keys and the **Endpoint** for use later in this article.

  Screenshot of keys and endpoint location in the Azure portal.

- A URL for an *image of a receipt*. You can use a [sample image](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-allinone.jpg).
- A URL for an *image of a business card*. You can use a [sample image](https://raw.githubusercontent.com/Azure/azure-sdk-for-python/master/sdk/formrecognizer/azure-ai-formrecognizer/samples/sample_forms/business_cards/business-card-english.jpg).
- A URL for an *image of an invoice*. You can use a [sample document](https://raw.githubusercontent.com/Azure/azure-sdk-for-python/master/sdk/formrecognizer/azure-ai-formrecognizer/samples/sample_forms/forms/Invoice_1.pdf).
- A URL for an *image of an ID document*. You can use a [sample image](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/DriverLicense.png)

## Analyze layout

You can use Document Intelligence to analyze and extract tables, selection marks, text, and structure in documents, without needing to train a model. For more information about layout extraction, see the [Document Intelligence layout model](../prebuilt/layout.md).

Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence subscription.
1. Replace *\<key>* with the key you copied from the previous step.
1. Replace *\<your-document-url>* with one of the example URLs.

```console
curl -v -i POST "https://<endpoint>/formrecognizer/v2.1/layout/analyze" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: <key>" --data-ascii "{​​​​​​​'source': '<your-document-url>'}​​​​​​​​"
```

You receive a `202 (Success)` response that includes a read-only `Operation-Location` header. The value of this header contains a `resultId` that can be queried to get the status of the asynchronous operation and retrieve the results using a GET request with your same resource subscription key:

```output
https://cognitiveservice/formrecognizer/v2.1/layout/analyzeResults/<resultId>
```

In the following example, as part of the URL, the string after `analyzeResults/` is the result ID.

```console
https://cognitiveservice/formrecognizer/v2/layout/analyzeResults/54f0b076-4e38-43e5-81bd-b85b8835fdfb
```

### Get layout results

After you called the [Analyze Layout](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) API, poll the [Get Analyze Layout Result](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) API to get the status of the operation and the extracted data. Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence subscription.
1. Replace *\<key>* with the key you copied from the previous step.
1. Replace *\<resultId>* with the result ID from the previous step.
<!-- markdownlint-disable MD024 -->

```console
curl -v -X GET "https://<endpoint>/formrecognizer/v2.1/layout/analyzeResults/<resultId>" -H "Ocp-Apim-Subscription-Key: <key>"
```

You receive a `200 (success)` response with JSON content.

See the following invoice image and its corresponding JSON output.

- The `"readResults"` node contains every line of text with its respective bounding box placement on the page.
- The `selectionMarks` node shows every selection mark (checkbox, radio mark) and whether its status is `selected` or `unselected`.
- The `"pageResults"` section includes the tables extracted. For each table, the text, row, and column index, row and column spanning, bounding box, and more are extracted.

Photograph of Contoso project statement document with a table.

This response body output has been shortened for simplicity. See the [full sample output on GitHub](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/blob/master/curl/form-recognizer/sample-layout-output.json).

```json
{
    "status": "succeeded",
    "createdDateTime": "2020-08-20T20:40:50Z",
    "lastUpdatedDateTime": "2020-08-20T20:40:55Z",
    "analyzeResult": {
        "version": "2.1.0",
        "readResults": [
            {
                "page": 1,
                "angle": 0,
                "width": 8.5,
                "height": 11,
                "unit": "inch",
                "lines": [
                    {
                        "boundingBox": [
                            0.5826,
                            0.4411,
                            2.3387,
                            0.4411,
                            2.3387,
                            0.7969,
                            0.5826,
                            0.7969
                        ],
                        "text": "Contoso, Ltd.",
                        "words": [
                            {
                                "boundingBox": [
                                    0.5826,
                                    0.4411,
                                    1.744,
                                    0.4411,
                                    1.744,
                                    0.7969,
                                    0.5826,
                                    0.7969
                                ],
                                "text": "Contoso,",
                                "confidence": 1
                            },
                            {
                                "boundingBox": [
                                    1.8448,
                                    0.4446,
                                    2.3387,
                                    0.4446,
                                    2.3387,
                                    0.7631,
                                    1.8448,
                                    0.7631
                                ],
                                "text": "Ltd.",
                                "confidence": 1
                            }
                        ]
                    },
                    ...
                        ]
                    }
                ],
                "selectionMarks": [
                    {
                        "boundingBox": [
                            3.9737,
                            3.7475,
                            4.1693,
                            3.7475,
                            4.1693,
                            3.9428,
                            3.9737,
                            3.9428
                        ],
                        "confidence": 0.989,
                        "state": "selected"
                    },
                    ...
                ]
            }
        ],
        "pageResults": [
            {
                "page": 1,
                "tables": [
                    {
                        "rows": 5,
                        "columns": 5,
                        "cells": [
                            {
                                "rowIndex": 0,
                                "columnIndex": 0,
                                "text": "Training Date",
                                "boundingBox": [
                                    0.5133,
                                    4.2167,
                                    1.7567,
                                    4.2167,
                                    1.7567,
                                    4.4492,
                                    0.5133,
                                    4.4492
                                ],
                                "elements": [
                                    "#/readResults/0/lines/12/words/0",
                                    "#/readResults/0/lines/12/words/1"
                                ]
                            },
                            ...
                        ]
                    },
                    ...
                ]
            }
        ]
    }
}
```

## Analyze receipts

This section demonstrates how to analyze and extract common fields from US receipts, using a pretrained receipt model. For more information about receipt analysis, see the [Document Intelligence receipt model](../prebuilt/receipt.md). To start analyzing a receipt, call the [Analyze Receipt](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) API using the cURL command. Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence subscription.
1. Replace *\<your receipt URL>* with the URL address of a receipt image.
1. Replace *\<key>`* with the key you copied from the previous step.

```console
curl -i -X POST "https://<endpoint>/formrecognizer/v2.1/prebuilt/receipt/analyze" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: <key>" --data-ascii "{ 'source': '<your receipt URL>'}"
```

You receive a `202 (Success)` response that includes an `Operation-Location` header. The value of this header contains a result ID that you can use to query the status of the asynchronous operation and get the results:

```output
https://cognitiveservice/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/<resultId>
```

In the following example, the string after `operations/` is the result ID:

```console
https://cognitiveservice/formrecognizer/v2.1/prebuilt/receipt/operations/aeb13e15-555d-4f02-ba47-04d89b487ed5
```

### Get receipt results

After you've called the Analyze Receipt API, call the [Get Analyze Receipt Result](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) API to get the status of the operation and the extracted data. Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence key.
1. Replace *\<resultId>* with the result ID from the previous step.
1. Replace *\<key>* with your key.

```console
curl -X GET "https://<endpoint>/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/<resultId>" -H "Ocp-Apim-Subscription-Key: <key>"
```

You receive a `200 (Success)` response with JSON output. The first field, `"status"`, indicates the status of the operation. If the operation isn't complete, the value of `"status"` is `"running"` or `"notStarted"`, and you should call the API again, either manually or through a script. We recommend an interval of one second or more between calls.

The `"readResults"` node contains all of the recognized text, if you set the optional `includeTextDetails` parameter to `true`). The response organizes text by page, then by line, then by individual words. The `"documentResults"` node contains the receipt-specific values that the model discovered. The  `"documentResults"` node is where you find useful key/value pairs like the tax, total, merchant address, and so on.

See the following receipt image and its corresponding JSON output.

Photograph shows a printed receipt from Contoso.

This response body output has been shortened for readability. See the [full sample output on GitHub](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/blob/master/curl/form-recognizer/receipt-result.json).

```json
{
  "status":"succeeded",
  "createdDateTime":"2019-12-17T04:11:24Z",
  "lastUpdatedDateTime":"2019-12-17T04:11:32Z",
  "analyzeResult":{
    "version":"2.1.0",
    "readResults":[
      {
        "page":1,
        "angle":0.6893,
        "width":1688,
        "height":3000,
        "unit":"pixel",
        "language":"en",
        "lines":[
          {
            "text":"Contoso",
            "boundingBox":[
              635,
              510,
              1086,
              461,
              1098,
              558,
              643,
              604
            ],
            "words":[
              {
                "text":"Contoso",
                "boundingBox":[
                  639,
                  510,
                  1087,
                  461,
                  1098,
                  551,
                  646,
                  604
                ],
                "confidence":0.955
              }
            ]
          },
          ...
        ]
      }
    ],
    "documentResults":[
      {
        "docType":"prebuilt:receipt",
        "pageRange":[
          1,
          1
        ],
        "fields":{
          "ReceiptType":{
            "type":"string",
            "valueString":"Itemized",
            "confidence":0.692
          },
          "MerchantName":{
            "type":"string",
            "valueString":"Contoso Contoso",
            "text":"Contoso Contoso",
            "boundingBox":[
              378.2,
              292.4,
              1117.7,
              468.3,
              1035.7,
              812.7,
              296.3,
              636.8
            ],
            "page":1,
            "confidence":0.613,
            "elements":[
              "#/readResults/0/lines/0/words/0",
              "#/readResults/0/lines/1/words/0"
            ]
          },
          "MerchantAddress":{
            "type":"string",
            "valueString":"123 Main Street Redmond, WA 98052",
            "text":"123 Main Street Redmond, WA 98052",
            "boundingBox":[
              302,
              675.8,
              848.1,
              793.7,
              809.9,
              970.4,
              263.9,
              852.5
            ],
            "page":1,
            "confidence":0.99,
            "elements":[
              "#/readResults/0/lines/2/words/0",
              "#/readResults/0/lines/2/words/1",
              "#/readResults/0/lines/2/words/2",
              "#/readResults/0/lines/3/words/0",
              "#/readResults/0/lines/3/words/1",
              "#/readResults/0/lines/3/words/2"
            ]
          },
          "MerchantPhoneNumber":{
            "type":"phoneNumber",
            "valuePhoneNumber":"+19876543210",
            "text":"987-654-3210",
            "boundingBox":[
              278,
              1004,
              656.3,
              1054.7,
              646.8,
              1125.3,
              268.5,
              1074.7
            ],
            "page":1,
            "confidence":0.99,
            "elements":[
              "#/readResults/0/lines/4/words/0"
            ]
          },
          "TransactionDate":{
            "type":"date",
            "valueDate":"2019-06-10",
            "text":"6/10/2019",
            "boundingBox":[
              265.1,
              1228.4,
              525,
              1247,
              518.9,
              1332.1,
              259,
              1313.5
            ],
            "page":1,
            "confidence":0.99,
            "elements":[
              "#/readResults/0/lines/5/words/0"
            ]
          },
          "TransactionTime":{
            "type":"time",
            "valueTime":"13:59:00",
            "text":"13:59",
            "boundingBox":[
              541,
              1248,
              677.3,
              1261.5,
              668.9,
              1346.5,
              532.6,
              1333
            ],
            "page":1,
            "confidence":0.977,
            "elements":[
              "#/readResults/0/lines/5/words/1"
            ]
          },
          "Items":{
            "type":"array",
            "valueArray":[
              {
                "type":"object",
                "valueObject":{
                  "Quantity":{
                    "type":"number",
                    "text":"1",
                    "boundingBox":[
                      245.1,
                      1581.5,
                      300.9,
                      1585.1,
                      295,
                      1676,
                      239.2,
                      1672.4
                    ],
                    "page":1,
                    "confidence":0.92,
                    "elements":[
                      "#/readResults/0/lines/7/words/0"
                    ]
                  },
                  "Name":{
                    "type":"string",
                    "valueString":"Cappuccino",
                    "text":"Cappuccino",
                    "boundingBox":[
                      322,
                      1586,
                      654.2,
                      1601.1,
                      650,
                      1693,
                      317.8,
                      1678
                    ],
                    "page":1,
                    "confidence":0.923,
                    "elements":[
                      "#/readResults/0/lines/7/words/1"
                    ]
                  },
                  "TotalPrice":{
                    "type":"number",
                    "valueNumber":2.2,
                    "text":"$2.20",
                    "boundingBox":[
                      1107.7,
                      1584,
                      1263,
                      1574,
                      1268.3,
                      1656,
                      1113,
                      1666
                    ],
                    "page":1,
                    "confidence":0.918,
                    "elements":[
                      "#/readResults/0/lines/8/words/0"
                    ]
                  }
                }
              },
              ...
            ]
          },
          "Subtotal":{
            "type":"number",
            "valueNumber":11.7,
            "text":"11.70",
            "boundingBox":[
              1146,
              2221,
              1297.3,
              2223,
              1296,
              2319,
              1144.7,
              2317
            ],
            "page":1,
            "confidence":0.955,
            "elements":[
              "#/readResults/0/lines/13/words/1"
            ]
          },
          "Tax":{
            "type":"number",
            "valueNumber":1.17,
            "text":"1.17",
            "boundingBox":[
              1190,
              2359,
              1304,
              2359,
              1304,
              2456,
              1190,
              2456
            ],
            "page":1,
            "confidence":0.979,
            "elements":[
              "#/readResults/0/lines/15/words/1"
            ]
          },
          "Tip":{
            "type":"number",
            "valueNumber":1.63,
            "text":"1.63",
            "boundingBox":[
              1094,
              2479,
              1267.7,
              2485,
              1264,
              2591,
              1090.3,
              2585
            ],
            "page":1,
            "confidence":0.941,
            "elements":[
              "#/readResults/0/lines/17/words/1"
            ]
          },
          "Total":{
            "type":"number",
            "valueNumber":14.5,
            "text":"$14.50",
            "boundingBox":[
              1034.2,
              2617,
              1387.5,
              2638.2,
              1380,
              2763,
              1026.7,
              2741.8
            ],
            "page":1,
            "confidence":0.985,
            "elements":[
              "#/readResults/0/lines/19/words/0"
            ]
          }
        }
      }
    ]
  }
}
```

## Analyze business cards

This section demonstrates how to analyze and extract common fields from English business cards, using a pretrained model. For more information about business card analysis, see the [Document Intelligence business card model](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/concept-business-card.md). To start analyzing a business card, you call the [Analyze Business Card](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) API using the cURL command. Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence subscription.
1. Replace *\<your business card URL>* with the URL address of a receipt image.
1. Replace *\<key>* with the key you copied from the previous step.

```console
curl -i -X POST "https://<endpoint>/formrecognizer/v2.1/prebuilt/businessCard/analyze" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: <key>" --data-ascii "{ 'source': '<your receipt URL>'}"
```

You receive a `202 (Success)` response that includes an **Operation-Location** header. The value of this header contains a result ID that you can use to query the status of the asynchronous operation and get the results:

```output
https://cognitiveservice/formrecognizer/v2.1/prebuilt/businessCard/analyzeResults/<resultId>
```

In the following example, as part of the URL, the string after `analyzeResults/` is the result ID.

```console
https://cognitiveservice/formrecognizer/v2.1/prebuilt/businessCard/analyzeResults/54f0b076-4e38-43e5-81bd-b85b8835fdfb
```

After you call the Analyze Business Card API, call the [Get Analyze Business Card Result](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) API to get the status of the operation and the extracted data. Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence key.
1. Replace *\<resultId>* with the result ID from the previous step.
1. Replace *\<key>* with your key.

```console
curl -v -X GET https://<endpoint>/formrecognizer/v2.1/prebuilt/businessCard/analyzeResults/<resultId>"
-H "Ocp-Apim-Subscription-Key: <key>"
```

You receive a `200 (Success)` response with JSON output.

The `"readResults"` node contains all of the recognized text. The response organizes text by page, then by line, then by individual words. The `"documentResults"` node contains the business-card-specific values that the model discovered. The `"documentResults"` node is where you find useful contact information like the company name, first name, last name, phone number, and so on.

Photograph shows a business card from a company called Contoso.

This sample JSON output has been shortened for readability. See the [full sample output on GitHub](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/blob/master/curl/form-recognizer/business-card-result.json).

```json
{
    "status": "succeeded",
    "createdDateTime":"2021-02-09T18:14:05Z",
    "lastUpdatedDateTime":"2021-02-09T18:14:10Z",
    "analyzeResult": {
        "version": "2.1.0",
        "readResults": [
            {
             "page":1,
             "angle":-16.6836,
             "width":4032,
             "height":3024,
             "unit":"pixel"
          }
        ],
        "documentResults": [
            {
                "docType": "prebuilt:businesscard",
                "pageRange": [
                    1,
                    1
                ],
                "fields": {
                    "ContactNames": {
                        "type": "array",
                        "valueArray": [
                            {
                                "type": "object",
                                "valueObject": {
                                    "FirstName": {
                                        "type": "string",
                                        "valueString": "Avery",
                                        "text": "Avery",
                                        "boundingBox": [
                                            703,
                                            1096,
                                            1134,
                                            989,
                                            1165,
                                            1109,
                                            733,
                                            1206
                                        ],
                                        "page": 1
                                },
                                "text": "Dr. Avery Smith",
                                "boundingBox": [
                                    419.3,
                                    1154.6,
                                    1589.6,
                                    877.9,
                                    1618.9,
                                    1001.7,
                                    448.6,
                                    1278.4
                                ],
                                "confidence": 0.993
                            }
                        ]
                    },
                    "Emails": {
                        "type": "array",
                        "valueArray": [
                            {
                                "type": "string",
                                "valueString": "avery.smith@contoso.com",
                                "text": "avery.smith@contoso.com",
                                "boundingBox": [
                                    2107,
                                    934,
                                    2917,
                                    696,
                                    2935,
                                    764,
                                    2126,
                                    995
                                ],
                                "page": 1,
                                "confidence": 0.99
                            }
                        ]
                    },
                    "Websites": {
                        "type": "array",
                        "valueArray": [
                            {
                                "type": "string",
                                "valueString": "https://www.contoso.com/",
                                "text": "https://www.contoso.com/",
                                "boundingBox": [
                                    2121,
                                    1002,
                                    2992,
                                    755,
                                    3014,
                                    826,
                                    2143,
                                    1077
                                ],
                                "page": 1,
                                "confidence": 0.995
                            }
                        ]
                    }
                }
            }
        ]
    }
}
```

The script prints responses to the console until the Analyze Business Card operation completes.

## Analyze invoices

You can use Document Intelligence to extract field text and semantic values from a given invoice document. To start analyzing an invoice, use the cURL command. For more information about invoice analysis, see the [Invoice conceptual guide](../prebuilt/invoice.md). To start analyzing an invoice, call the [Analyze Invoice](https://learn.microsoft.com/rest/api/aiservices/operation-groups?view=rest-aiservices-v2.1\&preserve-view=true) API using the cURL command.

Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence subscription.
1. Replace *\<your invoice URL>* with the URL address of an invoice document.
1. Replace *\<key>* with your key.

```console
curl -v -i POST https://<endpoint>/formrecognizer/v2.1/prebuilt/invoice/analyze" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: <key>" --data-ascii "{​​​​​​​'urlSource': '<your invoice URL>'}​​​​​​​​"
```

You receive a `202 (Success)` response that includes an `Operation-Location` header. The value of this header contains a result ID that you can use to query the status of the asynchronous operation and get the results:

```output
https://cognitiveservice/formrecognizer/v2.1/prebuilt/receipt/analyzeResults/<resultId>
```

In the following example, as part of the URL, the string after `analyzeResults/` is the result ID:

```console
https://cognitiveservice/formrecognizer/v2.1/prebuilt/invoice/analyzeResults/54f0b076-4e38-43e5-81bd-b85b8835fdfb
```

After you've called the Analyze Invoice API, call the [Get Analyze Invoice Result](https://learn.microsoft.com/rest/api/aiservices/operation-groups?view=rest-aiservices-v2.1\&preserve-view=true) API to get the status of the operation and the extracted data.

Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence key.
1. Replace *\<resultId>* with the result ID from the previous step.
1. Replace *\<key>* with your key.

```console
curl -v -X GET "https://<endpoint>/formrecognizer/v2.1/prebuilt/invoice/analyzeResults/<resultId>" -H "Ocp-Apim-Subscription-Key: <key>"
```

You receive a `200 (Success)` response with JSON output.

- The `"readResults"` field contains every line of text that was extracted from the invoice.
- The `"pageResults"` includes the tables and selections marks extracted from the invoice.
- The `"documentResults"` field contains key/value information for the most relevant parts of the invoice.

See the following invoice document and its corresponding JSON output.

- [Sample invoice](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/tree/master/curl/form-recognizer/sample-invoice.pdf)

This response body JSON content has been shortened for readability. See the [full sample output on GitHub](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/blob/master/curl/form-recognizer/sample-invoice-output.json).

```json
{
    "status": "succeeded",
    "createdDateTime": "2020-11-06T23:32:11Z",
    "lastUpdatedDateTime": "2020-11-06T23:32:20Z",
    "analyzeResult": {
        "version": "2.1.0",
        "readResults": [{
            "page": 1,
            "angle": 0,
            "width": 8.5,
            "height": 11,
            "unit": "inch"
        }],
        "pageResults": [{
            "page": 1,
            "tables": [{
                "rows": 3,
                "columns": 4,
                "cells": [{
                    "rowIndex": 0,
                    "columnIndex": 0,
                    "text": "QUANTITY",
                    "boundingBox": [0.4953,
                    5.7306,
                    1.8097,
                    5.7306,
                    1.7942,
                    6.0122,
                    0.4953,
                    6.0122]
                },
                {
                    "rowIndex": 0,
                    "columnIndex": 1,
                    "text": "DESCRIPTION",
                    "boundingBox": [1.8097,
                    5.7306,
                    5.7529,
                    5.7306,
                    5.7452,
                    6.0122,
                    1.7942,
                    6.0122]
                },
                ...
                ],
                "boundingBox": [0.4794,
                5.7132,
                8.0158,
                5.714,
                8.0118,
                6.5627,
                0.4757,
                6.5619]
            },
            {
                "rows": 2,
                "columns": 6,
                "cells": [{
                    "rowIndex": 0,
                    "columnIndex": 0,
                    "text": "SALESPERSON",
                    "boundingBox": [0.4979,
                    4.963,
                    1.8051,
                    4.963,
                    1.7975,
                    5.2398,
                    0.5056,
                    5.2398]
                },
                {
                    "rowIndex": 0,
                    "columnIndex": 1,
                    "text": "P.O. NUMBER",
                    "boundingBox": [1.8051,
                    4.963,
                    3.3047,
                    4.963,
                    3.3124,
                    5.2398,
                    1.7975,
                    5.2398]
                },
                ...
                ],
                "boundingBox": [0.4976,
                4.961,
                7.9959,
                4.9606,
                7.9959,
                5.5204,
                0.4972,
                5.5209]
            }]
        }],
        "documentResults": [{
            "docType": "prebuilt:invoice",
            "pageRange": [1,
            1],
            "fields": {
                "AmountDue": {
                    "type": "number",
                    "valueNumber": 610,
                    "text": "$610.00",
                    "boundingBox": [7.3809,
                    7.8153,
                    7.9167,
                    7.8153,
                    7.9167,
                    7.9591,
                    7.3809,
                    7.9591],
                    "page": 1,
                    "confidence": 0.875
                },
                "BillingAddress": {
                    "type": "string",
                    "valueString": "123 Bill St, Redmond WA, 98052",
                    "text": "123 Bill St, Redmond WA, 98052",
                    "boundingBox": [0.594,
                    4.3724,
                    2.0125,
                    4.3724,
                    2.0125,
                    4.7125,
                    0.594,
                    4.7125],
                    "page": 1,
                    "confidence": 0.997
                },
                "BillingAddressRecipient": {
                    "type": "string",
                    "valueString": "Microsoft Finance",
                    "text": "Microsoft Finance",
                    "boundingBox": [0.594,
                    4.1684,
                    1.7907,
                    4.1684,
                    1.7907,
                    4.2837,
                    0.594,
                    4.2837],
                    "page": 1,
                    "confidence": 0.998
                },
                ...
            }
        }]
    }
}
```

## Analyze identity documents

To start analyzing an identification (ID) document, use the cURL command. For more information about ID document analysis, see the [Document Intelligence ID document model](../prebuilt/id-document.md). To start analyzing an ID document, you call the [Analyze ID Document](https://learn.microsoft.com/rest/api/aiservices/operation-groups?view=rest-aiservices-v2.1\&preserve-view=true) API using the cURL command.

Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence subscription.
1. Replace *\<your ID document URL>* with the URL address of a receipt image.
1. Replace *\<key>* with the key you copied from the previous step.

```console
curl -i -X POST "https://<endpoint>/formrecognizer/v2.1/prebuilt/idDocument/analyze" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: <key>" --data-ascii "{ 'source': '<your ID document URL>'}"
```

You receive a `202 (Success)` response that includes an `Operation-Location` header. The value of this header contains a result ID that you can use to query the status of the asynchronous operation and get the results:

```output
https://cognitiveservice/formrecognizer/v2.1/prebuilt/documentId/analyzeResults/<resultId>
```

In the following example, the string after `analyzeResults/` is the result ID:

```output
https://westus.api.cognitive.microsoft.com/formrecognizer/v2.1/prebuilt/idDocument/analyzeResults/aaaabbbb-0000-cccc-1111-dddd2222eeee
```

### Get the Analyze ID Document result

After you call the Analyze ID Document API, call the [Get Analyze ID Document Result](https://learn.microsoft.com/rest/api/aiservices/operation-groups?view=rest-aiservices-v2.1\&preserve-view=true) API to get the status of the operation and the extracted data. Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence key.
1. Replace *\<resultId>* with the result ID from the previous step.
1. Replace *\<key>* with your key.

```console
curl -X GET "https://<endpoint>/formrecognizer/v2.1/prebuilt/idDocument/analyzeResults/<resultId>" -H "Ocp-Apim-Subscription-Key: <key>"
```

You receive a `200 (Success)` response with JSON output. The first field, `"status"`, indicates the status of the operation. If the operation isn't complete, the value of `"status"` is `"running"` or `"notStarted"`. Call the API again, either manually or through a script until you receive the `succeeded` value. We recommend an interval of one second or more between calls.

- The `"readResults"` field contains every line of text that was extracted from the ID document.
- The `"documentResults"` field contains an array of objects, each representing an ID document detected in the input document.

Here's a sample ID document and its corresponding JSON output.

Screenshot shows a sample driver's license.

Here's the response body.

```json
{
    "status": "succeeded",
    "createdDateTime": "2021-04-13T17:24:52Z",
    "lastUpdatedDateTime": "2021-04-13T17:24:55Z",
    "analyzeResult": {
      "version": "2.1.0",
      "readResults": [
        {
          "page": 1,
          "angle": -0.2823,
          "width": 450,
          "height": 294,
          "unit": "pixel"
        }
      ],
      "documentResults": [
        {
          "docType": "prebuilt:idDocument:driverLicense",
          "docTypeConfidence": 0.995,
          "pageRange": [
            1,
            1
          ],
          "fields": {
            "Address": {
              "type": "string",
              "valueString": "123 STREET ADDRESS YOUR CITY WA 99999-1234",
              "text": "123 STREET ADDRESS YOUR CITY WA 99999-1234",
              "boundingBox": [
                158,
                151,
                326,
                151,
                326,
                177,
                158,
                177
              ],
              "page": 1,
              "confidence": 0.965
            },
            "CountryRegion": {
              "type": "countryRegion",
              "valueCountryRegion": "USA",
              "confidence": 0.99
            },
            "DateOfBirth": {
              "type": "date",
              "valueDate": "1958-01-06",
              "text": "01/06/1958",
              "boundingBox": [
                187,
                133,
                272,
                132,
                272,
                148,
                187,
                149
              ],
              "page": 1,
              "confidence": 0.99
            },
            "DateOfExpiration": {
              "type": "date",
              "valueDate": "2020-08-12",
              "text": "08/12/2020",
              "boundingBox": [
                332,
                230,
                414,
                228,
                414,
                244,
                332,
                245
              ],
              "page": 1,
              "confidence": 0.99
            },
            "DocumentNumber": {
              "type": "string",
              "valueString": "LICWDLACD5DG",
              "text": "LIC#WDLABCD456DG",
              "boundingBox": [
                162,
                70,
                307,
                68,
                307,
                84,
                163,
                85
              ],
              "page": 1,
              "confidence": 0.99
            },
            "FirstName": {
              "type": "string",
              "valueString": "LIAM R.",
              "text": "LIAM R.",
              "boundingBox": [
                158,
                102,
                216,
                102,
                216,
                116,
                158,
                116
              ],
              "page": 1,
              "confidence": 0.985
            },
            "LastName": {
              "type": "string",
              "valueString": "TALBOT",
              "text": "TALBOT",
              "boundingBox": [
                160,
                86,
                213,
                85,
                213,
                99,
                160,
                100
              ],
              "page": 1,
              "confidence": 0.987
            },
            "Region": {
              "type": "string",
              "valueString": "Washington",
              "confidence": 0.99
            },
            "Sex": {
              "type": "string",
              "valueString": "M",
              "text": "M",
              "boundingBox": [
                226,
                190,
                232,
                190,
                233,
                201,
                226,
                201
              ],
              "page": 1,
              "confidence": 0.99
            }
          }
        }
      ]
    }
  }
```

## Train a custom model

To train a custom model, you need a set of training data in an Azure Storage blob. You need a minimum of five filled-in forms (PDF documents and/or images) of the same type/structure. See [Build and train a custom model](build-a-custom-model.md?view=doc-intel-2.1.0\&preserve-view=true) for tips and options for putting together your training data.

Training without labeled data is the default operation and is simpler. Alternatively, you can manually label some or all of your training data beforehand. Manual labeling is a more complex process but results in a better trained model.

> **Note:**
> You can also train models with a graphical user interface such as the [Document Intelligence Sample Labeling tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md).

### Train a model without labels

To train a Document Intelligence model with the documents in your Azure blob container, call the **[Train Custom Model](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true)** API by running the following cURL command. Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence subscription.
1. Replace *\<key>* with the key you copied from the previous step.
1. Replace *\<SAS URL>* with the Azure Blob storage container's shared access signature (SAS) URL.

To retrieve the SAS URL for your custom model training data:

1. Go to your storage resource in the Azure portal and select **Data storage** > **Containers**.
1. Navigate to your container, right-click, and select **Generate SAS**.

   Get the SAS for your container, not for the storage account itself.

1. Make sure the **Read**, **Write**, **Delete**, and **List** permissions are selected, and select **Generate SAS token and URL**.
1. Copy the value in the **URL** section to a temporary location. It should have the form: `https://<storage account>.blob.core.windows.net/<container name>?<SAS value>`.

Make the changes and then run the command:

```console
curl -i -X POST "https://<endpoint>/formrecognizer/v2.1/custom/models" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: <key>" --data-ascii "{ 'source': '<SAS URL>'}"
```

You receive a `201 (Success)` response with a `Location` header. The value of this header contains a model ID for the newly trained model that you can use to query the status of the operation and get the results:

```output
https://<endpoint>/formrecognizer/v2.1/custom/models/<modelId>
```

In the following example, as part of the URL, the string after `models/` is the model ID.

```output
https://westus.api.cognitive.microsoft.com/formrecognizer/v2.1/custom/models/bbbbcccc-1111-dddd-2222-eeee3333ffff
```

### Train a model with labels

To train with labels, you need to have special label information files (*\<filename>.pdf.labels.json*) in your blob storage container alongside the training documents. The [Document Intelligence Sample Labeling tool](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/label-tool.md) provides a UI to help you create these label files. After you get them, call the [Train Custom Model](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) API, with the `"useLabelFile"` parameter set to `true` in the JSON body.

Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence subscription.
1. Replace *\<key>* with the key you copied from the previous step.
1. Replace *\<SAS URL>* with the Azure Blob storage container's shared access signature (SAS) URL.

To retrieve the SAS URL for your custom model training data:

1. Go to your storage resource in the Azure portal and select **Data storage** > **Containers**.1. Navigate to your container, right-click, and select **Generate SAS**.

   Get the SAS for your container, not for the storage account itself.

1. Make sure the **Read**, **Write**, **Delete**, and **List** permissions are selected, and select **Generate SAS token and URL**.
1. Copy the value in the **URL** section to a temporary location. It should have the form: `https://<storage account>.blob.core.windows.net/<container name>?<SAS value>`.

Make the changes and then run the command:

```output
curl -i -X POST "https://<endpoint>/formrecognizer/v2.1/custom/models" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: <key>" --data-ascii "{ 'source': '<SAS URL>', 'useLabelFile':true}"
```

You receive a `201 (Success)` response with a `Location` header. The value of this header contains a model ID for the newly trained model  that you can use to query the status of the operation and get the results:

```output
https://<endpoint>/formrecognizer/v2.1/custom/models/<modelId>
```

In the following example, as part of the URL, the string after `models/` is the model ID.

```output
https://westus.api.cognitive.microsoft.com/formrecognizer/v2.1/custom/models/ccccdddd-2222-eeee-3333-ffff4444aaaa
```

After you start the train operation, use [Get Custom Model](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) to check the training status. Pass the model ID into the API request to check the training status:

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence key.
1. Replace *\<key>* with your key
1. Replace *\<model ID>* with the model ID you received in the previous step

```console
curl -X GET "https://<endpoint>/formrecognizer/v2.1/custom/models/<modelId>" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: <key>"
```

## Analyze forms with a custom model

Next, use your newly trained model to analyze a document and extract fields and tables from it. Call the [Analyze Form](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) API by running the following cURL command. Before you run the command, make these changes:

1. Replace *\<endpoint>* with the endpoint that you obtained from your Document Intelligence key.
1. Replace *\<model ID>* with the model ID that you received in the previous section.
1. Replace *\<SAS URL>* with an SAS URL to your file in Azure storage. Follow the steps in the Training section, but instead of getting a SAS URL for the whole blob container, get one for the specific file you want to analyze.
1. Replace *\<key>* with your key.

```console
curl -v "https://<endpoint>/formrecognizer/v2.1/custom/models/<modelId>/analyze?includeTextDetails=true" -H "Content-Type: application/json" -H "Ocp-Apim-Subscription-Key: <key>" -d "{ 'source': '<SAS URL>' } "
```

You receive a `202 (Success)` response with an `Operation-Location` header. The value of this header includes a result ID you use to track the results of the Analyze operation:

```output
https://cognitiveservice/formrecognizer/v2.1/custom/models/<modelId>/analyzeResults/<resultId>
```

In the following example, as part of the URL, the string after `analyzeResults/` is the result ID.

```output
https://cognitiveservice/formrecognizer/v2/layout/analyzeResults/e175e9db-d920-4c7d-bc44-71d1653cdd06
```

Save this results ID for the next step.

Call the [Analyze Form Result](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) API to query the results of the Analyze operation.

1. Replace *\<endpoint>* with the endpoint that you obtained from your Document Intelligence key.
1. Replace *\<result ID>* with the ID that you received in the previous section.
1. Replace *\<key>* with your key.

```console
curl -X GET "https://<endpoint>/formrecognizer/v2.1/custom/models/<modelId>/analyzeResults/<resultId>" -H "Ocp-Apim-Subscription-Key: <key>"
```

You receive a `200 (Success)` response with a JSON body in the following format. The output has been shortened for simplicity. Notice the `"status"` field near the bottom. This field has the value `"succeeded"` when the Analyze operation is complete. If the Analyze operation hasn't completed, you need to query the service again by rerunning the command. We recommend an interval of one second or more between calls.

In custom models trained without labels, the key/value pair associations and tables are in the `"pageResults"` node of the JSON output. In custom models trained with labels, the  key/value pair associations are in the `"documentResults"` node. If you also specified plain text extraction through the *includeTextDetails* URL parameter, then the `"readResults"` node shows the content and positions of all the text in the document.

This sample JSON output has been shortened for simplicity. See the [full sample output on GitHub](https://github.com/Azure-Samples/cognitive-services-REST-api-samples/blob/master/curl/form-recognizer/analyze-result-invoice-6.pdf.json).

```json
{
  "status": "succeeded",
  "createdDateTime": "2020-08-21T01:13:28Z",
  "lastUpdatedDateTime": "2020-08-21T01:13:42Z",
  "analyzeResult": {
    "version": "2.1.0",
    "readResults": [
      {
        "page": 1,
        "angle": 0,
        "width": 8.5,
        "height": 11,
        "unit": "inch",
        "lines": [
          {
            "text": "Project Statement",
            "boundingBox": [
              5.0444,
              0.3613,
              8.0917,
              0.3613,
              8.0917,
              0.6718,
              5.0444,
              0.6718
            ],
            "words": [
              {
                "text": "Project",
                "boundingBox": [
                  5.0444,
                  0.3587,
                  6.2264,
                  0.3587,
                  6.2264,
                  0.708,
                  5.0444,
                  0.708
                ]
              },
              {
                "text": "Statement",
                "boundingBox": [
                  6.3361,
                  0.3635,
                  8.0917,
                  0.3635,
                  8.0917,
                  0.6396,
                  6.3361,
                  0.6396
                ]
              }
            ]
          },
          ...
        ]
      }
    ],
    "pageResults": [
      {
        "page": 1,
        "keyValuePairs": [
          {
            "key": {
              "text": "Date:",
              "boundingBox": [
                6.9833,
                1.0615,
                7.3333,
                1.0615,
                7.3333,
                1.1649,
                6.9833,
                1.1649
              ],
              "elements": [
                "#/readResults/0/lines/2/words/0"
              ]
            },
            "value": {
              "text": "9/10/2020",
              "boundingBox": [
                7.3833,
                1.0802,
                7.925,
                1.0802,
                7.925,
                1.174,
                7.3833,
                1.174
              ],
              "elements": [
                "#/readResults/0/lines/3/words/0"
              ]
            },
            "confidence": 1
          },
          ...
        ],
        "tables": [
          {
            "rows": 5,
            "columns": 5,
            "cells": [
              {
                "text": "Training Date",
                "rowIndex": 0,
                "columnIndex": 0,
                "boundingBox": [
                  0.6944,
                  4.2779,
                  1.5625,
                  4.2779,
                  1.5625,
                  4.4005,
                  0.6944,
                  4.4005
                ],
                "confidence": 1,
                "rowSpan": 1,
                "columnSpan": 1,
                "elements": [
                  "#/readResults/0/lines/15/words/0",
                  "#/readResults/0/lines/15/words/1"
                ],
                "isHeader": true,
                "isFooter": false
              },
              ...
            ]
          }
        ],
        "clusterId": 0
      }
    ],
    "documentResults": [],
    "errors": []
  }
}
```

### Improve results


Examine the `"confidence"` values for each key/value result under the `"pageResults"` node. You should also look at the confidence scores in the `"readResults"` node, which correspond to the text read operation. The confidence of the read results doesn't affect the confidence of the key/value extraction results, so you should check both.

- If the confidence scores for the read operation are low, try to improve the quality of your input documents. For more information, see [Input requirements](../model-overview.md#input-requirements).
- If the confidence scores for the key/value extraction operation are low, ensure that the documents being analyzed are of the same type as documents used in the training set. If the documents in the training set have variations in appearance, consider splitting them into different folders and training one model for each variation.

The confidence scores you target depends on your use case, but generally it's a good practice to target a score of 80 percent or higher. For more sensitive cases, like reading medical records or billing statements, we recommend a score of 100 percent.


## Manage custom models

Use the [List Custom Models](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) API in the following command to return a list of all the custom models that belong to your subscription.

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence subscription.
1. Replace *\<key>* with the key you copied from the previous step.

```console
curl -v -X GET "https://<endpoint>/formrecognizer/v2.1/custom/models?op=full"
-H "Ocp-Apim-Subscription-Key: <key>"
```

You receive a `200` success response, with JSON data like the following. The `"modelList"` element contains all of your created models and their information.

```json
{
  "summary": {
    "count": 0,
    "limit": 0,
    "lastUpdatedDateTime": "string"
  },
  "modelList": [
    {
      "modelId": "string",
      "status": "creating",
      "createdDateTime": "string",
      "lastUpdatedDateTime": "string"
    }
  ],
  "nextLink": "string"
}
```

### Get a specific model

To retrieve detailed information about a specific custom model, use the [Get Custom Model](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) API in the following command.

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence subscription.
1. Replace *\<key>* with the key you copied from the previous step.
1. Replace *\<modelId>* with the ID of the custom model you want to look up.

```console
curl -v -X GET "https://<endpoint>/formrecognizer/v2.1/custom/models/<modelId>" -H "Ocp-Apim-Subscription-Key: <key>"
```

You receive a `200` success response, with a request body JSON data like the following.

```json
{
  "modelInfo": {
    "modelId": "string",
    "status": "creating",
    "createdDateTime": "string",
    "lastUpdatedDateTime": "string"
  },
  "keys": {
    "clusters": {}
  },
  "trainResult": {
    "trainingDocuments": [
      {
        "documentName": "string",
        "pages": 0,
        "errors": [
          "string"
        ],
        "status": "succeeded"
      }
    ],
    "fields": [
      {
        "fieldName": "string",
        "accuracy": 0.0
      }
    ],
    "averageModelAccuracy": 0.0,
    "errors": [
      {
        "message": "string"
      }
    ]
  }
}
```

### Delete a model from the resource account

You can also delete a model from your account by referencing its ID. This command calls the [Delete Custom Model](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true) API to delete the model used in the previous section.

1. Replace *\<endpoint>* with the endpoint that you obtained with your Document Intelligence subscription.
1. Replace *\<key>* with the key you copied from the previous step.
1. Replace *\<modelId>* with the ID of the custom model you want to look up.

```console
curl -v -X DELETE "https://<endpoint>/formrecognizer/v2.1/custom/models/<modelId>" -H "Ocp-Apim-Subscription-Key: <key>"
```

You receive a `204` success response, indicating that your model is marked for deletion. Model artifacts are removed within 48 hours.

## Next steps

For this project, you used the Document Intelligence REST API to analyze forms in different ways. Next, explore the reference documentation to learn about Document Intelligence API in more depth.

> 
> [REST API reference documentation](https://learn.microsoft.com/rest/api/aiservices/analyzer?view=rest-aiservices-v2.1\&preserve-view=true)
