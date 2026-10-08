---
description: "Learn more about: About the System.Net.PeerToPeer.Collaboration Namespace"
title: "About the System.Net.PeerToPeer.Collaboration Namespace"
ms.date: "03/30/2017"
ms.assetid: b5d8c1c1-6844-4947-9759-c7f1b564bded
---
# About the System.Net.PeerToPeer.Collaboration Namespace

The [System.Net.PeerToPeer.Collaboration](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration) namespace provides classes and APIs that are used to implement peer collaboration activities using the Peer-to-Peer Collaboration Infrastructure.

## Classes

 The main classes used in the implementation of a Peer-to-Peer Collaboration activity are:

- The [System.Net.PeerToPeer.Collaboration.ContactManager](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.ContactManager), which can be used to store peer contacts.

- The [System.Net.PeerToPeer.Collaboration.PeerApplication](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerApplication) in which to collaborate, such as a game, chat client, or conferencing solution.

- The peers that will be collaborating in an activity.  These peers can be represented as [System.Net.PeerToPeer.Collaboration.PeerContact](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerContact), [System.Net.PeerToPeer.Collaboration.PeerNearMe](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerNearMe), or [System.Net.PeerToPeer.Collaboration.PeerEndPoint](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerEndPoint) objects.

- The static [System.Net.PeerToPeer.Collaboration.PeerCollaboration](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerCollaboration) class itself, which specifies which applications are available and which peers are participating in them.

 The [System.Net.PeerToPeer.Collaboration.PeerContact.Invite*](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerContact.Invite*) methods are used to invite peers to a collaboration session.  A calling peer can subscribe to another peer for events that signal updates to application, object, or presence information affiliated with the collaboration session. Presence classes specify whether a [System.Net.PeerToPeer.Collaboration.Peer](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.Peer) is available for collaboration, and the [System.Net.PeerToPeer.Collaboration.PeerScope](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerScope) class is used to specify how much participation is allowed for a peer:  [System.Net.PeerToPeer.Collaboration.PeerScope.Internet](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerScope.Internet) (global), [System.Net.PeerToPeer.Collaboration.PeerScope.NearMe](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerScope.NearMe), (subnet) or [System.Net.PeerToPeer.Collaboration.PeerScope.None](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerScope.None).

 A collaboration session is comprised of four steps:

- Discovery. Discover or publish applications, peers, and presence information.  For instance, find other people on the local subnet that have the same games installed.

- Invitation. Send and accept secure invitations for remote peer(s) to start or join [System.Net.PeerToPeer.Collaboration.PeerCollaboration](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.PeerCollaboration) sessions.

- Contact Management. Add discovered peers as a contact to a [System.Net.PeerToPeer.Collaboration.ContactManager](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.ContactManager).

- Communication. When communication is established, use the [System.Net](https://learn.microsoft.com/search/?terms=System.Net) APIs, the [System.Net.PeerToPeer](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer) API, or the Windows Communication Foundation Peer Channel classes for multiparty communications.

 For example, the host peer starts a collaboration session, and utilizes the [System.Net.PeerToPeer.Collaboration.ContactManager.CreateContact*](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration.ContactManager.CreateContact*) method to add a remote peer and one of its local peers to the Contact Manager of the host peer.  The three users will then participate in their own private collaboration session.

 Typical P2P applications are: conference calls for collaborative note-taking or whiteboarding, serverless chat applications, interactive advertisements, and online gaming sessions.

## See also

- [System.Net.PeerToPeer.Collaboration](https://learn.microsoft.com/search/?terms=System.Net.PeerToPeer.Collaboration)
