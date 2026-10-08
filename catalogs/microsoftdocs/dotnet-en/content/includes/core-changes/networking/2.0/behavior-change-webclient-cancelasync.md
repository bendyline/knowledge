### WebClient.CancelAsync doesn't always cancel immediately

Starting in .NET Core 2.0, calling [System.Net.WebClient.CancelAsync](https://learn.microsoft.com/search/?terms=System.Net.WebClient.CancelAsync) doesn't cancel the request immediately if the response has started to fetch.

#### Change description

Previously, calling [System.Net.WebClient.CancelAsync](https://learn.microsoft.com/search/?terms=System.Net.WebClient.CancelAsync) canceled the request immediately. Starting in .NET Core 2.0, calling [System.Net.WebClient.CancelAsync](https://learn.microsoft.com/search/?terms=System.Net.WebClient.CancelAsync) cancels the request immediately only if the response hasn't started fetching. If the response has started to fetch, the request is cancelled only after a complete response is read.

This change was implemented because the [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient) API is deprecated in favor of [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient).

#### Version introduced

2.0

#### Recommended action

Use the [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient) class instead of [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient), which is deprecated.

#### Category

Networking

#### Affected APIs

- [System.Net.WebClient.CancelAsync](https://learn.microsoft.com/search/?terms=System.Net.WebClient.CancelAsync)

<!--

#### Affected APIs

- `M:System.Net.WebClient.CancelAsync`

-->
