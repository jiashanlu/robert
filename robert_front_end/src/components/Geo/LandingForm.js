import React from "react";
/* global google */
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
};

class IndexForm extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );

    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    console.log(place);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="form-post">
        <FormControl fullWidth>
          <Input
            inputRef={this.autocompleteInput}
            placeholder="Test your location here .."
            className={classes.input}
            inputProps={{
              "aria-label": "Is Robert available?"
            }}
          />
        </FormControl>
      </div>
    );
  }
}

IndexForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexForm);
