import React , {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from 'react-native';

import FlipCard from 'react-native-flip-card';

import {connect} from 'react-redux';
import axios from 'axios';
import {debounce} from 'lodash';

class SearchScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      searchText : null,
      searchedCards : [],
      error:false,
    }
    this._handleChange = this._handleChange.bind(this);
  }
  static navigationOptions =({ navigation }) => {
    let headerTitle = "Search Cards";
    let headerTitleStyle = {color:'#fff',fontWeight:'bold'};
    let headerStyle = {backgroundColor:'#2c3e50'};
    let headerTintColor = "#fff";
    return {headerTitle,headerStyle,headerTitleStyle,headerTintColor};
  }
  componentDidMount(){
    this._searchCards();
  }
  _searchCards = async() => {
    if (this.state.searchText != null && this.state.searchText != "") {
      this.setState({loading:true,error:false});
      const getCards = await axios.get(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${this.state.searchText}`,{
        'headers' : {
          "x-rapidapi-host" : "omgvamp-hearthstone-v1.p.rapidapi.com",
    	    "x-rapidapi-key"  : "a99fea1aa2mshc46860600f806f2p1be98fjsnbb4504085ebb"
        }
      }).then((response) =>{
        this.setState({loading:false,searchedCards:response.data});
      }).catch((error) => {
        this.setState({loading:false,error:true,searchedCards:[]});
        console.log("No cards found")
    })
    }

  }
  _handleChange =debounce((e)=>{
    this.setState({ searchText:e })
    this._searchCards();
  },1000);
  render(){
    return(
      <View style={styles.body}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1,width:300 ,position:'absolute',top:20,padding:10}}
        onChangeText={this._handleChange}
        autoCorrect = {false}
        placeholder = {"Search for cards..."}
      />
      {this.state.loading ?
        <ActivityIndicator size={'large'} />
      :
      <View style={{marginTop:90}}>
        {this.state.error ? <Text>No Cards Found!</Text> : null}
        <FlatList
          data = {this.state.searchedCards}
          keyExtractor = {(item,index)=>item.cardId}
          renderItem ={({item,index})=>{
            if (item.img != null) {
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

          }}></FlatList>
      </View>
    }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  body : {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#eee'
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

export default connect(mapStateToProps)(SearchScreen);
