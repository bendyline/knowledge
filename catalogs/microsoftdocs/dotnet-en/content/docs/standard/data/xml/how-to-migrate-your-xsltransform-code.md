---
description: "Learn more about: How to: Migrate Your XslTransform Code"
title: "How to: Migrate Your XslTransform Code"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 910beb2f-cfb3-4e8e-9936-f7e0c5f4064a
---
# How to: Migrate Your XslTransform Code

The [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class replaced the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class. This newer class was designed to be very similar to [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform). Style sheets are compiled using the [System.Xml.Xsl.XslCompiledTransform.Load*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Load*) method. Transforms are executed using the [System.Xml.Xsl.XslCompiledTransform.Transform*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform.Transform*) method.

The following procedures show common XSLT tasks, and compare the code using the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class versus the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class.

## To transform a file and output to a URI

- Code using the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class.

     [XML_Migration#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
     [XML_Migration#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

- Code using the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class.

     [XML_Migration#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
     [XML_Migration#10 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

## To compile a style sheet and use a resolver with default credentials

- Code using the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class.

     [XML_Migration#11 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#11)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
     [XML_Migration#11 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#11)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

- Code using the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class.

     [XML_Migration#12 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#12)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
     [XML_Migration#12 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#12)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

## To use an XSLT parameter

- Code using the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class.

     [XML_Migration#13 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#13)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
     [XML_Migration#13 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#13)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

- Code using the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class.

     [XML_Migration#14 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#14)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
     [XML_Migration#14 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#14)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

## To enable XSLT scripting

> **Note:**
> Script blocks are supported only in .NET Framework. They are _not_ supported on .NET Core or .NET 5 or later.

- Code using the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class.

     [XML_Migration#15 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#15)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
     [XML_Migration#15 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#15)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

- Code using the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class.

     [XML_Migration#16 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#16)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
     [XML_Migration#16 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#16)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

## To load the results into a DOM object

- Code using the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class.

     [XML_Migration#19 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#19)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
     [XML_Migration#19 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#19)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

- Code using the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class.

    > **Note:**
    > The [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class does not have a method that returns the XSLT transformation results as an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) object. However, you can output to an XML file and load the XML file into another object.

     [XML_Migration#20 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#20)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
     [XML_Migration#20 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#20)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

## To stream the results into another data store

- Code using the [System.Xml.Xsl.XslTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslTransform) class.

     [XML_Migration#17 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#17)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
     [XML_Migration#17 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#17)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

- Code using the [System.Xml.Xsl.XslCompiledTransform](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XslCompiledTransform) class.

     [XML_Migration#18 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs#18)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/XML_Migration/CS/migration.cs.md)
     [XML_Migration#18 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb#18)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/XML_Migration/VB/migration.vb.md)

## See also

- [Migrating From the XslTransform Class](migrating-from-the-xsltransform-class.md)
- [Using the XslCompiledTransform Class](using-the-xslcompiledtransform-class.md)
