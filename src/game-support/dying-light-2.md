# Dying Light 2
<!-- script:Aliases [] -->

{{#template ../templates/rating.md status=Platinum installs=Yes opens=Yes}}

The game will not launch with DXVK enabled.

> [!WARNING]
> Changing the upscaling method to XeSS will soft-lock the game.
> To fix this, click `Open C: Drive` and navigate to `/users/crossover/Documents/dying light 2/out/settings/video.scr`, and open this file in a text editor.
> Change `Upscaler(5)` to `Upscaler(0)`

> [!WARNING]
> You may experience issues if using DX11 as your graphics backend, depending on your bottle configuration. If this is the case, use the above method.
> Change `RendererMode("d3d11")` to `RendererMode("d3d12")`.

> [!NOTE]
> You can use the above solution to change your texture settings to low (which you are unable to do in the in-game settings menu).
> Set `TextureQuality(...)` to `TextureQuality("Low")`.

{{#template ../templates/steam.md id=534380}}
