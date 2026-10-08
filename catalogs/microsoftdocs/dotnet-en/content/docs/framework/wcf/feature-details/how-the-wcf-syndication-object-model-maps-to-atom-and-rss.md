---
description: "Learn more about: How the WCF Syndication Object Model Maps to Atom and RSS"
title: "How the WCF Syndication Object Model Maps to Atom and RSS"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: 0365eb37-98cc-4b13-80fb-f1e78847a748
---
# How the WCF Syndication Object Model Maps to Atom and RSS

When developing a Windows Communication Foundation (WCF) syndication service, you create feeds and items using the following classes:  
  
- [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed)  
  
- [System.ServiceModel.Syndication.SyndicationItem](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationItem)  
  
- [System.ServiceModel.Syndication.SyndicationPerson](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationPerson)  
  
- [System.ServiceModel.Syndication.SyndicationLink](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationLink)  
  
- [System.ServiceModel.Syndication.SyndicationCategory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationCategory)  
  
- [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent)  
  
- [System.ServiceModel.Syndication.UrlSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.UrlSyndicationContent)  
  
- [System.ServiceModel.Syndication.XmlSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.XmlSyndicationContent)  
  
 A [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed) can be serialized into any syndication format for which a formatter is defined. WCF ships with two formatters: [System.ServiceModel.Syndication.Atom10FeedFormatter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.Atom10FeedFormatter) and [System.ServiceModel.Syndication.Rss20FeedFormatter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.Rss20FeedFormatter).  
  
 The object model around [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed) and [System.ServiceModel.Syndication.SyndicationItem](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationItem) is aligned more closely with the Atom 1.0 specification than the RSS 2.0 specification. This is because Atom 1.0 is a more substantial specification that defines elements that are ambiguous or omitted from the RSS 2.0 specification. Because of this, many items in the WCF syndication object model have no direct representation in the RSS 2.0 specification. When serializing [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed) and [System.ServiceModel.Syndication.SyndicationItem](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationItem) objects into RSS 2.0, WCF allows you to serialize Atom-specific data elements as namespace-qualified extension elements that conform to the Atom specification. You can control this with a parameter passed to the [System.ServiceModel.Syndication.Rss20FeedFormatter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.Rss20FeedFormatter) constructor.  
  
 The code samples in this topic use one of two methods defined here to do the actual serialization.  
  
 `SerializeFeed` serializes a syndication feed.  
  
 [SyndicationMapping#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs.md)
 [SyndicationMapping#10 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb.md)  
  
 `SerializeItem` serializes a syndication item.  
  
 [SyndicationMapping#11 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs#11)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs.md)
 [SyndicationMapping#11 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb#11)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb.md)  
  
## SyndicationFeed  

 The following code example shows how to serialize the [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed) class to Atom 1.0 and RSS 2.0.  
  
 [SyndicationMapping#0 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs.md)
 [SyndicationMapping#0 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb.md)  
  
 The following XML shows how the [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed) is serialized to Atom 1.0.  
  
```xml  
<?xml version="1.0" encoding="utf-8"?>  
<feed xml:lang="EN-US" xmlns="http://www.w3.org/2005/Atom">  
  <title type="text">My Feed Title</title>  
  <subtitle type="text">My Feed Description</subtitle>  
  <id>FeedID</id>  
  <rights type="text">Copyright 2007</rights>  
  <updated>2007-08-29T13:57:17-07:00</updated>  
  <category term="categoryName" label="categoryLabel" scheme="categoryScheme" />  
  <logo>http://server/image.jpg</logo>  
  <generator>Sample Code</generator>  
  <link rel="alternate" href="http://myfeeduri/" />  
  <entry>  
    <id>ItemID</id>  
    <title type="text">Item Title</title>  
    <summary type="text">Item Summary</summary>  
    <published>2007-08-29T00:00:00-07:00</published>  
    <updated>2007-08-29T13:57:17-07:00</updated>  
    <author>  
      <name>Jesper Aaberg</name>  
      <uri>http://Jesper/Aaberg</uri>  
      <email>Jesper@Aaberg.com</email>  
    </author>  
    <contributor>  
      <name>Lene Aaling</name>  
      <uri>http://Lene/Aaling</uri>  
      <email>Lene@Aaling.com</email>  
    </contributor>  
    <link rel="alternate" href="http://myitemuri/" />  
    <category term="categoryName" label="categoryLabel" scheme="categoryScheme" />  
    <content type="text">Item Content</content>  
    <rights type="text">Copyright 2007</rights>  
    <source>  
      <title type="text">My Feed Title</title>  
      <subtitle type="text">My Feed Description</subtitle>  
      <id>FeedID</id>  
      <rights type="text">Copyright 2007</rights>  
      <updated>2007-08-29T13:57:17-07:00</updated>  
      <category term="categoryName" label="categoryLabel" scheme="categoryScheme" />  
      <logo>http://server/image.jpg</logo>  
      <generator>Sample Code</generator>  
      <link rel="alternate" href="http://myfeeduri/" />  
    </source>  
  </entry>  
</feed>  
```  
  
 The following XML shows how the [System.ServiceModel.Syndication.SyndicationFeed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationFeed) is serialized to RSS 2.0.  
  
```xml  
<?xml version="1.0" encoding="utf-8"?>  
<rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0">  
  <channel>  
    <title>My Feed Title</title>  
    <link>http://myfeeduri/</link>  
    <description>My Feed Description</description>  
    <language>EN-US</language>  
    <copyright>Copyright 2007</copyright>  
    <lastBuildDate>Wed, 29 Aug 2007 13:57:17 -0700</lastBuildDate>  
    <category domain="categoryScheme">categoryName</category>  
    <generator>Sample Code</generator>  
    <image>  
      <url>http://server/image.jpg</url>  
      <title>My Feed Title</title>  
      <link>http://myfeeduri/</link>  
    </image>  
    <a10:id>FeedID</a10:id>  
    <item>  
      <guid isPermaLink="false">ItemID</guid>  
      <link>http://myitemuri/</link>  
      <author>Jesper@Aaberg.com</author>  
      <category domain="categoryScheme">categoryName</category>  
      <title>Item Title</title>  
      <description>Item Summary</description>  
      <source>My Feed Title</source>  
      <pubDate>Wed, 29 Aug 2007 00:00:00 -0700</pubDate>  
      <a10:updated>2007-08-29T13:57:17-07:00</a10:updated>  
      <a10:rights type="text">Copyright 2007</a10:rights>  
      <a10:content type="text">Item Content</a10:content>  
      <a10:contributor>  
        <a10:name>Lene Aaling</a10:name>  
        <a10:uri>http://Lene/Aaling</a10:uri>  
        <a10:email>Lene@Aaling.com</a10:email>  
      </a10:contributor>  
    </item>  
  </channel>  
</rss>  
```  
  
## SyndicationItem  

 The following code example shows how to serialize the [System.ServiceModel.Syndication.SyndicationItem](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationItem) class to Atom 1.0 and RSS 2.0.  
  
 [SyndicationMapping#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs.md)
 [SyndicationMapping#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb.md)  
  
 The following XML shows how the [System.ServiceModel.Syndication.SyndicationItem](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationItem) is serialized to Atom 1.0.  
  
```xml  
<entry xmlns="http://www.w3.org/2005/Atom">  
  <id>ItemID</id>  
  <title type="text">Item Title</title>  
  <summary type="text">Item Summary</summary>  
  <published>2007-08-29T00:00:00-07:00</published>  
  <updated>2007-08-29T14:07:09-07:00</updated>  
  <author>  
    <name>Jesper Aaberg</name>  
    <uri>http://Contoso/Aaberg</uri>  
    <email>Jesper.Aaberg@contoso.com</email>  
  </author>  
  <author>  
    <name>Syed Abbas</name>  
    <uri>http://Contoso/Abbas</uri>  
    <email>Syed.Abbas@contoso.com</email>  
  </author>  
  <contributor>  
    <name>Lene Aaling</name>  
    <uri>http://Contoso/Aaling</uri>  
    <email>Lene.Aaling@contoso.com</email>  
  </contributor>  
  <contributor>  
    <name>Kim Abercrombie</name>  
    <uri>http://Contoso/Abercrombie</uri>  
    <email>Kim.Abercrombie@contoso.com</email>  
  </contributor>  
  <link rel="alternate" href="http://myitemuri/" />  
  <category term="categoryName" label="categoryLabel" scheme="categoryScheme" />  
  <category term="categoryName" label="categoryLabel" scheme="categoryScheme" />  
  <content type="text">Item Content</content>  
  <rights type="text">Copyright 2007</rights>  
  <source>  
    <title type="text">My Feed Title</title>  
    <subtitle type="text">My Feed Description</subtitle>  
    <link rel="alternate" href="http://myfeeduri/" />  
  </source>  
</entry>  
```  
  
 The following XML shows how the [System.ServiceModel.Syndication.SyndicationItem](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationItem) is serialized to RSS 2.0.  
  
```xml  
<item>  
  <guid isPermaLink="false">ItemID</guid>  
  <link>http://myitemuri/</link>  
  <author xmlns="http://www.w3.org/2005/Atom">  
    <name>Jesper Aaberg</name>  
    <uri>http://Jesper/Aaberg</uri>  
    <email>Jesper@Aaberg.com</email>  
  </author>  
  <author xmlns="http://www.w3.org/2005/Atom">  
    <name>Syed Abbas</name>  
    <uri>http://Contoso/Abbas</uri>  
    <email>Syed.Abbas@contoso.com</email>  
  </author>  
  <category domain="categoryScheme">categoryName</category>  
  <category domain="categoryScheme">categoryName</category>  
  <title>Item Title</title>  
  <description>Item Summary</description>  
  <source>My Feed Title</source>  
  <pubDate>Wed, 29 Aug 2007 00:00:00 -0700</pubDate>  
  <updated xmlns="http://www.w3.org/2005/Atom">2007-08-29T14:07:09-07:00</updated>  
  <rights type="text" xmlns="http://www.w3.org/2005/Atom">Copyright 2007</rights>  
  <content type="text" xmlns="http://www.w3.org/2005/Atom">Item Content</content>  
  <contributor xmlns="http://www.w3.org/2005/Atom">  
    <name>Lene Aaling</name>  
    <uri>http://Contoso/Aaling</uri>  
    <email>Lene.Aaling@contoso.com</email>  
  </contributor>  
  <contributor xmlns="http://www.w3.org/2005/Atom">  
    <name>Kim Abercrombie</name>  
    <uri>http://Contoso/Abercrombie</uri>  
    <email>Kim.Abercrombie@contoso.com</email>  
  </contributor>  
</item>  
```  
  
## SyndicationPerson  

 The following code example shows how to serialize the [System.ServiceModel.Syndication.SyndicationPerson](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationPerson) class to Atom 1.0 and RSS 2.0.  
  
 [SyndicationMapping#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs.md)
 [SyndicationMapping#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb.md)  
  
 The following XML shows how the [System.ServiceModel.Syndication.SyndicationPerson](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationPerson) is serialized to Atom 1.0.  
  
```xml  
  <author>  
    <name>Jesper Aaberg</name>  
    <uri>http://Contoso/Aaberg</uri>  
    <email>Jesper.Aaberg@contoso.com</email>  
  </author>  
<contributor>  
    <name>Lene Aaling</name>  
    <uri>http://Contoso/Aaling</uri>  
    <email>Lene.Aaling@contoso.com</email>  
  </contributor>  
```  
  
 The following XML shows how the [System.ServiceModel.Syndication.SyndicationPerson](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationPerson) class is serialized to RSS 2.0 if only one [System.ServiceModel.Syndication.SyndicationPerson](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationPerson) exists in the `Authors` or `Contributors` collections, respectively.  
  
```xml  
<author>Jesper.Aaberg@contoso.com</author>  
<a10:contributor>  
    <a10:name>Lene Aaling</a10:name>  
    <a10:uri>http://Contoso/Aaling</a10:uri>  
    <a10:email>Lene.Aaling@contoso.com</a10:email>  
</a10:contributor>  
```  
  
 The following XML shows how the [System.ServiceModel.Syndication.SyndicationPerson](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationPerson) class is serialized to RSS 2.0 if more than one [System.ServiceModel.Syndication.SyndicationPerson](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationPerson) exists in the `Authors` or `Contributors` collections, respectively.  
  
```xml  
<a10:author>  
    <a10:name>Jesper Aaberg</a10:name>  
    <a10:uri>http://Contoso/Aaberg</a10:uri>  
    <a10:email>Jesper.Aaberg@contoso.com</a10:email>  
</a10:author>  
<a10:author>  
    <a10:name>Syed Abbas</a10:name>  
    <a10:uri>http://Contoso/Abbas</a10:uri>  
    <a10:email>Syed.Abbas@contoso.com</a10:email>  
</a10:author>  
<a10:contributor>  
    <a10:name>Lene Aaling</a10:name>  
    <a10:uri>http://Contoso/Aaling</a10:uri>  
    <a10:email>Lene.Aaling@contoso.com</a10:email>  
</a10:contributor>  
<a10:contributor>  
    <a10:name>Kim Abercrombie</a10:name>  
    <a10:uri>http://Contoso/Abercrombie</a10:uri>  
    <a10:email>Kim.Abercrombie@contoso.com</a10:email>  
</a10:contributor>  
```  
  
## SyndicationLink  

 The following code example shows how to serialize the [System.ServiceModel.Syndication.SyndicationLink](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationLink) class to Atom 1.0 and RSS 2.0.  
  
 [SyndicationMapping#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs.md)
 [SyndicationMapping#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb.md)  
  
 The following XML shows how the [System.ServiceModel.Syndication.SyndicationLink](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationLink) is serialized to Atom 1.0.  
  
 `<link rel="alternate" type="text/html" title="My Link Title" length="2048" href="http://contoso/MyLink" />`  
  
 The following XML shows how the [System.ServiceModel.Syndication.SyndicationLink](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationLink) is serialized to RSS 2.0.  
  
 `<a10:link rel="alternate" type="text/html" title="My Link Title" length="2048" href="http://contoso/MyLink" />`  
  
## SyndicationCategory  

 The following code example shows how to serialize the [System.ServiceModel.Syndication.SyndicationCategory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationCategory) class to Atom 1.0 and RSS 2.0.  
  
 [SyndicationMapping#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs.md)
 [SyndicationMapping#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb.md)  
  
 The following XML shows how the [System.ServiceModel.Syndication.SyndicationCategory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationCategory) is serialized to Atom 1.0.  
  
 `<category term="categoryName" label="categoryLabel" scheme="categoryScheme" />`  
  
 The following XML shows how the [System.ServiceModel.Syndication.SyndicationCategory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.SyndicationCategory) is serialized to RSS 2.0.  
  
 `<category domain="categoryScheme">categoryName</category>`  
  
## TextSyndicationContent  

 The following code example shows how to serialize the [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent) class to Atom 1.0 and RSS 2.0 when [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent) is created with HTML content.  
  
 [SyndicationMapping#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs.md)
 [SyndicationMapping#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb.md)  
  
 The following XML shows how the [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent) class with HTML content is serialized to Atom 1.0.  
  
 `<content type="html"><html> some html </html></content>`  
  
 The following XML shows how the [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent) class with HTML content is serialized to RSS 2.0.  
  
 `<description><html> some html </html></description>`  
  
 The following code example shows how to serialize the [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent) class to Atom 1.0 and RSS 2.0 when [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent) is created with plain text content.  
  
 [SyndicationMapping#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs.md)
 [SyndicationMapping#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb.md)  
  
 The following XML shows how the [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent) class with plain text content is serialized to Atom 1.0.  
  
 `<content type="text">Some Plain Text</content>`  
  
 The following XML shows how the [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent) class with plain text content is serialized to RSS 2.0.  
  
 `<description>Some Plain Text</description>`  
  
 The following code example shows how to serialize the [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent) class to Atom 1.0 and RSS 2.0 when [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent) is created with XHTML content.  
  
 [SyndicationMapping#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs.md)
 [SyndicationMapping#7 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb.md)  
  
 The following XML shows how the [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent) class with XHTML content is serialized to Atom 1.0.  
  
 `<content type="xhtml">`  
  
 `<html> some xhtml </html>`  
  
 `</content>`  
  
 The following XML shows how the [System.ServiceModel.Syndication.TextSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.TextSyndicationContent) class with XHTML content is serialized to RSS 2.0.  
  
 `<description><html> some xhtml </html></description>`  
  
## UrlSyndicationContent  

 The following code example shows how to serialize the [System.ServiceModel.Syndication.UrlSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.UrlSyndicationContent) class to Atom 1.0 and RSS 2.0.  
  
 [SyndicationMapping#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs.md)
 [SyndicationMapping#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb.md)  
  
 The following XML shows how the [System.ServiceModel.Syndication.UrlSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.UrlSyndicationContent) class is serialized to Atom 1.0.  
  
 `<content type="audio" src="http://someurl/" />`  
  
 The following XML shows how the [System.ServiceModel.Syndication.UrlSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.UrlSyndicationContent) class with XHTML content is serialized to RSS 2.0.  
  
 `<description />`  
  
 `<content type="audio" src="http://Contoso/someurl/" xmlns="http://www.w3.org/2005/Atom" />`  
  
## XmlSyndicationContent  

 The following code example shows how to serialize the [System.ServiceModel.Syndication.XmlSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.XmlSyndicationContent) class to Atom 1.0 and RSS 2.0.  
  
 [SyndicationMapping#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/syndicationmapping/cs/snippets.cs.md)
 [SyndicationMapping#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/syndicationmapping/vb/snippets.vb.md)  
  
 The following XML shows how the [System.ServiceModel.Syndication.XmlSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.XmlSyndicationContent) class is serialized to Atom 1.0.  
  
 `<content type="mytype">`  
  
 `<SomeData xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.datacontract.org/2004/07/FeedMapping" />`  
  
 `</content>`  
  
 The following XML shows how the [System.ServiceModel.Syndication.XmlSyndicationContent](https://learn.microsoft.com/search/?terms=System.ServiceModel.Syndication.XmlSyndicationContent) class with XHTML content is serialized to RSS 2.0.  
  
 `<content type="mytype" xmlns="http://www.w3.org/2005/Atom">`  
  
 `<SomeData xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.datacontract.org/2004/07/FeedMapping" />`  
  
 `</content>`  
  
## See also

- [WCF Syndication Overview](wcf-syndication-overview.md)
- [Architecture of Syndication](architecture-of-syndication.md)
- [How to: Create a Basic RSS Feed](how-to-create-a-basic-rss-feed.md)
- [How to: Create a Basic Atom Feed](how-to-create-a-basic-atom-feed.md)
- [How to: Expose a Feed as Both Atom and RSS](how-to-expose-a-feed-as-both-atom-and-rss.md)
