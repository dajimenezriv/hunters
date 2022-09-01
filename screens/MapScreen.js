// logic
import { Marker, Callout } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

// gui
import { View } from 'react-native';
import { Svg, Image as ImageSvg } from 'react-native-svg';

// images
const markerImage = require('assets/marker.png');

const url = 'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/stag.png?alt=media&token=23177268-9207-4b09-b5b4-9aa39c2a3b84';

const initialRegion = {
  latitude: 39.939998,
  longitude: -3.8168354,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

function renderRandomMarkers(n) {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = initialRegion;
  return new Array(n).fill().map((x, i) => (
    <Marker
      key={i}
      coordinate={{
        latitude: latitude + (Math.random() - 0.5) * latitudeDelta,
        longitude: longitude + (Math.random() - 0.5) * longitudeDelta
      }}
      image={markerImage}
    >
      <Callout tooltip onPress={() => console.log('Open post info')}>
        <View
        style={{
          padding: 5,
          backgroundColor: 'white',
          marginBottom: 10,
        }}>
          <Svg width={100} height={100}>
            <ImageSvg
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              href={{ uri: url }}
            />
          </Svg>
        </View>
      </Callout>
    </Marker>
  ));
}

export default function MapScreen() {
  return (
    <MapView initialRegion={initialRegion} style={{ flex: 1 }}>
      {renderRandomMarkers(60)}
    </MapView>
  )
}
