# Fear and Hunger

{{#template ../templates/rating.md status=Bronze date=28/03/24 installs=Yes opens=Yes}}

## Setup

- Install in Steam as normal
- Right click `Pinned Program > Config`
    - This can either be the Steam icon, or you can pin the Game.exe in the game's local files and open config there.
    - The latter method will not get you playtime hours through Steam, but will allow you to keep Environment Variables separate in case this doesn't play well with other games.
- Add environment variable with key `WINEDLLOVERRIDES` and value `libglesv2.dll=d`

> [!NOTE]
> The game is terribly optimized and runs very poorly without community-made fixes, which have not yet been compatible with macOS and Whisky.
> You can find those fixes [here](https://www.pcgamingwiki.com/wiki/Fear_%26_Hunger#Essential_Improvements), however at the current time they **do not work** on macOS and will prevent your game from running.

{{#template ../templates/steam.md id=1002300}}