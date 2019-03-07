import React from 'react';
/* global google */

const checkArea = (address, area, callback) => {
  let polyArea = new google.maps.Polygon({ paths: area });
  if (
    google.maps.geometry.poly.containsLocation(
      address.geometry.location,
      polyArea
    )
  ) {
    callback(address);
  } else {
    callback(1);
  }
};

export function checkAreas(address, areas, yes, no) {
  let check = 0;
  let error = 0;
  for (let i = 0; i < areas.length; i++) {
    checkArea(address, areas[i].co, addr => {
      if (addr === 'error') {
        error++;
      } else if (addr === 1) {
        check++;
      } else if (addr !== 'error') {
        yes(addr);
      }
      if (check === areas.length) {
        no();
      }
      if (error === areas.length) {
        alert('The address format looks incorrect, try again');
      }
    });
  }
}

export default checkArea;
