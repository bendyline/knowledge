---
title: "Quickstart: Image Analysis 4.0"
titleSuffix: Foundry Tools
description: Learn how to read text from images in your application using Image Analysis 4.0 through a native client SDK in the language of your choice.
author: PatrickFarley
manager: mcleans
ms.service: azure-vision-foundry-tools
ms.topic: quickstart
ms.date: 09/26/2025
ms.author: pafarley
ms.custom: devx-track-python, devx-track-csharp, mode-api, devx-track-dotnet, devx-track-extended-java, devx-track-js
zone_pivot_groups: programming-languages-computer-vision-40
keywords: Azure Vision in Foundry Tools, Azure Vision in Foundry Tools
---

# Quickstart: Image Analysis 4.0


> **Caution:**
> The Image Analysis 4.0 service in Azure Vision in Foundry Tools is deprecated and will be retired on September 25, 2028, after which calls made to the service will fail. We recommend you switch to one of the available alternatives outlined in the [Migration guide](../migration-options.md).


Get started with the Image Analysis 4.0 REST API or client SDK to set up a basic image analysis application. The Image Analysis service provides you with AI algorithms for processing images and returning information on their visual features. Follow these steps to install a package to your application and try out the sample code.

**Applies to: programming-language-csharp**


 
<a name="HOLTop"></a>

Use the Image Analysis client SDK for .NET to read text in an image and generate an image caption. This quickstart analyzes a remote image and prints the results to the console.

[Reference documentation](https://aka.ms/azsdk/image-analysis/ref-docs/csharp) | [Package (NuGet)](https://aka.ms/azsdk/image-analysis/package/nuget) | [Samples](https://aka.ms/azsdk/image-analysis/samples/csharp)

> **Tip:**
> The Analysis 4.0 API can do many different operations. See the [Analyze Image how-to guide](../how-to/call-analyze-image-40.md) for examples that showcase all of the available features.

## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- The [Visual Studio IDE](https://visualstudio.microsoft.com/vs/) with workload **.NET desktop development** enabled. Or, if you don't plan on using Visual Studio IDE, you need the [.NET SDK](https://dotnet.microsoft.com/download/dotnet) installed.
- Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision"  title="create a Computer Vision resource"  target="_blank">create a Computer Vision resource</a> in the Azure portal. In order to use the captioning feature in this quickstart, you must create your resource in one of the supported Azure regions (see [Image captions](https://learn.microsoft.com/azure/ai-services/computer-vision/concept-describe-images-40)). After it deploys, select **Go to resource**.
    * You need the key and endpoint from the resource you create to connect your application to Azure Vision in Foundry Tools.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.


## Set up application

Create a new C# application.

#### [Visual Studio IDE](#tab/visual-studio)

Open Visual Studio, and under **Get started** select **Create a new project**. Set the template filters to _C#/All Platforms/Console_. Select **Console App** (command-line application that can run on .NET on Windows, Linux and macOS) and choose **Next**. Update the project name to _ImageAnalysisQuickstart_ and choose **Next**. Select **.NET 6.0** or above, and choose **Create** to create the project.

### Install the client SDK 

Once you've created a new project, install the client SDK by right-clicking on the project solution in the **Solution Explorer** and selecting **Manage NuGet Packages**. In the package manager that opens select **Browse**, check **Include prerelease**, and search for `Azure.AI.Vision.ImageAnalysis`. Select **Install**. 

#### [CLI](#tab/cli)

In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `image-analysis-quickstart`. This command creates a simple "Hello World" C# project with a single source file: *Program.cs*.

```dotnet
dotnet new console -n image-analysis-quickstart
```

Change your directory to the newly created app folder. You can build the application with:

```dotnet
dotnet build
```

The build output should contain no warnings or errors. 

```console
...
Build succeeded.
  0 Warning(s)
  0 Error(s)
...
```

### Install the client SDK

Within the application directory, install the Image Analysis SDK for .NET with the following command:

```dotnet
dotnet add package Azure.AI.Vision.ImageAnalysis --prerelease
```
    
---


## Create environment variables 

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `VISION_KEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `VISION_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40.md)

#### [Windows](#tab/windows)

```console
setx VISION_KEY <your_key>
```

```console
setx VISION_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export VISION_KEY=<your_key>
```

```bash
export VISION_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Analyze Image

From the project directory, open the *Program.cs* file that was created previously with [your new project](#set-up-application). Paste in the following code:

> **Tip:**
> The code shows analyzing an image URL. You can also analyze a local image file, or an image from a memory buffer. For more information, see the [Analyze Image how-to guide](../how-to/call-analyze-image-40.md).

[Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/dotnet/ComputerVision/4-0/image-analysis-quickstart/Program.cs?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40.md)


#### [Visual Studio IDE](#tab/visual-studio)

Build and run the application by selecting **Start Debugging** from the **Debug** menu at the top of the IDE window (or press **F5**).

#### [CLI](#tab/cli)

Build and run the application from your application directory with these commands:

```dotnet
dotnet build
dotnet run
```

---

## Output

The console output should show something similar to the following text:

```console
Caption:
   "a person pointing at a screen", Confidence 0.4892
