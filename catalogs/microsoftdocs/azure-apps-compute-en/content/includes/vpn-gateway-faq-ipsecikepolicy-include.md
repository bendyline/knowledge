---
 title: Include file
 author: duongau
 ms.service: azure-vpn-gateway
 ms.date: 08/19/2026
 ms.author: duau
---
### Is a custom IPsec/IKE policy supported on all Azure VPN Gateway SKUs?

A custom IPsec/IKE policy is supported on all Azure VPN Gateway SKUs except the Basic SKU.

### How many policies can I specify on a connection?

You can specify only one policy combination for a connection.

### Can I specify a partial policy on a connection (for example, only IKE algorithms but not IPsec)?

No, you must specify all algorithms and parameters for both IKE (Main Mode) and IPsec (Quick Mode). Partial policy specification isn't allowed.

### What algorithms and key strengths does the custom policy support?

The following table lists the supported cryptographic algorithms and key strengths that you can configure. You must select one option for every field.


| IPsec/IKEv2 | Options |
| --- | --- |
| IKEv2 encryption | GCMAES256, GCMAES128, AES256, AES192, AES128 |
| IKEv2 integrity | SHA384, SHA256, SHA1, MD5 |
| DH group | DHGroup24, ECP384, ECP256, DHGroup14, DHGroup2048, DHGroup2, DHGroup1, None |
| IPsec encryption | GCMAES256, GCMAES192, GCMAES128, AES256, AES192, AES128, DES3, DES, None |
| IPsec integrity | GCMAES256, GCMAES192, GCMAES128, SHA256, SHA1, MD5 |
| PFS group | PFS24, ECP384, ECP256, PFS2048, PFS2, PFS1, None |
| Quick Mode SA lifetime | (Optional; default values if not specified)<br>Seconds (integer; minimum 300, default 27,000)<br>Kilobytes (integer; minimum 1,024, default 102,400,000) |
| Traffic selector | `UsePolicyBasedTrafficSelectors` (`$True` or `$False`, but optional; default `$False` if not specified) |
| DPD timeout | Seconds (integer; minimum 9, maximum 3,600, default 45) |



