# Source code: aspnetcore/client-side/libman/samples/LibManSample/libman.json

Complete source file; linked examples may select a region or line range.

```
{
  "version": "1.0",
  "defaultProvider": "cdnjs",
  "libraries": [
    {
      "library": "jquery@3.7.1",
      "files": [
        "jquery.min.js",
        "jquery.js",
        "jquery.min.map"
      ],
      "destination": "wwwroot/lib/jquery/"
    },
    {
      "provider": "unpkg",
      "library": "bootstrap@5.3.6",
      "destination": "wwwroot/lib/bootstrap/"
    }
  ]
}

```
