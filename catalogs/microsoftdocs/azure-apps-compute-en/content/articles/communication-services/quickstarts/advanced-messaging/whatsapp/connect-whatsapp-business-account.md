---
title: Register WhatsApp Business Account
titleSuffix: An Azure Communication Services article
description: Learn about Communication Service WhatsApp Business Accounts concepts.
author: darmour
manager: sundraman
services: azure-communication-services
ms.author: darmour
ms.date: 02/12/2024
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: advanced-messaging
---

# Register WhatsApp Business Account


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Get started with the Azure Communication Services Advanced Messaging, which extends messaging to users on WhatsApp. This feature enables your organization to send and receive messages with WhatsApp users using a WhatsApp Business Account. The Advanced Communication Messages SDK extends your communications to interact with the large global WhatsApp community for common scenarios:

- Receive inquiries from your customers for product feedback or support, price quotes, and reschedule appointments.
- Send your customer's notifications like appointment reminders, product discounts, transaction receipts, and one-time passcodes.

## Overview

This article describes how to register a WhatsApp Business Account with Azure Communication Services. The following video demonstrates this process.

> [!VIDEO https://learn-video.azurefd.net/vod/player?id=04c63978-6f27-4289-93d6-625d8569ee28]

## Prerequisites

- [Azure Communication Services resource](../../create-communication-resource.md)
- [Set-up Event Grid viewer](https://learn.microsoft.com/azure/event-grid/)
- [Set-up Event subscription for SMS received and SMS delivery events.](../../telephony/get-phone-number.md?tabs=windows&pivots=platform-azp)
- [Facebook account](https://www.facebook.com/index.php)
- Phone number using [Azure Communication Services phone number](../../telephony/get-phone-number.md?tabs=windows\&pivots=platform-azp) **or** bring your own phone number with the given capabilities:
    -  Able to send and receive SMS messages
    -  Phone number isn't associated with a WhatsApp Business Account
   
-  [Active Meta Business Account](https://www.facebook.com/business/tools/meta-business-suite)

## WhatsApp business account sign-up

To get started, you connect a new or existing WhatsApp Business Account with your Azure Communication Services resource in the Azure portal. The process is initiated in the Azure portal. This option opens a new browser window for you to complete a signup process using Facebook’s signup wizard. 

1. On the left navigation bar, select on the **WhatsApp** channel under the **Channels** header. To add a new WhatsApp Business Account, select on the **Connect** button.

    Screenshot that shows Azure portal viewing the Communication Services Channels on the left panel.

2. Select WhatsApp as the channel and select the **Connect** button.

    Screenshot that shows Connect to WhatsApp Channel.

3. Before you connect to WhatsApp, you need to complete the [Prerequisites](#prerequisites) and acknowledge the *Data Transfer and Independent Terms of Service*.

    Screenshot that shows Connect to WhatsApp prerequisites.

4. Select the **Next** button to continue.

5. You'll select the phone number, which you plan to use on the next screen. You can use an Azure Communication Services phone number, which is enabled to receive SMS text messages, or you can bring your own phone number.

    Screenshot that shows Connect to WhatsApp phone number selection.

6. Select the **Next** button to continue.

7. This screen you either see the Azure Communication Services phone number or you enter the phone number, which you verify as part of the WhatsApp Business account signup.

    Screenshot that shows Connect to WhatsApp sign-in with Facebook.

8. Selecting on the **Sign-In with Facebook** button opens a new window and ask you to sign into Facebook.

    Screenshot that shows Facebook Sign-In screen.

9. The next screen notifies you that the Azure Communication Services app will receive your name and profile picture. It gives permission to Azure Communication Service APIs to manage your WhatsApp Business Account.

    Screenshot that shows Facebook authorization page.

10. After signing in, you see the Getting Started screen.

    Screenshot that shows Getting started with registering WhatsApp Business account with Azure.

11. Select the **Get Started** button. The next screen summarizes the permissions you'll be granting Azure Communication Services to manage your WhatsApp Business Account.

    Screenshot that shows Azure permissions for your WhatsApp Business account.

12. Select the **Continue** button to proceed.


## Select Meta business account

 1. After WhatsApp Account signup, select existing **Meta Business Account**. Then select on the **Continue** button.

    Screenshot that shows selecting existing Meta Business Account.

    If you want to create **New Meta Business Account**, follow instructions [here](#create-new-meta-business-account).

2. Next you're asked to create a WhatsApp Business Account or select an existing one.

    Screenshot that shows Creating or selecting WhatsApp Business account.

3. Then you need to create a new WhatsApp Business profile or select an existing one.

    Screenshot that shows Creating or selecting WhatsApp Business profile.

4. Select the **Next** button to continue.


## Select WhatsApp business profile

1. After selecting Meta Business Account, you need to **create/select** a WhatsApp Business profile. Fill out the required information.

    > **Note:**
    > You can now use your WhatsApp Business Account multiple times with different Phone Numbers.

    > **Note:**
    > If you try to create a WhatsApp channel multiple times using the same WhatsApp Business Account and Phone Number, you might encounter errors. This problem happens because the Phone Number is already shared with Microsoft and `locked`. To fix the problem, delete the Phone Number and WhatsApp Business Account on the META portal. If you can't delete your WhatsApp Business Account, open a Support Case for manual assistance.
    
    Screenshot that shows WhatsApp Business account details.

1. Once you complete the form, select **Next** to continue.

## Verify your WhatsApp business number


1. On next step, you need to add a phone number to your WhatsApp for Business account. You can use a phone number that you purchased from Azure Communication Services or a number you purchased elsewhere. Another WhatsApp account can't use this phone number. If you were using an Azure Communication Services phone number, make sure that you completed the [Prerequisites](#prerequisites) and use the **Text message** option to verify the number.

    Screenshot that shows Adding a phone number to your WhatsApp Business account.

2. Select the **Next** button to continue.
    
3. When you receive the verification code on your phone number, enter it into the setup page.
    
    Screenshot that shows Verifying your phone number.
    
4. After providing the verification code, select on the **Next** button. This step completes the process of phone number verification.


## View your WhatsApp account in the Azure Communication Services Resource

You see the account and status listed in the Azure portal along with the other WhatsApp Business accounts that you connected to Azure Communication Services. Once approved, you can use the WhatsApp Business account to send and receive messages. The status of your WhatsApp Business account is displayed in the Azure portal. Meta reviews your business’s display name. You can learn more about this review process and how to update your business account’s display name in the article [About WhatsApp Business display name](https://www.facebook.com/business/help/338047025165344).

Screenshot that shows List your WhatsApp accounts in the Azure portal.

When you no longer want to use the WhatsApp Business account with Azure Communication Services, you can select the account and select the **Disconnect** button. This option disconnects the account from Azure Communication Services but doesn't delete the account and the account can be reconnected later.

### WhatsApp account status
You can see the status of your WhatsApp Business account in the Azure portal. Accounts with different statuses have different restrictions on messaging features. An account can have following types of status.

| Status | Meaning | Suggested Action |
| --- | --- | --- |
| **Active** | A WhatsApp account is ready to use. |  |
| **Revoked** | A WhatsApp account is unshared or deleted from the WhatsApp side. | If you no longer want to use the WhatsApp Business account, you can disconnect the account. If you still want the WhatsApp Business account connected, you need to redo the registration process by disconnecting then reconnecting the account. |
| **Disconnected** | A WhatsApp account is disconnected from the Azure portal side. | If you no longer want to use the WhatsApp Business account, you need to go to WhatsApp manager portal to unshare the WhatsApp Business Account or delete the phone number or delete the WhatsApp Business Account for a complete disconnection. If you still want the WhatsApp Business account connected, you need to redo the registration process by disconnecting then reconnecting the account. |
| **Phone number deleted** | A WhatsApp business phone number is deleted from the WhatsApp side. | If you no longer want to use the WhatsApp Business account, you can disconnect the account. If you still want the WhatsApp Business account connected, you need to redo the registration process by disconnecting then reconnecting the account with adding the same phone number. |
| **Business account review rejected** | WhatsApp disabled the business account because it doesn't comply with WhatsApp Business's Commerce Policy. | Check details on WhatsApp manager portal and request a review if you believe that this rejection is incorrect. |
| **Display name review not started** | WhatsApp didn't start a WhatsApp Business display name review for your business phone number. Typically, the review didn't start because your Meta business account has not yet finish Meta Business Verification. [See this link for details about Meta Business Verification.](https://www.facebook.com/business/help/2058515294227817) | WhatsApp Business display name review isn't required to get started. You can immediately start sending messages to customers. You have limited number of messages and recipients per day until WhatsApp Business display name review is approved. |
| **Display name review pending** | The WhatsApp business phone number display name is under review by WhatsApp. | WhatsApp Business display name review isn't required to get started. You can immediately start sending messages to customers. You have limited number of messages and recipients per day until WhatsApp Business display name review is approved. |
| **Display name review rejected** | WhatsApp rejects the WhatsApp business phone number display name. | Check details and submit a new phone number display name on WhatsApp manager portal. WhatsApp Business display name review isn't required to get started. You can immediately start sending messages to customers. You have limited number of messages and recipients per day until WhatsApp Business display name review is approved. |

## Create new Meta business account

Provide the company details to be used in your Meta Business Account then select the **Next** button.
-  Company Name: How you want your company identified to your WhatsApp users.
-  Website: A legitimate web page that verifies your business. 
-  Business Email: You can use the email associated with your Facebook sign-in.
-  Business Phone Number: The phone number that customers can use to contact you.
    
Screenshot that shows Filling out the details of your Meta Business account.

Once Business account is created, continue with [**Set up WhatsApp Profile**](#select-whatsapp-business-profile) step.

> **Note:**
> For details about how-to and required information for Meta Business Account, see  can be found [Meta Business Suite](https://www.facebook.com/business/tools/meta-business-suite).

## Next steps

This article described how to register your WhatsApp Business Account with Azure Communication Services. Now you're ready to send and receive WhatsApp messages.

> 
> [Get started With Advanced Messages SDK](get-started.md)

## Related articles

-    [WhatsApp Business Account FAQ](whatsapp-business-account-faq.md)
-    [WhatsApp Business Help Center](https://www.facebook.com/business/help/524220081677109?id=2129163877102343)
-    [WhatsApp Business Display Name Policy](https://www.facebook.com/business/help/338047025165344)
-    [Business Verification](https://www.facebook.com/business/help/1095661473946872?id=180505742745347) 
-    [Add more Management Accounts](https://www.facebook.com/business/help/2169003770027706)
