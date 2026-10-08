---
title: How to use character encoding classes in .NET
description: Learn how to use character encoding classes in .NET.
ms.date: 08/11/2021
dev_langs:
    - "csharp"
    - "vb"
helpviewer_keywords:
    - "encoding, understanding"
    - "encoding, choosing"
    - "encoding, fallback strategy"
ms.assetid: bf6d9823-4c2d-48af-b280-919c5af66ae9
---

# How to use character encoding classes in .NET

This article explains how to use the classes that .NET provides for encoding and decoding text by using various encoding schemes. The instructions assume you have read [Introduction to character encoding in .NET](character-encoding-introduction.md).

## Encoders and decoders

.NET provides encoding classes that encode and decode text by using various encoding systems. For example, the [System.Text.UTF8Encoding](https://learn.microsoft.com/search/?terms=System.Text.UTF8Encoding) class describes the rules for encoding to, and decoding from, UTF-8. .NET uses UTF-16 encoding (represented by the [System.Text.UnicodeEncoding](https://learn.microsoft.com/search/?terms=System.Text.UnicodeEncoding) class) for `string` instances. Encoders and decoders are available for other encoding schemes.

Encoding and decoding can also include validation. For example, the [System.Text.UnicodeEncoding](https://learn.microsoft.com/search/?terms=System.Text.UnicodeEncoding) class checks all `char` instances in the surrogate range to make sure they're in valid surrogate pairs. A fallback strategy determines how an encoder handles invalid characters or how a decoder handles invalid bytes.

> **Warning:**
> .NET encoding classes provide a way to store and convert character data. They should not be used to store binary data in string form. Depending on the encoding used, converting binary data to string format with the encoding classes can introduce unexpected behavior and produce inaccurate or corrupted data. To convert binary data to a string form, use the [System.Convert.ToBase64String*](https://learn.microsoft.com/search/?terms=System.Convert.ToBase64String*) method.

All character encoding classes in .NET inherit from the [System.Text.Encoding](https://learn.microsoft.com/search/?terms=System.Text.Encoding) class, which is an abstract class that defines the functionality common to all character encodings. To access the individual encoding objects implemented in .NET, do the following:

- Use the static properties of the [System.Text.Encoding](https://learn.microsoft.com/search/?terms=System.Text.Encoding) class, which return objects that represent the standard character encodings available in .NET (ASCII, UTF-7, UTF-8, UTF-16, and UTF-32). For example, the [System.Text.Encoding.Unicode](https://learn.microsoft.com/search/?terms=System.Text.Encoding.Unicode) property returns a [System.Text.UnicodeEncoding](https://learn.microsoft.com/search/?terms=System.Text.UnicodeEncoding) object. Each object uses replacement fallback to handle strings that it cannot encode and bytes that it cannot decode. For more information, see [Replacement fallback](character-encoding.md#Replacement).

- Call the encoding's class constructor. Objects for the ASCII, UTF-7, UTF-8, UTF-16, and UTF-32 encodings can be instantiated in this way. By default, each object uses replacement fallback to handle strings that it cannot encode and bytes that it cannot decode, but you can specify that an exception should be thrown instead. For more information, see [Replacement fallback](character-encoding.md#Replacement) and [Exception fallback](character-encoding.md#Exception).

- Call the [System.Text.Encoding.%23ctor%28System.Int32%29](https://learn.microsoft.com/search/?terms=System.Text.Encoding.%2523ctor%2528System.Int32%2529) constructor and pass it an integer that represents the encoding. Standard encoding objects use replacement fallback, and code page and double-byte character set (DBCS) encoding objects use best-fit fallback to handle strings that they cannot encode and bytes that they cannot decode. For more information, see [Best-fit fallback](character-encoding.md#BestFit).

- Call the [System.Text.Encoding.GetEncoding*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncoding*) method, which returns any standard, code page, or DBCS encoding available in .NET. Overloads let you specify a fallback object for both the encoder and the decoder.

You can retrieve information about all the encodings available in .NET by calling the [System.Text.Encoding.GetEncodings*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncodings*) method. .NET supports the character encoding schemes listed in the following table.

| Encoding class | Description |
| --- | --- |
| [ASCII](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding) | Encodes a limited range of characters by using the lower seven bits of a byte. Because this encoding only supports character values from `U+0000` through `U+007F`, in most cases it is inadequate for internationalized applications. |
| [UTF-7](https://learn.microsoft.com/search/?terms=System.Text.UTF7Encoding) | Represents characters as sequences of 7-bit ASCII characters. Non-ASCII Unicode characters are represented by an escape sequence of ASCII characters. UTF-7 supports protocols such as email and newsgroup. However, UTF-7 is not particularly secure or robust. In some cases, changing one bit can radically alter the interpretation of an entire UTF-7 string. In other cases, different UTF-7 strings can encode the same text. For sequences that include non-ASCII characters, UTF-7 requires more space than UTF-8, and encoding/decoding is slower. Consequently, you should use UTF-8 instead of UTF-7 if possible. |
| [UTF-8](https://learn.microsoft.com/search/?terms=System.Text.UTF8Encoding) | Represents each Unicode code point as a sequence of one to four bytes. UTF-8 supports 8-bit data sizes and works well with many existing operating systems. For the ASCII range of characters, UTF-8 is identical to ASCII encoding and allows a broader set of characters. However, for Chinese-Japanese-Korean (CJK) scripts, UTF-8 can require three bytes for each character, and can cause larger data sizes than UTF-16. Sometimes the amount of ASCII data, such as HTML tags, justifies the increased size for the CJK range. |
| [UTF-16](https://learn.microsoft.com/search/?terms=System.Text.UnicodeEncoding) | Represents each Unicode code point as a sequence of one or two 16-bit integers. Most common Unicode characters require only one UTF-16 code point, although Unicode supplementary characters (U+10000 and greater) require two UTF-16 surrogate code points. Both little-endian and big-endian byte orders are supported. UTF-16 encoding is used by the common language runtime to represent [System.Char](https://learn.microsoft.com/search/?terms=System.Char) and [System.String](https://learn.microsoft.com/search/?terms=System.String) values, and it is used by the Windows operating system to represent `WCHAR` values. |
| [UTF-32](https://learn.microsoft.com/search/?terms=System.Text.UTF32Encoding) | Represents each Unicode code point as a 32-bit integer. Both little-endian and big-endian byte orders are supported. UTF-32 encoding is used when applications want to avoid the surrogate code point behavior of UTF-16 encoding on operating systems for which encoded space is too important. Single glyphs rendered on a display can still be encoded with more than one UTF-32 character. |
| ANSI/ISO encoding | Provides support for a variety of code pages. On Windows operating systems, code pages are used to support a specific language or group of languages. For a table that lists the code pages supported by .NET, see the [System.Text.Encoding](https://learn.microsoft.com/search/?terms=System.Text.Encoding) class. You can retrieve an encoding object for a particular code page by calling the [System.Text.Encoding.GetEncoding%28System.Int32%29](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncoding%2528System.Int32%2529) method. A code page contains 256 code points and is zero-based. In most code pages, code points 0 through 127 represent the ASCII character set, and code points 128 through 255 differ significantly between code pages. For example, code page 1252 provides the characters for Latin writing systems, including English, German, and French. The last 128 code points in code page 1252 contain the accent characters. Code page 1253 provides character codes that are required in the Greek writing system. The last 128 code points in code page 1253 contain the Greek characters. As a result, an application that relies on ANSI code pages cannot store Greek and German in the same text stream unless it includes an identifier that indicates the referenced code page. |
| Double-byte character set (DBCS) encodings | Supports languages, such as Chinese, Japanese, and Korean, that contain more than 256 characters. In a DBCS, a pair of code points (a double byte) represents each character. The [System.Text.Encoding.IsSingleByte](https://learn.microsoft.com/search/?terms=System.Text.Encoding.IsSingleByte) property returns `false` for DBCS encodings. You can retrieve an encoding object for a particular DBCS by calling the [System.Text.Encoding.GetEncoding%28System.Int32%29](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncoding%2528System.Int32%2529) method. When an application handles DBCS data, the first byte of a DBCS character (the lead byte) is processed in combination with the trail byte that immediately follows it. Because a single pair of double-byte code points can represent different characters depending on the code page, this scheme still does not allow for the combination of two languages, such as Japanese and Chinese, in the same data stream. |

These encodings enable you to work with Unicode characters as well as with encodings that are most commonly used in legacy applications. In addition, you can create a custom encoding by defining a class that derives from [System.Text.Encoding](https://learn.microsoft.com/search/?terms=System.Text.Encoding) and overriding its members.

## .NET Core encoding support

By default, .NET Core does not make available any code page encodings other than code page 28591 and the Unicode encodings, such as UTF-8 and UTF-16. However, you can add the code page encodings found in standard Windows apps that target .NET to your app. For more information, see the [System.Text.CodePagesEncodingProvider](https://learn.microsoft.com/search/?terms=System.Text.CodePagesEncodingProvider) topic.

<a name="Selecting"></a>

## Selecting an Encoding Class

If you have the opportunity to choose the encoding to be used by your application, you should use a Unicode encoding, preferably either [System.Text.UTF8Encoding](https://learn.microsoft.com/search/?terms=System.Text.UTF8Encoding) or [System.Text.UnicodeEncoding](https://learn.microsoft.com/search/?terms=System.Text.UnicodeEncoding). (.NET also supports a third Unicode encoding, [System.Text.UTF32Encoding](https://learn.microsoft.com/search/?terms=System.Text.UTF32Encoding).)

If you are planning to use an ASCII encoding ([System.Text.ASCIIEncoding](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding)), choose [System.Text.UTF8Encoding](https://learn.microsoft.com/search/?terms=System.Text.UTF8Encoding) instead. The two encodings are identical for the ASCII character set, but [System.Text.UTF8Encoding](https://learn.microsoft.com/search/?terms=System.Text.UTF8Encoding) has the following advantages:

- It can represent every Unicode character, whereas [System.Text.ASCIIEncoding](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding) supports only the Unicode character values between U+0000 and U+007F.

- It provides error detection and better security.

- It has been tuned to be as fast as possible and should be faster than any other encoding. Even for content that is entirely ASCII, operations performed with [System.Text.UTF8Encoding](https://learn.microsoft.com/search/?terms=System.Text.UTF8Encoding) are faster than operations performed with [System.Text.ASCIIEncoding](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding).

You should consider using [System.Text.ASCIIEncoding](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding) only for legacy applications. However, even for legacy applications, [System.Text.UTF8Encoding](https://learn.microsoft.com/search/?terms=System.Text.UTF8Encoding) might be a better choice for the following reasons (assuming default settings):

- If your application has content that is not strictly ASCII and encodes it with [System.Text.ASCIIEncoding](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding), each non-ASCII character encodes as a question mark (?). If the application then decodes this data, the information is lost.

- If your application has content that is not strictly ASCII and encodes it with [System.Text.UTF8Encoding](https://learn.microsoft.com/search/?terms=System.Text.UTF8Encoding), the result seems unintelligible if interpreted as ASCII. However, if the application then uses a UTF-8 decoder to decode this data, the data performs a round trip successfully.

In a web application, characters sent to the client in response to a web request should reflect the encoding used on the client. In most cases, you should set the [System.Web.HttpResponse.ContentEncoding](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse.ContentEncoding) property to the value returned by the [System.Web.HttpRequest.ContentEncoding](https://learn.microsoft.com/search/?terms=System.Web.HttpRequest.ContentEncoding) property to display text in the encoding that the user expects.

<a name="Using"></a>

## Using an Encoding Object

An encoder converts a string of characters (most commonly, Unicode characters) to its numeric (byte) equivalent. For example, you might use an ASCII encoder to convert Unicode characters to ASCII so that they can be displayed at the console. To perform the conversion, you call the [System.Text.Encoding.GetBytes*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetBytes*) method. If you want to determine how many bytes are needed to store the encoded characters before performing the encoding, you can call the [System.Text.Encoding.GetByteCount*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetByteCount*) method.

The following example uses a single byte array to encode strings in two separate operations. It maintains an index that indicates the starting position in the byte array for the next set of ASCII-encoded bytes. It calls the [System.Text.ASCIIEncoding.GetByteCount%28System.String%29](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding.GetByteCount%2528System.String%2529) method to ensure that the byte array is large enough to accommodate the encoded string. It then calls the [System.Text.ASCIIEncoding.GetBytes%28System.String%2CSystem.Int32%2CSystem.Int32%2CSystem.Byte%5B%5D%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding.GetBytes%2528System.String%252CSystem.Int32%252CSystem.Int32%252CSystem.Byte%255B%255D%252CSystem.Int32%2529) method to encode the characters in the string.

[Conceptual.Encoding#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/getbytes1.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/getbytes1.cs.md)
[Conceptual.Encoding#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/getbytes1.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/getbytes1.vb.md)

A decoder converts a byte array that reflects a particular character encoding into a set of characters, either in a character array or in a string. To decode a byte array into a character array, you call the [System.Text.Encoding.GetChars*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetChars*) method. To decode a byte array into a string, you call the [System.Text.Encoding.GetString*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetString*) method. If you want to determine how many characters are needed to store the decoded bytes before performing the decoding, you can call the [System.Text.Encoding.GetCharCount*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetCharCount*) method.

The following example encodes three strings and then decodes them into a single array of characters. It maintains an index that indicates the starting position in the character array for the next set of decoded characters. It calls the [System.Text.ASCIIEncoding.GetCharCount*](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding.GetCharCount*) method to ensure that the character array is large enough to accommodate all the decoded characters. It then calls the [System.Text.ASCIIEncoding.GetChars%28System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.Char%5B%5D%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding.GetChars%2528System.Byte%255B%255D%252CSystem.Int32%252CSystem.Int32%252CSystem.Char%255B%255D%252CSystem.Int32%2529) method to decode the byte array.

[Conceptual.Encoding#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/getchars1.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/getchars1.cs.md)
[Conceptual.Encoding#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/getchars1.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/getchars1.vb.md)

The encoding and decoding methods of a class derived from [System.Text.Encoding](https://learn.microsoft.com/search/?terms=System.Text.Encoding) are designed to work on a complete set of data; that is, all the data to be encoded or decoded is supplied in a single method call. However, in some cases, data is available in a stream, and the data to be encoded or decoded may be available only from separate read operations. This requires the encoding or decoding operation to remember any saved state from its previous invocation. Methods of classes derived from [System.Text.Encoder](https://learn.microsoft.com/search/?terms=System.Text.Encoder) and [System.Text.Decoder](https://learn.microsoft.com/search/?terms=System.Text.Decoder) are able to handle encoding and decoding operations that span multiple method calls.

An [System.Text.Encoder](https://learn.microsoft.com/search/?terms=System.Text.Encoder) object for a particular encoding is available from that encoding's [System.Text.Encoding.GetEncoder](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncoder) property. A [System.Text.Decoder](https://learn.microsoft.com/search/?terms=System.Text.Decoder) object for a particular encoding is available from that encoding's [System.Text.Encoding.GetDecoder](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetDecoder) property. For decoding operations, note that classes derived from [System.Text.Decoder](https://learn.microsoft.com/search/?terms=System.Text.Decoder) include a [System.Text.Decoder.GetChars*](https://learn.microsoft.com/search/?terms=System.Text.Decoder.GetChars*) method, but they do not have a method that corresponds to [System.Text.Encoding.GetString*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetString*).

The following example illustrates the difference between using the [System.Text.Encoding.GetString*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetString*) and [System.Text.Decoder.GetChars*](https://learn.microsoft.com/search/?terms=System.Text.Decoder.GetChars*) methods for decoding a Unicode byte array. The example encodes a string that contains some Unicode characters to a file, and then uses the two decoding methods to decode them ten bytes at a time. Because a surrogate pair occurs in the tenth and eleventh bytes, it is decoded in separate method calls. As the output shows, the [System.Text.Encoding.GetString*](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetString*) method is not able to correctly decode the bytes and instead replaces them with U+FFFD (REPLACEMENT CHARACTER). On the other hand, the [System.Text.Decoder.GetChars*](https://learn.microsoft.com/search/?terms=System.Text.Decoder.GetChars*) method is able to successfully decode the byte array to get the original string.

[Conceptual.Encoding#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/stream1.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/stream1.cs.md)
[Conceptual.Encoding#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/stream1.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/stream1.vb.md)

<a name="FallbackStrategy"></a>

## Choosing a Fallback Strategy

When a method tries to encode or decode a character but no mapping exists, it must implement a fallback strategy that determines how the failed mapping should be handled. There are three types of fallback strategies:

- Best-fit fallback

- Replacement fallback

- Exception fallback

> **Important:**
> The most common problems in encoding operations occur when a Unicode character cannot be mapped to a particular code page encoding. The most common problems in decoding operations occur when invalid byte sequences cannot be translated into valid Unicode characters. For these reasons, you should know which fallback strategy a particular encoding object uses. Whenever possible, you should specify the fallback strategy used by an encoding object when you instantiate the object.

<a name="BestFit"></a>

### Best-Fit Fallback

When a character does not have an exact match in the target encoding, the encoder can try to map it to a similar character. (Best-fit fallback is mostly an encoding rather than a decoding issue. There are very few code pages that contain characters that cannot be successfully mapped to Unicode.) Best-fit fallback is the default for code page and double-byte character set encodings that are retrieved by the [System.Text.Encoding.GetEncoding%28System.Int32%29](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncoding%2528System.Int32%2529) and [System.Text.Encoding.GetEncoding%28System.String%29](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncoding%2528System.String%2529) overloads.

> **Note:**
> In theory, the Unicode encoding classes provided in .NET ([System.Text.UTF8Encoding](https://learn.microsoft.com/search/?terms=System.Text.UTF8Encoding), [System.Text.UnicodeEncoding](https://learn.microsoft.com/search/?terms=System.Text.UnicodeEncoding), and [System.Text.UTF32Encoding](https://learn.microsoft.com/search/?terms=System.Text.UTF32Encoding)) support every character in every character set, so they can be used to eliminate best-fit fallback issues.

Best-fit strategies vary for different code pages. For example, for some code pages, full-width Latin characters map to the more common half-width Latin characters. For other code pages, this mapping is not made. Even under an aggressive best-fit strategy, there is no imaginable fit for some characters in some encodings. For example, a Chinese ideograph has no reasonable mapping to code page 1252. In this case, a replacement string is used. By default, this string is just a single QUESTION MARK (U+003F).

> **Note:**
> Best-fit strategies are not documented in detail. However, several code pages are documented at the [Unicode Consortium's](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/) website. Please review the **readme.txt** file in that folder for a description of how to interpret the mapping files.

The following example uses code page 1252 (the Windows code page for Western European languages) to illustrate best-fit mapping and its drawbacks. The [System.Text.Encoding.GetEncoding%28System.Int32%29](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncoding%2528System.Int32%2529) method is used to retrieve an encoding object for code page 1252. By default, it uses a best-fit mapping for Unicode characters that it does not support. The example instantiates a string that contains three non-ASCII characters - CIRCLED LATIN CAPITAL LETTER S (U+24C8), SUPERSCRIPT FIVE (U+2075), and INFINITY (U+221E) - separated by spaces. As the output from the example shows, when the string is encoded, the three original non-space characters are replaced by QUESTION MARK (U+003F), DIGIT FIVE (U+0035), and DIGIT EIGHT (U+0038). DIGIT EIGHT is a particularly poor replacement for the unsupported INFINITY character, and QUESTION MARK indicates that no mapping was available for the original character.

[Conceptual.Encoding#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/bestfit1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/bestfit1.cs.md)
[Conceptual.Encoding#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/bestfit1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/bestfit1.vb.md)

Best-fit mapping is the default behavior for an [System.Text.Encoding](https://learn.microsoft.com/search/?terms=System.Text.Encoding) object that encodes Unicode data into code page data, and there are legacy applications that rely on this behavior. However, most new applications should avoid best-fit behavior for security reasons. For example, applications should not put a domain name through a best-fit encoding.

> **Note:**
> You can also implement a custom best-fit fallback mapping for an encoding. For more information, see the [Implementing a Custom Fallback Strategy](character-encoding.md#Custom) section.

If best-fit fallback is the default for an encoding object, you can choose another fallback strategy when you retrieve an [System.Text.Encoding](https://learn.microsoft.com/search/?terms=System.Text.Encoding) object by calling the [System.Text.Encoding.GetEncoding%28System.Int32%2CSystem.Text.EncoderFallback%2CSystem.Text.DecoderFallback%29](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncoding%2528System.Int32%252CSystem.Text.EncoderFallback%252CSystem.Text.DecoderFallback%2529) or [System.Text.Encoding.GetEncoding%28System.String%2CSystem.Text.EncoderFallback%2CSystem.Text.DecoderFallback%29](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncoding%2528System.String%252CSystem.Text.EncoderFallback%252CSystem.Text.DecoderFallback%2529) overload. The following section includes an example that replaces each character that cannot be mapped to code page 1252 with an asterisk (\*).

[Conceptual.Encoding#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/bestfit1a.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/bestfit1a.cs.md)
[Conceptual.Encoding#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/bestfit1a.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/bestfit1a.vb.md)

<a name="Replacement"></a>

### Replacement Fallback

When a character does not have an exact match in the target scheme, but there is no appropriate character that it can be mapped to, the application can specify a replacement character or string. This is the default behavior for the Unicode decoder, which replaces any two-byte sequence that it cannot decode with REPLACEMENT_CHARACTER (U+FFFD). It is also the default behavior of the [System.Text.ASCIIEncoding](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding) class, which replaces each character that it cannot encode or decode with a question mark. The following example illustrates character replacement for the Unicode string from the previous example. As the output shows, each character that cannot be decoded into an ASCII byte value is replaced by 0x3F, which is the ASCII code for a question mark.

[Conceptual.Encoding#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/replacementascii.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/replacementascii.cs.md)
[Conceptual.Encoding#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/replacementascii.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/replacementascii.vb.md)

.NET includes the [System.Text.EncoderReplacementFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderReplacementFallback) and [System.Text.DecoderReplacementFallback](https://learn.microsoft.com/search/?terms=System.Text.DecoderReplacementFallback) classes, which substitute a replacement string if a character does not map exactly in an encoding or decoding operation. By default, this replacement string is a question mark, but you can call a class constructor overload to choose a different string. Typically, the replacement string is a single character, although this is not a requirement. The following example changes the behavior of the code page 1252 encoder by instantiating an [System.Text.EncoderReplacementFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderReplacementFallback) object that uses an asterisk (\*) as a replacement string.

[Conceptual.Encoding#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/bestfit1a.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/bestfit1a.cs.md)
[Conceptual.Encoding#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/bestfit1a.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/bestfit1a.vb.md)

> **Note:**
> You can also implement a replacement class for an encoding. For more information, see the [Implementing a Custom Fallback Strategy](character-encoding.md#Custom) section.

In addition to QUESTION MARK (U+003F), the Unicode REPLACEMENT CHARACTER (U+FFFD) is commonly used as a replacement string, particularly when decoding byte sequences that cannot be successfully translated into Unicode characters. However, you are free to choose any replacement string, and it can contain multiple characters.

<a name="Exception"></a>

### Exception Fallback

Instead of providing a best-fit fallback or a replacement string, an encoder can throw an [System.Text.EncoderFallbackException](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackException) if it is unable to encode a set of characters, and a decoder can throw a [System.Text.DecoderFallbackException](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackException) if it is unable to decode a byte array. To throw an exception in encoding and decoding operations, you supply an [System.Text.EncoderExceptionFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderExceptionFallback) object and a [System.Text.DecoderExceptionFallback](https://learn.microsoft.com/search/?terms=System.Text.DecoderExceptionFallback) object, respectively, to the [System.Text.Encoding.GetEncoding%28System.String%2CSystem.Text.EncoderFallback%2CSystem.Text.DecoderFallback%29](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncoding%2528System.String%252CSystem.Text.EncoderFallback%252CSystem.Text.DecoderFallback%2529) method. The following example illustrates exception fallback with the [System.Text.ASCIIEncoding](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding) class.

[Conceptual.Encoding#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/exceptionascii.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/exceptionascii.cs.md)
[Conceptual.Encoding#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/exceptionascii.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/exceptionascii.vb.md)

> **Note:**
> You can also implement a custom exception handler for an encoding operation. For more information, see the [Implementing a Custom Fallback Strategy](character-encoding.md#Custom) section.

The [System.Text.EncoderFallbackException](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackException) and [System.Text.DecoderFallbackException](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackException) objects provide the following information about the condition that caused the exception:

- The [System.Text.EncoderFallbackException](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackException) object includes an [System.Text.EncoderFallbackException.IsUnknownSurrogate*](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackException.IsUnknownSurrogate*) method, which indicates whether the character or characters that cannot be encoded represent an unknown surrogate pair (in which case, the method returns `true`) or an unknown single character (in which case, the method returns `false`). The characters in the surrogate pair are available from the [System.Text.EncoderFallbackException.CharUnknownHigh*](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackException.CharUnknownHigh*) and [System.Text.EncoderFallbackException.CharUnknownLow](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackException.CharUnknownLow) properties. The unknown single character is available from the [System.Text.EncoderFallbackException.CharUnknown](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackException.CharUnknown) property. The [System.Text.EncoderFallbackException.Index](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackException.Index) property indicates the position in the string at which the first character that could not be encoded was found.

- The [System.Text.DecoderFallbackException](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackException) object includes a [System.Text.DecoderFallbackException.BytesUnknown](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackException.BytesUnknown) property that returns an array of bytes that cannot be decoded. The [System.Text.DecoderFallbackException.Index](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackException.Index) property indicates the starting position of the unknown bytes.

Although the [System.Text.EncoderFallbackException](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackException) and [System.Text.DecoderFallbackException](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackException) objects provide adequate diagnostic information about the exception, they do not provide access to the encoding or decoding buffer. Therefore, they do not allow invalid data to be replaced or corrected within the encoding or decoding method.

<a name="Custom"></a>

## Implementing a Custom Fallback Strategy

In addition to the best-fit mapping that is implemented internally by code pages, .NET includes the following classes for implementing a fallback strategy:

- Use [System.Text.EncoderReplacementFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderReplacementFallback) and [System.Text.EncoderReplacementFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.EncoderReplacementFallbackBuffer) to replace characters in encoding operations.

- Use [System.Text.DecoderReplacementFallback](https://learn.microsoft.com/search/?terms=System.Text.DecoderReplacementFallback) and [System.Text.DecoderReplacementFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.DecoderReplacementFallbackBuffer) to replace characters in decoding operations.

- Use [System.Text.EncoderExceptionFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderExceptionFallback) and [System.Text.EncoderExceptionFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.EncoderExceptionFallbackBuffer) to throw an [System.Text.EncoderFallbackException](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackException) when a character cannot be encoded.

- Use [System.Text.DecoderExceptionFallback](https://learn.microsoft.com/search/?terms=System.Text.DecoderExceptionFallback) and [System.Text.DecoderExceptionFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.DecoderExceptionFallbackBuffer) to throw a [System.Text.DecoderFallbackException](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackException) when a character cannot be decoded.

In addition, you can implement a custom solution that uses best-fit fallback, replacement fallback, or exception fallback, by following these steps:

1. Derive a class from [System.Text.EncoderFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallback) for encoding operations, and from [System.Text.DecoderFallback](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallback) for decoding operations.

2. Derive a class from [System.Text.EncoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer) for encoding operations, and from [System.Text.DecoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackBuffer) for decoding operations.

3. For exception fallback, if the predefined [System.Text.EncoderFallbackException](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackException) and [System.Text.DecoderFallbackException](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackException) classes do not meet your needs, derive a class from an exception object such as [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) or [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException).

### Deriving from EncoderFallback or DecoderFallback

To implement a custom fallback solution, you must create a class that inherits from [System.Text.EncoderFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallback) for encoding operations, and from [System.Text.DecoderFallback](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallback) for decoding operations. Instances of these classes are passed to the [System.Text.Encoding.GetEncoding%28System.String%2CSystem.Text.EncoderFallback%2CSystem.Text.DecoderFallback%29](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncoding%2528System.String%252CSystem.Text.EncoderFallback%252CSystem.Text.DecoderFallback%2529) method and serve as the intermediary between the encoding class and the fallback implementation.

When you create a custom fallback solution for an encoder or decoder, you must implement the following members:

- The [System.Text.EncoderFallback.MaxCharCount*](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallback.MaxCharCount*) or [System.Text.DecoderFallback.MaxCharCount](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallback.MaxCharCount) property, which returns the maximum possible number of characters that the best-fit, replacement, or exception fallback can return to replace a single character. For a custom exception fallback, its value is zero.

- The [System.Text.EncoderFallback.CreateFallbackBuffer*](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallback.CreateFallbackBuffer*) or [System.Text.DecoderFallback.CreateFallbackBuffer*](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallback.CreateFallbackBuffer*) method, which returns your custom [System.Text.EncoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer) or [System.Text.DecoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackBuffer) implementation. The method is called by the encoder when it encounters the first character that it is unable to successfully encode, or by the decoder when it encounters the first byte that it is unable to successfully decode.

### Deriving from EncoderFallbackBuffer or DecoderFallbackBuffer

To implement a custom fallback solution, you must also create a class that inherits from [System.Text.EncoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer) for encoding operations, and from [System.Text.DecoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackBuffer) for decoding operations. Instances of these classes are returned by the [System.Text.EncoderFallback.CreateFallbackBuffer*](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallback.CreateFallbackBuffer*) method of the [System.Text.EncoderFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallback) and [System.Text.DecoderFallback](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallback) classes. The [System.Text.EncoderFallback.CreateFallbackBuffer*](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallback.CreateFallbackBuffer*) method is called by the encoder when it encounters the first character that it is not able to encode, and the [System.Text.DecoderFallback.CreateFallbackBuffer*](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallback.CreateFallbackBuffer*) method is called by the decoder when it encounters one or more bytes that it is not able to decode. The [System.Text.EncoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer) and [System.Text.DecoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackBuffer) classes provide the fallback implementation. Each instance represents a buffer that contains the fallback characters that will replace the character that cannot be encoded or the byte sequence that cannot be decoded.

When you create a custom fallback solution for an encoder or decoder, you must implement the following members:

- The [System.Text.EncoderFallbackBuffer.Fallback*](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.Fallback*) or [System.Text.DecoderFallbackBuffer.Fallback*](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackBuffer.Fallback*) method. [System.Text.EncoderFallbackBuffer.Fallback*](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.Fallback*) is called by the encoder to provide the fallback buffer with information about the character that it cannot encode. Because the character to be encoded may be a surrogate pair, this method is overloaded. One overload is passed the character to be encoded and its index in the string. The second overload is passed the high and low surrogate along with its index in the string. The [System.Text.DecoderFallbackBuffer.Fallback*](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackBuffer.Fallback*) method is called by the decoder to provide the fallback buffer with information about the bytes that it cannot decode. This method is passed an array of bytes that it cannot decode, along with the index of the first byte. The fallback method should return `true` if the fallback buffer can supply a best-fit or replacement character or characters; otherwise, it should return `false`. For an exception fallback, the fallback method should throw an exception.

- The [System.Text.EncoderFallbackBuffer.GetNextChar*](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.GetNextChar*) or [System.Text.DecoderFallbackBuffer.GetNextChar*](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackBuffer.GetNextChar*) method, which is called repeatedly by the encoder or decoder to get the next character from the fallback buffer. When all fallback characters have been returned, the method should return U+0000.

- The [System.Text.EncoderFallbackBuffer.Remaining*](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.Remaining*) or [System.Text.DecoderFallbackBuffer.Remaining](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackBuffer.Remaining) property, which returns the number of characters remaining in the fallback buffer.

- The [System.Text.EncoderFallbackBuffer.MovePrevious*](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.MovePrevious*) or [System.Text.DecoderFallbackBuffer.MovePrevious*](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackBuffer.MovePrevious*) method, which moves the current position in the fallback buffer to the previous character.

- The [System.Text.EncoderFallbackBuffer.Reset*](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer.Reset*) or [System.Text.DecoderFallbackBuffer.Reset*](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackBuffer.Reset*) method, which reinitializes the fallback buffer.

If the fallback implementation is a best-fit fallback or a replacement fallback, the classes derived from [System.Text.EncoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer) and [System.Text.DecoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallbackBuffer) also maintain two private instance fields: the exact number of characters in the buffer; and the index of the next character in the buffer to return.

### An EncoderFallback Example

An earlier example used replacement fallback to replace Unicode characters that did not correspond to ASCII characters with an asterisk (\*). The following example uses a custom best-fit fallback implementation instead to provide a better mapping of non-ASCII characters.

The following code defines a class named `CustomMapper` that is derived from [System.Text.EncoderFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallback) to handle the best-fit mapping of non-ASCII characters. Its `CreateFallbackBuffer` method returns a `CustomMapperFallbackBuffer` object, which provides the [System.Text.EncoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer) implementation. The `CustomMapper` class uses a [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) object to store the mappings of unsupported Unicode characters (the key value) and their corresponding 8-bit characters (which are stored in two consecutive bytes in a 64-bit integer). To make this mapping available to the fallback buffer, the `CustomMapper` instance is passed as a parameter to the `CustomMapperFallbackBuffer` class constructor. Because the longest mapping is the string "INF" for the Unicode character U+221E, the `MaxCharCount` property returns 3.

[Conceptual.Encoding#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/custom1.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/custom1.cs.md)
[Conceptual.Encoding#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/custom1.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/custom1.vb.md)

The following code defines the `CustomMapperFallbackBuffer` class, which is derived from [System.Text.EncoderFallbackBuffer](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallbackBuffer). The dictionary that contains best-fit mappings and that is defined in the `CustomMapper` instance is available from its class constructor. Its `Fallback` method returns `true` if any of the Unicode characters that the ASCII encoder cannot encode are defined in the mapping dictionary; otherwise, it returns `false`. For each fallback, the private `count` variable indicates the number of characters that remain to be returned, and the private `index` variable indicates the position in the string buffer, `charsToReturn`, of the next character to return.

[Conceptual.Encoding#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/custom1.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/custom1.cs.md)
[Conceptual.Encoding#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/custom1.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/custom1.vb.md)

The following code then instantiates the `CustomMapper` object and passes an instance of it to the [System.Text.Encoding.GetEncoding%28System.String%2CSystem.Text.EncoderFallback%2CSystem.Text.DecoderFallback%29](https://learn.microsoft.com/search/?terms=System.Text.Encoding.GetEncoding%2528System.String%252CSystem.Text.EncoderFallback%252CSystem.Text.DecoderFallback%2529) method. The output indicates that the best-fit fallback implementation successfully handles the three non-ASCII characters in the original string.

[Conceptual.Encoding#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/custom1.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.encoding/cs/custom1.cs.md)
[Conceptual.Encoding#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/custom1.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.encoding/vb/custom1.vb.md)

## See also

- [Introduction to character encoding in .NET](character-encoding-introduction.md)
- [System.Text.Encoder](https://learn.microsoft.com/search/?terms=System.Text.Encoder)
- [System.Text.Decoder](https://learn.microsoft.com/search/?terms=System.Text.Decoder)
- [System.Text.DecoderFallback](https://learn.microsoft.com/search/?terms=System.Text.DecoderFallback)
- [System.Text.Encoding](https://learn.microsoft.com/search/?terms=System.Text.Encoding)
- [System.Text.EncoderFallback](https://learn.microsoft.com/search/?terms=System.Text.EncoderFallback)
- [Globalization and localization](../../core/extensions/globalization-and-localization.md)
