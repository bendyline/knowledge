---
description: "Learn more about: Parsing text files with the TextFieldParser object (Visual Basic)"
title: "Parsing text files with the TextFieldParser object"
ms.date: 07/20/2015
helpviewer_keywords:
  - "TextFieldParser object, using"
  - "I/O [Visual Basic], parsing files"
  - "files [Visual Basic], parsing"
ms.assetid: fc31d6e6-af0c-403f-8a00-d556b2c57567
---
# Parsing text files with the TextFieldParser object (Visual Basic)

The `TextFieldParser` object allows you to parse and process very large file that are structured as delimited-width columns of text, such as log files or legacy database information. Parsing a text file with `TextFieldParser` is similar to iterating over a text file, while the parse method to extract fields of text is similar to string manipulation methods used to tokenize delimited strings.

## Parsing different types of text files

 Text files may have fields of various width, delimited by a character such as a comma or a tab space. Define `TextFieldType` and the delimiter, as in the following example, which uses the `SetDelimiters` method to define a tab-delimited text file:

 [VbVbalrTextFieldParser#21 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrTextFieldParser/VB/Class1.vb#21)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrTextFieldParser/VB/Class1.vb.md)

 Other text files may have field widths that are fixed. In such cases, you need to define the `TextFieldType` as `FixedWidth` and define the widths of each field, as in the following example. This example uses the `SetFieldWidths` method to define the columns of text: the first column is 5 characters wide, the second is 10, the third is 11, and the fourth is of variable width.

 [VbVbalrTextFieldParser#22 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrTextFieldParser/VB/Class1.vb#22)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrTextFieldParser/VB/Class1.vb.md)

 Once the format is defined, you can loop through the file, using the `ReadFields` method to process each line in turn.

 If a field does not match the specified format, a [Microsoft.VisualBasic.FileIO.MalformedLineException](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.MalformedLineException) exception is thrown. When such exceptions are thrown, the `ErrorLine` and `ErrorLineNumber` properties hold the text causing the exception and the line number of that text.

## Parsing files with multiple formats

 The `PeekChars` method of the `TextFieldParser` object can be used to check each field before reading it, allowing you to define multiple formats for the fields and react accordingly. For more information, see [How to: Read From Text Files with Multiple Formats](how-to-read-from-text-files-with-multiple-formats.md).

## See also

- [Microsoft.VisualBasic.FileIO.FileSystem.OpenTextFieldParser*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.FileSystem.OpenTextFieldParser*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.PeekChars*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.PeekChars*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.ReadFields*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.ReadFields*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.CommentTokens*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.CommentTokens*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.Delimiters*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.Delimiters*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.ErrorLine*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.ErrorLine*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.ErrorLineNumber*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.ErrorLineNumber*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.FieldWidths*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.FieldWidths*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.HasFieldsEnclosedInQuotes*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.HasFieldsEnclosedInQuotes*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.LineNumber*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.LineNumber*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.TextFieldType*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.TextFieldType*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.TrimWhiteSpace*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.TrimWhiteSpace*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.SetDelimiters*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.SetDelimiters*)
- [Microsoft.VisualBasic.FileIO.TextFieldParser.SetFieldWidths*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser.SetFieldWidths*)
