/* This program is free software: you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public License
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

otp.namespace("otp.core");




otp.core.GeocoderPelias = otp.Class({

    initialize : function(url, addressParam) {
        this.url = url;
        this.apiKey =  'search-i7U3-9E';
        this.size = 10;
    },

    geocode : function(address, callback) {
        var params = {
          text: address,
          api_key: this.apiKey,
          size: this.size
        };

        var this_ = this;

        $.getJSON(this.url, params)
            .done( function (data) {
                // Success: transform the data to a JSON array of objects containing lat, lng, and description fields as the client expects
                data = data.features.map(function (r) {
                    return {
                        "description": r.properties.name,
                        "lat": r.geometry.coordinates[1],
                        "lng": r.geometry.coordinates[0],
                    };
                });
                callback.call(this, data);
            })
            .fail( function (err) {
                alert("Something went wrong retrieving the geocoder results from: " + this_.url + " for: " + address);
            });
    }
});
