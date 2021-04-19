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
    maxHeight: 650,
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