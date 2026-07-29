---
title: YouTube Transcript - Obsidian Vault Deep Dive! Custom Plugins + Agentic Loops | My Full System
created: 2026-07-08
updated: 2026-07-08
type: raw_source
tags: [youtube, transcript, cap4]
source_url: https://youtu.be/VaGpWWiHXm8
sha256: af16a3df622fccef62b5bc313fb8dbeb3b37ea9fc6c382e4c94875e4c08ee14f
---

# YouTube Transcript - Obsidian Vault Deep Dive! Custom Plugins + Agentic Loops | My Full System

- Video ID: `VaGpWWiHXm8`
- URL: https://youtu.be/VaGpWWiHXm8
- Channel: Eric Michaud
- Capture: cap4
- Intent: possible improvements for 2nd brain
- sha256: `af16a3df622fccef62b5bc313fb8dbeb3b37ea9fc6c382e4c94875e4c08ee14f`

## Transcript

[00:00] This is my Obsidian Vault, and this is a
[00:03] bunch of you guys asking me to walk
[00:05] through exactly what's going on. So,
[00:06] today we're going to do that. I guess
[00:08] we'll just start from the top because I
[00:09] don't see a lot of people using Obsidian
[00:10] the same sort of way that I am, and I
[00:13] think I need to explain the thought
[00:14] process and like the trail of
[00:15] breadcrumbs that led me to where I am
[00:17] right now, right? I'm also not going to
[00:18] do an end-to-end tutorial on how to
[00:19] build out this plugin. I'll give you the
[00:21] ideas, but if you've used Cloud Code and
[00:23] built out any of your own tools, you
[00:25] should be able to walk through it once
[00:26] you understand exactly what's going on.
[00:28] As far as using Obsidian in the manner
[00:30] that it was, you know, advertised for,
[00:31] it is really, really good as a personal
[00:33] knowledge management system, and I like
[00:35] that it lives wherever you tell it to,
[00:36] and you don't have to access the cloud
[00:38] or API tools or anything like that. Your
[00:40] files are just on your computer or on
[00:42] your VPS or whatever, the way that you
[00:43] want them to be, okay? That is awesome.
[00:45] Where this falls short is the same place
[00:47] that every other note-taking app and PKM
[00:50] falls short in that actually using this
[00:53] thing is sometimes a drag. It's a little
[00:55] bit tough. You actually have to input
[00:56] the information to begin with, and I
[00:58] don't know if you guys are at all like
[00:59] me, but I sometimes don't do that.
[01:01] Sometimes the reflection at the end of
[01:02] the night slips, or I don't want to go
[01:04] back in and like manually type in all
[01:06] these different fields and properties
[01:07] and stuff. It's kind of a drag, which is
[01:09] where plugins come in really, really
[01:11] handy because we can just input the
[01:13] information to an AI agent through a
[01:15] terminal plugin, and it can route it to
[01:18] the proper places, okay? We don't have
[01:19] to go in and manually select all this
[01:21] stuff. We just tell it what we need, and
[01:22] AI goes and does that. And making note
[01:24] capture really, really easy because you
[01:26] can just, like I said, go in and talk to
[01:29] your AI agent and tell it to update the
[01:31] daily note with whatever it is you need
[01:32] to update with. It's like, "Today went
[01:34] great." Obviously a little bit more
[01:36] in-depth than that. It solves the one
[01:37] problem where all these different
[01:38] note-taking and PKM apps like run into
[01:41] where input sometimes has a bit of
[01:42] friction. This gets rid of that. This is
[01:44] where things start to get really
[01:45] interesting because Obsidian helps the
[01:47] agents work as well because agents don't
[01:49] inherently remember anything. You need
[01:52] to prompt in-depth if you want any sort
[01:54] of consistent response. If you're
[01:56] keeping all your notes inside of
[01:57] Obsidian, it actually really helps your
[01:59] agent with context and understanding the
[02:01] way that you like to work or what you're
[02:03] working on. They work really well to
[02:04] complement each other. Like, for
[02:05] example, like your AI agent doesn't
[02:07] remember anything, and so you can have
[02:09] all the memory inside of Obsidian. And
[02:10] Obsidian doesn't have any hands,
[02:12] sometimes it's hard to access stuff. No
[02:14] sweat, Claude or Codex can dig into your
[02:16] folder structure and take actions for
[02:18] you. Perfect, right? And that's where a
[02:20] lot of people leave it. They have their
[02:21] folder structure, they use Obsidian as a
[02:23] memory layer, they make sure that Claude
[02:25] is updating their Obsidian memory, and
[02:26] that's okay. That's pretty good. Except
[02:28] it's not good enough. While I'm pretty
[02:30] good at doing my reflection and planning
[02:32] at the beginning and the end of the day,
[02:34] I didn't really want to like have to go
[02:35] back and reflect on everything and rely
[02:37] on my own like willpower or whatever. I
[02:39] was like, wouldn't it be great if we
[02:41] could keep track of things as we're
[02:43] working? So, that's exactly what I
[02:44] started to do. And I made sure to
[02:46] include that in my daily log template. I
[02:49] started by telling my agents to log
[02:50] activities as I was going on through the
[02:52] day. I used Claude hooks and everything
[02:54] with a timestamp, so I could get a
[02:56] really good feeling as to how long
[02:58] things were taking me, where I was
[03:00] spending my time, if there was a block
[03:02] without me doing stuff, I knew I got
[03:03] like, you know, off track a little bit.
[03:05] Just to keep me accountable, and I could
[03:08] really understand where my time was
[03:09] going. It just gives me a really honest
[03:11] overview of what actually happened over
[03:13] the course of that day instead of me
[03:14] looking back after the fact thinking
[03:16] that, you know, everything went great
[03:17] when in reality I spent like an hour
[03:19] trying to hit a baseball with my hair
[03:21] elastic or something like that.
[03:22] >> [laughter]
[03:22] >> So, I mean, that was like step two, I
[03:24] would say, of many, but it was a huge
[03:26] mover because I really, really got to
[03:27] see where my time was going, and it got
[03:29] me infinitely more productive. And I
[03:31] could really zoom in and start to
[03:32] organize my day a lot better. So, at
[03:34] that point we're already working in
[03:35] Obsidian with the terminal plugins. I'm
[03:36] like, all right, what else do you got?
[03:38] I'm just like looking through to see how
[03:39] I can consolidate my tools into the one
[03:42] spot, okay? And then I noticed it comes
[03:45] with a web viewer out of the box. When
[03:47] you download Obsidian, this comes
[03:48] disabled, which I I is a mistake. So, I
[03:50] enable this, all of a sudden I'm able to
[03:52] work in Obsidian with a web browser.
[03:54] This is really great to keep me from
[03:55] wandering, but it's also excellent for
[03:57] development in particular because I'll
[03:58] have Codex on the bottom or Pi agent or
[04:01] whatever, and then I've got my local
[04:02] development server on the top, right?
[04:04] Like so I can have my localhost 3000,
[04:07] for example, and then I can make the
[04:08] edits here, and I've I've got real-time
[04:10] feedback on what's actually happening
[04:12] just like you would if you run it in
[04:14] your browser otherwise, right? So, I
[04:15] mean, this is really starting to come
[04:16] together for me as like not just a
[04:18] memory solution or a note taking app,
[04:20] but like a comprehensive workspace. Now,
[04:23] of course, I'm hooked, and I really,
[04:24] really want to see what else we can do
[04:26] with it. So, then I get to thinking,
[04:27] like what does my browser have that I
[04:28] would miss if I just started using
[04:30] Obsidian all the time like this, right?
[04:32] And I'm looking at it. I was using Opera
[04:34] at the time, and one of the things I
[04:35] really liked about it, like Opera and
[04:37] Vivaldi in particular, was this sidebar
[04:39] with all the nested apps, right? Like I
[04:42] really liked being able to go to
[04:44] Telegram and like talk to my agent
[04:46] there, and like still be able to be in
[04:47] the same window, or Slack and like not
[04:50] miss notifications because if you use
[04:52] Slack, you know. So, for me, that was
[04:54] the next step. How do I bring that
[04:56] experience inside of Obsidian? And it
[04:58] was actually a lot easier than I'd
[05:00] thought, right? I first played around
[05:02] with how do I build this app inside of
[05:05] Obsidian? And it's way simpler than you
[05:07] think. You click your web viewer, and
[05:09] then you just log in on the web app.
[05:12] Check it out. And then you can just pin
[05:13] that to the side. Boom.
[05:15] Slack there or Slack over here. And you
[05:18] can do the exact same thing for whatever
[05:20] other apps you want, right? So, like
[05:22] Telegram, WhatsApp, Spotify. I could go
[05:24] down the list of my Opera browser apps
[05:26] and just put them on the sidebar of my
[05:28] Obsidian as well. So, again, another one
[05:31] off the list. It's about this point that
[05:33] I start posting on YouTube about all of
[05:36] my Obsidian fun time adventures, right?
[05:38] Except we still haven't solved a major
[05:40] problem with every PKM in that like what
[05:42] do you do next? Sure, you've got great
[05:44] note taking and input's easy, and you're
[05:46] taking notes throughout the day and
[05:48] keeping track of your activity, but like
[05:49] then what? You're just collecting a
[05:51] bunch of information. What does this
[05:53] actually get you? And that's kind of the
[05:54] point of the last video I put out on
[05:56] Obsidian right here is that, you know,
[05:58] don't build a second brain to just
[05:59] collect a bunch of notes. You need to
[06:00] start working towards systems. Like
[06:03] we've got all these cool workflows that
[06:04] capture notes and make sure we're taking
[06:06] account of our different metrics and
[06:07] stuff, but like then what? We need to
[06:09] work all this together. V1 of my Optics
[06:11] layer was actually an Obsidian canvas
[06:13] because I came over from Notion, so this
[06:15] is how we used to do dashboards there as
[06:17] well, right? Just bring in your
[06:18] different charts, have a roll up or
[06:19] whatever. So, if I could figure out a
[06:21] way to do that, then we're laughing,
[06:23] right? And turns out you absolutely can.
[06:24] Because in canvas, you can go and bring
[06:26] in pictures, you can write in text
[06:29] blocks, right? You can bring in
[06:30] different notes. So, if I want to do
[06:32] just drop this here, you've got your
[06:34] notes like that. You can also bring in
[06:35] web pages. So, I really wanted to make
[06:38] sure that I could see my YouTube
[06:41] comments first thing in the day. And we
[06:43] can just like arrange this however we
[06:45] want. Let's say I've got this note here,
[06:47] right? All sorts of cool stuff like
[06:49] that. For charts, there's actually a
[06:50] really cool solution. There's a
[06:51] community plugin called DataView, and it
[06:53] does pretty much exactly what it says.
[06:55] It helps you visualize data. And I'm
[06:56] like, that is exactly what I want.
[06:58] However you've been tracking things,
[06:59] whether it's in a property in your daily
[07:01] notes, which is what I do. I make sure
[07:03] that I update YouTube subscribers every
[07:05] day in the property, for example, okay?
[07:07] You can take that, and since canvas
[07:08] accepts code blocks, you can take
[07:10] DataView notation and
[07:12] punch this in here, and it comes up with
[07:15] charts. So, you can see how this is like
[07:16] starting to come together, right? You
[07:17] can take your properties, use DataView,
[07:20] and then just punch out the code inside
[07:22] here. You can also do line graphs and
[07:23] bar graphs and pie charts and all sorts
[07:25] of stuff like that. What I would
[07:25] recommend is use code X or whatever to
[07:29] go and just like explain exactly what it
[07:30] is you want to do, what you want to
[07:32] track, and then have it punch out the
[07:34] DataView notation. And I mean, that's
[07:36] pretty straightforward. You can do it
[07:37] with natural language. Just explain what
[07:39] it is you want to do, and then iterate
[07:42] until it gets it right. And then you've
[07:43] got your optics layer on the other side
[07:46] that you can go to every morning or
[07:47] whatever, right? Like if you want to
[07:49] check out your YouTube comments and see
[07:50] what people are talking about. You
[07:52] know what I mean? So, this is like the
[07:52] first iteration, and I'll I'll give you
[07:54] guys a cheat sheet as to how this works
[07:56] exactly. I've got a data view cheat
[07:58] sheet that I can leave as a GitHub gist
[08:00] or something like that in the
[08:00] description. What you do from here, so
[08:02] you don't have to like scroll around all
[08:03] the time, is you make sure that
[08:05] workspace, the core plugin, is enabled.
[08:08] And this will save a layer for you,
[08:10] okay? Whatever it is that's open at that
[08:12] time, it'll save it, and you can just
[08:14] like toggle that on and off. So, check
[08:16] it out. You can go like this, and then
[08:17] just save this as YT.
[08:20] Boop.
[08:21] So, now YT's active, and if you want,
[08:24] you can go back to this layer and just
[08:25] like load it up.
[08:27] Now it's gone to this page, refreshed
[08:29] all my terminal stuff, and here we are.
[08:32] That's honestly the easiest way to get
[08:33] there. Just making sure that we capture
[08:35] our notes in the morning and evening.
[08:36] So, I've got these different workflows
[08:38] to start my day that capture the metrics
[08:41] that I want, and at the end of the day
[08:42] to capture like the reflection sort of
[08:44] metrics. I guess that's where I took
[08:46] this, though. And the only real
[08:47] difference, like the the stuff that
[08:49] feeds this dashboard is exactly the
[08:51] same. All it is is the properties from
[08:53] the daily notes that are triaged by my
[08:55] AI agent, and it's kept in a database.
[08:58] As I'm filming this video, it's kind of
[08:59] funny because it looks like I'm
[09:00] following the Obsidian home page as like
[09:02] my story arc as to how I built out my
[09:05] vault, right? Cuz it first started out
[09:07] with like the linking and capture, then
[09:08] it was like, "Okay, Canvas is pretty
[09:10] cool for like visualization." I'm like,
[09:12] "And then the next thing I did was build
[09:13] out my own plugin." Which, if you're not
[09:16] aware, it's basically just a an app.
[09:18] It's its own mini app. So, it's a
[09:20] dashboard that I built out with Codex,
[09:22] and I have a plugin view that we're
[09:24] using with Obsidian now, right? So, if I
[09:26] go and click this little house, boop, it
[09:28] goes over to my dashboard.
[09:30] And I built this out just like you would
[09:31] any other project with your agentic
[09:34] coding assistant, right? Like I it's the
[09:35] same process as I would use if I was
[09:37] building out like a landing page or
[09:39] whatever. Just a little bit more
[09:41] iterative in terms of like getting to
[09:44] this result. But as far as things that
[09:45] are, you know, making this tick and what
[09:47] is fueling this dashboard, it's the
[09:49] daily notes. I'm using Obsidian as a
[09:51] back end for a plugin inside Obsidian.
[09:54] If we see what's fueling the schedule,
[09:55] it's a note, right? And then that's like
[09:57] populating my calendar. If we want to
[09:59] see what's going on here and how we're
[10:01] populating these metrics, it's the same
[10:02] thing. It's a note just with a database
[10:04] and some tables, right? We want to
[10:06] shuffle around like what shits are in
[10:08] the actual snapshot. I've got a note for
[10:09] that, too. It's the config. We've got
[10:11] our
[10:12] properties all here, all the available
[10:14] properties. And then we've got the
[10:16] different views, right? So, let's move
[10:18] this over here. Let's say I want threads
[10:20] on the inside, right? If I go over here,
[10:23] there go threads.
[10:24] And then I want it right next to
[10:26] YouTube. Okay?
[10:28] Boop. There it goes. You know what?
[10:30] Let's say I want that at the end.
[10:32] You get where I'm going with this.
[10:36] But let's put that here.
[10:37] Now it's down at the end. Same thing
[10:38] with any of these, right? Say I don't
[10:40] want to actually track my sleep score.
[10:42] If I get rid of that, it won't track it
[10:43] anymore. We just have all our available
[10:45] properties right here. And I can tell it
[10:47] exactly what I want to see by moving
[10:49] those properties in and out of these
[10:51] different headers. And while it was
[10:53] honestly a ton of work for me to get to
[10:54] this point because I'd never built out
[10:56] an Obsidian plugin before and it was
[10:58] like a lot of trial and error. I think
[10:59] now that you see the finished product
[11:00] and how it's being driven, you're a lot
[11:03] better equipped to build out your own
[11:05] custom sort of integrations like this
[11:06] than than I was at the time. All right,
[11:07] so that's the the story arc, I guess, is
[11:09] to like how I got here. But also, I'm
[11:11] not done. I want to see what else I can
[11:12] do with Obsidian and how much more I can
[11:14] get out of this one platform because now
[11:16] I am obsessed. If you want any of the
[11:18] asset resources that I was using in this
[11:19] plugin, you can let me know and I'll
[11:21] I'll point you in the right direction.
[11:22] This full plugin and my exact setup is
[11:24] part of the paid membership on my school
[11:26] community. If you go to Tools and
[11:27] Agents, I got the whole thing here and a
[11:29] video walk-through of how to use it and
[11:30] configure it for yourself. But if you
[11:32] just want to get started, I won't leave
[11:33] you hanging. I've got free resources you
[11:35] can check out in the description there
[11:36] for free starter vaults, some skills,
[11:38] and a setup for the Pi Harness that I'm
[11:39] currently using in Obsidian to get all
[11:41] this stuff done. Anyway, thanks for
[11:42] hanging out with me. Make sure to like
[11:43] and subscribe for more content just like
[11:45] this cuz this is what I do now, and
[11:47] we'll see you in the next one.
