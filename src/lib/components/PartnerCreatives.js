import React from 'react'
import Grid from '@material-ui/core/Grid' 
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useDatasource, resizeCloudinaryImage, useDialog, capitalizeFirstLetter } from '../helpers'
import { useTranslate } from '../i18n'
import Button from './MyButton';
import Typography from '@material-ui/core/Typography';
import isEmpty from 'lodash/isEmpty'
import EmailIcon from '@material-ui/icons/Email';
import Sharer from './Sharer'
import PartnerPrizes from './PartnerPrizes'
import Facebook from '@material-ui/icons/Facebook'
import Twitter from '@material-ui/icons/Twitter'
import Linkedin from '@material-ui/icons/LinkedIn'
import TextField from '@material-ui/core/TextField'
import CopyToClipboardButton from './CopyToClipboardButton'

const icons = {Facebook, Twitter, Linkedin}
/***
 * 
 * 
 * https://v4.mui.com/components/material-icons/
 * const Icons = {



  leaflets : Ticket,
  meetups : Calendar,
  scanner : BarcodeScan,
  rollups : VolumeHigh,
  blog : Newspaper,
  earlybird : SquareIncCash
}

 */


 const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  avatarContainer: {
    width: 300,
    height: 300,
  },
  avatarImg: {
    objectFit: "contain",
    maxHeight: "85%",
    maxWidth: "85%",
  },
  active: {
    color: "black",
    cursor: "pointer"
  },
  disabled: {
    color: "#ccc",
    cursor: "pointer"
  }
});

/***
 * 
    {
    id: 116521,
    company_id: 1479,
    name: 'R-D-T Omniscopy',
    logotype: 'https://res.cloudinary.com/eventjuicer/image/upload/w_600,h_600,c_fit,f_auto/v1601548662/c_1479_logotype.png',
    stats: { sessions: 0, conversions: 0, position: 0, prizes: [] }


    "creatives": [
{
"id": 1,
"name": "invite",
"lang": "pl",
"act_as": "newsletter",
"content": "https://services.eventjuicer.com/api/company-newsletters/100",
"newsletter": {
"html": "https://services.eventjuicer.com/api/company-newsletters/100?participant_id=106050&dl=1",
"zip": "https://services.eventjuicer.com/api/company-newsletters/100?participant_id=106050&zip=1"
}
},
{
"id": 2,
"name": "invite",
"lang": "en",
"act_as": "newsletter",
"content": "https://services.eventjuicer.com/api/company-newsletters/101",
"newsletter": {
"html": "https://services.eventjuicer.com/api/company-newsletters/101?participant_id=106050&dl=1",
"zip": "https://services.eventjuicer.com/api/company-newsletters/101?participant_id=106050&zip=1"
}
},
{
"id": 50,
"name": "logotype",
"lang": "pl",
"act_as": "link",
"link": "?utm_source=yy14dcs4_1175&utm_medium=link&utm_campaign=promoninja&utm_content=logotype",
"link_full": "https://targiehandlu.pl/exhibitors/thuliumpl?utm_source=yy14dcs4_1175&utm_medium=link&utm_campaign=promoninja&utm_content=logotype",
"shareable": true,
"services": [
"linkedin",
"twitter",
"facebook"
],
"requires": [
"logotype"
],
"enabled": true,
"template": "https://res.cloudinary.com/eventjuicer/image/upload/c_fit,h_210,w_800/u_template_teh20_exhibitor_pl,y_10/v1523270620/c_1175_logotype.png",
"sharers": {
"facebook": "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftargiehandlu.pl%2Fexhibitors%2Fthuliumpl%3Futm_source%3Dyy14dcs4_1175%26utm_medium%3Dlink%26utm_campaign%3Dpromoninja%26utm_content%3Dlogotype",
"linkedin": "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Ftargiehandlu.pl%2Fexhibitors%2Fthuliumpl%3Futm_source%3Dyy14dcs4_1175%26utm_medium%3Dlink%26utm_campaign%3Dpromoninja%26utm_content%3Dlogotype",
"twitter": "https://twitter.com/intent/tweet?text=https%3A%2F%2Ftargiehandlu.pl%2Fexhibitors%2Fthuliumpl%3Futm_source%3Dyy14dcs4_1175%26utm_medium%3Dlink%26utm_campaign%3Dpromoninja%26utm_content%3Dlogotype"
}
},
{
"id": 51,
"name": "opengraph_image",
"lang": "undefined",
"act_as": "link",
"link": "?utm_source=yy14dcs4_1175&utm_medium=link&utm_campaign=promoninja&utm_content=opengraph_image",
"link_full": "https://targiehandlu.pl/exhibitors/thuliumpl?utm_source=yy14dcs4_1175&utm_medium=link&utm_campaign=promoninja&utm_content=opengraph_image",
"shareable": true,
"services": [
"facebook",
"linkedin",
"twitter"
],
"requires": [
"opengraph_image"
],
"enabled": false,
"template": "https://res.cloudinary.com/eventjuicer/image/upload/w_1200,h_630,c_fit,f_auto/v1554212769/c_1175_opengraph_image.png",
"sharers": {
"facebook": "https://www.facebook.com/sharer/sharer.php?u=%3Futm_source%3Dyy14dcs4_1175%26utm_medium%3Dlink%26utm_campaign%3Dpromoninja%26utm_content%3Dopengraph_image",
"linkedin": "https://www.linkedin.com/sharing/share-offsite/?url=%3Futm_source%3Dyy14dcs4_1175%26utm_medium%3Dlink%26utm_campaign%3Dpromoninja%26utm_content%3Dopengraph_image",
"twitter": "https://twitter.com/intent/tweet?text=%3Futm_source%3Dyy14dcs4_1175%26utm_medium%3Dlink%26utm_campaign%3Dpromoninja%26utm_content%3Dopengraph_image"
}
}

    },
*/






