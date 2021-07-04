import React, { useEffect, useState } from 'react';
import _ from 'lodash';

const Meal = ({ items }) => {

    const [activeItems, setActiveItems] = useState([])

    useEffect(() => {
        setActiveItems(
            items.map((_item, index) => {
                return true
            })
        )
    }, [])


    const setItemActiveStatus = (index) => {

        const newAr = activeItems.map((item, i)=>{
            if(i === index){
                return !item
            }
            return item;
            
        });
        
        setActiveItems(newAr)

    }

    const handleHeaderClick = (e, index) => {
        if(e.target.tagName === 'DIV'){
            setItemActiveStatus(index)
        }
    }

    return (
        <div className="ui styled fluid accordion">

            {items.map(({ header, contents }, index) => {

                return (
                    <React.Fragment key={index}>
                        <div className={activeItems[index] ? "title active" : "title"} onClick={(e) => handleHeaderClick(e,index)}>
                            {header}
                        </div>
                        <div className={activeItems[index] ? "content active" : "content"}>
                            {contents}
                        </div>
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default Meal;