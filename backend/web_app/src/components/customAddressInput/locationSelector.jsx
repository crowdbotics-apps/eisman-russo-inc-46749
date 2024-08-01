


import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Col, Row } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { CustomModal } from '../customModal/customModal';
import CustomGoogleMap from '../customMapComponent/customGoogleMap';

const LocationSelector = ({ label = "", address = "", setAddress = () => {}, setAddressLatAndLong, form, checked, style }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [position, setPosition] = useState({ lat: 48.8584, lng: 2.2945 }); // Default position
  // const [address, setAddress] = useState('');
  const [markers, setMarkers] = useState([{ lat: 48.8584, lng: 2.2945, draggable: true }]);
  const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  // useEffect(() => {
  //   console.log("Form:", form);
  //   const initialAddress = form.getFieldValue('address_1');
  //   if (initialAddress) {
  //     setAddress(initialAddress);
  //   }
  // }, [form]);

  useEffect(() => {
    form.setFieldsValue({
      address_1: address,
    });
  }, [address, form]);

  // Geocode
  const handleGeocode = async () => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setPosition({ lat, lng });
        setMarkers([{ lat, lng, draggable: true }]);
        setAddressLatAndLong([lat, lng]);
      }
    } catch (error) {
      console.error("Error in forward geocoding:", error);
    }
  };

  // Reverse Geocode
  const handleReverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const newAddress = data.results[0].formatted_address;
        setAddress(newAddress);
        setAddressLatAndLong([lat, lon]);
        return newAddress;
      }
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return "Unknown Location";
    }
  };

  // Handle modal close
  const handleOk = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div>
      <Form.Item
        name="address_1"
        label={label}
        colon={false}
        rules={checked ? [
          {
            required: true,
            message: "Please enter address",
          },
        ]
          :
          [
            {
              required: false,
              message: "Please enter address",
            },
          ]
        }
      >
        <Input
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={handleGeocode}
          style={style}
          suffix={<AimOutlined onClick={() => {
            handleGeocode();
            setModalOpen(true);
          }} />}
        />
      </Form.Item>
      <CustomModal
        open={isModalOpen}
        title="Select Location"
        width="30vw"
        height="auto"
        onCancel={handleOk}
        maskClosable={false}
        footer={null}
        centered
      >
        <Row>
          <Col lg={24}>
            <MapContainer>
              <CustomGoogleMap
                markers={markers}
                position={position}
                setPosition={(newPosition) => {
                  setPosition(newPosition);
                  setMarkers([{ lat: newPosition.lat, lng: newPosition.lng, draggable: true }]);
                }}
                handleReverseGeocode={handleReverseGeocode}
                mapHeight={"400px"}
                mapWidth={"100%"}
              />
            </MapContainer>
          </Col>
        </Row>
      </CustomModal>
    </div>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: 400px; /* Adjust the height as needed */
`;

export default LocationSelector;
