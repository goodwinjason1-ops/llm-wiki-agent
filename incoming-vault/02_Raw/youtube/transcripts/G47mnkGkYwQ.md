---
source_url: https://youtu.be/G47mnkGkYwQ?si=jpoJB2mqBMbTgRQz
ingested: 2026-07-02
sha256: b7382f661b2a3a5d6ae75eff0cf4405e66e3ff175fcba4e08449c5b33416e1a8
type: raw-transcript
video_id: G47mnkGkYwQ
duration: "47:01"
---

# Transcript — Seven levels of Hermes Agent

0:00 My name is David Andre and here are the
0:01 seven levels of Hermes Agent. While most
0:04 people only have a very basic setup, in
0:06 this video I'm going to show you how to
0:08 set up Hermes Agent so it's actually
0:10 useful and very very powerful. In the
0:12 first level, we will go over the
0:14 fundamentals. I'll show you how to
0:15 install Hermes Agent on a dedicated VPS.
0:18 In the second level, we will integrate
0:20 Discord. We will set up a custom Discord
0:22 server and create a new Discord bot
0:24 specifically for your Hermes Agent. In
0:26 the third level, we will set up Hermes
0:28 Curator. This is a new thing inside of
0:31 Hermes Agent that compacts the
0:33 auto-generated skills. I'm going to show
0:35 you how to set it up so you can save on
0:36 tokens. In the fourth level, we will
0:38 talk about automations and cron jobs and
0:40 how to set up Hermes Agent so it
0:42 automatically backs up itself to GitHub
0:44 every single day. In the fifth level, we
0:46 will take it further. We'll talk about
0:48 the new Kanban board built into Hermes
0:50 Agent so you can visually see how it's
0:52 progressing on tasks and you can give it
0:54 different tasks in different stages just
0:56 like you would if you had a full team of
0:58 developers. In level six, we will talk
1:00 about advanced memory system. We'll set
1:02 up holographic memory for Hermes Agent.
1:04 We'll take it a step further on how to
1:06 give Hermes Agent what's basically
1:08 infinite memory. And in level seven, we
1:10 will turn Hermes Agent into a full
1:12 backend. We'll expose it as an MCP
1:14 server so that your cloud code, your Pi
1:17 Agent, your Codex can interact with
1:19 Hermes Agent, build on top of it,
1:21 delegate tasks to it as if it was a full
1:23 MCP backend. Now, I've been following
1:25 Hermes Agent very closely since the
1:27 first few days it came out in February.
1:30 Paying attention to every major update,
1:31 I've also personally spent thousands of
1:33 hours using different AI agents from
1:36 cloud code to Codex to Pi Agent to Open
1:38 Claw to Hermes Agent. And I'm one of the
1:40 few people who actually practice what
1:41 they preach. I built a whole AI startup,
1:44 Vecto, from zero to 155,000
1:47 ARR just by using AI agents like Cursor
1:50 and Claude. And currently, I'm spending
1:52 between six and 10,000 dollars per month
1:55 on just API costs for AI agents. So in
1:58 this video, you're not going to get some
2:00 unproven theories or hypothetical
2:01 scenarios. I'll show you how to actually
2:04 set up Hermes agent and how to make it
2:05 powerful in seven different levels where
2:08 each level makes it more and more
2:10 powerful building on top of the previous
2:12 ones. And don't worry, you don't have to
2:14 be a DevOps expert or a developer to do
2:16 this. As long as you have a computer,
2:19 access to internet, and you can speak in
2:20 English, you can absolutely follow this
2:22 tutorial. So, if you watch until the
2:24 end, you're going to have a more
2:25 powerful Hermes agent setup than 99.9%
2:28 of people. Now, the first thing we need
2:30 is a VPS. That way, the AI agent can
2:32 live on its own computer. I think the
2:34 best option by far is Hostinger. This is
2:36 what I use for all of my AI agents and
2:38 automations, and it's also one of the
2:39 most affordable options out there. So,
2:41 I'm going to leave a link to this
2:42 landing page below. And as you can see,
2:43 they have a dedicated Hermes agent setup
2:46 to make it as easy as possible. So, go
2:48 right here, click deploy, and again, the
2:50 link to this page is below the video.
2:51 And here, select the length of the plan.
2:53 I would recommend going for 24 months,
2:55 but minimum 12 months. The reason is
2:57 simple. You set it up once, and the AI
2:59 agents keep running forever. And with a
3:01 single VPS, you can use Hermes agent,
3:03 Open Claw, Agent Zero. You You can put
3:05 your any kind of automations in there.
3:06 You can host your full full-stack web
3:08 app on a VPS. You can do all of that on
3:10 a single KVM 2 plan. So, that's why I
3:12 recommend going for 24 months. Plus, you
3:14 get the biggest savings if you go for 24
3:16 months. Now, if you want to save even
3:17 more money, go to the right and click on
3:19 have a coupon code and type in code
3:20 David. Hostinger was kind enough to
3:22 sponsor this video. So, if you use the
3:23 code David, you'll get an additional 10%
3:26 off your Hostinger plan. Then, scroll
3:28 down, select the server location. I'm
3:29 going to go with Lithuania, and click on
3:31 continue. This will take you to your
3:32 Hostinger cart where you need to put
3:34 your credit card information and
3:35 complete the checkout. Now, it's going
3:36 to take a few minutes for your VPS to
3:38 set up, usually 2 to 3 minutes from my
3:40 experience. So, in the meantime, we can
3:41 look at the official Hermes agent GitHub
3:43 repo, which has 133,000 stars. Pretty
3:47 crazy growth, if you ask me. In fact,
3:49 it's one of the fastest growing
3:50 open-source projects in history. Now,
3:52 what the team behind Hermes did is that
3:54 they created everything into a single
3:56 quick install command, right? So, with
3:58 Hostinger, we get an option of deploying
4:01 this inside of Docker container, which
4:02 is good for security, but personally I
4:04 prefer running it on a root level, which
4:06 luckily is very easy. You just copy this
4:08 one-line installer and run it in the
4:10 terminal. All right, let's go back to
4:11 Hostinger, where the VPS has finished
4:14 setting up, and we're going to do that
4:15 using SSH. And again, you don't even
4:17 have to understand what SSH means. You
4:20 just need to know, "Hey, I copy this
4:21 command, and this is going to be used to
4:23 access my virtual private server from my
4:25 own computer." And then when you open
4:27 the terminal, you simply copy this SSH
4:30 command and you paste it in. Boom. It's
4:32 asking, "Are you sure you want to
4:33 connect?" I'm going to do yes, and then
4:35 it's going to ask for our root password.
4:37 And again, if you managed to forget
4:38 this, no worries, it's very easy to do a
4:40 reset in Hostinger. Just click here,
4:42 root password, click on change, and
4:44 click this button to generate a
4:45 password. It will generate a new secure
4:47 password for your VPS. All right, seems
4:49 like the password has changed. Let's
4:51 open the terminal again and paste that
4:52 in. Boom. And here we go, we're logged
4:54 in into our VPS. You can type in clear
4:57 to get rid of this mess. So, now I can
4:59 control what's happening on my virtual
5:00 private server, and this is important
5:02 because it allows me to do things like
5:03 installing Hermes Agent on root level.
5:05 So, when I go back to the GitHub repo,
5:07 which again I'm going to link this below
5:08 the video, you can just copy the quick
5:10 install command, literally click right
5:12 here to copy the full thing, go back to
5:14 the terminal, and paste it in. Boom. And
5:17 this is going to install all of the
5:18 dependencies that Hermes Agent needs to
5:20 run on your VPS. So, if you don't have
5:22 your own VPS in 2026, go below the
5:24 video, click the first link, it's going
5:26 to take you to this Hostinger page, and
5:28 set up your own VPS. All right, check
5:29 the terminal. Okay, so it's finished
5:31 running. Let's go with the quick setup,
5:32 hit enter. Now we need to select the
5:34 inference provider, aka how do we use
5:36 AI? How do we access AI? Now, as you can
5:38 see there's a lot of options, right?
5:40 News portal, it's from the developers
5:42 behind Hermes. We can also use Open
5:44 Router and Froopyland LM Studio if you
5:46 want to run the models locally and have
5:48 it completely private. Or you can use
5:50 for example Open AI codex, which allows
5:52 you to use your chat GPT subscription to
5:54 run Hermes agent for free, right? So, if
5:56 you have if you're paying for chat GPT
5:58 plus or chat GPT pro, you can literally
6:00 use that subscription to power Hermes
6:02 agent. But, personally, I'm going to use
6:04 Open Router because allows you to use
6:06 any model possible.
6:07 Next, we need to give it an Open Router
6:09 API key. So, I'm going to go to
6:10 openrouter.ai, go to top right, click on
6:12 credits. Oh, make sure to create an
6:14 account. It's completely free. But, you
6:16 need to charge a couple of dollar of
6:17 credits. Um, five or ten dollars should
6:19 be enough. You don't need 88. Go to top
6:21 left, click on API keys, and then go to
6:24 top right and click on new key. Let's
6:26 name it seven levels of Hermes.
6:29 And I'm going to put some credit limit,
6:30 like $30 should be enough. And I'm going
6:32 to create. Now again, do not share your
6:34 API keys with anybody.
6:35 Obviously, I'm going to rotate this key
6:37 before uploading this video. I'm going
6:38 to copy and go back to the terminal and
6:40 paste it in. You need to click and paste
6:42 it in. It will not be showing because
6:44 it's a private key, so don't be
6:45 surprised by that. It doesn't show the
6:47 characters. Here you can select any type
6:49 of model available on Open Router. This
6:51 is why I like to use it. There are so
6:52 many models. But, I'm going to go with
6:54 Opus 4.7, which is Anthropic's latest
6:57 model they give us, you know, to us
6:58 public um, the plebs. Okay, so actually,
7:01 uh, this is the next level, so I'm going
7:03 to skip that. But, I'm going to show you
7:04 Discord in a second. Launch Hermes chat
7:06 now. And yes, we can test chatting with
7:08 it.
7:10 Okay, there it is. Hermes agent loaded
7:13 on our very own VPS.
7:15 You can see the list of available skills
7:17 here.
7:17 But, I'm just going to send a message,
7:19 "Hey."
7:21 And let's see if we can get a successful
7:22 response. There it is. Hermes agent
7:24 running Claude Opus 4.7
7:26 on our very own VPS. So, this is level
7:29 one completed. Real quick, anyone who
7:31 joins the new society during the month
7:33 of May will receive a personalized audit
7:35 of their GitHub repository. And you can
7:37 actually tell us what to focus on,
7:38 whether it's security, architecture,
7:40 front-end design, code quality, or just
7:42 leave this empty and let us look at it.
7:44 A lot of the people who get into AI
7:46 coding, they have no idea what they're
7:48 doing, and they have no idea if their
7:49 GitHub repository has any flaws, issues,
7:52 or obvious things they're missing.
7:53 That's why for the month of May, anyone
7:55 who joins the new society will receive
7:57 this as a bonus, a personalized GitHub
7:59 audit. Plus, we have a new course about
8:02 Hermes Agent. So, if you like what
8:03 you're seeing in this video and you want
8:04 to take it a step further, make sure to
8:06 join the new society, go to the
8:08 classroom, and go through the Hermes
8:10 mastery course. The link to the new
8:11 society is going to be below the video.
8:12 Now, level two is connecting Hermes to a
8:15 chat messaging tool that you already
8:17 use, right? So, you can use it from the
8:18 comforts of WhatsApp, Slack, Telegram,
8:20 Discord, iMessage, whatever you're
8:22 already using, you can use Hermes from
8:24 that. And for this video, I'm going to
8:26 use Discord. So, let's switch back to
8:28 our terminal. I'm going to hit control C
8:30 to kill this process.
8:31 So, you need to hit control C a few
8:33 times. I'm going to type in clear to get
8:35 rid of everything and make it clear. And
8:37 I'm going to type in Hermes gateway
8:39 setup. Enter.
8:41 This will allow us to set up further
8:42 things about the gateway. You can see
8:43 how many options there is. Even
8:45 Microsoft Teams, right? Like some of you
8:47 might be using Microsoft Teams. It's
8:48 kind of crazy. But if you are, you can
8:49 use Hermes Agent in your Microsoft
8:51 Teams. Even email, right? I'm going to
8:52 go with Discord, number two, hit enter.
8:55 And we need Discord bot token. Now,
8:57 Hermes Agent gives us exactly where we
8:59 need to go. So, copy this URL to the
9:01 Discord developer portal.
9:03 Open a new browser tab and paste it in.
9:05 So, when you paste this, uh it's going
9:07 to open the developer portal. In the top
9:09 right, click on new application. I'm
9:10 going to name it seven-level Hermes. I
9:14 know, very creative. By the way, if you
9:15 want me to make more videos on Hermes
9:17 Agent, make sure to subscribe. It's
9:19 completely free subscribing on YouTube,
9:20 and it tells me, "Hey, you I should make
9:22 more videos like this one." So, if you
9:24 want your YouTube recommendations to be
9:26 useful AI content instead of just
9:28 wasteful entertainment, make sure to go
9:30 below the video and click the subscribe
9:31 button. It takes two seconds. It's
9:32 completely free, and it helps out a lot.
9:34 Appreciate it.
9:35 Okay. So, I'm going to click on create
9:37 create a new Discord app. It's asking me
9:39 if I'm human. Okay, maybe maybe I'm not,
9:42 but I'm going to click that I am because
9:44 we need it for our Hermes agent setup.
9:46 And here we are. Okay, so we can
9:48 obviously rename the bot and we can give
9:50 it an icon. Yes, so I'm going to use my
9:51 own custom software
9:53 to select a cool icon for Hermes agent.
9:57 Let's go with this one.
9:58 By the way, if you want me to release
10:00 this, comment below. Um we use this
10:03 internally for anything YouTube-related,
10:05 thumbnails, titles, sporting outline
10:07 videos. But again, right now it's only
10:08 available to my team. So, if there's
10:10 enough interest, maybe I'll turn it into
10:12 a commercial product. We'll see. Let's
10:14 go back to the developer portal and
10:16 let's select the icon.
10:17 There we go.
10:19 Apply and save changes. All right, so if
10:21 you look in the terminal what Hermes
10:23 needs, it needs the Discord bot token.
10:25 So, go to the left, click on bot,
10:28 and then scroll down and reset the
10:30 token.
10:31 Yes, do it.
10:32 It's going to ask for 2FA if you have
10:33 it. Paste in your 2FA code. Boom,
10:36 submit. And again, keep this token
10:39 private. Do not share this with anybody.
10:41 I'm going to copy it and I'm going to
10:42 paste it directly into Hermes. Here on
10:45 this page, if you scroll down,
10:47 we have these privileged gateway
10:48 intents. We need to enable all three of
10:50 these, right? So, presence intent
10:51 enable, server members intent enable,
10:54 and message content intent enable. And
10:57 then click save changes in the bottom
10:59 right. Now, on the same page, you also
11:00 need to give the bot some permissions,
11:02 right? So, whatever you want it to do
11:03 such as send messages, pin messages,
11:06 embed links, attach files, read message
11:09 history, send voice messages. Whatever
11:11 you want your Hermes agent to do, just
11:13 enable them here. Then, go to the left,
11:14 click on OAuth2, and scroll down here,
11:17 and we need to give it two things. We
11:19 need to give it the bot scope, and then
11:21 applications commands. These two. Make
11:23 sure to enable these two underneath
11:24 OAuth URL generators. And then scroll
11:27 all the way down. As you can see, it
11:29 gives you a generated URL. Copy that,
11:32 then open a new browser and paste that
11:33 in. This is going to invite this bot to
11:37 a Discord server, right? So, let's click
11:39 on allow.
11:40 But to complete this step, you need your
11:41 own Discord server, which if you don't
11:43 have it, let me quickly show you how to
11:44 set it up because it's very, very easy.
11:46 So, inside of the Discord UI, go to the
11:48 left and click on add server.
11:50 Here, I'm going to click create my own.
11:52 For friends and me, I'm going to name it
11:54 recording server, something simple, and
11:57 click on create.
11:59 And just like that, in a matter of 5
12:00 seconds, I managed to create a new
12:02 Discord server, which I would recommend
12:04 you to do because then you can use the
12:05 server for all of your different Discord
12:07 bots for AI agents. So, now if we rerun
12:10 the same link, we should be able to
12:13 invite Hermes agent into the recording
12:15 server. There it is.
12:17 And click on authorize. Okay, nice. On
12:19 the right, we can see that our seven
12:21 level Hermes has been invited to the
12:23 Discord server. Beautiful. Now, if you
12:25 remember correctly, in the terminal,
12:27 it's asking for my username, right? So,
12:29 inside of Discord, if you click on your
12:31 profile in the bottom left, you can see
12:33 copy user ID. If you don't see it, you
12:35 need to open user settings
12:38 and type in
12:39 developer.
12:40 Okay, developer on the left,
12:42 or maybe like advanced settings or
12:43 something, one of these two options, but
12:45 basically you need to enable developer
12:47 mode right here. And then if you click
12:48 on your profile picture, you will see
12:51 this button copy user ID. Click that, go
12:54 back to the terminal and simply paste it
12:56 in. Hit enter.
12:57 It's asking for the home channel. You
12:59 can leave it empty, so just hit hit
13:01 enter.
13:02 And that's it, done. Install the gateway
13:04 as a system D service.
13:06 You can do yes.
13:08 Hit enter again. Start the service now?
13:10 Yes. Enter. Okay, it is online now.
13:12 Beautiful. Our bot is online, so we say
13:14 if we tag it seven of Hermes, hey,
13:17 we should, hopefully, get a response.
13:19 Okay, we have have the eyes emoji. This
13:21 means that Hermes has seen the message,
13:23 and we click here into the thread.
13:26 There it is, it responded here.
13:27 Amazing. So, I can maybe say like, "Who
13:30 are you?" There it is. It has the eyes.
13:32 I'm Hermes, AI assistant. I can help you
13:34 with coding, research, writing scripts,
13:35 browsing the web, managing files, and a
13:36 bunch of other stuff, right? And when it
13:38 completes, it gives you the check mark.
13:40 So, that's how you know Hermes agent is
13:41 working and is responding. So, we have
13:44 level two completed. Now, let's go to
13:46 level three of your Hermes agent setup,
13:47 and that is setting up the Hermes
13:49 curator. This is a new thing released in
13:51 the last couple of days that basically
13:53 makes sure that your skills don't stack
13:55 up, right? So, if the self-improving
13:57 loop creates skills that never get used,
13:59 it will mark them for deletion after 30
14:01 days, and if they're not used for more
14:02 than 90 days, it will delete them so
14:04 that you don't get context rot, so that
14:06 your Hermes isn't bloated with skills
14:08 that never get activated. First, let's
14:10 go back to our terminal so we can access
14:11 our VPS again. I'm going to type in
14:13 clear and type in Hermes update so that
14:16 you update to the latest version of
14:18 Hermes agent. All right, there it is. It
14:19 says update completed. There it is. It
14:21 restarted the Hermes gateway.
14:24 And now, we can type in clear.
14:26 And to check the status of your Hermes
14:27 curator, if you already have it enabled,
14:29 Hermes curator status. As you can see,
14:32 it is enabled, and the settings are as
14:34 follows. So, obviously, we can change
14:35 all of these if needed, but
14:37 realistically, the default settings are
14:39 pretty good. If a skill isn't used for
14:42 more than 30 days, it's marked as stale,
14:44 and if it's not used as 90 days, it's
14:46 deleted. So, make sure you have curator
14:48 enabled because people who don't, they
14:50 just pay for wasteful tokens, right?
14:51 That can be thousands of dollars. In
14:53 fact, for me, it is thousands of dollars
14:54 because I'm using so many different AI
14:56 agents, and it's going to make your
14:57 Hermes agent more focused and less
14:59 distracted. Okay, let's talk about level
15:01 four, which is scheduled tasks, also
15:03 known as cron jobs, also known as
15:05 automations. This lets Hermes agent
15:07 automate things on a schedule, right?
15:09 So, it could be once a day, every other
15:11 hour, once per month. But this is very,
15:13 very powerful, and I'm going to show you
15:15 a use case that all of you should set
15:17 up, no matter what you're doing, and
15:18 that is daily backups to GitHub. So, by
15:20 the end of this level, you'll know how
15:22 to create any type of automation inside
15:24 of Hermes Agent, giving you the ability
15:25 to save endless amounts of time in
15:28 either your life or business. The first
15:29 thing we need is, of course, a GitHub
15:31 account, which is completely free. So,
15:32 go to github.com and top right, either
15:34 sign in to your existing account or sign
15:36 up for a new one. I already have a
15:38 GitHub, so I'm going to log in.
15:40 There we go. And then, make sure to
15:41 create a new repository, which you can
15:43 either do here by clicking new or by
15:45 clicking top right and going to
15:46 repositories
15:47 and then clicking the green button new
15:49 right here.
15:51 I'm going to name it something like test
15:53 Hermes backup, very simple.
15:56 Private repo for my Hermes Agent
15:59 backups.
16:01 Boom. Here, just make sure to put it as
16:02 private, okay? Very important. You don't
16:04 want your backups to be visible to the
16:06 internet. And then, click the green
16:07 button create repository.
16:09 And just like that, you just created
16:10 your own GitHub repo in a matter of 15
16:13 seconds. Nothing to be scared about.
16:15 GitHub is absolutely essential in 2026.
16:17 Now, inside of GitHub, we also need to
16:19 create a personal access token so that
16:21 Hermes can somehow access this GitHub
16:23 repo because, remember, we made it
16:24 private, right? So, go to top right,
16:26 click on settings. There we go,
16:28 settings.
16:29 Go to the left, scroll all the way down
16:32 and click on developer settings right
16:33 here.
16:34 Then, on the left, click on personal
16:35 access tokens, fine-grained tokens, and
16:38 generate a new one.
16:40 We can name it something like um seven
16:42 levels Hermes backups.
16:46 Owner, expiration, you can, you know,
16:49 set no expiration or 7 days, up to you.
16:51 And then, you can only select certain
16:53 repositories. We're going to select the
16:56 Hermes
16:57 backup, there it is. So, it cannot mess
16:59 with other repositories. Then, we need
17:01 to add some permissions. So, click on
17:03 add permissions, scroll down, and find
17:05 contents, and then put read and write
17:08 because it needs to read the GitHub
17:09 repo, but also write to it daily. Okay,
17:12 so now, click on generate token.
17:15 There it is, generate token.
17:17 And here it is.
17:19 So now what we need to do is we need to
17:21 open the terminal again, SSH into the
17:23 VPS, and type in hermes config set, and
17:27 then the name of the environment
17:29 variable. Let's do something clear like
17:31 GitHub token, and GitHub underscore
17:33 token. And then space, and copy this um
17:37 personal access token and paste it in.
17:39 Boom. This will securely store it into
17:41 the environment file .env, allowing
17:44 hermes to use it, but it's not going to
17:45 be sent to the AI. I'm going to open
17:47 hermes, and I'm going to tell it,
17:49 "Listen, I just set up a new token in
17:52 our .env file. I don't want you to read
17:54 it. I just want to check it if it's
17:56 there, and try doing something with it
17:59 to see if it works or not." File exists,
18:02 the token variables are and yeah, it's
18:04 the GitHub token. Okay, it's asking for
18:06 permission. I'm going to allow it. It
18:08 works, beautiful. So now, let's create
18:10 the cron job so that every single day at
18:13 night automatically back up itself into
18:15 GitHub, right? So if you remember, we
18:16 had this repo, and this repo is empty
18:18 now, right? Nothing is on there. So that
18:21 if something goes wrong, and if your VPS
18:23 explodes or you know, hermes agent
18:25 deletes everything,
18:26 your data is still safe on GitHub. Now
18:28 one thing you should check inside of
18:30 hermes agent is the status of the
18:33 gateway if it is installed as a systemd
18:35 service. That way it can run 24/7, and
18:37 that's very simple. You just type in
18:38 hermes gateway status, hit enter.
18:42 And as you can see, systemd linger is
18:43 enabled. Beautiful service survives
18:46 logout. That's amazing. So let's see, do
18:48 clear, and I'm going to give it this
18:49 prompt to set up the daily backup,
18:51 right? So very simple prompt. I want a
18:53 daily 3 a.m. backups of the entire
18:56 .hermes folder to my private GitHub
18:58 repo.
18:59 And this is the name of the repo we just
19:01 created, right? Test hermes backup.
19:04 The token is GitHub token.
19:06 Uh uh uh I'm I want to read the prompt,
19:08 but it's already doing it. Please set
19:09 the Git identity hermes bot, clone the
19:11 repo, create daily cron job at 3:00 a.m.
19:14 Prague time.
19:15 And uh yeah, it's just telling it what
19:17 to do, right? And then uh run it once to
19:20 see if the push works. So, it's going to
19:21 run it once.
19:22 Get up token is an environment. It's C.
19:25 The token is in there actually. Look
19:27 deeper.
19:30 I don't know why it's having trouble uh
19:32 looking into the token. Yeah, found it
19:34 in Hermes. Let me verify it loads. Okay,
19:36 update your memories so that you
19:37 remember where the ENV file actually is
19:41 located. Yeah, backup ran commit push
19:43 successfully. Let's reload.
19:46 And here we go. Here we have our first
19:47 backup from today
19:50 of the entire uh folder.
19:52 Which is uh 60
19:54 megabytes. It's above the GitHub limit.
19:58 Um so, to optimize it, we could only
20:01 backup certain things.
20:02 But, I'm going to also send this message
20:04 so it remembers the location of these
20:05 tokens.
20:06 And now the cron job is created here.
20:08 This is the ID. Schedule at 3:00 a.m. uh
20:11 Central Eastern European Time.
20:13 And the next run is tomorrow at 3:00
20:16 a.m. So, now Hermes agent is going to
20:18 back itself up. It's probably not uh
20:19 needed to back up the full thing every
20:21 day. If you want to just back up your
20:23 skills only, you can say, "Hey, just
20:24 make sure to back up my skills only." Or
20:26 only my markdown files, right? So,
20:28 you're probably um
20:29 going to have faster backups and not
20:31 like spamming your GitHub repo with the
20:33 full thing.
20:34 But, if you want the full thing, uh you
20:35 can also back up the the entire thing,
20:37 right? Again, just talk to it in plain
20:38 English. That's enough. So, now you know
20:41 how to create scheduled tasks, aka cron
20:43 automations, with Hermes agent. This is
20:45 level four. Now, let's go to level five.
20:47 Now, level five is really cool. This is
20:49 one of the biggest releases to Hermes
20:51 agent recently, which says a lot because
20:53 there are releases nearly every day.
20:55 Like, literally every other day, the
20:57 team behind Hermes agent pushes a major
20:59 update, which is crazy. But, this one is
21:02 especially insane because
21:04 first of all, it went very viral. But,
21:06 second of all, it allows you to run
21:07 multiple AI agents through a Kanban
21:09 board. So, the way it works is that the
21:10 agents claim tasks from the Kanban
21:12 board, and they work in parallel, right?
21:14 So, let me show you this graphic. And
21:15 you as the human, you simply watch in a
21:17 simple user interface instead of having
21:19 to have 20 terminals open, you just look
21:22 at the Kanban, and you manage, "Okay,
21:23 this task is in progress. This task is
21:25 getting started. All right, this agent
21:26 is working on that task." Like if we
21:28 know in the future, all of us are going
21:29 to have hundreds of AI agents working
21:31 for us much sooner than you realize. So,
21:34 what's going to matter is how do you
21:36 manage these agents? How do you actually
21:38 have clear observability and clarity of
21:40 what they are doing? That is going to be
21:42 a billion-dollar question, because
21:44 whoever figures this out is going to
21:46 help build a multi-billion-dollar
21:47 company, right? And obviously, Hermes is
21:49 trying to do that right now. And they're
21:50 actually adding it into Hermes agent.
21:52 So, this is level five. Let's set it up.
21:55 Now, one of the best things about
21:56 working with AI agents like Hermes is
21:58 that you can literally ask it to set
22:00 these things up for itself, right? So,
22:02 boom, a link to that release, and
22:04 literally telling it,
22:06 "Help me set this up."
22:08 For context, Hermes agent now has a
22:09 multi-agent via the Kanban in the UI. At
22:11 first, it activates the skill Hermes
22:13 agent. Then it checks the skill Kanban
22:15 orchestrator, and it goes to this URL
22:17 with browser navigate,
22:19 and it's going to read it and learn
22:20 everything about the release, and it's
22:21 going to tell me
22:23 what it needs from me, and the remaining
22:25 steps it's going to do it itself, right?
22:27 So, here it learned everything.
22:30 You already have Hermes latest update,
22:31 beautiful gateway running, Kanban
22:33 initialized. You're missing its
22:34 specialist profiles.
22:36 So, it's asking for the specialist
22:38 profiles.
22:39 I'm going to say, "Just set it all up.
22:40 You have my permission. Okay?" It's
22:42 asking too many informations. Obviously,
22:45 if you want to customize it, feel free
22:46 to tell it, like, "I want a researcher,"
22:47 or "I want this to be a for software
22:49 development," or social media research,
22:51 or something else. In this case, I just
22:53 wanted it to set it up and stop
22:54 overthinking.
22:56 Also, I'm going to say,
22:57 "Update your memory to always respond in
22:59 a super concise and clear way." Now, one
23:01 important thing I want to stress is that
23:03 do not use cheap models, okay? These
23:06 agentic harnesses, like Hermes agent or
23:08 open claw,
23:09 they're complex. They're very complex,
23:11 and if you cheap out and you try to use
23:13 a very small, very cheap model, you're
23:15 going to have a hard time, okay? So, to
23:16 get the most out of Hermes agent, use
23:18 something like Opus 4.7, GPT 5.5.
23:22 Don't be cheap, okay? Don't use small
23:24 model. Use the most powerful model
23:26 available.
23:27 So, as you can see, Hermes agent is
23:29 doing a lot, like dozens and dozens of
23:32 terminal commands to set this up
23:34 himself, right? Like I just said, "Okay,
23:36 I want this release. I want this
23:38 multi-agent Kanban orchestration
23:40 dashboard."
23:41 And that's it, you know, Hermes is
23:43 setting it up.
23:44 It was asking for command task these
23:45 other boards as ready.
23:47 Okay, what is this command? Security to
23:48 scan. Okay, let's allow it. And this is
23:50 the beauty of it being on a VPS. You
23:52 don't have to worry that it's going to
23:53 do something sketchy on your computer.
23:54 It has its own computer,
23:56 which I think it's the ultimate paradigm
23:58 where each agent runs on his own
24:00 computer, so it can set it up in a way
24:02 that it needs to be most effective.
24:05 The dashboard loads, and I was testing
24:06 the dashboard itself. That's crazy. Look
24:07 at this.
24:09 Wow.
24:10 It navigates to the local host on the
24:12 VPS. It clicks around, takes a
24:14 screenshot of it, and it's it's
24:16 debugging it itself.
24:18 Okay, man, this is impressive. Browser
24:20 vision.
24:21 This is the difference between Hermes
24:23 agent and something like ChatGPT, right?
24:26 ChatGPT absolutely cannot do these
24:27 things. Launch a local host server
24:29 inside of itself, and then click around
24:31 and take screenshots of it and debug it.
24:34 Man, this is wild. The dispatcher is
24:36 working. Let me grab a screenshot for
24:37 David. So, it saved the memory, and then
24:39 it said the Kanban setup is done for
24:41 profiles default, researcher, writer,
24:43 reviewer.
24:44 And the dashboard is there, and it even
24:46 gives me the SSH to view it from my
24:47 laptop. That's insane. I haven't even
24:50 asked for this. That was going to be my
24:51 next prompt. I literally have it
24:53 prepared.
24:54 I have the prompt prepared for it to
24:55 give me the the link for the SSH tunnel,
25:00 but it predicted that itself and it even
25:02 included a screenshot of what this looks
25:04 like on the VPS. Guys, this is crazy.
25:08 This is this insane. We really do live
25:10 in the future.
25:11 All right. All right. Well, let's do
25:13 this, right? So, actually I'm going to
25:14 give it the Let's go back to hosting the
25:16 panel and then I'm just going to take a
25:17 screenshot of this whole thing
25:19 and I'm going to say
25:22 update the SSH tunnel command to
25:25 actually include my VPS address.
25:29 Okay, I don't even want to bother
25:30 figuring this out. I can just screenshot
25:32 my full screen, send it to Hermes agent
25:34 and tell it, "Yo, figure it out. Tell me
25:35 what to do.
25:37 You know, what what is the server IP?"
25:39 It figured it out. Okay, copy that and
25:41 let's open the terminal again. We need
25:43 to actually open a new terminal. Command
25:45 N. Paste that in.
25:47 Root password again, so hopefully you
25:48 saved it. Boom, let's paste that in.
25:52 And here we go. We're in.
25:55 And then we can just open this and we
25:57 are in the Hermes agent Kanban. So, on
25:59 the left it's a bit small, but on the
26:01 left you can see Kanban right here.
26:03 Below plugins, click that. And this is
26:05 the Kanban. Okay, so you can drag stuff
26:07 around, change it up however you want,
26:09 just like in any Kanban board, right?
26:11 Whether you use Trello, monday.com,
26:13 ClickUp, whatever. You can manage how
26:15 your Hermes is working and dispatch
26:18 multiple Hermes agents on different
26:19 tasks. Now again, I really have to
26:21 stress this. Hermes set this up by
26:24 itself for most part. Like it ran for
26:25 like 3 minutes, 4 minutes, then done all
26:28 these commands and set it up by itself.
26:30 I just gave it the link to the release.
26:31 I like, "This is a cool release. I just
26:33 want this. Help me set this up." And it
26:34 literally did everything itself and now
26:36 we have the Kanban here installed. We
26:38 can click new tasks, you know, set up
26:40 rough idea,
26:42 research the new latest update of Hermes
26:44 agent.
26:45 Boom, we can create that. Maybe let's do
26:47 something in to do. Help me set set a
26:50 multi-agent workflow with Codex so I can
26:53 build and deploy apps on Vercel by
26:55 itself. Let's put something in blocked.
26:57 Help me set up a new office in Katowice,
26:59 Poland. I already did that, but you
27:01 know, just example as a as a thing.
27:04 And uh
27:05 these tasks are getting automatically
27:06 moved to ready, and Hermes is ready to
27:08 work on them. Okay, but this is cool and
27:09 all, but how do you actually make it
27:11 useful? Well, let me show you a use case
27:13 that I myself actually need, and that is
27:16 research for content. And in fact, all
27:18 of you can do this. Um just apply to
27:21 your own business or to your niche,
27:22 right? So, let's go back to Discord.
27:25 And let's paste in this prompt. So,
27:27 pretty long because I described exactly
27:28 what I want. I want to make a YouTube
27:30 video about uncensored AI models, right?
27:32 And again, let's say you want to make a
27:35 LinkedIn post about how to hire people
27:37 in Germany. Whatever you do, whatever
27:40 your business is about, whatever you
27:42 want to research,
27:44 just give it a task, okay? Describe the
27:45 task. You don't have to copy my own
27:46 example, but I'm doing something that's
27:48 truly useful for me because a lot of
27:50 people they're just incompetent in terms
27:52 of giving these agents use cases.
27:54 There's like literally such a large
27:55 percentage of population that have open
27:58 class set up, but they don't use it
27:59 because they don't know how. They have
28:01 Hermes agent, and they know how to set
28:02 it up, but they don't know what to give
28:04 it. So, here is a clear example.
28:07 Queue this as a four task Kanban
28:08 pipeline on the default board. You must
28:10 use Kanban create. Basically, I'm
28:11 telling it, you know, that it should use
28:13 the Kanban because, you know, sometimes
28:15 it just completes itself, but this is
28:17 all about the Kanban board, right? The
28:18 new update, so I wanted to be using it.
28:20 So, I send this detailed prompt.
28:23 And now Hermes agent is doing that. If
28:25 we reload, we can see some changes
28:26 happening.
28:28 Okay, we already have the changes. We
28:30 can see draft free research. There it
28:32 is, in progress research state of
28:34 uncensored AI models. You can click on
28:35 it to get more info. Priority is zero
28:37 size priority assignee researcher status
28:39 running. So, the it created four
28:41 different profiles of four different AI
28:43 agents, and now the researcher one is
28:45 working on it. You can see where it
28:46 lives on the workspace, created by the
28:48 user. You can see these all different
28:50 options, trash, ready, block, unblock.
28:52 Archive, the description of this task.
28:55 What's the state of uncensored,
28:56 obliterated, jailbroken AI models right
28:57 now? Covered topics, dependencies,
29:00 parents, comments, events, worker log.
29:03 Very detailed, and you can even send
29:04 comments on this task as it's running.
29:06 So, basically, here is how that works,
29:08 right? You have the first researcher,
29:10 what's new in topic this week? What's
29:12 new in fitness, in real estate, in AI?
29:14 Then, the second researcher was already
29:16 on YouTube about topic in the last 30
29:18 days. And these run in parallel, right?
29:19 Then, the analyst waits for the first
29:22 two to find a gap, right? Some angle,
29:24 something that people are missing. And
29:26 then, the fourth agent, the writer,
29:28 drafts three video concepts after the
29:30 third one finishes, right? So, this is a
29:32 very simple workflow
29:33 of multiplayer agents working at the
29:35 same time. And we have the Kanban to
29:38 actually monitor the progress, right?
29:39 So, obviously, Hermes agent can do this
29:41 even without the Kanban, but the way the
29:44 Kanban is useful is it allows you, the
29:46 human,
29:47 it allows [laughter] you to see what's
29:48 happening, right? Not just looking into
29:49 terminal with endless commands and lots
29:52 of text. This is a very visual way to
29:54 monitor the progress of your Hermes
29:56 agent and all the different sub-agents.
29:58 All right, so let's check what the
29:59 status is. We can see that
30:01 uh everything is moved to complete, and
30:03 we can even see these tasks, and we can
30:05 either click on them and inspect um
30:07 here, or you can go to Discord
30:10 and chat with it.
30:12 Chat with Hermes here.
30:13 What is the status on these tasks?
30:16 Give me a concise report.
30:20 So, it can check it itself. And by the
30:21 way, here, we can see a lot more things
30:23 than just the Kanban. We can see the
30:24 different sections we have, as well as
30:26 whether they're in Discord, CLI, or
30:28 somewhere else. We can see our cron
30:30 automations, scheduled jobs. Oh, this is
30:32 the GitHub one. You can see, boom.
30:34 We can also see the documentation if
30:36 something is uh
30:38 you know, lagging or something isn't
30:40 set up correctly, you can check the
30:41 logs.
30:42 You can check the models that are
30:44 available and the usage on them, how
30:46 many tokens total total spent, different
30:49 analytics about Hermes. So, this is very
30:51 useful. But, let's check in Discord. All
30:53 tasks done? Yes, show me the full output
30:56 and show it here. Again, Hermes gives
30:58 you this nice gateway dashboard.
31:02 And you can even restart gateway from
31:03 here or update Hermes.
31:05 Or you can just chat with it through
31:06 Discord for maximum convenience because
31:09 you know, you have Discord on your phone
31:10 or WhatsApp or Telegram, whatever you
31:12 prefer. And that's the power of these AI
31:13 agents. They're so configurable, so
31:15 extensible that anybody can adapt them
31:18 to their own
31:19 use case or their own preference. The
31:21 issue is that most people don't know
31:23 what their preference is or don't know
31:24 how to how to configure them. But,
31:26 luckily, you're watching this video, so
31:28 you hopefully at least know how to
31:29 configure them. And if you are smart,
31:31 you can figure out a few use cases for
31:33 Hermes agent.
31:34 All right, here is the answer. As you
31:36 can see, it's a quite long
31:38 answer.
31:40 Concept number one, unsensored coding
31:41 agent.
31:43 Use a 24/7 B model into cloud code with
31:46 Ollama, okay, fair enough.
31:48 A blooper explained new reps finding
31:50 that one direction and LLMs cause
31:52 refusal.
31:54 The bench off.
31:57 Okay, so specific ideas with clear
31:59 pre-production for all of them. Not bad.
32:01 Not bad. So, this is level five using
32:03 the
32:04 Hermes Kanban to manage your AI agents
32:06 and what tasks they're working on. Okay,
32:08 so level six is adding memory because a
32:10 lot of people struggle with AI agents
32:13 not having good long-term memory and
32:14 losing context and stuff like that. So,
32:16 here is why memory plugins like
32:18 holographic actually exist. Beginners
32:20 never save anything, right? They just
32:22 chat and they hope that the default
32:24 memory is good enough. And obviously, in
32:26 Hermes, it's probably better than in any
32:28 other agent, but beginners don't even
32:31 trigger that with words like remember
32:32 this or save this into memory. So,
32:34 everything stays in the chat and dies at
32:36 the end of the session. I think most of
32:38 you probably do that mistake as well. I
32:40 certainly did it when I was new to AI.
32:42 Also, bigger context doesn't mean more
32:44 memory.
32:45 People who are like one step, two steps
32:47 ahead of beginners, they just paste in a
32:50 bunch of
32:51 slop, right? And a lot of it it's not
32:52 even relevant to what needs to be done.
32:54 So, more context doesn't necessarily
32:56 mean it's going to be better memory.
32:58 But, more context always results in more
33:00 cost and worse attention to the things
33:01 that matter the most, right? A lot of
33:03 people then go to rag, retrieval
33:05 augmented generation, but that's by
33:06 vibes, you know? Vector similarity
33:08 cannot answer what does that unit own?
33:10 Like what what's my own um
33:13 task? What's my own responsibility? That
33:15 needs structure, you know? You don't see
33:16 what task is assigned to each person
33:18 just from uh similarity, just from
33:21 semantics. Now, embeddings also cost
33:23 money and they leak data, you know? If
33:24 you use Gemini embeddings, you are
33:25 sending it to Google. And uh summaries,
33:28 they blur over time, you know? They
33:30 compress essential facts away. So, most
33:33 people have no idea how to solve this.
33:35 And this is why things like Holographic
33:36 exist. So, in level six, we give our
33:39 Hermes agent near infinite memory. Okay,
33:42 so to set up this near infinite memory,
33:43 let's jump back into our SSH and type in
33:46 Hermes memory setup.
33:49 Hit enter.
33:50 And as you can see, it comes with a few
33:52 pre-made options, and Holographic is one
33:55 of them. Oh, you can try other ones like
33:56 Honcho, Mem Zero, Open Viking, Super
33:58 Memory. Um some of them require API
34:00 keys. As you can see, Holographic is
34:02 fully local, and that's a important
34:04 thing because then you're not leaking
34:05 your data. You're not sending your data
34:07 to any cloud, and obviously you don't
34:08 have to pay for stuff. SQL database
34:10 path, I think that's good. Hit enter.
34:13 Auto extract facts at the session end,
34:15 you can either enable it or disable it.
34:16 I would enable it if you want maximum
34:18 memory.
34:20 Default trust score for new facts,
34:22 output like 0.4.
34:24 Dimensions, leave that as it is. Enter,
34:27 and that's it.
34:29 Next, type in Hermes gateway restart.
34:33 Just to make sure that the Gateway picks
34:34 up everything.
34:37 And then we can type in Hermes.
34:39 And then in the chat we can say
34:40 something like check this
34:43 to see if we have the fact store.
34:45 Yes, holographic memory is set up and
34:47 working. All right, amazing.
34:49 So we can do something like read all
34:52 previous sessions as well as user.md and
34:56 memory.md
34:58 and seed the
35:00 holographic
35:01 fact store.
35:03 So that it can add some of these things
35:05 that we discussed in previous sessions
35:07 or some of these things that it already
35:07 knows about me into holographic because
35:11 you know, we just set it up so it's
35:12 obviously empty for now.
35:13 Okay, so it analyzed the all previous
35:15 sessions.
35:16 And now it's preparing.
35:18 So it did these tool calls to learn
35:19 everything about me and what we talked
35:21 about. And now it's doing uh
35:24 writes
35:25 into holographic fact store.
35:28 And we can actually maybe even prepare a
35:30 prompt like
35:31 from now on remember to store anything
35:35 important into holographic fact store.
35:39 Okay, it seeded 15 facts.
35:41 My name, that my preference uh discourse
35:43 CLI concise style responses. This is
35:45 good.
35:47 I mean yeah, this is basically all we
35:48 discussed but it it removed the useless
35:50 stuff and only saved the important
35:52 things. All right, so I'm not going to
35:54 say
35:54 um remember to store anything important
35:56 in holographic fact store from now on.
35:59 And it's going to save it into
36:01 the main memory so that it's
36:04 actually going to be using it.
36:05 Now, let's talk about a few use cases of
36:07 why having solid memory actually matters
36:10 in case it's not obvious. Number one,
36:12 you can say something like remember
36:13 everything about each video you're
36:15 making, right?
36:16 So for me, if I use Hermes dedicated to
36:19 YouTube, I would be running something
36:20 like that. Remember the key facts about
36:23 each video I'm making, if it's a
36:24 sponsor, if there's a deadline, what
36:25 angle we're taking, what went wrong so
36:27 it can be more useful if each video
36:29 going forward.
36:30 You can also check your sponsor history
36:32 to know which age which of the sponsor
36:35 paid what, right? So, the agent would be
36:37 in track of this. You don't have to
36:38 remember it in your head or track in
36:39 your spreadsheet. The agent would be
36:41 tracking that.
36:42 It can also recall your VPS setup, you
36:44 know, um how much disk space you have,
36:46 how much RAM you're using, all that
36:47 stuff. It can proactively check it
36:49 manually. That's another great um cron
36:52 job you should create. It's like a
36:53 weekly check of your VPS to see the
36:55 health. You know, maybe you're running
36:56 out of space, maybe your your RAM is
36:58 getting out of control. Who knows?
37:01 It can also catch itself when it's
37:02 holding two facts that contradict each
37:03 other, right? Because it would be in the
37:05 memory and say, "Okay, we upload videos
37:07 every 5 days." And there's a different
37:09 one that says every 3 days. Well, guess
37:11 what? It's contradicting and it can ask
37:12 you which of these is correct. And it
37:14 can find connections between topics
37:16 you've worked on that you don't even
37:17 realize, right? So, maybe shorter videos
37:19 perform better or sponsored videos get
37:22 less views, whatever, right?
37:24 Things that like actually can have
37:25 meaningful impact on your life or
37:27 business. So, while most people just
37:28 rely on the basic memory inside of
37:30 Hermes, which isn't bad, Holographic
37:33 takes it to the next level and makes the
37:34 long-term memory a lot better. All
37:37 right, level seven, the most advanced
37:39 level, obviously.
37:41 Turning Hermes agent into an MCP, okay?
37:44 So, basically you expose it as an MCP
37:46 server so that other agents like Cloud
37:47 Code or Code X can interact with it as
37:49 if Hermes was your back end. And this
37:51 has three main use cases. Number one,
37:53 serving as a remote approval gate. So,
37:56 let's say Cloud Code wants to run
37:56 something destructive, right? A risky
37:58 operation, deleting files, you know,
38:00 removing database backups, whatever. You
38:03 have like a hook that makes it pause,
38:05 Hermes pushes the approval prompt to
38:06 your phone so that, you know, let's say
38:08 you're on a date with a girl and then
38:10 suddenly you do something important
38:11 like, "Oh you know, my Hermes
38:12 agent is messaging me. It wants to push
38:14 a risky update to delete a database. So,
38:17 maybe like, 'Okay, this is a database
38:18 backup. It's obsolete. It's from 6
38:20 months ago.' You approve it or if it's
38:21 something it shouldn't do, you reject
38:23 it, right? And then
38:25 it continues. So, this is the use case
38:27 that Claude Code cannot do. Like, Claude
38:29 Code couldn't do this. It It doesn't
38:30 have access to your Telegram or Discord.
38:32 It doesn't have these connections, these
38:34 authentications. So, that's one use
38:35 case. The second one is walk-away mode.
38:37 So, you start a long refactor in Claude
38:38 Code and you close the laptop and you
38:40 get progress pings on your phone, right?
38:42 And you can reply like, "Keep going, you
38:43 know, make it simpler, fewer lines of
38:45 code, or push to GitHub, whatever." And
38:47 you can trash from your phone as well,
38:48 you know, so bug report lines and
38:49 Discord, you can tell Claude through
38:51 Hermes Agent to look at the relevant
38:53 file and reply with a free line
38:54 diagnosis before opening your laptop.
38:56 So, this is
38:58 three main use cases of turning Hermes
38:59 Agent into MCP. And it's the most
39:01 advanced level because most people don't
39:02 even understand MCPs, and they
39:04 definitely do not even know that it's
39:06 possible to turn Hermes Agent into an
39:08 MCP server. But, I'm going to show you
39:10 how to do that just now. So, just like
39:12 before, we're going to set it up by just
39:14 talking to Hermes and telling it to set
39:15 it up. So, I'm going to do {slash} new
39:17 to start a new conversation, and I'm
39:18 going to paste in a very long prompt I
39:20 have that starts with expose your Hermes
39:22 to Claude Code via MCP, so Claude can
39:24 read and send messages across your
39:25 connected messaging platforms, Telegram,
39:27 Discord, Slack, while you code editor.
39:29 And there is 22 more lines. Let me just
39:31 show you the full prompt.
39:32 Here's the full thing. Feel free to
39:34 screenshot it, so you have the full
39:36 prompt.
39:37 Boom, there it is.
39:38 So, Hermes exposes the gateway
39:41 so that Claude Code, which obviously can
39:43 use MCP servers because Anthropic
39:44 invented the Model Context Protocol, can
39:47 interact with Hermes, which otherwise it
39:49 couldn't interact and obviously access
39:50 all the things that Hermes has
39:52 configured already. So, let's go to the
39:53 terminal and see how Hermes is doing on
39:55 this task. Uh loop is closed, okay. So,
39:58 make your answer simpler and shorter.
40:00 I'm not reading all that. I don't know
40:02 why Opus 4.7 is so verbose.
40:05 Okay, Hermes MCP works.
40:08 Okay, so
40:10 tell me how to now test it on Claude
40:13 Code.
40:14 I I set up Claude Code on this VPS.
40:18 Which obviously we still need to do yet
40:20 cuz we haven't set up Cloud Code CLI on
40:22 the VPS. Hermes is giving up the steps.
40:24 So,
40:25 yeah, let's do that. I'm going to
40:26 actually open In fact, I'm going to
40:30 I'm just going to copy this and follow
40:31 in the
40:33 in the Discord because why not, you
40:34 know?
40:35 So, I'm going to copy this, go to
40:37 Discord, I'm going to start a new chat,
40:40 say uh
40:42 MCP a new thread so it's clearly
40:44 separate.
40:46 Boom, let's go to this thread.
40:49 I'm going to give it to everything here
40:50 as a context.
40:53 Context.
40:55 Help me set this up on my
40:58 VPS one step at a time. Be very concise.
41:03 Boom, let's send this and then here in
41:06 the terminal we can hit control C to
41:07 stop this and hit clear and follow these
41:09 instructions to set up um Cloud Code,
41:12 right? So,
41:13 first we need to install Cloud.
41:15 So, let's copy this command. Boom.
41:18 Installing Cloud Code.
41:20 It's similar to the Hermes agent command
41:21 we ran at the start, you know, a
41:22 one-liner installer that's going to
41:24 install everything.
41:26 So, there it is. If we do Cloud, it
41:27 should ask us to log in. We need to
41:29 reload the
41:31 reload the thing, right?
41:33 The shell. I'm going to
41:34 copy everything. I'm going to say
41:37 What now? Super plain English. Like I'm
41:39 literally showing you how to debug,
41:40 right? Using one AI agent, which is
41:43 Hermes agent, to set up Cloud Code.
41:45 So, that we can then expose Hermes as
41:46 MCP. It needs to add to path. So, I'm
41:48 just going to copy this, literally super
41:50 simple debugging. And there it is, it
41:52 works, right? So, I'm going to do Cloud.
41:54 I need to authenticate. Dark mode is
41:56 fine. Let's do Anthropic console
41:58 account.
42:00 Going to give us a link.
42:02 Boom.
42:03 Paste that into a browser.
42:08 Authorize.
42:10 We need to copy this code, switch back
42:11 to our terminal, and paste in this code.
42:14 And that should be it. Login successful.
42:16 Enter, enter, enter. Just press enter
42:18 three times. And let's type in message
42:20 to see if Claude code is working, and it
42:22 is working. That was very easy. In fact,
42:24 it has made this authentication super
42:25 easy. So, I'm I'm here.
42:29 So, I can just say
42:30 um SSH, boom.
42:35 I've managed to install Claude code and
42:37 login. What now?
42:40 All right. So, we need to register the
42:41 MCP. So, let's copy these two commands.
42:44 Switch back to our terminal, hit control
42:46 C to kill the Hermes uh TUI.
42:49 Let's run these.
42:51 Okay. So, that's that.
42:54 Okay, I did these two two commands. What
42:56 now?
42:59 Literally plain English debugging,
43:01 right? Just make sure to use the best
43:02 model you can. Don't use a cheap small
43:04 model. So, I'm using Open Server 7 here.
43:07 And uh now we start Claude code again.
43:09 So, I can do Claude {dash} {dash}
43:11 dangerously skip permissions.
43:16 Okay, it cannot be run in root,
43:17 whatever. Just let's do normal Claude.
43:19 Hit enter, and
43:21 let's see what tools it has through the
43:23 Hermes MCP.
43:26 All right. So, it gives all of these uh
43:28 different tools. MCP Hermes attachment
43:30 fetch, Hermes channel list,
43:31 conversations get.
43:34 Okay, so test this actually. Get the
43:36 previous conversations, and uh you know,
43:38 read some messages, and see if it
43:40 actually works, these MCP servers.
43:43 So again, plain English telling it to
43:45 test the Hermes MCP.
43:47 Let me load the tool schema first, then
43:49 test them.
43:50 Okay, let's This is why I wanted it to
43:52 add to run in dangerously skip
43:54 permissions, so we don't have to approve
43:56 these. Yes.
44:01 Both tools work perfectly. Here's the
44:02 summary. Conversation read returned
44:03 three Discord threads.
44:05 Messages read successfully read 10
44:06 messages.
44:08 Channels list, okay. Everything works
44:10 works. Nice.
44:12 Okay, so now use these tools to analyze
44:14 things about me as a user. What am I
44:16 likely missing? What are my attributes?
44:18 What are likely my goals? Based on these
44:20 conversations, based on these messages,
44:22 what can you tell about me? Make sure to
44:24 use the Hermes MCP for this and be very
44:26 concise.
44:28 Okay, let me read all three
44:29 conversations for a fuller picture and
44:31 it's calling the Hermes MCP.
44:33 Here's what the conversation reveal.
44:35 You're a content creator.
44:37 Okay, Vecto. It even knows the company
44:40 name. Power user of self-host AI infra.
44:43 Okay, so listen, I'm not claiming to be
44:44 power user. It's Claude code calling me
44:46 power user.
44:48 Your behavior patterns delegates fully,
44:50 low tolerance for verbosity, that's
44:51 true. Checks in hours later rather
44:54 monitoring, okay.
44:56 Your goals build AI agent, produce
44:58 YouTube content, automate everything.
45:00 Yeah.
45:01 I mean, it's true. It's
45:03 basically used the Hermes MCP to analyze
45:05 myself and uh
45:07 obviously the power of this is that as
45:08 you're building something, Claude code
45:10 doesn't need to have all the context of
45:11 your Hermes agent. You can keep it
45:12 private on a VPS, maybe Claude code is
45:14 on a different VPS or Claude code is
45:16 running locally and it can still fetch
45:18 the data when needed through Hermes
45:20 because Hermes agent can be served as a
45:22 MCP server, which again most people have
45:23 no idea because they don't go through
45:25 the seven levels of Hermes agent. Now,
45:28 if you watch all of this, the next step
45:30 is to actually go through the video
45:31 again and set it up. So, go below the
45:33 video, click the first link and get your
45:35 very own virtual private server.
45:37 Hostinger has the one of the most
45:39 affordable options for a VPS and it's
45:41 super easy to set up for Hermes agent.
45:43 This is what I was using in the entire
45:45 video. So, again, click the first link
45:46 below the video and get your own
45:48 Hostinger VPS. Make sure to use code
45:50 David for additional 10% off and if you
45:52 are serious about AI, then make sure to
45:54 join the AI society. Everyone who joins
45:56 in the month of May will get a
45:57 personalized audit of their GitHub
45:59 repository. So, you submit your GitHub
46:00 repo and we look at it. We can go
46:03 through the security, through the front
46:04 end, suggest new features, whatever you
46:07 want us to focus on, or if you just want
46:09 us to go through the whole thing without
46:10 any focus, you don't need to include
46:11 anything. But, this is only available
46:14 for people who join in May, because it's
46:15 not scalable to do this forever. It
46:17 takes a lot of time to audit these
46:19 GitHub repositories. So, if you join New
46:20 Society in May, you get a personalized
46:22 GitHub audit. Plus, in the classroom,
46:24 we're releasing a new course on Hermes
46:27 Agent. So, if you like this video, it's
46:29 just a taste of what's coming in the
46:31 classroom, right? So, inside of New
46:33 Society, you get more granular
46:34 step-by-step modules with pre-made
46:37 resources, configs, skill system prompts
46:39 that you can just copy-paste into your
46:40 life and business. So, if you want more
46:42 access and more content about Hermes
46:44 Agent, and also calls with me, which by
46:46 the way, there's literally a call
46:47 happening in 7 minutes. That's why I'm
46:49 speaking fast. Make sure to join the New
46:50 Society. The link to the New Society
46:53 landing page will be below the video.
46:55 With that being said, thank you guys for
46:56 watching and have a wonderful,
46:58 productive week. See you.
