# Source code: aspnetcore/web-api/jsonpatch/snippets/replace.json

Complete source file; linked examples may select a region or line range.

```
[
  {
    "op": "replace",
    "path": "/customerName",
    "value": "Barry"
  },
  {
    "op": "replace",
    "path": "/orders/0",
    "value": {
      "orderName": "Order2",
      "orderType": null
    }
  }
]
```
