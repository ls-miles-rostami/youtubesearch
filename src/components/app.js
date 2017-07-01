import _ from 'lodash';
import React, {Component} from 'react';
import SearchBar from './search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './video_list';
import VideoDetail from './video_detail';

const API_KEY = 'YOU_API_KEY'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      videos: [],
      selectedVideo: null
    }
    this.videoSearch('surfboards')
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    })
  }

  render(){
    //Lodash prevent slowers the render of the state basically it throttles calls so if it is called more than once in a short period of time, only one instance will be called.
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 600)
    return (
      <div>
        <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={(selectedVideo) => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    )
  }
}

export default App
