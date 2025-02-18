import React from 'react'
import UnitCabinetTable from './UnitCabinetTable'

const UnitCabinet = ({ data,handleChange,handleSubmit,ind,value }) => {
    return (
        <>
        <div className='row'>
            <div className='col-lg'>
                <label htmlFor>
                select Cabinet <span>*</span>
                </label>
                <select className="form-select" name='hand'
                onChange={(e)=>handleChange(e,'cabinet',ind)}
                value={value.cabinet}
                    aria-label="Default select example">
                    <option selected> select Cabinet</option>
                    {
                        data.length && data?.map((each) => {
                            return <option value={each?.item_num}> {each?.item_num}</option>
                        })
                    }
                </select>
            </div>
            <div className='col-lg'>
                <label htmlFor>
                    Stone Ft <sup>2</sup> <span>*</span>
                </label>
                <input
                    type="number"
                    className="form-control py-1 px-3 event-input"
                    name='stone_ft_2'
                    onChange={(e)=>handleChange(e,'stone_ft_2',ind)}
                    value={value.stone_ft_2}

                />
            </div>
            <div className='col-lg'>
                <label htmlFor>
                    Stone Ft <sup>2</sup> 2cm <span>*</span>
                </label>
                <input
                    type="number"
                    className="form-control py-1 px-3 event-input"
                    name='stone_ft_22_cm'
                    onChange={(e)=>handleChange(e,'stone_ft_22_cm',ind)}
                    value={value.stone_ft_22_cm}

                />
            </div>
            <div className='col-lg'>
                <label htmlFor>
                    Stone Ft <sup>2</sup> 3cm <span>*</span>
                </label>
                <input
                    type="number"
                    className="form-control py-1 px-3 event-input"
                    name='stone_ft_23_cm'
                    onChange={(e)=>handleChange(e,'stone_ft_23_cm',ind)}
                    value={value.stone_ft_23_cm}


                />
            </div>
            <div className='col-lg'>
                <label htmlFor>
                    SSL<span>*</span>
                </label>
                <input
                    type="number"
                    className="form-control py-1 px-3 event-input"
                    name='ssl'
                    defaultValue={0}
                    onChange={(e)=>handleChange(e,'ssl',ind)}
                    value={value.ssl}

                />
            </div>
            <div className='col-lg'>
                <label htmlFor>
                    SSR <span>*</span>
                </label>
                <input
                    type="number"
                    className="form-control py-1 px-3 event-input"
                    name='ssr'
                    defaultValue={0}
                    onChange={(e)=>handleChange(e,'ssr',ind)}
                    value={value.ssr}

                />
            </div>
            <div className='col-lg'>
                <label htmlFor>
                    BS <span>*</span>
                </label>
                <input
                    type="number"
                    className="form-control py-1 px-3 event-input"
                    name='bs'
                    defaultValue={0}
                    onChange={(e)=>handleChange(e,'bs',ind)}
                    value={value?.bs}

                />
            </div>
            <div className='col-lg'>
                <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Save</button>
            </div>
        </div>
        <UnitCabinetTable/>
        </>


    )
}

export default UnitCabinet