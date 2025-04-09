# Maintenance Notice

> [!NOTE]
> **Whisky is no longer actively maintained.**

WhiskyWine will no longer be receiving any further updates. We will not be upgrading
to Wine 8+, and fixes for specific apps and games, [like Steam](./steam.md) will not be produced.

Occasional updates may still come if macOS fundamentally breaks the main app, like it did in 15.4.

## "How do I play my games then?"

If Whisky is no longer cutting it for your needs, [buy CrossOver](https://www.codeweavers.com/store?ad=1010).
A lot of people are confused on CrossOver's pricing:

- It's not a subscription it's a license. You can continue to use the version you purchased forever. If you don't need to upgrade, you don't have to.
- It costs less to upgrade your license to a new version than it does to buy a license upfront. So you will not be paying $74 every year.
- There are frequent sales and discount codes available if you wait.

## "Why are you no longer updating it?"

I have received many questions on this decision, but it continues to be asked, so I figured it was
time to update both the repository and the website to explicitly state this.

1. I lost interest in the project. Running it is incredibly time-consuming, and as I'm still a student
and also not being paid for work on Whisky it becomes hard to justify working on it if I no longer enjoy it.

2. Whisky, in my opinion, has not been a positive on the Wine community as a whole. My original
goal for the project was for it to be 'engine' agnostic, simply serve as a frontend for Wine, and not provide a bundled
version itself. That all changed when GPTK came out at WWDC. So right out of the gate, the goals of the project
were pretty muddied.

    Developing Wine is hard. The codebase is exclusively written in C for maximum portability, but that also
places a rather high barrier to entry for those looking to contribute. Not to mention the reverse engineering
skills required to debug malfunctioning apps and games. A lot of incredibly talented people spend a lot of time
working on it but for a project like Wine, you need people working on it full-time.

    Wine is one of those few projects that actually has sizeable funding behind it. Valve has invested a lot into 
the project as it's the backbone of Proton, on which their whole gaming-on-Linux and Steam Deck strategy is based.
The problem is, macOS is not Linux, and it poses significant challenges that are unique to it over any other UNIX
operating system. Fixes for macOS have to come from people who are not only incredibly knowledgeable on C, Wine, Windows,
but also macOS. As you can imagine, the pool of developers with those skills is very limited.

    That is where CrossOver and CodeWeavers come in. Without CodeWeavers there would be no Wine on Mac. There would be
no GPTK. Hell, even Rosetta would likely be more restricted as many of the extensions added in recent months
were only added due to pressure from Mac gamers.

    **The revenue from CrossOver is what keeps Wine on Mac alive.**

    By contrast, Whisky is based on CrossOver, but we don't produce any bespoke fixes. I, quite frankly, do not have
the requisite skills or time to do so. As a result, the amount that Whisky as a whole to Wine is exactly zero.
This is not a fair trade, and continuing this parasitic relationship could easily harm CrossOver's continued
profitibility and the existence of Wine on Mac as a whole.

    TLDR; Whisky harms Wine on Mac.

## "What's the *real* reason?"

That's it. That's the real reason. I do not work for CodeWeavers. I receive no payment from them aside
from a small commission from CrossOver sales using my affiliate link, which is small and infrequent.

There's no conspiracy, it's simply just not the right thing to do. Whisky was certainly a big undertaking,
and will probably be the most widely used solo project of my life so I don't take this decision lightly.

## "What's next?"

Those who know me know that I've already moved on to several other projects. Most recently, I've been helping out
with porting Sonic Unleashed Recompiled to macOS and Metal. I will continue to do cool stuff in the Mac space
but just not this.

If you want to find me, best places are my [Bluesky](https://bsky.app/profile/isaacmarovitz.com), and my [GitHub](https://github.com/IsaacMarovitz).

If you got this far, thank you for reading,

*Isaac*