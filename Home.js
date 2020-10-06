import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text,TextInput, View,FlatList,ActivityIndicator,Image,TouchableOpacity ,Alert,Container,Linking ,ImageBackground , Dimensions} from 'react-native';
const window = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from 'react-native-button';
import ActionSheet from 'react-native-actionsheet';
 import { BackHandler } from 'react-native';
 import Dialog, { DialogContent } from 'react-native-popup-dialog';
 import { EventRegister } from 'react-native-event-listeners';
 var DeviceInfo = require('react-native-device-info');
 import requestCameraAndAudioPermission from './permission';
 import {withNavigationFocus} from 'react-navigation';
import DatePickers from 'react-native-date-picker';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Carousel,{ Pagination } from 'react-native-snap-carousel';
import NetInfo from "@react-native-community/netinfo";
const GLOBAL = require('./Global');
import moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type Props = {};
const options = [
  'Male',
  'Female',
  'Cancel',
]
 class Home extends Component<Props> {
  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      username:'',
      gender:'',
      dates:'',
      time:'',
      show:false,
      connected:true,
      date:new Date(),
      loading:false,
      myBanners:[],
      puja:[],
      visible_consult:false,
      getlocation:[],
      visible:false,
      live:[],

    }

}

hideLoading() {
   this.setState({loading: false})
 }

showLoading() {
   this.setState({loading: true})
}
showActionSheet = () => {
   this.ActionSheet.show()
 }
handleBackButton = () => {
    if (this.props.isFocused == true){
    BackHandler.exitApp()
    }

console.log(this.props.isFocused)
}

handleBackButtonClick = () =>{
Alert.alert('Tenon Prime!','Are you sure you want to Exit?',
    [{text:"Cancel"},
        {text:"Yes", onPress:()=>BackHandler.exitApp()
        },
    ],
    {cancelable:false}
)
return true
}


forConsult=()=>{

  const url = 'http://139.59.76.223/shaktipeeth/api/home_user_dynamics'
  //  this.showLoading()
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: GLOBAL.user_id,

    })
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(JSON.stringify(responseJson));
//          this.hideLoading();
      if (responseJson.status == true) {



            // GLOBAL.is_chat_or_video_start = responseJson.is_chat_or_video_start
            // GLOBAL.booking_id = responseJson.booking_id
            // GLOBAL.chat_g_id = responseJson.chat_g_id
            // GLOBAL.is_booking = responseJson.is_booking
            // GLOBAL.get_expert_name_ = responseJson.get_expert_name_
            // GLOBAL.booking_type = responseJson.booking_type
            // GLOBAL.expert_id = responseJson.expert_id


        if(responseJson.is_booking == "1"){
            this.setState({live:responseJson.live})
          if (this.state.visible_consult == false){

             this.setState({visible_consult : true})
           }
        //  this.dialogComponents.show()

      }else {
          this.setState({live:[]})
          EventRegister.emit('myCustomEvents', "hi")
      }
       this.forConsult() // recursive

      } else {

      }
    })
    .catch(error => {
       this.forConsult()
//        this.hideLoading();
      console.error(error);
    });

}

_handleStateChange = (state) =>{
    this.forConsult()
}

