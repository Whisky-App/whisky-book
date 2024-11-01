# Heroes of Might and Magic 3: Complete
<!-- script:Aliases [
    "Heroes 3",
    "Heroes III",
    "Heroes of Might and Magic III",
    "Heroes of Might and Magic III: Complete",
    "HoMM 3"
] -->

{{#template ../templates/rating.md status=Gold installs=Yes opens=Yes}}

> [!IMPORTANT]
> The game is available on GOG and it is the [Complete Edition](https://www.gog.com/en/game/heroes_of_might_and_magic_3_complete_edition) which is the definite version. The Steam version is using the HD "remaster" which is not recommended and not tested.
---
> [!NOTE]
> The popular community mods [heroes3hd](https://sites.google.com/site/heroes3hd/) and [hota](https://h3hota.com/en/download) are supported and recommended.

## Setup

### Prerequisites:
1. Buy the game from GOG if you don't have it yet. [Heroes 3 purchase page on GOG](https://www.gog.com/en/game/heroes_of_might_and_magic_3_complete_edition)
2. Download the offline backup installers from GOG.
3. *(optional)* Download [heroes3hd mod](https://sites.google.com/site/heroes3hd/)
4. *(optional)* Download [hota mod](https://h3hota.com/en/download)

### Installation:
1. create new bottle (win7) and follow all installation instructions (roseta, wine, etc.)
2. run the heroes 3 installation
3. *(optional)* run the heroes3hd mod installation
3. *(optional)* run hota mod installation

At this point you should be able to run the `Heroes3.exe` or `Heroes3 HD.exe` if you installed the mods and run the game. However, the sound is not working properly (slow, breaking). To fix this you should:

1. click on `winetricks`
2. `dll`
3. select `dsound`
4. run

This will open the terminal and install new drivers. After this you are all set.


