---
title: Set up an image labeling project
titleSuffix: Azure Machine Learning
description: Learn how to create a project to label images in the project. Enable machine learning-assisted labeling to help with the task.
author: s-polly
ms.author: scottpolly
ms.reviewer: soumyapatro
ms.service: azure-machine-learning
ms.subservice: mldata
ms.topic: how-to
ms.date: 01/27/2026
ms.custom: data4ml
monikerRange: 'azureml-api-1 || azureml-api-2'
# Customer intent: As a project manager, I want to set up a project to label images in the project. I want to enable machine learning-assisted labeling to help with the task.
---

# Set up an image labeling project


> **Warning:**
> On September 30, 2026, **Azure Machine Learning data labeling** will be retired. Transition to third-party data labeling providers by September 30, 2026. 
>
> Until September 30, 2026, you can continue to use data labeling without disruption. On September 30, 2026, workloads running data labeling will be deleted and associated application data will be lost.  
>
> **Recommended action:**   To avoid service disruptions, migrate existing data labeling workloads to third-party providers. When you generate labeled data, copy the labeled data into an Azure Machine Learning storage account for further preprocessing or model training as required. 

Learn how to create and run data labeling projects to label images in Azure Machine Learning. Use machine learning (ML)-assisted data labeling or human-in-the-loop labeling to help with the task.

Set up labels for classification, object detection (bounding box), instance segmentation (polygon), or semantic segmentation (preview).

You can also use the data labeling tool in Azure Machine Learning to [create a text labeling project](how-to-create-text-labeling-projects.md).


> **Important:**
>
> Items marked (preview) in this article are currently in public preview.
> The preview version is provided without a service level agreement, and it's not recommended for production workloads. Certain features might not be supported or might have constrained capabilities.
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


## Image labeling capabilities

Azure Machine Learning data labeling is a tool you can use to create, manage, and monitor data labeling projects. Use it to:

- Coordinate data, labels, and team members to efficiently manage the labeling tasks.
- Track progress and maintain the queue of incomplete labeling tasks.
- Start and stop the project, and control the labeling progress.
- Review and export the labeled data as an Azure Machine Learning dataset.

> **Important:**
> The data images you work with in the Azure Machine Learning data labeling tool must be available in an Azure Blob Storage datastore. If you don't have an existing datastore, you can upload your data files to a new datastore when you create a project.

Image data can be any file that has one of these file extensions:

- `.jpg`
- `.jpeg`
- `.png`
- `.jpe`
- `.jfif`
- `.bmp`
- `.tif`
- `.tiff`
- `.dcm`
- `.dicom`

Each file is an item to label.

You can also use an `MLTable` data asset as input to an image labeling project, as long as the images in the table are one of the above formats. For more information, see [How to use `MLTable` data assets](how-to-mltable.md).

## Prerequisites

Use the following items to set up image labeling in Azure Machine Learning:


- The data that you want to label, either in local files or in Azure Blob Storage.
- The set of labels that you want to apply.
- The instructions for labeling.
- An Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- An Azure Machine Learning workspace. See [Create an Azure Machine Learning workspace](how-to-manage-workspace.md).

## Create an image labeling project


Labeling projects are administered in Azure Machine Learning. Use the **Data Labeling** page in Machine Learning to manage your projects.

If your data is already in Azure Blob Storage, make sure that it's available as a datastore before you create the labeling project.



1. Select **Add project** to create a project.

1. Enter a name for the project in **Project name**.

   You can't reuse the project name, even if you delete the project.

1. Select **Image** for **Media type** to create an image labeling project.

1. Select an option for your scenario for **Labeling task type**:

    * To apply only a *single label* to an image from a set of labels, select **Image Classification Multi-class**.
    * To apply *one or more* labels to an image from a set of labels, select **Image Classification Multi-label**. For example, a photo of a dog might be labeled with both *dog* and *daytime*.
    * To assign a label to each object within an image and add bounding boxes, select **Object Identification (Bounding Box)**.
    * To assign a label to each object within an image and draw a polygon around each object, select **Polygon (Instance Segmentation)**.
    * To draw masks on an image and assign a label class at the pixel level, select **Semantic Segmentation (Preview)**.

    Screenshot that shows creating a labeling project to manage the labeling task.

