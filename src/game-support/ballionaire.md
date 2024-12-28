# Ballionaire
<!-- script:Aliases [] -->

{{#template ../templates/rating.md status=Garbage installs=Yes opens=No}}

> [!WARNING]
> Game almost seems like it's going to open, but will hang forever due to an internal error. Cannot load a CompressedTexture2D.
> ```
> USER ERROR: No loader found for resource:  (expected type: CompressedTexture2D)
> at: ResourceLoader::_load (core\io\resource_loader.cpp:282)
> USER ERROR: Failed loading resource: res://mutators/textures/eye_of_abundance.png. Make sure resources have been imported by opening the project in the editor at least once.
> at: ResourceLoader::_load (core\io\resource_loader.cpp:275)
> USER ERROR: System.Exception: MISSING RESOURCE
> at Rez.Textures.Mutators.Preload()
> at Rez.Preload()
> at Core.Shell._Ready()
> at Godot.Node.InvokeGodotClassMethod(godot_string_name& method, NativeVariantPtrArgs args, godot_variant& ret)
> at Godot.CanvasItem.InvokeGodotClassMethod(godot_string_name& method, NativeVariantPtrArgs args, godot_variant& ret)
> at Godot.Control.InvokeGodotClassMethod(godot_string_name& method, NativeVariantPtrArgs args, godot_variant& ret)
> at Core.Shell.InvokeGodotClassMethod(godot_string_name& method, NativeVariantPtrArgs args, godot_variant& ret)
> at Godot.Bridge.CSharpInstanceBridge.Call(IntPtr godotObjectGCHandle, godot_string_name* method, godot_variant** args, Int32 argCount, godot_variant_call_error* refCallError, godot_variant* ret)
> at: void Godot.NativeInterop.ExceptionUtils.LogException(System.Exception) (:0)
> ```

{{#template ../templates/steam.md id=2667120}}
