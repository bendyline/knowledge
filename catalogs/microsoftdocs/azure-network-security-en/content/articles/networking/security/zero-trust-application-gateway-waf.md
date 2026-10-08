---
title: Zero Trust recommendations for Azure Application Gateway WAF
description: Review Zero Trust security recommendations for Azure Web Application Firewall on Application Gateway to help protect your web applications.
author: duongau
ms.author: duau
ms.service: azure-web-application-firewall
ms.topic: best-practice
ms.date: 03/17/2026
ms.custom: Network-Secure-Recommendation
---

# Zero Trust recommendations for Application Gateway WAF

Azure Web Application Firewall on Application Gateway protects web applications from common exploits and vulnerabilities. The following recommendations help you verify that WAF is properly configured and monitored.

For a summary of all Azure network security Zero Trust recommendations, see [Azure network security Zero Trust recommendations](zero-trust-network-security.md).

## Recommendations

### Application Gateway WAF is enabled in prevention mode

Azure Application Gateway Web Application Firewall (WAF) protects regional web applications from common exploits and vulnerabilities such as SQL injection, cross-site scripting, and other Open Worldwide Application Security Project (OWASP) Top 10 threats. In Detection mode, the WAF logs rule matches but still forwards the request to the backend pool. Only Prevention mode blocks requests that violate WAF rules. An Application Gateway WAF left in Detection mode records attacks against your backend servers without stopping them.

**Remediation action**