const PartnerCreatives = ({data}) => {

    const [translate] = useTranslate()
    
    if(isEmpty(data) || !Array.isArray(data)){
        return null
    }

    const newsletters = data.filter(item => item.act_as === "newsletter")
    const links = data.filter(item => item.act_as === "link")
    const rawlink = links.find(Boolean) || {}

    return (<Box>
        <Box mb={4}>
        <Typography gutterBottom variant="subtitle2">{translate("promo.creatives.rawlink.title")}</Typography>
        <PromoRawLink link={rawlink.link_full}/>
        </Box>
        <Box mb={4}>
        <Typography gutterBottom variant="subtitle2">{translate("promo.creatives.newsletters.title")}</Typography>
        <Grid container spacing={2}>
        {newsletters.map(item => (<Grid item key={item.id}>
        <Typography gutterBottom variant="body1">{translate(`common.locales.${item.lang}`)}</Typography>
        <PromoNewsletter  {...item} /></Grid>))}
        </Grid>
        </Box>
        <Box mb={4}>
        <Typography gutterBottom variant="subtitle2">{translate("promo.creatives.links.title")}</Typography>
        {links.map(item =><PromoLink key={item.id} {...item} />)}
        </Box>
    </Box>)
}

const PromoLink = ({link_full, sharable, enabled, sharers}) => {
    if(!enabled){
        return null
    }
    return <div>{Object.keys(sharers).map(service => {
        const link = sharers[service]
        return (
            <Box key={service} mb={2}>
            {React.createElement(icons[capitalizeFirstLetter(service)], {})}
            <TextField multiline={true} value={link} fullWidth={true} />
            <CopyToClipboardButton text={link} />
            </Box>
        )
    })}</div>
}

const PromoRawLink = ({link}) => {
    return  <TextField multiline={true} value={link} fullWidth={true} />
}

const PromoNewsletter = ({name, lang, content, newsletter}) => {
    return (<Grid container direction="row">
        <Grid item ><Button label=".zip" startIcon={<EmailIcon />} href={newsletter.zip} /></Grid>
        <Grid item><Button label=".html" startIcon={<EmailIcon />} href={newsletter.html} /></Grid>
    </Grid>)
}



export default PartnerCreatives