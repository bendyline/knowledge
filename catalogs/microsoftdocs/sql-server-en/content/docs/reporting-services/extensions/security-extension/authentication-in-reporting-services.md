---
title: "Authentication in Reporting Services"
description: Find out how to extend authentication schemes in Reporting Services by using either Forms Authentication or the IAuthenticationExtension2 interface.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: extensions
ms.topic: reference
helpviewer_keywords:
  - "security [Reporting Services], authentication"
  - "forms-based authentication [Reporting Services]"
  - "authentication [Reporting Services]"
  - "custom authentication [Reporting Services]"
ms.custom:
  - updatefrequency5
  - sfi-image-nochange
---
# Authentication in Reporting Services
  Authentication is the process of establishing a user's right to an identity. There are many techniques that you can use to authenticate a user. The most common way is to use passwords. When you implement Forms Authentication, for example, you want an implementation that queries users for credentials (usually by some interface that requests a sign-in name and password) and then validates users against a data store, such as a database table or configuration file. If the credentials can't be validated, the authentication process fails and the user assumes an anonymous identity.  
  
## Custom authentication in Reporting Services  
 In  Reporting Services 
, the Windows operating system handles the authentication of users either through integrated security or through the explicit reception and validation of user credentials. Custom authentication can be developed in  Reporting Services 
 to support more authentication schemes. This support is made possible through the security extension interface [Microsoft.ReportingServices.Interfaces.IAuthenticationExtension2](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IAuthenticationExtension2). All extensions inherit from the [Microsoft.ReportingServices.Interfaces.IExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension) base interface for any extension deployed and used by the report server. [Microsoft.ReportingServices.Interfaces.IExtension](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IExtension), and [Microsoft.ReportingServices.Interfaces.IAuthenticationExtension2](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces.IAuthenticationExtension2), are members of the [Microsoft.ReportingServices.Interfaces](https://learn.microsoft.com/search/?terms=Microsoft.ReportingServices.Interfaces) namespace.  
  
 The primary way to authenticate against a report server in  Reporting Services 
 is the [ReportService2010.ReportingService2010.LogonUser%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.LogonUser%252A) method. This member of the Reporting Services Web service can be used to pass user credentials to a report server for validation. Your underlying security extension implements **IAuthenticationExtension2.LogonUser** which contains your custom authentication code. In the Forms Authentication sample, **LogonUser**, which performs an authentication check against the supplied credentials and a custom user store in a database. An example of an implementation of **LogonUser** looks like this:  
  
```  
public bool LogonUser(string userName, string password, string authority)  
{  
   return AuthenticationUtilities.VerifyPassword(userName, password);  
}  
  
```  
  
 The following sample function is used to verify the supplied credentials:  
  
```  
  
internal static bool VerifyPassword(string suppliedUserName,  
   string suppliedPassword)  
{   
   bool passwordMatch = false;  
   // Get the salt and pwd from the database based on the user name.  
   // See "How To: Use DPAPI (Machine Store) from ASP.NET," "How To:  
   // Use DPAPI (User Store) from Enterprise Services," and "How To:  
   // Create a DPAPI Library" for more information about how to use  
   // DPAPI to securely store connection strings.  
   SqlConnection conn = new SqlConnection(  
      "Server=localhost;" +   
      "Integrated Security=SSPI;" +  
      "database=UserAccounts");  
   SqlCommand cmd = new SqlCommand("LookupUser", conn);  
   cmd.CommandType = CommandType.StoredProcedure;  
  
   SqlParameter sqlParam = cmd.Parameters.Add("@userName",  
       SqlDbType.VarChar,  
       255);  
   sqlParam.Value = suppliedUserName;  
   try  
   {  
      conn.Open();  
      SqlDataReader reader = cmd.ExecuteReader();  
      reader.Read(); // Advance to the one and only row  
      // Return output parameters from returned data stream  
      string dbPasswordHash = reader.GetString(0);  
      string salt = reader.GetString(1);  
      reader.Close();  
      // Now take the salt and the password entered by the user  
      // and concatenate them together.  
      string passwordAndSalt = String.Concat(suppliedPassword, salt);  
      // Now hash them  
      string hashedPasswordAndSalt =  
         FormsAuthentication.HashPasswordForStoringInConfigFile(  
         passwordAndSalt,  
         "SHA1");  
      // Now verify them. Returns true if they are equal.  
      passwordMatch = hashedPasswordAndSalt.Equals(dbPasswordHash);  
   }  
   catch (Exception ex)  
   {  
       throw new Exception("Exception verifying password. " +  
          ex.Message);  
   }  
   finally  
   {  
       conn.Close();  
   }  
   return passwordMatch;  
}  
```  
  
## Authentication flow  
 The Reporting Services Web service provides custom authentication extensions to enable Forms Authentication by the web portal and the report server.  
  
 The [ReportService2010.ReportingService2010.LogonUser%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.LogonUser%252A) method of the Reporting Services Web service is used to submit credentials to the report server for authentication. The Web service uses HTTP headers to pass an authentication ticket (known as a "cookie") from the server to the client for validated sign-in requests.  
  
 The following illustration depicts the method of authenticating users to the Web service when your application is deployed with a report server configured to use a custom authentication extension.  

Screenshot of the Reporting Services security authentication flow.
  
 As shown in Figure 2, the authentication process is as follows:  
  
1.  A client application calls the Web service [ReportService2010.ReportingService2010.LogonUser%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.LogonUser%252A) method to authenticate a user.  
  
2.  The Web service makes a call to the [ReportService2010.ReportingService2010.LogonUser%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.LogonUser%252A) method of your security extension, specifically, the class that implements **IAuthenticationExtension2**.  
  
3.  Your implementation of [ReportService2010.ReportingService2010.LogonUser%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.LogonUser%252A) validates the user name and password in the user store or security authority.  
  
4.  Upon successful authentication, the Web service creates a cookie and manages it for the session.  
  
5.  The Web service returns the authentication ticket to the calling application on the HTTP header.  
  
 When the Web service successfully authenticates a user through the security extension, it generates a cookie that is used for subsequent requests. The cookie might not persist within the custom security authority because the report server doesn't own the security authority. The cookie is returned from the [ReportService2010.ReportingService2010.LogonUser%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.LogonUser%252A) Web service method and is used in subsequent Web service method calls and in URL access.  
  
> **Note:**  
>  In order to avoid compromising the cookie during transmission, authentication cookies returned from [ReportService2010.ReportingService2010.LogonUser%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.LogonUser%252A) should be transmitted securely using Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), encryption.  
  
 If you access the report server through URL access when a custom security extension is installed, Internet Information Services (IIS) and  ASP.NET 
 automatically manage the transmission of the authentication ticket. If you're accessing the report server through the SOAP API, your implementation of the proxy class must include extra support for managing the authentication ticket. For more information about using the SOAP API and managing the authentication ticket, see "Using the Web Service with Custom Security."  
  
