const {createSlice} = require('@reduxjs/toolkit');

const AppReducer = createSlice({
  name: 'AppData',
  initialState: {
   
    appData:[],
   
    appLoading:true,
    sensorConnection:true,
    client:null,
    deviceAdded:false
  },
  reducers: {
    setAppData(state, action) {
      const app = action.payload;
      return {...state, appData: app,appLoading:false};
    },

    modifySensorConn(state, action) {
      return {...state, sensorConnection: action.payload};
    },
    setClient(state, action) {
      return {...state, client: action.payload};
    },
    setdeviceAdded(state, action) {
      // console.log(action.payload)
      return {...state, deviceAdded: action.payload};
    },
  },
});
export const {setAppData,modifySensorConn,setClient,setdeviceAdded} =
AppReducer.actions;
export default AppReducer.reducer;
