import React, { useState } from 'react';
import { toast } from 'react-toastify';

const DynamicFields = ({ fields, setFields, handleInputChange, }) => {
    const removeField = (index) => {
        const updatedFields = [...fields];
        if (updatedFields.length > 1) {

            updatedFields.splice(index, 1);
            setFields(updatedFields);
            return
        }

    };
    return (
        <div>
            {fields.map((field, index) => (
                <div key={index} className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        {/* <label htmlFor={`supplier-${index}`}>
                            Supplier <span>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control py-1 px-3 event-input"
                            id={`supplier-${index}`}
                            value={field.supplier}
                            onChange={(e) => handleInputChange(index, 'supplier', e.target.value)}
                        /> */}
                        <label htmlFor>
                            Supplier <span>*</span>
                        </label>
                        <select
                            className="form-select form-control py-1 px-3 event-input"
                            aria-label="Default select example"
                            id={`supplier-${index}`}
                            value={field.supplier}
                            onChange={(e) => handleInputChange(index, 'supplier', e.target.value)}
                        >
                            <option selected>-- Select Supplier --</option>
                            <option value={1}>Client</option>
                            <option value={2}>Salesperson</option>
                            <option value={3}>Status</option>
                        </select>
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                        <label htmlFor={`cabinet_pricing-${index}`}>
                            Cabinet Pricing <span>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control py-1 px-3 event-input"
                            id={`cabinet_pricing-${index}`}
                            value={field.cabinet_pricing}
                            onChange={(e) => handleInputChange(index, 'cabinet_pricing', e.target.value)}
                        />
                    </div>
                    {
                        fields.length > 1 && <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                            <button type="button" onClick={() => removeField(index)}>
                                Remove
                            </button>
                        </div>
                    }

                </div>
            ))}
            {/* <button type="button" onClick={addField}>
                Add Field
            </button> */}
            {/* <div>
                Result:
                <pre>{JSON.stringify(fields, null, 2)}</pre>
            </div> */}
        </div>
    );
};

export default DynamicFields;