1. Select **Next** to continue.

## Add workforce (optional)


Select **Use a vendor labeling company from Azure Marketplace** only if you've engaged a data labeling company from [Azure Marketplace](https://azuremarketplace.microsoft.com/marketplace/consulting-services?page=1&search=AzureMLVend). Then select the vendor. If your vendor doesn't appear in the list, clear this option.

Make sure that you first contact the vendor and sign a contract. For more information, see [Work with a data labeling vendor company (preview)](how-to-outsource-data-labeling.md).

Select **Next** to continue.

## Specify the data to label

If you already created a dataset that contains your data, select the dataset in the **Select an existing dataset** dropdown.

You can also select **Create a dataset** to use an existing Azure datastore or to upload local files.

> **Note:**
> A project can't contain more than 500,000 files. If your dataset exceeds this file count, only the first 500,000 files are loaded.

### Data column mapping (preview)

If you select an MLTable data asset, another **Data Column Mapping** step appears for you to specify the column that contains the image URLs.  


You must specify a column that maps to the **Image** field. You can also optionally map other columns that are present in the data. For example, if your data contains a **Label** column, you can map it to the **Category** field. If your data contains a **Confidence** column, you can map it to the **Confidence** field.

If you're importing labels from a previous project, the labels must be in the same format as the labels you're creating. For example, if you're creating bounding box labels, the labels you import must also be bounding box labels.

### Import options (preview)

 When you include a **Category** column in the  **Data Column Mapping** step, use **Import Options** to specify how to treat the labeled data.


You must specify a column that maps to the **Image** field. You can also optionally map other columns that are present in the data. For example, if your data contains a **Label** column, you can map it to the **Category** field. If your data contains a **Confidence** column, you can map it to the **Confidence** field.

If you're importing labels from a previous project, the labels must be in the same format as the labels you're creating. For example, if you're creating bounding box labels, the labels you import must also be bounding box labels.

### Create a dataset from an Azure datastore

In many cases, you can upload local files. However, [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/) provides a faster and more robust way to transfer a large amount of data. Use Storage Explorer as the default way to move files.

To create a dataset from data that's already stored in Blob Storage:

1. Select **Create**.
1. For **Name**, enter a name for your dataset. Optionally, enter a description.
1. Ensure that **Dataset type** is set to **File**. Only file dataset types are supported for images.
1. Select **Next**.
1. Select **From Azure storage**, and then select **Next**.
1. Select the datastore, and then select **Next**.
1. If your data is in a subfolder within Blob Storage, choose **Browse** to select the path.
    * To include all the files in the subfolders of the selected path, append `/**` to the path.
    * To include all the data in the current container and its subfolders, append `**/*.*` to the path.
1. Select **Create**.
1. Select the data asset you created.

### Create a dataset from uploaded data

To directly upload your data:

1. Select **Create**.
1. For **Name**, enter a name for your dataset. Optionally, enter a description.
1. Ensure that **Dataset type** is set to **File**. Only file dataset types are supported for images.
1. Select **Next**.
1. Select **From local files**, and then select **Next**.
1. (Optional) Select a datastore. You can also leave the default to upload to the default blob store (*workspaceblobstore*) for your Machine Learning workspace.
1. Select **Next**.
1. Select **Upload** > **Upload files** or **Upload** > **Upload folder** to select the local files or folders to upload.
1. In the browser window, find your files or folders, and then select **Open**.
1. Continue to select **Upload** until you specify all your files and folders.
1. Optionally, you can choose to select the **Overwrite if already exists** checkbox. Verify the list of files and folders.
1. Select **Next**.
1. Confirm the details. Select **Back** to modify the settings or select **Create** to create the dataset.
1. Finally, select the data asset you created.

## Configure incremental refresh


If you plan to add new data files to your dataset, use incremental refresh to add the files to your project.   

