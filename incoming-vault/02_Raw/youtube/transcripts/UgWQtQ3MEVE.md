---
title: YouTube Transcript - Claude + IBKR API: Complete AI Trading Bot Guide
created: 2026-07-08
updated: 2026-07-08
type: raw-source
tags: [youtube, transcript, cap6b]
source_url: https://youtu.be/UgWQtQ3MEVE
sha256: 5fa2752103a94b48a36de58a68dd163f5e135a93cb27753f619f97a5fc4db4e8
---

# YouTube Transcript - Claude + IBKR API: Complete AI Trading Bot Guide

- Video ID: `UgWQtQ3MEVE`
- URL: https://youtu.be/UgWQtQ3MEVE
- Channel: Humbled Trader
- Capture: cap6b
- Intent: Claude trading bot idea; decide if implement/incorporate into AI quant
- sha256: `5fa2752103a94b48a36de58a68dd163f5e135a93cb27753f619f97a5fc4db4e8`

## Transcript

[00:00] Imagine this. Every morning you wake up,
[00:02] your AI trading bot has already scanned
[00:05] the market and send you a list of
[00:07] gappers that fit your strategy. After
[00:09] the market opens, it triggers buy and
[00:12] sell orders for you autonomously. And it
[00:15] continues to run the cycle every 30
[00:17] minutes through all the trading day.
[00:20] This is the power of connecting
[00:21] Interactive Brokers API with Cloud Code.
[00:24] And I'll show you how to do that in this
[00:26] video. So, this is what you're going to
[00:28] learn. How to set up a broker API and
[00:31] connect Cloud Code to it safely. How to
[00:34] create your strategy with the help of
[00:36] AI. The full pipeline I've built from
[00:39] universe scan, decision loop,
[00:41] executions, and exit logic. And finally,
[00:44] setting up Telegram alerts like this, so
[00:47] you get notifications every 30 minutes
[00:50] from your bot. Last but not least, we're
[00:52] also going to build a dashboard [music]
[00:54] that tracks the R multiples per trade.
[00:56] In my last video, I showed you how I use
[00:59] Cloud and TradingView together to build
[01:02] a pre-market trade planning process with
[01:04] a high win rate and backtested strategy.
[01:07] But the one thing that TradingView and
[01:09] Cloud connection couldn't do was
[01:11] actually pull the trigger to buy and
[01:14] sell. So, in this video, I'm going to
[01:16] show you how to go from a backtested
[01:18] strategy to an actual trading bot that
[01:21] places its own orders, manages all the
[01:23] stops, takes partials, trails the
[01:26] winners, and force closes everything
[01:29] before the market closes. All of this
[01:31] pipeline is running on my computer with
[01:33] Interactive Brokers API and Cloud,
[01:35] [music]
[01:36] and I'm completely hands-off. I want to
[01:38] give you the same disclaimer as last
[01:40] time. AI is simply a multiplier. You
[01:43] still need to know how to trade first.
[01:46] I'm not a developer. I have no
[01:47] background in coding, but I am a trader.
[01:50] >> [music]
[01:50] >> So, if I can do this, then so can you.
[01:53] So, buckle up. Make sure to like this
[01:55] video and subscribe down below to see
[01:57] more step-by-step video lessons on using
[02:00] AI to optimize your trading. Okay, let's
[02:03] get started with setting up Interactive
[02:05] Brokers API. There's three things you
[02:08] need to install. I'll keep this one
[02:10] really short. The full steps and the
[02:12] details are on my blog. You can use that
[02:14] article as a video companion to follow
[02:16] along here and copy all the prompts from
[02:19] that blog. The link is down below.
[02:21] Before we do anything with Claude and
[02:23] AI, you need to have these things to
[02:25] have installed on your computer. First
[02:27] is Trader Workstation TWS, which is
[02:30] Interactive Brokers trading platform.
[02:32] And you also need Python. Again, no
[02:35] coding experience is necessary here
[02:37] because we have Claude. So, I already
[02:39] have Python installed and I'm just going
[02:41] to start running my Interactive Brokers.
[02:43] I'm going to be using a paper trading
[02:45] account on TWS because we're not putting
[02:48] in real money on this yet until it runs
[02:51] clean for weeks. So, I'm going to log in
[02:53] to my paper trading account. Uh make
[02:55] sure you go through the process. You can
[02:57] download TWS on the Interactive Brokers
[03:00] website. I'll leave the link down below.
[03:03] And you can open up a free paper trading
[03:04] account even if you had don't have
[03:07] market data subscription.
[03:09] All right, we're in. You can see now
[03:10] we're in the Interactive Brokers TWS
[03:12] platform. I've done video lessons and
[03:15] tutorials on how to optimizing and make
[03:18] it look prettier. I tried my best, but
[03:21] it still looks like this. I know. So,
[03:22] what you want to do is to set up the API
[03:24] access. Go to file up here and go to
[03:28] global configuration.
[03:30] And once you're in here, you want to go
[03:31] to API, go to settings, and you want to
[03:35] enable ActiveX and socket clients.
[03:39] And over here, the next part is you want
[03:41] to make sure the socket port here is
[03:43] labeled as 7497.
[03:46] This is the paper port. If you're
[03:48] changing this up to a live account
[03:50] later, you just need to change a number
[03:52] to 7496.
[03:55] Next, scroll all the way down, um
[03:57] uncheck that, and create a trusted IP.
[04:01] You want to add 127001
[04:04] to the trusted IPs. I've already done
[04:07] this one, so I'm just redoing this again
[04:09] with a new paper trading account for
[04:11] this demo. So, once you have that ready,
[04:13] you want to click apply, but I want to
[04:14] check one thing. One more thing, up here
[04:16] on the general, you want to check off
[04:18] read-only API because you want the API
[04:21] to actually be able to
[04:22] execute trades for you. So, make sure
[04:25] you have these things enabled and the
[04:27] trusted IP, and you want to click apply
[04:30] and
[04:32] and okay and okay.
[04:34] Okay, and after that, you don't really
[04:36] need your TWS anymore, so I'm going to
[04:39] minimize it. Another thing you want to
[04:40] make sure you have is you need to have
[04:42] Python tools installed on your PC. I
[04:45] already have Python installed. If you
[04:46] don't, just download Python 3.12
[04:50] or newer, Claude or Codex can walk you
[04:53] through that easily. And oh, and I
[04:54] forgot to mention you obviously also
[04:56] need either Claude or Codex on desktop.
[05:00] Um so, if you don't, make sure you go to
[05:01] their website and at least get the I
[05:03] think the $20 per month minimum max
[05:07] plan, the paid subscription, um then
[05:09] that should be enough to get you
[05:10] started.
[05:12] So, after we're done with TWS and
[05:13] Python, we want to create a new
[05:15] environment for us to work in. So, I'm
[05:17] just going to copy this prompt um from
[05:20] my blog here. So, next we want to start
[05:22] a fresh project um in Claude. You can
[05:25] see I named this one Interactive Brokers
[05:27] Claude demo. So, I want to make sure
[05:29] that Claude can now talk to Interactive
[05:32] Brokers. I'm working on connecting
[05:35] Interactive Brokers
[05:37] Python and Claude together.
[05:41] I have an Interactive Brokers paper
[05:42] trading account in global configuration
[05:45] setup already.
[05:47] Can you walk me through the connection
[05:50] process?
[05:55] Okay, so you can see that Claude is
[05:57] walking me through the process. Um, do
[05:59] you want to place order placement label
[06:01] or read only? We want to do full
[06:03] trading, which is with paper.
[06:07] So now I think about it, you can start
[06:09] at the very beginning of the video just
[06:10] asking Claude to walk you through as
[06:13] well.
[06:14] And really important, I'd like to use
[06:16] auto mode
[06:18] because, you know, it allows Claude to
[06:20] kind of proceed without asking all the
[06:23] permissions. I hate that. But obviously,
[06:25] if you're more careful, you can use ask
[06:27] permissions, but you just got to be here
[06:29] and you'll have questions for you like
[06:31] every 10 seconds. I've been doing it
[06:33] doing a lot of projects and tasks on
[06:35] Claude, so that's why I'm comfortable
[06:37] using the auto mode.
[06:40] As you can see, Claude just did a whole
[06:41] connection pipe for us with Python and
[06:45] Interactive Brokers. Now we can test the
[06:47] connections.
[06:49] Like I mentioned at the beginning of the
[06:51] video, AI won't magically make you
[06:53] profitable. Claude can help you build
[06:55] scanners, analyze news, and even
[06:58] automate parts of your trading process.
[07:00] But if the underlying strategy has no
[07:02] edge, the bot will only help you lose
[07:05] money faster and more consistently. At
[07:08] the end of the day, the edge is still in
[07:10] your strategy and in your ability to
[07:12] identify opportunities in the market.
[07:15] For the momentum day trading strategies
[07:17] I personally trade, I tend to focus on
[07:19] sectors showing outsized relative
[07:22] strength. And this year, one of the
[07:24] biggest themes has been semiconductors
[07:27] and all the companies powering the AI
[07:29] boom. If your strategy also rides
[07:31] momentum in that sector, BetaPro offers
[07:34] a 3x leveraged semiconductor bull ETF
[07:38] that can potentially provide amplified
[07:39] exposure to the semiconductor market
[07:42] movements. On the other hand, if the
[07:44] strength fades and the sector turns
[07:47] bearish, there are also inverse
[07:49] semiconductor ETFs designed to provide
[07:52] inverse exposure to declines in the
[07:54] sector. Just remember, leveraged ETFs
[07:57] are trading tools, not investing
[07:59] products. They reset daily and in
[08:01] volatile markets, losses can add up just
[08:04] as fast. They're built for daily
[08:06] short-term trading and aren't typically
[08:08] meant to be held long-term. Make sure
[08:10] you understand the risks before trading
[08:12] leverage products. You can learn more
[08:14] about BetaShares lineup of leveraged
[08:16] ETFs using the link down below. Now,
[08:19] let's get back to building the trading
[08:20] bot with the help of AI.
[08:27] As you can see, Claude just did a whole
[08:29] connection pipe for us um with Python
[08:32] and Interactive Brokers. Now, we can
[08:34] test the connections.
[08:36] Now, I'm going to ask you some
[08:37] questions.
[08:40] Tell me if I have any open positions in
[08:42] this paper trading account
[08:45] on Interactive Brokers TWS.
[08:49] And also give me my buying power.
[08:55] All right, let's see if it can.
[08:58] This is how you test the connections.
[09:01] Oh, wow. Okay. So, you can see the
[09:03] snapshot for my paper account. There's a
[09:06] million in paper money.
[09:08] Um you know, the pro tip, don't start
[09:10] paper trading with a million. I would
[09:12] reset this to like 10,000 or something.
[09:15] Uh I just It's like I said, it's a brand
[09:16] new paper trading account I just set up
[09:18] yesterday, so I did I forgot to do that.
[09:21] Next, let's see. So, you can see in this
[09:23] that's This is the account
[09:26] that's pulling.
[09:28] Um let's see what else can it do.
[09:30] So, this is the account that is pulling
[09:32] a data from. You can see um the cash is,
[09:35] you know, the paper trading cash is a
[09:37] million.
[09:39] That's great. Let's see if we can try to
[09:41] place an order for us.
[09:44] Can you place a buy order on Nvidia with
[09:48] a limit price of $100?
[09:54] I want to buy just one share.
[09:59] All right. So, let's test the connection
[10:02] if and see if Claude can now place the
[10:05] order for us.
[10:06] So, this is the first paper trade I'm
[10:09] placing on Interactive Brokers TWS here.
[10:12] So, you can see there's a pop-up for
[10:14] simulated trading. You can enable API
[10:16] orders. There's a precautions. This
[10:19] basically just telling you that you are
[10:21] placing trades via an API, which yes,
[10:23] that's what we're doing. So, I'm going
[10:24] to click yes.
[10:26] So, you can see they just tried or
[10:29] Claude just tried to buy one share
[10:32] of, you know, quantity right here if you
[10:34] zoom in. Quantity one share of Nvidia
[10:36] with a limit price of $100. So,
[10:38] obviously that's not going to get
[10:39] filled, but you can see now the
[10:40] connection is working because Nvidia's
[10:43] trading at $219 right now. But, that's
[10:45] just a test.
[10:47] Okay.
[10:48] >> Order cancelled.
[10:49] >> So, I just cancelled the order. Now, we
[10:51] can move on to part two, building the
[10:53] Interactive Brokers API bot. And we're
[10:56] going to start with building the
[10:57] strategy. In the previous video, we
[11:00] already have a backtested strategy from
[11:02] TradingView and Claude. And these were
[11:04] the results on the last video. You can
[11:06] see this is pretty good. Profitable 64%
[11:09] of the time. Profit factor is 2.48.
[11:13] And the max drawdown is 7%. Total P&L is
[11:17] 12%. And you can see the list of trades.
[11:21] Um you can see the entire detail
[11:23] actually in the last video. So, this is
[11:25] a simple um trend join long setup that
[11:27] we created in the last video using
[11:30] Claude and TradingView to do the back
[11:32] test and creating the Pine Script
[11:35] strategy over here. So, what what we're
[11:38] going to do now is to turn this exact
[11:41] trading strategy, the Trend Join Long
[11:43] setup, into one that can be read by the
[11:45] new Interactive Brokers API bot. So, the
[11:48] bot is going to read all the rules, all
[11:50] the entry and exit criteria that we
[11:52] created here, and it's going to run it
[11:55] on every single cycle, and we're going
[11:57] to build that right now. So, what we'll
[11:59] need to do now is to create a strategy
[12:01] rules file called rules.json, and we can
[12:05] ask Claude to do that for us.
[12:08] Hey Claude, build me a rules.json file
[12:13] for the trading bot. The strategy name
[12:15] is Trend Join Long. This is a long-only
[12:18] strategy. Um it's going to be traded on
[12:21] the 5-minute chart, and here are the
[12:23] daily filters. The stock needs to be
[12:26] above the previous day's high. The
[12:28] previous day's close also needs to close
[12:31] above the 200-day.
[12:34] Here's the exit criteria. The initial
[12:36] stop is 1% below the low of day. Partial
[12:40] take profit is at 0.75R.
[12:44] Then you set the break-even at 1R. Then
[12:47] trail under the 5-minute swing lows.
[12:50] Here is the risk. 1% account size per
[12:54] trade. Maximum 10% position size of the
[12:58] entire account. So, I know that was a
[13:00] long prompt, but you can just go to him
[13:02] on my blog [clears throat] again and
[13:03] just go to the strategy file here. You
[13:06] can see I listed all the daily filters
[13:08] here. You can just copy this here. You
[13:10] can just copy the prompt, so it'll be a
[13:12] lot less work for you. So, let me see if
[13:14] everything's correct. I'm just going to
[13:15] clean this up really quick.
[13:18] So, we're inputting the prompt into uh
[13:22] Claude right now to build that
[13:23] rules.json file.
[13:25] So, you can see Claude is working its
[13:27] magic right now.
[13:30] This is amazing. So, you can see it
[13:32] created the file um strategy name long
[13:36] only index. So, one thing I forgot to
[13:38] mention is that when did the strategy
[13:40] demo and the backtesting in the previous
[13:42] video, I only did it on the S&P 500
[13:45] stocks just to keep it simple.
[13:47] But, obviously when I trade day-to-day,
[13:50] the trend joining long setup, I'll trade
[13:52] it on all the stocks over a billion
[13:54] market cap and over $3 per share. So,
[13:57] just a caveat here. You can add any
[14:00] stock universe that you want. Before we
[14:02] move on, just a reminder that if you're
[14:04] enjoying step-by-step videos like this
[14:07] that are really easy to follow along,
[14:09] then make sure to drop a like down below
[14:11] and subscribe if you want to see more
[14:13] like this. Now that we have the strategy
[14:15] file ready, next we need to build a
[14:17] settings file that tells the bot our
[14:20] Interactive Brokers port, position
[14:22] limit, account information, um and
[14:25] Telegram tokens for later. This is
[14:27] really boring, but necessary. So, what
[14:29] I'm going to just going to do here is to
[14:31] go to my blog and copy the prompt here
[14:35] and then going back to Cloud and paste.
[14:38] So, what this prompt does is that it
[14:40] builds the bot that actually talks to
[14:42] Interactive Brokers, reads the rules,
[14:44] and decides if we should trade. And also
[14:47] orchestrates everything and places the
[14:49] orders on the back end.
[14:52] And the connection and everything is all
[14:54] firing correctly. That's what we want to
[14:56] see. Okay, amazing. Like this is so much
[14:59] easier than our last video with
[15:01] TradingView connection to Cloud.
[15:04] So, what we just did is we set up
[15:06] Interactive Brokers API and Cloud
[15:08] connection. We also built the trading
[15:11] bot with our backtested strategy. Now,
[15:14] we can actually have Cloud take the
[15:16] trades for us. So, what's next is the
[15:18] fun part. We're going to build out the
[15:20] rest of the trading pipeline and create
[15:22] a brain for the spot. So, now the bot
[15:25] will have a way to scan the market for
[15:27] you for all the potential stocks that
[15:29] fit your strategy. It'll filter through
[15:32] the gappers and repeats this process
[15:34] every 30 minutes. And if there are
[15:37] potential trades to take every 30
[15:39] minutes, it'll pull the trigger and
[15:41] execute on the entries and exits. So,
[15:43] we're going to identify the kind of
[15:45] stocks we want to trade. For the trend
[15:47] following long strategy specifically,
[15:49] like I mentioned earlier, I want to
[15:51] trade bigger cap stocks. So, for this
[15:54] demo, we're going to limit the stock
[15:55] universe to all the stocks in the S&P
[15:58] 500.
[15:59] Hey Claude, create a Python list called
[16:02] um SP500_tickers
[16:07] and putting all the stocks, all the
[16:09] tickers from the current S&P 500
[16:12] listings in there.
[16:15] Okay, great. You can see Claude created
[16:17] the list for us of all the stocks in our
[16:20] universe that the bot is going to trade.
[16:22] But now you need to give that bot a
[16:24] filter. So, to create the filter, I'm
[16:26] going to enter this prompt here. What
[16:29] this prompt does is to further narrow
[16:31] down the list of the 500 tickers. So,
[16:34] what we're filtering for top 20 stocks
[16:37] that gapped up more than 3% on the day.
[16:40] Remember, that's the criteria for this
[16:42] trend following long strategy.
[16:46] So, you can see Claude is working its
[16:48] magic. You can see I asked me earlier to
[16:50] move the 500 tickers list we created to
[16:53] somewhere else. So, I said yes, and now
[16:56] it's working in the background. Okay, so
[16:58] now it created a morning pre-filter.
[17:00] Let's see what that filter looks like.
[17:02] Okay, that's what it looks like.
[17:05] So, you can see now it created a morning
[17:07] pre-filter based on the criteria we just
[17:09] told it. Um the top 20 stocks that's
[17:11] gapped up uh more than 3% on the day. We
[17:15] can run a test. You can see it's asking
[17:17] it run a test. So, I'm just going to do
[17:19] that. So, okay. So, let's run the test
[17:22] to see the pre-filter stocks that spits
[17:24] out.
[17:26] All right. Amazing. You can see Claude
[17:28] is doing all the hard work for us right
[17:31] now. Okay. So, here's the summary. They
[17:33] screened the 503 tickers from the S&P
[17:36] 500 in 14 seconds and gave us the top 20
[17:40] stocks um that have gapped up above 3%.
[17:43] So, here are the results. Over here, you
[17:45] can see it listed it out. Uh and by the
[17:48] way, this is a list that we're going to
[17:50] wire through to our Telegram
[17:52] notifications later on. So, I want to
[17:55] see this list of the pre-filtered stocks
[17:58] every 30 minutes. So, I'll show you how
[18:00] to set that up later as well.
[18:03] So, this is pretty cool. You can see it
[18:04] also gave us some um observations.
[18:07] Heavy semiconductor and um memory stocks
[18:11] today, which is the case today. Today,
[18:13] all the all those stocks are flying to
[18:15] the moon. Speaking of watchlists, I send
[18:18] out a free weekend watchlist every
[18:20] single Sunday, which include three to
[18:22] four stocks I'm watching for the week
[18:24] for day trading and swing trading. You
[18:26] can sign up for free with the link down
[18:28] below. Okay. So, now that we have the
[18:30] API bot, the strategy, the scanner,
[18:33] everything in place, we just need to
[18:35] automate it and set up the alerts. Let's
[18:38] set up the brain cycle now. This is the
[18:41] key to automating the entire trading bot
[18:43] cycle every single day. And this is a
[18:46] prompt I'm going to use. So, I'm going
[18:48] to copy
[18:50] and paste.
[18:51] So, what this is doing that it's asking
[18:53] Claude to set up the cycle of scanning
[18:55] and taking the the order entries every
[18:59] 30 minutes during the market hours. You
[19:01] can change this to 5 minutes if you
[19:03] want. Um but for trend during long, I
[19:05] think 30 minutes is fine. So, you can
[19:07] see we missed a step earlier. We need to
[19:09] create the watchlist file. Um and this
[19:11] is the file that's updated every 30
[19:14] minutes. So, Claude is going to do that
[19:15] for us.
[19:20] All right. So, that took about a couple
[19:22] minutes. Not bad, not bad. So, this is
[19:25] the cycle that's created. So, you can
[19:27] read through this over here.
[19:30] Uh, all different cycles and timing on
[19:32] with Eastern time and what it created
[19:36] with all the files and the project tree.
[19:38] Um, I just want to say that I have no
[19:40] coding or tech background. So, as long
[19:43] as it's doing what I told asked it to
[19:45] do, which is I'm the trader, I created a
[19:48] strategy, I gave it to Claude, um, and
[19:51] with API and Python it wrote me this
[19:53] cycle. As long as it's executing the
[19:55] trades and running the cycles and
[19:57] scanners like I asked it to do, then
[19:59] it's perfect. Like I already said, I
[20:01] came here with no technical background.
[20:04] Next, let's move on to Telegram alerts
[20:06] like the ones I showed you on screen
[20:08] earlier. As part of automation, I want
[20:10] to set that these alerts to be sent to
[20:12] my phone. So, you're notified during the
[20:14] scanning process every 30 minutes. When
[20:17] a bot takes a trade, you are notified as
[20:19] well or even when it gets out or take,
[20:22] you know, losses or profit. And I also
[20:25] wanted to create an end of the day
[20:26] summary. This can be done easily with
[20:29] Telegram notifications. I showed you the
[20:31] step-by-step process in the last
[20:33] TradingView video, so you can check out
[20:36] the full breakdown if you need more
[20:37] details. But for this demo, I just want
[20:40] to set up this prompt.
[20:45] All right. So, it looks done. Let's do a
[20:47] test right now.
[20:53] Okay. So, you can see that it sent some
[20:57] examples cleanly on our Telegram. You
[21:00] can see the pre-market filters, the
[21:01] pre-filters sent at 9:32
[21:05] um, a.m. You can see the top 20 list of
[21:07] stocks. You can see some examples of a
[21:11] buying a stock, selling a stock,
[21:13] partials, trailing stops. And uh it
[21:16] doesn't have a good example of the end
[21:17] of the day summary, but you can see
[21:20] Claude is explaining how you don't have
[21:22] a real P&L summary right now. But, if it
[21:25] does take some trades, it's supposed to
[21:27] look like this.
[21:29] I'm not going to lie, building this
[21:31] automated trading system hasn't been the
[21:33] simplest thing. Well, yes, the strategy
[21:36] was already backtested on TradingView to
[21:39] be really high win rate and really
[21:41] profitable. Once it's transported to
[21:44] Interactive Brokers API for actual
[21:47] executions, the results are just very
[21:50] meh. This is a dashboard I asked Claude
[21:53] to build. You can do the same as well.
[21:55] Just use the prompt on my website. I
[21:57] think there are many reasons why there's
[21:59] a huge discrepancy between the two
[22:02] trading performance. The backtest was
[22:04] limited. We ran an unlimited number of
[22:07] tickers with limited timeframe on
[22:09] TradingView. Second is, I haven't quite
[22:12] figured out how to translate all the
[22:13] executions I do manually as a human to
[22:17] be 100% defined as a code with
[22:20] indicators and all the technical
[22:22] parameters. That's the part I'm still
[22:24] testing out, and I'll make future video
[22:27] updates on this. The honest result so
[22:29] far, the backtested numbers don't
[22:32] perfectly translate to live execution.
[22:35] Right now, my own performance as an
[22:37] actual human being trading a trend join
[22:39] long setup is still much better than any
[22:42] of these bots um automations. But, I do
[22:46] think this TradingView and Interactive
[22:48] Brokers API system is a solid starting
[22:51] point. So, I'm going to keep working on
[22:53] this. It's not finished yet. So, make
[22:56] sure to follow along because I'm going
[22:57] to make a lot more videos on how I'm
[23:00] optimizing my strategy, performance, and
[23:03] trading executions with AI, cloud, and
[23:07] all the tools out there. Special thanks
[23:09] to BetaPro ETFs for sponsoring this
[23:11] video. Make sure to check out their
[23:13] leverage ETF products with a link down
[23:15] below. If you haven't seen the video on
[23:18] how I'm using cloud and TradingView to
[23:20] backtest my strategies and create a
[23:22] premarket scanner, then you should check
[23:24] out this video over here.
