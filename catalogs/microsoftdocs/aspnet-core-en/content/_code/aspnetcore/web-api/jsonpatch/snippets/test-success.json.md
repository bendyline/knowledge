# Source code: aspnetcore/web-api/jsonpatch/snippets/test-success.json

Complete source file; linked examples may select a region or line range.

```
[
  {
    "op": "add",
    "path": "/customerName",
    "value": "Barry"
  },
  {
    "op": "test",
    "path": "/customerName",
    "value": "Barry"
  }
]
```
