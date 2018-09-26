import React, { Component } from 'react';

import axios from '../../../axios';
import Spinner from '../../spinner/spinner';
import withUiAction from '../../../hoc/uiHoc';
import InfiniteScroll from 'react-infinite-scroller';
import Album from '../../items/album';
import Artist from '../../items/artist';

import './generic.css';

class Generic extends Component {
  state = {
    items: [],
    fetching: true
  };

  componentDidMount() {
    axios.get(this.props.url).then(response => {
      this.setState({
        fetching: false,
        items: response.data.items,
        next: response.data.next
      });
    });
  }

  fetchMore = () => {
    if (this.state.next) {
      axios.get(this.state.next).then(response => {
        this.setState(prevState => {
          return {
            items: [...prevState.items, ...response.data.items],
            next: response.data.next
          };
        });
      });
    }
  };

  render = () => {
    const Generic = this.props.type === 'artist' ? Artist : Album;
    return (
      <div className="generic-container">
        <Spinner section loading={this.state.fetching}>
          <h1>{this.props.title}</h1>
          <InfiniteScroll
            className="browse-container"
            hasMore={this.state.next ? true : false}
            loadMore={this.fetchMore}
          >
            {this.state.items.map((i, key) => (
              <Generic
                item={i.album || i}
                onClick={
                  this.props.type === 'artist'
                    ? this.props.onArtistClick
                    : this.props.onAlbumClick
                }
                onArtistClick={this.props.onArtistClick}
                key={key}
              />
            ))}
          </InfiniteScroll>
        </Spinner>
      </div>
    );
  };
}

export default withUiAction(Generic);
