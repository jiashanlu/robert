/* global google */
/* eslint no-loop-func: 0*/

const checkArea = (type, address, area, callback) => {
  const geocoder = new google.maps.Geocoder();
  let polyArea = new google.maps.Polygon({ paths: area });
  if (type === 'location') {
    geocoder.geocode({ [type]: address }, function(results, status) {
      if (status === 'OK') {
        if (
          google.maps.geometry.poly.containsLocation(
            results[0].geometry.location,
            polyArea
          )
        ) {
          callback(results[0]);
        } else {
          callback(1);
        }
      } else {
        callback('error');
      }
    });
  } else {
    try {
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
    } catch {
      callback('error');
    }
  }
};

export const checkAreas = (nbr, type, address, areas, yes, no, err) => {
  console.log(address);
  let check = 0;
  let error = 0;
  for (let i = 0; i < areas.length; i++) {
    checkArea(type, address, areas[i].co, addr => {
      if (addr === 'error') {
        error++;
      } else if (addr === 1) {
        check++;
      } else if (addr !== 'error') {
        yes({
          object: addr,
          street: addr.address_components.filter(
            item => item.types.indexOf('route') !== -1
          )[0].long_name,
          street_number:
            addr.geometry.location !== ''
              ? addr.types[0] !== 'route'
                ? addr.address_components.filter(
                    item => item.types.indexOf('street_number') !== -1
                  )[0].long_name
                : nbr
              : '',
          area:
            addr.geometry.location !== ''
              ? addr.address_components.filter(
                  item => item.types.indexOf('sublocality') !== -1
                )[0].long_name
              : '',
          city:
            addr.geometry.location !== ''
              ? addr.address_components.filter(
                  item => item.types.indexOf('locality') !== -1
                )[0].long_name
              : '',
          co: addr.geometry.location
        });
      }
      if (check === areas.length) {
        no();
      }
      if (error === areas.length) {
        err();
      }
    });
  }
};

export default checkArea;
