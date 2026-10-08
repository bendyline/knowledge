---
title: Zero Trust recommendations for Azure Front Door WAF
description: Review Zero Trust security recommendations for Azure Web Application Firewall on Front Door to help protect your web applications at the network edge.
author: duongau
ms.author: duau
ms.service: azure-web-application-firewall
ms.topic: best-practice
ms.date: 03/17/2026
ms.custom: Network-Secure-Recommendation
---

# Zero Trust recommendations for Azure Front Door WAF

Azure Web Application Firewall on Front Door protects web applications at the network edge from common exploits and vulnerabilities. The following recommendations help you verify that WAF is properly configured and monitored.

For a summary of all Azure network security Zero Trust recommendations, see [Azure network security Zero Trust recommendations](zero-trust-network-security.md).

## Recommendations

### Azure Front Door WAF is enabled in prevention mode

Azure Front Door Web Application Firewall (WAF) protects globally distributed web applications at the network edge from common exploits and vulnerabilities such as SQL injection, cross-site scripting, and other Open Worldwide Application Security Project (OWASP) Top 10 threats. In Detection mode, the WAF logs rule matches but still forwards the request to your origin. Only Prevention mode blocks requests that violate WAF rules. A Front Door WAF left in Detection mode lets attack traffic reach origins from every edge location it serves.

**Remediation action**