selectsort = (index) =>{
  var dd = ""
  if (index == 0){
    dd = "A to Z"
  }

  if (index == 1){
    dd = "Z to A"
  }
  this.showLoading()
  const url = 'http://139.59.76.223/shaktipeeth/api/home_user'
  fetch(url, {
      method: 'POST',
      headers: {
        'HTTP_X_API_KEY': 'ShaktipeethAUTH@##@17$',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: GLOBAL.user_id,
       deviceID:DeviceInfo.getUniqueId(),
deviceType:Platform.OS,
deviceToken:GLOBAL.firebaseToken,
model_name:"",
carrier_name:"",
device_country:"",
device_memory:"",
has_notch:"",
manufacture:"",
sort:dd,

      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      this.hideLoading()
      if (responseJson.status == true) {
         this.setState({ myBanners: responseJson.banners})
         this.setState({ puja: responseJson.puja})
      } else {
}
    })
    .catch((error) => {
        this.hideLoading()
      console.error(error);
    });
}
componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
componentDidMount() {
  this.listenerss = EventRegister.addEventListener('myCustomEvents', (data) => {
           this.props.navigation.goBack()
       })
  requestCameraAndAudioPermission().then(_ => {
               console.log('requested!');
           });

  this.props.navigation.addListener('willFocus', this._handleStateChange);
   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    this.setState({connected:state.isConnected})

var k = JSON.stringify({
  user_id: GLOBAL.user_id,
 deviceID:DeviceInfo.getUniqueId(),
deviceType:Platform.OS,
deviceToken:GLOBAL.firebaseToken,
model_name:"",
carrier_name:"",
device_country:"",
device_memory:"",
has_notch:"",
manufacture:"",
sort:"",

})

console.log(k)


     if (state.isConnected  == true){
       this.forConsult()
       this.showLoading()
       const url = 'http://139.59.76.223/shaktipeeth/api/home_user'
       fetch(url, {
           method: 'POST',
           headers: {
             'HTTP_X_API_KEY': 'ShaktipeethAUTH@##@17$',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             user_id: GLOBAL.user_id,
            deviceID:DeviceInfo.getUniqueId(),
deviceType:Platform.OS,
deviceToken:GLOBAL.firebaseToken,
model_name:"",
carrier_name:"",
device_country:"",
device_memory:"",
has_notch:"",
manufacture:"",
sort:"",

           }),
         }).then((response) => response.json())
         .then((responseJson) => {
           this.hideLoading()
           if (responseJson.status == true) {
              this.setState({ myBanners: responseJson.banners})
              this.setState({ puja: responseJson.puja})
           } else {
}
         })
         .catch((error) => {
             this.hideLoading()
           console.error(error);
         });
     }

  });




}

_renderItems ({item, index}) {
//  alert(JSON.stringify(item))
        return (
            <View style={{width:wp('95%'), height:hp('20%'),borderRadius: 10,marginRight:10,marginTop:10,
            elevation:5,backgroundColor:'white', shadowColor:'black',marginBottom:10, flexDirection:'column',
            justifyContent:'center'}}>


              <Image style={{width:'100%', height:'100%',borderRadius:5,}} source={{uri : item}}/>


            </View>
        );
    }


start = () =>{
  if (GLOBAL.is_video_start == "1"){
  const url = 'http://139.59.76.223/shaktipeeth/api/start_status_online_consult'
  fetch(url, {
      method: 'POST',
      headers: {
        'HTTP_X_API_KEY': 'ShaktipeethAUTH@##@17$',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        booking_id: GLOBAL.booking_id,
        what:"2",
        from:"user"

      }),
    }).then((response) => response.json())
    .then((responseJson) => {

      if (responseJson.status == true) {
        this.props.navigation.navigate("VideoCall", {
                    channelName: GLOBAL.chat_g_id,
                    onCancel: (message) => {
                        this.setState({
                            visible: true,
                            message
                        });
                    }
                })
      } else {
 }
    })
    .catch((error) => {

      console.error(error);
    });
  }else{
    this.props.navigation.navigate("VideoCall", {
                channelName: GLOBAL.chat_g_id,
                onCancel: (message) => {
                    this.setState({
                        visible: true,
                        message
                    });
                }
            })
  }
}

selectedFirst = (item) =>{
  //alert(JSON.stringify(item))
  GLOBAL.poojaid = item.id
  this.setState({getlocation:item.get_locations})
  if (item.get_locations.length == 0){
    alert('No venue available')
  }else{
      this.setState({visible:true})
  }

//  this.props.navigation.navigate('PujaDetail',item)
}


selectedFirstlive = (item) =>{


  GLOBAL.chat_g_id = item.channel_name
  GLOBAL.priest_name =  item.priest_name
  GLOBAL.booking_id = item.booking_id
  GLOBAL.is_video_start =  item.is_video_start

  if (item.is_video_start == "1"){
  const url = 'http://139.59.76.223/shaktipeeth/api/start_status_online_consult'
  fetch(url, {
      method: 'POST',
      headers: {
        'HTTP_X_API_KEY': 'ShaktipeethAUTH@##@17$',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        booking_id: item.booking_id,
        what:"2",
        from:"user"

      }),
    }).then((response) => response.json())
    .then((responseJson) => {

      if (responseJson.status == true) {
        this.props.navigation.navigate("VideoCall", {
                    channelName: GLOBAL.chat_g_id,
                    onCancel: (message) => {
                        this.setState({
                            visible: true,
                            message
                        });
                    }
                })
      } else {
 }
    })
    .catch((error) => {

      console.error(error);
    });
  }else{
    this.props.navigation.navigate("VideoCall", {
                channelName: GLOBAL.chat_g_id,
                onCancel: (message) => {
                    this.setState({
                        visible: true,
                        message
                    });
                }
            })
  }
}


