import React from 'react'
// import WidgetTickets from './WidgetTickets'
import {useSettings, useDatasource, useDialog, resizeCloudinaryImage} from '../helpers'
import Grid from '@material-ui/core/Grid'
import Wrapper from '../components/Wrapper'
import {useTranslate} from '../i18n'
import Typography from '@material-ui/core/Typography'

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'

import Avatar from '@material-ui/core/Avatar'
import isEmpty from 'lodash/isEmpty'
import MyButton from '../components/MyButton'
import { makeStyles } from '@material-ui/core/styles';

const defaultGridSettings = {
    xs: 6,
    sm: 6,
    md: 6,
    lg: 4,
    xl: 4,
  }

  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 700,
      minWidth: 200,
      marginBottom: 10,
      [theme.breakpoints.up('sm')]: {
        maxWidth: 700,
      },
      backgroundColor: "#fff",
    },
    transparent: {
      backgroundColor: "transparent",
    },
  
    container: {
      display: 'flex',
      padding: 10,
      justify: "center",
      alignItems: "center",
    },
  
    avatarContainer: {
      minHeight: 80,
      minWidth: 150,
    },
  
    avatarContainerFluid: {
      height: "80%",
      width: "80%",
      padding: "5%"
    },
  
    avatarImg: {
      objectFit: "contain",
      maxHeight: "80%",
      maxWidth: "80%",
    },

    item: {
       position: 'relative',
       height: '100%',
       padding: 20
    },
  
    itemWithIcon: {
        // textAlign: 'right',
        // [theme.breakpoints.down("md")]: {
        //   textAlign: 'center'
        // }
    },

    itemWithCatName: {
        marginTop: 20,
        color: 'rgba(0,0,0,0.9)',
        [theme.breakpoints.down("md")]: {
        //   textAlign: 'center'
        }
    },

    itemWithLogo: {
        position: 'relative',
        height: '100%',
        minHeight: 200,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    }
}));

const TicketDetails = ({labelPrefix, image, detailsUrl, owners, icons, moreInfoLabel}) => {

    const classes = useStyles();
    const dialog = useDialog();
    const [translate] = useTranslate();
    const dialogContents = {
        label: `${labelPrefix}.list.name`, 
        content: translate(`${labelPrefix}.list.description`)
    }
    
    const renderIconOrImage = (image) => {
        if(!image){
            return null
        }
        if(!image.startsWith("http") &&  image in icons){
            return React.createElement(icons[image], {style: {width: '100%', maxWidth: 100, height: 'auto'}})
        }

        return <Avatar variant="square" src={resizeCloudinaryImage(image, 300, 400)} />
    }

    return ( 
    
    <Card variant="outlined" className={classes.item}>
    <Grid container spacing={2} direction="column" alignItems="center">
    <Grid item className={classes.itemWithIcon}>{renderIconOrImage(image)}</Grid>
    <Grid item className={classes.itemWithCatName}><TicketHeader baseLabel={labelPrefix} /></Grid>
    <Grid item className={classes.itemWithLogo}>
        <TicketOwnersList detailsUrl={detailsUrl} owners={owners} moreInfoLabel={moreInfoLabel} />
    </Grid>
    </Grid>
    </Card>)
}


const TicketHeader = ({baseLabel}) => {

    const classes = useStyles();
    const [translate] = useTranslate();
    return (<Typography className={classes.imageTitle} variant="h4">{translate(`${baseLabel}.list.name`)}</Typography>)
}




const TicketOwnersList = ({detailsUrl, owners, moreInfoLabel}) => {
    if( !Array.isArray(owners) || isEmpty(owners)){
        return <NoTicketOwner href={detailsUrl} label={moreInfoLabel} />
    }
    return owners.map(owner => <TicketOwner key={owner.id} logotype={owner.profile.logotype_cdn}  />)
}

const TicketOwner = ({logotype, fluid=true}) => {
    const classes = useStyles();

    return (
       
        <Avatar variant="square" src={ resizeCloudinaryImage(logotype, 300, 300) } classes={{
            root: fluid? classes.avatarContainerFluid: classes.avatarContainer,
            img: classes.avatarImg
          }}/>
      
    )
}

const NoTicketOwner = (props) => <MyButton color="primary" {...props} />



const WidgetTicketOwners = ({setting="sponsors", icons={} }) => {

    const {ticket_group_id, ticket_ids, grid, wrapperProps, moreInfoLabel} = useSettings(setting);
    const {data} = useDatasource({
        data: {
            resource: "ticketowners",
            params: { ticket_group_id}
        },
    });

    const _gridSettings = Object.assign({}, defaultGridSettings, grid)

    return (<Wrapper {...wrapperProps}><Grid container spacing={2} alignItems="stretch"   >{
        data.map(item => <Grid key={item.id} item {..._gridSettings}>
        <TicketDetails moreInfoLabel={moreInfoLabel} detailsUrl={item.details_url} labelPrefix={item.translation_asset_id} image={item.thumbnail} owners={item.owners} icons={icons} />
        </Grid>)
    }</Grid></Wrapper>)
    

}



export default WidgetTicketOwners