- [Configure WAF on Azure Application Gateway](https://learn.microsoft.com/azure/web-application-firewall/ag/ag-overview#waf-modes)
- [Create and manage WAF policies for Application Gateway](https://learn.microsoft.com/azure/web-application-firewall/ag/create-waf-policy-ag)


### Request body inspection is enabled in Application Gateway WAF

Azure Application Gateway Web Application Firewall (WAF) inspects HTTP POST, PUT, and PATCH request bodies for SQL injection, cross-site scripting, and command injection payloads before traffic reaches your regional backend pool. If you turn off request body inspection, the WAF evaluates only request headers and the URI. As a result, payloads hidden in form posts, API calls, and file uploads reach backend servers unexamined. Managed rule sets, including the Open Worldwide Application Security Project (OWASP) Core Rule Set and the Microsoft Bot Manager rule set, can't act on content they never see.

**Remediation action**

- [Azure Web Application Firewall on Azure Application Gateway overview](https://learn.microsoft.com/azure/web-application-firewall/ag/ag-overview)
- [Create Web Application Firewall policies for Application Gateway](https://learn.microsoft.com/azure/web-application-firewall/ag/create-waf-policy-ag) including request body inspection settings
- [Application Gateway WAF FAQ and tuning best practices](https://learn.microsoft.com/azure/web-application-firewall/ag/application-gateway-waf-faq)


### Default rule set is enabled in Application Gateway WAF

Azure Application Gateway Web Application Firewall (WAF) applies protection through managed rule sets: the Microsoft Default Rule Set and the Open Worldwide Application Security Project (OWASP) Core Rule Set. Microsoft updates both rule sets continuously with detection signatures for known attack patterns, so you don't need in-house security expertise to configure them. A WAF policy with no managed rule set assigned inspects nothing and passes every request to the backend pool. Automated toolkits scan continuously for applications in this state and exploit well-documented SQL injection, cross-site scripting, and command injection vulnerabilities against backend servers.

**Remediation action**

- [Azure Web Application Firewall on Azure Application Gateway overview](https://learn.microsoft.com/azure/web-application-firewall/ag/ag-overview) including managed rule sets
- [Web Application Firewall CRS rule groups and rules](https://learn.microsoft.com/azure/web-application-firewall/ag/application-gateway-crs-rulegroups-rules)
- [Create Web Application Firewall policies for Application Gateway](https://learn.microsoft.com/azure/web-application-firewall/ag/create-waf-policy-ag) with managed rule sets


### Bot protection rule set is enabled and assigned in Application Gateway WAF

Azure Application Gateway Web Application Firewall (WAF) provides bot protection through the Microsoft Bot Manager rule set, which classifies automated traffic as known good, known bad, or unknown based on behavioral patterns, bot signatures, and IP reputation. Without the rule set enabled, credential stuffing, content scraping, inventory hoarding, and application-layer denial of service traffic blend in with legitimate requests and consume backend capacity. Attacks of this kind commonly originate from distributed botnets that rotate IP addresses to evade rate limiting, which is why signature-based classification is needed rather than throttling alone.

**Remediation action**

- [Azure WAF on Azure Application Gateway overview](https://learn.microsoft.com/azure/web-application-firewall/ag/ag-overview)
- [Configure bot protection for WAF on Azure Application Gateway](https://learn.microsoft.com/azure/web-application-firewall/ag/bot-protection)
- [WAF bot protection overview](https://learn.microsoft.com/azure/web-application-firewall/ag/bot-protection-overview)


### HTTP DDoS protection rule set is enabled in Application Gateway WAF

Azure Application Gateway Web Application Firewall (WAF) provides HTTP distributed denial of service (DDoS) protection through the Microsoft HTTP DDoS Rule Set, which detects and mitigates volumetric HTTP-based attacks at the application layer. Unlike network-layer DDoS attacks that target bandwidth, HTTP-based DDoS attacks exploit the application layer by sending seemingly legitimate HTTP requests at high volumes to exhaust server resources, database connections, and application threads. Without HTTP DDoS protection enabled, threat actors can execute HTTP flood attacks that overwhelm backend servers, slowloris attacks that hold connections open to exhaust connection pools, and high-frequency request patterns designed to trigger resource-intensive operations. The HTTP DDoS rule set contains rule groups that detect abnormal request rates based on configurable sensitivity levels and can block, log, or redirect malicious traffic before it impacts backend application servers.

**Remediation action**

- [Azure Web Application Firewall on Azure Application Gateway overview](https://learn.microsoft.com/azure/web-application-firewall/ag/ag-overview) including DDoS protection rule sets
- [Web Application Firewall CRS rule groups and rules](https://learn.microsoft.com/azure/web-application-firewall/ag/application-gateway-crs-rulegroups-rules) including HTTP DDoS rules
- [Create Web Application Firewall policies for Application Gateway](https://learn.microsoft.com/azure/web-application-firewall/ag/create-waf-policy-ag) with managed rule sets
- [Azure DDoS Protection overview](https://learn.microsoft.com/azure/ddos-protection/ddos-protection-overview)


### Rate limiting is enabled in Application Gateway WAF

Azure Application Gateway Web Application Firewall (WAF) supports rate limiting through custom rules that restrict the number of requests clients can make within a specified time window. Rate limiting protects applications from brute force attacks, credential stuffing, API abuse, and application-layer denial of service attacks that flood endpoints with excessive requests. Without rate limiting configured, threat actors can attempt thousands of password combinations per minute against authentication endpoints, test stolen credentials at scale, extract large volumes of data, and overwhelm server capacity. Rate limiting rules allow administrators to define thresholds based on request count per minute and track individual clients by IP address. When a client exceeds the configured threshold, the WAF can block subsequent requests, log the violation, or redirect to a custom page.

**Remediation action**

- [Azure Web Application Firewall on Azure Application Gateway overview](https://learn.microsoft.com/azure/web-application-firewall/ag/ag-overview) including custom rules
- [Create and use Web Application Firewall v2 custom rules on Application Gateway](https://learn.microsoft.com/azure/web-application-firewall/ag/create-custom-waf-rules) including rate limiting
- [Web Application Firewall custom rules overview](https://learn.microsoft.com/azure/web-application-firewall/ag/custom-waf-rules-overview) including RateLimitRule type
- [Rate limiting in Application Gateway WAF](https://learn.microsoft.com/azure/web-application-firewall/ag/rate-limiting-overview)


### JavaScript challenge is enabled in Application Gateway WAF

Azure Application Gateway Web Application Firewall (WAF) supports JavaScript challenge (currently in preview) as a defense mechanism against automated bots and headless browsers. When a request triggers a challenge, the WAF serves a JavaScript snippet that the client browser must execute to obtain a valid challenge cookie, proving the request originates from a real browser rather than a simple HTTP client or bot. Clients that successfully execute the challenge proceed normally until the cookie expires, while bots and automated tools that cannot execute JavaScript are blocked. This mechanism is effective against credential stuffing bots, web scrapers, and application-layer distributed denial of service (DDoS) bots that use simple HTTP libraries without JavaScript engines. JavaScript challenge provides a middle ground between allowing all traffic and blocking suspected bots outright, verifying browser capability without requiring user interaction like CAPTCHA.

**Remediation action**

- [Azure WAF on Azure Application Gateway overview](https://learn.microsoft.com/azure/web-application-firewall/ag/ag-overview)
- [Create and use WAF v2 custom rules on Application Gateway](https://learn.microsoft.com/azure/web-application-firewall/ag/create-custom-waf-rules)
- [WAF custom rules overview](https://learn.microsoft.com/azure/web-application-firewall/ag/custom-waf-rules-overview)
- [Bot protection overview for Application Gateway WAF](https://learn.microsoft.com/azure/web-application-firewall/ag/bot-protection-overview)


### Diagnostic logging is enabled in Application Gateway WAF

Azure Application Gateway Web Application Firewall (WAF) protects web applications from common exploits including SQL injection, cross-site scripting, and Open Worldwide Application Security Project (OWASP) Top 10 threats. When diagnostic logging is not enabled, security teams lose visibility into blocked attacks, rule matches, access patterns, and firewall events. Without logging, exploits go undetected and incident responders cannot correlate WAF events with other telemetry or construct attack timelines. Application Gateway WAF provides multiple log categories including Access Logs, Performance Logs, and Firewall Logs that must be routed to Log Analytics, a storage account, or an event hub for security monitoring.

**Remediation action**

- [Create a Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/quick-create-workspace)
- [Create diagnostic settings in Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/create-diagnostic-settings)
- [Application Gateway WAF logs and metrics](https://learn.microsoft.com/azure/web-application-firewall/ag/application-gateway-waf-metrics)
- [Monitor Azure Application Gateway](https://learn.microsoft.com/azure/application-gateway/application-gateway-diagnostics)
- [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview)


## Related content

- [Azure network security Zero Trust recommendations](zero-trust-network-security.md)
- [Azure Web Application Firewall on Application Gateway overview](https://learn.microsoft.com/azure/web-application-firewall/ag/ag-overview)
- [Create and manage WAF policies for Application Gateway](https://learn.microsoft.com/azure/web-application-firewall/ag/create-waf-policy-ag)
