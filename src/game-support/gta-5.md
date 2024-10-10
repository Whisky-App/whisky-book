# Grand Theft Auto V
<!-- script:Aliases [
    "GTA 5",
    "GTA v",
    "Grand Theft Auto 5"
] -->

{{#template ../templates/rating.md status=Bronze installs=Yes opens=Yes}}

> [!NOTE]
> As of 2024, Rockstar Games added BattlEye anti-cheat software. Online play will not work on many official and unofficial servers.

> [!WARNING]
> The Rockstar Games Launcher will fail with the `The Rockstar Games Launcher failed to initialize!` error when `DXVK` is turned `off` in your `Bottle Configuration`. `DXVK` can turned `on` to workaround the launcher error but you might experience visual gliches (invisible guns, green car windows, brightness and reflection artifacts, etc) if you do so. For a glichless experience we suggest to keep `DXVK` turned `off` and follow the following setup to workaround the launcher issue instead.

## Setup

- Install in Steam as normal.
- Add the `-nobattleye` launch option to the game.
- In Whisky open "Bottle Configuration" and:
  - If on, turn `DXVK` off.
  - Click on "Open Wine Configuration" and:
     - Under the "Application" tab add `Launcher.exe` (most likely from C:\Program Files\Rockstar Games\Grand Theft Auto V).
     - While `Launcher.exe` is selected in the "Application" tab, switch to the "Libraries" tab and add `d3d10core`, `d3d11`, `dxgi` selecting the "Native then Buildin" option for all.
     - Click "Apply" and start the game from Whisky as usual.


{{#template ../templates/steam.md id=271590}}
