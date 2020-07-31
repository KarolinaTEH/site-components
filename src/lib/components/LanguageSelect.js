import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import classNames from 'classnames'
import Button from '@material-ui/core/Button';
import {translate} from '../i18n'
import Language from '@material-ui/icons/Language';
import { withStyles } from '@material-ui/core/styles';

import {
  dialogShow
} from './redux/actions';

import LanguageButton from './LanguageButton'

const styles = theme => ({
  selectors : {
    margin : 40,
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
});


const LanguageSelect = ({ label, classes, locale, locales, oldLocale, dialogShow, dialogHide, changeLocale, translate }) => (
  <Button
  //  variant="outlined"
    onClick={() => dialogShow({
        title: translate(label),
        content: <div style={{marginTop: 40}}>{
          locales.map( loc => {
            return <LanguageButton key={loc} target={loc} />
          })
        }</div>,
        buttons: []
    })}
    color="inherit"
  >
  <Language className={classNames(classes.leftIcon, classes.iconSmall)} />
  { translate(`common.locales.${locale}`) }
  </Button>
)



LanguageSelect.defaultProps = {
  locales : ["en"],
  label: 'common.language.change'
};

const enhance = compose(
  withStyles(styles),
  connect(
    (state) => ({oldLocale : state.app.locale}),
    {dialogShow}
  ),
  translate
);

export default enhance(LanguageSelect);
