---
title: Quickstart - Get started with Azure Digital Twins Explorer
titleSuffix: Azure Digital Twins
description: Learn how to use Azure Digital Twins Explorer by following this demo, where you use models to instantiate twins and interact with the twin graph.
author: baanders
ms.author: baanders
ms.date: 2/27/2025
ms.topic: quickstart
ms.service: azure-digital-twins
ms.custom: mode-other
---

# Quickstart - Get started with a sample scenario in Azure Digital Twins Explorer

This quickstart is an introduction to Azure Digital Twins, showing how Azure Digital Twins represents data and demonstrating what it's like to interact with a digital twin graph of a physical building. You use the [Azure portal site](https://portal.azure.com) and the [Azure Digital Twins Explorer](concepts-azure-digital-twins-explorer.md), which is a tool for visualizing and interacting with Azure Digital Twins data in a web browser.

In this quickstart, you look at prebuilt sample **models** that digitally define the concepts of a *Building*, a *Floor*, and a *Room*, and use these model definitions to create **digital twins** that represent specific floors and rooms from a physical building. These individual twins are connected into a virtual **twin graph** that reflects their relationships to each other, forming a complete digital representation of the sample building. The graph you're working with represents a building that contains two floors, and each floor contains rooms. The graph looks like this image:

Screenshot of a graph made of four circular nodes connected by arrows in Azure Digital Twins Explorer.

Here are the steps you use to explore the graph in this article:

1. Create an Azure Digital Twins instance, and open it in Azure Digital Twins Explorer.
1. Upload prebuilt models and graph data to construct the sample scenario. Add one more twin manually.
1. Simulate changing IoT data, and query the graph to see results.
1. Review your learnings from the experience.

>**Note:**
>For simplicity, this quickstart doesn't cover setting up a live data flow from IoT devices inside the modeled environment, or from other data sources. To set up a simulated end-to-end data flow that drives your twin graph, move ahead to the tutorials: [Connect an end-to-end solution](tutorial-end-to-end.md). For more information on data flow between services and integrating Azure Digital Twins into a wider IoT solution, see [Data ingress and egress](concepts-data-ingress-egress.md).

## Prerequisites

You need an Azure subscription to complete this quickstart. If you don't have one already, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) now.

