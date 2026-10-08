---
description: "Learn more about: How to: Expose a Feed as Both Atom and RSS"
title: "How to: Expose a Feed as Both Atom and RSS"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: fe374932-67f5-487d-9325-f868812b92e4
---
# How to: Expose a Feed as Both Atom and RSS

Windows Communication Foundation (WCF) allows you to create a service that exposes a syndication feed. This topic discusses how to create a syndication service that exposes a syndication feed using both Atom 1.0 and RSS 2.0. This service exposes one endpoint that can return either syndication format. For simplicity the service used in this sample is self hosted. In a production environment a service of this type would be hosted under IIS or WAS. For more information about the different WCF hosting options, see [Hosting](hosting.md).  
  
### To create a basic syndication service  
  
1. Define a service contract using an interface marked with the [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) attribute. Each operation that is exposed as a syndication feed returns a [System.ServiceModel.Syndication.SyndicationFeedFormatter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeedFormatter) object. Note the parameters for the [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute). `UriTemplate` specifies the URL used to invoke this service operation. The string for this parameter contains literals and a variable in braces ({*format*}). This variable corresponds to the service operation's `format` parameter. For more information, see [System.UriTemplate](https://learn.microsoft.com/search/?terms=System.UriTemplate). `BodyStyle` affects how the messages that this service operation sends and receives are written. [System.ServiceModel.Web.WebMessageBodyStyle.Bare](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebMessageBodyStyle.Bare) specifies that the data sent to and from this service operation are not wrapped by infrastructure-defined XML elements. For more information, see [System.ServiceModel.Web.WebMessageBodyStyle](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebMessageBodyStyle).  
  
     [htAtomRss#0 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs.md)
     [htAtomRss#0 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb.md)  
  
    > **Note:**
    > Use the [System.ServiceModel.ServiceKnownTypeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceKnownTypeAttribute) to specify the types that are returned by the service operations in this interface.  
  
2. Implement the service contract.  
  
     [htAtomRss#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs.md)
     [htAtomRss#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb.md)  
  
3. Create a [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed) object and add an author, category, and description.  
  
     [htAtomRss#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs.md)
     [htAtomRss#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb.md)  
  
4. Create several [System.ServiceModel.Syndication.SyndicationItem](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationItem) objects.  
  
     [htAtomRss#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs.md)
     [htAtomRss#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb.md)  
  
5. Add the [System.ServiceModel.Syndication.SyndicationItem](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationItem) objects to the feed.  
  
     [htAtomRss#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs.md)
     [htAtomRss#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb.md)  
  
6. Use the format parameter to return the requested format.  
  
     [htAtomRss#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs.md)
     [htAtomRss#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb.md)  
  
### To host the service  
  
1. Create a [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) object. The [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) class automatically adds an endpoint at the service's base address unless one is specified in code or configuration. In this sample, no endpoints are specified so the default endpoint is exposed.  
  
     [htAtomRss#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs.md)
     [htAtomRss#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb.md)  
  
2. Open the service host, load the feed from the service, display the feed, and wait for the user to press ENTER.  
  
     [htAtomRss#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs.md)
     [htAtomRss#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/program.vb.md)  
  
### To call GetBlog with an HTTP GET  
  
1. Open a browser, enter the following URL, and press <kbd>Enter</kbd>: `http://localhost:8000/BlogService/GetBlog`.
  
   The URL contains the base address of the service (`http://localhost:8000/BlogService`), the relative address of the endpoint, and the service operation to call.  
  
### To call GetBlog() from code  
  
1. Create an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) with the base address and the method you are calling.  
  
     [htAtomRss#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/snippets.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/snippets.cs.md)
     [htAtomRss#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/snippets.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/snippets.vb.md)  
  
2. Call the static [System.ServiceModel.Syndication.SyndicationFeed.Load%28System.Xml.XmlReader%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed.Load%2528System.Xml.XmlReader%2529) method, passing in the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) you just created.  
  
     [htAtomRss#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/snippets.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/snippets.cs.md)
     [htAtomRss#10 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/snippets.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/snippets.vb.md)  
  
     This invokes the service operation and populates a new [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed) with the formatter returned from the service operation.  
  
3. Access the feed object.  
  
     [htAtomRss#11 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/snippets.cs#11)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/snippets.cs.md)
     [htAtomRss#11 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/snippets.vb#11)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatomrss/vb/snippets.vb.md)  
  
## Example  

 The following is the full code listing for this example.  
  
 [htAtomRss#12 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs#12)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatomrss/cs/program.cs.md)  
  
## Compiling the Code  

 When compiling the preceding code, reference System.ServiceModel.dll and System.ServiceModel.Web.dll.  
  
## See also

- [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding)
- [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute)