Text:
   Line: '9:35 AM', Bounding polygon {{X=130,Y=129},{X=215,Y=130},{X=215,Y=149},{X=130,Y=148}}
     Word: '9:35', Bounding polygon {{X=131,Y=130},{X=171,Y=130},{X=171,Y=149},{X=130,Y=149}}, Confidence 0.9930
     Word: 'AM', Bounding polygon {{X=179,Y=130},{X=204,Y=130},{X=203,Y=149},{X=178,Y=149}}, Confidence 0.9980
   Line: 'E Conference room 154584354', Bounding polygon {{X=130,Y=153},{X=224,Y=154},{X=224,Y=161},{X=130,Y=161}}
     Word: 'E', Bounding polygon {{X=131,Y=154},{X=135,Y=154},{X=135,Y=161},{X=131,Y=161}}, Confidence 0.1040
     Word: 'Conference', Bounding polygon {{X=142,Y=154},{X=174,Y=154},{X=173,Y=161},{X=141,Y=161}}, Confidence 0.9020
     Word: 'room', Bounding polygon {{X=175,Y=154},{X=189,Y=155},{X=188,Y=161},{X=175,Y=161}}, Confidence 0.7960
     Word: '154584354', Bounding polygon {{X=192,Y=155},{X=224,Y=154},{X=223,Y=162},{X=191,Y=161}}, Confidence 0.8640
   Line: '#: 555-173-4547', Bounding polygon {{X=130,Y=163},{X=182,Y=164},{X=181,Y=171},{X=130,Y=170}}
     Word: '#:', Bounding polygon {{X=131,Y=163},{X=139,Y=164},{X=139,Y=171},{X=131,Y=171}}, Confidence 0.0360
     Word: '555-173-4547', Bounding polygon {{X=142,Y=164},{X=182,Y=165},{X=181,Y=171},{X=142,Y=171}}, Confidence 0.5970
   Line: 'Town Hall', Bounding polygon {{X=546,Y=180},{X=590,Y=180},{X=590,Y=190},{X=546,Y=190}}
     Word: 'Town', Bounding polygon {{X=547,Y=181},{X=568,Y=181},{X=568,Y=190},{X=546,Y=191}}, Confidence 0.9810
     Word: 'Hall', Bounding polygon {{X=570,Y=181},{X=590,Y=181},{X=590,Y=191},{X=570,Y=190}}, Confidence 0.9910
   Line: '9:00 AM - 10:00 AM', Bounding polygon {{X=546,Y=191},{X=596,Y=192},{X=596,Y=200},{X=546,Y=199}}
     Word: '9:00', Bounding polygon {{X=546,Y=192},{X=555,Y=192},{X=555,Y=200},{X=546,Y=200}}, Confidence 0.0900
     Word: 'AM', Bounding polygon {{X=557,Y=192},{X=565,Y=192},{X=565,Y=200},{X=557,Y=200}}, Confidence 0.9910
     Word: '-', Bounding polygon {{X=567,Y=192},{X=569,Y=192},{X=569,Y=200},{X=567,Y=200}}, Confidence 0.6910
     Word: '10:00', Bounding polygon {{X=570,Y=192},{X=585,Y=193},{X=584,Y=200},{X=570,Y=200}}, Confidence 0.8850
     Word: 'AM', Bounding polygon {{X=586,Y=193},{X=593,Y=194},{X=593,Y=200},{X=586,Y=200}}, Confidence 0.9910
   Line: 'Aaron Buaion', Bounding polygon {{X=543,Y=201},{X=581,Y=201},{X=581,Y=208},{X=543,Y=208}}
     Word: 'Aaron', Bounding polygon {{X=545,Y=202},{X=560,Y=202},{X=559,Y=208},{X=544,Y=208}}, Confidence 0.6020
     Word: 'Buaion', Bounding polygon {{X=561,Y=202},{X=580,Y=202},{X=579,Y=208},{X=560,Y=208}}, Confidence 0.2910        
   Line: 'Daily SCRUM', Bounding polygon {{X=537,Y=259},{X=575,Y=260},{X=575,Y=266},{X=537,Y=265}}
     Word: 'Daily', Bounding polygon {{X=538,Y=259},{X=551,Y=260},{X=550,Y=266},{X=538,Y=265}}, Confidence 0.1750
     Word: 'SCRUM', Bounding polygon {{X=552,Y=260},{X=570,Y=260},{X=570,Y=266},{X=551,Y=266}}, Confidence 0.1140
   Line: '10:00 AM 11:00 AM', Bounding polygon {{X=536,Y=266},{X=590,Y=266},{X=590,Y=272},{X=536,Y=272}}
     Word: '10:00', Bounding polygon {{X=539,Y=267},{X=553,Y=267},{X=552,Y=273},{X=538,Y=272}}, Confidence 0.8570
     Word: 'AM', Bounding polygon {{X=554,Y=267},{X=561,Y=267},{X=560,Y=273},{X=553,Y=273}}, Confidence 0.9980
     Word: '11:00', Bounding polygon {{X=564,Y=267},{X=578,Y=267},{X=577,Y=273},{X=563,Y=273}}, Confidence 0.4790
     Word: 'AM', Bounding polygon {{X=579,Y=267},{X=586,Y=267},{X=585,Y=273},{X=578,Y=273}}, Confidence 0.9940
   Line: 'Churlette de Crum', Bounding polygon {{X=538,Y=273},{X=584,Y=273},{X=585,Y=279},{X=538,Y=279}}
     Word: 'Churlette', Bounding polygon {{X=539,Y=274},{X=562,Y=274},{X=561,Y=279},{X=538,Y=279}}, Confidence 0.4640     
     Word: 'de', Bounding polygon {{X=563,Y=274},{X=569,Y=274},{X=568,Y=279},{X=562,Y=279}}, Confidence 0.8100
     Word: 'Crum', Bounding polygon {{X=570,Y=274},{X=582,Y=273},{X=581,Y=279},{X=569,Y=279}}, Confidence 0.8850
   Line: 'Quarterly NI Hands', Bounding polygon {{X=538,Y=295},{X=588,Y=295},{X=588,Y=301},{X=538,Y=302}}
     Word: 'Quarterly', Bounding polygon {{X=540,Y=296},{X=562,Y=296},{X=562,Y=302},{X=539,Y=302}}, Confidence 0.5230     
     Word: 'NI', Bounding polygon {{X=563,Y=296},{X=570,Y=296},{X=570,Y=302},{X=563,Y=302}}, Confidence 0.3030
     Word: 'Hands', Bounding polygon {{X=572,Y=296},{X=588,Y=296},{X=588,Y=302},{X=571,Y=302}}, Confidence 0.6130
   Line: '11.00 AM-12:00 PM', Bounding polygon {{X=536,Y=304},{X=588,Y=303},{X=588,Y=309},{X=536,Y=310}}
     Word: '11.00', Bounding polygon {{X=538,Y=304},{X=552,Y=304},{X=552,Y=310},{X=538,Y=310}}, Confidence 0.6180
     Word: 'AM-12:00', Bounding polygon {{X=554,Y=304},{X=578,Y=304},{X=577,Y=310},{X=553,Y=310}}, Confidence 0.2700      
     Word: 'PM', Bounding polygon {{X=579,Y=304},{X=586,Y=304},{X=586,Y=309},{X=578,Y=310}}, Confidence 0.6620
   Line: 'Bebek Shaman', Bounding polygon {{X=538,Y=310},{X=577,Y=310},{X=577,Y=316},{X=538,Y=316}}
     Word: 'Bebek', Bounding polygon {{X=539,Y=310},{X=554,Y=310},{X=554,Y=317},{X=539,Y=316}}, Confidence 0.6110
     Word: 'Shaman', Bounding polygon {{X=555,Y=310},{X=576,Y=311},{X=576,Y=317},{X=555,Y=317}}, Confidence 0.6050        
   Line: 'Weekly stand up', Bounding polygon {{X=537,Y=332},{X=582,Y=333},{X=582,Y=339},{X=537,Y=338}}
     Word: 'Weekly', Bounding polygon {{X=538,Y=332},{X=557,Y=333},{X=556,Y=339},{X=538,Y=338}}, Confidence 0.6060        
     Word: 'stand', Bounding polygon {{X=558,Y=333},{X=572,Y=334},{X=571,Y=340},{X=557,Y=339}}, Confidence 0.4890
     Word: 'up', Bounding polygon {{X=574,Y=334},{X=580,Y=334},{X=580,Y=340},{X=573,Y=340}}, Confidence 0.8150
   Line: '12:00 PM-1:00 PM', Bounding polygon {{X=537,Y=340},{X=583,Y=340},{X=583,Y=347},{X=536,Y=346}}
     Word: '12:00', Bounding polygon {{X=539,Y=341},{X=553,Y=341},{X=552,Y=347},{X=538,Y=347}}, Confidence 0.8260
     Word: 'PM-1:00', Bounding polygon {{X=554,Y=341},{X=575,Y=341},{X=574,Y=347},{X=553,Y=347}}, Confidence 0.2090       
     Word: 'PM', Bounding polygon {{X=576,Y=341},{X=583,Y=341},{X=582,Y=347},{X=575,Y=347}}, Confidence 0.0390
   Line: 'Delle Marckre', Bounding polygon {{X=538,Y=347},{X=582,Y=347},{X=582,Y=352},{X=538,Y=353}}
     Word: 'Delle', Bounding polygon {{X=540,Y=348},{X=559,Y=347},{X=558,Y=353},{X=539,Y=353}}, Confidence 0.5800
     Word: 'Marckre', Bounding polygon {{X=560,Y=347},{X=582,Y=348},{X=582,Y=353},{X=559,Y=353}}, Confidence 0.2750       
   Line: 'Product review', Bounding polygon {{X=538,Y=370},{X=577,Y=370},{X=577,Y=376},{X=538,Y=375}}
     Word: 'Product', Bounding polygon {{X=539,Y=370},{X=559,Y=371},{X=558,Y=376},{X=539,Y=376}}, Confidence 0.6150       
     Word: 'review', Bounding polygon {{X=560,Y=371},{X=576,Y=371},{X=575,Y=376},{X=559,Y=376}}, Confidence 0.0400 
