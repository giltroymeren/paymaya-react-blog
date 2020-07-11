import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PostsPage from './posts/PostsPage';
import ManagePostPage from './posts/ManagePostPage';

const App = () => {
    return (
        <div className="container-fluid">
            <h1>PayMaya React App</h1>
            <Switch>
                <Route path="/posts" component={PostsPage} />
                <Route path="/post/:slug" component={ManagePostPage} />
                <Route path="/post" component={ManagePostPage} />
            </Switch>
        </div>
    );
};

export default App;