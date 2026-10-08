---
title: Azure Content Delivery Network POP locations by region
description: This article lists Azure Content Delivery Network POP locations, sorted by region, for Azure Content Delivery Network products.
services: cdn
author: halkazwini
ms.author: halkazwini
manager: kumud
ms.service: azure-content-delivery-network
ms.topic: concept-article
ms.date: 02/28/2026
ms.custom: references_regions
ROBOTS: NOINDEX
# Customer intent: "As a network architect, I want to review the Point of Presence locations for Content Delivery Network services by region, so that I can determine the best infrastructure to optimize content delivery for my application."
---

# Azure Content Delivery Network Coverage by Metro


> **Important:**
> Azure CDN Standard from Microsoft (classic) retires on **September 30, 2027**. Because the service is retiring, it no longer supports profile creation, new domain onboarding, or managed certificates. To avoid service disruption, ⁠[**migrate to Azure Front Door Standard or Premium**](https://learn.microsoft.com/azure/cdn/migrate-tier). For more information, see ⁠[**Azure CDN Standard from Microsoft (classic) retirement**](https://azure.microsoft.com/updates?id=Azure-CDN-Standard-from-Microsoft-classic-will-be-retired-on-30-September-2027).

> 
> - [POP locations by region](cdn-pop-locations.md)
> - [Microsoft POP locations by abbreviation](microsoft-pop-abbreviations.md)
>

This article lists current metros containing point of presence (POP) locations, sorted by region, for Azure Content Delivery Network products. Each metro might contain more than one POP. For example, Azure Content Delivery Network from Microsoft has 192 POPs across 109 metro cities.

> **Important:**
> Each Azure Content Delivery Network product has a distinct way of building its content delivery network infrastructures, hence Microsoft recommends against using POP locations to decide which Azure Content Delivery Network product to use. Instead, you should consider its features and end-user performance. Test the performance with each Azure Content Delivery Network product to choose the right product for your users.
>

## Microsoft

> **Note:**
> A location might contain more than one POP, noted by the number in parentheses.


| Region | Cities |
| --- | --- |
| North America | Etobicoke, Canada (2)<br />Montreal, Canada<br />Vancouver, Canada (2)<br />Querétaro, Mexico (2)<br />Atlanta, GA, USA (3)<br />Boydton, VA, USA (2)<br />Chaska, MN, USA (2)<br /> Cheyenne, WY, USA (2)<br />Chicago, IL, USA (4)<br /> Dallas, TX, USA (4)<br />Des Moines, IA, USA (3)<br />Detroit, MI, USA<br />Englewood, CO, USA (2)<br />Honolulu, HI, USA<br />Houston, TX, USA (3)<br />Jacksonville, FL, USA (2)<br />Las Vegas, NV, USA (3)<br />Los Angeles, CA, USA (2)<br />Manassas, VA, USA (3)<br />Memphis, TN, USA<br /> Miami, FL, USA (4)<br />Minneapolis, MN, USA (2)<br />Needham Heights, MA, USA (2)<br /> Nashville, TN, USA<br />Newark, NJ, USA<br />New York, NY, USA (2)<br />Philadelphia, PA, USA<br />Phoenix, AZ, USA<br />Plano, TX, USA<br />Portland, OR, USA<br />Quincy, WA, USA (3)<br />San Antonio, TX, USA (4)<br />San Jose, CA, USA (4)<br />Salt Lake City, UT, USA (3)<br />Seattle, WA, USA (2)<br />Secaucus, NJ, USA (2)<br />Southfield, MI, USA<br />Tempe, AZ, USA<br /> |
| South America | Buenos Aires, Argentina<br />Campinas, Brazil (2)<br />Rio de Janeiro, Brazil (3)<br />Sao Paulo, Brazil (2)<br />Bogota, Colombia |
| Europe | Zaventem, Belgium (2)<br />Sofia, Bulgaria (2)<br />Prague, Czech Republic<br />Ballerup, Denmark<br /> Vantaa, Finland<br />Les Ulis, France (3)<br />Paris, France<br />Saint Denis, France (2)<br />Berlin, Germany<br />Duesseldorf, Germany<br />Frankfurt, Germany (2)<br />Munich, Germany<br />Russelsheim, Germany (2)<br />Athens, Greece<br />Budapest, Hungary<br />Dublin, Ireland (2)<br />Milan, Italy<br />Rome, Italy (2)<br />Amsterdam, Netherlands<br />Oslo, Norway<br />Stavanger, Norway<br />Warsaw, Poland<br />Lisbon, Portugal<br />Bucharest, Romania<br />Barcelona, Spain<br />Madrid, Spain<br />Bromma, Sweden (2)<br />Zurich, Switzerland (2)<br />London, United Kingdom (5)<br />Manchester, United Kingdom |
| Africa | Cairo, Egypt (2)<br />Nairobi, Kenya<br />Rabat, Morocco<br />Lagos, Nigeria<br />Cape Town, South Africa<br />Isando, South Africa (3) |
| Middle East | Tel Aviv, Israel<br />Doha, Qatar (2)<br />Istanbul, Türkiye<br />Dubai, United Arab Emirates |
| India | Chennai, India (4)<br />Hyderabad, India<br />Mumbai, India (2)<br />New Delhi, India |
| Asia | Chai Wan, Hong Kong SAR<br />Hong Kong (2)<br />Jakarta, Indonesia<br />Inzai, Japan<br />Osaka, Japan(2)<br />Osaka-shi, Japan (2)<br />Tokyo, Japan (3)<br />Seoul, South Korea<br />Kuala Lumpur, Malaysia<br />Manila, Philippines<br />Singapore (6)<br />Taipei, Taiwan<br />Taipei City, Taiwan<br />Bangkok, Thailand<br />Ho Chi Minh City, Vietnam |
| Australia and New Zealand | Brisbane, Australia<br />Melbourne, Australia (2)<br />Perth, Australia (3)<br />Sydney, Australia (2)<br />Auckland, New Zealand |

## Azure Government edge locations

| Region | Location |
| --- | --- |
| North America (US Gov) | Arizona, AZ, USA<br />Texas, TX, USA<br />Virginia, VA, USA |


## Next steps

- To get the latest IP addresses for allow listing, see the [Azure Content Delivery Network Edge Nodes API](https://learn.microsoft.com/rest/api/cdn/edge-nodes/list).
