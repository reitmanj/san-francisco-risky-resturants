/*
 **
 */

var inspectionRecords = [];
var map;
var infowindow;

$(function() {
    populateInspectionRecordArray('data/medrisk.json')
});

function populateInspectionRecordArray(file) {
    $.getJSON(file, function(data) {
        console.log(data.length)
        console.log(data[1].name, data[1].score)
            data.reduce(function(acc, curVal, curInd, arry) {
                if(curVal['name'] in acc) {
                    acc[curVal['name']]++;
                    }
                    else {
                    acc[curVal['name']] = 1;
                    }
                    console.log(acc[curVal['name']]);
                    }, {});
                //console.log('acc ', acc, 'curVal ', curVal['name'])

            })
        }

// Display map and initialize infowindow object
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.794565,
            lng: -122.40783,
        },
        zoom: 15,
    });
    infowindow = new google.maps.InfoWindow();
};

var markerData = [];

// Creates the markers.
function createMarker(name, lt, ln, date, score, problem, risk) {
    const regex = /vermin/gi;
    var icons = 'pngs/sickfaceSmall.svg'
    if (problem.match(regex)) {
        icons = 'pngs/roachSmall.svg'
    }

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lt, ln),
        map: map,
        icon: icons
    });
    marker.addListener('mouseover', function() {
        infowindow.setContent("<div class='infowindow'><b>" + name + "</b><br>" + problem + "<br>" +
         "Date Inspected: " + date.substring(0,10) + "<br>" + "Score: " + score + "</div>");
        infowindow.open(map, this);
    });
    marker.addListener('mouseout', function() {
        infowindow.close(map, this);
    });
    marker.setMap(map);
    markerData.push(marker); // Save markers to array for easy removal
    /*
    for (var i =0; i < markerData.length; i++) {
            markerData[i].setMap(map);
        }
        make markers drop in one at a time
        */
};

// Clears all markers from the map and deletes all markers in array by removing
// references to them.
function deleteMarkers() {
    for (var i = 0; i < markerData.length; i++) {
        markerData[i].setMap(null);
    }
    markerData = [];
};
