import React , {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainScreen from './screens/MainScreen';
import CardDetail from './screens/CardDetail';
import SearchScreen from './screens/SearchScreen';

import { combineReducers,createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';


export default class App extends React.Component{

  render(){
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

const initialState = {
  mechanics : [],
  cards  : []
}
const cardReducer = (state=initialState,action)=>{
  switch (action.type) {
    case 'UPDATE_CARDS':
      return {cards : action.newCards}
      break;
    default:
    return state;

  }
}
const mechanicReducer = (state=initialState,action)=>{
  switch (action.type) {
    case 'UPDATE_MECHANICS':
      return {mechanics : action.mechanics}
      break;
    default:
    return state;

  }
}
const reducer = combineReducers({card:cardReducer,mechanic:mechanicReducer})

const store = createStore(reducer);


const AppStackNavigator = createStackNavigator({
  Main   : MainScreen,
  Detail : CardDetail,
  Search : SearchScreen
});

const AppContainer = createAppContainer(AppStackNavigator);
