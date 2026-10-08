## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [An active Communication Services resource.](../../create-communication-resource.md)

## Purchase a phone number

1. Navigate to your Communication Service resource in the [Azure portal](https://portal.azure.com).
 
   Screenshot showing a Communication Services resource's main page.

2. In the Communication Services resource overview, select on the "Phone numbers" option in the left-hand menu. 

   Screenshot showing a Communication Services resource's phone numbers page.

3. Select **Get** on the top left of the page to purchase your phone number. Selecting this launches our shopping wizard:

   Screenshot showing phone number shopping cart search wizard.

4. Choose the **Country/region** where you would like to provision the phone number. Country/region availability is based on the billing location for your Azure subscription. More information on what numbers are available for each country/region can be found [here](../../../concepts/numbers/sub-eligibility-number-capability.md). Next you'll choose the [number type](../../../concepts/telephony/plan-solution.md#phone-number-types-in-azure-communication-services). You can select from two phone number types: **Local**, and **Toll-free**.

> **Note:**
> - Bulk number orders or some countries/regions, such as the Netherlands, require a special order for phone numbers. If special ordering is needed, you will be prompted to follow the below mentioned special order process.
> - Click "Request a Special Order" button in the Phone Numbers section.
> - Open a [new case](https://aka.ms/ContactTNS).
> - Select "Azure Communication Service" as your Customer Profile.
> - Choose the Country/Region where you need the phone numbers.
> - Select "New TN Acquisition" as the case type.
> - Fill in the necessary details and submit your request.

5. Select **Search** to pull up numbers that meet your selected criteria. You have various filters to search for the number that fits your needs, including:

   - **Use case**: This is for whether you are using this number to call from an application (A2P) or from a human agent (P2P).
   - **Calling**: This is for determining the Calling capabilities you would like for your phone number: Making calls and/or receiving calls. 
   - **SMS**: This is for determining the SMS capabilities you would like for your phone number: Sending and/or receiving SMS messages.
   - **Custom**: You can also add custom filters to get a certain prefix or set of digits in your phone number.

   Screenshot showing phone number purchase page with available phone numbers.

6. Once you find the phone number or numbers to your choosing, select **Add to cart** to hold the numbers in the Telephony cart. These numbers are held for 16 minutes before your cart is automatically cleared. 

   Screenshot showing phone number shopping cart with two phone numbers in the cart.

   > **Note:**
   > The prices shown are the **monthly recurring charges** which cover the cost of leasing the selected phone number to you. Not included in this view is the **Pay-as-you-go costs** which are incurred when you make or receive calls. The price lists are [available here](../../../concepts/pricing.md). These costs depend on number type and destinations called. For example, price-per-minute for a call from a Seattle regional number to a regional number in New York and a call from the same number to a UK mobile number may be different.

7. Select **Next** to review your purchase. To complete your purchase, select **Buy now**.

   Screenshot showing 2 phone numbers to review and purchase.

8. You can find your purchased numbers back on the **Phone numbers** page. It might take a few minutes for the numbers to be provisioned. 

   Screenshot of the phone numbers page with the newly purchased phone numbers boxed with a red border.


### Update Phone Number Capabilities

On the **Phone Numbers** page, you can select a phone number to configure it.

Screenshot showing the update features page.

Select the features from the available options, then select **Save** to apply your selection.

### Release Phone Number

On the **Numbers** page, you can release phone numbers.

Screenshot showing the release phone numbers page.

Select the phone number that you want to release and then select on the **Release** button.
