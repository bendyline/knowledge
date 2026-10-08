---
title: SMS pricing
titleSuffix: An Azure Communication Services concept document
description: This article describes the Azure Communication Services short message service (SMS) Pricing Model.
author: prakulka
ms.author: prakulka
ms.date: 04/10/2025
ms.topic: reference
ms.service: azure-communication-services
zone_pivot_groups: acs-tollfree-shortcode-alphanumeric-tendlc-mobile
---
# SMS pricing 


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


**Applies to: tollfree**


> **Note:**
> In most cases, customers with Azure subscriptions locations that match the country/region of the Number offer can buy the Number. However, US and Canada numbers may be purchased by customers with Azure subscription locations in other countries/regions. For details about in-country/region and cross-country/region purchases, see [Country/region availability of telephone numbers and subscription eligibility](numbers/sub-eligibility-number-capability.md).

> **Important:**
>
>- For billing locations in the US and Puerto Rico, Azure Prepayment (previously called Monetary Commitment) funds and Azure prepaid credits aren't eligible for purchasing the products. In addition, customer spend on the products isn't eligible for Microsoft Azure Consumption Commitment drawdown.
>
>- For billing locations outside the US and Puerto Rico, Azure Prepayment (previously called Monetary Commitment) funds and Azure prepaid credits aren't eligible for purchasing the products.

To use the Toll-free SMS service, you need to provision a toll-free number through the Azure portal. Once you provision a toll-free number, pay-as-you-go pricing applies to the leasing fee and the usage fee. Azure Communication Services determines the leasing fee and the usage fee by the location of the toll-free number and the destination.

## Toll free pricing

### Leasing fee

Fees for toll free leasing are charged after provisioning and then recur on a month-to-month basis:

| Country/Region | Number type | Monthly fee |
| --- | --- | --- |
| United States | Toll-free | $2/mo |
| Canada | Toll-free | $2/mo |
| Puerto Rico | Toll-free | $2/mo |

### Usage Fee

SMS offers pay-as-you-go pricing. The price is a per-message segment* charge based on the destination of the message. You can send messages by toll-free phone numbers to phone numbers located within the United States, Canada, and Puerto Rico.

The following prices are exclusive of the required communications taxes and fees:

| Country/Region | Send Message | Receive Message |
| --- | --- | --- |
| United States | $0.0075 | $0.0075 |
| Canada | $0.0075 | $0.0075 |
| Puerto Rico | $0.0400 | $0.0075 |

