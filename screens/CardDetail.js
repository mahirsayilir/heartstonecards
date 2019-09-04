import React , {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import FlipCard from 'react-native-flip-card';

import {connect} from 'react-redux';

class CardDetail extends Component{
  constructor(props) {
    super(props);
  }
  static navigationOptions =({ navigation }) => {
    const mechanic = navigation.getParam('mechanic');
    let headerTitle = mechanic;
    let headerTitleStyle = {color:'#fff',fontWeight:'bold'};
    let headerStyle = {backgroundColor:'#2c3e50'};
    let headerTintColor = "#fff";
    return {headerTitle,headerStyle,headerTitleStyle,headerTintColor};
  }
  render(){
    const { navigation } = this.props;
    const mechanic = navigation.getParam('mechanic');
    return(
      <View style={styles.body}>
        <FlatList
          data = {this.props.cards}
          keyExtractor = {(item,index)=>item.cardId}
          renderItem={({item,index})=>{
            if (item.mechanics != null) {
              if (item.img !=null && item.mechanics[0].name == mechanic) {
                return (
                  <FlipCard>
                    {/* Face Side */}
                    <View>
                      <Image source={{uri:item.img}} style={{width:200,height:300}} />
                    </View>
                    {/* Back Side */}
                    <View style={styles.info}>
                      <Text style={{color:'#FFF'}}>Name : {item.name}</Text>
                      <Text style={{color:'#FFF'}}>Class : {item.playerClass}</Text>
                      <Text style={{color:'#FFF'}}>Type : {item.type}</Text>
                      <Text style={{color:'#FFF'}}>Faction : {item.faction}</Text>
                    </View>
                  </FlipCard>
                )
              }
            }


          }}></FlatList>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  body : {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor :'#2c3e50'
  },
  info : {
    height : 300,
    width  : 200,
    backgroundColor : '#736259',
    borderRadius : 5,
    flex:1,
    justifyContent:'center',
    alignItems : 'center',
    padding : 7,
    marginTop:10
  }
})
function mapStateToProps(state){
  return {
    cards  : state.card.cards
  }
}

export default connect(mapStateToProps)(CardDetail);
