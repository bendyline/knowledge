* Trust the HTTPS development certificate by running the following command:

  ```dotnetcli
  dotnet dev-certs https --trust
  ```
  **Applies to: <=aspnetcore-8.0**

  The preceding command requires .NET 9 or later SDK on Linux. For Linux on .NET 8.0.401 or earlier SDK, see your Linux distribution's documentation for trusting a certificate.



  The preceding command displays the following dialog, provided the certificate was not previously trusted:

  Security warning dialog

* Select **Yes** if you agree to trust the development certificate.

  For more information, see the **Trust the ASP.NET Core HTTPS development certificate** section of the [Enforcing SSL](../security/enforcing-ssl.md) article.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).
