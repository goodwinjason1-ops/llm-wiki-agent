---
source_url: https://youtu.be/I9W6NhFkGAI?si=sclehQPjJvYnXrBF
ingested: 2026-07-02
sha256: 888eb3a6de724994a392ef97748a66af51f64a2b50e554016e17ce4b8f4c81b0
type: raw_transcript
video_id: I9W6NhFkGAI
duration: "13:24"
---

# Transcript — Scalable Obsidian brain for an AI agent

0:00 Hey guys, what's up? It's Mason and in
0:01 this video, I'm going to break down
0:03 exactly how you can set up a scalable
0:05 brain for your AI agent. Now, if you've
0:08 used Hermes or Open Claw, you've
0:10 probably noticed they could be kind of
0:11 stupid sometimes. They forget little
0:14 things that you just talked with it
0:15 about and there is really no rhyme or
0:17 reason for why it does that. But, this
0:19 solution fixes that. What you're seeing
0:21 right here on the screen, this is an AI
0:23 brain that I use to operate my
0:25 advertising agency, Dancing Chicken
0:26 Media, and it has context about all the
0:29 clients, all my emails, a ton of YouTube
0:32 videos I plugged into it with a bunch of
0:33 great information about business, you
0:35 know, so it has a ton of information
0:37 that it's indexed over time. And right
0:39 now you're watching a time lapse of it
0:41 being built inside of Obsidian. So, over
0:43 the past couple months it has stored all
0:45 this context, built up all this data,
0:47 and you can see how it is all connecting
0:49 over time and it is just going and
0:51 making these giant webs, almost like a
0:53 neural network of data, right? Where say
0:56 you think about chicken nuggets, for
0:58 example. You probably have a bunch of
1:00 thoughts that come up around that topic
1:02 of chicken nuggets. That is the exact
1:04 same thing that happens here. If we
1:05 hover over this dot right here, this is
1:07 the Alex Becker brain index. So, I've
1:09 downloaded all of Alex Becker's content.
1:11 I love his stuff when it comes to
1:12 marketing, advertising, even though some
1:14 of it is a little bit older, I think it
1:15 is relevant. So, I want my AI agent to
1:18 be trained on that. So, I gave it all of
1:19 his videos and you can see a ton of
1:21 different videos inside of here, a bunch
1:23 of information that it's indexed and it
1:25 has all that context. So, that is what
1:27 we want to build here. I want to show
1:29 you how you can build a scalable brain
1:31 for your agent that will just allow you
1:33 to keep growing it over time. So, let's
1:35 break it down what you actually need and
1:37 I'm going to set everything up from zero
1:39 to hero with this AI agent and the brain
1:42 in this video. So, first things first,
1:44 software stack. So, you need to have an
1:47 AI agent set up. If you don't have an AI
1:48 agent set up, go watch my YouTube video.
1:50 It's going to be the top link in the
1:52 description. It's going to be the Hermes
1:54 AI agent set up video for a virtual
1:56 private server. Really short video,
1:58 breaks it down, very straightforward if
2:00 you don't have an agent set up. If you
2:02 do have an agent set up, awesome, you're
2:04 in the right place. Let's get Obsidian
2:06 rolling. So, Obsidian is going to be
2:07 that memory layer we're using. That is
2:09 what is essentially the note-taking app
2:11 that allows us to index all this
2:13 information in such a nice and pretty
2:14 way and just visually see it, and it
2:16 allows us to just go go through
2:18 everything as well.
2:19 So, obsidian.md is the website. You
2:22 could download it for Mac or for
2:23 Windows. Just go ahead download it for
2:25 your um for your device. In order to
2:27 store everything, we're going to use
2:29 Google Drive as that layer to store
2:32 everything and just keep a really solid
2:34 backup of all the information, all the
2:36 data on the Google Drive folder. That is
2:39 what I like to do. Yes, it's going to be
2:40 stored on the server locally, but I want
2:43 to have some other place for it to be
2:45 stored, and that's where Obsidian's
2:46 going to connect to as well, and that's
2:48 where we're going to have everything
2:49 indexed. So, Google Drive, I recommend
2:53 setting it up on your personal drive or
2:55 your personal Google account. Make sure
2:56 it's a secure account nobody else is
2:58 going to touch. Set up a folder called
3:00 do not delete inside of your main drive,
3:03 and then here, you're going to want to
3:04 just name a folder, right? You can see I
3:07 have the DCM company vault right here.
3:09 So, this is everything that you saw
3:11 inside of that agent inside of Obsidian.
3:14 It is all stored inside that folder
3:17 somewhere in it, right? So, there's a
3:18 bunch of different subfolders, and that
3:20 is where everything is stored. That is
3:21 where it is housed. So, I made an Hermes
3:24 YouTube test folder. We're going to
3:26 actually delete that right now. I'm
3:27 going to show you a better way to set
3:28 all this stuff up.
3:30 Next thing is we need to get Drive for
3:32 desktop. So, if you just Google Google
3:34 Drive desktop, there you go. It's the
3:36 top link. Click on that. Download it for
3:39 Windows. Download it for Mac. Get that
3:40 installed, and then you're obviously
3:42 going to have Obsidian installed at this
3:44 point. So, let's go ahead and open
3:45 Obsidian. We're going to go to file,
3:48 open vault, and then you're not going to
3:51 have any vaults right here, but we're
3:52 going to want to create a new vault.
3:54 We're going to create a new vault, we're
3:55 going to call it Hermes YouTube test.
3:59 And then for the location, we're going
4:01 to click browse, and we're going to want
4:03 to make sure it is inside that Google
4:05 Drive folder. So, I have the do not
4:06 delete one right here. We're going to
4:08 make a new folder in here, and we're
4:10 going to call it Hermes YouTube test.
4:14 Same thing. Create, and then all we're
4:16 going to do is hit open, and that's
4:18 going to be the location for us. So,
4:20 this is the vault name.
4:21 Um I'm just going to change it to vault,
4:23 honestly, just to keep it easy, so we
4:24 don't have two names of the same thing.
4:26 We're going to do vault. We're going to
4:27 add the Hermes YouTube test folder, then
4:29 we're going to do create. And then this
4:31 is it. This is the brand new vault right
4:32 here. We can see the welcome. We can see
4:34 the create a link. Just two little two
4:35 little dots right here in the graph
4:37 view, you know? Then you can manually
4:38 add notes and stuff if you want to.
4:40 Don't know why you do that with your
4:41 agent, but could. Um next thing though
4:44 is let's go start chatting with our
4:46 agent. Let's get all this stuff set up
4:47 because there is a bunch of stuff we got
4:49 to do. So, this is my agent right here.
4:52 It's the YouTube vids one. Um it is an
4:54 Hermes agent, and this is the prompt
4:56 we're going to use. I'm going to post
4:57 this in the description if you want it.
4:58 It'll be underneath prompt one or setup
5:01 prompt or something. You'll see it down
5:02 there, but go ahead and just enter this
5:05 prompt, and we're going to roll. We're
5:07 going to ride.
5:09 So, basically it's just helping us set
5:11 up Obsidian, and we're just trying to
5:13 let it know and give it context as to
5:15 what we're doing here. So, it's going to
5:17 view all this stuff. Um looks like I
5:20 might have already had some skills on
5:21 here from something I possibly did
5:23 earlier, but I don't think it'll affect
5:25 you. I would just go and run this
5:26 prompt, and I'm going to walk you
5:28 through it anyway. Be pretty
5:29 straightforward. Um great. We're doing
5:31 this from scratch. I checked Google
5:33 Drive access first. We don't have any
5:34 access, so we need to go ahead and set
5:37 up OAuth. So, I don't know if I
5:39 mentioned this or not, but
5:41 I didn't, but we need to set up a
5:43 separate Google Drive folder. So, we
5:44 have this main Google Drive where we
5:46 have our our folder in it, but we don't
5:48 want to connect our agent to our main
5:50 Google. Like that's stupid. Why would we
5:52 do that? We want to set up a separate
5:54 Google account. So, I have one set up
5:56 underneath my business account. I am
5:58 running everything for my agency
5:59 obviously, so I have a different email.
6:01 I have hello@dancingchicken.com
6:04 set up. Um, but you don't need to do
6:06 that. You could set up a brand new
6:08 regular Gmail account. You could set up
6:10 another personal account. Literally just
6:12 Google, right? Very, very simple. Go
6:14 create a brand new Gmail. Name it
6:16 Hermes, like whatever you need to name
6:18 it, right? So, go ahead and set that up.
6:19 And then what we need to do is go ahead
6:22 and OAuth that account to your Hermes
6:25 agent so as it has access to the Google
6:27 Drive, it has access to everything.
6:29 We're going to go ahead and set that up
6:30 now. Let's go ahead and do that.
6:32 All right. So, here's the link we need
6:33 to go to. So, we need to go to Google
6:35 Cloud. We need to go to the console in
6:36 there. So, we're going to hit this right
6:38 here. It'll take us to a login. Login
6:41 with your Google account.
6:43 I'm logging in right here with my
6:44 personal Gmail, and this is going to
6:46 take us to the project page. You may or
6:48 may not have some projects. If you do,
6:50 ignore them. If you don't, we're going
6:51 to create a new project anyway. So,
6:53 we're going to create a new project. I
6:55 think I already have the name here.
6:56 We're also going to drag this over here
6:58 so it's a bit easier. I'm going to call
7:00 mine Hermes YouTube test in the project
7:02 name. We're going to hit create, and
7:04 it's going to make the project. We're
7:05 going to see it load up right here on
7:07 the screen.
7:09 Next thing we're going to do is we're
7:10 going to type in API.
7:13 It's going to take us to the APIs and
7:14 services. Go right here. Select that
7:16 one, APIs and services, and then enable
7:19 APIs and services right up here at the
7:21 top.
7:22 And then we're going to type in Google
7:24 Drive. We're going to hit enter, and
7:26 we're going to see Google Drive API.
7:28 We're going to click on that.
7:30 We're going to hit enable.
7:32 And it's going to do its thing.
7:34 Just waiting for it to enable.
7:38 Awesome. We got it enabled. We are good
7:40 to go. Now we need to create a consent
7:42 screen, so you're going to see an OAuth
7:44 consent screen button right here. Click
7:46 that.
7:48 We're going to get started.
7:49 We're going to name it Hermes YouTube
7:51 test.
7:53 We're going to use our main email. Just
7:56 literally do the drop down, put the
7:57 email you have right there. This should
7:59 be the brand new email that you created.
8:01 If you're at this step and you're using
8:02 your personal email, go back, do it with
8:04 the email that you just created, the
8:06 brand new Gmail account, um or the
8:08 business account, whatever it is. Hit
8:09 next. We're going to do external. We're
8:12 going to do next. We're going to type in
8:14 the same email address we have.
8:17 That's not my email.
8:21 Right there.
8:23 We're going to hit next. We're going to
8:25 do finish. We're going to hit continue.
8:27 We're going to hit create.
8:29 And it's going to process everything.
8:31 And then we have this set up. Now, we
8:33 need to add a client, I believe.
8:36 Let me see.
8:38 Uh we need to go to
8:41 audience.
8:43 And then we need to add a test user. We
8:45 need to add ourselves as a test user.
8:47 So, just type in the Gmail that you're
8:49 on right now. It should be that
8:50 secondary Gmail you just created. You're
8:52 going to hit save. Now, you're added as
8:54 a test user. Then the next thing we have
8:57 to do is we need to create some
8:58 credentials. So, we need to go back up
9:00 here and credentials, just type in
9:02 credentials. You should see it.
9:04 Hit that. We're going to do create
9:05 credentials and then OAuth client ID.
9:10 And then application type, desktop app.
9:13 And then we're just going to name it
9:16 Hermes Drive access.
9:19 Create.
9:21 And then this is going to be our stuff
9:22 that we need to give to the AI. So,
9:24 you're just going to hit download JSON
9:25 right here. Hit that. We're going to
9:27 drag this over here and we're going to
9:29 say, "Here is the JSON."
9:33 And then it's going to have access. Now,
9:34 the next thing we need to do is we need
9:35 to go back over here. We need to share
9:37 this folder with our new email that we
9:40 just made. So, we're going to go and
9:41 share
9:45 this email right here.
9:46 And we're going to do editor, just leave
9:48 it as editor, and then we're going to
9:50 send.
9:53 Yes, share anyway.
9:56 And while that's happening, we also need
9:57 to click this authorize Google Drive
9:59 access. So, you're going to see this
10:00 link. You're going to have to click
10:02 this. You're going to open it. You're
10:04 going to sign in with the email account
10:05 you have right here, the main email, the
10:07 brand new one that you just created.
10:11 And then, Google hasn't verified this
10:13 app.
10:15 We're going to hit continue.
10:17 We're going to hit continue. And then,
10:19 you're going to get this URL right here.
10:21 It's going to say localhost. Copy this
10:23 entire URL,
10:25 and then paste it here just like that.
10:28 Literally just paste the URL, and this
10:30 will allow it to get authenticated and
10:32 be able to access the drive and
10:33 everything.
10:34 So, this agent is still working in the
10:36 background right here, but we could see
10:37 that it's already populating this new
10:40 um new new graph, right? We could see
10:41 that it's bringing memory rules. It's
10:43 adding a folder map. So, it's doing
10:44 stuff by itself. It initially it already
10:46 has access. And I didn't even tell it
10:48 the drive folder, it just found it by
10:50 itself, right? It's very intelligent at
10:52 the end of the day. I mean, it just
10:54 probably typed Hermes, and it knew from
10:55 the plan that it created up here with
10:57 all the names what to look for, right?
11:00 So, again, the agent, it's very smart,
11:02 but you really just got to guide it in
11:03 the right direction. I find half of
11:05 these agents, it just comes out of
11:07 troubleshooting and really understanding
11:09 how to talk to it. A lot of people, they
11:11 get frustrated and they're like, "Ah,
11:12 you can't do this." And they just give
11:14 up, you know? It could really do
11:15 anything. You just got to give it the
11:16 right tools to. And the memory really
11:18 helps when it comes to compounding all
11:20 this information and all these skills
11:22 over a long period of time. So, it's
11:25 still working. It's still doing its
11:26 thing. Um but we could obviously see
11:29 that it's building out the graph, right?
11:31 Like security rules, capture rules,
11:33 agent instructions, Google Drive index,
11:36 and you could customize this to whatever
11:37 you want to do. At the end of the day,
11:38 it is just basing it off of all these
11:41 basic things that probably we did
11:43 previously cuz I used this agent for a
11:45 website design agency. So, it's just
11:47 building out different things, but
11:49 again, customize it to whatever you
11:51 want. If you already If you already have
11:52 an AI agent that has been
11:54 building and like growing and you're not
11:57 starting from scratch, it should be able
11:58 to populate a good amount of things
12:00 inside of here and just make it a lot
12:01 more efficient, which is really cool as
12:03 well. So, it'll just increase your
12:04 agent's efficiency very quickly.
12:08 Let's see.
12:09 Cool, it's done right now.
12:12 It I It authenticated everything. It
12:14 created the basic folder structure and
12:15 everything. Everything looks good.
12:18 That's your Obsidian vault.
12:20 Let's see.
12:23 Yeah, so it looks like everything's set
12:24 up. I'm not even going to send this
12:25 message anymore. I'm going to say,
12:27 "Okay, so everything is set up and good
12:30 to go."
12:33 And we'll see what it says.
12:36 Yeah, at this point everything's good to
12:37 go and really you could just keep
12:39 building out your agent the way you want
12:40 it to work. Um, and really just keep
12:42 building out the memory. I would
12:43 recommend messaging your agent and
12:45 talking to it being like, "Hey, how can
12:46 we improve this memory even more?" Just
12:48 chat with it, right? Every agent might
12:50 be set up differently just based on how
12:52 you do this and what you've currently
12:53 used it for. So, I would go through and
12:55 be like, "Hey, we want to set up our
12:56 memory to be really scalable over the
12:58 next couple years and not break when we
13:01 get a ton of information, right? We want
13:02 to make sure it works well with the
13:03 agent." Tell it things like this and
13:05 just chat with it, right? Literally ask
13:07 it questions, tell it to improve itself.
13:09 You know, these agents can improve
13:11 themselves if you set it up correctly
13:13 and you just talk to it the right way,
13:14 but that's pretty much it for this
13:15 video, guys. If you have any questions,
13:17 let me know. Hopefully you learned
13:19 something and I will see you in the next
13:20 video. Thanks for your time.
