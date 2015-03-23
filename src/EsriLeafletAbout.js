/*
this should be an animated fade-in lightbox or whatever you'd call it kind of a thing
*/

EsriLeafletAbout = L.Control.extend({
  includes: L.Mixin.Events,
  options: {
    position: 'topleft',
    collapseAfterResult: true,
    expanded: false,
    message: '<p>maps are really cool</p>',
    title: 'About this map'
  },

  initialize: function (options) {
    L.Util.setOptions(this, options);
  },

  clear: function(){
    this._input.value = '';

    if(this.options.collapseAfterResult){
      this._input.placeholder = '';
      L.DomUtil.removeClass(this._wrapper, 'about-control-expanded');
    }

    if(!this._map.scrollWheelZoom.enabled() && this._map.options.scrollWheelZoom){
      this._map.scrollWheelZoom.enable();
    }
  },

  onAdd: function (map) {
    this._wrapper = L.DomUtil.create('div', 'about-control ' + ((this.options.expanded) ? ' ' + 'about-control-expanded'  : ''));
    this._input = L.DomUtil.create('div', 'about-control-input leaflet-bar', this._wrapper);
    this._input.title = this.options.title;

    this._suggestions = L.DomUtil.create('div', 'about-control-suggestions leaflet-bar', this._wrapper);

    L.DomEvent.addListener(this._wrapper, 'click', function(e){

      if (this._wrapper.classList.contains('about-control-expanded')){
        L.DomUtil.removeClass(this._wrapper, 'about-control-expanded');
        this._suggestions.innerHTML = '';
      }
      else {
        L.DomUtil.addClass(this._wrapper, 'about-control-expanded');
        this._suggestions.style.display = 'block';
        this._suggestions.innerHTML = this.options.message;
      }

    }, this);

    L.DomEvent.addListener(this._input, 'blur', function(e){
      this.clear();
    }, this);

    L.DomEvent.disableClickPropagation(this._wrapper);
    return this._wrapper;
  }

});

// attach to the L.esri global
if(typeof window !== 'undefined' && window.L && window.L.esri) {
  window.L.esri.About = EsriLeafletAbout;
}

// We do not have an 'Esri' variable e.g loading this file directly from source define 'Esri'
if(!Esri){
  var Esri = window.L.esri;
}