import React, {Component} from 'react';
import { StyleSheet, Text, View, Button,Image, Dimensions,Alert } from 'react-native';
import Backend from "./Backend.js";
import { GiftedChat, InputToolbar,Send } from 'react-native-gifted-chat'
const GLOBAL = require('./Global');
import {NavigationActions,StackActions, DrawerActions} from 'react-navigation';
const window = Dimensions.get('window');
import { EventRegister } from 'react-native-event-listeners';
type Props = {};
export default class Chat extends Component<Props> {
    state = {
        messages: []
    };



    renderSend(props) {
        return (
            <Send
                {...props}
            >
                <View style={{backgroundColor:'transparent'}}>
                    <Image source={require('./chats.png')}
                    style = {{height:38,width:38,resizeMode:'contain',backgroundColor:'transparent'}}/>
                </View>
            </Send>
        );
    }

    renderInputToolbar (props) {
        //Add the extra styles via containerStyle
        return <InputToolbar {...props}

                             textInputStyle={{ color: "#fff" }}
                             containerStyle={{backgroundColor:'rgba(0,0,0,0.6)',margin:10,borderRadius:20,borderWidth:0,color:'white',marginBottom:0}} />
    }




    renderBubble(props) {

        return (
            <View style = {{backgroundColor:'rgba(0,0,0,0.6)',borderRadius:12,marginBottom:6,borderColor:'#979797',borderWidth:1,flexDirection:'row'}}>


                <Text style={{color:'#7BAAED',fontFamily:GLOBAL.medium,fontSize:16,margin:4,marginLeft:8}}>{props.currentMessage.user.name} :</Text>


                <Text style={{color:'white',fontFamily:GLOBAL.medium,fontSize:16,margin:4}}>{props.currentMessage.text}</Text>

            </View>
        );
    }
    componentWillMount() {

    }


    renderMessages = (msg) => {
    //  alert(JSON.stringify(msg.user._id))

let message = msg.currentMessage
var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

console.log("single message", message)
return (
  <View>
    {/* <Text>{item.message}</Text> */}
    {message.user.user_id === GLOBAL.user_id?
      <View style={styles.left_bubble}>
        {/* <Text>{message.user.name}</Text> */}
        <View style = {{backgroundColor:'rgba(0,0,0,0.6)',borderRadius:12,marginBottom:6,borderColor:'#979797',borderWidth:0,flexDirection:'row',marginLeft:6,}}>
            <Text style={{color:'#7BAAED',fontFamily:GLOBAL.medium,fontSize:12,margin:4,marginLeft:8}}>{message.user.name} :</Text>
            <Text style={{color:'white',fontFamily:GLOBAL.medium,fontSize:12,margin:4,marginRight:8}}>{message.text}</Text>

        </View>

      </View>
      :
      <View style = {{backgroundColor:'rgba(0,0,0,0.6)',borderRadius:12,marginBottom:6,borderColor:'#979797',borderWidth:0,flexDirection:'row',marginLeft:6,width:window.width - 126}}>

      {message.user_id == GLOBAL.doctor_id && (
                <Text style={{color:'#e75480',fontFamily:GLOBAL.medium,fontSize:12,margin:4,marginLeft:8,padding:1,lineHeight:18}}>{message.user.name} : {message.text}</Text>
      )}


      {message.user_id != GLOBAL.doctor_id && (
          <Text style={{color:'white',fontFamily:GLOBAL.medium,fontSize:12,margin:4,marginLeft:8,padding:1,lineHeight:18}}>{message.user.name} : {message.text}</Text>
      )}



      </View>
    }
  </View>
)}
_YesLogout=()=>{




      this.props
          .navigation
          .dispatch(StackActions.reset({
              index: 0,
              actions: [
                  NavigationActions.navigate({
                      routeName: 'Login',
                      params: { someParams: 'parameters goes here...' },
                  }),
              ],
          }))





  }
    render() {
        if (GLOBAL.user_id == "" ){
            return(
                <View style={{flex:1}}>
                    <Text style = {{color:'black',fontSize:22,alignSelf:'center',marginTop:window.height/2,textAlign:'center'}}>
                        Please Login First to Join Chat.
                    </Text>
                </View>
            )
        }

        return (
            <GiftedChat
                renderUsernameOnMessage = {true}
                messages={this.state.messages}
                renderInputToolbar={this.renderInputToolbar}
                renderBubble={this.renderBubble}
                renderSend = {this.renderSend}
                 renderMessage={(message) => this.renderMessages(message)}
                onInputTextChanged = {text =>{
                    Backend.updateTyping(text)

                    // alert(text)

                }

                }
                onSend={message => {

                  if (GLOBAL.user_id == "0" ){

                        Alert.alert(' UNREGISTERED USER','You seem to be an Unregistered User. To Use DISKUSS kindly create an account and Log In.',
                            [{text:"Cancel"},
                                {text:"Yes", onPress:()=>EventRegister.emit('myCustomEvent', 'it works!!!')
                                },
                            ],
                            {cancelable:false}
                          )
                  }else {
                    Backend.sendMessage(message);
                  }
                }}

                user={{
                    _id: GLOBAL.user_id,
                    name: GLOBAL.myname,
                    avatar:GLOBAL.dimage,
                }}
            />
        );
    }


    componentDidMount() {
      Backend.loadMessages(message => {

          if (message.text != ""){
            this.setState(previousState => {
                return {
                    messages: GiftedChat.append(previousState.messages, message)
                };
            });
          }



        });
    }
    componentWillUnmount() {
        Backend.closeChat();
    }
}
