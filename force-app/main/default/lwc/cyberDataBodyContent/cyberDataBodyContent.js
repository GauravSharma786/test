import { LightningElement } from 'lwc';
import BUMBLENEE_LOGO from '@salesforce/resourceUrl/BumbleBee';
import OPTIMUS_LOGO from '@salesforce/resourceUrl/OptimusPrime';
import OPTIMUS_NEW_LOGO from '@salesforce/resourceUrl/OptimusNew';
import ABOUT_US_LOGO from '@salesforce/resourceUrl/AboutUs';

export default class CyberDataBodyContent extends LightningElement {
    bumbleBee = BUMBLENEE_LOGO;
    optimusLogo = OPTIMUS_LOGO;
    optimusLogoNew = OPTIMUS_NEW_LOGO;
    aboutUs = ABOUT_US_LOGO;
}