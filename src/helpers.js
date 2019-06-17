if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}

//-- Define degrees function
if (typeof (Number.prototype.toDeg) === "undefined") {
    Number.prototype.toDeg = function () {
        return this * (180 / Math.PI);
    }
}

export function calculateMiddle(lat1, lng1, lat2, lng2) {
	
    //-- Longitude difference
    var dLng = (lng2 - lng1).toRad();

    //-- Convert to radians
    lat1 = lat1.toRad();
    lat2 = lat2.toRad();
    lng1 = lng1.toRad();

    var bX = Math.cos(lat2) * Math.cos(dLng);
    var bY = Math.cos(lat2) * Math.sin(dLng);
    var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY));
    var lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

    //-- Return result
    return {lng: lng3.toDeg(), lat: lat3.toDeg()};
}


export function determineZoom(addOne, addTwo) {
    if ((addOne.postal && addTwo.postal_code) && (addOne.postal_code === addTwo.postal_code)) {
         return 16;
    }
    if ((addOne.city && addTwo.city) && addOne.city === addTwo.city) {
        return 14;
    }
    if ((addOne.state_province && addTwo.state_province) && addOne.state_province === addTwo.state_province) {
        return 8;
    }
    if ((addOne.country && addTwo.country) &&  addOne.country === addTwo.country) {
        return 5;
    } else {
        return 2;
    }
}