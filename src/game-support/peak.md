# PEAK
<!-- script:Aliases [] -->

{{#template ../templates/rating.md status=Silver installs=Yes opens=Yes}}

## Setup

If you're using the older version of Steam (because of the Steam 3008 error), you'll need to install the game through the MAC version of Steam.

Assuming you already have the Mac version of steam and have it installed (latest version):

- Open MAC Steam.
- In any browser, type `steam://open/console`.
- In the console, type the following commands: `@sSteamCmdForcePlatformType windows` and `app_install 3527290`
- Once installed, right click on the game in your library and click on "Browse local files".
- In the Finder window steam opened, navigate back to `steamapps` (folder).
- Open Whisky and open C drive, navigate to `drive_c/Program\ Files\ (x86)/Steam/steamapps`.
- On the Mac `steamapps` You should see a file called `appmanifest_3527290.acf`. Drag this file to the WINDOWS version of `steamapps` (Whisky).
- Navigate back to `steamapps/common` on Mac steam and drag the folder "PEAK" to Whisky `steamapps/common`.
- Restart Whisky steam and you should see the game in your library.

## Launch Options

Tested both DXVK, Metal, ESync, MSync. You are only able to launch using Vulkan, otherwise it'll just give a Unity crash error.

> [!WARNING]
> FLASH WARNING!
> Certain assets in the game will start flashing/blinking, assets include your hat, backback, wood (logs), some mountains on some levels, most rocks on Alpine level.

{{#template ../templates/steam.md id=3527290}}