```

## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to install the Image Analysis client SDK and make basic image analysis calls. Next, learn more about the Analysis 4.0 API features.

> 
>[Call the Analyze Image 4.0 API](../how-to/call-analyze-image-40.md)

* [Image Analysis overview](../overview-image-analysis.md)
* Sample source code can be found on [GitHub](https://aka.ms/azsdk/image-analysis/samples/csharp).




**Applies to: programming-language-python**



<a name="HOLTop"></a>

Use the Image Analysis client SDK for Python to read text in an image and generate an image caption. This quickstart analyzes a remote image and prints the results to the console.

[Reference documentation](https://aka.ms/azsdk/image-analysis/ref-docs/python) | [Package (PyPi)](https://aka.ms/azsdk/image-analysis/package/pypi) | [Samples](https://aka.ms/azsdk/image-analysis/samples/python)

> **Tip:**
> The Analysis 4.0 API can do many different operations. See the [Analyze Image how-to guide](../how-to/call-analyze-image-40.md) for examples that showcase all of the available features.

## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* [Python 3.x](https://www.python.org/). Your Python installation should include [pip](https://pip.pypa.io/en/stable/). You can check if you have pip installed by running `pip --version` on the command line. Get pip by installing the latest version of Python.
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision"  title="create a Computer Vision resource"  target="_blank">create a Computer Vision resource</a> in the Azure portal. In order to use the captioning feature in this quickstart, you must create your resource in one of the supported Azure regions (see [Image captions](https://learn.microsoft.com/azure/ai-services/computer-vision/concept-describe-images-40) for the list of regions). After it deploys, select **Go to resource**.
    * You need the key and endpoint from the resource you create to connect your application to Azure Vision in Foundry Tools.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.



## Create environment variables 

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `VISION_KEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `VISION_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40.md)

#### [Windows](#tab/windows)

```console
setx VISION_KEY <your_key>
```

```console
setx VISION_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export VISION_KEY=<your_key>
```

```bash
export VISION_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Analyze image

1. Open a command prompt where you want the new project, and create a new file named *quickstart.py*.
1. Run this command to install the Image Analysis SDK:

    ```console
    pip install azure-ai-vision-imageanalysis
    ```

1. Copy the following code into *quickstart.py*:

    > **Tip:**
    > The code shows analyzing an image URL. You can also analyze an image from the program memory buffer. For more information, see the [Analyze Image how-to guide](../how-to/call-analyze-image-40.md).

    [Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/python/ComputerVision/4-0/quickstart.py?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40.md)

1. Then run the application with the `python` command on your quickstart file.

    ```console
    python quickstart.py
    ```

## Output

The console output should show something similar to the following text:

