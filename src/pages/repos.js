import React from 'react'
import RepoCardStat from '../components/repo-card-stat'
import ampersandMixin from 'ampersand-react-mixin'


export default React.createClass({
  mixins: [ampersandMixin],

  displayName: "repos",

  propTypes: {
    repos: React.PropTypes.object.isRequired
  },

  convertDate (dateString) {
    let date = new Date(dateString)

    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

  },

  render () {
    const {repos} = this.props

    if( !repos ){
      return (
        <div> loading </div>
      )
    }

    return(
      <div className='repos-listing'>
        <div className='repos-listing-content'>
          <h2>Repos</h2>
          <ul>
            {repos.map( (repo) => {
              return (
                <li key={repo.id}>
                  <a className='slides-up' href={repo.appUrl} >
                      <h4> {repo.full_name.split('/').pop()} </h4>
                      <svg width="100" height="10px" >
                        <line x1='0' y1='0' x2='100%'  y2='0' className="card-header-underline" />
                      </svg>
                      <span className="octicon octicon-repo"></span>
                      <span className="hover-text">Edit Repo   <span className="octicon octicon-chevron-right"></span> </span>

                      <ul className='repo-card-stats'>
                        <RepoCardStat name='Updated' value={this.convertDate(repo.updated_at)} />
                        <RepoCardStat name='Commits' value='32' />
                        <RepoCardStat name='Collaborators' value='2' />
                      </ul>
                  </a>

                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
});