* Your on-premises VPN device configuration must match or contain the following algorithms and parameters that you specify on the Azure IPsec or IKE policy:

  * IKE encryption algorithm (Main Mode, Phase 1)
  * IKE integrity algorithm (Main Mode, Phase 1)
  * DH group (Main Mode, Phase 1)
  * IPsec encryption algorithm (Quick Mode, Phase 2)
  * IPsec integrity algorithm (Quick Mode, Phase 2)
  * PFS group (Quick Mode, Phase 2)
  * Traffic selector (if you use `UsePolicyBasedTrafficSelectors`)
  * SA lifetimes (local specifications that don't need to match)

* If you use GCMAES for the IPsec encryption algorithm, you must select the same GCMAES algorithm and key length for IPsec integrity. For example, use GCMAES128 for both.

* In the table of algorithms and keys:

  * IKE corresponds to Main Mode or Phase 1.
  * IPsec corresponds to Quick Mode or Phase 2.
  * DH group specifies the Diffie-Hellman group used in Main Mode or Phase 1.
  * PFS group specifies the Diffie-Hellman group used in Quick Mode or Phase 2.

* IKE Main Mode SA lifetime is fixed at 28,800 seconds on the Azure VPN gateways.

* `UsePolicyBasedTrafficSelectors` is an optional parameter on the connection. If you set `UsePolicyBasedTrafficSelectors` to `$True` on a connection, it configures the VPN gateway to connect to an on-premises policy-based VPN firewall.

  If you enable `UsePolicyBasedTrafficSelectors`, ensure that your VPN device has the matching traffic selectors defined with all combinations of your on-premises network (local network gateway) prefixes to or from the Azure virtual network prefixes, instead of any-to-any. The VPN gateway accepts whatever traffic selector the remote VPN gateway proposes, irrespective of what's configured on the VPN gateway.

  For example, if your on-premises network prefixes are 10.1.0.0/16 and 10.2.0.0/16, and your virtual network prefixes are 192.168.0.0/16 and 172.16.0.0/16, you need to specify the following traffic selectors:

  * 10.1.0.0/16 <====> 192.168.0.0/16
  * 10.1.0.0/16 <====> 172.16.0.0/16
  * 10.2.0.0/16 <====> 192.168.0.0/16
  * 10.2.0.0/16 <====> 172.16.0.0/16

  For more information about policy-based traffic selectors, see [Connect a VPN gateway to multiple on-premises policy-based VPN devices](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-connect-multiple-policybased-rm-ps.md).

* Setting the timeout to shorter periods causes IKE to rekey more aggressively. The connection can then appear to be disconnected in some instances. This situation might not be desirable if your on-premises locations are farther away from the Azure region where the VPN gateway resides, or if the physical link condition could incur packet loss. We generally recommend that you set the timeout to *between 30 and 45* seconds.


### How do I troubleshoot a PFS group mismatch?

The PFS group in a custom IPsec/IKE policy is the Diffie-Hellman group used for Quick Mode (Phase 2). Your on-premises VPN device configuration must match or contain the PFS group configured in the Azure IPsec/IKE policy. If it doesn't, the connection can't establish. For inspection and remediation steps, see [Step 7 in Troubleshoot Azure Site-to-Site VPN disconnects intermittently](https://learn.microsoft.com/troubleshoot/azure/vpn-gateway/vpn-gateway-troubleshoot-site-to-site-disconnected-intermittently#step-7-check-whether-the-on-premises-vpn-device-has-perfect-forward-secrecy-enabled), [Configure custom IPsec/IKE policies in the Azure portal](https://learn.microsoft.com/azure/vpn-gateway/ipsec-ike-policy-howto#step-3-configure-a-custom-ipsecike-policy-on-the-s2s-vpn-connection), and [Configure custom IPsec/IKE policies with Azure PowerShell](https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-ipsecikepolicy-rm-powershell#managepolicy).

For more information, see [Connect a VPN gateway to multiple on-premises policy-based VPN devices](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-connect-multiple-policybased-rm-ps.md).

### <a name ="DH"></a>Which Diffie-Hellman groups does the custom policy support?

The following table lists the corresponding Diffie-Hellman groups that the custom policy supports:


| Diffie-Hellman group | DHGroup | PFSGroup | Key length |
| --- | --- | --- | --- |
| 1 | DHGroup1 | PFS1 | 768-bit MODP |
| 2 | DHGroup2 | PFS2 | 1024-bit MODP |
| 14 | DHGroup14<br>DHGroup2048 | PFS2048 | 2048-bit MODP |
| 19 | ECP256 | ECP256 | 256-bit ECP |
| 20 | ECP384 | ECP384 | 384-bit ECP |
| 24 | DHGroup24 | PFS24 | 2048-bit MODP |

For more information, refer to [RFC3526](https://tools.ietf.org/html/rfc3526) and [RFC5114](https://tools.ietf.org/html/rfc5114).

### Does the custom policy replace the default IPsec/IKE policy sets for VPN gateways?

Yes. After you specify a custom policy on a connection, Azure VPN Gateway uses only that policy on the connection, both as IKE initiator and IKE responder.

### If I remove a custom IPsec/IKE policy, does the connection become unprotected?

No, IPsec/IKE still helps protect the connection. After you remove the custom policy from a connection, the VPN gateway reverts to the [default list of IPsec/IKE proposals](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-about-vpn-devices.md#RouteBasedOffers) and restarts the IKE handshake with your on-premises VPN device.

### Would adding or updating an IPsec/IKE policy disrupt my VPN connection?

Yes. It could cause a small disruption (a few seconds) as the VPN gateway tears down the existing connection and restarts the IKE handshake to reestablish the IPsec tunnel with the new cryptographic algorithms and parameters. Ensure that your on-premises VPN device is also configured with the matching algorithms and key strengths to minimize the disruption.

### Can I use different policies on different connections?

Yes. A custom policy is applied on a per-connection basis. You can create and apply different IPsec/IKE policies on different connections.

You can also choose to apply custom policies on a subset of connections. The remaining ones use the Azure default IPsec/IKE policy sets.

### Can I use a custom policy on VNet-to-VNet connections?

Yes. You can apply a custom policy on both IPsec cross-premises connections and VNet-to-VNet connections.

### Do I need to specify the same policy on both VNet-to-VNet connection resources?

Yes. A VNet-to-VNet tunnel consists of two connection resources in Azure, one for each direction. Make sure both connection resources have the same policy. Otherwise, the VNet-to-VNet connection won't be established.

### What is the default DPD timeout value? Can I specify a different DPD timeout?

The default DPD timeout is 45 seconds on VPN gateways. You can specify a different DPD timeout value on each IPsec or VNet-to-VNet connection, from 9 seconds to 3,600 seconds.

> **Note:**
> Setting the timeout to shorter periods causes IKE to rekey more aggressively. The connection can then appear to be disconnected in some instances. This situation might not be desirable if your on-premises locations are farther away from the Azure region where the VPN gateway resides, or if the physical link condition could incur packet loss. We generally recommend that you set the timeout to *between 30 and 45* seconds.

### Does a custom IPsec/IKE policy work on ExpressRoute connections?

No. An IPsec/IKE policy works only on S2S VPN and VNet-to-VNet connections via the VPN gateways.

### How do I create connections with the IKEv1 or IKEv2 protocol type?

You can create IKEv1 connections on all route-based VPN-type SKUs, except the Basic SKU, Standard SKU, and other [earlier SKUs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-about-skus-legacy.md#gwsku).

You can specify a connection protocol type of IKEv1 or IKEv2 while creating connections. If you don't specify a connection protocol type, IKEv2 is used as default option where applicable. For more information, see the [Azure PowerShell cmdlet](https://learn.microsoft.com/powershell/module/az.network/new-azvirtualnetworkgatewayconnection) documentation.

For information about SKU types and support for IKEv1 and IKEv2, see [Connect a VPN gateway to multiple on-premises policy-based VPN devices](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-connect-multiple-policybased-rm-ps.md).

### Is transit between IKEv1 and IKEv2 connections allowed?

Yes.

### Can I have IKEv1 site-to-site connections on the Basic SKU for the route-based VPN type?

No. The Basic SKU doesn't support this configuration.

### Can I change the connection protocol type after the connection is created (IKEv1 to IKEv2 and vice versa)?

No. After you create the connection, you can't change IKEv1 and IKEv2 protocols. You must delete and re-create a new connection with the desired protocol type.

### Why is my IKEv1 connection frequently reconnecting?

If your static routing or route-based IKEv1 connection is disconnecting at routine intervals, it's likely because your VPN gateways don't support in-place rekeys. When Main Mode is being rekeyed, your IKEv1 tunnels disconnect and take up to 5 seconds to reconnect. Your Main Mode negotiation timeout value determines the frequency of rekeys. To prevent these reconnects, you can switch to using IKEv2, which supports in-place rekeys.

If your connection is reconnecting at random times, follow the [troubleshooting guide](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-troubleshoot-site-to-site-disconnected-intermittently.md).

### Where can I find more information and steps for configuration?

See the following articles:

* [Configure custom IPsec/IKE connection policies for S2S VPN and VNet-to-VNet: Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/ipsec-ike-policy-howto.md)
* [Configure custom IPsec/IKE connection policies for S2S VPN and VNet-to-VNet: PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/vpn-gateway-ipsecikepolicy-rm-powershell.md)
