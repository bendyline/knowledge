# Source code: aspnetcore/grpc/aspnetcore/sample/appsettings.json

Complete source file; linked examples may select a region or line range.

```
{
  "Kestrel": {
    "Endpoints": {
      "HttpsInlineCertFile": {
        "Url": "https://localhost:5001",
        "Protocols": "Http2",
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "<certificate password>"
        }
      }
    }
  }
}

```
