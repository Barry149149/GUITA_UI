import React, {useState} from "react";
import Joyride,{ ACTIONS, EVENTS, STATUS } from 'react-joyride';
import Typography from "@material-ui/core/Typography";


export default function GuideTour(props) {

    const handleTourFinished=()=> {
        props.setTour(1);
      }

    const [state,setState]=useState({
        index:0,
        steps:[
            {
                content:(
                    <div>
                        <Typography variant="h6">Welcome GUITA Test Case Editor.</Typography>
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
                content:"You can press these buttons to open different drawers ",
                target:"#Drawer",
                placement: 'right',
            },
            {
                content:"First Button will trigger the configuration table",
                target:"[aria-labelledby=\"tab_config\"]",
                placement: 'right',
            },
            {
                content:"Here you can select the configuration for the test case running environment",
                target:"#tabPanel_config",
                placement: 'right',
            },
            {
                content:"Second Button will show the case tree",
                target:"[aria-labelledby=\"tab_cases\"]",
                placement: 'right',
            },
            {
                content:"Here you can manage different test cases you created for this project",
                target:"#tabPanel_caseTree",
                placement: 'right',
            },
            {
                content:"Press this bar to open the list of the cases",
                target:"#caseTree",
                spotlightClicks: true,
                placement: 'right',
            },
            {
                content:"By Default, you will got the first test case, called Test 1",
                target:"#caseTree",
                placement: 'right',
            },
            {
                content:"Now, try to press this button to create a new test case",
                target:"#button_add",
                spotlightClicks: true,
                placement: 'right',
            },
            {
                content:"You can see a new tests case is created. Press the new test case",
                target:"#caseTree",
                spotlightClicks: true,
                placement: 'right',
            },
            {
                content:"You will see as the change on selected Test case, the content will change as well",
                target:"#jsonEditor"
            },
            {
                content:"Press the delete button, you will be able to delete the currently opened test case",
                target:"#button_delete",
                placement: 'right',
            },
            {
                content:"You may also download the test cases to the local storage with download button",
                target:"#button_download",
                placement: 'right',
            },
            {
                content:"In case you have created test cases in json format, you can also upload a .zip containing those test cases json into this system.",
                target:"#button_upload",
                placement: 'right',
            },
            {
                content:"Third button will open tab for changing editor mode",
                target:"[aria-labelledby=\"tab_editorMode\"]"
            },
            {
                content:"Default Editor mode is the code editor. You can implement the cases directly inside the editor. Please not that code with error(s) will not be stored",
                target:"#jsonEditor",
            },
            {
                content:"Our editor also provide Table view mode",
                target:"[aria-labelledby=\"tab_tableView\"]"
            },
            {
                content:"This table will show the command in each row",
                target:"#commandTable"
            },
            {
                content:"Each row will show the command in order, to see detail, press the down arrow on the right",
                target:"#button_expandRow",
                spotlightClicks: true,
            },
            {
                content:"To add new command, press this button",
                target:"#button_commandAdd"
            },
            {
                content:"Then selected the command through the selection bar. After you fill in the detail, press the submit button",
                target:"#select_command",
                placement: 'left',
            },
            {
                content:"To delete the command, check the checkbox on the row you want to delete, then click the trash can button that will show after you have selected it.",
                target:"#checkbox_commandTableRow",
            },
            {
                content:"Now try to add a new command by yourself",
                target:"#commandForm",
                placement: 'left',
                spotlightClicks: true,
            },
            {
                content:"You can also reorder the command simply by drag and drop on the table. Have a try!",
                target:"#commandTable",
                spotlightClicks: true,
            },
            {
                content:"Last, you can also customize this editor through the setting",
                target:"#button_setting"
            },
            {
                content:"If you want to revisit this tutorial again, you may press the help button in the driver",
                target:"#button_help"
            }
        ]
    });

    const handleJoyrideCallback = data => {
        const { action, index, status, type } = data;

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            setState({
                ...state,
                index: index + (action === ACTIONS.PREV ? -1 : 1)
            });
            if(state.index===2){
                props.setDrawerValue(0)
                props.setDrawerOpen(true)
            }
            if(state.index===4){
                props.setDrawerValue(1)
            }
            if(state.index===14){
                props.setDrawerValue(2)
            }
            if(state.index===16){
                props.setTabValue(1)
            }
            if(state.index===19){
                props.setFormOpen(true)
            }
        }
        else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            props.setRun(false);
            setState({
                ...state,
                index:0
            })
            props.setDrawerOpen(false);
           handleTourFinished();
        }

        console.log(state.index)
    };

    return (
      <Joyride
        run={props.run}
        continuous={true}
        disableOverlayClose={true}
        hideCloseButton={true}
        stepIndex={state.index}
        showProgress={true}
        showSkipButton={true}
        scrollToFirstStep={true}
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
        callback={handleJoyrideCallback}
        steps={state.steps}
      />
    );
  }