*For more information about message segments, see [SMS character limits](sms/sms-faq.md#what-is-the-sms-character-limit).

## Carrier surcharge

A standard carrier surcharge is applicable to messages exchanged via toll free numbers. A carrier surcharge is a per-message segment* charge and is subject to change. Carrier surcharge is calculated based on the destination of the message for sent messages and based on the sender of the message for received messages. For more information, see [Carrier surcharges](https://github.com/Azure/Communication/blob/master/sms-carrier-surcharge.md). For more information about how SMS prices are calculated, see [Pricing example: 1\:1 SMS sending](pricing.md#pricing-example-11-sms-sending).

| Country/Region | Send Message | Receive Message |
| --- | --- | --- |
| United States | $0.0025 | $0.0010 |
| Canada | $0.0085 | NA |

*For more information about message segments, see [SMS character limits](sms/sms-faq.md#what-is-the-sms-character-limit).



**Applies to: tendlc**

> **Important:**
>
> - For billing locations in the United States and Puerto Rico, **Azure Prepayment (formerly Monetary Commitment)** and **Azure prepaid credits** can't be used to purchase 10DLC-related products. In addition, **spend on these products is not eligible for Microsoft Azure Consumption Commitment (MACC) drawdown**.
>
> - For billing locations outside the US and Puerto Rico, **MACC eligibility depends on subscription configuration**. To check if your subscription qualifies, see [Phone number management for United States](numbers/phone-number-management-for-united-states.md)


## 10 Digit Long Code (10DLC) pricing

This article describes the pricing for 10DLC (10-Digit Long Code) SMS services available through Azure Communication Services. 10DLC is primarily supported in the United States. Availability depends on your subscription billing location and eligibility. For more information about supported countries/regions, see [Phone number management for United States](numbers/phone-number-management-for-united-states.md).

The 10DLC SMS service requires:
- Registering a **brand**
- Registering one or more **campaigns**
- Provisioning a **10DLC phone number**

Pay-as-you-go pricing applies to these services: brand registration, campaign registration, phone number leasing, and message usage.

---

### Registration fees

Registration fees apply to brands and campaigns as part of the 10DLC compliance process in the United States.

| Service Name | Charge Type | Campaign Type | Billing Frequency | Description | Price |
| --- | --- | --- | --- | --- | --- |
| Brand Registration | Registration | — | One-time | Fee for registering a brand | $4 |
| Brand Vetting | Vetting | Standard | One-time | Standard brand vetting (required in most cases) | $40 |
| Brand Vetting | Vetting | Enhanced | One-time | Enhanced vetting for increased trust scores *(Coming soon)* | – |
| Campaign Registration | Registration | Emergency | Monthly | Campaigns related to emergency services | $5 |
| Campaign Registration | Registration | Low Volume | Monthly | Campaigns with limited message volume | $1.50 |
| Campaign Registration | Registration | Franchises | Monthly | Franchise-related campaign registration | $30 |
| Campaign Registration | Registration | Charity | Monthly | Nonprofit or charitable campaign registration *(Not linked to nonprofit brands)* | $3 |
| Campaign Registration | Registration | Sole Proprietor | Monthly | Campaigns registered under Sole Proprietor brand type | $2 |

> **Note:**
> The Campaign Registry (TCR) and participating carriers set trust scores and vetting requirements.
> - Brand vetting is typically required to achieve higher trust scores and better message throughput.
> - Vetting is generally required for brands not listed in the Russell 3000 index.


---

### Phone number leasing fee

Monthly leasing fees for phone numbers.

| Number Type | Charge Type | Billing Frequency | Description | Price |
| --- | --- | --- | --- | --- |
| Local (Geographic) | Leasing | Monthly | Monthly fee for leasing a 10DLC phone number | $1 |

---

### Usage fee

SMS offers pay-as-you-go pricing. The price is a per-message segment charge based on the destination of the message.

| Country/Region | Send Message | Receive Message |
| --- | --- | --- |
| United States | $0.0075 | $0.0075 |

> **Tip:**
> A message segment is typically 160 characters or less. For details, see [SMS character limits](sms/sms-faq.md#what-is-the-sms-character-limit).

---

### Carrier surcharges

A carrier surcharge applies to messages exchanged using 10DLC numbers. This surcharge is a **per-message segment fee** determined by the mobile carrier of the recipient (outbound) or sender (inbound).

| Carrier | Direction | Fee per Segment |
| --- | --- | --- |
| AT&T | Outbound | $0.0020 |
| T-Mobile (incl. Sprint) | Outbound + Inbound | $0.0030 |
| Verizon | Outbound + Inbound | $0.0030 |
| US Cellular | Outbound | $0.0050 |
| TextNow | Outbound | $0.0020 |
| Bluegrass | Outbound | $0.0000 |
| C-Spire | Outbound | $0.0000 |
| Commnet | Outbound | $0.0000 |

For more information, see [Carrier fees](sms/sms-faq.md#carrier-fees) in the SMS FAQ.





**Applies to: shortcode**

> **Important:**
> Short Code availability is currently restricted to Azure enterprise subscriptions that have a billing address in the United States, Canada, and United Kingdom.

> **Important:**
>
>- For billing locations in the US and Puerto Rico, Azure Prepayment (previously called Monetary Commitment) funds and Azure prepaid credits aren't eligible for purchasing the products. In addition, customer spend on the products isn't eligible for Microsoft Azure Consumption Commitment drawdown.
>
>- For billing locations outside the US and Puerto Rico, Azure Prepayment (previously called Monetary Commitment) funds and Azure prepaid credits aren't eligible for purchasing the products.

To use the Short Code service, you need to provision a short code through the Azure portal. Once you provision a short code, pay-as-you-go pricing applies to the leasing fee, usage fee, and the carrier surcharge. Azure Communication Services determines the leasing fee, usage fee, and carrier surcharge by the short code type, location of the short code, destination, and the carrier of the message.

## Short Codes pricing

### Setup fee

When you apply for a short code, there are two charges to consider:

- Prepaid Monthly Fee: A fee that covers the period from the day of application until the short code is delivered. Currently, this fee is temporarily waived and isn't charged.
- Setup Fee: A one-time charge applied at the time the short code is delivered.

#### Prepaid fee

| Country/Region | Fee type | Description | Fee |
| --- | --- | --- | --- |
| Canada | Short Code Fee | Charged before short code delivery. | $1000/mo |
| United Kingdom | Short Code Fee | Charged before short code delivery. | $1600/mo |
| United States | Random Short Code Fee | Charged before short code delivery. | $1000/mo* |

*Extra $500/mo would be charged for Vanity short codes"
> **Note:**
> The pre-paid monthly fee is currently waived and is not charged. The fee waiver is a temporary measure and subject to change.

#### Setup fee details

| Country/Region | Fee type | Description | Fee |
| --- | --- | --- | --- |
| Canada | Setup Fee | Charged at the time the Short Code is delivered | $3,000 |
| United States | Setup Fee | Charged at the time the Short Code is delivered | $650 |

> **Note:**
> Short Codes provisioning typically takes on average 8 to 12 weeks.

### Leasing fee

Fees for short code leasing are charged after provisioning is complete and then recur on a month-to-month basis:

| Country/Region | Number type | Monthly fee |
| --- | --- | --- |
| Canada | Random Short Code | $1000/mo |
| United Kingdom | Random Short Code | $1600/mo |
| United States | Random Short Code | $1000/mo* |

*Extra $500/mo would be charged for Vanity short codes

### Usage fee

SMS offers pay-as-you-go pricing. The price is a per-message segment charge based on the destination of the message. You can send messages from a short code to phone numbers located within the specified countries or regions. 

The following prices don't include the required communications taxes and fees:

| Country/Region | Send Message | Receive Message |
| --- | --- | --- |
| Canada | $0.0268 | $0.0061 |
| United Kingdom | $0.04 | $0.0075 |
| United States | $0.0075 | $0.0075 |

*See our guide on [SMS character limits](sms/sms-faq.md#what-is-the-sms-character-limit) to learn more about message segments.

### Carrier surcharge

A standard carrier surcharge applies to messages exchanged via short-codes. A carrier surcharge is a per-message segment* charge and is subject to change. Carrier surcharge is calculated based on the destination of the message for sent messages and based on the sender of the message for received messages. See the SMS FAQ [Carrier fees](sms/sms-faq.md#carrier-fees).

| Country/Region | Send Message | Receive Message |
| --- | --- | --- |
| Canada | $0.0050 | NA |
| United States | $0.0025 | NA |



**Applies to: alphanumeric-senderid**


> **Important:**
>
>- For billing locations in the US and Puerto Rico, Azure Prepayment (previously called Monetary Commitment) funds and Azure prepaid credits aren't eligible for purchasing the products. In addition, customer spend on the products isn't eligible for Microsoft Azure Consumption Commitment drawdown.
>
>- For billing locations outside the US and Puerto Rico, Azure Prepayment (previously called Monetary Commitment) funds and Azure prepaid credits aren't eligible for purchasing the products.

To use the Alphanumeric sender ID service, you need to enable alphanumeric sender ID through the Azure portal. Once the alphanumeric sender ID service is enabled, pay-as-you-go pricing applies to the usage fee. Azure Communication Services determines the usage fee by the destination of the message.

## Alphanumeric sender ID  Pricing

### Usage Fee

SMS offers pay-as-you-go pricing. The price is a per-message segment charge based on the destination of the message. You can send messages from an alphanumeric sender ID to phone numbers located within the destinations in the following table.

The following prices don't include the required communications taxes and fees:

| Country/Region | Send Message |
| --- | --- |
| Australia | $0.049 |
| Austria | $0.0932 |
| Czech Republic | $0.0490 |
| Denmark | $0.0499 |
| Estonia | $0.0845 |
| Finland | $0.0820 |
| France | $0.076 |
| Germany | $0.0895 |
| Ireland | $0.07 |
| Italy | $0.0833 |
| Lithuania | $0.041 |
| Latvia | $0.065 |
| Netherlands | $0.092 |
| Norway | $0.0620 |
| Poland | $0.041 |
| Portugal | $0.045 |
| Slovakia | $0.0650 |
| Slovenia | $0.0470 |
| Spain | $0.0833 |
| Sweden | $0.055 |
| Switzerland | $0.069 |
| United Kingdom | $0.04 |

*For more information about message segments, see [SMS character limits](sms/sms-faq.md#what-is-the-sms-character-limit).



**Applies to: mobile-number**


> **Important:**
>- For billing locations in the US and Puerto Rico – Azure Prepayment (previously called Monetary Commitment) funds and Azure prepaid credits are not eligible for purchasing the products. Additionally, customer spend on the products isn't eligible for Microsoft Azure Consumption Commitment drawdown.
>
>
>- For billing locations outside the US and Puerto Rico Azure Prepayment (previously called Monetary Commitment) funds and Azure prepaid credits aren't eligible for purchasing the products.

Mobile Numbers are long-term leased numbers for A2P SMS messaging within select countries/regions, billed on a pay-as-you-go basis.

##  Mobile Numbers Pricing

### Phone Number Leasing Monthly Fee
The Monthly leasing fees apply per phone number provisioned.

The following prices are exclusive of the required communications taxes and fees:

| Country | Monthly Fee |
| --- | --- |
| Australia | $6.50/mo |
| Belgium | $1.25/mo |
| Denmark | $15/mo |
| Finland | $5/mo |
| Ireland | $6.50/mo |
| Latvia | $1/mo |
| Netherlands | $6/mo |
| Poland | $4/mo |
| Sweden | $3/mo |
| United Kingdom | $1.15/mo |

### Usage Fee
SMS offers pay-as-you-go pricing. The price is a per-message segment charge based on the destination of the message. Messages can be sent from a Mobile Number to phone numbers located within the destinations mentioned below. 

The following prices are exclusive of the required communications taxes and fees:

| Country | Send Message | Receive Message |
| --- | --- | --- |
| Australia | $0.049 | $0.0075 |
| Belgium | $0.105 | $0.0075 |
| Denmark | $0.0499 | $0.0075 |
| Finland | $0.082 | $0.0075 |
| Ireland | $0.070 | $0.0075 |
| Latvia | $0.065 | $0.0062 |
| Netherlands | $0.092 | $0.0075 |
| Poland | $0.041 | $0.0075 |
| Sweden | $0.055 | $0.0075 |
| United Kingdom | $0.04 | $0.0075 |

*See our guide on [SMS character limits](sms/sms-faq.md#what-is-the-sms-character-limit) to learn more about message segments.





## Next steps

> 
> [Learn more about SMS pricing calculation](pricing.md)

> 
> [Learn more about SMS](sms/concepts.md)

## Related articles

- For global messaging and partner-led options, see [Messaging Connect](sms/messaging-connect.md).
- Learn about the [SMS SDKs](sms/sdk-features.md).
- Get an SMS capable [phone number](../quickstarts/telephony/get-phone-number.md).
- Get a [short code](../quickstarts/sms/apply-for-short-code.md).
- [Phone number types in Azure Communication Services](telephony/plan-solution.md).
