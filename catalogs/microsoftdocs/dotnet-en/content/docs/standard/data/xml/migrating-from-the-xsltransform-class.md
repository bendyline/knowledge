---
description: "Learn more about: Migrating From the XslTransform Class"
title: "Migrating From the XslTransform Class"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 9404d758-679f-4ffb-995d-3d07d817659e
---

# Migrating From the XslTransform Class

The XSLT architecture was redesigned in the Visual Studio 2005 release. The [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class was replaced by the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class.

The following sections describe some of the main differences between the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) and the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) classes.

## Performance

The [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class includes many performance improvements. The new XSLT processor compiles the XSLT style sheet down to a common intermediate format, similar to what the common language runtime (CLR) does for other programming languages. Once the style sheet is compiled, it can be cached and reused.

The [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class also includes other optimizations that make it much faster than the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class.

> **Note:**
> Although the overall performance of the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class is better than the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class, the [System.Xml.Xsl.XslCompiledTransform.Load*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Load*) method of the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class might perform more slowly than the [System.Xml.Xsl.XslTransform.Load*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform.Load*) method of the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class the first time it is called on a transformation. This is because the XSLT file must be compiled before it is loaded. For more information, see the following blog post: [XslCompiledTransform Slower than XslTransform?](https://learn.microsoft.com/archive/blogs/antosha/xslcompiledtransform-slower-than-xsltransform)

## Security

By default, the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class disables support for the XSLT `document()` function and embedded scripting. These features can be enabled by creating an [System.Xml.Xsl.XsltSettings](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltSettings) object that has the features enabled and passing it to the [System.Xml.Xsl.XslCompiledTransform.Load*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Load*) method. The following example shows how to enable scripting and perform an XSLT transformation.

> **Note:**
> Script blocks are supported only in .NET Framework. They are _not_ supported on .NET Core or .NET 5 or later.

[XML_Migration#16 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#16)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
[XML_Migration#16 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#16)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

For more information, see [XSLT Security Considerations](xslt-security-considerations.md).

## New Features

### Temporary Files

Temporary files are sometimes generated during XSLT processing. If a style sheet contains script blocks, or if it is compiled with the debug setting set to true, temporary files may be created in the %TEMP% folder. There may be instances when some temporary files are not deleted due to timing issues. For example, if the files are in use by the current AppDomain or by the debugger, the finalizer of the [System.CodeDom.Compiler.TempFileCollection](https://learn.microsoft.com/search/?terms=System.CodeDom.Compiler.TempFileCollection) object will not be able to remove them.

The [System.Xml.Xsl.XslCompiledTransform.TemporaryFiles](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.TemporaryFiles) property can be used for additional cleanup to make sure that all temporary files are removed from the client.

### Support for the xsl:output Element and XmlWriter

The [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class ignored `xsl:output` settings when the transform output was sent to an [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object. The [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class has an [System.Xml.Xsl.XslCompiledTransform.OutputSettings](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.OutputSettings) property that returns an [System.Xml.XmlWriterSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriterSettings) object containing the output information derived from the `xsl:output` element of the style sheet. The [System.Xml.XmlWriterSettings](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriterSettings) object is used to create an [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter) object with the correct settings that can be passed to the [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method. The following C# code illustrates this behavior:

```csharp
// Create the XslTransform object and load the style sheet.
XslCompiledTransform xslt = new XslCompiledTransform();
xslt.Load(stylesheet);

// Load the file to transform.
XPathDocument doc = new XPathDocument(filename);

// Create the writer.
XmlWriter writer = XmlWriter.Create(Console.Out, xslt.OutputSettings);

// Transform the file and send the output to the console.
xslt.Transform(doc, writer);
writer.Close();
```

### Debug Option

The [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class can generate debug information, which enables you to debug the style sheet with the Microsoft Visual Studio Debugger. See [System.Xml.Xsl.XslCompiledTransform.%23ctor%28System.Boolean%29](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.%2523ctor%2528System.Boolean%2529) for more information.

## Behavioral Differences

### Transforming to an XmlReader

The [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class has several Transform overloads that return transformation results as an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object. These overloads can be used to load the transformation results into an in-memory representation (such as [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) or [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument)) without incurring the overhead of serialization and deserialization of the resulting XML tree. The following C# code shows how to load the transformation results into an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object.

```csharp
// Load the style sheet
XslTransform xslt = new XslTransform();
xslt.Load("MyStylesheet.xsl");

// Transform input document to XmlDocument for additional processing
XmlDocument doc = new XmlDocument();
doc.Load(xslt.Transform(input, (XsltArgumentList)null));
```

The [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class does not support transforming to an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object. However, you can do something similar by using the [System.Xml.XPath.XPathNavigator.CreateNavigator*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator.CreateNavigator*) method to load the resulting XML tree directly from an [System.Xml.XmlWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlWriter). The following C# code shows how to accomplish the same task using [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform).

```csharp
// Transform input document to XmlDocument for additional processing
XmlDocument doc = new XmlDocument();
using (XmlWriter writer = doc.CreateNavigator().AppendChild()) {
    xslt.Transform(input, (XsltArgumentList)null, writer);
}
```

### Discretionary Behavior

The W3C XSL Transformations (XSLT) Version 1.0 Recommendation includes areas in which the implementation provider may decide how to handle a situation. These areas are considered to be discretionary behavior. There are several areas where the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) behaves differently than the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class. For more information, see [Recoverable XSLT Errors](recoverable-xslt-errors.md).

### Extension Objects and Script Functions

[System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) introduces two new restrictions on the use of script functions:

- Only public methods may be called from XPath expressions.

- Overloads are distinguishable from each other based on the number of arguments. If more than one overload has the same number of arguments, an exception will be raised.

In [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform), a binding (method name lookup) to script functions occurs at compile time, and style sheets that worked with XslTransform may cause an exception when they are loaded with [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform).

[System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) supports having `msxsl:using` and `msxsl:assembly` child elements within the `msxsl:script` element. The `msxsl:using` and `msxsl:assembly` elements are used to declare additional namespaces and assemblies for use in the script block. See [Script Blocks Using msxsl:script](script-blocks-using-msxsl-script.md) for more information.

[System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) prohibits extension objects that have multiple overloads with the same number of arguments.

### MSXML Functions

Support for additional MSXML functions have been added to the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class. The following list describes new or improved functionality:

- msxsl:node-set: [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) required the argument of the [node-set Function](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms256197\(v=vs.100\)) function to be a result tree fragment. The [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class does not have this requirement.

- msxsl:version: This function is supported in [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform).

- XPath extension functions: The [ms:string-compare Function](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms256114\(v=vs.100\)), [ms:utc Function](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms256474\(v=vs.100\)), [ms:namespace-uri Function](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms256231\(v=vs.100\)), [ms:local-name Function](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms256055\(v=vs.100\)), [ms:number Function](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms256155\(v=vs.100\)), [ms:format-date Function](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms256099\(v=vs.100\)), and [ms:format-time Function](https://learn.microsoft.com/previous-versions/dotnet/netframework-4.0/ms256467\(v=vs.100\)) functions are now supported.

- Schema-related XPath extension functions: These functions are not supported natively by [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform). However, they can be implemented as extension functions.

## See also

- [XSLT Transformations](xslt-transformations.md)
- [Using the XslCompiledTransform Class](using-the-xslcompiledtransform-class.md)
