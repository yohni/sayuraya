import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import styled, { ThemeProvider } from 'styled-components';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
import { Card, Form, Input, FormGroup, Label, Button } from 'reactstrap';
import BaseContainer from '../../components/layout/BaseContainer';
import palletes from '../../theme';
import ArrowBackIcon from '../../components/icons/ArrowBackIcon';
import Link from 'next/link';

Geocode.setApiKey(process.env.apiKey);

const MyCard = styled(Card)`
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -0.5rem 1rem rgba(0, 0, 0, 0.15);
  font-size: 14px;
`;

const SearchBox = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  width: 100%;
  max-width: 480px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled(Button)`
  background: ${({ theme }) => theme.GreenPrimary};
  border-radius: 100px;
  border: none;
  height: 45px;
  width: 64px;
  margin-right: 12px;
  transition: 0.25s all;

  &:hover {
    background: ${({ theme }) => theme.GreenPrimary};
    transform: translateY(-1px);
  }
`;

const SearchField = styled(Autocomplete)`
  width: 100%;
  height: 45px;
  border-radius: 45px;
  border: none;
  padding: 24px;
  outline: none;
  font-size: 14px;

  &:focus {
    outline: none;
  }
`;

const SubmitBtn = styled(Button)`
  background: ${({ theme }) => theme.GreenPrimary};
  width: 100%;
  outline: none;
  border: none;
  transition: 0.25s all;
  font-size: 14px;

  &:hover {
    background: ${({ theme }) => theme.GreenPrimary};
    transform: translateY(-1px);
  }
`;

// eslint-disable-next-line react/prefer-stateless-function
class SetAddress extends Component {
  state = {
    address: '',
    province: '',
    regency: '',
    directions: null,
    openInfo: true,
    mapLoc: {
      lat: 0,
      lang: 0,
    },
    markerLoc: {
      lat: 0,
      lang: 0,
    },
  };

  onToggleOpen = () => {
    this.setState({
      openInfo: false,
    });
  };

  setMarkerLoc = (lat, lang) => {
    this.setState({
      markerLoc: {
        lat: lat,
        lang: lang,
      },
      mapLoc: {
        lat: lat,
        lang: lang,
      },
    });
    console.log(this.state.markerLoc);
  };

  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
    return '';
  };

  getArea = (addressArray) => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            'sublocality_level_1' === addressArray[i].types[j] ||
            'locality' === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          'administrative_area_level_1' === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  handleDragEnd = (e) => {
    this.onToggleOpen();
    let newLat = e.latLng.lat();
    let newLng = e.latLng.lng();

    Geocode.fromLatLng(newLat, newLng)
      .then((resp) => {
        const address = resp.results[0].formatted_address,
          addressArray = resp.results[0].address_components,
          regency = this.getCity(addressArray),
          province = this.getState(addressArray);
        this.setState({
          address,
          regency,
          province,
        });
        this.setMarkerLoc(newLat, newLng);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  directionSetup = async () => {
    const { lat, lang } = this.state.markerLoc;
    try {
      const DirectionsService = await new window.google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(lat, lang),
          destination: new google.maps.LatLng(-7.920647918913841, 112.08008247186658),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        async (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result.routes[0].legs[0],
            });
          } else {
            console.error(`error fetching directions`);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { markerLoc, address, regency, province } = this.state;
    this.directionSetup()
      .then((resp) => {
        const payload = {
          address,
          regency,
          province,
          coords: markerLoc,
          steps: {
            distance: this.state.directions && this.state.directions.distance.value,
            duration: this.state.directions && this.state.directions.duration.value,
          },
        };
        console.log(payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState(
          {
            mapLoc: {
              lat: position.coords.latitude,
              lang: position.coords.longitude,
            },
            markerLoc: {
              lat: position.coords.latitude,
              lang: position.coords.longitude,
            },
          },
          () => {
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
              .then((resp) => {
                const address = resp.results[0].formatted_address,
                  addressArray = resp.results[0].address_components,
                  regency = this.getCity(addressArray),
                  province = this.getState(addressArray);
                this.setState({
                  address,
                  regency,
                  province,
                });
                console.log(this.state);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        );
      });
    } else {
      console.error('Geolocation is not supported by this browser!');
    }
  }

  onPlaceSelected = (place) => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      regency = this.getCity(addressArray),
      province = this.getState(addressArray);
    this.setState({
      address,
      regency,
      province,
    });
    this.setMarkerLoc(place.geometry.location.lat(), place.geometry.location.lng());
  };

  render() {
    const { markerLoc, mapLoc } = this.state;
    const MapWithAMarker = withScriptjs(
      withGoogleMap(() => (
        <div>
          <SearchBox className="py-3 px-4">
            <Link href="/">
              <BackButton type="button" className="shadow">
                <ArrowBackIcon />
              </BackButton>
            </Link>
            <SearchField
              placeholder="Cari Alamat"
              className="shadow"
              onPlaceSelected={this.onPlaceSelected}
              types={['establishment', 'geocode']}
            />
          </SearchBox>
          <GoogleMap
            defaultZoom={18}
            defaultCenter={{ lat: mapLoc.lat, lng: mapLoc.lang }}
            defaultOptions={{
              disableDefaultUI: true,
            }}
          >
            <Marker
              draggable
              onDragEnd={this.handleDragEnd}
              position={{ lat: markerLoc.lat, lng: markerLoc.lang }}
            >
              {this.state.openInfo && (
                <InfoWindow onCloseClick={this.onToggleOpen}>
                  <>Drag marker ke alamat kamu</>
                </InfoWindow>
              )}
            </Marker>
          </GoogleMap>
        </div>
      ))
    );

    return (
      <ThemeProvider theme={palletes}>
        <BaseContainer show={false}>
          <MapWithAMarker
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.apiKey}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `320px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          <MyCard className="px-4 py-3">
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className="font-weight-bold">Alamat</Label>
                <Input
                  style={{ fontSize: '14px' }}
                  value={this.state.address}
                  type="textarea"
                  disabled
                />
              </FormGroup>
              <SubmitBtn className="font-weight-bold" type="submit">
                Simpan
              </SubmitBtn>
            </Form>
          </MyCard>
        </BaseContainer>
      </ThemeProvider>
    );
  }
}

export default SetAddress;
