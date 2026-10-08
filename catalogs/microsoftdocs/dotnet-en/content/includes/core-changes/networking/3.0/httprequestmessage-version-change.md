### Default value of HttpRequestMessage.Version changed to 1.1

The default value of the [System.Net.Http.HttpRequestMessage.Version](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.Version) property has changed from 2.0 to 1.1.

#### Version introduced

3.0

#### Change description

In .NET Core 1.0 through 2.0, the default value of the [System.Net.Http.HttpRequestMessage.Version](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.Version) property is 1.1. Starting with .NET Core 2.1, it was changed to 2.1.

Starting with .NET Core 3.0, the default version number returned by the [System.Net.Http.HttpRequestMessage.Version](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.Version) property is once again 1.1.

#### Recommended action

Update your code if it depends on the [System.Net.Http.HttpRequestMessage.Version](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.Version) property returning a default value of 2.0.

#### Category

Networking

#### Affected APIs

- [System.Net.Http.HttpRequestMessage.Version](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpRequestMessage.Version)

<!--

#### Affected APIs

- `P:System.Net.Http.HttpRequestMessage.Version`

-->
