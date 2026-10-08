---
title: Background removal - Image Analysis
titleSuffix: Foundry Tools
description: Learn about background removal, an operation of Image Analysis
author: PatrickFarley
manager: mcleans

ms.service: azure-vision-foundry-tools
ms.topic: concept-article
ms.date: 03/31/2026
ai-usage: ai-assisted
ms.author: pafarley
---

# Background removal (version 4.0 preview)


> **Important:**
> This feature is now retired. On March 31, 2025, the Azure AI Image Analysis 4.0 Segment API and background removal service were retired. API calls to these services will fail.
>
> The segmentation feature of the open-source [Florence 2 model](https://huggingface.co/microsoft/Florence-2-large) might meet your needs. It returns an alpha map marking the difference between foreground and background, but it doesn't edit the original image to remove the background. Install the Florence 2 model and try out its Region to segmentation feature.
>
> For full-featured background removal, consider a third-party utility like [BiRefNet](https://github.com/ZhengPeng7/BiRefNet).

The Background removal operation can divide images into multiple segments or regions to help the user identify different objects or parts of the image. Background removal creates an alpha matte that separates the foreground object from the background in an image. This service is currently in preview, and the API might change in the future.


> 
> [Call the Background removal API](how-to/background-removal.md)

This feature provides two possible outputs based on the customer's needs:

- The foreground object of the image without the background. This edited image shows the foreground object and makes the background transparent, allowing the foreground to be placed on a new background. 
- An alpha matte that shows the opacity of the detected foreground object. This matte can be used to separate the foreground object from the background for further processing.

> **Important:**
> Background removal is only available in certain Azure regions. See [Region availability](overview-image-analysis.md#region-availability). 

## Background removal examples

The following example images illustrate what the Image Analysis service returns when removing the background of an image and creating an alpha matte. 


| Original image | With background removed | Alpha matte |
| :---: | :---: | :---: |
| Photo of a city near water. | Photo of a city near water; sky is transparent. | Alpha matte of a city skyline. |
| Photo of a group of people using a tablet. | Photo of a group of people using a tablet; background is transparent. | Alpha matte of a group of people. |
| Photo of a group of bears in the woods. | Photo of a group of bears; background is transparent. | Alpha matte of a group of bears. |


## Limitations

It's important to note the limitations of background removal:

* Background removal works best for categories such as people and animals, buildings and environmental structures, furniture, vehicles, food, text and graphics, and personal belongings.
* Objects that aren't prominent in the foreground may not be identified as part of the foreground.
* Images with thin and detailed structures, like hair or fur, may show some artifacts when overlaid on backgrounds with strong contrast to the original background.
* The latency of the background removal operation will be higher, up to several seconds, for large images. We suggest you experiment with integrating both modes into your workflow to find the best usage for your needs (for instance, calling background removal on the original image versus calling foreground matting on a downsampled version of the image, then resizing the alpha matte to the original size and applying it to the original image).

## Use the API

The background removal feature is available through the [Segment](https://learn.microsoft.com/rest/api/computervision/image-analysis/segment?tabs=HTTP) API (`imageanalysis:segment`). See the [Background removal how-to guide](how-to/background-removal.md) for more information.

## Next step

> 
> [Call the background removal API](how-to/background-removal.md)
