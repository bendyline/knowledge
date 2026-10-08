---
title: include file
description: include file
author: spelluru
ms.service: azure-stream-analytics
ms.topic: include
ms.date: 07/10/2023
ms.author: spelluru
ms.custom: "include file"

---



| Dimension | Definition |
| --- | --- |
| **Logical Name** | The input or output name for a Stream Analytics job. |
| **Partition ID** | The ID of the input data partition from an input source. For example, if the input source is an event hub, the partition ID is the event hub's partition ID. For embarrassingly parallel jobs, **Partition ID** in the output is the same as it is in the input. |
| **Node Name** | The identifier of a streaming node that's provisioned when your job runs. A streaming node represents the amount of compute and memory resources allocated to your job. |

Screenshot of a chart that shows the area for selecting a dimension for Stream Analytics job metrics.

Screenshot that shows splitting a metric by dimension.

Screenshot that shows filtering a metric by dimension.
