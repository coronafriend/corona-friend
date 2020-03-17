// /client/App.js
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props) {

    super(props);

    // initialize our state
    this.state = {
      usrn: false,
      road_name: false,
      fully_claimed: null,
      notes: null,
    };

  }

  // When component mounts
  componentDidMount() {
  }

  // When you unmount the component
  componentWillUnmount() {
  }

  handleRoadClaim(ustr, roadName, fullyClaimed, notes) {

    // Post these back to the server
    axios.post('/api/claimRoad', {
      ustr: ustr,
      road_name: roadName,
      fully_claimed: fullyClaimed,
      notes: notes,
    }).then((res) => {

      // Refresh the map, keeping the selection on the existing road segment
      this.saveDataInState(res.data);

    });

  }

  saveDataInState(data) {

    this.setState({"ustr": data.ustr});
    this.setState({"road_name": data.road_name});
    this.setState({"fully_claimed": data.fully_claimed});
    this.setState({"notes": data.notes});

  }

  resetState() {

    this.setState({"ustr": null});
    this.setState({"road_name": null});
    this.setState({"fully_claimed": null});
    this.setState({"notes": null});

  }

  // Render our UI
  render() {

    return (
      <div className="app centered header">
        <div className="title">{"CORONA FRIEND"}</div>
        <div className="sub_title">{"Support Your Elderly Neighbour"}</div>
        {<span>
          <br />Coronavirus is putting vulnerable old people at great risk.  They could be living alone just a few doors down from you.<br /> <br />
          Offer your support by posting a Corona Friend postcard through their door.  If we all pull together, no-one in the UK will have to face this virus alone.<br /><br />
        </span>}
        <div className="sub_heading">Step One</div>
        <a href="CoronaFriendPostcard.pdf" target="_blank">Download</a> and fill out the Corona Friend postcards<br />
        <a href="CoronaFriendPostcard.pdf" target="_blank"><img src="corona_friend_postcard.png" width="400px" /></a><br /><br />
        <div className="sub_heading">Step Two</div>
        Post them through your neighbours' doors<br /><br />
        <div className="sub_heading">Step Three</div>
        Mark the road you've covered on the map below by finding and tapping it<br />
        {/* <div id="map"></div> */}
      </div>
    );

  }
}

export default App;
