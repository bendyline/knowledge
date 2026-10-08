---
description: "Learn more about: My.Response Object"
title: "My.Response Object"
ms.date: 07/20/2015
f1_keywords: 
  - "My.MyWebExtension.Response"
  - "My.Response"
helpviewer_keywords: 
  - "My.Response object"
ms.assetid: 626359bc-3165-40b4-bfaf-2c610e26eb5b
---
# My.Response Object

Gets the [System.Web.HttpResponse](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse) object associated with the [System.Web.UI.Page](https://learn.microsoft.com/search/?terms=System.Web.UI.Page). This object allows you to send HTTP response data to a client and contains information about that response.  
  
## Remarks  

 The `My.Response` object contains the current [System.Web.HttpResponse](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse) object associated with the page.  
  
 The `My.Response` object is only available for ASP.NET applications.  
  
## Example  

 The following example gets the header collection from the `My.Request` object and uses the `My.Response` object to write it to the ASP.NET page.  
  
 [Code reference unavailable in this source snapshot: ~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyWeb/VB/Default.aspx#1](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/visual-basic/language-reference/objects/my-response-object.md)  
  
## See also

- [System.Web.HttpResponse](https://learn.microsoft.com/search/?terms=System.Web.HttpResponse)
- [My.Request Object](my-request-object.md)