## Forms Authentication  
 Forms Authentication is a type of  ASP.NET 
 authentication in which an unauthenticated user is directed to an HTML form. Once the user provides credentials, the system issues a cookie containing an authentication ticket. On later requests, the system first checks the cookie to see if the report server authenticated the user.  
  
  Reporting Services 
 can be extended to support Forms Authentication using the security extensibility interfaces available through the Reporting Services API. If you extend  Reporting Services 
 to use Forms Authentication, use Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), for all communications with the report server to prevent malicious users from gaining access to another user's cookie. TLS enables clients and a report server to authenticate each other and to ensure that no other computers can read the contents of communications between the two computers. All data sent from a client through a TLS connection is encrypted so that malicious users can't intercept passwords or data sent to a report server.  
  
 Forms Authentication is implemented to support accounts and authentication for platforms other than Windows. A graphical interface is presented to a user who requests access to a report server, and the supplied credentials are submitted to a security authority for authentication.  
  
 Forms Authentication requires that a person is present to enter credentials. For unattended applications that communicate directly with the Reporting Services Web service, Forms Authentication must be combined with a custom authentication scheme.  
  
 Forms Authentication is appropriate for  Reporting Services 
 when:  
  
-   You need to store and authenticate users that don't have  Microsoft 
 Windows accounts, and  
  
-   You need to provide your own user interface form as a sign-in page between different pages on a Web site.  
  
 Consider the following points when writing a custom security extension that supports Forms Authentication:  
  
-   If you use Forms Authentication, anonymous access must be enabled on the report server virtual directory in Internet Information Services (IIS).  
  
-    ASP.NET 
 authentication must be set to Forms. You configure  ASP.NET 
 authentication in the Web.config file for the report server.  
  
-    Reporting Services 
 can authenticate and authorize users with either Windows Authentication or custom authentication, but not both.  Reporting Services 
 doesn't support simultaneous use of multiple security extensions.  
  
## Related content

- [Implement a security extension](implementing-a-security-extension.md)
