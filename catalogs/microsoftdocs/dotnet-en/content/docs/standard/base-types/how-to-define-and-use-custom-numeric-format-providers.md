---
description: "Learn more about: How to: Define and Use Custom Numeric Format Providers"
title: "How to: Define and Use Custom Numeric Format Providers"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "numeric format strings [.NET]"
  - "formatting [.NET], numbers"
  - "number formatting [.NET]"
  - "custom numeric format strings"
  - "numbers [.NET], custom numeric format strings"
  - "displaying date and time data"
  - "format providers [.NET]"
  - "custom format strings"
ms.assetid: a281bfbf-6596-45ed-a2d6-3782d535ada2
---
# How to: Define and Use Custom Numeric Format Providers

.NET gives you extensive control over the string representation of numeric values. It supports the following features for customizing the format of numeric values:

- Standard numeric format strings, which provide a predefined set of formats for converting numbers to their string representation. You can use them with any numeric formatting method, such as [System.Decimal.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.Decimal.ToString%2528System.String%2529), that has a `format` parameter. For details, see [Standard Numeric Format Strings](standard-numeric-format-strings.md).

- Custom numeric format strings, which provide a set of symbols that can be combined to define custom numeric format specifiers. They can also be used with any numeric formatting method, such as [System.Decimal.ToString%28System.String%29](https://learn.microsoft.com/search/?terms=System.Decimal.ToString%2528System.String%2529), that has a `format` parameter. For details, see [Custom Numeric Format Strings](custom-numeric-format-strings.md).

- Custom [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) or [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) objects, which define the symbols and format patterns used in displaying the string representations of numeric values. You can use them with any numeric formatting method, such as [System.Int32.ToString*](https://learn.microsoft.com/search/?terms=System.Int32.ToString*), that has a `provider` parameter. Typically, the `provider` parameter is used to specify culture-specific formatting.

 In some cases (such as when an application must display a formatted account number, an identification number, or a postal code) these three techniques are inappropriate. .NET also enables you to define a formatting object that is neither a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) nor a [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) object to determine how a numeric value is formatted. This topic provides the step-by-step instructions for implementing such an object, and provides an example that formats telephone numbers.

## Define a custom format provider

1. Define a class that implements the [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) and [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) interfaces.

2. Implement the [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) method. [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) is a callback method that the formatting method (such as the [System.String.Format%28System.IFormatProvider%2CSystem.String%2CSystem.Object%5B%5D%29](https://learn.microsoft.com/search/?terms=System.String.Format%2528System.IFormatProvider%252CSystem.String%252CSystem.Object%255B%255D%2529) method) invokes to retrieve the object that is actually responsible for performing custom formatting. A typical implementation of [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) does the following:

    1. Determines whether the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object passed as a method parameter represents an [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) interface.

    2. If the parameter does represent the [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) interface, [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) returns an object that implements the [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) interface that is responsible for providing custom formatting. Typically, the custom formatting object returns itself.

    3. If the parameter does not represent the [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter) interface, [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) returns `null`.

3. Implement the [System.ICustomFormatter.Format*](https://learn.microsoft.com/search/?terms=System.ICustomFormatter.Format*) method. This method is called by the [System.String.Format%28System.IFormatProvider%2CSystem.String%2CSystem.Object%5B%5D%29](https://learn.microsoft.com/search/?terms=System.String.Format%2528System.IFormatProvider%252CSystem.String%252CSystem.Object%255B%255D%2529) method and is responsible for returning the string representation of a number. Implementing the method typically involves the following:

    1. Optionally, make sure that the method is legitimately intended to provide formatting services by examining the `provider` parameter. For formatting objects that implement both [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) and [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter), this involves testing the `provider` parameter for equality with the current formatting object.

    2. Determine whether the formatting object should support custom format specifiers. (For example, an "N" format specifier might indicate that a U.S. telephone number should be output in NANP format, and an "I" might indicate output in ITU-T Recommendation E.123 format.) If format specifiers are used, the method should handle the specific format specifier. It is passed to the method in the `format` parameter. If no specifier is present, the value of the `format` parameter is [System.String.Empty](https://learn.microsoft.com/search/?terms=System.String.Empty).

    3. Retrieve the numeric value passed to the method as the `arg` parameter. Perform whatever manipulations are required to convert it to its string representation.

    4. Return the string representation of the `arg` parameter.

## Use a custom numeric formatting object

1. Create a new instance of the custom formatting class.

2. Call the [System.String.Format%28System.IFormatProvider%2CSystem.String%2CSystem.Object%5B%5D%29](https://learn.microsoft.com/search/?terms=System.String.Format%2528System.IFormatProvider%252CSystem.String%252CSystem.Object%255B%255D%2529) formatting method, passing it the custom formatting object, the formatting specifier (or [System.String.Empty](https://learn.microsoft.com/search/?terms=System.String.Empty), if one is not used), and the numeric value to be formatted.

## Example

 The following example defines a custom numeric format provider named `TelephoneFormatter` that converts a number that represents a U.S. telephone number to its NANP or E.123 format. The method handles two format specifiers, "N" (which outputs the NANP format) and "I" (which outputs the international E.123 format).

 [Formatting.HowTo.NumericValue#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.NumericValue/cs/Telephone1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.NumericValue/cs/Telephone1.cs.md)
 [Formatting.HowTo.NumericValue#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.NumericValue/vb/Telephone1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.NumericValue/vb/Telephone1.vb.md)

 The custom numeric format provider can be used only with the [System.String.Format%28System.IFormatProvider%2CSystem.String%2CSystem.Object%5B%5D%29](https://learn.microsoft.com/search/?terms=System.String.Format%2528System.IFormatProvider%252CSystem.String%252CSystem.Object%255B%255D%2529) method. The other overloads of numeric formatting methods (such as `ToString`) that have a parameter of type [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) all pass the [System.IFormatProvider.GetFormat*](https://learn.microsoft.com/search/?terms=System.IFormatProvider.GetFormat*) implementation a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object that represents the [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) type. In return, they expect the method to return a [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) object. If it does not, the custom numeric format provider is ignored, and the [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) object for the current culture is used in its place. In the example, the `TelephoneFormatter.GetFormat` method handles the possibility that it may be inappropriately passed to a numeric formatting method by examining the method parameter and returning `null` if it represents a type other than [System.ICustomFormatter](https://learn.microsoft.com/search/?terms=System.ICustomFormatter).

 If a custom numeric format provider supports a set of format specifiers, make sure you provide a default behavior if no format specifier is supplied in the format item used in the [System.String.Format%28System.IFormatProvider%2CSystem.String%2CSystem.Object%5B%5D%29](https://learn.microsoft.com/search/?terms=System.String.Format%2528System.IFormatProvider%252CSystem.String%252CSystem.Object%255B%255D%2529) method call. In the example, "N" is the default format specifier. This allows for a number to be converted to a formatted telephone number by providing an explicit format specifier. The following example illustrates such a method call.

 [Formatting.HowTo.NumericValue#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.NumericValue/cs/Telephone1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.NumericValue/cs/Telephone1.cs.md)
 [Formatting.HowTo.NumericValue#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.NumericValue/vb/Telephone1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.NumericValue/vb/Telephone1.vb.md)

 But it also allows the conversion to occur if no format specifier is present. The following example illustrates such a method call.

 [Formatting.HowTo.NumericValue#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.NumericValue/cs/Telephone1.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Formatting.HowTo.NumericValue/cs/Telephone1.cs.md)
 [Formatting.HowTo.NumericValue#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.NumericValue/vb/Telephone1.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Formatting.HowTo.NumericValue/vb/Telephone1.vb.md)

 If no default format specifier is defined, your implementation of the [System.ICustomFormatter.Format*](https://learn.microsoft.com/search/?terms=System.ICustomFormatter.Format*) method should include code such as the following so that .NET can provide formatting that your code does not support.

 [System.ICustomFormatter.Format#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.ICustomFormatter.Format/cs/format.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.ICustomFormatter.Format/cs/format.cs.md)
 [System.ICustomFormatter.Format#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.ICustomFormatter.Format/vb/Format.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.ICustomFormatter.Format/vb/Format.vb.md)

 In the case of this example, the method that implements [System.ICustomFormatter.Format*](https://learn.microsoft.com/search/?terms=System.ICustomFormatter.Format*) is intended to serve as a callback method for the [System.String.Format%28System.IFormatProvider%2CSystem.String%2CSystem.Object%5B%5D%29](https://learn.microsoft.com/search/?terms=System.String.Format%2528System.IFormatProvider%252CSystem.String%252CSystem.Object%255B%255D%2529) method. Therefore, it examines the `formatProvider` parameter to determine whether it contains a reference to the current `TelephoneFormatter` object. However, the method can also be called directly from code. In that case, you can use the `formatProvider` parameter to provide a [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) or [System.Globalization.NumberFormatInfo](https://learn.microsoft.com/search/?terms=System.Globalization.NumberFormatInfo) object that supplies culture-specific formatting information.
