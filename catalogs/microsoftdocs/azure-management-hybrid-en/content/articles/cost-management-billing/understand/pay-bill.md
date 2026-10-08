---
title: Pay your Microsoft Customer Agreement or Microsoft Online Subscription Program bill
description: Learn how to pay your bill in the Azure portal. You must be a billing profile owner, contributor, or invoice manager to pay in the portal.
keywords: billing, past due, balance, pay now,
author: kennyday
ms.author: souchak
ms.reviewer: souchak
ms.service: cost-management-billing
ms.subservice: billing
ms.topic: how-to
ms.date: 09/16/2026
service.tree.id: 3b35c9b8-bf14-4e4a-bc0d-21055e56b28c
---

# Pay your Microsoft Customer Agreement or Microsoft Online Subscription Program bill

This article applies to:

- Customers who have a Microsoft Customer Agreement.
- Customers who signed up for Azure through the Azure website to create a Microsoft Online Subscription Program account. This type of account is also called a *pay-as-you-go* account.

If you're unsure of your billing account type, see [Check the type of your account](#check-the-type-of-your-account) later in this article.

There are two ways to pay your bill for Azure. You can pay with the default payment method of your billing profile, or you can make a one-time payment with the **Pay now** option.

If you signed up for Azure through a Microsoft representative, your default payment method is always set to wire transfer. Automatic credit card payment isn't an option if you signed up for Azure through a Microsoft representative. Instead, you can [pay with a credit card for individual invoices](#pay-now-in-the-azure-portal).

If you have a Microsoft Online Subscription Program account, your default payment method is credit card. Normally, payments are automatically deducted from your credit card. But you can also make one-time payments manually by credit card.

If you have Azure credits, they automatically apply to your invoice each billing period.

> **Note:**
> Regardless of the payment method that you select to complete your payment, you must specify the invoice number in the payment details.

Here's a table that summarizes payment methods for agreement types:

