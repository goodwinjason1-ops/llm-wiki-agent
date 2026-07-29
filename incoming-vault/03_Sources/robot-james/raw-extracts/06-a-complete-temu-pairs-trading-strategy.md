---
title: Robot James Raw Extract - 06-a-complete-temu-pairs-trading-strategy
created: 2026-07-11
updated: 2026-07-11
type: raw-web-extract
status: evidence-only
tags: [robot-james, raw-extract]
confidence: source-limited
---

# Raw web extract — 06-a-complete-temu-pairs-trading-strategy

Source: https://robotjames.substack.com/p/a-complete-temu-pairs-trading-strategy

[![rj's trading for dickheads](https://substackcdn.com/image/fetch/$s_!72xe!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdc6f1b70-0145-4e4e-9fe9-d33f65930647_340x340.png)](https://robotjames.substack.com/)

# [rj's trading for dickheads](https://robotjames.substack.com/)

SubscribeSign in

# a complete "temu" pairs trading strategy in crypto

### sometimes you really can keep it simple

[![robot james's avatar](https://substackcdn.com/image/fetch/$s_!64tg!,w_36,h_36,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe3e808a-4c78-431e-a4bc-92d71c8d0289_522x522.jpeg)](https://substack.com/@robotjames)

[robot james](https://substack.com/@robotjames)

Dec 17, 2025

∙ Paid

47

6

3

Share

hi friend,

in my last post i wrote about pairs trading.

one of the lessons is that **very simple pairs trading can work if you can find the right kind of inefficient market to play in.**

. . .

crypto is a young, fragmented, inefficient market, with easy access to enough leverage to kill yourself.

so it’s a good place to play these simple games.

rj's trading for dickheads is a reader-supported publication. To receive new posts and support my work, consider becoming a free or paid subscriber.

Subscribe

. . .

**today i’m going to show you how to run a portfolio of simple pairs trades in crypto perps.**

[![](https://substackcdn.com/image/fetch/$s_!UWNS!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd1855d67-e480-4051-858c-054551c71fe8_802x791.png)](https://substackcdn.com/image/fetch/$s_!UWNS!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd1855d67-e480-4051-858c-054551c71fe8_802x791.png)

like everything i share, it’s going to be very straightforward.

i’m not going to ask you to do anything cerebral or difficult.

i’m going to show you exactly how i arrived at it.

and exactly how to do the trade.

. . .

i’ll:

- show you the full process

- give you all the tools you need

- provide you a list of pairs to paste straight into tradingview

- give you regular updates


. . .

first, you should read the original post here. this would be very long and boring if i repeat myself!

[![pairs trading for dickheads](https://substackcdn.com/image/fetch/$s_!zgBc!,w_140,h_140,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F816741d6-94d1-418b-8b0c-dc55e4b14563_912x500.jpeg)](https://robotjames.substack.com/p/pairs-trading-for-dickheads)

[**pairs trading for dickheads**](https://robotjames.substack.com/p/pairs-trading-for-dickheads)

[robot james](https://substack.com/profile/7763028-robot-james)

·

December 15, 2025

[Read full story](https://robotjames.substack.com/p/pairs-trading-for-dickheads)

. . .

i know you skimmed it though. so here are the key points again.

. . .

**1/ things that are “basically the same” tend to move in similar ways**

if we track the relative price paths of two assets that are “basically" the same”, they’ll wiggle together like this most of the time.

[![Image](https://substackcdn.com/image/fetch/$s_!VUSX!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ea77b84-b3a4-43a7-a2d7-357d4728964c_679x273.png)](https://substackcdn.com/image/fetch/$s_!VUSX!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ea77b84-b3a4-43a7-a2d7-357d4728964c_679x273.png)

**2/ sometimes the prices of two things that are “basically the same” will diverge.**

[![Image](https://substackcdn.com/image/fetch/$s_!Umm_!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8565c63c-84c5-4dde-9a1b-53752bea6e7e_680x323.png)](https://substackcdn.com/image/fetch/$s_!Umm_!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8565c63c-84c5-4dde-9a1b-53752bea6e7e_680x323.png)

when we are doing a pair trade, we are looking to bet on that converging.

but that’s only the best case scenario.

. . .

there are three main reasons why this divergence might appear, and only one of them is good:

**reason 1 - a technical effect (price-insensitive trading) temporarily distorted the price of one of the assets**

this is easy to understand in crypto.

big forced or price-insensitive trades often make a mess of crypto charts.

things like liquidations, fat fingers, and big lazy twaps will often push price temporarily away from where it would otherwise be.

[![](https://substackcdn.com/image/fetch/$s_!dOiP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F53488a1c-a3ba-403d-b209-389f373f9ddc_1059x440.png)](https://substackcdn.com/image/fetch/$s_!dOiP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F53488a1c-a3ba-403d-b209-389f373f9ddc_1059x440.png)

because this is just a technical effect based on nothing but someone doing some forced or dumb trading, we’d expect this divergence to revert when traders come in to close it.

this is tradeable. like this:

[![](https://substackcdn.com/image/fetch/$s_!VZWm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6fa8fff4-3ff1-43b6-91c3-cf93023923b1_969x465.png)](https://substackcdn.com/image/fetch/$s_!VZWm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6fa8fff4-3ff1-43b6-91c3-cf93023923b1_969x465.png)

**reason 2 - informed trading (or sustained market manipulation)**

the second reason the divergence might have happened is not tradeable.

this is “someone knows something” and means that move you observed in one of the assets is genuine and ain’t gonna revert anytime soon.

[![](https://substackcdn.com/image/fetch/$s_!Z3Aq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F76380d83-9e77-4d5f-995a-3a2770f5baec_452x242.png)](https://substackcdn.com/image/fetch/$s_!Z3Aq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F76380d83-9e77-4d5f-995a-3a2770f5baec_452x242.png)

in grown up markets, it’s usually someone reacting to information and repricing one of the assets higher (or lower) for rational reasons.

in crypto, it can be _“someone is implementing a campaign of price manipulation”._

to you, a wannabe pairs trader, both things look the same.

if you bet on convergence, you’re gonna be wrong.

**reason 3 - your comparison was bad and it looked like a divergence when it wasn’t**

the final reason is that you thought there was a divergence when there wasn’t.

this happens when you are comparing price moves in a naive way.

predictable stuff that you haven’t modelled bites you on the ass, causing false positives that won’t revert.

[![](https://substackcdn.com/image/fetch/$s_!HvpB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcd308edd-ff08-463a-8292-a873f7b2afae_821x653.png)](https://substackcdn.com/image/fetch/$s_!HvpB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcd308edd-ff08-463a-8292-a873f7b2afae_821x653.png)

. . .

when we look to do pairs trades, we want to find pairs of assets where divergences are:

1. easily identified with a simple model _(so we can minimize “reason 3 - bad model” errors, even if we keep it simple stupid)_

2. more likely to be caused by _“reason 1 - technical effect that reverts”_ than _“reason 2 - informed trading or crime”_


this mostly comes down to:

1. picking two things that are “basically the same”

2. picking boring ass names: _dinosaur coins and “serious” (sic) projects_


. . .

let’s run through a crypto pairs trading strategy.

we’ll cover:

1. **universe selection**

1. **vibes-based brainstorming**

2. **eyefecking relationships and spreads**

3. **finger-in-air simulation**

4. **selecting a trading universe**

      1. practical considerations

      2. pair candidate exclusion

      3. portfolio considerations
2. **designing the trading process.**

3. **trading it live.**


. . .

## 1) Universe Selection

**by far the most important thing with a simple “temu” pair trading model, is pair selection.**

either a pair of assets is gonna noisily diverge and converge in a tradeable way, or it ain’t.

**no amount of math smarts or execution skill is gonna make an effect appear that don’t exist.**

we can do “universe selection” in a quantified systematic way. i do that in the models i built for hypertrend.xyz

or we can do it by vibes and by eyefucking spreads and backtests.

that’s what we’re going to do here today. then we’ll build on it together to create smarter solutions in the future.

slow and careful, always.

. . .

## 1a) vibes based brainstorming

[![](https://substackcdn.com/image/fetch/$s_!2hgE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa01b4254-1c24-491c-b842-d12e30dadf4e_803x806.png)](https://substackcdn.com/image/fetch/$s_!2hgE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa01b4254-1c24-491c-b842-d12e30dadf4e_803x806.png)

our first mission is to come up with some places or themes in which you might find pairs of assets that are:

- very similar (reducing _“reason 3 - shit model”_ errors)

- boring (reducing _“reason 2 - informed trading and crime”_ errors)


. . .

if you’re struggling to think of things, ask a friend, or ask the AI, or go on one of those websites that categorizes coins into “sectors”.

. . .

remember...

we are trying to _**minimize**_:

- reason 2 - informed trading, insider flows and crime

- reason 3 - false divergences from comparing unlike assets in a naive way


and we are trying to _**maximize**_:

- “basically the same thing”-ness

- boring, dinosaur-ish, slow-moving fundamentals

- high liquidity & stable markets

- perp support on major exchanges.


. . .

i came up with these themes. . .

. . .

## This post is for paid subscribers

[Subscribe](https://robotjames.substack.com/subscribe?simple=true&next=https%3A%2F%2Frobotjames.substack.com%2Fp%2Fa-complete-temu-pairs-trading-strategy&utm_source=paywall&utm_medium=web&utm_content=181706230)

[Already a paid subscriber? **Sign in**](https://substack.com/sign-in?redirect=%2Fp%2Fa-complete-temu-pairs-trading-strategy&for_pub=robotjames&change_user=false)
