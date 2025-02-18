import React from 'react'
import SearchFilter from './Filters/SearchFilter'
import OrderFilter from './Filters/OrderFilter'
import DropsFilter from './Filters/DropsFilter'

const ProjectFilter = () => {
    return (
        <form action method>
            <div className="row">
                <SearchFilter />
                <OrderFilter />
                <DropsFilter />
                <DropsFilter />
                <DropsFilter />

                <div className="project-list-btns">
                    <button type="submit" className="btn common-btn-white">
                        Reset
                    </button>
                    <button type="submit" className="btn common-btn">
                        Filter
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ProjectFilter