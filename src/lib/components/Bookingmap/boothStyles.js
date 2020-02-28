


export const styleMapping = {

  322 : "style1", //light
  322 : "style2", //standard
  323 : "style3", //hot
  324 : "style4", //superhot
  325 : "style5", //grand
  326 : "style6", //networking
  328 : "style6", //stage
  329 : "style6", //ultra / premium grand

}

export const getStylingName = (groupId) => {
  return groupId in styleMapping ? styleMapping[groupId] : "style1"
}

const styles = {

  booth: {
    position: 'absolute',
    display: 'table',

    backgroundColor: 'lightgreen',
    border: '1px solid green',
    color: 'black',

    zIndex: 20,
    borderRadius: 3,
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    textAlign: 'center',
    boxShadow: '1px 1px #555555',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },

  boothOnLegend : {
    position: 'relative',
    marginRight : 7,
    marginBottom: 7
  },
  
  boothHold: {
    backgroundColor: '#D3D3D3 !important',
    borderColor: '#999 !important',
    color: '#666666 !important'
  },

  boothSold: {
    backgroundColor: '#D3D3D3 !important',
    borderColor: '#999 !important',
    color: '#666666 !important'
  },

  boothUnavailable: {
    backgroundColor: '#666666 !important',
    borderSize: 0,
    boxShadow : 'none'
  },

  boothSelected: {
    backgroundColor: 'blue !important',
    color: 'white !important',
    border: '3px solid black !important'
  },

  boothText: {
    display: 'table-cell',
    verticalAlign: 'middle',
    lineHeight: 'normal',
    fontWeight: 600,
    fontFamily: 'verdana, arial, sans-serif',
    fontSize: 8
  },

  boothLogotype: {},

  cname: {
    display: 'block'
  },


  style1: {
    backgroundColor: "#5fe85d",
    color :  "#ffffff",
    borderColor: "#4bb749",
  },

  style2: {
    backgroundColor: "#55cf52",
    color :  "#ffffff",
    borderColor: "#409c3e"
  },

  style3: {
    backgroundColor: "#4bb749",
    color :  "#ffffff",
    borderColor: "#358234"
  },

  style4: {
    backgroundColor: "#409c3e",
    color :  "#ffffff",
    borderColor: "#004500"
  },

  style5: {
    backgroundColor: "#358234",
    color :  "#ffffff",
    borderColor: "#004500"
  },

  style6 : {
    backgroundColor: "#30bfca",
    color :  "#ffffff",
    borderColor: "#1e7980"

  },


}


export default styles
