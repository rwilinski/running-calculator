import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import DistancePicker from '../DistancePicker/DistancePicker';
import DistanceTable from '../DistanceTable/DistanceTable';
import Summary from '../Summary/Summary';
import TimePicker from '../TimePicker/TimePicker';
import { displayTime } from '../../helpers/DisplayHelper/DisplayHelper';
import {
  calculatePace,
  calculateSpeed
} from '../../helpers/TimeHelper/TimeHelper';

const styles = theme => ({
  expansionPanel: {
    marginTop: theme.spacing(3)
  }
});

class PaceCalculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      distance: 1000,
      time: 360,
      speed: 0,
      pace: 0
    };
  }

  onUpdate(key, data) {
    this.setState(
      {
        [key]: data
      },
      () => {
        this.calculate();
      }
    );
  }

  calculate() {
    this.setState({
      speed: calculateSpeed(this.state.time, this.state.distance),
      pace: calculatePace(this.state.time, this.state.distance)
    });
  }

  componentDidMount() {
    this.calculate();
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          Pace calculator
        </Typography>
        <Typography variant="body1" paragraph={true}>
          This calculator helps you to determine what is the necessary speed and
          pace of your run to achieve the planned result at a given distance.
          Below you will find a table with calculated splits for your goal
          finishing time.
        </Typography>

        <InputLabel>Expected time (h:m:s)</InputLabel>
        <TimePicker
          value={this.state.time}
          onChange={value => this.onUpdate('time', value)}
        />

        <InputLabel>Distance (meters)</InputLabel>
        <DistancePicker
          value={this.state.distance}
          onChange={value => this.onUpdate('distance', value)}
        />

        <Summary
          data={[
            {
              label: 'Speed',
              text: `${this.state.speed} km/h`
            },
            {
              label: 'Pace',
              text: `${displayTime(this.state.pace, true)} min/km`
            }
          ]}
        />

        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Your target split times:</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <DistanceTable
              time={this.state.time}
              distance={this.state.distance}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PaceCalculator);
