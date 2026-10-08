---
 title: Create a topic and three subscriptions
 description: Provides instructions to create a topic and three subscriptions to the topic. 
 author: spelluru
 ms.service: azure-service-bus
 ms.topic: include
 ms.date: 02/13/2026
 ms.author: spelluru
 ms.custom: include file
---

## Create a topic by using the Azure portal

1. On the **Service Bus Namespace** page, expand **Entities** on the navigational menu to the left, and select **Topics**.
1. Select **+ Topic**. 
1. Enter a **name** for the topic. Leave the other options with their default values.
1. Select **Create**.

   Screenshot of the Create topic page.

## Create subscriptions to the topic

1. Select the **topic** that you created in the previous section. 
    
   Screenshot of the Topics page with your topic selected.

1. On the **Service Bus Topic** page, select **+ Subscription**. 

    Screenshot of the Subscriptions page with the Add subscription button selected.

1. On the **Create subscription** page, follow these steps:

   1. Enter *S1* as the name of the subscription.
   1. Select **Create** to create the subscription. 

      Screenshot of the Create subscription page.

1. Repeat the previous step twice to create subscriptions named *S2* and *S3*.
