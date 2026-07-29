---
title: Robot James Raw Extract - 05-pairs-trading-for-dickheads
created: 2026-07-11
updated: 2026-07-11
type: raw-web-extract
status: evidence-only
tags: [robot-james, raw-extract]
confidence: source-limited
---

# Raw web extract — 05-pairs-trading-for-dickheads

Source: https://robotjames.substack.com/p/pairs-trading-for-dickheads

[![rj's trading for dickheads](https://substackcdn.com/image/fetch/$s_!72xe!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdc6f1b70-0145-4e4e-9fe9-d33f65930647_340x340.png)](https://robotjames.substack.com/)

# [rj's trading for dickheads](https://robotjames.substack.com/)

SubscribeSign in

![User's avatar](https://substackcdn.com/image/fetch/$s_!64tg!,w_64,h_64,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe3e808a-4c78-431e-a4bc-92d71c8d0289_522x522.jpeg)

Discover more from rj's trading for dickheads

simple, practical, idiot-proof trading stuff that makes money

Over 5,000 subscribers

Subscribe

By subscribing, you agree Substack's [Terms of Use](https://substack.com/tos), and acknowledge its [Information Collection Notice](https://substack.com/ccpa#personal-data-collected) and [Privacy Policy](https://substack.com/privacy).

Already have an account? Sign in

# pairs trading for dickheads

### oh god, not this again

[![robot james's avatar](https://substackcdn.com/image/fetch/$s_!64tg!,w_36,h_36,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe3e808a-4c78-431e-a4bc-92d71c8d0289_522x522.jpeg)](https://substack.com/@robotjames)

[robot james](https://substack.com/@robotjames)

Dec 15, 2025

184

3

11

Share

good day

i changed the name of this blog to “trading for dickheads” cos that seemed more appropriate.

rj's trading for dickheads is a reader-supported publication. To receive new posts and support my work, consider becoming a free or paid subscriber.

Subscribe

on that note, here are some words and pictures about pairs trading. . .

. . .

when an online “kwant trader” starts writing about pairs trading i usually want to stab myself in the dick.

[![](https://substackcdn.com/image/fetch/$s_!zgBc!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F816741d6-94d1-418b-8b0c-dc55e4b14563_912x500.jpeg)](https://substackcdn.com/image/fetch/$s_!zgBc!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F816741d6-94d1-418b-8b0c-dc55e4b14563_912x500.jpeg)

but, since i am both an enormous hypocrite and a better writer than the rest of you, i am going to talk about pairs trading today.

i’m going to tell you what pairs trading is.

and why and when it works.

and why and when it doesn’t work.

we’re going to run through a simple example. and i’m going to give you everything you need to trade it yourself, with nothing more than tradingview and a pair of hands.

[![](https://substackcdn.com/image/fetch/$s_!mF8V!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F31333db9-e2ea-4b9c-a26c-b7e449c8f9a0_924x1023.png)](https://substackcdn.com/image/fetch/$s_!mF8V!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F31333db9-e2ea-4b9c-a26c-b7e449c8f9a0_924x1023.png)

actually, one hand would be fine.

. . .

from my perspective, this is all a ruse to make a meta point.

which is this . .

if you are going to infer statistical stuff from time series observations, you still have to think about what the hell is happening in the activity that generated those observations: people buying and selling stuff in the market.

**doing some math doesn’t let you off the hook from thinking carefully about market cause and effect.**

. . .

my irritation with most online writing about trading, is that it tends to focus on tools and techniques, rather than the **underlying effect** a trader should be trying to capture.

market prices are not inefficient because of regressions and cointegration and unit root tests and shit.

**market prices can be inefficient because the idiots and pussies and sharps that, in combination, make up “the market” tend to behave in predictably (or observably) sub-optimal ways.**

at least some of the time...

. . .

the basic idea behind pairs trading is that **things that are basically the same will tend to move in similar ways.**

and we can make money, on average, by betting on convergence between them when they diverge.

consider two stocks like visa (V) and mastercard (MA).

i know jack about the credit card industry, but these companies basically do the same thing, right?

regular news and changes in general market sentiment are likely to impact the price of these stocks in a similar way.

they’ll have similar sensitivities to news that affects the general economic outlook, news that affects the financial sector, news that affects the credit card industry _(whatever tf that might be.)_

so the core idea for a trade is simple.

we track the relative price paths of the visa and mastercard. and, most of the time, we expect these paths to wiggle noisily together.

[![](https://substackcdn.com/image/fetch/$s_!pZpe!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc39169f6-8c6f-419e-995f-033515a2e8cd_749x301.png)](https://substackcdn.com/image/fetch/$s_!pZpe!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc39169f6-8c6f-419e-995f-033515a2e8cd_749x301.png)

we would sit on our hands when they do that. there’s no trade without some kind of divergence.

sometimes, tho, they’re gonna diverge from one another. and that might make us excited.

[![](https://substackcdn.com/image/fetch/$s_!WdQE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0ba8ae4e-ba7e-4890-bbdb-9647c5d3c4f4_831x395.png)](https://substackcdn.com/image/fetch/$s_!WdQE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0ba8ae4e-ba7e-4890-bbdb-9647c5d3c4f4_831x395.png)

_**but we should think about why this divergence might happen.**_

. . .

three main reasons, really:

1. some **technical effect** pushed the price of one of the stocks temporarily away from where it would otherwise be, or...

2. some company-specific information leads to **informed trading**, causing a genuine re-pricing between the two stocks, or . .

3. some observable **factor you haven’t taken into account** caused this to _look like_ a divergence, but actually the way you did the comparison was just shitty


. . .

the **first reason (technical effect)** looks like this.

an imbalance of supply and demand _(usually caused by big price-insensitive trades, like forced unwinds or large rebalances)_ pushes price temporarily away from where it would be if that hadn’t happened.

[![](https://substackcdn.com/image/fetch/$s_!dOiP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F53488a1c-a3ba-403d-b209-389f373f9ddc_1059x440.png)](https://substackcdn.com/image/fetch/$s_!dOiP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F53488a1c-a3ba-403d-b209-389f373f9ddc_1059x440.png)

because this is simply a technical effect, based on no real important information, **this divergence will tend to revert** as traders (like you) come in and sell it, closing the gap.

the **divergence is observable**, by comparing the move to the other asset’s move.

the **convergence is tradeable**, by stepping in to sell the stock that got too rich (and buy the other stock against it.)

this **convergence** is what you are hoping to capture when you do a pair trade.

[![](https://substackcdn.com/image/fetch/$s_!VZWm!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6fa8fff4-3ff1-43b6-91c3-cf93023923b1_969x465.png)](https://substackcdn.com/image/fetch/$s_!VZWm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6fa8fff4-3ff1-43b6-91c3-cf93023923b1_969x465.png)

. . .

the **second** **reason** that divergence might have happened **(informed trading)** is not tradeable.

if new information becomes available about one of the companies _(either public or, ahem, not)_, people will trade on it to make money.

and the price of that stock will get repriced vs the other one. as it should. and we wouldn’t expect it to revert.

[![](https://substackcdn.com/image/fetch/$s_!Z3Aq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F76380d83-9e77-4d5f-995a-3a2770f5baec_452x242.png)](https://substackcdn.com/image/fetch/$s_!Z3Aq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F76380d83-9e77-4d5f-995a-3a2770f5baec_452x242.png)

this is markets doing their efficiency thing.

if mastercard’s prospects suddenly start looking better for some reason, then its stock should start trading at a higher price vs visa (whose prospects have stayed the same).

we don’t expect that to revert. it’s an efficient repricing of new information.

probably.

and, if it’s not, i’m not smart enough to be able to tell.

. . .

the **third reason** that divergence might look like it happened **(bad model)** is also not tradeable, and it looks like this...

_(i’m going to have to lie to make this example simple, cos i’m an idiot who doesn’t know anything about companies and stuff.)_

let’s pretend that visa’s revenue is more sensitive to economic cycles. maybe cos it does more volume tied to discretionary expenditure like travel or whatever.

and let’s pretend it operates higher financial leverage and higher operating leverage than mastercard.

> _idk if any of these things are actually true. i don’t know shit about these companies and i refuse to look it up._

but, if these things _were_ true, then, even though the two companies mostly do the same kind of thing, we would expect visa to be more sensitive to changes in economic expectations and risk appetite than mastercard.

we can proxy “changes and economic expectations and risk appetite” with moves in the s&P500 index.

and we might observe that as visa’s “beta” to the s&p500 seems higher than mastercard’s.

we might run some regressions and discover that, given an x% move in the s&p500 index:

- fake-visa has tended to go up about x% _(beta of 1)_

- fake-mastercard has tended to go up about 0.7x% _(beta of 0.7)_


this means that, if we are just comparing raw price moves between the two stocks, we are making a shitty comparison.

. . .

**we have failed to model something big and obvious that explains relative moves between the assets.**

and we’re going to see a lot of “fake divergences” whenever the index moves a lot. because visa is just going to move more than mastercard, in both directions, whenever anything interesting happens.

[![](https://substackcdn.com/image/fetch/$s_!HvpB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcd308edd-ff08-463a-8292-a873f7b2afae_821x653.png)](https://substackcdn.com/image/fetch/$s_!HvpB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcd308edd-ff08-463a-8292-a873f7b2afae_821x653.png)

when we do a pairs trade, we want to remove any predictable drivers of relative price moves so we can try to isolate reason 1 (technical stuff that is gonna revert.)

we can side step this problem by **“only picking stuff that** _**really**_ _**is**_ **basically the same”.**

alternatively, we can actually do the work to make a better comparison. but that’s harder.

for example, in this case, we might compare the relative returns of the two fake stocks in inverse proportion to their betas.

_(in our fake example world, we’d be comparing fake-visa moves with 1.4x (1/0.7) the fake-mastercard moves. in the real world, our naive comparison would actually kinda be ok, because the betas of real world visa and mastercard are very similar.)_

we might also build a more complicated model which accounts for more of the “risk factors” that drive price. not just market beta.

all this is not a today conversation. let’s move on.

. . .

my key point is that you gotta think about this stuff.

if you’re just treating the price history as some kind of statistical artifact to be studied without context, you’re gonna trip up on all of this stuff, and you’ll have no idea what is actually generating the divergences you are trying to trade.

understanding what is actually going on in the market like this, then allows you to think about how you might construct a basic pair trade.

it also tells you when it’s okay to simplify things.

. . .

a basic pair trade might look like this:

1. you need to **find a pair of assets that are “basically the same”**

1. and you need these assets to be boring enough that most divergences in price moves are likely to be reason 1 (technical effects), rather than reason 2 (informed trading.)
2. you need to **normalize** price moves in both of the assets, so you can actually tell when these divergences occur


1. and you need this to account for the fact that the assets are not, actually, “basically the same”, and that the **relationship between their prices changes** based on new information appearing about their relative prospects.

2. and you also (ideally) need this to account for the fact that the two assets are predictably driven by other risk factors that you can observe.


3. you need to **observe the divergence / convergence pattern** **in the past history of normalized prices** of the two assets _(or be extremely confident there’s good reason for this to occur in the future)_


1. and the divergences need to be **big enough** that you could trade them - given that you’ll be wrong some of the time and it costs you to trade.


4. you need a **repeatable** **trading process** which allows you to observe the divergences as they happen and bet on convergence and puke yourself out if it ain’t happening as you expect.


. . .

the simplest, most naive, “hello world” solutions to these problems might look something like the following

. . .

#### _**solution 1 - find a pair of assets that are “basically the same”**_

pick two boring old dinosaur stocks that operate in the same industry.

real boring old man stuff like real estate investment trusts (reits) is usually good for this.

real estate investment trusts are fairly equally incompetent, operating in an easy industry where they can go out for steak lunches and drink eight to thirteen pints of guiness every tuesday whilst doing a consistently medicore job of shooting fish in a barrel.

so we might pick something like pld and rexr - two reits that invest in logsitics facilities in california.

> _i have no idea about logistics but i’m sure the management all love drinking whiskey and smoking cigars and calling strippers “sweetheart”, so they’re probably “basically the same”._

. . .

#### _**solution 2 - normalize price moves in each of the assets**_

we think these things are “basically the same”. let’s see if they have similar betas to the market.

here i’ve done this in [portfoliovisualizer](https://www.portfoliovisualizer.com/factor-analysis). just whack the tickers in and set the benchmark to be spy.

[![](https://substackcdn.com/image/fetch/$s_!u4Nh!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F77e654ce-24f8-436a-803f-6ea31c977602_1235x802.png)](https://substackcdn.com/image/fetch/$s_!u4Nh!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F77e654ce-24f8-436a-803f-6ea31c977602_1235x802.png)

we see that the long term betas are pretty similar: 0.97 vs 0.93.

similar enough for this simple example that we can pretend they’re basically the same without feeling too bad about it. we want to keep this as simple as it can be, for now.

_so maybe we can get away with taking the simple ratio of the prices of the two assets as a way to quantify the spread between them?_

for example, we might plot this as “PLG/REXR” in tradingview

[![](https://substackcdn.com/image/fetch/$s_!uzX8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd57a35c7-6ca2-410b-8621-6f3b7922401c_1115x773.png)](https://substackcdn.com/image/fetch/$s_!uzX8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd57a35c7-6ca2-410b-8621-6f3b7922401c_1115x773.png)

. . .

#### _**solution 3 - observe the divergence and convergence pattern**_

we know for sure that divergences in this ratio won’t only be caused by the thing we want to trade: reason 1 _(technical effects we expect to revert)_

some divergences will certainly be caused by reason 2 _(informed trading)_ cos we’re going to make no attempt to discern that, other than picking boring securities in a boring industry and hoping it won’t happen much.

and some divergences will certainly be caused by reason 3 _(crappy model)_ because our approach is to assume that moves in the stocks are directly comparable and we know that’s never true.

we can see it’s not true because, when we zoom out, we could hardly say the ratio of prices is stable.

[![](https://substackcdn.com/image/fetch/$s_!C8fJ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32651cb7-7f24-4bd8-bb47-731d512536a7_1130x770.png)](https://substackcdn.com/image/fetch/$s_!C8fJ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32651cb7-7f24-4bd8-bb47-731d512536a7_1130x770.png)

we can’t have an approach that assumes a fixed relationship in that spread cos it obviously ain’t fixed.

we need something adaptive to the fact that the relationship between the assets is not fixed and our model is a bit crappy.

so we might apply bollinger bands to the ratio of the two prices.

[![](https://substackcdn.com/image/fetch/$s_!lULG!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd4665c7b-3165-41b8-b4d0-c1753267c15b_1096x616.png)](https://substackcdn.com/image/fetch/$s_!lULG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd4665c7b-3165-41b8-b4d0-c1753267c15b_1096x616.png)

the bollinger band is useful because it takes into account the fact that the relationship between the two assets is not static, but time varying.

and, because it normalizes against the recent history of the spread, it allows us to allow for the fact that information might emerge leading us to believe that one of these groups of idiots may be less incompetent than the other.

and it’s kinda self-correcting in that it allows for the model we use to create the spread to be bad, to an extent. which is a good thing, cos it is. we bought our spread model off temu.

. . .

let’s plot the bollinger bands in tradingview.

here i’ve used a 20 day lookback for the bollinger band cos that is the tradingview default, and it also seems like a sensible enough default for something you could plausibly trade by hand.

[![](https://substackcdn.com/image/fetch/$s_!YYE1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F367f5c32-3106-42b8-9d47-630c942f254a_1137x772.png)](https://substackcdn.com/image/fetch/$s_!YYE1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F367f5c32-3106-42b8-9d47-630c942f254a_1137x772.png)

by eyeball, we can see that the spread seems to be noisily static and kinda volatile.

when things are moving, the distance between the edge of the band and the middle has been around 5% recently. we want to try to capture some of this.

when things are moving less, that distance can be less than 2%.

[![](https://substackcdn.com/image/fetch/$s_!HOy2!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faa71d575-8245-424e-9210-0bba39de2592_914x634.png)](https://substackcdn.com/image/fetch/$s_!HOy2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faa71d575-8245-424e-9210-0bba39de2592_914x634.png)

if we estimate our costs getting in and out of both legs at about 0.1%, that might give us enough wiggle room to be wrong sometimes.

cos we’re going to be wrong sometimes.

we’ve not put much effort into not being wrong other than picking boring things that are kinda the same!

. . .

this is all fine but, ideally, we want to look at the past and see how often we actually would have been wrong.

one dumb way you can do this is to run a simple backtest on trading mean reversion on the spread.

. . .

i made a tradingview strategy that simulates all this for you. because i love you.

it simulates:

- fading the spread the bar after it pops above or below the 2 standard deviation bollinger band

- closing the position the bar after it crosses the moving average.


this is really the simplest thing you could possibly do.

it’s a crude simulation, but it’ll give you some idea of whether trading the divergence/convergence pattern would have worked in the past.

> _and, having done a bunch of slutty datamining on this shit, i can tell you that that’s a pretty good indicator of whether trading that pattern is likely to make money in the future too._

. . .

so, you want to add an indicator called “rj’s temu pair trade” to your tradingview chart of the ratio of the two prices.

you can find it here: [https://www.tradingview.com/script/bmRZwxAv-rj-temu-pair-trade/](https://www.tradingview.com/script/bmRZwxAv-rj-temu-pair-trade/)

> _i only just published it. so you might need to wait a while for tradingview to approve it or something. idk how any of this works, honestly._

. . .

you can see the signals and trades it makes on the chart. i’ve zoomed into a single long trade so you can see what’s going on.

[![](https://substackcdn.com/image/fetch/$s_!FCOW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffef4343d-38d0-4506-9129-cf6499ddab0a_895x615.png)](https://substackcdn.com/image/fetch/$s_!FCOW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffef4343d-38d0-4506-9129-cf6499ddab0a_895x615.png)

and here’s a short trade, just to make sure you really get it.

[![](https://substackcdn.com/image/fetch/$s_!fw1K!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd7ec68c4-b80d-42c5-a9ad-6e1651f2d238_844x583.png)](https://substackcdn.com/image/fetch/$s_!fw1K!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd7ec68c4-b80d-42c5-a9ad-6e1651f2d238_844x583.png)

the most important thing though, is the actual backtest.

_would trading it in the past, under idealized conditions, have made money?_

[![](https://substackcdn.com/image/fetch/$s_!mF8V!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F31333db9-e2ea-4b9c-a26c-b7e449c8f9a0_924x1023.png)](https://substackcdn.com/image/fetch/$s_!mF8V!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F31333db9-e2ea-4b9c-a26c-b7e449c8f9a0_924x1023.png)

the answer is yes. we’d have made over 100% betting a fixed full stack on this spread on every trade.

78% of your trades would have made money. and the pre-cost sharpe ratio is about 1. which is good for a single pair.

this is a good thing.

it’s not everything, but it’s a good start.

. . .

so far we’ve assumed that we can trade for free.

clearly we can’t do that. so let’s simulate some trading costs. we’ll fudge the tradingview “commission” to be 0.1% trade.

that’s a 0.2% round trip and it might sound way too big but:

1. you have to trade two legs (one long and one short)

2. these are shitty reits

3. you’re probably gonna find some creative way to feck this up when you start

4. i want to show you stuff you could trade with a potato whilst you’re drunk and still make money


so go into the strategy settings and set the commission to 0.1%

[![](https://substackcdn.com/image/fetch/$s_!Sv1h!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fca522a33-4f08-41c1-8dc7-6ea2b77f4874_467x528.png)](https://substackcdn.com/image/fetch/$s_!Sv1h!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fca522a33-4f08-41c1-8dc7-6ea2b77f4874_467x528.png)

you’ll see it survives these costs pretty well. total returns come down to 86% and conservative post-cost sharpe ratio was about 0.8

[![](https://substackcdn.com/image/fetch/$s_!atNd!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F52a219ab-559b-467e-9427-bfbe4b9a92f5_935x1017.png)](https://substackcdn.com/image/fetch/$s_!atNd!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F52a219ab-559b-467e-9427-bfbe4b9a92f5_935x1017.png)

this is all good.

we have a pair trade that makes sense.

we’ve picked two things in a boring old cigar smoking industry where we’ve minimized reduced reason 2 _(informed trading)_ errors, simply because exciting stuff just doesn’t really happen very much.


[... middle omitted — see footer ...]


when you get an alert to open a “long” position in the spread:

- buy $x of pld as a market-on-close order

- short sell $x of rexr as a market-on-close order


when you get an alert to open a “short” position in the spread:

- short sell $x of pld as a market-on-close order

- buy $x of rexr as a market-on-close order


when you get an alert to close the trade:

- close both legs in whatever quantity you are holding


that’s it really.

. . .

> _**can it really be this simple?**_

this very simple approach can still work in shitcap markets (shitcoins, crappy stocks.)

but you don’t just want to trade one pair.

you want to trade a few.

there’s absolutely no guarantee this is gonna make any money on the right hand edge of the chart, whatever the backtest looked like.

and “trading more shit” is the best way to handle this.

in my next post, i’m going to show you exactly how to trade a bunch of pairs in shitcoin perps.

i’ll even give you a nice list of things you might trade and all the tools you need to do it.

. . .

that said, you’ll probably struggle to make this work outside of crypto and shitbag stocks.

here’s why . . .

. . .

whilst it’s easy to find two things that are “basically the same”, driven by common factors, which tend to move together. . .

. . . if those two things **are similar enough** that you can compare their moves simply and directly with a crappy model like above, then the divergence/convergence pattern probably isn’t big enough that it survives trading into both legs of the pair and sometimes being wrong.

. . . and, if those two things **aren’t similar enough,** then it might _look_ like they diverge and converge in a large tradeable range, but that’s just cos your model is crap. you’re just gonna be wrong a lot. you’re gonna see a ton of false positives cos your model was too simplistic.

. . .

that doesn’t necessarily mean that you couldn’t trade the pair. it just means you couldn’t trade the pair with a naive model like above.

you might need to work a little harder to model other things that you know are driving relative moves between the two assets.

you also might think about how you can tell whether a divergence is likely to be a reason 1 _(technical effect that will revert)_ thing or a reason 2 _(informed trading)_ thing.

> _**hint:** do you think informed trading might be more likely to coincide with relatively large trading volume?_

and you also might think about whether you actually need to wire pairs together like this.

trading pairs is expensive. could you expand your horizons and think of a more broad mean-reverting portfolio?

. . .

but we’re getting ahead of ourselves. we’ll get to all this stuff.

we have to run before we can walk.

next, i’ll tell you how you can trade a temu model like this in crypto, by hand, using nothing more than tradingview and some lists i give you.

then we can talk about how to make it better by building better models to minimize reason 3 _(crap model)_ errors, and avoiding bad trades by trying to detect reason 2 _(informed trading)_ errors.

. . .

> _ok. final question before i let you go. what does “cointegration” and all the stuff people talk about in textbooks and online have to do with all this?_

nothing really. i’m as confused as you are.

. . .

sorry this was so long. i hope it was useful.

i love you.

. . .

beep . . . boop.

rj's trading for dickheads is a reader-supported publication. To receive new posts and support my work, consider becoming a free or paid subscriber.

Subscribe

[![celestial's avatar](https://substackcdn.com/image/fetch/$s_!ygzI!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F00ceb066-4596-485c-aa67-5f770711c37c_928x928.jpeg)](https://substack.com/profile/258671904-celestial)[![MT's avatar](https://substackcdn.com/image/fetch/$s_!2eNi!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F81544710-56a1-4b4f-aaba-7ad91cfc0624_540x360.jpeg)](https://substack.com/profile/20880533-mt)[![Carlos Mata's avatar](https://substackcdn.com/image/fetch/$s_!_FD7!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F80ea6539-d3ee-4736-9380-6abaeed9bed9_1024x1024.webp)](https://substack.com/profile/20161522-carlos-mata)[![Trader’s journal's avatar](https://substackcdn.com/image/fetch/$s_!lMwg!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa0c7791c-2fd1-466f-b37f-ed1602bf1632_512x511.jpeg)](https://substack.com/profile/72077296-traders-journal)[![JTD's avatar](https://substackcdn.com/image/fetch/$s_!5jQD!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb366c374-dc45-4f3e-b137-98bbb6fada5b_376x815.jpeg)](https://substack.com/profile/326068647-jtd)

184 Likes∙

[11 Restacks](https://substack.com/note/p-181289967/restacks?utm_source=substack&utm_content=facepile-restacks)

184

3

11

Share

#### Discussion about this post

CommentsRestacks

![User's avatar](https://substackcdn.com/image/fetch/$s_!TnFC!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Favatars%2Fdefault-light.png)

[![robot james's avatar](https://substackcdn.com/image/fetch/$s_!64tg!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe3e808a-4c78-431e-a4bc-92d71c8d0289_522x522.jpeg)](https://substack.com/profile/7763028-robot-james?utm_source=comment)

[robot james](https://substack.com/profile/7763028-robot-james?utm_source=substack-feed-item)

[Dec 15](https://robotjames.substack.com/p/pairs-trading-for-dickheads/comment/187987634 "Dec 15, 2025, 7:00 AM")

Author

i wrote some words and drew some pictures about pairs trading.

it’s good. you should probably read it.

Like (30)

Reply

Share

[1 reply](https://robotjames.substack.com/p/pairs-trading-for-dickheads/comment/187987634)

[![NH's avatar](https://substackcdn.com/image/fetch/$s_!Tfxb!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Favatars%2Forange.png)](https://substack.com/profile/23072647-nh?utm_source=comment)

[NH](https://substack.com/profile/23072647-nh?utm_source=substack-feed-item)

[Apr 20](https://robotjames.substack.com/p/pairs-trading-for-dickheads/comment/246253445 "Apr 20, 2026, 7:26 AM")

cointegration

Like (1)

Reply

Share

[1 more comment...](https://robotjames.substack.com/p/pairs-trading-for-dickheads/comments)

TopLatestDiscussions

[three dead simple edges in macro etfs](https://robotjames.substack.com/p/three-dead-simple-edges-in-macro)

[stuff you can trade drunk af and still make money](https://robotjames.substack.com/p/three-dead-simple-edges-in-macro)

Apr 13•[robot james](https://substack.com/@robotjames)

81

3

6

![](https://substackcdn.com/image/fetch/$s_!5up4!,w_320,h_213,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F130f6e79-7ef9-43ed-ab56-bbeec9d39a9f_1033x553.png)

[a complete "temu" pairs trading strategy in crypto](https://robotjames.substack.com/p/a-complete-temu-pairs-trading-strategy)

[sometimes you really can keep it simple](https://robotjames.substack.com/p/a-complete-temu-pairs-trading-strategy)

Dec 17, 2025•[robot james](https://substack.com/@robotjames)

47

6

3

![](https://substackcdn.com/image/fetch/$s_!UWNS!,w_320,h_213,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd1855d67-e480-4051-858c-054551c71fe8_802x791.png)

[a dirty long vol vix trade](https://robotjames.substack.com/p/a-dirty-long-vol-vix-trade)

[america, hell yeah!](https://robotjames.substack.com/p/a-dirty-long-vol-vix-trade)

Apr 9•[robot james](https://substack.com/@robotjames)

37

4

5

![](https://substackcdn.com/image/fetch/$s_!vCGh!,w_320,h_213,c_fill,f_auto,q_auto:good,fl_progressive:steep,g_center/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0be589fb-9ef7-4a61-afc7-99112aab0a0e_1107x559.png)

See all

### Ready for more?

Subscribe

──────── [TRUNCATED] ────────
Showing 26,240 chars (head) + 8,392 chars (tail) of 36,257 total clean characters.
Full text saved to: C:\Users\Kidsg\AppData\Local\hermes\cache\web\robotjames.substack.com-6048469a6c.md
To read the omitted middle: read_file path="C:\Users\Kidsg\AppData\Local\hermes\cache\web\robotjames.substack.com-6048469a6c.md" offset=423 limit=200  (the file is the complete page; raise/lower offset to page through it).
─────────────────────────────
