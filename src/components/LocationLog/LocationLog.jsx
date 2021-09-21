import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuth, useLogEntries } from 'hooks';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { LogEntry } from 'components';

export const LocationLog = () => {
  const { authUser } = useAuth();
  const [showPopup, setShowPopup] = useState({});
  const [addLogEntry, setAddLogEntry] = useState(null);

  const logEntries = useLogEntries(authUser?.uid);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 3,
  });

  const showAddLogMarkerPopup = event => {
    const [longitude, latitude] = event.lngLat;
    setAddLogEntry({
      longitude,
      latitude,
    });
  };

  return (
    <div>
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        onDblClick={showAddLogMarkerPopup}
      >
        {logEntries?.map(entry => (
          <React.Fragment key={entry.id}>
            <Marker latitude={entry.latitude} longitude={entry.longitude}>
              <div
                onClick={() =>
                  setShowPopup({
                    [entry.id]: true,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="marker red"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M11 19.945A9.001 9.001 0 0 1 12 2a9 9 0 0 1 1 17.945V24h-2v-4.055zM12 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
                </svg>
              </div>
            </Marker>
            {showPopup[entry.id] ? (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top"
              >
                <div className="popup">
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                  <small>
                    Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                  </small>
                </div>
              </Popup>
            ) : null}
          </React.Fragment>
        ))}
        {addLogEntry ? (
          <>
            <Marker
              latitude={addLogEntry.latitude}
              longitude={addLogEntry.longitude}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="marker green"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M11 19.945A9.001 9.001 0 0 1 12 2a9 9 0 0 1 1 17.945V24h-2v-4.055zM12 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addLogEntry.latitude}
              longitude={addLogEntry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddLogEntry(null)}
              anchor="top"
            >
              <div className="popup">
                <LogEntry
                  onClose={() => {
                    setAddLogEntry(null);
                  }}
                  location={addLogEntry}
                />
              </div>
            </Popup>
          </>
        ) : null}
      </ReactMapGL>
    </div>
  );
};
