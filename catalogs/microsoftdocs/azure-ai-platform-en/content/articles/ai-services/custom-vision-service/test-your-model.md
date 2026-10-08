---
title: Test and retrain a model - Custom Vision Service
titleSuffix: Foundry Tools
description: Learn how to test an image and then use it to retrain your model in the Custom Vision service, ensuring your model improves over time with new data.
#customer intent: As a developer, I want to test and retrain my Custom Vision model so that it improves its accuracy.
author: PatrickFarley
manager: mcleans

ms.service: azure-ai-custom-vision
ms.topic: how-to
ms.date: 01/22/2025
ms.author: pafarley
ms.custom: sfi-image-nochange
---

# Test and retrain a Custom Vision model



> **Important:**
> Microsoft is announcing the planned retirement of the Azure Custom Vision service. Microsoft will provide full support for all existing Azure Custom Vision customers until 9/25/2028. During this support window, customers are encouraged to begin planning and executing their transition to alternative solutions.
> Depending on your use case, we recommend the following paths for transition:
> - For creating custom models for both image classification and object detection, **Azure Machine Learning AutoML** offers the ability to train both custom model types using classic machine learning techniques
> - [Learn more about Azure Machine Learning AutoML](https://learn.microsoft.com/azure/machine-learning/concept-automated-ml) and explore how it can offer support for custom model training.
> 
> Microsoft is also investing in Generative AI-based solutions that increase accuracy in custom scenarios using prompt engineering and other techniques.
> - To use generative models, you can use one of models available in the Foundry model catalog and create your own solution for customized vision.
> - For a managed generative solution for image classification, Azure Content Understanding in Foundry Tools (currently in public preview) offers the ability to create custom classification workflows. It also supports processing unstructured data of any type (image, documents, audio, video) and extract structured insights based on pre-defined or user-defined formats.
> - [Learn more about Microsoft Foundry Models](https://learn.microsoft.com/azure/ai-foundry/concepts/foundry-models-overview) and [Azure Content Understanding (public preview)](https://learn.microsoft.com/azure/ai-services/content-understanding/overview) and explore how they can offer alternative paths for your custom needs.
>
> For more detailed guidance on migration, see the [Azure Custom Vision Migration Guide](https://aka.ms/custom-vision-migration).


After you train your Custom Vision model, you can quickly test it using a locally stored image or a URL pointing to a remote image. Test the most recently trained iteration of your model, and then decide whether further training is needed.

## Test your model

1. From the [Custom Vision web portal](https://customvision.ai), select your project. Select **Quick Test** on the right of the top menu bar. This action opens a window labeled **Quick Test**.

    The Quick Test button is shown in the upper right corner of the window.

1. In the **Quick Test** window, select in the **Submit Image** field and enter the URL of the image you want to use for your test. If you want to use a locally stored image instead, select the **Browse local files** button and select a local image file.

    Screenshot of the submit image page.

The image you select appears in the middle of the page. Then the prediction results appear below the image in the form of a table with two columns, labeled **Tags** and **Confidence**. After you view the results, you may close the **Quick Test** window.

## Use the predicted image for training

You can now take the image submitted previously for testing and use it to retrain your model.

1. To view images submitted to the classifier, open the [Custom Vision web page](https://customvision.ai) and select the **Predictions** tab.

    Image of the predictions tab

    > **Tip:**
    > The default view shows images from the current iteration. You can use the **Iteration** drop down field to view images submitted during previous iterations.

1. Hover over an image to see the tags that were predicted by the classifier.

    > **Tip:**
    > Images are ranked, so that the images that can bring the most gains to the classifier are at the top. To select a different sorting, use the **Sort** section.

    To add an image to your training data, select the image, manually select the tag(s), and then select **Save and close**. The image is removed from **Predictions** and added to the training images. You can view it by selecting the **Training Images** tab.

    Screenshot of the tagging page.

1. Use the **Train** button to retrain the classifier.

## Next step

> 
> [Improve your model](getting-started-improving-your-classifier.md)
