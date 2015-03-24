/*
to do:
attach toggle button position to the 'topleft' constructor option)
add support for markdown
dim map while about window is displayed

note: sidebar was an existing plugin, need to find and give credit
*/

L.Control.About = L.Control.extend({

    includes: L.Mixin.Events,

    options: {
        closeButton: true,
        position: 'topleft',
        visible: false
    },

    initialize: function (placeholder, options) {
        L.Util.setOptions(this, options);

        //var button = this._buttonWrapper = L.DomUtil.create('div', 'leaflet-about-button', container);

        // Find content container
        var content = this._contentContainer = L.DomUtil.get(placeholder);

        // Remove the content container from its original parent
        content.parentNode.removeChild(content);

        var l = 'leaflet-';

        // Create about container
        var container = this._container =
            L.DomUtil.create('div', l + 'about');

        // Style and attach content container
        L.DomUtil.addClass(content, l + 'control');
        container.appendChild(content);

        // Create close button and attach it if configured
        if (this.options.closeButton) {
            var close = this._closeButton =
                L.DomUtil.create('a', 'close', container);
            close.innerHTML = '&times;';
        }
    },

    addTo: function (map) {
        var container = this._container;
        var content = this._contentContainer;

        var button = this._buttonContainer = L.DomUtil.create('div', 'leaflet-about-button leaflet-bar leaflet-control');

        button.options = {position:'topleft'};

        L.DomEvent.addListener(button, 'click', function(e){
          this.toggle();
        }, this);

        // Attach event to close button
        if (this.options.closeButton) {
            var close = this._closeButton;

            L.DomEvent.on(close, 'click', this.hide, this);
        }

        L.DomEvent
            .on(container, 'transitionend',
                this._handleTransitionEvent, this)
            .on(container, 'webkitTransitionEnd',
                this._handleTransitionEvent, this);

        // Attach about container to controls container
        var controlContainer = map._controlContainer;
        var containerChild = controlContainer.firstChild;

        // controlContainer.firstChild.insertAdjacentHTML('afterbegin', button.outerHTML);
        containerChild.insertBefore(button, containerChild.firstChild);
        controlContainer.insertBefore(container, controlContainer.firstChild);

        this._map = map;

        // Make sure we don't drag the map when we interact with the content
        var stop = L.DomEvent.stopPropagation;
        L.DomEvent
            .on(content, 'click', stop)
            .on(content, 'mousedown', stop)
            .on(content, 'touchstart', stop)
            .on(content, 'dblclick', stop)
            .on(content, 'mousewheel', stop)
            .on(content, 'MozMousePixelScroll', stop);

        if (this.options.visible) {
            context = this;
            setTimeout(function () {
              context.show();
            }, 500);
        }

        return this;
    },

    removeFrom: function (map) {
        //if the control is visible, hide it before removing it.
        this.hide();

        var content = this._contentContainer;

        // Remove about container from controls container
        var controlContainer = map._controlContainer;
        controlContainer.removeChild(this._container);

        //disassociate the map object
        this._map = null;

        // Unregister events to prevent memory leak
        var stop = L.DomEvent.stopPropagation;
        L.DomEvent
            .off(content, 'click', stop)
            .off(content, 'mousedown', stop)
            .off(content, 'touchstart', stop)
            .off(content, 'dblclick', stop)
            .off(content, 'mousewheel', stop)
            .off(content, 'MozMousePixelScroll', stop);

        L.DomEvent
            .off(container, 'transitionend',
                this._handleTransitionEvent, this)
            .off(container, 'webkitTransitionEnd',
                this._handleTransitionEvent, this);

        if (this._closeButton && this._close) {
            var close = this._closeButton;

            L.DomEvent.off(close, 'click', this.hide, this);
        }

        return this;
    },

    isVisible: function () {
        return L.DomUtil.hasClass(this._container, 'visible');
    },

    show: function () {
        if (!this.isVisible()) {
            L.DomUtil.addClass(this._container, 'visible');
            if (this.options.autoPan) {
                this._map.panBy([-this.getOffset() / 2, 0], {
                    duration: 0.5
                });
            }
            this.fire('show');
        }
    },

    hide: function (e) {
        if (this.isVisible()) {
            L.DomUtil.removeClass(this._container, 'visible');
            this.fire('hide');
        }
        if(e) {
            L.DomEvent.stopPropagation(e);
        }
    },

    toggle: function () {
        if (this.isVisible()) {
            this.hide();
        } else {
            this.show();
        }
    },

    getContainer: function () {
        return this._contentContainer;
    },

    getCloseButton: function () {
        return this._closeButton;
    },

    setContent: function (content) {
        this.getContainer().innerHTML = content;
        return this;
    },

    _handleTransitionEvent: function (e) {
        if (e.propertyName == 'left' || e.propertyName == 'right')
            this.fire(this.isVisible() ? 'shown' : 'hidden');
    }
});

L.control.about = function (placeholder, options) {
    return new L.Control.About(placeholder, options);
};