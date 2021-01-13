import React from "react";
import Joyride, {ACTIONS, EVENTS, STATUS} from 'react-joyride';

export default function GuideTour(props) {

    return (
      <Joyride
        run={true}
        callback={() => null}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        styles={{
            options: {
                beaconSize: 42,
                overlayColor: 'rgba(0, 0, 0, 0.5)',
                primaryColor: '#6688ff',
                spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                textColor: '#333',
                width: 400,
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
                content:"Buttons for case tree",
                target:"#Drawer"
            },
        ]}
      />
    );
  }