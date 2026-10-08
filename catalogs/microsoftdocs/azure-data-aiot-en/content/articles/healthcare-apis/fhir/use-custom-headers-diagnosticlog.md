---
title: Add data to audit logs by using custom headers - FHIR service
description: This article describes how to add data to audit logs by using custom HTTP headers in FHIR service.
services: healthcare-apis
ms.service: azure-health-data-services
ms.subservice: fhir
ms.topic: tutorial
ms.author: kesheth
author: expekesheth
ms.date: 10/10/2025
---
 
# Add data to audit logs by using custom HTTP headers in FHIR service 


In the Azure Fast Healthcare Interoperability Resources (FHIR&reg;) API, you might want to include extra information in the logs that comes from the calling system.

For example, when the user of the API is authenticated by an external system, that system forwards the call to the FHIR API. At the FHIR API layer, the information about the original user is lost, because the call was forwarded. It might be necessary to log and retain this user information for auditing or management purposes. The calling system can provide user identity, caller location, or other necessary information in the HTTP headers, which is carried along as the call is forwarded.

You can use custom headers to capture several types of information. For example:
* Identity or authorization information
* Origin of the caller
* Originating organization
* Client system details (electronic health record, patient portal)

> **Important:**
> Encrypt any information before adding it to custom headers. Don't pass any PHI information through customer headers.

You must use the following naming convention for your HTTP headers: X-MS-AZUREFHIR-AUDIT-\<name>.

These HTTP headers are included in a property bag that is added to the log. For example:

* X-MS-AZUREFHIR-AUDIT-USERID: 1234 
* X-MS-AZUREFHIR-AUDIT-USERLOCATION: XXXX
* X-MS-AZUREFHIR-AUDIT-XYZ: 1234

This information is then serialized to JSON when it's added to the properties column in the log. For example:

```json
{ "X-MS-AZUREFHIR-AUDIT-USERID" : "1234",
"X-MS-AZUREFHIR-AUDIT-USERLOCATION" : "XXXX",
"X-MS-AZUREFHIR-AUDIT-XYZ" : "1234" }
```
 
As with any HTTP header, the same header name can be repeated with different values. For example:

* X-MS-AZUREFHIR-AUDIT-USERLOCATION: HospitalA
* X-MS-AZUREFHIR-AUDIT-USERLOCATION: Emergency

When you add the values to the log, they combine into a comma-delimited list. For example:

{ "X-MS-AZUREFHIR-AUDIT-USERLOCATION" : "HospitalA, Emergency" }
 
You can add up to 10 unique headers (repetitions of the same header with different values count as one). The total maximum length of the value for any one header is 2,048 characters.

If you're using the Firefly C# client API library, the code looks something like this:

```C#
FhirClient client;
client = new FhirClient(serverUrl);
client.OnBeforeRequest += (object sender, BeforeRequestEventArgs e) =>
{
    // Add custom headers to be added to the logs
    e.RawRequest.Headers.Add("X-MS-AZUREFHIR-AUDIT-UserLocation", "HospitalA");
};
client.Get("Patient");
```

    
## Next steps

In this article, you learned how to add data to audit logs by using custom headers in the FHIR&reg; service. For information about FHIR service, see

>
>[FHIR Overview](overview.md)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7.
