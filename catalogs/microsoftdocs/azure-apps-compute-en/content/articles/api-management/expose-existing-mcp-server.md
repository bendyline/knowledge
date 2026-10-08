---
title: Connect and Govern Existing MCP server - Azure API Management 
description: Learn how to expose and govern an existing Model Context Protocol (MCP) server in Azure API Management.
ms.service: azure-api-management
ms.topic: how-to
ms.date: 04/28/2026
ms.collection: ce-skilling-ai-copilot
ms.update-cycle: 180-days
ms.custom:
---

# Expose and govern an existing MCP server


**APPLIES TO: Developer | Basic | Basic v2 | Standard | Standard v2 | Premium | Premium v2**

This article shows how to use API Management to expose and govern an existing remote [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol) server - a tool server hosted outside of API Management. Expose and govern the server's tools through API Management so that MCP clients can call them by using the MCP protocol. 

Example scenarios include:

- Proxy [LangChain](https://python.langchain.com/) or [LangServe](https://python.langchain.com/docs/langserve/) tool servers through API Management with per-server authentication and rate limits.
- Securely expose Azure Logic Apps–based tools to copilots by using IP filtering and OAuth.
- Centralize MCP server tools from Azure Functions and open-source runtimes into [Azure API Center](../api-center/register-discover-mcp-server.md).
- Enable GitHub Copilot, Claude by Anthropic, or ChatGPT to interact securely with tools across your enterprise.

API Management also supports MCP servers natively exposed in API Management from managed REST APIs. For more information, see [Expose a REST API as an MCP server](export-rest-mcp-server.md).

Learn more about:

* [MCP server support in API Management](mcp-server-overview.md)
* [AI gateway capabilities](genai-gateway-capabilities.md)

## Limitations

* The external MCP server must conform to MCP version `2025-06-18` or later. The server can support:
    * Either no authorization, or authorization protocols that comply with the following standards: [https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#standards-compliance](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#standards-compliance).
    * Streamable HTTP or SSE transport types.
  
* For external MCP servers, API Management currently supports MCP server tools and resources, but it doesn't support MCP prompts.
* API Management currently doesn't support MCP server capabilities in [workspaces](workspaces-overview.md).

## Prerequisites

+ If you don't already have an API Management instance, complete the following quickstart: [Create an Azure API Management instance](get-started-create-service-instance.md). The instance must be in one of the service tiers that supports MCP servers.

+ Access to an external MCP-compatible server (for example, hosted in Azure Logic Apps, Azure Functions, LangServe, or other platforms).

+ Appropriate credentials to the MCP server (such as OAuth 2.0 client credentials or API keys, depending on the server) for secure access.

+ If you enable diagnostic logging through Application Insights or Azure Monitor at the global scope (all APIs) for your API Management instance, set the **Number of payload bytes to log** setting for Frontend Response to 0. This setting prevents unintended logging of response bodies across all APIs and helps ensure proper functioning of MCP servers. To log payloads selectively for specific APIs, configure the setting individually at the API scope, allowing targeted control over response logging.

+ To test the MCP server, use Visual Studio Code with access to [GitHub Copilot](https://code.visualstudio.com/docs/copilot/setup) or a tool such as MCP Inspector.

## Expose an existing MCP server

Follow these steps to expose an existing MCP server in API Management:

1. In the [Azure portal](https://portal.azure.com), go to your API Management instance.
1. In the left-hand menu, under **APIs**, select **MCP servers** > **+ Create MCP server**.
1. Select **Expose an existing MCP server**.
1. In **Backend MCP server**:
    1. Enter the existing **MCP server base URL**. For example, `https://learn.microsoft.com/api/mcp` for the Microsoft Learn MCP server.
    1. In **Transport type**, **Streamable HTTP** is selected by default.
1. In **New MCP server**:
    1. Enter a **Name** for the MCP server in API Management.
    1. In **Base path**, enter a route prefix for tools. For example, `mytools`.
    1. Optionally, enter a **Description** for the MCP server. 
1. In **Products**, optionally select one or more products to associate with the MCP server. Associating the MCP server with a product allows you to manage access and subscriptions for the MCP server through that product.
1. Select **Create**.

Screenshot of creating an MCP server in the portal.

* The portal creates the MCP server and exposes the remote server's operations as tools. 
* The portal lists the MCP server in the **MCP Servers** pane. The **Server URL** column shows the MCP server URL to call for testing or within a client application.

> **Note:**
> You can select the operations exposed as tools for AI agents and LLMs to call later in the **Tools** blade of your MCP server.

Screenshot of the MCP server list in the portal.

## Configure policies for the MCP server

Configure one or more API Management [policies](api-management-howto-policies.md) to help manage the MCP server. The policies apply to all API operations exposed as tools in the MCP server. Use these policies to control access, authentication, and other aspects of the tools.

Learn more about configuring policies:

* [Policies in API Management](api-management-howto-policies.md)
* [Transform and protect your API](transform-api.md)
* [Set and edit policies](set-edit-policies.md)
* [Secure access to MCP server](secure-mcp-servers.md)

> **Caution:**
> Don't access the response body by using the `context.Response.Body` variable within MCP server policies. Doing so triggers response buffering, which interferes with the streaming behavior required by MCP servers and might cause them to malfunction.

To configure policies for the MCP server, follow these steps: 

1. In the [Azure portal](https://portal.azure.com), go to your API Management instance.
1. In the left-hand menu, under **APIs**, select **MCP Servers**.
1. Select an MCP server from the list.
1. In the left menu, under **MCP**, select **Policies**.
1. In the policy editor, add or edit the policies you want to apply to the MCP server's tools. Define the policies in XML format. 

    For example, you can add policies to the Inbound section to limit calls to the MCP server's tools (in this example, 5 calls per 30 seconds per IP address) and to add a custom trace of the agent ID of the caller.

    ```xml
    <inbound>
        <base />
        <rate-limit-by-key calls="5" renewal-period="30" counter-key="@(context.Request.IpAddress)" remaining-calls-variable-name="remainingCallsPerIP" />
		<trace source="My MCP" severity="information">
			<message>My MCP trace info</message>
			<metadata name="agent-id" value="@(context.Request.Headers.GetValueOrDefault("agent-id", "n/a"))" />
    </inbound>
    ```

    Screenshot of the policy editor for an MCP server.

> **Note:**
> API Management evaluates policies configured at the global (all APIs) scope before it evaluates policies at the MCP server scope.

## Validate and use the MCP server

Use a compliant LLM agent (such as GitHub Copilot, Semantic Kernel, or Copilot Studio) or a test client (such as `curl`) to call the API Management-hosted MCP endpoint. Ensure that the request includes appropriate headers or tokens, and confirm successful routing and response from the MCP server.

> **Tip:**
> If you use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) to test an MCP server managed by API Management, use version 0.9.0.

### Add the MCP server in Visual Studio Code

In Visual Studio Code, use GitHub Copilot chat in agent mode to add the MCP server and use the tools. For background about MCP servers in Visual Studio Code, see [Use MCP Servers in VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

To add the MCP server in Visual Studio Code:

1. Use the **MCP: Add Server** command from the Command Palette. 
1. When prompted, select the server type: **HTTP (HTTP or Server Sent Events)**.
1. Enter the **Server URL** of the MCP server in API Management. For example, `https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp` for the MCP endpoint.
1. Enter a **Server ID** of your choice.
1. Select whether to save the configuration to your **workspace settings** or **user settings**. 
    * **Workspace settings** - The server configuration is saved to a `.vscode/mcp.json` file only available in the current workspace.

    * **User settings** - The server configuration is added to your global `settings.json` file and is available in all workspaces. The configuration looks similar to the following:

    Screenshot of MCP servers configured in Visual Studio Code.
        
Add fields to the JSON configuration for settings such as authentication header. The following example shows the configuration for an API Management subscription key passed in a header as an input value. Learn more about the [configuration format](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_configuration-format)   

Screenshot of authentication header configuration for an MCP server

### Use tools in agent mode

After adding an MCP server in Visual Studio Code, you can use tools in agent mode.

1. In GitHub Copilot chat, select **Agent** mode and select the **Tools** button to see available tools.

    Screenshot of Tools button in chat.

1. Select one or more tools from the MCP server to make available in the chat.

    Screenshot of selecting tools in Visual Studio Code.

1. Enter a prompt in the chat to invoke the tool. For example, if you selected a tool to get information about an order, you can ask the agent about an order. 

    ```copilot-prompt
    Get information for order 2
    ```

    Select **Continue** to see the results. The agent uses the tool to call the MCP server and returns the results in the chat.
    
    Screenshot of chat results in Visual Studio Code.

## Troubleshooting and known issues

| **Problem** | **Cause** | **Solution** |
| --- | --- | --- |
| `401 Unauthorized` error from backend | Authorization header not forwarded | If necessary, use `set-header` policy to manually attach token |
| API call works in API Management but fails in agent | Incorrect base URL or missing token | Double-check security policies and endpoint |
| MCP server streaming fails when diagnostic logs are enabled | Logging of response body or accessing response body through policy interferes with MCP transport | Disable response body logging at the All APIs scope - see [Prerequisites](#prerequisites) |

## Related content

* [Sample: MCP Servers authorization with Protected Resource Metadata (PRM)](https://github.com/blackchoey/remote-mcp-apim-oauth-prm/)

* [Sample: Secure remote MCP servers using Azure API Management (experimental)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

* [MCP client authorization lab](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

* [Use the Azure API Management extension for VS Code to import and manage APIs](visual-studio-code-tutorial.md)

* [Register and discover remote MCP servers in Azure API Center](../api-center/register-discover-mcp-server.md)

* [Expose REST API in API Management as an MCP server](export-rest-mcp-server.md)

* [Expose and govern existing MCP server](expose-existing-mcp-server.md)
