/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import styled, { ThemeProvider } from 'styled-components';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
import { Card, Form, Input, FormGroup, Label, Button } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BaseContainer from '../../components/layout/BaseContainer';
import palletes from '../../theme';
import ArrowBackIcon from '../../components/icons/ArrowBackIcon';

Geocode.setApiKey(process.env.NEXT_PUBLIC_G_KEY);

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
const SetAddress = () => {
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [regency, setRegency] = useState('');
  const [directions, setDirections] = useState(null);
  const [openInfo, setOpenInfo] = useState(true);
  const [mapLoc, setMapLoc] = useState({ lat: 0, lang: 0 });
  const [markerLoc, setMarkerLoc] = useState({ lat: 0, lang: 0 });
  const router = useRouter();

  const onToggleOpen = () => {
    setOpenInfo(false);
  };

  const setMarkerLocation = (lat, lang) => {
    setMapLoc({ lat, lang });
    setMarkerLoc({ lat, lang });
  };

  const getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && addressArray[i].types[0] === 'administrative_area_level_2') {
        city = addressArray[i].long_name;
        return city;
      }
    }
    return '';
  };

  // const getArea = (addressArray) => {
  //   let area = '';
  //   for (let i = 0; i < addressArray.length; i++) {
  //     if (addressArray[i].types[0]) {
  //       for (let j = 0; j < addressArray[i].types.length; j++) {
  //         if (
  //           addressArray[i].types[j] === 'sublocality_level_1' ||
  //           addressArray[i].types[j] === 'locality'
  //         ) {
  //           area = addressArray[i].long_name;
  //           return area;
  //         }
  //       }
  //     }
  //   }
  // };

  const getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let j = 0; j < addressArray.length; j++) {
        if (
          addressArray[i].types[0] &&
          addressArray[i].types[0] === 'administrative_area_level_1'
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
    return '';
  };

  const handleDragEnd = (e) => {
    onToggleOpen();
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();

    Geocode.fromLatLng(newLat, newLng)
      .then((resp) => {
        const newAddress = resp.results[0].formatted_address;
        const addressArray = resp.results[0].address_components;
        const newRegency = getCity(addressArray);
        const newProvince = getState(addressArray);
        setAddress(newAddress);
        setRegency(newRegency);
        setProvince(newProvince);
        setMarkerLocation(newLat, newLng);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const directionSetup = async () => {
    const { lat, lang } = markerLoc;
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
            setDirections(result.routes[0].legs[0]);
          } else {
            console.error(`error fetching directions`);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await directionSetup();
      const payload = {
        address,
        regency,
        province,
        coords: markerLoc,
        steps: {
          distance: directions && directions.distance.value,
          duration: directions && directions.duration.value,
        },
      };
      console.log(payload);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMarkerLocation(position.coords.latitude, position.coords.longitude);

        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
          .then((resp) => {
            directionSetup();
            const newAddress = resp.results[0].formatted_address;
            const addressArray = resp.results[0].address_components;
            const newRegency = getCity(addressArray);
            const newProvince = getState(addressArray);
            setAddress(newAddress);
            setRegency(newRegency);
            setProvince(newProvince);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      console.error('Geolocation is not supported by this browser!');
    }
  });

  const onPlaceSelected = (place) => {
    const newAddress = place.formatted_address;
    const addressArray = place.address_components;
    const newRegency = getCity(addressArray);
    const newProvince = getState(addressArray);
    setAddress(newAddress);
    setRegency(newRegency);
    setProvince(newProvince);
    setMarkerLoc(place.geometry.location.lat(), place.geometry.location.lng());
  };

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
            onPlaceSelected={onPlaceSelected}
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
            onDragEnd={handleDragEnd}
            position={{ lat: markerLoc.lat, lng: markerLoc.lang }}
          >
            {openInfo && (
              <InfoWindow onCloseClick={onToggleOpen}>
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
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_G_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `320px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <MyCard className="px-4 py-3">
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label className="font-weight-bold">Alamat</Label>
              <Input style={{ fontSize: '14px' }} value={address} type="textarea" disabled />
            </FormGroup>
            <SubmitBtn className="font-weight-bold" type="submit">
              Simpan
            </SubmitBtn>
          </Form>
        </MyCard>
      </BaseContainer>
    </ThemeProvider>
  );
};

export default SetAddress;
