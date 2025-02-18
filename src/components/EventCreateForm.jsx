import React from "react";

const EventCreateForm = () => {
    return (
        <div className="project-list-filter">
            <form action method>
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Event Name <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter event name"
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <label htmlFor>
                            Project <span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter project name"
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Start Date <span>*</span>
                        </label>
                        <input
                            type="date"
                            placeholder="Search by Name or ID"
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <label htmlFor>
                            End Date <span>*</span>
                        </label>
                        <input
                            type="date"
                            placeholder
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <label htmlFor>
                            Venue <span>*</span>
                        </label>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Enter Venue name</option>
                            <option value={1}>Client</option>
                            <option value={2}>Salesperson</option>
                            <option value={3}>Status</option>
                        </select>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <label htmlFor>
                            Manager <span>*</span>
                        </label>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Enter manager name</option>
                            <option value={1}>Client</option>
                            <option value={2}>Salesperson</option>
                            <option value={3}>Status</option>
                        </select>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor>
                            Upload File <span>*</span>
                        </label>
                        <input
                            type="file"
                            placeholder
                            className="form-control py-1 px-3 event-input"
                        />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 my-3">
                        <label htmlFor>
                            Description <span>*</span>
                        </label>
                        <textarea
                            placeholder
                            className="form-control py-1 px-3 event-input"
                            rows={5}
                            cols={30}
                            defaultValue={"                                                "}
                        />
                    </div>
                    <div className="event-create-btns my-3">
                        <button type="submit" className="btn common-btn-white">
                            Cancel
                        </button>
                        <button type="submit" className="btn common-btn">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EventCreateForm;