| Agreement type | Credit card | Wire transfer<sup>1</sup> |
| --- | --- | --- |
| Microsoft Customer Agreement<br>purchased through a Microsoft representative | ✔ (with a $50,000 USD limit) | ✔ |
| Enterprise Agreement | ✘ | ✔ |
| Microsoft Online Subscription Program | ✔ | ✔ (if you're approved to pay by invoice) |

<sup>1</sup> An ACH credit transaction can be made automatically, if your bank supports it.

## Reserve Bank of India

In October 2021, automatic payments in India were restricted under RBI’s e-mandate guidelines, which initially capped recurring transactions at ₹5,000. Customers often had to make manual payments for Microsoft Online Subscription Program (MOSP) accounts in the Azure portal. This directive did not affect the total amount charged for Azure usage.

In June 2022, the Reserve Bank of India (RBI) raised the e-mandate limit for recurring card transactions from ₹5,000 to ₹15,000. Learn more on the [Reserve Bank of India website](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11668&Mode=0).

In September 2022, Microsoft and other online merchants no longer store credit card information. To comply with this regulation, Microsoft removed all stored card details from Azure. Learn more about this directive on the [Reserve Bank of India website](https://rbidocs.rbi.org.in/rdocs/notification/PDFs/DPSSC09B09841EF3746A0A7DC4783AC90C8F3.PDF).

**Recent Updates:** As of December 2023, RBI further increased the e-mandate limit for certain categories—mutual fund subscriptions, insurance premium payments, and credit card bill payments—from ₹15,000 to ₹1,00,000 per transaction. This change allows higher-value recurring transactions without additional authentication steps for these categories. Additionally, RBI issued the *Authentication Mechanisms for Digital Payment Transactions Directions, 2025*, introducing broader principles for secure digital payments and enabling alternative authentication methods beyond SMS-based OTP. These directions take effect by April 1, 2026. Learn more on the [Reserve Bank of India notifications page](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12898).

### UPI and NetBanking payment options

Azure supports two alternate payment methods for India customers for MOSP accounts.

- Unified Payments Interface (UPI) is a real-time payment method. UPI is also supported for MCA accounts.
- NetBanking gives customers access to banking services through an online platform.

#### How do I make a payment with UPI or NetBanking?

UPI and NetBanking are supported only for one-time payment transactions.

To make a payment with UPI or NetBanking:

1. Select **Add a new payment method** when you're making a payment.
2. Select **UPI** or **NetBanking**.
3. You're redirected to a payment partner, like BillDesk, where you can choose your payment method.
4. You're redirected to your bank's website, where you can process the payment.
5. Wait until the payment finishes in your UPI or NetBanking app, and then return to the Azure portal and select **Complete**. Don't close your browser until the payment is complete.

After you submit the payment, allow time for the payment to appear in the Azure portal.

#### How am I refunded if I made a payment with UPI or NetBanking?

Refunds are treated as a regular charge. They go to your bank account.

### Paying with Pix in Brazil

Customers who have a billing address in Brazil and an MCA billing account type can use Pix for one-time payment transactions. To make a payment with Pix:

1. Select **Add a new payment method** when you're making a payment.
2. Select **PIX**.
3. You see a QR code in the payments blade within Azure portal. Alternatively, use the payment link provided to complete the payment. The link and the QR code are valid for 24 hours.
4. When you complete payment, the payment blade automatically closes and returns you to Azure portal.

After you submit the payment, wait for the payment to appear in the Azure portal.

> **Note:**
> Paying with Pix is available only for MCA billing accounts. You can check your account type [here](#check-the-type-of-your-account).

### Paying with Alipay in China

Customers who have a billing address in China and an MCA billing account type can use Alipay for one-time payment transactions. To make a payment with Alipay:

1. Select **Add a new payment method** when you're making a payment.
2. Select **Alipay**.
3. You're redirected to a payment partner, like Worldpay, where you can view the QR code and complete the payment with your mobile device.
4. When you complete payment, the payment page automatically closes and returns you to Azure portal.

After you submit the payment, allow time for the payment to appear in the Azure portal.

> **Note:**
> Paying with Alipay is available only for MCA billing accounts. You can check your account type [here](#check-the-type-of-your-account).

## Partial payments

Partial payment is available for Azure global pay-as-you-go customers who experience a payment failure during the [Pay Now](https://learn.microsoft.com/azure/cost-management-billing/understand/pay-bill#pay-now-in-the-azure-portal) flow. If you accrue usage higher than your credit card limit, you can use the following self-serve process to split the invoice amount across multiple credit cards.

There is a minimum value required for each payment that you can submit, which varies by country/region.

> **Note:**
> To avoid service interruption, pay the full invoice amount by the due date on the invoice.

To make a partial payment:

1. Sign in to the [Azure portal](https://portal.azure.com).
2. Search for and select **Cost Management + Billing**.
3. On the left menu, under **Billing**, select **Invoices**.
4. If any of your eligible invoices are due or past due, a blue **Pay now** link for the invoice is available. Select the link.
5. In the **Pay now** window, select **Select a payment method** to choose an existing credit card or add a new one.
6. Select **Pay now**.
7. If the payment fails, the partial payment feature appears in the **Pay now** experience. There's a minimum partial payment amount. You must enter an amount greater than the minimum.
8. Select the **Select a payment method** option to choose an existing credit card or add a new one. It's the card that the first partial payment is applied to.
9. Select **Pay now**.
10. Repeat steps 8 to 9 until you fully pay the invoice amount.

## Credit or debit card

If the default payment method for your billing profile is a credit or debit card, it's automatically charged each billing period.

If your automatic credit or debit card charge is declined for any reason, you can make a one-time payment with a credit or debit card in the Azure portal by using **Pay now**.

If you have a Microsoft Online Subscription Program (pay-as-you-go) account and you have a bill due, the **Pay now** banner appears on your subscription property page.

If you want to learn how to change your default payment method to wire transfer, see the [article about how to pay by invoice](../manage/pay-by-invoice.md).

Although you can generally use debit cards to pay your Azure bill, consider these limitations:

- Hong Kong Special Administrative Region and Brazil don't allow the use of debit cards. They support only credit cards.
- India supports debit and credit cards through Visa and Mastercard.
- You can't use virtual cards to pay your Azure bill.

- Prepaid cards (also known as stored value cards, Visa gift cards, MasterCard gift cards, etc.) are not accepted as valid payment instruments.

## Wire transfer

If the default payment method of your billing profile is wire transfer, follow the payment instructions on your invoice PDF file.

> **Note:**
> When you pay your bill by wire transfer, the payment might take up to 10 business days to get processed.

Alternatively, if your invoice is under the threshold amount for your currency, you can make a one-time payment in the Azure portal with a credit or debit card by using **Pay now**. If your invoice amount exceeds the threshold, you can't pay your invoice with a credit or debit card. You'll find the threshold amount for your currency in the Azure portal after you select **Pay now**.

>**Note:**
> When multiple invoices are remitted in a single wire transfer, you must specify the invoice numbers for all of the invoices.

>**Important:**
> SEPA (Single Euro Payments Area) transfers allow up to 140 characters in the payment details field. Exceeding this limit might cause processing issues.

### Bank details used to send wire transfer payments
<a name="wire-bank-details"></a>

If your default payment method is wire transfer, check your invoice for payment instructions. These bank details apply to all MCA wire transfer payments. Find payment instructions for your country/region in the following list:

> 
> - **Choose your country or region**
> - [Afghanistan](https://learn.microsoft.com/legal/pay/payment-details#afghanistan)
> - [Albania](https://learn.microsoft.com/legal/pay/payment-details#albania)
> - [Algeria](https://learn.microsoft.com/legal/pay/payment-details#algeria)
> - [Angola](https://learn.microsoft.com/legal/pay/payment-details#angola)
> - [Argentina](https://learn.microsoft.com/legal/pay/payment-details#argentina)
> - [Armenia](https://learn.microsoft.com/legal/pay/payment-details#armenia)
> - [Australia](https://learn.microsoft.com/legal/pay/payment-details#australia)
> - [Austria](https://learn.microsoft.com/legal/pay/payment-details#austria)
> - [Azerbaijan](https://learn.microsoft.com/legal/pay/payment-details#azerbaijan)
> - [Bahamas](https://learn.microsoft.com/legal/pay/payment-details#bahamas)
> - [Bahrain](https://learn.microsoft.com/legal/pay/payment-details#bahrain)
> - [Bangladesh](https://learn.microsoft.com/legal/pay/payment-details#bangladesh)
> - [Barbados](https://learn.microsoft.com/legal/pay/payment-details#barbados)
> - [Belarus](https://learn.microsoft.com/legal/pay/payment-details#belarus)
> - [Belgium](https://learn.microsoft.com/legal/pay/payment-details#belgium)
> - [Belize](https://learn.microsoft.com/legal/pay/payment-details#belize)
> - [Bermuda](https://learn.microsoft.com/legal/pay/payment-details#bermuda)
> - [Bolivia](https://learn.microsoft.com/legal/pay/payment-details#bolivia)
> - [Bosnia and Herzegovina](https://learn.microsoft.com/legal/pay/payment-details#bosnia-and-herzegovina)
> - [Botswana](https://learn.microsoft.com/legal/pay/payment-details#botswana)
> - [Brazil](https://learn.microsoft.com/legal/pay/payment-details#brazil)
> - [Brunei](https://learn.microsoft.com/legal/pay/payment-details#brunei)
> - [Bulgaria](https://learn.microsoft.com/legal/pay/payment-details#bulgaria)
> - [Cameroon](https://learn.microsoft.com/legal/pay/payment-details#cameroon)
> - [Canada](https://learn.microsoft.com/legal/pay/payment-details#canada)
> - [Cabo Verde](https://learn.microsoft.com/legal/pay/payment-details#cape-verde)
> - [Cayman Islands](https://learn.microsoft.com/legal/pay/payment-details#cayman-islands)
> - [Chile](https://learn.microsoft.com/legal/pay/payment-details#chile)
> - [China (PRC)](https://learn.microsoft.com/legal/pay/payment-details#china-prc)
> - [Colombia](https://learn.microsoft.com/legal/pay/payment-details#colombia)
> - [Costa Rica](https://learn.microsoft.com/legal/pay/payment-details#costa-rica)
> - [Côte d'Ivoire](https://learn.microsoft.com/legal/pay/payment-details#cote-divoire)
> - [Croatia](https://learn.microsoft.com/legal/pay/payment-details#croatia)
> - [Curacao](https://learn.microsoft.com/legal/pay/payment-details#curacao)
> - [Cyprus](https://learn.microsoft.com/legal/pay/payment-details#cyprus)
> - [Czech Republic](https://learn.microsoft.com/legal/pay/payment-details#czech-republic)
> - [Democratic Republic of Congo](https://learn.microsoft.com/legal/pay/payment-details#democratic-republic-of-congo)
> - [Denmark](https://learn.microsoft.com/legal/pay/payment-details#denmark)
> - [Dominican Republic](https://learn.microsoft.com/legal/pay/payment-details#dominican-republic)
> - [Ecuador](https://learn.microsoft.com/legal/pay/payment-details#ecuador)
> - [Egypt](https://learn.microsoft.com/legal/pay/payment-details#egypt)
> - [El Salvador](https://learn.microsoft.com/legal/pay/payment-details#el-salvador)
> - [Estonia](https://learn.microsoft.com/legal/pay/payment-details#estonia)
> - [Ethiopia](https://learn.microsoft.com/legal/pay/payment-details#ethiopia)
> - [Faroe Islands](https://learn.microsoft.com/legal/pay/payment-details#faroe-islands)
> - [Fiji](https://learn.microsoft.com/legal/pay/payment-details#fiji)
> - [Finland](https://learn.microsoft.com/legal/pay/payment-details#finland)
> - [France](https://learn.microsoft.com/legal/pay/payment-details#france)
> - [French Guiana](https://learn.microsoft.com/legal/pay/payment-details#french-guiana)
> - [Georgia](https://learn.microsoft.com/legal/pay/payment-details#georgia)
> - [Germany](https://learn.microsoft.com/legal/pay/payment-details#germany)
> - [Ghana](https://learn.microsoft.com/legal/pay/payment-details#ghana)
> - [Greece](https://learn.microsoft.com/legal/pay/payment-details#greece)
> - [Grenada](https://learn.microsoft.com/legal/pay/payment-details#grenada)
> - [Guadeloupe](https://learn.microsoft.com/legal/pay/payment-details#guadeloupe)
> - [Guam](https://learn.microsoft.com/legal/pay/payment-details#guam)
> - [Guatemala](https://learn.microsoft.com/legal/pay/payment-details#guatemala)
> - [Guyana](https://learn.microsoft.com/legal/pay/payment-details#guyana)
> - [Haiti](https://learn.microsoft.com/legal/pay/payment-details#haiti)
> - [Honduras](https://learn.microsoft.com/legal/pay/payment-details#honduras)
> - [Hong Kong SAR](https://learn.microsoft.com/legal/pay/payment-details#hong-kong)
> - [Hungary](https://learn.microsoft.com/legal/pay/payment-details#hungary)
> - [Iceland](https://learn.microsoft.com/legal/pay/payment-details#iceland)
> - [India](https://learn.microsoft.com/legal/pay/payment-details#india)
> - [Indonesia](https://learn.microsoft.com/legal/pay/payment-details#indonesia)
> - [Iraq](https://learn.microsoft.com/legal/pay/payment-details#iraq)
> - [Ireland](https://learn.microsoft.com/legal/pay/payment-details#ireland)
> - [Israel](https://learn.microsoft.com/legal/pay/payment-details#israel)
> - [Italy](https://learn.microsoft.com/legal/pay/payment-details#italy)
> - [Jamaica](https://learn.microsoft.com/legal/pay/payment-details#jamaica)
> - [Japan](https://learn.microsoft.com/legal/pay/payment-details#japan)
> - [Jordan](https://learn.microsoft.com/legal/pay/payment-details#jordan)
> - [Kazakhstan](https://learn.microsoft.com/legal/pay/payment-details#kazakhstan)
> - [Kenya](https://learn.microsoft.com/legal/pay/payment-details#kenya)
> - [Korea](https://learn.microsoft.com/legal/pay/payment-details#korea)
> - [Kuwait](https://learn.microsoft.com/legal/pay/payment-details#kuwait)
> - [Kyrgyzstan](https://learn.microsoft.com/legal/pay/payment-details#kyrgyzstan)
> - [Latvia](https://learn.microsoft.com/legal/pay/payment-details#latvia)
> - [Lebanon](https://learn.microsoft.com/legal/pay/payment-details#lebanon)
> - [Libya](https://learn.microsoft.com/legal/pay/payment-details#libya)
> - [Liechtenstein](https://learn.microsoft.com/legal/pay/payment-details#liechtenstein)
> - [Lithuania](https://learn.microsoft.com/legal/pay/payment-details#lithuania)
> - [Luxembourg](https://learn.microsoft.com/legal/pay/payment-details#luxembourg)
> - [Macao Special Administrative Region](https://learn.microsoft.com/legal/pay/payment-details#macao)
> - [Malaysia](https://learn.microsoft.com/legal/pay/payment-details#malaysia)
> - [Malta](https://learn.microsoft.com/legal/pay/payment-details#malta)
> - [Mauritius](https://learn.microsoft.com/legal/pay/payment-details#mauritius)
> - [Mexico](https://learn.microsoft.com/legal/pay/payment-details#mexico)
> - [Moldova](https://learn.microsoft.com/legal/pay/payment-details#moldova)
> - [Monaco](https://learn.microsoft.com/legal/pay/payment-details#monaco)
> - [Mongolia](https://learn.microsoft.com/legal/pay/payment-details#mongolia)
> - [Montenegro](https://learn.microsoft.com/legal/pay/payment-details#montenegro)
> - [Morocco](https://learn.microsoft.com/legal/pay/payment-details#morocco)
> - [Namibia](https://learn.microsoft.com/legal/pay/payment-details#namibia)
> - [Nepal](https://learn.microsoft.com/legal/pay/payment-details#nepal)
> - [Netherlands](https://learn.microsoft.com/legal/pay/payment-details#netherlands)
> - [New Zealand](https://learn.microsoft.com/legal/pay/payment-details#new-zealand)
> - [Nicaragua](https://learn.microsoft.com/legal/pay/payment-details#nicaragua)
> - [Nigeria](https://learn.microsoft.com/legal/pay/payment-details#nigeria)
> - [North Macedonia, Republic of](https://learn.microsoft.com/legal/pay/payment-details#macedonia)
> - [Norway](https://learn.microsoft.com/legal/pay/payment-details#norway)
> - [Oman](https://learn.microsoft.com/legal/pay/payment-details#oman)
> - [Pakistan](https://learn.microsoft.com/legal/pay/payment-details#pakistan)
> - [Palestinian Authority](https://learn.microsoft.com/legal/pay/payment-details#palestinian-authority)
> - [Panama](https://learn.microsoft.com/legal/pay/payment-details#panama)
> - [Paraguay](https://learn.microsoft.com/legal/pay/payment-details#paraguay)
> - [Peru](https://learn.microsoft.com/legal/pay/payment-details#peru)
> - [Philippines](https://learn.microsoft.com/legal/pay/payment-details#philippines)
> - [Poland](https://learn.microsoft.com/legal/pay/payment-details#poland)
> - [Portugal](https://learn.microsoft.com/legal/pay/payment-details#portugal)
> - [Puerto Rico](https://learn.microsoft.com/legal/pay/payment-details#puerto-rico)
> - [Qatar](https://learn.microsoft.com/legal/pay/payment-details#qatar)
> - [Romania](https://learn.microsoft.com/legal/pay/payment-details#romania)
> - [Russia](https://learn.microsoft.com/legal/pay/payment-details#russia)
> - [Rwanda](https://learn.microsoft.com/legal/pay/payment-details#rwanda)
> - [Saint Kitts and Nevis](https://learn.microsoft.com/legal/pay/payment-details#saint-kitts-and-nevis)
> - [Saint Lucia](https://learn.microsoft.com/legal/pay/payment-details#saint-lucia)
> - [Saint Vincent and the Grenadines](https://learn.microsoft.com/legal/pay/payment-details#saint-vincent-and-the-grenadines)
> - [Saudi Arabia](https://learn.microsoft.com/legal/pay/payment-details#saudi-arabia)
> - [Senegal](https://learn.microsoft.com/legal/pay/payment-details#senegal)
> - [Serbia](https://learn.microsoft.com/legal/pay/payment-details#serbia)
> - [Singapore](https://learn.microsoft.com/legal/pay/payment-details#singapore)
> - [Slovakia](https://learn.microsoft.com/legal/pay/payment-details#slovakia)
> - [Slovenia](https://learn.microsoft.com/legal/pay/payment-details#slovenia)
> - [South Africa](https://learn.microsoft.com/legal/pay/payment-details#south-africa)
> - [Spain](https://learn.microsoft.com/legal/pay/payment-details#spain)
> - [Sri Lanka](https://learn.microsoft.com/legal/pay/payment-details#sri-lanka)
> - [Suriname](https://learn.microsoft.com/legal/pay/payment-details#suriname)
> - [Sweden](https://learn.microsoft.com/legal/pay/payment-details#sweden)
> - [Switzerland](https://learn.microsoft.com/legal/pay/payment-details#switzerland)
> - [Taiwan](https://learn.microsoft.com/legal/pay/payment-details#taiwan)
> - [Tajikistan](https://learn.microsoft.com/legal/pay/payment-details#tajikistan)
> - [Tanzania](https://learn.microsoft.com/legal/pay/payment-details#tanzania)
> - [Thailand](https://learn.microsoft.com/legal/pay/payment-details#thailand)
> - [Trinidad and Tobago](https://learn.microsoft.com/legal/pay/payment-details#trinidad-and-tobago)
> - [Turkmenistan](https://learn.microsoft.com/legal/pay/payment-details#turkmenistan)
> - [Tunisia](https://learn.microsoft.com/legal/pay/payment-details#tunisia)
> - [Türkiye](https://learn.microsoft.com/legal/pay/payment-details#turkey)
> - [Uganda](https://learn.microsoft.com/legal/pay/payment-details#uganda)
> - [Ukraine](https://learn.microsoft.com/legal/pay/payment-details#ukraine)
> - [United Arab Emirates](https://learn.microsoft.com/legal/pay/payment-details#united-arab-emirates)
> - [United Kingdom](https://learn.microsoft.com/legal/pay/payment-details#united-kingdom)
> - [United States](https://learn.microsoft.com/legal/pay/payment-details#united-states)
> - [Uruguay](https://learn.microsoft.com/legal/pay/payment-details#uruguay)
> - [Uzbekistan](https://learn.microsoft.com/legal/pay/payment-details#uzbekistan)
> - [Venezuela](https://learn.microsoft.com/legal/pay/payment-details#venezuela)
> - [Vietnam](https://learn.microsoft.com/legal/pay/payment-details#vietnam)
> - [Virgin Islands, US](https://learn.microsoft.com/legal/pay/payment-details#virgin-islands)
> - [Yemen](https://learn.microsoft.com/legal/pay/payment-details#yemen)
> - [Zambia](https://learn.microsoft.com/legal/pay/payment-details#zambia)
> - [Zimbabwe](https://learn.microsoft.com/legal/pay/payment-details#zimbabwe)

## Pay now in the Azure portal

To pay invoices in the Azure portal, you must have the correct [Microsoft Customer Agreement permissions](../manage/understand-mca-roles.md) or be the account administrator. The account administrator is the user who originally signed up for the Microsoft Customer Agreement account.

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Search for and select **Cost Management + Billing**.
1. On the left menu, under **Billing**, select **Invoices**.
1. If any of your eligible invoices are due or past due, a blue **Pay now** link appears for the invoice. Select the link.
1. In the **Pay now** window, select **Select a payment method** to choose an existing credit card or add a new one.
1. Select **Pay now**.

The invoice status shows **paid** within 24 hours.

The **Pay now** option might be unavailable if:

- You have a Microsoft Online Subscription Program account (pay-as-you-go account). You might instead see a **Settle balance** banner. If so, see [Resolve a past-due balance](../manage/resolve-past-due-balance.md#resolve-a-past-due-balance-in-the-azure-portal).
- Your default payment method and invoice amount don't support the **Pay now** option. Check your invoice for payment instructions.

For a complete list of all the counties/regions where the **Pay now** option is available, see [Regional considerations](../manage/resolve-past-due-balance.md#regional-considerations).

## Check the type of your account

 
To determine whether you have access to a billing account for a Microsoft Customer Agreement, check the agreement type:

1. Go to the Azure portal. Search for and select **Cost Management + Billing**.

   Screenshot that shows a search for Cost Management + Billing.

2. If you have access to just one billing scope, select **Settings** > **Properties**. You have access to a billing account for a Microsoft Customer Agreement if the billing account type is **Microsoft Customer Agreement**.  

    Screenshot of the Azure portal that shows a billing account type of Microsoft Customer Agreement for a single billing scope.

   If you have access to multiple billing scopes, check the type in the **Billing account type** column. You have access to a billing account for a Microsoft Customer Agreement if the billing account type for any of the scopes is **Microsoft Customer Agreement**.  

    Screenshot of the Azure portal that shows a billing account type of Microsoft Customer Agreement for multiple billing scopes.


## Related content

- To become eligible to pay by wire transfer, see the [article about how to pay by invoice](../manage/pay-by-invoice.md).
