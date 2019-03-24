import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { checkAreas } from '../Geo/CheckArea';
import { returnErrors } from '../../actions/messages';
import { connect } from 'react-redux';
import { change } from 'redux-form';

class Map extends React.Component {
  onDragEnd = evt => {
    const { areas } = this.props.areas;
    checkAreas(
      '',
      'location',
      evt.latLng,
      areas,
      async addr => {
        this.props.change('FormUserAddress', 'street', addr.street);
        this.props.change(
          'FormUserAddress',
          'street_number',
          addr.street_number
        );
        this.props.change('FormUserAddress', 'geocode', addr.co);
        this.props.change('FormUserAddress', 'area', addr.area);
        this.props.change('FormUserAddress', 'city', addr.city);
      },
      no => {
        this.props.change('FormUserAddress', 'geocode', '');
        this.props.change('FormUserAddress', 'street', 'not yet available');
        this.props.change('FormUserAddress', 'area', '');
        this.props.change('FormUserAddress', 'city', '');
        this.props.change('FormUserAddress', 'street_number', '000');
        this.setState({
          co: { lat: 25.1714393, lng: 55.22058549 }
        });
      },
      err => {
        this.props.returnErrors({
          addressIncorrect: 'The address format looks incorrect!'
        });
      }
    );
  };

  RegularMap = withGoogleMap(() => (
    <GoogleMap
      defaultZoom={15}
      center={this.props.areas.co}
      defaultOptions={{
        scrollwheel: true
      }}
    >
      <Marker
        position={this.props.areas.co}
        draggable
        onDragEnd={this.onDragEnd}
      />
    </GoogleMap>
  ));

  render() {
    return (
      <this.RegularMap
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '30vw', width: '100%' }} />}
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
  { returnErrors, change }
)(Map);