When **Enable incremental refresh at regular intervals** is set, the dataset is checked periodically for new files to be added to a project based on the labeling completion rate. The check for new data stops when the project contains the maximum 500,000 files.

Select **Enable incremental refresh at regular intervals** when you want your project to continually monitor for new data in the datastore. 

Clear the selection if you don't want new files in the datastore to automatically be added to your project.

> **Important:**
> When incremental refresh is enabled, don't create a new version for the dataset you want to update. If you do, the updates won't be seen because the data labeling project is pinned to the initial version. Instead, use [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/) to modify your data in the appropriate folder in Blob Storage.
>
> Also, don't remove data. Removing data from the dataset your project uses causes an error in the project. 

After the project is created, use the [**Details**](how-to-manage-labeling-projects.md#change-project-details) tab to change incremental refresh, view the time stamp for the last refresh, and request an immediate refresh of data.

## Specify label classes


On the **Label categories** page, specify a set of classes to categorize your data.

Your labelers' accuracy and speed are affected by their ability to choose among classes. For instance, instead of spelling out the full genus and species for plants or animals, use a field code or abbreviate the genus.

You can use either a flat list or create groups of labels.  

* To create a flat list, select **Add label category** to create each label.

    Screenshot that shows how to add a flat structure of labels.

* To create labels in different groups, select **Add label category** to create the top-level labels. Then select the plus sign (**+**) under each top level to create the next level of labels for that category. You can create up to six levels for any grouping.
    
    Screenshot that shows how to add groups of labels.

You can select labels at any level during the tagging process. For example, the labels `Animal`, `Animal/Cat`,  `Animal/Dog`, `Color`, `Color/Black`, `Color/White`, and `Color/Silver` are all available choices for a label. In a multi-label project, there's no requirement to pick one of each category. If that is your intent, make sure to include this information in your instructions.

## Describe the image labeling task


It's important to clearly explain the labeling task. On the **Labeling instructions** page, you can add a link to an external site that has labeling instructions, or you can provide instructions in the edit box on the page. Keep the instructions task-oriented and appropriate to the audience. Consider these questions:

* What are the labels labelers will see, and how will they choose among them? Is there a reference text to refer to?
* What should they do if no label seems appropriate?
* What should they do if multiple labels seem appropriate?
* What confidence threshold should they apply to a label? Do you want the labeler's best guess if they aren't certain?
* What should they do with partially occluded or overlapping objects of interest?
* What should they do if an object of interest is clipped by the edge of the image?
* What should they do if they think they made a mistake after they submit a label?
* What should they do if they discover image quality issues, including poor lighting conditions, reflections, loss of focus, undesired background included, abnormal camera angles, and so on?
* What should they do if multiple reviewers have different opinions about applying a label?

For bounding boxes, important questions include:

* How do you define the bounding box for this task? Should it stay entirely on the interior of the object or should it be on the exterior? Should it be cropped as closely as possible, or is some clearance acceptable?
* What level of care and consistency do you expect the labelers to apply in defining bounding boxes?
* What is the visual definition of each label class? Can you provide a list of normal, edge, and counter cases for each class?
* What should the labelers do if the object is tiny? Should they label it as an object or should they ignore that object as background?
* How should labelers handle an object that's only partially shown in the image?
* How should labelers handle an object that's partially covered by another object?
* How should labelers handle an object that has no clear boundary?
* How should labelers handle an object that isn't the object class of interest but has visual similarities to a relevant object type?

> **Note:**
> Labelers can select the first nine labels by using number keys 1 through 9. You might want to include this information in your instructions.

## Quality control (preview)


To get more accurate labels, use the **Quality control** page to send each item to multiple labelers.

> **Important:**
> Consensus labeling is currently in public preview.
>
> The preview version is provided without a service level agreement, and it's not recommended for production workloads. Certain features might not be supported or might have constrained capabilities.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).

To have each item sent to multiple labelers, select **Enable consensus labeling (preview)**. Then set values for **Minimum labelers** and **Maximum labelers** to specify how many labelers to use.  Make sure that you have as many labelers available as your maximum number. You *can't* change these settings after the project has started.

If a consensus is reached from the minimum number of labelers, the item is labeled. If a consensus isn't reached, the item is sent to more labelers. If there's no consensus after the item goes to the maximum number of labelers, its status is **Needs Review**, and the project owner is responsible for labeling the item.


> **Note:**
> **Instance Segmentation** projects can't use consensus labeling.

## Use ML-assisted data labeling

To speed up labeling tasks, use the **ML assisted labeling** page to start automatic machine learning models. Medical images (files with a `.dcm` extension) aren't included in assisted labeling. If the project type is **Semantic Segmentation (Preview)**, ML-assisted labeling isn't available.

At the start of your labeling project, the system shuffles the items into a random order to reduce potential bias. However, the trained model reflects any biases that are present in the dataset. For example, if 80% of your items are of a single class, then approximately 80% of the data used to train the model belongs to that class.

To enable assisted labeling, select **Enable ML assisted labeling** and specify a GPU. If you don't have a GPU in your workspace, the service creates a GPU cluster (resource name: DefLabelNC6v3, vmsize: Standard_NC6s_v3) and adds it to your workspace. The cluster is created with a minimum of zero nodes, which means it costs nothing when not in use.

ML-assisted labeling consists of two phases:

* Clustering
* Prelabeling

The labeled data item count needed to start assisted labeling isn't a fixed number. This number can vary significantly from one labeling project to another. For some projects, it's sometimes possible to see prelabel or cluster tasks after 300 items are manually labeled. ML-assisted labeling uses a technique called *transfer learning*. Transfer learning uses a pretrained model to jump-start the training process. If the classes of your dataset resemble the classes in the pretrained model, prelabels might become available after only a few hundred manually labeled items. If your dataset significantly differs from the data that's used to pretrain the model, the process might take more time.

When you use consensus labeling, the training uses the consensus label.

Because the final labels still rely on input from the labeler, this technology is sometimes called *human-in-the-loop* labeling.

> **Note:**
> ML-assisted data labeling doesn't support default storage accounts that are secured behind a [virtual network](how-to-network-security-overview.md). You must use a non-default storage account for ML-assisted data labeling. You can secure the non-default storage account behind the virtual network.

### Clustering

After you submit some labels, the classification model starts to group together similar items. The model presents these similar images to labelers on the same page to help make manual tagging more efficient. Clustering is especially useful when a labeler views a grid of four, six, or nine images.

After a machine learning model trains on your manually labeled data, the model is truncated to its last fully connected layer. The process called *embedding* or *featurization* passes unlabeled images through the truncated model. This process embeds each image in a high-dimensional space that the model layer defines. Other images in the space that are nearest the image are used for clustering tasks.

The clustering phase doesn't appear for object detection models or text classification.

### Prelabeling

After you submit enough labels for training, either a classification model predicts tags, or an object detection model predicts bounding boxes. The labeler now sees pages that contain predicted labels already present on each item. For object detection, predicted boxes are also shown. The task involves reviewing these predictions and correcting any incorrectly labeled images before page submission.

After a machine learning model trains on your manually labeled data, it evaluates the model on a test set of manually labeled items. The evaluation helps determine the model's accuracy at different confidence thresholds. The evaluation process sets a confidence threshold beyond which the model is accurate enough to show prelabels. The model is then evaluated against unlabeled data. Items with predictions that are more confident than the threshold are used for prelabeling.

## Initialize the image labeling project


After the labeling project is initialized, some aspects of the  project are immutable. You can't change the task type or dataset. You *can* modify labels and the URL for the task description. Carefully review the settings before you create the project. After you submit the project, you return to the **Data Labeling** overview page, which shows the project as **Initializing**.

> **Note:**
> The overview page might not automatically refresh. After a pause, manually refresh the page to see the project's status as **Created**.


## Troubleshooting


For problems creating a project or accessing data, see [Troubleshoot data labeling](how-to-troubleshoot-data-labeling.md).


## Related content

* [Manage labeling projects](how-to-manage-labeling-projects.md)
* [How to tag images](how-to-label-data.md)