```console
Caption:
   'a person pointing at a screen', Confidence 0.4892
Text:
   Line: '9:35 AM', Bounding polygon {130, 129, 215, 130, 215, 149, 130, 148}
     Word: '9:35', Bounding polygon {131, 130, 171, 130, 171, 149, 130, 149}, Confidence 0.9930
     Word: 'AM', Bounding polygon {179, 130, 204, 130, 203, 149, 178, 149}, Confidence 0.9980
   Line: 'E Conference room 154584354', Bounding polygon {130, 153, 224, 154, 224, 161, 130, 161}
     Word: 'E', Bounding polygon {131, 154, 135, 154, 135, 161, 131, 161}, Confidence 0.1040
     Word: 'Conference', Bounding polygon {142, 154, 174, 154, 173, 161, 141, 161}, Confidence 0.9020
     Word: 'room', Bounding polygon {175, 154, 189, 155, 188, 161, 175, 161}, Confidence 0.7960
     Word: '154584354', Bounding polygon {192, 155, 224, 154, 223, 162, 191, 161}, Confidence 0.8640
   Line: '#: 555-173-4547', Bounding polygon {130, 163, 182, 164, 181, 171, 130, 170}
     Word: '#:', Bounding polygon {131, 163, 139, 164, 139, 171, 131, 171}, Confidence 0.0360
     Word: '555-173-4547', Bounding polygon {142, 164, 182, 165, 181, 171, 142, 171}, Confidence 0.5970
   Line: 'Town Hall', Bounding polygon {546, 180, 590, 180, 590, 190, 546, 190}
     Word: 'Town', Bounding polygon {547, 181, 568, 181, 568, 190, 546, 191}, Confidence 0.9810
     Word: 'Hall', Bounding polygon {570, 181, 590, 181, 590, 191, 570, 190}, Confidence 0.9910
   Line: '9:00 AM - 10:00 AM', Bounding polygon {546, 191, 596, 192, 596, 200, 546, 199}
     Word: '9:00', Bounding polygon {546, 192, 555, 192, 555, 200, 546, 200}, Confidence 0.0900
     Word: 'AM', Bounding polygon {557, 192, 565, 192, 565, 200, 557, 200}, Confidence 0.9910
     Word: '-', Bounding polygon {567, 192, 569, 192, 569, 200, 567, 200}, Confidence 0.6910
     Word: '10:00', Bounding polygon {570, 192, 585, 193, 584, 200, 570, 200}, Confidence 0.8850
     Word: 'AM', Bounding polygon {586, 193, 593, 194, 593, 200, 586, 200}, Confidence 0.9910
   Line: 'Aaron Buaion', Bounding polygon {543, 201, 581, 201, 581, 208, 543, 208}
     Word: 'Aaron', Bounding polygon {545, 202, 560, 202, 559, 208, 544, 208}, Confidence 0.6020
     Word: 'Buaion', Bounding polygon {561, 202, 580, 202, 579, 208, 560, 208}, Confidence 0.2910
   Line: 'Daily SCRUM', Bounding polygon {537, 259, 575, 260, 575, 266, 537, 265}
     Word: 'Daily', Bounding polygon {538, 259, 551, 260, 550, 266, 538, 265}, Confidence 0.1750
     Word: 'SCRUM', Bounding polygon {552, 260, 570, 260, 570, 266, 551, 266}, Confidence 0.1140
   Line: '10:00 AM 11:00 AM', Bounding polygon {536, 266, 590, 266, 590, 272, 536, 272}
     Word: '10:00', Bounding polygon {539, 267, 553, 267, 552, 273, 538, 272}, Confidence 0.8570
     Word: 'AM', Bounding polygon {554, 267, 561, 267, 560, 273, 553, 273}, Confidence 0.9980
     Word: '11:00', Bounding polygon {564, 267, 578, 267, 577, 273, 563, 273}, Confidence 0.4790
     Word: 'AM', Bounding polygon {579, 267, 586, 267, 585, 273, 578, 273}, Confidence 0.9940
   Line: 'Churlette de Crum', Bounding polygon {538, 273, 584, 273, 585, 279, 538, 279}
     Word: 'Churlette', Bounding polygon {539, 274, 562, 274, 561, 279, 538, 279}, Confidence 0.4640
     Word: 'de', Bounding polygon {563, 274, 569, 274, 568, 279, 562, 279}, Confidence 0.8100
     Word: 'Crum', Bounding polygon {570, 274, 582, 273, 581, 279, 569, 279}, Confidence 0.8850
   Line: 'Quarterly NI Hands', Bounding polygon {538, 295, 588, 295, 588, 301, 538, 302}
     Word: 'Quarterly', Bounding polygon {540, 296, 562, 296, 562, 302, 539, 302}, Confidence 0.5230
     Word: 'NI', Bounding polygon {563, 296, 570, 296, 570, 302, 563, 302}, Confidence 0.3030
     Word: 'Hands', Bounding polygon {572, 296, 588, 296, 588, 302, 571, 302}, Confidence 0.6130
   Line: '11.00 AM-12:00 PM', Bounding polygon {536, 304, 588, 303, 588, 309, 536, 310}
     Word: '11.00', Bounding polygon {538, 304, 552, 304, 552, 310, 538, 310}, Confidence 0.6180
     Word: 'AM-12:00', Bounding polygon {554, 304, 578, 304, 577, 310, 553, 310}, Confidence 0.2700
     Word: 'PM', Bounding polygon {579, 304, 586, 304, 586, 309, 578, 310}, Confidence 0.6620
   Line: 'Bebek Shaman', Bounding polygon {538, 310, 577, 310, 577, 316, 538, 316}
     Word: 'Bebek', Bounding polygon {539, 310, 554, 310, 554, 317, 539, 316}, Confidence 0.6110
     Word: 'Shaman', Bounding polygon {555, 310, 576, 311, 576, 317, 555, 317}, Confidence 0.6050
   Line: 'Weekly stand up', Bounding polygon {537, 332, 582, 333, 582, 339, 537, 338}
     Word: 'Weekly', Bounding polygon {538, 332, 557, 333, 556, 339, 538, 338}, Confidence 0.6060
     Word: 'stand', Bounding polygon {558, 333, 572, 334, 571, 340, 557, 339}, Confidence 0.4890
     Word: 'up', Bounding polygon {574, 334, 580, 334, 580, 340, 573, 340}, Confidence 0.8150
   Line: '12:00 PM-1:00 PM', Bounding polygon {537, 340, 583, 340, 583, 347, 536, 346}
     Word: '12:00', Bounding polygon {539, 341, 553, 341, 552, 347, 538, 347}, Confidence 0.8260
     Word: 'PM-1:00', Bounding polygon {554, 341, 575, 341, 574, 347, 553, 347}, Confidence 0.2090
     Word: 'PM', Bounding polygon {576, 341, 583, 341, 582, 347, 575, 347}, Confidence 0.0390
   Line: 'Delle Marckre', Bounding polygon {538, 347, 582, 347, 582, 352, 538, 353}
     Word: 'Delle', Bounding polygon {540, 348, 559, 347, 558, 353, 539, 353}, Confidence 0.5800
     Word: 'Marckre', Bounding polygon {560, 347, 582, 348, 582, 353, 559, 353}, Confidence 0.2750
   Line: 'Product review', Bounding polygon {538, 370, 577, 370, 577, 376, 538, 375}
     Word: 'Product', Bounding polygon {539, 370, 559, 371, 558, 376, 539, 376}, Confidence 0.6150
     Word: 'review', Bounding polygon {560, 371, 576, 371, 575, 376, 559, 376}, Confidence 0.0400
```


## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)


## Next steps

In this quickstart, you learned how to install the Image Analysis client SDK and make basic image analysis calls. Next, learn more about the Analysis 4.0 API features.

> 
>[Call the Analyze Image 4.0 API](../how-to/call-analyze-image-40.md)

