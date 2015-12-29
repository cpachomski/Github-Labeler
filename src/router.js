import Router from 'ampersand-router'
import React from 'react'
import qs from 'qs'
import xhr from 'xhr'
import app from 'ampersand-app'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import Layout from './layout'
import Linker from './helpers/linker'


export default Router.extend({

  renderPage ( page, opts = {layout: true, linker: true} ) {
    //add Layout wrapper
    if (opts.layout) {
      page = (
        <Layout human={app.human}>
         {page}
        </Layout>
      )
    }

    if (opts.linker){
      page = (
        <Linker>
          {page}
        </Linker>
      )
    }

    React.render(page, document.body);
  },

  routes: {
    '': 'public',
    'repos': 'repos',
    'login': 'login',
    'logout': 'logout',
    'auth/callback?:query' : 'authCallback'
  },

  public () {
    this.renderPage(<PublicPage/>, {layout: false});
  },

  repos () {
    this.renderPage(<ReposPage/>);
  },

  login () {
    window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
      client_id: 'c8648178b298b4cc1db0',
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'user, repo',

    })
  },

  logout () {
    window.localStorage.clear();
    window.location = "/";
  },

  authCallback (query) {
    query = qs.parse(query);

    xhr({
      url: 'https://thawing-plains-4936.herokuapp.com/authenticate/' + query.code,
      json: true
    }, (err, req, body) => {
      //Give token to human logged int model
      window.app.human.token = body.token

      //go to repos page with github token and remove auth/callback page from browser history
      this.redirectTo('/repos')
    })
  }

});