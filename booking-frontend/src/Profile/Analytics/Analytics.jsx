import React, { Component } from 'react';
import { connect } from "react-redux";

import CanvasJSReact from '../components/canvasjs/canvasjs.react';
import { analytics } from "../../reducers/profile-reducer";
import { getChartLabelKey, getChartTitle } from "./constants";

import './index.css';

const { CanvasJSChart } = CanvasJSReact;

class Analytics extends Component {
  componentDidMount() {
    this.props.fetchAnalytics();
  }

  getCharts = () => {
    const { analytics } = this.props;
    return Object.keys(analytics).map(id => {
      const options = {
        title: {
          text: getChartTitle(id)
        },
        data: [{
          type: "column",
          indexLabelPlacement: "outside",
          dataPoints: analytics[id].map(entry => ({
            label: entry[getChartLabelKey(id)],
            y: Number.parseInt(entry.view_count, 36)
          }))
        }]
      }

      return (
        <div className="analytics-chart-container">
          <CanvasJSChart options={options} />
        </div>
      )
    })
  }

  render() {
    const { analytics } = this.props;
    if (!analytics) return null;

    return (
      <div className="analytics-container">{this.getCharts()}</div>
    );
  }
}

export default connect(state => ({
  analytics: state.profile.analytics.data,
}), {
  fetchAnalytics: analytics.action
})(Analytics);
