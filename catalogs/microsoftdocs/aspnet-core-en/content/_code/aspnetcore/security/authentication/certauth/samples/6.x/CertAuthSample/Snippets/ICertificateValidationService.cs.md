# Source code: aspnetcore/security/authentication/certauth/samples/6.x/CertAuthSample/Snippets/ICertificateValidationService.cs

Complete source file; linked examples may select a region or line range.

```
using System.Security.Cryptography.X509Certificates;

namespace CertAuthSample.Snippets;

public interface ICertificateValidationService
{
    bool ValidateCertificate(X509Certificate2 clientCertificate);
}

```
