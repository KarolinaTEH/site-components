import React from 'react';

import People from '../components/People'
import Wrapper from '../components/Wrapper'
import Jurors from '../datasources/Jurors'


const WidgetJurors = ({filter, limit, minToShow, ...wrapperProps}) => (
    <Jurors filter={filter} limit={limit} random={false} minToShow={minToShow}>{
        ({all}) => {

            if(all.length < minToShow){
                return null
            }

            return (
            
                <Wrapper {...wrapperProps}>
                <People 
                    data={all}
                    link={true}   
            />
        </Wrapper>)

        }}
    </Jurors>

)

WidgetJurors.defaultProps = {
    label : "cfp.jury.title",
    secondaryLabel : "cfp.jury.description",
    filter : () => true,
    limit: 20,
    minToShow: 4
}

export default WidgetJurors;