live  = ({item, index}) => {

  return (
    <TouchableOpacity
    onPress={() => this.selectedFirstlive(item)}
    activeOpacity={0.99}>
 <View style = {{width:'90%',elevation:10,margin:'5%',height:100,backgroundColor:'white',marginTop:'-1%'}}>

<Image style={{width:wp(11),backgroundColor:'transparent', height:hp(9), resizeMode:'contain',alignSelf:'center'}} source={require('./Resources/live.jpg')}/>
<Text style = {{fontSize:14,fontFamily:'Nunito-Bold',color:'#000000',textAlign:'center'}}
numberOfLines={2}>
{item.puja_name}
</Text>

<Text style = {{fontSize:14,fontFamily:'Nunito-Bold',color:'#000000',textAlign:'center'}}
numberOfLines={2}>
Click here to view live puja
</Text>

 </View>
</TouchableOpacity>



    )
  }





    _renderItemproducts = ({item, index}) => {

            return (


                <TouchableOpacity style={{width:wp('30.3%'), margin:5}}
                onPress={() => this.selectedFirst(item)}
                activeOpacity={0.99}>
                    <View   style  = {{width:'100%',backgroundColor:'white',shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,borderRadius:8,
                        shadowRadius: 3.84,elevation:4, flexDirection:'column'
                    }}
                    >
                        <Image source= {{uri :item.image}}
                               style  = {{width:"100%", height:100}}/>

                        <Text style = {{fontSize:12,marginTop:3,fontFamily:'Nunito-Bold',color:'#293440',textAlign:'center',width:'90%',marginBottom:8}}>
                            {item.name}
                        </Text>

                    </View>


                </TouchableOpacity>
            )
        }

