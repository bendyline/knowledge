---
description: "Learn more about: How to: Create a Basic RSS Feed"
title: "How to: Create a Basic RSS Feed"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: 431879b8-a5f8-4947-ad1e-4768c726aca8
---
# How to: Create a Basic RSS Feed

Windows Communication Foundation (WCF) allows you to create a service that exposes a syndication feed. This topic discusses how to create a syndication service that exposes an RSS syndication feed.  
  
### To create a basic syndication service  
  
1. Define a service contract using an interface marked with the [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) attribute. Each operation that is exposed as a syndication feed should return a [System.ServiceModel.Syndication.Rss20FeedFormatter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.Rss20FeedFormatter) object.  
  
     [htRssBasic#0 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs.md)
     [htRssBasic#0 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb.md)  
  
    > **Note:**
    > All service operations that apply the [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) attribute are mapped to HTTP GET requests. To map your operation to a different HTTP method, use the [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute) instead. For more information, see [How to: Create a Basic WCF Web HTTP Service](how-to-create-a-basic-wcf-web-http-service.md).  
  
2. Implement the service contract.  
  
     [htRssBasic#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs.md)
     [htRssBasic#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb.md)  
  
3. Create a [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed) object and add an author, category, and description.  
  
     [htRssBasic#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs.md)
     [htRssBasic#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb.md)  
  
4. Create several [System.ServiceModel.Syndication.SyndicationItem](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationItem) objects.  
  
     [htRssBasic#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs.md)
     [htRssBasic#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb.md)  
  
5. Add the [System.ServiceModel.Syndication.SyndicationItem](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationItem) to the feed.  
  
     [htRssBasic#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs.md)
     [htRssBasic#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb.md)  
  
6. Return the feed.  
  
     [htRssBasic#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs.md)
     [htRssBasic#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb.md)  
  
### To host a service  
  
1. Create a [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) object.  
  
     [htRssBasic#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs.md)
     [htRssBasic#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb.md)  
  
2. Open the service host and wait until the user presses ENTER.  
  
     [htRssBasic#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs.md)
     [htRssBasic#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb.md)  
  
### To call GetBlog() with an HTTP GET  
  
1. In a web browser, browse to the following URL: `http://localhost:8000/BlogService/GetBlog`. The URL contains the base address of the service (`http://localhost:8000/BlogService`), the relative address of the endpoint, and the service operation to call.  
  
### To call GetBlog() from code  
  
1. Create an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) with the base address and the method you are calling.  
  
     [htRssBasic#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/snippets.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/snippets.cs.md)
     [htRssBasic#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/snippets.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/snippets.vb.md)  
  
2. Call the static [System.ServiceModel.Syndication.SyndicationFeed.Load%28System.Xml.XmlReader%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed.Load%2528System.Xml.XmlReader%2529) method, passing in the [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) you just created.  
  
     [htRssBasic#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/snippets.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/snippets.cs.md)
     [htRssBasic#10 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/snippets.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/snippets.vb.md)  
  
     This invokes the service operation and populates a new [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed) with the formatter returned from the service operation.  
  
3. Access the feed object.  
  
     [htRssBasic#11 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/snippets.cs#11)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/snippets.cs.md)
     [htRssBasic#11 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/snippets.vb#11)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/snippets.vb.md)  
  
## Example  

 The following is the full code listing for this example.  
  
 [htRssBasic#12 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs#12)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/htrssbasic/cs/program.cs.md)
 [htRssBasic#12 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb#12)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/htrssbasic/vb/program.vb.md)  
  
## Compiling the Code  

 When compiling the preceding code, reference System.ServiceModel.dll and System.ServiceModel.Web.dll.  
  
## See also

- [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding)
- [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute)
