---
source_url: https://youtu.be/yOZVYw9FIWc?si=husKqye9l7qSAtXI
ingested: 2026-07-02
sha256: 18c6458965a780753e64ef3b5db565afd7f58b494c59e4768e5220bb65db29b2
type: raw_transcript
video_id: yOZVYw9FIWc
duration: "15:08"
---

# Transcript — Agent Reach: giving Hermes/Codex broader internet research access

0:00 This new open-source AI will 10x your
0:03 Hermes agent. Now, most people use
0:04 Hermes agent like a chatbot. They just
0:07 ask it questions. But research operating
0:10 systems are used by companies like
0:11 OpenAI and Anthropic. And if you apply
0:14 them correctly, you can unlock
0:16 capabilities that 99% of users don't
0:18 even know exist. And so in this video,
0:20 I'll show you exactly how to get it set
0:22 up easily, giving your Hermes agent
0:24 unlimited knowledge and making it way
0:26 more powerful so you can stop wasting
0:28 time, make more money, and get light
0:30 years ahead of everybody else. And if
0:32 you're new, I'm Jack. I built some
0:34 molastic startup with a gazillion
0:35 customers. Now I'm building my own AI
0:37 startups and I just share here the stuff
0:40 that actually works. So if you haven't
0:42 already, grab that beautiful coffee and
0:44 let's dive straight in. Now, when we're
0:45 thinking about our beautiful Hermes
0:47 agent, the best way to think about the
0:48 way that most people use Hermes agent is
0:51 a genius locked out of a library. When
0:53 you ask Hermes agent to do something, it
0:55 can do a very basic internet search. But
0:57 effectively, there's some stuff it just
0:59 can't grab, right? It can't grab
1:00 transcripts from YouTube. It doesn't
1:02 have access to every page on LinkedIn or
1:05 Reddit or X. Therefore, it's not getting
1:07 the very best knowledge available on the
1:10 internet. But if we could in theory
1:12 connect it, I think you could have
1:13 access to essentially everything that's
1:15 happening right now in the world. Now,
1:17 in this video, I'm going to show you two
1:19 level upgrades, okay? One in connections
1:21 and one as a specialist that's going to
1:23 drastically increase the performance and
1:26 the knowledge and the research
1:27 capabilities of your Hermes agent for
1:29 anything that you want to go ahead and
1:31 do. So, the idea here with this new
1:33 brand new GitHub repo actually is that
1:35 we can give our Hermes agent eyes.
1:38 That's the whole idea. And the repo is
1:39 something called Agent Reach. It's got
1:41 over 32,000 stars. It's number one
1:43 trending right now. It is blowing up.
1:45 And the whole idea of this GitHub repo,
1:47 and I'll show you right here, so you can
1:48 have a look. It's this one right here
1:49 that we're hanging out with. I'm going
1:50 to dive into that with you in a second.
1:52 If you do make it to the end of the
1:53 video, which I highly recommend, you are
1:55 going to have superpowers in your Hermes
1:57 agent. People will be saying, "This
1:59 isn't fair. How the hell is your Hermes
2:00 agent so powerful?" So, what can we do
2:02 with this repo? Well, we can give access
2:04 to X LinkedIn. Um, we can basically get
2:07 RSS feeds, GitHub, anything that you
2:09 possibly want to. This OS is even
2:11 updating itself in the background.
2:13 That's how much cool stuff's going on
2:14 with it. And it basically the idea is
2:16 that you get access to lots of different
2:17 softwares. And it has different
2:19 fallbacks to make the search more robust
2:21 just so it works way better. And not
2:23 only that, it's going to give us clean
2:25 data and better answers. So it returns
2:28 structured text, not raw HTML. So the
2:31 same research costs a fraction of
2:32 tokens. So it's literally going to save
2:34 you money the more they're actually
2:35 using it. This is an example. You could
2:36 have like 86,000 tokens for the HTML. In
2:39 other words, it's a website speak. But
2:41 with the clean structured extraction,
2:43 you know, you can get 30 40% saving you
2:45 loads more time. Again, 2.5x saving on
2:48 the tokens. And that's really important
2:50 to understand, guys, because the Hermes
2:51 agent itself has a specific context
2:54 window. And it's one of the biggest
2:55 complaints. This actually solves that.
2:57 It's why it's so so important. And the
2:59 good news is it's super duper easy to
3:00 install. So, we're going to go ahead and
3:01 install this one together. So, what
3:03 we're going to do is head over to this
3:04 GitHub Reaper right here. And I'm going
3:05 to go ahead and grab the code. And all
3:06 we're going to do is come down here and
3:08 copy this. Beautiful. So, let me load up
3:09 the operating system and we're going to
3:11 have a conversation with this voice
3:12 intelligence layer which is going to
3:14 make it super cool. Let's come down and
3:15 begin a conversation with Hermes agent.
3:17 Okay. Come down and we can start off.
3:18 >> Hey Jack, what's on your mind?
3:21 >> Hey there. Basically, I've got a GitHub
3:22 repo. I'm going to give it to you. What
3:23 I'd like you to do is go ahead and
3:26 install that for me. Uh, so we can use
3:27 this new research engine.
3:29 >> Sure, I can help with that. Let's get
3:31 the details of the repo and we'll go
3:33 from there. What's the link to the
3:34 repository?
3:35 >> Cool. I'm just going to enter it into
3:36 the chat right now and then let Hermes
3:38 work his magic in the background.
3:40 >> Start by cloning that repo and setting
3:41 it up. Are you planning to run this on
3:44 your local machine or on a server?
3:46 >> Yeah, let's let's run that on the local
3:47 machine, please.
3:48 >> All right, running it locally. It is.
3:50 Let me pull in the information and get
3:52 the installation process going.
3:54 >> Beautiful. So, Hermes has done some work
3:55 in the background. What I would love to
3:57 know as well is could you just make a
3:58 list of all the new capabilities that
4:00 this repo has given to you as Hermes
4:03 agent and then let's think of an example
4:05 to test this just to make sure that it's
4:06 completely live right now.
4:07 >> Hermas now has the following new
4:09 capabilities from that repo. Advanced
4:12 web scraping realtime data extraction
4:15 fine-tuned natural language processing.
4:17 >> Okay, so you get the idea. Basically,
4:19 Hermes gives that full breakdown. Of
4:20 course, if we prefer, we can just have a
4:22 regular conversation with it if we want
4:23 to, but it has access to all these
4:25 different functionalities now, which is
4:26 great. Cool. So, I've also got Telegram
4:28 up, so if you prefer to just type it on
4:29 the go, we can do. Cool. Hey, I just
4:31 downloaded the brand new skill from
4:34 GitHub. What I'd like to do is to wire
4:36 this into Hermes agent so that you can
4:38 use it yourself. And then just give me a
4:40 short overview of the new skills that
4:42 this has given you and how this improves
4:44 on what you had previously. And then
4:46 we're going to test this live together
4:48 to see that in action. And I like to do
4:50 this as well mainly because it's great
4:51 for Hermes to explain and articulate
4:53 exactly how it works. And I always do
4:55 this whenever I get a G repo. Hermes has
4:57 read understood everything anyway. So
4:59 it's good to give you that breakdown
5:01 back in terms of what's working and how
5:02 you can improve on it. So Hermes has
5:04 come back. We've got new useful roots
5:06 and this is a good way of thinking about
5:07 it. It's not making Hermes more
5:08 intelligent. What it's doing is
5:10 improving its rooting. It's an
5:12 intelligent rooting system. So Hermes
5:14 doesn't need to rethink every time it
5:15 wants to do something. It knows it's got
5:17 the exact processes that have been
5:19 outlined in the skill, which is
5:21 fantastic. And again, it knows which
5:22 tool to use for which platform. It can
5:24 run a live dock to check out and prove
5:26 what is working. And it gets better
5:28 fallbacks when normal web tools fail,
5:30 which is really freaking handy. So
5:31 instead of summarize this repo, you say
5:33 scout this repo and see if it's worth
5:34 making a video about. And then Hermes
5:36 can do its magic. So what we're going to
5:37 do is give it this little prompt here,
5:39 which is go ahead and wire everything
5:40 up. And the beautiful thing is Hermes
5:42 agent can go ahead and do that for us.
5:44 Beautiful. Now, Hermes has come back and
5:45 connected that together. And by the way,
5:47 if this sounds like I'm speaking
5:48 Japanese, I'm going to put a link down
5:49 below for the CL code full course that
5:51 will take you from foundation setup
5:53 website, a full Hermes masterass,
5:56 everything you need to know to get up,
5:57 get started, compliance stuff I've never
5:59 shared on my channel, as well as this
6:01 entire cloud operating system, the voice
6:04 visual intelligence lay you just saw me,
6:06 and all the other bells and whistles.
6:07 I'll put a link down below so you can go
6:09 ahead and grab that one. Now, one of the
6:10 things we want to do here is just
6:12 confirm first of all what is active and
6:13 put it to the test. Probably one of the
6:15 best tests we can do is YouTube. So,
6:17 we've got web pages and it's just given
6:19 it now more intelligent routing. So,
6:20 when we say to Hermes, hey, go find out
6:23 this information, it's got that system
6:25 already built into it. So, some stuff
6:26 that needs connecting and talk about
6:28 that in a second. So, and how this
6:29 actually physically works under the hood
6:31 if you want to get X, Reddit, all those
6:32 different bits and pieces. So, I'm going
6:34 to say awesome. Let's put this to the
6:35 test. I would like you to go over to the
6:37 Jack Roberts YouTube channel and find my
6:40 latest long form video and then why
6:42 don't you go ahead and tell me what was
6:44 the first sentence of that video using
6:47 your skill. Okay, send that one off and
6:49 let it work its magic. And then just
6:51 like that, not only has it found the
6:52 correct YouTube video, it's given me the
6:54 exact sentence, which I think is just
6:56 really cool because now I have access to
6:58 YouTube. Now we can do this with GitHub.
7:00 So I could say, "Hey there, I'd like to
7:01 go ahead and test this GitHub. Tell me
7:03 what this GitHub repo is about uh and if
7:06 it's worth discussing. All right. And
7:07 I'm going to drop in the actual
7:10 ironically the GitHub that we're talking
7:11 about right here. So we can test this
7:13 one out. Beautiful. And just like that,
7:14 it's come back and actually got
7:16 everything for us. So give your AI agent
7:17 eyes across the internet. It helps you
7:19 search for things like YouTube, GitHub,
7:20 RSS, Reddit X, etc., etc. Here's a key
7:23 nuance. It isn't a magical scraper. It's
7:25 more like a routing and install and
7:27 doctor system. So which tool to use?
7:29 Which background is currently working?
7:31 What needs authorization? what's broken,
7:33 etc., etc. Now, how this works give you
7:35 access to things like LinkedIn, Reddit,
7:37 and X, is it does it based on a cookie
7:40 system. So, essentially the way that
7:41 this is configured is that you sign into
7:43 those services on your computer and then
7:45 it uses that cookie. So, that's fine, so
7:48 to speak, but it's only really as sort
7:50 of like balanced and functional unless
7:52 something changes in the background, it
7:53 might not work. I personally don't like
7:55 going down that route. So, what I do
7:57 instead is leverage other systems that I
7:59 think are way more robust. For example,
8:01 if you connect within your Hermes agent,
8:04 uh you can actually connect Grock very
8:06 very easily via the Grock Oorth. And you
8:08 can do this in terminal also. But what
8:10 we can do here, if you actually go ahead
8:12 and use Grock, you can search the
8:13 entirety of Twitter. So for example, if
8:16 I come off this, I might come back over
8:18 and say something like, "Hey dude, I'd
8:19 like to go ahead and use Grock and find
8:21 for me like five trending and
8:23 interesting developments with Claude
8:25 code in the last week. I want to know
8:27 ones that have say good view velocity,
8:29 good engagement velocity and everything
8:30 like that. So you can configure this
8:32 using Claude or Hermes itself. Just bear
8:34 in mind that the ripper itself is in
8:36 Chinese. So if you're on the doctor, you
8:37 may not understand it unless you
8:39 basically speak Chinese. I personally
8:41 though I'm not using any of the cookie
8:43 things cuz I think things like X I can
8:45 actually access myself uh within
8:47 Telegram by connecting it to Grock. But
8:49 if you did want to bring in those
8:50 different things like Reddit and you
8:51 didn't want to give your API key, you
8:53 can use this kind of strategy to grab
8:55 the cookies. And then just like that,
8:56 it's gone ahead and used Grock and now
8:58 we have access to the entirety of X all
9:00 within Hermes agent. How cool is that?
9:03 And all you have to do is just connect X
9:05 to it in the model selector, which is
9:06 really cool. Now it's come back with
9:07 some ideas, dynamic workflows, things
9:09 around agent loops, lots of
9:10 conversations around that. That has been
9:12 around for a very long period of time.
9:14 But what's really cool is actually come
9:15 down here. It used Gro X for the search
9:17 tool and then it actually went ahead and
9:19 used our agent research and a YouTube
9:20 like basically YouTube search to sanity
9:23 check it to make sure that it's fully
9:24 aligned which I think is really freaking
9:26 cool and it leads us very nicely then
9:28 onto the second part of this and that's
9:30 essentially this idea that we now have
9:31 this research machine in our pocket.
9:33 This idea that we can yap to Hermes
9:35 agent whenever we want to and it goes
9:37 and finds out all of this wonderful
9:39 information. But we can take it one step
9:42 further and this is where we get to
9:43 level two. Now, what if I told you that
9:45 what we're going to be using right here
9:46 now is actually used by OpenAI
9:48 themselves and also Anthropic. So, it
9:51 takes it to a bit of different level and
9:53 just gives different capabilities to our
9:55 Hermes agents. And I'm talking about
9:57 clay.com. So, this is used by a
10:00 gargantillion different companies which
10:01 I thought was super interesting, piqu my
10:03 interest initially. HubSpot, they got
10:05 case studies with what Canva, OpenAI,
10:08 very very cool. So think of Clay as like
10:10 almost like a database or a table that
10:13 fills itself in. It's like a go to
10:15 market data platform and it enriches
10:16 leads from like hundreds of different
10:18 sources. So information is one thing,
10:20 but when we want to grow our business or
10:22 do various different things, Clay is a
10:24 super duper kind of big uh system that
10:26 can work in the background. It's got
10:27 agents. It's got lots of really cool
10:28 stuff. We're going to integrate it into
10:30 Claude and also Hermes agent to give it
10:32 some really powerful capabilities. When
10:34 I reached out to the team, I said,
10:36 "Dude, I want to do a video with you
10:37 guys." they graciously agreed to sponsor
10:39 this part of the video. So, thank you
10:40 Clay for doing that. But let's start
10:42 actually by logging in. I'll show you
10:43 exactly what I mean and why this needs
10:45 to be on your radar why it's so cool.
10:46 So, I'm going to come over down here and
10:47 just sign in with Google real quick. So,
10:49 first of all, if you wanted to take your
10:50 signals to another level, one of the
10:52 things we can do if you click on signals
10:53 on the left hand side and let's say that
10:55 you and I want to target dentists or you
10:58 and I want to target, I don't know,
10:59 doctors, whatever it could be, we can
11:01 actually start using some of these
11:03 different categories to do that. So
11:04 there's lots of stuff that you can do
11:06 within the actual clay platform itself,
11:07 but we're going to be using the
11:09 connector. So we can actually use it
11:10 within Hermes directly and also claw.
11:13 You can come down to the plus button
11:14 down here, go down to connectors, and
11:16 you can add it as a brand new connector,
11:17 which of course here is just going to be
11:19 clay. And you can see the different
11:20 things you can do. The capabilities are
11:22 exactly the same within Hermes agent.
11:24 Now, I've made it unbelievably easy to
11:26 connect Hermes with Clay. I'll put a
11:28 link for this down below so you can
11:30 literally go ahead and grab it. All
11:31 you're going to do is come down, going
11:32 to copy all of this, like so. head over
11:34 to Hermes and just drop it in. And then
11:36 once that happens, essentially it's
11:37 going to open up something for you to
11:38 authorize yourself. And if not, you can
11:40 just run this in the terminal. Going to
11:42 come down here. This is MCP access. Just
11:44 pick the workspace that you want to give
11:45 it to. Come down and click on authorize.
11:47 And as you can see, authorization is now
11:49 successful. So when you pick your
11:50 workspace, if the first one doesn't
11:52 work, you can actually check out the
11:53 second one and that will work for you
11:54 absolutely fine. And then to validate
11:55 that, we can just say to Hermes agent,
11:57 hey there, could you just confirm that
11:58 you have access to the clay MCP, please?
12:02 And it's cool because then we can turn
12:03 this into a skill. So we can use it
12:04 whenever we want to. We'll just get
12:06 Hermes agent to confirm it. And then we
12:08 can test out the magic of Clay. And just
12:10 like that, it's now fully connected. So
12:12 let's give it a prompt. Hey there. So I
12:14 would like you to based on everything
12:16 you know about me, go and grab for me
12:18 three people from Anthropic and three
12:21 people from OpenAI that I could make
12:23 contact with. I want you to do some
12:25 research on them based on all the things
12:26 you have available in CLA. and write for
12:28 me a personalized message for all six of
12:30 those individuals who I as a YouTuber um
12:34 founder entrepreneur could make contact
12:36 with to work with those organizations
12:38 and then I'd like to go ahead and create
12:39 for me a HTML overview so I can see all
12:41 the messages background information
12:43 research but also feel free to publish
12:45 that in the chat first of all pretty
12:47 tough challenge but again if this
12:49 information is amazing we will
12:51 absolutely crush it with this and just
12:52 like that Hermes is completed we've done
12:54 everything with clay which is fantastic
12:56 it's hidden crow is a HTML document
12:58 which we're going to check out in a
12:59 second. It's got six people, three from
13:01 OpenAI and three from Anthropic. And
13:03 he's explained why that's helpful. So,
13:05 I'm going to pull up the HTML document
13:07 that it pulled together, which I thought
13:08 was really helpful. Actually, the fact
13:10 that we can do this with Hermes again is
13:11 freaking awesome. Six AI partnerships
13:13 for Jack. Let's check out exactly what
13:15 we're dealing with here. So, best angle
13:17 is pitch yourself as a creative founder
13:19 blah blah blah. And then we've got
13:21 OpenAI, why him collaboration idea,
13:23 message, message, message. So, not only
13:25 do we have the six contacts, we've also
13:27 got a figurative message that we can
13:28 send there. And then one thing I'm
13:29 noticing here is we don't actually have
13:31 the contact information because I didn't
13:33 ask for it. So, we're going to go
13:34 straight back over to Hermes and ask
13:35 Clay to go ahead grab us those emails as
13:37 well. I want to come back. It's gone
13:38 ahead. Clay has found four out of the
13:40 six so far. Two in progress. It's just
13:42 polling. And it's just so handy to be
13:43 able to say, "Hey dude, what are these
13:44 email addresses and be able to get those
13:46 just from a question." Beautiful. And
13:47 now we've got all the emails back. I'll
13:49 blow them out for their privacy. But you
13:50 get the idea of what clay is possible,
13:52 especially when we're looking at things
13:53 like incorporating with Hermes and this
13:56 co this idea that everything we have
13:58 sits together in one specific location
14:00 and of course from that we can do a
14:01 gargantillion different things have
14:03 those live conversations if we want to
14:05 which is cool. So clay itself and this
14:07 is important to understand in terms of
14:08 what it can do why people are using it
14:10 verified emails can do AI research find
14:12 signals sync with CRM and do individual
14:15 outreach specifically this is what I
14:17 mean so they've got a waterfall across
14:19 150 providers and the pricing only hits
14:22 when you find a hit so you're not
14:23 basically charged for something that
14:25 doesn't work we can find committee so
14:26 find decision makers which is cool
14:28 they've got a clear agent AI research
14:29 which is quite handy and then if you
14:30 want to build up the sequences you've
14:32 also got a personalized outreach but it
14:34 does lead me on very nicely to kind the
14:36 crux of this entire intelligence system
14:38 and that's the fact that we're building
14:40 out this research intelligence agent so
14:42 that when we're using Claude and Hermes
14:44 whichever platform we're actually going
14:45 ahead and talking to we can actually get
14:47 the right information as quickly as
14:49 humanly possible saving us time saving
14:51 us failures and saving us a lot of money
14:53 because it's not failing. So now we have
14:54 a research intelligence system that
14:57 without a proper operating system behind
14:59 it isn't going to get us as far as we
15:01 want to go. So, what we need to do next
15:03 is build that operating system, which we
15:04 do in this video right
