# Source code: aspnetcore/web-api/jsonpatch/snippets/copy.json

Complete source file; linked examples may select a region or line range.

```
[
  {
    "op": "copy",
    "from": "/orders/0/orderName",
    "path": "/customerName"
  },
  {
    "op": "copy",
    "from": "/orders/1",
    "path": "/orders/0"
  }
]

```
