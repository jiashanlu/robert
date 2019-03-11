import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { checkAreas } from '../Geo/CheckArea';
import { returnErrors } from '../../actions/messages';
import { confirmInArea } from '../../actions/areas';
import { connect } from 'react-redux';

class Map extends React.Component {
  onDragEnd = evt => {
    const { areas } = this.props.areas;
    checkAreas(
      'location',
      evt.latLng,
      areas,
      async addr => {
        await this.props.confirmInArea(addr);
      },
      no => {
        this.props.confirmInArea({
          address_components: [
            {
              long_name: 'not available yet! try another address',
              types: ['route']
            }
          ],
          geometry: { location: '' }
        });
      },
      err => {
        this.props.returnErrors({
          addressIncorrect: 'The address format looks incorrect!'
        });
      }
    );
  };

  RegularMap = withGoogleMap(props => (
    <GoogleMap
      defaultZoom={15}
      center={
        this.props.default_address || { lat: 25.1714393, lng: 55.22058549 }
      }
      defaultOptions={{
        scrollwheel: true
      }}
    >
      <Marker
        position={
          this.props.default_address || { lat: 25.1714393, lng: 55.22058549 }
        }
        draggable
        onDragEnd={this.onDragEnd}
      />
    </GoogleMap>
  ));

  render() {
    return (
      <this.RegularMap
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '20vw', width: '30vw' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    );
  }
}

const mapStateToProps = state => ({
  areas: state.areas
});

export default connect(
  mapStateToProps,
  { confirmInArea, returnErrors }
)(Map);