- [Configure WAF for Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/afds-overview)
- [Policy settings for WAF in Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-policy-settings#waf-mode)


### Request body inspection is enabled in Azure Front Door WAF

Azure Front Door Web Application Firewall (WAF) inspects HTTP POST, PUT, and PATCH request bodies for SQL injection, cross-site scripting, and command injection payloads at the edge, before traffic is forwarded to your origins. If you turn off request body inspection, only headers and the URI are evaluated at the edge. As a result, payloads hidden in form posts, API calls, and file uploads are forwarded to origins unexamined. Managed rule sets, including the Open Worldwide Application Security Project (OWASP) Core Rule Set and Microsoft's threat intelligence-based rules, can't act on content they never see.

**Remediation action**

- [Azure Web Application Firewall on Azure Front Door overview](https://learn.microsoft.com/azure/web-application-firewall/afds/afds-overview)
- [Policy settings for Web Application Firewall on Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-policy-settings) including request body inspection configuration
- [Tuning Azure Web Application Firewall for Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-tuning)


### Default rule set is assigned in Azure Front Door WAF

Azure Front Door Web Application Firewall (WAF) applies protection at the global edge through the Microsoft Default Rule Set, which Microsoft updates continuously with detection signatures for known attack patterns. A WAF policy with no managed rule set assigned inspects nothing and forwards every request to your origins. Assigning a managed rule set blocks SQL injection, cross-site scripting, local file inclusion, and command injection attempts at the edge, before automated toolkits reach origin servers.

**Remediation action**

- [Azure WAF on Azure Front Door overview](https://learn.microsoft.com/azure/web-application-firewall/afds/afds-overview)
- [WAF DRS rule groups and rules for Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-drs)
- [Create a WAF policy on Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-create-portal)


### Bot protection rule set is enabled and assigned in Azure Front Door WAF

Azure Front Door Web Application Firewall (WAF) provides bot protection through the Bot Manager rule set, available only in the Premium tier. This rule set classifies automated traffic at the global edge as known good, known bad, or unknown. You can assign a separate action to each category: block bad bots or challenge them with CAPTCHA, and allow search engine crawlers and other legitimate bots through. Without the rule set assigned, Front Door has no bot classification signal, so you can't separate human users from automated clients in metrics and logs. Scraping or credential stuffing traffic reaches your origins unchallenged.


**Remediation action**

- [Azure Front Door tier comparison](https://learn.microsoft.com/azure/frontdoor/standard-premium/tier-comparison)
- [Create a WAF policy for Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-create-portal)
- [Configure bot protection for WAF on Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-policy-configure-bot-protection)
- [Add security policy in Azure Front Door](https://learn.microsoft.com/azure/frontdoor/how-to-configure-endpoints#add-security-policy)
- [Bot protection rule set on Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/afds-overview#bot-protection-rule-set)
- [Monitor metrics and logs in Azure Front Door](https://learn.microsoft.com/azure/frontdoor/front-door-diagnostics)


### Rate limiting is enabled in Azure Front Door WAF

Azure Front Door Web Application Firewall (WAF) supports rate limiting through custom rules that restrict the number of requests clients can make within a specified time window across the global edge network. Without rate limiting, threat actors can execute brute force attacks against authentication endpoints, credential stuffing at scale, API abuse that extracts data or consumes backend resources, and application-layer denial of service attacks that flood endpoints. Rate limiting rules allow administrators to define thresholds based on request count per minute with the ability to group requests by client IP address. When a client exceeds the configured threshold, the WAF can block subsequent requests, log violations, issue CAPTCHA challenges, or redirect to a custom page. Rate limiting at the global edge ensures malicious traffic is blocked before reaching origin servers.

**Remediation action**

- [Azure WAF on Azure Front Door overview](https://learn.microsoft.com/azure/web-application-firewall/afds/afds-overview)
- [WAF custom rules for Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-custom-rules)
- [Create a WAF policy on Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-create-portal)
- [Rate limiting for Azure Front Door WAF](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-rate-limit)


### JavaScript challenge is enabled in Azure Front Door WAF

Azure Front Door Web Application Firewall (WAF) supports JavaScript challenge as a defense mechanism against automated bots and headless browsers across the global edge network. When a request triggers a challenge, the WAF serves a JavaScript snippet that the client browser must execute to obtain a valid challenge cookie, proving the request originates from a real browser rather than a simple HTTP client or bot. Clients that successfully execute the challenge proceed normally until the cookie expires, while bots and automated tools that cannot execute JavaScript are blocked at the edge before traffic reaches origin servers. This mechanism is effective against credential stuffing bots, web scrapers, and distributed denial of service (DDoS) bots using simple HTTP libraries. JavaScript challenge verifies browser capability without requiring user interaction like CAPTCHA, providing a middle ground between allowing all traffic and blocking suspected bots outright.

**Remediation action**

- [Azure WAF on Azure Front Door overview](https://learn.microsoft.com/azure/web-application-firewall/afds/afds-overview)
- [WAF custom rules for Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-custom-rules)
- [Create a WAF policy on Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-create-portal)
- [Configure JavaScript challenge for Azure Front Door WAF](https://learn.microsoft.com/azure/web-application-firewall/waf-javascript-challenge)


### CAPTCHA challenge is enabled in Azure Front Door WAF

Azure Front Door Web Application Firewall (WAF) supports CAPTCHA challenge as a defense mechanism against sophisticated bots and automated tools across the global edge network. CAPTCHA presents users with a visual or audio puzzle requiring human cognitive ability to solve, proving the request originates from a real human rather than a bot. Users who successfully complete the CAPTCHA receive a challenge cookie allowing normal access until expiration, while bots that cannot solve the puzzle are blocked at the edge. CAPTCHA is more effective than JavaScript challenge against advanced bots using headless browsers with full JavaScript support, as it requires human-level cognition. By configuring custom rules with CAPTCHA challenge action, organizations can protect highly sensitive endpoints like login pages, registration forms, and payment pages from automated abuse.

**Remediation action**

- [Azure WAF on Azure Front Door overview](https://learn.microsoft.com/azure/web-application-firewall/afds/afds-overview)
- [WAF custom rules for Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-custom-rules)
- [Create a WAF policy on Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-create-portal)
- [Configure CAPTCHA challenge for Azure Front Door WAF](https://learn.microsoft.com/azure/web-application-firewall/afds/captcha-challenge)


### Diagnostic logging is enabled in Azure Front Door WAF

Azure Front Door Web Application Firewall (WAF) protects web applications from common exploits including SQL injection, cross-site scripting, and Open Worldwide Application Security Project (OWASP) Top 10 threats at the network edge before malicious traffic reaches origin servers. When diagnostic logging is not enabled, security teams lose visibility into blocked attacks, rule matches, access patterns, and WAF events at the edge. Without logging, threat actors attempting to exploit vulnerabilities go undetected and incident responders cannot construct attack timelines. Azure Front Door WAF provides Access Logs and WAF Logs that must be routed to Log Analytics, a storage account, or an event hub for security monitoring and forensic analysis.

**Remediation action**

- [Create a Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/quick-create-workspace)
- [Create diagnostic settings in Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/create-diagnostic-settings)
- [Azure Front Door WAF monitoring and logging](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-monitor)
- [Monitor metrics and logs in Azure Front Door](https://learn.microsoft.com/azure/frontdoor/front-door-diagnostics)
- [Azure Monitor Workbooks](https://learn.microsoft.com/azure/azure-monitor/visualize/workbooks-overview)
- [Configure Azure Front Door alerts](https://learn.microsoft.com/azure/frontdoor/standard-premium/how-to-monitor-metrics)


## Related content

- [Azure network security Zero Trust recommendations](zero-trust-network-security.md)
- [Azure Web Application Firewall on Azure Front Door overview](https://learn.microsoft.com/azure/web-application-firewall/afds/afds-overview)
- [WAF policy settings for Azure Front Door](https://learn.microsoft.com/azure/web-application-firewall/afds/waf-front-door-policy-settings)
