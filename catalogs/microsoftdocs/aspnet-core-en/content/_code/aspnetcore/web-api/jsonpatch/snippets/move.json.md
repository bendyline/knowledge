# Source code: aspnetcore/web-api/jsonpatch/snippets/move.json

Complete source file; linked examples may select a region or line range.

```
[
  {
    "op": "move",
    "from": "/orders/0/orderName",
    "path": "/customerName"
  },
  {
    "op": "move",
    "from": "/orders/1",
    "path": "/orders/0"
  }
]
```
