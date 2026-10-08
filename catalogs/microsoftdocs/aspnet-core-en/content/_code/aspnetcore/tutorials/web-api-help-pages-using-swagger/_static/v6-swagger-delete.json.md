# Source code: aspnetcore/tutorials/web-api-help-pages-using-swagger/_static/v6-swagger-delete.json

Complete source file; linked examples may select a region or line range.

```
{
    "delete": {
        "tags": [
            "Todo"
        ],
        "summary": "Deletes a specific TodoItem.",
        "parameters": [
            {
                "name": "id",
                "in": "path",
                "description": "",
                "required": true,
                "schema": {
                    "type": "integer",
                    "format": "int64"
                }
            }
        ],
        "responses": {
            "200": {
                "description": "Success"
            }
        }
    },
    "...": 0
}

```
