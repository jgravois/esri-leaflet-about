# Esri Leaflet About

The Esri Leaflet About is a small API helper to add contextual HTML to Leaflet apps.

**Currently Esri Leaflet About is in development and should be thought of as a beta or preview**

Esri Leaflet About doesn't rely on the minimal Esri Leaflet Core, but its still a cool project that you can find out more about on the [Esri Leaflet downloads page](http://esri.github.com/esri-leaflet/downloads).

## Example

Take a look at the [live demo](http://esri.github.com/esri-leaflet/examples/geocoding-control.html).

![Example Image](https://raw.github.com/esri/esri-leaflet-geocoder/master/example.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Esri Leaflet About</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">

    <!-- Load Leaflet from their CDN -->
    <link rel="stylesheet" href="../node_modules/leaflet/dist/leaflet.css" />
    <script src="../node_modules/leaflet/dist/leaflet-src.js"></script>

    <script src="../node_modules/esri-leaflet/dist/esri-leaflet.js"></script>

    <link rel="stylesheet" href="../src/esri-leaflet-about.css" />
    <script src="../src/EsriLeafletAbout.js"></script>

    <!-- Make the map fill the entire page -->
    <style>
      #map {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>

    <script>

      var map = L.map('map').setView([37.74, -121.62], 9);
      var tiles = L.esri.basemapLayer('Topographic').addTo(map);
      var questionMark = new L.esri.About({message:'<h1>this is important!</h1>'});
      questionMark.addTo(map);

    </script>
  </body>
</html>
```

## L.esri.About

### Constructor

**Extends** [`L.Control`](http://leafletjs.com/reference.html#control)

Constructor | Options | Description
--- | --- | ---
`new L.esri.About(options)`<br>`L.esri.about(options)` | [`<Options>`](#options) | Creates a new About control.

### Options

Option | Type | Default | Description
--- | --- | --- | ---
`position` | `String` | `topleft` | One of the valid Leaflet [control positions](http://leafletjs.com/reference.html#control-positions).
`collapseAfterResult` | `Boolean` | `true` | If the geocoder is expanded after a result this will collapse it.
`expanded` | `Boolean` | `true` | Start the control in an expanded state.
`message` | `String` | `<p>maps are cool.</p>` | HTML to be displayed when the control is expanded.
`title` | `String` | `Location Search` | Title text for the search input. Shows as tool tip on hover.


### Styling
For reference here is the internal structure of the about control...

```html
<div class="about-control leaflet-control">

this needs tweaked.

  <input class="about-control-input leaflet-bar">
  <ul class="about-control-suggestions leaflet-bar">
    <li class="geocoder-control-suggestion">Another Result</li>
  </ul>
</div>
```

## Development Instructions

1. [Fork and clone Esri Leaflet Geocoder](https://help.github.com/articles/fork-a-repo)
2. `cd` into the `esri-leaflet-geocoder` folder
5. Install the dependencies with `npm install`
5. The example at `/index.html` should work
6. Make your changes and create a [pull request](https://help.github.com/articles/creating-a-pull-request)

## Dependencies

Esri Leaflet About doesn't rely on the minimal Esri Leaflet Core, but its still a cool project that you can find out more about on the [Esri Leaflet downloads page](http://esri.github.com/esri-leaflet/downloads).

## Resources

* [ArcGIS for Developers](http://developers.arcgis.com)
* [ArcGIS REST Services](http://resources.arcgis.com/en/help/arcgis-rest-api/)
* [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Terms and Conditions

i don't think there are any.

## Licensing
Copyright 2015 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt]( https://raw.github.com/Esri/esri-leaflet-geocoder/master/license.txt) file.

[](Esri Tags: ArcGIS Web Mapping Leaflet)
[](Esri Language: JavaScript)
