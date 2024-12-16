# r2modman
<!-- script:Aliases [] -->

{{#template ../templates/rating.md status=Silver installs=Yes opens=Yes}}

## Setup

> Thank you to `1halon` on the Discord for writing this up!

- In `Bottle Configuration`, change `Enhanced Sync` to `ESync`
- Download the standalone executable from [here](https://github.com/ebkr/r2modmanPlus/releases/latest) into your bottle's C-Drive
  - Ensure you're downloading the one named `r2modman-x.x.xx.exe` where `x.x.xx` is the current version of the mod manager.
- Pin the program and `Right Click > Config`
- Add `--disable-gpu --no-sandbox --in-process-gpu` into arguments
- Add environment variable with key `WINEDLLOVERRIDES` and value `libglesv2=d`
> [!WARNING]
> If app opens with a blank screen, check environment variable as it may not get saved in the first try.

> [!NOTE]
> If using the BepInEx framework, install `winhttp` through `Winetricks > DLLs` or override `winhttp` to `Native then Builtin` from `Wine Configuration` (console may not show up)