selectionss = (item,index) =>{
  GLOBAL.mylocation = item.location_name
  GLOBAL.locationid = item.id
  this.setState({visible:false})
  this.props.navigation.navigate('PujaDetail',GLOBAL.poojaid)
//  alert(JSON.stringify(item))
}

        _renderItemproductss = ({item, index}) => {

                return (


      <TouchableOpacity onPress= {()=>this.selectionss(item,index)}>
                        <View style = {{width:'100%'}}
                        >


                            <Text style = {{fontSize:15,marginTop:8,fontFamily:'Nunito-Bold',color:'#909090',marginLeft:8}}>
                                {item.location_name}
                            </Text>
                            <View style = {{width:'100%',height:1,backgroundColor:'grey',marginBottom:7}}>
                            </View>

                        </View>


      </TouchableOpacity>
                )
            }
  render() {
    if(this.state.loading){
           return(
               <View style={{flex:1,backgroundColor:'white'}}>
                   <ActivityIndicator style = {styles.loading}

                                      size="large" color= 'orange' />
               </View>
           )
       }
       if(this.state.connected == false){
              return(
                  <View style={{flex:1,backgroundColor:'white'}}>
                  <Text style = {{fontSize:20,fontFamily:'Nunito-Bold',color:'#000000',marginLeft:15,marginTop:-14,alignSelf:'center',marginTop:200}}
                  numberOfLines={2}>
                  You are not connected to Internet
                  </Text>
                  </View>
              )
          }
    return (
    <KeyboardAwareScrollView style = {{width:window.width}}>
    <ImageBackground style = {{width :wp('100%'),height:60}}
                         source={require('./Resources/header.png')}>
                             <View style ={{width:wp('100%'),flexDirection:'row',justifyContent:'space-between',height:60}}>

 <View style={{margin:10, width:wp('95%'), height:'auto', flexDirection:'row',justifyContent:'space-between',}}>
 <TouchableOpacity onPress={() =>this.props.navigation.toggleDrawer()}>
                     <Image source={require('./Resources/drawer.png')}
                            style  = {{width:30, height:30,margin:5,resizeMode:'contain'}}
                     />
                     </TouchableOpacity>
                     <Text style = {{width:wp('20%'),color:'white',fontSize: 17,fontFamily:'Nunito-SemiBold', alignSelf:'center',textAlign:'center',}}>
                                      HOME
                                      </Text>
                                      <View style = {{flexDirection:'row',marginTop:5}}>
                                      <TouchableOpacity
                                      onPress={() => this.showActionSheet()}
                                      activeOpacity={0.99}>
                                      <Image source={require('./sort.png')}
                                             style  = {{width:22, height:22,margin:5,resizeMode:'contain'}}
                                      />
                                      </TouchableOpacity>


                                      <TouchableOpacity
                                      onPress={() => this.props.navigation.navigate('Search')}
                                      activeOpacity={0.99}>
                                      <Image source={require('./Resources/search.png')}
                                             style  = {{width:22, height:22,margin:5,resizeMode:'contain'}}
                                      />
                                        </TouchableOpacity>
                                      <TouchableOpacity
                                      onPress={() => this.props.navigation.navigate('Cart')}
                                      activeOpacity={0.99}>
                                      <Image source={require('./Resources/cart.png')}
                                             style  = {{width:22, height:22,margin:5,resizeMode:'contain'}}
                                      />
                                      </TouchableOpacity>


                                      </View>

 </View>

                             </View>

                         </ImageBackground>

                         <View>

                                          <View style = {{width :wp('100%'),alignSelf:'center',alignItems:'center',margin:0,marginTop:-4}}>

                         <Carousel
                                                     ref={(c) => { this._carousel = c; }}
                                                     data={this.state.myBanners}
                                                     renderItem={this._renderItems}
                                                     sliderWidth={wp('95%')}
                                                     itemWidth={wp('95%')}
                                                     autoplay={true}

                                                     loop={true}
                                                     layout={'default'} layoutCardOffset={18}
                                                     onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                                                   />
                                                   </View>

                                                   {this.state.visible_consult == true && (

                                                     <FlatList style= {{flexGrow:0,marginTop:hp('1%'),}}
                                                               data={this.state.live}
                                                               keyExtractor = { (item, index) => index.toString() }
                                                               renderItem={this.live}
                                                               extraData={this.state}
                                                     />
                                                   )}


  <Text style = {{fontSize:20,fontFamily:'Nunito-Bold',color:'#000000',marginLeft:15,marginTop:-10}}
  numberOfLines={2}>
  Puja's
  </Text>
  <View style={{width:wp('95%'), justifyContent:'space-between', flexDirection:'row', marginTop:hp('-1%'),alignSelf:'center'}}>



                   <FlatList style= {{flexGrow:0,marginTop:hp('1%'),}}
                             data={this.state.puja}
                             numColumns={3}
                             keyExtractor = { (item, index) => index.toString() }
                             renderItem={this._renderItemproducts}
                             extraData={this.state}
                   />

    </View>

    <ActionSheet
         ref={o => this.ActionSheet = o}
         title={'Select'}
         options={['A-Z', 'Z-A', 'cancel']}
         cancelButtonIndex={2}

         onPress={(index) => {

         this.selectsort(index)
         /* do something */ }}
       />
    <Dialog
       visible={this.state.visible}
       onTouchOutside={() => {
         this.setState({ visible: false });
       }}
     >
       <DialogContent>
       <View style = {{width:300}}>
       <FlatList style= {{flexGrow:0}}
                 data={this.state.getlocation}

                 keyExtractor = { (item, index) => index.toString() }
                 renderItem={this._renderItemproductss}
                 extraData={this.state}
       />
      </View>
       </DialogContent>
     </Dialog>
                   </View>
  </KeyboardAwareScrollView>

    );
  }
}
export default withNavigationFocus(Home);
const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'white'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    AndroidSafeArea: {
       flex: 0,
       backgroundColor: '#FAFAFA',
       paddingTop: Platform.OS === "android" ? 0 : 0
   },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    account :{
        marginTop : 0,
        textAlign:'center',
        alignSelf:'center',

        fontSize: 16,

        color : 'black',
        fontFamily:GLOBAL.semi,



    } ,
    createaccount :{

        fontSize: 14,
        textAlign : 'center',
        marginTop : 8,
        marginBottom:10,

        color : '#1E1F20',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 14,
        textAlign : 'center',
        marginTop : 30,
        color : '#ff9445',




    } ,
})
