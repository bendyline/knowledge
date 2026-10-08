# [Visual Studio](#tab/visual-studio)

* Press Ctrl+F5 to run without the debugger.

  Visual Studio displays the following dialog when a project is not yet configured to use SSL:

This project is configured to use SSL. To avoid SSL warnings in the browser you can choose to trust the self-signed certificate that IIS Express has generated. Would you like to trust the IIS Express SSL certificate?

Select **Yes** if you trust the IIS Express SSL certificate.

The following dialog is displayed:

Security warning dialog

Select **Yes** if you agree to trust the development certificate.

For information on trusting the Firefox browser, see [Firefox SEC_ERROR_INADEQUATE_KEY_USAGE certificate error](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23trust-ff).

  Visual Studio:

  * Starts [Kestrel](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Findex%23kestrel) server.
  * Launches a browser.
  * Navigates to `http://localhost:port`, such as `http://localhost:7042`.
    * *port*: A randomly assigned port number for the app.
    * `localhost`: The standard hostname for the local computer. Localhost only serves web requests from the local computer.

# [Visual Studio Code](#tab/visual-studio-code)

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


* Press **Ctrl-F5** to run without the debugger.

  Visual Studio Code:

  * Starts [Kestrel](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Findex%23kestrel) server.
  * Launches a browser.
  * Navigates to `http://localhost:port`, such as `http://localhost:7042`.
    * *port*: A randomly assigned port number for the app.
    * `localhost`: The standard hostname for the local computer. Localhost only serves web requests from the local computer.

---
