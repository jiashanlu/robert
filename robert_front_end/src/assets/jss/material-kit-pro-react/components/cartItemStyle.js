import {
  grayColor,
  container,
  title,
  blackColor,
  hexToRgb,
  coloredShadow,
  cardTitle,
  description,
  mlAuto,
  infoColor,
  whiteColor,
  roseColor
} from '../../material-kit-pro-react.jsx';
import imagesStyles from '../../material-kit-pro-react/imagesStyles.jsx';

const cardItemStyle = {
  grayColor,
  container,
  title,
  blackColor,
  hexToRgb,
  coloredShadow,
  cardTitle,
  description,
  mlAuto,
  infoColor,
  whiteColor,
  roseColor,
  ...imagesStyles,
  justifyContentCenter: {
    WebkitBoxPack: 'center !important',
    MsFlexPack: 'center !important',
    justifyContent: 'center !important'
  },
  card: {
    marginBottom: '5px',
    marginTop: '5x',
    width: '100%'
  }
};

export default cardItemStyle;
