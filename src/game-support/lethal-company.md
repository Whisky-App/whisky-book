# Lethal Company
<!-- script:Aliases [] -->

{{#template ../templates/rating.md status=Gold installs=Yes opens=Yes}}

## Setup

- Open Settings.
- Change `Frame rate cap:` to anything other than `VSync` to fix sluggish gameplay performance.

> [!NOTE]
> If you want to use mods with Lethal Company, consider following the [r2modman](https://docs.getwhisky.app/game-support/r2modman.html) guide to install the mod launcher.
> Don't forget to follow the instructions to enable BepInEx if you are using that mod.
>
> Additionally, the mods
> - [CullFactory](https://thunderstore.io/c/lethal-company/p/fumiko/CullFactory/)
> - [Lethal Performance](https://thunderstore.io/c/lethal-company/p/DiFFoZ/LethalPerformance/)
>
> may be used to augment performance[^1].

## Papercuts

- The game is always in full screen mode in the background.
- You cannot `Cmd-Tab` away from Lethal Company or you may risk the game
  freezing, requiring a restart. However, if you use a window manager such as
  [AeroSpace](https://github.com/nikitabobko/AeroSpace), you may have more
  success in being able to switch away.
- You may need to retry multiple times when joining modded lobbies --- that is,
  if you receive a message such as "An error occured", simply ask for another
  invite and try joining again.

{{#template ../templates/steam.md id=1966720}}

[^1]: [HDLethalCompany](https://thunderstore.io/c/lethal-company/p/Sligili/HDLethalCompany/)
      is not mentioned because it has not been maintained for two years.
      However, as of 3/15/25, using it to lower resolution was still working.