You also need to download the materials for the sample graph used in the quickstart. Use the following instructions to download the required files. Later, you follow more instructions to upload them to Azure Digital Twins.
* Model files: Navigate to each following link, right-click anywhere on the screen, and select **Save as** in your browser's right-click menu. Use the Save As window to save the file somewhere on your machine.
    - [Building.json](https://raw.githubusercontent.com/Azure-Samples/digital-twins-explorer/main/client/examples/Building.json): This model file digitally defines a building. It specifies that buildings can contain floors.
    - [Floor.json](https://raw.githubusercontent.com/Azure-Samples/digital-twins-explorer/main/client/examples/Floor.json): This model file digitally defines a floor. It specifies that floors can contain rooms.
    - [Room.json](https://raw.githubusercontent.com/Azure-Samples/digital-twins-explorer/main/client/examples/Room.json): This model file digitally defines a room. It has a temperature property.
* [buildingScenario.xlsx](https://github.com/Azure-Samples/digital-twins-explorer/raw/main/client/examples/buildingScenario.xlsx): This spreadsheet contains the data for a sample twin graph, including five digital twins representing a specific building with floors and rooms. The twins are based off the generic models, and connected with relationships indicating which elements contain each other. Depending on your browser settings, selecting this link might download the *buildingScenario.xlsx* file automatically to your default download location, or it might open the file in your browser with an option to download. Here's what that download option looks like in Microsoft Edge:

    Screenshot of the buildingScenario.xlsx file viewed in a Microsoft Edge browser. A button saying Download is highlighted.

>**Tip:**
> These files are from the [Azure Digital Twins Explorer repository in GitHub](https://github.com/Azure-Samples/digital-twins-explorer). You can visit the repo for other sample files, explorer code, and more.

## Set up Azure Digital Twins

The first step in working with Azure Digital Twins is to create an Azure Digital Twins instance that holds all your graph data. In this section, you create an instance of the service, and open it in Azure Digital Twins Explorer.

### Create an Azure Digital Twins instance


In this section, you create a new instance of Azure Digital Twins using the [Azure portal](https://portal.azure.com/). Navigate to the portal and sign in with your credentials.

1. Once in the portal, start by selecting **Create a resource** in the Azure services home page menu.

    Screenshot of the Azure portal, highlighting the 'Create a resource' icon from the home page.

2. Search for *Azure Digital Twins* in the search box, and choose the **Azure Digital Twins** service from the results. 
    
    Leave the **Plan** field set to **Azure Digital Twins** and select the **Create** button to start creating a new instance of the service.

    Screenshot of the Azure portal, highlighting the 'Create' button from the Azure Digital Twins service page.

3. Fill in the fields on the **Basics** tab of setup, including your subscription, resource group, a resource name for your new instance, and region. Check the **Assign Azure Digital Twins Data Owner Role** box to give yourself permissions to manage data in the instance.

    Screenshot of the Create Resource process for Azure Digital Twins in the Azure portal. The described values are filled in.

    >**Note:**
    > If the **Assign Azure Digital Twins Data Owner Role** box is greyed out, you don't have permissions in your Azure subscription to manage user access to resources. You can continue creating the instance in this section, and then have someone with the necessary permissions [assign you this role on the instance](how-to-set-up-instance-portal.md#assign-the-role-using-azure-identity-management-iam) before completing the rest of this quickstart.
    >
    > Common roles that meet this requirement are **Owner**, **Account admin**, or the combination of **User Access Administrator** and **Contributor**.  

4. Select **Review + create** to finish creating your instance.
    
5. You see a summary page showing the details you entered. Confirm and create the instance by selecting **Create**.

This action takes you to an **Overview** page tracking the deployment status of the instance.

Screenshot of the deployment page for Azure Digital Twins in the Azure portal. The page indicates that deployment is in progress.

Wait for the page to say that your deployment is complete.

### Open instance in Azure Digital Twins Explorer

After deployment completes, use the **Go to resource** button to navigate to the instance's Overview page in the portal.

Screenshot of the deployment page for Azure Digital Twins in the Azure portal. The page indicates that deployment is complete.


Next, select the **Open Azure Digital Twins Explorer (preview)** button.

Screenshot of the Azure portal showing the Overview page for an Azure Digital Twins instance. There's a highlight around the Open Azure Digital Twins Explorer (preview) button.

This action opens Azure Digital Twins Explorer in a new tab. If this is your first time using the Explorer, you see a welcome modal summarizing its key features.

Azure Digital Twins Explorer might automatically connect to your instance. If not, you see the following screen asking you to specify an Azure Digital Twins URL. (If you don't see this box on your screen, Azure Digital Twins Explorer completed this step automatically.)

Screenshot of Azure Digital Twins Explorer. The Azure Digital Twins URL modal displays an empty editable box for the Azure Digital Twins URL.

If you see this box, enter *https://* into the field, followed by the host name of your instance (this value can be found back on the instance's **Overview** page in the portal). These values together make up the instance URL. Select **Save** to connect to your instance.


>**Important:**
> Azure Digital Twins Explorer **does not support** private endpoints. If you want to use Azure Digital Twins Explorer with an Azure Digital Twins instance that uses [Private Link](concepts-security.md#private-network-access-with-azure-private-link) to disable public access, you can deploy the Azure Digital Twins Explorer codebase privately in the cloud. For instructions on how to do this, see [Azure Digital Twins Explorer: Running in the cloud](https://github.com/Azure-Samples/digital-twins-explorer#running-in-the-cloud).

## Build out the sample scenario

Next, you use Azure Digital Twins Explorer to set up the sample models and twin graph. You start by importing the model files and the twin graph file that you downloaded to your machine in the [Prerequisites](#prerequisites) section. Then, you finish the scenario by creating one more twin manually.

### Models

The first step in creating an Azure Digital Twins graph is to define the vocabulary for your environment. *Models* are generic definitions for each type of entity that exists in your environment. This sample building scenario contains a building, floors, and rooms. Therefore, you need one model definition describing what a *Building* is, one model definition describing what a *Floor* is, and one model definition describing what a *Room* is. Later, you can create *digital twins* that are instances of these models, representing specific buildings, floors, and rooms. 

Models for Azure Digital Twins are written in *Digital Twin Definition Language (DTDL)*, a data object language similar to [JSON-LD](https://json-ld.org/). Each model describes a single type of entity in terms of its properties, relationships, and components.
 
For this quickstart, the model files are written for you. You downloaded *Building.json*, *Floor.json*, and *Room.json* in the [Prerequisites](#prerequisites) section, and now you upload them to your Azure Digital Twins instance using Azure Digital Twins Explorer.

#### Upload the models (.json files)

In Azure Digital Twins Explorer, follow these steps to upload the *Building*, *Floor*, and *Room* models (the *.json* files you downloaded earlier).

1. In the **Models** panel, select the **Upload a Model** icon that shows an arrow pointing upwards.

   Screenshot of the Azure Digital Twins Explorer, highlighting the Models panel and the 'Upload a Model' icon in it.
 
1. In the Open window that appears, navigate to the folder containing the downloaded *.json* files on your machine.
1. Select *Building.json*, *Floor.json*, and *Room.json*, and select **Open** to upload them all at once. 

Azure Digital Twins Explorer uploads these model files to your Azure Digital Twins instance. They should show up in the **Models** panel and display their friendly names and full model IDs. 

You can select **View Model** from any of the models' options to see the DTDL code that defines each model type.

Screenshot of the Azure Digital Twins Explorer showing the Models panel with three model definitions listed inside: Building, Floor, and Room.

### Twins and the twin graph

Now that some model definitions are uploaded to your Azure Digital Twins instance, you can use these definitions to create *digital twins* for the elements in your environment.

Every digital twin in your solution represents an entity from the physical environment. You can create many twins based on the same model type, like multiple room twins that all use the *Room* model. In this quickstart, you need a digital twin for the building, and a digital twin for each floor and room in the building. The twins are connected with relationships into a *twin graph* that represents the full building environment.

In this section, you upload a precreated graph containing a building twin, two floor twins, and two room twins.

#### Import the graph (.xlsx file)

In Azure Digital Twins Explorer, follow these steps to import the sample graph (the *.xlsx* file you downloaded earlier).

1. In the **Twin Graph** panel, select the **Import Graph** icon that shows an arrow pointing into a cloud.

   Screenshot of Azure Digital Twins Explorer Twin Graph panel. The Import Graph button is highlighted.

2. In the Open window, navigate to the *buildingScenario.xlsx* file you downloaded earlier. This file contains twin and relationship data for the sample graph. Select **Open**.

   After a few seconds, Azure Digital Twins Explorer opens an **Import** view that shows a preview of the graph to be loaded.

3. To finish importing the graph, select the **Save** icon in the upper-right corner of the graph preview panel.

    Screenshot of the Azure Digital Twins Explorer highlighting the Save icon in the Graph Preview pane.

4. Azure Digital Twins Explorer uses the uploaded file to create the requested twins and relationships between them. Make sure you see the following dialog box indicating that the import was successful before moving on.

    Screenshot of the Azure Digital Twins Explorer showing a dialog box indicating graph import success.

    Select **Close**.

    The graph is now uploaded to Azure Digital Twins Explorer, and the **Twin Graph** panel reloads. It appears empty.
 
6. To see the graph, select the **Run Query** button in the **Query Explorer** panel, near the top of the Azure Digital Twins Explorer window.

   Screenshot of the Azure Digital Twins Explorer highlighting the 'Run Query' button in the upper-right corner of the window.

This action runs the default query to select and display all digital twins. Azure Digital Twins Explorer retrieves all twins and relationships from the service. It draws the graph defined by them in the **Twin Graph** panel. Now you can see the uploaded graph of the sample scenario.

Screenshot of Azure Digital Twins Explorer showing the uploaded graph.'

The circles (graph "nodes") represent digital twins. The lines represent relationships. The BuildingA twin "contains" the Floor0 and Floor1 twins, the Floor0 twin "contains" Room0, and the Floor1 twin "contains" Room1. If you're using a mouse, you can click and drag in the graph to move around elements.

#### Add another twin

You can continue to edit the structure of a digital twin graph after its creation. Imagine that another room was recently constructed on Floor1 of this example building. In this section, you add a new twin to the graph to represent the new room.

Start by selecting the model that defines the type of twin you want to create. In the **Models** panel on the left, open the options menu for the **Room** model. Select **Create a Twin** to create a new instance of this model type.

Screenshot of the Azure Digital Twins Explorer showing the Models panel, and the option to Create a Twin from the Room model.

Enter *Room2* for the **New Twin name** and select **Save**. This action creates a new digital twin, which isn't yet connected by relationships to the rest of the graph.

Next, you add a relationship to show that Floor1 contains Room2. Use the CTRL/CMD or SHIFT keys to simultaneously select Floor1 and Room2 in the graph. When both twins are selected, right-click Room2 and choose **Add relationships**.

Screenshot of the Azure Digital Twins Explorer, adding a relationship between Floor1 and Room2.

This action opens a **Create Relationship** dialog, prefilled with the details of a "contains" relationship from Floor1 to Room2. Select **Save**.

Screenshot of the Create Relationship options.

Now Room2 is connected in the graph. If you're using a mouse, you can click and drag twins in the graph to arrange them into a configuration that you like.

Screenshot of Azure Digital Twins Explorer showing the graph, which now includes Room2.'

### View twin properties

You can select a twin to see a list of its properties and their values in the **Twin Properties** panel.

Here are the properties of Room0. Notice that Room0 has a temperature of 70.

Screenshot of the Azure Digital Twins Explorer highlighting the Twin Properties panel, which shows \$dtId, Temperature, and Humidity properties for Room0.

Here are the properties of Room1. Notice that Room1 has a temperature of 80.

Screenshot of the Azure Digital Twins Explorer highlighting the Twin Properties panel, which shows \$dtId, Temperature, and Humidity properties for Room1.

Room2 doesn't have values set for its properties yet, since this twin was created manually. To set its property values, edit the fields so that humidity is 50, and temperature is 72. Select the **Save** icon. 

Screenshot of the Azure Digital Twins Explorer highlighting the Twin Properties panel, where Temperature and Humidity are being set for Room2.

## Query changing IoT data

In Azure Digital Twins, you can query your twin graph to answer questions about your environment, using the SQL-style *Azure Digital Twins query language*. One way to query the twins in your graph is by their properties. Querying based on properties can help answer questions about—or identify outliers in—your environment. In a fully connected, data-driven scenario, the properties of your twins change frequently in response to IoT data from the sensors in your environment, or other connected data sources. In this quickstart, you change the values manually to simulate a changing sensor reading.

Start by running a query to see how many twins in your environment have a temperature above 75. Run the following query in the **Query Explorer** panel.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/quickstart-azure-digital-twins-explorer.md)

Recall from viewing the twin properties earlier that Room0 has a temperature reading of 70, Room1 has a temperature reading of 80, and Room2 has a temperature reading of 72. The building and floor twins don't have a temperature property at all. For these reasons, only Room1 shows up in the results here.
    
Screenshot of the Azure Digital Twins Explorer showing the results of property query, which shows only Room1.

>**Tip:**
> Other comparison operators (<,>, =, or !=) are also supported in queries. You can try plugging these operators, different values, or different twin properties into the query to try out answering your own questions.

### Edit temperature data

In a fully connected Azure Digital Twins solution, the twins in your graph receive live updates from real IoT devices and other data sources, and update their properties automatically to stay synchronized with your real-world environment. For simplicity in this quickstart, you use Azure Digital Twins Explorer here to manually set the temperature reading of Room0 to 76.

First, rerun the following query to select all digital twins. This action displays the full graph again in the **Twin Graph** panel.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/quickstart-azure-digital-twins-explorer.md)

Select **Room0** to bring up its property list in the **Twin Properties** panel.

Change the temperature value from **70** to *76*, and select the **Save** icon to update the temperature.

Screenshot of the Azure Digital Twins Explorer highlighting that the Twin Properties panel is showing properties that can be edited for Room0.

After a successful property update, you'll see a **Patch Information** box showing the patch code that was used behind the scenes with the [Azure Digital Twins APIs](concepts-apis-sdks.md) to make the update.

Screenshot of the Azure Digital Twins Explorer showing Patch Information for the temperature update.

**Close** the patch information. 

### Query to see the new result

To see the new temperature for Room0 reflected in the graph, rerun the query from earlier to get all the twins in the environment with a temperature above 75.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/quickstart-azure-digital-twins-explorer.md)

Now that the temperature of Room0 changed from 70 to 76, both Room0 and Room1 should show up in the result.

Screenshot of the Azure Digital Twins Explorer showing the results of property query, which shows both Room0 and Room1.

## Review and contextualize learnings

In this quickstart, you created an Azure Digital Twins instance and used Azure Digital Twins Explorer to populate it with a sample scenario. You also added a digital twin manually.

Then, you explored the graph, including...

* Using a query to answer a question about the scenario.
* Editing a property on a digital twin.
* Running the query again to see how the answer changed as a result of your update.

The intent of this exercise is to demonstrate how you can use the Azure Digital Twins graph to answer questions about your environment, especially as IoT environments continue to change.

In this quickstart, you made the temperature update manually. It's common in Azure Digital Twins to connect digital twins to real IoT devices so that they receive updates automatically, based on device data. You can also [connect other data sources](concepts-data-ingress-egress.md#data-ingress), integrating data from different systems and defining your own logic for how twins are updated. In this way, you can build a live graph that always reflects the real state of your environment. You can use queries to get information about what's happening in your environment in real time.

You can also export Azure Digital Twins data to historical tracking, data analytics, and AI services to enable greater insights and perform environment simulations. Integrating Azure Digital Twins into your IoT solutions can help you more effectively track the past, control the present, and predict the future.

## Clean up resources

To clean up after this quickstart, choose which Azure Digital Twins resources you want to remove, based on what you want to do next.

* If you plan to continue through the Azure Digital Twins quickstarts and tutorials, you can reuse the instance in this quickstart for those articles, and you don't need to remove it.


* If you want to continue using the Azure Digital Twins instance from this article, but clear out **all** of its models, twins, and relationships, run the following [az dt job deletion](https://learn.microsoft.com/cli/azure/dt/job/deletion) CLI command: 

    ```azure-cli
    az dt job deletion create -n <name-of-Azure-Digital-Twins-instance> -y
    ```
    
    If you only want to delete **some** of these elements, you can use the [az dt twin relationship delete](https://learn.microsoft.com/cli/azure/dt/twin/relationship#az-dt-twin-relationship-delete), [az dt twin delete](https://learn.microsoft.com/cli/azure/dt/twin#az-dt-twin-delete), and [az dt model delete](https://learn.microsoft.com/cli/azure/dt/model#az-dt-model-delete) commands to selectively delete only the elements you want to remove.
 
* If you don't need your Azure Digital Twins instance anymore, you can delete it using the [Azure portal](https://portal.azure.com).
    
    Navigate back to the instance's **Overview** page in the portal. (If you closed that tab, you can find the instance again by searching for its name in the Azure portal search bar and selecting it from the search results.)

    Select **Delete** to delete the instance, including all of its models and twins.

    Screenshot of the Overview page for an Azure Digital Twins instance in the Azure portal. The Delete button is highlighted.

You might also want to delete the sample project files from your local machine.

## Next steps

Explore the tutorials to dive deeper into the SDKs, twin graph creation, and event flow setup.
* [Code a client app](tutorial-code.md)
* [Create a graph in Azure Digital Twins](tutorial-command-line-app.md)
* [Connect an end-to-end solution](tutorial-end-to-end.md)
