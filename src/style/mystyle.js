export const TableRowStyle = {
  commandId: {
    color: (props) => (props.isItemOpened ? '#3f51b3' : 'gray'),
    // color: "gray",
    fontFamily: 'Inconsolata',
    fontWeight: (props) => (props.isItemOpened ? 'bold' : 'normal')
  },
  commandName: {
    fontFamily: 'Inconsolata',
    color: 'dimgrey'
  },
  commandDescription: {
    fontSize: 15,
    color: '#3f51b3',
    fontWeight: 'bold',
    lineHeight: '120%'
  },
  variable: {
    fontFamily: 'Inconsolata',
    color: 'steelblue'
  },
  stub: {
    color: 'lightgray',
    fontWeight: 'normal'
  },
  score: {
    fontFamily: 'Inconsolata',
    color: 'dimgrey'
  },
  detailContainer: {
    // backgroundColor: '#f5f5f5',
    padding: 0
  },
  mainContainer: {
    backgroundColor: (props) => (props.isItemOpened ? '#fbfbfb' : 'white'),
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: 'aliceblue'
    },
    fontFamily: 'Lato',
    cursor: 'pointer'
  },
  openButton: {
    width: 36,
    height: 36,
    paddingBottom: 8,
    paddingTop: 8
  }
}

export const TableHeaderCellStyle = {
  color: '#090909',
  fontWeight: 'bold',
  // backgroundColor: "#f5f5f5",
  borderBottomColor: 'lightgray',
  borderBottom: '2px solid',
  paddingBottom: 8,
  paddingTop: 8,
  fontFamily: 'Lato'
}

export const DetailPaneStyle = {
  container: {
    // borderTopColor: "white",
    // borderTopWidth: 2,
    // borderTopStyle: "solid",
    borderBottomColor: 'darkgray',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    padding: 20,
    color: 'dimgrey',
    backgroundColor: '#fbfbfb',
    fontFamily: 'Lato'
    // backgroundColor: "rgba(240, 248, 255, 0.5)"
  },
  header: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    lineHeight: '1.5em'
  },
  parameter: {
    lineHeight: '1.5em'
  },
  emph: {
    fontWeight: 'bold'
  },
  divider: {
    margin: '12px 0px'
  }
}

export const FormStyle = {
  formControl: {
    // margin: theme.spacing(2),
    // marginLeft: theme.spacing(2.5),
    // minWidth: 120
  },
  form: {
    minHeight: 180,
    // marginTop: 0,
    // width: 240,
    padding: 24,
    paddingTop: 0,
    paddingBottom: 12,
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: "aliceblue",
    height: '100%'
  },
  titleBar: {
    display: 'flex',
    // height: 48,
    width: '100%',
    padding: 0,
    paddingTop: 16,
    justifyContent: 'space-between'
  },
  closeButton: {
    // position: 'absolute',
    // top: 0,
    // right: -16,
    width: '24px',
    height: '24px',
    color: 'lightgray'
  }
}
