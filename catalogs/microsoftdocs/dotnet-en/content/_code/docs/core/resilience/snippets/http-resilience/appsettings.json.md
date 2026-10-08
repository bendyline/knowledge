# Source code: docs/core/resilience/snippets/http-resilience/appsettings.json

Complete source file; linked examples may select a region or line range.

```
{
    "RetryOptions": {
        "Retry": {
            "BackoffType": "Linear",
            "UseJitter": false,
            "MaxRetryAttempts": 7
        }
    }
}

```
