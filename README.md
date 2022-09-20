# ngx VR View

This library helps to implement Googles VR View library in Angular.

[//]: # ([![Version]&#40;https://img.shields.io/npm/v/v-network-graph.svg&#41;]&#40;https://www.npmjs.com/package/ngx-vrview&#41;)
[//]: # (![GitHub package.json dependency version]&#40;https://img.shields.io/github/package-json/dependency-version/HenningKuehl/ngx-vrview/dep/@vue/compiler-sfc?label=Vue&#41;)
[![GitHub license](https://img.shields.io/github/license/HenningKuehl/ngx-vrview)](https://github.com/HenningKuehl/ngx-vrview)

## Installation

Install with npm
```sh
npm install ngx-vrview
```

Install with yarn
```sh
yarn add ngx-vrview
```

Add module

```ts
import { VRViewModule } from "ngx-vrview";

...

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...
    VRViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Use image component
```html
<vrview-image [src]="https://url-to-image.com" width="100%" height="400px"></vrview-image>
```

Use video component
```html
<vrview-video [src]="https://url-to-video.com" width="100%" height="400px"></vrview-video>
```

## Contributing

If you find any bugs and/or want to contribute, feel free to submit issues or pull requests.

## License

Under the MIT license.  
See [LICENSE](https://github.com/HenningKuehl/ngx-vrview/blob/main/LICENSE) file for more details.

## Support me 🌟
  
If you find this library helpful, please consider giving it a star ⭐ on GitHub!

You may [buy me a coffee](https://www.buymeacoffee.com/hnnngkhl) if you would
like to show some support for this open-source project.
It will be greatly appreciated!  
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](https://www.buymeacoffee.com/hnnngkhl)
