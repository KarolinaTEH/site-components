
import React from 'react';
import Wrapper from '../components/Wrapper'
import Tickets from '../components/Tickets'
import DatasourceTickets from '../datasources/Tickets';
import Settings from '../datasources/Settings';


// venues, times, venueStyle

const WidgetTickets = ({filter, ...wrapper}) => (

    <Wrapper {...wrapper}>
    <Settings>{(get) => (
        <DatasourceTickets group_id={294}>{
            (tickets) => (<Tickets data={tickets.filter(filter)} />)
        }</DatasourceTickets>)
    }</Settings>
    </Wrapper> 

)

WidgetTickets.defaultProps = {
    label : "tickets.title",
    filter : function(){ return true; }
}


export default WidgetTickets