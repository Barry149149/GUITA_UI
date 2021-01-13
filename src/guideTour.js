import React from "react";
import Joyride from 'react-joyride';

export default function GuideTour(props) {

    return (
      <Joyride
        run={true}
        callback={() => null}
        continuous={true}
        styles={{
            options: {
                beaconSize: 42,
                overlayColor: 'rgba(0, 0, 0, 0.5)',
                primaryColor: '#aaccff',
                spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                textColor: '#333',
                width: 500,
                zIndex: 10000,
           }
        }}
        steps={[
            {
                content:
                "Click on this button to open the Code Editor",
                target: ".MuiTab-labelIcon:first-child"
            },
            {
                content:
                "Click on this button to switch to the Table Editor",
                target: ".MuiTab-labelIcon:last-child"
            },
            {
                content:
                "This is the button for opening the Setting Dialog",
                target: "#settingButton"
            }
        ]}
      />
    );
  }