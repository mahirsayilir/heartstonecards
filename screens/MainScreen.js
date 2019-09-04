import React , {Component} from 'react';
import {
  StyleSheet,
  View ,
  Text,
  Button,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import axios from 'axios';

class MainScreen extends Component{
  constructor(props) {
    super(props);
    this.getCardData = this.getCardData.bind(this);

    this.state = {
      loading : false,
      mechanics : []
    }
  }

  static navigationOptions =({ navigation }) => {
    let headerTitle = 'Heartstone Cards';
    let headerTitleStyle = {color:'#fff',fontWeight:'bold'};
    let headerStyle = {backgroundColor:'#2c3e50'};
    let headerRight =
      <View>
      <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
        <Text style={{color:'#fff',marginRight:10}}>Searh Cards</Text>
      </TouchableOpacity>
      </View>;

    return {headerTitle,headerStyle,headerTitleStyle,headerRight};
  }

  componentWillMount(){
    this.getCardData();
  }

  getCardData = async () =>{
    this.setState({loading : true});
    const getCards = await axios.get('https://omgvamp-hearthstone-v1.p.rapidapi.com/cards',{
      'headers' : {
        "x-rapidapi-host" : "omgvamp-hearthstone-v1.p.rapidapi.com",
  	    "x-rapidapi-key"  : "a99fea1aa2mshc46860600f806f2p1be98fjsnbb4504085ebb"
      }
    }).then((response) =>{
      this.setState({loading:false});
      this.props.updateCards(response.data.Basic);
    }).catch((error) => {console.log(error)})
    this._createMechanicList();
  }
  _createMechanicList(){
    this.props.cards.map((item,index)=>{
      if (item.mechanics != null) {
        this.setState({
          mechanics : [...this.state.mechanics,item.mechanics[0].name]
        })
      }
    })
    const filteredMechanics = [... new Set(this.state.mechanics)]
    this.props.updateMechanics(filteredMechanics);
    console.log(this.props.cards);
  }
  render(){
    return (
      <View style={styles.body}>
        {this.state.loading ?
          <View>
            <ActivityIndicator size={'large'}/>
            <Text>Getting Card Datas...</Text>
          </View>
        :
        <View>
        <Text style={{fontSize:24,fontWeight:'bold',color:'#fff',margin:10}}>Mechanics List</Text>
        <FlatList
          data = {this.props.mechanics}
          keyExtractor = {(item,index)=>item}
          renderItem={({item,index}) =>{
              return(
                  <TouchableOpacity style={styles.mecList} onPress={()=> this.props.navigation.navigate('Detail',{mechanic : item})}>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>{item}</Text>
                  </TouchableOpacity>
              )


          }}></FlatList>

        </View>
      }
      </View>
    )

  }
}

function mapStateToProps(state){
  return {
    cards  : state.card.cards,
    mechanics : state.mechanic.mechanics
  }
}

function mapDispatchToProps(dispatch){
  return {
    increaseCounter : () => dispatch({type:'INCREASE_COUNTER'}),
    updateCards     : (newCards) => dispatch({type:'UPDATE_CARDS',newCards}),
    updateMechanics : (mechanics) => dispatch({type:'UPDATE_MECHANICS',mechanics})
  }
}
const styles = StyleSheet.create({
  body : {
    flex:1,
    justifyContent  :'center',
    alignItems      :'center',
    backgroundColor : '#2c3e50'
  },
  mecList : {
    width:280,
    height:70,
    borderRadius : 5,
    backgroundColor : '#3498db',
    justifyContent :'center',
    alignItems:'center',
    margin:10,
    padding : 10
  }
})
export default connect(mapStateToProps , mapDispatchToProps)(MainScreen);
