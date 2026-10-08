# Source code: aspnetcore/web-api/jsonpatch/snippets/add.json

Complete source file; linked examples may select a region or line range.

```
[
  {
    "op": "add",
    "path": "/customerName",
    "value": "Barry"
  },
  {
    "op": "add",
    "path": "/orders/-",
    "value": {
      "orderName": "Order2",
      "orderType": null
    }
  }
]
```
