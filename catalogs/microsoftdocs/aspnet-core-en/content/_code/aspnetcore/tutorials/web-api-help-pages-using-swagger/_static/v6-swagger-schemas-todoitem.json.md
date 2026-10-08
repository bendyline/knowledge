# Source code: aspnetcore/tutorials/web-api-help-pages-using-swagger/_static/v6-swagger-schemas-todoitem.json

Complete source file; linked examples may select a region or line range.

```
{
    "schemas": {
        "TodoItem": {
            "required": [
                "name"
            ],
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "name": {
                    "type": "string"
                },
                "isComplete": {
                    "type": "boolean",
                    "default": false
                }
            },
            "additionalProperties": false
        }
    },
    "...": 0
}

```
