---
title: Use Responsible AI scorecard (preview) in Azure Machine Learning
titleSuffix: Azure Machine Learning
description: Share insights with nontechnical business stakeholders by exporting a PDF Responsible AI scorecard from Azure Machine Learning.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: responsible-ai
ms.topic:  how-to
ms.author: lagayhar
author: lgayhardt
ms.reviewer: mesameki
ms.date: 03/20/2026
ms.custom: responsible-ml, dev-focus
ai-usage: ai-assisted
---

# Use Responsible AI scorecard (preview) in Azure Machine Learning


**APPLIES TO:**



An Azure Machine Learning Responsible AI scorecard is a PDF report that's generated based on Responsible AI dashboard insights and customizations to accompany your machine learning models. You can easily configure, download, and share your PDF scorecard with your technical and nontechnical stakeholders to educate them about your data and model health and compliance, and to help build trust. You can also use the scorecard in audit reviews to inform stakeholders about the characteristics of your model.


> **Important:**
> This feature is currently in public preview. This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or might have constrained capabilities.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


## Prerequisites

- An Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- 
An Azure Machine Learning workspace and compute instance.  Complete [Create resources you need to get started](quickstart-create-resources.md) to create them both.

- A registered model with a generated Responsible AI dashboard and scorecard. To create one, see [Generate Responsible AI insights in the studio UI](how-to-responsible-ai-insights-ui.md) or [Generate Responsible AI insights with YAML and Python](how-to-responsible-ai-insights-sdk-cli.md).

## Where to find your Responsible AI scorecard

 Responsible AI scorecards link to your Responsible AI dashboards. To view your Responsible AI scorecard, go into your model registry by selecting the **Model** in Azure Machine Learning studio. Then select the registered model that you generated a Responsible AI dashboard and scorecard for. After you select your model, select the **Responsible AI** tab to view a list of generated dashboards. Select which dashboard you want to export a Responsible AI scorecard PDF for by selecting **Responsible AI Insights** then **View all PDF scorecards**.
 Responsible AI scorecards link to your Responsible AI dashboards. To view your Responsible AI scorecard, go into your model registry by selecting the **Model** in Azure Machine Learning studio. Then select the registered model that you generated a Responsible AI dashboard and scorecard for. After you select your model, select the **Responsible AI** tab to view a list of generated dashboards. Select which dashboard you want to export a Responsible AI scorecard PDF for by selecting **Responsible AI Insights** then **View all PDF scorecards**.

Screenshot of the Responsible AI (preview) pane in Azure Machine Learning studio, with the Responsible AI scorecard (preview) tab highlighted.

1. Select **Responsible AI scorecard (preview)** to display a list of all Responsible AI scorecards that are generated for this dashboard.

   Screenshot of Responsible AI scorecard dropdown.

1. In the list, select the scorecard you want to download, and then select **Download** to download the PDF to your machine.

   Screenshot of the Responsible AI scorecards pane for selecting a scorecard to download.

## How to read your Responsible AI scorecard

The Responsible AI scorecard is a PDF summary of key insights from your Responsible AI dashboard. The first summary segment of the scorecard gives you an overview of the machine learning model and the key target values you set to help your stakeholders determine whether the model is ready to be deployed:

Screenshot of the model summary on the Responsible AI scorecard PDF.

The data analysis segment shows you characteristics of your data, because any model story is incomplete without a correct understanding of your data:

Screenshot of the data analysis on the Responsible AI scorecard PDF.

The model performance segment displays your model's most important metrics and characteristics of your predictions and how well they satisfy your desired target values:

Screenshot of the model performance on the Responsible AI scorecard PDF.

Next, you can view the top performing and worst performing data cohorts and subgroups that the scorecard automatically extracts so you can see the uncertainties of your model:

Screenshot of data cohorts and subgroups on the Responsible AI scorecard PDF.

You can see the top important factors that affect your model predictions, which is a requirement to build trust with how your model is performing its task:

Screenshot of the top important factors on the Responsible AI scorecard PDF.

You can further see your model fairness insights summarized and inspect how well your model is satisfying the fairness target values you set for your desired sensitive groups:

Screenshot of the fairness insights on the Responsible AI scorecard PDF.

Finally, you can see your dataset's causal insights summarized, which can help you determine whether your identified factors or treatments have any causal effect on the real-world outcome:

Screenshot of the dataset's causal insights on the Responsible AI scorecard PDF.

## Next steps

- See the how-to guide for generating a Responsible AI dashboard via [CLI&nbsp;v2 and SDK&nbsp;v2](how-to-responsible-ai-insights-sdk-cli.md) or the [Azure Machine Learning studio UI](how-to-responsible-ai-insights-ui.md).
- Learn more about the [concepts and techniques behind the Responsible AI dashboard](concept-responsible-ai-dashboard.md).
- View [sample YAML and Python notebooks](https://aka.ms/RAIsamples) to generate a Responsible AI dashboard with YAML or Python.
- Learn about how the Responsible AI dashboard and scorecard were used by the UK National Health Service (NHS) in a [real-life customer story](https://aka.ms/NHSCustomerStory).
- Explore the [Responsible AI Toolbox](https://responsibleaitoolbox.ai/) open-source tools that power the Responsible AI dashboard.
