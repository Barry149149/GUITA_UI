import React from "react";
import Joyride from 'react-joyride';

export default function GuideTour(props) {

    return (
      <Joyride
        run={true}
        callback={() => null}
        continuous={true}
        showProgress={true}
        disableOverlayClose={true}
        hideCloseButton={true}
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
                content:(
                    <div>
                        <h6>"Welcome GUITA Test Case Editor."</h6>
                        <p>If you are first time to use this system, please continue with our tutorial</p>
                        <p>You cannot Skip from middle during the tutorial</p>
                    </div>
                ),
                target:"body",
                placement: 'center',
                showSkipButton:true,
                disableBeacon: true,
            },
            {
                content:"You can click these buttons to open different drawers ",
                target:"#Drawer",
            },
            {
                content:"Now press the first button,and then press Next",
                target:"[aria-labelledby=\"tab_config\"]",
                spotlightClicks: true,
            },
            {
                content:"Here you can select the configuration for the test case running environment",
                target:"#tabPanel_config"
            },
            {
                content:"Now press the second button,and then press Next",
                target:"[aria-labelledby=\"tab_cases\"]",
                spotlightClicks: true,
            },
            {
                content:"Here you can manage different test cases you created for this project",
                target:"#tabPanel_caseTree"
            },
            {
                content:"By Default, you will got the first test case, called Test 1",
                target:"#caseTree",
            }
        ]}
      />
    );
  }