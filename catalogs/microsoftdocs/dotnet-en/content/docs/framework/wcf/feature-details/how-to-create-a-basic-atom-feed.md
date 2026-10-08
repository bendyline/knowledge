---
description: "Learn more about: How to: Create a Basic Atom Feed"
title: "How to: Create a Basic Atom Feed"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: 6e0cacc1-9b11-4665-adb7-577a62626fd6
---
# How to: Create a Basic Atom Feed

Windows Communication Foundation (WCF) allows you to create a service that exposes a syndication feed. This topic discusses how to create a syndication service that exposes an Atom syndication feed.  
  
### To create a basic syndication service  
  
1. Define a service contract using an interface marked with the [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) attribute. Each operation that is exposed as a syndication feed should return a [System.ServiceModel.Syndication.Atom10FeedFormatter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.Atom10FeedFormatter) object.  
  
     [htAtomBasic#0 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs.md)
     [htAtomBasic#0 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb.md)  
  
    > **Note:**
    > All service operations that apply the [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) are mapped to HTTP GET requests. To map your operation to a different HTTP method, use the [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute) instead. For more information, see [How to: Create a Basic WCF Web HTTP Service](how-to-create-a-basic-wcf-web-http-service.md).  
  
2. Implement the service contract.  
  
     [htAtomBasic#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs.md)
     [htAtomBasic#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb.md)  
  
3. Create a [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed) object and add an author, category, and description.  
  
     [htAtomBasic#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs.md)
     [htAtomBasic#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb.md)  
  
4. Create several [System.ServiceModel.Syndication.SyndicationItem](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationItem) objects.  
  
     [htAtomBasic#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs.md)
     [htAtomBasic#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb.md)  
  
5. Add the [System.ServiceModel.Syndication.SyndicationItem](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationItem) objects to the feed.  
  
     [htAtomBasic#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs.md)
     [htAtomBasic#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb.md)  
  
6. Return the feed.  
  
     [htAtomBasic#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs.md)
     [htAtomBasic#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb.md)  
  
### To host the service  
  
1. Create a [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) object.  
  
     [htAtomBasic#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs.md)
     [htAtomBasic#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb.md)  
  
2. Open the service host, load the feed from the service, display the feed, and wait for the user to press ENTER.  
  
     [htAtomBasic#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs.md)
     [htAtomBasic#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb.md)  
  
### To call GetBlog() with an HTTP GET  
  
1. In a web browser, browse to the following URL: `http://localhost:8000/BlogService/GetBlog`  
  
   The URL contains the base address of the service (`http://localhost:8000/BlogService`), the relative address of the endpoint, and the service operation to call.  
  
### To call GetBlog() from code  
  
1. Create a [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) with the base address and the method you are calling.  
  
     [htAtomBasic#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/snippets.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/snippets.cs.md)
     [htAtomBasic#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/snippets.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/snippets.vb.md)  
  
2. Call the static [System.ServiceModel.Syndication.SyndicationFeed.Load%28System.Xml.XmlReader%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed.Load%2528System.Xml.XmlReader%2529) method, passing in the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) you just created.  
  
     [htAtomBasic#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/snippets.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/snippets.cs.md)
     [htAtomBasic#10 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/snippets.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/snippets.vb.md)  
  
     This invokes the service operation and populates a new [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed) with the formatter returned from the service operation.  
  
3. Access the feed object.  
  
     [htAtomBasic#11 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/snippets.cs#11)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/snippets.cs.md)
     [htAtomBasic#11 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/snippets.vb#11)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/snippets.vb.md)  
  
## Example  

 The following is the full code listing for this example.  
  
 [htAtomBasic#12 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs#12)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htatombasic/cs/program.cs.md)
 [htAtomBasic#12 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb#12)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htatombasic/vb/program.vb.md)  
  
## Compiling the Code  

 When compiling the preceding code, reference System.ServiceModel.dll and System.ServiceModel.Web.dll.  
  
## See also

- [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding)
- [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute)
