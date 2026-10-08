---
description: "Learn more about: User Defined Functions and Variables"
title: "User Defined Functions and Variables"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 4772f20e-1e7f-496e-93c2-1484473be555
---
# User Defined Functions and Variables

The [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) class provides a set of methods that are used to interact with [System.Xml.XPath.XPathDocument](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathDocument) data. You can supplement the standard XPath functions by implementing extension functions and variables for use by XPath query expressions. The [System.Xml.XPath.XPathExpression.SetContext*](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathExpression.SetContext*) method can accept a user defined context derived from [System.Xml.Xsl.XsltContext](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltContext). User defined functions are resolved by the custom context.

 Extension functions and variables can be useful in prevention of XML injection attacks. In these scenarios user input is assigned to custom variables and processed by extension functions, not as raw input concatenated with processing instructions. Extension functions and variables contain user input so that it only acts on XML data as intended by the designer.

 To use extensions you implement a custom [System.Xml.Xsl.XsltContext](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltContext) class along with the interfaces [System.Xml.Xsl.IXsltContextFunction](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.IXsltContextFunction) and [System.Xml.Xsl.IXsltContextVariable](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.IXsltContextVariable) that support extension functions and variables. An [System.Xml.XPath.XPathExpression](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathExpression) adds user input with its [System.Xml.Xsl.XsltArgumentList](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltArgumentList) to the custom [System.Xml.Xsl.XsltContext](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltContext).

 The [System.Xml.XPath.XPathExpression](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathExpression) represents a compiled query that [System.Xml.XPath.XPathNavigator](https://learn.microsoft.com/search/?terms=System.Xml.XPath.XPathNavigator) uses to find and process the nodes identified by the expression.

 The following example shows implementation of a custom context class derived from [System.Xml.Xsl.XsltContext](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltContext). Comments in the code describe class members and their use in custom functions. Function and variable implementations and a sample application that uses these implementations follow this code segment.

 [XPathExtensionFunctions#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/xpathextensionfunctions/cs/xpathextensionfunctions.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/xpathextensionfunctions/cs/xpathextensionfunctions.cs.md)
 [XPathExtensionFunctions#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/xpathextensionfunctions/vb/xpathextensionfunctions.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/xpathextensionfunctions/vb/xpathextensionfunctions.vb.md)

 The following code implements [System.Xml.Xsl.IXsltContextFunction](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.IXsltContextFunction). The class that implements [System.Xml.Xsl.IXsltContextFunction](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.IXsltContextFunction) resolves and executes user-defined functions. This example uses the function identified by the declaration: `private int CountChar(string title, char charToCount)`.

 Code comments describe class members.

 [XPathExtensionFunctions#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/xpathextensionfunctions/cs/xpathextensionfunctions.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/xpathextensionfunctions/cs/xpathextensionfunctions.cs.md)
 [XPathExtensionFunctions#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/xpathextensionfunctions/vb/xpathextensionfunctions.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/xpathextensionfunctions/vb/xpathextensionfunctions.vb.md)

 The following code implements [System.Xml.Xsl.IXsltContextVariable](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.IXsltContextVariable). This class resolves references to user-defined variables in XPath query expressions at runtime. An instance of this class is created and returned by the overridden [System.Xml.Xsl.XsltContext.ResolveVariable*](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltContext.ResolveVariable*) method of the custom [System.Xml.Xsl.XsltContext](https://learn.microsoft.com/search/?terms=System.Xml.Xsl.XsltContext) class.

 Code comments describe the class members.

 [XPathExtensionFunctions#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/xpathextensionfunctions/cs/xpathextensionfunctions.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/xpathextensionfunctions/cs/xpathextensionfunctions.cs.md)
 [XPathExtensionFunctions#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/xpathextensionfunctions/vb/xpathextensionfunctions.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/xpathextensionfunctions/vb/xpathextensionfunctions.vb.md)

 With the previous class definitions in scope, the following code uses the custom function to count characters in the elements of the `Tasks.xml` document. Comments in the code describe the code that compiles the custom function and runs it against the `Tasks.xml` document.

 [XPathExtensionFunctions#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Data/xpathextensionfunctions/cs/xpathextensionfunctions.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_Data/xpathextensionfunctions/cs/xpathextensionfunctions.cs.md)
 [XPathExtensionFunctions#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Data/xpathextensionfunctions/vb/xpathextensionfunctions.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/xpathextensionfunctions/vb/xpathextensionfunctions.vb.md)

 This example uses the following XML data.

 [XPathExtensionFunctions#5 (complete source file; reference: ../../../../samples/snippets/xml/VS_Snippets_Data/xpathextensionfunctions/XML/tasks.xml#5)](../../../../_code/samples/snippets/xml/VS_Snippets_Data/xpathextensionfunctions/XML/tasks.xml.md)
