import React, { Component } from "react";

export class IndexForm extends Component {
  render() {
    return (
      <form className="form-post ">
        <div className="form-group form-inline row">
          <div className="input-group col-md-6 mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-map-marker-alt" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter a delivery address!"
            />
          </div>
          <div className="col-md-4 mb-2">
            <button type="button" className="btn btn-success ">
              Let's try!
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default IndexForm;
