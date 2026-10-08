---
title: Enable password protection for Azure Static Web Apps
description: Prevent unauthorized access to your static web app with a password.
services: static-web-apps
author: cjk7989
ms.service: azure-static-web-apps
ms.topic: how-to
ms.date: 03/13/2022
ms.author: jikunchen
ms.custom: sfi-image-nochange
---

# Configure password protection (preview)

You can use a password to protect your app's pre-production environments or all environments. Scenarios when password protection is useful include:

- Limiting access to your static web app to people who have the password
- Protecting your static web app's staging environments

Password protection is a lightweight feature that offers a limited level of security. To secure your app using an identity provider, use the integrated [Static Web Apps authentication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/authentication-authorization.yml). You can also restrict access to your app using [IP restrictions](configuration.md#networking) or a [private endpoint](private-endpoint.md).

## Prerequisites

An existing static web app in the Standard plan.

## Enable password protection

1. Open your static web app in the Azure portal.

1. Under *Settings* menu, select **Configuration**.

1. Select the **General settings** tab.

1. In the *Password protection* section, select **Protect staging environments only** to protect only your app's pre-production environments or select **Protect both production and staging environments** to protect all environments.

    Screenshot of enabling password protection

1. Enter a password in **Visitor password**. Passwords must be at least eight characters long and contain a capital letter, a lowercase letter, a number, and a symbol.

1. Enter the same password in **Confirm visitor password**.

2. Select **Save**.

When visitors first go to a protected environment, they're prompted to enter the password before they can view the site.

Password prompt

## Next steps

> 
> [Authentication and authorization](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/authentication-authorization.yml)
