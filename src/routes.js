import React from 'react';
import { Route, Switch} from 'react-router-dom';
import ItemList from './component/ItemList/ItemListContainer';
import LoginContainer from './component/login/LoginContainer';
import AddPostContainer from './component/AddPost/AddPostContainer';

export default (
    
    <Switch>
        <Route exact path='/' component={ItemList}/>
        <Route path='/account_login' component={LoginContainer}/>
        <Route path='/add_post' component={AddPostContainer}/>
    </Switch>

)