* [Image Analysis overview](../overview-image-analysis.md)
* Sample source code can be found on [GitHub](https://aka.ms/azsdk/image-analysis/samples/python).




**Applies to: programming-language-java**


 
<a name="HOLTop"></a>

Use the Image Analysis client SDK for Java to read text in an image and generate an image caption. This quickstart analyzes a remote image and prints the results to the console. 

[Reference documentation](https://aka.ms/azsdk/image-analysis/ref-docs/java) | [Maven Package](https://aka.ms/azsdk/image-analysis/package/maven) | [Samples](https://aka.ms/azsdk/image-analysis/samples/java)

> **Tip:**
> The Analysis 4.0 API can do many different operations. See the [Analyze Image how-to guide](../how-to/call-analyze-image-40.md) for examples that showcase all of the available features.

## Prerequisites

* A Windows 10 (or higher) x64, or Linux x64 machine.
* Java Development Kit (JDK) version 8 or above installed, such as [Azul Zulu OpenJDK](https://www.azul.com/downloads/?package=jdk), [Microsoft Build of OpenJDK](https://www.microsoft.com/openjdk), [Oracle Java](https://www.java.com/download/), or your preferred JDK. Run `java -version` from a command line to see your version and confirm a successful installation. Make sure that the Java installation is native to the system architecture and not running through emulation.
* [Apache Maven](https://maven.apache.org/download.cgi) installed. On Linux, install from the distribution repositories if available. Run `mvn -v` to confirm successful installation.
* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision"  title="create a Computer Vision resource"  target="_blank">create a Computer Vision resource</a> in the Azure portal. In order to use the captioning feature in this quickstart, you must create your resource in one of the supported Azure regions (see [Image captions](https://learn.microsoft.com/azure/ai-services/computer-vision/concept-describe-images-40)). After it deploys, select **Go to resource**.
   * You need the key and endpoint from the resource you create to connect your application to Azure Vision in Foundry Tools.
   * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.


## Set up application

Open a console window and create a new folder for your quickstart application.

1. Open a text editor and copy the following content to a new file. Save the file as `pom.xml` in your project directory
    <!-- [!INCLUDE][](https://raw.githubusercontent.com/Azure-Samples/cognitive-services-quickstart-code/master/java/ComputerVision/4-0/pom.xml)] -->
    ```xml
    <project xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>
      <groupId>com.example</groupId>
      <artifactId>my-application-name</artifactId>
      <version>1.0.0</version>
      <dependencies>
        <!-- https://mvnrepository.com/artifact/com.azure/azure-ai-vision-imageanalysis -->
        <dependency>
          <groupId>com.azure</groupId>
          <artifactId>azure-ai-vision-imageanalysis</artifactId>
          <version>1.0.0-beta.2</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-nop -->
        <dependency>
          <groupId>org.slf4j</groupId>
          <artifactId>slf4j-nop</artifactId>
          <version>1.7.36</version>
        </dependency>
      </dependencies>
    </project>
    ```

1. Update the version value (`1.0.0-beta.2`) based on the latest available version of the [azure-ai-vision-imageanalysis](https://aka.ms/azsdk/image-analysis/package/maven) package in the Maven repository.
1. Install the SDK and dependencies by running the following in the project directory:
    ```console
    mvn clean dependency:copy-dependencies
    ```
1. Once the operation succeeds, verify that the folders `target\dependency` were creating and they contain `.jar` files.



## Create environment variables 

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `VISION_KEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `VISION_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40.md)

#### [Windows](#tab/windows)

```console
setx VISION_KEY <your_key>
```

```console
setx VISION_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export VISION_KEY=<your_key>
```

```bash
export VISION_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---


## Analyze Image

Open a text editor and copy the following content to a new file. Save the file as `ImageAnalysis.java`

[Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/java/ComputerVision/4-0/ImageAnalysisQuickStart.java?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40.md)

> **Tip:**
> The code analyzes an image from a URL. You can also analyze an image from the program memory buffer. For more information, see the [Analyze Image how-to guide](../how-to/call-analyze-image-40.md).

To compile the Java file, run the following command:

```console
javac ImageAnalysis.java -cp ".;target/dependency/*"
``` 

You should see the file `ImageAnalysis.class` created in the current folder.

To run the application, run the following command:

```console
java -cp ".;target/dependency/*" ImageAnalysis
``` 

## Output

The console output should show something similar to the following text:

```console
Image analysis results:
 Caption:
   "a person pointing at a screen", Confidence 0.7768
 Read:
   Line: '9:35 AM', Bounding polygon [(x=131, y=130), (x=214, y=130), (x=214, y=148), (x=131, y=148)]
     Word: '9:35', Bounding polygon [(x=132, y=130), (x=172, y=131), (x=171, y=149), (x=131, y=148)], Confidence 0.9770
     Word: 'AM', Bounding polygon [(x=180, y=131), (x=203, y=131), (x=202, y=149), (x=180, y=149)], Confidence 0.9980
   Line: 'Conference room 154584354', Bounding polygon [(x=132, y=153), (x=224, y=153), (x=224, y=161), (x=132, y=160)]
     Word: 'Conference', Bounding polygon [(x=143, y=153), (x=174, y=154), (x=174, y=161), (x=143, y=161)], Confidence 0.6930
     Word: 'room', Bounding polygon [(x=176, y=154), (x=188, y=154), (x=188, y=161), (x=176, y=161)], Confidence 0.9590
     Word: '154584354', Bounding polygon [(x=192, y=154), (x=224, y=154), (x=223, y=161), (x=192, y=161)], Confidence 0.7050
   Line: ': 555-123-4567', Bounding polygon [(x=133, y=164), (x=183, y=164), (x=183, y=170), (x=133, y=170)]
     Word: ':', Bounding polygon [(x=134, y=165), (x=137, y=165), (x=136, y=171), (x=133, y=171)], Confidence 0.1620
     Word: '555-123-4567', Bounding polygon [(x=143, y=165), (x=182, y=165), (x=181, y=171), (x=143, y=171)], Confidence 0.6530
   Line: 'Town Hall', Bounding polygon [(x=545, y=178), (x=588, y=179), (x=588, y=190), (x=545, y=190)]
     Word: 'Town', Bounding polygon [(x=545, y=179), (x=569, y=180), (x=569, y=190), (x=545, y=190)], Confidence 0.9880
     Word: 'Hall', Bounding polygon [(x=571, y=180), (x=589, y=180), (x=589, y=190), (x=571, y=190)], Confidence 0.9900
   Line: '9:00 AM - 10:00 AM', Bounding polygon [(x=545, y=191), (x=596, y=191), (x=596, y=199), (x=545, y=198)]
     Word: '9:00', Bounding polygon [(x=546, y=191), (x=556, y=192), (x=556, y=199), (x=546, y=199)], Confidence 0.7580
     Word: 'AM', Bounding polygon [(x=558, y=192), (x=565, y=192), (x=564, y=199), (x=558, y=199)], Confidence 0.9890
     Word: '-', Bounding polygon [(x=567, y=192), (x=570, y=192), (x=569, y=199), (x=567, y=199)], Confidence 0.8960
     Word: '10:00', Bounding polygon [(x=571, y=192), (x=585, y=192), (x=585, y=199), (x=571, y=199)], Confidence 0.7970
     Word: 'AM', Bounding polygon [(x=587, y=192), (x=594, y=193), (x=593, y=199), (x=586, y=199)], Confidence 0.9940
   Line: 'Aaron Blaion', Bounding polygon [(x=542, y=201), (x=581, y=201), (x=581, y=207), (x=542, y=207)]
     Word: 'Aaron', Bounding polygon [(x=545, y=201), (x=560, y=202), (x=560, y=208), (x=545, y=208)], Confidence 0.7180
     Word: 'Blaion', Bounding polygon [(x=562, y=202), (x=579, y=202), (x=579, y=207), (x=562, y=207)], Confidence 0.2740
   Line: 'Daily SCRUM', Bounding polygon [(x=537, y=258), (x=574, y=259), (x=574, y=266), (x=537, y=265)]
     Word: 'Daily', Bounding polygon [(x=538, y=259), (x=551, y=259), (x=551, y=266), (x=538, y=265)], Confidence 0.4040
     Word: 'SCRUM', Bounding polygon [(x=553, y=259), (x=570, y=260), (x=570, y=265), (x=553, y=266)], Confidence 0.6970
   Line: '10:00 AM-11:00 AM', Bounding polygon [(x=535, y=266), (x=589, y=265), (x=589, y=272), (x=535, y=273)]
     Word: '10:00', Bounding polygon [(x=539, y=267), (x=553, y=266), (x=552, y=273), (x=539, y=274)], Confidence 0.2190
     Word: 'AM-11:00', Bounding polygon [(x=554, y=266), (x=578, y=266), (x=578, y=272), (x=554, y=273)], Confidence 0.1750
     Word: 'AM', Bounding polygon [(x=580, y=266), (x=587, y=266), (x=586, y=272), (x=580, y=272)], Confidence 1.0000
   Line: 'Charlene de Crum', Bounding polygon [(x=538, y=272), (x=588, y=273), (x=588, y=279), (x=538, y=279)]
     Word: 'Charlene', Bounding polygon [(x=538, y=273), (x=562, y=273), (x=562, y=280), (x=538, y=280)], Confidence 0.3220
     Word: 'de', Bounding polygon [(x=563, y=273), (x=569, y=273), (x=569, y=280), (x=563, y=280)], Confidence 0.9100
     Word: 'Crum', Bounding polygon [(x=570, y=273), (x=582, y=273), (x=583, y=280), (x=571, y=280)], Confidence 0.8710
   Line: 'Quarterly NI Handa', Bounding polygon [(x=537, y=295), (x=588, y=295), (x=588, y=302), (x=537, y=302)]
     Word: 'Quarterly', Bounding polygon [(x=539, y=296), (x=563, y=296), (x=563, y=302), (x=538, y=302)], Confidence 0.6030
     Word: 'NI', Bounding polygon [(x=564, y=296), (x=570, y=296), (x=571, y=302), (x=564, y=302)], Confidence 0.7300
     Word: 'Handa', Bounding polygon [(x=572, y=296), (x=588, y=296), (x=588, y=302), (x=572, y=302)], Confidence 0.9050
   Line: '11.00 AM-12:00 PM', Bounding polygon [(x=538, y=303), (x=587, y=303), (x=587, y=309), (x=538, y=309)]
     Word: '11.00', Bounding polygon [(x=539, y=303), (x=552, y=303), (x=553, y=309), (x=539, y=310)], Confidence 0.6710
     Word: 'AM-12:00', Bounding polygon [(x=554, y=303), (x=578, y=303), (x=578, y=309), (x=554, y=309)], Confidence 0.6560
     Word: 'PM', Bounding polygon [(x=579, y=303), (x=586, y=303), (x=586, y=309), (x=580, y=309)], Confidence 0.4540
   Line: 'Bobek Shemar', Bounding polygon [(x=538, y=310), (x=577, y=310), (x=577, y=316), (x=538, y=316)]
     Word: 'Bobek', Bounding polygon [(x=539, y=310), (x=554, y=311), (x=554, y=317), (x=539, y=317)], Confidence 0.6320
     Word: 'Shemar', Bounding polygon [(x=556, y=311), (x=576, y=311), (x=577, y=317), (x=556, y=317)], Confidence 0.2190
   Line: 'Weekly aband up', Bounding polygon [(x=538, y=332), (x=583, y=333), (x=583, y=339), (x=538, y=338)]
     Word: 'Weekly', Bounding polygon [(x=539, y=333), (x=557, y=333), (x=557, y=339), (x=539, y=339)], Confidence 0.5750
     Word: 'aband', Bounding polygon [(x=558, y=334), (x=573, y=334), (x=573, y=339), (x=558, y=339)], Confidence 0.4750
     Word: 'up', Bounding polygon [(x=574, y=334), (x=580, y=334), (x=580, y=339), (x=574, y=339)], Confidence 0.8650
   Line: '12:00 PM-1:00 PM', Bounding polygon [(x=538, y=339), (x=585, y=339), (x=585, y=346), (x=538, y=346)]
     Word: '12:00', Bounding polygon [(x=539, y=339), (x=553, y=340), (x=553, y=347), (x=539, y=346)], Confidence 0.7090
     Word: 'PM-1:00', Bounding polygon [(x=554, y=340), (x=575, y=340), (x=575, y=346), (x=554, y=347)], Confidence 0.9080
     Word: 'PM', Bounding polygon [(x=576, y=340), (x=583, y=340), (x=583, y=346), (x=576, y=346)], Confidence 0.9980
   Line: 'Danielle MarchTe', Bounding polygon [(x=538, y=346), (x=583, y=346), (x=583, y=352), (x=538, y=352)]
     Word: 'Danielle', Bounding polygon [(x=539, y=347), (x=559, y=347), (x=559, y=352), (x=539, y=353)], Confidence 0.1960
     Word: 'MarchTe', Bounding polygon [(x=560, y=347), (x=582, y=347), (x=582, y=352), (x=560, y=352)], Confidence 0.5710
   Line: 'Product reviret', Bounding polygon [(x=537, y=370), (x=578, y=370), (x=578, y=375), (x=537, y=375)]
     Word: 'Product', Bounding polygon [(x=539, y=370), (x=559, y=370), (x=559, y=376), (x=539, y=375)], Confidence 0.7000
     Word: 'reviret', Bounding polygon [(x=560, y=370), (x=578, y=371), (x=578, y=375), (x=560, y=376)], Confidence 0.2180
```

## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to install the Image Analysis client SDK and make basic image analysis calls. Next, learn more about the Analysis 4.0 API features.


> 
>[Call the Analyze Image 4.0 API](../how-to/call-analyze-image-40.md)

* [Image Analysis overview](../overview-image-analysis.md)
* Sample source code can be found on [GitHub](https://aka.ms/azsdk/image-analysis/samples/java).




**Applies to: programming-language-javascript**



<a name="HOLTop"></a>

Use the Image Analysis client SDK for JavaScript to read text in an image and generate an image caption. This quickstart analyzes a remote image and prints the results to the console.

[Reference documentation](https://aka.ms/azsdk/image-analysis/ref-docs/js) | [Package (npm)](https://aka.ms/azsdk/image-analysis/package/npm) | [Samples](https://aka.ms/azsdk/image-analysis/samples/js)

> **Tip:**
> The Analysis 4.0 API can do many different operations. See the [Analyze Image how-to guide](../how-to/call-analyze-image-40.md) for examples that showcase all of the available features.

## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
* The current version of [Node.js](https://nodejs.org/)
* The current version of Edge, Chrome, Firefox, or Safari internet browser.
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision"  title="create a Computer Vision resource"  target="_blank">create a Computer Vision resource</a> in the Azure portal to get your key and endpoint. In order to use the captioning feature in this quickstart, you must create your resource in one of the supported Azure regions (see [Image captions](https://learn.microsoft.com/azure/ai-services/computer-vision/concept-describe-images-40) for the list of regions). After it deploys, select **Go to resource**.
    * You need the key and endpoint from the resource you create to connect your application to Azure Vision in Foundry Tools.
    * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.



## Create environment variables 

In this example, write your credentials to environment variables on the local machine that runs the application.


Go to the Azure portal. If the resource you created in the **Prerequisites** section deployed successfully, select **Go to resource** under **Next steps**. You can find your key and endpoint under **Resource Management** on the **Keys and Endpoint** page of the Face resource. Your resource key isn't the same as your Azure subscription ID.


To set the environment variable for your key and endpoint, open a console window and follow the instructions for your operating system and development environment.

- To set the `VISION_KEY` environment variable, replace `<your_key>` with one of the keys for your resource.
- To set the `VISION_ENDPOINT` environment variable, replace `<your_endpoint>` with the endpoint for your resource.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40.md)

#### [Windows](#tab/windows)

```console
setx VISION_KEY <your_key>
```

```console
setx VISION_ENDPOINT <your_endpoint>
```

After you add the environment variables, you might need to restart any running programs that will read the environment variables, including the console window.

#### [Linux](#tab/linux)

```bash
export VISION_KEY=<your_key>
```

```bash
export VISION_ENDPOINT=<your_endpoint>
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

---



## Analyze image

1. Create a new Node.js application

    In a console window (such as cmd, PowerShell, or Bash), create a new directory for your app, and navigate to it.

    ```console
    mkdir myapp && cd myapp
    ```

    Run the `npm init` command to create a node application with a `package.json` file.

    ```console
    npm init
    ```

1. Install the client library

    Install `@azure-rest/ai-vision-image-analysis` npm package:

    ```console
    npm install @azure-rest/ai-vision-image-analysis
    ```

    Also install the dotenv package:

    ```console
    npm install dotenv
    ```

    Your app's `package.json` file will be updated with the dependencies.

1. Create a new file, *index.js*. Open it in a text editor and paste in the following code.

   [Code reference unavailable in this source snapshot: ../includes/quickstarts-sdk/~/cognitive-services-quickstart-code/javascript/ComputerVision/4-0/quickstart.js?name=snippet_single](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40.md)

1. Run the application with the `node` command on your quickstart file.

   ```console
   node index.js
   ```

<!-- tbd output-->


## Clean up resources

If you want to clean up and remove a Foundry Tools subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it.

* [Azure portal](../../multi-service-resource.md?pivots=azportal#clean-up-resources)
* [Azure CLI](../../multi-service-resource.md?pivots=azcli#clean-up-resources)

## Next steps

In this quickstart, you learned how to install the Image Analysis client library and make basic image analysis calls. Next, learn more about the Analyze API features.

> 
>[Call the Analyze API](../how-to/call-analyze-image.md)

* [Image Analysis overview](../overview-image-analysis.md)
* The source code for this sample can be found on [GitHub](https://aka.ms/azsdk/image-analysis/samples/js).




**Applies to: programming-language-rest-api**



Use the Image Analysis REST API to read text and generate captions for the image (version 4.0 only).

> **Tip:**
> The Analysis 4.0 API can do many different operations. See the [Analyze Image how-to guide](../how-to/call-analyze-image-40.md) for examples that showcase all of the available features.

## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) 
* Once you have your Azure subscription, <a href="https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision"  title="create a Computer Vision resource"  target="_blank">create a Computer Vision resource</a> in the Azure portal to get your key and endpoint. In order to use the captioning feature in this quickstart, you must create your resource in certain Azure regions. See [Region availability](../overview-image-analysis.md#region-availability). After it deploys, select **Go to resource**.
  * You'll need the key and endpoint from the resource you create to connect your application to Azure Vision in Foundry Tools. You'll paste your key and endpoint into the code below later in the quickstart.
  * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
* [cURL](https://curl.haxx.se/) installed



## Analyze an image

To analyze an image for various visual features, do the following steps:

1. Copy the following `curl` command into a text editor.

    ```bash
    curl.exe -H "Ocp-Apim-Subscription-Key: <subscriptionKey>" -H "Content-Type: application/json" "<endpoint>/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2024-02-01" -d "{'url':'https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png'}"
    ```

1. Make the following changes in the command where needed:
    1. Replace the value of `<subscriptionKey>` with your Vision resource key.
    1. Replace the value of `<endpoint>` with your Vision resource endpoint URL. For example: `https://YourResourceName.cognitiveservices.azure.com`.
    1. Optionally, change the image URL in the request body (`https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png`) to the URL of a different image to be analyzed.
1. Open a command prompt window.
1. Paste your edited `curl` command from the text editor into the command prompt window, and then run the command.



### Examine the response

A successful response is returned in JSON, similar to the following example:


```json
{
    "modelVersion": "2023-10-01",
    "captionResult":
    {
        "text": "a man pointing at a screen",
        "confidence": 0.7767987847328186
    },
    "metadata":
    {
        "width": 1038,
        "height": 692
    },
    "readResult":
    {
        "blocks":
        [
            {
                "lines":
                [
                    {
                        "text": "9:35 AM",
                        "boundingPolygon": [{"x":131,"y":130},{"x":214,"y":130},{"x":214,"y":148},{"x":131,"y":148}],
                        "words": [{"text":"9:35","boundingPolygon":[{"x":132,"y":130},{"x":172,"y":131},{"x":171,"y":149},{"x":131,"y":148}],"confidence":0.977},{"text":"AM","boundingPolygon":[{"x":180,"y":131},{"x":203,"y":131},{"x":202,"y":149},{"x":180,"y":149}],"confidence":0.998}]
                    },
                    {
                        "text": "Conference room 154584354",
                        "boundingPolygon": [{"x":132,"y":153},{"x":224,"y":153},{"x":224,"y":161},{"x":132,"y":160}],
                        "words": [{"text":"Conference","boundingPolygon":[{"x":143,"y":153},{"x":174,"y":154},{"x":174,"y":161},{"x":143,"y":161}],"confidence":0.693},{"text":"room","boundingPolygon":[{"x":176,"y":154},{"x":188,"y":154},{"x":188,"y":161},{"x":176,"y":161}],"confidence":0.959},{"text":"154584354","boundingPolygon":[{"x":192,"y":154},{"x":224,"y":154},{"x":223,"y":161},{"x":192,"y":161}],"confidence":0.705}]
                    },
                    {
                        "text": ": 555-123-4567",
                        "boundingPolygon": [{"x":133,"y":164},{"x":183,"y":164},{"x":183,"y":170},{"x":133,"y":170}],
                        "words": [{"text":":","boundingPolygon":[{"x":134,"y":165},{"x":137,"y":165},{"x":136,"y":171},{"x":133,"y":171}],"confidence":0.162},{"text":"555-123-4567","boundingPolygon":[{"x":143,"y":165},{"x":182,"y":165},{"x":181,"y":171},{"x":143,"y":171}],"confidence":0.653}]
                    },
                    {
                        "text": "Town Hall",
                        "boundingPolygon": [{"x":545,"y":178},{"x":588,"y":179},{"x":588,"y":190},{"x":545,"y":190}],
                        "words": [{"text":"Town","boundingPolygon":[{"x":545,"y":179},{"x":569,"y":180},{"x":569,"y":190},{"x":545,"y":190}],"confidence":0.988},{"text":"Hall","boundingPolygon":[{"x":571,"y":180},{"x":589,"y":180},{"x":589,"y":190},{"x":571,"y":190}],"confidence":0.99}]
                    },
                    {
                        "text": "9:00 AM - 10:00 AM",
                        "boundingPolygon": [{"x":545,"y":191},{"x":596,"y":191},{"x":596,"y":199},{"x":545,"y":198}],
                        "words": [{"text":"9:00","boundingPolygon":[{"x":546,"y":191},{"x":556,"y":192},{"x":556,"y":199},{"x":546,"y":199}],"confidence":0.758},{"text":"AM","boundingPolygon":[{"x":558,"y":192},{"x":565,"y":192},{"x":564,"y":199},{"x":558,"y":199}],"confidence":0.989},{"text":"-","boundingPolygon":[{"x":567,"y":192},{"x":570,"y":192},{"x":569,"y":199},{"x":567,"y":199}],"confidence":0.896},{"text":"10:00","boundingPolygon":[{"x":571,"y":192},{"x":585,"y":192},{"x":585,"y":199},{"x":571,"y":199}],"confidence":0.797},{"text":"AM","boundingPolygon":[{"x":587,"y":192},{"x":594,"y":193},{"x":593,"y":199},{"x":586,"y":199}],"confidence":0.994}]
                    },
                    {
                        "text": "Aaron Blaion",
                        "boundingPolygon": [{"x":542,"y":201},{"x":581,"y":201},{"x":581,"y":207},{"x":542,"y":207}],
                        "words": [{"text":"Aaron","boundingPolygon":[{"x":545,"y":201},{"x":560,"y":202},{"x":560,"y":208},{"x":545,"y":208}],"confidence":0.718},{"text":"Blaion","boundingPolygon":[{"x":562,"y":202},{"x":579,"y":202},{"x":579,"y":207},{"x":562,"y":207}],"confidence":0.274}]
                    },
                    {
                        "text": "Daily SCRUM",
                        "boundingPolygon": [{"x":537,"y":258},{"x":574,"y":259},{"x":574,"y":266},{"x":537,"y":265}],
                        "words": [{"text":"Daily","boundingPolygon":[{"x":538,"y":259},{"x":551,"y":259},{"x":551,"y":266},{"x":538,"y":265}],"confidence":0.404},{"text":"SCRUM","boundingPolygon":[{"x":553,"y":259},{"x":570,"y":260},{"x":570,"y":265},{"x":553,"y":266}],"confidence":0.697}]
                    },
                    {
                        "text": "10:00 AM-11:00 AM",
                        "boundingPolygon": [{"x":535,"y":266},{"x":589,"y":265},{"x":589,"y":272},{"x":535,"y":273}],
                        "words": [{"text":"10:00","boundingPolygon":[{"x":539,"y":267},{"x":553,"y":266},{"x":552,"y":273},{"x":539,"y":274}],"confidence":0.219},{"text":"AM-11:00","boundingPolygon":[{"x":554,"y":266},{"x":578,"y":266},{"x":578,"y":272},{"x":554,"y":273}],"confidence":0.175},{"text":"AM","boundingPolygon":[{"x":580,"y":266},{"x":587,"y":266},{"x":586,"y":272},{"x":580,"y":272}],"confidence":1}]
                    },
                    {
                        "text": "Charlene de Crum",
                        "boundingPolygon": [{"x":538,"y":272},{"x":588,"y":273},{"x":588,"y":279},{"x":538,"y":279}],
                        "words": [{"text":"Charlene","boundingPolygon":[{"x":538,"y":273},{"x":562,"y":273},{"x":562,"y":280},{"x":538,"y":280}],"confidence":0.322},{"text":"de","boundingPolygon":[{"x":563,"y":273},{"x":569,"y":273},{"x":569,"y":280},{"x":563,"y":280}],"confidence":0.91},{"text":"Crum","boundingPolygon":[{"x":570,"y":273},{"x":582,"y":273},{"x":583,"y":280},{"x":571,"y":280}],"confidence":0.871}]
                    },
                    {
                        "text": "Quarterly NI Handa",
                        "boundingPolygon": [{"x":537,"y":295},{"x":588,"y":295},{"x":588,"y":302},{"x":537,"y":302}],
                        "words": [{"text":"Quarterly","boundingPolygon":[{"x":539,"y":296},{"x":563,"y":296},{"x":563,"y":302},{"x":538,"y":302}],"confidence":0.603},{"text":"NI","boundingPolygon":[{"x":564,"y":296},{"x":570,"y":296},{"x":571,"y":302},{"x":564,"y":302}],"confidence":0.73},{"text":"Handa","boundingPolygon":[{"x":572,"y":296},{"x":588,"y":296},{"x":588,"y":302},{"x":572,"y":302}],"confidence":0.905}]
                    },
                    {
                        "text": "11.00 AM-12:00 PM",
                        "boundingPolygon": [{"x":538,"y":303},{"x":587,"y":303},{"x":587,"y":309},{"x":538,"y":309}],
                        "words": [{"text":"11.00","boundingPolygon":[{"x":539,"y":303},{"x":552,"y":303},{"x":553,"y":309},{"x":539,"y":310}],"confidence":0.671},{"text":"AM-12:00","boundingPolygon":[{"x":554,"y":303},{"x":578,"y":303},{"x":578,"y":309},{"x":554,"y":309}],"confidence":0.656},{"text":"PM","boundingPolygon":[{"x":579,"y":303},{"x":586,"y":303},{"x":586,"y":309},{"x":580,"y":309}],"confidence":0.454}]
                    },
                    {
                        "text": "Bobek Shemar",
                        "boundingPolygon": [{"x":538,"y":310},{"x":577,"y":310},{"x":577,"y":316},{"x":538,"y":316}],
                        "words": [{"text":"Bobek","boundingPolygon":[{"x":539,"y":310},{"x":554,"y":311},{"x":554,"y":317},{"x":539,"y":317}],"confidence":0.632},{"text":"Shemar","boundingPolygon":[{"x":556,"y":311},{"x":576,"y":311},{"x":577,"y":317},{"x":556,"y":317}],"confidence":0.219}]
                    },
                    {
                        "text": "Weekly aband up",
                        "boundingPolygon": [{"x":538,"y":332},{"x":583,"y":333},{"x":583,"y":339},{"x":538,"y":338}],
                        "words": [{"text":"Weekly","boundingPolygon":[{"x":539,"y":333},{"x":557,"y":333},{"x":557,"y":339},{"x":539,"y":339}],"confidence":0.575},{"text":"aband","boundingPolygon":[{"x":558,"y":334},{"x":573,"y":334},{"x":573,"y":339},{"x":558,"y":339}],"confidence":0.475},{"text":"up","boundingPolygon":[{"x":574,"y":334},{"x":580,"y":334},{"x":580,"y":339},{"x":574,"y":339}],"confidence":0.865}]
                    },
                    {
                        "text": "12:00 PM-1:00 PM",
                        "boundingPolygon": [{"x":538,"y":339},{"x":585,"y":339},{"x":585,"y":346},{"x":538,"y":346}],
                        "words": [{"text":"12:00","boundingPolygon":[{"x":539,"y":339},{"x":553,"y":340},{"x":553,"y":347},{"x":539,"y":346}],"confidence":0.709},{"text":"PM-1:00","boundingPolygon":[{"x":554,"y":340},{"x":575,"y":340},{"x":575,"y":346},{"x":554,"y":347}],"confidence":0.908},{"text":"PM","boundingPolygon":[{"x":576,"y":340},{"x":583,"y":340},{"x":583,"y":346},{"x":576,"y":346}],"confidence":0.998}]
                    },
                    {
                        "text": "Danielle MarchTe",
                        "boundingPolygon": [{"x":538,"y":346},{"x":583,"y":346},{"x":583,"y":352},{"x":538,"y":352}],
                        "words": [{"text":"Danielle","boundingPolygon":[{"x":539,"y":347},{"x":559,"y":347},{"x":559,"y":352},{"x":539,"y":353}],"confidence":0.196},{"text":"MarchTe","boundingPolygon":[{"x":560,"y":347},{"x":582,"y":347},{"x":582,"y":352},{"x":560,"y":352}],"confidence":0.571}]
                    },
                    {
                        "text": "Product reviret",
                        "boundingPolygon": [{"x":537,"y":370},{"x":578,"y":370},{"x":578,"y":375},{"x":537,"y":375}],
                        "words": [{"text":"Product","boundingPolygon":[{"x":539,"y":370},{"x":559,"y":370},{"x":559,"y":376},{"x":539,"y":375}],"confidence":0.7},{"text":"reviret","boundingPolygon":[{"x":560,"y":370},{"x":578,"y":371},{"x":578,"y":375},{"x":560,"y":376}],"confidence":0.218}]
                    }
                ]
            }
        ]
    }
}
```



## Next steps

In this quickstart, you learned how to make basic image analysis calls using the REST API. Next, learn more about the Analysis 4.0 API features.

> 
>[Call the Analyze Image 4.0 API](../how-to/call-analyze-image-40.md)

* [Image Analysis overview](../overview-image-analysis.md)
