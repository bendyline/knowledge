---
description: "Learn more about: How to: Write characters to a string"
title: "How to: Write characters to a string"
ms.date: "01/21/2019"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "data streams, writing characters to string"
  - "writing characters to strings"
  - "streams, writing characters to strings"
  - "I/O [.NET], writing characters to strings"
ms.assetid: 1222cbeb-0760-44bf-9888-914a2a37174b
---
# How to: Write characters to a string

The following code examples write characters synchronously or asynchronously from a character array into a string.

## Example: Write characters synchronously in a console app

 The following example uses a [System.IO.StringWriter](https://learn.microsoft.com/search/?terms=System.IO.StringWriter) to write five characters synchronously to a [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) object.

 [Conceptual.StringBuilder#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/example2.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/example2.cs.md)
 [Conceptual.StringBuilder#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/example2.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/example2.vb.md)

## Example: Write characters asynchronously in a WPF app

 The next example is the code behind a WPF app. On window load, the example asynchronously reads all characters from a [System.Windows.Controls.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TextBox) control and stores them in an array. It then asynchronously writes each letter or white-space character to a separate line of a [System.Windows.Controls.TextBlock](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TextBlock) control.

 [StreamReaderWriter (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Wpf/StringReaderWriter/MainWindow.xaml.cs)](../../../_code/samples/snippets/csharp/VS_Snippets_Wpf/StringReaderWriter/MainWindow.xaml.cs.md)
 [StreamReaderWriter (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Wpf/StringReaderWriter/MainWindow.xaml.vb)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Wpf/StringReaderWriter/MainWindow.xaml.vb.md)

## See also

- [System.IO.StringWriter](https://learn.microsoft.com/search/?terms=System.IO.StringWriter)
- [System.IO.StringWriter.Write*](https://learn.microsoft.com/search/?terms=System.IO.StringWriter.Write*)
- [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder)
- [File and stream I/O](index.md)
- [Asynchronous file I/O](asynchronous-file-i-o.md)
- [How to: Enumerate directories and files](how-to-enumerate-directories-and-files.md)
- [How to: Read and write to a newly created data file](how-to-read-and-write-to-a-newly-created-data-file.md)
- [How to: Open and append to a log file](how-to-open-and-append-to-a-log-file.md)
- [How to: Read text from a file](how-to-read-text-from-a-file.md)
- [How to: Write text to a file](how-to-write-text-to-a-file.md)
- [How to: Read characters from a string](how-to-read-characters-from-a-string.md)
